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
] as const

export const FIELD_OBSERVATION_EV_BERRY_UNLOCKS = [
  { itemId: 'pomeg-berry', level: 42 },
  { itemId: 'kelpsy-berry', level: 42 },
  { itemId: 'qualot-berry', level: 42 },
  { itemId: 'hondew-berry', level: 42 },
  { itemId: 'grepa-berry', level: 42 },
  { itemId: 'tamato-berry', level: 42 },
] as const

export const FIELD_OBSERVATION_ADDITIONAL_NUT_DROP_LEVEL = 37

export const FIELD_OBSERVATION_NUTS = FIELD_OBSERVATION_NUT_UNLOCKS.map(
  (unlock) => unlock.itemId,
)

export const FIELD_OBSERVATION_EV_BERRIES = FIELD_OBSERVATION_EV_BERRY_UNLOCKS.map(
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

export function getFieldObservationEvBerries(
  researchingLevel: number,
): string[] {
  const safeLevel = Math.max(1, Math.floor(researchingLevel || 1))
  return FIELD_OBSERVATION_EV_BERRY_UNLOCKS.filter(
    (unlock) => safeLevel >= unlock.level,
  ).map((unlock) => unlock.itemId)
}

function rollNutRewardCount(): number {
  const roll = Math.random()
  if (roll < 0.1) return 3
  if (roll < 0.3) return 2
  if (roll < 0.85) return 1
  return 0
}

function getNutRewardCount(researchingLevel: number): number {
  const baseCount = rollNutRewardCount()
  if (researchingLevel < FIELD_OBSERVATION_ADDITIONAL_NUT_DROP_LEVEL) {
    return baseCount
  }
  return baseCount + rollNutRewardCount()
}

function getHealingBerryRewardCount(researchingLevel: number): number {
  if (researchingLevel < FIELD_OBSERVATION_HEALING_BERRY_UNLOCKS[0].level)
    return 0
  return Math.random() < 0.5 ? 0 : 1
}

function getEvBerryRewardCount(researchingLevel: number): number {
  if (researchingLevel < FIELD_OBSERVATION_EV_BERRY_UNLOCKS[0].level) return 0
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

export function buildFieldObservationBerryRewards(
  rewardSubjects: FieldObservationRewardSubject[],
  _pokemonData: any[],
  researchingLevel = 1,
): Reward[] {
  if (rewardSubjects.length === 0) return []

  const nuts = pickWeightedBerries(
    getNutRewardCount(researchingLevel),
    getFieldObservationNutDropWeights(researchingLevel),
  )
  const healingBerries = pickBerries(
    getHealingBerryRewardCount(researchingLevel),
    getFieldObservationHealingBerries(researchingLevel),
  )
  const evBerries = pickBerries(
    getEvBerryRewardCount(researchingLevel),
    getFieldObservationEvBerries(researchingLevel),
  )

  return [...nuts, ...healingBerries, ...evBerries].map((berryId) => ({
    type: 'item',
    targetId: berryId,
    quantity: 1,
    dropChance: 100,
  }))
}
