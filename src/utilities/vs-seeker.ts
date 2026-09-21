import type { BattleConfig, BattleEnemy } from '@/data/types'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import pokemonData from '@/data/pokemon-data'
import { items } from '@/data/items'
import {
  buildTrainerDisplayName,
  getVsSeekerTrainerClasses,
  vsSeekerTrainerNames,
  type TrainerClassId,
} from '@/data/trainers'
import { getCandyIdForLevel } from '@/utilities/rewards/candy-logic'
import { getPokemonLevelCap } from '@/utilities/pokemon/experience'

export const VS_SEEKER_COOLDOWN_MS = 30 * 60 * 1000
export const VS_SEEKER_BACKGROUND = '/backgrounds/battle.avif'
export const VS_SEEKER_HELD_BERRY_CHANCE = 0.3
export const VS_SEEKER_TRAINER_HEALING_ITEM_CHANCE = 0.5
export const VS_SEEKER_TRAINER_POTION_CHANCE = VS_SEEKER_TRAINER_HEALING_ITEM_CHANCE
export const VS_SEEKER_MIN_LEVEL = 20
export const VS_SEEKER_LEVEL_STEP = 5
export const VS_SEEKER_BASE_POKEDOLLAR_REWARD = 350
export const VS_SEEKER_POKEDOLLAR_PER_LEVEL_STEP = 150
export const VS_SEEKER_LEAGUE_TICKET_REWARD = 1
export const VS_SEEKER_CANDY_DUST_REWARD = 5
export const VS_SEEKER_MIN_DIFFICULTY = 1
export const VS_SEEKER_MAX_DIFFICULTY = 5

export const VS_SEEKER_BADGE_LEVELS = [
  { badgeId: 'badge-kanto-boulder', level: 15 },
  { badgeId: 'badge-kanto-cascade', level: 20 },
  { badgeId: 'badge-kanto-thunder', level: 25 },
  { badgeId: 'badge-kanto-rainbow', level: 30 },
  { badgeId: 'badge-kanto-soul', level: 40 },
  { badgeId: 'badge-kanto-marsh', level: 45 },
  { badgeId: 'badge-kanto-volcano', level: 50 },
  { badgeId: 'badge-kanto-earth', level: 50 },
] as const

const VS_SEEKER_BADGE_IDS = VS_SEEKER_BADGE_LEVELS.map((badge) => badge.badgeId)

const VS_SEEKER_TRAINER_HEALING_ITEMS = [
  { itemId: 'battle-potion', minBadges: 0 },
  { itemId: 'battle-super-potion', minBadges: 4 },
  { itemId: 'battle-hyper-potion', minBadges: 6 },
  { itemId: 'battle-full-restore', minBadges: 8 },
] as const

const VS_SEEKER_TRAINER_CLASSES = getVsSeekerTrainerClasses()

type PokedexData = Record<string, Record<string, { seen?: boolean }>>

type SeenPokemonOption = {
  speciesId: number
  formId: string
}

const restrictedSpeciesIds = new Set(
  pokemonData
    .filter((species) => species.is_legendary || species.is_mythical)
    .map((species) => species.id),
)

const vsSeekerHeldBerryIds = items
  .filter((item) => item.category === 'berry' && item.heldConfig)
  .map((item) => item.id)

function pickRandom<T>(items: T[], rng: () => number): T {
  return items[Math.floor(rng() * items.length)]
}

function getPokemonBaseStatTotal(option: SeenPokemonOption): number {
  const form = getPokemonForm(option.formId)
  if (!form?.stats) return 0

  return Object.values(form.stats).reduce(
    (total, value) => total + (Number.isFinite(value) ? value : 0),
    0,
  )
}

function pickDifficultyWeightedUnique(
  items: SeenPokemonOption[],
  count: number,
  difficulty: number,
  rng: () => number,
): SeenPokemonOption[] {
  const pool = [...items]
  const picks: SeenPokemonOption[] = []
  const exponent = 0.35 + (difficulty - VS_SEEKER_MIN_DIFFICULTY) * 0.7

  while (pool.length > 0 && picks.length < count) {
    const weights = pool.map((option) => {
      const normalizedBaseStatTotal = Math.max(
        0.1,
        getPokemonBaseStatTotal(option) / 600,
      )
      return normalizedBaseStatTotal ** exponent
    })
    const totalWeight = weights.reduce((total, weight) => total + weight, 0)
    let roll = rng() * totalWeight
    let selectedIndex = pool.length - 1

    for (let index = 0; index < weights.length; index += 1) {
      roll -= weights[index]
      if (roll <= 0) {
        selectedIndex = index
        break
      }
    }

    picks.push(pool.splice(selectedIndex, 1)[0])
  }

  return picks
}

export function getVsSeekerTrainerLevel(
  inventory: Record<string, number>,
): number {
  return getPokemonLevelCap(inventory)
}

