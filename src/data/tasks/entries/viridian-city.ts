import { Task } from '../../types'

export const viridianCityTasks: Task[] = [
  {
    name: 'Victory Road',
    description: 'You proved your worth and found the entrance to Victory Road!',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'item',
      id: 'badge-kanto-earth',
    },
    background: '/backgrounds/rocky-path.avif',
    repeatable: false,
    secret: true,
    completionTrigger: 'auto',
    completeButtonText: 'Approach Gate',
    requirements: [
      { type: 'item_owned', targetId: 'badge-kanto-boulder' },
      { type: 'item_owned', targetId: 'badge-kanto-cascade' },
      { type: 'item_owned', targetId: 'badge-kanto-thunder' },
      { type: 'item_owned', targetId: 'badge-kanto-rainbow' },
      { type: 'item_owned', targetId: 'badge-kanto-soul' },
      { type: 'item_owned', targetId: 'badge-kanto-marsh' },
      { type: 'item_owned', targetId: 'badge-kanto-volcano' },
      { type: 'item_owned', targetId: 'badge-kanto-earth' },
    ],
    criteria: [],
    rewards: [
      {
        type: 'currency',
        targetId: 'crystals',
        quantity: 500,
      },
    ],
    id: 'discovering-victory-road',
  },
  {
    name: 'Explore Viridian City',
    description:
      'This was much closer than I thought it would be! Now time to take a stroll around the city.',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'local',
      id: '/sprites/sign.avif',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Enter Viridian',
    chat: true,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-1',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/rocky-path.avif',
      title: 'Viridian City',
      icon: {
        type: 'local',
        id: '/sprites/sign.avif',
      },
      message:
        'It seems there is a Gym here, but it looks locked... a shop, that could be handy.. and a really grumpy looking man.',
      closeButtonText: 'Tour Viridian',
    },
    id: 'explore-viridian',
  },
  {
    name: 'Find my Granddaughter',
    description:
      'A grumpy old man is looking for his granddaughter and wont let me pass. I should try looking on Route 22.',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'trainer',
      id: 'old-couple',
    },
    background: '/backgrounds/town.avif',
    repeatable: false,
    secret: false, // Visible
    completionTrigger: 'manual', // Manual completion button
    completeButtonText: 'Search Route 22',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-viridian',
      },
    ],
    criteria: [
      {
        type: 'task_completed',
        targetId: 'found-daughter-trigger',
      },
    ],
    rewards: [
      {
        type: 'currency',
        targetId: 'pokedollars',
        quantity: 500,
      },
    ],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Grumpy Old Man',
      message: 'Hmph! I knew she couldnt have gone far',
      closeButtonText: 'Return to Town',

      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
    },
    id: 'find-daughter',
  },
  {
    id: 'rival-route-22-win-chat',
    name: 'Rival Battle',
    description: 'Your rival has one last word on Route 22.',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/rocky-path.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'rival-route-22',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/rocky-path.avif',
      dynamicOpponent: 'rival',
      title: 'Rival Battle',
      message:
        "You have been training. Good. I won't be waiting around Viridian forever.",
      closeButtonText: 'Head On',
      icon: {
        type: 'trainer',
        id: 'youngster',
      },
    },
  },
  {
    id: 'rival-route-22-loss-chat',
    name: 'Rival Battle',
    description: 'Your rival has one last word on Route 22.',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/rocky-path.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'rival-route-22',
        battleStatus: 'loss',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/rocky-path.avif',
      dynamicOpponent: 'rival',
      title: 'Rival Battle',
      message:
        'Route 22 is not just a shortcut. Train up before you chase me again.',
      closeButtonText: 'Head On',
      icon: {
        type: 'trainer',
        id: 'youngster',
      },
    },
  },
  {
    name: 'Missing Girl',
    description: 'You found the grumpy old mans granddaughter!',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'trainer',
      id: 'lass',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: true, // Hidden
    completionTrigger: 'auto', // Triggered by location drop
    completeButtonText: 'Help Her Home',
    requirements: [],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/rocky-path.avif',
      title: 'Found Her!',
      message: 'You found the old mans granddaughter playing with Pokemon in the tall grass!',
      closeButtonText: 'Return',
      icon: {
        type: 'trainer',
        id: 'lass',
      },
    },
    id: 'found-daughter-trigger',
  },
  {
    name: 'Grumpy Old Man',
    description: 'The old man is happy to have his daughter back but still wont let me pass',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'trainer',
      id: 'old-couple',
    },
    background: '/backgrounds/town.avif',
    repeatable: false,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Talk to Old Man',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'find-daughter',
      },
    ],
    criteria: [],
    rewards: [], // Battle unlock is implicit
    id: 'grumpy-man-viridian',
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'Grumpy Old Man',
      message:
        'Hmph! You found her. Fine, you can pass... BUT ONLY IF YOU BEAT ME IN A BATTLE! I used to be a Champion you know!',
      closeButtonText: 'Lets Battle!',
      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
    },
  },
  {
    name: 'Abandoned Gym',
    description: 'The doors are locked tight. It seems no one has been here in a while.',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'local',
      id: 'sprites/items/badges/badge-kanto-earth.avif',
    },
    background: '/backgrounds/gym.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'auto',
    completeButtonText: 'Check Doors',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-viridian',
      },
    ],
    criteria: [],
    rewards: [],
    id: 'abandoned-gym',
  },
  {
    name: 'A Small Shrub',
    description:
      'For whatever reason, this incredidibly small shrub looks impossible to get by, maybe if your pokemon new a move to get through it.',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'local',
      id: '/sprites/cut_tree.avif',
    },
    background: '/backgrounds/town.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Use Cut',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-viridian',
      },
    ],
    criteria: [
      { type: 'item_owned', targetId: 'tm-cut' },
      { type: 'item_owned', targetId: 'badge-kanto-thunder' },
    ],
    rewards: [],
    id: 'viridian-shrub',
  },
  {
    id: 'a-light-in-the-dark',
    name: 'A Light in The Dark',
    description: 'A Researcher is living all alone up here.',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    background: '/backgrounds/town.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Talk to Researcher',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'viridian-shrub',
      },
    ],
    criteria: [
      {
        type: 'companion',
        count: 1,
        companionCheck: {
          speciesId: 25,
          formId: '25',
        },
      },
      {
        type: 'skill_level',
        targetId: 'researching',
        count: 13,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'tm-flash',
        quantity: 1,
        secret: true,
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Researcher',
        message: 'Hey {Trainer}',
        buttons: [
          {
            text: 'Huh, how do you know me?',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/town.avif',
        icon: {
          type: 'trainer',
          id: 'researcher',
        },
      },
      {
        id: 2,
        title: 'Researcher',
        message:
          "Haha, oh I work with the Professor. I live up here. In fact, I was there when you got your partner. Not gonna lie, I can't believe you forgot about me... We had a chat about your family and where you were going next... You know what, forget about it.",
        buttons: [
          {
            text: 'Sorry...',
            type: 'navigate',
            id: 3,
          },
        ],
        background: '/backgrounds/town.avif',
        icon: {
          type: 'trainer',
          id: 'researcher',
        },
      },
      {
        id: 3,
        title: 'Researcher',
        message:
          "Anyway, I've actually been working on a new HM that causes a blinding light. It'll be super useful in battle. I've made loads, so you can have a copy if you like. You seem to have a good understanding of your Pikachu. I bet they could learn it right away.",
        buttons: [
          {
            text: 'Thanks!...and sorry again...',
            type: 'navigate',
            id: 4,
          },
        ],
        background: '/backgrounds/town.avif',
        icon: {
          type: 'trainer',
          id: 'researcher',
        },
      },
      {
        id: 4,
        title: 'Researcher',
        message:
          "Nah don't mention it. It's the lab coat and the glasses. I always get confused for the other Researchers.",
        buttons: [
          {
            text: 'Take HM05',
            type: 'success',
          },
        ],
        background: '/backgrounds/town.avif',
        icon: {
          type: 'trainer',
          id: 'researcher',
        },
      },
    ],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'HM05 Flash',
      icon: {
        type: 'item',
        id: 'tm-flash',
      },
      message: 'The Researcher hands over HM05 Flash.',
      closeButtonText: 'Take HM05',
    },
  },
  {
    id: 'route-2-mr-mime-trade',
    name: 'Mr. Mime Trade',
    description: 'This guy is giving bad vibes... & The Rocket Grunt too.',
    category: 'Kanto',
    subCategory: 'Viridian City',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/town.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Walk Away',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'viridian-shrub',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        pokemonCriteria: {
          speciesId: 63,
          formId: '63',
        },
        count: 1,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'pokemon',
        targetId: 122,
        pokemonData: {
          formId: '122',
          level: 10,
          ballType: 'poke-ball',
          background: '/backgrounds/town.avif',
        },
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Rocket Grunt',
        message:
          'So that Pokemon you have can teleport not just itself but people as well right, say for instance behind locked doors? Just asking for a friend.',
        buttons: [
          {
            text: 'Erm Sure...?',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/town.avif',
        icon: {
          type: 'trainer',
          id: 'rocket-grunt-m',
        },
      },
      {
        id: 2,
        title: 'Rocket Grunt',
        message:
          "Great, let's trade. In fact you don't have a choice, I'm sick of clowning around with this guy!",
        buttons: [
          {
            text: 'Wait hold on!',
            type: 'success',
          },
        ],
        background: '/backgrounds/town.avif',
        icon: {
          type: 'trainer',
          id: 'rocket-grunt-m',
        },
      },
    ],
    exitModal: {
      background: '/backgrounds/town.avif',
      title: 'They Vanished...',
      icon: {
        type: 'pokemon',
        id: '122',
      },
      message:
        "They vanished... I'm sure nothing bad will come of this. I guess I'm now the proud owner of whatever this creepy thing is...",
      closeButtonText: 'Meet Mr. Mime',
    },
  },
]
