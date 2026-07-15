import { describe, expect, test } from 'bun:test'
import { allGames, type TcgBattleGameConfig } from '@/data/games'
import {
  applyTcgBattleEnergyDiscards,
  applyTcgBattleStatusConditions,
  buildTcgBattleCardSummary,
  canTcgBattleEndByPassStall,
  canSideChargeEnergy,
  calculateTcgBattleCardCost,
  calculateTcgBattleDamage,
  getEffectiveTcgBattleAttackCost,
  getAllowedTcgBattleAttackCost,
  getNextTcgBattleTurnNumber,
  getTcgBattleCardUnlockTurn,
  getTcgBattleCardUnlockTurnForCard,
  isTcgBattleCardUnlocked,
  getSupportedTcgBattleAttacks,
  parseTcgAttackDamage,
  resolveTcgBattleAttack,
  resolveTcgBattleStatusAttackCheck,
  TCG_BATTLE_FORMATS,
  validateTcgBattleDeck,
  type TcgBattleAttack,
  type TcgBattleCardState,
  type TcgBattleSideState,
  type TcgBattleState,
} from '@/utilities/tcg/tcg-battle'
import { getTcgCardDetailById } from '@/data/tcg/details'

function makeBattleCard(id: string, attackCost: number): TcgBattleCardState {
  return {
    id,
    instanceId: `${id}:test`,
    name: id,
    hp: 50,
    currentHp: 50,
    types: ['Colorless'],
    subtypes: ['Basic'],
    image: '/images/tcg-back.avif',
    cost: 1,
    convertedRetreatCost: 1,
    attacks: [
      {
        name: 'Test Hit',
        cost: Array.from({ length: attackCost }, () => 'Colorless'),
        convertedEnergyCost: attackCost,
        damage: '10',
        text: '',
      },
    ],
    weaknesses: [],
    resistances: [],
  }
}

function makeAttack(overrides: Partial<TcgBattleAttack>): TcgBattleAttack {
  return {
    name: 'Test Attack',
    cost: ['Colorless'],
    convertedEnergyCost: 1,
    damage: '10',
    text: '',
    ...overrides,
  }
}

function makeBattleSide(
  card: TcgBattleCardState,
  energy: number,
  overrides: Partial<TcgBattleSideState> = {},
): TcgBattleSideState {
  return {
    deck: [card],
    hand: [],
    front: [card],
    back: [],
    discard: [],
    energy,
    ...overrides,
  }
}

function makeBattleState(overrides: Partial<TcgBattleState> = {}): TcgBattleState {
  const playerCard = makeBattleCard('player-card', 3)
  const opponentCard = makeBattleCard('opponent-card', 3)
  return {
    userId: 'test-user',
    encounterId: 'test-encounter',
    format: 'baby',
    phase: 'battle',
    turnNumber: 10,
    activeSide: 'player',
    player: makeBattleSide(playerCard, 2),
    opponent: makeBattleSide(opponentCard, 2),
    consecutivePasses: 2,
    log: [],
    startedAt: 0,
    updatedAt: 0,
    ...overrides,
  }
}

