import { describe, expect, test } from 'bun:test'
import type { Reward } from '@/data/types'
import type { TaskCondition } from '@/data/tasks'
import { battles } from '@/data/battles'
import { locations } from '@/data/locations'
import { allGames } from '@/data/games'
import {
  fieldObservationGlobalItemEvents,
  fieldObservationGlobalPokemonEvents,
} from '@/data/games/field-observation/global-events'
import { shops } from '@/data/shops'
import { tasks } from '@/data/tasks'
import { voyages } from '@/data/voyages'
import { expeditions } from '@/data/expeditions'
import { artisanRecipes } from '@/data/artisan'
import { items } from '@/data/items/all-items'
import { currencies } from '@/data/currencies'
import { getAllMoves } from '@/data/moves'
import { ABILITIES, rollNaturalFormAbility } from '@/data/abilities'
import { trainerClasses, trainerSprites } from '@/data/trainers'
import { icons } from '@/data/user/icons'
import { KANTO_TRAINER_BASE_PAYOUTS } from '@/data/battles/trainer-payouts'
import { globalFishingItemPools } from '@/data/games/fishing/item-pools'
import type { FishingGameConfig } from '@/data/games/fishing/types'
import { subCategories } from '@/data/sub-region-map'
import { ALL_MOVE_DEX_ENTRIES } from '@/utilities/pokemon/movedex'
import pokemonResearchLevelRewards from '@/data/pokemon-research-level-rewards.json'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import { existsSync } from 'node:fs'
import path from 'node:path'

const exploreItems = [
  ...battles.map((entry) => ({ ...entry, kind: 'battle' })),
  ...locations.map((entry) => ({ ...entry, kind: 'location' })),
  ...allGames.map((entry) => ({ ...entry, kind: 'research' })),
  ...shops.map((entry) => ({ ...entry, kind: 'shop' })),
  ...tasks.map((entry) => ({ ...entry, kind: 'task' })),
  ...voyages.map((entry) => ({ ...entry, kind: 'voyage' })),
  ...expeditions.map((entry) => ({ ...entry, kind: 'expedition' })),
]

const ids = {
  allExplore: new Set(exploreItems.map((entry) => entry.id)),
  battle: new Set(battles.map((entry) => entry.id)),
  location: new Set(locations.map((entry) => entry.id)),
  research: new Set(allGames.map((entry) => entry.id)),
  task: new Set(tasks.map((entry) => entry.id)),
  expedition: new Set(expeditions.map((entry) => entry.id)),
  item: new Set(items.map((entry) => entry.id)),
  currency: new Set(currencies.map((entry) => entry.id)),
  move: new Set(getAllMoves().map((entry) => entry.id)),
}

const knownUnresolvedReferences = new Set<string>([])

test('catch locations do not author static crystal rewards', () => {
  const staticCrystalLocations = locations
    .filter((location) =>
      (location.rewards || []).some(
        (reward) =>
          reward.type === 'currency' && reward.targetId === 'crystals',
      ),
    )
    .map((location) => location.id)

  expect(staticCrystalLocations).toEqual([])
})

const eachCondition = (
  callback: (
    condition: TaskCondition,
    owner: { id: string; kind: string },
  ) => void,
) => {
  const visitCondition = (
    condition: TaskCondition,
    owner: { id: string; kind: string },
  ) => {
    callback(condition, owner)
    for (const nestedCondition of condition.conditions || []) {
      visitCondition(nestedCondition, {
        id: `${owner.id}.${condition.type}`,
        kind: owner.kind,
      })
    }
  }

  for (const entry of exploreItems) {
    for (const condition of [
      ...(entry.requirements || []),
      ...((entry as any).criteria || []),
    ]) {
      visitCondition(condition, { id: entry.id, kind: entry.kind })
    }

    if (entry.kind === 'location') {
      for (const encounter of (entry as any).encounters || []) {
        for (const condition of encounter.requirements || []) {
          visitCondition(condition, {
            id: `${entry.id}.encounter.${encounter.speciesId}`,
            kind: 'location-encounter',
          })
        }
      }
    }
  }

  for (const shop of shops) {
    for (const item of shop.items) {
      for (const condition of item.requirements || []) {
        visitCondition(condition, {
          id: `${shop.id}.${item.id}`,
          kind: 'shop-item',
        })
      }
    }
  }
}

const eachReward = (
  callback: (reward: Reward, owner: { id: string; kind: string }) => void,
) => {
  for (const entry of exploreItems) {
    for (const reward of (entry as any).rewards || []) {
      callback(reward, { id: entry.id, kind: entry.kind })
    }

    const endless = (entry as any).settings?.endless
    for (const milestone of endless?.milestones || []) {
      for (const reward of milestone.rewards || []) {
        callback(reward, {
          id: `${entry.id}.milestone.${milestone.score}`,
          kind: entry.kind,
        })
      }
    }
    for (const repeatingReward of endless?.repeatingRewards || []) {
      for (const reward of repeatingReward.rewards || []) {
        callback(reward, {
          id: `${entry.id}.every.${repeatingReward.everyScore}`,
          kind: entry.kind,
        })
      }
    }

    for (const prize of (entry as any).settings?.prizes || []) {
      callback(prize.reward || { type: 'item', targetId: prize.itemId }, {
        id: `${entry.id}.prize.${prize.id || `${prize.x},${prize.y}`}`,
        kind: entry.kind,
      })
    }
    for (const screen of (entry as any).settings?.screens || []) {
      for (const prize of screen.prizes || []) {
        callback(prize.reward || { type: 'item', targetId: prize.itemId }, {
          id: `${entry.id}.${screen.id}.prize.${prize.id || `${prize.x},${prize.y}`}`,
          kind: entry.kind,
        })
      }
    }

    for (const itemDrop of (entry as any).settings?.itemDrops || []) {
      callback(
        { type: 'item', targetId: itemDrop.itemId },
        {
          id: `${entry.id}.itemDrop.${itemDrop.id}`,
          kind: entry.kind,
        },
      )
    }
  }

  for (const shop of shops) {
    for (const item of shop.items) {
      for (const reward of item.rewards || []) {
        callback(reward, { id: `${shop.id}.${item.id}`, kind: 'shop-item' })
      }
    }
  }
}

