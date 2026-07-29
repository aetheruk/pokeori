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

const FIELD_HM_NUMBERS: Record<string, string> = {
  cut: 'HM01',
  fly: 'HM02',
  surf: 'HM03',
  strength: 'HM04',
  flash: 'HM05',
}

export const tmItems: Item[] = ALL_TM_MOVES.filter(
  (move) => !move.aiOnly && !move.manualOnly,
).map((move) => {
  const hmNumber = FIELD_HM_NUMBERS[move.id]

  return {
    id: `tm-${getMoveSlug(move.name)}`,
    name: hmNumber ? `${hmNumber}: ${move.name}` : `TM: ${move.name}`,
    description: hmNumber
      ? `${hmNumber} teaches ${move.name}.`
      : `A TM that teaches ${move.name}.`,
    category: 'tm',
    spriteId: getTmSpriteId(move),
    moveId: move.id,
    unique: true,
  }
})
