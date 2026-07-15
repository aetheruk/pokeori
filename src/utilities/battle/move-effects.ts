import { getAllMoves, getMove, POKEMON_TYPES } from '@/data/moves'
import { items } from '@/data/items'
import type {
  BuffConfig,
  MoveConfig,
  MoveDamageRule,
  MoveDynamicType,
  MovePostDamageStatusCure,
} from '@/data/moves'
import type { StatusEffectId } from '@/data/moves/types'
import type { PokemonTypeName } from '@/data/items'
import type { WeatherType } from '@/data/weather'
import { TERRAIN_LABELS, type TerrainType } from '@/data/terrain'
import type {
  BattleDamageHistoryEntry,
  BattlePokemon,
  BattleState,
  BattleStance,
  StatStages,
} from './types'
import { DEFAULT_STAT_STAGES, clampStatStage } from './stats-calc'
import { adjustBattleItemUsesRemaining, getBattleItemUsesRemaining, type BattleSide } from './item-use-limits'
import { applyHeldDamageBlock, createRuntimeHeldItem } from './held-items'
import { getEffectiveBattleTypes, resetBattleTypeChange } from './tera'
import { lowerPokemonMoveUses } from './move-uses'
import {
  addOrReplaceSecondaryStatus,
  clearBattleSideSecondaryStatuses,
  clearPokemonSecondaryStatuses,
  clearSourceLinkedTrapSecondaryStatuses,
  clearSelectedPokemonSecondaryStatuses,
  hasSecondaryStatusAccuracyBypass,
} from './secondary-statuses'
import { getTypeEffectiveness } from './type-chart'
import { getWeatherAccuracy, getWeatherTypeEffectiveness } from './weather-effects'
import { hasOppositeNonGenderlessGenders } from '@/utilities/pokemon/gender'
import { applyStatus } from './status-effects-logic'
import { applyPokemonResearchEndure } from './research-survival'
import {
  blocksBattleForcedSwitchByAbility,
  blocksBattleMentalEffectByAbility,
  getBattleAbilityMoveAccuracy,
  applyBattleAbilitySelfMoveLock,
  getBattleMentalEffectBlockMessage,
  getBattleHeldItemProtectionMessage,
  processBattleAbilityTerrainSet,
  processBattleAbilityWeatherSet,
  processBattleAbilityWeatherTypeChangesForState,
  applyBattleAbilityStatusReflection,
} from './abilities'

const CALLABLE_MOVE_EXCLUSIONS = new Set(['metronome'])

function oppositeSide(side: BattleSide): BattleSide {
  return side === 'player' ? 'enemy' : 'player'
}

function normalizeType(type: string | undefined): PokemonTypeName | undefined {
  const normalized = type?.toLowerCase()
  return POKEMON_TYPES.find((candidate) => candidate === normalized)
}

function canCallMove(move: MoveConfig, sourceMoveId?: string): boolean {
  if (move.id === sourceMoveId) return false
  if (CALLABLE_MOVE_EXCLUSIONS.has(move.id)) return false
  if (move.charged || move.recharge || move.continuous) return false
  return true
}

export function getCallableAuthoredMoves(sourceMoveId?: string): MoveConfig[] {
  return getAllMoves().filter((move) => canCallMove(move, sourceMoveId))
}

export function resolveCalledMove(params: {
  move: MoveConfig
  state?: BattleState
  side: BattleSide
  attacker: BattlePokemon
  random?: () => number
}): { move: MoveConfig; message?: string; failed?: string } {
  const calledMove = params.move.calledMove
  if (!calledMove) return { move: params.move }

  const random = params.random ?? Math.random
  let candidates: MoveConfig[] = []

  if (calledMove.mode === 'random-authored') {
    candidates = getCallableAuthoredMoves(params.move.id)
  }

  if (calledMove.mode === 'opponent-last-successful' || calledMove.mode === 'opponent-last-successful-boosted') {
    const last = params.state?.moveHistory?.lastSuccessful?.[oppositeSide(params.side)]
    const move = last?.moveId ? getMove(last.moveId) : undefined
    candidates = move && canCallMove(move, params.move.id) ? [move] : []
  }

  if (calledMove.mode === 'self-known-random') {
    const assignedMoveIds = (params.attacker.assignedMoves || [])
      .map((entry: any) => typeof entry === 'string' ? entry : entry?.moveId)
      .filter(Boolean) as string[]
    candidates = assignedMoveIds
      .map((id) => getMove(id))
      .filter((move): move is MoveConfig => Boolean(move && canCallMove(move, params.move.id)))
  }

  if (!candidates.length) {
    return {
      move: params.move,
      failed: `${params.move.name} failed because no callable move was available.`,
    }
  }

  const resolved = candidates[Math.floor(random() * candidates.length)]
  return {
    move: {
      ...resolved,
      damage:
        calledMove.mode === 'opponent-last-successful-boosted'
          ? resolved.damage * 1.5
          : resolved.damage,
    },
    message: `${params.attacker.name}'s ${params.move.name} called ${resolved.name}!`,
  }
}

function typeFromHeldPlate(pokemon: BattlePokemon): PokemonTypeName | undefined {
  const itemId =
    pokemon.heldItem?.id ||
    ((pokemon as any).heldItemId as string | undefined) ||
    undefined
  const match = itemId?.match(/^([a-z-]+)-plate$/)
  return normalizeType(match?.[1])
}

function typeFromHeldMemory(pokemon: BattlePokemon): PokemonTypeName | undefined {
  const itemId =
    pokemon.heldItem?.id ||
    ((pokemon as any).heldItemId as string | undefined) ||
    undefined
  const match = itemId?.match(/^([a-z-]+)-memory$/)
  return normalizeType(match?.[1])
}

function typeFromHeldDrive(pokemon: BattlePokemon): PokemonTypeName | undefined {
  const itemId =
    pokemon.heldItem?.id ||
    ((pokemon as any).heldItemId as string | undefined) ||
    undefined
  if (!itemId) return undefined

  const canonicalDriveTypes: Record<string, PokemonTypeName> = {
    'burn-drive': 'fire',
    'douse-drive': 'water',
    'shock-drive': 'electric',
    'chill-drive': 'ice',
  }
  if (canonicalDriveTypes[itemId]) return canonicalDriveTypes[itemId]

  const match = itemId.match(/^([a-z-]+)-drive$/)
  return normalizeType(match?.[1])
}

function typeFromWeather(weather: WeatherType | undefined): PokemonTypeName | undefined {
  switch (weather) {
    case 'harsh-sunlight':
    case 'extremely-harsh-sunlight':
      return 'fire'
    case 'rain':
    case 'heavy-rain':
      return 'water'
    case 'thunderstorm':
      return 'electric'
    case 'sandstorm':
      return 'rock'
    case 'hail':
    case 'snow':
    case 'snowstorm':
      return 'ice'
    case 'fog':
      return 'ghost'
    case 'strong-winds':
      return 'flying'
    case 'shadowy-aura':
      return 'dark'
    default:
      return undefined
  }
}

function getKnownMoveIds(pokemon: BattlePokemon): string[] {
  const assignedMoveIds = ((pokemon.assignedMoves || []) as any[])
    .map((entry) => typeof entry === 'string' ? entry : entry?.moveId)
    .filter((id): id is string => typeof id === 'string' && id.length > 0)
  if (assignedMoveIds.length) return assignedMoveIds
  if (pokemon.aiMoveLoadout?.length) return pokemon.aiMoveLoadout
  return pokemon.aiMoves || []
}

function typeFromFirstKnownMove(params: {
  pokemon: BattlePokemon
  weather?: WeatherType
  random: () => number
}): PokemonTypeName | undefined {
  const firstMove = getKnownMoveIds(params.pokemon)
    .map((id) => getMove(id))
    .find((candidate): candidate is MoveConfig => Boolean(candidate))
  if (!firstMove) return undefined

  if (firstMove.dynamicType) {
    return normalizeType(
      resolveDynamicMoveType({
        move: firstMove,
        attacker: params.pokemon,
        weather: params.weather,
        fallbackType:
          firstMove.forcedType && firstMove.forcedType !== 'random'
            ? firstMove.forcedType
            : 'normal',
      }),
    )
  }

  if (firstMove.forcedType === 'random') {
    return POKEMON_TYPES[Math.floor(params.random() * POKEMON_TYPES.length)] ?? 'normal'
  }

  return normalizeType(firstMove.forcedType)
}

