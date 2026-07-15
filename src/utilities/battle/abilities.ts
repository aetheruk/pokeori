import { ABILITIES } from '@/data/abilities'
import type { AbilityEffect } from '@/data/abilities'
import { getMove, type MoveConfig, type StatusEffectId } from '@/data/moves'
import type {
  BattlePokemon,
  BattleSecondaryStatusInstance,
  BattleStance,
  BattleState,
} from './types'
import { WEATHER_LABELS, isWeatherType, type WeatherType } from '@/data/weather'
import { TERRAIN_LABELS, isTerrainType, type TerrainType } from '@/data/terrain'
import { getEffectiveBattleTypes, resetBattleTypeChange } from './tera'
import { applyStatus } from './status-effects-logic'
import { hasOppositeNonGenderlessGenders } from '@/utilities/pokemon/gender'
import { lowerPokemonMoveUses } from './move-uses'
import { applyStanceDisable } from './stance-disable'
import { getHeldItemDefinition } from '@/utilities/pokemon/held-items'
import { getDualTypeEffectiveness } from './type-chart'

const PRIMAL_WEATHERS = new Set<WeatherType>([
  'extremely-harsh-sunlight',
  'heavy-rain',
  'strong-winds',
])

const FORECAST_WEATHER_TYPES: Partial<Record<WeatherType, string>> = {
  'harsh-sunlight': 'fire',
  'extremely-harsh-sunlight': 'fire',
  rain: 'water',
  'heavy-rain': 'water',
  thunderstorm: 'water',
  hail: 'ice',
  snow: 'ice',
  snowstorm: 'ice',
}

const MIMICRY_TERRAIN_TYPES: Record<TerrainType, string> = {
  electric: 'electric',
  grassy: 'grass',
  misty: 'fairy',
  psychic: 'psychic',
}

const DEFAULT_ABILITY_STAT_STAGES = {
  attack: 0,
  defense: 0,
  specialAttack: 0,
  specialDefense: 0,
  speed: 0,
  crit: 0,
  accuracy: 0,
  evasion: 0,
}

type BattleSide = 'player' | 'enemy'

function oppositeBattleSide(side: BattleSide): BattleSide {
  return side === 'player' ? 'enemy' : 'player'
}

function getAbilityEffects(
  pokemon: Pick<BattlePokemon, 'ability' | 'battleAbilityState'>,
): AbilityEffect[] {
  const abilityId =
    typeof pokemon.ability === 'string' ? pokemon.ability : undefined
  if (!abilityId) return []
  if (
    pokemon.battleAbilityState?.suppressed &&
    abilityId !== 'neutralizing_gas'
  ) {
    return []
  }
  const ability = ABILITIES[abilityId]
  if (!ability) return []
  return [...(ability.effects || [])]
}

function hasActiveAbilitySuppression(pokemon: BattlePokemon | undefined): boolean {
  if (!pokemon || pokemon.currentHp <= 0) return false
  return getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-active-ability-suppression',
  )
}

export function processBattleAbilitySuppressionForState(
  state: BattleState,
): string[] {
  if (!state.playerTeam?.length || !state.enemyTeam?.length) return []
  const playerMon = state.playerTeam[state.activePlayerIndex]
  const enemyMon = state.enemyTeam[state.activeEnemyIndex]
  const activePokemon = [playerMon, enemyMon].filter(
    (pokemon): pokemon is BattlePokemon => Boolean(pokemon),
  )
  const previouslySuppressed = new Set(
    activePokemon
      .filter((pokemon) => pokemon.battleAbilityState?.suppressed)
      .map((pokemon) => pokemon.id || `${pokemon.name}:${pokemon.formId}`),
  )

  for (const pokemon of [...state.playerTeam, ...state.enemyTeam]) {
    if (pokemon.battleAbilityState?.suppressed) {
      pokemon.battleAbilityState.suppressed = undefined
    }
  }

  const playerSuppresses = hasActiveAbilitySuppression(playerMon)
  const enemySuppresses = hasActiveAbilitySuppression(enemyMon)
  if (!playerSuppresses && !enemySuppresses) return []

  const messages: string[] = []
  let suppressionChanged = false
  for (const pokemon of activePokemon) {
    const isSuppressor =
      (pokemon === playerMon && playerSuppresses) ||
      (pokemon === enemyMon && enemySuppresses)
    if (isSuppressor) continue
    pokemon.battleAbilityState ??= {}
    pokemon.battleAbilityState.suppressed = true
    const key = pokemon.id || `${pokemon.name}:${pokemon.formId}`
    if (!previouslySuppressed.has(key)) suppressionChanged = true
  }

  if (suppressionChanged) {
    for (const pokemon of activePokemon) {
      const isSuppressor =
        (pokemon === playerMon && playerSuppresses) ||
        (pokemon === enemyMon && enemySuppresses)
      if (isSuppressor) {
        messages.push(`${pokemon.name}'s ${getAbilityName(pokemon)} neutralized abilities!`)
      }
    }
  }

  return messages
}

function bypassesTypeImmunity(
  attackType: string,
  bypass?: string[] | true,
): boolean {
  if (bypass === true) return true
  return (
    bypass?.some((type) => type.toLowerCase() === attackType.toLowerCase()) ||
    false
  )
}

function sourceMatches(
  pokemon: BattlePokemon,
  sourceFormIds: string[] | undefined,
): boolean {
  if (!sourceFormIds?.length) return true
  return sourceFormIds.includes(String(pokemon.formId))
}

function getAbilityName(pokemon: BattlePokemon): string {
  return (pokemon.ability && ABILITIES[pokemon.ability]?.name) || 'ability'
}

function getAbilityDisplayName(abilityId: string): string {
  return ABILITIES[abilityId]?.name || abilityId
}

function getRuntimeHeldItem(pokemon: BattlePokemon): { id: string; name: string } | undefined {
  return (
    pokemon.heldItem ||
    getHeldItemDefinition((pokemon as any).heldItemId as string | null | undefined) ||
    undefined
  )
}

function setRuntimeHeldItem(
  pokemon: BattlePokemon,
  item: { id: string; name: string } | undefined,
  options: { battleOnly?: boolean } = {},
): void {
  const hadHeldItem = Boolean(getRuntimeHeldItem(pokemon))
  pokemon.heldItem = item
  ;(pokemon as any).heldItemId = item?.id ?? null
  pokemon.heldItemBattleOnly = item ? options.battleOnly || undefined : undefined
  pokemon.itemCharge = 0
  if (item) {
    if (pokemon.battleAbilityState) pokemon.battleAbilityState.heldItemLost = false
  } else if (hadHeldItem) {
    pokemon.battleAbilityState ??= {}
    pokemon.battleAbilityState.heldItemLost = true
  }
}

function stealRuntimeHeldItem(params: {
  thief: BattlePokemon
  target: BattlePokemon
  thiefAbilityOwner?: BattlePokemon
}): string | undefined {
  if (params.thief.currentHp <= 0 || params.target.currentHp <= 0) return undefined
  if (getRuntimeHeldItem(params.thief)) return undefined
  const item = getRuntimeHeldItem(params.target)
  if (!item) return undefined
  const protectedMessage = getBattleHeldItemProtectionMessage(params.target)
  if (protectedMessage) return protectedMessage

  setRuntimeHeldItem(params.thief, item, { battleOnly: true })
  setRuntimeHeldItem(params.target, undefined)
  const owner = params.thiefAbilityOwner ?? params.thief
  return `${owner.name}'s ${getAbilityName(owner)} stole ${params.target.name}'s ${item.name}!`
}

function rememberOriginalBattleAbility(pokemon: BattlePokemon): void {
  if (!pokemon.ability) return
  pokemon.battleAbilityState ??= {}
  pokemon.battleAbilityState.originalAbility ??= pokemon.ability
}

function rememberOriginalBattleTransform(pokemon: BattlePokemon): void {
  pokemon.battleAbilityState ??= {}
  pokemon.battleAbilityState.originalTransform ??= {
    name: pokemon.name,
    formId: pokemon.formId,
    types: [...pokemon.types],
    stats: { ...pokemon.stats },
    statStages: pokemon.statStages ? { ...pokemon.statStages } : undefined,
  }
}

function isRecoilSelfDamageMove(
  move: Pick<MoveConfig, 'damage' | 'description' | 'selfDamage' | 'target'>,
): boolean {
  if (!move.selfDamage || move.target !== 'enemy' || (move.damage ?? 0) <= 0) {
    return false
  }

  const description = move.description.toLowerCase()
  return (
    description.includes('recoil') ||
    description.includes('reckless') ||
    description.includes('also hurts') ||
    description.includes('hurts the user') ||
    description.includes('damages the user')
  )
}

function matchesString(
  value: string | undefined,
  allowed?: readonly string[],
): boolean {
  if (!allowed?.length) return true
  if (!value) return false
  return allowed.some((entry) => entry.toLowerCase() === value.toLowerCase())
}

function matchesPokemonTypes(
  pokemon: BattlePokemon,
  allowed?: readonly string[],
): boolean {
  if (!allowed?.length) return true
  const allowedTypes = new Set(allowed.map((entry) => entry.toLowerCase()))
  return getEffectiveBattleTypes(pokemon).some((type) =>
    allowedTypes.has(type.toLowerCase()),
  )
}

function formatPokemonTypeName(type: string): string {
  return `${type[0]?.toUpperCase() ?? ''}${type.slice(1)}`
}

function applyBattleTypeOverride(params: {
  pokemon: BattlePokemon
  nextType: string
  abilityName?: string
  resetToOriginal?: boolean
  resetDisplayType?: string
}): string[] {
  const {
    pokemon,
    abilityName = getAbilityName(pokemon),
    resetToOriginal,
    resetDisplayType,
  } = params
  const nextType = params.nextType.toLowerCase()

  if (resetToOriginal) {
    const hadOverride = Boolean(pokemon.battleTypeOverride?.length)
    resetBattleTypeChange(pokemon)
    if (hadOverride && resetDisplayType) {
      return [
        `${pokemon.name}'s ${abilityName} changed it to ${formatPokemonTypeName(resetDisplayType)} type!`,
      ]
    }
    return hadOverride
      ? [`${pokemon.name}'s ${abilityName} restored its original type!`]
      : []
  }

  const currentTypes = getEffectiveBattleTypes(pokemon).map((type) =>
    type.toLowerCase(),
  )
  if (currentTypes.length === 1 && currentTypes[0] === nextType) return []

  pokemon.battleTypeOriginalTypes ??= [...(pokemon.types || ['normal'])]
  pokemon.types = [nextType]
  pokemon.battleTypeOverride = [nextType]
  pokemon.battleTypeTurnsRemaining = undefined

  return [
    `${pokemon.name}'s ${abilityName} changed it to ${formatPokemonTypeName(nextType)} type!`,
  ]
}

function matchesPokemonStatus(
  pokemon: BattlePokemon,
  allowed?: readonly string[],
): boolean {
  if (!allowed?.length) return true
  if (allowed.includes('any')) return !!pokemon.status
  const statusId = pokemon.status?.id
  return !!statusId && allowed.includes(statusId)
}

function addOrReplaceBattleAbilitySecondaryStatus(
  statuses: BattleSecondaryStatusInstance[] | undefined,
  status: BattleSecondaryStatusInstance,
): BattleSecondaryStatusInstance[] {
  const next =
    statuses?.filter(
      (existing) =>
        existing.id !== status.id ||
        existing.target !== status.target ||
        existing.targetSide !== status.targetSide,
    ) ?? []
  next.push(status)
  return next
}

function matchesHpCondition(
  pokemon: BattlePokemon,
  condition: {
    hpAtOrBelowPercent?: number
    hpAbovePercent?: number
    hpFull?: boolean
  },
): boolean {
  if (condition.hpFull && pokemon.currentHp < pokemon.maxHp) return false
  const hpPercent =
    pokemon.maxHp > 0 ? (pokemon.currentHp / pokemon.maxHp) * 100 : 0
  if (
    typeof condition.hpAtOrBelowPercent === 'number' &&
    hpPercent > condition.hpAtOrBelowPercent
  ) {
    return false
  }
  if (
    typeof condition.hpAbovePercent === 'number' &&
    hpPercent <= condition.hpAbovePercent
  ) {
    return false
  }
  return true
}

function getActiveTurnNumber(
  pokemon: Pick<BattlePokemon, 'activeTurnStarted'>,
  currentTurn?: number,
): number | undefined {
  if (typeof currentTurn !== 'number') return undefined
  const started = pokemon.activeTurnStarted ?? 1
  return Math.max(1, currentTurn - started + 1)
}

function getAccuracyEvasionStageMultiplier(stage: number): number {
  const clampedStage = Math.max(-6, Math.min(6, stage))
  if (clampedStage >= 0) return (3 + clampedStage) / 3
  return 3 / (3 - clampedStage)
}

