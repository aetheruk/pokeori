import type { Location, LocationEncounter, Reward } from '@/data/types'
import type { DailyActivityKind, Task, TaskCondition, TaskIcon } from '@/data/tasks'
import { battles } from '@/data/battles'
import { allGames } from '@/data/games'
import { artisanRecipes } from '@/data/artisan'
import { items, isCraftingMaterialItem } from '@/data/items'
import { locations } from '@/data/locations'
import { shops } from '@/data/shops'
import { voyages } from '@/data/voyages'
import { TYPE_MATERIAL_CONFIG } from '@/utilities/artisan/material-drops'
import { getPokemonSpecies } from '@/utilities/pokemon/pokedex'
import { checkRequirement, type RequirementData } from '@/utilities/requirements'
import { getSkillLevel } from '@/utilities/skills/unlocks'
import { isOutOfStock } from '@/utilities/shops/stock'

type GenerateDailyTasksOptions = {
  date?: Date
  previousTasks?: Task[]
  random?: () => number
}

const DAILY_CHALLENGE_COUNT = 6
const DAILY_STANDARD_SCRIP_REWARD = 5
const DAILY_BONUS_SCRIP_REWARD = 25

type DailyCandidate = {
  family: string
  templateId: string
  signature: string
  name: string
  description: string
  icon: TaskIcon
  criteria: TaskCondition[]
  sourceHint: string
}

type RewardSource = {
  id: string
  name: string
  hint: string
  rewards: Reward[]
}

const CARD_CRYSTALIZER_ITEM_ID = 'card-crystalizer'
const BASE_GEM_IDS = new Set(
  [
    'normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground',
    'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'steel', 'dark', 'fairy',
  ].map((type) => `${type}-gem`),
)

const GAMBLING_GAME_TYPES = new Set(['slots', 'pachinko', 'prize-wheel'])

function randomInt(random: () => number, min: number, max: number): number {
  return Math.floor(random() * (max - min + 1)) + min
}

function chooseOne<T>(random: () => number, values: T[]): T | undefined {
  if (values.length === 0) return undefined
  return values[Math.min(values.length - 1, Math.floor(random() * values.length))]
}

function titleCase(value: string) {
  return value.replace(/(^|[-\s])(\w)/g, (_, separator, letter) => `${separator}${letter.toUpperCase()}`)
}

function conditionsPass(
  userData: RequirementData,
  conditions: TaskCondition[] | undefined,
  context: { category?: string; subCategory?: string },
  allowFarmableCosts = false,
) {
  return (conditions || []).every((condition) => {
    if (
      allowFarmableCosts &&
      (condition.type === 'item_owned' || condition.type === 'currency_owned' || condition.consume)
    ) {
      return true
    }
    return checkRequirement(userData, condition, context)
  })
}

function isVisibleSource(
  entry: {
    category?: string
    hide?: string
    isRandomEvent?: boolean
    requirements?: TaskCondition[]
    criteria?: TaskCondition[]
  },
  userData: RequirementData,
) {
  if (entry.category === 'Test' || entry.category === 'Secret' || entry.isRandomEvent) return false
  if (entry.hide && userData.completedTasks.some((task) => task.taskId === entry.hide)) return false
  const context = { category: entry.category, subCategory: (entry as any).subCategory }
  return (
    conditionsPass(userData, entry.requirements, context) &&
    conditionsPass(userData, entry.criteria, context, true)
  )
}

function toDailyActivity(
  kind: DailyActivityKind,
  count: number,
  options: Pick<TaskCondition, 'pokemonCriteria' | 'battleType'> & { sourceIds?: string[] } = {},
): TaskCondition {
  return {
    type: 'daily_activity',
    count,
    progress: 0,
    pokemonCriteria: options.pokemonCriteria,
    battleType: options.battleType,
    dailyActivity: { kind, sourceIds: options.sourceIds },
  }
}

function accessibleCatchEncounters(userData: RequirementData) {
  const result: Array<{ location: Location; encounter: LocationEncounter; species: ReturnType<typeof getPokemonSpecies> }> = []

  for (const location of locations) {
    if (!isVisibleSource(location, userData)) continue
    for (const encounter of location.encounters) {
      if (!conditionsPass(userData, encounter.requirements, {
        category: location.category,
        subCategory: location.subCategory,
      })) {
        continue
      }
      const species = getPokemonSpecies(encounter.speciesId)
      if (!species || species.is_legendary || species.is_mythical) continue
      result.push({ location, encounter, species })
    }
  }

  return result
}

