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
    description: 'Oh no, what does she want, I really need to get out of here.',
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
    completeButtonText: 'Im kinda in a hurry',
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
        "Okay So I need to fetch 15 pieces of clay and 5 Dried purple dyes. She'll explain more when I return.",
      closeButtonText: "Let's go",
    },
    enterModal: [
      {
        id: 1,
        title: 'Mysterious Girl',
        message: "I couldn't help but overhear you're looking for someone?",
        buttons: [
          {
            text: 'I never said anything...',
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
          "Let me rephrase that. I know you're looking for someone. I heard you crystal clear in my mind's eye.",
        buttons: [
          {
            text: 'Hear. Eye?',
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
          "You're being flippant now, you know exactly what I mean. Do you want my help or not?",
        buttons: [
          {
            text: 'How?',
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
          "It's simple really. I'm going to teach you how to commune with the spirits. Well not you, you look a bit simple. But I can teach you how to work with Psychic Pokemon to channel the spirits to help.",
        buttons: [
          {
            text: 'Rude.',
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
          "There's a dark presence lingering over Pokemon Tower that I've not felt before, And not cuddly dark like Umbreon. We're talking Regular super bad times dark. I have a strong feeling by helping you out here, the future will be much brighter.",
        buttons: [
          {
            text: "Okay I'm in!",
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
    description: 'I need to get the clay and purple dye for the girl.',
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
    completeButtonText: 'Fetched it!',
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
        'Ahhh! She disappeared right in front of me, That would have been scary but not gonna lie I kinda saw that coming a mile off. Oh well here goes!',
      closeButtonText: "Let's go",
    },
    enterModal: [
      {
        id: 1,
        title: 'Mysterious Girl',
        message:
          "I knew you could be relied on, hand it over we're going to use this to produce a container specially designed to lure spirits that can reveal memories",
        buttons: [
          {
            text: 'Wow, how handy.',
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
          "Indeed. You're also going to need this Book of Channeling, it's got all the latest tips and tricks on how to commune with beings beyond your mortal understanding.",
        buttons: [
          {
            text: 'Neat!',
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
          "Now for the key part, for this to work, you'll need to provide a Memento. Something with significance to the person or place of the memory you are trying to recall.",
        buttons: [
          {
            text: "Fuji's Glasses!",
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
          "The next step is to prepare an offering, Pokemon Materials or Gems will usually work a treat, depending on the type of connection you're trying to make the offering may change, this is going be trial and error I'm afraid.",
        buttons: [
          {
            text: 'Okay...',
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
          'Finally you will need a psychic Pokemon of sufficient power to perform the actual channeling, for something like this though a Rattata would probably do, but best use a Psychic Pokemon for safety. Goodbye {Trainer} Good Luck.',
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
    description:
      'Mr. Fuji prepares dinner for the Pokemon at the orphanage.',
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
        message:
          "Okay okay, we'll go investigate. Please just stop the tapping at the window.",
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
        message:
          "Fuji. Dear me, that's no way to greet an old friend now is it?",
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
          "Arbok lunges forward and sinks its fangs into Kita. Fuji shouts before he can reach them.",
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
]
