import { getGuildMaxXp, getGuildRankForXp } from '@/data/guilds'
import { fuchsiaResearchGuild } from '@/data/guilds/fuchsia-research'
import type { GuildProgressData } from '@/types/user-data'

export const FUCHSIA_GUILD_ID = 'fuchsia-research-guild'

export function needsFuchsiaSafariBallBackfill({
  progress,
  unlockedIcons,
}: {
  progress: GuildProgressData
  unlockedIcons?: string[] | null
}) {
  return Math.floor(progress.rank || 0) >= 9 && !unlockedIcons?.includes('safari-ball')
}

export function calculateFuchsiaInstituteBalanceV2({
  progress,
  hasCatchingPermit,
}: {
  progress: GuildProgressData
  hasCatchingPermit: boolean
}) {
  const currentXp = Math.max(0, Math.floor(progress.xp || 0))
  const xp = hasCatchingPermit
    ? Math.min(getGuildMaxXp(fuchsiaResearchGuild), currentXp + 100)
    : 0
  const rank = getGuildRankForXp(fuchsiaResearchGuild, xp)
  const rewardedThroughRank = Math.max(
    rank,
    Math.min(
      10,
      Math.floor(progress.rewardedThroughRank || progress.rank || 1) < 9
        ? Math.floor(progress.rewardedThroughRank || progress.rank || 1) + 1
        : Math.floor(progress.rewardedThroughRank || progress.rank || 1),
    ),
  )

  return { xp, rank, rewardedThroughRank }
}

export const LEGACY_SAFARI_PURCHASE_COSTS: Record<string, number> = {
  'safari-credit-fishing-research-notes': 200,
  'safari-credit-extra-habitat-field-notes': 35,
  'safari-credit-material-deposit-reports': 45,
  'safari-credit-ball-cache-info': 55,
  'safari-credit-unusual-pokemon-sightings': 65,
  'safari-credit-rare-item-rumours': 200,
  'safari-credit-strange-sightings': 1000,
  'safari-credit-notes-on-poachers': 100,
  'safari-credit-wardens-permit': 500,
  'safari-credit-stamina-notes': 50,
  'safari-credit-commemorative-ball': 1000,
  'safari-credit-honorary-title': 2500,
}

const INFERRED_MARKERS: Record<string, string> = {
  'safari-credit-fishing-research-notes': 'safari-fishing-research-notes',
  'safari-credit-extra-habitat-field-notes': 'safari-extra-habitat-field-notes',
  'safari-credit-material-deposit-reports': 'safari-material-deposit-reports',
  'safari-credit-ball-cache-info': 'safari-ball-cache-info',
  'safari-credit-unusual-pokemon-sightings': 'safari-unusual-pokemon-sightings',
  'safari-credit-rare-item-rumours': 'safari-rare-item-rumours',
  'safari-credit-strange-sightings': 'safari-strange-sightings',
  'safari-credit-notes-on-poachers': 'safari-notes-on-poachers',
  'safari-credit-wardens-permit': 'safari-wardens-permit',
  'safari-credit-stamina-notes': 'safari-stamina-notes',
}

export interface LegacyFuchsiaInput {
  safariNotes?: number | null
  completedTasks?: Record<string, { count?: number | null } | undefined>
  shopPurchases?: Record<string, { count?: number | null; itemId?: string | null } | undefined>
  unlockedIcons?: string[] | null
  unlockedTitles?: string[] | null
}

export function calculateLegacyFuchsiaGuildXp(input: LegacyFuchsiaInput) {
  let xp = Math.max(0, Math.floor(input.safariNotes || 0))

  for (const [itemId, cost] of Object.entries(LEGACY_SAFARI_PURCHASE_COSTS)) {
    const direct = input.shopPurchases?.[itemId]
    const purchase =
      direct ||
      Object.values(input.shopPurchases || {}).find(
        (entry) => entry?.itemId === itemId,
      )
    let count = Math.max(0, Math.floor(purchase?.count || 0))

    if (count === 0) {
      if (itemId === 'safari-credit-commemorative-ball') {
        count = input.unlockedIcons?.includes('safari-ball') ? 1 : 0
      } else if (itemId === 'safari-credit-honorary-title') {
        count = input.unlockedTitles?.includes('the-warden') ? 1 : 0
      } else {
        const markerId = INFERRED_MARKERS[itemId]
        const markerCount = markerId
          ? Math.max(0, Math.floor(input.completedTasks?.[markerId]?.count || 0))
          : 0
        count = itemId === 'safari-credit-stamina-notes'
          ? Math.min(5, markerCount)
          : Math.min(1, markerCount)
      }
    }

    xp += cost * count
  }

  const cappedXp = Math.min(getGuildMaxXp(fuchsiaResearchGuild), xp)
  return {
    xp: cappedXp,
    rank: getGuildRankForXp(fuchsiaResearchGuild, cappedXp),
  }
}