function getMoveAccuracyStageBonus(params: {
  effects: AbilityEffect[]
  pokemon: BattlePokemon
  expectedTarget: 'attacker' | 'defender'
  stat: 'accuracy' | 'evasion'
  weather?: WeatherType
}): number {
  return params.effects.reduce((bonus, effect) => {
    if (effect.type !== 'battle-move-accuracy-stage') return bonus
    if ((effect.target ?? params.expectedTarget) !== params.expectedTarget) return bonus
    if (effect.stat !== params.stat) return bonus
    if (!matchesString(params.weather, effect.weather)) return bonus
    if (!matchesPokemonStatus(params.pokemon, effect.statuses)) return bonus
    return bonus + effect.stages
  }, 0)
}

function applyStatBoost(
  pokemon: BattlePokemon,
  statBoost: Extract<
    AbilityEffect,
    { type: 'battle-type-absorb' }
  >['statBoost'],
): string | undefined {
  if (!statBoost) return undefined
  pokemon.statStages ??= { ...DEFAULT_ABILITY_STAT_STAGES }

  const changedStats: string[] = []
  for (const [stat, stages] of Object.entries(statBoost)) {
    if (!stages) continue
    const key = stat as keyof NonNullable<BattlePokemon['statStages']>
    const before = pokemon.statStages[key]
    pokemon.statStages[key] = Math.max(-6, Math.min(6, before + stages))
    if (pokemon.statStages[key] !== before) {
      changedStats.push(stat)
    }
  }

  if (changedStats.length === 0) return undefined
  return `${pokemon.name}'s ${getAbilityName(pokemon)} raised ${changedStats.join(', ')}!`
}

export function getBattleAbilityStatMultiplier(params: {
  pokemon: BattlePokemon
  stat: 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed'
  stance?: BattleStance
  attackType?: string
  weather?: WeatherType
  currentTurn?: number
}): number {
  return getAbilityEffects(params.pokemon).reduce((multiplier, effect) => {
    if (effect.type !== 'battle-stat-multiplier') return multiplier
    if (effect.stat !== params.stat) return multiplier
    if (!matchesString(params.stance, effect.stance)) return multiplier
    if (!matchesString(params.attackType, effect.attackTypes)) return multiplier
    if (!matchesString(params.weather, effect.weather)) return multiplier
    if (!matchesPokemonStatus(params.pokemon, effect.statuses))
      return multiplier
    if (!matchesHpCondition(params.pokemon, effect)) return multiplier
    if (effect.heldItemLost && !params.pokemon.battleAbilityState?.heldItemLost) {
      return multiplier
    }
    if (typeof effect.activeTurnsAtOrBelow === 'number') {
      const activeTurn = getActiveTurnNumber(params.pokemon, params.currentTurn)
      if (typeof activeTurn === 'number' && activeTurn > effect.activeTurnsAtOrBelow) {
        return multiplier
      }
    }
    return multiplier * effect.multiplier
  }, 1)
}

export function resolveBattleAbilityBeforeMove(
  pokemon: BattlePokemon,
  currentTurn?: number,
): { canMove: boolean; message: string } {
  if (pokemon.currentHp <= 0) return { canMove: true, message: '' }

  const activeTurn = getActiveTurnNumber(pokemon, currentTurn)
  if (typeof activeTurn !== 'number') return { canMove: true, message: '' }

  for (const effect of getAbilityEffects(pokemon)) {
    if (effect.type !== 'battle-before-move-skip') continue
    if (effect.skipEveryActiveTurns <= 0) continue
    if (activeTurn < effect.firstSkipActiveTurn) continue
    if (
      (activeTurn - effect.firstSkipActiveTurn) %
        effect.skipEveryActiveTurns !==
      0
    ) {
      continue
    }

    pokemon.battleAbilityState ??= {}
    pokemon.battleAbilityState.lastBeforeMoveSkipTurn = currentTurn
    return {
      canMove: false,
      message: `${pokemon.name}'s ${getAbilityName(pokemon)} made it loaf around!`,
    }
  }

  return { canMove: true, message: '' }
}

export function applyBattleAbilityOpposingMoveUseDepletion(params: {
  state: BattleState
  attackerSide: BattleSide
  attacker: BattlePokemon
  defender: BattlePokemon
  move?: Pick<MoveConfig, 'target'>
}): string[] {
  const { state, attackerSide, attacker, defender, move } = params
  if (attacker.currentHp <= 0 || defender.currentHp <= 0) return []
  if (move?.target === 'self') return []

  const extraUses = getAbilityEffects(defender).reduce((total, effect) => {
    if (effect.type !== 'battle-opposing-move-use-depletion') return total
    return total + Math.max(0, Math.floor(effect.extraUses))
  }, 0)
  if (extraUses <= 0) return []

  const depleted = lowerPokemonMoveUses({
    state,
    side: attackerSide,
    pokemon: attacker,
    amount: extraUses,
  })
  if (depleted <= 0) return []

  const useText = depleted === 1 ? 'move use' : 'move uses'
  return [
    `${defender.name}'s ${getAbilityName(defender)} drained ${depleted} extra ${useText} from ${attacker.name}!`,
  ]
}

export function applyBattleAbilitySelfMoveLock(
  pokemon: BattlePokemon,
  move: Pick<MoveConfig, 'id' | 'name'>,
): string | undefined {
  if (pokemon.currentHp <= 0 || pokemon.encoredMove) return undefined
  const locksMove = getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-self-move-lock',
  )
  if (!locksMove) return undefined

  pokemon.encoredMove = {
    moveId: move.id,
    moveName: move.name,
    turnsRemaining: 1,
    permanent: true,
    source: 'ability',
  }

  return `${pokemon.name}'s ${getAbilityName(pokemon)} locked it into ${move.name}!`
}

export function clearBattleAbilitySelfMoveLock(pokemon: BattlePokemon): void {
  if (pokemon.encoredMove?.source === 'ability') {
    pokemon.encoredMove = undefined
  }
}

function isHealingMove(
  move: Pick<
    MoveConfig,
    'absorb' | 'description' | 'heal' | 'healFull' | 'weatherHeal'
  >,
): boolean {
  const description = move.description.toLowerCase()
  return Boolean(
    move.heal ||
      move.healFull ||
      move.weatherHeal ||
      (move.absorb ?? 0) > 0 ||
      description.includes('recover') ||
      description.includes('restore') ||
      description.includes('heal'),
  )
}

function isNonDamagingMove(
  move: Pick<MoveConfig, 'damage' | 'damageRule'>,
): boolean {
  return (move.damage ?? 0) <= 0 && !move.damageRule
}

export function getBattleAbilityPriorityMoveContest(params: {
  pokemon: BattlePokemon
  move?: Pick<
    MoveConfig,
    | 'absorb'
    | 'damage'
    | 'damageRule'
    | 'description'
    | 'forcedType'
    | 'heal'
    | 'healFull'
    | 'id'
    | 'weatherHeal'
  >
  attackType?: string
  random?: () => number
}): { abilityName: string } | undefined {
  const { pokemon, move } = params
  if (!move || pokemon.currentHp <= 0) return undefined

  for (const effect of getAbilityEffects(pokemon)) {
    if (effect.type !== 'battle-priority-move-contest') continue
    if (!matchesString(move.id, effect.moveIds)) continue
    if (!matchesString(params.attackType ?? move.forcedType, effect.attackTypes)) {
      continue
    }
    if (effect.nonDamagingOnly && !isNonDamagingMove(move)) continue
    if (effect.healingOnly && !isHealingMove(move)) continue
    if (!matchesHpCondition(pokemon, effect)) continue
    if (typeof effect.chance === 'number') {
      if (!params.random) continue
      if (params.random() * 100 >= effect.chance) continue
    }

    return { abilityName: getAbilityName(pokemon) }
  }

  return undefined
}

export function suppressesBattleCounterPreventionByAbility(
  pokemon: BattlePokemon,
): boolean {
  if (pokemon.currentHp <= 0) return false
  return getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-move-last',
  )
}

export function bypassesDefenderBattleAbilitiesByAbility(
  pokemon: BattlePokemon | undefined,
): boolean {
  if (!pokemon || pokemon.currentHp <= 0) return false
  return getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-defender-ability-bypass',
  )
}

export function getBattleAbilityDamageMultiplier(params: {
  attacker: BattlePokemon
  defender: BattlePokemon
  target: 'attacker' | 'defender'
  stance?: BattleStance
  attackType?: string
  weather?: WeatherType
  typeEffectiveness?: number
  movePower?: number
  moveId?: string
}): number {
  if (
    params.target === 'defender' &&
    bypassesDefenderBattleAbilitiesByAbility(params.attacker)
  ) {
    return 1
  }

  const pokemon =
    params.target === 'attacker' ? params.attacker : params.defender
  return getAbilityEffects(pokemon).reduce((multiplier, effect) => {
    if (effect.type !== 'battle-damage-multiplier') return multiplier
    if (effect.target !== params.target) return multiplier
    if (!matchesString(params.stance, effect.stance)) return multiplier
    if (!matchesString(params.attackType, effect.attackTypes)) return multiplier
    if (!matchesString(params.weather, effect.weather)) return multiplier
    if (!matchesString(params.moveId, effect.moveIds)) return multiplier
    if (!matchesPokemonStatus(pokemon, effect.statuses)) return multiplier
    if (!matchesHpCondition(pokemon, effect)) return multiplier
    if (
      effect.typeEffectiveness === 'super-effective' &&
      (params.typeEffectiveness ?? 1) <= 1
    ) {
      return multiplier
    }
    if (
      effect.typeEffectiveness === 'not-very-effective' &&
      !(
        (params.typeEffectiveness ?? 1) > 0 &&
        (params.typeEffectiveness ?? 1) < 1
      )
    ) {
      return multiplier
    }
    if (
      typeof effect.movePowerAtOrBelow === 'number' &&
      (params.movePower ?? 0) > effect.movePowerAtOrBelow
    ) {
      return multiplier
    }
    return multiplier * effect.multiplier
  }, 1)
}

export function getBattleAbilityTypeEffectivenessOverride(params: {
  attacker: BattlePokemon
  defender: BattlePokemon
  typeEffectiveness: number
}): number {
  if (bypassesDefenderBattleAbilitiesByAbility(params.attacker)) {
    return params.typeEffectiveness
  }

  return getAbilityEffects(params.defender).reduce((typeEffectiveness, effect) => {
    if (effect.type !== 'battle-type-effectiveness-override') {
      return typeEffectiveness
    }
    if (effect.target !== 'defender') return typeEffectiveness
    if (!sourceMatches(params.defender, effect.sourceFormIds)) {
      return typeEffectiveness
    }
    if (!matchesHpCondition(params.defender, effect)) return typeEffectiveness
    if (!Number.isFinite(effect.typeEffectiveness)) return typeEffectiveness
    return effect.typeEffectiveness
  }, params.typeEffectiveness)
}

export function blocksBattleStatusByAbility(
  pokemon: BattlePokemon,
  statusId: string,
  weather?: WeatherType,
): boolean {
  return getAbilityEffects(pokemon).some((effect) => {
    if (effect.type !== 'battle-status-immunity') return false
    if (!effect.statuses.includes(statusId)) return false
    if (!matchesPokemonTypes(pokemon, effect.pokemonTypes)) return false
    return matchesString(weather, effect.weather)
  })
}

export function bypassesBattleStatusApplicationByAbility(params: {
  sourcePokemon: BattlePokemon
  statusId: string
}): boolean {
  return getAbilityEffects(params.sourcePokemon).some((effect) => {
    if (effect.type !== 'battle-status-application-bypass') return false
    if (!matchesString(params.statusId, effect.statuses)) return false
    return true
  })
}

export function getBattleAbilityStatusCounterStep(
  pokemon: BattlePokemon,
  statusId: StatusEffectId,
): number {
  return getAbilityEffects(pokemon).reduce((step, effect) => {
    if (effect.type !== 'battle-status-counter-step') return step
    if (effect.status !== statusId) return step
    if (!Number.isFinite(effect.step)) return step
    return Math.max(step, Math.max(1, Math.floor(effect.step)))
  }, 1)
}

export function blocksBattleInterruptByAbility(pokemon: BattlePokemon): boolean {
  return getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-interrupt-immunity',
  )
}

export function blocksBattleMentalEffectByAbility(
  pokemon: BattlePokemon,
  effectId: string,
): boolean {
  const normalized = effectId.toLowerCase()
  return getAbilityEffects(pokemon).some((effect) => {
    if (effect.type !== 'battle-mental-effect-immunity') return false
    return effect.effectIds.some((entry) => entry.toLowerCase() === normalized)
  })
}

export function getBattleMentalEffectBlockMessage(
  pokemon: BattlePokemon,
  effectName: string,
): string {
  return `${pokemon.name}'s ${getAbilityName(pokemon)} protected it from ${effectName}!`
}

