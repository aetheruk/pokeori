import type {
  MoveConfig,
  MoveSecondaryStatusConfig,
  SecondaryStatusEffect,
  SecondaryStatusTrigger,
  StatusEffectId,
} from '@/data/moves/types'
import type { PokemonTypeName } from '@/data/items'
import {
  applyStatus,
  applyMoveAbsorbHealing,
} from '@/utilities/battle/status-effects-logic'
import { applyBattleRarityEntryEffects } from './rarity-effects'
import { hasOppositeNonGenderlessGenders } from '@/utilities/pokemon/gender'
import { DEFAULT_STAT_STAGES, clampStatStage } from './stats-calc'
import { lowerPokemonMoveUses } from './move-uses'
import type {
  BattlePokemon,
  BattleSecondaryStatusInstance,
  BattleStance,
  BattleState,
} from './types'
import { getEffectiveBattleTypes } from './tera'
import {
  blocksBattleOutgoingDamageReductionByAbility,
  blocksBattleMentalEffectByAbility,
  blocksBattleStatStageDropByAbility,
  getBattleMentalEffectBlockMessage,
  getBattleIndirectDamageBlockMessage,
} from './abilities'

type BattleSide = 'player' | 'enemy'

function oppositeSide(side: BattleSide): BattleSide {
  return side === 'player' ? 'enemy' : 'player'
}

function activePokemonForSide(state: BattleState, side: BattleSide): BattlePokemon {
  return side === 'player'
    ? state.playerTeam[state.activePlayerIndex]
    : state.enemyTeam[state.activeEnemyIndex]
}

function rollChance(chance: number | undefined, random: () => number): boolean {
  return random() * 100 < Math.max(0, Math.min(100, chance ?? 100))
}

function isHealingMove(move: MoveConfig): boolean {
  return Boolean(
    move.heal ||
      move.healFull ||
      move.weatherHeal ||
      move.absorb ||
      move.statusCure?.healUserPercent,
  )
}

function statusHasInfatuationEffect(config: MoveSecondaryStatusConfig): boolean {
  return config.effects.some((effect) => effect.type === 'infatuation')
}

function rollTurns(
  turns: MoveSecondaryStatusConfig['turns'],
  random: () => number,
): number | undefined {
  if (turns === undefined) return undefined
  if (typeof turns === 'number') return Math.max(1, Math.floor(turns))

  const min = Math.max(1, Math.floor(Math.min(turns.min, turns.max)))
  const max = Math.max(min, Math.floor(Math.max(turns.min, turns.max)))
  return min + Math.floor(random() * (max - min + 1))
}

function makeInstance(params: {
  config: MoveSecondaryStatusConfig
  sourceSide: BattleSide
  sourcePokemonId?: string
  target: BattleSecondaryStatusInstance['target']
  targetSide?: BattleSide
  random: () => number
}): BattleSecondaryStatusInstance {
  return {
    id: params.config.id,
    name: params.config.name || params.config.id,
    triggers: params.config.triggers,
    effects: params.config.effects,
    sourceSide: params.sourceSide,
    sourcePokemonId: params.sourcePokemonId,
    target: params.target,
    targetSide: params.targetSide,
    delayTurns: params.config.delayTurns,
    remainingTurns: rollTurns(params.config.turns, params.random),
  }
}

function statusHasSwitchPreventionEffect(
  status: Pick<BattleSecondaryStatusInstance, 'effects'>,
): boolean {
  if (!Array.isArray(status.effects)) return false
  return status.effects.some((effect) => effect.type === 'switch-prevention')
}

function getSourcePokemonId(pokemon: BattlePokemon): string | undefined {
  return pokemon.id ? String(pokemon.id) : undefined
}

function isMatchingSecondaryStatus(
  status: BattleSecondaryStatusInstance,
  candidate: BattleSecondaryStatusInstance,
): boolean {
  return (
    status.id === candidate.id &&
    status.target === candidate.target &&
    status.targetSide === candidate.targetSide
  )
}

export function addOrReplaceSecondaryStatus(
  statuses: BattleSecondaryStatusInstance[] | undefined,
  status: BattleSecondaryStatusInstance,
): BattleSecondaryStatusInstance[] {
  const next = statuses?.filter((existing) => !isMatchingSecondaryStatus(existing, status)) ?? []
  next.push(status)
  return next
}

