import type { LocationReward } from '../types'
import {
  buildTrainerDisplayName,
  getTrainerClass,
  trainerClasses,
  type TrainerClassId,
} from '../trainers'

// Original Kanto prize money: trainer class base payout * last Pokemon level.
export const KANTO_TRAINER_BASE_PAYOUTS = Object.fromEntries(
  trainerClasses.map((trainerClass) => [trainerClass.id, trainerClass.payoutModifier]),
) as Record<TrainerClassId, number>

export type KantoTrainerPayoutClass = TrainerClassId

export function calculateKantoTrainerPayout(
  trainerClass: KantoTrainerPayoutClass,
  lastPokemonLevel: number,
): number {
  if (!Number.isInteger(lastPokemonLevel) || lastPokemonLevel <= 0) {
    throw new Error(`Trainer payout level must be a positive integer: ${lastPokemonLevel}`)
  }

  return getTrainerClass(trainerClass).payoutModifier * lastPokemonLevel
}

export function trainerPokeDollarReward(
  trainerClass: KantoTrainerPayoutClass,
  lastPokemonLevel: number,
): LocationReward {
  return {
    type: 'currency',
    targetId: 'pokedollars',
    quantity: calculateKantoTrainerPayout(trainerClass, lastPokemonLevel),
    dropChance: 100,
  }
}

export function trainerBattleIdentity(params: {
  trainerClass: KantoTrainerPayoutClass
  trainerName?: string
}) {
  const trainerClass = getTrainerClass(params.trainerClass)

  return {
    trainerClassId: params.trainerClass,
    trainerName: trainerClass.special ? undefined : params.trainerName,
    name: buildTrainerDisplayName({
      trainerClassId: params.trainerClass,
      trainerName: params.trainerName,
    }),
    icon: {
      type: 'trainer' as const,
      id: params.trainerClass,
    },
  }
}
