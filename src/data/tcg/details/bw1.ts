import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "bw1-1",
    "name": "Snivy",
    "number": "1",
    "artist": "Kagemaru Himeno",
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
      "Servine"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tackle",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Vine Whip",
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
    "resistances": [
      {
        "type": "Water",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      495
    ],
    "flavorText": "They photosynthesize by bathing their tails in sunlight. When they are not feeling well, their tails droop.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/1/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/1/high.webp"
    }
  },
  {
    "id": "bw1-2",
    "name": "Snivy",
    "number": "2",
    "artist": "5ban Graphics",
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
      "Servine"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Leaf Blade",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Flip a coin. If heads, this attack does 30 more damage."
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
        "type": "Water",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      495
    ],
    "flavorText": "They photosynthesize by bathing their tails in sunlight. When they are not feeling well, their tails droop.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/2/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/2/high.webp"
    }
  },
  {
    "id": "bw1-3",
    "name": "Servine",
    "number": "3",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Snivy",
    "evolvesTo": [
      "Serperior"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wrap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Tackle",
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
    "resistances": [
      {
        "type": "Water",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      496
    ],
    "flavorText": "They avoid attacks by sinking into the shadows of thick foliage. They retaliate with masterful whipping techniques.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/3/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/3/high.webp"
    }
  },
  {
    "id": "bw1-4",
    "name": "Servine",
    "number": "4",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Snivy",
    "evolvesTo": [
      "Serperior"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wring Out",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed and discard an Energy attached to the Defending Pokémon."
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
        "type": "Water",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      496
    ],
    "flavorText": "They avoid attacks by sinking into the shadows of thick foliage. They retaliate with masterful whipping techniques.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/4/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/4/high.webp"
    }
  },
  {
    "id": "bw1-5",
    "name": "Serperior",
    "number": "5",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Servine",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Vine Whip",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Leaf Storm",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Heal 20 damage from each of your Grass Pokémon."
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
        "type": "Water",
        "value": "-20"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      497
    ],
    "flavorText": "They raise their heads to intimidate opponents but only give it their all when fighting a powerful opponent.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/5/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/5/high.webp"
    }
  },
  {
    "id": "bw1-6",
    "name": "Serperior",
    "number": "6",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Servine",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Royal Heal",
        "text": "At any time between turns, heal 10 damage from each of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Leaf Tornado",
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
    "resistances": [
      {
        "type": "Water",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      497
    ],
    "flavorText": "They raise their heads to intimidate opponents but only give it their all when fighting a powerful opponent.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/6/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/6/high.webp"
    }
  },
  {
    "id": "bw1-7",
    "name": "Pansage",
    "number": "7",
    "artist": "sui",
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
      "Simisage"
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
        "name": "Vine Whip",
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
    "resistances": [
      {
        "type": "Water",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      511
    ],
    "flavorText": "It shares the leaf on its head with weary-looking Pokémon. These leaves are known to relieve stress.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/7/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/7/high.webp"
    }
  },
  {
    "id": "bw1-8",
    "name": "Simisage",
    "number": "8",
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
    "evolvesFrom": "Pansage",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Seed Bomb",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Fury Swipes",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "Flip 3 coins. This attack does 40 damage times the number of heads."
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
        "type": "Water",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      512
    ],
    "flavorText": "It attacks enemies with strikes of its thorn-covered tail. This Pokémon is wild tempered.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/8/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/8/high.webp"
    }
  },
  {
    "id": "bw1-9",
    "name": "Petilil",
    "number": "9",
    "artist": "Kagemaru Himeno",
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
      "Lilligant"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Magical Leaf",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, this attack does 10 more damage and heal 10 damage from this Pokémon."
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
        "type": "Water",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      548
    ],
    "flavorText": "Since they prefer moist, nutrient-rich soil, the areas where Petilil live are known to be good for growing plants.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/9/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/9/high.webp"
    }
  },
  {
    "id": "bw1-10",
    "name": "Lilligant",
    "number": "10",
    "artist": "Atsuko Nishida",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Petilil",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Petal Dance",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip 3 coins. This attack does 30 damage times the number of heads. This Pokémon is now Confused."
      },
      {
        "name": "Leaf Storm",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Heal 20 damage from each of your Grass Pokémon."
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
        "type": "Water",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      549
    ],
    "flavorText": "The fragrance of the garland on its head has a relaxing effect. It withers if a Trainer does not take good care of it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/10/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/10/high.webp"
    }
  },
  {
    "id": "bw1-11",
    "name": "Maractus",
    "number": "11",
    "artist": "Kagemaru Himeno",
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
        "name": "Mega Drain",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Heal 20 damage from this Pokémon."
      },
      {
        "name": "Pin Missile",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20",
        "text": "Flip 4 coins. This attack does 20 damage times the number of heads."
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
        "type": "Water",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/11/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/11/high.webp"
    }
  },
  {
    "id": "bw1-12",
    "name": "Maractus",
    "number": "12",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
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
        "name": "Constant Rattle",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip 3 coins. If 1 of them is heads, this attack does 10 damage. If 2 of them are heads, this attack does 30 damage. If all of them are heads, this attack does 60 damage."
      },
      {
        "name": "Giga Drain",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Heal from this Pokémon the same amount of damage you did to the Defending Pokémon."
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
        "type": "Water",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      556
    ],
    "flavorText": "Arid regions are their habitat. They move rhythmically, making a sound similar to maracas.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/12/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/12/high.webp"
    }
  },
  {
    "id": "bw1-13",
    "name": "Deerling",
    "number": "13",
    "artist": "Atsuko Nishida",
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
      "Sawsbuck"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Kick",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip 2 coins. This attack does 10 damage times the number of heads."
      },
      {
        "name": "Leech Seed",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Heal 10 damage from this Pokémon."
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
        "type": "Water",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      585
    ],
    "flavorText": "The color and scent of their fur changes to match the mountain grass. When they sense hostility, they hide in the grass.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/13/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/13/high.webp"
    }
  },
  {
    "id": "bw1-14",
    "name": "Sawsbuck",
    "number": "14",
    "artist": "Naoyo Kimura",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Deerling",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Nature Power",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Does 10 more damage for each Grass Energy attached to both your and your opponent's Pokémon."
      },
      {
        "name": "Horn Leech",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Heal 20 damage from this Pokémon."
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
        "type": "Water",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      586
    ],
    "flavorText": "They migrate according to the seasons. People can tell the season by looking at Sawsbuck's horns.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/14/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/14/high.webp"
    }
  },
  {
    "id": "bw1-15",
    "name": "Tepig",
    "number": "15",
    "artist": "Kouki Saitou",
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
      "Pignite"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tackle",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Rollout",
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
      498
    ],
    "flavorText": "It can deftly dodge its foe's attacks while shooting fireballs from its nose. It roasts berries before it eats them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/15/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/15/high.webp"
    }
  },
  {
    "id": "bw1-16",
    "name": "Tepig",
    "number": "16",
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
      "Pignite"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Take Down",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "This Pokémon does 10 damage to itself."
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
      498
    ],
    "flavorText": "It can deftly dodge its foe's attacks while shooting fireballs from its nose. It roasts berries before it eats them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/16/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/16/high.webp"
    }
  },
  {
    "id": "bw1-17",
    "name": "Pignite",
    "number": "17",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Tepig",
    "evolvesTo": [
      "Emboar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flame Charge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Fire Energy card and attach it to this Pokémon. Shuffle your deck afterward."
      },
      {
        "name": "Heat Crash",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      499
    ],
    "flavorText": "When its internal fire flares up, its movements grow sharper and faster. When in trouble, it emits smoke.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/17/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/17/high.webp"
    }
  },
  {
    "id": "bw1-18",
    "name": "Pignite",
    "number": "18",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Tepig",
    "evolvesTo": [
      "Emboar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rollout",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
        "damage": "70",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      499
    ],
    "flavorText": "When its internal fire flares up, its movements grow sharper and faster. When in trouble, it emits smoke.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/18/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/18/high.webp"
    }
  },
  {
    "id": "bw1-19",
    "name": "Emboar",
    "number": "19",
    "artist": "Kouki Saitou",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Pignite",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Heat Crash",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Flare Blitz",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "150",
        "text": "Discard all Fire Energy attached to this Pokémon."
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
      500
    ],
    "flavorText": "It can throw a fire punch by setting its fists on fire with its fiery chin. It cares deeply about its friends.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/19/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/19/high.webp"
    }
  },
  {
    "id": "bw1-20",
    "name": "Emboar",
    "number": "20",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Pignite",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Inferno Fandango",
        "text": "As often as you like during your turn (before your attack), you may attach a Fire Energy card from your hand to 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Heat Crash",
        "cost": [
          "Fire",
          "Fire",
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
      500
    ],
    "flavorText": "It can throw a fire punch by setting its fists on fire with its fiery chin. It cares deeply about its friends.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/20/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/20/high.webp"
    }
  },
  {
    "id": "bw1-21",
    "name": "Pansear",
    "number": "21",
    "artist": "match",
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
      "Simisear"
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
        "name": "Live Coal",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      513
    ],
    "flavorText": "When it is angered, the temperature of its head tuft reaches 600° F. It uses its tuft to roast berries.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/21/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/21/high.webp"
    }
  },
  {
    "id": "bw1-22",
    "name": "Simisear",
    "number": "22",
    "artist": "Shin Nagasawa",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Pansear",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flame Burst",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Does 20 damage to 2 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Fury Swipes",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "Flip 3 coins. This attack does 40 damage times the number of heads."
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
      514
    ],
    "flavorText": "It loves sweets because they become energy for the fire burning inside its body.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/22/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/22/high.webp"
    }
  },
  {
    "id": "bw1-23",
    "name": "Darumaka",
    "number": "23",
    "artist": "Kouki Saitou",
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
      "Darmanitan"
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
        "damage": "10",
        "text": "Flip a coin. If heads, this attack does 10 more damage."
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
      554
    ],
    "flavorText": "Darumaka's droppings are hot, so people used to put them in their clothes to keep themselves warm.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/23/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/23/high.webp"
    }
  },
  {
    "id": "bw1-24",
    "name": "Darumaka",
    "number": "24",
    "artist": "Masakazu Fukuda",
    "rarity": "Uncommon",
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
      "Darmanitan"
    ],
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
        "text": "The Defending Pokémon is now Burned."
      },
      {
        "name": "Rollout",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      554
    ],
    "flavorText": "Darumaka's droppings are hot, so people used to put them in their clothes to keep themselves warm.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/24/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/24/high.webp"
    }
  },
  {
    "id": "bw1-25",
    "name": "Darmanitan",
    "number": "25",
    "artist": "Naoki Saito",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Darumaka",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fire Fang",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "The Defending Pokémon is now Burned."
      },
      {
        "name": "Thrash",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Flip a coin. If heads, this attack does 20 more damage. If tails, this Pokémon does 20 damage to itself."
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
      555
    ],
    "flavorText": "When weakened in battle, it transforms into a stone statue, then it sharpens its mind and fights on mentally.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/25/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/25/high.webp"
    }
  },
  {
    "id": "bw1-26",
    "name": "Reshiram",
    "number": "26",
    "artist": "5ban Graphics",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Outrage",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Does 10 more damage for each damage counter on this Pokémon."
      },
      {
        "name": "Blue Flare",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Discard 2 Fire Energy attached to this Pokémon."
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
      643
    ],
    "flavorText": "This Pokémon appears in legends. It sends flames into the air from its tail, burning up everything around it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/26/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/26/high.webp"
    }
  },
  {
    "id": "bw1-27",
    "name": "Oshawott",
    "number": "27",
    "artist": "Masakazu Fukuda",
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
      "Dewott"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tackle",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Water Gun",
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
      501
    ],
    "flavorText": "The scalchop on its stomach is made from the same elements as claws. It detaches the scalchop for use as a blade.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/27/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/27/high.webp"
    }
  },
  {
    "id": "bw1-28",
    "name": "Oshawott",
    "number": "28",
    "artist": "5ban Graphics",
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
      "Dewott"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Razor Shell",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
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
      501
    ],
    "flavorText": "The scalchop on its stomach is made from the same elements as claws. It detaches the scalchop for use as a blade.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/28/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/28/high.webp"
    }
  },
  {
    "id": "bw1-29",
    "name": "Dewott",
    "number": "29",
    "artist": "Masakazu Fukuda",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Oshawott",
    "evolvesTo": [
      "Samurott"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Water Gun",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Razor Shell",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
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
      502
    ],
    "flavorText": "Scalchop techniques differ from one Dewott to another. It never neglects maintaining its scalchops.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/29/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/29/high.webp"
    }
  },
  {
    "id": "bw1-30",
    "name": "Dewott",
    "number": "30",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Oshawott",
    "evolvesTo": [
      "Samurott"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Aqua Tail",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin for each Water Energy attached to this Pokémon. This attack does 10 more damage for each heads."
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
      502
    ],
    "flavorText": "Scalchop techniques differ from one Dewott to another. It never neglects maintaining its scalchops.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/30/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/30/high.webp"
    }
  },
  {
    "id": "bw1-31",
    "name": "Samurott",
    "number": "31",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Dewott",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pike",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Surf",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
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
      503
    ],
    "flavorText": "Part of the armor on its anterior legs becomes a giant sword. Its cry alone is enough to intimidate most enemies.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/31/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/31/high.webp"
    }
  },
  {
    "id": "bw1-32",
    "name": "Samurott",
    "number": "32",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Dewott",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Shell Armor",
        "text": "Any damage done to this Pokémon by attacks is reduced by 20 (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hydro Pump",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Does 10 more damage for each Water Energy attached to this Pokémon."
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
      503
    ],
    "flavorText": "Part of the armor on its anterior legs becomes a giant sword. Its cry alone is enough to intimidate most enemies.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/32/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/32/high.webp"
    }
  },
  {
    "id": "bw1-33",
    "name": "Panpour",
    "number": "33",
    "artist": "Atsuko Nishida",
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
      "Simipour"
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
        "name": "Water Gun",
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
      515
    ],
    "flavorText": "It does not thrive in dry environments. It keeps itself damp by shooting water stored in its head tuft from its tail.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/33/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/33/high.webp"
    }
  },
  {
    "id": "bw1-34",
    "name": "Simipour",
    "number": "34",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Panpour",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scald",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "The Defending Pokémon is now Burned."
      },
      {
        "name": "Fury Swipes",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "Flip 3 coins. This attack does 40 damage times the number of heads."
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
      516
    ],
    "flavorText": "The high-pressure water expelled from its tail is so powerful, it can destroy a concrete wall.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/34/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/34/high.webp"
    }
  },
  {
    "id": "bw1-35",
    "name": "Basculin",
    "number": "35",
    "artist": "Naoyo Kimura",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Crunch",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, discard an Energy attached to the Defending Pokémon."
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
      550
    ],
    "flavorText": "Red and blue Basculin get along so poorly, they'll start fighting instantly. These Pokémon are very hostile.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/35/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/35/high.webp"
    }
  },
  {
    "id": "bw1-36",
    "name": "Ducklett",
    "number": "36",
    "artist": "Kagemaru Himeno",
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
      "Swanna"
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
      580
    ],
    "flavorText": "These bird Pokémon are excellent divers. They swim around in the water eating their favorite food—peat moss.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/36/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/36/high.webp"
    }
  },
  {
    "id": "bw1-37",
    "name": "Swanna",
    "number": "37",
    "artist": "Naoyo Kimura",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Ducklett",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Feather Dance",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your next turn, each of this Pokémon's attacks does 40 more damage(before applying Weakness and Resistance)."
      },
      {
        "name": "Aqua Ring",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
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
      581
    ],
    "flavorText": "Swanna start to dance at dusk. The one dancing in the middle is the leader of the flock.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/37/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/37/high.webp"
    }
  },
  {
    "id": "bw1-38",
    "name": "Alomomola",
    "number": "38",
    "artist": "sui",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pound",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Wave Splash",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "60",
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
      594
    ],
    "flavorText": "Floating in the open sea is how they live. When they find a wounded Pokémon, they embrace it and bring it to shore.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/38/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/38/high.webp"
    }
  },
  {
    "id": "bw1-39",
    "name": "Alomomola",
    "number": "39",
    "artist": "Naoyo Kimura",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Water Pulse",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Hydro Pump",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "Does 10 more damage for each Water Energy attached to this Pokémon."
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
      594
    ],
    "flavorText": "Floating in the open sea is how they live. When they find a wounded Pokémon, they embrace it and bring it to shore.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/39/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/39/high.webp"
    }
  },
  {
    "id": "bw1-40",
    "name": "Blitzle",
    "number": "40",
    "artist": "Kouki Saitou",
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
      "Zebstrika"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rear Kick",
        "cost": [
          "Lightning",
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
      522
    ],
    "flavorText": "When thunderclouds cover the sky, it will appear. It can catch lightning with its mane and store the electricity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/40/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/40/high.webp"
    }
  },
  {
    "id": "bw1-41",
    "name": "Blitzle",
    "number": "41",
    "artist": "Kagemaru Himeno",
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
      "Zebstrika"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stomp",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, this attack does 10 more damage."
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
      522
    ],
    "flavorText": "Its mane shines when it discharges electricity. They use their flashing manes to communicate with one another.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/41/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/41/high.webp"
    }
  },
  {
    "id": "bw1-42",
    "name": "Zebstrika",
    "number": "42",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Blitzle",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stomp",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
      },
      {
        "name": "Wild Charge",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "This Pokémon does 10 damage to itself."
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
      523
    ],
    "flavorText": "This ill-tempered Pokémon is dangerous because when it's angry, it shoots lightning from its mane in all directions.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/42/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/42/high.webp"
    }
  },
  {
    "id": "bw1-43",
    "name": "Zebstrika",
    "number": "43",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Blitzle",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rear Kick",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Electrispark",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Does 10 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      523
    ],
    "flavorText": "They have lightning-like movements. When Zebstrika run at full speed, the sound of thunder reverberates.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/43/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/43/high.webp"
    }
  },
  {
    "id": "bw1-44",
    "name": "Joltik",
    "number": "44",
    "artist": "Kouki Saitou",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Galvantula"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stun Needle",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
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
      595
    ],
    "flavorText": "They attach themselves to large-bodied Pokémon and absorb static electricity, which they store in an electric pouch.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/44/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/44/high.webp"
    }
  },
  {
    "id": "bw1-45",
    "name": "Joltik",
    "number": "45",
    "artist": "Masakazu Fukuda",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "30",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Galvantula"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Leech Life",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Heal from this Pokémon the same amount of damage you did to the Defending Pokémon."
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
      595
    ],
    "flavorText": "They attach themselves to large-bodied Pokémon and absorb static electricity, which they store in an electric pouch.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/45/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/45/high.webp"
    }
  },
  {
    "id": "bw1-46",
    "name": "Galvantula",
    "number": "46",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Joltik",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Electroweb",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      },
      {
        "name": "Leech Life",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Heal from this Pokémon the same amount of damage you did to the Defending Pokémon."
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
      596
    ],
    "flavorText": "They employ an electrically charged web to trap their prey. While it is immobilized by shock, they leisurely consume it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/46/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/46/high.webp"
    }
  },
  {
    "id": "bw1-47",
    "name": "Zekrom",
    "number": "47",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "130",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Outrage",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Does 10 more damage for each damage counter on this Pokémon."
      },
      {
        "name": "Bolt Strike",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This Pokémon does 40 damage to itself."
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
      644
    ],
    "flavorText": "This Pokémon appears in legends. In its tail, it has a giant generator that creates electricity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/47/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/47/high.webp"
    }
  },
  {
    "id": "bw1-48",
    "name": "Munna",
    "number": "48",
    "artist": "Atsuko Nishida",
    "rarity": "Uncommon",
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
      "Musharna"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hypnosis",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Dream Eater",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "If the Defending Pokémon is not Asleep, this attack does nothing."
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
      517
    ],
    "flavorText": "Munna always float in the air. People whose dreams are eaten by them forget what the dreams had been about.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/48/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/48/high.webp"
    }
  },
  {
    "id": "bw1-49",
    "name": "Musharna",
    "number": "49",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Munna",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hypnotic Ray",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Dream Eater",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "90",
        "text": "If the Defending Pokémon is not Asleep, this attack does nothing."
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
      518
    ],
    "flavorText": "The mist emanating from their foreheads is packed with the dreams of people and Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/49/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/49/high.webp"
    }
  },
  {
    "id": "bw1-50",
    "name": "Woobat",
    "number": "50",
    "artist": "MAHOU",
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
      "Swoobat"
    ],
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
      527
    ],
    "flavorText": "Its habitat is dark forests and caves. It emits ultrasonic waves from its nose to learn about its surroundings.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/50/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/50/high.webp"
    }
  },
  {
    "id": "bw1-51",
    "name": "Swoobat",
    "number": "51",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Woobat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Attract",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If the Defending Pokémon tries to attack during your opponent's next turn, your opponent flips a coin. If tails, that attack does nothing."
      },
      {
        "name": "Heart Stamp",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
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
      528
    ],
    "flavorText": "It emits sound waves of various frequencies from its nose, including some powerful enough to destroy rocks.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/51/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/51/high.webp"
    }
  },
  {
    "id": "bw1-52",
    "name": "Venipede",
    "number": "52",
    "artist": "Masakazu Fukuda",
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
      "Whirlipede"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ram",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Rollout",
        "cost": [
          "Colorless",
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
      543
    ],
    "flavorText": "Its bite injects a potent poison, enough to paralyze large bird Pokémon that try to prey on it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/52/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/52/high.webp"
    }
  },
  {
    "id": "bw1-53",
    "name": "Whirlipede",
    "number": "53",
    "artist": "Masakazu Fukuda",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Venipede",
    "evolvesTo": [
      "Scolipede"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Sting",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "The Defending Pokémon is now Poisoned."
      },
      {
        "name": "Rollout",
        "cost": [
          "Psychic",
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
      544
    ],
    "flavorText": "Protected by a hard shell, it spins its body like a wheel and crashes furiously into its enemies.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/53/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/53/high.webp"
    }
  },
  {
    "id": "bw1-54",
    "name": "Scolipede",
    "number": "54",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Whirlipede",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Steamroller",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "This attack's damage isn't affected by Resistance."
      },
      {
        "name": "Poison Claws",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "The Defending Pokémon is now Poisoned."
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
      545
    ],
    "flavorText": "Highly aggressive, it uses the claws near its neck to dig into its opponent and poison them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/54/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/54/high.webp"
    }
  },
  {
    "id": "bw1-55",
    "name": "Solosis",
    "number": "55",
    "artist": "MAHOU",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "30",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Duosion"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Cell Culture",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for Solosis and put it onto your Bench. Shuffle your deck afterward."
      },
      {
        "name": "Rollout",
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
      577
    ],
    "flavorText": "Because their bodies are enveloped in a special liquid, they can survive in any environment.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/55/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/55/high.webp"
    }
  },
  {
    "id": "bw1-56",
    "name": "Duosion",
    "number": "56",
    "artist": "Shin Nagasawa",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Solosis",
    "evolvesTo": [
      "Reuniclus"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Recover",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard an Energy attached to this Pokémon and heal all damage from this Pokémon."
      },
      {
        "name": "Rollout",
        "cost": [
          "Psychic",
          "Colorless"
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      578
    ],
    "flavorText": "When their brains, now divided in two, are thinking the same thought, these Pokémon exhibit their maximum power.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/56/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/56/high.webp"
    }
  },
  {
    "id": "bw1-57",
    "name": "Reuniclus",
    "number": "57",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Duosion",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Damage Swap",
        "text": "As often as you like during your turn (before your attack), you may move 1 damage counter from 1 of your Pokémon to another of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Psywave",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "Does 10 more damage for each Energy attached to the Defending Pokémon."
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
      579
    ],
    "flavorText": "These remarkably intelligent Pokémon fight by controlling arms that can grip with rock-crushing power.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/57/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/57/high.webp"
    }
  },
  {
    "id": "bw1-58",
    "name": "Timburr",
    "number": "58",
    "artist": "match",
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
      "Gurdurr"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pound",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      532
    ],
    "flavorText": "It fights by swinging a piece of timber around. It is close to evolving when it can handle the lumber without difficulty.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/58/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/58/high.webp"
    }
  },
  {
    "id": "bw1-59",
    "name": "Timburr",
    "number": "59",
    "artist": "Masakazu Fukuda",
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
      "Gurdurr"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Low Kick",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Pound",
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
      532
    ],
    "flavorText": "These Pokémon appear at building sites and help out with construction. They always carry squared logs.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/59/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/59/high.webp"
    }
  },
  {
    "id": "bw1-60",
    "name": "Gurdurr",
    "number": "60",
    "artist": "Naoki Saito",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Timburr",
    "evolvesTo": [
      "Conkeldurr"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bulk Up",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "During your next turn, each of this Pokémon's attacks does 20 more damage (before applying Weakness and Resistance)."
      },
      {
        "name": "Pound",
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
      533
    ],
    "flavorText": "They strengthen their bodies by carrying steel beams. They show off their big muscles to their friends.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/60/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/60/high.webp"
    }
  },
  {
    "id": "bw1-61",
    "name": "Throh",
    "number": "61",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Circle Throw",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon."
      },
      {
        "name": "Storm Throw",
        "cost": [
          "Fighting",
          "Fighting",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      538
    ],
    "flavorText": "When they encounter foes bigger than themselves, they try to throw them. They always travel in packs of five.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/61/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/61/high.webp"
    }
  },
  {
    "id": "bw1-62",
    "name": "Sawk",
    "number": "62",
    "artist": "Naoki Saito",
    "rarity": "Rare",
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
        "name": "Low Sweep",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Beatdown",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
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
      539
    ],
    "flavorText": "The sound of Sawk punching boulders and trees can be heard all the way from the mountains where they train.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/62/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/62/high.webp"
    }
  },
  {
    "id": "bw1-63",
    "name": "Sandile",
    "number": "63",
    "artist": "Naoyo Kimura",
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
      "Krokorok"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sand Tomb",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      },
      {
        "name": "Bite",
        "cost": [
          "Fighting",
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/63/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/63/high.webp"
    }
  },
  {
    "id": "bw1-64",
    "name": "Krokorok",
    "number": "64",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Sandile",
    "evolvesTo": [
      "Krookodile"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Torment",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Choose 1 of the Defending Pokémon's attacks. That Pokémon can't use that attack during your opponent's next turn."
      },
      {
        "name": "Bite",
        "cost": [
          "Fighting",
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
        "type": "Water",
        "value": "×2"
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
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      552
    ],
    "flavorText": "The special membrane covering its eyes can sense the heat of objects, so it can see its surroundings even in darkness.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/64/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/64/high.webp"
    }
  },
  {
    "id": "bw1-65",
    "name": "Krookodile",
    "number": "65",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Krokorok",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Torment",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Choose 1 of the Defending Pokémon's attacks. That Pokémon can't use that attack during your opponent's next turn."
      },
      {
        "name": "Krookoroll",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "60",
        "text": "If the Defending Pokémon already has any damage counters on it, this attack does 40 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
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
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      553
    ],
    "flavorText": "It can expand the focus of its eyes, enabling it to see objects in the far distance as if it were using binoculars.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/65/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/65/high.webp"
    }
  },
  {
    "id": "bw1-66",
    "name": "Purrloin",
    "number": "66",
    "artist": "Kagemaru Himeno",
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
      "Liepard"
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
      509
    ],
    "flavorText": "Its cute act is a ruse. When victims let down their guard, they find their items taken. It attacks with sharp claws.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/66/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/66/high.webp"
    }
  },
  {
    "id": "bw1-67",
    "name": "Liepard",
    "number": "67",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Purrloin",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Taunt",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch the Defending Pokémon with 1 of your opponent's Benched Pokémon."
      },
      {
        "name": "Sucker Punch",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "If this Pokémon has any Darkness Energy attached to it, this attack does 30 more damage."
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
      510
    ],
    "flavorText": "Stealthily, it sneaks up on its target, striking from behind before its victim has a chance to react.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/67/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/67/high.webp"
    }
  },
  {
    "id": "bw1-68",
    "name": "Scraggy",
    "number": "68",
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
      "Scrafty"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Headbutt",
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
      559
    ],
    "flavorText": "Its skin has a rubbery elasticity, so it can reduce damage by defensively pulling its skin up to its neck.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/68/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/68/high.webp"
    }
  },
  {
    "id": "bw1-69",
    "name": "Scrafty",
    "number": "69",
    "artist": "Shin Nagasawa",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Scraggy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spit Acid",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "The Defending Pokémon is now Burned. Flip a coin. If heads, the Defending Pokémon is also Paralyzed."
      },
      {
        "name": "High Jump Kick",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
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
      560
    ],
    "flavorText": "Groups of them beat up anything that enters their territory. Each can spit acidic liquid from its mouth.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/69/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/69/high.webp"
    }
  },
  {
    "id": "bw1-70",
    "name": "Zorua",
    "number": "70",
    "artist": "Kouki Saitou",
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
      "Zoroark"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
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
      570
    ],
    "flavorText": "To protect themselves from danger, they hide their true identities by transforming into people and Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/70/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/70/high.webp"
    }
  },
  {
    "id": "bw1-71",
    "name": "Zoroark",
    "number": "71",
    "artist": "Naoki Saito",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Zorua",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Nasty Plot",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a card and put it into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Foul Play",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of the Defending Pokémon's attacks and use it as this attack."
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
      571
    ],
    "flavorText": "Each has the ability to fool a large group of people simultaneously. They protect their lair with illusory scenery.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/71/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/71/high.webp"
    }
  },
  {
    "id": "bw1-72",
    "name": "Vullaby",
    "number": "72",
    "artist": "Kagemaru Himeno",
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
      "Mandibuzz"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Surprise Attack",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If tails, this attack does nothing."
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
      629
    ],
    "flavorText": "Its wings are too tiny to allow it to fly. As the time approaches for it to evolve, it discards the bones it was wearing.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/72/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/72/high.webp"
    }
  },
  {
    "id": "bw1-73",
    "name": "Mandibuzz",
    "number": "73",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Vullaby",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Blindside",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Does 50 damage to 1 of your opponent's Pokémon that has any damage counters on it. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Punishment",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "If the Defending Pokémon is a Stage 2 Pokémon, this attack does 60 more damage."
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
      630
    ],
    "flavorText": "It makes a nest out of bones it finds. It grabs weakened prey in its talons and hauls it to its nest of bones.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/73/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/73/high.webp"
    }
  },
  {
    "id": "bw1-74",
    "name": "Klink",
    "number": "74",
    "artist": "Masakazu Fukuda",
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
      "Klang"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bind",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
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
      599
    ],
    "flavorText": "The two minigears that mesh together are predetermined. Each will rebound from other minigears without meshing.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/74/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/74/high.webp"
    }
  },
  {
    "id": "bw1-75",
    "name": "Klang",
    "number": "75",
    "artist": "Naoki Saito",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Klink",
    "evolvesTo": [
      "Klinklang"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bind",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Gear Grind",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Flip 2 coins. This attack does 60 damage times the number of heads."
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
      600
    ],
    "flavorText": "By changing the direction in which it rotates, it communicates its feelings to others. When angry, it rotates faster.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/75/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/75/high.webp"
    }
  },
  {
    "id": "bw1-76",
    "name": "Klinklang",
    "number": "76",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Klang",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Shift Gear",
        "text": "As often as you would like during your turn (before your attack), you may move a Metal Energy attached to 1 of your Pokémon to another of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Gear Grind",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Flip 2 coins. This attack does 80 damage times the number of heads."
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
      601
    ],
    "flavorText": "Its red core functions as an energy tank. It fires the charged energy through its spikes into an area.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/76/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/76/high.webp"
    }
  },
  {
    "id": "bw1-77",
    "name": "Patrat",
    "number": "77",
    "artist": "Kagemaru Himeno",
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
      "Watchog"
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
        "name": "Bite",
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
      504
    ],
    "flavorText": "Using food stored in cheek pouches, they can keep watches for days. They use their tails to communicate with others.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/77/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/77/high.webp"
    }
  },
  {
    "id": "bw1-78",
    "name": "Patrat",
    "number": "78",
    "artist": "Masakazu Fukuda",
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
      "Watchog"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hyper Fang",
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
      504
    ],
    "flavorText": "Extremely cautious, they take shifts to maintain a constant watch of their nest. They feel insecure without a lookout.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/78/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/78/high.webp"
    }
  },
  {
    "id": "bw1-79",
    "name": "Watchog",
    "number": "79",
    "artist": "match",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Patrat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Confuse Ray",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "The Defending Pokémon is now Confused."
      },
      {
        "name": "Hyper Fang",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
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
      505
    ],
    "flavorText": "They make the patterns on their bodies shine in order to threaten predators. Keen eyesight lets them see in the dark.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/79/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/79/high.webp"
    }
  },
  {
    "id": "bw1-80",
    "name": "Lillipup",
    "number": "80",
    "artist": "Masakazu Fukuda",
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
      "Herdier"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pickup",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put an Item card from your discard pile into your hand."
      },
      {
        "name": "Bite",
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
      506
    ],
    "flavorText": "It faces strong opponents with great courage. But, when at a disadvantage in a fight, this intelligent Pokémon flees.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/80/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/80/high.webp"
    }
  },
  {
    "id": "bw1-81",
    "name": "Lillipup",
    "number": "81",
    "artist": "sui",
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
      "Herdier"
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
        "name": "Tackle",
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
      506
    ],
    "flavorText": "The long hair around its face provides an amazing radar that lets it sense subtle changes in its surroundings.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/81/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/81/high.webp"
    }
  },
  {
    "id": "bw1-82",
    "name": "Herdier",
    "number": "82",
    "artist": "Midori Harada",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Lillipup",
    "evolvesTo": [
      "Stoutland"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Collect",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Draw 3 cards."
      },
      {
        "name": "Bite",
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
      507
    ],
    "flavorText": "It loyally follows its Trainer's orders. For ages, they have helped Trainers raise Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/82/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/82/high.webp"
    }
  },
  {
    "id": "bw1-83",
    "name": "Stoutland",
    "number": "83",
    "artist": "match",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Herdier",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Odor Sleuth",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip 3 coins. For each heads, put a card from your discard pile into your hand."
      },
      {
        "name": "Giga Impact",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "90",
        "text": "This Pokémon can't attack during your next turn."
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
      508
    ],
    "flavorText": "This extremely wise Pokémon excels at rescuing people stranded at sea or in the mountains.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/83/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/83/high.webp"
    }
  },
  {
    "id": "bw1-84",
    "name": "Pidove",
    "number": "84",
    "artist": "Masakazu Fukuda",
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
      "Tranquill"
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
        "damage": "10",
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
      519
    ],
    "flavorText": "Each follows its Trainer's orders as best it can, but they sometimes fail to understand complicated commands.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/84/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/84/high.webp"
    }
  },
  {
    "id": "bw1-85",
    "name": "Tranquill",
    "number": "85",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Pidove",
    "evolvesTo": [
      "Unfezant"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gust",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Quick Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, this attack does 30 more damage."
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
      520
    ],
    "flavorText": "It can return to its Trainer's location regardless of the distance separating them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/85/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/85/high.webp"
    }
  },
  {
    "id": "bw1-86",
    "name": "Unfezant",
    "number": "86",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "120",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Tranquill",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fly",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Flip a coin. If tails, this attack does nothing. If heads, prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn."
      },
      {
        "name": "Cutting Wind",
        "cost": [
          "Colorless",
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
      521
    ],
    "flavorText": "Males swing their head plumage to threaten opponents. The females' flying abilities surpass those of the males.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/86/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/86/high.webp"
    }
  },
  {
    "id": "bw1-87",
    "name": "Audino",
    "number": "87",
    "artist": "MAHOU",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Doubleslap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      531
    ],
    "flavorText": "It touches others with the feelers on its ears, using the sound of their heartbeats to tell how they are feeling.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/87/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/87/high.webp"
    }
  },
  {
    "id": "bw1-88",
    "name": "Minccino",
    "number": "88",
    "artist": "sui",
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
      "Cinccino"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tail Slap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip 2 coins. This attack does 10 damage times the number of heads."
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
      572
    ],
    "flavorText": "They greet one another by rubbing each other with their tails, which are always kept well groomed and clean.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/88/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/88/high.webp"
    }
  },
  {
    "id": "bw1-89",
    "name": "Cinccino",
    "number": "89",
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
    "evolvesFrom": "Minccino",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tail Slap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip 2 coins. This attack does 20 damage times the number of heads."
      },
      {
        "name": "Do the Wave",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Does 20 damage times the number of your Benched Pokémon."
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
      573
    ],
    "flavorText": "Their white fur is coated in a special oil that makes it easy for them to deflect attacks.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/89/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/89/high.webp"
    }
  },
  {
    "id": "bw1-90",
    "name": "Bouffalant",
    "number": "90",
    "artist": "Naoki Saito",
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
        "name": "Horn Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Double Stomp",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "Flip 2 coins. This attack does 20 more damage for each heads."
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
      626
    ],
    "flavorText": "They charge wildly and headbutt everything. Their headbutts have enough destructive force to derail a train.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/90/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/90/high.webp"
    }
  },
  {
    "id": "bw1-91",
    "name": "Bouffalant",
    "number": "91",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
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
        "name": "Revenge",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "If any of your Pokémon were Knocked Out by damage from an opponent's attack during his or her last turn, this attack does 70 more damage."
      },
      {
        "name": "Head Charge",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "Flip a coin. If tails, this Pokémon does 20 damage to itself."
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
      626
    ],
    "flavorText": "Their fluffy fur absorbs damage, even if they strike foes with a fierce headbutt.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/91/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/91/high.webp"
    }
  },
  {
    "id": "bw1-92",
    "name": "Energy Retrieval",
    "number": "92",
    "artist": "Kent Kanetsuna",
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/92/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/92/high.webp"
    }
  },
  {
    "id": "bw1-93",
    "name": "Energy Search",
    "number": "93",
    "artist": "Ryo Ueda",
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
      "Search your deck for a basic Energy card, reveal it, and put it into your hand. Shuffle your deck afterward.",
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/93/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/93/high.webp"
    }
  },
  {
    "id": "bw1-94",
    "name": "Energy Switch",
    "number": "94",
    "artist": "Kent Kanetsuna",
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
      "Move a basic Energy from 1 of your Pokémon to another of your Pokémon.",
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/94/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/94/high.webp"
    }
  },
  {
    "id": "bw1-95",
    "name": "Full Heal",
    "number": "95",
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
      "Remove all Special Conditions from your Active Pokémon.",
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/95/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/95/high.webp"
    }
  },
  {
    "id": "bw1-96",
    "name": "PlusPower",
    "number": "96",
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
      "During this turn, your Pokémon's attacks do 10 more damage to the Active Pokémon (before applying Weakness and Resistance).",
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/96/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/96/high.webp"
    }
  },
  {
    "id": "bw1-97",
    "name": "Poké Ball",
    "number": "97",
    "artist": "Yuri Umemura",
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
      "Flip a coin. If heads, search your deck for a Pokémon, reveal it, and put it into your hand. Shuffle your deck afterward.",
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/97/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/97/high.webp"
    }
  },
  {
    "id": "bw1-98",
    "name": "Pokédex",
    "number": "98",
    "artist": "Noriko Hotta",
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
      "Look at the top 5 cards of your deck and put them back on top of your deck in any order.",
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/98/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/98/high.webp"
    }
  },
  {
    "id": "bw1-99",
    "name": "Pokémon Communication",
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
      "Reveal a Pokémon in your hand and put it on top of your deck. If you do, search your deck for a Pokémon, reveal it, and put it into your hand. Shuffle your deck afterward.",
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/99/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/99/high.webp"
    }
  },
  {
    "id": "bw1-100",
    "name": "Potion",
    "number": "100",
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
      "Heal 30 damage from 1 of your Pokémon.",
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/100/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/100/high.webp"
    }
  },
  {
    "id": "bw1-101",
    "name": "Professor Juniper",
    "number": "101",
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
      "Discard your hand and draw 7 cards.",
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/101/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/101/high.webp"
    }
  },
  {
    "id": "bw1-102",
    "name": "Revive",
    "number": "102",
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
      "Put a Basic Pokémon from your discard pile onto your Bench.",
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/102/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/102/high.webp"
    }
  },
  {
    "id": "bw1-103",
    "name": "Super Scoop Up",
    "number": "103",
    "artist": "Daisuke Iwamoto",
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
      "Flip a coin. If heads, put 1 of your Pokémon and all cards attached to it into your hand.",
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/103/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/103/high.webp"
    }
  },
  {
    "id": "bw1-104",
    "name": "Switch",
    "number": "104",
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
      "Switch your Active Pokémon with 1 of your Benched Pokémon.",
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/104/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/104/high.webp"
    }
  },
  {
    "id": "bw1-105",
    "name": "Grass Energy",
    "number": "105",
    "artist": null,
    "rarity": "Common",
    "supertype": "Energy",
    "subtypes": [
      "Basic"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/105/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/105/high.webp"
    }
  },
  {
    "id": "bw1-106",
    "name": "Fire Energy",
    "number": "106",
    "artist": null,
    "rarity": "Common",
    "supertype": "Energy",
    "subtypes": [
      "Basic"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/106/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/106/high.webp"
    }
  },
  {
    "id": "bw1-107",
    "name": "Water Energy",
    "number": "107",
    "artist": null,
    "rarity": "Common",
    "supertype": "Energy",
    "subtypes": [
      "Basic"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/107/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/107/high.webp"
    }
  },
  {
    "id": "bw1-108",
    "name": "Lightning Energy",
    "number": "108",
    "artist": null,
    "rarity": "Common",
    "supertype": "Energy",
    "subtypes": [
      "Basic"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/108/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/108/high.webp"
    }
  },
  {
    "id": "bw1-109",
    "name": "Psychic Energy",
    "number": "109",
    "artist": null,
    "rarity": "Common",
    "supertype": "Energy",
    "subtypes": [
      "Basic"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/109/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/109/high.webp"
    }
  },
  {
    "id": "bw1-110",
    "name": "Fighting Energy",
    "number": "110",
    "artist": null,
    "rarity": "Common",
    "supertype": "Energy",
    "subtypes": [
      "Basic"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/110/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/110/high.webp"
    }
  },
  {
    "id": "bw1-111",
    "name": "Darkness Energy",
    "number": "111",
    "artist": null,
    "rarity": "Common",
    "supertype": "Energy",
    "subtypes": [
      "Basic"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/111/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/111/high.webp"
    }
  },
  {
    "id": "bw1-112",
    "name": "Metal Energy",
    "number": "112",
    "artist": null,
    "rarity": "Common",
    "supertype": "Energy",
    "subtypes": [
      "Basic"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
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
      "small": "https://assets.tcgdex.net/en/bw/bw1/112/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/112/high.webp"
    }
  },
  {
    "id": "bw1-113",
    "name": "Reshiram",
    "number": "113",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
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
        "name": "Outrage",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Does 10 more damage for each damage counter on this Pokémon."
      },
      {
        "name": "Blue Flare",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Discard 2 Fire Energy attached to this Pokémon."
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
      643
    ],
    "flavorText": "This Pokémon appears in legends. It sends flames into the air from its tail, burning up everything around it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/113/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/113/high.webp"
    }
  },
  {
    "id": "bw1-114",
    "name": "Zekrom",
    "number": "114",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "130",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Outrage",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Does 10 more damage for each damage counter on this Pokémon."
      },
      {
        "name": "Bolt Strike",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This Pokémon does 40 damage to itself."
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
      644
    ],
    "flavorText": "This Pokémon appears in legends. In its tail, it has a giant generator that creates electricity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/114/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/114/high.webp"
    }
  },
  {
    "id": "bw1-115",
    "name": "Pikachu",
    "number": "115",
    "artist": "Kouki Saitou",
    "rarity": "Rare Secret",
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
      "Raichu"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Energize",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach a Lightning Energy card from your discard pile to this Pokémon."
      },
      {
        "name": "Thunderbolt",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Discard all Energy attached to this Pokémon."
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
      25
    ],
    "flavorText": "This is an extremely rare Pikachu card. You're very lucky to have found it!",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/bw/bw1/115/low.webp",
      "large": "https://assets.tcgdex.net/en/bw/bw1/115/high.webp"
    }
  }
]

export default cardDetails
