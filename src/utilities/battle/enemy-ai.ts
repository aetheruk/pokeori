import {
  getMove,
  getMoveDamageMultiplier,
  getRandomMoveStance,
  getRandomMoveType,
  MOVES,
  POKEMON_TYPES,
  resolveMoveDamageMultiplier,
} from '@/data/moves'
import type { MoveConfig } from '@/data/moves'
import type { BattleAiProfileId } from '@/data/types'
import { items, type Item } from '@/data/items'
import type { WeatherType } from '@/data/weather'
import type { BattlePokemon, BattleStance, BattleState } from './types'
import {
  getWeatherAttackMultiplier,
  getWeatherTypeEffectiveness,
} from './weather-effects'
import { applyStanceDisable, getDisabledStanceMessage } from './stance-disable'
import { getEffectiveBattleTypes } from './tera'
import { DEFAULT_STAT_STAGES, clampStatStage, getStatStageMultiplier } from './stats-calc'
import {
  applyMoveAbsorbHealing,
  applyStatus,
  applyMoveSelfDamage,
  canApplyStatus,
  STATUS_EFFECTS,
} from './status-effects-logic'
import { BASE_BATTLE_POWER } from './constants'
import {
  applySecondaryStatusesFromMove,
  getSecondaryStatusStatusPreventionMessage,
  getSecondaryStatusSwitchPreventionMessage,
} from './secondary-statuses'
import { resolveMoveContest, shouldFailMoveFromStance } from './move-contest'
import { resolveStance } from './turn-resolution'
import { resolveHiddenPower } from './hidden-power'
import { consumePokemonMoveUse, getPokemonMoveUsesRemaining } from './move-uses'
import { calculateAiStance } from './ai-logic'
import {
  applyMoveRuntimeEffects,
  checkMoveBattleCondition,
  getEffectiveMoveAccuracy,
  getConditionalDamageMultiplier,
  getMoveHealAmount,
  getMoveLockMessage,
  recordStatLoweredThisTurn,
  resolveCalledMove,
  resolveDamageRuleDamage,
  resolveDynamicMoveType,
} from './move-effects'
import {
  applyBattleAbilityOpponentStatStageBoostCopy,
  applyBattleAbilityStatStageDropReflection,
  applyBattleAbilityStatStageDropTriggers,
  applyBattleAbilityStatusReflection,
  blocksBattleMentalEffectByAbility,
  blocksBattleRecoilDamageByAbility,
  blocksBattleInterruptByAbility,
  blocksBattleStatStageDropByAbility,
  applyBattleAbilityOpposingMoveUseDepletion,
  getBattleAbilityRecoilMoveDamageMultiplier,
  getBattleAbilityAddedEffectMoveDamageMultiplier,
  getBattleAbilityMoveInterruptChance,
  getBattleAbilitySecondaryEffectChance,
  getBattleSecondaryEffectBlockMessage,
  getBattleRecoilDamageBlockMessage,
  getBattleAbilitySwitchPreventionMessage,
  getBattleMentalEffectBlockMessage,
  getBattleStatStageDropBlockMessage,
  suppressesBattleCounterPreventionByAbility,
  suppressesBattleMoveAddedEffectsByAbility,
  usesBattleAbilityMaxMultiHitDamage,
} from './abilities'

export type EnemyAiEffectiveness =
  | 'immune'
  | 'not-very-effective'
  | 'neutral'
  | 'super-effective'

export interface EnemyAiMoveChoice {
  move: MoveConfig
  stance: BattleStance
  attackType?: string
  basePower: number
  hitCount?: number
  fixedDamage?: number
  typeEffectivenessOverride?: number
  critChance?: number
  ignoreDefenderStatStages?: boolean
  damageStatSource?: 'user' | 'target'
  effectOnly?: boolean
  score?: number
  calledByMetronome?: boolean
  ignoresStancePacing?: boolean
}

export function resolveEnemyAiMoveAccuracy(params: {
  state?: BattleState
  enemyMon: BattlePokemon
  defender?: BattlePokemon
  enemyAiMove: EnemyAiMoveChoice
  weather?: WeatherType
  random?: () => number
}): { missed: boolean; accuracy: number } {
  const random = params.random ?? Math.random
  const accuracy = getEffectiveMoveAccuracy({
    move: params.enemyAiMove.move,
    state: params.state,
    attacker: params.enemyMon,
    defender: params.defender,
    attackerSide: 'enemy',
    weather: params.weather,
  })

  return {
    accuracy,
    missed: accuracy < 100 && random() * 100 > accuracy,
  }
}

export type EnemyBattleAction =
  | {
      kind: 'stance'
      stance: BattleStance
      score: number
    }
  | {
      kind: 'move'
      move: EnemyAiMoveChoice
      score: number
    }
  | {
      kind: 'item'
      itemId: string
      score: number
    }
  | {
      kind: 'switch'
      newIndex: number
      score: number
    }

interface AiProfileConfig {
  randomness: number
  resourcePenalty: number
  switchThreshold: number
  itemThreshold: number
  moveMargin: number
  earlyMovePenalty: number
  earlyMovePenaltyTurns: number
  repeatMovePenalty: number
  repeatEffectPenalty: number
}

const AI_PROFILE_CONFIG: Record<BattleAiProfileId, AiProfileConfig> = {
  wild: {
    randomness: 0.24,
    resourcePenalty: 18,
    switchThreshold: 1000,
    itemThreshold: 22,
    moveMargin: 16,
    earlyMovePenalty: 10,
    earlyMovePenaltyTurns: 2,
    repeatMovePenalty: 18,
    repeatEffectPenalty: 24,
  },
  trainer: {
    randomness: 0.14,
    resourcePenalty: 12,
    switchThreshold: 18,
    itemThreshold: 16,
    moveMargin: 10,
    earlyMovePenalty: 6,
    earlyMovePenaltyTurns: 1,
    repeatMovePenalty: 18,
    repeatEffectPenalty: 24,
  },
  advanced: {
    randomness: 0.08,
    resourcePenalty: 8,
    switchThreshold: 12,
    itemThreshold: 12,
    moveMargin: 6,
    earlyMovePenalty: 3,
    earlyMovePenaltyTurns: 1,
    repeatMovePenalty: 16,
    repeatEffectPenalty: 22,
  },
  boss: {
    randomness: 0.03,
    resourcePenalty: 4,
    switchThreshold: 7,
    itemThreshold: 8,
    moveMargin: 3,
    earlyMovePenalty: 0,
    earlyMovePenaltyTurns: 0,
    repeatMovePenalty: 12,
    repeatEffectPenalty: 18,
  },
}

const STATUS_SCORE: Record<string, number> = {
  sleep: 44,
  freeze: 42,
  paralysis: 32,
  burn: 30,
  frostbite: 30,
  'bad-poison': 36,
  poison: 26,
  confusion: 24,
  regen: 20,
  veil: 16,
  'mystic-veil': 26,
  victory: 18,
  vanished: 24,
}

function getProfileConfig(
  profile: BattleAiProfileId | undefined,
): AiProfileConfig {
  return AI_PROFILE_CONFIG[profile ?? 'trainer']
}

export function resolveBattleAiProfile(
  battleConfig: Pick<
    import('@/data/types').BattleConfig,
    | 'aiProfile'
    | 'isWildBattle'
    | 'trainerClassId'
    | 'title'
    | 'dynamicOpponent'
  >,
): BattleAiProfileId {
  if (battleConfig.aiProfile) return battleConfig.aiProfile
  if (battleConfig.isWildBattle) return 'wild'
  if (
    battleConfig.dynamicOpponent === 'rival' ||
    battleConfig.trainerClassId === 'gym-leader' ||
    battleConfig.title
  ) {
    return 'boss'
  }
  return 'trainer'
}

function randomizeScore(
  score: number,
  profile: BattleAiProfileId,
  random: () => number,
): number {
  const randomness = getProfileConfig(profile).randomness
  if (randomness <= 0) return score
  const factor = 1 + (random() * 2 - 1) * randomness
  return score * factor
}

function clampStage(stage: number | undefined, max = 6): number {
  return Math.max(-6, Math.min(max, stage ?? 0))
}

function hpPercent(pokemon: BattlePokemon): number {
  if (pokemon.maxHp <= 0) return 0
  return pokemon.currentHp / pokemon.maxHp
}

function expectedDamageMultiplier(
  move: MoveConfig,
  defenderTypes: string[] | undefined,
  weather?: WeatherType,
): number {
  let baseMultiplier = move.damage
  if (move.damageRange) {
    baseMultiplier = (move.damageRange.min + move.damageRange.max) / 2
  }

  if (move.damageByDefenderType && defenderTypes?.length) {
    const normalizedDefenderTypes = defenderTypes.map((type) =>
      type.toLowerCase(),
    )
    for (const [type, damage] of Object.entries(move.damageByDefenderType)) {
      if (normalizedDefenderTypes.includes(type.toLowerCase())) {
        baseMultiplier = damage
        break
      }
    }
  }

  const weatherMultiplier = move.weatherDamageMultiplier
  if (
    weatherMultiplier &&
    weather &&
    weather !== 'clear' &&
    (!weatherMultiplier.weather?.length ||
      weatherMultiplier.weather.includes(weather))
  ) {
    return baseMultiplier * weatherMultiplier.multiplier
  }

  return baseMultiplier
}

function getMoveAttackTypes(
  move: MoveConfig,
  attacker: BattlePokemon,
  weather?: WeatherType,
): string[] {
  if (move.id === 'hidden-power')
    return [resolveHiddenPower(attacker).attackType]
  if (move.forcedType === 'random') return POKEMON_TYPES
  const fallbackType =
    move.forcedType || attacker.types?.[0]?.toLowerCase() || 'normal'
  return [
    resolveDynamicMoveType({
      move,
      attacker,
      weather,
      fallbackType,
    }),
  ]
}