export function getBattleAbilityWinRewards(
  pokemon: BattlePokemon,
): Extract<AbilityEffect, { type: 'battle-win-rewards' }>[] {
  const hasHeldItem = Boolean(getRuntimeHeldItem(pokemon))
  return getAbilityEffects(pokemon).filter((effect): effect is Extract<
    AbilityEffect,
    { type: 'battle-win-rewards' }
  > => {
    if (effect.type !== 'battle-win-rewards') return false
    if (effect.holderNoHeldItem && hasHeldItem) return false
    return true
  })
}

export function blocksBattleStatStageDropByAbility(params: {
  pokemon: BattlePokemon
  stat: keyof NonNullable<BattlePokemon['statStages']>
  source: 'self' | 'opponent'
  sourcePokemon?: BattlePokemon
}): boolean {
  if (params.source !== 'opponent') return false
  if (bypassesDefenderBattleAbilitiesByAbility(params.sourcePokemon)) {
    return false
  }
  return getAbilityEffects(params.pokemon).some((effect) => {
    if (effect.type !== 'battle-stat-stage-immunity') return false
    if (effect.source && effect.source !== params.source) return false
    if (!matchesPokemonTypes(params.pokemon, effect.pokemonTypes)) return false
    return !effect.stats?.length || effect.stats.includes(params.stat)
  })
}

export function getBattleAbilityEffectiveOpponentStatStage(params: {
  pokemon: BattlePokemon
  opposingPokemon?: BattlePokemon
  stage: number
}): number {
  if (bypassesDefenderBattleAbilitiesByAbility(params.opposingPokemon)) {
    return params.stage
  }
  for (const effect of getAbilityEffects(params.pokemon)) {
    if (effect.type !== 'battle-opponent-stat-stage-bypass') continue
    if (effect.stages === 'all') return 0
    if (effect.stages === 'positive' && params.stage > 0) return 0
    if (effect.stages === 'negative' && params.stage < 0) return 0
  }
  return params.stage
}

export function getBattleStatStageDropBlockMessage(
  pokemon: BattlePokemon,
): string {
  return `${pokemon.name}'s ${getAbilityName(pokemon)} prevented the stat drop!`
}

export function blocksBattleCriticalHitByAbility(
  pokemon: BattlePokemon,
  attacker?: BattlePokemon,
): boolean {
  if (bypassesDefenderBattleAbilitiesByAbility(attacker)) return false
  return getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-crit-immunity',
  )
}

export function getBattleAbilityCritChanceDelta(pokemon: BattlePokemon): number {
  return getAbilityEffects(pokemon).reduce((total, effect) => {
    if (effect.type !== 'battle-crit-modifier') return total
    return total + (effect.chanceDelta ?? 0)
  }, 0)
}

export function getBattleAbilityCritDamageMultiplier(pokemon: BattlePokemon): number {
  return getAbilityEffects(pokemon).reduce((multiplier, effect) => {
    if (effect.type !== 'battle-crit-modifier') return multiplier
    return multiplier * (effect.damageMultiplier ?? 1)
  }, 1)
}

export function guaranteesBattleCriticalHitByAbility(params: {
  attacker: BattlePokemon
  defender: BattlePokemon
}): boolean {
  return getAbilityEffects(params.attacker).some((effect) => {
    if (effect.type !== 'battle-guaranteed-crit') return false
    if (!effect.targetStatuses?.length) return true
    const statusId = params.defender.status?.id
    return !!statusId && effect.targetStatuses.includes(statusId)
  })
}

function formatStatName(stat: keyof NonNullable<BattlePokemon['statStages']>): string {
  switch (stat) {
    case 'specialAttack':
      return 'Special Attack'
    case 'specialDefense':
      return 'Special Defense'
    case 'crit':
      return 'critical-hit chance'
    default:
      return stat[0].toUpperCase() + stat.slice(1)
  }
}

export function applyBattleAbilityAfterKoStatStages(
  pokemon: BattlePokemon,
): string[] {
  if (pokemon.currentHp <= 0) return []

  const messages: string[] = []
  for (const effect of getAbilityEffects(pokemon)) {
    if (effect.type !== 'battle-after-ko-stat-stage') continue
    pokemon.statStages ??= { ...DEFAULT_ABILITY_STAT_STAGES }
    const maxStage = effect.stat === 'crit' ? 3 : 6
    const before = pokemon.statStages[effect.stat]
    pokemon.statStages[effect.stat] = Math.max(
      -6,
      Math.min(maxStage, before + effect.stages),
    )
    if (pokemon.statStages[effect.stat] === before) continue
    messages.push(
      `${pokemon.name}'s ${getAbilityName(pokemon)} raised ${formatStatName(effect.stat)}!`,
    )
  }

  return messages
}

function applyBattleStatStageBoosts(params: {
  pokemon: BattlePokemon
  statBoosts: Partial<
    Record<keyof NonNullable<BattlePokemon['statStages']>, number>
  >
  abilityOwner?: BattlePokemon
}): string[] {
  const messages: string[] = []
  params.pokemon.statStages ??= { ...DEFAULT_ABILITY_STAT_STAGES }
  const abilityOwner = params.abilityOwner ?? params.pokemon

  for (const [stat, stages] of Object.entries(params.statBoosts)) {
    if (!stages) continue
    const statKey = stat as keyof NonNullable<BattlePokemon['statStages']>
    const maxStage = statKey === 'crit' ? 3 : 6
    const before = params.pokemon.statStages[statKey]
    params.pokemon.statStages[statKey] = Math.max(
      -6,
      Math.min(maxStage, before + stages),
    )
    if (params.pokemon.statStages[statKey] === before) continue
    const direction = stages > 0 ? 'raised' : 'lowered'
    const ownerLabel =
      abilityOwner === params.pokemon
        ? `${params.pokemon.name}'s ${getAbilityName(abilityOwner)}`
        : `${abilityOwner.name}'s ${getAbilityName(abilityOwner)}`
    messages.push(
      abilityOwner === params.pokemon
        ? `${ownerLabel} ${direction} ${formatStatName(statKey)}!`
        : `${ownerLabel} ${direction} ${params.pokemon.name}'s ${formatStatName(statKey)}!`,
    )
  }

  return messages
}

export function applyBattleAbilityStatStageDropTriggers(params: {
  pokemon: BattlePokemon
  source: 'self' | 'opponent'
}): string[] {
  if (params.pokemon.currentHp <= 0) return []

  const messages: string[] = []
  for (const effect of getAbilityEffects(params.pokemon)) {
    if (effect.type !== 'battle-stat-stage-drop-trigger') continue
    if (effect.source && effect.source !== params.source) continue
    messages.push(
      ...applyBattleStatStageBoosts({
        pokemon: params.pokemon,
        statBoosts: effect.statBoosts,
      }),
    )
  }

  return messages
}

export function applyBattleAbilityStatStageDropReflection(params: {
  pokemon: BattlePokemon
  opponent: BattlePokemon
  stat: keyof NonNullable<BattlePokemon['statStages']>
  stages: number
  source: 'self' | 'opponent'
  sourcePokemon?: BattlePokemon
}): {
  reflected: boolean
  changed: boolean
  messages: string[]
} {
  if (
    params.stages >= 0 ||
    params.source !== 'opponent' ||
    params.pokemon.currentHp <= 0 ||
    params.opponent.currentHp <= 0 ||
    bypassesDefenderBattleAbilitiesByAbility(params.sourcePokemon)
  ) {
    return { reflected: false, changed: false, messages: [] }
  }

  for (const effect of getAbilityEffects(params.pokemon)) {
    if (effect.type !== 'battle-stat-stage-drop-reflect') continue
    if (effect.source && effect.source !== params.source) continue
    if (effect.stats?.length && !effect.stats.includes(params.stat)) continue

    const messages = [
      `${params.pokemon.name}'s ${getAbilityName(params.pokemon)} reflected the stat drop!`,
    ]
    const statMessages = applyBattleStatStageBoosts({
      pokemon: params.opponent,
      abilityOwner: params.pokemon,
      statBoosts: { [params.stat]: params.stages },
    })
    messages.push(...statMessages)
    return {
      reflected: true,
      changed: statMessages.length > 0,
      messages,
    }
  }

  return { reflected: false, changed: false, messages: [] }
}

export function applyBattleAbilityOpponentStatStageBoostCopy(params: {
  pokemon: BattlePokemon
  boostedPokemon: BattlePokemon
  stat: keyof NonNullable<BattlePokemon['statStages']>
  stages: number
}): string[] {
  if (
    params.stages <= 0 ||
    params.pokemon === params.boostedPokemon ||
    params.pokemon.currentHp <= 0 ||
    params.boostedPokemon.currentHp <= 0
  ) {
    return []
  }

  const messages: string[] = []
  for (const effect of getAbilityEffects(params.pokemon)) {
    if (effect.type !== 'battle-opponent-stat-stage-boost-copy') continue
    messages.push(
      ...applyBattleStatStageBoosts({
        pokemon: params.pokemon,
        statBoosts: { [params.stat]: params.stages },
      }),
    )
  }

  return messages
}

export function blocksBattleOutgoingDamageReductionByAbility(
  pokemon: BattlePokemon,
): boolean {
  return getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-outgoing-damage-reduction-immunity',
  )
}

function pokemonHasAnyBattleType(
  pokemon: BattlePokemon,
  types?: readonly string[],
): boolean {
  if (!types?.length) return false
  const normalizedTypes = new Set(types.map((type) => type.toLowerCase()))
  return getEffectiveBattleTypes(pokemon).some((type) =>
    normalizedTypes.has(type.toLowerCase()),
  )
}

function pokemonHasAnyAbility(
  pokemon: BattlePokemon,
  abilityIds?: readonly string[],
): boolean {
  if (!abilityIds?.length) return false
  const abilityId =
    typeof pokemon.ability === 'string' ? pokemon.ability.toLowerCase() : ''
  return abilityIds.some((id) => id.toLowerCase() === abilityId)
}

export function getBattleAbilitySwitchPreventionMessage(params: {
  trapper: BattlePokemon
  switchingPokemon: BattlePokemon
}): string | undefined {
  if (params.trapper.currentHp <= 0 || params.switchingPokemon.currentHp <= 0) {
    return undefined
  }
  if (
    getAbilityEffects(params.switchingPokemon).some(
      (effect) => effect.type === 'battle-switch-prevention-immunity',
    )
  ) {
    return undefined
  }

  for (const effect of getAbilityEffects(params.trapper)) {
    if (effect.type !== 'battle-switch-prevention') continue
    if (
      effect.affectedTypes?.length &&
      !pokemonHasAnyBattleType(params.switchingPokemon, effect.affectedTypes)
    ) {
      continue
    }
    if (pokemonHasAnyBattleType(params.switchingPokemon, effect.excludedTypes)) {
      continue
    }
    if (pokemonHasAnyAbility(params.switchingPokemon, effect.excludedAbilities)) {
      continue
    }
    return `${params.switchingPokemon.name} cannot switch out because of ${params.trapper.name}'s ${getAbilityName(params.trapper)}.`
  }

  return undefined
}

export function blocksBattleForcedSwitchByAbility(
  pokemon: BattlePokemon,
): boolean {
  return getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-forced-switch-immunity',
  )
}

export function getBattleHeldItemProtectionMessage(
  pokemon: BattlePokemon,
): string | undefined {
  if (pokemon.currentHp <= 0) return undefined
  const protectsHeldItem = getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-held-item-protection',
  )
  if (!protectsHeldItem) return undefined
  return `${pokemon.name}'s ${getAbilityName(pokemon)} protected its held item!`
}

export function suppressesBattleHeldItemEffectsByAbility(
  pokemon: Pick<BattlePokemon, 'ability'>,
): boolean {
  return getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-held-item-effect-suppression',
  )
}

export function getBattleBerryEffectMultiplier(pokemon: BattlePokemon): number {
  if (pokemon.currentHp <= 0) return 1
  return getAbilityEffects(pokemon).reduce((multiplier, effect) => {
    if (effect.type !== 'battle-berry-effect-multiplier') return multiplier
    return multiplier * effect.multiplier
  }, 1)
}

export function getBattleBerryTriggerThresholdPercent(
  pokemon: BattlePokemon,
  defaultThresholdPercent: number,
): number {
  if (pokemon.currentHp <= 0) return defaultThresholdPercent
  return getAbilityEffects(pokemon).reduce((threshold, effect) => {
    if (effect.type !== 'battle-berry-trigger-threshold') return threshold
    return Math.max(threshold, effect.thresholdPercent)
  }, defaultThresholdPercent)
}

