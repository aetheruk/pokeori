import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "tk_dp_l-1",
    "name": "Geodude",
    "number": "1",
    "artist": "Ken Sugimori",
    "rarity": null,
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      74
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/tk/tk-dp-l/1/low.webp",
      "large": "https://assets.tcgdex.net/en/tk/tk-dp-l/1/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stone Throw",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 2 of your opponent's Benched Pokémon. This attack does 10 damage to each of them. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "+10"
      }
    ],
    "resistances": [
      {
        "type": "Lightning",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "flavorText": "Many live on mountain trails and remain half buried while keeping an eye on climbers",
    "legalities": {},
    "regulationMark": null
  },
  {
    "id": "tk_dp_l-2",
    "name": "Graveler",
    "number": "2",
    "artist": "Mitsuhiro Arita",
    "rarity": null,
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Geodude",
    "evolvesTo": [],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      75
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/tk/tk-dp-l/2/low.webp",
      "large": "https://assets.tcgdex.net/en/tk/tk-dp-l/2/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rock Cannon",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "Flip a coin until you get tails. This attack does 30 damage times the number of heads."
      },
      {
        "name": "Rock Slide",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "Does 10 damage to 2 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "+20"
      }
    ],
    "resistances": [
      {
        "type": "Lightning",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "flavorText": "GRAVELER make their homes on sheer cliff faces by gouging out numerous horizontal holes.",
    "legalities": {},
    "regulationMark": null
  },
  {
    "id": "tk_dp_l-3",
    "name": "Lucario",
    "number": "3",
    "artist": "Kent Kanetsuna",
    "rarity": null,
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Riolu",
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      448
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/tk/tk-dp-l/3/low.webp",
      "large": "https://assets.tcgdex.net/en/tk/tk-dp-l/3/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Feint",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This attack’s damage isn’t affected by Resistance."
      },
      {
        "name": "Aura Sphere",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Does 20 damage to 1 of your opponent’s Benched Pokémon. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "+20"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": "It has the ability to sense the auras of all things. It understands human speech.",
    "legalities": {},
    "regulationMark": null
  },
  {
    "id": "tk_dp_l-4",
    "name": "Machoke",
    "number": "4",
    "artist": "Kouki Saitou",
    "rarity": null,
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Machop",
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      67
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/tk/tk-dp-l/4/low.webp",
      "large": "https://assets.tcgdex.net/en/tk/tk-dp-l/4/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Karate Chop",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40-",
        "text": "Does 40 damage minus 10 damage for each damage counter on Machoke."
      },
      {
        "name": "Seismic Toss",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "+20"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "flavorText": "MACHOKE's boundless power is very dangerous, so it wears a belt that suppresses its energy.",
    "legalities": {},
    "regulationMark": null
  },
  {
    "id": "tk_dp_l-5",
    "name": "Machop",
    "number": "5",
    "artist": "Atsuko Nishida",
    "rarity": null,
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      66
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/tk/tk-dp-l/5/low.webp",
      "large": "https://assets.tcgdex.net/en/tk/tk-dp-l/5/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Low Kick",
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
        "value": "+10"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "flavorText": "It hefts a GRAVELER repeatedly to strengthen its entire body. It uses every type of martial arts.",
    "legalities": {},
    "regulationMark": null
  },
  {
    "id": "tk_dp_l-6",
    "name": "Riolu",
    "number": "6",
    "artist": "Ken Sugimori",
    "rarity": null,
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      447
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/tk/tk-dp-l/6/low.webp",
      "large": "https://assets.tcgdex.net/en/tk/tk-dp-l/6/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wild Kick",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If tails, this attack does nothing."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "+10"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": "The aura that emanates from its body intensifies to alert others if it is afraid or sad.",
    "legalities": {},
    "regulationMark": null
  },
  {
    "id": "tk_dp_l-7",
    "name": "Starly",
    "number": "7",
    "artist": "Ken Sugimori",
    "rarity": null,
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      396
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/tk/tk-dp-l/7/low.webp",
      "large": "https://assets.tcgdex.net/en/tk/tk-dp-l/7/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gust",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Quick Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 20 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "+10"
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
    "flavorText": "They flock in great numbers. Though small, they flap their wings with great power.",
    "legalities": {},
    "regulationMark": null
  },
  {
    "id": "tk_dp_l-8",
    "name": "Energy Search",
    "number": "8",
    "artist": "Kai Ishikawa",
    "rarity": null,
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [],
    "images": {
      "small": "https://assets.tcgdex.net/en/tk/tk-dp-l/8/low.webp",
      "large": "https://assets.tcgdex.net/en/tk/tk-dp-l/8/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null
  },
  {
    "id": "tk_dp_l-9",
    "name": "Potion",
    "number": "9",
    "artist": "Shin-ichi Yoshikawa",
    "rarity": null,
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [],
    "images": {
      "small": "https://assets.tcgdex.net/en/tk/tk-dp-l/9/low.webp",
      "large": "https://assets.tcgdex.net/en/tk/tk-dp-l/9/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null
  },
  {
    "id": "tk_dp_l-10",
    "name": "Quick Ball",
    "number": "10",
    "artist": "Ryo Ueda",
    "rarity": null,
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [],
    "images": {
      "small": "https://assets.tcgdex.net/en/tk/tk-dp-l/10/low.webp",
      "large": "https://assets.tcgdex.net/en/tk/tk-dp-l/10/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null
  },
  {
    "id": "tk_dp_l-11",
    "name": "Fighting Energy",
    "number": "11",
    "artist": null,
    "rarity": null,
    "supertype": "Energy",
    "subtypes": [
      "Basic"
    ],
    "hp": null,
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [],
    "images": {
      "small": "https://assets.tcgdex.net/en/tk/tk-dp-l/11/low.webp",
      "large": "https://assets.tcgdex.net/en/tk/tk-dp-l/11/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null
  }
]

export default cardDetails