function chooseMoveAttackType(params: {
  move: MoveConfig
  attacker: BattlePokemon
  defender: BattlePokemon
  random: () => number
  weather?: WeatherType
}): string {
  const { move, attacker, defender, random, weather } = params
  if (move.id === 'hidden-power') return resolveHiddenPower(attacker).attackType
  if (move.forcedType === 'random') return getRandomMoveType()
  const fallback = attacker.types?.[0]?.toLowerCase() || 'normal'
  const attackType = resolveDynamicMoveType({
    move,
    attacker,
    weather,
    fallbackType: move.forcedType || fallback,
  })
  if (getWeatherAttackMultiplier(attackType, weather) !== 0) return attackType

  const alternatives = attacker.types
    ?.map((type) => type.toLowerCase())
    .filter((type) => getWeatherAttackMultiplier(type, weather) !== 0)
  if (alternatives?.length)
    return alternatives[Math.floor(random() * alternatives.length)]

  return getBestAttackTypeForDamage({
    move,
    attacker,
    defender,
    weather,
  }).attackType
}

function getBestAttackTypeForDamage(params: {
  move?: MoveConfig
  attacker: BattlePokemon
  defender: BattlePokemon
  weather?: WeatherType
}): {
  attackType: string
  typeEffectiveness: number
  weatherMultiplier: number
} {
  const { move, attacker, defender, weather } = params
  const attackTypes = move
    ? getMoveAttackTypes(move, attacker, weather)
    : attacker.types?.length
      ? attacker.types.map((type) => type.toLowerCase())
      : ['normal']

  let best = {
    attackType: attackTypes[0] || 'normal',
    typeEffectiveness: -1,
    weatherMultiplier: 1,
  }

  for (const attackType of attackTypes) {
    const typeEffectiveness = move?.ignoreTypeEffectiveness
      ? 1
      : getWeatherTypeEffectiveness(attackType, defender, weather)
    const weatherMultiplier = getWeatherAttackMultiplier(attackType, weather)
    const score = typeEffectiveness * weatherMultiplier
    const bestScore = best.typeEffectiveness * best.weatherMultiplier
    if (score > bestScore) {
      best = { attackType, typeEffectiveness, weatherMultiplier }
    }
  }

  return best
}

function enemyMoveWouldHaveNoEffect(params: {
  move: MoveConfig
  attackType: string
  defender: BattlePokemon
  weather?: WeatherType
}): boolean {
  if (params.move.damage <= 0 || params.move.ignoreTypeEffectiveness)
    return false

  if (params.move.id === 'hidden-power') {
    return (
      getWeatherTypeEffectiveness(
        params.attackType,
        params.defender,
        params.weather,
      ) === 0 ||
      getWeatherAttackMultiplier(params.attackType, params.weather) === 0
    )
  }

  if (params.move.forcedType === 'random') {
    return !POKEMON_TYPES.some((type) => {
      if (
        getWeatherTypeEffectiveness(type, params.defender, params.weather) === 0
      ) {
        return false
      }
      return getWeatherAttackMultiplier(type, params.weather) !== 0
    })
  }

  return (
    getWeatherTypeEffectiveness(
      params.attackType,
      params.defender,
      params.weather,
    ) === 0 ||
    getWeatherAttackMultiplier(params.attackType, params.weather) === 0
  )
}

function isEffectOnlyEnemyAiMove(move: MoveConfig): boolean {
  return (
    move.target === 'self' ||
    (move.damage <= 0 && !move.damageRule && !move.delayedDamage) ||
    Boolean(move.heal)
  )
}

function moveCanApplyEnemySleep(move: MoveConfig): boolean {
  const moveStatusTarget = move.status?.target ?? move.target
  if (move.status?.id === 'sleep' && moveStatusTarget === 'enemy') return true

  if (
    move.additionalStatuses?.some((status) => {
      const target = status.target ?? move.target
      return status.id === 'sleep' && target === 'enemy'
    })
  ) {
    return true
  }

  return Boolean(
    move.randomStatuses?.options.some(
      (status) =>
        status.id === 'sleep' &&
        (status.target === undefined || status.target === 'enemy'),
    ),
  )
}

function getEnemyActiveTurn(
  state: BattleState | undefined,
  self: BattlePokemon,
): number {
  if (!state) return 1
  const started = self.activeTurnStarted ?? 1
  return Math.max(1, state.turn - started + 1)
}

function getExistingSecondaryStatusTurns(params: {
  state?: BattleState
  pokemon?: BattlePokemon
  targetSide?: 'player' | 'enemy'
  id: string
  target: 'pokemon' | 'side' | 'field'
}): number | undefined {
  const { state, pokemon, targetSide, id, target } = params
  if (target === 'pokemon') {
    return pokemon?.secondaryStatuses?.find(
      (status) => status.id === id && status.target === 'pokemon',
    )?.remainingTurns
  }

  const existing = state?.secondaryStatuses?.find(
    (status) =>
      status.id === id &&
      status.target === target &&
      (target !== 'side' || status.targetSide === targetSide),
  )
  return existing?.remainingTurns
}

type EnemyAiSecondaryStatusConfig = NonNullable<
  MoveConfig['secondaryStatuses']
>[number]

function secondaryStatusTargets(
  config: EnemyAiSecondaryStatusConfig,
  params: {
    state?: BattleState
    self: BattlePokemon
    opponent: BattlePokemon
  },
): Array<{
  pokemon?: BattlePokemon
  targetSide?: 'player' | 'enemy'
  target: 'pokemon' | 'side' | 'field'
}> {
  switch (config.target) {
    case 'self-pokemon':
      return [{ pokemon: params.self, target: 'pokemon' }]
    case 'enemy-pokemon':
      return [{ pokemon: params.opponent, target: 'pokemon' }]
    case 'both-pokemon':
      return [
        { pokemon: params.self, target: 'pokemon' },
        { pokemon: params.opponent, target: 'pokemon' },
      ]
    case 'self-side':
      return [{ targetSide: 'enemy', target: 'side' }]
    case 'enemy-side':
      return [{ targetSide: 'player', target: 'side' }]
    case 'both-sides':
      return [
        { targetSide: 'enemy', target: 'side' },
        { targetSide: 'player', target: 'side' },
      ]
    case 'field':
      return [{ target: 'field' }]
    default:
      return []
  }
}

function getSecondaryStatusRefreshMultiplier(params: {
  state?: BattleState
  self: BattlePokemon
  opponent: BattlePokemon
  config: EnemyAiSecondaryStatusConfig
}): number {
  const targets = secondaryStatusTargets(params.config, params)
  if (!targets.length) return 1

  let hasMissingTarget = false
  let hasExpiringTarget = false
  for (const target of targets) {
    const remainingTurns = getExistingSecondaryStatusTurns({
      state: params.state,
      pokemon: target.pokemon,
      targetSide: target.targetSide,
      id: params.config.id,
      target: target.target,
    })
    if (remainingTurns === undefined) {
      hasMissingTarget = true
    } else if (remainingTurns <= 1) {
      hasExpiringTarget = true
    }
  }

  if (hasMissingTarget) return 1
  if (hasExpiringTarget) return 0.25
  return 0
}

function statForStance(
  pokemon: BattlePokemon,
  stance: BattleStance,
  attacking: boolean,
): number {
  const stages = pokemon.statStages || DEFAULT_STAT_STAGES
  if (stance === 'power') {
    const stat = attacking ? 'attack' : 'defense'
    return Math.floor(
      (pokemon.stats?.[stat] || 0) * getStatStageMultiplier(stages[stat]),
    )
  }
  if (stance === 'speed') {
    return Math.floor(
      (pokemon.stats?.speed || 0) * getStatStageMultiplier(stages.speed),
    )
  }
  const stat = attacking ? 'specialAttack' : 'specialDefense'
  return Math.floor(
    (pokemon.stats?.[stat] || 0) * getStatStageMultiplier(stages[stat]),
  )
}

function estimateDamageScore(params: {
  attacker: BattlePokemon
  defender: BattlePokemon
  stance: BattleStance
  damageMultiplier: number
  attackType?: string
  move?: MoveConfig
  stanceMultiplier?: number
  weather?: WeatherType
}): number {
  const {
    attacker,
    defender,
    stance,
    damageMultiplier,
    attackType,
    move,
    stanceMultiplier = 1,
    weather,
  } = params
  if (damageMultiplier <= 0) return 0

  const attackStat = Math.max(1, statForStance(attacker, stance, true))
  const defenseStat = Math.max(1, statForStance(defender, stance, false))
  const typeInfo = attackType
    ? {
        attackType,
        typeEffectiveness: move?.ignoreTypeEffectiveness
          ? 1
          : getWeatherTypeEffectiveness(attackType, defender, weather),
        weatherMultiplier: getWeatherAttackMultiplier(attackType, weather),
      }
    : getBestAttackTypeForDamage({ move, attacker, defender, weather })

  if (typeInfo.typeEffectiveness === 0 || typeInfo.weatherMultiplier === 0)
    return 0

  const levelFactor = ((2 * (attacker.level || 1)) / 5 + 2) / 50
  let score =
    (levelFactor *
      BASE_BATTLE_POWER *
      damageMultiplier *
      (attackStat / defenseStat) +
      2) *
    stanceMultiplier *
    typeInfo.typeEffectiveness *
    typeInfo.weatherMultiplier

  const effectiveAttackerTypes = getEffectiveBattleTypes(attacker).map((type) =>
    type.toLowerCase(),
  )
  const usedType = attackType || typeInfo.attackType
  if (usedType && !effectiveAttackerTypes.includes(usedType.toLowerCase())) {
    score *= 0.85
  }

  if (attacker.status?.id === 'burn' && stance === 'power') score *= 0.5
  if (attacker.status?.id === 'frostbite' && stance === 'tech') score *= 0.5
  if (attacker.status?.id === 'paralysis' && stance === 'speed') score *= 0.5

  return Math.max(0, score)
}

