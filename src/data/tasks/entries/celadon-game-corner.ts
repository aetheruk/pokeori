import { Task } from '../../types'

export const celadonGameCornerTasks: Task[] = [
  {
    id: 'battle-bets',
    name: 'Battle Bets',
    description: 'The High Stakes Room has a new way for me to lose tokens...',
    category: 'Kanto',
    subCategory: 'Celadon Game Corner',
    background: '/backgrounds/celadon-game-corner-prize-wheel.avif',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-f',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Open the Book',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'high-roller',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        icon: {
          type: 'trainer',
          id: 'rocket-grunt-f',
        },
        title: 'Battle Bets',
        message:
          'Two Rocket Grunts stand at either side of a luxurious arena, their Shadow Pokemon waiting for an order.',
        background: '/backgrounds/celadon-game-corner-prize-wheel.avif',
        buttons: [
          {
            text: 'What is this?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        icon: {
          type: 'trainer',
          id: 'rocket-grunt-f',
        },
        title: 'Battle Bets',
        message:
          'Inspect both teams, check the odds, then back one side with as many Fun Tokens as you dare. Once the bet is placed, the Pokemon settle the rest.',
        background: '/backgrounds/celadon-game-corner-prize-wheel.avif',
        buttons: [
          {
            text: 'Show me the odds',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      title: 'Battle Bets',
      icon: {
        type: 'trainer',
        id: 'rocket-grunt-f',
      },
      background: '/backgrounds/celadon-game-corner-prize-wheel.avif',
      message:
        'The High Stakes Room will now take Battle Bets. Choose a side, set your stake, and watch the match play out.',
      closeButtonText: 'Place a Bet',
    },
  },
  {
    id: 'high-roller',
    name: 'High Roller',
    description: 'A sharply dressed Rocket Grunt keeps glancing at my stack of Fun Tokens.',
    category: 'Kanto',
    subCategory: 'Celadon Game Corner',
    background: '/backgrounds/celadon-game-corner-prize-exchange.avif',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-f',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Accept Invitation',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'when-the-fun-stops',
      },
      {
        type: 'currency_owned',
        targetId: 'fun-tokens',
        count: 1000,
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        icon: {
          type: 'trainer',
          id: 'rocket-grunt-f',
        },
        title: 'An Invitation',
        message:
          "That is quite a stack you have there. Come follow me, you don't want to be down here with the rabble.",
        background: '/backgrounds/celadon-game-corner-prize-exchange.avif',
        buttons: [
          {
            text: 'What do you want?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        icon: {
          type: 'trainer',
          id: 'rocket-grunt-f',
        },
        title: 'The High Stakes Room',
        message:
          'Upstairs, the tables are quieter, the wagers are bigger, and the prizes within your reach. Do not worry you have already proved you can afford the door.',
        background: '/backgrounds/celadon-game-corner-prize-exchange.avif',
        buttons: [
          {
            text: 'Lead the way',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/celadon-game-corner-prize-exchange.avif',
      title: 'Welcome Upstairs',
      icon: {
        type: 'trainer',
        id: 'rocket-grunt-f',
      },
      message:
        'The rope is lifted and a hidden staircase opens behind the prize counter. The High Stakes versions of every game are now available.',
      closeButtonText: 'Play for Bigger Stakes',
    },
  },
  {
    id: 'corporate-takeover',
    name: 'Corporate Takeover',
    description:
      'An Engineer in the High Stakes Room is speaking far too loudly about Rocket Ball production.',
    category: 'Kanto',
    subCategory: 'Celadon Game Corner',
    background: '/backgrounds/celadon-game-corner-arcade.avif',
    icon: {
      type: 'trainer',
      id: 'engineer',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Listen In',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'high-roller',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        icon: {
          type: 'trainer',
          id: 'engineer',
        },
        title: 'Loose Talk',
        message:
          "The Engineer is bragging on his phone about the new Rocket Ball manufacturing facility. He says the production line is only the beginning and that nobody at Silph Co. sees what's coming.",
        background: '/backgrounds/celadon-game-corner-arcade.avif',
        buttons: [
          {
            text: 'Keep listening',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        icon: {
          type: 'trainer',
          id: 'engineer',
        },
        title: 'A Corporate Takeover',
        message:
          '“Rocket is buying up every loose share they can find,” “Once the deal closes, Silph will not be making traditional Poké Balls anymore. No competition, no choice, just Rocket Ball contracts. It goes through any day now.”',
        background: '/backgrounds/celadon-game-corner-arcade.avif',
        buttons: [
          {
            text: 'That cannot be good',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/celadon-game-corner-arcade.avif',
      title: 'A Dangerous Lead',
      icon: {
        type: 'trainer',
        id: 'engineer',
      },
      message:
        'Team Rocket is not just flooding Kanto with Rocket Balls they are preparing to take control of Silph Co. before anyone can stop them.',
      closeButtonText: 'Remember That',
    },
  },
  {
    id: 'the-fun-never-stops',
    name: 'The Fun Never Stops',
    description:
      'The Game Corner helps Trainers who are completely out of Fun Tokens get back in the game.',
    category: 'Kanto',
    subCategory: 'Celadon Game Corner',
    background: '/backgrounds/game-corner.avif',
    icon: {
      type: 'trainer',
      id: 'maid',
    },
    repeatable: true,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Ask for Help',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'when-the-fun-stops',
      },
      {
        type: 'currency_owned',
        targetId: 'fun-tokens',
        count: 1,
        inverse: true,
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'currency',
        targetId: 'fun-tokens',
        quantity: 20,
      },
    ],
    exitModal: {
      background: '/backgrounds/game-corner.avif',
      title: 'A Little Luck',
      icon: {
        type: 'trainer',
        id: 'maid',
      },
      message:
        'No Fun Tokens at all? We cannot have that. Here are 20 on the house. Just enough to get the fun started again.',
      closeButtonText: 'Try My Luck',
    },
  },
]
