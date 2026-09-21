import type { User } from '@/payload-types'
import type { BattleState } from '@/utilities/battle/types'
import { getPokemonForm, getPokemonSpecies } from '@/utilities/pokemon/pokedex'
import { calculateCandyRewards } from '@/utilities/rewards/candy-logic'
import {
  buildArtisanMaterialRewards,
  buildBrokenBallRewards,
} from '@/utilities/artisan/material-drops'
import { getInvolvedPlayerPokemon } from '@/utilities/battle/participants'
import {
  calculatePokemonContentSkillXp,
  resolveSkillXpConfig,
} from '@/data/skills/xp'
import { getBattleAbilityWinRewards } from '@/utilities/battle/abilities'
import { getWildBattleCandyMultiplier } from '@/utilities/battle/held-items'
import { getPokemonBattleExperience } from '@/utilities/pokemon/experience'
import { getPersistentPokemonId } from '@/utilities/battle/pokemon-metrics'

export const BATTLE_PARTICIPANT_RESEARCH_XP = 1
export const BATTLE_WILD_TARGET_RESEARCH_XP = 1
const SS_ANNE_EVENING_CRUISE_PAYOUT_MULTIPLIER = 0.2

function scalePokedollarRewardQuantity(
  quantity: unknown,
  multiplier: number,
): unknown {
  if (typeof quantity !== 'number') return quantity
  return Math.max(1, Math.round(quantity * multiplier))
}

function scaleRepeatBattleCashRewards(
  state: BattleState,
  rewards: any[],
): any[] {
  if (state.expeditionContext?.expeditionId !== 'ss-anne-evening-cruise') {
    return rewards
  }

  return rewards.map((reward) => {
    if (reward?.type !== 'currency' || reward.targetId !== 'pokedollars') {
      return reward
    }

    return {
      ...reward,
      quantity: scalePokedollarRewardQuantity(
        reward.quantity,
        SS_ANNE_EVENING_CRUISE_PAYOUT_MULTIPLIER,
      ),
    }
  })
}

export function buildBattleWinRewards(
  state: BattleState,
  user: User,
  battleConfig: any,
) {
  const rewardsToGrant = scaleRepeatBattleCashRewards(state, [
    ...(battleConfig.rewards || []),
  ])
  rewardsToGrant.push(...(state.moveRewards || []))
  const userSkills = user.skills || {}
  const researchingLevel = (userSkills as any)?.researching?.level || 1

  let totalBattlingXp = 0
  for (const enemy of state.enemyTeam) {
    const enemyLevel = typeof enemy.level === 'number' ? enemy.level : 1
    const formData =
      getPokemonForm(enemy.formId) || getPokemonSpecies(enemy.speciesId)
    const xpConfig = resolveSkillXpConfig(
      'battling',
      enemyLevel,
      battleConfig.skillXp,
    )
    totalBattlingXp += calculatePokemonContentSkillXp(
      xpConfig.skill,
      xpConfig.level,
      formData?.base_experience,
    )
  }

  const generatedXpMultiplier =
    typeof battleConfig.generatedXpMultiplier === 'number' &&
    Number.isFinite(battleConfig.generatedXpMultiplier)
      ? Math.max(0, battleConfig.generatedXpMultiplier)
      : 1
  totalBattlingXp = Math.round(totalBattlingXp * generatedXpMultiplier)

  if (totalBattlingXp > 0) {
    const skill = battleConfig.skillXp?.skill || 'battling'
    rewardsToGrant.push({
      type: 'xp',
      quantity: totalBattlingXp,
      dropChance: 100,
      skill,
    })
  }

  const involvedPlayerPokemon = getInvolvedPlayerPokemon(state)
  const isPlayerVersusPlayer = state.isPvp === true || battleConfig.pvp === true
  if (!isPlayerVersusPlayer && !state.chronicle) {
    for (const pokemon of involvedPlayerPokemon) {
      const pokemonId = getPersistentPokemonId(pokemon)
      if (!pokemonId) continue

      // `level` is the battle-projected level and may be capped for a gym or
      // VS Seeker fight. PvE experience must use the owned Pokémon's real
      // persisted level instead.
      const actualPokemonLevel =
        typeof pokemon.actualLevel === 'number' && pokemon.actualLevel > 0
          ? pokemon.actualLevel
          : pokemon.level
      const totalPokemonExperience = state.enemyTeam.reduce((total, enemy) => {
        const formData =
          getPokemonForm(enemy.formId) || getPokemonSpecies(enemy.speciesId)
        return total + getPokemonBattleExperience(
          formData?.base_experience,
          actualPokemonLevel,
        )
      }, 0)

      if (totalPokemonExperience > 0) {
        rewardsToGrant.push({
          type: 'pokemon_experience',
          targetId: pokemonId,
          quantity: totalPokemonExperience,
          dropChance: 100,
        })
      }
    }
  }

  for (const pokemon of involvedPlayerPokemon) {
    const researchFormId =
      pokemon.originalFormId ||
      pokemon.battleAbilityState?.originalTransform?.formId ||
      pokemon.formId
    if (!researchFormId) continue
    rewardsToGrant.push({
      type: 'pokemon_research_xp',
      targetId: researchFormId,
      quantity: BATTLE_PARTICIPANT_RESEARCH_XP,
      dropChance: 100,
    })
  }

  for (const pokemon of involvedPlayerPokemon) {
    for (const effect of getBattleAbilityWinRewards(pokemon)) {
      rewardsToGrant.push(...effect.rewards.map((reward) => ({ ...reward })))
    }
  }

  if (battleConfig.isWildBattle) {
    const allEnemyTypes: string[] = []
    for (const enemy of state.enemyTeam) {
      const formData =
        getPokemonForm(enemy.formId) || getPokemonSpecies(enemy.speciesId)
      if (formData?.types) {
        allEnemyTypes.push(...formData.types)
      }
      if (enemy.formId) {
        rewardsToGrant.push({
          type: 'pokemon_research_xp',
          targetId: enemy.formId,
          quantity: BATTLE_WILD_TARGET_RESEARCH_XP,
          dropChance: 100,
        })
      }
    }

    if (state.enemyTeam.length > 0) {
      const highestEnemyLevel = Math.max(
        ...state.enemyTeam.map((enemy) =>
          typeof enemy.level === 'number' ? enemy.level : 1,
        ),
      )
      const effectiveBrokenBallLevel =
        typeof battleConfig.levelCap === 'number'
          ? Math.min(highestEnemyLevel, battleConfig.levelCap)
          : highestEnemyLevel
      if (allEnemyTypes.length > 0) {
        rewardsToGrant.push(
          ...buildArtisanMaterialRewards(
            {
              speciesId: 0,
              level: effectiveBrokenBallLevel,
              types: allEnemyTypes,
              researchingLevel,
            },
            'battle',
          ),
        )
      }
      rewardsToGrant.push(
        ...buildBrokenBallRewards(
          {
            level: effectiveBrokenBallLevel,
            researchingLevel,
          },
          'wild-battle',
        ),
      )
    }
  }

  const enemyLevels = state.enemyTeam.map((e) =>
    typeof e.level === 'number' ? e.level : 1,
  )
  const candyRewards = calculateCandyRewards(
    battleConfig,
    enemyLevels,
    battleConfig.isWildBattle
      ? getWildBattleCandyMultiplier(involvedPlayerPokemon)
      : 1,
  )
  rewardsToGrant.push(...candyRewards)

  return rewardsToGrant
}