function getAuthoredMoveType(move: MoveConfig): PokemonTypeName | undefined {
  if (move.forcedType && move.forcedType !== 'random') return move.forcedType
  if (move.dynamicType?.fallbackType) return move.dynamicType.fallbackType
  return undefined
}

function typeToResistLastOpponentMove(params: {
  move: MoveConfig
  state: BattleState
  side: BattleSide
  random: () => number
}): { type?: PokemonTypeName; failed?: string } {
  const last = params.state.moveHistory?.lastSuccessful?.[oppositeSide(params.side)]
  const lastMove = last?.moveId ? getMove(last.moveId) : undefined
  const attackType = normalizeType(last?.attackType) ?? (lastMove ? getAuthoredMoveType(lastMove) : undefined)

  if (!attackType) {
    return {
      failed: `${params.move.name} failed because there was no previous move type to resist.`,
    }
  }

  const candidates = POKEMON_TYPES
    .map((type) => ({
      type,
      effectiveness: getTypeEffectiveness(attackType, type),
    }))
    .filter((candidate) => candidate.effectiveness < 1)

  if (!candidates.length) {
    return {
      failed: `${params.move.name} failed because no resistant type was available.`,
    }
  }

  const bestEffectiveness = Math.min(...candidates.map((candidate) => candidate.effectiveness))
  const bestTypes = candidates
    .filter((candidate) => candidate.effectiveness === bestEffectiveness)
    .map((candidate) => candidate.type)

  return {
    type: bestTypes[Math.floor(params.random() * bestTypes.length)] ?? bestTypes[0],
  }
}

export function resolveDynamicMoveType(params: {
  move: MoveConfig
  attacker: BattlePokemon
  defender?: BattlePokemon
  weather?: WeatherType
  fallbackType: string
}): string {
  const dynamicType = params.move.dynamicType
  if (!dynamicType) return params.fallbackType

  let resolved: PokemonTypeName | undefined
  if (dynamicType.type === 'held-plate') resolved = typeFromHeldPlate(params.attacker)
  if (dynamicType.type === 'held-memory') resolved = typeFromHeldMemory(params.attacker)
  if (dynamicType.type === 'held-drive') resolved = typeFromHeldDrive(params.attacker)
  if (dynamicType.type === 'weather') resolved = typeFromWeather(params.weather)
  if (dynamicType.type === 'tera') resolved = params.attacker.teraTypeOverride
  if (dynamicType.type === 'user-primary') resolved = normalizeType(params.attacker.types?.[0])
  if (dynamicType.type === 'target-primary') resolved = normalizeType(params.defender?.types?.[0])

  return resolved ?? dynamicType.fallbackType ?? params.fallbackType
}

function statusMatches(
  current: string | undefined,
  statuses: StatusEffectId[] | 'all' | undefined,
): boolean {
  if (!current) return false
  if (!statuses || statuses === 'all') return true
  return statuses.includes(current as StatusEffectId)
}

export function getConditionalDamageMultiplier(params: {
  move: MoveConfig
  attacker: BattlePokemon
  defender: BattlePokemon
  state?: BattleState
  side?: BattleSide
  attackType?: string
  weather?: WeatherType
  random?: () => number
}): number {
  const random = params.random ?? Math.random
  let multiplier = 1
  let remainingUsesMultiplier = 1
  for (const modifier of params.move.conditionalDamageModifiers || []) {
    if (modifier.type === 'chance' && random() * 100 < modifier.chance) {
      multiplier *= modifier.multiplier
    }
    if (
      modifier.type === 'user-status' &&
      statusMatches(params.attacker.status?.id, modifier.statuses)
    ) {
      multiplier *= modifier.multiplier
    }
    if (modifier.type === 'user-no-held-item' && !getRuntimeHeldItem(params.attacker)) {
      multiplier *= modifier.multiplier
    }
    if (
      modifier.type === 'target-status' &&
      statusMatches(params.defender.status?.id, modifier.statuses)
    ) {
      multiplier *= modifier.multiplier
    }
    if (
      modifier.type === 'target-pokemon-type' &&
      modifier.pokemonTypes.some((pokemonType) => pokemonHasEffectiveType(params.defender, pokemonType))
    ) {
      multiplier *= modifier.multiplier
    }
    if (
      modifier.type === 'remaining-move-uses-at-or-below' &&
      (params.attacker.moveUsesRemaining ?? Number.POSITIVE_INFINITY) <= modifier.uses
    ) {
      remainingUsesMultiplier = Math.max(remainingUsesMultiplier, modifier.multiplier)
    }
    if (
      modifier.type === 'target-current-hp-at-or-below-percent' &&
      params.defender.currentHp <= Math.floor(params.defender.maxHp * (modifier.percent / 100))
    ) {
      multiplier *= modifier.multiplier
    }
    if (modifier.type === 'user-current-hp-percent') {
      const hpPercent = Math.max(0, Math.min(100, (params.attacker.currentHp / params.attacker.maxHp) * 100))
      const hpScale = modifier.invert ? 1 - hpPercent / 100 : hpPercent / 100
      const minimum = modifier.minimumMultiplier ?? 0.1
      multiplier *= Math.max(minimum, modifier.multiplierAtFullHp * hpScale)
    }
    if (
      modifier.type === 'weather' &&
      modifier.weather.includes(params.weather ?? params.state?.weather?.weather ?? 'clear')
    ) {
      multiplier *= modifier.multiplier
    }
    if (modifier.type === 'super-effective') {
      const attackType =
        params.attackType ||
        (params.move.forcedType && params.move.forcedType !== 'random'
          ? params.move.forcedType
          : params.move.dynamicType?.fallbackType)
      if (attackType && getWeatherTypeEffectiveness(attackType, params.defender, params.weather ?? params.state?.weather?.weather) > 1) {
        multiplier *= modifier.multiplier
      }
    }
    if (modifier.type === 'target-positive-stat-stages') {
      const stages = params.defender.statStages || DEFAULT_STAT_STAGES
      if (Object.values(stages).some((stage) => stage > 0)) {
        multiplier *= modifier.multiplier
      }
    }
    if (modifier.type === 'user-positive-stat-stages') {
      const stages = params.attacker.statStages || DEFAULT_STAT_STAGES
      if (Object.values(stages).some((stage) => stage > 0)) {
        multiplier *= modifier.multiplier
      }
    }
    if (modifier.type === 'fainted-party-members') {
      const team =
        params.side === 'enemy'
          ? params.state?.enemyTeam
          : params.state?.playerTeam
      const faintedCount = (team || []).filter(
        (pokemon) =>
          pokemon.currentHp <= 0 &&
          (params.attacker.id
            ? pokemon.id !== params.attacker.id
            : pokemon !== params.attacker),
      ).length
      multiplier *= Math.max(
        0,
        (modifier.baseMultiplier ?? 1) +
          faintedCount * modifier.perFaintedMultiplier,
      )
    }
    if (modifier.type === 'target-dynamaxed' && params.defender.isDynamaxed) {
      multiplier *= modifier.multiplier
    }
    if (modifier.type === 'user-took-damage') {
      const damageEvent = getLastDamageTakenByPokemon(params.state, params.attacker, params.side)
      if (damageEvent && damageEvent.damage > 0) {
        multiplier *= modifier.multiplier
      }
    }
    if (modifier.type === 'user-stat-lowered-this-turn') {
      const lowered = params.state?.moveHistory?.statLoweredThisTurn?.[params.side ?? 'player']
      if (
        lowered &&
        lowered.turn === params.state?.turn &&
        (!params.attacker.id || lowered.pokemonId === params.attacker.id)
      ) {
        multiplier *= modifier.multiplier
      }
    }
    if (modifier.type === 'target-switching-out') {
      const targetSide = params.side === 'enemy' ? 'player' : 'enemy'
      const switching = params.state?.moveHistory?.switchingOut?.[targetSide]
      if (
        switching &&
        switching.turn === params.state?.turn
      ) {
        multiplier *= modifier.multiplier
      }
    }
    if (modifier.type === 'user-previous-move-failed') {
      const lastFailed = params.state?.moveHistory?.lastFailed?.[params.side ?? 'player']
      const currentTurn = params.state?.turn
      if (
        lastFailed &&
        currentTurn !== undefined &&
        lastFailed.pokemonId === params.attacker.id &&
        lastFailed.turn === currentTurn - 1
      ) {
        multiplier *= modifier.multiplier
      }
    }
    if (modifier.type === 'user-previous-successful-move') {
      const lastSuccessful = params.state?.moveHistory?.lastSuccessful?.[params.side ?? 'player']
      const currentTurn = params.state?.turn
      if (
        currentTurn !== undefined &&
        lastSuccessful?.pokemonId === params.attacker.id &&
        lastSuccessful.turn === currentTurn - 1 &&
        lastSuccessful.moveId !== undefined &&
        modifier.moveIds.includes(lastSuccessful.moveId)
      ) {
        multiplier *= modifier.multiplier
      }
    }
  }
  return multiplier * remainingUsesMultiplier
}

