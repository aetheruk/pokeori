import { describe, expect, test } from 'bun:test'
import { battles } from '@/data/battles'
import { currencies } from '@/data/currencies'
import { snapGames } from '@/data/games'
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
  test('Cerulean Gym fishing keeps only Magikarp encounters', () => {
    const gymFishing = fishingGames.filter(
      (entry) =>
        entry.id === 'cerulean-gym-pool' ||
        entry.id === 'cerulean-gym-pool-daily',
    )

    expect(gymFishing).toHaveLength(2)
    expect(
      gymFishing.flatMap((entry) =>
        Object.values(entry.settings.rods).flatMap((rod) =>
          rod?.encounters.entries.map((encounter) => encounter.speciesId),
        ),
      ),
    ).toEqual([129, 129])
  })

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

  test('Fuchsia includes the FRLG gatehouse Golduck-for-Lickitung trade', () => {
    const trade = tasks.find((task) => task.id === 'fuchsia-trade-lickitung')!

    expect(trade.name).toBe('A Gold(uck) Opportunity')
    expect(trade.icon).toEqual({ type: 'pokemon', id: '55' })
    expect(trade.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'explore-fuchsia-city',
    })
    expect(trade.criteria).toContainEqual(
      expect.objectContaining({
        type: 'pokemon_owned',
        consume: true,
        pokemonCriteria: { speciesId: 55, formId: '55' },
      }),
    )
    expect(trade.rewards).toContainEqual(
      expect.objectContaining({
        type: 'pokemon',
        targetId: 108,
        secret: true,
        pokemonData: expect.objectContaining({
          level: 25,
          obtainedMethod: 'trade',
        }),
      }),
    )
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
    expect(
      tasks
        .find((task) => task.id === 'fuchsia-gym-koga-rewards')
        ?.rewards.map((reward) => reward.targetId),
    ).toEqual(['koga', 'poison-pro'])
    expect(getIcon('koga')).toMatchObject({
      name: 'Koga',
      icon: { type: 'trainer', id: 'gym-kanto-koga' },
    })
    expect(getTitle('poison-pro')).toEqual({
      id: 'poison-pro',
      name: 'Poison Pro',
    })

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
    const safariCatchLocations = locations.filter(
      (entry) => entry.encounterMode === 'safari',
    )
    expect(safariCatchLocations.length).toBeGreaterThan(4)
    expect(
      safariCatchLocations.every((entry) =>
        entry.rewards.every(
          (reward) =>
            reward.type === 'item' &&
            ['lucky-egg', 'lucky-punch'].includes(String(reward.targetId)) &&
            reward.dropChance === 1 &&
            reward.requirements?.some(
              (requirement) =>
                requirement.type === 'task_completed' &&
                requirement.targetId === 'safari-rare-item-rumours',
            ),
        ),
      ),
    ).toBe(true)

    const canonicalSpecies = new Map([
      ['central', [29, 30, 32, 33, 46, 47, 48, 102, 111, 113, 114, 123, 127]],
      [
        'east',
        [29, 30, 32, 33, 46, 47, 84, 102, 104, 105, 113, 115, 123, 127, 128],
      ],
      ['west', [29, 30, 32, 33, 48, 49, 84, 102, 104, 105, 114, 115, 127, 128]],
      [
        'north',
        [
          29, 30, 32, 33, 46, 49, 102, 104, 111, 113, 115, 123, 127, 128, 128,
          128, 128,
        ],
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
    ).toHaveLength(2)
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
    expect(rewardTaskSteps.every((step) => step.secret === true)).toBe(true)
    expect(
      expedition?.taskPools?.['safari-rewards'].map((entry) => entry.id),
    ).toEqual(
      expect.arrayContaining([
        'safari-research-29-common',
        'safari-item-poke-ball-cache',
        'safari-flavor-central-a-ranger-s-chalk-mark',
      ]),
    )
    expect(Object.keys(expedition?.taskPools || {})).toEqual(['safari-rewards'])

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
    expect(finale?.encounters).toHaveLength(8)
    expect(
      finale?.encounters
        .map((encounter) => encounter.speciesId)
        .sort((a, b) => a - b),
    ).toEqual([113, 115, 123, 127, 128, 128, 128, 128])
    expect(
      finale?.encounters.filter((encounter) => !encounter.requirements),
    ).toHaveLength(5)
    expect(
      finale?.encounters.filter((encounter) => encounter.requirements),
    ).toEqual([
      expect.objectContaining({
        formId: '10250',
        requirements: [
          { type: 'task_completed', targetId: 'safari-strange-sightings' },
        ],
      }),
      expect.objectContaining({
        formId: '10251',
        requirements: [
          { type: 'task_completed', targetId: 'safari-strange-sightings' },
        ],
      }),
      expect.objectContaining({
        formId: '10252',
        requirements: [
          { type: 'task_completed', targetId: 'safari-strange-sightings' },
        ],
      }),
    ])
    expect(
      finale?.encounters.reduce(
        (total, encounter) => total + encounter.chance,
        0,
      ),
    ).toBe(160)
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

    expect(
      expeditions.some((entry) => entry.id === 'safari-zone-catching-expedition'),
    ).toBe(false)

    const poacherWatch = expeditions.find(
      (entry) => entry.id === 'safari-zone-poacher-watch-expedition',
    )
    expect(poacherWatch).toMatchObject({
      maxLosses: 1,
      criteria: [],
      requirements: [
        { type: 'item_owned', targetId: 'safari-catching-permit' },
        { type: 'task_completed', targetId: 'safari-notes-on-poachers' },
      ],
      rewards: [
        {
          type: 'currency',
          targetId: 'pokedollars',
          quantity: 1500,
          dropChance: 100,
        },
        {
          type: 'item',
          targetId: 'rare-candy-l',
          quantity: 3,
          dropChance: 100,
        },
        {
          type: 'currency',
          targetId: 'safari-notes',
          quantity: 1,
          dropChance: 100,
        },
        {
          type: 'item',
          targetId: 'pack-base5',
          quantity: 1,
          dropChance: 100,
          label: 'Team Rocket Booster Pack',
          requirements: [
            { type: 'item_owned', targetId: 'binder-base5' },
            {
              type: 'card_collected_set',
              targetId: 'base5',
              count: 83,
              unique: true,
              inverse: true,
            },
          ],
        },
      ],
    })
    const poacherSteps = buildExpeditionSteps(poacherWatch!, {
      inventory: [{ itemId: 'safari-catching-permit', quantity: 1 }],
      completedTasks: [{ taskId: 'safari-notes-on-poachers', count: 1 }],
    } as unknown as RequirementData)
    expect(poacherSteps).toHaveLength(5)
    expect(poacherSteps.every((step) => step.activityType === 'battle')).toBe(
      true,
    )
    expect(poacherSteps.map((step) => step.activityId)).toEqual([
      'safari-poacher-watch-one',
      'safari-poacher-watch-two',
      'safari-poacher-watch-three',
      'safari-poacher-watch-four',
      'safari-poacher-watch-five',
    ])

    expect(
      expeditions.some(
        (entry) => entry.id === 'safari-zone-fishing-expedition',
      ),
    ).toBe(false)
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
        .flatMap((task) =>
          task.rewards
            .filter((reward) => reward.type === 'pokemon_research_xp')
            .map((reward) => reward.quantity || 0),
        )
        .sort((a, b) => Number(a) - Number(b)),
    ).toEqual([
      ...Array(19).fill(2),
      ...Array(19).fill(10),
      ...Array(25).fill(20),
    ])
    expect(
      researchTasks.every((task) =>
        task.rewards.some(
          (reward) =>
            reward.type === 'currency' &&
            reward.targetId === 'safari-notes' &&
            reward.quantity === 1 &&
            reward.dropChance === 100,
        ),
      ),
    ).toBe(true)

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
        .every((reward) => reward.dropChance === 100),
    ).toBe(true)
    expect(
      itemTasks.every((task) =>
        task.rewards.some(
          (reward) =>
            reward.type === 'currency' &&
            reward.targetId === 'safari-notes' &&
            reward.quantity === 1 &&
            reward.dropChance === 100,
        ),
      ),
    ).toBe(true)
    expect(
      safariItemTaskPoolIds.materials
        .map((id) =>
          safariExpeditionContentTasks.find((task) => task.id === id),
        )
        .flatMap((task) => task?.rewards ?? [])
        .filter((reward) => reward.type === 'item')
        .every((reward) => reward.type === 'item' && reward.quantity === 3),
    ).toBe(true)
    expect(safariItemTaskPoolIds.balls).toHaveLength(2)
    expect(
      safariItemTaskPoolIds.balls.some((id) => id.includes('ultra-ball')),
    ).toBe(false)
    expect(
      safariExpeditionContentTasks
        .filter((task) =>
          task.rewards.some((reward) => reward.targetId === 'ultra-ball'),
        )
        .map((task) => task.id),
    ).toEqual(['safari-rare-ultra-ball-find'])
    const repeatableUltraBallFind = safariExpeditionContentTasks.find(
      (task) => task.id === 'safari-rare-ultra-ball-find',
    )
    expect(repeatableUltraBallFind).toMatchObject({
      repeatable: true,
      requirements: [
        { type: 'task_completed', targetId: 'safari-rare-item-rumours' },
      ],
      rewards: [
        { type: 'item', targetId: 'ultra-ball', quantity: 1, dropChance: 100 },
        {
          type: 'currency',
          targetId: 'safari-notes',
          quantity: 1,
          dropChance: 100,
        },
      ],
    })
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

  test('repeatable Safari expedition tasks use the reward completion path on replay', async () => {
    const source = await Bun.file(
      'src/components/game/features/explore/hooks/useExploreActions.ts',
    ).text()

    expect(source).toContain(
      'isExpeditionTaskFlow && isDone && !task.repeatable',
    )
  })

  test('Safari Notes progression and Research Exchange are authored', () => {
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

    const safariFieldResearch = fieldObservationGames.filter(
      (entry) => entry.subCategory === 'Safari Zone',
    )
    expect(safariFieldResearch).toHaveLength(8)
    expect(
      safariFieldResearch.every((entry) =>
        entry.settings.itemDrops?.some(
          (drop) =>
            drop.itemId === 'researchers-journal-page' &&
            drop.dropChance === 100 &&
            drop.guaranteed === true &&
            drop.secret === true &&
            drop.reward?.type === 'currency' &&
            drop.reward.targetId === 'safari-notes' &&
            drop.reward.guaranteed === true &&
            drop.reward.secret === true,
        ),
      ),
    ).toBe(true)

    const strangeSightings = safariZoneShops[0]?.items.find(
      (item) => item.id === 'safari-credit-strange-sightings',
    )
    expect(strangeSightings?.icon).toEqual({ type: 'pokemon', id: '128' })
    expect(
      tasks.find((task) => task.id === 'safari-strange-sightings')?.icon,
    ).toEqual({ type: 'pokemon', id: '128' })

    const grandExpedition = expeditions.find(
      (entry) => entry.id === 'safari-zone-grand-expedition',
    )
    expect(grandExpedition?.rewards).toContainEqual({
      type: 'currency',
      targetId: 'safari-notes',
      quantity: 25,
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
    expect(responsibility?.exitModal?.message).toContain(
      'jotting down my notes',
    )

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
      quantity: 10,
      dropChance: 100,
    })

    const store = safariZoneShops.find(
      (shop) => shop.id === 'safari-zone-research-credit-store',
    )
    expect(store?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'safari-researcher-responsibility',
    })
    expect(
      store?.items.map((item) => [item.name, item.cost, item.stock]),
    ).toEqual([
      [
        'Safari Ball',
        [{ type: 'currency', id: 'safari-notes', amount: 30 }],
        undefined,
      ],
      [
        'Fishing Permit',
        [{ type: 'currency', id: 'safari-notes', amount: 200 }],
        1,
      ],
      [
        'Extra Habitat Field Notes',
        [{ type: 'currency', id: 'safari-notes', amount: 35 }],
        1,
      ],
      [
        'Material Deposit Reports',
        [{ type: 'currency', id: 'safari-notes', amount: 45 }],
        1,
      ],
      [
        'Safari Ball Cache Info',
        [{ type: 'currency', id: 'safari-notes', amount: 55 }],
        1,
      ],
      [
        'Unusual Pokémon Sightings',
        [{ type: 'currency', id: 'safari-notes', amount: 65 }],
        1,
      ],
      [
        'Rare Item Rumours',
        [{ type: 'currency', id: 'safari-notes', amount: 200 }],
        1,
      ],
      [
        'Strange Sightings',
        [{ type: 'currency', id: 'safari-notes', amount: 1000 }],
        1,
      ],
      [
        'Security Permit',
        [{ type: 'currency', id: 'safari-notes', amount: 100 }],
        1,
      ],
      [
        'Catching Permit',
        [{ type: 'currency', id: 'safari-notes', amount: 500 }],
        1,
      ],
      [
        'Stamina Notes',
        [{ type: 'currency', id: 'safari-notes', amount: 50 }],
        5,
      ],
      [
        'Safari Ball Icon',
        [{ type: 'currency', id: 'safari-notes', amount: 1000 }],
        1,
      ],
      [
        'Warden Title',
        [{ type: 'currency', id: 'safari-notes', amount: 2500 }],
        1,
      ],
    ])

    const wardenPermit = tasks.find(
      (task) => task.id === 'safari-wardens-permit',
    )
    expect(wardenPermit).toMatchObject({
      name: 'Catching Permit',
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
          dropChance: 100,
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
      [
        'Shadow Mr. Mime',
        [{ type: 'currency', id: 'fun-tokens', amount: 7000 }],
        122,
      ],
      [
        'Shadow Lickitung',
        [{ type: 'currency', id: 'fun-tokens', amount: 7000 }],
        108,
      ],
      [
        "Shadow Farfetch'd",
        [{ type: 'currency', id: 'fun-tokens', amount: 7000 }],
        83,
      ],
      [
        'Shadow Jynx',
        [{ type: 'currency', id: 'fun-tokens', amount: 7000 }],
        124,
      ],
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

  test('Catching Permit adds catching while Fishing Permit adds fishing', () => {
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
          entry.encounterMode === 'safari' &&
          entry.expeditionOnly === undefined &&
          entry.safariBallAllowance === 5 &&
          entry.requirements.some(
            (requirement) =>
              requirement.type === 'task_completed' &&
              requirement.targetId === 'safari-wardens-permit',
          ),
      ),
    ).toBe(true)
    expect(
      standardLocations.every((entry) =>
        entry.criteria?.some(
          (criterion) =>
            criterion.type === 'currency_owned' &&
            criterion.targetId === 'pokedollars' &&
            criterion.count === 200 &&
            criterion.consume === true,
        ),
      ),
    ).toBe(true)

    const safariFishingGames = fishingGames.filter(
      (entry) =>
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
          entry.settings.safariCapture?.balls === 5 &&
          entry.criteria?.some(
            (criterion) =>
              criterion.type === 'item_owned' &&
              criterion.targetId === 'old-rod',
          ) &&
          entry.criteria?.some(
            (criterion) =>
              criterion.type === 'currency_owned' &&
              criterion.targetId === 'pokedollars' &&
              criterion.count === 250 &&
              criterion.consume === true,
          ) &&
          entry.requirements.some(
            (requirement) =>
              requirement.type === 'task_completed' &&
              requirement.targetId === 'safari-fishing-research-notes',
          ) &&
          !entry.requirements.some(
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
    expect(centralFishing?.settings.rods.old?.encounters.entries).toHaveLength(
      1,
    )
    expect(centralFishing?.settings.rods.good?.encounters.entries).toHaveLength(
      2,
    )
    expect(
      centralFishing?.settings.rods.super?.encounters.entries
        .map((entry) => entry.speciesId)
        .sort((a, b) => a - b),
    ).toEqual([54, 79, 98, 129, 147, 148])
    expect(
      otherFishing?.settings.rods.super?.encounters.entries
        .map((entry) => entry.speciesId)
        .sort((a, b) => a - b),
    ).toEqual([54, 79, 98, 129, 147])
    expect(
      safariFishingGames
        .find((entry) => entry.id === 'safari-north-fishing')
        ?.settings.rods.super?.encounters.entries.some((entry) =>
          ['10250', '10251', '10252'].includes(entry.formId || ''),
        ),
    ).toBe(false)
    expect(
      centralFishing?.settings.rods.old?.items?.entries.map((entry) =>
        entry.currencyId
          ? [entry.currencyId, entry.weight]
          : [entry.itemId, entry.weight],
      ),
    ).toEqual([
      ['water-gem', 40],
      ['aqua-solvent-t1', 20],
      ['drake-scale-t1', 20],
      ['safari-notes', 20],
    ])

    const legacyFishing = fishingGames.find(
      (entry) => entry.id === 'safari-zone-fishing-expedition',
    )
    expect(legacyFishing?.expeditionOnly).toBe(true)
    expect(legacyFishing?.category).toBe('Secret')
    expect(legacyFishing?.settings.safariCapture).toEqual({ balls: 5 })
    expect(
      legacyFishing?.settings.rods.super?.encounters.entries.map((entry) => [
        entry.speciesId,
        entry.weight,
      ]),
    ).toEqual([
      [129, 30],
      [60, 15],
      [118, 15],
      [54, 10],
      [79, 10],
      [98, 10],
      [147, 8],
      [148, 2],
    ])
    expect(
      legacyFishing?.settings.rods.super?.items?.entries.map((entry) =>
        entry.currencyId
          ? [entry.currencyId, entry.weight]
          : [entry.itemId, entry.weight],
      ),
    ).toEqual([
      ['water-gem', 40],
      ['aqua-solvent-t1', 20],
      ['drake-scale-t1', 20],
      ['safari-notes', 20],
    ])

    const northernCatch = locations.find(
      (entry) => entry.id === 'safari-north-catch',
    )
    expect(
      northernCatch?.encounters.filter((entry) =>
        ['10250', '10251', '10252'].includes(entry.formId || ''),
      ),
    ).toEqual([
      expect.objectContaining({ speciesId: 128, formId: '10250', chance: 1 }),
      expect.objectContaining({ speciesId: 128, formId: '10251', chance: 1 }),
      expect.objectContaining({ speciesId: 128, formId: '10252', chance: 1 }),
    ])
    for (const studyId of [
      'safari-north-field-observation',
      'safari-north-expedition-field-observation',
    ]) {
      const study = fieldObservationGames.find((entry) => entry.id === studyId)
      expect(
        study?.settings.pokemonPool.filter((entry) =>
          ['10250', '10251', '10252'].includes(entry.formId || ''),
        ),
      ).toEqual([
        expect.objectContaining({ speciesId: 128, formId: '10250', weight: 1 }),
        expect.objectContaining({ speciesId: 128, formId: '10251', weight: 1 }),
        expect.objectContaining({ speciesId: 128, formId: '10252', weight: 1 }),
      ])
    }
  })

  test('Safari and Koga Gym expedition activities never appear as standalone Explore content', () => {
    const expeditionIds = [
      'fuchsia-gym-trial-expedition',
      'safari-zone-grand-expedition',
      'safari-zone-poacher-watch-expedition',
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
                ? fishingGames.find((entry) => entry.id === step.activityId) ||
                  basicEntries.find((entry) => entry.id === step.activityId)
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

  test('Poacher Watch uses level-31 teams and Safari species', () => {
    const existingPoacherBattles = battles.filter((battle) =>
      battle.id.endsWith('rocket-poacher'),
    )
    expect(existingPoacherBattles).toHaveLength(4)
    expect(
      existingPoacherBattles.every((battle) =>
        battle.enemyTeam.some((enemy) => enemy.level === 31),
      ),
    ).toBe(true)

    const poacherBattles = battles.filter((battle) =>
      battle.id.startsWith('safari-poacher-watch-'),
    )
    expect(poacherBattles).toHaveLength(5)
    expect(poacherBattles.every((battle) => battle.rewards.length === 0)).toBe(
      true,
    )
    expect(
      poacherBattles.every((battle) => battle.disableRewards === true),
    ).toBe(true)
    expect(
      poacherBattles.every((battle) =>
        battle.enemyTeam.some((enemy) => enemy.level === 31),
      ),
    ).toBe(true)
    const safariSpecies = new Set([
      29, 32, 46, 48, 49, 84, 102, 104, 105, 111, 113, 114, 115, 123, 127, 128,
    ])
    expect(
      poacherBattles.every((battle) =>
        battle.enemyTeam.some((enemy) => safariSpecies.has(enemy.speciesId)),
      ),
    ).toBe(true)
  })

  test('Chansey egg progression uses a narrative gift instead of a capture', () => {
    const chanseySnap = snapGames.find(
      (game) => game.id === 'safari-chansey-search-snap',
    )
    expect(chanseySnap).toBeDefined()
    expect(chanseySnap).toMatchObject({
      category: 'Kanto',
      subCategory: 'Safari Zone',
    })
    expect(chanseySnap?.settings).toMatchObject({
      target: 113,
      timeLimit: 60,
      winRate: 1,
      successThreshold: 5000,
    })
    expect(chanseySnap?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'fuchsia-research-institute-chansey-request',
    })
    expect(chanseySnap?.requirements).toContainEqual({
      type: 'game_result',
      targetId: 'safari-chansey-search-snap',
      battleStatus: 'win',
      count: 1,
      inverse: true,
    })
    expect(chanseySnap?.rewards).toEqual([
      {
        type: 'task_complete',
        targetId: 'safari-chansey-search-complete',
        quantity: 1,
        dropChance: 100,
      },
    ])

    const chainIds = [
      'safari-strength-check-on-koga',
      'fuchsia-koga-unknown-compound',
      'fuchsia-koga-egg-request',
      'fuchsia-research-institute-chansey-request',
      'safari-chansey-search-complete',
      'safari-chansey-lure',
      'safari-chansey-makes-friends',
      'safari-catch-partner-chansey',
    ]
    const chain = chainIds.map((id) => tasks.find((task) => task.id === id))
    expect(chain.every(Boolean)).toBe(true)

    const returnToKoga = chain[0]!
    expect(returnToKoga.name).toBe('So long Safari')
    expect(returnToKoga.description).toBe(
      'Weve been gone quite some time I should check if Koga has made any progress.',
    )
    expect(returnToKoga.icon).toEqual({ type: 'trainer', id: 'detective' })
    expect(returnToKoga.subCategory).toBe('Safari Zone')
    expect(returnToKoga.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'fuchsia-koga-study-toxin',
    })
    expect(returnToKoga.requirements).toContainEqual({
      type: 'item_owned',
      targetId: 'tm-strength',
    })
    expect(JSON.stringify(returnToKoga)).toContain(
      'I cant imagine you will get another shot at coming back.',
    )
    expect(JSON.stringify(returnToKoga)).toContain(
      'Ray, has got me feeling nervous again',
    )
    expect(JSON.stringify(returnToKoga)).toContain('Return to Koga')
    expect(JSON.stringify(returnToKoga)).not.toContain('Fifty Crystals')

    const analysis = chain[1]!
    expect(analysis.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'safari-strength-check-on-koga',
    })
    expect(analysis.criteria).toContainEqual({
      type: 'currency_owned',
      targetId: 'crystals',
      count: 50,
      consume: true,
    })
    expect(JSON.stringify(analysis)).not.toContain('egg you brought')
    expect(JSON.stringify(analysis)).toContain('remains unidentified')
    expect(JSON.stringify(analysis)).toContain('Toxicroak toxin')

    const eggRequest = chain[2]!
    expect(eggRequest.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'fuchsia-koga-unknown-compound',
    })
    expect(JSON.stringify(eggRequest)).toContain('Chansey egg')
    expect(JSON.stringify(eggRequest)).toContain('Toxicroak toxin')

    expect(JSON.stringify(eggRequest)).toContain('I’ll find out where to look')
    expect(JSON.stringify(eggRequest)).not.toContain('I’ll ask the Institute')

    const instituteRequest = chain[3]!
    const instituteProse = JSON.stringify(instituteRequest)
    expect(instituteProse).toContain('central reeds')
    expect(instituteProse).toContain('marked the stretch on your field map')
    expect(instituteProse).toContain('search that stretch of reeds')
    expect(instituteProse).not.toContain('calm posture')

    const lure = chain[5]!
    expect(lure.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'safari-chansey-search-complete',
    })
    expect(lure.criteria).toContainEqual({
      type: 'item_owned',
      targetId: 'red-berry-candy',
      count: 10,
      consume: true,
      label: 'Offer 10 Red Berry Candies',
    })

    expect(chain[6]?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'safari-chansey-lure',
    })
    expect(chain[7]?.requirements).toContainEqual({
      type: 'task_completed',
      targetId: 'safari-chansey-makes-friends',
    })
    expect(chain[7]?.subCategory).toBe('Fuchsia City')

    const taskRewards = chain.flatMap((task) => task?.rewards || [])
    expect(taskRewards.some((reward) => reward.type === 'pokemon')).toBe(false)
    expect(taskRewards.some((reward) => reward.type === 'egg')).toBe(false)
    expect(
      chain.flatMap((task) => task?.criteria || []).some(
        (criterion) => criterion.type === 'companion',
      ),
    ).toBe(false)

    const prose = JSON.stringify(analysis)
    expect(prose).toContain('Unknown Compound')
    expect(prose).not.toContain('Unown Compound')
    expect(prose).toContain('no reaction to human tissue')
    expect(prose).toContain('fifty Crystals')
    expect(prose).toContain('turned shadowy')
    expect(prose).toContain('distorts Pokémon energy')
    expect(prose).not.toContain('Chansey yolk')
    expect(prose).not.toContain('egg you brought')
    expect(prose).toContain('fresh Chansey egg')

    const giftProse = JSON.stringify(chain[6])
    expect(chain[6]?.name).toBe('A Chansey’s Gift')
    expect(giftProse).toContain('stepping back into the reeds')
    expect(giftProse).not.toContain('remains wild')
    expect(giftProse).not.toContain('because you asked')

    const chansey = tasks.find(
      (task) => task.id === 'safari-catch-partner-chansey',
    )
    expect(chansey?.criteria).toEqual([])
    expect(chansey?.icon).toEqual({ type: 'item', id: 'antidote' })
    const chanseyProse = JSON.stringify(chansey)
    expect(chansey?.description).toContain('Meet him at the Institute lab')
    expect(chansey?.enterModal?.[0]).toMatchObject({
      title: 'Koga',
      icon: { type: 'trainer', id: 'gym-kanto-koga' },
    })
    expect(chansey?.enterModal?.some((modal) => modal.title === 'Janine')).toBe(
      false,
    )
    expect(chanseyProse).toContain('yolk')
    expect(chanseyProse).toContain('last reagent')
    expect(chanseyProse).toContain('antidote')
    expect(chanseyProse).toContain('Drink it now')
    expect(chanseyProse).toContain('trail is still warm')
    expect(chanseyProse).not.toContain('return to the lab alone')
    expect(chanseyProse).not.toContain('Koga has finished the antidote')

    const narrative = JSON.stringify([chain[5], chain[6], chain[7], analysis, chansey])
    expect(narrative).not.toContain('Return with Chansey')
    expect(narrative).not.toContain('stays beside you')
    expect(narrative).not.toContain('you and Chansey brought')
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

  test('Sealed Toxin unlocks Billiam storage, bulk candy, and the Good Rod side tasks', () => {
    const flyer = tasks.find(
      (task) => task.id === 'fuchsia-crudely-drawn-flyer',
    )
    const storage = tasks.find(
      (task) => task.id === 'fuchsia-billiam-storage-upgrade',
    )
    const rod = tasks.find((task) => task.id === 'fuchsia-accidental-offense')
    const bulk = tasks.find((task) => task.id === 'fuchsia-build-in-bulk')

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
    expect(bulk).toMatchObject({
      requirements: [
        { type: 'task_completed', targetId: 'fuchsia-crudely-drawn-flyer' },
      ],
      criteria: [
        {
          type: 'item_owned',
          targetId: 'rare-candy-xs',
          count: 20,
          consume: true,
        },
        {
          type: 'item_owned',
          targetId: 'rare-candy-s',
          count: 20,
          consume: true,
        },
        {
          type: 'item_owned',
          targetId: 'rare-candy-m',
          count: 20,
          consume: true,
        },
        {
          type: 'item_owned',
          targetId: 'rare-candy-l',
          count: 20,
          consume: true,
        },
      ],
    })
    expect(JSON.stringify(bulk)).toContain('revolutionary new concept')
    expect(JSON.stringify(bulk)).toContain('dumbest thing I’ve ever seen')
    expect(JSON.stringify(bulk)).not.toContain('Btw: Not really.')
    expect(JSON.stringify(bulk)).toContain('"text":"Not really."')
    expect(JSON.stringify(storage)).toContain('Whoa, whoa, whoa')
    expect(JSON.stringify(rod)).toContain('THE WORST fishing rod')
  })
})
