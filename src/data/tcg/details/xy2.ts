import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "xy2-1",
    "name": "Caterpie",
    "number": "1",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Metapod"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Adaptive Evolution",
        "text": "This Pokémon can evolve during your first turn or the turn you play it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Bug Bite",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
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
      10
    ],
    "flavorText": "For protection, it releases a horrible stench from the antennae on its head to drive away enemies.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/1.png",
      "large": "https://images.pokemontcg.io/xy2/1_hires.png"
    }
  },
  {
    "id": "xy2-2",
    "name": "Metapod",
    "number": "2",
    "artist": "kawayoo",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Caterpie",
    "evolvesTo": [
      "Butterfree"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Adaptive Evolution",
        "text": "This Pokémon can evolve during your first turn or the turn you play it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Harden",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "During your opponent's next turn, if this Pokémon would be damaged by an attack, prevent that attack's damage done to this Pokémon if that damage is 60 or less."
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
      11
    ],
    "flavorText": "A steel-hard shell protects its tender body. It quietly endures hardships while awaiting evolution.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/2.png",
      "large": "https://images.pokemontcg.io/xy2/2_hires.png"
    }
  },
  {
    "id": "xy2-3",
    "name": "Butterfree",
    "number": "3",
    "artist": "sui",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Metapod",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Quiver Dance",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a basic Energy card and attach it to this Pokémon. Shuffle your deck afterward. If you attached Energy in this way, heal 40 damage from this Pokémon."
      },
      {
        "name": "Gust",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
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
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      12
    ],
    "flavorText": "It loves the honey of flowers and can locate flower patches that have even tiny amounts of pollen.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/3.png",
      "large": "https://images.pokemontcg.io/xy2/3_hires.png"
    }
  },
  {
    "id": "xy2-4",
    "name": "Pineco",
    "number": "4",
    "artist": "Suwama Chiaki",
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
      "Forretress"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ram",
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
      204
    ],
    "flavorText": "It likes to make its shell thicker by adding layers of tree bark. The additional weight doesn't bother it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/4.png",
      "large": "https://images.pokemontcg.io/xy2/4_hires.png"
    }
  },
  {
    "id": "xy2-5",
    "name": "Seedot",
    "number": "5",
    "artist": "Naoyo Kimura",
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
      "Nuzleaf"
    ],
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
        "text": "Search your deck for a Basic Pokémon and put it onto your Bench. Shuffle your deck afterward."
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
    "flavorText": "It attaches itself to a tree branch using the top of its head. Strong winds can sometimes make it fall.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/5.png",
      "large": "https://images.pokemontcg.io/xy2/5_hires.png"
    }
  },
  {
    "id": "xy2-6",
    "name": "Nuzleaf",
    "number": "6",
    "artist": "Midori Harada",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
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
        "name": "Razor Leaf",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Cut",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
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
      274
    ],
    "flavorText": "The sound of its grass flute makes its listeners uneasy. It lives deep in forests.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/6.png",
      "large": "https://images.pokemontcg.io/xy2/6_hires.png"
    }
  },
  {
    "id": "xy2-7",
    "name": "Shiftry",
    "number": "7",
    "artist": "Kouki Saitou",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Nuzleaf",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Leaf Draw",
        "text": "Once during your turn (before your attack), you may discard a Grass Energy card from your hand. If you do, draw 3 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Deranged Dance",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20×",
        "text": "This attack does 20 damage times the number of Benched Pokémon (both yours and your opponent's)."
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
    "flavorText": "A Pokémon that was feared as a forest guardian. It can read the foe's mind and take preemptive action.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/7.png",
      "large": "https://images.pokemontcg.io/xy2/7_hires.png"
    }
  },
  {
    "id": "xy2-8",
    "name": "Roselia",
    "number": "8",
    "artist": "kirisAki",
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
      "Roserade"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sleep Powder",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Cut",
        "cost": [
          "Grass",
          "Grass"
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
      315
    ],
    "flavorText": "It uses the different poisons in each hand separately when it attacks. The stronger its aroma, the healthier it is.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/8.png",
      "large": "https://images.pokemontcg.io/xy2/8_hires.png"
    }
  },
  {
    "id": "xy2-9",
    "name": "Roserade",
    "number": "9",
    "artist": "Masakazu Fukuda",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Roselia",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Whiplash",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin until you get tails. For each heads, discard an Energy attached to your opponent's Active Pokémon."
      },
      {
        "name": "Mega Drain",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Heal 20 damage from this Pokémon."
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
      407
    ],
    "flavorText": "Luring prey with a sweet scent, it uses poison whips on its arms to poison, bind, and finish off the prey.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/9.png",
      "large": "https://images.pokemontcg.io/xy2/9_hires.png"
    }
  },
  {
    "id": "xy2-10",
    "name": "Maractus",
    "number": "10",
    "artist": "match",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Exciting Shake",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your next turn, flip 6 coins instead of 2 for this Pokémon's Prickly Needles attack."
      },
      {
        "name": "Prickly Needles",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Flip 2 coins. This attack does 20 damage times the number of heads."
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
      556
    ],
    "flavorText": "It uses an up-tempo song and dance to drive away the bird Pokémon that prey on its flower seeds.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/10.png",
      "large": "https://images.pokemontcg.io/xy2/10_hires.png"
    }
  },
  {
    "id": "xy2-11",
    "name": "Charizard-EX",
    "number": "11",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Charizard-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Stoke",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, search your deck for up to 3 basic Energy cards and attach them to this Pokémon. Shuffle your deck afterward."
      },
      {
        "name": "Fire Blast",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120",
        "text": "Discard an Energy attached to this Pokémon."
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
      6
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/11.png",
      "large": "https://images.pokemontcg.io/xy2/11_hires.png"
    }
  },
  {
    "id": "xy2-12",
    "name": "Charizard-EX",
    "number": "12",
    "artist": "PLANETA",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Charizard-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Wing Attack",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": ""
      },
      {
        "name": "Combustion Blast",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "150",
        "text": "This Pokémon can't use Combustion Blast during your next turn."
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
      6
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/12.png",
      "large": "https://images.pokemontcg.io/xy2/12_hires.png"
    }
  },
  {
    "id": "xy2-13",
    "name": "M Charizard-EX",
    "number": "13",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "220",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charizard-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Crimson Dive",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "300",
        "text": "This Pokémon does 50 damage to itself."
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
      6
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/13.png",
      "large": "https://images.pokemontcg.io/xy2/13_hires.png"
    }
  },
  {
    "id": "xy2-14",
    "name": "Ponyta",
    "number": "14",
    "artist": "Tomokazu Komiya",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Rapidash"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Agility",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn."
      },
      {
        "name": "Flame Tail",
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
      77
    ],
    "flavorText": "As a newborn, it can barely stand. However, through galloping, its legs are made tougher and faster.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/14.png",
      "large": "https://images.pokemontcg.io/xy2/14_hires.png"
    }
  },
  {
    "id": "xy2-15",
    "name": "Rapidash",
    "number": "15",
    "artist": "Akira Komayama",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Ponyta",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Agility",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn."
      },
      {
        "name": "Overrun",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "This attack does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      78
    ],
    "flavorText": "Very competitive, this Pokémon will chase anything that moves fast in the hopes of racing it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/15.png",
      "large": "https://images.pokemontcg.io/xy2/15_hires.png"
    }
  },
  {
    "id": "xy2-16",
    "name": "Torkoal",
    "number": "16",
    "artist": "Akira Komayama",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Live Coal",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Flamethrower",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Flip a coin. If tails, discard an Energy attached to this Pokémon."
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
      324
    ],
    "flavorText": "You find abandoned coal mines full of them. They dig tirelessly in search of coal.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/16.png",
      "large": "https://images.pokemontcg.io/xy2/16_hires.png"
    }
  },
  {
    "id": "xy2-17",
    "name": "Fletchinder",
    "number": "17",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Fletchling",
    "evolvesTo": [
      "Talonflame"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Firebreathing",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
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
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      662
    ],
    "flavorText": "From its beak, it expels embers that set the tall grass on fire. Then it pounces on the bewildered prey that pop out of the grass.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/17.png",
      "large": "https://images.pokemontcg.io/xy2/17_hires.png"
    }
  },
  {
    "id": "xy2-18",
    "name": "Litleo",
    "number": "18",
    "artist": "5ban Graphics",
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
        "name": "Combustion",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      667
    ],
    "flavorText": "The stronger the opponent it faces, the more heat surges from its mane and the more power flows through its body.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/18.png",
      "large": "https://images.pokemontcg.io/xy2/18_hires.png"
    }
  },
  {
    "id": "xy2-19",
    "name": "Litleo",
    "number": "19",
    "artist": "5ban Graphics",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
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
        "name": "Fire Mane",
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
    "flavorText": "The stronger the opponent it faces, the more heat surges from its mane and the more power flows through its body.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/19.png",
      "large": "https://images.pokemontcg.io/xy2/19_hires.png"
    }
  },
  {
    "id": "xy2-20",
    "name": "Pyroar",
    "number": "20",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Litleo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Intimidating Mane",
        "text": "Prevent all damage done to this Pokémon by attacks from your opponent's Basic Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Scorching Fang",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "You may discard a Fire Energy attached to this Pokémon. If you do, this attack does 30 more damage."
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
    "flavorText": "The male with the largest mane of fire is the leader of the pride.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/20.png",
      "large": "https://images.pokemontcg.io/xy2/20_hires.png"
    }
  },
  {
    "id": "xy2-21",
    "name": "Qwilfish",
    "number": "21",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Counterattack Quills",
        "text": "If this Pokémon is your Active Pokémon and is damaged by an opponent's attack (even if this Pokémon is Knocked Out), put 2 damage counters on the Attacking Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Poison Sting",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Your opponent's Active Pokémon is now Poisoned."
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
      211
    ],
    "flavorText": "To fire its poison spikes, it must inflate its body by drinking over 2.6 gallons of water all at once.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/21.png",
      "large": "https://images.pokemontcg.io/xy2/21_hires.png"
    }
  },
  {
    "id": "xy2-22",
    "name": "Feebas",
    "number": "22",
    "artist": "Shigenori Negishi",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "30",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Milotic"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Surprise Attack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If tails, this attack does nothing."
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
      349
    ],
    "flavorText": "It eats anything, so it can even live in polluted streams and lakes. No one pays any attention to it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/22.png",
      "large": "https://images.pokemontcg.io/xy2/22_hires.png"
    }
  },
  {
    "id": "xy2-23",
    "name": "Milotic",
    "number": "23",
    "artist": "Shin Nagasawa",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Feebas",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Energy Grace",
        "text": "Once during your turn (before your attack) you may Knock Out this Pokémon. If you do, attach 3 basic Energy from your discard pile to 1 of your Pokémon (excluding Pokémon-EX).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Waterfall",
        "cost": [
          "Water",
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
      350
    ],
    "flavorText": "Milotic is breathtakingly beautiful. Those that see it are said to forget their combative spirits.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Banned"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/23.png",
      "large": "https://images.pokemontcg.io/xy2/23_hires.png"
    }
  },
  {
    "id": "xy2-24",
    "name": "Spheal",
    "number": "24",
    "artist": "Kagemaru Himeno",
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
      "Sealeo"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ice Ball",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      363
    ],
    "flavorText": "They can't swim well yet, and they move much faster by rolling. When they're happy they clap fins.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/24.png",
      "large": "https://images.pokemontcg.io/xy2/24_hires.png"
    }
  },
  {
    "id": "xy2-25",
    "name": "Sealeo",
    "number": "25",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Spheal",
    "evolvesTo": [
      "Walrein"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rest",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Heal 60 damage from this Pokémon. This Pokémon is now Asleep."
      },
      {
        "name": "Ice Ball",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
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
      364
    ],
    "flavorText": "It has a very sensitive nose. It touches new things with its nose to examine them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/25.png",
      "large": "https://images.pokemontcg.io/xy2/25_hires.png"
    }
  },
  {
    "id": "xy2-26",
    "name": "Walrein",
    "number": "26",
    "artist": "Naoki Saito",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Sealeo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Powder Snow",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Big Tusk",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120-",
        "text": "This attack does 120 damage minus 10 damage for each damage counter on this Pokémon."
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
      365
    ],
    "flavorText": "It shatters ice with its big tusks. Its thick blubber repels not only the cold, but also enemy attacks.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/26.png",
      "large": "https://images.pokemontcg.io/xy2/26_hires.png"
    }
  },
  {
    "id": "xy2-27",
    "name": "Luvdisc",
    "number": "27",
    "artist": "Atsuko Nishida",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Heart Wink",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, your opponent can't draw a card at the beginning of his or her next turn."
      },
      {
        "name": "Spike Draw",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Draw a card."
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
      370
    ],
    "flavorText": "It lives in warm seas. It is said that a couple finding this Pokémon will be blessed with eternal love.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/27.png",
      "large": "https://images.pokemontcg.io/xy2/27_hires.png"
    }
  },
  {
    "id": "xy2-28",
    "name": "Buizel",
    "number": "28",
    "artist": "sui",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Floatzel"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Water Gun",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Quick Attack",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
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
      418
    ],
    "flavorText": "It swims by rotating its two tails like a screw. When it dives, its flotation sac collapses.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/28.png",
      "large": "https://images.pokemontcg.io/xy2/28_hires.png"
    }
  },
  {
    "id": "xy2-29",
    "name": "Floatzel",
    "number": "29",
    "artist": "Kanako Eo",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Buizel",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rescue",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Shuffle 3 Pokémon from your discard pile into your deck."
      },
      {
        "name": "Screw Tail",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, discard an Energy attached to your opponent's Active Pokémon."
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
      419
    ],
    "flavorText": "It floats using its well-developed flotation sac. It assists in the rescues of drowning people.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/29.png",
      "large": "https://images.pokemontcg.io/xy2/29_hires.png"
    }
  },
  {
    "id": "xy2-30",
    "name": "Bergmite",
    "number": "30",
    "artist": "5ban Graphics",
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
      "Avalugg"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stomp Off",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard the top card of your opponent's deck."
      },
      {
        "name": "Tackle",
        "cost": [
          "Water",
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
      712
    ],
    "flavorText": "It blocks opponents' attacks with the ice that shields its body. It uses cold air to repair any cracks with new ice.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/30.png",
      "large": "https://images.pokemontcg.io/xy2/30_hires.png"
    }
  },
  {
    "id": "xy2-31",
    "name": "Avalugg",
    "number": "31",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Bergmite",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Frost Barrier",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "During your opponent's next turn, any damage done to this Pokémon by attacks is reduced by 20 (after applying Weakness and Resistance)."
      },
      {
        "name": "Shatter",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "90",
        "text": "Discard any Stadium card in play."
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
      713
    ],
    "flavorText": "Its ice-covered body is as hard as steel. Its cumbersome frame crushes anything that stands in its way.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/31.png",
      "large": "https://images.pokemontcg.io/xy2/31_hires.png"
    }
  },
  {
    "id": "xy2-32",
    "name": "Shinx",
    "number": "32",
    "artist": "Sanosuke Sakuma",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Luxio"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Paralyzing Gaze",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Static Shock",
        "cost": [
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Metal",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      403
    ],
    "flavorText": "The extension and contraction of its muscles generates electricity. It glows when in trouble.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/32.png",
      "large": "https://images.pokemontcg.io/xy2/32_hires.png"
    }
  },
  {
    "id": "xy2-33",
    "name": "Luxio",
    "number": "33",
    "artist": "Akira Komayama",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Shinx",
    "evolvesTo": [
      "Luxray"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bite",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Electricounter",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40×",
        "text": "This attack does 40 damage times the number of Prize cards your opponent has taken."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Metal",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      404
    ],
    "flavorText": "Its claws loose electricity with enough amperage to cause fainting. They live in small groups.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/33.png",
      "large": "https://images.pokemontcg.io/xy2/33_hires.png"
    }
  },
  {
    "id": "xy2-34",
    "name": "Luxray",
    "number": "34",
    "artist": "Hitoshi Ariga",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Luxio",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fang Snipe",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Your opponent reveals his or her hand. Discard a Trainer card you find there."
      },
      {
        "name": "Wild Charge",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This Pokémon does 30 damage to itself."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Metal",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      405
    ],
    "flavorText": "When its eyes gleam gold, it can spot hiding prey–even those taking shelter behind a wall.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/34.png",
      "large": "https://images.pokemontcg.io/xy2/34_hires.png"
    }
  },
  {
    "id": "xy2-35",
    "name": "Magnezone-EX",
    "number": "35",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Electro Ball",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Dual Bullet",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 50 damage to 2 of your opponent's Pokémon. (Don't apply Weakness or Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Metal",
        "value": "-20"
      }
    ],
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/35.png",
      "large": "https://images.pokemontcg.io/xy2/35_hires.png"
    }
  },
  {
    "id": "xy2-36",
    "name": "Helioptile",
    "number": "36",
    "artist": "5ban Graphics",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
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
        "name": "Pound",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Destructive Beam",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip a coin. If heads, discard an Energy attached to your opponent's Active Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Metal",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      694
    ],
    "flavorText": "They make their home in deserts. They can generate their energy from basking in the sun, so eating food is not a requirement.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/36.png",
      "large": "https://images.pokemontcg.io/xy2/36_hires.png"
    }
  },
  {
    "id": "xy2-37",
    "name": "Heliolisk",
    "number": "37",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Helioptile",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Parabolic Charge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Energy cards, reveal them, and put them into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Quick Attack",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "Flip a coin. If heads, this attack does 30 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Metal",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      695
    ],
    "flavorText": "They flare their frills and generate energy. A single Heliolisk can generate sufficient electricity to power a skyscraper.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/37.png",
      "large": "https://images.pokemontcg.io/xy2/37_hires.png"
    }
  },
  {
    "id": "xy2-38",
    "name": "Duskull",
    "number": "38",
    "artist": "match",
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
      "Dusclops"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Revival",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put a Basic Pokémon from your opponent's discard pile onto his or her Bench."
      },
      {
        "name": "Sneaky Placement",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put 1 damage counter on your opponent's Active Pokémon."
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
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      355
    ],
    "flavorText": "It doggedly pursues its prey wherever it goes. However, the chase is abandoned at sunrise.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/38.png",
      "large": "https://images.pokemontcg.io/xy2/38_hires.png"
    }
  },
  {
    "id": "xy2-39",
    "name": "Dusclops",
    "number": "39",
    "artist": "MAHOU",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Duskull",
    "evolvesTo": [
      "Dusknoir"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Confuse Ray",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Confused."
      },
      {
        "name": "Cursed Drop",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Put 4 damage counters on your opponent's Pokémon in any way you like."
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
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      356
    ],
    "flavorText": "Anyone who dares peer into its body to see its spectral ball of fire will have their spirit stolen away.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/39.png",
      "large": "https://images.pokemontcg.io/xy2/39_hires.png"
    }
  },
  {
    "id": "xy2-40",
    "name": "Dusknoir",
    "number": "40",
    "artist": "Suwama Chiaki",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Dusclops",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Shadow Void",
        "text": "As often as you like during your turn (before your attack), you may move 1 damage counter from 1 of your Pokémon to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Pain Pellets",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Put damage counters on 1 of your opponent's Pokémon equal to the number of damage counters on this Pokémon."
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
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      477
    ],
    "flavorText": "It is said to take lost spirits into its pliant body and guide them home.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/40.png",
      "large": "https://images.pokemontcg.io/xy2/40_hires.png"
    }
  },
  {
    "id": "xy2-41",
    "name": "Toxicroak-EX",
    "number": "41",
    "artist": "PLANETA",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Triple Poison",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Poisoned. Put 3 damage counters instead of 1 on that Pokémon between turns."
      },
      {
        "name": "Smash Uppercut",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "This attack's damage isn't affected by Resistance."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/41.png",
      "large": "https://images.pokemontcg.io/xy2/41_hires.png"
    }
  },
  {
    "id": "xy2-42",
    "name": "Espurr",
    "number": "42",
    "artist": "5ban Graphics",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Meowstic"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psyshot",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Fake Out",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
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
      677
    ],
    "flavorText": "The organ that emits its intense psychic power is sheltered by its ears to keep power from leaking out.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/42.png",
      "large": "https://images.pokemontcg.io/xy2/42_hires.png"
    }
  },
  {
    "id": "xy2-43",
    "name": "Meowstic",
    "number": "43",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Espurr",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ear Influence",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Move as many damage counters on your opponent's Pokémon as you like to any of your opponent's other Pokémon in any way you like."
      },
      {
        "name": "Psychic",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "Does 10 more damage for each Energy attached to your opponent's Active Pokémon."
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
      678
    ],
    "flavorText": "When in danger, it raises its ears and releases enough psychic power to grind a 10-ton truck into dust.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/43.png",
      "large": "https://images.pokemontcg.io/xy2/43_hires.png"
    }
  },
  {
    "id": "xy2-44",
    "name": "Skrelp",
    "number": "44",
    "artist": "5ban Graphics",
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
      "Dragalge"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spit Poison",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Poisoned."
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
      690
    ],
    "flavorText": "Camouflaged as rotten kelp, they spray liquid poison on prey that approaches unawares and then finish it off.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/44.png",
      "large": "https://images.pokemontcg.io/xy2/44_hires.png"
    }
  },
  {
    "id": "xy2-45",
    "name": "Geodude",
    "number": "45",
    "artist": "MAHOU",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Graveler"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rollout",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Flail",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10×",
        "text": "This attack does 10 damage times the number of damage counters on this Pokémon."
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
      74
    ],
    "flavorText": "Found in fields and mountains. Mistaking them for boulders, people often step or trip on them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/45.png",
      "large": "https://images.pokemontcg.io/xy2/45_hires.png"
    }
  },
  {
    "id": "xy2-46",
    "name": "Graveler",
    "number": "46",
    "artist": "Naoyo Kimura",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Geodude",
    "evolvesTo": [
      "Golem"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double-Edge",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "This Pokémon does 20 damage to itself."
      },
      {
        "name": "Rollout",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      75
    ],
    "flavorText": "With a free and uncaring nature, it doesn't mind if pieces break off while it rolls down mountains.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/46.png",
      "large": "https://images.pokemontcg.io/xy2/46_hires.png"
    }
  },
  {
    "id": "xy2-47",
    "name": "Golem",
    "number": "47",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Graveler",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stone Edge",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "Flip a coin. If heads, this attack does 30 more damage."
      },
      {
        "name": "Explosion",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "150",
        "text": "This Pokémon does 100 damage to itself."
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
      76
    ],
    "flavorText": "It tumbles down mountains, leaving grooves from peak to base. Stay clear of these grooves.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/47.png",
      "large": "https://images.pokemontcg.io/xy2/47_hires.png"
    }
  },
  {
    "id": "xy2-48",
    "name": "Binacle",
    "number": "48",
    "artist": "5ban Graphics",
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
      "Barbaracle"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Scratch",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "Flip 2 coins. This attack does 30 damage times the number of heads."
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
      688
    ],
    "flavorText": "Two Binacle live together on one rock. When they fight, one of them will move to a different rock.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/48.png",
      "large": "https://images.pokemontcg.io/xy2/48_hires.png"
    }
  },
  {
    "id": "xy2-49",
    "name": "Barbaracle",
    "number": "49",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Binacle",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rock Rush",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "Discard as many Fighting Energy cards as you like from your hand. This attack does 30 damage times the number of Energy cards you discarded."
      },
      {
        "name": "Boulder Crush",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
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
      689
    ],
    "flavorText": "When they evolve, two Binacle multiply into seven. They fight with the power of seven Binacle.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/49.png",
      "large": "https://images.pokemontcg.io/xy2/49_hires.png"
    }
  },
  {
    "id": "xy2-50",
    "name": "Sneasel",
    "number": "50",
    "artist": "Mizue",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Weavile"
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
        "damage": "10",
        "text": ""
      },
      {
        "name": "Flash Claw",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Your opponent discards a card from his or her hand."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      215
    ],
    "flavorText": "It feeds on eggs stolen from nests. Its sharply hooked claws rip vulnerable spots on prey.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/50.png",
      "large": "https://images.pokemontcg.io/xy2/50_hires.png"
    }
  },
  {
    "id": "xy2-51",
    "name": "Sneasel",
    "number": "51",
    "artist": "match",
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
    "evolvesTo": [
      "Weavile"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Icy Wind",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Scratch",
        "cost": [
          "Darkness",
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
    "resistances": [
      {
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      215
    ],
    "flavorText": "It feeds on eggs stolen from nests. Its sharply hooked claws rip vulnerable spots on prey.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/51.png",
      "large": "https://images.pokemontcg.io/xy2/51_hires.png"
    }
  },
  {
    "id": "xy2-52",
    "name": "Weavile",
    "number": "52",
    "artist": "Shigenori Negishi",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Sneasel",
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
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Shuffle your deck afterward."
      },
      {
        "name": "Claw Rend",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "If your opponent's Active Pokémon already has any damage counters on it, this attack does 30 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      461
    ],
    "flavorText": "It lives in snowy regions. It carves patterns in trees with its claws as a signal to others.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/52.png",
      "large": "https://images.pokemontcg.io/xy2/52_hires.png"
    }
  },
  {
    "id": "xy2-53",
    "name": "Stunky",
    "number": "53",
    "artist": "Kyoko Umemoto",
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
    "evolvesTo": [
      "Skuntank"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Smokescreen",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If the Defending Pokémon tries to attack during your opponent's next turn, your opponent flips a coin. If tails, that attack does nothing."
      },
      {
        "name": "Slash",
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
    "resistances": [
      {
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      434
    ],
    "flavorText": "It sprays a foul fluid from its rear. Its stench spreads over a mile radius, driving Pokémon away.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/53.png",
      "large": "https://images.pokemontcg.io/xy2/53_hires.png"
    }
  },
  {
    "id": "xy2-54",
    "name": "Stunky",
    "number": "54",
    "artist": "Masakazu Fukuda",
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
    "evolvesTo": [
      "Skuntank"
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
        "name": "Spray Fluid",
        "cost": [
          "Darkness",
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
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      434
    ],
    "flavorText": "It sprays a foul fluid from its rear. Its stench spreads over a mile radius, driving Pokémon away.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/54.png",
      "large": "https://images.pokemontcg.io/xy2/54_hires.png"
    }
  },
  {
    "id": "xy2-55",
    "name": "Skuntank",
    "number": "55",
    "artist": "kirisAki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Stunky",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Push Down",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Your opponent switches his or her Active Pokémon with 1 of his or her Benched Pokémon."
      },
      {
        "name": "Acid Spray",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Flip a coin. If heads, discard an Energy attached to your opponent's Active Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      435
    ],
    "flavorText": "It sprays a vile-smelling fluid from the tip of its tail to attack. Its range is over 160 feet.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/55.png",
      "large": "https://images.pokemontcg.io/xy2/55_hires.png"
    }
  },
  {
    "id": "xy2-56",
    "name": "Sandile",
    "number": "56",
    "artist": "Masakazu Fukuda",
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
      "Krokorok"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Surprise Attack",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Flip a coin. If tails, this attack does nothing."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      551
    ],
    "flavorText": "It moves along below the sand's surface, except for its nose and eyes. A dark membrane shields its eyes from the sun.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/56.png",
      "large": "https://images.pokemontcg.io/xy2/56_hires.png"
    }
  },
  {
    "id": "xy2-57",
    "name": "Krokorok",
    "number": "57",
    "artist": "Naoki Saito",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Sandile",
    "evolvesTo": [
      "Krookodile"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dark Clamp",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      },
      {
        "name": "Double Swing",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60×",
        "text": "Flip 2 coins. This attack does 60 damage times the number of heads."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      552
    ],
    "flavorText": "They live in groups of a few individuals. Protective membranes shield their eyes from sandstorms.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/57.png",
      "large": "https://images.pokemontcg.io/xy2/57_hires.png"
    }
  },
  {
    "id": "xy2-58",
    "name": "Scraggy",
    "number": "58",
    "artist": "Naoki Saito",
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
    "evolvesTo": [
      "Scrafty"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tail Rap",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Flip 2 coins. This attack does 20 damage times the number of heads."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      559
    ],
    "flavorText": "Its skin has a rubbery elasticity, so it can reduce damage by defensively pulling it skin up to its neck.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/58.png",
      "large": "https://images.pokemontcg.io/xy2/58_hires.png"
    }
  },
  {
    "id": "xy2-59",
    "name": "Scrafty",
    "number": "59",
    "artist": "Hitoshi Ariga",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Scraggy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Corner",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      },
      {
        "name": "Jet Headbutt",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      560
    ],
    "flavorText": "It pulls up its shed skin to protect itself while it kicks. The bigger the crest, the more respected it is.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/59.png",
      "large": "https://images.pokemontcg.io/xy2/59_hires.png"
    }
  },
  {
    "id": "xy2-60",
    "name": "Forretress",
    "number": "60",
    "artist": "Tomokazu Komiya",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Pineco",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Thorn Tempest",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon, you may put 1 damage counter on each of your opponent's Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Iron Crash",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 20 more damage for each Colorless in your opponent's Active Pokémon's Retreat Cost."
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
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      205
    ],
    "flavorText": "It is encased in a steel shell. Its peering eyes are all that can be seen of its mysterious innards.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/60.png",
      "large": "https://images.pokemontcg.io/xy2/60_hires.png"
    }
  },
  {
    "id": "xy2-61",
    "name": "Durant",
    "number": "61",
    "artist": "Midori Harada",
    "rarity": "Rare",
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
        "name": "Chip Off",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard cards from your opponent's hand at random until he or she has 4 cards in his or her hand."
      },
      {
        "name": "X-Scissor",
        "cost": [
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
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
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      632
    ],
    "flavorText": "Individuals each play different roles in driving Heatmor, their natural predator, away from their colony.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/61.png",
      "large": "https://images.pokemontcg.io/xy2/61_hires.png"
    }
  },
  {
    "id": "xy2-62",
    "name": "Flabébé",
    "number": "62",
    "artist": "5ban Graphics",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Floette"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Aromatherapy",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 10 damage from each of your Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Darkness",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      669
    ],
    "flavorText": "It draws out and controls the hidden power of flowers. The flower Flabébé holds is most likely part of its body.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/62.png",
      "large": "https://images.pokemontcg.io/xy2/62_hires.png"
    }
  },
  {
    "id": "xy2-63",
    "name": "Flabébé",
    "number": "63",
    "artist": "5ban Graphics",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Floette"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Razor Leaf",
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
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Darkness",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      669
    ],
    "flavorText": "It draws out and controls the hidden power of flowers. The flower Flabébé holds is most likely part of its body.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/63.png",
      "large": "https://images.pokemontcg.io/xy2/63_hires.png"
    }
  },
  {
    "id": "xy2-64",
    "name": "Floette",
    "number": "64",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Flabébé",
    "evolvesTo": [
      "Florges"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Flower Veil",
        "text": "Each of your Grass Pokémon in play gets +20 HP.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Fairy Wind",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Darkness",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      670
    ],
    "flavorText": "It flutters around fields of flowers and cares for flowers that are starting to wilt. It draws out the hidden power of flowers to battle.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/64.png",
      "large": "https://images.pokemontcg.io/xy2/64_hires.png"
    }
  },
  {
    "id": "xy2-65",
    "name": "Floette",
    "number": "65",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Flabébé",
    "evolvesTo": [
      "Florges"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Petal Blizzard",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 10 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Razor Leaf",
        "cost": [
          "Fairy",
          "Colorless"
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
    "resistances": [
      {
        "type": "Darkness",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      670
    ],
    "flavorText": "It flutters around fields of flowers and cares for flowers that are starting to wilt. It draws out the hidden power of flowers to battle.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/65.png",
      "large": "https://images.pokemontcg.io/xy2/65_hires.png"
    }
  },
  {
    "id": "xy2-66",
    "name": "Florges",
    "number": "66",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "110",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Floette",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Brilliant Search",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 cards and put them into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Petal Blizzard",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 20 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Darkness",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      671
    ],
    "flavorText": "It claims exquisite flower gardens as its territory, and it obtains power from basking in the energy emitted by flowering plants.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/66.png",
      "large": "https://images.pokemontcg.io/xy2/66_hires.png"
    }
  },
  {
    "id": "xy2-67",
    "name": "Spritzee",
    "number": "67",
    "artist": "5ban Graphics",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Aromatisse"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fairy Wind",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Fickle Attack",
        "cost": [
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If tails, this attack does nothing."
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Darkness",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      682
    ],
    "flavorText": "It emits a scent that enraptures those who smell it. This fragrance changes depending on what it has eaten.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/67.png",
      "large": "https://images.pokemontcg.io/xy2/67_hires.png"
    }
  },
  {
    "id": "xy2-68",
    "name": "Carbink",
    "number": "68",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Crystal Barrier",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn."
      },
      {
        "name": "Wonder Blast",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "This attack does 20 more damage for each Fairy Energy attached to this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Darkness",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      703
    ],
    "flavorText": "Born from temperatures and pressures deep underground, it fires beams from the stone in its head.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/68.png",
      "large": "https://images.pokemontcg.io/xy2/68_hires.png"
    }
  },
  {
    "id": "xy2-69",
    "name": "M Charizard-EX",
    "number": "69",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "230",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Charizard-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Wild Blaze",
        "cost": [
          "Fire",
          "Fire",
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "300",
        "text": "Discard the top 5 cards of your deck."
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      6
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/69.png",
      "large": "https://images.pokemontcg.io/xy2/69_hires.png"
    }
  },
  {
    "id": "xy2-70",
    "name": "Druddigon",
    "number": "70",
    "artist": "Ryota Murayama",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Revenge",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "If any of your Pokémon were Knocked Out by damage from an opponent's attack during his or her last turn, this attack does 70 more damage."
      },
      {
        "name": "Dragon Claw",
        "cost": [
          "Fire",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      621
    ],
    "flavorText": "It races through narrow caves, using its sharp claws to catch prey. The skin on its face is harder than a rock.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/70.png",
      "large": "https://images.pokemontcg.io/xy2/70_hires.png"
    }
  },
  {
    "id": "xy2-71",
    "name": "Dragalge",
    "number": "71",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Skrelp",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Poison Barrier",
        "text": "Your opponent's Poisoned Pokémon can't retreat.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Poison Breath",
        "cost": [
          "Water",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Poisoned."
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      691
    ],
    "flavorText": "Their poison is strong enough to eat through the hull of a tanker, and they spit it indiscriminately at anything that enters their territory.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/71.png",
      "large": "https://images.pokemontcg.io/xy2/71_hires.png"
    }
  },
  {
    "id": "xy2-72",
    "name": "Goomy",
    "number": "72",
    "artist": "5ban Graphics",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Sliggoo"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gooey",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 10 damage from this Pokémon."
      },
      {
        "name": "Tackle",
        "cost": [
          "Water",
          "Fairy"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      704
    ],
    "flavorText": "The weakest Dragon-type Pokémon, it lives in damp, shady places, so its body doesn't dry out.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/72.png",
      "large": "https://images.pokemontcg.io/xy2/72_hires.png"
    }
  },
  {
    "id": "xy2-73",
    "name": "Sliggoo",
    "number": "73",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Goomy",
    "evolvesTo": [
      "Goodra"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gooey",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 30 damage from this Pokémon."
      },
      {
        "name": "Gentle Slap",
        "cost": [
          "Water",
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      705
    ],
    "flavorText": "It drives away opponents by excreting a sticky liquid that can dissolve anything. Its eyes devolved, so it can't see anything.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/73.png",
      "large": "https://images.pokemontcg.io/xy2/73_hires.png"
    }
  },
  {
    "id": "xy2-74",
    "name": "Goodra",
    "number": "74",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Sliggoo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Gooey Regeneration",
        "text": "As often as you like during your turn (before your attack), you may discard an Energy attached to this Pokémon. If you do, heal 60 damage from this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Heavy Whip",
        "cost": [
          "Water",
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "Flip a coin. If heads, this attack does 40 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      706
    ],
    "flavorText": "This very friendly Dragon-type Pokémon will hug its beloved Trainer, leaving that Trainer covered in sticky slime.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/74.png",
      "large": "https://images.pokemontcg.io/xy2/74_hires.png"
    }
  },
  {
    "id": "xy2-75",
    "name": "Pidgey",
    "number": "75",
    "artist": "Atsuko Nishida",
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
      "Pidgeotto"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Peck Off",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Before doing damage, discard all Pokémon Tool cards attached to your opponent's Active Pokémon."
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
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      16
    ],
    "flavorText": "A common sight in forests and woods. It flaps its wings at ground level to kick up blinding sand.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/75.png",
      "large": "https://images.pokemontcg.io/xy2/75_hires.png"
    }
  },
  {
    "id": "xy2-76",
    "name": "Pidgeotto",
    "number": "76",
    "artist": "Shin Nagasawa",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Pidgey",
    "evolvesTo": [
      "Pidgeot"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sand-Attack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If the Defending Pokémon tries to attack during your opponent's next turn, your opponent flips a coin. If tails, that attack does nothing."
      },
      {
        "name": "Ambush",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
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
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      17
    ],
    "flavorText": "The claws on its feet are well developed. It can carry prey such as an Exeggcute to its nest over 60 miles away.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/76.png",
      "large": "https://images.pokemontcg.io/xy2/76_hires.png"
    }
  },
  {
    "id": "xy2-77",
    "name": "Pidgeot",
    "number": "77",
    "artist": "kawayoo",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Pidgeotto",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Clutch",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      },
      {
        "name": "Strong Gust",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "During your next turn, this Pokémon's Strong Gust attack does 60 more damage (before applying Weakness and Resistance)."
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
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      18
    ],
    "flavorText": "When hunting, it skims the surface of water at high speed to pick off unwary prey such as Magikarp.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/77.png",
      "large": "https://images.pokemontcg.io/xy2/77_hires.png"
    }
  },
  {
    "id": "xy2-78",
    "name": "Kangaskhan-EX",
    "number": "78",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Kangaskhan-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Triple Draw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw 3 cards."
      },
      {
        "name": "Kindred Kick",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70+",
        "text": "Flip a coin. If heads, this attack does 30 more damage."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/78.png",
      "large": "https://images.pokemontcg.io/xy2/78_hires.png"
    }
  },
  {
    "id": "xy2-79",
    "name": "M Kangaskhan-EX",
    "number": "79",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "230",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Kangaskhan-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Wham Bam Punch",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100+",
        "text": "Flip a coin until you get tails. This attack does 30 more damage for each heads."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/79.png",
      "large": "https://images.pokemontcg.io/xy2/79_hires.png"
    }
  },
  {
    "id": "xy2-80",
    "name": "Snorlax",
    "number": "80",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Stir and Snooze",
        "text": "If this Pokémon is Asleep, flip 2 coins instead of 1 between turns. If either of them is tails, this Pokémon is still Asleep.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Sleepy Press",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120",
        "text": "Heal 20 damage from this Pokémon. This Pokémon is now Asleep."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      143
    ],
    "flavorText": "It is not satisfied unless it eats over 880 pounds of food every day. When it is done eating, it goes promptly to sleep.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/80.png",
      "large": "https://images.pokemontcg.io/xy2/80_hires.png"
    }
  },
  {
    "id": "xy2-81",
    "name": "Sentret",
    "number": "81",
    "artist": "Mizue",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Furret"
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
        "damage": "10",
        "text": ""
      },
      {
        "name": "Tail Smack",
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
      161
    ],
    "flavorText": "When acting as a lookout, it warns others of danger by screeching and hitting the ground with its tail.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/81.png",
      "large": "https://images.pokemontcg.io/xy2/81_hires.png"
    }
  },
  {
    "id": "xy2-82",
    "name": "Furret",
    "number": "82",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Sentret",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Buried Treasure Hunt",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 4 cards of your deck and put 2 of them into your hand. Discard the other cards."
      },
      {
        "name": "Slam",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "Flip 2 coins. This attack does 30 damage times the number of heads."
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
      162
    ],
    "flavorText": "The mother puts its offspring to sleep by curling up around them. It corners foes with speed.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/82.png",
      "large": "https://images.pokemontcg.io/xy2/82_hires.png"
    }
  },
  {
    "id": "xy2-83",
    "name": "Miltank",
    "number": "83",
    "artist": "Kanako Eo",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Powerful Friends",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If you have any Stage 2 Pokémon on your Bench, this attack does 70 more damage."
      },
      {
        "name": "Hammer In",
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
    "flavorText": "If it is around babies, the milk it produces contains much more nutrition than usual.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/83.png",
      "large": "https://images.pokemontcg.io/xy2/83_hires.png"
    }
  },
  {
    "id": "xy2-84",
    "name": "Buneary",
    "number": "84",
    "artist": "Kyoko Umemoto",
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
      "Lopunny"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bounce",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
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
    "flavorText": "Its ears are always rolled up. They can be forcefully extended to shatter even a large boulder.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/84.png",
      "large": "https://images.pokemontcg.io/xy2/84_hires.png"
    }
  },
  {
    "id": "xy2-85",
    "name": "Lopunny",
    "number": "85",
    "artist": "Sanosuke Sakuma",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Buneary",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Big Jump",
        "text": "Once during your turn (before your attack), you may return this Pokémon and all cards attached to it to your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Sitdown Bounce",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Flip a coin. If tails, this Pokémon can't attack during your next turn."
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
    "flavorText": "Extremely cautious, it quickly bounds off when it senses danger.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/85.png",
      "large": "https://images.pokemontcg.io/xy2/85_hires.png"
    }
  },
  {
    "id": "xy2-86",
    "name": "Fletchling",
    "number": "86",
    "artist": "5ban Graphics",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Fletchinder"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Quick Attack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 more damage."
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
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      661
    ],
    "flavorText": "These friendly Pokémon send signals to one another with beautiful chirps and tail-feather movements.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/86.png",
      "large": "https://images.pokemontcg.io/xy2/86_hires.png"
    }
  },
  {
    "id": "xy2-87",
    "name": "Furfrou",
    "number": "87",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
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
        "name": "Tight Jaw",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Sharp Fang",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
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
      676
    ],
    "flavorText": "Trimming its fluffy fur not only makes it more elegant but also increases the swiftness of its movements.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/87.png",
      "large": "https://images.pokemontcg.io/xy2/87_hires.png"
    }
  },
  {
    "id": "xy2-88",
    "name": "Blacksmith",
    "number": "88",
    "artist": "Masakazu Fukuda",
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
      "Attach 2 Fire Energy cards from your discard pile to 1 of your Fire Pokémon.",
      "You may play only 1 Supporter card during your turn (before your attack)."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/88.png",
      "large": "https://images.pokemontcg.io/xy2/88_hires.png"
    }
  },
  {
    "id": "xy2-88a",
    "name": "Blacksmith",
    "number": "88a",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Ultra",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Attach 2 Fire Energy cards from your discard pile to 1 of your Fire Pokémon.",
      "You may play only 1 Supporter card during your turn (before your attack)."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/88a.png",
      "large": "https://images.pokemontcg.io/xy2/88a_hires.png"
    }
  },
  {
    "id": "xy2-89",
    "name": "Fiery Torch",
    "number": "89",
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
      "Discard a Fire Energy card from your hand. (If you can't discard a Fire Energy card, you can't play this card.) Draw 2 cards.",
      "You may play as many Item cards as you like during your turn (before your attack)."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/89.png",
      "large": "https://images.pokemontcg.io/xy2/89_hires.png"
    }
  },
  {
    "id": "xy2-90",
    "name": "Lysandre",
    "number": "90",
    "artist": "Ken Sugimori",
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
      "Switch 1 of your opponent's Benched Pokémon with his or her Active Pokémon.",
      "You may play only 1 Supporter card during your turn (before your attack)."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/90.png",
      "large": "https://images.pokemontcg.io/xy2/90_hires.png"
    }
  },
  {
    "id": "xy2-91",
    "name": "Magnetic Storm",
    "number": "91",
    "artist": "Ryo Ueda",
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
      "Each Pokémon in play has no Resistance.",
      "This card stays in play when you play it. Discard this card if another Stadium card comes into play. If another card with the same name is in play, you can't play this card."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/91.png",
      "large": "https://images.pokemontcg.io/xy2/91_hires.png"
    }
  },
  {
    "id": "xy2-92",
    "name": "Pal Pad",
    "number": "92",
    "artist": "PLANETA",
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
      "Shuffle 2 Supporter cards from your discard pile into your deck.",
      "You may play as many Item cards as you like during your turn (before your attack)."
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
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/92.png",
      "large": "https://images.pokemontcg.io/xy2/92_hires.png"
    }
  },
  {
    "id": "xy2-93",
    "name": "Pokémon Center Lady",
    "number": "93",
    "artist": "Maiko Fujiwara",
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
      "Heal 60 damage and remove all Special Conditions from 1 of your Pokémon.",
      "You may play only 1 Supporter card during your turn (before your attack)."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/93.png",
      "large": "https://images.pokemontcg.io/xy2/93_hires.png"
    }
  },
  {
    "id": "xy2-94",
    "name": "Pokémon Fan Club",
    "number": "94",
    "artist": "Yusuke Ohmura",
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
      "Search your deck for up to 2 Basic Pokémon, reveal them, and put them into your hand. Shuffle your deck afterward.",
      "You may play only 1 Supporter card during your turn (before your attack)."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/94.png",
      "large": "https://images.pokemontcg.io/xy2/94_hires.png"
    }
  },
  {
    "id": "xy2-95",
    "name": "Protection Cube",
    "number": "95",
    "artist": "Toyste Beach",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Attach a Pokémon Tool to 1 of your Pokémon that doesn't already have a Pokémon Tool attached to it.",
      "Prevent all damage done to the Pokémon this card is attached to by attacks it uses.",
      "You may play as many Item cards as you like during your turn (before your attack)."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/95.png",
      "large": "https://images.pokemontcg.io/xy2/95_hires.png"
    }
  },
  {
    "id": "xy2-96",
    "name": "Sacred Ash",
    "number": "96",
    "artist": "PLANETA",
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
      "Shuffle 5 Pokémon from your discard pile into your deck.",
      "You may play as many Item cards as you like during your turn (before your attack)."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/96.png",
      "large": "https://images.pokemontcg.io/xy2/96_hires.png"
    }
  },
  {
    "id": "xy2-97",
    "name": "Startling Megaphone",
    "number": "97",
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
      "Discard all Pokémon Tool cards attached to each of your opponent's Pokémon.",
      "You may play as many Item cards as you like during your turn (before your attack)."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/97.png",
      "large": "https://images.pokemontcg.io/xy2/97_hires.png"
    }
  },
  {
    "id": "xy2-98",
    "name": "Trick Shovel",
    "number": "98",
    "artist": "PLANETA",
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
      "Look at the top card of either player's deck. You may discard that card or return it to the top of the deck.",
      "You may play as many Item cards as you like during your turn (before your attack)."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/98.png",
      "large": "https://images.pokemontcg.io/xy2/98_hires.png"
    }
  },
  {
    "id": "xy2-99",
    "name": "Ultra Ball",
    "number": "99",
    "artist": "5ban Graphics",
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
      "Discard 2 cards from your hand. (If you can't discard 2 cards, you can't play this card.) Search your deck for a Pokémon, reveal it, and put it into your hand. Shuffle your deck afterward.",
      "You may play as many Item cards as you like during your turn (before your attack)."
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
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/99.png",
      "large": "https://images.pokemontcg.io/xy2/99_hires.png"
    }
  },
  {
    "id": "xy2-100",
    "name": "Charizard-EX",
    "number": "100",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Charizard-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Stoke",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, search your deck for up to 3 basic Energy cards and attach them to this Pokémon. Shuffle your deck afterward."
      },
      {
        "name": "Fire Blast",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120",
        "text": "Discard an Energy attached to this Pokémon."
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
      6
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/100.png",
      "large": "https://images.pokemontcg.io/xy2/100_hires.png"
    }
  },
  {
    "id": "xy2-101",
    "name": "Magnezone-EX",
    "number": "101",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Electro Ball",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Dual Bullet",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 50 damage to 2 of your opponent's Pokémon. (Don't apply Weakness or Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Metal",
        "value": "-20"
      }
    ],
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/101.png",
      "large": "https://images.pokemontcg.io/xy2/101_hires.png"
    }
  },
  {
    "id": "xy2-102",
    "name": "Toxicroak-EX",
    "number": "102",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Triple Poison",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Poisoned. Put 3 damage counters instead of 1 on that Pokémon between turns."
      },
      {
        "name": "Smash Uppercut",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "This attack's damage isn't affected by Resistance."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/102.png",
      "large": "https://images.pokemontcg.io/xy2/102_hires.png"
    }
  },
  {
    "id": "xy2-103",
    "name": "Kangaskhan-EX",
    "number": "103",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Kangaskhan-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Triple Draw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw 3 cards."
      },
      {
        "name": "Kindred Kick",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70+",
        "text": "Flip a coin. If heads, this attack does 30 more damage."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/103.png",
      "large": "https://images.pokemontcg.io/xy2/103_hires.png"
    }
  },
  {
    "id": "xy2-104",
    "name": "Lysandre",
    "number": "104",
    "artist": "Ken Sugimori",
    "rarity": "Rare Ultra",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Switch 1 of your opponent's Benched Pokémon with his or her Active Pokémon.",
      "You may play only 1 Supporter card during your turn (before your attack)."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/104.png",
      "large": "https://images.pokemontcg.io/xy2/104_hires.png"
    }
  },
  {
    "id": "xy2-105",
    "name": "Pokémon Center Lady",
    "number": "105",
    "artist": "Megumi Mizutani",
    "rarity": "Rare Ultra",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Heal 60 damage and remove all Special Conditions from 1 of your Pokémon.",
      "You may play only 1 Supporter card during your turn (before your attack)."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/105.png",
      "large": "https://images.pokemontcg.io/xy2/105_hires.png"
    }
  },
  {
    "id": "xy2-106",
    "name": "Pokémon Fan Club",
    "number": "106",
    "artist": "Emi Ando",
    "rarity": "Rare Ultra",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Search your deck for up to 2 Basic Pokémon, reveal them, and put them into your hand. Shuffle your deck afterward.",
      "You may play only 1 Supporter card during your turn (before your attack)."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/106.png",
      "large": "https://images.pokemontcg.io/xy2/106_hires.png"
    }
  },
  {
    "id": "xy2-107",
    "name": "M Charizard-EX",
    "number": "107",
    "artist": "5ban Graphics",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "220",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charizard-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Crimson Dive",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "300",
        "text": "This Pokémon does 50 damage to itself."
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
      6
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/107.png",
      "large": "https://images.pokemontcg.io/xy2/107_hires.png"
    }
  },
  {
    "id": "xy2-108",
    "name": "M Charizard-EX",
    "number": "108",
    "artist": "5ban Graphics",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "230",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Charizard-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Wild Blaze",
        "cost": [
          "Fire",
          "Fire",
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "300",
        "text": "Discard the top 5 cards of your deck."
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      6
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/108.png",
      "large": "https://images.pokemontcg.io/xy2/108_hires.png"
    }
  },
  {
    "id": "xy2-109",
    "name": "M Kangaskhan-EX",
    "number": "109",
    "artist": "5ban Graphics",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "230",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Kangaskhan-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Wham Bam Punch",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100+",
        "text": "Flip a coin until you get tails. This attack does 30 more damage for each heads."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy2/109.png",
      "large": "https://images.pokemontcg.io/xy2/109_hires.png"
    }
  }
]

export default cardDetails
