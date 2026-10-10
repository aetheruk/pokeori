import { Task } from '../../types'

export const saffronCityTasks: Task[] = [
  {
    id: 'saffron-gym-ambush',
    name: 'Reaching Sabrina',
    description:
      'There sure is a lot of Team Rocket about in this town fortunately the Gym was easy to find.',
    category: 'Kanto',
    subCategory: 'Saffron City',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/saffron.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'a-stone-for-a-friend',
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
        title: 'Going on Ahead',
        message:
          "Oh man where’s Ray I was hoping he’d get here before me, this feels like it might be Awkward. I don’t even know Sabrina. Oh well I guess it can’t be helped.",
        background: '/backgrounds/saffron.avif',
        icon: {
          type: 'trainer',
          id: 'rocket-grunt-m',
        },
        buttons: [
          {
            type: 'success',
            text: 'Enter Gym',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/saffron.avif',
      title: 'Sabrina?',
      icon: {
        type: 'trainer',
        id: 'rocket-grunt-f',
      },
      message: 'Hello is anyo………',
      closeButtonText: '….',
    },
  },
  // Hidden story trigger: completed silently by the blackout glow mechanic.
  {
    id: 'struggle',
    name: 'Struggle',
    description: 'A faint struggle against the dark.',
    category: '???',
    subCategory: '???',
    icon: {
      type: 'lucide',
      id: 'HelpCircle',
    },
    background: '/backgrounds/cosmos.avif',
    repeatable: false,
    secret: true,
    completionTrigger: 'manual',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'saffron-gym-ambush',
      },
    ],
    criteria: [],
    rewards: [],
  },
  // Unlocked by Struggle; id was changed after earlier test completions.
  {
    id: 'golden-glow',
    name: 'A Golden Glow',
    description: '???',
    category: '???',
    subCategory: '???',
    icon: {
      type: 'local',
      id: '/sprites/items/egg.avif',
    },
    background: '/backgrounds/cosmos-gold.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: '…',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'struggle',
      },
      {
        type: 'task_completed',
        targetId: 'saffron-gym-ambush',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: '…',
        message: 'Well now, quite the spirit in you {Trainer}',
        background: '/backgrounds/cosmos-gold.avif',
        icon: {
          type: 'local',
          id: '/sprites/items/egg.avif',
        },
        buttons: [
          {
            text: '…',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: '…',
        message:
          "I’m afraid though it’s not your day at all, No no no my child in fact The long and short of it is well… you have ended up rather, how can I put this lightly. Dead.",
        background: '/backgrounds/cosmos-gold.avif',
        icon: {
          type: 'local',
          id: '/sprites/items/egg.avif',
        },
        buttons: [
          {
            text: '…',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        title: '…',
        message: 'Perhaps it is for the best though.',
        background: '/backgrounds/cosmos-gold.avif',
        icon: {
          type: 'local',
          id: '/sprites/items/egg.avif',
        },
        buttons: [
          {
            text: '…',
            type: 'navigate',
            id: 4,
          },
        ],
      },
      {
        id: 4,
        title: '…',
        message:
          'Hmm not particularly chatty are we. Then again I suppose it is difficult getting used to the lack of form or matter.',
        background: '/backgrounds/cosmos-gold.avif',
        icon: {
          type: 'local',
          id: '/sprites/items/egg.avif',
        },
        buttons: [
          {
            text: '…',
            type: 'navigate',
            id: 5,
          },
        ],
      },
      {
        id: 5,
        title: '…',
        message: 'Focus {Trainer}.',
        background: '/backgrounds/cosmos-gold.avif',
        icon: {
          type: 'local',
          id: '/sprites/items/egg.avif',
        },
        buttons: [
          {
            text: '…',
            type: 'navigate',
            id: 6,
          },
        ],
      },
      {
        id: 6,
        title: '…',
        message: 'Do you remember how you came to be here?',
        background: '/backgrounds/cosmos-gold.avif',
        icon: {
          type: 'local',
          id: '/sprites/items/egg.avif',
        },
        buttons: [
          {
            text: 'No',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/cosmos-gold.avif',
      title: '…',
      icon: {
        type: 'local',
        id: '/sprites/items/egg.avif',
      },
      message: 'Impressive I felt that. Please allow me to show you.',
      closeButtonText: '…',
    },
  },
  // --- Rocket Chronicle Steps ---
  {
    id: 'rocket-chronicle-pokemon-tower-summit',
    name: 'Summit of Pokemon Tower',
    description: 'Kita lies fallen across the cold stone; Mr. Fuji is taken away.',
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
    completeButtonText: 'Continue',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Executive Ariana',
        message: 'Secure Fuji. Bind his hands and get him out of here.',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'trainer', id: 'ariana' },
        buttons: [{ text: 'Continue', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Rocket Grunt',
        message: 'And the Marowak? It isn’t moving…',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'trainer', id: 'rocket-grunt-m' },
        buttons: [{ text: 'Continue', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Executive Ariana',
        message:
          'What of it? Don’t tell me you’re growing a conscience. You have your orders and I have everything I need here.',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'trainer', id: 'ariana' },
        buttons: [{ text: 'Continue', type: 'success' }],
      },
    ],
  },
  {
    id: 'rocket-chronicle-celadon-reports',
    name: 'Reports from Celadon',
    description: 'The vision continues.',
    category: 'Secret',
    subCategory: 'Saffron City',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-f',
    },
    background: '/backgrounds/celadon.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Continue',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Rocket Scout',
        message:
          'Executive Ariana, urgent report from Celadon. We may have a problem. Several field agents have reported a trainer asking unusual questions and digging into Operation Shadow Force. It seems like they may be working alongside that Detective.',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'rocket-grunt-f' },
        buttons: [{ text: 'Continue', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Executive Ariana',
        message:
          'Oh Ray, you old fool. Have you not lost enough already?',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'ariana' },
        buttons: [{ text: 'Continue', type: 'success' }],
      },
    ],
  },
  {
    id: 'rocket-chronicle-poison-order',
    name: 'The Elimination Order',
    description: 'The vision continues.',
    category: 'Secret',
    subCategory: 'Saffron City',
    icon: {
      type: 'trainer',
      id: 'ariana',
    },
    background: '/backgrounds/celadon.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Continue',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Executive Ariana',
        message:
          'Arrange 2 vials, Celadon dead drop, Strike team has the details.',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'ariana' },
        buttons: [{ text: 'Continue', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Rocket Grunt',
        message:
          'Understood, Executive. Logistics is dispatching the vials to the drop location now.',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'rocket-grunt-m' },
        buttons: [{ text: 'Continue', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Executive Ariana',
        message: 'No Mistakes. We’re too close.',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'ariana' },
        buttons: [{ text: 'Continue', type: 'success' }],
      },
    ],
  },
  {
    id: 'rocket-chronicle-saffron-ambush-set',
    name: 'Moments Before',
    description: 'The vision continues.',
    category: 'Secret',
    subCategory: 'Saffron City',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-f',
    },
    background: '/backgrounds/saffron.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Continue',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Executive Ariana',
        message: 'Saffron Report, What’s the status?',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'ariana' },
        buttons: [{ text: 'Continue', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Saffron City',
        message:
          'The shadows close in as rain begins to fall on Saffron City. The order is carried out in absolute silence.',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'rocket-grunt-f' },
        buttons: [{ text: 'Continue', type: 'success' }],
      },
    ],
  },
  // --- Ray Choo Chronicle Steps ---
  {
    id: 'choo-chronicle-departing-celadon',
    name: 'Departing Celadon',
    description: 'The vision continues.',
    category: 'Secret',
    subCategory: 'Celadon City',
    icon: {
      type: 'trainer',
      id: 'detective',
    },
    background: '/backgrounds/celadon.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Continue',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Detective Ray Choo',
        message:
          'Arcanine, let’s ride! {trainer} went on ahead so we’ve got some ground to cover.',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Continue', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Detective Ray Choo',
        message:
          'Things are looking up buddy, We may finally get some answers…',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Continue', type: 'success' }],
      },
    ],
  },
  {
    id: 'choo-chronicle-approaching-saffron',
    name: 'Arriving at Saffron',
    description: 'The vision continues.',
    category: 'Secret',
    subCategory: 'Saffron City',
    icon: {
      type: 'trainer',
      id: 'detective',
    },
    background: '/backgrounds/saffron.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Continue',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Rocket Grunt',
        message: 'Hey! Old Timer, Don’t I recognise you?',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'rocket-grunt-m' },
        buttons: [{ text: 'Continue', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Detective Ray Choo',
        message:
          'I highly doubt it you must have me confused with someone else. Apologies I have places to be.',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Continue', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Rocket Grunt',
        message: 'Ray?',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'rocket-grunt-m' },
        buttons: [{ text: 'Continue', type: 'success' }],
      },
    ],
  },
  {
    id: 'choo-chronicle-breaching-saffron',
    name: 'Riding Through the Storm',
    description: 'The vision continues.',
    category: 'Secret',
    subCategory: 'Saffron City',
    icon: {
      type: 'trainer',
      id: 'detective',
    },
    background: '/backgrounds/saffron.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Continue',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Detective Ray Choo',
        message:
          'Where is everyone? Saffrons deserted except for a few members of Team Rocket on the streets.',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Continue', type: 'success' }],
      },
    ],
  },
  {
    id: 'choo-chronicle-witnessing-the-strike',
    name: 'Arrival',
    description: 'The vision continues.',
    category: 'Secret',
    subCategory: 'Saffron City',
    icon: {
      type: 'trainer',
      id: 'detective',
    },
    background: '/backgrounds/saffron.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'The vision ends',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Detective Ray Choo',
        message: '{trainer}, LOOK OUT!',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Continue', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Saffron Gym Ambush',
        message:
          'From the darkened doorway, a poisoned needle glints in the rain, striking {trainer} before they can react. {trainer} stumbles, collapsing onto the rain-slick pavement as shadows scatter.',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'rocket-grunt-f' },
        buttons: [{ text: 'Continue', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Detective Ray Choo',
        message: 'Hold on! Arcanine, clear them out! {trainer}, STAY WITH ME...',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Continue', type: 'navigate', id: 4 }],
      },
      {
        id: 4,
        title: 'The Second Needle',
        message:
          'Ray lunges forward, but from the mist beside the doorway, a second needle flashes. Ray gasps as a sudden, paralyzing chill tears through his veins.',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'rocket-grunt-f' },
        buttons: [{ text: 'Continue', type: 'navigate', id: 5 }],
      },
      {
        id: 5,
        title: 'Detective Ray Choo',
        message:
          'Ungh... what... what is this... poison...? Arcanine... fall... back... {trainer}... no...',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Continue', type: 'success' }],
      },
    ],
  },
  // --- Entity Dialogue & Celebi Time Travel ---
  {
    id: 'entity-reflections',
    name: 'A Mighty Roar',
    description: 'The golden glow returns as the memories fade into the cosmic ether.',
    category: '???',
    subCategory: '???',
    icon: {
      type: 'local',
      id: '/sprites/items/egg.avif',
    },
    background: '/backgrounds/cosmos-gold.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: '…',
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'chronicle-rocket-assassination',
        expeditionStatus: 'completed',
        count: 1,
      },
      {
        type: 'expedition_result',
        targetId: 'chronicle-ray-choo-pursuit',
        expeditionStatus: 'completed',
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
        title: '…',
        message: 'Curious your spirit remains.',
        background: '/backgrounds/cosmos-gold.avif',
        icon: { type: 'local', id: '/sprites/items/egg.avif' },
        buttons: [{ text: '…', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: '…',
        message: 'You understand your position yet you remain.',
        background: '/backgrounds/cosmos-gold.avif',
        icon: { type: 'local', id: '/sprites/items/egg.avif' },
        buttons: [{ text: '…', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: '…',
        message: 'Tell me, {trainer}… what is it that remains within you?',
        background: '/backgrounds/cosmos-gold.avif',
        icon: { type: 'local', id: '/sprites/items/egg.avif' },
        buttons: [{ text: 'Resolve', type: 'navigate', id: 4 }],
      },
      {
        id: 4,
        title: '…',
        message:
          'Impressive.',
        background: '/backgrounds/cosmos-gold.avif',
        icon: { type: 'local', id: '/sprites/items/egg.avif' },
        buttons: [{ text: '…', type: 'success' }],
      },
    ],
    exitModal: {
      background: '/backgrounds/cosmos-gold.avif',
      title: '…',
      icon: { type: 'local', id: '/sprites/items/egg.avif' },
      message:
        'With no ears to hear it and no body to feel it a mighty roar echoes across the endless cosmos.',
      closeButtonText: '…',
    },
  },
  {
    id: 'entity-celebi-warp',
    name: 'The Voice Across Time',
    description: 'A radiant emerald resonance ripples across the cosmic void.',
    category: '???',
    subCategory: '???',
    icon: {
      type: 'pokemon',
      id: '251',
    },
    background: '/backgrounds/cosmos.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: '…',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'entity-reflections',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: '…',
        message:
          'Who am I to deny the will of my creations.',
        background: '/backgrounds/cosmos.avif',
        icon: { type: 'local', id: '/sprites/items/egg.avif' },
        buttons: [{ text: 'An Emerald Light', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Voice of the Forest',
        message:
          'An emerald light pierces across the cosmos, A Pokemon emerges, its eyes fixed upon where you would be, if you were anywhere at all..',
        background: '/backgrounds/cosmos.avif',
        icon: { type: 'pokemon', id: '251' },
        buttons: [{ text: 'Continue', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: '…',
        message:
          'The children have other plans for you it seems',
        background: '/backgrounds/cosmos.avif',
        icon: { type: 'local', id: '/sprites/items/egg.avif' },
        buttons: [{ text: '…', type: 'success' }],
      },
    ],
    exitModal: {
      background: '/backgrounds/cosmos.avif',
      title: 'Blinding Light',
      icon: { type: 'pokemon', id: '251' },
      message: 'Emerald light envelops you.',
      closeButtonText: '…',
    },
  },
  {
    id: 'celadon-timeline-divergence',
    name: 'A Divergence in Time',
    description: 'Celadon City?',
    category: '???',
    subCategory: '???',
    icon: {
      type: 'trainer',
      id: 'detective',
    },
    background: '/backgrounds/celadon.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'entity-celebi-warp',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 1000,
        dropChance: 100,
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Detective Ray Choo',
        message:
          'Well, look at that Growlithe! Or rather, Arcanine now! That Fire Stone worked wonders. Now then, {trainer}, next stop: Saffron City. Sabrina’s Gym is our best bet to...',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Interrupt Ray', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: '{trainer}',
        message: 'You explain what just transpired.',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Explain', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Detective Ray Choo',
        message:
          'An ambush in Saffron…? Both of us taken out by poison…?! You’re dead serious, aren’t you. And that strange emerald glow around you… Alright, not that I don’t believe you but if what you say is true, Let’s get that poison before it’s collected.',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Let’s go!', type: 'success' }],
      },
    ],
    exitModal: {
      background: '/backgrounds/celadon.avif',
      title: 'The New Road ahead',
      icon: { type: 'trainer', id: 'detective' },
      message:
        'Was that all real? I feel strange. This is going to require a lot of therapy one day. Ray’s right though, we need to get that poison before it’s collected.',
      closeButtonText: 'Continue',
    },
  },
  {
    id: 'saffron-avoidance-reflection',
    name: 'Steer Clear of Saffron',
    description:
      'Remembering the lethal ambush, you have no intention of setting foot in Saffron City right now.',
    category: 'Kanto',
    subCategory: 'Saffron City',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/saffron.avif',
    repeatable: true,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Stay Clear',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'celadon-timeline-divergence',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: '{trainer}',
        message:
          'You look toward the fortified checkpoints of Saffron City. Team Rocket patrols the perimeter in force, and the memory of the lethal poisoned needle is still burned into your mind.',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'rocket-grunt-m' },
        buttons: [{ text: 'Think Ahead', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: '{trainer}',
        message:
          'Entering Saffron right now would be walking straight into another assassination trap. You have no intention of going here until you unravel the Rocket toxin and return fully prepared.',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'rocket-grunt-m' },
        buttons: [{ text: 'Turn Away', type: 'success' }],
      },
    ],
    exitModal: {
      background: '/backgrounds/saffron.avif',
      title: 'Saffron Under Lockdown',
      icon: { type: 'trainer', id: 'rocket-grunt-m' },
      message:
        'You keep your distance from Saffron City. Your priority lies southward toward Fuchsia City with Master Koga.',
      closeButtonText: 'Plan Your Route',
    },
  },
]
