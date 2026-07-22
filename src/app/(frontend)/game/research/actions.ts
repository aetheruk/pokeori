'use server'

import { allGames, GameType } from '@/data/games'
import { ABILITIES, type AbilityConfig } from '@/data/abilities'
import {
  fieldObservationGlobalItemEvents,
  fieldObservationGlobalPokemonEvents,
} from '@/data/games/field-observation/global-events'
import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { checkRequirement, isPokemonEligible } from '@/utilities/requirements'
import { grantRewards, Reward } from '@/utilities/rewards/reward-logic'
import { redis } from '@/utilities/redis'
import type { User } from '@/payload-types'
import { getGameUserData } from '@/utilities/game-data'
import { analyzeRequirements } from '@/utilities/requirements/analysis'
import pokemonData from '@/data/pokemon-data'
import {
  acquireActionLock,
  checkActionRateLimit,
  getIdempotentResult,
  releaseActionLock,
  setIdempotentResult,
} from '@/utilities/game-integrity'
import { recordExpeditionActivityResult } from '@/utilities/expeditions/actions'
import { recordDailyActivityProgress } from '@/utilities/tasks/daily-progress'
import type { ExpeditionProgressSnapshot } from '@/utilities/expeditions/actions'
import { isActivityEligibleForReplay } from '@/utilities/activity-replay'
import {
  getAchievedUnclaimedMilestones,
  getEarnedRepeatingRewards,
  getEarnedRandomRepeatingRewards,
  getLowestEndlessRewardScore,
  getMaxAllowedEndlessScore,
  normalizeFinalScore,
} from '@/utilities/research/endless-milestones'
import {
  validateResearchAnswer,
  validateResearchCompletionInput,
  validateResearchEncounterId,
  validateResearchStartInput,
} from '@/utilities/research/input-validation'
import {
  getUserInventoryMap,
  incrementUserActivityResult,
  setUserInventoryMap,
} from '@/utilities/user-state'
import {
  getRockPushPrizeId,
  getRockPushPrizeReward,
  getRockPushScopedPrizeId,
} from '@/utilities/research/rock-push'
import {
  calculateFieldObservationSkillXp,
  generateFieldObservationRound,
  getFieldObservationBaseExperienceXpModifier,
  getFieldObservationCollectedItemXpModifier,
  getFieldObservationSessionSeconds,
  getFieldObservationSkillXpLevel,
  isFieldObservationAnswerCorrect,
  type FieldObservationPrivateRoundData,
} from '@/utilities/research/field-observation'
import {
  buildFieldObservationCollectibleDrops,
  toPublicFieldObservationCollectibleDrop,
} from '@/utilities/research/field-observation-drops'
import {
  rollFieldObservationGlobalItemEvents,
  rollFieldObservationGlobalPokemonEvent,
  rollFieldObservationItemDrops,
} from '@/utilities/research/field-observation-global-events'
import {
  getFieldObservationResearchXpAmount,
  shouldAwardFieldObservationResearchXp,
} from '@/utilities/research/research-levels'
import { maybeCreateFieldObservationEgg } from '@/utilities/day-care/eggs'
import { getRequiredResearchWins } from '@/utilities/research/required-wins'
import type { FieldObservationSettings } from '@/data/games/field-observation'
import type { ArtAcademySettings } from '@/data/games/art-academy'
import {
  createArtAcademyRound,
  scoreSerializedArtAcademyDrawing,
  type ArtAcademyPrivateRoundData,
} from '@/utilities/research/art-academy-server'
import {
  calculateContentSkillXp,
  calculatePokemonContentSkillXpWithModifier,
  resolveSkillXpConfig,
} from '@/data/skills/xp'
import {
  resolveSubRegionWeather,
  type WeatherSnapshot,
} from '@/utilities/weather'
import {
  applyFieldObservationPoolWeightModifiers,
  getFieldObservationCollectibleModifiers,
  getFieldObservationDurationDelta,
  getFieldObservationExtraCollectibles,
  getFieldObservationGlobalEventMultipliers,
  getFieldObservationResearchXpMultiplier,
  getFieldObservationSpawnModifiers,
  getResearchCompletionRewards,
  getResearchSessionTimeDeltaSeconds,
  getResearchSkillXpMultiplier,
  getResearchWinDelta,
  shouldApplyResearchAnswerGrace,
  shouldProtectFieldObservationRewards,
} from '@/utilities/pokemon/encounter-ability-runtime'

const DAILY_EXCLUDED_GAME_TYPES = new Set(['slots', 'pachinko', 'prize-wheel'])

export async function getUser(): Promise<User | null> {
  const payload = await getPayload({ config: configPromise })
  const headersList = await headers()
  const { user: jwtUser } = await payload.auth({ headers: headersList })
  if (!jwtUser) return null
  const user = await payload.findByID({
    collection: 'users',
    id: jwtUser.id,
  })
  return user as User
}
export interface ResearchState {
  userId: string
  encounterId: string
  startTime: number
  expiry: number
  wins: number
  losses: number
  currentPokemonId?: number // The target to find/snap
  currentItemId?: string // The target item to find
  roundData?: any // Additional data for the round (options, stats, etc.)
  history: {
    questionId: number | string // Pokemon ID or Item ID or unique question ID
    answer: unknown
    correct: boolean
    timestamp: number
  }[]
  // Snap specific
  snapRoundStartTime?: number
  // Field Observation specific
  fieldObservationPrivate?: FieldObservationPrivateRoundData
  // Art Academy specific
  artAcademyPrivate?: ArtAcademyPrivateRoundData
  // Endless mode specific
  claimedMilestones?: number[] // Array of milestone scores that have been claimed
  weather?: WeatherSnapshot
  activeAbilityId?: string
  activeAbilitySourceFormId?: string
  // Slot specific
  slotsSession?: {
    totalRewards: any // Accumulated reward summary
    currentWinRate?: number // Rolled win rate for this slot session
    totalCost?: number // Total currency spent in this session
  }
  // Pachinko specific
  pachinkoSession?: {
    totalRewards: any
    totalCost: number
  }
}

export interface ResearchCompletionResult {
  success: boolean
  summary?: any
  expeditionProgress?: ExpeditionProgressSnapshot
  error?: string
  message?: string
  finalScore?: number
}

function getResearchStateAbility(
  state: Pick<ResearchState, 'activeAbilityId'>,
): AbilityConfig | undefined {
  return state.activeAbilityId ? ABILITIES[state.activeAbilityId] : undefined
}

function getResearchAbilityContext(
  encounter: (typeof allGames)[number],
  state?: Pick<ResearchState, 'weather'>,
) {
  return {
    gameType: encounter.gameType,
    researchId: encounter.id,
    category: encounter.category,
    subCategory: encounter.subCategory,
    weather: state?.weather?.weather,
  }
}

function normalizeSurveyFocus(value: unknown): string[] | undefined {
  if (!value) return undefined
  return Array.isArray(value) ? value.map(String) : [String(value)]
}

function addSecondsToFieldObservationTimeLimit(
  value: FieldObservationSettings['timeLimit'],
  seconds: number,
) {
  if (!seconds) return value
  if (typeof value === 'number') return Math.max(1, value + seconds)
  return {
    min: Math.max(1, value.min + seconds),
    max: Math.max(1, value.max + seconds),
  }
}

function applyFieldObservationPokemonEventMultiplier(
  events: typeof fieldObservationGlobalPokemonEvents,
  multiplier: number,
) {
  if (multiplier === 1) return events
  return events.map((event) => ({
    ...event,
    odds: Math.max(1, Math.floor(event.odds / multiplier)),
  }))
}

function applyFieldObservationItemEventMultiplier(
  events: typeof fieldObservationGlobalItemEvents,
  multiplier: number,
) {
  if (multiplier === 1) return events
  return events.map((event) => ({
    ...event,
    dropChance: Math.min(100, event.dropChance * multiplier),
  }))
}

function getRandomPokemonFromPool(pool: number[]): number {
  if (!pool || pool.length === 0) return 1 // Fallback
  return pool[Math.floor(Math.random() * pool.length)]
}

function getRandomItemFromPool(pool: string[]): string {
  if (!pool || pool.length === 0) return 'potion' // Fallback
  return pool[Math.floor(Math.random() * pool.length)]
}

function getSnapTargetId(
  encounter: (typeof allGames)[number],
): number | undefined {
  return encounter.gameType === 'snap' &&
    typeof encounter.settings.target === 'number'
    ? encounter.settings.target
    : undefined
}

function getResearchSessionTimeLimit(encounter: (typeof allGames)[number]) {
  if (encounter.gameType === 'field-observation') {
    return getFieldObservationSessionSeconds(encounter.settings as any)
  }
  return encounter.settings.timeLimit || 60
}

function sanitizeResearchState(
  state: ResearchState,
): Omit<ResearchState, 'fieldObservationPrivate' | 'artAcademyPrivate'> {
  const { fieldObservationPrivate, artAcademyPrivate, ...safeState } = state
  void fieldObservationPrivate
  void artAcademyPrivate
  return safeState
}

function generateSnapTargetRoundData(
  timeLimit: number,
  successThreshold: number,
  target: number,
) {
  const maxStartMs = Math.max(0, timeLimit * 1000 - successThreshold)
  return {
    snapTargetId: target,
    snapTargetAppearAtMs: Math.floor(Math.random() * (maxStartMs + 1)),
  }
}

function getRequiredWins(encounter: (typeof allGames)[number]): number {
  return getRequiredResearchWins(encounter)
}

function getEligibleFieldObservationSettings(
  settings: FieldObservationSettings,
  userData: any,
  category: string,
  subCategory?: string,
  weather?: WeatherSnapshot,
): FieldObservationSettings {
  return {
    ...settings,
    pokemonPool: settings.pokemonPool.filter((entry) => {
      if (!entry.requirements || entry.requirements.length === 0) return true
      return entry.requirements.every((requirement) =>
        checkRequirement(userData, requirement, {
          category,
          subCategory,
          weather: weather?.weather,
        }),
      )
    }),
    itemDrops: (settings.itemDrops || []).filter((entry) => {
      if (!entry.requirements || entry.requirements.length === 0) return true
      return entry.requirements.every((requirement) =>
        checkRequirement(userData, requirement, {
          category,
          subCategory,
          weather: weather?.weather,
        }),
      )
    }),
  }
}

