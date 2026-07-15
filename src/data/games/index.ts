// Main games index - exports all game types and configs

// Shared types
export * from './shared'
import { SpriteConfig, ParallaxLayer } from './shared'

// Silhouette game (whos-that-pokemon)
export * from './silhouette/types'
export { silhouetteEntries as silhouetteGames } from './silhouette'

// Identify game (quick-identify)
export * from './identify/types'
export { identifyEntries as identifyGames } from './identify'

// Snap game (pokemon-snap)
export * from './snap/types'
export { snapEntries as snapGames } from './snap'

// Cry game (cry-recognition)
export * from './cry/types'
export { cryEntries as cryGames } from './cry'

// Compare game (research-compare)
export * from './compare/types'
export { compareEntries as compareGames } from './compare'

// Rock Push game
export * from './rock-push/types'
export { basicEntries as rockPushGames } from './rock-push'

// Run game (endless runner)
export * from './run/types'
export { runGames } from './run'

// Flap game (flappy bird)
export type { FlapGameConfig } from './flap/types'
export { basicEntries as flapGames } from './flap'

// Slot game (slot-machine)
export type { SlotGameConfig, SlotGameSettings, SlotSymbol, SlotPayline } from './slots/types'
export { slotGames } from './slots'

// Pachinko game
export type { PachinkoGameConfig } from './pachinko/types'
export { pachinkoGames } from './pachinko'

// Prize Wheel game
export type { PrizeWheelGameConfig } from './prize-wheel/types'
export { chanseyEntries as prizeWheelGames } from './prize-wheel'

// Fishing game
export type { FishingGameConfig, RodType, FishingRodConfig } from './fishing/types'
export { fishingGames } from './fishing'

// Match-3 game
export type { Match3GameConfig, Match3GameSettings, Match3Crystal } from './match3/types'
export { match3Games } from './match3'

// Spelling game
export type { SpellingConfig, SpellingSettings } from './spelling/types'
export { spellingEntries as spellingGames } from './spelling'

// Sliding Puzzle game
export type { SlidingPuzzleConfig, SlidingPuzzleSettings } from './sliding-puzzle/types'
export { slidingPuzzleGames } from './sliding-puzzle'

// Rhythm game
export type { RhythmConfig, RhythmGameSettings, RhythmIcon } from './rhythm/types'
export { rhythmEntries as rhythmGames } from './rhythm'

// Mining game
export type { MiningConfig, MiningGameSettings } from './mining/types'
export { miningEntries as miningGames } from './mining'

// TCG Inspection game
export type {
  TcgInspectionGameConfig,
  TcgInspectionGameSettings,
  TcgInspectionQuestionType,
} from './tcg-inspection/types'
export { tcgInspectionGames } from './tcg-inspection'

// TCG Battle game
export type { TcgBattleGameConfig, TcgBattleGameSettings } from './tcg-battle/types'
export { tcgBattleGames } from './tcg-battle'

// Field Observation game
export type {
  FieldObservationConfig,
  FieldObservationSettings,
  FieldObservationPokemonPoolEntry,
} from './field-observation/types'
export { fieldObservationGames } from './field-observation'

// Voltorb Grid game
export type {
  VoltorbGridGameConfig,
  VoltorbGridPosition,
  VoltorbGridProtectedPokemon,
  VoltorbGridSettings,
  VoltorbGridVoltorb,
} from './voltorb-grid'
export { voltorbGridGames } from './voltorb-grid'

// Diglett Tunnel Tap game
export type { DiglettTunnelTapGameConfig, DiglettTunnelTapSettings } from './diglett-tunnel-tap'
export { diglettTunnelTapGames } from './diglett-tunnel-tap'

// Magnemite Circuit game
export type {
  MagnemiteCircuitGameConfig,
  MagnemiteCircuitPosition,
  MagnemiteCircuitSettings,
  MagnemiteCircuitTile,
  MagnemiteCircuitTileType,
} from './magnemite-circuit'
export { magnemiteCircuitGames } from './magnemite-circuit'

// Rock Tunnel Echo Map game
export type {
  RockTunnelEchoMapGameConfig,
  RockTunnelEchoMapSettings,
  RockTunnelEchoPosition,
} from './rock-tunnel-echo-map'
export { rockTunnelEchoMapGames } from './rock-tunnel-echo-map'

