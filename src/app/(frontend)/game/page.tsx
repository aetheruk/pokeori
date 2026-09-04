import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'
import { TrainerDashboard } from '@/components/game/trainer/trainer-dashboard'

export default async function GamePage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>
}) {
  const { section } = await searchParams
  return (
    <GameRouteDataBoundary scope="trainer">
      <div className="h-full overflow-hidden">
        <TrainerDashboard initialSection={section} />
      </div>
    </GameRouteDataBoundary>
  )
}
