import { InventoryList } from './_components/inventory-list'

export default function InventoryPage() {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
      <InventoryList />
    </div>
  )
}
