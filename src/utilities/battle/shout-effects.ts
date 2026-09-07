import { SHOUT_DURATION } from '@/data/powers'
import type {
  BattleCoreStat,
  BattlePokemon,
  StatStages,
} from './types'
import { DEFAULT_STAT_STAGES, clampStatStage } from './stats-calc'

export const SHOUT_BOOSTED_STATS: readonly BattleCoreStat[] = [
  'attack',
  'defense',
  'specialAttack',
  'specialDefense',
  'speed',
]

function cloneShoutBoost(
  boost: BattlePokemon['shoutBoost'],
): BattlePokemon['shoutBoost'] {
  if (!boost) return undefined
  return {
    ...boost,
    appliedStages: { ...boost.appliedStages },
  }
}

export function applyShoutStatBoost(
  pokemon: BattlePokemon,
  currentTurn: number,
): { applied: boolean; message: string } {
  if (pokemon.shoutBoost) {
    return {
      applied: false,
      message: `${pokemon.name}'s Battle Shout is already active.`,
    }
  }

  pokemon.statStages ??= { ...DEFAULT_STAT_STAGES }
  const appliedStages: Partial<Record<BattleCoreStat, number>> = {}

  for (const stat of SHOUT_BOOSTED_STATS) {
    const before = pokemon.statStages[stat]
    const after = clampStatStage(before + 1, stat)
    pokemon.statStages[stat] = after

    const applied = after - before
    if (applied > 0) appliedStages[stat] = applied
  }

  pokemon.shoutBoost = {
    turnsRemaining: SHOUT_DURATION,
    activatedTurn: currentTurn,
    appliedStages,
  }

  return {
    applied: true,
    message:
      Object.keys(appliedStages).length > 0
        ? `${pokemon.name}'s Battle Shout raised its Attack, Defense, Special Attack, Special Defense, and Speed!`
        : `${pokemon.name}'s Battle Shout was unleashed, but its stats cannot rise any further.`,
  }
}

/**
 * Removes only the stages that this Battle Shout successfully applied.
 * Other move, item, ability, and rarity stages are preserved.
 */
export function clearShoutStatBoost(pokemon: BattlePokemon | undefined): boolean {
  const boost = pokemon?.shoutBoost
  if (!pokemon || !boost) return false

  if (pokemon.statStages) {
    for (const [stat, stages] of Object.entries(boost.appliedStages) as [
      BattleCoreStat,
      number,
    ][]) {
      pokemon.statStages[stat] = clampStatStage(
        pokemon.statStages[stat] - stages,
        stat,
      )
    }
  }

  pokemon.shoutBoost = undefined
  return true
}

/**
 * Removes Shout-owned stages from a stat-stage snapshot before a switch-pass
 * effect copies the remaining stat changes to another Pokemon.
 */
export function removeShoutBoostFromStatStages(
  pokemon: BattlePokemon,
  stages: StatStages,
): StatStages {
  const boost = pokemon.shoutBoost
  if (!boost) return { ...stages }

  const next = { ...stages }
  for (const [stat, applied] of Object.entries(boost.appliedStages) as [
    BattleCoreStat,
    number,
  ][]) {
    next[stat] = clampStatStage(next[stat] - applied, stat)
  }
  return next
}

export function advanceShoutStatBoostForTurn(
  pokemon: BattlePokemon | undefined,
  currentTurn: number,
): string | undefined {
  const boost = pokemon?.shoutBoost
  if (!pokemon || !boost) return undefined

  // Match Tera's timing: the activation turn is protected, then the boost
  // remains for three subsequent turns.
  if (boost.activatedTurn === currentTurn) return undefined

  boost.turnsRemaining = Math.max(0, boost.turnsRemaining - 1)
  if (boost.turnsRemaining > 0) return undefined

  clearShoutStatBoost(pokemon)
  return `${pokemon.name}'s Battle Shout faded.`
}

export function cloneBattleShoutBoost(
  boost: BattlePokemon['shoutBoost'],
): BattlePokemon['shoutBoost'] {
  return cloneShoutBoost(boost)
}
