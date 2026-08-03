import type { TcgBattleGameConfig } from '../types'

const undergroundBattleRequirements = (id: string, previous?: string) => [
  ...(previous
    ? [{ type: 'game_result' as const, targetId: previous, battleStatus: 'win' as const, count: 1 }]
    : [{ type: 'task_completed' as const, targetId: 'pewter-school-tcg-pop-quiz' }]),
  { type: 'game_result' as const, targetId: id, battleStatus: 'win' as const, count: 1, inverse: true },
]

const rematchRequirements = [
  { type: 'task_completed' as const, targetId: 'underground-tcg-wrapup' },
]

const battle = (input: {
  id: string
  name: string
  description: string
  energy: 'Fire' | 'Water' | 'Grass'
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
    id: input.energy === 'Fire' ? '6' : input.energy === 'Water' ? '9' : '3',
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
    id: 'underground-tcg-battle-fire',
    name: 'Fire Deck Trial',
    description: 'Prove your new deck against a Fire-themed underground player.',
    energy: 'Fire',
    colour: '#b86148',
    cards: fireCards,
    requirements: undergroundBattleRequirements('underground-tcg-battle-fire'),
    reward: 1000,
    replayable: false,
  }),
  battle({
    id: 'underground-tcg-battle-water',
    name: 'Water Deck Trial',
    description: 'Prove your new deck against a Water-themed underground player.',
    energy: 'Water',
    colour: '#4d7c8a',
    cards: waterCards,
    requirements: undergroundBattleRequirements('underground-tcg-battle-water', 'underground-tcg-battle-fire'),
    reward: 1000,
    replayable: false,
  }),
  battle({
    id: 'underground-tcg-battle-grass',
    name: 'Grass Deck Trial',
    description: 'Prove your new deck against a Grass-themed underground player.',
    energy: 'Grass',
    colour: '#5f794f',
    cards: grassCards,
    requirements: undergroundBattleRequirements('underground-tcg-battle-grass', 'underground-tcg-battle-water'),
    reward: 1000,
    replayable: false,
  }),
  battle({
    id: 'underground-tcg-rematch-fire',
    name: 'Fire Deck Rematch',
    description: 'Play another round against the Fire-themed underground player.',
    energy: 'Fire',
    colour: '#b86148',
    cards: fireCards,
    requirements: rematchRequirements,
    reward: 350,
    replayable: true,
  }),
  battle({
    id: 'underground-tcg-rematch-water',
    name: 'Water Deck Rematch',
    description: 'Play another round against the Water-themed underground player.',
    energy: 'Water',
    colour: '#4d7c8a',
    cards: waterCards,
    requirements: rematchRequirements,
    reward: 350,
    replayable: true,
  }),
  battle({
    id: 'underground-tcg-rematch-grass',
    name: 'Grass Deck Rematch',
    description: 'Play another round against the Grass-themed underground player.',
    energy: 'Grass',
    colour: '#5f794f',
    cards: grassCards,
    requirements: rematchRequirements,
    reward: 350,
    replayable: true,
  }),
]