export function applyBattleBerryConsumedAbilityEffects(
  pokemon: BattlePokemon,
): string[] {
  if (pokemon.currentHp <= 0) return []

  const messages: string[] = []
  for (const effect of getAbilityEffects(pokemon)) {
    if (effect.type !== 'battle-berry-consume-heal') continue
    if (pokemon.currentHp >= pokemon.maxHp) continue

    const healing = Math.max(
      1,
      Math.floor((pokemon.maxHp * effect.healPercent) / 100),
    )
    const oldHp = pokemon.currentHp
    pokemon.currentHp = Math.min(pokemon.maxHp, pokemon.currentHp + healing)
    const actualHealing = pokemon.currentHp - oldHp
    if (actualHealing > 0) {
      messages.push(
        `${pokemon.name}'s ${getAbilityName(pokemon)} restored ${actualHealing} HP!`,
      )
    }
  }

  return messages
}

export function getBattleConsumedBerryRestoreChance(
  pokemon: BattlePokemon,
  weather?: WeatherType,
): number {
  if (pokemon.currentHp <= 0) return 0

  return getAbilityEffects(pokemon).reduce((chance, effect) => {
    if (effect.type !== 'battle-consumed-berry-restore') return chance
    if (
      typeof effect.weatherChance === 'number' &&
      weather &&
      matchesString(weather, effect.weather)
    ) {
      return Math.max(chance, effect.weatherChance)
    }
    return Math.max(chance, effect.chance)
  }, 0)
}

function blocksBattleContactEffectsByAbility(pokemon: BattlePokemon): boolean {
  return getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-contact-effect-immunity',
  )
}

export function applyBattleAbilitySwitchOutEffects(
  pokemon: BattlePokemon,
): string[] {
  if (pokemon.currentHp <= 0) return []

  const messages: string[] = []
  for (const effect of getAbilityEffects(pokemon)) {
    if (effect.type === 'battle-switch-out-status-cure') {
      if (!pokemon.status) continue
      if (
        effect.statuses?.length &&
        !effect.statuses.includes(pokemon.status.id)
      ) {
        continue
      }
      pokemon.status = undefined
      messages.push(`${pokemon.name}'s ${getAbilityName(pokemon)} cured its status!`)
    }

    if (effect.type === 'battle-switch-out-heal') {
      if (pokemon.currentHp >= pokemon.maxHp) continue
      const healing = Math.max(
        1,
        Math.floor((pokemon.maxHp * effect.healPercent) / 100),
      )
      const oldHp = pokemon.currentHp
      pokemon.currentHp = Math.min(pokemon.maxHp, pokemon.currentHp + healing)
      const actualHealing = pokemon.currentHp - oldHp
      if (actualHealing > 0) {
        messages.push(
          `${pokemon.name}'s ${getAbilityName(pokemon)} restored ${actualHealing} HP!`,
        )
      }
    }
  }

  return messages
}

export function getBattleAbilityLowHpSelfSwitchMessage(params: {
  pokemon: BattlePokemon
  previousHp: number
  damage: number
}): string | undefined {
  if (params.damage <= 0 || params.pokemon.currentHp <= 0) return undefined

  for (const effect of getAbilityEffects(params.pokemon)) {
    if (effect.type !== 'battle-low-hp-self-switch') continue
    const threshold =
      (params.pokemon.maxHp * effect.hpCrossedAtOrBelowPercent) / 100
    if (!(params.previousHp > threshold && params.pokemon.currentHp <= threshold)) {
      continue
    }
    return `${params.pokemon.name}'s ${getAbilityName(params.pokemon)} made it retreat!`
  }

  return undefined
}

export function applyBattleAbilityOnDamagedStatStages(params: {
  defender: BattlePokemon
  attacker: BattlePokemon
  damage: number
  previousHp: number
  attackStance?: BattleStance
  attackType?: string
  criticalHit?: boolean
  weather?: WeatherType
  state?: BattleState
  defenderSide?: BattleSide
  random?: () => number
}): string[] {
  if (params.damage <= 0) return []

  const messages: string[] = []
  if (params.defender.battleAbilityState?.illusionMask) {
    params.defender.battleAbilityState.illusionMask = undefined
    messages.push(`${params.defender.name}'s Illusion wore off!`)
  }

  const normalizedAttackType = params.attackType?.toLowerCase()
  const random = params.random ?? Math.random
  const attackerBlocksContactEffects = blocksBattleContactEffectsByAbility(
    params.attacker,
  )
  for (const effect of getAbilityEffects(params.defender)) {
    if (effect.type === 'battle-on-damaged-stat-stage') {
      if (effect.criticalHit && !params.criticalHit) continue
      if (
        effect.attackTypes?.length &&
        (!normalizedAttackType ||
          !effect.attackTypes.some(
            (type) => type.toLowerCase() === normalizedAttackType,
          ))
      ) {
        continue
      }
      if (typeof effect.hpCrossedAtOrBelowPercent === 'number') {
        const threshold =
          (params.defender.maxHp * effect.hpCrossedAtOrBelowPercent) / 100
        if (
          !(params.previousHp > threshold && params.defender.currentHp <= threshold)
        ) {
          continue
        }
      }

      const target = effect.target === 'attacker' ? params.attacker : params.defender
      if (target.currentHp <= 0) continue
      messages.push(
        ...applyBattleStatStageBoosts({
          pokemon: target,
          abilityOwner: params.defender,
          statBoosts: effect.statBoosts,
        }),
      )
      continue
    }

    if (effect.type === 'battle-on-damaged-status') {
      if (attackerBlocksContactEffects) continue
      if (random() * 100 >= effect.chance) continue
      const target = effect.target === 'self' ? params.defender : params.attacker
      if (target.currentHp <= 0 || !effect.statuses.length) continue
      const statusIndex = Math.floor(random() * effect.statuses.length)
      const statusId = effect.statuses[statusIndex]
      if (!statusId) continue
      const result = applyStatus(target, statusId, params.weather, {
        terrain: params.state?.terrain?.terrain,
        sourcePokemon: params.defender,
      })
      if (result.applied) {
        messages.push(
          `${params.defender.name}'s ${getAbilityName(params.defender)} activated!`,
          result.message,
        )
      }
      continue
    }

    if (effect.type === 'battle-on-damaged-secondary-status') {
      if (attackerBlocksContactEffects) continue
      if (!effect.effects.length || random() * 100 >= effect.chance) continue
      const targets =
        effect.target === 'both'
          ? [params.defender, params.attacker]
          : [effect.target === 'self' ? params.defender : params.attacker]
      let applied = false

      for (const target of targets) {
        if (target.currentHp <= 0) continue
        if (
          effect.requiresOppositeGender &&
          !hasOppositeNonGenderlessGenders(params.defender, target)
        ) {
          continue
        }

        target.secondaryStatuses = addOrReplaceBattleAbilitySecondaryStatus(
          target.secondaryStatuses,
          {
            id: effect.statusId,
            name: effect.name || effect.statusId,
            triggers: effect.triggers ?? [],
            effects: effect.effects,
            sourceSide: params.defenderSide ?? 'enemy',
            target: 'pokemon',
            remainingTurns: effect.turns,
            delayTurns: effect.delayTurns,
          },
        )
        applied = true
      }
      if (applied) {
        messages.push(
          `${params.defender.name}'s ${getAbilityName(params.defender)} activated!`,
          `${effect.name || effect.statusId} took hold.`,
        )
      }
      continue
    }

    if (effect.type === 'battle-on-damaged-side-secondary-status') {
      if (attackerBlocksContactEffects) continue
      if (!params.state || !params.defenderSide) continue
      if (!effect.effects.length || random() * 100 >= effect.chance) continue
      const targetSide =
        effect.targetSide === 'defender'
          ? params.defenderSide
          : oppositeBattleSide(params.defenderSide)
      params.state.secondaryStatuses = addOrReplaceBattleAbilitySecondaryStatus(
        params.state.secondaryStatuses,
        {
          id: effect.statusId,
          name: effect.name || effect.statusId,
          triggers: ['switch'],
          effects: effect.effects,
          sourceSide: params.defenderSide,
          target: 'side',
          targetSide,
          remainingTurns: effect.turns,
        },
      )
      messages.push(
        `${params.defender.name}'s ${getAbilityName(params.defender)} scattered ${effect.name || effect.statusId}!`,
      )
      continue
    }

    if (effect.type === 'battle-on-damaged-ability-change') {
      if (attackerBlocksContactEffects) continue
      if (params.attacker.currentHp <= 0 || random() * 100 >= effect.chance) {
        continue
      }

      if (effect.mode === 'replace-attacker') {
        const nextAbility = effect.abilityId ?? params.defender.ability
        if (!nextAbility || params.attacker.ability === nextAbility) continue
        rememberOriginalBattleAbility(params.attacker)
        params.attacker.ability = nextAbility
        messages.push(
          `${params.defender.name}'s ${getAbilityName(params.defender)} changed ${params.attacker.name}'s ability to ${getAbilityDisplayName(nextAbility)}!`,
        )
        continue
      }

      if (effect.mode === 'swap') {
        const defenderAbility = params.defender.ability
        const attackerAbility = params.attacker.ability
        if (!defenderAbility || !attackerAbility || defenderAbility === attackerAbility) {
          continue
        }
        rememberOriginalBattleAbility(params.defender)
        rememberOriginalBattleAbility(params.attacker)
        params.defender.ability = attackerAbility
        params.attacker.ability = defenderAbility
        messages.push(
          `${params.defender.name}'s ${getAbilityDisplayName(defenderAbility)} swapped abilities with ${params.attacker.name}!`,
        )
        continue
      }
    }

    if (effect.type === 'battle-on-damaged-stance-disable') {
      if (!params.attackStance || params.attacker.currentHp <= 0) continue
      if (random() * 100 >= effect.chance) continue
      if (blocksBattleMentalEffectByAbility(params.attacker, 'cursed-body')) {
        messages.push(
          getBattleMentalEffectBlockMessage(params.attacker, getAbilityName(params.defender)),
        )
        continue
      }
      messages.push(
        `${params.defender.name}'s ${getAbilityName(params.defender)} activated!`,
        applyStanceDisable({
          pokemon: params.attacker,
          stance: params.attackStance,
          turns: effect.turns,
          currentTurn: params.state?.turn,
          random,
        }),
      )
      continue
    }

    if (effect.type === 'battle-on-damaged-terrain-set') {
      if (!params.state || !isTerrainType(effect.terrain)) continue
      if (random() * 100 >= (effect.chance ?? 100)) continue
      const terrain = effect.terrain as TerrainType
      if (params.state.terrain?.terrain === terrain) continue
      const originalTerrain = params.state.terrain?.terrain
      params.state.terrain = {
        terrain,
        label: TERRAIN_LABELS[terrain],
        source: 'ability',
        originalTerrain,
        overriddenAtTurn: params.state.turn,
        overriddenBy: `${params.defender.name}'s ${getAbilityName(params.defender)}`,
      }
      messages.push(
        `${params.defender.name}'s ${getAbilityName(params.defender)} created ${TERRAIN_LABELS[terrain]}!`,
      )
      continue
    }

    if (effect.type === 'battle-on-damaged-type-change') {
      if (!normalizedAttackType || params.defender.teraTypeOverride) continue
      messages.push(
        ...applyBattleTypeOverride({
          pokemon: params.defender,
          nextType: normalizedAttackType,
        }),
      )
      continue
    }

    if (effect.type === 'battle-on-damaged-held-item-steal') {
      if (attackerBlocksContactEffects) continue
      if (random() * 100 >= (effect.chance ?? 100)) continue
      const message = stealRuntimeHeldItem({
        thief: params.defender,
        target: params.attacker,
        thiefAbilityOwner: params.defender,
      })
      if (message) messages.push(message)
      continue
    }

    if (effect.type === 'battle-on-damaged-damage') {
      if (attackerBlocksContactEffects) continue
      const target = params.attacker
      if (target.currentHp <= 0) continue
      if (!Number.isFinite(effect.maxHpFraction) || effect.maxHpFraction <= 0) {
        continue
      }
      const chipDamage = Math.max(
        1,
        Math.floor(target.maxHp / effect.maxHpFraction),
      )
      const actualDamage = Math.min(target.currentHp, chipDamage)
      target.currentHp = Math.max(0, target.currentHp - chipDamage)
      messages.push(
        `${target.name} was hurt by ${params.defender.name}'s ${getAbilityName(params.defender)}! [icon:damage:${actualDamage}]`,
      )
    }

    if (effect.type === 'battle-on-damaged-ko-damage') {
      if (effect.contactOnly && attackerBlocksContactEffects) continue
      if (params.defender.currentHp > 0) continue
      const target = params.attacker
      if (target.currentHp <= 0) continue
      const rawDamage =
        effect.damage.type === 'attacker-max-hp-fraction'
          ? Math.floor(target.maxHp / effect.damage.fraction)
          : params.damage
      const koDamage = Math.max(1, Math.min(target.currentHp, rawDamage))
      target.currentHp = Math.max(0, target.currentHp - koDamage)
      messages.push(
        `${target.name} was hurt by ${params.defender.name}'s ${getAbilityName(params.defender)}! [icon:damage:${koDamage}]`,
      )
    }
  }

  for (const effect of getAbilityEffects(params.attacker)) {
    if (effect.type === 'battle-post-damage-status') {
      if (params.defender.currentHp <= 0 || !effect.statuses.length) continue
      if (random() * 100 >= effect.chance) continue
      const statusIndex = Math.floor(random() * effect.statuses.length)
      const statusId = effect.statuses[statusIndex]
      if (!statusId) continue
      const result = applyStatus(params.defender, statusId, params.weather, {
        terrain: params.state?.terrain?.terrain,
        sourcePokemon: params.attacker,
      })
      if (result.applied) {
        messages.push(
          `${params.attacker.name}'s ${getAbilityName(params.attacker)} activated!`,
          result.message,
        )
      }
      continue
    }

    if (effect.type === 'battle-post-damage-held-item-steal') {
      if (random() * 100 >= (effect.chance ?? 100)) continue
      const message = stealRuntimeHeldItem({
        thief: params.attacker,
        target: params.defender,
        thiefAbilityOwner: params.attacker,
      })
      if (message) messages.push(message)
    }
  }

  return messages
}

