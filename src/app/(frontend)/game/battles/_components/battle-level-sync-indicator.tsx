import { RefreshCw } from 'lucide-react'

export function BattleLevelSyncIndicator({
  actualLevel,
  battleLevel,
}: {
  actualLevel?: number
  battleLevel: number
}) {
  if (actualLevel === undefined || actualLevel === battleLevel) return null

  const description = `Level synced from ${actualLevel} to ${battleLevel}`

  return (
    <span
      role="img"
      aria-label={description}
      title={description}
      className="inline-flex shrink-0 items-center text-game-danger"
    >
      <RefreshCw aria-hidden="true" className="h-2 w-2" />
    </span>
  )
}
