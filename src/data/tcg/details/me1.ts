import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "me1-1",
    "name": "Bulbasaur",
    "number": "1",
    "artist": "HYOGONOSUKE",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Ivysaur"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bind Down",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      1
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/001/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/001/high.webp"
    }
  },
  {
    "id": "me1-2",
    "name": "Ivysaur",
    "number": "2",
    "artist": "Takumi Wada",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Bulbasaur",
    "evolvesTo": [
      "Venusaur"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Razor Leaf",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      2
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/002/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/002/high.webp"
    }
  },
  {
    "id": "me1-3",
    "name": "Mega Venusaur ex",
    "number": "3",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "380",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Ivysaur",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Solar Transfer",
        "text": "As often as you like during your turn, you may use this Ability. Move a Basic {G} Energy from 1 of your Pokémon to another of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Jungle Dump",
        "cost": [
          "Grass",
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 4,
        "damage": "240",
        "text": "Heal 30 damage from this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      3
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/003/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/003/high.webp"
    }
  },
  {
    "id": "me1-4",
    "name": "Exeggcute",
    "number": "4",
    "artist": "aspara",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Exeggutor"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Jam-Packed",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Basic {G} Energy card and attach it to this Pokémon. Then, shuffle your deck."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      102
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/004/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/004/high.webp"
    }
  },
  {
    "id": "me1-5",
    "name": "Exeggutor",
    "number": "5",
    "artist": "Kazumasa Yasukuni",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Exeggcute",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Guard Press",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Stomping Wood",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "This attack does 30 more damage for each {G} Energy attached to this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      103
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/005/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/005/high.webp"
    }
  },
  {
    "id": "me1-6",
    "name": "Tangela",
    "number": "6",
    "artist": "Yuriko Akase",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Tangrowth"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Powder",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Poisoned."
      },
      {
        "name": "Hook",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      114
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/006/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/006/high.webp"
    }
  },
  {
    "id": "me1-7",
    "name": "Tangrowth",
    "number": "7",
    "artist": "REND",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "150",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Tangela",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Absorb",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Heal 30 damage from this Pokémon."
      },
      {
        "name": "Pumped-Up Whip",
        "cost": [
          "Grass",
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120+",
        "text": "If this Pokémon has at least 2 extra Energy attached (in addition to this attack's cost), this attack does 140 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      465
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/007/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/007/high.webp"
    }
  },
  {
    "id": "me1-8",
    "name": "Chikorita",
    "number": "8",
    "artist": "kamonabe",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Bayleef"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Razor Leaf",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      152
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/008/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/008/high.webp"
    }
  },
  {
    "id": "me1-9",
    "name": "Bayleef",
    "number": "9",
    "artist": "nisimono",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Chikorita",
    "evolvesTo": [
      "Meganium"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Push Down",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Switch out your opponent's Active Pokémon to the Bench. (Your opponent chooses the new Active Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      153
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/009/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/009/high.webp"
    }
  },
  {
    "id": "me1-10",
    "name": "Meganium",
    "number": "10",
    "artist": "Yoriyuki Ikegami",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Bayleef",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Wild Growth",
        "text": "Each Basic {G} Energy attached to all of your Pokémon provides {G}{G} Energy. The effect of Wild Growth doesn't stack.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Solar Beam",
        "cost": [
          "Grass",
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "140",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      154
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/010/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/010/high.webp"
    }
  },
  {
    "id": "me1-11",
    "name": "Shuckle",
    "number": "11",
    "artist": "Shinya Komatsu",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fermented Juice",
        "text": "Once during your turn, if this Pokémon has any {G} Energy attached, you may use this Ability. Heal 30 damage from 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rollout",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      213
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/011/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/011/high.webp"
    }
  },
  {
    "id": "me1-12",
    "name": "Celebi",
    "number": "12",
    "artist": "Naoki Saito",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Traverse Time",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 in any combination of {G} Pokémon and Stadium cards, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Solar Cutter",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      251
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/012/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/012/high.webp"
    }
  },
  {
    "id": "me1-13",
    "name": "Seedot",
    "number": "13",
    "artist": "Miki Tanaka",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Nuzleaf"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Nap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 20 damage from this Pokémon."
      },
      {
        "name": "Seed Bomb",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      273
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/013/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/013/high.webp"
    }
  },
  {
    "id": "me1-14",
    "name": "Nuzleaf",
    "number": "14",
    "artist": "takashi shiraishi",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Seedot",
    "evolvesTo": [
      "Shiftry"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pound",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Low Kick",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      274
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/014/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/014/high.webp"
    }
  },
  {
    "id": "me1-15",
    "name": "Shiftry",
    "number": "15",
    "artist": "Uninori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Nuzleaf",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Reversing Gust",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, choose 1 of your opponent's Pokémon. Shuffle that Pokémon and all attached cards into their deck."
      },
      {
        "name": "Perplex",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "100",
        "text": "Your opponent's Active Pokémon is now Confused."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      275
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/015/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/015/high.webp"
    }
  },
  {
    "id": "me1-16",
    "name": "Nincada",
    "number": "16",
    "artist": "Kuroimori",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Ninjask"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scratch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      290
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/016/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/016/high.webp"
    }
  },
  {
    "id": "me1-17",
    "name": "Ninjask",
    "number": "17",
    "artist": "Apios",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Nincada",
    "evolvesTo": [
      "Shedinja"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Cast-Off Shell",
        "text": "Once during your turn, when you play this Pokémon from your hand to evolve 1 of your Pokémon, you may use this Ability. Search your deck for a Shedinja and put it onto your Bench. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "U-turn",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      291
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/017/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/017/high.webp"
    }
  },
  {
    "id": "me1-18",
    "name": "Dhelmise",
    "number": "18",
    "artist": "Haru Akasaka",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Earthen Power",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If you have a Stadium in play, this attack does 50 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      781
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/018/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/018/high.webp"
    }
  },
  {
    "id": "me1-19",
    "name": "Vulpix",
    "number": "19",
    "artist": "Naoyo Kimura",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Ninetales"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stampede",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Combustion",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      37
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/019/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/019/high.webp"
    }
  },
  {
    "id": "me1-20",
    "name": "Ninetales",
    "number": "20",
    "artist": "satoma",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Vulpix",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Supernatural Shapeshifter",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard the top card of your deck, and if that card is a Supporter card, use the effect of that card as the effect of this attack."
      },
      {
        "name": "Combustion",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      38
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/020/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/020/high.webp"
    }
  },
  {
    "id": "me1-21",
    "name": "Numel",
    "number": "21",
    "artist": "Wintr Wandr",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Camerupt"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Call for Family",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Flare",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      322
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/021/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/021/high.webp"
    }
  },
  {
    "id": "me1-22",
    "name": "Mega Camerupt ex",
    "number": "22",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Numel",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Roasting Heat",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "80+",
        "text": "If your opponent's Active Pokémon is Burned, this attack does 160 more damage."
      },
      {
        "name": "Volcanic Meteor",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "280",
        "text": "Discard 2 Energy from this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      323
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/022/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/022/high.webp"
    }
  },
  {
    "id": "me1-23",
    "name": "Litleo",
    "number": "23",
    "artist": "Kurata So",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Pyroar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flare",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      667
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/023/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/023/high.webp"
    }
  },
  {
    "id": "me1-24",
    "name": "Pyroar",
    "number": "24",
    "artist": "KEIICHIRO ITO",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Litleo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Intimidating Fang",
        "text": "As long as this Pokémon is in the Active Spot, attacks used by your opponent's Active Pokémon do 30 less damage (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Searing Flame",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Your opponent's Active Pokémon is now Burned."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      668
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/024/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/024/high.webp"
    }
  },
  {
    "id": "me1-25",
    "name": "Volcanion",
    "number": "25",
    "artist": "GIDORA",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Singe",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Burned."
      },
      {
        "name": "Backfire",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "Put 2 {R} Energy attached to this Pokémon into your hand."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      721
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/025/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/025/high.webp"
    }
  },
  {
    "id": "me1-26",
    "name": "Scorbunny",
    "number": "26",
    "artist": "svlt",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Raboot"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wild Kick",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If tails, this attack does nothing."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      813
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/026/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/026/high.webp"
    }
  },
  {
    "id": "me1-27",
    "name": "Raboot",
    "number": "27",
    "artist": "Narumi Sato",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Scorbunny",
    "evolvesTo": [
      "Cinderace"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Jumping Kick",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 40 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      814
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/027/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/027/high.webp"
    }
  },
  {
    "id": "me1-28",
    "name": "Cinderace",
    "number": "28",
    "artist": "REND",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Raboot",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Explosiveness",
        "text": "If this Pokémon is in your hand when you are setting up to play, you may put it face down in the Active Spot.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Turbo Flare",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "Search your deck for up to 3 Basic Energy cards and attach them to your Benched Pokémon in any way you like. Then, shuffle your deck."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      815
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/028/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/028/high.webp"
    }
  },
  {
    "id": "me1-29",
    "name": "Sizzlipede",
    "number": "29",
    "artist": "GIDORA",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Centiskorch"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ram",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Combustion",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      850
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/029/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/029/high.webp"
    }
  },
  {
    "id": "me1-30",
    "name": "Centiskorch",
    "number": "30",
    "artist": "Shiburingaru",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Sizzlipede",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Coiling Crush",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Flip 2 coins. For each heads, discard an Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Heat Crawler",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "140",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      851
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/030/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/030/high.webp"
    }
  },
  {
    "id": "me1-31",
    "name": "Chi-Yu",
    "number": "31",
    "artist": "Gemi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scorching Earth",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "If your opponent has a Stadium in play, discard it. If you do, your opponent can't play any Stadium cards from their hand during their next turn."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      1004
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/031/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/031/high.webp"
    }
  },
  {
    "id": "me1-32",
    "name": "Mantine",
    "number": "32",
    "artist": "Shimaris Yukichi",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Call for Family",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Waterfall",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      226
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/032/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/032/high.webp"
    }
  },
  {
    "id": "me1-33",
    "name": "Corphish",
    "number": "33",
    "artist": "Sanosuke Sakuma",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Crawdaunt"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Vise Grip",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Take Down",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "This Pokémon also does 10 damage to itself."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      341
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/033/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/033/high.webp"
    }
  },
  {
    "id": "me1-34",
    "name": "Kyogre",
    "number": "34",
    "artist": "Nisota Niso",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "150",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Riptide",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "This attack does 20 damage for each Basic {W} Energy card in your discard pile. Then, shuffle those cards into your deck."
      },
      {
        "name": "Swirling Waves",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "Discard 2 Energy from this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      382
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/034/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/034/high.webp"
    }
  },
  {
    "id": "me1-35",
    "name": "Snover",
    "number": "35",
    "artist": "Pani Kobayashi",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Abomasnow"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Beat",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Icy Snow",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      459
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/035/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/035/high.webp"
    }
  },
  {
    "id": "me1-36",
    "name": "Mega Abomasnow ex",
    "number": "36",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "350",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Snover",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Hammer-lanche",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "100×",
        "text": "Discard the top 6 cards of your deck, and this attack does 100 damage for each Basic {W} Energy card that you discarded in this way."
      },
      {
        "name": "Frost Barrier",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      460
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/036/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/036/high.webp"
    }
  },
  {
    "id": "me1-37",
    "name": "Clauncher",
    "number": "37",
    "artist": "Tomokazu Komiya",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Clawitzer"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wave Splash",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      692
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/037/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/037/high.webp"
    }
  },
  {
    "id": "me1-38",
    "name": "Clawitzer",
    "number": "38",
    "artist": "Anesaki Dynamic",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Clauncher",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fall Back to Reload",
        "text": "Once during your turn, when this Pokémon moves from the Active Spot to your Bench, you may use this Ability. Attach up to 2 Basic {W} Energy cards from your hand to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Aqua Launcher",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "210",
        "text": "Discard all Energy from this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      693
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/038/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/038/high.webp"
    }
  },
  {
    "id": "me1-39",
    "name": "Sobble",
    "number": "39",
    "artist": "Taira Akitsu",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Drizzile"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Surprise Attack",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If tails, this attack does nothing."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      816
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/039/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/039/high.webp"
    }
  },
  {
    "id": "me1-40",
    "name": "Drizzile",
    "number": "40",
    "artist": "Souichirou Gunjima",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Sobble",
    "evolvesTo": [
      "Inteleon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Stab",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30×",
        "text": "Flip 2 coins. This attack does 30 damage for each heads."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      817
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/040/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/040/high.webp"
    }
  },
  {
    "id": "me1-41",
    "name": "Inteleon",
    "number": "41",
    "artist": "akagi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Drizzile",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bring Down",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose a Pokémon in play (yours or your opponent's) that has the least HP remaining, except for this Pokémon, and it is Knocked Out."
      },
      {
        "name": "Water Shot",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "110",
        "text": "Discard an Energy from this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      818
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/041/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/041/high.webp"
    }
  },
  {
    "id": "me1-42",
    "name": "Snom",
    "number": "42",
    "artist": "Kagemaru Himeno",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Frosmoth"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hide",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage from and effects of attacks done to this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      872
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/042/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/042/high.webp"
    }
  },
  {
    "id": "me1-43",
    "name": "Frosmoth",
    "number": "43",
    "artist": "miki kudo",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Snom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Chilling Wings",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 20 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) Your opponent's Active Pokémon is now Asleep."
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      873
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/043/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/043/high.webp"
    }
  },
  {
    "id": "me1-44",
    "name": "Eiscue",
    "number": "44",
    "artist": "Akira Komayama",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Freezing Headbutt",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Tackle",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      875
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/044/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/044/high.webp"
    }
  },
  {
    "id": "me1-45",
    "name": "Magnemite",
    "number": "45",
    "artist": "Krgc",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Magneton"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Beam",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      81
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/045/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/045/high.webp"
    }
  },
  {
    "id": "me1-46",
    "name": "Magneton",
    "number": "46",
    "artist": "Saboteri",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Magnemite",
    "evolvesTo": [
      "Magnezone"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Thunder Shock",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      82
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/046/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/046/high.webp"
    }
  },
  {
    "id": "me1-47",
    "name": "Magnezone",
    "number": "47",
    "artist": "nagimiso",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Magneton",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Upper Spark",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "50+",
        "text": "If this Pokémon evolved from Magneton during this turn, this attack does 120 more damage."
      },
      {
        "name": "Flashing Bolt",
        "cost": [
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "160",
        "text": "During your next turn, this Pokémon can't use Flashing Bolt."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      462
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/047/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/047/high.webp"
    }
  },
  {
    "id": "me1-48",
    "name": "Raikou",
    "number": "48",
    "artist": "Takumi Wada",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Electro Fall",
        "cost": [
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If you have at least 4 {L} Energy in play, this attack does 90 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      243
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/048/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/048/high.webp"
    }
  },
  {
    "id": "me1-49",
    "name": "Electrike",
    "number": "49",
    "artist": "Naoki Saito",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Manectric"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Thunder Jolt",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This Pokémon also does 10 damage to itself."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      309
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/049/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/049/high.webp"
    }
  },
  {
    "id": "me1-50",
    "name": "Mega Manectric ex",
    "number": "50",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Electrike",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Flash Ray",
        "cost": [
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "During your opponent's next turn, prevent all damage done to this Pokémon by attacks from Basic Pokémon."
      },
      {
        "name": "Riotous Blasting",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "200+",
        "text": "You may discard all Energy from this Pokémon and have this attack do 130 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      310
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/050/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/050/high.webp"
    }
  },
  {
    "id": "me1-51",
    "name": "Pachirisu",
    "number": "51",
    "artist": "tono",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Electrified Incisors",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "During your opponent's next turn, whenever they attach an Energy card from their hand to the Defending Pokémon, place 8 damage counters on that Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      417
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/051/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/051/high.webp"
    }
  },
  {
    "id": "me1-52",
    "name": "Helioptile",
    "number": "52",
    "artist": "Yuka Morii",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Heliolisk"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Scratch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 2 coins. This attack does 10 damage for each heads."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      694
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/052/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/052/high.webp"
    }
  },
  {
    "id": "me1-53",
    "name": "Heliolisk",
    "number": "53",
    "artist": "Nakamura Ippan",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Helioptile",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dazzle Blast",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Your opponent's Active Pokémon is now Confused."
      },
      {
        "name": "Head Bolt",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      695
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/053/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/053/high.webp"
    }
  },
  {
    "id": "me1-54",
    "name": "Abra",
    "number": "54",
    "artist": "Orca",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Kadabra"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Teleportation Attack",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      63
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/054/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/054/high.webp"
    }
  },
  {
    "id": "me1-55",
    "name": "Kadabra",
    "number": "55",
    "artist": "Saboteri",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Abra",
    "evolvesTo": [
      "Alakazam"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Psychic Draw",
        "text": "Once during your turn, when you play this Pokémon from your hand to evolve 1 of your Pokémon, you may use this Ability. Draw 2 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Super Psy Bolt",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      64
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/055/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/055/high.webp"
    }
  },
  {
    "id": "me1-56",
    "name": "Alakazam",
    "number": "56",
    "artist": "Bun Toujo",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Kadabra",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Psychic Draw",
        "text": "Once during your turn, when you play this Pokémon from your hand to evolve 1 of your Pokémon, you may use this Ability. Draw 3 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Powerful Hand",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Place 2 damage counters on your opponent's Active Pokémon for each card in your hand."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      65
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/056/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/056/high.webp"
    }
  },
  {
    "id": "me1-57",
    "name": "Jynx",
    "number": "57",
    "artist": "Minahamu",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psychic",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 30 more damage for each Energy attached to your opponent's Active Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      124
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/057/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/057/high.webp"
    }
  },
  {
    "id": "me1-58",
    "name": "Ralts",
    "number": "58",
    "artist": "Terada Tera",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Kirlia"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Collect",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card."
      },
      {
        "name": "Headbutt",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      280
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/058/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/058/high.webp"
    }
  },
  {
    "id": "me1-59",
    "name": "Kirlia",
    "number": "59",
    "artist": "satoma",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Ralts",
    "evolvesTo": [
      "Gardevoir",
      "Gallade"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Call Sign",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 Pokémon, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Psyshot",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      281
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/059/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/059/high.webp"
    }
  },
  {
    "id": "me1-60",
    "name": "Mega Gardevoir ex",
    "number": "60",
    "artist": "takuyoa",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "360",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Kirlia",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Overflowing Wishes",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "For each of your Benched Pokémon, search your deck for a Basic {P} Energy card and attach it to that Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Mega Symphonia",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "This attack does 50 damage for each {P} Energy attached to all of your Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      282
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/060/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/060/high.webp"
    }
  },
  {
    "id": "me1-61",
    "name": "Shedinja",
    "number": "61",
    "artist": "IKEDA Saki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Nincada",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fragile Husk",
        "text": "If this Pokémon is Knocked Out by damage from an attack from your opponent's Pokémon ex, your opponent can't take any Prize cards for it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Damage Beat",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "This attack does 20 damage for each damage counter on your opponent's Active Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      292
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/061/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/061/high.webp"
    }
  },
  {
    "id": "me1-62",
    "name": "Spoink",
    "number": "62",
    "artist": "toi8",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Grumpig"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Triple Spin",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 3 coins. This attack does 10 damage for each heads."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      325
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/062/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/062/high.webp"
    }
  },
  {
    "id": "me1-63",
    "name": "Grumpig",
    "number": "63",
    "artist": "cochi8i",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Spoink",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Energized Steps",
        "text": "Once during your turn, when you play this Pokémon from your hand to evolve 1 of your Pokémon, you may use this Ability. Look at the top 4 cards of your deck and attach any number of Basic Energy cards you find there to your Pokémon in any way you like. Shuffle the other cards back into your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Psychic Sphere",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      326
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/063/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/063/high.webp"
    }
  },
  {
    "id": "me1-64",
    "name": "Xerneas",
    "number": "64",
    "artist": "Kazumasa Yasukuni",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Geo Gate",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 Basic {P} Pokémon and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Bright Horns",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "During your next turn, this Pokémon can't use Bright Horns."
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      716
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/064/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/064/high.webp"
    }
  },
  {
    "id": "me1-65",
    "name": "Greavard",
    "number": "65",
    "artist": "Narumi Sato",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stampede",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Take Down",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "This Pokémon also does 10 damage to itself."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      971
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/065/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/065/high.webp"
    }
  },
  {
    "id": "me1-66",
    "name": "Houndstone",
    "number": "66",
    "artist": "matazo",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Greavard",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Horrifying Bite",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin until you get tails. For each heads, choose a random card from your opponent's hand. Your opponent reveals those cards and shuffles them into their deck."
      },
      {
        "name": "Hammer In",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      972
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/066/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/066/high.webp"
    }
  },
  {
    "id": "me1-67",
    "name": "Gimmighoul",
    "number": "67",
    "artist": "Takeshi Nakamura",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Slap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      999
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/067/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/067/high.webp"
    }
  },
  {
    "id": "me1-68",
    "name": "Sandshrew",
    "number": "68",
    "artist": "Shinji Kanda",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Sandslash"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dig Claws",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Mud-Slap",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      27
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/068/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/068/high.webp"
    }
  },
  {
    "id": "me1-69",
    "name": "Sandslash",
    "number": "69",
    "artist": "imoniii",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Sandshrew",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sand Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "During your opponent's next turn, if the Defending Pokémon tries to use an attack, your opponent flips a coin. If tails, that attack doesn't happen."
      },
      {
        "name": "Mud Shot",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      28
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/069/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/069/high.webp"
    }
  },
  {
    "id": "me1-70",
    "name": "Onix",
    "number": "70",
    "artist": "Uta",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Steelix"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bind",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Strength",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      95
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/070/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/070/high.webp"
    }
  },
  {
    "id": "me1-71",
    "name": "Tyrogue",
    "number": "71",
    "artist": "OKUBO",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "30",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Hitmonlee",
      "Hitmonchan",
      "Hitmontop"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pow-Pow Punching",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "10+",
        "text": "Flip a coin until you get tails. This attack does 30 more damage for each heads."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      236
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/071/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/071/high.webp"
    }
  },
  {
    "id": "me1-72",
    "name": "Makuhita",
    "number": "72",
    "artist": "Jerky",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Hariyama"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Corkscrew Punch",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Confront",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      296
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/072/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/072/high.webp"
    }
  },
  {
    "id": "me1-73",
    "name": "Hariyama",
    "number": "73",
    "artist": "GOSSAN",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "150",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Makuhita",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Heave-Ho Catcher",
        "text": "Once during your turn, when you play this Pokémon from your hand to evolve 1 of your Pokémon, you may use this Ability. Switch in 1 of your opponent's Benched Pokémon to the Active Spot.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Wild Press",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 3,
        "damage": "210",
        "text": "This Pokémon also does 70 damage to itself."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      297
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/073/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/073/high.webp"
    }
  },
  {
    "id": "me1-74",
    "name": "Lunatone",
    "number": "74",
    "artist": "Whisker",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Lunar Cycle",
        "text": "Once during your turn, if you have Solrock in play, you may discard a Basic {F} Energy card from your hand in order to use this Ability. Draw 3 cards. You can't use more than 1 Lunar Cycle Ability each turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Power Gem",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      337
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/074/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/074/high.webp"
    }
  },
  {
    "id": "me1-75",
    "name": "Solrock",
    "number": "75",
    "artist": "Whisker",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Cosmic Beam",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "70",
        "text": "If you don't have Lunatone on your Bench, this attack does nothing. This attack's damage isn't affected by Weakness or Resistance."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      338
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/075/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/075/high.webp"
    }
  },
  {
    "id": "me1-76",
    "name": "Riolu",
    "number": "76",
    "artist": "hncl",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Lucario"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Accelerating Stab",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your next turn, this Pokémon can't use Accelerating Stab."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      447
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/076/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/076/high.webp"
    }
  },
  {
    "id": "me1-77",
    "name": "Mega Lucario ex",
    "number": "77",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Riolu",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Aura Jab",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "130",
        "text": "Attach up to 3 Basic {F} Energy cards from your discard pile to your Benched Pokémon in any way you like."
      },
      {
        "name": "Mega Brave",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "270",
        "text": "During your next turn, this Pokémon can't use Mega Brave."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      448
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/077/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/077/high.webp"
    }
  },
  {
    "id": "me1-78",
    "name": "Croagunk",
    "number": "78",
    "artist": "matazo",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Toxicroak"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Smack",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      453
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/078/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/078/high.webp"
    }
  },
  {
    "id": "me1-79",
    "name": "Toxicroak",
    "number": "79",
    "artist": "Hasuno",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Croagunk",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Reckless Charge",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "70",
        "text": "This Pokémon also does 20 damage to itself."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      454
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/079/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/079/high.webp"
    }
  },
  {
    "id": "me1-80",
    "name": "Marshadow",
    "number": "80",
    "artist": "Tomomi Ozaki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shadowy Side Kick",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "If your opponent's Pokémon is Knocked Out by damage from this attack, during your opponent's next turn, prevent all damage from and effects of attacks done to this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      802
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/080/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/080/high.webp"
    }
  },
  {
    "id": "me1-81",
    "name": "Stonjourner",
    "number": "81",
    "artist": "Hitoshi Ariga",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "130",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stony Kick",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "This attack also does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Boundless Power",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "140",
        "text": "During your next turn, this Pokémon can't use attacks."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      874
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/081/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/081/high.webp"
    }
  },
  {
    "id": "me1-82",
    "name": "Nacli",
    "number": "82",
    "artist": "sowsow",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ram",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      932
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/082/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/082/high.webp"
    }
  },
  {
    "id": "me1-83",
    "name": "Naclstack",
    "number": "83",
    "artist": "kodama",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Nacli",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rock Hurl",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "This attack's damage isn't affected by Resistance."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      933
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/083/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/083/high.webp"
    }
  },
  {
    "id": "me1-84",
    "name": "Garganacl",
    "number": "84",
    "artist": "danciao",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Naclstack",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Powerful a-Salt",
        "text": "Attacks used by your {F} Pokémon do 30 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hammer In",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      934
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/084/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/084/high.webp"
    }
  },
  {
    "id": "me1-85",
    "name": "Crawdaunt",
    "number": "85",
    "artist": "kawayoo",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Corphish",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Vise Grip",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Cutting Riposte",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "If this Pokémon has any damage counters on it, this attack can be used for {D}."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      342
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/085/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/085/high.webp"
    }
  },
  {
    "id": "me1-86",
    "name": "Mega Absol ex",
    "number": "86",
    "artist": "aky CG Works",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Terminal Period",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "If your opponent's Active Pokémon has exactly 6 damage counters on it, that Pokémon is Knocked Out."
      },
      {
        "name": "Claw of Darkness",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "Your opponent reveals their hand, and you discard a card you find there."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      359
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/086/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/086/high.webp"
    }
  },
  {
    "id": "me1-87",
    "name": "Spiritomb",
    "number": "87",
    "artist": "mingo",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Spiteful Swirl",
        "text": "If your Active {D} Pokémon is damaged by an attack from your opponent's Pokémon (even if your Active {D} Pokémon is Knocked Out), place 1 damage counter on the Attacking Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Mountain Breaker",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Discard the top card of your opponent's deck."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      442
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/087/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/087/high.webp"
    }
  },
  {
    "id": "me1-88",
    "name": "Yveltal",
    "number": "88",
    "artist": "akagi",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Clutch",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
      },
      {
        "name": "Dark Feather",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      717
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/088/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/088/high.webp"
    }
  },
  {
    "id": "me1-89",
    "name": "Nickit",
    "number": "89",
    "artist": "Souichirou Gunjima",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Thievul"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Darkness Fang",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      827
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/089/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/089/high.webp"
    }
  },
  {
    "id": "me1-90",
    "name": "Thievul",
    "number": "90",
    "artist": "ryoma uratsuka",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Nickit",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Greedy Hunt",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "You may draw cards until you have 6 cards in your hand."
      },
      {
        "name": "Pitch-Black Fangs",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      828
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/090/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/090/high.webp"
    }
  },
  {
    "id": "me1-91",
    "name": "Shroodle",
    "number": "91",
    "artist": "osare",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Jab",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Your opponent's Active Pokémon is now Poisoned."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      944
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/091/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/091/high.webp"
    }
  },
  {
    "id": "me1-92",
    "name": "Grafaiai",
    "number": "92",
    "artist": "Dsuke",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Shroodle",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Miraculous Paint",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90",
        "text": "Flip a coin. If heads, choose a Special Condition. Your opponent's Active Pokémon is now affected by that Special Condition."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      945
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/092/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/092/high.webp"
    }
  },
  {
    "id": "me1-93",
    "name": "Steelix",
    "number": "93",
    "artist": "Anesaki Dynamic",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "200",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Onix",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Welcoming Tail",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40+",
        "text": "If you have exactly 6 Prize cards remaining, this attack does 200 more damage."
      },
      {
        "name": "Skull Bash",
        "cost": [
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "140",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Grass",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      208
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/093/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/093/high.webp"
    }
  },
  {
    "id": "me1-94",
    "name": "Mega Mawile ex",
    "number": "94",
    "artist": "aky CG Works",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "270",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Gobble Down",
        "cost": [
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "80×",
        "text": "This attack does 80 damage for each Prize card you have taken."
      },
      {
        "name": "Huge Bite",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "260",
        "text": "If your opponent's Active Pokémon already has any damage counters on it, this attack's base damage is 30."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Grass",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      303
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/094/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/094/high.webp"
    }
  },
  {
    "id": "me1-95",
    "name": "Dialga",
    "number": "95",
    "artist": "Teeziro",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "140",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Beam",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Chrono Burst",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "You may shuffle all Energy attached to this Pokémon into your deck and have this attack do 80 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Grass",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      483
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/095/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/095/high.webp"
    }
  },
  {
    "id": "me1-96",
    "name": "Tinkatink",
    "number": "96",
    "artist": "You Iribi",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Beat",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Grass",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      957
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/096/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/096/high.webp"
    }
  },
  {
    "id": "me1-97",
    "name": "Tinkatuff",
    "number": "97",
    "artist": "KEIICHIRO ITO",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Tinkatink",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Haphazard Hammer",
        "text": "Once during your turn, when you play this Pokémon from your hand to evolve 1 of your Pokémon, you may use this Ability. Flip a coin. If heads, discard an Energy from your opponent's Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Light Punch",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Grass",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      958
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/097/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/097/high.webp"
    }
  },
  {
    "id": "me1-98",
    "name": "Tinkaton",
    "number": "98",
    "artist": "toriyufu",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Tinkatuff",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Windup Swing",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "240-",
        "text": "This attack does 60 less damage for each Energy attached to your opponent's Active Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Grass",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      959
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/098/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/098/high.webp"
    }
  },
  {
    "id": "me1-99",
    "name": "Gholdengo",
    "number": "99",
    "artist": "Yukihiro Tada",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Gimmighoul",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "All-You-Can-Grab",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin until you get tails. Search your deck for a number of cards up to the number of heads and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Speed Attack",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Grass",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      1000
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/099/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/099/high.webp"
    }
  },
  {
    "id": "me1-100",
    "name": "Mega Latias ex",
    "number": "100",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Strafe",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "You may switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Illusory Impulse",
        "cost": [
          "Fire",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "300",
        "text": "Discard all Energy from this Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      380
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/100/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/100/high.webp"
    }
  },
  {
    "id": "me1-101",
    "name": "Latios",
    "number": "101",
    "artist": "Uninori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "130",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Lustrous Assist",
        "text": "Once during your turn, when your Mega Latias ex moves from your Bench to the Active Spot, you may use this Ability. Move any amount of Energy from your Benched Pokémon to your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dragon Claw",
        "cost": [
          "Water",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": ""
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      381
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/101/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/101/high.webp"
    }
  },
  {
    "id": "me1-102",
    "name": "Spearow",
    "number": "102",
    "artist": "Scav",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Fearow"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pluck",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Before doing damage, discard all Pokémon Tools from your opponent's Active Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      21
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/102/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/102/high.webp"
    }
  },
  {
    "id": "me1-103",
    "name": "Fearow",
    "number": "103",
    "artist": "Saboteri",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Spearow",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Repeating Drill",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30×",
        "text": "Flip 5 coins. This attack does 30 damage for each heads."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      22
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/103/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/103/high.webp"
    }
  },
  {
    "id": "me1-104",
    "name": "Mega Kangaskhan ex",
    "number": "104",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "300",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Run Errand",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may use this Ability. Draw 2 cards. You can't use more than 1 Run Errand Ability each turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rapid-Fire Combo",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200+",
        "text": "Flip a coin until you get tails. This attack does 50 more damage for each heads."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      115
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/104/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/104/high.webp"
    }
  },
  {
    "id": "me1-105",
    "name": "Delibird",
    "number": "105",
    "artist": "Naoyo Kimura",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Quick Gift",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If you go first, you can use this attack during your first turn. Search your deck for a card and put it into your hand. Then, shuffle your deck."
      },
      {
        "name": "Gentle Slap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      225
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/105/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/105/high.webp"
    }
  },
  {
    "id": "me1-106",
    "name": "Miltank",
    "number": "106",
    "artist": "Kouki Saitou",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bellyful of Milk",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip 2 coins. If both of them are heads, heal all damage from 1 of your Pokémon."
      },
      {
        "name": "Tackle",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      241
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/106/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/106/high.webp"
    }
  },
  {
    "id": "me1-107",
    "name": "Buneary",
    "number": "107",
    "artist": "ryoma uratsuka",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Lopunny"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Charm",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, attacks used by the Defending Pokémon do 20 less damage (before applying Weakness and Resistance)."
      },
      {
        "name": "Skip",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      427
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/107/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/107/high.webp"
    }
  },
  {
    "id": "me1-108",
    "name": "Lopunny",
    "number": "108",
    "artist": "Oswaldo KATO",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Buneary",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dashing Kick",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 50 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Spiral Kick",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      428
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/108/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/108/high.webp"
    }
  },
  {
    "id": "me1-109",
    "name": "Yungoos",
    "number": "109",
    "artist": "Mékayu",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Gumshoos"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Collect",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card."
      },
      {
        "name": "Gnaw",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      734
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/109/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/109/high.webp"
    }
  },
  {
    "id": "me1-110",
    "name": "Gumshoos",
    "number": "110",
    "artist": "Shigenori Negishi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Yungoos",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Evidence Gathering",
        "text": "Once during your turn, you may use this Ability. Switch a card from your hand with the top card of your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Bite",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      735
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/110/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/110/high.webp"
    }
  },
  {
    "id": "me1-111",
    "name": "Stufful",
    "number": "111",
    "artist": "Shibuzoh.",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Bewear"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Light Punch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Flop",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      759
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/111/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/111/high.webp"
    }
  },
  {
    "id": "me1-112",
    "name": "Bewear",
    "number": "112",
    "artist": "HYOGONOSUKE",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Stufful",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Knuckle Punch",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Hyper Lariat",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100+",
        "text": "Flip 2 coins. If both of them are heads, this attack does 100 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      760
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/112/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/112/high.webp"
    }
  },
  {
    "id": "me1-113",
    "name": "Acerola's Mischief",
    "number": "113",
    "artist": "Yuu Nishida",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can use this card only if your opponent has 2 or fewer Prize cards remaining.  Choose 1 of your Pokémon in play. During your opponent's next turn, prevent all damage from and effects of attacks done to that Pokémon by your opponent's Pokémon ex.",
      "You may play only 1 Supporter card during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/113/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/113/high.webp"
    }
  },
  {
    "id": "me1-114",
    "name": "Boss's Orders",
    "number": "114",
    "artist": "NC Empire",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Switch in 1 of your opponent's Benched Pokémon to the Active Spot.",
      "You may play only 1 Supporter card during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/114/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/114/high.webp"
    }
  },
  {
    "id": "me1-115",
    "name": "Energy Switch",
    "number": "115",
    "artist": "Studio Bora Inc.",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Move a Basic Energy from 1 of your Pokémon to another of your Pokémon.",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/115/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/115/high.webp"
    }
  },
  {
    "id": "me1-116",
    "name": "Fighting Gong",
    "number": "116",
    "artist": "Toyste Beach",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Search your deck for a Basic Fighting Energy card or a Basic Fighting Pokémon, reveal it, and put it into your hand. Then, shuffle your deck.",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/116/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/116/high.webp"
    }
  },
  {
    "id": "me1-117",
    "name": "Forest of Vitality",
    "number": "117",
    "artist": "AYUMI ODASHIMA",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Stadium"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Each player's Grass Pokémon can evolve into Grass Pokémon during the turn they play those Pokémon, except during their first turn.",
      "You may play only 1 Stadium card during your turn. Put it next to the Active Spot, and discard it if another Stadium comes into play. A Stadium with the same name can't be played."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/117/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/117/high.webp"
    }
  },
  {
    "id": "me1-118",
    "name": "Iron Defender",
    "number": "118",
    "artist": "Studio Bora Inc.",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "During your opponent's next turn, all of your Metal Pokémon take 30 less damage from attacks from your opponent's Pokémon (after applying Weakness and Resistance). (This includes new Pokémon that come into play.)",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/118/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/118/high.webp"
    }
  },
  {
    "id": "me1-119",
    "name": "Lillie's Determination",
    "number": "119",
    "artist": "Atsushi Furusawa",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Shuffle your hand into your deck. Then, draw 6 cards. If you have exactly 6 Prize cards remaining, draw 8 cards instead.",
      "You may play only 1 Supporter card during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/119/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/119/high.webp"
    }
  },
  {
    "id": "me1-120",
    "name": "Lt. Surge's Bargain",
    "number": "120",
    "artist": "Hideki Ishikawa",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Ask your opponent if each player may take a Prize card. If yes, each player takes a Prize card. If no, you draw 4 cards.",
      "You may play only 1 Supporter card during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/120/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/120/high.webp"
    }
  },
  {
    "id": "me1-121",
    "name": "Mega Signal",
    "number": "121",
    "artist": "inose yukie",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Search your deck for a Mega Evolution Pokémon ex, reveal it, and put it into your hand. Then, shuffle your deck.",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/121/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/121/high.webp"
    }
  },
  {
    "id": "me1-122",
    "name": "Mystery Garden",
    "number": "122",
    "artist": "AYUMI ODASHIMA",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Stadium"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Once during each player's turn, that player may discard an Energy card from their hand in order to draw cards until they have as many cards in their hand as they have Psychic Pokémon in play.",
      "You may play only 1 Stadium card during your turn. Put it next to the Active Spot, and discard it if another Stadium comes into play. A Stadium with the same name can't be played."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/122/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/122/high.webp"
    }
  },
  {
    "id": "me1-123",
    "name": "Pokémon Center Lady",
    "number": "123",
    "artist": "Tomowaka",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Heal 60 damage from 1 of your Pokémon, and it recovers from all Special Conditions.",
      "You may play only 1 Supporter card during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/123/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/123/high.webp"
    }
  },
  {
    "id": "me1-124",
    "name": "Premium Power Pro",
    "number": "124",
    "artist": "Toyste Beach",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "During this turn, attacks used by your Fighting Pokémon do 30 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/124/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/124/high.webp"
    }
  },
  {
    "id": "me1-125",
    "name": "Rare Candy",
    "number": "125",
    "artist": "Studio Bora Inc.",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Choose 1 of your Basic Pokémon in play. If you have a Stage 2 card in your hand that evolves from that Pokémon, put that card onto the Basic Pokémon to evolve it, skipping the Stage 1. You can't use this card during your first turn or on a Basic Pokémon that was put into play this turn.",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/125/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/125/high.webp"
    }
  },
  {
    "id": "me1-126",
    "name": "Repel",
    "number": "126",
    "artist": "Studio Bora Inc.",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Switch out your opponent's Active Pokémon to the Bench. (Your opponent chooses the new Active Pokémon.)",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/126/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/126/high.webp"
    }
  },
  {
    "id": "me1-127",
    "name": "Risky Ruins",
    "number": "127",
    "artist": "imoniii",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Stadium"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Whenever any player puts a Basic non-Darkness Pokémon onto their Bench during their turn, place 2 damage counters on that Pokémon.",
      "You may play only 1 Stadium card during your turn. Put it next to the Active Spot, and discard it if another Stadium comes into play. A Stadium with the same name can't be played."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/127/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/127/high.webp"
    }
  },
  {
    "id": "me1-128",
    "name": "Strange Timepiece",
    "number": "128",
    "artist": "Toyste Beach",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Devolve 1 of your evolved Psychic Pokémon by putting any number of Evolution cards on it into your hand. (That Pokémon can't evolve this turn.)",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/128/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/128/high.webp"
    }
  },
  {
    "id": "me1-129",
    "name": "Surfing Beach",
    "number": "129",
    "artist": "AYUMI ODASHIMA",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Stadium"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Once during each player's turn, that player may switch their Active Water Pokémon with 1 of their Benched Water Pokémon.",
      "You may play only 1 Stadium card during your turn. Put it next to the Active Spot, and discard it if another Stadium comes into play. A Stadium with the same name can't be played."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/129/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/129/high.webp"
    }
  },
  {
    "id": "me1-130",
    "name": "Switch",
    "number": "130",
    "artist": "Studio Bora Inc.",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Switch your Active Pokémon with 1 of your Benched Pokémon.",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/130/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/130/high.webp"
    }
  },
  {
    "id": "me1-131",
    "name": "Ultra Ball",
    "number": "131",
    "artist": "Ayaka Yoshida",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can use this card only if you discard 2 other cards from your hand.  Search your deck for a Pokémon, reveal it, and put it into your hand. Then, shuffle your deck.",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/131/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/131/high.webp"
    }
  },
  {
    "id": "me1-132",
    "name": "Wally's Compassion",
    "number": "132",
    "artist": "Iori Suzuki",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Heal all damage from 1 of your Mega Evolution Pokémon ex. If you healed any damage in this way, put all Energy attached to that Pokémon into your hand.",
      "You may play only 1 Supporter card during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/132/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/132/high.webp"
    }
  },
  {
    "id": "me1-133",
    "name": "Bulbasaur",
    "number": "133",
    "artist": "mashu",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Ivysaur"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bind Down",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      1
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/133/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/133/high.webp"
    }
  },
  {
    "id": "me1-134",
    "name": "Ivysaur",
    "number": "134",
    "artist": "mashu",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Bulbasaur",
    "evolvesTo": [
      "Venusaur"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Razor Leaf",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      2
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/134/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/134/high.webp"
    }
  },
  {
    "id": "me1-135",
    "name": "Exeggutor",
    "number": "135",
    "artist": "Yukihiro Tada",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Exeggcute",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Guard Press",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Stomping Wood",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "This attack does 30 more damage for each {G} Energy attached to this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      103
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/135/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/135/high.webp"
    }
  },
  {
    "id": "me1-136",
    "name": "Shuckle",
    "number": "136",
    "artist": "OKUBO",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fermented Juice",
        "text": "Once during your turn, if this Pokémon has any {G} Energy attached, you may use this Ability. Heal 30 damage from 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rollout",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      213
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/136/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/136/high.webp"
    }
  },
  {
    "id": "me1-137",
    "name": "Ninjask",
    "number": "137",
    "artist": "Tetsu Kayama",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Nincada",
    "evolvesTo": [
      "Shedinja"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Cast-Off Shell",
        "text": "Once during your turn, when you play this Pokémon from your hand to evolve 1 of your Pokémon, you may use this Ability. Search your deck for a Shedinja and put it onto your Bench. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "U-turn",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      291
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/137/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/137/high.webp"
    }
  },
  {
    "id": "me1-138",
    "name": "Vulpix",
    "number": "138",
    "artist": "saino misaki",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Ninetales"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stampede",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Combustion",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      37
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/138/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/138/high.webp"
    }
  },
  {
    "id": "me1-139",
    "name": "Litleo",
    "number": "139",
    "artist": "Teeziro",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Pyroar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flare",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      667
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/139/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/139/high.webp"
    }
  },
  {
    "id": "me1-140",
    "name": "Snover",
    "number": "140",
    "artist": "Nurikabe",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Abomasnow"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Beat",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Icy Snow",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      459
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/140/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/140/high.webp"
    }
  },
  {
    "id": "me1-141",
    "name": "Clawitzer",
    "number": "141",
    "artist": "Mori Yuu",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Clauncher",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fall Back to Reload",
        "text": "Once during your turn, when this Pokémon moves from the Active Spot to your Bench, you may use this Ability. Attach up to 2 Basic {W} Energy cards from your hand to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Aqua Launcher",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "210",
        "text": "Discard all Energy from this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      693
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/141/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/141/high.webp"
    }
  },
  {
    "id": "me1-142",
    "name": "Inteleon",
    "number": "142",
    "artist": "Ligton",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Drizzile",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bring Down",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose a Pokémon in play (yours or your opponent's) that has the least HP remaining, except for this Pokémon, and it is Knocked Out."
      },
      {
        "name": "Water Shot",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "110",
        "text": "Discard an Energy from this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      818
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/142/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/142/high.webp"
    }
  },
  {
    "id": "me1-143",
    "name": "Helioptile",
    "number": "143",
    "artist": "Akira Komayama",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Heliolisk"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Scratch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 2 coins. This attack does 10 damage for each heads."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      694
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/143/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/143/high.webp"
    }
  },
  {
    "id": "me1-144",
    "name": "Shedinja",
    "number": "144",
    "artist": "Tetsu Kayama",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Nincada",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fragile Husk",
        "text": "If this Pokémon is Knocked Out by damage from an attack from your opponent's Pokémon ex, your opponent can't take any Prize cards for it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Damage Beat",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "This attack does 20 damage for each damage counter on your opponent's Active Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      292
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/144/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/144/high.webp"
    }
  },
  {
    "id": "me1-145",
    "name": "Houndstone",
    "number": "145",
    "artist": "Arai Kiriko",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Greavard",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Horrifying Bite",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin until you get tails. For each heads, choose a random card from your opponent's hand. Your opponent reveals those cards and shuffles them into their deck."
      },
      {
        "name": "Hammer In",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      972
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/145/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/145/high.webp"
    }
  },
  {
    "id": "me1-146",
    "name": "Marshadow",
    "number": "146",
    "artist": "0313",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shadowy Side Kick",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "If your opponent's Pokémon is Knocked Out by damage from this attack, during your opponent's next turn, prevent all damage from and effects of attacks done to this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      802
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/146/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/146/high.webp"
    }
  },
  {
    "id": "me1-147",
    "name": "Garganacl",
    "number": "147",
    "artist": "Yano Keiji",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Naclstack",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Powerful a-Salt",
        "text": "Attacks used by your {F} Pokémon do 30 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hammer In",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      934
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/147/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/147/high.webp"
    }
  },
  {
    "id": "me1-148",
    "name": "Spiritomb",
    "number": "148",
    "artist": "IKEDA Saki",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Spiteful Swirl",
        "text": "If your Active {D} Pokémon is damaged by an attack from your opponent's Pokémon (even if your Active {D} Pokémon is Knocked Out), place 1 damage counter on the Attacking Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Mountain Breaker",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Discard the top card of your opponent's deck."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      442
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/148/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/148/high.webp"
    }
  },
  {
    "id": "me1-149",
    "name": "Shroodle",
    "number": "149",
    "artist": "Shimaris Yukichi",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Jab",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Your opponent's Active Pokémon is now Poisoned."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      944
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/149/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/149/high.webp"
    }
  },
  {
    "id": "me1-150",
    "name": "Steelix",
    "number": "150",
    "artist": "Tonji Matsuno",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "200",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Onix",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Welcoming Tail",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40+",
        "text": "If you have exactly 6 Prize cards remaining, this attack does 200 more damage."
      },
      {
        "name": "Skull Bash",
        "cost": [
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "140",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Grass",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      208
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/150/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/150/high.webp"
    }
  },
  {
    "id": "me1-151",
    "name": "Spearow",
    "number": "151",
    "artist": "MINAMINAMI Take",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Fearow"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pluck",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Before doing damage, discard all Pokémon Tools from your opponent's Active Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      21
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/151/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/151/high.webp"
    }
  },
  {
    "id": "me1-152",
    "name": "Delibird",
    "number": "152",
    "artist": "Takeshi Nakamura",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Quick Gift",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If you go first, you can use this attack during your first turn. Search your deck for a card and put it into your hand. Then, shuffle your deck."
      },
      {
        "name": "Gentle Slap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      225
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/152/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/152/high.webp"
    }
  },
  {
    "id": "me1-153",
    "name": "Gumshoos",
    "number": "153",
    "artist": "Mina Nakai",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Yungoos",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Evidence Gathering",
        "text": "Once during your turn, you may use this Ability. Switch a card from your hand with the top card of your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Bite",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      735
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/153/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/153/high.webp"
    }
  },
  {
    "id": "me1-154",
    "name": "Stufful",
    "number": "154",
    "artist": "OKACHEKE",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Bewear"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Light Punch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Flop",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      759
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/154/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/154/high.webp"
    }
  },
  {
    "id": "me1-155",
    "name": "Mega Venusaur ex",
    "number": "155",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "380",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Ivysaur",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Solar Transfer",
        "text": "As often as you like during your turn, you may use this Ability. Move a Basic {G} Energy from 1 of your Pokémon to another of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Jungle Dump",
        "cost": [
          "Grass",
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 4,
        "damage": "240",
        "text": "Heal 30 damage from this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      3
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/155/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/155/high.webp"
    }
  },
  {
    "id": "me1-156",
    "name": "Mega Camerupt ex",
    "number": "156",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Numel",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Roasting Heat",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "80+",
        "text": "If your opponent's Active Pokémon is Burned, this attack does 160 more damage."
      },
      {
        "name": "Volcanic Meteor",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "280",
        "text": "Discard 2 Energy from this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      323
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/156/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/156/high.webp"
    }
  },
  {
    "id": "me1-157",
    "name": "Mega Abomasnow ex",
    "number": "157",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "350",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Snover",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Hammer-lanche",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "100×",
        "text": "Discard the top 6 cards of your deck, and this attack does 100 damage for each Basic {W} Energy card that you discarded in this way."
      },
      {
        "name": "Frost Barrier",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      460
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/157/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/157/high.webp"
    }
  },
  {
    "id": "me1-158",
    "name": "Mega Manectric ex",
    "number": "158",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Electrike",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Flash Ray",
        "cost": [
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "During your opponent's next turn, prevent all damage done to this Pokémon by attacks from Basic Pokémon."
      },
      {
        "name": "Riotous Blasting",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "200+",
        "text": "You may discard all Energy from this Pokémon and have this attack do 130 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      310
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/158/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/158/high.webp"
    }
  },
  {
    "id": "me1-159",
    "name": "Mega Gardevoir ex",
    "number": "159",
    "artist": "takuyoa",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "360",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Kirlia",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Overflowing Wishes",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "For each of your Benched Pokémon, search your deck for a Basic {P} Energy card and attach it to that Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Mega Symphonia",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "This attack does 50 damage for each {P} Energy attached to all of your Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      282
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/159/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/159/high.webp"
    }
  },
  {
    "id": "me1-160",
    "name": "Mega Lucario ex",
    "number": "160",
    "artist": "takuyoa",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Riolu",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Aura Jab",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "130",
        "text": "Attach up to 3 Basic {F} Energy cards from your discard pile to your Benched Pokémon in any way you like."
      },
      {
        "name": "Mega Brave",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "270",
        "text": "During your next turn, this Pokémon can't use Mega Brave."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      448
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/160/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/160/high.webp"
    }
  },
  {
    "id": "me1-161",
    "name": "Mega Absol ex",
    "number": "161",
    "artist": "aky CG Works",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Terminal Period",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "If your opponent's Active Pokémon has exactly 6 damage counters on it, that Pokémon is Knocked Out."
      },
      {
        "name": "Claw of Darkness",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "Your opponent reveals their hand, and you discard a card you find there."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      359
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/161/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/161/high.webp"
    }
  },
  {
    "id": "me1-162",
    "name": "Mega Mawile ex",
    "number": "162",
    "artist": "aky CG Works",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "270",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Gobble Down",
        "cost": [
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "80×",
        "text": "This attack does 80 damage for each Prize card you have taken."
      },
      {
        "name": "Huge Bite",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "260",
        "text": "If your opponent's Active Pokémon already has any damage counters on it, this attack's base damage is 30."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Grass",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      303
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/162/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/162/high.webp"
    }
  },
  {
    "id": "me1-163",
    "name": "Mega Latias ex",
    "number": "163",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Strafe",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "You may switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Illusory Impulse",
        "cost": [
          "Fire",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "300",
        "text": "Discard all Energy from this Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      380
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/163/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/163/high.webp"
    }
  },
  {
    "id": "me1-164",
    "name": "Mega Kangaskhan ex",
    "number": "164",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "300",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Run Errand",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may use this Ability. Draw 2 cards. You can't use more than 1 Run Errand Ability each turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rapid-Fire Combo",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200+",
        "text": "Flip a coin until you get tails. This attack does 50 more damage for each heads."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      115
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/164/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/164/high.webp"
    }
  },
  {
    "id": "me1-165",
    "name": "Acerola's Mischief",
    "number": "165",
    "artist": "Yuu Nishida",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can use this card only if your opponent has 2 or fewer Prize cards remaining.  Choose 1 of your Pokémon in play. During your opponent's next turn, prevent all damage from and effects of attacks done to that Pokémon by your opponent's Pokémon ex.",
      "You may play only 1 Supporter card during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/165/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/165/high.webp"
    }
  },
  {
    "id": "me1-166",
    "name": "Air Balloon",
    "number": "166",
    "artist": "Studio Bora Inc.",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "The Retreat Cost of the Pokémon this card is attached to is ColorlessColorless less.",
      "You may attach any number of Pokémon Tools to your Pokémon during your turn. You may attach only 1 Pokémon Tool to each Pokémon, and it stays attached."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/166/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/166/high.webp"
    }
  },
  {
    "id": "me1-167",
    "name": "Buddy-Buddy Poffin",
    "number": "167",
    "artist": "AYUMI ODASHIMA",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Search your deck for up to 2 Basic Pokémon with 70 HP or less and put them onto your Bench. Then, shuffle your deck.",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/167/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/167/high.webp"
    }
  },
  {
    "id": "me1-168",
    "name": "Fighting Gong",
    "number": "168",
    "artist": "Toyste Beach",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Search your deck for a Basic Fighting Energy card or a Basic Fighting Pokémon, reveal it, and put it into your hand. Then, shuffle your deck.",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/168/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/168/high.webp"
    }
  },
  {
    "id": "me1-169",
    "name": "Lillie's Determination",
    "number": "169",
    "artist": "Atsushi Furusawa",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Shuffle your hand into your deck. Then, draw 6 cards. If you have exactly 6 Prize cards remaining, draw 8 cards instead.",
      "You may play only 1 Supporter card during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/169/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/169/high.webp"
    }
  },
  {
    "id": "me1-170",
    "name": "Lt. Surge's Bargain",
    "number": "170",
    "artist": "Hideki Ishikawa",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Ask your opponent if each player may take a Prize card. If yes, each player takes a Prize card. If no, you draw 4 cards.",
      "You may play only 1 Supporter card during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/170/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/170/high.webp"
    }
  },
  {
    "id": "me1-171",
    "name": "Mega Signal",
    "number": "171",
    "artist": "inose yukie",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Search your deck for a Mega Evolution Pokémon ex, reveal it, and put it into your hand. Then, shuffle your deck.",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/171/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/171/high.webp"
    }
  },
  {
    "id": "me1-172",
    "name": "Mystery Garden",
    "number": "172",
    "artist": "AYUMI ODASHIMA",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Stadium"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Once during each player's turn, that player may discard an Energy card from their hand in order to draw cards until they have as many cards in their hand as they have Psychic Pokémon in play.",
      "You may play only 1 Stadium card during your turn. Put it next to the Active Spot, and discard it if another Stadium comes into play. A Stadium with the same name can't be played."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/172/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/172/high.webp"
    }
  },
  {
    "id": "me1-173",
    "name": "Night Stretcher",
    "number": "173",
    "artist": "Toyste Beach",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Put a Pokémon or a Basic Energy card from your discard pile into your hand.",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/173/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/173/high.webp"
    }
  },
  {
    "id": "me1-174",
    "name": "Premium Power Pro",
    "number": "174",
    "artist": "Toyste Beach",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "During this turn, attacks used by your Fighting Pokémon do 30 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/174/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/174/high.webp"
    }
  },
  {
    "id": "me1-175",
    "name": "Rare Candy",
    "number": "175",
    "artist": "Studio Bora Inc.",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Choose 1 of your Basic Pokémon in play. If you have a Stage 2 card in your hand that evolves from that Pokémon, put that card onto the Basic Pokémon to evolve it, skipping the Stage 1. You can't use this card during your first turn or on a Basic Pokémon that was put into play this turn.",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/175/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/175/high.webp"
    }
  },
  {
    "id": "me1-176",
    "name": "Wally's Compassion",
    "number": "176",
    "artist": "Iori Suzuki",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Heal all damage from 1 of your Mega Evolution Pokémon ex. If you healed any damage in this way, put all Energy attached to that Pokémon into your hand.",
      "You may play only 1 Supporter card during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/176/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/176/high.webp"
    }
  },
  {
    "id": "me1-177",
    "name": "Mega Venusaur ex",
    "number": "177",
    "artist": "mashu",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "380",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Ivysaur",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Solar Transfer",
        "text": "As often as you like during your turn, you may use this Ability. Move a Basic {G} Energy from 1 of your Pokémon to another of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Jungle Dump",
        "cost": [
          "Grass",
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 4,
        "damage": "240",
        "text": "Heal 30 damage from this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      3
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/177/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/177/high.webp"
    }
  },
  {
    "id": "me1-178",
    "name": "Mega Gardevoir ex",
    "number": "178",
    "artist": "Raita Kazama",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "360",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Kirlia",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Overflowing Wishes",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "For each of your Benched Pokémon, search your deck for a Basic {P} Energy card and attach it to that Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Mega Symphonia",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "This attack does 50 damage for each {P} Energy attached to all of your Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      282
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/178/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/178/high.webp"
    }
  },
  {
    "id": "me1-179",
    "name": "Mega Lucario ex",
    "number": "179",
    "artist": "Atsushi Furusawa",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Riolu",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Aura Jab",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "130",
        "text": "Attach up to 3 Basic {F} Energy cards from your discard pile to your Benched Pokémon in any way you like."
      },
      {
        "name": "Mega Brave",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "270",
        "text": "During your next turn, this Pokémon can't use Mega Brave."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      448
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/179/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/179/high.webp"
    }
  },
  {
    "id": "me1-180",
    "name": "Mega Absol ex",
    "number": "180",
    "artist": "Mitsuhiro Arita",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Terminal Period",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "If your opponent's Active Pokémon has exactly 6 damage counters on it, that Pokémon is Knocked Out."
      },
      {
        "name": "Claw of Darkness",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "Your opponent reveals their hand, and you discard a card you find there."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      359
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/180/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/180/high.webp"
    }
  },
  {
    "id": "me1-181",
    "name": "Mega Latias ex",
    "number": "181",
    "artist": "AKIRA EGAWA",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Strafe",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "You may switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Illusory Impulse",
        "cost": [
          "Fire",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "300",
        "text": "Discard all Energy from this Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      380
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/181/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/181/high.webp"
    }
  },
  {
    "id": "me1-182",
    "name": "Mega Kangaskhan ex",
    "number": "182",
    "artist": "GOTO minori",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "300",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Run Errand",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may use this Ability. Draw 2 cards. You can't use more than 1 Run Errand Ability each turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rapid-Fire Combo",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200+",
        "text": "Flip a coin until you get tails. This attack does 50 more damage for each heads."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      115
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/182/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/182/high.webp"
    }
  },
  {
    "id": "me1-183",
    "name": "Acerola's Mischief",
    "number": "183",
    "artist": "sui",
    "rarity": "Special Illustration Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can use this card only if your opponent has 2 or fewer Prize cards remaining.  Choose 1 of your Pokémon in play. During your opponent's next turn, prevent all damage from and effects of attacks done to that Pokémon by your opponent's Pokémon ex.",
      "You may play only 1 Supporter card during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/183/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/183/high.webp"
    }
  },
  {
    "id": "me1-184",
    "name": "Lillie's Determination",
    "number": "184",
    "artist": "satoma",
    "rarity": "Special Illustration Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Shuffle your hand into your deck. Then, draw 6 cards. If you have exactly 6 Prize cards remaining, draw 8 cards instead.",
      "You may play only 1 Supporter card during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/184/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/184/high.webp"
    }
  },
  {
    "id": "me1-185",
    "name": "Lt. Surge's Bargain",
    "number": "185",
    "artist": "osare",
    "rarity": "Special Illustration Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Ask your opponent if each player may take a Prize card. If yes, each player takes a Prize card. If no, you draw 4 cards.",
      "You may play only 1 Supporter card during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/185/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/185/high.webp"
    }
  },
  {
    "id": "me1-186",
    "name": "Wally's Compassion",
    "number": "186",
    "artist": "Jiro Sasumo",
    "rarity": "Special Illustration Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Heal all damage from 1 of your Mega Evolution Pokémon ex. If you healed any damage in this way, put all Energy attached to that Pokémon into your hand.",
      "You may play only 1 Supporter card during your turn."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/186/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/186/high.webp"
    }
  },
  {
    "id": "me1-187",
    "name": "Mega Gardevoir ex",
    "number": "187",
    "artist": "5ban Graphics",
    "rarity": "Mega Hyper Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "360",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Kirlia",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Overflowing Wishes",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "For each of your Benched Pokémon, search your deck for a Basic {P} Energy card and attach it to that Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Mega Symphonia",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "This attack does 50 damage for each {P} Energy attached to all of your Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      282
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/187/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/187/high.webp"
    }
  },
  {
    "id": "me1-188",
    "name": "Mega Lucario ex",
    "number": "188",
    "artist": "5ban Graphics",
    "rarity": "Mega Hyper Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Riolu",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Aura Jab",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "130",
        "text": "Attach up to 3 Basic {F} Energy cards from your discard pile to your Benched Pokémon in any way you like."
      },
      {
        "name": "Mega Brave",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "270",
        "text": "During your next turn, this Pokémon can't use Mega Brave."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      448
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/me/me01/188/low.webp",
      "large": "https://assets.tcgdex.net/en/me/me01/188/high.webp"
    }
  }
]

export default cardDetails
