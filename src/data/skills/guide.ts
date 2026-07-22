import { items } from '@/data/items'
import { artisanRecipes } from '@/data/artisan'
import type { TaskIcon } from '@/data/tasks/types'
import {
  BATTLE_POWER_UNLOCK_LEVELS,
  EXPLORER_ENCOUNTER_ITEM_UNLOCKS,
  EXPLORER_VOYAGE_SLOT_UNLOCKS,
  RESEARCHER_HIDDEN_ABILITY_UNLOCK_LEVEL,
  RESEARCHER_LURE_RECIPE_UNLOCKS,
  RESEARCHER_MOVE_SLOT_UNLOCKS,
  TRAINER_BATTLE_ITEM_USE_UNLOCKS,
  TRAINER_BATTLE_MOVE_USE_UNLOCKS,
  TRAINER_HELD_ITEM_LEVEL,
  TRAINER_IV_CAP_UNLOCKS,
  getTrainerIvCap,
  getSkillTitleName,
  SKILL_TITLE_TIERS,
  type CoreSkillId,
} from '@/utilities/skills/unlocks'
import { FIELD_OBSERVATION_RESEARCH_XP_UNLOCKS } from '@/utilities/research/research-levels'
import { FIELD_OBSERVATION_PRIMARY_MATERIAL_LIMIT_UNLOCKS } from '@/utilities/artisan/material-drops'
import {
  FIELD_OBSERVATION_HEALING_BERRY_UNLOCKS,
  FIELD_OBSERVATION_MINT_DROP_CHANCE,
  FIELD_OBSERVATION_MINT_UNLOCK_LEVEL,
  FIELD_OBSERVATION_NUT_UNLOCKS,
} from '@/utilities/research/berry-drops'

export type SkillGuideUnlockSource = 'authored' | 'item'
export type SkillGuideUnlockCategory =
  | 'battle'
  | 'encounter'
  | 'items'
  | 'pokemon'
  | 'progression'
  | 'powers'
  | 'titles'

export interface SkillGuideUnlock {
  skillId: CoreSkillId
  level: number
  category: SkillGuideUnlockCategory
  label: string
  description: string
  source: SkillGuideUnlockSource
  itemId?: string
  icon?: TaskIcon
}

const itemIcon = (id: string): TaskIcon => ({ type: 'item', id })
const trainerIcon = (id: string): TaskIcon => ({ type: 'trainer', id })
const guideItemsById = new Map(items.map((item) => [item.id, item]))
const skillTitleIcon = (skillId: CoreSkillId): TaskIcon => {
  const iconId =
    skillId === 'battling'
      ? 'trainer'
      : skillId === 'catching'
        ? 'explorer'
        : skillId === 'researching'
          ? 'researcher'
          : 'artisan'

  return { type: 'local', id: `/fallback/skills/${iconId}.avif` }
}

const trainerBattleItemUseUnlocks: SkillGuideUnlock[] = TRAINER_BATTLE_ITEM_USE_UNLOCKS.map(
  (unlock) => ({
    skillId: 'battling',
    level: unlock.level,
    category: 'battle',
    label: `${unlock.uses} Battle Items`,
    description: `Use ${unlock.uses} items per battle.`,
    source: 'authored',
    icon: itemIcon('battle-potion'),
  }),
)

const trainerBattleMoveUseUnlocks: SkillGuideUnlock[] = TRAINER_BATTLE_MOVE_USE_UNLOCKS.map(
  (unlock) => ({
    skillId: 'battling',
    level: unlock.level,
    category: 'battle',
    label: `${unlock.uses} Trained Moves`,
    description: `Use ${unlock.uses} trained moves per battle.`,
    source: 'authored',
    icon: itemIcon('tm-mega-punch'),
  }),
)

