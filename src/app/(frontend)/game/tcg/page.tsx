import { redirect } from 'next/navigation'
import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import { getGameRouteData } from '@/utilities/game-route-data'
import {
  getCarddexScopedSets,
  normalizeCarddexFilters,
  resolveCarddexScope,
} from '@/utilities/tcg/carddex-view'
import { getTcgCatalogPage } from '@/utilities/tcg/catalog'
import { sortTcgSetsByReleaseDate } from '@/utilities/tcg/set-order'
import TcgExplorerClient from './tcg-client'

export default async function TcgExplorerPage({
  searchParams,
}: {
  searchParams: Promise<{
    series?: string | string[]
    set?: string | string[]
    q?: string | string[]
    ownership?: string | string[]
    supertype?: string | string[]
    type?: string | string[]
    rarity?: string | string[]
    sort?: string | string[]
  }>
}) {
  const initialGameData = await getGameRouteData('tcg')
  if (!initialGameData) redirect('/auth')
  const requestedView = await searchParams
  const inventory = Object.fromEntries(
    (initialGameData.inventory || []).map((item) => [
      item.itemId,
      item.quantity,
    ]),
  )
  const unlockedSets = sortTcgSetsByReleaseDate(
    tcgSetSummaries.filter((set) => (inventory[`binder-${set.id}`] || 0) > 0),
  )
  const initialScope = resolveCarddexScope({
    sets: unlockedSets,
    requestedSeries: requestedView.series,
    requestedSetId: requestedView.set,
  })
  const initialFilters = normalizeCarddexFilters({
    query: requestedView.q,
    ownership: requestedView.ownership,
    supertype: requestedView.supertype,
    type: requestedView.type,
    rarity: requestedView.rarity,
    sort: requestedView.sort,
  })
  const initialSetIds = getCarddexScopedSets(unlockedSets, initialScope).map(
    (set) => set.id,
  )
  const ownedCardQuantities = Object.fromEntries(
    (initialGameData.tcg || []).map((entry) => [entry.cardId, entry.quantity]),
  )
  const initialCatalog = initialSetIds.length
    ? await getTcgCatalogPage({
        setIds: initialSetIds,
        query: initialFilters.query,
        ownership: initialFilters.ownership,
        supertype: initialFilters.supertype,
        type: initialFilters.type,
        rarityBucket: initialFilters.rarity,
        sort: initialFilters.sort,
        limit: 80,
        ownedCardIds: Object.keys(ownedCardQuantities),
        ownedCardQuantities,
      })
    : null

  return (
    <GameRouteDataBoundary scope="tcg" initialGameData={initialGameData}>
      <TcgExplorerClient
        initialScope={initialScope}
        initialFilters={initialFilters}
        initialCatalog={initialCatalog}
      />
    </GameRouteDataBoundary>
  )
}
