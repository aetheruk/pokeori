import pokemonResearchLevelRewards from '@/data/pokemon-research-level-rewards.json'
import { items } from '@/data/items'
import { getMove } from '@/data/moves'
import type { Reward } from '@/data/types'

/**
 * Research Level System
 *
 * Every Pokemon form has its own research XP and level (0-5).
 * Pokemon research levels are granted automatically when XP crosses a threshold.
 */

// XP thresholds to reach each research level
// Level 0 = default, Level 1 = 10 XP, etc.
export const RESEARCH_LEVEL_THRESHOLDS = [0, 10, 50, 150, 350, 1000]

export const MAX_RESEARCH_LEVEL = 5

export const RESEARCH_LEVEL_REWARDS: Record<number, string> = {
  1: 'Battle Moves & Held Items!',
  2: 'Release Materials & Battle Observation!',
  3: '+15 Crystals, Free Escape & Pokemon Powers!',
  4: 'More Abilities, Better IVs & Survival Bond!',
  5: 'Shinies are more Likely!',
}

export type PokemonResearchLevelItemRewardConfig = {
  formId: string
  level: number
  itemId: string
  quantity?: number
}

const authoredPokemonResearchLevelRewards =
  pokemonResearchLevelRewards as PokemonResearchLevelItemRewardConfig[]

function canResearchFormUseTm(itemId: string, formId: string): boolean {
  const item = items.find((candidate) => candidate.id === itemId)
  if (item?.category !== 'tm' || !item.moveId) return false

  const move = getMove(item.moveId)
  if (!move) return false

  return move.formId?.some((candidateFormId) => String(candidateFormId) === formId) ?? false
}

export function getPokemonResearchLevelItemRewards(
  formId: string | number,
  oldLevel: number,
  newLevel: number,
  rewardConfigs: PokemonResearchLevelItemRewardConfig[] =
    authoredPokemonResearchLevelRewards,
): Reward[] {
  const formKey = String(formId)
  const fromLevel = Math.max(0, Math.floor(oldLevel))
  const toLevel = Math.min(MAX_RESEARCH_LEVEL, Math.floor(newLevel))

  if (toLevel <= fromLevel) return []

  return rewardConfigs
    .filter(
      (reward) =>
        String(reward.formId) === formKey &&
        reward.level > fromLevel &&
        reward.level <= toLevel,
    )
    .map((reward) => ({
      type: 'item',
      targetId: reward.itemId,
      quantity: reward.quantity ?? 1,
      dropChance: 100,
    }))
}

export function getPokemonResearchLevelTmUnlocks(
  formId: string | number,
  rewardConfigs: PokemonResearchLevelItemRewardConfig[] =
    authoredPokemonResearchLevelRewards,
): PokemonResearchLevelItemRewardConfig[] {
  const formKey = String(formId)

  return rewardConfigs
    .filter(
      (reward) =>
        String(reward.formId) === formKey && reward.itemId.startsWith('tm-'),
    )
    .sort((a, b) => {
      const levelDiff = a.level - b.level
      if (levelDiff !== 0) return levelDiff
      return a.itemId.localeCompare(b.itemId)
    })
}

export type RecoverableResearchTmReward = {
  itemId: string
  quantity: number
  formIds: string[]
}

type ResearchRewardPokedexMap = Record<
  string,
  Record<
    string,
    {
      caught?: boolean | null
      totalCaught?: number | null
      researchXp?: number | null
      researchLevel?: number | null
    }
  >
>

