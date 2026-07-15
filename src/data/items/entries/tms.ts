import { ALL_TM_MOVES } from '@/data/moves/tms'
import type { Item } from '../types'

function getMoveSlug(name: string): string {
  return name.toLowerCase().trim().replace(/\s+/g, '-')
}

function getTmSpriteId(move: (typeof ALL_TM_MOVES)[number]): string {
  return move.forcedType && move.forcedType !== 'random'
    ? `tm-${move.forcedType}`
    : 'tm-normal'
}

export const tmItems: Item[] = ALL_TM_MOVES.filter(
  (move) => !move.aiOnly && !move.manualOnly,
).map((move) => ({
  id: `tm-${getMoveSlug(move.name)}`,
  name: `TM: ${move.name}`,
  description: `A TM that Teaches ${move.name}.`,
  category: 'tm',
  spriteId: getTmSpriteId(move),
  moveId: move.id,
  unique: true,
}))
