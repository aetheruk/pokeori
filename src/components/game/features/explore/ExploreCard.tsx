import { Card } from '@/components/ui/card'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { VoyageCountdown } from '@/components/game/voyages/voyage-countdown'
import { parseText } from '@/utilities/text-parsing'
import { cn } from '@/lib/utils'
import { Heart, Repeat, Star } from 'lucide-react'
import { memo } from 'react'
import type { ExploreDisplayItem, ExploreItem } from './types'
import { getGameTypeLabel, getTypeIcon, isChronicleExploreItem } from './utils'
import type { RequirementData } from '@/utilities/requirements'
import { getExploreItemBackground, getExploreItemIcon } from './rival-display'
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
  centered?: boolean
}

const getActivityTone = (modeItem: ExploreItem) => {
  const gameType = (modeItem.originalData as any).gameType

  if (modeItem.type === 'location') {
    return {
      orb: 'game-icon-orb-catch border-game-danger/70 text-game-danger',
      button:
        'border-game-danger/55 bg-game-surface-raised text-game-ink hover:border-game-danger/80 hover:bg-game-surface',
      icon: 'bg-game-danger',
      iconText: 'text-game-danger',
    }
  }

  if (modeItem.type === 'game' && gameType === 'fishing') {
    return {
      orb: 'game-icon-orb-fishing border-game-stance-blue/70 text-game-stance-blue-strong',
      button:
        'border-game-stance-blue/55 bg-game-surface-raised text-game-ink hover:border-game-stance-blue-strong/80 hover:bg-game-surface',
      icon: 'bg-game-stance-blue',
      iconText: 'text-game-stance-blue-strong',
    }
  }

  if (modeItem.type === 'battle' || modeItem.type === 'vs-seeker') {
    return {
      orb: 'game-icon-orb-battle border-game-battle-orange/70 text-game-battle-orange-strong',
      button:
        'border-game-battle-orange/55 bg-game-surface-raised text-game-ink hover:border-game-battle-orange-strong/80 hover:bg-game-surface',
      icon: 'bg-game-battle-orange',
      iconText: 'text-game-battle-orange-strong',
    }
  }

  if (modeItem.type === 'field-research') {
    return {
      orb: 'game-icon-orb-research border-game-research/70 text-game-research-strong',
      button:
        'border-game-research/55 bg-game-surface-raised text-game-ink hover:border-game-research-strong/80 hover:bg-game-surface',
      icon: 'bg-game-research',
      iconText: 'text-game-research-strong',
    }
  }

  if (modeItem.type === 'events' || modeItem.type === 'expedition') {
    return {
      orb: 'game-icon-orb-discovery border-game-ochre/70 text-game-ochre',
      button:
        'border-game-ochre/55 bg-game-surface-raised text-game-ink hover:border-game-ochre/80 hover:bg-game-surface',
      icon: 'bg-game-ochre',
      iconText: 'text-game-ochre',
    }
  }

  return {
    orb: 'game-icon-orb-neutral border-game-charcoal/45 text-game-charcoal-strong',
    button:
      'border-game-border bg-game-surface-raised text-game-ink hover:border-game-charcoal/60 hover:bg-game-surface',
    icon: 'bg-game-charcoal',
    iconText: 'text-game-charcoal-strong',
  }
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
  centered = false,
}: ExploreCardProps) {
  const item = entry.kind === 'single' ? entry.item : entry.group.items[0]!
  const groupedItems = entry.kind === 'group' ? entry.group.items : []
  const toneSource =
    entry.kind === 'group'
      ? groupedItems.find((groupedItem) => groupedItem.type === 'location') ||
        item
      : item
  const cardIconTone = getActivityTone(toneSource)
  const expeditionItem =
    item.type === 'expedition'
      ? item
      : groupedItems.find((groupedItem) => groupedItem.type === 'expedition')
  const isChronicle = isChronicleExploreItem(expeditionItem || item)
  const displayName = entry.kind === 'group' ? entry.group.name : item.name
  const displayIcon =
    entry.kind === 'group'
      ? entry.group.icon
      : getExploreItemIcon(item, userData)
  const cardBackground = getExploreItemBackground(item, userData)
  const isEventCard = item.type === 'events'
  const isGrouped = groupedItems.length > 0
  const isActiveVoyage =
    item.type === 'voyage' && activeVoyages.some((v) => v.voyageId === item.id)
  const isActiveExpedition =
    expeditionItem &&
    activeExpedition &&
    activeExpedition.expeditionId === expeditionItem.id &&
    (activeExpedition.status === 'active' ||
      activeExpedition.status === 'ready_to_claim')
  const isHighlighted = isActiveVoyage || isActiveExpedition
  const isLocationMastered = isLocationEntryMastered(entry, userData)
  const isRepeatableTask =
    item.type === 'task' && Boolean((item.originalData as any).repeatable)
  const getModeLabel = (modeItem: ExploreItem) => {
    if (modeItem.type === 'vs-seeker') return 'Battle'
    if (modeItem.type === 'location') return 'Catch'
    if (
      modeItem.type === 'battle' &&
      (modeItem.originalData as any).isWildBattle
    )
      return 'Battle'
    if (modeItem.type === 'field-research') {
      return 'Study'
    }
    if (modeItem.type === 'expedition') return 'Expedition'
    if (
      modeItem.type === 'game' &&
      (modeItem.originalData as any).gameType === 'fishing'
    ) {
      return 'Fish'
    }
    if (isGrouped && modeItem.type === 'game') {
      return /\s+EX$/i.test(modeItem.name) ? 'EX' : 'Normal'
    }
    return getGameTypeLabel(modeItem)
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

  const getGroupedActionTone = (modeItem: ExploreItem) => {
    return getActivityTone(modeItem)
  }

  return (
    <Card
      className={cn(
        'game-focus-ring group relative flex flex-row items-center gap-4 overflow-hidden rounded-lg border p-4 transition-colors',
        isGrouped ? 'cursor-default' : 'cursor-pointer',
        isEventCard
          ? 'border-game-ochre/60 bg-game-surface-raised hover:border-game-ochre/80'
          : isHighlighted
            ? 'border-game-ochre/45 bg-game-surface-raised'
            : 'border-game-card-border bg-game-surface hover:border-game-charcoal/35 hover:bg-game-surface-raised',
        centered && 'justify-center',
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
      {cardBackground && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${cardBackground})` }}
          />
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 bg-gradient-to-l',
              isEventCard
                ? 'from-game-surface-raised/96 via-game-surface/82 to-game-ochre/10'
                : 'from-game-surface-raised/95 via-game-surface/78 to-game-surface/10',
            )}
          />
        </>
      )}

      {!centered && (
        <div className="relative shrink-0">
          <div
            className={cn(
              'game-icon-orb game-icon-orb-art relative z-10 h-14 w-14 shrink-0 overflow-visible transition-colors',
              isEventCard
                ? 'game-icon-orb-discovery border-game-ochre/70 text-game-ochre'
                : isHighlighted
                  ? 'game-icon-orb-discovery border-game-ochre/70 text-game-ochre'
                  : cardIconTone.orb,
            )}
          >
            <TaskIconDisplay
              icon={displayIcon}
              className={cn('h-9 w-9', cardIconTone.iconText)}
            />
            {isLocationMastered && (
              <Star className="pointer-events-none absolute bottom-0 left-1/2 z-20 h-2 w-2 -translate-x-1/2 translate-y-1/2 fill-game-ochre text-game-ochre drop-shadow" />
            )}
            {isRepeatableTask && (
              <span className="pointer-events-none absolute bottom-0 left-1/2 z-20 flex h-5 w-5 -translate-x-1/2 translate-y-1/2 items-center justify-center rounded-full border-2 border-game-surface bg-game-charcoal text-game-cream shadow-sm">
                <Repeat className="h-3 w-3" aria-hidden="true" />
              </span>
            )}
          </div>
        </div>
      )}

      {/* Content Details */}
      <div
        className={cn(
          'relative z-10 flex-1 min-w-0 flex flex-col pt-1',
          centered ? 'items-center text-center' : 'items-end text-right',
        )}
      >
        <h3
          className={cn(
            'line-clamp-3 text-pretty text-base font-semibold leading-tight transition-colors',
            isHighlighted
              ? 'text-game-ochre'
              : 'text-game-ink group-hover:text-game-charcoal-strong',
          )}
        >
          {parseText(displayName, trainerName)}
        </h3>
        {(item.originalData as any)?.eventContexts?.map((event: any) => (
          <p key={event.id} className="mt-1 text-xs text-game-ochre">
            {event.title}
            {event.timingMode !== 'manual' &&
              event.endAt &&
              ` · Ends ${new Date(event.endAt).toLocaleString()}`}
          </p>
        ))}
        {isGrouped && (
          <div
            className={cn(
              'mt-3 flex flex-wrap gap-2',
              centered ? 'justify-center' : 'justify-end',
            )}
          >
            {groupedItems.map((groupedItem) => {
              const tone = getGroupedActionTone(groupedItem)
              const isActive =
                groupedItem.type === 'expedition' &&
                activeExpedition?.expeditionId === groupedItem.id

              return (
                <button
                  key={groupedItem.id}
                  type="button"
                  className={cn(
                    'relative z-20 inline-flex min-h-10 min-w-32 items-stretch overflow-hidden rounded-lg border text-[10px] font-black uppercase tracking-wider shadow-sm transition-colors',
                    tone.button,
                    isActive && 'border-game-ochre/70',
                  )}
                  onClick={(event) => {
                    event.stopPropagation()
                    selectItem(groupedItem)
                  }}
                >
                  <span
                    className={cn(
                      'flex w-10 shrink-0 items-center justify-center text-game-cream [&_svg]:!text-game-cream',
                      tone.icon,
                    )}
                  >
                    {getTypeIcon(groupedItem)}
                  </span>
                  <span className="flex min-w-0 flex-1 items-center justify-end px-3 py-2 text-right leading-none">
                    {getModeLabel(groupedItem)}
                  </span>
                </button>
              )
            })}
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
                  <div className="flex items-center justify-end gap-1.5 font-mono italic text-game-ochre">
                    <span className="h-1.5 w-1.5 rounded-full bg-game-ochre" />
                    <VoyageCountdown endTime={active.endTime} />
                  </div>
                )
              }
            }

            if (
              expeditionItem &&
              activeExpedition &&
              activeExpedition.expeditionId === expeditionItem.id
            ) {
              if (activeExpedition.status === 'ready_to_claim') {
                return (
                  <div className="flex items-center justify-end gap-1.5 font-mono italic text-game-ochre">
                    <span className="h-1.5 w-1.5 rounded-full bg-game-ochre" />
                    Ready to claim
                  </div>
                )
              }

              return (
                <div className="flex items-center justify-end gap-1.5 font-mono italic text-game-ochre">
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