const researcherMoveSlotUnlocks: SkillGuideUnlock[] = RESEARCHER_MOVE_SLOT_UNLOCKS.map(
  (unlock) => ({
    skillId: 'researching',
    level: unlock.level,
    category: 'pokemon',
    label: `${unlock.slots} Move Slot${unlock.slots === 1 ? '' : 's'}`,
    description: `Assign ${unlock.slots} battle move${unlock.slots === 1 ? '' : 's'} to researched Pokemon.`,
    source: 'authored',
    icon: itemIcon('tm-mega-punch'),
  }),
)

const titleUnlocks: SkillGuideUnlock[] = (
  ['battling', 'catching', 'researching', 'artisan'] as const
).flatMap((skillId) =>
  SKILL_TITLE_TIERS.map((tier) => ({
    skillId,
    level: tier.level,
    category: 'titles' as const,
    label: getSkillTitleName(skillId, tier.level),
    description: 'Title unlocked.',
    source: 'authored' as const,
    icon: skillTitleIcon(skillId),
  })),
)

const fieldObservationResearchUnlocks: SkillGuideUnlock[] = FIELD_OBSERVATION_RESEARCH_XP_UNLOCKS.map((unlock) => {
  return {
    skillId: 'researching',
    level: unlock.level,
    category: 'pokemon',
    label: `Study XP x${unlock.amount}`,
    description: `Observed Pokemon gain ${unlock.amount} Research XP.`,
    source: 'authored',
    icon: itemIcon('quality-forest-photo'),
  }
})

const fieldObservationMaterialUnlocks: SkillGuideUnlock[] = FIELD_OBSERVATION_PRIMARY_MATERIAL_LIMIT_UNLOCKS.slice(1).map((unlock) => ({
  skillId: 'researching',
  level: unlock.level,
  category: 'encounter',
  label: `Study Material Cap ${unlock.limit}`,
  description: `Field Observation can roll ${unlock.limit} primary materials.`,
  source: 'authored',
  icon: itemIcon('soft-fluff-t1'),
}))

const nutUnlocks: SkillGuideUnlock[] = FIELD_OBSERVATION_NUT_UNLOCKS.map((unlock) => {
  const nut = guideItemsById.get(unlock.itemId)
  return {
    skillId: 'researching',
    level: unlock.level,
    category: 'items',
    label:
      unlock.itemId === 'nut-red'
        ? 'Dye Nuts'
        : nut?.name || unlock.itemId,
    description:
      unlock.itemId === 'nut-red'
        ? 'Find dye nuts in Field Observation.'
        : `Adds ${nut?.name || 'this nut'} to nut drops.`,
    source: 'authored',
    itemId: unlock.itemId,
    icon: itemIcon(unlock.itemId),
  }
})

const healingBerryUnlocks: SkillGuideUnlock[] = FIELD_OBSERVATION_HEALING_BERRY_UNLOCKS.map((unlock) => {
  const berry = guideItemsById.get(unlock.itemId)
  return {
    skillId: 'researching',
    level: unlock.level,
    category: 'items',
    label:
      unlock.itemId === 'oran-berry'
        ? 'Healing Berries'
        : unlock.itemId === 'pomeg-berry'
          ? 'EV-Reducing Berries'
        : berry?.name || unlock.itemId,
    description:
      unlock.itemId === 'oran-berry'
        ? 'Find 0-1 healing berries in Field Observation.'
        : unlock.itemId === 'pomeg-berry'
          ? 'Adds EV-reducing berries to healing berry drops.'
        : `Adds ${berry?.name || 'this berry'} to healing berry drops.`,
    source: 'authored',
    itemId: unlock.itemId,
    icon: itemIcon(unlock.itemId),
  }
})

const fieldObservationMintUnlocks: SkillGuideUnlock[] = [
  {
    skillId: 'researching',
    level: FIELD_OBSERVATION_MINT_UNLOCK_LEVEL,
    category: 'items',
    label: 'Nature Mints',
    description: `Field Observation has a ${FIELD_OBSERVATION_MINT_DROP_CHANCE}% chance to drop one nature mint.`,
    source: 'authored',
    itemId: 'adamant-mint',
    icon: itemIcon('adamant-mint'),
  },
]

