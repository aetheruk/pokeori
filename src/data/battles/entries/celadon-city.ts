import { BattleConfig } from '../../types'

export const celadonCityBattles: BattleConfig[] = [
  {
    "id": "route-7-battle",
    "name": "Route 7",
    "description": "Wild Pokemon rustle in the grass just outside Celadon City.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "icon": {
      "type": "pokemon",
      "id": "43"
    },
    "background": "/backgrounds/grassy-route.avif",
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "underground-path-route-8"
      }
    ],
    "isWildBattle": true,
    "enemyAttackTelegraphChance": 2,
    "enemyTeam": [
      {
        "speciesId": 16,
        "formId": "16",
        "level": {
          "min": 18,
          "max": 22
        }
      },
      {
        "speciesId": 17,
        "formId": "17",
        "level": {
          "min": 18,
          "max": 22
        }
      },
      {
        "speciesId": 43,
        "formId": "43",
        "level": {
          "min": 18,
          "max": 22
        }
      },
      {
        "speciesId": 69,
        "formId": "69",
        "level": {
          "min": 18,
          "max": 22
        }
      },
      {
        "speciesId": 56,
        "formId": "56",
        "level": {
          "min": 18,
          "max": 22
        }
      },
      {
        "speciesId": 58,
        "formId": "58",
        "level": {
          "min": 18,
          "max": 22
        }
      },
      {
        "speciesId": 37,
        "formId": "37",
        "level": {
          "min": 18,
          "max": 22
        }
      },
      {
        "speciesId": 63,
        "formId": "63",
        "level": {
          "min": 18,
          "max": 22
        }
      }
    ],
    "rewards": [],
    "maxPokemon": 1,
    "levelCap": 30
  },
  {
    "id": "celadon-hq-rocket-ambush",
    "trainerClassId": "rocket-grunt",
    "name": "Rocket Grunt",
    "description": "A Rocket Grunt ambushes you as you leave Police HQ.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "icon": {
      "type": "trainer",
      "id": "rocket-grunt"
    },
    "background": "/backgrounds/police-hq.avif",
    "title": "Team Rocket",
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "leaving-police-hq"
      },
      {
        "type": "battle_result",
        "targetId": "celadon-hq-rocket-ambush",
        "battleStatus": "win",
        "count": 1,
        "inverse": true
      }
    ],
    "enemyTeam": [
      {
        "speciesId": 110,
        "formId": "110",
        "level": 30,
        "isShadow": true,
        "name": "Shadow Weezing",
        "rarity": "shadow"
      },
      {
        "speciesId": 20,
        "formId": "20",
        "level": 30,
        "isShadow": true,
        "name": "Shadow Raticate",
        "rarity": "shadow"
      }
    ],
    "trainerItems": [
      {
        "itemId": "battle-super-potion",
        "quantity": 1
      }
    ],
    "rewards": [],
    "maxPokemon": 3,
    "levelCap": 35,
    "enemyAttackTelegraphChance": 2,
    "allowedItems": [
      "battle-potion",
      "battle-super-potion"
    ]
  },
  {
    "id": "det-ray-choo-skill-test",
    "trainerClassId": "detective",
    "trainerName": "Ray Choo",
    "name": "Det. Ray Choo",
    "description": "Detective Ray Choo wants to test your skills before the two of you begin your investigation.",
    "category": "Kanto",
    "subCategory": "Celadon City",
    "icon": {
      "type": "trainer",
      "id": "detective"
    },
    "background": "/backgrounds/celadon.avif",
    "title": "Detective",
    "requirements": [
      {
        "type": "task_completed",
        "targetId": "rocket-problem-wrapup"
      },
      {
        "type": "battle_result",
        "targetId": "det-ray-choo-skill-test",
        "battleStatus": "win",
        "count": 1,
        "inverse": true
      }
    ],
    "enemyTeam": [
      {
        "speciesId": 58,
        "formId": "58",
        "level": 45
      }
    ],
    "rewards": [],
    "maxPokemon": 2,
    "levelCap": 30,
    "enemyAttackTelegraphChance": 2
  }
]
