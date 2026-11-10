import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "ex8-1",
    "name": "Altaria",
    "number": "1",
    "artist": "Kyoko Umemoto",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Swablu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Safeguard",
        "text": "Prevent all effects of attacks, including damage, done to Altaria by your opponent's Pokémon-ex.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Double Wing Attack",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Does 20 damage to each Defending Pokémon."
      },
      {
        "name": "Dive",
        "cost": [
          "Water",
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
      334
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/1/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/1/high.webp"
    }
  },
  {
    "id": "ex8-2",
    "name": "Beautifly",
    "number": "2",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "100",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Silcoon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Hunch",
        "text": "As long as Beautifly's remaining HP is 40 or less, Beautifly does 40 more damage to the Defending Pokémon (before applying Weakness and Resistance).",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Luring Antenna",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Before doing damage, you may choose 1 of your opponent's Benched Pokémon and switch it with 1 of the Defending Pokémon. If you do, this attack does 20 damage to the new Defending Pokémon. Your opponent chooses the Defending Pokémon to switch."
      },
      {
        "name": "Cutting Wind",
        "cost": [
          "Grass",
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
      267
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/2/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/2/high.webp"
    }
  },
  {
    "id": "ex8-3",
    "name": "Breloom",
    "number": "3",
    "artist": "Hajime Kusajima",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Shroomish",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Leaf Poison",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "If Breloom has any Grass Energy attached to it, the Defending Pokémon is now Poisoned."
      },
      {
        "name": "Hustle Punch",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70-",
        "text": "During your next turn, Hustle Punch attack's base damage is 50 instead of 70."
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
      286
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/3/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/3/high.webp"
    }
  },
  {
    "id": "ex8-4",
    "name": "Camerupt",
    "number": "4",
    "artist": "Tomokazu Komiya",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Numel",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Back Burner",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your discard pile for up to 2 basic Energy cards and attach them to your Pokémon in any way you like."
      },
      {
        "name": "Split Bomb",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Choose 2 of your opponent's Pokémon. This attack does 30 damage to each of them. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      323
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/4/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/4/high.webp"
    }
  },
  {
    "id": "ex8-5",
    "name": "Claydol",
    "number": "5",
    "artist": "Hajime Kusajima",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Baltoy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Psychic Trace",
        "text": "Once during your turn (before your attack), if Claydol is your Active Pokémon, you may shuffle your hand into your deck. Then, draw a number of cards equal to the number of cards in your opponent's hand. This power can't be used if Claydol is affected by a Special Condition.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Ancient Mantra",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "If Claydol has any Psychic Energy attached to it, the Defending Pokémon is now Confused. If Claydol has any Fighting Energy attached to it, this attack does 20 damage plus 20 more damage."
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
      344
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/5/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/5/high.webp"
    }
  },
  {
    "id": "ex8-6",
    "name": "Crawdaunt",
    "number": "6",
    "artist": "Tomoko Wakai",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Corphish",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Dark Protection",
        "text": "Any damage done to Crawdaunt by your opponent's attacks is reduced by 10 for each Darkness Energy attached to Crawdaunt (after applying Weakness and Resistance). You can't reduce more than 20 damage in this way.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Bubblebeam",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Cross-Cut",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "If the Defending Pokémon is an Evolved Pokémon, this attack does 40 damage plus 20 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      342
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/6/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/6/high.webp"
    }
  },
  {
    "id": "ex8-7",
    "name": "Dusclops",
    "number": "7",
    "artist": "Tomoko Wakai",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
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
        "name": "Psychic Removal",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip 2 coins. If both of them are heads, discard all Energy attached to the Defending Pokémon."
      },
      {
        "name": "Powerful Hand",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Count the number of cards in your hand. Put that many damage counters on the Defending Pokémon. You can't put more than 7 damage counters in this way."
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
      356
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/7/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/7/high.webp"
    }
  },
  {
    "id": "ex8-8",
    "name": "Gyarados",
    "number": "8",
    "artist": "Hisao Nakamura",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Magikarp",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dragon Spark",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 10 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Full Retaliation",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20x",
        "text": "Does 20 damage times the number of damage counters on all of your Magikarp."
      },
      {
        "name": "Pulverize",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "20x",
        "text": "If the Defending Pokémon already has at least 2 damage counters on it, this attack does 50 damage plus 50 more damage."
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
      130
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/8/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/8/high.webp"
    }
  },
  {
    "id": "ex8-9",
    "name": "Jirachi",
    "number": "9",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Wishing Star",
        "text": "Once during your turn (before your attack), if Jirachi is your Active Pokémon, you may look at the top 5 cards of your deck, choose 1 of them, and put it into your hand. Shuffle your deck afterward. Jirachi and your other Active Pokémon, if any, are now Asleep. This power can't be used if Jirachi is affected by a Special Condition.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Metallic Blow",
        "cost": [
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "If the Defending Pokémon has any Poké-Bodies, this attack does 20 damage plus 30 more damage."
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
      385
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/9/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/9/high.webp"
    }
  },
  {
    "id": "ex8-10",
    "name": "Ludicolo",
    "number": "10",
    "artist": "Atsuko Nishida",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Lombre",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Swing Dance",
        "text": "Once during your turn (before your attack), you may draw a card. This power can't be used if Ludicolo is affected by a Special Condition.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Healing Steps",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "You may discard as many cards as you like from your hand. If you do, remove that many damage counters from Ludicolo."
      },
      {
        "name": "Circular Steps",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "10x",
        "text": "Does 10 damage times the number of Pokémon in play (both yours and your opponent's), excluding Ludicolo."
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
      272
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/10/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/10/high.webp"
    }
  },
  {
    "id": "ex8-11",
    "name": "Metagross",
    "number": "11",
    "artist": "Hisao Nakamura",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Metang",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Super Connectivity",
        "text": "Once during your turn (before your attack), you may search your discard pile for a Psychic or Metal Energy card and attach it to your Active Pokémon. Then, put 1 damage counter on that Pokémon. This power can't be used if Metagross is affected by a Special Condition.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Link Blast",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "If Metagross and the Defending Pokémon have a different amount of Energy attached to them, this attack's base damage is 40 instead of 70."
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
      376
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/11/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/11/high.webp"
    }
  },
  {
    "id": "ex8-12",
    "name": "Mightyena",
    "number": "12",
    "artist": "Naoyo Kimura",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Poochyena",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Seek Out",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for any 1 card and put it into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Pull Away",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "If your opponent has 5 or more cards in his or her hand, your opponent discards a number of cards until your opponent has 4 cards left in his or her hand."
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
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      262
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/12/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/12/high.webp"
    }
  },
  {
    "id": "ex8-13",
    "name": "Ninjask",
    "number": "13",
    "artist": "Katsura Tabata",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
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
        "name": "Fast Protection",
        "text": "Prevent all effects, including damage, done to Ninjask by your opponent's attacks from his or her Basic Pokémon.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Swords Dance",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your next turn, Ninjask's Slash attack's base damage is 80."
      },
      {
        "name": "Slash",
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
        "type": "Lightning",
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/13/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/13/high.webp"
    }
  },
  {
    "id": "ex8-14",
    "name": "Shedinja",
    "number": "14",
    "artist": "Yukiko Baba",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "50",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Nincada",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Empty Shell",
        "text": "When Shedinja is Knocked Out, your opponent doesn't take any Prize cards.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Extra Curse",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put 2 damage counters on the Defending Pokémon. If the Defending Pokémon is Pokémon-ex, put 4 damage counters instead."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      292
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/14/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/14/high.webp"
    }
  },
  {
    "id": "ex8-15",
    "name": "Slaking",
    "number": "15",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "120",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Vigoroth",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Lazy Aura",
        "text": "As long as Slaking is your Active Pokémon, any damage done by attacks from your opponent's Pokémon-ex is reduced by 30 (before applying Weakness and Resistance).",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Amnesia",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Choose 1 of the Defending Pokémon's attacks. That Pokémon can't use that attack during your opponent's next turn."
      },
      {
        "name": "Lazy Headbutt",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "70",
        "text": "Slaking is now Asleep."
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
      289
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/15/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/15/high.webp"
    }
  },
  {
    "id": "ex8-16",
    "name": "Deoxys",
    "number": "16",
    "artist": "Hironobu Yoshida",
    "rarity": "Rare",
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
    "abilities": [
      {
        "name": "Form Change",
        "text": "Once during your turn (before your attack), you may search your deck for another Deoxys and switch it with Deoxys. (Any cards attached to Deoxys, damage counters, Special Conditions, and effects on it are now on the new Pokémon.) If you do, put Deoxys on top of your deck. Shuffle your deck afterward. You can't use more than 1 Form Change Poké-Power each turn.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Link Blast",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "If Deoxys and the Defending Pokémon have a different amount of Energy attached to them, this attack's base damage is 20 instead of 40."
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
      386
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/16/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/16/high.webp"
    }
  },
  {
    "id": "ex8-17",
    "name": "Deoxys",
    "number": "17",
    "artist": "Hironobu Yoshida",
    "rarity": "Rare",
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
    "abilities": [
      {
        "name": "Form Change",
        "text": "Once during your turn (before your attack), you may search your deck for another Deoxys and switch it with Deoxys. (Any cards attached to Deoxys, damage counters, Special Conditions, and effects on it are now on the new Pokémon.) If you do, put Deoxys on top of your deck. Shuffle your deck afterward. You can't use more than 1 Form Change Poké-Power each turn.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Energy Crush",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each Energy attached to all of your opponent's Pokémon."
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
      386
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/17/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/17/high.webp"
    }
  },
  {
    "id": "ex8-18",
    "name": "Deoxys",
    "number": "18",
    "artist": "Hironobu Yoshida",
    "rarity": "Rare",
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
    "abilities": [
      {
        "name": "Form Change",
        "text": "Once during your turn (before your attack), you may search your deck for another Deoxys and switch it with Deoxys. (Any cards attached to Deoxys, damage counters, Special Conditions, and effects on it are now on the new Pokémon.) If you do, put Deoxys on top of your deck. Shuffle your deck afterward. You can't use more than 1 Form Change Poké-Power each turn.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Barrier Attack",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "During your opponent's next turn, any damage done to Deoxys by attacks is reduced by 30 (after applying Weakness and Resistance)."
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
      386
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/18/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/18/high.webp"
    }
  },
  {
    "id": "ex8-19",
    "name": "Ludicolo",
    "number": "19",
    "artist": "Ken Sugimori",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Lombre",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Happy Dance",
        "text": "Once during your turn (before your attack), you may remove 1 damage counter from each of your Pokémon. You can't use more than 1 Happy Dance Poké-Power each turn. This power can't be used if Ludicolo is affected by a Special Condition.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Water Punch",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "Flip a coin for each Water Energy attached to Ludicolo. This attack does 40 damage plus 20 more damage for each heads."
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
      272
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/19/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/19/high.webp"
    }
  },
  {
    "id": "ex8-20",
    "name": "Magcargo",
    "number": "20",
    "artist": "Midori Harada",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Slugma",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Smooth Over",
        "text": "Once during your turn (before your attack), you may search your deck for a card. Shuffle your deck, then put that card on top of your deck. This power can't be used if Magcargo is affected by a Special Condition.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Knock Over",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "You may discard any Stadium card in play."
      },
      {
        "name": "Combustion",
        "cost": [
          "Fire",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      219
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/20/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/20/high.webp"
    }
  },
  {
    "id": "ex8-21",
    "name": "Pelipper",
    "number": "21",
    "artist": "Tomokazu Komiya",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wingull",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bay Dance",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "During your next turn, if any of your current Active Pokémon does damage to any Defending Pokémon, the attack does 30 more damage (before applying Weakness and Resistance)."
      },
      {
        "name": "Aqua Sonic",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "This attack's damage is not affected by Resistance."
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
      279
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/21/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/21/high.webp"
    }
  },
  {
    "id": "ex8-22",
    "name": "Rayquaza",
    "number": "22",
    "artist": "Hiromichi Sugiyama",
    "rarity": "Rare",
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
    "abilities": [
      {
        "name": "Dragon Aura",
        "text": "As long as Rayquaza has any basic Fire Energy cards and any basic Lightning Energy cards attached to it, prevent all effects, except damage, by an opponent's attack done to Rayquaza.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Tumbling Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 damage plus 20 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Colorless",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      384
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/22/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/22/high.webp"
    }
  },
  {
    "id": "ex8-23",
    "name": "Sableye",
    "number": "23",
    "artist": "Aya Kusube",
    "rarity": "Rare",
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
        "name": "Night Vision",
        "text": "Once during your turn (before your attack), if Sableye is your Active Pokémon, you may look at your opponent's hand. This power can't be used if Sableye is affected by a Special Condition.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Slash",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Limitation",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent can't play any Supporter cards from his or her hand during your opponent's next turn."
      }
    ],
    "weaknesses": [],
    "resistances": [
      {
        "type": "Colorless",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      302
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/23/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/23/high.webp"
    }
  },
  {
    "id": "ex8-24",
    "name": "Seaking",
    "number": "24",
    "artist": "Atsuko Nishida",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Goldeen",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Triple Breach",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 3 of your opponent's Pokémon. This attack does 10 damage to each of those Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Rend",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If the Defending Pokémon already has any damage counters on it, this attack does 30 damage plus 20 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      119
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/24/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/24/high.webp"
    }
  },
  {
    "id": "ex8-25",
    "name": "Shiftry",
    "number": "25",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "110",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Nuzleaf",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fan Action",
        "text": "Once during your turn (before your attack), you may switch 1 of the Defending Pokémon with 1 of your opponent's Benched Pokémon. Your opponent chooses the Benched Pokémon to switch. This power can't be used if Shiftry is affected by a Special Condition.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Stadium Power",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "If there is any Stadium card in play, this attack does 50 damage plus 20 more damage."
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
      275
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/25/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/25/high.webp"
    }
  },
  {
    "id": "ex8-26",
    "name": "Skarmory",
    "number": "26",
    "artist": "Kouki Saitou",
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
    "abilities": [
      {
        "name": "Metallic Lift",
        "text": "If Skarmory has any Metal Energy attached to it, the Retreat Cost for Skarmory is 0.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Spearhead",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card."
      },
      {
        "name": "Heavy Metal",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin for each Metal Energy attached to Skarmory. This attack does 10 damage plus 20 more damage for each heads."
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
      227
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/26/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/26/high.webp"
    }
  },
  {
    "id": "ex8-27",
    "name": "Tropius",
    "number": "27",
    "artist": "Miki Tanaka",
    "rarity": "Rare",
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
        "name": "Tropical Motion",
        "text": "As long as Tropius is your Active Pokémon, your opponent's Pokémon have no Resistance.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Miracle Blow",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, choose 1 Special Condition. The Defending Pokémon is now affected by that Special Condition."
      },
      {
        "name": "Stomp",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "40+",
        "text": "Flip a coin. If heads, this attack does 40 damage plus 20 more damage."
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
      357
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/27/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/27/high.webp"
    }
  },
  {
    "id": "ex8-28",
    "name": "Whiscash",
    "number": "28",
    "artist": "Miki Tanaka",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Barboach",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Raging Tremble",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, this attack does 10 damage for each damage counter on Whiscash to each Defending Pokémon. If tails, this attack does 10 damage for each damage counter on Whiscash to the Defending Pokémon."
      },
      {
        "name": "Dwindling Wave",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70-",
        "text": "Does 70 damage minus 10 damage for each damage counter on Whiscash."
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
      340
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/28/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/28/high.webp"
    }
  },
  {
    "id": "ex8-29",
    "name": "Xatu",
    "number": "29",
    "artist": "Yuka Morii",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Natu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Mirror Coat",
        "text": "If Xatu is Burned or Poisoned by an opponent's attack (even if Xatu is Knocked Out), the Attacking Pokémon is now affected by the same Special Conditions (1 if there is only 1).",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Dazzle Dance",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Each Defending Pokémon is now Confused."
      },
      {
        "name": "Psyloop",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "Does 30 damage plus 30 more damage for each Trainer card your opponent has in play."
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
      178
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/29/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/29/high.webp"
    }
  },
  {
    "id": "ex8-30",
    "name": "Donphan",
    "number": "30",
    "artist": "Yuka Morii",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Phanpy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spinning Horn",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Does 10 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Rock Hurl",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "This attack's damage is not affected by Resistance."
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
      232
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/30/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/30/high.webp"
    }
  },
  {
    "id": "ex8-31",
    "name": "Golbat",
    "number": "31",
    "artist": "Sachiko Adachi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Zubat",
    "evolvesTo": [
      "Crobat"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Self-control",
        "text": "Golbat can't be Paralyzed.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Spiral Drain",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Remove 1 damage counter from Golbat."
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
      42
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/31/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/31/high.webp"
    }
  },
  {
    "id": "ex8-32",
    "name": "Grumpig",
    "number": "32",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Spoink",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Carefree",
        "text": "Grumpig can't be Confused.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Hypnoblast",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Extra Ball",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "If the Defending Pokémon is Pokémon-ex, this attack does 50 damage plus 30 more damage."
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
      326
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/32/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/32/high.webp"
    }
  },
  {
    "id": "ex8-33",
    "name": "Lombre",
    "number": "33",
    "artist": "Atsuko Nishida",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Lotad",
    "evolvesTo": [
      "Ludicolo"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Aqua Lift",
        "text": "If Lombre has any Water Energy attached to it, the Retreat Cost for Lombre is 0.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Ambush",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 damage plus 20 more damage."
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
      271
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/33/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/33/high.webp"
    }
  },
  {
    "id": "ex8-34",
    "name": "Lombre",
    "number": "34",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Lotad",
    "evolvesTo": [
      "Ludicolo"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Natural Cure",
        "text": "When you attach a Water Energy card from your hand to Lombre, remove all Special Conditions from Lombre.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Blot",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Remove 2 damage counters from Lombre."
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
      271
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/34/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/34/high.webp"
    }
  },
  {
    "id": "ex8-35",
    "name": "Lotad",
    "number": "35",
    "artist": "Atsuko Nishida",
    "rarity": "Uncommon",
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
      "Lombre"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Surprise",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Choose 1 card from your opponent's hand without looking. Look at the card you chose, then have your opponent shuffle that card into his or her deck."
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
      270
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/35/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/35/high.webp"
    }
  },
  {
    "id": "ex8-36",
    "name": "Lunatone",
    "number": "36",
    "artist": "Kyoko Umemoto",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Moonglow",
        "text": "The Retreat Cost for each Solrock you have in play is 0.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Foresight",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 5 cards of either player's deck and put them back on top of that player's deck in any order."
      },
      {
        "name": "Target Beam",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Does 20 damage plus 10 more damage for each Solrock you have in play."
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
      337
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/36/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/36/high.webp"
    }
  },
  {
    "id": "ex8-37",
    "name": "Magcargo",
    "number": "37",
    "artist": "Aya Kusube",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Slugma",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Headbutt",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Burning Ball",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "If Magcargo has at least 2 Fire Energy attached to it, the Defending Pokémon is now Burned."
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
      219
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/37/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/37/high.webp"
    }
  },
  {
    "id": "ex8-38",
    "name": "Manectric",
    "number": "38",
    "artist": "Hajime Kusajima",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Electrike",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Thunder Spear",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 20 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Magnetic Tackle",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "You may do 40 damage plus 10 more damage for each Lightning Energy attached to Manectric. If you do, Manectric does 10 damage to itself."
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
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      310
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/38/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/38/high.webp"
    }
  },
  {
    "id": "ex8-39",
    "name": "Masquerain",
    "number": "39",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Surskit",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Intimidating Pattern",
        "text": "As long as Masquerain is your Active Pokémon, any damage done by an opponent's attack is reduced by 20 (before applying Weakness and Resistance). You can't use more than 1 Intimidating Pattern Poké-Body each turn.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Stun Spore",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
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
      284
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/39/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/39/high.webp"
    }
  },
  {
    "id": "ex8-40",
    "name": "Metang",
    "number": "40",
    "artist": "Hisao Nakamura",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Beldum",
    "evolvesTo": [
      "Metagross"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psychic Boom",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each Energy attached to the Defending Pokémon."
      },
      {
        "name": "Quick Blow",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "Flip a coin. If heads, this attack does 40 damage plus 20 more damage."
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
      375
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/40/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/40/high.webp"
    }
  },
  {
    "id": "ex8-41",
    "name": "Minun",
    "number": "41",
    "artist": "Hajime Kusajima",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sniff Out",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put any 1 card from your discard pile into your hand."
      },
      {
        "name": "Negative Spark",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Does 20 damage to each of your opponent's Pokémon that has any Poké-Bodies. Don't apply Weakness and Resistance."
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
      312
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/41/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/41/high.webp"
    }
  },
  {
    "id": "ex8-42",
    "name": "Nosepass",
    "number": "42",
    "artist": "Sumiyoshi Kizuki",
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
      "Probopass"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Magnetic Reversal",
        "text": "Once during your turn (before your attack), if Nosepass is your Active Pokémon, you may flip a coin. If heads, switch 1 of your opponent's Benched Pokémon with 1 of the Defending Pokémon. Your opponent chooses the Defending Pokémon to switch. This power can't be used if Nosepass is affected by a Special Condition.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Sharpen",
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
      299
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/42/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/42/high.webp"
    }
  },
  {
    "id": "ex8-43",
    "name": "Nuzleaf",
    "number": "43",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
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
        "name": "Eerie Light",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Confused."
      },
      {
        "name": "One-Two Strike",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Flip 2 coins. This attack does 30 damage plus 20 more damage for each heads."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/43/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/43/high.webp"
    }
  },
  {
    "id": "ex8-44",
    "name": "Plusle",
    "number": "44",
    "artist": "Hajime Kusajima",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Lightning"
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
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Shuffle your deck afterward."
      },
      {
        "name": "Positive Spark",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Does 20 damage to each of your opponent's Pokémon that has any Poké-Powers. Don't apply Weakness and Resistance."
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
      311
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/44/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/44/high.webp"
    }
  },
  {
    "id": "ex8-45",
    "name": "Shelgon",
    "number": "45",
    "artist": "Aya Kusube",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Bagon",
    "evolvesTo": [
      "Salamence"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Hard Protection",
        "text": "Prevent all damage done to Shelgon by attacks from your Pokémon.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Rock Smash",
        "cost": [
          "Fire",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 30 damage plus 10 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Colorless",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fire",
        "value": "-30"
      },
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
      372
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/45/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/45/high.webp"
    }
  },
  {
    "id": "ex8-46",
    "name": "Silcoon",
    "number": "46",
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
    "evolvesFrom": "Wurmple",
    "evolvesTo": [
      "Beautifly"
    ],
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
      },
      {
        "name": "Advanced Armor",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "During your opponent's next turn, prevent all effects of attacks, including damage, done to Silcoon by your opponent's Evolved Pokémon."
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
      266
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/46/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/46/high.webp"
    }
  },
  {
    "id": "ex8-47",
    "name": "Solrock",
    "number": "47",
    "artist": "Kyoko Umemoto",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Sunbeam",
        "text": "The maximum HP for each Lunatone you have in play is now 80.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Scorching Light",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed. If tails, the Defending Pokémon is now Burned."
      },
      {
        "name": "Reflected Beam",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 1 of your opponent's Benched Pokémon. This attack does 10 damage to that Pokémon for each Lunatone you have in play. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      338
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/47/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/47/high.webp"
    }
  },
  {
    "id": "ex8-48",
    "name": "Starmie",
    "number": "48",
    "artist": "Yukiko Baba",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Staryu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Core Guard",
        "text": "As long as Starmie has any Psychic Energy attached to it, damage done to Starmie by attacks is reduced by 10 (after applying Weakness and Resistance).",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Energy Flip",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 1 of your opponent's Benched Pokémon. This attack does 10 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) You may move an Energy attached to that Pokémon to another of your opponent's Pokémon."
      },
      {
        "name": "Psychic Boom",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each Energy attached to the Defending Pokémon."
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
      121
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/48/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/48/high.webp"
    }
  },
  {
    "id": "ex8-49",
    "name": "Swellow",
    "number": "49",
    "artist": "Midori Harada",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Taillow",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mid-air Crush",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 20 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) Flip a coin. If heads, your opponent discards 1 Energy card, if any, attached to that Pokémon."
      },
      {
        "name": "Nosedive",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Flip a coin. If tails, Swellow does 10 damage to itself."
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
      277
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/49/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/49/high.webp"
    }
  },
  {
    "id": "ex8-50",
    "name": "Vigoroth",
    "number": "50",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Slakoth",
    "evolvesTo": [
      "Slaking"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Vigorous Aura",
        "text": "As long as Vigoroth is your Active Pokémon, attacks by each player's Active Pokémon (both if there are 2) do 10 more damage to any Active Pokémon (before applying Weakness and Resistance).",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Scratch",
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
      288
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/50/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/50/high.webp"
    }
  },
  {
    "id": "ex8-51",
    "name": "Weezing",
    "number": "51",
    "artist": "Hisao Nakamura",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Koffing",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Liability",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put damage counters on the Defending Pokémon until it is 10 HP away from being Knocked Out. Weezing does 70 damage to itself."
      },
      {
        "name": "Smogscreen",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "The Defending Pokémon is now Poisoned. If the Defending Pokémon tries to attack during your opponent's next turn, your opponent flips a coin. If tails, that attack does nothing."
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
      110
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/51/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/51/high.webp"
    }
  },
  {
    "id": "ex8-52",
    "name": "Bagon",
    "number": "52",
    "artist": "Takao Unno",
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
      "Shelgon"
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
        "text": "Flip a coin. If heads, the Defending Pokémon is now Burned."
      },
      {
        "name": "Doubleslap",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10x",
        "text": "Flip 2 coins. This attack does 10 damage times the number of heads."
      }
    ],
    "weaknesses": [
      {
        "type": "Colorless",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fire",
        "value": "-30"
      },
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
      371
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/52/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/52/high.webp"
    }
  },
  {
    "id": "ex8-53",
    "name": "Baltoy",
    "number": "53",
    "artist": "Kenkichi Toyama",
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
      "Claydol"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spinning Attack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Selfdestruct",
        "cost": [
          "Colorless",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Does 10 damage to each Benched Pokémon (both yours and your opponent's). (Don't apply Weakness and Resistance for Benched Pokémon.) Baltoy does 50 damage to itself."
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
      343
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/53/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/53/high.webp"
    }
  },
  {
    "id": "ex8-54",
    "name": "Barboach",
    "number": "54",
    "artist": "Miki Tanaka",
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
      "Whiscash"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Amnesia",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 1 of the Defending Pokémon's attacks. That Pokémon can't use that attack during your opponent's next turn."
      },
      {
        "name": "Tackle",
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
      339
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/54/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/54/high.webp"
    }
  },
  {
    "id": "ex8-55",
    "name": "Beldum",
    "number": "55",
    "artist": "Hisao Nakamura",
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
      "Metang"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flip Over",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Beldum does 10 damage to itself, and don't apply Weakness and Resistance to this damage."
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
      374
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/55/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/55/high.webp"
    }
  },
  {
    "id": "ex8-56",
    "name": "Carvanha",
    "number": "56",
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
      "Sharpedo"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sharp Fin",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Rage",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each damage counter on Carvanha."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      318
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/56/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/56/high.webp"
    }
  },
  {
    "id": "ex8-57",
    "name": "Corphish",
    "number": "57",
    "artist": "Takao Unno",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Crawdaunt"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Exoskeleton",
        "text": "Any damage done to Corphish by attacks is reduced by 10 (after applying Weakness and Resistance).",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Double Chop",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10x",
        "text": "Flip 2 coins. This attack does 10 damage times the number of heads."
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
      341
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/57/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/57/high.webp"
    }
  },
  {
    "id": "ex8-58",
    "name": "Duskull",
    "number": "58",
    "artist": "Tomoko Wakai",
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
      "Dusclops"
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
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Will-o'-the-wisp",
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
      355
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/58/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/58/high.webp"
    }
  },
  {
    "id": "ex8-59",
    "name": "Electrike",
    "number": "59",
    "artist": "Naoyo Kimura",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
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
        "name": "High Voltage",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, your opponent can't play Trainer cards from his or her hand during his or her next turn."
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
    "resistances": [
      {
        "type": "Metal",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      309
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/59/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/59/high.webp"
    }
  },
  {
    "id": "ex8-60",
    "name": "Electrike",
    "number": "60",
    "artist": "Hiroki Fuchino",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
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
        "name": "Recharge",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Lightning Energy card and attach it to Electrike. Shuffle your deck afterward."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/60/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/60/high.webp"
    }
  },
  {
    "id": "ex8-61",
    "name": "Goldeen",
    "number": "61",
    "artist": "Atsuko Nishida",
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
      "Seaking"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Supersonic",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused."
      },
      {
        "name": "Waterfall",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      118
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/61/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/61/high.webp"
    }
  },
  {
    "id": "ex8-62",
    "name": "Koffing",
    "number": "62",
    "artist": "Hisao Nakamura",
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
      "Weezing"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Smog",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      109
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/62/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/62/high.webp"
    }
  },
  {
    "id": "ex8-63",
    "name": "Lotad",
    "number": "63",
    "artist": "Ken Sugimori",
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
      "Lombre"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rain Splash",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Aqua Wave",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 damage plus 10 more damage."
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
      270
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/63/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/63/high.webp"
    }
  },
  {
    "id": "ex8-64",
    "name": "Magikarp",
    "number": "64",
    "artist": "Hisao Nakamura",
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
        "name": "Leap Out",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch Magikarp with 1 of your Benched Pokémon."
      },
      {
        "name": "Rage",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each damage counter on Magikarp."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/64/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/64/high.webp"
    }
  },
  {
    "id": "ex8-65",
    "name": "Makuhita",
    "number": "65",
    "artist": "Asuka Iwashita",
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
      "Hariyama"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Thrust",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If tails, this attack does nothing. If heads, discard 1 Energy card attached to the Defending Pokémon."
      },
      {
        "name": "Rising Lunge",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 damage plus 10 more damage."
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
      296
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/65/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/65/high.webp"
    }
  },
  {
    "id": "ex8-66",
    "name": "Natu",
    "number": "66",
    "artist": "Yuka Morii",
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
      "Xatu"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Mirror Coat",
        "text": "If Natu is Burned or Poisoned by an opponent's attack (even if Natu is Knocked Out), the Attacking Pokémon is now affected by the same Special Conditions (1 if there is only 1).",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Razor Wind",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If tails, this attack does nothing."
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
      177
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/66/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/66/high.webp"
    }
  },
  {
    "id": "ex8-67",
    "name": "Nincada",
    "number": "67",
    "artist": "Yukiko Baba",
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
        "name": "Dig Under",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 10 damage to that Pokémon. This attack's damage isn't affected by Weakness or Resistance."
      },
      {
        "name": "Scratch",
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
      290
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/67/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/67/high.webp"
    }
  },
  {
    "id": "ex8-68",
    "name": "Numel",
    "number": "68",
    "artist": "Tomokazu Komiya",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Camerupt"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Dense",
        "text": "Any damage done to Numel by attacks from Evolved Pokémon (both yours and your opponent's) is reduced by 20 (after applying Weakness and Resistance).",
        "type": "Poke-BODY"
      }
    ],
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
      322
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/68/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/68/high.webp"
    }
  },
  {
    "id": "ex8-69",
    "name": "Phanpy",
    "number": "69",
    "artist": "Yuka Morii",
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
      "Donphan"
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
        "name": "Double Spin",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20x",
        "text": "Flip 2 coins. This attack does 20 damage times the number of heads."
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
      231
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/69/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/69/high.webp"
    }
  },
  {
    "id": "ex8-70",
    "name": "Poochyena",
    "number": "70",
    "artist": "Aimi Tomita",
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
      "Mightyena"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Surprise",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 1 card from your opponent's hand without looking. Look at the card you chose, then have your opponent shuffle that card into his or her deck."
      },
      {
        "name": "Sharp Fang",
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
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      261
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/70/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/70/high.webp"
    }
  },
  {
    "id": "ex8-71",
    "name": "Seedot",
    "number": "71",
    "artist": "Kouki Saitou",
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
      "Nuzleaf"
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
        "name": "Quick Attack",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 10 more damage."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/71/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/71/high.webp"
    }
  },
  {
    "id": "ex8-72",
    "name": "Shroomish",
    "number": "72",
    "artist": "Kanako Eo",
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
      "Breloom"
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
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Trip Over",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 10 more damage."
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
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      285
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/72/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/72/high.webp"
    }
  },
  {
    "id": "ex8-73",
    "name": "Slakoth",
    "number": "73",
    "artist": "Takao Unno",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Vigoroth"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Yawn",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Flail",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10x",
        "text": "Does 10 damage times the number of damage counters on Slakoth."
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
      287
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/73/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/73/high.webp"
    }
  },
  {
    "id": "ex8-74",
    "name": "Slugma",
    "number": "74",
    "artist": "Aya Kusube",
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
      "Magcargo"
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
        "name": "Combustion",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
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
      218
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/74/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/74/high.webp"
    }
  },
  {
    "id": "ex8-75",
    "name": "Slugma",
    "number": "75",
    "artist": "Midori Harada",
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
      "Magcargo"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Magma Ring",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      },
      {
        "name": "Flare",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      218
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/75/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/75/high.webp"
    }
  },
  {
    "id": "ex8-76",
    "name": "Spoink",
    "number": "76",
    "artist": "Ken Sugimori",
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
      "Grumpig"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hypnotic Gaze",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
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
      325
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/76/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/76/high.webp"
    }
  },
  {
    "id": "ex8-77",
    "name": "Staryu",
    "number": "77",
    "artist": "Yukiko Baba",
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
      "Starmie"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rapid Spin",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon, if any. You switch Staryu with 1 of your Benched Pokémon, if any."
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
      120
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/77/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/77/high.webp"
    }
  },
  {
    "id": "ex8-78",
    "name": "Surskit",
    "number": "78",
    "artist": "Mitsuhiro Arita",
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
      "Masquerain"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Agility",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, prevent all effects of an attack, including damage, done to Surskit during your opponent's next turn."
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
      283
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/78/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/78/high.webp"
    }
  },
  {
    "id": "ex8-79",
    "name": "Swablu",
    "number": "79",
    "artist": "Kyoko Umemoto",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Altaria"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Fluff",
        "text": "Whenever Swablu would be damaged or affected by an opponent's attack and already has at least 1 damage counter on it, flip a coin. If heads, prevent all effects of that attack, including damage, done to Swablu.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Peck",
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
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      333
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/79/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/79/high.webp"
    }
  },
  {
    "id": "ex8-80",
    "name": "Taillow",
    "number": "80",
    "artist": "Midori Harada",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Swellow"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fly",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If tails, this attack does nothing. If heads, prevent all effects of an attack, including damage, done to Taillow during your opponent's next turn."
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
      276
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/80/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/80/high.webp"
    }
  },
  {
    "id": "ex8-81",
    "name": "Wingull",
    "number": "81",
    "artist": "Tomokazu Komiya",
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
      "Pelipper"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Quick Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 10 more damage."
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
      278
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/81/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/81/high.webp"
    }
  },
  {
    "id": "ex8-82",
    "name": "Wurmple",
    "number": "82",
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
      "Silcoon",
      "Cascoon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ascension",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a card that evolves from Wurmple and put it on Wurmple. (This counts as evolving Wurmple.) Shuffle your deck afterward."
      },
      {
        "name": "Miracle Essence",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, choose 1 Special Condition. Each Defending Pokémon is now affected by that Special Condition."
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
      265
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/82/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/82/high.webp"
    }
  },
  {
    "id": "ex8-83",
    "name": "Zubat",
    "number": "83",
    "artist": "Sachiko Adachi",
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
      "Golbat"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Self-control",
        "text": "Zubat can't be Paralyzed.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
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
      41
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/83/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/83/high.webp"
    }
  },
  {
    "id": "ex8-84",
    "name": "Balloon Berry",
    "number": "84",
    "artist": "Keiji Kinebuchi",
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
      "Attach Balloon Berry to 1 of your Pokémon that doesn't already have a Pokémon Tool attached to it. If that Pokémon is Knocked Out, discard this card.",
      "As long as Balloon Berry is attached to a Pokémon, that Pokémon's Retreat Cost is 0. When this Pokémon retreats, discard Balloon Berry."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/84/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/84/high.webp"
    }
  },
  {
    "id": "ex8-85",
    "name": "Crystal Shard",
    "number": "85",
    "artist": "Jungo Suzuki",
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
      "Attach Crystal Shard to 1 of your Pokémon that doesn't already have a Pokémon Tool attached to it. If that Pokémon is Knocked Out, discard this card.",
      "As long as this card is attached to a Pokémon, that Pokémon's type is Colorless. If that Pokémon attacks, discard this card at the end of the turn."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/85/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/85/high.webp"
    }
  },
  {
    "id": "ex8-86",
    "name": "Energy Charge",
    "number": "86",
    "artist": "Keiji Kinebuchi",
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
      "Flip a coin. If heads, search your discard pile for 2 Energy cards (1 if there is only 1), show them to your opponent, and shuffle them into your deck."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/86/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/86/high.webp"
    }
  },
  {
    "id": "ex8-87",
    "name": "Lady Outing",
    "number": "87",
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
      "You can play only one Supporter card each turn. When you play this card, put it next to your Active Pokémon. When your turn ends, discard this card.",
      "Search your deck for up to 3 different types of basic Energy cards, show them to your opponent, and put them into your hand. Shuffle your deck afterward."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/87/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/87/high.webp"
    }
  },
  {
    "id": "ex8-88",
    "name": "Master Ball",
    "number": "88",
    "artist": "Keiji Kinebuchi",
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
      "Look at the top 7 cards from your deck. Choose a Basic Pokémon or Evolution card from those cards, show it to your opponent, and put it into your hand. Put the other 6 cards back on top of your deck. Shuffle your deck afterward."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/88/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/88/high.webp"
    }
  },
  {
    "id": "ex8-89",
    "name": "Meteor Falls",
    "number": "89",
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
      "This card stays in play when you play it. Discard this card if another Stadium card comes into play.",
      "Each player's Active Evolved Pokémon (excluding Pokémon-ex) can use any attack from its Basic Pokémon or its Stage 1 Evolution card. (You still have to pay for that attack's Energy cost.)"
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/89/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/89/high.webp"
    }
  },
  {
    "id": "ex8-90",
    "name": "Professor Cozmo's Discovery",
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
      "You can play only one Supporter card each turn. When you play this card, put it next to your Active Pokémon. When your turn ends, discard this card.",
      "Flip a coin. If heads, draw the bottom 3 cards of your deck. If tails, draw the top 2 cards of your deck."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/90/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/90/high.webp"
    }
  },
  {
    "id": "ex8-91",
    "name": "Space Center",
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
      "This card stays in play when you play it. Discard this card if another Stadium card comes into play.",
      "Ignore Poké-Bodies for all Basic Pokémon in play (both yours and your opponent's) (excluding Pokémon-ex and Pokémon that has an owner in its name)."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/91/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/91/high.webp"
    }
  },
  {
    "id": "ex8-92",
    "name": "Strength Charm",
    "number": "92",
    "artist": "Keiji Kinebuchi",
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
      "Attach Strength Charm to 1 of your Pokémon that doesn't already have a Pokémon Tool attached to it. If that Pokémon is Knocked Out, discard this card.",
      "Whenever an attack from the Pokémon that Strength Charm is attached to does damage to the Active Pokémon, the attack does 10 more damage (before applying Weakness and Resistance). Discard Strength Charm at the end of the turn in which this Pokémon attacks."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/92/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/92/high.webp"
    }
  },
  {
    "id": "ex8-93",
    "name": "Boost Energy",
    "number": "93",
    "artist": "Shin-ichi Yoshikawa",
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
      "Boost Energy can be attached only to an Evolved Pokémon. Discard Boost Energy at the end of the turn it was attached. Boost Energy provides ColorlessColorlessColorless Energy. The Pokémon Boost Energy is attached to can't retreat. If the Pokémon Boost Energy is attached to isn't an Evolved Pokémon, discard Boost Energy."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/93/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/93/high.webp"
    }
  },
  {
    "id": "ex8-94",
    "name": "Heal Energy",
    "number": "94",
    "artist": "Takumi Akabane",
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
      "Heal Energy provides Colorless Energy. When you attach this card from your hand to 1 of your Pokémon, remove 1 damage counter and all Special Conditions from that Pokémon. If Heal Energy is attached to Pokémon-ex, Heal Energy has no effect other than providing Energy."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/94/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/94/high.webp"
    }
  },
  {
    "id": "ex8-95",
    "name": "Scramble Energy",
    "number": "95",
    "artist": "Takumi Akabane",
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
      "Scramble Energy can be attached only to an Evolved Pokémon (excluding Pokémon-ex). Scramble Energy provides Colorless Energy. While in play, if you have more Prize cards left than your opponent, Scramble Energy provides every type of Energy but provides only 3 in any combination at a time. If the Pokémon Scramble Energy is attached to isn't an Evolved Pokémon (or evolves into Pokémon-ex), discard Scramble Energy."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/95/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/95/high.webp"
    }
  },
  {
    "id": "ex8-96",
    "name": "Crobat ex",
    "number": "96",
    "artist": "Ryo Ueda",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "130",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Golbat",
    "evolvesTo": [],
    "rules": [
      "When Pokémon-ex has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Distortion",
        "text": "Once during your turn (before your attack), if Crobat ex is your Active Pokémon, you may put 1 damage counter on 1 of your opponent's Pokémon. This power can't be used if Crobat ex is affected by a Special Condition.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Cross Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20x",
        "text": "Flip 4 coins. This attack does 20 damage times the number of heads. If you get 2 or more heads, the Defending Pokémon is now Confused."
      },
      {
        "name": "Pester",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "If the Defending Pokémon is affected by a Special Condition, this attack does 60 damage plus 40 more damage."
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
      169
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/96/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/96/high.webp"
    }
  },
  {
    "id": "ex8-97",
    "name": "Deoxys ex",
    "number": "97",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "When Pokémon-ex has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Form Change",
        "text": "Once during your turn (before your attack), you may search your deck for another Deoxys ex and switch it with Deoxys ex. (Any cards attached to Deoxys ex, damage counters, Special Conditions, and effects on it are now on the new Pokémon.) If you do, put Deoxys ex on top of your deck. Shuffle your deck afterward. You can't use more than 1 Form Change Poké-Power each turn.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Energy Burst",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each Energy attached to Deoxys ex and the Defending Pokémon."
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
      386
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/97/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/97/high.webp"
    }
  },
  {
    "id": "ex8-98",
    "name": "Deoxys ex",
    "number": "98",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "110",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "When Pokémon-ex has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Form Change",
        "text": "Once during your turn (before your attack), you may search your deck for another Deoxys ex and switch it with Deoxys ex. (Any cards attached to Deoxys ex, damage counters, Special Conditions, and effects on it are now on the new Pokémon.) If you do, put Deoxys ex on top of your deck. Shuffle your deck afterward. You can't use more than 1 Form Change Poké-Power each turn.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Psychic Burst",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "You may discard 2 Energy attached to Deoxys ex. If you do, this attack does 50 damage plus 20 more damage for each Energy attached to the Defending Pokémon."
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
      386
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/98/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/98/high.webp"
    }
  },
  {
    "id": "ex8-99",
    "name": "Deoxys ex",
    "number": "99",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "When Pokémon-ex has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Form Change",
        "text": "Once during your turn (before your attack), you may search your deck for another Deoxys ex and switch it with Deoxys ex. (Any cards attached to Deoxys ex, damage counters, Special Conditions, and effects on it are now on the new Pokémon.) If you do, put Deoxys ex on top of your deck. Shuffle your deck afterward. You can't use more than 1 Form Change Poké-Power each turn.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Psychic Shield",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Prevent all effects of attacks, including damage, done to Deoxys ex by your opponent's Pokémon-ex during your opponent's next turn."
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
      386
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/99/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/99/high.webp"
    }
  },
  {
    "id": "ex8-100",
    "name": "Hariyama ex",
    "number": "100",
    "artist": "Ryo Ueda",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "110",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Makuhita",
    "evolvesTo": [],
    "rules": [
      "When Pokémon-ex has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Commanding Aura",
        "text": "As long as Hariyama ex is your Active Pokémon, your opponent can't play any Stadium cards from his or her hand.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Knock Off",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Choose 1 card from your opponent's hand without looking and discard it."
      },
      {
        "name": "Pivot Throw",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "During your opponent's next turn, any damage done to Hariyama ex by attacks is increased by 10 (before applying Weakness and Resistance)."
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
      297
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/100/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/100/high.webp"
    }
  },
  {
    "id": "ex8-101",
    "name": "Manectric ex",
    "number": "101",
    "artist": "Hikaru Koike",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "100",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Electrike",
    "evolvesTo": [],
    "rules": [
      "When Pokémon-ex has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Disconnect",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Your opponent can't play any Trainer cards (except for Supporter cards) from his or her hand during your opponent's next turn."
      },
      {
        "name": "Mega Shot",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard all Lightning Energy attached to Manectric ex and then choose 1 of your opponent's Pokémon. This attack does 80 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      310
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/101/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/101/high.webp"
    }
  },
  {
    "id": "ex8-102",
    "name": "Rayquaza ex",
    "number": "102",
    "artist": "Shin-ichi Yoshikawa",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "When Pokémon-ex has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dragon Boost",
        "text": "Once during your turn, when you put Rayquaza ex from your hand onto your Bench, you may move any number of basic Energy cards attached to your Pokémon to Rayquaza ex.",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Spiral Blast",
        "cost": [
          "Fire",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "20x",
        "text": "Does 20 damage for each basic Energy card attached to Rayquaza ex."
      }
    ],
    "weaknesses": [
      {
        "type": "Colorless",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Water",
        "value": "-30"
      },
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
      384
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/102/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/102/high.webp"
    }
  },
  {
    "id": "ex8-103",
    "name": "Salamence ex",
    "number": "103",
    "artist": "Hikaru Koike",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "160",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Shelgon",
    "evolvesTo": [],
    "rules": [
      "When Pokémon-ex has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dragon Lift",
        "text": "The Retreat Cost for each of your Pokémon (excluding Pokémon-ex and Baby Pokémon) is 0.",
        "type": "Poke-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Flame Jet",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 40 damage to that Pokémon. This attack's damage isn't affected by Weakness or Resistance."
      },
      {
        "name": "Bright Flame",
        "cost": [
          "Fire",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120",
        "text": "Discard 2 Energy attached to Salamence ex."
      }
    ],
    "weaknesses": [
      {
        "type": "Colorless",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fire",
        "value": "-30"
      },
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
      373
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/103/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/103/high.webp"
    }
  },
  {
    "id": "ex8-104",
    "name": "Sharpedo ex",
    "number": "104",
    "artist": "Hikaru Koike",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "100",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Carvanha",
    "evolvesTo": [],
    "rules": [
      "When Pokémon-ex has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Drag Off",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Before doing damage, you may switch 1 of your opponent's Benched Pokémon with the Defending Pokémon. If you do, this attack does 20 damage to the new Defending Pokémon. Your opponent chooses the Defending Pokémon to switch."
      },
      {
        "name": "Darkness Blast",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "You may discard a Darkness Energy attached to Sharpedo ex. If you do, this attack does 60 damage plus 20 more damage and discard 1 Energy card attached to the Defending Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      319
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/104/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/104/high.webp"
    }
  },
  {
    "id": "ex8-105",
    "name": "Latias ★",
    "number": "105",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Holo Star",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Star"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can't have more than 1 Pokémon Star in your deck."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Miraculous Light",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Remove 1 damage counter from each of your Pokémon (including Latias ☆)."
      },
      {
        "name": "Shooting Star",
        "cost": [
          "Fire",
          "Water",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "If the Defending Pokémon is Pokémon-ex, discard all Energy cards attached to Latias ☆ and this attack does 50 damage plus 100 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Colorless",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-30"
      },
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
      380
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/105/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/105/high.webp"
    }
  },
  {
    "id": "ex8-106",
    "name": "Latios ★",
    "number": "106",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Holo Star",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Star"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can't have more than 1 Pokémon Star in your deck."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Miraculous Light",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Remove 1 damage counter and all Special Conditions from Latios ☆."
      },
      {
        "name": "Shining Star",
        "cost": [
          "Grass",
          "Lightning",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "If the Defending Pokémon is a Stage 2 Evolved Pokémon, discard all Energy cards attached to Latios ☆ and this attack does 50 damage plus 100 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Colorless",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Grass",
        "value": "-30"
      },
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
      381
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/106/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/106/high.webp"
    }
  },
  {
    "id": "ex8-107",
    "name": "Rayquaza ★",
    "number": "107",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Holo Star",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Star"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can't have more than 1 Pokémon Star in your deck."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Spiral Rush",
        "cost": [
          "Fire",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "30x",
        "text": "Flip a coin until you get tails. This attack does 30 damage times the number of heads."
      },
      {
        "name": "Holy Star",
        "cost": [
          "Fire",
          "Fire",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 4,
        "damage": "",
        "text": "Discard all Energy cards attached to Rayquaza ☆. This attack does 100 damage to each of your opponent's Pokémon-ex. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Colorless",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Water",
        "value": "-30"
      },
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
      384
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/107/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/107/high.webp"
    }
  },
  {
    "id": "ex8-108",
    "name": "Rocket's Raikou ex",
    "number": "108",
    "artist": "Ryo Ueda",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "100",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "When Pokémon-ex has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "",
        "text": "",
        "type": "Poke-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Thunderous Blow",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "Does 40 damage plus 10 more damage for each Lightning Energy attached to Rocket's Raikou ex."
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
      243
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/ex/ex8/108/low.webp",
      "large": "https://assets.tcgdex.net/en/ex/ex8/108/high.webp"
    }
  }
]

export default cardDetails
