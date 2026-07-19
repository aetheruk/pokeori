'use client'

import { Backpack, Compass, Hammer, User } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { TbPokeball } from 'react-icons/tb'
import { BrandLockup } from '@/components/game/shared/BrandLockup'
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
  mobileName?: string
}

const navItems: NavItem[] = [
  { name: 'Trainer', href: '/game', icon: User },
  { name: 'Bag', href: '/game/inventory', icon: Backpack },
  { name: 'Explore', href: '/game/explore', icon: Compass },
  { name: 'Pokemon', href: '/game/pokemon', icon: TbPokeball },
  { name: 'Artisan', href: '/game/artisan', icon: Hammer, mobileName: 'Craft' },
]

export function GameNavigation() {
  const pathname = usePathname()
  const { playSfx } = useAudio()
  const { user } = useUser()

  useEffect(() => {
    return scheduleBodyPointerEventsRestore()
  }, [pathname])

  const isItemActive = (item: NavItem) => {
    return (
      pathname === item.href ||
      (item.href !== '/game' && pathname.startsWith(item.href))
    )
  }

  const playSelectSfx = () => playSfx('select')
  const pokedollars = getCurrency('pokedollars')
  const crystals = getCurrency('crystals')

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="game-paper-background fixed left-0 top-0 z-40 hidden h-dvh w-20 flex-col border-r border-game-border bg-sidebar text-game-ink md:flex xl:w-56">
        <div className="flex h-[4.5rem] items-center border-b border-game-border px-4 xl:px-5">
          <BrandLockup compact className="xl:hidden" />
          <BrandLockup className="ml-1 hidden w-full max-w-[168px] xl:block" />
        </div>
        <nav
          aria-label="Game sections"
          className="flex-1 space-y-1 overflow-y-auto px-3 py-4 xl:px-4"
        >
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/game' && pathname.startsWith(item.href))
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={playSelectSfx}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'game-focus-ring relative flex h-11 items-center justify-center gap-3 overflow-hidden rounded-lg border px-3 text-sm font-medium transition-colors xl:justify-start',
                  isActive
                    ? 'border-game-moss/35 bg-game-surface-raised text-game-moss-strong shadow-[0_4px_12px_rgb(75_62_39_/_0.08)] before:absolute before:bottom-2 before:left-0 before:top-2 before:w-1 before:rounded-r-sm before:bg-game-moss'
                    : 'border-transparent text-game-muted hover:bg-game-surface hover:text-game-ink',
                )}
                title={item.name}
              >
                <item.icon className="h-5 w-5 shrink-0" />
                <span className="hidden xl:block">{item.name}</span>
              </Link>
            )
          })}
        </nav>
        <div className="mt-auto border-t border-game-border p-3 xl:p-4">
          <div className="mb-2 hidden grid-cols-2 gap-2 xl:grid">
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
            className="game-focus-ring flex items-center justify-center gap-3 overflow-hidden rounded-lg px-2 py-2 transition-colors hover:bg-game-surface xl:justify-start"
          >
            <div className="relative flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full border border-game-moss/30 bg-game-moss/10">
              {user ? (
                <TaskIconDisplay
                  icon={
                    getIcon(user.icon || 'ditto')?.icon ||
                    ({ type: 'pokemon', id: '132' } as any)
                  }
                  className="w-full h-full object-cover scale-110"
                />
              ) : (
                <span className="text-xs font-bold">TR</span>
              )}
            </div>
            <div className="hidden min-w-0 text-sm xl:block">
              <p className="truncate font-medium text-game-ink">
                {user?.trainerName || 'Trainer'}
              </p>
              <p className="text-[11px] text-game-muted">Trainer profile</p>
            </div>
          </Link>
        </div>
      </aside>

      {/* Mobile Bottom Nav */}
      <nav
        aria-label="Game sections"
        className="fixed inset-x-0 bottom-0 z-50 flex h-[4.5rem] items-end justify-around border-t border-game-border bg-game-surface/95 px-2 pb-[env(safe-area-inset-bottom)] backdrop-blur-xl md:hidden"
      >
        {navItems.map((item) => {
          const isActive = isItemActive(item)

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={playSelectSfx}
              aria-current={isActive ? 'page' : undefined}
              className={cn(
                'game-focus-ring relative flex h-[3.75rem] min-w-[60px] flex-1 flex-col items-center justify-end gap-1 rounded-t-lg border border-transparent px-1 pb-1.5 transition-colors',
                isActive
                  ? 'border-game-border border-b-transparent bg-game-surface-raised text-game-moss-strong shadow-[0_-5px_12px_rgb(75_62_39_/_0.08)]'
                  : 'text-game-muted hover:text-game-ink',
              )}
            >
              {item.name === 'Trainer' && user ? (
                <div className="flex h-6 w-6 items-center justify-center overflow-hidden rounded-full border border-game-moss/20 bg-game-moss/10">
                  <TaskIconDisplay
                    icon={
                      getIcon(user.icon || 'ditto')?.icon ||
                      ({ type: 'pokemon', id: '132' } as any)
                    }
                    className="w-full h-full object-cover scale-110"
                  />
                </div>
              ) : (
                <item.icon className="h-5 w-5" />
              )}
              {isActive && (
                <span className="absolute top-0 h-0.5 w-7 rounded-b-full bg-game-moss" />
              )}
              <span className="max-w-[58px] truncate text-center text-[11px] font-medium leading-none">
                {item.name === 'Trainer'
                  ? user?.trainerName || 'Trainer'
                  : item.mobileName || item.name}
              </span>
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
