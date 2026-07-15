import {
  ABILITIES,
  getPrimaryFormAbilityId,
  type AbilityConfig,
  type AbilityEffect,
  type AbilityEffectCondition,
} from '@/data/abilities'
import type { LocationEncounter, LocationReward } from '@/data/types'
import type { FieldObservationSettings } from '@/data/games/field-observation'
import type { EncounterState } from '@/app/(frontend)/game/locations/encounter/actions/types'
import { resolveDropMaterialTier } from '@/utilities/artisan/material-drops'
import { getPokemonForm, getPokemonSpecies } from '@/utilities/pokemon/pokedex'

export interface AbilityQuizOption {
  value: string
  label: string
  disabledUntil?: number
  highlighted?: boolean
  highlightedUntil?: number
}

export interface DecoratedQuizQuestion {
  id: string
  attemptId: string
  question: string
  options: AbilityQuizOption[]
}

interface AbilityContext {
  state: EncounterState
  ability?: AbilityConfig
  sourceFormId?: string
  targetTypes?: string[]
  activePokemonLevel?: number
}

export interface AbilityEffectContext {
  state?: EncounterState
  formId?: string
  sourceFormId?: string
  speciesId?: number
  locationId?: string
  targetTypes?: string[]
  category?: string
  subCategory?: string
  gameType?: string
  researchId?: string
  weather?: string
  trigger?: 'correct' | 'wrong' | 'complete'
  firstAnswer?: boolean
  sameSourceForm?: boolean
  activeLevelBeatsTarget?: boolean
  noWrongAnswers?: boolean
  caught?: boolean
  timeRemaining?: boolean
  correctAnswers?: number
  correctStreak?: number
  surveyFocus?: string[]
  isNight?: boolean
  now?: Date
}

export interface FieldObservationSpawnAbilityModifiers {
  spawnCountMultiplier: number
  shinyChanceMultiplier: number
  hiddenChanceMultiplier: number
  eventChanceMultiplier: number
}

export interface FieldObservationGlobalEventAbilityMultipliers {
  pokemonEventMultiplier: number
  itemEventMultiplier: number
}

export interface FieldObservationCollectibleAbilityModifier {
  dropChanceMultiplier: number
  quantityBonus: number
  durationMultiplier: number
}

const MATERIAL_FAMILIES: Record<string, string> = {
  normal: 'soft-fluff',
  fire: 'cinder-shard',
  water: 'aqua-solvent',
  electric: 'electric-component',
  flying: 'wing-feather',
  ground: 'terra-dust',
  fighting: 'grip-weave',
  poison: 'toxic-resin',
  rock: 'small-stone',
  ghost: 'spirit-wisp',
  dragon: 'drake-scale',
  steel: 'metal-scrap',
}

export function isNightHour(date = new Date()) {
  const hour = date.getHours()
  return hour >= 18 || hour < 6
}

function rollPercent(chance: number | undefined) {
  return typeof chance !== 'number' || Math.random() * 100 < chance
}

function clamp(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min
  return Math.max(min, Math.min(max, value))
}

function hasType(types: string[] | undefined, type: string) {
  const normalized = type.toLowerCase()
  return !!types?.some((candidate) => candidate.toLowerCase() === normalized)
}

function hasAnyType(types: string[] | undefined, required: readonly string[] | undefined) {
  if (!required?.length) return true
  return required.some((type) => hasType(types, type))
}

function scramble(value: string) {
  if (value.length < 4) return value
  return value
    .split('')
    .sort(() => Math.random() - 0.5)
    .join('')
}

function rotate<T>(values: T[]) {
  if (values.length < 2) return values
  return [...values.slice(1), values[0]]
}

function materialReward(
  type: string,
  quantity: number,
  dropChance = 100,
): LocationReward {
  const family = MATERIAL_FAMILIES[type]
  const tier = resolveDropMaterialTier()
  return {
    type: 'item',
    targetId: `${family}-t${tier}`,
    quantity,
    dropChance,
  }
}