export function applyBattleAbilityStatusReflection(params: {
  pokemon: BattlePokemon
  source: BattlePokemon
  statusId: StatusEffectId
  weather?: WeatherType
  state?: BattleState
}): string[] {
  if (params.pokemon === params.source) return []
  if (params.pokemon.currentHp <= 0 || params.source.currentHp <= 0) return []

  const messages: string[] = []
  for (const effect of getAbilityEffects(params.pokemon)) {
    if (effect.type !== 'battle-status-reflection') continue
    if (!effect.statuses.includes(params.statusId)) continue

    const result = applyStatus(params.source, params.statusId, params.weather, {
      terrain: params.state?.terrain?.terrain,
      sourcePokemon: params.pokemon,
    })
    if (!result.applied) continue

    messages.push(
      `${params.pokemon.name}'s ${getAbilityName(params.pokemon)} synchronized ${params.source.name}!`,
      result.message,
    )
  }
  return messages
}

export function blocksBattleRecoilDamageByAbility(
  pokemon: BattlePokemon,
  move: Pick<MoveConfig, 'damage' | 'description' | 'selfDamage' | 'target'>,
): boolean {
  if (!isRecoilSelfDamageMove(move)) return false
  return getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-recoil-immunity',
  )
}

export function getBattleRecoilDamageBlockMessage(
  pokemon: BattlePokemon,
  move: Pick<MoveConfig, 'damage' | 'description' | 'selfDamage' | 'target'>,
): string | undefined {
  if (!blocksBattleRecoilDamageByAbility(pokemon, move)) return undefined
  return `${pokemon.name}'s ${getAbilityName(pokemon)} prevented recoil damage!`
}

export function blocksBattleIndirectDamageByAbility(
  pokemon: BattlePokemon,
): boolean {
  if (pokemon.currentHp <= 0) return false
  return getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-indirect-damage-immunity',
  )
}

export function getBattleIndirectDamageBlockMessage(
  pokemon: BattlePokemon,
  sourceName: string,
): string | undefined {
  if (!blocksBattleIndirectDamageByAbility(pokemon)) return undefined
  return `${pokemon.name}'s ${getAbilityName(pokemon)} prevented damage from ${sourceName}.`
}

export function getBattleAbilityRecoilMoveDamageMultiplier(
  pokemon: BattlePokemon,
  move: Pick<MoveConfig, 'damage' | 'description' | 'selfDamage' | 'target'>,
): number {
  if (!isRecoilSelfDamageMove(move)) return 1

  return getAbilityEffects(pokemon).reduce((multiplier, effect) => {
    if (effect.type !== 'battle-recoil-damage-multiplier') return multiplier
    return multiplier * effect.multiplier
  }, 1)
}

export function usesBattleAbilityMaxMultiHitDamage(
  pokemon: BattlePokemon,
  move: Pick<MoveConfig, 'damageRange' | 'multiHit'>,
): boolean {
  if (!move.multiHit || !move.damageRange) return false
  if (move.multiHit.maxHits <= move.multiHit.minHits) return false
  return getAbilityEffects(pokemon).some((effect) => effect.type === 'battle-multi-hit-max')
}

export function getBattleAbilityExtraHitDamageMultiplier(
  pokemon: BattlePokemon,
  move?: Pick<MoveConfig, 'damageRange' | 'multiHit'>,
): number {
  if (move?.multiHit) return 0
  return getAbilityEffects(pokemon).reduce((multiplier, effect) => {
    if (effect.type !== 'battle-extra-hit') return multiplier
    if (!Number.isFinite(effect.damageMultiplier) || effect.damageMultiplier <= 0) {
      return multiplier
    }
    return Math.max(multiplier, effect.damageMultiplier)
  }, 0)
}

type AddedEffectMove = Partial<
  Pick<
    MoveConfig,
    | 'damage'
    | 'damageRule'
    | 'delayedDamage'
    | 'target'
    | 'status'
    | 'debuffs'
    | 'additionalStatuses'
    | 'randomStatuses'
    | 'secondaryStatuses'
    | 'disableStance'
    | 'interruptEnemyMove'
  >
>

function isDamagingMove(move: AddedEffectMove): boolean {
  return (move.damage ?? 0) > 0 || Boolean(move.damageRule || move.delayedDamage)
}

export function hasBattleMoveTargetSideAddedEffects(move: AddedEffectMove): boolean {
  return Boolean(
    (move.status && (move.status.target ?? move.target ?? 'enemy') !== 'self') ||
      move.debuffs?.some((debuff) => (debuff.target ?? 'enemy') === 'enemy') ||
      move.additionalStatuses?.some((status) => status.target !== 'self') ||
      move.randomStatuses ||
      move.secondaryStatuses?.some((status) => status.target.startsWith('enemy')) ||
      (move.disableStance && move.target !== 'self') ||
      move.interruptEnemyMove,
  )
}

export function getBattleAbilityAddedEffectMoveDamageMultiplier(
  pokemon: BattlePokemon,
  move: AddedEffectMove,
): number {
  if (!isDamagingMove(move) || !hasBattleMoveTargetSideAddedEffects(move)) return 1
  return getAbilityEffects(pokemon).reduce((multiplier, effect) => {
    if (effect.type !== 'battle-added-effect-damage-boost') return multiplier
    return multiplier * effect.multiplier
  }, 1)
}

export function suppressesBattleMoveAddedEffectsByAbility(
  pokemon: BattlePokemon,
  move: AddedEffectMove,
): boolean {
  if (!isDamagingMove(move) || !hasBattleMoveTargetSideAddedEffects(move)) return false
  return getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-added-effect-damage-boost',
  )
}

export function getBattleAbilitySecondaryEffectChance(
  pokemon: BattlePokemon,
  move: AddedEffectMove,
  chance: number | undefined,
): number {
  let result = chance ?? 100
  if (!isDamagingMove(move) || !hasBattleMoveTargetSideAddedEffects(move)) {
    return Math.max(0, Math.min(100, result))
  }
  for (const effect of getAbilityEffects(pokemon)) {
    if (effect.type !== 'battle-secondary-effect-chance-multiplier') continue
    result *= effect.multiplier
  }
  return Math.max(0, Math.min(100, result))
}

export function getBattleAbilityMoveInterruptChance(
  pokemon: BattlePokemon,
  move: AddedEffectMove,
  chance: number | undefined,
): number {
  let result = chance ?? 0
  if (!isDamagingMove(move)) return Math.max(0, Math.min(100, result))
  for (const effect of getAbilityEffects(pokemon)) {
    if (effect.type !== 'battle-damaging-move-interrupt-chance') continue
    result = Math.max(result, effect.chance)
  }
  return Math.max(0, Math.min(100, result))
}

export function processBattleAbilityWeatherTurnEffects(params: {
  playerMon: BattlePokemon
  enemyMon: BattlePokemon
  playerName: string
  enemyName: string
  weather?: WeatherType
}): string[] {
  const { playerMon, enemyMon, playerName, enemyName, weather } = params
  if (!weather) return []

  const messages: string[] = []
  const processPokemon = (pokemon: BattlePokemon, ownerName: string) => {
    if (pokemon.currentHp <= 0) return

    for (const effect of getAbilityEffects(pokemon)) {
      if (
        effect.type !== 'battle-weather-turn-heal' &&
        effect.type !== 'battle-weather-turn-damage'
      ) {
        continue
      }
      if (!matchesString(weather, effect.weather)) continue

      if (effect.type === 'battle-weather-turn-heal') {
        if (pokemon.currentHp >= pokemon.maxHp) continue
        const healing = Math.max(
          1,
          Math.floor((pokemon.maxHp * effect.healPercent) / 100),
        )
        const oldHp = pokemon.currentHp
        pokemon.currentHp = Math.min(pokemon.maxHp, pokemon.currentHp + healing)
        const actualHealing = pokemon.currentHp - oldHp
        if (actualHealing > 0) {
          messages.push(
            `${ownerName}'s ${pokemon.name}'s ${getAbilityName(pokemon)} restored ${actualHealing} HP! [icon:heal:${actualHealing}]`,
          )
        }
        continue
      }

      const damage = Math.max(
        1,
        Math.floor((pokemon.maxHp * effect.damagePercent) / 100),
      )
      const actualDamage = Math.min(pokemon.currentHp, damage)
      pokemon.currentHp = Math.max(0, pokemon.currentHp - damage)
      messages.push(
        `${ownerName}'s ${pokemon.name}'s ${getAbilityName(pokemon)} hurt it! [icon:damage:${actualDamage}]`,
      )
    }
  }

  processPokemon(playerMon, playerName)
  processPokemon(enemyMon, enemyName)

  return messages
}

export function processBattleAbilityTurnEndEffects(params: {
  playerMon: BattlePokemon
  enemyMon: BattlePokemon
  playerName: string
  enemyName: string
  random?: () => number
}): string[] {
  const {
    playerMon,
    enemyMon,
    playerName,
    enemyName,
    random = Math.random,
  } = params
  const messages: string[] = []

  const processPokemon = (pokemon: BattlePokemon, ownerName: string) => {
    if (pokemon.currentHp <= 0 || !pokemon.status) return

    for (const effect of getAbilityEffects(pokemon)) {
      if (effect.type !== 'battle-turn-end-status-cure') continue
      if (effect.statuses?.length && !matchesString(pokemon.status.id, effect.statuses)) {
        continue
      }
      if (random() >= effect.chance) continue

      const curedStatus = pokemon.status.id
      pokemon.status = undefined
      messages.push(
        `${ownerName}'s ${pokemon.name}'s ${getAbilityName(pokemon)} cured ${curedStatus}!`,
      )
      return
    }
  }

  processPokemon(playerMon, playerName)
  processPokemon(enemyMon, enemyName)

  return messages
}

export function getBattleAbilityStatusTurnHeal(params: {
  pokemon: BattlePokemon
  statusId: string
}): number {
  for (const effect of getAbilityEffects(params.pokemon)) {
    if (effect.type !== 'battle-status-turn-heal') continue
    if (!matchesString(params.statusId, effect.statuses)) continue
    return effect.healPercent
  }
  return 0
}

export function getBattleAbilityStatusTurnDamage(params: {
  pokemon: BattlePokemon
  statusId: string
}): number {
  for (const effect of getAbilityEffects(params.pokemon)) {
    if (effect.type !== 'battle-status-turn-damage') continue
    if (!matchesString(params.statusId, effect.statuses)) continue
    return effect.damagePercent
  }
  return 0
}

export function getBattleAbilityStatusTurnDamageMessage(params: {
  pokemon: BattlePokemon
  sourcePokemon: BattlePokemon
  ownerName: string
  damage: number
  sourceName?: string
}): string {
  const sourceLabel = params.sourceName
    ? `${params.sourceName}`
    : `${params.sourcePokemon.name}'s ${getAbilityName(params.sourcePokemon)}`
  return `${params.ownerName}'s ${params.pokemon.name} is hurt by ${sourceLabel}. [icon:damage:${params.damage}]`
}

export function getBattleAbilityStatusTurnHealMessage(params: {
  pokemon: BattlePokemon
  ownerName: string
  healing: number
}): string {
  return `${params.ownerName}'s ${params.pokemon.name}'s ${getAbilityName(params.pokemon)} restored ${params.healing} HP! [icon:heal:${params.healing}]`
}

