import type { Pokemon } from '@/payload-types'
import type { RewardSummary } from '@/utilities/rewards/reward-logic'
import type { PokemonTypeName } from '@/data/items'
import type {
  BattleAiProfileId,
  BattleConfig,
  Reward,
  TrainerBattleItemConfig,
} from '@/data/types'
import type { WeatherSnapshot } from '@/utilities/weather'
import type { TerrainType } from '@/data/terrain'
import type {
  SecondaryStatusEffect,
  SecondaryStatusTrigger,
  MoveContinuousConfig,
} from '@/data/moves/types'

export interface BattleExpeditionProgress {
  expeditionId: string
  expeditionName: string
  currentStep: number
  totalSteps: number
  losses: number
  maxLosses: number
  livesLeft: number
  canFail?: boolean
  status: 'active' | 'ready_to_claim' | 'failed'
  progressed: boolean
}

export type BattleStance = 'power' | 'speed' | 'tech'

export interface BattleTerrainSnapshot {
  terrain: TerrainType
  label: string
  source?: 'ability' | 'move' | 'power'
  originalTerrain?: TerrainType
  overriddenAtTurn?: number
  overriddenBy?: string
}

export interface StatStages {
  attack: number // -6 to +6
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
  crit: number // 0 to +3 (crit stage)
  accuracy: number
  evasion: number
}

export interface BattlePokemon extends Omit<Pokemon, 'stats'> {
  stats: {
    hp: number
    attack: number
    defense: number
    specialAttack: number
    specialDefense: number
    speed: number
  }
  currentHp: number
  maxHp: number
  name: string // Ensure name is always present
  types: string[]
  statStages?: StatStages // Stat modifiers from X-items
  teraTypeOverride?: PokemonTypeName // Active battle type while Terastallized
  teraTurnsRemaining?: number
  teraActivatedTurn?: number
  teraUsed?: boolean // Whether this Pokemon has used Tera this battle
  battleTypeOverride?: string[]
  battleTypeOriginalTypes?: string[]
  battleTypeTurnsRemaining?: number
  zMoveReady?: boolean
  // Mega/Dynamax fields
  isMega?: boolean // Whether this Pokemon is currently Mega Evolved
  megaTurnsRemaining?: number // Legacy field; Mega Evolution no longer expires by turns
  isDynamaxed?: boolean
  dynamaxTurnsRemaining?: number
  dynamaxOriginalMaxHp?: number
  originalFormId?: string // Store original form for reference (e.g., for Mega/Dynamax revert)
  originalHeldItemId?: string | null
	  battleAbilityState?: {
      consumedShields?: string[]
      zeroToHeroActivated?: boolean
      battleBondActivated?: boolean
      heldItemLost?: boolean
      suppressed?: boolean
      lastIntimidatedOpponent?: string
      lastBeforeMoveSkipTurn?: number
      beforeAttackTypeChangeActivated?: boolean
	    illusionMask?: {
	      name: string
	      formId?: string
	    }
	    originalAbility?: string
	    originalTransform?: {
	      name: string
	      formId: string
	      types: string[]
	      stats: BattlePokemon['stats']
	      statStages?: StatStages
	    }
	  }
  heldItem?: { id: string; name: string } // Minimal item data for battle logic
  heldItemBattleOnly?: boolean
  consumedHeldItems?: { itemId: string; name: string; persistent?: boolean; forceClear?: boolean }[]
  pokemonResearchLevel?: number
  observedPreferredStance?: BattleStance
  // Status Effect
  status?: {
    id: string
    counter: number // For things like Bad Poison intensity or Sleep duration
  }
  disabledStance?: {
    stance: BattleStance
    turnsRemaining: number
    appliedTurn?: number
  }
  secondaryStatuses?: BattleSecondaryStatusInstance[]
  isShadow?: boolean
  isRadiant?: boolean
  aiMoves?: string[]
  aiMoveLoadout?: string[]
  activeTurnStarted?: number
  moveUsesRemaining?: number
  nextDamageModifier?: {
    percent: number
    remainingUses: number
    sourceMoveName?: string
  }
  nextAccuracyBypass?: {
    remainingUses: number
    sourceMoveName?: string
  }
  encoredMove?: {
    moveId: string
    moveName?: string
    turnsRemaining: number
    permanent?: boolean
    source?: 'move' | 'ability'
  }
}