export const authoredSkillGuideUnlocks: SkillGuideUnlock[] = [
  ...trainerBattleItemUseUnlocks,
  ...trainerBattleMoveUseUnlocks,
  {
    skillId: 'battling',
    level: 5,
    category: 'progression',
    label: "Brock's Gym Challenge",
    description: 'Challenge Brock.',
    source: 'authored',
    icon: trainerIcon('gym-kanto-brock'),
  },
  {
    skillId: 'battling',
    level: 10,
    category: 'progression',
    label: "Misty's Gym Challenge",
    description: 'Challenge Misty.',
    source: 'authored',
    icon: trainerIcon('gym-kanto-misty'),
  },
  {
    skillId: 'battling',
    level: TRAINER_HELD_ITEM_LEVEL,
    category: 'battle',
    label: 'Held Items',
    description: 'Assign eligible held items.',
    source: 'authored',
    icon: itemIcon('oran-berry'),
  },
  ...TRAINER_IV_CAP_UNLOCKS.map((unlock) => ({
    skillId: 'battling' as const,
    level: unlock.level,
    category: 'pokemon' as const,
    label: `IV Cap ${getTrainerIvCap(unlock.level)}`,
    description:
      unlock.cap === 31
        ? 'Fully unlocks natural IVs.'
        : `Usable IV cap rises to ${unlock.cap}.`,
    source: 'authored' as const,
    icon: itemIcon('battle-observer'),
  })),
  {
    skillId: 'battling',
    level: 15,
    category: 'progression',
    label: "Lt. Surge's Gym Challenge",
    description: 'Challenge Lt. Surge.',
    source: 'authored',
    icon: trainerIcon('gym-kanto-ltsurge'),
  },
  {
    skillId: 'battling',
    level: BATTLE_POWER_UNLOCK_LEVELS.shout,
    category: 'powers',
    label: 'Battle Shouts',
    description: 'Use battle shout powers.',
    source: 'authored',
    icon: itemIcon('book-of-shouts'),
  },
  {
    skillId: 'battling',
    level: BATTLE_POWER_UNLOCK_LEVELS.tera,
    category: 'powers',
    label: 'Terastallization',
    description: 'Change attack type for one turn.',
    source: 'authored',
    icon: itemIcon('tera-orb'),
  },
  {
    skillId: 'battling',
    level: BATTLE_POWER_UNLOCK_LEVELS.mega,
    category: 'powers',
    label: 'Mega Evolution',
    description: 'Transform compatible Pokemon for the rest of battle.',
    source: 'authored',
    icon: itemIcon('mega-bracelet'),
  },
  {
    skillId: 'battling',
    level: BATTLE_POWER_UNLOCK_LEVELS['z-move'],
    category: 'powers',
    label: 'Z-Moves',
    description: 'Prime a stance-based finishing move.',
    source: 'authored',
    icon: itemIcon('z-ring'),
  },
  {
    skillId: 'battling',
    level: BATTLE_POWER_UNLOCK_LEVELS.dynamax,
    category: 'powers',
    label: 'Dynamax',
    description: 'Grow stronger for three turns.',
    source: 'authored',
    icon: itemIcon('dynamax-band'),
  },
  {
    skillId: 'battling',
    level: BATTLE_POWER_UNLOCK_LEVELS.victory,
    category: 'powers',
    label: 'Victory Power',
    description: 'Swap to a Victory Pokemon.',
    source: 'authored',
    icon: itemIcon('v-crown'),
  },
  {
    skillId: 'battling',
    level: BATTLE_POWER_UNLOCK_LEVELS.weather,
    category: 'powers',
    label: 'Weather Control',
    description: 'Call unlocked weather in battle.',
    source: 'authored',
    icon: itemIcon('weather-orb'),
  },
  {
    skillId: 'battling',
    level: BATTLE_POWER_UNLOCK_LEVELS.circadian,
    category: 'powers',
    label: 'Advanced Powers',
    description: 'Unlock Circadian and Dimensional powers.',
    source: 'authored',
    icon: itemIcon('circadian-stone'),
  },
  {
    skillId: 'researching',
    level: 12,
    category: 'progression',
    label: 'Itemfinder',
    description: 'Complete Route 11 Itemfinder task.',
    source: 'authored',
    icon: itemIcon('dowsing-machine'),
  },
  ...EXPLORER_ENCOUNTER_ITEM_UNLOCKS.map((unlock) => ({
    skillId: 'catching' as const,
    level: unlock.level,
    category: 'encounter' as const,
    label: `${unlock.uses} Encounter Item${unlock.uses === 1 ? '' : 's'}`,
    description: `Use ${unlock.uses} item${unlock.uses === 1 ? '' : 's'} in wild encounters.`,
    source: 'authored' as const,
    icon: itemIcon('normal-gem'),
  })),
  ...EXPLORER_VOYAGE_SLOT_UNLOCKS.map((unlock) => ({
    skillId: 'catching' as const,
    level: unlock.level,
    category: 'progression' as const,
    label: `${unlock.slots} Active Voyage${unlock.slots === 1 ? '' : 's'}`,
    description: `${unlock.slots} voyage${unlock.slots === 1 ? '' : 's'} at once.`,
    source: 'authored' as const,
    icon: itemIcon('quality-forest-photo'),
  })),
  ...RESEARCHER_LURE_RECIPE_UNLOCKS.map((unlock) => ({
    skillId: 'researching' as const,
    level: unlock.level,
    category: 'encounter' as const,
    label:
      unlock.tier === 'Lure'
        ? 'Base Lure Recipes'
        : `${unlock.tier.replace(' Lure', '')} Lure Recipes`,
    description:
      unlock.tier === 'Lure'
        ? 'Research base lure recipes.'
        : `Research ${unlock.tier.toLowerCase()} recipes.`,
    source: 'authored' as const,
    icon: itemIcon(
      unlock.tier === 'Lure'
        ? 'bug-lure'
        : unlock.tier === 'Advanced Lure'
          ? 'advanced-bug-lure'
          : 'master-bug-lure',
    ),
  })),
  {
    skillId: 'researching',
    level: 1,
    category: 'pokemon',
    label: 'Pokemon Research',
    description: 'Rank species to Research Level 5.',
    source: 'authored',
    icon: itemIcon('research-kit'),
  },
  {
    skillId: 'researching',
    level: 7,
    category: 'progression',
    label: 'Stats Module',
    description: 'Unlock base stat scanning.',
    source: 'authored',
    icon: itemIcon('researchers-journal'),
  },
  {
    skillId: 'researching',
    level: 13,
    category: 'progression',
    label: 'Flash Research',
    description: 'Unlock A Light in The Dark.',
    source: 'authored',
    icon: itemIcon('tm-flash'),
  },
  {
    skillId: 'researching',
    level: 32,
    category: 'pokemon',
    label: 'Pokemon Eggs',
    description:
      'Find Pokemon Eggs in Field Observation after completing the Day Care Egg Program.',
    source: 'authored',
    icon: { type: 'local', id: '/sprites/items/egg.png' },
  },
  ...fieldObservationResearchUnlocks,
  ...fieldObservationMaterialUnlocks,
  ...nutUnlocks,
  ...healingBerryUnlocks,
  ...fieldObservationMintUnlocks,
  ...researcherMoveSlotUnlocks,
  {
    skillId: 'researching',
    level: RESEARCHER_HIDDEN_ABILITY_UNLOCK_LEVEL,
    category: 'pokemon',
    label: 'Ability Insight',
    description: 'Unlocks hidden ability rolls for wild Pokemon.',
    source: 'authored',
    icon: itemIcon('ability-patch'),
  },
  {
    skillId: 'researching',
    level: 81,
    category: 'pokemon',
    label: 'Shiny Research',
    description: 'Improves wild shiny odds.',
    source: 'authored',
    icon: itemIcon('researchers-journal'),
  },
  ...titleUnlocks,
]