export function applySecondaryStatusesFromMove(params: {
  move: { secondaryStatuses?: MoveSecondaryStatusConfig[] }
  state?: BattleState
  attacker: BattlePokemon
  defender: BattlePokemon
  sourceSide: BattleSide
  random?: () => number
  chanceMultiplier?: number
}): string[] {
  const { move, attacker, defender, sourceSide } = params
  const random = params.random ?? Math.random
  const messages: string[] = []

  for (const config of move.secondaryStatuses || []) {
    const chance =
      params.chanceMultiplier === undefined
        ? config.chance
        : (config.chance ?? 100) * params.chanceMultiplier
    if (!config.effects.length || !rollChance(chance, random)) continue
    const sourcePokemonId = statusHasSwitchPreventionEffect(config)
      ? getSourcePokemonId(attacker)
      : undefined

    let applied = false
    const addPokemonStatus = (pokemon: BattlePokemon) => {
      if (
        statusHasInfatuationEffect(config) &&
        !hasOppositeNonGenderlessGenders(attacker, pokemon)
      ) {
        messages.push(`${config.name || config.id} failed because the genders are not compatible.`)
        return
      }
      if (blocksBattleMentalEffectByAbility(pokemon, config.id)) {
        messages.push(
          getBattleMentalEffectBlockMessage(pokemon, config.name || config.id),
        )
        return
      }
      pokemon.secondaryStatuses = addOrReplaceSecondaryStatus(
        pokemon.secondaryStatuses,
        makeInstance({
          config,
          sourceSide,
          sourcePokemonId,
          target: 'pokemon',
          random,
        }),
      )
      applied = true
    }

    const addBattleStatus = (targetSide?: BattleSide) => {
      if (!params.state) return
      params.state.secondaryStatuses = addOrReplaceSecondaryStatus(
        params.state.secondaryStatuses,
        makeInstance({
          config,
          sourceSide,
          sourcePokemonId,
          target: targetSide ? 'side' : 'field',
          targetSide,
          random,
        }),
      )
      applied = true
    }

    switch (config.target) {
      case 'self-pokemon':
        addPokemonStatus(attacker)
        break
      case 'enemy-pokemon':
        addPokemonStatus(defender)
        break
      case 'both-pokemon':
        addPokemonStatus(attacker)
        addPokemonStatus(defender)
        break
      case 'self-side':
        addBattleStatus(sourceSide)
        break
      case 'enemy-side':
        addBattleStatus(oppositeSide(sourceSide))
        break
      case 'both-sides':
        addBattleStatus('player')
        addBattleStatus('enemy')
        break
      case 'field':
        addBattleStatus()
        break
    }

    if (applied) messages.push(`${config.name || config.id} took hold.`)
  }

  return messages
}

function calculateEffectDamage(pokemon: BattlePokemon, effect: SecondaryStatusEffect): number {
  if (effect.type !== 'damage' && effect.type !== 'absorb') return 0
  if (
    effect.pokemonTypes?.length &&
    !effect.pokemonTypes.some((pokemonType) => pokemonHasEffectiveType(pokemon, pokemonType))
  ) {
    return 0
  }
  const percentDamage = effect.percentMaxHp
    ? Math.ceil((pokemon.maxHp * effect.percentMaxHp) / 100)
    : 0
  const flatDamage = effect.flatDamage ?? 0
  return Math.max(0, percentDamage + flatDamage)
}

function calculateEffectHealing(pokemon: BattlePokemon, effect: SecondaryStatusEffect): number {
  if (effect.type !== 'heal') return 0
  const percentHealing = effect.percentMaxHp
    ? Math.ceil((pokemon.maxHp * effect.percentMaxHp) / 100)
    : 0
  const flatHealing = effect.flatHealing ?? 0
  return Math.max(0, percentHealing + flatHealing)
}

function statusListMatches(
  statusId: string | undefined,
  statuses: StatusEffectId[] | 'all' | undefined,
): boolean {
  if (!statusId) return false
  if (!statuses || statuses === 'all') return true
  return statuses.includes(statusId as StatusEffectId)
}

function pokemonHasEffectiveType(pokemon: BattlePokemon, pokemonType: PokemonTypeName): boolean {
  return getEffectiveBattleTypes(pokemon).some(
    (type) => type.toLowerCase() === pokemonType.toLowerCase(),
  )
}