export function getVsSeekerLevelOptions(
  inventory: Record<string, number>,
): number[] {
  const levelCap = getVsSeekerTrainerLevel(inventory)
  const options: number[] = []

  for (
    let level = VS_SEEKER_MIN_LEVEL;
    level <= levelCap;
    level += VS_SEEKER_LEVEL_STEP
  ) {
    options.push(level)
  }

  return options
}

export function isVsSeekerLevelAllowed(
  level: number,
  inventory: Record<string, number>,
): boolean {
  return getVsSeekerLevelOptions(inventory).includes(level)
}

export function getVsSeekerDifficultyOptions(): number[] {
  return Array.from(
    {
      length: VS_SEEKER_MAX_DIFFICULTY - VS_SEEKER_MIN_DIFFICULTY + 1,
    },
    (_, index) => VS_SEEKER_MIN_DIFFICULTY + index,
  )
}

export function isVsSeekerDifficultyAllowed(difficulty: number): boolean {
  return (
    Number.isInteger(difficulty) &&
    difficulty >= VS_SEEKER_MIN_DIFFICULTY &&
    difficulty <= VS_SEEKER_MAX_DIFFICULTY
  )
}

export function getVsSeekerDifficultyMultiplier(difficulty = 1): number {
  const normalizedDifficulty = Math.min(
    VS_SEEKER_MAX_DIFFICULTY,
    Math.max(
      VS_SEEKER_MIN_DIFFICULTY,
      Math.floor(
        Number.isFinite(difficulty) ? difficulty : VS_SEEKER_MIN_DIFFICULTY,
      ),
    ),
  )

  return 1 + (normalizedDifficulty - 1) * 0.5
}

export function getVsSeekerLeagueTicketReward(difficulty = 1): number {
  const normalizedDifficulty = Math.min(
    VS_SEEKER_MAX_DIFFICULTY,
    Math.max(
      VS_SEEKER_MIN_DIFFICULTY,
      Math.floor(
        Number.isFinite(difficulty) ? difficulty : VS_SEEKER_MIN_DIFFICULTY,
      ),
    ),
  )

  return (
    VS_SEEKER_LEAGUE_TICKET_REWARD +
    normalizedDifficulty -
    VS_SEEKER_MIN_DIFFICULTY
  )
}

export function getVsSeekerBadgeCount(
  inventory: Record<string, number>,
): number {
  return VS_SEEKER_BADGE_IDS.filter((badgeId) => (inventory[badgeId] || 0) > 0)
    .length
}

export function getVsSeekerAiProfile(
  inventory: Record<string, number>,
): 'trainer' | 'advanced' {
  return getVsSeekerBadgeCount(inventory) >= VS_SEEKER_BADGE_LEVELS.length
    ? 'advanced'
    : 'trainer'
}

export function getVsSeekerTrainerHealingItemId(params: {
  inventory: Record<string, number>
  rng?: () => number
}): string | null {
  const rng = params.rng || Math.random
  if (rng() >= VS_SEEKER_TRAINER_HEALING_ITEM_CHANCE) return null

  const badgeCount = getVsSeekerBadgeCount(params.inventory)
  const itemPool = VS_SEEKER_TRAINER_HEALING_ITEMS.filter(
    (item) => badgeCount >= item.minBadges,
  )

  return pickRandom([...itemPool], rng).itemId
}

export function hasVsSeeker(inventory: Record<string, number>): boolean {
  return (inventory['vs-seeker'] || 0) > 0
}

export function getVsSeekerPayout(level: number, difficulty = 1): number {
  const normalizedLevel = Math.max(
    VS_SEEKER_MIN_LEVEL,
    Math.floor(Number.isFinite(level) ? level : VS_SEEKER_MIN_LEVEL),
  )
  const levelSteps = Math.floor(
    (normalizedLevel - VS_SEEKER_MIN_LEVEL) / VS_SEEKER_LEVEL_STEP,
  )

  return Math.floor(
    (VS_SEEKER_BASE_POKEDOLLAR_REWARD +
      levelSteps * VS_SEEKER_POKEDOLLAR_PER_LEVEL_STEP) *
      getVsSeekerDifficultyMultiplier(difficulty),
  )
}

export function getVsSeekerCandyRewards(level: number) {
  return [
    {
      type: 'item' as const,
      targetId: getCandyIdForLevel(level),
      quantity: 1,
      dropChance: 100,
    },
    {
      type: 'item' as const,
      targetId: 'candy-dust',
      quantity: VS_SEEKER_CANDY_DUST_REWARD,
      dropChance: 100,
    },
  ]
}