function buildSkillGuideUnlocks(skillId: CoreSkillId): SkillGuideUnlock[] {
  const recipeUnlocks: SkillGuideUnlock[] =
    skillId === 'artisan'
      ? artisanRecipes
          .filter((recipe) => !recipe.requirements?.length)
          .map((recipe) => {
          const craftedItems = recipe.rewards
            .filter((reward) => reward.type === 'item' && typeof reward.targetId === 'string')
            .map((reward) => guideItemsById.get(reward.targetId as string))
            .filter(Boolean)

          const primaryCrafted = craftedItems[0]
          const category: SkillGuideUnlockCategory =
            primaryCrafted?.category === 'ball' ? 'encounter' : 'items'

          return {
            skillId: 'artisan',
            level: recipe.artisanLevel,
            category,
            label: getRecipeGuideLabel(recipe.name, primaryCrafted?.name),
            description: shortGuideDescription(recipe.description),
            source: 'authored',
            itemId: primaryCrafted?.id,
            icon: primaryCrafted ? itemIcon(primaryCrafted.id) : undefined,
          }
        })
      : []

  const itemUnlocks = items.flatMap((item): SkillGuideUnlock[] => {
    const level = item.skillRequirements?.[skillId]
    if (!level) return []
    if (skillId === 'researching' && item.category === 'misc' && item.id.endsWith('-lure')) {
      return []
    }
    return [
      {
        skillId,
        level,
        category: item.category === 'ball' ? 'encounter' : 'items',
        label: item.name,
        description: getItemGuideDescription(item, skillId),
        source: 'item',
        itemId: item.id,
        icon: itemIcon(item.id),
      },
    ]
  })

  return [
    ...authoredSkillGuideUnlocks.filter((unlock) => unlock.skillId === skillId),
    ...recipeUnlocks,
    ...itemUnlocks,
  ]
    .sort((a, b) => a.level - b.level || a.label.localeCompare(b.label))
}

