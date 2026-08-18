import { Task } from '../../types'

const robertGate = {
  type: 'battle_result' as const,
  targetId: 'route-13-bird-keeper-robert',
  battleStatus: 'win' as const,
  count: 1,
}

export const fuchsiaCityTasks: Task[] = [
  {
    id: 'route-13-manic-ditto-mew',
    name: 'Turn Into Mew',
    description:
      "The journal claims Ditto can become anything. With a Ditto by my side, there's only one way to test that theory.",
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'pokemon',
      id: '132',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Read the Journal',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'on-to-fuchsia-city',
      },
      {
        type: 'item_owned',
        targetId: 'manics-journal-pg-132',
      },
      {
        type: 'companion',
        count: 1,
        companionCheck: {
          speciesId: 132,
          formId: '132',
        },
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon_research_xp',
        targetId: '151',
        quantity: 1,
      },
    ],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/grassy-route.avif',
        title: 'Turn Into Mew',
        icon: {
          type: 'pokemon',
          id: '132',
        },
        message:
          'Okay. The journal says Mew can become anything and Ditto can become anything. Simple maths: Ditto equals Mew. Worth a shot.',
        buttons: [
          {
            text: 'Try It',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        background: '/backgrounds/grassy-route.avif',
        title: 'Turn Into Mew',
        icon: {
          type: 'pokemon',
          id: '132',
        },
        message:
          'Okay Ditto! TURN INTO MEW! ... See? It is doing it! ... It is not doing it. It is just squishing. It squished, looked at me, and squished again. That is not Mew, that is a very confused blob.',
        buttons: [
          {
            text: 'Maybe more encouragement?',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        background: '/backgrounds/grassy-route.avif',
        title: 'Turn Into Mew',
        icon: {
          type: 'pokemon',
          id: '132',
        },
        message:
          'SQUISH. SQUISH. Ooh! It blinked! Did it understand something? Maybe. Probably not. I am going to try again tomorrow.',
        buttons: [
          {
            text: 'Give Up For Now',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Turn Into Mew',
      icon: {
        type: 'pokemon',
        id: '132',
      },
      message:
        "The Ditto squishes around, looks between me and the journal, and very clearly has no idea what a Mew is. I scribble 'PARTIAL SUCCESS' in the margins. Research continues.",
      closeButtonText: 'Put the Journal Away',
    },
  },
  {
    id: 'route-14-bird-gauntlet-intro',
    name: 'The Feathered Gauntlet',
    description:
      'Donald, the Bird Champion of Route 14, is offering a challenge to every passing Trainer.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'trainer',
      id: 'bird-keeper',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Accept the Challenge',
    requirements: [robertGate],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/grassy-route.avif',
        title: 'Bird Champion Donald',
        icon: {
          type: 'trainer',
          id: 'bird-keeper',
        },
        message:
          "Hold it right there, Trainer. I've heard about you. You cleared the fishermen on Silence Bridge and every keeper on Route 13. The birds talk.",
        buttons: [
          {
            text: 'They do?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        background: '/backgrounds/grassy-route.avif',
        title: 'Bird Champion Donald',
        icon: {
          type: 'trainer',
          id: 'bird-keeper',
        },
        message:
          "Route 14 has its own tradition: the Feathered Gauntlet. Six Bird Keepers, one after another. Beat the flock and you'll earn the sky's respect. And I mean really earn it.",
        buttons: [
          {
            text: 'I accept',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'The Feathered Gauntlet',
      icon: {
        type: 'trainer',
        id: 'bird-keeper',
      },
      message: "Donald nods. 'First up is Carter. Try to keep up.'",
      closeButtonText: 'Begin',
    },
  },
  {
    id: 'route-14-bird-gauntlet-clear',
    name: 'The Sky\u2019s Respect',
    description: 'Donald has a reason he protects the wild Farfetch\u2019d of Route 14.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'pokemon',
      id: '83',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Talk to Donald',
    requirements: [
      robertGate,
      {
        type: 'battle_result',
        targetId: 'route-14-bird-champion-donald',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/grassy-route.avif',
        title: 'Bird Champion Donald',
        icon: {
          type: 'trainer',
          id: 'bird-keeper',
        },
        message:
          "Well. You actually did it. I've been waiting for a Trainer strong enough to understand.",
        buttons: [
          {
            text: 'Understand what?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        background: '/backgrounds/grassy-route.avif',
        title: 'Bird Champion Donald',
        icon: {
          type: 'trainer',
          id: 'bird-keeper',
        },
        message:
          "The wild Farfetch'd on this route are my flock. I've spent years keeping them safe, but they need a Trainer who can protect them too. They'll show themselves to you now.",
        buttons: [
          {
            text: 'I\u2019ll look after them',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        background: '/backgrounds/grassy-route.avif',
        title: 'Bird Champion Donald',
        icon: {
          type: 'trainer',
          id: 'bird-keeper',
        },
        message:
          "The gauntlet stays open for rematches whenever you want. And if you ever have flying partners, send them up with my flock. There are things worth finding in these skies.",
        buttons: [
          {
            text: 'Deal',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'The Sky\u2019s Respect',
      icon: {
        type: 'pokemon',
        id: '83',
      },
      message:
        'The Feathered Gauntlet is open for rematches, wild Farfetch\u2019d have started appearing on Route 14, and Donald\u2019s flock can run a sky patrol.',
      closeButtonText: 'Look to the Sky',
    },
  },
  {
    id: 'route-14-biker-fetch-1',
    name: 'A Spark of Goodwill',
    description: 'Biker Gerald\u2019s bike will not start without a spark plug.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'trainer',
      id: 'cyclist-m',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Hand Over Spark Plug',
    requirements: [
      robertGate,
      {
        type: 'battle_result',
        targetId: 'route-14-biker-gerald',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'greasy-spark-plug',
        count: 1,
        consume: true,
        secret: true,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 300,
        dropChance: 100,
      },
    ],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/grassy-route.avif',
        title: 'Biker Gerald',
        icon: {
          type: 'trainer',
          id: 'cyclist-m',
        },
        message:
          "Oi! You're the one who cleared the road up north, right? My bike won't start and I know why - spark plug's gone. The wild Pokemon keep kicking 'em out of the tall grass. Go shake one loose in a battle and bring it back.",
        buttons: [
          {
            text: 'Fine',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Biker Gerald',
      icon: {
        type: 'trainer',
        id: 'cyclist-m',
      },
      message:
        "Gerald squints at the greasy spark plug, nods once, and waves you past. 'Malik's your problem now.'",
      closeButtonText: 'Move On',
    },
  },
  {
    id: 'route-14-biker-fetch-2',
    name: 'A Clogged Carburetor',
    description: 'Biker Malik needs a carburetor that a Pokemon coughed up somewhere.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'trainer',
      id: 'cyclist-m',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Hand Over Carburetor',
    requirements: [
      robertGate,
      {
        type: 'battle_result',
        targetId: 'route-14-biker-malik',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'bent-carburetor',
        count: 1,
        consume: true,
        secret: true,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 300,
        dropChance: 100,
      },
    ],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/grassy-route.avif',
        title: 'Biker Malik',
        icon: {
          type: 'trainer',
          id: 'cyclist-m',
        },
        message:
          "Don't come any closer. I saw what you did to Gerald's bike. ... Fine. My carburetor's clogged. A Pokemon coughed it up somewhere in the grass - go catch yourself something and check what it was carrying.",
        buttons: [
          {
            text: 'Whatever',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Biker Malik',
      icon: {
        type: 'trainer',
        id: 'cyclist-m',
      },
      message:
        "Malik reluctantly waves you past. 'Isaac's up ahead. He's the lazy one. Good luck.'",
      closeButtonText: 'Move On',
    },
  },
  {
    id: 'route-14-biker-fetch-3',
    name: 'The Missing Chain Link',
    description: 'Biker Isaac lost a chain link somewhere in the Route 14 study spots.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'trainer',
      id: 'cyclist-m',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Hand Over Chain Link',
    requirements: [
      robertGate,
      {
        type: 'battle_result',
        targetId: 'route-14-biker-isaac',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'snapped-chain-link',
        count: 1,
        consume: true,
        secret: true,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 300,
        dropChance: 100,
      },
    ],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/grassy-route.avif',
        title: 'Biker Isaac',
        icon: {
          type: 'trainer',
          id: 'cyclist-m',
        },
        message:
          "Ugh. Do I look like I'm in a hurry? My chain snapped and one of the links rolled off into the study spots. Go poke around the tall grass with that notebook of yours and find it. I'd do it myself but... I'm resting.",
        buttons: [
          {
            text: 'Seriously?',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Biker Isaac',
      icon: {
        type: 'trainer',
        id: 'cyclist-m',
      },
      message:
        "'Yeah yeah, you found it. Lukas is the last one. He's quiet. Watch your back.'",
      closeButtonText: 'Move On',
    },
  },
  {
    id: 'route-14-bikers-cleared',
    name: 'The Road South',
    description:
      'The Junkyard Crew finally admits why they blocked the road in the first place.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'trainer',
      id: 'cyclist-m',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Talk to Lukas',
    requirements: [
      robertGate,
      {
        type: 'battle_result',
        targetId: 'route-14-biker-lukas',
        battleStatus: 'win',
        count: 1,
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
        background: '/backgrounds/grassy-route.avif',
        title: 'Biker Lukas',
        icon: {
          type: 'trainer',
          id: 'cyclist-m',
        },
        message:
          "You got the parts. You did the work. Nobody's ever done the work without complaining before.",
        buttons: [
          {
            text: 'So... why block the road?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        background: '/backgrounds/grassy-route.avif',
        title: 'Biker Lukas',
        icon: {
          type: 'trainer',
          id: 'cyclist-m',
        },
        message:
          "Truth is, we didn't block it for fun. A pack of wild Pokemon tore through our camp and wrecked every single bike. We couldn't chase them off and we were too proud to ask for help. So we just... blocked the road.",
        buttons: [
          {
            text: 'You fixed it yourselves',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        background: '/backgrounds/grassy-route.avif',
        title: 'Biker Lukas',
        icon: {
          type: 'trainer',
          id: 'cyclist-m',
        },
        message:
          "You fixed our bikes and beat all four of us. The road south is open. If anyone asks, we fixed it ourselves.",
        buttons: [
          {
            text: 'The road south is open',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'The Road South',
      icon: {
        type: 'trainer',
        id: 'cyclist-m',
      },
      message: 'The Junkyard Crew packs up camp and clears the road. Route 15 lies ahead.',
      closeButtonText: 'Head South',
    },
  },
  {
    id: 'route-15-choo-rest',
    name: 'Catching His Breath',
    description:
      'Detective Choo needs a rest before the two of you take the road to Fuchsia.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'trainer',
      id: 'detective',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Talk to Choo',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-14-bikers-cleared',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/grassy-route.avif',
        title: 'Det. Ray Choo',
        icon: {
          type: 'trainer',
          id: 'detective',
        },
        message:
          "There you are. Mind if I sit? ... Thanks. I've chased worse leads than Team Rocket, but my legs haven't been this tired since before the old precinct replaced its chairs. Don't get old, {Trainer}.",
        buttons: [
          {
            text: 'You\u2019ve earned it',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        background: '/backgrounds/grassy-route.avif',
        title: 'Det. Ray Choo',
        icon: {
          type: 'trainer',
          id: 'detective',
        },
        message:
          "Route 15's just ahead, and Fuchsia after that. I keep picturing how we're going to walk those steps - quiet and careful, like a proper investigation, or loud and fast, the way you seem to do everything. Which is it going to be?",
        buttons: [
          {
            text: 'Quiet and careful',
            type: 'navigate',
            id: 3,
          },
          {
            text: 'Loud and fast',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        background: '/backgrounds/grassy-route.avif',
        title: 'Det. Ray Choo',
        icon: {
          type: 'trainer',
          id: 'detective',
        },
        message:
          "Ha. Either way, I'll be right behind you. ... Speaking of steps. There's something I've been wanting to ask you for a while now, and it's not the kind of question you ask a colleague over coffee.",
        buttons: [
          {
            text: 'What is it?',
            type: 'navigate',
            id: 4,
          },
        ],
      },
      {
        id: 4,
        background: '/backgrounds/grassy-route.avif',
        title: 'Det. Ray Choo',
        icon: {
          type: 'trainer',
          id: 'detective',
        },
        message:
          "What was it like? Dying, I mean. I saw you come back. I've seen a lot in this job - corruption, cover-ups, a whole department on Rocket's payroll - but I have never, not once, seen someone walk out of something like that. It doesn't feel real. Any of it.",
        buttons: [
          {
            text: 'It doesn\u2019t feel real to me either',
            type: 'navigate',
            id: 5,
          },
        ],
      },
      {
        id: 5,
        background: '/backgrounds/grassy-route.avif',
        title: 'Det. Ray Choo',
        icon: {
          type: 'trainer',
          id: 'detective',
        },
        message:
          "Yeah. That's the thing, isn't it. You went through the impossible and came out the other side, and now we're standing on a road south of everything Team Rocket thinks it controls. Whatever's down there - I'm glad you're the one walking it with me.",
        buttons: [
          {
            text: 'Let\u2019s go',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Det. Ray Choo',
      icon: {
        type: 'trainer',
        id: 'detective',
      },
      message:
        'Choo stands, brushes the grass off his coat, and nods toward the road ahead. Whatever comes next, he will be right behind you.',
      closeButtonText: 'Head for Route 15',
    },
  },
  {
    id: 'explore-fuchsia-city',
    name: 'Explore Fuchsia City',
    description:
      'The Safari Zone town finally comes into view at the end of Route 15.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'local',
      id: '/sprites/sign.avif',
    },
    background: '/backgrounds/fuchsia.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Enter Fuchsia City',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-15-picnicker-yazmin',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'battle_result',
        targetId: 'route-15-battle',
        battleStatus: 'win',
        count: 3,
      },
      {
        type: 'location_encounter_result',
        targetId: 'route-15',
        count: 3,
      },
      {
        type: 'field_research_result',
        targetId: 'route-15-field-observation',
        count: 1,
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/fuchsia.avif',
      title: 'Fuchsia City',
      icon: {
        type: 'local',
        id: '/sprites/sign.avif',
      },
      message:
        'The southern city smells of flowers and dust from the Safari Zone. A whole town waits beyond the last road.',
      closeButtonText: 'Tour Fuchsia',
    },
  },
  {
    id: 'route-15-nature-module-intro',
    name: 'The Nature Module',
    description:
      'A Researcher near Fuchsia needs proof that even Ditto have personalities.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Talk to the Researcher',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-fuchsia-city',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/grassy-route.avif',
        title: 'Researcher Fern',
        icon: {
          type: 'trainer',
          id: 'researcher',
        },
        message:
          "Oh! A Trainer! Perfect timing. I'm calibrating the Nature Module - the last Pokedex tool that can read a Pokemon's personality. Some say it's not real science. THEY are not real scientists.",
        buttons: [
          {
            text: 'What do you need?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        background: '/backgrounds/grassy-route.avif',
        title: 'Researcher Fern',
        icon: {
          type: 'trainer',
          id: 'researcher',
        },
        message:
          "I need proof that Pokemon have personalities. Not just 'hmm, that Raticate looks grumpy'. Look at a Ditto - same face, same smile, every single time. If Ditto can feel anything, EVERYONE can. So bring me a Ditto that is, by nature, LONELY, and a Ditto that is, by nature, BRAVE. Catching either one is luck. Catching both is destiny. Or a really long afternoon.",
        buttons: [
          {
            text: 'Catching both it is',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Researcher Fern',
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
      message:
        "Fern hands you a checklist that says 'LONELY DITTO' and 'BRAVE DITTO' in increasingly large letters. 'Bring them to me when you find them. I will be here. I am always here.'",
      closeButtonText: 'Start Hunting',
    },
  },
  {
    id: 'route-15-nature-module-study',
    name: 'The Lonely and the Brave',
    description:
      'Researcher Fern needs a Lonely Ditto and a Brave Ditto to calibrate the Nature Module.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'item',
      id: 'nature-scanner',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Show the Pokemon',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-15-nature-module-intro',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        count: 1,
        pokemonCriteria: {
          speciesId: 132,
          formId: '132',
          nature: 'lonely',
        },
      },
      {
        type: 'pokemon_owned',
        count: 1,
        pokemonCriteria: {
          speciesId: 132,
          formId: '132',
          nature: 'brave',
        },
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'nature-scanner',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'xp',
        skill: 'researching',
        quantity: 1000,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Nature Module Calibrated',
      icon: {
        type: 'item',
        id: 'nature-scanner',
      },
      message:
        "Fern holds the Nature Module up to the Lonely Ditto, then the Brave Ditto, scribbles furiously, and beams. 'The data is PERFECT. Take it - the Nature Module is yours. Now go tell everyone what their Pokemon are really feeling. Even the blank-faced ones.'",
      closeButtonText: 'Take Nature Module',
    },
  },
]
