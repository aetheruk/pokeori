import type { BattleConfig, BattleEnemy } from '@/data/types'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import pokemonData from '@/data/pokemon-data'
import { items } from '@/data/items'
import {
  buildTrainerDisplayName,
  getVsSeekerTrainerClasses,
  vsSeekerTrainerNames,
  type TrainerClass,
  type TrainerClassId,
} from '@/data/trainers'
import { calculateKantoTrainerPayout } from '@/data/battles/trainer-payouts'
import { getCandyIdsUpToLevel } from '@/utilities/rewards/candy-logic'

export const VS_SEEKER_COOLDOWN_MS = 30 * 60 * 1000
export const VS_SEEKER_HELD_BERRY_CHANCE = 0.3
export const VS_SEEKER_TRAINER_HEALING_ITEM_CHANCE = 0.5
export const VS_SEEKER_TRAINER_POTION_CHANCE = VS_SEEKER_TRAINER_HEALING_ITEM_CHANCE
export const VS_SEEKER_CANDY_REWARD_QUANTITY = 3
export const VS_SEEKER_POKEDOLLAR_REWARD = 1000
export const VS_SEEKER_LEAGUE_TICKET_REWARD = 1

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

function pickRandomUnique<T>(
  items: T[],
  count: number,
  rng: () => number,
): T[] {
  const pool = [...items]
  const picks: T[] = []

  while (pool.length > 0 && picks.length < count) {
    const index = Math.floor(rng() * pool.length)
    picks.push(pool.splice(index, 1)[0])
  }

  return picks
}

export function getVsSeekerTrainerLevel(
  inventory: Record<string, number>,
): number {
  return VS_SEEKER_BADGE_LEVELS.reduce((level, badgeLevel) => {
    return (inventory[badgeLevel.badgeId] || 0) > 0
      ? Math.max(level, badgeLevel.level)
      : level
  }, 10)
}

export function getVsSeekerBadgeCount(
  inventory: Record<string, number>,
): number {
  return VS_SEEKER_BADGE_IDS.filter((badgeId) => (inventory[badgeId] || 0) > 0)
    .length
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

export function getVsSeekerPayout(level: number, trainerClass: TrainerClass): number {
  return calculateKantoTrainerPayout(trainerClass.id as TrainerClassId, level)
}

export function getVsSeekerCandyRewards(level: number) {
  return getCandyIdsUpToLevel(level).map((candyId) => ({
    type: 'item' as const,
    targetId: candyId,
    quantity: VS_SEEKER_CANDY_REWARD_QUANTITY,
    dropChance: 100,
  }))
}

export function getVsSeekerCurrencyRewards() {
  return [
    {
      type: 'currency' as const,
      targetId: 'pokedollars',
      quantity: VS_SEEKER_POKEDOLLAR_REWARD,
      dropChance: 100,
    },
    {
      type: 'currency' as const,
      targetId: 'league-ticket',
      quantity: VS_SEEKER_LEAGUE_TICKET_REWARD,
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
  rng?: () => number
  now?: Date
}): BattleConfig | null {
  const rng = params.rng || Math.random
  const seenPokemon = getSeenPokemonOptions(params.pokedex)
  if (seenPokemon.length < 3) return null

  const level = getVsSeekerTrainerLevel(params.inventory)
  const trainerClass = pickRandom(VS_SEEKER_TRAINER_CLASSES, rng)
  const trainerName = pickRandom(vsSeekerTrainerNames[trainerClass.gender], rng)
  const pickedPokemon = pickRandomUnique(seenPokemon, 3, rng)
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
    background: '/backgrounds/friend-stadium.avif',
    requirements: [],
    enemyTeam,
    trainerItems,
    rewards: [
      ...getVsSeekerCurrencyRewards(),
      ...getVsSeekerCandyRewards(level),
    ],
    disableCandyRewards: true,
    maxPokemon: 3,
    levelCap: level,
    allowSwapping: true,
    aiProfile: 'advanced',
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