function applySecondaryStatusEffects(params: {
  status: BattleSecondaryStatusInstance
  affected: BattlePokemon
  source?: BattlePokemon
  ownerName: string
  random: () => number
  terrain?: BattleState['terrain']
}): string[] {
  const messages: string[] = []
  const { status, affected, source, ownerName, random } = params
  if (affected.currentHp <= 0) return messages

  for (const effect of status.effects) {
    if (effect.type === 'damage' || effect.type === 'absorb') {
      const damage = Math.min(affected.currentHp, calculateEffectDamage(affected, effect))
      if (damage <= 0) continue

      const blockMessage = getBattleIndirectDamageBlockMessage(
        affected,
        status.name,
      )
      if (blockMessage) {
        messages.push(blockMessage)
        continue
      }

      affected.currentHp = Math.max(0, affected.currentHp - damage)
      messages.push(
        `${ownerName}'s ${affected.name} is hurt by ${status.name}. [icon:damage:${damage}]`,
      )

      if (effect.type === 'absorb' && source) {
        const healResult = applyMoveAbsorbHealing(
          source,
          damage,
          effect.healPercent ?? 100,
        )
        if (healResult.applied) messages.push(healResult.message)
      }
      continue
    }

    if (effect.type === 'apply-status') {
      if (!rollChance(effect.chance, random)) continue
      const result = applyStatus(affected, effect.statusId, undefined, {
        terrain: params.terrain?.terrain,
        sourcePokemon: source,
      })
      if (result.applied) messages.push(result.message)
      continue
    }

    if (effect.type === 'heal') {
      const healing = Math.min(
        affected.maxHp - affected.currentHp,
        calculateEffectHealing(affected, effect),
      )
      if (healing <= 0) continue
      affected.currentHp = Math.min(affected.maxHp, affected.currentHp + healing)
      messages.push(`${ownerName}'s ${affected.name} recovered from ${status.name}. [icon:heal:${healing}]`)
      continue
    }

    if (effect.type === 'wake-status') {
      if (!statusListMatches(affected.status?.id, effect.statuses ?? ['sleep'])) continue
      affected.status = undefined
      messages.push(`${affected.name} woke up because of ${status.name}.`)
      continue
    }

    if (effect.type === 'stat') {
      if (effect.pokemonType && !pokemonHasEffectiveType(affected, effect.pokemonType)) continue
      if (!rollChance(effect.chance, random)) continue
      affected.statStages ??= { ...DEFAULT_STAT_STAGES }
      const stat = effect.stat
      affected.statStages[stat] = clampStatStage(
        affected.statStages[stat] + effect.stages,
        stat,
      )
      const direction = effect.stages >= 0 ? 'rose' : 'fell'
      messages.push(`${affected.name}'s ${effect.stat} ${direction}!`)
    }
  }

  return messages
}

function processStatusList(params: {
  statuses: BattleSecondaryStatusInstance[] | undefined
  trigger: SecondaryStatusTrigger
  affectedForStatus: (status: BattleSecondaryStatusInstance) => BattlePokemon[]
  sourceForStatus: (status: BattleSecondaryStatusInstance) => BattlePokemon | undefined
  ownerNameForPokemon: (pokemon: BattlePokemon) => string
  random: () => number
  terrain?: BattleState['terrain']
}): { messages: string[]; statuses: BattleSecondaryStatusInstance[] | undefined } {
  if (!params.statuses?.length) return { messages: [], statuses: params.statuses }

  const messages: string[] = []
  const nextStatuses: BattleSecondaryStatusInstance[] = []

  for (const status of params.statuses) {
    const shouldTrigger = status.triggers.includes(params.trigger)
    if (shouldTrigger) {
      if (status.delayTurns && status.delayTurns > 0) {
        status.delayTurns -= 1
      } else {
        for (const affected of params.affectedForStatus(status)) {
          messages.push(
            ...applySecondaryStatusEffects({
              status,
              affected,
              source: params.sourceForStatus(status),
              ownerName: params.ownerNameForPokemon(affected),
              random: params.random,
              terrain: params.terrain,
            }),
          )
        }

        if (status.remainingTurns !== undefined) {
          status.remainingTurns -= 1
        }
      }
    }

    if (status.remainingTurns === undefined || status.remainingTurns > 0) {
      nextStatuses.push(status)
    }
  }

  return { messages, statuses: nextStatuses.length ? nextStatuses : undefined }
}

export function clearPokemonSecondaryStatuses(pokemon: BattlePokemon): void {
  pokemon.secondaryStatuses = undefined
}

