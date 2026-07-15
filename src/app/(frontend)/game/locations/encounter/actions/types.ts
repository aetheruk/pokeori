import type { LocationEncounterShield } from '@/data/locations'
import type { EncounterQteState } from '@/utilities/pokemon/encounter-qte'
import type { WeatherSnapshot } from '@/utilities/weather'

export interface EncounterShieldState {
  config: LocationEncounterShield
  active: boolean
  correctAnswers: number
  consecutiveCorrectAnswers: number
  brokenCount: number
  brokenAt?: number
  nextRegenAt?: number
}

export interface EncounterState {
  userId: string
  locationId: string
  pokemonId: number
  formId: string
  isShiny: boolean
  gender?: 'male' | 'female' | 'genderless'
  startTime: number
  expiry: number
  baseCatchRate: number
  currentCatchRate: number
  questionsAnswered: string[]
  itemsUsed: string[]
  totalCorrectAnswers?: number
  consecutiveCorrectAnswers?: number
  shield?: EncounterShieldState
  fleeRate?: number
  level?: number
  levelRange?: {
    min: number
    max: number
  }
  catchRateModifier?: number
  captureAttempts?: number
  secondChanceUsed?: boolean
  secondChanceModifier?: number
  encounterPool?: {
    speciesId: number
    formId?: string
    chance: number
  }[]
  weather?: WeatherSnapshot

  activeAbilityId?: string
  activeAbilitySourcePokemonId?: string
  activeAbilitySourceFormId?: string
  activeAbilitySourceLevel?: number
  copiedAbilityId?: string
  lastCorrectOptionIndex?: number
  lastAnswerWasWrong?: boolean
  answerAbilityState?: {
    highlightedOptionIndex?: number
    highlightedUntil?: number
    disabledWrongUntil?: number
  }

  levelModifier?: number
  rewardModifier?: string
  qte?: EncounterQteState
  normalQuestionsSinceLastQte?: number
  abilityEscapeAttempted?: boolean
  specialEncounter?: {
    type: 'silph-scope-ghost'
    requiredItemId: string
    hasRequiredItem: boolean
    failMessage?: string
  }
  chronicle?: {
    expeditionId: string
    expeditionName: string
    balls?: Record<string, number>
  }
}
