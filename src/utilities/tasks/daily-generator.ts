import { Task, TaskCondition, Location, LocationEncounter, Reward } from '@/data/types'
import { RequirementData, checkRequirement } from '@/utilities/requirements'
import { v4 as uuidv4 } from 'uuid'
import { locations } from '@/data/locations'
import { getPokemonSpecies } from '@/utilities/pokemon/pokedex'

function getRandomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

type GenerateDailyTasksOptions = {
  date?: Date
}

const CARD_CRYSTALIZER_ITEM_ID = 'card-crystalizer'

export function generateDailyTasks(userData: RequirementData, options: GenerateDailyTasksOptions = {}): Task[] {
  const tasks: Task[] = []
  const rewardDate = options.date || new Date()
  const scripReward = rewardDate.getUTCDay() === 0 ? 10 : 5
  const tutorialUnlockRequirement: TaskCondition = {
    type: 'task_completed',
    targetId: 'tutorial-16',
    battleStatus: 'win',
  }
  const pickReward = (): Reward[] => [
    {
      type: 'currency',
      targetId: 'prof-scrip',
      quantity: scripReward,
      dropChance: 100,
    },
  ]

  // Type 1: Catching
  const catchingTarget = getRandomInt(5, 20)
  const roll = Math.random()

  const types = [
    'Normal',
    'Fire',
    'Water',
    'Electric',
    'Grass',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dragon',
    'Steel',
    'Dark',
    'Fairy',
  ]
  const randomType = types[Math.floor(Math.random() * types.length)]

  const accessibleLocations = locations.filter((loc: Location) => {
    if (!loc.requirements || loc.requirements.length === 0) return true
    return loc.requirements.every((req: TaskCondition) =>
      checkRequirement(userData, req, { category: loc.category, subCategory: loc.subCategory }),
    )
  })

  const availableSpeciesMap = new Map<number, string>()
  accessibleLocations.forEach((loc: Location) => {
    loc.encounters.forEach((enc: LocationEncounter) => {
      const speciesData = getPokemonSpecies(enc.speciesId)
      if (speciesData && !speciesData.is_legendary && !speciesData.is_mythical) {
        availableSpeciesMap.set(enc.speciesId, speciesData.name)
      }
    })
  })

  const speciesPool = Array.from(availableSpeciesMap.entries()).map(([id, name]) => ({ id, name }))
  const fallbackSpecies = [
    { id: 16, name: 'Pidgey' },
    { id: 19, name: 'Rattata' },
  ]
  const finalSpeciesPool = speciesPool.length > 0 ? speciesPool : fallbackSpecies
  const randomSpecies = finalSpeciesPool[Math.floor(Math.random() * finalSpeciesPool.length)]

  let name = `Catch ${catchingTarget} Pokemon`
  let description = `Catch ${catchingTarget} Pokemon of any type to complete this daily task.`
  let critCriteria: any = {}

  if (roll < 0.33) {
    name = `Catch ${catchingTarget} ${randomType} Pokemon`
    description = `Catch ${catchingTarget} ${randomType} type Pokemon to complete this daily task.`
    critCriteria = { type: randomType }
  } else if (roll < 0.66) {
    name = `Catch ${catchingTarget} ${randomSpecies.name}`
    description = `Catch ${catchingTarget} ${randomSpecies.name} to complete this daily task.`
    critCriteria = { speciesId: randomSpecies.id }
  }

  tasks.push({
    id: 'daily-1',
    name,
    description,
    category: 'Daily',
    icon: { type: 'item', id: 'poke-ball' },
    repeatable: false,
    daily: true,
    completionTrigger: 'manual',
    requirements: [tutorialUnlockRequirement],
    criteria: [
      {
        type: 'daily_catch',
        count: catchingTarget,
        progress: 0,
        pokemonCriteria: Object.keys(critCriteria).length > 0 ? critCriteria : undefined,
      },
    ],
    rewards: pickReward(),
  })

  // Type 2: Battling
  const battleTarget = getRandomInt(5, 15)
  const isTrainerBattle = Math.random() > 0.5

  tasks.push({
    id: 'daily-2',
    name: isTrainerBattle
      ? `Win ${battleTarget} Trainer Battles`
      : `Win ${battleTarget} Wild Battles`,
    description: isTrainerBattle
      ? `Win ${battleTarget} battles against trainers.`
      : `Win ${battleTarget} wild encounter battles.`,
    category: 'Daily',
    icon: { type: 'item', id: 'vs-seeker' },
    repeatable: false,
    daily: true,
    completionTrigger: 'manual',
    requirements: [tutorialUnlockRequirement],
    criteria: [
      {
        type: 'daily_battle',
        count: battleTarget,
        progress: 0,
        battleType: isTrainerBattle ? 'trainer' : 'wild',
      },
    ],
    rewards: pickReward(),
  })

  // Type 3: Gems
  const gemTarget = getRandomInt(3, 15)
  const gemTypes = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'steel',
    'dark',
    'fairy',
  ]
  const randomGemType = gemTypes[Math.floor(Math.random() * gemTypes.length)]
  const gemId = `${randomGemType}-gem`

  tasks.push({
    id: 'daily-3',
    name: `Deliver ${gemTarget} ${randomGemType.charAt(0).toUpperCase() + randomGemType.slice(1)} Gems`,
    description: `Deliver ${gemTarget} ${randomGemType} gems to the daily researcher. These will be consumed.`,
    category: 'Daily',
    icon: { type: 'item', id: gemId },
    repeatable: false,
    daily: true,
    completionTrigger: 'manual',
    requirements: [tutorialUnlockRequirement],
    criteria: [
      {
        type: 'item_owned',
        targetId: gemId,
        count: gemTarget,
        consume: true,
      },
    ],
    rewards: pickReward(),
  })

  // Type 4: Cards
  const cardRoll = Math.random()
  const hasCardCrystalizer = userData.inventory.some(
    (item) => item.itemId === CARD_CRYSTALIZER_ITEM_ID && item.quantity > 0,
  )
  const isCrystalize = hasCardCrystalizer && cardRoll > 0.5

  if (isCrystalize) {
    const crystalizeTarget = getRandomInt(10, 25)
    tasks.push({
      id: 'daily-4',
      name: `Crystalize ${crystalizeTarget} Cards`,
      description: `Crystalize ${crystalizeTarget} TCG Cards today to earn rewards!`,
      category: 'Daily',
      icon: { type: 'item', id: 'revive' },
      repeatable: false,
      daily: true,
      completionTrigger: 'manual',
      requirements: [tutorialUnlockRequirement],
      criteria: [
        {
          type: 'daily_crystalize',
          count: crystalizeTarget,
          progress: 0,
        },
      ],
      rewards: pickReward(),
    })
  } else {
    const cardTarget = getRandomInt(15, 30)
    tasks.push({
      id: 'daily-4',
      name: `Collect ${cardTarget} Cards`,
      description: `Collect ${cardTarget} TCG Cards today. Opening packs or discovering cards counts!`,
      category: 'Daily',
      icon: { type: 'item', id: 'binder-base1' },
      repeatable: false,
      daily: true,
      completionTrigger: 'manual',
      requirements: [tutorialUnlockRequirement],
      criteria: [
        {
          type: 'daily_card',
          count: cardTarget,
          progress: 0,
        },
      ],
      rewards: pickReward(),
    })
  }

  return tasks
}
