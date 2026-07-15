import { Task } from '../../types'

const palletOrientationRequirements: Task['requirements'] = [
  {
    type: 'pokedex_caught_total',
    count: 1,
  },
  {
    type: 'task_completed',
    targetId: 'tutorial-16',
    inverse: true,
  },
  {
    type: 'expedition_result',
    targetId: 'pallet-town-orientation',
    expeditionStatus: 'completed',
    count: 1,
    inverse: true,
  },
]

export const palletTownTasks: Task[] = [
  // Debug task for Enter Modal feature
  // {
  //   id: 'debug-enter-modal',
  //   name: 'Enter Modal Debug',
  //   description:
  //     'Debug task to test all enterModal features: navigate, password, success, and fail buttons.',
  //   category: 'Kanto',
  //   subCategory: 'Pallet Town',
  //   background: '/backgrounds/lab.avif',
  //   icon: {
  //     type: 'local',
  //     id: 'oak',
  //   },
  //   repeatable: true,
  //   secret: false,
  //   completionTrigger: 'manual',
  //   completeButtonText: 'Start Debug',
  //   requirements: [],
  //   criteria: [
  //     {
  //       type: 'user_title',
  //       targetId: 'bubble-blower',
  //       count: 1,
  //       secret: true,
  //     },
  //     {
  //       type: 'user_icon',
  //       targetId: 'trainer-leaf',
  //       count: 1,
  //       secret: true,
  //     },
  //     {
  //       type: 'user_banner',
  //       targetId: 'grassy-route',
  //       count: 1,
  //       secret: true,
  //     },
  //   ],
  //   rewards: [
  //     {
  //       type: 'currency',
  //       quantity: 1,
  //       targetId: 'pokedollars',
  //       secret: true,
  //     },
  //   ],
  //   enterModal: [
  //     {
  //       id: 1,
  //       icon: { type: 'trainer', id: 'oak' },
  //       title: 'Step 1: Welcome',
  //       message: 'This is the first step of the enter modal. Choose where to go next.',
  //       background: '/backgrounds/lab.avif',
  //       buttons: [
  //         { text: 'Go to Password Step', type: 'navigate', id: 2 },
  //         { text: 'Go to Fail Demo', type: 'navigate', id: 5 },
  //         { text: 'Skip to Success', type: 'success' },
  //         { text: 'Cancel Task', type: 'fail' },
  //       ],
  //     },
  //     {
  //       id: 2,
  //       icon: { type: 'trainer', id: 'oak' },
  //       title: 'Step 2: Password Required',
  //       message:
  //         "Enter the secret password to continue. (Hint: it's a famous electric mouse Pokemon)",
  //       background: '/backgrounds/lab.avif',
  //       buttons: [
  //         { text: 'Enter Password', type: 'password', id: 3, fail: 4 },
  //         { text: 'Go Back', type: 'navigate', id: 1 },
  //       ],
  //     },
  //     {
  //       id: 3,
  //       icon: { type: 'pokemon', id: '25' },
  //       title: 'Step 3: Correct!',
  //       message: 'You got the password right! Click continue to complete the task.',
  //       background: '/backgrounds/lab.avif',
  //       buttons: [{ text: 'Continue', type: 'success' }],
  //     },
  //     {
  //       id: 4,
  //       icon: { type: 'trainer', id: 'oak' },
  //       title: 'Step 4: Wrong Password',
  //       message: 'That password was incorrect. Try again or give up.',
  //       background: '/backgrounds/lab.avif',
  //       buttons: [
  //         { text: 'Try Again', type: 'navigate', id: 2 },
  //         { text: 'Give Up', type: 'fail' },
  //       ],
  //     },
  //     {
  //       id: 5,
  //       icon: { type: 'trainer', id: 'oak' },
  //       title: 'Step 5: Fail Demo',
  //       message: 'This step demonstrates the fail button. Click it to exit without completing.',
  //       background: '/backgrounds/lab.avif',
  //       buttons: [
  //         { text: 'Exit (Fail)', type: 'fail' },
  //         { text: 'Go Back', type: 'navigate', id: 1 },
  //       ],
  //     },
  //   ],
  //   exitModal: {
  //     icon: { type: 'trainer', id: 'oak' },
  //     title: 'Debug Complete!',
  //     message: 'You successfully completed the enter modal debug task. All features are working!',
  //     closeButtonText: 'Nice!',
  //     background: '/backgrounds/lab.avif',
  //   },
  // },
  {
    id: 'pallet-orientation-professor-briefing',
    name: 'Orientation Briefing',
    description:
      "Professor Oak's orientation is interrupted by a strange cry from the back of the lab.",
    category: 'Secret',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'oak',
    },
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Begin Orientation',
    requirements: palletOrientationRequirements,
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Good timing. I was about to walk you through the basics, but something in the back room has other plans. Hm? That cry came from the cable cabinet. Jim keeps insisting it is only the wind, but the wind does not usually chew through power leads. Listen carefully and tell us what is hiding back there.',
      closeButtonText: 'Identify the Cry',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
  },
  {
    id: 'pallet-orientation-rival-selection',
    name: 'A Friendly Rival',
    description: 'Professor Oak asks who you expect to keep running into on the road ahead.',
    category: 'Secret',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'oak',
    },
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Rival',
    requirements: palletOrientationRequirements,
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'One more thing before you go. Every good journey has someone who keeps turning up at exactly the right, or wrong, time. Who do you expect to be racing you out there?',
      closeButtonText: 'Choose Rival',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    rivalSelection: true,
  },
  {
    id: 'pallet-orientation-battle-briefing',
    name: 'Battle Team Check',
    description: 'Researcher Jim needs a hand clearing the lab before the cables get chewed.',
    category: 'Secret',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Help Jim',
    requirements: palletOrientationRequirements,
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Researcher Jim',
      message:
        'Rattata, of course. That explains the teeth marks. Could you assign your partner to your battle team and scare it away before it finds another cable?',
      closeButtonText: 'Battle Rattata',
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
    },
  },
  {
    id: 'pallet-orientation-field-briefing',
    name: 'Field Kit',
    description: 'Oak has a Route 1 field exercise ready outside the lab.',
    category: 'Secret',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'oak',
    },
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Take Field Kit',
    requirements: palletOrientationRequirements,
    criteria: [],
    rewards: [
      {
        type: 'item',
        quantity: 5,
        targetId: 'poke-ball',
        requirements: [
          {
            type: 'item_owned',
            targetId: 'poke-ball',
            count: 5,
            inverse: true,
          },
        ],
      },
    ],
    chat: true,
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Good work. Route 1 is just outside. Study the Pokemon in the grass first, then use these Poke Balls to catch one for your Pokedex.',
      closeButtonText: 'Head Outside',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
  },
  {
    id: 'pallet-orientation-wrap-up',
    name: 'Adventure Ready',
    description: 'Professor Oak sends you out with a full bag and a final word of advice.',
    category: 'Secret',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'oak',
    },
    repeatable: true,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Finish Orientation',
    requirements: palletOrientationRequirements,
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'That should do it. The Pokedex is recording properly, your partner can handle itself, and you have enough supplies to make a start. Before you run for the north road, speak to the people in the lab and take a proper look around Pallet Town.',
      closeButtonText: 'Explore Pallet',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
  },
  // New Beginning Tasks
  {
    name: 'Adventure Awaits!',
    description:
      'Places to go, Pokemon to catch, and more than anything I need to get out of this lab before someone else tries to get me killed.',
    category: 'Secret',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'oak',
    },
    repeatable: false,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'pallet-town-orientation',
        expeditionStatus: 'completed',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        "You're ready for a little independence now. Speak to the people in the lab, see what Pallet Town has to offer, and come back once your Pokedex has a few more entries.",
      closeButtonText: 'Look Around',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'tutorial-16',
  },
  {
    id: 'pallet-rival-selection-catch-up',
    name: 'A Friendly Rival',
    description: 'Professor Oak has one more question about your journey.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'oak',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Rival',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'tutorial-16',
      },
      {
        type: 'rival_selected',
        inverse: true,
      },
    ],
    criteria: [],
    rewards: [],
    rivalSelection: true,
  },
  {
    id: 'pallet-artisan-glove-crafted',
    name: "Trainer's Glove Patched",
    description: 'You patched your throwing glove at the Artisan bench.',
    category: 'Secret',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'item',
      id: 'soft-fluff-t1',
    },
    repeatable: false,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [],
    criteria: [],
    rewards: [],
  },
  {
    id: 'rival-pallet-town-win-chat',
    name: 'Rival Battle',
    description: 'Your rival has one last word outside the lab.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'rival-pallet-town',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      dynamicOpponent: 'rival',
      title: 'Rival Battle',
      message:
        "Not bad for the first battle. Don't get comfortable though, the road north is just getting started.",
      closeButtonText: 'Head Out',
      icon: {
        type: 'trainer',
        id: 'youngster',
      },
    },
  },
  {
    id: 'rival-pallet-town-loss-chat',
    name: 'Rival Battle',
    description: 'Your rival has one last word outside the lab.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'rival-pallet-town',
        battleStatus: 'loss',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      dynamicOpponent: 'rival',
      title: 'Rival Battle',
      message:
        "Looks like I got the better start. Catch up before the road north gets serious.",
      closeButtonText: 'Head Out',
      icon: {
        type: 'trainer',
        id: 'youngster',
      },
    },
  },
  {
    name: 'A Terrible Mixup',
    description:
      "Well that went terribly... I'm not sure what's going on why is Brock asking me to battle something so far out of my league...",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-brock',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'battle_result',
        battleStatus: 'loss',
        count: 1,
        targetId: 'tutorial-battle-5',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        quantity: 5,
        targetId: 'rare-candy-xs',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Gym Leader Brock',
      message:
        "I think I've made a terrible mistake... You're not {Trainer}... as in Famous Champion of the Galar Region {Trainer} are you... I AM SO SORRY.",
      closeButtonText: 'Apologize',
      icon: {
        type: 'trainer',
        id: 'gym-kanto-brock',
      },
    },
    id: 'tutorial-15',
  },
  {
    name: 'Statistically Speaking',
    description:
      "So Brock thinks maybe if we go over Rhydon's stats we'll have a better chance.. I'm not sure this is going to work...",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-brock',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-13',
      },
    ],
    criteria: [
      {
        type: 'research_encounter_result',
        battleStatus: 'win',
        count: 1,
        targetId: 'tutorial-compare',
      },
    ],
    rewards: [
      {
        type: 'currency',
        quantity: 100,
        targetId: 'crystals',
      },
      {
        type: 'item',
        quantity: 1,
        targetId: 'protein',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Gym Leader Brock',
      message:
        "Right, We're ready to go, you'll get him this time. I can't wait to see a real battle!",
      closeButtonText: "I'm scared....",
      icon: {
        type: 'trainer',
        id: 'gym-kanto-brock',
      },
    },
    id: 'tutorial-14',
  },
  {
    name: 'Skill Issue',
    description:
      'Ouch ouch ouch! That Rhydon is incredibly strong I have absolutely no hope against it...',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-brock',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'battle_result',
        battleStatus: 'loss',
        count: 1,
        targetId: 'tutorial-battle-4',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        quantity: 3,
        targetId: 'battle-potion',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Gym Leader Brock',
      message:
        "Well that erm, didn't go quite how I expected, but I guess even Champions have bad days",
      closeButtonText: 'Champion?',
      icon: {
        type: 'trainer',
        id: 'gym-kanto-brock',
      },
    },
    id: 'tutorial-13',
  },
  {
    name: "Brock's Research",
    description:
      "Brock's put together a list of the Pokemon found in the cave so we can be prepared I best study it before we set out.",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-brock',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-11',
      },
    ],
    criteria: [
      {
        type: 'research_encounter_result',
        battleStatus: 'win',
        count: 1,
        targetId: 'tutorial-identify',
      },
    ],
    rewards: [
      {
        type: 'item',
        quantity: 5,
        targetId: 'battle-observer',
      },
      {
        type: 'currency',
        quantity: 100,
        targetId: 'crystals',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Gym Leader Brock',
      message:
        "All prepared? Then Let's head out! You wont need them but I've got some spare tools to help with battles.",
      closeButtonText: 'Thanks Brock',
      icon: {
        type: 'trainer',
        id: 'gym-kanto-brock',
      },
    },
    id: 'tutorial-12',
  },
  {
    name: "Brock's Terrible Photo",
    description:
      "Brock has shown me a photo of the Pokemon he's looking for but the Photo is terrible... I need to figure out what this is...",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-brock',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-10',
      },
    ],
    criteria: [
      {
        type: 'research_encounter_result',
        battleStatus: 'win',
        count: 1,
        targetId: 'who-tutorial',
      },
    ],
    rewards: [
      {
        type: 'currency',
        quantity: 100,
        targetId: 'crystals',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Gym Leader Brock',
      message: 'Rhydon Nice! you got it in one, the stories are true about you!',
      closeButtonText: 'Thanks Brock',
      icon: {
        type: 'trainer',
        id: 'gym-kanto-brock',
      },
    },
    id: 'tutorial-11',
  },
  {
    name: 'The Professors Friend!',
    description:
      "Oh so that wasn't who the Professor was talking about... apparently he's more of a pest than the Rattatas...",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'oak',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-9',
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Gym Leader Brock',
      message:
        "Wow, The {Trainer}! It's a pleasure to meet you! I'm actually here looking for a super tough Rock Pokemon. I'd love to see how you handle your Pokemon if you want to join?",
      closeButtonText: 'Join Brock',
      icon: {
        type: 'trainer',
        id: 'gym-kanto-brock',
      },
    },
    id: 'tutorial-10',
  },
  {
    name: 'Bootleg Artwork',
    description:
      "I'm not sure what just happened, but I should probably get this guy some photos he did promise me some cards.\n\n[Select Bootleg Artwork from the Research Menu]",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'tcg-maniac-m',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Here you go.',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-8',
      },
    ],
    criteria: [
      {
        type: 'research_encounter_result',
        battleStatus: 'win',
        count: 1,
        targetId: 'tutorial-snap',
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'pack-base1',
        quantity: 1,
      },
    ],
    hide: 'tutorial-9',
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'TCG Maniac Terrance',
      message:
        'Good haul? Here, have a Base Set booster pack as well. It is the classic place to start. If you want more cards, I can get them for you, but I will need crystals.',
      closeButtonText: 'Sounds... Good?',
      icon: {
        type: 'trainer',
        id: 'tcg-maniac-m',
      },
    },
    id: 'tutorial-9',
  },
  {
    name: 'The Professors Friend?',
    description: 'This must be who the Professor was talking about...',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'tcg-maniac-m',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-7',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        quantity: 1,
        targetId: 'binder-base1',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'TCG Maniac',
      message:
        "Have you heard about the Pokemon TCG?! Yeah it's like basically the best thing ever!!! Here, take a spare Base Set binder of mine. Oh also if you get chance could you take some photos for me that I can use, I'm actually making my own set of cards!",
      closeButtonText: 'Take Binder',
      icon: {
        type: 'trainer',
        id: 'tcg-maniac-m',
      },
    },
    chat: true,
    id: 'tutorial-8',
  },
  {
    id: 'pallet-artisan-soft-touch-briefing',
    name: 'A Softer Touch',
    description:
      'Professor Oak points out that Route 1 Soft Fluff can be used at the Artisan bench.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'oak',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Check the Bench',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'tutorial-16',
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'That Soft Fluff you picked up on Route 1 is more useful than it looks. Take it to the Artisan bench and patch your throwing glove before you spend all day launching Poke Balls.',
      closeButtonText: 'Use the Bench',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
  },
  {
    id: 'pallet-artisan-basics',
    name: "Patch the Trainer's Glove",
    description: 'Use Soft Fluff at the Artisan bench to patch your throwing glove.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'item',
      id: 'soft-fluff-t1',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Show Patched Glove',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'pallet-artisan-soft-touch-briefing',
      },
    ],
    criteria: [
      {
        type: 'task_completed',
        targetId: 'pallet-artisan-glove-crafted',
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'That patched glove should spare your hand from a day of launching Poke Balls. Not glamorous, but useful. Keep an eye out for more materials like that Soft Fluff.',
      closeButtonText: 'Glove Patched',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
  },
  {
    name: 'Pokedex Power',
    description:
      "This is pretty handy, my Pokédex records every Pokemon I've seen and caught on my travels, I should show the Professor what I've seen.",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'oak',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'pallet-artisan-basics',
      },
    ],
    criteria: [
      {
        type: 'pokedex_caught_total',
        battleStatus: 'win',
        count: 3,
      },
    ],
    rewards: [
      {
        type: 'item',
        quantity: 10,
        targetId: 'escape-rope',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        "Here take these, they should help you get away from those pesky Rattatas much quicker. If you've got time there's someone I'd like to introduce you to.",
      closeButtonText: 'Take Pokeballs',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'tutorial-7',
  },
  {
    name: 'Lab Assistant',
    description:
      'That was tough! I should probably go let the Professor know his Ratttata problem is sorted.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'oak',
    },
    repeatable: false,
    secret: true,
    completionTrigger: 'manual',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-5',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        quantity: 5,
        targetId: 'poke-ball',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Thank you {Trainer} hopefully we won’t have any more machines damaged! I’d like to give you these Pokeballs, you can try catching your own Pokemon outside on Route 1',
      closeButtonText: 'Take Pokeballs',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    completeButtonText: 'Continue',
    id: 'tutorial-6',
  },
  {
    name: 'Battle Rats!',
    description: 'These Rattata don’t stand a chance against my new partner!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    repeatable: false,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-4',
      },
    ],
    criteria: [
      {
        type: 'battle_result',
        battleStatus: 'win',
        count: 5,
        targetId: 'tutorial-battle',
      },
    ],
    rewards: [
      {
        type: 'currency',
        quantity: 100,
        targetId: 'crystals',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Researcher Jim',
      message: 'Wow, you’re pretty strong! Thanks so much for helping us out with this',
      closeButtonText: 'Report Back',
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
    },
    id: 'tutorial-5',
  },
  {
    name: 'Lab Rats',
    description: 'I wonder how they’re going to get rid of those Rattata…',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    repeatable: false,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-3',
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Researcher Jim',
      message:
        'Hey {Trainer}, sorry to ask but do you think you could battle with your new Pokemon to scare off the Rattata?\n\n[Assign your Pokemon to your battle team from the Pokemon menu then from the battle menu select Lab Rats]',
      closeButtonText: 'Battle Rattata',
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
    },
    id: 'tutorial-4',
  },
  {
    name: 'Find the Culprit!',
    description:
      'I need to work out what Pokemon is making that sound, it shouldn’t be too hard if I listen carefully.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    repeatable: false,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-2',
      },
    ],
    criteria: [
      {
        type: 'research_encounter_result',
        battleStatus: 'win',
        count: 1,
        targetId: 'tutorial-sound',
      },
    ],
    rewards: [
      {
        type: 'item',
        quantity: 2,
        targetId: 'rare-candy-xs',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Researcher Jim',
      message:
        'Ahh Rattata! It’s so obvious now! Thanks for helping out, please take these candies, you can use them to level up your Pokemon.',
      closeButtonText: 'Take Candies',
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
    },
    id: 'tutorial-3',
  },
  {
    name: 'Can you hear that?',
    description:
      'The Professor mentioned he’s been having a problem with wild Pokemon in the lab chewing cables, I should ask the researcher if I can help.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    repeatable: false,
    secret: true,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'pokedex_caught_total',
        battleStatus: 'win',
        targetId: '1',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Researcher Jim',
      message:
        'Can you hear that Pokemon Cry? There’s a Pokemon somewhere if we could work out which type, it would be much easier to find them.\n\n[Complete Rustling in the Lab in the Research Menu]',
      closeButtonText: 'Research the Cry',
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
    },
    id: 'tutorial-2',
  },
  {
    name: 'Bulbasaur, I choose you!',
    description: 'Bulbasaur is the only choice for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '1',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Bulbasaur',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '1',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '1',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'bulbasaur',
      },
      {
        type: 'title',
        targetId: 'starter-grass',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Bulbasaur, a great choice! With its razor sharp leaves and poisonous powders it’s a great companion to have with you on your adventure.',
      closeButtonText: 'Meet Bulbasaur',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-bulbasaur',
  },
  {
    name: 'Charmander, I choose you!',
    description: 'Charmander is the only choice for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '4',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Charmander',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '4',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '4',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'charmander',
      },
      {
        type: 'title',
        targetId: 'starter-fire',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Charmander, a great choice! With its powerful fire attacks and glowing tail it’s a great companion to have with you on your adventure.',
      closeButtonText: 'Meet Charmander',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-charmander',
  },
  {
    name: 'Squirtle, I choose you!',
    description: 'Squirtle is the only choice for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '7',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Squirtle',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '7',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '7',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'squirtle',
      },
      {
        type: 'title',
        targetId: 'starter-water',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Squirtle, a great choice! With its tough shell and bubble attacks it’s a great companion to have with you on your adventure.',
      closeButtonText: 'Meet Squirtle',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-squirtle',
  },
  // Gen 2 Starters
  {
    name: 'Chikorita, I choose you!',
    description: 'The Leaf Pokemon Chikorita is the only choice for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '152',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Chikorita',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '152',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '152',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'chikorita',
      },
      {
        type: 'title',
        targetId: 'starter-grass',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message: 'Chikorita, a wonderful choice! A gentle Pokemon that loves to soak up the sun.',
      closeButtonText: 'Meet Chikorita',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-chikorita',
  },
  {
    name: 'Cyndaquil, I choose you!',
    description: 'The Fire Mouse Pokemon Cyndaquil is the one for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '155',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Cyndaquil',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '155',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '155',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'cyndaquil',
      },
      {
        type: 'title',
        targetId: 'starter-fire',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message: 'Cyndaquil! Be careful, it flares up when it is angry or startled.',
      closeButtonText: 'Meet Cyndaquil',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-cyndaquil',
  },
  {
    name: 'Totodile, I choose you!',
    description: 'The Big Jaw Pokemon Totodile is the clear winner!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '158',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Totodile',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '158',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '158',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'totodile',
      },
      {
        type: 'title',
        targetId: 'starter-water',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message: 'Totodile! It has a habit of biting anything it sees, including its trainer.',
      closeButtonText: 'Meet Totodile',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-totodile',
  },
  // Gen 3 Starters
  {
    name: 'Treecko, I choose you!',
    description: 'The Wood Gecko Pokemon Treecko is the only choice for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '252',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Treecko',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '252',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '252',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'treecko',
      },
      {
        type: 'title',
        targetId: 'starter-grass',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message: 'Treecko! It acts cool and calm, but it will never back down from a fight.',
      closeButtonText: 'Meet Treecko',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-treecko',
  },
  {
    name: 'Torchic, I choose you!',
    description: 'The Chick Pokemon Torchic is the one for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '255',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Torchic',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '255',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '255',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'torchic',
      },
      {
        type: 'title',
        targetId: 'starter-fire',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message: 'Torchic! A fire burns inside it, so it feels very warm to hug.',
      closeButtonText: 'Meet Torchic',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-torchic',
  },
  {
    name: 'Mudkip, I choose you!',
    description: 'The Mud Fish Pokemon Mudkip is the clear winner!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '258',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Mudkip',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '258',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '258',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'mudkip',
      },
      {
        type: 'title',
        targetId: 'starter-water',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message: 'Mudkip! So... I heard you like Mudkips?',
      closeButtonText: 'I do!',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-mudkip',
  },
  // Gen 4 Starters
  {
    name: 'Turtwig, I choose you!',
    description: 'The Tiny Leaf Pokemon Turtwig is the only choice for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '387',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Turtwig',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '387',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '387',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'turtwig',
      },
      {
        type: 'title',
        targetId: 'starter-grass',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Turtwig! The shell on its back is made of soil. On a very healthy Turtwig, the shell should feel moist.',
      closeButtonText: 'Meet Turtwig',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-turtwig',
  },
  {
    name: 'Chimchar, I choose you!',
    description: 'The Chimp Pokemon Chimchar is the one for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '390',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Chimchar',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '390',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '390',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'chimchar',
      },
      {
        type: 'title',
        targetId: 'starter-fire',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message: 'Chimchar! It nimbly scales sheer cliffs to live atop craggy mountains.',
      closeButtonText: 'Meet Chimchar',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-chimchar',
  },
  {
    name: 'Piplup, I choose you!',
    description: 'The Penguin Pokemon Piplup is the clear winner!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '393',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Piplup',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '393',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '393',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'piplup',
      },
      {
        type: 'title',
        targetId: 'starter-water',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Piplup! Because it is very proud, it hates accepting food from people. Its thick down guards it from cold.',
      closeButtonText: 'Meet Piplup',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-piplup',
  },
  // Gen 5 Starters
  {
    name: 'Snivy, I choose you!',
    description: 'The Grass Snake Pokemon Snivy is the only choice for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '495',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Snivy',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '495',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '495',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'snivy',
      },
      {
        type: 'title',
        targetId: 'starter-grass',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message: 'Snivy! Being exposed to sunlight makes its movements swifter.',
      closeButtonText: 'Meet Snivy',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-snivy',
  },
  {
    name: 'Tepig, I choose you!',
    description: 'The Fire Pig Pokemon Tepig is the one for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '498',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Tepig',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '498',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '498',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'tepig',
      },
      {
        type: 'title',
        targetId: 'starter-fire',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        "Tepig! It can deftly dodge its foe's attacks while shooting fireballs from its nose.",
      closeButtonText: 'Meet Tepig',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-tepig',
  },
  {
    name: 'Oshawott, I choose you!',
    description: 'The Sea Otter Pokemon Oshawott is the clear winner!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '501',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Oshawott',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '501',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '501',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'oshawott',
      },
      {
        type: 'title',
        targetId: 'starter-water',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        "Oshawott! The scalchop on its stomach isn't just used for battle--it can be used to break open hard berries as well.",
      closeButtonText: 'Meet Oshawott',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-oshawott',
  },
  // Gen 6 Starters
  {
    name: 'Chespin, I choose you!',
    description: 'The Spiny Nut Pokemon Chespin is the only choice for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '650',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Chespin',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '650',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '650',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'chespin',
      },
      {
        type: 'title',
        targetId: 'starter-grass',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message: 'Chespin! Such a thick shell! It protects its head and back.',
      closeButtonText: 'Meet Chespin',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-chespin',
  },
  {
    name: 'Fennekin, I choose you!',
    description: 'The Fox Pokemon Fennekin is the one for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '653',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Fennekin',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '653',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '653',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'fennekin',
      },
      {
        type: 'title',
        targetId: 'starter-fire',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Fennekin! Eating a twig fills it with energy, and its roomy ears give vent to air hotter than 390 degrees Fahrenheit.',
      closeButtonText: 'Meet Fennekin',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-fennekin',
  },
  {
    name: 'Froakie, I choose you!',
    description: 'The Bubble Frog Pokemon Froakie is the clear winner!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '656',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Froakie',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '656',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '656',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'froakie',
      },
      {
        type: 'title',
        targetId: 'starter-water',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Froakie! It secretes flexible bubbles from its chest and back. The bubbles reduce the damage it would otherwise take when attacked.',
      closeButtonText: 'Meet Froakie',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-froakie',
  },
  // Gen 7 Starters
  {
    name: 'Rowlet, I choose you!',
    description: 'The Grass Quill Pokemon Rowlet is the only choice for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '722',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Rowlet',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '722',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '722',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'rowlet',
      },
      {
        type: 'title',
        targetId: 'starter-grass',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Rowlet! This wary Pokémon uses photosynthesis to store up energy during the day, while becoming active at night.',
      closeButtonText: 'Meet Rowlet',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-rowlet',
  },
  {
    name: 'Litten, I choose you!',
    description: 'The Fire Cat Pokemon Litten is the one for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '725',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Litten',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '725',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '725',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'litten',
      },
      {
        type: 'title',
        targetId: 'starter-fire',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Litten! While grooming itself, it builds up fur inside its stomach. It sets the fur alight and spews fireball attacks.',
      closeButtonText: 'Meet Litten',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-litten',
  },
  {
    name: 'Popplio, I choose you!',
    description: 'The Sea Lion Pokemon Popplio is the clear winner!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '728',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Popplio',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '728',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '728',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'popplio',
      },
      {
        type: 'title',
        targetId: 'starter-water',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Popplio! This Pokémon snorts body fluids from its nose, blowing balloons to smash into its foes.',
      closeButtonText: 'Meet Popplio',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-popplio',
  },
  // Gen 8 Starters
  {
    name: 'Grookey, I choose you!',
    description: 'The Chimp Pokemon Grookey is the only choice for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '810',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Grookey',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '810',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '810',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'grookey',
      },
      {
        type: 'title',
        targetId: 'starter-grass',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Grookey! When it uses its special stick to strike up a beat, the sound waves produced carry revitalizing energy to the plants and flowers in the area.',
      closeButtonText: 'Meet Grookey',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-grookey',
  },
  {
    name: 'Scorbunny, I choose you!',
    description: 'The Rabbit Pokemon Scorbunny is the one for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '813',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Scorbunny',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '813',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '813',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'scorbunny',
      },
      {
        type: 'title',
        targetId: 'starter-fire',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        "Scorbunny! It has special pads on the backs of its feet, and one on its nose. Once it's ready to fight, these pads radiate intense heat.",
      closeButtonText: 'Meet Scorbunny',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-scorbunny',
  },
  {
    name: 'Sobble, I choose you!',
    description: 'The Water Lizard Pokemon Sobble is the clear winner!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '816',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Sobble',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '816',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '816',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'sobble',
      },
      {
        type: 'title',
        targetId: 'starter-water',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        "Sobble! When scared, this Pokémon cries. Its tears pack the chemical punch of 100 onions, and attackers won't be able to resist weeping.",
      closeButtonText: 'Meet Sobble',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-sobble',
  },
  // Gen 9 Starters
  {
    name: 'Sprigatito, I choose you!',
    description: 'The Grass Cat Pokemon Sprigatito is the only choice for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '906',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Sprigatito',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '906',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '906',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'sprigatito',
      },
      {
        type: 'title',
        targetId: 'starter-grass',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Sprigatito! Its fluffy fur is similar in composition to plants. This Pokémon frequently washes its face to keep it from drying out.',
      closeButtonText: 'Meet Sprigatito',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-sprigatito',
  },
  {
    name: 'Fuecoco, I choose you!',
    description: 'The Fire Croc Pokemon Fuecoco is the one for me!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '909',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Fuecoco',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '909',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '909',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'fuecoco',
      },
      {
        type: 'title',
        targetId: 'starter-fire',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Fuecoco! It lies on warm rocks and uses the heat absorbed by its square-shaped scales to create fire energy.',
      closeButtonText: 'Meet Fuecoco',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-fuecoco',
  },
  {
    name: 'Quaxly, I choose you!',
    description: 'The Duckling Pokemon Quaxly is the clear winner!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '912',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Choose Quaxly',
    requirements: [
      {
        type: 'item_owned',
        battleStatus: 'win',
        count: 1,
        consume: true,
        targetId: 'starter-ball',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: '912',
        quantity: 1,
        pokemonData: {
          level: 5,
          formId: '912',
          ballType: 'cherish-ball',
          partner: true,
        },
      },
      {
        type: 'icon',
        targetId: 'quaxly',
      },
      {
        type: 'title',
        targetId: 'starter-water',
      },
      {
        type: 'banner',
        targetId: 'grassy-route',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'Quaxly! This Pokémon migrated to Paldea from distant lands long ago. The gel secreted by its feathers repels water and grime.',
      closeButtonText: 'Meet Quaxly',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'starter-quaxly',
  },
  // Stats Module Quest Line
  {
    name: 'Gathering Data',
    description: 'Ive been tasked with calibrating the stats module, time to collect some data!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'item',
      id: 'stats-scanner',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Submit Data',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'researcher-life-1',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'stats-data-1',
        count: 1,
        consume: true,
      },
      {
        type: 'item_owned',
        targetId: 'stats-data-2',
        count: 1,
        consume: true,
      },
      {
        type: 'item_owned',
        targetId: 'stats-data-3',
        count: 1,
        consume: true,
      },
      {
        type: 'item_owned',
        targetId: 'stats-data-4',
        count: 1,
        consume: true,
      },
      {
        type: 'item_owned',
        targetId: 'stats-data-5',
        count: 1,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'researching',
        quantity: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Researcher',
      message: 'Excellent! This data is exactly what we needed. Now for the next phase of testing.',
      closeButtonText: 'Next Phase',
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
    },
    id: 'stat-module-1',
  },
  {
    name: 'Rattata Data',
    description:
      'We need a large sample size to compare stats. Please catch 10 Rattata so we can analyze the variance.',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '19',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Submit Rattatas',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'stat-module-1',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        targetId: '19',
        count: 10,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'researching',
        quantity: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Researcher',
      message:
        'Perfect! With these specimens, we can finally fine-tune the algorithm. Now for the final step!',
      closeButtonText: "I'm Ready!",
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
    },
    id: 'stat-module-2',
  },
  {
    name: 'Fine Tuning',
    description: 'The final calibration requires precision, this is going to be tricky...',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'item',
      id: 'stats-scanner',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Install Module',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'stat-module-2',
      },
    ],
    criteria: [
      {
        type: 'research_encounter_result',
        battleStatus: 'win',
        count: 1,
        targetId: 'stat-module-hard',
      },
      {
        type: 'skill_level',
        targetId: 'researching',
        count: 7,
      },
    ],
    rewards: [
      {
        type: 'item',
        quantity: 1,
        targetId: 'stats-scanner',
      },
      {
        type: 'xp',
        skill: 'researching',
        quantity: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Researcher',
      message:
        "Success! The Stats Module is fully calibrated. I've installed it on your Pokedex. You can now view base stats for all your Pokemon!",
      closeButtonText: 'Open Pokedex',
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
    },
    id: 'stat-module-3',
  },
  {
    name: 'A Fresh Start',
    description: 'You must be {Trainer}, I have been expecting you!',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'oak',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Begin Adventure',
    requirements: [],
    criteria: [],
    rewards: [
      {
        type: 'item',
        quantity: 1,
        targetId: 'starter-ball',
      },
      {
        type: 'currency',
        quantity: 10,
        targetId: 'league-ticket',
      },
    ],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        'It’s a pleasure to meet you! You’re just in time, I have Pokemon from all 9 regions for you to choose from, this must be quite exciting for you.',
      closeButtonText: 'Let’s Go!',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'tutorial-1',
  },
  // Kanto Tasks
  {
    name: 'A World to Explore',
    description:
      "There's so many mysteries to discover in the world, First stop... wherever I want!",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'pokemon',
      id: '151',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-15',
      },
    ],
    criteria: [],
    chat: true,
    rewards: [],
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        "It's been a pleasure {Trainer} now it's time to discover the world, I'd recommend heading north, unless of-course you're really good at swimming...",
      closeButtonText: 'Time to go!',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'explore-1',
  },
  {
    name: "Rattata's Nest",
    description: 'You discovered a rattata nest on Route 1 [Voyage Unlocked]',
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'pokemon',
      id: '19',
    },
    repeatable: false,
    secret: true,
    completionTrigger: 'auto',
    completeButtonText: 'Inspect Nest',
    requirements: [],
    criteria: [],
    rewards: [],
    id: 'rattatas-burrow',
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Rattata',
      message: 'You found a rattata nest on Route 1',
      closeButtonText: 'Enter Burrow',
      icon: {
        type: 'pokemon',
        id: '19',
      },
    },
  },
  // Researchers Life Tasks
  {
    name: "A Researcher's Life",
    description:
      "I think, I'm going to stick around and take up the Professor's offer as a part time researcher. There's still so much for me to learn here.",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'oak',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-15',
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'The Professor',
      message:
        "So you've decided to help out! Excellent, we're actually working on an exciting addition to the Pokedex at the moment, and it would be great if you could help out.",
      closeButtonText: 'Yes Boss!',
      icon: {
        type: 'trainer',
        id: 'oak',
      },
    },
    id: 'researcher-life-1',
  },
  // Champions Path Tasks
  {
    name: 'The Champions Path',
    description:
      "I've got a taste for Pokemon Battles, I can learn so much more by taking on the Kanto Gym Challenge... But where do I go first?",
    category: 'Kanto',
    subCategory: 'Pallet Town',
    background: '/backgrounds/lab.avif',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-brock',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'task_completed',
        battleStatus: 'win',
        targetId: 'tutorial-15',
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/lab.avif',
      title: 'Gym Leader Brock',
      message:
        'Sorry about that little mix up earlier... You do have it in you to become a great trainer though. Why not stop by my gym if you get chance?',
      closeButtonText: 'Visit Gym',
      icon: {
        type: 'trainer',
        id: 'gym-kanto-brock',
      },
    },
    id: 'champions-path-1',
  },
]
