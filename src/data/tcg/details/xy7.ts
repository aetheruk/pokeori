import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "xy7-1",
    "name": "Oddish",
    "number": "1",
    "artist": "MAHOU",
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
      "Gloom"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Trip Over",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 more damage."
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
      43
    ],
    "flavorText": "Its scientific name is \"Oddium Wanderus.\" At night, it is said to walk nearly 1,000 feet on its two roots.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/1/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/1/high.webp"
    }
  },
  {
    "id": "xy7-2",
    "name": "Gloom",
    "number": "2",
    "artist": "Masakazu Fukuda",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Oddish",
    "evolvesTo": [
      "Vileplume",
      "Bellossom"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Drool",
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
      44
    ],
    "flavorText": "The honey it drools from its mouth smells so atrocious, it can curl noses more than a mile away.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/2/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/2/high.webp"
    }
  },
  {
    "id": "xy7-3",
    "name": "Vileplume",
    "number": "3",
    "artist": "Midori Harada",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Gloom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Irritating Pollen",
        "text": "Each player can't play any Item cards from his or her hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Solar Beam",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
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
      45
    ],
    "flavorText": "It has the world's largest petals. With every step, the petals shake out heavy clouds of toxic pollen.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/3/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/3/high.webp"
    }
  },
  {
    "id": "xy7-4",
    "name": "Bellossom",
    "number": "4",
    "artist": "Mizue",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "120",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Gloom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Windmill",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Flower Tornado",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Move as many Grass Energy attached to your Pokémon to your other Pokémon in any way you like."
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
      182
    ],
    "flavorText": "When the heavy rainfall season ends, it is drawn out by warm sunlight to dance in the open.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/4/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/4/high.webp"
    }
  },
  {
    "id": "xy7-5",
    "name": "Spinarak",
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
      "Ariados"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "String Shot",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
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
      167
    ],
    "flavorText": "It lies still in the same pose for days in its web, waiting for its unsuspecting prey to wander close.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/5/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/5/high.webp"
    }
  },
  {
    "id": "xy7-6",
    "name": "Ariados",
    "number": "6",
    "artist": "Hajime Kusajima",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Spinarak",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Poisonous Nest",
        "text": "Once during your turn (before your attack), you may use this Ability. Both Active Pokémon (except for Grass Pokémon) are now Poisoned.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Impound",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
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
      168
    ],
    "flavorText": "It attaches silk to its prey and sets it free. Later, it tracks the silk to the prey and its friends.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/6/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/6/high.webp"
    }
  },
  {
    "id": "xy7-7",
    "name": "Sceptile-EX",
    "number": "7",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Sceptile-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Sleep Poison",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Asleep and Poisoned."
      },
      {
        "name": "Unseen Claw",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60+",
        "text": "If your opponent's Active Pokémon is affected by a Special Condition, this attack does 70 more damage."
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
      254
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/7/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/7/high.webp"
    }
  },
  {
    "id": "xy7-8",
    "name": "M Sceptile-EX",
    "number": "8",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "220",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Sceptile-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "{title}:",
        "text": "{title}: Prevent all effects of your opponent's Pokémon's Abilities done to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Jagged Saber",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "100",
        "text": "You may attach up to 2 Grass Energy cards from your hand to your Benched Pokémon in any way you like. If you attached Energy to a Pokémon in this way, heal all damage from that Pokémon."
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
      254
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/8/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/8/high.webp"
    }
  },
  {
    "id": "xy7-9",
    "name": "Combee",
    "number": "9",
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
      "Vespiquen"
    ],
    "rules": [],
    "abilities": [],
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
      415
    ],
    "flavorText": "It collects and delivers honey to its colony. At night, they cluster to form a beehive and sleep.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/9/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/9/high.webp"
    }
  },
  {
    "id": "xy7-10",
    "name": "Vespiquen",
    "number": "10",
    "artist": "kawayoo",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Combee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Intelligence Gathering",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "You may draw cards until you have 6 cards in your hand."
      },
      {
        "name": "Bee Revenge",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 10 more damage for each Pokémon in your discard pile."
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
      416
    ],
    "flavorText": "Its abdomen is a honeycomb for grubs. It raises its grubs on honey collected by Combee.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/10/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/10/high.webp"
    }
  },
  {
    "id": "xy7-11",
    "name": "Vespiquen",
    "number": "11",
    "artist": "Ayaka Yoshida",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Combee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "{title}:",
        "text": "{title}: This Pokémon may have up to 2 Pokémon Tool cards attached to it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Bee Drain",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Heal from this Pokémon the same amount of damage you did to your opponent's Active Pokémon."
      },
      {
        "name": "Fury Swipes",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "Flip 3 coins. This attack does 30 damage times the number of heads."
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
      416
    ],
    "flavorText": "Its abdomen is a honeycomb for grubs. It raises its grubs on honey collected by Combee.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/11/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/11/high.webp"
    }
  },
  {
    "id": "xy7-12",
    "name": "Virizion",
    "number": "12",
    "artist": "match",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bail Out",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put 2 Pokémon from your discard pile into your hand."
      },
      {
        "name": "Prize Count",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "40+",
        "text": "If you have more Prize cards left than your opponent, this attack does 80 more damage."
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
      640
    ],
    "flavorText": "Legends say this Pokémon confounded opponents with its swift movements.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/12/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/12/high.webp"
    }
  },
  {
    "id": "xy7-13",
    "name": "Flareon",
    "number": "13",
    "artist": "sui",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Flare Effect",
        "text": "Each of your Stage 1 Pokémon in play is now a Fire Pokémon in addition to its existing types.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Heat Breath",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
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
      136
    ],
    "flavorText": "It has a flame bag inside its body. After inhaling deeply, it blows out flames of nearly 3,000 degrees Fahrenheit.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/13/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/13/high.webp"
    }
  },
  {
    "id": "xy7-14",
    "name": "Entei",
    "number": "14",
    "artist": "Naoki Saito",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Burning Roar",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard the top 4 cards of your deck. If any of those cards are Fire Energy cards, attach them to your Pokémon in any way you like."
      },
      {
        "name": "Combat Blaze",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 20 more damage for each of your opponent's Benched Pokémon."
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
      244
    ],
    "flavorText": "It is said that when it roars, a volcano erupts somewhere around the globe.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/14/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/14/high.webp"
    }
  },
  {
    "id": "xy7-15",
    "name": "Entei",
    "number": "15",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
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
    "abilities": [
      {
        "name": "{title}:",
        "text": "{title}: This Pokémon may have up to 2 Pokémon Tool cards attached to it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Flame Screen",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "During your opponent's next turn, any damage done to this Pokémon by attacks is reduced by 30 (after applying Weakness and Resistance)."
      },
      {
        "name": "Heat Tackle",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "130",
        "text": "Flip a coin. If tails, this Pokémon does 30 damage to itself."
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
      244
    ],
    "flavorText": "It is said that when it roars, a volcano erupts somewhere around the globe.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/15/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/15/high.webp"
    }
  },
  {
    "id": "xy7-16",
    "name": "Larvesta",
    "number": "16",
    "artist": "Satoshi Shirai",
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
      "Volcarona"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Combustion",
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
      636
    ],
    "flavorText": "The base of volcanoes is where they make their homes. They shoot fire from their five horns to repel attacking enemies.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/16/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/16/high.webp"
    }
  },
  {
    "id": "xy7-17",
    "name": "Volcarona",
    "number": "17",
    "artist": "Kyoko Umemoto",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Larvesta",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Solar Birth",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Basic Pokémon and put it onto your Bench. Then, search your deck for up to 2 basic Energy cards and attach them to that Pokémon. Shuffle your deck afterward."
      },
      {
        "name": "Flamethrower",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      637
    ],
    "flavorText": "When volcanic ash darkened the atmosphere, it is said that Volcarona's fire provided a replacement for the sun.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/17/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/17/high.webp"
    }
  },
  {
    "id": "xy7-18",
    "name": "Volcarona",
    "number": "18",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Larvesta",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "{title}:",
        "text": "{title}: Prevent all effects of your opponent's Pokémon's Abilities done to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Burning Scales",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "Flip 2 coins. This attack does 20 more damage for each heads."
      },
      {
        "name": "Wind Wheel",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Your opponent switches his or her Active Pokémon with 1 of his or her Benched Pokémon."
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
      637
    ],
    "flavorText": "When volcanic ash darkened the atmosphere, it is said that Volcarona's fire provided a replacement for the sun.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/18/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/18/high.webp"
    }
  },
  {
    "id": "xy7-19",
    "name": "Magikarp",
    "number": "19",
    "artist": "Akira Komayama",
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
      "Gyarados"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Epic Splash",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip 2 coins. If either of them is tails, this attack does nothing."
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
      129
    ],
    "flavorText": "In the distant past, it was somewhat stronger than the horribly weak descendants that exist today.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/19/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/19/high.webp"
    }
  },
  {
    "id": "xy7-20",
    "name": "Gyarados",
    "number": "20",
    "artist": "Shin Nagasawa",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Magikarp",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Berserker Splash",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "This attack does 10 damage to each Benched Pokémon (both yours and your opponent's). (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Aqua Tail",
        "cost": [
          "Water",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "90+",
        "text": "Flip a coin for each Water Energy attached to this Pokémon. This attack does 30 more damage for each heads."
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
      130
    ],
    "flavorText": "Rarely seen in the wild. Huge and vicious, it is capable of destroying entire cities in a rage.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/20/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/20/high.webp"
    }
  },
  {
    "id": "xy7-21",
    "name": "Gyarados",
    "number": "21",
    "artist": "TOKIYA",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Magikarp",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "{title}:",
        "text": "{title}: This Pokémon may have up to 2 Pokémon Tool cards attached to it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Full Retaliation",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 30 more damage for each damage counter on each of your Benched Magikarp."
      },
      {
        "name": "Thrash",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100+",
        "text": "Flip a coin. If heads, this attack does 30 more damage. If tails, this Pokémon does 30 damage to itself."
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
      130
    ],
    "flavorText": "Rarely seen in the wild. Huge and vicious, it is capable of destroying entire cities in a rage.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/21/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/21/high.webp"
    }
  },
  {
    "id": "xy7-22",
    "name": "Vaporeon",
    "number": "22",
    "artist": "kirisAki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Aqua Effect",
        "text": "Each of your Stage 1 Pokémon in play is now a Water Pokémon in addition to its existing types.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hydro Splash",
        "cost": [
          "Water",
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
      134
    ],
    "flavorText": "It has evolved to be suitable for an aquatic life. It can invisibly melt away into water.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/22/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/22/high.webp"
    }
  },
  {
    "id": "xy7-23",
    "name": "Relicanth",
    "number": "23",
    "artist": "Kagemaru Himeno",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Deep Sea Search",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Pokémon Tool cards, reveal them, and put them into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Take Down",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "This Pokémon does 10 damage to itself."
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
      369
    ],
    "flavorText": "A rare Pokémon discovered during a deep-sea exploration. It has not changed in over 100 million years.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/23/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/23/high.webp"
    }
  },
  {
    "id": "xy7-24",
    "name": "Regice",
    "number": "24",
    "artist": "Miki Tanaka",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ice Beam",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Resistance Blizzard",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "During your opponent's next turn, prevent all effects of attacks, including damage, done to this Pokémon by Pokémon-EX."
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
      378
    ],
    "flavorText": "Its body is made of ice from the ice age. It controls frigid air of -328 degrees Fahrenheit.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/24/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/24/high.webp"
    }
  },
  {
    "id": "xy7-25",
    "name": "Kyurem-EX",
    "number": "25",
    "artist": "PLANETA",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Glaciate",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 30 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Icecalibur",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "130",
        "text": "Discard an Energy attached to this Pokémon. The Defending Pokémon can't attack during your opponent's next turn."
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
      646
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/25/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/25/high.webp"
    }
  },
  {
    "id": "xy7-26",
    "name": "Jolteon",
    "number": "26",
    "artist": "Sanosuke Sakuma",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Electric Effect",
        "text": "Each of your Stage 1 Pokémon in play is now a Lightning Pokémon in addition to its existing types.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Thunder Blast",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Discard an Energy attached to this Pokémon."
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
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      135
    ],
    "flavorText": "It accumulates negative ions in the atmosphere to blast out 10,000-volt lightning bolts.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/26/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/26/high.webp"
    }
  },
  {
    "id": "xy7-27",
    "name": "Ampharos-EX",
    "number": "27",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Ampharos-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Thunder Rod",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 4 cards of your deck and attach as many Lightning Energy cards you find there as you like to this Pokémon. Shuffle the other cards back into your deck."
      },
      {
        "name": "Sparkling Tail",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": "This attack's damage isn't affected by Weakness, Resistance, or any other effects on your opponent's Active Pokémon."
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      181
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/27/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/27/high.webp"
    }
  },
  {
    "id": "xy7-28",
    "name": "M Ampharos-EX",
    "number": "28",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "220",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Ampharos-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Exavolt",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120+",
        "text": "You may do 50 more damage and leave your opponent's Active Pokémon Paralyzed. If you do, this Pokémon does 30 damage to itself."
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
      181
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/28/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/28/high.webp"
    }
  },
  {
    "id": "xy7-29",
    "name": "Rotom",
    "number": "29",
    "artist": "Mizue",
    "rarity": "Uncommon",
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
        "name": "Electro Ball",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Electric Mischief",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip 3 coins. For each heads, choose a random card from your opponent's hand. Your opponent reveals that card and shuffles it into his or her deck."
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
      479
    ],
    "flavorText": "Its body is composed of plasma. It is known to infiltrate electronic devices and wreak havoc.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/29/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/29/high.webp"
    }
  },
  {
    "id": "xy7-30",
    "name": "Unown",
    "number": "30",
    "artist": "Akira Komayama",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Farewell Letter",
        "text": "Once during your turn (before your attack), if this Pokémon is on your Bench, you may discard this Pokémon and all cards attached to it (this does not count as a Knock Out). If you do, draw a card.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hidden Power",
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
      201
    ],
    "flavorText": "Shaped like ancient writing, it is a huge mystery whether language or Unown came first.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/30/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/30/high.webp"
    }
  },
  {
    "id": "xy7-31",
    "name": "Baltoy",
    "number": "31",
    "artist": "Kouki Saitou",
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
      "Claydol"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Slap",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Spinning Attack",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      343
    ],
    "flavorText": "It moves by spinning on its foot. It is a rare Pokémon that was discovered in ancient ruins.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/31/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/31/high.webp"
    }
  },
  {
    "id": "xy7-32",
    "name": "Baltoy",
    "number": "32",
    "artist": "Ayaka Yoshida",
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
      "Claydol"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "{title}:",
        "text": "{title}: Prevent all effects of your opponent's Pokémon's Abilities done to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Future Spin",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 3 cards of either player's deck and put them back on top of that player's deck in any order."
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
      343
    ],
    "flavorText": "It moves by spinning on its foot. It is a rare Pokémon that was discovered in ancient ruins.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/32/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/32/high.webp"
    }
  },
  {
    "id": "xy7-33",
    "name": "Claydol",
    "number": "33",
    "artist": "Satoshi Shirai",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Baltoy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rewind",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Devolve each of your opponent's evolved Pokémon and put the highest Stage Evolution card on it into your opponent's hand."
      },
      {
        "name": "Hyper Beam",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, discard an Energy attached to your opponent's Active Pokémon."
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
      344
    ],
    "flavorText": "It is said that it originates from clay dolls made by an ancient civilization.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/33/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/33/high.webp"
    }
  },
  {
    "id": "xy7-34",
    "name": "Golett",
    "number": "34",
    "artist": "Sanosuke Sakuma",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Golurk"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Smash Punch",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If tails, this attack does nothing."
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
      622
    ],
    "flavorText": "Ancient science fashioned this Pokémon from clay. It's been active for thousands of years.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/34/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/34/high.webp"
    }
  },
  {
    "id": "xy7-35",
    "name": "Golurk",
    "number": "35",
    "artist": "kawayoo",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Golett",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Double Type",
        "text": "As long as this Pokémon is in play, it is Psychic and Fighting type.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Superpower",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80+",
        "text": "You may do 40 more damage. If you do, this Pokémon does 20 damage to itself."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      623
    ],
    "flavorText": "It flies across the sky at Mach speeds. Removing the seal on its chest makes its internal energy go out of control.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/35/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/35/high.webp"
    }
  },
  {
    "id": "xy7-36",
    "name": "Hoopa-EX",
    "number": "36",
    "artist": "Ryota Murayama",
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
    "abilities": [
      {
        "name": "Scoundrel Ring",
        "text": "When you play this Pokémon from your hand onto your Bench, you may search your deck for up to 3 Pokémon-EX (except for Hoopa-EX), reveal them, and put them into your hand. Shuffle your deck afterward.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hyperspace Fury",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard 2 Energy attached to this Pokémon. This attack does 100 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      720
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/36/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/36/high.webp"
    }
  },
  {
    "id": "xy7-37",
    "name": "Machamp-EX",
    "number": "37",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Steaming Mad",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage times the number of damage counters on this Pokémon. This Pokémon is now Confused."
      },
      {
        "name": "Crazy Hammer",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If this Pokémon is affected by a Special Condition, this attack does 80 more damage. Then, remove all Special Conditions from this Pokémon."
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
      68
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/37/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/37/high.webp"
    }
  },
  {
    "id": "xy7-38",
    "name": "Wooper",
    "number": "38",
    "artist": "Sumiyoshi Kizuki",
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
      "Quagsire"
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
        "name": "Wave Splash",
        "cost": [
          "Water",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      194
    ],
    "flavorText": "When the temperature cools in the evening, they emerge from water to seek food along the shore.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/38/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/38/high.webp"
    }
  },
  {
    "id": "xy7-39",
    "name": "Quagsire",
    "number": "39",
    "artist": "Naoyo Kimura",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Wooper",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wave Splash",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Landslide",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
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
      195
    ],
    "flavorText": "This carefree Pokémon has an easy-going nature. While swimming, it always bumps into boat hulls.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/39/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/39/high.webp"
    }
  },
  {
    "id": "xy7-40",
    "name": "Regirock",
    "number": "40",
    "artist": "Shin Nagasawa",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rock Throw",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Unyielding Rock",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "If your opponent's Active Pokémon is a Pokémon-EX, this attack does 60 more damage."
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
      377
    ],
    "flavorText": "The same rocks that form its body have been found in ground layers around the world.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/40/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/40/high.webp"
    }
  },
  {
    "id": "xy7-41",
    "name": "Golurk",
    "number": "41",
    "artist": "Suwama Chiaki",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Golett",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dig Out",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Discard the top card of your deck. If that card is a Fighting Energy card, attach it to this Pokémon."
      },
      {
        "name": "Double Lariat",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "90×",
        "text": "Flip 2 coins. This attack does 90 damage times the number of heads."
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
      623
    ],
    "flavorText": "It flies across the sky at Mach speeds. Removing the seal on its chest makes its internal energy go out of control.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/41/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/41/high.webp"
    }
  },
  {
    "id": "xy7-42",
    "name": "Tyranitar-EX",
    "number": "42",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Tyranitar-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Hammer In",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": ""
      },
      {
        "name": "Break Ground",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "130",
        "text": "This attack does 10 damage to each of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      248
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/42/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/42/high.webp"
    }
  },
  {
    "id": "xy7-43",
    "name": "M Tyranitar-EX",
    "number": "43",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "240",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Tyranitar-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "{title}:",
        "text": "{title}: This Pokémon may have up to 2 Pokémon Tool cards attached to it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Destroyer King",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "110+",
        "text": "This attack does 60 more damage for each damage counter on your opponent's Active Pokémon."
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      248
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/43/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/43/high.webp"
    }
  },
  {
    "id": "xy7-44",
    "name": "Sableye",
    "number": "44",
    "artist": "Hitoshi Ariga",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bewitching Eyes",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose a Supporter card from your opponent's discard pile and use it as the effect of this attack."
      },
      {
        "name": "Furtive Drop",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put 3 damage counters on your opponent's Active Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      302
    ],
    "flavorText": "It dwells in the darkness of caves. It uses its sharp claws to dig up gems to nourish itself.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/44/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/44/high.webp"
    }
  },
  {
    "id": "xy7-45",
    "name": "Inkay",
    "number": "45",
    "artist": "Tomokazu Komiya",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Malamar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ink Spit",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "If the Defending Pokémon tries to attack during your opponent's next turn, your opponent flips a coin. If tails, that attack does nothing."
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
      686
    ],
    "flavorText": "It flashes the light-emitting spots on its body, which drains its opponent's will to fight. It takes the opportunity to scuttle away and hide.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/45/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/45/high.webp"
    }
  },
  {
    "id": "xy7-46",
    "name": "Malamar",
    "number": "46",
    "artist": "Masakazu Fukuda",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Inkay",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Entangling Control",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch 1 of your opponent's Benched Pokémon with his or her Active Pokémon. The new Active Pokémon is now Confused."
      },
      {
        "name": "Trash Tentacle",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Put a card from your discard pile into your hand."
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
      687
    ],
    "flavorText": "It lures prey close with hypnotic motions, then wraps its tentacles around it before finishing it off with digestive fluids.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/46/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/46/high.webp"
    }
  },
  {
    "id": "xy7-47",
    "name": "Beldum",
    "number": "47",
    "artist": "Yuka Morii",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Metang"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ram",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Spinning Attack",
        "cost": [
          "Metal",
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
      374
    ],
    "flavorText": "It converses with others by magnetic pulses. In a swarm, they move in perfect unison.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/47/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/47/high.webp"
    }
  },
  {
    "id": "xy7-48",
    "name": "Metang",
    "number": "48",
    "artist": "Shigenori Negishi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Beldum",
    "evolvesTo": [
      "Metagross"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Metal Claw",
        "cost": [
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Bullet Punch",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "Flip 2 coins. This attack does 20 more damage for each heads."
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
      375
    ],
    "flavorText": "It is formed by two Beldum joining together. Its two brains are linked, amplifying its psychic power.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/48/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/48/high.webp"
    }
  },
  {
    "id": "xy7-49",
    "name": "Metagross",
    "number": "49",
    "artist": "kirisAki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Metang",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Magnetic Warp",
        "text": "Once during your turn (before your attack), you may switch your Active Pokémon with 1 of your Benched Pokémon. If you do, your opponent switches his or her Active Pokémon with 1 of his or her Benched Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Iron Cannon",
        "cost": [
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80+",
        "text": "You may discard all Metal Energy attached to this Pokémon. If you do, this attack does 80 more damage."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      376
    ],
    "flavorText": "Metang combined to form it. With four brains, it has the intelligence of a supercomputer.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/49/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/49/high.webp"
    }
  },
  {
    "id": "xy7-50",
    "name": "Metagross",
    "number": "50",
    "artist": "Hitoshi Ariga",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Metang",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "{title}:",
        "text": "{title}: This Pokémon may have up to 2 Pokémon Tool cards attached to it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Machine Gun Stomp",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 10 more damage for each card in your hand."
      },
      {
        "name": "Guard Press",
        "cost": [
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "During your opponent's next turn, any damage done to this Pokémon by attacks is reduced by 20 (after applying Weakness and Resistance)."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      376
    ],
    "flavorText": "Metang combined to form it. With four brains, it has the intelligence of a supercomputer.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/50/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/50/high.webp"
    }
  },
  {
    "id": "xy7-51",
    "name": "Registeel",
    "number": "51",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Iron Head",
        "cost": [
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "Flip a coin until you get tails. This attack does 30 damage times the number of heads."
      },
      {
        "name": "Forbidden Iron Hammer",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "If your opponent's Active Pokémon is a Pokémon-EX, discard an Energy attached to that Pokémon."
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
      379
    ],
    "flavorText": "Its body is said to be harder than any kind of metal. A study has revealed that its body is hollow.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/51/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/51/high.webp"
    }
  },
  {
    "id": "xy7-52",
    "name": "Ralts",
    "number": "52",
    "artist": "Aya Kusube",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Kirlia"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mumble",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Magical Shot",
        "cost": [
          "Fairy",
          "Colorless"
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
      280
    ],
    "flavorText": "It is highly attuned to the emotions of people and Pokémon. It hides if it senses hostility.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/52/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/52/high.webp"
    }
  },
  {
    "id": "xy7-53",
    "name": "Kirlia",
    "number": "53",
    "artist": "match",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fairy"
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
        "name": "Calm Mind",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 30 damage from this Pokémon."
      },
      {
        "name": "Magical Shot",
        "cost": [
          "Fairy",
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
      281
    ],
    "flavorText": "It has a psychic power that enables it to distort the space around it and see into the future.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/53/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/53/high.webp"
    }
  },
  {
    "id": "xy7-54",
    "name": "Gardevoir",
    "number": "54",
    "artist": "TOKIYA",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Kirlia",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Bright Heal",
        "text": "Once during your turn (before your attack), you may heal 20 damage from each of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Telekinesis",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 50 damage to 1 of your opponent's Pokémon. This attack's damage isn't affected by Weakness or Resistance."
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
      282
    ],
    "flavorText": "It has the power to predict the future. Its power peaks when it is protecting its Trainer.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/54/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/54/high.webp"
    }
  },
  {
    "id": "xy7-55",
    "name": "Cottonee",
    "number": "55",
    "artist": "Kanako Eo",
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
      "Whimsicott"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Cotton Bed",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Your opponent's Active Pokémon is now Asleep."
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
      546
    ],
    "flavorText": "Perhaps because they feel more at ease in a group, they stick to others they find. They end up looking like a cloud.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/55/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/55/high.webp"
    }
  },
  {
    "id": "xy7-56",
    "name": "Whimsicott",
    "number": "56",
    "artist": "Atsuko Nishida",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Cottonee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Windy Mischief",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Move all damage counters from 1 of your Benched Pokémon to your opponent's Active Pokémon."
      },
      {
        "name": "Rolling Tackle",
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
      547
    ],
    "flavorText": "Like the wind, it can slip through any gap, no matter how small. It leaves balls of white fluff behind.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/56/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/56/high.webp"
    }
  },
  {
    "id": "xy7-57",
    "name": "Giratina-EX",
    "number": "57",
    "artist": "PLANETA",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Renegade Pulse",
        "text": "Prevent all effects of attacks, including damage, done to this Pokémon by your opponent's Mega Evolution Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Chaos Wheel",
        "cost": [
          "Grass",
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": "Your opponent can't play any Pokémon Tool, Special Energy, or Stadium cards from his or her hand during his or her next turn."
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
      487
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/57/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/57/high.webp"
    }
  },
  {
    "id": "xy7-58",
    "name": "Goomy",
    "number": "58",
    "artist": "sui",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Sliggoo"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Water Down",
        "text": "Whenever you attach a Water Energy card from your hand to this Pokémon, you may search your deck for Goomy and put it onto your Bench. Shuffle your deck afterward.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Stampede",
        "cost": [
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
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
    "flavorText": "It's covered in a slimy membrane that makes any punches or kicks slide off it harmlessly.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/58/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/58/high.webp"
    }
  },
  {
    "id": "xy7-59",
    "name": "Sliggoo",
    "number": "59",
    "artist": "Midori Harada",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
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
        "name": "Bubble",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Melt",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      705
    ],
    "flavorText": "Its four horns are a high-performance radar system. It uses them to sense sounds and smells, rather than using ears or a nose.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/59/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/59/high.webp"
    }
  },
  {
    "id": "xy7-60",
    "name": "Goodra",
    "number": "60",
    "artist": "Saya Tsuruta",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Liquid Blow",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 20 damage to 1 of your opponent's Pokémon for each Colorless in its Retreat Cost. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Shining Breath",
        "cost": [
          "Water",
          "Fairy",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "110",
        "text": "During your opponent's next turn, this Pokémon can't be affected by any Special Conditions."
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
    "flavorText": "It attacks with retractable horns. It throws a punch that's the equivalent of the force of a hundred pro boxers.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/60/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/60/high.webp"
    }
  },
  {
    "id": "xy7-61",
    "name": "Meowth",
    "number": "61",
    "artist": "Kanako Eo",
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
      "Persian"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Act Tough",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If this Pokémon has any Darkness Energy attached to it, this attack does 20 more damage."
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
      52
    ],
    "flavorText": "Adores round objects. It wanders the streets on a nightly basis to look for dropped loose change.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/61/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/61/high.webp"
    }
  },
  {
    "id": "xy7-62",
    "name": "Persian",
    "number": "62",
    "artist": "Mitsuhiro Arita",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Meowth",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fake Out",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Ambush",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40+",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      53
    ],
    "flavorText": "Its lithe muscles allow it to walk without making a sound. It attacks in an instant.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/62/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/62/high.webp"
    }
  },
  {
    "id": "xy7-63",
    "name": "Eevee",
    "number": "63",
    "artist": "Kouki Saitou",
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
      "Vaporeon",
      "Jolteon",
      "Flareon",
      "Sylveon",
      "Espeon",
      "Umbreon",
      "Leafeon",
      "Glaceon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tackle",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Lunge",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If tails, this attack does nothing."
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
      133
    ],
    "flavorText": "Thanks to its unstable genetic makeup, this special Pokémon conceals many different possible evolutions.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/63/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/63/high.webp"
    }
  },
  {
    "id": "xy7-64",
    "name": "Porygon",
    "number": "64",
    "artist": "Yukiko Baba",
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
      "Porygon2"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Data Check",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look through your deck. Shuffle your deck afterward."
      },
      {
        "name": "Sharpen",
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
      137
    ],
    "flavorText": "A Pokémon that consists entirely of programming code. It is capable of moving freely in cyberspace.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/64/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/64/high.webp"
    }
  },
  {
    "id": "xy7-65",
    "name": "Porygon2",
    "number": "65",
    "artist": "MAHOU",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Porygon",
    "evolvesTo": [
      "Porygon-Z"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sharpen",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Tri Attack",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30×",
        "text": "Flip 3 coins. This attack does 30 damage times the number of heads."
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
      233
    ],
    "flavorText": "With planetary development software installed, it became capable of working in space.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/65/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/65/high.webp"
    }
  },
  {
    "id": "xy7-66",
    "name": "Porygon-Z",
    "number": "66",
    "artist": "TOKIYA",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Porygon2",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Cyber Crush",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard all Special Energy attached to each of your opponent's Pokémon."
      },
      {
        "name": "Slowing Beam",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "During your opponent's next turn, the Defending Pokémon's attacks cost Colorless more."
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
      474
    ],
    "flavorText": "Its programming was modified to enable it to travel through alien dimensions. Seems there might have been an error…",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/66/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/66/high.webp"
    }
  },
  {
    "id": "xy7-67",
    "name": "Porygon-Z",
    "number": "67",
    "artist": "Naoki Saito",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Porygon2",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "{title}:",
        "text": "{title}: Prevent all effects of your opponent's Pokémon's Abilities done to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Digital Reboot",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Devolve as many of your Benched Pokémon as many times as you like. Put each Evolution card removed this way into your hand."
      },
      {
        "name": "Dazzle Blast",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Your opponent's Active Pokémon is now Confused."
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
      474
    ],
    "flavorText": "Its programming was modified to enable it to travel through alien dimensions. Seems there might have been an error…",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/67/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/67/high.webp"
    }
  },
  {
    "id": "xy7-68",
    "name": "Lugia-EX",
    "number": "68",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Aero Ball",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage times the amount of Energy attached to both Active Pokémon."
      },
      {
        "name": "Deep Hurricane",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80+",
        "text": "If there is any Stadium card in play, this attack does 70 more damage. Then, discard that Stadium card."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      249
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/68/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/68/high.webp"
    }
  },
  {
    "id": "xy7-69",
    "name": "Ace Trainer",
    "number": "69",
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
      "You can play this card only if you have more Prize cards left than your opponent.",
      "Each player shuffles his or her hand into his or her deck. Then, draw 6 cards. Your opponent draws 3 cards.",
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/69/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/69/high.webp"
    }
  },
  {
    "id": "xy7-70",
    "name": "Ampharos Spirit Link",
    "number": "70",
    "artist": "5ban Graphics",
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
      "Your turn does not end if the Pokémon this card is attached to becomes M Ampharos-EX.",
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/70/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/70/high.webp"
    }
  },
  {
    "id": "xy7-71",
    "name": "Eco Arm",
    "number": "71",
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
      "Shuffle 3 Pokémon Tool cards from your discard pile into your deck.",
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/71/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/71/high.webp"
    }
  },
  {
    "id": "xy7-72",
    "name": "Energy Recycler",
    "number": "72",
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
      "Shuffle 5 basic Energy cards from your discard pile into your deck.",
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/72/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/72/high.webp"
    }
  },
  {
    "id": "xy7-73",
    "name": "Faded Town",
    "number": "73",
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
      "At any time between turns, put 2 damage counters on each Mega Evolution Pokémon.",
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/73/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/73/high.webp"
    }
  },
  {
    "id": "xy7-74",
    "name": "Forest of Giant Plants",
    "number": "74",
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
      "Each player's Grass Pokémon can evolve during his or her first turn or the turn he or she plays those Pokémon.",
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
      "expanded": "Banned"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/74/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/74/high.webp"
    }
  },
  {
    "id": "xy7-75",
    "name": "Hex Maniac",
    "number": "75",
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
      "Until the end of your opponent's next turn, each Pokémon in play, in each player's hand, and in each player's discard pile has no Abilities. (This includes cards that come into play on that turn.)",
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
      "expanded": "Banned"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/75/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/75/high.webp"
    }
  },
  {
    "id": "xy7-75a",
    "name": "Hex Maniac",
    "number": "75a",
    "artist": "Yusuke Ohmura",
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
      "Until the end of your opponent's next turn, each Pokémon in play, in each player's hand, and in each player's discard pile has no Abilities. (This includes cards that come into play on that turn.)",
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
      "expanded": "Banned"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/75a/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/75a/high.webp"
    }
  },
  {
    "id": "xy7-76",
    "name": "Level Ball",
    "number": "76",
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
      "Search your deck for a Pokémon with 90 HP or less, reveal it, and put it into your hand. Shuffle your deck afterward.",
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/76/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/76/high.webp"
    }
  },
  {
    "id": "xy7-77",
    "name": "Lucky Helmet",
    "number": "77",
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
      "Whenever the Pokémon this card is attached to is your Active Pokémon and is damaged by an opponent's attack (even if that Pokémon is Knocked Out), draw 2 cards.",
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/77/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/77/high.webp"
    }
  },
  {
    "id": "xy7-78",
    "name": "Lysandre",
    "number": "78",
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/78/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/78/high.webp"
    }
  },
  {
    "id": "xy7-79",
    "name": "Paint Roller",
    "number": "79",
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
      "Discard any Stadium card in play. Then, draw a card.",
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/79/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/79/high.webp"
    }
  },
  {
    "id": "xy7-80",
    "name": "Sceptile Spirit Link",
    "number": "80",
    "artist": "5ban Graphics",
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
      "Your turn does not end if the Pokémon this card is attached to becomes M Sceptile-EX.",
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/80/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/80/high.webp"
    }
  },
  {
    "id": "xy7-81",
    "name": "Tyranitar Spirit Link",
    "number": "81",
    "artist": "5ban Graphics",
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
      "Your turn does not end if the Pokémon this card is attached to becomes M Tyranitar-EX.",
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/81/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/81/high.webp"
    }
  },
  {
    "id": "xy7-82",
    "name": "Dangerous Energy",
    "number": "82",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Energy",
    "subtypes": [
      "Special"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "This card can only be attached to Darkness Pokémon. This card provides Darkness Energy only while this card is attached to a Darkness Pokémon.",
      "Whenever the Darkness Pokémon this card is attached to is your Active Pokémon and is damaged by an attack from your opponent's Pokémon-EX (even if that Pokémon is Knocked Out), put 2 damage counters on the Attacking Pokémon-EX.",
      "(If this card is attached to anything other than a Darkness Pokémon, discard this card.)"
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/82/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/82/high.webp"
    }
  },
  {
    "id": "xy7-83",
    "name": "Flash Energy",
    "number": "83",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Energy",
    "subtypes": [
      "Special"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "This card can only be attached to Lightning Pokémon. This card provides Lightning Energy only while this card is attached to a Lightning Pokémon.",
      "The Lightning Pokémon this card is attached to has no Weakness.",
      "(If this card is attached to anything other than a Lightning Pokémon, discard this card.)"
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/83/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/83/high.webp"
    }
  },
  {
    "id": "xy7-84",
    "name": "Sceptile-EX",
    "number": "84",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Sceptile-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Sleep Poison",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Asleep and Poisoned."
      },
      {
        "name": "Unseen Claw",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60+",
        "text": "If your opponent's Active Pokémon is affected by a Special Condition, this attack does 70 more damage."
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
      254
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/84/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/84/high.webp"
    }
  },
  {
    "id": "xy7-85",
    "name": "M Sceptile-EX",
    "number": "85",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "220",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Sceptile-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "{title}:",
        "text": "{title}: Prevent all effects of your opponent's Pokémon's Abilities done to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Jagged Saber",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "100",
        "text": "You may attach up to 2 Grass Energy cards from your hand to your Benched Pokémon in any way you like. If you attached Energy to a Pokémon in this way, heal all damage from that Pokémon."
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
      254
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/85/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/85/high.webp"
    }
  },
  {
    "id": "xy7-86",
    "name": "Kyurem-EX",
    "number": "86",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Glaciate",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 30 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Icecalibur",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "130",
        "text": "Discard an Energy attached to this Pokémon. The Defending Pokémon can't attack during your opponent's next turn."
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
      646
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/86/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/86/high.webp"
    }
  },
  {
    "id": "xy7-87",
    "name": "Ampharos-EX",
    "number": "87",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Ampharos-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Thunder Rod",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 4 cards of your deck and attach as many Lightning Energy cards you find there as you like to this Pokémon. Shuffle the other cards back into your deck."
      },
      {
        "name": "Sparkling Tail",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": "This attack's damage isn't affected by Weakness, Resistance, or any other effects on your opponent's Active Pokémon."
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      181
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/87/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/87/high.webp"
    }
  },
  {
    "id": "xy7-88",
    "name": "M Ampharos-EX",
    "number": "88",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "220",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Ampharos-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Exavolt",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120+",
        "text": "You may do 50 more damage and leave your opponent's Active Pokémon Paralyzed. If you do, this Pokémon does 30 damage to itself."
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
      181
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/88/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/88/high.webp"
    }
  },
  {
    "id": "xy7-89",
    "name": "Hoopa-EX",
    "number": "89",
    "artist": "5ban Graphics",
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
    "abilities": [
      {
        "name": "Scoundrel Ring",
        "text": "When you play this Pokémon from your hand onto your Bench, you may search your deck for up to 3 Pokémon-EX (except for Hoopa-EX), reveal them, and put them into your hand. Shuffle your deck afterward.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hyperspace Fury",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard 2 Energy attached to this Pokémon. This attack does 100 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      720
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/89/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/89/high.webp"
    }
  },
  {
    "id": "xy7-90",
    "name": "Machamp-EX",
    "number": "90",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Steaming Mad",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage times the number of damage counters on this Pokémon. This Pokémon is now Confused."
      },
      {
        "name": "Crazy Hammer",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If this Pokémon is affected by a Special Condition, this attack does 80 more damage. Then, remove all Special Conditions from this Pokémon."
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
      68
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/90/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/90/high.webp"
    }
  },
  {
    "id": "xy7-91",
    "name": "Tyranitar-EX",
    "number": "91",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Tyranitar-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Hammer In",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": ""
      },
      {
        "name": "Break Ground",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "130",
        "text": "This attack does 10 damage to each of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      248
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/91/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/91/high.webp"
    }
  },
  {
    "id": "xy7-92",
    "name": "M Tyranitar-EX",
    "number": "92",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "240",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Tyranitar-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "{title}:",
        "text": "{title}: This Pokémon may have up to 2 Pokémon Tool cards attached to it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Destroyer King",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "110+",
        "text": "This attack does 60 more damage for each damage counter on your opponent's Active Pokémon."
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      248
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/92/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/92/high.webp"
    }
  },
  {
    "id": "xy7-93",
    "name": "Giratina-EX",
    "number": "93",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Renegade Pulse",
        "text": "Prevent all effects of attacks, including damage, done to this Pokémon by your opponent's Mega Evolution Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Chaos Wheel",
        "cost": [
          "Grass",
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": "Your opponent can't play any Pokémon Tool, Special Energy, or Stadium cards from his or her hand during his or her next turn."
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
      487
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/93/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/93/high.webp"
    }
  },
  {
    "id": "xy7-94",
    "name": "Lugia-EX",
    "number": "94",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Aero Ball",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage times the amount of Energy attached to both Active Pokémon."
      },
      {
        "name": "Deep Hurricane",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80+",
        "text": "If there is any Stadium card in play, this attack does 70 more damage. Then, discard that Stadium card."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      249
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/94/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/94/high.webp"
    }
  },
  {
    "id": "xy7-95",
    "name": "Steven",
    "number": "95",
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
      "Search your deck for a Supporter card and a basic Energy card, reveal them, and put them into your hand. Shuffle your deck afterward.",
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/95/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/95/high.webp"
    }
  },
  {
    "id": "xy7-96",
    "name": "Primal Kyogre-EX",
    "number": "96",
    "artist": "5ban Graphics",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "240",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Kyogre-EX",
    "evolvesTo": [],
    "rules": [
      "Primal Reversion rule: When 1 of your Pokémon becomes Primal Kyogre-EX, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "{title}:",
        "text": "{title}: When 1 of your Pokémon becomes this Pokémon, heal all damage from it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Tidal Storm",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "150",
        "text": "Move 2 Energy from this Pokémon to 1 of your Benched Pokémon. This attack does 30 damage to each of your opponent's Benched Pokémon-EX. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      382
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/96/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/96/high.webp"
    }
  },
  {
    "id": "xy7-97",
    "name": "Primal Groudon-EX",
    "number": "97",
    "artist": "5ban Graphics",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "240",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Groudon-EX",
    "evolvesTo": [],
    "rules": [
      "Primal Reversion rule: When 1 of your Pokémon becomes Primal Groudon-EX, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "{title}:",
        "text": "{title}: When 1 of your Pokémon becomes this Pokémon, heal all damage from it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Gaia Volcano",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100+",
        "text": "If there is any Stadium card in play, this attack does 100 more damage. Discard that Stadium card."
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
      383
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/97/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/97/high.webp"
    }
  },
  {
    "id": "xy7-98",
    "name": "M Rayquaza-EX",
    "number": "98",
    "artist": "5ban Graphics",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "220",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Rayquaza-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "{title}:",
        "text": "{title}: When 1 of your Pokémon becomes this Pokémon, heal all damage from it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Emerald Break",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30×",
        "text": "This attack does 30 damage times the number of your Benched Pokémon."
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
      384
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/xy/xy7/98/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/98/high.webp"
    }
  },
  {
    "id": "xy7-99",
    "name": "Energy Retrieval",
    "number": "99",
    "artist": "5ban Graphics",
    "rarity": "Rare Secret",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Put 2 basic Energy cards from your discard pile into your hand.",
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/99/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/99/high.webp"
    }
  },
  {
    "id": "xy7-100",
    "name": "Trainers' Mail",
    "number": "100",
    "artist": "Toyste Beach",
    "rarity": "Rare Secret",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Look at the top 4 cards of your deck. You may reveal a Trainer card you find there (except Trainers' Mail) and put it into your hand. Shuffle the other cards back into your deck.",
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
      "small": "https://assets.tcgdex.net/en/xy/xy7/100/low.webp",
      "large": "https://assets.tcgdex.net/en/xy/xy7/100/high.webp"
    }
  }
]

export default cardDetails