function getFieldObservationPoolEntryTypes(entry: { speciesId: number; formId?: string }) {
  const formId = entry.formId || entry.speciesId.toString()
  const form = getPokemonForm(formId)
  const species = getPokemonSpecies(entry.speciesId)
  return ((form as any)?.types || (species as any)?.types || []) as string[]
}

function candyForLevel(level: number) {
  if (level < 10) return 'rare-candy-xs'
  if (level < 20) return 'rare-candy-s'
  if (level < 30) return 'rare-candy-m'
  if (level < 40) return 'rare-candy-l'
  if (level < 50) return 'rare-candy-xl'
  if (level < 60) return 'rare-candy-xxl'
  if (level < 70) return 'rare-candy-mega'
  if (level < 80) return 'rare-candy-giga'
  if (level < 90) return 'rare-candy-tera'
  return 'rare-candy-max'
}

export function getStoredEncounterAbility(state: EncounterState): AbilityConfig | undefined {
  const id = state.copiedAbilityId || state.activeAbilityId || state.rewardModifier
  return id ? ABILITIES[id] : undefined
}

export function getAbilityEffects(ability?: AbilityConfig): readonly AbilityEffect[] {
  return ability?.effects || []
}

export function matchesAbilityEffectCondition(
  effect: { condition?: AbilityEffectCondition } | AbilityEffect,
  context: AbilityEffectContext,
): boolean {
  const criteria = 'condition' in effect ? effect.condition : undefined
  if (!criteria) return true
  if (!rollPercent(criteria.chance)) return false
  if (criteria.trigger && criteria.trigger !== context.trigger) return false
  if (criteria.formId && criteria.formId !== context.formId) return false
  if (criteria.sourceFormId && criteria.sourceFormId !== context.sourceFormId) return false
  if (criteria.speciesId?.length && !criteria.speciesId.includes(context.speciesId || 0)) {
    return false
  }
  if (criteria.locationId && criteria.locationId !== context.locationId) return false
  if (criteria.category && criteria.category !== context.category) return false
  if (criteria.subCategory && criteria.subCategory !== context.subCategory) return false
  if (criteria.gameType?.length && (!context.gameType || !criteria.gameType.includes(context.gameType))) {
    return false
  }
  if (criteria.researchId?.length && (!context.researchId || !criteria.researchId.includes(context.researchId))) {
    return false
  }
  if (criteria.weather?.length && (!context.weather || !criteria.weather.includes(context.weather))) {
    return false
  }
  const isNight = typeof context.isNight === 'boolean' ? context.isNight : isNightHour(context.now)
  if (criteria.timeOfDay === 'night' && !isNight) return false
  if (criteria.timeOfDay === 'day' && isNight) return false
  if (!hasAnyType(context.targetTypes, criteria.type)) return false
  if (typeof criteria.firstAnswer === 'boolean' && criteria.firstAnswer !== context.firstAnswer) {
    return false
  }
  if (
    typeof criteria.sameSourceForm === 'boolean' &&
    criteria.sameSourceForm !== context.sameSourceForm
  ) {
    return false
  }
  if (
    typeof criteria.activeLevelBeatsTarget === 'boolean' &&
    criteria.activeLevelBeatsTarget !== context.activeLevelBeatsTarget
  ) {
    return false
  }
  if (
    typeof criteria.noWrongAnswers === 'boolean' &&
    criteria.noWrongAnswers !== context.noWrongAnswers
  ) {
    return false
  }
  if (typeof criteria.caught === 'boolean' && criteria.caught !== context.caught) return false
  if (
    typeof criteria.timeRemaining === 'boolean' &&
    criteria.timeRemaining !== context.timeRemaining
  ) {
    return false
  }
  const correctAnswers = context.correctAnswers || 0
  const correctStreak = context.correctStreak || 0
  if (
    typeof criteria.minimumCorrectAnswers === 'number' &&
    correctAnswers < criteria.minimumCorrectAnswers
  ) {
    return false
  }
  if (
    typeof criteria.exactCorrectAnswers === 'number' &&
    correctAnswers !== criteria.exactCorrectAnswers
  ) {
    return false
  }
  if (
    typeof criteria.correctStreakAtMost === 'number' &&
    correctStreak > criteria.correctStreakAtMost
  ) {
    return false
  }
  if (
    typeof criteria.correctStreakModulo === 'number' &&
    (criteria.correctStreakModulo <= 0 || correctStreak % criteria.correctStreakModulo !== 0)
  ) {
    return false
  }
  if (criteria.minuteWindow) {
    const now = context.now || new Date()
    if (now.getHours() !== criteria.minuteWindow.hour) return false
    if (now.getMinutes() >= criteria.minuteWindow.beforeMinute) return false
  }
  if (criteria.hourRange) {
    const hour = (context.now || new Date()).getHours()
    if (hour < criteria.hourRange.start || hour >= criteria.hourRange.end) return false
  }
  if (criteria.surveyFocus?.length) {
    const focus = context.surveyFocus || []
    if (!criteria.surveyFocus.some((value) => focus.includes(value))) return false
  }
  return true
}

