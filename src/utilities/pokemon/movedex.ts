import { items, type Item } from '@/data/items'
import { getAllMoves } from '@/data/moves'
import type { MoveConfig } from '@/data/moves/types'
import pokemonData from '@/data/pokemon-data'
import { battles } from '@/data/battles'
import { allGames } from '@/data/games'
import { locations } from '@/data/locations'
import { shops } from '@/data/shops'
import pokemonResearchLevelRewards from '@/data/pokemon-research-level-rewards.json'
import { tasks } from '@/data/tasks'
import type { PokemonCriteria, TaskCondition } from '@/data/tasks/types'
import { resolveRegion } from '@/utilities/pokemon/origin'
import { getMoveDisplayType } from '@/utilities/pokemon/move-display'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'

export type MoveDexEntry = {
  move: MoveConfig
  item: Item
  itemId: string
  moveType: ReturnType<typeof getMoveDisplayType>
  unlockClue: string
}

export type MoveDexLearner = {
  speciesId: number
  form: {
    id: string
    name: string
  }
}

const ALL_MOVES_BY_ID = Object.fromEntries(
  getAllMoves().map((move) => [move.id, move]),
)

type MoveDexSource = {
  category?: string
  subCategory?: string
}

type MoveDexSourceMatch = {
  source: MoveDexSource
  companionCheck?: PokemonCriteria
}

type PokemonResearchLevelItemReward = {
  formId: string
  level: number
  itemId: string
  quantity?: number
}

const FIRST_PARTNER_FORM_IDS = new Set([
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '152',
  '153',
  '154',
  '155',
  '156',
  '157',
  '158',
  '159',
  '160',
  '252',
  '253',
  '254',
  '255',
  '256',
  '257',
  '258',
  '259',
  '260',
  '387',
  '388',
  '389',
  '390',
  '391',
  '392',
  '393',
  '394',
  '395',
  '495',
  '496',
  '497',
  '498',
  '499',
  '500',
  '501',
  '502',
  '503',
  '650',
  '651',
  '652',
  '653',
  '654',
  '655',
  '656',
  '657',
  '658',
  '722',
  '723',
  '724',
  '725',
  '726',
  '727',
  '728',
  '729',
  '730',
  '810',
  '811',
  '812',
  '813',
  '814',
  '815',
  '816',
  '817',
  '818',
  '906',
  '907',
  '908',
  '909',
  '910',
  '911',
  '912',
  '913',
  '914',
])

const researchLevelRewards =
  pokemonResearchLevelRewards as PokemonResearchLevelItemReward[]

function getCompanionCheck(requirements: unknown): PokemonCriteria | undefined {
  if (!Array.isArray(requirements)) return undefined

  const companionRequirement = requirements.find((requirement): requirement is TaskCondition => {
    if (!requirement || typeof requirement !== 'object') return false
    const condition = requirement as TaskCondition
    return condition.type === 'companion' && !!condition.companionCheck
  })

  return companionRequirement?.companionCheck
}

function findRewardCompanionCheckForItem(value: unknown, itemId: string): PokemonCriteria | undefined {
  if (!value || typeof value !== 'object') return undefined
  if (Array.isArray(value)) {
    for (const entry of value) {
      const companionCheck = findRewardCompanionCheckForItem(entry, itemId)
      if (companionCheck) return companionCheck
    }
    return undefined
  }

  const record = value as Record<string, unknown>
  const rewards = record.rewards
  if (Array.isArray(rewards)) {
    for (const reward of rewards) {
      if (!reward || typeof reward !== 'object') continue
      const rewardRecord = reward as Record<string, unknown>
      if (String(rewardRecord.targetId || '') === itemId) {
        return getCompanionCheck(rewardRecord.requirements)
      }
    }

    for (const reward of rewards) {
      const companionCheck = findRewardCompanionCheckForItem(reward, itemId)
      if (companionCheck) return companionCheck
    }
  }

  for (const key of [
    'settings',
    'endless',
    'slots',
    'milestones',
    'repeatingRewards',
    'buckets',
    'prizes',
    'screens',
  ]) {
    const companionCheck = findRewardCompanionCheckForItem(record[key], itemId)
    if (companionCheck) return companionCheck
  }

  return undefined
}

function hasRewardForItem(value: unknown, itemId: string): boolean {
  if (!value || typeof value !== 'object') return false
  if (Array.isArray(value)) return value.some((entry) => hasRewardForItem(entry, itemId))

  const record = value as Record<string, unknown>
  const rewards = record.rewards
  if (Array.isArray(rewards)) {
    if (
      rewards.some((reward) => {
        if (!reward || typeof reward !== 'object') return false
        return String((reward as Record<string, unknown>).targetId || '') === itemId
      })
    ) {
      return true
    }

    if (rewards.some((reward) => hasRewardForItem(reward, itemId))) return true
  }

  for (const key of [
    'settings',
    'endless',
    'slots',
    'milestones',
    'repeatingRewards',
    'buckets',
    'prizes',
    'screens',
  ]) {
    if (hasRewardForItem(record[key], itemId)) return true
  }

  return false
}

function findFieldObservationCompanionCheck(value: unknown, itemId: string): PokemonCriteria | undefined {
  if (!value || typeof value !== 'object') return undefined
  const settings = (value as Record<string, unknown>).settings
  if (!settings || typeof settings !== 'object') return undefined
  const itemDrops = (settings as Record<string, unknown>).itemDrops
  if (!Array.isArray(itemDrops)) return undefined

  for (const drop of itemDrops) {
    if (!drop || typeof drop !== 'object') continue
    const dropRecord = drop as Record<string, unknown>
    if (String(dropRecord.itemId || '') === itemId) {
      return getCompanionCheck(dropRecord.requirements)
    }
  }

  return undefined
}

