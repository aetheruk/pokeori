import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'
import MoveDexClient from './movedex-client'

export default function MoveDexPage() {
  return (
    <GameRouteDataBoundary scope="movedex">
      <MoveDexClient />
    </GameRouteDataBoundary>
  )
}
