import { describe, expect, test } from 'bun:test'
import { battles } from '@/data/battles'
import { currencies } from '@/data/currencies'
import { expeditions } from '@/data/expeditions'
import { fishingGames } from '@/data/games/fishing'
import { fieldObservationGames } from '@/data/games/field-observation'
import { identifyEntries } from '@/data/games/identify'
import { basicEntries } from '@/data/games/rock-push'
import { items } from '@/data/items'
import { locations } from '@/data/locations'
import { getMove } from '@/data/moves'
import { celadonGameCornerShops } from '@/data/shops/entries/celadon-game-corner'
import { safariZoneShops } from '@/data/shops/entries/safari-zone'
import { subCategories } from '@/data/sub-region-map'
import { tasks } from '@/data/tasks'
import { getIcon } from '@/data/user/icons'
import { getTitle } from '@/data/user/titles'
import {
  safariExtraTaskPoolIds,
  safariExpeditionContentTasks,
  safariItemTaskPoolIds,
  safariResearchTaskPoolIds,
} from '@/data/tasks/entries/safari-zone-expedition'
import { buildExpeditionSteps } from '@/utilities/expeditions/path-builder'
import type { RequirementData } from '@/utilities/requirements'

function mazeHasRoute(gameId: string) {
  const game = basicEntries.find((entry) => entry.id === gameId)
  if (!game) return false
  const size = game.settings.grid_size || 8
  const blocked = new Set(
    (game.settings.barriers || []).map(({ x, y }) => `${x}:${y}`),
  )
  const goals = new Set(
    (game.settings.winTiles || []).map(({ x, y }) => `${x}:${y}`),
  )
  const queue = [game.settings.playerStart]
  const seen = new Set([`${queue[0].x}:${queue[0].y}`])

  while (queue.length) {
    const current = queue.shift()!
    if (goals.has(`${current.x}:${current.y}`)) return true
    for (const [dx, dy] of [
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ]) {
      const x = current.x + dx
      const y = current.y + dy
      const key = `${x}:${y}`
      if (x <= 0 || y <= 0 || x >= size - 1 || y >= size - 1) continue
      if (blocked.has(key) || seen.has(key)) continue
      seen.add(key)
      queue.push({ x, y })
    }
  }
  return false
}