function getBestStanceScore(params: {
  self: BattlePokemon
  opponent: BattlePokemon
  playerStance?: BattleStance
  weather?: WeatherType
}): number {
  return Math.max(
    ...(['power', 'speed', 'tech'] as BattleStance[]).map((stance) =>
      scoreStance({
        self: params.self,
        opponent: params.opponent,
        stance,
        playerStance: params.playerStance,
        weather: params.weather,
      }),
    ),
  )
}

function estimateIncomingPlayerDamage(params: {
  self: BattlePokemon
  opponent: BattlePokemon
  playerStance?: BattleStance
  weather?: WeatherType
}): number {
  const stance = params.playerStance ?? 'power'
  const bestType = getBestAttackTypeForDamage({
    attacker: params.opponent,
    defender: params.self,
    weather: params.weather,
  })
  return estimateDamageScore({
    attacker: params.opponent,
    defender: params.self,
    stance,
    damageMultiplier: 1,
    attackType: bestType.attackType,
    stanceMultiplier: 1,
    weather: params.weather,
  })
}

function isDefensiveProtectionMove(move: MoveConfig): boolean {
  return Boolean(
    move.secondaryStatuses?.some(
      (status) =>
        (status.target === 'self-pokemon' || status.target === 'self-side') &&
        status.effects.some((effect) => effect.type === 'damage-reduction'),
    ),
  )
}

function calledMoveScore(params: {
  move: MoveConfig
  state?: BattleState
  self: BattlePokemon
  opponent: BattlePokemon
  profile?: BattleAiProfileId
  weather?: WeatherType
  forLoadout: boolean
  random?: () => number
}):
  | {
      score: number
      stance: BattleStance
      attackType: string
      effectOnly: boolean
    }
  | undefined {
  const fallbackType = params.self.types?.[0]?.toLowerCase() || 'normal'
  if (params.forLoadout) {
    return {
      score: 30,
      stance: 'tech',
      attackType: fallbackType,
      effectOnly: false,
    }
  }

  const called = resolveCalledMove({
    move: params.move,
    state: params.state,
    side: 'enemy',
    attacker: params.self,
    random: params.random,
  })
  if (called.failed) return undefined

  const resolved = called.move
  const stance: BattleStance =
    resolved.stance === 'random' ? 'speed' : resolved.stance
  const effectOnly = isEffectOnlyEnemyAiMove(resolved)
  const attackType = getBestAttackTypeForDamage({
    move: resolved,
    attacker: params.self,
    defender: params.opponent,
    weather: params.weather,
  }).attackType
  const damageMultiplier = effectOnly
    ? 0
    : expectedDamageMultiplier(
        resolved,
        getEffectiveBattleTypes(params.opponent),
        params.weather,
      ) * getBattleAbilityRecoilMoveDamageMultiplier(params.self, resolved)
  const score = effectOnly
    ? 18
    : estimateDamageScore({
        attacker: params.self,
        defender: params.opponent,
        stance,
        damageMultiplier,
        attackType,
        move: resolved,
        weather: params.weather,
      })

  return {
    score: score - getProfileConfig(params.profile).resourcePenalty,
    stance,
    attackType,
    effectOnly,
  }
}

function scoreStatusApplication(params: {
  statusId: string
  chance?: number
  target: BattlePokemon
  selfTarget?: boolean
  weather?: WeatherType
}): number {
  const { statusId, chance, target, selfTarget, weather } = params
  const config = STATUS_EFFECTS[statusId]
  if (!config) return 0

  if (!selfTarget && !canApplyStatus(target, statusId as any, weather)) return 0
  if (selfTarget && target.status) return 0

  const base = STATUS_SCORE[statusId] ?? 14
  return base * ((chance ?? 100) / 100)
}

function scoreBuffs(
  move: MoveConfig,
  self: BattlePokemon,
  opponent: BattlePokemon,
): number {
  let score = 0
  for (const buff of move.buffs || []) {
    const target = (buff.target ?? 'self') === 'self' ? self : opponent
    const current = clampStage(
      target.statStages?.[buff.stat],
      buff.stat === 'crit' ? 3 : 6,
    )
    const max = buff.stat === 'crit' ? 3 : 6
    const usefulStages =
      buff.stages > 0
        ? Math.max(0, Math.min(max, current + buff.stages) - current)
        : Math.abs(buff.stages)
    const sign = (buff.target ?? 'self') === 'self' ? 1 : -1
    score += sign * usefulStages * 10 * ((buff.chance ?? 100) / 100)
  }

  for (const debuff of move.debuffs || []) {
    const target = (debuff.target ?? 'enemy') === 'enemy' ? opponent : self
    const current = clampStage(
      target.statStages?.[debuff.stat],
      debuff.stat === 'crit' ? 3 : 6,
    )
    const usefulStages =
      debuff.stages < 0
        ? Math.max(0, current - Math.max(-6, current + debuff.stages))
        : debuff.stages
    const sign = (debuff.target ?? 'enemy') === 'enemy' ? 1 : -1
    score += sign * usefulStages * 10 * ((debuff.chance ?? 100) / 100)
  }

  return score
}

function scoreSecondaryStatuses(params: {
  move: MoveConfig
  self: BattlePokemon
  opponent: BattlePokemon
  state?: BattleState
  playerStance?: BattleStance
  weather?: WeatherType
}): number {
  const { move, self, opponent, state } = params
  let score = 0
  for (const status of move.secondaryStatuses || []) {
    const refreshMultiplier = getSecondaryStatusRefreshMultiplier({
      state,
      self,
      opponent,
      config: status,
    })
    if (refreshMultiplier <= 0) continue

    let statusScore = 0
    for (const effect of status.effects) {
      if (effect.type === 'damage')
        statusScore +=
          (effect.percentMaxHp ?? 0) * 1.2 + (effect.flatDamage ?? 0) * 0.7
      if (effect.type === 'absorb')
        statusScore +=
          (effect.percentMaxHp ?? 0) * 1.6 + (effect.flatDamage ?? 0) * 0.9
      if (effect.type === 'apply-status')
        statusScore += STATUS_SCORE[effect.statusId] ?? 14
      if (effect.type === 'stat') statusScore += Math.abs(effect.stages) * 9
      if (effect.type === 'damage-reduction')
        statusScore += Math.max(0, effect.percent) * 0.4
      if (effect.type === 'damage-modifier')
        statusScore += Math.max(-20, effect.percent) * 0.4
      if (effect.type === 'infatuation')
        statusScore += 18 * ((effect.chance ?? 50) / 50)
      if (effect.type === 'switch-prevention') statusScore += 10
    }
    if (status.target.startsWith('self')) statusScore *= 0.85
    if (status.target.startsWith('enemy')) statusScore *= 1
    if (status.target.startsWith('both')) statusScore *= 0.35
    if (isDefensiveProtectionMove(move)) {
      const incomingDamage = estimateIncomingPlayerDamage({
        self,
        opponent,
        playerStance: params.playerStance,
        weather: params.weather,
      })
      const highDamage =
        incomingDamage >= self.maxHp * 0.25 || incomingDamage >= self.currentHp
      statusScore = highDamage
        ? Math.max(statusScore, incomingDamage * 0.8)
        : Math.min(statusScore, 4)
    }
    score += statusScore * ((status.chance ?? 100) / 100) * refreshMultiplier
  }
  return score
}