function buildGeneratedResearchSkillXpReward(
  encounter: (typeof allGames)[number],
  fallbackLevel: number,
  outcomeModifier = 1,
  pokemonBaseExperienceModifier = 1,
  finalXpModifier = 1,
): Reward | null {
  if (encounter.gameType !== 'field-observation' && !encounter.skillXp) {
    return null
  }

  const xpConfig = resolveSkillXpConfig(
    'researching',
    fallbackLevel,
    encounter.skillXp,
  )

  const safeFinalXpModifier =
    Number.isFinite(finalXpModifier) && finalXpModifier > 0
      ? finalXpModifier
      : 1
  const quantity =
    encounter.gameType === 'field-observation'
      ? encounter.skillXp
        ? calculatePokemonContentSkillXpWithModifier(
            xpConfig.skill,
            xpConfig.level,
            pokemonBaseExperienceModifier,
            outcomeModifier,
          )
        : calculateFieldObservationSkillXp(
            xpConfig.level,
            outcomeModifier,
            pokemonBaseExperienceModifier,
          )
      : calculateContentSkillXp(xpConfig.skill, xpConfig.level, outcomeModifier)

  return {
    type: 'xp',
    skill: xpConfig.skill,
    quantity: Math.max(1, Math.round(quantity * safeFinalXpModifier)),
    dropChance: 100,
  }
}

// Helper to generate a solvable sliding puzzle state
function generateSlidingPuzzleState(gridSize: number, shuffleMoves: number) {
  const totalTiles = gridSize * gridSize
  // Create solved state: [0, 1, ..., n-2, null]
  const tiles: (number | null)[] = Array.from(
    { length: totalTiles - 1 },
    (_, i) => i,
  )
  tiles.push(null) // Empty space at end

  let emptyIdx = tiles.length - 1

  // Shuffle by valid moves
  for (let i = 0; i < shuffleMoves; i++) {
    const row = Math.floor(emptyIdx / gridSize)
    const col = emptyIdx % gridSize

    const neighbors: number[] = []
    if (row > 0) neighbors.push(emptyIdx - gridSize) // up
    if (row < gridSize - 1) neighbors.push(emptyIdx + gridSize) // down
    if (col > 0) neighbors.push(emptyIdx - 1) // left
    if (col < gridSize - 1) neighbors.push(emptyIdx + 1) // right

    const swapIdx = neighbors[Math.floor(Math.random() * neighbors.length)]
    tiles[emptyIdx] = tiles[swapIdx]
    tiles[swapIdx] = null
    emptyIdx = swapIdx
  }

  return {
    tiles,
    gridSize,
    emptyIdx,
    moveCount: 0,
  }
}

function isSlidingPuzzleSolved(
  tiles: (number | null)[],
  gridSize: number,
): boolean {
  const totalTiles = gridSize * gridSize
  if (tiles.length !== totalTiles) return false

  for (let i = 0; i < totalTiles - 1; i++) {
    if (tiles[i] !== i) return false
  }

  return tiles[totalTiles - 1] === null
}

function isSlidingPuzzleMoveValid(
  tileIndex: number,
  emptyIdx: number,
  gridSize: number,
): boolean {
  const row = Math.floor(tileIndex / gridSize)
  const col = tileIndex % gridSize
  const emptyRow = Math.floor(emptyIdx / gridSize)
  const emptyCol = emptyIdx % gridSize

  return (
    (Math.abs(row - emptyRow) === 1 && col === emptyCol) ||
    (Math.abs(col - emptyCol) === 1 && row === emptyRow)
  )
}

