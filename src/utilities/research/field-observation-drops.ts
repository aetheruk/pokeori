import { items } from '@/data/items'
import pokemonData from '@/data/pokemon-data'
import type { Reward } from '@/data/types'
import {
  buildBrokenBallRewards,
  buildFieldObservationMaterialRewards,
  getFieldObservationPrimaryMaterialLimit,
} from '@/utilities/artisan/material-drops'
import {
  buildFieldObservationBerryRewards,
  buildFieldObservationMintRewards,
  FIELD_OBSERVATION_NUTS,
} from '@/utilities/research/berry-drops'
import type { FieldObservationGlobalItemEvent } from '@/data/games/field-observation/types'
import type {
  FieldObservationCollectibleKind,
  FieldObservationPrivateCollectibleDrop,
  FieldObservationPublicCollectibleDrop,
  FieldObservationRewardSubject,
  FieldObservationSpawn,
  FieldObservationSurveyFocus,
} from '@/utilities/research/field-observation'

type RandomFn = () => number

export interface FieldObservationCollectibleModifier {
  dropChanceMultiplier?: number
  quantityBonus?: number
  durationMultiplier?: number
}

export function buildFieldObservationCollectibleDrops({
  rewardSubjects,
  spawns,
  researchingLevel,
  surveyFocus,
  observationDurationMs,
  globalItemEvents = [],
  collectibleModifiers = [],
  random = Math.random,
}: {
  rewardSubjects: FieldObservationRewardSubject[]
  spawns: FieldObservationSpawn[]
  researchingLevel: number
  surveyFocus: FieldObservationSurveyFocus
  observationDurationMs: number
  globalItemEvents?: FieldObservationGlobalItemEvent[]
  collectibleModifiers?: FieldObservationCollectibleModifier[]
  random?: RandomFn
}): FieldObservationPrivateCollectibleDrop[] {
  if (
    (rewardSubjects.length === 0 && globalItemEvents.length === 0) ||
    observationDurationMs <= 0
  )
    return []

  const materialRewardContexts = rewardSubjects.map((subject) => {
    const species = (pokemonData as any[]).find(
      (entry) => entry.id === subject.speciesId,
    )
    const form =
      species?.forms?.find((entry: any) => entry.id === subject.formId) ||
      species?.forms?.find((entry: any) => entry.form === 'base') ||
      species?.forms?.[0]

    return {
      speciesId: subject.speciesId,
      formId: subject.formId,
      level: subject.level,
      types: (form?.types || []) as string[],
      researchingLevel,
    }
  })

  const materialLimit =
    getFieldObservationPrimaryMaterialLimit(researchingLevel)
  const materialRewards = resolveDropChances(
    buildFieldObservationMaterialRewards(materialRewardContexts, materialLimit),
    random,
    (surveyFocus === 'material-survey'
      ? 1.25
      : surveyFocus === 'swarm-survey'
        ? 1.1
        : 1) * getDropChanceMultiplier(collectibleModifiers),
  )
  const berryRewards = buildFieldObservationBerryRewards(
    rewardSubjects,
    pokemonData as any[],
    researchingLevel,
  )
  const focusedBerryRewards =
    surveyFocus === 'berry-survey' && berryRewards.length > 0
      ? [
          ...berryRewards,
          berryRewards[Math.floor(random() * berryRewards.length)],
        ]
      : berryRewards
  const mintRewards = buildFieldObservationMintRewards(
    rewardSubjects,
    pokemonData as any[],
    researchingLevel,
    random,
  )
  const highestSubjectLevel = Math.max(
    1,
    ...rewardSubjects.map((subject) => subject.level || 1),
  )
  const brokenBallRewards = resolveDropChances(
    buildBrokenBallRewards(
      { level: highestSubjectLevel, researchingLevel },
      'field-observation',
    ),
    random,
    (surveyFocus === 'salvage-survey'
      ? 1.75
      : surveyFocus === 'swarm-survey'
        ? 1.2
        : 1) * getDropChanceMultiplier(collectibleModifiers),
  )

  const nutPool = new Set<string>(FIELD_OBSERVATION_NUTS)
  const rewardsWithKinds: {
    reward: Reward
    kind: FieldObservationCollectibleKind
  }[] = [
    ...materialRewards.map((reward) => ({ reward, kind: 'material' as const })),
    ...focusedBerryRewards.map((reward) => ({
      reward,
      kind: nutPool.has(String(reward.targetId))
        ? ('nut' as const)
        : ('berry' as const),
    })),
    ...mintRewards.map((reward) => ({
      reward,
      kind: 'item' as const,
    })),
    ...brokenBallRewards.map((reward) => ({
      reward,
      kind: 'broken-ball' as const,
    })),
    ...globalItemEvents.map((event) => ({
      reward: {
        type: 'item' as const,
        targetId: event.itemId,
        quantity: event.quantity || 1,
        dropChance: 100,
        secret: event.secret,
      },
      kind: 'item' as const,
    })),
  ].filter(
    ({ reward }) =>
      reward.type === 'item' && typeof reward.targetId === 'string',
  )

  const maxDrops = surveyFocus === 'swarm-survey' ? 8 : 6
  const guaranteedRewards = rewardsWithKinds.filter(({ reward }) =>
    isGuaranteedReward(reward),
  )
  const normalRewards = rewardsWithKinds.filter(
    ({ reward }) => !isGuaranteedReward(reward),
  )
  const selectedRewards = [
    ...guaranteedRewards,
    ...normalRewards.slice(0, Math.max(0, maxDrops - guaranteedRewards.length)),
  ]
  const durationMultiplier = getDurationMultiplier(collectibleModifiers)

  return selectedRewards.map(({ reward, kind }, index) =>
    scheduleCollectibleDrop({
      reward: { ...applyQuantityBonus(reward, collectibleModifiers), dropChance: 100 },
      kind,
      index,
      spawns,
      observationDurationMs,
      durationMultiplier,
      random,
    }),
  )
}

