import { Item } from '../types'
import { tcgSetSummaries } from '@/data/tcg/summaries'

export const boosterPackItems: Item[] = []

// Map of set IDs to their specific pack sizes
const PACK_SIZE_OVERRIDES: Record<string, number> = {
  "basep": 1,
  "np": 1,
  "dpp": 1,
  "hsp": 1,
  "bwp": 1,
  "xyp": 1,
  "smp": 1,
  "swshp": 1,
  "svp": 1,
  "pop1": 1,
  "pop2": 1,
  "pop3": 1,
  "pop4": 1,
  "pop5": 1,
  "pop6": 1,
  "pop7": 1,
  "pop8": 1,
  "pop9": 1,
  "mcd11": 1,
  "mcd12": 1,
  "mcd14": 1,
  "mcd15": 1,
  "mcd16": 1,
  "mcd17": 1,
  "mcd18": 1,
  "mcd19": 1,
  "mcd21": 1,
  "mcd22": 1,
  "tk1a": 1,
  "tk1b": 1,
  "tk2a": 1,
  "tk2b": 1,
  "det1": 1,
  "dv1": 1
}

tcgSetSummaries.forEach((set) => {
  const cardsPerPack = PACK_SIZE_OVERRIDES[set.id] || 5

  boosterPackItems.push({
    id: `pack-${set.id}`,
    name: `${set.name} Booster Pack`,
    description: `A booster pack from the ${set.name} set. Contains ${cardsPerPack} random cards.`,
    category: 'booster-pack',
    spriteId: `pack-${set.id}`,
    boosterPack: {
      setId: set.id,
      cardsPerPack,
    },
  })
})
