import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import {
  getGameTypeLabel,
  getTypeIcon,
} from '@/components/game/features/explore/utils'
import { allGames } from '@/data/games'
import { celadonGameCornerUfoCatcherEntries } from '@/data/games/ufo-catcher/entries/celadon-game-corner'
import { validateGameItem } from '@/data/games/schemas'
import { getIcon } from '@/data/user/icons'
import { getTitle } from '@/data/user/titles'
import { getGameActivityRoute } from '@/utilities/games/activity-domain'
import {
  buildUfoCatcherPrizeLayout,
  getEligibleUfoCatcherTiers,
  getUfoCatcherCoordinates,
  resolveUfoCatcherAttempt,
  selectUfoCatcherPrizePool,
  selectUfoCatcherTier,
} from '@/utilities/research/ufo-catcher'
import { getRequiredResearchWins } from '@/utilities/research/required-wins'

const [standard] = celadonGameCornerUfoCatcherEntries

const layoutRolls = {
  tierRolls: [0, 0, 0, 0, 0],
  anchorRolls: [0, 0.2, 0.4, 0.6, 0.8],
  jitterRolls: Array.from({ length: 5 }, () => ({ x: 0.5, y: 0.5 })),
}

function getItemReward(tierId: string) {
  const tier = standard.settings.tiers.find((entry) => entry.id === tierId)
  const reward = tier?.rewards[0]
  if (reward?.type !== 'item') {
    throw new Error(`Expected ${tierId} to have an item reward`)
  }
  return reward
}

describe('UFO Catcher authored balance', () => {
  test('authors one 30-token non-currency machine with five prizes per play', () => {
    expect(celadonGameCornerUfoCatcherEntries.map((entry) => entry.id)).toEqual(
      ['celadon-rocket-ufo-catcher'],
    )
    expect(standard.settings.cost).toEqual({
      currencyType: 'fun-tokens',
      amount: 30,
    })
    expect(standard.settings.prizeCount).toBe(5)
    expect(standard.icon).toEqual({ type: 'pokemon', id: '479' })
    expect(
      standard.settings.tiers.every(
        (tier) =>
          tier.rewards.length === 1 &&
          ['item', 'icon', 'title'].includes(tier.rewards[0]?.type || ''),
      ),
    ).toBe(true)
    expect(
      standard.settings.tiers.some((tier) =>
        tier.rewards.some((reward) => reward.type === 'currency'),
      ),
    ).toBe(false)
  })

  test('includes the requested consumables, gems, materials, balls, evolution items, and vitamins', () => {
    expect(getItemReward('potions')).toMatchObject({
      targetId: 'battle-potion',
      quantity: 1,
    })
    expect(getItemReward('antidotes')).toMatchObject({
      targetId: 'antidote',
      quantity: 1,
    })
    for (const itemId of [
      'paralyze-heal',
      'awakening',
      'burn-heal',
      'ice-heal',
      'full-heal',
    ]) {
      expect(getItemReward(itemId)).toMatchObject({
        targetId: itemId,
        quantity: 1,
      })
    }
    expect(getItemReward('xs-candy')).toMatchObject({
      targetId: 'rare-candy-xs',
      quantity: 2,
    })
    expect(getItemReward('s-candy')).toMatchObject({
      targetId: 'rare-candy-m',
      quantity: 2,
    })

    for (const type of [
      'normal',
      'fire',
      'water',
      'electric',
      'grass',
      'ice',
      'fighting',
      'poison',
      'ground',
      'flying',
      'psychic',
      'bug',
      'rock',
      'ghost',
      'dragon',
      'dark',
      'steel',
      'fairy',
    ]) {
      expect(getItemReward(`${type}-gems`)).toMatchObject({
        targetId: `${type}-gem`,
        quantity: 2,
      })
    }

    for (const materialId of [
      'soft-fluff-t1',
      'cinder-shard-t1',
      'aqua-solvent-t1',
      'electric-component-t1',
      'wood-scraps-t1',
      'frost-crystal-t1',
      'grip-weave-t1',
      'toxic-resin-t1',
      'terra-dust-t1',
      'wing-feather-t1',
      'mind-thread-t1',
      'chitin-fragment-t1',
      'small-stone-t1',
      'spirit-wisp-t1',
      'drake-scale-t1',
      'shadow-fiber-t1',
      'metal-scrap-t1',
      'pixie-powder-t1',
    ]) {
      expect(getItemReward(materialId)).toMatchObject({
        targetId: materialId,
        quantity: 3,
      })
    }

    for (const itemId of [
      'x-attack',
      'x-defense',
      'x-sp-atk',
      'x-sp-def',
      'x-speed',
      'dire-hit',
      'ultra-ball',
      'rocket-ball',
      'link-cable',
      'up-grade',
      'dubious-disc',
      'nugget',
      'hp-up',
      'protein',
      'iron',
      'calcium',
      'zinc',
      'carbos',
    ]) {
      expect(getItemReward(itemId)).toMatchObject({
        targetId: itemId,
        quantity: 1,
      })
    }
  })

  test('authors medium-rare Rotom icon and UFO Master title unlocks', () => {
    expect(
      standard.settings.tiers.find((tier) => tier.id === 'rotom-icon'),
    ).toMatchObject({
      label: 'Rotom Icon',
      icon: { type: 'pokemon', id: '479' },
      rarity: 'uncommon',
      weight: 1,
      rewards: [
        {
          type: 'icon',
          targetId: 'rotom',
          dropChance: 100,
        },
      ],
    })
    expect(
      standard.settings.tiers.find((tier) => tier.id === 'ufo-master-title'),
    ).toMatchObject({
      label: 'UFO Master Title',
      rarity: 'uncommon',
      weight: 1,
      rewards: [
        {
          type: 'title',
          targetId: 'ufo-master',
          dropChance: 100,
        },
      ],
    })
    expect(getIcon('rotom')).toMatchObject({
      name: 'Rotom',
      icon: { type: 'pokemon', id: '479' },
    })
    expect(getTitle('ufo-master')).toEqual({
      id: 'ufo-master',
      name: 'UFO Master',
    })
  })

  test('makes rarer items progressively harder to grip', () => {
    const gripByRarity = Object.fromEntries(
      ['common', 'uncommon', 'rare', 'ultra-rare'].map((rarity) => {
        const tier = standard.settings.tiers.find(
          (entry) => entry.rarity === rarity,
        )
        return [
          rarity,
          tier && {
            hitRadius: tier.hitRadius,
            edgeGripChance: tier.edgeGripChance,
            centerGripChance: tier.centerGripChance,
          },
        ]
      }),
    )

    expect(gripByRarity).toEqual({
      common: {
        hitRadius: 36,
        edgeGripChance: 0.45,
        centerGripChance: 0.95,
      },
      uncommon: {
        hitRadius: 32,
        edgeGripChance: 0.3,
        centerGripChance: 0.85,
      },
      rare: {
        hitRadius: 27,
        edgeGripChance: 0.15,
        centerGripChance: 0.7,
      },
      'ultra-rare': {
        hitRadius: 22,
        edgeGripChance: 0,
        centerGripChance: 0.55,
      },
    })
  })

  test('unlocks from the public Celadon Game Corner task', () => {
    expect(standard.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'when-the-fun-stops',
    })
  })
})

