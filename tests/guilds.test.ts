import { describe, expect, test } from 'bun:test'
import {
  getGuild,
  getGuildMaxXp,
  getGuildRankForXp,
} from '@/data/guilds'
import { getRequirementProgress } from '@/utilities/requirements'
import {
  calculateFuchsiaInstituteBalanceV2,
  calculateLegacyFuchsiaGuildXp,
  needsFuchsiaSafariBallBackfill,
} from '@/utilities/guilds/legacy-fuchsia'
import { undergroundSocietyGuild } from '@/data/guilds/underground-society'

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
    expect(staminaRanks.map((rank) => rank.rank)).toEqual([3, 4, 5, 6, 7])
  })

  test('uses authored artwork for every Institute rank', () => {
    expect(guild.ranks.map((rank) => rank.icon)).toEqual([
      { type: 'item', id: 'researchers-journal-page' },
      { type: 'pokemon', id: '113' },
      { type: 'pokemon', id: '127' },
      { type: 'item', id: 'metal-scrap-t1' },
      { type: 'trainer', id: 'rocket-grunt-m' },
      { type: 'pokemon', id: '147' },
      { type: 'pokemon', id: '123' },
      { type: 'pokemon', id: '128' },
      { type: 'item', id: 'safari-ball' },
      { type: 'item', id: 'researchers-journal-page' },
    ])
  })

  test('grants the Safari Ball profile icon at Rank 9', () => {
    const iconRewardRanks = guild.ranks
      .filter((rank) =>
        rank.rewards?.some(
          (reward) => reward.type === 'icon' && reward.targetId === 'safari-ball',
        ),
      )
      .map((rank) => rank.rank)

    expect(iconRewardRanks).toEqual([9])
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

  test('supports the Underground Society curve and rank names', () => {
    expect(undergroundSocietyGuild.ranks.map((rank) => rank.totalXp)).toEqual([
      0, 10000, 25000, 50000, 100000, 180000, 300000, 480000, 720000, 1000000,
    ])
    expect(undergroundSocietyGuild.ranks.map((rank) => rank.name)).toEqual([
      'New Recruit', 'TCG Maniac', 'TCG Influencer', 'TCG Operative', 'Supervisor',
      'Operations Manager', 'Regional Lead', 'Global Lead', 'Pits Favoured', 'Lord of the Pit',
    ])
    expect(getGuildRankForXp(undergroundSocietyGuild, 24999)).toBe(2)
    expect(getGuildRankForXp(undergroundSocietyGuild, 25000)).toBe(3)
    expect(getGuildRankForXp(undergroundSocietyGuild, 1000000)).toBe(10)
  })
})

describe('Fuchsia Institute balance v2 conversion', () => {
  test('backfills the Safari Ball only for qualifying Rank 9 members', () => {
    expect(
      needsFuchsiaSafariBallBackfill({
        progress: { rank: 9, xp: 6500 },
        unlockedIcons: [],
      }),
    ).toBe(true)
    expect(
      needsFuchsiaSafariBallBackfill({
        progress: { rank: 8, xp: 6499 },
        unlockedIcons: [],
      }),
    ).toBe(false)
    expect(
      needsFuchsiaSafariBallBackfill({
        progress: { rank: 9, xp: 6500 },
        unlockedIcons: ['safari-ball'],
      }),
    ).toBe(false)
  })

  test('adds the Catching Permit award and preserves shifted legacy rewards', () => {
    expect(
      calculateFuchsiaInstituteBalanceV2({
        progress: { rank: 7, xp: 2661, rewardedThroughRank: 7 },
        hasCatchingPermit: true,
      }),
    ).toEqual({ rank: 7, xp: 2761, rewardedThroughRank: 8 })
  })

  test('removes pre-permit Institute XP without forgetting grandfathered rewards', () => {
    expect(
      calculateFuchsiaInstituteBalanceV2({
        progress: { rank: 2, xp: 120, rewardedThroughRank: 2 },
        hasCatchingPermit: false,
      }),
    ).toEqual({ rank: 1, xp: 0, rewardedThroughRank: 3 })
  })

  test('leaves the capstone available to legacy Deputy Wardens', () => {
    expect(
      calculateFuchsiaInstituteBalanceV2({
        progress: { rank: 9, xp: 7000, rewardedThroughRank: 9 },
        hasCatchingPermit: true,
      }),
    ).toEqual({ rank: 9, xp: 7100, rewardedThroughRank: 9 })
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
