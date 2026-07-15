import { Task } from '../../types'

export const mtMoonTasks: Task[] = [
  {
    id: 'mt-moon-pokemon-center',
    name: 'Mt Moon Pokemon Center',
    description: 'A place to rest and recover before continuing the journey through Mt. Moon.',
    category: 'Kanto',
    subCategory: 'Pewter City',
    icon: {
      type: 'local',
      id: '/sprites/center.avif',
    },
    background: '/backgrounds/center.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Check In',
    chat: true,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-3-trainer-8',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Mt Moon Pokemon Center',
        message:
          'The lobby is busier than expected. Hikers are buying Escape Ropes, a few trainers are whispering about fossils, and two people in black uniforms go quiet as soon as Nurse Joy looks their way.',
        background: '/backgrounds/center.avif',
        icon: {
          type: 'local',
          id: '/sprites/center.avif',
        },
        buttons: [
          {
            text: 'Ask Nurse Joy',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Nurse Joy',
        message:
          'Please be careful in Mt. Moon. Researcher Miguel from Pewter Museum went inside to record the fossil beds, but he has not checked back in. Those suspicious trainers have been asking about dig sites all morning.',
        background: '/backgrounds/center.avif',
        icon: {
          type: 'trainer',
          id: 'nurse',
        },
        buttons: [
          {
            text: 'Ask About Rocket',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        title: 'Nurse Joy',
        message:
          'I cannot prove anything, but they were selling scratch cards, bragging about rare Pokemon, and buying supplies with dirty coins. If Miguel found something important, he may need help.',
        background: '/backgrounds/center.avif',
        icon: {
          type: 'trainer',
          id: 'nurse',
        },
        buttons: [
          {
            text: 'Head for the Cave',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/center.avif',
      title: 'Mt Moon Pokemon Center',
      icon: {
        type: 'local',
        id: '/sprites/center.avif',
      },
      message:
        'If Team Rocket are really chasing fossils in Mt. Moon, Miguel and the Pewter Museum research could be in trouble.',
      closeButtonText: 'Enter Mt. Moon',
    },
  },
  {
    id: 'magikarp-secret-deal',
    name: 'A Rare and Powerful Pokemon',
    description:
      'The mysterious gentleman claims he is raising money for a fossil expedition by selling a very rare and powerful Pokemon...',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/center.avif',
    repeatable: false,
    completionTrigger: 'manual',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-pokemon-center',
      },
    ],
    criteria: [
      {
        type: 'currency_owned',
        targetId: 'pokedollars',
        count: 5000,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'pokemon',
        targetId: 129,
        pokemonData: {
          level: 5,
          formId: '129',
          ballType: 'rocket-ball',
          background: '/backgrounds/center.avif',
          isShadow: true,
        },
        dropChance: 100,
        secret: true,
      },
    ],
    completeButtonText: 'Buy Pokemon',
    exitModal: {
      background: '/backgrounds/center.avif',
      title: 'Mysterious Gentleman',
      icon: {
        type: 'pokemon',
        id: '129',
      },
      message:
        'Congratulations! This Magikarp is extremely rare and will become incredibly powerful one day... probably! The gentleman pockets the money and hurries toward the cave.',
      closeButtonText: 'Thanks...?',
    },
  },
  {
    id: 'mt-moon-ladder-a',
    name: 'A Ladder to the Next Floor',
    description:
      'Fresh survey tape has been tied around this ladder. Someone was marking a route toward the fossil beds.',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'local',
      id: '/sprites/ladder.avif',
    },
    background: '/backgrounds/cave.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Climb Ladder',
    chat: true,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'bug-catcher-kent',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'battle_result',
        targetId: 'lass-iris',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'Mt. Moon',
      icon: {
        type: 'local',
        id: '/sprites/ladder.avif',
      },
      message:
        'Empty sample crates are stacked beside the ladder. The labels say Pewter Museum, but the fresh boot prints around them look much less official.',
      closeButtonText: 'Follow the Trail',
    },
  },
  {
    id: 'mt-moon-ladder-b',
    name: 'A Ladder to the Next Floor',
    description: 'This ladder drops toward the sound of picks scraping stone below.',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'local',
      id: '/sprites/ladder.avif',
    },
    background: '/backgrounds/cave.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Climb Ladder',
    chat: true,
    requirements: [
      {
        type: 'location_encounter_result',
        targetId: 'exp-mt-moon-b1f',
        count: 2,
      },
      {
        type: 'battle_result',
        targetId: 'mt-moon-b1f',
        battleStatus: 'win',
        count: 2,
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'Mt. Moon',
      icon: {
        type: 'trainer',
        id: 'rocket-grunt-m',
      },
      message:
        'A Rocket Grunt is standing guard beside a pile of stolen digging tools. Whatever they are after, it is not just Pokemon.',
      closeButtonText: 'Approach Grunt',
    },
  },
  {
    id: 'mt-moon-ladder-c',
    name: 'A Ladder to the Next Floor',
    description:
      "A notebook page near the ladder is covered in fossil sketches and Miguel's initials.",
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'local',
      id: '/sprites/ladder.avif',
    },
    background: '/backgrounds/cave.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Climb Ladder',
    chat: true,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'lass-miriam',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'Mt. Moon',
      icon: {
        type: 'local',
        id: '/sprites/ladder.avif',
      },
      message:
        "Miguel's field notes warn that careless digging could destroy the fossil bed. The page is torn like someone grabbed it in a hurry.",
      closeButtonText: 'Track Miguel',
    },
  },
  {
    id: 'mt-moon-ladder-d',
    name: 'A Ladder to the Next Floor',
    description: 'Dust shakes loose from below. Rocket must be blasting through the lower tunnels.',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'local',
      id: '/sprites/ladder.avif',
    },
    background: '/backgrounds/cave.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Climb Ladder',
    chat: true,
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-ladder-c',
      },
      {
        type: 'battle_result',
        targetId: 'mt-moon-b1f',
        battleStatus: 'win',
        count: 5,
      },
      {
        type: 'location_encounter_result',
        targetId: 'exp-mt-moon-b1f',
        battleStatus: 'win',
        count: 5,
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'Mt. Moon',
      icon: {
        type: 'trainer',
        id: 'rocket-grunt-f',
      },
      message:
        'Another Rocket blocks the ladder with a sack of fossil fragments at her feet. She looks more worried about the missing boss than about you.',
      closeButtonText: 'Face Rocket',
    },
  },
  {
    id: 'mt-moon-dead-end-1',
    name: 'Rocket Grunt',
    description: "Arghhh! There is an important job going on and I'm just as lost as you!",
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/cave.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Talk to Grunt',
    chat: true,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'mt-moon-grunt-1',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'Mt. Moon',
      icon: {
        type: 'trainer',
        id: 'rocket-grunt-m',
      },
      message:
        'The Grunt blurts out that Rocket is collecting every fossil Miguel marked for the museum. Then he realizes he has said too much.',
      closeButtonText: 'Climb Back Up',
    },
  },
  {
    id: 'mt-moon-dead-end-2',
    name: 'Rocket Grunt',
    description: 'Hopefully the others have Miguel and the fossils packed up by now...',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-f',
    },
    background: '/backgrounds/cave.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Check on Grunt',
    chat: true,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'mt-moon-grunt-2',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'Mt. Moon',
      icon: {
        type: 'trainer',
        id: 'rocket-grunt-f',
      },
      message:
        'The defeated Grunt complains that the fossil chamber is just past the blocked ladder, if the blasting has not collapsed it already.',
      closeButtonText: 'Climb Back Up',
    },
  },
  {
    id: 'mt-moon-zubat-trade',
    name: 'Blind as a Zubat',
    description:
      'Hey kid, I was tasked with gathering Zubat to scout the tunnels... you think you could help me out here?',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-f',
    },
    background: '/backgrounds/cave.avif',
    repeatable: true,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Hand Over Zubat',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'mt-moon-grunt-2',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        targetId: 41,
        count: 2,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'moon-scratch',
        quantity: 1,
      },
      {
        type: 'pokemon_research_xp',
        quantity: 5,
        targetId: '41',
        requirements: [],
      },
    ],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'Rocket Grunt',
      icon: {
        type: 'trainer',
        id: 'rocket-grunt-f',
      },
      message: 'Perfect! The boss will be pleased.',
      closeButtonText: 'Leave Grunt',
    },
  },
  {
    id: 'mt-moon-hiker-block',
    name: 'Hiker Marcos',
    description:
      'Hey kid, Rocket blasting dropped half the tunnel onto this ladder. Bring a couple of Geodude and we can clear it before someone gets trapped.',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/cave.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Clear Path',
    chat: true,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'youngster-josh',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'battle_team',
        battleTeamCheck: {
          position: 'any',
          speciesId: 74,
          qty: 2,
        },
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'Hiker Marcos',
      icon: {
        type: 'trainer',
        id: 'hiker',
      },
      message:
        "Nice work kid. That path leads toward the old fossil chamber. Before you go, let's make sure your team can handle the trouble waiting down there!",
      closeButtonText: 'Sigh',
    },
  },
  {
    id: 'mt-moon-ladder-e',
    name: 'A Ladder to the Next Floor',
    description: 'Voices echo up from B2F. Miguel is arguing with someone about the fossils.',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'local',
      id: '/sprites/ladder.avif',
    },
    background: '/backgrounds/cave.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Climb Ladder',
    chat: true,
    requirements: [
      {
        type: 'battle_result',
        targetId: 'hiker-marcos',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'Mt. Moon',
      icon: {
        type: 'local',
        id: '/sprites/ladder.avif',
      },
      message:
        'Two ladders lead back toward B2F, but only one has fresh Rocket footprints and scattered fossil dust. This has to be the right way.',
      closeButtonText: 'Return to B2F',
    },
  },
  {
    id: 'mt-moon-fossils',
    name: 'Researcher Miguel',
    description:
      'Thanks so much for helping protect the fossils from those Rocket people! Miguel saved his research notes, but the fossils need proper cataloguing.',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    background: '/backgrounds/cave.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Fossil',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'mt-moon-grunt-4',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'binder-base3',
        quantity: 1,
      },
    ],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'Mt. Moon',
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
      message:
        'Miguel says the actual fossils need to stay protected until Pewter Museum can move them safely. For now, he gives you the binder he used to track the Fossil collection.',
      closeButtonText: 'Take Binder',
    },
  },
  {
    id: 'mt-moon-strange-wall',
    name: 'A Strange Wall',
    description: 'Hmm this wall looks different from the others...',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'item',
      id: 'hard-stone',
    },
    background: '/backgrounds/cave.avif',
    repeatable: false,
    secret: true,
    completionTrigger: 'auto',
    completeButtonText: 'Inspect Wall',
    requirements: [],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'A Strange Wall',
      icon: {
        type: 'item',
        id: 'hard-stone',
      },
      message: 'This wall looks like it could be broken through with enough force...',
      closeButtonText: 'Find Force',
    },
  },
  {
    id: 'mt-moon-wall-weakness',
    name: 'A Weakness in the Wall',
    description: 'Maybe a team of Geodude could help break through this wall...',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'pokemon',
      id: '74',
    },
    background: '/backgrounds/cave.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Break Wall',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-strange-wall',
      },
    ],
    criteria: [
      {
        type: 'battle_team',
        secret: true,
        battleTeamCheck: {
          position: 'any',
          speciesId: 74,
          qty: 6,
        },
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'A Weakness in the Wall',
      icon: {
        type: 'pokemon',
        id: '74',
      },
      message: 'Your Geodude work together to break down the wall!',
      closeButtonText: 'Enter Passage',
    },
  },
  {
    id: 'mt-moon-fossil-hunter',
    name: 'Researcher Miguel - Fossil Hunter',
    description:
      'Researcher Miguel says he will teach me where to look for fossils if I collect enough cards... and pay him a nominal fee. Not sure why he is so adamant on me collecting the cards though',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    background: '/backgrounds/cave.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Pay Fee',
    requirements: [
      {
        type: 'item_owned',
        targetId: 'binder-base3',
      },
    ],
    criteria: [
      {
        type: 'card_collected_set',
        targetId: 'base3',
        count: 40,
        unique: true,
      },
      {
        type: 'currency_owned',
        targetId: 'pokedollars',
        count: 5000,
        consume: true,
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'Researcher Miguel',
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
      message:
        'Perfect!.. So pretty much right where Im standing is a good spot, youll need some Geodude to help with the digging.',
      closeButtonText: 'Thanks...',
    },
  },
  {
    id: 'exp-mt-moon-lass-warning',
    name: 'A Mysterious Lass',
    description: 'A quiet lass blocks your path and watches every move you make.',
    category: 'Secret',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'trainer',
      id: 'lass',
    },
    background: '/backgrounds/cave.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Move Past',
    chat: true,
    requirements: [],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/cave.avif',
      title: 'Agent Mira',
      icon: {
        type: 'trainer',
        id: 'lass',
      },
      message:
        'Hah! You actually made it all the way down here. You cost us the fossil shipment, but the moon stones and Clefairy data were always the better prize. Lets stop kidding around. Let me show you the true power of our organization.',
      closeButtonText: 'Bring it on!',
    },
  },
  {
    id: 'mt-moon-exit',
    name: 'Mt. Moon Ladder',
    description: 'I can see light from above!!!!',
    category: 'Kanto',
    subCategory: 'Mt. Moon',
    icon: {
      type: 'local',
      id: '/sprites/ladder.avif',
    },
    background: '/backgrounds/cave.avif',
    repeatable: false,
    secret: false,
    chat: true,
    completionTrigger: 'manual',
    completeButtonText: 'Climb Out',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-fossils',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Route 4',
      icon: {
        type: 'local',
        id: '/sprites/sign.avif',
      },
      message: "I've finally made it out. I have a feeling Ill be seeing more of those creeps.",
      closeButtonText: 'Enter Route 4',
    },
  },
]
