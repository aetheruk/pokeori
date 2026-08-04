import type { TcgBattleGameConfig } from '../types'
import type { TcgBattleEnergyType } from '@/utilities/tcg/tcg-battle'

const undergroundBattleRequirements = (id: string, taskId: string) => [
  { type: 'task_completed' as const, targetId: taskId },
  { type: 'game_result' as const, targetId: id, battleStatus: 'win' as const, count: 1, inverse: true },
]

const rematchRequirements = [
  { type: 'task_completed' as const, targetId: 'underground-tcg-wrapup' },
]

const battle = (input: {
  id: string
  name: string
  description: string
  energy: TcgBattleEnergyType
  iconId: string
  colour: string
  cards: string[]
  requirements: ReturnType<typeof undergroundBattleRequirements> | typeof rematchRequirements
  reward: number
  replayable: boolean
}): TcgBattleGameConfig => ({
  id: input.id,
  gameType: 'tcg-battle',
  name: input.name,
  description: input.description,
  category: 'Underground',
  subCategory: 'Kanto Underground',
  icon: {
    type: 'pokemon',
    id: input.iconId,
  },
  background: '/backgrounds/kanto-underground.avif',
  requirements: input.requirements,
  rewards: [{ type: 'currency', targetId: 'pokedollars', quantity: input.reward }],
  isEligibleForReplay: input.replayable,
  settings: {
    deckFormat: 'baby',
    requiredSeries: 'Base',
    opponentEnergyType: input.energy,
    themeColour: input.colour,
    opponentDeckCardIds: input.cards,
  },
})

const tutorialCards = [
  'base1-26', 'base1-35', 'base1-41', 'base1-46', 'base1-47',
  'base1-52', 'base1-58', 'base1-61', 'base1-65', 'base1-67',
  'base2-49', 'base2-53', 'base2-55', 'base2-62', 'base3-56',
]

const fireCards = [
  'base1-46', 'base1-28', 'base1-68', 'base1-60', 'base1-36',
  'base3-39', 'base4-42', 'base4-51', 'base4-69', 'base1-24',
  'base1-12', 'base1-23', 'base2-3', 'base2-19', 'base1-4',
]
const waterCards = [
  'base1-63', 'base1-65', 'base1-41', 'base1-35', 'base3-49',
  'base3-51', 'base3-53', 'base3-54', 'base3-56', 'base1-42',
  'base1-64', 'base2-46', 'base3-35', 'base1-25', 'base3-10',
]
const grassCards = [
  'base1-44', 'base1-45', 'base1-69', 'base1-66', 'base1-51',
  'base1-55', 'base1-37', 'base1-30', 'base1-33', 'base1-54',
  'base2-9', 'base2-10', 'base2-13', 'base3-46', 'base3-48',
]

export const kantoUndergroundTcgBattleEntries: TcgBattleGameConfig[] = [
  battle({
    id: 'underground-tcg-battle-tutorial',
    name: 'Lost-and-Found Practice',
    description:
      'Play a first supervised match against HQ’s inexpensive collection of misplaced Basic cards.',
    energy: 'Colorless',
    iconId: '19',
    colour: '#746f63',
    cards: tutorialCards,
    requirements: undergroundBattleRequirements(
      'underground-tcg-battle-tutorial',
      'underground-tcg-practice-briefing',
    ),
    reward: 250,
    replayable: false,
  }),
  battle({
    id: 'underground-tcg-battle-fire',
    name: 'Cal’s Fire Deck',
    description: 'Challenge Cal’s endlessly demonstrated Fire deck and interrupt his internal playtest.',
    energy: 'Fire',
    iconId: '6',
    colour: '#b86148',
    cards: fireCards,
    requirements: undergroundBattleRequirements(
      'underground-tcg-battle-fire',
      'underground-tcg-cal-outreach',
    ),
    reward: 1000,
    replayable: false,
  }),
  battle({
    id: 'underground-tcg-battle-water',
    name: 'Marina’s Water Deck',
    description: 'Audit Marina’s Water deck and her extremely positive quality-assurance process.',
    energy: 'Water',
    iconId: '9',
    colour: '#4d7c8a',
    cards: waterCards,
    requirements: undergroundBattleRequirements(
      'underground-tcg-battle-water',
      'underground-tcg-marina-outreach',
    ),
    reward: 1000,
    replayable: false,
  }),
  battle({
    id: 'underground-tcg-battle-grass',
    name: 'Fern’s Grass Deck',
    description: 'Finish Fern’s captive-audience tournament against his Grass deck.',
    energy: 'Grass',
    iconId: '3',
    colour: '#5f794f',
    cards: grassCards,
    requirements: undergroundBattleRequirements(
      'underground-tcg-battle-grass',
      'underground-tcg-fern-outreach',
    ),
    reward: 1000,
    replayable: false,
  }),
  battle({
    id: 'underground-tcg-rematch-fire',
    name: 'Cal’s Fire Rematch',
    description: 'Play another round with Cal now that his outreach crates have actually been shipped.',
    energy: 'Fire',
    iconId: '6',
    colour: '#b86148',
    cards: fireCards,
    requirements: rematchRequirements,
    reward: 350,
    replayable: true,
  }),
  battle({
    id: 'underground-tcg-rematch-water',
    name: 'Marina’s Water Rematch',
    description: 'Give Marina one more Water-deck result for her quality-assurance archive.',
    energy: 'Water',
    iconId: '9',
    colour: '#4d7c8a',
    cards: waterCards,
    requirements: rematchRequirements,
    reward: 350,
    replayable: true,
  }),
  battle({
    id: 'underground-tcg-rematch-grass',
    name: 'Fern’s Grass Rematch',
    description: 'Return to Fern’s Grass deck for an approved after-hours rematch.',
    energy: 'Grass',
    iconId: '3',
    colour: '#5f794f',
    cards: grassCards,
    requirements: rematchRequirements,
    reward: 350,
    replayable: true,
  }),
]
