import { redirect } from 'next/navigation'
import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'
import type { PlayerEventsSnapshot } from '@/components/game/events/player-events'
import { ExploreList } from '@/components/game/features/explore'
import { getPlayerEvents } from '@/utilities/events/actions'
import { getGameRouteData } from '@/utilities/game-route-data'

export default async function ExplorePage() {
  const [gameDataResult, playerEventsResult] = await Promise.allSettled([
    getGameRouteData('explore'),
    getPlayerEvents(),
  ])

  if (gameDataResult.status === 'rejected') throw gameDataResult.reason
  if (!gameDataResult.value) redirect('/auth')

  const initialPlayerEvents: PlayerEventsSnapshot | null =
    playerEventsResult.status === 'fulfilled'
      ? playerEventsResult.value
      : null

  return (
    <GameRouteDataBoundary
      scope="explore"
      initialGameData={gameDataResult.value}
    >
      <div className="h-full flex flex-col overflow-hidden bg-game-canvas text-game-ink">
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-game-border scrollbar-track-transparent">
          <ExploreList initialPlayerEvents={initialPlayerEvents} />
        </div>
      </div>
    </GameRouteDataBoundary>
  )
}
