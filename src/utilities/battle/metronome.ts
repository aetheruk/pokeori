import { getAllMoves } from '@/data/moves'
import type { MoveConfig } from '@/data/moves'

function canBeCalledByMetronome(move: MoveConfig): boolean {
  if (move.id === 'metronome') return false

  // The active battle state only stores one move lock id, so do not call moves
  // that need follow-up turns through Metronome.
  if (move.charged || move.recharge || move.continuous) return false

  return true
}

export function getMetronomeCallableMoves(): MoveConfig[] {
  return getAllMoves().filter(canBeCalledByMetronome)
}

export function resolveMetronomeMove(random: () => number = Math.random): MoveConfig {
  const moves = getMetronomeCallableMoves()
  if (!moves.length) {
    throw new Error('Metronome has no callable moves')
  }

  return moves[Math.floor(random() * moves.length)]
}
