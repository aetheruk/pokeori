import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "sm10-1",
    "name": "Pheromosa & Buzzwole-GX",
    "number": "1",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX",
      "Ultra Beast"
    ],
    "hp": "260",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Jet Punch",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This attack does 30 damage to 1 of your opponent’s Benched Pokémon. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Elegant Sole",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "190",
        "text": "During your next turn, this Pokémon’s Elegant Sole attack’s base damage is 60."
      },
      {
        "name": "Beast Game GX",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "If your opponent’s Pokémon is Knocked Out by damage from this attack, take 1 more Prize card. If this Pokémon has at least 7 extra Energy attached to it (in addition to this attack’s cost), take 3 more Prize cards instead. (You can’t use more than 1 GX attack in a game.)"
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
      794,
      795
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/1/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/1/high.webp"
    }
  },
  {
    "id": "sm10-2",
    "name": "Caterpie",
    "number": "2",
    "artist": "Shibuzoh.",
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
        "name": "Pupate",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, search your deck for a card that evolves from this Pokémon and put it onto this Pokémon to evolve it. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hook",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
    "flavorText": "Perhaps because it would like to grow up quickly, it has a voracious appetite, eating a hundred leaves a day.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/2/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/2/high.webp"
    }
  },
  {
    "id": "sm10-3",
    "name": "Metapod",
    "number": "3",
    "artist": "Shigenori Negishi",
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
        "name": "Emerge",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, search your deck for a card that evolves from this Pokémon and put it onto this Pokémon to evolve it. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Bug Bite",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      11
    ],
    "flavorText": "Its shell is filled with a thick liquid. All of the cells throughout its body are being rebuilt in preparation for evolution.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/3/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/3/high.webp"
    }
  },
  {
    "id": "sm10-4",
    "name": "Butterfree",
    "number": "4",
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
    "evolvesFrom": "Metapod",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Triple Charge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 basic Energy cards and attach them to your Pokémon in any way you like. Then, shuffle your deck."
      },
      {
        "name": "Solar Beam",
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
      12
    ],
    "flavorText": "Its wings are covered in toxic scales. If it finds bird Pokémon going after Caterpie, Butterfree sprinkles its scales on them to drive them off.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/4/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/4/high.webp"
    }
  },
  {
    "id": "sm10-5",
    "name": "Oddish",
    "number": "5",
    "artist": "0313",
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
        "name": "Stun Spore",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, your opponent’s Active Pokémon is now Paralyzed."
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
      43
    ],
    "flavorText": "During the day, It stays in the cold underground to avoid the sun. It grows by bathing in moonlight.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/5/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/5/high.webp"
    }
  },
  {
    "id": "sm10-6",
    "name": "Oddish",
    "number": "6",
    "artist": "Asako Ito",
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
      "Gloom"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hook",
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
      43
    ],
    "flavorText": "During the day, It stays in the cold underground to avoid the sun. It grows by bathing in moonlight.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/6/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/6/high.webp"
    }
  },
  {
    "id": "sm10-7",
    "name": "Gloom",
    "number": "7",
    "artist": "Anesaki Dynamic",
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
    "abilities": [
      {
        "name": "Irresistible Aroma",
        "text": "Once during your turn (before your attack), if your opponent’s Bench isn’t full, you may flip a coin. If heads, your opponent reveals their hand. Put a Basic Pokémon you find there onto their Bench.",
        "type": "Ability"
      }
    ],
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      44
    ],
    "flavorText": "Smells incredibly foul! However, around one out of a thousand people enjoy sniffing its nose-bending stink.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/7/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/7/high.webp"
    }
  },
  {
    "id": "sm10-8",
    "name": "Vileplume",
    "number": "8",
    "artist": "Suwama Chiaki",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Gloom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Varied Pollen",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, choose Asleep, Burned, Confused, or Poisoned. Your opponent’s Active Pokémon is now affected by that Special Condition.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Giant Bloom",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      45
    ],
    "flavorText": "The larger its petals, the more toxic pollen it contains. Its big head is heavy and hard to hold up.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/8/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/8/high.webp"
    }
  },
  {
    "id": "sm10-9",
    "name": "Venonat",
    "number": "9",
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
      "Venomoth"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Radar Eyes",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 7 cards of your deck and put 1 of them into your hand. Shuffle the other cards back into your deck."
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
      48
    ],
    "flavorText": "Its big eyes are actually clusters of tiny eyes. At night, its kind is drawn by light.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/9/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/9/high.webp"
    }
  },
  {
    "id": "sm10-10",
    "name": "Venonat",
    "number": "10",
    "artist": "Yuka Morii",
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
      "Venomoth"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psybeam",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Your opponent’s Active Pokémon is now Confused."
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
      48
    ],
    "flavorText": "Its big eyes are actually clusters of tiny eyes. At night, its kind is drawn by light.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/10/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/10/high.webp"
    }
  },
  {
    "id": "sm10-11",
    "name": "Venomoth",
    "number": "11",
    "artist": "Mina Nakai",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Venonat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Assassin Flight",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "You can use this attack only if your opponent’s Active Pokémon is affected by a Special Condition. This attack does 90 damage to 1 of your opponent’s Benched Pokémon. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Poison Powder",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Your opponent’s Active Pokémon is now Poisoned."
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
      49
    ],
    "flavorText": "The scales it scatters will paralyze anyone who touches them, making that person unable to stand.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/11/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/11/high.webp"
    }
  },
  {
    "id": "sm10-12",
    "name": "Venomoth-GX",
    "number": "12",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Venonat",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Shinobi Mastery",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110+",
        "text": "If you played Koga’s Trap from your hand during this turn, this attack does 90 more damage. If you played Janine from your hand during this turn, prevent all damage done to this Pokémon by attacks from Basic Pokémon during your opponent’s next turn."
      },
      {
        "name": "Ten-Card Return GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "60",
        "text": "Shuffle your hand into your deck. Then, draw 10 cards. (You can’t use more than 1 GX attack in a game.)"
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
      49
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/12/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/12/high.webp"
    }
  },
  {
    "id": "sm10-13",
    "name": "Bellsprout",
    "number": "13",
    "artist": "Ken Sugimori",
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
      "Weepinbell"
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
      69
    ],
    "flavorText": "Even though its body is extremely skinny, it is blindingly fast when catching its prey.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/13/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/13/high.webp"
    }
  },
  {
    "id": "sm10-14",
    "name": "Weepinbell",
    "number": "14",
    "artist": "otumami",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Bellsprout",
    "evolvesTo": [
      "Victreebel"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Burning Venom",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent’s Active Pokémon is now Burned and Poisoned."
      },
      {
        "name": "Ram",
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
      70
    ],
    "flavorText": "The leafy parts act as cutters for slashing foes. It spits a fluid that dissolves everything.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/14/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/14/high.webp"
    }
  },
  {
    "id": "sm10-15",
    "name": "Victreebel",
    "number": "15",
    "artist": "Anesaki Dynamic",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Weepinbell",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Reactive Poison",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "This attack does 60 more damage for each Special Condition affecting your opponent’s Active Pokémon."
      },
      {
        "name": "Gastro Acid",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "The Defending Pokémon has no Abilities until the end of your next turn."
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
      71
    ],
    "flavorText": "Said to live in huge colonies deep in jungles, although no one has ever returned from there.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/15/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/15/high.webp"
    }
  },
  {
    "id": "sm10-16",
    "name": "Tangela",
    "number": "16",
    "artist": "Naoyo Kimura",
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
        "name": "Tangle Drag",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch 1 of your opponent’s Benched Pokémon with their Active Pokémon."
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
    "flavorText": "Many writhing vines cover it, so its true identity remains unknown. The blue vines grow its whole life long.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/16/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/16/high.webp"
    }
  },
  {
    "id": "sm10-17",
    "name": "Tangrowth",
    "number": "17",
    "artist": "kodama",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Tangela",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bind Down",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "The Defending Pokémon can’t retreat during your opponent’s next turn."
      },
      {
        "name": "Chlorowhip",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "If this Pokémon has at least 2 Grass Energy attached to it, heal 60 damage from this Pokémon."
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
      465
    ],
    "flavorText": "It ensnares prey by extending arms made of vines. Losing arms to predators does not trouble it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/17/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/17/high.webp"
    }
  },
  {
    "id": "sm10-18",
    "name": "Grubbin",
    "number": "18",
    "artist": "Yuka Morii",
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
      "Charjabug"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Electrical Signal",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Lightning Pokémon, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Corkscrew Punch",
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
      736
    ],
    "flavorText": "If you find its nest, you shouldn't stick your hand inside. You'll get bitten by an irritated Grubbin.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/18/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/18/high.webp"
    }
  },
  {
    "id": "sm10-19",
    "name": "Kartana",
    "number": "19",
    "artist": "Shin Nagasawa",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Ultra Beast"
    ],
    "hp": "70",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Big Cut",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If you have exactly 4 Prize cards remaining, this attack does 120 more damage."
      },
      {
        "name": "False Swipe",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Flip a coin. If heads, put damage counters on your opponent’s Active Pokémon until its remaining HP is 10."
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
      798
    ],
    "flavorText": "This Ultra Beast's body, which is as thin as paper, is like a sharpened sword.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/19/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/19/high.webp"
    }
  },
  {
    "id": "sm10-20",
    "name": "Reshiram & Charizard-GX",
    "number": "20",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "270",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Outrage",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 10 more damage for each damage counter on this Pokémon."
      },
      {
        "name": "Flare Strike",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "230",
        "text": "This Pokémon can’t use Flare Strike during your next turn."
      },
      {
        "name": "Double Blaze GX",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "200+",
        "text": "If this Pokémon has at least 3 extra Fire Energy attached to it (in addition to this attack’s cost), this attack does 100 more damage, and this attack’s damage isn’t affected by any effects on your opponent’s Active Pokémon. (You can’t use more than 1 GX attack in a game.)"
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
      6,
      643
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/20/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/20/high.webp"
    }
  },
  {
    "id": "sm10-21",
    "name": "Growlithe",
    "number": "21",
    "artist": "tetsuya koizumi",
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
      "Arcanine"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Live Coal",
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
          "Fire"
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
      58
    ],
    "flavorText": "While it's quite friendly toward humans once it's grown used to them, in the wild it must be quite fierce to defend its territory from Rockruff.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/21/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/21/high.webp"
    }
  },
  {
    "id": "sm10-22",
    "name": "Arcanine",
    "number": "22",
    "artist": "Shin Nagasawa",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Growlithe",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Grand Flame",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Attach 2 Fire Energy cards from your discard pile to 1 of your Benched Pokémon."
      },
      {
        "name": "Heat Tackle",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 4,
        "damage": "190",
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
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      59
    ],
    "flavorText": "Legends tell of its fighting alongside a general and conquering a whole country.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/22/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/22/high.webp"
    }
  },
  {
    "id": "sm10-23",
    "name": "Darumaka",
    "number": "23",
    "artist": "Yuka Morii",
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
      "Darmanitan"
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
        "damage": "10",
        "text": "Search your deck for a Fire Energy card and attach it to this Pokémon. Then, shuffle your deck."
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/23/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/23/high.webp"
    }
  },
  {
    "id": "sm10-24",
    "name": "Darmanitan",
    "number": "24",
    "artist": "Midori Harada",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Darumaka",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Find Wildfire",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 Fire Energy cards, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Flare Blitz",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "110",
        "text": "Discard all Fire Energy from this Pokémon."
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
      555
    ],
    "flavorText": "When one is injured in a fierce battle, it hardens into a stone-like form. Then it meditates and sharpens its mind.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/24/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/24/high.webp"
    }
  },
  {
    "id": "sm10-25",
    "name": "Volcanion",
    "number": "25",
    "artist": "Satoshi Shirai",
    "rarity": "Rare Holo",
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
        "name": "Flare Starter",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Fire Energy card and attach it to 1 of your Pokémon. If you go second and it’s your first turn, instead search for up to 3 Fire Energy cards and attach them to your Pokémon in any way you like. Then, shuffle your deck."
      },
      {
        "name": "High-Heat Blast",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "50+",
        "text": "If you have at least 4 Fire Energy in play, this attack does 60 more damage."
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
    "flavorText": "It lets out billows of steam and disappears into the dense fog. It's said to live in mountains where humans do not tread.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/25/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/25/high.webp"
    }
  },
  {
    "id": "sm10-26",
    "name": "Litten",
    "number": "26",
    "artist": "0313",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Torracat"
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
        "text": "Your opponent’s Active Pokémon is now Burned."
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
      725
    ],
    "flavorText": "If you try too hard to get close to it, it won't open up to you. Even if you do grow close, giving it too much affection is still a no-no.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/26/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/26/high.webp"
    }
  },
  {
    "id": "sm10-27",
    "name": "Litten",
    "number": "27",
    "artist": "Atsuko Nishida",
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
      "Torracat"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Caturday",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card. If you do, this Pokémon is now Asleep."
      },
      {
        "name": "Big Bite",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "The Defending Pokémon can’t retreat during your opponent’s next turn."
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
      725
    ],
    "flavorText": "If you try too hard to get close to it, it won't open up to you. Even if you do grow close, giving it too much affection is still a no-no.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/27/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/27/high.webp"
    }
  },
  {
    "id": "sm10-28",
    "name": "Torracat",
    "number": "28",
    "artist": "tetsuya koizumi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Litten",
    "evolvesTo": [
      "Incineroar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fire Fang",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Your opponent’s Active Pokémon is now Burned."
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
      726
    ],
    "flavorText": "It can act spoiled if it grows close to its Trainer. A powerful Pokémon, its sharp claws can leave its Trainer's whole body covered in scratches.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/28/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/28/high.webp"
    }
  },
  {
    "id": "sm10-29",
    "name": "Incineroar",
    "number": "29",
    "artist": "Misa Tsutsui",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Torracat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Strong Cheer",
        "text": "Your Pokémon’s attacks do 30 more damage to your opponent’s Active Pokémon (before applying Weakness and Resistance). You can’t apply more than 1 Strong Cheer Ability at a time.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Flamethrower",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90",
        "text": "Discard an Energy from this Pokémon."
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
      727
    ],
    "flavorText": "Although it's rough mannered and egotistical, it finds beating down unworthy opponents boring. It gets motivated for stronger opponents.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/29/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/29/high.webp"
    }
  },
  {
    "id": "sm10-30",
    "name": "Salandit",
    "number": "30",
    "artist": "Yusuke Ohmura",
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
      "Salazzle"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Grass Fire",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Discard a Grass Energy from your opponent’s Active Pokémon."
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
      757
    ],
    "flavorText": "The males will do whatever the females tell them. They give the females most of their food. Due to malnutrition, the males can't evolve.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/30/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/30/high.webp"
    }
  },
  {
    "id": "sm10-31",
    "name": "Salazzle",
    "number": "31",
    "artist": "hatachu",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Salandit",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Roast Reveal",
        "text": "Once during your turn (before your attack), you may discard a Fire Energy card from your hand. If you do, draw 3 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
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
      758
    ],
    "flavorText": "Salazzle lives deep in caves and forces the Salandit it has attracted with its pheromones to serve it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/31/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/31/high.webp"
    }
  },
  {
    "id": "sm10-32",
    "name": "Blacephalon",
    "number": "32",
    "artist": "kawayoo",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Ultra Beast"
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
        "name": "Blazer",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Turn 1 of your face-down Prize cards face up. If it’s a Fire Energy card, this attack does 50 more damage. (That Prize card remains face up for the rest of the game.)"
      },
      {
        "name": "Fireball Circus",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "50×",
        "text": "Discard any number of Fire Energy cards from your hand. This attack does 50 damage for each card you discarded in this way."
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
      806
    ],
    "flavorText": "It slithers toward people. Then, without warning, it triggers the explosion of its own head. It's apparently one kind of Ultra Beast.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/32/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/32/high.webp"
    }
  },
  {
    "id": "sm10-33",
    "name": "Squirtle",
    "number": "33",
    "artist": "tetsuya koizumi",
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
      "Wartortle"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bubble",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, your opponent’s Active Pokémon is now Paralyzed."
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
      7
    ],
    "flavorText": "It shelters itself in its shell, then strikes back with spouts of water at every opportunity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/33/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/33/high.webp"
    }
  },
  {
    "id": "sm10-34",
    "name": "Wartortle",
    "number": "34",
    "artist": "Hiroki Asanuma",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Squirtle",
    "evolvesTo": [
      "Blastoise"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Solid Shell",
        "text": "This Pokémon takes 20 less damage from attacks (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Aqua Slash",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "This Pokémon can’t attack during your next turn."
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
      8
    ],
    "flavorText": "When tapped, this Pokémon will pull in its head, but its tail will still stick out a little bit.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/34/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/34/high.webp"
    }
  },
  {
    "id": "sm10-35",
    "name": "Blastoise-GX",
    "number": "35",
    "artist": "sadaji",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "240",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wartortle",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Solid Shell",
        "text": "This Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rocket Splash",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "60×",
        "text": "Shuffle any amount of Water Energy from your Pokémon into your deck. This attack does 60 damage for each card you shuffled into your deck in this way."
      },
      {
        "name": "Giant Geyser GX",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach any number of Water Energy cards from your hand to your Pokémon in any way you like. (You can’t use more than 1 GX attack in a game.)"
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
      9
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/35/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/35/high.webp"
    }
  },
  {
    "id": "sm10-36",
    "name": "Poliwag",
    "number": "36",
    "artist": "Midori Harada",
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
      "Poliwhirl"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Round ’n’ Round",
        "text": "You can use this Ability only if you go second. Once during your first turn (before your attack), you may leave your opponent’s Active Pokémon Confused.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Watering",
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
      60
    ],
    "flavorText": "Despite the danger, it wants to come up on land. So it does its best to waddle along, but when an enemy finds it, it rushes back to the water.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/36/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/36/high.webp"
    }
  },
  {
    "id": "sm10-37",
    "name": "Poliwag",
    "number": "37",
    "artist": "Shibuzoh.",
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
      "Poliwhirl"
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
        "text": "Search your deck for a Basic Pokémon and put it onto your Bench. Then, shuffle your deck."
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
      60
    ],
    "flavorText": "Despite the danger, it wants to come up on land. So it does its best to waddle along, but when an enemy finds it, it rushes back to the water.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/37/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/37/high.webp"
    }
  },
  {
    "id": "sm10-38",
    "name": "Poliwhirl",
    "number": "38",
    "artist": "Yukiko Baba",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Poliwag",
    "evolvesTo": [
      "Poliwrath",
      "Politoed"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bubble",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, your opponent’s Active Pokémon is now Paralyzed."
      },
      {
        "name": "Knuckle Punch",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
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
      61
    ],
    "flavorText": "Although it has become capable of living on land, it spends its time in the water, where its prey, fish Pokémon, are plentiful.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/38/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/38/high.webp"
    }
  },
  {
    "id": "sm10-39",
    "name": "Poliwrath",
    "number": "39",
    "artist": "Akira Komayama",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Poliwhirl",
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
        "name": "Swirly Rush",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "If Poliwag and Poliwhirl are on your Bench, this attack does 90 more damage."
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
      62
    ],
    "flavorText": "It's quite a gifted swimmer, even among Water-type Pokémon, but it normally spends its time on land.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/39/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/39/high.webp"
    }
  },
  {
    "id": "sm10-40",
    "name": "Tentacool",
    "number": "40",
    "artist": "Shin Nagasawa",
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
      "Tentacruel"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bubble Jutsu",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If you played Janine from your hand during this turn, this attack does 50 more damage."
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
      72
    ],
    "flavorText": "It drifts through the sea searching for prey. Its poisonous tentacles break off sometimes, but after a while, they grow back.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/40/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/40/high.webp"
    }
  },
  {
    "id": "sm10-41",
    "name": "Tentacruel",
    "number": "41",
    "artist": "Shigenori Negishi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Tentacool",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wicked Tentacles",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Move an Energy from 1 of your opponent’s Pokémon to another of their Pokémon. If you do, put 3 damage counters on the Pokémon you moved the Energy to."
      },
      {
        "name": "Wrap",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Flip a coin. If heads, your opponent’s Active Pokémon is now Paralyzed."
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
      73
    ],
    "flavorText": "It fires off ultrasonic waves from its red orbs to weaken its prey, and then it wraps them up in its 80 tentacles.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/41/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/41/high.webp"
    }
  },
  {
    "id": "sm10-42",
    "name": "Slowpoke",
    "number": "42",
    "artist": "Kouki Saitou",
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
      "Slowbro",
      "Slowking"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Growl",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent’s next turn, the Defending Pokémon’s attacks do 20 less damage (before applying Weakness and Resistance)."
      },
      {
        "name": "Tail Whap",
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
      79
    ],
    "flavorText": "There are some places where Slowpoke is worshiped because of a long-standing belief that whenever Slowpoke yawns, it rains.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/42/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/42/high.webp"
    }
  },
  {
    "id": "sm10-43",
    "name": "Slowbro",
    "number": "43",
    "artist": "Ken Sugimori",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Slowpoke",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Yawn",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent’s Active Pokémon is now Asleep."
      },
      {
        "name": "Three Strikes",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100×",
        "text": "Flip 3 coins. This attack does 100 damage for each heads. If all of them are tails, you lose this game."
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
      80
    ],
    "flavorText": "Spacing out is basically all it does. It turns back into Slowpoke if its tail, along with Shellder, breaks off.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/43/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/43/high.webp"
    }
  },
  {
    "id": "sm10-44",
    "name": "Seel",
    "number": "44",
    "artist": "Sumiyoshi Kizuki",
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
      "Dewgong"
    ],
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
        "damage": "30",
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
      86
    ],
    "flavorText": "It has always been supposed that Seel live only in cold seas. Their having shown up in Alola is a mystery.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/44/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/44/high.webp"
    }
  },
  {
    "id": "sm10-45",
    "name": "Dewgong",
    "number": "45",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Seel",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tail Whap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": ""
      },
      {
        "name": "Dual Blizzard",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard 2 Energy from this Pokémon. This attack does 60 damage to 2 of your opponent’s Pokémon. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
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
      87
    ],
    "flavorText": "It swims through the ocean at a speed of eight knots, searching for Pokémon that will become its prey. It's especially fond of Wishiwashi.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/45/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/45/high.webp"
    }
  },
  {
    "id": "sm10-46",
    "name": "Krabby",
    "number": "46",
    "artist": "Sekio",
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
      "Kingler"
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
        "name": "Vice Grip",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      98
    ],
    "flavorText": "If it senses danger approaching, it cloaks itself with bubbles from its mouth so it will look bigger.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/46/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/46/high.webp"
    }
  },
  {
    "id": "sm10-47",
    "name": "Kingler",
    "number": "47",
    "artist": "Shigenori Negishi",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Krabby",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bubble Beam",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Flip a coin. If heads, your opponent’s Active Pokémon is now Paralyzed."
      },
      {
        "name": "Massive Rend",
        "cost": [
          "Water",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
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
      99
    ],
    "flavorText": "Its large and hard pincer has 10,000-horsepower strength. However, being so big, it is unwieldy to move.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/47/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/47/high.webp"
    }
  },
  {
    "id": "sm10-48",
    "name": "Goldeen",
    "number": "48",
    "artist": "Naoyo Kimura",
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
      "Seaking"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Elegant Swim",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, prevent all effects of attacks, including damage, done to this Pokémon during your opponent’s next turn."
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
      118
    ],
    "flavorText": "Although known for their splendid tail fins, Goldeen apparently compete among themselves to see whose horn is thickest and sharpest.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/48/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/48/high.webp"
    }
  },
  {
    "id": "sm10-49",
    "name": "Seaking",
    "number": "49",
    "artist": "Midori Harada",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Goldeen",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Enhanced Horn",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30×",
        "text": "Flip 2 coins. This attack does 30 damage for each heads. If this Pokémon has a Pokémon Tool card attached to it, flip 6 coins instead."
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
      119
    ],
    "flavorText": "Its horn spins like a drill to steadily hollow out rocks—even harder ones. The coloration of the male is more vivid.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/49/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/49/high.webp"
    }
  },
  {
    "id": "sm10-50",
    "name": "Kyurem",
    "number": "50",
    "artist": "Anesaki Dynamic",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Call Forth Cold",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Water Energy card and attach it to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Hail Prison",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "Discard 2 Water Energy from this Pokémon. Your opponent’s Active Pokémon is now Paralyzed."
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
      646
    ],
    "flavorText": "This legendary ice Pokémon waits for a hero to fill in the missing parts of its body with truth or ideals.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/50/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/50/high.webp"
    }
  },
  {
    "id": "sm10-51",
    "name": "Froakie",
    "number": "51",
    "artist": "Kyoko Umemoto",
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
      "Frogadier"
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
      656
    ],
    "flavorText": "It secretes flexible bubbles from its chest and back. The bubbles reduce the damage it would otherwise take when attacked.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/51/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/51/high.webp"
    }
  },
  {
    "id": "sm10-52",
    "name": "Frogadier",
    "number": "52",
    "artist": "Satoshi Shirai",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Froakie",
    "evolvesTo": [
      "Greninja"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Afterimage Strike",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "If any damage is done to this Pokémon by attacks during your opponent’s next turn, flip a coin. If heads, prevent that damage."
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
      657
    ],
    "flavorText": "It can throw bubble-covered pebbles with precise control, hitting empty cans up to a hundred feet away.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/52/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/52/high.webp"
    }
  },
  {
    "id": "sm10-53",
    "name": "Pyukumuku",
    "number": "53",
    "artist": "Asako Ito",
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
        "name": "Call for Family",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Surprise Fist",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "You and your opponent play Rock-Paper-Scissors. If you win, this attack does 60 more damage."
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
      771
    ],
    "flavorText": "The tradition known as Pyukumuku chucking started from the custom of throwing Pyukumuku back into the sea after they wash onshore.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/53/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/53/high.webp"
    }
  },
  {
    "id": "sm10-54",
    "name": "Pikachu",
    "number": "54",
    "artist": "nagimiso",
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
      "Raichu"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pika Ball",
        "cost": [
          "Lightning",
          "Colorless"
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
      25
    ],
    "flavorText": "Its nature is to store up electricity. Forests where nests of Pikachu live are dangerous, since the trees are so often struck by lightning.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/54/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/54/high.webp"
    }
  },
  {
    "id": "sm10-55",
    "name": "Raichu",
    "number": "55",
    "artist": "Shin Nagasawa",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Pikachu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Never Give Up",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "You can use this attack only if you have at least 3 more Prize cards remaining than your opponent. Attach all Lightning Energy cards from your discard pile to your Pokémon in any way you like."
      },
      {
        "name": "Head Bolt",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      26
    ],
    "flavorText": "As electricity builds up inside its body, it becomes more aggressive. One theory is that the electricity buildup is actually causing stress.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/55/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/55/high.webp"
    }
  },
  {
    "id": "sm10-56",
    "name": "Stunfisk",
    "number": "56",
    "artist": "sowsow",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Raging Thunder",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This attack does 10 damage to 1 of your Benched Pokémon. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Electric Trap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "This attack does 30 damage for each of your Pokémon that has any damage counters on it."
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
      618
    ],
    "flavorText": "Its skin is very hard, so it is unhurt even if stepped on by sumo wrestlers. It smiles when transmitting electricity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/56/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/56/high.webp"
    }
  },
  {
    "id": "sm10-57",
    "name": "Dedenne-GX",
    "number": "57",
    "artist": "PLANETA Igarashi",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "160",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dedechange",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may discard your hand and draw 6 cards. You can’t use more than 1 Dedechange Ability each turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Static Shock",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Tingly Return GX",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Your opponent’s Active Pokémon is now Paralyzed. Put this Pokémon and all cards attached to it into your hand. (You can’t use more than 1 GX attack in a game.)"
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
      702
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/57/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/57/high.webp"
    }
  },
  {
    "id": "sm10-58",
    "name": "Charjabug",
    "number": "58",
    "artist": "Sekio",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Grubbin",
    "evolvesTo": [
      "Vikavolt"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Battery",
        "text": "Once during your turn (before your attack), you may attach this card from your hand to 1 of your Vikavolt or Vikavolt-GX as a Special Energy card. This card provides 2 Lightning Energy only while it’s attached to a Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Pierce",
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
      737
    ],
    "flavorText": "It buries itself in fallen leaves and barely moves, munching away on humus. If you accidentally step on one, you'll get a shock!",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/58/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/58/high.webp"
    }
  },
  {
    "id": "sm10-59",
    "name": "Vikavolt",
    "number": "59",
    "artist": "Hasuno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Charjabug",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Stealthy Body",
        "text": "If there is any Stadium card in play, this Pokémon has no Weakness.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Electricannon",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120+",
        "text": "You may discard all Lightning Energy from this Pokémon. If you do, this attack does 100 more damage."
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
      738
    ],
    "flavorText": "It has an organ that generates electricity in its abdomen. It concentrates energy in its strong jaws and fires off powerful jolts of electricity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/59/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/59/high.webp"
    }
  },
  {
    "id": "sm10-60",
    "name": "Zeraora",
    "number": "60",
    "artist": "kawayoo",
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
        "name": "Crushing Claw",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Discard a Special Energy from your opponent’s Active Pokémon."
      },
      {
        "name": "Discharge",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50×",
        "text": "Discard all Lightning Energy from this Pokémon. This attack does 50 damage for each card you discarded in this way."
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
      807
    ],
    "flavorText": "It electrifies its claws and tears its opponents apart with them. Even if they dodge its attack, they'll be electrocuted by the flying sparks.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/60/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/60/high.webp"
    }
  },
  {
    "id": "sm10-61",
    "name": "Muk & Alolan Muk-GX",
    "number": "61",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "270",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Severe Poison",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Your opponent’s Active Pokémon is now Poisoned. Put 8 damage counters instead of 1 on that Pokémon between turns."
      },
      {
        "name": "Poison Absorption",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120",
        "text": "If your opponent’s Active Pokémon is Poisoned, heal 100 damage from this Pokémon."
      },
      {
        "name": "Nasty Goo Mix GX",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Your opponent’s Active Pokémon is now Paralyzed and Poisoned. If this Pokémon has at least 4 extra Energy attached to it (in addition to this attack’s cost), put 15 damage counters instead of 1 on that Pokémon between turns. (You can’t use more than 1 GX attack in a game.)"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      89
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/61/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/61/high.webp"
    }
  },
  {
    "id": "sm10-62",
    "name": "Ekans",
    "number": "62",
    "artist": "Yumi",
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
      "Arbok"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Glare",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, your opponent’s Active Pokémon is now Paralyzed."
      },
      {
        "name": "Tail Smack",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      23
    ],
    "flavorText": "By dislocating its jaw, it can swallow prey larger than itself. After a meal, it curls up and rests.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/62/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/62/high.webp"
    }
  },
  {
    "id": "sm10-63",
    "name": "Arbok",
    "number": "63",
    "artist": "Yukiko Baba",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Ekans",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wrap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If heads, your opponent’s Active Pokémon is now Paralyzed."
      },
      {
        "name": "Heavy Choke",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50+",
        "text": "If this Pokémon used Wrap during your last turn, this attack does 120 more damage."
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
      24
    ],
    "flavorText": "The latest research has determined that there are over 20 possible arrangements of the patterns on its stomach.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/63/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/63/high.webp"
    }
  },
  {
    "id": "sm10-64",
    "name": "Zubat",
    "number": "64",
    "artist": "Sekio",
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
      "Golbat"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bite",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Venoshock",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "If your opponent’s Active Pokémon is Poisoned, this attack does 50 more damage."
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
      41
    ],
    "flavorText": "It has no eyeballs, so it can't see. It checks its surroundings via the ultrasonic waves it emits from its mouth.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/64/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/64/high.webp"
    }
  },
  {
    "id": "sm10-65",
    "name": "Golbat",
    "number": "65",
    "artist": "Shin Nagasawa",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Zubat",
    "evolvesTo": [
      "Crobat"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bite",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Leech Life",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "Heal from this Pokémon the same amount of damage you did to your opponent’s Active Pokémon."
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
      42
    ],
    "flavorText": "Every once in a while, you'll see a Golbat that's missing some fangs. This happens when hunger drives it to try biting a Steel-type Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/65/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/65/high.webp"
    }
  },
  {
    "id": "sm10-66",
    "name": "Crobat",
    "number": "66",
    "artist": "Anesaki Dynamic",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Golbat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Sound Veil",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may prevent all effects of your opponent’s attacks, including damage, done to this Pokémon until the end of your opponent’s next turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Severe Poison",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Your opponent’s Active Pokémon is now Poisoned. Put 4 damage counters instead of 1 on that Pokémon between turns."
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
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      169
    ],
    "flavorText": "Its fangs are so sharp, if it bites you in the dark and sucks your blood, you won't notice any pain or realize you've been bitten.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/66/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/66/high.webp"
    }
  },
  {
    "id": "sm10-67",
    "name": "Gastly",
    "number": "67",
    "artist": "chibi",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Haunter"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Swelling Spite",
        "text": "When this Pokémon is Knocked Out, search your deck for up to 2 Haunter and put them onto your Bench. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Will-O-Wisp",
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
      92
    ],
    "flavorText": "It's said that gas emanating from a graveyard was possessed by the grievances of the deceased and thus became a Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/67/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/67/high.webp"
    }
  },
  {
    "id": "sm10-68",
    "name": "Gastly",
    "number": "68",
    "artist": "MAHOU",
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
      "Haunter"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Smog",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent’s Active Pokémon is now Poisoned."
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
      92
    ],
    "flavorText": "It's said that gas emanating from a graveyard was possessed by the grievances of the deceased and thus became a Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/68/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/68/high.webp"
    }
  },
  {
    "id": "sm10-69",
    "name": "Haunter",
    "number": "69",
    "artist": "Miki Tanaka",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Gastly",
    "evolvesTo": [
      "Gengar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sinister Fog",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent’s Active Pokémon is now Poisoned. Put 1 damage counter on each of your opponent’s Benched Pokémon."
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
      93
    ],
    "flavorText": "On moonless nights, Haunter searches for someone to curse, so it's best not to go out walking around.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/69/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/69/high.webp"
    }
  },
  {
    "id": "sm10-70",
    "name": "Gengar",
    "number": "70",
    "artist": "so-taro",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Haunter",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Shadow Pain",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may put 6 damage counters on your opponent’s Pokémon-GX and Pokémon-EX in any way you like.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Twilight Poison",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Your opponent’s Active Pokémon is now Asleep and Poisoned."
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
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      94
    ],
    "flavorText": "You can hear tales told all over the world about how Gengar will pay a visit to children who are naughty.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/70/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/70/high.webp"
    }
  },
  {
    "id": "sm10-71",
    "name": "Drowzee",
    "number": "71",
    "artist": "Miki Tanaka",
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
      "Hypno"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hypnosis",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent’s Active Pokémon is now Asleep."
      },
      {
        "name": "Psypunch",
        "cost": [
          "Psychic",
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
      96
    ],
    "flavorText": "It can be spotted near recreational facilities, intending to eat the pleasant dreams of children who enjoyed themselves there that day.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/71/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/71/high.webp"
    }
  },
  {
    "id": "sm10-72",
    "name": "Hypno",
    "number": "72",
    "artist": "sui",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Drowzee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Hypnotic Pendulum",
        "text": "When your opponent’s Active Pokémon is Knocked Out, flip a coin. If heads, choose which of your opponent’s Benched Pokémon becomes their new Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Stir the Brain",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "This attack does 10 more damage for each card in your opponent’s hand."
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
      97
    ],
    "flavorText": "In Alola, Komala is Hypno's main target. It rarely harms people.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/72/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/72/high.webp"
    }
  },
  {
    "id": "sm10-73",
    "name": "Koffing",
    "number": "73",
    "artist": "Mizue",
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
      "Weezing"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Foul Odor",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Both Active Pokémon are now Confused."
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
      109
    ],
    "flavorText": "Its thin, balloon-like body is inflated by horribly toxic gases. It reeks when it is nearby.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/73/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/73/high.webp"
    }
  },
  {
    "id": "sm10-74",
    "name": "Weezing",
    "number": "74",
    "artist": "OOYAMA",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Koffing",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Detention Gas",
        "text": "As long as this Pokémon is your Active Pokémon, put 1 damage counter on each of your opponent’s Basic Pokémon between turns.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Splattering Sludge",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "This attack does 20 damage to each of your opponent’s Benched Pokémon that has any damage counters on it. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
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
      110
    ],
    "flavorText": "If one of the twin Koffing inflates, the other one deflates. It constantly mixes its poisonous gases.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/74/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/74/high.webp"
    }
  },
  {
    "id": "sm10-75",
    "name": "Mewtwo",
    "number": "75",
    "artist": "Shin Nagasawa",
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
    "abilities": [
      {
        "name": "Mind Report",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may put a Supporter card from your discard pile on top of your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Psyshock",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "This attack’s damage isn’t affected by any effects on your opponent’s Active Pokémon."
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
      150
    ],
    "flavorText": "It was created by a scientist after years of horrific gene-splicing and DNA-engineering experiments.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/75/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/75/high.webp"
    }
  },
  {
    "id": "sm10-76",
    "name": "Mew",
    "number": "76",
    "artist": "sui",
    "rarity": "Rare Holo",
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
        "name": "Bench Barrier",
        "text": "Prevent all damage done to your Benched Pokémon by your opponent’s attacks.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Psypower",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put 3 damage counters on your opponent’s Pokémon in any way you like."
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
      151
    ],
    "flavorText": "Because it can use all kinds of moves, many scientists believe Mew to be the ancestor of Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/76/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/76/high.webp"
    }
  },
  {
    "id": "sm10-77",
    "name": "Misdreavus",
    "number": "77",
    "artist": "Miki Tanaka",
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
      "Mismagius"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ominous Eyes",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put 1 damage counter on 1 of your opponent’s Pokémon."
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
      200
    ],
    "flavorText": "What gives meaning to its life is surprising others. If you set your ear against the red orbs around its neck, you can hear shrieking.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/77/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/77/high.webp"
    }
  },
  {
    "id": "sm10-78",
    "name": "Mismagius",
    "number": "78",
    "artist": "sui",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Misdreavus",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Mysterious Message",
        "text": "Once during your turn (before your attack), you may draw cards until you have 7 cards in your hand. If you drew any cards in this way, this Pokémon is Knocked Out.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hypnoblast",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Your opponent’s Active Pokémon is now Asleep."
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
      429
    ],
    "flavorText": "Feared for its wrath and the curses it spreads, this Pokémon will also, on a whim, cast spells that help people.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Banned"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/78/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/78/high.webp"
    }
  },
  {
    "id": "sm10-79",
    "name": "Espurr",
    "number": "79",
    "artist": "HYOGONOSUKE",
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
        "name": "Caturday",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card. If you do, this Pokémon is now Asleep."
      },
      {
        "name": "Ear Kinesis",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 20 damage to 1 of your opponent’s Benched Pokémon for each damage counter on that Pokémon. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/79/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/79/high.webp"
    }
  },
  {
    "id": "sm10-80",
    "name": "Meowstic",
    "number": "80",
    "artist": "Saya Tsuruta",
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
        "name": "Caturday",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw 3 cards. If you do, this Pokémon is now Asleep."
      },
      {
        "name": "Perplexing Eyes",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "The Defending Pokémon’s Weakness is now Psychic until the end of your next turn. (The amount of Weakness doesn’t change.)"
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/80/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/80/high.webp"
    }
  },
  {
    "id": "sm10-81",
    "name": "Marshadow",
    "number": "81",
    "artist": "chibi",
    "rarity": "Rare Holo",
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
    "abilities": [
      {
        "name": "Resetting Hole",
        "text": "Once during your turn (before your attack), if this Pokémon is on your Bench, you may discard any Stadium card in play. If you do, discard this Pokémon and all cards attached to it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Red Knuckles",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If your opponent’s Active Pokémon is an Ultra Beast, this attack does 60 more damage."
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
      802
    ],
    "flavorText": "It slips into the shadows of others and mimics their powers and movements. As it improves, it becomes stronger than those it's imitating.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/81/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/81/high.webp"
    }
  },
  {
    "id": "sm10-82",
    "name": "Marshadow & Machamp-GX",
    "number": "82",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "270",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Revenge",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If any of your Pokémon were Knocked Out by damage from an opponent’s attack during their last turn, this attack does 90 more damage."
      },
      {
        "name": "Hundred-Blows Impact",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": ""
      },
      {
        "name": "Acme of Heroism GX",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "If this Pokémon has at least 1 extra Energy attached to it (in addition to this attack’s cost), and if it would be Knocked Out by damage from an opponent’s attack during their next turn, it is not Knocked Out, and its remaining HP becomes 10. (You can’t use more than 1 GX attack in a game.)"
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
      802,
      68
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/82/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/82/high.webp"
    }
  },
  {
    "id": "sm10-83",
    "name": "Sandshrew",
    "number": "83",
    "artist": "Sekio",
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
        "name": "Collect",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card."
      },
      {
        "name": "Rolling Tackle",
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
    "flavorText": "It lives in areas of limited rainfall. When danger approaches, it curls up into a ball to protect its soft stomach.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/83/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/83/high.webp"
    }
  },
  {
    "id": "sm10-84",
    "name": "Sandslash",
    "number": "84",
    "artist": "Shigenori Negishi",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Sandshrew",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Continuous Scratch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30×",
        "text": "Flip 4 coins. This attack does 30 damage for each heads."
      },
      {
        "name": "Sand Tomb",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "The Defending Pokémon can’t retreat during your opponent’s next turn."
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
    "flavorText": "Its claws and horns often break off. The broken claws and horns can be used to carve plows for tilling farm fields.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/84/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/84/high.webp"
    }
  },
  {
    "id": "sm10-85",
    "name": "Diglett",
    "number": "85",
    "artist": "Kouki Saitou",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Dugtrio"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Underground Work",
        "text": "If you discard this Pokémon with the effect of Giovanni’s Exile, discard the top card of your opponent’s deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hook",
        "cost": [
          "Fighting"
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      50
    ],
    "flavorText": "It travels through tunnels that it digs underground. It hates sunlight, so it comes out only after the sun goes down.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/85/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/85/high.webp"
    }
  },
  {
    "id": "sm10-86",
    "name": "Dugtrio",
    "number": "86",
    "artist": "Akira Komayama",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Diglett",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Home Ground",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "30+",
        "text": "If you have any Stadium card in play, this attack does 60 more damage."
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
      51
    ],
    "flavorText": "While the three of them normally get along splendidly, on rare occasions a huge fight will break out over which head gets to eat first.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/86/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/86/high.webp"
    }
  },
  {
    "id": "sm10-87",
    "name": "Geodude",
    "number": "87",
    "artist": "Sumiyoshi Kizuki",
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
      "Graveler"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Defense Curl",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, prevent all damage done to this Pokémon by attacks during your opponent’s next turn."
      },
      {
        "name": "Rock Throw",
        "cost": [
          "Colorless",
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
    "flavorText": "Geodude that have lived a long life have had all their edges smoothed out until they're totally round. They also have a calm, quiet disposition.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/87/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/87/high.webp"
    }
  },
  {
    "id": "sm10-88",
    "name": "Graveler",
    "number": "88",
    "artist": "Ayaka Yoshida",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
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
        "name": "Rolling Rocks",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Double-Edge",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "90",
        "text": "This Pokémon does 30 damage to itself."
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
      75
    ],
    "flavorText": "It climbs up cliffs as it heads toward the peak of a mountain. As soon as it reaches the summit, it rolls back down the way it came.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/88/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/88/high.webp"
    }
  },
  {
    "id": "sm10-89",
    "name": "Golem",
    "number": "89",
    "artist": "Kyoko Umemoto",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Graveler",
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
        "damage": "100",
        "text": "This attack’s damage isn’t affected by Resistance."
      },
      {
        "name": "Heavy Slam",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180-",
        "text": "This attack does 20 less damage for each Colorless in your opponent’s Active Pokémon’s Retreat Cost."
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
      76
    ],
    "flavorText": "When Golem grow old, they stop shedding their shells. Those that have lived a long, long time have shells green with moss.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/89/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/89/high.webp"
    }
  },
  {
    "id": "sm10-90",
    "name": "Cubone",
    "number": "90",
    "artist": "Mizue",
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
      "Marowak"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Focus Energy",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your next turn, this Pokémon’s Beat attack’s base damage is 80."
      },
      {
        "name": "Beat",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      104
    ],
    "flavorText": "At night, it weeps loudly for its dead mother, but those cries only attract its natural enemy—Mandibuzz.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/90/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/90/high.webp"
    }
  },
  {
    "id": "sm10-91",
    "name": "Marowak",
    "number": "91",
    "artist": "kirisAki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Cubone",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bone Rush",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "Flip a coin until you get tails. This attack does 50 damage for each heads."
      },
      {
        "name": "Assault Boom",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70+",
        "text": "If your opponent’s Active Pokémon has a Pokémon Tool card attached to it, this attack does 70 more damage."
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
      105
    ],
    "flavorText": "It throws bones at Mandibuzz to knock it down. It's thought that Marowak is trying to avenge its parent.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/91/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/91/high.webp"
    }
  },
  {
    "id": "sm10-92",
    "name": "Rhyhorn",
    "number": "92",
    "artist": "sowsow",
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
      "Rhydon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Push Down",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Your opponent switches their Active Pokémon with 1 of their Benched Pokémon."
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
      111
    ],
    "flavorText": "Strong, but not too bright, this Pokémon can shatter even a skyscraper with its charging Tackles.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/92/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/92/high.webp"
    }
  },
  {
    "id": "sm10-93",
    "name": "Rhyhorn",
    "number": "93",
    "artist": "otumami",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Rhydon"
    ],
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
        "damage": "30",
        "text": ""
      },
      {
        "name": "Boulder Crush",
        "cost": [
          "Fighting",
          "Colorless",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      111
    ],
    "flavorText": "Strong, but not too bright, this Pokémon can shatter even a skyscraper with its charging Tackles.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/93/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/93/high.webp"
    }
  },
  {
    "id": "sm10-94",
    "name": "Rhydon",
    "number": "94",
    "artist": "kirisAki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Rhyhorn",
    "evolvesTo": [
      "Rhyperior"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dirty Work",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Discard the top card of your opponent’s deck. If you played Giovanni’s Exile from your hand during this turn, discard the top 5 cards instead."
      },
      {
        "name": "Horn Attack",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "90",
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
      112
    ],
    "flavorText": "Protected by an armor-like hide, it is capable of living in molten lava of 3,600 degrees Fahrenheit.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/94/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/94/high.webp"
    }
  },
  {
    "id": "sm10-95",
    "name": "Rhyperior",
    "number": "95",
    "artist": "kawayoo",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Rhydon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hefty Cannon",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "If the Defending Pokémon is a Basic Pokémon, it can’t attack during your opponent’s next turn."
      },
      {
        "name": "Break Ground",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "160",
        "text": "This attack does 20 damage to each of your Benched Pokémon. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
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
      464
    ],
    "flavorText": "From holes in its palms, it fires out Geodude. Its carapace can withstand volcanic eruptions.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/95/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/95/high.webp"
    }
  },
  {
    "id": "sm10-96",
    "name": "Wooper",
    "number": "96",
    "artist": "tetsuya koizumi",
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
      "Quagsire"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mud Bomb",
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
      194
    ],
    "flavorText": "This Pokémon lives in cold water. It will leave the water to search for food when it gets cold outside.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/96/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/96/high.webp"
    }
  },
  {
    "id": "sm10-97",
    "name": "Quagsire",
    "number": "97",
    "artist": "kirisAki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Wooper",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Water Gun",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Surf",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
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
      195
    ],
    "flavorText": "It has a sluggish nature. It lies at the river's bottom, waiting for prey to stray into its mouth.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/97/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/97/high.webp"
    }
  },
  {
    "id": "sm10-98",
    "name": "Gligar",
    "number": "98",
    "artist": "Ken Sugimori",
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
      "Gliscor"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Free Flight",
        "text": "If this Pokémon has no Energy attached to it, it has no Retreat Cost.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Shinobi Strike",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "If you played Janine from your hand during this turn, this attack does 90 more damage."
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
      207
    ],
    "flavorText": "It usually clings to cliffs. When it spots its prey, it spreads its wings and glides down to attack.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/98/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/98/high.webp"
    }
  },
  {
    "id": "sm10-99",
    "name": "Gliscor",
    "number": "99",
    "artist": "Mizue",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Gligar",
    "evolvesTo": [],
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
        "text": "Draw 3 cards."
      },
      {
        "name": "Poison Jab",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Your opponent’s Active Pokémon is now Poisoned."
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
      472
    ],
    "flavorText": "It observes prey while hanging inverted from branches. When the chance presents itself, it swoops!",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/99/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/99/high.webp"
    }
  },
  {
    "id": "sm10-100",
    "name": "Tyrogue",
    "number": "100",
    "artist": "Mina Nakai",
    "rarity": "Uncommon",
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
      "Hitmonlee",
      "Hitmonchan",
      "Hitmontop"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Bratty Kick",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, put 3 damage counters on 1 of your opponent’s Pokémon. If you use this Ability, your turn ends.",
        "type": "Ability"
      }
    ],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      236
    ],
    "flavorText": "It is always bursting with energy. To make itself stronger, it keeps on fighting even if it loses.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/100/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/100/high.webp"
    }
  },
  {
    "id": "sm10-101",
    "name": "Hitmontop",
    "number": "101",
    "artist": "Tomokazu Komiya",
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
        "name": "Finishing Combo",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "You can use this attack only if your Hitmonlee used Special Combo during your last turn. This attack does 60 damage to each of your opponent’s Pokémon. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Spinning Attack",
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
      237
    ],
    "flavorText": "It fights while spinning like a top. The centrifugal force boosts its destructive power by 10.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/101/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/101/high.webp"
    }
  },
  {
    "id": "sm10-102",
    "name": "Riolu",
    "number": "102",
    "artist": "Mizue",
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
      "Lucario"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Feint",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "This attack’s damage isn’t affected by Resistance."
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
      447
    ],
    "flavorText": "It knows how people and Pokémon feel by looking at their auras. It doesn't approach dangerous opponents.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/102/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/102/high.webp"
    }
  },
  {
    "id": "sm10-103",
    "name": "Landorus",
    "number": "103",
    "artist": "Hasuno",
    "rarity": "Rare Holo",
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
        "name": "Linear Attack",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 30 damage to 1 of your opponent’s Pokémon. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Power Cyclone",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
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
      645
    ],
    "flavorText": "Lands visited by Landorus grant such bountiful crops that it has been hailed as \"The Guardian of the Fields.\"",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/103/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/103/high.webp"
    }
  },
  {
    "id": "sm10-104",
    "name": "Crabrawler",
    "number": "104",
    "artist": "Akira Komayama",
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
      "Crabominable"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Corkscrew Punch",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Knuckle Blast",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "If you have more Prize cards remaining than your opponent, this attack does 60 more damage."
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
      739
    ],
    "flavorText": "Its hard pincers are well suited to both offense and defense. Fights between two Crabrawler are like boxing matches.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/104/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/104/high.webp"
    }
  },
  {
    "id": "sm10-105",
    "name": "Crabominable",
    "number": "105",
    "artist": "Tomokazu Komiya",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Crabrawler",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fight Alone",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If you have fewer Pokémon in play than your opponent, this attack does 50 more damage for each Pokémon fewer you have in play."
      },
      {
        "name": "Magnum Punch",
        "cost": [
          "Fighting",
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
        "type": "Psychic",
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
      740
    ],
    "flavorText": "It stores coldness in its pincers and pummels its foes. It can even smash thick walls of ice to bits!",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/105/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/105/high.webp"
    }
  },
  {
    "id": "sm10-106",
    "name": "Stakataka",
    "number": "106",
    "artist": "nagimiso",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Ultra Beast"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Wall of Stone",
        "text": "If your opponent has 3 or fewer Prize cards remaining, this Pokémon’s maximum HP is 200.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Top Down",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "Flip a coin until you get tails. For each heads, discard the top card of your opponent’s deck."
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
      805
    ],
    "flavorText": "It appeared from an Ultra Wormhole. Each one appears to be made up of many life-forms stacked one on top of each other.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/106/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/106/high.webp"
    }
  },
  {
    "id": "sm10-107",
    "name": "Greninja & Zoroark-GX",
    "number": "107",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Dark Pulse",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 30 more damage times the amount of Darkness Energy attached to all of your Pokémon."
      },
      {
        "name": "Dark Union GX",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put 2 in any combination of Darkness Pokémon-GX and Darkness Pokémon-EX from your discard pile onto your Bench. If this Pokémon has at least 1 extra Energy attached to it (in addition to this attack’s cost), attach 2 Energy cards from your discard pile to each Pokémon that you put onto your Bench in this way. (You can’t use more than 1 GX attack in a game.)"
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
      658,
      571
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/107/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/107/high.webp"
    }
  },
  {
    "id": "sm10-108",
    "name": "Murkrow",
    "number": "108",
    "artist": "0313",
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
      "Honchkrow"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Astonish",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose a random card from your opponent’s hand. Your opponent reveals that card and shuffles it into their deck."
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
      198
    ],
    "flavorText": "It has a weakness for shiny things. It's been known to sneak into the nests of Gabite—noted collectors of jewels—in search of treasure.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/108/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/108/high.webp"
    }
  },
  {
    "id": "sm10-109",
    "name": "Honchkrow-GX",
    "number": "109",
    "artist": "sadaji",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "210",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Murkrow",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Ruler of the Night",
        "text": "As long as this Pokémon is your Active Pokémon, your opponent can’t play any Pokémon Tool, Special Energy, or Stadium cards from their hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Feather Storm",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "This attack does 30 damage to 2 of your opponent’s Benched Pokémon-GX and Pokémon-EX. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Unfair GX",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Your opponent reveals their hand. Discard 2 cards from it. (You can’t use more than 1 GX attack in a game.)"
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
      430
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/109/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/109/high.webp"
    }
  },
  {
    "id": "sm10-110",
    "name": "Carvanha",
    "number": "110",
    "artist": "SATOSHI NAKAI",
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
      "Sharpedo"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gnaw",
        "cost": [
          "Darkness"
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
      318
    ],
    "flavorText": "They're such cowards that they won't hunt alone. When five or so of them get together, they suddenly turn ferocious!",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/110/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/110/high.webp"
    }
  },
  {
    "id": "sm10-111",
    "name": "Sharpedo",
    "number": "111",
    "artist": "Tomokazu Komiya",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Carvanha",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Greedy Evolution",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may look at the top 6 cards of your deck and attach any number of Darkness Energy cards you find there to this Pokémon. Shuffle the other cards back into your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Bad Fangs",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "This attack does 20 more damage times the amount of Darkness Energy attached to this Pokémon."
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
      319
    ],
    "flavorText": "People believe that carrying one of its discarded fangs will prevent mishaps at sea, so the fangs are made into accessories.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/111/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/111/high.webp"
    }
  },
  {
    "id": "sm10-112",
    "name": "Spiritomb",
    "number": "112",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
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
    "abilities": [
      {
        "name": "Building Spite",
        "text": "Once during your turn (before your attack), you may put 1 damage counter on this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Anguish Cry",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "This attack does 30 more damage for each damage counter on this Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      442
    ],
    "flavorText": "A Pokémon that was formed by 108 spirits. It is bound to a fissure in an odd keystone.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/112/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/112/high.webp"
    }
  },
  {
    "id": "sm10-113",
    "name": "Sandile",
    "number": "113",
    "artist": "Yuka Morii",
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
      "Krokorok"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Intimidating Fang",
        "text": "As long as this Pokémon is your Active Pokémon, your opponent’s Active Pokémon’s attacks do 20 less damage (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Gnaw",
        "cost": [
          "Darkness"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      551
    ],
    "flavorText": "Alola, where it's warm all year round, is a comfortable environment for this Pokémon. Sometimes you'll even see it outside of deserts.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/113/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/113/high.webp"
    }
  },
  {
    "id": "sm10-114",
    "name": "Sandile",
    "number": "114",
    "artist": "Akira Komayama",
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
        "name": "Grandiose Fangs",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "If your opponent’s Pokémon is Knocked Out by damage from this attack, this Pokémon’s attacks do 120 more damage to your opponent’s Active Pokémon during your next turn (before applying Weakness and Resistance)."
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
    "flavorText": "Alola, where it's warm all year round, is a comfortable environment for this Pokémon. Sometimes you'll even see it outside of deserts.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/114/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/114/high.webp"
    }
  },
  {
    "id": "sm10-115",
    "name": "Krokorok",
    "number": "115",
    "artist": "SATOSHI NAKAI",
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
        "name": "Bite",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Corner",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "The Defending Pokémon can’t retreat during your opponent’s next turn."
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
    "flavorText": "Krokorok really hates it when its body gets cold. On nights when the temperature drops, it digs deep into the desert sands.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/115/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/115/high.webp"
    }
  },
  {
    "id": "sm10-116",
    "name": "Krookodile",
    "number": "116",
    "artist": "Anesaki Dynamic",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Krokorok",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Chomp Chomp Panic",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50×",
        "text": "This attack does 50 damage for each Colorless in your opponent’s Active Pokémon’s Retreat Cost."
      },
      {
        "name": "Crunch",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": "Discard an Energy from your opponent’s Active Pokémon."
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      553
    ],
    "flavorText": "When it spots prey, even at a distance of over 30 miles, it swims through the desert as if it were water, then jumps out and chomps them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/116/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/116/high.webp"
    }
  },
  {
    "id": "sm10-117",
    "name": "Greninja",
    "number": "117",
    "artist": "Yusuke Ohmura",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Frogadier",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bring Down",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "The Pokémon that has the least HP remaining, except for this Pokémon, is Knocked Out. (If multiple Pokémon are tied, choose one.)"
      },
      {
        "name": "Mist Slash",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "This attack’s damage isn’t affected by Weakness, Resistance, or any other effects on your opponent’s Active Pokémon."
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
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      658
    ],
    "flavorText": "It creates throwing stars out of compressed water. When it spins them and throws them at high speed, these stars can split metal in two.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/117/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/117/high.webp"
    }
  },
  {
    "id": "sm10-118",
    "name": "Inkay",
    "number": "118",
    "artist": "Naoyo Kimura",
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
      "Malamar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Perplex",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent’s Active Pokémon is now Confused."
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
    "flavorText": "It draws prey near with its blinking lights and then wraps them up in its long tentacles and holds them in place.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/118/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/118/high.webp"
    }
  },
  {
    "id": "sm10-119",
    "name": "Malamar",
    "number": "119",
    "artist": "Yusuke Ohmura",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Inkay",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hypnotic Reign",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent reveals their hand. You may discard a Pokémon you find there and use one of that Pokémon’s non-GX attacks as this attack."
      },
      {
        "name": "Dark Pressure",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Discard the top card of your opponent’s deck."
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
    "flavorText": "When it comes to strong hypnosis, there's an endless number of people who utilize Malamar for their nefarious deeds.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/119/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/119/high.webp"
    }
  },
  {
    "id": "sm10-120",
    "name": "Lucario & Melmetal-GX",
    "number": "120",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "260",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Steel Fist",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Search your deck for a Metal Energy card and attach it to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Heavy Impact",
        "cost": [
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "150",
        "text": ""
      },
      {
        "name": "Full Metal Wall GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "For the rest of this game, your Metal Pokémon take 30 less damage from your opponent’s attacks (after applying Weakness and Resistance). If this Pokémon has at least 1 extra Energy attached to it (in addition to this attack’s cost), discard all Energy from your opponent’s Active Pokémon. (You can’t use more than 1 GX attack in a game.)"
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
      448,
      809
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/120/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/120/high.webp"
    }
  },
  {
    "id": "sm10-121",
    "name": "Alolan Diglett",
    "number": "121",
    "artist": "Atsuko Nishida",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Dugtrio"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ram",
        "cost": [],
        "convertedEnergyCost": 0,
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
      50
    ],
    "flavorText": "Although it's powerful enough to dig right through volcanic rock, it doesn't allow itself to be seen very often.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/121/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/121/high.webp"
    }
  },
  {
    "id": "sm10-122",
    "name": "Alolan Dugtrio",
    "number": "122",
    "artist": "SATOSHI NAKAI",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Alolan Diglett",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Hair Wall",
        "text": "Your Metal Pokémon take 10 less damage from your opponent’s attacks (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hammer In",
        "cost": [
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      51
    ],
    "flavorText": "Its metallic whiskers are heavy, so it's not very fast, but it has the power to dig through bedrock.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/122/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/122/high.webp"
    }
  },
  {
    "id": "sm10-123",
    "name": "Aron",
    "number": "123",
    "artist": "Ken Sugimori",
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
      "Lairon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rigidify",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent’s next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Metal Claw",
        "cost": [
          "Metal",
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
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      304
    ],
    "flavorText": "It usually lives deep in mountains. However, hunger may drive it to eat railroad tracks and cars.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/123/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/123/high.webp"
    }
  },
  {
    "id": "sm10-124",
    "name": "Lairon",
    "number": "124",
    "artist": "Suwama Chiaki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Aron",
    "evolvesTo": [
      "Aggron"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rigidify",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent’s next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Headbutt",
        "cost": [
          "Metal",
          "Metal",
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
      305
    ],
    "flavorText": "It loves iron ore. Groups of them fight for territory by bashing one another with their steel bodies.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/124/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/124/high.webp"
    }
  },
  {
    "id": "sm10-125",
    "name": "Aggron",
    "number": "125",
    "artist": "Satoshi Shirai",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Lairon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Extra-Tight Press",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "During your opponent’s next turn, if this Pokémon is damaged by an attack (even if this Pokémon is Knocked Out), put 8 damage counters on the Attacking Pokémon."
      },
      {
        "name": "Giga Impact",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "160",
        "text": "This Pokémon can’t attack during your next turn."
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
      306
    ],
    "flavorText": "It claims an entire mountain as its own. The more wounds it has, the more it has battled, so don't take it lightly.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/125/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/125/high.webp"
    }
  },
  {
    "id": "sm10-126",
    "name": "Lucario",
    "number": "126",
    "artist": "Midori Harada",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Riolu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Low Sweep",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Rush Up",
        "cost": [
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "60+",
        "text": "If you attached a Pokémon Tool card from your hand to this Pokémon during this turn, this attack does 70 more damage."
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
      448
    ],
    "flavorText": "It concentrates its mental energy and fires off mysterious waves called auras, which can crush boulders of large size to dust.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/126/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/126/high.webp"
    }
  },
  {
    "id": "sm10-127",
    "name": "Genesect",
    "number": "127",
    "artist": "Anesaki Dynamic",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "130",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fast-Flight Configuration",
        "text": "If your opponent has any Pokémon-GX or Pokémon-EX in play, this Pokémon has no Retreat Cost.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Splitting Beam",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "This attack does 30 damage to 2 of your opponent’s Benched Pokémon. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
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
      649
    ],
    "flavorText": "This ancient bug Pokémon was altered by Team Plasma. They upgraded the cannon on its back.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/127/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/127/high.webp"
    }
  },
  {
    "id": "sm10-128",
    "name": "Meltan",
    "number": "128",
    "artist": "Kouki Saitou",
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
    "evolvesTo": [
      "Melmetal"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Steel Melt",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If your opponent’s Active Pokémon is a Metal Pokémon, this attack does 40 more damage."
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
      808
    ],
    "flavorText": "It melts particles of iron and other metals found in the subsoil, so it can absorb them into its body of molten steel.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/128/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/128/high.webp"
    }
  },
  {
    "id": "sm10-129",
    "name": "Melmetal",
    "number": "129",
    "artist": "Kouki Saitou",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "150",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Meltan",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Metal Eater",
        "text": "Once during your turn (before your attack), you may discard a Metal Pokémon from your hand. If you do, heal 100 damage from this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Heavy Impact",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "130",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      809
    ],
    "flavorText": "Revered long ago for its capacity to create iron from nothing, for some reason it has come back to life after 3,000 years.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/129/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/129/high.webp"
    }
  },
  {
    "id": "sm10-130",
    "name": "Gardevoir & Sylveon-GX",
    "number": "130",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "260",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Fairy Song",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Fairy Energy cards and attach them to your Benched Pokémon in any way you like. Then, shuffle your deck."
      },
      {
        "name": "Kaleidostorm",
        "cost": [
          "Fairy",
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Move any number of Energy from your Pokémon to your other Pokémon in any way you like."
      },
      {
        "name": "Magical Miracle GX",
        "cost": [
          "Fairy",
          "Fairy",
          "Fairy"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "If this Pokémon has at least 3 extra Fairy Energy attached to it (in addition to this attack’s cost), your opponent shuffles their hand into their deck. (You can’t use more than 1 GX attack in a game.)"
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
      282,
      700
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/130/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/130/high.webp"
    }
  },
  {
    "id": "sm10-131",
    "name": "Cleffa",
    "number": "131",
    "artist": "Shibuzoh.",
    "rarity": "Uncommon",
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
      "Clefairy"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Excitable Draw",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, shuffle your hand into your deck and then draw 6 cards. If you use this Ability, your turn ends.",
        "type": "Ability"
      }
    ],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      173
    ],
    "flavorText": "On nights with many shooting stars, they gather in packs and dance in circles. If you should see them, something good will happen!",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/131/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/131/high.webp"
    }
  },
  {
    "id": "sm10-132",
    "name": "Clefairy",
    "number": "132",
    "artist": "0313",
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
      "Clefable"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Slap",
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
      35
    ],
    "flavorText": "They're popular, but they're rare. Trainers who show them off recklessly may be targeted by thieves.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/132/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/132/high.webp"
    }
  },
  {
    "id": "sm10-133",
    "name": "Clefable",
    "number": "133",
    "artist": "Suwama Chiaki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Clefairy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Moon-Watching Dance",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "This attack does 30 more damage for each of your Pokémon that has any Fairy Energy attached to it."
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
      36
    ],
    "flavorText": "It can't help but hear a pin drop from over half a mile away, so it lives deep in the mountains where there aren't many people or Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/133/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/133/high.webp"
    }
  },
  {
    "id": "sm10-134",
    "name": "Jigglypuff",
    "number": "134",
    "artist": "Yumi",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Wigglytuff"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ball Roll",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Flip a coin until you get tails. This attack does 20 damage for each heads."
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
      39
    ],
    "flavorText": "Recordings of Jigglypuff's strange lullabies can be purchased from department stores. These CDs can be found near the bedding area.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/134/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/134/high.webp"
    }
  },
  {
    "id": "sm10-135",
    "name": "Wigglytuff",
    "number": "135",
    "artist": "miki kudo",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Jigglypuff",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Orb Polish",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put 3 Energy cards from your discard pile into your hand."
      },
      {
        "name": "Sleepy Ball",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Your opponent’s Active Pokémon is now Asleep."
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
      40
    ],
    "flavorText": "Thanks to its bouncy body and fine fur, this Pokémon is sought after. Holding one in your arms while you sleep feels great.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/135/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/135/high.webp"
    }
  },
  {
    "id": "sm10-136",
    "name": "Togepi",
    "number": "136",
    "artist": "Sekio",
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
      "Togetic"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Daunt",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "During your opponent’s next turn, the Defending Pokémon’s attacks do 30 less damage (before applying Weakness and Resistance)."
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
      175
    ],
    "flavorText": "The shell seems to be filled with joy. It is said that it will share good luck when treated kindly.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/136/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/136/high.webp"
    }
  },
  {
    "id": "sm10-137",
    "name": "Togetic",
    "number": "137",
    "artist": "sui",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Togepi",
    "evolvesTo": [
      "Togekiss"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Energy Present",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach an Energy card from your hand to 1 of your Benched Pokémon."
      },
      {
        "name": "Magical Shot",
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
      176
    ],
    "flavorText": "It grows dispirited if it is not with kind people. It can float in midair without moving its wings.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/137/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/137/high.webp"
    }
  },
  {
    "id": "sm10-138",
    "name": "Togekiss",
    "number": "138",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Togetic",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fairy Feast",
        "text": "Once during your turn (before your attack), you may heal 30 damage from each of your Fairy Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Magical Shot",
        "cost": [
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
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
      468
    ],
    "flavorText": "As everyone knows, it visits peaceful regions, bringing them gifts of kindness and sweet blessings.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/138/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/138/high.webp"
    }
  },
  {
    "id": "sm10-139",
    "name": "Cottonee",
    "number": "139",
    "artist": "Ken Sugimori",
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
      "Whimsicott"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Expand",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "During your opponent’s next turn, this Pokémon takes 10 less damage from attacks (after applying Weakness and Resistance)."
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
    "flavorText": "To protect itself, it shoots cotton from its body. When it gets wet in the rain, its cotton grows moist and heavy, and it can't move as well.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/139/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/139/high.webp"
    }
  },
  {
    "id": "sm10-140",
    "name": "Whimsicott-GX",
    "number": "140",
    "artist": "PLANETA Igarashi",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "190",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Cottonee",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Fluffy Cotton",
        "text": "If any damage is done to this Pokémon by attacks, flip a coin. If heads, prevent that damage.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Energy Blow",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "This attack does 30 more damage times the amount of Energy attached to this Pokémon."
      },
      {
        "name": "Toy Box GX",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 5 cards and put them into your hand. Then, shuffle your deck. (You can’t use more than 1 GX attack in a game.)"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/140/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/140/high.webp"
    }
  },
  {
    "id": "sm10-141",
    "name": "Spritzee",
    "number": "141",
    "artist": "MAHOU",
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
      "Aromatisse"
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
        "name": "Fairy Wind",
        "cost": [
          "Fairy"
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
      682
    ],
    "flavorText": "It emits a scent that enraptures those who smell it. This fragrance changes depending on what it has eaten.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/141/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/141/high.webp"
    }
  },
  {
    "id": "sm10-142",
    "name": "Aromatisse",
    "number": "142",
    "artist": "Saya Tsuruta",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Spritzee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pungent Aroma",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip 2 coins. If either of them is heads, your opponent reveals their hand. For each heads, choose a card you find there. Your opponent shuffles those cards into their deck."
      },
      {
        "name": "Miraculous Cologne",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, choose a Special Condition. Your opponent’s Active Pokémon is now affected by that Special Condition."
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
      683
    ],
    "flavorText": "It devises various scents, pleasant and unpleasant, and emits scents that its enemies dislike in order to gain an edge in battle.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/142/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/142/high.webp"
    }
  },
  {
    "id": "sm10-143",
    "name": "Rattata",
    "number": "143",
    "artist": "Eri Yamaki",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "30",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Raticate"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gnaw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      19
    ],
    "flavorText": "Its incisors grow continuously throughout its life. If its incisors get too long, this Pokémon becomes unable to eat, and it starves to death.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/143/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/143/high.webp"
    }
  },
  {
    "id": "sm10-144",
    "name": "Raticate",
    "number": "144",
    "artist": "Shigenori Negishi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Rattata",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Escaping Incisors",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "If your opponent’s Active Pokémon is an Evolution Pokémon, switch this Pokémon with 1 of your Benched Pokémon."
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
      20
    ],
    "flavorText": "People say that it fled from its enemies by using its small webbed hind feet to swim from island to island in Alola.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/144/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/144/high.webp"
    }
  },
  {
    "id": "sm10-145",
    "name": "Spearow",
    "number": "145",
    "artist": "tetsuya koizumi",
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
        "name": "Glide",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Speed Dive",
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
      21
    ],
    "flavorText": "Its reckless nature leads it to stand up to others—even large Pokémon—if it has to protect its territory.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/145/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/145/high.webp"
    }
  },
  {
    "id": "sm10-146",
    "name": "Fearow",
    "number": "146",
    "artist": "kawayoo",
    "rarity": "Uncommon",
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
        "name": "Drill Run Double",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "Flip a coin. If heads, discard 2 Energy from your opponent’s Active Pokémon."
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
      22
    ],
    "flavorText": "Carrying food through Fearow's territory is dangerous. It will snatch the food away from you in a flash!",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/146/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/146/high.webp"
    }
  },
  {
    "id": "sm10-147",
    "name": "Meowth",
    "number": "147",
    "artist": "Shibuzoh.",
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
        "name": "Caturday",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw 2 cards. If you do, this Pokémon is now Asleep."
      },
      {
        "name": "Tail Whap",
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
    "flavorText": "When visiting a junkyard, you may catch sight of it having an intense fight with Murkrow over shiny objects.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/147/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/147/high.webp"
    }
  },
  {
    "id": "sm10-148",
    "name": "Persian",
    "number": "148",
    "artist": "nagimiso",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Meowth",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Gathering of Cats",
        "text": "Ignore all Energy in the attack costs of each of your Pokémon in play that has the Caturday attack.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Claw Slash",
        "cost": [
          "Colorless",
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
        "type": "Fighting",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      53
    ],
    "flavorText": "Although the jewel on its forehead appears to be a different color than those of Alolan Persian, it's mostly made of the same material.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/148/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/148/high.webp"
    }
  },
  {
    "id": "sm10-149",
    "name": "Persian-GX",
    "number": "149",
    "artist": "PLANETA Igarashi",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Meowth",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Cat Walk",
        "text": "Once during your turn (before your attack), if 1 of your Pokémon-GX or Pokémon-EX was Knocked Out during your opponent’s last turn, you may search your deck for up to 2 cards and put them into your hand. Then, shuffle your deck. You can’t use more than 1 Cat Walk Ability each turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Vengeance",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "10+",
        "text": "This attack does 20 more damage for each Pokémon in your discard pile. You can’t add more than 180 damage in this way."
      },
      {
        "name": "Slash Back GX",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon. (You can’t use more than 1 GX attack in a game.)"
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
      53
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/149/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/149/high.webp"
    }
  },
  {
    "id": "sm10-150",
    "name": "Doduo",
    "number": "150",
    "artist": "kodama",
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
      "Dodrio"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Peck",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Double Peck",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Flip 2 coins. This attack does 20 damage for each heads."
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
      84
    ],
    "flavorText": "A two-headed Pokémon that was discovered as a sudden mutation. It runs at a pace of over 60 miles per hour.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/150/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/150/high.webp"
    }
  },
  {
    "id": "sm10-151",
    "name": "Dodrio",
    "number": "151",
    "artist": "Misa Tsutsui",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Doduo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tri Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60×",
        "text": "Flip 3 coins. This attack does 60 damage for each heads."
      },
      {
        "name": "Accelerating Stab",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90",
        "text": "This Pokémon can’t use Accelerating Stab during your next turn."
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
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      85
    ],
    "flavorText": "An enemy that takes its eyes off any of the three heads—even for a second—will get pecked severely.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/151/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/151/high.webp"
    }
  },
  {
    "id": "sm10-152",
    "name": "Lickitung",
    "number": "152",
    "artist": "Yukiko Baba",
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
    "evolvesTo": [
      "Lickilicky"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Lick",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, your opponent’s Active Pokémon is now Paralyzed."
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
      108
    ],
    "flavorText": "It checks out whatever's around it by licking everything. If you don't clean off a spot where it's licked you, you'll break out in a rash!",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/152/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/152/high.webp"
    }
  },
  {
    "id": "sm10-153",
    "name": "Lickilicky",
    "number": "153",
    "artist": "sui",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Lickitung",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Eat Up",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Before doing damage, discard all Pokémon Tool cards from your opponent’s Active Pokémon. If you discarded a Pokémon Tool card in this way, heal all damage from this Pokémon."
      },
      {
        "name": "Tonguenado",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60×",
        "text": "Flip 4 coins. This attack does 60 damage for each heads."
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
      463
    ],
    "flavorText": "A contest is under way to determine which one can stick its tongue out the farthest. The current record is…more than 82 feet.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/153/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/153/high.webp"
    }
  },
  {
    "id": "sm10-154",
    "name": "Porygon",
    "number": "154",
    "artist": "Ayaka Yoshida",
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
      "Porygon2"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Digicharge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip 3 coins. For each heads, search your deck for an Energy card, reveal it, and put it into your hand. Then, shuffle your deck."
      },
      {
        "name": "Sharp Point",
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
      137
    ],
    "flavorText": "This Pokémon was created using the cutting-edge science of 20 years ago, so many parts of it have since become obsolete.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/154/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/154/high.webp"
    }
  },
  {
    "id": "sm10-155",
    "name": "Porygon",
    "number": "155",
    "artist": "Suwama Chiaki",
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
        "name": "Quick Draw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card."
      },
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
    "flavorText": "This Pokémon was created using the cutting-edge science of 20 years ago, so many parts of it have since become obsolete.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/155/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/155/high.webp"
    }
  },
  {
    "id": "sm10-156",
    "name": "Porygon2",
    "number": "156",
    "artist": "sowsow",
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
        "name": "Double Draw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw 2 cards."
      },
      {
        "name": "Spinning Attack",
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
    "flavorText": "AI has been installed in it. It learns various things all on its own, but it even remembers things it doesn't need to know.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/156/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/156/high.webp"
    }
  },
  {
    "id": "sm10-157",
    "name": "Porygon-Z",
    "number": "157",
    "artist": "Misa Tsutsui",
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
        "name": "Crazy Code",
        "text": "As often as you like during your turn (before your attack), you may attach a Special Energy card from your hand to 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Tantrum",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This Pokémon is now Confused."
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
    "flavorText": "Its behavior is noticeably unstable, which is apparently due to the incompetence of the engineer who updated its programming.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/157/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/157/high.webp"
    }
  },
  {
    "id": "sm10-158",
    "name": "Snorlax",
    "number": "158",
    "artist": "kanahei",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "150",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Lazy Eating",
        "text": "Between turns, heal 10 damage from this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Big Counter",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "If your opponent’s Active Pokémon is a TAG TEAM, this attack does 120 more damage."
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
    "flavorText": "It doesn't do anything other than eat and sleep. When prompted to make a serious effort, though, it apparently displays awesome power.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/158/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/158/high.webp"
    }
  },
  {
    "id": "sm10-159",
    "name": "Glameow",
    "number": "159",
    "artist": "sowsow",
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
      "Purugly"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Caturday",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card. If you do, this Pokémon is now Asleep."
      },
      {
        "name": "Boing Boing Tail",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 60 damage to 1 of your opponent’s Pokémon-GX or Pokémon-EX. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
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
      431
    ],
    "flavorText": "It claws if displeased and purrs when affectionate. Its fickleness is very popular among some.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/159/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/159/high.webp"
    }
  },
  {
    "id": "sm10-160",
    "name": "Purugly",
    "number": "160",
    "artist": "Tomokazu Komiya",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Glameow",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stray Cat Dash",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Discard a random card from your opponent’s hand. If this Pokémon evolved from Glameow during this turn, discard 2 cards instead of 1."
      },
      {
        "name": "Lunge Out",
        "cost": [
          "Colorless",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      432
    ],
    "flavorText": "It would claim another Pokémon's nest as its own if it finds a nest sufficiently comfortable.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/160/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/160/high.webp"
    }
  },
  {
    "id": "sm10-161",
    "name": "Happiny",
    "number": "161",
    "artist": "Eri Yamaki",
    "rarity": "Uncommon",
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
      "Chansey"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Playhouse Heal",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, heal 60 damage from 1 of your Pokémon. If you use this Ability, your turn ends.",
        "type": "Ability"
      }
    ],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      440
    ],
    "flavorText": "Usually it's a well-behaved Pokémon, but if you take its round rock away, it will cry and fuss and throw a big old tantrum.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/161/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/161/high.webp"
    }
  },
  {
    "id": "sm10-162",
    "name": "Chatot",
    "number": "162",
    "artist": "HYOGONOSUKE",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mimic",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Shuffle your hand into your deck. Then, draw a card for each card in your opponent’s hand."
      },
      {
        "name": "Tone-Deaf",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Your opponent’s Active Pokémon is now Confused."
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
      441
    ],
    "flavorText": "It mimics the cries of other Pokémon to trick them into thinking it's one of them. This way they won't attack it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/162/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/162/high.webp"
    }
  },
  {
    "id": "sm10-163",
    "name": "Celesteela-GX",
    "number": "163",
    "artist": "PLANETA Igarashi",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "200",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Force Canceler",
        "text": "As long as this Pokémon is your Active Pokémon, prevent all effects of your opponent’s GX attacks, including damage, done to your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Power Cyclone",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
      },
      {
        "name": "Discovery GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Count your Prize cards and put them into your hand. Then, take that many cards from the top of your deck and put them face down as your Prize cards. If you don’t have that many cards in your deck, this attack does nothing. (You can’t use more than 1 GX attack in a game.)"
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      797
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/163/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/163/high.webp"
    }
  },
  {
    "id": "sm10-164",
    "name": "Beast Bringer",
    "number": "164",
    "artist": "Ayaka Yoshida",
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
      "If you have exactly 6 Prize cards remaining, and if your opponent's Active Pokémon-GX or Pokémon-EX is Knocked Out by damage from an attack of the Ultra Beast this card is attached to, take 1 more Prize card.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/164/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/164/high.webp"
    }
  },
  {
    "id": "sm10-165",
    "name": "Chip-Chip Ice Axe",
    "number": "165",
    "artist": "Yoshinobu Saito",
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
      "Look at the top 3 cards of your opponent's deck and choose 1 of them. Your opponent shuffles the other cards back into their deck. Then, put the card you chose on top of their deck.",
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
      "expanded": "Banned"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/165/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/165/high.webp"
    }
  },
  {
    "id": "sm10-166",
    "name": "Devolution Spray Z",
    "number": "166",
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
      "Devolve 1 of your evolved Pokémon by shuffling any number of Evolution cards on it into your deck. (That Pokémon can't evolve this turn.)",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/166/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/166/high.webp"
    }
  },
  {
    "id": "sm10-167",
    "name": "Dusk Stone",
    "number": "167",
    "artist": "Ryo Ueda",
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
      "Search your deck for a Mismagius, Honchkrow, Chandelure, or Aegislash, including Pokémon-GX, that evolves from 1 of your Pokémon in play, and put it onto that Pokémon to evolve it. Then, shuffle your deck. You can use this card during your first turn or on a Pokémon that was put into play this turn.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/167/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/167/high.webp"
    }
  },
  {
    "id": "sm10-168",
    "name": "Dust Island",
    "number": "168",
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
      "Whenever either player switches their Poisoned Active Pokémon with 1 of their Benched Pokémon with the effect of a Trainer card, the new Active Pokémon is now affected by that Special Condition.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/168/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/168/high.webp"
    }
  },
  {
    "id": "sm10-169",
    "name": "Electromagnetic Radar",
    "number": "169",
    "artist": "Yoshinobu Saito",
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
      "You can play this card only if you discard 2 other cards from your hand.",
      "Search your deck for up to 2 in any combination of Lightning Pokémon-GX and Lightning Pokémon-EX, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/169/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/169/high.webp"
    }
  },
  {
    "id": "sm10-170",
    "name": "Energy Spinner",
    "number": "170",
    "artist": "Ryo Ueda",
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
      "Search your deck for a basic Energy card, reveal it, and put it into your hand. If you go second and it's your first turn, search for up to 3 basic Energy cards instead of 1. Then, shuffle your deck.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/170/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/170/high.webp"
    }
  },
  {
    "id": "sm10-171",
    "name": "Fairy Charm Ability",
    "number": "171",
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
      "Prevent all damage done to the Fairy Pokémon this card is attached to by attacks from your opponent's Pokémon-GX and Pokémon-EX that have Abilities.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/171/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/171/high.webp"
    }
  },
  {
    "id": "sm10-172",
    "name": "Fairy Charm Lightning",
    "number": "172",
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
      "Prevent all damage done to the Fairy Pokémon this card is attached to by attacks from your opponent's Lightning Pokémon-GX and Lightning Pokémon-EX.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/172/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/172/high.webp"
    }
  },
  {
    "id": "sm10-173",
    "name": "Fire Crystal",
    "number": "173",
    "artist": "Yoshinobu Saito",
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
      "Put 3 Fire Energy cards from your discard pile into your hand.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/173/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/173/high.webp"
    }
  },
  {
    "id": "sm10-174",
    "name": "Giovanni's Exile",
    "number": "174",
    "artist": "Megumi Mizutani",
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
      "Discard up to 2 of your Benched Pokémon that have no damage counters on them and all cards attached to them.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/174/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/174/high.webp"
    }
  },
  {
    "id": "sm10-175",
    "name": "Green's Exploration",
    "number": "175",
    "artist": "Naoki Saito",
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
      "You can play this card only if you have no Pokémon with Abilities in play.",
      "Search your deck for up to 2 Trainer cards, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/175/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/175/high.webp"
    }
  },
  {
    "id": "sm10-176",
    "name": "Janine",
    "number": "176",
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
      "Look at the top 4 cards of your deck and put 2 of them into your hand. Shuffle the other cards back into your deck.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/176/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/176/high.webp"
    }
  },
  {
    "id": "sm10-177",
    "name": "Koga's Trap",
    "number": "177",
    "artist": "Megumi Mizutani",
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
      "Your opponent's Active Pokémon is now Confused and Poisoned.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/177/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/177/high.webp"
    }
  },
  {
    "id": "sm10-178",
    "name": "Lt. Surge's Strategy",
    "number": "178",
    "artist": "Megumi Mizutani",
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
      "You can play this card only if you have more Prize cards remaining than your opponent.",
      "During this turn, you can play 3 Supporter cards (including this card).",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/178/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/178/high.webp"
    }
  },
  {
    "id": "sm10-179",
    "name": "Martial Arts Dojo",
    "number": "179",
    "artist": "5ban Graphics",
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
      "The attacks of non-Ultra Beast Pokémon that have any basic Fighting Energy attached to them (both yours and your opponent's) do 10 more damage to the opponent's Active Pokémon (before applying Weakness and Resistance). If the attacking player has more Prize cards remaining than their opponent, those attacks do 40 more damage instead.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/179/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/179/high.webp"
    }
  },
  {
    "id": "sm10-180",
    "name": "Metal Core Barrier",
    "number": "180",
    "artist": "Studio Bora Inc.",
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
      "If this card is attached to 1 of your Pokémon, discard it at the end of your opponent's turn.",
      "The Metal Pokémon this card is attached to takes 70 less damage from your opponent's attacks (after applying Weakness and Resistance).",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/180/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/180/high.webp"
    }
  },
  {
    "id": "sm10-181",
    "name": "Molayne",
    "number": "181",
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
      "You can play this card only if you discard 2 Metal Energy cards from your hand.",
      "Shuffle a Trainer card from your discard pile into your deck.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/181/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/181/high.webp"
    }
  },
  {
    "id": "sm10-182",
    "name": "Pokégear 3.0",
    "number": "182",
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
      "Look at the top 7 cards of your deck. You may reveal a Supporter card you find there and put it into your hand. Shuffle the other cards back into your deck.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/182/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/182/high.webp"
    }
  },
  {
    "id": "sm10-182a",
    "name": "Pokégear 3.0",
    "number": "182a",
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
      "Look at the top 7 cards of your deck. You may reveal a Supporter card you find there and put it into your hand. Shuffle the other cards back into your deck.",
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
      "small": "https://images.pokemontcg.io/sm10/182a.png",
      "large": "https://images.pokemontcg.io/sm10/182a_hires.png"
    }
  },
  {
    "id": "sm10-182b",
    "name": "Pokégear 3.0",
    "number": "182b",
    "artist": "OOYAMA",
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
      "Look at the top 7 cards of your deck. You may reveal a Supporter card you find there and put it into your hand. Shuffle the other cards back into your deck.",
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
      "small": "https://images.pokemontcg.io/sm10/182b.png",
      "large": "https://images.pokemontcg.io/sm10/182b_hires.png"
    }
  },
  {
    "id": "sm10-183",
    "name": "Power Plant",
    "number": "183",
    "artist": "aky CG Works",
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
      "Pokémon-GX and Pokémon-EX in play (both yours and your opponent's) have no Abilities.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/183/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/183/high.webp"
    }
  },
  {
    "id": "sm10-184",
    "name": "Red's Challenge",
    "number": "184",
    "artist": "Megumi Mizutani",
    "rarity": "Rare Holo",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can play this card only if you discard 2 other cards from your hand.",
      "Search your deck for a card and put it into your hand. Then, shuffle your deck.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/184/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/184/high.webp"
    }
  },
  {
    "id": "sm10-185",
    "name": "Samson Oak",
    "number": "185",
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
      "Draw 2 cards. If both Active Pokémon are the same type, draw 2 more cards.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/185/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/185/high.webp"
    }
  },
  {
    "id": "sm10-186",
    "name": "Stealthy Hood",
    "number": "186",
    "artist": "Ryo Ueda",
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
      "Prevent all effects of your opponent's Abilities done to the Pokémon this card is attached to. Remove any such existing effects.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/186/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/186/high.webp"
    }
  },
  {
    "id": "sm10-187",
    "name": "Surprise Box",
    "number": "187",
    "artist": "Ryo Ueda",
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
      "Put a card from your opponent's discard pile into their hand.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/187/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/187/high.webp"
    }
  },
  {
    "id": "sm10-188",
    "name": "Ultra Forest Kartenvoy",
    "number": "188",
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
      "During this turn, damage from your Ultra Beasts' attacks isn't affected by any effects on your opponent's Active Pokémon.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/188/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/188/high.webp"
    }
  },
  {
    "id": "sm10-189",
    "name": "Welder",
    "number": "189",
    "artist": "Hitoshi Ariga",
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
      "Attach up to 2 Fire Energy cards from your hand to 1 of your Pokémon. If you do, draw 3 cards.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/189/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/189/high.webp"
    }
  },
  {
    "id": "sm10-189a",
    "name": "Welder",
    "number": "189a",
    "artist": "Hitoshi Ariga",
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
      "Attach up to 2 Fire Energy cards from your hand to 1 of your Pokémon. If you do, draw 3 cards.",
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
      "small": "https://images.pokemontcg.io/sm10/189a.png",
      "large": "https://images.pokemontcg.io/sm10/189a_hires.png"
    }
  },
  {
    "id": "sm10-190",
    "name": "Triple Acceleration Energy",
    "number": "190",
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
      "This card can only be attached to Evolution Pokémon. If this card is attached to 1 of your Pokémon, discard it at the end of the turn.",
      "This card provides ColorlessColorlessColorless Energy only while it is attached to an Evolution Pokémon.",
      "If this card is attached to anything other than an Evolution Pokémon, discard this card."
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/190/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/190/high.webp"
    }
  },
  {
    "id": "sm10-191",
    "name": "Pheromosa & Buzzwole-GX",
    "number": "191",
    "artist": "aky CG Works",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX",
      "Ultra Beast"
    ],
    "hp": "260",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Jet Punch",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This attack does 30 damage to 1 of your opponent’s Benched Pokémon. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Elegant Sole",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "190",
        "text": "During your next turn, this Pokémon’s Elegant Sole attack’s base damage is 60."
      },
      {
        "name": "Beast Game GX",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "If your opponent’s Pokémon is Knocked Out by damage from this attack, take 1 more Prize card. If this Pokémon has at least 7 extra Energy attached to it (in addition to this attack’s cost), take 3 more Prize cards instead. (You can’t use more than 1 GX attack in a game.)"
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
      794,
      795
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/191/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/191/high.webp"
    }
  },
  {
    "id": "sm10-192",
    "name": "Pheromosa & Buzzwole-GX",
    "number": "192",
    "artist": "kirisAki",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX",
      "Ultra Beast"
    ],
    "hp": "260",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Jet Punch",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This attack does 30 damage to 1 of your opponent’s Benched Pokémon. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Elegant Sole",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "190",
        "text": "During your next turn, this Pokémon’s Elegant Sole attack’s base damage is 60."
      },
      {
        "name": "Beast Game GX",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "If your opponent’s Pokémon is Knocked Out by damage from this attack, take 1 more Prize card. If this Pokémon has at least 7 extra Energy attached to it (in addition to this attack’s cost), take 3 more Prize cards instead. (You can’t use more than 1 GX attack in a game.)"
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
      794,
      795
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/192/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/192/high.webp"
    }
  },
  {
    "id": "sm10-193",
    "name": "Venomoth-GX",
    "number": "193",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Venonat",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Shinobi Mastery",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110+",
        "text": "If you played Koga’s Trap from your hand during this turn, this attack does 90 more damage. If you played Janine from your hand during this turn, prevent all damage done to this Pokémon by attacks from Basic Pokémon during your opponent’s next turn."
      },
      {
        "name": "Ten-Card Return GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "60",
        "text": "Shuffle your hand into your deck. Then, draw 10 cards. (You can’t use more than 1 GX attack in a game.)"
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
      49
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/193/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/193/high.webp"
    }
  },
  {
    "id": "sm10-194",
    "name": "Reshiram & Charizard-GX",
    "number": "194",
    "artist": "aky CG Works",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "270",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Outrage",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 10 more damage for each damage counter on this Pokémon."
      },
      {
        "name": "Flare Strike",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "230",
        "text": "This Pokémon can’t use Flare Strike during your next turn."
      },
      {
        "name": "Double Blaze GX",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "200+",
        "text": "If this Pokémon has at least 3 extra Fire Energy attached to it (in addition to this attack’s cost), this attack does 100 more damage, and this attack’s damage isn’t affected by any effects on your opponent’s Active Pokémon. (You can’t use more than 1 GX attack in a game.)"
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
      6,
      643
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/194/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/194/high.webp"
    }
  },
  {
    "id": "sm10-195",
    "name": "Dedenne-GX",
    "number": "195",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "160",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dedechange",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may discard your hand and draw 6 cards. You can’t use more than 1 Dedechange Ability each turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Static Shock",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Tingly Return GX",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Your opponent’s Active Pokémon is now Paralyzed. Put this Pokémon and all cards attached to it into your hand. (You can’t use more than 1 GX attack in a game.)"
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
      702
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/195/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/195/high.webp"
    }
  },
  {
    "id": "sm10-195a",
    "name": "Dedenne-GX",
    "number": "195a",
    "artist": "kanahei",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "160",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dedechange",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may discard your hand and draw 6 cards. You can't use more than 1 Dedechange Ability each turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Static Shock",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Tingly Return-GX",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Your opponent's Active Pokémon is now Paralyzed. Put this Pokémon and all cards attached to it into your hand. (You can't use more than 1 GX attack in a game.)"
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
      702
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm10/195a.png",
      "large": "https://images.pokemontcg.io/sm10/195a_hires.png"
    }
  },
  {
    "id": "sm10-196",
    "name": "Muk & Alolan Muk-GX",
    "number": "196",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "270",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Severe Poison",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Your opponent’s Active Pokémon is now Poisoned. Put 8 damage counters instead of 1 on that Pokémon between turns."
      },
      {
        "name": "Poison Absorption",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120",
        "text": "If your opponent’s Active Pokémon is Poisoned, heal 100 damage from this Pokémon."
      },
      {
        "name": "Nasty Goo Mix GX",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Your opponent’s Active Pokémon is now Paralyzed and Poisoned. If this Pokémon has at least 4 extra Energy attached to it (in addition to this attack’s cost), put 15 damage counters instead of 1 on that Pokémon between turns. (You can’t use more than 1 GX attack in a game.)"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      89
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/196/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/196/high.webp"
    }
  },
  {
    "id": "sm10-197",
    "name": "Muk & Alolan Muk-GX",
    "number": "197",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "270",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Severe Poison",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Your opponent’s Active Pokémon is now Poisoned. Put 8 damage counters instead of 1 on that Pokémon between turns."
      },
      {
        "name": "Poison Absorption",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120",
        "text": "If your opponent’s Active Pokémon is Poisoned, heal 100 damage from this Pokémon."
      },
      {
        "name": "Nasty Goo Mix GX",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Your opponent’s Active Pokémon is now Paralyzed and Poisoned. If this Pokémon has at least 4 extra Energy attached to it (in addition to this attack’s cost), put 15 damage counters instead of 1 on that Pokémon between turns. (You can’t use more than 1 GX attack in a game.)"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      89
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/197/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/197/high.webp"
    }
  },
  {
    "id": "sm10-198",
    "name": "Marshadow & Machamp-GX",
    "number": "198",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "270",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Revenge",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If any of your Pokémon were Knocked Out by damage from an opponent’s attack during their last turn, this attack does 90 more damage."
      },
      {
        "name": "Hundred-Blows Impact",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": ""
      },
      {
        "name": "Acme of Heroism GX",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "If this Pokémon has at least 1 extra Energy attached to it (in addition to this attack’s cost), and if it would be Knocked Out by damage from an opponent’s attack during their next turn, it is not Knocked Out, and its remaining HP becomes 10. (You can’t use more than 1 GX attack in a game.)"
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
      802,
      68
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/198/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/198/high.webp"
    }
  },
  {
    "id": "sm10-199",
    "name": "Marshadow & Machamp-GX",
    "number": "199",
    "artist": "You Iribi",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "270",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Revenge",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If any of your Pokémon were Knocked Out by damage from an opponent’s attack during their last turn, this attack does 90 more damage."
      },
      {
        "name": "Hundred-Blows Impact",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": ""
      },
      {
        "name": "Acme of Heroism GX",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "If this Pokémon has at least 1 extra Energy attached to it (in addition to this attack’s cost), and if it would be Knocked Out by damage from an opponent’s attack during their next turn, it is not Knocked Out, and its remaining HP becomes 10. (You can’t use more than 1 GX attack in a game.)"
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
      802,
      68
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/199/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/199/high.webp"
    }
  },
  {
    "id": "sm10-200",
    "name": "Greninja & Zoroark-GX",
    "number": "200",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Dark Pulse",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 30 more damage times the amount of Darkness Energy attached to all of your Pokémon."
      },
      {
        "name": "Dark Union GX",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put 2 in any combination of Darkness Pokémon-GX and Darkness Pokémon-EX from your discard pile onto your Bench. If this Pokémon has at least 1 extra Energy attached to it (in addition to this attack’s cost), attach 2 Energy cards from your discard pile to each Pokémon that you put onto your Bench in this way. (You can’t use more than 1 GX attack in a game.)"
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
      658,
      571
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/200/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/200/high.webp"
    }
  },
  {
    "id": "sm10-201",
    "name": "Greninja & Zoroark-GX",
    "number": "201",
    "artist": "kodama",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Dark Pulse",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 30 more damage times the amount of Darkness Energy attached to all of your Pokémon."
      },
      {
        "name": "Dark Union GX",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put 2 in any combination of Darkness Pokémon-GX and Darkness Pokémon-EX from your discard pile onto your Bench. If this Pokémon has at least 1 extra Energy attached to it (in addition to this attack’s cost), attach 2 Energy cards from your discard pile to each Pokémon that you put onto your Bench in this way. (You can’t use more than 1 GX attack in a game.)"
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
      658,
      571
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/201/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/201/high.webp"
    }
  },
  {
    "id": "sm10-202",
    "name": "Honchkrow-GX",
    "number": "202",
    "artist": "sadaji",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "210",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Murkrow",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Ruler of the Night",
        "text": "As long as this Pokémon is your Active Pokémon, your opponent can’t play any Pokémon Tool, Special Energy, or Stadium cards from their hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Feather Storm",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "This attack does 30 damage to 2 of your opponent’s Benched Pokémon-GX and Pokémon-EX. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Unfair GX",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Your opponent reveals their hand. Discard 2 cards from it. (You can’t use more than 1 GX attack in a game.)"
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
      430
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/202/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/202/high.webp"
    }
  },
  {
    "id": "sm10-203",
    "name": "Lucario & Melmetal-GX",
    "number": "203",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "260",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Steel Fist",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Search your deck for a Metal Energy card and attach it to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Heavy Impact",
        "cost": [
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "150",
        "text": ""
      },
      {
        "name": "Full Metal Wall GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "For the rest of this game, your Metal Pokémon take 30 less damage from your opponent’s attacks (after applying Weakness and Resistance). If this Pokémon has at least 1 extra Energy attached to it (in addition to this attack’s cost), discard all Energy from your opponent’s Active Pokémon. (You can’t use more than 1 GX attack in a game.)"
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
      448,
      809
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/203/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/203/high.webp"
    }
  },
  {
    "id": "sm10-204",
    "name": "Gardevoir & Sylveon-GX",
    "number": "204",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "260",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Fairy Song",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Fairy Energy cards and attach them to your Benched Pokémon in any way you like. Then, shuffle your deck."
      },
      {
        "name": "Kaleidostorm",
        "cost": [
          "Fairy",
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Move any number of Energy from your Pokémon to your other Pokémon in any way you like."
      },
      {
        "name": "Magical Miracle GX",
        "cost": [
          "Fairy",
          "Fairy",
          "Fairy"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "If this Pokémon has at least 3 extra Fairy Energy attached to it (in addition to this attack’s cost), your opponent shuffles their hand into their deck. (You can’t use more than 1 GX attack in a game.)"
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
      282,
      700
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/204/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/204/high.webp"
    }
  },
  {
    "id": "sm10-205",
    "name": "Gardevoir & Sylveon-GX",
    "number": "205",
    "artist": "Atsuko Nishida",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "260",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Fairy Song",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Fairy Energy cards and attach them to your Benched Pokémon in any way you like. Then, shuffle your deck."
      },
      {
        "name": "Kaleidostorm",
        "cost": [
          "Fairy",
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Move any number of Energy from your Pokémon to your other Pokémon in any way you like."
      },
      {
        "name": "Magical Miracle GX",
        "cost": [
          "Fairy",
          "Fairy",
          "Fairy"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "If this Pokémon has at least 3 extra Fairy Energy attached to it (in addition to this attack’s cost), your opponent shuffles their hand into their deck. (You can’t use more than 1 GX attack in a game.)"
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
      282,
      700
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/205/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/205/high.webp"
    }
  },
  {
    "id": "sm10-206",
    "name": "Whimsicott-GX",
    "number": "206",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "190",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Cottonee",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Fluffy Cotton",
        "text": "If any damage is done to this Pokémon by attacks, flip a coin. If heads, prevent that damage.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Energy Blow",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "This attack does 30 more damage times the amount of Energy attached to this Pokémon."
      },
      {
        "name": "Toy Box GX",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 5 cards and put them into your hand. Then, shuffle your deck. (You can’t use more than 1 GX attack in a game.)"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/206/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/206/high.webp"
    }
  },
  {
    "id": "sm10-207",
    "name": "Persian-GX",
    "number": "207",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Meowth",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Cat Walk",
        "text": "Once during your turn (before your attack), if 1 of your Pokémon-GX or Pokémon-EX was Knocked Out during your opponent’s last turn, you may search your deck for up to 2 cards and put them into your hand. Then, shuffle your deck. You can’t use more than 1 Cat Walk Ability each turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Vengeance",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "10+",
        "text": "This attack does 20 more damage for each Pokémon in your discard pile. You can’t add more than 180 damage in this way."
      },
      {
        "name": "Slash Back GX",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon. (You can’t use more than 1 GX attack in a game.)"
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
      53
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/207/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/207/high.webp"
    }
  },
  {
    "id": "sm10-208",
    "name": "Celesteela-GX",
    "number": "208",
    "artist": "aky CG Works",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "200",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Force Canceler",
        "text": "As long as this Pokémon is your Active Pokémon, prevent all effects of your opponent’s GX attacks, including damage, done to your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Power Cyclone",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
      },
      {
        "name": "Discovery GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Count your Prize cards and put them into your hand. Then, take that many cards from the top of your deck and put them face down as your Prize cards. If you don’t have that many cards in your deck, this attack does nothing. (You can’t use more than 1 GX attack in a game.)"
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      797
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/208/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/208/high.webp"
    }
  },
  {
    "id": "sm10-209",
    "name": "Green's Exploration",
    "number": "209",
    "artist": "Naoki Saito",
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
      "You can play this card only if you have no Pokémon with Abilities in play.",
      "Search your deck for up to 2 Trainer cards, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/209/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/209/high.webp"
    }
  },
  {
    "id": "sm10-210",
    "name": "Janine",
    "number": "210",
    "artist": "Hideki Ishikawa",
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
      "Look at the top 4 cards of your deck and put 2 of them into your hand. Shuffle the other cards back into your deck.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/210/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/210/high.webp"
    }
  },
  {
    "id": "sm10-211",
    "name": "Koga's Trap",
    "number": "211",
    "artist": "TOKIYA",
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
      "Your opponent's Active Pokémon is now Confused and Poisoned.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/211/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/211/high.webp"
    }
  },
  {
    "id": "sm10-212",
    "name": "Molayne",
    "number": "212",
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
      "You can play this card only if you discard 2 Metal Energy cards from your hand.",
      "Shuffle a Trainer card from your discard pile into your deck.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/212/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/212/high.webp"
    }
  },
  {
    "id": "sm10-213",
    "name": "Red's Challenge",
    "number": "213",
    "artist": "Naoki Saito",
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
      "You can play this card only if you discard 2 other cards from your hand.",
      "Search your deck for a card and put it into your hand. Then, shuffle your deck.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/213/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/213/high.webp"
    }
  },
  {
    "id": "sm10-214",
    "name": "Welder",
    "number": "214",
    "artist": "Hitoshi Ariga",
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
      "Attach up to 2 Fire Energy cards from your hand to 1 of your Pokémon. If you do, draw 3 cards.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/214/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/214/high.webp"
    }
  },
  {
    "id": "sm10-215",
    "name": "Pheromosa & Buzzwole-GX",
    "number": "215",
    "artist": "aky CG Works",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX",
      "Ultra Beast"
    ],
    "hp": "260",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Jet Punch",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This attack does 30 damage to 1 of your opponent’s Benched Pokémon. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Elegant Sole",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "190",
        "text": "During your next turn, this Pokémon’s Elegant Sole attack’s base damage is 60."
      },
      {
        "name": "Beast Game GX",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "If your opponent’s Pokémon is Knocked Out by damage from this attack, take 1 more Prize card. If this Pokémon has at least 7 extra Energy attached to it (in addition to this attack’s cost), take 3 more Prize cards instead. (You can’t use more than 1 GX attack in a game.)"
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
      794,
      795
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/215/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/215/high.webp"
    }
  },
  {
    "id": "sm10-216",
    "name": "Venomoth-GX",
    "number": "216",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Venonat",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Shinobi Mastery",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110+",
        "text": "If you played Koga’s Trap from your hand during this turn, this attack does 90 more damage. If you played Janine from your hand during this turn, prevent all damage done to this Pokémon by attacks from Basic Pokémon during your opponent’s next turn."
      },
      {
        "name": "Ten-Card Return GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "60",
        "text": "Shuffle your hand into your deck. Then, draw 10 cards. (You can’t use more than 1 GX attack in a game.)"
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
      49
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/216/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/216/high.webp"
    }
  },
  {
    "id": "sm10-217",
    "name": "Reshiram & Charizard-GX",
    "number": "217",
    "artist": "aky CG Works",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "270",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Outrage",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 10 more damage for each damage counter on this Pokémon."
      },
      {
        "name": "Flare Strike",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "230",
        "text": "This Pokémon can’t use Flare Strike during your next turn."
      },
      {
        "name": "Double Blaze GX",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "200+",
        "text": "If this Pokémon has at least 3 extra Fire Energy attached to it (in addition to this attack’s cost), this attack does 100 more damage, and this attack’s damage isn’t affected by any effects on your opponent’s Active Pokémon. (You can’t use more than 1 GX attack in a game.)"
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
      6,
      643
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/217/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/217/high.webp"
    }
  },
  {
    "id": "sm10-218",
    "name": "Blastoise-GX",
    "number": "218",
    "artist": "sadaji",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "240",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wartortle",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Solid Shell",
        "text": "This Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rocket Splash",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "60×",
        "text": "Shuffle any amount of Water Energy from your Pokémon into your deck. This attack does 60 damage for each card you shuffled into your deck in this way."
      },
      {
        "name": "Giant Geyser GX",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach any number of Water Energy cards from your hand to your Pokémon in any way you like. (You can’t use more than 1 GX attack in a game.)"
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
      9
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/218/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/218/high.webp"
    }
  },
  {
    "id": "sm10-219",
    "name": "Dedenne-GX",
    "number": "219",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "160",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dedechange",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may discard your hand and draw 6 cards. You can’t use more than 1 Dedechange Ability each turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Static Shock",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Tingly Return GX",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Your opponent’s Active Pokémon is now Paralyzed. Put this Pokémon and all cards attached to it into your hand. (You can’t use more than 1 GX attack in a game.)"
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
      702
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/219/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/219/high.webp"
    }
  },
  {
    "id": "sm10-220",
    "name": "Muk & Alolan Muk-GX",
    "number": "220",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "270",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Severe Poison",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Your opponent’s Active Pokémon is now Poisoned. Put 8 damage counters instead of 1 on that Pokémon between turns."
      },
      {
        "name": "Poison Absorption",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120",
        "text": "If your opponent’s Active Pokémon is Poisoned, heal 100 damage from this Pokémon."
      },
      {
        "name": "Nasty Goo Mix GX",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Your opponent’s Active Pokémon is now Paralyzed and Poisoned. If this Pokémon has at least 4 extra Energy attached to it (in addition to this attack’s cost), put 15 damage counters instead of 1 on that Pokémon between turns. (You can’t use more than 1 GX attack in a game.)"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      89
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/220/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/220/high.webp"
    }
  },
  {
    "id": "sm10-221",
    "name": "Marshadow & Machamp-GX",
    "number": "221",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "270",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Revenge",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If any of your Pokémon were Knocked Out by damage from an opponent’s attack during their last turn, this attack does 90 more damage."
      },
      {
        "name": "Hundred-Blows Impact",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": ""
      },
      {
        "name": "Acme of Heroism GX",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "If this Pokémon has at least 1 extra Energy attached to it (in addition to this attack’s cost), and if it would be Knocked Out by damage from an opponent’s attack during their next turn, it is not Knocked Out, and its remaining HP becomes 10. (You can’t use more than 1 GX attack in a game.)"
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
      802,
      68
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/221/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/221/high.webp"
    }
  },
  {
    "id": "sm10-222",
    "name": "Greninja & Zoroark-GX",
    "number": "222",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Dark Pulse",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 30 more damage times the amount of Darkness Energy attached to all of your Pokémon."
      },
      {
        "name": "Dark Union GX",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put 2 in any combination of Darkness Pokémon-GX and Darkness Pokémon-EX from your discard pile onto your Bench. If this Pokémon has at least 1 extra Energy attached to it (in addition to this attack’s cost), attach 2 Energy cards from your discard pile to each Pokémon that you put onto your Bench in this way. (You can’t use more than 1 GX attack in a game.)"
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
      658,
      571
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/222/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/222/high.webp"
    }
  },
  {
    "id": "sm10-223",
    "name": "Honchkrow-GX",
    "number": "223",
    "artist": "sadaji",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "210",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Murkrow",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Ruler of the Night",
        "text": "As long as this Pokémon is your Active Pokémon, your opponent can’t play any Pokémon Tool, Special Energy, or Stadium cards from their hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Feather Storm",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "This attack does 30 damage to 2 of your opponent’s Benched Pokémon-GX and Pokémon-EX. (Don’t apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Unfair GX",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Your opponent reveals their hand. Discard 2 cards from it. (You can’t use more than 1 GX attack in a game.)"
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
      430
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/223/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/223/high.webp"
    }
  },
  {
    "id": "sm10-224",
    "name": "Lucario & Melmetal-GX",
    "number": "224",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "260",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Steel Fist",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Search your deck for a Metal Energy card and attach it to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Heavy Impact",
        "cost": [
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "150",
        "text": ""
      },
      {
        "name": "Full Metal Wall GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "For the rest of this game, your Metal Pokémon take 30 less damage from your opponent’s attacks (after applying Weakness and Resistance). If this Pokémon has at least 1 extra Energy attached to it (in addition to this attack’s cost), discard all Energy from your opponent’s Active Pokémon. (You can’t use more than 1 GX attack in a game.)"
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
      448,
      809
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/224/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/224/high.webp"
    }
  },
  {
    "id": "sm10-225",
    "name": "Gardevoir & Sylveon-GX",
    "number": "225",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "TAG TEAM",
      "GX"
    ],
    "hp": "260",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "TAG TEAM rule: When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Fairy Song",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Fairy Energy cards and attach them to your Benched Pokémon in any way you like. Then, shuffle your deck."
      },
      {
        "name": "Kaleidostorm",
        "cost": [
          "Fairy",
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Move any number of Energy from your Pokémon to your other Pokémon in any way you like."
      },
      {
        "name": "Magical Miracle GX",
        "cost": [
          "Fairy",
          "Fairy",
          "Fairy"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "If this Pokémon has at least 3 extra Fairy Energy attached to it (in addition to this attack’s cost), your opponent shuffles their hand into their deck. (You can’t use more than 1 GX attack in a game.)"
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
      282,
      700
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/225/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/225/high.webp"
    }
  },
  {
    "id": "sm10-226",
    "name": "Whimsicott-GX",
    "number": "226",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "190",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Cottonee",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Fluffy Cotton",
        "text": "If any damage is done to this Pokémon by attacks, flip a coin. If heads, prevent that damage.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Energy Blow",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "This attack does 30 more damage times the amount of Energy attached to this Pokémon."
      },
      {
        "name": "Toy Box GX",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 5 cards and put them into your hand. Then, shuffle your deck. (You can’t use more than 1 GX attack in a game.)"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/226/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/226/high.webp"
    }
  },
  {
    "id": "sm10-227",
    "name": "Persian-GX",
    "number": "227",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Meowth",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Cat Walk",
        "text": "Once during your turn (before your attack), if 1 of your Pokémon-GX or Pokémon-EX was Knocked Out during your opponent’s last turn, you may search your deck for up to 2 cards and put them into your hand. Then, shuffle your deck. You can’t use more than 1 Cat Walk Ability each turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Vengeance",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "10+",
        "text": "This attack does 20 more damage for each Pokémon in your discard pile. You can’t add more than 180 damage in this way."
      },
      {
        "name": "Slash Back GX",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon. (You can’t use more than 1 GX attack in a game.)"
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
      53
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/227/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/227/high.webp"
    }
  },
  {
    "id": "sm10-228",
    "name": "Celesteela-GX",
    "number": "228",
    "artist": "aky CG Works",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "200",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Force Canceler",
        "text": "As long as this Pokémon is your Active Pokémon, prevent all effects of your opponent’s GX attacks, including damage, done to your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Power Cyclone",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
      },
      {
        "name": "Discovery GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Count your Prize cards and put them into your hand. Then, take that many cards from the top of your deck and put them face down as your Prize cards. If you don’t have that many cards in your deck, this attack does nothing. (You can’t use more than 1 GX attack in a game.)"
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      797
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/sm/sm10/228/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/228/high.webp"
    }
  },
  {
    "id": "sm10-229",
    "name": "Beast Bringer",
    "number": "229",
    "artist": "Ayaka Yoshida",
    "rarity": "Rare Secret",
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
      "If you have exactly 6 Prize cards remaining, and if your opponent's Active Pokémon-GX or Pokémon-EX is Knocked Out by damage from an attack of the Ultra Beast this card is attached to, take 1 more Prize card.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/229/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/229/high.webp"
    }
  },
  {
    "id": "sm10-230",
    "name": "Electromagnetic Radar",
    "number": "230",
    "artist": "Yoshinobu Saito",
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
      "You can play this card only if you discard 2 other cards from your hand.",
      "Search your deck for up to 2 in any combination of Lightning Pokémon-GX and Lightning Pokémon-EX, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/230/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/230/high.webp"
    }
  },
  {
    "id": "sm10-231",
    "name": "Fire Crystal",
    "number": "231",
    "artist": "Yoshinobu Saito",
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
      "Put 3 Fire Energy cards from your discard pile into your hand.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/231/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/231/high.webp"
    }
  },
  {
    "id": "sm10-232",
    "name": "Metal Core Barrier",
    "number": "232",
    "artist": "Studio Bora Inc.",
    "rarity": "Rare Secret",
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
      "If this card is attached to 1 of your Pokémon, discard it at the end of your opponent's turn.",
      "The Metal Pokémon this card is attached to takes 70 less damage from your opponent's attacks (after applying Weakness and Resistance).",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/232/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/232/high.webp"
    }
  },
  {
    "id": "sm10-233",
    "name": "Pokégear 3.0",
    "number": "233",
    "artist": "Studio Bora Inc.",
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
      "Look at the top 7 cards of your deck. You may reveal a Supporter card you find there and put it into your hand. Shuffle the other cards back into your deck.",
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/233/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/233/high.webp"
    }
  },
  {
    "id": "sm10-234",
    "name": "Triple Acceleration Energy",
    "number": "234",
    "artist": "5ban Graphics",
    "rarity": "Rare Secret",
    "supertype": "Energy",
    "subtypes": [
      "Special"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "This card can only be attached to Evolution Pokémon. If this card is attached to 1 of your Pokémon, discard it at the end of the turn.",
      "This card provides ColorlessColorlessColorless Energy only while it is attached to an Evolution Pokémon.",
      "If this card is attached to anything other than an Evolution Pokémon, discard this card."
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
      "small": "https://assets.tcgdex.net/en/sm/sm10/234/low.webp",
      "large": "https://assets.tcgdex.net/en/sm/sm10/234/high.webp"
    }
  }
]

export default cardDetails
