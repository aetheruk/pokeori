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
        "type": "research_encounter_result",
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
        "message": "Kid look okay for a start the Rocket organisation have been a huge benefit for the people here in Celadon, the department store, the new manufacturing plant. They're creating jobs. ignoring the ghosts and psychics what you're saying doesn't make any sense. Why would they messing around in a graveyard a town over? You know who does like to mess around in Graveyards? Kids. Now get out of here before I kick you out.",
        "buttons": [
          {
            "text": "So you wont help?",
            "type": "navigate"
          }
        ],
        "background": "/backgrounds/police-hq.avif"
      }
    ],
    "exitModal": {
      "background": "/backgrounds/police-hq.avif",
      "title": "A Dead End",
      "closeButtonText": "What Now.",
      "message": "That didn't at all like I expected! What do I do now?!",
      "icon": {
        "type": "trainer",
        "id": "policeman"
      }
    }
  }
]
