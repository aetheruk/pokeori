'use client'

import { useState, useRef } from 'react'
import { ShopConfig } from '@/data/shops/types'
import { useUser } from '@/context/UserContext'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { Loader2, ShoppingBag } from 'lucide-react'
import { SectionDivider } from '@/components/ui/section-divider'
import Image from 'next/image'
import { toast } from 'sonner'
import { purchaseShopItem, PurchaseItemResult } from '@/utilities/shops/actions'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { cn } from '@/lib/utils'
import { useGameUserData } from '@/hooks/useGameUserData'
import { getCurrency } from '@/data/currencies'
import { getRemainingStock, isOutOfStock, type ShopPurchaseData } from '@/utilities/shops/stock'
import { checkShopItemRequirements, checkShopRequirements } from '@/utilities/shops/requirements'

interface ShopDetailContentProps {
  shop: ShopConfig
}

export function ShopDetailContent({ shop }: ShopDetailContentProps) {
  const userData = useGameUserData()
  const { refreshUser } = useUser()
  const containerRef = useRef<HTMLDivElement>(null)

  const [purchasingItem, setPurchasingItem] = useState<string | null>(null)
  const [pendingPurchase, setPendingPurchase] = useState<ShopConfig['items'][number] | null>(null)
  const [purchaseResult, setPurchaseResult] = useState<PurchaseItemResult | null>(null)
  const [lastPurchasedItemName, setLastPurchasedItemName] = useState<string | null>(null)

  if (!userData) {
    return (
      <div className="flex justify-center items-center h-48">
            <Loader2 className="h-8 w-8 animate-spin text-game-muted" />
      </div>
    )
  }

  // Double check requirements
  if (!checkShopRequirements(userData, shop)) {
    return (
      <div className="p-8 text-center text-game-danger">You do not have access to this shop yet.</div>
    )
  }

  const executeBuy = async (itemId: string, itemName: string) => {
    if (purchasingItem) return
    setPurchasingItem(itemId)

    try {
      const result = await purchaseShopItem(shop.id, itemId)
      if (result.success) {
        setLastPurchasedItemName(itemName)
        refreshUser()

        // If we got cards, show the overlay (Card Reveal)
        if (result.rewards?.cards && result.rewards.cards.length > 0) {
          setPurchaseResult(result)
        } else {
          // Otherwise just toast
          toast.success(`Purchased ${itemName}!`)
        }
      } else {
        toast.error(result.message || 'Purchase failed')
      }
    } catch (e) {
      toast.error('An error occurred')
    } finally {
      setPurchasingItem(null)
    }
  }

  const requestBuy = (item: ShopConfig['items'][number]) => {
    if (purchasingItem) return
    setPendingPurchase(item)
  }

  const visibleItems = shop.items.filter((item) => {
    return checkShopItemRequirements(userData, shop, item)
  })

  const shopPurchases = (userData.shopPurchases || {}) as Record<string, ShopPurchaseData>
  const userCurrency = (userData.user.currency || {}) as Record<string, number>
  const shopCurrencyBalances = Array.from(
    new Set(
      visibleItems.flatMap((item) =>
        item.cost
          .filter((cost) => cost.type === 'currency')
          .map((cost) => cost.id),
      ),
    ),
  )
    .map((currencyId) => ({
      currency: getCurrency(currencyId),
      id: currencyId,
      amount: userCurrency[currencyId] || 0,
    }))
    .filter(({ currency }) => !!currency)

  return (
    <div ref={containerRef} className="relative z-10">
      <RewardResultOverlay
        result={purchaseResult}
        onClose={() => setPurchaseResult(null)}
        title="PURCHASED"
        message={lastPurchasedItemName}
        icon={shop.icon}
        iconAlt={shop.name}
      />

      <AlertDialog
        open={!!pendingPurchase}
        onOpenChange={(open) => !open && setPendingPurchase(null)}
      >
        <AlertDialogContent className="border-game-border bg-game-surface text-game-ink">
          <AlertDialogHeader>
            <AlertDialogTitle className="font-display text-xl text-game-ink">
              Confirm purchase
            </AlertDialogTitle>
            <AlertDialogDescription className="text-game-muted">
              {pendingPurchase
                ? `Purchase ${pendingPurchase.name} for ${pendingPurchase.cost
                    .map((cost) => `${cost.amount} ${cost.type === 'currency' ? getCurrency(cost.id)?.name || cost.id : 'items'}`)
                    .join(' and ')}?`
                : 'Choose whether to complete this purchase.'}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2 sm:gap-3">
            <AlertDialogCancel className="min-h-11 border-game-border text-game-ink hover:bg-game-surface-raised">
              Keep browsing
            </AlertDialogCancel>
            <AlertDialogAction
              className="min-h-11 bg-game-clay text-game-cream hover:bg-game-clay-strong"
              onClick={() => {
                if (!pendingPurchase) return
                const purchase = pendingPurchase
                setPendingPurchase(null)
                void executeBuy(purchase.id, purchase.name)
              }}
            >
              Confirm purchase
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <div className="space-y-6">
        <SectionDivider>AVAILABLE ITEMS</SectionDivider>

        {shopCurrencyBalances.length > 0 && (
          <div className="game-panel flex flex-wrap items-center gap-2 px-3 py-2">
            <span className="text-[10px] font-black uppercase tracking-widest text-game-muted">
              Owned
            </span>
            {shopCurrencyBalances.map(({ currency, id, amount }) => (
              <div
                key={id}
                className="flex items-center gap-1.5 rounded-full border border-game-border bg-game-surface-raised px-2.5 py-1 text-[10px] font-black uppercase tracking-widest text-game-muted"
              >
                <TaskIconDisplay icon={{ type: 'item', id: currency!.iconId }} className="h-4 w-4" />
                <span className="text-game-ink">{amount.toLocaleString()}</span>
                <span className="text-game-muted">{currency!.name}</span>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {visibleItems.map((item) => {
            const purchaseData = shopPurchases[item.id]
            const outOfStock = isOutOfStock(item, purchaseData)
            const remainingStock = getRemainingStock(item, purchaseData)

            // Check Can Afford
            let canAfford = true
            for (const cost of item.cost) {
              if (cost.type === 'currency') {
                const currency = (userData.user.currency || {}) as Record<string, number>
                const current = currency[cost.id] || 0
                if (current < cost.amount) canAfford = false
              } else if (cost.type === 'item') {
                const userItem = (userData.inventory || []).find((i: any) => i.itemId === cost.id)
                const current = userItem ? (userItem.quantity as number) : 0
                if (current < cost.amount) canAfford = false
              }
            }

            return (
              <div
                key={item.id}
                className={cn(
                  'group relative flex items-center gap-4 overflow-hidden rounded-lg border bg-game-surface p-3 transition-colors',
                  outOfStock
                    ? 'border-game-danger/30 bg-game-canvas grayscale'
                    : 'border-game-border hover:border-game-moss/45 hover:bg-game-surface-raised',
                )}
              >
                <div className="relative shrink-0">
                  <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised transition-colors group-hover:border-game-moss/45">
                    {item.icon ? (
                      <TaskIconDisplay
                        icon={item.icon}
                        className="h-9 w-9"
                      />
                    ) : (
                      <ShoppingBag className="h-5 w-5 text-game-muted" />
                    )}
                  </div>
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="truncate text-sm font-black uppercase tracking-tight text-game-ink">
                      {item.name}
                    </h3>
                    {outOfStock && (
                      <Badge className="border-game-danger/30 bg-game-danger/10 py-0 px-1.5 h-5 text-[10px] font-black uppercase tracking-[0.08em] text-game-danger">
                        OoS
                      </Badge>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-1.5">
                    {item.cost.map((c, idx) => (
                      <div
                        key={idx}
                        className={cn(
                          'flex items-center gap-1 px-2 py-0.5 rounded-full border text-[10px] font-black tracking-[0.08em] uppercase transition-colors',
                          canAfford
                            ? 'border-game-border bg-game-surface-raised text-game-muted group-hover:border-game-moss/30 group-hover:text-game-moss-strong'
                            : 'border-game-danger/20 bg-game-danger/5 text-game-danger',
                        )}
                      >
                        <span className={cn(canAfford ? 'text-game-ink' : 'text-game-danger')}>
                          {c.amount}
                        </span>
                        <span>
                          {c.type === 'currency' ? getCurrency(c.id)?.name || c.id : 'Items'}
                        </span>
                      </div>
                    ))}

                    {remainingStock !== undefined && !outOfStock && (
                      <div className="flex items-center gap-1 rounded-full border border-game-moss/20 bg-game-moss/5 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-game-moss-strong">
                        {remainingStock} <span>In Stock</span>
                      </div>
                    )}

                    {item.stock !== undefined && item.daily && (
                      <div className="flex items-center gap-1 rounded-full border border-game-ochre/20 bg-game-ochre/5 px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-game-ochre">
                        <span>Restocks</span>
                      </div>
                    )}
                  </div>
                </div>

                <Button
                  disabled={outOfStock || !canAfford || purchasingItem === item.id}
                  onClick={() => requestBuy(item)}
                  aria-label={`Buy ${item.name}`}
                  title={`Buy ${item.name}`}
                  className={cn(
                    'relative h-10 shrink-0 overflow-hidden rounded-lg px-4 text-xs font-black uppercase tracking-widest transition-colors',
                    canAfford && !outOfStock
                      ? 'bg-game-clay text-game-cream hover:bg-game-clay/90'
                      : 'border border-game-border bg-game-surface-raised text-game-muted',
                  )}
                >
                  <div className="relative z-10 flex items-center gap-2">
                    {purchasingItem === item.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <ShoppingBag className="w-4 h-4" />
                    )}
                  </div>
                </Button>
              </div>
            )
          })}

          {visibleItems.length === 0 && (
            <Card className="rounded-lg border-game-border bg-game-surface p-6 text-center text-game-muted">
              No items are currently available for your requirements.
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
