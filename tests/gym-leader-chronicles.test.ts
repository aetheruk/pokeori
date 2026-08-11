import { describe, expect, test } from 'bun:test'
import { battles } from '@/data/battles'
import { expeditions } from '@/data/expeditions'
import { allGames } from '@/data/games'
import { KANTO_GYM_CHRONICLE_STORIES } from '@/data/gym-leader-chronicle-stories'
import { KANTO_GYM_CHRONICLES } from '@/data/gym-leader-chronicles'
import { SPIRIT_CHANNELING_CONFIGS } from '@/data/spirit-channeling'
import { tasks } from '@/data/tasks'

const expectedRituals = [
  ['badge-kanto-boulder', 'rock', 97, 5, 200],
  ['badge-kanto-cascade', 'water', 77, 10, 300],
  ['badge-kanto-thunder', 'electric', 54, 15, 400],
  ['badge-kanto-rainbow', 'grass', 64, 20, 500],
  ['badge-kanto-soul', 'poison', 96, 25, 600],
  ['badge-kanto-marsh', 'psychic', 59, 30, 700],
  ['badge-kanto-volcano', 'fire', 51, 35, 800],
  ['badge-kanto-earth', 'ground', 81, 40, 1000],
] as const

const expectedPathLengths = {
  brock: 12,
  misty: 13,
  surge: 12,
  erika: 11,
  koga: 13,
  sabrina: 12,
  blaine: 14,
  giovanni: 12,
} as const

const expectedGameTypes = {
  brock: ['mining', 'rhythm'],
  misty: ['cry', 'rhythm'],
  surge: ['cry', 'magnemite-circuit'],
  erika: ['art-academy', 'identify', 'rhythm'],
  koga: ['identify', 'silhouette'],
  sabrina: ['silhouette', 'sliding-puzzle'],
  blaine: ['compare', 'rhythm'],
  giovanni: ['rock-push'],
} as const

