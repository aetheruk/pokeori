import { TrainerCollection } from '@/components/game/trainer/trainer-collection'
import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'

export default function DexPage() {
  return (
    <GameRouteDataBoundary scope="trainer-collection">
      <div className="game-paper-first game-paper-background h-full overflow-hidden bg-game-canvas text-game-ink">
        <TrainerCollection />
      </div>
    </GameRouteDataBoundary>
  )
}
