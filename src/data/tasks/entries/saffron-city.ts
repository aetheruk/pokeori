import { Task } from '../../types'

export const saffronCityTasks: Task[] = [
  {
    id: 'saffron-gym-ambush',
    name: 'Reaching Sabrina',
    description:
      'There sure is a lot of Rocket about in this town fortunately the Gym was easy to find.',
    category: 'Kanto',
    subCategory: 'Saffron City',
    icon: {
      type: 'trainer',
      id: 'rocket',
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
        title: 'Ahead of Choo',
        message: "Choo will be right behind me, I'll go on ahead.",
        background: '/backgrounds/saffron.avif',
        icon: {
          type: 'trainer',
          id: 'rocket',
        },
        buttons: [
          {
            type: 'success',
            text: 'Go Ahead',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/saffron.avif',
      title: 'Sabrina?',
      icon: {
        type: 'trainer',
        id: 'rocket',
      },
      message: 'Hello is anyo.........',
      closeButtonText: '....',
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
        message: 'Well now, Quite the spirit in you {Trainer}',
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
          "I'm afraid though it's not your day at all, No no no my child in fact The long and short of it is well… you have ended up rather, how can I put this lightly. Dead.",
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
        message: 'First do you remember how you came to be here?',
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
    completeButtonText: 'Oversee Operation',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Executive Ariana',
        message: 'Secure the old man. Bind his hands and load him into the transport below.',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'trainer', id: 'ariana' },
        buttons: [{ text: 'Examine Kita', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Rocket Grunt',
        message: 'And the Marowak, Executive Ariana? It isn’t moving...',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'trainer', id: 'rocket-grunt-m' },
        buttons: [{ text: 'Cold Dismissal', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Executive Ariana',
        message:
          'Leave it. It made its choice. We have what we came for: the psychic frequency baseline. Forward the data to our teams at Silph Co. We have a timetable to keep.',
        background: '/backgrounds/pkmn-tower.avif',
        icon: { type: 'trainer', id: 'ariana' },
        buttons: [{ text: 'Depart', type: 'success' }],
      },
    ],
  },
  {
    id: 'rocket-chronicle-celadon-reports',
    name: 'Reports from Celadon',
    description: 'Intelligence arrives regarding an active investigation in Celadon City.',
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
    completeButtonText: 'Review Intelligence',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Rocket Scout',
        message:
          'Executive Ariana, urgent report from Celadon. A young trainer and that private investigator, Choo, have been prying into our operations. They traced the stone deliveries and the rooftop exchange.',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'rocket-grunt-f' },
        buttons: [{ text: 'Analyze Threat', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Executive Ariana',
        message:
          'Detective Choo is predictable, but that trainer is moving far too quickly. If they connect the Celadon freight lines to Silph Co., our position in Saffron will be exposed before the lockdown is complete.',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'ariana' },
        buttons: [{ text: 'Issue Order', type: 'success' }],
      },
    ],
  },
  {
    id: 'rocket-chronicle-poison-order',
    name: 'The Elimination Order',
    description: 'Ariana arranges a solution.',
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
    completeButtonText: 'Authorize Ambush',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Executive Ariana',
        message:
          'We cannot afford complications. Contact our Celadon logistics cell. Have them arrange a package to the deaddrop." Ill see to it that its collected.',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'ariana' },
        buttons: [{ text: 'Confirm Target', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Rocket Grunt',
        message:
          'Understood, Executive. Logistics is dispatching the vial to the drop location now.',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'rocket-grunt-m' },
        buttons: [{ text: 'Final Verdict', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Executive Ariana',
        message: 'Ensure the handover is coordinated cleanly. No witnesses.',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'ariana' },
        buttons: [{ text: 'Deploy', type: 'success' }],
      },
    ],
  },
  {
    id: 'rocket-chronicle-saffron-ambush-set',
    name: 'Springing the Trap',
    description: 'The strike team stands ready as the trainer approaches Saffron Gym.',
    category: 'Secret',
    subCategory: 'Saffron City',
    icon: {
      type: 'trainer',
      id: 'rocket',
    },
    background: '/backgrounds/saffron.avif',
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Execute Strike',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Executive Ariana',
        message:
          'The target is entering the street alone. Choo is still miles behind. Take your positions. When the doors open, strike.',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'ariana' },
        buttons: [{ text: 'The Shadows Close', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Saffron City',
        message:
          'The shadows close in as rain begins to fall on Saffron City. The order is carried out in absolute silence.',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'rocket' },
        buttons: [{ text: 'Conclude Memory', type: 'success' }],
      },
    ],
  },
  // --- Ray Choo Chronicle Steps ---
  {
    id: 'choo-chronicle-departing-celadon',
    name: 'Departing Celadon',
    description: 'Ray Choo revs his engine, sensing danger stirring in the city.',
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
    completeButtonText: 'Hit the Gas',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Detective Ray Choo',
        message:
          'Arcanine, let’s roll! {trainer} went on ahead to Saffron, but something feels completely off in this city...',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Check the Alleys', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Detective Ray Choo',
        message:
          'Rocket operatives slipping through the back streets... they’re mobilizing fast. We need to catch up to {trainer} before they walk into trouble!',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Speed Away', type: 'success' }],
      },
    ],
  },
  {
    id: 'choo-chronicle-approaching-saffron',
    name: 'The Perimeter Blockade',
    description: 'Ray reaches the outskirts of Saffron City.',
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
    completeButtonText: 'Confront Guard',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Detective Ray Choo',
        message:
          'Look at those roadblocks... Rocket has the entire perimeter sealed tight. Hey, you! What did you do to the city gates?!',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Demanded Entry', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Rocket Guard',
        message: 'Turn around, old man! Saffron is under official quarantine by order of—',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'rocket-grunt-m' },
        buttons: [{ text: 'Arcanine, Attack!', type: 'success' }],
      },
    ],
  },
  {
    id: 'choo-chronicle-breaching-saffron',
    name: 'Riding Through the Storm',
    description: 'Ray speeds through the rain toward Sabrina’s Gym.',
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
    completeButtonText: 'Rush to the Gym',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Detective Ray Choo',
        message:
          'The streets are completely deserted... No civilians, only Rocket sentries. Sabrina’s Gym is just ahead. Please tell me I’m not too late...',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Turn the Corner', type: 'success' }],
      },
    ],
  },
  {
    id: 'choo-chronicle-witnessing-the-strike',
    name: 'Moments Too Late',
    description: 'Ray arrives at the Gym doors just as the lethal strike occurs.',
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
    completeButtonText: 'Despair',
    requirements: [{ type: 'task_completed', targetId: 'golden-glow' }],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Detective Ray Choo',
        message: 'There! Outside the gym doors—NO! {trainer}, LOOK OUT!',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'The Poison Strikes', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Saffron Gym Ambush',
        message:
          'From the darkened doorway, a poisoned needle glints in the rain, striking {trainer} before they can react. {trainer} stumbles, collapsing onto the rain-slick pavement as shadows scatter.',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'rocket' },
        buttons: [{ text: 'Ray Rushes In', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Detective Ray Choo',
        message: 'Hold on! Arcanine, clear them out! {trainer}, STAY WITH ME—',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'A Second Strike', type: 'navigate', id: 4 }],
      },
      {
        id: 4,
        title: 'The Second Needle',
        message:
          'Ray lunges forward, but from the mist beside the doorway, a second needle flashes. Ray gasps as a sudden, paralyzing chill tears through his veins.',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'rocket' },
        buttons: [{ text: 'Collapse', type: 'navigate', id: 5 }],
      },
      {
        id: 5,
        title: 'Detective Ray Choo',
        message:
          'Ungh... what... what is this... poison...? Arcanine... fall... back... {trainer}... no...',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Darkness Consumes All', type: 'success' }],
      },
    ],
  },
  // --- Entity Dialogue & Celebi Time Travel ---
  {
    id: 'entity-reflections',
    name: 'Threads of Fate',
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
        message:
          'A curious persistence. Most mortal consciousness dissolves into the expanse once its vessel falls. Yet your spirit maintains its form, {trainer}.',
        background: '/backgrounds/cosmos-gold.avif',
        icon: { type: 'local', id: '/sprites/items/egg.avif' },
        buttons: [{ text: '…', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: '…',
        message:
          'You have viewed the echoes of what transpired. The silence over the tower. The poison that snuffed out your companion and yourself. The designs of men seeking dominion over what they cannot comprehend.',
        background: '/backgrounds/cosmos-gold.avif',
        icon: { type: 'local', id: '/sprites/items/egg.avif' },
        buttons: [{ text: '…', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: '…',
        message:
          'Even now, in the stillness of the void, your thought pulls against the stillness. Tell me, {trainer}... what is it that remains within you?',
        background: '/backgrounds/cosmos-gold.avif',
        icon: { type: 'local', id: '/sprites/items/egg.avif' },
        buttons: [{ text: 'Resolve', type: 'navigate', id: 4 }],
      },
      {
        id: 4,
        title: '…',
        message:
          'Resolve. It is not my place to grant or deny. Creation simply bends under the weight of such conviction.',
        background: '/backgrounds/cosmos-gold.avif',
        icon: { type: 'local', id: '/sprites/items/egg.avif' },
        buttons: [{ text: 'Listen', type: 'success' }],
      },
    ],
    exitModal: {
      background: '/backgrounds/cosmos-gold.avif',
      title: '…',
      icon: { type: 'local', id: '/sprites/items/egg.avif' },
      message: 'The fabric of time stirs in response.',
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
    completeButtonText: 'Turn Back Time',
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
          'When a soul pulls hard enough upon the threads of its fate, the continuum fractures. The river of time bends toward the disturbance.',
        background: '/backgrounds/cosmos.avif',
        icon: { type: 'local', id: '/sprites/items/egg.avif' },
        buttons: [{ text: 'An Emerald Light', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: 'Voice of the Forest',
        message:
          'Drawn by the temporal distortion, an emerald light pierces the void. Celebi emerges from the starlight, its ancient eyes fixing upon {trainer}’s consciousness with quiet recognition.',
        background: '/backgrounds/cosmos.avif',
        icon: { type: 'pokemon', id: '251' },
        buttons: [{ text: 'Feel the Resonance', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: '…',
        message:
          'The wanderer of time has answered your anomaly. Whether you unravel the tapestry further or mend what was broken is for you to determine, {trainer}. The cosmos merely observes.',
        background: '/backgrounds/cosmos.avif',
        icon: { type: 'local', id: '/sprites/items/egg.avif' },
        buttons: [{ text: 'Step Through the Rift', type: 'success' }],
      },
    ],
    exitModal: {
      background: '/backgrounds/cosmos.avif',
      title: 'Temporal Shift',
      icon: { type: 'pokemon', id: '251' },
      message:
        'Emerald light envelops you. The void dissolves as the flow of time claims you once more.',
      closeButtonText: 'Awaken',
    },
  },
  {
    id: 'celadon-timeline-divergence',
    name: 'A Divergence in Time',
    description:
      'Awaken in Celadon City beside Detective Ray Choo, altering the course of destiny.',
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
    completeButtonText: 'Return to Kanto',
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
          'Well, look at that Growlithe! Or rather, Arcanine now! That Fire Stone worked wonders. Now then, {trainer}, next stop: Saffron City. Sabrina’s Gym is our best bet to—',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Interrupt Ray', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: '{trainer}',
        message:
          'Ray, stop. Saffron is an ambush. Team Rocket arranged for a lethal toxin to be delivered right here in Celadon—behind the alley drain. In the timeline I just saw, their hitman used it to strike us both down outside Sabrina’s Gym. We need to intercept that toxin now, stay clear of Saffron, and head straight to Pokémon Tower.',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Ray’s Reaction', type: 'navigate', id: 3 }],
      },
      {
        id: 3,
        title: 'Detective Ray Choo',
        message:
          'An ambush in Saffron...? Both of us taken out by poison...?! You’re dead serious, aren’t you. And that strange emerald glow lingering around you... Alright, {trainer}. I don’t know how you know this, but I trust your instincts. Let’s grab that toxin before their operative does, call off Saffron, and head straight to Pokémon Tower!',
        background: '/backgrounds/celadon.avif',
        icon: { type: 'trainer', id: 'detective' },
        buttons: [{ text: 'Break the Loop', type: 'success' }],
      },
    ],
    exitModal: {
      background: '/backgrounds/celadon.avif',
      title: 'Timeline Restored',
      icon: { type: 'trainer', id: 'detective' },
      message:
        'The cosmic veil shatters. The ambush was averted. Saffron City’s deadly trap has been broken, and the path to Pokémon Tower opens before you.',
      closeButtonText: 'Explore Kanto',
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
      id: 'rocket',
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
        icon: { type: 'trainer', id: 'rocket' },
        buttons: [{ text: 'Think Ahead', type: 'navigate', id: 2 }],
      },
      {
        id: 2,
        title: '{trainer}',
        message:
          'Entering Saffron right now would be walking straight into another assassination trap. You have no intention of going here until you unravel the Rocket toxin and return fully prepared.',
        background: '/backgrounds/saffron.avif',
        icon: { type: 'trainer', id: 'rocket' },
        buttons: [{ text: 'Turn Away', type: 'success' }],
      },
    ],
    exitModal: {
      background: '/backgrounds/saffron.avif',
      title: 'Saffron Under Lockdown',
      icon: { type: 'trainer', id: 'rocket' },
      message:
        'You keep your distance from Saffron City. Your priority lies southward toward Fuchsia City with Master Koga.',
      closeButtonText: 'Plan Your Route',
    },
  },
]
