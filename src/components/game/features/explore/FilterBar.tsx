import { MapPin, Timer } from 'lucide-react'
import { SecondaryControlBar } from '@/components/game/shared/SecondaryControlBar'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'

const explorerIcon = {
  type: 'local' as const,
  id: '/fallback/skills/explorer-v2.png',
}

interface FilterBarProps {
  activeCategory: string
  activeSubCategory?: string
  returnRegionName: string
  onOpenRegionModal: () => void
  onOpenAreaModal: () => void
  onOpenDailies: () => void
  onReturnFromDailies: () => void
}

export function FilterBar({
  activeCategory,
  activeSubCategory,
  returnRegionName,
  onOpenRegionModal,
  onOpenAreaModal,
  onOpenDailies,
  onReturnFromDailies,
}: FilterBarProps) {
  if (!activeCategory) return null
  const isDailies = activeCategory === 'Dailies'

  return (
    <SecondaryControlBar desktopInline>
      {isDailies ? (
        <button
          type="button"
          data-haptic="selection"
          onClick={onReturnFromDailies}
          aria-label={`Return to ${returnRegionName} Explore`}
          className="game-focus-ring flex h-12 w-full items-center justify-center gap-2 rounded-md border border-game-border bg-game-surface px-3 text-sm font-medium text-game-ink transition-colors hover:border-game-moss/40"
        >
          <MapPin className="h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="truncate">{returnRegionName}</span>
        </button>
      ) : (
        <div className="grid grid-cols-[minmax(0,1fr)_3rem_minmax(0,1fr)] gap-2 sm:gap-3">
          <button
            type="button"
            data-haptic="selection"
            onClick={onOpenRegionModal}
            className="game-focus-ring flex h-12 min-w-0 items-center rounded-md border border-game-border bg-game-surface px-3 text-left text-sm font-medium text-game-ink transition-colors hover:border-game-moss/40"
          >
            <TaskIconDisplay
              icon={explorerIcon}
              normalizeVisibleBounds
              className="mr-2 h-7 w-7 shrink-0"
            />
            <span className="min-w-0 flex-1 truncate">{activeCategory}</span>
          </button>
          <button
            type="button"
            data-haptic="selection"
            onClick={onOpenDailies}
            aria-label="Open Active Dailies"
            title="Active Dailies"
            className="game-focus-ring flex h-12 w-12 items-center justify-center rounded-md border border-game-border bg-game-surface text-game-ink transition-colors hover:border-game-moss/40"
          >
            <Timer className="h-5 w-5" aria-hidden="true" />
          </button>
          <button
            type="button"
            data-haptic="selection"
            onClick={onOpenAreaModal}
            className="game-focus-ring flex h-12 min-w-0 items-center rounded-md border border-game-border bg-game-surface px-3 text-left text-sm font-medium text-game-ink transition-colors hover:border-game-moss/40"
          >
            <TaskIconDisplay
              icon={explorerIcon}
              normalizeVisibleBounds
              className="mr-2 h-7 w-7 shrink-0"
            />
            <span className="min-w-0 flex-1 truncate">
              {activeSubCategory || 'Choose area'}
            </span>
          </button>
        </div>
      )}
    </SecondaryControlBar>
  )
}
