import { describe, expect, test } from 'bun:test'
import { battles } from '@/data/battles'
import { expeditions } from '@/data/expeditions'
import { allGames } from '@/data/games'
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

  test('every Chronicle is a fixed eight-step personal story with its authored reward', () => {
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
      expect(expedition?.path).toHaveLength(8)
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
          skill: 'explorer',
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
