'use client'

import { Award } from 'lucide-react'
import { useMemo } from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '@/components/ui/carousel'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import { items } from '@/data/items'
import { cn } from '@/lib/utils'

interface BadgeGroup {
  region: string
  badges: typeof items
}

const REGION_ORDER = [
  'kanto',
  'johto',
  'hoenn',
  'sinnoh',
  'unova',
  'kalos',
  'galar',
  'sv',
  'orange',
]

const REGION_NAMES: Record<string, string> = {
  kanto: 'Kanto',
  johto: 'Johto',
  hoenn: 'Hoenn',
  sinnoh: 'Sinnoh',
  unova: 'Unova',
  kalos: 'Kalos',
  galar: 'Galar',
  sv: 'Paldea',
  orange: 'Orange Islands',
}

export function BadgeShowcase() {
  const { gameData } = useUser()
  const inventory = useMemo(
    () =>
      Object.fromEntries(
        (gameData?.inventory || []).map((item) => [item.itemId, item.quantity]),
      ),
    [gameData?.inventory],
  )

  const badgeGroups = useMemo(() => {
    // Get ALL badges from items
    const allBadges = items.filter((item) => item.category === 'badge')

    // Group by region
    const groups: Record<string, typeof items> = {}

    allBadges.forEach((badge) => {
      const parts = badge.id.split('-')
      if (parts.length >= 2) {
        const region = parts[1]
        if (!groups[region]) groups[region] = []
        groups[region].push(badge)
      }
    })

    return Object.entries(groups)
      .map(([region, badges]) => ({
        region,
        badges: badges.sort((a, b) => {
          return (
            items.findIndex((i) => i.id === a.id) -
            items.findIndex((i) => i.id === b.id)
          )
        }),
      }))
      .filter((group) => (inventory[`${group.region}-badge-case`] || 0) > 0)
      .sort((a, b) => {
        const idxA = REGION_ORDER.indexOf(a.region)
        const idxB = REGION_ORDER.indexOf(b.region)
        if (idxA !== -1 && idxB !== -1) return idxA - idxB
        if (idxA !== -1) return -1
        if (idxB !== -1) return 1
        return a.region.localeCompare(b.region)
      })
  }, [inventory])

  if (badgeGroups.length === 0) return null

  // Function to check ownership
  const hasBadge = (badgeId: string) => {
    return (inventory[badgeId] || 0) > 0
  }

  return (
    <div className="space-y-6">
      <Carousel
        opts={{
          align: 'center',
          loop: false,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-4">
          {badgeGroups.map((group) => {
            const ownedCount = group.badges.filter((b) => hasBadge(b.id)).length
            const isComplete = ownedCount === group.badges.length

            return (
              <CarouselItem key={group.region} className="basis-full pl-4">
                <div className="relative overflow-hidden rounded-lg border border-game-border bg-game-surface p-5 md:p-6">
                  {/* Card Header */}
                  <div className="relative z-10 mb-8 flex items-end justify-between border-b border-game-border pb-4">
                    <div className="flex flex-col">
                      <span className="mb-1 text-[11px] font-medium uppercase tracking-[0.14em] text-game-moss-strong">
                        Region Collection
                      </span>
                      <h3 className="font-display text-2xl font-bold text-game-ink">
                        {REGION_NAMES[group.region] || group.region}
                      </h3>
                    </div>

                    <div className="flex flex-col items-end">
                      <div
                        className={cn(
                          'flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-black tracking-widest',
                          isComplete
                            ? 'border-game-moss/45 bg-game-moss/10 text-game-moss-strong'
                            : 'border-game-border bg-game-surface-raised text-game-muted',
                        )}
                      >
                        <Award className="h-3 w-3" />
                        {ownedCount} / {group.badges.length}
                      </div>
                    </div>
                  </div>

                  {/* Badge Grid */}
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-6 relative z-10">
                    {group.badges.map((badge) => {
                      const owned = hasBadge(badge.id)
                      return (
                        <div
                          key={badge.id}
                          className="group/badge relative flex flex-col items-center"
                        >
                          <div
                            className={cn(
                              'relative flex h-14 w-14 items-center justify-center rounded-lg border transition-colors md:h-16 md:w-16',
                              owned
                                ? 'border-game-moss/35 bg-game-surface-raised group-hover/badge:border-game-moss'
                                : 'border-game-border bg-game-canvas group-hover/badge:border-game-border-strong',
                            )}
                          >
                            <ItemSprite
                              itemId={badge.id}
                              alt={badge.name}
                              width={48}
                              height={48}
                              className={cn(
                                'relative z-10 h-10 w-10 object-contain transition-opacity md:h-12 md:w-12',
                                owned
                                  ? 'drop-shadow-sm'
                                  : 'grayscale brightness-0 invert opacity-20',
                              )}
                            />
                          </div>

                          {/* Subtle name on hover */}
                          <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover/badge:opacity-100 transition-opacity whitespace-nowrap z-20">
                            <span className="rounded border border-game-moss/30 bg-game-surface-raised px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-game-moss-strong">
                              {badge.name}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </CarouselItem>
            )
          })}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
