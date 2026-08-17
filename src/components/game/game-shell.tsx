'use client'

import { useEffect, useState } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { GameErrorBoundary } from '@/components/game/GameErrorBoundary'
import { GameNavigation } from '@/components/game/game-navigation'
import { AudioProvider } from '@/context/AudioContext'
import { UserProvider, useUser } from '@/context/UserContext'
import { useAuthSessionKeepalive } from '@/hooks/use-auth-session-keepalive'
import { cn } from '@/lib/utils'
import type { User } from '@/payload-types'
import { useStoryStateStore } from '@/app/(frontend)/store/story-state-store'

export function GameShell({
  children,
  user,
  initialTakeover = false,
}: {
  children: React.ReactNode
  user?: User | null
  initialTakeover?: boolean
}) {
  const pathname = usePathname()
  const [takeoverActive, setTakeoverActive] = useState(initialTakeover)
  useAuthSessionKeepalive()

  useEffect(() => {
    if (initialTakeover) {
      document.body.classList.add('pokeori-blackout')
    }
  }, [initialTakeover])

  const isEncounter = pathname.startsWith('/game/locations/encounter')
  const isGameActivity =
    pathname.startsWith('/game/games/') ||
    pathname.startsWith('/game/field-research') ||
    pathname.startsWith('/game/research/encounter')
  const isBattle = pathname.startsWith('/game/battles/encounter')
  const isFullscreen = isEncounter || isBattle || isGameActivity

  // Pages that need full-width content but still show navigation
  const isNoPadding =
    pathname === '/game/explore' ||
    pathname === '/game' ||
    pathname === '/game/inventory' ||
    pathname === '/game/spirit-channeling' ||
    pathname === '/game/pokemon' ||
    pathname === '/game/artisan' ||
    pathname === '/game/dex' ||
    pathname === '/game/tcg' ||
    pathname === '/game/pokedex' ||
    pathname === '/game/movedex' ||
    pathname === '/game/abilitydex'
  // The Trainer journal has its own secondary rail. Keep its canvas anchored
  // directly to the primary navigation instead of centering it like a grid page.
  const isTrainerDashboard = pathname === '/game'
  const isRscManagedRoute = [
    '/game',
    '/game/explore',
    '/game/pokemon',
    '/game/artisan',
    '/game/dex',
    '/game/inventory',
    '/game/pokedex',
    '/game/movedex',
    '/game/abilitydex',
    '/game/tcg',
  ].includes(pathname)

const TAKEOVER_ALLOWED_PREFIXES = [
  '/game/games/',
  '/game/battles/',
  '/game/field-research',
  '/game/research/encounter',
  '/game/locations/encounter',
]

function isTakeoverAllowedPath(pathname: string) {
  return (
    pathname === '/game/explore' ||
    TAKEOVER_ALLOWED_PREFIXES.some((prefix) => pathname.startsWith(prefix))
  )
}

function TakeoverRouteGuard() {
  const pathname = usePathname()
  const router = useRouter()
  const { gameData } = useUser()
  const storeTakeover = useStoryStateStore((state) => state.saffronTakeover)
  const serverTakeover = gameData?.storyState?.saffronTakeover === true
  const takeoverActive =
    storeTakeover !== null ? storeTakeover : serverTakeover

  useEffect(() => {
    if (!takeoverActive) return
    if (isTakeoverAllowedPath(pathname)) return
    router.replace('/game/explore')
  }, [pathname, router, takeoverActive])

  return null
}

function TakeoverActiveProbe({
  onTakeoverChange,
}: {
  onTakeoverChange: (active: boolean) => void
}) {
  const pathname = usePathname()
  const { gameData } = useUser()
  const storeTakeover = useStoryStateStore((state) => state.saffronTakeover)
  const serverTakeover = gameData?.storyState?.saffronTakeover === true
  const takeoverActive =
    storeTakeover !== null ? storeTakeover : serverTakeover

  useEffect(() => {
    const hasLoadedData = gameData !== undefined && gameData !== null
    if (!hasLoadedData && storeTakeover === null) return
    onTakeoverChange(takeoverActive)
  }, [gameData, onTakeoverChange, storeTakeover, takeoverActive])

  // Apply the blackout palette only from confident state. During an initial
  // sync or a dev hot-reload gap `gameData` can be transiently missing; toggling
  // the class off then would flash (and stick to) the light theme until the next
  // fetch, so leave the class untouched while the server data is unavailable.
  useEffect(() => {
    const hasLoadedData = gameData !== undefined && gameData !== null
    if (!hasLoadedData && storeTakeover === null) return
    document.body.classList.toggle('pokeori-blackout', takeoverActive)
  }, [gameData, pathname, storeTakeover, takeoverActive])

  return null
}

  return (
    <UserProvider
      initialUser={user || null}
      scopeOverride={isRscManagedRoute ? 'core' : undefined}
    >
      <TakeoverRouteGuard />
      <TakeoverActiveProbe onTakeoverChange={setTakeoverActive} />
      <AudioProvider>
        <GameErrorBoundary>
          <div className="game-paper-background fixed inset-0 flex flex-col bg-game-canvas text-game-ink">
            <a href="#game-content" className="game-skip-link">
              Skip to game content
            </a>
            <div
              className="game-field-stamps absolute inset-0 hidden opacity-[0.035] xl:block"
              aria-hidden="true"
            />
            {!isFullscreen && !takeoverActive && <GameNavigation />}
            <main
              id="game-content"
              tabIndex={-1}
              className={cn(
                'relative flex-1 min-h-0 overflow-hidden bg-game-canvas outline-none',
                !isFullscreen && !takeoverActive
                  ? 'pb-[4.5rem] md:pb-0 md:pl-20 xl:pl-56'
                  : '',
              )}
            >
              <div
                className={cn(
                  'h-full overflow-hidden w-full relative',
                  // Keep touch layouts focused, then give desktop activities a proper stage.
                  isFullscreen
                    ? 'game-activity-chrome md:mx-auto md:max-w-[480px] md:border-x md:border-game-border md:shadow-[0_12px_32px_rgb(75_62_39_/_0.14)] xl:max-w-[1120px] xl:border-x-0 xl:shadow-none'
                    : '',
                  // For No Padding pages on Desktop, lock it to max-w-5xl so the grids aren't infinitely wide
                  isNoPadding && !isTrainerDashboard
                    ? 'mx-auto w-full max-w-[1440px]'
                    : '',
                  isTrainerDashboard ? 'w-full' : '',
                  // Normal padded pages
                  !isFullscreen && !isNoPadding
                    ? 'mx-auto max-w-7xl p-4 md:p-6'
                    : '',
                )}
              >
                {children}
              </div>
            </main>
          </div>
        </GameErrorBoundary>
      </AudioProvider>
    </UserProvider>
  )
}