export async function startResearchEncounter(
  encounterId: string,
  forceReset = false,
  consumedPokemonIds?: string[],
) {
  try {
    const startInput = validateResearchStartInput(
      encounterId,
      forceReset,
      consumedPokemonIds,
    )
    if (!startInput.success) {
      return { success: false, error: startInput.error }
    }
    const validatedEncounterId = startInput.value?.encounterId as string
    const validatedForceReset = startInput.value?.forceReset
    const validatedConsumedPokemonIds = startInput.value?.consumedPokemonIds

    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const rateLimit = await checkActionRateLimit(
      user.id,
      'research-start',
      30,
      60,
    )
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: 'Too many encounter starts. Please wait a moment.',
      }
    }

    const startLock = await acquireActionLock(
      `lock:research:start:${user.id}:${validatedEncounterId}`,
      15,
    )
    if (!startLock.acquired) {
      return { success: false, error: 'Encounter start already in progress' }
    }

    try {
      const payload = await getPayload({ config: configPromise })

      const encounter = allGames.find((e) => e.id === validatedEncounterId)
      if (!encounter) {
        return { success: false, error: 'Game encounter not found' }
      }

      // Check for existing session first
      const existingState = (await redis.get(
        `research:${user.id}`,
      )) as ResearchState | null

      // If a session exists and we aren't forcing a reset, return it
      if (existingState && !validatedForceReset) {
        if (existingState.expiry > Date.now()) {
          return {
            success: true,
            restored: true,
            encounterId: existingState.encounterId,
            nextPokemonId: existingState.currentPokemonId,
            nextItemId: existingState.currentItemId,
            startTime: existingState.startTime,
            expiry: existingState.expiry,
            wins: existingState.wins,
            roundData: existingState.roundData,
          }
        }
      }

      // Analyze requirements
      const fieldObservationPoolRequirements =
        encounter.gameType === 'field-observation'
          ? (encounter.settings.pokemonPool || []).flatMap(
              (entry: any) => entry.requirements || [],
            )
          : []
      const fieldObservationGlobalRequirements =
        encounter.gameType === 'field-observation'
          ? [
              ...fieldObservationGlobalPokemonEvents.flatMap(
                (event) => event.requirements || [],
              ),
              ...fieldObservationGlobalItemEvents.flatMap(
                (event) => event.requirements || [],
              ),
            ]
          : []
      const requiredKeys = analyzeRequirements([
        ...(encounter.requirements || []),
        ...(encounter.criteria || []),
        ...fieldObservationPoolRequirements,
        ...fieldObservationGlobalRequirements,
      ])
      const userData = await getGameUserData(user as User, requiredKeys)
      const weatherSnapshot = {
        ...resolveSubRegionWeather(encounter.subCategory, userData.weatherSlot),
        updatedAt: userData.weatherUpdatedAt,
      }

      // Check requirements
      const requirementsMet =
        !encounter.requirements ||
        encounter.requirements.length === 0 ||
        encounter.requirements.every((req) =>
          checkRequirement(userData, req, {
            category: encounter.category,
            subCategory: encounter.subCategory,
            weather: weatherSnapshot.weather,
          }),
        )

      if (!requirementsMet) {
        return { success: false, error: 'Requirements not met' }
      }

      // Check and Consume Criteria
      if (encounter.criteria && encounter.criteria.length > 0) {
        const criteriaMet = encounter.criteria.every((req) =>
          checkRequirement(userData, req, {
            category: encounter.category,
            subCategory: encounter.subCategory,
            weather: weatherSnapshot.weather,
          }),
        )
        if (!criteriaMet) {
          return { success: false, error: 'Entry criteria not met' }
        }

        const itemsToConsume: Record<string, number> = {}
        let hasConsumption = false

        // Check Pokemon Consumption Criteria
        const pokemonCriteria = encounter.criteria.filter(
          (req) => req.type === 'pokemon_owned' && req.consume,
        )

        if (pokemonCriteria.length > 0) {
          if (
            !validatedConsumedPokemonIds ||
            validatedConsumedPokemonIds.length === 0
          ) {
            return {
              success: false,
              error: 'No Pokemon selected for consumption',
            }
          }

          // Fetch user's selected Pokemon
          const { docs: userPokemon } = await payload.find({
            collection: 'pokemon',
            where: {
              id: { in: validatedConsumedPokemonIds },
              user: { equals: user.id },
            },
            limit: 100,
          })

          if (userPokemon.length !== validatedConsumedPokemonIds.length) {
            return { success: false, error: 'Invalid Pokemon selection' }
          }

          // Verify each criteria is met by the selection
          for (const req of pokemonCriteria) {
            const requiredCount = req.count || 1
            const targetId = req.targetId as string

            // Filter selection for this specific criteria
            const matchingPokemon = userPokemon.filter((p) => {
              if (req.pokemonCriteria)
                return isPokemonEligible(p, req.pokemonCriteria)
              if (targetId) return String(p.speciesId) === targetId
              return true
            })

            if (matchingPokemon.length < requiredCount) {
              return {
                success: false,
                error: `Not enough Pokemon selected for ${targetId} (Need ${requiredCount})`,
              }
            }
          }

          // Delete (Consume) Selected Pokemon
          for (const pid of validatedConsumedPokemonIds) {
            await payload.delete({
              collection: 'pokemon',
              id: pid,
            })
          }
        } else {
          // Ensure no Pokemon ID usage if not required?
          // Not strictly enforcing, but good practice.
        }

        // Check Item Consumption
        for (const req of encounter.criteria) {
          if (
            req.consume &&
            req.type === 'item_owned' &&
            typeof req.targetId === 'string'
          ) {
            itemsToConsume[req.targetId] =
              (itemsToConsume[req.targetId] || 0) + (req.count || 1)
            hasConsumption = true
          }
        }

        // Perform Item Consumption
        if (hasConsumption) {
          const payload = await getPayload({ config: configPromise })
          const currentInventory = await getUserInventoryMap(
            payload as any,
            user.id,
          )
          const newInventory = { ...currentInventory }

          for (const [itemId, count] of Object.entries(itemsToConsume)) {
            const current = newInventory[itemId] || 0
            if (current < count) {
              return { success: false, error: `Not enough items: ${itemId}` }
            }
            newInventory[itemId] = current - count
          }

          await setUserInventoryMap(payload as any, user.id, newInventory)
        }
      }

      const activePoke = await payload.find({
        collection: 'pokemon',
        where: {
          and: [
            { user: { equals: user.id } },
            { isCompanion: { equals: true } },
          ],
        },
        limit: 1,
      })
      const activeAbilityId = (activePoke.docs[0] as any)?.ability || undefined
      const activeAbilitySourceFormId =
        (activePoke.docs[0] as any)?.formId || undefined
      const activeAbility = activeAbilityId
        ? ABILITIES[activeAbilityId]
        : undefined
      const abilityContext = getResearchAbilityContext(encounter, {
        weather: weatherSnapshot,
      })

      // Initialize State variables
      const pokemonPool =
        encounter.gameType === 'field-observation'
          ? []
          : encounter.settings.pokemonPool || []
      const itemPool = encounter.settings.itemPool || []
      const snapTargetId = getSnapTargetId(encounter)

      let currentPokemonId: number | undefined
      let currentItemId: string | undefined
      let fieldObservationPrivate: FieldObservationPrivateRoundData | undefined
      let artAcademyPrivate: ArtAcademyPrivateRoundData | undefined

      // Pick first target
      if (encounter.gameType === 'field-observation') {
        currentPokemonId = undefined
      } else if (snapTargetId !== undefined) {
        currentPokemonId = snapTargetId
      } else if (itemPool.length > 0) {
        currentItemId = getRandomItemFromPool(itemPool)
      } else {
        const effectivePool =
          pokemonPool.length > 0
            ? pokemonPool
            : pokemonData.map((p) => p.id).slice(0, 50)
        currentPokemonId = getRandomPokemonFromPool(effectivePool)
      }

      const timeLimit = encounter.settings.timeLimit || 60
      const sessionTimeLimit = Math.max(
        1,
        getResearchSessionTimeLimit(encounter) +
          getResearchSessionTimeDeltaSeconds({
            ability: activeAbility,
            ...abilityContext,
          }),
      )
      const startTime = Date.now()
      const expiry = startTime + sessionTimeLimit * 1000

      let roundData: any
      if (snapTargetId !== undefined) {
        roundData = generateSnapTargetRoundData(
          timeLimit,
          encounter.settings.successThreshold || 1500,
          snapTargetId,
        )
      } else if (encounter.gameType === 'identify') {
        // Generate options
        if (itemPool.length > 0) {
          // Item Options
          const optionsPool =
            (encounter.settings.optionsPool as unknown as string[]) || itemPool
          const wrongOptions: string[] = []
          while (wrongOptions.length < 3) {
            const randomId = getRandomItemFromPool(itemPool)
            if (
              randomId !== currentItemId &&
              !wrongOptions.includes(randomId)
            ) {
              wrongOptions.push(randomId)
            }
          }
          const allOptions = [currentItemId, ...wrongOptions].sort(
            () => Math.random() - 0.5,
          )
          roundData = { options: allOptions }
        } else {
          // Pokemon Options
          const effectivePool =
            pokemonPool.length > 0
              ? pokemonPool
              : pokemonData.map((p) => p.id).slice(0, 50)
          const optionsPool =
            encounter.settings.optionsPool &&
            encounter.settings.optionsPool.length > 0
              ? encounter.settings.optionsPool
              : effectivePool
          const wrongOptions: number[] = []
          while (wrongOptions.length < 3) {
            const randomId = getRandomPokemonFromPool(optionsPool)
            if (
              randomId !== currentPokemonId &&
              !wrongOptions.includes(randomId)
            ) {
              wrongOptions.push(randomId)
            }
          }
          const allOptions = [currentPokemonId, ...wrongOptions].sort(
            () => Math.random() - 0.5,
          )
          roundData = { options: allOptions }
        }
      } else if (encounter.gameType === 'compare') {
        const effectivePool =
          pokemonPool.length > 0
            ? pokemonPool
            : pokemonData.map((p) => p.id).slice(0, 50)
        const count = encounter.settings.maxPokemonShown || 2
        const selection: number[] = [currentPokemonId as number]
        while (selection.length < count) {
          const next = getRandomPokemonFromPool(effectivePool)
          if (!selection.includes(next)) selection.push(next)
        }

        const allowedStats = (encounter.settings
          .comparisonOperator as string[]) || [
          'height',
          'weight',
          'hp',
          'attack',
          'defense',
          'specialAttack',
          'specialDefense',
          'speed',
        ]
        const stat =
          allowedStats[Math.floor(Math.random() * allowedStats.length)]
        const isHighest = Math.random() > 0.5

        roundData = {
          pokemon: selection,
          stat,
          isHighest,
        }

        // Determine winner based on stat
        const getStatValue = (id: number, s: string) => {
          const p = pokemonData.find((pd) => pd.id === id)
          if (!p) return 0
          const form = p.forms.find((f: any) => f.form === 'base') || p.forms[0]
          if (!form) return 0
          if (s === 'height' || s === 'weight') return (form as any)[s]

          const statMap: Record<string, string> = {
            hp: 'hp',
            attack: 'attack',
            defense: 'defense',
            specialAttack: 'special-attack',
            specialDefense: 'special-defense',
            speed: 'speed',
          }
          const key = statMap[s] || s
          return (form.stats as any)[key] || 0
        }

        const values = selection.map((id) => ({
          id,
          val: getStatValue(id, stat),
        }))
        values.sort((a, b) => (isHighest ? b.val - a.val : a.val - b.val))
        currentPokemonId = values[0].id
      } else if (encounter.gameType === 'spelling') {
        // Spelling game - generate letters to fill
        const pokemon = pokemonData.find((p) => p.id === currentPokemonId)
        const name = (
          pokemon?.forms.find((f: any) => f.form === 'base')?.name ||
          pokemon?.forms[0]?.name ||
          'Pokemon'
        ).toUpperCase()

        const missingCount = encounter.settings.missingLetters || 3
        const extraCount = encounter.settings.extraLetters || 4

        // Determine which indices to hide (randomly select missingCount unique indices)
        const allIndices = Array.from({ length: name.length }, (_, i) => i)
        const shuffledIndices = [...allIndices].sort(() => Math.random() - 0.5)
        // Sort hidden indices so we expect letters left-to-right
        const hiddenIndices = shuffledIndices
          .slice(0, Math.min(missingCount, name.length))
          .sort((a, b) => a - b)
        const revealedIndices = allIndices.filter(
          (i) => !hiddenIndices.includes(i),
        )

        // Get the missing letters
        const missingLetters = hiddenIndices.map((i) => name[i])

        // Generate extra random letters
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
        const extraLetters: string[] = []
        while (extraLetters.length < extraCount) {
          const randomLetter =
            alphabet[Math.floor(Math.random() * alphabet.length)]
          // Allow duplicates but don't add if it would make pool too predictable
          extraLetters.push(randomLetter)
        }

        // Combine and shuffle the letter pool
        const letterPool = [...missingLetters, ...extraLetters].sort(
          () => Math.random() - 0.5,
        )

        roundData = {
          targetName: name,
          revealedIndices,
          hiddenIndices,
          filledLetters: Array(name.length).fill(null), // Track what user has filled
          currentIndex: 0, // Which hidden index we're currently filling
          letterPool,
        }
      } else if (encounter.gameType === 'sliding-puzzle') {
        const gridSizeRaw = encounter.settings.gridSize
        const gridSize: number =
          typeof gridSizeRaw === 'number' ? gridSizeRaw : 4
        const shuffleMoves = encounter.settings.shuffleMoves || 100
        roundData = generateSlidingPuzzleState(gridSize, shuffleMoves)
      } else if (encounter.gameType === 'art-academy') {
        const generated = await createArtAcademyRound(
          encounter.settings as ArtAcademySettings,
        )
        roundData = generated.publicRoundData
        artAcademyPrivate = generated.privateRoundData
      } else if (encounter.gameType === 'field-observation') {
        let eligibleSettings = getEligibleFieldObservationSettings(
          encounter.settings as FieldObservationSettings,
          userData,
          encounter.category,
          encounter.subCategory,
          weatherSnapshot,
        )
        const durationDelta = getFieldObservationDurationDelta({
          ability: activeAbility,
          ...abilityContext,
        })
        if (durationDelta.observationSeconds || durationDelta.answerSeconds) {
          eligibleSettings = {
            ...eligibleSettings,
            timeLimit: addSecondsToFieldObservationTimeLimit(
              eligibleSettings.timeLimit,
              durationDelta.observationSeconds,
            ),
            answerTimeLimit: eligibleSettings.answerTimeLimit
              ? addSecondsToFieldObservationTimeLimit(
                  eligibleSettings.answerTimeLimit,
                  durationDelta.answerSeconds,
                )
              : eligibleSettings.answerTimeLimit,
          }
        }
        eligibleSettings = applyFieldObservationPoolWeightModifiers(
          eligibleSettings,
          {
            ability: activeAbility,
            ...abilityContext,
          },
        )
        const globalEventMultipliers =
          getFieldObservationGlobalEventMultipliers({
            ability: activeAbility,
            ...abilityContext,
          })
        const globalPokemonEvent = rollFieldObservationGlobalPokemonEvent(
          applyFieldObservationPokemonEventMultiplier(
            fieldObservationGlobalPokemonEvents,
            globalEventMultipliers.pokemonEventMultiplier,
          ),
          userData,
          encounter.category,
          encounter.subCategory,
          weatherSnapshot,
        )
        const globalItemEvents = rollFieldObservationGlobalItemEvents(
          applyFieldObservationItemEventMultiplier(
            fieldObservationGlobalItemEvents,
            globalEventMultipliers.itemEventMultiplier,
          ),
          userData,
          encounter.category,
          encounter.subCategory,
          weatherSnapshot,
        )
        const authoredItemDrops = rollFieldObservationItemDrops(
          eligibleSettings.itemDrops || [],
          userData,
          encounter.category,
          encounter.subCategory,
          weatherSnapshot,
        )
        const generated = generateFieldObservationRound(
          eligibleSettings,
          Math.random,
          {
            globalPokemonEvent,
            spawnModifierResolver: (surveyFocus) =>
              getFieldObservationSpawnModifiers({
                ability: activeAbility,
                ...abilityContext,
                surveyFocus: normalizeSurveyFocus(surveyFocus),
              }),
          },
        )
        const surveyFocusContext = {
          ability: activeAbility,
          ...abilityContext,
          surveyFocus: normalizeSurveyFocus(
            generated.privateRoundData.surveyFocus,
          ),
        }
        const abilityExtraDrops = getFieldObservationExtraCollectibles({
          ...surveyFocusContext,
        })
          .filter(
            ({ reward }) =>
              reward.type === 'item' && typeof reward.targetId === 'string',
          )
          .map(({ reward }, index) => ({
            id: `ability:${activeAbility?.id || 'unknown'}:${index}:${reward.targetId}`,
            itemId: reward.targetId as string,
            dropChance: reward.dropChance ?? 100,
            quantity: reward.quantity,
          }))
        const researchingLevel = (user.skills as any)?.researching?.level || 1
        const collectibleDrops = buildFieldObservationCollectibleDrops({
          rewardSubjects: generated.privateRoundData.rewardSubjects,
          spawns: generated.publicRoundData.spawns,
          researchingLevel,
          surveyFocus: generated.privateRoundData.surveyFocus,
          observationDurationMs:
            generated.publicRoundData.observationDurationMs,
          globalItemEvents: [
            ...globalItemEvents,
            ...authoredItemDrops,
            ...abilityExtraDrops,
          ],
          collectibleModifiers:
            getFieldObservationCollectibleModifiers(surveyFocusContext),
        })
        generated.privateRoundData.collectibleDrops = collectibleDrops
        generated.publicRoundData.collectibleDrops = collectibleDrops.map(
          toPublicFieldObservationCollectibleDrop,
        )
        roundData = generated.publicRoundData
        fieldObservationPrivate = generated.privateRoundData
      }

      // Generate initial slot session data if applicable
      let slotsSessionData: any
      if (encounter.gameType === 'slots') {
        const wr = encounter.settings.winRate
        let sessionRate = 30
        if (typeof wr === 'object' && wr !== null) {
          // Range: Roll random integer between min and max
          const range = wr as { min: number; max: number }
          // Weighted random towards lower end: Use square or cubic power
          // Random (0-1) squared -> distribution heavily skewed to 0
          const weightedRandom = Math.random() ** 2
          // Map 0-1 to range
          const diff = range.max - range.min
          // We want lower values more common -> map 0 to min, 1 to max ??
          // Wait, user said "exponentially weighted twords the lower number"
          // If we use Math.pow(Math.random(), 2), 0.1 becomes 0.01, 0.9 becomes 0.81.
          // This skews results towards 0. So if we map 0 -> min and 1 -> max, we get skews towards min.
          sessionRate = Math.floor(weightedRandom * (diff + 1)) + range.min
        } else if (typeof wr === 'number') {
          sessionRate = wr
        }
        slotsSessionData = {
          totalRewards: {},
          currentWinRate: sessionRate,
          totalCost: 0,
        }
      } else if (encounter.gameType === 'pachinko') {
        // Initialize Pachinko session logic if needed?
        // Just placeholder for now
        // Actually completePachinkoDrop will init it if missing?
        // Better to init here
        const state: ResearchState = {
          userId: user.id,
          encounterId: validatedEncounterId,
          startTime,
          expiry: expiry,
          wins: 0,
          losses: 0,
          currentPokemonId,
          currentItemId,
          history: [],
          roundData,
          weather: weatherSnapshot,
          activeAbilityId,
          activeAbilitySourceFormId,
          pachinkoSession: {
            totalRewards: {},
            totalCost: 0,
          },
        }
        await redis.set(`research:${user.id}`, state, {
          ex: sessionTimeLimit + 120,
        })
        return {
          success: true,
          startTime,
          expiry,
        }
      }

      const state: ResearchState = {
        userId: user.id,
        encounterId: validatedEncounterId,
        startTime,
        expiry: expiry,
        wins: 0,
        losses: 0,
        currentPokemonId,
        currentItemId,
        history: [],
        snapRoundStartTime:
          encounter.gameType === 'snap' ? Date.now() : undefined,
        roundData,
        fieldObservationPrivate,
        artAcademyPrivate,
        weather: weatherSnapshot,
        activeAbilityId,
        activeAbilitySourceFormId,
        slotsSession: slotsSessionData,
      }

      // Endless mode games use per-turn timers and can run indefinitely - use 1 hour TTL
      const isEndlessMode =
        (encounter as any).settings?.endless?.enabled || false
      const sessionTTL =
        isEndlessMode || encounter.gameType === 'tcg-battle'
          ? 3600
          : sessionTimeLimit + 120
      await redis.set(`research:${user.id}`, state, { ex: sessionTTL })

      return {
        success: true,
        nextPokemonId: state.currentPokemonId,
        nextItemId: state.currentItemId,
        roundData: state.roundData,
        startTime,
        expiry: expiry,
        wins: 0,
      }
    } finally {
      await releaseActionLock(startLock)
    }
  } catch (error) {
    console.error('Error starting research encounter:', error)
    return { success: false, error: 'Failed to start encounter' }
  }
}