export function resolveStartAbilityId(activeAbilityId: string | undefined, targetFormId: string) {
  const ability = activeAbilityId ? ABILITIES[activeAbilityId] : undefined
  const effect = getAbilityEffects(ability).find(
    (candidate) =>
      candidate.type === 'temporary-copy-target-primary-ability' && rollPercent(candidate.chance),
  )
  if (!effect) return activeAbilityId
  const copiedId = getPrimaryFormAbilityId(targetFormId)
  return copiedId && copiedId !== activeAbilityId ? copiedId : activeAbilityId
}

export function chooseAbilityEncounterReplacement(input: {
  ability?: AbilityConfig
  formId: string
  speciesId?: number
  sourceFormId?: string
  locationId: string
  targetTypes?: string[]
  category?: string
  subCategory?: string
  isNight?: boolean
}): LocationEncounter | undefined {
  for (const effect of getAbilityEffects(input.ability)) {
    if (effect.type !== 'encounter-replacement') continue
    if (!rollPercent(effect.chance)) continue
    if (!matchesAbilityEffectCondition(effect, input)) continue
    const roll = Math.random() * 100
    let cumulative = 0
    for (const encounter of effect.encounters) {
      cumulative += encounter.chance
      if (roll <= cumulative) return encounter
    }
  }
  return undefined
}

export function getAbilityTimerDeltaSeconds(input: {
  ability?: AbilityConfig
  formId: string
  speciesId?: number
  sourceFormId?: string
  locationId: string
  targetTypes?: string[]
  isNight?: boolean
}) {
  return getAbilityEffects(input.ability).reduce((total, effect) => {
    if (effect.type !== 'timer-delta') return total
    return matchesAbilityEffectCondition(effect, input) ? total + effect.seconds : total
  }, 0)
}

export function getAbilityLevelDelta(input: {
  ability?: AbilityConfig
  formId: string
  speciesId?: number
  sourceFormId?: string
  locationId: string
  targetTypes?: string[]
  isNight?: boolean
}) {
  return getAbilityEffects(input.ability).reduce((total, effect) => {
    if (effect.type !== 'level-delta') return total
    return matchesAbilityEffectCondition(effect, input) ? total + effect.levels : total
  }, 0)
}

export function getAbilityShinyMultiplier(input: {
  ability?: AbilityConfig
  formId: string
  speciesId?: number
  sourceFormId?: string
  locationId: string
  targetTypes?: string[]
  isNight?: boolean
}) {
  return getAbilityEffects(input.ability).reduce((multiplier, effect) => {
    if (effect.type !== 'shiny-chance-multiplier') return multiplier
    return matchesAbilityEffectCondition(effect, input) ? multiplier * effect.multiplier : multiplier
  }, 1)
}

