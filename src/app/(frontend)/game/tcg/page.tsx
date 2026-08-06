import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'
import { redirect } from 'next/navigation'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import { getGameRouteData } from '@/utilities/game-route-data'
import { getTcgCatalogPage } from '@/utilities/tcg/catalog'
import { sortTcgSetsByReleaseDate } from '@/utilities/tcg/set-order'
import TcgExplorerClient from './tcg-client'

export default async function TcgExplorerPage() {
  const initialGameData = await getGameRouteData('tcg')
  if (!initialGameData) redirect('/auth')
  const inventory = Object.fromEntries(
    (initialGameData.inventory || []).map((item) => [item.itemId, item.quantity]),
  )
  const initialSetId =
    sortTcgSetsByReleaseDate(
      tcgSetSummaries.filter(
        (set) => (inventory[`binder-${set.id}`] || 0) > 0,
      ),
    )[0]?.id || ''
  const initialCatalog = initialSetId
    ? await getTcgCatalogPage({ setIds: [initialSetId], limit: 80 })
    : null

  return (
    <GameRouteDataBoundary scope="tcg" initialGameData={initialGameData}>
      <TcgExplorerClient
        initialSetId={initialSetId}
        initialCatalog={initialCatalog}
      />
    </GameRouteDataBoundary>
  )
}