export function toPublicFieldObservationCollectibleDrop(
  drop: FieldObservationPrivateCollectibleDrop,
): FieldObservationPublicCollectibleDrop {
  return {
    id: drop.id,
    itemId: drop.itemId,
    label: drop.label,
    kind: drop.kind,
    startMs: drop.startMs,
    durationMs: drop.durationMs,
    x: drop.x,
    y: drop.y,
  }
}

function resolveDropChances(
  rewards: Reward[],
  random: RandomFn,
  multiplier: number,
) {
  return rewards.filter((reward) => {
    if (isGuaranteedReward(reward)) return true
    const dropChance = Math.min(100, (reward.dropChance ?? 100) * multiplier)
    return random() * 100 <= dropChance
  })
}

function getDropChanceMultiplier(modifiers: FieldObservationCollectibleModifier[]) {
  return modifiers.reduce((total, modifier) => total * (modifier.dropChanceMultiplier ?? 1), 1)
}

function getDurationMultiplier(modifiers: FieldObservationCollectibleModifier[]) {
  return modifiers.reduce((total, modifier) => total * (modifier.durationMultiplier ?? 1), 1)
}

function applyQuantityBonus(
  reward: Reward,
  modifiers: FieldObservationCollectibleModifier[],
): Reward {
  const quantityBonus = Math.floor(
    modifiers.reduce((total, modifier) => total + (modifier.quantityBonus ?? 0), 0),
  )
  if (quantityBonus <= 0) return reward
  const quantity = (reward as Reward & { quantity?: unknown }).quantity
  if (typeof quantity === 'number') {
    return { ...reward, quantity: quantity + quantityBonus }
  }
  if (
    quantity &&
    typeof quantity === 'object' &&
    typeof (quantity as { min?: unknown }).min === 'number' &&
    typeof (quantity as { max?: unknown }).max === 'number'
  ) {
    const range = quantity as { min: number; max: number }
    return {
      ...reward,
      quantity: {
        min: range.min + quantityBonus,
        max: range.max + quantityBonus,
      },
    } as Reward
  }
  return { ...reward, quantity: 1 + quantityBonus }
}

function isGuaranteedReward(reward: Reward) {
  return (reward as Reward & { guaranteed?: boolean }).guaranteed === true
}

function scheduleCollectibleDrop({
  reward,
  kind,
  index,
  spawns,
  observationDurationMs,
  durationMultiplier,
  random,
}: {
  reward: Reward
  kind: FieldObservationCollectibleKind
  index: number
  spawns: FieldObservationSpawn[]
  observationDurationMs: number
  durationMultiplier: number
  random: RandomFn
}): FieldObservationPrivateCollectibleDrop {
  const itemId = String(reward.targetId)
  const sourceSpawn = pickSourceSpawn(itemId, spawns, random)
  const durationMs = Math.round(randomRange(1700, 2600, random) * durationMultiplier)
  const latestStart = Math.max(0, observationDurationMs - durationMs - 800)
  const startMs = sourceSpawn
    ? clampInteger(
        Math.round(
          sourceSpawn.startMs +
            sourceSpawn.durationMs * randomRange(0.2, 0.75, random),
        ),
        300,
        latestStart,
      )
    : Math.round(randomRange(500, latestStart, random))

  return {
    id: `drop-${index}-${itemId}`,
    itemId,
    label: getItemName(itemId),
    kind,
    startMs,
    durationMs,
    x: sourceSpawn
      ? clampInteger(
          Math.round(sourceSpawn.x + randomRange(-9, 9, random)),
          8,
          92,
        )
      : Math.round(randomRange(10, 90, random)),
    y: sourceSpawn
      ? clampInteger(
          Math.round(sourceSpawn.y + randomRange(8, 18, random)),
          12,
          82,
        )
      : Math.round(randomRange(16, 78, random)),
    reward,
  }
}

function pickSourceSpawn(
  itemId: string,
  spawns: FieldObservationSpawn[],
  random: RandomFn,
) {
  if (spawns.length === 0) return null
  const matching = spawns.filter((spawn) =>
    itemId.includes(getPrimaryType(spawn.speciesId)),
  )
  const pool = matching.length > 0 ? matching : spawns
  return pool[Math.floor(random() * pool.length)] || null
}

function getPrimaryType(speciesId: number) {
  const species = (pokemonData as any[]).find((entry) => entry.id === speciesId)
  return String(species?.types?.[0] || '').toLowerCase()
}

function getItemName(itemId: string) {
  return items.find((item) => item.id === itemId)?.name || itemId
}

function randomRange(min: number, max: number, random: RandomFn) {
  return min + (max - min) * random()
}

function clampInteger(value: number, min: number, max: number) {
  if (max < min) return min
  return Math.max(min, Math.min(max, value))
}
