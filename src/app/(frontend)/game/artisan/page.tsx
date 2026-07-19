import { ArtisanPanel } from '@/components/game/artisan/artisan-panel'

export default function ArtisanPage() {
  return (
    <div className="game-paper-first game-paper-background flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
      <ArtisanPanel />
    </div>
  )
}