export function getBattleAbilityMoveBlockMessage(
  defender: BattlePokemon,
  move:
    | (Pick<MoveConfig, 'id' | 'name'> &
        Partial<
          Pick<
            MoveConfig,
            | 'damage'
            | 'damageRule'
            | 'delayedDamage'
            | 'target'
            | 'status'
            | 'debuffs'
            | 'additionalStatuses'
            | 'randomStatuses'
            | 'secondaryStatuses'
            | 'disableStance'
            | 'moveLockEffect'
            | 'statusTransfer'
          >
        >)
    | undefined,
  attacker?: BattlePokemon,
): string | undefined {
  if (!move || defender.currentHp <= 0) return undefined

  for (const effect of getAbilityEffects(defender)) {
    if (effect.type !== 'battle-move-block') continue
    if (!effect.moveIds.includes(move.id)) continue
    if (bypassesDefenderBattleAbilitiesByAbility(attacker)) continue
    return `${defender.name}'s ${getAbilityName(defender)} blocked ${move.name}!`
  }

  const isIncomingStatusMove =
    move.target === 'enemy' &&
    (move.damage ?? 0) <= 0 &&
    !move.damageRule &&
    !move.delayedDamage &&
    Boolean(
      move.status ||
        move.debuffs?.length ||
        move.additionalStatuses?.length ||
        move.randomStatuses ||
        move.secondaryStatuses?.length ||
        move.disableStance ||
        move.moveLockEffect ||
        move.statusTransfer,
    )
  if (isIncomingStatusMove && !bypassesDefenderBattleAbilitiesByAbility(attacker)) {
    for (const effect of getAbilityEffects(defender)) {
      if (effect.type === 'battle-status-move-immunity') {
        return `${defender.name}'s ${getAbilityName(defender)} blocked ${move.name}!`
      }
      if (effect.type === 'battle-status-move-reflect') {
        return `${defender.name}'s ${getAbilityName(defender)} bounced back ${move.name}!`
      }
    }
  }

  if (attacker?.currentHp && attacker.currentHp > 0) {
    for (const effect of getAbilityEffects(attacker)) {
      if (effect.type !== 'battle-move-block') continue
      if (effect.scope !== 'field') continue
      if (!effect.moveIds.includes(move.id)) continue
      return `${attacker.name}'s ${getAbilityName(attacker)} blocked ${move.name}!`
    }
  }

  return undefined
}

export function getBattleSecondaryEffectBlockMessage(params: {
  defender: BattlePokemon
  move: Partial<
    Pick<
      MoveConfig,
      | 'damage'
      | 'damageRule'
      | 'delayedDamage'
      | 'status'
      | 'debuffs'
      | 'additionalStatuses'
      | 'randomStatuses'
      | 'secondaryStatuses'
      | 'disableStance'
      | 'interruptEnemyMove'
    >
  >
  damageDealt?: number
}): string | undefined {
  const { defender, move } = params
  if (defender.currentHp <= 0) return undefined
  if ((params.damageDealt ?? 0) <= 0 && !isDamagingMove(move)) return undefined
  if (!hasBattleMoveTargetSideAddedEffects(move)) return undefined
  return getAbilityEffects(defender).some(
    (effect) => effect.type === 'battle-secondary-effect-immunity',
  )
    ? `${defender.name}'s ${getAbilityName(defender)} blocked the added effects!`
    : undefined
}

export function getBattleAbilityMoveAccuracy(params: {
  attacker: BattlePokemon
  defender?: BattlePokemon
  move?: Pick<MoveConfig, 'damage' | 'target'>
  accuracy: number
  weather?: WeatherType
}): number {
  if (params.attacker.currentHp <= 0) return params.accuracy

  const attackerEffects = getAbilityEffects(params.attacker)
  const defenderEffects =
    params.defender && params.defender.currentHp > 0
      ? getAbilityEffects(params.defender)
      : []

  if (
    attackerEffects.some((effect) => effect.type === 'battle-move-accuracy-bypass') ||
    defenderEffects.some((effect) => effect.type === 'battle-move-accuracy-bypass')
  ) {
    return 100
  }

  const applyAccuracyEffect = (
    value: number,
    pokemon: BattlePokemon,
    effect: AbilityEffect,
    expectedTarget: 'attacker' | 'defender',
  ): number => {
    if (effect.type !== 'battle-move-accuracy-multiplier') return value
    if ((effect.target ?? 'attacker') !== expectedTarget) return value
    if (!matchesString(params.weather, effect.weather)) return value
    if (!matchesPokemonStatus(pokemon, effect.statuses)) return value
    if (
      effect.nonDamagingOnly &&
      ((params.move?.damage ?? 0) > 0 || params.move?.target === 'self')
    ) {
      return value
    }

    const multiplied = value * effect.multiplier
    if (typeof effect.maxAccuracy === 'number') {
      return Math.min(multiplied, effect.maxAccuracy)
    }
    return multiplied
  }

  let accuracy = attackerEffects.reduce(
    (value, effect) =>
      applyAccuracyEffect(value, params.attacker, effect, 'attacker'),
    params.accuracy,
  )

  accuracy = defenderEffects.reduce(
    (value, effect) =>
      params.defender
      ? applyAccuracyEffect(value, params.defender, effect, 'defender')
        : value,
    accuracy,
  )

  const attackerAccuracyStage =
    (params.attacker.statStages?.accuracy ?? 0) +
    getMoveAccuracyStageBonus({
      effects: attackerEffects,
      pokemon: params.attacker,
      expectedTarget: 'attacker',
      stat: 'accuracy',
      weather: params.weather,
    })
  const defenderEvasionStage =
    (params.defender?.statStages?.evasion ?? 0) +
    (params.defender
      ? getMoveAccuracyStageBonus({
          effects: defenderEffects,
          pokemon: params.defender,
          expectedTarget: 'defender',
          stat: 'evasion',
          weather: params.weather,
        })
      : 0)
  accuracy *=
    getAccuracyEvasionStageMultiplier(attackerAccuracyStage) /
    getAccuracyEvasionStageMultiplier(defenderEvasionStage)

  return Math.max(0, Math.min(100, accuracy))
}

export function blocksBattleWeatherDamageByAbility(
  pokemon: BattlePokemon,
  weather?: WeatherType,
): boolean {
  if (!weather || pokemon.currentHp <= 0) return false
  if (blocksBattleIndirectDamageByAbility(pokemon)) return true

  return getAbilityEffects(pokemon).some((effect) => {
    if (effect.type !== 'battle-weather-damage-immunity') return false
    return !effect.weather || matchesString(weather, effect.weather)
  })
}

export function processBattleAbilityWeatherSet(params: {
  state: BattleState
  pokemon: BattlePokemon
  ownerName?: string
}): string[] {
  const { state, pokemon, ownerName } = params
  if (pokemon.currentHp <= 0) return []

  const effect = getAbilityEffects(pokemon).find(
    (entry): entry is Extract<AbilityEffect, { type: 'battle-weather-set' }> =>
      entry.type === 'battle-weather-set' && isWeatherType(entry.weather),
  )
  if (!effect) return []

  const weather = effect.weather as WeatherType
  const currentWeather = state.weather?.weather
  if (currentWeather === weather) return []

  if (
    currentWeather &&
    PRIMAL_WEATHERS.has(currentWeather) &&
    !effect.primal
  ) {
    return [
      `${pokemon.name}'s ${getAbilityName(pokemon)} could not replace ${WEATHER_LABELS[currentWeather]}!`,
    ]
  }

  const originalWeather =
    state.weather?.originalWeather ?? state.weather?.weather ?? 'clear'
  state.weather = {
    ...(state.weather ?? { slot: 1 }),
    weather,
    label: WEATHER_LABELS[weather],
    source: 'ability',
    originalWeather,
    overriddenAtTurn: state.turn,
    overriddenBy: ownerName
      ? `${ownerName}'s ${pokemon.name}'s ${getAbilityName(pokemon)}`
      : `${pokemon.name}'s ${getAbilityName(pokemon)}`,
  }

  return [
    `${pokemon.name}'s ${getAbilityName(pokemon)} made the weather ${WEATHER_LABELS[weather]}!`,
    ...processBattleAbilityWeatherTypeChangesForState(state),
  ]
}

function getBattleAbilityWeatherType(
  pokemon: BattlePokemon,
  weather?: WeatherType,
): string | undefined {
  if (pokemon.currentHp <= 0) return undefined
  const hasWeatherTypeChange = getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-weather-type-change',
  )
  if (!hasWeatherTypeChange) return undefined
  return FORECAST_WEATHER_TYPES[weather || 'clear'] || 'normal'
}

function applyBattleAbilityWeatherTypeChange(params: {
  pokemon: BattlePokemon
  weather?: WeatherType
}): string[] {
  const { pokemon, weather } = params
  const nextType = getBattleAbilityWeatherType(pokemon, weather)
  if (!nextType) return []

  const currentTypes = getEffectiveBattleTypes(pokemon).map((type) =>
    type.toLowerCase(),
  )
  if (currentTypes.length === 1 && currentTypes[0] === nextType) return []

  if (nextType === 'normal') {
    return applyBattleTypeOverride({
      pokemon,
      nextType: '',
      resetToOriginal: true,
      resetDisplayType: 'normal',
    })
  }

  return applyBattleTypeOverride({ pokemon, nextType })
}

function getBattleAbilityTerrainType(
  pokemon: BattlePokemon,
  terrain?: TerrainType,
): string | undefined {
  if (pokemon.currentHp <= 0) return undefined
  const hasTerrainTypeChange = getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-terrain-type-change',
  )
  if (!hasTerrainTypeChange) return undefined
  return terrain ? MIMICRY_TERRAIN_TYPES[terrain] : undefined
}

function applyBattleAbilityTerrainTypeChange(params: {
  pokemon: BattlePokemon
  terrain?: TerrainType
}): string[] {
  const { pokemon, terrain } = params
  if (pokemon.teraTypeOverride) return []

  const nextType = getBattleAbilityTerrainType(pokemon, terrain)
  if (!nextType) {
    const hasTerrainTypeChange = getAbilityEffects(pokemon).some(
      (effect) => effect.type === 'battle-terrain-type-change',
    )
    if (!hasTerrainTypeChange) return []
    return applyBattleTypeOverride({
      pokemon,
      nextType: '',
      resetToOriginal: true,
    })
  }

  return applyBattleTypeOverride({ pokemon, nextType })
}

function getBattleAbilityHeldItemType(pokemon: BattlePokemon): {
  nextType?: string
  fallbackType?: string
} {
  if (pokemon.currentHp <= 0) return {}
  const effect = getAbilityEffects(pokemon).find(
    (
      entry,
    ): entry is Extract<
      AbilityEffect,
      { type: 'battle-held-item-type-change' }
    > => entry.type === 'battle-held-item-type-change',
  )
  if (!effect) return {}

  const item = getRuntimeHeldItem(pokemon)
  const suffixPattern =
    effect.item === 'plate' ? /^([a-z-]+)-plate$/ : /^([a-z-]+)-memory$/
  const heldType = item?.id.match(suffixPattern)?.[1]

  return {
    nextType: heldType,
    fallbackType: effect.fallbackType,
  }
}

function applyBattleAbilityHeldItemTypeChange(params: {
  pokemon: BattlePokemon
}): string[] {
  const { pokemon } = params
  if (pokemon.teraTypeOverride) return []

  const { nextType, fallbackType } = getBattleAbilityHeldItemType(pokemon)
  if (nextType) return applyBattleTypeOverride({ pokemon, nextType })
  if (!fallbackType) return []

  const fallback = fallbackType.toLowerCase()
  if (
    pokemon.battleTypeOriginalTypes?.length &&
    pokemon.battleTypeOriginalTypes.length === 1 &&
    pokemon.battleTypeOriginalTypes[0]?.toLowerCase() === fallback
  ) {
    return applyBattleTypeOverride({
      pokemon,
      nextType: '',
      resetToOriginal: true,
      resetDisplayType: fallback,
    })
  }

  return applyBattleTypeOverride({ pokemon, nextType: fallback })
}

export function processBattleAbilityWeatherTypeChangesForState(
  state: BattleState,
): string[] {
  const messages: string[] = []
  const playerMon = state.playerTeam[state.activePlayerIndex]
  const enemyMon = state.enemyTeam[state.activeEnemyIndex]
  if (playerMon) {
    messages.push(
      ...applyBattleAbilityWeatherTypeChange({
        pokemon: playerMon,
        weather: state.weather?.weather,
      }),
      ...applyBattleAbilityTerrainTypeChange({
        pokemon: playerMon,
        terrain: state.terrain?.terrain,
      }),
      ...applyBattleAbilityHeldItemTypeChange({
        pokemon: playerMon,
      }),
    )
  }
  if (enemyMon) {
    messages.push(
      ...applyBattleAbilityWeatherTypeChange({
        pokemon: enemyMon,
        weather: state.weather?.weather,
      }),
      ...applyBattleAbilityTerrainTypeChange({
        pokemon: enemyMon,
        terrain: state.terrain?.terrain,
      }),
      ...applyBattleAbilityHeldItemTypeChange({
        pokemon: enemyMon,
      }),
    )
  }
  return messages
}

