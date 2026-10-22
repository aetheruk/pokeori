/** True when an activity's safe return destination is the active Grid Adventure. */
export function isGridExploreReturnPath(
  returnPath: string | null | undefined,
): boolean {
  if (!returnPath?.startsWith('/') || returnPath.startsWith('//')) return false

  try {
    const destination = new URL(returnPath, 'https://grid-explore.invalid')
    return (
      destination.pathname === '/game/games/grid-puzzle' &&
      destination.searchParams.get('gridReturn') === '1'
    )
  } catch {
    return false
  }
}