export function getAbilityEscapeChance(input: {
  ability?: AbilityConfig
  formId?: string
  speciesId?: number
  sourceFormId?: string
  locationId?: string
  targetTypes?: string[]
  isNight?: boolean
}) {
  for (const effect of getAbilityEffects(input.ability)) {
    if (effect.type === 'active-escape' && matchesAbilityEffectCondition(effect, input)) {
      return effect.chance
    }
  }
  return undefined
}

export function decorateQuizQuestion(input: {
  state: EncounterState
  ability?: AbilityConfig
  question: {
    id: string
    attemptId: string
    question: string
    options: string[]
  }
  correctAnswer: string
}): DecoratedQuizQuestion {
  const { state, ability, correctAnswer } = input
  const now = Date.now()
  let questionText = input.question.question
  let options: AbilityQuizOption[] = input.question.options.map((option) => ({
    value: option,
    label: option,
  }))
  const wrongIndexes = () =>
    options
      .map((option, index) => ({ option, index }))
      .filter(({ option }) => option.value !== correctAnswer)

  for (const effect of getAbilityEffects(ability)) {
    if (effect.type !== 'quiz-decoration') continue
    if (!rollPercent(effect.chance)) continue
    switch (effect.mode) {
      case 'hide-option-labels':
        options = options.map((option) => ({ ...option, label: '???' }))
        break
      case 'scramble-question-and-options':
        questionText = scramble(questionText)
        options = options.map((option) => ({ ...option, label: scramble(option.label) }))
        break
      case 'remove-wrong-option': {
        const wrong = wrongIndexes()[0]
        if (wrong) options = options.filter((_, index) => index !== wrong.index)
        break
      }
      case 'replace-wrong-option': {
        const wrong = wrongIndexes()[0]
        if (wrong) {
          options[wrong.index] = {
            ...options[wrong.index],
            label: effect.label || options[wrong.index].label,
            disabledUntil: effect.disabledMs ? now + effect.disabledMs : undefined,
          }
        }
        break
      }
      case 'disable-wrong-options':
        options = options.map((option) =>
          option.value === correctAnswer
            ? option
            : { ...option, disabledUntil: state.startTime + (effect.disabledMs || 0) },
        )
        break
      case 'highlight-random-option': {
        const index = Math.floor(Math.random() * options.length)
        options[index] = { ...options[index], highlighted: true }
        break
      }
      case 'highlight-correct-option': {
        const index = options.findIndex((option) => option.value === correctAnswer)
        if (index >= 0) {
          options[index] = {
            ...options[index],
            highlighted: true,
            highlightedUntil: effect.highlightedMs ? now + effect.highlightedMs : undefined,
          }
        }
        break
      }
      case 'rotate-options':
        options = rotate(options)
        break
      case 'swap-correct-with-last-position': {
        if (typeof state.lastCorrectOptionIndex !== 'number') break
        const correctIndex = options.findIndex((option) => option.value === correctAnswer)
        const targetIndex = Math.min(state.lastCorrectOptionIndex, options.length - 1)
        if (correctIndex >= 0 && correctIndex !== targetIndex) {
          const swapped = [...options]
          ;[swapped[correctIndex], swapped[targetIndex]] = [
            swapped[targetIndex],
            swapped[correctIndex],
          ]
          options = swapped
        }
        break
      }
    }
  }

  return {
    ...input.question,
    question: questionText,
    options,
  }
}