function getRewardSources(userData: RequirementData): RewardSource[] {
  const sources: RewardSource[] = []

  for (const location of locations) {
    if (isVisibleSource(location, userData)) {
      sources.push({
        id: `location:${location.id}`,
        name: location.name,
        hint: `Available at ${location.name}`,
        rewards: location.rewards,
      })
    }
  }

  for (const battle of battles) {
    if (!battle.pvp && isVisibleSource(battle, userData)) {
      sources.push({
        id: `battle:${battle.id}`,
        name: battle.name,
        hint: `Available at ${battle.name}`,
        rewards: battle.rewards,
      })
    }
  }

  for (const game of allGames) {
    if (!GAMBLING_GAME_TYPES.has(game.gameType) && isVisibleSource(game, userData)) {
      sources.push({
        id: `research:${game.id}`,
        name: game.name,
        hint: `Available at ${game.name}`,
        rewards: game.rewards,
      })
    }
  }

  for (const voyage of voyages) {
    if (voyage.isRepeatable && voyage.successChance === 100 && isVisibleSource(voyage as any, userData)) {
      sources.push({
        id: `voyage:${voyage.id}`,
        name: voyage.name,
        hint: `Available from ${voyage.name}`,
        rewards: voyage.rewards,
      })
    }
  }

  for (const shop of shops) {
    if (!isVisibleSource(shop, userData)) continue
    const purchases = (userData.shopPurchases || {}) as Record<string, any>
    for (const shopItem of shop.items) {
      if (!conditionsPass(userData, shopItem.requirements, {
        category: shop.category,
        subCategory: shop.subCategory,
      })) continue
      if (isOutOfStock(shopItem, purchases[shopItem.id])) continue
      sources.push({
        id: `shop:${shop.id}:${shopItem.id}`,
        name: shopItem.name,
        hint: `Available from ${shop.name}`,
        rewards: shopItem.rewards,
      })
    }
  }

  return sources
}

