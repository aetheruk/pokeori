import { Task } from '../../types'

export const celadonCityTasks: Task[] = [
  {
    "id": "thirstier-work-route-7",
    "name": "Thirstier Work",
    "description": "The Guard at the Celadon side of the Underground Path looks even thirstier than the last one.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/grassy-route.avif",
    "icon": {
      "type": "trainer",
      "id": "policeman"
    },
    "repeatable": true,
    "daily": true,
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Hand Over Soda Pop",
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "underground-path-route-8"
      },
      {
        "type": "daily_not_completed",
        "targetId": "thirstier-work-route-7"
      }
    ],
    "criteria": [
      {
        "type": "item_owned",
        "targetId": "soda-pop",
        "count": 1,
        "consume": true
      }
    ],
    "rewards": [
      {
        "type": "item",
        "targetId": "great-ball",
        "quantity": 2
      }
    ],
    "exitModal": {
      "background": "/backgrounds/grassy-route.avif",
      "title": "Route 7 Guard",
      "icon": {
        "type": "trainer",
        "id": "policeman"
      },
      "message": "Perfect timing. This post is dry work, but I've got a couple of spare Great Balls from the gatehouse stores.",
      "closeButtonText": "Receive Great Balls"
    }
  },
  {
    "id": "route-7-growlithe-study",
    "name": "Route 7 Growlithe Notes",
    "description": "A successful Route 7 Field Observation may reveal extra details about Growlithe.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/grassy-route.avif",
    "icon": {
      "type": "pokemon",
      "id": "58"
    },
    "repeatable": false,
    "secret": true,
    "completionTrigger": "auto",
    "requirements": [
      {
        "type": "pokedex_caught_specific",
        "targetId": 58,
        "count": 1
      }
    ],
    "criteria": [],
    "rewards": [
      {
        "type": "pokemon_research_xp",
        "targetId": "58",
        "quantity": 30,
        "dropChance": 100
      }
    ],
    "exitModal": {
      "background": "/backgrounds/grassy-route.avif",
      "title": "Exceptional Growlithe Observation",
      "icon": {
        "type": "pokemon",
        "id": "58"
      },
      "message": "You watched a Growlithe chase its own tail for more than ten minutes, finally toppling over, and falling asleep.",
      "closeButtonText": "Record Growlithe Observation"
    }
  },
  {
    "id": "route-7-vulpix-study",
    "name": "Route 7 Vulpix Notes",
    "description": "A successful Route 7 Field Observation may reveal extra details about Vulpix.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/grassy-route.avif",
    "icon": {
      "type": "pokemon",
      "id": "37"
    },
    "repeatable": false,
    "secret": true,
    "completionTrigger": "auto",
    "requirements": [
      {
        "type": "pokedex_caught_specific",
        "targetId": 37,
        "count": 1
      }
    ],
    "criteria": [],
    "rewards": [
      {
        "type": "pokemon_research_xp",
        "targetId": "37",
        "quantity": 30,
        "dropChance": 100
      }
    ],
    "exitModal": {
      "background": "/backgrounds/grassy-route.avif",
      "title": "Exceptional Vulpix Observation",
      "icon": {
        "type": "pokemon",
        "id": "37"
      },
      "message": "A Vulpix paintstakingly groomed each of its six tails, before a pidgey kicked sand at it starting the whole process again.",
      "closeButtonText": "Record Vulpix Observation"
    }
  },
  {
    "id": "explore-celadon-city",
    "name": "Explore Celadon City",
    "description": "The Underground Path opens onto a short route, and the lights of Celadon are just ahead.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "icon": {
      "type": "local",
      "id": "/sprites/sign.avif"
    },
    "background": "/backgrounds/celadon.avif",
    "repeatable": false,
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Enter Celadon City",
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "underground-path-route-8"
      }
    ],
    "criteria": [
      {
        "type": "battle_result",
        "targetId": "route-7-battle",
        "battleStatus": "win",
        "count": 3
      },
      {
        "type": "location_encounter_result",
        "targetId": "route-7",
        "count": 3
      },
      {
        "type": "field_research_result",
        "targetId": "route-7-field-observation",
        "count": 1
      }
    ],
    "rewards": [],
    "exitModal": {
      "background": "/backgrounds/celadon.avif",
      "title": "Celadon City",
      "icon": {
        "type": "local",
        "id": "/sprites/sign.avif"
      },
      "message": "I can't get distracted right now, first thing straight to the Police HQ",
      "closeButtonText": "Explore Celadon"
    }
  },
  {
    "id": "police-hq",
    "name": "Police HQ",
    "description": "Finally made it! someone here will know what to do.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/police-hq.avif",
    "icon": {
      "type": "trainer",
      "id": "policeman"
    },
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Hello?",
    "requirements": [
      {
        "type": "task_completed",
        "count": 1,
        "targetId": "explore-celadon-city"
      }
    ],
    "repeatable": false,
    "criteria": [],
    "rewards": [],
    "chat": true,
    "enterModal": [
      {
        "id": 1,
        "title": "Celadon Police HQ",
        "message": "You explain what happened at the tower: Kita, Mr. Fuji, the strange events and that you're in desperate need for help.",
        "background": "/backgrounds/police-hq.avif",
        "icon": {
          "type": "trainer",
          "id": "policeman"
        },
        "buttons": [
          {
            "text": "Tell them everything",
            "type": "navigate",
            "id": 2
          }
        ]
      },
      {
        "id": 2,
        "title": "Police Officer",
        "message": "Whoa whoa slow down kid. This is quite the tall tale. Ghost Girls and psychic powers? Are you sure you haven't just been hanging around Sabrina?",
        "background": "/backgrounds/police-hq.avif",
        "icon": {
          "type": "trainer",
          "id": "policeman"
        },
        "buttons": [
          {
            "text": "It's all true!",
            "type": "navigate",
            "id": 3
          }
        ]
      },
      {
        "id": 3,
        "title": "Police Officer",
        "message": "Kid look okay for a start the Rocket organisation have been a huge benefit for the people here in Celadon, the department store, the new manufacturing plant. They're creating jobs. Ignoring the ghosts and psychics what you're saying doesn't make any sense. Why would they be messing around in a graveyard a town over? You know who does like to mess around in Graveyards? Kids. Now get out of here before I kick you out.",
        "buttons": [
          {
            "text": "So you wont help?",
            "type": "success"
          }
        ],
        "background": "/backgrounds/police-hq.avif",
        "icon": {
          "type": "trainer",
          "id": "policeman"
        }
      }
    ],
    "exitModal": {
      "background": "/backgrounds/police-hq.avif",
      "title": "A Dead End",
      "closeButtonText": "What Now.",
      "message": "That didn't go all like I expected! What a jerk...",
      "icon": {
        "type": "trainer",
        "id": "policeman"
      }
    }
  },
  {
    "id": "leaving-police-hq",
    "name": "Leaving HQ",
    "description": "I'll have to head back to Lavender Town and see if I can sort this myself. The police were useless. I swear something fishy is going on.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/police-hq.avif",
    "icon": {
      "type": "trainer",
      "id": "rocket-grunt"
    },
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Ouch!",
    "repeatable": false,
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "police-hq"
      }
    ],
    "criteria": [],
    "rewards": [],
    "enterModal": [
      {
        "id": 1,
        "title": "Rocket Grunt",
        "message": "You feel a sharp pain on the back of your head. You turn around to see a Rocket Grunt scowling at you.",
        "background": "/backgrounds/police-hq.avif",
        "icon": {
          "type": "trainer",
          "id": "rocket-grunt"
        },
        "buttons": [
          {
            "text": "What The..?!",
            "type": "navigate",
            "id": 2
          }
        ]
      },
      {
        "id": 2,
        "title": "Rocket Grunt",
        "message": "{Trainer}, right? Don't pretend otherwise. I know it's you. You best keep your nose out of our business, kid.",
        "background": "/backgrounds/police-hq.avif",
        "icon": {
          "type": "trainer",
          "id": "rocket-grunt"
        },
        "buttons": [
          {
            "text": "If I don't?",
            "type": "success"
          }
        ]
      }
    ],
    "exitModal": {
      "background": "/backgrounds/police-hq.avif",
      "title": "Rocket Grunt",
      "closeButtonText": "Battle!",
      "message": "Weezing Attack!",
      "icon": {
        "type": "trainer",
        "id": "rocket-grunt"
      }
    }
  },
  {
    "id": "the-rocket-problem",
    "name": "The Rocket Problem",
    "description": "I beat that grunt, but it wasn't easy.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/police-hq.avif",
    "icon": {
      "type": "trainer",
      "id": "rocket-grunt"
    },
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Get Lost!",
    "repeatable": false,
    "requirements": [
      {
        "type": "battle_result",
        "targetId": "celadon-hq-rocket-ambush",
        "battleStatus": "win"
      }
    ],
    "criteria": [],
    "rewards": [],
    "exitModal": {
      "background": "/backgrounds/police-hq.avif",
      "title": "Rocket Grunt",
      "closeButtonText": "I'm so scared...",
      "message": "You got lucky, kid. I doubt you'll be that fortunate next time. Watch your back.",
      "icon": {
        "type": "trainer",
        "id": "rocket-grunt"
      }
    }
  },
  {
    "id": "rocket-problem-wrapup",
    "name": "Pssst",
    "description": "Oh what now...",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/celadon.avif",
    "icon": {
      "type": "trainer",
      "id": "detective"
    },
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Hello?",
    "repeatable": false,
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "the-rocket-problem"
      }
    ],
    "criteria": [],
    "rewards": [
      {
        "type": "xp",
        "skill": "catching",
        "quantity": 500,
        "dropChance": 100
      }
    ],
    "enterModal": [
      {
        "id": 1,
        "title": "A Friend?",
        "message": "No cause for alarm there, {Trainer}. I've seen everything since you went into the HQ. You look like you could do with some help. I know I could.",
        "background": "/backgrounds/celadon.avif",
        "icon": {
          "type": "trainer",
          "id": "detective"
        },
        "buttons": [
          {
            "text": "Help?",
            "type": "navigate",
            "id": 2
          }
        ]
      },
      {
        "id": 2,
        "title": "Det. Ray Choo",
        "message": "Sorry, please forgive me, I never introduced myself. I'm Ray, or Detective Choo if you prefer. The private investigator kind, not the paid-by-Rocket kind.",
        "background": "/backgrounds/celadon.avif",
        "icon": {
          "type": "trainer",
          "id": "detective"
        },
        "buttons": [
          {
            "text": "Paid by Rocket?",
            "type": "navigate",
            "id": 3
          }
        ]
      },
      {
        "id": 3,
        "title": "Det. Ray Choo",
        "message": "Were you not suspicious they wouldn't listen at all? The whole police department here is on Rocket's books; you'll find no help there. I'm actually investigating them myself. They used to be a petty crime organisation, but something's changed. There's too many rumours floating around and a huge increase in activity.",
        "background": "/backgrounds/celadon.avif",
        "icon": {
          "type": "trainer",
          "id": "detective"
        },
        "buttons": [
          {
            "text": "Activity?",
            "type": "navigate",
            "id": 4
          }
        ]
      },
      {
        "id": 4,
        "title": "Det. Ray Choo",
        "message": "Have you not seen the huge new facility out to the west? Half of Cycling Road has been built on; it's the size of a small town. Then there's the recent Poké Ball shortages across Kanto, not to mention their grunts wandering around with those eerie-looking Pokémon. I'm already under suspicion, so I can't move as freely as I used to. So, what do you say?",
        "background": "/backgrounds/celadon.avif",
        "icon": {
          "type": "trainer",
          "id": "detective"
        },
        "buttons": [
          {
            "text": "Me?",
            "type": "navigate",
            "id": 5
          }
        ]
      },
      {
        "id": 5,
        "title": "Det. Ray Choo",
        "message": "We're both after the same thing here. To get to the bottom of Team Rocket's activity. I say we team up. You're a trainer, right? You can move around a lot easier than an old-timer like me. We find out what's going on with Team Rocket and see if we can get to the bottom of what's happening in Lavender Town at the same time. I wouldn't worry too much about Fuji either. They won't have left him. He's too important to them. Trust me on that.",
        "background": "/backgrounds/celadon.avif",
        "icon": {
          "type": "trainer",
          "id": "detective"
        },
        "buttons": [
          {
            "text": "Okay?",
            "type": "success"
          }
        ]
      }
    ],
    "exitModal": {
      "background": "/backgrounds/celadon.avif",
      "title": "Det. Ray Choo",
      "closeButtonText": "Let's Battle!",
      "message": "So you're in. Excellent! I've got a few leads we should check out but before that let me and my partner here make sure you're up to scratch.",
      "icon": {
        "type": "trainer",
        "id": "detective"
      }
    }
  },
  {
    "id": "tag-team",
    "name": "Tag Team",
    "description": "Detective Choo is going to share with me what he's learned so far.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/celadon.avif",
    "icon": {
      "type": "trainer",
      "id": "detective"
    },
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "What do you know?",
    "repeatable": false,
    "requirements": [
      {
        "type": "battle_result",
        "targetId": "det-ray-choo-skill-test",
        "battleStatus": "win"
      }
    ],
    "criteria": [],
    "rewards": [],
    "exitModal": {
      "background": "/backgrounds/celadon.avif",
      "title": "Det. Ray Choo",
      "closeButtonText": "See You Soon",
      "message": "I don't have anything concrete, but a few leads. There's something going on at the Department Store: it's wholly owned by Team Rocket, and recently there's been a huge shift in the kind of products it's stocking. Then we have links to the money itself; you should be able to learn something from that huge mansion in the north. Then there's Erika. She acts all sweet and innocent, but she's the biggest gossip in town; if anything's going down, she'll know. Finally, the belly of the beast: Celadon Game Corner. Rumour is, if you hit the big time there, you'll get invited to the high-stakes room, often frequented by Rocket Admins. Play well and get your info directly from the source. I've got a few things I need to check up on myself. Find out what you can, and we'll meet back here in 48 hours.",
      "icon": {
        "type": "trainer",
        "id": "detective"
      }
    }
  }
]