export function applyAnswerAbility(
  input: AbilityContext & {
    isCorrect: boolean
    changeAmount: number
    optionIndex?: number
  },
): {
  isCorrect: boolean
  skipDefault?: boolean
  rateDelta?: number
  timerDeltaMs?: number
  failEncounter?: boolean
  abilityLost?: boolean
  message?: string
} {
  const { state, ability, sourceFormId, targetTypes, activePokemonLevel, changeAmount } = input
  const totalAnswers = state.questionsAnswered.length
  const isFirstAnswer = totalAnswers === 0
  let isCorrect = input.isCorrect
  const activeLevelBeatsTarget =
    typeof activePokemonLevel === 'number' &&
    (state.levelRange?.max || state.level || 1) < activePokemonLevel

  if (isCorrect && typeof input.optionIndex === 'number') {
    state.lastCorrectOptionIndex = input.optionIndex
  }

  const baseContext: AbilityEffectContext = {
    state,
    formId: state.formId,
    speciesId: state.pokemonId,
    sourceFormId,
    locationId: state.locationId,
    targetTypes,
    firstAnswer: isFirstAnswer,
    sameSourceForm: state.formId === sourceFormId,
    activeLevelBeatsTarget,
    isNight: isNightHour(),
  }

  if (!isCorrect) {
    for (const effect of getAbilityEffects(ability)) {
      if (effect.type !== 'answer-convert-wrong-to-correct') continue
      if (!rollPercent(effect.chance)) continue
      if (!matchesAbilityEffectCondition(effect, { ...baseContext, trigger: 'wrong' })) continue
      isCorrect = true
      break
    }
  }

  const projectedCorrectAnswers = (state.totalCorrectAnswers || 0) + (isCorrect ? 1 : 0)
  const projectedCorrectStreak = (state.consecutiveCorrectAnswers || 0) + (isCorrect ? 1 : 0)
  const context: AbilityEffectContext = {
    ...baseContext,
    trigger: isCorrect ? 'correct' : 'wrong',
    correctAnswers: projectedCorrectAnswers,
    correctStreak: projectedCorrectStreak,
  }
  const result = { isCorrect } as ReturnType<typeof applyAnswerAbility>

  for (const effect of getAbilityEffects(ability)) {
    if (!matchesAbilityEffectCondition(effect, context)) continue
    switch (effect.type) {
      case 'answer-fail-encounter':
        return {
          ...result,
          failEncounter: true,
          abilityLost: effect.abilityLost,
          message: effect.message,
        }
      case 'answer-skip-default':
        result.skipDefault = true
        break
      case 'answer-rate-delta':
        result.rateDelta =
          (result.rateDelta || 0) +
          (effect.amount || 0) +
          (effect.changeAmountMultiplier || 0) * changeAmount
        if (effect.message) result.message = effect.message
        break
      case 'answer-timer-delta':
        result.timerDeltaMs = (result.timerDeltaMs || 0) + effect.milliseconds
        break
      case 'answer-reset-correct-streak':
        state.consecutiveCorrectAnswers = 0
        break
    }
  }

  const convertEffect = getAbilityEffects(ability).find(
    (effect) => effect.type === 'answer-convert-wrong-to-correct' && effect.message,
  )
  if (isCorrect !== input.isCorrect && convertEffect?.type === 'answer-convert-wrong-to-correct') {
    result.message = convertEffect.message
  }
  return result
}

