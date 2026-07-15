import { items } from '@/data/items'
import { getTypeLureType, type PokemonTypeName } from '@/data/items/types'
import type { Reward } from '@/utilities/rewards/reward-logic'
import type { FieldObservationRewardSubject } from './field-observation'
import { getPokemonForm, getPokemonSpecies } from '@/utilities/pokemon/pokedex'

const MIN_LEVEL = 1
const MAX_LEVEL = 100
const MIN_DROP_CHANCE = 8
const MAX_DROP_CHANCE = 30

const lureRequirementByType = new Map<PokemonTypeName, number>()

for (const item of items) {
  const lureType = getTypeLureType(item.id)
  if (!lureType) continue
  const requiredResearcherLevel = item.skillRequirements?.researching
  if (typeof requiredResearcherLevel !== 'number') continue
  lureRequirementByType.set(lureType, requiredResearcherLevel)
}

export function getLureDropChanceFromPokemonLevel(level: number): number {
  const clampedLevel = Math.max(MIN_LEVEL, Math.min(MAX_LEVEL, Math.floor(level || MIN_LEVEL)))
  const progress = (clampedLevel - MIN_LEVEL) / (MAX_LEVEL - MIN_LEVEL)
  return Math.round(MIN_DROP_CHANCE + progress * (MAX_DROP_CHANCE - MIN_DROP_CHANCE))
}

export function buildFieldObservationLureRewards(
  subjects: FieldObservationRewardSubject[],
  researcherLevel: number,
): Reward[] {
  void subjects
  void researcherLevel
  return []
}

export function buildLegacyFieldObservationLureRewards(
  subjects: FieldObservationRewardSubject[],
  researcherLevel: number,
): Reward[] {
  if (!Array.isArray(subjects) || subjects.length === 0) return []

  const highestLevelByType = new Map<PokemonTypeName, number>()

  for (const subject of subjects) {
    const formData = getPokemonForm(subject.formId) || getPokemonSpecies(subject.speciesId)
    const subjectTypes = formData?.types || []

    for (const typeName of subjectTypes) {
      const type = typeName.toLowerCase() as PokemonTypeName
      if (!lureRequirementByType.has(type)) continue
      const existing = highestLevelByType.get(type) || 0
      const subjectLevel = Math.max(MIN_LEVEL, Math.floor(subject.level || MIN_LEVEL))
      if (subjectLevel > existing) highestLevelByType.set(type, subjectLevel)
    }
  }

  const rewards: Reward[] = []

  for (const [type, highestLevel] of highestLevelByType) {
    const requiredResearcherLevel = lureRequirementByType.get(type) || Infinity
    if (researcherLevel < requiredResearcherLevel) continue

    rewards.push({
      type: 'item',
      targetId: `${type}-lure`,
      quantity: 1,
      dropChance: getLureDropChanceFromPokemonLevel(highestLevel),
    })
  }

  return rewards
}
