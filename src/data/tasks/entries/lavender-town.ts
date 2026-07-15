import { Task } from '../../types'
import { DEED_POLL_ITEM_ID, FUJI_GLASSES_ITEM_ID } from '../../items/special-item-ids'

export const lavenderTownTasks: Task[] = [
  {
    id: 'route-8-open-road',
    name: 'Route 8',
    description: 'The road west out of Lavender leads toward Celadon City.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'local',
      id: '/sprites/sign.avif',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Take Route 8',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'celadon-police-hq-lead',
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
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Route 8',
      icon: {
        type: 'local',
        id: '/sprites/sign.avif',
      },
      message:
        'The path to Celadon stretches west from Lavender, with trainers and tall grass between you and Police HQ.',
      closeButtonText: 'Head West',
    },
  },
  {
    id: 'underground-path-route-8',
    name: 'The Underground Path',
    description:
      'The Saffron gate is still closed, but a tunnel under the city should lead toward Celadon.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'local',
      id: '/sprites/sign.avif',
    },
    background: '/backgrounds/underground.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Enter Underground Path',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-8-open-road',
      },
    ],
    criteria: [
      {
        type: 'skill_level',
        targetId: 'catching',
        count: 25,
      },
      {
        type: 'battle_result',
        targetId: 'route-8-battle',
        battleStatus: 'win',
        count: 3,
      },
      {
        type: 'location_encounter_result',
        targetId: 'route-8',
        count: 3,
      },
      {
        type: 'research_encounter_result',
        targetId: 'route-8-field-observation',
        count: 1,
      },
      {
        type: 'battle_result',
        targetId: 'route-8-biker-jaren',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'battle_result',
        targetId: 'route-8-biker-ricardo',
        battleStatus: 'win',
        count: 1,
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/underground.avif',
      title: 'Underground Path',
      icon: {
        type: 'local',
        id: '/sprites/sign.avif',
      },
      message:
        'The tunnel is long, quiet, and lit by humming lamps. At the far end, the air smells faintly of flowers and department-store polish.',
      closeButtonText: 'Head for Celadon',
    },
  },
  {
    id: 'route-8-pikablu-rumour',
    name: 'A Very Reliable Rumour',
    description:
      'Super Nerd Aidan has waited until every Route 8 trainer is beaten before sharing an important discovery.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'trainer',
      id: 'super-nerd',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Hear the Rumour',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-8-open-road',
      },
      ...[
        'route-8-lass-julia',
        'route-8-gamer-rich',
        'route-8-super-nerd-glenn',
        'route-8-twins-eli-anne',
        'route-8-lass-paige',
        'route-8-super-nerd-leslie',
        'route-8-lass-andrea',
        'route-8-lass-megan',
        'route-8-biker-jaren',
        'route-8-biker-ricardo',
        'route-8-gamer-stan',
        'route-8-super-nerd-aidan',
      ].map((targetId) => ({
        type: 'battle_result' as const,
        targetId,
        battleStatus: 'win' as const,
        count: 1,
      })),
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Super Nerd Aidan',
        icon: {
          type: 'trainer',
          id: 'super-nerd',
        },
        background: '/backgrounds/grassy-route.avif',
        message:
          'You beat everybody on Route 8! Excellent. Now that the witnesses are suitably tired, I can tell you about the most important discovery in Pokemon history or at least in this patch of grass.',
        buttons: [
          {
            text: 'What did you discover?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Super Nerd Aidan',
        icon: {
          type: 'trainer',
          id: 'super-nerd',
        },
        background: '/backgrounds/grassy-route.avif',
        message:
          'A kid saw a blue shape in the grass. Someone else heard a squeak. its obvious the Mythical Pikablu is living right here!',
        buttons: [
          {
            text: 'That is not much evidence',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        title: 'Super Nerd Aidan',
        icon: {
          type: 'trainer',
          id: 'super-nerd',
        },
        background: '/backgrounds/grassy-route.avif',
        message:
          'You say that, but I know youre intrigued get to investigating route 8, this could make us famous!',
        buttons: [
          {
            text: 'Right.',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Super Nerd Aidan',
      icon: {
        type: 'trainer',
        id: 'super-nerd',
      },
      message: "You'll see...",
      closeButtonText: 'Start Investigating',
    },
  },
  {
    id: 'route-8-pikablu-investigation',
    name: 'Evidence Pending',
    description:
      'Check Route 8 carefully and see whether the Pikablu rumour survives contact with reality.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'trainer',
      id: 'super-nerd',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Report Findings',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-8-pikablu-rumour',
      },
    ],
    criteria: [
      {
        type: 'location_encounter_result',
        targetId: 'route-8',
        count: 10,
      },
      {
        type: 'research_encounter_result',
        targetId: 'route-8-field-observation',
        count: 20,
      },
    ],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Super Nerd Aidan',
        icon: {
          type: 'trainer',
          id: 'super-nerd',
        },
        background: '/backgrounds/grassy-route.avif',
        message: 'So? Did you find my Pikablu? Please say yes.',
        buttons: [
          {
            text: 'Show the reports',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Super Nerd Aidan',
        icon: {
          type: 'trainer',
          id: 'super-nerd',
        },
        background: '/backgrounds/grassy-route.avif',
        message:
          'Hmm. Several blue things, certainly. Several round things, too. Not one confirmed Pikablu.',
        buttons: [
          {
            text: 'Keep looking',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Super Nerd Aidan',
      icon: {
        type: 'trainer',
        id: 'super-nerd',
      },
      message:
        "Dishearting, but not definitive. Let's make one final report before we give up on the whole thing.",
      closeButtonText: 'Make Final Report',
    },
  },
  {
    id: 'route-8-pikablu-confirmed',
    name: 'The Blue Conclusion',
    description: 'Its time to settle the Pikablu rumour.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'pokemon',
      id: '183',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Confirm Discovery',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-8-pikablu-investigation',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Super Nerd Aidan',
        icon: {
          type: 'trainer',
          id: 'super-nerd',
        },
        background: '/backgrounds/grassy-route.avif',
        message:
          'There Look! A blue, round Pokemon by the tree! This is it. Pikablu confirmed. I knew it!',
        buttons: [
          {
            text: 'Take a closer look',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Super Nerd Aidan',
        icon: {
          type: 'pokemon',
          id: '183',
        },
        background: '/backgrounds/grassy-route.avif',
        message:
          'What do you mean its just a Marill, thats a bonefied Pikablue right there in the flesh!',
        buttons: [
          {
            text: 'erm...',
            type: 'success',
          },
        ],
      },
      {
        id: 3,
        title: 'Super Nerd Aidan',
        icon: {
          type: 'trainer',
          id: 'super-nerd',
        },
        background: '/backgrounds/grassy-route.avif',
        message:
          'Fine. Marill it is. Although Pikablu has a much better ring to it. Either way, I was basically right!',
        buttons: [
          {
            text: 'Sure thing Boss',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Route 8 Discovery',
      icon: {
        type: 'pokemon',
        id: '183',
      },
      message:
        'Well it may not be the Mythical Pikablu but a Marill sure is unusual around these parts',
      closeButtonText: 'Search for Marill',
    },
  },
  {
    id: 'explore-lavender-town',
    name: 'Explore Lavender Town',
    description: 'The quiet town at the foot of Pokemon Tower waits beyond Rock Tunnel.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'local',
      id: '/sprites/sign.avif',
    },
    background: '/backgrounds/lavender.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Enter Lavender Town',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'rock-tunnel-exit',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/lavender.avif',
      title: 'Lavender Town',
      icon: {
        type: 'local',
        id: '/sprites/sign.avif',
      },
      message:
        'The mountain air gives way to a hushed town of soft bells, old stories, and the shadow of Pokemon Tower.',
      closeButtonText: 'Look Around',
    },
  },
  {
    id: 'lavender-name-rater',
    name: 'The Name Rater',
    description:
      'This guy has a huge sign up outside of his house: Name Rating Services. What does that even mean?',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'trainer',
      id: 'gamer',
    },
    background: '/backgrounds/lavender.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Hello...',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-lavender-town',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/lavender.avif',
        title: 'Name Rater',
        icon: {
          type: 'trainer',
          id: 'gamer',
        },
        message:
          'Ahh Trainer! You must be here about my fantastic promotional offer! 2 Name Ratings for the price of 1!',
        buttons: [
          {
            text: "I'm confused",
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        background: '/backgrounds/lavender.avif',
        title: 'Name Rater',
        icon: {
          type: 'trainer',
          id: 'gamer',
        },
        message:
          "No need to be! It's simple really. You see, I was born with a divine power. The power to rate. Watch, first one's on the house. I'll show you. What's your name kid?",
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
        background: '/backgrounds/lavender.avif',
        title: 'Name Rater',
        icon: {
          type: 'trainer',
          id: 'gamer',
        },
        message:
          "Ahh {Trainer}. Well well well, how interesting. It's coming to me... I feel the power flowing through me...... 6.3",
        buttons: [
          {
            text: '6.3?!',
            type: 'navigate',
            id: 4,
          },
        ],
      },
      {
        id: 4,
        background: '/backgrounds/lavender.avif',
        title: 'Name Rater',
        icon: {
          type: 'trainer',
          id: 'gamer',
        },
        message:
          "Yup. I'm good right? Although I'm not entirely sure you're convinced. How about a name changing license? Only 10,000!",
        buttons: [
          {
            text: '10,000?!',
            type: 'navigate',
            id: 5,
          },
        ],
      },
      {
        id: 5,
        background: '/backgrounds/lavender.avif',
        title: 'Name Rater',
        icon: {
          type: 'trainer',
          id: 'gamer',
        },
        message:
          "Cool your jets kid, printer ink isn't cheap these days. And yeah, 10,000. You try changing your Pokemon's name without a Pokemon name changing license. Go on, I dare you. Anyway, you've wasted enough of my time. Either hand over the 10,000 or get out, I'm a busy guy.",
        buttons: [
          {
            text: 'Leave',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'lavender-whats-in-a-name',
    name: "What's in a Name",
    description:
      "I find it so hard to believe you need a license to name your Pokemon, but after trying really hard I just couldn't bring myself to do it...",
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'item',
      id: DEED_POLL_ITEM_ID,
    },
    background: '/backgrounds/lavender.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Hand Over Cash',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'lavender-name-rater',
      },
    ],
    criteria: [
      {
        type: 'currency_owned',
        targetId: 'pokedollars',
        count: 10000,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: DEED_POLL_ITEM_ID,
        quantity: 1,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/lavender.avif',
      title: 'Name Rater',
      icon: {
        type: 'trainer',
        id: 'gamer',
      },
      message:
        "Hah. One born every minute. *cough* Sorry, excuse me. Here's your license, go wild. Name your Pokemon, don't name them. The world's your Cloyster. Oh, and if you ever come into any more money, just let me know. I'm sure we can think of something else you could use.",
      closeButtonText: 'Take Deed Poll',
    },
  },
  {
    id: 'lavender-missing-mountain',
    name: 'The Missing Mountain',
    description: 'A youngster is going around shouting Mt. Fuji. I wonder what their deal is.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/lavender.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Are you okay?',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-lavender-town',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: FUJI_GLASSES_ITEM_ID,
        quantity: 1,
        dropChance: 100,
      },
    ],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/lavender.avif',
        title: 'The Missing Mountain',
        icon: {
          type: 'trainer',
          id: 'youngster',
        },
        message: 'Have you seen Mr. Fuji anywhere?',
        buttons: [
          {
            text: 'Oh, Mr. not Mt. Wait, what?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        background: '/backgrounds/lavender.avif',
        title: 'The Missing Mountain',
        icon: {
          type: 'trainer',
          id: 'youngster',
        },
        message:
          'How? Those words sound nothing like each other... Nevermind. Anyway, have you seen him anywhere?',
        buttons: [
          {
            text: 'Nope, sorry',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        background: '/backgrounds/lavender.avif',
        title: 'The Missing Mountain',
        icon: {
          type: 'trainer',
          id: 'youngster',
        },
        message:
          "Is there any chance you can help look with me? Mr. Fuji looks after abandoned Pokemon, but his house has been empty for days and nobody's seen him.",
        buttons: [
          {
            text: 'Sure thing',
            type: 'navigate',
            id: 4,
          },
        ],
      },
      {
        id: 4,
        background: '/backgrounds/lavender.avif',
        title: 'The Missing Mountain',
        icon: {
          type: 'trainer',
          id: 'youngster',
        },
        message:
          "Amazing, thank you! I'm going to check south. If you could ask around Pokemon Tower? Oh, also take these. They're his spare glasses. If you do find him, he may need these.",
        buttons: [
          {
            text: "Take Fuji's Glasses",
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'lavender-silence-bridge-rumour',
    name: 'Silence Bridge Rumour',
    description:
      'A trainer near the south road is talking about a powerful Fisherman on Silence Bridge.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/lavender.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Talk About Silence Bridge',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-lavender-town',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/lavender.avif',
      title: 'Silence Bridge Rumour',
      icon: {
        type: 'trainer',
        id: 'youngster',
      },
      message:
        "You're heading south? People call that long stretch Silence Bridge. Fishermen line the whole route, and one of them is meant to be seriously strong. I tried to see for myself, but a huge Snorlax is asleep across the road. If you can find a way past it, you should check the bridge out.",
      closeButtonText: 'Head South',
    },
  },
  {
    id: 'lavender-fuji-memory-debrief',
    name: 'Fuji Memory Debrief',
    description: 'The youngster who asked you to find Mr. Fuji needs to hear what you saw.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/lavender.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Tell Him',
    requirements: [
      {
        type: 'any_of',
        label: 'Realisation complete',
        conditions: [
          {
            type: 'task_completed',
            targetId: 'fuji-chronicle-realisation-rocket',
          },
          {
            type: 'task_completed',
            targetId: 'fuji-chronicle-realisation-refuse',
          },
        ],
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/lavender.avif',
        title: 'The Missing Mountain',
        icon: {
          type: 'trainer',
          id: 'youngster',
        },
        message:
          "You're back! Did you find Mr. Fuji? I checked the south road, but a Snorlax is blocking Silence Bridge and nobody down there saw him.",
        buttons: [
          {
            text: 'I saw a memory',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        background: '/backgrounds/lavender.avif',
        title: 'The Missing Mountain',
        icon: {
          type: 'trainer',
          id: 'youngster',
        },
        message:
          'A memory? With Team Rocket, a machine, and Mr. Fuji getting hurt? That is way bigger than a missing person poster.',
        buttons: [
          {
            text: 'What now?',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        background: '/backgrounds/lavender.avif',
        title: 'The Missing Mountain',
        icon: {
          type: 'trainer',
          id: 'youngster',
        },
        message:
          "Celadon's not too far from here, and Police HQ is there. If anyone can do something about Team Rocket and find Mr. Fuji, it's them.",
        buttons: [
          {
            text: 'Head to Celadon',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'route-12-sleeping-snorlax',
    name: 'Sleeping Snorlax',
    description: 'A Snorlax is sleeping across Route 12. If only there was a way to wake it.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'pokemon',
      id: '143',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Use Poke Flute',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-12-fisherman-elliot',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'pokeflute',
        secret: true,
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Sleeping Snorlax',
      icon: {
        type: 'pokemon',
        id: '143',
      },
      message: 'The Snorlax wakes up and does not look happy!',
      closeButtonText: 'Uh oh',
    },
  },
  {
    id: 'route-12-nido-fan-wrapup',
    name: 'Nido Fan Reunion',
    description: 'Two familiar Nido fans are comparing sketches and story notes on Silence Bridge.',
    category: 'Kanto',
    subCategory: 'Lavender Town',
    icon: {
      type: 'pokemon',
      id: '34',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Say Hi',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-12-fisherman-elliot',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'task_completed',
        targetId: 'nido-moonstone-promise',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        background: '/backgrounds/grassy-route.avif',
        title: 'Lass',
        icon: {
          type: 'trainer',
          id: 'lass',
        },
        message:
          "Oh! It's you! I knew we'd run into you again. Look, look, she evolved! I had to redraw every sketch because Nidoqueen stands completely differently.",
        buttons: [
          {
            text: 'She looks strong',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        background: '/backgrounds/grassy-route.avif',
        title: 'Youngster',
        icon: {
          type: 'trainer',
          id: 'youngster',
        },
        message:
          'And my Nidoking is exactly how I wrote him. Well, mostly. I wrote him as brooding and mysterious, but he keeps posing whenever she starts sketching.',
        buttons: [
          {
            text: 'Sounds about right',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        background: '/backgrounds/grassy-route.avif',
        title: 'Nido Fans',
        icon: {
          type: 'pokemon',
          id: '34',
        },
        message:
          "We promised we'd have a proper battle once they evolved. You introduced us, so you should be the first Trainer to see our King and Queen together!",
        buttons: [
          {
            text: 'I accept',
            type: 'success',
          },
        ],
      },
    ],
  },
]
