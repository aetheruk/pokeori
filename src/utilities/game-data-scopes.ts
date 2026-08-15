import type { GameDataKeys } from '@/utilities/requirements/analysis'

export const GAME_DATA_SCOPES = [
  'core',
  'trainer',
  'trainer-collection',
  'pokemon-box',
  'inventory',
  'tcg',
  'pokedex',
  'movedex',
  'abilitydex',
  'explore',
  'channeling',
  'artisan',
  'shop',
] as const

export type GameDataScope = (typeof GAME_DATA_SCOPES)[number]

const TRAINER_COLLECTION_KEYS = [
  'inventory',
  'pokedex',
  'tcg',
  'abilityDex',
  'completedTasks',
  'battleResults',
  'locationEncounterResults',
  'gameResults',
  'fieldResearchResults',
] satisfies GameDataKeys[]

export const GAME_DATA_SCOPE_KEYS: Record<GameDataScope, GameDataKeys[]> = {
  core: ['storyState'],
  trainer: ['inventory'],
  'trainer-collection': TRAINER_COLLECTION_KEYS,
  'pokemon-box': ['inventory', 'pokedex'],
  inventory: ['inventory', 'pokedex', 'gameResults'],
  tcg: ['inventory', 'tcg'],
  pokedex: ['inventory', 'pokedex'],
  movedex: ['inventory'],
  abilitydex: ['abilityDex'],
  explore: [
    'pokemon',
    ...TRAINER_COLLECTION_KEYS,
    'shopPurchases',
    'expeditionResults',
    'activeExpedition',
    'rivalTrainer',
    'weather',
  ],
  channeling: ['pokemon', 'inventory', 'gameResults'],
  artisan: [
    'inventory',
    'pokedex',
    'tcg',
    'completedTasks',
    'gameResults',
    'shopPurchases',
  ],
  shop: [
    'inventory',
    'pokedex',
    'completedTasks',
    'battleResults',
    'locationEncounterResults',
    'gameResults',
    'fieldResearchResults',
    'expeditionResults',
    'shopPurchases',
  ],
}

export const EXPLORE_POKEMON_SELECT = {
  id: true,
  speciesId: true,
  formId: true,
  name: true,
  level: true,
  ballType: true,
  size: true,
  shiny: true,
  rarity: true,
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
  rarity: true,
  gender: true,
  stats: true,
  fusedIntoPokemonId: true,
} as const

export function getPokemonPayloadForScope(
  scope: GameDataScope,
): 'full' | 'explore' | 'channeling' {
  if (scope === 'channeling') return 'channeling'
  if (scope === 'explore') return 'explore'
  return 'full'
}

export function getGameDataScope(pathname: string): GameDataScope {
  if (pathname === '/game') return 'trainer'
  if (pathname === '/game/pokemon') return 'pokemon-box'
  if (pathname === '/game/inventory') return 'inventory'
  if (pathname === '/game/tcg') return 'tcg'
  if (pathname === '/game/pokedex') return 'pokedex'
  if (pathname === '/game/movedex') return 'movedex'
  if (pathname === '/game/abilitydex') return 'abilitydex'
  if (pathname === '/game/explore') return 'explore'
  if (pathname.startsWith('/game/games/')) return 'inventory'
  if (pathname === '/game/spirit-channeling') return 'channeling'
  if (pathname === '/game/artisan') return 'artisan'
  if (pathname.startsWith('/game/shops/')) return 'shop'
  if (pathname === '/game/dex') return 'trainer-collection'
  if (pathname.startsWith('/game/research/encounter')) return 'inventory'
  return 'core'
}