export function getCaptureAbilityRewards(input: {
  state: EncounterState
  ability?: AbilityConfig
  sourceFormId?: string
  level: number
  targetTypes: string[]
  researchingLevel: number
  caught: boolean
}): { rewards: LocationReward[]; abilityLost?: boolean } {
  const { state, ability, sourceFormId, level, targetTypes, researchingLevel, caught } = input
  const rewards: LocationReward[] = []
  let abilityLost = false
  const context: AbilityEffectContext = {
    state,
    formId: state.formId,
    speciesId: state.pokemonId,
    sourceFormId,
    locationId: state.locationId,
    targetTypes,
    trigger: 'complete',
    caught,
    noWrongAnswers: !state.lastAnswerWasWrong,
    timeRemaining: Date.now() < state.expiry,
    correctAnswers: state.totalCorrectAnswers || 0,
    correctStreak: state.consecutiveCorrectAnswers || 0,
    isNight: isNightHour(),
  }

  for (const effect of getAbilityEffects(ability)) {
    if (!matchesAbilityEffectCondition(effect, context)) continue
    switch (effect.type) {
      case 'capture-rewards':
        rewards.push(...effect.rewards)
        break
      case 'capture-material-reward':
        rewards.push(
          materialReward(
            effect.materialType,
            effect.quantity,
            effect.dropChance,
          ),
        )
        break
      case 'capture-currency-by-level':
        rewards.push({
          type: 'currency',
          targetId: effect.currencyId,
          quantity: level * effect.levelMultiplier,
          dropChance: 100,
        })
        break
      case 'capture-candy-by-level':
        rewards.push({
          type: 'item',
          targetId: candyForLevel(level),
          quantity: 1,
          dropChance: effect.dropChance ?? 100,
        })
        break
      case 'capture-source-form-item':
        if (rollPercent(effect.chance)) {
          rewards.push({
            type: 'item',
            targetId: effect.sourceFormItems[sourceFormId || ''] || effect.fallbackItemId,
            quantity: 1,
            dropChance: 100,
          })
          abilityLost = abilityLost || !!effect.abilityLost
        }
        break
      case 'capture-random-item':
        if (rollPercent(effect.chance) && effect.itemIds.length) {
          rewards.push({
            type: 'item',
            targetId: effect.itemIds[Math.floor(Math.random() * effect.itemIds.length)],
            quantity: 1,
            dropChance: 100,
          })
        }
        break
      case 'capture-research-xp':
        rewards.push({
          type: 'pokemon_research_xp',
          targetId: effect.target === 'encounter-form' ? state.formId : state.formId,
          quantity: effect.amount,
          dropChance: 100,
        })
        break
    }
  }

  return { rewards, abilityLost }
}

export function shouldUseExtraShinyRoll(input: {
  ability?: AbilityConfig
  sourceFormId?: string
  targetFormId: string
  shinyChance?: number
}) {
  for (const effect of getAbilityEffects(input.ability)) {
    if (effect.type !== 'extra-shiny-roll') continue
    if (effect.mode === 'same-source-form') {
      if (input.sourceFormId === input.targetFormId) {
        return Math.random() < (input.shinyChance || 0)
      }
      continue
    }
    if (effect.mode === 'fixed-chance') {
      return rollPercent(effect.chance)
    }
  }
  return false
}

export function getResearchSessionTimeDeltaSeconds(input: {
  ability?: AbilityConfig
  gameType?: string
  researchId?: string
  category?: string
  subCategory?: string
  weather?: string
  surveyFocus?: string[]
}) {
  return getAbilityEffects(input.ability).reduce((total, effect) => {
    if (effect.type !== 'research-session-time-delta') return total
    return matchesAbilityEffectCondition(effect, input) ? total + effect.seconds : total
  }, 0)
}

export function shouldApplyResearchAnswerGrace(input: {
  ability?: AbilityConfig
  gameType?: string
  researchId?: string
  category?: string
  subCategory?: string
  weather?: string
  surveyFocus?: string[]
}) {
  return getAbilityEffects(input.ability).some((effect) => {
    if (effect.type !== 'research-answer-grace') return false
    return rollPercent(effect.chance) && matchesAbilityEffectCondition(effect, input)
  })
}

export function getResearchWinDelta(input: {
  ability?: AbilityConfig
  gameType?: string
  researchId?: string
  category?: string
  subCategory?: string
  weather?: string
  trigger?: 'correct' | 'wrong' | 'complete'
  surveyFocus?: string[]
}) {
  return getAbilityEffects(input.ability).reduce((total, effect) => {
    if (effect.type !== 'research-win-delta') return total
    return matchesAbilityEffectCondition(effect, input) ? total + effect.amount : total
  }, 0)
}