function scoreMove(params: {
  move: MoveConfig
  self: BattlePokemon
  opponent: BattlePokemon
  state?: BattleState
  playerStance?: BattleStance
  profile?: BattleAiProfileId
  weather?: WeatherType
  forLoadout?: boolean
}): {
  score: number
  stance: BattleStance
  attackType: string
  effectOnly: boolean
} {
  const {
    move,
    self,
    opponent,
    state,
    playerStance,
    profile,
    weather,
    forLoadout = false,
  } = params
  if (
    !forLoadout &&
    opponent.status?.id === 'sleep' &&
    moveCanApplyEnemySleep(move)
  ) {
    return {
      score: Number.NEGATIVE_INFINITY,
      stance: move.stance === 'random' ? 'speed' : move.stance,
      attackType: self.types?.[0]?.toLowerCase() || 'normal',
      effectOnly: true,
    }
  }

  const battleConditionFailed = checkMoveBattleCondition({
    move,
    state,
    side: 'enemy',
    attacker: self,
    defender: opponent,
  })
  if (battleConditionFailed && !forLoadout) {
    return {
      score: Number.NEGATIVE_INFINITY,
      stance: move.stance === 'random' ? 'speed' : move.stance,
      attackType: self.types?.[0]?.toLowerCase() || 'normal',
      effectOnly: true,
    }
  }

  if (move.calledMove) {
    const called = calledMoveScore({
      move,
      state,
      self,
      opponent,
      profile,
      weather,
      forLoadout,
    })
    return (
      called ?? {
        score: Number.NEGATIVE_INFINITY,
        stance: 'tech',
        attackType: self.types?.[0]?.toLowerCase() || 'normal',
        effectOnly: false,
      }
    )
  }

  const stance: BattleStance = move.stance === 'random' ? 'speed' : move.stance
  const effectOnly = isEffectOnlyEnemyAiMove(move)

  if (getDisabledStanceMessage(self, stance)) {
    return { score: -Infinity, stance, attackType: 'normal', effectOnly }
  }

  const bestType = getBestAttackTypeForDamage({
    move,
    attacker: self,
    defender: opponent,
    weather,
  })
  const attackType = bestType.attackType
  if (
    !effectOnly &&
    enemyMoveWouldHaveNoEffect({
      move,
      attackType,
      defender: opponent,
      weather,
    })
  ) {
    return { score: -Infinity, stance, attackType, effectOnly }
  }

  let score = 0

  if (!effectOnly && (move.damage > 0 || move.damageRule)) {
    const stanceResult = playerStance
      ? resolveStance(stance, playerStance)
      : undefined
    const contest = resolveMoveContest({
      move,
      attacker: self,
      defender: opponent,
      attackType,
    })
    const stanceOutcome = contest.configured
      ? contest.result
      : (stanceResult?.result ?? 'tie')
    const failsFromStance = shouldFailMoveFromStance({
      failOnStance: move.failOnStance,
      result: stanceOutcome,
    })

    if (contest.failMove || failsFromStance) {
      return { score: -Infinity, stance, attackType, effectOnly }
    }

    const moveMultiplier = move.damageRule
      ? 1
      : expectedDamageMultiplier(
          move,
          getEffectiveBattleTypes(opponent),
          weather,
        )
    const stanceMultiplier = contest.configured
      ? (contest.damageMultiplier ?? 1)
      : (stanceResult?.damageMultiplier ?? 1)
    score += estimateDamageScore({
      attacker: self,
      defender: opponent,
      stance,
      damageMultiplier: moveMultiplier,
      attackType,
      move,
      stanceMultiplier,
      weather,
    })

    if (
      !suppressesBattleCounterPreventionByAbility(self) &&
      (contest.preventCounter ||
        (move.preventCounterOnStanceWin && stanceOutcome === 'win'))
    ) {
      score += 18
    }
  }

  if (move.heal) {
    const missingHp = Math.max(0, self.maxHp - self.currentHp)
    score += move.healFull
      ? missingHp * 0.9
      : Math.min(missingHp, self.maxHp * 0.5) * 0.9
  }

  if (move.absorb && move.damage > 0) {
    score +=
      Math.min(self.maxHp - self.currentHp, score * (move.absorb / 100)) * 0.9
  }

  if (move.status) {
    const target = move.status.target ?? move.target
    score +=
      scoreStatusApplication({
        statusId: move.status.id,
        chance: move.status.chance,
        target: target === 'self' ? self : opponent,
        selfTarget: target === 'self',
        weather,
      }) * (target === 'self' ? 0.6 : 1)
  }

  for (const status of move.additionalStatuses || []) {
    const target = status.target ?? move.target
    score +=
      scoreStatusApplication({
        statusId: status.id,
        chance: status.chance,
        target: target === 'self' ? self : opponent,
        selfTarget: target === 'self',
        weather,
      }) * (target === 'self' ? 0.6 : 1)
  }

  if (move.randomStatuses?.options.length) {
    const averageStatus =
      move.randomStatuses.options.reduce((sum, status) => {
        return sum + (STATUS_SCORE[status.id] ?? 10) * (status.chance ?? 1)
      }, 0) /
      move.randomStatuses.options.reduce(
        (sum, status) => sum + (status.chance ?? 1),
        0,
      )
    score += averageStatus * (move.randomStatuses.chance / 100) * 0.6
  }

  score += scoreBuffs(move, self, opponent)
  score += scoreSecondaryStatuses({
    move,
    self,
    opponent,
    state,
    playerStance,
    weather,
  })

  if (move.itemUseEffect)
    score += move.itemUseEffect.type === 'remove-enemy' ? 20 : 12
  if (move.heldItemEffect) {
    const selfHasItem = Boolean(self.heldItem || self.heldItemId)
    const opponentHasItem = Boolean(opponent.heldItem || opponent.heldItemId)
    if (
      move.heldItemEffect.type === 'bestow' &&
      selfHasItem &&
      !opponentHasItem
    )
      score += 12
    if (move.heldItemEffect.type === 'remove-target' && opponentHasItem)
      score += 18
    if (
      move.heldItemEffect.type === 'steal-target' &&
      opponentHasItem &&
      !selfHasItem
    )
      score += 20
    if (move.heldItemEffect.type === 'swap' && (selfHasItem || opponentHasItem))
      score += 14
    if (
      move.heldItemEffect.type === 'recycle' &&
      !selfHasItem &&
      self.consumedHeldItems?.length
    )
      score += 16
  }
  if (move.nextDamageModifier)
    score += Math.max(-20, move.nextDamageModifier.percent) * 0.3
  if (move.statusCure && self.status) score += 18
  if (move.partyRevive) score += 30
  if (move.switchEffect) score += 14

  if (move.disableStance) {
    score += 16
  }

  if (move.selfDamage && !blocksBattleRecoilDamageByAbility(self, move)) {
    const selfDamageChance = (move.selfDamage.chance ?? 100) / 100
    const fraction = move.selfDamage.fraction ?? 1
    score -= Math.max(1, self.maxHp / Math.max(1, fraction)) * selfDamageChance
  }

  const accuracy = move.alwaysHits
    ? 1
    : getEffectiveMoveAccuracy({
        move,
        state,
        attacker: self,
        defender: opponent,
        attackerSide: 'enemy',
        weather,
      }) / 100
  score *= Math.max(0, Math.min(1, accuracy))

  if (move.charged && move.charged > 0) {
    score /= Math.max(2, move.charged + 1)
  }

  if (move.recharge && move.recharge > 0) {
    score /= Math.max(2, move.recharge + 1)
  }

  if (move.continuous && !forLoadout) {
    const averageTurns = (move.continuous.min + move.continuous.max) / 2
    score *=
      move.damage > 0 && move.accuracy >= 85
        ? Math.min(1.4, averageTurns / 2)
        : 0.75
  }

  if (!forLoadout) {
    const config = getProfileConfig(profile)
    const lastSuccessful = state?.moveHistory?.lastSuccessful?.enemy
    const didRepeatLastMove = Boolean(
      lastSuccessful &&
        lastSuccessful.pokemonId === self.id &&
        lastSuccessful.moveId === move.id,
    )
    if (isDefensiveProtectionMove(move) && didRepeatLastMove) {
      return { score: Number.NEGATIVE_INFINITY, stance, attackType, effectOnly }
    }
    if (didRepeatLastMove) {
      const repeatedEffectMove = Boolean(
        effectOnly ||
          move.heal ||
          move.status ||
          move.additionalStatuses?.length ||
          move.secondaryStatuses?.length,
      )
      score -= repeatedEffectMove
        ? config.repeatEffectPenalty
        : config.repeatMovePenalty
    }
    if (getEnemyActiveTurn(state, self) <= config.earlyMovePenaltyTurns) {
      score -= config.earlyMovePenalty
    }
    score -= config.resourcePenalty
  }

  return { score, stance, attackType, effectOnly }
}

export function selectBattleMoveLoadoutFromCandidates(params: {
  self: BattlePokemon
  opponents: BattlePokemon[]
  moveIds: string[]
  profile?: BattleAiProfileId
  maxMoves?: number
  weather?: WeatherType
}): string[] {
  const { self, moveIds, maxMoves = 4 } = params
  if (!moveIds.length || maxMoves <= 0) return []

  const candidates = Array.from(new Set(moveIds))
  const opponents = params.opponents.filter((pokemon) => pokemon.currentHp > 0)
  if (!opponents.length) return []

  const selected: string[] = []
  const selectedStances = new Set<BattleStance>()
  const selectedTypes = new Set<string>()
  const selectedRoles = new Set<string>()

  while (selected.length < maxMoves) {
    let best: {
      moveId: string
      score: number
      stance: BattleStance
      type: string
      role: string
    } | null = null

    for (const moveId of candidates) {
      if (selected.includes(moveId)) continue
      const move = getMove(moveId)
      if (!move) continue

      let totalScore = 0
      let bestStance: BattleStance =
        move.stance === 'random' ? 'speed' : move.stance
      let bestType = self.types?.[0]?.toLowerCase() || 'normal'

      for (const opponent of opponents) {
        const scored = scoreMove({
          move,
          self,
          opponent,
          profile: params.profile,
          weather: params.weather,
          forLoadout: true,
        })
        if (Number.isFinite(scored.score)) {
          totalScore += scored.score
          bestStance = scored.stance
          bestType = scored.attackType
        }
      }

      const role = move.heal
        ? 'heal'
        : move.status || move.additionalStatuses?.length
          ? 'status'
          : move.buffs?.length || move.debuffs?.length
            ? 'setup'
            : move.secondaryStatuses?.length
              ? 'field'
              : 'damage'

      if (selectedStances.has(bestStance)) totalScore -= 8
      if (selectedTypes.has(bestType)) totalScore -= 8
      if (selectedRoles.has(role)) totalScore -= 10

      if (!best || totalScore > best.score) {
        best = {
          moveId,
          score: totalScore,
          stance: bestStance,
          type: bestType,
          role,
        }
      }
    }

    if (!best || !Number.isFinite(best.score) || best.score <= 0) break
    selected.push(best.moveId)
    selectedStances.add(best.stance)
    selectedTypes.add(best.type)
    selectedRoles.add(best.role)
  }

  return selected
}

function isUncuratedOpponentStatusMove(move: MoveConfig): boolean {
  if (move.damage > 0 || move.damageRule || move.delayedDamage) return false

  const defaultTarget = move.target
  const statusTargetsOpponent =
    move.status && (move.status.target ?? defaultTarget) === 'enemy'
  const additionalStatusTargetsOpponent = move.additionalStatuses?.some(
    (status) => (status.target ?? defaultTarget) === 'enemy',
  )
  const debuffTargetsOpponent = move.debuffs?.some(
    (debuff) => (debuff.target ?? 'enemy') === 'enemy',
  )

  return Boolean(
    statusTargetsOpponent ||
      additionalStatusTargetsOpponent ||
      debuffTargetsOpponent,
  )
}

function generatedOpponentStatusMoveChance(
  profile: BattleAiProfileId | undefined,
  isWildBattle: boolean | undefined,
): number {
  if (isWildBattle || profile === 'wild') return 0

  switch (profile ?? 'trainer') {
    case 'trainer':
      return 20
    case 'advanced':
      return 45
    case 'boss':
      return 70
    default:
      return 0
  }
}

function scoreStance(params: {
  self: BattlePokemon
  opponent: BattlePokemon
  stance: BattleStance
  playerStance?: BattleStance
  weather?: WeatherType
}): number {
  const { self, opponent, stance, playerStance, weather } = params
  if (getDisabledStanceMessage(self, stance)) return -Infinity

  const stanceMultiplier = playerStance
    ? resolveStance(stance, playerStance).damageMultiplier
    : 1
  const bestType = getBestAttackTypeForDamage({
    attacker: self,
    defender: opponent,
    weather,
  })
  return estimateDamageScore({
    attacker: self,
    defender: opponent,
    stance,
    damageMultiplier: 1,
    attackType: bestType.attackType,
    stanceMultiplier,
    weather,
  })
}