// All games combined (useful for explore-list)
import { silhouetteEntries as silhouetteGames } from './silhouette'
import { identifyEntries as identifyGames } from './identify'
import { snapEntries as snapGames } from './snap'
import { cryEntries as cryGames } from './cry'
import { compareEntries as compareGames } from './compare'
import { basicEntries as rockPushGames } from './rock-push'
import { runGames } from './run'
import { basicEntries as flapGames } from './flap'
import { slotGames } from './slots'
import { pachinkoGames } from './pachinko'
import { chanseyEntries as prizeWheelGames } from './prize-wheel'
import { fishingGames } from './fishing'
import { match3Games } from './match3'
import { spellingEntries as spellingGames } from './spelling'
import { slidingPuzzleGames } from './sliding-puzzle'
import { rhythmEntries as rhythmGames } from './rhythm'
import { miningEntries as miningGames } from './mining'
import { tcgInspectionGames } from './tcg-inspection'
import { tcgBattleGames } from './tcg-battle'
import { fieldObservationGames } from './field-observation'
import { voltorbGridGames } from './voltorb-grid'
import { diglettTunnelTapGames } from './diglett-tunnel-tap'
import { magnemiteCircuitGames } from './magnemite-circuit'
import { rockTunnelEchoMapGames } from './rock-tunnel-echo-map'
import type { BaseGameConfig } from './shared'

export type GameType =
  | 'silhouette'
  | 'identify'
  | 'snap'
  | 'cry'
  | 'compare'
  | 'rock-push'
  | 'run'
  | 'flap'
  | 'slots'
  | 'pachinko'
  | 'prize-wheel'
  | 'fishing'
  | 'match3'
  | 'spelling'
  | 'sliding-puzzle'
  | 'rhythm'
  | 'mining'
  | 'tcg-inspection'
  | 'tcg-battle'
  | 'field-observation'
  | 'voltorb-grid'
  | 'diglett-tunnel-tap'
  | 'magnemite-circuit'
  | 'rock-tunnel-echo-map'

// Unified settings type that covers all game settings
export interface GameSettings {
  target?: number
  targetMissMessage?: string
  pokemonPool?: any[]
  itemPool?: string[]
  optionsPool?: number[]
  timeLimit?: number
  winRate?: number | { min: number; max: number }
  successThreshold?: number
  maxPokemonShown?: number
  comparisonOperator?: (
    | 'height'
    | 'weight'
    | 'hp'
    | 'attack'
    | 'defense'
    | 'specialAttack'
    | 'specialDefense'
    | 'speed'
  )[]
  death?: boolean
  lose_points?: number
  // Rock Push specific
  playerStart?: import('./rock-push/types').RockPushPosition
  startScreen?: string
  boulders?: import('./rock-push/types').RockPushPosition[]
  holes?: import('./rock-push/types').RockPushPosition[]
  barriers?: import('./rock-push/types').RockPushPosition[]
  ice?: import('./rock-push/types').RockPushPosition[]
  winTiles?: import('./rock-push/types').RockPushPosition[]
  teleporters?: import('./rock-push/types').RockPushTeleporter[]
  screens?: import('./rock-push/types').RockPushScreenConfig[]
  prizes?: import('./rock-push/types').RockPushPrizeSquare[]
  maxMoves?: number
  boulderSprite?: string
  barrierSprite?: string
  floorSprite?: string
  iceSprite?: string
  holeSprite?: string
  filledHoleSprite?: string
  winTileSprite?: string
  teleporterSprite?: string
  playerSprite?: string
  // Run game specific
  winScore?: number
  speed?: number | { min: number; max: number }
  sprite?: string | SpriteConfig
  player?: SpriteConfig
  jumpSprite?: string | SpriteConfig
  enemySprite?: string | SpriteConfig
  obstacleSprite?: string
  aerialObstacleSprite?: string
  parallaxLayers?: ParallaxLayer[]
  scene?: import('./shared').SideScrollerSceneConfig | import('./fishing/types').FishingSceneConfig
  spawnRate?: { min: number; max: number }
  obstacleHeight?: number
  obstacleWidth?: number
  // Slot game specific
  symbols?: import('./slots/types').SlotSymbol[]
  paytable?: import('./slots/types').SlotPayline[]
  cost?: {
    currencyType:
      | 'crystals'
      | 'mega-shards'
      | 'pokedollars'
      | 'battle-points'
      | 'berry-powder'
      | 'prof-scrip'
      | 'league-ticket'
    amount: number
  }
  machineTheme?: 'classic' | 'modern' | 'neon'
  background?: string
  // Prize Wheel specific
  slots?: import('./prize-wheel/types').PrizeWheelSlot[]
  spinTime?: { min: number; max: number }
  // Pachinko specific
  board?: import('./pachinko/types').PachinkoBoard
  ballRadius?: number
  ballBounciness?: number
  gravityScale?: number
  // Fishing specific
  rods?: {
    old?: import('./fishing/types').FishingRodConfig
    good?: import('./fishing/types').FishingRodConfig
    super?: import('./fishing/types').FishingRodConfig
  }
  sky?: string
  fishingSprite?: string
  waterAnimationSpeed?: number
  // Match-3 specific
  gridSize?: { cols: number; rows: number } | number
  crystalTypes?: import('./match3/types').Match3Crystal[]
  pointsPerMatch?: number
  cascadeMultiplier?: number
  endless?: {
    enabled: boolean
    milestones: import('./run/types').EndlessMilestone[]
    repeatingRewards?: import('./run/types').EndlessRepeatingReward[]
  }
  // Spelling specific
  missingLetters?: number
  extraLetters?: number
  // Sliding Puzzle specific
  image?: string
  shuffleMoves?: number
  // Rhythm game specific
  icons?: import('./rhythm/types').RhythmIcon[]
  // Mining game specific
  targetSize?: { min: number; max: number }
  itemHp?: number
  perfectDamage?: number
  okDamage?: number
  maxSwings?: number
  buttonIcon?: import('./shared').TaskIcon
  miningTarget?: string
  // TCG Inspection specific
  allowedSetIds?: string[]
  allowedRarities?: string[]
  questionTypes?: import('./tcg-inspection/types').TcgInspectionQuestionType[]
  packSize?: number
  rounds?: number
  previewSeconds?: number
  pointsPerCorrect?: number
  // TCG Battle specific
  deckFormat?: import('@/utilities/tcg/tcg-battle').TcgBattleDeckFormat
  requiredSeries?: string
  opponentDeckCardIds?: string[]
  themeColour?: string
  // Field Observation specific
  levelRange?: { min: number; max: number }
  answerTimeLimit?: number | { min: number; max: number }
  difficulty?: number
  itemDrops?: import('./field-observation/types').FieldObservationItemDrop[]
  // Voltorb Grid specific
  exit?: import('./voltorb-grid').VoltorbGridPosition
  walls?: import('./voltorb-grid').VoltorbGridPosition[]
  debris?: import('./voltorb-grid').VoltorbGridPosition[]
  voltorbs?: import('./voltorb-grid').VoltorbGridVoltorb[]
  protectedPokemon?: import('./voltorb-grid').VoltorbGridProtectedPokemon[]
  requiredCleared?: number
  maxDischarges?: number
  // Diglett Tunnel Tap specific
  targetScore?: number
  spawnIntervalMs?: number
  visibleMs?: number
  diglettScore?: number
  dugtrioPenalty?: number
  hazardPokemonId?: string
  maxLives?: number
  // Magnemite Circuit specific
  source?: import('./magnemite-circuit').MagnemiteCircuitPosition
  targets?: import('./magnemite-circuit').MagnemiteCircuitPosition[]
  tiles?: import('./magnemite-circuit').MagnemiteCircuitTile[]
  maxRotations?: number
  // Rock Tunnel Echo Map specific
  revealDurationMs?: number
}

