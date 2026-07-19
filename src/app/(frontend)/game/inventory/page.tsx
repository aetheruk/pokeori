import { InventoryList } from './_components/inventory-list'

export default function InventoryPage() {
  return (
    <div className="game-paper-first game-paper-background flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
      <InventoryList />
    </div>
  )
}
