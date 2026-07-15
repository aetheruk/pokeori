import tcgSets from '@/data/tcg'
import type { TcgCard, TcgSet } from '@/data/tcg/types'

export type { TcgCard, TcgSet } from '@/data/tcg/types'

const sets = tcgSets as TcgSet[]
const cards: TcgCard[] = []
const cardsById = new Map<string, TcgCard>()
const cardSeriesById = new Map<string, string>()
const pokedexIndex = new Map<number, TcgCard[]>()
const supertypeSet = new Set<string>()
const raritySet = new Set<string>()
const setsById = new Map<string, TcgSet>()

sets.forEach((set) => {
  setsById.set(set.id, set)

  set.cards.forEach((card) => {
    cards.push(card)
    cardsById.set(card.id, card)
    cardSeriesById.set(card.id, set.series)

    card.nationalPokedexNumbers?.forEach((num) => {
      if (!pokedexIndex.has(num)) {
        pokedexIndex.set(num, [])
      }
      pokedexIndex.get(num)!.push(card)
    })

    if (card.supertype) {
      supertypeSet.add(card.supertype)
    }
    if (card.rarity) {
      raritySet.add(card.rarity)
    }
  })
})

const supertypes = Array.from(supertypeSet).sort()
const rarities = Array.from(raritySet).sort()

export function getAllTcgSets(): TcgSet[] {
  return sets
}

export function getTcgSetById(id: string): TcgSet | null {
  return setsById.get(id) ?? null
}

export function getAllTcgCards(): TcgCard[] {
  return cards
}

export function getTcgCardById(id: string): TcgCard | null {
  return cardsById.get(id) ?? null
}

export function getTcgCardSeriesById(id: string): string | null {
  return cardSeriesById.get(id) ?? null
}

export function searchTcgCards(query: string): TcgCard[] {
  if (!query) {
    return cards
  }

  const normalized = query.trim().toLowerCase()
  return cards.filter((card) => {
    const haystacks = [card.name, card.id, card.number]
    return haystacks.some((value) => value?.toLowerCase().includes(normalized))
  })
}

export function getCardsByPokedexNumber(pokedexNumber: number | string): TcgCard[] {
  const num = typeof pokedexNumber === 'string' ? parseInt(pokedexNumber, 10) : pokedexNumber
  if (!Number.isFinite(num)) {
    return []
  }
  return pokedexIndex.get(num) ?? []
}

export function getCardsBySupertype(supertype: string): TcgCard[] {
  if (!supertype) {
    return cards
  }

  return cards.filter((card) => card.supertype === supertype)
}

export function getCardsByRarity(rarity: string): TcgCard[] {
  if (!rarity) {
    return cards
  }

  return cards.filter((card) => card.rarity === rarity)
}

export function getAvailableSupertypes(): string[] {
  return supertypes
}

export function getAvailableRarities(): string[] {
  return rarities
}
