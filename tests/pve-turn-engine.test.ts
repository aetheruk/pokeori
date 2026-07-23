import { describe, expect, test } from 'bun:test'
import {
  createInitialPowersState,
  Z_MOVE_DAMAGE_MULTIPLIER,
} from '@/data/powers'
import { items } from '@/data/items'
import { getMove } from '@/data/moves'
import { calculateDamage } from '@/utilities/battle/battle-logic'
import {
  applyPveDamageExchange,
  applyPveDimensionalCharge,
  applyPveEnemyDamage,
  cleanupPveAttackState,
  resolvePveDamageExchange,
  resolvePveEnemyOnlyAttack,
  resolvePveTurnMultipliers,
} from '@/utilities/battle/engine/pve-turn'
import { resolveMoveContest } from '@/utilities/battle/move-contest'
import { resolveBeforeMoveStatus } from '@/utilities/battle/status-effects-logic'
import { processTurnEnd } from '@/utilities/battle/turn-logic'
import {
  applySecondaryStatusesFromMove,
  getSecondaryStatusSwitchPreventionMessage,
  processSecondaryStatusesForSwitch,
} from '@/utilities/battle/secondary-statuses'
import {
  applyMoveRuntimeEffects,
  checkMoveBattleCondition,
  recordSuccessfulMoveUse,
} from '@/utilities/battle/move-effects'
import {
  consumePreparedEnemyStance,
  maybePrepareEnemyAttack,
} from '@/utilities/battle/telegraph'
import {
  applyObservedPreferredStance,
  getObservedPreferredStance,
} from '@/utilities/battle/pokedex-observation'
import {
  getMostLikelyStanceForPokemonForm,
  POKEDEX_STANCE_REFERENCE_LEVEL,
} from '@/utilities/battle/ai-logic'
import {
  hasAvailableReplacement,
  needsPlayerReplacement,
  resetPlayerPowerStateForReplacement,
} from '@/utilities/battle/switching'
import {
  applyShadowScreamDamage,
  shouldShadowScream,
} from '@/utilities/battle/shadow-pokemon'
import { clearDynamaxState } from '@/utilities/battle/dynamax'
import { activateDynamax } from '@/app/(frontend)/game/battles/powers/dynamax'
import { applyTrainerBattleItemById } from '@/utilities/battle/trainer-items'
import {
  applyEnemyAiMoveEffects,
  applyEnemyAiPreDamageDefensiveEffects,
  canEnemyPokemonUseAiMove,
  chooseEnemyBattleAction,
  chooseEnemyAiMove,
  chooseEnemyReplacementIndex,
  getEnemyAiMoveIds,
  resolveEnemyAiMoveAccuracy,
  selectEnemyAiMoveLoadout,
  shouldInterruptEnemyAiMove,
} from '@/utilities/battle/enemy-ai'
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
      attack: 60,
      defense: 60,
      specialAttack: 60,
      specialDefense: 60,
      speed: 60,
    },
    currentHp: 100,
    maxHp: 100,
    updatedAt: '2026-01-01T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

function makeState(player: BattlePokemon, enemy: BattlePokemon): BattleState {
  return {
    playerTeam: [player],
    enemyTeam: [enemy],
    activePlayerIndex: 0,
    activeEnemyIndex: 0,
    turn: 1,
    history: [],
    status: 'ongoing',
    battleId: 'battle',
    playerName: 'Player',
    enemyName: 'Enemy',
    itemsUsedThisBattle: [],
  }
}