export function getEffectivenessTier(value: number): EnemyAiEffectiveness {
  if (value === 0) return 'immune'
  if (value < 1) return 'not-very-effective'
  if (value > 1) return 'super-effective'
  return 'neutral'
}

export function canEnemyPokemonUseAiMove(
  pokemon: BattlePokemon,
  move: MoveConfig,
  options: {
    manualAssignment?: boolean
    isWildBattle?: boolean
    profile?: BattleAiProfileId
  } = {},
): boolean {
  if (options.isWildBattle && move.trainerOnly) return false
  if (move.manualOnly && !options.manualAssignment) return false

  const defaultTarget = move.target
  const statusTarget = move.status?.target ?? defaultTarget
  const debuffTargetsSelf = Boolean(
    move.debuffs?.some((debuff) => (debuff.target ?? 'enemy') === 'self'),
  )
  const debuffTargetsEnemy = Boolean(
    move.debuffs?.some((debuff) => (debuff.target ?? 'enemy') === 'enemy'),
  )
  const additionalStatusTargetsSelf = Boolean(
    move.additionalStatuses?.some(
      (status) => (status.target ?? defaultTarget) === 'self',
    ),
  )
  const additionalStatusTargetsEnemy = Boolean(
    move.additionalStatuses?.some(
      (status) => (status.target ?? defaultTarget) === 'enemy',
    ),
  )
  const hasEnemyEffect =
    (defaultTarget === 'enemy' ||
      statusTarget === 'enemy' ||
      additionalStatusTargetsEnemy ||
      debuffTargetsEnemy ||
      Boolean(move.secondaryStatuses?.length) ||
      Boolean(move.interruptEnemyMove) ||
      Boolean(move.calledMove) ||
      Boolean(move.damageRule) ||
      Boolean(move.itemUseEffect) ||
      Boolean(move.heldItemEffect) ||
      Boolean(move.nextDamageModifier) ||
      Boolean(move.statusCure) ||
      Boolean(move.partyRevive) ||
      Boolean(move.switchEffect) ||
      Boolean(move.disableStance)) &&
    (move.damage > 0 ||
      Boolean(move.calledMove) ||
      Boolean(move.damageRule) ||
      Boolean(move.itemUseEffect) ||
      Boolean(move.heldItemEffect) ||
      Boolean(move.nextDamageModifier) ||
      Boolean(move.statusCure) ||
      Boolean(move.partyRevive) ||
      Boolean(move.switchEffect) ||
      debuffTargetsEnemy ||
      (Boolean(move.status) && statusTarget === 'enemy') ||
      Boolean(move.disableStance) ||
      Boolean(move.interruptEnemyMove) ||
      Boolean(move.secondaryStatuses?.length) ||
      additionalStatusTargetsEnemy)
  const hasSelfEffect =
    (defaultTarget === 'self' ||
      statusTarget === 'self' ||
      additionalStatusTargetsSelf ||
      debuffTargetsSelf ||
      Boolean(move.secondaryStatuses?.length) ||
      Boolean(move.selfDamage)) &&
    (Boolean(move.buffs?.length) ||
      move.heal ||
      Boolean(move.status) ||
      additionalStatusTargetsSelf ||
      debuffTargetsSelf ||
      Boolean(move.secondaryStatuses?.length) ||
      Boolean(move.selfDamage))

  if (!hasEnemyEffect && !hasSelfEffect) return false

  const canIgnoreFormGate =
    !options.manualAssignment &&
    move.id === 'hidden-power' &&
    (options.profile === 'advanced' || options.profile === 'boss')

  if (!options.manualAssignment && !canIgnoreFormGate) {
    if (!(move.formId?.includes(pokemon.formId) ?? false)) return false
  }

  if (
    !options.manualAssignment &&
    move.level &&
    (pokemon.level || 1) < move.level
  ) {
    return false
  }

  return true
}

export function getEnemyAiMoveIds(
  enemyMon: BattlePokemon,
  params: {
    isWildBattle?: boolean
    profile?: BattleAiProfileId
  } = {},
): string[] {
  const seen = new Set<string>()
  const moveIds: string[] = []
  const manualMoveIds = enemyMon.aiMoves ?? []

  for (const moveId of manualMoveIds) {
    if (seen.has(moveId)) continue
    const move = getMove(moveId)
    if (!move) continue
    if (getMoveLockMessage(enemyMon, move.id)) continue
    if (
      !canEnemyPokemonUseAiMove(enemyMon, move, {
        manualAssignment: true,
        isWildBattle: params.isWildBattle,
        profile: params.profile,
      })
    ) {
      continue
    }
    seen.add(moveId)
    moveIds.push(moveId)
  }

  for (const move of Object.values(MOVES)) {
    const moveId = move.id
    if (seen.has(moveId)) continue
    if (
      !canEnemyPokemonUseAiMove(enemyMon, move, {
        isWildBattle: params.isWildBattle,
        profile: params.profile,
      })
    ) {
      continue
    }
    seen.add(moveId)
    moveIds.push(moveId)
  }

  return moveIds
}

export function selectEnemyAiMoveLoadout(params: {
  enemyMon: BattlePokemon
  playerTeam: BattlePokemon[]
  profile?: BattleAiProfileId
  isWildBattle?: boolean
  maxMoves?: number
  random?: () => number
  weather?: WeatherType
}): string[] {
  const { enemyMon, playerTeam, isWildBattle, maxMoves = 4 } = params
  const random = params.random ?? Math.random
  const candidates = getEnemyAiMoveIds(enemyMon, {
    isWildBattle,
    profile: params.profile,
  })
  if (!candidates.length || maxMoves <= 0) return []

  const selected = candidates
    .filter((moveId) => enemyMon.aiMoves?.includes(moveId))
    .slice(0, maxMoves)
  const selectedStances = new Set<BattleStance>()
  const selectedTypes = new Set<string>()
  const selectedRoles = new Set<string>()

  while (selected.length < maxMoves) {
    let best: {
      moveId: string
      score: number
      stance: BattleStance
      type: string
      role: string
    } | null = null

    for (const moveId of candidates) {
      if (selected.includes(moveId)) continue
      const move = getMove(moveId)
      if (!move) continue
      // Broad TM compatibility is useful for player move assignment, but it
      // should not make every compatible Pokemon an automatic Toxic/Hypnosis
      // user. Lower-tier AI excludes these moves and higher tiers add at most
      // one only at a reduced profile-based chance.
      if (
        !move.aiUse &&
        !enemyMon.aiMoves?.includes(moveId) &&
        isUncuratedOpponentStatusMove(move)
      ) {
        const alreadyHasGeneratedStatusMove = selected.some((selectedMoveId) => {
          const selectedMove = getMove(selectedMoveId)
          return selectedMove && isUncuratedOpponentStatusMove(selectedMove)
        })
        if (
          alreadyHasGeneratedStatusMove ||
          random() * 100 >=
            generatedOpponentStatusMoveChance(params.profile, isWildBattle)
        ) {
          continue
        }
      }

      let totalScore = 0
      let bestStance: BattleStance =
        move.stance === 'random' ? 'speed' : move.stance
      let bestType = enemyMon.types?.[0]?.toLowerCase() || 'normal'

      for (const opponent of playerTeam.filter(
        (pokemon) => pokemon.currentHp > 0,
      )) {
        const scored = scoreMove({
          move,
          self: enemyMon,
          opponent,
          profile: params.profile,
          weather: params.weather,
          forLoadout: true,
        })
        if (Number.isFinite(scored.score)) {
          totalScore += scored.score
          bestStance = scored.stance
          bestType = scored.attackType
        }
      }

      const role = move.heal
        ? 'heal'
        : move.status || move.additionalStatuses?.length
          ? 'status'
          : move.buffs?.length || move.debuffs?.length
            ? 'setup'
            : move.secondaryStatuses?.length
              ? 'field'
              : 'damage'

      if (selectedStances.has(bestStance)) totalScore -= 8
      if (selectedTypes.has(bestType)) totalScore -= 8
      if (selectedRoles.has(role)) totalScore -= 10
      if (enemyMon.aiMoves?.includes(moveId)) totalScore += 12

      if (!best || totalScore > best.score) {
        best = {
          moveId,
          score: totalScore,
          stance: bestStance,
          type: bestType,
          role,
        }
      }
    }

    if (!best || !Number.isFinite(best.score) || best.score <= 0) break
    selected.push(best.moveId)
    selectedStances.add(best.stance)
    selectedTypes.add(best.type)
    selectedRoles.add(best.role)
  }

  return selected
}

export function initializeEnemyAiMoveLoadouts(params: {
  state: BattleState
  profile?: BattleAiProfileId
  random?: () => number
}): void {
  const profile = params.profile ?? params.state.ai?.profile ?? 'trainer'
  for (const enemyMon of params.state.enemyTeam) {
    enemyMon.aiMoveLoadout = selectEnemyAiMoveLoadout({
      enemyMon,
      playerTeam: params.state.playerTeam,
      profile,
      isWildBattle: params.state.isWildBattle,
      random: params.random,
      weather: params.state.weather?.weather,
    })
  }
}