function hasFieldObservationItemDrop(value: unknown, itemId: string): boolean {
  if (!value || typeof value !== 'object') return false
  const settings = (value as Record<string, unknown>).settings
  if (!settings || typeof settings !== 'object') return false
  const itemDrops = (settings as Record<string, unknown>).itemDrops
  if (!Array.isArray(itemDrops)) return false

  return itemDrops.some((drop) => {
    if (!drop || typeof drop !== 'object') return false
    return String((drop as Record<string, unknown>).itemId || '') === itemId
  })
}

function findMoveDexSource(itemId: string): MoveDexSourceMatch | null {
  for (const location of locations) {
    if (hasRewardForItem(location, itemId)) {
      return {
        source: location,
        companionCheck: findRewardCompanionCheckForItem(location, itemId),
      }
    }
  }

  for (const battle of battles) {
    if (hasRewardForItem(battle, itemId)) {
      return {
        source: battle,
        companionCheck: findRewardCompanionCheckForItem(battle, itemId),
      }
    }
  }

  for (const game of allGames) {
    if (hasRewardForItem(game, itemId) || hasFieldObservationItemDrop(game, itemId)) {
      return {
        source: game,
        companionCheck:
          findRewardCompanionCheckForItem(game, itemId) ??
          findFieldObservationCompanionCheck(game, itemId),
      }
    }
  }

  for (const task of tasks) {
    if (hasRewardForItem(task, itemId)) {
      return {
        source: task,
        companionCheck: findRewardCompanionCheckForItem(task, itemId),
      }
    }
  }

  for (const shop of shops) {
    const shopItem = shop.items.find((entry) => hasRewardForItem(entry, itemId))
    if (shopItem) {
      return {
        source: shop,
        companionCheck: findRewardCompanionCheckForItem(shopItem, itemId),
      }
    }
  }

  return null
}

function getCompanionPokemonLabel(companionCheck: PokemonCriteria): string {
  if (companionCheck.speciesId) {
    const species = pokemonData.find((entry) => entry.id === Number(companionCheck.speciesId))
    const baseForm = species?.forms.find((form) => form.form === 'base') ?? species?.forms[0]
    if (baseForm?.name) return baseForm.name
  }

  if (companionCheck.formId) {
    for (const species of pokemonData) {
      const form = species.forms.find((entry) => String(entry.id) === String(companionCheck.formId))
      if (form) return form.name
    }
  }

  if (companionCheck.type) return `${companionCheck.type}-type Pokemon`

  return 'Pokemon'
}

function getResearchRewardPokemonLabel(itemId: string): string | null {
  const matchingFormIds = [
    ...new Set(
      researchLevelRewards
        .filter((reward) => reward.itemId === itemId)
        .map((reward) => String(reward.formId)),
    ),
  ]

  if (matchingFormIds.length === 0) return null

  if (
    matchingFormIds.length > 1 &&
    matchingFormIds.every((formId) => FIRST_PARTNER_FORM_IDS.has(formId))
  ) {
    return 'first partner Pokemon'
  }

  const form = getPokemonForm(matchingFormIds[0])
  return form?.name || 'Pokemon'
}

function getMoveDexUnlockClue(itemId: string): string {
  const researchPokemonLabel = getResearchRewardPokemonLabel(itemId)
  if (researchPokemonLabel) {
    return `You can develop this TM by researching a ${researchPokemonLabel}.`
  }

  const match = findMoveDexSource(itemId)
  if (!match) return 'No unlock clue has been discovered for this TM yet.'

  const region = resolveRegion(match.source.category, match.source.subCategory) || match.source.category || 'unknown'
  const subCategory = match.source.subCategory || match.source.category || 'somewhere'
  const regionLabel = region === 'unknown' ? 'an unknown' : `the ${region}`
  const companionClue = match.companionCheck
    ? ` A ${getCompanionPokemonLabel(match.companionCheck)} may be able to help you find this.`
    : ''

  return `This can be found in ${subCategory} in ${regionLabel} region.${companionClue}`
}

export const ALL_MOVE_DEX_ENTRIES: MoveDexEntry[] = items
  .filter((item) => item.category === 'tm' && !!item.moveId)
  .map((item) => {
    const move = ALL_MOVES_BY_ID[item.moveId!]
    if (!move || !item.moveId) return null

    return {
      move,
      item,
      itemId: item.id,
      moveType: getMoveDisplayType(move),
      unlockClue: getMoveDexUnlockClue(item.id),
    }
  })
  .filter((entry): entry is MoveDexEntry => !!entry)
  .sort((a, b) => {
    const typeDiff = a.moveType.localeCompare(b.moveType)
    if (typeDiff !== 0) return typeDiff
    return a.move.name.localeCompare(b.move.name)
  })

export function getMoveTypeLabel(type: string) {
  if (type === 'random') return 'Random'
  return type.charAt(0).toUpperCase() + type.slice(1)
}

export function getMoveLearnersForMove(move: MoveConfig): {
  learners: MoveDexLearner[]
  allPokemon: boolean
} {
  const allowedForms = new Set(move.formId?.map((formId) => String(formId)) ?? [])
  const learners: MoveDexLearner[] = []

  for (const species of pokemonData) {
    for (const form of species.forms) {
      if (!allowedForms.has(String(form.id))) continue

      learners.push({
        speciesId: species.id,
        form: {
          id: String(form.id),
          name: form.name,
        },
      })
    }
  }

  return {
    learners: learners.sort((a, b) => {
      if (a.speciesId !== b.speciesId) return a.speciesId - b.speciesId
      return Number(a.form.id) - Number(b.form.id)
    }),
    allPokemon: false,
  }
}