function buildCandidates(userData: RequirementData, random: () => number): DailyCandidate[] {
  const candidates: DailyCandidate[] = []
  const encounters = accessibleCatchEncounters(userData)
  const encounterBySpecies = new Map<number, (typeof encounters)[number]>()
  const encounterByType = new Map<string, (typeof encounters)[number]>()

  for (const entry of encounters) {
    encounterBySpecies.set(entry.encounter.speciesId, entry)
    for (const type of entry.species?.types || []) {
      const normalized = type.toLowerCase()
      if (!encounterByType.has(normalized)) encounterByType.set(normalized, entry)
    }
  }

  const anyEncounter = encounters[0]
  if (anyEncounter) {
    const count = randomInt(random, 3, 5)
    candidates.push({
      family: 'catch',
      templateId: 'catch-any',
      signature: 'catch:any',
      name: `Catch ${count} Pokemon`,
      description: `Catch ${count} Pokemon from unlocked field locations.`,
      icon: { type: 'item', id: 'poke-ball' },
      criteria: [toDailyActivity('catch', count)],
      sourceHint: `Available at ${anyEncounter.location.name}`,
    })
  }

  for (const [type, entry] of encounterByType) {
    const count = randomInt(random, 2, 4)
    candidates.push({
      family: 'catch',
      templateId: 'catch-type',
      signature: `catch:type:${type}`,
      name: `Catch ${count} ${titleCase(type)} Pokemon`,
      description: `Catch ${count} ${titleCase(type)} type Pokemon from unlocked field locations.`,
      icon: { type: 'item', id: 'poke-ball' },
      criteria: [toDailyActivity('catch', count, { pokemonCriteria: { type } })],
      sourceHint: `Available at ${entry.location.name}`,
    })
  }

  for (const [speciesId, entry] of encounterBySpecies) {
    const count = randomInt(random, 1, 3)
    candidates.push({
      family: 'catch',
      templateId: 'catch-species',
      signature: `catch:species:${speciesId}`,
      name: `Catch ${count} ${entry.species?.name || 'Pokemon'}`,
      description: `Catch ${count} ${entry.species?.name || 'Pokemon'} from unlocked field locations.`,
      icon: { type: 'pokemon', id: String(speciesId) },
      criteria: [toDailyActivity('catch', count, { pokemonCriteria: { speciesId } })],
      sourceHint: `Available at ${entry.location.name}`,
    })
  }

  const eligibleBattles = battles.filter((battle) => !battle.pvp && isVisibleSource(battle, userData))
  for (const battleType of ['wild', 'trainer'] as const) {
    const battle = eligibleBattles.find((entry) => Boolean(entry.isWildBattle) === (battleType === 'wild'))
    if (!battle) continue
    const count = randomInt(random, battleType === 'wild' ? 2 : 1, battleType === 'wild' ? 3 : 2)
    candidates.push({
      family: 'battle',
      templateId: `battle-${battleType}`,
      signature: `battle:${battleType}`,
      name: battleType === 'wild' ? `Win ${count} Wild Battles` : `Win ${count} Trainer Battles`,
      description: battleType === 'wild'
        ? `Win ${count} battles against wild Pokemon.`
        : `Win ${count} battles against trainers.`,
      icon: { type: 'item', id: 'vs-seeker' },
      criteria: [toDailyActivity('battle_win', count, { battleType })],
      sourceHint: `Available at ${battle.name}`,
    })
  }

  for (const game of allGames) {
    if (
      game.gameType === 'fishing' ||
      game.gameType === 'tcg-battle' ||
      GAMBLING_GAME_TYPES.has(game.gameType) ||
      !isVisibleSource(game, userData)
    ) continue
    candidates.push({
      family: 'research',
      templateId: 'research-win',
      signature: `research:${game.id}`,
      name: `Complete ${game.name}`,
      description: `Win one round of ${game.name}.`,
      icon: game.icon,
      criteria: [toDailyActivity('research_win', 1, { sourceIds: [game.id] })],
      sourceHint: `Available at ${game.name}`,
    })
  }

  for (const game of allGames) {
    if (game.gameType !== 'fishing' || !isVisibleSource(game, userData)) continue
    const count = randomInt(random, 1, 2)
    candidates.push({
      family: 'fishing',
      templateId: 'fishing-catch',
      signature: `fishing:${game.id}`,
      name: `Catch ${count} Pokemon while Fishing`,
      description: `Catch ${count} Pokemon at ${game.name}.`,
      icon: game.icon,
      criteria: [toDailyActivity('fishing_catch', count, { sourceIds: [game.id] })],
      sourceHint: `Available at ${game.name}`,
    })
  }

  const artisanLevel = getSkillLevel((userData.user as any).skills, 'artisan')
  for (const recipe of artisanRecipes) {
    if (
      artisanLevel < recipe.artisanLevel ||
      !conditionsPass(userData, recipe.requirements, {}) ||
      !conditionsPass(userData, recipe.criteria, {}, true)
    ) continue
    candidates.push({
      family: 'artisan',
      templateId: 'artisan-craft',
      signature: `artisan:${recipe.id}`,
      name: `Craft ${recipe.name}`,
      description: `Successfully craft ${recipe.name}.`,
      icon: { type: 'item', id: recipe.iconItemId || recipe.rewards[0]?.targetId?.toString() || 'poke-ball' },
      criteria: [toDailyActivity('craft_success', 1, { sourceIds: [recipe.id] })],
      sourceHint: `Available in Artisan work at level ${recipe.artisanLevel}`,
    })
  }

  const purchases = (userData.shopPurchases || {}) as Record<string, any>
  for (const shop of shops) {
    if (!isVisibleSource(shop, userData)) continue
    for (const shopItem of shop.items) {
      if (
        !conditionsPass(userData, shopItem.requirements, { category: shop.category, subCategory: shop.subCategory }) ||
        isOutOfStock(shopItem, purchases[shopItem.id])
      ) continue
      candidates.push({
        family: 'shop',
        templateId: 'shop-purchase',
        signature: `shop:${shop.id}:${shopItem.id}`,
        name: `Buy ${shopItem.name}`,
        description: `Purchase ${shopItem.name} from ${shop.name}.`,
        icon: shopItem.icon || shop.icon,
        criteria: [toDailyActivity('shop_purchase', 1, { sourceIds: [`${shop.id}:${shopItem.id}`] })],
        sourceHint: `Available from ${shop.name}`,
      })
    }
  }

  for (const voyage of voyages) {
    if (
      !voyage.isRepeatable ||
      voyage.successChance !== 100 ||
      voyage.durationMinutes > 24 * 60 ||
      !isVisibleSource(voyage as any, userData)
    ) continue
    candidates.push({
      family: 'voyage',
      templateId: 'voyage-success',
      signature: `voyage:${voyage.id}`,
      name: `Complete ${voyage.name}`,
      description: `Send a compatible team on ${voyage.name} and collect a successful return.`,
      icon: voyage.icon,
      criteria: [toDailyActivity('voyage_success', 1, { sourceIds: [voyage.id] })],
      sourceHint: `Available from ${voyage.name}`,
    })
  }

  const rewardSources = getRewardSources(userData)
  const hasBoosterPack = userData.inventory.some((entry) => items.find((item) => item.id === entry.itemId)?.category === 'booster-pack')
  const tcgShopSource = rewardSources.find((source) =>
    source.rewards.some((reward) => items.find((item) => item.id === reward.targetId)?.category === 'booster-pack'),
  )
  if (hasBoosterPack || tcgShopSource) {
    const sourceHint = hasBoosterPack ? 'Open an owned booster pack from your TCG collection.' : tcgShopSource!.hint
    candidates.push({
      family: 'tcg',
      templateId: 'tcg-collect',
      signature: 'tcg:collect',
      name: 'Collect 5 Cards',
      description: 'Open packs or discover five TCG cards.',
      icon: { type: 'item', id: 'binder-base1' },
      criteria: [toDailyActivity('card_collected', 5)],
      sourceHint,
    })
  }

  const hasCrystalizer = userData.inventory.some((item) => item.itemId === CARD_CRYSTALIZER_ITEM_ID && item.quantity > 0)
  const duplicateCount = userData.tcg.reduce((total, card: any) => total + Math.max(0, (card.quantity || 0) - 1), 0)
  if (hasCrystalizer && duplicateCount > 0) {
    const count = randomInt(random, 1, Math.min(3, duplicateCount))
    candidates.push({
      family: 'tcg',
      templateId: 'tcg-crystalize',
      signature: 'tcg:crystalize',
      name: `Crystalize ${count} Cards`,
      description: `Crystalize ${count} duplicate TCG cards.`,
      icon: { type: 'item', id: 'revive' },
      criteria: [toDailyActivity('card_crystalized', count)],
      sourceHint: 'Available from duplicate cards in your TCG collection.',
    })
  }

  const itemById = new Map(items.map((item) => [item.id, item]))
  for (const source of rewardSources) {
    for (const reward of source.rewards) {
      if (reward.type !== 'item' || typeof reward.targetId !== 'string') continue
      if ((reward.dropChance ?? 100) < 100) continue
      const item = itemById.get(reward.targetId)
      if (!item) continue

      if (BASE_GEM_IDS.has(item.id)) {
        const count = randomInt(random, 1, 3)
        candidates.push({
          family: 'gem-delivery',
          templateId: 'deliver-gem',
          signature: `gem:${item.id}`,
          name: `Deliver ${count} ${item.name}${count === 1 ? '' : 's'}`,
          description: `Deliver ${count} ${item.name}${count === 1 ? '' : 's'} to the daily researcher. These will be consumed.`,
          icon: { type: 'item', id: item.id },
          criteria: [{ type: 'item_owned', targetId: item.id, count, consume: true }],
          sourceHint: source.hint,
        })
      }

      if (item.category === 'berry') {
        const count = randomInt(random, 2, 4)
        candidates.push({
          family: 'berry-delivery',
          templateId: 'deliver-berry',
          signature: `berry:${item.id}`,
          name: `Deliver ${count} ${item.name}${count === 1 ? '' : 's'}`,
          description: `Deliver ${count} ${item.name}${count === 1 ? '' : 's'} to the daily researcher. These will be consumed.`,
          icon: { type: 'item', id: item.id },
          criteria: [{ type: 'item_owned', targetId: item.id, count, consume: true }],
          sourceHint: source.hint,
        })
      }
    }
  }

  for (const entry of encounters) {
    // Capture material rewards select one type for dual-type Pokemon. Restrict
    // delivery sources to single-type encounters so the displayed material is
    // genuinely guaranteed by the hinted catch.
    if ((entry.species?.types || []).length !== 1) continue
    const type = entry.species?.types?.[0]?.toLowerCase()
    const materialFamily = type ? TYPE_MATERIAL_CONFIG[type]?.family : undefined
    if (!materialFamily) continue
    const itemId = `${materialFamily}-t1`
    const item = itemById.get(itemId)
    if (!item || !isCraftingMaterialItem(item)) continue
    const count = randomInt(random, 1, 3)
    candidates.push({
      family: 'material-delivery',
      templateId: 'deliver-material',
      signature: `material:${itemId}`,
      name: `Deliver ${count} ${item.name}${count === 1 ? '' : 's'}`,
      description: `Deliver ${count} ${item.name}${count === 1 ? '' : 's'} to the daily researcher. These will be consumed.`,
      icon: { type: 'item', id: item.id },
      criteria: [{ type: 'item_owned', targetId: item.id, count, consume: true }],
      sourceHint: `Guaranteed when catching Pokemon at ${entry.location.name}`,
    })
  }

  return candidates
}