describe('PVE turn engine helpers', () => {
  test('resolves stance and z-move multipliers', () => {
    const normal = resolvePveTurnMultipliers({
      playerStance: 'power',
      enemyStance: 'tech',
    })

    expect(normal.resolution.result).toBe('win')
    expect(normal.resolution.damageMultiplier).toBe(1.35)
    expect(normal.enemyDamageMultiplier).toBe(0.75)

    const playerLoss = resolvePveTurnMultipliers({
      playerStance: 'power',
      enemyStance: 'speed',
    })

    expect(playerLoss.resolution.result).toBe('loss')
    expect(playerLoss.playerDamageMultiplier).toBe(0.75)
    expect(playerLoss.enemyDamageMultiplier).toBe(1.35)

    const zMove = resolvePveTurnMultipliers({
      playerStance: 'power',
      enemyStance: 'tech',
      isZMove: true,
    })

    expect(zMove.resolution.result).toBe('win')
    expect(zMove.playerDamageMultiplier).toBe(Z_MOVE_DAMAGE_MULTIPLIER)

    const enemyZMove = resolvePveTurnMultipliers({
      playerStance: 'power',
      enemyStance: 'tech',
      isEnemyZMove: true,
    })

    expect(enemyZMove.enemyDamageMultiplier).toBe(
      0.75 * Z_MOVE_DAMAGE_MULTIPLIER,
    )
  })

  test('shadow scream rolls at 20% and deals one eighth max HP to self', () => {
    const shadow = makePokemon({ isShadow: true, maxHp: 101, currentHp: 80 })
    const normal = makePokemon({ isShadow: false })

    expect(shouldShadowScream(shadow, () => 0.19)).toBe(true)
    expect(shouldShadowScream(shadow, () => 0.2)).toBe(false)
    expect(shouldShadowScream(normal, () => 0)).toBe(false)

    const damage = applyShadowScreamDamage(shadow)
    expect(damage).toBe(13)
    expect(shadow.currentHp).toBe(67)
  })

  test('calculates and applies PVE damage exchange', () => {
    const player = makePokemon({
      name: 'Player',
      stats: {
        hp: 100,
        attack: 120,
        defense: 60,
        specialAttack: 120,
        specialDefense: 60,
        speed: 60,
      },
    })
    const enemy = makePokemon({ name: 'Enemy', currentHp: 100, maxHp: 100 })

    const exchange = resolvePveDamageExchange({
      playerMon: player,
      enemyMon: enemy,
      playerStance: 'power',
      enemyStance: 'tech',
      playerDamageMultiplier: 2,
      enemyDamageMultiplier: 0.5,
      enemyCanMove: true,
    })

    expect(exchange.playerDamage).toBeGreaterThan(0)
    expect(exchange.enemyDamage).toBeGreaterThanOrEqual(0)

    applyPveDamageExchange({
      playerMon: player,
      enemyMon: enemy,
      playerDamage: exchange.playerDamage,
      enemyDamage: exchange.enemyDamage,
    })

    expect(enemy.currentHp).toBeLessThan(100)
    expect(player.currentHp).toBeLessThanOrEqual(100)
  })

  test('Parental Bond applies a second PVE hit and retriggers on-damaged hooks', () => {
    const player = makePokemon({
      name: 'Kangaskhan',
      ability: 'parental_bond',
      types: ['Normal'],
      currentHp: 100,
      maxHp: 100,
    })
    const enemy = makePokemon({
      name: 'Rough Target',
      ability: 'rough_skin',
      types: ['Normal'],
      currentHp: 100,
      maxHp: 100,
    })

    const result = applyPveDamageExchange({
      playerMon: player,
      enemyMon: enemy,
      playerDamage: 40,
      enemyDamage: 0,
      playerStance: 'power',
      playerAttackType: 'normal',
      enemyCanMove: false,
    })

    expect(result.playerDamage).toBe(50)
    expect(enemy.currentHp).toBe(50)
    expect(player.currentHp).toBe(76)
    expect(result.messages).toContain(
      "Kangaskhan's Parental Bond struck again! [icon:damage:10]",
    )
    expect(
      result.messages.filter((message) =>
        message === "Kangaskhan was hurt by Rough Target's Rough Skin! [icon:damage:12]",
      ),
    ).toHaveLength(2)
  })

  test('low-HP self-switch abilities trigger in PVE damage exchange', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      ability: 'wimp_out',
      currentHp: 80,
      maxHp: 100,
    })
    const playerBench = makePokemon({
      id: 'player-bench',
      name: 'Player Bench',
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      ability: 'emergency_exit',
      currentHp: 80,
      maxHp: 100,
    })
    const enemyBench = makePokemon({
      id: 'enemy-bench',
      name: 'Enemy Bench',
    })
    const state = makeState(player, enemy)
    state.playerTeam.push(playerBench)
    state.enemyTeam.push(enemyBench)

    const result = applyPveDamageExchange({
      state,
      playerMon: player,
      enemyMon: enemy,
      playerDamage: 40,
      enemyDamage: 40,
    })

    expect(state.activeEnemyIndex).toBe(1)
    expect(state.pendingPlayerSwitch).toBe(true)
    expect(state.pendingPlayerSwitchReason).toBe('move')
    expect(result.messages).toContain(
      "Enemy's Emergency Exit made it retreat!",
    )
    expect(result.messages).toContain(
      'Enemy went back, and Enemy Bench took its place.',
    )
    expect(result.messages).toContain("Player's Wimp Out made it retreat!")
    expect(result.messages).toContain(
      'Choose a Pokemon to switch in for Player.',
    )
  })

  test('uses explicit enemy attack type during PVE damage exchange', () => {
    const player = makePokemon({
      name: 'Ghost Player',
      types: ['Ghost'],
      currentHp: 100,
      maxHp: 100,
    })
    const enemy = makePokemon({
      name: 'Normal Enemy',
      types: ['Normal'],
      stats: {
        hp: 100,
        attack: 120,
        defense: 60,
        specialAttack: 120,
        specialDefense: 60,
        speed: 60,
      },
    })

    const normalExchange = resolvePveDamageExchange({
      playerMon: player,
      enemyMon: enemy,
      playerStance: 'tech',
      enemyStance: 'power',
      playerDamageMultiplier: 1,
      enemyDamageMultiplier: 1,
      enemyCanMove: true,
    })

    const darkExchange = resolvePveDamageExchange({
      playerMon: player,
      enemyMon: enemy,
      playerStance: 'tech',
      enemyStance: 'power',
      playerDamageMultiplier: 1,
      enemyDamageMultiplier: 1,
      enemyAttackType: 'dark',
      enemyCanMove: true,
    })

    expect(normalExchange.enemyDamage).toBe(0)
    expect(normalExchange.enemyDamageResult.isImmune).toBe(true)
    expect(darkExchange.enemyDamage).toBeGreaterThan(0)
    expect(darkExchange.enemyDamageResult.usedType).toBe('dark')
    expect(darkExchange.enemyDamageResult.isSuperEffective).toBe(true)
  })

  test('normalizes player damage when enemy cannot move', () => {
    const player = makePokemon({
      stats: {
        hp: 100,
        attack: 120,
        defense: 60,
        specialAttack: 120,
        specialDefense: 60,
        speed: 60,
      },
    })
    const enemy = makePokemon()

    const exchange = resolvePveDamageExchange({
      playerMon: player,
      enemyMon: enemy,
      playerStance: 'power',
      enemyStance: 'tech',
      playerDamageMultiplier: 2,
      enemyDamageMultiplier: 0.5,
      enemyCanMove: false,
    })

    expect(exchange.playerDamage).toBeGreaterThan(0)
    expect(exchange.enemyDamage).toBe(0)
  })

  test('calculates and applies enemy-only damage', () => {
    const player = makePokemon({ name: 'Player', currentHp: 100, maxHp: 100 })
    const enemy = makePokemon({
      name: 'Enemy',
      stats: {
        hp: 100,
        attack: 120,
        defense: 60,
        specialAttack: 120,
        specialDefense: 60,
        speed: 60,
      },
    })

    const attack = resolvePveEnemyOnlyAttack({
      playerMon: player,
      enemyMon: enemy,
      enemyStance: 'power',
      enemyCanMove: true,
    })

    expect(attack.enemyDamage).toBeGreaterThan(0)
    applyPveEnemyDamage({ playerMon: player, enemyDamage: attack.enemyDamage })
    expect(player.currentHp).toBeLessThan(100)
  })

  test('enemy Quick Attack uses the same effective Speed contest as the player', () => {
    const quickAttack = getMove('quick-attack')!
    const player = makePokemon({
      name: 'Player Mon',
      stats: {
        hp: 100,
        attack: 60,
        defense: 60,
        specialAttack: 60,
        specialDefense: 60,
        speed: 50,
      },
    })
    const fasterEnemy = makePokemon({
      name: 'Fast Enemy',
      stats: {
        hp: 100,
        attack: 60,
        defense: 60,
        specialAttack: 60,
        specialDefense: 60,
        speed: 51,
      },
    })
    const tiedEnemy = makePokemon({
      name: 'Tied Enemy',
      stats: {
        hp: 100,
        attack: 60,
        defense: 60,
        specialAttack: 60,
        specialDefense: 60,
        speed: 50,
      },
    })

    const success = resolveMoveContest({
      move: quickAttack,
      attacker: fasterEnemy,
      defender: player,
    })
    const failure = resolveMoveContest({
      move: quickAttack,
      attacker: tiedEnemy,
      defender: player,
    })

    expect(success.success).toBe(true)
    expect(success.preventCounter).toBe(true)
    expect(success.result).toBe('win')
    expect(failure.success).toBe(false)
    expect(failure.failMove).toBe(true)
    expect(failure.damageMultiplier).toBe(0)
    expect(failure.message).toContain('was not faster')
  })

  test('enemy AI only chooses Quick Attack when it wins the Speed contest', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player Mon',
      stats: {
        hp: 100,
        attack: 60,
        defense: 60,
        specialAttack: 60,
        specialDefense: 60,
        speed: 50,
      },
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy Mon',
      speciesId: 19,
      formId: '19',
      level: 50,
      types: ['normal'],
      aiMoveLoadout: ['quick-attack'],
      stats: {
        hp: 100,
        attack: 60,
        defense: 60,
        specialAttack: 60,
        specialDefense: 60,
        speed: 49,
      },
    })
    const state = makeState(player, enemy)
    state.enemyMoveUsesRemaining = 1
    state.ai = { version: 1, profile: 'boss' }

    const slowerChoice = chooseEnemyAiMove({
      state,
      enemyMon: enemy,
      playerMon: player,
      random: () => 0.5,
    })

    expect(slowerChoice).toBeUndefined()
    expect(state.enemyMoveUsesRemaining).toBe(1)

    enemy.stats.speed = 51
    const fasterChoice = chooseEnemyAiMove({
      state,
      enemyMon: enemy,
      playerMon: player,
      random: () => 0.5,
    })

    expect(fasterChoice?.move.id).toBe('quick-attack')
    expect(fasterChoice?.basePower).toBeGreaterThan(0)
    expect(state.enemyMoveUsesRemaining).toBe(0)
  })

  test('enemy AI applies authored stance disable effects', () => {
    const player = makePokemon({ name: 'Player Mon' })
    const enemy = makePokemon({ name: 'Enemy Mon' })
    const state = makeState(player, enemy)
    const disable = getMove('disable')!

    const messages = applyEnemyAiMoveEffects({
      move: disable,
      self: enemy,
      opponent: player,
      state,
      random: () => 0.5,
    })

    expect(messages).toContain(
      "Player Mon's Speed Stance was disabled for 2 turns!",
    )
    expect(player.disabledStance).toMatchObject({
      stance: 'speed',
      turnsRemaining: 2,
    })
  })

  test('enemy AI move effects can resolve after the target faints', () => {
    const player = makePokemon({ name: 'Player Mon', currentHp: 0 })
    const enemy = makePokemon({ name: 'Enemy Mon', currentHp: 40, maxHp: 100 })
    const state = makeState(player, enemy)
    const absorb = getMove('absorb')!

    const messages = applyEnemyAiMoveEffects({
      move: absorb,
      self: enemy,
      opponent: player,
      state,
      damageDealt: 20,
      random: () => 0.5,
    })

    expect(messages).toContain('Enemy Mon absorbed energy! [icon:heal:10]')
    expect(enemy.currentHp).toBe(50)
  })

  test('enemy effect-only moves can satisfy successful move history conditions', () => {
    const player = makePokemon({ name: 'Player Mon' })
    const enemy = makePokemon({ name: 'Enemy Mon' })
    const state = makeState(player, enemy)
    const growl = getMove('growl')!
    const lastResort = getMove('last-resort')!

    recordSuccessfulMoveUse({
      state,
      side: 'enemy',
      pokemon: enemy,
      move: growl,
      attackType: 'normal',
    })

    expect(
      checkMoveBattleCondition({
        move: lastResort,
        state,
        side: 'enemy',
        attacker: enemy,
        defender: player,
      }),
    ).toBeUndefined()
  })

  test('enemy self-pivot move switches to a healthy replacement', () => {
    const player = makePokemon({ id: 'player', name: 'Player Mon' })
    const enemy = makePokemon({
      id: 'enemy-1',
      name: 'Lead Enemy',
      statStages: {
        attack: 2,
        defense: 0,
        specialAttack: 0,
        specialDefense: 0,
        speed: 0,
        crit: 0,
        accuracy: 0,
        evasion: 0,
      },
    })
    const replacement = makePokemon({ id: 'enemy-2', name: 'Bench Enemy' })
    const state = makeState(player, enemy)
    state.enemyTeam = [enemy, replacement]
    const uTurn = getMove('u-turn')!

    const result = applyMoveRuntimeEffects({
      move: uTurn,
      state,
      side: 'enemy',
      attacker: enemy,
      defender: player,
    })

    expect(result.failed).toBeUndefined()
    expect(result.messages).toContain(
      'Lead Enemy went back, and Bench Enemy took its place.',
    )
    expect(state.activeEnemyIndex).toBe(1)
    expect(replacement.activeTurnStarted).toBe(state.turn + 1)
  })

  test('Hard Stone no longer blocks PVE incoming damage', () => {
    const player = makePokemon({
      name: 'Player',
      currentHp: 100,
      maxHp: 100,
      heldItem: { id: 'hard-stone', name: 'Hard Stone' },
    })

    const result = applyPveEnemyDamage({
      playerMon: player,
      enemyDamage: 20,
      random: () => 0.5,
    })

    expect(result.enemyDamage).toBe(20)
    expect(result.messages.join('\n')).not.toContain('blocked')
    expect(player.currentHp).toBe(80)
    expect(player.heldItem).toEqual({ id: 'hard-stone', name: 'Hard Stone' })
    expect(player.consumedHeldItems).toBeUndefined()
  })

  test('cleans up single-turn attack state without clearing active Tera', () => {
    const player = makePokemon({
      status: { id: 'victory', counter: 0 },
      teraTypeOverride: 'fire',
      teraTurnsRemaining: 2,
    })
    const enemy = makePokemon({ status: { id: 'victory', counter: 0 } })
    let zMoveCleared = false
    let revealCleared = false

    cleanupPveAttackState({
      playerMon: player,
      enemyMon: enemy,
      isZMove: true,
      clearZMove: () => {
        zMoveCleared = true
      },
      clearRevealedEnemyStance: () => {
        revealCleared = true
      },
    })

    expect(player.status).toBeUndefined()
    expect(enemy.status).toBeUndefined()
    expect(player.teraTypeOverride).toBe('fire')
    expect(player.teraTurnsRemaining).toBe(2)
    expect(zMoveCleared).toBe(true)
    expect(revealCleared).toBe(true)
  })

  test('applies dimensional charge for PVE result', () => {
    const powers = createInitialPowersState()
    applyPveDimensionalCharge(powers, 'win')
    expect(powers.dimensionalShift.charges.wins).toBe(1)
  })

  test('trainer item resolver can apply scoreable authored battle item effects', () => {
    const battleItems = items.filter(
      (item) =>
        item.battleEffect &&
        (item.battleEffect.type === 'heal' ||
          item.battleEffect.type === 'buff'),
    )
    expect(battleItems.length).toBeGreaterThan(0)

    for (const item of battleItems) {
      const enemy = makePokemon({
        id: `enemy-${item.id}`,
        name: 'Enemy',
        currentHp: item.battleEffect?.type === 'heal' ? 1 : 100,
        maxHp: 100,
        status: undefined,
      })

      const clearStatus = item.battleEffect?.clearStatus
      if (clearStatus) {
        enemy.status = {
          id:
            clearStatus === 'all'
              ? 'burn'
              : Array.isArray(clearStatus)
                ? clearStatus[0]
                : clearStatus,
          counter: 0,
        }
      }

      const state = makeState(makePokemon({ id: 'player' }), enemy)
      state.trainerItems = [
        {
          itemId: item.id,
          quantity: 1,
        },
      ]

      const result = applyTrainerBattleItemById(state, item.id)

      expect(result.used, item.id).toBe(true)
      expect(result.skipsEnemyAction, item.id).toBe(
        item.battleEffect?.skipsTurn !== false,
      )
      expect(state.trainerItems[0].quantity, item.id).toBe(0)
    }
  })

  test('trainer healing item application requires missing HP', () => {
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      currentHp: 100,
      maxHp: 100,
    })
    const state = makeState(makePokemon({ id: 'player' }), enemy)
    state.trainerItems = [{ itemId: 'battle-potion', quantity: 1 }]

    expect(applyTrainerBattleItemById(state, 'battle-potion').used).toBe(false)
    expect(state.trainerItems[0].quantity).toBe(1)

    enemy.currentHp = 30
    expect(applyTrainerBattleItemById(state, 'battle-potion').used).toBe(true)
    expect(state.trainerItems[0].quantity).toBe(0)
  })

  test('enemy AI move loadouts are capped and can include manual exception moves', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      types: ['fire'],
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      speciesId: 4,
      formId: '4',
      level: 50,
      types: ['fire'],
      aiMoves: ['water-gun'],
    })

    const loadout = selectEnemyAiMoveLoadout({
      enemyMon: enemy,
      playerTeam: [player],
      profile: 'boss',
      maxMoves: 4,
      random: () => 0.5,
    })

    expect(loadout.length).toBeLessThanOrEqual(4)
    expect(loadout).toContain('water-gun')
  })

  test('low-tier generated enemy move loadouts exclude broad status moves', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      types: ['fire'],
    })
    const rattata = makePokemon({
      id: 'rattata',
      name: 'Rattata',
      speciesId: 19,
      formId: '19',
      level: 50,
      types: ['normal'],
    })

    const generatedLoadout = selectEnemyAiMoveLoadout({
      enemyMon: rattata,
      playerTeam: [player],
      profile: 'wild',
      maxMoves: 4,
    })
    const authoredLoadout = selectEnemyAiMoveLoadout({
      enemyMon: { ...rattata, aiMoves: ['toxic'] },
      playerTeam: [player],
      maxMoves: 4,
    })

    expect(generatedLoadout).not.toContain('toxic')
    expect(authoredLoadout).toContain('toxic')
  })

  test('enemy AI generated move pools respect Metronome form authoring', () => {
    const beedrill = makePokemon({
      speciesId: 15,
      formId: '15',
      level: 50,
      types: ['bug', 'poison'],
    })
    const clefairy = makePokemon({
      speciesId: 35,
      formId: '35',
      level: 50,
      types: ['fairy'],
    })

    expect(canEnemyPokemonUseAiMove(beedrill, getMove('metronome')!)).toBe(
      false,
    )
    expect(canEnemyPokemonUseAiMove(clefairy, getMove('metronome')!)).toBe(true)
  })

  test('advanced enemy AI can generate Hidden Power outside authored form list', () => {
    const charizard = makePokemon({
      speciesId: 6,
      formId: '6',
      level: 50,
      types: ['fire', 'flying'],
    })
    const hiddenPower = getMove('hidden-power')!

    expect(
      canEnemyPokemonUseAiMove(charizard, hiddenPower, { profile: 'trainer' }),
    ).toBe(false)
    expect(
      canEnemyPokemonUseAiMove(charizard, hiddenPower, { profile: 'advanced' }),
    ).toBe(true)
    expect(
      canEnemyPokemonUseAiMove(charizard, hiddenPower, { profile: 'boss' }),
    ).toBe(true)
    expect(getEnemyAiMoveIds(charizard, { profile: 'advanced' })).toContain(
      'hidden-power',
    )
  })

  test('enemy AI moves are scored without authored aiUse rules and spend the battle budget', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      types: ['fire'],
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      speciesId: 4,
      formId: '4',
      level: 50,
      types: ['fire'],
      aiMoves: ['water-gun'],
      aiMoveLoadout: ['water-gun'],
      moveUsesRemaining: 1,
    })
    const state = makeState(player, enemy)
    const benchEnemy = makePokemon({
      id: 'bench-enemy',
      name: 'Bench Enemy',
      moveUsesRemaining: 3,
    })
    state.enemyTeam = [enemy, benchEnemy]
    state.enemyMoveUsesRemaining = 99
    state.ai = { version: 1, profile: 'boss' }

    const selected = chooseEnemyAiMove({
      state,
      enemyMon: enemy,
      playerMon: player,
      playerStance: 'power',
      random: () => 0.5,
    })

    expect(selected?.move.id).toBe('water-gun')
    expect(state.enemyMoveUsesRemaining).toBe(0)
    expect(enemy.moveUsesRemaining).toBe(0)
    expect(benchEnemy.moveUsesRemaining).toBe(3)
  })

  test('enemy AI prefers a stance over marginal early-turn moves', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      types: ['normal'],
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      speciesId: 4,
      formId: '4',
      level: 50,
      types: ['fire'],
      aiMoves: ['growl'],
      aiMoveLoadout: ['growl'],
      moveUsesRemaining: 1,
      activeTurnStarted: 1,
    })
    const state = makeState(player, enemy)
    state.enemyMoveUsesRemaining = 99
    state.ai = { version: 1, profile: 'trainer' }

    const action = chooseEnemyBattleAction({
      state,
      enemyMon: enemy,
      playerMon: player,
      playerStance: 'power',
      random: () => 0.5,
    })

    expect(action.kind).toBe('stance')
    expect(state.enemyMoveUsesRemaining).toBe(99)
    expect(enemy.moveUsesRemaining).toBe(1)
  })

  test('enemy AI scores moves without move history when the enemy has no persisted id', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      types: ['grass'],
    })
    const enemy = makePokemon({
      id: undefined,
      name: 'Enemy',
      user: 'enemy',
      originalTrainer: 'enemy',
      speciesId: 7,
      formId: '7',
      types: ['water'],
      aiMoveLoadout: ['water-gun'],
      moveUsesRemaining: 1,
    } as Partial<BattlePokemon>)
    const state = makeState(player, enemy)
    state.enemyMoveUsesRemaining = 1
    state.ai = { version: 1, profile: 'trainer' }

    const action = chooseEnemyBattleAction({
      state,
      enemyMon: enemy,
      playerMon: player,
      playerStance: 'power',
      canUseItems: false,
      canSwitch: false,
      random: () => 0.4,
    })

    expect(action.kind).toBeTruthy()
  })

  test('enemy AI called moves can copy the player last successful move', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      types: ['normal'],
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      speciesId: 122,
      formId: '122',
      level: 50,
      types: ['psychic'],
      aiMoves: ['mimic'],
      aiMoveLoadout: ['mimic'],
      moveUsesRemaining: 1,
    })
    const state = makeState(player, enemy)
    state.enemyMoveUsesRemaining = 99
    state.ai = { version: 1, profile: 'boss' }
    state.moveHistory = {
      lastSuccessful: {
        player: {
          moveId: 'quick-attack',
          moveName: 'Quick Attack',
          side: 'player',
          pokemonId: player.id,
          turn: 1,
          attackType: 'normal',
        },
      },
    }

    const selected = chooseEnemyAiMove({
      state,
      enemyMon: enemy,
      playerMon: player,
      playerStance: 'power',
      random: () => 0.5,
    })

    expect(selected?.move.id).toBe('quick-attack')
    expect(selected?.basePower).toBeGreaterThan(0)
    expect(state.enemyMoveUsesRemaining).toBe(0)
    expect(enemy.moveUsesRemaining).toBe(0)
  })

  test('enemy AI does not choose Mimic before the player has used an authored move', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      types: ['normal'],
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      speciesId: 122,
      formId: '122',
      level: 50,
      types: ['psychic'],
      aiMoves: ['mimic'],
      aiMoveLoadout: ['mimic'],
      moveUsesRemaining: 1,
    })
    const state = makeState(player, enemy)
    state.enemyMoveUsesRemaining = 99
    state.ai = { version: 1, profile: 'boss' }

    const selected = chooseEnemyAiMove({
      state,
      enemyMon: enemy,
      playerMon: player,
      playerStance: 'power',
      random: () => 0.5,
    })

    expect(selected).toBeUndefined()
    expect(state.enemyMoveUsesRemaining).toBe(99)
    expect(enemy.moveUsesRemaining).toBe(1)
  })

  test('enemy AI Protect applies before incoming player damage', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      types: ['fire'],
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      types: ['normal'],
      currentHp: 100,
      maxHp: 100,
    })
    const state = makeState(player, enemy)
    const protect = getMove('protect')!

    const effectMessages = applyEnemyAiPreDamageDefensiveEffects({
      move: protect,
      self: enemy,
      opponent: player,
      state,
      random: () => 0,
    })
    const appliedDamage = applyPveDamageExchange({
      state,
      playerMon: player,
      enemyMon: enemy,
      playerDamage: 40,
      enemyDamage: 0,
      playerStance: 'power',
      playerAttackType: 'fire',
      enemyCanMove: false,
    })

    expect(effectMessages).toEqual(['Protect took hold.'])
    expect(appliedDamage.playerDamage).toBe(0)
    expect(appliedDamage.messages).toContain('Protect reduced damage by 100%.')
    expect(enemy.currentHp).toBe(100)
  })

  test('enemy AI does not spam Protect on healthy early turns', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      types: ['normal'],
      stats: {
        hp: 100,
        attack: 20,
        defense: 60,
        specialAttack: 20,
        specialDefense: 60,
        speed: 20,
      },
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      types: ['normal'],
      aiMoves: ['protect'],
      aiMoveLoadout: ['protect'],
      currentHp: 100,
      maxHp: 100,
      moveUsesRemaining: 1,
      activeTurnStarted: 1,
    })
    const state = makeState(player, enemy)
    state.enemyMoveUsesRemaining = 99
    state.ai = { version: 1, profile: 'trainer' }

    const action = chooseEnemyBattleAction({
      state,
      enemyMon: enemy,
      playerMon: player,
      playerStance: 'power',
      random: () => 0.5,
    })

    expect(action.kind).toBe('stance')
    expect(state.enemyMoveUsesRemaining).toBe(99)
  })

  test('enemy AI can use Protect against lethal predicted damage', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      types: ['fighting'],
      stats: {
        hp: 100,
        attack: 400,
        defense: 60,
        specialAttack: 400,
        specialDefense: 60,
        speed: 100,
      },
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      types: ['normal'],
      aiMoves: ['protect'],
      aiMoveLoadout: ['protect'],
      currentHp: 20,
      maxHp: 100,
      moveUsesRemaining: 1,
    })
    const state = makeState(player, enemy)
    state.enemyMoveUsesRemaining = 99
    state.ai = { version: 1, profile: 'boss' }

    const selected = chooseEnemyAiMove({
      state,
      enemyMon: enemy,
      playerMon: player,
      playerStance: 'power',
      random: () => 0.5,
    })

    expect(selected?.move.id).toBe('protect')
  })

  test('enemy AI does not reapply active secondary statuses', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      types: ['normal'],
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      types: ['grass'],
      aiMoves: ['ingrain'],
      aiMoveLoadout: ['ingrain'],
      status: { id: 'regen', counter: 0 },
      secondaryStatuses: [
        {
          id: 'ingrain',
          name: 'Ingrain',
          sourceSide: 'enemy',
          target: 'pokemon',
          triggers: ['turn-end'],
          remainingTurns: 4,
          effects: [{ type: 'switch-prevention' }],
        },
      ],
      moveUsesRemaining: 1,
    })
    const state = makeState(player, enemy)
    state.enemyMoveUsesRemaining = 99
    state.ai = { version: 1, profile: 'boss' }

    const selected = chooseEnemyAiMove({
      state,
      enemyMon: enemy,
      playerMon: player,
      playerStance: 'power',
      random: () => 0.5,
    })

    expect(selected).toBeUndefined()
    expect(state.enemyMoveUsesRemaining).toBe(99)
  })

  test('enemy AI does not overvalue Rage as a free setup move', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Charmander',
      types: ['fire'],
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Rattata',
      speciesId: 19,
      formId: '19',
      level: 50,
      types: ['normal'],
      aiMoves: ['rage', 'water-gun'],
      aiMoveLoadout: ['rage', 'water-gun'],
      moveUsesRemaining: 2,
    })
    const state = makeState(player, enemy)
    state.enemyMoveUsesRemaining = 2
    state.ai = { version: 1, profile: 'boss' }

    const selected = chooseEnemyAiMove({
      state,
      enemyMon: enemy,
      playerMon: player,
      random: () => 0.5,
    })

    expect(selected?.move.id).toBe('water-gun')
  })

  test('enemy AI authored move accuracy can miss and respects accuracy bypass', () => {
    const player = makePokemon({ name: 'Player' })
    const enemy = makePokemon({ name: 'Enemy' })
    const state = makeState(player, enemy)
    const move = { ...getMove('tackle')!, accuracy: 50 }
    const enemyAiMove = {
      move,
      stance: 'power' as const,
      attackType: 'normal',
      basePower: 50,
    }

    expect(
      resolveEnemyAiMoveAccuracy({
        state,
        enemyMon: enemy,
        enemyAiMove,
        random: () => 0.51,
      }),
    ).toEqual({ accuracy: 50, missed: true })
    expect(
      resolveEnemyAiMoveAccuracy({
        state,
        enemyMon: enemy,
        enemyAiMove,
        random: () => 0.5,
      }),
    ).toEqual({ accuracy: 50, missed: false })

    enemy.secondaryStatuses = [
      {
        id: 'glaive-rush-vulnerability',
        name: 'Glaive Rush Vulnerability',
        triggers: [],
        sourceSide: 'player',
        target: 'pokemon',
        effects: [{ type: 'accuracy-bypass' }],
      },
    ]
    expect(
      resolveEnemyAiMoveAccuracy({
        state,
        enemyMon: enemy,
        enemyAiMove,
        random: () => 0.99,
      }),
    ).toEqual({ accuracy: 100, missed: false })

    expect(
      resolveEnemyAiMoveAccuracy({
        state,
        enemyMon: enemy,
        enemyAiMove: {
          ...enemyAiMove,
          move: { ...move, accuracy: 1, alwaysHits: true },
        },
        random: () => 0.99,
      }),
    ).toEqual({ accuracy: 100, missed: false })

    player.ability = 'no_guard'
    enemy.secondaryStatuses = []
    expect(
      resolveEnemyAiMoveAccuracy({
        state,
        enemyMon: enemy,
        defender: player,
        enemyAiMove: {
          ...enemyAiMove,
          move: { ...move, accuracy: 1 },
        },
        random: () => 0.99,
      }),
    ).toEqual({ accuracy: 100, missed: false })
  })

  test('enemy AI skips damaging moves that would have no effect', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Ghost Player',
      types: ['ghost'],
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      speciesId: 4,
      formId: '4',
      level: 50,
      types: ['fire'],
      aiMoveLoadout: ['cut'],
    })
    const state = makeState(player, enemy)
    state.enemyMoveUsesRemaining = 1
    state.ai = { version: 1, profile: 'boss' }

    const selected = chooseEnemyAiMove({
      state,
      enemyMon: enemy,
      playerMon: player,
      playerStance: 'power',
      random: () => 0.5,
    })

    expect(selected).toBeUndefined()
    expect(state.enemyMoveUsesRemaining).toBe(1)
  })

  test('enemy AI does not choose Dream Eater unless the target is asleep', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      types: ['normal'],
    })
    const clefairy = makePokemon({
      id: 'enemy',
      name: 'Clefairy',
      speciesId: 35,
      formId: '35',
      level: 50,
      types: ['fairy'],
      aiMoveLoadout: ['dream-eater'],
    })
    const state = makeState(player, clefairy)
    state.enemyMoveUsesRemaining = 1
    state.ai = { version: 1, profile: 'boss' }

    const awakeSelected = chooseEnemyAiMove({
      state,
      enemyMon: clefairy,
      playerMon: player,
      random: () => 0.5,
    })

    expect(awakeSelected).toBeUndefined()
    expect(state.enemyMoveUsesRemaining).toBe(1)

    player.status = { id: 'sleep', counter: 1 }
    const expiringSleepSelected = chooseEnemyAiMove({
      state,
      enemyMon: clefairy,
      playerMon: player,
      random: () => 0.5,
    })

    expect(expiringSleepSelected?.move.id).toBe('dream-eater')
    expect(state.enemyMoveUsesRemaining).toBe(0)

    player.status = { id: 'sleep', counter: 2 }
    state.enemyMoveUsesRemaining = 1
    clefairy.moveUsesRemaining = 1
    const asleepSelected = chooseEnemyAiMove({
      state,
      enemyMon: clefairy,
      playerMon: player,
      random: () => 0.5,
    })

    expect(asleepSelected?.move.id).toBe('dream-eater')
    expect(state.enemyMoveUsesRemaining).toBe(0)
  })

  test('enemy AI does not refresh sleep on the turn it would expire', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      types: ['normal'],
      status: { id: 'sleep', counter: 1 },
    })
    const meloetta = makePokemon({
      id: 'enemy',
      name: 'Meloetta',
      speciesId: 648,
      formId: '648',
      level: 50,
      types: ['normal', 'psychic'],
      aiMoveLoadout: ['relic-song'],
      moveUsesRemaining: 1,
    })
    const state = makeState(player, meloetta)
    state.enemyMoveUsesRemaining = 1
    state.ai = { version: 1, profile: 'boss' }

    const selected = chooseEnemyAiMove({
      state,
      enemyMon: meloetta,
      playerMon: player,
      random: () => 0.5,
    })

    expect(selected).toBeUndefined()
    expect(state.enemyMoveUsesRemaining).toBe(1)
    expect(meloetta.moveUsesRemaining).toBe(1)
  })

  test('unified enemy AI rolls normal stances without countering the submitted player stance', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      types: ['normal'],
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      types: ['normal'],
      aiMoveLoadout: [],
    })
    const state = makeState(player, enemy)
    state.enemyMoveUsesRemaining = 0
    state.ai = { version: 1, profile: 'trainer' }

    const action = chooseEnemyBattleAction({
      state,
      enemyMon: enemy,
      playerMon: player,
      playerStance: 'power',
      canUseItems: false,
      canSwitch: false,
      consumeMoveUse: false,
      random: () => 0,
    })

    expect(action).toMatchObject({ kind: 'stance', stance: 'power' })
  })

  test('unified enemy AI can choose and apply a healing trainer item', () => {
    const player = makePokemon({ id: 'player', name: 'Player' })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      currentHp: 1,
      maxHp: 100,
      aiMoveLoadout: [],
    })
    const state = makeState(player, enemy)
    state.ai = { version: 1, profile: 'boss' }
    state.trainerItems = [{ itemId: 'battle-max-potion', quantity: 1 }]

    const action = chooseEnemyBattleAction({
      state,
      enemyMon: enemy,
      playerMon: player,
      canSwitch: false,
      consumeMoveUse: false,
      random: () => 0.5,
    })

    expect(action.kind).toBe('item')
    if (action.kind !== 'item') return

    const result = applyTrainerBattleItemById(state, action.itemId)
    expect(result.used).toBe(true)
    expect(enemy.currentHp).toBe(100)
    expect(state.trainerItems[0].quantity).toBe(0)
    expect(state.trainerItemLastUsedTurn).toBe(state.turn)
  })

  test('unified enemy AI can switch to a better trainer matchup', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Charmander',
      speciesId: 4,
      formId: '4',
      types: ['fire'],
      stats: {
        hp: 100,
        attack: 80,
        defense: 60,
        specialAttack: 80,
        specialDefense: 60,
        speed: 70,
      },
    })
    const grassEnemy = makePokemon({
      id: 'enemy-grass',
      name: 'Bulbasaur',
      speciesId: 1,
      formId: '1',
      types: ['grass'],
      currentHp: 30,
      maxHp: 100,
      aiMoveLoadout: ['vine-whip'],
    })
    const waterEnemy = makePokemon({
      id: 'enemy-water',
      name: 'Squirtle',
      speciesId: 7,
      formId: '7',
      types: ['water'],
      currentHp: 100,
      maxHp: 100,
      aiMoveLoadout: ['water-gun'],
    })
    const state = makeState(player, grassEnemy)
    state.enemyTeam = [grassEnemy, waterEnemy]
    state.ai = { version: 1, profile: 'boss' }
    state.enemyMoveUsesRemaining = 0

    const action = chooseEnemyBattleAction({
      state,
      enemyMon: grassEnemy,
      playerMon: player,
      canUseItems: false,
      consumeMoveUse: false,
      random: () => 0.5,
    })

    expect(action.kind).toBe('switch')
    if (action.kind === 'switch') expect(action.newIndex).toBe(1)
  })

  test('unified enemy AI does not voluntarily switch while trapped', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Charmander',
      speciesId: 4,
      formId: '4',
      types: ['fire'],
      stats: {
        hp: 100,
        attack: 80,
        defense: 60,
        specialAttack: 80,
        specialDefense: 60,
        speed: 70,
      },
    })
    const grassEnemy = makePokemon({
      id: 'enemy-grass',
      name: 'Bulbasaur',
      speciesId: 1,
      formId: '1',
      types: ['grass'],
      currentHp: 30,
      maxHp: 100,
      aiMoveLoadout: ['vine-whip'],
    })
    const waterEnemy = makePokemon({
      id: 'enemy-water',
      name: 'Squirtle',
      speciesId: 7,
      formId: '7',
      types: ['water'],
      currentHp: 100,
      maxHp: 100,
      aiMoveLoadout: ['water-gun'],
    })
    const state = makeState(player, grassEnemy)
    state.enemyTeam = [grassEnemy, waterEnemy]
    state.ai = { version: 1, profile: 'boss' }
    state.enemyMoveUsesRemaining = 0

    applySecondaryStatusesFromMove({
      move: getMove('block')!,
      state,
      attacker: player,
      defender: grassEnemy,
      sourceSide: 'player',
      random: () => 0,
    })

    expect(
      getSecondaryStatusSwitchPreventionMessage({
        state,
        pokemon: grassEnemy,
        side: 'enemy',
      }),
    ).toBe('Bulbasaur cannot switch out because of Blocked.')

    const action = chooseEnemyBattleAction({
      state,
      enemyMon: grassEnemy,
      playerMon: player,
      canUseItems: false,
      consumeMoveUse: false,
      random: () => 0.5,
    })

    expect(action.kind).not.toBe('switch')
  })

  test('enemy AI captivate only applies against opposite gender targets', () => {
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      gender: 'female',
    })
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      gender: 'male',
    })
    const state = makeState(player, enemy)
    const captivate = getMove('captivate')!

    const appliedMessages = applyEnemyAiMoveEffects({
      move: captivate,
      self: enemy,
      opponent: player,
      state,
      random: () => 0,
    })

    expect(appliedMessages).toEqual(["Player's Sp. Atk fell!"])
    expect(player.statStages?.specialAttack).toBe(-2)

    player.statStages = undefined
    player.gender = 'female'
    const failedMessages = applyEnemyAiMoveEffects({
      move: captivate,
      self: enemy,
      opponent: player,
      state,
      random: () => 0,
    })

    expect(failedMessages).toEqual([
      'Captivate failed because the genders are not compatible.',
    ])
    expect(player.statStages).toBeUndefined()

    enemy.aiMoveLoadout = ['captivate']
    state.enemyMoveUsesRemaining = 1
    expect(
      chooseEnemyAiMove({
        state,
        enemyMon: enemy,
        playerMon: player,
        random: () => 0,
      }),
    ).toBeUndefined()
  })

  test('enemy KO replacement uses unified matchup scoring', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Charmander',
      speciesId: 4,
      formId: '4',
      types: ['fire'],
      stats: {
        hp: 100,
        attack: 80,
        defense: 60,
        specialAttack: 80,
        specialDefense: 60,
        speed: 70,
      },
    })
    const faintedEnemy = makePokemon({
      id: 'enemy-fainted',
      name: 'Pidgey',
      speciesId: 16,
      formId: '16',
      types: ['normal', 'flying'],
      currentHp: 0,
      maxHp: 100,
    })
    const grassEnemy = makePokemon({
      id: 'enemy-grass',
      name: 'Bulbasaur',
      speciesId: 1,
      formId: '1',
      types: ['grass'],
      currentHp: 30,
      maxHp: 100,
      aiMoveLoadout: ['vine-whip'],
    })
    const waterEnemy = makePokemon({
      id: 'enemy-water',
      name: 'Squirtle',
      speciesId: 7,
      formId: '7',
      types: ['water'],
      currentHp: 100,
      maxHp: 100,
      aiMoveLoadout: ['water-gun'],
    })
    const state = makeState(player, faintedEnemy)
    state.enemyTeam = [faintedEnemy, grassEnemy, waterEnemy]
    state.ai = { version: 1, profile: 'boss' }

    expect(
      chooseEnemyReplacementIndex({
        state,
        playerMon: player,
        currentEnemyIndex: 0,
        random: () => 0.5,
      }),
    ).toBe(2)
  })

  test('moves with interrupt effects only interrupt successful same-turn enemy AI moves', () => {
    const flash = {
      id: 'fake-out',
      name: 'Fake Out',
      description: '',
      stance: 'tech',
      damage: 0,
      target: 'enemy',
      accuracy: 100,
      interruptEnemyMove: 100,
    } as const
    const cut = {
      id: 'cut',
      name: 'Cut',
      description: '',
      stance: 'speed',
      damage: 1,
      target: 'enemy',
      accuracy: 100,
    } as const
    const enemyAiMove = {
      move: cut,
      stance: 'speed' as const,
      attackType: 'normal',
      basePower: 60,
    }

    expect(
      shouldInterruptEnemyAiMove({
        move: flash,
        enemyAiMove,
        random: () => 0,
      }),
    ).toBe(true)
    expect(
      shouldInterruptEnemyAiMove({
        move: flash,
        enemyAiMove,
        moveMissed: true,
        random: () => 0,
      }),
    ).toBe(false)
    expect(
      shouldInterruptEnemyAiMove({
        move: flash,
        enemyAiMove,
        moveFailed: true,
        random: () => 0,
      }),
    ).toBe(false)
    expect(shouldInterruptEnemyAiMove({ move: flash })).toBe(false)
    expect(
      shouldInterruptEnemyAiMove({ move: cut, enemyAiMove, random: () => 0 }),
    ).toBe(false)
    expect(
      shouldInterruptEnemyAiMove({
        move: flash,
        enemyAiMove,
        target: makePokemon({ ability: 'inner_focus' }),
        random: () => 0,
      }),
    ).toBe(false)
  })

  test('radiant pokemon can boost attack damage', () => {
    const originalRandom = Math.random
    const rolls = [0.99, 0.05, 0.99]
    Math.random = () => rolls.shift() ?? 0.99

    try {
      const attacker = makePokemon({
        name: 'Radiant Bulbasaur',
        isRadiant: true,
        stats: {
          hp: 100,
          attack: 120,
          defense: 60,
          specialAttack: 120,
          specialDefense: 60,
          speed: 60,
        },
      })
      const defender = makePokemon({ name: 'Defender' })

      const result = calculateDamage(attacker, defender, 'power', 1)

      expect(result.isRadiantBoost).toBe(true)
      expect(result.damage).toBeGreaterThan(0)
    } finally {
      Math.random = originalRandom
    }
  })

  test('PVE damage exchange treats exposed type immunities as neutral damage', () => {
    const state = makeState(
      makePokemon({ id: 'player', name: 'Player', types: ['Normal'] }),
      makePokemon({ id: 'enemy', name: 'Enemy', types: ['Ghost'] }),
    )
    const player = state.playerTeam[0]
    const enemy = state.enemyTeam[0]

    const immune = resolvePveDamageExchange({
      state,
      playerMon: player,
      enemyMon: enemy,
      playerStance: 'power',
      enemyStance: 'tech',
      playerDamageMultiplier: 1,
      enemyDamageMultiplier: 0,
      attackType: 'normal',
      enemyCanMove: false,
    })
    expect(immune.playerDamage).toBe(0)

    applySecondaryStatusesFromMove({
      move: getMove('foresight')!,
      state,
      attacker: player,
      defender: enemy,
      sourceSide: 'player',
      random: () => 0,
    })

    const exposed = resolvePveDamageExchange({
      state,
      playerMon: player,
      enemyMon: enemy,
      playerStance: 'power',
      enemyStance: 'tech',
      playerDamageMultiplier: 1,
      enemyDamageMultiplier: 0,
      attackType: 'normal',
      enemyCanMove: false,
    })
    expect(exposed.playerDamage).toBeGreaterThan(0)
    expect(exposed.playerDamageResult.typeEffectiveness).toBe(1)
  })

  test('bad poison damage scales with its counter', () => {
    const player = makePokemon({
      status: { id: 'bad-poison', counter: 2 },
      currentHp: 100,
      maxHp: 100,
    })
    const enemy = makePokemon({ id: 'enemy' })
    const messages = processTurnEnd(makeState(player, enemy))

    expect(player.currentHp).toBe(87)
    expect(player.status?.counter).toBe(3)
    expect(messages[0]).toContain('[icon:status:bad-poison][icon:damage:13]')
  })

  test('grassy terrain heals grounded active pokemon at turn end', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      currentHp: 80,
      maxHp: 160,
      types: ['Grass'],
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      currentHp: 80,
      maxHp: 160,
      types: ['Flying'],
    })
    const state = makeState(player, enemy)
    state.terrain = {
      terrain: 'grassy',
      label: 'Grassy Terrain',
      source: 'ability',
    }

    const messages = processTurnEnd(state)

    expect(player.currentHp).toBe(90)
    expect(enemy.currentHp).toBe(80)
    expect(messages).toContain(
      "Player's Player restored HP from Grassy Terrain! [icon:heal:10]",
    )
  })

  test('secondary statuses trigger after normal end-turn damage and can absorb', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      currentHp: 50,
      maxHp: 100,
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      currentHp: 100,
      maxHp: 100,
      secondaryStatuses: [
        {
          id: 'leech-seed',
          name: 'Leech Seed',
          triggers: ['turn-end'],
          effects: [{ type: 'absorb', percentMaxHp: 10, healPercent: 100 }],
          sourceSide: 'player',
          target: 'pokemon',
          remainingTurns: 2,
        },
      ],
    })
    const messages = processTurnEnd(makeState(player, enemy))

    expect(enemy.currentHp).toBe(90)
    expect(player.currentHp).toBe(60)
    expect(enemy.secondaryStatuses?.[0].remainingTurns).toBe(1)
    expect(messages).toContain(
      "Enemy's Enemy is hurt by Leech Seed. [icon:damage:10]",
    )
    expect(messages).toContain('Player absorbed energy! [icon:heal:10]')
  })

  test('side secondary statuses trigger on switch', () => {
    const player = makePokemon({ id: 'player', name: 'Player' })
    const firstEnemy = makePokemon({ id: 'enemy-1', name: 'First Enemy' })
    const secondEnemy = makePokemon({
      id: 'enemy-2',
      name: 'Second Enemy',
      currentHp: 100,
      maxHp: 100,
    })
    const state = makeState(player, firstEnemy)
    state.enemyTeam.push(secondEnemy)
    state.activeEnemyIndex = 1
    state.secondaryStatuses = [
      {
        id: 'stealth-rock',
        name: 'Stealth Rock',
        triggers: ['switch'],
        effects: [{ type: 'damage', percentMaxHp: 25 }],
        sourceSide: 'player',
        target: 'side',
        targetSide: 'enemy',
      },
    ]

    const messages = processSecondaryStatusesForSwitch(state, 'enemy')

    expect(secondEnemy.currentHp).toBe(75)
    expect(messages).toEqual([
      "Enemy's Second Enemy is hurt by Stealth Rock. [icon:damage:25]",
    ])
  })

  test('Storm Cloud damages enemy switch-ins for one eighth max HP', () => {
    const player = makePokemon({ id: 'player', name: 'Player' })
    const firstEnemy = makePokemon({ id: 'enemy-1', name: 'First Enemy' })
    const secondEnemy = makePokemon({
      id: 'enemy-2',
      name: 'Second Enemy',
      currentHp: 100,
      maxHp: 100,
    })
    const state = makeState(player, firstEnemy)
    state.enemyTeam.push(secondEnemy)
    state.activeEnemyIndex = 1
    state.secondaryStatuses = [
      {
        id: 'storm-cloud',
        name: 'Storm Cloud',
        triggers: ['switch'],
        effects: [{ type: 'damage', percentMaxHp: 12.5 }],
        sourceSide: 'player',
        target: 'side',
        targetSide: 'enemy',
      },
    ]

    const messages = processSecondaryStatusesForSwitch(state, 'enemy')

    expect(secondEnemy.currentHp).toBe(87)
    expect(messages).toEqual([
      "Enemy's Second Enemy is hurt by Storm Cloud. [icon:damage:13]",
    ])
  })

  test('secondary statuses can reduce incoming damage by stance', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      currentHp: 100,
      maxHp: 100,
      secondaryStatuses: [
        {
          id: 'power-guard',
          name: 'Power Guard',
          triggers: ['turn-end'],
          effects: [{ type: 'damage-reduction', stance: 'power', percent: 50 }],
          sourceSide: 'player',
          target: 'pokemon',
        },
      ],
    })
    const enemy = makePokemon({ id: 'enemy', name: 'Enemy' })
    const state = makeState(player, enemy)

    const result = applyPveEnemyDamage({
      state,
      playerMon: player,
      enemyMon: enemy,
      enemyDamage: 40,
      enemyStance: 'power',
      enemyAttackType: 'normal',
    })

    expect(result.enemyDamage).toBe(20)
    expect(player.currentHp).toBe(80)
    expect(result.messages).toContain('Power Guard reduced damage by 50%.')
  })

  test('secondary statuses can modify outgoing damage by stance and type', () => {
    const player = makePokemon({
      id: 'player',
      name: 'Player',
      secondaryStatuses: [
        {
          id: 'electric-terrain',
          name: 'Electric Terrain',
          triggers: ['turn-end'],
          effects: [
            {
              type: 'damage-modifier',
              stance: 'tech',
              attackType: 'electric',
              percent: 50,
            },
          ],
          sourceSide: 'player',
          target: 'pokemon',
        },
      ],
    })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      currentHp: 100,
      maxHp: 100,
    })
    const state = makeState(player, enemy)

    const result = applyPveDamageExchange({
      state,
      playerMon: player,
      enemyMon: enemy,
      playerDamage: 40,
      enemyDamage: 0,
      playerStance: 'tech',
      playerAttackType: 'electric',
      enemyCanMove: false,
    })

    expect(result.playerDamage).toBe(60)
    expect(enemy.currentHp).toBe(40)
    expect(result.messages).toContain(
      'Electric Terrain increased damage by 50%.',
    )
  })

  test('terrain moves set battle terrain through move runtime effects', () => {
    const player = makePokemon({ name: 'Pikachu', types: ['Electric'] })
    const enemy = makePokemon({ id: 'enemy', name: 'Enemy' })
    const state = makeState(player, enemy)
    const move = getMove('electric-terrain')
    expect(move).toBeDefined()

    const result = applyMoveRuntimeEffects({
      move: move!,
      state,
      side: 'player',
      attacker: player,
      defender: enemy,
    })

    expect(result).toEqual({
      messages: ['Electric Terrain created Electric Terrain!'],
    })
    expect(state.terrain).toMatchObject({
      terrain: 'electric',
      label: 'Electric Terrain',
      source: 'move',
      overriddenAtTurn: 1,
      overriddenBy: 'Electric Terrain',
    })
  })

  test('terrain moves fail when matching terrain is already active', () => {
    const player = makePokemon({ name: 'Pikachu', types: ['Electric'] })
    const enemy = makePokemon({ id: 'enemy', name: 'Enemy' })
    const state = makeState(player, enemy)
    state.terrain = {
      terrain: 'electric',
      label: 'Electric Terrain',
      source: 'move',
    }
    const move = getMove('electric-terrain')
    expect(move).toBeDefined()

    expect(
      applyMoveRuntimeEffects({
        move: move!,
        state,
        side: 'player',
        attacker: player,
        defender: enemy,
      }),
    ).toEqual({
      failed: 'Electric Terrain failed because Electric Terrain is already active.',
      messages: [],
    })
  })

  test('terrain moves refresh terrain-based ability type changes', () => {
    const player = makePokemon({
      name: 'Stunfisk',
      ability: 'mimicry',
      types: ['Ground', 'Electric'],
    })
    const enemy = makePokemon({ id: 'enemy', name: 'Enemy' })
    const state = makeState(player, enemy)
    state.terrain = {
      terrain: 'electric',
      label: 'Electric Terrain',
      source: 'ability',
    }
    const move = getMove('grassy-terrain')
    expect(move).toBeDefined()

    const result = applyMoveRuntimeEffects({
      move: move!,
      state,
      side: 'player',
      attacker: player,
      defender: enemy,
    })

    expect(result.messages).toEqual([
      'Grassy Terrain created Grassy Terrain!',
      "Stunfisk's Mimicry changed it to Grass type!",
    ])
    expect(state.terrain).toMatchObject({
      terrain: 'grassy',
      label: 'Grassy Terrain',
      source: 'move',
      originalTerrain: 'electric',
      overriddenBy: 'Grassy Terrain',
    })
    expect(player.types).toEqual(['grass'])
  })

  test('enemy attack telegraph stores the next stance only below half HP', () => {
    const player = makePokemon({ name: 'Player', currentHp: 49, maxHp: 100 })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Enemy',
      speciesId: 4,
      formId: '4',
      types: ['Fire'],
      stats: {
        hp: 100,
        attack: 120,
        defense: 60,
        specialAttack: 40,
        specialDefense: 60,
        speed: 40,
      },
    })
    const state = makeState(player, enemy)

    const message = maybePrepareEnemyAttack({
      state,
      playerMon: player,
      enemyMon: enemy,
      chance: 100,
      rng: () => 0,
    })

    expect(message).toContain(
      'Enemy prepares a [icon:stance:power] Power Attack.',
    )
    expect(state.preparedEnemyAttack?.stance).toBe('power')
    expect(consumePreparedEnemyStance(state, enemy)).toBe('power')
    expect(state.preparedEnemyAttack).toBeUndefined()

    player.currentHp = 50
    expect(
      maybePrepareEnemyAttack({
        state,
        playerMon: player,
        enemyMon: enemy,
        chance: 100,
        rng: () => 0,
      }),
    ).toBe('')
    expect(state.preparedEnemyAttack).toBeUndefined()
  })

  test('observed research level 2 enemies can globally telegraph their stored stance', () => {
    const player = makePokemon({ name: 'Player', currentHp: 100, maxHp: 100 })
    const enemy = makePokemon({
      id: 'enemy',
      name: 'Weedle',
      speciesId: 13,
      formId: '13',
      observedPreferredStance: 'speed',
      pokemonResearchLevel: 2,
    })
    const state = makeState(player, enemy)

    const message = maybePrepareEnemyAttack({
      state,
      playerMon: player,
      enemyMon: enemy,
      chance: 0,
      rng: () => 0.04,
    })

    expect(message).toContain(
      'Hmm it looks like Weedle is preparing a [icon:stance:speed] Speed attack.',
    )
    expect(state.preparedEnemyAttack?.stance).toBe('speed')
  })

  test('learned telegraph requires both research level 2 and a stored observer stance', () => {
    const player = makePokemon({ currentHp: 100, maxHp: 100 })
    const enemy = makePokemon({
      observedPreferredStance: 'tech',
      pokemonResearchLevel: 1,
    })
    const state = makeState(player, enemy)

    expect(
      maybePrepareEnemyAttack({
        state,
        playerMon: player,
        enemyMon: enemy,
        chance: 0,
        rng: () => 0,
      }),
    ).toBe('')

    enemy.pokemonResearchLevel = 2
    enemy.observedPreferredStance = undefined
    expect(
      maybePrepareEnemyAttack({
        state,
        playerMon: player,
        enemyMon: enemy,
        chance: 0,
        rng: () => 0,
      }),
    ).toBe('')
  })

  test('battle observer stance can be stored and read from pokedex records', () => {
    const enemy = makePokemon({ speciesId: 19, formId: '10091' })
    const result = applyObservedPreferredStance({}, enemy, 'speed')

    expect(result.updated).toBe(true)
    expect(result.pokedex['19']['10091'].preferredBattleStance).toBe('speed')
    expect(getObservedPreferredStance(result.pokedex, enemy)).toBe('speed')
  })

  test('pokedex stance reference uses the level 50 form projection', () => {
    const rattata = {
      id: '19',
      name: 'Rattata',
      types: ['Normal'],
      stats: {
        hp: 30,
        attack: 56,
        defense: 35,
        'special-attack': 25,
        'special-defense': 35,
        speed: 72,
      },
    }

    expect(getMostLikelyStanceForPokemonForm(rattata, 1).stance).toBe('power')
    expect(
      getMostLikelyStanceForPokemonForm(rattata, POKEDEX_STANCE_REFERENCE_LEVEL)
        .stance,
    ).toBe('speed')
  })

  test('detects when a fainted active Pokemon needs a player replacement', () => {
    const fainted = makePokemon({ currentHp: 0 })
    const bench = makePokemon({
      id: 'pokemon-2',
      name: 'Ivysaur',
      currentHp: 50,
    })
    const enemy = makePokemon({ id: 'enemy' })
    const state = makeState(fainted, enemy)
    state.playerTeam = [fainted, bench]
    state.pendingPlayerSwitch = true

    expect(
      hasAvailableReplacement(state.playerTeam, state.activePlayerIndex),
    ).toBe(true)
    expect(needsPlayerReplacement(state)).toBe(true)

    bench.currentHp = 0
    expect(
      hasAvailableReplacement(state.playerTeam, state.activePlayerIndex),
    ).toBe(false)
    expect(needsPlayerReplacement(state)).toBe(false)
  })

  test('resetPlayerPowerStateForReplacement clears active transformation state', () => {
    const player = makePokemon({
      isMega: true,
      isDynamaxed: true,
      dynamaxTurnsRemaining: 1,
      teraTypeOverride: 'fire',
      teraTurnsRemaining: 2,
      teraActivatedTurn: 5,
      teraUsed: true,
      zMoveReady: true,
      originalFormId: '1',
      formId: '10033',
    })
    const state = makeState(player, makePokemon({ id: 'enemy' }))
    state.zMoveStance = 'power'
    state.powers = createInitialPowersState()
    state.powers.megaEvolved = true
    state.powers.dynamaxActive = true
    state.powers.dynamaxTurnsRemaining = 1

    resetPlayerPowerStateForReplacement(state)

    expect(state.zMoveStance).toBeUndefined()
    expect(state.powers.megaEvolved).toBe(false)
    expect(state.powers.dynamaxActive).toBe(false)
    expect(player.isMega).toBe(false)
    expect(player.isDynamaxed).toBe(false)
    expect(player.teraTypeOverride).toBeUndefined()
    expect(player.teraTurnsRemaining).toBeUndefined()
    expect(player.teraActivatedTurn).toBeUndefined()
    expect(player.zMoveReady).toBeUndefined()
    expect(player.formId).toBe('1')
    expect(player.originalFormId).toBeUndefined()
  })

  test('dynamax and gigantamax only boost current and max HP', () => {
    const standard = makePokemon({
      currentHp: 50,
      maxHp: 100,
      stats: {
        hp: 100,
        attack: 50,
        defense: 60,
        specialAttack: 70,
        specialDefense: 80,
        speed: 90,
      },
    })
    const originalStats = { ...standard.stats }

    expect(activateDynamax(standard)).toBe(true)
    expect(standard.stats).toEqual(originalStats)
    expect(standard.maxHp).toBe(150)
    expect(standard.currentHp).toBe(75)
    expect(standard.dynamaxOriginalMaxHp).toBe(100)

    standard.currentHp = 60
    clearDynamaxState(standard)
    expect(standard.maxHp).toBe(100)
    expect(standard.currentHp).toBe(40)
    expect(standard.dynamaxOriginalMaxHp).toBeUndefined()

    const gigantamax = makePokemon({
      formId: '6',
      currentHp: 80,
      maxHp: 120,
      stats: {
        hp: 120,
        attack: 84,
        defense: 78,
        specialAttack: 109,
        specialDefense: 85,
        speed: 100,
      },
    })
    const gmaxStats = { ...gigantamax.stats }

    expect(activateDynamax(gigantamax, '10196')).toBe(true)
    expect(gigantamax.formId).toBe('10196')
    expect(gigantamax.stats).toEqual(gmaxStats)
    expect(gigantamax.maxHp).toBe(180)
    expect(gigantamax.currentHp).toBe(120)

    clearDynamaxState(gigantamax)
    expect(gigantamax.formId).toBe('6')
    expect(gigantamax.maxHp).toBe(120)
    expect(gigantamax.currentHp).toBe(80)
  })

  test('freeze blocks movement until thawed', () => {
    const originalRandom = Math.random
    try {
      Math.random = () => 0.99
      const frozen = makePokemon({ status: { id: 'freeze', counter: 0 } })
      const blocked = resolveBeforeMoveStatus(frozen)
      expect(blocked.canMove).toBe(false)
      expect(blocked.message).toBe('Bulbasaur is frozen solid!')
      expect(frozen.status?.id).toBe('freeze')

      Math.random = () => 0.1
      const thawed = resolveBeforeMoveStatus(frozen)
      expect(thawed.canMove).toBe(true)
      expect(thawed.message).toBe('Bulbasaur thawed out!')
      expect(frozen.status).toBeUndefined()
    } finally {
      Math.random = originalRandom
    }
  })

  test('sleep lasts until its hidden turn counter expires', () => {
    const sleeping = makePokemon({ status: { id: 'sleep', counter: 2 } })
    const blocked = resolveBeforeMoveStatus(sleeping)

    expect(blocked.canMove).toBe(false)
    expect(blocked.message).toBe('Bulbasaur is fast asleep.')
    expect(sleeping.status).toEqual({ id: 'sleep', counter: 1 })

    const woke = resolveBeforeMoveStatus(sleeping)

    expect(woke.canMove).toBe(true)
    expect(woke.message).toBe('Bulbasaur woke up!')
    expect(sleeping.status).toBeUndefined()
  })

  test('regen status heals at turn end without needing damage', () => {
    const player = makePokemon({
      currentHp: 80,
      maxHp: 100,
      status: { id: 'regen', counter: 0 },
    })
    const enemy = makePokemon({ id: 'enemy', name: 'Enemy' })
    const state = makeState(player, enemy)

    const messages = processTurnEnd(state)

    expect(player.currentHp).toBe(92)
    expect(messages).toContain(
      'Bulbasaur restored 12 HP from Regeneration. [icon:heal:12]',
    )
  })

  test('confusion can self-damage or expire before movement', () => {
    const originalRandom = Math.random
    try {
      Math.random = () => 0.1
      const confused = makePokemon({ status: { id: 'confusion', counter: 2 } })
      const hitSelf = resolveBeforeMoveStatus(confused)

      expect(hitSelf.canMove).toBe(false)
      expect(hitSelf.selfDamage).toBe(13)
      expect(confused.currentHp).toBe(87)
      expect(confused.status?.counter).toBe(1)

      const cleared = makePokemon({ status: { id: 'confusion', counter: 1 } })
      const result = resolveBeforeMoveStatus(cleared)
      expect(result.canMove).toBe(true)
      expect(result.message).toBe('Bulbasaur snapped out of confusion!')
      expect(cleared.status).toBeUndefined()
    } finally {
      Math.random = originalRandom
    }
  })
})
