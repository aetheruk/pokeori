import { ArtisanPanel } from '@/components/game/artisan/artisan-panel'
import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'

export default function ArtisanPage() {
  return (
    <GameRouteDataBoundary scope="artisan">
      <div className="game-paper-first game-paper-background flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
        <ArtisanPanel />
      </div>
    </GameRouteDataBoundary>
  )
}