function selectCandidates(
  candidates: DailyCandidate[],
  previousTasks: Task[] | undefined,
  random: () => number,
) {
  const selected: DailyCandidate[] = []
  const previousMetadata = (previousTasks || []).map((task) => task.dailyMetadata).filter(Boolean)
  const previousFamilies = new Set(previousMetadata.map((metadata) => metadata!.family))
  const previousSignatures = new Set(previousMetadata.map((metadata) => metadata!.signature))
  const remaining = [...candidates]

  while (selected.length < DAILY_CHALLENGE_COUNT && remaining.length > 0) {
    const currentFamilies = new Set(selected.map((candidate) => candidate.family))
    const scored = remaining.map((candidate) => ({
      candidate,
      score:
        (currentFamilies.has(candidate.family) ? 100 : 0) +
        (previousFamilies.has(candidate.family) ? 10 : 0) +
        (previousSignatures.has(candidate.signature) ? 1 : 0),
    }))
    const bestScore = Math.min(...scored.map((entry) => entry.score))
    const best = scored.filter((entry) => entry.score === bestScore).map((entry) => entry.candidate)
    const picked = chooseOne(random, best)
    if (!picked) break
    selected.push(picked)
    const index = remaining.indexOf(picked)
    remaining.splice(index, 1)
  }

  // Only a malformed or extremely early data set reaches this fallback. Reuse
  // eligible templates rather than creating an impossible hard-coded task.
  while (selected.length < DAILY_CHALLENGE_COUNT && candidates.length > 0) {
    const picked = chooseOne(random, candidates)
    if (!picked) break
    selected.push(picked)
  }

  return selected
}

