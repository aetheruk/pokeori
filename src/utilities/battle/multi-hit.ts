import { applyPokemonResearchEndure } from './research-survival'
import { applyHeldDamageBlock } from './held-items'
import {
  applyBattleAbilityDamageModifiers,
  applyBattleAbilityOnDamagedStatStages,
} from './abilities'
import { applyBattleFormChange } from './stats-calc'
import type {
  BattlePokemon,
  BattleStance,
  BattleState,
} from './types'

type BattleSide = 'player' | 'enemy'

export interface AppliedRepeatedHitDamage {
  damage: number
  messages: string[]
  previousHp: number
  firstHitDamage: number
  attemptedHits: number
}

function splitDamageIntoHitChunks(totalDamage: number, hitCount: number): number[] {
  const count = Math.max(1, Math.floor(hitCount))
  const damage = Math.max(0, Math.floor(totalDamage))
  if (count === 1 || damage <= 0) return [damage]

  const chunks: number[] = []
  let remainingDamage = damage
  for (let index = 0; index < count; index += 1) {
    const hitsLeft = count - index
    const chunk = Math.ceil(remainingDamage / hitsLeft)
    chunks.push(chunk)
    remainingDamage = Math.max(0, remainingDamage - chunk)
  }
  return chunks
}

export function applyRepeatedHitDamage(params: {
  state?: BattleState
  attacker?: BattlePokemon
  defender: BattlePokemon
  defenderSide?: BattleSide
  baseDamage: number
  hitCount?: number
  attackStance?: BattleStance
  attackType?: string
  typeEffectiveness?: number
  typeImmunityBypassAttackTypes?: string[] | true
  criticalHit?: boolean
  random?: () => number
  hitCountMessage?: boolean
}): AppliedRepeatedHitDamage {
  const hitCount = Math.max(1, Math.floor(params.hitCount ?? 1))
  const chunks = splitDamageIntoHitChunks(params.baseDamage, hitCount)
  const messages: string[] = []
  const previousHp = params.defender.currentHp
  let totalDamage = 0
  let firstHitDamage = 0
  let attemptedHits = 0

  for (const chunk of chunks) {
    if (params.defender.currentHp <= 0) break
    attemptedHits += 1
    if (chunk <= 0) continue

    const abilityResult = applyBattleAbilityDamageModifiers({
      attacker: params.attacker,
      defender: params.defender,
      damage: chunk,
      attackStance: params.attackStance,
      attackType: params.attackType,
      typeEffectiveness: params.typeEffectiveness,
      typeImmunityBypassAttackTypes: params.typeImmunityBypassAttackTypes,
    })
    messages.push(...abilityResult.messages)
    applyBattleFormChange(params.defender, abilityResult.formChangeId)

    const blockResult = applyHeldDamageBlock(
      params.defender,
      abilityResult.damage,
      params.random,
    )
    if (blockResult.message) messages.push(blockResult.message)

    const endureResult = applyPokemonResearchEndure(
      params.defender,
      blockResult.damage,
    )
    const hitPreviousHp = params.defender.currentHp
    params.defender.currentHp = Math.max(
      0,
      params.defender.currentHp - endureResult.damage,
    )
    totalDamage += endureResult.damage
    if (firstHitDamage === 0) firstHitDamage = endureResult.damage
    if (endureResult.message) messages.push(endureResult.message)

    if (params.attacker) {
      messages.push(
        ...applyBattleAbilityOnDamagedStatStages({
          defender: params.defender,
          attacker: params.attacker,
          damage: endureResult.damage,
          previousHp: hitPreviousHp,
          attackStance: params.attackStance,
          attackType: params.attackType,
          criticalHit: params.criticalHit,
          weather: params.state?.weather?.weather,
          state: params.state,
          defenderSide: params.defenderSide,
          random: params.random,
        }),
      )
    }
  }

  if (params.hitCountMessage !== false && hitCount > 1 && attemptedHits > 1) {
    const source = params.attacker?.name || 'The attack'
    messages.push(`${source} hit ${attemptedHits} times!`)
  }

  return {
    damage: totalDamage,
    messages,
    previousHp,
    firstHitDamage,
    attemptedHits,
  }
}
