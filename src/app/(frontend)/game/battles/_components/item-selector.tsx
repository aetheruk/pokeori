'use client'

import { Loader2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import { cn } from '@/lib/utils'
import { getBattleItemUseLimit } from '@/utilities/battle/item-use-limits'
import type { BattleInventoryItem } from '@/utilities/battle/types'
import { getBattleInventory } from '../actions'

import { useBattleContext } from './battle-context'

export function ItemSelector() {
  const {
    battleState,
    activePlayerMon,
    isAnimating,
    isWaitingForServer,
    handleUseItem: onUseItem,
  } = useBattleContext()
  const itemDrawerContentId = `battle-item-drawer-${battleState.battleId}`

  const itemsUsedThisBattle = battleState.itemsUsedThisBattle?.length || 0
  const maxItemsPerBattle = getBattleItemUseLimit(battleState, 'player')
  const disabled =
    isAnimating ||
    isWaitingForServer ||
    !!battleState.isPvp ||
    battleState.status !== 'ongoing' ||
    itemsUsedThisBattle >= maxItemsPerBattle
  const [open, setOpen] = useState(false)
  const [items, setItems] = useState<BattleInventoryItem[]>([])
  const [loading, setLoading] = useState(false)
  const [using, setUsing] = useState<string | null>(null)

  const remainingUses = maxItemsPerBattle - itemsUsedThisBattle
  const canUseItems = remainingUses > 0

  useEffect(() => {
    if (open) {
      setLoading(true)
      getBattleInventory()
        .then((result) => {
          if (result.success) {
            setItems(result.items)
          }
        })
        .finally(() => setLoading(false))
    }
  }, [open])

  const handleUseItem = async (itemId: string) => {
    if (using) return
    setUsing(itemId)
    try {
      await onUseItem(itemId)
      setOpen(false)
    } finally {
      setUsing(null)
    }
  }

  const getStatusLabel = (status: string) =>
    status
      .split('-')
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join(' ')

  const getClearStatusDescription = (
    clearStatus: BattleInventoryItem['battleEffect']['clearStatus'],
  ) => {
    if (!clearStatus) return null
    if (clearStatus === 'all') return 'Cure any status'
    if (Array.isArray(clearStatus))
      return `Cure ${clearStatus.map(getStatusLabel).join(' / ')}`
    return `Cure ${getStatusLabel(clearStatus)}`
  }

  const getEffectDescription = (item: BattleInventoryItem) => {
    const effect = item.battleEffect
    switch (effect.type) {
      case 'heal':
        if (effect.clearStatus && !effect.healAmount && !effect.healFull) {
          return getClearStatusDescription(effect.clearStatus) || 'Cure status'
        }
        if (effect.clearStatus) {
          return `${effect.healFull ? 'Fully restore HP' : `Heal ${effect.healAmount} HP`} + ${
            getClearStatusDescription(effect.clearStatus) || 'cure status'
          }`
        }
        if (effect.healFull) return 'Fully restore HP'
        if (effect.healAmount) return `Heal ${effect.healAmount} HP`
        return 'Heals HP'
      case 'buff':
        return `+${effect.buffStages || 1} ${effect.buffStat?.replace(/([A-Z])/g, ' $1').toLowerCase() || 'stat'}`
      case 'tera':
        return `Change type to ${effect.teraType}`
      case 'reveal-stance':
        return "Reveal enemy's next stance"
      default:
        return ''
    }
  }

  const canItemApply = (item: BattleInventoryItem) => {
    if (!activePlayerMon) return false
    if (activePlayerMon.status?.id === 'vanished') return true

    const effect = item.battleEffect
    if (effect.type === 'heal') {
      const missingHp = Math.max(
        0,
        activePlayerMon.maxHp - activePlayerMon.currentHp,
      )
      if ((effect.healFull || effect.healAmount) && missingHp > 0) return true
      if (!effect.clearStatus) return false

      if (!activePlayerMon.status) return false
      if (effect.clearStatus === 'all') return true
      if (Array.isArray(effect.clearStatus)) {
        return effect.clearStatus.includes(activePlayerMon.status.id)
      }
      return effect.clearStatus === activePlayerMon.status.id
    }

    if (effect.type === 'buff' && effect.buffStat) {
      const currentStage = activePlayerMon.statStages?.[effect.buffStat] || 0
      const maxStage = effect.buffStat === 'crit' ? 3 : 6
      return currentStage < maxStage
    }

    return effect.type === 'reveal-stance'
  }

  // Group items by effect type
  const groupedItems = items.reduce(
    (acc, item) => {
      const type = item.battleEffect.type
      if (!acc[type]) acc[type] = []
      acc[type].push(item)
      return acc
    },
    {} as Record<string, BattleInventoryItem[]>,
  )

  const effectOrder = ['heal', 'buff', 'reveal-stance']
  const effectLabels: Record<string, string> = {
    heal: 'Healing',
    buff: 'Stat Boosts',
    'reveal-stance': 'Intel',
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          disabled={disabled || !canUseItems}
          aria-label={`Items, ${Math.max(0, remainingUses)} of ${maxItemsPerBattle} uses remaining`}
          title="Open battle items"
          className={cn(
            'flex-1 h-12 gap-2 rounded-xl border border-game-border bg-game-surface-raised text-game-ink shadow-sm transition-colors',
            'hover:border-game-ochre/60 hover:bg-game-surface-raised hover:text-game-ink',
            !canUseItems && 'opacity-50',
          )}
        >
          <ItemSprite
            itemId="battle-potion"
            alt="Items"
            width={22}
            height={22}
            className="h-5 w-5 object-contain"
          />
          <span className="rounded-full border border-game-border bg-game-canvas/60 px-1.5 py-0.5 text-[10px] font-black text-game-ink">
            {Math.max(0, remainingUses)}/{maxItemsPerBattle}
          </span>
        </Button>
      </DrawerTrigger>
      <DrawerContent
        id={itemDrawerContentId}
        className="game-paper-modal game-paper-background max-h-[70dvh] border-game-border bg-game-surface-raised"
      >
        <div className="px-4 pt-4 pb-6">
          <SectionDivider className="mb-4">
            <span className="flex items-center gap-2 px-3">
              <ItemSprite
                itemId="battle-potion"
                alt="Items"
                width={20}
                height={20}
                className="h-5 w-5 object-contain"
              />
              Battle Items
              <span className="text-game-muted ml-1">
                ({remainingUses} left)
              </span>
            </span>
          </SectionDivider>
          {loading ? (
            <div className="flex items-center justify-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-game-muted" />
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-40 text-game-muted">
              <ItemSprite
                itemId="battle-potion"
                alt="Items"
                width={48}
                height={48}
                className="mb-2 h-12 w-12 object-contain opacity-50"
              />
              <p>No battle items in your inventory</p>
              <p className="text-sm">Get items from rewards or the shop!</p>
            </div>
          ) : (
            <div className="overflow-y-auto max-h-[calc(70dvh-150px)] space-y-4">
              {effectOrder.map((effectType) => {
                const typeItems = groupedItems[effectType]
                if (!typeItems || typeItems.length === 0) return null

                return (
                  <div key={effectType}>
                    <SectionDivider className="mb-3">
                      {effectLabels[effectType]}
                    </SectionDivider>
                    <Carousel opts={{ align: 'start' }} className="w-full">
                      <CarouselContent className="-ml-2">
                        {typeItems.map((item) => {
                          const itemApplies = canItemApply(item)

                          return (
                            <CarouselItem
                              key={item.itemId}
                              className="pl-2 basis-full"
                            >
                              <Button
                                variant="outline"
                                className={cn(
                                  'game-focus-ring relative w-full h-auto rounded-xl border border-game-border bg-game-surface-raised py-3 px-4 flex items-center gap-3',
                                  'shadow-sm transition-colors hover:border-game-moss/60 hover:bg-game-moss/10',
                                  !itemApplies &&
                                    'opacity-50 hover:border-game-border',
                                  using === item.itemId &&
                                    'opacity-50 pointer-events-none',
                                )}
                                onClick={() => handleUseItem(item.itemId)}
                                disabled={using !== null || !itemApplies}
                              >
                                <ItemSprite
                                  itemId={item.itemId}
                                  alt={item.name}
                                  width={32}
                                  height={32}
                                  className="h-8 w-8 flex-shrink-0 object-contain"
                                />
                                <div className="flex-1 text-left min-w-0">
                                  <div className="flex items-center justify-between gap-2">
                                    <span className="font-medium text-sm truncate">
                                      {item.name}
                                    </span>
                                    <span className="text-xs text-game-muted flex-shrink-0">
                                      ×{item.quantity}
                                    </span>
                                  </div>
                                  <div className="text-xs text-game-muted truncate">
                                    {itemApplies
                                      ? getEffectDescription(item)
                                      : 'No effect right now'}
                                  </div>
                                </div>
                                {using === item.itemId && (
                                  <Loader2 className="w-4 h-4 animate-spin absolute right-2 top-1/2 -translate-y-1/2" />
                                )}
                              </Button>
                            </CarouselItem>
                          )
                        })}
                      </CarouselContent>
                    </Carousel>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
