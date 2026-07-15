import { Task } from '../../types'

const route10Gate = {
  type: 'expedition_result' as const,
  targetId: 'route-9-pass-expedition',
  expeditionStatus: 'completed' as const,
  count: 1,
}

export const route10Tasks: Task[] = [
  {
    id: 'route-10-rock-and-hard-place',
    name: 'Rock & A Hard Place',
    description:
      'I made it!... kind of. A landslide is blocking the road south toward Rock Tunnel.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/rocky-path.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Check the Landslide',
    requirements: [route10Gate],
    criteria: [],
    rewards: [],
    chat: true,
    enterModal: [
      {
        id: 1,
        title: 'Route 10 Hiker',
        message:
          "You've got the Hiker spirit, kid. Can't believe you made it all this way with just you and your Pokemon. You're looking for a way south, right?",
        background: '/backgrounds/rocky-path.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
        buttons: [
          {
            text: 'Yup',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Route 10 Hiker',
        message:
          "Well, I have a plan. Don't ask any questions. Just put that throwing arm to good use and catch us 3 Voltorb. I would, but the Sacred Hikers Oath prevents us from catching anything other than Rock and Ground types.",
        background: '/backgrounds/rocky-path.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
        buttons: [
          {
            text: 'Catch Voltorb',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'route-10-voltorb-roundup',
    name: 'Voltorb Roundup',
    description: 'The Hiker needs three Voltorb for a very questionable landslide-clearing plan.',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '100',
    },
    background: '/backgrounds/rocky-path.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Hand Over Voltorb',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-10-rock-and-hard-place',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        targetId: 100,
        count: 3,
        consume: true,
      },
    ],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 650,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/rocky-path.avif',
      title: 'Route 10 Hiker',
      icon: {
        type: 'trainer',
        id: 'hiker',
      },
      message:
        "Now, kid, watch this! BOOOOOM! The hard part is getting them set up juuuuust right. Also, don't get yourself or other Pokemon caught in the blast. I don't want to answer to Nurse Joy or the Kanto Rangers.",
      closeButtonText: 'Start Clearing',
    },
  },
  {
    id: 'route-10-open-road',
    name: 'The Open Road',
    description: 'Wooo! Exploding Voltorbs is soo much fun!!!',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/rocky-path.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Check the Road',
    requirements: [
      {
        type: 'research_encounter_result',
        targetId: 'route-10-voltorb-landslide',
        battleStatus: 'win',
        count: 1,
      },
    ],
    criteria: [],
    rewards: [
      {
        type: 'xp',
        skill: 'catching',
        quantity: 350,
        dropChance: 100,
      },
    ],
    chat: true,
    enterModal: [
      {
        id: 1,
        title: 'Route 10 Hiker',
        message: 'Hey kid, you did it! Nice work! Oh. That Picnicker does not seem happy...',
        background: '/backgrounds/rocky-path.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
        buttons: [
          {
            text: 'Uh oh',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'route-10-further-destruction',
    name: 'Further Destruction',
    description:
      'The Hiker looks like he has something to say... or maybe he just wants to blow up more stuff',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/rocky-path.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Hear Him Out',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-10-open-road',
      },
    ],
    criteria: [
      {
        type: 'skill_level',
        targetId: 'catching',
        count: 20,
      },
      {
        type: 'skill_level',
        targetId: 'researching',
        count: 20,
      },
    ],
    rewards: [],
    chat: true,
    exitModal: {
      background: '/backgrounds/rocky-path.avif',
      title: 'Route 10 Hiker',
      icon: {
        type: 'trainer',
        id: 'hiker',
      },
      message: 'So I was thinking you seem like a smart well travelled kid...',
      closeButtonText: 'Go on...',
    },
  },
  {
    id: 'reaching-rock-tunnel',
    name: 'Reaching Rock Tunnel',
    description:
      "Looks like I've finally made it... Wonder if there's anything for me to explode in there?",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'local',
      id: '/sprites/sign.avif',
    },
    background: '/backgrounds/rocky-path.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Check the Entrance',
    requirements: [
      {
        type: 'battle_result',
        targetId: 'route-10-picknicker-heidi',
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
    exitModal: {
      background: '/backgrounds/rocky-path.avif',
      title: 'Reaching Rock Tunnel',
      icon: {
        type: 'local',
        id: '/sprites/sign.avif',
      },
      message: 'I should probably stop by the Pokecenter before I head in.',
      closeButtonText: 'Head Back',
    },
  },
  {
    id: 'route-10-watt-a-problem',
    name: 'Watt a Problem',
    description:
      "I can't seem to refuse people, no matter how bad of an idea I think it is",
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'trainer',
      id: 'hiker',
    },
    background: '/backgrounds/rocky-path.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'So....',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-10-further-destruction',
      },
    ],
    criteria: [],
    rewards: [],
    chat: true,
    enterModal: [
      {
        id: 1,
        title: 'Route 10 Hiker',
        message:
          "Great I take it you're onboard I knew you would be! So here's the thing, you see that mountain range to the south, on the other side of it is the old abandoned power plant. It's weird but they built it so you could only get to it via water.",
        background: '/backgrounds/rocky-path.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
        buttons: [
          {
            text: 'Go On',
            type: 'navigate',
            id: 2,
          },
        ],
      },
      {
        id: 2,
        title: 'Route 10 Hiker',
        message:
          "Anyway lately I swear I've seen a tiny little pokemon around Route 10 that I just don't recognise, it must be coming from the plant, but I can't imagine it's swimming here it looked too small. I need a favour could you do some field research and see if you can track down where it's coming from?",
        background: '/backgrounds/rocky-path.avif',
        icon: {
          type: 'trainer',
          id: 'hiker',
        },
        buttons: [
          {
            text: 'Sure why not!',
            type: 'success',
          },
        ],
      },
    ],
  },
  {
    id: 'route-10-tiny-pokemon-mystery',
    name: 'Tiny Pokemon Mystery',
    description: 'I need to find out about the mysterious tiny pokemon on Route 10',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '239',
    },
    background: '/backgrounds/rocky-path.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Report Findings',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-10-watt-a-problem',
      },
    ],
    criteria: [
      {
        type: 'research_level',
        targetId: '239',
        count: 1,
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/rocky-path.avif',
      title: 'Route 10 Hiker',
      icon: {
        type: 'trainer',
        id: 'hiker',
      },
      message:
        "Ahhh Elekid, and you've tracked it down to a small crack in the southern mountain? You know what comes next.....",
      closeButtonText: 'Oh no',
    },
  },
  {
    id: 'route-10-demolition-crew',
    name: 'Demolition Crew',
    description:
      'The Hiker reckons we can blow the crack wide enough to get in if we have around 3 Voltorb. I am not sure this is safe... or allowed...',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '100',
    },
    background: '/backgrounds/rocky-path.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Hand Over Voltorb',
    requirements: [
      {
        type: 'task_completed',
        targetId: 'route-10-tiny-pokemon-mystery',
      },
    ],
    criteria: [
      {
        type: 'pokemon_owned',
        targetId: 100,
        count: 3,
        consume: true,
      },
    ],
    rewards: [],
    exitModal: {
      background: '/backgrounds/rocky-path.avif',
      title: 'Route 10 Hiker',
      icon: {
        type: 'trainer',
        id: 'hiker',
      },
      message: "Nice work Kid, now let's get to placing these Voltorb!",
      closeButtonText: 'Start Demolition',
    },
  },
  {
    id: 'route-10-such-devastation',
    name: 'Such Devastation, this WAS my intention',
    description: 'Time to see where these Pokemon are coming from...',
    category: 'Kanto',
    subCategory: 'Cerulean City',
    icon: {
      type: 'pokemon',
      id: '239',
    },
    background: '/backgrounds/power-plant.avif',
    repeatable: false,
    secret: false,
    completionTrigger: 'manual',
    completeButtonText: 'Check the Breach',
    requirements: [
      {
        type: 'research_encounter_result',
        targetId: 'route-10-voltorb-final-breach',
        battleStatus: 'win',
        count: 1,
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
      {
        type: 'xp',
        skill: 'researching',
        quantity: 1000,
        dropChance: 100,
      },
      {
        type: 'pokemon_research_xp',
        targetId: '239',
        quantity: 75,
        dropChance: 100,
      },
    ],
    exitModal: {
      background: '/backgrounds/power-plant.avif',
      title: 'Power Plant Store Room',
      icon: {
        type: 'pokemon',
        id: '239',
      },
      message:
        "Ahh It's just an old storage room, at the back of the plant, but there's tons of those Pokemon about!",
      closeButtonText: 'Enter Store Room',
    },
  },
]
