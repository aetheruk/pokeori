import { Task } from '../../types'

export const celadonCityTasks: Task[] = [
  {
    "id": "when-the-fun-stops",
    "name": "When the Fun Stops",
    "description": "A Department Store maid is enthusiastically drumming up business for Celadon Game Corner.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/game-corner.avif",
    "icon": {
      "type": "trainer",
      "id": "maid"
    },
    "repeatable": false,
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Hear Her Out",
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "tag-team"
      }
    ],
    "criteria": [],
    "rewards": [
      {
        "type": "currency",
        "targetId": "fun-tokens",
        "quantity": 100
      }
    ],
    "enterModal": [
      {
        "id": 1,
        "title": "Department Store Maid",
        "message": "Looking for a little excitement Trainer? Celadon Game Corner has games for every taste, prizes for every lucky winner, and a wonderfully lively atmosphere. Your first hundred Fun Tokens are on the house!",
        "background": "/backgrounds/game-corner.avif",
        "icon": {
          "type": "trainer",
          "id": "maid"
        },
        "buttons": [
          {
            "text": "Sounds fun",
            "type": "success"
          }
        ]
      }
    ],
    "exitModal": {
      "background": "/backgrounds/game-corner.avif",
      "title": "Celadon Game Corner",
      "icon": {
        "type": "trainer",
        "id": "maid"
      },
      "message": "You receive 100 Fun Tokens. I need to get in see what I can find out, and not lose all my money. This could be tricky.",
      "closeButtonText": "Play On"
    }
  },
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
  },
  {
    "id": "regroup-effort",
    "name": "Regroup",
    "description": "I've followed every lead Detective Choo gave me. It's time to compare what we've learned.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/celadon.avif",
    "icon": {
      "type": "trainer",
      "id": "detective"
    },
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Meet Detective Choo",
    "repeatable": false,
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "rooftop-mysterious-offer"
      },
      {
        "type": "task_completed",
        "targetId": "a-craftsmans-secret"
      },
      {
        "type": "task_completed",
        "targetId": "erikas-gossip"
      },
      {
        "type": "task_completed",
        "targetId": "corporate-takeover"
      }
    ],
    "criteria": [],
    "rewards": [
      {
        "type": "xp",
        "skill": "catching",
        "quantity": 2000,
        "dropChance": 100
      }
    ],
    "enterModal": [
      {
        "id": 1,
        "title": "Det. Ray Choo",
        "message": "There you are, {Trainer}. I was starting to get a little worried. Did you manage to find anything out?",
        "background": "/backgrounds/celadon.avif",
        "icon": {
          "type": "trainer",
          "id": "detective"
        },
        "buttons": [
          {
            "text": "It's all connected",
            "type": "navigate",
            "id": 2
          }
        ]
      },
      {
        "id": 2,
        "title": "Det. Ray Choo",
        "message": "Rocket is strangling the Evolution Stone supply, replacing ordinary Poké Balls with their own failures, and using the Game Corner money to make a play for Silph Co. That is not petty crime; it is a takeover of how trainers travel, train, and grow stronger.",
        "background": "/backgrounds/celadon.avif",
        "icon": {
          "type": "trainer",
          "id": "detective"
        },
        "buttons": [
          {
            "text": "And Shadow Force?",
            "type": "navigate",
            "id": 3
          }
        ]
      },
      {
        "id": 3,
        "title": "Det. Ray Choo",
        "message": "Operation Shadow Force is the piece we still cannot see. But it is moving fast, and every lead points back to their Shadow Pokémon and whatever they did at Pokémon Tower. You did excellent work. We finally have a shape to this case.",
        "background": "/backgrounds/celadon.avif",
        "icon": {
          "type": "trainer",
          "id": "detective"
        },
        "buttons": [
          {
            "text": "What's next?",
            "type": "success"
          }
        ]
      }
    ],
    "exitModal": {
      "background": "/backgrounds/celadon.avif",
      "title": "Det. Ray Choo",
      "message": "Before we move on, I need a small favour. We're going to need all the fire power we can muster and I would rather trust a stone made outside Rocket's grip. Can you make a Fire Stone, so my partner can reach his full potential?",
      "closeButtonText": "I'll make one",
      "icon": {
        "type": "trainer",
        "id": "detective"
      }
    }
  },
  {
    "id": "a-stone-for-a-friend",
    "name": "A Stone for a Friend",
    "description": "Detective Choo needs a Fire Stone for his Growlithe. I should make one without Team Rocket's help.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/celadon.avif",
    "icon": {
      "type": "trainer",
      "id": "detective"
    },
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Give Ray the Fire Stone",
    "repeatable": false,
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "regroup-effort"
      }
    ],
    "criteria": [
      {
        "type": "item_owned",
        "targetId": "fire-stone",
        "count": 1,
        "consume": true
      }
    ],
    "rewards": [],
    "enterModal": [
      {
        "id": 1,
        "title": "Det. Ray Choo",
        "message": "You made it yourself? Excellent work! Then Rocket did not get to decide what my partner could become.\n",
        "background": "/backgrounds/celadon.avif",
        "icon": {
          "type": "trainer",
          "id": "detective"
        },
        "buttons": [
          {
            "text": "Use the Fire Stone",
            "type": "navigate",
            "id": 2
          }
        ]
      },
      {
        "id": 2,
        "title": "Det. Ray Choo",
        "message": "The Fire Stone glows in Growlithe's paws. In a burst of warm light, Ray's loyal partner grows into a proud Arcanine. Ray laughs, then gives his mane an affectionate scratch.",
        "background": "/backgrounds/celadon.avif",
        "icon": {
          "type": "trainer",
          "id": "detective"
        },
        "buttons": [
          {
            "text": "Arcanine!",
            "type": "success"
          }
        ]
      }
    ],
    "exitModal": {
      "background": "/backgrounds/celadon.avif",
      "title": "Det. Ray Choo",
      "message": "Now, I may have a lead on the Pokémon Tower problem. Sabrina in Saffron is our best chance of getting to the top of Pokemon Tower and seeing the aftermath for ourselves. It's also worth chasing up the Silph Co lead while we're there.",
      "closeButtonText": "Head for Saffron",
      "icon": {
        "type": "trainer",
        "id": "detective"
      }
    }
  },
  {
    "id": "spread-your-wings",
    "name": "Spread Your Wings",
    "description": "This guy is looking particularly stressed, surrounded by feathers and white gloop.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/celadon.avif",
    "icon": {
      "type": "trainer",
      "id": "bird-keeper"
    },
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Hello",
    "repeatable": false,
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "tag-team"
      }
    ],
    "criteria": [
      {
        "type": "research_level",
        "targetId": "16",
        "count": 4
      },
      {
        "type": "research_level",
        "targetId": "21",
        "count": 4
      }
    ],
    "rewards": [
      {
        "type": "task_complete",
        "targetId": "nest-ball-manual",
        "quantity": 1,
        "secret": true
      }
    ],
    "enterModal": [
      {
        "id": 1,
        "title": "Birdkeeper",
        "message": "A fellow Bird enthusiast, I can tell! Kindred spirits, you and I. I've got myself in a bit of a bind.",
        "background": "/backgrounds/celadon.avif",
        "icon": {
          "type": "trainer",
          "id": "bird-keeper"
        },
        "buttons": [
          {
            "text": "Go On",
            "type": "navigate",
            "id": 2
          }
        ]
      },
      {
        "id": 2,
        "title": "Birdkeeper",
        "message": "Well, I'm a Birdkeeper, or should I say I was. It turns out without the Poké Ball, Bird Pokémon are not naturally inclined to the keeping. Fancy helping a brother out here?",
        "background": "/backgrounds/celadon.avif",
        "icon": {
          "type": "trainer",
          "id": "bird-keeper"
        },
        "buttons": [
          {
            "text": "How can I help?",
            "type": "success"
          }
        ]
      }
    ],
    "exitModal": {
      "background": "/backgrounds/celadon.avif",
      "title": "Birdkeeper",
      "message": "The Birdkeeper explains his situation. Effectively, he'd like some birds to actually keep: a lot of them, to be precise. He says they need to be in a special type of ball called a Nest Ball. I can probably work out how to make them from his description.",
      "closeButtonText": "Work Out The Recipe",
      "icon": {
        "type": "trainer",
        "id": "bird-keeper"
      }
    }
  },
  {
    "id": "nesting-season",
    "name": "Nesting Season",
    "description": "I've got to fetch the Birdkeeper 20 Pidgey and 20 Spearow, but they must be in Nest Balls so they're extra comfy and don't fly off.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/celadon.avif",
    "icon": {
      "type": "trainer",
      "id": "bird-keeper"
    },
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Here You Go",
    "repeatable": false,
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "spread-your-wings"
      }
    ],
    "criteria": [
      {
        "type": "pokemon_owned",
        "count": 20,
        "consume": true,
        "pokemonCriteria": {
          "speciesId": 16,
          "ballType": "nest-ball"
        }
      },
      {
        "type": "pokemon_owned",
        "count": 20,
        "consume": true,
        "pokemonCriteria": {
          "speciesId": 21,
          "ballType": "nest-ball"
        }
      }
    ],
    "rewards": [
      {
        "type": "item",
        "targetId": "tm-fly",
        "quantity": 1,
        "secret": true
      }
    ],
    "exitModal": {
      "background": "/backgrounds/celadon.avif",
      "title": "Birdkeeper",
      "message": "You did it! I knew I could rely on you. You could say we're birds of a feather! …No? Okay. Either way, now the birds are back I've got something too cool to show you. My very own Pidgey Training Challenge! If you want to take part, I'll just need a little bit of cash for the feed.",
      "closeButtonText": "Nice!",
      "icon": {
        "type": "trainer",
        "id": "bird-keeper"
      }
    }
  },
  {
    "id": "tea-time-at-pokemansion",
    "name": "Tea Time at Pokemansion",
    "description": "Not sure how I'm going to fit in here. This could be tricky.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/celadon-mansion-lounge.avif",
    "icon": {
      "type": "trainer",
      "id": "butler"
    },
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Knock on the door",
    "repeatable": false,
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "tag-team"
      }
    ],
    "criteria": [],
    "rewards": [],
    "exitModal": {
      "background": "/backgrounds/celadon-mansion-lounge.avif",
      "title": "Butler Lionel",
      "message": "Good afternoon, sir. You must be here for the Ceremony of Stones… Hmm, wait a moment. I'm sorry, sir, but I'm going to have to ask you to leave. I misspoke earlier.",
      "closeButtonText": "Oh…",
      "icon": {
        "type": "trainer",
        "id": "butler"
      }
    }
  },
  {
    "id": "a-classy-guy",
    "name": "A Classy Guy",
    "description": "There's a gentleman approaching the mansion. Perhaps he can help?",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/celadon-mansion-lounge.avif",
    "icon": {
      "type": "trainer",
      "id": "gentleman"
    },
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Hello, sir.",
    "repeatable": false,
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "tea-time-at-pokemansion"
      }
    ],
    "criteria": [],
    "rewards": [
      {
        "type": "item",
        "targetId": "lets-go-ability-patch",
        "quantity": 1
      }
    ],
    "enterModal": [
      {
        "id": 1,
        "title": "Gentleman",
        "message": "Haha, turned down at the door, were you? That Lionel can be quite the menace. These events used to be open to everyone, until they started cutting the supply of Evolution Stones. You know, back in my day we'd just make them ourselves; no need to spend extortionate amounts of money on a silly rock.",
        "background": "/backgrounds/celadon-mansion-lounge.avif",
        "icon": {
          "type": "trainer",
          "id": "gentleman"
        },
        "buttons": [
          {
            "text": "How interesting",
            "type": "navigate",
            "id": 2
          }
        ]
      },
      {
        "id": 2,
        "title": "Gentleman",
        "message": "Oh yes, yes, sorry. You want in? It's simple really: just come back with an Eevee, and you'll fit right in. Here, take this. If you give it to a Pikachu, it will make them much easier to find. And if you need any more, I believe they sell them in Viridian City. I'm surprised you never picked one up earlier. Eevee are quite popular these days.",
        "background": "/backgrounds/celadon-mansion-lounge.avif",
        "icon": {
          "type": "trainer",
          "id": "gentleman"
        },
        "buttons": [
          {
            "text": "Thank you",
            "type": "success"
          }
        ]
      }
    ],
    "exitModal": {
      "background": "/backgrounds/celadon-mansion-lounge.avif",
      "title": "Let's Go Ability Patch",
      "message": "The gentleman hands you an Ability Patch. It can teach Pikachu the Let's Go ability. For some reason Eevee are drawn to Pikachu with this ability.",
      "closeButtonText": "Take Ability Patch",
      "icon": {
        "type": "item",
        "id": "lets-go-ability-patch"
      }
    }
  },
  {
    "id": "vip-coming-through",
    "name": "VIP Coming Through",
    "description": "If I want in, I'm going to have to bring an Eevee along with me.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/celadon-mansion-lounge.avif",
    "icon": {
      "type": "trainer",
      "id": "butler"
    },
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Enter the mansion",
    "repeatable": false,
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "a-classy-guy"
      }
    ],
    "criteria": [
      {
        "type": "companion",
        "companionCheck": {
          "speciesId": 133
        }
      }
    ],
    "rewards": [],
    "exitModal": {
      "background": "/backgrounds/celadon-mansion-lounge.avif",
      "title": "Butler Lionel",
      "message": "Ah, hello, sir. My, you look vaguely familiar. Please come on in; the others are in the lounge. I believe the Mistress shall be beginning proceedings shortly.",
      "closeButtonText": "Enter the lounge",
      "icon": {
        "type": "trainer",
        "id": "butler"
      }
    }
  },
  {
    "id": "ceremony-of-stones",
    "name": "Ceremony of Stones",
    "description": "The lounge is full of Eevee trainers, but their celebration has a sour edge.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/celadon-mansion-lounge.avif",
    "icon": {
      "type": "trainer",
      "id": "socialite"
    },
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Join the conversation",
    "repeatable": false,
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "vip-coming-through"
      }
    ],
    "criteria": [],
    "rewards": [],
    "enterModal": [
      {
        "id": 1,
        "title": "Socialite",
        "message": "I had planned on a Water Stone for my Eevee this season. Now the dealers are asking three times what they did last month. Vaporeon simply cannot be expected to wait for the market to behave.",
        "background": "/backgrounds/celadon-mansion-lounge.avif",
        "icon": {
          "type": "trainer",
          "id": "socialite"
        },
        "buttons": [
          {
            "text": "Why are they so scarce?",
            "type": "navigate",
            "id": 2
          }
        ]
      },
      {
        "id": 2,
        "title": "Gentleman",
        "message": "Because Team Rocket has closed the elemental-stone pits from Pewter to the Sevii shipping lanes. Officially, it is all safety inspections and licensing. Funny how those inspections only leave Rocket-approved merchants with stock.",
        "background": "/backgrounds/celadon-mansion-lounge.avif",
        "icon": {
          "type": "trainer",
          "id": "gentleman"
        },
        "buttons": [
          {
            "text": "They control the supply?",
            "type": "navigate",
            "id": 3
          }
        ]
      },
      {
        "id": 3,
        "title": "Socialite",
        "message": "Precisely. Fewer stones mean fewer evolved Pokemon outside their little circle. They call it market discipline; I call it keeping capable trainers beneath them.",
        "background": "/backgrounds/celadon-mansion-lounge.avif",
        "icon": {
          "type": "trainer",
          "id": "socialite"
        },
        "buttons": [
          {
            "text": "That is terrible",
            "type": "success"
          }
        ]
      }
    ],
    "exitModal": {
      "background": "/backgrounds/celadon-mansion-lounge.avif",
      "title": "Gentleman",
      "message": "You heard all that, did you? It is a disgrace. There are older ways to make an Evolution Stone—ways Rocket cannot lock behind a velvet rope. Find me after the ceremony.",
      "closeButtonText": "Speak to him",
      "icon": {
        "type": "trainer",
        "id": "gentleman"
      }
    }
  },
  {
    "id": "a-craftsmans-secret",
    "name": "A Craftsman's Secret",
    "description": "The Gentleman says he can show me how Evolution Stones were made before Rocket controlled the mines.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/celadon-mansion-lounge.avif",
    "icon": {
      "type": "trainer",
      "id": "gentleman"
    },
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Speak to the Gentleman",
    "repeatable": false,
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "ceremony-of-stones"
      }
    ],
    "criteria": [],
    "rewards": [
      {
        "type": "item",
        "targetId": "neutral-stone",
        "quantity": 1
      },
      {
        "type": "task_complete",
        "targetId": "elemental-stones-recipe"
      }
    ],
    "enterModal": [
      {
        "id": 1,
        "title": "Gentleman",
        "message": "Terrible business, isn’t it? But a mined stone is not the only road to evolution. Before the companies and their permits, craftsmen began with these: Neutral Stones.",
        "background": "/backgrounds/celadon-mansion-lounge.avif",
        "icon": {
          "type": "trainer",
          "id": "gentleman"
        },
        "buttons": [
          {
            "text": "What do they do?",
            "type": "navigate",
            "id": 2
          }
        ]
      },
      {
        "id": 2,
        "title": "Gentleman",
        "message": "They are blank slates. Bind one with the right gems and Pokemon materials, and you create an Inferior Elemental Stone. It is not finished yet, mind you. it must be held in battle and fed the right kind of energy before it becomes a true Evolution Stone.",
        "background": "/backgrounds/celadon-mansion-lounge.avif",
        "icon": {
          "type": "trainer",
          "id": "gentleman"
        },
        "buttons": [
          {
            "text": "Where can I find more?",
            "type": "navigate",
            "id": 3
          }
        ]
      },
      {
        "id": 3,
        "title": "Gentleman",
        "message": "They turn up more often than people think. Now you know what you're looking for just keep your eyes open while you're out and about. Take this one and my notes. With patience, your Pokemon will never need Rocket’s permission to grow stronger.",
        "background": "/backgrounds/celadon-mansion-lounge.avif",
        "icon": {
          "type": "trainer",
          "id": "gentleman"
        },
        "buttons": [
          {
            "text": "Thank you",
            "type": "success"
          }
        ]
      }
    ],
    "exitModal": {
      "background": "/backgrounds/celadon-mansion-lounge.avif",
      "title": "Elemental Stonecraft",
      "message": "The Gentleman gives you a Neutral Stone and the recipes for Inferior Elemental Stones. He wishes you luck on your evolution journey.",
      "closeButtonText": "Learn Stonecraft",
      "icon": {
        "type": "item",
        "id": "neutral-stone"
      }
    }
  },
  {
    "id": "celadon-socialite-eevee-trade",
    "name": "Eevee, Darling",
    "description": "A Socialite at Pokémansion is paying handsomely for Eevee to join her collection.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/celadon-mansion-lounge.avif",
    "icon": {
      "type": "trainer",
      "id": "socialite"
    },
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Offer Eevee",
    "repeatable": true,
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "a-craftsmans-secret"
      }
    ],
    "criteria": [
      {
        "type": "pokemon_owned",
        "count": 1,
        "consume": true,
        "pokemonCriteria": {
          "speciesId": 133
        }
      }
    ],
    "rewards": [
      {
        "type": "currency",
        "targetId": "pokedollars",
        "quantity": 1500
      }
    ],
    "enterModal": [
      {
        "id": 1,
        "background": "/backgrounds/celadon-mansion-lounge.avif",
        "title": "Socialite",
        "message": "Oh, an Eevee! Such refinement cannot be left to wander the roads. I would simply adore to add one to my collection. Naturally, I shall compensate you for the privilege.",
        "icon": {
          "type": "trainer",
          "id": "socialite"
        },
        "buttons": [
          {
            "text": "Choose an Eevee",
            "type": "success"
          }
        ]
      }
    ],
    "exitModal": {
      "background": "/backgrounds/celadon-mansion-lounge.avif",
      "title": "Socialite",
      "message": "Divine. This Eevee will want for nothing in its new home. Do bring me another if you happen upon one, darling.",
      "closeButtonText": "Until next time",
      "icon": {
        "type": "trainer",
        "id": "socialite"
      }
    }
  },
  {
    "id": "celadon-gym-challenge",
    "name": "Erika's Gym Challenge",
    "description": "Celadon Gym is just ahead. I should see whether Erika knows anything about what Team Rocket is doing.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/gym-grass.avif",
    "icon": {
      "type": "trainer",
      "id": "gym-kanto-erika"
    },
    "repeatable": false,
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Visit Celadon Gym",
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "tag-team"
      }
    ],
    "criteria": [],
    "rewards": [],
    "exitModal": {
      "background": "/backgrounds/gym-grass.avif",
      "title": "Celadon Gym",
      "icon": {
        "type": "trainer",
        "id": "gym-kanto-erika"
      },
      "message": "The Gym is fragrant with flowers and surprisingly strict: Fire- and Flying-type Pokemon are not permitted in a challenger's Battle Team. Erika's trainers are waiting.",
      "closeButtonText": "Begin the Challenge"
    }
  },
  {
    "id": "erikas-rainbow-badge",
    "name": "Erika's Gift",
    "description": "I defeated Erika. I should speak with her and receive the Rainbow Badge.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/gym-grass.avif",
    "icon": {
      "type": "item",
      "id": "badge-kanto-rainbow"
    },
    "repeatable": false,
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Speak with Erika",
    "requirements": [
      {
        "type": "battle_result",
        "targetId": "celadon-gym-erika",
        "battleStatus": "win",
        "count": 1
      }
    ],
    "criteria": [],
    "rewards": [
      {
        "type": "currency",
        "targetId": "pokedollars",
        "quantity": 2900,
        "dropChance": 100
      },
      {
        "type": "currency",
        "targetId": "league-ticket",
        "quantity": 10,
        "dropChance": 100
      },
      {
        "type": "item",
        "targetId": "badge-kanto-rainbow",
        "quantity": 1,
        "dropChance": 100
      },
      {
        "type": "item",
        "targetId": "tm-protective-pollen",
        "quantity": 1,
        "dropChance": 100
      }
    ],
    "exitModal": {
      "background": "/backgrounds/gym-grass.avif",
      "title": "Gym Leader Erika",
      "icon": {
        "type": "trainer",
        "id": "gym-kanto-erika"
      },
      "message": "Your battle was as graceful as a garden in bloom. Please accept the Rainbow Badge, and this TM for Protective Pollen. A Pokemon can learn to shelter itself from Fire-type attacks.",
      "closeButtonText": "Receive Rewards"
    }
  },
  {
    "id": "erikas-gossip",
    "name": "Erika's Gossip",
    "description": "Erika can't wait to tell you about something she overhead.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/gym-grass.avif",
    "icon": {
      "type": "trainer",
      "id": "gym-kanto-erika"
    },
    "repeatable": false,
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Listen to Erika",
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "erikas-rainbow-badge"
      }
    ],
    "criteria": [],
    "rewards": [],
    "exitModal": {
      "background": "/backgrounds/gym-grass.avif",
      "title": "Gym Leader Erika",
      "icon": {
        "type": "trainer",
        "id": "gym-kanto-erika"
      },
      "message": "Hey {trainer} have i got something juicy for you! I was having a few drinks with the girls at Celadon heights recently when I overheard a senior Rocket official speaking rather freely. I didn't catch the full conversation but they said definitely said Operation Shadow Force was ahead of schedule, and that a full launch was expected within the next month. What that operation is, I cannot say, whatever it is it sounds dramatic, maybe a new activity at the Games Corner?",
      "closeButtonText": "Operation Shadow Force..."
    }
  },
  {
    "id": "erikas-sweet-tooth",
    "name": "Erika's Sweet Tooth",
    "description": "Erika would like a few Yellow Berry Candies to enjoy while she tends the Gym.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/gym-grass.avif",
    "icon": {
      "type": "trainer",
      "id": "gym-kanto-erika"
    },
    "repeatable": true,
    "daily": true,
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Bring Treats",
    "requirements": [
      {
        "type": "item_owned",
        "targetId": "badge-kanto-rainbow"
      },
      {
        "type": "daily_not_completed",
        "targetId": "erikas-sweet-tooth"
      }
    ],
    "criteria": [
      {
        "type": "item_owned",
        "targetId": "yellow-berry-candy",
        "count": 3,
        "consume": true
      }
    ],
    "rewards": [
      {
        "type": "item",
        "targetId": "pack-gym1",
        "quantity": 1,
        "dropChance": 100
      },
      {
        "type": "currency",
        "targetId": "league-ticket",
        "quantity": 1,
        "dropChance": 100
      }
    ],
    "exitModal": {
      "background": "/backgrounds/gym-grass.avif",
      "title": "Gym Leader Erika",
      "icon": {
        "type": "trainer",
        "id": "gym-kanto-erika"
      },
      "message": "How thoughtful, {Trainer}. These Yellow Berry Candies are a wonderful little treat between tending the flowers.",
      "closeButtonText": "Receive Pack"
    }
  },
  {
    "id": "shop-till-you-drop",
    "name": "Shop Till You Drop",
    "description": "There is a special promotion at Celadon Department Store.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/shop.avif",
    "icon": {
      "type": "trainer",
      "id": "maid"
    },
    "repeatable": false,
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Visit Department Store",
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "tag-team"
      }
    ],
    "criteria": [],
    "rewards": [
      {
        "type": "item",
        "targetId": "rocket-ball",
        "quantity": 5,
        "dropChance": 100
      }
    ],
    "enterModal": [
      {
        "id": 1,
        "title": "Department Store Maid",
        "message": "Welcome to Celadon Department Store! Trainer Essentials are on the first floor, TMs on the second, and the Luxury Lounge on the third. The fourth floor is under renovation, while our vitamins are on the fifth. Do enjoy your visit.",
        "background": "/backgrounds/shop.avif",
        "icon": {
          "type": "trainer",
          "id": "maid"
        },
        "buttons": [
          {
            "text": "What is the promotion?",
            "type": "navigate",
            "id": 2
          }
        ]
      },
      {
        "id": 2,
        "title": "Department Store Maid",
        "message": "Rocket Balls, of course. Team Rocket has generously replaced our ordinary stock with their exciting new specialist ball. Please accept five as a welcoming gift.",
        "background": "/backgrounds/shop.avif",
        "icon": {
          "type": "trainer",
          "id": "maid"
        },
        "buttons": [
          {
            "text": "Thank you",
            "type": "success"
          }
        ]
      }
    ],
    "exitModal": {
      "background": "/backgrounds/shop.avif",
      "title": "Department Store Promotion",
      "message": "Lets take a look around see if I cant uncover anything",
      "closeButtonText": "Start Shopping",
      "icon": {
        "type": "item",
        "id": "rocket-ball"
      }
    }
  },
  {
    "id": "department-store-renovation-notes",
    "name": "Renovation Notes",
    "description": "The fourth floor is closed, but a maid says its old in-house notes may still be useful.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/shop.avif",
    "icon": {
      "type": "trainer",
      "id": "maid"
    },
    "repeatable": false,
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Ask About Renovations",
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "shop-till-you-drop"
      }
    ],
    "criteria": [],
    "rewards": [],
    "exitModal": {
      "background": "/backgrounds/shop.avif",
      "title": "Department Store Maid",
      "message": "Team Rocket removed the stat items and Evolution Stones from sale, so this floor is being renovated. We did find the old in-house recipes for the battle boosters, though. You may purchase copies of the notes if you can make use of them.",
      "closeButtonText": "Browse the Notes",
      "icon": {
        "type": "trainer",
        "id": "maid"
      }
    }
  },
  {
    "id": "rocket-ball-complaints",
    "name": "Rocket Ball Complaints",
    "description": "Several Trainers on the fifth floor are unhappy with the Department Store's replacement Poké Balls.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/shop.avif",
    "icon": {
      "type": "trainer",
      "id": "maid"
    },
    "repeatable": false,
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Hear Them Out",
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "department-store-renovation-notes"
      }
    ],
    "criteria": [],
    "rewards": [],
    "exitModal": {
      "background": "/backgrounds/shop.avif",
      "title": "Frustrated Trainers",
      "message": "Hey what's the deal! The new Rocket Balls don't do anything at all. No matter how many I've bought they fail every single time!",
      "closeButtonText": "Follow Up",
      "icon": {
        "type": "trainer",
        "id": "ranger"
      }
    }
  },
  {
    "id": "rooftop-mysterious-offer",
    "name": "A Mysterious Offer",
    "description": "A Rocket Grunt on the Department Store rooftop seems interested in the complaints downstairs.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/celadon.avif",
    "icon": {
      "type": "trainer",
      "id": "rocket-grunt"
    },
    "repeatable": false,
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Hear Him Out",
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "rocket-ball-complaints"
      }
    ],
    "criteria": [],
    "rewards": [],
    "exitModal": {
      "background": "/backgrounds/celadon.avif",
      "title": "Rocket Grunt",
      "message": "Those complainers downstairs have no idea what they're talking about. Rocket Balls are exactly what the company needs them to be. Still, you seem like the sort who appreciates something a little less predictable. I have one curiosity left from a private shipment, if you've got the money for it.",
      "closeButtonText": "Browse the Offer",
      "icon": {
        "type": "trainer",
        "id": "rocket-grunt"
      }
    }
  },
  {
    "id": "celadon-luxury-massage",
    "name": "Luxury Lounge Massage",
    "description": "Treat my active companion to a relaxing Pokemon massage.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/shop.avif",
    "icon": {
      "type": "trainer",
      "id": "maid"
    },
    "repeatable": true,
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Book Massage",
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "shop-till-you-drop"
      },
      {
        "type": "companion",
        "label": "Set an active companion"
      }
    ],
    "criteria": [
      {
        "type": "currency_owned",
        "targetId": "pokedollars",
        "count": 1000,
        "consume": true
      }
    ],
    "rewards": [
      {
        "type": "active_companion_friendship",
        "quantity": 25
      }
    ],
    "exitModal": {
      "background": "/backgrounds/shop.avif",
      "title": "Luxury Lounge",
      "message": "Your companion leaves the massage looking exceptionally content.",
      "closeButtonText": "Lovely",
      "icon": {
        "type": "trainer",
        "id": "maid"
      }
    }
  },
  {
    "id": "celadon-luxury-analysis",
    "name": "Luxury Lounge Analysis",
    "description": "Have my active companion receive a full health and body analysis.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "background": "/backgrounds/shop.avif",
    "icon": {
      "type": "trainer",
      "id": "maid"
    },
    "repeatable": true,
    "secret": false,
    "completionTrigger": "manual",
    "completeButtonText": "Book Analysis",
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "shop-till-you-drop"
      },
      {
        "type": "companion",
        "label": "Set an active companion"
      }
    ],
    "criteria": [
      {
        "type": "currency_owned",
        "targetId": "pokedollars",
        "count": 5000,
        "consume": true
      }
    ],
    "rewards": [
      {
        "type": "active_companion_research_xp",
        "quantity": 25
      }
    ],
    "exitModal": {
      "background": "/backgrounds/shop.avif",
      "title": "Luxury Lounge",
      "message": "The analysis is complete. Hopefully you've learned something about your companion.",
      "closeButtonText": "Review Results",
      "icon": {
        "type": "trainer",
        "id": "maid"
      }
    }
  }
]