function isSourceLinkedTrapStatus(
  status: BattleSecondaryStatusInstance,
  sourceSide: BattleSide,
  sourcePokemon: BattlePokemon,
): boolean {
  if (status.sourceSide !== sourceSide) return false
  if (!statusHasSwitchPreventionEffect(status)) return false

  const sourcePokemonId = getSourcePokemonId(sourcePokemon)
  if (status.sourcePokemonId && sourcePokemonId) {
    return status.sourcePokemonId === sourcePokemonId
  }

  return !status.sourcePokemonId
}

export function clearSourceLinkedTrapSecondaryStatuses(params: {
  state: BattleState
  sourceSide: BattleSide
  sourcePokemon: BattlePokemon
}): number {
  let cleared = 0
  const clearFromPokemon = (pokemon: BattlePokemon | undefined) => {
    const before = pokemon?.secondaryStatuses?.length ?? 0
    if (!pokemon || !before) return

    const next = pokemon.secondaryStatuses?.filter(
      (status) =>
        !isSourceLinkedTrapStatus(status, params.sourceSide, params.sourcePokemon),
    ) ?? []
    pokemon.secondaryStatuses = next.length ? next : undefined
    cleared += before - next.length
  }

  for (const pokemon of params.state.playerTeam) clearFromPokemon(pokemon)
  for (const pokemon of params.state.enemyTeam) clearFromPokemon(pokemon)

  const before = params.state.secondaryStatuses?.length ?? 0
  if (before) {
    const next = params.state.secondaryStatuses?.filter(
      (status) =>
        !isSourceLinkedTrapStatus(status, params.sourceSide, params.sourcePokemon),
    ) ?? []
    params.state.secondaryStatuses = next.length ? next : undefined
    cleared += before - next.length
  }

  return cleared
}

function shouldClearSecondaryStatus(status: BattleSecondaryStatusInstance, ids?: string[]): boolean {
  return !ids?.length || ids.includes(status.id)
}

export function clearSelectedPokemonSecondaryStatuses(
  pokemon: BattlePokemon,
  ids?: string[],
): number {
  const before = pokemon.secondaryStatuses?.length ?? 0
  if (!before) return 0

  if (!ids?.length) {
    pokemon.secondaryStatuses = undefined
    return before
  }

  const next = pokemon.secondaryStatuses?.filter((status) => !shouldClearSecondaryStatus(status, ids)) ?? []
  pokemon.secondaryStatuses = next.length ? next : undefined
  return before - next.length
}

export function clearBattleSideSecondaryStatuses(
  state: BattleState,
  side: BattleSide,
  ids?: string[],
): number {
  const before = state.secondaryStatuses?.length ?? 0
  if (!before) return 0

  const next = state.secondaryStatuses?.filter((status) => {
    if (status.target !== 'side' || status.targetSide !== side) return true
    return !shouldClearSecondaryStatus(status, ids)
  }) ?? []
  state.secondaryStatuses = next.length ? next : undefined
  return before - next.length
}

export function processSecondaryStatusesForTurnEnd(
  state: BattleState,
  random: () => number = Math.random,
): string[] {
  const messages: string[] = []
  const playerMon = activePokemonForSide(state, 'player')
  const enemyMon = activePokemonForSide(state, 'enemy')

  const processPokemon = (pokemon: BattlePokemon, side: BattleSide) => {
    const result = processStatusList({
      statuses: pokemon.secondaryStatuses,
      trigger: 'turn-end',
      affectedForStatus: () => [pokemon],
      sourceForStatus: (status) => activePokemonForSide(state, status.sourceSide),
      ownerNameForPokemon: () => side === 'player' ? state.playerName : state.enemyName,
      random,
      terrain: state.terrain,
    })
    pokemon.secondaryStatuses = result.statuses
    messages.push(...result.messages)
  }

  processPokemon(playerMon, 'player')
  processPokemon(enemyMon, 'enemy')

  const battleResult = processStatusList({
    statuses: state.secondaryStatuses,
    trigger: 'turn-end',
    affectedForStatus: (status) => {
      if (status.target === 'field') return [playerMon, enemyMon]
      if (status.targetSide === 'player') return [playerMon]
      if (status.targetSide === 'enemy') return [enemyMon]
      return []
    },
    sourceForStatus: (status) => activePokemonForSide(state, status.sourceSide),
    ownerNameForPokemon: (pokemon) => pokemon === playerMon ? state.playerName : state.enemyName,
    random,
    terrain: state.terrain,
  })
  state.secondaryStatuses = battleResult.statuses
  messages.push(...battleResult.messages)

  return messages
}

