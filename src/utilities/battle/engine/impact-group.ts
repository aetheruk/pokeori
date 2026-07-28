import type {
  BattlePresentationEvent,
  BattlePresentationSide,
} from '../types'

type ImpactEvent =
  | Extract<BattlePresentationEvent, { type: 'attack' }>
  | Extract<BattlePresentationEvent, { type: 'hp-change' }>

export function getCombinedImpactDamage(
  events: ImpactEvent[],
): Record<BattlePresentationSide, number> {
  const totals: Record<BattlePresentationSide, number> = {
    player: 0,
    enemy: 0,
  }

  for (const event of events) {
    if (event.type === 'attack') {
      totals[event.targetSide] += Math.max(0, event.damage)
    } else if (event.kind === 'damage') {
      totals[event.side] += Math.max(0, event.amount)
    }
  }

  return totals
}
