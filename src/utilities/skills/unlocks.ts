import type { Item, ItemSkillId } from '@/data/items/types'
import type { PokemonPowerId } from '@/utilities/pokemon/pokemon-powers'

export type CoreSkillId = 'battling' | 'catching' | 'researching' | 'artisan'

export type SkillDataMap = Partial<
  Record<
    ItemSkillId,
    {
      level?: number | null
      exp?: number | null
    }
  >
>

export interface PokemonIVs {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

type PokemonIVInput = Partial<
  Record<keyof PokemonIVs, number | null | undefined>
>

export const RESEARCHER_MOVE_SLOT_UNLOCKS = [
  { level: 10, slots: 1 },
  { level: 20, slots: 2 },
  { level: 45, slots: 3 },
  { level: 60, slots: 4 },
] as const

export const TRAINER_IV_CAP_UNLOCKS = [
  { level: 1, cap: 10 },
  { level: 10, cap: 15 },
  { level: 20, cap: 20 },
  { level: 30, cap: 25 },
  { level: 40, cap: 30 },
  { level: 50, cap: 31 },
] as const

export const RESEARCHER_ABILITY_ROLL_UNLOCKS = [
  { level: 1, rolls: 1 },
  { level: 60, rolls: 2 },
  { level: 90, rolls: 3 },
] as const

export const RESEARCHER_HIDDEN_ABILITY_UNLOCK_LEVEL = 27

export const TRAINER_BATTLE_ITEM_USE_UNLOCKS = [
  { level: 1, uses: 2 },
  { level: 17, uses: 3 },
  { level: 38, uses: 4 },
  { level: 52, uses: 5 },
] as const

export const TRAINER_BATTLE_MOVE_USE_UNLOCKS = [
  { level: 10, uses: 2 },
  { level: 21, uses: 3 },
  { level: 42, uses: 4 },
  { level: 59, uses: 5 },
] as const

export const MAX_RESEARCHER_MOVE_SLOTS = 4
export const TRAINER_HELD_ITEM_LEVEL = 15
export const RESEARCHER_LURE_RECIPE_UNLOCKS = [
  { level: 10, tier: 'Lure' },
  { level: 40, tier: 'Advanced Lure' },
  { level: 70, tier: 'Master Lure' },
] as const
export const EXPLORER_ENCOUNTER_ITEM_UNLOCKS = [
  { level: 1, uses: 1 },
  { level: 25, uses: 2 },
  { level: 50, uses: 3 },
  { level: 80, uses: 4 },
  { level: 95, uses: 5 },
] as const
export const EXPLORER_VOYAGE_SLOT_UNLOCKS = [
  { level: 1, slots: 1 },
  { level: 22, slots: 2 },
  { level: 46, slots: 3 },
  { level: 71, slots: 4 },
  { level: 93, slots: 5 },
] as const

export const BATTLE_POWER_UNLOCK_LEVELS: Record<PokemonPowerId, number> = {
  shout: 40,
  tera: 70,
  mega: 75,
  'z-move': 80,
  dynamax: 85,
  victory: 90,
  weather: 65,
  circadian: 95,
  'dimensional-shift': 95,
}

export const SKILL_TITLE_TIERS = [
  { level: 10, suffix: 'New' },
  { level: 20, suffix: 'Junior' },
  { level: 30, suffix: 'Growing' },
  { level: 40, suffix: 'Adept' },
  { level: 50, suffix: 'Expert' },
  { level: 60, suffix: 'Professional' },
  { level: 70, suffix: 'Ace' },
  { level: 80, suffix: 'Incredible' },
  { level: 90, suffix: 'Master' },
  { level: 100, suffix: '' },
] as const

const SKILL_TITLE_NAMES: Record<CoreSkillId, string> = {
  battling: 'Trainer',
  catching: 'Explorer',
  researching: 'Researcher',
  artisan: 'Artisan',
}

export function getSkillLevel(
  skills: SkillDataMap | null | undefined,
  skillId: ItemSkillId,
): number {
  return Math.max(1, Math.floor(skills?.[skillId]?.level || 1))
}

export function getResearcherMoveSlotCount(researcherLevel: number): number {
  let slots = 0
  for (const unlock of RESEARCHER_MOVE_SLOT_UNLOCKS) {
    if (researcherLevel >= unlock.level) slots = unlock.slots
  }
  return slots
}

export function getTrainerBattleItemUseCount(trainerLevel: number): number {
  let uses: number = TRAINER_BATTLE_ITEM_USE_UNLOCKS[0].uses
  for (const unlock of TRAINER_BATTLE_ITEM_USE_UNLOCKS) {
    if (trainerLevel >= unlock.level) uses = unlock.uses
  }
  return uses
}

export function getTrainerBattleMoveUseCount(trainerLevel: number): number {
  let uses: number = TRAINER_BATTLE_MOVE_USE_UNLOCKS[0].uses
  for (const unlock of TRAINER_BATTLE_MOVE_USE_UNLOCKS) {
    if (trainerLevel >= unlock.level) uses = unlock.uses
  }
  return uses
}

function applyBattleUseConfigCap(
  skillLimit: number,
  configLimit?: number,
): number {
  if (typeof configLimit !== 'number') return skillLimit
  return Math.max(0, Math.min(skillLimit, Math.floor(configLimit)))
}

export function resolveTrainerBattleItemUseLimit(
  trainerLevel: number,
  configLimit?: number,
): number {
  return applyBattleUseConfigCap(
    getTrainerBattleItemUseCount(trainerLevel),
    configLimit,
  )
}

export function resolveTrainerBattleMoveUseLimit(
  trainerLevel: number,
  configLimit?: number,
): number {
  return applyBattleUseConfigCap(
    getTrainerBattleMoveUseCount(trainerLevel),
    configLimit,
  )
}

export function getEnemyBattleMoveUseCount(
  enemyLevels: Array<number | null | undefined>,
): number {
  const highestEnemyLevel = Math.max(
    1,
    ...enemyLevels
      .map((level) => Math.floor(level || 1))
      .filter((level) => Number.isFinite(level)),
  )
  return getTrainerBattleMoveUseCount(highestEnemyLevel)
}

export function resolveEnemyBattleMoveUseLimit(
  enemyLevels: Array<number | null | undefined>,
  configLimit?: number,
): number {
  if (typeof configLimit === 'number')
    return Math.max(0, Math.floor(configLimit))
  return getEnemyBattleMoveUseCount(enemyLevels)
}

export function canUseTrainerHeldItems(trainerLevel: number): boolean {
  return trainerLevel >= TRAINER_HELD_ITEM_LEVEL
}

export function getBattlePowerUnlockLevel(powerId: PokemonPowerId): number {
  return BATTLE_POWER_UNLOCK_LEVELS[powerId]
}

export function getExplorerEncounterItemLimit(explorerLevel: number): number {
  let uses = 1
  for (const unlock of EXPLORER_ENCOUNTER_ITEM_UNLOCKS) {
    if (explorerLevel >= unlock.level) uses = unlock.uses
  }
  return uses
}

export function getExplorerVoyageSlotCount(explorerLevel: number): number {
  let slots = 1
  for (const unlock of EXPLORER_VOYAGE_SLOT_UNLOCKS) {
    if (explorerLevel >= unlock.level) slots = unlock.slots
  }
  return slots
}

export function validateBattlePowerSkillRequirement(
  powerId: PokemonPowerId,
  trainerLevel: number,
): string | null {
  const requiredLevel = getBattlePowerUnlockLevel(powerId)
  if (trainerLevel >= requiredLevel) return null
  return `Trainer Level ${requiredLevel} required to use this power`
}

export function getItemSkillRequirement(
  item: Pick<Item, 'skillRequirements'>,
  skillId: ItemSkillId,
) {
  return item.skillRequirements?.[skillId]
}

export function getItemSkillLockReason(
  item: Pick<Item, 'name' | 'skillRequirements'>,
  skills: SkillDataMap | null | undefined,
): string | null {
  if (!item.skillRequirements) return null

  for (const [skillId, requiredLevel] of Object.entries(
    item.skillRequirements,
  ) as [ItemSkillId, number][]) {
    if (getSkillLevel(skills, skillId) < requiredLevel) {
      return `${getSkillDisplayName(skillId)} Level ${requiredLevel} required to use ${item.name}`
    }
  }

  return null
}

export function canUseItemWithSkillRequirements(
  item: Pick<Item, 'name' | 'skillRequirements'>,
  skills: SkillDataMap | null | undefined,
): boolean {
  return getItemSkillLockReason(item, skills) === null
}

export function getTrainerIvCap(trainerLevel: number): number {
  const safeLevel = Math.max(1, Math.min(100, Math.floor(trainerLevel || 1)))
  let cap: number = TRAINER_IV_CAP_UNLOCKS[0].cap

  for (const unlock of TRAINER_IV_CAP_UNLOCKS) {
    if (safeLevel >= unlock.level) cap = unlock.cap
  }

  return cap
}

export function getEffectivePokemonIvs(
  ivs: PokemonIVInput | null | undefined,
  trainerLevel: number,
): PokemonIVs {
  const cap = getTrainerIvCap(trainerLevel)
  return {
    hp: Math.min(ivs?.hp ?? 0, cap),
    attack: Math.min(ivs?.attack ?? 0, cap),
    defense: Math.min(ivs?.defense ?? 0, cap),
    specialAttack: Math.min(ivs?.specialAttack ?? 0, cap),
    specialDefense: Math.min(ivs?.specialDefense ?? 0, cap),
    speed: Math.min(ivs?.speed ?? 0, cap),
  }
}

export function getResearcherAbilityRolls(researcherLevel: number): number {
  let rolls: number = RESEARCHER_ABILITY_ROLL_UNLOCKS[0].rolls
  for (const unlock of RESEARCHER_ABILITY_ROLL_UNLOCKS) {
    if (researcherLevel >= unlock.level) rolls = unlock.rolls
  }
  return rolls
}

export function getResearcherHiddenAbilitiesUnlocked(
  researcherLevel: number,
): boolean {
  return researcherLevel >= RESEARCHER_HIDDEN_ABILITY_UNLOCK_LEVEL
}

export function getResearcherShinyModifier(researcherLevel: number): number {
  if (researcherLevel >= 100) return 1.5
  if (researcherLevel >= 81) return 1.1
  return 1
}

export function getSkillTitleId(skillId: CoreSkillId, level: number): string {
  return `skill-${skillId}-${level}`
}

export function getSkillTitleName(skillId: CoreSkillId, level: number): string {
  const skillName = SKILL_TITLE_NAMES[skillId]
  const tier = SKILL_TITLE_TIERS.find((entry) => entry.level === level)
  if (!tier) return skillName
  return tier.suffix ? `${tier.suffix} ${skillName}` : skillName
}

export function getUnlockedSkillTitleIds(
  skills: SkillDataMap | null | undefined,
): string[] {
  return (Object.keys(SKILL_TITLE_NAMES) as CoreSkillId[]).flatMap(
    (skillId) => {
      const level = getSkillLevel(skills, skillId)
      return SKILL_TITLE_TIERS.filter((tier) => level >= tier.level).map(
        (tier) => getSkillTitleId(skillId, tier.level),
      )
    },
  )
}

export function getEquipableTitleIds(
  unlockedTitles: unknown,
  skills: SkillDataMap | null | undefined,
): string[] {
  const storedTitles = Array.isArray(unlockedTitles)
    ? unlockedTitles.filter(
        (title): title is string => typeof title === 'string',
      )
    : []

  const titleIds = new Set<string>(['new-beginnings', ...storedTitles])
  for (const skillTitleId of getUnlockedSkillTitleIds(skills)) {
    titleIds.add(skillTitleId)
  }

  return Array.from(titleIds)
}

function getSkillDisplayName(skillId: ItemSkillId): string {
  if (skillId === 'battling') return 'Trainer'
  if (skillId === 'catching') return 'Explorer'
  if (skillId === 'researching') return 'Researcher'
  if (skillId === 'artisan') return 'Artisan'
  return 'PVP Rank'
}