export function applyBattleAbilityBeforeAttackTypeChange(params: {
  pokemon: BattlePokemon
  attackType?: string
  damage: number
}): string[] {
  const { pokemon, attackType, damage } = params
  if (pokemon.currentHp <= 0 || damage <= 0 || !attackType) return []
  if (pokemon.teraTypeOverride) return []

  const effect = getAbilityEffects(pokemon).find(
    (
      entry,
    ): entry is Extract<
      AbilityEffect,
      { type: 'battle-before-attack-type-change' }
    > => entry.type === 'battle-before-attack-type-change',
  )
  if (!effect) return []
  if (
    effect.oncePerSwitch &&
    pokemon.battleAbilityState?.beforeAttackTypeChangeActivated
  ) {
    return []
  }

  pokemon.battleAbilityState ??= {}
  if (effect.oncePerSwitch) {
    pokemon.battleAbilityState.beforeAttackTypeChangeActivated = true
  }

  const nextType = attackType.toLowerCase()
  return applyBattleTypeOverride({ pokemon, nextType })
}

export function clearBattleAbilityBeforeAttackTypeChange(pokemon: BattlePokemon): void {
  if (pokemon.battleAbilityState) {
    pokemon.battleAbilityState.beforeAttackTypeChangeActivated = undefined
  }
}

function processBattleAbilityEntryAbilityCopy(params: {
  pokemon: BattlePokemon
  opposingPokemon: BattlePokemon
}): string[] {
  const { pokemon, opposingPokemon } = params
  if (pokemon.currentHp <= 0 || opposingPokemon.currentHp <= 0) return []

  const hasEntryCopy = getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-entry-ability-copy',
  )
  if (!hasEntryCopy) return []

  const copiedAbility = opposingPokemon.ability
  if (
    !copiedAbility ||
    copiedAbility === pokemon.ability ||
    copiedAbility === 'trace'
  ) {
    return []
  }

  const originalName = getAbilityName(pokemon)
  rememberOriginalBattleAbility(pokemon)
  pokemon.ability = copiedAbility
  return [
    `${pokemon.name}'s ${originalName} copied ${opposingPokemon.name}'s ${getAbilityDisplayName(copiedAbility)}!`,
  ]
}

function processBattleAbilityEntryStatDropOnOpponent(params: {
  pokemon: BattlePokemon
  opposingPokemon: BattlePokemon
}): string[] {
  const { pokemon, opposingPokemon } = params
  if (pokemon.currentHp <= 0 || opposingPokemon.currentHp <= 0) return []
  if (!opposingPokemon.id) return []

  const entryDropEffect = getAbilityEffects(pokemon).find(
    (effect) => effect.type === 'battle-entry-opponent-stat-stage-drop',
  )
  if (!entryDropEffect) return []

  const priorTarget = pokemon.battleAbilityState?.lastIntimidatedOpponent
  if (priorTarget === opposingPokemon.id) return []

  pokemon.battleAbilityState ??= {}
  pokemon.battleAbilityState.lastIntimidatedOpponent = opposingPokemon.id

  return [
    ...applyBattleStatStageBoosts({
      pokemon: opposingPokemon,
      statBoosts: entryDropEffect.statBoosts,
      abilityOwner: pokemon,
    }),
  ]
}

function getBattlePokemonMoveIds(pokemon: BattlePokemon): string[] {
  if (pokemon.aiMoveLoadout?.length) return pokemon.aiMoveLoadout
  const rows = Array.isArray(pokemon.assignedMoves) ? pokemon.assignedMoves : []
  const moveIds: string[] = []
  for (const row of rows) {
    if (typeof row === 'string') {
      moveIds.push(row)
      continue
    }
    if (row && typeof row === 'object' && 'moveId' in row) {
      const moveId = String(row.moveId || '').trim()
      if (moveId) moveIds.push(moveId)
    }
  }
  return moveIds
}

function getForewarnMoveScore(move: MoveConfig): number {
  if (move.damageRange) return Math.max(move.damageRange.min, move.damageRange.max)
  return move.damage
}

function processBattleAbilityEntryMoveScout(params: {
  pokemon: BattlePokemon
  opposingPokemon: BattlePokemon
}): string[] {
  const { pokemon, opposingPokemon } = params
  if (pokemon.currentHp <= 0 || opposingPokemon.currentHp <= 0) return []
  const hasMoveScout = getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-entry-move-scout',
  )
  if (!hasMoveScout) return []

  let strongestMove: MoveConfig | undefined
  let strongestScore = -Infinity
  for (const moveId of getBattlePokemonMoveIds(opposingPokemon)) {
    const move = getMove(moveId)
    if (!move) continue
    const score = getForewarnMoveScore(move)
    if (score > strongestScore) {
      strongestMove = move
      strongestScore = score
    }
  }
  if (!strongestMove) return []

  return [
    `${pokemon.name}'s ${getAbilityName(pokemon)} alerted it to ${opposingPokemon.name}'s ${strongestMove.name}!`,
  ]
}

function getMovePrimaryAttackType(move: MoveConfig): string {
  return typeof move.forcedType === 'string' && move.forcedType !== 'random'
    ? move.forcedType
    : 'normal'
}

function isDangerousMoveForPokemon(move: MoveConfig, pokemon: BattlePokemon): boolean {
  if (move.damageRule?.type === 'ohko') return true
  if ((move.damage ?? 0) <= 0 && !move.damageRule) return false
  const attackType = getMovePrimaryAttackType(move)
  return getDualTypeEffectiveness(attackType, getEffectiveBattleTypes(pokemon)) > 1
}

function processBattleAbilityEntryDangerScout(params: {
  pokemon: BattlePokemon
  opposingPokemon: BattlePokemon
}): string[] {
  const { pokemon, opposingPokemon } = params
  if (pokemon.currentHp <= 0 || opposingPokemon.currentHp <= 0) return []
  const hasDangerScout = getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-entry-danger-scout',
  )
  if (!hasDangerScout) return []

  for (const moveId of getBattlePokemonMoveIds(opposingPokemon)) {
    const move = getMove(moveId)
    if (move && isDangerousMoveForPokemon(move, pokemon)) {
      return [
        `${pokemon.name}'s ${getAbilityName(pokemon)} shuddered at ${opposingPokemon.name}'s ${move.name}!`,
      ]
    }
  }
  return []
}

function processBattleAbilityEntryHeldItemScout(params: {
  pokemon: BattlePokemon
  opposingPokemon: BattlePokemon
}): string[] {
  const { pokemon, opposingPokemon } = params
  if (pokemon.currentHp <= 0 || opposingPokemon.currentHp <= 0) return []
  const hasHeldItemScout = getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-entry-held-item-scout',
  )
  if (!hasHeldItemScout) return []

  const item = getRuntimeHeldItem(opposingPokemon)
  if (!item) return []
  return [
    `${pokemon.name}'s ${getAbilityName(pokemon)} frisked ${opposingPokemon.name} and found ${item.name}!`,
  ]
}

const FAINTED_ALLY_COPY_BLOCKED_ABILITIES = new Set([
  'commander',
  'flower_gift',
  'forecast',
  'hunger_switch',
  'illusion',
  'imposter',
  'neutralizing_gas',
  'power_of_alchemy',
  'receiver',
  'trace',
  'zen_mode',
])

function processBattleAbilityFaintedAllyAbilityCopy(params: {
  pokemon: BattlePokemon
  team: BattlePokemon[]
  activeIndex: number
}): string[] {
  const { pokemon, team, activeIndex } = params
  if (pokemon.currentHp <= 0) return []

  const hasFaintedAllyCopy = getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-entry-fainted-ally-ability-copy',
  )
  if (!hasFaintedAllyCopy) return []

  let copiedFrom: BattlePokemon | undefined
  for (let index = team.length - 1; index >= 0; index -= 1) {
    if (index === activeIndex) continue
    const candidate = team[index]
    if (!candidate || candidate.currentHp > 0 || !candidate.ability) continue
    if (candidate.ability === pokemon.ability) continue
    if (FAINTED_ALLY_COPY_BLOCKED_ABILITIES.has(candidate.ability)) continue
    copiedFrom = candidate
    break
  }
  if (!copiedFrom?.ability) return []

  const originalName = getAbilityName(pokemon)
  rememberOriginalBattleAbility(pokemon)
  pokemon.ability = copiedFrom.ability
  return [
    `${pokemon.name}'s ${originalName} copied ${copiedFrom.name}'s ${getAbilityDisplayName(copiedFrom.ability)}!`,
  ]
}

function processBattleAbilityIllusionMask(params: {
  pokemon: BattlePokemon
  team: BattlePokemon[]
  activeIndex: number
}): string[] {
  const { pokemon, team, activeIndex } = params
  if (pokemon.currentHp <= 0 || pokemon.battleAbilityState?.illusionMask) return []

  const hasIllusionMask = getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-illusion-mask',
  )
  if (!hasIllusionMask) return []

  let maskTarget: BattlePokemon | undefined
  for (let index = team.length - 1; index >= 0; index -= 1) {
    if (index === activeIndex) continue
    const candidate = team[index]
    if (!candidate || candidate.currentHp <= 0) continue
    maskTarget = candidate
    break
  }
  if (!maskTarget) return []

  pokemon.battleAbilityState ??= {}
  pokemon.battleAbilityState.illusionMask = {
    name: maskTarget.name,
    formId: maskTarget.formId,
  }
  return [
    `${pokemon.name}'s ${getAbilityName(pokemon)} made it look like ${maskTarget.name}!`,
  ]
}

function processBattleAbilityEntryTransform(params: {
  pokemon: BattlePokemon
  opposingPokemon: BattlePokemon
}): string[] {
  const { pokemon, opposingPokemon } = params
  if (pokemon.currentHp <= 0 || opposingPokemon.currentHp <= 0) return []
  if (pokemon.battleAbilityState?.originalTransform) return []

  const hasEntryTransform = getAbilityEffects(pokemon).some(
    (effect) => effect.type === 'battle-entry-transform',
  )
  if (!hasEntryTransform) return []

  const originalName = pokemon.name
  const originalAbilityName = getAbilityName(pokemon)
  rememberOriginalBattleAbility(pokemon)
  rememberOriginalBattleTransform(pokemon)
  pokemon.formId = opposingPokemon.formId
  pokemon.name = opposingPokemon.name
  pokemon.types = [...opposingPokemon.types]
  pokemon.stats = { ...opposingPokemon.stats }
  pokemon.statStages = opposingPokemon.statStages
    ? { ...opposingPokemon.statStages }
    : undefined
  pokemon.ability = opposingPokemon.ability

  return [
    `${originalName}'s ${originalAbilityName} transformed it into ${opposingPokemon.name}!`,
  ]
}

export function processBattleAbilityEntryCopiesForState(
  state: BattleState,
): string[] {
  const playerMon = state.playerTeam[state.activePlayerIndex]
  const enemyMon = state.enemyTeam[state.activeEnemyIndex]
  if (!playerMon || !enemyMon) return []

  return [
    ...processBattleAbilitySuppressionForState(state),
    ...processBattleAbilityEntryTransform({
      pokemon: playerMon,
      opposingPokemon: enemyMon,
    }),
    ...processBattleAbilityEntryTransform({
      pokemon: enemyMon,
      opposingPokemon: playerMon,
    }),
    ...processBattleAbilityEntryAbilityCopy({
      pokemon: playerMon,
      opposingPokemon: enemyMon,
    }),
    ...processBattleAbilityEntryAbilityCopy({
      pokemon: enemyMon,
      opposingPokemon: playerMon,
    }),
    ...processBattleAbilityEntryMoveScout({
      pokemon: playerMon,
      opposingPokemon: enemyMon,
    }),
    ...processBattleAbilityEntryMoveScout({
      pokemon: enemyMon,
      opposingPokemon: playerMon,
    }),
    ...processBattleAbilityEntryDangerScout({
      pokemon: playerMon,
      opposingPokemon: enemyMon,
    }),
    ...processBattleAbilityEntryDangerScout({
      pokemon: enemyMon,
      opposingPokemon: playerMon,
    }),
    ...processBattleAbilityEntryHeldItemScout({
      pokemon: playerMon,
      opposingPokemon: enemyMon,
    }),
    ...processBattleAbilityEntryHeldItemScout({
      pokemon: enemyMon,
      opposingPokemon: playerMon,
    }),
    ...processBattleAbilityFaintedAllyAbilityCopy({
      pokemon: playerMon,
      team: state.playerTeam,
      activeIndex: state.activePlayerIndex,
    }),
    ...processBattleAbilityFaintedAllyAbilityCopy({
      pokemon: enemyMon,
      team: state.enemyTeam,
      activeIndex: state.activeEnemyIndex,
    }),
    ...processBattleAbilityEntryStatDropOnOpponent({
      pokemon: playerMon,
      opposingPokemon: enemyMon,
    }),
    ...processBattleAbilityEntryStatDropOnOpponent({
      pokemon: enemyMon,
      opposingPokemon: playerMon,
    }),
    ...processBattleAbilityIllusionMask({
      pokemon: playerMon,
      team: state.playerTeam,
      activeIndex: state.activePlayerIndex,
    }),
    ...processBattleAbilityIllusionMask({
      pokemon: enemyMon,
      team: state.enemyTeam,
      activeIndex: state.activeEnemyIndex,
    }),
  ]
}

