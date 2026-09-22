import { describe, expect, test } from 'bun:test'
import {
  getGuild,
  getGuildMaxXp,
  getGuildRankForXp,
} from '@/data/guilds'
import { getRequirementProgress } from '@/utilities/requirements'
import { calculateLegacyFuchsiaGuildXp } from '@/utilities/guilds/legacy-fuchsia'

describe('guild progression', () => {
  const guild = getGuild('fuchsia-research-guild')!

  test('uses the agreed exponential ten-rank curve', () => {
    expect(guild.ranks.map((rank) => rank.totalXp)).toEqual([
      0, 100, 250, 500, 900, 1550, 2550, 4150, 6500, 10000,
    ])
    expect(getGuildMaxXp(guild)).toBe(10000)
    expect(getGuildRankForXp(guild, 0)).toBe(1)
    expect(getGuildRankForXp(guild, 99)).toBe(1)
    expect(getGuildRankForXp(guild, 100)).toBe(2)
    expect(getGuildRankForXp(guild, 6499)).toBe(8)
    expect(getGuildRankForXp(guild, 6500)).toBe(9)
    expect(getGuildRankForXp(guild, 50000)).toBe(10)
  })

  test('spreads all five existing stamina markers across the ladder', () => {
    const staminaRanks = guild.ranks.filter((rank) =>
      rank.rewards?.some(
        (reward) =>
          reward.type === 'task_complete' &&
          reward.targetId === 'safari-stamina-notes',
      ),
    )
    expect(staminaRanks.map((rank) => rank.rank)).toEqual([2, 4, 6, 7, 8])
  })

  test('reports rank zero for a player who has not joined', () => {
    const data = {
      user: { id: 'new-player', guilds: {} },
      inventory: [],
      pokemon: [],
      tcg: [],
      pokedex: [],
      completedTasks: [],
      battleResults: [],
      locationEncounterResults: [],
      gameResults: [],
      fieldResearchResults: [],
    } as any

    expect(
      getRequirementProgress(data, {
        type: 'guild_rank',
        targetId: guild.id,
        count: 1,
      }),
    ).toEqual({ current: 0, target: 1, completed: false })
  })

  test('evaluates joined guild ranks through normal requirement progress', () => {
    const data = {
      user: { id: 'member', guilds: { [guild.id]: { rank: 4, xp: 500 } } },
      inventory: [],
      pokemon: [],
      tcg: [],
      pokedex: [],
      completedTasks: [],
      battleResults: [],
      locationEncounterResults: [],
      gameResults: [],
      fieldResearchResults: [],
    } as any

    expect(
      getRequirementProgress(data, {
        type: 'guild_rank',
        targetId: guild.id,
        count: 5,
      }),
    ).toEqual({ current: 4, target: 5, completed: false })
  })
})

describe('legacy Fuchsia guild conversion', () => {
  test('honours held notes and recorded purchases', () => {
    expect(
      calculateLegacyFuchsiaGuildXp({
        safariNotes: 75,
        shopPurchases: {
          'safari-credit-wardens-permit': { count: 1 },
          'safari-credit-stamina-notes': { count: 3 },
        },
      }),
    ).toEqual({ xp: 725, rank: 4 })
  })

  test('infers missing purchases from durable unlock state', () => {
    expect(
      calculateLegacyFuchsiaGuildXp({
        completedTasks: {
          'safari-fishing-research-notes': { count: 1 },
          'safari-stamina-notes': { count: 5 },
        },
        unlockedIcons: ['safari-ball'],
        unlockedTitles: ['the-warden'],
      }),
    ).toEqual({ xp: 3950, rank: 7 })
  })

  test('caps imported progress at guild mastery', () => {
    expect(
      calculateLegacyFuchsiaGuildXp({
        safariNotes: 20000,
      }),
    ).toEqual({ xp: 10000, rank: 10 })
  })
})