export function generateDailyTasks(
  userData: RequirementData,
  options: GenerateDailyTasksOptions = {},
): Task[] {
  const random = options.random || Math.random
  const tutorialUnlockRequirement: TaskCondition = {
    type: 'task_completed',
    targetId: 'tutorial-16',
    battleStatus: 'win',
  }
  const reward: Reward[] = [{
    type: 'currency',
    targetId: 'prof-scrip',
    quantity: DAILY_STANDARD_SCRIP_REWARD,
    dropChance: 100,
  }]

  const selectedCandidates = selectCandidates(buildCandidates(userData, random), options.previousTasks, random)
  const bonusIndex = selectedCandidates.length > 0
    ? randomInt(random, 0, selectedCandidates.length - 1)
    : -1

  return selectedCandidates.map(
    (candidate, index) => ({
      id: `daily-${index + 1}`,
      name: candidate.name,
      description: candidate.description,
      category: 'Daily',
      icon: candidate.icon,
      repeatable: false,
      daily: true,
      completionTrigger: 'manual',
      requirements: [tutorialUnlockRequirement],
      criteria: candidate.criteria,
      rewards: reward.map((entry) => ({
        ...entry,
        quantity: typeof entry.quantity === 'number' && index === bonusIndex
          ? DAILY_BONUS_SCRIP_REWARD
          : entry.quantity,
      })),
      dailyMetadata: {
        family: candidate.family,
        templateId: candidate.templateId,
        signature: candidate.signature,
        sourceHint: candidate.sourceHint,
        isBonus: index === bonusIndex,
      },
    }),
  )
}
