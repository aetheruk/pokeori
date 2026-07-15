import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "swsh7-1",
    "name": "Pinsir",
    "number": "1",
    "artist": "Shin Nagasawa",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Single Strike"
    ],
    "hp": "120",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Vise Coach",
        "text": "Damage from your Single Strike Pokémon's attacks isn't affected by your opponent's Active Pokémon's Resistance.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Seismic Toss",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
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
      127
    ],
    "flavorText": "Although it's tough, it can't handle cold well. When night falls, it buries itself in leafage and sleeps.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/1.png",
      "large": "https://images.pokemontcg.io/swsh7/1_hires.png"
    }
  },
  {
    "id": "swsh7-2",
    "name": "Hoppip",
    "number": "2",
    "artist": "Kagemaru Himeno",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
    ],
    "hp": "40",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Skiploom"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Continuous Spin",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "Flip a coin until you get tails. This attack does 20 damage for each heads."
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
      187
    ],
    "flavorText": "It drifts on winds. It is said that when Hoppip gather in fields and mountains, spring is on the way.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/2.png",
      "large": "https://images.pokemontcg.io/swsh7/2_hires.png"
    }
  },
  {
    "id": "swsh7-3",
    "name": "Skiploom",
    "number": "3",
    "artist": "kirisAki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Rapid Strike"
    ],
    "hp": "60",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Hoppip",
    "evolvesTo": [
      "Jumpluff"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Solar Evolution",
        "text": "When you attach an Energy card from your hand to this Pokémon during your turn, you may search your deck for a card that evolves from this Pokémon and put it onto this Pokémon to evolve it. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Spinning Attack",
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      188
    ],
    "flavorText": "It spreads its petals to absorb sunlight. It also floats in the air to get closer to the sun.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/3.png",
      "large": "https://images.pokemontcg.io/swsh7/3_hires.png"
    }
  },
  {
    "id": "swsh7-4",
    "name": "Jumpluff",
    "number": "4",
    "artist": "Tika Matsuno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Rapid Strike"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Skiploom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fluffy Barrage",
        "text": "This Pokémon may attack twice each turn. If the first attack Knocks Out your opponent's Active Pokémon, you may attack again after your opponent chooses a new Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Spinning Attack",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      189
    ],
    "flavorText": "Even in the fiercest wind, it can control its fluff to make its way to any place in the world it wants.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/4.png",
      "large": "https://images.pokemontcg.io/swsh7/4_hires.png"
    }
  },
  {
    "id": "swsh7-5",
    "name": "Seedot",
    "number": "5",
    "artist": "otumami",
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
        "name": "Astonish",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Choose a random card from your opponent's hand. Your opponent reveals that card and shuffles it into their deck."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/5.png",
      "large": "https://images.pokemontcg.io/swsh7/5_hires.png"
    }
  },
  {
    "id": "swsh7-6",
    "name": "Tropius",
    "number": "6",
    "artist": "Oswaldo KATO",
    "rarity": "Rare",
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
        "name": "Rally Back",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If any of your Pokémon were Knocked Out by damage from an attack from your opponent's Pokémon during their last turn, this attack does 90 more damage."
      },
      {
        "name": "Solar Beam",
        "cost": [
          "Grass",
          "Grass",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      357
    ],
    "flavorText": "Bunches of delicious fruit grow around its neck. In warm areas, many ranches raise Tropius.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/6.png",
      "large": "https://images.pokemontcg.io/swsh7/6_hires.png"
    }
  },
  {
    "id": "swsh7-7",
    "name": "Leafeon V",
    "number": "7",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Greening Cells",
        "text": "Once during your turn, you may search your deck for a Grass Energy card and attach it to 1 of your Pokémon. Then, shuffle your deck. If you use this Ability, your turn ends.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Leaf Blade",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "Flip a coin. If heads, this attack does 60 more damage."
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
      470
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/7.png",
      "large": "https://images.pokemontcg.io/swsh7/7_hires.png"
    }
  },
  {
    "id": "swsh7-8",
    "name": "Leafeon VMAX",
    "number": "8",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "310",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Leafeon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Grass Knot",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60×",
        "text": "This attack does 60 damage for each Colorless in your opponent's Active Pokémon's Retreat Cost."
      },
      {
        "name": "Max Leaf",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "170",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      470
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/8.png",
      "large": "https://images.pokemontcg.io/swsh7/8_hires.png"
    }
  },
  {
    "id": "swsh7-9",
    "name": "Petilil",
    "number": "9",
    "artist": "Mika Pikazo",
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
      "Lilligant"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
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
      548
    ],
    "flavorText": "They prefer clean water and soil. When the environment they live in turns bad, the whole bunch will up and move to a new area.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/9.png",
      "large": "https://images.pokemontcg.io/swsh7/9_hires.png"
    }
  },
  {
    "id": "swsh7-10",
    "name": "Lilligant",
    "number": "10",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Petilil",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dizzying Flower",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Asleep. If tails, your opponent's Active Pokémon is now Confused."
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
      549
    ],
    "flavorText": "It's well liked by other Pokémon because of its beauty. The flower on its head needs constant care, or it will soon wither and rot.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/10.png",
      "large": "https://images.pokemontcg.io/swsh7/10_hires.png"
    }
  },
  {
    "id": "swsh7-11",
    "name": "Dwebble",
    "number": "11",
    "artist": "Shigenori Negishi",
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
      "Crustle"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ram",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Sharp Claws",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 30 more damage."
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
      557
    ],
    "flavorText": "It first tries to find a rock to live in, but if there are no suitable rocks to be found, Dwebble may move in to the ports of a Hippowdon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/11.png",
      "large": "https://images.pokemontcg.io/swsh7/11_hires.png"
    }
  },
  {
    "id": "swsh7-12",
    "name": "Crustle",
    "number": "12",
    "artist": "sowsow",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Dwebble",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "X-Scissor",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 60 more damage."
      },
      {
        "name": "Hammer In",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      558
    ],
    "flavorText": "Its thick claws are its greatest weapons. They're mighty enough to crack Rhyperior's carapace.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/12.png",
      "large": "https://images.pokemontcg.io/swsh7/12_hires.png"
    }
  },
  {
    "id": "swsh7-13",
    "name": "Trevenant V",
    "number": "13",
    "artist": "MUGENUP",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "210",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Absorb Life",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Heal 30 damage from this Pokémon."
      },
      {
        "name": "Shadow Claw",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Discard a random card from your opponent's hand."
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
      709
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/13.png",
      "large": "https://images.pokemontcg.io/swsh7/13_hires.png"
    }
  },
  {
    "id": "swsh7-14",
    "name": "Trevenant VMAX",
    "number": "14",
    "artist": "MUGENUP",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "320",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Trevenant V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Missing in the Forest",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40×",
        "text": "This attack does 40 damage for each Supporter card in your opponent's discard pile."
      },
      {
        "name": "Max Tree",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
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
      709
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/14.png",
      "large": "https://images.pokemontcg.io/swsh7/14_hires.png"
    }
  },
  {
    "id": "swsh7-15",
    "name": "Gossifleur",
    "number": "15",
    "artist": "Mizue",
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
      "Eldegoss"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Blot",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Heal 10 damage from this Pokémon."
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
      829
    ],
    "flavorText": "It whirls around in the wind while singing a joyous song. This delightful display has charmed many into raising this Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/15.png",
      "large": "https://images.pokemontcg.io/swsh7/15_hires.png"
    }
  },
  {
    "id": "swsh7-16",
    "name": "Eldegoss",
    "number": "16",
    "artist": "Kouki Saitou",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Gossifleur",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Cotton Lift",
        "text": "Once during your turn, you may search your deck for up to 2 basic Energy cards, reveal them, and put them into your hand. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Cotton Guard",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
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
      830
    ],
    "flavorText": "The cotton on the head of this Pokémon can be spun into a glossy, gorgeous yarn—a Galar regional specialty.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/16.png",
      "large": "https://images.pokemontcg.io/swsh7/16_hires.png"
    }
  },
  {
    "id": "swsh7-17",
    "name": "Applin",
    "number": "17",
    "artist": "Miki Tanaka",
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
      "Flapple"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rollout",
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
      840
    ],
    "flavorText": "As soon as it's born, it burrows into an apple. Not only does the apple serve as its food source, but the flavor of the fruit determines its evolution.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/17.png",
      "large": "https://images.pokemontcg.io/swsh7/17_hires.png"
    }
  },
  {
    "id": "swsh7-18",
    "name": "Flareon VMAX",
    "number": "18",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Single Strike"
    ],
    "hp": "320",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Flareon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Max Detonate",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100×",
        "text": "Discard the top 5 cards of your deck. This attack does 100 damage for each Energy card you discarded in this way."
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
      136
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/18.png",
      "large": "https://images.pokemontcg.io/swsh7/18_hires.png"
    }
  },
  {
    "id": "swsh7-19",
    "name": "Entei",
    "number": "19",
    "artist": "NC Empire",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Single Strike"
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
        "name": "Angry Fang",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10×",
        "text": "This attack does 10 damage for each damage counter on all of your Benched Single Strike Pokémon."
      },
      {
        "name": "Heat Tackle",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This Pokémon also does 30 damage to itself."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/19.png",
      "large": "https://images.pokemontcg.io/swsh7/19_hires.png"
    }
  },
  {
    "id": "swsh7-20",
    "name": "Victini",
    "number": "20",
    "artist": "Teeziro",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Victory Dive",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "You may search your deck for up to 2 cards and put them into your hand. Then, shuffle your deck."
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
      494
    ],
    "flavorText": "When it shares the infinite energy it creates, that being's entire body will be overflowing with power.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/20.png",
      "large": "https://images.pokemontcg.io/swsh7/20_hires.png"
    }
  },
  {
    "id": "swsh7-21",
    "name": "Volcarona V",
    "number": "21",
    "artist": "kawayoo",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "210",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Surging Flames",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "This attack does 20 more damage for each basic Energy card in your discard pile. Then, shuffle those Energy cards into your deck."
      },
      {
        "name": "Fire Blast",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
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
      637
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/21.png",
      "large": "https://images.pokemontcg.io/swsh7/21_hires.png"
    }
  },
  {
    "id": "swsh7-22",
    "name": "Litleo",
    "number": "22",
    "artist": "Misa Tsutsui",
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
        "name": "Live Coal",
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
      667
    ],
    "flavorText": "This hot-blooded Pokémon is filled with curiosity. When it gets angry or starts fighting, its short mane gets hot.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/22.png",
      "large": "https://images.pokemontcg.io/swsh7/22_hires.png"
    }
  },
  {
    "id": "swsh7-23",
    "name": "Pyroar",
    "number": "23",
    "artist": "Hitoshi Ariga",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Combustion",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Rip Claw",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "Discard an Energy from your opponent's Active Pokémon."
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
    "flavorText": "The temperature of its breath is over 10,000 degrees Fahrenheit, but Pyroar doesn't use it on its prey. This Pokémon prefers to eat raw meat.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/23.png",
      "large": "https://images.pokemontcg.io/swsh7/23_hires.png"
    }
  },
  {
    "id": "swsh7-24",
    "name": "Psyduck",
    "number": "24",
    "artist": "OKACHEKE",
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
      "Golduck"
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
      54
    ],
    "flavorText": "It has been found that its brain cells are 10 times more active when Psyduck is experiencing a headache.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/24.png",
      "large": "https://images.pokemontcg.io/swsh7/24_hires.png"
    }
  },
  {
    "id": "swsh7-25",
    "name": "Golduck",
    "number": "25",
    "artist": "Kyoko Umemoto",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Psyduck",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psybeam",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Your opponent's Active Pokémon is now Confused."
      },
      {
        "name": "Surf",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      55
    ],
    "flavorText": "A professional swimmer, it can continue swimming for two days straight by waving its long tail skillfully.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/25.png",
      "large": "https://images.pokemontcg.io/swsh7/25_hires.png"
    }
  },
  {
    "id": "swsh7-26",
    "name": "Tentacool",
    "number": "26",
    "artist": "SATOSHI NAKAI",
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
        "name": "Gentle Slap",
        "cost": [
          "Water",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      72
    ],
    "flavorText": "Its body is 99% water. The remaining 1% contains the organ that makes its poison.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/26.png",
      "large": "https://images.pokemontcg.io/swsh7/26_hires.png"
    }
  },
  {
    "id": "swsh7-27",
    "name": "Tentacruel",
    "number": "27",
    "artist": "Mina Nakai",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Tentacool",
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
        "damage": "50",
        "text": ""
      },
      {
        "name": "Poisonous Prison",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "Your opponent's Active Pokémon is now Poisoned. During your opponent's next turn, that Pokémon can't retreat."
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
      73
    ],
    "flavorText": "It communicates with others of its kind by lighting up the red orbs on its head. When the orbs are blinking, it's a warning sign.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/27.png",
      "large": "https://images.pokemontcg.io/swsh7/27_hires.png"
    }
  },
  {
    "id": "swsh7-28",
    "name": "Gyarados V",
    "number": "28",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Get Angry",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20×",
        "text": "This attack does 20 damage for each damage counter on this Pokémon."
      },
      {
        "name": "Heavy Storm",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      130
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/28.png",
      "large": "https://images.pokemontcg.io/swsh7/28_hires.png"
    }
  },
  {
    "id": "swsh7-29",
    "name": "Gyarados VMAX",
    "number": "29",
    "artist": "Shin Nagasawa",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "330",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Gyarados V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Hyper Beam",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Discard an Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Max Tyrant",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "240",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      130
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/29.png",
      "large": "https://images.pokemontcg.io/swsh7/29_hires.png"
    }
  },
  {
    "id": "swsh7-30",
    "name": "Vaporeon VMAX",
    "number": "30",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Rapid Strike"
    ],
    "hp": "320",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Vaporeon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Bubble Pod",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put a Water Pokémon from your discard pile onto your Bench. If you do, attach up to 3 Water Energy cards from your discard pile to that Pokémon."
      },
      {
        "name": "Max Torrent",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100+",
        "text": "If your opponent's Active Pokémon already has any damage counters on it, this attack does 100 more damage."
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
      134
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/30.png",
      "large": "https://images.pokemontcg.io/swsh7/30_hires.png"
    }
  },
  {
    "id": "swsh7-31",
    "name": "Suicune V",
    "number": "31",
    "artist": "Ayaka Yoshida",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "210",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Fleet-Footed",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may draw a card.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Blizzard Rondo",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 20 more damage for each Benched Pokémon (both yours and your opponent's)."
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
      245
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/31.png",
      "large": "https://images.pokemontcg.io/swsh7/31_hires.png"
    }
  },
  {
    "id": "swsh7-32",
    "name": "Lotad",
    "number": "32",
    "artist": "Teeziro",
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
      "Lombre"
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
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Rain Splash",
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
      270
    ],
    "flavorText": "Its leaf grew too large for it to live on land. That is how it began to live floating in the water.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/32.png",
      "large": "https://images.pokemontcg.io/swsh7/32_hires.png"
    }
  },
  {
    "id": "swsh7-33",
    "name": "Lombre",
    "number": "33",
    "artist": "miki kudo",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Lotad",
    "evolvesTo": [
      "Ludicolo"
    ],
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
      271
    ],
    "flavorText": "It lives at the water's edge where it is sunny. It sleeps on a bed of water grass by day and becomes active at night.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/33.png",
      "large": "https://images.pokemontcg.io/swsh7/33_hires.png"
    }
  },
  {
    "id": "swsh7-34",
    "name": "Ludicolo",
    "number": "34",
    "artist": "sowsow",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Lombre",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Enthusiastic Dance",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may use this Ability. During this turn, your Basic Pokémon's attacks do 100 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Wave Splash",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
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
      272
    ],
    "flavorText": "If it hears festive music, it begins moving in rhythm in order to amplify its power.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/34.png",
      "large": "https://images.pokemontcg.io/swsh7/34_hires.png"
    }
  },
  {
    "id": "swsh7-35",
    "name": "Carvanha",
    "number": "35",
    "artist": "Kyoko Umemoto",
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
      "Sharpedo"
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
        "name": "Razor Fin",
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
      318
    ],
    "flavorText": "With its sturdy jaws and fangs, it can easily chomp wooden boats to splinters. It fights with Basculin over food.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/35.png",
      "large": "https://images.pokemontcg.io/swsh7/35_hires.png"
    }
  },
  {
    "id": "swsh7-36",
    "name": "Sharpedo",
    "number": "36",
    "artist": "Kazuma Koda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Carvanha",
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
        "text": "Switch 1 of your opponent's Benched Pokémon with their Active Pokémon."
      },
      {
        "name": "Jet Bite",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "During your next turn, this Pokémon can't attack."
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
      319
    ],
    "flavorText": "It drinks in seawater and jets it from its rear to propel itself. It's very sensitive to the scent of blood.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/36.png",
      "large": "https://images.pokemontcg.io/swsh7/36_hires.png"
    }
  },
  {
    "id": "swsh7-37",
    "name": "Feebas",
    "number": "37",
    "artist": "tetsuya koizumi",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
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
        "name": "Flail Around",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 3 coins. This attack does 10 damage for each heads."
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
      349
    ],
    "flavorText": "It is a shabby and ugly Pokémon. However, it is very hardy and can survive on little water.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/37.png",
      "large": "https://images.pokemontcg.io/swsh7/37_hires.png"
    }
  },
  {
    "id": "swsh7-38",
    "name": "Milotic",
    "number": "38",
    "artist": "sui",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Rapid Strike"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Feebas",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Dew Guard",
        "text": "Whenever your opponent plays a Supporter card from their hand, prevent all effects of that card done to you or your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Double Smash",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70×",
        "text": "Flip 2 coins. This attack does 70 damage for each heads."
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
      350
    ],
    "flavorText": "It's said that a glimpse of a Milotic and its beauty will calm any hostile emotions you're feeling.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/38.png",
      "large": "https://images.pokemontcg.io/swsh7/38_hires.png"
    }
  },
  {
    "id": "swsh7-39",
    "name": "Luvdisc",
    "number": "39",
    "artist": "Mizue",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Synchrodraw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Shuffle your hand into your deck. Then, draw a card for each card in your opponent's hand."
      },
      {
        "name": "Water Gun",
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
      370
    ],
    "flavorText": "Luvdisc makes its home in coral reefs in warm seas. It especially likes sleeping in the space between Corsola's branches.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/39.png",
      "large": "https://images.pokemontcg.io/swsh7/39_hires.png"
    }
  },
  {
    "id": "swsh7-40",
    "name": "Glaceon V",
    "number": "40",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "210",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Frozen Awakening",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a card that evolves from this Pokémon and put it onto this Pokémon to evolve it. Then, shuffle your deck."
      },
      {
        "name": "Heavy Snow",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Discard a Stadium in play."
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
      471
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/40.png",
      "large": "https://images.pokemontcg.io/swsh7/40_hires.png"
    }
  },
  {
    "id": "swsh7-41",
    "name": "Glaceon VMAX",
    "number": "41",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "310",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Glaceon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Crystal Veil",
        "text": "Prevent all damage done to this Pokémon by attacks from your opponent's Pokémon VMAX, except any Glaceon VMAX.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Max Icicle",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "This attack also does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      471
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/41.png",
      "large": "https://images.pokemontcg.io/swsh7/41_hires.png"
    }
  },
  {
    "id": "swsh7-42",
    "name": "Tympole",
    "number": "42",
    "artist": "Mina Nakai",
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
      "Palpitoad"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mud-Slap",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      535
    ],
    "flavorText": "It uses sound waves to communicate with others of its kind. People and other Pokémon species can't hear its cries of warning.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/42.png",
      "large": "https://images.pokemontcg.io/swsh7/42_hires.png"
    }
  },
  {
    "id": "swsh7-43",
    "name": "Cryogonal",
    "number": "43",
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
        "name": "Element Chain",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 6 cards of your deck and attach any number of basic Energy cards you find there to your Pokémon in any way you like. Shuffle the other cards back into your deck."
      },
      {
        "name": "Icy Snow",
        "cost": [
          "Water",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      615
    ],
    "flavorText": "They are composed of ice crystals. They capture prey with chains of ice, freezing the prey at -148 degrees Fahrenheit.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/43.png",
      "large": "https://images.pokemontcg.io/swsh7/43_hires.png"
    }
  },
  {
    "id": "swsh7-44",
    "name": "Bergmite",
    "number": "44",
    "artist": "kirisAki",
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
        "name": "Tackle",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Spinning Attack",
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
    "flavorText": "This Pokémon lives in areas of frigid cold. It secures itself to the back of an Avalugg by freezing its feet in place.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/44.png",
      "large": "https://images.pokemontcg.io/swsh7/44_hires.png"
    }
  },
  {
    "id": "swsh7-45",
    "name": "Avalugg",
    "number": "45",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "150",
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
        "damage": "80",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Hammer In",
        "cost": [
          "Water",
          "Water",
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
    "flavorText": "As Avalugg moves about during the day, the cracks in its body deepen. The Pokémon's body returns to a pristine state overnight.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/45.png",
      "large": "https://images.pokemontcg.io/swsh7/45_hires.png"
    }
  },
  {
    "id": "swsh7-46",
    "name": "Wishiwashi",
    "number": "46",
    "artist": "Teeziro",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
    ],
    "hp": "30",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Group Power",
        "text": "If this Pokémon has 3 or more Water Energy attached, it gets +150 HP.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Schooling Shot",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 30 more damage for each basic Energy attached to this Pokémon."
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
      746
    ],
    "flavorText": "When it senses danger, its eyes tear up. The sparkle of its tears signals other Wishiwashi to gather.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/46.png",
      "large": "https://images.pokemontcg.io/swsh7/46_hires.png"
    }
  },
  {
    "id": "swsh7-47",
    "name": "Eiscue",
    "number": "47",
    "artist": "Mizue",
    "rarity": "Uncommon",
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
        "name": "Icy Snow",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Blockface",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "During your opponent's next turn, prevent all damage done to this Pokémon by attacks from Basic Pokémon."
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
      875
    ],
    "flavorText": "This Pokémon keeps its heat-sensitive head cool with ice. It fishes for its food, dangling its single hair into the sea to lure in prey.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/47.png",
      "large": "https://images.pokemontcg.io/swsh7/47_hires.png"
    }
  },
  {
    "id": "swsh7-48",
    "name": "Arctovish V",
    "number": "48",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Ancient Freeze",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "If the Defending Pokémon is a Pokémon V or a Pokémon-GX, it can't attack during your opponent's next turn."
      },
      {
        "name": "Giga Impact",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "220",
        "text": "During your next turn, this Pokémon can't attack."
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
      883
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/48.png",
      "large": "https://images.pokemontcg.io/swsh7/48_hires.png"
    }
  },
  {
    "id": "swsh7-49",
    "name": "Pikachu",
    "number": "49",
    "artist": "chibi",
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
        "name": "Electro Ball",
        "cost": [
          "Lightning",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      25
    ],
    "flavorText": "When Pikachu meet, they'll touch their tails together and exchange electricity through them as a form of greeting.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/49.png",
      "large": "https://images.pokemontcg.io/swsh7/49_hires.png"
    }
  },
  {
    "id": "swsh7-50",
    "name": "Raichu",
    "number": "50",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Pikachu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Big Sparking",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 50 damage to each Pokémon V and Pokémon-GX (both yours and your opponent's). (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Thunderbolt",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
        "text": "Discard all Energy from this Pokémon."
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
      26
    ],
    "flavorText": "If its electric pouches run empty, it raises its tail to gather electricity from the atmosphere.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/50.png",
      "large": "https://images.pokemontcg.io/swsh7/50_hires.png"
    }
  },
  {
    "id": "swsh7-51",
    "name": "Jolteon VMAX",
    "number": "51",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "300",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Jolteon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Max Thunder Rumble",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "100",
        "text": "This attack also does 100 damage to 1 of your opponent's Benched Pokémon that has any damage counters on it. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      135
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/51.png",
      "large": "https://images.pokemontcg.io/swsh7/51_hires.png"
    }
  },
  {
    "id": "swsh7-52",
    "name": "Chinchou",
    "number": "52",
    "artist": "sowsow",
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
      "Lanturn"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Electro Ball",
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
      170
    ],
    "flavorText": "On the dark ocean floor, its only means of communication is its constantly flashing lights.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/52.png",
      "large": "https://images.pokemontcg.io/swsh7/52_hires.png"
    }
  },
  {
    "id": "swsh7-53",
    "name": "Lanturn",
    "number": "53",
    "artist": "ryoma uratsuka",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Chinchou",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Blinding Beam",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "During your opponent's next turn, if the Defending Pokémon tries to attack, your opponent flips a coin. If tails, that attack doesn't happen."
      },
      {
        "name": "Electro Ball",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
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
      171
    ],
    "flavorText": "This Pokémon flashes a bright light that blinds its prey. This creates an opening for it to deliver an electrical attack.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/53.png",
      "large": "https://images.pokemontcg.io/swsh7/53_hires.png"
    }
  },
  {
    "id": "swsh7-54",
    "name": "Mareep",
    "number": "54",
    "artist": "Yukiko Baba",
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
      "Flaaffy"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rear Kick",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Electro Ball",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      179
    ],
    "flavorText": "Rubbing its fleece generates electricity. You'll want to pet it because it's cute, but if you use your bare hand, you'll get a painful shock.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/54.png",
      "large": "https://images.pokemontcg.io/swsh7/54_hires.png"
    }
  },
  {
    "id": "swsh7-55",
    "name": "Flaaffy",
    "number": "55",
    "artist": "OKACHEKE",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Mareep",
    "evolvesTo": [
      "Ampharos"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Dynamotor",
        "text": "Once during your turn (before your attack), you may attach a Lightning Energy card from your discard pile to 1 of your Benched Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Electro Ball",
        "cost": [
          "Lightning",
          "Lightning",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      180
    ],
    "flavorText": "It stores electricity in its fluffy fleece. If it stores up too much, it will start to go bald in those patches.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/55.png",
      "large": "https://images.pokemontcg.io/swsh7/55_hires.png"
    }
  },
  {
    "id": "swsh7-56",
    "name": "Ampharos",
    "number": "56",
    "artist": "Saya Tsuruta",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Flaaffy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Thunder Shock",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Electron Crush",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100+",
        "text": "You may discard 3 Lightning Energy from this Pokémon. If you do, this attack does 120 more damage."
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
      181
    ],
    "flavorText": "Its tail shines bright and strong. It has been prized since long ago as a beacon for sailors.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/56.png",
      "large": "https://images.pokemontcg.io/swsh7/56_hires.png"
    }
  },
  {
    "id": "swsh7-57",
    "name": "Emolga",
    "number": "57",
    "artist": "Nagomi Nijo",
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      587
    ],
    "flavorText": "As it flies, it scatters electricity around, so bird Pokémon keep their distance. That's why Emolga can keep all its food to itself.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/57.png",
      "large": "https://images.pokemontcg.io/swsh7/57_hires.png"
    }
  },
  {
    "id": "swsh7-58",
    "name": "Dracozolt V",
    "number": "58",
    "artist": "Ryota Murayama",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Primeval Beak",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, Energy cards can't be attached from your opponent's hand to the Defending Pokémon."
      },
      {
        "name": "Mountain Swing",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
        "text": "Discard the top 3 cards of your deck."
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
      880
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/58.png",
      "large": "https://images.pokemontcg.io/swsh7/58_hires.png"
    }
  },
  {
    "id": "swsh7-59",
    "name": "Dracozolt VMAX",
    "number": "59",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "330",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Dracozolt V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Spark Trap",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "60",
        "text": "During your opponent's next turn, if this Pokémon is damaged by an attack (even if it is Knocked Out), put 12 damage counters on the Attacking Pokémon."
      },
      {
        "name": "Max Impact",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "200",
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
      880
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/59.png",
      "large": "https://images.pokemontcg.io/swsh7/59_hires.png"
    }
  },
  {
    "id": "swsh7-60",
    "name": "Regieleki",
    "number": "60",
    "artist": "Shin Nagasawa",
    "rarity": "Rare Holo",
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
        "name": "Static Shock",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Teraspark",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Discard all Lightning Energy from this Pokémon. This attack also does 40 damage to 2 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      894
    ],
    "flavorText": "Its entire body is made up of a single organ that generates electrical energy. Regieleki is capable of creating all Galar's electricity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/60.png",
      "large": "https://images.pokemontcg.io/swsh7/60_hires.png"
    }
  },
  {
    "id": "swsh7-61",
    "name": "Drowzee",
    "number": "61",
    "artist": "nagimiso",
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
        "name": "Pound",
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
      96
    ],
    "flavorText": "It puts its prey to sleep and devours their dreams. It seems that bad dreams taste sour, so Drowzee doesn't particularly like eating them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/61.png",
      "large": "https://images.pokemontcg.io/swsh7/61_hires.png"
    }
  },
  {
    "id": "swsh7-62",
    "name": "Hypno",
    "number": "62",
    "artist": "Miki Tanaka",
    "rarity": "Uncommon",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Hypnosis",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Wake-Up Slap",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30+",
        "text": "If your opponent's Active Pokémon is affected by a Special Condition, this attack does 90 more damage. Then, that Pokémon recovers from all Special Conditions."
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
      97
    ],
    "flavorText": "There are some Hypno that assist doctors with patients who can't sleep at night in hospitals.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/62.png",
      "large": "https://images.pokemontcg.io/swsh7/62_hires.png"
    }
  },
  {
    "id": "swsh7-63",
    "name": "Galarian Articuno",
    "number": "63",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
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
        "name": "Cruel Charge",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may attach up to 2 Psychic Energy cards from your hand to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Psylaser",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard all Psychic Energy from this Pokémon. This attack does 120 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      144
    ],
    "flavorText": "Known as Articuno, this Pokémon fires beams that can immobilize opponents as if they had been frozen solid.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/63.png",
      "large": "https://images.pokemontcg.io/swsh7/63_hires.png"
    }
  },
  {
    "id": "swsh7-64",
    "name": "Espeon V",
    "number": "64",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Zen Shot",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 60 damage to 1 of your opponent's Pokémon V. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Super Psy Bolt",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
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
      196
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/64.png",
      "large": "https://images.pokemontcg.io/swsh7/64_hires.png"
    }
  },
  {
    "id": "swsh7-65",
    "name": "Espeon VMAX",
    "number": "65",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "310",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Espeon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Solar Revelation",
        "text": "Prevent all effects of attacks from your opponent's Pokémon done to all of your Pokémon that have Energy attached.(Existing effects are not removed. Damage is not an effect.)",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Max Mindstorm",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60×",
        "text": "This attack does 60 damage for each Energy attached to all of your opponent's Pokémon."
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
      196
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/65.png",
      "large": "https://images.pokemontcg.io/swsh7/65_hires.png"
    }
  },
  {
    "id": "swsh7-66",
    "name": "Wobbuffet",
    "number": "66",
    "artist": "Anesaki Dynamic",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Single Strike"
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
        "name": "Mirror Pain",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put damage counters on your opponent's Active Pokémon equal to the number of damage counters on 1 of your Benched Pokémon."
      },
      {
        "name": "Headbutt Bounce",
        "cost": [
          "Psychic",
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
      202
    ],
    "flavorText": "To keep its pitch-black tail hidden, it lives quietly in the darkness. It is never first to attack.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/66.png",
      "large": "https://images.pokemontcg.io/swsh7/66_hires.png"
    }
  },
  {
    "id": "swsh7-67",
    "name": "Sableye",
    "number": "67",
    "artist": "Eri Yamaki",
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
        "name": "Go and Collect",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Trainer card, reveal it, and put it into your hand. Then, shuffle your deck."
      },
      {
        "name": "Corner",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
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
      302
    ],
    "flavorText": "It feeds on gemstone crystals. In darkness, its eyes sparkle with the glitter of jewels.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/67.png",
      "large": "https://images.pokemontcg.io/swsh7/67_hires.png"
    }
  },
  {
    "id": "swsh7-68",
    "name": "Woobat",
    "number": "68",
    "artist": "Yuka Morii",
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
      "Swoobat"
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
          "Psychic"
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
      527
    ],
    "flavorText": "It emits ultrasonic waves as it flutters about, searching for its prey—bug Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/68.png",
      "large": "https://images.pokemontcg.io/swsh7/68_hires.png"
    }
  },
  {
    "id": "swsh7-69",
    "name": "Swoobat",
    "number": "69",
    "artist": "nagimiso",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Woobat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Synchro Woofer",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30+",
        "text": "If you have the same number of cards in your hand as your opponent, this attack does 80 more damage."
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
      528
    ],
    "flavorText": "The auspicious shape of this Pokémon's nose apparently led some regions to consider Swoobat a symbol of good luck.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/69.png",
      "large": "https://images.pokemontcg.io/swsh7/69_hires.png"
    }
  },
  {
    "id": "swsh7-70",
    "name": "Golurk V",
    "number": "70",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Single Strike"
    ],
    "hp": "220",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Mega Punch",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": ""
      },
      {
        "name": "Rewind Beam",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "If your opponent's Active Pokémon is an evolved Pokémon, devolve it by putting the highest Stage Evolution card on it into your opponent's hand."
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
      623
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/70.png",
      "large": "https://images.pokemontcg.io/swsh7/70_hires.png"
    }
  },
  {
    "id": "swsh7-71",
    "name": "Flabébé",
    "number": "71",
    "artist": "OKACHEKE",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
    ],
    "hp": "40",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Floette"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hypnotic Gaze",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Asleep."
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
      669
    ],
    "flavorText": "Flabébé wears a crown made from pollen it's collected from its flower. The crown has hidden healing properties.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/71.png",
      "large": "https://images.pokemontcg.io/swsh7/71_hires.png"
    }
  },
  {
    "id": "swsh7-72",
    "name": "Floette",
    "number": "72",
    "artist": "chibi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Rapid Strike"
    ],
    "hp": "70",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Flabébé",
    "evolvesTo": [
      "Florges"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fairy Wind",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Double Spin",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50×",
        "text": "Flip 2 coins. This attack does 50 damage for each heads."
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
      670
    ],
    "flavorText": "It gives its own power to flowers, pouring its heart into caring for them. Floette never forgives anyone who messes up a flower bed.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/72.png",
      "large": "https://images.pokemontcg.io/swsh7/72_hires.png"
    }
  },
  {
    "id": "swsh7-73",
    "name": "Florges",
    "number": "73",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Rapid Strike"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Floette",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Rapid Strike Connection",
        "text": "As often as you like during your turn, you may move an Energy from 1 of your Pokémon to 1 of your Rapid Strike Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Wonder Shine",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "Your opponent's Active Pokémon is now Confused."
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
      671
    ],
    "flavorText": "Its life can span several hundred years. It's said to devote its entire life to protecting gardens.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/73.png",
      "large": "https://images.pokemontcg.io/swsh7/73_hires.png"
    }
  },
  {
    "id": "swsh7-74",
    "name": "Sylveon V",
    "number": "74",
    "artist": "aky CG Works",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Rapid Strike"
    ],
    "hp": "200",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dream Gift",
        "text": "Once during your turn, you may search your deck for an Item card, reveal it, and put it into your hand. Then, shuffle your deck. If you use this Ability, your turn ends.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Magical Shot",
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
      700
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/74.png",
      "large": "https://images.pokemontcg.io/swsh7/74_hires.png"
    }
  },
  {
    "id": "swsh7-75",
    "name": "Sylveon VMAX",
    "number": "75",
    "artist": "Ryota Murayama",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Rapid Strike"
    ],
    "hp": "310",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Sylveon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Precious Touch",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach an Energy card from your hand to 1 of your Benched Pokémon. If you do, heal 120 damage from that Pokémon."
      },
      {
        "name": "Max Harmony",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70+",
        "text": "This attack does 30 more damage for each different type of Pokémon on your Bench."
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
      700
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/75.png",
      "large": "https://images.pokemontcg.io/swsh7/75_hires.png"
    }
  },
  {
    "id": "swsh7-76",
    "name": "Pumpkaboo",
    "number": "76",
    "artist": "Yuka Morii",
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
      "Gourgeist"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Pumpkin Pit",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may discard a Stadium in play.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Stampede",
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
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      710
    ],
    "flavorText": "The light that streams out from the holes in the pumpkin can hypnotize and control the people and Pokémon that see it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/76.png",
      "large": "https://images.pokemontcg.io/swsh7/76_hires.png"
    }
  },
  {
    "id": "swsh7-77",
    "name": "Gourgeist",
    "number": "77",
    "artist": "Megumi Higuchi",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Pumpkaboo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pandemonium",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60×",
        "text": "Reveal the top 6 cards of your deck. This attack does 60 damage for each Psychic Pokémon you find there. Then, shuffle those Pokémon back into your deck and discard the other cards."
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
      711
    ],
    "flavorText": "In the darkness of a new-moon night, Gourgeist will come knocking. Whoever answers the door will be swept off to the afterlife.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/77.png",
      "large": "https://images.pokemontcg.io/swsh7/77_hires.png"
    }
  },
  {
    "id": "swsh7-78",
    "name": "Cutiefly",
    "number": "78",
    "artist": "Yukiko Baba",
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
      "Ribombee"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flap",
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
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      742
    ],
    "flavorText": "An opponent's aura can tell Cutiefly what that opponent's next move will be. Then Cutiefly can glide around the attack and strike back.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/78.png",
      "large": "https://images.pokemontcg.io/swsh7/78_hires.png"
    }
  },
  {
    "id": "swsh7-79",
    "name": "Ribombee",
    "number": "79",
    "artist": "Saya Tsuruta",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Cutiefly",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tricky Steps",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "You may move an Energy from your opponent's Active Pokémon to 1 of their Benched Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      743
    ],
    "flavorText": "Ribombee absolutely hate getting wet or rained on. In the cloudy Galar region, they are very seldom seen.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/79.png",
      "large": "https://images.pokemontcg.io/swsh7/79_hires.png"
    }
  },
  {
    "id": "swsh7-80",
    "name": "Marshadow",
    "number": "80",
    "artist": "Yuya Oka",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
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
        "name": "Rapid Hunt",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Rapid Strike cards, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Shadow Flicker",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "If the Defending Pokémon is Knocked Out during your next turn, take 1 more Prize card."
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
      802
    ],
    "flavorText": "It sinks into the shadows of people and Pokémon, where it can understand their feelings and copy their capabilities.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/80.png",
      "large": "https://images.pokemontcg.io/swsh7/80_hires.png"
    }
  },
  {
    "id": "swsh7-81",
    "name": "Hitmonchan",
    "number": "81",
    "artist": "Uta",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Single Strike"
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
        "name": "Clean Hit",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "If your opponent's Active Pokémon is an Evolution Pokémon, this attack does 50 more damage."
      },
      {
        "name": "Bullet Straight Punch",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
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
      107
    ],
    "flavorText": "Its punches slice the air. However, it seems to need a short break after fighting for three minutes.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/81.png",
      "large": "https://images.pokemontcg.io/swsh7/81_hires.png"
    }
  },
  {
    "id": "swsh7-82",
    "name": "Galarian Zapdos",
    "number": "82",
    "artist": "kodama",
    "rarity": "Rare Holo",
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
        "name": "Strong Legs Charge",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may attach up to 2 Fighting Energy cards from your hand to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Zapper Kick",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "You may discard all Energy from this Pokémon. If you do, your opponent's Active Pokémon is now Paralyzed."
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
      145
    ],
    "flavorText": "One kick from its powerful legs will pulverize a dump truck. Supposedly, this Pokémon runs through the mountains at over 180 mph.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/82.png",
      "large": "https://images.pokemontcg.io/swsh7/82_hires.png"
    }
  },
  {
    "id": "swsh7-83",
    "name": "Medicham V",
    "number": "83",
    "artist": "Satoshi Shirai",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Rapid Strike"
    ],
    "hp": "210",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Yoga Loop",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put 2 damage counters on 1 of your opponent's Pokémon. If your opponent's Pokémon is Knocked Out by this attack, take another turn after this one. (Skip Pokémon Checkup.) If 1 of your Pokémon used Yoga Loop during your last turn, this attack can't be used."
      },
      {
        "name": "Smash Uppercut",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      308
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/83.png",
      "large": "https://images.pokemontcg.io/swsh7/83_hires.png"
    }
  },
  {
    "id": "swsh7-84",
    "name": "Hippopotas",
    "number": "84",
    "artist": "Yuya Oka",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Hippowdon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tackle",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Mud Shot",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
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
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      449
    ],
    "flavorText": "This Pokémon is active during the day and passes the cold desert nights burrowed snugly into the sand.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/84.png",
      "large": "https://images.pokemontcg.io/swsh7/84_hires.png"
    }
  },
  {
    "id": "swsh7-85",
    "name": "Hippowdon",
    "number": "85",
    "artist": "Eri Yamaki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "150",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Hippopotas",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hammer In",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": ""
      },
      {
        "name": "Sand Press",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "220",
        "text": "Discard 2 Energy from this Pokémon."
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
      450
    ],
    "flavorText": "When roused to violence by its rage, it spews out the quantities of sand it has swallowed and whips up a sandstorm.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/85.png",
      "large": "https://images.pokemontcg.io/swsh7/85_hires.png"
    }
  },
  {
    "id": "swsh7-86",
    "name": "Roggenrola",
    "number": "86",
    "artist": "Tomokazu Komiya",
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
      "Boldore"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mud-Slap",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Rolling Tackle",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      524
    ],
    "flavorText": "When it detects a noise, it starts to move. The energy core inside it makes this Pokémon slightly warm to the touch.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/86.png",
      "large": "https://images.pokemontcg.io/swsh7/86_hires.png"
    }
  },
  {
    "id": "swsh7-87",
    "name": "Boldore",
    "number": "87",
    "artist": "otumami",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Roggenrola",
    "evolvesTo": [
      "Gigalith"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Protect",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage from and effects of attacks done to this Pokémon."
      },
      {
        "name": "Boulder Crush",
        "cost": [
          "Fighting",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      525
    ],
    "flavorText": "It relies on sound in order to monitor what's in its vicinity. When angered, it will attack without ever changing the direction it's facing.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/87.png",
      "large": "https://images.pokemontcg.io/swsh7/87_hires.png"
    }
  },
  {
    "id": "swsh7-88",
    "name": "Gigalith",
    "number": "88",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Boldore",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Guard Press",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "During your opponent's next turn, this Pokémon takes 50 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Pressure Shot",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
        "text": "This Pokémon also does 10 damage to itself for each damage counter on it."
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
      526
    ],
    "flavorText": "Although its energy blasts can blow away a dump truck, they have a limitation— they can only be fired when the sun is out.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/88.png",
      "large": "https://images.pokemontcg.io/swsh7/88_hires.png"
    }
  },
  {
    "id": "swsh7-89",
    "name": "Palpitoad",
    "number": "89",
    "artist": "tetsuya koizumi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Tympole",
    "evolvesTo": [
      "Seismitoad"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stampede",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Tongue Slap",
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
      536
    ],
    "flavorText": "On occasion, their cries are sublimely pleasing to the ear. Palpitoad with larger lumps on their bodies can sing with a wider range of sounds.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/89.png",
      "large": "https://images.pokemontcg.io/swsh7/89_hires.png"
    }
  },
  {
    "id": "swsh7-90",
    "name": "Seismitoad",
    "number": "90",
    "artist": "Pani Kobayashi",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Palpitoad",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shaky Wave",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "60",
        "text": "During your opponent's next turn, the Defending Pokémon's attacks cost Colorless more, and its Retreat Cost is Colorless more."
      },
      {
        "name": "Hyper Voice",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "160",
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
      537
    ],
    "flavorText": "This Pokémon is popular among the elderly, who say the vibrations of its lumps are great for massages.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/90.png",
      "large": "https://images.pokemontcg.io/swsh7/90_hires.png"
    }
  },
  {
    "id": "swsh7-91",
    "name": "Lycanroc V",
    "number": "91",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Rock Throw",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Crashing Fangs",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "During your next turn, this Pokémon can't attack."
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
      745
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/91.png",
      "large": "https://images.pokemontcg.io/swsh7/91_hires.png"
    }
  },
  {
    "id": "swsh7-92",
    "name": "Lycanroc VMAX",
    "number": "92",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "320",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Lycanroc V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Hunting Claw",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Knock Out 1 of your opponent's Pokémon in play that has 60 HP or less remaining."
      },
      {
        "name": "Max Edge",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "190",
        "text": "This attack also does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      745
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/92.png",
      "large": "https://images.pokemontcg.io/swsh7/92_hires.png"
    }
  },
  {
    "id": "swsh7-93",
    "name": "Galarian Moltres",
    "number": "93",
    "artist": "Kazuma Koda",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Malevolent Charge",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may attach up to 2 Darkness Energy cards from your hand to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Fiery Wrath",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20+",
        "text": "This attack does 50 more damage for each Prize card your opponent has taken."
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
      146
    ],
    "flavorText": "The sinister aura that blazes like molten fire around this Pokémon is what inspired the name Moltres.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/93.png",
      "large": "https://images.pokemontcg.io/swsh7/93_hires.png"
    }
  },
  {
    "id": "swsh7-94",
    "name": "Umbreon V",
    "number": "94",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Single Strike"
    ],
    "hp": "200",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Mean Look",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
      },
      {
        "name": "Moonlight Blade",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If this Pokémon has any damage counters on it, this attack does 80 more damage."
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
      197
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/94.png",
      "large": "https://images.pokemontcg.io/swsh7/94_hires.png"
    }
  },
  {
    "id": "swsh7-95",
    "name": "Umbreon VMAX",
    "number": "95",
    "artist": "AKIRA EGAWA",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Single Strike"
    ],
    "hp": "310",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Umbreon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dark Signal",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may switch 1 of your opponent's Benched Pokémon with their Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Max Darkness",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
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
      197
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/95.png",
      "large": "https://images.pokemontcg.io/swsh7/95_hires.png"
    }
  },
  {
    "id": "swsh7-96",
    "name": "Nuzleaf",
    "number": "96",
    "artist": "Atsuko Nishida",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Seedot",
    "evolvesTo": [
      "Shiftry"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fake Out",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
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
      274
    ],
    "flavorText": "They live in holes bored in large trees. The sound of Nuzleaf's grass flute fills listeners with dread.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/96.png",
      "large": "https://images.pokemontcg.io/swsh7/96_hires.png"
    }
  },
  {
    "id": "swsh7-97",
    "name": "Shiftry",
    "number": "97",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Nuzleaf",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shiftadieu",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If your opponent's Active Pokémon has any damage counters on it, put it and all attached cards into your opponent's hand."
      },
      {
        "name": "Nipping Cyclone",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "Discard a random card from your opponent's hand."
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
      275
    ],
    "flavorText": "It lives quietly in the deep forest. It is said to create chilly winter winds with the fans it holds.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/97.png",
      "large": "https://images.pokemontcg.io/swsh7/97_hires.png"
    }
  },
  {
    "id": "swsh7-98",
    "name": "Scraggy",
    "number": "98",
    "artist": "Shin Nagasawa",
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
      "Scrafty"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hard Head",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "During your opponent's next turn, this Pokémon takes 10 less damage from attacks (after applying Weakness and Resistance)."
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
      559
    ],
    "flavorText": "It protects itself with its durable skin. It's thought that this Pokémon will evolve once its skin has completely stretched out.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/98.png",
      "large": "https://images.pokemontcg.io/swsh7/98_hires.png"
    }
  },
  {
    "id": "swsh7-99",
    "name": "Scrafty",
    "number": "99",
    "artist": "Yukiko Baba",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Scraggy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Headbutt",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Shakedown",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Discard a random card from your opponent's hand."
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
      560
    ],
    "flavorText": "While mostly known for having the temperament of an aggressive ruffian, this Pokémon takes very good care of its family, friends, and territory.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/99.png",
      "large": "https://images.pokemontcg.io/swsh7/99_hires.png"
    }
  },
  {
    "id": "swsh7-100",
    "name": "Garbodor V",
    "number": "100",
    "artist": "Uta",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "210",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Trash Stench",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Your opponent's Active Pokémon is now Poisoned. During your opponent's next turn, that Pokémon can't retreat."
      },
      {
        "name": "Sludge Bomb",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
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
      569
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/100.png",
      "large": "https://images.pokemontcg.io/swsh7/100_hires.png"
    }
  },
  {
    "id": "swsh7-101",
    "name": "Garbodor VMAX",
    "number": "101",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "330",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Garbodor V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Rubbish Collecting",
        "text": "This Pokémon may have up to 2 Pokémon Tools attached to it. If it loses this Ability, discard Pokémon Tools from it until only 1 remains.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "G-Max Malodor",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "Your opponent's Active Pokémon is now Poisoned. During your opponent's next turn, that Pokémon can't retreat."
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
      569
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/101.png",
      "large": "https://images.pokemontcg.io/swsh7/101_hires.png"
    }
  },
  {
    "id": "swsh7-102",
    "name": "Zorua",
    "number": "102",
    "artist": "ryoma uratsuka",
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
      "Zoroark"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rear Kick",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      570
    ],
    "flavorText": "If a normally talkative child suddenly stops talking, it may have been replaced by Zorua.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/102.png",
      "large": "https://images.pokemontcg.io/swsh7/102_hires.png"
    }
  },
  {
    "id": "swsh7-103",
    "name": "Zoroark",
    "number": "103",
    "artist": "Souichirou Gunjima",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Zorua",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Phantom Transformation",
        "text": "Once during your turn, you may choose a Stage 1 Pokémon, except any Zoroark, from your discard pile. If you do, discard this Pokémon and all attached cards, and put the chosen Pokémon in its place.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Night Daze",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      571
    ],
    "flavorText": "If it thinks humans are going to discover its den, Zoroark shows them visions that make them wander around in the woods.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/103.png",
      "large": "https://images.pokemontcg.io/swsh7/103_hires.png"
    }
  },
  {
    "id": "swsh7-104",
    "name": "Nickit",
    "number": "104",
    "artist": "Hasegawa Saki",
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
    "flavorText": "Cunning and cautious, this Pokémon survives by stealing food from others. It erases its tracks with swipes of its tail as it makes off with its plunder.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/104.png",
      "large": "https://images.pokemontcg.io/swsh7/104_hires.png"
    }
  },
  {
    "id": "swsh7-105",
    "name": "Thievul",
    "number": "105",
    "artist": "Kyoko Umemoto",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Nickit",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fumbling Hands",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may have each player shuffle their hand and put it on the bottom of their deck. If either player put any cards on the bottom of their deck in this way, each player draws 4 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Tail Smack",
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
    "flavorText": "With a lithe body and sharp claws, it goes around stealing food and eggs. Boltund is its natural enemy.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/105.png",
      "large": "https://images.pokemontcg.io/swsh7/105_hires.png"
    }
  },
  {
    "id": "swsh7-106",
    "name": "Altaria",
    "number": "106",
    "artist": "Misa Tsutsui",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Swablu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Tempting Tune",
        "text": "Once during your turn, you may search your deck for a Supporter card, reveal it, shuffle your deck, then put that card on top of it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Glide",
        "cost": [
          "Water",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": ""
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      334
    ],
    "flavorText": "On sunny days, it flies freely through the sky and blends into the clouds. It sings in a beautiful soprano.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/106.png",
      "large": "https://images.pokemontcg.io/swsh7/106_hires.png"
    }
  },
  {
    "id": "swsh7-107",
    "name": "Bagon",
    "number": "107",
    "artist": "ryoma uratsuka",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Shelgon"
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
        "damage": "10",
        "text": ""
      },
      {
        "name": "Headbutt",
        "cost": [
          "Fire",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      371
    ],
    "flavorText": "Some theories suggest that its behavior of forcefully bashing its head into things stimulates cells that affect its evolution.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/107.png",
      "large": "https://images.pokemontcg.io/swsh7/107_hires.png"
    }
  },
  {
    "id": "swsh7-108",
    "name": "Shelgon",
    "number": "108",
    "artist": "tetsuya koizumi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Bagon",
    "evolvesTo": [
      "Salamence"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hard Roll",
        "cost": [
          "Fire",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage from and effects of attacks done to this Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      372
    ],
    "flavorText": "Shelgon lives deep within caves. It stays shut up in its hard shell, dreaming of the day it will be able to fly.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/108.png",
      "large": "https://images.pokemontcg.io/swsh7/108_hires.png"
    }
  },
  {
    "id": "swsh7-109",
    "name": "Salamence",
    "number": "109",
    "artist": "kodama",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Shelgon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Intimidating Roar",
        "text": "Once during your turn, you may have your opponent switch their Active Pokémon with 1 of their Benched Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Fierce Dragon",
        "cost": [
          "Fire",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "100+",
        "text": "If your opponent's Active Pokémon already has any damage counters on it, this attack does 120 more damage."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      373
    ],
    "flavorText": "Thanks to its fervent wishes, the cells in its body finally mutated, and at last it has its heart's desire—wings.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/109.png",
      "large": "https://images.pokemontcg.io/swsh7/109_hires.png"
    }
  },
  {
    "id": "swsh7-110",
    "name": "Rayquaza V",
    "number": "110",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Rapid Strike"
    ],
    "hp": "210",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Dragon Pulse",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "Discard the top 2 cards of your deck."
      },
      {
        "name": "Spiral Burst",
        "cost": [
          "Fire",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "You may discard up to 2 basic Fire Energy or up to 2 basic Lightning Energy from this Pokémon. This attack does 80 more damage for each card you discarded in this way."
      }
    ],
    "weaknesses": [],
    "resistances": [],
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
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/110.png",
      "large": "https://images.pokemontcg.io/swsh7/110_hires.png"
    }
  },
  {
    "id": "swsh7-111",
    "name": "Rayquaza VMAX",
    "number": "111",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Rapid Strike"
    ],
    "hp": "320",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Rayquaza V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Azure Pulse",
        "text": "Once during your turn, you may discard your hand and draw 3 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Max Burst",
        "cost": [
          "Fire",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "You may discard any amount of basic Fire Energy or any amount of basic Lightning Energy from this Pokémon. This attack does 80 more damage for each card you discarded in this way."
      }
    ],
    "weaknesses": [],
    "resistances": [],
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
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/111.png",
      "large": "https://images.pokemontcg.io/swsh7/111_hires.png"
    }
  },
  {
    "id": "swsh7-112",
    "name": "Dialga",
    "number": "112",
    "artist": "Ryuta Fuse",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Single Strike"
    ],
    "hp": "130",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Chrono Wind",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "If the Defending Pokémon is a Pokémon V, it can't attack during your opponent's next turn."
      },
      {
        "name": "Heavy Impact",
        "cost": [
          "Psychic",
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "210",
        "text": ""
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      483
    ],
    "flavorText": "It has the power to control time. It appears in Sinnoh-region myths as an ancient deity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/112.png",
      "large": "https://images.pokemontcg.io/swsh7/112_hires.png"
    }
  },
  {
    "id": "swsh7-113",
    "name": "Deino",
    "number": "113",
    "artist": "HYOGONOSUKE",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Zweilous"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Call for Family",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Basic Pokémon and put it onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Bite",
        "cost": [
          "Psychic",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
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
      633
    ],
    "flavorText": "Because it can't see, this Pokémon is constantly biting at everything it touches, trying to keep track of its surroundings.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/113.png",
      "large": "https://images.pokemontcg.io/swsh7/113_hires.png"
    }
  },
  {
    "id": "swsh7-114",
    "name": "Zweilous",
    "number": "114",
    "artist": "Akira Komayama",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Deino",
    "evolvesTo": [
      "Hydreigon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bite",
        "cost": [
          "Psychic",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Dragon Headbutt",
        "cost": [
          "Psychic",
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": ""
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      634
    ],
    "flavorText": "Their two heads will fight each other over a single piece of food. Zweilous are covered in scars even without battling others.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/114.png",
      "large": "https://images.pokemontcg.io/swsh7/114_hires.png"
    }
  },
  {
    "id": "swsh7-115",
    "name": "Hydreigon",
    "number": "115",
    "artist": "hatachu",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Zweilous",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dragon Counter",
        "cost": [
          "Psychic",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 100 more damage for each Prize card your opponent took during their last turn."
      },
      {
        "name": "Pitch-Black Fangs",
        "cost": [
          "Psychic",
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "210",
        "text": ""
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      635
    ],
    "flavorText": "The three heads take turns sinking their teeth into the opponent. Their attacks won't slow until their target goes down.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/115.png",
      "large": "https://images.pokemontcg.io/swsh7/115_hires.png"
    }
  },
  {
    "id": "swsh7-116",
    "name": "Kyurem",
    "number": "116",
    "artist": "Souichirou Gunjima",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Extreme Freeze",
        "cost": [
          "Water",
          "Water",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "60×",
        "text": "Discard any amount of Water Energy from your Pokémon. This attack does 60 damage for each card you discarded in this way."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      646
    ],
    "flavorText": "It generates a powerful, freezing energy inside itself, but its body became frozen when the energy leaked out.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/116.png",
      "large": "https://images.pokemontcg.io/swsh7/116_hires.png"
    }
  },
  {
    "id": "swsh7-117",
    "name": "Noivern V",
    "number": "117",
    "artist": "Ayaka Yoshida",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Boomburst",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 20 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Synchro Loud",
        "cost": [
          "Psychic",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "60+",
        "text": "If you have the same number of cards in your hand as your opponent, this attack does 120 more damage."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      715
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/117.png",
      "large": "https://images.pokemontcg.io/swsh7/117_hires.png"
    }
  },
  {
    "id": "swsh7-118",
    "name": "Zygarde",
    "number": "118",
    "artist": "otumami",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
    ],
    "hp": "130",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bite",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Judgment Surge",
        "cost": [
          "Grass",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 40 damage to 1 of your opponent's Pokémon for each Prize card your opponent has taken. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      718
    ],
    "flavorText": "Some say it can change to an even more powerful form when battling those who threaten the ecosystem.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/118.png",
      "large": "https://images.pokemontcg.io/swsh7/118_hires.png"
    }
  },
  {
    "id": "swsh7-119",
    "name": "Drampa",
    "number": "119",
    "artist": "Tomokazu Komiya",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Corkscrew Punch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Berserk",
        "cost": [
          "Water",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "70+",
        "text": "If your Benched Pokémon have any damage counters on them, this attack does 90 more damage."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      780
    ],
    "flavorText": "Drampa is a kind and friendly Pokémon—up until it's angered. When that happens, it stirs up a gale and flattens everything around.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/119.png",
      "large": "https://images.pokemontcg.io/swsh7/119_hires.png"
    }
  },
  {
    "id": "swsh7-120",
    "name": "Flapple",
    "number": "120",
    "artist": "Anesaki Dynamic",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Applin",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Acidic Mucus",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "This attack does 50 damage for each of your opponent's Pokémon in play that has an Ability."
      },
      {
        "name": "Fighting Tackle",
        "cost": [
          "Grass",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "80+",
        "text": "If your opponent's Active Pokémon is a Pokémon V, this attack does 80 more damage."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      841
    ],
    "flavorText": "It flies on wings of apple skin and spits a powerful acid. It can also change its shape into that of an apple.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/120.png",
      "large": "https://images.pokemontcg.io/swsh7/120_hires.png"
    }
  },
  {
    "id": "swsh7-121",
    "name": "Appletun",
    "number": "121",
    "artist": "Yuya Oka",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Applin",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Thick Mucus",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "70×",
        "text": "This attack does 70 damage for each Special Energy card attached to your opponent's Pokémon."
      },
      {
        "name": "Fighting Tackle",
        "cost": [
          "Grass",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "80+",
        "text": "If your opponent's Active Pokémon is a Pokémon V, this attack does 80 more damage."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      842
    ],
    "flavorText": "Its body is covered in sweet nectar, and the skin on its back is especially yummy. Children used to have it as a snack.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/121.png",
      "large": "https://images.pokemontcg.io/swsh7/121_hires.png"
    }
  },
  {
    "id": "swsh7-122",
    "name": "Duraludon V",
    "number": "122",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Single Strike"
    ],
    "hp": "220",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Metal Claw",
        "cost": [
          "Fighting",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": ""
      },
      {
        "name": "Breaking Swipe",
        "cost": [
          "Fighting",
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "140",
        "text": "During your opponent's next turn, the Defending Pokémon's attacks do 30 less damage (before applying Weakness and Resistance)."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      884
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/122.png",
      "large": "https://images.pokemontcg.io/swsh7/122_hires.png"
    }
  },
  {
    "id": "swsh7-123",
    "name": "Duraludon VMAX",
    "number": "123",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Single Strike"
    ],
    "hp": "330",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Duraludon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Skyscraper",
        "text": "Prevent all damage done to this Pokémon by attacks from your opponent's Pokémon that have Special Energy attached.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "G-Max Pulverization",
        "cost": [
          "Fighting",
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "220",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      884
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/123.png",
      "large": "https://images.pokemontcg.io/swsh7/123_hires.png"
    }
  },
  {
    "id": "swsh7-124",
    "name": "Regidrago",
    "number": "124",
    "artist": "Kouki Saitou",
    "rarity": "Rare Holo",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Hammer In",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Dragon Energy",
        "cost": [
          "Grass",
          "Grass",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "240-",
        "text": "This attack does 20 less damage for each damage counter on this Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      895
    ],
    "flavorText": "Its body is composed of crystallized dragon energy. Regidrago is said to have the powers of every dragon Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/124.png",
      "large": "https://images.pokemontcg.io/swsh7/124_hires.png"
    }
  },
  {
    "id": "swsh7-125",
    "name": "Eevee",
    "number": "125",
    "artist": "Atsushi Furusawa",
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
        "name": "Vee-Search",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 Pokémon V, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Stampede",
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
      133
    ],
    "flavorText": "Thanks to its unstable genetic makeup, this special Pokémon conceals many different possible evolutions.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/125.png",
      "large": "https://images.pokemontcg.io/swsh7/125_hires.png"
    }
  },
  {
    "id": "swsh7-126",
    "name": "Teddiursa",
    "number": "126",
    "artist": "Mizue",
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
      "Ursaring"
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
      216
    ],
    "flavorText": "Before food becomes scarce in wintertime, its habit is to hoard food in many hidden locations.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/126.png",
      "large": "https://images.pokemontcg.io/swsh7/126_hires.png"
    }
  },
  {
    "id": "swsh7-127",
    "name": "Ursaring",
    "number": "127",
    "artist": "Hasegawa Saki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Teddiursa",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Slash",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Whap Down",
        "cost": [
          "Colorless",
          "Colorless",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      217
    ],
    "flavorText": "Although it has a large body, it is quite skilled at climbing trees. It eats and sleeps in the treetops.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/127.png",
      "large": "https://images.pokemontcg.io/swsh7/127_hires.png"
    }
  },
  {
    "id": "swsh7-128",
    "name": "Smeargle",
    "number": "128",
    "artist": "Kouki Saitou",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Live Painting",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "Reveal any number of basic Energy cards from your hand. This attack does 30 more damage for each type of basic Energy you revealed in this way."
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
      235
    ],
    "flavorText": "It draws symbols with the fluid that oozes from the tip of its tail. Depending on the symbol, Smeargle fanatics will pay big money for them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/128.png",
      "large": "https://images.pokemontcg.io/swsh7/128_hires.png"
    }
  },
  {
    "id": "swsh7-129",
    "name": "Slakoth",
    "number": "129",
    "artist": "OKACHEKE",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Single Strike"
    ],
    "hp": "70",
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
        "name": "Smack 'n' Slack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "This Pokémon is now Asleep."
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
      287
    ],
    "flavorText": "If it eats just three leaves in a day, it is satisfied. Other than that, it sleeps for 20 hours a day.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/129.png",
      "large": "https://images.pokemontcg.io/swsh7/129_hires.png"
    }
  },
  {
    "id": "swsh7-130",
    "name": "Vigoroth",
    "number": "130",
    "artist": "nagimiso",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Single Strike"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Slakoth",
    "evolvesTo": [
      "Slaking"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shatter",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Discard a Stadium in play."
      },
      {
        "name": "Slash",
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
      288
    ],
    "flavorText": "Its stress level rises if it cannot keep moving constantly. Too much stress makes it feel sick.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/130.png",
      "large": "https://images.pokemontcg.io/swsh7/130_hires.png"
    }
  },
  {
    "id": "swsh7-131",
    "name": "Slaking",
    "number": "131",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Single Strike"
    ],
    "hp": "180",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Vigoroth",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Act Freely",
        "text": "If a Stadium is in play, this Pokémon can't attack.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rout",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120+",
        "text": "This attack does 30 more damage for each of your opponent's Benched Pokémon."
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
      289
    ],
    "flavorText": "It is the world's most slothful Pokémon. However, it can exert horrifying power by releasing pent-up energy all at once.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/131.png",
      "large": "https://images.pokemontcg.io/swsh7/131_hires.png"
    }
  },
  {
    "id": "swsh7-132",
    "name": "Swablu",
    "number": "132",
    "artist": "Lee HyunJung",
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
      "Altaria"
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
    "flavorText": "It constantly grooms its cotton-like wings. It takes a shower to clean itself if it becomes dirty.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/132.png",
      "large": "https://images.pokemontcg.io/swsh7/132_hires.png"
    }
  },
  {
    "id": "swsh7-133",
    "name": "Lillipup",
    "number": "133",
    "artist": "Naoyo Kimura",
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
        "name": "Lead",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Supporter card, reveal it, and put it into your hand. Then, shuffle your deck."
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
    "flavorText": "This Pokémon is popular with beginners because it's intelligent, obedient to its Trainer's commands, and easy to raise.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/133.png",
      "large": "https://images.pokemontcg.io/swsh7/133_hires.png"
    }
  },
  {
    "id": "swsh7-134",
    "name": "Herdier",
    "number": "134",
    "artist": "kirisAki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
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
        "name": "Tackle",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Take Down",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "This Pokémon also does 20 damage to itself."
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
      507
    ],
    "flavorText": "It has been living with people for so long that portrayals of it can be found on the walls of caves from long, long ago.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/134.png",
      "large": "https://images.pokemontcg.io/swsh7/134_hires.png"
    }
  },
  {
    "id": "swsh7-135",
    "name": "Stoutland",
    "number": "135",
    "artist": "Naoki Saito",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Herdier",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Intimidating Fang",
        "text": "As long as this Pokémon is in the Active Spot, your opponent's Active Pokémon's attacks do 30 less damage (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Knock Away",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120+",
        "text": "Flip a coin. If heads, this attack does 100 more damage."
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
    "flavorText": "Its fur is long and thick. A long time ago in cold regions, every household kept a Stoutland.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/135.png",
      "large": "https://images.pokemontcg.io/swsh7/135_hires.png"
    }
  },
  {
    "id": "swsh7-136",
    "name": "Rufflet",
    "number": "136",
    "artist": "0313",
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
      "Braviary"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Whirlwind",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Your opponent switches their Active Pokémon with 1 of their Benched Pokémon."
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
      627
    ],
    "flavorText": "A combative Pokémon, it's ready to pick a fight with anyone. It has talons that can crush hard berries.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/136.png",
      "large": "https://images.pokemontcg.io/swsh7/136_hires.png"
    }
  },
  {
    "id": "swsh7-137",
    "name": "Braviary",
    "number": "137",
    "artist": "SATOSHI NAKAI",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Rufflet",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Valiant Talons",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30+",
        "text": "If your opponent's Active Pokémon is an Evolution Pokémon, this attack does 60 more damage."
      },
      {
        "name": "Brave Bird",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "This Pokémon also does 50 damage to itself."
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
      628
    ],
    "flavorText": "Because this Pokémon is hotheaded and belligerent, it's Corviknight that's taken the role of transportation in Galar.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/137.png",
      "large": "https://images.pokemontcg.io/swsh7/137_hires.png"
    }
  },
  {
    "id": "swsh7-138",
    "name": "Fletchling",
    "number": "138",
    "artist": "Sumiyoshi Kizuki",
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
      "Fletchinder"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tailwind Draw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card. If you go second and it's your first turn, draw 3 more cards."
      },
      {
        "name": "Surprise Attack",
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
      661
    ],
    "flavorText": "Its body is always warm. Trainers who live in cold areas apparently sleep with it in their bed.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/138.png",
      "large": "https://images.pokemontcg.io/swsh7/138_hires.png"
    }
  },
  {
    "id": "swsh7-139",
    "name": "Fletchinder",
    "number": "139",
    "artist": "Yuya Oka",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Fletchling",
    "evolvesTo": [
      "Talonflame"
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
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      662
    ],
    "flavorText": "Its speed right after takeoff already puts it in the top speed class of all bird Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/139.png",
      "large": "https://images.pokemontcg.io/swsh7/139_hires.png"
    }
  },
  {
    "id": "swsh7-140",
    "name": "Talonflame",
    "number": "140",
    "artist": "Tika Matsuno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Fletchinder",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Clutch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
      },
      {
        "name": "Nitro Dive",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "80+",
        "text": "If this Pokémon has any Fire Energy attached, this attack does 80 more damage."
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
      663
    ],
    "flavorText": "Bird Pokémon make up most of its diet. It approaches at high speeds and smacks them down to the ground with its powerful kick.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/140.png",
      "large": "https://images.pokemontcg.io/swsh7/140_hires.png"
    }
  },
  {
    "id": "swsh7-141",
    "name": "Aroma Lady",
    "number": "141",
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
      "Draw 2 cards. If you do, your Active Pokémon recovers from all Special Conditions.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/141.png",
      "large": "https://images.pokemontcg.io/swsh7/141_hires.png"
    }
  },
  {
    "id": "swsh7-142",
    "name": "Boost Shake",
    "number": "142",
    "artist": "sadaji",
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
      "Search your deck for a card that evolves from 1 of your Pokémon and put it onto that Pokémon to evolve it. Then, shuffle your deck. You can use this card during your first turn or on a Pokémon that was put into play this turn. Your turn ends.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/142.png",
      "large": "https://images.pokemontcg.io/swsh7/142_hires.png"
    }
  },
  {
    "id": "swsh7-143",
    "name": "Copycat",
    "number": "143",
    "artist": "Sanosuke Sakuma",
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
      "Shuffle your hand into your deck. Then, draw a card for each card in your opponent's hand.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/143.png",
      "large": "https://images.pokemontcg.io/swsh7/143_hires.png"
    }
  },
  {
    "id": "swsh7-144",
    "name": "Crystal Cave",
    "number": "144",
    "artist": "Toyste Beach",
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
      "Once during each player's turn, that player may heal 30 damage from each of their Metal Pokémon and Dragon Pokémon."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/144.png",
      "large": "https://images.pokemontcg.io/swsh7/144_hires.png"
    }
  },
  {
    "id": "swsh7-145",
    "name": "Digging Gloves",
    "number": "145",
    "artist": "Toyste Beach",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "The attacks of the Pokémon this card is attached to do 30 more damage to your opponent's Active Fighting Pokémon (before applying Weakness and Resistance).",
      "You may play any number of Item cards during your turn.",
      "Attach a Pokémon Tool to 1 of your Pokémon that doesn't already have a Pokémon Tool attached."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/145.png",
      "large": "https://images.pokemontcg.io/swsh7/145_hires.png"
    }
  },
  {
    "id": "swsh7-146",
    "name": "Dream Ball",
    "number": "146",
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
      "You can play this card only if you took it as a face-down Prize card, before you put it into your hand. Search your deck for a Pokémon and put it onto your Bench. Then, shuffle your deck.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/146.png",
      "large": "https://images.pokemontcg.io/swsh7/146_hires.png"
    }
  },
  {
    "id": "swsh7-147",
    "name": "Elemental Badge",
    "number": "147",
    "artist": "Studio Bora Inc.",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "If the Pokémon V this card is attached to has \"Vaporeon,\" \"Jolteon,\" or \"Flareon\" in its name, its attacks cost Colorless less.",
      "You may play any number of Item cards during your turn.",
      "Attach a Pokémon Tool to 1 of your Pokémon that doesn't already have a Pokémon Tool attached."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/147.png",
      "large": "https://images.pokemontcg.io/swsh7/147_hires.png"
    }
  },
  {
    "id": "swsh7-148",
    "name": "Full Face Guard",
    "number": "148",
    "artist": "AYUMI ODASHIMA",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "If the Pokémon this card is attached to has no Abilities, it takes 20 less damage from attacks from your opponent's Pokémon (after applying Weakness and Resistance).",
      "You may play any number of Item cards during your turn.",
      "Attach a Pokémon Tool to 1 of your Pokémon that doesn't already have a Pokémon Tool attached."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/148.png",
      "large": "https://images.pokemontcg.io/swsh7/148_hires.png"
    }
  },
  {
    "id": "swsh7-149",
    "name": "Gordie",
    "number": "149",
    "artist": "take",
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
      "Look at the top 7 cards of your deck. You may reveal any number of Energy cards you find there and put them into your hand. Shuffle the other cards back into your deck.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/149.png",
      "large": "https://images.pokemontcg.io/swsh7/149_hires.png"
    }
  },
  {
    "id": "swsh7-150",
    "name": "Lucky Ice Pop",
    "number": "150",
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
      "Heal 20 damage from your Active Pokémon. If you healed any damage in this way, flip a coin. If heads, put this Lucky Ice Pop into your hand instead of the discard pile.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/150.png",
      "large": "https://images.pokemontcg.io/swsh7/150_hires.png"
    }
  },
  {
    "id": "swsh7-151",
    "name": "Moon & Sun Badge",
    "number": "151",
    "artist": "Studio Bora Inc.",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "If the Pokémon V this card is attached to has \"Espeon\" or \"Umbreon\" in its name, whenever your opponent plays a Supporter card from their hand, prevent all effects of that card done to that Pokémon.",
      "You may play any number of Item cards during your turn.",
      "Attach a Pokémon Tool to 1 of your Pokémon that doesn't already have a Pokémon Tool attached."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/151.png",
      "large": "https://images.pokemontcg.io/swsh7/151_hires.png"
    }
  },
  {
    "id": "swsh7-152",
    "name": "Raihan",
    "number": "152",
    "artist": "take",
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
      "You can play this card only if any of your Pokémon were Knocked Out during your opponent's last turn. Attach a basic Energy card from your discard pile to 1 of your Pokémon. If you do, search your deck for a card and put it into your hand. Then, shuffle your deck.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/152.png",
      "large": "https://images.pokemontcg.io/swsh7/152_hires.png"
    }
  },
  {
    "id": "swsh7-153",
    "name": "Rapid Strike Scroll of the Flying Dragon",
    "number": "153",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Rapid Strike",
      "Item",
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "The Rapid Strike Pokémon this card is attached to can use the attack on this card. (You still need the necessary Energy to use this attack.)",
      "You may play any number of Item cards during your turn.",
      "Attach a Pokémon Tool to 1 of your Pokémon that doesn't already have a Pokémon Tool attached."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Meteor",
        "cost": [
          "Fire",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Discard 2 Energy from this Pokémon. This attack does 90 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/153.png",
      "large": "https://images.pokemontcg.io/swsh7/153_hires.png"
    }
  },
  {
    "id": "swsh7-154",
    "name": "Rescue Carrier",
    "number": "154",
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
      "Put up to 2 Pokémon, each with 90 HP or less, from your discard pile into your hand.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/154.png",
      "large": "https://images.pokemontcg.io/swsh7/154_hires.png"
    }
  },
  {
    "id": "swsh7-155",
    "name": "Ribbon Badge",
    "number": "155",
    "artist": "Studio Bora Inc.",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "If the Pokémon V this card is attached to has \"Sylveon\" in its name and is Knocked Out by damage from an attack from your opponent's Pokémon, that player takes 1 fewer Prize card.",
      "You may play any number of Item cards during your turn.",
      "Attach a Pokémon Tool to 1 of your Pokémon that doesn't already have a Pokémon Tool attached."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/155.png",
      "large": "https://images.pokemontcg.io/swsh7/155_hires.png"
    }
  },
  {
    "id": "swsh7-156",
    "name": "Rubber Gloves",
    "number": "156",
    "artist": "Toyste Beach",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "The attacks of the Pokémon this card is attached to do 30 more damage to your opponent's Active Lightning Pokémon (before applying Weakness and Resistance).",
      "You may play any number of Item cards during your turn.",
      "Attach a Pokémon Tool to 1 of your Pokémon that doesn't already have a Pokémon Tool attached."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/156.png",
      "large": "https://images.pokemontcg.io/swsh7/156_hires.png"
    }
  },
  {
    "id": "swsh7-157",
    "name": "Shopping Center",
    "number": "157",
    "artist": "Oswaldo KATO",
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
      "Once during each player's turn, that player may put a Pokémon Tool attached to 1 of their Pokémon into their hand."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/157.png",
      "large": "https://images.pokemontcg.io/swsh7/157_hires.png"
    }
  },
  {
    "id": "swsh7-158",
    "name": "Single Strike Scroll of the Fanged Dragon",
    "number": "158",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Single Strike",
      "Item",
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "The Single Strike Pokémon this card is attached to can use the attack on this card. (You still need the necessary Energy to use this attack.)",
      "You may play any number of Item cards during your turn.",
      "Attach a Pokémon Tool to 1 of your Pokémon that doesn't already have a Pokémon Tool attached."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Superstrong Slash",
        "cost": [
          "Fighting",
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "300",
        "text": "Discard all Energy from this Pokémon."
      }
    ],
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/158.png",
      "large": "https://images.pokemontcg.io/swsh7/158_hires.png"
    }
  },
  {
    "id": "swsh7-159",
    "name": "Snow Leaf Badge",
    "number": "159",
    "artist": "Studio Bora Inc.",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "If the Pokémon V this card is attached to has \"Leafeon\" or \"Glaceon\" in its name, it has no Retreat Cost and no Weakness.",
      "You may play any number of Item cards during your turn.",
      "Attach a Pokémon Tool to 1 of your Pokémon that doesn't already have a Pokémon Tool attached."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/159.png",
      "large": "https://images.pokemontcg.io/swsh7/159_hires.png"
    }
  },
  {
    "id": "swsh7-160",
    "name": "Spirit Mask",
    "number": "160",
    "artist": "AYUMI ODASHIMA",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "If the Pokémon this card is attached to is in the Active Spot and is damaged by an attack from your opponent's Pokémon (even if it is Knocked Out), your opponent discards a card from their hand.",
      "You may play any number of Item cards during your turn.",
      "Attach a Pokémon Tool to 1 of your Pokémon that doesn't already have a Pokémon Tool attached."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/160.png",
      "large": "https://images.pokemontcg.io/swsh7/160_hires.png"
    }
  },
  {
    "id": "swsh7-161",
    "name": "Stormy Mountains",
    "number": "161",
    "artist": "Toyste Beach",
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
      "Once during each player's turn, that player may search their deck for a Basic Lightning Pokémon or Basic Dragon Pokémon and put it onto their Bench. Then, that player shuffles their deck."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/161.png",
      "large": "https://images.pokemontcg.io/swsh7/161_hires.png"
    }
  },
  {
    "id": "swsh7-162",
    "name": "Switching Cups",
    "number": "162",
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
      "Switch a card from your hand with the top card of your deck.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/162.png",
      "large": "https://images.pokemontcg.io/swsh7/162_hires.png"
    }
  },
  {
    "id": "swsh7-163",
    "name": "Toy Catcher",
    "number": "163",
    "artist": "sadaji",
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
      "Switch 1 of your opponent's Benched Pokémon that has 50 HP or less remaining with your opponent's Active Pokémon.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/163.png",
      "large": "https://images.pokemontcg.io/swsh7/163_hires.png"
    }
  },
  {
    "id": "swsh7-164",
    "name": "Zinnia's Resolve",
    "number": "164",
    "artist": "Taira Akitsu",
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
      "You can play this card only if you discard 2 other cards from your hand. Draw a card for each of your opponent's Pokémon in play.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/164.png",
      "large": "https://images.pokemontcg.io/swsh7/164_hires.png"
    }
  },
  {
    "id": "swsh7-165",
    "name": "Treasure Energy",
    "number": "165",
    "artist": null,
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
      "As long as this card is attached to a Pokémon, it provides Colorless Energy. If you took this card as a face-down Prize card during your turn, before you put it into your hand, you may attach this card to 1 of your Pokémon."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/165.png",
      "large": "https://images.pokemontcg.io/swsh7/165_hires.png"
    }
  },
  {
    "id": "swsh7-166",
    "name": "Leafeon V",
    "number": "166",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Greening Cells",
        "text": "Once during your turn, you may search your deck for a Grass Energy card and attach it to 1 of your Pokémon. Then, shuffle your deck. If you use this Ability, your turn ends.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Leaf Blade",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "Flip a coin. If heads, this attack does 60 more damage."
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
      470
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/166.png",
      "large": "https://images.pokemontcg.io/swsh7/166_hires.png"
    }
  },
  {
    "id": "swsh7-167",
    "name": "Leafeon V",
    "number": "167",
    "artist": "You Iribi",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Greening Cells",
        "text": "Once during your turn, you may search your deck for a Grass Energy card and attach it to 1 of your Pokémon. Then, shuffle your deck. If you use this Ability, your turn ends.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Leaf Blade",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "Flip a coin. If heads, this attack does 60 more damage."
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
      470
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/167.png",
      "large": "https://images.pokemontcg.io/swsh7/167_hires.png"
    }
  },
  {
    "id": "swsh7-168",
    "name": "Trevenant V",
    "number": "168",
    "artist": "MUGENUP",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "210",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Absorb Life",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Heal 30 damage from this Pokémon."
      },
      {
        "name": "Shadow Claw",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Discard a random card from your opponent's hand."
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
      709
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/168.png",
      "large": "https://images.pokemontcg.io/swsh7/168_hires.png"
    }
  },
  {
    "id": "swsh7-169",
    "name": "Flareon V",
    "number": "169",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Single Strike"
    ],
    "hp": "210",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Flaming Breath",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Search your deck for a Fire Energy card and attach it to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Scorching Column",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
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
      136
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/169.png",
      "large": "https://images.pokemontcg.io/swsh7/169_hires.png"
    }
  },
  {
    "id": "swsh7-170",
    "name": "Volcarona V",
    "number": "170",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "210",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Surging Flames",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "This attack does 20 more damage for each basic Energy card in your discard pile. Then, shuffle those Energy cards into your deck."
      },
      {
        "name": "Fire Blast",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
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
      637
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/170.png",
      "large": "https://images.pokemontcg.io/swsh7/170_hires.png"
    }
  },
  {
    "id": "swsh7-171",
    "name": "Gyarados V",
    "number": "171",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Get Angry",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20×",
        "text": "This attack does 20 damage for each damage counter on this Pokémon."
      },
      {
        "name": "Heavy Storm",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      130
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/171.png",
      "large": "https://images.pokemontcg.io/swsh7/171_hires.png"
    }
  },
  {
    "id": "swsh7-172",
    "name": "Vaporeon V",
    "number": "172",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Rapid Strike"
    ],
    "hp": "210",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
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
        "name": "Splash Jump",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
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
      134
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/172.png",
      "large": "https://images.pokemontcg.io/swsh7/172_hires.png"
    }
  },
  {
    "id": "swsh7-173",
    "name": "Suicune V",
    "number": "173",
    "artist": "Ayaka Yoshida",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "210",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Fleet-Footed",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may draw a card.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Blizzard Rondo",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 20 more damage for each Benched Pokémon (both yours and your opponent's)."
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
      245
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/173.png",
      "large": "https://images.pokemontcg.io/swsh7/173_hires.png"
    }
  },
  {
    "id": "swsh7-174",
    "name": "Glaceon V",
    "number": "174",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "210",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Frozen Awakening",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a card that evolves from this Pokémon and put it onto this Pokémon to evolve it. Then, shuffle your deck."
      },
      {
        "name": "Heavy Snow",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Discard a Stadium in play."
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
      471
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/174.png",
      "large": "https://images.pokemontcg.io/swsh7/174_hires.png"
    }
  },
  {
    "id": "swsh7-175",
    "name": "Glaceon V",
    "number": "175",
    "artist": "Narumi Sato",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "210",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Frozen Awakening",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a card that evolves from this Pokémon and put it onto this Pokémon to evolve it. Then, shuffle your deck."
      },
      {
        "name": "Heavy Snow",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Discard a Stadium in play."
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
      471
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/175.png",
      "large": "https://images.pokemontcg.io/swsh7/175_hires.png"
    }
  },
  {
    "id": "swsh7-176",
    "name": "Arctovish V",
    "number": "176",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Ancient Freeze",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "If the Defending Pokémon is a Pokémon V or a Pokémon-GX, it can't attack during your opponent's next turn."
      },
      {
        "name": "Giga Impact",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "220",
        "text": "During your next turn, this Pokémon can't attack."
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
      883
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/176.png",
      "large": "https://images.pokemontcg.io/swsh7/176_hires.png"
    }
  },
  {
    "id": "swsh7-177",
    "name": "Jolteon V",
    "number": "177",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "190",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Thunder Spear",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 20 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Pin Missile",
        "cost": [
          "Lightning",
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      135
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/177.png",
      "large": "https://images.pokemontcg.io/swsh7/177_hires.png"
    }
  },
  {
    "id": "swsh7-178",
    "name": "Dracozolt V",
    "number": "178",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Primeval Beak",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, Energy cards can't be attached from your opponent's hand to the Defending Pokémon."
      },
      {
        "name": "Mountain Swing",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
        "text": "Discard the top 3 cards of your deck."
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
      880
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/178.png",
      "large": "https://images.pokemontcg.io/swsh7/178_hires.png"
    }
  },
  {
    "id": "swsh7-179",
    "name": "Espeon V",
    "number": "179",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Zen Shot",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 60 damage to 1 of your opponent's Pokémon V. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Super Psy Bolt",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
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
      196
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/179.png",
      "large": "https://images.pokemontcg.io/swsh7/179_hires.png"
    }
  },
  {
    "id": "swsh7-180",
    "name": "Espeon V",
    "number": "180",
    "artist": "sowsow",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Zen Shot",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 60 damage to 1 of your opponent's Pokémon V. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Super Psy Bolt",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
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
      196
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/180.png",
      "large": "https://images.pokemontcg.io/swsh7/180_hires.png"
    }
  },
  {
    "id": "swsh7-181",
    "name": "Golurk V",
    "number": "181",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Single Strike"
    ],
    "hp": "220",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Mega Punch",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": ""
      },
      {
        "name": "Rewind Beam",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "If your opponent's Active Pokémon is an evolved Pokémon, devolve it by putting the highest Stage Evolution card on it into your opponent's hand."
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
      623
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/181.png",
      "large": "https://images.pokemontcg.io/swsh7/181_hires.png"
    }
  },
  {
    "id": "swsh7-182",
    "name": "Golurk V",
    "number": "182",
    "artist": "Oswaldo KATO",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Single Strike"
    ],
    "hp": "220",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Mega Punch",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": ""
      },
      {
        "name": "Rewind Beam",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "If your opponent's Active Pokémon is an evolved Pokémon, devolve it by putting the highest Stage Evolution card on it into your opponent's hand."
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
      623
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/182.png",
      "large": "https://images.pokemontcg.io/swsh7/182_hires.png"
    }
  },
  {
    "id": "swsh7-183",
    "name": "Sylveon V",
    "number": "183",
    "artist": "aky CG Works",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Rapid Strike"
    ],
    "hp": "200",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dream Gift",
        "text": "Once during your turn, you may search your deck for an Item card, reveal it, and put it into your hand. Then, shuffle your deck. If you use this Ability, your turn ends.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Magical Shot",
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
      700
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/183.png",
      "large": "https://images.pokemontcg.io/swsh7/183_hires.png"
    }
  },
  {
    "id": "swsh7-184",
    "name": "Sylveon V",
    "number": "184",
    "artist": "Yuu Nishida",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Rapid Strike"
    ],
    "hp": "200",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dream Gift",
        "text": "Once during your turn, you may search your deck for an Item card, reveal it, and put it into your hand. Then, shuffle your deck. If you use this Ability, your turn ends.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Magical Shot",
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
      700
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/184.png",
      "large": "https://images.pokemontcg.io/swsh7/184_hires.png"
    }
  },
  {
    "id": "swsh7-185",
    "name": "Medicham V",
    "number": "185",
    "artist": "Satoshi Shirai",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Rapid Strike"
    ],
    "hp": "210",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Yoga Loop",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put 2 damage counters on 1 of your opponent's Pokémon. If your opponent's Pokémon is Knocked Out by this attack, take another turn after this one. (Skip Pokémon Checkup.) If 1 of your Pokémon used Yoga Loop during your last turn, this attack can't be used."
      },
      {
        "name": "Smash Uppercut",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      308
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/185.png",
      "large": "https://images.pokemontcg.io/swsh7/185_hires.png"
    }
  },
  {
    "id": "swsh7-186",
    "name": "Medicham V",
    "number": "186",
    "artist": "KIYOTAKA OSHIYAMA",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Rapid Strike"
    ],
    "hp": "210",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Yoga Loop",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put 2 damage counters on 1 of your opponent's Pokémon. If your opponent's Pokémon is Knocked Out by this attack, take another turn after this one. (Skip Pokémon Checkup.) If 1 of your Pokémon used Yoga Loop during your last turn, this attack can't be used."
      },
      {
        "name": "Smash Uppercut",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      308
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/186.png",
      "large": "https://images.pokemontcg.io/swsh7/186_hires.png"
    }
  },
  {
    "id": "swsh7-187",
    "name": "Lycanroc V",
    "number": "187",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Rock Throw",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Crashing Fangs",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "During your next turn, this Pokémon can't attack."
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
      745
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/187.png",
      "large": "https://images.pokemontcg.io/swsh7/187_hires.png"
    }
  },
  {
    "id": "swsh7-188",
    "name": "Umbreon V",
    "number": "188",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Single Strike"
    ],
    "hp": "200",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Mean Look",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
      },
      {
        "name": "Moonlight Blade",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If this Pokémon has any damage counters on it, this attack does 80 more damage."
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
      197
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/188.png",
      "large": "https://images.pokemontcg.io/swsh7/188_hires.png"
    }
  },
  {
    "id": "swsh7-189",
    "name": "Umbreon V",
    "number": "189",
    "artist": "Teeziro",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Single Strike"
    ],
    "hp": "200",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Mean Look",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
      },
      {
        "name": "Moonlight Blade",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If this Pokémon has any damage counters on it, this attack does 80 more damage."
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
      197
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/189.png",
      "large": "https://images.pokemontcg.io/swsh7/189_hires.png"
    }
  },
  {
    "id": "swsh7-190",
    "name": "Garbodor V",
    "number": "190",
    "artist": "aky CG Works",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "210",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Trash Stench",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Your opponent's Active Pokémon is now Poisoned. During your opponent's next turn, that Pokémon can't retreat."
      },
      {
        "name": "Sludge Bomb",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
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
      569
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/190.png",
      "large": "https://images.pokemontcg.io/swsh7/190_hires.png"
    }
  },
  {
    "id": "swsh7-191",
    "name": "Dragonite V",
    "number": "191",
    "artist": "Saki Hayashiro",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "230",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Shred",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      },
      {
        "name": "Dragon Gale",
        "cost": [
          "Water",
          "Water",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "250",
        "text": "This attack also does 20 damage to each of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      149
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/191.png",
      "large": "https://images.pokemontcg.io/swsh7/191_hires.png"
    }
  },
  {
    "id": "swsh7-192",
    "name": "Dragonite V",
    "number": "192",
    "artist": "Atsushi Furusawa",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "230",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Shred",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      },
      {
        "name": "Dragon Gale",
        "cost": [
          "Water",
          "Water",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "250",
        "text": "This attack also does 20 damage to each of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      149
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/192.png",
      "large": "https://images.pokemontcg.io/swsh7/192_hires.png"
    }
  },
  {
    "id": "swsh7-193",
    "name": "Rayquaza V",
    "number": "193",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Rapid Strike"
    ],
    "hp": "210",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Dragon Pulse",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "Discard the top 2 cards of your deck."
      },
      {
        "name": "Spiral Burst",
        "cost": [
          "Fire",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "You may discard up to 2 basic Fire Energy or up to 2 basic Lightning Energy from this Pokémon. This attack does 80 more damage for each card you discarded in this way."
      }
    ],
    "weaknesses": [],
    "resistances": [],
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
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/193.png",
      "large": "https://images.pokemontcg.io/swsh7/193_hires.png"
    }
  },
  {
    "id": "swsh7-194",
    "name": "Rayquaza V",
    "number": "194",
    "artist": "Ryuta Fuse",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Rapid Strike"
    ],
    "hp": "210",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Dragon Pulse",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "Discard the top 2 cards of your deck."
      },
      {
        "name": "Spiral Burst",
        "cost": [
          "Fire",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "You may discard up to 2 basic Fire Energy or up to 2 basic Lightning Energy from this Pokémon. This attack does 80 more damage for each card you discarded in this way."
      }
    ],
    "weaknesses": [],
    "resistances": [],
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
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/194.png",
      "large": "https://images.pokemontcg.io/swsh7/194_hires.png"
    }
  },
  {
    "id": "swsh7-195",
    "name": "Noivern V",
    "number": "195",
    "artist": "Ayaka Yoshida",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Boomburst",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 20 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Synchro Loud",
        "cost": [
          "Psychic",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "60+",
        "text": "If you have the same number of cards in your hand as your opponent, this attack does 120 more damage."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      715
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/195.png",
      "large": "https://images.pokemontcg.io/swsh7/195_hires.png"
    }
  },
  {
    "id": "swsh7-196",
    "name": "Noivern V",
    "number": "196",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Boomburst",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 20 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Synchro Loud",
        "cost": [
          "Psychic",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "60+",
        "text": "If you have the same number of cards in your hand as your opponent, this attack does 120 more damage."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      715
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/196.png",
      "large": "https://images.pokemontcg.io/swsh7/196_hires.png"
    }
  },
  {
    "id": "swsh7-197",
    "name": "Duraludon V",
    "number": "197",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Single Strike"
    ],
    "hp": "220",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Metal Claw",
        "cost": [
          "Fighting",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": ""
      },
      {
        "name": "Breaking Swipe",
        "cost": [
          "Fighting",
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "140",
        "text": "During your opponent's next turn, the Defending Pokémon's attacks do 30 less damage (before applying Weakness and Resistance)."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      884
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/197.png",
      "large": "https://images.pokemontcg.io/swsh7/197_hires.png"
    }
  },
  {
    "id": "swsh7-198",
    "name": "Duraludon V",
    "number": "198",
    "artist": "Naoki Saito",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Single Strike"
    ],
    "hp": "220",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Metal Claw",
        "cost": [
          "Fighting",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": ""
      },
      {
        "name": "Breaking Swipe",
        "cost": [
          "Fighting",
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "140",
        "text": "During your opponent's next turn, the Defending Pokémon's attacks do 30 less damage (before applying Weakness and Resistance)."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      884
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/198.png",
      "large": "https://images.pokemontcg.io/swsh7/198_hires.png"
    }
  },
  {
    "id": "swsh7-199",
    "name": "Aroma Lady",
    "number": "199",
    "artist": "En Morikura",
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
      "Draw 2 cards. If you do, your Active Pokémon recovers from all Special Conditions.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/199.png",
      "large": "https://images.pokemontcg.io/swsh7/199_hires.png"
    }
  },
  {
    "id": "swsh7-200",
    "name": "Copycat",
    "number": "200",
    "artist": "Sanosuke Sakuma",
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
      "Shuffle your hand into your deck. Then, draw a card for each card in your opponent's hand.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/200.png",
      "large": "https://images.pokemontcg.io/swsh7/200_hires.png"
    }
  },
  {
    "id": "swsh7-201",
    "name": "Gordie",
    "number": "201",
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
      "Look at the top 7 cards of your deck. You may reveal any number of Energy cards you find there and put them into your hand. Shuffle the other cards back into your deck.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/201.png",
      "large": "https://images.pokemontcg.io/swsh7/201_hires.png"
    }
  },
  {
    "id": "swsh7-202",
    "name": "Raihan",
    "number": "202",
    "artist": "kirisAki",
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
      "You can play this card only if any of your Pokémon were Knocked Out during your opponent's last turn. Attach a basic Energy card from your discard pile to 1 of your Pokémon. If you do, search your deck for a card and put it into your hand. Then, shuffle your deck.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/202.png",
      "large": "https://images.pokemontcg.io/swsh7/202_hires.png"
    }
  },
  {
    "id": "swsh7-203",
    "name": "Zinnia's Resolve",
    "number": "203",
    "artist": "Taira Akitsu",
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
      "You can play this card only if you discard 2 other cards from your hand. Draw a card for each of your opponent's Pokémon in play.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/203.png",
      "large": "https://images.pokemontcg.io/swsh7/203_hires.png"
    }
  },
  {
    "id": "swsh7-204",
    "name": "Leafeon VMAX",
    "number": "204",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "310",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Leafeon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Grass Knot",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60×",
        "text": "This attack does 60 damage for each Colorless in your opponent's Active Pokémon's Retreat Cost."
      },
      {
        "name": "Max Leaf",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "170",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      470
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/204.png",
      "large": "https://images.pokemontcg.io/swsh7/204_hires.png"
    }
  },
  {
    "id": "swsh7-205",
    "name": "Leafeon VMAX",
    "number": "205",
    "artist": "HYOGONOSUKE",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "310",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Leafeon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Grass Knot",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60×",
        "text": "This attack does 60 damage for each Colorless in your opponent's Active Pokémon's Retreat Cost."
      },
      {
        "name": "Max Leaf",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "170",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      470
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/205.png",
      "large": "https://images.pokemontcg.io/swsh7/205_hires.png"
    }
  },
  {
    "id": "swsh7-206",
    "name": "Trevenant VMAX",
    "number": "206",
    "artist": "MUGENUP",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "320",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Trevenant V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Missing in the Forest",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40×",
        "text": "This attack does 40 damage for each Supporter card in your opponent's discard pile."
      },
      {
        "name": "Max Tree",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
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
      709
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/206.png",
      "large": "https://images.pokemontcg.io/swsh7/206_hires.png"
    }
  },
  {
    "id": "swsh7-207",
    "name": "Gyarados VMAX",
    "number": "207",
    "artist": "Shin Nagasawa",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "330",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Gyarados V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Hyper Beam",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Discard an Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Max Tyrant",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "240",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      130
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/207.png",
      "large": "https://images.pokemontcg.io/swsh7/207_hires.png"
    }
  },
  {
    "id": "swsh7-208",
    "name": "Glaceon VMAX",
    "number": "208",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "310",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Glaceon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Crystal Veil",
        "text": "Prevent all damage done to this Pokémon by attacks from your opponent's Pokémon VMAX, except any Glaceon VMAX.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Max Icicle",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "This attack also does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      471
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/208.png",
      "large": "https://images.pokemontcg.io/swsh7/208_hires.png"
    }
  },
  {
    "id": "swsh7-209",
    "name": "Glaceon VMAX",
    "number": "209",
    "artist": "kirisAki",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "310",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Glaceon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Crystal Veil",
        "text": "Prevent all damage done to this Pokémon by attacks from your opponent's Pokémon VMAX, except any Glaceon VMAX.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Max Icicle",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "This attack also does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      471
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/209.png",
      "large": "https://images.pokemontcg.io/swsh7/209_hires.png"
    }
  },
  {
    "id": "swsh7-210",
    "name": "Dracozolt VMAX",
    "number": "210",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "330",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Dracozolt V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Spark Trap",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "60",
        "text": "During your opponent's next turn, if this Pokémon is damaged by an attack (even if it is Knocked Out), put 12 damage counters on the Attacking Pokémon."
      },
      {
        "name": "Max Impact",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "200",
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
      880
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/210.png",
      "large": "https://images.pokemontcg.io/swsh7/210_hires.png"
    }
  },
  {
    "id": "swsh7-211",
    "name": "Sylveon VMAX",
    "number": "211",
    "artist": "Ryota Murayama",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Rapid Strike"
    ],
    "hp": "310",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Sylveon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Precious Touch",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach an Energy card from your hand to 1 of your Benched Pokémon. If you do, heal 120 damage from that Pokémon."
      },
      {
        "name": "Max Harmony",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70+",
        "text": "This attack does 30 more damage for each different type of Pokémon on your Bench."
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
      700
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/211.png",
      "large": "https://images.pokemontcg.io/swsh7/211_hires.png"
    }
  },
  {
    "id": "swsh7-212",
    "name": "Sylveon VMAX",
    "number": "212",
    "artist": "Taira Akitsu",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Rapid Strike"
    ],
    "hp": "310",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Sylveon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Precious Touch",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach an Energy card from your hand to 1 of your Benched Pokémon. If you do, heal 120 damage from that Pokémon."
      },
      {
        "name": "Max Harmony",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70+",
        "text": "This attack does 30 more damage for each different type of Pokémon on your Bench."
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
      700
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/212.png",
      "large": "https://images.pokemontcg.io/swsh7/212_hires.png"
    }
  },
  {
    "id": "swsh7-213",
    "name": "Lycanroc VMAX",
    "number": "213",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "320",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Lycanroc V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Hunting Claw",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Knock Out 1 of your opponent's Pokémon in play that has 60 HP or less remaining."
      },
      {
        "name": "Max Edge",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "190",
        "text": "This attack also does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      745
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/213.png",
      "large": "https://images.pokemontcg.io/swsh7/213_hires.png"
    }
  },
  {
    "id": "swsh7-214",
    "name": "Umbreon VMAX",
    "number": "214",
    "artist": "AKIRA EGAWA",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Single Strike"
    ],
    "hp": "310",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Umbreon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dark Signal",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may switch 1 of your opponent's Benched Pokémon with their Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Max Darkness",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
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
      197
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/214.png",
      "large": "https://images.pokemontcg.io/swsh7/214_hires.png"
    }
  },
  {
    "id": "swsh7-215",
    "name": "Umbreon VMAX",
    "number": "215",
    "artist": "KEIICHIRO ITO",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Single Strike"
    ],
    "hp": "310",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Umbreon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dark Signal",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may switch 1 of your opponent's Benched Pokémon with their Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Max Darkness",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
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
      197
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/215.png",
      "large": "https://images.pokemontcg.io/swsh7/215_hires.png"
    }
  },
  {
    "id": "swsh7-216",
    "name": "Garbodor VMAX",
    "number": "216",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "330",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Garbodor V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Rubbish Collecting",
        "text": "This Pokémon may have up to 2 Pokémon Tools attached to it. If it loses this Ability, discard Pokémon Tools from it until only 1 remains.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "G-Max Malodor",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "Your opponent's Active Pokémon is now Poisoned. During your opponent's next turn, that Pokémon can't retreat."
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
      569
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/216.png",
      "large": "https://images.pokemontcg.io/swsh7/216_hires.png"
    }
  },
  {
    "id": "swsh7-217",
    "name": "Rayquaza VMAX",
    "number": "217",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Rapid Strike"
    ],
    "hp": "320",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Rayquaza V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Azure Pulse",
        "text": "Once during your turn, you may discard your hand and draw 3 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Max Burst",
        "cost": [
          "Fire",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "You may discard any amount of basic Fire Energy or any amount of basic Lightning Energy from this Pokémon. This attack does 80 more damage for each card you discarded in this way."
      }
    ],
    "weaknesses": [],
    "resistances": [],
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
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/217.png",
      "large": "https://images.pokemontcg.io/swsh7/217_hires.png"
    }
  },
  {
    "id": "swsh7-218",
    "name": "Rayquaza VMAX",
    "number": "218",
    "artist": "Anesaki Dynamic",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Rapid Strike"
    ],
    "hp": "320",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Rayquaza V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Azure Pulse",
        "text": "Once during your turn, you may discard your hand and draw 3 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Max Burst",
        "cost": [
          "Fire",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "You may discard any amount of basic Fire Energy or any amount of basic Lightning Energy from this Pokémon. This attack does 80 more damage for each card you discarded in this way."
      }
    ],
    "weaknesses": [],
    "resistances": [],
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
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/218.png",
      "large": "https://images.pokemontcg.io/swsh7/218_hires.png"
    }
  },
  {
    "id": "swsh7-219",
    "name": "Duraludon VMAX",
    "number": "219",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Single Strike"
    ],
    "hp": "330",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Duraludon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Skyscraper",
        "text": "Prevent all damage done to this Pokémon by attacks from your opponent's Pokémon that have Special Energy attached.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "G-Max Pulverization",
        "cost": [
          "Fighting",
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "220",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      884
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/219.png",
      "large": "https://images.pokemontcg.io/swsh7/219_hires.png"
    }
  },
  {
    "id": "swsh7-220",
    "name": "Duraludon VMAX",
    "number": "220",
    "artist": "Saki Hayashiro",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Single Strike"
    ],
    "hp": "330",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Duraludon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Skyscraper",
        "text": "Prevent all damage done to this Pokémon by attacks from your opponent's Pokémon that have Special Energy attached.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "G-Max Pulverization",
        "cost": [
          "Fighting",
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "220",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      884
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/220.png",
      "large": "https://images.pokemontcg.io/swsh7/220_hires.png"
    }
  },
  {
    "id": "swsh7-221",
    "name": "Aroma Lady",
    "number": "221",
    "artist": "En Morikura",
    "rarity": "Rare Rainbow",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Draw 2 cards. If you do, your Active Pokémon recovers from all Special Conditions.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/221.png",
      "large": "https://images.pokemontcg.io/swsh7/221_hires.png"
    }
  },
  {
    "id": "swsh7-222",
    "name": "Copycat",
    "number": "222",
    "artist": "Sanosuke Sakuma",
    "rarity": "Rare Rainbow",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Shuffle your hand into your deck. Then, draw a card for each card in your opponent's hand.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/222.png",
      "large": "https://images.pokemontcg.io/swsh7/222_hires.png"
    }
  },
  {
    "id": "swsh7-223",
    "name": "Gordie",
    "number": "223",
    "artist": "Hitoshi Ariga",
    "rarity": "Rare Rainbow",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Look at the top 7 cards of your deck. You may reveal any number of Energy cards you find there and put them into your hand. Shuffle the other cards back into your deck.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/223.png",
      "large": "https://images.pokemontcg.io/swsh7/223_hires.png"
    }
  },
  {
    "id": "swsh7-224",
    "name": "Raihan",
    "number": "224",
    "artist": "kirisAki",
    "rarity": "Rare Rainbow",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can play this card only if any of your Pokémon were Knocked Out during your opponent's last turn. Attach a basic Energy card from your discard pile to 1 of your Pokémon. If you do, search your deck for a card and put it into your hand. Then, shuffle your deck.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/224.png",
      "large": "https://images.pokemontcg.io/swsh7/224_hires.png"
    }
  },
  {
    "id": "swsh7-225",
    "name": "Zinnia's Resolve",
    "number": "225",
    "artist": "Taira Akitsu",
    "rarity": "Rare Rainbow",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can play this card only if you discard 2 other cards from your hand. Draw a card for each of your opponent's Pokémon in play.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/225.png",
      "large": "https://images.pokemontcg.io/swsh7/225_hires.png"
    }
  },
  {
    "id": "swsh7-226",
    "name": "Froslass",
    "number": "226",
    "artist": "Studio Bora Inc.",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Snorunt",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Frost Over",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may attach a Water Energy card from your discard pile to 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Crystal Breath",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90",
        "text": "During your next turn, this Pokémon can't attack."
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
      478
    ],
    "flavorText": "It spits out cold air of nearly -60 degrees Fahrenheit to freeze its quarry. It brings frozen prey back to its lair and neatly lines them up.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/226.png",
      "large": "https://images.pokemontcg.io/swsh7/226_hires.png"
    }
  },
  {
    "id": "swsh7-227",
    "name": "Inteleon",
    "number": "227",
    "artist": "Saki Hayashiro",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Rapid Strike"
    ],
    "hp": "150",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Drizzile",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Quick Shooting",
        "text": "Once during your turn, you may put 2 damage counters on 1 of your opponent's Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Waterfall",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      818
    ],
    "flavorText": "Its nictitating membranes let it pick out foes' weak points so it can precisely blast them with water that shoots from its fingertips at Mach 3.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/227.png",
      "large": "https://images.pokemontcg.io/swsh7/227_hires.png"
    }
  },
  {
    "id": "swsh7-228",
    "name": "Cresselia",
    "number": "228",
    "artist": "Toyste Beach",
    "rarity": "Rare Secret",
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
        "name": "Crescent Glow",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Psychic Energy card and attach it to 1 of your Pokémon. If you go second and it's your first turn, instead search for up to 3 Psychic Energy cards and attach them to 1 of your Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Photon Laser",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If you have at least 5 Energy in play, this attack does 90 more damage."
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
      488
    ],
    "flavorText": "Those who sleep holding Cresselia's feather are assured of joyful dreams. It is said to represent the crescent moon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/228.png",
      "large": "https://images.pokemontcg.io/swsh7/228_hires.png"
    }
  },
  {
    "id": "swsh7-229",
    "name": "Boost Shake",
    "number": "229",
    "artist": "sadaji",
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
      "Search your deck for a card that evolves from 1 of your Pokémon and put it onto that Pokémon to evolve it. Then, shuffle your deck. You can use this card during your first turn or on a Pokémon that was put into play this turn. Your turn ends.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/229.png",
      "large": "https://images.pokemontcg.io/swsh7/229_hires.png"
    }
  },
  {
    "id": "swsh7-230",
    "name": "Crystal Cave",
    "number": "230",
    "artist": "Toyste Beach",
    "rarity": "Rare Secret",
    "supertype": "Trainer",
    "subtypes": [
      "Stadium"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Once during each player's turn, that player may heal 30 damage from each of their Metal Pokémon and Dragon Pokémon."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/230.png",
      "large": "https://images.pokemontcg.io/swsh7/230_hires.png"
    }
  },
  {
    "id": "swsh7-231",
    "name": "Full Face Guard",
    "number": "231",
    "artist": "AYUMI ODASHIMA",
    "rarity": "Rare Secret",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "If the Pokémon this card is attached to has no Abilities, it takes 20 less damage from attacks from your opponent's Pokémon (after applying Weakness and Resistance).",
      "You may play any number of Item cards during your turn.",
      "Attach a Pokémon Tool to 1 of your Pokémon that doesn't already have a Pokémon Tool attached."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/231.png",
      "large": "https://images.pokemontcg.io/swsh7/231_hires.png"
    }
  },
  {
    "id": "swsh7-232",
    "name": "Stormy Mountains",
    "number": "232",
    "artist": "Toyste Beach",
    "rarity": "Rare Secret",
    "supertype": "Trainer",
    "subtypes": [
      "Stadium"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Once during each player's turn, that player may search their deck for a Basic Lightning Pokémon or Basic Dragon Pokémon and put it onto their Bench. Then, that player shuffles their deck."
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/232.png",
      "large": "https://images.pokemontcg.io/swsh7/232_hires.png"
    }
  },
  {
    "id": "swsh7-233",
    "name": "Toy Catcher",
    "number": "233",
    "artist": "sadaji",
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
      "Switch 1 of your opponent's Benched Pokémon that has 50 HP or less remaining with your opponent's Active Pokémon.",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/233.png",
      "large": "https://images.pokemontcg.io/swsh7/233_hires.png"
    }
  },
  {
    "id": "swsh7-234",
    "name": "Turffield Stadium",
    "number": "234",
    "artist": "aky CG Works",
    "rarity": "Rare Secret",
    "supertype": "Trainer",
    "subtypes": [
      "Stadium"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Once during each player's turn, that player may search their deck for an Evolution Grass Pokémon, reveal it, and put it into their hand. Then, that player shuffles their deck."
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
    "regulationMark": "D",
    "images": {
      "small": "https://images.pokemontcg.io/swsh7/234.png",
      "large": "https://images.pokemontcg.io/swsh7/234_hires.png"
    }
  },
  {
    "id": "swsh7-235",
    "name": "Lightning Energy",
    "number": "235",
    "artist": null,
    "rarity": "Rare Secret",
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
      "small": "https://images.pokemontcg.io/swsh7/235.png",
      "large": "https://images.pokemontcg.io/swsh7/235_hires.png"
    }
  },
  {
    "id": "swsh7-236",
    "name": "Darkness Energy",
    "number": "236",
    "artist": null,
    "rarity": "Rare Secret",
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
      "small": "https://images.pokemontcg.io/swsh7/236.png",
      "large": "https://images.pokemontcg.io/swsh7/236_hires.png"
    }
  },
  {
    "id": "swsh7-237",
    "name": "Metal Energy",
    "number": "237",
    "artist": null,
    "rarity": "Rare Secret",
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
      "small": "https://images.pokemontcg.io/swsh7/237.png",
      "large": "https://images.pokemontcg.io/swsh7/237_hires.png"
    }
  }
]

export default cardDetails
