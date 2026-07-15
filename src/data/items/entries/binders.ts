import { Item } from '../types'
import { tcgSetSummaries } from '@/data/tcg/summaries'

export const binderItems: Item[] = []

tcgSetSummaries.forEach((set) => {
  binderItems.push({
    id: `binder-${set.id}`,
    name: `TCG Binder (${set.name})`,
    description: `A binder for collecting cards from the ${set.name} set.`,
    category: 'Binder',
    spriteId: `binder-${set.id}`,
    unique: true,
  })
})