describe('static data references', () => {
  test('ids are unique within each content type', () => {
    const duplicateIds = exploreItems
      .map((entry) => `${entry.kind}:${entry.id}`)
      .filter((id, index, all) => all.indexOf(id) !== index)

    expect([...new Set(duplicateIds)].sort()).toEqual([])
  })

  test('hide and override references point to explore-facing content', () => {
    const broken = exploreItems
      .flatMap((entry) => [
        entry.hide && !ids.allExplore.has(entry.hide)
          ? { id: entry.id, field: 'hide', targetId: entry.hide }
          : null,
        (entry as any).overrides &&
        !ids.allExplore.has((entry as any).overrides)
          ? {
              id: entry.id,
              field: 'overrides',
              targetId: (entry as any).overrides,
            }
          : null,
      ])
      .filter(Boolean)

    expect(broken).toEqual([])
  })

  test('requirement targets resolve for typed static references', () => {
    const broken: Array<{ owner: string; type: string; targetId: unknown }> = []

    eachCondition((condition, owner) => {
      const targetIds = Array.isArray(condition.targetId)
        ? condition.targetId
        : condition.targetId !== undefined
          ? [condition.targetId]
          : []

      for (const targetId of targetIds) {
        const target = String(targetId)
        const expectedSet =
          condition.type === 'item_owned'
            ? ids.item
            : condition.type === 'currency_owned'
              ? ids.currency
              : condition.type === 'task_completed'
                ? ids.task
                : condition.type === 'daily_not_completed'
                  ? ids.allExplore
                  : condition.type === 'battle_result'
                    ? ids.battle
                    : condition.type === 'location_encounter_result'
                      ? ids.location
                      : condition.type === 'research_encounter_result'
                        ? ids.research
                        : condition.type === 'expedition_result'
                          ? ids.expedition
                          : null

        const referenceKey = `${owner.kind}:${owner.id}:${condition.type}:${target}`
        if (
          expectedSet &&
          !expectedSet.has(target) &&
          !knownUnresolvedReferences.has(referenceKey)
        ) {
          broken.push({
            owner: `${owner.kind}:${owner.id}`,
            type: condition.type,
            targetId,
          })
        }
      }
    })

    expect(broken).toEqual([])
  })

  test('reward targets resolve for item, currency, and task rewards', () => {
    const broken: Array<{ owner: string; type: string; targetId: unknown }> = []

    eachReward((reward, owner) => {
      if (reward.targetId === undefined) return

      const target = String(reward.targetId)
      const expectedSet =
        reward.type === 'item'
          ? ids.item
          : reward.type === 'currency'
            ? ids.currency
            : reward.type === 'task_complete'
              ? ids.task
              : null

      if (expectedSet && !expectedSet.has(target)) {
        broken.push({
          owner: `${owner.kind}:${owner.id}`,
          type: reward.type,
          targetId: reward.targetId,
        })
      }
    })

    expect(broken).toEqual([])
  })

  test('task Pokemon rewards always resolve an ability', () => {
    const missingAbilities: string[] = []
    const invalidExplicitAbilities: string[] = []

    for (const task of tasks) {
      for (const reward of task.rewards || []) {
        if (reward.type !== 'pokemon') continue

        const formId = reward.pokemonData?.formId || String(reward.targetId)
        const explicitAbility = reward.pokemonData?.ability

        if (explicitAbility) {
          if (!ABILITIES[explicitAbility]) {
            invalidExplicitAbilities.push(`${task.id}:${explicitAbility}`)
          }
          continue
        }

        if (!rollNaturalFormAbility(formId, () => 0.999999)) {
          missingAbilities.push(`${task.id}:${formId}`)
        }
      }
    }

    expect(invalidExplicitAbilities).toEqual([])
    expect(missingAbilities).toEqual([])
  })

  test('authored recipe unlock drops are not marked secret', () => {
    const secretRecipeDrops: Array<{
      owner: string
      targetId: string
    }> = []

    eachReward((reward, owner) => {
      if (
        reward.type === 'task_complete' &&
        typeof reward.targetId === 'string' &&
        reward.targetId.endsWith('-recipe') &&
        reward.secret === true
      ) {
        secretRecipeDrops.push({
          owner: `${owner.kind}:${owner.id}`,
          targetId: reward.targetId,
        })
      }
    })

    expect(secretRecipeDrops).toEqual([])
  })

  test('Pokemon Research level item rewards reference valid forms and items', () => {
    const broken: Array<{
      index: number
      field: string
      value: unknown
    }> = []

    ;(
      pokemonResearchLevelRewards as Array<{
        formId?: unknown
        level?: unknown
        itemId?: unknown
        quantity?: unknown
      }>
    ).forEach((reward, index) => {
      if (typeof reward.formId !== 'string' || !getPokemonForm(reward.formId)) {
        broken.push({ index, field: 'formId', value: reward.formId })
      }

      if (
        typeof reward.level !== 'number' ||
        reward.level < 1 ||
        reward.level > 5 ||
        !Number.isInteger(reward.level)
      ) {
        broken.push({ index, field: 'level', value: reward.level })
      }

      if (typeof reward.itemId !== 'string' || !ids.item.has(reward.itemId)) {
        broken.push({ index, field: 'itemId', value: reward.itemId })
      }

      if (
        reward.quantity !== undefined &&
        (typeof reward.quantity !== 'number' ||
          reward.quantity < 1 ||
          !Number.isInteger(reward.quantity))
      ) {
        broken.push({ index, field: 'quantity', value: reward.quantity })
      }
    })

    expect(broken).toEqual([])
  })

  test('trainer classes resolve sprites and payout modifiers', () => {
    const duplicateTrainerClassIds = trainerClasses
      .map((trainerClass) => trainerClass.id)
      .filter((id, index, all) => all.indexOf(id) !== index)

    expect([...new Set(duplicateTrainerClassIds)].sort()).toEqual([])

    const duplicateTrainerSpriteIds = trainerSprites
      .map((trainerSprite) => trainerSprite.id)
      .filter((id, index, all) => all.indexOf(id) !== index)
    expect([...new Set(duplicateTrainerSpriteIds)].sort()).toEqual([])

    for (const trainerClass of trainerClasses) {
      expect(trainerClass.name.length).toBeGreaterThan(0)
      expect(['m', 'f']).toContain(trainerClass.gender)
      expect(trainerClass.payoutModifier).toBeGreaterThan(0)
      expect(
        KANTO_TRAINER_BASE_PAYOUTS[
          trainerClass.id as keyof typeof KANTO_TRAINER_BASE_PAYOUTS
        ],
      ).toBe(trainerClass.payoutModifier)
      expect(
        existsSync(
          path.join(
            process.cwd(),
            'public',
            trainerClass.spriteId.replace(/^\//, ''),
          ),
        ),
      ).toBe(true)
    }

    for (const trainerSprite of trainerSprites) {
      expect(trainerSprite.name.length).toBeGreaterThan(0)
      expect(['m', 'f']).toContain(trainerSprite.gender)
      expect(
        existsSync(
          path.join(
            process.cwd(),
            'public',
            trainerSprite.spriteId.replace(/^\//, ''),
          ),
        ),
      ).toBe(true)
    }
  })

  test('trainer icons and battle trainer classes resolve to trainer config', () => {
    const trainerClassIds = new Set(
      trainerClasses.map((trainerClass) => trainerClass.id),
    )
    const trainerSpriteIds = new Set(
      trainerSprites.map((trainerSprite) => trainerSprite.id),
    )
    const broken: Array<{ owner: string; field: string; targetId: unknown }> =
      []

    const checkIcon = (icon: any, owner: string, field: string) => {
      if (icon?.type !== 'trainer') return
      if (!trainerSpriteIds.has(icon.id))
        broken.push({ owner, field, targetId: icon.id })
    }

    for (const entry of exploreItems) {
      checkIcon((entry as any).icon, `${entry.kind}:${entry.id}`, 'icon')
      checkIcon(
        (entry as any).exitModal?.icon,
        `${entry.kind}:${entry.id}`,
        'exitModal.icon',
      )
      checkIcon(
        (entry as any).enterModal?.icon,
        `${entry.kind}:${entry.id}`,
        'enterModal.icon',
      )

      if (entry.kind === 'battle') {
        const battle = entry as any
        if (
          battle.trainerClassId &&
          !trainerClassIds.has(battle.trainerClassId)
        ) {
          broken.push({
            owner: `battle:${battle.id}`,
            field: 'trainerClassId',
            targetId: battle.trainerClassId,
          })
        }
      }
    }

    expect(broken).toEqual([])
  })

  test('expedition path activities resolve to authored content', () => {
    const broken: Array<{
      expeditionId: string
      stepId: string
      activityType: unknown
      activityId: unknown
    }> = []

    const expectedSets = {
      battle: ids.battle,
      location: ids.location,
      research: ids.research,
      task: ids.task,
    } as const

    const checkNodes = (expeditionId: string, nodes: any[]) => {
      for (const node of nodes) {
        if (node.type === 'branch') {
          for (const branch of node.branches || []) {
            checkNodes(expeditionId, branch.nodes || [])
          }
          continue
        }

        if (node.type === 'result_branch') {
          for (const result of node.results || []) {
            checkNodes(expeditionId, result.nodes || [])
          }
          continue
        }

        if (!node.activityId || !node.activityType) continue

        const expectedSet =
          expectedSets[node.activityType as keyof typeof expectedSets]
        if (!expectedSet?.has(String(node.activityId))) {
          broken.push({
            expeditionId,
            stepId: node.id,
            activityType: node.activityType,
            activityId: node.activityId,
          })
        }
      }
    }

    for (const expedition of expeditions) {
      checkNodes(expedition.id, expedition.path || [])
    }

    expect(broken).toEqual([])
  })

  test('chronicle expedition loadouts reference authored content', () => {
    const broken: Array<{
      expeditionId: string
      field: string
      targetId: unknown
    }> = []

    for (const expedition of expeditions) {
      const chronicle =
        typeof expedition.chronicle === 'object' ? expedition.chronicle : null
      if (!chronicle) continue

      for (const itemId of [
        ...Object.keys(chronicle.battleItems || {}),
        ...Object.keys(chronicle.balls || {}),
      ]) {
        if (!ids.item.has(itemId)) {
          broken.push({
            expeditionId: expedition.id,
            field: 'chronicle.item',
            targetId: itemId,
          })
        }
      }

      for (const pokemon of chronicle.battleTeam || []) {
        for (const moveId of pokemon.assignedMoves || []) {
          if (!ids.move.has(moveId)) {
            broken.push({
              expeditionId: expedition.id,
              field: 'chronicle.move',
              targetId: moveId,
            })
          }
        }
      }
    }

    expect(broken).toEqual([])
  })

  test('Pallet post-orientation path choices wait for the Professor friend chain', () => {
    const getTaskRequirementTargets = (taskId: string) => {
      const task = tasks.find((entry) => entry.id === taskId)
      expect(task).toBeDefined()
      return (task?.requirements || [])
        .filter((condition) => condition.type === 'task_completed')
        .map((condition) => condition.targetId)
    }

    expect(
      getTaskRequirementTargets('pallet-artisan-soft-touch-briefing'),
    ).toContain('tutorial-16')
    expect(getTaskRequirementTargets('pallet-artisan-basics')).toContain(
      'pallet-artisan-soft-touch-briefing',
    )
    expect(getTaskRequirementTargets('tutorial-7')).toContain(
      'pallet-artisan-basics',
    )
    expect(getTaskRequirementTargets('tutorial-8')).toContain('tutorial-7')
    expect(getTaskRequirementTargets('tutorial-9')).toContain('tutorial-8')
    expect(getTaskRequirementTargets('tutorial-10')).toContain('tutorial-9')

    for (const taskId of [
      'explore-1',
      'researcher-life-1',
      'champions-path-1',
    ]) {
      expect(getTaskRequirementTargets(taskId)).toContain('tutorial-15')
      expect(getTaskRequirementTargets(taskId)).not.toContain('tutorial-16')
      expect(getTaskRequirementTargets(taskId)).not.toContain('tutorial-9')
    }
  })

  test('Pallet orientation expedition steps avoid bootstrap XP and duplicate escape rope rewards', () => {
    const orientationActivityIds = new Set([
      'pallet-orientation-professor-briefing',
      'pallet-orientation-cry',
      'pallet-orientation-battle-briefing',
      'pallet-orientation-lab-rattata',
      'pallet-orientation-field-briefing',
      'pallet-orientation-field-observation',
      'pallet-orientation-route-1',
      'pallet-orientation-rival-selection',
      'pallet-orientation-wrap-up',
    ])
    const broken: Array<{ id: string; reward: Reward }> = []

    for (const entry of [...exploreItems, ...artisanRecipes]) {
      if (!orientationActivityIds.has(entry.id)) continue

      for (const reward of ((entry as any).rewards || []) as Reward[]) {
        if (
          reward.type === 'xp' ||
          (reward.type === 'item' && reward.targetId === 'escape-rope')
        ) {
          broken.push({ id: entry.id, reward })
        }
      }
    }

    expect(broken).toEqual([])
  })

  test('early Pallet bootstrap item bundles stay small', () => {
    const getItemReward = (taskId: string, itemId: string) => {
      const task = tasks.find((entry) => entry.id === taskId)
      expect(task).toBeDefined()
      return (task?.rewards || []).find(
        (reward) => reward.type === 'item' && reward.targetId === itemId,
      )
    }

    expect(
      getItemReward('pallet-orientation-field-briefing', 'poke-ball')?.quantity,
    ).toBe(5)
    expect(getItemReward('tutorial-12', 'battle-observer')?.quantity).toBe(5)
    expect(getItemReward('tutorial-6', 'poke-ball')?.quantity).toBe(5)
  })

  test('move-granting items reference authored moves', () => {
    const broken = items
      .filter((item) => item.moveId)
      .filter((item) => !ids.move.has(item.moveId!))
      .map((item) => ({ itemId: item.id, moveId: item.moveId }))

    expect(broken).toEqual([])
  })

  test('fishing item pools reference authored items', () => {
    const broken: Array<{ owner: string; itemId: string }> = []

    for (const [rodType, pool] of Object.entries(globalFishingItemPools)) {
      for (const entry of pool) {
        if (!ids.item.has(entry.itemId)) {
          broken.push({ owner: `global:${rodType}`, itemId: entry.itemId })
        }
      }
    }

    for (const game of allGames) {
      if (game.gameType !== 'fishing') continue

      const fishingGame = game as FishingGameConfig
      for (const [rodType, rodConfig] of Object.entries(
        fishingGame.settings.rods,
      )) {
        for (const entry of rodConfig?.items?.entries || []) {
          if (!ids.item.has(entry.itemId)) {
            broken.push({
              owner: `${game.id}:${rodType}`,
              itemId: entry.itemId,
            })
          }
        }
      }
    }

    expect(broken).toEqual([])
  })

  test('inventory start item effects reference authored activities', () => {
    const broken: Array<{ itemId: string; effect: string; targetId: string }> = []

    for (const item of items) {
      if (item.effects?.startBattle && !ids.battle.has(item.effects.startBattle.id)) {
        broken.push({
          itemId: item.id,
          effect: 'startBattle',
          targetId: item.effects.startBattle.id,
        })
      }
      if (item.effects?.startEncounter && !ids.location.has(item.effects.startEncounter.id)) {
        broken.push({
          itemId: item.id,
          effect: 'startEncounter',
          targetId: item.effects.startEncounter.id,
        })
      }
      if (item.effects?.startResearch && !ids.research.has(item.effects.startResearch.id)) {
        broken.push({
          itemId: item.id,
          effect: 'startResearch',
          targetId: item.effects.startResearch.id,
        })
      }
      if (item.effects?.startMinigame && !ids.research.has(item.effects.startMinigame.id)) {
        broken.push({
          itemId: item.id,
          effect: 'startMinigame',
          targetId: item.effects.startMinigame.id,
        })
      }
    }

    expect(broken).toEqual([])
  })

  test('global fishing item pools include water materials alongside gems', () => {
    expect(globalFishingItemPools.old.map((entry) => entry.itemId)).toEqual(
      expect.arrayContaining(['water-gem', 'aqua-solvent-t1']),
    )
    expect(
      globalFishingItemPools.old.map((entry) => entry.itemId),
    ).not.toContain('aqua-solvent-t2')

    expect(globalFishingItemPools.good.map((entry) => entry.itemId)).toEqual(
      expect.arrayContaining(['water-gem', 'aqua-solvent-t1']),
    )
    expect(
      globalFishingItemPools.good.map((entry) => entry.itemId),
    ).not.toContain('shining-water-gem')
    expect(
      globalFishingItemPools.good.map((entry) => entry.itemId),
    ).not.toContain('pristine-water-gem')
    expect(
      globalFishingItemPools.good.map((entry) => entry.itemId),
    ).not.toContain('aqua-solvent-t2')
    expect(
      globalFishingItemPools.good.map((entry) => entry.itemId),
    ).not.toContain('aqua-solvent-t3')

    expect(globalFishingItemPools.super.map((entry) => entry.itemId)).toEqual(
      expect.arrayContaining(['water-gem', 'aqua-solvent-t1']),
    )
    expect(
      globalFishingItemPools.super.map((entry) => entry.itemId),
    ).not.toContain('shining-water-gem')
    expect(
      globalFishingItemPools.super.map((entry) => entry.itemId),
    ).not.toContain('pristine-water-gem')
    expect(
      globalFishingItemPools.super.map((entry) => entry.itemId),
    ).not.toContain('aqua-solvent-t2')
    expect(
      globalFishingItemPools.super.map((entry) => entry.itemId),
    ).not.toContain('aqua-solvent-t3')
  })

  test('trainer battles do not author manual candy rewards', () => {
    const candyRewardOwners = battles
      .filter((battle) => !battle.isWildBattle)
      .filter((battle) =>
        battle.rewards.some(
          (reward) =>
            reward.type === 'item' &&
            String(reward.targetId).startsWith('rare-candy-'),
        ),
      )
      .map((battle) => battle.id)

    expect(candyRewardOwners).toEqual([])
  })

  test('Route 11 trainer battles use trainer payouts without manual candy rewards', () => {
    const route11TrainerBattles = battles.filter(
      (battle) => !battle.isWildBattle && battle.id.startsWith('route-11-'),
    )

    expect(route11TrainerBattles.map((battle) => battle.id).sort()).toEqual([
      'route-11-engineer-bernie',
      'route-11-engineer-braxton',
      'route-11-gamer-darian',
      'route-11-gamer-dirk',
      'route-11-gamer-hugo',
      'route-11-gamer-jasper',
      'route-11-youngster-dave',
      'route-11-youngster-dillon',
      'route-11-youngster-eddie',
      'route-11-youngster-yasu',
    ])

    expect(
      route11TrainerBattles.flatMap((battle) =>
        battle.rewards.filter(
          (reward) =>
            reward.type === 'item' &&
            String(reward.targetId).startsWith('rare-candy-'),
        ),
      ),
    ).toEqual([])
  })

  test('Route 11 trainer battles cap player Pokemon at level 25', () => {
    const route11TrainerBattles = battles.filter(
      (battle) => !battle.isWildBattle && battle.id.startsWith('route-11-'),
    )

    expect(route11TrainerBattles.length).toBeGreaterThan(0)
    expect(
      route11TrainerBattles.map((battle) => [battle.id, battle.levelCap]),
    ).toEqual(route11TrainerBattles.map((battle) => [battle.id, 25]))
  })

  test('Route 11 Vermilion side tasks use criteria for their Route 11 progress gates', () => {
    const researcherTask = tasks.find(
      (task) => task.id === 'route-11-researcher-itemfinder',
    )
    const nidoTask = tasks.find((task) => task.id === 'nido-stories-route-11')
    const vermilionVisibilityRequirement: TaskCondition = {
      type: 'task_completed',
      targetId: 'explore-vermilion-city',
    }
    const redundantSsAnneCriterion: TaskCondition = {
      type: 'expedition_result',
      targetId: 'ss-anne-repair-duty',
      expeditionStatus: 'completed',
      count: 1,
    }
    const sharedRoute11Criteria: TaskCondition[] = [
      {
        type: 'battle_result',
        targetId: 'route-11-battle',
        battleStatus: 'win',
        count: 10,
      },
      {
        type: 'location_encounter_result',
        targetId: 'route-11',
        count: 3,
      },
    ]

    expect(researcherTask?.requirements).toEqual([
      vermilionVisibilityRequirement,
    ])
    expect(nidoTask?.requirements).toEqual([vermilionVisibilityRequirement])
    expect(researcherTask?.requirements).not.toContainEqual(
      redundantSsAnneCriterion,
    )
    expect(nidoTask?.requirements).not.toContainEqual(redundantSsAnneCriterion)
    expect(researcherTask?.criteria).not.toContainEqual(
      redundantSsAnneCriterion,
    )
    expect(nidoTask?.criteria).not.toContainEqual(redundantSsAnneCriterion)
    for (const criterion of sharedRoute11Criteria) {
      expect(researcherTask?.criteria).toContainEqual(criterion)
      expect(nidoTask?.criteria).toContainEqual(criterion)
    }
    expect(researcherTask?.criteria).toContainEqual({
      type: 'user_level',
      targetId: 'researching',
      count: 12,
    })
    expect(nidoTask?.criteria).toContainEqual({
      type: 'skill_level',
      targetId: 'researching',
      count: 15,
    })
  })

  test('special and starter TMs are developed through Pokemon Research rewards', () => {
    const route11Location = locations.find(
      (location) => location.id === 'route-11',
    )
    const route11Battle = battles.find(
      (battle) => battle.id === 'route-11-battle',
    )
    const route11Study = allGames.find(
      (game) => game.id === 'route-11-field-observation',
    )
    const squirtleCove = locations.find(
      (location) => location.id === 'vermilion-squirtle-cove',
    )
    const charmanderDen = locations.find(
      (location) => location.id === 'charmander-den',
    )
    const secretGarden = locations.find(
      (location) => location.id === 'viridian-secret-garden',
    )
    const route3Location = locations.find(
      (location) => location.id === 'route-3',
    )
    const route3Battle = battles.find(
      (battle) => battle.id === 'route-3-battle',
    )
    const route3Study = allGames.find(
      (game) => game.id === 'route-3-field-observation',
    )

    const grassStarterTmIds = [
      'tm-vine-whip',
      'tm-leafage',
      'tm-absorb',
      'tm-razor-leaf',
    ]
    const fireStarterTmIds = ['tm-ember', 'tm-flame-charge', 'tm-fire-spin']
    const waterStarterTmIds = ['tm-water-gun', 'tm-bubble', 'tm-whirlpool']
    const starterTmIds = [
      ...grassStarterTmIds,
      ...fireStarterTmIds,
      ...waterStarterTmIds,
    ]

    for (const tmId of starterTmIds) {
      expect(
        secretGarden?.rewards.map((reward) => reward.targetId),
      ).not.toContain(tmId)
      expect(
        charmanderDen?.rewards.map((reward) => reward.targetId),
      ).not.toContain(tmId)
      expect(
        squirtleCove?.rewards.map((reward) => reward.targetId),
      ).not.toContain(tmId)
    }

    const rewardKeys = new Set(
      pokemonResearchLevelRewards.map(
        (reward) => `${reward.formId}:${reward.level}:${reward.itemId}`,
      ),
    )
    const rewardKeyList = Array.from(rewardKeys)

    expect(rewardKeyList).toEqual(
      expect.not.arrayContaining([
        '1:1:tm-ember',
        '7:1:tm-ember',
        '4:1:tm-water-gun',
        '1:1:tm-water-gun',
        '4:1:tm-vine-whip',
        '7:1:tm-vine-whip',
      ]),
    )
    expect(rewardKeyList).toEqual(
      expect.arrayContaining([
        '1:1:tm-vine-whip',
        '4:1:tm-ember',
        '7:1:tm-water-gun',
        '255:1:tm-ember',
        '258:1:tm-water-gun',
      ]),
    )

    for (const source of [route11Location, route11Battle]) {
      expect(source?.rewards.map((reward) => reward.targetId)).not.toContain(
        'tm-leek-spin',
      )
    }
    expect(
      route11Study?.settings.itemDrops?.map((drop) => drop.itemId),
    ).not.toContain('tm-leek-spin')
    expect(pokemonResearchLevelRewards).toContainEqual({
      formId: '83',
      level: 2,
      itemId: 'tm-leek-spin',
    })

    for (const source of [route3Location, route3Battle]) {
      expect(source?.rewards.map((reward) => reward.targetId)).not.toContain(
        'tm-sing',
      )
    }
    expect(
      route3Study?.settings.itemDrops?.map((drop) => drop.itemId),
    ).not.toContain('tm-sing')
    expect(pokemonResearchLevelRewards).toContainEqual({
      formId: '39',
      level: 1,
      itemId: 'tm-sing',
    })
  })

  test('MoveDex unknown TM clues point to authored unlock sources', () => {
    const clueByItemId = new Map(
      ALL_MOVE_DEX_ENTRIES.map((entry) => [entry.itemId, entry.unlockClue]),
    )

    expect(clueByItemId.get('tm-water-gun')).toBe(
      'You can develop this TM by researching a first partner Pokemon.',
    )
    expect(clueByItemId.get('tm-vine-whip')).toBe(
      'You can develop this TM by researching a first partner Pokemon.',
    )
    expect(clueByItemId.get('tm-ember')).toBe(
      'You can develop this TM by researching a first partner Pokemon.',
    )
    expect(clueByItemId.get('tm-leek-spin')).toBe(
      'You can develop this TM by researching a Farfetch’d.',
    )
    expect(clueByItemId.get('tm-sing')).toBe(
      'You can develop this TM by researching a Jigglypuff.',
    )
    expect(clueByItemId.get('tm-quick-attack')).toBe(
      'You can develop this TM by researching a Pidgey.',
    )
  })

  test('pre-Brock battle level caps ramp before the Boulder Badge check', () => {
    const expectedCaps = new Map([
      ['rival-pallet-town', 7],
      ['route-1-battle', 7],
      ['battle-grumpy-man', 7],
      ['route-22-battle', 7],
      ['rival-route-22', 8],
      ['viridian-forest-battle', 8],
      ['buggy-4-battle-1', 7],
      ['buggy-4-battle-2', 8],
      ['buggy-4-battle-3', 9],
      ['buggy-4-battle-4', 9],
      ['route-2-battle', 10],
      ['pewter-gym-jerry', 10],
      ['pewter-gym-brock', 15],
    ])

    const authoredCaps = battles
      .filter((battle) => expectedCaps.has(battle.id))
      .map((battle) => [battle.id, battle.levelCap])
      .sort(([a], [b]) => String(a).localeCompare(String(b)))

    expect(authoredCaps).toEqual(
      [...expectedCaps.entries()].sort(([a], [b]) => a.localeCompare(b)),
    )
  })

  test('battle attack warning chances are authored by early-region band', () => {
    expect(
      battles.every(
        (battle) => battle.enemyAttackTelegraphChance !== undefined,
      ),
    ).toBe(true)

    for (const battle of battles) {
      const expected =
        battle.subCategory === 'Pallet Town'
          ? 80
          : battle.subCategory === 'Viridian City'
            ? 50
            : battle.subCategory === 'Viridian Forest'
              ? 30
              : 2

      expect(battle.enemyAttackTelegraphChance, battle.id).toBe(expected)
    }
  })

  test('Pewter School sub-region waits for the school intro chat', () => {
    expect(subCategories['Pewter School']?.unlockRequirements).toEqual([
      { type: 'task_completed', targetId: 'pewter-school-intro' },
    ])
  })

  test('Pewter School pop quiz answers are not always first', () => {
    const answerPositions = tasks
      .filter((task) => task.id.startsWith('pewter-school-pop-quiz-'))
      .sort((a, b) => a.id.localeCompare(b.id, undefined, { numeric: true }))
      .map((task) => {
        const buttons = task.enterModal?.[0]?.buttons || []
        return buttons.findIndex((button) => button.type === 'success')
      })

    expect(answerPositions.length).toBe(12)
    expect(answerPositions.every((position) => position > 0)).toBe(true)
    expect(new Set(answerPositions).size).toBeGreaterThan(1)
  })

  test('S.S. Anne trainer battles cap player Pokemon at level 20', () => {
    const ssAnneTrainerBattles = battles.filter(
      (battle) =>
        battle.id.startsWith('ss-anne-') || battle.id === 'rival-ss-anne',
    )

    expect(ssAnneTrainerBattles.length).toBeGreaterThan(0)
    expect(
      ssAnneTrainerBattles.map((battle) => [battle.id, battle.levelCap]),
    ).toEqual(ssAnneTrainerBattles.map((battle) => [battle.id, 20]))
  })

  test("Captain's Credit shop items are one-time purchases", () => {
    const captainsShop = shops.find(
      (shop) => shop.id === 'ss-anne-captains-shop',
    )
    const oneTimeItemIds = [
      'tm-sea-breeze',
      'title-the-captain',
      'icon-sailor',
      'banner-ss-anne',
    ]

    expect(captainsShop).toBeDefined()
    expect(
      captainsShop!.items
        .filter((item) => oneTimeItemIds.includes(item.id))
        .map((item) => [item.id, item.stock, item.daily || false]),
    ).toEqual(oneTimeItemIds.map((itemId) => [itemId, 1, false]))
  })

  test("Captain's Credit profile rewards use award sprites without changing icon unlocks", () => {
    const captainsShop = shops.find(
      (shop) => shop.id === 'ss-anne-captains-shop',
    )
    const titleReward = captainsShop?.items.find(
      (item) => item.id === 'title-the-captain',
    )
    const iconReward = captainsShop?.items.find(
      (item) => item.id === 'icon-sailor',
    )

    expect(titleReward?.icon).toEqual({
      type: 'local',
      id: '/sprites/items/certificate.avif',
    })
    expect(iconReward?.icon).toEqual({ type: 'trainer', id: 'sailor' })
  })

  test('booster pack shop rows use their generated pack item sprites', () => {
    const boosterShopItems = shops.flatMap((shop) =>
      shop.items
        .filter((item) =>
          item.rewards.some(
            (reward) =>
              reward.type === 'item' &&
              String(reward.targetId).startsWith('pack-'),
          ),
        )
        .map((item) => ({
          shopId: shop.id,
          itemId: item.id,
          icon: item.icon,
          packRewardId: String(
            item.rewards.find(
              (reward) =>
                reward.type === 'item' &&
                String(reward.targetId).startsWith('pack-'),
            )?.targetId,
          ),
        })),
    )

    expect(boosterShopItems.length).toBeGreaterThan(0)
    expect(
      boosterShopItems.map(({ shopId, itemId, icon, packRewardId }) => ({
        shopId,
        itemId,
        icon,
        reward: packRewardId,
      })),
    ).toEqual(
      boosterShopItems.map(({ shopId, itemId, packRewardId }) => ({
        shopId,
        itemId,
        icon: { type: 'item', id: packRewardId },
        reward: packRewardId,
      })),
    )
  })

  test('Pallet TCG Maniac sells Base Set packs until Base Set completion', () => {
    const tcgShop = shops.find((shop) => shop.id === 'tcg-shop')
    const baseSetPack = tcgShop?.items.find(
      (item) => item.id === 'base-set-booster',
    )
    const baseSetBox = tcgShop?.items.find(
      (item) => item.id === 'base-set-booster-box',
    )

    expect(tcgShop?.description).toBe('Base Set Booster Packs')
    expect(tcgShop?.requirements).toContainEqual({
      type: 'card_collected_set',
      targetId: 'base1',
      count: 102,
      unique: true,
      inverse: true,
    })
    expect(tcgShop?.items.map((item) => item.id)).toEqual([
      'base-set-booster',
      'base-set-booster-box',
    ])
    expect(baseSetBox?.cost).toContainEqual({
      type: 'currency',
      id: 'crystals',
      amount: (baseSetPack?.cost[0]?.amount || 0) * 30,
    })
    expect(baseSetBox?.rewards).toContainEqual({
      type: 'item',
      targetId: 'pack-base1',
      quantity: 36,
      dropChance: 100,
    })
  })

  test("Captain's Credit shop sells unlimited S Candy", () => {
    const captainsShop = shops.find(
      (shop) => shop.id === 'ss-anne-captains-shop',
    )
    const candy = captainsShop?.items.find((item) => item.id === 'rare-candy-m')

    expect(candy).toBeDefined()
    expect(candy?.stock).toBeUndefined()
    expect(candy?.daily).toBeUndefined()
    expect(candy?.cost).toEqual([
      { type: 'item', id: 'captains-credit', amount: 2 },
    ])
    expect(candy?.rewards).toEqual([
      { type: 'item', targetId: 'rare-candy-m', quantity: 1, dropChance: 100 },
    ])
  })

  test("Captain's Credit shop sells unlimited crystals", () => {
    const captainsShop = shops.find(
      (shop) => shop.id === 'ss-anne-captains-shop',
    )
    const crystals = captainsShop?.items.find(
      (item) => item.id === 'crystals-50',
    )

    expect(crystals).toBeDefined()
    expect(crystals?.stock).toBeUndefined()
    expect(crystals?.daily).toBeUndefined()
    expect(crystals?.cost).toEqual([
      { type: 'item', id: 'captains-credit', amount: 1 },
    ])
    expect(crystals?.rewards).toEqual([
      { type: 'currency', targetId: 'crystals', quantity: 50, dropChance: 100 },
    ])
  })

  test('League Tickets are awarded and exchanged through authored Kanto progression', () => {
    const hasLeagueTicketReward = (
      rewards:
        | Array<{ type?: string; targetId?: unknown; quantity?: unknown }>
        | undefined,
      quantity: number,
    ) =>
      rewards?.some(
        (reward) =>
          reward.type === 'currency' &&
          reward.targetId === 'league-ticket' &&
          reward.quantity === quantity,
      ) ?? false

    const starterTask = tasks.find((task) => task.id === 'tutorial-1')
    const profScripShop = shops.find(
      (shop) => shop.id === 'retro-trainer-cards',
    )
    const exchange = profScripShop?.items.find(
      (item) => item.id === 'league-ticket-exchange',
    )
    const gymBattleIds = ['pewter-gym-brock', 'cerulean-gym-misty']
    const gymDailyIds = ['brock-daily-stones', 'misty-daily-scales']
    const surgeGym = expeditions.find(
      (expedition) => expedition.id === 'vermilion-gym-challenge',
    )
    const surgeDaily = allGames.find(
      (game) => game.id === 'vermilion-gym-voltorb-drill',
    )

    expect(hasLeagueTicketReward(starterTask?.rewards, 10)).toBe(true)
    expect(exchange?.cost).toEqual([
      { type: 'currency', id: 'prof-scrip', amount: 2 },
    ])
    expect(hasLeagueTicketReward(exchange?.rewards, 1)).toBe(true)
    expect(
      gymBattleIds.every((id) =>
        hasLeagueTicketReward(
          battles.find((battle) => battle.id === id)?.rewards,
          10,
        ),
      ),
    ).toBe(true)
    expect(hasLeagueTicketReward(surgeGym?.rewards, 10)).toBe(true)
    expect(
      gymDailyIds.every((id) =>
        hasLeagueTicketReward(tasks.find((task) => task.id === id)?.rewards, 1),
      ),
    ).toBe(true)
    expect(hasLeagueTicketReward(surgeDaily?.rewards, 1)).toBe(true)
  })

  test('S.S. Anne captain and Route 11 engineers use their authored trainer sprites', () => {
    const captainTaskIcons = [
      'ss-anne-captain-seasick',
      'ss-anne-evening-cruise-welcome',
    ].map((taskId) => tasks.find((task) => task.id === taskId))
    const captainThanks = tasks.find(
      (task) => task.id === 'ss-anne-captain-thanks',
    )
    const route11Engineers = [
      'route-11-engineer-bernie',
      'route-11-engineer-braxton',
    ].map((battleId) => battles.find((battle) => battle.id === battleId))
    const engineerClass = trainerClasses.find(
      (entry) => entry.id === 'engineer',
    )

    expect(
      existsSync(
        path.join(process.cwd(), 'public/sprites/trainers/engineer.avif'),
      ),
    ).toBe(true)
    expect(engineerClass?.spriteId).toBe('/sprites/trainers/engineer.avif')
    expect(captainTaskIcons.map((task) => task?.icon)).toEqual(
      captainTaskIcons.map(() => ({ type: 'trainer', id: 'expert-m' })),
    )
    expect(captainThanks?.enterModal?.[0]?.icon).toEqual({
      type: 'trainer',
      id: 'expert-m',
    })
    expect(route11Engineers.map((battle) => battle?.icon)).toEqual(
      route11Engineers.map(() => ({ type: 'trainer', id: 'engineer' })),
    )
  })

  test('Vermilion truck tasks use the bundled truck sprite path', () => {
    const truckTasks = [
      'vermilion-ss-anne-truck',
      'vermilion-troublesome-truck',
    ].map((taskId) => tasks.find((task) => task.id === taskId))
    const truckIconPath = '/sprites/truck.avif'

    expect(
      existsSync(
        path.join(process.cwd(), 'public', truckIconPath.replace(/^\//, '')),
      ),
    ).toBe(true)
    expect(
      truckTasks.map((task) => ({
        id: task?.id,
        icon: task?.icon,
        exitIcon: task?.exitModal?.icon,
      })),
    ).toEqual(
      truckTasks.map((task) => ({
        id: task?.id,
        icon: { type: 'local', id: truckIconPath },
        exitIcon: { type: 'local', id: truckIconPath },
      })),
    )
  })

  test('Lt. Surge Trainer level gate sits on the post-S.S. Anne Gym challenge', () => {
    const chaos = tasks.find((task) => task.id === 'chaos-at-the-coast')
    const shrub = tasks.find((task) => task.id === 'vermilion-gym-shrub')
    const gymChallenge = expeditions.find(
      (expedition) => expedition.id === 'vermilion-gym-challenge',
    )
    const surgeGift = tasks.find(
      (task) => task.id === 'vermilion-gym-tm-reward',
    )
    const engineerBaily = battles.find(
      (battle) => battle.id === 'vermilion-gym-engineer-baily',
    )

    expect(chaos?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'explore-vermilion-city',
    })
    expect(chaos?.criteria).toEqual([])
    expect(shrub?.criteria).toContainEqual({
      type: 'item_owned',
      targetId: 'tm-cut',
    })
    expect(shrub?.criteria).not.toContainEqual({
      type: 'item_owned',
      targetId: 'badge-kanto-thunder',
    })
    expect(gymChallenge?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'vermilion-gym-shrub',
    })
    expect(gymChallenge?.criteria).toEqual([
      { type: 'skill_level', targetId: 'battling', count: 15 },
    ])
    expect(gymChallenge?.rewards).toContainEqual(
      expect.objectContaining({
        type: 'item',
        targetId: 'tm-storm-cloud',
      }),
    )
    expect(gymChallenge?.rewards).not.toContainEqual(
      expect.objectContaining({
        type: 'item',
        targetId: 'tm-thunder-wave',
      }),
    )
    expect(surgeGift?.icon).toEqual({ type: 'item', id: 'tm-storm-cloud' })
    expect(surgeGift?.exitModal?.message).toContain('Storm Cloud')
    expect(engineerBaily?.criteria || []).not.toContainEqual({
      type: 'skill_level',
      targetId: 'battling',
      count: 20,
    })
  })

  test('post-gym Cut blocker tasks require the Thunder Badge', () => {
    const cutBlockerIds = ['route-9-shrub', 'viridian-shrub', 'pewter-shrub']

    for (const taskId of cutBlockerIds) {
      const task = tasks.find((entry) => entry.id === taskId)

      expect(task?.criteria).toContainEqual({
        type: 'item_owned',
        targetId: 'tm-cut',
      })
      expect(task?.criteria).toContainEqual({
        type: 'item_owned',
        targetId: 'badge-kanto-thunder',
      })
    }
  })

  test('post-Thunder Badge Day Care building repairs use bricks, fuel, and strong helpers', () => {
    const planning = tasks.find(
      (entry) => entry.id === 'day-care-planning-next-steps',
    )
    const building = tasks.find(
      (entry) => entry.id === 'day-care-building-repairs',
    )
    const fuel = tasks.find((entry) => entry.id === 'day-care-kiln-fuel')
    const bricks = tasks.find(
      (entry) => entry.id === 'day-care-firing-the-bricks',
    )
    const helpers = tasks.find(
      (entry) => entry.id === 'day-care-heavy-repair-helpers',
    )
    const restored = tasks.find(
      (entry) => entry.id === 'day-care-building-restored',
    )
    const afterChat = tasks.find(
      (entry) => entry.id === 'day-care-planning-after-building',
    )

    expect(planning?.requirements).toContainEqual({
      type: 'item_owned',
      targetId: 'badge-kanto-thunder',
      inverse: true,
    })
    expect(building?.requirements).toEqual(
      expect.arrayContaining([
        { type: 'task_completed', targetId: 'day-care-garden-restored' },
        { type: 'item_owned', targetId: 'badge-kanto-thunder' },
      ]),
    )
    expect(fuel?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'day-care-building-repairs',
    })
    expect(fuel?.criteria).toContainEqual({
      type: 'item_owned',
      targetId: 'wood-scraps-t1',
      count: 20,
      consume: true,
    })
    expect(bricks?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'day-care-kiln-fuel',
    })
    expect(bricks?.criteria).toContainEqual({
      type: 'item_owned',
      targetId: 'day-care-clay-brick',
      count: 100,
      consume: true,
    })
    expect(helpers?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'day-care-firing-the-bricks',
    })
    expect(helpers?.criteria).toContainEqual({
      type: 'pokemon_owned',
      count: 5,
      consume: true,
      pokemonCriteria: { stats: { attack: 40 } },
    })
    expect(restored?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'day-care-heavy-repair-helpers',
    })
    expect(restored?.rewards).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'pokemon',
          targetId: 240,
          quantity: 1,
          pokemonData: expect.objectContaining({ level: 20, formId: '240' }),
        }),
        {
          type: 'item',
          targetId: 'red-berry-candy',
          quantity: 20,
          secret: true,
        },
      ]),
    )
    expect(afterChat?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'day-care-building-restored',
    })
    expect(afterChat?.repeatable).toBe(true)
  })

  test('Celadon-unlocked Day Care helper stage uses clue tasks, helper hand-ins, and baby rewards', () => {
    const intro = tasks.find(
      (entry) => entry.id === 'day-care-celadon-helper-planning',
    )
    const finalTask = tasks.find(
      (entry) => entry.id === 'day-care-celadon-helpers-gathered',
    )
    const afterChat = tasks.find(
      (entry) => entry.id === 'day-care-planning-after-building',
    )

    expect(afterChat?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'underground-path-route-8',
      inverse: true,
    })
    expect(intro?.requirements).toEqual(
      expect.arrayContaining([
        { type: 'task_completed', targetId: 'day-care-building-restored' },
        { type: 'task_completed', targetId: 'underground-path-route-8' },
      ]),
    )

    const helperSteps = [
      {
        clueId: 'day-care-security-helper-clue',
        handInId: 'day-care-security-helper',
        previousId: 'day-care-celadon-helper-planning',
        speciesId: 59,
        babyId: 174,
      },
      {
        clueId: 'day-care-tutor-helper-clue',
        handInId: 'day-care-tutor-helper',
        previousId: 'day-care-celadon-helper-planning',
        speciesId: 65,
        babyId: 433,
      },
      {
        clueId: 'day-care-nurse-helper-clue',
        handInId: 'day-care-nurse-helper',
        previousId: 'day-care-celadon-helper-planning',
        speciesId: 113,
        babyId: 440,
      },
      {
        clueId: 'day-care-playroom-helper-clue',
        handInId: 'day-care-playroom-helper',
        previousId: 'day-care-celadon-helper-planning',
        speciesId: 122,
        babyId: 439,
      },
      {
        clueId: 'day-care-naptime-helper-clue',
        handInId: 'day-care-naptime-helper',
        previousId: 'day-care-celadon-helper-planning',
        speciesId: 97,
        babyId: 238,
      },
    ]

    for (const helper of helperSteps) {
      const clue = tasks.find((entry) => entry.id === helper.clueId)
      const handIn = tasks.find((entry) => entry.id === helper.handInId)

      expect(clue?.requirements).toContainEqual({
        type: 'task_completed',
        targetId: helper.previousId,
      })
      expect(clue?.enterModal?.[0]?.buttons).toContainEqual(
        expect.objectContaining({
          type: 'password',
        }),
      )
      expect(handIn?.requirements).toContainEqual({
        type: 'task_completed',
        targetId: helper.clueId,
      })
      expect(handIn?.criteria).toContainEqual({
        type: 'pokemon_owned',
        targetId: helper.speciesId,
        count: 1,
        consume: true,
      })
      expect(handIn?.rewards).toEqual(
        expect.arrayContaining([
          expect.objectContaining({
            type: 'pokemon',
            targetId: helper.babyId,
            quantity: 1,
            pokemonData: expect.objectContaining({
              level: 15,
              formId: helper.babyId.toString(),
              obtainedMethod: 'gift',
              obtainedRegion: 'Kanto',
              obtainedLocation: 'Cerulean City',
              obtainedSourceId: helper.handInId,
            }),
          }),
        ]),
      )
      expect(finalTask?.requirements).toContainEqual({
        type: 'task_completed',
        targetId: helper.handInId,
      })
    }

    expect(finalTask?.rewards).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'pokemon',
          targetId: 175,
          quantity: 1,
          pokemonData: expect.objectContaining({
            level: 18,
            formId: '175',
            obtainedMethod: 'gift',
            obtainedRegion: 'Kanto',
            obtainedLocation: 'Cerulean City',
            obtainedSourceId: 'day-care-celadon-helpers-gathered',
          }),
        }),
      ]),
    )
  })

  test('A Light in The Dark uses Researcher level instead of Pikachu research level', () => {
    const task = tasks.find((entry) => entry.id === 'a-light-in-the-dark')

    expect(task?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'viridian-shrub',
    })
    expect(task?.criteria).toContainEqual({
      type: 'skill_level',
      targetId: 'researching',
      count: 13,
    })
    expect(task?.criteria).not.toContainEqual({
      type: 'item_owned',
      targetId: 'badge-kanto-thunder',
    })
    expect(task?.criteria).not.toContainEqual({
      type: 'research_level',
      count: 2,
      targetId: '25',
    })
  })

  test('Vermilion City mart sells daily Fresh Berries instead of Super Potion', () => {
    const mart = shops.find((shop) => shop.id === 'vermilion-city-mart')
    const itemIds = mart?.items.map((item) => item.id) || []
    const rewardIds =
      mart?.items.flatMap(
        (item) => item.rewards?.map((reward) => reward.targetId) || [],
      ) || []
    const freshBerries = mart?.items.find((item) => item.id === 'fresh-berries')

    expect(itemIds).not.toContain('super-potion')
    expect(rewardIds).not.toContain('battle-super-potion')
    expect(freshBerries).toBeDefined()
    expect(freshBerries?.name).toBe('Fresh Berries')
    expect(freshBerries?.icon).toEqual({ type: 'item', id: 'oran-berry' })
    expect(freshBerries?.cost).toEqual([
      { type: 'currency', id: 'pokedollars', amount: 500 },
    ])
    expect(freshBerries?.stock).toBe(1)
    expect(freshBerries?.daily).toBe(true)
    expect(freshBerries?.rewards).toEqual([
      { type: 'item', quantity: 3, targetId: 'oran-berry', dropChance: 100 },
    ])
  })

  test('Viridian City mart owns the daily Potion bundle', () => {
    const mart = shops.find((shop) => shop.id === 'viridian-general')
    const potionBundle = mart?.items.find((item) => item.id === 'potion-sale')

    expect(potionBundle).toBeDefined()
    expect(potionBundle?.name).toBe('Potion Bundle Sale')
    expect(potionBundle?.icon).toEqual({ type: 'item', id: 'potion' })
    expect(potionBundle?.cost).toEqual([
      { type: 'currency', id: 'pokedollars', amount: 1800 },
    ])
    expect(potionBundle?.stock).toBe(1)
    expect(potionBundle?.daily).toBe(true)
    expect(potionBundle?.rewards).toEqual([
      { type: 'item', quantity: 5, targetId: 'battle-potion', dropChance: 100 },
    ])
  })

  test('Cerulean City mart sells regular Potions and a daily Escape Rope bundle', () => {
    const mart = shops.find((shop) => shop.id === 'cerulean-city-mart')
    const itemIds = mart?.items.map((item) => item.id) || []
    const potion = mart?.items.find((item) => item.id === 'potion')
    const escapeRope = mart?.items.find(
      (item) => item.id === 'escape-rope-sale',
    )

    expect(itemIds).not.toContain('potion-sale')
    expect(potion).toBeDefined()
    expect(potion?.cost).toEqual([
      { type: 'currency', id: 'pokedollars', amount: 500 },
    ])
    expect(potion?.stock).toBeUndefined()
    expect(potion?.daily).toBeUndefined()
    expect(potion?.rewards).toEqual([
      { type: 'item', quantity: 1, targetId: 'battle-potion', dropChance: 100 },
    ])

    expect(escapeRope).toBeDefined()
    expect(escapeRope?.name).toBe('Escape Rope Bundle')
    expect(escapeRope?.cost).toEqual([
      { type: 'currency', id: 'pokedollars', amount: 2000 },
    ])
    expect(escapeRope?.stock).toBe(1)
    expect(escapeRope?.daily).toBe(true)
    expect(escapeRope?.rewards).toEqual([
      { type: 'item', quantity: 5, targetId: 'escape-rope', dropChance: 100 },
    ])
  })

  test('Cerulean Berry Trade sells a Berry Powder Poke Ball bundle', () => {
    const shop = shops.find((entry) => entry.id === 'cerulean-berry-shop')
    const bundle = shop?.items.find((item) => item.id === 'poke-ball-bundle-bp')

    expect(bundle).toBeDefined()
    expect(bundle?.name).toBe('Poké Ball Bundle')
    expect(bundle?.icon).toEqual({ type: 'item', id: 'poke-ball' })
    expect(bundle?.cost).toEqual([
      { type: 'currency', id: 'berry-powder', amount: 100 },
    ])
    expect(bundle?.stock).toBeUndefined()
    expect(bundle?.daily).toBeUndefined()
    expect(bundle?.rewards).toEqual([
      { type: 'item', quantity: 5, targetId: 'poke-ball', dropChance: 100 },
    ])
  })

  test('Misty Trainer level gate is on the Gym Leader battle instead of the first gym visit', () => {
    const gymIntro = tasks.find((task) => task.id === 'cerulean-gym')
    const mistyBattle = battles.find(
      (battle) => battle.id === 'cerulean-gym-misty',
    )

    expect(gymIntro?.criteria).toEqual([])
    expect(mistyBattle?.criteria).toContainEqual({
      type: 'skill_level',
      targetId: 'battling',
      count: 10,
    })
  })

  test('Kanto marts carry forward permanent stock by plot order', () => {
    const availableRewardIds = (shopId: string) =>
      new Set(
        shops
          .find((shop) => shop.id === shopId)
          ?.items.flatMap((item) =>
            item.rewards.map((reward) => reward.targetId),
          ) || [],
      )

    expect(availableRewardIds('pewter-city-mart')).toEqual(
      new Set(['poke-ball', 'battle-potion', 'antidote', 'escape-rope']),
    )
    expect(availableRewardIds('cerulean-city-mart')).toEqual(
      new Set([
        'poke-ball',
        'battle-potion',
        'antidote',
        'escape-rope',
        'burn-heal',
        'awakening',
        'paralyze-heal',
      ]),
    )
    expect(availableRewardIds('vermilion-city-mart')).toEqual(
      new Set([
        'poke-ball',
        'battle-potion',
        'oran-berry',
        'antidote',
        'escape-rope',
        'burn-heal',
        'ice-heal',
        'awakening',
        'paralyze-heal',
        'repel',
      ]),
    )
    expect(availableRewardIds('lavender-town-mart')).toEqual(
      new Set([
        'poke-ball',
        'great-ball',
        'battle-potion',
        'antidote',
        'escape-rope',
        'burn-heal',
        'ice-heal',
        'awakening',
        'paralyze-heal',
        'repel',
      ]),
    )
  })

  test('Lavender Town mart sells a daily Great Ball bundle instead of Fresh Berries', () => {
    const mart = shops.find((shop) => shop.id === 'lavender-town-mart')
    const itemIds = mart?.items.map((item) => item.id) || []
    const rewardIds =
      mart?.items.flatMap(
        (item) => item.rewards?.map((reward) => reward.targetId) || [],
      ) || []
    const greatBallBundle = mart?.items.find(
      (item) => item.id === 'great-ball-daily-bundle',
    )

    expect(itemIds).not.toContain('fresh-berries')
    expect(rewardIds).not.toContain('oran-berry')
    expect(greatBallBundle).toBeDefined()
    expect(greatBallBundle?.name).toBe('Great Ball Bundle')
    expect(greatBallBundle?.icon).toEqual({ type: 'item', id: 'great-ball' })
    expect(greatBallBundle?.cost).toEqual([
      { type: 'currency', id: 'pokedollars', amount: 3000 },
    ])
    expect(greatBallBundle?.stock).toBe(1)
    expect(greatBallBundle?.daily).toBe(true)
    expect(greatBallBundle?.rewards).toEqual([
      { type: 'item', quantity: 3, targetId: 'great-ball', dropChance: 100 },
    ])
  })

  test("Diglett's Cave unlocks from the sailor warning", () => {
    const sailorWarning = tasks.find(
      (entry) => entry.id === 'vermilion-rumours',
    )
    const diglettSubRegion = subCategories['Digletts Cave']
    const diglettEntries = exploreItems.filter((entry) =>
      [
        'digletts-cave-main',
        'digletts-cave-battle',
        'digletts-cave-field-observation',
        'digletts-cave-rubber-mallet',
        'digletts-cave-mallet-tap',
      ].includes(entry.id),
    )
    const malletTask = tasks.find(
      (entry) => entry.id === 'digletts-cave-rubber-mallet',
    )
    const malletGame = exploreItems.find(
      (entry) => entry.id === 'digletts-cave-mallet-tap',
    )
    const diglettStudy = allGames.find(
      (entry) => entry.id === 'digletts-cave-field-observation',
    )
    const diglettCatch = diglettEntries.find(
      (entry) => entry.id === 'digletts-cave-main',
    )
    const diglettBattle = diglettEntries.find(
      (entry) => entry.id === 'digletts-cave-battle',
    )

    expect(sailorWarning?.name).toBe("Sailor's Warning")
    expect(sailorWarning?.icon).toEqual({
      type: 'trainer',
      id: 'sailor',
    })
    expect(sailorWarning?.exitModal?.message).toContain(
      'Viridian City entrance',
    )
    expect(diglettSubRegion.unlockRequirements).toContainEqual({
      type: 'task_completed',
      targetId: 'vermilion-rumours',
    })
    expect(diglettEntries.map((entry) => entry.id).sort()).toEqual([
      'digletts-cave-battle',
      'digletts-cave-field-observation',
      'digletts-cave-main',
      'digletts-cave-mallet-tap',
      'digletts-cave-rubber-mallet',
    ])

    for (const entry of diglettEntries) {
      expect((entry as any).requirements).toContainEqual({
        type: 'task_completed',
        targetId: 'vermilion-rumours',
      })
    }

    expect(malletTask?.name).toBe('No Way!!!')
    expect(malletTask?.description).toBe("I can't believe my luck!")
    expect(malletTask?.completeButtonText).toBe('Inspect Mallet')
    expect(malletTask?.requirements).toContainEqual({
      type: 'item_owned',
      targetId: 'rubber-mallet',
    })
    expect(malletTask?.rewards).toEqual([])
    expect(malletTask?.exitModal?.message).toBe(
      "I can't believe someone casually left a giant rubber mallet in this cave. How fortuitous!",
    )
    expect((diglettStudy as any)?.settings.itemDrops).toContainEqual({
      id: 'digletts-cave-promo-binder',
      itemId: 'binder-basep',
      dropChance: 5,
      secret: true,
    })
    expect((diglettStudy as any)?.settings.itemDrops).toContainEqual({
      id: 'digletts-cave-rubber-mallet',
      itemId: 'rubber-mallet',
      dropChance: 10,
      requirements: [
        {
          type: 'item_owned',
          targetId: 'rubber-mallet',
          inverse: true,
        },
      ],
    })
    expect((malletGame as any)?.requirements).toContainEqual({
      type: 'item_owned',
      targetId: 'rubber-mallet',
    })
    expect((malletGame as any)?.settings.hazardPokemonId).toBe('95')
    expect((malletGame as any)?.rewards).toEqual([])
    expect((malletGame as any)?.skillXp).toEqual({
      skill: 'researching',
      level: 5,
    })
    expect((diglettCatch as any)?.rewards).toEqual([
      {
        type: 'item',
        targetId: 'binder-basep',
        quantity: 1,
        dropChance: 10,
        secret: true,
      },
      {
        type: 'task_complete',
        targetId: 'coarse-sand-recipe',
        dropChance: 12,
      },
    ])
    expect((diglettBattle as any)?.rewards).toEqual([
      {
        type: 'item',
        targetId: 'binder-basep',
        quantity: 1,
        dropChance: 2,
        secret: true,
      },
    ])
  })

  test('Pewter slow stock task rewards crafting supplies', () => {
    const task = tasks.find((entry) => entry.id === 'pewter-overstock')

    expect(task?.name).toBe('Slow Stock')
    expect(task?.criteria).toEqual([])
    expect(task?.rewards).toEqual([
      { type: 'item', quantity: 2, targetId: 'nut-red' },
      { type: 'item', quantity: 2, targetId: 'nut-purple' },
      { type: 'item', quantity: 5, targetId: 'aqua-solvent-t1' },
      { type: 'item', quantity: 3, targetId: 'broken-ball-t1' },
    ])
  })

  test('Working in the Lab rewards materials instead of Battle Observer drops', () => {
    const labGames = allGames.filter((game) =>
      ['first-research-job', 'first-research-job-ex'].includes(game.id),
    )

    expect(labGames.length).toBe(2)
    for (const game of labGames) {
      const rewardIds = (game.rewards || []).map((reward) => reward.targetId)
      const researchRewards = (game.rewards || []).filter(
        (reward) => reward.type === 'pokemon_research_xp',
      )
      expect(rewardIds).not.toContain('battle-observer')
      expect(rewardIds).toContain('electric-component-t1')
      expect(rewardIds).toContain('metal-scrap-t1')
      expect(researchRewards).toEqual([
        {
          type: 'pokemon_research_xp',
          targetId: '1',
          quantity: 2,
          dropChance: 100,
          requirements: [
            { type: 'research_level', targetId: '1', count: 1, inverse: true },
          ],
        },
        {
          type: 'pokemon_research_xp',
          targetId: '4',
          quantity: 2,
          dropChance: 100,
          requirements: [
            { type: 'research_level', targetId: '4', count: 1, inverse: true },
          ],
        },
        {
          type: 'pokemon_research_xp',
          targetId: '7',
          quantity: 2,
          dropChance: 100,
          requirements: [
            { type: 'research_level', targetId: '7', count: 1, inverse: true },
          ],
        },
      ])
      expect(rewardIds).not.toContain('16')
      expect(rewardIds).not.toContain('19')
      expect(rewardIds).not.toContain('25')
    }
  })

  test('Route 4 and Route 24 local drops avoid manually authored berries', () => {
    const route4Study = allGames.find(
      (game) => game.id === 'route-4-field-observation',
    )
    const route24Study = allGames.find(
      (game) => game.id === 'route-24-field-observation',
    )
    const route4Battle = battles.find(
      (battle) => battle.id === 'route-4-battle',
    )
    const route24Battle = battles.find(
      (battle) => battle.id === 'route-24-battle',
    )

    expect(
      route4Study?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('razz-berry')
    expect(
      route24Study?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('razz-berry')
    expect(route4Study?.settings.itemDrops).toContainEqual({
      id: 'route-4-vital-spirit-ability-patch',
      itemId: 'vital-spirit-ability-patch',
      dropChance: 3,
    })
    expect(
      route4Study?.settings.itemDrops?.map((drop) => drop.itemId),
    ).not.toContain('razz-berry')
    expect(
      route24Study?.settings.itemDrops?.map((drop) => drop.itemId),
    ).not.toContain('tm-thunder-wave')
    expect(
      route24Study?.settings.itemDrops?.map((drop) => drop.itemId),
    ).not.toContain('razz-berry')
    expect(route24Study?.settings.itemDrops).toContainEqual({
      id: 'route-24-charred-wood',
      itemId: 'charred-wood',
      dropChance: 100,
      requirements: [
        {
          type: 'task_completed',
          count: 1,
          targetId: 'charred-hiker',
          secret: false,
        },
        {
          type: 'task_completed',
          targetId: 'growlithe-knows-the-way',
          inverse: true,
        },
      ],
    })
    expect(route24Battle?.rewards).toContainEqual({
      type: 'item',
      quantity: 1,
      targetId: 'charred-wood',
      dropChance: 90,
      requirements: [
        {
          type: 'task_completed',
          count: 1,
          targetId: 'charred-hiker',
          secret: false,
        },
        {
          type: 'task_completed',
          targetId: 'growlithe-knows-the-way',
          inverse: true,
        },
      ],
    })
    expect(
      route4Battle?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('razz-berry')
    expect(route4Battle?.rewards).toContainEqual({
      type: 'item',
      quantity: 1,
      targetId: 'vital-spirit-ability-patch',
      dropChance: 1,
    })
    const route24Location = locations.find(
      (location) => location.id === 'route-24',
    )
    expect(
      route24Location?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('x-sp-def')
    expect(
      route24Location?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('tm-thunder-wave')
    expect(route24Location?.rewards).toContainEqual({
      type: 'item',
      quantity: 1,
      targetId: 'charred-wood',
      dropChance: 100,
      requirements: [
        {
          type: 'task_completed',
          count: 1,
          targetId: 'charred-hiker',
          secret: false,
        },
        {
          type: 'task_completed',
          targetId: 'growlithe-knows-the-way',
          inverse: true,
        },
      ],
    })
    expect(
      route24Battle?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('tm-thunder-wave')
    expect(
      route24Battle?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('razz-berry')
  })

  test('route-style unique drops are available from catch, battle, and field observation', () => {
    const itemById = new Map(items.map((item) => [item.id, item]))
    const fieldObservationOnlyUniqueDrops = new Set(['rubber-mallet'])
    const isUniqueRouteDrop = (itemId: unknown) => {
      if (typeof itemId !== 'string') return false
      if (fieldObservationOnlyUniqueDrops.has(itemId)) return false
      const item = itemById.get(itemId)
      return Boolean(
        item?.unique ||
          item?.category === 'tm' ||
          item?.category === 'ability-patch',
      )
    }
    const rewardIds = (rewards: Reward[] | undefined) =>
      new Set(
        (rewards || [])
          .filter(
            (reward) =>
              reward.type === 'item' && isUniqueRouteDrop(reward.targetId),
          )
          .map((reward) => String(reward.targetId)),
      )
    const itemDropIds = (game: any) =>
      new Set(
        ((game?.settings?.itemDrops || []) as { itemId: string }[])
          .filter((drop) => isUniqueRouteDrop(drop.itemId))
          .map((drop) => drop.itemId),
      )
    const itemDropsById = (game: any) =>
      new Map(
        (
          (game?.settings?.itemDrops || []) as {
            itemId: string
            secret?: boolean
          }[]
        )
          .filter((drop) => isUniqueRouteDrop(drop.itemId))
          .map((drop) => [drop.itemId, drop]),
      )
    const rewardById = (rewards: Reward[] | undefined) =>
      new Map(
        (rewards || [])
          .filter(
            (reward) =>
              reward.type === 'item' && isUniqueRouteDrop(reward.targetId),
          )
          .map((reward) => [String(reward.targetId), reward]),
      )
    const routeKey = (entry: { subCategory?: string; name: string }) =>
      `${entry.subCategory || ''}::${entry.name}`

    const groups = new Map<
      string,
      {
        location?: (typeof locations)[number]
        battle?: (typeof battles)[number]
        research?: any
      }
    >()

    for (const location of locations.filter(
      (entry) => entry.category === 'Kanto',
    )) {
      const key = routeKey(location)
      groups.set(key, { ...groups.get(key), location })
    }
    for (const battle of battles.filter(
      (entry) => entry.category === 'Kanto' && entry.isWildBattle,
    )) {
      const key = routeKey(battle)
      groups.set(key, { ...groups.get(key), battle })
    }
    for (const game of allGames.filter(
      (entry: any) =>
        entry.category === 'Kanto' && entry.gameType === 'field-observation',
    )) {
      const key = routeKey(game)
      groups.set(key, { ...groups.get(key), research: game })
    }

    const mismatches: string[] = []
    for (const [key, group] of groups) {
      if (!group.location || !group.battle || !group.research) continue

      const catchIds = rewardIds(group.location.rewards)
      const battleIds = rewardIds(group.battle.rewards)
      const researchIds = itemDropIds(group.research)
      const catchRewards = rewardById(group.location.rewards)
      const battleRewards = rewardById(group.battle.rewards)
      const researchDrops = itemDropsById(group.research)
      const allDropIds = new Set([...catchIds, ...battleIds, ...researchIds])

      for (const itemId of allDropIds) {
        if (!catchIds.has(itemId))
          mismatches.push(`${key}:${itemId}:missing catch`)
        if (!battleIds.has(itemId))
          mismatches.push(`${key}:${itemId}:missing battle`)
        if (!researchIds.has(itemId))
          mismatches.push(`${key}:${itemId}:missing study bubble`)
        if (
          (catchRewards.get(itemId)?.secret ||
            battleRewards.get(itemId)?.secret) &&
          !researchDrops.get(itemId)?.secret
        ) {
          mismatches.push(`${key}:${itemId}:missing study secret`)
        }
      }
    }

    expect(mismatches).toEqual([])
  })

  test('Charmander side quest resolves and then unlocks Growlithe den access', () => {
    const resolutionTask = tasks.find((task) => task.id === 'charred-hiker-4')
    const shortcutTask = tasks.find(
      (task) => task.id === 'growlithe-knows-the-way',
    )
    const originalDen = locations.find(
      (location) => location.id === 'charmander-den',
    )
    const shortcutDen = locations.find(
      (location) => location.id === 'charmander-den-growlithe',
    )
    const arcanineDen = locations.find(
      (location) => location.id === 'charmander-den-arcanine',
    )

    expect(resolutionTask?.name).toBe('A CHARming Culprit')
    expect(resolutionTask?.requirements).toContainEqual({
      type: 'task_completed',
      count: 1,
      targetId: 'charred-hiker-3',
    })
    expect(resolutionTask?.requirements).toContainEqual({
      type: 'location_encounter_result',
      targetId: 'charmander-den',
      count: 1,
    })
    expect(resolutionTask?.criteria).toEqual([])
    expect(resolutionTask?.rewards).toContainEqual({
      type: 'xp',
      skill: 'catching',
      quantity: 500,
    })
    expect(originalDen?.criteria).toContainEqual({
      type: 'item_owned',
      count: 5,
      targetId: 'charred-wood',
      consume: true,
    })
    expect(originalDen?.requirements).not.toContainEqual({
      type: 'companion',
      companionCheck: { speciesId: 59, formId: '59' },
      inverse: true,
    })
    expect(arcanineDen).toBeUndefined()
    expect(shortcutTask?.requirements).toContainEqual({
      type: 'task_completed',
      count: 1,
      targetId: 'charred-hiker-4',
    })
    expect(shortcutTask?.requirements).toContainEqual({
      type: 'location_encounter_result',
      targetId: 'charmander-den',
      count: 5,
    })
    expect(shortcutDen).toMatchObject({
      name: "Charmander's Den",
      description:
        'Growlithe has made the trip enough times to know the way by heart. No sticks needed.',
      overrides: 'charmander-den',
      encounters: originalDen?.encounters,
      levelRange: originalDen?.levelRange,
    })
    expect(shortcutDen?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'dusty-charcoal-recipe',
      dropChance: 12,
    })
    expect(shortcutDen?.criteria || []).toEqual([])
    expect(shortcutDen?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'growlithe-knows-the-way',
    })
  })

  test('starter side locations lift candy and time gates after five catches', () => {
    const gardenTrustTask = tasks.find(
      (task) => task.id === 'secret-garden-trust',
    )
    const coveRegularTask = tasks.find(
      (task) => task.id === 'squirtle-cove-regular',
    )
    const secretGarden = locations.find(
      (location) => location.id === 'viridian-secret-garden',
    )
    const openSecretGarden = locations.find(
      (location) => location.id === 'viridian-secret-garden-open',
    )
    const squirtleCove = locations.find(
      (location) => location.id === 'vermilion-squirtle-cove',
    )
    const openSquirtleCove = locations.find(
      (location) => location.id === 'vermilion-squirtle-cove-open',
    )

    expect(secretGarden?.criteria).toContainEqual({
      type: 'time_range',
      timeRange: { start: '05:00', end: '09:00' },
    })
    expect(squirtleCove?.criteria).toContainEqual({
      type: 'item_owned',
      targetId: 'green-berry-candy',
      count: 3,
      consume: true,
    })
    expect(squirtleCove?.requirements).toContainEqual({
      type: 'expedition_result',
      targetId: 'squirtle-squad-chronicle',
      expeditionStatus: 'completed',
      count: 1,
    })
    expect(squirtleCove?.requirements).not.toContainEqual(
      expect.objectContaining({ type: 'time_range' }),
    )
    expect(squirtleCove?.criteria).not.toContainEqual(
      expect.objectContaining({ type: 'time_range' }),
    )
    expect(squirtleCove?.rewards).not.toContainEqual(
      expect.objectContaining({ type: 'item', targetId: 'water-gem' }),
    )

    expect(gardenTrustTask?.requirements).toContainEqual({
      type: 'location_encounter_result',
      targetId: 'viridian-secret-garden',
      count: 5,
    })
    expect(coveRegularTask?.requirements).toContainEqual({
      type: 'location_encounter_result',
      targetId: 'vermilion-squirtle-cove',
      count: 5,
    })

    expect(openSecretGarden).toMatchObject({
      overrides: 'viridian-secret-garden',
      encounters: secretGarden?.encounters,
      levelRange: secretGarden?.levelRange,
      criteria: [],
    })
    expect(openSecretGarden?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'secret-garden-trust',
    })
    expect(openSecretGarden?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'regular-seed-recipe',
      dropChance: 12,
    })

    expect(openSquirtleCove).toMatchObject({
      overrides: 'vermilion-squirtle-cove',
      encounters: squirtleCove?.encounters,
      levelRange: squirtleCove?.levelRange,
      criteria: [],
    })
    expect(openSquirtleCove?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'squirtle-cove-regular',
    })
    expect(openSquirtleCove?.requirements).not.toContainEqual(
      expect.objectContaining({ type: 'time_range' }),
    )
    expect(openSquirtleCove?.criteria).not.toContainEqual(
      expect.objectContaining({ type: 'time_range' }),
    )
    expect(openSquirtleCove?.rewards).not.toContainEqual(
      expect.objectContaining({ type: 'item', targetId: 'water-gem' }),
    )
    expect(openSquirtleCove?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'magic-water-recipe',
      dropChance: 12,
    })
  })

  test('Route 6 catch, battle, and study reward pools avoid consumable item drops', () => {
    const route6Location = locations.find(
      (location) => location.id === 'route-6',
    )
    const route6Battle = battles.find(
      (battle) => battle.id === 'route-6-battle',
    )
    const route6Study = allGames.find(
      (game) => game.id === 'route-6-field-observation',
    )

    expect(
      route6Location?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('sitrus-berry')
    expect(
      route6Location?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('x-speed')
    expect(
      route6Location?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('tm-wave-breaker')
    expect(
      route6Location?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('oran-berry')

    expect(
      route6Battle?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('great-ball')
    expect(
      route6Battle?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('tm-wave-breaker')
    expect(
      route6Battle?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('oran-berry')

    expect(
      route6Study?.settings.itemDrops?.map((drop) => drop.itemId),
    ).not.toContain('tm-wave-breaker')
    expect(
      route6Study?.settings.itemDrops?.map((drop) => drop.itemId),
    ).not.toContain('oran-berry')
  })

  test('Route 9 catch, battle, and study unlock after the Cerulean Cut shrub', () => {
    const route9Location = locations.find(
      (location) => location.id === 'route-9',
    )
    const route9Battle = battles.find(
      (battle) => battle.id === 'route-9-battle',
    )
    const route9Study = allGames.find(
      (game) => game.id === 'route-9-field-observation',
    )
    const requiredGate: TaskCondition = {
      type: 'task_completed',
      targetId: 'route-9-shrub',
    }
    const speciesIds = [16, 19, 23, 27]
    const route9StudyPool = route9Study?.settings.pokemonPool || []

    expect(route9Location?.requirements).toContainEqual(requiredGate)
    expect(route9Battle?.requirements).toContainEqual(requiredGate)
    expect(route9Study?.requirements).toContainEqual(requiredGate)
    expect(
      route9Location?.encounters.map((encounter) => encounter.speciesId).sort(),
    ).toEqual(speciesIds)
    expect(
      route9Battle?.enemyTeam
        .map((pokemon) => pokemon.speciesId)
        .sort((a, b) => a - b),
    ).toEqual(speciesIds)
    expect(
      route9StudyPool.map((pokemon) => pokemon.speciesId).sort((a, b) => a - b),
    ).toEqual(speciesIds)
    expect(route9Location?.levelRange).toEqual({ min: 11, max: 17 })
    expect(route9Battle?.enemyTeam).toEqual(
      expect.arrayContaining(
        speciesIds.map((speciesId) =>
          expect.objectContaining({
            speciesId,
            level: { min: 11, max: 17 },
          }),
        ),
      ),
    )
    expect(route9Study?.settings.levelRange).toEqual({ min: 11, max: 17 })
    expect(
      route9Location?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('chesto-berry')
    expect(
      route9Location?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('tm-aerial-ace')
    expect(
      route9Battle?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('chesto-berry')
    expect(
      route9Battle?.rewards?.map((reward) => reward.targetId),
    ).not.toContain('tm-aerial-ace')
    expect(
      route9Study?.settings.itemDrops?.map((drop) => drop.itemId),
    ).not.toContain('tm-aerial-ace')
  })

  test('Route 9 Pass gear chain builds the Hiker outfit icon', () => {
    const blocker = tasks.find(
      (task) => task.id === 'route-9-mountain-pass-blocked',
    )
    const warning = tasks.find((task) => task.id === 'route-9-hiker-warning')
    const boots = tasks.find((task) => task.id === 'route-9-sturdy-boots')
    const clothes = tasks.find((task) => task.id === 'route-9-trail-clothes')
    const gloves = tasks.find((task) => task.id === 'route-9-climbing-gloves')
    const outfit = tasks.find(
      (task) => task.id === 'route-9-assemble-hiker-outfit',
    )
    const route9Study = allGames.find(
      (game) => game.id === 'route-9-field-observation',
    ) as any
    const clothesRecipe = artisanRecipes.find(
      (recipe) => recipe.id === 'craft-hiker-clothes',
    )
    const hikerIcon = icons.find((icon) => icon.id === 'hiker')

    expect(blocker?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-9-shrub',
    })
    expect(warning?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-9-mountain-pass-blocked',
    })
    expect(boots?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-9-hiker-warning',
    })
    expect(boots?.criteria).toEqual(
      expect.arrayContaining([
        {
          type: 'currency_owned',
          targetId: 'pokedollars',
          count: 500,
          consume: true,
        },
        {
          type: 'item_owned',
          targetId: 'small-stone-t1',
          count: 6,
          consume: true,
        },
        {
          type: 'item_owned',
          targetId: 'soft-fluff-t1',
          count: 4,
          consume: true,
        },
      ]),
    )
    expect(boots?.rewards).toContainEqual({
      type: 'item',
      targetId: 'hiker-boots',
      quantity: 1,
      dropChance: 100,
      secret: true,
    })
    expect(clothes?.chat).toBe(true)
    expect(clothes?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-9-sturdy-boots',
    })
    expect(clothes?.criteria).toEqual([])
    expect(clothes?.rewards).toEqual([])
    expect(clothesRecipe).toBeDefined()
    expect(clothesRecipe?.category).toBe('quests')
    expect(clothesRecipe?.artisanLevel).toBe(15)
    expect(clothesRecipe?.costs).toEqual(
      expect.arrayContaining([
        { id: 'soft-fluff-t1', amount: 10 },
        { id: 'wing-feather-t1', amount: 6 },
      ]),
    )
    expect(clothesRecipe?.minimumQuality).toBe('good')
    expect(clothesRecipe?.rewards).toContainEqual({
      type: 'item',
      targetId: 'hiker-clothes',
      quantity: 1,
      dropChance: 100,
    })
    expect(clothesRecipe?.requirements).toEqual(
      expect.arrayContaining([
        { type: 'task_completed', targetId: 'route-9-trail-clothes' },
        {
          type: 'task_completed',
          targetId: 'route-9-assemble-hiker-outfit',
          inverse: true,
        },
        {
          type: 'item_owned',
          targetId: 'hiker-clothes',
          count: 1,
          inverse: true,
        },
      ]),
    )
    expect(gloves?.criteria).toContainEqual({
      type: 'item_owned',
      targetId: 'hiker-gloves',
      count: 1,
    })
    expect(gloves?.requirements).toEqual(
      expect.arrayContaining([
        { type: 'task_completed', targetId: 'route-9-trail-clothes' },
        { type: 'item_owned', targetId: 'hiker-clothes', count: 1 },
      ]),
    )
    expect(gloves?.rewards).toEqual([])
    expect(route9Study?.settings.itemDrops).toContainEqual({
      id: 'route-9-forgotten-hiker-gloves',
      itemId: 'hiker-gloves',
      dropChance: 30,
      requirements: [
        { type: 'task_completed', targetId: 'route-9-trail-clothes' },
        { type: 'item_owned', targetId: 'hiker-clothes', count: 1 },
        {
          type: 'task_completed',
          targetId: 'route-9-assemble-hiker-outfit',
          inverse: true,
        },
        {
          type: 'item_owned',
          targetId: 'hiker-gloves',
          count: 1,
          inverse: true,
        },
      ],
    })
    expect(outfit?.requirements).toEqual(
      expect.arrayContaining([
        { type: 'task_completed', targetId: 'route-9-sturdy-boots' },
        { type: 'task_completed', targetId: 'route-9-trail-clothes' },
        { type: 'task_completed', targetId: 'route-9-climbing-gloves' },
      ]),
    )
    expect(outfit?.criteria).toEqual(
      expect.arrayContaining([
        {
          type: 'item_owned',
          targetId: 'hiker-boots',
          count: 1,
          consume: true,
        },
        {
          type: 'item_owned',
          targetId: 'hiker-clothes',
          count: 1,
          consume: true,
        },
        {
          type: 'item_owned',
          targetId: 'hiker-gloves',
          count: 1,
          consume: true,
        },
      ]),
    )
    expect(outfit?.rewards).toContainEqual({
      type: 'icon',
      targetId: 'hiker',
      dropChance: 100,
    })
    expect(hikerIcon?.icon).toEqual({ type: 'trainer', id: 'hiker' })
  })

  test('Route 9 Pass expedition uses the FRLG trainer route and unlocks Route 10', () => {
    const expedition = expeditions.find(
      (entry) => entry.id === 'route-9-pass-expedition',
    )
    const battleIds = [
      'route-9-pass-picnicker-alicia',
      'route-9-pass-hiker-jeremy',
      'route-9-pass-camper-chris',
      'route-9-pass-bug-catcher-brent',
      'route-9-pass-hiker-alan',
      'route-9-pass-bug-catcher-conner',
      'route-9-pass-camper-drew',
      'route-9-pass-hiker-brice',
      'route-9-pass-picnicker-caitlin',
    ]
    const expectedTeams = new Map([
      ['route-9-pass-picnicker-alicia', [43, 69, 43, 69]],
      ['route-9-pass-hiker-jeremy', [66, 95]],
      ['route-9-pass-camper-chris', [58, 4]],
      ['route-9-pass-bug-catcher-brent', [15, 15]],
      ['route-9-pass-hiker-alan', [74, 95]],
      ['route-9-pass-bug-catcher-conner', [10, 13, 48]],
      ['route-9-pass-camper-drew', [19, 27, 23, 27]],
      ['route-9-pass-hiker-brice', [74, 74, 66]],
      ['route-9-pass-picnicker-caitlin', [52]],
    ])

    expect(expedition?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-9-assemble-hiker-outfit',
    })
    expect(expedition?.requirements).toContainEqual({
      type: 'expedition_result',
      targetId: 'route-9-pass-expedition',
      expeditionStatus: 'completed',
      count: 1,
      inverse: true,
    })
    expect(expedition?.activityPool.location).toEqual([
      'route-9-pass-lower-trail',
      'route-9-pass-upper-trail',
    ])
    expect(expedition?.activityPool.battle).toEqual(battleIds)
    expect(
      expedition?.path
        .filter(
          (
            step,
          ): step is Extract<
            (typeof expedition.path)[number],
            { type: 'activity' }
          > => step.type === 'activity' && step.activityType === 'battle',
        )
        .map((step) => step.activityId),
    ).toEqual(battleIds)

    for (const battleId of battleIds) {
      const battle = battles.find((entry) => entry.id === battleId)
      expect(battle?.requirements).toContainEqual({
        type: 'task_completed',
        targetId: 'route-9-assemble-hiker-outfit',
      })
      expect(battle?.levelCap).toBe(25)
      expect(battle?.category).toBe('Secret')
      expect(battle?.enemyTeam.map((enemy) => enemy.speciesId)).toEqual(
        expectedTeams.get(battleId),
      )
    }

    const route10Gate: TaskCondition = {
      type: 'expedition_result',
      targetId: 'route-9-pass-expedition',
      expeditionStatus: 'completed',
      count: 1,
    }
    const route10Location = locations.find(
      (location) => location.id === 'route-10',
    )
    const route10Battle = battles.find(
      (battle) => battle.id === 'route-10-battle',
    )
    const route10Fishing = allGames.find(
      (game) => game.id === 'route-10-fishing',
    )
    const route10FishingSettings = route10Fishing?.settings as
      | FishingGameConfig['settings']
      | undefined
    const route10Study = allGames.find(
      (game) => game.id === 'route-10-field-observation',
    )
    const route10SurfGate = tasks.find(
      (task) => task.id === 'surf-route-10-water',
    )
    const rockAndHardPlace = tasks.find(
      (task) => task.id === 'route-10-rock-and-hard-place',
    )
    const voltorbRoundup = tasks.find(
      (task) => task.id === 'route-10-voltorb-roundup',
    )
    const openRoad = tasks.find((task) => task.id === 'route-10-open-road')
    const voltorbGames = [
      allGames.find((game) => game.id === 'route-10-voltorb-primer'),
      allGames.find((game) => game.id === 'route-10-voltorb-relay'),
      allGames.find((game) => game.id === 'route-10-voltorb-landslide'),
    ]
    const heidi = battles.find(
      (battle) => battle.id === 'route-10-picknicker-heidi',
    )
    const furtherDestruction = tasks.find(
      (task) => task.id === 'route-10-further-destruction',
    )
    const wattAProblem = tasks.find(
      (task) => task.id === 'route-10-watt-a-problem',
    )
    const tinyPokemonMystery = tasks.find(
      (task) => task.id === 'route-10-tiny-pokemon-mystery',
    )
    const demolitionCrew = tasks.find(
      (task) => task.id === 'route-10-demolition-crew',
    )
    const suchDevastation = tasks.find(
      (task) => task.id === 'route-10-such-devastation',
    )
    const demolitionGames = [
      allGames.find((game) => game.id === 'route-10-voltorb-hairline-crack'),
      allGames.find((game) => game.id === 'route-10-voltorb-fuse-line'),
      allGames.find((game) => game.id === 'route-10-voltorb-split-charge'),
      allGames.find((game) => game.id === 'route-10-voltorb-deep-fault'),
      allGames.find((game) => game.id === 'route-10-voltorb-final-breach'),
    ]
    const plantStoreRoom = locations.find(
      (location) => location.id === 'route-10-plant-store-room',
    )
    const weakMagnetRecipeTask = tasks.find(
      (task) => task.id === 'weak-magnet-recipe',
    )
    const route10Species = [21, 23, 27, 100]
    const route10StudySpecies = [...route10Species, 239]

    expect(subCategories['Route 10']).toBeUndefined()
    expect(route10Location?.requirements).toContainEqual(route10Gate)
    expect(route10Battle?.requirements).toContainEqual(route10Gate)
    expect(route10Fishing?.requirements).toContainEqual(route10Gate)
    expect(route10Study?.requirements).toContainEqual(route10Gate)
    expect(route10SurfGate?.requirements).toContainEqual(route10Gate)
    expect(rockAndHardPlace?.requirements).toContainEqual(route10Gate)
    expect(route10Fishing?.gameType).toBe('fishing')
    expect(route10Fishing?.criteria).toContainEqual({
      type: 'item_owned',
      targetId: 'old-rod',
    })
    expect(
      route10FishingSettings?.rods.old?.encounters.entries.map(
        (entry) => entry.speciesId,
      ),
    ).toEqual([129])
    expect(
      route10FishingSettings?.rods.good?.encounters.entries
        .map((entry) => entry.speciesId)
        .sort((a, b) => a - b),
    ).toEqual([60, 118])
    expect(
      route10FishingSettings?.rods.super?.encounters.entries
        .map((entry) => entry.speciesId)
        .sort((a, b) => a - b),
    ).toEqual([54, 79, 98])
    expect(route10SurfGate?.criteria).toContainEqual({
      type: 'item_owned',
      targetId: 'tm-surf',
      count: 1,
    })
    expect(voltorbRoundup?.criteria).toContainEqual({
      type: 'pokemon_owned',
      targetId: 100,
      count: 3,
      consume: true,
    })
    expect(voltorbRoundup?.rewards).toContainEqual({
      type: 'xp',
      skill: 'catching',
      quantity: 650,
      dropChance: 100,
    })
    expect(voltorbGames.map((game) => game?.gameType)).toEqual([
      'voltorb-grid',
      'voltorb-grid',
      'voltorb-grid',
    ])
    expect(voltorbGames[0]?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-10-voltorb-roundup',
    })
    expect(voltorbGames[0]?.requirements).toContainEqual({
      type: 'research_encounter_result',
      targetId: 'route-10-voltorb-primer',
      battleStatus: 'win',
      count: 1,
      inverse: true,
    })
    expect(voltorbGames[1]?.requirements).toContainEqual({
      type: 'research_encounter_result',
      targetId: 'route-10-voltorb-primer',
      battleStatus: 'win',
      count: 1,
    })
    expect(voltorbGames[1]?.requirements).toContainEqual({
      type: 'research_encounter_result',
      targetId: 'route-10-voltorb-relay',
      battleStatus: 'win',
      count: 1,
      inverse: true,
    })
    expect(voltorbGames[2]?.requirements).toContainEqual({
      type: 'research_encounter_result',
      targetId: 'route-10-voltorb-relay',
      battleStatus: 'win',
      count: 1,
    })
    expect(voltorbGames[2]?.requirements).toContainEqual({
      type: 'research_encounter_result',
      targetId: 'route-10-voltorb-landslide',
      battleStatus: 'win',
      count: 1,
      inverse: true,
    })
    expect(voltorbGames.map((game) => game?.settings.requiredCleared)).toEqual([
      1, 2, 3,
    ])
    expect(voltorbGames.map((game) => game?.settings.voltorbs?.length)).toEqual(
      [1, 2, 3],
    )
    expect(openRoad?.requirements).toContainEqual({
      type: 'research_encounter_result',
      targetId: 'route-10-voltorb-landslide',
      battleStatus: 'win',
      count: 1,
    })
    expect(heidi?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-10-open-road',
    })
    expect(heidi?.requirements).toContainEqual({
      type: 'battle_result',
      targetId: 'route-10-picknicker-heidi',
      battleStatus: 'win',
      count: 1,
      inverse: true,
    })
    expect(heidi?.enemyTeam.map((enemy) => enemy.speciesId)).toEqual([25, 35])
    expect(furtherDestruction?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-10-open-road',
    })
    expect(furtherDestruction?.criteria).toContainEqual({
      type: 'skill_level',
      targetId: 'catching',
      count: 20,
    })
    expect(furtherDestruction?.criteria).toContainEqual({
      type: 'skill_level',
      targetId: 'researching',
      count: 20,
    })
    expect(wattAProblem?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-10-further-destruction',
    })
    const route10StudyPokemonPool = route10Study?.settings.pokemonPool || []
    const route10ElekidStudyEntry = route10StudyPokemonPool.find(
      (entry) => entry.speciesId === 239,
    )
    expect(route10ElekidStudyEntry).toMatchObject({
      speciesId: 239,
      formId: '239',
      weight: 25,
    })
    expect(route10ElekidStudyEntry?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-10-watt-a-problem',
    })
    expect(tinyPokemonMystery?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-10-watt-a-problem',
    })
    expect(tinyPokemonMystery?.criteria).toContainEqual({
      type: 'research_level',
      targetId: '239',
      count: 1,
    })
    expect(demolitionCrew?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-10-tiny-pokemon-mystery',
    })
    expect(demolitionCrew?.criteria).toContainEqual({
      type: 'pokemon_owned',
      targetId: 100,
      count: 3,
      consume: true,
    })
    expect(demolitionGames.map((game) => game?.gameType)).toEqual([
      'voltorb-grid',
      'voltorb-grid',
      'voltorb-grid',
      'voltorb-grid',
      'voltorb-grid',
    ])
    expect(demolitionGames[0]?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-10-demolition-crew',
    })
    for (let index = 1; index < demolitionGames.length; index += 1) {
      expect(demolitionGames[index]?.requirements).toContainEqual({
        type: 'research_encounter_result',
        targetId: demolitionGames[index - 1]?.id,
        battleStatus: 'win',
        count: 1,
      })
    }
    for (const demolitionGame of demolitionGames) {
      expect(demolitionGame?.requirements).toContainEqual({
        type: 'research_encounter_result',
        targetId: demolitionGame?.id,
        battleStatus: 'win',
        count: 1,
        inverse: true,
      })
    }
    expect(
      demolitionGames.map((game) => game?.settings.requiredCleared),
    ).toEqual([4, 5, 6, 7, 9])
    expect(
      demolitionGames.map((game) => game?.settings.voltorbs?.length),
    ).toEqual([3, 4, 5, 6, 7])
    expect(
      demolitionGames.map((game) => game?.settings.protectedPokemon?.length),
    ).toEqual([2, 3, 2, 3, 3])
    expect(suchDevastation?.requirements).toContainEqual({
      type: 'research_encounter_result',
      targetId: 'route-10-voltorb-final-breach',
      battleStatus: 'win',
      count: 1,
    })
    expect(suchDevastation?.rewards).toContainEqual({
      type: 'xp',
      skill: 'catching',
      quantity: 1000,
      dropChance: 100,
    })
    expect(suchDevastation?.rewards).toContainEqual({
      type: 'xp',
      skill: 'researching',
      quantity: 1000,
      dropChance: 100,
    })
    expect(suchDevastation?.rewards).toContainEqual({
      type: 'pokemon_research_xp',
      targetId: '239',
      quantity: 75,
      dropChance: 100,
    })
    expect(plantStoreRoom?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-10-such-devastation',
    })
    expect(plantStoreRoom?.subCategory).toBe('Cerulean City')
    expect(plantStoreRoom?.background).toBe('/backgrounds/power-plant.avif')
    expect(plantStoreRoom?.levelRange).toEqual({ min: 12, max: 18 })
    expect(plantStoreRoom?.encounters).toEqual([
      { speciesId: 239, formId: '239', chance: 100 },
    ])
    expect(plantStoreRoom?.rewards).toContainEqual({
      type: 'item',
      targetId: 'thunder-stone',
      quantity: 1,
      dropChance: 1,
    })
    expect(weakMagnetRecipeTask?.secret).toBe(false)
    expect(route10Location?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'weak-magnet-recipe',
      dropChance: 12,
    })
    expect(route10Battle?.rewards).not.toContainEqual(
      expect.objectContaining({ targetId: 'weak-magnet-recipe' }),
    )
    expect(route10Study?.rewards).not.toContainEqual(
      expect.objectContaining({ targetId: 'weak-magnet-recipe' }),
    )
    expect(route10Location?.subCategory).toBe('Cerulean City')
    expect(route10Battle?.subCategory).toBe('Cerulean City')
    expect(route10Fishing?.subCategory).toBe('Cerulean City')
    expect(route10Study?.subCategory).toBe('Cerulean City')
    expect(
      route10Location?.encounters
        .map((encounter) => encounter.speciesId)
        .sort((a, b) => a - b),
    ).toEqual(route10Species)
    expect(
      route10Battle?.enemyTeam
        .map((enemy) => enemy.speciesId)
        .sort((a, b) => a - b),
    ).toEqual(route10Species)
    expect(
      route10StudyPokemonPool
        .map((entry) => entry.speciesId)
        .sort((a, b) => a - b),
    ).toEqual(route10StudySpecies)
    expect(route10Location?.levelRange).toEqual({ min: 14, max: 18 })
    expect(route10Study?.settings.levelRange).toEqual({ min: 14, max: 18 })
  })

  test('Rock Push teleport test covers win tiles and multi-screen teleporters', () => {
    const game = allGames.find(
      (entry) => entry.id === 'pallet-rock-teleport-test',
    )
    const screens = game?.settings.screens || []

    expect(game?.gameType).toBe('rock-push')
    expect(game?.settings.startScreen).toBe('entry')
    expect(screens.map((screen) => screen.id).sort()).toEqual([
      'entry',
      'treasure',
      'upper',
    ])
    expect(screens.some((screen) => (screen.winTiles || []).length > 0)).toBe(
      true,
    )
    expect(
      screens
        .flatMap((screen) => screen.teleporters || [])
        .some((teleporter) => teleporter.oneWay),
    ).toBe(true)
    expect(
      screens
        .flatMap((screen) => screen.teleporters || [])
        .some(
          (teleporter) =>
            teleporter.target.screen && teleporter.target.screen !== 'entry',
        ),
    ).toBe(true)
  })

  test("Joey's Rattata Run uses score-scaled materials instead of ball milestone drops", () => {
    const game = allGames.find((entry) => entry.id === 'joeys-rattata-run')
    expect(game).toBeDefined()

    const endless = game?.settings.endless
    const milestoneRewards = (endless?.milestones || []).flatMap(
      (milestone) => milestone.rewards,
    )
    const repeatingRewards = endless?.repeatingRewards || []

    expect(milestoneRewards.map((reward) => reward.targetId)).not.toContain(
      'poke-ball',
    )
    expect(milestoneRewards.map((reward) => reward.targetId)).not.toContain(
      'great-ball',
    )
    expect(milestoneRewards).toContainEqual({
      type: 'item',
      targetId: 'tm-quick-attack',
      quantity: 1,
      dropChance: 100,
    })
    expect(endless?.milestones).toContainEqual({
      score: 1200,
      rewards: [
        {
          type: 'item',
          targetId: 'tm-quick-attack',
          quantity: 1,
          dropChance: 100,
        },
      ],
    })
    expect(endless?.milestones).toContainEqual({
      score: 4000,
      rewards: [
        {
          type: 'title',
          targetId: 'joey-friend',
          quantity: 1,
          dropChance: 100,
        },
      ],
    })
    expect(repeatingRewards).toContainEqual({
      everyScore: 150,
      rewards: [{ type: 'pokemon_research_xp', quantity: 1, targetId: '19' }],
    })
    expect(repeatingRewards).toContainEqual({
      everyScore: 200,
      random: true,
      rewards: [
        {
          type: 'item',
          targetId: 'soft-fluff-t1',
          quantity: 1,
          dropChance: 100,
        },
        {
          type: 'item',
          targetId: 'wing-feather-t1',
          quantity: 1,
          dropChance: 100,
        },
      ],
    })
    expect(repeatingRewards).toContainEqual({
      everyScore: 350,
      random: true,
      rewards: [
        {
          type: 'item',
          targetId: 'broken-ball-t1',
          quantity: 1,
          dropChance: 100,
        },
      ],
    })
  })

  test('Viridian Forest photo Snap rewards Explorer XP', () => {
    const forestPhotoEntries = [
      { id: 'research-forest-photos', quantity: { min: 3, max: 5 } },
      { id: 'research-forest-photos-ex', quantity: { min: 5, max: 7 } },
    ]

    for (const { id, quantity } of forestPhotoEntries) {
      const snap = allGames.find((entry) => entry.id === id)
      expect(snap).toBeDefined()
      expect(snap?.gameType).toBe('snap')
      expect(snap?.skillXp).toEqual({ skill: 'catching', level: 6 })
      expect(snap?.rewards).toContainEqual({
        type: 'item',
        targetId: 'quality-forest-photo',
        quantity,
        dropChance: 100,
      })
    }

    const normalForestPhotos = allGames.find(
      (entry) => entry.id === 'research-forest-photos',
    )
    expect(normalForestPhotos?.requirements).toContainEqual({
      type: 'item_owned',
      targetId: 'binder-base2',
    })

    const photoExchange = tasks.find(
      (entry) => entry.id === 'task-photo-exchange',
    )
    expect(photoExchange?.rewards).toContainEqual({
      type: 'item',
      targetId: 'pack-base2',
      quantity: 1,
      requirements: [
        {
          type: 'card_collected_set',
          targetId: 'base2',
          count: 64,
          unique: true,
          inverse: true,
        },
      ],
    })
    expect(photoExchange?.rewards).toContainEqual({
      type: 'item',
      targetId: 'net-ball',
      quantity: 1,
      requirements: [
        {
          type: 'card_collected_set',
          targetId: 'base2',
          count: 64,
          unique: true,
        },
      ],
    })
  })

  test('legendary beast random events use early battle and one-time photo proof loops', () => {
    const beastBattles = [
      {
        id: 'legendary-beast-entei',
        speciesId: 244,
        markItem: 'mark-of-fire',
      },
      {
        id: 'legendary-beast-raikou',
        speciesId: 243,
        markItem: 'mark-of-thunder',
      },
      {
        id: 'legendary-beast-suicune',
        speciesId: 245,
        markItem: 'mark-of-water',
      },
    ]

    for (const expected of beastBattles) {
      const battle = battles.find((entry) => entry.id === expected.id)
      expect(battle).toBeDefined()
      expect(battle?.isRandomEvent).toBe(true)
      expect(battle?.maxPokemon).toBe(2)
      expect(battle?.levelCap).toBe(30)
      expect(battle?.enemyMovesPerBattle).toBeUndefined()
      expect(battle?.enemyTeam).toEqual([
        {
          speciesId: expected.speciesId,
          level: 30,
        },
      ])
      expect(battle?.requirements).not.toContainEqual({
        type: 'item_owned',
        targetId: 'badge-kanto-earth',
      })
      expect(battle?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: 'clear-bell',
      })
      expect(battle?.requirements).toContainEqual({
        type: 'battle_result',
        targetId: expected.id,
        battleStatus: 'win',
        inverse: true,
      })
      expect(battle?.rewards).toContainEqual({
        type: 'item',
        targetId: expected.markItem,
        quantity: 1,
      })
      expect(battle?.rewards).toContainEqual({
        type: 'xp',
        skill: 'battling',
        quantity: 1000,
        dropChance: 100,
      })
    }

    const beastSnaps = [
      { id: 'entei-shadow-snap', target: 244, proofItem: 'proof-of-fire' },
      { id: 'raikou-shadow-snap', target: 243, proofItem: 'proof-of-thunder' },
      { id: 'suicune-shadow-snap', target: 245, proofItem: 'proof-of-water' },
    ]

    for (const expected of beastSnaps) {
      const snap = allGames.find((entry) => entry.id === expected.id)
      expect(snap).toBeDefined()
      expect(snap?.isRandomEvent).toBe(true)
      expect(snap?.gameType).toBe('snap')
      expect(snap?.settings.target).toBe(expected.target)
      expect(snap?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: 'clear-bell',
      })
      expect(snap?.requirements).toContainEqual({
        type: 'research_encounter_result',
        targetId: expected.id,
        battleStatus: 'win',
        count: 1,
        inverse: true,
      })
      expect(snap?.rewards).toContainEqual({
        type: 'item',
        targetId: expected.proofItem,
        quantity: 1,
        dropChance: 100,
      })
      expect(snap?.rewards).toContainEqual({
        type: 'xp',
        skill: 'catching',
        quantity: 1000,
        dropChance: 100,
      })
    }

    const rainbowFeather = items.find((entry) => entry.id === 'rainbow-feather')
    const hoOhSnap = allGames.find(
      (entry) => entry.id === 'rainbow-feather-shadow-snap',
    )
    const clearBell = items.find((entry) => entry.id === 'clear-bell')

    expect(rainbowFeather?.unique).toBe(false)
    expect(clearBell).toMatchObject({
      category: 'key',
      unique: true,
    })
    expect(hoOhSnap?.requirements).toContainEqual({
      type: 'item_owned',
      targetId: 'clear-bell',
    })
    expect(hoOhSnap?.requirements).not.toContainEqual({
      type: 'item_owned',
      targetId: 'rainbow-feather',
      inverse: true,
    })
    expect(hoOhSnap?.requirements).toContainEqual({
      type: 'research_encounter_result',
      targetId: 'rainbow-feather-shadow-snap',
      battleStatus: 'win',
      count: 3,
      inverse: true,
    })
    expect(hoOhSnap?.rewards).toContainEqual({
      type: 'xp',
      skill: 'catching',
      quantity: 1000,
      dropChance: 100,
    })
  })

  test('legendary bird random events mirror beast loops without Clear Bell gating', () => {
    const birdBattles = [
      {
        id: 'legendary-bird-moltres',
        speciesId: 146,
        branchItem: 'flaming-branch',
      },
      {
        id: 'legendary-bird-zapdos',
        speciesId: 145,
        branchItem: 'charged-branch',
      },
      {
        id: 'legendary-bird-articuno',
        speciesId: 144,
        branchItem: 'frozen-branch',
      },
    ]

    for (const expected of birdBattles) {
      const battle = battles.find((entry) => entry.id === expected.id)
      expect(battle).toBeDefined()
      expect(battle?.isRandomEvent).toBe(true)
      expect(battle?.maxPokemon).toBe(2)
      expect(battle?.levelCap).toBe(30)
      expect(battle?.enemyTeam).toEqual([
        { speciesId: expected.speciesId, level: 30 },
      ])
      expect(battle?.requirements).not.toContainEqual({
        type: 'item_owned',
        targetId: 'clear-bell',
      })
      expect(battle?.requirements).toContainEqual({
        type: 'battle_result',
        targetId: expected.id,
        battleStatus: 'win',
        inverse: true,
      })
      expect(battle?.rewards).toContainEqual({
        type: 'item',
        targetId: expected.branchItem,
        quantity: 1,
      })
    }

    const birdSnaps = [
      { id: 'moltres-shadow-snap', target: 146, boughItem: 'flaming-bough' },
      { id: 'zapdos-shadow-snap', target: 145, boughItem: 'charged-bough' },
      { id: 'articuno-shadow-snap', target: 144, boughItem: 'frozen-bough' },
    ]

    for (const expected of birdSnaps) {
      const snap = allGames.find((entry) => entry.id === expected.id)
      expect(snap).toBeDefined()
      expect(snap?.isRandomEvent).toBe(true)
      expect(snap?.gameType).toBe('snap')
      expect(snap?.settings.target).toBe(expected.target)
      expect(snap?.requirements).not.toContainEqual({
        type: 'item_owned',
        targetId: 'clear-bell',
      })
      expect(snap?.requirements).toContainEqual({
        type: 'research_encounter_result',
        targetId: expected.id,
        battleStatus: 'win',
        count: 1,
        inverse: true,
      })
      expect(snap?.rewards).toContainEqual({
        type: 'item',
        targetId: expected.boughItem,
        quantity: 1,
        dropChance: 100,
      })
    }

    const silverFeather = items.find((entry) => entry.id === 'silver-feather')
    const lugiaSnap = allGames.find(
      (entry) => entry.id === 'silver-feather-shadow-snap',
    )

    expect(silverFeather?.unique).toBe(false)
    expect(lugiaSnap?.settings.target).toBe(249)
    expect(lugiaSnap?.requirements).not.toContainEqual({
      type: 'item_owned',
      targetId: 'clear-bell',
    })
    expect(lugiaSnap?.requirements).toContainEqual({
      type: 'research_encounter_result',
      targetId: 'silver-feather-shadow-snap',
      battleStatus: 'win',
      count: 3,
      inverse: true,
    })
    expect(lugiaSnap?.rewards).toContainEqual({
      type: 'item',
      targetId: 'silver-feather',
      quantity: 1,
      dropChance: 100,
    })
  })

  test('field observation global beast events reference authored items and Pokemon', () => {
    expect(fieldObservationGlobalItemEvents).toContainEqual({
      id: 'global-field-observation-escape-rope',
      itemId: 'escape-rope',
      dropChance: 5,
    })
    expect(ids.item.has('escape-rope')).toBe(true)
    expect(fieldObservationGlobalItemEvents).toContainEqual({
      id: 'global-field-observation-repel',
      itemId: 'repel',
      dropChance: 5,
      requirements: [{ type: 'skill_level', targetId: 'catching', count: 20 }],
    })
    expect(ids.item.has('repel')).toBe(true)
    const expectedResearcherJournals = [
      {
        id: 'global-field-observation-researchers-journal-page',
        itemId: 'researchers-journal-page',
        dropChance: 33,
        xp: 75,
      },
      {
        id: 'global-field-observation-researchers-journal-volume',
        itemId: 'researchers-journal-volume',
        dropChance: 10,
        xp: 400,
      },
      {
        id: 'global-field-observation-researchers-journal-archive',
        itemId: 'researchers-journal-archive',
        dropChance: 1.3,
        xp: 1000,
      },
      {
        id: 'global-field-observation-researchers-journal-compendium',
        itemId: 'researchers-journal-compendium',
        dropChance: 0.4,
        xp: 2500,
      },
    ]
    for (const journal of expectedResearcherJournals) {
      expect(fieldObservationGlobalItemEvents).toContainEqual({
        id: journal.id,
        itemId: journal.itemId,
        dropChance: journal.dropChance,
      })
      const item = items.find((entry) => entry.id === journal.itemId)
      expect(item?.effects?.grantSkillXp).toEqual({
        skill: 'researching',
        amount: journal.xp,
      })
    }

    const expectedEvents = [
      {
        id: 'field-observation-entei',
        speciesId: 244,
        tokenItem: 'token-of-fire',
        lifelessItem: 'lifeless-fire',
        concentratedItem: 'concentrated-fire',
      },
      {
        id: 'field-observation-raikou',
        speciesId: 243,
        tokenItem: 'token-of-thunder',
        lifelessItem: 'lifeless-thunder',
        concentratedItem: 'concentrated-thunder',
      },
      {
        id: 'field-observation-suicune',
        speciesId: 245,
        tokenItem: 'token-of-water',
        lifelessItem: 'lifeless-water',
        concentratedItem: 'concentrated-water',
      },
    ]

    for (const expected of expectedEvents) {
      const event = fieldObservationGlobalPokemonEvents.find(
        (entry) => entry.id === expected.id,
      )
      expect(event).toBeDefined()
      expect(event?.speciesId).toBe(expected.speciesId)
      expect(event?.formId).toBe(String(expected.speciesId))
      expect(event?.odds).toBe(256)
      expect(ids.item.has(expected.tokenItem)).toBe(true)
      expect(ids.item.has(expected.lifelessItem)).toBe(true)
      expect(ids.item.has(expected.concentratedItem)).toBe(true)
      expect(event?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: 'clear-bell',
      })
      expect(event?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: expected.tokenItem,
        inverse: true,
      })
      expect(event?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: expected.lifelessItem,
        inverse: true,
      })
      expect(event?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: expected.concentratedItem,
        inverse: true,
      })
    }

    const expectedBirdEvents = [
      {
        id: 'field-observation-moltres',
        speciesId: 146,
        twigItem: 'flaming-twig',
        lifelessItem: 'lifeless-flaming-branch',
        concentratedItem: 'concentrated-flaming-branch',
      },
      {
        id: 'field-observation-zapdos',
        speciesId: 145,
        twigItem: 'charged-twig',
        lifelessItem: 'lifeless-charged-branch',
        concentratedItem: 'concentrated-charged-branch',
      },
      {
        id: 'field-observation-articuno',
        speciesId: 144,
        twigItem: 'frozen-twig',
        lifelessItem: 'lifeless-frozen-branch',
        concentratedItem: 'concentrated-frozen-branch',
      },
    ]

    for (const expected of expectedBirdEvents) {
      const event = fieldObservationGlobalPokemonEvents.find(
        (entry) => entry.id === expected.id,
      )
      expect(event).toBeDefined()
      expect(event?.speciesId).toBe(expected.speciesId)
      expect(event?.formId).toBe(String(expected.speciesId))
      expect(event?.odds).toBe(256)
      expect(ids.item.has(expected.twigItem)).toBe(true)
      expect(ids.item.has(expected.lifelessItem)).toBe(true)
      expect(ids.item.has(expected.concentratedItem)).toBe(true)
      expect(event?.requirements).not.toContainEqual({
        type: 'item_owned',
        targetId: 'clear-bell',
      })
      expect(event?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: expected.twigItem,
        inverse: true,
      })
      expect(event?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: expected.lifelessItem,
        inverse: true,
      })
      expect(event?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: expected.concentratedItem,
        inverse: true,
      })
    }
  })

  test('beast stone fusion random tasks consume the three element stones once', () => {
    const expectedTasks = [
      { element: 'fire', icon: 'fire-stone' },
      { element: 'thunder', icon: 'thunder-stone' },
      { element: 'water', icon: 'water-stone' },
    ]

    for (const expected of expectedTasks) {
      const task = tasks.find(
        (entry) => entry.id === `beast-stones-${expected.element}`,
      )
      expect(task).toBeDefined()
      expect(task?.secret).toBe(true)
      expect(task?.isRandomEvent).toBe(true)
      expect(task?.repeatable).toBe(false)
      expect(task?.icon).toEqual({ type: 'item', id: expected.icon })
      expect(task?.requirements).toContainEqual({
        type: 'roll',
        count: 1_000_000,
      })
      for (const itemId of [
        `mark-of-${expected.element}`,
        `proof-of-${expected.element}`,
        `token-of-${expected.element}`,
      ]) {
        expect(task?.requirements).toContainEqual({
          type: 'item_owned',
          targetId: itemId,
        })
        expect(task?.criteria).toContainEqual({
          type: 'item_owned',
          targetId: itemId,
          consume: true,
        })
      }
      expect(task?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: `lifeless-${expected.element}`,
        inverse: true,
      })
      expect(task?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: `concentrated-${expected.element}`,
        inverse: true,
      })
      expect(task?.rewards).toContainEqual({
        type: 'item',
        targetId: `lifeless-${expected.element}`,
        quantity: 1,
      })
    }
  })

  test('bird branch fusion random tasks consume the three branch traces once', () => {
    const expectedTasks = [
      {
        element: 'flaming',
        branchItem: 'flaming-branch',
        boughItem: 'flaming-bough',
        twigItem: 'flaming-twig',
        lifelessItem: 'lifeless-flaming-branch',
        concentratedItem: 'concentrated-flaming-branch',
      },
      {
        element: 'charged',
        branchItem: 'charged-branch',
        boughItem: 'charged-bough',
        twigItem: 'charged-twig',
        lifelessItem: 'lifeless-charged-branch',
        concentratedItem: 'concentrated-charged-branch',
      },
      {
        element: 'frozen',
        branchItem: 'frozen-branch',
        boughItem: 'frozen-bough',
        twigItem: 'frozen-twig',
        lifelessItem: 'lifeless-frozen-branch',
        concentratedItem: 'concentrated-frozen-branch',
      },
    ]

    for (const expected of expectedTasks) {
      const task = tasks.find(
        (entry) => entry.id === `bird-branches-${expected.element}`,
      )
      expect(task).toBeDefined()
      expect(task?.secret).toBe(true)
      expect(task?.isRandomEvent).toBe(true)
      expect(task?.repeatable).toBe(false)
      expect(task?.requirements).toContainEqual({
        type: 'roll',
        count: 1_000_000,
      })
      for (const itemId of [
        expected.branchItem,
        expected.boughItem,
        expected.twigItem,
      ]) {
        expect(task?.requirements).toContainEqual({
          type: 'item_owned',
          targetId: itemId,
        })
        expect(task?.criteria).toContainEqual({
          type: 'item_owned',
          targetId: itemId,
          consume: true,
        })
      }
      expect(task?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: expected.lifelessItem,
        inverse: true,
      })
      expect(task?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: expected.concentratedItem,
        inverse: true,
      })
      expect(task?.rewards).toContainEqual({
        type: 'item',
        targetId: expected.lifelessItem,
        quantity: 1,
      })
    }
  })

  test('Itemfinder random events are daily repeatable dowsing rewards', () => {
    const dowsingTasks = tasks.filter((entry) =>
      entry.id.startsWith('dowsing-machine-'),
    )

    expect(dowsingTasks.length).toBeGreaterThan(0)
    for (const task of dowsingTasks) {
      expect(task.subCategory).toBe('Dowsing')
      expect(task.isRandomEvent).toBe(true)
      expect(task.repeatable).toBe(true)
      expect(task.daily).toBe(true)
      expect(task.requirements).toContainEqual({
        type: 'item_owned',
        targetId: 'dowsing-machine',
      })
      expect(
        task.requirements.some((requirement) => requirement.type === 'roll'),
      ).toBe(true)
    }
  })

  test('regular daily Explore content has a matching daily reset requirement', () => {
    const regularDailyItems = exploreItems.filter(
      (entry) =>
        (entry as any).daily === true && (entry as any).isRandomEvent !== true,
    )

    expect(regularDailyItems.length).toBeGreaterThan(0)
    for (const item of regularDailyItems) {
      expect((item as any).requirements).toContainEqual({
        type: 'daily_not_completed',
        targetId: item.id,
      })
    }
  })

  test('Hard Stone held items are sourced through gated Artisan crafting instead of authored drops', () => {
    const directRewardOwners: string[] = []
    const recipe = artisanRecipes.find(
      (entry) => entry.id === 'craft-hard-stone',
    )

    for (const entry of exploreItems) {
      for (const reward of (entry as any).rewards || []) {
        if (reward.type === 'item' && reward.targetId === 'hard-stone') {
          directRewardOwners.push(entry.id)
        }
      }
    }

    expect(directRewardOwners).toEqual([])
    expect(recipe?.rewards).toContainEqual({
      type: 'item',
      targetId: 'hard-stone',
      quantity: 1,
      dropChance: 100,
    })
  })

  test('Mt Moon trainer progress gates are visible criteria', () => {
    const trainerGates = [
      {
        id: 'bug-catcher-kent',
        visibleRequirement: {
          type: 'task_completed',
          targetId: 'mt-moon-pokemon-center',
        },
        criteria: [
          {
            type: 'location_encounter_result',
            targetId: 'exp-mt-moon-1f',
            battleStatus: 'win',
            count: 1,
          },
        ],
      },
      {
        id: 'lass-iris',
        visibleRequirement: {
          type: 'battle_result',
          targetId: 'bug-catcher-kent',
          battleStatus: 'win',
          count: 1,
        },
        criteria: [
          {
            type: 'battle_result',
            targetId: 'mt-moon-1f',
            battleStatus: 'win',
            count: 3,
          },
          {
            type: 'location_encounter_result',
            targetId: 'exp-mt-moon-1f',
            battleStatus: 'win',
            count: 3,
          },
        ],
      },
      {
        id: 'super-nerd-jovan',
        visibleRequirement: {
          type: 'task_completed',
          targetId: 'mt-moon-dead-end-1',
        },
        criteria: [
          {
            type: 'battle_result',
            targetId: 'mt-moon-1f',
            battleStatus: 'win',
            count: 5,
          },
        ],
      },
      {
        id: 'bug-catcher-robby',
        visibleRequirement: {
          type: 'battle_result',
          targetId: 'super-nerd-jovan',
          battleStatus: 'win',
          count: 1,
        },
        criteria: [
          {
            type: 'battle_result',
            targetId: 'mt-moon-1f',
            battleStatus: 'win',
            count: 6,
          },
        ],
      },
      {
        id: 'lass-miriam',
        visibleRequirement: {
          type: 'battle_result',
          targetId: 'bug-catcher-robby',
          battleStatus: 'win',
          count: 1,
        },
        criteria: [
          {
            type: 'battle_result',
            targetId: 'mt-moon-1f',
            battleStatus: 'win',
            count: 7,
          },
          {
            type: 'location_encounter_result',
            targetId: 'exp-mt-moon-1f',
            battleStatus: 'win',
            count: 5,
          },
        ],
      },
      {
        id: 'mt-moon-grunt-3',
        visibleRequirement: {
          type: 'task_completed',
          targetId: 'mt-moon-ladder-e',
        },
        criteria: [
          {
            type: 'battle_result',
            targetId: 'mt-moon-b2f',
            battleStatus: 'win',
            count: 3,
          },
          {
            type: 'location_encounter_result',
            targetId: 'exp-mt-moon-b2f',
            battleStatus: 'win',
            count: 3,
          },
        ],
      },
      {
        id: 'mt-moon-grunt-4',
        visibleRequirement: {
          type: 'battle_result',
          targetId: 'mt-moon-grunt-3',
          battleStatus: 'win',
          count: 1,
        },
        criteria: [
          {
            type: 'battle_result',
            targetId: 'mt-moon-b2f',
            battleStatus: 'win',
            count: 5,
          },
          {
            type: 'location_encounter_result',
            targetId: 'exp-mt-moon-b2f',
            battleStatus: 'win',
            count: 5,
          },
        ],
      },
    ] as const

    for (const { id, visibleRequirement, criteria } of trainerGates) {
      const trainer = battles.find((entry) => entry.id === id)
      expect(trainer?.requirements).toContainEqual({
        type: 'battle_result',
        targetId: id,
        battleStatus: 'win',
        count: 1,
        inverse: true,
      })
      expect(trainer?.requirements).toContainEqual(visibleRequirement)
      for (const criterion of criteria) {
        expect(trainer?.criteria).toContainEqual(criterion)
        expect(trainer?.requirements).not.toContainEqual(criterion)
      }
    }
  })

  test('Rock Tunnel Flash studies, Study notes, caches, and tutor are gated correctly', () => {
    const lightTask = tasks.find(
      (entry) => entry.id === 'rock-tunnel-light-the-way',
    )
    const echoMaps = allGames.filter(
      (entry) =>
        entry.gameType === 'rock-tunnel-echo-map' &&
        entry.subCategory === 'Rock Tunnel',
    )
    const cacheExpectations = [
      [
        'rock-tunnel-dead-end-supplies',
        'rock-tunnel-b1f-se-field-observation',
        'battle-potion',
        5,
      ],
      [
        'rock-tunnel-escape-rope-cache',
        'rock-tunnel-1f-west-field-observation',
        'escape-rope',
        5,
      ],
      [
        'rock-tunnel-bright-cache',
        'rock-tunnel-b1f-nw-field-observation',
        'metal-scrap-t1',
        20,
      ],
      [
        'rock-tunnel-mushroom-cache',
        'rock-tunnel-1f-south-field-observation',
        'tiny-mushroom',
        3,
      ],
    ] as const
    const studyNoteTasks = [
      ['rock-tunnel-geodude-ladder', 'rock-tunnel-1f-ne-field-observation'],
      ['rock-tunnel-onix-crystal', 'rock-tunnel-b1f-se-field-observation'],
      [
        'rock-tunnel-machop-arm-wrestle',
        'rock-tunnel-1f-west-field-observation',
      ],
      ['rock-tunnel-zubat-again', 'rock-tunnel-b1f-nw-field-observation'],
      ['rock-tunnel-mankey-echo', 'rock-tunnel-1f-south-field-observation'],
    ] as const
    const sectionUnlocks = [
      [
        'exp-rock-tunnel-1f-ne',
        'rock-tunnel-1f-ne',
        'rock-tunnel-1f-ne-field-observation',
        'rock-tunnel-echo-map-entrance',
      ],
      [
        'exp-rock-tunnel-b1f-se',
        'rock-tunnel-b1f-se',
        'rock-tunnel-b1f-se-field-observation',
        'rock-tunnel-echo-map-southeast',
      ],
      [
        'exp-rock-tunnel-1f-west',
        'rock-tunnel-1f-west',
        'rock-tunnel-1f-west-field-observation',
        'rock-tunnel-echo-map-west',
      ],
      [
        'exp-rock-tunnel-b1f-nw',
        'rock-tunnel-b1f-nw',
        'rock-tunnel-b1f-nw-field-observation',
        'rock-tunnel-echo-map-northwest',
      ],
      [
        'exp-rock-tunnel-1f-south',
        'rock-tunnel-1f-south',
        'rock-tunnel-1f-south-field-observation',
        'rock-tunnel-echo-map-final-corridor',
      ],
    ] as const
    const totemDrops = [
      [
        'exp-rock-tunnel-1f-ne',
        'rock-tunnel-1f-ne',
        'rock-tunnel-1f-ne-field-observation',
        'onix-totem-1',
      ],
      [
        'exp-rock-tunnel-b1f-se',
        'rock-tunnel-b1f-se',
        'rock-tunnel-b1f-se-field-observation',
        'onix-totem-2',
      ],
      [
        'exp-rock-tunnel-1f-west',
        'rock-tunnel-1f-west',
        'rock-tunnel-1f-west-field-observation',
        'onix-totem-3',
      ],
      [
        'exp-rock-tunnel-b1f-nw',
        'rock-tunnel-b1f-nw',
        'rock-tunnel-b1f-nw-field-observation',
        'onix-totem-4',
      ],
      [
        'exp-rock-tunnel-1f-south',
        'rock-tunnel-1f-south',
        'rock-tunnel-1f-south-field-observation',
        'onix-totem-5',
      ],
    ] as const
    const initialTrainerUnlocks = [
      ['rock-tunnel-pokemaniac-ashton', 'rock-tunnel-echo-map-entrance'],
      ['rock-tunnel-pokemaniac-winston', 'rock-tunnel-echo-map-southeast'],
      ['rock-tunnel-hiker-lenny', 'rock-tunnel-echo-map-west'],
      ['rock-tunnel-picnicker-sofia', 'rock-tunnel-echo-map-northwest'],
      ['rock-tunnel-picnicker-leah', 'rock-tunnel-echo-map-final-corridor'],
    ] as const
    const trainerProgressionGates = [
      [
        'rock-tunnel-picnicker-martha',
        'rock-tunnel-pokemaniac-winston',
        'exp-rock-tunnel-b1f-se',
        'rock-tunnel-b1f-se',
        1,
      ],
      [
        'rock-tunnel-pokemaniac-steve',
        'rock-tunnel-picnicker-martha',
        'exp-rock-tunnel-b1f-se',
        'rock-tunnel-b1f-se',
        2,
      ],
      [
        'rock-tunnel-hiker-allen',
        'rock-tunnel-pokemaniac-steve',
        'exp-rock-tunnel-b1f-se',
        'rock-tunnel-b1f-se',
        3,
      ],
      [
        'rock-tunnel-hiker-eric',
        'rock-tunnel-hiker-allen',
        'exp-rock-tunnel-b1f-se',
        'rock-tunnel-b1f-se',
        4,
      ],
      [
        'rock-tunnel-hiker-oliver',
        'rock-tunnel-hiker-lenny',
        'exp-rock-tunnel-1f-west',
        'rock-tunnel-1f-west',
        2,
      ],
      [
        'rock-tunnel-hiker-lucas',
        'rock-tunnel-hiker-oliver',
        'exp-rock-tunnel-1f-west',
        'rock-tunnel-1f-west',
        3,
      ],
      [
        'rock-tunnel-hiker-dudley',
        'rock-tunnel-picnicker-sofia',
        'exp-rock-tunnel-b1f-nw',
        'rock-tunnel-b1f-nw',
        2,
      ],
      [
        'rock-tunnel-pokemaniac-cooper',
        'rock-tunnel-hiker-dudley',
        'exp-rock-tunnel-b1f-nw',
        'rock-tunnel-b1f-nw',
        3,
      ],
      [
        'rock-tunnel-picnicker-ariana',
        'rock-tunnel-picnicker-leah',
        'exp-rock-tunnel-1f-south',
        'rock-tunnel-1f-south',
        3,
      ],
      [
        'rock-tunnel-picnicker-dana',
        'rock-tunnel-picnicker-ariana',
        'exp-rock-tunnel-1f-south',
        'rock-tunnel-1f-south',
        5,
      ],
    ] as const
    const tutor = tasks.find((entry) => entry.id === 'rock-tunnel-rock-tutor')
    const rumble = tasks.find(
      (entry) => entry.id === 'rock-tunnel-large-rumble',
    )
    const shrine = tasks.find(
      (entry) => entry.id === 'rock-tunnel-mysterious-shrine',
    )
    const chamber = tasks.find(
      (entry) => entry.id === 'rock-tunnel-hidden-chamber',
    )
    const beast = battles.find(
      (entry) => entry.id === 'rock-tunnel-the-beast-below',
    )
    const chamberMining = allGames.find(
      (entry) => entry.id === 'rock-tunnel-hidden-chamber-mining',
    )
    const rockTunnelMap = subCategories['Rock Tunnel']
    const lavenderMap = subCategories['Lavender Town']

    expect(lightTask?.criteria).toContainEqual({
      type: 'item_owned',
      targetId: 'tm-flash',
    })
    expect(lightTask?.criteria).toContainEqual({
      type: 'companion',
      count: 1,
      companionCheck: { type: 'electric' },
    })

    expect(echoMaps.map((entry) => entry.id)).toEqual([
      'rock-tunnel-echo-map-entrance',
      'rock-tunnel-echo-map-southeast',
      'rock-tunnel-echo-map-west',
      'rock-tunnel-echo-map-northwest',
      'rock-tunnel-echo-map-final-corridor',
      'rock-tunnel-echo-map-hidden-chamber',
    ])
    expect(echoMaps.map((entry) => entry.name)).toEqual([
      'Lighting the Entrance',
      'Lighting B1F Southeast',
      'Lighting the Western Path',
      'Lighting B1F Northwest',
      'Lighting the Final Corridor',
      'Lighting the Hidden Chamber',
    ])
    for (const game of echoMaps) {
      expect(game.criteria).toContainEqual({
        type: 'item_owned',
        targetId: 'tm-flash',
      })
      expect(game.criteria).toContainEqual({
        type: 'companion',
        count: 1,
        companionCheck: { type: 'electric' },
      })
      expect(game.rewards).toContainEqual({
        type: 'xp',
        skill: 'catching',
        quantity: expect.any(Number),
        dropChance: 100,
      })
      expect(game.requirements).toContainEqual({
        type: 'research_encounter_result',
        targetId: game.id,
        battleStatus: 'win',
        count: 1,
        inverse: true,
      })
    }

    for (const [locationId, battleId, studyId, echoMapId] of sectionUnlocks) {
      const location = locations.find((entry) => entry.id === locationId)
      const battle = battles.find((entry) => entry.id === battleId)
      const study = allGames.find((entry) => entry.id === studyId)
      const requirement = {
        type: 'research_encounter_result' as const,
        targetId: echoMapId,
        battleStatus: 'win' as const,
        count: 1,
      }

      expect(location?.requirements).toContainEqual(requirement)
      expect(battle?.requirements).toContainEqual(requirement)
      expect(study?.requirements).toContainEqual(requirement)
    }

    for (const [battleId, echoMapId] of initialTrainerUnlocks) {
      const battle = battles.find((entry) => entry.id === battleId)
      expect(battle?.requirements).toContainEqual({
        type: 'research_encounter_result',
        targetId: echoMapId,
        battleStatus: 'win',
        count: 1,
      })
    }

    for (const [
      trainerId,
      previousTrainerId,
      locationId,
      battleId,
      count,
    ] of trainerProgressionGates) {
      const trainer = battles.find((entry) => entry.id === trainerId)
      expect(trainer?.requirements).toContainEqual({
        type: 'battle_result',
        targetId: previousTrainerId,
        battleStatus: 'win',
        count: 1,
      })
      expect(trainer?.criteria).toContainEqual({
        type: 'location_encounter_result',
        targetId: locationId,
        battleStatus: 'win',
        count,
      })
      expect(trainer?.criteria).toContainEqual({
        type: 'battle_result',
        targetId: battleId,
        battleStatus: 'win',
        count,
      })
      expect(trainer?.requirements).not.toContainEqual({
        type: 'location_encounter_result',
        targetId: locationId,
        battleStatus: 'win',
        count,
      })
      expect(trainer?.requirements).not.toContainEqual({
        type: 'battle_result',
        targetId: battleId,
        battleStatus: 'win',
        count,
      })
    }

    for (const [locationId, battleId, studyId, totemId] of totemDrops) {
      const item = items.find((entry) => entry.id === totemId)
      const location = locations.find((entry) => entry.id === locationId)
      const battle = battles.find((entry) => entry.id === battleId)
      const study = allGames.find((entry) => entry.id === studyId)

      expect(item?.spriteId).toBe('lagging-tail')
      expect(item?.category).toBe('key')
      expect(item?.unique).toBe(true)
      expect(location?.rewards).toContainEqual({
        type: 'item',
        targetId: totemId,
        quantity: 1,
        dropChance: 6,
        secret: true,
      })
      expect(battle?.rewards).toContainEqual({
        type: 'item',
        targetId: totemId,
        quantity: 1,
        dropChance: 2,
        secret: true,
      })
      expect((study?.settings as any)?.itemDrops).toContainEqual({
        id: `${totemId}-field-observation`,
        itemId: totemId,
        dropChance: 4,
        secret: true,
      })
      expect(rumble?.requirements).toContainEqual({
        type: 'item_owned',
        targetId: totemId,
        count: 1,
      })
      expect(shrine?.criteria).toContainEqual({
        type: 'item_owned',
        targetId: totemId,
        count: 1,
      })
    }

    expect(shrine?.requirements).toContainEqual({
      type: 'research_encounter_result',
      targetId: 'rock-tunnel-echo-map-hidden-chamber',
      battleStatus: 'win',
      count: 1,
    })
    expect(beast?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'rock-tunnel-mysterious-shrine',
    })
    expect(beast?.levelCap).toBe(25)
    expect(beast?.maxPokemon).toBe(3)
    expect(beast?.enemyTeam).toContainEqual(
      expect.objectContaining({
        speciesId: 208,
        formId: '208',
        level: 40,
        name: 'The Beast',
        shiny: true,
      }),
    )
    expect(beast?.rewards).toEqual(
      expect.arrayContaining([
        { type: 'item', targetId: 'metal-coat', quantity: 1, dropChance: 100 },
        { type: 'xp', skill: 'battling', quantity: 500, dropChance: 100 },
        {
          type: 'pokemon_research_xp',
          targetId: '208',
          quantity: 20,
          dropChance: 100,
        },
      ]),
    )
    expect(chamber?.requirements).toContainEqual({
      type: 'battle_result',
      targetId: 'rock-tunnel-the-beast-below',
      battleStatus: 'win',
      count: 1,
    })
    expect(chamberMining?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'rock-tunnel-hidden-chamber',
    })
    expect(chamberMining?.rewards).toContainEqual({
      type: 'item',
      targetId: 'metal-scrap-t1',
      quantity: { min: 1, max: 2 },
      dropChance: 100,
    })
    expect(chamberMining?.skillXp).toEqual({ skill: 'catching', level: 15 })
    expect(rockTunnelMap.completeRequirements).toContainEqual({
      type: 'task_completed',
      targetId: 'rock-tunnel-exit',
    })
    expect(lavenderMap.unlockRequirements).toContainEqual({
      type: 'task_completed',
      targetId: 'rock-tunnel-exit',
    })

    const expectSecretStudyReward = (
      studyId: string,
      taskId: string,
      count: number,
    ) => {
      const study = allGames.find((entry) => entry.id === studyId)
      expect(study?.rewards).toContainEqual({
        type: 'task_complete',
        targetId: taskId,
        dropChance: 100,
        secret: true,
        requirements: [
          {
            type: 'research_encounter_result',
            targetId: studyId,
            battleStatus: 'win',
            count,
          },
        ],
      })
    }

    for (const [taskId, studyId, itemId, quantity] of cacheExpectations) {
      const task = tasks.find((entry) => entry.id === taskId)
      expect(task?.secret).toBe(true)
      expect(task?.completionTrigger).toBe('auto')
      expect(task?.completeButtonText).toBeUndefined()
      expect(task?.exitModal?.title).toEqual(expect.any(String))
      expect(task?.exitModal?.background).toBe('/backgrounds/cave.avif')
      expect(task?.requirements).toContainEqual({
        type: 'research_encounter_result',
        targetId: studyId,
        battleStatus: 'win',
        count: 5,
      })
      expect(task?.rewards).toContainEqual({
        type: 'item',
        targetId: itemId,
        quantity,
        dropChance: 100,
      })
      expectSecretStudyReward(studyId, taskId, 5)
    }

    for (const [taskId, studyId] of studyNoteTasks) {
      const task = tasks.find((entry) => entry.id === taskId)
      expect(task?.secret).toBe(true)
      expect(task?.completionTrigger).toBe('auto')
      expect(task?.completeButtonText).toBeUndefined()
      expect(task?.requirements).toContainEqual({
        type: 'research_encounter_result',
        targetId: studyId,
        battleStatus: 'win',
        count: 10,
      })
      expectSecretStudyReward(studyId, taskId, 10)
      const researchReward = task?.rewards.find(
        (reward) => reward.type === 'pokemon_research_xp',
      )
      expect(researchReward?.targetId).toEqual(expect.any(String))
      expect(tutor?.requirements).toContainEqual({
        type: 'task_completed',
        targetId: taskId,
      })
    }

    expect(tutor?.requirements).toContainEqual({
      type: 'battle_result',
      targetId: 'rock-tunnel-picnicker-sofia',
      battleStatus: 'win',
      count: 1,
    })
    expect(tutor?.rewards).toContainEqual({
      type: 'item',
      targetId: 'tm-rock-slide',
      quantity: 1,
      dropChance: 100,
    })
  })

  test('Mt Moon Fossil Hunter exposes the Fossil binder card goal before mining and voyages', () => {
    const fossilHunter = tasks.find(
      (entry) => entry.id === 'mt-moon-fossil-hunter',
    )
    const mining = allGames.find((entry) => entry.id === 'mt-moon-mining')
    const voyage = voyages.find((entry) => entry.id === 'mt-moon-fossil-hunt')
    const researcherMiguel = battles.find(
      (entry) => entry.id === 'researcher-miguel',
    )
    const pewterFossilIdentify = allGames.find(
      (entry) => entry.id === 'pewter-fossil-identify',
    )

    expect(fossilHunter?.requirements).toContainEqual({
      type: 'item_owned',
      targetId: 'binder-base3',
    })
    expect(fossilHunter?.criteria).toContainEqual({
      type: 'card_collected_set',
      targetId: 'base3',
      count: 40,
      unique: true,
    })
    expect(fossilHunter?.criteria).toContainEqual({
      type: 'currency_owned',
      targetId: 'pokedollars',
      count: 5000,
      consume: true,
    })
    expect(mining?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'mt-moon-fossil-hunter',
    })
    expect(voyage?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'mt-moon-fossil-hunter',
    })
    expect(researcherMiguel?.requirements).toContainEqual({
      type: 'card_collected_set',
      targetId: 'base3',
      count: 62,
      unique: true,
      inverse: true,
    })
    expect(researcherMiguel?.criteria).toContainEqual({
      type: 'currency_owned',
      targetId: 'crystals',
      count: 20,
      consume: true,
    })
    expect(researcherMiguel?.disableCandyRewards).toBe(true)
    expect(researcherMiguel?.generatedXpMultiplier).toBe(0.5)
    expect(researcherMiguel?.rewards).not.toContainEqual({
      type: 'currency',
      targetId: 'crystals',
      quantity: 20,
      dropChance: 100,
    })
    expect(pewterFossilIdentify?.requirements).toContainEqual({
      type: 'any_of',
      label: 'Fossil research or collection remains',
      conditions: [
        {
          type: 'card_collected_set',
          targetId: 'base3',
          count: 62,
          unique: true,
          inverse: true,
        },
        { type: 'research_level', targetId: '142', count: 1, inverse: true },
        { type: 'research_level', targetId: '140', count: 1, inverse: true },
        { type: 'research_level', targetId: '141', count: 1, inverse: true },
        { type: 'research_level', targetId: '138', count: 1, inverse: true },
        { type: 'research_level', targetId: '139', count: 1, inverse: true },
      ],
    })
    expect((pewterFossilIdentify as any)?.settings?.pokemonPool).toEqual([
      142, 140, 141, 138, 139,
    ])
    expect(
      pewterFossilIdentify?.rewards.filter(
        (reward) => reward.type === 'pokemon_research_xp',
      ),
    ).toEqual([
      {
        type: 'pokemon_research_xp',
        targetId: '142',
        quantity: 1,
        dropChance: 100,
        requirements: [
          { type: 'research_level', targetId: '142', count: 1, inverse: true },
        ],
      },
      {
        type: 'pokemon_research_xp',
        targetId: '140',
        quantity: 1,
        dropChance: 100,
        requirements: [
          { type: 'research_level', targetId: '140', count: 1, inverse: true },
        ],
      },
      {
        type: 'pokemon_research_xp',
        targetId: '141',
        quantity: 1,
        dropChance: 100,
        requirements: [
          { type: 'research_level', targetId: '141', count: 1, inverse: true },
        ],
      },
      {
        type: 'pokemon_research_xp',
        targetId: '138',
        quantity: 1,
        dropChance: 100,
        requirements: [
          { type: 'research_level', targetId: '138', count: 1, inverse: true },
        ],
      },
      {
        type: 'pokemon_research_xp',
        targetId: '139',
        quantity: 1,
        dropChance: 100,
        requirements: [
          { type: 'research_level', targetId: '139', count: 1, inverse: true },
        ],
      },
    ])
    expect(pewterFossilIdentify?.rewards).toContainEqual({
      type: 'item',
      targetId: 'pack-base3',
      quantity: 1,
      dropChance: 100,
      requirements: [
        {
          type: 'item_owned',
          targetId: 'binder-base3',
        },
        {
          type: 'card_collected_set',
          targetId: 'base3',
          count: 62,
          unique: true,
          inverse: true,
        },
      ],
    })
  })

  test('catch encounter shield and flee configs stay bounded', () => {
    const shieldedMewtwoTests = [
      'test-mewtwo-consecutive-shield',
      'test-mewtwo-total-shield',
      'test-mewtwo-regenerating-shield',
    ]

    for (const location of locations) {
      if (location.shield) {
        expect(['consecutive', 'total']).toContain(location.shield.type)
        expect(location.shield.requiredCorrectAnswers).toBeGreaterThan(0)
        expect(location.shield.requiredCorrectAnswers).toBeLessThanOrEqual(100)
        if (location.shield.regenSeconds !== undefined) {
          expect(location.shield.regenSeconds).toBeGreaterThan(0)
          expect(location.shield.regenSeconds).toBeLessThanOrEqual(600)
        }
      }

      if (location.fleeRate !== undefined) {
        expect(location.fleeRate).toBeGreaterThanOrEqual(0)
        expect(location.fleeRate).toBeLessThanOrEqual(100)
      }
    }

    for (const locationId of shieldedMewtwoTests) {
      const location = locations.find((entry) => entry.id === locationId)
      expect(location?.subCategory).toBe('Test')
      expect(location?.encounters).toEqual([
        { speciesId: 150, formId: '150', chance: 100 },
      ])
      expect(location?.shield).toBeDefined()
    }
  })

  test('Route 8 unlocks after the Fuji debrief and gates its encounters and trainers', () => {
    const debrief = tasks.find(
      (entry) => entry.id === 'lavender-fuji-memory-debrief',
    )
    const celadonLead = tasks.find(
      (entry) => entry.id === 'celadon-police-hq-lead',
    )
    const routeUnlock = tasks.find((entry) => entry.id === 'route-8-open-road')
    const routeCatch = locations.find((entry) => entry.id === 'route-8')
    const routeBattle = battles.find((entry) => entry.id === 'route-8-battle')
    const routeStudy = allGames.find(
      (entry) => entry.id === 'route-8-field-observation',
    )
    const route8Trainers = battles.filter((entry) =>
      entry.id.startsWith('route-8-'),
    )

    expect(debrief?.requirements).toContainEqual({
      type: 'any_of',
      label: 'Realisation complete',
      conditions: [
        {
          type: 'task_completed',
          targetId: 'fuji-chronicle-realisation-rocket',
        },
        {
          type: 'task_completed',
          targetId: 'fuji-chronicle-realisation-refuse',
        },
      ],
    })
    expect(celadonLead?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'lavender-fuji-memory-debrief',
    })
    expect(routeUnlock?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'celadon-police-hq-lead',
    })

    const route8Gate = {
      type: 'task_completed',
      targetId: 'route-8-open-road',
    } satisfies TaskCondition
    expect(routeCatch?.requirements).toContainEqual(route8Gate)
    expect(routeBattle?.requirements).toContainEqual(route8Gate)
    expect(routeStudy?.requirements).toContainEqual(route8Gate)
    expect(routeCatch?.icon).toEqual({ type: 'pokemon', id: '37' })
    expect(routeBattle?.icon).toEqual({ type: 'pokemon', id: '37' })
    expect(routeStudy?.icon).toEqual({ type: 'pokemon', id: '37' })
    expect(routeCatch?.rewards).toContainEqual({
      type: 'task_complete',
      targetId: 'dull-beak-recipe',
      dropChance: 12,
    })
    expect(routeCatch?.subCategory).toBe('Lavender Town')
    expect(routeBattle?.subCategory).toBe('Lavender Town')
    expect(routeStudy?.subCategory).toBe('Lavender Town')

    expect(route8Trainers.map((entry) => entry.name).sort()).toEqual([
      'Biker Jaren',
      'Biker Ricardo',
      'Gamer Rich',
      'Gamer Stan',
      'Lass Andrea',
      'Lass Julia',
      'Lass Megan',
      'Lass Paige',
      'Route 8',
      'Super Nerd Aidan',
      'Super Nerd Glenn',
      'Super Nerd Leslie',
      'Twins Eli & Anne',
    ])
    expect(route8Trainers).toHaveLength(13)

    for (const trainer of route8Trainers.filter((entry) => !entry.isWildBattle)) {
      expect(trainer.subCategory).toBe('Lavender Town')
      expect(trainer.requirements).toContainEqual(route8Gate)
      expect(trainer.requirements).toContainEqual({
        type: 'battle_result',
        targetId: trainer.id,
        battleStatus: 'win',
        count: 1,
        inverse: true,
      })
    }
  })

  test('Route 8 Pikablu rumour unlocks Marill after every trainer is defeated', () => {
    const rumour = tasks.find((entry) => entry.id === 'route-8-pikablu-rumour')
    const investigation = tasks.find(
      (entry) => entry.id === 'route-8-pikablu-investigation',
    )
    const confirmation = tasks.find(
      (entry) => entry.id === 'route-8-pikablu-confirmed',
    )
    const route8 = locations.find((entry) => entry.id === 'route-8')
    const marill = route8?.encounters.find((entry) => entry.speciesId === 183)
    const route8TrainerIds = [
      'route-8-lass-julia',
      'route-8-gamer-rich',
      'route-8-super-nerd-glenn',
      'route-8-twins-eli-anne',
      'route-8-lass-paige',
      'route-8-super-nerd-leslie',
      'route-8-lass-andrea',
      'route-8-lass-megan',
      'route-8-biker-jaren',
      'route-8-biker-ricardo',
      'route-8-gamer-stan',
      'route-8-super-nerd-aidan',
    ]

    expect(rumour?.requirements).toEqual(
      expect.arrayContaining([
        { type: 'task_completed', targetId: 'route-8-open-road' },
        ...route8TrainerIds.map((targetId) => ({
          type: 'battle_result',
          targetId,
          battleStatus: 'win',
          count: 1,
        })),
      ]),
    )
    expect(investigation?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-8-pikablu-rumour',
    })
    expect(investigation?.criteria).toEqual(
      expect.arrayContaining([
        {
          type: 'location_encounter_result',
          targetId: 'route-8',
          count: 10,
        },
        {
          type: 'research_encounter_result',
          targetId: 'route-8-field-observation',
          count: 20,
        },
      ]),
    )
    expect(confirmation?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-8-pikablu-investigation',
    })
    expect(marill).toEqual({
      speciesId: 183,
      formId: '183',
      chance: 5,
      requirements: [
        {
          type: 'task_completed',
          targetId: 'route-8-pikablu-confirmed',
        },
      ],
      secret: true,
    })
    expect(
      route8?.encounters.reduce((total, encounter) => total + encounter.chance, 0),
    ).toBe(100)
  })

  test('Underground Path from Route 8 opens Route 7 and gates Celadon arrival', () => {
    const undergroundPath = tasks.find(
      (entry) => entry.id === 'underground-path-route-8',
    )
    const routeCatch = locations.find((entry) => entry.id === 'route-7')
    const routeBattle = battles.find((entry) => entry.id === 'route-7-battle')
    const routeStudy = allGames.find(
      (entry) => entry.id === 'route-7-field-observation',
    )
    const celadonArrival = tasks.find(
      (entry) => entry.id === 'explore-celadon-city',
    )
    const thirstierWork = tasks.find(
      (entry) => entry.id === 'thirstier-work-route-7',
    )
    const celadonMap = subCategories['Celadon City']

    expect(undergroundPath?.subCategory).toBe('Lavender Town')
    expect(undergroundPath?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'route-8-open-road',
    })
    expect(undergroundPath?.criteria).toEqual(
      expect.arrayContaining([
        {
          type: 'skill_level',
          targetId: 'catching',
          count: 25,
        },
        {
          type: 'battle_result',
          targetId: 'route-8-battle',
          battleStatus: 'win',
          count: 3,
        },
        {
          type: 'location_encounter_result',
          targetId: 'route-8',
          count: 3,
        },
        {
          type: 'research_encounter_result',
          targetId: 'route-8-field-observation',
          count: 1,
        },
        {
          type: 'battle_result',
          targetId: 'route-8-biker-jaren',
          battleStatus: 'win',
          count: 1,
        },
        {
          type: 'battle_result',
          targetId: 'route-8-biker-ricardo',
          battleStatus: 'win',
          count: 1,
        },
      ]),
    )

    const route7Gate = {
      type: 'task_completed',
      targetId: 'underground-path-route-8',
    } satisfies TaskCondition
    expect(celadonMap?.unlockRequirements).toContainEqual(route7Gate)
    expect(routeCatch?.requirements).toContainEqual(route7Gate)
    expect(routeBattle?.requirements).toContainEqual(route7Gate)
    expect(routeStudy?.requirements).toContainEqual(route7Gate)
    expect(routeCatch?.subCategory).toBe('Celadon City')
    expect(routeBattle?.subCategory).toBe('Celadon City')
    expect(routeStudy?.subCategory).toBe('Celadon City')

    expect(thirstierWork?.subCategory).toBe('Celadon City')
    expect(thirstierWork?.daily).toBe(true)
    expect(thirstierWork?.requirements).toEqual(
      expect.arrayContaining([
        route7Gate,
        {
          type: 'daily_not_completed',
          targetId: 'thirstier-work-route-7',
        },
      ]),
    )
    expect(thirstierWork?.criteria).toContainEqual({
      type: 'item_owned',
      targetId: 'soda-pop',
      count: 1,
      consume: true,
    })
    expect(thirstierWork?.rewards).toContainEqual({
      type: 'item',
      targetId: 'great-ball',
      quantity: 2,
    })

    for (const speciesId of [58, 37]) {
      const studyTask = tasks.find(
        (entry) => entry.id === `route-7-${speciesId === 58 ? 'growlithe' : 'vulpix'}-study`,
      )
      expect(studyTask?.requirements).toContainEqual({
        type: 'pokedex_caught_specific',
        targetId: speciesId,
        count: 1,
      })
      expect(studyTask?.rewards).toContainEqual({
        type: 'pokemon_research_xp',
        targetId: String(speciesId),
        quantity: 30,
        dropChance: 100,
      })
      expect(routeStudy?.rewards).toContainEqual({
        type: 'task_complete',
        targetId: studyTask?.id,
        dropChance: 10,
        secret: true,
        requirements: [
          {
            type: 'research_encounter_result',
            targetId: 'route-7-field-observation',
            battleStatus: 'win',
            count: 1,
          },
        ],
      })
    }

    expect(celadonArrival?.requirements).toContainEqual(route7Gate)
    expect(celadonArrival?.criteria).toEqual(
      expect.arrayContaining([
        {
          type: 'battle_result',
          targetId: 'route-7-battle',
          battleStatus: 'win',
          count: 3,
        },
        {
          type: 'location_encounter_result',
          targetId: 'route-7',
          count: 3,
        },
        {
          type: 'research_encounter_result',
          targetId: 'route-7-field-observation',
          count: 1,
        },
      ]),
    )
  })
})
