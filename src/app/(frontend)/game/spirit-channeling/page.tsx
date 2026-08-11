import { Suspense } from 'react'
import { Loader2 } from 'lucide-react'
import { SpiritChannelingPanel } from '@/components/game/spirit-channeling/spirit-channeling-panel'

export default function SpiritChannelingPage() {
  return (
    <div className="game-paper-first game-paper-background flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
      <Suspense
        fallback={
          <div className="flex h-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-game-moss" />
          </div>
        }
      >
        <SpiritChannelingPanel />
      </Suspense>
    </div>
  )
}