export function buildEnemyAiMoveChoice(params: {
  move: MoveConfig
  self: BattlePokemon
  opponent: BattlePokemon
  score: number
  stance: BattleStance
  attackType: string
  effectOnly: boolean
  random: () => number
  state?: BattleState
  weather?: WeatherType
}): EnemyAiMoveChoice {
  const calledMove = resolveCalledMove({
    move: params.move,
    state: params.state,
    side: 'enemy',
    attacker: params.self,
    random: params.random,
  })
  const resolvedMove = calledMove.move
  const effectOnly = params.move.calledMove
    ? isEffectOnlyEnemyAiMove(resolvedMove)
    : params.effectOnly
  const stance =
    resolvedMove.stance === 'random'
      ? getRandomMoveStance()
      : resolvedMove.stance
  const fallbackType = params.self.types?.[0]?.toLowerCase() || 'normal'
  const baseAttackType =
    resolvedMove.forcedType === 'random'
      ? getRandomMoveType()
      : resolvedMove.forcedType || fallbackType
  const attackType = resolveDynamicMoveType({
    move: resolvedMove,
    attacker: params.self,
    defender: params.opponent,
    weather: params.weather,
    fallbackType: baseAttackType,
  })
  const hiddenPower =
    !effectOnly && resolvedMove.id === 'hidden-power'
      ? resolveHiddenPower(params.self)
      : undefined
  const resolvedMoveDamage =
    !effectOnly && !hiddenPower && !resolvedMove.delayedDamage
      ? resolveMoveDamageMultiplier(
          resolvedMove,
          getEffectiveBattleTypes(params.opponent),
          params.random,
          params.weather,
          { forceMaxDamageRange: usesBattleAbilityMaxMultiHitDamage(params.self, resolvedMove) },
        )
      : undefined
  const moveDamage = effectOnly
    ? 0
    : (resolvedMove.delayedDamage?.damage ??
      hiddenPower?.damageMultiplier ??
      resolvedMoveDamage?.damageMultiplier ??
      getMoveDamageMultiplier(
        resolvedMove,
        getEffectiveBattleTypes(params.opponent),
        params.random,
        params.weather,
        { forceMaxDamageRange: usesBattleAbilityMaxMultiHitDamage(params.self, resolvedMove) },
      )) *
        getBattleAbilityRecoilMoveDamageMultiplier(params.self, resolvedMove) *
        getBattleAbilityAddedEffectMoveDamageMultiplier(params.self, resolvedMove) *
        getConditionalDamageMultiplier({
          move: resolvedMove,
          attacker: params.self,
          defender: params.opponent,
          state: params.state,
          side: 'enemy',
          attackType: hiddenPower?.attackType ?? attackType,
          weather: params.weather,
        })
  const damageRule = resolveDamageRuleDamage({
    rule: resolvedMove.damageRule,
    attacker: params.self,
    defender: params.opponent,
    state: params.state,
    side: 'enemy',
    attackerTeam: params.state?.enemyTeam,
  })
  return {
    move: resolvedMove,
    stance,
    attackType: hiddenPower?.attackType ?? attackType,
    basePower:
      effectOnly || damageRule.damage !== undefined
        ? 0
        : Math.max(1, Math.round(BASE_BATTLE_POWER * moveDamage)),
    hitCount:
      !effectOnly && !hiddenPower && !resolvedMove.delayedDamage
        ? (resolvedMoveDamage?.hitCount ?? 1)
        : 1,
    fixedDamage: damageRule.damage,
    typeEffectivenessOverride: resolvedMove.ignoreTypeEffectiveness
      ? 1
      : undefined,
    critChance: resolvedMove.critChance,
    ignoreDefenderStatStages: resolvedMove.ignoreDefenderStatStages,
    damageStatSource: resolvedMove.damageStatSource,
    effectOnly,
    score: params.score,
    calledByMetronome: Boolean(calledMove.message),
  }
}

function selectEnemyAiMove(params: {
  state: BattleState
  enemyMon: BattlePokemon
  playerMon: BattlePokemon
  playerStance?: BattleStance
  opponentUsedMove?: boolean
  random?: () => number
  consumeUse?: boolean
}): EnemyAiMoveChoice | undefined {
  const { state, enemyMon, playerMon } = params
  if (getPokemonMoveUsesRemaining(enemyMon, state.enemyMoveUsesRemaining) <= 0)
    return undefined

  const random = params.random ?? Math.random
  const profile = state.ai?.profile ?? 'trainer'
  const moveIds = enemyMon.aiMoveLoadout?.length
    ? enemyMon.aiMoveLoadout
    : selectEnemyAiMoveLoadout({
        enemyMon,
        playerTeam: state.playerTeam,
        profile,
        isWildBattle: state.isWildBattle,
        random,
        weather: state.weather?.weather,
      })

  let best: EnemyAiMoveChoice | undefined

  for (const moveId of moveIds) {
    const move = getMove(moveId)
    if (!move) continue
    const manualAssignment = Boolean(enemyMon.aiMoves?.includes(moveId))
    if (
      !canEnemyPokemonUseAiMove(enemyMon, move, {
        manualAssignment,
        isWildBattle: state.isWildBattle,
      })
    ) {
      continue
    }

    const scored = scoreMove({
      move,
      self: enemyMon,
      opponent: playerMon,
      state,
      playerStance: params.playerStance,
      profile,
      weather: state.weather?.weather,
    })
    if (!Number.isFinite(scored.score)) continue

    const randomizedScore = randomizeScore(scored.score, profile, random)
    const choice = buildEnemyAiMoveChoice({
      move,
      self: enemyMon,
      opponent: playerMon,
      score: randomizedScore,
      stance: scored.stance,
      attackType: chooseMoveAttackType({
        move,
        attacker: enemyMon,
        defender: playerMon,
        weather: state.weather?.weather,
        random,
      }),
      effectOnly: scored.effectOnly,
      random,
      state,
      weather: state.weather?.weather,
    })
    choice.ignoresStancePacing = Boolean(
      move.calledMove ||
        choice.basePower > 0 ||
        choice.fixedDamage !== undefined,
    )

    if (!best || (choice.score ?? 0) > (best.score ?? 0)) best = choice
  }

  if (!best || (best.score ?? 0) <= 0) return undefined

  const stanceScore = getBestStanceScore({
    self: enemyMon,
    opponent: playerMon,
    playerStance: params.playerStance,
    weather: state.weather?.weather,
  })
  if (
    !best.ignoresStancePacing &&
    (best.score ?? 0) < stanceScore + getProfileConfig(profile).moveMargin
  ) {
    return undefined
  }

  if (params.consumeUse !== false) {
    consumePokemonMoveUse(enemyMon, {
      moveUsesRemaining: state.enemyMoveUsesRemaining ?? 0,
    })
    state.enemyMoveUsesRemaining = getPokemonMoveUsesRemaining(
      enemyMon,
      state.enemyMoveUsesRemaining,
    )
  }
  return best
}

export function chooseEnemyAiMove(params: {
  state: BattleState
  enemyMon: BattlePokemon
  playerMon: BattlePokemon
  fallbackStance?: BattleStance
  defaultEffectiveness?: EnemyAiEffectiveness
  opponentUsedMove?: boolean
  playerInventory?: Record<string, number>
  playerStance?: BattleStance
  random?: () => number
}): EnemyAiMoveChoice | undefined {
  return selectEnemyAiMove({
    state: params.state,
    enemyMon: params.enemyMon,
    playerMon: params.playerMon,
    opponentUsedMove: params.opponentUsedMove,
    playerStance: params.playerStance,
    random: params.random,
    consumeUse: true,
  })
}

function scoreBattleItemForEnemy(params: {
  item: Item
  pokemon: BattlePokemon
}): number {
  const { item, pokemon } = params
  const effect = item.battleEffect
  if (!effect) return 0
  if (
    effect.type === 'tera' ||
    effect.type === 'z-move' ||
    effect.type === 'reveal-stance' ||
    effect.type === 'damage-block' ||
    effect.type === 'ev-training' ||
    effect.type === 'type-damage-boost' ||
    effect.type === 'attack-status-chance'
  ) {
    return 0
  }

  let score = 0
  if (effect.type === 'heal') {
    const missingHp = Math.max(0, pokemon.maxHp - pokemon.currentHp)
    if (effect.healFull) score += missingHp
    if (effect.healAmount) score += Math.min(missingHp, effect.healAmount)
    if (effect.clearStatus && pokemon.status) {
      const clearStatus = effect.clearStatus
      const statusMatches =
        clearStatus === 'all' ||
        (Array.isArray(clearStatus)
          ? clearStatus.includes(pokemon.status.id)
          : clearStatus === pokemon.status.id)
      if (statusMatches) score += STATUS_SCORE[pokemon.status.id] ?? 18
    }
  }

  if (effect.type === 'buff' && effect.buffStat && effect.buffStages) {
    const stat = effect.buffStat
    const current = clampStage(
      pokemon.statStages?.[stat],
      stat === 'crit' ? 3 : 6,
    )
    const max = stat === 'crit' ? 3 : 6
    const usefulStages = Math.max(
      0,
      Math.min(max, current + effect.buffStages) - current,
    )
    score += usefulStages * 18
  }

  return score
}

function chooseEnemyItemAction(params: {
  state: BattleState
  enemyMon: BattlePokemon
  profile: BattleAiProfileId
  random: () => number
}): EnemyBattleAction | undefined {
  const { state, enemyMon, profile, random } = params
  if (
    !state.trainerItems?.length ||
    state.trainerItemLastUsedTurn === state.turn
  ) {
    return undefined
  }

  const threshold = getProfileConfig(profile).itemThreshold
  let best: EnemyBattleAction | undefined

  for (const entry of state.trainerItems) {
    if (!entry.quantity || entry.quantity <= 0) continue
    const item = items.find((candidate) => candidate.id === entry.itemId)
    if (!item?.battleEffect) continue

    const score = randomizeScore(
      scoreBattleItemForEnemy({ item, pokemon: enemyMon }),
      profile,
      random,
    )
    if (score < threshold) continue
    if (!best || score > best.score) {
      best = { kind: 'item', itemId: item.id, score }
    }
  }

  return best
}