export interface BattleSecondaryStatusInstance {
  id: string
  name: string
  triggers: SecondaryStatusTrigger[]
  effects: SecondaryStatusEffect[]
  sourceSide: 'player' | 'enemy'
  sourcePokemonId?: string
  target: 'pokemon' | 'side' | 'field'
  targetSide?: 'player' | 'enemy'
  remainingTurns?: number
  delayTurns?: number
}

export interface BattleMoveLock {
  type: 'charge' | 'continuous' | 'recharge'
  moveId: string
  moveName?: string
  selectedType?: string
  remainingTurns: number
  continuous?: MoveContinuousConfig
  repeatUses?: number
}

export interface BattleItemUsage {
  itemId: string
  turn: number
}

export interface BattleMoveHistoryEntry {
  moveId?: string
  moveName?: string
  side: 'player' | 'enemy'
  pokemonId?: string
  turn: number
  attackType?: string
}

export interface BattleDamageHistoryEntry {
  id: string
  sourceSide: 'player' | 'enemy'
  targetSide: 'player' | 'enemy'
  sourcePokemonId?: string
  targetPokemonId?: string
  moveId?: string
  moveName?: string
  turn: number
  damage: number
  attackType?: string
}

export interface BattleDelayedDamageEntry {
  id: string
  sourceSide: 'player' | 'enemy'
  targetSide: 'player' | 'enemy'
  sourcePokemonId?: string
  moveId: string
  moveName: string
  turnsRemaining: number
  damage: number
  attackType?: string
}

// Powers state for tracking special battle mechanics
export interface PowersState {
  // Moves
  moveUsesRemaining: number // Default 2, configurable
  // Tera
  teraUsesRemaining: number // Default 1 per battle
  // Mega Evolution
  megaUsesRemaining: number // Default 1
  megaEvolved: boolean // Once per battle
  megaTurnsRemaining: number // Legacy field; Mega Evolution lasts until battle end
  megaFormId?: string
  // Z-Move
  zMoveUsesRemaining: number // Default 1
  zMoveUsed: boolean // Once per battle
  // Dynamax
  dynamaxAvailable: boolean // Unlocked after 5 turns
  dynamaxActive: boolean
  dynamaxTurnsRemaining: number // 3 turns
  dynamaxUsesRemaining: number // Default 1
  gigantamaxFormId?: string
  turnsPlayedThisBattle: number // Track for Dynamax unlock
  // Victory Power
  victoryUsesRemaining: number // Default 1
  // Weather Power
  weatherUsesRemaining: number // Default 1
  // Shout Power
  shoutUsesRemaining: number // Default 1
  // Circadian Power
  circadianUsesRemaining: number // Default 1
  dimensionalShift: {
    charges: {
      wins: number
      losses: number
      draws: number
    }
    activeEffect?: {
      type: 'time' | 'space' | 'chaos'
      turnsRemaining: number // For Space Lock? Or just permanent lock?
      // For Chaos, we might need a stored copy of "original stats" or "shuffled stats" if it persists?
      // Logic says "until switched".
      // We can check `isChaosObserved` on pokemon instead? Or store it here.
    }
  }
}

