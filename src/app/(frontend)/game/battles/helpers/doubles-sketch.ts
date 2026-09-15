import { getMove } from '@/data/moves'
import type { BattlePokemon, BattleState } from '@/utilities/battle/types'
import { getUserSketchedMoveIds } from '@/utilities/user-state'
import {
  attemptSmeargleSketch,
  getAvailableSketchMoveIds,
  getSketchableOpponentMoveIds,
} from '@/utilities/pokemon/sketch'

export type DoublesSketchAttempt = {
  attacker: BattlePokemon
  opponent?: BattlePokemon
  succeeded: boolean
  userId: string
}

type SketchPayload = Parameters<typeof getUserSketchedMoveIds>[0]

export async function settleDoublesSketchAttempts(
  state: BattleState,
  attempts: DoublesSketchAttempt[],
  payload?: SketchPayload,
  random: () => number = Math.random,
): Promise<string[]> {
  const messages: string[] = []
  const existingByUser = new Map<string, string[]>()

  for (const attempt of attempts) {
    if (!attempt.succeeded || !attempt.opponent) {
      messages.push(`${attempt.attacker.name}'s Sketch failed.`)
      continue
    }

    const existing =
      existingByUser.get(attempt.userId) ??
      (payload
        ? await getUserSketchedMoveIds(payload, attempt.userId)
        : [])
    const pending = (state.pendingSketchedMoves ?? [])
      .filter((entry) => entry.userId === attempt.userId)
      .map((entry) => entry.id)
    const knownMoveIds = new Set([...existing, ...pending])
    existingByUser.set(attempt.userId, [...existing, ...pending])

    const sketchableOpponentMoveIds = getSketchableOpponentMoveIds(
      attempt.opponent,
    )
    if (sketchableOpponentMoveIds.length === 0) {
      messages.push(
        `${attempt.opponent.name} has no move that can be sketched.`,
      )
      continue
    }

    const availableSketchMoveIds = getAvailableSketchMoveIds(
      attempt.opponent,
      [...knownMoveIds],
    )
    if (availableSketchMoveIds.length === 0) {
      messages.push(
        `${attempt.opponent.name} has no new move that can be sketched.`,
      )
      continue
    }

    const sketchedMoveId = attemptSmeargleSketch({
      attacker: attempt.attacker,
      opponent: attempt.opponent,
      alreadySketchedMoveIds: [...knownMoveIds],
      random,
    })

    if (!sketchedMoveId) {
      messages.push(`${attempt.attacker.name}'s Sketch failed to capture a move.`)
      continue
    }

    const sketchedMove = getMove(sketchedMoveId)
    const sketchedMoveName = sketchedMove?.name || sketchedMoveId
    state.pendingSketchedMoves = [
      ...(state.pendingSketchedMoves ?? []),
      {
        id: sketchedMoveId,
        name: sketchedMoveName,
        userId: attempt.userId,
        attackerName: attempt.attacker.name,
      },
    ]
    existingByUser.get(attempt.userId)?.push(sketchedMoveId)
    messages.push(
      `${attempt.attacker.name} sketched ${sketchedMoveName}!`,
    )
  }

  return messages
}