export async function submitResearchAnswer(answer: any) {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const state = (await redis.get(
      `research:${user.id}`,
    )) as ResearchState | null
    if (!state) {
      return {
        success: false,
        error: 'Session expired or not found',
        gameOver: true,
      }
    }

    const encounter = allGames.find((e) => e.id === state.encounterId)
    if (!encounter) {
      return { success: false, error: 'Invalid encounter' }
    }

    const answerValidation = validateResearchAnswer(encounter.gameType, answer)
    if (!answerValidation.success) {
      return { success: false, error: answerValidation.error }
    }
    const validatedAnswer = answerValidation.value

    const submissionRateLimit = await checkActionRateLimit(
      user.id,
      `research-submit:${state.encounterId}`,
      200,
      60,
    )
    if (!submissionRateLimit.allowed) {
      return { success: false, error: 'Too many actions. Please slow down.' }
    }

    const gameEndTime = state.expiry
    const snapTargetId = getSnapTargetId(encounter)
    const activeAbility = getResearchStateAbility(state)
    const abilityContext = getResearchAbilityContext(encounter, state)

    if (Date.now() > gameEndTime) {
      return { success: false, message: 'Time is up!', gameOver: true }
    }

    if (
      encounter.gameType === 'field-observation' &&
      state.history.length > 0
    ) {
      const previousReport = state.history[state.history.length - 1]
      return {
        success: true,
        correct: previousReport.correct,
        roundData: state.roundData,
        wins: state.wins,
        requiredWins: getRequiredWins(encounter),
        gameOver: true,
      }
    }

    let isCorrect = false
    const pokemonPool =
      encounter.gameType === 'field-observation'
        ? []
        : encounter.settings.pokemonPool || []
    const itemPool = encounter.settings.itemPool || []

    // Verification Logic
    if (encounter.gameType === 'snap') {
      const snappedId = Number(validatedAnswer)
      if (snapTargetId !== undefined) {
        const targetStart =
          state.startTime + Number(state.roundData?.snapTargetAppearAtMs ?? 0)
        const targetEnd =
          targetStart + (encounter.settings.successThreshold || 1500)
        const now = Date.now()
        const timingValid = now >= targetStart - 250 && now <= targetEnd + 1500
        isCorrect = snappedId === snapTargetId && timingValid
      } else if (snappedId === state.currentPokemonId) {
        isCorrect = true
      } else {
        isCorrect = false
      }
      state.snapRoundStartTime = Date.now()
    } else if (encounter.gameType === 'field-observation') {
      isCorrect = isFieldObservationAnswerCorrect(
        state.fieldObservationPrivate,
        validatedAnswer,
      )
    } else if (
      ['silhouette', 'cry', 'identify', 'compare'].includes(encounter.gameType)
    ) {
      if (encounter.gameType === 'compare') {
        isCorrect = String(validatedAnswer) === String(state.currentPokemonId)
      } else {
        // Standard ID match
        if (state.currentItemId) {
          isCorrect = String(validatedAnswer) === String(state.currentItemId)
        } else {
          isCorrect = String(validatedAnswer) === String(state.currentPokemonId)
        }
      }
    } else if (encounter.gameType === 'rock-push') {
      isCorrect = Boolean(validatedAnswer)
    } else if (encounter.gameType === 'rhythm') {
      isCorrect = Boolean(validatedAnswer)
    } else if (encounter.gameType === 'run') {
      // For run game, answer is a boolean indicating win/loss
      // Validate using delta-time based scoring (100 points per second)
      if (validatedAnswer) {
        const elapsedTime = (Date.now() - state.startTime) / 1000 // seconds
        const winScore = encounter.settings.winScore || 1000
        const scorePerSecond = 10 // Must match SCORE_PER_SECOND in client

        // Calculate minimum time needed to reach win score
        const minTimeNeeded = winScore / scorePerSecond

        // Add 20% tolerance for network latency and timing variations
        const minTimeWithTolerance = minTimeNeeded * 0.8

        if (elapsedTime < minTimeWithTolerance) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(
              `User ${user.id} attempted to cheat in run game ${state.encounterId}: ` +
                `claimed win with score ${winScore} in ${elapsedTime.toFixed(2)}s ` +
                `(minimum required: ${minTimeNeeded.toFixed(2)}s)`,
            )
          }
          isCorrect = false
        } else {
          isCorrect = true
        }
      } else {
        isCorrect = false
      }
    } else if (
      encounter.gameType === 'flap' ||
      encounter.gameType === 'mining'
    ) {
      isCorrect = Boolean(validatedAnswer)
    } else if (encounter.gameType === 'spelling') {
      // Spelling game - answer is { letter: string }
      const { letter } = validatedAnswer as { letter: string }
      const roundData = state.roundData
      if (roundData?.hiddenIndices && roundData.targetName) {
        const currentHiddenIdx = roundData.currentIndex || 0
        const targetIndex = roundData.hiddenIndices[currentHiddenIdx]
        const expectedLetter = roundData.targetName[targetIndex]

        if (letter.toUpperCase() === expectedLetter) {
          // Correct letter - fill it in
          roundData.filledLetters[targetIndex] = letter.toUpperCase()
          roundData.currentIndex = currentHiddenIdx + 1

          // Remove used letter from pool
          const letterIdx = roundData.letterPool.findIndex(
            (l: string) => l.toUpperCase() === letter.toUpperCase(),
          )
          if (letterIdx !== -1) {
            roundData.letterPool.splice(letterIdx, 1)
          }

          // Check if all letters are filled
          if (roundData.currentIndex >= roundData.hiddenIndices.length) {
            // Word complete - this counts as a win for this round
            isCorrect = true
          } else {
            // More letters to fill - return partial success (not counted as win yet)
            state.roundData = roundData
            await redis.set(`research:${user.id}`, state, {
              ex: Math.floor((gameEndTime + 60000 - Date.now()) / 1000),
            })
            return {
              success: true,
              correct: true,
              partial: true, // Indicates letter was correct but word not complete
              roundData: state.roundData,
              wins: state.wins,
              gameOver: false,
            }
          }
        } else {
          // Wrong letter - fail this Pokemon, move to next
          isCorrect = false
        }
      }
    } else if (encounter.gameType === 'sliding-puzzle') {
      // Server-authoritative sliding puzzle validation.
      const { moveTileIndex } = validatedAnswer as { moveTileIndex?: number }
      const roundData = state.roundData

      if (
        typeof moveTileIndex !== 'number' ||
        !roundData ||
        !Array.isArray(roundData.tiles)
      ) {
        return {
          success: false,
          error: 'Invalid sliding puzzle action',
        }
      }

      const boardGridSizeRaw = roundData.gridSize ?? encounter.settings.gridSize
      const boardGridSize =
        typeof boardGridSizeRaw === 'number' ? boardGridSizeRaw : 4

      const tiles = [...(roundData.tiles as (number | null)[])]
      const totalTiles = boardGridSize * boardGridSize

      if (
        moveTileIndex < 0 ||
        moveTileIndex >= totalTiles ||
        !Number.isInteger(moveTileIndex) ||
        tiles[moveTileIndex] === null
      ) {
        return {
          success: true,
          correct: false,
          partial: true,
          message: 'Invalid move',
          roundData: state.roundData,
          wins: state.wins,
          gameOver: false,
        }
      }

      const emptyIdx =
        typeof roundData.emptyIdx === 'number'
          ? roundData.emptyIdx
          : tiles.indexOf(null)

      if (emptyIdx < 0) {
        return { success: false, error: 'Invalid puzzle state' }
      }

      if (!isSlidingPuzzleMoveValid(moveTileIndex, emptyIdx, boardGridSize)) {
        return {
          success: true,
          correct: false,
          partial: true,
          message: 'Invalid move',
          roundData: state.roundData,
          wins: state.wins,
          gameOver: false,
        }
      }

      // Apply move server-side
      tiles[emptyIdx] = tiles[moveTileIndex]
      tiles[moveTileIndex] = null

      const updatedRoundData = {
        ...roundData,
        tiles,
        gridSize: boardGridSize,
        emptyIdx: moveTileIndex,
        moveCount: (roundData.moveCount || 0) + 1,
      }

      if (!isSlidingPuzzleSolved(tiles, boardGridSize)) {
        state.roundData = updatedRoundData
        await redis.set(`research:${user.id}`, state, {
          ex: Math.floor((gameEndTime + 60000 - Date.now()) / 1000),
        })

        return {
          success: true,
          correct: true,
          partial: true,
          message: 'Move accepted',
          roundData: state.roundData,
          wins: state.wins,
          gameOver: false,
        }
      }

      // Puzzle solved for this round.
      isCorrect = true
    }

    if (
      !isCorrect &&
      shouldApplyResearchAnswerGrace({
        ability: activeAbility,
        ...abilityContext,
      })
    ) {
      isCorrect = true
    }

    // Update Scores
    if (isCorrect) {
      state.wins +=
        1 +
        getResearchWinDelta({
          ability: activeAbility,
          ...abilityContext,
          trigger: 'correct',
        })
    } else {
      state.losses += 1
      if (encounter.settings.lose_points) {
        state.wins = Math.max(
          0,
          state.wins - (encounter.settings.lose_points || 0),
        )
      }
    }

    state.history.push({
      questionId: state.currentItemId || state.currentPokemonId || 0,
      answer: validatedAnswer,
      correct: isCorrect,
      timestamp: Date.now(),
    })

    // Pick Next Target
    let nextPokemonId: number | undefined
    let nextItemId: string | undefined

    if (
      snapTargetId !== undefined ||
      encounter.gameType === 'rock-push' ||
      encounter.gameType === 'run' ||
      encounter.gameType === 'field-observation'
    ) {
      // No next target
    } else if (itemPool.length > 0) {
      nextItemId = getRandomItemFromPool(itemPool)
      state.currentItemId = nextItemId
      state.currentPokemonId = undefined
    } else {
      const effectivePool =
        pokemonPool.length > 0
          ? pokemonPool
          : pokemonData.map((p) => p.id).slice(0, 50)
      nextPokemonId = getRandomPokemonFromPool(effectivePool)
      state.currentPokemonId = nextPokemonId
      state.currentItemId = undefined
    }

    // Regenerate Round Data
    if (encounter.gameType === 'identify') {
      if (itemPool.length > 0) {
        // Item Options
        const optionsPool =
          (encounter.settings.optionsPool as unknown as string[]) || itemPool
        const wrongOptions: string[] = []
        while (wrongOptions.length < 3) {
          const randomId = getRandomItemFromPool(itemPool)
          if (randomId !== nextItemId && !wrongOptions.includes(randomId)) {
            wrongOptions.push(randomId)
          }
        }
        const allOptions = [nextItemId, ...wrongOptions].sort(
          () => Math.random() - 0.5,
        )
        state.roundData = { options: allOptions }
      } else {
        // Pokemon Options
        const effectivePool =
          pokemonPool.length > 0
            ? pokemonPool
            : pokemonData.map((p) => p.id).slice(0, 50)
        const optionsPool =
          encounter.settings.optionsPool &&
          encounter.settings.optionsPool.length > 0
            ? encounter.settings.optionsPool
            : effectivePool
        const wrongOptions: number[] = []
        while (wrongOptions.length < 3) {
          const randomId = getRandomPokemonFromPool(optionsPool)
          if (randomId !== nextPokemonId && !wrongOptions.includes(randomId)) {
            wrongOptions.push(randomId)
          }
        }
        const allOptions = [nextPokemonId, ...wrongOptions].sort(
          () => Math.random() - 0.5,
        )
        state.roundData = { options: allOptions }
      }
    } else if (encounter.gameType === 'compare') {
      const effectivePool =
        pokemonPool.length > 0
          ? pokemonPool
          : pokemonData.map((p) => p.id).slice(0, 50)
      const count = encounter.settings.maxPokemonShown || 2
      const selection: number[] = [nextPokemonId as number]
      while (selection.length < count) {
        const next = getRandomPokemonFromPool(effectivePool)
        if (!selection.includes(next)) selection.push(next)
      }

      // Recalculate stat/winner
      const allowedStats = (encounter.settings
        .comparisonOperator as string[]) || [
        'height',
        'weight',
        'hp',
        'attack',
        'defense',
        'specialAttack',
        'specialDefense',
        'speed',
      ]
      const stat = allowedStats[Math.floor(Math.random() * allowedStats.length)]
      const isHighest = Math.random() > 0.5

      state.roundData = { pokemon: selection, stat, isHighest }

      const getStatValue = (id: number, s: string) => {
        const p = pokemonData.find((pd) => pd.id === id)
        if (!p) return 0
        const form = p.forms.find((f: any) => f.form === 'base') || p.forms[0]
        if (!form) return 0
        if (s === 'height' || s === 'weight') return (form as any)[s]
        const statMap: Record<string, string> = {
          hp: 'hp',
          attack: 'attack',
          defense: 'defense',
          specialAttack: 'special-attack',
          specialDefense: 'special-defense',
          speed: 'speed',
        }
        const key = statMap[s] || s
        return (form.stats as any)[key] || 0
      }
      const values = selection.map((id) => ({
        id,
        val: getStatValue(id, stat),
      }))
      values.sort((a, b) => (isHighest ? b.val - a.val : a.val - b.val))
      state.currentPokemonId = values[0].id
    } else if (encounter.gameType === 'spelling') {
      // Regenerate spelling round data for new Pokemon
      const pokemon = pokemonData.find((p) => p.id === nextPokemonId)
      const name = (
        pokemon?.forms.find((f: any) => f.form === 'base')?.name ||
        pokemon?.forms[0]?.name ||
        'Pokemon'
      ).toUpperCase()

      const missingCount = encounter.settings.missingLetters || 3
      const extraCount = encounter.settings.extraLetters || 4

      const allIndices = Array.from({ length: name.length }, (_, i) => i)
      const shuffledIndices = [...allIndices].sort(() => Math.random() - 0.5)
      // Sort hidden indices so we expect letters left-to-right
      const hiddenIndices = shuffledIndices
        .slice(0, Math.min(missingCount, name.length))
        .sort((a, b) => a - b)
      const revealedIndices = allIndices.filter(
        (i) => !hiddenIndices.includes(i),
      )

      const missingLetters = hiddenIndices.map((i) => name[i])

      const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
      const extraLetters: string[] = []
      while (extraLetters.length < extraCount) {
        const randomLetter =
          alphabet[Math.floor(Math.random() * alphabet.length)]
        extraLetters.push(randomLetter)
      }

      const letterPool = [...missingLetters, ...extraLetters].sort(
        () => Math.random() - 0.5,
      )

      state.roundData = {
        targetName: name,
        revealedIndices,
        hiddenIndices,
        filledLetters: Array(name.length).fill(null),
        currentIndex: 0,
        letterPool,
      }
    } else if (encounter.gameType === 'sliding-puzzle') {
      const gridSizeRaw = encounter.settings.gridSize
      const gridSize: number = typeof gridSizeRaw === 'number' ? gridSizeRaw : 4
      const shuffleMoves = encounter.settings.shuffleMoves || 100
      state.roundData = generateSlidingPuzzleState(gridSize, shuffleMoves)
    }

    // Update Redis
    await redis.set(`research:${user.id}`, state, {
      ex: Math.floor((gameEndTime + 60000 - Date.now()) / 1000),
    })

    const requiredWins = getRequiredWins(encounter)
    let gameOver = state.wins >= requiredWins

    if (encounter.gameType === 'field-observation') {
      gameOver = true
    }

    if (
      !isCorrect &&
      (encounter.settings.death || snapTargetId !== undefined)
    ) {
      gameOver = true
    }

    return {
      success: true,
      correct: isCorrect,
      nextPokemonId: state.currentPokemonId,
      nextItemId: state.currentItemId,
      roundData: state.roundData,
      wins: state.wins,
      requiredWins,
      gameOver,
      message:
        !isCorrect && (encounter.settings.death || snapTargetId !== undefined)
          ? 'Game Over!'
          : undefined,
    }
  } catch (error) {
    console.error('Error submitting answer:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function collectFieldObservationDrop(dropId: string) {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const normalizedDropId = typeof dropId === 'string' ? dropId.trim() : ''
    if (!/^drop-\d+-[a-z0-9-]+$/i.test(normalizedDropId)) {
      return { success: false, error: 'Invalid drop' }
    }

    const rateLimit = await checkActionRateLimit(
      user.id,
      'field-observation-drop',
      120,
      60,
    )
    if (!rateLimit.allowed) {
      return { success: false, error: 'Too many collection attempts.' }
    }

    const lock = await acquireActionLock(
      `lock:field-observation-drop:${user.id}:${normalizedDropId}`,
      5,
    )
    if (!lock.acquired) {
      return { success: false, error: 'Drop collection already in progress' }
    }

    try {
      const state = (await redis.get(
        `research:${user.id}`,
      )) as ResearchState | null
      if (!state?.fieldObservationPrivate) {
        return { success: false, error: 'No active field survey' }
      }

      const encounter = allGames.find((e) => e.id === state.encounterId)
      if (encounter?.gameType !== 'field-observation') {
        return { success: false, error: 'No active field survey' }
      }

      const drop = (state.fieldObservationPrivate.collectibleDrops || []).find(
        (entry) => entry.id === normalizedDropId,
      )
      if (!drop) {
        return { success: false, error: 'Drop not found' }
      }

      const now = Date.now()
      const visibleStart = state.startTime + drop.startMs - 300
      const visibleEnd = state.startTime + drop.startMs + drop.durationMs + 750
      if (now < visibleStart || now > visibleEnd) {
        return { success: false, error: 'Drop is no longer available' }
      }

      const collectedDropIds = new Set(
        state.fieldObservationPrivate.collectedDropIds || [],
      )
      collectedDropIds.add(normalizedDropId)
      const collectedDropIdList = Array.from(collectedDropIds)
      state.fieldObservationPrivate.collectedDropIds = collectedDropIdList
      if (state.roundData?.gameType === 'field-observation') {
        state.roundData.collectedDropIds = collectedDropIdList
      }

      const ttlSeconds = Math.max(
        60,
        Math.ceil((state.expiry - now) / 1000) + 120,
      )
      await redis.set(`research:${user.id}`, state, { ex: ttlSeconds })

      return {
        success: true,
        collected: true,
        itemId: drop.itemId,
        label: drop.label,
      }
    } finally {
      await releaseActionLock(lock)
    }
  } catch (error) {
    console.error('Error collecting field observation drop:', error)
    return { success: false, error: 'Internal server error' }
  }
}

