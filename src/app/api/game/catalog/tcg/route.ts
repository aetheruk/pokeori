import { getTcgSetByIdLazy } from '@/data/tcg/set-loader'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import type { TcgCard, TcgSet } from '@/data/tcg/types'
import { catalogResponse, parseCatalogPage } from '@/utilities/catalog-response'

export const dynamic = 'force-dynamic'

const validSetIds = new Set(tcgSetSummaries.map((set) => set.id))

function stableHash(value: string) {
  let hash = 2166136261
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function compactSet(set: TcgSet): Omit<TcgSet, 'cards'> & { cards: [] } {
  return {
    id: set.id,
    name: set.name,
    series: set.series,
    total: set.total,
    printedTotal: set.printedTotal,
    releaseDate: set.releaseDate,
    images: set.images,
    cards: [],
  }
}

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

  const requestedSetIds =
    cardIds.length > 0
      ? Array.from(
          new Set(
            cardIds
              .map((cardId) => cardId.split('-')[0])
              .filter((setId) => validSetIds.has(setId)),
          ),
        )
      : setIds
  const requestedCardIds = new Set(cardIds)

  if (requestedSetIds.length === 0) return catalogResponse([], 0, offset, limit)

  const sets = (
    await Promise.all(requestedSetIds.map((setId) => getTcgSetByIdLazy(setId)))
  ).filter((set): set is TcgSet => Boolean(set))
  const matches: Array<{
    card: TcgCard
    set: Omit<TcgSet, 'cards'> & { cards: [] }
  }> = []

  for (const set of sets) {
    const setSummary = compactSet(set)
    for (const card of set.cards) {
      if (requestedCardIds.size > 0 && !requestedCardIds.has(card.id)) continue
      if (rarities.size > 0 && (!card.rarity || !rarities.has(card.rarity)))
        continue
      if (hasPokemonId && !card.nationalPokedexNumbers.includes(pokemonId)) {
        continue
      }
      if (
        !hasPokemonId &&
        query &&
        ![card.name, card.id, card.number].some((value) =>
          value?.toLowerCase().includes(query),
        )
      ) {
        continue
      }
      matches.push({ card, set: setSummary })
    }
  }

  if (sampleSeed) {
    matches.sort(
      (left, right) =>
        stableHash(`${sampleSeed}:${left.card.id}`) -
        stableHash(`${sampleSeed}:${right.card.id}`),
    )
  }

  return catalogResponse(
    matches.slice(offset, offset + limit),
    matches.length,
    offset,
    limit,
  )
}