export function processSecondaryStatusesForSwitch(
  state: BattleState,
  side: BattleSide,
  random: () => number = Math.random,
): string[] {
  const switchedPokemon = activePokemonForSide(state, side)
  const messages: string[] = []

  const pokemonResult = processStatusList({
    statuses: switchedPokemon.secondaryStatuses,
    trigger: 'switch',
    affectedForStatus: () => [switchedPokemon],
    sourceForStatus: (status) => activePokemonForSide(state, status.sourceSide),
    ownerNameForPokemon: () => side === 'player' ? state.playerName : state.enemyName,
    random,
    terrain: state.terrain,
  })
  switchedPokemon.secondaryStatuses = pokemonResult.statuses
  messages.push(...pokemonResult.messages)

  const battleResult = processStatusList({
    statuses: state.secondaryStatuses,
    trigger: 'switch',
    affectedForStatus: (status) => {
      if (status.target === 'field') return [switchedPokemon]
      if (status.targetSide === side) return [switchedPokemon]
      return []
    },
    sourceForStatus: (status) => activePokemonForSide(state, status.sourceSide),
    ownerNameForPokemon: () => side === 'player' ? state.playerName : state.enemyName,
    random,
    terrain: state.terrain,
  })
  state.secondaryStatuses = battleResult.statuses
  messages.push(...battleResult.messages)

  messages.push(...applyBattleRarityEntryEffects(switchedPokemon, random, state))

  return messages
}

function getStatusesAffectingPokemon(
  state: BattleState | undefined,
  pokemon: BattlePokemon,
  side?: BattleSide,
): BattleSecondaryStatusInstance[] {
  const statuses = [...(pokemon.secondaryStatuses || [])]
  if (!state || !side) return statuses

  for (const status of state.secondaryStatuses || []) {
    if (status.target === 'field' || status.targetSide === side) {
      statuses.push(status)
    }
  }

  return statuses
}

function isPassiveSecondaryStatusActive(status: BattleSecondaryStatusInstance): boolean {
  return (status.delayTurns ?? 0) <= 0
}

function removePokemonSecondaryStatusInstance(
  pokemon: BattlePokemon,
  statusToRemove: BattleSecondaryStatusInstance,
): void {
  const next = pokemon.secondaryStatuses?.filter((status) => status !== statusToRemove) ?? []
  pokemon.secondaryStatuses = next.length ? next : undefined
}

function removeBattleSecondaryStatusInstance(
  state: BattleState | undefined,
  statusToRemove: BattleSecondaryStatusInstance,
): void {
  if (!state?.secondaryStatuses?.length) return
  const next = state.secondaryStatuses.filter((status) => status !== statusToRemove)
  state.secondaryStatuses = next.length ? next : undefined
}

export function processSecondaryStatusFaintEffects(params: {
  state?: BattleState
  faintedPokemon: BattlePokemon
  faintedSide?: BattleSide
  attackerPokemon?: BattlePokemon
  attackerSide?: BattleSide
  damage: number
}): string[] {
  const {
    state,
    faintedPokemon,
    faintedSide,
    attackerPokemon,
    attackerSide,
    damage,
  } = params

  if (
    damage <= 0 ||
    faintedPokemon.currentHp > 0 ||
    !attackerPokemon ||
    attackerPokemon.currentHp <= 0 ||
    (faintedSide && attackerSide && faintedSide === attackerSide)
  ) {
    return []
  }

  const messages: string[] = []
  const statuses = getStatusesAffectingPokemon(state, faintedPokemon, faintedSide)
  for (const status of statuses) {
    if (!isPassiveSecondaryStatusActive(status)) continue
    let consumed = false

    for (const effect of status.effects) {
      if (effect.type === 'faint-bond') {
        if (attackerPokemon.currentHp <= 0) continue
        attackerPokemon.currentHp = 0
        consumed = true
        messages.push(`${attackerPokemon.name} was taken down by ${status.name}.`)
        continue
      }

      if (
        effect.type === 'faint-move-use-depletion' &&
        state &&
        attackerSide
      ) {
        const lowered = lowerPokemonMoveUses({
          state,
          side: attackerSide,
          pokemon: attackerPokemon,
          amount: effect.amount,
        })
        if (lowered <= 0) continue
        consumed = true
        messages.push(
          `${attackerPokemon.name} lost ${lowered} move use${lowered === 1 ? '' : 's'} to ${status.name}.`,
        )
      }
    }

    if (consumed) {
      removePokemonSecondaryStatusInstance(faintedPokemon, status)
      removeBattleSecondaryStatusInstance(state, status)
    }
  }

  return messages
}

