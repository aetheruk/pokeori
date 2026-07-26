import { tcgSetSummaries } from '@/data/tcg/summaries'
import { catalogResponse, parseCatalogPage } from '@/utilities/catalog-response'
import { getTcgCatalogPage } from '@/utilities/tcg/catalog'

export const dynamic = 'force-dynamic'

const validSetIds = new Set(tcgSetSummaries.map((set) => set.id))

export async function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const setIds = Array.from(
    new Set(
      (searchParams.get('setIds') || '')
        .split(',')
        .map((setId) => setId.trim())
        .filter((setId) => validSetIds.has(setId)),
    ),
  )
  const cardIds = Array.from(
    new Set(
      (searchParams.get('cardIds') || '')
        .split(',')
        .map((cardId) => cardId.trim())
        .filter(Boolean),
    ),
  ).slice(0, 80)
  const query = (searchParams.get('q') || '').trim().toLowerCase().slice(0, 80)
  const sampleSeed = (searchParams.get('sampleSeed') || '').slice(0, 80)
  const rarities = new Set(
    (searchParams.get('rarities') || '')
      .split(',')
      .map((rarity) => rarity.trim())
      .filter(Boolean),
  )
  const pokemonId = Number(searchParams.get('pokemonId'))
  const hasPokemonId = Number.isInteger(pokemonId) && pokemonId > 0
  const { limit, offset } = parseCatalogPage(searchParams)

  const page = await getTcgCatalogPage({
    setIds,
    cardIds,
    query,
    sampleSeed,
    rarities: Array.from(rarities),
    pokemonId: hasPokemonId ? pokemonId : undefined,
    offset,
    limit,
  })
  return catalogResponse(page.items, page.total, offset, limit)
}
