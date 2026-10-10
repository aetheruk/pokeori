import { describe, expect, test } from 'bun:test'
import type { User } from '@/payload-types'
import type { BattleConfig, Location, Reward } from '@/data/types'
import { battles } from '@/data/battles'
import { items } from '@/data/items'
import {
  canRollAlpha,
  canRollCaptureAlpha,
  rollCaptureAlpha,
  applyAlphaCaptureBonuses,
  applyAlphaCaptureXp,
  generateAlphaStats,
  rollAlpha,
  type AlphaCapturePokemon,
} from '@/utilities/pokemon/alpha'
import {
  computeStats,
  generatePokemonStats,
} from '@/utilities/pokemon/pokemon-mechanics'
import { buildBattleCaptureEncounter } from '@/app/(frontend)/game/battles/helpers/alpha-capture'
import { buildBattleWinRewards } from '@/app/(frontend)/game/battles/helpers/win-rewards'
import { initializeBattlePokemon } from '@/utilities/battle/battle-logic'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import { buildCaptureResearchXpRewards } from '@/utilities/research/capture-research-rewards'
import { buildWildBattleSelectedTeam } from '@/utilities/battle/lead-selection'
import {
  makeBattlePokemon,
  makePveBattleState,
} from './helpers/battle-fixtures'

const config: BattleConfig = {
  id: 'wild-route',
  name: 'Wild Route',
  category: 'Kanto',
  subCategory: 'Route 1',
  description: '',
  background: '/backgrounds/grassy-route.avif',
  icon: { type: 'pokemon', id: '19' },
  requirements: [],
  enemyTeam: [{ speciesId: 19, level: { min: 3, max: 6 } }],
  maxPokemon: 1,
  isWildBattle: true,
  rewards: [],
}

function sizeRolls(heightRoll: number, weightRoll: number) {
  // Six random IVs, nature and size, then one guaranteed-perfect-IV pick.
  const rolls = [...Array(10).fill(0.25), heightRoll, weightRoll]
  return () => rolls.shift() ?? 0
}

function makeAlpha() {
  return {
    ...generateAlphaStats(3, 35, () => 0.5),
    speciesId: 19,
    formId: '19',
    name: 'Rattata',
    level: 11,
    gender: 'female',
    rarity: 'shiny',
    shiny: true,
    isAlpha: true,
    ability: 'run-away',
    background: config.background,
  } satisfies AlphaCapturePokemon
}

