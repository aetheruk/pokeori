import { GameLoadingState } from '@/components/game/shared/GameLoadingState'

// Keep the shared game shell interactive while fresh player data streams in.
// This also bounds automatic Link prefetching before the dynamic page data.
export default function GameLoading() {
  return <GameLoadingState label="Opening journal" className="min-h-48" />
}
