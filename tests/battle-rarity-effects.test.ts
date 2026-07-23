import { describe, expect, test } from 'bun:test'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import {
  applyBattleRarityEntryEffects,
  processBattleRarityAttackAttempt,
  processBattleRarityTurnEnd,
} from '@/utilities/battle/rarity-effects'

function makePokemon(overrides: Partial<BattlePokemon> = {}): BattlePokemon {
  return {
    id: 'pokemon-1',
    user: 'user-1',
    originalTrainer: 'user-1',
    speciesId: 1,
    formId: '1',
    level: 50,
    name: 'Testmon',
    types: ['grass', 'poison'],
    stats: {
      hp: 100,
      attack: 10,
      defense: 20,
      specialAttack: 30,
      specialDefense: 40,
      speed: 50,
    },
    currentHp: 100,
    maxHp: 100,
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-01-01T00:00:00.000Z',
    ...overrides,
  }
}

function makeBattleState(weather: BattleState['weather']): BattleState {
  return {
    playerTeam: [],
    enemyTeam: [],
    activePlayerIndex: 0,
    activeEnemyIndex: 0,
    turn: 1,
    status: 'ongoing',
    playerName: 'Player',
    enemyName: 'Enemy',
    itemsUsedThisBattle: [],
    weather,
  } as unknown as BattleState
}

describe('battle rarity effects', () => {
  test('applies fixed and additive types once on entry', () => {
    const white = makePokemon({ rarity: 'white' })
    const levin = makePokemon({ rarity: 'levin' })

    applyBattleRarityEntryEffects(white)
    const levinMessages = applyBattleRarityEntryEffects(levin)
    applyBattleRarityEntryEffects(levin)

    expect(white.types).toEqual(['normal'])
    expect(levin.types).toEqual(['grass', 'poison', 'electric'])
    expect(levin.rarityBattleState?.entryApplied).toBe(true)
    expect(levinMessages).toContain('Testmon added Electric Type!')
  })

  test('applies Crystal, Retro, Pixelated, and entry statuses', () => {
    const crystal = makePokemon({ rarity: 'crystal' })
    const retro = makePokemon({ rarity: 'retro' })
    const emerald = makePokemon({ rarity: 'emerald', status: { id: 'burn', counter: 0 } })
    const pixelated = makePokemon({ rarity: 'pixelated' })

    applyBattleRarityEntryEffects(crystal)
    applyBattleRarityEntryEffects(retro, () => 0)
    applyBattleRarityEntryEffects(emerald)
    applyBattleRarityEntryEffects(pixelated)

    expect(crystal.statStages).toMatchObject({
      attack: 2,
      specialAttack: 2,
      defense: -2,
      specialDefense: -2,
    })
    expect(retro.statStages).toMatchObject({ attack: 3, defense: -3 })
    expect(emerald.status?.id).toBe('shield')
    expect(pixelated.statStages?.evasion).toBe(1)
  })

  test('Ruby, Sapphire, and Emerald set their entry weather', () => {
    const rubyState = makeBattleState({
      slot: 1,
      weather: 'rain',
      label: 'Rain',
    })
    const sapphireState = makeBattleState({
      slot: 1,
      weather: 'harsh-sunlight',
      label: 'Harsh Sunlight',
    })
    const emeraldState = makeBattleState({
      slot: 1,
      weather: 'sandstorm',
      label: 'Sandstorm',
    })

    const rubyMessages = applyBattleRarityEntryEffects(
      makePokemon({ rarity: 'ruby' }),
      Math.random,
      rubyState,
    )
    const sapphireMessages = applyBattleRarityEntryEffects(
      makePokemon({ rarity: 'sapphire' }),
      Math.random,
      sapphireState,
    )
    const emeraldMessages = applyBattleRarityEntryEffects(
      makePokemon({ rarity: 'emerald' }),
      Math.random,
      emeraldState,
    )

    expect(rubyState.weather?.weather).toBe('harsh-sunlight')
    expect(sapphireState.weather?.weather).toBe('rain')
    expect(emeraldState.weather?.weather).toBe('clear')
    expect(rubyMessages).toContain(
      'Testmon\'s Ruby rarity made the weather Harsh Sunlight!',
    )
    expect(sapphireMessages).toContain(
      'Testmon\'s Sapphire rarity made the weather Rain!',
    )
    expect(emeraldMessages).toContain(
      'Testmon\'s Emerald rarity made the weather Clear!',
    )
  })

  test('selects legal Prism types and changes Rainbow types every active turn', () => {
    const prism = makePokemon({ rarity: 'prism' })
    const rainbow = makePokemon({ rarity: 'rainbow' })

    applyBattleRarityEntryEffects(prism, () => 0)
    applyBattleRarityEntryEffects(rainbow, () => 0)
    const firstRainbowType = rainbow.rarityBattleState?.extraType
    processBattleRarityTurnEnd(rainbow, () => 0)
    const nextRainbowType = rainbow.rarityBattleState?.extraType

    expect(prism.rarityBattleState?.extraType).toBe('normal')
    expect(prism.types).toContain('normal')
    expect(nextRainbowType).not.toBe(firstRainbowType)
    expect(rainbow.types).toContain(nextRainbowType ?? '')
  })

  test('rolls attack-attempt riders and shuffles only active Glitch combat stats', () => {
    const levin = makePokemon({ rarity: 'levin' })
    const target = makePokemon({ types: ['water'] })
    const voidMon = makePokemon({ rarity: 'void' })
    const glitch = makePokemon({
      rarity: 'glitch',
      statStages: {
        attack: 2,
        defense: -1,
        specialAttack: 0,
        specialDefense: 0,
        speed: 1,
        crit: 0,
        accuracy: 0,
        evasion: 0,
      },
    })

    processBattleRarityAttackAttempt({ attacker: levin, defender: target, random: () => 0 })
    processBattleRarityAttackAttempt({ attacker: voidMon, defender: target, random: () => 0 })
    applyBattleRarityEntryEffects(glitch)
    processBattleRarityTurnEnd(glitch, () => 0)

    expect(target.status?.id).toBe('paralysis')
    expect(voidMon.status?.id).toBe('vanished')
    expect(glitch.stats).toMatchObject({
      hp: 100,
      attack: 20,
      defense: 30,
      specialAttack: 40,
      specialDefense: 50,
      speed: 10,
    })
    expect(glitch.statStages?.attack).toBe(2)
  })
})
