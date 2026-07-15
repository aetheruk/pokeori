import type { MoveConfig } from '@/data/moves'
import type { BattleStance } from '@/utilities/battle/types'

const BASIC_ATTACK_MOVE_ID_PREFIX = '__basic-attack:'

export type BattleActionKind = 'basic-attack' | 'assigned-move'

export interface NormalizedBattleAction {
  kind: BattleActionKind
  move: MoveConfig
  isBasicAttack: boolean
  consumesMoveUse: boolean
  specialMoveId?: string
}

export interface BattleMoveChoiceLike {
  move: MoveConfig
  stance: BattleStance
  attackType?: string
  basePower?: number
  hitCount?: number
  fixedDamage?: number
  typeEffectivenessOverride?: number
  critChance?: number
  ignoreDefenderStatStages?: boolean
  damageStatSource?: MoveConfig['damageStatSource']
  effectOnly?: boolean
  calledByMetronome?: boolean
}

export interface NormalizedResolvedBattleAction extends NormalizedBattleAction {
  stance: BattleStance
  attackType?: string
  basePower?: number
  hitCount?: number
  fixedDamage?: number
  typeEffectivenessOverride?: number
  critChance?: number
  ignoreDefenderStatStages?: boolean
  damageStatSource?: MoveConfig['damageStatSource']
  effectOnly: boolean
  calledByMetronome: boolean
}

export function getBasicAttackMoveId(stance: BattleStance): string {
  return `${BASIC_ATTACK_MOVE_ID_PREFIX}${stance}`
}

export function parseBasicAttackMoveId(moveId: string): BattleStance | undefined {
  const stance = moveId.startsWith(BASIC_ATTACK_MOVE_ID_PREFIX)
    ? moveId.slice(BASIC_ATTACK_MOVE_ID_PREFIX.length)
    : undefined

  return stance === 'power' || stance === 'speed' || stance === 'tech'
    ? stance
    : undefined
}

export function createBasicAttackMove(stance: BattleStance): MoveConfig {
  return {
    id: getBasicAttackMoveId(stance),
    name: 'Attack',
    description: 'A basic no-cost battle attack.',
    aiOnly: true,
    manualOnly: true,
    stance,
    damage: 1,
    target: 'enemy',
    accuracy: 100,
  }
}

export function normalizeBattleAction(params: {
  move: MoveConfig
  isBasicAttack: boolean
  isLockedMoveAction: boolean
}): NormalizedBattleAction {
  const { move, isBasicAttack, isLockedMoveAction } = params

  return {
    kind: isBasicAttack ? 'basic-attack' : 'assigned-move',
    move,
    isBasicAttack,
    consumesMoveUse: !isBasicAttack && !isLockedMoveAction,
    specialMoveId: isBasicAttack ? undefined : move.id,
  }
}

export function normalizeResolvedBattleAction(params: {
  stance: BattleStance
  moveChoice?: BattleMoveChoiceLike
  isLockedMoveAction?: boolean
}): NormalizedResolvedBattleAction {
  const { stance, moveChoice, isLockedMoveAction = false } = params
  if (!moveChoice) {
    const move = createBasicAttackMove(stance)
    return {
      ...normalizeBattleAction({
        move,
        isBasicAttack: true,
        isLockedMoveAction,
      }),
      stance,
      effectOnly: false,
      calledByMetronome: false,
    }
  }

  return {
    ...normalizeBattleAction({
      move: moveChoice.move,
      isBasicAttack: false,
      isLockedMoveAction,
    }),
    stance: moveChoice.stance,
    attackType: moveChoice.attackType,
    basePower: moveChoice.basePower,
    hitCount: moveChoice.hitCount,
    fixedDamage: moveChoice.fixedDamage,
    typeEffectivenessOverride: moveChoice.typeEffectivenessOverride,
    critChance: moveChoice.critChance,
    ignoreDefenderStatStages: moveChoice.ignoreDefenderStatStages,
    damageStatSource: moveChoice.damageStatSource,
    effectOnly: Boolean(moveChoice.effectOnly),
    calledByMetronome: Boolean(moveChoice.calledByMetronome),
  }
}
