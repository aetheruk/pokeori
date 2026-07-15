import type { LocationReward } from '@/data/types'

type Tier = 1 | 2 | 3

export const MATERIAL_TIER_2_LEVEL = 60
export const MATERIAL_TIER_3_LEVEL = 70
export const FIELD_OBSERVATION_PRIMARY_MATERIAL_DROP_CHANCE = 75
export const CAPTURE_PRIMARY_MATERIAL_QUANTITY_ODDS = {
  one: 100,
  two: 50,
  three: 20,
} as const
export const FIELD_OBSERVATION_PRIMARY_MATERIAL_LIMIT_UNLOCKS = [
  { level: 1, limit: 3 },
  { level: 22, limit: 4 },
  { level: 39, limit: 5 },
] as const

interface DropContext {
  speciesId: number
  formId?: string
  level: number
  types: string[]
  researchingLevel: number
}

interface MaterialRewardOptions {
  rng?: () => number
}

interface TypeMaterialConfig {
  family: string
  specialFormMaterials: Record<
    string,
    { materialId: string; dropChance: number; guaranteed?: boolean }
  >
}

export const TYPE_MATERIAL_CONFIG: Record<string, TypeMaterialConfig> = {
  normal: { family: 'soft-fluff', specialFormMaterials: {} },
  fire: {
    family: 'cinder-shard',
    specialFormMaterials: {
      '146': { materialId: 'flaming-twig', dropChance: 100, guaranteed: true },
      '244': { materialId: 'token-of-fire', dropChance: 100, guaranteed: true },
    },
  },
  water: {
    family: 'aqua-solvent',
    specialFormMaterials: {
      '245': {
        materialId: 'token-of-water',
        dropChance: 100,
        guaranteed: true,
      },
    },
  },
  electric: {
    family: 'electric-component',
    specialFormMaterials: {
      '145': { materialId: 'charged-twig', dropChance: 100, guaranteed: true },
      '243': {
        materialId: 'token-of-thunder',
        dropChance: 100,
        guaranteed: true,
      },
    },
  },
  grass: { family: 'wood-scraps', specialFormMaterials: {} },
  ice: {
    family: 'frost-crystal',
    specialFormMaterials: {
      '144': { materialId: 'frozen-twig', dropChance: 100, guaranteed: true },
    },
  },
  fighting: { family: 'grip-weave', specialFormMaterials: {} },
  poison: { family: 'toxic-resin', specialFormMaterials: {} },
  ground: { family: 'terra-dust', specialFormMaterials: {} },
  flying: { family: 'wing-feather', specialFormMaterials: {} },
  psychic: { family: 'mind-thread', specialFormMaterials: {} },
  bug: { family: 'chitin-fragment', specialFormMaterials: {} },
  rock: { family: 'small-stone', specialFormMaterials: {} },
  ghost: { family: 'spirit-wisp', specialFormMaterials: {} },
  dragon: { family: 'drake-scale', specialFormMaterials: {} },
  dark: { family: 'shadow-fiber', specialFormMaterials: {} },
  steel: { family: 'metal-scrap', specialFormMaterials: {} },
  fairy: { family: 'pixie-powder', specialFormMaterials: {} },
}

export function baseMaterialTierFromLevel(level: number): Tier {
  if (level >= MATERIAL_TIER_3_LEVEL) return 3
  if (level >= MATERIAL_TIER_2_LEVEL) return 2
  return 1
}

export function gateMaterialTierByResearcherLevel(
  tier: Tier,
  researchingLevel: number,
): Tier {
  if (researchingLevel < MATERIAL_TIER_2_LEVEL) return 1
  if (tier === 3 && researchingLevel < MATERIAL_TIER_3_LEVEL) return 2
  return tier
}

export function resolveMaterialTier(
  level: number,
  researchingLevel: number,
): Tier {
  return gateMaterialTierByResearcherLevel(
    baseMaterialTierFromLevel(level),
    researchingLevel,
  )
}

export function resolveDropMaterialTier(): Tier {
  return 1
}

export function getFieldObservationPrimaryMaterialLimit(
  researchingLevel: number,
): number {
  let limit: number = FIELD_OBSERVATION_PRIMARY_MATERIAL_LIMIT_UNLOCKS[0].limit
  for (const unlock of FIELD_OBSERVATION_PRIMARY_MATERIAL_LIMIT_UNLOCKS) {
    if (researchingLevel >= unlock.level) limit = unlock.limit
  }
  return limit
}

function familyId(family: string, tier: Tier): string {
  return `${family}-t${tier}`
}

function getTypeMaterialConfigs(types: string[]): TypeMaterialConfig[] {
  const normalizedTypes = Array.from(
    new Set(types.map((type) => type.toLowerCase())),
  )
  const configs = normalizedTypes
    .map((type) => TYPE_MATERIAL_CONFIG[type])
    .filter((config): config is TypeMaterialConfig => !!config)

  return configs.length > 0 ? configs : [TYPE_MATERIAL_CONFIG.normal]
}

