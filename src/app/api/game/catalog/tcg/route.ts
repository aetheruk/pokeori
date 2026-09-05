import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { getPayload } from 'payload'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import { APP_VERSION } from '@/utilities/app-version'
import { parseCatalogPage } from '@/utilities/catalog-response'
import { rateLimit } from '@/utilities/rate-limiter'
import { normalizeCarddexFilters } from '@/utilities/tcg/carddex-view'
import { getTcgCatalogPage } from '@/utilities/tcg/catalog'
import { getUserTcgMap } from '@/utilities/user-state'

export const dynamic = 'force-dynamic'

const validSetIds = new Set(tcgSetSummaries.map((set) => set.id))

export async function GET(request: Request) {
  const requestHeaders = await headers()
  const payload = await getPayload({ config: configPromise })
  const { user } = await payload.auth({ headers: requestHeaders })
  if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 })
  const userLimit = await rateLimit(
    'tcg-catalog-user',
    String(user.id),
    180,
    60,
  )
  if (!userLimit.allowed) {
    return Response.json({ error: 'Rate limit exceeded' }, { status: 429 })
  }

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
  const viewFilters = normalizeCarddexFilters({
    query: searchParams.get('q') || '',
    ownership: searchParams.get('ownership') || undefined,
    supertype: searchParams.get('supertype') || undefined,
    type: searchParams.get('type') || undefined,
    rarity: searchParams.get('rarity') || undefined,
    sort: searchParams.get('sort') || undefined,
  })
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

  const ownedCards = await getUserTcgMap(payload, String(user.id))
  const page = await getTcgCatalogPage({
    setIds,
    cardIds,
    query: viewFilters.query,
    sampleSeed,
    rarities: Array.from(rarities),
    rarityBucket: viewFilters.rarity,
    ownership: viewFilters.ownership,
    supertype: viewFilters.supertype,
    type: viewFilters.type,
    sort: viewFilters.sort,
    pokemonId: hasPokemonId ? pokemonId : undefined,
    ownedCardIds: Object.keys(ownedCards),
    ownedCardQuantities: ownedCards,
    offset,
    limit,
  })
  return Response.json(
    { version: APP_VERSION, ...page },
    { headers: { 'Cache-Control': 'private, no-store' } },
  )
}
