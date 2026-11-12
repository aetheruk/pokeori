import type { TcgBattleEnergyType } from '@/utilities/tcg/tcg-battle'
import { UNDERGROUND_SOCIETY_GUILD_ID } from '@/data/guilds/underground-society'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import type { TcgBattleGameConfig } from '../types'

const tutorialRequirement = {
  type: 'task_completed' as const,
  targetId: 'underground-tcg-battle-wrapup',
}

function promoReward(cardId: string, dropChance: number) {
  return {
    type: 'card' as const,
    quantity: 1,
    dropChance,
    requirements: [
      { type: 'card_collected_specific' as const, targetId: cardId, inverse: true },
    ],
    cardDrawParams: { allowedCardIds: [cardId], guaranteed: true },
  }
}

function incompleteSetRequirement(setId: string) {
  const setSummary = tcgSetSummaries.find((set) => set.id === setId)
  if (!setSummary) throw new Error(`Missing TCG set summary for ${setId}`)

  return {
    type: 'card_collected_set' as const,
    targetId: setId,
    count: setSummary.total,
    unique: true,
    inverse: true,
  }
}

function packReward(itemId: string, setId: string) {
  return {
    type: 'item' as const,
    targetId: itemId,
    quantity: 1,
    dropChance: 100,
    requirements: [incompleteSetRequirement(setId)],
  }
}

function missingSetCardReward(setId: string) {
  return {
    type: 'card' as const,
    quantity: 1,
    dropChance: 80,
    requirements: [incompleteSetRequirement(setId)],
    cardDrawParams: {
      allowedSetIds: [setId],
      missingOnly: true,
      // All rarity odds become eligible; the reward can be any card rarity.
      rarityModifier: 1,
      bonusThreshold: 0,
      guaranteed: true,
    },
  }
}

function worldBattle(input: {
  id: string
  trainer: string
  trainerIcon: string
  category: string
  subCategory: string
  background: string
  energy: TcgBattleEnergyType
  colour: string
  cards: string[]
  additionalRequirements?: TcgBattleGameConfig['requirements']
  additionalRewards?: TcgBattleGameConfig['rewards']
}): TcgBattleGameConfig {
  return {
    id: input.id,
    gameType: 'tcg-battle',
    name: input.trainer,
    description: `Challenge ${input.trainer} to a TCG battle!`,
    category: input.category,
    subCategory: input.subCategory,
    icon: { type: 'trainer', id: input.trainerIcon },
    background: input.background,
    requirements: [tutorialRequirement, ...(input.additionalRequirements || [])],
    rewards: [
      { type: 'currency', targetId: 'crystals', quantity: 100, dropChance: 100 },
      {
        type: 'guild_xp',
        targetId: UNDERGROUND_SOCIETY_GUILD_ID,
        quantity: 25,
        dropChance: 100,
      },
      ...(input.additionalRewards || []),
    ],
    isEligibleForReplay: true,
    settings: {
      deckFormat: 'baby',
      requiredSeries: 'Base',
      opponentEnergyType: input.energy,
      opponentTrainerIcon: input.trainerIcon,
      themeColour: input.colour,
      opponentDeckCardIds: input.cards,
      cost: { amount: 50, currencyType: 'crystals' },
    },
  }
}

const bugCatcherBarryDeck = [
  'base1-69', 'base4-100', 'base1-45', 'base4-68', 'base2-63',
  'base4-97', 'base2-59', 'base4-85', 'basep-45', 'base2-10',
  'base1-33', 'base1-17', 'base1-54', 'base2-33', 'base2-13',
]

const channelerCarlyDeck = [
  'base1-50', 'base3-33', 'base4-75', 'basep-39', 'base1-43',
  'base4-65', 'base5-49', 'base1-49', 'base3-55', 'base5-67',
  'base1-29', 'base3-6', 'base4-43', 'base3-5', 'base3-20',
]

const billDeck = [
  'base2-51', 'base5-55', 'basep-11', 'base1-28', 'base4-42',
  'base2-54', 'base4-77', 'basep-7', 'base1-58', 'base2-60',
  'base2-3', 'base2-4', 'base2-12', 'base1-23', 'base2-16',
]

const boredGruntDeck = [
  'base2-56', 'base4-80', 'base5-62', 'basep-10', 'basep-18',
  'base5-56', 'base5-58', 'base5-57', 'base5-63', 'base5-70',
  'basep-17', 'base2-42', 'base4-56', 'base5-42', 'base3-31',
]

