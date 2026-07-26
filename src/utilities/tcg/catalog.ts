import { getTcgSetByIdLazy } from '@/data/tcg/set-loader'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import type { TcgCard, TcgSet } from '@/data/tcg/types'

const validSetIds = new Set(tcgSetSummaries.map((set) => set.id))

export type TcgCatalogItem = {
  card: TcgCard
  set: Omit<TcgSet, 'cards'> & { cards: [] }
}

export type TcgCatalogPage = {
  items: TcgCatalogItem[]
  total: number
  nextCursor: string | null
}

export type TcgCatalogQuery = {
  setIds: string[]
  cardIds?: string[]
  query?: string
  sampleSeed?: string
  rarities?: string[]
  pokemonId?: number
  offset?: number
  limit?: number
}

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

export async function getTcgCatalogPage({
  setIds,
  cardIds = [],
  query = '',
  sampleSeed = '',
  rarities = [],
  pokemonId,
  offset = 0,
  limit = 40,
}: TcgCatalogQuery): Promise<TcgCatalogPage> {
  const requestedCardIds = new Set(cardIds)
  const requestedSetIds =
    requestedCardIds.size > 0
      ? Array.from(
          new Set(
            cardIds
              .map((cardId) => cardId.split('-')[0])
              .filter((setId) => validSetIds.has(setId)),
          ),
        )
      : Array.from(new Set(setIds.filter((setId) => validSetIds.has(setId))))

  if (requestedSetIds.length === 0) {
    return { items: [], total: 0, nextCursor: null }
  }

  const sets = (
    await Promise.all(requestedSetIds.map((setId) => getTcgSetByIdLazy(setId)))
  ).filter((set): set is TcgSet => Boolean(set))
  const normalizedQuery = query.trim().toLowerCase().slice(0, 80)
  const raritySet = new Set(rarities)
  const hasPokemonId = Number.isInteger(pokemonId) && (pokemonId || 0) > 0
  const matches: TcgCatalogItem[] = []

  for (const set of sets) {
    const setSummary = compactSet(set)
    for (const card of set.cards) {
      if (requestedCardIds.size > 0 && !requestedCardIds.has(card.id)) continue
      if (raritySet.size > 0 && (!card.rarity || !raritySet.has(card.rarity))) continue
      if (hasPokemonId && !card.nationalPokedexNumbers.includes(pokemonId as number)) continue
      if (
        !hasPokemonId &&
        normalizedQuery &&
        ![card.name, card.id, card.number].some((value) =>
          value?.toLowerCase().includes(normalizedQuery),
        )
      ) continue
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

  const items = matches.slice(offset, offset + limit)
  const nextOffset = offset + items.length
  return {
    items,
    total: matches.length,
    nextCursor: nextOffset < matches.length ? String(nextOffset) : null,
  }
}
