export const BATTLE_ANIMATION_TIMINGS = {
  combatApproachMs: 100,
  combatImpactMs: 100,
  combatRecoveryMs: 0,
  healRecoveryMs: 50,
  statusEffectMs: 100,
  statusRecoveryMs: 0,
} as const

export const STANDARD_COMBAT_ACTION_LOCK_MS =
  BATTLE_ANIMATION_TIMINGS.combatApproachMs +
  BATTLE_ANIMATION_TIMINGS.combatImpactMs +
  BATTLE_ANIMATION_TIMINGS.combatRecoveryMs