export function getMoveHealAmount(params: {
  move: MoveConfig
  pokemon: BattlePokemon
  weather?: WeatherType
}): number {
  if (params.move.healFull) return params.pokemon.maxHp - params.pokemon.currentHp
  const weatherHeal = params.move.weatherHeal
  const percent = weatherHeal
    ? weatherHeal.weather?.[params.weather ?? 'clear'] ?? weatherHeal.defaultPercent
    : 50
  return Math.floor(params.pokemon.maxHp * (percent / 100))
}

export function resolveDamageRuleDamage(params: {
  rule: MoveDamageRule | undefined
  attacker: BattlePokemon
  defender: BattlePokemon
  state?: BattleState
  side?: BattleSide
  attackerTeam?: BattlePokemon[]
  applyAverage?: boolean
}): { damage?: number; failed?: string } {
  const { rule, attacker, defender } = params
  if (!rule) return {}

  if (rule.type === 'flat') return { damage: Math.max(0, Math.floor(rule.amount)) }
  if (rule.type === 'target-current-hp-percent') {
    return { damage: Math.max(1, Math.floor(defender.currentHp * (rule.percent / 100))) }
  }
  if (rule.type === 'user-level') {
    return { damage: Math.max(1, Math.floor((attacker.level || 1) * (rule.multiplier ?? 1))) }
  }
  if (rule.type === 'user-current-hp') {
    return { damage: Math.max(0, attacker.currentHp) }
  }
  if (rule.type === 'last-damage-taken') {
    const damageEvent = getLastDamageTakenByPokemon(params.state, attacker, params.side)
    if (!damageEvent || damageEvent.damage <= 0) {
      return { failed: `${attacker.name} had no recent damage to return.` }
    }
    consumeLastDamageTakenByPokemon(params.state, attacker, params.side, damageEvent)
    return {
      damage: Math.max(1, Math.floor(damageEvent.damage * (rule.multiplier ?? 1))),
    }
  }
  if (rule.type === 'party-member-count') {
    const team = params.attackerTeam || []
    const count = team.filter((pokemon) =>
      rule.includeFainted ? true : pokemon.currentHp > 0,
    ).length
    if (count <= 0) return { failed: `${attacker.name} had no allies ready to join in.` }
    return { damage: Math.max(1, Math.floor(count * rule.perMemberDamage * 50)) }
  }
  if (rule.type === 'match-user-hp') {
    return { damage: Math.max(0, defender.currentHp - attacker.currentHp) }
  }
  if (rule.type === 'average-active-hp') {
    const average = Math.floor((attacker.currentHp + defender.currentHp) / 2)
    const attackerDelta = average - attacker.currentHp
    const defenderDelta = defender.currentHp - average
    if (params.applyAverage) {
      attacker.currentHp = Math.max(1, Math.min(attacker.maxHp, average))
    }
    return { damage: Math.max(0, defenderDelta || -attackerDelta) }
  }
  if (rule.type === 'ohko') {
    if (rule.failIfUserLowerLevel && (attacker.level || 1) < (defender.level || 1)) {
      return { failed: `${attacker.name} was too low level for the one-hit knockout.` }
    }
    return { damage: defender.currentHp }
  }

  return {}
}

export function recordStatLoweredThisTurn(params: {
  state?: BattleState
  side: BattleSide
  pokemon: BattlePokemon
}): void {
  if (!params.state) return
  params.state.moveHistory ??= {}
  params.state.moveHistory.statLoweredThisTurn ??= {}
  params.state.moveHistory.statLoweredThisTurn[params.side] = {
    turn: params.state.turn,
    pokemonId: params.pokemon.id,
  }
}

export function recordSwitchingOutThisTurn(params: {
  state?: BattleState
  side: BattleSide
  pokemon: BattlePokemon
}): void {
  if (!params.state) return
  params.state.moveHistory ??= {}
  params.state.moveHistory.switchingOut ??= {}
  params.state.moveHistory.switchingOut[params.side] = {
    turn: params.state.turn,
    pokemonId: params.pokemon.id,
  }
}

export function recordBattleDamage(params: {
  state?: BattleState
  sourceSide: BattleSide
  targetSide: BattleSide
  sourcePokemon?: BattlePokemon
  sourcePokemonId?: string
  targetPokemon: BattlePokemon
  move?: Pick<MoveConfig, 'id' | 'name'>
  damage: number
  attackType?: string
}): void {
  const { state, damage, targetPokemon } = params
  if (!state || damage <= 0) return

  state.moveHistory ??= {}
  state.moveHistory.damage ??= {}
  state.moveHistory.damage.lastTakenByPokemon ??= {}
  state.moveHistory.damage.lastTakenBySide ??= {}

  const entry: BattleDamageHistoryEntry = {
    id: `${state.turn}:${params.sourceSide}:${params.targetSide}:${params.move?.id ?? 'attack'}:${params.sourcePokemon?.id ?? params.sourcePokemonId ?? 'unknown'}:${targetPokemon.id ?? params.targetSide}`,
    sourceSide: params.sourceSide,
    targetSide: params.targetSide,
    sourcePokemonId: params.sourcePokemon?.id ?? params.sourcePokemonId,
    targetPokemonId: targetPokemon.id,
    moveId: params.move?.id,
    moveName: params.move?.name,
    turn: state.turn,
    damage,
    attackType: params.attackType,
  }

  if (targetPokemon.id) {
    state.moveHistory.damage.lastTakenByPokemon[targetPokemon.id] = entry
  }
  state.moveHistory.damage.lastTakenBySide[params.targetSide] = entry
}

function getLastDamageTakenByPokemon(
  state: BattleState | undefined,
  pokemon: BattlePokemon,
  side?: BattleSide,
): BattleDamageHistoryEntry | undefined {
  if (!state) return undefined
  const byPokemon = pokemon.id
    ? state.moveHistory?.damage?.lastTakenByPokemon?.[pokemon.id]
    : undefined
  return byPokemon ?? (side ? state.moveHistory?.damage?.lastTakenBySide?.[side] : undefined)
}

function consumeLastDamageTakenByPokemon(
  state: BattleState | undefined,
  pokemon: BattlePokemon,
  side: BattleSide | undefined,
  entry: BattleDamageHistoryEntry,
): void {
  if (!state?.moveHistory?.damage) return
  if (pokemon.id && state.moveHistory.damage.lastTakenByPokemon?.[pokemon.id]?.id === entry.id) {
    delete state.moveHistory.damage.lastTakenByPokemon[pokemon.id]
  }
  if (side && state.moveHistory.damage.lastTakenBySide?.[side]?.id === entry.id) {
    delete state.moveHistory.damage.lastTakenBySide[side]
  }
}

