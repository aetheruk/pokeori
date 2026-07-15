import type { Pokemon } from '@/payload-types'
import type { BattleConfig, LocationReward } from '@/data/types'
import { trainerPokeDollarReward } from '@/data/battles/trainer-payouts'

export const RIVAL_MAX_POKEMON = 3

export function isRivalBattleConfig(
  battleConfig: BattleConfig,
): battleConfig is BattleConfig & { dynamicOpponent: 'rival' } {
  return battleConfig.dynamicOpponent === 'rival'
}

export function getRivalTrainerId(user: { rivalTrainerId?: unknown } | null | undefined) {
  return typeof user?.rivalTrainerId === 'string' && user.rivalTrainerId
    ? user.rivalTrainerId
    : null
}

export function getFirstRivalBattleTeam(
  pokemon: Pokemon[],
  maxPokemon = RIVAL_MAX_POKEMON,
): Pokemon[] {
  return pokemon
    .filter((entry) => entry.onBattleTeam)
    .sort((a, b) => {
      const aPosition =
        typeof a.battleTeamPosition === 'number'
          ? a.battleTeamPosition
          : Number.MAX_SAFE_INTEGER
      const bPosition =
        typeof b.battleTeamPosition === 'number'
          ? b.battleTeamPosition
          : Number.MAX_SAFE_INTEGER
      return aPosition - bPosition
    })
    .slice(0, maxPokemon)
}

export function scaleRivalPokemonForBattle(
  pokemon: Pokemon,
  level: number,
): Pokemon {
  return {
    ...pokemon,
    level,
  }
}

export function buildRivalBattleRewards(
  battleConfig: BattleConfig,
): LocationReward[] {
  const level = battleConfig.rivalLevel
  if (!level) return [...(battleConfig.rewards || [])]

  return [
    ...(battleConfig.rewards || []),
    trainerPokeDollarReward('rival-late', level),
  ]
}