function moveHasSnatchableBeneficialEffect(move: MoveConfig): boolean {
  return Boolean(
    move.heal ||
      move.healFull ||
      move.nextDamageModifier ||
      move.nextAccuracyBypass ||
      move.statusCure ||
      move.secondaryStatusCure ||
      move.postDamageStatusCure ||
      move.heldItemEffect?.type === 'recycle' ||
      move.buffs?.some((buff) => (buff.target ?? 'self') === 'self' && buff.stages > 0),
  )
}

function applySnatchedBeneficialEffects(params: {
  move: MoveConfig
  source: BattlePokemon
}): string[] {
  const messages: string[] = []
  const { move, source } = params

  if (move.heal || move.healFull) {
    const healAmount = move.healFull
      ? source.maxHp - source.currentHp
      : Math.floor(source.maxHp * 0.5)
    if (healAmount > 0) {
      source.currentHp = Math.min(source.maxHp, source.currentHp + healAmount)
      messages.push(`${source.name} snatched ${move.name} and healed ${healAmount} HP!`)
    }
  }

  for (const buff of move.buffs || []) {
    if ((buff.target ?? 'self') !== 'self' || buff.stages <= 0) continue
    source.statStages ??= { ...DEFAULT_STAT_STAGES }
    source.statStages[buff.stat] = clampStatStage(
      source.statStages[buff.stat] + buff.stages,
      buff.stat,
    )
    messages.push(`${source.name} snatched ${move.name} and its ${buff.stat} rose!`)
  }

  if (move.nextDamageModifier) {
    source.nextDamageModifier = {
      percent: move.nextDamageModifier.percent,
      remainingUses: move.nextDamageModifier.uses ?? 1,
      sourceMoveName: move.name,
    }
    messages.push(`${source.name} snatched ${move.name} and readied a stronger hit.`)
  }

  if (move.nextAccuracyBypass) {
    source.nextAccuracyBypass = {
      remainingUses: move.nextAccuracyBypass.uses ?? 1,
      sourceMoveName: move.name,
    }
    messages.push(`${source.name} snatched ${move.name} and took careful aim.`)
  }

  if (move.statusCure && (move.statusCure.statuses === 'all' || !move.statusCure.statuses.length || move.statusCure.statuses.includes(source.status?.id as StatusEffectId))) {
    const cured = source.status?.id
    source.status = undefined
    if (cured) messages.push(`${source.name} snatched ${move.name} and was cured of ${cured}.`)
  }

  if (move.heldItemEffect?.type === 'recycle' && !source.heldItem) {
    const restored = source.consumedHeldItems?.pop()
    if (restored) {
      source.heldItem = { id: restored.itemId, name: restored.name }
      ;(source as any).heldItemId = restored.itemId
      source.heldItemBattleOnly = restored.persistent === false || undefined
      source.itemCharge = 0
      if (source.battleAbilityState) {
        source.battleAbilityState.heldItemLost = false
      }
      messages.push(`${source.name} snatched ${move.name} and restored its ${restored.name}.`)
    }
  }

  return messages.length ? messages : [`${source.name} snatched ${move.name}.`]
}

export function getSecondaryStatusTypeImmunityBypassAttackTypes(params: {
  state?: BattleState
  defender: BattlePokemon
  defenderSide?: BattleSide
}): string[] | true | undefined {
  const attackTypes = new Set<string>()

  for (const status of getStatusesAffectingPokemon(
    params.state,
    params.defender,
    params.defenderSide,
  )) {
    for (const effect of status.effects) {
      if (effect.type !== 'type-immunity-bypass') continue
      if (!effect.attackTypes?.length) return true
      for (const attackType of effect.attackTypes) {
        attackTypes.add(attackType.toLowerCase())
      }
    }
  }

  return attackTypes.size ? Array.from(attackTypes) : undefined
}

export function hasSecondaryStatusAccuracyBypass(params: {
  state?: BattleState
  attacker: BattlePokemon
  attackerSide?: BattleSide
}): boolean {
  for (const status of getStatusesAffectingPokemon(
    params.state,
    params.attacker,
    params.attackerSide,
  )) {
    if (!isPassiveSecondaryStatusActive(status)) continue
    if (status.effects.some((effect) => effect.type === 'accuracy-bypass')) {
      return true
    }
  }

  return false
}