export function getRecoverableResearchTmRewards(
  pokedex: ResearchRewardPokedexMap | null | undefined,
  inventory: Record<string, number> | null | undefined,
  rewardConfigs: PokemonResearchLevelItemRewardConfig[] =
    authoredPokemonResearchLevelRewards,
): RecoverableResearchTmReward[] {
  if (!pokedex) return []

  const inventoryMap = inventory || {}
  const recoverable = new Map<string, RecoverableResearchTmReward>()

  for (const speciesForms of Object.values(pokedex)) {
    for (const [formId, entry] of Object.entries(speciesForms || {})) {
      const researchLevel = Math.max(0, Math.floor(Number(entry?.researchLevel || 0)))
      if (researchLevel <= 0) continue
      if (!entry?.caught && Number(entry?.totalCaught || 0) <= 0) continue

      const researchXp = Math.max(0, Math.floor(Number(entry?.researchXp || 0)))
      if (researchXp < getResearchXpForLevel(researchLevel)) continue

      const rewards = getPokemonResearchLevelItemRewards(
        formId,
        0,
        researchLevel,
        rewardConfigs,
      )

      for (const reward of rewards) {
        if (reward.type !== 'item' || !reward.targetId) continue

        const itemId = String(reward.targetId)
        if (!itemId.startsWith('tm-')) continue
        if (!canResearchFormUseTm(itemId, formId)) continue
        if ((inventoryMap[itemId] || 0) > 0) continue

        const existing = recoverable.get(itemId)
        if (existing) {
          if (!existing.formIds.includes(formId)) existing.formIds.push(formId)
          continue
        }

        recoverable.set(itemId, {
          itemId,
          quantity: Math.max(1, Math.floor(Number(reward.quantity || 1))),
          formIds: [formId],
        })
      }
    }
  }

  return [...recoverable.values()].sort((a, b) => a.itemId.localeCompare(b.itemId))
}

// Random XP granted per capture/evolve
export const RESEARCH_XP_PER_ENCOUNTER = { min: 3, max: 5 }

/**
 * Get the research level achievable given current XP (not yet claimed).
 * This tells us the max level the player COULD level up to.
 */
export function getMaxResearchLevelForXp(xp: number): number {
  let level = 0
  for (let i = 1; i < RESEARCH_LEVEL_THRESHOLDS.length; i++) {
    if (xp >= RESEARCH_LEVEL_THRESHOLDS[i]) {
      level = i
    } else {
      break
    }
  }
  return level
}

/**
 * Get XP threshold required for a specific research level
 */
export function getResearchXpForLevel(level: number): number {
  if (level < 0 || level >= RESEARCH_LEVEL_THRESHOLDS.length) return Infinity
  return RESEARCH_LEVEL_THRESHOLDS[level]
}

/**
 * Generate random research XP for a capture/evolve event
 */
export function rollResearchXp(): number {
  const { min, max } = RESEARCH_XP_PER_ENCOUNTER
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function getPokemonResearchLevel(
  pokedex: Record<string, any> | Array<Record<string, any>> | null | undefined,
  speciesId: string | number | null | undefined,
  formId: string | number | null | undefined,
): number {
  if (speciesId === null || speciesId === undefined || !formId) return 0

  const entry = Array.isArray(pokedex)
    ? pokedex.find(
        (pokedexEntry) =>
          String(pokedexEntry.speciesId) === String(speciesId) &&
          String(pokedexEntry.formId) === String(formId),
      )
    : pokedex?.[String(speciesId)]?.[String(formId)]
  const level = Number(entry?.researchLevel || 0)
  if (!Number.isFinite(level)) return 0
  return Math.max(0, Math.min(MAX_RESEARCH_LEVEL, Math.floor(level)))
}

export const FIELD_OBSERVATION_RESEARCH_XP_BONUS_CHANCE = 0.2
export const FIELD_OBSERVATION_RESEARCH_XP_UNLOCKS = [
  { level: 1, amount: 1 },
  { level: 18, amount: 2 },
  { level: 50, amount: 3 },
  { level: 70, amount: 4 },
  { level: 100, amount: 5 },
] as const

export function getFieldObservationResearchXpBaseAmount(
  researcherLevel: number,
): number {
  let amount: number = FIELD_OBSERVATION_RESEARCH_XP_UNLOCKS[0].amount
  for (const unlock of FIELD_OBSERVATION_RESEARCH_XP_UNLOCKS) {
    if (researcherLevel >= unlock.level) amount = unlock.amount
  }
  return amount
}

export function getFieldObservationResearchXpAmount(
  researcherLevel: number,
  random: () => number = Math.random,
): number {
  const base = getFieldObservationResearchXpBaseAmount(researcherLevel)
  return random() < FIELD_OBSERVATION_RESEARCH_XP_BONUS_CHANCE ? base + 1 : base
}

export function shouldAwardFieldObservationResearchXp(
  random: () => number = Math.random,
): boolean {
  void random
  return true
}

/**
 * Pokemon research breakthroughs no longer grant Researcher skill XP.
 * Kept as a zero-value compatibility helper for legacy callers and tests.
 */
export function calculateLevelUpSkillXp(
  _newResearchLevel: number,
  _currentSkillLevel: number,
): number {
  return 0
}