export function queueDelayedMoveDamage(params: {
  state?: BattleState
  move: MoveConfig
  sourceSide: BattleSide
  targetSide: BattleSide
  attacker: BattlePokemon
  damage: number
  attackType?: string
}): string | undefined {
  const { state, move, damage } = params
  if (!state || !move.delayedDamage || damage <= 0) return undefined

  state.delayedDamage ??= []
  const turnsRemaining = Math.max(1, Math.floor(move.delayedDamage.turns))
  state.delayedDamage.push({
    id: `${state.turn}:${params.sourceSide}:${move.id}:${state.delayedDamage.length}`,
    sourceSide: params.sourceSide,
    targetSide: params.targetSide,
    sourcePokemonId: params.attacker.id,
    moveId: move.id,
    moveName: move.name,
    turnsRemaining,
    damage,
    attackType: params.attackType,
  })

  return `${move.name} will strike in ${turnsRemaining} turn${turnsRemaining === 1 ? '' : 's'}.`
}

export function processDelayedMoveDamage(state: BattleState): string[] {
  const queued = state.delayedDamage
  if (!queued?.length) return []

  const messages: string[] = []
  const remaining = []

  for (const entry of queued) {
    const turnsRemaining = Math.max(0, entry.turnsRemaining - 1)
    if (turnsRemaining > 0) {
      remaining.push({ ...entry, turnsRemaining })
      continue
    }

    const targetIndex = entry.targetSide === 'player' ? state.activePlayerIndex : state.activeEnemyIndex
    const targetTeam = entry.targetSide === 'player' ? state.playerTeam : state.enemyTeam
    const target = targetTeam[targetIndex]
    if (!target || target.currentHp <= 0) continue

    const blockResult = applyHeldDamageBlock(target, entry.damage)
    const endureResult = applyPokemonResearchEndure(target, blockResult.damage)
    target.currentHp = Math.max(0, target.currentHp - endureResult.damage)
    recordBattleDamage({
      state,
      sourceSide: entry.sourceSide,
      targetSide: entry.targetSide,
      sourcePokemonId: entry.sourcePokemonId,
      targetPokemon: target,
      move: { id: entry.moveId, name: entry.moveName },
      damage: endureResult.damage,
      attackType: entry.attackType,
    })

    const ownerName = entry.targetSide === 'player' ? state.playerName : state.enemyName
    messages.push(
      `${entry.moveName} struck ${ownerName}'s ${target.name}! [icon:damage:${endureResult.damage}]`,
    )
    if (blockResult.message) messages.push(blockResult.message)
    if (endureResult.message) messages.push(endureResult.message)
  }

  state.delayedDamage = remaining.length ? remaining : undefined
  return messages
}

export function applyNextDamageModifier(
  attacker: BattlePokemon,
  damage: number,
): { damage: number; message?: string } {
  const modifier = attacker.nextDamageModifier
  if (!modifier || modifier.remainingUses <= 0 || damage <= 0) return { damage }

  const nextDamage = Math.max(0, Math.floor(damage * (1 + modifier.percent / 100)))
  modifier.remainingUses -= 1
  if (modifier.remainingUses <= 0) attacker.nextDamageModifier = undefined
  return {
    damage: nextDamage,
    message: `${modifier.sourceMoveName || 'The previous move'} changed damage by ${Math.abs(modifier.percent)}%.`,
  }
}

export function getRepeatDamageMultiplier(params: {
  move: MoveConfig
  previousUses?: number
}): number {
  const repeatDamage = params.move.repeatDamage
  if (!repeatDamage) return 1

  const previousUses = Math.max(0, params.previousUses ?? 0)
  const scalingUses = repeatDamage.maxUses
    ? Math.min(previousUses, Math.max(0, repeatDamage.maxUses - 1))
    : previousUses
  return 1 + (repeatDamage.perUsePercent / 100) * scalingUses
}

export function applyContinuousEndEffects(params: {
  move: MoveConfig
  attacker: BattlePokemon
  defender: BattlePokemon
  weather?: WeatherType
  terrain?: TerrainType
  random?: () => number
}): string[] {
  const messages: string[] = []
  const status = params.move.continuousEnd?.status
  const random = params.random ?? Math.random
  if (status && random() * 100 < (status.chance ?? 100)) {
    const target = status.target === 'enemy' ? params.defender : params.attacker
    const result = applyStatus(target, status.id, params.weather, {
      force: status.forceStatus,
      terrain: params.terrain,
      sourcePokemon: params.attacker,
    })
    if (result.applied && result.message) messages.push(result.message)
    if (result.applied) {
      messages.push(
        ...applyBattleAbilityStatusReflection({
          pokemon: target,
          source: params.attacker,
          statusId: status.id,
          weather: params.weather,
        }),
      )
    }
  }
  return messages
}

type StatusCureList = StatusEffectId[] | 'all'

function cureStatusMatches(current: string | undefined, statuses: StatusCureList): boolean {
  if (!current) return false
  if (statuses === 'all') return true
  return statuses.includes(current as any)
}

function cureStatuses(
  team: BattlePokemon[],
  statuses: StatusCureList,
): { messages: string[]; curedCount: number } {
  const messages: string[] = []
  let curedCount = 0
  for (const pokemon of team) {
    if (!cureStatusMatches(pokemon.status?.id, statuses)) continue
    const cured = pokemon.status?.id
    pokemon.status = undefined
    curedCount += 1
    messages.push(`${pokemon.name} was cured of ${cured}!`)
  }
  return { messages, curedCount }
}

function revivePartyMember(team: BattlePokemon[], hpPercent: number): string | undefined {
  const target = team.find((pokemon) => pokemon.currentHp <= 0)
  if (!target) return undefined
  target.currentHp = Math.max(1, Math.floor(target.maxHp * (hpPercent / 100)))
  return `${target.name} was revived! [icon:heal:${target.currentHp}]`
}

function cloneStatStages(stages: StatStages | undefined): StatStages {
  return { ...(stages || DEFAULT_STAT_STAGES) }
}

function resetStatStages(pokemon: BattlePokemon): void {
  pokemon.statStages = { ...DEFAULT_STAT_STAGES }
}

function pokemonHasEffectiveType(pokemon: BattlePokemon, pokemonType: PokemonTypeName): boolean {
  return getEffectiveBattleTypes(pokemon).some(
    (type) => type.toLowerCase() === pokemonType.toLowerCase(),
  )
}

function applyBattleTypeOverride(params: {
  pokemon: BattlePokemon
  types: string[]
  turns?: number
}): void {
  const normalized = params.types
    .map((type) => normalizeType(type))
    .filter((type): type is PokemonTypeName => Boolean(type))
  if (!normalized.length) return

  params.pokemon.battleTypeOriginalTypes ??= [...(params.pokemon.types || ['normal'])]
  params.pokemon.types = [...normalized]
  params.pokemon.battleTypeOverride = [...normalized]
  params.pokemon.battleTypeTurnsRemaining = params.turns
}

function curePostDamageStatus(
  pokemon: BattlePokemon,
  config: MovePostDamageStatusCure,
): string | undefined {
  if (!cureStatusMatches(pokemon.status?.id, config.statuses)) return undefined
  const cured = pokemon.status?.id
  pokemon.status = undefined
  return `${pokemon.name} was cured of ${cured}!`
}

