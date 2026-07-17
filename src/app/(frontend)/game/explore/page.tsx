'use client'

import { Suspense, lazy } from 'react'
import { GameLoadingState } from '@/components/game/shared/GameLoadingState'
const ExploreList = lazy(() =>
  import('@/components/game/features/explore').then((module) => ({ default: module.ExploreList }))
)

export default function ExplorePage() {
  return (
    <div className="h-full flex flex-col overflow-hidden bg-game-canvas text-game-ink">
      <div className="flex-1 min-h-0 overflow-y-auto scrollbar-thin scrollbar-thumb-game-border scrollbar-track-transparent">
        <Suspense fallback={<GameLoadingState label="Loading field activities" />}>
          <ExploreList />
        </Suspense>
      </div>
    </div>
  )
}
