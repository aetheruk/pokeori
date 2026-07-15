import { ArtisanPanel } from '@/components/game/artisan/artisan-panel'

export default function ArtisanPage() {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
      <ArtisanPanel />
    </div>
  )
}