describe('Alpha Pokémon', () => {
  test('ordinary capture encounters roll independently at one in 30 and exclude special content', () => {
    const location = { ...config, encounters: [] } as unknown as Location
    expect(canRollCaptureAlpha(location, 19)).toBe(true)
    expect(rollCaptureAlpha(true, () => 1 / 30 - 0.000001)).toBe(true)
    expect(rollCaptureAlpha(true, () => 1 / 30)).toBe(false)
    expect(
      rollCaptureAlpha(false, () => {
        throw new Error('Must not roll')
      }),
    ).toBe(false)
    for (const override of [
      { isRandomEvent: true },
      { eventContexts: [{}] },
      { keyEncounter: true },
      { specialEncounter: { type: 'ghost', requiredItemId: 'silph-scope' } },
      { category: 'Secret' },
      { category: 'Special' },
      { category: 'Test' },
      { expeditionOnly: true },
      { encounterMode: 'safari' as const },
      { allowAlpha: false },
    ]) {
      expect(
        canRollCaptureAlpha({ ...location, ...override } as Location, 19),
      ).toBe(false)
    }
    expect(canRollCaptureAlpha(location, 150)).toBe(false)
    expect(canRollCaptureAlpha(location, 151)).toBe(false)
    expect(canRollCaptureAlpha(location, 19, true)).toBe(false)
  })

  test('successful Alpha captures multiply only Explorer XP by five', () => {
    const rewards: Reward[] = [
      { type: 'xp', skill: 'catching', quantity: 20 },
      { type: 'xp', skill: 'catching', quantity: { min: 2, max: 4 } },
      { type: 'xp', skill: 'catching' },
      { type: 'xp', skill: 'training', quantity: 20 },
      { type: 'item', targetId: 'poke-ball', quantity: 2 },
    ]
    expect(applyAlphaCaptureXp(rewards, false)).toBe(rewards)
    expect(applyAlphaCaptureXp(rewards, true)).toEqual([
      { ...rewards[0], quantity: 100 },
      { ...rewards[1], quantity: { min: 10, max: 20 } },
      { ...rewards[2], quantity: 5 },
      rewards[3],
      rewards[4],
    ])
    expect(rewards[0].quantity).toBe(20)
  })

  test('successful Alpha captures grant battle-scale target Research XP and triple item drops', () => {
    const rewards: Reward[] = [
      { type: 'pokemon_research_xp', targetId: '19', quantity: 3 },
      { type: 'pokemon_research_xp', targetId: '25', quantity: 2, isCompanion: true },
      { type: 'item', targetId: 'escape-rope', quantity: 2, dropChance: 8 },
      { type: 'item', targetId: 'repel', quantity: { min: 1, max: 2 }, dropChance: 5 },
      { type: 'item', targetId: 'golden-scale-1', quantity: 1, dropChance: 5 },
      { type: 'currency', targetId: 'crystals', quantity: 11 },
    ]

    expect(applyAlphaCaptureBonuses(rewards, false)).toBe(rewards)
    expect(applyAlphaCaptureBonuses(rewards, true)).toEqual([
      rewards[0],
      rewards[1],
      { ...rewards[2], quantity: 6 },
      { ...rewards[3], quantity: { min: 3, max: 6 } },
      rewards[4],
      rewards[5],
    ])
    expect(buildCaptureResearchXpRewards('19', '25', 15)).toEqual([
      { type: 'pokemon_research_xp', targetId: '19', quantity: 15, dropChance: 100 },
      { type: 'pokemon_research_xp', targetId: '25', quantity: 2, dropChance: 100, isCompanion: true },
    ])
    expect(rewards[0].quantity).toBe(3)
  })
  test('the capture actions preserve the defeated Pokémon and prevent duplicate or restarted captures', () => {
    const result = Bun.spawnSync({
      cmd: ['bun', 'tests/fixtures/alpha-capture-flow.ts'],
      cwd: process.cwd(),
      stdout: 'pipe',
      stderr: 'pipe',
    })
    expect(new TextDecoder().decode(result.stderr)).toBe('')
    expect(result.exitCode).toBe(0)
  })
  test('has an independent one-in-30 roll with an exclusive upper boundary', () => {
    expect(rollAlpha(true, () => 0)).toBe(true)
    expect(rollAlpha(true, () => 1 / 30 - 0.000001)).toBe(true)
    expect(rollAlpha(true, () => 1 / 30)).toBe(false)
    expect(
      rollAlpha(false, () => {
        throw new Error('Ineligible encounters must not roll')
      }),
    ).toBe(false)
    expect(
      canRollAlpha(config, { ...config.enemyTeam[0], rarity: 'shiny' }),
    ).toBe(true)
  })

  test('excludes events, scripted encounters, trainer battles, special categories and legendary targets', () => {
    const enemy = config.enemyTeam[0]
    for (const override of [
      { isWildBattle: false },
      { isRandomEvent: true },
      { category: 'Special' },
      { category: 'Secret' },
      { expeditionOnly: true },
      { pvp: true },
      { eventContexts: [{}] },
      { disableRewards: true },
      { format: 'double' as const },
      { allowAlpha: false },
    ])
      expect(canRollAlpha({ ...config, ...override }, enemy)).toBe(false)
    expect(canRollAlpha(config, enemy, true)).toBe(false)
    expect(canRollAlpha(config, { ...enemy, speciesId: 150 })).toBe(false)
    expect(canRollAlpha(config, { ...enemy, name: 'Story Pokémon' })).toBe(
      false,
    )
    expect(canRollAlpha(config, { ...enemy, ivs: { hp: 31 } })).toBe(false)
  })

  test('guarantees one perfect IV and 252 HP EVs, with remaining IVs still random', () => {
    const stats = generateAlphaStats(100, 100, () => 0.25)
    expect(Object.values(stats.ivs).filter((iv) => iv === 31)).toHaveLength(1)
    expect(Object.values(stats.ivs).filter((iv) => iv !== 31)).toEqual([
      8, 8, 8, 8, 8,
    ])
    expect(stats.evs).toEqual({
      hp: 252,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    })
    // Other IVs can naturally roll 31 as well.
    expect(
      Object.values(generateAlphaStats(100, 100, () => 0.999).ivs),
    ).toEqual(Array(6).fill(31))
  })

  test('sizes start at the normal maximum and require both extra rolls above 8% for XXXL', () => {
    const minimum = generateAlphaStats(100, 200, sizeRolls(0, 0))
    expect(minimum).toMatchObject({ height: 120, weight: 240, size: 'XXL' })
    expect(generateAlphaStats(100, 200, sizeRolls(0.8, 0.9)).size).toBe('XXL')
    expect(generateAlphaStats(100, 200, sizeRolls(0.9, 0.79)).size).toBe('XXL')
    expect(generateAlphaStats(100, 200, sizeRolls(0.81, 0.9))).toMatchObject({
      height: 129.7,
      weight: 261.6,
      size: 'XXXL',
    })
    expect(generatePokemonStats(100, 200, () => 0.999).size).toBe('XL')
  })

  test('capture uses the original Alpha, starts at zero for exactly 50 seconds and cannot be restarted', () => {
    const alpha = makeAlpha()
    const state = makePveBattleState({
      status: 'won',
      isWildBattle: true,
      economyActionId: 'battle-session',
      alphaCapturePokemon: alpha,
      enemyTeam: [makeBattlePokemon({ ...alpha, currentHp: 0 })],
    })
    const encounter = buildBattleCaptureEncounter(state, config, 'owner', 1000)!
    expect(encounter.expiry - encounter.startTime).toBe(50_000)
    expect(encounter.currentCatchRate).toBe(0)
    expect(encounter.baseCatchRate).toBe(0)
    expect(encounter.alphaPokemon).toEqual(alpha)
    expect(encounter.alphaPokemon).not.toBe(alpha)
    expect(encounter).toMatchObject({
      level: 11,
      isShiny: true,
      rarity: 'shiny',
      gender: 'female',
      background: config.background,
    })
    for (const override of [
      { status: 'lost' as const },
      { status: 'ongoing' as const },
      { isWildBattle: false },
      { isPvp: true },
      { alphaCaptureStartedAt: 1000 },
      { alphaCapturePokemon: undefined },
      { enemyTeam: [makeBattlePokemon({ ...alpha, currentHp: 1 })] },
    ])
      expect(
        buildBattleCaptureEncounter(
          { ...state, ...override },
          config,
          'owner',
          1000,
        ),
      ).toBeNull()
  })

  test('opted-in wild routes offer standard capture rules for defeated variants', () => {
    const shiny = { ...makeAlpha(), isAlpha: false, rarity: 'shiny' as const }
    const wildConfig = { ...config, allowVariantCatches: true }
    const state = makePveBattleState({
      status: 'won',
      isWildBattle: true,
      economyActionId: 'variant-battle-session',
      battleCapturePokemon: shiny,
      enemyTeam: [makeBattlePokemon({ ...shiny, currentHp: 0 })],
    })
    const encounter = buildBattleCaptureEncounter(
      state,
      wildConfig,
      'owner',
      1000,
    )!
    expect(encounter.expiry - encounter.startTime).toBe(30_000)
    expect(encounter.baseCatchRate).toBe(
      Math.floor((getPokemonForm(shiny.formId)?.capture_rate || 100) / 2),
    )
    expect(encounter.currentCatchRate).toBe(encounter.baseCatchRate)
    expect(encounter.alphaPokemon).toBeUndefined()
    expect(encounter.battleCapturePokemon).toEqual(shiny)
    expect(encounter).toMatchObject({
      rarity: 'shiny',
      isShiny: true,
      level: shiny.level,
      background: config.background,
    })
    expect(
      buildBattleCaptureEncounter(
        { ...state, battleCaptureStartedAt: 1000 },
        wildConfig,
        'owner',
        1000,
      ),
    ).toBeNull()
    expect(
      buildBattleCaptureEncounter(
        state,
        config,
        'owner',
        1000,
      ),
    ).toBeNull()
  })

  test('only ordinary route and cave wild battles opt into variant catches', () => {
    const enabled = battles
      .filter((battle) => battle.allowVariantCatches)
      .map((battle) => battle.id)
      .sort()
    expect(enabled).toEqual(
      [
        'digletts-cave-battle',
        'mt-moon-1f',
        'mt-moon-b1f',
        'mt-moon-b2f',
        'pokemon-tower-3f-wild',
        'pokemon-tower-4f-wild',
        'pokemon-tower-5f-wild',
        'pokemon-tower-6f-wild',
        'rock-tunnel-1f-ne',
        'rock-tunnel-1f-south',
        'rock-tunnel-1f-west',
        'rock-tunnel-b1f-nw',
        'rock-tunnel-b1f-se',
        'route-1-battle',
        'route-10-battle',
        'route-11-battle',
        'route-12-battle',
        'route-13-battle',
        'route-14-battle',
        'route-15-battle',
        'route-2-battle',
        'route-22-battle',
        'route-24-battle',
        'route-25-battle',
        'route-3-battle',
        'route-4-battle',
        'route-5-battle',
        'route-6-battle',
        'route-7-battle',
        'route-8-battle',
        'route-9-battle',
        'viridian-forest-battle',
      ].sort(),
    )
    expect(
      battles
        .filter(
          (battle) =>
            battle.category === 'Special' ||
            battle.category === 'Secret' ||
            battle.allowAlpha === false,
        )
        .every((battle) => !battle.allowVariantCatches),
    ).toBe(true)
  })

  test('the battle and eventual owned Pokémon calculate the same base stats', () => {
    const alpha = makeAlpha()
    const battle = initializeBattlePokemon({ ...alpha } as any)
    const ownedStats = computeStats(
      getPokemonForm(alpha.formId)!.stats,
      alpha.ivs,
      alpha.evs,
      alpha.level,
      alpha.nature,
    )
    expect(battle.stats).toEqual(ownedStats)
    expect(battle.isAlpha).toBe(true)
    const team = [
      makeBattlePokemon({ id: 'a' }),
      makeBattlePokemon({ id: 'b' }),
      makeBattlePokemon({ id: 'c' }),
    ]
    expect(
      buildWildBattleSelectedTeam(team, 2, 2).map((pokemon) => pokemon.id),
    ).toEqual(['c', 'a'])
  })

  test('victory awards 15 target research XP, double Pokémon XP, triple item quantities and fivefold trainer XP', () => {
    const alpha = makeAlpha()
    const state = makePveBattleState({
      isWildBattle: true,
      status: 'won',
      enemyTeam: [makeBattlePokemon({ ...alpha, currentHp: 0 })],
    })
    const user = { id: 'player-1', skills: {} } as User
    const rewardsConfig = {
      ...config,
      disableCandyRewards: true,
      rewards: [
        {
          type: 'item',
          targetId: 'poke-ball',
          quantity: { min: 1, max: 3 },
          dropChance: 25,
        },
        { type: 'item', targetId: 'potion', dropChance: 25 },
        { type: 'item', targetId: 'golden-scale-1', quantity: 1, dropChance: 25 },
        { type: 'xp', skill: 'battling', quantity: 10 },
      ],
    }
    const regularState = {
      ...state,
      enemyTeam: state.enemyTeam.map((enemy) => ({ ...enemy, isAlpha: false })),
    }
    // Reward builders roll material quantities; deterministic random keeps comparisons meaningful.
    const originalRandom = Math.random
    Math.random = () => 0.5
    try {
      const regular = buildBattleWinRewards(regularState, user, rewardsConfig)
      const rewards = buildBattleWinRewards(state, user, rewardsConfig)
      expect(rewards).toHaveLength(regular.length)
      for (let index = 0; index < regular.length; index++) {
        const before = regular[index]
        const after = rewards[index]
        if (
          before.type === 'pokemon_research_xp' &&
          before.targetId === alpha.formId
        ) {
          expect(after.quantity).toBe(15)
          continue
        }
        const multiplier =
          before.type === 'xp'
            ? 5
            : before.type === 'pokemon_experience'
              ? 2
              : before.type === 'item' &&
                  !items.find((item) => item.id === before.targetId)?.unique
                ? 3
                : 1
        expect(after.dropChance).toBe(before.dropChance)
        expect(after.quantity).toEqual(
          typeof before.quantity === 'number'
            ? before.quantity * multiplier
            : before.quantity
              ? {
                  min: before.quantity.min * multiplier,
                  max: before.quantity.max * multiplier,
                }
              : multiplier > 1
                ? multiplier
                : undefined,
        )
      }
      expect(
        rewards.find((reward) => reward.type === 'pokemon_experience'),
      ).toBeDefined()
    } finally {
      Math.random = originalRandom
    }
  })
})
