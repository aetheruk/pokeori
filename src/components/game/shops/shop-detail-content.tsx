'use client'

import { useState, useRef } from 'react'
import { ShopConfig } from '@/data/shops/types'
import { useUser } from '@/context/UserContext'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
import { toast } from 'sonner'
import { purchaseShopItem, PurchaseItemResult } from '@/utilities/shops/actions'
import { RewardResultOverlay } from '@/components/game/shared/RewardResultOverlay'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { CurrencySprite } from '@/components/ui/currency-sprite'
import { cn } from '@/lib/utils'
import { useGameUserData } from '@/hooks/useGameUserData'
import { getCurrency } from '@/data/currencies'
import {
  isOutOfStock,
  shouldDisplayShopItem,
  type ShopPurchaseData,
} from '@/utilities/shops/stock'
import { shouldShowShopPurchaseOverlay } from '@/utilities/shops/purchase-presentation'
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
  const [purchaseOverrides, setPurchaseOverrides] = useState<
    Record<string, ShopPurchaseData>
  >({})

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
      const result = await purchaseShopItem(
        shop.id,
        itemId,
        crypto.randomUUID(),
        shop.items.find(item => item.id === itemId)?.cost,
      )
      if (result.success) {
        const purchaseData = result.purchaseData
        if (purchaseData) {
          setPurchaseOverrides((current) => ({
            ...current,
            [itemId]: purchaseData,
          }))
        }
        setLastPurchasedItemName(itemName)
        refreshUser()

        if (shouldShowShopPurchaseOverlay(result)) {
          setPurchaseResult(result)
        } else {
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

  const shopPurchases = {
    ...((userData.shopPurchases || {}) as Record<string, ShopPurchaseData>),
    ...purchaseOverrides,
  }
  const visibleItems = shop.items.filter((item) => {
    return (
      checkShopItemRequirements(userData, shop, item) &&
      shouldDisplayShopItem(item, shopPurchases[item.id])
    )
  })
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
  const shopCurrencyId = shopCurrencyBalances[0]?.id

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
        <SectionDivider className="mb-6" variant="chip">
          Available Items
        </SectionDivider>

        {shopCurrencyBalances.length > 0 && (
          <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 py-1 text-center">
            {shopCurrencyBalances.map(({ currency, id, amount }) => (
              <div
                key={id}
                className="flex items-center gap-1.5 text-xs font-black uppercase tracking-[0.08em] text-game-muted"
              >
                <CurrencySprite currencyId={currency!.id} width={16} height={16} />
                <span className="text-game-ink">{amount.toLocaleString()}</span>
              </div>
            ))}
          </div>
        )}

        <div className="grid grid-cols-1 gap-4">
          {visibleItems.map((item) => {
            const purchaseData = shopPurchases[item.id]
            const outOfStock = isOutOfStock(item, purchaseData)

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
              <Card
                key={item.id}
                className={cn(
                  'relative flex min-h-32 flex-row items-center gap-3 overflow-hidden rounded-md rounded-tr-none border p-3',
                  outOfStock
                    ? 'border-game-danger/40 bg-game-surface'
                    : 'border-game-card-border bg-game-surface',
                )}
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-70"
                  style={{
                    backgroundImage: `url(${shop.background || '/backgrounds/shop.avif'})`,
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-game-surface-raised/76 via-game-surface/56 to-game-surface/10"
                />

                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center">
                  {item.icon ? (
                    <TaskIconDisplay
                      icon={item.icon}
                      normalizeVisibleBounds
                      outlineVisiblePixels
                      className="h-9 w-9"
                    />
                  ) : (
                    <ShoppingBag
                      className="h-7 w-7 text-game-charcoal"
                      aria-hidden="true"
                    />
                  )}
                </div>

                <div className="relative z-10 flex min-w-0 flex-1 flex-col items-end self-stretch text-right">
                  <div className="-mr-3 -mt-3 flex w-fit max-w-full items-center justify-end rounded-md rounded-tl-none rounded-tr-none rounded-br-none bg-game-charcoal px-2 py-1 text-white">
                    <h3
                      className="flex max-w-full items-center justify-end gap-1 whitespace-nowrap text-right text-xs font-bold leading-tight tracking-[0.12em]"
                      title={item.name}
                    >
                      <span className="min-w-0 truncate">{item.name}</span>
                      {outOfStock ? (
                        <span className="shrink-0 text-white/80">· OOS</span>
                      ) : item.cost.map((cost, idx) => (
                        <span
                          key={`${cost.type}-${cost.id}-${idx}`}
                          className="inline-flex shrink-0 items-center gap-1 text-[10px] font-black uppercase tracking-[0.06em] text-white/90"
                          title={
                            cost.type === 'currency'
                              ? getCurrency(cost.id)?.name || cost.id
                              : cost.id
                          }
                        >
                          <span aria-hidden="true">·</span>
                          {cost.type === 'item' && (
                            <TaskIconDisplay
                              icon={{ type: 'item', id: cost.id }}
                              normalizeVisibleBounds
                              className="size-3.5"
                            />
                          )}
                          <span className="font-mono">
                            {cost.amount.toLocaleString()}
                          </span>
                        </span>
                      ))}
                    </h3>
                  </div>

                  <div className="relative z-20 mt-auto flex max-w-full justify-end pt-3">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      disabled={outOfStock || !canAfford || purchasingItem === item.id}
                      onClick={() => requestBuy(item)}
                      aria-label={`Buy ${item.name}`}
                      title={`Buy ${item.name}`}
                      className="size-11 rounded-md border border-game-charcoal/15 bg-game-surface-raised/65 p-0 text-game-charcoal shadow-none backdrop-blur-[2px] hover:border-game-charcoal/30 hover:bg-game-surface-raised/90 active:bg-game-surface-raised disabled:opacity-40"
                    >
                      {purchasingItem === item.id ? (
                        <Loader2 className="size-5 animate-spin" aria-hidden="true" />
                      ) : shopCurrencyId ? (
                        <CurrencySprite
                          currencyId={shopCurrencyId}
                          width={24}
                          height={24}
                          alt=""
                        />
                      ) : (
                        <TaskIconDisplay
                          icon={shop.icon}
                          normalizeVisibleBounds
                          className="size-7"
                        />
                      )}
                    </Button>
                  </div>
                </div>
              </Card>
            )
          })}

          {visibleItems.length === 0 && (
            <Card className="rounded-md border-game-border bg-game-surface p-6 text-center text-game-muted">
              No items are currently available for your requirements.
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