export function restoreBattleAbilityMutationOnSwitchOut(
  pokemon: BattlePokemon,
): string[] {
  const messages: string[] = []
  if (pokemon.battleAbilityState?.illusionMask) {
    pokemon.battleAbilityState.illusionMask = undefined
  }
  if (pokemon.battleAbilityState?.lastIntimidatedOpponent) {
    pokemon.battleAbilityState.lastIntimidatedOpponent = undefined
  }
  const originalTransform = pokemon.battleAbilityState?.originalTransform
  if (originalTransform) {
    pokemon.name = originalTransform.name
    pokemon.formId = originalTransform.formId
    pokemon.types = [...originalTransform.types]
    pokemon.stats = { ...originalTransform.stats }
    pokemon.statStages = originalTransform.statStages
      ? { ...originalTransform.statStages }
      : undefined
    if (pokemon.battleAbilityState) {
      pokemon.battleAbilityState.originalTransform = undefined
    }
    messages.push(`${pokemon.name}'s transformation wore off.`)
  }

  const originalAbility = pokemon.battleAbilityState?.originalAbility
  if (!originalAbility) return messages
  const changed = pokemon.ability !== originalAbility
  pokemon.ability = originalAbility
  if (pokemon.battleAbilityState) {
    pokemon.battleAbilityState.originalAbility = undefined
  }
  if (changed && !originalTransform) {
    messages.push(
      `${pokemon.name}'s ability returned to ${getAbilityDisplayName(originalAbility)}.`,
    )
  }
  return messages
}

export function processBattleAbilityTerrainSet(params: {
  state: BattleState
  pokemon: BattlePokemon
  ownerName?: string
}): string[] {
  const { state, pokemon, ownerName } = params
  if (pokemon.currentHp <= 0) return []

  const effect = getAbilityEffects(pokemon).find(
    (entry): entry is Extract<AbilityEffect, { type: 'battle-terrain-set' }> =>
      entry.type === 'battle-terrain-set' && isTerrainType(entry.terrain),
  )
  if (!effect) return []

  const terrain = effect.terrain as TerrainType
  if (state.terrain?.terrain === terrain) return []

  const originalTerrain = state.terrain?.terrain
  state.terrain = {
    terrain,
    label: TERRAIN_LABELS[terrain],
    source: 'ability',
    originalTerrain,
    overriddenAtTurn: state.turn,
    overriddenBy: ownerName
      ? `${ownerName}'s ${pokemon.name}'s ${getAbilityName(pokemon)}`
      : `${pokemon.name}'s ${getAbilityName(pokemon)}`,
  }

  return [
    `${pokemon.name}'s ${getAbilityName(pokemon)} created ${TERRAIN_LABELS[terrain]}!`,
  ]
}

export function getBattleMaxHpOverride(
  pokemon: Pick<BattlePokemon, 'ability'>,
): number | undefined {
  const hpOverrides = getAbilityEffects(pokemon)
    .filter(
      (effect): effect is Extract<AbilityEffect, { type: 'battle-max-hp' }> =>
        effect.type === 'battle-max-hp',
    )
    .map((effect) => effect.hp)
    .filter((hp) => Number.isFinite(hp) && hp > 0)

  if (hpOverrides.length === 0) return undefined
  return Math.max(1, Math.min(...hpOverrides))
}

export function applyBattleAbilityDamageModifiers(params: {
  attacker?: BattlePokemon
  defender: BattlePokemon
  damage: number
  attackStance?: BattleStance
  attackType?: string
  typeEffectiveness?: number
  typeImmunityBypassAttackTypes?: string[] | true
}): {
  damage: number
  messages: string[]
  blockedByAbility?: boolean
  formChangeId?: string
} {
  let damage = params.damage
  const messages: string[] = []
  const attackType = params.attackType?.toLowerCase()
  let formChangeId: string | undefined

  if (damage <= 0) {
    return { damage, messages }
  }
  if (bypassesDefenderBattleAbilitiesByAbility(params.attacker)) {
    return { damage, messages }
  }

  for (const effect of getAbilityEffects(params.defender)) {
    if (
      effect.type === 'battle-type-immunity' &&
      attackType &&
      effect.attackTypes.some((type) => type.toLowerCase() === attackType) &&
      !bypassesTypeImmunity(attackType, params.typeImmunityBypassAttackTypes)
    ) {
      damage = 0
      messages.push(`${params.defender.name}'s ability made it immune!`)
      break
    }

    if (
      effect.type === 'battle-type-absorb' &&
      attackType &&
      effect.attackTypes.some((type) => type.toLowerCase() === attackType) &&
      !bypassesTypeImmunity(attackType, params.typeImmunityBypassAttackTypes)
    ) {
      damage = 0
      const abilityName = getAbilityName(params.defender)
      if (
        effect.healPercent &&
        params.defender.currentHp > 0 &&
        params.defender.currentHp < params.defender.maxHp
      ) {
        const healing = Math.max(
          1,
          Math.floor((params.defender.maxHp * effect.healPercent) / 100),
        )
        const oldHp = params.defender.currentHp
        params.defender.currentHp = Math.min(
          params.defender.maxHp,
          params.defender.currentHp + healing,
        )
        const actualHealing = params.defender.currentHp - oldHp
        messages.push(
          `${params.defender.name}'s ${abilityName} absorbed the attack! [icon:heal:${actualHealing}]`,
        )
      } else {
        messages.push(
          `${params.defender.name}'s ${abilityName} absorbed the attack!`,
        )
      }
      const boostMessage = applyStatBoost(params.defender, effect.statBoost)
      if (boostMessage) messages.push(boostMessage)
      break
    }

    if (
      effect.type === 'battle-damage-gate' &&
      effect.mode === 'super-effective-only' &&
      (params.typeEffectiveness ?? 1) <= 1
    ) {
      damage = 0
      messages.push(`${params.defender.name}'s ability blocked the attack!`)
      break
    }

    if (
      effect.type === 'battle-full-hp-survive' &&
      params.defender.currentHp === params.defender.maxHp &&
      damage >= params.defender.currentHp
    ) {
      damage = Math.max(0, params.defender.currentHp - 1)
      messages.push(
        `${params.defender.name}'s ${getAbilityName(params.defender)} let it endure the hit!`,
      )
      continue
    }

    if (effect.type === 'battle-one-hit-shield') {
      const consumed = params.defender.battleAbilityState?.consumedShields || []
      if (consumed.includes(effect.shieldId)) continue
      if (
        effect.blockedStances?.length &&
        (!params.attackStance ||
          !effect.blockedStances.includes(params.attackStance))
      ) {
        continue
      }

      params.defender.battleAbilityState ??= {}
      params.defender.battleAbilityState.consumedShields = [
        ...consumed,
        effect.shieldId,
      ]
      damage = 0
      formChangeId = effect.breakFormId
      messages.push(
        `${params.defender.name}'s ${getAbilityName(params.defender)} blocked the hit!`,
      )
      break
    }
  }

  return {
    damage,
    messages,
    blockedByAbility: params.damage > 0 && damage === 0,
    formChangeId,
  }
}

export function getBattleAbilityBeforeAttackFormChange(params: {
  pokemon: BattlePokemon
  damage: number
}): { formId?: string; messages: string[] } {
  if (params.damage <= 0) return { messages: [] }

  for (const effect of getAbilityEffects(params.pokemon)) {
    if (
      effect.type === 'battle-form-change' &&
      effect.trigger === 'before-attack' &&
      sourceMatches(params.pokemon, effect.sourceFormIds)
    ) {
      return {
        formId: effect.formId,
        messages: [
          `${params.pokemon.name}'s ${getAbilityName(params.pokemon)} changed its form!`,
        ],
      }
    }
  }

  return { messages: [] }
}

export function getBattleAbilityEntryFormChange(pokemon: BattlePokemon): {
  formId?: string
  messages: string[]
} {
  if (pokemon.currentHp <= 0) return { messages: [] }

  for (const effect of getAbilityEffects(pokemon)) {
    if (
      effect.type === 'battle-form-change' &&
      effect.trigger === 'entry' &&
      sourceMatches(pokemon, effect.sourceFormIds)
    ) {
      return {
        formId: effect.formId,
        messages: [
          `${pokemon.name}'s ${getAbilityName(pokemon)} changed its form!`,
        ],
      }
    }
  }

  return { messages: [] }
}

export function getBattleAbilityAfterKoFormChange(pokemon: BattlePokemon): {
  formId?: string
  messages: string[]
} {
  for (const effect of getAbilityEffects(pokemon)) {
    if (
      effect.type === 'battle-form-change' &&
      effect.trigger === 'after-ko' &&
      sourceMatches(pokemon, effect.sourceFormIds) &&
      !pokemon.battleAbilityState?.battleBondActivated
    ) {
      pokemon.battleAbilityState ??= {}
      pokemon.battleAbilityState.battleBondActivated = true
      return {
        formId: effect.formId,
        messages: [
          `${pokemon.name}'s ${getAbilityName(pokemon)} changed its form!`,
        ],
      }
    }
  }

  return { messages: [] }
}

export function processBattleAbilityTeraActivation(params: {
  state?: BattleState
  pokemon: BattlePokemon
}): { formId?: string; messages: string[] } {
  const { state, pokemon } = params
  const messages: string[] = []
  let formId: string | undefined

  for (const effect of getAbilityEffects(pokemon)) {
    if (
      effect.type !== 'battle-tera-activation' ||
      !sourceMatches(pokemon, effect.sourceFormIds)
    ) {
      continue
    }

    if (effect.formId && !formId) {
      formId = effect.formId
      if (pokemon.formId !== effect.formId) {
        messages.push(`${pokemon.name}'s ${getAbilityName(pokemon)} changed its form!`)
      }
    }

    if (state && effect.clearWeather && state.weather) {
      state.weather = undefined
      messages.push(`${pokemon.name}'s ${getAbilityName(pokemon)} cleared the weather!`)
    }

    if (state && effect.clearTerrain && state.terrain) {
      state.terrain = undefined
      messages.push(`${pokemon.name}'s ${getAbilityName(pokemon)} cleared the terrain!`)
    }
  }

  return { formId, messages }
}

export function getBattleAbilitySwitchOutFormChange(pokemon: BattlePokemon): {
  formId?: string
  messages: string[]
} {
  if (pokemon.currentHp <= 0) return { messages: [] }

  for (const effect of getAbilityEffects(pokemon)) {
    if (
      effect.type === 'battle-form-change' &&
      effect.trigger === 'switch-out' &&
      sourceMatches(pokemon, effect.sourceFormIds) &&
      !pokemon.battleAbilityState?.zeroToHeroActivated
    ) {
      pokemon.battleAbilityState ??= {}
      pokemon.battleAbilityState.zeroToHeroActivated = true
      return {
        formId: effect.formId,
        messages: [
          `${pokemon.name}'s ${getAbilityName(pokemon)} changed its form!`,
        ],
      }
    }
  }

  return { messages: [] }
}

export function getBattleAbilityHpThresholdFormChange(pokemon: BattlePokemon): {
  formId?: string
  messages: string[]
} {
  const hpPercent =
    pokemon.maxHp > 0 ? (pokemon.currentHp / pokemon.maxHp) * 100 : 0

  for (const effect of getAbilityEffects(pokemon)) {
    if (
      effect.type !== 'battle-form-change' ||
      effect.trigger !== 'hp-threshold' ||
      !sourceMatches(pokemon, effect.sourceFormIds)
    ) {
      continue
    }
    if (typeof effect.minLevel === 'number' && pokemon.level < effect.minLevel)
      continue
    if (
      typeof effect.hpAbovePercent === 'number' &&
      hpPercent <= effect.hpAbovePercent
    )
      continue
    if (
      typeof effect.hpAtOrBelowPercent === 'number' &&
      hpPercent > effect.hpAtOrBelowPercent
    ) {
      continue
    }
    return {
      formId: effect.formId,
      messages: [
        `${pokemon.name}'s ${getAbilityName(pokemon)} changed its form!`,
      ],
    }
  }

  return { messages: [] }
}
