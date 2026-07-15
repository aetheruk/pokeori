import { getMostLikelyStance } from './ai-logic'
import { isStanceDisabled } from './stance-disable'
import type { BattlePokemon, BattleStance, BattleState } from './types'

const STANCE_LABELS: Record<BattleStance, string> = {
  power: 'Power',
  speed: 'Speed',
  tech: 'Tech',
}

const LEARNED_TELEGRAPH_CHANCE = 5
const LEARNED_TELEGRAPH_RESEARCH_LEVEL = 2

export function normalizeTelegraphChance(chance?: number): number {
  if (!Number.isFinite(chance)) return 0
  return Math.max(0, Math.min(100, Math.floor(chance || 0)))
}

export function consumePreparedEnemyStance(
  state: BattleState,
  activeEnemy: BattlePokemon,
): BattleStance | undefined {
  const prepared = state.preparedEnemyAttack
  if (!prepared) return undefined

  state.preparedEnemyAttack = undefined
  const matchesActiveEnemy =
    prepared.speciesId === activeEnemy.speciesId &&
    prepared.formId === String(activeEnemy.formId)

  if (!matchesActiveEnemy || isStanceDisabled(activeEnemy, prepared.stance)) {
    return undefined
  }

  return prepared.stance
}

export function maybePrepareEnemyAttack(params: {
  state: BattleState
  playerMon: BattlePokemon
  enemyMon: BattlePokemon
  chance?: number
  rng?: () => number
}): string {
  const { state, playerMon, enemyMon, rng = Math.random } = params
  state.preparedEnemyAttack = undefined

  if (state.status !== 'ongoing') return ''
  if (playerMon.currentHp <= 0 || enemyMon.currentHp <= 0) return ''

  const authoredChance = normalizeTelegraphChance(params.chance)
  const canUseAuthoredTelegraph =
    authoredChance > 0 && playerMon.currentHp < playerMon.maxHp * 0.5
  if (canUseAuthoredTelegraph && rng() * 100 < authoredChance) {
    const { stance } = getMostLikelyStance(enemyMon)
    return setPreparedAttack(
      state,
      enemyMon,
      stance,
      `${enemyMon.name} prepares a [icon:stance:${stance}] ${STANCE_LABELS[stance]} Attack.`,
    )
  }

  const observedStance = enemyMon.observedPreferredStance
  const canUseLearnedTelegraph =
    (enemyMon.pokemonResearchLevel || 0) >= LEARNED_TELEGRAPH_RESEARCH_LEVEL &&
    (observedStance === 'power' || observedStance === 'speed' || observedStance === 'tech') &&
    !isStanceDisabled(enemyMon, observedStance)

  if (!canUseLearnedTelegraph || rng() * 100 >= LEARNED_TELEGRAPH_CHANCE) {
    return ''
  }

  return setPreparedAttack(
    state,
    enemyMon,
    observedStance,
    `Hmm it looks like ${enemyMon.name} is preparing a [icon:stance:${observedStance}] ${STANCE_LABELS[observedStance]} attack.`,
  )
}

function setPreparedAttack(
  state: BattleState,
  enemyMon: BattlePokemon,
  stance: BattleStance,
  message: string,
): string {
  state.preparedEnemyAttack = {
    speciesId: enemyMon.speciesId,
    formId: String(enemyMon.formId),
    stance,
  }
  return message
}
