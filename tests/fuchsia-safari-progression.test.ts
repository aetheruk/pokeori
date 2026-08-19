import { describe, expect, test } from 'bun:test'
import { battles } from '@/data/battles'
import { expeditions } from '@/data/expeditions'
import { fieldObservationGames } from '@/data/games/field-observation'
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
    expect(safariLocations).toHaveLength(5)
    expect(
      safariLocations.every((entry) => entry.encounterMode === 'safari'),
    ).toBe(true)

    const safariExpeditions = expeditions.filter(
      (entry) =>
        entry.id.startsWith('safari-') && entry.id.endsWith('-expedition'),
    )
    expect(safariExpeditions).toHaveLength(5)
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

  test('trail discoveries are 15 percent and Area 5 awards Strength once', () => {
    const searchStudies = fieldObservationGames.filter((entry) =>
      ['institute', 'central', 'east', 'west', 'north'].some(
        (area) => entry.id === `safari-${area}-field-observation`,
      ),
    )
    expect(searchStudies).toHaveLength(5)
    expect(
      searchStudies.every((entry) =>
        entry.rewards.some(
          (reward) =>
            reward.type === 'task_complete' && reward.dropChance === 15,
        ),
      ),
    ).toBe(true)

    const clueGates = new Map([
      ['safari-central-field-observation', 'safari-clue-last-sign-out'],
      ['safari-east-field-observation', 'safari-clue-reed-twice'],
      ['safari-west-field-observation', 'safari-clue-powder-boardwalk'],
      ['safari-north-field-observation', 'safari-clue-purple-thread'],
    ])
    for (const [studyId, clueId] of clueGates) {
      const study = fieldObservationGames.find((entry) => entry.id === studyId)
      expect(study?.requirements).toContainEqual({
        type: 'task_completed',
        targetId: clueId,
      })
      expect(tasks.find((task) => task.id === clueId)?.secret).toBe(false)
    }

    const areaFive = expeditions.find(
      (entry) => entry.id === 'safari-area-five-expedition',
    )
    expect(areaFive?.activityPool.task).toEqual([
      'safari-area-five-strength-cache',
    ])
    expect(areaFive?.path).toContainEqual(
      expect.objectContaining({
        activityType: 'task',
        activityId: 'safari-area-five-strength-cache',
        secret: true,
        requirements: [
          { type: 'item_owned', targetId: 'tm-strength', inverse: true },
        ],
      }),
    )
    const strength = areaFive?.rewards.find(
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
      inventory: [{ itemId: 'safari-catching-permit', quantity: 1 }],
      pokemon: [],
      tcg: [],
      pokedex: [],
      completedTasks: [],
      battleResults: [],
      locationEncounterResults: [],
      gameResults: [],
      fieldResearchResults: [],
      expeditionResults: [
        {
          expeditionId: 'safari-north-expedition',
          wins: 5,
          losses: 0,
        },
      ],
    } as unknown as RequirementData
    const firstVisit = buildExpeditionSteps(areaFive!, safariProgress)
    expect(
      firstVisit.some(
        (step) => step.activityId === 'safari-area-five-strength-cache',
      ),
    ).toBe(true)

    const returnVisit = buildExpeditionSteps(areaFive!, {
      ...safariProgress,
      inventory: [
        { itemId: 'safari-catching-permit', quantity: 1 },
        { itemId: 'tm-strength', quantity: 1 },
      ],
    })
    expect(
      returnVisit.some(
        (step) => step.activityId === 'safari-area-five-strength-cache',
      ),
    ).toBe(false)
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
    expect(trail).toContain('out-investigated')

    const trial = JSON.stringify(
      tasks.find((task) => task.id === 'fuchsia-gym-trial-ready'),
    )
    expect(trial).toContain('They have been back for hours')
    expect(trial).toContain('how he avoids interruptions')

    const study = JSON.stringify(
      tasks.find((task) => task.id === 'fuchsia-koga-study-toxin'),
    )
    expect(study).toContain('stand over my workbench')
  })
})