export function getResearchSkillXpMultiplier(input: {
  ability?: AbilityConfig
  gameType?: string
  researchId?: string
  category?: string
  subCategory?: string
  weather?: string
  surveyFocus?: string[]
}) {
  return getAbilityEffects(input.ability).reduce((multiplier, effect) => {
    if (effect.type !== 'research-skill-xp-multiplier') return multiplier
    return matchesAbilityEffectCondition(effect, input) ? multiplier * effect.multiplier : multiplier
  }, 1)
}

export function getResearchCompletionRewards(input: {
  ability?: AbilityConfig
  gameType?: string
  researchId?: string
  category?: string
  subCategory?: string
  weather?: string
  surveyFocus?: string[]
  trigger?: 'complete'
}) {
  const rewards: LocationReward[] = []
  for (const effect of getAbilityEffects(input.ability)) {
    if (effect.type !== 'research-rewards') continue
    if (matchesAbilityEffectCondition(effect, input)) rewards.push(...effect.rewards)
  }
  return rewards
}

export function getFieldObservationDurationDelta(input: {
  ability?: AbilityConfig
  gameType?: string
  researchId?: string
  category?: string
  subCategory?: string
  weather?: string
  surveyFocus?: string[]
}) {
  return getAbilityEffects(input.ability).reduce(
    (delta, effect) => {
      if (effect.type !== 'field-observation-duration-delta') return delta
      if (!matchesAbilityEffectCondition(effect, input)) return delta
      return {
        observationSeconds: delta.observationSeconds + (effect.observationSeconds || 0),
        answerSeconds: delta.answerSeconds + (effect.answerSeconds || 0),
      }
    },
    { observationSeconds: 0, answerSeconds: 0 },
  )
}

export function applyFieldObservationPoolWeightModifiers(
  settings: FieldObservationSettings,
  input: {
    ability?: AbilityConfig
    gameType?: string
    researchId?: string
    category?: string
    subCategory?: string
    weather?: string
    surveyFocus?: string[]
  },
): FieldObservationSettings {
  const effects = getAbilityEffects(input.ability).filter(
    (effect) => effect.type === 'field-observation-pool-weight-multiplier',
  )
  if (!effects.length) return settings

  let changed = false
  const pokemonPool = settings.pokemonPool.map((entry) => {
    const targetTypes = getFieldObservationPoolEntryTypes(entry)
    const multiplier = effects.reduce((total, effect) => {
      if (effect.type !== 'field-observation-pool-weight-multiplier') return total
      const matches = matchesAbilityEffectCondition(effect, {
        ...input,
        speciesId: entry.speciesId,
        formId: entry.formId || entry.speciesId.toString(),
        targetTypes,
      })
      return matches ? total * clamp(effect.multiplier, 0.5, 1.2) : total
    }, 1)
    if (multiplier === 1) return entry
    changed = true
    return {
      ...entry,
      weight: Number(Math.max(0.01, entry.weight * multiplier).toFixed(4)),
    }
  })

  return changed ? { ...settings, pokemonPool } : settings
}

export function getFieldObservationSpawnModifiers(input: {
  ability?: AbilityConfig
  gameType?: string
  researchId?: string
  category?: string
  subCategory?: string
  weather?: string
  surveyFocus?: string[]
}): FieldObservationSpawnAbilityModifiers {
  return getAbilityEffects(input.ability).reduce<FieldObservationSpawnAbilityModifiers>(
    (modifiers, effect) => {
      if (effect.type !== 'field-observation-spawn-modifier') return modifiers
      if (!matchesAbilityEffectCondition(effect, input)) return modifiers
      return {
        spawnCountMultiplier:
          modifiers.spawnCountMultiplier *
          clamp(effect.spawnCountMultiplier ?? 1, 0.75, 1.1),
        shinyChanceMultiplier:
          modifiers.shinyChanceMultiplier *
          clamp(effect.shinyChanceMultiplier ?? 1, 0.5, 1),
        hiddenChanceMultiplier:
          modifiers.hiddenChanceMultiplier *
          clamp(effect.hiddenChanceMultiplier ?? 1, 0.75, 1.1),
        eventChanceMultiplier:
          modifiers.eventChanceMultiplier *
          clamp(effect.eventChanceMultiplier ?? 1, 0.75, 1.1),
      }
    },
    {
      spawnCountMultiplier: 1,
      shinyChanceMultiplier: 1,
      hiddenChanceMultiplier: 1,
      eventChanceMultiplier: 1,
    },
  )
}

