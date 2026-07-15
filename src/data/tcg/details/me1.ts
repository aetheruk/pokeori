import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "me1-1",
    "name": "Bulbasaur",
    "number": "1",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/1.png",
      "large": "https://images.pokemontcg.io/me1/1_hires.png"
    }
  },
  {
    "id": "me1-2",
    "name": "Ivysaur",
    "number": "2",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/2.png",
      "large": "https://images.pokemontcg.io/me1/2_hires.png"
    }
  },
  {
    "id": "me1-3",
    "name": "Mega Venusaur ex",
    "number": "3",
    "artist": null,
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
        "text": "As often as you like during your turn, you may use this Ability. Move a Basic Grass Energy from 1 of your Pokémon to another of your Pokémon.",
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
      "small": "https://images.pokemontcg.io/me1/3.png",
      "large": "https://images.pokemontcg.io/me1/3_hires.png"
    }
  },
  {
    "id": "me1-4",
    "name": "Exeggcute",
    "number": "4",
    "artist": null,
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
        "text": "Search your deck for a Basic Grass Energy card and attach it to this Pokémon. Then, shuffle your deck."
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
      "small": "https://images.pokemontcg.io/me1/4.png",
      "large": "https://images.pokemontcg.io/me1/4_hires.png"
    }
  },
  {
    "id": "me1-5",
    "name": "Exeggutor",
    "number": "5",
    "artist": null,
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
        "text": "This attack does 30 more damage for each Grass Energy attached to this Pokémon."
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
      "small": "https://images.pokemontcg.io/me1/5.png",
      "large": "https://images.pokemontcg.io/me1/5_hires.png"
    }
  },
  {
    "id": "me1-6",
    "name": "Tangela",
    "number": "6",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/6.png",
      "large": "https://images.pokemontcg.io/me1/6_hires.png"
    }
  },
  {
    "id": "me1-7",
    "name": "Tangrowth",
    "number": "7",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/7.png",
      "large": "https://images.pokemontcg.io/me1/7_hires.png"
    }
  },
  {
    "id": "me1-8",
    "name": "Chikorita",
    "number": "8",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/8.png",
      "large": "https://images.pokemontcg.io/me1/8_hires.png"
    }
  },
  {
    "id": "me1-9",
    "name": "Bayleef",
    "number": "9",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/9.png",
      "large": "https://images.pokemontcg.io/me1/9_hires.png"
    }
  },
  {
    "id": "me1-10",
    "name": "Meganium",
    "number": "10",
    "artist": null,
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
        "text": "Each Basic Grass Energy attached to all of your Pokémon provides GrassGrass Energy. The effect of Wild Growth doesn't stack.",
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
      "small": "https://images.pokemontcg.io/me1/10.png",
      "large": "https://images.pokemontcg.io/me1/10_hires.png"
    }
  },
  {
    "id": "me1-11",
    "name": "Shuckle",
    "number": "11",
    "artist": null,
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
        "text": "Once during your turn, if this Pokémon has any Grass Energy attached, you may use this Ability. Heal 30 damage from 1 of your Pokémon.",
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
      "small": "https://images.pokemontcg.io/me1/11.png",
      "large": "https://images.pokemontcg.io/me1/11_hires.png"
    }
  },
  {
    "id": "me1-12",
    "name": "Celebi",
    "number": "12",
    "artist": null,
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
        "text": "Search your deck for up to 3 in any combination of Grass Pokémon and Stadium cards, reveal them, and put them into your hand. Then, shuffle your deck."
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
      "small": "https://images.pokemontcg.io/me1/12.png",
      "large": "https://images.pokemontcg.io/me1/12_hires.png"
    }
  },
  {
    "id": "me1-13",
    "name": "Seedot",
    "number": "13",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/13.png",
      "large": "https://images.pokemontcg.io/me1/13_hires.png"
    }
  },
  {
    "id": "me1-14",
    "name": "Nuzleaf",
    "number": "14",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/14.png",
      "large": "https://images.pokemontcg.io/me1/14_hires.png"
    }
  },
  {
    "id": "me1-15",
    "name": "Shiftry",
    "number": "15",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/15.png",
      "large": "https://images.pokemontcg.io/me1/15_hires.png"
    }
  },
  {
    "id": "me1-16",
    "name": "Nincada",
    "number": "16",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/16.png",
      "large": "https://images.pokemontcg.io/me1/16_hires.png"
    }
  },
  {
    "id": "me1-17",
    "name": "Ninjask",
    "number": "17",
    "artist": null,
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
    "convertedRetreatCost": null,
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
      "small": "https://images.pokemontcg.io/me1/17.png",
      "large": "https://images.pokemontcg.io/me1/17_hires.png"
    }
  },
  {
    "id": "me1-18",
    "name": "Dhelmise",
    "number": "18",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/18.png",
      "large": "https://images.pokemontcg.io/me1/18_hires.png"
    }
  },
  {
    "id": "me1-19",
    "name": "Vulpix",
    "number": "19",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/19.png",
      "large": "https://images.pokemontcg.io/me1/19_hires.png"
    }
  },
  {
    "id": "me1-20",
    "name": "Ninetales",
    "number": "20",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/20.png",
      "large": "https://images.pokemontcg.io/me1/20_hires.png"
    }
  },
  {
    "id": "me1-21",
    "name": "Numel",
    "number": "21",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/21.png",
      "large": "https://images.pokemontcg.io/me1/21_hires.png"
    }
  },
  {
    "id": "me1-22",
    "name": "Mega Camerupt ex",
    "number": "22",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/22.png",
      "large": "https://images.pokemontcg.io/me1/22_hires.png"
    }
  },
  {
    "id": "me1-23",
    "name": "Litleo",
    "number": "23",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/23.png",
      "large": "https://images.pokemontcg.io/me1/23_hires.png"
    }
  },
  {
    "id": "me1-24",
    "name": "Pyroar",
    "number": "24",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/24.png",
      "large": "https://images.pokemontcg.io/me1/24_hires.png"
    }
  },
  {
    "id": "me1-25",
    "name": "Volcanion",
    "number": "25",
    "artist": null,
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
        "text": "Put 2 Fire Energy attached to this Pokémon into your hand."
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
      "small": "https://images.pokemontcg.io/me1/25.png",
      "large": "https://images.pokemontcg.io/me1/25_hires.png"
    }
  },
  {
    "id": "me1-26",
    "name": "Scorbunny",
    "number": "26",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/26.png",
      "large": "https://images.pokemontcg.io/me1/26_hires.png"
    }
  },
  {
    "id": "me1-27",
    "name": "Raboot",
    "number": "27",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/27.png",
      "large": "https://images.pokemontcg.io/me1/27_hires.png"
    }
  },
  {
    "id": "me1-28",
    "name": "Cinderace",
    "number": "28",
    "artist": null,
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
    "convertedRetreatCost": null,
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
      "small": "https://images.pokemontcg.io/me1/28.png",
      "large": "https://images.pokemontcg.io/me1/28_hires.png"
    }
  },
  {
    "id": "me1-29",
    "name": "Sizzlipede",
    "number": "29",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/29.png",
      "large": "https://images.pokemontcg.io/me1/29_hires.png"
    }
  },
  {
    "id": "me1-30",
    "name": "Centiskorch",
    "number": "30",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/30.png",
      "large": "https://images.pokemontcg.io/me1/30_hires.png"
    }
  },
  {
    "id": "me1-31",
    "name": "Chi-Yu",
    "number": "31",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/31.png",
      "large": "https://images.pokemontcg.io/me1/31_hires.png"
    }
  },
  {
    "id": "me1-32",
    "name": "Mantine",
    "number": "32",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/32.png",
      "large": "https://images.pokemontcg.io/me1/32_hires.png"
    }
  },
  {
    "id": "me1-33",
    "name": "Corphish",
    "number": "33",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/33.png",
      "large": "https://images.pokemontcg.io/me1/33_hires.png"
    }
  },
  {
    "id": "me1-34",
    "name": "Kyogre",
    "number": "34",
    "artist": null,
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
        "text": "This attack does 20 damage for each Basic Water Energy card in your discard pile. Then, shuffle those cards into your deck."
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
      "small": "https://images.pokemontcg.io/me1/34.png",
      "large": "https://images.pokemontcg.io/me1/34_hires.png"
    }
  },
  {
    "id": "me1-35",
    "name": "Snover",
    "number": "35",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/35.png",
      "large": "https://images.pokemontcg.io/me1/35_hires.png"
    }
  },
  {
    "id": "me1-36",
    "name": "Mega Abomasnow ex",
    "number": "36",
    "artist": null,
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
        "text": "Discard the top 6 cards of your deck, and this attack does 100 damage for each Basic Water Energy card that you discarded in this way."
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
      "small": "https://images.pokemontcg.io/me1/36.png",
      "large": "https://images.pokemontcg.io/me1/36_hires.png"
    }
  },
  {
    "id": "me1-37",
    "name": "Clauncher",
    "number": "37",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/37.png",
      "large": "https://images.pokemontcg.io/me1/37_hires.png"
    }
  },
  {
    "id": "me1-38",
    "name": "Clawitzer",
    "number": "38",
    "artist": null,
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
        "text": "Once during your turn, when this Pokémon moves from the Active Spot to your Bench, you may use this Ability. Attach up to 2 Basic Water Energy cards from your hand to this Pokémon.",
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
      "small": "https://images.pokemontcg.io/me1/38.png",
      "large": "https://images.pokemontcg.io/me1/38_hires.png"
    }
  },
  {
    "id": "me1-39",
    "name": "Sobble",
    "number": "39",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/39.png",
      "large": "https://images.pokemontcg.io/me1/39_hires.png"
    }
  },
  {
    "id": "me1-40",
    "name": "Drizzile",
    "number": "40",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/40.png",
      "large": "https://images.pokemontcg.io/me1/40_hires.png"
    }
  },
  {
    "id": "me1-41",
    "name": "Inteleon",
    "number": "41",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/41.png",
      "large": "https://images.pokemontcg.io/me1/41_hires.png"
    }
  },
  {
    "id": "me1-42",
    "name": "Snom",
    "number": "42",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/42.png",
      "large": "https://images.pokemontcg.io/me1/42_hires.png"
    }
  },
  {
    "id": "me1-43",
    "name": "Frosmoth",
    "number": "43",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/43.png",
      "large": "https://images.pokemontcg.io/me1/43_hires.png"
    }
  },
  {
    "id": "me1-44",
    "name": "Eiscue",
    "number": "44",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/44.png",
      "large": "https://images.pokemontcg.io/me1/44_hires.png"
    }
  },
  {
    "id": "me1-45",
    "name": "Magnemite",
    "number": "45",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/45.png",
      "large": "https://images.pokemontcg.io/me1/45_hires.png"
    }
  },
  {
    "id": "me1-46",
    "name": "Magneton",
    "number": "46",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/46.png",
      "large": "https://images.pokemontcg.io/me1/46_hires.png"
    }
  },
  {
    "id": "me1-47",
    "name": "Magnezone",
    "number": "47",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/47.png",
      "large": "https://images.pokemontcg.io/me1/47_hires.png"
    }
  },
  {
    "id": "me1-48",
    "name": "Raikou",
    "number": "48",
    "artist": null,
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
        "text": "If you have at least 4 Lightning Energy in play, this attack does 90 more damage."
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
      "small": "https://images.pokemontcg.io/me1/48.png",
      "large": "https://images.pokemontcg.io/me1/48_hires.png"
    }
  },
  {
    "id": "me1-49",
    "name": "Electrike",
    "number": "49",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/49.png",
      "large": "https://images.pokemontcg.io/me1/49_hires.png"
    }
  },
  {
    "id": "me1-50",
    "name": "Mega Manectric ex",
    "number": "50",
    "artist": null,
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
    "convertedRetreatCost": null,
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
      "small": "https://images.pokemontcg.io/me1/50.png",
      "large": "https://images.pokemontcg.io/me1/50_hires.png"
    }
  },
  {
    "id": "me1-51",
    "name": "Pachirisu",
    "number": "51",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/51.png",
      "large": "https://images.pokemontcg.io/me1/51_hires.png"
    }
  },
  {
    "id": "me1-52",
    "name": "Helioptile",
    "number": "52",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/52.png",
      "large": "https://images.pokemontcg.io/me1/52_hires.png"
    }
  },
  {
    "id": "me1-53",
    "name": "Heliolisk",
    "number": "53",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/53.png",
      "large": "https://images.pokemontcg.io/me1/53_hires.png"
    }
  },
  {
    "id": "me1-54",
    "name": "Abra",
    "number": "54",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/54.png",
      "large": "https://images.pokemontcg.io/me1/54_hires.png"
    }
  },
  {
    "id": "me1-55",
    "name": "Kadabra",
    "number": "55",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/55.png",
      "large": "https://images.pokemontcg.io/me1/55_hires.png"
    }
  },
  {
    "id": "me1-56",
    "name": "Alakazam",
    "number": "56",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/56.png",
      "large": "https://images.pokemontcg.io/me1/56_hires.png"
    }
  },
  {
    "id": "me1-57",
    "name": "Jynx",
    "number": "57",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/57.png",
      "large": "https://images.pokemontcg.io/me1/57_hires.png"
    }
  },
  {
    "id": "me1-58",
    "name": "Ralts",
    "number": "58",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/58.png",
      "large": "https://images.pokemontcg.io/me1/58_hires.png"
    }
  },
  {
    "id": "me1-59",
    "name": "Kirlia",
    "number": "59",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/59.png",
      "large": "https://images.pokemontcg.io/me1/59_hires.png"
    }
  },
  {
    "id": "me1-60",
    "name": "Mega Gardevoir ex",
    "number": "60",
    "artist": null,
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
        "text": "For each of your Benched Pokémon, search your deck for a Basic Psychic Energy card and attach it to that Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Mega Symphonia",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "This attack does 50 damage for each Psychic Energy attached to all of your Pokémon."
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
      "small": "https://images.pokemontcg.io/me1/60.png",
      "large": "https://images.pokemontcg.io/me1/60_hires.png"
    }
  },
  {
    "id": "me1-61",
    "name": "Shedinja",
    "number": "61",
    "artist": null,
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
    "convertedRetreatCost": null,
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
      "small": "https://images.pokemontcg.io/me1/61.png",
      "large": "https://images.pokemontcg.io/me1/61_hires.png"
    }
  },
  {
    "id": "me1-62",
    "name": "Spoink",
    "number": "62",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/62.png",
      "large": "https://images.pokemontcg.io/me1/62_hires.png"
    }
  },
  {
    "id": "me1-63",
    "name": "Grumpig",
    "number": "63",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/63.png",
      "large": "https://images.pokemontcg.io/me1/63_hires.png"
    }
  },
  {
    "id": "me1-64",
    "name": "Xerneas",
    "number": "64",
    "artist": null,
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
        "text": "Search your deck for up to 3 Basic Psychic Pokémon and put them onto your Bench. Then, shuffle your deck."
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
      "small": "https://images.pokemontcg.io/me1/64.png",
      "large": "https://images.pokemontcg.io/me1/64_hires.png"
    }
  },
  {
    "id": "me1-65",
    "name": "Greavard",
    "number": "65",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/65.png",
      "large": "https://images.pokemontcg.io/me1/65_hires.png"
    }
  },
  {
    "id": "me1-66",
    "name": "Houndstone",
    "number": "66",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/66.png",
      "large": "https://images.pokemontcg.io/me1/66_hires.png"
    }
  },
  {
    "id": "me1-67",
    "name": "Gimmighoul",
    "number": "67",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/67.png",
      "large": "https://images.pokemontcg.io/me1/67_hires.png"
    }
  },
  {
    "id": "me1-68",
    "name": "Sandshrew",
    "number": "68",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/68.png",
      "large": "https://images.pokemontcg.io/me1/68_hires.png"
    }
  },
  {
    "id": "me1-69",
    "name": "Sandslash",
    "number": "69",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/69.png",
      "large": "https://images.pokemontcg.io/me1/69_hires.png"
    }
  },
  {
    "id": "me1-70",
    "name": "Onix",
    "number": "70",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/70.png",
      "large": "https://images.pokemontcg.io/me1/70_hires.png"
    }
  },
  {
    "id": "me1-71",
    "name": "Tyrogue",
    "number": "71",
    "artist": null,
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
        "cost": [
          "Free"
        ],
        "convertedEnergyCost": 1,
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
    "convertedRetreatCost": null,
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
      "small": "https://images.pokemontcg.io/me1/71.png",
      "large": "https://images.pokemontcg.io/me1/71_hires.png"
    }
  },
  {
    "id": "me1-72",
    "name": "Makuhita",
    "number": "72",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/72.png",
      "large": "https://images.pokemontcg.io/me1/72_hires.png"
    }
  },
  {
    "id": "me1-73",
    "name": "Hariyama",
    "number": "73",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/73.png",
      "large": "https://images.pokemontcg.io/me1/73_hires.png"
    }
  },
  {
    "id": "me1-74",
    "name": "Lunatone",
    "number": "74",
    "artist": null,
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
        "text": "Once during your turn, if you have Solrock in play, you may discard a Basic Fighting Energy card from your hand in order to use this Ability. Draw 3 cards. You can't use more than 1 Lunar Cycle Ability each turn.",
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
      "small": "https://images.pokemontcg.io/me1/74.png",
      "large": "https://images.pokemontcg.io/me1/74_hires.png"
    }
  },
  {
    "id": "me1-75",
    "name": "Solrock",
    "number": "75",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/75.png",
      "large": "https://images.pokemontcg.io/me1/75_hires.png"
    }
  },
  {
    "id": "me1-76",
    "name": "Riolu",
    "number": "76",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/76.png",
      "large": "https://images.pokemontcg.io/me1/76_hires.png"
    }
  },
  {
    "id": "me1-77",
    "name": "Mega Lucario ex",
    "number": "77",
    "artist": null,
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
        "text": "Attach up to 3 Basic Fighting Energy cards from your discard pile to your Benched Pokémon in any way you like."
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
      "small": "https://images.pokemontcg.io/me1/77.png",
      "large": "https://images.pokemontcg.io/me1/77_hires.png"
    }
  },
  {
    "id": "me1-78",
    "name": "Croagunk",
    "number": "78",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/78.png",
      "large": "https://images.pokemontcg.io/me1/78_hires.png"
    }
  },
  {
    "id": "me1-79",
    "name": "Toxicroak",
    "number": "79",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/79.png",
      "large": "https://images.pokemontcg.io/me1/79_hires.png"
    }
  },
  {
    "id": "me1-80",
    "name": "Marshadow",
    "number": "80",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/80.png",
      "large": "https://images.pokemontcg.io/me1/80_hires.png"
    }
  },
  {
    "id": "me1-81",
    "name": "Stonjourner",
    "number": "81",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/81.png",
      "large": "https://images.pokemontcg.io/me1/81_hires.png"
    }
  },
  {
    "id": "me1-82",
    "name": "Nacli",
    "number": "82",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/82.png",
      "large": "https://images.pokemontcg.io/me1/82_hires.png"
    }
  },
  {
    "id": "me1-83",
    "name": "Naclstack",
    "number": "83",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/83.png",
      "large": "https://images.pokemontcg.io/me1/83_hires.png"
    }
  },
  {
    "id": "me1-84",
    "name": "Garganacl",
    "number": "84",
    "artist": null,
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
        "text": "Attacks used by your Fighting Pokémon do 30 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
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
      "small": "https://images.pokemontcg.io/me1/84.png",
      "large": "https://images.pokemontcg.io/me1/84_hires.png"
    }
  },
  {
    "id": "me1-85",
    "name": "Crawdaunt",
    "number": "85",
    "artist": null,
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
        "text": "If this Pokémon has any damage counters on it, this attack can be used for Darkness."
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
      "small": "https://images.pokemontcg.io/me1/85.png",
      "large": "https://images.pokemontcg.io/me1/85_hires.png"
    }
  },
  {
    "id": "me1-86",
    "name": "Mega Absol ex",
    "number": "86",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/86.png",
      "large": "https://images.pokemontcg.io/me1/86_hires.png"
    }
  },
  {
    "id": "me1-87",
    "name": "Spiritomb",
    "number": "87",
    "artist": null,
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
        "text": "If your Active Darkness Pokémon is damaged by an attack from your opponent's Pokémon (even if your Active Darkness Pokémon is Knocked Out), place 1 damage counter on the Attacking Pokémon.",
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
      "small": "https://images.pokemontcg.io/me1/87.png",
      "large": "https://images.pokemontcg.io/me1/87_hires.png"
    }
  },
  {
    "id": "me1-88",
    "name": "Yveltal",
    "number": "88",
    "artist": null,
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
    "convertedRetreatCost": null,
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
      "small": "https://images.pokemontcg.io/me1/88.png",
      "large": "https://images.pokemontcg.io/me1/88_hires.png"
    }
  },
  {
    "id": "me1-89",
    "name": "Nickit",
    "number": "89",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/89.png",
      "large": "https://images.pokemontcg.io/me1/89_hires.png"
    }
  },
  {
    "id": "me1-90",
    "name": "Thievul",
    "number": "90",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/90.png",
      "large": "https://images.pokemontcg.io/me1/90_hires.png"
    }
  },
  {
    "id": "me1-91",
    "name": "Shroodle",
    "number": "91",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/91.png",
      "large": "https://images.pokemontcg.io/me1/91_hires.png"
    }
  },
  {
    "id": "me1-92",
    "name": "Grafaiai",
    "number": "92",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/92.png",
      "large": "https://images.pokemontcg.io/me1/92_hires.png"
    }
  },
  {
    "id": "me1-93",
    "name": "Steelix",
    "number": "93",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/93.png",
      "large": "https://images.pokemontcg.io/me1/93_hires.png"
    }
  },
  {
    "id": "me1-94",
    "name": "Mega Mawile ex",
    "number": "94",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/94.png",
      "large": "https://images.pokemontcg.io/me1/94_hires.png"
    }
  },
  {
    "id": "me1-95",
    "name": "Dialga",
    "number": "95",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/95.png",
      "large": "https://images.pokemontcg.io/me1/95_hires.png"
    }
  },
  {
    "id": "me1-96",
    "name": "Tinkatink",
    "number": "96",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/96.png",
      "large": "https://images.pokemontcg.io/me1/96_hires.png"
    }
  },
  {
    "id": "me1-97",
    "name": "Tinkatuff",
    "number": "97",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/97.png",
      "large": "https://images.pokemontcg.io/me1/97_hires.png"
    }
  },
  {
    "id": "me1-98",
    "name": "Tinkaton",
    "number": "98",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/98.png",
      "large": "https://images.pokemontcg.io/me1/98_hires.png"
    }
  },
  {
    "id": "me1-99",
    "name": "Gholdengo",
    "number": "99",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/99.png",
      "large": "https://images.pokemontcg.io/me1/99_hires.png"
    }
  },
  {
    "id": "me1-100",
    "name": "Mega Latias ex",
    "number": "100",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/100.png",
      "large": "https://images.pokemontcg.io/me1/100_hires.png"
    }
  },
  {
    "id": "me1-101",
    "name": "Latios",
    "number": "101",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/101.png",
      "large": "https://images.pokemontcg.io/me1/101_hires.png"
    }
  },
  {
    "id": "me1-102",
    "name": "Spearow",
    "number": "102",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/102.png",
      "large": "https://images.pokemontcg.io/me1/102_hires.png"
    }
  },
  {
    "id": "me1-103",
    "name": "Fearow",
    "number": "103",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/103.png",
      "large": "https://images.pokemontcg.io/me1/103_hires.png"
    }
  },
  {
    "id": "me1-104",
    "name": "Mega Kangaskhan ex",
    "number": "104",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/104.png",
      "large": "https://images.pokemontcg.io/me1/104_hires.png"
    }
  },
  {
    "id": "me1-105",
    "name": "Delibird",
    "number": "105",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/105.png",
      "large": "https://images.pokemontcg.io/me1/105_hires.png"
    }
  },
  {
    "id": "me1-106",
    "name": "Miltank",
    "number": "106",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/106.png",
      "large": "https://images.pokemontcg.io/me1/106_hires.png"
    }
  },
  {
    "id": "me1-107",
    "name": "Buneary",
    "number": "107",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/107.png",
      "large": "https://images.pokemontcg.io/me1/107_hires.png"
    }
  },
  {
    "id": "me1-108",
    "name": "Lopunny",
    "number": "108",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/108.png",
      "large": "https://images.pokemontcg.io/me1/108_hires.png"
    }
  },
  {
    "id": "me1-109",
    "name": "Yungoos",
    "number": "109",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/109.png",
      "large": "https://images.pokemontcg.io/me1/109_hires.png"
    }
  },
  {
    "id": "me1-110",
    "name": "Gumshoos",
    "number": "110",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/110.png",
      "large": "https://images.pokemontcg.io/me1/110_hires.png"
    }
  },
  {
    "id": "me1-111",
    "name": "Stufful",
    "number": "111",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/111.png",
      "large": "https://images.pokemontcg.io/me1/111_hires.png"
    }
  },
  {
    "id": "me1-112",
    "name": "Bewear",
    "number": "112",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/112.png",
      "large": "https://images.pokemontcg.io/me1/112_hires.png"
    }
  },
  {
    "id": "me1-113",
    "name": "Acerola's Mischief",
    "number": "113",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/113.png",
      "large": "https://images.pokemontcg.io/me1/113_hires.png"
    }
  },
  {
    "id": "me1-114",
    "name": "Boss's Orders",
    "number": "114",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/114.png",
      "large": "https://images.pokemontcg.io/me1/114_hires.png"
    }
  },
  {
    "id": "me1-115",
    "name": "Energy Switch",
    "number": "115",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/115.png",
      "large": "https://images.pokemontcg.io/me1/115_hires.png"
    }
  },
  {
    "id": "me1-116",
    "name": "Fighting Gong",
    "number": "116",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/116.png",
      "large": "https://images.pokemontcg.io/me1/116_hires.png"
    }
  },
  {
    "id": "me1-117",
    "name": "Forest of Vitality",
    "number": "117",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/117.png",
      "large": "https://images.pokemontcg.io/me1/117_hires.png"
    }
  },
  {
    "id": "me1-118",
    "name": "Iron Defender",
    "number": "118",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/118.png",
      "large": "https://images.pokemontcg.io/me1/118_hires.png"
    }
  },
  {
    "id": "me1-119",
    "name": "Lillie's Determination",
    "number": "119",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/119.png",
      "large": "https://images.pokemontcg.io/me1/119_hires.png"
    }
  },
  {
    "id": "me1-120",
    "name": "Lt. Surge's Bargain",
    "number": "120",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/120.png",
      "large": "https://images.pokemontcg.io/me1/120_hires.png"
    }
  },
  {
    "id": "me1-121",
    "name": "Mega Signal",
    "number": "121",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/121.png",
      "large": "https://images.pokemontcg.io/me1/121_hires.png"
    }
  },
  {
    "id": "me1-122",
    "name": "Mystery Garden",
    "number": "122",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/122.png",
      "large": "https://images.pokemontcg.io/me1/122_hires.png"
    }
  },
  {
    "id": "me1-123",
    "name": "Pokémon Center Lady",
    "number": "123",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/123.png",
      "large": "https://images.pokemontcg.io/me1/123_hires.png"
    }
  },
  {
    "id": "me1-124",
    "name": "Premium Power Pro",
    "number": "124",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/124.png",
      "large": "https://images.pokemontcg.io/me1/124_hires.png"
    }
  },
  {
    "id": "me1-125",
    "name": "Rare Candy",
    "number": "125",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/125.png",
      "large": "https://images.pokemontcg.io/me1/125_hires.png"
    }
  },
  {
    "id": "me1-126",
    "name": "Repel",
    "number": "126",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/126.png",
      "large": "https://images.pokemontcg.io/me1/126_hires.png"
    }
  },
  {
    "id": "me1-127",
    "name": "Risky Ruins",
    "number": "127",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/127.png",
      "large": "https://images.pokemontcg.io/me1/127_hires.png"
    }
  },
  {
    "id": "me1-128",
    "name": "Strange Timepiece",
    "number": "128",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/128.png",
      "large": "https://images.pokemontcg.io/me1/128_hires.png"
    }
  },
  {
    "id": "me1-129",
    "name": "Surfing Beach",
    "number": "129",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/129.png",
      "large": "https://images.pokemontcg.io/me1/129_hires.png"
    }
  },
  {
    "id": "me1-130",
    "name": "Switch",
    "number": "130",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/130.png",
      "large": "https://images.pokemontcg.io/me1/130_hires.png"
    }
  },
  {
    "id": "me1-131",
    "name": "Ultra Ball",
    "number": "131",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/131.png",
      "large": "https://images.pokemontcg.io/me1/131_hires.png"
    }
  },
  {
    "id": "me1-132",
    "name": "Wally's Compassion",
    "number": "132",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/132.png",
      "large": "https://images.pokemontcg.io/me1/132_hires.png"
    }
  },
  {
    "id": "me1-133",
    "name": "Bulbasaur",
    "number": "133",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/133.png",
      "large": "https://images.pokemontcg.io/me1/133_hires.png"
    }
  },
  {
    "id": "me1-134",
    "name": "Ivysaur",
    "number": "134",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/134.png",
      "large": "https://images.pokemontcg.io/me1/134_hires.png"
    }
  },
  {
    "id": "me1-135",
    "name": "Exeggutor",
    "number": "135",
    "artist": null,
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
        "text": "This attack does 30 more damage for each Grass Energy attached to this Pokémon."
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
      "small": "https://images.pokemontcg.io/me1/135.png",
      "large": "https://images.pokemontcg.io/me1/135_hires.png"
    }
  },
  {
    "id": "me1-136",
    "name": "Shuckle",
    "number": "136",
    "artist": null,
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
        "text": "Once during your turn, if this Pokémon has any Grass Energy attached, you may use this Ability. Heal 30 damage from 1 of your Pokémon.",
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
      "small": "https://images.pokemontcg.io/me1/136.png",
      "large": "https://images.pokemontcg.io/me1/136_hires.png"
    }
  },
  {
    "id": "me1-137",
    "name": "Ninjask",
    "number": "137",
    "artist": null,
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
    "convertedRetreatCost": null,
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
      "small": "https://images.pokemontcg.io/me1/137.png",
      "large": "https://images.pokemontcg.io/me1/137_hires.png"
    }
  },
  {
    "id": "me1-138",
    "name": "Vulpix",
    "number": "138",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/138.png",
      "large": "https://images.pokemontcg.io/me1/138_hires.png"
    }
  },
  {
    "id": "me1-139",
    "name": "Litleo",
    "number": "139",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/139.png",
      "large": "https://images.pokemontcg.io/me1/139_hires.png"
    }
  },
  {
    "id": "me1-140",
    "name": "Snover",
    "number": "140",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/140.png",
      "large": "https://images.pokemontcg.io/me1/140_hires.png"
    }
  },
  {
    "id": "me1-141",
    "name": "Clawitzer",
    "number": "141",
    "artist": null,
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
        "text": "Once during your turn, when this Pokémon moves from the Active Spot to your Bench, you may use this Ability. Attach up to 2 Basic Water Energy cards from your hand to this Pokémon.",
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
      "small": "https://images.pokemontcg.io/me1/141.png",
      "large": "https://images.pokemontcg.io/me1/141_hires.png"
    }
  },
  {
    "id": "me1-142",
    "name": "Inteleon",
    "number": "142",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/142.png",
      "large": "https://images.pokemontcg.io/me1/142_hires.png"
    }
  },
  {
    "id": "me1-143",
    "name": "Helioptile",
    "number": "143",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/143.png",
      "large": "https://images.pokemontcg.io/me1/143_hires.png"
    }
  },
  {
    "id": "me1-144",
    "name": "Shedinja",
    "number": "144",
    "artist": null,
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
    "convertedRetreatCost": null,
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
      "small": "https://images.pokemontcg.io/me1/144.png",
      "large": "https://images.pokemontcg.io/me1/144_hires.png"
    }
  },
  {
    "id": "me1-145",
    "name": "Houndstone",
    "number": "145",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/145.png",
      "large": "https://images.pokemontcg.io/me1/145_hires.png"
    }
  },
  {
    "id": "me1-146",
    "name": "Marshadow",
    "number": "146",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/146.png",
      "large": "https://images.pokemontcg.io/me1/146_hires.png"
    }
  },
  {
    "id": "me1-147",
    "name": "Garganacl",
    "number": "147",
    "artist": null,
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
        "text": "Attacks used by your Fighting Pokémon do 30 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
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
      "small": "https://images.pokemontcg.io/me1/147.png",
      "large": "https://images.pokemontcg.io/me1/147_hires.png"
    }
  },
  {
    "id": "me1-148",
    "name": "Spiritomb",
    "number": "148",
    "artist": null,
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
        "text": "If your Active Darkness Pokémon is damaged by an attack from your opponent's Pokémon (even if your Active Darkness Pokémon is Knocked Out), place 1 damage counter on the Attacking Pokémon.",
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
      "small": "https://images.pokemontcg.io/me1/148.png",
      "large": "https://images.pokemontcg.io/me1/148_hires.png"
    }
  },
  {
    "id": "me1-149",
    "name": "Shroodle",
    "number": "149",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/149.png",
      "large": "https://images.pokemontcg.io/me1/149_hires.png"
    }
  },
  {
    "id": "me1-150",
    "name": "Steelix",
    "number": "150",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/150.png",
      "large": "https://images.pokemontcg.io/me1/150_hires.png"
    }
  },
  {
    "id": "me1-151",
    "name": "Spearow",
    "number": "151",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/151.png",
      "large": "https://images.pokemontcg.io/me1/151_hires.png"
    }
  },
  {
    "id": "me1-152",
    "name": "Delibird",
    "number": "152",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/152.png",
      "large": "https://images.pokemontcg.io/me1/152_hires.png"
    }
  },
  {
    "id": "me1-153",
    "name": "Gumshoos",
    "number": "153",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/153.png",
      "large": "https://images.pokemontcg.io/me1/153_hires.png"
    }
  },
  {
    "id": "me1-154",
    "name": "Stufful",
    "number": "154",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/154.png",
      "large": "https://images.pokemontcg.io/me1/154_hires.png"
    }
  },
  {
    "id": "me1-155",
    "name": "Mega Venusaur ex",
    "number": "155",
    "artist": null,
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
        "text": "As often as you like during your turn, you may use this Ability. Move a Basic Grass Energy from 1 of your Pokémon to another of your Pokémon.",
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
      "small": "https://images.pokemontcg.io/me1/155.png",
      "large": "https://images.pokemontcg.io/me1/155_hires.png"
    }
  },
  {
    "id": "me1-156",
    "name": "Mega Camerupt ex",
    "number": "156",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/156.png",
      "large": "https://images.pokemontcg.io/me1/156_hires.png"
    }
  },
  {
    "id": "me1-157",
    "name": "Mega Abomasnow ex",
    "number": "157",
    "artist": null,
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
        "text": "Discard the top 6 cards of your deck, and this attack does 100 damage for each Basic Water Energy card that you discarded in this way."
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
      "small": "https://images.pokemontcg.io/me1/157.png",
      "large": "https://images.pokemontcg.io/me1/157_hires.png"
    }
  },
  {
    "id": "me1-158",
    "name": "Mega Manectric ex",
    "number": "158",
    "artist": null,
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
    "convertedRetreatCost": null,
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
      "small": "https://images.pokemontcg.io/me1/158.png",
      "large": "https://images.pokemontcg.io/me1/158_hires.png"
    }
  },
  {
    "id": "me1-159",
    "name": "Mega Gardevoir ex",
    "number": "159",
    "artist": null,
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
        "text": "For each of your Benched Pokémon, search your deck for a Basic Psychic Energy card and attach it to that Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Mega Symphonia",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "This attack does 50 damage for each Psychic Energy attached to all of your Pokémon."
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
      "small": "https://images.pokemontcg.io/me1/159.png",
      "large": "https://images.pokemontcg.io/me1/159_hires.png"
    }
  },
  {
    "id": "me1-160",
    "name": "Mega Lucario ex",
    "number": "160",
    "artist": null,
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
        "text": "Attach up to 3 Basic Fighting Energy cards from your discard pile to your Benched Pokémon in any way you like."
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
      "small": "https://images.pokemontcg.io/me1/160.png",
      "large": "https://images.pokemontcg.io/me1/160_hires.png"
    }
  },
  {
    "id": "me1-161",
    "name": "Mega Absol ex",
    "number": "161",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/161.png",
      "large": "https://images.pokemontcg.io/me1/161_hires.png"
    }
  },
  {
    "id": "me1-162",
    "name": "Mega Mawile ex",
    "number": "162",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/162.png",
      "large": "https://images.pokemontcg.io/me1/162_hires.png"
    }
  },
  {
    "id": "me1-163",
    "name": "Mega Latias ex",
    "number": "163",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/163.png",
      "large": "https://images.pokemontcg.io/me1/163_hires.png"
    }
  },
  {
    "id": "me1-164",
    "name": "Mega Kangaskhan ex",
    "number": "164",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/164.png",
      "large": "https://images.pokemontcg.io/me1/164_hires.png"
    }
  },
  {
    "id": "me1-165",
    "name": "Acerola's Mischief",
    "number": "165",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/165.png",
      "large": "https://images.pokemontcg.io/me1/165_hires.png"
    }
  },
  {
    "id": "me1-166",
    "name": "Air Balloon",
    "number": "166",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/166.png",
      "large": "https://images.pokemontcg.io/me1/166_hires.png"
    }
  },
  {
    "id": "me1-167",
    "name": "Buddy-Buddy Poffin",
    "number": "167",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/167.png",
      "large": "https://images.pokemontcg.io/me1/167_hires.png"
    }
  },
  {
    "id": "me1-168",
    "name": "Fighting Gong",
    "number": "168",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/168.png",
      "large": "https://images.pokemontcg.io/me1/168_hires.png"
    }
  },
  {
    "id": "me1-169",
    "name": "Lillie's Determination",
    "number": "169",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/169.png",
      "large": "https://images.pokemontcg.io/me1/169_hires.png"
    }
  },
  {
    "id": "me1-170",
    "name": "Lt. Surge's Bargain",
    "number": "170",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/170.png",
      "large": "https://images.pokemontcg.io/me1/170_hires.png"
    }
  },
  {
    "id": "me1-171",
    "name": "Mega Signal",
    "number": "171",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/171.png",
      "large": "https://images.pokemontcg.io/me1/171_hires.png"
    }
  },
  {
    "id": "me1-172",
    "name": "Mystery Garden",
    "number": "172",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/172.png",
      "large": "https://images.pokemontcg.io/me1/172_hires.png"
    }
  },
  {
    "id": "me1-173",
    "name": "Night Stretcher",
    "number": "173",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/173.png",
      "large": "https://images.pokemontcg.io/me1/173_hires.png"
    }
  },
  {
    "id": "me1-174",
    "name": "Premium Power Pro",
    "number": "174",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/174.png",
      "large": "https://images.pokemontcg.io/me1/174_hires.png"
    }
  },
  {
    "id": "me1-175",
    "name": "Rare Candy",
    "number": "175",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/175.png",
      "large": "https://images.pokemontcg.io/me1/175_hires.png"
    }
  },
  {
    "id": "me1-176",
    "name": "Wally's Compassion",
    "number": "176",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/176.png",
      "large": "https://images.pokemontcg.io/me1/176_hires.png"
    }
  },
  {
    "id": "me1-177",
    "name": "Mega Venusaur ex",
    "number": "177",
    "artist": null,
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
        "text": "As often as you like during your turn, you may use this Ability. Move a Basic Grass Energy from 1 of your Pokémon to another of your Pokémon.",
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
      "small": "https://images.pokemontcg.io/me1/177.png",
      "large": "https://images.pokemontcg.io/me1/177_hires.png"
    }
  },
  {
    "id": "me1-178",
    "name": "Mega Gardevoir ex",
    "number": "178",
    "artist": null,
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
        "text": "For each of your Benched Pokémon, search your deck for a Basic Psychic Energy card and attach it to that Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Mega Symphonia",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "This attack does 50 damage for each Psychic Energy attached to all of your Pokémon."
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
      "small": "https://images.pokemontcg.io/me1/178.png",
      "large": "https://images.pokemontcg.io/me1/178_hires.png"
    }
  },
  {
    "id": "me1-179",
    "name": "Mega Lucario ex",
    "number": "179",
    "artist": null,
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
        "text": "Attach up to 3 Basic Fighting Energy cards from your discard pile to your Benched Pokémon in any way you like."
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
      "small": "https://images.pokemontcg.io/me1/179.png",
      "large": "https://images.pokemontcg.io/me1/179_hires.png"
    }
  },
  {
    "id": "me1-180",
    "name": "Mega Absol ex",
    "number": "180",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/180.png",
      "large": "https://images.pokemontcg.io/me1/180_hires.png"
    }
  },
  {
    "id": "me1-181",
    "name": "Mega Latias ex",
    "number": "181",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/181.png",
      "large": "https://images.pokemontcg.io/me1/181_hires.png"
    }
  },
  {
    "id": "me1-182",
    "name": "Mega Kangaskhan ex",
    "number": "182",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/182.png",
      "large": "https://images.pokemontcg.io/me1/182_hires.png"
    }
  },
  {
    "id": "me1-183",
    "name": "Acerola's Mischief",
    "number": "183",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/183.png",
      "large": "https://images.pokemontcg.io/me1/183_hires.png"
    }
  },
  {
    "id": "me1-184",
    "name": "Lillie's Determination",
    "number": "184",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/184.png",
      "large": "https://images.pokemontcg.io/me1/184_hires.png"
    }
  },
  {
    "id": "me1-185",
    "name": "Lt. Surge's Bargain",
    "number": "185",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/185.png",
      "large": "https://images.pokemontcg.io/me1/185_hires.png"
    }
  },
  {
    "id": "me1-186",
    "name": "Wally's Compassion",
    "number": "186",
    "artist": null,
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
      "small": "https://images.pokemontcg.io/me1/186.png",
      "large": "https://images.pokemontcg.io/me1/186_hires.png"
    }
  },
  {
    "id": "me1-187",
    "name": "Mega Gardevoir ex",
    "number": "187",
    "artist": null,
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
        "text": "For each of your Benched Pokémon, search your deck for a Basic Psychic Energy card and attach it to that Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Mega Symphonia",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "This attack does 50 damage for each Psychic Energy attached to all of your Pokémon."
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
      "small": "https://images.pokemontcg.io/me1/187.png",
      "large": "https://images.pokemontcg.io/me1/187_hires.png"
    }
  },
  {
    "id": "me1-188",
    "name": "Mega Lucario ex",
    "number": "188",
    "artist": null,
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
        "text": "Attach up to 3 Basic Fighting Energy cards from your discard pile to your Benched Pokémon in any way you like."
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
      "small": "https://images.pokemontcg.io/me1/188.png",
      "large": "https://images.pokemontcg.io/me1/188_hires.png"
    }
  }
]

export default cardDetails
