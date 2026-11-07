import { SecondaryControlBar } from '@/components/game/shared/SecondaryControlBar'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'

const explorerIcon = {
  type: 'local' as const,
  id: '/fallback/skills/explorer-v2.png',
}

const dailyIcon = {
  type: 'pokemon' as const,
  id: '122',
}

interface FilterBarProps {
  activeCategory: string
  activeSubCategory?: string
  returnLocationName: string
  onOpenRegionModal: () => void
  onOpenAreaModal: () => void
  onOpenDailies: () => void
  onReturnFromDailies: () => void
}

export function FilterBar({
  activeCategory,
  activeSubCategory,
  returnLocationName,
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
          aria-label={`Return to ${returnLocationName} Explore`}
          className="game-focus-ring flex h-12 w-full items-center justify-center gap-2 rounded-md border border-game-border bg-game-surface px-3 text-sm font-medium text-game-ink transition-colors hover:border-game-moss/40"
        >
          <TaskIconDisplay icon={dailyIcon} className="h-8 w-8 shrink-0" />
          <span className="truncate">{returnLocationName}</span>
        </button>
      ) : (
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_3rem] gap-2 sm:gap-3">
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
          <button
            type="button"
            data-haptic="selection"
            onClick={onOpenDailies}
            aria-label="Open Active Dailies"
            title="Active Dailies"
            className="game-focus-ring flex h-12 w-12 items-center justify-center rounded-md border border-game-border bg-game-surface transition-colors hover:border-game-moss/40"
          >
            <TaskIconDisplay icon={dailyIcon} className="h-8 w-8" />
          </button>
        </div>
      )}
    </SecondaryControlBar>
  )
}
