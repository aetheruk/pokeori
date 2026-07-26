import { TrainerDashboard } from '@/components/game/trainer/trainer-dashboard'
import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'

export default function GamePage() {
  return (
    <GameRouteDataBoundary scope="trainer">
      <div className="h-full overflow-hidden">
        <TrainerDashboard />
      </div>
    </GameRouteDataBoundary>
  )
}
