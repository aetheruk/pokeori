'use client'

import { useState } from 'react'
import { CarddexBinderShelf } from '@/app/(frontend)/game/tcg/tcg-client'
import { DexPageShell } from '@/components/game/dex'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import type { CarddexScope } from '@/utilities/tcg/carddex-view'
import * as skeletons from '@/components/game/shared/page-skeletons'

const previews = {
  Trainer: skeletons.TrainerSkeleton,
  Explore: skeletons.ExploreSkeleton,
  Pokemon: skeletons.PokemonSkeleton,
  Artisan: skeletons.ArtisanSkeleton,
  Dex: skeletons.DexSkeleton,
  MoveDex: skeletons.MoveDexSkeleton,
  AbilityDex: skeletons.AbilityDexSkeleton,
  Pokedex: skeletons.PokedexSkeleton,
  Carddex: skeletons.CardDexSkeleton,
  Inventory: skeletons.InventorySkeleton,
}
const groups = [...new Set(tcgSetSummaries.map((set) => set.series))].map(
  (series) => ({
    series,
    sets: tcgSetSummaries.filter((set) => set.series === series),
    unique: 0,
    total: tcgSetSummaries
      .filter((set) => set.series === series)
      .reduce((sum, set) => sum + set.total, 0),
  }),
)

export function DexLayoutFixture() {
  const [scope, setScope] = useState<CarddexScope>({
    series: 'Base',
    setId: 'all',
  })
  const [preview, setPreview] = useState('Shelf')
  const Skeleton = previews[preview as keyof typeof previews]
  return (
    <div className="fixed inset-0 z-[80] flex min-w-0 flex-col bg-game-canvas">
      <label className="flex shrink-0 items-center gap-3 p-3">
        Loading preview
        <select
          aria-label="Loading preview"
          value={preview}
          onChange={(event) => setPreview(event.target.value)}
        >
          <option>Shelf</option>
          {Object.keys(previews).map((name) => (
            <option key={name}>{name}</option>
          ))}
        </select>
      </label>
      <div className="min-h-0 min-w-0 flex-1" data-testid="layout-preview">
        {Skeleton ? (
          <Skeleton />
        ) : (
          <DexPageShell title="Carddex" subtitle="Binder archive">
            <CarddexBinderShelf
              seriesGroups={groups}
              progressBySet={new Map()}
              scope={scope}
              onSelectSeries={(series) => setScope({ series, setId: 'all' })}
              onSelectSet={(setId) =>
                setScope((current) => ({ ...current, setId }))
              }
            />
          </DexPageShell>
        )}
      </div>
    </div>
  )
}