export interface GameItem extends BaseGameConfig {
  gameType: GameType
  settings: GameSettings
}

export const allGames: GameItem[] = [
  ...silhouetteGames.map((g) => ({ ...g, gameType: 'silhouette' as const })),
  ...identifyGames.map((g) => ({ ...g, gameType: 'identify' as const })),
  ...snapGames.map((g) => ({ ...g, gameType: 'snap' as const })),
  ...cryGames.map((g) => ({ ...g, gameType: 'cry' as const })),
  ...compareGames.map((g) => ({ ...g, gameType: 'compare' as const })),
  ...rockPushGames.map((g) => ({ ...g, gameType: 'rock-push' as const })),
  ...runGames.map((g) => ({ ...g, gameType: 'run' as const })),
  ...flapGames.map((g) => ({ ...g, gameType: 'flap' as const })),
  ...slotGames.map((g) => ({ ...g, gameType: 'slots' as const })),
  ...pachinkoGames.map((g) => ({ ...g, gameType: 'pachinko' as const })),
  ...prizeWheelGames.map((g) => ({ ...g, gameType: 'prize-wheel' as const })),
  ...fishingGames.map((g) => ({ ...g, gameType: 'fishing' as const })),
  ...match3Games.map((g) => ({ ...g, gameType: 'match3' as const })),
  ...spellingGames.map((g) => ({ ...g, gameType: 'spelling' as const })),
  ...slidingPuzzleGames.map((g) => ({ ...g, gameType: 'sliding-puzzle' as const })),
  ...rhythmGames.map((g) => ({ ...g, gameType: 'rhythm' as const })),
  ...miningGames.map((g) => ({ ...g, gameType: 'mining' as const })),
  ...tcgInspectionGames.map((g) => ({ ...g, gameType: 'tcg-inspection' as const })),
  ...tcgBattleGames.map((g) => ({ ...g, gameType: 'tcg-battle' as const })),
  ...fieldObservationGames.map((g) => ({ ...g, gameType: 'field-observation' as const } as unknown as GameItem)),
  ...voltorbGridGames.map((g) => ({ ...g, gameType: 'voltorb-grid' as const })),
  ...diglettTunnelTapGames.map((g) => ({ ...g, gameType: 'diglett-tunnel-tap' as const })),
  ...magnemiteCircuitGames.map((g) => ({ ...g, gameType: 'magnemite-circuit' as const })),
  ...rockTunnelEchoMapGames.map((g) => ({ ...g, gameType: 'rock-tunnel-echo-map' as const })),
]

// Backward compatibility aliases
export type ResearchConfig = GameItem
export const research = allGames