describe('Kanto Gym Leader Chronicles', () => {
  test('every badge channels with Memory Incense and its exact authored energy', () => {
    for (const [badgeId, type, amount, minLevel] of expectedRituals) {
      const config = SPIRIT_CHANNELING_CONFIGS.find(
        (candidate) => candidate.mementoItemId === badgeId,
      )
      expect(config).toBeDefined()
      expect(config?.correctIncenseItemId).toBe('incense-memory')
      expect(config?.requiredEnergy).toEqual({ [type]: amount })
      expect(config?.channelerMinLevel).toBe(minLevel)
    }
  })

  test('every Chronicle is a fixed long-form personal story with its authored reward', () => {
    for (const [badgeId, , , , explorerXp] of expectedRituals) {
      const definition = KANTO_GYM_CHRONICLES.find(
        (candidate) => candidate.badgeItemId === badgeId,
      )!
      const expedition = expeditions.find(
        (candidate) => candidate.id === definition.expeditionId,
      )

      expect(expedition).toBeDefined()
      expect(expedition?.category).toBe('Kanto')
      expect(expedition?.subCategory).toBe('Pokemon Tower')
      expect(expedition?.canFail).toBe(false)
      expect(expedition?.path).toHaveLength(expectedPathLengths[definition.key])
      expect(expedition?.path.every((node) => node.type === 'activity')).toBe(
        true,
      )
      expect(
        expedition?.path.every(
          (node) => node.type !== 'activity' || node.secret,
        ),
      ).toBe(true)
      expect(expedition?.rewards).toContainEqual(
        expect.objectContaining({
          type: 'xp',
          skill: 'catching',
          quantity: explorerXp,
        }),
      )
      expect(expedition?.requirements).toContainEqual(
        expect.objectContaining({
          type: 'task_completed',
          targetId: definition.markerId,
        }),
      )
    }
  })

  test('the anthology uses distinct scene structures and signature game mixes', () => {
    const pathSignatures = new Set<string>()

    for (const definition of KANTO_GYM_CHRONICLES) {
      const expedition = expeditions.find(
        (candidate) => candidate.id === definition.expeditionId,
      )!
      const story = KANTO_GYM_CHRONICLE_STORIES[definition.key]
      const taskNodes = expedition.path.filter(
        (node) => node.type === 'activity' && node.activityType === 'task',
      )
      const gameTypes = expedition.path
        .flatMap((node) =>
          node.type === 'activity' && node.activityType === 'game'
            ? [allGames.find((game) => game.id === node.activityId)?.gameType]
            : [],
        )
        .sort()

      expect(taskNodes).toHaveLength(story.scenes.length)
      expect(
        story.scenes.every(
          (scene) => scene.dialogue.length >= 2 && scene.dialogue.length <= 4,
        ),
      ).toBe(true)
      expect(gameTypes).toEqual([...expectedGameTypes[definition.key]].sort())

      const signature = expedition.path
        .map((node) =>
          node.type === 'activity' ? node.activityType?.slice(0, 1) : '?',
        )
        .join('')
      pathSignatures.add(signature)
    }

    expect(pathSignatures.size).toBe(KANTO_GYM_CHRONICLES.length)
  })

  test('every Chronicle awards Explorer XP through the canonical catching skill id', () => {
    const chronicleXpRewards = expeditions
      .filter((expedition) => expedition.chronicle)
      .flatMap((expedition) => expedition.rewards || [])
      .filter((reward) => reward.type === 'xp')

    expect(chronicleXpRewards.length).toBeGreaterThan(0)
    expect(
      chronicleXpRewards.every((reward) => reward.skill === 'catching'),
    ).toBe(true)
  })

  test('Erika can bring her full team to the exhibition challenge', () => {
    const expedition = expeditions.find(
      (candidate) => candidate.id === 'erika-rainbow-badge-chronicle',
    )
    const chronicle =
      typeof expedition?.chronicle === 'object'
        ? expedition.chronicle
        : undefined
    const exeggutor = chronicle?.battleTeam?.find(
      (pokemon) => pokemon.speciesId === 103,
    )
    const exhibitionBattle = battles.find(
      (battle) => battle.id === 'chronicle-erika-exhibition-rival',
    )

    expect(exhibitionBattle?.maxPokemon).toBe(3)
    expect(exeggutor?.assignedMoves).toContain('psybeam')
    expect(exeggutor?.assignedMoves).toContain('sleep-powder')
  })

  test('supporting activities exist and do not expose later-world plot terms', () => {
    const gameIds = new Set(allGames.map((game) => game.id))
    const battleIds = new Set(battles.map((battle) => battle.id))
    const taskIds = new Set(tasks.map((task) => task.id))

    for (const definition of KANTO_GYM_CHRONICLES) {
      const expedition = expeditions.find(
        (candidate) => candidate.id === definition.expeditionId,
      )!
      expect(taskIds.has(definition.markerId)).toBe(true)

      for (const node of expedition.path) {
        if (node.type !== 'activity') continue
        if (node.activityType === 'task')
          expect(taskIds.has(node.activityId!)).toBe(true)
        if (node.activityType === 'battle')
          expect(battleIds.has(node.activityId!)).toBe(true)
        if (node.activityType === 'game')
          expect(gameIds.has(node.activityId!)).toBe(true)
      }

      const authored = JSON.stringify({
        name: expedition.name,
        description: expedition.description,
        chronicle: expedition.chronicle,
        tasks: tasks.filter(
          (task) => task.subCategory === `${definition.leaderName} Chronicle`,
        ),
        battles: battles.filter(
          (battle) =>
            battle.subCategory === `${definition.leaderName} Chronicle`,
        ),
        games: allGames.filter(
          (game) =>
            game.subCategory === `${definition.leaderName} Chronicle`,
        ),
      }).toLowerCase()
      expect(authored.includes('—'), `${definition.key}:em dash`).toBe(false)
      for (const forbidden of [
        'shadow pokemon',
        'rift',
        'mewtwo',
        'team rainbow rocket',
      ]) {
        expect(
          authored.includes(forbidden),
          `${definition.key}:${forbidden}`,
        ).toBe(false)
      }
    }
  })
})