export interface BattleState {
  playerTeam: BattlePokemon[]
  enemyTeam: BattlePokemon[]
  activePlayerIndex: number
  activeEnemyIndex: number
  playerParticipantIndexes?: number[]
  turn: number
  history: BattleLogEntry[]
  status: 'ongoing' | 'won' | 'lost'
  pendingPlayerSwitch?: boolean
  pendingPlayerSwitchReason?: 'lead' | 'fainted' | 'move'
  pendingPlayerSwitchStatStages?: StatStages
  battleId: string
  background?: string
  playerName: string
  enemyName: string
  rewards?: RewardSummary
  moveRewards?: Reward[]
  expeditionProgress?: BattleExpeditionProgress
  expeditionContext?: {
    expeditionId: string
    expeditionName: string
  }
  chronicle?: {
    expeditionId: string
    expeditionName: string
  }
  chronicleInventory?: Record<string, number>
  isEligibleForReplay?: boolean
  isWildBattle?: boolean
  weather?: WeatherSnapshot
  terrain?: BattleTerrainSnapshot
  secondaryStatuses?: BattleSecondaryStatusInstance[]
  playerMoveLock?: BattleMoveLock
  // Battle item tracking
  itemsUsedThisBattle: BattleItemUsage[]
  itemUseModifiers?: {
    player?: number
    enemy?: number
  }
  itemUseAvailabilityModifiers?: {
    player?: number
    enemy?: number
  }
  moveHistory?: {
    lastSuccessful?: {
      player?: BattleMoveHistoryEntry
      enemy?: BattleMoveHistoryEntry
    }
    lastFailed?: {
      player?: BattleMoveHistoryEntry
      enemy?: BattleMoveHistoryEntry
    }
    usedByPokemon?: Record<string, string[]>
    lastFainted?: {
      player?: { turn: number; pokemonId?: string }
      enemy?: { turn: number; pokemonId?: string }
    }
    statLoweredThisTurn?: {
      player?: { turn: number; pokemonId?: string }
      enemy?: { turn: number; pokemonId?: string }
    }
    switchingOut?: {
      player?: { turn: number; pokemonId?: string }
      enemy?: { turn: number; pokemonId?: string }
    }
    damage?: {
      lastTakenByPokemon?: Record<string, BattleDamageHistoryEntry>
      lastTakenBySide?: {
        player?: BattleDamageHistoryEntry
        enemy?: BattleDamageHistoryEntry
      }
    }
  }
  pokemonBattleKOs?: Record<string, number>
  pokemonBattleKOsPersisted?: boolean
  heldItemChargeRewards?: {
    ownerId: string
    pokemonId: string
    itemId: string
    quantity: number
  }[]
  delayedDamage?: BattleDelayedDamageEntry[]
  trainerItems?: TrainerBattleItemConfig[]
  trainerItemInitialQuantities?: Record<string, number>
  trainerItemLastUsedTurn?: number
  enemyMoveUsesRemaining?: number
  enemyMoveLock?: BattleMoveLock
  revealedEnemyStance?: BattleStance // From Battle Observer item
  preparedEnemyAttack?: {
    speciesId: number
    formId: string
    stance: BattleStance
  }
  // Powers state
  powers?: PowersState
  // Per-player PVP powers keyed by user id. Perspective states expose the viewer's bucket via `powers`.
  pvpPowers?: Record<string, PowersState>
  pvpMoveUseLimits?: Record<string, number>
  pvpItemUseLimits?: Record<string, number>
  // Legacy Z-Move state retained for older serialized battles.
  zMoveStance?: BattleStance
  enemyZMoveStance?: BattleStance
  // Battle configuration (carried from initial setup)
  config?: {
    itemsPerBattle?: number
    movesPerBattle?: number
    allowedItems?: string[]
    allowSwapping?: boolean
    maxPokemon?: number
    enemyAttackTelegraphChance?: number
    music?: string // Custom background music URL
  }
  dynamicBattleConfig?: BattleConfig
  ai?: {
    version: 1
    profile: BattleAiProfileId
  }
  // PVP
  pvpBattleId?: string
  isPvp?: boolean
  // Trainer Data for VS Screen
  playerTrainer?: {
    name: string
    icon?: string
    banner?: string
    title?: string
  }
  enemyTrainer?: {
    name: string
    icon?: string
    banner?: string
    title?: string
  }
}

export interface BattleLogEntry {
  turn: number
  playerStance: BattleStance
  enemyStance: BattleStance
  result: 'win' | 'loss' | 'tie'
  damageDealt: number
  damageTaken: number
  playerAttackType?: string
  enemyAttackType?: string
  message: string
}

export interface StanceResult {
  result: 'win' | 'loss' | 'tie'
  damageMultiplier: number
}

export interface BattleInventoryItem {
  itemId: string
  name: string
  quantity: number
  spriteId?: string
  battleEffect: import('@/data/items').BattleEffect
}