export function processBeforeMoveSecondaryStatuses(params: {
  state?: BattleState
  pokemon: BattlePokemon
  side?: BattleSide
  move?: MoveConfig
  attackType?: string
  random?: () => number
}): { canMove: boolean; message: string } {
  const random = params.random ?? Math.random
  if (params.pokemon.currentHp <= 0) return { canMove: true, message: '' }

  for (const status of getStatusesAffectingPokemon(
    params.state,
    params.pokemon,
    params.side,
  )) {
    for (const effect of status.effects) {
      if (effect.type !== 'infatuation') continue
      if (rollChance(effect.chance ?? 50, random)) {
        return {
          canMove: false,
          message: `${params.pokemon.name} is immobilized by love!`,
        }
      }
    }
  }

  if (params.move || params.attackType) {
    for (const status of getStatusesAffectingPokemon(
      params.state,
      params.pokemon,
      params.side,
    )) {
      for (const effect of status.effects) {
        if (effect.type !== 'move-block') continue
        const blocksZeroDamage = effect.mode === 'zero-damage' && (params.move?.damage ?? 1) <= 0
        const blocksMoveId =
          effect.mode === 'move-id' &&
          Boolean(params.move && Array.isArray(effect.moveIds) && effect.moveIds.includes(params.move.id))
        const blocksLastUsed =
          effect.mode === 'last-used' &&
          params.state?.moveHistory?.lastSuccessful?.[params.side ?? 'player']?.pokemonId === params.pokemon.id &&
          params.state?.moveHistory?.lastSuccessful?.[params.side ?? 'player']?.moveId === params.move?.id
        const blocksHealing = effect.mode === 'healing' && Boolean(params.move && isHealingMove(params.move))
        const blocksAttackType = effect.mode === 'attack-type' && Boolean(params.attackType)
        const blockedByMode =
          blocksZeroDamage || blocksMoveId || blocksLastUsed || blocksHealing || blocksAttackType
        if (!blockedByMode) continue
        if (
          effect.attackTypes?.length &&
          !effect.attackTypes.some(
            (attackType) => attackType.toLowerCase() === params.attackType?.toLowerCase(),
          )
        ) {
          continue
        }

        const damage = effect.damagePercentMaxHp
          ? Math.min(
              params.pokemon.currentHp,
              Math.ceil((params.pokemon.maxHp * effect.damagePercentMaxHp) / 100),
            )
          : 0
        if (damage > 0) {
          params.pokemon.currentHp = Math.max(0, params.pokemon.currentHp - damage)
        }
        if (effect.removeOnBlock) {
          removePokemonSecondaryStatusInstance(params.pokemon, status)
        }
        const moveName = params.move?.name ?? `${params.attackType} attack`
        return {
          canMove: false,
          message:
            `${params.pokemon.name} cannot use ${moveName} because of ${status.name}.` +
            (damage > 0 ? ` [icon:damage:${damage}]` : ''),
        }
      }
    }

    for (const status of getStatusesAffectingPokemon(
      params.state,
      params.pokemon,
      params.side,
    )) {
      for (const effect of status.effects) {
        if (effect.type !== 'snatch-beneficial-move') continue
        if (!params.state || !params.move || !moveHasSnatchableBeneficialEffect(params.move)) continue
        const source = activePokemonForSide(params.state, status.sourceSide)
        removePokemonSecondaryStatusInstance(params.pokemon, status)
        return {
          canMove: false,
          message: applySnatchedBeneficialEffects({
            move: params.move,
            source,
          }).join(' '),
        }
      }
    }
  }

  return { canMove: true, message: '' }
}

export function getSecondaryStatusSwitchPreventionMessage(params: {
  state?: BattleState
  pokemon: BattlePokemon
  side?: BattleSide
}): string | undefined {
  for (const status of getStatusesAffectingPokemon(
    params.state,
    params.pokemon,
    params.side,
  )) {
    if (status.effects.some((effect) => effect.type === 'switch-prevention')) {
      return `${params.pokemon.name} cannot switch out because of ${status.name}.`
    }
  }

  return undefined
}

export function getSecondaryStatusStatusPreventionMessage(params: {
  state?: BattleState
  pokemon: BattlePokemon
  side?: BattleSide
  statusId: StatusEffectId
}): string | undefined {
  for (const status of getStatusesAffectingPokemon(
    params.state,
    params.pokemon,
    params.side,
  )) {
    for (const effect of status.effects) {
      if (effect.type !== 'status-immunity') continue
      if (statusListMatches(params.statusId, effect.statuses)) {
        return `${params.pokemon.name} is protected from ${params.statusId} by ${status.name}.`
      }
    }
  }

  return undefined
}

