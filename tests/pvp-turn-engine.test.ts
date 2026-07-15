import { describe, expect, test } from 'bun:test'
import { createInitialPowersState } from '@/data/powers'
import { getMove } from '@/data/moves'
import {
  advancePvpPowerStateForTurn,
  applyDimensionalChargeForResult,
  consumeQueuedMovePowerUses,
  invertBattleResult,
  resolvePvpCombat,
  resolvePvpFaint,
  resolvePvpSwap,
} from '@/utilities/battle/engine/pvp-turn'
import { resolvePvpTurn } from '@/app/(frontend)/game/battles/pvp/resolution'
import { applySecondaryStatusesFromMove } from '@/utilities/battle/secondary-statuses'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'

function makePokemon(overrides: Partial<BattlePokemon> = {}): BattlePokemon {
  return {
    id: 'pokemon-1',
    user: 'user-1',
    originalTrainer: 'user-1',
    speciesId: 1,
    formId: '1',
    level: 50,
    name: 'Bulbasaur',
    types: ['Grass'],
    stats: {
      hp: 100,
      attack: 50,
      defense: 50,
      specialAttack: 50,
      specialDefense: 50,
      speed: 50,
    },
    currentHp: 100,
    maxHp: 100,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

function makeBattleState(): BattleState {
  const playerPowers = createInitialPowersState()
  const enemyPowers = createInitialPowersState()

  return {
    playerTeam: [
      makePokemon({ id: 'player-1', user: 'player', name: 'Player One' }),
      makePokemon({ id: 'player-2', user: 'player', name: 'Player Two' }),
    ],
    enemyTeam: [
      makePokemon({ id: 'enemy-1', user: 'enemy', name: 'Enemy One' }),
      makePokemon({ id: 'enemy-2', user: 'enemy', name: 'Enemy Two' }),
    ],
    activePlayerIndex: 0,
    activeEnemyIndex: 0,
    turn: 1,
    history: [],
    status: 'ongoing',
    battleId: 'battle',
    playerName: 'Player',
    enemyName: 'Enemy',
    itemsUsedThisBattle: [],
    powers: playerPowers,
    pvpPowers: { player: playerPowers, enemy: enemyPowers },
  }
}

function withFailOnStance<T extends 'loss' | 'tie'>(
  moveId: string,
  failOnStance: T,
  run: () => void,
): void {
  const move = getMove(moveId)
  expect(move).toBeDefined()
  if (!move) return

  const originalFailOnStance = move.failOnStance
  move.failOnStance = failOnStance
  try {
    run()
  } finally {
    if (originalFailOnStance === undefined) {
      delete move.failOnStance
    } else {
      move.failOnStance = originalFailOnStance
    }
  }
}

describe('PVP turn engine helpers', () => {
  test('initial powers default to trained move uses and one use per power system', () => {
    const powers = createInitialPowersState()

    expect(powers.moveUsesRemaining).toBe(2)
    expect(powers.teraUsesRemaining).toBe(1)
    expect(powers.megaUsesRemaining).toBe(1)
    expect(powers.zMoveUsesRemaining).toBe(1)
    expect(powers.dynamaxUsesRemaining).toBe(1)
    expect(powers.victoryUsesRemaining).toBe(1)
    expect(powers.weatherUsesRemaining).toBe(1)
    expect(powers.shoutUsesRemaining).toBe(1)
    expect(powers.circadianUsesRemaining).toBe(1)
  })

  test('inverts battle results from the opposing perspective', () => {
    expect(invertBattleResult('win')).toBe('loss')
    expect(invertBattleResult('loss')).toBe('win')
    expect(invertBattleResult('tie')).toBe('tie')
  })

  test('consumes queued special move uses only', () => {
    const powers = createInitialPowersState({
      movesPerBattle: 2,
      zMovesPerBattle: 1,
    })
    const move = { specialMoveId: 'test-move', powers: { zMove: true } }

    expect(consumeQueuedMovePowerUses(move, powers)).toEqual({
      specialMoveConsumed: true,
      zMoveConsumed: false,
    })
    expect(powers.moveUsesRemaining).toBe(1)
    expect(powers.zMoveUsesRemaining).toBe(1)
    expect(powers.zMoveUsed).toBe(false)

    expect(
      consumeQueuedMovePowerUses({ powers: { zMove: true } }, powers),
    ).toEqual({
      specialMoveConsumed: false,
      zMoveConsumed: false,
    })
  })

  test('consumes queued special move uses from the active Pokemon budget', () => {
    const powers = createInitialPowersState({
      movesPerBattle: 5,
      zMovesPerBattle: 1,
    })
    const firstPokemon = makePokemon({ id: 'first', moveUsesRemaining: 2 })
    const secondPokemon = makePokemon({ id: 'second', moveUsesRemaining: 5 })

    expect(
      consumeQueuedMovePowerUses(
        { specialMoveId: 'test-move', powers: {} },
        powers,
        firstPokemon,
      ),
    ).toEqual({
      specialMoveConsumed: true,
      zMoveConsumed: false,
    })
    expect(firstPokemon.moveUsesRemaining).toBe(1)
    expect(secondPokemon.moveUsesRemaining).toBe(5)
    expect(powers.moveUsesRemaining).toBe(1)
  })

  test('prepared Z-Move powers a normal stance once and clears the charge', () => {
    const attacker = makePokemon({
      name: 'Attacker',
      zMoveReady: true,
      stats: {
        hp: 100,
        attack: 120,
        defense: 50,
        specialAttack: 120,
        specialDefense: 50,
        speed: 60,
      },
    })
    const defender = makePokemon({
      name: 'Defender',
      currentHp: 1000,
      maxHp: 1000,
    })

    const result = resolvePvpCombat({
      attacker,
      defender,
      move: { stance: 'power', attackType: 'grass', powers: { zMove: true } },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'power' },
      enemyMove: { stance: 'tech' },
    })

    expect(result.didAttack).toBe(true)
    expect(result.dmg).toBeGreaterThan(0)
    expect(attacker.zMoveReady).toBeUndefined()
  })

  test('fused Necrozma becomes Ultra Necrozma when using a prepared Z-Move', () => {
    const attacker = makePokemon({
      name: 'Necrozma',
      speciesId: 800,
      formId: '10155',
      zMoveReady: true,
      level: 70,
      currentHp: 120,
      maxHp: 240,
      stats: {
        hp: 240,
        attack: 160,
        defense: 120,
        specialAttack: 130,
        specialDefense: 110,
        speed: 80,
      },
    })
    const defender = makePokemon({
      name: 'Defender',
      currentHp: 1000,
      maxHp: 1000,
    })

    resolvePvpCombat({
      attacker,
      defender,
      move: { stance: 'power', attackType: 'psychic', powers: { zMove: true } },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'power' },
      enemyMove: { stance: 'tech' },
    })

    expect(attacker.zMoveReady).toBeUndefined()
    expect(attacker.originalFormId).toBe('10155')
    expect(attacker.formId).toBe('10157')
    expect(attacker.types).toEqual(['Psychic', 'Dragon'])
    expect(attacker.currentHp / attacker.maxHp).toBeCloseTo(0.5, 1)
  })

  test('advances timed powers without expiring Mega Evolution', () => {
    const powers = createInitialPowersState()
    powers.turnsPlayedThisBattle = 4
    powers.megaEvolved = true

    const pokemon = makePokemon({
      isMega: true,
      originalFormId: '1',
      formId: '10033',
    })

    advancePvpPowerStateForTurn(pokemon, powers)

    expect(powers.dynamaxAvailable).toBe(true)
    expect(powers.megaEvolved).toBe(true)
    expect(pokemon.isMega).toBe(true)
    expect(pokemon.formId).toBe('10033')
  })

  test('advances active Tera duration after the activation turn', () => {
    const powers = createInitialPowersState()
    const pokemon = makePokemon({
      teraType: 'fire',
      teraTypeOverride: 'fire',
      teraTurnsRemaining: 3,
      teraActivatedTurn: 2,
      teraUsed: true,
    })

    advancePvpPowerStateForTurn(pokemon, powers, 2)
    expect(pokemon.teraTypeOverride).toBe('fire')
    expect(pokemon.teraTurnsRemaining).toBe(3)

    advancePvpPowerStateForTurn(pokemon, powers, 3)
    advancePvpPowerStateForTurn(pokemon, powers, 4)
    advancePvpPowerStateForTurn(pokemon, powers, 5)
    expect(pokemon.teraTypeOverride).toBeUndefined()
    expect(pokemon.teraTurnsRemaining).toBeUndefined()
  })

  test('applies dimensional shift charge by result', () => {
    const powers = createInitialPowersState()
    applyDimensionalChargeForResult(powers, 'win')
    applyDimensionalChargeForResult(powers, 'loss')
    applyDimensionalChargeForResult(powers, 'tie')

    expect(powers.dimensionalShift.charges).toEqual({
      wins: 1,
      losses: 1,
      draws: 1,
    })
  })

  test('resolves faint replacement and battle end state', () => {
    const state = {
      activePlayerIndex: 0,
      activeEnemyIndex: 0,
      playerName: 'Player',
      enemyName: 'Opponent',
      turn: 7,
      status: 'ongoing' as 'ongoing' | 'won' | 'lost',
    }

    const team = [
      makePokemon({ currentHp: 0 }),
      makePokemon({ id: 'pokemon-2', currentHp: 50 }),
    ]
    expect(resolvePvpFaint(state, team, 'player')).toEqual([
      'Bulbasaur fainted!',
      'Player sent out Bulbasaur!',
    ])
    expect(state.activePlayerIndex).toBe(1)
    expect(team[1].activeTurnStarted).toBe(8)

    team[1].currentHp = 0
    expect(resolvePvpFaint(state, team, 'player').at(-1)).toBe(
      'Player has no more Pokemon! Opponent wins!',
    )
    expect(state.status).toBe('lost')
  })

  test('resolves PVP swaps and victory swap status', () => {
    const state = makeBattleState()
    const playerPowers = state.pvpPowers!.player
    const enemyPowers = state.pvpPowers!.enemy

    const result = resolvePvpSwap({
      state,
      team: state.playerTeam,
      move: { attackType: 'victory-swap:1' },
      side: 'player',
      playerPowers,
      enemyPowers,
    })

    expect(result).toEqual({ swapped: true, name: 'Player Two', messages: [] })
    expect(state.activePlayerIndex).toBe(1)
    expect(state.playerTeam[1].activeTurnStarted).toBe(state.turn + 1)
    expect(state.playerTeam[1].status).toEqual({ id: 'victory', counter: 0 })
  })

  test('PVP swaps process switch-out battle abilities', () => {
    const state = makeBattleState()
    state.playerTeam[0] = makePokemon({
      id: 'palafin',
      user: 'player',
      name: 'Palafin',
      speciesId: 964,
      formId: '964',
      ability: 'zero_to_hero',
      types: ['Water'],
    })
    const playerPowers = state.pvpPowers!.player
    const enemyPowers = state.pvpPowers!.enemy

    const result = resolvePvpSwap({
      state,
      team: state.playerTeam,
      move: { attackType: 'swap:1' },
      side: 'player',
      playerPowers,
      enemyPowers,
    })

    expect(result.swapped).toBe(true)
    expect(state.playerTeam[0].formId).toBe('10256')
    expect(result.messages).toEqual([
      "Palafin's Zero to Hero changed its form!",
    ])
  })

  test('blocks voluntary PVP swaps while trapped by a secondary status', () => {
    const state = makeBattleState()
    const playerPowers = state.pvpPowers!.player
    const enemyPowers = state.pvpPowers!.enemy

    applySecondaryStatusesFromMove({
      move: getMove('block')!,
      state,
      attacker: state.enemyTeam[0],
      defender: state.playerTeam[0],
      sourceSide: 'enemy',
      random: () => 0,
    })

    const result = resolvePvpSwap({
      state,
      team: state.playerTeam,
      move: { attackType: 'swap:1' },
      side: 'player',
      playerPowers,
      enemyPowers,
    })

    expect(result.swapped).toBe(false)
    expect(state.activePlayerIndex).toBe(0)
    expect(result.messages).toEqual([
      'Player One cannot switch out because of Blocked.',
    ])
  })

  test('blocks voluntary PVP swaps while trapped by an opposing ability', () => {
    const state = makeBattleState()
    state.enemyTeam[state.activeEnemyIndex] = makePokemon({
      name: 'Dugtrio',
      ability: 'arena_trap',
      types: ['Ground'],
    })
    state.playerTeam[state.activePlayerIndex] = makePokemon({
      name: 'Raichu',
      types: ['Electric'],
    })
    const playerPowers = state.pvpPowers!.player
    const enemyPowers = state.pvpPowers!.enemy

    const result = resolvePvpSwap({
      state,
      team: state.playerTeam,
      move: { attackType: 'swap:1' },
      side: 'player',
      playerPowers,
      enemyPowers,
    })

    expect(result.swapped).toBe(false)
    expect(state.activePlayerIndex).toBe(0)
    expect(result.messages).toEqual([
      "Raichu cannot switch out because of Dugtrio's Arena Trap.",
    ])
  })

  test('resolves PVP combat damage and result', () => {
    const attacker = makePokemon({
      name: 'Attacker',
      stats: {
        hp: 100,
        attack: 120,
        defense: 50,
        specialAttack: 120,
        specialDefense: 50,
        speed: 60,
      },
    })
    const defender = makePokemon({
      name: 'Defender',
      currentHp: 100,
      maxHp: 100,
    })

    const result = resolvePvpCombat({
      attacker,
      defender,
      move: { stance: 'power', attackType: 'grass' },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'power' },
      enemyMove: { stance: 'tech' },
    })

    expect(result.didAttack).toBe(true)
    expect(result.result).toBe('win')
    expect(result.dmg).toBeGreaterThan(0)
    expect(defender.currentHp).toBeLessThan(100)
    expect(result.message).toContain('Player: Attacker uses Power Attack!')
  })

  test('Parental Bond applies a second PVP hit and retriggers on-damaged hooks', () => {
    const attacker = makePokemon({
      name: 'Kangaskhan',
      ability: 'parental_bond',
      types: ['Normal'],
      currentHp: 100,
      maxHp: 100,
      stats: {
        hp: 100,
        attack: 120,
        defense: 50,
        specialAttack: 120,
        specialDefense: 50,
        speed: 60,
      },
    })
    const defender = makePokemon({
      name: 'Rough Target',
      ability: 'rough_skin',
      types: ['Normal'],
      currentHp: 500,
      maxHp: 500,
    })

    const result = resolvePvpCombat({
      attacker,
      defender,
      move: { stance: 'power', attackType: 'normal' },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'power' },
      enemyMove: { stance: 'tech' },
    })

    expect(result.didAttack).toBe(true)
    expect(result.dmg).toBeGreaterThan(0)
    expect(attacker.currentHp).toBe(76)
    expect(result.message).toContain("Kangaskhan's Parental Bond struck again!")
    expect(
      result.message.match(
        /Kangaskhan was hurt by Rough Target's Rough Skin! \[icon:damage:12\]/g,
      ),
    ).toHaveLength(2)
  })

  test('low-HP self-switch abilities force PVP replacements and prevent counters', () => {
    const state = makeBattleState()
    state.playerTeam[0] = makePokemon({
      name: 'Attacker',
      stats: {
        hp: 100,
        attack: 140,
        defense: 50,
        specialAttack: 140,
        specialDefense: 50,
        speed: 80,
      },
    })
    state.enemyTeam[0] = makePokemon({
      name: 'Golisopod',
      ability: 'emergency_exit',
      currentHp: 80,
      maxHp: 100,
    })
    state.enemyTeam[1] = makePokemon({
      id: 'enemy-bench',
      name: 'Bench Enemy',
    })

    const result = resolvePvpCombat({
      state,
      attacker: state.playerTeam[0],
      defender: state.enemyTeam[0],
      move: { stance: 'power', attackType: 'grass' },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'power' },
      enemyMove: { stance: 'tech' },
    })

    expect(result.didAttack).toBe(true)
    expect(result.preventsOpponentDamage).toBe(true)
    expect(state.activeEnemyIndex).toBe(1)
    expect(result.message).toContain(
      "Golisopod's Emergency Exit made it retreat!",
    )
    expect(result.message).toContain(
      'Golisopod went back, and Bench Enemy took its place.',
    )
  })

  test('captivate only lowers Sp. Atk against opposite gender targets', () => {
    const state = makeBattleState()
    const attacker = state.playerTeam[0]
    const defender = state.enemyTeam[0]
    attacker.gender = 'male'
    defender.gender = 'female'

    const applied = resolvePvpCombat({
      state,
      attacker,
      defender,
      move: { stance: 'tech', specialMoveId: 'captivate' },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'tech', specialMoveId: 'captivate' },
      enemyMove: { stance: 'power' },
      random: () => 0,
    })

    expect(applied.didAttack).toBe(true)
    expect(defender.statStages?.specialAttack).toBe(-2)
    expect(applied.message).toContain("Enemy One's specialAttack fell!")

    defender.statStages = undefined
    defender.gender = 'male'
    const failed = resolvePvpCombat({
      state,
      attacker,
      defender,
      move: { stance: 'tech', specialMoveId: 'captivate' },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'tech', specialMoveId: 'captivate' },
      enemyMove: { stance: 'power' },
      random: () => 0,
    })

    expect(failed.didAttack).toBe(false)
    expect(defender.statStages).toBeUndefined()
    expect(failed.message).toContain(
      'Captivate failed because the genders are not compatible.',
    )
  })

  test('Quick Attack uses effective Speed contest to hit and prevent counter damage', () => {
    const attacker = makePokemon({
      name: 'Attacker',
      stats: {
        hp: 100,
        attack: 50,
        defense: 50,
        specialAttack: 50,
        specialDefense: 50,
        speed: 40,
      },
      statStages: {
        attack: 0,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 2,
        crit: 0,
        accuracy: 0,
        evasion: 0,
      },
    })
    const defender = makePokemon({
      name: 'Defender',
      currentHp: 100,
      maxHp: 100,
      stats: {
        hp: 100,
        attack: 50,
        defense: 50,
        specialAttack: 50,
        specialDefense: 50,
        speed: 60,
      },
    })

    const result = resolvePvpCombat({
      attacker,
      defender,
      move: {
        stance: 'speed',
        attackType: 'normal',
        specialMoveId: 'quick-attack',
      },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'speed', specialMoveId: 'quick-attack' },
      enemyMove: { stance: 'power' },
    })

    expect(result.didAttack).toBe(true)
    expect(result.result).toBe('win')
    expect(result.dmg).toBeGreaterThan(0)
    expect(result.preventsOpponentDamage).toBe(true)
    expect(defender.currentHp).toBeLessThan(100)
    expect(result.message).toContain('avoided the counterattack')
  })

  test('Stall prevents priority moves from avoiding counter damage', () => {
    const attacker = makePokemon({
      name: 'Sableye',
      ability: 'stall',
      stats: {
        hp: 100,
        attack: 50,
        defense: 50,
        specialAttack: 50,
        specialDefense: 50,
        speed: 100,
      },
    })
    const defender = makePokemon({
      name: 'Defender',
      currentHp: 100,
      maxHp: 100,
      stats: {
        hp: 100,
        attack: 50,
        defense: 50,
        specialAttack: 50,
        specialDefense: 50,
        speed: 60,
      },
    })

    const result = resolvePvpCombat({
      attacker,
      defender,
      move: {
        stance: 'speed',
        attackType: 'normal',
        specialMoveId: 'quick-attack',
      },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'speed', specialMoveId: 'quick-attack' },
      enemyMove: { stance: 'power' },
    })

    expect(result.didAttack).toBe(true)
    expect(result.result).toBe('win')
    expect(result.dmg).toBeGreaterThan(0)
    expect(result.preventsOpponentDamage).toBe(false)
  })

  test('Quick Attack fails when the effective Speed contest is not won', () => {
    const attacker = makePokemon({
      name: 'Attacker',
      stats: {
        hp: 100,
        attack: 50,
        defense: 50,
        specialAttack: 50,
        specialDefense: 50,
        speed: 50,
      },
    })
    const defender = makePokemon({
      name: 'Defender',
      currentHp: 100,
      maxHp: 100,
      stats: {
        hp: 100,
        attack: 50,
        defense: 50,
        specialAttack: 50,
        specialDefense: 50,
        speed: 50,
      },
    })

    const result = resolvePvpCombat({
      attacker,
      defender,
      move: {
        stance: 'speed',
        attackType: 'normal',
        specialMoveId: 'quick-attack',
      },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'speed', specialMoveId: 'quick-attack' },
      enemyMove: { stance: 'power' },
    })

    expect(result.didAttack).toBe(false)
    expect(result.result).toBe('loss')
    expect(result.dmg).toBe(0)
    expect(result.preventsOpponentDamage).toBe(false)
    expect(defender.currentHp).toBe(100)
    expect(result.message).toContain('was not faster')
  })

  test('anti-priority abilities block PVP priority moves', () => {
    const attacker = makePokemon({
      name: 'Attacker',
      stats: {
        hp: 100,
        attack: 50,
        defense: 50,
        specialAttack: 50,
        specialDefense: 50,
        speed: 80,
      },
    })
    const defender = makePokemon({
      name: 'Farigiraf',
      ability: 'armor_tail',
      currentHp: 100,
      maxHp: 100,
      stats: {
        hp: 100,
        attack: 50,
        defense: 50,
        specialAttack: 50,
        specialDefense: 50,
        speed: 60,
      },
    })

    const blocked = resolvePvpCombat({
      attacker,
      defender,
      move: {
        stance: 'speed',
        attackType: 'normal',
        specialMoveId: 'quick-attack',
      },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'speed', specialMoveId: 'quick-attack' },
      enemyMove: { stance: 'power' },
      random: () => 0.99,
    })

    expect(blocked.didAttack).toBe(false)
    expect(blocked.dmg).toBe(0)
    expect(defender.currentHp).toBe(100)
    expect(blocked.message).toContain(
      "Farigiraf's Armor Tail blocked Quick Attack!",
    )
  })

  test('special move with failOnStance tie option fails on stance tie', () => {
    withFailOnStance('aerial-ace', 'tie', () => {
      const attacker = makePokemon({ name: 'Attacker' })
      const defender = makePokemon({
        name: 'Defender',
        currentHp: 100,
        maxHp: 100,
      })

      const result = resolvePvpCombat({
        attacker,
        defender,
        move: {
          stance: 'power',
          attackType: 'normal',
          specialMoveId: 'aerial-ace',
        },
        attackerName: 'Player',
        attackerSide: 'player',
        playerMove: { stance: 'power', specialMoveId: 'aerial-ace' },
        enemyMove: { stance: 'power', attackType: 'normal' },
      })

      expect(result.didAttack).toBe(false)
      expect(result.result).toBe('tie')
      expect(result.dmg).toBe(0)
      expect(result.preventsOpponentDamage).toBe(false)
    })
  })

  test('special move with failOnStance loss option only fails on loss', () => {
    withFailOnStance('aerial-ace', 'loss', () => {
      const attacker = makePokemon({
        name: 'Attacker',
        stats: {
          hp: 100,
          attack: 50,
          defense: 50,
          specialAttack: 50,
          specialDefense: 50,
          speed: 40,
        },
      })
      const defender = makePokemon({
        name: 'Defender',
        currentHp: 100,
        maxHp: 100,
        stats: {
          hp: 100,
          attack: 50,
          defense: 50,
          specialAttack: 50,
          specialDefense: 50,
          speed: 80,
        },
      })

      const result = resolvePvpCombat({
        attacker,
        defender,
        move: {
          stance: 'power',
          attackType: 'normal',
          specialMoveId: 'aerial-ace',
        },
        attackerName: 'Player',
        attackerSide: 'player',
        playerMove: { stance: 'power', specialMoveId: 'aerial-ace' },
        enemyMove: { stance: 'speed', attackType: 'normal' },
      })

      expect(result.didAttack).toBe(false)
      expect(result.result).toBe('loss')
      expect(result.dmg).toBe(0)
    })
  })

  test('special move with failOnStance loss option lands on tie', () => {
    withFailOnStance('aerial-ace', 'loss', () => {
      const attacker = makePokemon({
        name: 'Attacker',
        stats: {
          hp: 100,
          attack: 50,
          defense: 50,
          specialAttack: 50,
          specialDefense: 50,
          speed: 50,
        },
      })
      const defender = makePokemon({
        name: 'Defender',
        currentHp: 100,
        maxHp: 100,
        stats: {
          hp: 100,
          attack: 50,
          defense: 50,
          specialAttack: 50,
          specialDefense: 50,
          speed: 50,
        },
      })

      const result = resolvePvpCombat({
        attacker,
        defender,
        move: {
          stance: 'tech',
          attackType: 'normal',
          specialMoveId: 'aerial-ace',
        },
        attackerName: 'Player',
        attackerSide: 'player',
        playerMove: { stance: 'tech', specialMoveId: 'aerial-ace' },
        enemyMove: { stance: 'tech', attackType: 'normal' },
      })

      expect(result.didAttack).toBe(true)
      expect(result.result).toBe('tie')
      expect(result.dmg).toBeGreaterThan(0)
    })
  })

  test('sucker punch prevents the opponent attack on a stance win', () => {
    const attacker = makePokemon({ name: 'Attacker' })
    const defender = makePokemon({
      name: 'Defender',
      currentHp: 100,
      maxHp: 100,
    })

    const result = resolvePvpCombat({
      attacker,
      defender,
      move: {
        stance: 'speed',
        attackType: 'dark',
        specialMoveId: 'sucker-punch',
      },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'speed', specialMoveId: 'sucker-punch' },
      enemyMove: { stance: 'power', attackType: 'normal' },
    })

    expect(result.didAttack).toBe(true)
    expect(result.result).toBe('win')
    expect(result.dmg).toBeGreaterThan(0)
    expect(result.preventsOpponentDamage).toBe(true)
  })

  test('sucker punch fails without a stance win', () => {
    const attacker = makePokemon({ name: 'Attacker' })
    const defender = makePokemon({
      name: 'Defender',
      currentHp: 100,
      maxHp: 100,
    })

    const result = resolvePvpCombat({
      attacker,
      defender,
      move: {
        stance: 'speed',
        attackType: 'dark',
        specialMoveId: 'sucker-punch',
      },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'speed', specialMoveId: 'sucker-punch' },
      enemyMove: { stance: 'tech', attackType: 'normal' },
    })

    expect(result.didAttack).toBe(false)
    expect(result.result).toBe('loss')
    expect(result.dmg).toBe(0)
    expect(result.preventsOpponentDamage).toBe(false)
  })

  test('PVP combat triggers held HP berries after damage', () => {
    const attacker = makePokemon({
      name: 'Attacker',
      stats: {
        hp: 100,
        attack: 120,
        defense: 50,
        specialAttack: 120,
        specialDefense: 50,
        speed: 60,
      },
    })
    const defender = makePokemon({
      name: 'Defender',
      currentHp: 55,
      maxHp: 100,
      heldItem: { id: 'oran-berry', name: 'Oran Berry' },
    })

    const result = resolvePvpCombat({
      attacker,
      defender,
      move: { stance: 'power', attackType: 'grass' },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'power' },
      enemyMove: { stance: 'tech' },
    })

    expect(result.didAttack).toBe(true)
    expect(result.message).toContain('Defender used its Oran Berry!')
    expect(defender.heldItem).toBeUndefined()
    expect(defender.consumedHeldItems).toEqual([
      { itemId: 'oran-berry', name: 'Oran Berry' },
    ])
  })

  test('PVP combat no longer treats Hard Stone as a damage block item', () => {
    const attacker = makePokemon({
      name: 'Attacker',
      stats: {
        hp: 100,
        attack: 120,
        defense: 50,
        specialAttack: 120,
        specialDefense: 50,
        speed: 60,
      },
    })
    const defender = makePokemon({
      name: 'Defender',
      currentHp: 70,
      maxHp: 100,
      heldItem: { id: 'hard-stone', name: 'Hard Stone' },
    })

    const result = resolvePvpCombat({
      attacker,
      defender,
      move: { stance: 'power', attackType: 'grass' },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'power' },
      enemyMove: { stance: 'tech' },
      random: () => 0.5,
    })

    expect(result.didAttack).toBe(true)
    expect(result.message).not.toContain('blocked')
    expect(result.message).not.toContain('drops the stone')
    expect(defender.heldItem).toEqual({ id: 'hard-stone', name: 'Hard Stone' })
    expect(defender.consumedHeldItems).toBeUndefined()
  })

  test('PVP special moves can apply status effects', () => {
    const attacker = makePokemon({
      name: 'Farfetchd',
      speciesId: 83,
      formId: '83',
    })
    const defender = makePokemon({ name: 'Defender' })

    const result = resolvePvpCombat({
      attacker,
      defender,
      move: { stance: 'tech', specialMoveId: 'leek-spin' },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'tech', specialMoveId: 'leek-spin' },
      enemyMove: { stance: 'power' },
    })

    expect(result.didAttack).toBe(true)
    expect(result.dmg).toBe(0)
    expect(defender.status?.id).toBe('confusion')
    expect(result.message).toContain('[icon:status:confusion]')
  })

  test('PVP special moves trigger Synchronize status reflection', () => {
    const attacker = makePokemon({ name: 'Attacker', types: ['Normal'] })
    const defender = makePokemon({
      name: 'Espeon',
      ability: 'synchronize',
      types: ['Normal'],
    })

    const originalRandom = Math.random
    try {
      Math.random = () => 0
      const result = resolvePvpCombat({
        attacker,
        defender,
        move: { stance: 'tech', specialMoveId: 'thunder-wave' },
        attackerName: 'Player',
        attackerSide: 'player',
        playerMove: { stance: 'tech', specialMoveId: 'thunder-wave' },
        enemyMove: { stance: 'power' },
      })

      expect(result.didAttack).toBe(true)
      expect(defender.status?.id).toBe('paralysis')
      expect(attacker.status?.id).toBe('paralysis')
      expect(result.message).toContain("Espeon's Synchronize synchronized Attacker!")
    } finally {
      Math.random = originalRandom
    }
  })

  test('PVP special move self-damage can hurt the attacker', () => {
    const attacker = makePokemon({
      name: 'RockShieldUser',
      currentHp: 100,
      maxHp: 100,
    })
    const defender = makePokemon({ name: 'Defender' })

    const result = resolvePvpCombat({
      attacker,
      defender,
      move: { stance: 'power', specialMoveId: 'rock-shield' },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'power', specialMoveId: 'rock-shield' },
      enemyMove: { stance: 'tech' },
      random: () => 0,
    })

    expect(result.didAttack).toBe(true)
    expect(attacker.currentHp).toBe(50)
    expect(result.message).toContain(
      'RockShieldUser hurt itself! [icon:damage:50]',
    )
  })

  test('PVP recoil abilities prevent recoil without blocking HP-cost moves', () => {
    const rockHeadAttacker = makePokemon({
      name: 'RockHeadUser',
      ability: 'rock_head',
      currentHp: 100,
      maxHp: 100,
    })
    const defender = makePokemon({ name: 'Defender' })

    const recoilResult = resolvePvpCombat({
      attacker: rockHeadAttacker,
      defender,
      move: { stance: 'power', specialMoveId: 'double-edge' },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'power', specialMoveId: 'double-edge' },
      enemyMove: { stance: 'tech' },
      random: () => 0.99,
    })

    expect(recoilResult.didAttack).toBe(true)
    expect(rockHeadAttacker.currentHp).toBe(100)
    expect(recoilResult.message).toContain(
      "RockHeadUser's Rock Head prevented recoil damage!",
    )

    const hpCostAttacker = makePokemon({
      name: 'HpCostUser',
      ability: 'rock_head',
      currentHp: 100,
      maxHp: 100,
    })
    const hpCostResult = resolvePvpCombat({
      attacker: hpCostAttacker,
      defender: makePokemon({ name: 'Defender' }),
      move: { stance: 'tech', specialMoveId: 'steel-beam' },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'tech', specialMoveId: 'steel-beam' },
      enemyMove: { stance: 'power' },
      random: () => 0.99,
    })

    expect(hpCostResult.didAttack).toBe(true)
    expect(hpCostAttacker.currentHp).toBe(50)
    expect(hpCostResult.message).toContain(
      'HpCostUser hurt itself! [icon:damage:50]',
    )
  })

  test('PVP soundproof blocks incoming sound moves', () => {
    const attacker = makePokemon({
      name: 'Attacker',
      types: ['Normal'],
    })
    const defender = makePokemon({
      name: 'SoundproofTarget',
      ability: 'soundproof',
      currentHp: 100,
      maxHp: 100,
    })

    const blocked = resolvePvpCombat({
      attacker,
      defender,
      move: { stance: 'tech', specialMoveId: 'hyper-voice' },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'tech', specialMoveId: 'hyper-voice' },
      enemyMove: { stance: 'power' },
      random: () => 0.99,
    })

    expect(blocked.didAttack).toBe(false)
    expect(blocked.dmg).toBe(0)
    expect(defender.currentHp).toBe(100)
    expect(blocked.message).toContain(
      "SoundproofTarget's Soundproof blocked Hyper Voice!",
    )

    const notBlocked = resolvePvpCombat({
      attacker,
      defender,
      move: { stance: 'power', specialMoveId: 'double-edge' },
      attackerName: 'Player',
      attackerSide: 'player',
      playerMove: { stance: 'power', specialMoveId: 'double-edge' },
      enemyMove: { stance: 'tech' },
      random: () => 0.99,
    })

    expect(notBlocked.dmg).toBeGreaterThan(0)
  })

  test('PVP move-category abilities boost matching special moves', () => {
    const originalRandom = Math.random
    Math.random = () => 0.99
    try {
      const defender = makePokemon({ name: 'Defender' })
      const strongJaw = makePokemon({
        name: 'StrongJawUser',
        ability: 'strong_jaw',
        types: ['Dark'],
      })
      const baseline = makePokemon({
        name: 'Baseline',
        types: ['Dark'],
      })

      const boosted = resolvePvpCombat({
        attacker: strongJaw,
        defender: makePokemon({ name: 'Defender' }),
        move: { stance: 'power', specialMoveId: 'bite' },
        attackerName: 'Player',
        attackerSide: 'player',
        playerMove: { stance: 'power', specialMoveId: 'bite' },
        enemyMove: { stance: 'tech' },
        random: () => 0.99,
      })
      const unboosted = resolvePvpCombat({
        attacker: baseline,
        defender,
        move: { stance: 'power', specialMoveId: 'bite' },
        attackerName: 'Player',
        attackerSide: 'player',
        playerMove: { stance: 'power', specialMoveId: 'bite' },
        enemyMove: { stance: 'tech' },
        random: () => 0.99,
      })

      expect(boosted.dmg).toBeGreaterThan(unboosted.dmg)
    } finally {
      Math.random = originalRandom
    }
  })

  test('PVP turn resolution applies scaling bad poison damage', async () => {
    const state = makeBattleState()
    state.playerTeam[0].currentHp = 100
    state.playerTeam[0].maxHp = 100
    state.playerTeam[0].status = { id: 'bad-poison', counter: 2 }

    const resolved = await resolvePvpTurn(
      state,
      { stance: 'speed', attackType: 'normal' },
      { stance: 'speed', attackType: 'normal' },
    )

    expect(resolved.playerTeam[0].currentHp).toBeLessThanOrEqual(87)
    expect(resolved.playerTeam[0].status?.counter).toBe(3)
    expect(resolved.history[0]?.message).toContain(
      '[icon:status:bad-poison][icon:damage:13]',
    )
  })
})
