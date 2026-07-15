import type { GameDataKeys } from '@/utilities/requirements/analysis'

export const POKEMON_BOX_SYNC_KEYS = [
  'inventory',
  'tcg',
  'pokedex',
  'abilityDex',
  'completedTasks',
  'battleResults',
  'locationEncounterResults',
  'researchEncounterResults',
  'expeditionResults',
  'shopPurchases',
  'activeExpedition',
] satisfies GameDataKeys[]

export const DEFAULT_SYNC_KEYS = POKEMON_BOX_SYNC_KEYS

export const EXPLORE_SYNC_KEYS = [
  'pokemon',
  ...POKEMON_BOX_SYNC_KEYS,
  'rivalTrainer',
] satisfies GameDataKeys[]

export const CHANNELING_SYNC_KEYS = [
  'pokemon',
  'inventory',
  'researchEncounterResults',
] satisfies GameDataKeys[]

export const EXPLORE_POKEMON_SELECT = {
  id: true,
  speciesId: true,
  formId: true,
  name: true,
  level: true,
  size: true,
  shiny: true,
  identified: true,
  stats: true,
  ivs: true,
  evs: true,
  locked: true,
  fusionItemId: true,
  fusionBaseFormId: true,
  fusedWithPokemonId: true,
  fusedIntoPokemonId: true,
  onBattleTeam: true,
  battleTeamPosition: true,
  isCompanion: true,
} as const

export const CHANNELING_POKEMON_SELECT = {
  id: true,
  speciesId: true,
  formId: true,
  name: true,
  level: true,
  shiny: true,
  gender: true,
  stats: true,
  fusedIntoPokemonId: true,
} as const
