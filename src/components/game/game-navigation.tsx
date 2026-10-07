'use client'

import { BookOpen, Compass, Hammer, PackageOpen, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { TbPokeball } from 'react-icons/tb'
import { BrandLockup } from '@/components/game/shared/BrandLockup'
import { NavigationPending } from '@/components/game/navigation-pending'
import { GridPlayerSprite } from '@/components/game/shared/grid-player-sprite'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import { getCurrency } from '@/data/currencies'
import { getIcon } from '@/data/user'
import { cn } from '@/lib/utils'
import { scheduleBodyPointerEventsRestore } from '@/utilities/ui/pointer-events'

interface NavItem {
  name: string
  href: string
  icon: any
  mobileSkillIcon?: string
}

const navItems: NavItem[] = [
  { name: 'Trainer', href: '/game', icon: User },
  {
    name: 'Inventory',
    href: '/game/inventory',
    icon: PackageOpen,
    mobileSkillIcon: 'inventory-v2.png',
  },
  {
    name: 'Explore',
    href: '/game/explore',
    icon: Compass,
    mobileSkillIcon: 'explorer-v2.png',
  },
  {
    name: 'Pokemon',
    href: '/game/pokemon',
    icon: TbPokeball,
    mobileSkillIcon: 'trainer-v2.png',
  },
  {
    name: 'Artisan',
    href: '/game/artisan',
    icon: Hammer,
    mobileSkillIcon: 'artisan-v2.png',
  },
  {
    name: 'Dex',
    href: '/game/dex',
    icon: BookOpen,
    mobileSkillIcon: 'researcher-v2.png',
  },
]

export function GameNavigation() {
  const pathname = usePathname()
  const { playSfx } = useAudio()
  const { user } = useUser()
  const [tapPulse, setTapPulse] = useState<{
    href: string
    id: number
  } | null>(null)
  const tapPulseId = useRef(0)
  const tapPulseTimeout = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return scheduleBodyPointerEventsRestore()
  }, [pathname])

  useEffect(() => {
    return () => {
      if (tapPulseTimeout.current) clearTimeout(tapPulseTimeout.current)
    }
  }, [])

  const isItemActive = (item: NavItem) => {
    return (
      pathname === item.href ||
      (item.href !== '/game' && pathname.startsWith(item.href))
    )
  }

  const playSelectSfx = () => playSfx('select')
  const handleMobileNavClick = (href: string) => {
    playSelectSfx()
    tapPulseId.current += 1
    setTapPulse({ href, id: tapPulseId.current })
    if (tapPulseTimeout.current) clearTimeout(tapPulseTimeout.current)
    tapPulseTimeout.current = setTimeout(() => setTapPulse(null), 300)
  }
  const pokedollars = getCurrency('pokedollars')
  const crystals = getCurrency('crystals')

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="game-paper-background fixed left-0 top-0 z-40 hidden h-dvh w-56 flex-col border-r border-game-border bg-sidebar text-game-ink lg:flex lg:w-56">
        <div className="flex h-[4.5rem] items-center border-b border-game-border px-4 lg:px-5">
          <BrandLockup compact className="lg:hidden" />
          <BrandLockup className="ml-1 hidden w-full max-w-[168px] lg:block" />
        </div>
        <nav
          aria-label="Game sections"
          className="flex-1 space-y-1 overflow-y-auto px-3 py-4 lg:px-4"
        >
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/game' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={true}
                onClick={playSelectSfx}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'game-focus-ring relative flex h-11 items-center justify-center gap-3 overflow-hidden rounded-md border px-3 text-sm font-medium transition-colors lg:justify-start',
                  isActive
                    ? 'border-game-charcoal/35 bg-game-surface-raised text-game-charcoal-strong shadow-[0_4px_12px_rgb(75_62_39_/_0.08)] before:absolute before:bottom-2 before:left-0 before:top-2 before:w-1 before:rounded-r-sm before:bg-game-charcoal'
                    : 'border-transparent text-game-muted hover:bg-game-surface hover:text-game-ink',
                )}
                title={item.name}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="hidden lg:block">{item.name}</span>
                <NavigationPending />
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto border-t border-game-border p-3 lg:p-4">
          <div className="mb-2 hidden grid-cols-2 gap-2 lg:grid">
            <ResourceValue
              iconId={pokedollars?.iconId}
              value={user?.currency?.pokedollars || 0}
              label={pokedollars?.name || 'PokeDollars'}
            />
            <ResourceValue
              iconId={crystals?.iconId}
              value={user?.currency?.crystals || 0}
              label={crystals?.name || 'Crystals'}
            />
          </div>
          <Link
            href="/game"
            prefetch={true}
            className="game-focus-ring relative flex items-center justify-center gap-3 overflow-hidden rounded-md px-2 py-2 transition-colors hover:bg-game-surface lg:justify-start"
          >
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
              {user ? (
                <TaskIconDisplay
                  icon={
                    getIcon(user.icon || 'ditto')?.icon ||
                    ({ type: 'pokemon', id: '132' } as any)
                  }
                  className="h-full w-full"
                  normalizeVisibleBounds
                  outlineVisiblePixels
                />
              ) : (
                <span className="text-xs font-bold">TR</span>
              )}
            </div>
            <div className="hidden min-w-0 text-sm lg:block">
              <p className="truncate font-medium text-game-ink">
                {user?.trainerName || 'Trainer'}
              </p>
              <p className="text-[11px] text-game-muted">Trainer profile</p>
            </div>
            <NavigationPending />
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav
        aria-label="Game sections"
        className="fixed inset-x-0 bottom-0 z-50 flex h-[4.5rem] items-center justify-around border-t border-game-cream/15 bg-game-charcoal-strong/95 px-2 pb-[env(safe-area-inset-bottom)] text-game-cream shadow-[0_-8px_24px_rgb(29_37_34_/_0.18)] backdrop-blur-xl lg:hidden"
      >
        {navItems.map((item) => {
          const isActive = isItemActive(item)
          const mobileLabel =
            item.name === 'Trainer'
              ? `${user?.trainerName || 'Trainer'} profile`
              : item.name

          return (
            <Link
              key={item.href}
              href={item.href}
              prefetch={true}
              onClick={() => handleMobileNavClick(item.href)}
              onPointerDownCapture={(event) => {
                event.currentTarget.setAttribute('data-pointer-focus', 'true')
              }}
              onBlur={(event) => {
                event.currentTarget.removeAttribute('data-pointer-focus')
              }}
              aria-current={isActive ? 'page' : undefined}
              aria-label={mobileLabel}
              title={mobileLabel}
              className={cn(
                'game-focus-ring game-mobile-nav-link relative flex h-full min-w-0 flex-1 items-center justify-center border border-transparent px-0 text-game-cream/75 transition-colors hover:text-game-cream',
                isActive
                  ? 'text-game-cream'
                  : '',
              )}
            >
              <span
                className={cn(
                  'flex h-11 w-11 items-center justify-center rounded-full border transition-colors',
                  isActive
                    ? 'border-game-cream/45 bg-game-cream/10 shadow-[0_0_12px_rgb(247_236_214_/_0.12)]'
                    : 'border-game-cream/20 bg-game-cream/[0.035]',
                )}
              >
                <span
                  key={tapPulse?.href === item.href ? tapPulse.id : 'idle'}
                  className={cn(
                    'flex h-8 w-8 items-center justify-center',
                    tapPulse?.href === item.href && 'mobile-nav-tap-pulse',
                  )}
                >
                  {item.name === 'Trainer' ? (
                    <GridPlayerSprite
                      gender={user?.trainerGender}
                      className={cn(
                        'h-8 w-8',
                        user?.trainerGender === 'male' ||
                          user?.trainerGender === 'female'
                          ? '-translate-y-[3px]'
                          : '-translate-y-2.5',
                      )}
                    />
                  ) : item.mobileSkillIcon ? (
                    <TaskIconDisplay
                      icon={{
                        type: 'local',
                        id: `/fallback/skills/${item.mobileSkillIcon}`,
                      }}
                      className="h-8 w-8"
                    />
                  ) : (
                    <item.icon className="h-8 w-8" />
                  )}
                </span>
              </span>
              <NavigationPending />
            </Link>
          )
        })}
      </nav>
    </>
  )
}

function ResourceValue({
  iconId,
  value,
  label,
}: {
  iconId?: string
  value: number
  label: string
}) {
  return (
    <div
      className="rounded-md border border-game-border bg-game-surface/70 px-2 py-1.5"
      title={label}
    >
      <div className="flex items-center gap-1.5 text-xs font-semibold text-game-ink">
        {iconId ? (
          <TaskIconDisplay
            icon={{ type: 'item', id: iconId }}
            className="h-3.5 w-3.5"
          />
        ) : null}
        <span className="truncate">{value.toLocaleString()}</span>
      </div>
    </div>
  )
}
