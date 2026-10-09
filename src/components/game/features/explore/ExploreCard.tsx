import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { CurrencySprite } from '@/components/ui/currency-sprite'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { GridPlayerSprite } from '@/components/game/shared/grid-player-sprite'
import { VoyageCountdown } from '@/components/game/voyages/voyage-countdown'
import { parseText } from '@/utilities/text-parsing'
import { cn } from '@/lib/utils'
import { Repeat } from 'lucide-react'
import { memo } from 'react'
import type { ExploreDisplayItem, ExploreItem } from './types'
import { getGameTypeLabel } from './utils'
import type { RequirementData } from '@/utilities/requirements'
import { getSkill } from '@/data/skills/definitions'
import { getCurrency } from '@/data/currencies'
import type { TaskIcon } from '@/data/tasks/types'
import { getExploreItemBackground, getExploreItemIcon } from './rival-display'

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
      iconText: 'text-game-danger',
    }
  }

  if (modeItem.type === 'game' && gameType === 'fishing') {
    return {
      iconText: 'text-game-stance-blue-strong',
    }
  }

  if (modeItem.type === 'battle' || modeItem.type === 'vs-seeker') {
    return {
      iconText: 'text-game-battle-orange-strong',
    }
  }

  if (modeItem.type === 'field-research') {
    return {
      iconText: 'text-game-research-strong',
    }
  }

  if (modeItem.type === 'events' || modeItem.type === 'expedition') {
    return {
      iconText: 'text-game-ochre',
    }
  }

  return {
    iconText: 'text-game-charcoal-strong',
  }
}

const getActionIcon = (modeItem: ExploreItem): TaskIcon => {
  if (modeItem.type === 'voyage' || modeItem.type === 'expedition') {
    return { type: 'item', id: 'escape-rope' }
  }
  if (modeItem.type === 'task') {
    return { type: 'item', id: 'explorers-journal' }
  }
  if (modeItem.type === 'location') {
    return { type: 'item', id: 'poke-ball' }
  }
  if (modeItem.type === 'field-research') {
    return { type: 'item', id: 'eject-pack' }
  }
  if (modeItem.type === 'vs-seeker') {
    return { type: 'item', id: 'vs-seeker' }
  }
  if (modeItem.type === 'battle') {
    return modeItem.originalData.isWildBattle
      ? { type: 'item', id: 'battle-potion' }
      : { type: 'item', id: 'vs-seeker' }
  }
  if (modeItem.type === 'shop') {
    return {
      type: 'local',
      id: '/fallback/skills/inventory-v2.png',
    }
  }
  if (modeItem.type === 'game') {
    return {
      type: 'item' as const,
      id:
        modeItem.originalData.gameType === 'tcg-inspection'
          ? 'empty-foil-pack'
          : modeItem.originalData.gameType === 'tcg-battle'
            ? 'deck-box'
            : modeItem.originalData.gameType === 'fishing'
              ? 'super-rod'
              : /\s+EX$/i.test(modeItem.name)
                ? 'master-ball'
                : 'rotom-light-bulb-manual',
    }
  }

  return {
    type: 'local',
    id: `/fallback/skills/${getSkill('catching')?.iconId || 'explorer-v2.png'}`,
  }
}

const EXPLORE_CONTENT_ICON_OVERRIDES: Record<string, TaskIcon> = {
  'tutorial-1': { type: 'pokemon', id: '16' },
  'viridian-outskirts': { type: 'pokemon', id: '32' },
  'route-2': { type: 'pokemon', id: '19' },
  'route-3': { type: 'pokemon', id: '21' },
  'exp-mt-moon-b2f': { type: 'pokemon', id: '74' },
  'mt-moon-expedition-b2f': { type: 'pokemon', id: '74' },
  'mt-moon-expedition': { type: 'item', id: 'moon-stone' },
  'cerulean-gym-pool': { type: 'item', id: 'badge-kanto-cascade' },
  'cerulean-gym-pool-daily': { type: 'item', id: 'badge-kanto-cascade' },
  'retro-trainer-cards': { type: 'trainer', id: 'oak' },
}