function getCollectedFieldObservationRewards(state: ResearchState): Reward[] {
  const privateRound = state.fieldObservationPrivate
  if (!privateRound) return []

  const collectedDropIds = new Set(privateRound.collectedDropIds || [])
  if (collectedDropIds.size === 0) return []

  return (privateRound.collectibleDrops || [])
    .filter((drop) => collectedDropIds.has(drop.id))
    .map((drop) => ({ ...drop.reward, dropChance: 100 }))
}

function getCollectedRockPushRewards(
  encounter: (typeof allGames)[number],
  collectedPrizeIds?: string[],
): Reward[] {
  if (encounter.gameType !== 'rock-push' || !collectedPrizeIds?.length) {
    return []
  }

  const collectedIds = new Set(collectedPrizeIds)
  const settings = encounter.settings as any
  const prizes = [
    ...((settings.prizes || []) as any[]).map((prize, index) => ({
      prize,
      index,
      screenId: undefined,
    })),
    ...((settings.screens || []) as any[]).flatMap((screen) =>
      ((screen.prizes || []) as any[]).map((prize, index) => ({
        prize,
        index,
        screenId: screen.id as string,
      })),
    ),
  ]

  return prizes
    .filter(({ prize, index, screenId }) =>
      collectedIds.has(
        screenId
          ? getRockPushScopedPrizeId(prize, index, screenId)
          : getRockPushPrizeId(prize, index),
      ),
    )
    .map(({ prize }) => getRockPushPrizeReward(prize) as Reward)
}

