'use client'

import { ShopDetailContent } from '@/components/game/shops/shop-detail-content'
import { ShopConfig } from '@/data/shops/types'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { GameInfoModal } from '@/components/game/shared/GameInfoModal'
import { GuildProgressContent } from '@/components/game/guilds/guild-progress'
import { useUser } from '@/context/UserContext'
import type { GuildsData } from '@/types/user-data'

interface ShopModalProps {
  shop: ShopConfig | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ShopModal({ shop, open, onOpenChange }: ShopModalProps) {
  const { user } = useUser()
  if (!shop) return null

  return (
    <GameInfoModal
      open={open}
      onOpenChange={onOpenChange}
      title={shop.name}
      category={shop.guildId ? 'Guild charter' : shop.subCategory || 'SHOP'}
      background={shop.background}
      icon={<TaskIconDisplay icon={shop.icon} className="w-10 h-10" />}
      presentation="drawer"
    >
      {shop.guildId ? (
        <GuildProgressContent
          guildId={shop.guildId}
          guilds={((user as any)?.guilds || {}) as GuildsData}
        />
      ) : (
        <ShopDetailContent shop={shop} />
      )}
    </GameInfoModal>
  )
}
