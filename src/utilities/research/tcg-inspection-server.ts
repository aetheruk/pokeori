import 'server-only'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import type { TcgInspectionGameSettings } from '@/data/games/tcg-inspection/types'
import { getTcgCatalogPage } from '@/utilities/tcg/catalog'
import { createInspectionRound } from './tcg-inspection'

export async function generateInspectionRound(encounterId: string, settings: TcgInspectionGameSettings, now: number) {
  const start = Array.from(encounterId).reduce((sum, letter) => sum + letter.charCodeAt(0), 0)
  const setIds = settings.allowedSetIds?.length ? settings.allowedSetIds : Array.from(
    { length: Math.min(8, tcgSetSummaries.length) }, (_, index) => tcgSetSummaries[(start + index) % tcgSetSummaries.length].id,
  )
  const catalog = await getTcgCatalogPage({ setIds, limit: 80, sampleSeed: encounterId, rarities: settings.allowedRarities })
  return createInspectionRound(settings, catalog.items.map(({ card, set }) => ({ ...card, setId: set.id, setName: set.name })), now)
}