describe('UFO Catcher geometry and resolution', () => {
  test('maps bounded hold durations into authored claw coordinates', () => {
    const start = getUfoCatcherCoordinates(standard.settings, {
      xHoldMs: 0,
      yHoldMs: 0,
    })
    const end = getUfoCatcherCoordinates(standard.settings, {
      xHoldMs: standard.settings.xTravelMs,
      yHoldMs: standard.settings.yTravelMs,
    })

    expect(start).toEqual({ x: 60, y: 320 })
    expect(end).toEqual({ x: 540, y: 40 })
    expect(
      getUfoCatcherCoordinates(standard.settings, {
        xHoldMs: standard.settings.xTravelMs + 1,
        yHoldMs: 0,
      }),
    ).toBeNull()
  })

  test('selects weighted tiers at their cumulative boundaries', () => {
    const totalWeight = standard.settings.tiers.reduce(
      (total, tier) => total + tier.weight,
      0,
    )
    const firstBoundary = standard.settings.tiers[0].weight / totalWeight

    expect(selectUfoCatcherTier(standard.settings.tiers, 0).id).toBe('potions')
    expect(
      selectUfoCatcherTier(
        standard.settings.tiers,
        firstBoundary - Number.EPSILON,
      ).id,
    ).toBe('potions')
    expect(
      selectUfoCatcherTier(standard.settings.tiers, firstBoundary).id,
    ).toBe('antidotes')
    expect(selectUfoCatcherTier(standard.settings.tiers, 0.999999).id).toBe(
      standard.settings.tiers.at(-1)!.id,
    )
  })

  test('removes profile prizes from future cabinets after they are unlocked', () => {
    const eligible = getEligibleUfoCatcherTiers(standard.settings.tiers, {
      unlockedIcons: ['rotom'],
      unlockedTitles: ['ufo-master'],
    })

    expect(eligible.some((tier) => tier.id === 'rotom-icon')).toBe(false)
    expect(eligible.some((tier) => tier.id === 'ufo-master-title')).toBe(false)
    expect(eligible.some((tier) => tier.id === 'link-cable')).toBe(true)
  })

  test('selects five distinct weighted prizes and randomized unique anchors', () => {
    const selected = selectUfoCatcherPrizePool(
      standard.settings.tiers,
      layoutRolls.tierRolls,
      standard.settings.prizeCount,
    )
    expect(new Set(selected.map((tier) => tier.id)).size).toBe(5)

    const layout = buildUfoCatcherPrizeLayout({
      settings: standard.settings,
      ...layoutRolls,
    })
    expect(layout).toHaveLength(5)
    expect(new Set(layout.map((prize) => prize.tierId)).size).toBe(5)
    expect(new Set(layout.map((prize) => `${prize.x}:${prize.y}`)).size).toBe(5)

    const jitteredLayout = buildUfoCatcherPrizeLayout({
      settings: standard.settings,
      ...layoutRolls,
      jitterRolls: Array.from({ length: 5 }, () => ({ x: 0.99, y: 0.01 })),
    })
    expect(jitteredLayout.map(({ x, y }) => ({ x, y }))).not.toEqual(
      layout.map(({ x, y }) => ({ x, y })),
    )
    expect(
      jitteredLayout.every(
        (prize) =>
          prize.x >= standard.settings.board.clawBounds.minX &&
          prize.x <= standard.settings.board.clawBounds.maxX &&
          prize.y >= standard.settings.board.clawBounds.minY &&
          prize.y <= standard.settings.board.clawBounds.maxY,
      ),
    ).toBe(true)
  })

  test('resolves centred catches, slips, and empty-space misses', () => {
    const layout = buildUfoCatcherPrizeLayout({
      settings: standard.settings,
      ...layoutRolls,
    })
    const target = layout[0]
    const { clawBounds } = standard.settings.board
    const xHoldMs =
      ((target.x - clawBounds.minX) / (clawBounds.maxX - clawBounds.minX)) *
      standard.settings.xTravelMs
    const yHoldMs =
      ((clawBounds.maxY - target.y) / (clawBounds.maxY - clawBounds.minY)) *
      standard.settings.yTravelMs

    expect(
      resolveUfoCatcherAttempt({
        settings: standard.settings,
        prizes: layout,
        input: { xHoldMs, yHoldMs },
        gripRoll: 0.94,
      })?.outcome,
    ).toBe('caught')
    expect(
      resolveUfoCatcherAttempt({
        settings: standard.settings,
        prizes: layout,
        input: { xHoldMs, yHoldMs },
        gripRoll: 0.96,
      })?.outcome,
    ).toBe('slip')
    expect(
      resolveUfoCatcherAttempt({
        settings: standard.settings,
        prizes: layout,
        input: {
          xHoldMs: standard.settings.xTravelMs,
          yHoldMs: standard.settings.yTravelMs,
        },
        gripRoll: 0,
      })?.outcome,
    ).toBe('miss')
  })

  test('rejects the forgiving near-miss range from the original tuning', () => {
    const layout = buildUfoCatcherPrizeLayout({
      settings: standard.settings,
      ...layoutRolls,
    })
    const target = layout[0]
    const { clawBounds } = standard.settings.board
    const xHoldMs =
      ((target.x + 40 - clawBounds.minX) /
        (clawBounds.maxX - clawBounds.minX)) *
      standard.settings.xTravelMs
    const yHoldMs =
      ((clawBounds.maxY - target.y) / (clawBounds.maxY - clawBounds.minY)) *
      standard.settings.yTravelMs

    expect(
      resolveUfoCatcherAttempt({
        settings: standard.settings,
        prizes: layout,
        input: { xHoldMs, yHoldMs },
        gripRoll: 0,
      })?.outcome,
    ).toBe('miss')
  })
})

