import { Card } from '@/components/ui/card'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { VoyageCountdown } from '@/components/game/voyages/voyage-countdown'
import { parseText } from '@/utilities/text-parsing'
import { cn } from '@/lib/utils'
import { Heart, Star } from 'lucide-react'
import { memo } from 'react'
import type { ExploreDisplayItem, ExploreItem } from './types'
import { getGameTypeLabel, getTypeIcon, isChronicleExploreItem } from './utils'
import type { RequirementData } from '@/utilities/requirements'
import { getExploreItemIcon } from './rival-display'
import { isLocationEntryMastered } from './location-completion'

interface ExploreCardProps {
  entry: ExploreDisplayItem
  trainerName: string
  userData: RequirementData
  activeVoyages: { voyageId: string; endTime: string }[]
  activeExpedition: any | null
  onAction: (item: ExploreItem) => void
  playSelectSfx: () => void
  setActiveShop: (shop: any) => void // Type this properly if possible
  setSelectedItem: (item: ExploreItem) => void
}

function ExploreCardComponent({
  entry,
  trainerName,
  userData,
  activeVoyages,
  activeExpedition,
  onAction,
  playSelectSfx,
  setActiveShop,
  setSelectedItem,
}: ExploreCardProps) {
  const item = entry.kind === 'single' ? entry.item : entry.group.items[0]!
  const isChronicle = isChronicleExploreItem(item)
  const groupedItems = entry.kind === 'group' ? entry.group.items : []
  const displayName = entry.kind === 'group' ? entry.group.name : item.name
  const displayIcon =
    entry.kind === 'group'
      ? entry.group.icon
      : getExploreItemIcon(item, userData)
  const isGrouped = groupedItems.length > 0
  const isActiveVoyage =
    item.type === 'voyage' && activeVoyages.some((v) => v.voyageId === item.id)
  const isActiveExpedition =
    item.type === 'expedition' &&
    activeExpedition &&
    activeExpedition.expeditionId === item.id &&
    (activeExpedition.status === 'active' ||
      activeExpedition.status === 'ready_to_claim')
  const isHighlighted = isActiveVoyage || isActiveExpedition
  const isLocationMastered = isLocationEntryMastered(entry, userData)
  const getModeLabel = (modeItem: ExploreItem) => {
    if (modeItem.type === 'vs-seeker') return 'Battle'
    if (modeItem.type === 'location') return 'Catch'
    if (
      modeItem.type === 'battle' &&
      (modeItem.originalData as any).isWildBattle
    )
      return 'Battle'
    if (
      modeItem.type === 'research' &&
      (modeItem.originalData as any).gameType === 'field-observation'
    ) {
      return 'Study'
    }
    if (
      modeItem.type === 'research' &&
      (modeItem.originalData as any).gameType === 'fishing'
    ) {
      return 'Fish'
    }
    if (isGrouped && modeItem.type === 'research') {
      return /\s+EX$/i.test(modeItem.name) ? 'EX' : 'Normal'
    }
    return getGameTypeLabel(modeItem)
  }
  const getGroupedTypeLabel = () => {
    if (item.type === 'vs-seeker') return 'TRAINER REMATCH'
    if (!isGrouped) return getGameTypeLabel(item)
    if (groupedItems.every((groupedItem) => groupedItem.type === 'research'))
      return 'MINI GAME'
    return 'LOCATION'
  }
  const isInteractive = !isGrouped
  const selectItem = (targetItem: ExploreItem) => {
    playSelectSfx()
    if (targetItem.type === 'shop') {
      setActiveShop(targetItem.originalData)
    } else {
      setSelectedItem(targetItem)
    }
  }

  return (
    <Card
      className={cn(
        'game-focus-ring group relative flex flex-row items-center gap-4 overflow-hidden rounded-lg border p-4 transition-colors',
        isGrouped ? 'cursor-default' : 'cursor-pointer',
        isHighlighted
          ? 'border-game-ochre/45 bg-game-ochre/10'
          : 'border-game-border bg-game-surface hover:border-game-moss/35 hover:bg-game-surface-raised',
      )}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={isInteractive ? `Open ${displayName}` : undefined}
      onClick={isInteractive ? () => selectItem(item) : undefined}
      onKeyDown={
        isInteractive
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                selectItem(item)
              }
            }
          : undefined
      }
    >
      <div className="relative shrink-0">
        <div
          className={cn(
            'relative z-10 flex h-14 w-14 items-center justify-center rounded-lg border transition-colors',
            isHighlighted
              ? 'border-game-ochre/45 bg-game-surface-raised'
              : 'border-game-border bg-game-surface-raised group-hover:border-game-moss/35',
          )}
        >
          <div className="">
            <TaskIconDisplay
              icon={displayIcon}
              className={cn(
                'w-9 h-9',
                isHighlighted ? 'text-game-ochre' : 'text-game-ink',
              )}
            />
          </div>
          {isLocationMastered && (
            <Star className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-2 w-2 -translate-x-1/2 translate-y-1/2 fill-game-ochre text-game-ochre drop-shadow" />
          )}
        </div>
      </div>

      {/* Content Details */}
      <div className="flex-1 min-w-0 flex flex-col pt-1">
        <span
          className={cn(
            'mb-1 text-[11px] font-semibold uppercase tracking-wide transition-colors',
            isHighlighted
              ? 'text-game-ochre'
              : 'text-game-moss-strong group-hover:text-game-moss',
          )}
        >
          {getGroupedTypeLabel()}
        </span>
        <h3
          className={cn(
            'line-clamp-3 text-base font-semibold leading-tight transition-colors',
            isHighlighted
              ? 'text-game-ochre'
              : 'text-game-ink group-hover:text-game-moss-strong',
          )}
        >
          {parseText(displayName, trainerName)}
        </h3>
        {isGrouped && (
          <div className="mt-3 flex flex-wrap gap-2">
            {groupedItems.map((groupedItem) => (
              <button
                key={groupedItem.id}
                type="button"
                className="relative z-20 inline-flex min-h-10 min-w-20 items-center justify-center gap-1.5 rounded-md border border-game-border bg-game-surface-raised px-2.5 text-[10px] font-black uppercase tracking-wider text-game-muted transition-colors hover:border-game-moss/60 hover:text-game-moss-strong"
                onClick={(event) => {
                  event.stopPropagation()
                  selectItem(groupedItem)
                }}
              >
                {getTypeIcon(groupedItem)}
                {getModeLabel(groupedItem)}
              </button>
            ))}
          </div>
        )}
        <div
          className={cn(
            isGrouped
              ? 'mt-2 text-[10px] font-bold uppercase tracking-wider truncate'
              : 'mt-1.5 text-[10px] font-bold uppercase tracking-wider truncate',
            isHighlighted
              ? 'text-game-ochre'
              : 'text-game-muted group-hover:text-game-ink',
          )}
        >
          {(() => {
            if (item.type === 'voyage') {
              const active = activeVoyages.find((v) => v.voyageId === item.id)
              if (active) {
                return (
                  <div className="flex items-center gap-1.5 font-mono italic text-game-ochre">
                    <span className="h-1.5 w-1.5 rounded-full bg-game-ochre" />
                    <VoyageCountdown endTime={active.endTime} />
                  </div>
                )
              }
            }

            if (
              item.type === 'expedition' &&
              activeExpedition &&
              activeExpedition.expeditionId === item.id
            ) {
              if (activeExpedition.status === 'ready_to_claim') {
                return (
                  <div className="flex items-center gap-1.5 font-mono italic text-game-ochre">
                    <span className="h-1.5 w-1.5 rounded-full bg-game-ochre" />
                    Ready to claim
                  </div>
                )
              }

              return (
                <div className="flex items-center gap-1.5 font-mono italic text-game-ochre">
                  <span className="h-1.5 w-1.5 rounded-full bg-game-ochre" />
                  {(activeExpedition.steps?.[activeExpedition.currentStepIndex]
                    ?.type || 'activity') === 'branch_choice'
                    ? 'Choose Branch'
                    : (activeExpedition.steps?.[
                          activeExpedition.currentStepIndex
                        ]?.type || 'activity') === 'result_branch'
                      ? isChronicle
                        ? 'Resolving Chronicle'
                        : 'Resolving Route'
                      : `Step ${Math.min((activeExpedition.currentStepIndex || 0) + 1, activeExpedition.totalSteps || 1)}/${activeExpedition.totalSteps || 1}`}{' '}
                  ·
                  <span className="inline-flex items-center gap-1">
                    <Heart className="w-3.5 h-3.5 text-game-danger" />
                    Lives{' '}
                    {Math.max(
                      0,
                      (activeExpedition.maxLosses || 0) -
                        (activeExpedition.losses || 0),
                    )}
                    /{activeExpedition.maxLosses || 0}
                  </span>
                </div>
              )
            }

            return null
          })()}
        </div>
      </div>

      {/* Type Icon Accessory */}
      <div
        className={cn(
          isGrouped ? 'hidden' : 'ml-2 shrink-0 transition-colors',
          isHighlighted
            ? 'text-game-moss-strong'
            : 'text-game-muted group-hover:text-game-ink',
        )}
        title={item.type}
      >
        {getTypeIcon(item)}
      </div>
    </Card>
  )
}

export const ExploreCard = memo(
  ExploreCardComponent,
  (prev, next) =>
    prev.entry === next.entry &&
    prev.trainerName === next.trainerName &&
    prev.userData === next.userData &&
    prev.activeVoyages === next.activeVoyages &&
    prev.activeExpedition === next.activeExpedition,
)
