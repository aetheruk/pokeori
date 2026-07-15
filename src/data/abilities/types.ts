import type { LocationEncounter, LocationReward } from '../types'
import type {
  SecondaryStatusEffect,
  SecondaryStatusTrigger,
  StatusEffectId,
} from '../moves/types'

export type AbilityType =
  | 'timer'
  | 'reward'
  | 'shiny'
  | 'encounter'
  | 'level'
  | 'catch'
  | 'escape'
  | 'answer'

export interface AbilityCriteria {
  chance?: number
  formId?: string
  sourceFormId?: string
  speciesId?: number[]
  type?: string[]
  category?: string
  subCategory?: string
  locationId?: string
  gameType?: string[]
  researchId?: string[]
  weather?: string[]
  timeOfDay?: 'day' | 'night'
}

export type AbilityFormEntry = string | readonly string[]

export interface AbilityNaturalAssignment {
  forms: readonly AbilityFormEntry[]
  chance: number
  hidden?: boolean
  slot?: number
}

export type AbilityEffectTrigger = 'correct' | 'wrong' | 'complete'

export type BattleStatStage =
  | 'attack'
  | 'defense'
  | 'specialAttack'
  | 'specialDefense'
  | 'speed'
  | 'crit'
  | 'accuracy'
  | 'evasion'

export interface AbilityEffectCondition extends AbilityCriteria {
  trigger?: AbilityEffectTrigger
  firstAnswer?: boolean
  sameSourceForm?: boolean
  activeLevelBeatsTarget?: boolean
  noWrongAnswers?: boolean
  caught?: boolean
  timeRemaining?: boolean
  minimumCorrectAnswers?: number
  exactCorrectAnswers?: number
  correctStreakAtMost?: number
  correctStreakModulo?: number
  minuteWindow?: {
    hour: number
    beforeMinute: number
  }
  hourRange?: {
    start: number
    end: number
  }
  surveyFocus?: string[]
}