describe('TCG battle utilities', () => {
  test('parses leading attack damage values', () => {
    expect(parseTcgAttackDamage('30')).toBe(30)
    expect(parseTcgAttackDamage('30+')).toBe(0)
    expect(parseTcgAttackDamage('120x')).toBe(0)
    expect(parseTcgAttackDamage('?')).toBe(0)
    expect(parseTcgAttackDamage('')).toBe(0)
  })

  test('infers supported variable and recoil TCG battle attacks', () => {
    const attacks = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '90+',
        text: 'Flip a coin. If heads, this attack does 30 more damage.',
      }),
      makeAttack({
        damage: '10×',
        text: 'Flip 3 coins. This attack does 10 damage for each heads.',
      }),
      makeAttack({
        damage: '20+',
        text: "This attack does 20 more damage for each of your opponent's Benched Pokémon.",
      }),
      makeAttack({
        damage: '40',
        text: 'This Pokémon does 20 damage to itself.',
      }),
      makeAttack({
        damage: '120×',
        text: 'Your opponent reveals their hand. This attack does 120 damage for each Energy card you find there.',
      }),
    ])

    expect(attacks).toHaveLength(4)
    expect(attacks.every((attack) => attack.battleEffect)).toBe(true)
  })

  test('resolves coin bonus, fixed recoil, and weakness', () => {
    const playerCard = makeBattleCard('player-card', 1)
    const opponentCard = makeBattleCard('opponent-card', 1)
    opponentCard.weaknesses = [{ type: 'Colorless', value: '×2' }]
    const state = makeBattleState({
      player: makeBattleSide(playerCard, 5),
      opponent: makeBattleSide(opponentCard, 5),
    })
    const [attack] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '30+',
        text: 'Flip a coin. If heads, this attack does 20 more damage. This Pokémon does 10 damage to itself.',
      }),
    ])

    const resolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: playerCard,
      attack,
      target: opponentCard,
      random: () => 0.9,
    })

    expect(resolution.targetDamageBeforeModifiers).toBe(50)
    expect(resolution.targetDamage).toBe(100)
    expect(resolution.selfDamage).toBe(10)
    expect(resolution.coinFlips?.heads).toBe(1)
  })

  test('resolves all-heads coin gates like Drill Tackle', () => {
    const playerCard = makeBattleCard('player-card', 1)
    const opponentCard = makeBattleCard('opponent-card', 1)
    const state = makeBattleState({
      player: makeBattleSide(playerCard, 5),
      opponent: makeBattleSide(opponentCard, 5),
    })
    const [attack] = getSupportedTcgBattleAttacks([
      makeAttack({
        name: 'Drill Tackle',
        damage: '70',
        text: 'Flip 2 coins. If 1 or both of them are tails, this attack does nothing.',
      }),
    ])

    const tailsResolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: playerCard,
      attack,
      target: opponentCard,
      random: () => 0.1,
    })
    const headsResolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: playerCard,
      attack,
      target: opponentCard,
      random: () => 0.9,
    })

    expect(tailsResolution.targetDamage).toBe(0)
    expect(tailsResolution.coinFlips?.tails).toBe(2)
    expect(headsResolution.targetDamage).toBe(70)
    expect(headsResolution.coinFlips?.heads).toBe(2)
  })

  test('keeps base target damage and returns per-bench damage for each opponent benched card', () => {
    const playerCard = makeBattleCard('player-card', 1)
    const opponentCard = makeBattleCard('opponent-card', 1)
    const state = makeBattleState({
      player: makeBattleSide(playerCard, 5),
      opponent: makeBattleSide(opponentCard, 5, {
        back: [makeBattleCard('opponent-bench-1', 1), makeBattleCard('opponent-bench-2', 1)],
      }),
    })
    const [attack] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '20',
        text: "This attack does 20 damage and 10 damage to each of your opponent's Benched Pokémon.",
      }),
    ])

    const resolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: playerCard,
      attack,
      target: opponentCard,
    })

    expect(resolution.targetDamage).toBe(20)
    expect(resolution.benchDamage).toEqual([
      { targetSide: 'opponent', targetId: state.opponent.back[0].instanceId, damage: 10 },
      { targetSide: 'opponent', targetId: state.opponent.back[1].instanceId, damage: 10 },
    ])
  })

  test('supports single-benched splash targeting one opponent bench card', () => {
    const playerCard = makeBattleCard('player-card', 1)
    const opponentCard = makeBattleCard('opponent-card', 1)
    const state = makeBattleState({
      player: makeBattleSide(playerCard, 5),
      opponent: makeBattleSide(opponentCard, 5, {
        back: [makeBattleCard('opponent-bench-1', 1), makeBattleCard('opponent-bench-2', 1)],
      }),
    })
    const [attack] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '20',
        text: "This attack does 20 damage and 10 damage to 1 of your opponent's Benched Pokémon.",
      }),
    ])

    const resolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: playerCard,
      attack,
      target: opponentCard,
      random: () => 0.9,
    })

    expect(resolution.targetDamage).toBe(20)
    expect(resolution.benchDamage).toHaveLength(1)
    expect(resolution.benchDamage?.[0]?.targetSide).toBe('opponent')
    expect(resolution.benchDamage?.[0]?.damage).toBe(10)
    expect(resolution.benchDamage?.[0]?.targetId).toBeTruthy()
    expect([state.opponent.back[0].instanceId, state.opponent.back[1].instanceId]).toContain(resolution.benchDamage?.[0]?.targetId || '')
  })

  test('supports own-bench and both-bench splash patterns', () => {
    const playerCard = makeBattleCard('player-card', 1)
    const opponentCard = makeBattleCard('opponent-card', 1)
    const state = makeBattleState({
      player: makeBattleSide(playerCard, 5, {
        back: [makeBattleCard('player-bench-1', 1), makeBattleCard('player-bench-2', 1)],
      }),
      opponent: makeBattleSide(opponentCard, 5, {
        back: [makeBattleCard('opponent-bench-1', 1)],
      }),
    })

    const [ownBenchAttack] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '20',
        text: 'This attack does 20 damage and 10 damage to each of your Benched Pokémon.',
      }),
    ])
    const ownBenchResolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: playerCard,
      attack: ownBenchAttack,
      target: opponentCard,
    })
    expect(ownBenchResolution.targetDamage).toBe(20)
    expect(ownBenchResolution.benchDamage).toEqual([
      { targetSide: 'player', targetId: state.player.back[0].instanceId, damage: 10 },
      { targetSide: 'player', targetId: state.player.back[1].instanceId, damage: 10 },
    ])

    const [bothBenchAttack] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '20',
        text: "This attack does 20 damage and 10 damage to each Benched Pokémon (both yours and your opponent's).",
      }),
    ])
    const bothBenchResolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: playerCard,
      attack: bothBenchAttack,
      target: opponentCard,
    })
    expect(bothBenchResolution.targetDamage).toBe(20)
    expect(bothBenchResolution.benchDamage).toEqual([
      { targetSide: 'player', targetId: state.player.back[0].instanceId, damage: 10 },
      { targetSide: 'player', targetId: state.player.back[1].instanceId, damage: 10 },
      { targetSide: 'opponent', targetId: state.opponent.back[0].instanceId, damage: 10 },
    ])
  })

  test('supports placing damage counters as direct damage', () => {
    const playerCard = makeBattleCard('player-card', 1)
    const opponentCard = makeBattleCard('opponent-card', 1)
    const state = makeBattleState({
      player: makeBattleSide(playerCard, 5),
      opponent: makeBattleSide(opponentCard, 5, {
        back: [makeBattleCard('opponent-bench-1', 1), makeBattleCard('opponent-bench-2', 1)],
      }),
    })

    const [activeCounterAttack] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '',
        text: "Put 2 damage counters on your opponent's Active Pokémon.",
      }),
    ])
    const activeResolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: playerCard,
      attack: activeCounterAttack,
      target: opponentCard,
    })
    expect(activeResolution.counterDamage).toEqual([
      { targetSide: 'opponent', targetId: opponentCard.instanceId, damage: 20 },
    ])

    const [benchCounterAttack] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '',
        text: "Put 1 damage counter on 1 of your opponent's Benched Pokémon.",
      }),
    ])
    const benchResolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: playerCard,
      attack: benchCounterAttack,
      target: opponentCard,
      random: () => 0.9,
    })
    expect(benchResolution.counterDamage).toHaveLength(1)
    expect(benchResolution.counterDamage?.[0]?.targetSide).toBe('opponent')
    expect(benchResolution.counterDamage?.[0]?.damage).toBe(10)
  })

  test('supports heal and remove damage counters text', () => {
    const playerCard = makeBattleCard('player-card', 1)
    const opponentCard = makeBattleCard('opponent-card', 1)
    playerCard.currentHp = 20
    const state = makeBattleState({
      player: makeBattleSide(playerCard, 5),
      opponent: makeBattleSide(opponentCard, 5),
    })

    const [healAttack] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '',
        text: 'Heal 20 damage from this Pokémon.',
      }),
    ])
    const healResolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: playerCard,
      attack: healAttack,
      target: opponentCard,
    })
    expect(healResolution.healing).toEqual([
      { targetSide: 'player', targetId: playerCard.instanceId, amount: 20 },
    ])

    const [removeAttack] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '',
        text: 'Remove 2 damage counters from this Pokémon.',
      }),
    ])
    const removeResolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: playerCard,
      attack: removeAttack,
      target: opponentCard,
    })
    expect(removeResolution.healing).toEqual([
      { targetSide: 'player', targetId: playerCard.instanceId, amount: 20 },
    ])
  })

  test("parses Brock's Rhyhorn Take Down recoil", async () => {
    const card = await getTcgCardDetailById('gym1-22')
    expect(card).toBeTruthy()
    const attacks = getSupportedTcgBattleAttacks(card?.attacks || [])
    const takeDown = attacks.find((attack) => attack.name === 'Take Down')
    expect(takeDown?.battleEffect?.selfDamage?.[0]).toEqual({ kind: 'fixed', amount: 10 })

    const playerCard = makeBattleCard('player-card', 1)
    const brocksRhyhorn = makeBattleCard('brocks-rhyhorn', 1)
    const state = makeBattleState({
      player: makeBattleSide(playerCard, 5),
      opponent: makeBattleSide(brocksRhyhorn, 5),
    })
    const resolution = resolveTcgBattleAttack({
      state,
      sideKey: 'opponent',
      attacker: brocksRhyhorn,
      attack: takeDown as TcgBattleAttack,
      target: playerCard,
    })

    expect(resolution.targetDamage).toBe(40)
    expect(resolution.selfDamage).toBe(10)
  })

  test("filters Fossil Slowpoke's Scavenge as unsupported utility text", async () => {
    const card = await getTcgCardDetailById('base3-55')
    expect(card).toBeTruthy()
    const attacks = getSupportedTcgBattleAttacks(card?.attacks || [])
    expect(attacks.some((attack) => attack.name === 'Scavenge')).toBe(false)
  })

  test("supports Fossil Zubat's Leech Life damage-based healing", async () => {
    const card = await getTcgCardDetailById('base3-57')
    expect(card).toBeTruthy()
    const attacks = getSupportedTcgBattleAttacks(card?.attacks || [])
    const leechLife = attacks.find((attack) => attack.name === 'Leech Life')
    expect(leechLife).toBeTruthy()

    const attacker = makeBattleCard('zubat', 2)
    attacker.currentHp = 20
    const defender = makeBattleCard('defender', 1)
    defender.weaknesses = [{ type: 'Colorless', value: '×2' }]
    const state = makeBattleState({
      player: makeBattleSide(attacker, 5),
      opponent: makeBattleSide(defender, 5),
    })

    const resolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker,
      attack: leechLife as TcgBattleAttack,
      target: defender,
    })

    expect(resolution.targetDamage).toBe(20)
    expect(resolution.healing).toEqual([
      { targetSide: 'player', targetId: attacker.instanceId, amount: 20 },
    ])
  })

  test("supports Hide in Shell-style next-turn full damage prevention", () => {
    const shellCard = makeBattleCard('shellder', 1)
    const opponentCard = makeBattleCard('opponent-card', 1)
    const state = makeBattleState({
      player: makeBattleSide(shellCard, 5),
      opponent: makeBattleSide(opponentCard, 5),
    })
    const [hideInShell] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '',
        text: "Flip a coin. If heads, prevent all damage done to Shellder during your opponent's next turn.",
      }),
    ])
    const protectionResolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: shellCard,
      attack: hideInShell,
      target: opponentCard,
      random: () => 0.9,
    })
    expect(protectionResolution.protection).toEqual([
      {
        targetSide: 'player',
        targetId: shellCard.instanceId,
        modifier: { kind: 'preventAll', remainingOpponentTurns: 1 },
      },
    ])

    shellCard.incomingAttackModifier = { kind: 'preventAll', remainingOpponentTurns: 1 }
    const [hitAttack] = getSupportedTcgBattleAttacks([makeAttack({ damage: '20', text: '' })])
    const prevented = resolveTcgBattleAttack({
      state,
      sideKey: 'opponent',
      attacker: opponentCard,
      attack: hitAttack,
      target: shellCard,
    })
    expect(prevented.targetDamage).toBe(0)
  })

  test('supports Minimize-style next-turn damage reduction', () => {
    const grimer = makeBattleCard('grimer', 1)
    const opponentCard = makeBattleCard('opponent-card', 1)
    const state = makeBattleState({
      player: makeBattleSide(grimer, 5),
      opponent: makeBattleSide(opponentCard, 5),
    })
    const [minimize] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '',
        text: "All damage done by attacks to Grimer during your opponent's next turn is reduced by 20.",
      }),
    ])
    const protectionResolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: grimer,
      attack: minimize,
      target: opponentCard,
    })
    expect(protectionResolution.protection).toEqual([
      {
        targetSide: 'player',
        targetId: grimer.instanceId,
        modifier: { kind: 'reduce', amount: 20, remainingOpponentTurns: 1 },
      },
    ])

    grimer.incomingAttackModifier = { kind: 'reduce', amount: 20, remainingOpponentTurns: 1 }
    const [hitAttack] = getSupportedTcgBattleAttacks([makeAttack({ damage: '30', text: '' })])
    const reduced = resolveTcgBattleAttack({
      state,
      sideKey: 'opponent',
      attacker: opponentCard,
      attack: hitAttack,
      target: grimer,
    })
    expect(reduced.targetDamage).toBe(10)
  })

  test('resolves simplified self and opponent energy discard effects after attack cost', () => {
    const playerCard = makeBattleCard('player-card', 4)
    const opponentCard = makeBattleCard('opponent-card', 1)
    const state = makeBattleState({
      player: makeBattleSide(playerCard, 6),
      opponent: makeBattleSide(opponentCard, 3),
    })
    const [selfDiscardAll] = getSupportedTcgBattleAttacks([
      makeAttack({
        convertedEnergyCost: 4,
        cost: Array.from({ length: 4 }, () => 'Colorless'),
        damage: '80',
        text: 'Discard all Energy attached to this Pokémon.',
      }),
    ])

    const resolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: playerCard,
      attack: selfDiscardAll,
      target: opponentCard,
    })

    expect(selfDiscardAll.battleEffect?.energyDiscard).toEqual([{ target: 'self', amount: 'all' }])
    expect(resolution.targetDamage).toBe(80)
    expect(resolution.energyDiscards).toEqual([{ target: 'self', amount: 2, requestedAmount: 'all' }])

    state.player.energy -= selfDiscardAll.convertedEnergyCost || 0
    applyTcgBattleEnergyDiscards(state, 'player', resolution.energyDiscards)
    expect(state.player.energy).toBe(0)

    const oneEnergyCard = makeBattleCard('one-energy-card', 1)
    const oneEnergyState = makeBattleState({
      player: makeBattleSide(oneEnergyCard, 1),
      opponent: makeBattleSide(opponentCard, 3),
    })
    const [selfDiscardOne] = getSupportedTcgBattleAttacks([
      makeAttack({
        convertedEnergyCost: 1,
        cost: ['Colorless'],
        damage: '30',
        text: 'Discard an Energy attached to this Pokémon.',
      }),
    ])
    const oneEnergyResolution = resolveTcgBattleAttack({
      state: oneEnergyState,
      sideKey: 'player',
      attacker: oneEnergyCard,
      attack: selfDiscardOne,
      target: opponentCard,
    })

    expect(oneEnergyResolution.targetDamage).toBe(30)
    expect(oneEnergyResolution.energyDiscards).toBeUndefined()

    const [opponentDiscard] = getSupportedTcgBattleAttacks([
      makeAttack({
        convertedEnergyCost: 1,
        cost: ['Colorless'],
        damage: '40',
        text: "Discard 2 Energy from your opponent's Active Pokémon.",
      }),
    ])
    const opponentDiscardState = makeBattleState({
      player: makeBattleSide(playerCard, 3),
      opponent: makeBattleSide(opponentCard, 3),
    })
    const opponentResolution = resolveTcgBattleAttack({
      state: opponentDiscardState,
      sideKey: 'player',
      attacker: playerCard,
      attack: opponentDiscard,
      target: opponentCard,
    })

    expect(opponentDiscard.battleEffect?.energyDiscard).toEqual([{ target: 'opponent', amount: 2 }])
    expect(opponentResolution.energyDiscards).toEqual([{ target: 'opponent', amount: 2, requestedAmount: 2 }])

    const [pureDiscard] = getSupportedTcgBattleAttacks([
      makeAttack({
        convertedEnergyCost: 1,
        cost: ['Colorless'],
        damage: '',
        text: "Discard an Energy attached to your opponent's Active Pokémon.",
      }),
    ])

    expect(pureDiscard.battleEffect?.damage).toEqual({ kind: 'fixed', amount: 0 })
    expect(pureDiscard.battleEffect?.energyDiscard).toEqual([{ target: 'opponent', amount: 1 }])
  })

  test('infers and applies simplified TCG status conditions', () => {
    const playerCard = makeBattleCard('player-card', 1)
    const secondPlayerCard = makeBattleCard('second-player-card', 2)
    const opponentLeadCard = makeBattleCard('opponent-lead-card', 1)
    const opponentCard = makeBattleCard('opponent-card', 2)
    const state = makeBattleState({
      player: makeBattleSide(playerCard, 5, { front: [playerCard, secondPlayerCard] }),
      opponent: makeBattleSide(opponentLeadCard, 5, { front: [opponentLeadCard, opponentCard] }),
    })
    const [tripleStatus] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '20',
        text: "Your opponent's Active Pokémon is now Burned, Confused, and Poisoned.",
      }),
    ])

    const resolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: playerCard,
      attack: tripleStatus,
      target: opponentCard,
    })

    expect(tripleStatus.battleEffect?.status).toEqual([
      { target: 'opponent', statuses: ['poisoned', 'burned', 'confused'], condition: undefined },
    ])
    expect(resolution.statusConditions).toEqual([
      { target: 'opponent', statuses: ['poisoned', 'burned', 'confused'] },
    ])

    applyTcgBattleStatusConditions(
      state,
      'player',
      playerCard.instanceId,
      opponentCard.instanceId,
      resolution.statusConditions,
    )
    expect(opponentLeadCard.statusConditions).toBeUndefined()
    expect(opponentCard.statusConditions).toEqual(['poisoned', 'burned', 'confused'])

    const [conditionalStatus] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '10',
        text: "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed.",
      }),
    ])
    const tailsResolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: playerCard,
      attack: conditionalStatus,
      target: opponentCard,
      random: () => 0.1,
    })
    const headsResolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: playerCard,
      attack: conditionalStatus,
      target: opponentCard,
      random: () => 0.9,
    })

    expect(tailsResolution.statusConditions).toBeUndefined()
    expect(headsResolution.statusConditions).toEqual([{ target: 'opponent', statuses: ['paralyzed'] }])
    applyTcgBattleStatusConditions(
      state,
      'player',
      playerCard.instanceId,
      opponentCard.instanceId,
      headsResolution.statusConditions,
    )
    expect(opponentCard.statusConditions).toEqual(['poisoned', 'burned', 'paralyzed'])

    const [selfStatus] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '10',
        text: 'This Pokémon is now Confused.',
      }),
    ])
    const selfResolution = resolveTcgBattleAttack({
      state,
      sideKey: 'player',
      attacker: secondPlayerCard,
      attack: selfStatus,
      target: opponentCard,
    })
    applyTcgBattleStatusConditions(
      state,
      'player',
      secondPlayerCard.instanceId,
      opponentCard.instanceId,
      selfResolution.statusConditions,
    )
    expect(playerCard.statusConditions).toBeUndefined()
    expect(secondPlayerCard.statusConditions).toEqual(['confused'])

    const [statusRequirementText] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '10',
        text: 'This attack can be used if this Pokémon is Asleep. If it is not Asleep, this attack does nothing.',
      }),
    ])
    expect(statusRequirementText.battleEffect?.status).toBeUndefined()
  })

  test('resolves sleep, paralysis, and confusion attack checks', () => {
    const sleepingCard = makeBattleCard('sleeping-card', 1)
    sleepingCard.statusConditions = ['asleep']

    const failedSleepCheck = resolveTcgBattleStatusAttackCheck(sleepingCard, () => 0.1)
    const clearedSleepCheck = resolveTcgBattleStatusAttackCheck(sleepingCard, () => 0.9)

    expect(failedSleepCheck).toMatchObject({
      canAttack: false,
      blockedStatus: 'asleep',
      selfDamage: 0,
    })
    expect(clearedSleepCheck).toMatchObject({
      canAttack: true,
      clearedStatus: 'asleep',
      selfDamage: 0,
    })

    const confusedCard = makeBattleCard('confused-card', 1)
    confusedCard.statusConditions = ['confused']
    const failedConfusionCheck = resolveTcgBattleStatusAttackCheck(confusedCard, () => 0.1)

    expect(failedConfusionCheck).toMatchObject({
      canAttack: false,
      blockedStatus: 'confused',
      selfDamage: 10,
    })
    expect(failedConfusionCheck.coinFlips?.tails).toBe(1)
  })

  test('resolves board-state and damage-counter formulas', () => {
    const playerCard = makeBattleCard('player-card', 1)
    const opponentCard = makeBattleCard('opponent-card', 1)
    opponentCard.currentHp = 30
    const opponentBench = makeBattleCard('opponent-bench', 1)
    const state = makeBattleState({
      player: makeBattleSide(playerCard, 5),
      opponent: {
        ...makeBattleSide(opponentCard, 5),
        back: [opponentBench],
      },
    })
    const [benchAttack, counterAttack] = getSupportedTcgBattleAttacks([
      makeAttack({
        damage: '20+',
        text: "This attack does 20 more damage for each of your opponent's Benched Pokémon.",
      }),
      makeAttack({
        damage: '10+',
        text: "This attack does 10 more damage for each damage counter on your opponent's Active Pokémon.",
      }),
    ])

    expect(calculateTcgBattleDamage(playerCard, benchAttack, opponentCard, state, 'player')).toBe(40)
    expect(calculateTcgBattleDamage(playerCard, counterAttack, opponentCard, state, 'player')).toBe(30)
  })

  test('calculates deck costs by evolution and special card tier', async () => {
    const diglett = await getTcgCardDetailById('base1-47')
    const dugtrio = await getTcgCardDetailById('base1-19')
    const charizard = await getTcgCardDetailById('base1-4')
    const mewtwo = await getTcgCardDetailById('base1-10')
    const mewtwoV = await getTcgCardDetailById('pgo-30')

    expect(diglett && calculateTcgBattleCardCost(diglett)).toBe(1)
    expect(dugtrio && calculateTcgBattleCardCost(dugtrio)).toBe(3)
    expect(charizard && calculateTcgBattleCardCost(charizard)).toBe(5)
    expect(mewtwo && calculateTcgBattleCardCost(mewtwo)).toBe(5)
    expect(mewtwoV && calculateTcgBattleCardCost(mewtwoV)).toBe(10)
  })

  test('validates test encounter opponent decks resolve to legal cards', async () => {
    const tcgBattleGames = allGames.filter(
      (game): game is TcgBattleGameConfig => game.gameType === 'tcg-battle',
    )
    expect(tcgBattleGames.length).toBe(3)

    for (const game of tcgBattleGames) {
      expect(game.settings.opponentDeckCardIds).toHaveLength(15)
      const cards = await Promise.all(
        game.settings.opponentDeckCardIds.map((cardId) => buildTcgBattleCardSummary(cardId)),
      )
      expect(cards.every(Boolean)).toBe(true)
    }
  })

  test('rejects decks over the format cost cap', async () => {
    const cardIds = [
      'base1-4',
      'base1-2',
      'base1-15',
      'base1-10',
      'base1-11',
      'base1-12',
      'base1-16',
      'base3-1',
      'base3-12',
      'pgo-30',
      'pgo-31',
      'pgo-48',
      'pgo-49',
      'pgo-50',
      'pgo-58',
    ]
    const collection = Object.fromEntries(cardIds.map((cardId) => [cardId, 1]))
    const result = await validateTcgBattleDeck(cardIds, collection, 'baby')

    expect(result.valid).toBe(false)
    expect(result.totalCost).toBeGreaterThan(TCG_BATTLE_FORMATS.baby.deckCostLimit)
  })

  test('ramps attack energy caps by turn bands', () => {
    expect(getAllowedTcgBattleAttackCost(1)).toBe(1)
    expect(getAllowedTcgBattleAttackCost(2)).toBe(1)
    expect(getAllowedTcgBattleAttackCost(3)).toBe(2)
    expect(getAllowedTcgBattleAttackCost(4)).toBe(2)
    expect(getAllowedTcgBattleAttackCost(5)).toBe(3)
    expect(getAllowedTcgBattleAttackCost(6)).toBe(3)
    expect(getAllowedTcgBattleAttackCost(7)).toBe(4)
    expect(getAllowedTcgBattleAttackCost(9)).toBe(4)
    expect(getAllowedTcgBattleAttackCost(10)).toBe(Number.POSITIVE_INFINITY)
  })

  test('applies turn-15 selected energy cost reductions from both sides', () => {
    const attack = makeAttack({
      cost: ['Grass', 'Grass', 'Grass'],
      convertedEnergyCost: 3,
    })

    const beforeActivation = makeBattleState({
      turnNumber: 14,
      player: { ...makeBattleSide(makeBattleCard('player-card', 3), 5), selectedEnergy: 'Grass' },
      opponent: { ...makeBattleSide(makeBattleCard('opponent-card', 3), 5), selectedEnergy: 'Grass' },
    })
    expect(getEffectiveTcgBattleAttackCost(beforeActivation, attack)).toBe(3)

    const afterActivation = makeBattleState({
      turnNumber: 15,
      player: { ...makeBattleSide(makeBattleCard('player-card', 3), 5), selectedEnergy: 'Grass' },
      opponent: { ...makeBattleSide(makeBattleCard('opponent-card', 3), 5), selectedEnergy: 'Grass' },
    })
    expect(getEffectiveTcgBattleAttackCost(afterActivation, attack)).toBe(1)
  })

  test('only reduces matching energy types after activation', () => {
    const mixedAttack = makeAttack({
      cost: ['Grass', 'Fire', 'Colorless'],
      convertedEnergyCost: 3,
    })
    const state = makeBattleState({
      turnNumber: 15,
      player: { ...makeBattleSide(makeBattleCard('player-card', 3), 5), selectedEnergy: 'Grass' },
      opponent: { ...makeBattleSide(makeBattleCard('opponent-card', 3), 5), selectedEnergy: 'Water' },
    })

    expect(getEffectiveTcgBattleAttackCost(state, mixedAttack)).toBe(2)
  })

  test('gates high-tier cards by turn', () => {
    expect(getTcgBattleCardUnlockTurn(1)).toBe(1)
    expect(getTcgBattleCardUnlockTurn(5)).toBe(1)
    expect(getTcgBattleCardUnlockTurn(10)).toBe(7)
    expect(getTcgBattleCardUnlockTurn(15)).toBe(10)
    expect(isTcgBattleCardUnlocked(10, 6)).toBe(false)
    expect(isTcgBattleCardUnlocked(10, 7)).toBe(true)
    expect(isTcgBattleCardUnlocked(15, 9)).toBe(false)
    expect(isTcgBattleCardUnlocked(15, 10)).toBe(true)
    expect(getTcgBattleCardUnlockTurnForCard({ cost: 3, subtypes: ['Stage 1'] })).toBe(3)
    expect(getTcgBattleCardUnlockTurnForCard({ cost: 5, subtypes: ['Stage 2'] })).toBe(5)
    expect(getTcgBattleCardUnlockTurnForCard({ cost: 10, subtypes: ['Basic'] })).toBe(7)
    expect(getTcgBattleCardUnlockTurnForCard({ cost: 15, subtypes: ['Stage 2'] })).toBe(10)
  })

  test('advances TCG battle turns after both sides have acted', () => {
    expect(getNextTcgBattleTurnNumber(1, 'player', 'opponent')).toBe(1)
    expect(getNextTcgBattleTurnNumber(1, 'opponent', 'player')).toBe(2)
    expect(getAllowedTcgBattleAttackCost(3)).toBe(2)
    expect(getAllowedTcgBattleAttackCost(getNextTcgBattleTurnNumber(3, 'player', 'opponent'))).toBe(2)
    expect(getAllowedTcgBattleAttackCost(getNextTcgBattleTurnNumber(3, 'opponent', 'player'))).toBe(2)
  })

  test('does not end by pass stall before final attack allowance', () => {
    const state = makeBattleState({ turnNumber: 9 })

    expect(canTcgBattleEndByPassStall(state)).toBe(false)
  })

  test('does not end by pass stall while either side has a legal attack', () => {
    const state = makeBattleState({
      player: makeBattleSide(makeBattleCard('player-card', 3), 3),
    })

    expect(canTcgBattleEndByPassStall(state)).toBe(false)
  })

  test('ends by pass stall only after both passes at final allowance with no legal attacks', () => {
    const notEnoughPasses = makeBattleState({ consecutivePasses: 1 })
    const stalled = makeBattleState({
      player: makeBattleSide(makeBattleCard('player-card', 99), TCG_BATTLE_FORMATS.baby.energyCap),
      opponent: makeBattleSide(makeBattleCard('opponent-card', 99), TCG_BATTLE_FORMATS.baby.energyCap),
    })

    expect(canTcgBattleEndByPassStall(notEnoughPasses)).toBe(false)
    expect(canTcgBattleEndByPassStall(stalled)).toBe(true)
  })

  test('does not end by pass stall while either side can still charge', () => {
    const state = makeBattleState({
      player: makeBattleSide(makeBattleCard('player-card', 99), TCG_BATTLE_FORMATS.baby.energyCap - 1),
      opponent: makeBattleSide(makeBattleCard('opponent-card', 99), TCG_BATTLE_FORMATS.baby.energyCap),
    })

    expect(canSideChargeEnergy(state, 'player')).toBe(true)
    expect(canTcgBattleEndByPassStall(state)).toBe(false)
  })
})