const getShopCurrencyId = (shop: any) => {
  const currencyIds = [
    ...new Set<string>(
      (shop.items || []).flatMap((item: any) =>
        (item.cost || [])
          .filter((cost: any) => cost.type === 'currency')
          .map((cost: any) => cost.id),
      ),
    ),
  ]

  return currencyIds.length === 1 && getCurrency(currencyIds[0]!)
    ? currencyIds[0]
    : undefined
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
  const displayName = entry.kind === 'group' ? entry.group.name : item.name
  const contentIconOverride = [item, ...groupedItems].find(
    (cardItem) => EXPLORE_CONTENT_ICON_OVERRIDES[cardItem.id],
  )
  const displayIcon = contentIconOverride
    ? EXPLORE_CONTENT_ICON_OVERRIDES[contentIconOverride.id]!
    : entry.kind === 'group'
      ? entry.group.icon
      : getExploreItemIcon(item, userData)
  const cardBackground = getExploreItemBackground(item, userData)
  const isEventCard = item.type === 'events'
  const isGrouped = groupedItems.length > 0
  const actionItems = isGrouped ? groupedItems : [item]
  const isActiveVoyage =
    item.type === 'voyage' && activeVoyages.some((v) => v.voyageId === item.id)
  const isActiveExpedition =
    expeditionItem &&
    activeExpedition &&
    activeExpedition.expeditionId === expeditionItem.id &&
    (activeExpedition.status === 'active' ||
      activeExpedition.status === 'ready_to_claim')
  const isHighlighted = isActiveVoyage || isActiveExpedition
  const isRepeatableTask =
    item.type === 'task' && Boolean((item.originalData as any).repeatable)
  const getModeLabel = (modeItem: ExploreItem) => {
    if (modeItem.type === 'events') return 'View events'
    if (modeItem.type === 'shop') return 'Browse shop'
    if (modeItem.type === 'voyage') return 'View voyage'
    if (modeItem.type === 'task') {
      return (modeItem.originalData as any).chat ? 'Talk' : 'View task'
    }
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
    const label = getGameTypeLabel(modeItem)
    return label === 'TCG'
      ? label
      : label.charAt(0).toUpperCase() + label.slice(1).toLowerCase()
  }
  const activeExpeditionProgress =
    isActiveExpedition && activeExpedition
      ? `${Math.min(
          (activeExpedition.currentStepIndex || 0) + 1,
          activeExpedition.totalSteps || 1,
        )}/${activeExpedition.totalSteps || 1}`
      : null
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
        'relative flex flex-row items-center gap-4 overflow-hidden rounded-md rounded-tr-none border p-4',
        isEventCard
          ? 'border-game-ochre/60 bg-game-surface-raised'
          : isHighlighted
            ? 'border-game-ochre/45 bg-game-surface-raised'
            : 'border-game-card-border bg-game-surface',
        centered && 'justify-center',
      )}
    >
      {cardBackground && (
        <>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-70"
            style={{ backgroundImage: `url(${cardBackground})` }}
          />
          <div
            aria-hidden="true"
            className={cn(
              'pointer-events-none absolute inset-0 bg-gradient-to-r',
              isEventCard
                ? 'from-game-surface-raised/78 via-game-surface/58 to-game-ochre/10'
                : 'from-game-surface-raised/76 via-game-surface/56 to-game-surface/10',
            )}
          />
        </>
      )}

      {!centered && (
        <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center">
          <TaskIconDisplay
            icon={displayIcon}
            normalizeVisibleBounds
            outlineVisiblePixels
            className={cn('relative z-10 h-9 w-9', cardIconTone.iconText)}
          />
        </div>
      )}

      {/* Content Details */}
      <div
        className={cn(
          'relative z-10 flex min-w-0 flex-1 flex-col self-stretch',
          centered
            ? 'items-center justify-center text-center'
            : 'items-end text-right',
        )}
      >
        <h3 className="-mr-4 -mt-4 line-clamp-2 w-fit max-w-full rounded-md rounded-tl-none rounded-tr-none rounded-br-none bg-game-charcoal px-2 py-1 text-right text-xs font-bold leading-tight tracking-[0.12em] text-white">
          {parseText(displayName, trainerName)}
          {activeExpeditionProgress && (
            <span className="ml-1 text-game-battle-orange">
              {activeExpeditionProgress}
            </span>
          )}
          {isRepeatableTask && (
            <Repeat
              className="ml-1 inline-block h-3 w-3 align-[-2px] text-game-battle-orange"
              aria-hidden="true"
            />
          )}
        </h3>
        {(item.originalData as any)?.eventContexts?.map((event: any) => (
          <p key={event.id} className="mt-1 text-xs text-game-ochre">
            {event.title}
            {event.timingMode !== 'manual' &&
              event.endAt &&
              ` · Ends ${new Date(event.endAt).toLocaleString()}`}
          </p>
        ))}
        {actionItems.length > 0 && (
          <div
            className={cn(
              'order-last mt-auto flex max-w-full flex-wrap gap-2 pt-3',
              centered ? 'justify-center' : 'justify-end',
            )}
          >
            {actionItems.map((groupedItem) => {
              const isConversation =
                groupedItem.type === 'task' && groupedItem.originalData.chat
              const shopCurrencyId =
                groupedItem.type === 'shop'
                  ? getShopCurrencyId(groupedItem.originalData)
                  : undefined
              const isActive =
                groupedItem.type === 'expedition' &&
                activeExpedition?.expeditionId === groupedItem.id
              const activeVoyageData =
                groupedItem.type === 'voyage'
                  ? activeVoyages.find(
                      (voyage) => voyage.voyageId === groupedItem.id,
                    )
                  : undefined

              return (
                <Button
                  key={groupedItem.id}
                  type="button"
                  variant="ghost"
                  size="icon"
                  title={getModeLabel(groupedItem)}
                  className={cn(
                    'relative z-20 size-11 rounded-md border border-game-charcoal/15 bg-game-surface-raised/50 p-0 shadow-none backdrop-blur-[2px] hover:border-game-charcoal/30 hover:bg-game-surface-raised/75 active:bg-game-surface-raised/90',
                    activeVoyageData && 'h-11 w-auto min-w-28 px-2',
                    isActive && 'border-game-ochre/60',
                  )}
                  onClick={() => selectItem(groupedItem)}
                >
                  <span className="sr-only">
                    {activeVoyageData
                      ? 'Voyage status:'
                      : `${getModeLabel(groupedItem)}:`}{' '}
                    {parseText(groupedItem.name, trainerName)}
                  </span>
                  {activeVoyageData ? (
                    <VoyageCountdown
                      endTime={activeVoyageData.endTime}
                      className="pointer-events-none whitespace-nowrap text-[10px]"
                    />
                  ) : (
                    <span aria-hidden="true" className="pointer-events-none">
                      {isConversation ? (
                        <GridPlayerSprite
                          gender={userData.user.trainerGender}
                          className="h-7 w-7"
                        />
                      ) : shopCurrencyId ? (
                        <CurrencySprite
                          currencyId={shopCurrencyId}
                          width={28}
                          height={28}
                          className="h-7 w-7 object-contain pixelated"
                        />
                      ) : (
                        <TaskIconDisplay
                          icon={getActionIcon(groupedItem)}
                          normalizeVisibleBounds
                          className="h-7 w-7"
                        />
                      )}
                    </span>
                  )}
                </Button>
              )
            })}
          </div>
        )}
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
