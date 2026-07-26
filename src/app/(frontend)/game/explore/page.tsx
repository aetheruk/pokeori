import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'
import { ExploreList } from '@/components/game/features/explore'

export default function ExplorePage() {
  return (
    <GameRouteDataBoundary scope="explore">
      <div className="h-full flex flex-col overflow-hidden bg-game-canvas text-game-ink">
        <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-game-border scrollbar-track-transparent">
          <ExploreList />
        </div>
      </div>
    </GameRouteDataBoundary>
  )
}