function scorePokemonMatchup(params: {
  attacker: BattlePokemon
  defender: BattlePokemon
  state: BattleState
}): number {
  const { attacker, defender, state } = params
  const moveIds = attacker.aiMoveLoadout?.length
    ? attacker.aiMoveLoadout
    : selectEnemyAiMoveLoadout({
        enemyMon: attacker,
        playerTeam: state.playerTeam,
        profile: state.ai?.profile,
        isWildBattle: state.isWildBattle,
        weather: state.weather?.weather,
      })

  let bestOffense = Math.max(
    ...(['power', 'speed', 'tech'] as BattleStance[]).map((stance) =>
      scoreStance({
        self: attacker,
        opponent: defender,
        stance,
        weather: state.weather?.weather,
      }),
    ),
  )

  for (const moveId of moveIds) {
    const move = getMove(moveId)
    if (!move) continue
    const scored = scoreMove({
      move,
      self: attacker,
      opponent: defender,
      state,
      profile: state.ai?.profile,
      weather: state.weather?.weather,
    })
    if (Number.isFinite(scored.score))
      bestOffense = Math.max(bestOffense, scored.score)
  }

  let incomingRisk = 0
  for (const type of getEffectiveBattleTypes(defender)) {
    const effectiveness = getWeatherTypeEffectiveness(
      type.toLowerCase(),
      attacker,
      state.weather?.weather,
    )
    incomingRisk = Math.max(incomingRisk, effectiveness * 18)
  }

  return bestOffense - incomingRisk + hpPercent(attacker) * 16
}

function chooseEnemySwitchAction(params: {
  state: BattleState
  enemyMon: BattlePokemon
  playerMon: BattlePokemon
  profile: BattleAiProfileId
  random: () => number
}): EnemyBattleAction | undefined {
  const { state, enemyMon, playerMon, profile, random } = params
  if (profile === 'wild') return undefined
  if (
    getSecondaryStatusSwitchPreventionMessage({
      state,
      pokemon: enemyMon,
      side: 'enemy',
    })
  ) {
    return undefined
  }
  if (
    getBattleAbilitySwitchPreventionMessage({
      trapper: playerMon,
      switchingPokemon: enemyMon,
    })
  ) {
    return undefined
  }

  const currentScore = scorePokemonMatchup({
    attacker: enemyMon,
    defender: playerMon,
    state,
  })
  const threshold = getProfileConfig(profile).switchThreshold
  let best: EnemyBattleAction | undefined

  for (const [index, candidate] of state.enemyTeam.entries()) {
    if (index === state.activeEnemyIndex || candidate.currentHp <= 0) continue
    const score =
      scorePokemonMatchup({ attacker: candidate, defender: playerMon, state }) -
      currentScore -
      threshold
    const randomized = randomizeScore(score, profile, random)
    if (randomized <= 0) continue
    if (!best || randomized > best.score) {
      best = { kind: 'switch', newIndex: index, score: randomized }
    }
  }

  return best
}

export function chooseEnemyReplacementIndex(params: {
  state: BattleState
  playerMon: BattlePokemon
  currentEnemyIndex?: number
  random?: () => number
}): number {
  const { state, playerMon } = params
  const currentEnemyIndex = params.currentEnemyIndex ?? state.activeEnemyIndex
  const random = params.random ?? Math.random
  const profile = state.ai?.profile ?? 'trainer'
  let best: { index: number; score: number } | undefined

  for (const [index, candidate] of state.enemyTeam.entries()) {
    if (index === currentEnemyIndex || candidate.currentHp <= 0) continue

    const score = randomizeScore(
      scorePokemonMatchup({ attacker: candidate, defender: playerMon, state }),
      profile,
      random,
    )
    if (!best || score > best.score) {
      best = { index, score }
    }
  }

  return best?.index ?? -1
}

function chooseEnemyStanceAction(params: {
  state: BattleState
  enemyMon: BattlePokemon
  playerMon: BattlePokemon
  playerStance?: BattleStance
  profile: BattleAiProfileId
  random: () => number
}): EnemyBattleAction {
  const { enemyMon, playerMon, random } = params
  const stance = calculateAiStance(enemyMon, playerMon, random)
  return {
    kind: 'stance',
    stance,
    score: scoreStance({
      self: enemyMon,
      opponent: playerMon,
      stance,
      playerStance: params.playerStance,
      weather: params.state.weather?.weather,
    }),
  }
}

export function chooseEnemyBattleAction(params: {
  state: BattleState
  enemyMon: BattlePokemon
  playerMon: BattlePokemon
  playerStance?: BattleStance
  opponentUsedMove?: boolean
  canUseItems?: boolean
  canSwitch?: boolean
  consumeMoveUse?: boolean
  random?: () => number
}): EnemyBattleAction {
  const { state, enemyMon, playerMon } = params
  const random = params.random ?? Math.random
  const profile = state.ai?.profile ?? 'trainer'
  const actions: EnemyBattleAction[] = [
    chooseEnemyStanceAction({
      state,
      enemyMon,
      playerMon,
      playerStance: params.playerStance,
      profile,
      random,
    }),
  ]

  const move = selectEnemyAiMove({
    state,
    enemyMon,
    playerMon,
    opponentUsedMove: params.opponentUsedMove,
    playerStance: params.playerStance,
    random,
    consumeUse: false,
  })
  if (move) actions.push({ kind: 'move', move, score: move.score ?? 0 })

  if (params.canUseItems !== false) {
    const itemAction = chooseEnemyItemAction({
      state,
      enemyMon,
      profile,
      random,
    })
    if (itemAction) actions.push(itemAction)
  }

  if (params.canSwitch !== false) {
    const switchAction = chooseEnemySwitchAction({
      state,
      enemyMon,
      playerMon,
      profile,
      random,
    })
    if (switchAction) actions.push(switchAction)
  }

  actions.sort((a, b) => b.score - a.score)
  const chosen = actions[0]
  if (chosen.kind === 'move' && params.consumeMoveUse !== false) {
    consumePokemonMoveUse(enemyMon, {
      moveUsesRemaining: state.enemyMoveUsesRemaining ?? 0,
    })
    state.enemyMoveUsesRemaining = getPokemonMoveUsesRemaining(
      enemyMon,
      state.enemyMoveUsesRemaining,
    )
    applyBattleAbilityOpposingMoveUseDepletion({
      state,
      attackerSide: 'enemy',
      attacker: enemyMon,
      defender: playerMon,
      move: chosen.move.move,
    })
  }
  return chosen
}

export function shouldInterruptEnemyAiMove(params: {
  move?: MoveConfig
  attacker?: BattlePokemon
  enemyAiMove?: EnemyAiMoveChoice
  target?: BattlePokemon
  moveMissed?: boolean
  moveFailed?: boolean
  random?: () => number
}): boolean {
  const chance =
    params.move && params.attacker
      ? getBattleAbilityMoveInterruptChance(
          params.attacker,
          params.move,
          params.move.interruptEnemyMove,
        )
      : (params.move?.interruptEnemyMove ?? 0)
  const random = params.random ?? Math.random

  return Boolean(
    params.enemyAiMove &&
      chance > 0 &&
      !params.moveMissed &&
      !params.moveFailed &&
      !(params.target && blocksBattleInterruptByAbility(params.target)) &&
      random() * 100 < Math.max(0, Math.min(100, chance)),
  )
}

function formatStatName(stat: string): string {
  switch (stat) {
    case 'specialAttack':
      return 'Sp. Atk'
    case 'specialDefense':
      return 'Sp. Def'
    default:
      return stat.charAt(0).toUpperCase() + stat.slice(1)
  }
}