export async function completeResearchEncounter(
  encounterId: string,
  success: boolean,
  finalScore?: number,
  additionalLosses?: number, // For games that track losses locally (pachinko)
  collectedEndlessRewards?: Record<string, number>,
  collectedRockPushRewardIds?: string[],
  artAcademyDrawing?: string,
): Promise<ResearchCompletionResult> {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const encounterInput = validateResearchEncounterId(encounterId)
    if (!encounterInput.success) {
      return { success: false, error: encounterInput.error }
    }
    const validatedEncounterId = encounterInput.value as string

    const completionInput = validateResearchCompletionInput(
      success,
      finalScore,
      additionalLosses,
      collectedEndlessRewards,
      collectedRockPushRewardIds,
      artAcademyDrawing,
    )
    if (!completionInput.success) {
      return { success: false, error: completionInput.error }
    }
    const validatedSuccess = completionInput.value?.success as boolean
    const validatedFinalScore = completionInput.value?.finalScore
    const validatedAdditionalLosses = completionInput.value?.additionalLosses
    const validatedCollectedEndlessRewards =
      completionInput.value?.collectedEndlessRewards
    const validatedCollectedRockPushRewardIds =
      completionInput.value?.collectedRockPushRewardIds
    const validatedArtAcademyDrawing = completionInput.value?.artAcademyDrawing

    const previewState = (await redis.get(
      `research:${user.id}`,
    )) as ResearchState | null
    if (!previewState || previewState.encounterId !== validatedEncounterId) {
      const lastStart = await redis.get<number>(
        `research:complete-last-start:${user.id}:${validatedEncounterId}`,
      )
      if (lastStart) {
        const recentResult =
          await getIdempotentResult<ResearchCompletionResult>(
            `research:complete-result:${user.id}:${validatedEncounterId}:${lastStart}`,
          )
        if (recentResult) {
          return recentResult
        }
      }

      return { success: false, error: 'Research encounter session expired' }
    }

    const previewResultKey = `research:complete-result:${user.id}:${validatedEncounterId}:${previewState.startTime}`
    const previewCachedResult =
      await getIdempotentResult<ResearchCompletionResult>(previewResultKey)
    if (previewCachedResult) {
      return previewCachedResult
    }

    const rateLimit = await checkActionRateLimit(
      user.id,
      `research-complete:${validatedEncounterId}`,
      20,
      60,
    )
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: 'Too many completion attempts. Please wait a moment.',
      }
    }

    const completionLock = await acquireActionLock(
      `lock:research:complete:${user.id}:${validatedEncounterId}`,
      15,
    )
    if (!completionLock.acquired) {
      return { success: false, error: 'Completion already being processed' }
    }

    try {
      const payload = await getPayload({ config: configPromise })

      const encounter = allGames.find((e) => e.id === validatedEncounterId)
      if (!encounter) {
        return { success: false, error: 'Game encounter not found' }
      }

      // Verify Redis state
      const state = (await redis.get(
        `research:${user.id}`,
      )) as ResearchState | null
      if (!state) {
        const recentResult =
          await getIdempotentResult<ResearchCompletionResult>(previewResultKey)
        if (recentResult) {
          return recentResult
        }
        return { success: false, error: 'Research encounter session expired' }
      }

      if (state.encounterId !== validatedEncounterId) {
        return { success: false, error: 'Invalid encounter session' }
      }
      const rewardRequirementContext = {
        category: encounter.category,
        subCategory: encounter.subCategory,
        weather: state.weather?.weather,
      }
      const activeAbility = getResearchStateAbility(state)
      const abilityContext = getResearchAbilityContext(encounter, state)
      const researchSkillXpMultiplier = getResearchSkillXpMultiplier({
        ability: activeAbility,
        ...abilityContext,
      })
      const fieldObservationResearchXpMultiplier =
        getFieldObservationResearchXpMultiplier({
          ability: activeAbility,
          ...abilityContext,
        })

      if (encounter.gameType === 'tcg-battle') {
        const battleState = (await redis.get(`tcg-battle:${user.id}`)) as {
          encounterId: string
          phase: string
          winner?: 'player' | 'opponent' | 'tie'
        } | null
        if (
          !battleState ||
          battleState.encounterId !== validatedEncounterId ||
          battleState.phase !== 'finished'
        ) {
          return { success: false, error: 'TCG battle is not finished' }
        }

        const battleSuccess = battleState.winner === 'player'
        if (validatedSuccess !== battleSuccess) {
          return { success: false, error: 'Invalid TCG battle result' }
        }
      }

      const resultKey = `research:complete-result:${user.id}:${validatedEncounterId}:${state.startTime}`
      const cachedResult =
        await getIdempotentResult<ResearchCompletionResult>(resultKey)
      if (cachedResult) {
        return cachedResult
      }

      let artAcademyScore: number | null = null
      if (encounter.gameType === 'art-academy') {
        if (!validatedArtAcademyDrawing || !state.artAcademyPrivate) {
          return {
            success: false,
            error: 'Art Academy drawing data is missing',
          }
        }
        artAcademyScore = scoreSerializedArtAcademyDrawing({
          encodedDrawing: validatedArtAcademyDrawing,
          privateRoundData: state.artAcademyPrivate,
        })
        if (artAcademyScore === null) {
          return { success: false, error: 'Invalid Art Academy drawing data' }
        }
      }

      // Check if this is an endless mode game
      const isEndlessMode =
        (encounter as any).settings?.endless?.enabled || false

      // For endless mode, validate the score with anti-cheat
      // Skip for match3 games - their score comes from matching crystals, not time-based
      const normalizedFinalScore = normalizeFinalScore(
        artAcademyScore ?? validatedFinalScore,
      )
      if (isEndlessMode && normalizedFinalScore !== null) {
        const elapsedTime = (Date.now() - state.startTime) / 1000 // seconds
        const maxPossibleScore = getMaxAllowedEndlessScore(
          encounter.gameType,
          (encounter as any).settings,
          elapsedTime,
        )

        if (
          maxPossibleScore !== null &&
          normalizedFinalScore > maxPossibleScore
        ) {
          if (process.env.NODE_ENV === 'development') {
            console.warn(
              `User ${user.id} attempted to cheat in endless mode ${validatedEncounterId}: ` +
                `final score ${normalizedFinalScore} in ${elapsedTime.toFixed(2)}s ` +
                `(max possible: ${maxPossibleScore.toFixed(0)})`,
            )
          }
          // Reject the score as cheating
          await redis.del(`research:${user.id}`)
          return { success: false, error: 'Invalid score detected' }
        }
      }

      const isGamblingGame =
        encounter.gameType === 'slots' ||
        encounter.gameType === 'pachinko' ||
        encounter.gameType === 'prize-wheel'
      const isScoreCompletionGame =
        ((encounter.gameType === 'match3' ||
          encounter.gameType === 'tcg-inspection') &&
          typeof encounter.settings.winScore === 'number') ||
        (encounter.gameType === 'art-academy' &&
          typeof encounter.settings.successThreshold === 'number')
      const isSnapTargetMode = getSnapTargetId(encounter) !== undefined
      const isFieldObservation = encounter.gameType === 'field-observation'
      const requiredWins = getRequiredWins(encounter)

      // Add any additional losses tracked locally (for pachinko misses)
      if (validatedAdditionalLosses && validatedAdditionalLosses > 0) {
        state.losses += validatedAdditionalLosses
      }

      // Check if they meet requirements (including this potential win)
      const scoreCompletionSuccess =
        isScoreCompletionGame &&
        normalizedFinalScore !== null &&
        normalizedFinalScore >=
          (encounter.gameType === 'art-academy'
            ? encounter.settings.successThreshold
            : encounter.settings.winScore)!
      const completionWin =
        encounter.gameType === 'art-academy'
          ? scoreCompletionSuccess
          : validatedSuccess || scoreCompletionSuccess
      const currentWins =
        isSnapTargetMode || isFieldObservation
          ? state.wins
          : state.wins + (completionWin ? 1 : 0)
      const actualSuccess = currentWins >= requiredWins

      if (validatedSuccess && !actualSuccess && !isEndlessMode) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            `User ${user.id} claimed research success for ${validatedEncounterId} but verification failed (wins: ${state.wins}/${requiredWins})`,
          )
        }
      }

      // For endless mode, it's only a "win" in stats if they achieved at least one milestone
      let isEndlessWin = false
      if (isEndlessMode && normalizedFinalScore !== null) {
        const endlessSettings = (encounter as any).settings.endless || {}
        const lowestRewardScore = getLowestEndlessRewardScore({
          milestones: endlessSettings.milestones || [],
          repeatingRewards: endlessSettings.repeatingRewards || [],
        })
        if (
          lowestRewardScore !== null &&
          normalizedFinalScore >= lowestRewardScore
        ) {
          isEndlessWin = true
        }
      }

      if (
        encounter.gameType === 'slots' ||
        encounter.gameType === 'pachinko' ||
        encounter.gameType === 'prize-wheel' ||
        encounter.gameType === 'fishing'
      ) {
        // Slots & Pachinko record stats per-spin/drop
        // But batch-reported losses (misses) for pachinko need to be added here
        if (
          encounter.gameType === 'pachinko' &&
          validatedAdditionalLosses &&
          validatedAdditionalLosses > 0
        ) {
          await incrementUserActivityResult(
            payload as any,
            user.id,
            'researchEncounterResults',
            validatedEncounterId,
            { losses: validatedAdditionalLosses },
          )
        }
      } else {
        await incrementUserActivityResult(
          payload as any,
          user.id,
          'researchEncounterResults',
          validatedEncounterId,
          {
            [actualSuccess || isEndlessWin ? 'wins' : 'losses']: 1,
            ...(isEndlessMode && normalizedFinalScore !== null
              ? { highScore: normalizedFinalScore }
              : {}),
          },
        )
      }

      if (
        (actualSuccess || isEndlessWin) &&
        encounter.gameType !== 'fishing' &&
        !DAILY_EXCLUDED_GAME_TYPES.has(encounter.gameType)
      ) {
        await recordDailyActivityProgress(user.id, {
          kind: 'research_win',
          sourceId: validatedEncounterId,
        })
      }

      // Deduct cost for additional losses (misses) if any
      const cost = encounter.settings.cost
      const updateData: any = {}
      if (cost && validatedAdditionalLosses && validatedAdditionalLosses > 0) {
        const currentBalance = (user.currency as any)?.[cost.currencyType] || 0
        const totalMissCost = cost.amount * validatedAdditionalLosses
        updateData.currency = {
          ...user.currency,
          [cost.currencyType]: Math.max(0, currentBalance - totalMissCost),
        }

        // Update session cost for reward summary
        if (encounter.gameType === 'pachinko') {
          const currentSession = state.pachinkoSession || {
            totalRewards: {},
            totalCost: 0,
          }
          currentSession.totalCost =
            (currentSession.totalCost || 0) + totalMissCost
          state.pachinkoSession = currentSession
        }
      }

      if (Object.keys(updateData).length > 0) {
        await payload.update({
          collection: 'users',
          id: user.id,
          data: updateData,
        })
      }

      let rewardSummary = null
      let completionMessage: string | undefined
      const collectedFieldObservationRewards =
        encounter.gameType === 'field-observation'
          ? getCollectedFieldObservationRewards(state)
          : []
      const collectedRockPushRewards =
        encounter.gameType === 'rock-push'
          ? getCollectedRockPushRewards(
              encounter,
              validatedCollectedRockPushRewardIds,
            )
          : []
      const lostCollectedFieldObservationRewards =
        encounter.gameType === 'field-observation' &&
        !actualSuccess &&
        collectedFieldObservationRewards.length > 0 &&
        Math.random() < 0.3 &&
        !shouldProtectFieldObservationRewards({
          ability: activeAbility,
          ...abilityContext,
          surveyFocus: normalizeSurveyFocus(
            state.fieldObservationPrivate?.surveyFocus,
          ),
        })
      if (lostCollectedFieldObservationRewards) {
        completionMessage =
          'Feeling dejected, you forgot to pack your gathered items.'
      }
      const abilityCompletionRewards = getResearchCompletionRewards({
        ability: activeAbility,
        ...abilityContext,
        trigger: 'complete',
        surveyFocus: normalizeSurveyFocus(
          state.fieldObservationPrivate?.surveyFocus,
        ),
      })

      // Handle rewards
      if (isEndlessMode && normalizedFinalScore !== null) {
        // Calculate milestone rewards based on final score
        const endlessSettings = (encounter as any).settings.endless || {}
        const milestones = endlessSettings.milestones || []
        const repeatingRewards = endlessSettings.repeatingRewards || []
        const achievedMilestones = getAchievedUnclaimedMilestones(
          milestones,
          normalizedFinalScore,
          state.claimedMilestones,
        )
        const earnedRepeatingRewards = getEarnedRepeatingRewards(
          repeatingRewards,
          normalizedFinalScore,
        )
        const earnedRandomRepeatingRewards = getEarnedRandomRepeatingRewards({
          repeatingRewards,
          finalScore: normalizedFinalScore,
          collectedRewards: validatedCollectedEndlessRewards,
        })

        if (
          achievedMilestones.length > 0 ||
          earnedRepeatingRewards.length > 0 ||
          earnedRandomRepeatingRewards.length > 0 ||
          (isEndlessWin && encounter.skillXp)
        ) {
          const allRewards: Reward[] = [
            ...achievedMilestones.flatMap((m: any) => m.rewards || []),
            ...earnedRepeatingRewards,
            ...earnedRandomRepeatingRewards,
            ...abilityCompletionRewards,
          ]
          if (isEndlessWin) {
            const skillXpReward = buildGeneratedResearchSkillXpReward(
              encounter,
              encounter.skillXp?.level || 1,
              1,
              1,
              researchSkillXpMultiplier,
            )
            if (skillXpReward) allRewards.push(skillXpReward)
          }
          if (allRewards.length > 0) {
            const { summary } = await grantRewards(user.id, allRewards, {
              requirementContext: rewardRequirementContext,
            })
            rewardSummary = summary
          }
        }
      } else if (
        actualSuccess ||
        encounter.gameType === 'slots' ||
        encounter.gameType === 'pachinko'
      ) {
        // Normal mode rewards
        if (encounter.gameType === 'slots') {
          // Return accumulated rewards + total cost
          rewardSummary = state.slotsSession?.totalRewards || {}
          const cost = encounter.settings.cost
          if (cost && state.slotsSession?.totalCost) {
            rewardSummary.currency = rewardSummary.currency || []
            rewardSummary.currency.push({
              type: cost.currencyType,
              quantity: -state.slotsSession.totalCost,
              label: 'Total Spent',
            })
          }
        } else if (encounter.gameType === 'pachinko') {
          rewardSummary = state.pachinkoSession?.totalRewards || {}
          const cost = encounter.settings.cost
          if (cost && state.pachinkoSession?.totalCost) {
            rewardSummary.currency = rewardSummary.currency || []
            rewardSummary.currency.push({
              type: cost.currencyType,
              quantity: -state.pachinkoSession.totalCost,
              label: 'Total Spent',
            })
          }
        } else if (encounter.gameType === 'field-observation') {
          const rewardsToGrant: Reward[] = [
            ...(encounter.rewards || []),
            ...abilityCompletionRewards,
          ]
          const researchingLevel = (user.skills as any)?.researching?.level || 1
          const rewardSubjects =
            state.fieldObservationPrivate?.rewardSubjects || []
          const skillXpLevel = getFieldObservationSkillXpLevel(
            rewardSubjects,
            (encounter.settings as any).levelRange,
          )
          const skillXpReward = buildGeneratedResearchSkillXpReward(
            encounter,
            skillXpLevel,
            1,
            getFieldObservationBaseExperienceXpModifier(rewardSubjects),
            getFieldObservationCollectedItemXpModifier(
              collectedFieldObservationRewards.length,
            ) *
              researchSkillXpMultiplier *
              fieldObservationResearchXpMultiplier,
          )
          if (skillXpReward) rewardsToGrant.push(skillXpReward)

          for (const subject of rewardSubjects) {
            if (shouldAwardFieldObservationResearchXp()) {
              rewardsToGrant.push({
                type: 'pokemon_research_xp',
                targetId: subject.formId,
                quantity: Math.max(
                  1,
                  Math.round(
                    getFieldObservationResearchXpAmount(researchingLevel) *
                      fieldObservationResearchXpMultiplier,
                  ),
                ),
                dropChance: 100,
              })
            }
          }
          rewardsToGrant.push(...collectedFieldObservationRewards)

          const { summary } = await grantRewards(user.id, rewardsToGrant, {
            requirementContext: rewardRequirementContext,
          })
          const egg = await maybeCreateFieldObservationEgg(
            payload as any,
            user,
            validatedEncounterId,
          )
          if (egg) {
            summary.eggs = [{ id: egg.id, hatchAt: egg.hatchAt }]
          }
          rewardSummary = summary
        } else if (
          (encounter.rewards && encounter.rewards.length > 0) ||
          encounter.skillXp ||
          collectedRockPushRewards.length > 0
        ) {
          const rewardsToGrant: Reward[] = [
            ...(encounter.rewards || []),
            ...abilityCompletionRewards,
          ]
          rewardsToGrant.push(...collectedRockPushRewards)
          const skillXpReward = buildGeneratedResearchSkillXpReward(
            encounter,
            encounter.skillXp?.level || 1,
            1,
            1,
            researchSkillXpMultiplier,
          )
          if (skillXpReward) rewardsToGrant.push(skillXpReward)
          const { summary } = await grantRewards(user.id, rewardsToGrant, {
            requirementContext: rewardRequirementContext,
          })
          rewardSummary = summary
        }
      } else if (state.history.length > 0) {
        if (encounter.gameType === 'field-observation') {
          const rewardsToGrant: Reward[] = []
          const rewardSubjects =
            state.fieldObservationPrivate?.rewardSubjects || []
          const skillXpLevel = getFieldObservationSkillXpLevel(
            rewardSubjects,
            (encounter.settings as any).levelRange,
          )
          const skillXpReward = buildGeneratedResearchSkillXpReward(
            encounter,
            skillXpLevel,
            0.4,
            getFieldObservationBaseExperienceXpModifier(rewardSubjects),
            getFieldObservationCollectedItemXpModifier(
              collectedFieldObservationRewards.length,
            ) *
              researchSkillXpMultiplier *
              fieldObservationResearchXpMultiplier,
          )
          if (skillXpReward) {
            rewardsToGrant.push(skillXpReward)
          }
          if (!lostCollectedFieldObservationRewards) {
            rewardsToGrant.push(...collectedFieldObservationRewards)
          }
          if (rewardsToGrant.length > 0) {
            const { summary } = await grantRewards(user.id, rewardsToGrant, {
              requirementContext: rewardRequirementContext,
            })
            rewardSummary = summary
          }
        } else if (encounter.skillXp) {
          const skillXpReward = buildGeneratedResearchSkillXpReward(
            encounter,
            encounter.skillXp.level,
            0.4,
            1,
            researchSkillXpMultiplier,
          )
          if (skillXpReward) {
            const { summary } = await grantRewards(user.id, [skillXpReward], {
              requirementContext: rewardRequirementContext,
            })
            rewardSummary = summary
          }
        }
      } else if (
        encounter.gameType === 'field-observation' &&
        collectedFieldObservationRewards.length > 0 &&
        !lostCollectedFieldObservationRewards
      ) {
        const { summary } = await grantRewards(
          user.id,
          collectedFieldObservationRewards,
          { requirementContext: rewardRequirementContext },
        )
        rewardSummary = summary
      }

      const expeditionResult = await recordExpeditionActivityResult(
        user.id,
        'research',
        validatedEncounterId,
        actualSuccess || isEndlessWin,
      )

      const summaryWithExpedition = {
        ...(rewardSummary || {
          xp: {},
          items: [],
          pokemon: [],
          currency: [],
          cards: [],
        }),
        expeditionProgress: expeditionResult.expedition,
      }

      const response: ResearchCompletionResult = {
        success: true,
        summary: summaryWithExpedition,
        expeditionProgress: expeditionResult.expedition,
        message: completionMessage,
        finalScore:
          encounter.gameType === 'art-academy'
            ? normalizedFinalScore || undefined
            : undefined,
      }
      await setIdempotentResult(resultKey, response, 300)
      await redis.set(
        `research:complete-last-start:${user.id}:${validatedEncounterId}`,
        state.startTime,
        {
          ex: 300,
        },
      )

      await redis.del(`research:${user.id}`)

      return response
    } finally {
      await releaseActionLock(completionLock)
    }
  } catch (error) {
    console.error('Error completing research encounter:', error)
    return { success: false, error: 'Internal server error' }
  }
}

