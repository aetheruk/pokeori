import { Task } from '../../types'

const robertGate = {
  type: 'battle_result' as const,
  targetId: 'route-13-bird-keeper-robert',
  battleStatus: 'win' as const,
  count: 1,
}

const fuchsiaArrivalGate = {
  type: 'battle_result' as const,
  targetId: 'route-15-picnicker-yazmin',
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
    id: 'route-14-biker-intro',
    name: 'The Junkyard Crew',
    description:
      'A gang of Bikers has blocked the road south, and their leader wants to see you try.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'trainer',
      id: 'biker',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Talk to Gerald',
    requirements: [robertGate],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/grassy-route.avif',
        title: 'Biker Gerald',
        icon: {
          type: 'trainer',
          id: 'biker',
        },
        message:
          "Hold it right there, Trainer. Road's closed. Junkyard Crew business, and this stretch of Route 14 is ours. You want past? You'll have to beat all four of us. And even then, I'm not promising anything.",
        buttons: [
          {
            text: 'Beat all four of you?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        background: '/backgrounds/grassy-route.avif',
        title: 'Biker Gerald',
        icon: {
          type: 'trainer',
          id: 'biker',
        },
        message:
          "Me, then Malik, then Isaac, then Lukas. That's the order. Try not to break your Pokeballs on the first one.",
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
      title: 'The Junkyard Crew',
      icon: {
        type: 'trainer',
        id: 'biker',
      },
      message: "Gerald revs his bike and grins. 'First up is me. Hope you're ready.'",
      closeButtonText: 'Battle Gerald',
    },
  },
  {
    id: 'route-14-biker-fetch-1',
    name: 'A Spark of Goodwill',
    description:
      'The Junkyard Crew blocks Route 14, but Gerald says he will let you pass if you fix his bike; it will not start without a spark plug.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'trainer',
      id: 'biker',
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
        type: 'task_completed',
        targetId: 'route-14-biker-intro',
      },
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
          id: 'biker',
        },
        message:
          "Oi! You're the one who cleared the road up north, right? My bike won't start, and I know why. The spark plug's gone. The wild Pokémon keep kicking 'em out of the tall grass. Go shake one loose in a battle and bring it back.",
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
        id: 'biker',
      },
      message:
        "Gerald squints at the greasy spark plug, nods once, and waves you past. 'Malik's your problem now.'",
      closeButtonText: 'Move On',
    },
  },
  {
    id: 'route-14-biker-fetch-2',
    name: 'A Clogged Carburetor',
    description:
      'Malik is blocking the road too, and he will not move until his clogged carburetor is replaced.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'trainer',
      id: 'biker',
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
          id: 'biker',
        },
        message:
          "Don't come any closer. I saw what you did to Gerald's bike. ... Fine. My carburetor's clogged. A Pokémon coughed it up somewhere in the grass. Go catch something and check what it was carrying.",
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
        id: 'biker',
      },
      message:
        "Malik reluctantly waves you past. 'Isaac's up ahead. He's the lazy one. Good luck.'",
      closeButtonText: 'Move On',
    },
  },
  {
    id: 'route-14-biker-fetch-3',
    name: 'The Missing Chain Link',
    description:
      'Isaac\u2019s snapped chain link rolled off into the study spots; he expects you to fetch it before letting you through.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'trainer',
      id: 'biker',
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
          id: 'biker',
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
        id: 'biker',
      },
      message:
        "'Yeah yeah, you found it. Lukas is the last one. He's quiet. Watch your back.'",
      closeButtonText: 'Move On',
    },
  },
  {
    id: 'route-14-biker-confront-lukas',
    name: 'The Quiet One',
    description:
      'Biker Lukas steps onto the road. He does not say much, and that is worse.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'trainer',
      id: 'biker',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Face Lukas',
    requirements: [
      robertGate,
      {
        type: 'task_completed',
        targetId: 'route-14-biker-fetch-3',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/grassy-route.avif',
        title: 'Biker Lukas',
        icon: {
          type: 'trainer',
          id: 'biker',
        },
        message:
          "...You got the parts. All of them. Gerald said you didn't complain once. ...We'll see if that's true after you fight me.",
        buttons: [
          {
            text: 'I\u2019m ready',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Biker Lukas',
      icon: {
        type: 'trainer',
        id: 'biker',
      },
      message: 'Lukas just nods and steps onto the road.',
      closeButtonText: 'Battle Lukas',
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
      id: 'biker',
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
          id: 'biker',
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
          id: 'biker',
        },
        message:
          "Truth is, we didn't block it for fun. A pack of wild Pokémon tore through our camp and wrecked every single bike. We couldn't chase them off and we were too proud to ask for help. So we just... blocked the road.",
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
          id: 'biker',
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
        id: 'biker',
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
          "Route 15's just ahead, and Fuchsia after that. I keep picturing how we're going to walk those steps: quiet and careful, like a proper investigation, or loud and fast, the way you seem to do everything. Which is it going to be?",
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
          "What was it like? Dying, I mean. I saw you come back. I've seen a lot in this job: corruption, cover-ups, a whole department on Rocket's payroll. But I have never, not once, seen someone walk out of something like that. It doesn't feel real. Any of it.",
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
          "Yeah. That's the thing, isn't it. You went through the impossible and came out the other side, and now we're standing on a road south of everything Team Rocket thinks it controls. Whatever's down there, I'm glad you're the one walking it with me.",
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
    description: 'A long journey but we made it!',
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
      fuchsiaArrivalGate,
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
        'We need to find Koga ASAP. He should know a way to prevent this poison.',
      closeButtonText: 'Head to the Gym',
    },
  },
  {
    id: 'route-15-nature-module-intro',
    name: "Fern's Big Ditto Theory",
    description:
      'Researcher Fern already has a Lonely Ditto. She needs a Brave one to finish testing the Nature Module.',
    category: 'Kanto',
    subCategory: 'Fuchsia City',
    icon: {
      type: 'trainer',
      id: 'researcher-f',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Hear Fern Out',
    requirements: [
      fuchsiaArrivalGate,
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
          id: 'researcher-f',
        },
        message:
          "Hey, you! Sorry, I nearly walked right past you. I'm Fern. I'm trying to finish a little project, and I could use a hand. This is the Nature Module. It should be able to pick up on a Pokémon's nature, but I need to test it properly before I trust it.",
        buttons: [
          {
            text: 'What kind of test?',
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
          id: 'researcher-f',
        },
        message:
          "Ditto seemed like the perfect place to start. Same face, same little blob, completely different personalities. I already have a Lonely Ditto, but I need a Brave one to compare it with. Route 15 is a good place to look, but natures are unpredictable. You might get lucky. Or you might spend the afternoon meeting a lot of very similar Ditto.",
        buttons: [
          {
            text: "I'll look for one",
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
        id: 'researcher-f',
      },
      message:
        "Fern writes down 'Brave Ditto' and adds a note underneath: 'One Lonely Ditto already accounted for.' 'Bring me a brave one when you find it,' she says. 'Then I'll see what the module can make of the comparison.'",
      closeButtonText: 'Find a Brave Ditto',
    },
  },
  {
    id: 'route-15-nature-module-study',
    name: 'One Brave Ditto',
    description:
      "Fern's Lonely Ditto is ready for comparison. Bring her a Ditto with a Brave nature.",
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
    completeButtonText: 'Show Fern the Brave Ditto',
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
        "Fern checks the module against her Lonely Ditto, then the Brave one. The screen flickers, chirps, and finally lights up. 'It works!' she says. 'They really are different. Same face, different feelings.' She presses the Nature Module into your hands. 'Take it. You found the missing proof, so you should get to use it.'",
      closeButtonText: 'Take the Nature Module',
    },
  },
]