export function applyEnemyAiMoveEffects(params: {
  move: MoveConfig
  self: BattlePokemon
  opponent: BattlePokemon
  state?: BattleState
  damageDealt?: number
  weather?: WeatherType
  random?: () => number
  skipPreDamageDefensiveEffects?: boolean
}): string[] {
  const { move, self, opponent, weather } = params
  const random = params.random ?? Math.random
  const messages: string[] = []
  const battleConditionFailed = checkMoveBattleCondition({
    move,
    state: params.state,
    side: 'enemy',
    attacker: self,
    defender: opponent,
  })
  if (battleConditionFailed) return [battleConditionFailed]

  if (move.buffs?.length) {
    for (const buff of move.buffs) {
      const chance = buff.chance ?? 100
      if (random() * 100 >= chance) continue

      const target = (buff.target ?? 'self') === 'self' ? self : opponent
      const targetSide = (buff.target ?? 'self') === 'self' ? 'enemy' : 'player'
      const opposingPokemon = target === self ? opponent : self
      const opposingSide = target === self ? 'player' : 'enemy'
      if (buff.stages < 0) {
        const reflection = applyBattleAbilityStatStageDropReflection({
          pokemon: target,
          opponent: opposingPokemon,
          stat: buff.stat,
          stages: buff.stages,
          source: target === self ? 'self' : 'opponent',
          sourcePokemon: self,
        })
        if (reflection.reflected) {
          messages.push(...reflection.messages)
          if (reflection.changed) {
            recordStatLoweredThisTurn({
              state: params.state,
              side: opposingSide,
              pokemon: opposingPokemon,
            })
          }
          continue
        }
      }
      if (
        buff.stages < 0 &&
        blocksBattleStatStageDropByAbility({
          pokemon: target,
          stat: buff.stat,
          source: target === self ? 'self' : 'opponent',
          sourcePokemon: self,
        })
      ) {
        messages.push(getBattleStatStageDropBlockMessage(target))
        continue
      }
      target.statStages ??= { ...DEFAULT_STAT_STAGES }
      target.statStages[buff.stat] = clampStatStage(
        target.statStages[buff.stat] + buff.stages,
        buff.stat,
      )
      if (buff.stages < 0) {
        recordStatLoweredThisTurn({
          state: params.state,
          side: targetSide,
          pokemon: target,
        })
        messages.push(
          ...applyBattleAbilityStatStageDropTriggers({
            pokemon: target,
            source: target === self ? 'self' : 'opponent',
          }),
        )
      }
      const direction = buff.stages >= 0 ? 'rose' : 'fell'
      messages.push(
        `${target.name}'s ${formatStatName(buff.stat)} ${direction}!`,
      )
      if (buff.stages > 0) {
        messages.push(
          ...applyBattleAbilityOpponentStatStageBoostCopy({
            pokemon: opposingPokemon,
            boostedPokemon: target,
            stat: buff.stat,
            stages: buff.stages,
          }),
        )
      }
    }
  }

  if (move.heal) {
    const healAmount = getMoveHealAmount({
      move,
      pokemon: self,
      weather,
    })
    self.currentHp = Math.min(self.maxHp, self.currentHp + healAmount)
    messages.push(`${self.name} healed ${healAmount} HP!`)
  }

  if (move.absorb) {
    const absorbResult = applyMoveAbsorbHealing(
      self,
      params.damageDealt ?? 0,
      move.absorb,
    )
    if (absorbResult.applied) messages.push(absorbResult.message)
  }

  const secondaryEffectBlockMessage = getBattleSecondaryEffectBlockMessage({
    defender: opponent,
    move,
    damageDealt: params.damageDealt,
  })
  if (secondaryEffectBlockMessage) messages.push(secondaryEffectBlockMessage)
  const suppressesAddedEffects = suppressesBattleMoveAddedEffectsByAbility(self, move)
  const skipTargetAddedEffects = Boolean(
    secondaryEffectBlockMessage || suppressesAddedEffects,
  )
  const secondaryEffectChanceMultiplier =
    getBattleAbilitySecondaryEffectChance(self, move, 100) / 100

  if (move.status) {
    const chance = getBattleAbilitySecondaryEffectChance(
      self,
      move,
      move.status.chance,
    )
    if (random() * 100 < chance) {
      const target = move.status.target ?? move.target ?? 'enemy'
      const targetPokemon = target === 'self' ? self : opponent
      if (!skipTargetAddedEffects || targetPokemon !== opponent) {
        const prevention = getSecondaryStatusStatusPreventionMessage({
          state: params.state,
          pokemon: targetPokemon,
          side: target === 'self' ? 'enemy' : 'player',
          statusId: move.status.id,
        })
        const result = prevention
          ? { applied: false, message: prevention }
          : applyStatus(targetPokemon, move.status.id, weather, {
              force: move.status.forceStatus,
              terrain: params.state?.terrain?.terrain,
              sourcePokemon: self,
            })
        if (result.message) messages.push(result.message)
        if (result.applied) {
          messages.push(
            ...applyBattleAbilityStatusReflection({
              pokemon: targetPokemon,
              source: self,
              statusId: move.status.id,
              weather,
              state: params.state,
            }),
          )
        }
      }
    }
  }

  if (move.debuffs?.length) {
    for (const debuff of move.debuffs) {
      const chance = getBattleAbilitySecondaryEffectChance(self, move, debuff.chance)
      if (random() * 100 >= chance) continue

      const target = (debuff.target ?? 'enemy') === 'self' ? self : opponent
      if (skipTargetAddedEffects && target === opponent) continue
      const targetSide =
        (debuff.target ?? 'enemy') === 'self' ? 'enemy' : 'player'
      const opposingPokemon = target === self ? opponent : self
      const opposingSide = target === self ? 'player' : 'enemy'
      if (debuff.stages < 0) {
        const reflection = applyBattleAbilityStatStageDropReflection({
          pokemon: target,
          opponent: opposingPokemon,
          stat: debuff.stat,
          stages: debuff.stages,
          source: target === self ? 'self' : 'opponent',
          sourcePokemon: self,
        })
        if (reflection.reflected) {
          messages.push(...reflection.messages)
          if (reflection.changed) {
            recordStatLoweredThisTurn({
              state: params.state,
              side: opposingSide,
              pokemon: opposingPokemon,
            })
          }
          continue
        }
      }
      if (
        debuff.stages < 0 &&
        blocksBattleStatStageDropByAbility({
          pokemon: target,
          stat: debuff.stat,
          source: target === self ? 'self' : 'opponent',
          sourcePokemon: self,
        })
      ) {
        messages.push(getBattleStatStageDropBlockMessage(target))
        continue
      }
      target.statStages ??= { ...DEFAULT_STAT_STAGES }
      target.statStages[debuff.stat] = clampStatStage(
        target.statStages[debuff.stat] + debuff.stages,
        debuff.stat,
      )
      if (debuff.stages < 0) {
        recordStatLoweredThisTurn({
          state: params.state,
          side: targetSide,
          pokemon: target,
        })
        messages.push(
          ...applyBattleAbilityStatStageDropTriggers({
            pokemon: target,
            source: target === self ? 'self' : 'opponent',
          }),
        )
      }
      const direction = debuff.stages >= 0 ? 'rose' : 'fell'
      messages.push(
        `${target.name}'s ${formatStatName(debuff.stat)} ${direction}!`,
      )
      if (debuff.stages > 0) {
        messages.push(
          ...applyBattleAbilityOpponentStatStageBoostCopy({
            pokemon: opposingPokemon,
            boostedPokemon: target,
            stat: debuff.stat,
            stages: debuff.stages,
          }),
        )
      }
    }
  }

  if (move.additionalStatuses?.length) {
    for (const status of move.additionalStatuses) {
      const chance = getBattleAbilitySecondaryEffectChance(self, move, status.chance)
      if (random() * 100 >= chance) continue
      const target =
        status.target ?? (move.target === 'self' ? 'self' : 'enemy')
      const targetPokemon = target === 'self' ? self : opponent
      if (skipTargetAddedEffects && targetPokemon === opponent) continue
      const prevention = getSecondaryStatusStatusPreventionMessage({
        state: params.state,
        pokemon: targetPokemon,
        side: target === 'self' ? 'enemy' : 'player',
        statusId: status.id,
      })
      const result = prevention
        ? { applied: false, message: prevention }
        : applyStatus(targetPokemon, status.id, weather, {
            terrain: params.state?.terrain?.terrain,
            sourcePokemon: self,
          })
      if (result.message) messages.push(result.message)
      if (result.applied) {
        messages.push(
          ...applyBattleAbilityStatusReflection({
            pokemon: targetPokemon,
            source: self,
            statusId: status.id,
            weather,
            state: params.state,
          }),
        )
      }
    }
  }

  if (move.selfDamage) {
    const recoilBlockMessage = getBattleRecoilDamageBlockMessage(self, move)
    if (recoilBlockMessage) {
      messages.push(recoilBlockMessage)
    } else {
      const selfDamageResult = applyMoveSelfDamage(self, move.selfDamage, random)
      if (selfDamageResult.applied) messages.push(selfDamageResult.message)
    }
  }

  if (move.disableStance) {
    const target = move.target === 'self' ? self : opponent
    if (!skipTargetAddedEffects || target !== opponent) {
      messages.push(
        blocksBattleMentalEffectByAbility(target, 'disable')
          ? getBattleMentalEffectBlockMessage(target, move.name)
          : applyStanceDisable({
              pokemon: target,
              stance: move.disableStance.stance,
              turns: move.disableStance.turns,
              currentTurn: params.state?.turn,
              random,
            }),
      )
    }
  }

  if (
    move.randomStatuses?.options.length &&
    !skipTargetAddedEffects &&
    random() * 100 <
      getBattleAbilitySecondaryEffectChance(self, move, move.randomStatuses.chance)
  ) {
    const totalChance = move.randomStatuses.options.reduce(
      (sum, option) => sum + (option.chance ?? 1),
      0,
    )
    let threshold = random() * totalChance
    const chosen = move.randomStatuses.options.find((option) => {
      threshold -= option.chance ?? 1
      return threshold <= 0
    })
    if (chosen) {
      const target =
        chosen.target === 'random'
          ? random() < 0.5
            ? 'self'
            : 'enemy'
          : (chosen.target ?? 'enemy')
      const targetPokemon = target === 'self' ? self : opponent
      const prevention = getSecondaryStatusStatusPreventionMessage({
        state: params.state,
        pokemon: targetPokemon,
        side: target === 'self' ? 'enemy' : 'player',
        statusId: chosen.id,
      })
      const result = prevention
        ? { applied: false, message: prevention }
        : applyStatus(targetPokemon, chosen.id, weather, {
            terrain: params.state?.terrain?.terrain,
            sourcePokemon: self,
          })
      if (result.message) messages.push(result.message)
      if (result.applied) {
        messages.push(
          ...applyBattleAbilityStatusReflection({
            pokemon: targetPokemon,
            source: self,
            statusId: chosen.id,
            weather,
            state: params.state,
          }),
        )
      }
    }
  }

  const secondaryStatuses = params.skipPreDamageDefensiveEffects
    ? move.secondaryStatuses?.filter(
        (status) =>
          !(
            (status.target === 'self-pokemon' || status.target === 'self-side') &&
            status.effects.some((effect) => effect.type === 'damage-reduction')
          ),
      )
    : move.secondaryStatuses

  if (secondaryStatuses?.length && !skipTargetAddedEffects) {
    messages.push(
      ...applySecondaryStatusesFromMove({
        move: { secondaryStatuses },
        state: params.state,
        attacker: self,
        defender: opponent,
        sourceSide: 'enemy',
        random,
        chanceMultiplier: secondaryEffectChanceMultiplier,
      }),
    )
  }

  if (params.state) {
    const runtimeEffects = applyMoveRuntimeEffects({
      move,
      state: params.state,
      side: 'enemy',
      attacker: self,
      defender: opponent,
      damageDealt: params.damageDealt,
    })
    if (runtimeEffects.failed) messages.push(runtimeEffects.failed)
    messages.push(...runtimeEffects.messages)
  }

  return messages
}

export function applyEnemyAiPreDamageDefensiveEffects(params: {
  move: MoveConfig
  self: BattlePokemon
  opponent: BattlePokemon
  state?: BattleState
  random?: () => number
}): string[] {
  const defensiveStatuses = (params.move.secondaryStatuses || []).filter(
    (status) =>
      (status.target === 'self-pokemon' || status.target === 'self-side') &&
      status.effects.some((effect) => effect.type === 'damage-reduction'),
  )

  if (!defensiveStatuses.length) return []

  return applySecondaryStatusesFromMove({
    move: { secondaryStatuses: defensiveStatuses },
    state: params.state,
    attacker: params.self,
    defender: params.opponent,
    sourceSide: 'enemy',
    random: params.random,
  })
}