export type AbilityEffect =
  | {
      type: 'temporary-copy-target-primary-ability'
      chance: number
    }
  | {
      type: 'encounter-replacement'
      chance: number
      encounters: LocationEncounter[]
      condition?: AbilityEffectCondition
    }
  | {
      type: 'timer-delta'
      seconds: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'level-delta'
      levels: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'shiny-chance-multiplier'
      multiplier: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'extra-shiny-roll'
      mode: 'same-source-form' | 'fixed-chance'
      chance?: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'catch-rate-multiplier'
      multiplier: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'active-escape'
      chance: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'quiz-decoration'
      mode:
        | 'hide-option-labels'
        | 'scramble-question-and-options'
        | 'remove-wrong-option'
        | 'replace-wrong-option'
        | 'disable-wrong-options'
        | 'highlight-random-option'
        | 'highlight-correct-option'
        | 'rotate-options'
        | 'swap-correct-with-last-position'
      chance?: number
      label?: string
      disabledMs?: number
      highlightedMs?: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'answer-convert-wrong-to-correct'
      chance: number
      message?: string
      condition?: AbilityEffectCondition
    }
  | {
      type: 'answer-fail-encounter'
      abilityLost?: boolean
      message?: string
      condition?: AbilityEffectCondition
    }
  | {
      type: 'answer-skip-default'
      condition?: AbilityEffectCondition
    }
  | {
      type: 'answer-rate-delta'
      amount?: number
      changeAmountMultiplier?: number
      message?: string
      condition?: AbilityEffectCondition
    }
  | {
      type: 'answer-timer-delta'
      milliseconds: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'answer-reset-correct-streak'
      condition?: AbilityEffectCondition
    }
  | {
      type: 'capture-rewards'
      rewards: LocationReward[]
      condition?: AbilityEffectCondition
    }
  | {
      type: 'capture-material-reward'
      materialType: string
      quantity: number
      dropChance?: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'capture-currency-by-level'
      currencyId: string
      levelMultiplier: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'capture-candy-by-level'
      dropChance?: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'capture-source-form-item'
      sourceFormItems: Record<string, string>
      fallbackItemId: string
      chance: number
      abilityLost?: boolean
      condition?: AbilityEffectCondition
    }
  | {
      type: 'capture-random-item'
      itemIds: string[]
      chance: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'capture-research-xp'
      amount: number
      target: 'encounter-form'
      condition?: AbilityEffectCondition
    }
  | {
      type: 'research-session-time-delta'
      seconds: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'research-answer-grace'
      chance: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'research-win-delta'
      amount: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'research-skill-xp-multiplier'
      multiplier: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'research-rewards'
      rewards: LocationReward[]
      condition?: AbilityEffectCondition
    }
  | {
      type: 'field-observation-duration-delta'
      observationSeconds?: number
      answerSeconds?: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'field-observation-pool-weight-multiplier'
      multiplier: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'field-observation-spawn-modifier'
      spawnCountMultiplier?: number
      shinyChanceMultiplier?: number
      hiddenChanceMultiplier?: number
      eventChanceMultiplier?: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'field-observation-global-event-odds-multiplier'
      pokemonEventMultiplier?: number
      itemEventMultiplier?: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'field-observation-collectible-modifier'
      dropChanceMultiplier?: number
      quantityBonus?: number
      durationMultiplier?: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'field-observation-extra-collectible'
      reward: LocationReward
      kind?: 'material' | 'nut' | 'berry' | 'broken-ball' | 'item'
      condition?: AbilityEffectCondition
    }
  | {
      type: 'field-observation-reward-protection'
      chance: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'field-observation-research-xp-multiplier'
      multiplier: number
      condition?: AbilityEffectCondition
    }
  | {
      type: 'battle-type-immunity'
      attackTypes: string[]
    }
  | {
      type: 'battle-type-absorb'
      attackTypes: string[]
      healPercent?: number
      statBoost?: Partial<Record<BattleStatStage, number>>
    }
  | {
      type: 'battle-status-immunity'
      statuses: string[]
      weather?: string[]
      pokemonTypes?: string[]
    }
  | {
      type: 'battle-interrupt-immunity'
    }
  | {
      type: 'battle-defender-ability-bypass'
    }
  | {
      type: 'battle-entry-ability-copy'
    }
  | {
      type: 'battle-entry-fainted-ally-ability-copy'
  }
  | {
      type: 'battle-entry-move-scout'
  }
  | {
      type: 'battle-entry-opponent-stat-stage-drop'
      statBoosts: Partial<Record<BattleStatStage, number>>
    }
  | {
      type: 'battle-entry-danger-scout'
  }
  | {
      type: 'battle-entry-held-item-scout'
    }
  | {
      type: 'battle-illusion-mask'
    }
  | {
      type: 'battle-entry-transform'
    }
  | {
      type: 'battle-active-ability-suppression'
    }
  | {
      type: 'battle-mental-effect-immunity'
      effectIds: string[]
    }
  | {
      type: 'battle-stat-stage-immunity'
      stats?: readonly BattleStatStage[]
      source?: 'opponent'
      pokemonTypes?: string[]
    }
  | {
      type: 'battle-opponent-stat-stage-bypass'
      stages: 'positive' | 'negative' | 'all'
    }
  | {
      type: 'battle-crit-immunity'
    }
  | {
      type: 'battle-crit-modifier'
      chanceDelta?: number
      damageMultiplier?: number
    }
  | {
      type: 'battle-guaranteed-crit'
      targetStatuses?: string[]
    }
  | {
      type: 'battle-after-ko-stat-stage'
      stat: BattleStatStage
      stages: number
    }
  | {
      type: 'battle-stat-stage-drop-trigger'
      statBoosts: Partial<Record<BattleStatStage, number>>
      source?: 'opponent'
    }
  | {
      type: 'battle-stat-stage-drop-reflect'
      stats?: readonly BattleStatStage[]
      source?: 'opponent'
    }
  | {
      type: 'battle-opponent-stat-stage-boost-copy'
    }
  | {
      type: 'battle-switch-prevention'
      affectedTypes?: string[]
      excludedTypes?: string[]
      excludedAbilities?: string[]
    }
  | {
      type: 'battle-switch-prevention-immunity'
    }
  | {
      type: 'battle-forced-switch-immunity'
    }
  | {
      type: 'battle-switch-out-heal'
      healPercent: number
    }
  | {
      type: 'battle-switch-out-status-cure'
      statuses?: string[]
    }
  | {
      type: 'battle-low-hp-self-switch'
      hpCrossedAtOrBelowPercent: number
    }
  | {
      type: 'battle-outgoing-damage-reduction-immunity'
    }
  | {
      type: 'battle-on-damaged-stat-stage'
      target?: 'self' | 'attacker'
      statBoosts: Partial<Record<BattleStatStage, number>>
      attackTypes?: string[]
      hpCrossedAtOrBelowPercent?: number
      criticalHit?: boolean
    }
  | {
      type: 'battle-on-damaged-status'
      target?: 'self' | 'attacker'
      statuses: StatusEffectId[]
      chance: number
    }
  | {
      type: 'battle-on-damaged-secondary-status'
      target?: 'self' | 'attacker' | 'both'
      statusId: string
      name?: string
      triggers?: SecondaryStatusTrigger[]
      effects: SecondaryStatusEffect[]
      chance: number
      turns?: number
      delayTurns?: number
      requiresOppositeGender?: boolean
    }
  | {
      type: 'battle-on-damaged-side-secondary-status'
      targetSide: 'attacker' | 'defender'
      statusId: string
      name?: string
      effects: SecondaryStatusEffect[]
      chance: number
      turns?: number
    }
  | {
      type: 'battle-on-damaged-ability-change'
      mode: 'replace-attacker' | 'swap'
      abilityId?: string
      chance: number
    }
  | {
      type: 'battle-on-damaged-stance-disable'
      chance: number
      turns: number
    }
  | {
      type: 'battle-on-damaged-terrain-set'
      terrain: string
      chance?: number
    }
  | {
      type: 'battle-on-damaged-type-change'
    }
  | {
      type: 'battle-on-damaged-damage'
      target?: 'attacker'
      maxHpFraction: number
    }
  | {
      type: 'battle-on-damaged-ko-damage'
      target?: 'attacker'
      damage: { type: 'attacker-max-hp-fraction'; fraction: number } | { type: 'damage-taken' }
      contactOnly?: boolean
    }
  | {
      type: 'battle-recoil-immunity'
    }
  | {
      type: 'battle-indirect-damage-immunity'
    }
  | {
      type: 'battle-recoil-damage-multiplier'
      multiplier: number
    }
  | {
      type: 'battle-weather-turn-heal'
      healPercent: number
      weather: string[]
    }
  | {
      type: 'battle-weather-turn-damage'
      damagePercent: number
      weather: string[]
    }
  | {
      type: 'battle-status-turn-heal'
      healPercent: number
      statuses: string[]
    }
  | {
      type: 'battle-status-turn-damage'
      damagePercent: number
      statuses: string[]
      sourceName?: string
    }
  | {
      type: 'battle-status-application-bypass'
      statuses: string[]
    }
  | {
      type: 'battle-turn-end-status-cure'
      chance: number
      statuses?: string[]
    }
  | {
      type: 'battle-weather-damage-immunity'
      weather?: string[]
    }
  | {
      type: 'battle-weather-set'
      weather: string
      primal?: boolean
    }
  | {
      type: 'battle-weather-type-change'
    }
  | {
      type: 'battle-terrain-type-change'
    }
  | {
      type: 'battle-held-item-type-change'
      item: 'plate' | 'memory'
      fallbackType?: string
    }
  | {
      type: 'battle-terrain-set'
      terrain: string
    }
  | {
      type: 'battle-move-block'
      moveIds: string[]
      scope?: 'incoming' | 'field'
    }
  | {
      type: 'battle-status-move-immunity'
    }
  | {
      type: 'battle-status-move-reflect'
    }
  | {
      type: 'battle-secondary-effect-immunity'
    }
  | {
      type: 'battle-secondary-effect-chance-multiplier'
      multiplier: number
    }
  | {
      type: 'battle-added-effect-damage-boost'
      multiplier: number
    }
  | {
      type: 'battle-damaging-move-interrupt-chance'
      chance: number
    }
  | {
      type: 'battle-move-accuracy-multiplier'
      target?: 'attacker' | 'defender'
      multiplier: number
      maxAccuracy?: number
      weather?: string[]
      statuses?: string[]
      nonDamagingOnly?: boolean
    }
  | {
      type: 'battle-move-accuracy-stage'
      stat: 'accuracy' | 'evasion'
      stages: number
      target?: 'attacker' | 'defender'
      weather?: string[]
      statuses?: string[]
    }
  | {
      type: 'battle-move-accuracy-bypass'
    }
  | {
      type: 'battle-multi-hit-max'
    }
  | {
      type: 'battle-extra-hit'
      damageMultiplier: number
    }
  | {
      type: 'battle-contact-effect-immunity'
    }
  | {
      type: 'battle-held-item-protection'
    }
  | {
      type: 'battle-held-item-effect-suppression'
    }
  | {
      type: 'battle-on-damaged-held-item-steal'
      chance?: number
    }
  | {
      type: 'battle-post-damage-status'
      target?: 'defender'
      statuses: StatusEffectId[]
      chance: number
    }
  | {
      type: 'battle-status-reflection'
      statuses: StatusEffectId[]
    }
  | {
      type: 'battle-status-counter-step'
      status: StatusEffectId
      step: number
    }
  | {
      type: 'battle-post-damage-held-item-steal'
      chance?: number
    }
  | {
      type: 'battle-berry-effect-multiplier'
      multiplier: number
    }
  | {
      type: 'battle-berry-trigger-threshold'
      thresholdPercent: number
    }
  | {
      type: 'battle-before-move-skip'
      skipEveryActiveTurns: number
      firstSkipActiveTurn: number
    }
  | {
      type: 'battle-opposing-move-use-depletion'
      extraUses: number
    }
  | {
      type: 'battle-self-move-lock'
    }
  | {
      type: 'battle-before-attack-type-change'
      oncePerSwitch?: boolean
    }
  | {
      type: 'battle-priority-move-contest'
      moveIds?: string[]
      attackTypes?: string[]
      nonDamagingOnly?: boolean
      healingOnly?: boolean
      hpFull?: boolean
      chance?: number
    }
  | {
      type: 'battle-move-last'
    }
  | {
      type: 'battle-berry-consume-heal'
      healPercent: number
    }
  | {
      type: 'battle-consumed-berry-restore'
      chance: number
      weatherChance?: number
      weather?: string[]
    }
  | {
      type: 'battle-stat-multiplier'
      stat: 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed'
      multiplier: number
      stance?: string[]
      attackTypes?: string[]
      weather?: string[]
      statuses?: string[]
      hpAtOrBelowPercent?: number
      hpAbovePercent?: number
      hpFull?: boolean
      heldItemLost?: boolean
      activeTurnsAtOrBelow?: number
    }
  | {
      type: 'battle-damage-multiplier'
      target: 'attacker' | 'defender'
      multiplier: number
      stance?: string[]
      attackTypes?: string[]
      weather?: string[]
      statuses?: string[]
      moveIds?: string[]
      hpAtOrBelowPercent?: number
      hpAbovePercent?: number
      hpFull?: boolean
      typeEffectiveness?: 'super-effective' | 'not-very-effective'
      movePowerAtOrBelow?: number
    }
  | {
      type: 'battle-damage-gate'
      mode: 'super-effective-only'
    }
  | {
      type: 'battle-type-effectiveness-override'
      target: 'defender'
      typeEffectiveness: number
      hpFull?: boolean
      sourceFormIds?: string[]
    }
  | {
      type: 'battle-max-hp'
      hp: number
    }
  | {
      type: 'battle-one-hit-shield'
      shieldId: string
      blockedStances?: string[]
      breakFormId?: string
    }
  | {
      type: 'battle-full-hp-survive'
    }
  | {
      type: 'battle-form-change'
      trigger: 'entry' | 'before-attack' | 'after-ko' | 'switch-out' | 'hp-threshold'
      formId: string
      sourceFormIds?: string[]
      minLevel?: number
      hpAbovePercent?: number
      hpAtOrBelowPercent?: number
    }
  | {
      type: 'battle-tera-activation'
      formId?: string
      sourceFormIds?: string[]
      clearWeather?: boolean
      clearTerrain?: boolean
    }
  | {
      type: 'battle-win-rewards'
      rewards: LocationReward[]
      holderNoHeldItem?: boolean
    }
  | {
      type: 'battle-no-single-battle-effect'
      reason: string
    }

export interface AbilityConfig {
  id: string
  name: string
  description: string
  type: AbilityType
  value: number
  effects?: readonly AbilityEffect[]
  criteria?: AbilityCriteria
  // Compatible Pokemon form IDs. Used for both natural rolls and generated ability patches.
  // Nested helper arrays such as TypeGrass are flattened by resolveAbilityForms.
  forms?: readonly AbilityFormEntry[]
  naturalChance?: number
  naturalAssignments?: readonly AbilityNaturalAssignment[]
  rate: number
  // Locked abilities are special natural abilities that cannot be overwritten by Ability Patch items.
  locked?: boolean
  failureRate?: number
  encounters?: LocationEncounter[]
  rewards?: LocationReward[]
}

export interface AbilityAssignment {
  id: string
  rate: number
  hidden?: boolean
  slot?: number
}