export function getVsSeekerCurrencyRewards(
  level = VS_SEEKER_MIN_LEVEL,
  difficulty = VS_SEEKER_MIN_DIFFICULTY,
) {
  return [
    {
      type: 'currency' as const,
      targetId: 'pokedollars',
      quantity: getVsSeekerPayout(level, difficulty),
      dropChance: 100,
    },
    {
      type: 'currency' as const,
      targetId: 'league-ticket',
      quantity: getVsSeekerLeagueTicketReward(difficulty),
      dropChance: 100,
    },
  ]
}

export function getSeenPokemonOptions(
  pokedex: PokedexData,
): SeenPokemonOption[] {
  const options: SeenPokemonOption[] = []
  const seenKeys = new Set<string>()

  for (const [speciesId, forms] of Object.entries(pokedex || {})) {
    const parsedSpeciesId = Number.parseInt(speciesId, 10)
    if (!Number.isFinite(parsedSpeciesId)) continue
    if (restrictedSpeciesIds.has(parsedSpeciesId)) continue

    for (const [formId, entry] of Object.entries(forms || {})) {
      if (!entry?.seen) continue
      if (!getPokemonForm(formId)) continue

      const key = `${parsedSpeciesId}:${formId}`
      if (seenKeys.has(key)) continue
      seenKeys.add(key)
      options.push({ speciesId: parsedSpeciesId, formId })
    }
  }

  return options
}

export function buildVsSeekerBattleConfig(params: {
  pokedex: PokedexData
  inventory: Record<string, number>
  requestedLevel?: number
  requestedDifficulty?: number
  rng?: () => number
  now?: Date
}): BattleConfig | null {
  const rng = params.rng || Math.random
  const seenPokemon = getSeenPokemonOptions(params.pokedex)
  if (seenPokemon.length < 3) return null

  const levelCap = getVsSeekerTrainerLevel(params.inventory)
  const level = params.requestedLevel ?? levelCap
  if (!isVsSeekerLevelAllowed(level, params.inventory)) return null
  const difficulty =
    params.requestedDifficulty ?? VS_SEEKER_MIN_DIFFICULTY
  if (!isVsSeekerDifficultyAllowed(difficulty)) return null

  const trainerClass = pickRandom(VS_SEEKER_TRAINER_CLASSES, rng)
  const trainerName = pickRandom(vsSeekerTrainerNames[trainerClass.gender], rng)
  const pickedPokemon = pickDifficultyWeightedUnique(
    seenPokemon,
    3,
    difficulty,
    rng,
  )
  const enemyTeam: BattleEnemy[] = pickedPokemon.map((pokemon) => {
    const enemy: BattleEnemy = {
      ...pokemon,
      level,
    }

    if (
      vsSeekerHeldBerryIds.length > 0 &&
      rng() < VS_SEEKER_HELD_BERRY_CHANCE
    ) {
      enemy.heldItemId = pickRandom(vsSeekerHeldBerryIds, rng)
    }

    return enemy
  })
  const trainerHealingItemId = getVsSeekerTrainerHealingItemId({
    inventory: params.inventory,
    rng,
  })
  const trainerItems = trainerHealingItemId
      ? [
          {
            itemId: trainerHealingItemId,
            quantity: 1,
          },
        ]
      : undefined

  return {
    id: `vs-seeker-${params.now?.getTime() ?? Date.now()}`,
    trainerClassId: trainerClass.id as TrainerClassId,
    trainerName,
    name: buildTrainerDisplayName({
      trainerClassId: trainerClass.id as TrainerClassId,
      trainerName,
    }),
    title: 'VS Seeker',
    description: 'A nearby trainer answered your VS Seeker signal.',
    category: 'VS Seeker',
    subCategory: 'Trainer Rematch',
    icon: {
      type: 'trainer',
      id: trainerClass.id,
    },
    background: VS_SEEKER_BACKGROUND,
    requirements: [],
    enemyTeam,
    trainerItems,
    rewards: [
      ...getVsSeekerCurrencyRewards(level, difficulty),
      ...getVsSeekerCandyRewards(level),
    ],
    disableLossPayout: true,
    disableCandyRewards: true,
    maxPokemon: 3,
    levelCap: level,
    enemyDifficulty: difficulty,
    allowSwapping: true,
    aiProfile: getVsSeekerAiProfile(params.inventory),
  }
}

export function getVsSeekerCooldownRemaining(
  lastUsedAt: string | number | Date | undefined,
  now: number = Date.now(),
): number {
  if (!lastUsedAt) return 0
  const lastUsedTime = new Date(lastUsedAt).getTime()
  if (!Number.isFinite(lastUsedTime)) return 0
  return Math.max(0, VS_SEEKER_COOLDOWN_MS - (now - lastUsedTime))
}

export function formatVsSeekerCooldown(ms: number): string {
  const totalMinutes = Math.ceil(ms / 60000)
  const minutes = totalMinutes % 60
  const hours = Math.floor(totalMinutes / 60)

  if (hours <= 0) return `${minutes}m`
  if (minutes === 0) return `${hours}h`
  return `${hours}h ${minutes}m`
}
