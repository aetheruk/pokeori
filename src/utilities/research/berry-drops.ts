import type { Reward } from '@/utilities/rewards/reward-logic'
import type { FieldObservationRewardSubject } from './field-observation'

export const FIELD_OBSERVATION_NUT_UNLOCKS = [
  { itemId: 'nut-red', level: 1 },
  { itemId: 'nut-purple', level: 5 },
  { itemId: 'razz-berry', level: 14 },
  { itemId: 'nut-green', level: 15 },
  { itemId: 'nut-blue', level: 21 },
  { itemId: 'nut-yellow', level: 28 },
  { itemId: 'nut-white', level: 40 },
  { itemId: 'nut-black', level: 40 },
] as const

export const FIELD_OBSERVATION_HEALING_BERRY_UNLOCKS = [
  { itemId: 'oran-berry', level: 16 },
  { itemId: 'cheri-berry', level: 16 },
  { itemId: 'chesto-berry', level: 16 },
  { itemId: 'pecha-berry', level: 16 },
  { itemId: 'rawst-berry', level: 16 },
  { itemId: 'aspear-berry', level: 16 },
  { itemId: 'persim-berry', level: 16 },
  { itemId: 'sitrus-berry', level: 38 },
  { itemId: 'lum-berry', level: 38 },
  { itemId: 'pomeg-berry', level: 42 },
  { itemId: 'kelpsy-berry', level: 42 },
  { itemId: 'qualot-berry', level: 42 },
  { itemId: 'hondew-berry', level: 42 },
  { itemId: 'grepa-berry', level: 42 },
  { itemId: 'tamato-berry', level: 42 },
] as const

export const FIELD_OBSERVATION_NUTS = FIELD_OBSERVATION_NUT_UNLOCKS.map(
  (unlock) => unlock.itemId,
)

export const FIELD_OBSERVATION_MINT_UNLOCK_LEVEL = 55
export const FIELD_OBSERVATION_MINT_DROP_CHANCE = 3

export const FIELD_OBSERVATION_MINT_UNLOCKS = [
  { itemId: 'adamant-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'bold-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'brave-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'calm-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'careful-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'gentle-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'hasty-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'impish-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'jolly-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'lax-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'lonely-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'mild-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'modest-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'naive-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'naughty-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'quiet-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'rash-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'relaxed-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'sassy-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'serious-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
  { itemId: 'timid-mint', level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL },
] as const

export const FIELD_OBSERVATION_MINTS = FIELD_OBSERVATION_MINT_UNLOCKS.map(
  (unlock) => unlock.itemId,
)

const FIELD_OBSERVATION_STANDARD_NUT_WEIGHT = 6
const FIELD_OBSERVATION_RAZZ_BERRY_WEIGHT = 1

export function getFieldObservationNuts(researchingLevel: number): string[] {
  const safeLevel = Math.max(1, Math.floor(researchingLevel || 1))
  return FIELD_OBSERVATION_NUT_UNLOCKS.filter(
    (unlock) => safeLevel >= unlock.level,
  ).map((unlock) => unlock.itemId)
}

export function getFieldObservationNutDropWeights(
  researchingLevel: number,
): { itemId: string; weight: number }[] {
  return getFieldObservationNuts(researchingLevel).map((itemId) => ({
    itemId,
    weight:
      itemId === 'razz-berry'
        ? FIELD_OBSERVATION_RAZZ_BERRY_WEIGHT
        : FIELD_OBSERVATION_STANDARD_NUT_WEIGHT,
  }))
}

export function getFieldObservationHealingBerries(
  researchingLevel: number,
): string[] {
  const safeLevel = Math.max(1, Math.floor(researchingLevel || 1))
  return FIELD_OBSERVATION_HEALING_BERRY_UNLOCKS.filter(
    (unlock) => safeLevel >= unlock.level,
  ).map((unlock) => unlock.itemId)
}

export function getFieldObservationMints(researchingLevel: number): string[] {
  const safeLevel = Math.max(1, Math.floor(researchingLevel || 1))
  return FIELD_OBSERVATION_MINT_UNLOCKS.filter(
    (unlock) => safeLevel >= unlock.level,
  ).map((unlock) => unlock.itemId)
}

function getNutRewardCount(): number {
  const roll = Math.random()
  if (roll < 0.1) return 3
  if (roll < 0.3) return 2
  if (roll < 0.85) return 1
  return 0
}

function getHealingBerryRewardCount(researchingLevel: number): number {
  if (researchingLevel < FIELD_OBSERVATION_HEALING_BERRY_UNLOCKS[0].level)
    return 0
  return Math.random() < 0.5 ? 0 : 1
}

function pickBerries(count: number, pool: string[]): string[] {
  const uniquePool = [...pool]
  const berries: string[] = []
  while (berries.length < count && pool.length > 0) {
    const sourcePool = uniquePool.length > 0 ? uniquePool : pool
    const index = Math.floor(Math.random() * sourcePool.length)
    const [berry] =
      sourcePool === uniquePool
        ? uniquePool.splice(index, 1)
        : [sourcePool[index]]
    if (berry) berries.push(berry)
  }
  return berries
}

function pickWeightedBerries(
  count: number,
  weightedPool: { itemId: string; weight: number }[],
): string[] {
  const uniquePool = [...weightedPool]
  const berries: string[] = []

  while (berries.length < count && weightedPool.length > 0) {
    const sourcePool = uniquePool.length > 0 ? uniquePool : weightedPool
    const totalWeight = sourcePool.reduce(
      (total, entry) => total + Math.max(0, entry.weight),
      0,
    )
    let roll = Math.random() * totalWeight
    const selectedIndex = Math.max(
      0,
      sourcePool.findIndex((entry) => {
        roll -= Math.max(0, entry.weight)
        return roll < 0
      }),
    )
    const [berry] =
      sourcePool === uniquePool
        ? uniquePool.splice(selectedIndex, 1)
        : [sourcePool[selectedIndex]]
    if (berry?.itemId) berries.push(berry.itemId)
  }

  return berries
}

function pickItem(pool: string[], random = Math.random): string | null {
  if (pool.length === 0) return null
  return pool[Math.floor(random() * pool.length)] || null
}

export function buildFieldObservationBerryRewards(
  rewardSubjects: FieldObservationRewardSubject[],
  _pokemonData: any[],
  researchingLevel = 1,
): Reward[] {
  if (rewardSubjects.length === 0) return []

  const nuts = pickWeightedBerries(
    getNutRewardCount(),
    getFieldObservationNutDropWeights(researchingLevel),
  )
  const healingBerries = pickBerries(
    getHealingBerryRewardCount(researchingLevel),
    getFieldObservationHealingBerries(researchingLevel),
  )

  return [...nuts, ...healingBerries].map((berryId) => ({
    type: 'item',
    targetId: berryId,
    quantity: 1,
    dropChance: 100,
  }))
}

export function buildFieldObservationMintRewards(
  rewardSubjects: FieldObservationRewardSubject[],
  _pokemonData: any[],
  researchingLevel = 1,
  random = Math.random,
): Reward[] {
  if (rewardSubjects.length === 0) return []

  const pool = getFieldObservationMints(researchingLevel)
  if (pool.length === 0) return []
  if (random() >= FIELD_OBSERVATION_MINT_DROP_CHANCE / 100) return []

  const mintId = pickItem(pool, random)
  if (!mintId) return []

  return [
    {
      type: 'item',
      targetId: mintId,
      quantity: 1,
      dropChance: 100,
      guaranteed: true,
    },
  ]
}
