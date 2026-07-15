export interface TcgCardImages {
  small: string
  large: string
}

export interface TcgCard {
  id: string
  name: string
  number: string
  artist: string | null
  rarity: string | null
  supertype: string
  subtypes: string[]
  hp?: string | null
  types?: string[]
  evolvesFrom?: string | null
  evolvesTo?: string[]
  convertedRetreatCost?: number | null
  nationalPokedexNumbers: number[]
  images: TcgCardImages
  isNew?: boolean
}

export interface TcgCardAttack {
  name: string
  cost: string[]
  convertedEnergyCost: number | null
  damage: string
  text: string
}

export interface TcgCardAbility {
  name: string
  text: string
  type: string
}

export interface TcgCardWeaknessResistance {
  type: string
  value: string
}

export interface TcgCardDetail extends TcgCard {
  rules: string[]
  abilities: TcgCardAbility[]
  attacks: TcgCardAttack[]
  weaknesses: TcgCardWeaknessResistance[]
  resistances: TcgCardWeaknessResistance[]
  retreatCost: string[]
  flavorText: string | null
  legalities: Record<string, string>
  regulationMark: string | null
}

export interface TcgSetImages {
  symbol: string
  logo: string
}

export interface TcgSet {
  id: string
  name: string
  series: string
  total: number
  printedTotal: number | null
  releaseDate: string | null
  images: TcgSetImages
  cards: TcgCard[]
}

export type TcgSetData = TcgSet[]
