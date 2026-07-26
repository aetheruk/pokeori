import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'
import AbilityDexClient from './abilitydex-client'

export default function AbilityDexPage() {
  return (
    <GameRouteDataBoundary scope="abilitydex">
      <AbilityDexClient />
    </GameRouteDataBoundary>
  )
}
