'use client'

import { usePathname } from 'next/navigation'
import { GameErrorBoundary } from '@/components/game/GameErrorBoundary'
import { GameNavigation } from '@/components/game/game-navigation'
import { AudioProvider } from '@/context/AudioContext'
import { UserProvider } from '@/context/UserContext'
import { cn } from '@/lib/utils'
import type { User } from '@/payload-types'

export function GameShell({
  children,
  user,
}: {
  children: React.ReactNode
  user?: User | null
}) {
  const pathname = usePathname()
  const isEncounter = pathname.startsWith('/game/locations/encounter')
  const isResearch = pathname.startsWith('/game/research/encounter')
  const isBattle = pathname.startsWith('/game/battles/encounter')
  const isFullscreen = isEncounter || isBattle || isResearch

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

  return (
    <UserProvider initialUser={user || null}>
      <AudioProvider>
        <GameErrorBoundary>
          <div className="game-paper-background fixed inset-0 flex flex-col bg-game-canvas text-game-ink">
            <a href="#game-content" className="game-skip-link">
              Skip to game content
            </a>
            <div
              className="game-field-stamps absolute inset-0 opacity-[0.035]"
              aria-hidden="true"
            />
            {!isFullscreen && <GameNavigation />}
            <main
              id="game-content"
              tabIndex={-1}
              className={cn(
                'relative flex-1 min-h-0 overflow-hidden bg-game-canvas outline-none',
                !isFullscreen ? 'pb-[4.5rem] md:pb-0 md:pl-20 xl:pl-56' : '',
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
