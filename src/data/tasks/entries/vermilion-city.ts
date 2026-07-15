import { Task } from '../../types'

export const vermilionCityTasks: Task[] = [
  {
    id: 'explore-vermilion-city',
    name: 'Explore Vermilion City',
    description: 'The sea breeze is getting stronger. Vermilion City must be just ahead.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'local',
      id: '/sprites/sign.avif',
    },
    background: '/backgrounds/vermillion.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Enter Vermilion City',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'underground-path-route-5',
      },
    ],
    criteria: [
      {
        type: 'battle_result',
        targetId: 'route-6-battle',
        battleStatus: 'win',
        count: 3,
      },
      {
        type: 'location_encounter_result',
        targetId: 'route-6',
        count: 3,
      },
      {
        type: 'battle_result',
        targetId: 'route-6-camper-jeff',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'battle_result',
        targetId: 'route-6-picnicker-nancy',
        battleStatus: 'win',
        count: 1,
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/vermillion.avif',
      title: 'Vermilion City',
      icon: {
        type: 'local',
        id: '/sprites/sign.avif',
      },
      message: 'The port city is buzzing with Trainers, sailors, and the sound of ships.',
      closeButtonText: 'Tour Vermilion',
    },
  },
  {
    id: 'chaos-at-the-coast',
    name: 'Chaos at the Coast',
    description: 'Wait, is that LT. Surge?',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-ltsurge',
    },
    background: '/backgrounds/vermillion.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Hey Surge!',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-vermilion-city',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Lt. Surge',
        message:
          'Oh hey kid, really sorry but now is NOT a good time! Can you see that huuuuuge cruise ship there?',
        background: '/backgrounds/vermillion.avif',
        icon: {
          type: 'trainer',
          id: 'gym-kanto-ltsurge',
        },
        buttons: [
          {
            text: 'Yeah',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Lt. Surge',
        message:
          "Well, that's the S.S. Anne. It was only meant to be docked here for the day, but a power outage has had it stuck here for over a week. The Trainers on board are getting antsy. The repairs are mostly finished but...",
        background: '/backgrounds/vermillion.avif',
        icon: {
          type: 'trainer',
          id: 'gym-kanto-ltsurge',
        },
        buttons: [
          {
            text: 'Yeah?',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        title: 'Lt. Surge',
        message:
          "Hey, I've got an idea kid, come with me! You look pretty tough, you're gonna help keep the Trainers distracted so I can finish up the repairs onboard, and don't be wandering off. This is a priority. I'm guessing you're on the Gym Challenge, help me with this, and I'll be able to get back to work.",
        background: '/backgrounds/vermillion.avif',
        icon: {
          type: 'trainer',
          id: 'gym-kanto-ltsurge',
        },
        buttons: [
          {
            text: 'Deal',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'vermilion-ss-anne-truck',
    name: 'Hey look a Truck',
    description: 'There is a truck near the S.S. Anne docks.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'local',
      id: '/sprites/truck.avif',
    },
    background: '/backgrounds/beach.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Inspect Truck',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'chaos-at-the-coast',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/beach.avif',
      title: 'Hey look a Truck',
      icon: {
        type: 'local',
        id: '/sprites/truck.avif',
      },
      message: "On closer inspection I've determined this is indeed a truck.",
      closeButtonText: 'Incredible',
    },
  },
  {
    id: 'vermilion-troublesome-truck',
    name: 'Troublesome Truck',
    description:
      "I just can't stop thinking about this truck maybe if I could move it to see if there's anything underneath",
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'local',
      id: '/sprites/truck.avif',
    },
    background: '/backgrounds/beach.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Drive Truck',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'vermilion-ss-anne-truck',
      },
      {
        type: 'item_owned',
        targetId: 'manics-journal-pg-172',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'lost-key',
        secret: true,
      },
    ],
    rewards: [
      {
        type: 'pokemon_research_xp',
        targetId: '151',
        quantity: 1,
      },
    ],
    exitModal: {
      background: '/backgrounds/beach.avif',
      title: 'Troublesome Truck',
      icon: {
        type: 'local',
        id: '/sprites/truck.avif',
      },
      message: "Well I'm pretty sure that was illegal, and there's definitely no Mew here.",
      closeButtonText: 'Drive Away',
    },
  },
  {
    id: 'vermilion-gym-shrub',
    name: 'A Small Shrub',
    description:
      'A small shrub blocks the path to Vermilion Gym. A Pokemon that knows Cut could clear the way.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'local',
      id: '/sprites/cut_tree.avif',
    },
    background: '/backgrounds/vermillion.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Use Cut',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-vermilion-city',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'tm-cut',
      },
    ],
    rewards: [],
  },
  {
    id: 'vermilion-gym',
    name: 'Vermilion Gym',
    description:
      "The gym floor hums with live wires, locked switches, and Lt. Surge's electric recruits.",
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-ltsurge',
    },
    background: '/backgrounds/gym-electric.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Report to Lt. Surge',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'vermilion-gym-shrub',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/gym-electric.avif',
      title: 'Lt. Surge',
      icon: {
        type: 'trainer',
        id: 'gym-kanto-ltsurge',
      },
      message:
        'Whoa, cool your jets, kid. Before you get a shot at the Thunder Badge, you have to clear my Gym Challenge: three recruits, three live Voltorb traps, then me. Keep your camera ready; a fast flash can stun those Voltorb before they blow the whole run. See you on the other side.',
      closeButtonText: 'Start Gym Challenge',
    },
  },
  {
    id: 'vermilion-gym-tm-reward',
    name: 'A Gift from Surge',
    description:
      'Lt. Surge has one last word after the Thunder Badge battle and a technique for Trainers who kept their cool.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'tm-storm-cloud',
    },
    background: '/backgrounds/gym-electric.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Receive Technique',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'vermilion-gym-shrub',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/gym-electric.avif',
      title: 'Lt. Surge',
      icon: {
        type: 'trainer',
        id: 'gym-kanto-ltsurge',
      },
      message:
        'You took the shocks, kept moving, and beat my Raichu fair and square. That Thunder Badge is yours. Take Storm Cloud too; it is not about one big hit, kid. It is about making the battlefield crackle so every switch-in pays for stepping into your storm.',
      closeButtonText: 'Receive Badge and TM',
    },
  },
  {
    id: 'vermilion-rumours',
    name: "Sailor's Warning",
    description: "A sailor near the docks has news about Diglett's Cave.",
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'sailor',
    },
    background: '/backgrounds/vermillion.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Talk to the Sailor',
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'ss-anne-repair-duty',
        expeditionStatus: 'completed',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/vermillion.avif',
      title: "Sailor's Warning",
      icon: {
        type: 'trainer',
        id: 'sailor',
      },
      message:
        "If you're heading east, watch yourself. There's been a lot of commotion in Diglett's Cave lately. A huge cave-in has blocked the Viridian City entrance, so it's pretty empty at the moment, well except for all the Diglett I guess.",
      closeButtonText: 'Thanks for the warning',
    },
  },
  {
    id: 'vermilion-route-12-snorlax-rumour',
    name: 'Route 12 Blocked',
    description: 'A trainer on the east side of Vermilion is warning everyone about Route 12.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: true,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Ask About Route 12',
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'ss-anne-repair-duty',
        expeditionStatus: 'completed',
        count: 1,
      },
      {
        type: 'location_encounter_result',
        targetId: 'route-12-dazed-snorlax',
        count: 1,
        inverse: true,
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Route 12 Blocked',
      icon: {
        type: 'trainer',
        id: 'youngster',
      },
      message:
        "Good luck getting to Lavender town from here! There's a HUGE Snorlax blocking the entrance at Route 12. I mean I dont care those fishermen stink!",
      closeButtonText: 'Good to know',
    },
  },
  {
    id: 'nido-stories-route-11',
    name: 'Nido Stories',
    description:
      'This boy is absolutely obsessed with Nidoran male. Maybe I should share my notes.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Share Route 11 Notes',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-vermilion-city',
      },
    ],
    criteria: [
      {
        type: 'battle_result',
        targetId: 'route-11-battle',
        battleStatus: 'win',
        count: 10,
      },
      {
        type: 'location_encounter_result',
        targetId: 'route-11',
        count: 3,
      },
      {
        type: 'skill_level',
        targetId: 'researching',
        count: 15,
      },
      {
        type: 'research_level',
        targetId: '32',
        count: 3,
      },
    ],
    rewards: [
      {
        type: 'pokemon_research_xp',
        targetId: '32',
        quantity: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Youngster',
      icon: {
        type: 'trainer',
        id: 'youngster',
      },
      message:
        'Oh wow, another Nido fan! Thanks so much for sharing. Here, take a look at all my stories!',
      closeButtonText: 'Read Draft',
    },
  },
  {
    id: 'route-11-researcher-itemfinder',
    name: 'Looking for Lost Things',
    description:
      'A researcher on Route 11 is testing a device for finding hidden items, but only wants help from a trainer with a well-used Pokedex.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Show Pokedex',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-vermilion-city',
      },
    ],
    criteria: [
      {
        type: 'battle_result',
        targetId: 'route-11-battle',
        battleStatus: 'win',
        count: 10,
      },
      {
        type: 'location_encounter_result',
        targetId: 'route-11',
        count: 3,
      },
      {
        type: 'user_level',
        targetId: 'researching',
        count: 12,
      },
      {
        type: 'research_encounter_result',
        targetId: 'route-11-field-observation',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'pokedex_caught_total',
        count: 30,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'dowsing-machine',
        quantity: 1,
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Researcher',
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
      message:
        "Thirty Pokemon registered, real Route 11 field experience, and you're still standing? Excellent. Take this Itemfinder. It reacts when something interesting is buried nearby, though it also reacts when absolutely nothing is nearby.",
      closeButtonText: 'Receive Itemfinder',
    },
  },
  {
    id: 'nido-notion',
    name: 'Nido Notion',
    description: "Hmm that's such a strange coincidence",
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '33',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Think It Through',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'nido-notes-route-5',
      },
      {
        type: 'task_completed',
        targetId: 'nido-stories-route-11',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Nido Notion',
      icon: {
        type: 'pokemon',
        id: '33',
      },
      message:
        "Hang on. The girl on Route 5 sketches Nidoran female, and this boy writes Nidoran male stories. There's no way they wouldn't have loads to talk about.",
      closeButtonText: 'Find the Youngster',
    },
  },
  {
    id: 'nido-note-from-youngster',
    name: 'Nido Note',
    description: 'The Route 11 boy should hear about the Nido sketcher from Route 5.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Tell Him',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'nido-notion',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'nido-note',
        quantity: 1,
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Youngster',
      icon: {
        type: 'trainer',
        id: 'youngster',
      },
      message:
        "A Trainer who loves Nido's as much as me?! That's amazing! Please give her this note. I tried to make it sound cool, but not too cool. Actually, maybe don't read it.",
      closeButtonText: 'Take Note',
    },
  },
  {
    id: 'deliver-nido-note',
    name: 'Nido Note Delivery',
    description: 'Deliver the Route 11 boy’s note to the Route 5 Nido sketcher.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'item',
      id: 'nido-note',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Deliver Note',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'nido-note-from-youngster',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'nido-note',
        count: 1,
        consume: true,
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Lass',
      icon: {
        type: 'trainer',
        id: 'lass',
      },
      message:
        "He writes stories about Nidoran? That's so sweet! Tell him I want to see every chapter. Wait, no, I'll tell him myself.",
      closeButtonText: 'Back to Vermilion',
    },
  },
  {
    id: 'nido-fan-meetup',
    name: 'Nido Fan Meetup',
    description:
      'The Route 5 sketcher and Route 11 writer are together in Vermilion, talking about Nidos.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '31',
    },
    background: '/backgrounds/vermillion.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Say Hi',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'deliver-nido-note',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/vermillion.avif',
      title: 'Nido Fans',
      icon: {
        type: 'pokemon',
        id: '34',
      },
      message:
        "They're comparing sketches and story notes so quickly you can barely follow it. Apparently Nidorina is so elegant and cute, and Nidorino is so cool and suave.",
      closeButtonText: 'Let Them Cook',
    },
  },
  {
    id: 'nido-moonstone-promise',
    name: 'Moonlit Nidos',
    description: 'The Nido fans want to evolve their Pokemon together. Bring them 2 Moon Stones.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'moon-stone',
    },
    background: '/backgrounds/vermillion.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Give Moon Stones',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'nido-fan-meetup',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'moon-stone',
        count: 2,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'pokemon_research_xp',
        targetId: '34',
        quantity: 200,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '31',
        quantity: 200,
      },
      {
        type: 'title',
        targetId: 'the-nido-king',
      },
      {
        type: 'title',
        targetId: 'the-nido-queen',
      },
      {
        type: 'icon',
        targetId: 'nidoking',
      },
      {
        type: 'icon',
        targetId: 'nidoqueen',
      },
    ],
    exitModal: {
      background: '/backgrounds/vermillion.avif',
      title: 'Nido Fans',
      icon: {
        type: 'item',
        id: 'moon-stone',
      },
      message:
        'The Moon Stones glow, and the couple look overjoyed as their partners evolve together. They press a bundle of Love Balls into your hands before running off together.',
      closeButtonText: 'Congratulations!',
    },
  },
  {
    id: 'vermilion-fishing-maniac',
    name: 'The Fishing Maniac',
    description: 'This guy smells erm salty',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'fisherman',
    },
    background: '/backgrounds/vermillion.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-vermilion-city',
      },
    ],
    criteria: [],
    rewards: [],
    completeButtonText: 'Chat',
    exitModal: {
      background: '/backgrounds/vermillion.avif',
      title: 'The Fishing Maniac',
      icon: {
        type: 'trainer',
        id: 'fisherman',
      },
      message:
        'Haha, hey kid! Have you got Fishing Fever? No? Well let me help you with that, I actually throw super powerful TMs in the sea for young trainers to fish up, so they really get a feel for it!',
      closeButtonText: 'Right.. is that legal?',
    },
  },
  {
    id: 'vermilion-unknown-tm',
    name: 'Unknown TM',
    description:
      "Man I can't wait to see what powerful technique this contains, it's strange I can't get it to work myself though!",
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'unknown-tm',
    },
    background: '/backgrounds/vermillion.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'vermilion-fishing-maniac',
      },
      {
        type: 'item_owned',
        targetId: 'unknown-tm',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'rare-candy-m',
        quantity: 1,
        secret: true,
      },
    ],
    completeButtonText: 'Hey, Fishing guy!',
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/vermillion.avif',
        title: 'The Fishing Maniac',
        icon: {
          type: 'trainer',
          id: 'fisherman',
        },
        message:
          "Oh wow, you found one! And you don't need to tell me, you're HOOKED?! Fishing's a blast right! Oh the TM? Yeah no that's just an old CD I dyed blue, it's junk, the real prize was being by the sea rod in hand. Here's some candy though, you kids like candy right?",
        buttons: [
          {
            text: "You're kidding right",
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/vermillion.avif',
      title: 'Unknown TM',
      icon: {
        type: 'item',
        id: 'unknown-tm',
      },
      message: 'What a waste of time.',
      closeButtonText: 'Move On',
    },
  },
  {
    id: 'vermilion-trade-farfetchd',
    name: 'Making Deals in Vermilion City',
    description: 'A trainer in Vermilion City is looking for a Spearow.',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'gentleman',
    },
    background: '/backgrounds/inside-house.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Trade Spearow',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-vermilion-city',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        pokemonCriteria: {
          speciesId: 21,
          formId: '21',
        },
        count: 1,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'pokemon',
        targetId: 83,
        pokemonData: {
          formId: '83',
          ability: 'keen_eye',
          level: 10,
          ballType: 'poke-ball',
          background: '/backgrounds/inside-house.avif',
        },
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Trade Complete!',
      icon: {
        type: 'pokemon',
        id: '83',
      },
      message: 'Wonderful! Take good care of Farfetch’d for me.',
      closeButtonText: 'Great Trade!',
    },
  },
  {
    id: 'vermilion-rude-old-man',
    name: 'Rude Old Man',
    description: 'Did that guy just snap his fingers at me?',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'gentleman',
    },
    background: '/backgrounds/vermillion.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Hello?',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-vermilion-city',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'increase_max_pokemon',
        quantity: 50,
        secret: true,
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Rude Old Man',
        message:
          "Yes you Trainer. Come here, I've recently purchased this plot of land. It cost a small fortune, but I have that kind of money. I'm going to build a tower to the heavens, it'll make the one in Johto look like a joke.",
        background: '/backgrounds/vermillion.avif',
        icon: {
          type: 'trainer',
          id: 'gentleman',
        },
        buttons: [
          {
            text: 'Erm good luck?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Rude Old Man',
        message:
          "Oh you don't believe me? Watch this. Pokemon storage is expensive right? Watch this, what's your name.",
        background: '/backgrounds/vermillion.avif',
        icon: {
          type: 'trainer',
          id: 'gentleman',
        },
        buttons: [
          {
            text: '{Trainer}',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        title: 'Rude Old Man',
        message:
          "Hey yes, it's me. I've got a {Trainer} here, yes add 50 slots to their account, bill it to my account. Believe me now kid, THE GREATEST TOWER I SAY!",
        background: '/backgrounds/vermillion.avif',
        icon: {
          type: 'trainer',
          id: 'gentleman',
        },
        buttons: [
          {
            text: 'Walk Away',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/vermillion.avif',
      title: 'Rude Old Man',
      icon: {
        type: 'trainer',
        id: 'gentleman',
      },
      message:
        'Well that was both weird and awful, but it looks like I got some free Pokemon storage?',
      closeButtonText: 'Use Box Upgrade',
    },
  },
  {
    id: 'pokemon-fan-club-intro',
    name: 'Fan Club President',
    description: 'The president of the Pokemon Fan Club wants to know how big a fan you are.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'gentleman',
    },
    background: '/backgrounds/inside-house.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-vermilion-city',
      },
    ],
    criteria: [],
    rewards: [],
    completeButtonText: 'Chat',
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Fan Club President',
      icon: {
        type: 'trainer',
        id: 'gentleman',
      },
      message:
        "Welcome to the Pokemon Fan Club! We all have our favourites here, are you a super ultra mega fan of Pokemon?! Us too! Let us show you all of our Pokemon, infact let's battle right now, if you're a bigger fan than all of us I'll even give you a super special secret prize!",
      closeButtonText: "Let's Battle!",
    },
  },
  {
    id: 'pokemon-fan-club-final-challenge',
    name: 'Fan Club President',
    description: 'The Fan Club President has one final challenge before sharing his prize.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'gentleman',
    },
    background: '/backgrounds/inside-house.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-vermilion-city',
      },
    ],
    criteria: [],
    rewards: [],
    completeButtonText: 'Chat',
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Fan Club President',
      icon: {
        type: 'trainer',
        id: 'gentleman',
      },
      message:
        "You really do love Pokemon! But every true fan needs focus, patience, and a perfect eye for Pikachu. Here's the final challenge: solve my Pikachu Puzzle Box before time runs out!",
      closeButtonText: 'Open the Box',
    },
  },
  {
    id: 'pokemon-fan-club-prize',
    name: 'Fan Club President',
    description: 'The Fan Club President is ready to reveal his super special secret prize.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'trainer',
      id: 'gentleman',
    },
    background: '/backgrounds/inside-house.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-vermilion-city',
      },
    ],
    criteria: [],
    rewards: [],
    completeButtonText: 'Claim Prize',
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Fan Club President',
      icon: {
        type: 'trainer',
        id: 'gentleman',
      },
      message:
        "You're an incredible Pokemon fan! Your prize is the VS Seeker. It alerts nearby Trainers that you want to battle!, The batteries a bit iffy though...",
      closeButtonText: 'Take VS Seeker',
    },
  },
  {
    id: 'squirtle-squad-bench-by-the-pier',
    name: 'Bench by the Pier',
    description: 'The pier is quiet enough to open the Squirtle diary.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'squirtle-squad',
    },
    background: '/backgrounds/beach.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Open Diary',
    requirements: [
      {
        type: 'item_owned',
        targetId: 'squirtle-squad',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'The Squirtle Squad',
        message:
          'The diary smells of seawater, smoke, and old berry candy. A tiny shell chip pins the first page flat against the wind.',
        background: '/backgrounds/beach.avif',
        icon: {
          type: 'item',
          id: 'squirtle-squad',
        },
        buttons: [
          {
            text: 'Read',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'The First Line',
        message:
          '"We were not lost. Everyone else was just bad at finding us." The words tilt across the page in careful, splashy scratches.',
        background: '/backgrounds/beach.avif',
        icon: {
          type: 'pokemon',
          id: '7',
        },
        buttons: [
          {
            text: 'Turn Page',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'squirtle-squad-first-page',
    name: 'The Abandoned Dock',
    description: 'The diary begins before the Squad became dockside legends.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '7',
    },
    background: '/backgrounds/beach.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Turn Page',
    requirements: [
      {
        type: 'item_owned',
        targetId: 'squirtle-squad',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Diary Page',
        message:
          'Five Squirtle made a home beneath Vermilion Pier, where the planks stayed warm after sunset and humans forgot their bait buckets.',
        background: '/backgrounds/beach.avif',
        icon: {
          type: 'pokemon',
          id: '7',
        },
        buttons: [
          {
            text: 'Keep Reading',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Diary Page',
        message:
          'They were hungry, clever, and tired of being chased from every boat. Shade made a rule: if the pier could push them around, they could push back.',
        background: '/backgrounds/beach.avif',
        icon: {
          type: 'pokemon',
          id: '7',
        },
        buttons: [
          {
            text: 'The Rule',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'squirtle-squad-stolen-lunch',
    name: 'The Stolen Lunch',
    description: 'A stolen lunch turns into panic when the smallest Squirtle disappears.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '7',
    },
    background: '/backgrounds/beach.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Search',
    requirements: [
      {
        type: 'item_owned',
        targetId: 'squirtle-squad',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/beach.avif',
      title: 'The Stolen Lunch',
      icon: {
        type: 'pokemon',
        id: '7',
      },
      message:
        'The Squad ran off with a lunch pail and laughed until a whistle cut through the pier. When the echoes faded, Spray, the smallest Squirtle, was gone.',
      closeButtonText: 'Find Them',
    },
  },
  {
    id: 'squirtle-squad-drainpipe-clue',
    name: 'Drainpipe Clue',
    description: 'The drainpipe trail shows the Squad was not the only trouble under the pier.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '19',
    },
    background: '/backgrounds/beach.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Read Clue',
    requirements: [
      {
        type: 'item_owned',
        targetId: 'squirtle-squad',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/beach.avif',
      title: 'Drainpipe Clue',
      icon: {
        type: 'pokemon',
        id: '19',
      },
      message:
        "Rattata had dragged bright scraps through the pipe and left muddy prints beside the Squad's tracks. The Squirtle were trouble, but this was not their mess alone.",
      closeButtonText: 'Follow Map',
    },
  },
  {
    id: 'squirtle-squad-boathouse-clue',
    name: 'Boathouse Clue',
    description: 'The boathouse trail points back toward the pier.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '52',
    },
    background: '/backgrounds/beach.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Read Clue',
    requirements: [
      {
        type: 'item_owned',
        targetId: 'squirtle-squad',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/beach.avif',
      title: 'Boathouse Clue',
      icon: {
        type: 'pokemon',
        id: '52',
      },
      message:
        'A Meowth had been batting cracked lantern glass into the straw, then letting humans blame the Squirtle. The Squad copied every footprint and drew a crooked map of the pier.',
      closeButtonText: 'Piece It Together',
    },
  },
  {
    id: 'squirtle-squad-fire-at-the-pier',
    name: 'Fire at the Pier',
    description: 'The page darkens where the diary reaches the night of the fire.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'squirtle-squad',
    },
    background: '/backgrounds/beach.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Run',
    requirements: [
      {
        type: 'item_owned',
        targetId: 'squirtle-squad',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Diary Page',
        message:
          'The map led back to the pier just as a lantern tipped into the straw. Smoke crawled under the boards first, quiet and mean, then the planks began to glow.',
        background: '/backgrounds/beach.avif',
        icon: {
          type: 'item',
          id: 'squirtle-squad',
        },
        buttons: [
          {
            text: 'Read On',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Diary Page',
        message:
          'Shade wrote one line larger than the rest: "If we run, our home burns. If we stay, everyone sees who we are."',
        background: '/backgrounds/beach.avif',
        icon: {
          type: 'pokemon',
          id: '7',
        },
        buttons: [
          {
            text: 'Stay',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'squirtle-squad-first-rescue',
    name: 'First Rescue',
    description: 'The Squad chooses what kind of reputation it wants.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '7',
    },
    background: '/backgrounds/beach.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Keep Reading',
    requirements: [
      {
        type: 'item_owned',
        targetId: 'squirtle-squad',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/beach.avif',
      title: 'First Rescue',
      icon: {
        type: 'pokemon',
        id: '7',
      },
      message:
        'The Squad drove panicked Pokemon toward the water, soaked the burning ropes, and dragged a crying child clear of the smoke. By morning, nobody called them thieves.',
      closeButtonText: 'Final Page',
    },
  },
  {
    id: 'squirtle-squad-final-page',
    name: 'The Hidden Cove',
    description: 'The diary ends with a promise and a mark on the shoreline.',
    category: 'Secret',
    subCategory: 'Vermilion City',
    icon: {
      type: 'item',
      id: 'squirtle-squad',
    },
    background: '/backgrounds/beach.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Close Diary',
    requirements: [
      {
        type: 'item_owned',
        targetId: 'squirtle-squad',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/beach.avif',
      title: 'The Hidden Cove',
      icon: {
        type: 'pokemon',
        id: '7',
      },
      message:
        'The last page marks a tucked-away cove north of the pier. "Friends can find us here. Troublemakers have to bring snacks."',
      closeButtonText: 'Remember the Way',
    },
  },
  {
    id: 'squirtle-cove-regular',
    name: 'Cove Regular',
    description: 'I think ive won over the Squirtle Squad with my snacks',
    category: 'Kanto',
    subCategory: 'Vermilion City',
    icon: {
      type: 'pokemon',
      id: '7',
    },
    background: '/backgrounds/beach.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Visit the Cove',
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'squirtle-squad-chronicle',
        expeditionStatus: 'completed',
        count: 1,
      },
      {
        type: 'location_encounter_result',
        targetId: 'vermilion-squirtle-cove',
        count: 5,
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/beach.avif',
      title: 'Cove Regular',
      message:
        'The Squad has stopped pretending the snack inspection is official business. They wave you toward the cove whenever you arrive now.',
      closeButtonText: 'Return Anytime',
      icon: {
        type: 'pokemon',
        id: '7',
      },
    },
  },
]
