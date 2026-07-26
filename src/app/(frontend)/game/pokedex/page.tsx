import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'
import PokedexClient from './pokedex-client'

export default function PokedexPage() {
  return (
    <GameRouteDataBoundary scope="pokedex">
      <PokedexClient />
    </GameRouteDataBoundary>
  )
}
