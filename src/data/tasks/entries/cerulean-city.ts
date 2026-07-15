import { Task } from '../../types'

export const ceruleanCityTasks: Task[] = [
  {
    id: 'route-4-scared-scientist',
    name: 'Scared Scientist',
    description: 'Oh I think I recognise that guy from the lab.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Say Hi',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'mt-moon-exit',
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Scared Scientist',
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
      message:
        "Hey {Trainer} oh man you gotta help me out here! The Professor's got me researching Ekans, but I'm terrified, they're so slippery and creepy and not to mention highly poisonous! I wouldn't usually ask, but is there any chance you can get some research data for me?",
      closeButtonText: "I'll Help",
    },
  },
  {
    id: 'snake-science',
    name: 'Snake Science',
    description: "Guess I best help the poor guy, and if I get bored I'll just make something up.",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'researcher',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Give Data',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-4-scared-scientist',
      },
    ],
    criteria: [
      {
        type: 'research_level',
        targetId: '23',
        count: 1,
      },
    ],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Scared Scientist',
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
      message:
        "Wait you're telling me Ekans can grow to 80ft long?! That doesn't seem right, the ones here are so small! But you're the expert! Thanks {Trainer}. The Professor needs to hear about this!",
      closeButtonText: 'No Problem',
    },
  },
  {
    id: 'explore-cerulean-city',
    name: 'Explore Cerulean City',
    description: "I've finally made it to Cerulean City!",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'local',
      id: '/sprites/sign.avif',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Enter City',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'snake-science',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 500,
      },
    ],
    exitModal: {
      background: '/backgrounds/cerulean.avif',
      title: 'Cerulean City',
      icon: {
        type: 'local',
        id: '/sprites/sign.avif',
      },
      message: 'Wow there sure is a lot going on here! where do I start?',
      closeButtonText: 'Enter City',
    },
  },
  {
    id: 'bulbasaur-1',
    name: 'My Picnic Secret',
    description:
      "I've wandered in to a random house in Cerulean City, I'm pretty sure that's absolutely normal behaviour...",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'picknicker',
    },
    background: '/backgrounds/inside-house.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-cerulean-city',
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Cerulean City',
      icon: {
        type: 'trainer',
        id: 'picknicker',
      },
      message:
        "Maybe I should check out this spot in Viridian Forest? Well either way I can't stay here...",
      closeButtonText: 'Run Away',
    },
    enterModal: [
      {
        id: 1,
        title: 'Peculiar Picknicker',
        message: 'Hey, you must have been drawn in by the smell of my fresh sandwiches!',
        buttons: [
          {
            text: 'Yeah... That makes sense, Sure!',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'picknicker',
        },
      },
      {
        id: 2,
        title: 'Peculiar Picknicker',
        message:
          "I learnt everything I know about sandwiches in Paldea, I'm actually a picnic enthusiast, and you can't have a picnic without sandwiches!",
        buttons: [
          {
            text: 'Uhuh...',
            type: 'navigate',
            id: 3,
          },
        ],
        icon: {
          type: 'trainer',
          id: 'picknicker',
        },
        background: '/backgrounds/inside-house.avif',
      },
      {
        id: 3,
        title: 'Peculiar Picknicker',
        message:
          'Me and my Pikachu here have travelled the world looking for the perfect picnic spot, and in every place we go we learn as much about the local Pokemon as we can',
        buttons: [
          {
            text: 'Right on...',
            type: 'navigate',
            id: 4,
          },
        ],
        icon: {
          type: 'pokemon',
          id: '25',
        },
        background: '/backgrounds/inside-house.avif',
      },
      {
        id: 4,
        title: 'Peculiar Picknicker',
        message:
          "Sometime's I'll just be researching the local Pokemon and Pikachu will run off, in fact that's how I came to find my favourite spot in Viridian Forest",
        buttons: [
          {
            text: "Viridian Forest, you don't say?",
            type: 'navigate',
            id: 5,
          },
        ],
        icon: {
          type: 'trainer',
          id: 'picknicker',
        },
        background: '/backgrounds/inside-house.avif',
      },
      {
        id: 5,
        title: 'Peculiar Picknicker',
        message: 'Well anyway, I just have a quick question for you...',
        buttons: [
          {
            text: 'Go Ahead...',
            type: 'navigate',
            id: 6,
          },
        ],
        icon: {
          type: 'trainer',
          id: 'picknicker',
        },
        background: '/backgrounds/inside-house.avif',
      },
      {
        id: 6,
        title: 'Peculiar Picknicker',
        message:
          'WHAT THE HECK MADE YOU THINK YOU COULD JUST WANDER IN TO MY HOUSE?!?! GET OUT RIGHT NOW!!!!!',
        buttons: [
          {
            text: 'Run Away',
            type: 'success',
          },
        ],
        icon: {
          type: 'trainer',
          id: 'picknicker',
        },
        background: '/backgrounds/inside-house.avif',
      },
    ],
    completeButtonText: 'Hello!?',
  },
  {
    id: 'bike-shop-trade',
    name: 'Cerulean Cycles',
    description: 'Wow the prices in here are craaazy!',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'item',
      id: 'broken-bike',
    },
    background: '/backgrounds/bike-shop.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Trade Bike',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-cerulean-city',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'broken-bike',
        count: 1,
        consume: true,
        secret: true,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'lost-key',
        quantity: 1,
        secret: true,
      },
    ],
    exitModal: {
      background: '/backgrounds/bike-shop.avif',
      title: 'Cycle Shop Owner',
      icon: {
        type: 'item',
        id: 'broken-bike',
      },
      message:
        "Oh wow a completely trashed bike! sure I'll take it off your hands, let me find something equally useful, how about this random key I found on the floor...",
      closeButtonText: 'Thanks?',
    },
  },
  {
    id: 'cerulean-trade-jynx',
    name: 'Making Deals in Cerulean City',
    description: 'A trainer in Cerulean City is looking for a Poliwhirl',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'lass',
    },
    background: '/backgrounds/inside-house.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Trade Poliwhirl',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-cerulean-city',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        pokemonCriteria: {
          speciesId: 61,
        },
        count: 1,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'pokemon',
        targetId: 124,
        pokemonData: {
          formId: '124',
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
        id: '124',
      },
      message: 'Yesss my own Poliwhirl! Thank you so much!',
      closeButtonText: 'Great Trade!',
    },
  },
  {
    id: 'a-berry-good-invention',
    name: 'A Berry Good Invention',
    description: 'An Inventor from Cerulean city has come up with a great way to utilise berries.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'item',
      id: 'razz-berry',
    },
    background: '/backgrounds/inside-house.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Help Inventor',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-cerulean-city',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'razz-berry',
        count: 3,
        consume: false,
      },
      {
        type: 'user_level',
        targetId: 'artisan',
        count: 10,
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'A Berry Good Invention',
      icon: {
        type: 'trainer',
        id: 'researcher',
      },
      message:
        'Berries by themselves are great, but with my machine we can concentrate their effects into a special powder which I need for my research, I even have some great items to trade for any work you do..',
      closeButtonText: 'Sounds Good!',
    },
  },
  {
    id: 'cerulean-police-block',
    name: 'Police Presence',
    description: 'I wonder what the police are doing here...',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'policeman',
    },
    background: '/backgrounds/cerulean.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Ask Police',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-cerulean-city',
      },
      {
        type: 'battle_result',
        targetId: 'cerulean-gym-misty',
        battleStatus: 'win',
        count: 1,
        inverse: true,
      },
    ],
    criteria: [
      {
        type: 'battle_result',
        targetId: 'cerulean-gym-misty',
        battleStatus: 'win',
        count: 1,
        secret: true,
      },
    ],
    rewards: [],
  },
  {
    id: 'razz-berry-discovery',
    name: 'Discovered a Razz Berry bush',
    description: 'You stumbled upon a hidden Razz Berry bush!',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'item',
      id: 'razz-berry',
    },
    background: '/backgrounds/grassy-route.avif',
    repeatable: false,
    secret: true,
    completionTrigger: 'auto',
    completeButtonText: 'Pick Berries',
    requirements: [],
    criteria: [],
    rewards: [],
    exitModal: {
      title: 'Discovered a Razz Berry bush',
      message: 'You found a Razz Berry bush! You can now harvest berries here.',
      background: '/backgrounds/grassy-route.avif',
      icon: {
        type: 'item',
        id: 'razz-berry',
      },
      closeButtonText: 'Harvest Berries',
    },
  },
  {
    name: 'Cerulean City Gym',
    description: "My Second Gym Challenge, how exciting! Strange that it's in a pool though...",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-misty',
    },
    background: '/backgrounds/gym-water.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Enter Gym',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'explore-cerulean-city',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/gym-water.avif',
      title: 'Gym Leader Misty',
      icon: {
        type: 'trainer',
        id: 'gym-kanto-misty',
      },
      message:
        "Aghh! Where is it? I can't find it anywhere, sorry but could you just leave me alone?",
      closeButtonText: 'Rude...',
    },
    id: 'cerulean-gym',
  },
  {
    name: "Misty's Rage",
    description: "Well that didn't go very well, I guess i best wait for her to cool off.",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-misty',
    },
    background: '/backgrounds/gym-water.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Wait It Out',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'cerulean-gym',
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/gym-water.avif',
      title: 'Gym Trainer',
      icon: {
        type: 'trainer',
        id: 'swimmer-f',
      },
      message:
        "I'm so sorry about that... Misty has been tearing the pool apart looking for her earrings. You're a trainer right? You're probably off to see Bill anyway, is there any chance you can pass him the message: CODE BLUE",
      closeButtonText: "I'll be back!",
    },
    id: 'cerulean-gym-2',
  },
  {
    name: 'Nugget Bridge Challenge',
    description: 'Wow this bridge sure is busy...',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/cerulean.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Start Challenge',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'cerulean-gym-2',
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/cerulean.avif',
      title: 'Confident Kid',
      icon: {
        type: 'trainer',
        id: 'youngster',
      },
      message:
        "Hey Kid... to get through here you're going to have to take on the Nugget Bridge Challenge! If you can defeat all 5 of us you'll win a Nugget! Just on a side note, don't you think Team Rocket are just so cool?!",
      closeButtonText: 'Start Bridge Challenge',
    },
    id: 'nugget-bridge-challenge',
  },
  {
    id: 'rival-cerulean-win-chat',
    name: 'Rival Battle',
    description: 'Your rival has one last word before Nugget Bridge.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/cerulean.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'rival-cerulean',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/cerulean.avif',
      dynamicOpponent: 'rival',
      title: 'Rival Battle',
      message:
        'You made it this far? Fine. Nugget Bridge will tell us if it sticks.',
      closeButtonText: 'Cross the Bridge',
      icon: {
        type: 'trainer',
        id: 'youngster',
      },
    },
  },
  {
    id: 'rival-cerulean-loss-chat',
    name: 'Rival Battle',
    description: 'Your rival has one last word before Nugget Bridge.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'youngster',
    },
    background: '/backgrounds/cerulean.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Continue',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'rival-cerulean',
        battleStatus: 'loss',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/cerulean.avif',
      dynamicOpponent: 'rival',
      title: 'Rival Battle',
      message:
        'Still rushing in. Sort your team out before Nugget Bridge eats you alive.',
      closeButtonText: 'Cross the Bridge',
      icon: {
        type: 'trainer',
        id: 'youngster',
      },
    },
  },
  {
    name: 'A Golden Victory',
    id: 'nugget-bridge-clear',
    description:
      "Oh no these guys again... I knew it wasn't going to be as simple as beating 5 kids",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/cerulean.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Claim Nugget',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'nugget-bridge-5',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    enterModal: [
      {
        id: 1,
        icon: {
          type: 'trainer',
          id: 'rocket-grunt-m',
        },
        title: 'Rocket Recruiter',
        message:
          "Nice work kid, so nice in fact I'm going to offer you the opportunity of a lifetime...",
        background: '/backgrounds/cerulean.avif',
        buttons: [
          {
            text: 'Go on...',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        icon: {
          type: 'trainer',
          id: 'rocket-grunt-m',
        },
        title: 'Rocket Recruiter',
        message:
          "That's right, you've been personally selected to join the Ranks of Team Rocket! Just think from now on instead of {Trainer} the nobody you'll be, Rocket Grunt #111142015",
        background: '/backgrounds/cerulean.avif',
        buttons: [
          {
            text: 'Hmm...',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        icon: {
          type: 'trainer',
          id: 'rocket-grunt-m',
        },
        title: 'Rocket Recruiter',
        message: 'Fame, Fortune, Power... A Criminal Record, what more could you ask for?!',
        background: '/backgrounds/cerulean.avif',
        buttons: [
          {
            text: 'Wait what was that last one?',
            type: 'navigate',
            id: 4,
          },
        ],
      },
      {
        id: 4,
        icon: {
          type: 'trainer',
          id: 'rocket-grunt-m',
        },
        title: 'Rocket Recruiter',
        message: 'Look kid your starting to irritate me now, are you in or am I forcing you in?',
        background: '/backgrounds/cerulean.avif',
        buttons: [
          {
            text: 'Stand Firm',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    name: 'Joining Team Rocket',
    id: 'nugget-bridge-join',
    description: 'This guys kinda weird, but I am a fan of Fame, Fortune and Power...',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/cerulean.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Join Team Rocket',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'nugget-bridge-clear',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'title',
        targetId: 'team-rocket-grunt',
      },
      {
        type: 'icon',
        targetId: 'rocket-m',
      },
      {
        type: 'icon',
        targetId: 'rocket-f',
      },
      {
        type: 'task_complete',
        quantity: 1,
        targetId: 'nugget-bridge-end',
      },
    ],
    exitModal: {
      background: '/backgrounds/cerulean.avif',
      icon: {
        type: 'trainer',
        id: 'rocket-grunt-m',
      },
      title: 'Rocket Recruiter',
      message:
        'Excellent choice, you wont regret it! Now get yourself to our training centre in Celadon City, your first task is finding the location. Good Luck. Take these your first taste of Rocket Power.',
      closeButtonText: 'Yes Boss.',
    },
    hide: 'nugget-bridge-refuse',
  },
  {
    name: 'Denying Team Rocket',
    id: 'nugget-bridge-refuse',
    description: "There's no way I'm joining these creeps!",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    background: '/backgrounds/cerulean.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Refuse Offer',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'nugget-bridge-clear',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'title',
        targetId: 'golden-child',
      },
      {
        type: 'icon',
        targetId: 'nugget',
      },
    ],
    exitModal: {
      background: '/backgrounds/cerulean.avif',
      icon: {
        type: 'trainer',
        id: 'rocket-grunt-m',
      },
      title: 'Rocket Recruiter',
      message: "You'll regret this kid! You're not taking one more step...",
      closeButtonText: 'Get Lost...',
    },
    hide: 'nugget-bridge-join',
  },
  {
    id: 'nugget-bridge-end',
    name: 'Conquering Nugget Bridge',
    completionTrigger: 'auto',
    completeButtonText: 'Cross Bridge',
    secret: true,
    description: 'Access to Route 24',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/cerulean.avif',
    icon: {
      type: 'local',
      id: '/sprites/sign.avif',
    },
    repeatable: false,
    requirements: [],
    criteria: [],
    rewards: [],
  },
  {
    id: 'surf-cerulean-cave',
    name: 'Reaching Cerulean Cave',
    description: 'I can see a cave in the distance but how am I going to get across there...',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/beach.avif',
    icon: {
      type: 'pokemon',
      id: '131',
    },
    exitModal: {
      icon: {
        type: 'pokemon',
        id: '131',
      },
      title: 'Surfing the Waves',
      background: '/backgrounds/beach.avif',
      message: 'Huh well that was easy!',
      closeButtonText: 'Cross Water',
    },
    requirements: [
      {
        type: 'task_completed',
        count: 1,
        targetId: 'nugget-bridge-end',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        count: 1,
        targetId: 'tm-surf',
      },
    ],
    repeatable: false,
    completeButtonText: 'Use Surf',
    rewards: [],
  },
  {
    id: 'charred-hiker',
    name: 'The Charred Hiker',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    description:
      'This hiker looks distressed, the ground around him is burnt black! I should check if he needs any help',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    completeButtonText: 'Are You Okay?',
    requirements: [
      {
        type: 'task_completed',
        count: 1,
        targetId: 'nugget-bridge-end',
      },
    ],
    rewards: [
      {
        type: 'xp',
        quantity: 160,
        targetId: 'catching',
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Charred Hiker',
        message: "Hey Kid! I'm all good but you may be able to help me out here?",
        buttons: [
          {
            text: 'Excellent!',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
      },
      {
        id: 2,
        title: 'Charred Hiker',
        message:
          "Well as you can see, these little fires are popping up everywhere around here and I'm trying to get to the bottom of it. The problem is my Growlithe is not much of a battler and there's some tough Pokemon about",
        buttons: [
          {
            text: 'Hear Him Out',
            type: 'navigate',
            id: 3,
          },
        ],
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
      },
      {
        id: 3,
        title: 'Charred Hiker',
        message:
          "If you could take a look around and see if you can find any CHARred wood my Growlithe should be able to sniff out the source and work out what's going on.",
        buttons: [
          {
            text: 'CHARging ahead!',
            type: 'navigate',
            id: 4,
          },
        ],
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'pokemon',
          id: '58',
        },
      },
      {
        id: 4,
        title: 'Charred Hiker',
        message:
          "Hey kid you shouldn't make fun of peoples speech impediments, that's just rude.. anyway 20 should do",
        buttons: [
          {
            text: 'Wait 20?!',
            type: 'navigate',
            id: 5,
          },
        ],
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
      },
      {
        id: 5,
        title: 'Charred Hiker',
        message:
          "Yup 20! Growlithe's nose isn't what it used to be, and be careful of wild Pokemon, although you look like you can hold your own.",
        buttons: [
          {
            text: 'Right...',
            type: 'success',
          },
        ],
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
      },
    ],
    repeatable: false,
    criteria: [],
    exitModal: {
      title: 'CHARred Wood',
      background: '/backgrounds/grassy-route.avif',
      message: 'Right time to go look for some wood I guess...',
      closeButtonText: 'Lets Go',
      icon: {
        type: 'pokemon',
        id: '58',
      },
    },
  },
  {
    id: 'charred-hiker-2',
    name: 'The Great Stick Search',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    description:
      'Right time to find 20 Charred wood. I really need to learn how to say no to people.',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    completeButtonText: 'Here you go!',
    requirements: [
      {
        type: 'task_completed',
        count: 1,
        targetId: 'charred-hiker',
      },
    ],
    rewards: [
      {
        type: 'xp',
        quantity: 160,
        targetId: 'catching',
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Charred Hiker',
        message: '1...2..3....20 Yup looks good. Nice work! ',
        buttons: [
          {
            text: 'Excellent!',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
      },
      {
        id: 2,
        title: 'Charred Hiker',
        message: 'Now Growlithe take a whiff of these and see if you can track down the culprit!',
        buttons: [
          {
            text: 'Let Growlithe Sniff',
            type: 'navigate',
            id: 3,
          },
        ],
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
      },
      {
        id: 3,
        title: 'Growlithe',
        message: 'Bark! Grrrrrrroooooooow....',
        buttons: [
          {
            text: 'Bark, Bark Grrrrr??',
            type: 'navigate',
            id: 4,
          },
        ],
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'pokemon',
          id: '58',
        },
      },
      {
        id: 4,
        title: 'Charred Hiker',
        message: "He's picked up a scent! Growlithe wants us to head towards that cave over there!",
        buttons: [
          {
            text: 'Cerulean Cave?',
            type: 'navigate',
            id: 5,
          },
        ],
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
      },
      {
        id: 5,
        title: 'Charred Hiker',
        message:
          "No not Cerulean Cave, also how on earth would a fire Pokemon get here from cerulean cave, there's water between us and Cerulean Cave, get it together kid. I mean that Cave thats been right next to us the entire time, come on.",
        buttons: [
          {
            text: 'How silly of me...',
            type: 'navigate',
            id: 6,
          },
        ],
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
      },
      {
        id: 6,
        title: 'Charred Hiker',
        message:
          'Right, give the CHARred branches to Growlithe here, and listen out see if you can track down our culprit.',
        buttons: [
          {
            text: "Let's go Growlithe!",
            type: 'success',
          },
        ],
        background: '/backgrounds/cave.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
      },
    ],
    repeatable: false,
    criteria: [
      {
        type: 'item_owned',
        count: 20,
        targetId: 'charred-wood',
      },
    ],
    exitModal: {
      title: 'Tracking the Culprit',
      background: '/backgrounds/cave.avif',
      message: 'Time to track down the fire starter!',
      closeButtonText: 'Start Searching',
      icon: {
        type: 'pokemon',
        id: '58',
      },
    },
  },
  {
    id: 'charred-hiker-3',
    name: '(Not) Cerulean Cave',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    description: 'I need to follow Growlithe and find my way through!',
    background: '/backgrounds/cave.avif',
    icon: {
      type: 'pokemon',
      id: '58',
    },
    completeButtonText: 'What was that?',
    requirements: [
      {
        type: 'task_completed',
        count: 1,
        targetId: 'charred-hiker-2',
      },
    ],
    rewards: [
      {
        type: 'xp',
        quantity: 300,
        targetId: 'catching',
      },
      {
        type: 'pokemon_research_xp',
        quantity: 20,
        targetId: '58',
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Charred Hiker',
        message:
          "You heard that right? A CHARmander! there must be a den in this cave, it's quite rainy around the coast so it makes sense they'd hide in here!",
        buttons: [
          {
            text: 'What now?',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/cave.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
      },
      {
        id: 2,
        title: 'Charred Hiker',
        message:
          "I think they're pretty close by! I'm going to take a rest here, but I bet Growlithe would be able to take you right to them. You've still got some of the wood right so he can pick up the scent? ",
        buttons: [
          {
            text: 'Follow Growlithe',
            type: 'success',
          },
        ],
        background: '/backgrounds/cave.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
      },
    ],
    repeatable: false,
    criteria: [
      {
        type: 'research_encounter_result',
        count: 10,
        targetId: 'charming-growlithe',
      },
    ],
    exitModal: {
      title: "Charmander's Den",
      background: '/backgrounds/cave.avif',
      message:
        "Growlithe will be able to take me right to the Charmander's now, he'll just need some CHARred wood to follow the scent.",
      closeButtonText: "Let's Go!",
      icon: {
        type: 'pokemon',
        id: '4',
      },
    },
  },
  {
    id: 'charred-hiker-4',
    name: 'A CHARming Culprit',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    description: 'I found a Charmander in the den. I should let the hiker know.',
    background: '/backgrounds/cave.avif',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    completeButtonText: 'Tell the Hiker',
    requirements: [
      {
        type: 'task_completed',
        count: 1,
        targetId: 'charred-hiker-3',
      },
      {
        type: 'location_encounter_result',
        targetId: 'charmander-den',
        count: 1,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 500,
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Charred Hiker',
        message: "Kid! Growlithe's been pacing circles since you went in there, what happened?",
        buttons: [
          {
            text: 'I found the culprit',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/cave.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
      },
      {
        id: 2,
        title: 'Charred Hiker',
        message: 'A CHARmander? Well that explains the little fires. Who coulda seen that coming?!',
        buttons: [
          {
            text: 'Huh... yeah what a surprise',
            type: 'navigate',
            id: 3,
          },
        ],
        background: '/backgrounds/cave.avif',
        icon: {
          type: 'pokemon',
          id: '58',
        },
      },
      {
        id: 3,
        title: 'Charred Hiker',
        message:
          "No kidding. Still, if it's calm enough to come with you then that should stop the fires spreading. Growlithe, good sniffing!",
        buttons: [
          {
            text: 'Good boy Growlithe',
            type: 'navigate',
            id: 4,
          },
        ],
        background: '/backgrounds/cave.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
      },
      {
        id: 4,
        title: 'Charred Hiker',
        message:
          'Thanks kid. I owe you one, If you ever need to sniff out anymore CHARmanders just let Growlithe know and he can take you right to them',
        buttons: [
          {
            text: 'Will I need more sticks?...',
            type: 'success',
          },
        ],
        background: '/backgrounds/cave.avif',
        icon: {
          type: 'pokemon',
          id: '4',
        },
      },
    ],
    repeatable: false,
    criteria: [],
    exitModal: {
      title: 'Time to move on',
      background: '/backgrounds/cave.avif',
      message: '5 Sticks... multiplied by 4096... Nah I dont think so.',
      closeButtonText: 'Quest Complete',
      icon: {
        type: 'pokemon',
        id: '4',
      },
    },
  },
  {
    id: 'growlithe-knows-the-way',
    name: 'Growlithe Knows the Way',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    description:
      'Growlithe has made the trip to the Charmander den enough times that I might finally be free from stick maths.',
    background: '/backgrounds/cave.avif',
    icon: {
      type: 'pokemon',
      id: '58',
    },
    completeButtonText: 'Trust Growlithe',
    requirements: [
      {
        type: 'task_completed',
        count: 1,
        targetId: 'charred-hiker-4',
      },
      {
        type: 'location_encounter_result',
        targetId: 'charmander-den',
        count: 5,
      },
    ],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Growlithe',
        message: 'Bark! Bark bark! Grrrrrrow!',
        buttons: [
          {
            text: 'You know the way?',
            type: 'navigate',
            id: 2,
          },
        ],
        background: '/backgrounds/cave.avif',
        icon: {
          type: 'pokemon',
          id: '58',
        },
      },
      {
        id: 2,
        title: 'Charred Hiker',
        message:
          "Huh. Growlithe's made that trip so many times he doesn't even need the CHARred wood anymore. Guess the sticks can retire.",
        buttons: [
          {
            text: 'Finally',
            type: 'success',
          },
        ],
        background: '/backgrounds/cave.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
      },
    ],
    repeatable: false,
    criteria: [],
    exitModal: {
      title: 'No More Sticks',
      background: '/backgrounds/cave.avif',
      message:
        "Growlithe can take me straight to the Charmander's Den now. Route 24's trees can relax.",
      closeButtonText: 'Good Boy',
      icon: {
        type: 'pokemon',
        id: '58',
      },
    },
  },
  {
    id: 'abra-teleport',
    name: 'An Intense battle',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    description:
      "Yikes, I almost got hit! these trainers are really going for it! There's no way I'm getting through unscathed... If only I had a Pokemon with me that could somehow defy the laws of physics and position me on the other side of them... That sure would be great.",
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'pokemon',
      id: '306',
    },
    completeButtonText: "Let's do this!",
    requirements: [
      {
        type: 'task_completed',
        count: 1,
        targetId: 'nugget-bridge-end',
      },
    ],
    rewards: [
      {
        type: 'pokemon_research_xp',
        quantity: 12,
        targetId: '63',
        secret: true,
      },
    ],
    enterModal: [],
    repeatable: false,
    criteria: [
      {
        type: 'companion',
        count: 1,
        companionCheck: {
          speciesId: 63,
          formId: '63',
        },
        secret: true,
      },
    ],
    exitModal: {
      title: 'Abra Used Teleport',
      background: '/backgrounds/grassy-route.avif',
      message:
        'Huh that was easy. Turns out physics are more of a guide than a hard and fast rule... who knew!',
      closeButtonText: 'Onward!',
      icon: {
        type: 'pokemon',
        id: '63',
      },
    },
  },
  {
    id: 'bill-cottage',
    name: 'The Cottage on Route 25',
    description:
      "The home of Bill, The Pokemon Evolution specialist, I'd really like to talk to him about his theories on flying type Eevee's... But first...",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'trainer',
      id: 'bill',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'CODE BLUE!',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'abra-teleport',
      },
    ],
    criteria: [
      {
        type: 'location_encounter_result',
        targetId: 'route-25',
        count: 3,
      },
      {
        type: 'battle_result',
        targetId: 'route-25-battle',
        battleStatus: 'win',
        count: 3,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 100,
      },
    ],
    enterModal: [
      {
        id: 1,
        title: 'Bill',
        message: 'Oh wow, erm Hello? Perhaps a little intense there, but I admire your spirit.',
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'bill',
        },
        buttons: [
          {
            text: 'Sorry',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Bill',
        message: "Nah, don't worry about it, this happens waaay more often than you might think",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'bill',
        },
        buttons: [
          {
            text: 'So you will help?',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Bill',
      icon: {
        type: 'trainer',
        id: 'bill',
      },
      message: 'Theres no rush, come on in, infact I could use a hand with something',
      closeButtonText: 'Help Bill',
    },
  },
  {
    id: 'bill-field-research',
    name: "Bill's Evolution Stone Study",
    description:
      'Bill has asked me to work on an impressive looking machine hes been working, on. honestly I have no idea what Im doing',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'trainer',
      id: 'bill',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Did it work?',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'bill-cottage',
      },
    ],
    criteria: [
      {
        type: 'research_encounter_result',
        targetId: 'bill-evolution-stone-study',
        battleStatus: 'win',
        count: 1,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'researching',
        quantity: 180,
      },
      {
        type: 'currency',
        targetId: 'crystals',
        quantity: 75,
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Bill',
      icon: {
        type: 'trainer',
        id: 'bill',
      },
      message:
        '{Trainer} you are a natural! you have got a bright future as a housekeeper! You can organise my bookshelf next if you like?',
      closeButtonText: 'Wait, what?',
    },
  },
  {
    id: 'bill-transfer-fix',
    name: 'Fancy Technology',
    description: 'Not sure I like this guy... for a sorting machine it seemed very over engineered',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'trainer',
      id: 'bill',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Ask About Misty',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'bill-field-research',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'xp',
        skill: 'researching',
        quantity: 180,
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Bill',
      icon: {
        type: 'trainer',
        id: 'bill',
      },
      message: 'Haha, Misty? CODE BLUE.. Right... ',
      closeButtonText: 'So you will help right?',
    },
  },
  {
    id: 'bill-old-rod',
    name: 'Engineering a Solution',
    description: 'I wonder what Bill has up his sleeve for the Misty problem',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'trainer',
      id: 'bill',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Well...',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'bill-transfer-fix',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'old-rod',
        quantity: 1,
      },
      {
        type: 'xp',
        skill: 'researching',
        quantity: 180,
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Bill',
      icon: {
        type: 'item',
        id: 'old-rod',
      },
      message:
        'Here. Misty loses things in that pool all the time. No idea why she doesnt just put some goggles on and take a look herself, take this at least you can avoid getting wet while you fish them out',
      closeButtonText: 'Seriously...',
    },
  },
  {
    id: 'bills-garden-mew',
    name: "Bill's Garden Secret",
    description:
      'The journal is very clear: Bill has a fenced garden, fenced gardens are suspicious, and therefore Mew must be back there.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'item',
      id: 'manics-journal-pg-322',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Ask About Mew',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'bill-old-rod',
      },
      {
        type: 'item_owned',
        targetId: 'manics-journal-pg-322',
        count: 1,
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
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Bill',
      icon: {
        type: 'trainer',
        id: 'bill',
      },
      message:
        "Mew? It's a mythical Pokemon, but that's about all I know. And no, it isn't in my garden. It's fenced because it's a garden. Most back gardens have fences.",
      closeButtonText: 'Fair Enough',
    },
  },
  {
    id: 'mistys-lost-earrings',
    name: "Misty's Lost Earrings",
    description:
      "Misty lost her favourite earrings in the gym pool. If I can fish them out, maybe she'll actually battle me.",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/gym-water.avif',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-misty',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Return Earrings',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'cerulean-gym-2',
      },
      {
        type: 'task_completed',
        targetId: 'bill-old-rod',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'mistys-earrings',
        count: 1,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 250,
      },
    ],
    exitModal: {
      background: '/backgrounds/gym-water.avif',
      title: 'Gym Leader Misty',
      icon: {
        type: 'trainer',
        id: 'gym-kanto-misty',
      },
      message: 'Amazing, My Earrings thanks so much!',
      closeButtonText: 'Challenge the Gym',
    },
  },
  {
    id: 'misty-daily-scales',
    name: "Misty's Pool Cleanup",
    description: 'Misty needs help keeping her pool clean of scales.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/gym-water.avif',
    icon: {
      type: 'trainer',
      id: 'gym-kanto-misty',
    },
    repeatable: true,
    daily: true,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Trade Scale',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'cerulean-gym-misty',
        battleStatus: 'win',
        count: 1,
      },
      {
        type: 'daily_not_completed',
        targetId: 'misty-daily-scales',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'cerulean-pool-scale',
        count: 1,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'pack-gym1',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'currency',
        targetId: 'league-ticket',
        quantity: 1,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/gym-water.avif',
      title: 'Gym Leader Misty',
      icon: {
        type: 'trainer',
        id: 'gym-kanto-misty',
      },
      message: 'Thanks {Trainer}, you have no idea how many of those things build up over time.',
      closeButtonText: 'Receive Pack',
    },
  },
  {
    id: 'cerulean-gym-tm-reward',
    name: 'A Gift from Misty',
    description: 'Misty promised a technique for Pokemon that know how to move with the water.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/gym-water.avif',
    icon: {
      type: 'item',
      id: 'tm-bubble-guard',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Learn Technique',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'cerulean-gym-misty',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'tm-bubble-guard',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'item',
        targetId: 'water-absorb-ability-patch',
        quantity: 1,
        dropChance: 100,
      },
      {
        type: 'title',
        targetId: 'cascade-caller',
      },
      {
        type: 'icon',
        targetId: 'misty',
      },
    ],
    exitModal: {
      background: '/backgrounds/gym-water.avif',
      title: 'Gym Leader Misty',
      icon: {
        type: 'trainer',
        id: 'gym-kanto-misty',
      },
      message:
        'Bubble Guard is all about rhythm, Every good trainer knows when to defend before they attack.',
      closeButtonText: 'Receive TM',
    },
  },
  {
    id: 'robbed-house',
    name: 'The Robbed House',
    description:
      "The police have left, but this house is in a state! Fortunately its okay to wander into stranger's houses!",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'trainer',
      id: 'policeman',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Search House',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'cerulean-gym-misty',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Robbed House',
      icon: {
        type: 'item',
        id: 'tm-dig',
      },
      message: 'A tunnel through the wall, Nice and subtle...',
      closeButtonText: 'Follow the Trail',
    },
  },
  {
    id: 'rocket-house-warning',
    name: 'Rocket Recognition',
    description: 'The Rocket behind the house recognises me from Nugget Bridge.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/cerulean.avif',
    icon: {
      type: 'trainer',
      id: 'rocket-grunt-m',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Confront Rocket',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'robbed-house',
      },
      {
        type: 'task_completed',
        targetId: 'nugget-bridge-join',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'item',
        targetId: 'tm-dig',
        quantity: 1,
      },
      {
        type: 'task_complete',
        targetId: 'cerulean-city-complete',
        quantity: 1,
        secret: true,
      },
    ],
    exitModal: {
      background: '/backgrounds/cerulean.avif',
      title: 'Rocket Grunt',
      icon: {
        type: 'trainer',
        id: 'rocket-grunt-m',
      },
      message:
        'You should not be standing here in the open. Take this TM, stop asking questions, and get out of Cerulean before somebody notices you.',
      closeButtonText: 'Leave Cerulean',
    },
  },
  {
    id: 'cerulean-city-complete',
    name: 'Leaving Cerulean City',
    description:
      'Cerulean City is behind me. The road south leads towards a famous Pokemon Day Care Center.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/cerulean.avif',
    icon: {
      type: 'local',
      id: '/sprites/sign.avif',
    },
    repeatable: false,
    secret: true,
    completionTrigger: 'auto',
    completeButtonText: 'Head South',
    requirements: [],
    criteria: [],
    rewards: [],
  },
  {
    id: 'thirsty-work-route-5',
    name: 'Thirsty Work',
    description: 'The Guard has been on shift for hours, I should offer them a drink.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'trainer',
      id: 'policeman',
    },
    repeatable: true,
    daily: true,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Hand Over Fresh Water',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'cerulean-city-complete',
      },
      {
        type: 'daily_not_completed',
        targetId: 'thirsty-work-route-5',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'fresh-water',
        count: 1,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'great-ball',
        quantity: 1,
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Route 5 Guard',
      icon: {
        type: 'trainer',
        id: 'policeman',
      },
      message:
        "That's just what I needed. I picked this up on my rounds, but you and your Pokemon will get more use out of it.",
      closeButtonText: 'Receive Great Ball',
    },
  },
  {
    id: 'underground-path-route-5',
    name: 'The Underground Path',
    description:
      'Looks like this is my only option with the Gatehouse to Saffron City being closed.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'local',
      id: '/sprites/sign.avif',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Enter Underground Path',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'cerulean-city-complete',
      },
    ],
    criteria: [
      {
        type: 'skill_level',
        targetId: 'catching',
        count: 15,
      },
      {
        type: 'battle_result',
        targetId: 'route-5-battle',
        battleStatus: 'win',
        count: 3,
      },
      {
        type: 'location_encounter_result',
        targetId: 'route-5',
        count: 3,
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'The Underground Path',
      icon: {
        type: 'local',
        id: '/sprites/sign.avif',
      },
      message: 'Well that was remarkably uneventful! Next stop, Vermillion City!',
      closeButtonText: 'Enter Vermilion',
    },
  },
  {
    id: 'nido-notes-route-5',
    name: 'Nido Notes',
    description:
      'This girl is absolutely obsessed with Nidoran female. Maybe I should share my notes.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'trainer',
      id: 'lass',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Share Notes',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'cerulean-city-complete',
      },
    ],
    criteria: [
      {
        type: 'research_level',
        targetId: '29',
        count: 3,
      },
    ],
    rewards: [
      {
        type: 'pokemon_research_xp',
        targetId: '29',
        quantity: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Lass',
      icon: {
        type: 'trainer',
        id: 'lass',
      },
      message:
        'Oh wow, another Nido fan! Thanks so much for sharing. Here, take a look at all my sketches!',
      closeButtonText: 'Receive Sketches',
    },
  },
  {
    id: 'day-care-intro',
    name: 'Is That a Day Care?',
    description: "It's hard to tell because the building and yard have been completely smashed up.",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'trainer',
      id: 'old-couple',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Inspect Day Care',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'cerulean-city-complete',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Day Care Couple',
        message:
          "Oh hello there, Trainer. Sorry, now's not really a good time. We've been running this Day Care for over 50 years looking after Pokemon, but it's all over now.",
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'What happened here?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Day Care Couple',
        message:
          "We're not quite sure. It all happened so quickly. A few Pokemon were out in the yard, then we heard a terrifying roar. All of a sudden huge storms appeared and tore up the place. It can't have been normal weather. It seems to have happened just here.",
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Can I help?',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        title: 'Day Care Couple',
        message:
          "That's so kind. Any time you and your Pokemon could give us to help with the repairs would be amazing, but obviously we don't want to take up too much of your time.",
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'No problem at all.',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
      message: 'You decide to help the Day Care couple get back on their feet.',
      closeButtonText: 'Start Helping',
    },
  },
  {
    id: 'day-care-fixing-the-fence',
    name: 'Fixing the Fence',
    description:
      'The Day Care fence has been ripped apart. Craft sturdy fence panels at the Artisan bench to patch the yard.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'item',
      id: 'day-care-fence-wood',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Repair Fence',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-intro',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'day-care-fence-wood',
        count: 5,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'artisan',
        quantity: 200,
      },
      {
        type: 'item',
        targetId: 'tm-headbutt',
        quantity: 1,
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
      message:
        'The fence is standing again. One of the older Pokemon nudges a TM into your hand as thanks for all the hammering.',
      closeButtonText: 'Receive TM',
    },
  },
  {
    id: 'day-care-plants-for-the-garden',
    name: 'Plants for the Garden',
    description:
      'A Grass-type partner might be able to find Sweet Flowers while catching Pokemon on Route 5.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'item',
      id: 'sweet-flower',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Gather Flowers',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-intro',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'sweet-flower',
        count: 5,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'battling',
        quantity: 200,
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
      message:
        'The Sweet Flowers are really brightening up the place, and the smell is delightful!',
      closeButtonText: 'Smell Flowers',
    },
  },
  {
    id: 'day-care-gathering-the-gardeners',
    name: 'Gathering the Gardeners',
    description:
      'Oddish and Bellsprout could help keep the garden alive while the Day Care couple focus on repairs.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'pokemon',
      id: '43',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Bring Gardeners',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-intro',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        targetId: '43',
        count: 3,
        consume: true,
      },
      {
        type: 'pokemon_owned',
        targetId: '69',
        count: 3,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 200,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '43',
        quantity: 50,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '69',
        quantity: 50,
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
      message:
        'The Oddish and Bellsprout settle into the garden immediately. They seem proud to be handed over as the Day Care garden crew.',
      closeButtonText: 'Tend Garden',
    },
  },
  {
    id: 'day-care-garden-restored',
    name: 'The Garden Restored',
    description: 'Now, thats a good looking Garden!',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'pokemon',
      id: '406',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Visit Garden',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-fixing-the-fence',
      },
      {
        type: 'task_completed',
        targetId: 'day-care-plants-for-the-garden',
      },
      {
        type: 'task_completed',
        targetId: 'day-care-gathering-the-gardeners',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: 406,
        quantity: 1,
        secret: true,
        pokemonData: {
          level: 13,
          formId: '406',
          ballType: 'poke-ball',
          background: '/backgrounds/grassy-route.avif',
        },
      },
      {
        type: 'item',
        secret: true,
        targetId: 'leaf-stone',
        quantity: 1,
      },
      {
        type: 'xp',
        skill: 'catching',
        quantity: 200,
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'pokemon',
        id: '406',
      },
      message:
        "Thank you so much for all your hard work. The garden is even better than it was before, This little guy has been following all of your hard work since you got here, I think maybe you should take them with you. Here's a little gift from us as well, I'm sure you'll find it handy!",
      closeButtonText: 'Hey Budew!',
    },
  },
  {
    id: 'day-care-planning-next-steps',
    name: 'Planning the Next Steps',
    description: 'The Day Care couple seem to be planning the next stage of repairs.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'trainer',
      id: 'old-couple',
    },
    repeatable: true,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Chat',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-garden-restored',
      },
      {
        type: 'item_owned',
        targetId: 'badge-kanto-thunder',
        inverse: true,
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
      message:
        "Thank you for everything you've done for us. We're just tidying up and working out what to do next. Make sure to pop back from time to time, it would be great to see how you're getting on.",
      closeButtonText: 'Cya Later!',
    },
  },
  {
    id: 'day-care-building-repairs',
    name: 'Building Repairs',
    description:
      'The garden is safe again, but the Day Care building still needs serious repair work.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'pokemon',
      id: '240',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Inspect Building',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-garden-restored',
      },
      {
        type: 'item_owned',
        targetId: 'badge-kanto-thunder',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Day Care Couple',
        message:
          "You're back at just the right time. The garden is thriving, but the building walls are cracked right through.",
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Can it be fixed?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Magby',
        message:
          'A Magby toddles out from beside the old kiln and taps the cold brickwork proudly. It seems very sure it can help fire new bricks.',
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'pokemon',
          id: '240',
        },
        buttons: [
          {
            text: 'Let Magby help',
            type: 'navigate',
            id: 3,
          },
        ],
      },
      {
        id: 3,
        title: 'Day Care Couple',
        message:
          "If Magby keeps the kiln hot, we can turn Soft Clay into proper bricks. We'll need fuel first, then a lot of bricks.",
        background: '/backgrounds/grassy-route.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Start repairs',
            type: 'success',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'pokemon',
        id: '240',
      },
      message:
        'Magby watches the kiln eagerly. First, the old firebox needs enough wood scraps to burn hot and steady.',
      closeButtonText: 'Gather Fuel',
    },
  },
  {
    id: 'day-care-kiln-fuel',
    name: 'Fuel for the Kiln',
    description: 'The old Day Care kiln needs wood scraps before Magby can fire clay bricks.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'item',
      id: 'wood-scraps-t1',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Load Kiln',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-building-repairs',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'wood-scraps-t1',
        count: 20,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'artisan',
        quantity: 250,
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Magby',
      icon: {
        type: 'pokemon',
        id: '240',
      },
      message:
        'The kiln catches with a steady glow. Magby claps happily, then points at the clay stacked beside the workbench.',
      closeButtonText: 'Fire Bricks',
    },
  },
  {
    id: 'day-care-firing-the-bricks',
    name: 'Firing the Bricks',
    description:
      'Craft Kiln-Fired Bricks at the Artisan bench. The building will need a hundred of them.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'item',
      id: 'day-care-clay-brick',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Stack Bricks',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-kiln-fuel',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'day-care-clay-brick',
        count: 100,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'artisan',
        quantity: 500,
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
      message:
        'The brick stacks are finally high enough for the wall repairs. Now the heavy lifting needs strong Pokemon that can handle the old beams safely.',
      closeButtonText: 'Find Helpers',
    },
  },
  {
    id: 'day-care-heavy-repair-helpers',
    name: 'Heavy Repair Helpers',
    description:
      'The Day Care needs five strong Pokemon with at least 40 Attack to help raise beams and settle the new walls.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'trainer',
      id: 'old-couple',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Send Helpers',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-firing-the-bricks',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        count: 5,
        consume: true,
        pokemonCriteria: {
          stats: {
            attack: 40,
          },
        },
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 500,
      },
    ],
    exitModal: {
      background: '/backgrounds/grassy-route.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
      message:
        'Your helpers brace the beams while Magby keeps the bricks warm enough to set. The Day Care building finally looks safe again.',
      closeButtonText: 'Finish Repairs',
    },
  },
  {
    id: 'day-care-building-restored',
    name: 'The Building Restored',
    description: 'The Route 5 Day Care building is repaired and warm again.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'pokemon',
      id: '240',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Visit Day Care',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-heavy-repair-helpers',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: 240,
        quantity: 1,
        secret: true,
        pokemonData: {
          level: 20,
          formId: '240',
          ballType: 'poke-ball',
          background: '/backgrounds/inside-house.avif',
          obtainedMethod: 'gift',
          obtainedRegion: 'Kanto',
          obtainedLocation: 'Cerulean City',
          obtainedSourceId: 'day-care-building-restored',
        },
      },
      {
        type: 'item',
        targetId: 'red-berry-candy',
        quantity: 20,
        secret: true,
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'pokemon',
        id: '240',
      },
      message:
        'Magby refuses to leave your side after all that kiln work. The couple laugh, hand over a bundle of berry candies, and ask you to take good care of their fiery little helper.',
      closeButtonText: 'Welcome Magby',
    },
  },
  {
    id: 'day-care-planning-after-building',
    name: 'Planning the Next Steps',
    description: 'The Day Care couple are thinking about what to restore next.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'trainer',
      id: 'old-couple',
    },
    repeatable: true,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Chat',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-building-restored',
      },
      {
        type: 'task_completed',
        targetId: 'underground-path-route-8',
        inverse: true,
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
      message:
        "The building is warm again, the garden is blooming, and Pokemon are starting to relax here. We're taking stock before deciding what the Day Care should offer next.",
      closeButtonText: 'See You Later',
    },
  },
  {
    id: 'day-care-celadon-helper-planning',
    name: 'Gathering Helpers',
    description:
      'The Day Care building is warm again, but reopening properly will take the right helpers.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'trainer',
      id: 'old-couple',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    chat: true,
    completeButtonText: 'Talk Helpers',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-building-restored',
      },
      {
        type: 'task_completed',
        targetId: 'underground-path-route-8',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
      message:
        "You've come back just as we're thinking about reopening properly. The rooms are safe, the garden is bright, and now we need Pokemon who can help the little ones settle in.",
      closeButtonText: 'Make a List',
    },
  },
  {
    id: 'day-care-security-helper-clue',
    name: 'A Calm Gate',
    description:
      'The couple want someone steady near the front gate before the Day Care gets busy again.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'trainer',
      id: 'old-couple',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Suggest Helper',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-celadon-helper-planning',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Day Care Couple',
        message:
          "The front gate worries us most. We need a helper who can watch the entrance and make strangers think twice, but who won't frighten the young Pokemon or their trainers. Who do you think could strike that balance?",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Suggest Pokemon',
            type: 'password',
            id: 2,
            fail: 3,
          },
          {
            text: 'Think About It',
            type: 'fail',
          },
        ],
      },
      {
        id: 2,
        title: 'Day Care Couple',
        message:
          "An Arcanine? Yes, we can see it now. Strong enough that nobody would cause trouble, but warm and dependable enough for nervous youngsters to feel safe beside it.",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Find Them',
            type: 'success',
          },
        ],
      },
      {
        id: 3,
        title: 'Day Care Couple',
        message:
          "We're not sure that one is right for the gate. The helper needs to be watchful and imposing when trouble appears, but calm and welcoming through an ordinary busy day.",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Try Again Later',
            type: 'fail',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
      message:
        "Arcanine could make the entrance feel safe without making it unfriendly. If you know one with the right temperament, bring it by and we'll introduce it to the youngsters.",
      closeButtonText: 'Find Helper',
    },
  },
  {
    id: 'day-care-security-helper',
    name: 'Gate Helper',
    description:
      'An Arcanine could keep the Day Care entrance calm, safe, and welcoming.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'pokemon',
      id: '59',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Send Arcanine',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-security-helper-clue',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        targetId: 59,
        count: 1,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'pokemon',
        targetId: 174,
        quantity: 1,
        secret: true,
        pokemonData: {
          level: 15,
          formId: '174',
          ballType: 'poke-ball',
          background: '/backgrounds/inside-house.avif',
          obtainedMethod: 'gift',
          obtainedRegion: 'Kanto',
          obtainedLocation: 'Cerulean City',
          obtainedSourceId: 'day-care-security-helper',
        },
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'pokemon',
        id: '174',
      },
      message:
        "Arcanine settles beside the front path, watchful but completely at ease around the youngsters. An affectionate Igglybuff has grown fond of you during your visits, and the couple ask if you'll take it on your next adventure.",
      closeButtonText: 'Welcome Igglybuff',
    },
  },
  {
    id: 'day-care-tutor-helper-clue',
    name: 'A Patient Tutor',
    description:
      'Some of the young Pokemon need a helper who can keep up without losing patience.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'trainer',
      id: 'old-couple',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Suggest Helper',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-celadon-helper-planning',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Day Care Couple',
        message:
          "Some of the young Pokemon have questions faster than we can answer them. We'd love a helper who can keep every little mind busy without letting the louder ones leave the shy ones behind. Who do you think might suit them?",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Suggest Pokemon',
            type: 'password',
            id: 2,
            fail: 3,
          },
          {
            text: 'Think About It',
            type: 'fail',
          },
        ],
      },
      {
        id: 2,
        title: 'Day Care Couple',
        message:
          "An Alakazam? We hadn't thought of that! It could understand what each youngster is struggling with before frustration sets in. Yes, that could make the lesson corner work beautifully.",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Find Them',
            type: 'success',
          },
        ],
      },
      {
        id: 3,
        title: 'Day Care Couple',
        message:
          "We're not sure that one would enjoy the lesson room. It needs to keep up with some very bright youngsters, but also have the patience to explain things more than once.",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Try Again Later',
            type: 'fail',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
      message:
        "Alakazam could be just what the lesson corner needs. If you know one with the patience for young Pokemon, bring it by and we'll introduce everyone.",
      closeButtonText: 'Find Helper',
    },
  },
  {
    id: 'day-care-tutor-helper',
    name: 'Lesson Helper',
    description:
      'An Alakazam could help with the curious Pokemon in the new lesson corner.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'pokemon',
      id: '65',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Send Alakazam',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-tutor-helper-clue',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        targetId: 65,
        count: 1,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'pokemon',
        targetId: 433,
        quantity: 1,
        secret: true,
        pokemonData: {
          level: 15,
          formId: '433',
          ballType: 'poke-ball',
          background: '/backgrounds/inside-house.avif',
          obtainedMethod: 'gift',
          obtainedRegion: 'Kanto',
          obtainedLocation: 'Cerulean City',
          obtainedSourceId: 'day-care-tutor-helper',
        },
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'pokemon',
        id: '433',
      },
      message:
        "Alakazam arranges the lesson corner in minutes, and soon every youngster is quietly absorbed. Impressed by how patiently you found their new tutor, the couple entrust a curious Chingling to your care.",
      closeButtonText: 'Welcome Chingling',
    },
  },
  {
    id: 'day-care-nurse-helper-clue',
    name: 'Recovery Room',
    description:
      'The recovery room needs a gentle helper before the Day Care can handle busy days again.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'trainer',
      id: 'old-couple',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Suggest Helper',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-celadon-helper-planning',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Day Care Couple',
        message:
          "There are always scraped knees, tired hatchlings, and worried trainers here. Neither of us can watch the recovery room every moment, so we need someone gentle who notices trouble early and doesn't panic when the room gets busy. Any ideas?",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Suggest Pokemon',
            type: 'password',
            id: 2,
            fail: 3,
          },
          {
            text: 'Think About It',
            type: 'fail',
          },
        ],
      },
      {
        id: 2,
        title: 'Day Care Couple',
        message:
          "Chansey—that's a wonderful suggestion. It would know how to look after an injury, but more importantly, young Pokemon seem to trust one almost immediately.",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Find Them',
            type: 'success',
          },
        ],
      },
      {
        id: 3,
        title: 'Day Care Couple',
        message:
          "Perhaps not for the recovery room. We're looking for a helper with a very gentle manner and some experience caring for Pokemon that are hurt, tired, or frightened.",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Try Again Later',
            type: 'fail',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
      message:
        "A Chansey would make the recovery room feel safe again. If you find one willing to join the Day Care, we'd be very grateful to meet it.",
      closeButtonText: 'Find Helper',
    },
  },
  {
    id: 'day-care-nurse-helper',
    name: 'Recovery Helper',
    description:
      'A Chansey could keep the recovery room calm and help tired hatchlings settle.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'pokemon',
      id: '113',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Send Chansey',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-nurse-helper-clue',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        targetId: 113,
        count: 1,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'pokemon',
        targetId: 440,
        quantity: 1,
        secret: true,
        pokemonData: {
          level: 15,
          formId: '440',
          ballType: 'poke-ball',
          background: '/backgrounds/inside-house.avif',
          obtainedMethod: 'gift',
          obtainedRegion: 'Kanto',
          obtainedLocation: 'Cerulean City',
          obtainedSourceId: 'day-care-nurse-helper',
        },
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'pokemon',
        id: '440',
      },
      message:
        "Chansey makes the recovery room feel calmer the moment it arrives. A cheerful Happiny tries its best to help with the pillows, and the couple suggest that travelling with you would give it plenty of chances to grow.",
      closeButtonText: 'Welcome Happiny',
    },
  },
  {
    id: 'day-care-playroom-helper-clue',
    name: 'Playroom Plans',
    description:
      'The playroom needs a helper who can keep the young Pokemon busy without making a mess.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'trainer',
      id: 'old-couple',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Suggest Helper',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-celadon-helper-planning',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Day Care Couple',
        message:
          "The playroom is our biggest puzzle. The youngsters need games, room to explore, and someone who can keep the excitement from spilling through the whole building. Who could manage all that without spoiling the fun?",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Suggest Pokemon',
            type: 'password',
            id: 2,
            fail: 3,
          },
          {
            text: 'Think About It',
            type: 'fail',
          },
        ],
      },
      {
        id: 2,
        title: 'Day Care Couple',
        message:
          "Mr. Mime? Oh, that's clever. It could entertain the youngsters and shape the room around each game without us rebuilding it every afternoon.",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Find Them',
            type: 'success',
          },
        ],
      },
      {
        id: 3,
        title: 'Day Care Couple',
        message:
          "That one might join in a little too enthusiastically. We need a helper who can hold everyone's attention while still keeping the games safely contained.",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Try Again Later',
            type: 'fail',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
      message:
        "The more we picture it, the more Mr. Mime seems made for the playroom. Bring one by and we'll let it decide where the first game begins.",
      closeButtonText: 'Find Helper',
    },
  },
  {
    id: 'day-care-playroom-helper',
    name: 'Playroom Helper',
    description:
      'A Mr. Mime could keep the playroom fun, tidy, and just strange enough.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'pokemon',
      id: '122',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Send Mr. Mime',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-playroom-helper-clue',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        targetId: 122,
        count: 1,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'pokemon',
        targetId: 439,
        quantity: 1,
        secret: true,
        pokemonData: {
          level: 15,
          formId: '439',
          ballType: 'poke-ball',
          background: '/backgrounds/inside-house.avif',
          obtainedMethod: 'gift',
          obtainedRegion: 'Kanto',
          obtainedLocation: 'Cerulean City',
          obtainedSourceId: 'day-care-playroom-helper',
        },
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'pokemon',
        id: '439',
      },
      message:
        "Mr. Mime soon has the whole playroom laughing without a toy out of place. Mime Jr. copies the performance from the doorway, and the couple ask if you'll help the little mimic discover a style of its own.",
      closeButtonText: 'Welcome Mime Jr.',
    },
  },
  {
    id: 'day-care-naptime-helper-clue',
    name: 'Afternoon Quiet',
    description:
      'The couple need a helper who can settle the room when the young Pokemon get restless.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'trainer',
      id: 'old-couple',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Suggest Helper',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-celadon-helper-planning',
      },
    ],
    criteria: [],
    rewards: [],
    enterModal: [
      {
        id: 1,
        title: 'Day Care Couple',
        message:
          "After lunch, every cot becomes a trampoline. We need a calm helper who can settle a whole room at once, even when half the youngsters insist they aren't tired. Who would you trust with nap time?",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Suggest Pokemon',
            type: 'password',
            id: 2,
            fail: 3,
          },
          {
            text: 'Think About It',
            type: 'fail',
          },
        ],
      },
      {
        id: 2,
        title: 'Day Care Couple',
        message:
          "Hypno? Now there's an idea. It could help the restless ones unwind together instead of us chasing them back to their cots one at a time.",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Find Them',
            type: 'success',
          },
        ],
      },
      {
        id: 3,
        title: 'Day Care Couple',
        message:
          "We're not convinced that one could calm the entire room. Nap time needs someone patient and soothing, with a way of helping even stubborn youngsters drift off.",
        background: '/backgrounds/inside-house.avif',
        icon: {
          type: 'trainer',
          id: 'old-couple',
        },
        buttons: [
          {
            text: 'Try Again Later',
            type: 'fail',
          },
        ],
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'trainer',
        id: 'old-couple',
      },
      message:
        "Hypno might finally bring some peace to our afternoons. If you find one suited to gentle Day Care work, we'd love you to bring it by.",
      closeButtonText: 'Find Helper',
    },
  },
  {
    id: 'day-care-naptime-helper',
    name: 'Nap-Time Helper',
    description:
      'A Hypno could help the restless young Pokemon settle during the afternoon.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'pokemon',
      id: '97',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Send Hypno',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-naptime-helper-clue',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        targetId: 97,
        count: 1,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'pokemon',
        targetId: 238,
        quantity: 1,
        secret: true,
        pokemonData: {
          level: 15,
          formId: '238',
          ballType: 'poke-ball',
          background: '/backgrounds/inside-house.avif',
          obtainedMethod: 'gift',
          obtainedRegion: 'Kanto',
          obtainedLocation: 'Cerulean City',
          obtainedSourceId: 'day-care-naptime-helper',
        },
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'pokemon',
        id: '238',
      },
      message:
        "Hypno settles into a quiet corner, and before long the whole room is peacefully asleep. The couple introduce you to an energetic Smoochum and wonder if life on the road might be the perfect outlet for all that confidence.",
      closeButtonText: 'Welcome Smoochum',
    },
  },
  {
    id: 'day-care-celadon-helpers-gathered',
    name: 'A Full Nursery',
    description:
      'With every helper in place, the Day Care finally feels ready for young Pokemon again.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: {
      type: 'pokemon',
      id: '175',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Visit Nursery',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'day-care-security-helper',
      },
      {
        type: 'task_completed',
        targetId: 'day-care-tutor-helper',
      },
      {
        type: 'task_completed',
        targetId: 'day-care-nurse-helper',
      },
      {
        type: 'task_completed',
        targetId: 'day-care-playroom-helper',
      },
      {
        type: 'task_completed',
        targetId: 'day-care-naptime-helper',
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'pokemon',
        targetId: 175,
        quantity: 1,
        secret: true,
        pokemonData: {
          level: 18,
          formId: '175',
          ballType: 'poke-ball',
          background: '/backgrounds/inside-house.avif',
          obtainedMethod: 'gift',
          obtainedRegion: 'Kanto',
          obtainedLocation: 'Cerulean City',
          obtainedSourceId: 'day-care-celadon-helpers-gathered',
        },
      },
    ],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Day Care Couple',
      icon: {
        type: 'pokemon',
        id: '175',
      },
      message:
        'For the first time all day, the nursery is peaceful. Then one egg rocks in its basket, the helpers gather round, and Togepi chirps like it has been waiting for the Day Care to feel whole again.',
      closeButtonText: 'Welcome Togepi',
    },
  },
  {
    id: 'day-care-egg-program',
    name: 'Unexpected Eggs',
    description: 'The Day Care couple have noticed abandoned Pokemon Eggs appearing in unexpected places.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/inside-house.avif',
    icon: { type: 'pokemon', id: '175' },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Speak to the Couple',
    requirements: [
      { type: 'task_completed', targetId: 'day-care-celadon-helpers-gathered' },
      { type: 'skill_level', targetId: 'researching', count: 32 },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/inside-house.avif',
      title: 'Day Care Couple',
      icon: { type: 'pokemon', id: '175' },
      message: 'Sometimes Pokemon Eggs are left abandoned in unexpected areas. Keep an eye out while you conduct Field Observations—we will help you hatch any you find.',
      closeButtonText: 'I will keep watch',
    },
  },
  {
    id: 'route-9-shrub',
    name: 'Roadside Shrub',
    description:
      'A small tree blocks the east road out of Cerulean. A Pokemon that knows Cut could clear the way toward Rock Tunnel.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/grassy-route.avif',
    icon: {
      type: 'local',
      id: '/sprites/cut_tree.avif',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Use Cut',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'cerulean-city-complete',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'tm-cut',
      },
      {
        type: 'item_owned',
        targetId: 'badge-kanto-thunder',
      },
    ],
    rewards: [],
  },
  {
    id: 'route-9-mountain-pass-blocked',
    name: 'Mountain Pass',
    description:
      "The road east climbs into a narrow mountain pass. I can't keep my footing on the loose stones.",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/rocky-path.avif',
    icon: {
      type: 'local',
      id: '/sprites/sign.avif',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Try the Pass',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-shrub',
      },
    ],
    criteria: [],
    rewards: [],
    exitModal: {
      background: '/backgrounds/rocky-path.avif',
      title: 'Route 9 Pass',
      icon: {
        type: 'local',
        id: '/sprites/sign.avif',
      },
      message:
        'The path narrows almost immediately. Gravel shifts under your shoes, and the wind pushes hard across the open ledge. A Hiker nearby is already watching you turn back.',
      closeButtonText: 'Step Back',
    },
  },
  {
    id: 'route-9-hiker-warning',
    name: 'Pass Advice',
    description:
      'A Hiker by the Route 9 Pass looks like he has stopped a lot of unprepared Trainers. I should ask him what the problem is.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/rocky-path.avif',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Ask About the Pass',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-mountain-pass-blocked',
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    enterModal: [
      {
        id: 1,
        title: 'Route 9 Hiker',
        message:
          "Hold up. That pass isn't blocked, but it might as well be if you go in dressed like that.",
        background: '/backgrounds/rocky-path.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
        buttons: [
          {
            text: 'That bad?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Route 9 Hiker',
        message:
          "Loose gravel first, then cold wind on the ledges, then handholds that chew through bare palms. Start with your footing. I've got an old spare pair of boots if you can make them trail-worthy.",
        background: '/backgrounds/rocky-path.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
        buttons: [
          {
            text: 'Show me',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'route-9-sturdy-boots',
    name: 'Repair Worn Boots',
    description:
      "The Hiker has a battered spare pair of boots. I can buy them cheaply and repair the soles for Route 9's loose gravel.",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/rocky-path.avif',
    icon: {
      type: 'item',
      id: 'hiker-boots',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Buy and Resole',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-hiker-warning',
      },
    ],
    criteria: [
      {
        type: 'currency_owned',
        targetId: 'pokedollars',
        count: 500,
        consume: true,
      },
      {
        type: 'item_owned',
        targetId: 'small-stone-t1',
        count: 6,
        consume: true,
      },
      {
        type: 'item_owned',
        targetId: 'soft-fluff-t1',
        count: 4,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'item',
        targetId: 'hiker-boots',
        quantity: 1,
        dropChance: 100,
        secret: true,
      },
    ],
    exitModal: {
      background: '/backgrounds/rocky-path.avif',
      title: 'Repaired Boots',
      icon: {
        type: 'item',
        id: 'hiker-boots',
      },
      message:
        "The boots were cheap for a reason, but the repair holds. The Hiker digs a heel into the gravel, gives a sharp nod, and says the pass will punish loose clothing next.",
      closeButtonText: 'Ask About Clothes',
    },
  },
  {
    id: 'route-9-trail-clothes',
    name: 'Trail Clothes Pattern',
    description:
      'The Hiker knows how trail clothes should be layered for the cold Route 9 ledges. I should ask him what to make.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/rocky-path.avif',
    icon: {
      type: 'item',
      id: 'hiker-clothes',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Discuss Clothes',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-sturdy-boots',
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    enterModal: [
      {
        id: 1,
        title: 'Route 9 Hiker',
        message:
          "Boots will get you up the first slope. After that, the wind does the work. Baggy sleeves catch on stone, thin cloth chills fast.",
        background: '/backgrounds/rocky-path.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
        buttons: [
          {
            text: 'What should I wear?',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Route 9 Hiker',
        message:
          "Soft lining inside, feathered seams outside, close fit around the wrists. If you've got an Artisan bench, stitch it properly there. Roadside knots won't last a mile.",
        background: '/backgrounds/rocky-path.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
        buttons: [
          {
            text: 'Learn Pattern',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'route-9-climbing-gloves',
    name: 'Climbing Gloves',
    description:
      'The Hiker says old climbing gloves sometimes turn up where Route 9 walkers stop to rest. I should study the trail closely.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/rocky-path.avif',
    icon: {
      type: 'item',
      id: 'hiker-gloves',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Show Gloves',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-trail-clothes',
      },
      {
        type: 'item_owned',
        targetId: 'hiker-clothes',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'hiker-gloves',
        count: 1,
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/rocky-path.avif',
      title: 'Climbing Gloves',
      icon: {
        type: 'item',
        id: 'hiker-gloves',
      },
      message:
        "The Hiker checks the palms and flexes the fingers. They're scuffed, but the grip is good. Boots, clothes, gloves. That's enough to dress for the pass.",
      closeButtonText: 'Get Ready',
    },
  },
  {
    id: 'route-9-assemble-hiker-outfit',
    name: 'Hiker Outfit',
    description:
      "I've got the boots, trail clothes, and climbing gloves. Time to put together proper mountain gear.",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/rocky-path.avif',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Get Dressed',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-9-sturdy-boots',
      },
      {
        type: 'task_completed',
        targetId: 'route-9-trail-clothes',
      },
      {
        type: 'task_completed',
        targetId: 'route-9-climbing-gloves',
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'hiker-boots',
        count: 1,
        consume: true,
      },
      {
        type: 'item_owned',
        targetId: 'hiker-clothes',
        count: 1,
        consume: true,
      },
      {
        type: 'item_owned',
        targetId: 'hiker-gloves',
        count: 1,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'icon',
        targetId: 'hiker',
        dropChance: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/rocky-path.avif',
      title: 'Hiker Outfit',
      icon: {
        type: 'trainer',
        id: 'hiker',
      },
      message:
        'The Hiker gives the outfit one last look and steps aside. The gravel still shifts, but now you have the gear to handle it.',
      closeButtonText: 'Head for the Pass',
    },
  },
  {
    id: 'surf-route-10-water',
    name: 'Route 10 Waterside',
    description:
      'The mountain path drops toward deep water here. I can see the way onward, but I need a Pokemon that can Surf.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    background: '/backgrounds/beach.avif',
    icon: {
      type: 'pokemon',
      id: '131',
    },
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Use Surf',
    requirements: [
      {
        type: 'expedition_result',
        targetId: 'route-9-pass-expedition',
        expeditionStatus: 'completed',
        count: 1,
      },
    ],
    criteria: [
      {
        type: 'item_owned',
        targetId: 'tm-surf',
        count: 1,
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/beach.avif',
      title: 'Route 10 Waterside',
      icon: {
        type: 'pokemon',
        id: '131',
      },
      message: 'The current is strong, but Surf carries you cleanly across.',
      closeButtonText: 'Cross Water',
    },
  },
]
