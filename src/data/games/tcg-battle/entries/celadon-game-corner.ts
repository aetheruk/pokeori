import type { TcgBattleGameConfig } from '../types'
import type { TcgBattleEnergyType } from '@/utilities/tcg/tcg-battle'

const gameCornerBattleRequirements = (unlockTaskId: string) => [
  { type: 'task_completed' as const, targetId: unlockTaskId },
  { type: 'item_owned' as const, targetId: 'deck-box' },
]

const casualRocketDeck = [
  'base1-20',
  'base5-65',
  'base5-56',
  'base5-59',
  'base5-49',
  'base5-55',
  'base3-39',
  'base1-3',
  'base1-65',
  'base1-27',
  'base3-11',
  'base1-6',
  'base1-23',
  'base3-8',
  'base2-45',
]

const highStakesRocketDeck = [
  'base1-20',
  'base5-65',
  'base5-56',
  'base5-59',
  'base5-49',
  'base5-55',
  'base3-39',
  'base3-11',
  'base1-6',
  'base1-23',
  'base3-8',
  'base2-45',
  'base5-33',
  'base1-2',
  'base1-4',
]

const battle = (input: {
  id: string
  name: string
  description: string
  iconId: string
  themeColour: string
  energy: TcgBattleEnergyType
  format: 'baby' | 'champions'
  unlockTaskId: string
  cards: string[]
  cost: number
  reward: number
  background: string
}): TcgBattleGameConfig => ({
  id: input.id,
  gameType: 'tcg-battle',
  name: input.name,
  description: input.description,
  category: 'Kanto',
  subCategory: 'Celadon Game Corner',
  icon: { type: 'trainer', id: input.iconId },
  background: input.background,
  requirements: gameCornerBattleRequirements(input.unlockTaskId),
  criteria: [
    {
      type: 'currency_owned',
      targetId: 'fun-tokens',
      count: input.cost,
      consume: true,
    },
  ],
  rewards: [
    {
      type: 'currency',
      targetId: 'fun-tokens',
      quantity: input.reward,
    },
  ],
  isEligibleForReplay: true,
  settings: {
    deckFormat: input.format,
    requiredSeries: 'Base',
    opponentDeckCardIds: input.cards,
    opponentEnergyType: input.energy,
    themeColour: input.themeColour,
  },
})

export const celadonGameCornerTcgBattleEntries: TcgBattleGameConfig[] = [
  battle({
    id: 'celadon-tcg-battle',
    name: 'Rocket TCG Table',
    description: 'Stake your tokens in a fast-paced TCG battle.',
    iconId: 'tcg-maniac-m',
    themeColour: '#5f794f',
    energy: 'Colorless',
    format: 'baby',
    unlockTaskId: 'when-the-fun-stops',
    cards: casualRocketDeck,
    cost: 50,
    reward: 120,
    background: '/backgrounds/celadon-game-corner-arcade.avif',
  }),
  battle({
    id: 'celadon-high-stakes-tcg-battle',
    name: 'High Stakes Rocket TCG',
    description: 'Raise the stakes in a fast-paced TCG battle.',
    iconId: 'tcg-maniac-f',
    themeColour: '#b58a43',
    energy: 'Colorless',
    format: 'champions',
    unlockTaskId: 'high-roller',
    cards: highStakesRocketDeck,
    cost: 200,
    reward: 350,
    background: '/backgrounds/celadon-game-corner-prize-wheel.avif',
  }),
]