export async function getResearchState() {
  try {
    const user = await getUser()

    if (!user) return null

    const state = (await redis.get(
      `research:${user.id}`,
    )) as ResearchState | null
    if (!state) return null

    const encounter = allGames.find((e) => e.id === state.encounterId)
    if (!encounter) return null

    const timeLimit = getResearchSessionTimeLimit(encounter)
    const gameEndTime = state.startTime + timeLimit * 1000
    const timeLeft = Math.max(0, Math.floor((gameEndTime - Date.now()) / 1000))

    const isEligibleForReplay = await isActivityEligibleForReplay(
      user as User,
      encounter,
      'research',
    )

    return {
      ...sanitizeResearchState(state),
      timeLeft,
      encounter: {
        ...encounter,
        isEligibleForReplay,
      },
    }
  } catch (err) {
    console.error('Error getting research state:', err)
    return null
  }
}

export async function claimEndlessMilestone(
  encounterId: string,
  score: number,
) {
  try {
    const user = await getUser()
    if (!user) {
      return { success: false, error: 'Not authenticated' }
    }

    const encounterInput = validateResearchEncounterId(encounterId)
    if (!encounterInput.success) {
      return { success: false, error: encounterInput.error }
    }
    const validatedEncounterId = encounterInput.value as string

    const normalizedScore = normalizeFinalScore(score)
    if (normalizedScore === null) {
      return { success: false, error: 'Invalid score' }
    }

    const rateLimit = await checkActionRateLimit(
      user.id,
      `endless-claim:${validatedEncounterId}`,
      30,
      60,
    )
    if (!rateLimit.allowed) {
      return {
        success: false,
        error: 'Too many claim attempts. Please wait a moment.',
      }
    }

    // Get current state before idempotency so claims are scoped to a specific run.
    const state = (await redis.get(
      `research:${user.id}`,
    )) as ResearchState | null
    if (!state || state.encounterId !== validatedEncounterId) {
      return { success: false, error: 'No active session' }
    }

    const idempotentResultKey = `research:endless:claim-result:${user.id}:${validatedEncounterId}:${state.startTime}:${normalizedScore}`
    const cachedResult = await getIdempotentResult<any>(idempotentResultKey)
    if (cachedResult) {
      return cachedResult
    }

    const claimLock = await acquireActionLock(
      `lock:endless:claim:${user.id}:${validatedEncounterId}:${state.startTime}:${normalizedScore}`,
      12,
    )
    if (!claimLock.acquired) {
      return { success: false, error: 'Milestone claim already in progress' }
    }

    try {
      const cachedResultAfterLock =
        await getIdempotentResult<any>(idempotentResultKey)
      if (cachedResultAfterLock) {
        return cachedResultAfterLock
      }

      // Get encounter config
      const encounter = allGames.find((e) => e.id === validatedEncounterId)
      if (!encounter) {
        return { success: false, error: 'Invalid encounter' }
      }

      const endlessEncounter = encounter as any

      // Check if endless mode is enabled
      if (!endlessEncounter.settings.endless?.enabled) {
        return { success: false, error: 'Not an endless mode game' }
      }

      // Find the milestone
      const milestone = endlessEncounter.settings.endless.milestones.find(
        (m: any) => m.score === normalizedScore,
      )
      if (!milestone) {
        return { success: false, error: 'Invalid milestone' }
      }

      // Check if already claimed
      const claimedMilestones = state.claimedMilestones || []
      if (claimedMilestones.includes(normalizedScore)) {
        return { success: false, error: 'Milestone already claimed' }
      }

      // Anti-cheat: Validate score is achievable
      const elapsedTime = (Date.now() - state.startTime) / 1000 // seconds
      const maxPossibleScore = getMaxAllowedEndlessScore(
        encounter.gameType,
        endlessEncounter.settings,
        elapsedTime,
      )

      if (maxPossibleScore !== null && normalizedScore > maxPossibleScore) {
        if (process.env.NODE_ENV === 'development') {
          console.warn(
            `User ${user.id} attempted to cheat in endless mode ${validatedEncounterId}: ` +
              `claimed milestone ${normalizedScore} in ${elapsedTime.toFixed(2)}s ` +
              `(max possible: ${maxPossibleScore.toFixed(0)})`,
          )
        }
        return { success: false, error: 'Invalid score' }
      }

      // Grant rewards
      const { summary } = await grantRewards(user.id, milestone.rewards, {
        requirementContext: {
          category: encounter.category,
          subCategory: encounter.subCategory,
          weather: state.weather?.weather,
        },
      })

      // Update state with claimed milestone
      const updatedState: ResearchState = {
        ...state,
        claimedMilestones: [...claimedMilestones, normalizedScore],
      }
      await redis.set(`research:${user.id}`, updatedState, { ex: 3600 })

      const response = {
        success: true,
        rewards: summary,
        summary,
      }

      await setIdempotentResult(idempotentResultKey, response, 600)

      return response
    } finally {
      await releaseActionLock(claimLock)
    }
  } catch (err) {
    console.error('Error claiming endless milestone:', err)
    return { success: false, error: 'Server error' }
  }
}