export function getFieldObservationGlobalEventMultipliers(input: {
  ability?: AbilityConfig
  gameType?: string
  researchId?: string
  category?: string
  subCategory?: string
  weather?: string
  surveyFocus?: string[]
}): FieldObservationGlobalEventAbilityMultipliers {
  return getAbilityEffects(input.ability).reduce<FieldObservationGlobalEventAbilityMultipliers>(
    (multipliers, effect) => {
      if (effect.type !== 'field-observation-global-event-odds-multiplier') {
        return multipliers
      }
      if (!matchesAbilityEffectCondition(effect, input)) return multipliers
      return {
        pokemonEventMultiplier:
          multipliers.pokemonEventMultiplier *
          clamp(effect.pokemonEventMultiplier ?? 1, 0.5, 1.05),
        itemEventMultiplier:
          multipliers.itemEventMultiplier *
          clamp(effect.itemEventMultiplier ?? 1, 0.5, 1.1),
      }
    },
    { pokemonEventMultiplier: 1, itemEventMultiplier: 1 },
  )
}

export function getFieldObservationCollectibleModifiers(input: {
  ability?: AbilityConfig
  gameType?: string
  researchId?: string
  category?: string
  subCategory?: string
  weather?: string
  surveyFocus?: string[]
}): FieldObservationCollectibleAbilityModifier[] {
  return getAbilityEffects(input.ability).flatMap((effect) => {
    if (effect.type !== 'field-observation-collectible-modifier') return []
    if (!matchesAbilityEffectCondition(effect, input)) return []
    return [
      {
        dropChanceMultiplier: clamp(effect.dropChanceMultiplier ?? 1, 0.5, 1.1),
        quantityBonus: clamp(effect.quantityBonus ?? 0, 0, 1),
        durationMultiplier: clamp(effect.durationMultiplier ?? 1, 0.75, 1.1),
      },
    ]
  })
}

export function getFieldObservationResearchXpMultiplier(input: {
  ability?: AbilityConfig
  gameType?: string
  researchId?: string
  category?: string
  subCategory?: string
  weather?: string
  surveyFocus?: string[]
}) {
  return getAbilityEffects(input.ability).reduce((multiplier, effect) => {
    if (effect.type !== 'field-observation-research-xp-multiplier') return multiplier
    return matchesAbilityEffectCondition(effect, input) ? multiplier * effect.multiplier : multiplier
  }, 1)
}

export function getFieldObservationExtraCollectibles(input: {
  ability?: AbilityConfig
  gameType?: string
  researchId?: string
  category?: string
  subCategory?: string
  weather?: string
  surveyFocus?: string[]
}) {
  return getAbilityEffects(input.ability).flatMap((effect) => {
    if (effect.type !== 'field-observation-extra-collectible') return []
    return matchesAbilityEffectCondition(effect, input)
      ? [{ reward: effect.reward, kind: effect.kind }]
      : []
  })
}

export function shouldProtectFieldObservationRewards(input: {
  ability?: AbilityConfig
  gameType?: string
  researchId?: string
  category?: string
  subCategory?: string
  weather?: string
  surveyFocus?: string[]
}) {
  return getAbilityEffects(input.ability).some((effect) => {
    if (effect.type !== 'field-observation-reward-protection') return false
    return rollPercent(effect.chance) && matchesAbilityEffectCondition(effect, input)
  })
}
