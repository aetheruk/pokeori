import { MapIcon } from 'lucide-react'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import type { TaskIcon } from '@/data/tasks'

export function BattleExpeditionProgressIcon({
  icon,
}: {
  icon?: TaskIcon
}) {
  if (icon) {
    return (
      <TaskIconDisplay
        icon={icon}
        className="h-6 w-6"
        normalizeVisibleBounds
        outlineVisiblePixels
      />
    )
  }

  return <MapIcon className="h-6 w-6" aria-hidden="true" />
}
