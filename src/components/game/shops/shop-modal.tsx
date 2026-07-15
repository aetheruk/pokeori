'use client'

import { ShopDetailContent } from '@/components/game/shops/shop-detail-content'
import { ShopConfig } from '@/data/shops/types'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { GameInfoModal } from '@/components/game/shared/GameInfoModal'

interface ShopModalProps {
  shop: ShopConfig | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShopModal({ shop, open, onOpenChange }: ShopModalProps) {
  if (!shop) return null

  return (
    <GameInfoModal
      open={open}
      onOpenChange={onOpenChange}
      title={shop.name}
      category={shop.subCategory || 'SHOP'}
      background={shop.background}
      icon={<TaskIconDisplay icon={shop.icon} className="w-10 h-10" />}
      presentation="drawer"
    >
      <ShopDetailContent shop={shop} />
    </GameInfoModal>
  )
}
