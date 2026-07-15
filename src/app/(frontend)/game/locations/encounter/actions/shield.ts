import type { EncounterShieldState, EncounterState } from './types'

export interface ClientEncounterShieldState {
  type: 'consecutive' | 'total'
  requiredCorrectAnswers: number
  regenSeconds?: number
  bubbleColor?: string
  active: boolean
  correctAnswers: number
  consecutiveCorrectAnswers: number
  progress: number
  brokenCount: number
  brokenAt?: number
  nextRegenAt?: number
}

export function refreshEncounterShield(
  state: EncounterState,
  now = Date.now(),
): boolean {
  const shield = state.shield
  if (!shield || shield.active || !shield.nextRegenAt) return false
  if (now < shield.nextRegenAt) return false

  shield.active = true
  shield.correctAnswers = 0
  shield.consecutiveCorrectAnswers = 0
  shield.nextRegenAt = undefined
  return true
}

export function getShieldProgress(shield: EncounterShieldState): number {
  return shield.config.type === 'consecutive'
    ? shield.consecutiveCorrectAnswers
    : shield.correctAnswers
}

export function serializeEncounterShield(
  state: EncounterState,
  now = Date.now(),
): ClientEncounterShieldState | undefined {
  const shield = state.shield
  if (!shield) return undefined

  const active =
    shield.active || (!!shield.nextRegenAt && now >= shield.nextRegenAt)

  return {
    type: shield.config.type,
    requiredCorrectAnswers: shield.config.requiredCorrectAnswers,
    regenSeconds: shield.config.regenSeconds,
    bubbleColor: shield.config.bubbleColor,
    active,
    correctAnswers: shield.correctAnswers,
    consecutiveCorrectAnswers: shield.consecutiveCorrectAnswers,
    progress: active ? getShieldProgress(shield) : shield.config.requiredCorrectAnswers,
    brokenCount: shield.brokenCount,
    brokenAt: shield.brokenAt,
    nextRegenAt: active ? undefined : shield.nextRegenAt,
  }
}

export function applyCorrectAnswerToShield(
  state: EncounterState,
  now = Date.now(),
): { wasShielded: boolean; brokeShield: boolean } {
  const shield = state.shield
  if (!shield?.active) return { wasShielded: false, brokeShield: false }

  shield.correctAnswers += 1
  shield.consecutiveCorrectAnswers += 1

  if (getShieldProgress(shield) < shield.config.requiredCorrectAnswers) {
    return { wasShielded: true, brokeShield: false }
  }

  shield.active = false
  shield.brokenCount += 1
  shield.brokenAt = now
  state.currentCatchRate = Math.max(state.currentCatchRate, state.baseCatchRate)
  if (shield.config.regenSeconds) {
    shield.nextRegenAt = now + shield.config.regenSeconds * 1000
  } else {
    state.shield = undefined
  }

  return { wasShielded: true, brokeShield: true }
}

export function applyIncorrectAnswerToShield(state: EncounterState): boolean {
  const shield = state.shield
  state.consecutiveCorrectAnswers = 0
  if (!shield?.active) return false

  shield.consecutiveCorrectAnswers = 0
  return true
}
