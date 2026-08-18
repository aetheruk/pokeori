import { Task } from '../../types'

export const pokemonTowerTasks: Task[] = [
  {
    id: 'enter-pokemon-tower',
    name: 'Enter Pokemon Tower',
    description:
      'This place is kinda depressing, but a random child did ask me to come here, so needs must!',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'local',
      id: '/sprites/sign.avif',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Enter Pokemon Tower',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'lavender-missing-mountain',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'Pokemon Tower',
      icon: {
        type: 'local',
        id: '/sprites/sign.avif',
      },
      message:
        "There's something strange going on here... Hot Topic isn't even available in Kanto. Yet those styles. Unmistakeable.",
      closeButtonText: 'Look Around',
    },
  },
  {
    id: 'pkmn-tower-ladder-1f',
    name: 'Ladder to 1F',
    description:
      'Its crazy that a place like this has ladders and not stairs, this is going to be exhausting, but hey complaining isnt going to solve anything.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'local',
      id: '/sprites/ladder.avif',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Climb Up',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'enter-pokemon-tower',
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
  },
  {
    id: 'pkmn-tower-blocked',
    name: 'Nope.',
    description: 'WHAT THE ?!!?!?!',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'pokemon',
      id: '93',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: '...',
    requirements: [
      {
        type: 'location_encounter_result',
        targetId: 'pokemon-tower-1f-blocked',
        battleStatus: 'loss',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'Pokemon Tower',
      icon: {
        type: 'pokemon',
        id: '93',
      },
      message: 'Forget looking for Mr Fuji Im out of here!',
      closeButtonText: 'Leave Immediately',
    },
  },
  {
    id: 'pkmn-tower-channeling-1',
    name: 'A Mysterious Girl',
    description: 'A girl in the tower says a remembered voice may reach where I cannot.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'trainer',
      id: 'psychic-f',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: "I'll hear her out",
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pkmn-tower-blocked',
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'Fetching Supplies',
      icon: {
        type: 'trainer',
        id: 'psychic-f',
      },
      message:
        'The girl needs 15 pieces of Soft Clay and 5 Dried Purple Dye to prepare a vessel for Spirit Channeling.',
      closeButtonText: "Let's go",
    },
    enterModal: [
      {
        id: 1,
        title: 'Mysterious Girl',
        message:
          "You're looking for Mr. Fuji. Whatever stopped you upstairs will turn you away again if you go back unchanged.",
        buttons: [
          {
            text: 'I never said his name...',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'psychic-f',
        },
      },
      {
        id: 2,
        title: 'Mysterious Girl',
        message:
          "You didn't need to. Worry has a loud voice, especially in a place where so many memories have gathered.",
        buttons: [
          {
            text: 'You can hear memories?',
            type: 'navigate',
            id: 3,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'psychic-f',
        },
      },
      {
        id: 3,
        title: 'Mysterious Girl',
        message:
          'Not clearly. They are more like echoes caught in people, places, and treasured objects. With the right ritual, a Pokémon can give one of those echoes enough shape to be understood.',
        buttons: [
          {
            text: 'Only a Psychic Pokémon?',
            type: 'navigate',
            id: 4,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'psychic-f',
        },
      },
      {
        id: 4,
        title: 'Mysterious Girl',
        message:
          'Every Pokémon can channel. Psychic types often sense an echo more easily, but affinity matters more than a single rule. Some memories favour a certain type, and a rare few will answer only to one particular kind of Pokémon.',
        buttons: [
          {
            text: 'So I need the right partner.',
            type: 'navigate',
            id: 5,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'psychic-f',
        },
      },
      {
        id: 5,
        title: 'Mysterious Girl',
        message:
          'Yes, and enough experience to hold the connection steady. First we need a vessel for the incense. Bring me 15 pieces of Soft Clay and 5 Dried Purple Dye, and I will show you the rest.',
        buttons: [
          {
            text: "I'll get them.",
            type: 'success',
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'psychic-f',
        },
      },
    ],
  },
  {
    id: 'pkmn-tower-channeling-2',
    name: 'Spooky Sundries',
    description: 'The clay and dye are ready. It is time to learn the full channeling ritual.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'trainer',
      id: 'psychic-f',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Prepare the vessel',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pkmn-tower-channeling-1',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        count: 15,
        consume: true,
        targetId: 'terra-dust-t1',
      },
      {
        type: 'item_owned',
        count: 5,
        targetId: 'dried-purple',
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'item',
        quantity: 1,
        targetId: 'book-of-channeling',
        secret: true,
        requirements: [],
      },
      {
        type: 'item',
        quantity: 1,
        targetId: 'incense-memory',
        secret: true,
      },
    ],
    chat: true,
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: "She's Gone!",
      icon: {
        type: 'item',
        id: 'book-of-channeling',
      },
      message:
        'The girl has vanished, leaving the Book of Channeling and Memory Incense behind. Mr. Fuji’s glasses are the first memento to try.',
      closeButtonText: "Let's go",
    },
    enterModal: [
      {
        id: 1,
        title: 'Mysterious Girl',
        message:
          'You found everything. The clay will hold the incense safely, and the dye will make its smoke visible while it gathers around a memory.',
        buttons: [
          {
            text: 'And the book?',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'psychic-f',
        },
      },
      {
        id: 2,
        title: 'Mysterious Girl',
        message:
          'The Book of Channeling records the ritual. Keep it close. It will help you recognise mementos and prepare incense, offerings, and a suitable Pokémon partner.',
        buttons: [
          {
            text: 'Start with the memento?',
            type: 'navigate',
            id: 3,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'psychic-f',
        },
      },
      {
        id: 3,
        title: 'Mysterious Girl',
        message:
          'Exactly. A memento gives the memory somewhere to gather. Mr. Fuji wore those spare glasses for years, so they should still carry an echo of what mattered to him.',
        buttons: [
          {
            text: 'What does the offering do?',
            type: 'navigate',
            id: 4,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'psychic-f',
        },
      },
      {
        id: 4,
        title: 'Mysterious Girl',
        message:
          'Materials and Gems give the echo energy. Its nature and amount must suit the memory. Watch how the smoke responds: it will tell you when an offering is foreign, too weak, or overwhelming.',
        buttons: [
          {
            text: 'Then I choose a channeler?',
            type: 'navigate',
            id: 5,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'psychic-f',
        },
      },
      {
        id: 5,
        title: 'Mysterious Girl',
        message:
          "Yes. Any Pokémon can carry an echo, provided it is experienced enough. Some memories favour a certain type or even a specific form, so read each channeler's requirements before beginning.",
        buttons: [
          {
            text: "And for Mr. Fuji's glasses?",
            type: 'navigate',
            id: 6,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'psychic-f',
        },
      },
      {
        id: 6,
        title: 'Mysterious Girl',
        message:
          'Use a partner at level 5 or higher. Any Pokémon can succeed, but a Psychic type would be the most suitable for a first attempt. Keep the connection gentle, {Trainer}.',
        buttons: [
          {
            text: 'I never told you my name...',
            type: 'success',
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'psychic-f',
        },
      },
    ],
  },
  {
    id: 'fuji-glasses-memory-revealed',
    name: "Fuji's Memory",
    description: "A memory inside Fuji's Glasses has answered the channeling.",
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'item',
      id: 'fuji-glasses',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: true,
    completionTrigger: 'manual',
    requirements: [],
    criteria: [],
    rewards: [],
  },
  {
    id: 'fuji-chronicle-memory-clears',
    name: 'The Book of Channeling',
    description: 'The spirits answer.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'item',
      id: 'book-of-channeling',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Read Book',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'The Book of Channeling',
      icon: {
        type: 'item',
        id: 'book-of-channeling',
      },
      message:
        "Powered by the ritual; the book's pages begin to flicker and writing appears on the pages with no sign of an author.",
      closeButtonText: 'Read',
    },
  },
  {
    id: 'fuji-chronicle-pokemon-house',
    name: 'The Evening Meal',
    description: 'Mr. Fuji prepares dinner for the Pokemon at the orphanage.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'local',
      id: '/sprites/trainers/special/fuji.avif',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Prepare Dinner',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Mr. Fuji',
        message:
          "Great work on the berry haul today everyone, there's enough here to feed a Rhydon!",
        buttons: [
          {
            text: 'Crush Berries',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'local',
          id: '/sprites/trainers/special/fuji.avif',
        },
      },
      {
        id: 2,
        title: 'Pokemon House',
        message:
          'The smaller Pokemon crowd the table while Kita keeps them from climbing into the bowls.',
        buttons: [
          {
            text: 'Serve Dinner',
            type: 'success',
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'pokemon',
          id: '105',
        },
      },
    ],
  },
  {
    id: 'fuji-chronicle-device-notes',
    name: 'The Green Flash',
    description: 'Something is wrong at Pokemon Tower.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Look Outside',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Pokemon House',
        message:
          'As Fuji and his Pokemon settle down to eat, a sickly green flash lights the night sky over Pokemon Tower. A high-pitched metallic screech follows.',
        buttons: [
          {
            text: 'Finish Dinner',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'item',
          id: 'fuji-glasses',
        },
      },
      {
        id: 2,
        title: 'Mr. Fuji',
        message: "Okay okay, we'll go investigate. Please just stop the tapping at the window.",
        buttons: [
          {
            text: 'Call Kita',
            type: 'navigate',
            id: 3,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'local',
          id: '/sprites/trainers/special/fuji.avif',
        },
      },
      {
        id: 3,
        title: 'Mr. Fuji',
        message:
          "Let's go Kita, see if we can't figure out what's going on. No doubt it's just Gastly up to their regular tricks. You stay here little one, we'll be back soon.",
        buttons: [
          {
            text: 'Go to the Tower',
            type: 'success',
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'pokemon',
          id: '105',
        },
      },
    ],
  },
  {
    id: 'fuji-chronicle-tower-approach',
    name: 'The Tower Road',
    description: 'Fuji and Kita approach Pokemon Tower.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'pokemon',
      id: '92',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Approach Tower',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Pokemon Tower',
        message:
          'The sickly green light fades by the time Fuji reaches the tower, but the air still carries the metallic whine of the machine inside.',
        buttons: [
          {
            text: 'Keep Walking',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'item',
          id: 'fuji-glasses',
        },
      },
      {
        id: 2,
        title: 'Mr. Fuji',
        message:
          "Stay close, Kita. If this is one of the Gastly's tricks, it has gone much too far.",
        buttons: [
          {
            text: 'Look Up',
            type: 'navigate',
            id: 3,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'local',
          id: '/sprites/trainers/special/fuji.avif',
        },
      },
      {
        id: 3,
        title: 'Pokemon Tower',
        message:
          'A torrent of Gastly bursts through the entrance, all of them fleeing at once. Fuji reaches for a Pokeball, hoping one of them can explain what is happening inside.',
        buttons: [
          {
            text: 'Throw a Pokeball',
            type: 'success',
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'pokemon',
          id: '92',
        },
      },
    ],
  },
  {
    id: 'fuji-chronicle-cubones-cry',
    name: 'A Panicked Warning',
    description: 'Kita listens to the captured Gastly.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'pokemon',
      id: '92',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Ask Kita',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'A Panicked Warning',
      icon: {
        type: 'pokemon',
        id: '92',
      },
      message:
        'Kita watches the Gastly fade in and out, pulling faces and pointing wildly up the tower. The translation is rough: "Bad. Human. Many. Scary. Machine." As the stream of Gastly dies down, Fuji and Kita press on into the tower.',
      closeButtonText: 'Enter Tower',
    },
  },
  {
    id: 'fuji-chronicle-rocket-goon-confrontation',
    name: 'The First Guard',
    description: 'A Rocket goon blocks the first floor.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Face the Goon',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Rocket Goon',
        message: 'Hey old timer, what do you think you are doing!',
        buttons: [
          {
            text: 'Answer Him',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'rocket-grunt',
        },
      },
      {
        id: 2,
        title: 'Mr. Fuji',
        message:
          "Pah. I thought I'd seen the last of you people. I can't even begin to imagine what you're up to now.",
        buttons: [
          {
            text: 'Step Forward',
            type: 'navigate',
            id: 3,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'local',
          id: '/sprites/trainers/special/fuji.avif',
        },
      },
      {
        id: 3,
        title: 'Mr. Fuji',
        message: 'Has Giovanni not learned anything from Cinnabar?',
        buttons: [
          {
            text: 'Stand Firm',
            type: 'navigate',
            id: 4,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'local',
          id: '/sprites/trainers/special/fuji.avif',
        },
      },
      {
        id: 4,
        title: 'Rocket Goon',
        message: "I see you're not going to leave quietly. Raticate, attack!",
        buttons: [
          {
            text: 'Battle',
            type: 'success',
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'rocket-grunt',
        },
      },
    ],
  },
  {
    id: 'fuji-chronicle-cable-trail',
    name: 'The Black Cables',
    description: 'Fuji follows the cable trail upward.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Follow the Cables',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'The Black Cables',
      icon: {
        type: 'trainer',
        id: 'rocket-grunt',
      },
      message:
        'Kita makes short work of the Raticate, and the Rocket flees. "Hmpf, for an organisation so obsessed with power they sure do train weak Pokemon." Fuji climbs higher through Pokemon Tower. Thick black cables snake across the floors, each one feeding a small device placed beside the memorial stones.',
      closeButtonText: 'Push Upward',
    },
  },
  {
    id: 'fuji-chronicle-mothers-stand',
    name: 'Ariana',
    description: 'Mr. Fuji finds Ariana at the top of Pokemon Tower.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'trainer',
      id: 'ariana',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Confront Ariana',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Mr. Fuji',
        message:
          'Ariana! You disgusting lapdog! What has he got you doing now? Not that it matters, you always were so happy to obey.',
        buttons: [
          {
            text: 'Step Forward',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'local',
          id: '/sprites/trainers/special/fuji.avif',
        },
      },
      {
        id: 2,
        title: 'Ariana',
        message: "Fuji. Dear me, that's no way to greet an old friend now is it?",
        buttons: [
          {
            text: 'Listen',
            type: 'navigate',
            id: 3,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'ariana',
        },
      },
      {
        id: 3,
        title: 'Rocket Grunt',
        message: '98% Ma’am.',
        buttons: [
          {
            text: 'Look at the Device',
            type: 'navigate',
            id: 4,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'rocket-grunt',
        },
      },
      {
        id: 4,
        title: 'Ariana',
        message:
          "Unlike you, Fuji, my work has led to great results. You may have even seen some of my creations on the way up here. Shadow Pokemon. Incredible power, and most importantly easy to control. If only you'd listened to my advice back then.",
        buttons: [
          {
            text: 'Hold Your Ground',
            type: 'navigate',
            id: 5,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'ariana',
        },
      },
      {
        id: 5,
        title: 'Rocket Grunt',
        message: "We're done here.",
        buttons: [
          {
            text: 'Face Ariana',
            type: 'navigate',
            id: 6,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'rocket-grunt',
        },
      },
      {
        id: 6,
        title: 'Ariana',
        message:
          'What perfect timing. You see, Fuji, the difference between us is that I see a job through to completion.',
        buttons: [
          {
            text: 'Brace Yourself',
            type: 'success',
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'ariana',
        },
      },
    ],
  },
  {
    id: 'fuji-chronicle-blackout',
    name: 'The Strike',
    description: 'Ariana orders Arbok to end the interruption.',
    category: 'Secret',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'trainer',
      id: 'ariana',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Protect Kita',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'fuji-glasses-memory-revealed',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Ariana',
        message: 'Arbok. Poison Sting.',
        buttons: [
          {
            text: 'Move',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'ariana',
        },
      },
      {
        id: 2,
        title: 'Pokemon Tower',
        message:
          'Arbok lunges forward and sinks its fangs into Kita. Fuji shouts before he can reach them.',
        buttons: [
          {
            text: 'Wait',
            type: 'navigate',
            id: 3,
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'pokemon',
          id: '24',
        },
      },
      {
        id: 3,
        title: 'Mr. Fuji',
        message: 'Waait!',
        buttons: [
          {
            text: 'Reach Out',
            type: 'success',
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'local',
          id: '/sprites/trainers/special/fuji.avif',
        },
      },
    ],
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'The Memory Ends',
      icon: {
        type: 'item',
        id: 'fuji-glasses',
      },
      message:
        "Arbok's tail swings around and strikes Fuji across the head. The glasses hit the floor, and the memory ends.",
      closeButtonText: 'Return',
    },
  },
  {
    id: 'fuji-chronicle-realisation-rocket',
    name: 'Realisation',
    description: 'The memory makes joining Team Rocket feel very different.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'item',
      id: 'fuji-glasses',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Think',
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'mr-fuji-pokemon-tower-chronicle',
        expeditionStatus: 'completed',
        count: 1,
      },
      {
        type: 'task_completed',
        targetId: 'nugget-bridge-join',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Realisation',
        message:
          "I've made a huge error in judgement. I can't believe I joined them. These people are serious. I could get myself killed. I thought those Rocket guys were Mr. Mime weird, not murder weird. How am I going to get out of this? Poor Kita... I wonder if Fuji is still up there. Ahh, what do I do? This is too big for me.",
        buttons: [
          {
            text: 'Think',
            type: 'success',
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'item',
          id: 'fuji-glasses',
        },
      },
    ],
    hide: 'fuji-chronicle-realisation-refuse',
  },
  {
    id: 'fuji-chronicle-realisation-refuse',
    name: 'Realisation',
    description: 'The memory shows how dangerous Team Rocket really is.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'item',
      id: 'fuji-glasses',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Think',
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'mr-fuji-pokemon-tower-chronicle',
        expeditionStatus: 'completed',
        count: 1,
      },
      {
        type: 'task_completed',
        targetId: 'nugget-bridge-refuse',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Realisation',
        message:
          "What did I just witness? Is Fuji still alive? That was a nasty blow. Could he still be up there? Oh man, I knew those Rocket guys were trouble, but not like this. Poor Kita. There's no way she survived that attack. I need to let someone know.",
        buttons: [
          {
            text: 'Think',
            type: 'success',
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'item',
          id: 'fuji-glasses',
        },
      },
    ],
    hide: 'fuji-chronicle-realisation-rocket',
  },
  {
    id: 'celadon-police-hq-lead',
    name: 'Celadon Police HQ',
    description: 'The nearest place to report what happened is Celadon.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'trainer',
      id: 'policeman',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Head to Celadon',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'lavender-fuji-memory-debrief',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Celadon Police HQ',
        message:
          "Celadon's not too far from here, and Police HQ is there. Someone there will know what to do.",
        buttons: [
          {
            text: 'Head to Celadon',
            type: 'success',
          },
        ],
        background: '/backgrounds/pkmn-tower.avif',
        icon: {
          type: 'trainer',
          id: 'policeman',
        },
      },
    ],
  },
  {
    id: 'pokemon-tower-return-with-choo',
    name: 'An Echo in the Mist',
    description:
      'Return to Pokemon Tower in Lavender Town alongside Detective Ray Choo to investigate the summit.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'trainer',
      id: 'detective',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Call Out to Kita',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'celadon-timeline-divergence',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 250,
        dropChance: 100,
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Detective Ray Choo',
        message:
          'Here we are, {trainer}. Pokemon Tower. The air feels heavy, but quiet... Tell me again, what are we looking for up there?',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Step Forward', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: '{trainer}',
        message:
          'You step into the candlelit mist of the entrance hall, closing your eyes and calling into the stillness: "Kita...!"',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'pokemon', id: '105' },
        buttons: [{ text: 'Feel the Spirit', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Detective Ray Choo',
        message:
          'Did you feel that? The whole room dropped ten degrees, and the mist parted toward the stairs. Something is guiding us upward. Stay close to Arcanine!',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Enter the Tower', type: 'success' }],
      },
    ],
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'A Guiding Presence',
      icon: { type: 'pokemon', id: '105' },
      message:
        'Kita’s spiritual resonance echoes through the tower floors, clearing a path toward the summit.',
      closeButtonText: 'Climb Upward',
    },
  },
  {
    id: 'pokemon-tower-clearing-the-floors',
    name: 'Ascending Through the Mist',
    description:
      'Break through the lingering shadow Pokémon in the upper corridors to reach the summit.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'pokemon',
      id: '105',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Enter the Summit',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pokemon-tower-return-with-choo',
      },
      {
        type: 'battle_result',
        targetId: 'pokemon-tower-shadow-surge-3',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 500,
        dropChance: 100,
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Detective Ray Choo',
        message:
          'Arcanine’s flames cut through the thick shadow haze. Look ahead, the dark apparitions are scattering into the walls. The summit door is right in front of us!',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Push Open Door', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Pokemon Tower Summit',
        message:
          'The heavy wooden doors swing open. A cold, ghostly wind howls across the highest floor, where eerie violet flames dance in the pale moonlight.',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'pokemon', id: '105' },
        buttons: [{ text: 'Step Forward', type: 'success' }],
      },
    ],
  },
  {
    id: 'pokemon-tower-calming-kita',
    name: 'The Spectral Flame',
    description:
      'Confront the grief-stricken spirit of Kita, reborn with ghostly flame at the summit.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'pokemon',
      id: '105',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Confront Kita',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pokemon-tower-clearing-the-floors',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'xp',
        skill: 'battling',
        quantity: 500,
        dropChance: 100,
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Detective Ray Choo',
        message:
          'Look there... in the center of the floor where Fuji was taken! Those spectral green and violet flames... Is that... Marowak?!',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Look Closely', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: '{trainer}',
        message:
          'You step onto the floorboards. The figure turns. It is Kita, but transformed, her bone club burning with otherworldly spirit fire, and her dark eyes glinting with raw sorrow and rage. Having never met you, and consumed by grief and loss, she sees only intruders before her.',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'pokemon', id: '105' },
        buttons: [{ text: 'Listen to Ray', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Detective Ray Choo',
        message:
          'Her spirit was transformed by grief and death into an Alolan Marowak! Words won’t break through that spectral tempest, {trainer}. We need to battle her and quell the rage burning in her heart!',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Face Kita in Battle', type: 'success' }],
      },
    ],
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'Challenge Kita',
      icon: { type: 'pokemon', id: '105' },
      message:
        'Challenge Kita at the summit to quell the spectral fire and bring peace to her spirit.',
      closeButtonText: 'Enter Battle',
    },
  },
  {
    id: 'pokemon-tower-kita-resolution',
    name: 'The Flame Subsides',
    description: 'The spectral flames subside as Kita’s spirit finds peace.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'pokemon',
      id: '105',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Bid Farewell',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'pokemon-tower-kita-boss',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 500,
        dropChance: 100,
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Detective Ray Choo',
        message:
          'The spectral flames... they’re subsiding. Look at her eyes, {trainer}. The tempest has passed.',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Approach Kita', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Kita',
        message:
          'Kita lowers her bone club as the green flames settle into a warm, gentle light. She looks into your eyes, giving a slow, peaceful nod of gratitude before dissolving into shimmering stardust.',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'pokemon', id: '105' },
        buttons: [{ text: 'Watch Her Rest', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Detective Ray Choo',
        message:
          'She’s finally at peace... Her spirit is free. But look, there on the stone where she was standing, something was left behind.',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Examine the Floor', type: 'success' }],
      },
    ],
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'A Spirit at Rest',
      icon: { type: 'pokemon', id: '105' },
      message:
        'Kita’s spirit has found peace and departed the tower, leaving behind a tranquil silence.',
      closeButtonText: 'Look Closer',
    },
  },
  {
    id: 'pokemon-tower-summit-azure-flute',
    name: 'A Message in the Silence',
    description: "There's a strange note here.",
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'item',
      id: 'azure-flute',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Claim Azure Flute',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pokemon-tower-kita-resolution',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'azure-flute',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'xp',
        skill: 'catching',
        quantity: 500,
        dropChance: 100,
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Note Addressed to {trainer}',
        message:
          '"For the one whose spirit defied the natural order, please take this gift. Its melody is enough to wake anything from the deepest of slumbers."',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'item', id: 'azure-flute' },
        buttons: [{ text: 'Ray’s Realization', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Detective Ray Choo',
        message:
          'What a strange instrument... Good news for us though. This happens to be exactly what we need to get past that Snorlax blocking the way south! Hopefully Koga can help us with our poison predicament!',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Take the Flute', type: 'success' }],
      },
    ],
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'The Azure Flute',
      icon: { type: 'item', id: 'azure-flute' },
      message:
        'You obtained the Azure Flute! Its celestial tone can awaken the sleeping Snorlax blocking Route 12 and Route 16, opening the path to Fuchsia City.',
      closeButtonText: 'Prepare for the South',
    },
  },
  // --- Research XP Tasks (Tower Studies) ---
  {
    id: 'pokemon-tower-gastly-spiritual-study',
    name: 'Gaseous Resonance',
    description:
      'Analyze the fluctuating gaseous density of Gastly drifting through the lower tower.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: { type: 'pokemon', id: '92' },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: true,
    completionTrigger: 'auto',
    requirements: [
      {
        type: 'field_research_result',
        targetId: 'pokemon-tower-3f-field-observation',
        battleStatus: 'win',
        count: 5,
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon_research_xp',
        targetId: '92',
        quantity: 30,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'Gaseous Resonance',
      icon: { type: 'pokemon', id: '92' },
      message:
        'You recorded detailed density spectral readings from the Gastly drifting through the lower tower incense.',
      closeButtonText: 'Record Notes',
    },
  },
  {
    id: 'pokemon-tower-haunter-shadow-study',
    name: 'Shadow Projection',
    description: 'Analyze Haunter’s detached claws and shadow distortion on the higher floors.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: { type: 'pokemon', id: '93' },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: true,
    completionTrigger: 'auto',
    requirements: [
      {
        type: 'field_research_result',
        targetId: 'pokemon-tower-5f-field-observation',
        battleStatus: 'win',
        count: 5,
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon_research_xp',
        targetId: '93',
        quantity: 30,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'Shadow Projection',
      icon: { type: 'pokemon', id: '93' },
      message:
        'You documented how Haunter manipulates light and spiritual shadows across the upper stone columns.',
      closeButtonText: 'Record Notes',
    },
  },
  {
    id: 'pokemon-tower-cubone-memorial-study',
    name: 'The Whispering Skull',
    description: 'Observe the quiet mourning rituals of Cubone near the resting stones.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: { type: 'pokemon', id: '104' },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: true,
    completionTrigger: 'auto',
    requirements: [
      {
        type: 'field_research_result',
        targetId: 'pokemon-tower-4f-field-observation',
        battleStatus: 'win',
        count: 5,
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon_research_xp',
        targetId: '104',
        quantity: 30,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'The Whispering Skull',
      icon: { type: 'pokemon', id: '104' },
      message:
        'You documented the acoustic resonance of Cubone tapping their bones in rhythm with the tower bells.',
      closeButtonText: 'Record Notes',
    },
  },
  {
    id: 'pokemon-tower-purification-circle-study',
    name: 'The Purified Circle',
    description: 'Investigate the ancient white magic circle carved into the floor of 5F.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: { type: 'pokemon', id: '105' },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: true,
    completionTrigger: 'auto',
    requirements: [
      {
        type: 'field_research_result',
        targetId: 'pokemon-tower-6f-field-observation',
        battleStatus: 'win',
        count: 5,
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon_research_xp',
        targetId: '105',
        quantity: 30,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'The Purified Circle',
      icon: { type: 'pokemon', id: '105' },
      message:
        'The holy circle pulses with residual protective energy, resonating deeply with Kita’s enduring spirit.',
      closeButtonText: 'Record Notes',
    },
  },
  {
    id: 'pokemon-tower-5f-lick-off',
    name: 'The Lick Off',
    description:
      'A Gengar on Pokemon Tower 5F is challenging your Gengar to a battle of tongues.',
    category: 'Kanto',
    subCategory: 'Pokemon Tower',
    icon: {
      type: 'pokemon',
      id: '94',
    },
    background: '/backgrounds/pkmn-tower.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Accept the Challenge',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'pokemon-tower-channeler-paula',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'skill_level',
        targetId: 'catching',
        count: 40,
      },
      {
        type: 'companion',
        count: 1,
        companionCheck: {
          speciesId: 94,
          formId: '94',
        },
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/pkmn-tower.avif',
        title: 'Gengar',
        icon: {
          type: 'pokemon',
          id: '94',
        },
        message:
          "You. Gengar. Me. Gengar. This is a Lick Off. Two Gengars enter. One... actually both leave, but only one is the better licker. Ready?",
        buttons: [
          {
            text: 'Ready?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        background: '/backgrounds/pkmn-tower.avif',
        title: 'Gengar',
        icon: {
          type: 'pokemon',
          id: '94',
        },
        message:
          "Both Gengars begin licking each other. Neither flinches. Neither blinks. They are locked in the most intense tongue battle the Tower has ever seen. It is unclear if anyone is winning.",
        buttons: [
          {
            text: 'Keep watching',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        background: '/backgrounds/pkmn-tower.avif',
        title: 'Lickitung',
        icon: {
          type: 'pokemon',
          id: '108',
        },
        message:
          "A Lickitung wanders in from the stairs. It watches for a long moment. Then, in one single, magnificent sweep, it licks BOTH Gengars from head to tail. The Lick Off ends instantly. Everyone is covered in saliva. Nobody knows what just happened.",
        buttons: [
          {
            text: 'What just happened?',
            type: 'navigate',
            id: 4,
          },
        ],
      },
      {
        id: 4,
        background: '/backgrounds/pkmn-tower.avif',
        title: 'Gengar',
        icon: {
          type: 'pokemon',
          id: '94',
        },
        message:
          "...Fine. Nobody beats the Lickitung. It is the true master of the lick. ...You saw it too. Now it knows this floor is safe. It might stay.",
        buttons: [
          {
            text: 'Welcome, Lickitung',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/pkmn-tower.avif',
      title: 'The Lick Off',
      icon: {
        type: 'pokemon',
        id: '108',
      },
      message:
        'The Lickitung licks a memorial stone, looks satisfied, and settles in on 5F. It seems to be staying.',
      closeButtonText: 'Leave Them To It',
    },
  },
]
