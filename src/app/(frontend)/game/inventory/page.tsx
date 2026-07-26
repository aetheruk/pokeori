import { InventoryList } from './_components/inventory-list'
import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'

export default function InventoryPage() {
  return (
    <GameRouteDataBoundary scope="inventory">
      <div className="game-paper-first game-paper-background flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
        <InventoryList />
      </div>
    </GameRouteDataBoundary>
  )
}