const dayCareCoupleDeck = [
  'base1-28', 'base4-42', 'base1-43', 'base4-65', 'base1-3',
  'base1-49', 'base2-52', 'base2-58', 'base3-55', 'base5-56',
  'base1-23', 'basep-6', 'base1-32', 'base4-46', 'base1-1',
]

const hikerMarcosDeck = [
  'base3-47', 'base3-37', 'base3-36', 'base1-47', 'base1-19',
  'base4-71', 'base5-52', 'base2-61', 'base2-45', 'base4-90',
  'base4-59', 'base1-62', 'base3-41', 'base1-56', 'base4-84',
]

export const kantoWorldTcgBattleEntries: TcgBattleGameConfig[] = [
  worldBattle({
    id: 'tcg-world-bug-catcher-barry',
    trainer: 'Bug Catcher Barry',
    trainerIcon: 'bug-catcher',
    category: 'Kanto',
    subCategory: 'Viridian Forest',
    background: '/backgrounds/forest.avif',
    energy: 'Grass',
    colour: '#65814d',
    cards: bugCatcherBarryDeck,
    additionalRewards: [
      packReward('pack-base2', 'base2'),
      missingSetCardReward('base2'),
      promoReward('basep-45', 35),
      promoReward('basep-27', 20),
    ],
  }),
  worldBattle({
    id: 'tcg-world-channeler-carly',
    trainer: 'Channeler Carly',
    trainerIcon: 'channeler',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    background: '/backgrounds/pkmn-tower.avif',
    energy: 'Psychic',
    colour: '#766b8f',
    cards: channelerCarlyDeck,
    additionalRequirements: [
      { type: 'task_completed', targetId: 'pokemon-tower-kita-resolution' },
    ],
    additionalRewards: [
      { type: 'item', targetId: 'spirit-wisp-t1', quantity: 5, dropChance: 100 },
      promoReward('basep-42', 35),
      promoReward('basep-39', 20),
    ],
  }),
  worldBattle({
    id: 'tcg-world-bill',
    trainer: 'Bill',
    trainerIcon: 'bill',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/cerulean.avif',
    energy: 'Colorless',
    colour: '#527e91',
    cards: billDeck,
    additionalRewards: [
      packReward('pack-base1', 'base1'),
      missingSetCardReward('base1'),
      promoReward('basep-11', 35),
      promoReward('basep-16', 20),
    ],
  }),
  worldBattle({
    id: 'tcg-world-celadon-bored-grunt',
    trainer: 'Bored Grunt',
    trainerIcon: 'rocket-grunt-m',
    category: 'Kanto',
    subCategory: 'Celadon City',
    background: '/backgrounds/celadon.avif',
    energy: 'Darkness',
    colour: '#7a554d',
    cards: boredGruntDeck,
    additionalRequirements: [
      { type: 'task_completed', targetId: 'explore-celadon-city' },
    ],
    additionalRewards: [
      packReward('pack-base5', 'base5'),
      missingSetCardReward('base5'),
      promoReward('basep-17', 35),
      promoReward('basep-18', 20),
    ],
  }),
  worldBattle({
    id: 'tcg-world-day-care-couple',
    trainer: 'Day Care Couple',
    trainerIcon: 'old-couple',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/cerulean.avif',
    energy: 'Colorless',
    colour: '#a07a57',
    cards: dayCareCoupleDeck,
    additionalRequirements: [
      { type: 'task_completed', targetId: 'day-care-egg-program' },
    ],
    additionalRewards: [
      {
        type: 'egg',
        quantity: 1,
        dropChance: 10,
        eggData: {
          rarity: 'normal',
          sourceBackground: '/backgrounds/tcg.avif',
          sourceRegion: 'Kanto',
          sourceLocation: 'Cerulean City',
        },
      },
      promoReward('basep-30', 35),
      promoReward('basep-31', 20),
      promoReward('basep-36', 20),
      promoReward('basep-35', 10),
    ],
  }),
  worldBattle({
    id: 'tcg-world-hiker-marcos',
    trainer: 'Hiker Marcos',
    trainerIcon: 'hiker',
    category: 'Kanto',
    subCategory: 'Pewter City',
    background: '/backgrounds/pewter.avif',
    energy: 'Fighting',
    colour: '#8b7355',
    cards: hikerMarcosDeck,
    additionalRewards: [
      packReward('pack-base3', 'base3'),
      missingSetCardReward('base3'),
      promoReward('basep-7', 35),
    ],
  }),
]
