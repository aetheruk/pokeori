import type { ExploreItem } from './types'

export function isGymChallengeExploreItem(item: ExploreItem): boolean {
  if (item.type !== 'battle' && item.type !== 'task') return false

  const data = item.originalData as {
    isWildBattle?: boolean
    trainerClassId?: string
    title?: string
  }

  if (item.type === 'battle' && data.isWildBattle) return false
  if (item.type === 'battle' && data.trainerClassId === 'gym-leader') return true

  return [item.id, item.name, data.title].some(
    (value) => typeof value === 'string' && /\bgym\b/i.test(value),
  )
}

function getConfiguredLocationGroupName(item: ExploreItem): string | null {
  if (item.type !== 'expedition') return null

  const groupName = (item.originalData as { exploreGroupName?: unknown })
    .exploreGroupName

  return typeof groupName === 'string' && groupName.trim().length > 0
    ? groupName.trim()
    : null
}

export function getLocationCardGroupName(item: ExploreItem): string {
  return getConfiguredLocationGroupName(item) || item.name
}

export function isLocationCardMode(item: ExploreItem): boolean {
  return (
    item.type === 'location' ||
    (item.type === 'battle' &&
      Boolean((item.originalData as { isWildBattle?: boolean }).isWildBattle)) ||
    item.type === 'field-research' ||
    (item.type === 'game' &&
      (item.originalData as { gameType?: string }).gameType === 'fishing') ||
    getConfiguredLocationGroupName(item) !== null
  )
}
