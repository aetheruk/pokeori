export type BattleAiActor = 'self' | 'opponent'

export type BattleAiEffectiveness =
  | 'immune'
  | 'not-very-effective'
  | 'neutral'
  | 'super-effective'

export type BattleAiEffectivenessFloor =
  | 'not-very-effective'
  | 'neutral'
  | 'super-effective'
export type BattleAiStat =
  | 'attack'
  | 'defense'
  | 'specialAttack'
  | 'specialDefense'
  | 'speed'
export type BattleAiComparison =
  | 'greaterThan'
  | 'greaterThanOrEqual'
  | 'lessThan'
  | 'lessThanOrEqual'
  | 'equal'
  | 'notEqual'

export type BattleAiUseCondition =
  | {
      type: 'hp-at-or-below'
      target?: BattleAiActor
      thresholdPercent: number
    }
  | {
      type: 'hp-above'
      target?: BattleAiActor
      thresholdPercent: number
    }
  | {
      type: 'hp-comparison'
      leftTarget?: BattleAiActor
      rightTarget?: BattleAiActor
      comparison: BattleAiComparison
    }
  | {
      type: 'status'
      target?: BattleAiActor
      status: string | string[] | 'all'
    }
  | {
      type: 'status-absent'
      target?: BattleAiActor
      status?: string | string[] | 'all'
    }
  | {
      type: 'turn-start'
      minTurn?: number
    }
  | {
      type: 'turn-divisible-by'
      divisor: number
    }
  | {
      type: 'active-turn'
      target?: BattleAiActor
      maxTurn?: number
      minTurn?: number
    }
  | {
      type: 'stat-comparison'
      target?: BattleAiActor
      left: BattleAiStat
      comparison: BattleAiComparison
      right: BattleAiStat
      effective?: boolean
    }
  | {
      type: 'default-effectiveness'
      matches?: BattleAiEffectiveness[]
      atLeast?: BattleAiEffectivenessFloor
    }
  | {
      type: 'move-effectiveness'
      target?: BattleAiActor
      matches?: BattleAiEffectiveness[]
      atLeast?: BattleAiEffectivenessFloor
    }
  | {
      type: 'no-other-move-effectiveness'
      atLeast?: BattleAiEffectivenessFloor
    }
  | {
      type: 'not-type'
      target?: BattleAiActor
      pokemonType: string
    }
  | {
      type: 'has-type'
      target?: BattleAiActor
      pokemonType: string
    }
  | {
      type: 'opponent-used-move'
    }

export interface BattleAiUseConditionGroup {
  conditions: BattleAiUseCondition[]
  mode?: 'all' | 'any'
  chance?: number
}

export interface BattleAiUseConfig {
  conditions?: BattleAiUseCondition[]
  conditionGroups?: BattleAiUseConditionGroup[]
  mode?: 'all' | 'any'
  chance?: number
}
