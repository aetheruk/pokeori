import type { ExploreItem } from './types'

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