function getPrimaryMaterialIds(context: DropContext, tier: Tier): string[] {
  return getTypeMaterialConfigs(context.types).map((config) =>
    familyId(config.family, tier),
  )
}

function pickRandomConfig(
  configs: TypeMaterialConfig[],
  rng: () => number,
): TypeMaterialConfig {
  const index = Math.min(Math.floor(rng() * configs.length), configs.length - 1)
  return configs[Math.max(0, index)] || TYPE_MATERIAL_CONFIG.normal
}

function resolveCapturePrimaryMaterialQuantity(rng: () => number): number {
  const roll = rng() * 100
  if (roll < CAPTURE_PRIMARY_MATERIAL_QUANTITY_ODDS.three) return 3
  if (roll < CAPTURE_PRIMARY_MATERIAL_QUANTITY_ODDS.two) return 2
  return 1
}

function getSpecialFormMaterials(
  context: DropContext,
  configs = getTypeMaterialConfigs(context.types),
) {
  if (!context.formId) return []
  return configs
    .map((config) => config.specialFormMaterials[context.formId as string])
    .filter(
      (
        material,
      ): material is {
        materialId: string
        dropChance: number
        guaranteed?: boolean
      } => !!material,
    )
}

export function buildArtisanMaterialRewards(
  context: DropContext,
  source: 'capture' | 'field-observation',
  options: MaterialRewardOptions = {},
): LocationReward[] {
  const rng = options.rng || Math.random
  const tier = resolveDropMaterialTier()
  const typeConfigs = getTypeMaterialConfigs(context.types)
  const primaryConfigs =
    source === 'capture' ? [pickRandomConfig(typeConfigs, rng)] : typeConfigs
  const primaryMaterialIds = primaryConfigs.map((config) =>
    familyId(config.family, tier),
  )
  const specialMaterials = getSpecialFormMaterials(context, primaryConfigs)

  const rewards: LocationReward[] = primaryMaterialIds.map(
    (primaryMaterialId) => ({
      type: 'item',
      targetId: primaryMaterialId,
      quantity:
        source === 'capture' ? resolveCapturePrimaryMaterialQuantity(rng) : 1,
      dropChance:
        source === 'field-observation'
          ? FIELD_OBSERVATION_PRIMARY_MATERIAL_DROP_CHANCE
          : 100,
    }),
  )

  for (const specialMaterial of specialMaterials) {
    rewards.push({
      type: 'item',
      targetId: specialMaterial.materialId,
      quantity: 1,
      dropChance: specialMaterial.guaranteed ? 100 : specialMaterial.dropChance,
      ...(specialMaterial.guaranteed ? { guaranteed: true } : {}),
    } as LocationReward)
  }

  return rewards
}

export function buildFieldObservationMaterialRewards(
  contexts: DropContext[],
  primaryMaterialLimit: number = FIELD_OBSERVATION_PRIMARY_MATERIAL_LIMIT_UNLOCKS[0]
    .limit,
): LocationReward[] {
  const rewards: LocationReward[] = []
  let primaryMaterialCount = 0

  for (const context of contexts) {
    const subjectRewards = buildArtisanMaterialRewards(
      context,
      'field-observation',
    )
    const primaryMaterialCountForSubject = getTypeMaterialConfigs(
      context.types,
    ).length
    const primaryMaterialRewards = subjectRewards.slice(
      0,
      primaryMaterialCountForSubject,
    )
    const specialMaterialRewards = subjectRewards.slice(
      primaryMaterialCountForSubject,
    )

    for (const primaryMaterialReward of primaryMaterialRewards) {
      if (primaryMaterialCount >= primaryMaterialLimit) break
      rewards.push(primaryMaterialReward)
      primaryMaterialCount += 1
    }
    rewards.push(...specialMaterialRewards)
  }

  return rewards
}

export function buildBrokenBallRewards(
  context: Pick<DropContext, 'level' | 'researchingLevel'>,
  source: 'wild-battle' | 'field-observation',
): LocationReward[] {
  const tier = resolveDropMaterialTier()
  const dropChance = source === 'wild-battle' ? 25 : 40

  return [
    {
      type: 'item',
      targetId: familyId('broken-ball', tier),
      quantity: 1,
      dropChance,
    },
  ]
}

export function buildReleaseBrokenBallReward(
  context: Pick<DropContext, 'level'>,
): LocationReward {
  const tier = resolveDropMaterialTier()
  return {
    type: 'item',
    targetId: familyId('broken-ball', tier),
    quantity: 1,
    dropChance: 100,
  }
}

export function buildReleaseMaterialRewards(
  context: DropContext,
  rolls = 5,
): LocationReward[] {
  if (rolls <= 0) return []

  const tier = resolveDropMaterialTier()
  const primaryMaterialIds = getPrimaryMaterialIds(context, tier)
  return Array.from({ length: rolls }, (_, index) => ({
    type: 'item',
    targetId: primaryMaterialIds[index % primaryMaterialIds.length],
    quantity: 1,
    dropChance: 30,
  }))
}
