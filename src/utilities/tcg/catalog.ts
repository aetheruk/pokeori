import { getTcgSetByIdLazy } from '@/data/tcg/set-loader'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import type { TcgCard, TcgSet } from '@/data/tcg/types'
import type {
  CarddexOwnershipFilter,
  CarddexRarityFilter,
  CarddexSort,
  CarddexSupertypeFilter,
} from '@/utilities/tcg/carddex-view'
import { normalizeTcgPackRarity } from '@/utilities/tcg/tcg-card-draw'

const validSetIds = new Set(tcgSetSummaries.map((set) => set.id))

export type TcgCatalogItem = {
  card: TcgCard
  set: Omit<TcgSet, 'cards'> & { cards: [] }
}

export type TcgCatalogPage = {
  items: TcgCatalogItem[]
  total: number
  /** Number of matching cards present in the current trainer's collection. */
  ownedTotal: number
  nextCursor: string | null
}

export type TcgCatalogQuery = {
  setIds: string[]
  cardIds?: string[]
  query?: string
  sampleSeed?: string
  rarities?: string[]
  rarityBucket?: CarddexRarityFilter
  ownership?: CarddexOwnershipFilter
  supertype?: CarddexSupertypeFilter
  type?: string
  sort?: CarddexSort
  pokemonId?: number
  ownedCardIds?: string[]
  ownedCardQuantities?: Record<string, number>
  offset?: number
  limit?: number
}

const collectorNumberCollator = new Intl.Collator('en', {
  numeric: true,
  sensitivity: 'base',
})

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
  rarityBucket = 'all',
  ownership = 'all',
  supertype = 'all',
  type = 'all',
  sort = 'set-number',
  pokemonId,
  ownedCardIds = [],
  ownedCardQuantities = {},
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
    return { items: [], total: 0, ownedTotal: 0, nextCursor: null }
  }

  const sets = (
    await Promise.all(requestedSetIds.map((setId) => getTcgSetByIdLazy(setId)))
  ).filter((set): set is TcgSet => Boolean(set))
  const normalizedQuery = query.trim().toLowerCase().slice(0, 80)
  const raritySet = new Set(rarities)
  const hasPokemonId = Number.isInteger(pokemonId) && (pokemonId || 0) > 0
  const matches: TcgCatalogItem[] = []
  const ownedIds = new Set(ownedCardIds)
  const getOwnedQuantity = (cardId: string) =>
    ownedCardQuantities[cardId] ?? (ownedIds.has(cardId) ? 1 : 0)
  const normalizedType = type.trim().toLowerCase()

  for (const set of sets) {
    const setSummary = compactSet(set)
    for (const card of set.cards) {
      if (requestedCardIds.size > 0 && !requestedCardIds.has(card.id)) continue
      if (raritySet.size > 0 && (!card.rarity || !raritySet.has(card.rarity)))
        continue
      if (
        rarityBucket !== 'all' &&
        normalizeTcgPackRarity(card.rarity) !== rarityBucket
      )
        continue
      const normalizedSupertype = card.supertype
        .normalize('NFD')
        .replaceAll(/\p{Diacritic}/gu, '')
        .toLowerCase()
      if (supertype !== 'all' && normalizedSupertype !== supertype) continue
      if (
        normalizedType !== 'all' &&
        !(card.types || []).some(
          (cardType) => cardType.toLowerCase() === normalizedType,
        )
      )
        continue
      const ownedQuantity = getOwnedQuantity(card.id)
      if (ownership === 'owned' && ownedQuantity <= 0) continue
      if (ownership === 'missing' && ownedQuantity > 0) continue
      if (ownership === 'duplicates' && ownedQuantity <= 1) continue
      if (
        hasPokemonId &&
        !card.nationalPokedexNumbers.includes(pokemonId as number)
      )
        continue
      if (
        !hasPokemonId &&
        normalizedQuery &&
        ![card.name, card.id, card.number, set.name, set.series].some((value) =>
          value?.toLowerCase().includes(normalizedQuery),
        )
      )
        continue
      matches.push({ card, set: setSummary })
    }
  }

  if (sampleSeed) {
    matches.sort(
      (left, right) =>
        stableHash(`${sampleSeed}:${left.card.id}`) -
        stableHash(`${sampleSeed}:${right.card.id}`),
    )
  } else {
    const setOrder = new Map(sets.map((set, index) => [set.id, index]))
    const compareSetNumber = (left: TcgCatalogItem, right: TcgCatalogItem) => {
      const setDelta =
        (setOrder.get(left.set.id) || 0) - (setOrder.get(right.set.id) || 0)
      if (setDelta !== 0) return setDelta
      return collectorNumberCollator.compare(
        left.card.number,
        right.card.number,
      )
    }
    const rarityRank = { common: 0, uncommon: 1, rare: 2, chase: 3 }
    matches.sort((left, right) => {
      if (sort === 'name') {
        return (
          left.card.name.localeCompare(right.card.name) ||
          compareSetNumber(left, right)
        )
      }
      if (sort === 'rarity') {
        return (
          rarityRank[normalizeTcgPackRarity(right.card.rarity)] -
            rarityRank[normalizeTcgPackRarity(left.card.rarity)] ||
          compareSetNumber(left, right)
        )
      }
      if (sort === 'missing-first') {
        return (
          Number(getOwnedQuantity(left.card.id) > 0) -
            Number(getOwnedQuantity(right.card.id) > 0) ||
          compareSetNumber(left, right)
        )
      }
      if (sort === 'duplicates-first') {
        return (
          getOwnedQuantity(right.card.id) - getOwnedQuantity(left.card.id) ||
          compareSetNumber(left, right)
        )
      }
      return compareSetNumber(left, right)
    })
  }

  const items = matches.slice(offset, offset + limit)
  const nextOffset = offset + items.length
  return {
    items,
    total: matches.length,
    ownedTotal: matches.reduce(
      (count, item) => count + (getOwnedQuantity(item.card.id) > 0 ? 1 : 0),
      0,
    ),
    nextCursor: nextOffset < matches.length ? String(nextOffset) : null,
  }
}