describe('Fuchsia Gym and Safari progression', () => {
  test('the Empty Gym handoff unlocks the Safari Zone and its entry task', () => {
    const emptyGymRequirement = {
      type: 'task_completed' as const,
      targetId: 'fuchsia-gym-search-for-koga',
    }

    expect(subCategories['Safari Zone']?.unlockRequirements).toContainEqual(
      emptyGymRequirement,
    )
    expect(
      tasks.find((task) => task.id === 'safari-zone-entry-denied')
        ?.requirements,
    ).toContainEqual(emptyGymRequirement)
  })

  test('Safari admission paces the Ranger, detective, credentials, exam, and fee', () => {
    const taskChain = [
      ['safari-zone-entry-denied', 'fuchsia-gym-search-for-koga'],
      ['safari-zone-report-to-ray', 'safari-zone-entry-denied'],
      ['fuchsia-research-institute-enquiry', 'safari-zone-report-to-ray'],
      [
        'fuchsia-research-institute-credentials',
        'fuchsia-research-institute-enquiry',
      ],
      [
        'fuchsia-research-institute-exam-briefing',
        'fuchsia-research-institute-credentials',
      ],
      [
        'fuchsia-research-institute-exam-results',
        'fuchsia-research-institute-exam-briefing',
      ],
      [
        'fuchsia-research-institute-membership',
        'fuchsia-research-institute-exam-results',
      ],
      ['safari-zone-search-begins', 'fuchsia-research-institute-membership'],
    ]

    for (const [taskId, priorTaskId] of taskChain) {
      const task = tasks.find((entry) => entry.id === taskId)
      expect(task, taskId).toBeDefined()
      expect(task?.secret, taskId).toBe(false)
      expect(task?.requirements, taskId).toContainEqual({
        type: 'task_completed',
        targetId: priorTaskId,
      })
    }

    expect(
      tasks.find((task) => task.id === 'fuchsia-research-institute-credentials')
        ?.criteria,
    ).toEqual([{ type: 'skill_level', targetId: 'researching', count: 30 }])
    expect(
      tasks.find(
        (task) => task.id === 'fuchsia-research-institute-exam-results',
      )?.criteria,
    ).toEqual([
      {
        type: 'game_result',
        targetId: 'fuchsia-research-institute-identify',
        battleStatus: 'win',
        count: 1,
      },
    ])
    expect(
      tasks.find((task) => task.id === 'fuchsia-research-institute-membership')
        ?.criteria,
    ).toEqual([
      {
        type: 'currency_owned',
        targetId: 'pokedollars',
        count: 2000,
        consume: true,
      },
    ])

    const exam = identifyEntries.find(
      (entry) => entry.id === 'fuchsia-research-institute-identify',
    )
    expect(exam?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'fuchsia-research-institute-exam-briefing',
    })
    expect(exam?.requirements).toContainEqual({
      type: 'game_result',
      targetId: 'fuchsia-research-institute-identify',
      battleStatus: 'win',
      count: 1,
      inverse: true,
    })
    expect(exam?.settings).toMatchObject({
      optionCount: 6,
      timeLimit: 35,
      winRate: 20,
    })

    const admissionProse = JSON.stringify(
      taskChain.map(([taskId]) => tasks.find((task) => task.id === taskId)),
    )
    expect(admissionProse).toContain('Only Chartered Researchers may enter')
    expect(admissionProse).toContain(
      'Are you a member of the Fuchsia Research Institute?',
    )
    expect(admissionProse).toContain('We do not issue visitor passes')
    expect(admissionProse).toContain('We will take each step in order')
    expect(admissionProse).toContain(
      'substantial record of independent fieldwork',
    )
    expect(admissionProse).not.toContain('Researcher level')
    expect(admissionProse).not.toContain('level 30')
    expect(admissionProse).toContain('Ray needs to hear this')
    expect(admissionProse).toContain(
      'My research record should speak for itself',
    )
    expect(admissionProse).toContain('No pressure... I hope')
    expect(admissionProse).toContain('The Institute should have their records')
    expect(admissionProse).not.toContain('Visit the Fuchsia Research Institute')
    expect(admissionProse).not.toContain('Pay the 2,000 PokéDollar')
    expect(admissionProse).not.toContain('locked gate with paperwork')
    expect(admissionProse).toContain('You passed')
    expect(admissionProse).toContain('Pay 2,000 PokéDollars')
  })

  test('Koga Gym uses the FRLG trainers around solvable invisible mazes', () => {
    const trial = expeditions.find(
      (entry) => entry.id === 'fuchsia-gym-trial-expedition',
    )
    expect(
      trial?.path.map((node) =>
        node.type === 'activity' ? node.activityType : node.type,
      ),
    ).toEqual([
      'battle',
      'battle',
      'game',
      'battle',
      'battle',
      'game',
      'battle',
      'battle',
      'battle',
      'task',
    ])

    const battleIds = [
      'fuchsia-gym-juggler-nate',
      'fuchsia-gym-juggler-kayden',
      'fuchsia-gym-juggler-kirk',
      'fuchsia-gym-tamer-edgar',
      'fuchsia-gym-tamer-phil',
      'fuchsia-gym-juggler-shawn',
      'fuchsia-gym-leader-koga',
    ]
    expect(
      battleIds.map(
        (id) =>
          battles.find((battle) => battle.id === id)?.playerTeamInitialStatus,
      ),
    ).toEqual(Array(7).fill('poison'))
    expect(trial?.maxLosses).toBe(3)
    expect(
      battleIds.map(
        (id) => battles.find((battle) => battle.id === id)?.levelCap,
      ),
    ).toEqual(Array(7).fill(40))

    const canonicalTrainers = [
      {
        id: 'fuchsia-gym-juggler-nate',
        trainerClassId: 'juggler',
        team: [
          [96, 34],
          [64, 34],
        ],
      },
      {
        id: 'fuchsia-gym-juggler-kayden',
        trainerClassId: 'juggler',
        team: [[97, 38]],
      },
      {
        id: 'fuchsia-gym-juggler-kirk',
        trainerClassId: 'juggler',
        team: [
          [96, 31],
          [96, 31],
          [64, 31],
          [96, 31],
        ],
      },
      {
        id: 'fuchsia-gym-tamer-edgar',
        trainerClassId: 'tamer',
        team: [
          [24, 33],
          [24, 33],
          [28, 33],
        ],
      },
      {
        id: 'fuchsia-gym-tamer-phil',
        trainerClassId: 'tamer',
        team: [
          [28, 34],
          [24, 34],
        ],
      },
      {
        id: 'fuchsia-gym-juggler-shawn',
        trainerClassId: 'juggler',
        team: [
          [96, 34],
          [97, 34],
        ],
      },
    ]
    for (const expected of canonicalTrainers) {
      const battle = battles.find((entry) => entry.id === expected.id)
      expect(battle?.trainerClassId).toBe(expected.trainerClassId)
      expect(
        battle?.enemyTeam.map((pokemon) => [pokemon.speciesId, pokemon.level]),
      ).toEqual(expected.team)
    }
    expect(battles.some((entry) => entry.id === 'fuchsia-gym-ninja-koji')).toBe(
      false,
    )
    expect(battles.some((entry) => entry.id === 'fuchsia-gym-ninja-aya')).toBe(
      false,
    )

    for (const gameId of [
      'fuchsia-gym-invisible-maze-one',
      'fuchsia-gym-invisible-maze-two',
    ]) {
      expect(
        basicEntries.find((entry) => entry.id === gameId)?.settings
          .invisibleMaze,
      ).toBe(true)
      expect(mazeHasRoute(gameId), gameId).toBe(true)
    }
  })

  test('Koga grants Swift Poison, the Gym Challenge binder, and a matching daily', () => {
    const trial = expeditions.find(
      (entry) => entry.id === 'fuchsia-gym-trial-expedition',
    )
    expect(trial?.rewards).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'item',
          targetId: 'tm-swift-poison',
          quantity: 1,
        }),
        expect.objectContaining({
          type: 'item',
          targetId: 'binder-gym2',
          quantity: 1,
        }),
      ]),
    )
    expect(
      trial?.rewards.some((reward) => reward.targetId === 'tm-toxic'),
    ).toBe(false)
    expect(items.some((item) => item.id === 'tm-swift-poison')).toBe(true)
    expect(items.some((item) => item.id === 'binder-gym2')).toBe(true)
    expect(
      tasks.find((task) => task.id === 'fuchsia-gym-koga-rewards')?.icon,
    ).toEqual({ type: 'item', id: 'badge-kanto-soul' })

    const swiftPoison = getMove('swift-poison')
    expect(swiftPoison).toMatchObject({
      stance: 'speed',
      forcedType: 'poison',
      damage: 0.2,
      accuracy: 90,
      status: { id: 'poison', chance: 100, target: 'enemy' },
      contest: {
        attackerMetric: 'effective-stat:speed',
        defenderMetric: 'effective-stat:speed',
        comparison: 'greaterThan',
        success: { preventCounter: true },
        failure: { failMove: true, damageMultiplier: 0 },
      },
    })

    const daily = tasks.find(
      (task) => task.id === 'koga-daily-antidote-practice',
    )
    expect(daily?.daily).toBe(true)
    expect(daily?.criteria).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'item_owned',
          targetId: 'toxic-resin-t1',
          count: 5,
          consume: true,
        }),
        expect.objectContaining({
          type: 'currency_owned',
          targetId: 'crystals',
          count: 20,
          consume: true,
        }),
      ]),
    )
    const packRewards =
      daily?.rewards.filter(
        (reward) => reward.type === 'item' && reward.targetId === 'pack-gym2',
      ) ?? []
    expect(packRewards).toHaveLength(2)
    expect(packRewards[1]?.requirements).toContainEqual({
      type: 'expedition_result',
      targetId: 'koga-soul-badge-chronicle',
      expeditionStatus: 'completed',
      count: 1,
    })
    expect(
      daily?.rewards.filter(
        (reward) =>
          reward.type === 'currency' && reward.targetId === 'league-ticket',
      ),
    ).toHaveLength(2)
  })

  test('Safari uses one long four-area expedition with canonical encounter pools', () => {
    const safariLocations = locations.filter((entry) =>
      ['central', 'east', 'west', 'north'].some(
        (area) => entry.id === `safari-${area}-catch`,
      ),
    )
    expect(safariLocations).toHaveLength(4)
    expect(
      safariLocations.every((entry) => entry.encounterMode === 'safari'),
    ).toBe(true)
    expect(
      safariLocations.every((entry) => entry.expeditionOnly === true),
    ).toBe(true)
    expect(safariLocations.every((entry) => entry.category === 'Secret')).toBe(
      true,
    )

    const canonicalSpecies = new Map([
      ['central', [29, 30, 32, 33, 46, 47, 48, 102, 111, 113, 114, 123, 127]],
      [
        'east',
        [29, 30, 32, 33, 46, 47, 84, 102, 104, 105, 113, 115, 123, 127, 128],
      ],
      ['west', [29, 30, 32, 33, 48, 49, 84, 102, 104, 105, 114, 115, 127, 128]],
      [
        'north',
        [29, 30, 32, 33, 46, 49, 102, 104, 111, 113, 115, 123, 127, 128],
      ],
    ])
    for (const [area, speciesIds] of canonicalSpecies) {
      const location = locations.find(
        (entry) => entry.id === `safari-${area}-catch`,
      )
      const study = fieldObservationGames.find(
        (entry) => entry.id === `safari-${area}-field-observation`,
      )
      expect(
        location?.encounters
          .map((encounter) => encounter.speciesId)
          .sort((a, b) => a - b),
        area,
      ).toEqual(speciesIds)
      expect(
        study?.settings.pokemonPool
          .map((pokemon) => pokemon.speciesId)
          .sort((a, b) => a - b),
        area,
      ).toEqual(speciesIds)
      expect(
        location?.encounters.reduce(
          (total, encounter) => total + encounter.chance,
          0,
        ),
        area,
      ).toBe(100)
      expect(
        study?.settings.pokemonPool.reduce(
          (total, pokemon) => total + pokemon.weight,
          0,
        ),
        area,
      ).toBe(100)
    }

    const expedition = expeditions.find(
      (entry) => entry.id === 'safari-zone-grand-expedition',
    )
    expect(expedition).toBeDefined()
    expect(
      expeditions.filter((entry) => entry.id.startsWith('safari-')),
    ).toHaveLength(3)
    expect(expedition?.maxLosses).toBe(10)
    expect(expedition?.safariBallAllowance).toBe(30)
    expect(expedition?.requirements).toContainEqual({
      type: 'item_owned',
      targetId: 'safari-catching-permit',
    })
    expect(expedition?.criteria).toContainEqual({
      type: 'currency_owned',
      targetId: 'pokedollars',
      count: 500,
      consume: true,
    })
    const generatedSteps = buildExpeditionSteps(expedition!, {
      inventory: [{ itemId: 'safari-catching-permit', quantity: 1 }],
      completedTasks: [],
    } as unknown as RequirementData)
    expect(generatedSteps.length).toBe(36)
    expect(
      generatedSteps.filter((step) => step.activityType === 'field-research'),
    ).toHaveLength(8)
    expect(
      generatedSteps.filter((step) => step.activityType === 'location'),
    ).toHaveLength(10)
    expect(generatedSteps[34]?.activityId).toBe('safari-grand-finale-catch')
    const rewardTaskSteps = generatedSteps.filter(
      (step) => step.activityType === 'task',
    )
    expect(rewardTaskSteps.length).toBeGreaterThanOrEqual(14)
    expect(rewardTaskSteps.length).toBeLessThanOrEqual(18)
    expect(
      rewardTaskSteps.every((step) => step.secret === true),
    ).toBe(true)
    expect(
      expedition?.taskPools?.['safari-rewards'].map((entry) => entry.id),
    ).toEqual(expect.arrayContaining([
      'safari-research-29-common',
      'safari-item-poke-ball-cache',
      'safari-flavor-central-a-ranger-s-chalk-mark',
    ]))
    expect(Object.keys(expedition?.taskPools || {})).toEqual([
      'safari-rewards',
    ])

    const postStrengthSteps = buildExpeditionSteps(expedition!, {
      inventory: [
        { itemId: 'safari-catching-permit', quantity: 1 },
        { itemId: 'tm-strength', quantity: 1 },
      ],
      completedTasks: [],
    } as unknown as RequirementData)
    expect(postStrengthSteps.length).toBe(36)
    expect(
      postStrengthSteps.filter(
        (step) => step.activityType === 'field-research',
      ),
    ).toHaveLength(8)
    expect(
      postStrengthSteps.filter((step) => step.activityType === 'location'),
    ).toHaveLength(10)
    expect(postStrengthSteps[34]?.activityId).toBe('safari-grand-finale-catch')
    const finale = locations.find(
      (entry) => entry.id === 'safari-grand-finale-catch',
    )
    expect(finale?.name).toBe('Safari Reserve')
    expect(finale?.description).not.toMatch(/Strength|prized|finale/i)
    expect(finale?.encounters).toHaveLength(5)
    expect(
      finale?.encounters
        .map((encounter) => encounter.speciesId)
        .sort((a, b) => a - b),
    ).toEqual([113, 115, 123, 127, 128])
    expect(finale?.encounters.every((encounter) => !encounter.requirements)).toBe(true)
    expect(finale?.encounters.reduce((total, encounter) => total + encounter.chance, 0)).toBe(100)
    expect(expedition?.rewards).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          type: 'xp',
          skill: 'researching',
          quantity: 1000,
        }),
        expect.objectContaining({
          type: 'xp',
          skill: 'catching',
          quantity: 1000,
        }),
        expect.objectContaining({
          type: 'item',
          targetId: 'tm-strength',
          secret: true,
        }),
      ]),
    )
    expect(JSON.stringify(expedition?.path)).toContain('rocket-poacher')

    const catchingExpedition = expeditions.find(
      (entry) => entry.id === 'safari-zone-catching-expedition',
    )
    expect(catchingExpedition?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'safari-explorers-research-notes',
    })
    expect(catchingExpedition?.requirements).not.toContainEqual(
      expect.objectContaining({ targetId: 'safari-zone-grand-expedition' }),
    )
    expect(catchingExpedition?.safariBallAllowance).toBe(30)
    expect(catchingExpedition?.criteria).toContainEqual({
      type: 'currency_owned',
      targetId: 'pokedollars',
      count: 500,
      consume: true,
    })
    const catchingSteps = buildExpeditionSteps(catchingExpedition!, {
      inventory: [{ itemId: 'safari-catching-permit', quantity: 1 }],
      completedTasks: [],
      expeditionResults: [
        {
          expeditionId: 'safari-zone-grand-expedition',
          wins: 1,
          losses: 0,
        },
      ],
    } as unknown as RequirementData)
    expect(catchingSteps).toHaveLength(9)
    expect(catchingSteps.every((step) => step.activityType === 'location')).toBe(true)
    expect(catchingSteps.slice(0, 8).map((step) => step.activityId)).toEqual([
      'safari-central-catch',
      'safari-central-catch',
      'safari-east-catch',
      'safari-east-catch',
      'safari-west-catch',
      'safari-west-catch',
      'safari-north-catch',
      'safari-north-catch',
    ])
    expect(catchingSteps[8]?.activityId).toBe('safari-grand-finale-catch')
    expect(catchingExpedition?.rewards).toEqual([
      { type: 'xp', skill: 'catching', quantity: 500, dropChance: 100 },
    ])

    const fishingExpedition = expeditions.find(
      (entry) => entry.id === 'safari-zone-fishing-expedition',
    )
    expect(fishingExpedition?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'safari-fishing-research-notes',
    })
    expect(fishingExpedition?.criteria).toEqual([
      expect.objectContaining({ type: 'currency_owned', count: 500, consume: true }),
      { type: 'item_owned', targetId: 'old-rod' },
      { type: 'item_owned', targetId: 'good-rod' },
      { type: 'item_owned', targetId: 'super-rod' },
    ])
    expect(fishingExpedition?.safariBallAllowance).toBe(30)
    const fishingSteps = buildExpeditionSteps(fishingExpedition!, {
      inventory: [
        { itemId: 'safari-catching-permit', quantity: 1 },
        { itemId: 'old-rod', quantity: 1 },
        { itemId: 'good-rod', quantity: 1 },
        { itemId: 'super-rod', quantity: 1 },
      ],
      completedTasks: [],
      expeditionResults: [
        {
          expeditionId: 'safari-zone-grand-expedition',
          wins: 1,
          losses: 0,
        },
      ],
    } as unknown as RequirementData)
    expect(fishingSteps).toHaveLength(10)
    expect(fishingSteps.every((step) => step.activityType === 'location')).toBe(true)
    expect(new Set(fishingSteps.map((step) => step.activityId))).toEqual(
      new Set(['safari-fishing-expedition-catch']),
    )
    expect(fishingExpedition?.rewards).toEqual([
      { type: 'xp', skill: 'catching', quantity: 500, dropChance: 100 },
    ])
    const fishingLocation = locations.find(
      (entry) => entry.id === 'safari-fishing-expedition-catch',
    )
    expect(fishingLocation?.encounterMode).toBe('safari')
    expect(fishingLocation?.expeditionOnly).toBe(true)
    expect(fishingLocation?.encounters.map((entry) => entry.speciesId).sort((a, b) => a - b)).toEqual([
      54, 60, 79, 98, 118, 129, 147, 148,
    ])
  })

  test('Safari expedition pools sharply reduce research XP and randomize item finds', () => {
    expect(safariResearchTaskPoolIds.common).toHaveLength(19)
    expect(safariResearchTaskPoolIds.uncommon).toHaveLength(19)
    expect(safariResearchTaskPoolIds.rare).toHaveLength(19)

    const researchTasks = safariExpeditionContentTasks.filter((task) =>
      task.id.startsWith('safari-research-'),
    )
    expect(researchTasks).toHaveLength(63)
    expect(researchTasks.every((task) => task.expeditionOnly === true)).toBe(
      true,
    )
    expect(
      researchTasks
        .flatMap((task) => task.rewards.map((reward) => reward.quantity || 0))
        .sort((a, b) => Number(a) - Number(b)),
    ).toEqual([
      ...Array(19).fill(2),
      ...Array(19).fill(10),
      ...Array(25).fill(20),
    ])

    const flavorTasks = safariExpeditionContentTasks.filter((task) =>
      task.id.startsWith('safari-flavor-'),
    )
    expect(flavorTasks).toHaveLength(24)
    expect(
      flavorTasks.every((task) =>
        task.rewards.some(
          (reward) =>
            reward.type === 'xp' &&
            reward.skill === 'researching' &&
            reward.quantity === 50 &&
            reward.dropChance === 100,
        ),
      ),
    ).toBe(true)
    expect(
      flavorTasks.every((task) =>
        task.rewards.some(
          (reward) =>
            reward.type === 'currency' &&
            reward.targetId === 'safari-notes' &&
            reward.quantity === 1 &&
            reward.dropChance === 100,
        ),
      ),
    ).toBe(true)

    const safariTasks = tasks.filter(
      (task) => task.subCategory === 'Safari Zone',
    )
    expect(safariTasks.every((task) => task.icon.type !== 'lucide')).toBe(true)
    expect(
      safariExpeditionContentTasks
        .filter((task) => task.id.startsWith('safari-item-coins-'))
        .every(
          (task) =>
            task.icon.type === 'item' && task.icon.id === 'gimmighoul-coin',
        ),
    ).toBe(true)

    const itemTaskIds = new Set([
      ...safariItemTaskPoolIds.materials,
      ...safariItemTaskPoolIds.balls,
      ...safariItemTaskPoolIds.gems,
      ...safariItemTaskPoolIds.currency,
      ...safariItemTaskPoolIds.safariBalls,
      ...safariItemTaskPoolIds.rare,
      ...safariExtraTaskPoolIds.materials,
      ...safariExtraTaskPoolIds.safariBalls,
      ...safariExtraTaskPoolIds.rare,
    ])
    const itemTasks = safariExpeditionContentTasks.filter((task) =>
      itemTaskIds.has(task.id),
    )
    expect(itemTasks.length).toBeGreaterThan(40)
    expect(
      itemTasks
        .flatMap((task) => task.rewards)
        .every(
          (reward) =>
            reward.dropChance === 100,
        ),
    ).toBe(true)
    expect(
      safariExpeditionContentTasks.find(
        (task) => task.id === 'safari-rare-nugget-find',
      )?.repeatable,
    ).toBe(false)
    const restTasks = safariExpeditionContentTasks.filter((task) =>
      safariExtraTaskPoolIds.rests.includes(task.id),
    )
    expect(restTasks).toHaveLength(3)
    expect(restTasks.map((task) => task.rewards[0])).toEqual([
      { type: 'expedition_lives', quantity: 1, dropChance: 100 },
      { type: 'expedition_lives', quantity: 2, dropChance: 100 },
      { type: 'expedition_lives', quantity: 3, dropChance: 100 },
    ])
    expect(
      safariExpeditionContentTasks.find(
        (task) => task.id === 'safari-rare-metal-seam',
      )?.repeatable,
    ).toBe(false)
  })

  test('Safari encounter actions use authored flick items and hide manual fleeing', async () => {
    const source = await Bun.file(
      'src/app/(frontend)/game/locations/encounter/encounter-client.tsx',
    ).text()

    expect(source).toContain('ItemFlickQte')
    expect(source).toContain('SafariBallControl')
    expect(source).toContain('compact')
    expect(source).toContain('onThrow={handleCapture}')
    expect(source).toContain('SafariOdds')
    expect(source).toContain('repeatable')
    expect(source).toContain("id: 'oran-berry'")
    expect(source).toContain("id: 'tamato-berry'")
    expect(source).not.toContain("id: 'small-stone-t1'")
    expect(source).toContain("encounter.encounterMode !== 'safari'")
    expect(source).not.toContain('Choose Safari Ball')
    expect(source).not.toContain('What will you throw?')
    expect(source).not.toContain('onBeginCapture')
    expect(source).not.toContain("handleSafariAction('bait')")
    expect(source).not.toContain("handleSafariAction('shout')")
  })

  test('Safari Notes progression and Research Credit Store are authored', () => {
    expect(currencies).toContainEqual({
      id: 'safari-notes',
      name: 'Safari Notes',
      iconId: 'researchers-journal-page',
    })
    expect(currencies).toContainEqual({
      id: 'shadow-crystals',
      name: 'Shadow Crystals',
      iconId: 'revive',
      iconHueRotate: 250,
    })
    expect(getIcon('safari-ball')).toBeDefined()
    expect(getTitle('the-warden')?.name).toBe('The Warden')

    const grandExpedition = expeditions.find(
      (entry) => entry.id === 'safari-zone-grand-expedition',
    )
    expect(grandExpedition?.rewards).toContainEqual({
      type: 'currency',
      targetId: 'safari-notes',
      quantity: 10,
      dropChance: 100,
    })

    const responsibility = tasks.find(
      (task) => task.id === 'safari-researcher-responsibility',
    )
    expect(responsibility).toMatchObject({
      name: "A Researcher's Responsibility",
      secret: false,
      requirements: [
        {
          type: 'expedition_result',
          targetId: 'safari-zone-grand-expedition',
          expeditionStatus: 'completed',
          count: 1,
        },
      ],
    })
    expect(responsibility?.exitModal?.message).toContain('jotting down my notes')

    const rewilding = tasks.find((task) => task.id === 'safari-rewilding')
    expect(rewilding?.criteria).toContainEqual(
      expect.objectContaining({
        type: 'pokemon_owned',
        count: 10,
        consume: true,
        pokemonCriteria: { ballType: 'safari-ball' },
      }),
    )
    expect(rewilding?.rewards).toContainEqual({
      type: 'currency',
      targetId: 'safari-notes',
      quantity: 15,
      dropChance: 100,
    })

    const store = safariZoneShops.find(
      (shop) => shop.id === 'safari-zone-research-credit-store',
    )
    expect(store?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'safari-researcher-responsibility',
    })
    expect(store?.items.map((item) => [item.name, item.cost, item.stock])).toEqual([
      ['Safari Ball', [{ type: 'currency', id: 'safari-notes', amount: 30 }], undefined],
      ['Explorers Research Notes', [{ type: 'currency', id: 'safari-notes', amount: 10 }], 1],
      ['Fishing Research Notes', [{ type: 'currency', id: 'safari-notes', amount: 50 }], 1],
      ['Extra Habitat Field Notes', [{ type: 'currency', id: 'safari-notes', amount: 35 }], 1],
      ['Material Deposit Reports', [{ type: 'currency', id: 'safari-notes', amount: 45 }], 1],
      ['Safari Ball Cache Info', [{ type: 'currency', id: 'safari-notes', amount: 55 }], 1],
      ['Unusual Pokémon Sightings', [{ type: 'currency', id: 'safari-notes', amount: 65 }], 1],
      ['Rare Item Rumours', [{ type: 'currency', id: 'safari-notes', amount: 90 }], 1],
      ["Warden's Permit", [{ type: 'currency', id: 'safari-notes', amount: 2000 }], 1],
      ['Stamina Notes', [{ type: 'currency', id: 'safari-notes', amount: 20 }], 5],
      ['Commemorative Safari Ball', [{ type: 'currency', id: 'safari-notes', amount: 1000 }], 1],
      ['Honorary Title', [{ type: 'currency', id: 'safari-notes', amount: 2500 }], 1],
    ])

    const wardenPermit = tasks.find(
      (task) => task.id === 'safari-wardens-permit',
    )
    expect(wardenPermit).toMatchObject({
      name: "Warden's Permit",
      category: 'Secret',
      secret: true,
      requirements: [],
      criteria: [],
    })

    for (const area of ['central', 'east', 'west', 'north']) {
      const study = fieldObservationGames.find(
        (entry) => entry.id === `safari-${area}-field-observation`,
      )
      expect(study?.settings.itemDrops).toContainEqual(
        expect.objectContaining({
          dropChance: 20,
          reward: expect.objectContaining({
            type: 'currency',
            targetId: 'safari-notes',
            quantity: 1,
          }),
        }),
      )
    }

    const corner = celadonGameCornerShops.find(
      (shop) => shop.id === 'celadon-game-corner-prize-exchange',
    )
    expect(
      corner?.items
        .filter((item) => item.name.startsWith('Shadow '))
        .map((item) => [item.name, item.cost, item.rewards[0]?.targetId]),
    ).toEqual([
      ['Shadow Mr. Mime', [{ type: 'currency', id: 'fun-tokens', amount: 7000 }], 122],
      ['Shadow Lickitung', [{ type: 'currency', id: 'fun-tokens', amount: 7000 }], 108],
      ["Shadow Farfetch'd", [{ type: 'currency', id: 'fun-tokens', amount: 7000 }], 83],
      ['Shadow Jynx', [{ type: 'currency', id: 'fun-tokens', amount: 7000 }], 124],
    ])
  })

  test('field research is available after the pass and expedition copies stay hidden', () => {
    const searchStudies = fieldObservationGames.filter((entry) =>
      ['central', 'east', 'west', 'north'].some(
        (area) => entry.id === `safari-${area}-field-observation`,
      ),
    )
    expect(searchStudies).toHaveLength(4)
    expect(
      fieldObservationGames.some(
        (entry) => entry.id === 'safari-institute-field-observation',
      ),
    ).toBe(false)
    expect(
      searchStudies.every((entry) =>
        entry.rewards.some(
          (reward) =>
            reward.type === 'task_complete' &&
            reward.dropChance === 25 &&
            !reward.secret,
        ),
      ),
    ).toBe(true)
    expect(searchStudies.every((entry) => entry.category === 'Kanto')).toBe(
      true,
    )

    for (const study of searchStudies) {
      expect(study.requirements).toEqual([
        { type: 'item_owned', targetId: 'safari-research-pass' },
      ])
      expect(study.hide).toBeUndefined()
    }

    const expeditionStudyIds = [
      'safari-central-expedition-field-observation',
      'safari-east-expedition-field-observation',
      'safari-west-expedition-field-observation',
      'safari-north-expedition-field-observation',
    ]
    for (const studyId of expeditionStudyIds) {
      const study = fieldObservationGames.find((entry) => entry.id === studyId)
      expect(study, studyId).toBeDefined()
      expect(study?.category, studyId).toBe('Secret')
      expect(study?.expeditionOnly, studyId).toBe(true)
      expect(study?.requirements, studyId).toContainEqual({
        type: 'item_owned',
        targetId: 'safari-catching-permit',
      })
      expect(
        study?.rewards.some((reward) => reward.type === 'task_complete'),
        studyId,
      ).toBe(false)
    }

    for (const area of ['central', 'east', 'west', 'north']) {
      const story = fieldObservationGames.find(
        (entry) => entry.id === `safari-${area}-field-observation`,
      )
      const expeditionStudy = fieldObservationGames.find(
        (entry) => entry.id === `safari-${area}-expedition-field-observation`,
      )
      expect(expeditionStudy?.settings.pokemonPool, area).toEqual(
        story?.settings.pokemonPool,
      )
      expect(
        expeditions
          .find((entry) => entry.id === 'safari-zone-grand-expedition')
          ?.path.some(
            (step) =>
              step.type === 'activity' &&
              step.activityType === 'field-research' &&
              step.activityId === `safari-${area}-expedition-field-observation`,
          ),
        area,
      ).toBe(true)

      const expeditionStudyId = `safari-${area}-expedition-field-observation`
      const generatedStudyCount = buildExpeditionSteps(
        expeditions.find(
          (entry) => entry.id === 'safari-zone-grand-expedition',
        )!,
        {
          inventory: [{ itemId: 'safari-catching-permit', quantity: 1 }],
          completedTasks: [],
        } as unknown as RequirementData,
      ).filter((step) => step.activityId === expeditionStudyId).length
      expect(generatedStudyCount, area).toBe(2)
    }

    const discoveryIds = [
      'safari-discovery-east',
      'safari-discovery-west',
      'safari-discovery-north',
      'safari-discovery-search-complete',
    ]
    const discoveryModalExpectations = new Map([
      [
        'safari-discovery-east',
        ['Inspect the Eastern Trail', 'Return to Explore'],
      ],
      [
        'safari-discovery-west',
        ['Follow the Powder Trail', 'Return to Explore'],
      ],
      [
        'safari-discovery-north',
        ['Search the Northern Trail', 'Return to Explore'],
      ],
      [
        'safari-discovery-search-complete',
        ['Check the Gym', 'Return to Explore'],
      ],
    ])
    for (const discoveryId of discoveryIds) {
      const discovery = tasks.find((task) => task.id === discoveryId)
      expect(discovery?.secret, discoveryId).toBe(true)
      expect(discovery?.requirements, discoveryId).toEqual([])
      expect(discovery?.icon, discoveryId).toEqual({
        type: 'trainer',
        id: 'detective',
      })
      const [closeButtonText, forbiddenText] =
        discoveryModalExpectations.get(discoveryId)!
      expect(discovery?.exitModal, discoveryId).toMatchObject({
        title: 'Det. Ray Choo',
        closeButtonText,
      })
      expect(discovery?.exitModal?.message, discoveryId).not.toContain(
        forbiddenText,
      )
    }

    expect(
      tasks.find((task) => task.id === 'safari-clue-last-sign-out')
        ?.requirements,
    ).toContainEqual({
      type: 'task_completed',
      targetId: 'safari-zone-search-begins',
    })
    expect(tasks.some((task) => task.id === 'safari-discovery-central')).toBe(
      false,
    )

    expect(expeditions.some((entry) => entry.id.includes('area-five'))).toBe(
      false,
    )
    expect(
      fieldObservationGames.some((entry) => entry.id.includes('area-five')),
    ).toBe(false)
    expect(locations.some((entry) => entry.id.includes('area-five'))).toBe(
      false,
    )
  })

  test('Warden’s Permit adds standard catching and fishing to merged habitat surveys', () => {
    const standardLocations = locations.filter((entry) =>
      entry.id.endsWith('-standard-catch'),
    )
    expect(standardLocations).toHaveLength(4)
    expect(standardLocations.map((entry) => entry.name).sort()).toEqual([
      'Central Habitat Survey',
      'Eastern Habitat Survey',
      'Northern Habitat Survey',
      'Western Habitat Survey',
    ])
    expect(
      standardLocations.every(
        (entry) =>
          entry.category === 'Kanto' &&
          entry.subCategory === 'Safari Zone' &&
          entry.encounterMode === undefined &&
          entry.expeditionOnly === undefined &&
          entry.requirements.some(
            (requirement) =>
              requirement.type === 'task_completed' &&
              requirement.targetId === 'safari-wardens-permit',
          ),
      ),
    ).toBe(true)

    const safariFishingGames = fishingGames.filter((entry) =>
      entry.id.startsWith('safari-') && entry.id.endsWith('-fishing'),
    )
    expect(safariFishingGames).toHaveLength(4)
    expect(safariFishingGames.map((entry) => entry.name).sort()).toEqual([
      'Central Habitat Survey',
      'Eastern Habitat Survey',
      'Northern Habitat Survey',
      'Western Habitat Survey',
    ])
    expect(
      safariFishingGames.every(
        (entry) =>
          entry.gameType === 'fishing' &&
          entry.criteria?.some(
            (criterion) =>
              criterion.type === 'item_owned' && criterion.targetId === 'old-rod',
          ) &&
          entry.requirements.some(
            (requirement) =>
              requirement.type === 'task_completed' &&
              requirement.targetId === 'safari-wardens-permit',
          ),
      ),
    ).toBe(true)

    const centralFishing = safariFishingGames.find(
      (entry) => entry.id === 'safari-central-fishing',
    )
    const otherFishing = safariFishingGames.find(
      (entry) => entry.id === 'safari-east-fishing',
    )
    expect(centralFishing?.settings.rods.old?.encounters.entries).toHaveLength(1)
    expect(centralFishing?.settings.rods.good?.encounters.entries).toHaveLength(2)
    expect(centralFishing?.settings.rods.super?.encounters.entries.map((entry) => entry.speciesId).sort((a, b) => a - b)).toEqual([
      54, 79, 98, 129, 147, 148,
    ])
    expect(otherFishing?.settings.rods.super?.encounters.entries.map((entry) => entry.speciesId).sort((a, b) => a - b)).toEqual([
      54, 79, 98, 129, 147,
    ])
  })

  test('Safari and Koga Gym expedition activities never appear as standalone Explore content', () => {
    const expeditionIds = [
      'fuchsia-gym-trial-expedition',
      'safari-zone-grand-expedition',
      'safari-zone-catching-expedition',
      'safari-zone-fishing-expedition',
    ]

    for (const expeditionId of expeditionIds) {
      const expedition = expeditions.find((entry) => entry.id === expeditionId)
      expect(expedition, expeditionId).toBeDefined()

      for (const step of expedition?.path || []) {
        if (
          step.type !== 'activity' ||
          !step.activityType ||
          !step.activityId
        ) {
          continue
        }

        const activity =
          step.activityType === 'battle'
            ? battles.find((entry) => entry.id === step.activityId)
            : step.activityType === 'location'
              ? locations.find((entry) => entry.id === step.activityId)
              : step.activityType === 'game'
                ? basicEntries.find((entry) => entry.id === step.activityId)
                : step.activityType === 'field-research'
                  ? fieldObservationGames.find(
                      (entry) => entry.id === step.activityId,
                    )
                  : tasks.find((entry) => entry.id === step.activityId)

        expect(activity, `${expeditionId}:${step.activityId}`).toBeDefined()
        expect(activity?.category, `${expeditionId}:${step.activityId}`).toBe(
          'Secret',
        )
      }
    }
  })

  test('Koga identifies an Unknown Compound and requests a partner Chansey', () => {
    const analysis = tasks.find(
      (task) => task.id === 'fuchsia-koga-unknown-compound',
    )
    const prose = JSON.stringify(analysis)
    expect(prose).toContain('Unknown Compound')
    expect(prose).not.toContain('Unown Compound')
    expect(prose).toContain('Toxicroak toxin')
    expect(prose).toContain('no reaction to human tissue')
    expect(prose).toContain('Fifty Crystals')
    expect(prose).toContain('Shadowy Crystals')
    expect(prose).toContain('distorts Pokémon energy')
    expect(prose).toContain('fresh yolk from a Chansey egg')

    const chansey = tasks.find(
      (task) => task.id === 'safari-catch-partner-chansey',
    )
    expect(chansey?.criteria).toContainEqual(
      expect.objectContaining({
        type: 'companion',
        companionCheck: { speciesId: 113, formId: '113' },
      }),
    )
    const chanseyProse = JSON.stringify(chansey)
    expect(chanseyProse).toContain('produces a fresh egg')
    expect(chanseyProse).toContain('yolk')
    expect(chanseyProse).toContain('last regeant')
    expect(chanseyProse).toContain('antidote')
    expect(chanseyProse).toContain('Drink it now')
    expect(chanseyProse).toContain('burden lifted')
    expect(chanseyProse).toContain('does not appear to affect humans')
    expect(chanseyProse).not.toContain('Leave Chansey')
    expect(chanseyProse).not.toContain('Rocket is expecting its poison')
  })

  test('Fuchsia speakers and portraits match the authored scene', () => {
    const opening = tasks.find(
      (task) => task.id === 'fuchsia-gym-search-for-koga',
    )
    expect(opening?.exitModal).toMatchObject({
      title: 'Gym Attendant',
      icon: { type: 'trainer', id: 'psychic-f' },
    })

    const trailTask = tasks.find(
      (task) => task.id === 'safari-zone-cant-find-them',
    )
    expect(trailTask?.icon).toEqual({ type: 'trainer', id: 'detective' })
    const trail = JSON.stringify(trailTask)
    expect(trail).toContain('We have followed the whole trail')
    expect(trail).not.toContain('sign of a struggle')
    expect(trail).not.toContain('out-investigated')

    const trialTask = tasks.find(
      (task) => task.id === 'fuchsia-gym-trial-ready',
    )
    expect(trialTask?.name).toBe('Returning to the Gym')
    const trial = JSON.stringify(trialTask)
    expect(trial).toContain('They have been back for hours')
    expect(trial).not.toContain('how he avoids interruptions')

    const study = JSON.stringify(
      tasks.find((task) => task.id === 'fuchsia-koga-study-toxin'),
    )
    expect(study).toContain('stand over my workbench')
  })

  test('Sealed Toxin unlocks Billiam storage and the Good Rod side tasks', () => {
    const flyer = tasks.find(
      (task) => task.id === 'fuchsia-crudely-drawn-flyer',
    )
    const storage = tasks.find(
      (task) => task.id === 'fuchsia-billiam-storage-upgrade',
    )
    const rod = tasks.find((task) => task.id === 'fuchsia-accidental-offense')

    expect(flyer?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'fuchsia-koga-study-toxin',
    })
    expect(storage).toMatchObject({
      background: '/backgrounds/fuchsia-tavern.avif',
      icon: { type: 'trainer', id: 'gamer' },
      requirements: [
        { type: 'task_completed', targetId: 'fuchsia-crudely-drawn-flyer' },
      ],
      criteria: [
        {
          type: 'currency_owned',
          targetId: 'pokedollars',
          count: 20000,
          consume: true,
        },
      ],
      rewards: [
        { type: 'increase_max_pokemon', quantity: 100, dropChance: 100 },
      ],
    })
    expect(rod).toMatchObject({
      requirements: [
        { type: 'task_completed', targetId: 'fuchsia-koga-study-toxin' },
      ],
      rewards: [
        { type: 'task_complete', targetId: 'good-rod-recipe', dropChance: 100 },
      ],
    })
    expect(JSON.stringify(storage)).toContain('Whoa, whoa, whoa')
    expect(JSON.stringify(rod)).toContain('THE WORST fishing rod')
  })
})