describe('UFO Catcher registration and validation', () => {
  test('registers one zero-required-win game route with its own Explore icon', () => {
    const authored = allGames.filter((game) => game.gameType === 'ufo-catcher')
    expect(authored).toHaveLength(1)
    expect(authored.every((game) => getRequiredResearchWins(game) === 0)).toBe(
      true,
    )
    expect(getGameActivityRoute('ufo-catcher')).toBe('/game/games/ufo-catcher')

    const exploreItem = {
      id: standard.id,
      type: 'game',
      originalData: standard,
    } as any
    expect(getGameTypeLabel(exploreItem)).toBe('UFO CATCHER')
    expect(renderToStaticMarkup(getTypeIcon(exploreItem))).toContain(
      'lucide-joystick',
    )
  })

  test('validates the authored machine and rejects currency prizes', () => {
    expect(validateGameItem(standard).success).toBe(true)

    const invalid = structuredClone(standard)
    ;(invalid.settings.tiers[0] as any).rewards = [
      {
        type: 'currency',
        targetId: 'fun-tokens',
        quantity: 100,
        dropChance: 100,
      },
    ]
    const result = validateGameItem(invalid)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.message)).toContain(
        'UFO Catcher prizes must award items or profile unlocks only',
      )
    }
  })

  test('rejects duplicate anchors and anchors outside the claw bounds', () => {
    const duplicate = structuredClone(standard)
    duplicate.settings.board.anchors[1].id =
      duplicate.settings.board.anchors[0].id
    expect(validateGameItem(duplicate).success).toBe(false)

    const outside = structuredClone(standard)
    outside.settings.board.anchors[0].x = 0
    const result = validateGameItem(outside)
    expect(result.success).toBe(false)
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.message)).toContain(
        'UFO Catcher anchor must fit inside the claw bounds',
      )
    }
  })
})