export function applySecondaryStatusDamageReduction(params: {
  state?: BattleState
  defender: BattlePokemon
  defenderSide?: BattleSide
  damage: number
  attackStance?: BattleStance
  attackType?: string
}): { damage: number; messages: string[] } {
  let damage = params.damage
  const messages: string[] = []
  if (damage <= 0) return { damage, messages }

  for (const status of getStatusesAffectingPokemon(
    params.state,
    params.defender,
    params.defenderSide,
  )) {
    if (!isPassiveSecondaryStatusActive(status)) continue
    for (const effect of status.effects) {
      if (effect.type !== 'damage-reduction') continue
      if (effect.stance && effect.stance !== params.attackStance) continue
      if (
        effect.attackType &&
        effect.attackType.toLowerCase() !== params.attackType?.toLowerCase()
      ) {
        continue
      }

      const reduction = Math.max(0, Math.min(100, effect.percent))
      const nextDamage = Math.floor(damage * (1 - reduction / 100))
      if (nextDamage < damage) {
        messages.push(`${status.name} reduced damage by ${reduction}%.`)
        damage = nextDamage
      }
    }
  }

  return { damage, messages }
}

export function applySecondaryStatusDamageModifiers(params: {
  state?: BattleState
  attacker: BattlePokemon
  defender: BattlePokemon
  attackerSide?: BattleSide
  defenderSide?: BattleSide
  damage: number
  attackStance?: BattleStance
  attackType?: string
}): { damage: number; messages: string[] } {
  let damage = params.damage
  const messages: string[] = []
  if (damage <= 0) return { damage, messages }

  for (const status of getStatusesAffectingPokemon(
    params.state,
    params.attacker,
    params.attackerSide,
  )) {
    if (!isPassiveSecondaryStatusActive(status)) continue
    for (const effect of status.effects) {
      if (effect.type !== 'damage-modifier') continue
      if (effect.stance && effect.stance !== params.attackStance) continue
      if (
        effect.attackType &&
        effect.attackType.toLowerCase() !== params.attackType?.toLowerCase()
      ) {
        continue
      }

      const percent = Math.max(-100, effect.percent)
      const source =
        status.sourceSide && params.attackerSide
          ? status.sourceSide === params.attackerSide
            ? 'self'
            : 'opponent'
          : 'opponent'
      if (
        percent < 0 &&
        (blocksBattleOutgoingDamageReductionByAbility(params.attacker) ||
          blocksBattleStatStageDropByAbility({
            pokemon: params.attacker,
            stat: 'accuracy',
            source,
          }))
      ) {
        messages.push(
          `${params.attacker.name}'s ability prevented ${status.name} from reducing damage.`,
        )
        continue
      }
      const nextDamage = Math.max(0, Math.floor(damage * (1 + percent / 100)))
      if (nextDamage !== damage) {
        const verb = percent >= 0 ? 'increased' : 'reduced'
        messages.push(`${status.name} ${verb} damage by ${Math.abs(percent)}%.`)
        damage = nextDamage
      }
    }
  }

  const reduction = applySecondaryStatusDamageReduction({
    state: params.state,
    defender: params.defender,
    defenderSide: params.defenderSide,
    damage,
    attackStance: params.attackStance,
    attackType: params.attackType,
  })

  damage = reduction.damage
  messages.push(...reduction.messages)

  for (const status of getStatusesAffectingPokemon(
    params.state,
    params.defender,
    params.defenderSide,
  )) {
    if (!isPassiveSecondaryStatusActive(status)) continue
    for (const effect of status.effects) {
      if (effect.type !== 'damage-taken-modifier') continue
      if (effect.stance && effect.stance !== params.attackStance) continue
      if (
        effect.attackType &&
        effect.attackType.toLowerCase() !== params.attackType?.toLowerCase()
      ) {
        continue
      }

      const percent = Math.max(-100, effect.percent)
      const nextDamage = Math.max(0, Math.floor(damage * (1 + percent / 100)))
      if (nextDamage !== damage) {
        const verb = percent >= 0 ? 'increased' : 'reduced'
        messages.push(`${status.name} ${verb} damage taken by ${Math.abs(percent)}%.`)
        damage = nextDamage
      }
    }
  }

  return {
    damage,
    messages,
  }
}