function getRuntimeHeldItem(pokemon: BattlePokemon): { id: string; name: string } | undefined {
  return (
    pokemon.heldItem ||
    createRuntimeHeldItem((pokemon as any).heldItemId as string | null | undefined)
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

function formatStatStageName(stat: keyof typeof DEFAULT_STAT_STAGES): string {
  if (stat === 'specialAttack') return 'Special Attack'
  if (stat === 'specialDefense') return 'Special Defense'
  return stat.charAt(0).toUpperCase() + stat.slice(1)
}

export function applyMoveRuntimeEffects(params: {
  move: MoveConfig
  state: BattleState
  side: BattleSide
  attacker: BattlePokemon
  defender: BattlePokemon
  damageDealt?: number
  random?: () => number
}): { failed?: string; messages: string[] } {
  const { move, state, side, attacker, defender } = params
  const random = params.random ?? Math.random
  const messages: string[] = []
  const attackerTeam = side === 'player' ? state.playerTeam : state.enemyTeam
  const defenderTeam = side === 'player' ? state.enemyTeam : state.playerTeam
  let heldItemChanged = false

  if (move.nextDamageModifier) {
    const target = move.nextDamageModifier.target === 'enemy' ? defender : attacker
    target.nextDamageModifier = {
      percent: move.nextDamageModifier.percent,
      remainingUses: move.nextDamageModifier.uses ?? 1,
      sourceMoveName: move.name,
    }
    messages.push(`${target.name} is ready to hit harder next time.`)
  }

  if (move.nextAccuracyBypass) {
    const target = move.nextAccuracyBypass.target === 'enemy' ? defender : attacker
    target.nextAccuracyBypass = {
      remainingUses: move.nextAccuracyBypass.uses ?? 1,
      sourceMoveName: move.name,
    }
    messages.push(`${target.name} took careful aim.`)
  }

  if (move.statusCure) {
    const team =
      move.statusCure.target === 'ally-party'
        ? attackerTeam
        : [move.statusCure.target === 'enemy' ? defender : attacker]
    const cureResult = cureStatuses(team, move.statusCure.statuses)
    if (move.statusCure.failIfNoStatus && cureResult.curedCount === 0) {
      return { failed: `${move.name} failed because there was no status to cure.`, messages }
    }
    messages.push(...cureResult.messages)
    if (move.statusCure.healUserPercent && cureResult.curedCount > 0) {
      const healAmount = Math.max(
        1,
        Math.floor(attacker.maxHp * (move.statusCure.healUserPercent / 100)),
      )
      const beforeHp = attacker.currentHp
      attacker.currentHp = Math.min(attacker.maxHp, attacker.currentHp + healAmount)
      const healed = attacker.currentHp - beforeHp
      if (healed > 0) messages.push(`${attacker.name} healed ${healed} HP!`)
    }
  }

  if (move.statusTransfer) {
    const source = attacker
    const target = defender
    const sourceStatus = source.status?.id as StatusEffectId | undefined
    const statuses = move.statusTransfer.statuses
    const canTransfer =
      !!sourceStatus && (statuses === 'all' || statuses.includes(sourceStatus))
    if (!canTransfer) {
      if (move.statusTransfer.failIfNoStatus) {
        return { failed: `${move.name} failed because there was no status to transfer.`, messages }
      }
    } else {
      const result = applyStatus(target, sourceStatus, undefined, {
        terrain: state.terrain?.terrain,
        sourcePokemon: attacker,
      })
      if (!result.applied) {
        return { failed: `${move.name} failed because the status could not be transferred.`, messages }
      }
      if (move.statusTransfer.clearSourceOnSuccess !== false) source.status = undefined
      messages.push(result.message)
      messages.push(`${source.name} transferred its status to ${target.name}.`)
    }
  }

  if (move.postDamageStatusCure && (params.damageDealt ?? 0) > 0) {
    const target = move.postDamageStatusCure.target === 'enemy' ? defender : attacker
    const message = curePostDamageStatus(target, move.postDamageStatusCure)
    if (message) messages.push(message)
  }

  if (
    move.postDamageStatStage &&
    (params.damageDealt ?? 0) > 0 &&
    move.postDamageStatStage.condition === 'target-ko' &&
    defender.currentHp <= 0 &&
    random() * 100 < (move.postDamageStatStage.chance ?? 100)
  ) {
    const target = move.postDamageStatStage.target === 'enemy' ? defender : attacker
    target.statStages ??= { ...DEFAULT_STAT_STAGES }
    const stat = move.postDamageStatStage.stat
    target.statStages[stat] = clampStatStage(
      target.statStages[stat] + move.postDamageStatStage.stages,
      stat,
    )
    const direction = move.postDamageStatStage.stages >= 0 ? 'rose' : 'fell'
    messages.push(
      `${target.name}'s ${formatStatStageName(move.postDamageStatStage.stat)} ${direction}!`,
    )
  }

  if (move.statStageEffect?.type === 'copy-target') {
    const target = move.statStageEffect.target === 'enemy' ? defender : attacker
    const source = target === attacker ? defender : attacker
    target.statStages = cloneStatStages(source.statStages)
    messages.push(`${target.name} copied ${source.name}'s stat changes.`)
  }

  if (move.statStageEffect?.type === 'swap-self') {
    attacker.statStages = cloneStatStages(attacker.statStages)
    const { first, second } = move.statStageEffect
    const previous = attacker.statStages[first]
    attacker.statStages[first] = attacker.statStages[second]
    attacker.statStages[second] = previous
    messages.push(`${attacker.name} swapped its ${first} and ${second} changes.`)
  }

  if (move.statStageEffect?.type === 'reset') {
    const targets =
      move.statStageEffect.target === 'both'
        ? [attacker, defender]
        : [move.statStageEffect.target === 'enemy' ? defender : attacker]
    for (const target of targets) resetStatStages(target)
    messages.push(`${move.name} reset stat changes.`)
  }

  if (move.statStageEffect?.type === 'swap-target') {
    const target = move.statStageEffect.target === 'self' ? attacker : defender
    const source = target === attacker ? defender : attacker
    target.statStages = cloneStatStages(target.statStages)
    source.statStages = cloneStatStages(source.statStages)
    const stats = move.statStageEffect.stats?.length
      ? move.statStageEffect.stats
      : Object.keys(DEFAULT_STAT_STAGES) as Exclude<BuffConfig['stat'], 'crit'>[]
    for (const stat of stats) {
      const previous = target.statStages[stat]
      target.statStages[stat] = source.statStages[stat]
      source.statStages[stat] = previous
    }
    messages.push(`${attacker.name} swapped stat changes with ${defender.name}.`)
  }

  if (move.statStageEffect?.type === 'invert-target') {
    const target = move.statStageEffect.target === 'self' ? attacker : defender
    const stages = cloneStatStages(target.statStages)
    for (const stat of Object.keys(stages)) {
      stages[stat as keyof typeof stages] = -stages[stat as keyof typeof stages]
    }
    target.statStages = stages
    messages.push(`${target.name}'s stat changes were inverted.`)
  }

  if (move.statStageEffect?.type === 'boost-pokemon-type') {
    const targets =
      move.statStageEffect.target === 'both'
        ? [attacker, defender]
        : [move.statStageEffect.target === 'enemy' ? defender : attacker]
    for (const target of targets) {
      if (!pokemonHasEffectiveType(target, move.statStageEffect.pokemonType)) continue
      target.statStages = cloneStatStages(target.statStages)
      for (const stat of move.statStageEffect.stats) {
        target.statStages[stat] = clampStatStage(
          target.statStages[stat] + move.statStageEffect.stages,
          stat,
        )
      }
      const direction = move.statStageEffect.stages >= 0 ? 'rose' : 'fell'
      const statNames = move.statStageEffect.stats.map(formatStatStageName).join(' and ')
      messages.push(`${target.name}'s ${statNames} ${direction}!`)
    }
  }

  if (move.secondaryStatusCure) {
    const scope = move.secondaryStatusCure.scope ?? 'pokemon'
    const ids = move.secondaryStatusCure.ids
    const targets =
      move.secondaryStatusCure.target === 'both'
        ? [
            { pokemon: attacker, side },
            { pokemon: defender, side: oppositeSide(side) },
          ]
        : [
            move.secondaryStatusCure.target === 'enemy'
              ? { pokemon: defender, side: oppositeSide(side) }
              : { pokemon: attacker, side },
          ]

    for (const target of targets) {
      let cleared = 0
      if (scope === 'pokemon' || scope === 'pokemon-and-side') {
        cleared += clearSelectedPokemonSecondaryStatuses(target.pokemon, ids)
      }
      if (scope === 'side' || scope === 'pokemon-and-side') {
        cleared += clearBattleSideSecondaryStatuses(state, target.side, ids)
      }
      if (cleared > 0) messages.push(`${target.pokemon.name} shook off lingering effects.`)
    }
  }

  if (move.partyRevive) {
    const revived = revivePartyMember(attackerTeam, move.partyRevive.hpPercent)
    if (revived) messages.push(revived)
    else return { failed: `${move.name} failed because no ally could be revived.`, messages }
  }

  if (move.itemUseEffect) {
    if (move.itemUseEffect.type === 'restore-self') {
      const before = getBattleItemUsesRemaining(state, side)
      adjustBattleItemUsesRemaining(state, side, move.itemUseEffect.amount)
      const after = getBattleItemUsesRemaining(state, side)
      if (after <= before) return { failed: `${move.name} failed because item uses were already full.`, messages }
      messages.push(`${move.name} restored ${after - before} battle item use.`)
    }

    if (move.itemUseEffect.type === 'remove-enemy') {
      const enemySide = oppositeSide(side)
      const before = getBattleItemUsesRemaining(state, enemySide)
      if (before <= 0) return { failed: `${move.name} failed because the opposing side had no item use left.`, messages }
      const changed = Math.abs(adjustBattleItemUsesRemaining(state, enemySide, -move.itemUseEffect.amount))
      messages.push(`${move.name} removed ${changed} opposing item use.`)
    }

    if (move.itemUseEffect.type === 'consume-self') {
      const before = getBattleItemUsesRemaining(state, side)
      if (before < move.itemUseEffect.amount && move.itemUseEffect.failIfUnavailable) {
        return { failed: `${move.name} failed because no item use was available.`, messages }
      }
      adjustBattleItemUsesRemaining(state, side, -move.itemUseEffect.amount)
    }
  }

  if (move.heldItemEffect?.type === 'bestow') {
    const item = getRuntimeHeldItem(attacker)
    if (!item) return { failed: `${move.name} failed because ${attacker.name} has no held item.`, messages }
    setRuntimeHeldItem(defender, item, { battleOnly: true })
    setRuntimeHeldItem(attacker, undefined)
    heldItemChanged = true
    messages.push(`${attacker.name} gave ${item.name} to ${defender.name}.`)
  }

  if (move.heldItemEffect?.type === 'remove-target') {
    const item = getRuntimeHeldItem(defender)
    if (!item) return { failed: `${move.name} failed because ${defender.name} has no held item.`, messages }
    const protectedMessage = getBattleHeldItemProtectionMessage(defender)
    if (protectedMessage) return { failed: protectedMessage, messages }
    setRuntimeHeldItem(defender, undefined)
    heldItemChanged = true
    messages.push(`${move.name} removed ${defender.name}'s ${item.name}.`)
  }

  if (move.heldItemEffect?.type === 'steal-target') {
    const item = getRuntimeHeldItem(defender)
    if (!item) return { failed: `${move.name} failed because ${defender.name} has no held item.`, messages }
    if (getRuntimeHeldItem(attacker)) return { failed: `${move.name} failed because ${attacker.name} already has a held item.`, messages }
    const protectedMessage = getBattleHeldItemProtectionMessage(defender)
    if (protectedMessage) return { failed: protectedMessage, messages }
    setRuntimeHeldItem(attacker, item, { battleOnly: true })
    setRuntimeHeldItem(defender, undefined)
    heldItemChanged = true
    messages.push(`${attacker.name} stole ${defender.name}'s ${item.name}.`)
  }

  if (move.heldItemEffect?.type === 'swap') {
    const attackerItem = getRuntimeHeldItem(attacker)
    const defenderItem = getRuntimeHeldItem(defender)
    if (!attackerItem && !defenderItem) {
      return { failed: `${move.name} failed because neither Pokemon has a held item.`, messages }
    }
    if (defenderItem) {
      const protectedMessage = getBattleHeldItemProtectionMessage(defender)
      if (protectedMessage) return { failed: protectedMessage, messages }
    }
    setRuntimeHeldItem(attacker, defenderItem, { battleOnly: Boolean(defenderItem) })
    setRuntimeHeldItem(defender, attackerItem, { battleOnly: Boolean(attackerItem) })
    heldItemChanged = true
    messages.push(`${attacker.name} and ${defender.name} swapped held items.`)
  }

  if (move.heldItemEffect?.type === 'recycle') {
    if (getRuntimeHeldItem(attacker)) {
      return { failed: `${move.name} failed because ${attacker.name} already has a held item.`, messages }
    }
    const restored = attacker.consumedHeldItems?.pop()
    if (!restored) return { failed: `${move.name} failed because no consumed held item was available.`, messages }
    const item = { id: restored.itemId, name: restored.name }
    setRuntimeHeldItem(attacker, item, { battleOnly: restored.persistent === false })
    heldItemChanged = true
    messages.push(`${attacker.name} restored its ${item.name}.`)
  }

  if (move.heldItemEffect?.type === 'consume-self') {
    const item = getRuntimeHeldItem(attacker)
    if (!item) return { failed: `${move.name} failed because ${attacker.name} has no held item.`, messages }
    attacker.consumedHeldItems ??= []
    attacker.consumedHeldItems.push({ itemId: item.id, name: item.name, persistent: false })
    setRuntimeHeldItem(attacker, undefined)
    heldItemChanged = true
    messages.push(`${attacker.name} used its ${item.name}.`)
  }

  if (move.heldItemEffect?.type === 'consume-berries') {
    const targets =
      move.heldItemEffect.target === 'both'
        ? [attacker, defender]
        : [move.heldItemEffect.target === 'enemy' ? defender : attacker]
    let consumed = 0
    for (const target of targets) {
      const item = getRuntimeHeldItem(target)
      const definition = item ? items.find((entry) => entry.id === item.id) : undefined
      if (!item || definition?.category !== 'berry') continue
      if (target === defender) {
        const protectedMessage = getBattleHeldItemProtectionMessage(defender)
        if (protectedMessage) {
          if (targets.length === 1) return { failed: protectedMessage, messages }
          messages.push(protectedMessage)
          continue
        }
      }
      target.consumedHeldItems ??= []
      target.consumedHeldItems.push({ itemId: item.id, name: item.name, persistent: false })
      setRuntimeHeldItem(target, undefined)
      heldItemChanged = true
      consumed += 1
      messages.push(`${target.name} ate its ${item.name}.`)
    }
    if (consumed === 0) {
      return { failed: `${move.name} failed because no held berries were available.`, messages }
    }
  }

  if (heldItemChanged) {
    messages.push(...processBattleAbilityWeatherTypeChangesForState(state))
  }

  if (move.transformEffect) {
    const originalName = attacker.name
    attacker.originalFormId ??= attacker.formId
    attacker.formId = defender.formId
    attacker.name = defender.name
    attacker.types = [...defender.types]
    attacker.stats = { ...defender.stats }
    attacker.statStages = cloneStatStages(defender.statStages)
    messages.push(`${originalName} transformed into ${defender.name}.`)
  }

  if (move.moveLockEffect) {
    const target = defender
    const targetSide = oppositeSide(side)
    const last = state.moveHistory?.lastSuccessful?.[targetSide]
    if (!last?.moveId) {
      return { failed: `${move.name} failed because no previous target move was available.`, messages }
    }
    if (blocksBattleMentalEffectByAbility(target, 'encore')) {
      messages.push(getBattleMentalEffectBlockMessage(target, move.name))
    } else {
      target.encoredMove = {
        moveId: last.moveId,
        moveName: last.moveName,
        turnsRemaining: move.moveLockEffect.turns,
      }
      messages.push(`${target.name} must repeat ${last.moveName || last.moveId}.`)
    }
  }

  if (move.moveUseEffect) {
    const target = move.moveUseEffect.target === 'enemy' ? defender : attacker
    const targetSide = move.moveUseEffect.target === 'enemy' ? oppositeSide(side) : side
    const lowered = lowerPokemonMoveUses({
      state,
      side: targetSide,
      pokemon: target,
      amount: move.moveUseEffect.amount,
    })
    if (lowered <= 0) {
      return { failed: `${move.name} failed because ${target.name} had no move uses left.`, messages }
    }
    messages.push(`${target.name} lost ${lowered} move use${lowered === 1 ? '' : 's'}.`)
  }

  if (move.terrainEffect) {
    const terrain = move.terrainEffect.terrain
    if (state.terrain?.terrain === terrain) {
      return {
        failed: `${move.name} failed because ${TERRAIN_LABELS[terrain]} is already active.`,
        messages,
      }
    } else {
      const originalTerrain = state.terrain?.terrain
      state.terrain = {
        terrain,
        label: TERRAIN_LABELS[terrain],
        source: 'move',
        originalTerrain,
        overriddenAtTurn: state.turn,
        overriddenBy: move.name,
      }
      messages.push(`${move.name} created ${TERRAIN_LABELS[terrain]}!`)
      messages.push(...processBattleAbilityWeatherTypeChangesForState(state))
    }
  }

  if (move.curseEffect) {
    if (pokemonHasEffectiveType(attacker, move.curseEffect.ghostType)) {
      const selfDamage = Math.max(
        1,
        Math.floor(attacker.maxHp / move.curseEffect.ghostHpFraction),
      )
      attacker.currentHp = Math.max(0, attacker.currentHp - selfDamage)
      defender.secondaryStatuses = addOrReplaceSecondaryStatus(defender.secondaryStatuses, {
        id: 'curse',
        name: 'Curse',
        sourceSide: side,
        target: 'pokemon',
        triggers: ['turn-end'],
        remainingTurns: move.curseEffect.ghostTurns,
        effects: [
          {
            type: 'damage',
            percentMaxHp: move.curseEffect.ghostDamagePercentMaxHp,
          },
        ],
      })
      messages.push(`${attacker.name} cut its HP and cursed ${defender.name}.`)
    } else {
      attacker.statStages = cloneStatStages(attacker.statStages)
      for (const buff of move.curseEffect.nonGhostBuffs) {
        if (random() * 100 >= (buff.chance ?? 100)) continue
        const stat = buff.stat
        attacker.statStages[stat] = clampStatStage(
          attacker.statStages[stat] + buff.stages,
          stat,
        )
        const direction = buff.stages >= 0 ? 'rose' : 'fell'
        messages.push(`${attacker.name}'s ${formatStatStageName(buff.stat)} ${direction}!`)
      }
    }
  }

  if (move.switchEffect?.type === 'force-enemy-random') {
    if (blocksBattleForcedSwitchByAbility(defender)) {
      return {
        failed: `${move.name} failed because ${defender.name}'s ability anchored it in place.`,
        messages,
      }
    }
    const activeIndex = side === 'player' ? state.activeEnemyIndex : state.activePlayerIndex
    const nextIndex = defenderTeam.findIndex((pokemon, index) => index !== activeIndex && pokemon.currentHp > 0)
    if (nextIndex === -1) return { failed: `${move.name} failed because there was no replacement.`, messages }
    clearSourceLinkedTrapSecondaryStatuses({
      state,
      sourceSide: side === 'player' ? 'enemy' : 'player',
      sourcePokemon: defender,
    })
    clearPokemonSecondaryStatuses(defender)
    resetBattleTypeChange(defender)
    if (side === 'player') state.activeEnemyIndex = nextIndex
    else state.activePlayerIndex = nextIndex
    const replacement = defenderTeam[nextIndex]
    replacement.activeTurnStarted = state.turn + 1
    messages.push(`${defender.name} was forced out!`)
    messages.push(
      ...processBattleAbilityWeatherSet({
        state,
        pokemon: replacement,
        ownerName: side === 'player' ? state.enemyName : state.playerName,
      }),
      ...processBattleAbilityTerrainSet({
        state,
        pokemon: replacement,
        ownerName: side === 'player' ? state.enemyName : state.playerName,
      }),
    )
  }

  if (move.switchEffect?.type === 'self-pending') {
    if (side === 'player') {
      state.pendingPlayerSwitch = true
      state.pendingPlayerSwitchReason = 'move'
      if (move.switchEffect.passStatStages) {
        state.pendingPlayerSwitchStatStages = cloneStatStages(attacker.statStages)
      }
      messages.push(`Choose a Pokemon to switch in for ${attacker.name}.`)
    } else {
      const activeIndex = state.activeEnemyIndex
      const nextIndex = attackerTeam.findIndex((pokemon, index) => index !== activeIndex && pokemon.currentHp > 0)
      if (nextIndex === -1) return { failed: `${move.name} failed because there was no replacement.`, messages }
      const passedStatStages = move.switchEffect.passStatStages
        ? cloneStatStages(attacker.statStages)
        : undefined
      clearSourceLinkedTrapSecondaryStatuses({
        state,
        sourceSide: 'enemy',
        sourcePokemon: attacker,
      })
      clearPokemonSecondaryStatuses(attacker)
      resetBattleTypeChange(attacker)
      state.activeEnemyIndex = nextIndex
      const replacement = attackerTeam[nextIndex]
      replacement.activeTurnStarted = state.turn + 1
      if (passedStatStages) {
        replacement.statStages = passedStatStages
      }
      messages.push(`${attacker.name} went back, and ${replacement.name} took its place.`)
      messages.push(
        ...processBattleAbilityWeatherSet({
          state,
          pokemon: replacement,
          ownerName: state.enemyName,
        }),
        ...processBattleAbilityTerrainSet({
          state,
          pokemon: replacement,
          ownerName: state.enemyName,
        }),
      )
    }
  }

  if (move.typeChangeEffect) {
    const typeChangeEffect = move.typeChangeEffect
    const target = typeChangeEffect.target === 'enemy' ? defender : attacker
    let nextType: PokemonTypeName | undefined
    let typeChangeHandled = false

    if (typeChangeEffect.type === 'random') {
      const typePool = typeChangeEffect.types?.length
        ? typeChangeEffect.types
        : POKEMON_TYPES
      nextType = typePool[Math.floor(random() * typePool.length)] ?? 'normal'
    }

    if (typeChangeEffect.type === 'first-known-move') {
      nextType = typeFromFirstKnownMove({
        pokemon: target,
        weather: state.weather?.weather,
        random,
      })
    }

    if (typeChangeEffect.type === 'resist-last-opponent-move') {
      const result = typeToResistLastOpponentMove({
        move,
        state,
        side,
        random,
      })
      if (result.failed) return { failed: result.failed, messages }
      nextType = result.type
    }

    if (typeChangeEffect.type === 'target-primary') {
      nextType = normalizeType(defender.types?.[0])
    }

    if (typeChangeEffect.type === 'set') {
      applyBattleTypeOverride({
        pokemon: target,
        types: [typeChangeEffect.pokemonType],
        turns: typeChangeEffect.turns,
      })
      messages.push(`${target.name} became ${typeChangeEffect.pokemonType}-type.`)
      nextType = undefined
      typeChangeHandled = true
    }

    if (typeChangeEffect.type === 'add') {
      const currentTypes = getEffectiveBattleTypes(target)
      const nextTypes = currentTypes.some(
        (type) => type.toLowerCase() === typeChangeEffect.pokemonType.toLowerCase(),
      )
        ? currentTypes
        : [...currentTypes, typeChangeEffect.pokemonType]
      applyBattleTypeOverride({
        pokemon: target,
        types: nextTypes,
        turns: typeChangeEffect.turns,
      })
      messages.push(`${target.name} gained the ${typeChangeEffect.pokemonType} type.`)
      nextType = undefined
      typeChangeHandled = true
    }

    if (typeChangeEffect.type === 'remove') {
      const currentTypes = getEffectiveBattleTypes(target)
      const nextTypes = currentTypes.filter(
        (type) => type.toLowerCase() !== typeChangeEffect.pokemonType.toLowerCase(),
      )
      applyBattleTypeOverride({
        pokemon: target,
        types: nextTypes.length ? nextTypes : ['normal'],
        turns: typeChangeEffect.turns,
      })
      messages.push(`${target.name} lost the ${typeChangeEffect.pokemonType} type.`)
      nextType = undefined
      typeChangeHandled = true
    }

    if (nextType) {
      applyBattleTypeOverride({ pokemon: target, types: [nextType] })
      messages.push(`${target.name} became ${nextType}-type.`)
    } else if (!typeChangeHandled) {
      return { failed: `${move.name} failed because no move type was available.`, messages }
    }
  }

  if (move.battleRewards?.rewards.length && side === 'player') {
    state.moveRewards ??= []
    state.moveRewards.push(...move.battleRewards.rewards.map((reward) => ({ ...reward })))
    const pokedollarReward = move.battleRewards.rewards.find(
      (reward) => reward.type === 'currency' && reward.targetId === 'pokedollars',
    )
    if (typeof pokedollarReward?.quantity === 'number' && pokedollarReward.quantity > 0) {
      messages.push(`${move.name} scattered ${pokedollarReward.quantity} Pokédollars.`)
    }
  }

  return { messages }
}

export function consumeNextAccuracyBypass(pokemon: BattlePokemon): boolean {
  const modifier = pokemon.nextAccuracyBypass
  if (!modifier || modifier.remainingUses <= 0) return false
  modifier.remainingUses -= 1
  if (modifier.remainingUses <= 0) pokemon.nextAccuracyBypass = undefined
  return true
}

export function getEffectiveMoveAccuracy(params: {
  move: Pick<MoveConfig, 'accuracy' | 'alwaysHits' | 'damage' | 'target' | 'stance'>
  state?: BattleState
  attacker: BattlePokemon
  defender?: BattlePokemon
  attackerSide: BattleSide
  weather?: WeatherType
  consumeNextAccuracyBypass?: boolean
}): number {
  if (params.move.alwaysHits) return 100
  if (
    params.consumeNextAccuracyBypass &&
    consumeNextAccuracyBypass(params.attacker)
  ) {
    return 100
  }
  if (
    hasSecondaryStatusAccuracyBypass({
      state: params.state,
      attacker: params.attacker,
      attackerSide: params.attackerSide,
    })
  ) {
    return 100
  }
  const baseAccuracy = params.move.stance ? 100 : params.move.accuracy
  const weatherAccuracy = getWeatherAccuracy(baseAccuracy, params.weather)
  return getBattleAbilityMoveAccuracy({
    attacker: params.attacker,
    defender: params.defender,
    move: params.move,
    accuracy: weatherAccuracy,
    weather: params.weather,
  })
}

export function getEffectiveStanceAccuracy(params: {
  attacker: BattlePokemon
  defender?: BattlePokemon
  state?: BattleState
  attackerSide: BattleSide
  weather?: WeatherType
  stance: BattleStance
  accuracy?: number
}): number {
  return getEffectiveMoveAccuracy({
    move: {
      accuracy: params.accuracy ?? 100,
      target: 'enemy',
      damage: 1,
      stance: params.stance,
      alwaysHits: false,
    },
    state: params.state,
    attacker: params.attacker,
    defender: params.defender,
    attackerSide: params.attackerSide,
    weather: params.weather,
  })
}

export function getMoveLockMessage(pokemon: BattlePokemon, moveId: string): string | undefined {
  const lock = pokemon.encoredMove
  if (!lock || lock.turnsRemaining <= 0 || lock.moveId === moveId) return undefined
  return `${pokemon.name} must use ${lock.moveName || lock.moveId}.`
}

export function tickMoveLock(pokemon: BattlePokemon, moveId: string): void {
  const lock = pokemon.encoredMove
  if (!lock || lock.moveId !== moveId) return
  if (lock.permanent) return
  lock.turnsRemaining -= 1
  if (lock.turnsRemaining <= 0) pokemon.encoredMove = undefined
}

export function recordSuccessfulMoveUse(params: {
  state: BattleState
  side: BattleSide
  pokemon: BattlePokemon
  move: MoveConfig
  attackType?: string
}): void {
  const { state, side, pokemon, move } = params
  state.moveHistory ??= {}
  state.moveHistory.lastSuccessful ??= {}
  state.moveHistory.usedByPokemon ??= {}
  state.moveHistory.lastSuccessful[side] = {
    moveId: move.id,
    moveName: move.name,
    side,
    pokemonId: pokemon.id,
    turn: state.turn,
    attackType: params.attackType,
  }
  const key = pokemon.id || `${side}:${pokemon.formId}`
  const used = new Set(state.moveHistory.usedByPokemon[key] || [])
  used.add(move.id)
  state.moveHistory.usedByPokemon[key] = [...used]
  applyBattleAbilitySelfMoveLock(pokemon, move)
}

export function recordFailedMoveUse(params: {
  state: BattleState
  side: BattleSide
  pokemon: BattlePokemon
  move?: MoveConfig
}): void {
  const { state, side, pokemon, move } = params
  state.moveHistory ??= {}
  state.moveHistory.lastFailed ??= {}
  state.moveHistory.lastFailed[side] = {
    moveId: move?.id,
    moveName: move?.name,
    side,
    pokemonId: pokemon.id,
    turn: state.turn,
  }
}

export function recordSuccessfulBasicAttackUse(params: {
  state: BattleState
  side: BattleSide
  pokemon: BattlePokemon
  attackType: string
}): void {
  const { state, side, pokemon, attackType } = params
  state.moveHistory ??= {}
  state.moveHistory.lastSuccessful ??= {}
  state.moveHistory.lastSuccessful[side] = {
    side,
    pokemonId: pokemon.id,
    turn: state.turn,
    attackType,
  }
}

export function checkMoveBattleCondition(params: {
  move: MoveConfig
  state?: BattleState
  side: BattleSide
  attacker: BattlePokemon
  defender?: BattlePokemon
}): string | undefined {
  const condition = params.move.battleCondition
  if (!condition) return undefined

  if (condition.type === 'user-status') {
    return params.attacker.status?.id === condition.statusId
      ? undefined
      : `${params.move.name} failed because ${params.attacker.name} is not ${condition.statusId}.`
  }

  if (condition.type === 'target-status') {
    return params.defender?.status?.id === condition.statusId
      ? undefined
      : `${params.move.name} failed because the target is not ${condition.statusId}.`
  }

  if (condition.type === 'last-ally-fainted-previous-turn') {
    const fainted = params.state?.moveHistory?.lastFainted?.[params.side]
    return fainted && fainted.turn === params.state!.turn - 1
      ? undefined
      : `${params.move.name} failed because no ally fainted last turn.`
  }

  if (condition.type === 'user-has-used-other-moves') {
    const key = params.attacker.id || `${params.side}:${params.attacker.formId}`
    const used = params.state?.moveHistory?.usedByPokemon?.[key] || []
    return used.some((moveId) => moveId !== params.move.id)
      ? undefined
      : `${params.move.name} failed because other moves have not been used yet.`
  }

  if (condition.type === 'not-last-used-move') {
    const last = params.state?.moveHistory?.lastSuccessful?.[params.side]
    return last?.pokemonId === params.attacker.id && last.moveId === params.move.id
      ? `${params.move.name} failed because it was used last turn.`
      : undefined
  }

  if (condition.type === 'first-active-turn') {
    const activeTurnStarted = params.attacker.activeTurnStarted ?? 1
    return params.state && activeTurnStarted === params.state.turn
      ? undefined
      : `${params.move.name} failed because ${params.attacker.name} is no longer newly active.`
  }

  if (condition.type === 'opposite-gender-target') {
    return params.defender &&
      hasOppositeNonGenderlessGenders(params.attacker, params.defender)
      ? undefined
      : `${params.move.name} failed because the genders are not compatible.`
  }

  if (condition.type === 'user-has-held-item') {
    return getRuntimeHeldItem(params.attacker)
      ? undefined
      : `${params.move.name} failed because ${params.attacker.name} has no held item.`
  }

  if (condition.type === 'target-has-held-item') {
    return params.defender && getRuntimeHeldItem(params.defender)
      ? undefined
      : `${params.move.name} failed because the target has no held item.`
  }

  if (condition.type === 'user-has-consumed-held-item') {
    return params.attacker.consumedHeldItems?.length
      ? undefined
      : `${params.move.name} failed because ${params.attacker.name} has not consumed a held item.`
  }

  return undefined
}