function shortGuideDescription(description: string): string {
  const [firstSentence] = description.split(/(?<=[.!?])\s+/)
  return firstSentence || description
}

function getRecipeGuideLabel(recipeName: string, itemName?: string): string {
  if (recipeName.includes('PokePowder EX')) return recipeName
  return itemName || recipeName.replace(/^Craft /, '')
}

function getItemGuideDescription(
  item: Pick<typeof items[number], 'category' | 'description' | 'name'>,
  skillId: CoreSkillId,
): string {
  if (skillId === 'battling') {
    if (item.category === 'berry') return 'Battle or held berry.'
    if (item.category === 'battle' || item.category === 'potion') {
      return 'Battle item.'
    }
  }
  if (skillId === 'catching') return 'Exploration item.'
  if (skillId === 'researching') return 'Pokemon research item.'
  return shortGuideDescription(item.description)
}

const skillGuideUnlocksBySkill: Record<CoreSkillId, SkillGuideUnlock[]> = {
  battling: buildSkillGuideUnlocks('battling'),
  catching: buildSkillGuideUnlocks('catching'),
  researching: buildSkillGuideUnlocks('researching'),
  artisan: buildSkillGuideUnlocks('artisan'),
}

export function getSkillGuideUnlocks(skillId: CoreSkillId): SkillGuideUnlock[] {
  return skillGuideUnlocksBySkill[skillId]
}

export function getNextSkillGuideUnlocks(skillId: CoreSkillId, currentLevel: number, limit = 4) {
  return getSkillGuideUnlocks(skillId)
    .filter((unlock) => unlock.level > currentLevel)
    .slice(0, limit)
}
