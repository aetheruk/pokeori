import { describe, expect, test } from 'bun:test'
import { battles } from '@/data/battles'
import { expeditions } from '@/data/expeditions'
import { fieldObservationGames } from '@/data/games/field-observation'
import { identifyEntries } from '@/data/games/identify'
import { basicEntries } from '@/data/games/rock-push'
import { items } from '@/data/items'
import { locations } from '@/data/locations'
import { getMove } from '@/data/moves'
import { subCategories } from '@/data/sub-region-map'
import { tasks } from '@/data/tasks'
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

  test('Safari areas use Shout/Bait encounters and five-clear expedition gates', () => {
    const safariLocations = locations.filter(
      (entry) => entry.id.startsWith('safari-') && entry.id.endsWith('-catch'),
    )
    expect(safariLocations).toHaveLength(4)
    expect(
      safariLocations.every((entry) => entry.encounterMode === 'safari'),
    ).toBe(true)
    expect(
      safariLocations.every((entry) => entry.expeditionOnly === true),
    ).toBe(true)
    expect(
      safariLocations.every((entry) => entry.category === 'Secret'),
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

    const safariExpeditions = expeditions.filter(
      (entry) =>
        entry.id.startsWith('safari-') && entry.id.endsWith('-expedition'),
    )
    expect(safariExpeditions).toHaveLength(4)
    expect(
      safariExpeditions.every((entry) =>
        entry.criteria?.some(
          (criterion) =>
            criterion.type === 'currency_owned' &&
            criterion.targetId === 'pokedollars' &&
            criterion.count === 500 &&
            criterion.consume,
        ),
      ),
    ).toBe(true)
    expect(
      safariExpeditions
        .slice(1)
        .every((entry) =>
          entry.requirements?.some(
            (requirement) =>
              requirement.type === 'expedition_result' &&
              requirement.count === 5,
          ),
        ),
    ).toBe(true)
  })

  test('four trail surveys reveal visible clues and North awards Strength once', () => {
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

    const storyStudyGates = new Map([
      [
        'safari-central-field-observation',
        ['safari-clue-last-sign-out', 'safari-discovery-east'],
      ],
      [
        'safari-east-field-observation',
        ['safari-clue-reed-twice', 'safari-discovery-west'],
      ],
      [
        'safari-west-field-observation',
        ['safari-clue-powder-boardwalk', 'safari-discovery-north'],
      ],
      [
        'safari-north-field-observation',
        ['safari-clue-purple-thread', 'safari-discovery-search-complete'],
      ],
    ])
    for (const [studyId, [clueId, discoveryId]] of storyStudyGates) {
      const study = fieldObservationGames.find((entry) => entry.id === studyId)
      expect(study?.requirements).toContainEqual({
        type: 'task_completed',
        targetId: clueId,
      })
      expect(study?.hide).toBe(discoveryId)
      expect(study?.rewards).toContainEqual(
        expect.objectContaining({
          type: 'task_complete',
          targetId: discoveryId,
          dropChance: 25,
        }),
      )
      const discoveryReward = study?.rewards.find(
        (reward) =>
          reward.type === 'task_complete' && reward.targetId === discoveryId,
      )
      expect(discoveryReward?.requirements).toBeUndefined()
      expect(tasks.find((task) => task.id === discoveryId)?.requirements).toEqual([])
      expect(tasks.find((task) => task.id === clueId)?.secret).toBe(false)
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
      const expedition = expeditions.find(
        (entry) => entry.id === `safari-${area}-expedition`,
      )
      expect(
        expedition?.path.some(
          (step) =>
            step.type === 'activity' &&
            step.activityType === 'field-research' &&
            step.activityId === `safari-${area}-expedition-field-observation`,
        ),
        area,
      ).toBe(true)
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
      ['safari-discovery-search-complete', ['Check the Gym', 'Return to Explore']],
    ])
    for (const discoveryId of discoveryIds) {
      const discovery = tasks.find((task) => task.id === discoveryId)
      expect(discovery?.secret, discoveryId).toBe(true)
      expect(discovery?.requirements, discoveryId).toEqual([])
      expect(discovery?.icon, discoveryId).toEqual({
        type: 'trainer',
        id: 'detective',
      })
      const [closeButtonText, forbiddenText] = discoveryModalExpectations.get(
        discoveryId,
      )!
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

    const north = expeditions.find(
      (entry) => entry.id === 'safari-north-expedition',
    )
    expect(north?.activityPool.task).toEqual(['safari-north-strength-cache'])
    expect(north?.path).toContainEqual(
      expect.objectContaining({
        activityType: 'task',
        activityId: 'safari-north-strength-cache',
        secret: true,
        requirements: [
          { type: 'item_owned', targetId: 'tm-strength', inverse: true },
        ],
      }),
    )
    const strength = north?.rewards.find(
      (reward) => reward.targetId === 'tm-strength',
    )
    expect(strength?.dropChance).toBe(100)
    expect(strength?.requirements).toContainEqual({
      type: 'item_owned',
      targetId: 'tm-strength',
      inverse: true,
    })

    const safariProgress = {
      user: { id: 'fuchsia-test-user' },
      inventory: [
        { itemId: 'safari-research-pass', quantity: 1 },
        { itemId: 'safari-catching-permit', quantity: 1 },
      ],
      pokemon: [],
      tcg: [],
      pokedex: [],
      completedTasks: [
        {
          taskId: 'safari-clue-purple-thread',
          count: 1,
        },
      ],
      battleResults: [],
      locationEncounterResults: [],
      gameResults: [],
      fieldResearchResults: [],
      expeditionResults: [
        {
          expeditionId: 'safari-west-expedition',
          wins: 5,
          losses: 0,
        },
      ],
    } as unknown as RequirementData
    const firstVisit = buildExpeditionSteps(north!, safariProgress)
    expect(
      firstVisit.some(
        (step) => step.activityId === 'safari-north-strength-cache',
      ),
    ).toBe(true)

    const returnVisit = buildExpeditionSteps(north!, {
      ...safariProgress,
      inventory: [
        { itemId: 'safari-research-pass', quantity: 1 },
        { itemId: 'safari-catching-permit', quantity: 1 },
        { itemId: 'tm-strength', quantity: 1 },
      ],
    })
    expect(
      returnVisit.some(
        (step) => step.activityId === 'safari-north-strength-cache',
      ),
    ).toBe(false)

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

  test('Safari and Koga Gym expedition activities never appear as standalone Explore content', () => {
    const expeditionIds = [
      'fuchsia-gym-trial-expedition',
      'safari-central-expedition',
      'safari-east-expedition',
      'safari-west-expedition',
      'safari-north-expedition',
    ]

    for (const expeditionId of expeditionIds) {
      const expedition = expeditions.find((entry) => entry.id === expeditionId)
      expect(expedition, expeditionId).toBeDefined()

      for (const step of expedition?.path || []) {
        if (step.type !== 'activity' || !step.activityType || !step.activityId) {
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
        expect(
          activity?.category,
          `${expeditionId}:${step.activityId}`,
        ).toBe('Secret')
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
    expect(prose).toContain('dangerous to people')
    expect(prose).toContain('barely reacts with human tissue')
    expect(prose).toContain('Fifty Crystals')
    expect(prose).toContain('Shadow Crystals')
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
    expect(chanseyProse).toContain('manufacture the antidote')
    expect(chanseyProse).toContain('Drink it now')
    expect(chanseyProse).toContain('will not affect you now')
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
})
