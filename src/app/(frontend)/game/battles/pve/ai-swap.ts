import type { BattlePokemon } from '@/utilities/battle/types'
import { getDualTypeEffectiveness } from '@/utilities/battle/type-chart'
import { getEffectiveBattleTypes } from '@/utilities/battle/tera'

/**
 * Evaluates the best candidate to swap out to based on type effectiveness.
 * Prioritizes: Super Effective > Normal Damage > Reduced Damage.
 * If multiple exist in a tier, it picks one randomly.
 */
export function getBestSwapCandidate(
  enemyTeam: BattlePokemon[],
  currentEnemyIndex: number,
  playerMon: BattlePokemon,
): number {
  const aliveCandidates = enemyTeam
    .map((mon, index) => ({ mon, index }))
    .filter((c) => c.index !== currentEnemyIndex && c.mon.currentHp > 0)

  if (aliveCandidates.length === 0) return -1

  const superEffective: number[] = []
  const normalDamage: number[] = []
  const reducedDamage: number[] = []
  const zeroDamage: number[] = []

  for (const candidate of aliveCandidates) {
    let bestEffectiveness = -1

    const typesToTest =
      candidate.mon.types && candidate.mon.types.length > 0 ? candidate.mon.types : ['normal']

    for (const type of typesToTest) {
      const effectiveness = getDualTypeEffectiveness(
        type,
        getEffectiveBattleTypes(playerMon),
      )
      if (effectiveness > bestEffectiveness) {
        bestEffectiveness = effectiveness
      }
    }

    if (bestEffectiveness > 1) superEffective.push(candidate.index)
    else if (bestEffectiveness === 1) normalDamage.push(candidate.index)
    else if (bestEffectiveness > 0) reducedDamage.push(candidate.index)
    else zeroDamage.push(candidate.index)
  }

  const pickRandom = (arr: number[]) => arr[Math.floor(Math.random() * arr.length)]

  if (superEffective.length > 0) return pickRandom(superEffective)
  if (normalDamage.length > 0) return pickRandom(normalDamage)
  if (reducedDamage.length > 0) return pickRandom(reducedDamage)
  if (zeroDamage.length > 0) return pickRandom(zeroDamage)

  // Fallback, should never hit based on above logic
  return pickRandom(aliveCandidates.map((c) => c.index))
}

/**
 * Determines if the AI should swap in the middle of a turn.
 * 1. Must swap if all types deal 0 damage, and there is a candidate that can do > 0 damage.
 * 2. 30% chance to swap if best type deals reduced damage (< 1), and there is a candidate that can do >= 1 damage.
 * Returns the index to swap to, or -1 if no swap should occur.
 */
export function shouldAiSwapMidTurn(
  enemyMon: BattlePokemon,
  playerMon: BattlePokemon,
  enemyTeam: BattlePokemon[],
  activeEnemyIndex: number,
): number {
  let bestEffectiveness = -1
  const typesToTest = enemyMon.types && enemyMon.types.length > 0 ? enemyMon.types : ['normal']

  for (const type of typesToTest) {
    const effectiveness = getDualTypeEffectiveness(
      type,
      getEffectiveBattleTypes(playerMon),
    )
    if (effectiveness > bestEffectiveness) {
      bestEffectiveness = effectiveness
    }
  }

  // 1. If 0 damage, try to find ANY pokemon that can do > 0 damage
  if (bestEffectiveness === 0) {
    const candidateIndex = getBestSwapCandidate(enemyTeam, activeEnemyIndex, playerMon)
    if (candidateIndex === -1) return -1

    // Verify candidate can do > 0 damage so we don't swap endlessly to 0 damage mons
    const candidate = enemyTeam[candidateIndex]
    let candidateBest = -1
    const candTypesToTest =
      candidate.types && candidate.types.length > 0 ? candidate.types : ['normal']
    for (const type of candTypesToTest) {
      const eff = getDualTypeEffectiveness(type, getEffectiveBattleTypes(playerMon))
      if (eff > candidateBest) candidateBest = eff
    }

    if (candidateBest > 0) return candidateIndex
    return -1 // If best candidate also does 0 damage, stay put
  }

  // 2. If reduced damage, 30% chance to swap to better
  if (bestEffectiveness > 0 && bestEffectiveness < 1) {
    if (Math.random() < 0.3) {
      const candidateIndex = getBestSwapCandidate(enemyTeam, activeEnemyIndex, playerMon)
      if (candidateIndex === -1) return -1

      // Verify candidate is ACTUALLY better (>= 1 damage)
      const candidate = enemyTeam[candidateIndex]
      let candidateBest = -1
      const candTypesToTest =
        candidate.types && candidate.types.length > 0 ? candidate.types : ['normal']
      for (const type of candTypesToTest) {
        const eff = getDualTypeEffectiveness(
          type,
          getEffectiveBattleTypes(playerMon),
        )
        if (eff > candidateBest) candidateBest = eff
      }

      if (candidateBest >= 1) return candidateIndex
    }
    return -1
  }

  return -1
}
