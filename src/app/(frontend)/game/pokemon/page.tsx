import { Suspense } from 'react'
import { PokemonList } from './_components/pokemon-list'
import { Loader2 } from 'lucide-react'

export default function PokemonPage() {
  return (
    <div className="flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-full">
            <Loader2 className="h-8 w-8 animate-spin text-game-moss" />
          </div>
        }
      >
        <PokemonList />
      </Suspense>
    </div>
  )
}
