import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "swsh9-1",
    "name": "Exeggcute",
    "number": "1",
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
      "Exeggutor"
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
      102
    ],
    "flavorText": "Though it may look like it's just a bunch of eggs, it's a proper Pokémon. Exeggcute communicates with others of its kind via telepathy, apparently.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/1.png",
      "large": "https://images.pokemontcg.io/swsh9/1_hires.png"
    }
  },
  {
    "id": "swsh9-2",
    "name": "Exeggutor",
    "number": "2",
    "artist": "Naoyo Kimura",
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
        "name": "Mega Drain",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Heal 30 damage from this Pokémon."
      },
      {
        "name": "Seed Bomb",
        "cost": [
          "Grass",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      103
    ],
    "flavorText": "Each of Exeggutor's three heads is thinking different thoughts. The three don't seem to be very interested in one another.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/2.png",
      "large": "https://images.pokemontcg.io/swsh9/2_hires.png"
    }
  },
  {
    "id": "swsh9-3",
    "name": "Shroomish",
    "number": "3",
    "artist": "Shigenori Negishi",
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
      "Breloom"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Headbutt",
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
      285
    ],
    "flavorText": "It spouts poison spores from the top of its head. These spores cause pain all over if inhaled.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/3.png",
      "large": "https://images.pokemontcg.io/swsh9/3_hires.png"
    }
  },
  {
    "id": "swsh9-4",
    "name": "Breloom",
    "number": "4",
    "artist": "Sekio",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Shroomish",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spore Ball",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Powdery Uppercut",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "130",
        "text": "You can use this attack only if this Pokémon used Spore Ball during your last turn."
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
      286
    ],
    "flavorText": "It scatters poisonous spores and throws powerful punches while its foe is hampered by inhaled spores.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/4.png",
      "large": "https://images.pokemontcg.io/swsh9/4_hires.png"
    }
  },
  {
    "id": "swsh9-5",
    "name": "Tropius",
    "number": "5",
    "artist": "Shin Nagasawa",
    "rarity": "Uncommon",
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
    "abilities": [
      {
        "name": "Curative Bower",
        "text": "All of your Pokémon that have Grass Energy attached can't be Confused, and if they are already Confused, they recover from that Special Condition.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Slicing Blade",
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/5.png",
      "large": "https://images.pokemontcg.io/swsh9/5_hires.png"
    }
  },
  {
    "id": "swsh9-6",
    "name": "Turtwig",
    "number": "6",
    "artist": "Narumi Sato",
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
      "Grotle"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bite",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Headbutt Bounce",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      387
    ],
    "flavorText": "It undertakes photosynthesis with its body, making oxygen. The leaf on its head wilts if it is thirsty.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/6.png",
      "large": "https://images.pokemontcg.io/swsh9/6_hires.png"
    }
  },
  {
    "id": "swsh9-7",
    "name": "Grotle",
    "number": "7",
    "artist": "Nisota Niso",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Turtwig",
    "evolvesTo": [
      "Torterra"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Sun-Drenched Shell",
        "text": "Once during your turn, you may search your deck for a Grass Pokémon, reveal it, and put it into your hand. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Razor Leaf",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      388
    ],
    "flavorText": "It knows where pure water wells up. It carries fellow Pokémon there on its back.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/7.png",
      "large": "https://images.pokemontcg.io/swsh9/7_hires.png"
    }
  },
  {
    "id": "swsh9-8",
    "name": "Torterra",
    "number": "8",
    "artist": "Oswaldo KATO",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "190",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Grotle",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Evopress",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50×",
        "text": "This attack does 50 damage for each of your Evolution Pokémon in play."
      },
      {
        "name": "Hammer In",
        "cost": [
          "Grass",
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
      389
    ],
    "flavorText": "Small Pokémon occasionally gather on its unmoving back to begin building their nests.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/8.png",
      "large": "https://images.pokemontcg.io/swsh9/8_hires.png"
    }
  },
  {
    "id": "swsh9-9",
    "name": "Burmy",
    "number": "9",
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
      "Wormadam",
      "Mothim"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hang Down",
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
      412
    ],
    "flavorText": "If its cloak is broken in battle, it quickly remakes the cloak with materials nearby.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/9.png",
      "large": "https://images.pokemontcg.io/swsh9/9_hires.png"
    }
  },
  {
    "id": "swsh9-10",
    "name": "Wormadam",
    "number": "10",
    "artist": "Yuka Morii",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Burmy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Matron's Anger",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 10 more damage for each Pokémon in your discard pile."
      },
      {
        "name": "Leaf Drain",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
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
      413
    ],
    "flavorText": "When Burmy evolved, its cloak became a part of this Pokémon's body. The cloak is never shed.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/10.png",
      "large": "https://images.pokemontcg.io/swsh9/10_hires.png"
    }
  },
  {
    "id": "swsh9-11",
    "name": "Mothim",
    "number": "11",
    "artist": "Akira Komayama",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Burmy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Raid",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If this Pokémon evolved from Burmy during this turn, this attack does 90 more damage."
      },
      {
        "name": "Gust",
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
      414
    ],
    "flavorText": "It flutters around at night and steals honey from the Combee hive.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/11.png",
      "large": "https://images.pokemontcg.io/swsh9/11_hires.png"
    }
  },
  {
    "id": "swsh9-12",
    "name": "Cherubi",
    "number": "12",
    "artist": "Naoyo Kimura",
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
      "Cherrim"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Lively Fruit",
        "text": "Prevent all effects of attacks from your opponent's Pokémon done to this Pokémon. (Damage is not an effect.)",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Leafage",
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
      420
    ],
    "flavorText": "The deeper a Cherubi's red, the more nutrients it has stockpiled in its body. And the sweeter and tastier its small ball!",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/12.png",
      "large": "https://images.pokemontcg.io/swsh9/12_hires.png"
    }
  },
  {
    "id": "swsh9-13",
    "name": "Shaymin V",
    "number": "13",
    "artist": "Satoshi Shirai",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "190",
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
        "name": "Flap",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Revenge Blast",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60+",
        "text": "This attack does 40 more damage for each Prize card your opponent has taken."
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
      492
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/13.png",
      "large": "https://images.pokemontcg.io/swsh9/13_hires.png"
    }
  },
  {
    "id": "swsh9-14",
    "name": "Shaymin VSTAR",
    "number": "14",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo VSTAR",
    "supertype": "Pokémon",
    "subtypes": [
      "VSTAR"
    ],
    "hp": "250",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Shaymin V",
    "evolvesTo": [],
    "rules": [
      "VSTAR rule: When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Star Bloom",
        "text": "During your turn, you may heal 120 damage from each of your Benched Grass Pokémon. (You can't use more than 1 VSTAR Power in a game.)",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Revenge Blast",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "120+",
        "text": "This attack does 40 more damage for each Prize card your opponent has taken."
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
      492
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/14.png",
      "large": "https://images.pokemontcg.io/swsh9/14_hires.png"
    }
  },
  {
    "id": "swsh9-15",
    "name": "Karrablast",
    "number": "15",
    "artist": "sowsow",
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
      "Escavalier"
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
      588
    ],
    "flavorText": "Its strange physiology reacts to electrical energy in interesting ways. The presence of a Shelmet will cause this Pokémon to evolve.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/15.png",
      "large": "https://images.pokemontcg.io/swsh9/15_hires.png"
    }
  },
  {
    "id": "swsh9-16",
    "name": "Zarude V",
    "number": "16",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
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
        "name": "Leap to Leap",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This attack also does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Jungle Rage",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120+",
        "text": "If your opponent's Active Pokémon is a Pokémon V, this attack does 120 more damage."
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
      893
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/16.png",
      "large": "https://images.pokemontcg.io/swsh9/16_hires.png"
    }
  },
  {
    "id": "swsh9-17",
    "name": "Charizard V",
    "number": "17",
    "artist": "N-DESIGN Inc.",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
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
        "name": "Incinerate",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Before doing damage, discard all Pokémon Tools from your opponent's Active Pokémon."
      },
      {
        "name": "Heat Blast",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
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
      6
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/17.png",
      "large": "https://images.pokemontcg.io/swsh9/17_hires.png"
    }
  },
  {
    "id": "swsh9-18",
    "name": "Charizard VSTAR",
    "number": "18",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo VSTAR",
    "supertype": "Pokémon",
    "subtypes": [
      "VSTAR"
    ],
    "hp": "280",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charizard V",
    "evolvesTo": [],
    "rules": [
      "VSTAR rule: When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Explosive Fire",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130+",
        "text": "If this Pokémon has any damage counters on it, this attack does 100 more damage."
      },
      {
        "name": "Star Blaze",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "320",
        "text": "Discard 2 Energy from this Pokémon. (You can't use more than 1 VSTAR Power in a game.)"
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/18.png",
      "large": "https://images.pokemontcg.io/swsh9/18_hires.png"
    }
  },
  {
    "id": "swsh9-19",
    "name": "Magmar",
    "number": "19",
    "artist": "Shinji Kanda",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Magmortar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Low Kick",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Fiery Punch",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
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
      126
    ],
    "flavorText": "Magmar dispatches its prey with fire. But it regrets this habit once it realizes that it has burned its intended prey to a charred crisp.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/19.png",
      "large": "https://images.pokemontcg.io/swsh9/19_hires.png"
    }
  },
  {
    "id": "swsh9-20",
    "name": "Magmortar",
    "number": "20",
    "artist": "AKIRA EGAWA",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Magmar",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mega Punch",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Boltsplosion",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120+",
        "text": "If Electivire is on your Bench, this attack does 120 more damage."
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
      467
    ],
    "flavorText": "When Magmortar inhales deeply, the fire burning in its belly intensifies, rising in temperature to over 3,600 degrees Fahrenheit.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/20.png",
      "large": "https://images.pokemontcg.io/swsh9/20_hires.png"
    }
  },
  {
    "id": "swsh9-21",
    "name": "Moltres",
    "number": "21",
    "artist": "otumami",
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
        "name": "Inferno Wings",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "If this Pokémon has any damage counters on it, this attack does 70 more damage. This attack's damage isn't affected by Weakness."
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
      146
    ],
    "flavorText": "It's one of the legendary bird Pokémon. When Moltres flaps its flaming wings, they glimmer with a dazzling red glow.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/21.png",
      "large": "https://images.pokemontcg.io/swsh9/21_hires.png"
    }
  },
  {
    "id": "swsh9-22",
    "name": "Entei V",
    "number": "22",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "230",
    "types": [
      "Fire"
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
        "name": "Burning Rondo",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 20 more damage for each Benched Pokémon (both yours and your opponent's)."
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
      244
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/22.png",
      "large": "https://images.pokemontcg.io/swsh9/22_hires.png"
    }
  },
  {
    "id": "swsh9-23",
    "name": "Torkoal",
    "number": "23",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
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
        "name": "Firebreathing",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 30 more damage."
      },
      {
        "name": "Guard Press",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
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
    "flavorText": "It burns coal inside its shell for energy. It blows out black soot if it is endangered.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/23.png",
      "large": "https://images.pokemontcg.io/swsh9/23_hires.png"
    }
  },
  {
    "id": "swsh9-24",
    "name": "Chimchar",
    "number": "24",
    "artist": "Shin Nagasawa",
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
      "Monferno"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ember",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      390
    ],
    "flavorText": "The gas made in its belly burns from its rear end. The fire burns weakly when it feels sick.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/24.png",
      "large": "https://images.pokemontcg.io/swsh9/24_hires.png"
    }
  },
  {
    "id": "swsh9-25",
    "name": "Monferno",
    "number": "25",
    "artist": "KEIICHIRO ITO",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Chimchar",
    "evolvesTo": [
      "Infernape"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flare",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Flamethrower",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      391
    ],
    "flavorText": "It uses ceilings and walls to launch aerial attacks. Its fiery tail is but one weapon.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/25.png",
      "large": "https://images.pokemontcg.io/swsh9/25_hires.png"
    }
  },
  {
    "id": "swsh9-26",
    "name": "Infernape",
    "number": "26",
    "artist": "Anesaki Dynamic",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Monferno",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Infernal Vortex",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "80×",
        "text": "Reveal the top 5 cards of your deck. This attack does 80 damage for each Energy card you find there. Then, discard those Energy cards and shuffle the other cards back into your deck."
      },
      {
        "name": "Burning Kick",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "160",
        "text": "Discard all Energy from this Pokémon."
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
      392
    ],
    "flavorText": "It tosses its enemies around with agility. It uses all its limbs to fight in its own unique style.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/26.png",
      "large": "https://images.pokemontcg.io/swsh9/26_hires.png"
    }
  },
  {
    "id": "swsh9-27",
    "name": "Simisear V",
    "number": "27",
    "artist": "5ban Graphics",
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
        "name": "Bursting Power",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "You may attach up to 2 basic Energy cards from your hand to your Pokémon in any way you like."
      },
      {
        "name": "Flare Juggling",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "This attack does 30 more damage for each Energy attached to your opponent's Active Pokémon."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/27.png",
      "large": "https://images.pokemontcg.io/swsh9/27_hires.png"
    }
  },
  {
    "id": "swsh9-28",
    "name": "Kingler V",
    "number": "28",
    "artist": "PLANETA Mochizuki",
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
        "name": "Falling Bubbles",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, search your deck for up to 5 Water Energy cards and attach them to your Pokémon in any way you like. Then, shuffle your deck."
      },
      {
        "name": "Raging Pincer",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "This Pokémon also does 30 damage to itself."
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
      99
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/28.png",
      "large": "https://images.pokemontcg.io/swsh9/28_hires.png"
    }
  },
  {
    "id": "swsh9-29",
    "name": "Kingler VMAX",
    "number": "29",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "330",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Kingler V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Bubbles Galore",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 5 Water Energy cards and attach them to your Pokémon in any way you like. Then, shuffle your deck."
      },
      {
        "name": "G-Max Pincer",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "240",
        "text": "This Pokémon also does 30 damage to itself."
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
      99
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/29.png",
      "large": "https://images.pokemontcg.io/swsh9/29_hires.png"
    }
  },
  {
    "id": "swsh9-30",
    "name": "Staryu",
    "number": "30",
    "artist": "Yuka Morii",
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
      "Starmie"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Spin",
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
    "flavorText": "If you visit a beach at the end of summer, you'll be able to see groups of Staryu lighting up in a steady rhythm.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/30.png",
      "large": "https://images.pokemontcg.io/swsh9/30_hires.png"
    }
  },
  {
    "id": "swsh9-31",
    "name": "Lapras",
    "number": "31",
    "artist": "Teeziro",
    "rarity": "Rare",
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
        "name": "Raging Freeze",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "If any of your Pokémon were Knocked Out by damage from an attack from your opponent's Pokémon during their last turn, your opponent's Active Pokémon is now Paralyzed."
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
      131
    ],
    "flavorText": "A smart and kindhearted Pokémon, it glides across the surface of the sea while its beautiful song echoes around it.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/31.png",
      "large": "https://images.pokemontcg.io/swsh9/31_hires.png"
    }
  },
  {
    "id": "swsh9-32",
    "name": "Corphish",
    "number": "32",
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
      "Crawdaunt"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Water Gun",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Crabhammer",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      341
    ],
    "flavorText": "No matter how dirty the water in the river, it will adapt and thrive. It has a strong will to survive.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/32.png",
      "large": "https://images.pokemontcg.io/swsh9/32_hires.png"
    }
  },
  {
    "id": "swsh9-33",
    "name": "Crawdaunt",
    "number": "33",
    "artist": "Shibuzoh.",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Corphish",
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
        "name": "Crab Impact",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
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
      342
    ],
    "flavorText": "A rough customer that wildly flails its giant claws. It is said to be extremely hard to raise.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/33.png",
      "large": "https://images.pokemontcg.io/swsh9/33_hires.png"
    }
  },
  {
    "id": "swsh9-34",
    "name": "Snorunt",
    "number": "34",
    "artist": "HYOGONOSUKE",
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
      "Glalie",
      "Froslass"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ice Breath",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Icy Snow",
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
      361
    ],
    "flavorText": "It can only survive in cold areas. It bounces happily around, even in environments as cold as -150 degrees Fahrenheit.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/34.png",
      "large": "https://images.pokemontcg.io/swsh9/34_hires.png"
    }
  },
  {
    "id": "swsh9-35",
    "name": "Piplup",
    "number": "35",
    "artist": "Atsushi Furusawa",
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
      "Prinplup"
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
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
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
      393
    ],
    "flavorText": "Because it is very proud, it hates accepting food from people. Its thick down guards it from cold.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/35.png",
      "large": "https://images.pokemontcg.io/swsh9/35_hires.png"
    }
  },
  {
    "id": "swsh9-36",
    "name": "Prinplup",
    "number": "36",
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
    "evolvesFrom": "Piplup",
    "evolvesTo": [
      "Empoleon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Peck",
        "cost": [
          "Water"
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
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      394
    ],
    "flavorText": "It lives a solitary life. Its wings deliver wicked blows that can snap even the thickest of trees.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/36.png",
      "large": "https://images.pokemontcg.io/swsh9/36_hires.png"
    }
  },
  {
    "id": "swsh9-37",
    "name": "Empoleon",
    "number": "37",
    "artist": "Kouki Saitou",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Prinplup",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Emergency Surfacing",
        "text": "Once during your turn, if this Pokémon is in your discard pile and you have no cards in your hand, you may put this Pokémon onto your Bench. If you do, draw 3 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Water Arrow",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 60 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      395
    ],
    "flavorText": "The three horns that extend from its beak attest to its power. The leader has the biggest horns.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/37.png",
      "large": "https://images.pokemontcg.io/swsh9/37_hires.png"
    }
  },
  {
    "id": "swsh9-38",
    "name": "Buizel",
    "number": "38",
    "artist": "Tika Matsuno",
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
        "name": "Agility",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage from and effects of attacks done to this Pokémon."
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
      418
    ],
    "flavorText": "It inflates the flotation sac around its neck and pokes its head out of the water to see what is going on.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/38.png",
      "large": "https://images.pokemontcg.io/swsh9/38_hires.png"
    }
  },
  {
    "id": "swsh9-39",
    "name": "Floatzel",
    "number": "39",
    "artist": "kodama",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Buizel",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Floatify",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put up to 2 Item cards from your discard pile into your hand."
      },
      {
        "name": "Water Gun",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      419
    ],
    "flavorText": "Its flotation sac developed as a result of pursuing aquatic prey. It can double as a rubber raft.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/39.png",
      "large": "https://images.pokemontcg.io/swsh9/39_hires.png"
    }
  },
  {
    "id": "swsh9-40",
    "name": "Lumineon V",
    "number": "40",
    "artist": "takuyoa",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "170",
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
        "name": "Luminous Sign",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may search your deck for a Supporter card, reveal it, and put it into your hand. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Aqua Return",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Shuffle this Pokémon and all attached cards into your deck."
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
      457
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/40.png",
      "large": "https://images.pokemontcg.io/swsh9/40_hires.png"
    }
  },
  {
    "id": "swsh9-41",
    "name": "Manaphy",
    "number": "41",
    "artist": "HYOGONOSUKE",
    "rarity": "Rare",
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
    "abilities": [
      {
        "name": "Wave Veil",
        "text": "Prevent all damage done to your Benched Pokémon by attacks from your opponent's Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rain Splash",
        "cost": [
          "Water"
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
      490
    ],
    "flavorText": "It starts its life with a wondrous power that permits it to bond with any kind of Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/41.png",
      "large": "https://images.pokemontcg.io/swsh9/41_hires.png"
    }
  },
  {
    "id": "swsh9-42",
    "name": "Cubchoo",
    "number": "42",
    "artist": "ryoma uratsuka",
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
      "Beartic"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Chilly",
        "cost": [
          "Water"
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      613
    ],
    "flavorText": "When this Pokémon is in good health, its snot becomes thicker and stickier. It will smear its snot on anyone it doesn't like.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/42.png",
      "large": "https://images.pokemontcg.io/swsh9/42_hires.png"
    }
  },
  {
    "id": "swsh9-43",
    "name": "Beartic",
    "number": "43",
    "artist": "Rianti Hidayat",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Cubchoo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sheer Cold",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "During your opponent's next turn, the Defending Pokémon can't attack."
      },
      {
        "name": "Frost Smash",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
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
      614
    ],
    "flavorText": "It swims through frigid seas, searching for prey. From its frozen breath, it forms icy fangs that are harder than steel.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/43.png",
      "large": "https://images.pokemontcg.io/swsh9/43_hires.png"
    }
  },
  {
    "id": "swsh9-44",
    "name": "Eiscue",
    "number": "44",
    "artist": "nagimiso",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Fusion Strike"
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
        "name": "Block Slider",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 40 damage to 1 of your opponent's Pokémon for each Fusion Strike Energy attached to all of your Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Icicle Missile",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
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
    "flavorText": "The hair on its head connects to the surface of its brain. When this Pokémon has something on its mind, its hair chills the air around it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/44.png",
      "large": "https://images.pokemontcg.io/swsh9/44_hires.png"
    }
  },
  {
    "id": "swsh9-45",
    "name": "Raichu V",
    "number": "45",
    "artist": "MUGENUP",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
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
        "name": "Fast Charge",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If you go first, you can use this attack during your first turn. Search your deck for a Lightning Energy card and attach it to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Dynamic Spark",
        "cost": [
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "60×",
        "text": "You may discard any amount of Lightning Energy from your Pokémon. This attack does 60 damage for each card you discarded in this way."
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
      26
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/45.png",
      "large": "https://images.pokemontcg.io/swsh9/45_hires.png"
    }
  },
  {
    "id": "swsh9-46",
    "name": "Electabuzz",
    "number": "46",
    "artist": "OKACHEKE",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Electivire"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Thunder Wave",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Head Bolt",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      125
    ],
    "flavorText": "Many power plants keep Ground-type Pokémon around as a defense against Electabuzz that come seeking electricity.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/46.png",
      "large": "https://images.pokemontcg.io/swsh9/46_hires.png"
    }
  },
  {
    "id": "swsh9-47",
    "name": "Electivire",
    "number": "47",
    "artist": "AKIRA EGAWA",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Electabuzz",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Explosive Bolt",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "30+",
        "text": "If any of your Benched Magmortar have any damage counters on them, this attack does 90 more damage."
      },
      {
        "name": "High-Voltage Current",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 50 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      466
    ],
    "flavorText": "The amount of electrical energy this Pokémon produces is proportional to the rate of its pulse. The voltage jumps while Electivire is battling.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/47.png",
      "large": "https://images.pokemontcg.io/swsh9/47_hires.png"
    }
  },
  {
    "id": "swsh9-48",
    "name": "Raikou V",
    "number": "48",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
    "types": [
      "Lightning"
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
        "name": "Lightning Rondo",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 20 more damage for each Benched Pokémon (both yours and your opponent's)."
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/48.png",
      "large": "https://images.pokemontcg.io/swsh9/48_hires.png"
    }
  },
  {
    "id": "swsh9-49",
    "name": "Shinx",
    "number": "49",
    "artist": "Mizue",
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
      "Luxio"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gnaw",
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      403
    ],
    "flavorText": "This Pokémon generates electricity by contracting its muscles. Excited trembling is a sign that Shinx is generating a tremendous amount of electricity.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/49.png",
      "large": "https://images.pokemontcg.io/swsh9/49_hires.png"
    }
  },
  {
    "id": "swsh9-50",
    "name": "Luxio",
    "number": "50",
    "artist": "kurumitsu",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      404
    ],
    "flavorText": "By joining its tail with that of another Luxio, this Pokémon can receive some of the other Luxio's electricity and power up its own electric blasts.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/50.png",
      "large": "https://images.pokemontcg.io/swsh9/50_hires.png"
    }
  },
  {
    "id": "swsh9-51",
    "name": "Luxray",
    "number": "51",
    "artist": "Ayaka Yoshida",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Luxio",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Energy Crush",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "This attack does 50 damage for each Energy attached to all of your opponent's Pokémon."
      },
      {
        "name": "Flash Impact",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "110",
        "text": "This attack also does 30 damage to 1 of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      405
    ],
    "flavorText": "Luxray can see through solid objects. It will instantly spot prey trying to hide behind walls, even if the walls are thick.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/51.png",
      "large": "https://images.pokemontcg.io/swsh9/51_hires.png"
    }
  },
  {
    "id": "swsh9-52",
    "name": "Pachirisu",
    "number": "52",
    "artist": "HYOGONOSUKE",
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
        "name": "Windup Thunder",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "This attack does 30 damage for each Pokémon Tool attached to all of your Pokémon."
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
    "flavorText": "A pair may be seen rubbing their cheek pouches together in an effort to share stored electricity.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/52.png",
      "large": "https://images.pokemontcg.io/swsh9/52_hires.png"
    }
  },
  {
    "id": "swsh9-53",
    "name": "Clefairy",
    "number": "53",
    "artist": "Yukiko Baba",
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
      "Clefable"
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
      },
      {
        "name": "Magical Shot",
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
      35
    ],
    "flavorText": "It is said that happiness will come to those who see a gathering of Clefairy dancing under a full moon.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/53.png",
      "large": "https://images.pokemontcg.io/swsh9/53_hires.png"
    }
  },
  {
    "id": "swsh9-54",
    "name": "Clefable",
    "number": "54",
    "artist": "Mizue",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Clefairy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Moonlit Miracle",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip 3 coins. Choose a number of your Pokémon in play up to the number of heads. For each of those Pokémon, search your deck for a card that evolves from that Pokémon and put it onto that Pokémon to evolve it. Then, shuffle your deck."
      },
      {
        "name": "Magical Shot",
        "cost": [
          "Psychic",
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
      36
    ],
    "flavorText": "A timid fairy Pokémon that is rarely seen, it will run and hide the moment it senses people.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/54.png",
      "large": "https://images.pokemontcg.io/swsh9/54_hires.png"
    }
  },
  {
    "id": "swsh9-55",
    "name": "Starmie",
    "number": "55",
    "artist": "Akira Komayama",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Staryu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psychic",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "This attack does 30 more damage for each Energy attached to your opponent's Active Pokémon."
      },
      {
        "name": "Power Gem",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      121
    ],
    "flavorText": "This Pokémon has an organ known as its core. The organ glows in seven colors when Starmie is unleashing its potent psychic powers.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/55.png",
      "large": "https://images.pokemontcg.io/swsh9/55_hires.png"
    }
  },
  {
    "id": "swsh9-56",
    "name": "Mewtwo",
    "number": "56",
    "artist": "Anesaki Dynamic",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Life Sucker",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Heal 20 damage from this Pokémon."
      },
      {
        "name": "Psyburn",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
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
      150
    ],
    "flavorText": "A Pokémon created by recombining Mew's genes. It's said to have the most savage heart among Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/56.png",
      "large": "https://images.pokemontcg.io/swsh9/56_hires.png"
    }
  },
  {
    "id": "swsh9-57",
    "name": "Granbull V",
    "number": "57",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "210",
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
        "name": "Chomp",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 10 more damage for each damage counter on this Pokémon."
      },
      {
        "name": "Bull Dash",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "190",
        "text": "This Pokémon also does 30 damage to itself."
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
      210
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/57.png",
      "large": "https://images.pokemontcg.io/swsh9/57_hires.png"
    }
  },
  {
    "id": "swsh9-58",
    "name": "Baltoy",
    "number": "58",
    "artist": "Kyoko Umemoto",
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
      "Claydol"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Triple Spin",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Flip 3 coins. This attack does 20 damage for each heads."
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
      343
    ],
    "flavorText": "It moves while spinning around on its single foot. Some Baltoy have been seen spinning on their heads.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/58.png",
      "large": "https://images.pokemontcg.io/swsh9/58_hires.png"
    }
  },
  {
    "id": "swsh9-59",
    "name": "Claydol",
    "number": "59",
    "artist": "Kazuma Koda",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Baltoy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spinning Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Coinciding Figures",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "If you and your opponent have the same number of Benched Pokémon, this attack does 90 more damage."
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
      344
    ],
    "flavorText": "This mysterious Pokémon started life as an ancient clay figurine made over 20,000 years ago.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/59.png",
      "large": "https://images.pokemontcg.io/swsh9/59_hires.png"
    }
  },
  {
    "id": "swsh9-60",
    "name": "Duskull",
    "number": "60",
    "artist": "SATOSHI NAKAI",
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
      "Dusclops"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Perplex",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Confused."
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
    "flavorText": "If it finds bad children who won't listen to their parents, it will spirit them away—or so it's said.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/60.png",
      "large": "https://images.pokemontcg.io/swsh9/60_hires.png"
    }
  },
  {
    "id": "swsh9-61",
    "name": "Dusclops",
    "number": "61",
    "artist": "miki kudo",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
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
        "name": "Fade to Black",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Confused."
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
      356
    ],
    "flavorText": "Its body is entirely hollow. When it opens its mouth, it sucks everything in as if it were a black hole.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/61.png",
      "large": "https://images.pokemontcg.io/swsh9/61_hires.png"
    }
  },
  {
    "id": "swsh9-62",
    "name": "Dusknoir",
    "number": "62",
    "artist": "otumami",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Dusclops",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Special Transfer",
        "text": "As often as you like during your turn, you may move a Special Energy from 1 of your Pokémon to another of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Devour Soul",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      477
    ],
    "flavorText": "At the bidding of transmissions from the spirit world, it steals people and Pokémon away. No one knows whether it has a will of its own.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/62.png",
      "large": "https://images.pokemontcg.io/swsh9/62_hires.png"
    }
  },
  {
    "id": "swsh9-63",
    "name": "Chimecho",
    "number": "63",
    "artist": "MAHOU",
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
        "name": "Clear Tone",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Special Energy cards, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Hang Down",
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
      358
    ],
    "flavorText": "Emitting ultrasonic cries, it floats on winds to travel great distances.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/63.png",
      "large": "https://images.pokemontcg.io/swsh9/63_hires.png"
    }
  },
  {
    "id": "swsh9-64",
    "name": "Whimsicott V",
    "number": "64",
    "artist": "Saki Hayashiro",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "190",
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
        "name": "Fluff Gets in the Way",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "If the Defending Pokémon is a Basic Pokémon, it can't attack during your opponent's next turn."
      },
      {
        "name": "Cotton Guard",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      547
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/64.png",
      "large": "https://images.pokemontcg.io/swsh9/64_hires.png"
    }
  },
  {
    "id": "swsh9-65",
    "name": "Whimsicott VSTAR",
    "number": "65",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo VSTAR",
    "supertype": "Pokémon",
    "subtypes": [
      "VSTAR"
    ],
    "hp": "250",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Whimsicott V",
    "evolvesTo": [],
    "rules": [
      "VSTAR rule: When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Trick Wind",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "During your opponent's next turn, they can't play any Pokémon Tool or Special Energy cards from their hand."
      },
      {
        "name": "Fluffball Star",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 60 damage to 1 of your opponent's Pokémon for each Energy attached to this Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) (You can't use more than 1 VSTAR Power in a game.)"
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
      547
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/65.png",
      "large": "https://images.pokemontcg.io/swsh9/65_hires.png"
    }
  },
  {
    "id": "swsh9-66",
    "name": "Sigilyph",
    "number": "66",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Uncommon",
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
        "name": "Tri Recharge",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip 3 coins. Attach a number of basic Energy cards up to the number of heads from your discard pile to your Benched Pokémon in any way you like."
      },
      {
        "name": "Psychic",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "This attack does 30 more damage for each Energy attached to your opponent's Active Pokémon."
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
      561
    ],
    "flavorText": "Psychic power allows these Pokémon to fly. Some say they were the guardians of an ancient city. Others say they were the guardians' emissaries.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/66.png",
      "large": "https://images.pokemontcg.io/swsh9/66_hires.png"
    }
  },
  {
    "id": "swsh9-67",
    "name": "Dedenne",
    "number": "67",
    "artist": "Nagomi Nijo",
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
        "name": "Dede-Flash",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "If your opponent has exactly 1 Prize card remaining, this attack does 60 more damage, and your opponent's Active Pokémon is now Confused."
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
      702
    ],
    "flavorText": "Since Dedenne can't generate as much electricity on its own, it steals electricity from outlets or other electric Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/67.png",
      "large": "https://images.pokemontcg.io/swsh9/67_hires.png"
    }
  },
  {
    "id": "swsh9-68",
    "name": "Mimikyu V",
    "number": "68",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "160",
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
        "name": "Dummy Doll",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may prevent all damage done to this Mimikyu V by attacks from your opponent's Pokémon until the end of your opponent's next turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Jealous Eyes",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put 3 damage counters on your opponent's Active Pokémon for each Prize card your opponent has taken."
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
      778
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/68.png",
      "large": "https://images.pokemontcg.io/swsh9/68_hires.png"
    }
  },
  {
    "id": "swsh9-69",
    "name": "Mimikyu VMAX",
    "number": "69",
    "artist": "Studio Bora Inc.",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "300",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Mimikyu V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Ominous Numbers",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put 4 damage counters on your opponent's Pokémon in any way you like. If you played Acerola's Premonition from your hand during this turn, place 13 damage counters instead."
      },
      {
        "name": "Max Shadow",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "Discard a random card from your opponent's hand."
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
      778
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/69.png",
      "large": "https://images.pokemontcg.io/swsh9/69_hires.png"
    }
  },
  {
    "id": "swsh9-70",
    "name": "Milcery",
    "number": "70",
    "artist": "Misa Tsutsui",
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
      "Alcremie"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Lead",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Supporter card, reveal it, and put it into your hand. Then, shuffle your deck."
      },
      {
        "name": "Ram",
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
      868
    ],
    "flavorText": "They say that any patisserie visited by Milcery is guaranteed success and good fortune.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/70.png",
      "large": "https://images.pokemontcg.io/swsh9/70_hires.png"
    }
  },
  {
    "id": "swsh9-71",
    "name": "Alcremie",
    "number": "71",
    "artist": "sowsow",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Milcery",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Additional Order",
        "text": "As long as this Pokémon is in the Active Spot, your turn does not end when you use Café Master.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rainbow Flavor",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "This attack does 40 more damage for each type of basic Energy attached to all of your Pokémon."
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
      869
    ],
    "flavorText": "When Alcremie is content, the cream it secretes from its hands becomes sweeter and richer.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/71.png",
      "large": "https://images.pokemontcg.io/swsh9/71_hires.png"
    }
  },
  {
    "id": "swsh9-72",
    "name": "Hitmontop",
    "number": "72",
    "artist": "ryoma uratsuka",
    "rarity": "Uncommon",
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
        "name": "Spinning Draw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Draw a card."
      },
      {
        "name": "Cyclone Kick",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
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
    "flavorText": "It launches kicks while spinning. If it spins at high speed, it may bore its way into the ground.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/72.png",
      "large": "https://images.pokemontcg.io/swsh9/72_hires.png"
    }
  },
  {
    "id": "swsh9-73",
    "name": "Nosepass",
    "number": "73",
    "artist": "miki kudo",
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
      "Probopass"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      299
    ],
    "flavorText": "It hunts without twitching a muscle by pulling in its prey with powerful magnetism. But sometimes it pulls natural enemies in close.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/73.png",
      "large": "https://images.pokemontcg.io/swsh9/73_hires.png"
    }
  },
  {
    "id": "swsh9-74",
    "name": "Trapinch",
    "number": "74",
    "artist": "zig",
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
      "Vibrava"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rising Lunge",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 more damage."
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
      328
    ],
    "flavorText": "Its nest is a sloped, bowl-like pit in the desert. Once something has fallen in, there is no escape.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/74.png",
      "large": "https://images.pokemontcg.io/swsh9/74_hires.png"
    }
  },
  {
    "id": "swsh9-75",
    "name": "Vibrava",
    "number": "75",
    "artist": "Tomokazu Komiya",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Trapinch",
    "evolvesTo": [
      "Flygon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Razor Wing",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
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
      329
    ],
    "flavorText": "The ultrasonic waves it generates by rubbing its two wings together cause severe headaches.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/75.png",
      "large": "https://images.pokemontcg.io/swsh9/75_hires.png"
    }
  },
  {
    "id": "swsh9-76",
    "name": "Flygon",
    "number": "76",
    "artist": "Shin Nagasawa",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Vibrava",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Desert Pillar",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "This attack does 50 damage for each Colorless in your opponent's Active Pokémon's Retreat Cost."
      },
      {
        "name": "Blasting Wind",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "110",
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
      330
    ],
    "flavorText": "This Pokémon hides in the heart of sandstorms it creates and seldom appears where people can see it.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/76.png",
      "large": "https://images.pokemontcg.io/swsh9/76_hires.png"
    }
  },
  {
    "id": "swsh9-77",
    "name": "Wormadam",
    "number": "77",
    "artist": "Lee HyunJung",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Burmy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Matron's Anger",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 10 more damage for each Pokémon in your discard pile."
      },
      {
        "name": "Bind Down",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
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
      413
    ],
    "flavorText": "When Burmy evolved, its cloak became a part of this Pokémon's body. The cloak is never shed.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/77.png",
      "large": "https://images.pokemontcg.io/swsh9/77_hires.png"
    }
  },
  {
    "id": "swsh9-78",
    "name": "Riolu",
    "number": "78",
    "artist": "Teeziro",
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
      "Lucario"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Low Kick",
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
    "flavorText": "It's exceedingly energetic, with enough stamina to keep running all through the night. Taking it for walks can be a challenging experience.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/78.png",
      "large": "https://images.pokemontcg.io/swsh9/78_hires.png"
    }
  },
  {
    "id": "swsh9-79",
    "name": "Lucario",
    "number": "79",
    "artist": "GIDORA",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Riolu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Roaring Resolve",
        "text": "Once during your turn, you may put 2 damage counters on this Pokémon. If you do, search your deck for a Fighting Energy card and attach it to this Pokémon. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Aura Sphere Volley",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Discard all Fighting Energy from this Pokémon. This attack does 60 more damage for each card you discarded in this way."
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
    "flavorText": "It controls waves known as auras, which are powerful enough to pulverize huge rocks. It uses these waves to take down its prey.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/79.png",
      "large": "https://images.pokemontcg.io/swsh9/79_hires.png"
    }
  },
  {
    "id": "swsh9-80",
    "name": "Throh",
    "number": "80",
    "artist": "Teeziro",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Lunge Out",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Seismic Toss",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      538
    ],
    "flavorText": "It performs throwing moves with first-rate skill. Over the course of many battles, Throh's belt grows darker as it absorbs its wearer's sweat.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/80.png",
      "large": "https://images.pokemontcg.io/swsh9/80_hires.png"
    }
  },
  {
    "id": "swsh9-81",
    "name": "Sawk",
    "number": "81",
    "artist": "Shinji Kanda",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sweep the Leg",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If heads, discard an Energy from your opponent's Active Pokémon."
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
    "flavorText": "If you see a Sawk training in the mountains in its single-minded pursuit of strength, it's best to quietly pass by.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/81.png",
      "large": "https://images.pokemontcg.io/swsh9/81_hires.png"
    }
  },
  {
    "id": "swsh9-82",
    "name": "Golett",
    "number": "82",
    "artist": "Eske Yoshinob",
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
      "Golurk"
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
      622
    ],
    "flavorText": "They were sculpted from clay in ancient times. No one knows why, but some of them are driven to continually line up boulders.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/82.png",
      "large": "https://images.pokemontcg.io/swsh9/82_hires.png"
    }
  },
  {
    "id": "swsh9-83",
    "name": "Golurk",
    "number": "83",
    "artist": "Aya Kusube",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "150",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Golett",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Big Hand",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 10 more damage for each card in your hand."
      },
      {
        "name": "Mega Punch",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      623
    ],
    "flavorText": "Artillery platforms built into the walls of ancient castles served as perches from which Golurk could fire energy beams.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/83.png",
      "large": "https://images.pokemontcg.io/swsh9/83_hires.png"
    }
  },
  {
    "id": "swsh9-84",
    "name": "Grimer",
    "number": "84",
    "artist": "Masakazu Fukuda",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Muk"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Gas",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      88
    ],
    "flavorText": "The wastewater coming from factories is clean these days, so Grimer have nothing to eat. They're said to be on the verge of extinction.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/84.png",
      "large": "https://images.pokemontcg.io/swsh9/84_hires.png"
    }
  },
  {
    "id": "swsh9-85",
    "name": "Muk",
    "number": "85",
    "artist": "Scav",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Grimer",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Sludge Street",
        "text": "The Retreat Cost of your opponent's Poisoned Pokémon is Colorless more.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Shrieking Poison",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Your opponent's Active Pokémon is now Confused and Poisoned."
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
      89
    ],
    "flavorText": "Because they scatter germs everywhere, they've long been targeted for extermination, leading to a steep decline in their population.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/85.png",
      "large": "https://images.pokemontcg.io/swsh9/85_hires.png"
    }
  },
  {
    "id": "swsh9-86",
    "name": "Sneasel",
    "number": "86",
    "artist": "yuu",
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
      "Weavile"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scratch",
        "cost": [
          "Darkness"
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
      215
    ],
    "flavorText": "Its paws conceal sharp claws. If attacked, it suddenly extends the claws and startles its enemy.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/86.png",
      "large": "https://images.pokemontcg.io/swsh9/86_hires.png"
    }
  },
  {
    "id": "swsh9-87",
    "name": "Weavile",
    "number": "87",
    "artist": "Hasuno",
    "rarity": "Uncommon",
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
        "name": "Ransack",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip 2 coins. If either of them is heads, your opponent reveals their hand. For each heads, choose a card you find there and put it on the bottom of your opponent's deck in any order."
      },
      {
        "name": "Slash",
        "cost": [
          "Darkness",
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
      461
    ],
    "flavorText": "They attack their quarry in packs. Prey as large as Mamoswine easily fall to the teamwork of a group of Weavile.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/87.png",
      "large": "https://images.pokemontcg.io/swsh9/87_hires.png"
    }
  },
  {
    "id": "swsh9-88",
    "name": "Honchkrow V",
    "number": "88",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
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
    "abilities": [
      {
        "name": "Boss Pockets",
        "text": "This Pokémon may have up to 4 Pokémon Tools attached to it. If it loses this Ability, discard Pokémon Tools from it until only 1 remains.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Fearsome Shadow",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "Your opponent reveals their hand."
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
      430
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/88.png",
      "large": "https://images.pokemontcg.io/swsh9/88_hires.png"
    }
  },
  {
    "id": "swsh9-89",
    "name": "Spiritomb",
    "number": "89",
    "artist": "Uta",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ticking Terror",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Until the end of your next turn, the Defending Pokémon's Weakness is now Darkness. (The amount of Weakness doesn't change.)"
      },
      {
        "name": "Cursed Drop",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put 2 damage counters on your opponent's Pokémon in any way you like."
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
    "flavorText": "Exactly 108 spirits gathered to become this Pokémon. Apparently there are some ill-natured spirits in the mix.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/89.png",
      "large": "https://images.pokemontcg.io/swsh9/89_hires.png"
    }
  },
  {
    "id": "swsh9-90",
    "name": "Purrloin",
    "number": "90",
    "artist": "Narumi Sato",
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
        "name": "Surprise Attack",
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
      509
    ],
    "flavorText": "It steals things from people just to amuse itself with their frustration. A rivalry exists between this Pokémon and Nickit.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/90.png",
      "large": "https://images.pokemontcg.io/swsh9/90_hires.png"
    }
  },
  {
    "id": "swsh9-91",
    "name": "Liepard",
    "number": "91",
    "artist": "AKIRA EGAWA",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Purrloin",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Trade",
        "text": "You must discard a card from your hand in order to use this Ability. Once during your turn, you may draw 2 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Slash",
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
      510
    ],
    "flavorText": "Don't be fooled by its gorgeous fur and elegant figure. This is a moody and vicious Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/91.png",
      "large": "https://images.pokemontcg.io/swsh9/91_hires.png"
    }
  },
  {
    "id": "swsh9-92",
    "name": "Impidimp",
    "number": "92",
    "artist": "Rianti Hidayat",
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
      "Morgrem"
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
      859
    ],
    "flavorText": "Through its nose, it sucks in the emanations produced by people and Pokémon when they feel annoyed. It thrives off this negative energy.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/92.png",
      "large": "https://images.pokemontcg.io/swsh9/92_hires.png"
    }
  },
  {
    "id": "swsh9-93",
    "name": "Morgrem",
    "number": "93",
    "artist": "Shiburingaru",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Impidimp",
    "evolvesTo": [
      "Grimmsnarl"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Smash Kick",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Pierce",
        "cost": [
          "Darkness",
          "Colorless"
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
      860
    ],
    "flavorText": "When it gets down on all fours as if to beg for forgiveness, it's trying to lure opponents in so that it can stab them with its spear-like hair.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/93.png",
      "large": "https://images.pokemontcg.io/swsh9/93_hires.png"
    }
  },
  {
    "id": "swsh9-94",
    "name": "Grimmsnarl",
    "number": "94",
    "artist": "DOM",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Morgrem",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Longhair Shot",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 30 damage to 1 of your opponent's Pokémon for each Darkness Energy attached to this Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Darkness Fang",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "110",
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
      861
    ],
    "flavorText": "With the hair wrapped around its body helping to enhance its muscles, this Pokémon can overwhelm even Machamp.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/94.png",
      "large": "https://images.pokemontcg.io/swsh9/94_hires.png"
    }
  },
  {
    "id": "swsh9-95",
    "name": "Morpeko V",
    "number": "95",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "190",
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
        "name": "Gnaw and Run",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "You may switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Hangry Spike",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120+",
        "text": "If you played Marnie's Pride from your hand during this turn, this attack does 120 more damage."
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
      877
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/95.png",
      "large": "https://images.pokemontcg.io/swsh9/95_hires.png"
    }
  },
  {
    "id": "swsh9-96",
    "name": "Aggron V",
    "number": "96",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "230",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Rock Slide",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "This attack also does 30 damage to 2 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Merciless Strike",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "150+",
        "text": "If your opponent's Active Pokémon already has any damage counters on it, this attack does 150 more damage."
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
      306
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/96.png",
      "large": "https://images.pokemontcg.io/swsh9/96_hires.png"
    }
  },
  {
    "id": "swsh9-97",
    "name": "Aggron VMAX",
    "number": "97",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "330",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Aggron V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Cracking Stomp",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Discard the top card of your opponent's deck."
      },
      {
        "name": "Max Take Down",
        "cost": [
          "Metal",
          "Metal",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "270",
        "text": "This Pokémon also does 30 damage to itself."
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
      306
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/97.png",
      "large": "https://images.pokemontcg.io/swsh9/97_hires.png"
    }
  },
  {
    "id": "swsh9-98",
    "name": "Wormadam",
    "number": "98",
    "artist": "Ryo Ueda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Burmy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Matron's Anger",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 10 more damage for each Pokémon in your discard pile."
      },
      {
        "name": "Scrap Drop",
        "cost": [
          "Metal",
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
      413
    ],
    "flavorText": "When Burmy evolved, its cloak became a part of this Pokémon's body. The cloak is never shed.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/98.png",
      "large": "https://images.pokemontcg.io/swsh9/98_hires.png"
    }
  },
  {
    "id": "swsh9-99",
    "name": "Probopass",
    "number": "99",
    "artist": "Pani Kobayashi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Nosepass",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Magnetic Tension",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Switch 1 of your opponent's Benched Pokémon with their Active Pokémon. This attack does 40 damage to the new Active Pokémon."
      },
      {
        "name": "Iron Tackle",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This Pokémon also does 20 damage to itself."
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
      476
    ],
    "flavorText": "It uses three small units to catch prey and battle enemies. The main body mostly just gives orders.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/99.png",
      "large": "https://images.pokemontcg.io/swsh9/99_hires.png"
    }
  },
  {
    "id": "swsh9-100",
    "name": "Heatran",
    "number": "100",
    "artist": "Yuya Oka",
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
        "name": "Guard Claw",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Iron Hammer",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If this Pokémon has any Fire Energy attached, this attack does 80 more damage."
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
      485
    ],
    "flavorText": "Boiling blood, like magma, circulates through its body. It makes its dwelling place in volcanic caves.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/100.png",
      "large": "https://images.pokemontcg.io/swsh9/100_hires.png"
    }
  },
  {
    "id": "swsh9-101",
    "name": "Escavalier",
    "number": "101",
    "artist": "Nurikabe",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Karrablast",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Miraculous Armor",
        "text": "This Pokémon takes 100 less damage from attacks from your opponent's Pokémon V (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Pike",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "This attack also does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      589
    ],
    "flavorText": "They use shells they've stolen from Shelmet to arm and protect themselves. They're very popular Pokémon in the Galar region.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/101.png",
      "large": "https://images.pokemontcg.io/swsh9/101_hires.png"
    }
  },
  {
    "id": "swsh9-102",
    "name": "Klink",
    "number": "102",
    "artist": "OKACHEKE",
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
      "Klang"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Vise Grip",
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
        "type": "Grass",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      599
    ],
    "flavorText": "The two minigears that compose this Pokémon are closer than twins. They mesh well only with each other.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/102.png",
      "large": "https://images.pokemontcg.io/swsh9/102_hires.png"
    }
  },
  {
    "id": "swsh9-103",
    "name": "Klang",
    "number": "103",
    "artist": "Hataya",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
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
        "name": "Beam",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Guard Press",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
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
      600
    ],
    "flavorText": "When Klang goes all out, the minigear links up perfectly with the outer part of the big gear, and this Pokémon's rotation speed increases sharply.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/103.png",
      "large": "https://images.pokemontcg.io/swsh9/103_hires.png"
    }
  },
  {
    "id": "swsh9-104",
    "name": "Klinklang",
    "number": "104",
    "artist": "Megumi Higuchi",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Klang",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Gear Wall",
        "text": "Your Basic Pokémon take 20 less damage from attacks from your opponent's Pokémon (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Tumbling Attack",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "Flip a coin. If heads, this attack does 90 more damage."
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      601
    ],
    "flavorText": "From its spikes, it launches powerful blasts of electricity. Its red core contains an enormous amount of energy.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/104.png",
      "large": "https://images.pokemontcg.io/swsh9/104_hires.png"
    }
  },
  {
    "id": "swsh9-105",
    "name": "Zamazenta V",
    "number": "105",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Regal Stance",
        "text": "Once during your turn, you may discard your hand and draw 5 cards. If you use this Ability, your turn ends.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Revenge Blast",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120+",
        "text": "This attack does 30 more damage for each Prize card your opponent has taken."
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
      889
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/105.png",
      "large": "https://images.pokemontcg.io/swsh9/105_hires.png"
    }
  },
  {
    "id": "swsh9-106",
    "name": "Flygon V",
    "number": "106",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
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
        "name": "Sand Spray",
        "cost": [
          "Grass",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": ""
      },
      {
        "name": "Draconic Impulse",
        "cost": [
          "Grass",
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "160+",
        "text": "If your opponent's Active Pokémon is a Pokémon VMAX, this attack does 160 more damage, and discard 3 Energy from this Pokémon."
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
      330
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/106.png",
      "large": "https://images.pokemontcg.io/swsh9/106_hires.png"
    }
  },
  {
    "id": "swsh9-107",
    "name": "Gible",
    "number": "107",
    "artist": "sowsow",
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
      "Gabite"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gnaw",
        "cost": [
          "Water",
          "Fighting"
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
      443
    ],
    "flavorText": "Gible prefers to stay in narrow holes in the sides of caves heated by geothermal energy. This way, Gible can stay warm even during a blizzard.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/107.png",
      "large": "https://images.pokemontcg.io/swsh9/107_hires.png"
    }
  },
  {
    "id": "swsh9-108",
    "name": "Gabite",
    "number": "108",
    "artist": "hatachu",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Gible",
    "evolvesTo": [
      "Garchomp"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dragon Claw",
        "cost": [
          "Water",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
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
      444
    ],
    "flavorText": "This Pokémon emits ultrasonic waves from a protrusion on either side of its head to probe pitch-dark caves.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/108.png",
      "large": "https://images.pokemontcg.io/swsh9/108_hires.png"
    }
  },
  {
    "id": "swsh9-109",
    "name": "Garchomp",
    "number": "109",
    "artist": "Nurikabe",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Gabite",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Sonic Slip",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may prevent all damage from and effects of attacks from your opponent's Pokémon done to this Pokémon until the end of your opponent's next turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dragonblade",
        "cost": [
          "Water",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "160",
        "text": "Discard the top 2 cards of your deck."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      445
    ],
    "flavorText": "Garchomp makes its home in volcanic mountains. It flies through the sky as fast as a jet airplane, hunting down as much prey as it can.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/109.png",
      "large": "https://images.pokemontcg.io/swsh9/109_hires.png"
    }
  },
  {
    "id": "swsh9-110",
    "name": "Axew",
    "number": "110",
    "artist": "Saya Tsuruta",
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
      "Fraxure"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ultra Evolution",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, search your deck for a Haxorus and put it onto this Axew to evolve it. Then, shuffle your deck."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      610
    ],
    "flavorText": "These Pokémon nest in the ground and use their tusks to crush hard berries. Crushing berries is also how they test each other's strength.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/110.png",
      "large": "https://images.pokemontcg.io/swsh9/110_hires.png"
    }
  },
  {
    "id": "swsh9-111",
    "name": "Fraxure",
    "number": "111",
    "artist": "Hataya",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Axew",
    "evolvesTo": [
      "Haxorus"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sharp Fang",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Dragon Claw",
        "cost": [
          "Fighting",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
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
      611
    ],
    "flavorText": "After battle, this Pokémon carefully sharpens its tusks on river rocks. It needs to take care of its tusks—if one breaks, it will never grow back.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/111.png",
      "large": "https://images.pokemontcg.io/swsh9/111_hires.png"
    }
  },
  {
    "id": "swsh9-112",
    "name": "Haxorus",
    "number": "112",
    "artist": "Uta",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Fraxure",
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
        "damage": "60",
        "text": ""
      },
      {
        "name": "Wild Axe",
        "cost": [
          "Fighting",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "160",
        "text": "This Pokémon also does 30 damage to itself."
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
      612
    ],
    "flavorText": "Its resilient tusks are its pride and joy. It licks up dirt to take in the minerals it needs to keep its tusks in top condition.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/112.png",
      "large": "https://images.pokemontcg.io/swsh9/112_hires.png"
    }
  },
  {
    "id": "swsh9-113",
    "name": "Druddigon",
    "number": "113",
    "artist": "Ryo Ueda",
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
        "name": "Revenge",
        "cost": [
          "Fire",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "40+",
        "text": "If any of your Pokémon were Knocked Out by damage from an attack from your opponent's Pokémon during their last turn, this attack does 120 more damage."
      },
      {
        "name": "Dragon Claw",
        "cost": [
          "Fire",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
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
      621
    ],
    "flavorText": "Druddigon are vicious and cunning. They take up residence in nests dug out by other Pokémon, treating the stolen nests as their own lairs.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/113.png",
      "large": "https://images.pokemontcg.io/swsh9/113_hires.png"
    }
  },
  {
    "id": "swsh9-114",
    "name": "Dracovish V",
    "number": "114",
    "artist": "Satoshi Shirai",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
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
        "name": "Slosh 'n' Crash",
        "cost": [
          "Grass",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "60+",
        "text": "Before doing damage, discard all Pokémon Tools from your opponent's Active Pokémon. If you discarded a Pokémon Tool in this way, this attack does 120 more damage."
      },
      {
        "name": "Dragon Strike",
        "cost": [
          "Grass",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "210",
        "text": "During your next turn, this Pokémon can't use Dragon Strike."
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
      882
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/114.png",
      "large": "https://images.pokemontcg.io/swsh9/114_hires.png"
    }
  },
  {
    "id": "swsh9-115",
    "name": "Farfetch'd",
    "number": "115",
    "artist": "Tomokazu Komiya",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Sirfetch'd"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Leek Lash",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 10 more damage for each damage counter on your opponent's Active Pokémon."
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
      83
    ],
    "flavorText": "The stalk this Pokémon carries in its wings serves as a sword to cut down opponents. In a dire situation, the stalk can also serve as food.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/115.png",
      "large": "https://images.pokemontcg.io/swsh9/115_hires.png"
    }
  },
  {
    "id": "swsh9-116",
    "name": "Castform",
    "number": "116",
    "artist": "kawayoo",
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
    "evolvesTo": [],
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
        "name": "Hurricane",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Move a basic Energy from this Pokémon to 1 of your Benched Pokémon."
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
      351
    ],
    "flavorText": "Its form changes depending on the weather. The rougher conditions get, the rougher Castform's disposition!",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/116.png",
      "large": "https://images.pokemontcg.io/swsh9/116_hires.png"
    }
  },
  {
    "id": "swsh9-117",
    "name": "Starly",
    "number": "117",
    "artist": "Saya Tsuruta",
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
      "Staravia"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Claw",
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
      396
    ],
    "flavorText": "They flock around mountains and fields, chasing after bug Pokémon. Their singing is noisy and annoying.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/117.png",
      "large": "https://images.pokemontcg.io/swsh9/117_hires.png"
    }
  },
  {
    "id": "swsh9-118",
    "name": "Staravia",
    "number": "118",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Starly",
    "evolvesTo": [
      "Staraptor"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wing Attack",
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
      397
    ],
    "flavorText": "It lives in forests and fields. Squabbles over territory occur when flocks collide.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/118.png",
      "large": "https://images.pokemontcg.io/swsh9/118_hires.png"
    }
  },
  {
    "id": "swsh9-119",
    "name": "Staraptor",
    "number": "119",
    "artist": "Narumi Sato",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Staravia",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Strong Breeze",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Your opponent shuffles their Active Pokémon and all attached cards into their deck."
      },
      {
        "name": "Spinning Bird",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "Discard 2 Energy from this Pokémon."
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
      398
    ],
    "flavorText": "When Staravia evolve into Staraptor, they leave the flock to live alone. They have sturdy wings.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/119.png",
      "large": "https://images.pokemontcg.io/swsh9/119_hires.png"
    }
  },
  {
    "id": "swsh9-120",
    "name": "Bidoof",
    "number": "120",
    "artist": "Oswaldo KATO",
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
      "Bibarel"
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
      399
    ],
    "flavorText": "It constantly gnaws on logs and rocks to whittle down its front teeth. It nests alongside water.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/120.png",
      "large": "https://images.pokemontcg.io/swsh9/120_hires.png"
    }
  },
  {
    "id": "swsh9-121",
    "name": "Bibarel",
    "number": "121",
    "artist": "OKACHEKE",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Bidoof",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Industrious Incisors",
        "text": "Once during your turn, you may draw cards until you have 5 cards in your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Tail Smash",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      400
    ],
    "flavorText": "It makes its nest by damming streams with bark and mud. It is known as an industrious worker.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/121.png",
      "large": "https://images.pokemontcg.io/swsh9/121_hires.png"
    }
  },
  {
    "id": "swsh9-122",
    "name": "Arceus V",
    "number": "122",
    "artist": "N-DESIGN Inc.",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Trinity Charge",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Search your deck for up to 3 basic Energy cards and attach them to your Pokémon V in any way you like. Then, shuffle your deck."
      },
      {
        "name": "Power Edge",
        "cost": [
          "Colorless",
          "Colorless",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      493
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/122.png",
      "large": "https://images.pokemontcg.io/swsh9/122_hires.png"
    }
  },
  {
    "id": "swsh9-123",
    "name": "Arceus VSTAR",
    "number": "123",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo VSTAR",
    "supertype": "Pokémon",
    "subtypes": [
      "VSTAR"
    ],
    "hp": "280",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Arceus V",
    "evolvesTo": [],
    "rules": [
      "VSTAR rule: When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Starbirth",
        "text": "During your turn, you may search your deck for up to 2 cards and put them into your hand. Then, shuffle your deck. (You can't use more than 1 VSTAR Power in a game.)",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Trinity Nova",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "Search your deck for up to 3 basic Energy cards and attach them to your Pokémon V in any way you like. Then, shuffle your deck."
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
      493
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/123.png",
      "large": "https://images.pokemontcg.io/swsh9/123_hires.png"
    }
  },
  {
    "id": "swsh9-124",
    "name": "Minccino",
    "number": "124",
    "artist": "Mina Nakai",
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
        "name": "Call for Family",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck."
      },
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
    "flavorText": "The way it brushes away grime with its tail can be helpful when cleaning. But its focus on spotlessness can make cleaning more of a hassle.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/124.png",
      "large": "https://images.pokemontcg.io/swsh9/124_hires.png"
    }
  },
  {
    "id": "swsh9-125",
    "name": "Cinccino",
    "number": "125",
    "artist": "Atsuko Nishida",
    "rarity": "Uncommon",
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
        "name": "Slap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Triple Axel",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50×",
        "text": "Flip 3 coins. This attack does 50 damage for each heads."
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
    "flavorText": "Its body secretes oil that this Pokémon spreads over its nest as a coating to protect it from dust. Cinccino won't tolerate even a speck of the stuff.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/125.png",
      "large": "https://images.pokemontcg.io/swsh9/125_hires.png"
    }
  },
  {
    "id": "swsh9-126",
    "name": "Tornadus",
    "number": "126",
    "artist": "Shigenori Negishi",
    "rarity": "Rare",
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
    "abilities": [
      {
        "name": "Sudden Cyclone",
        "text": "When you play this Pokémon from your hand onto your Bench, you may have your opponent switch their Active Pokémon with 1 of their Benched Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Blasting Wind",
        "cost": [
          "Colorless",
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
      641
    ],
    "flavorText": "Tornadus expels massive energy from its tail, causing severe storms. Its power is great enough to blow houses away.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/126.png",
      "large": "https://images.pokemontcg.io/swsh9/126_hires.png"
    }
  },
  {
    "id": "swsh9-127",
    "name": "Hawlucha",
    "number": "127",
    "artist": "Miki Tanaka",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Showboating Pose",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach up to 2 basic Energy cards from your discard pile to 1 of your Benched Pokémon."
      },
      {
        "name": "Cross-Cut",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30+",
        "text": "If your opponent's Active Pokémon is an Evolution Pokémon, this attack does 30 more damage."
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
      701
    ],
    "flavorText": "It drives its opponents to exhaustion with its agile maneuvers, then ends the fight with a flashy finishing move.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/127.png",
      "large": "https://images.pokemontcg.io/swsh9/127_hires.png"
    }
  },
  {
    "id": "swsh9-128",
    "name": "Drampa V",
    "number": "128",
    "artist": "aky CG Works",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "210",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Spike Draw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Draw 2 cards."
      },
      {
        "name": "Dragon Pulse",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Discard the top 2 cards of your deck."
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
      780
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/128.png",
      "large": "https://images.pokemontcg.io/swsh9/128_hires.png"
    }
  },
  {
    "id": "swsh9-129",
    "name": "Acerola's Premonition",
    "number": "129",
    "artist": "Shiburingaru",
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
      "Your opponent reveals their hand, and you draw a card for each Trainer card you find there.",
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
      "small": "https://images.pokemontcg.io/swsh9/129.png",
      "large": "https://images.pokemontcg.io/swsh9/129_hires.png"
    }
  },
  {
    "id": "swsh9-130",
    "name": "Barry",
    "number": "130",
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
      "Draw 3 cards.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/130.png",
      "large": "https://images.pokemontcg.io/swsh9/130_hires.png"
    }
  },
  {
    "id": "swsh9-131",
    "name": "Blunder Policy",
    "number": "131",
    "artist": "Ayaka Yoshida",
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
      "If the Pokémon this card is attached to uses an attack, if you flip any coins for the damage or effect of that attack, and if any of them are tails, draw 3 cards at the end of your turn.",
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
      "small": "https://images.pokemontcg.io/swsh9/131.png",
      "large": "https://images.pokemontcg.io/swsh9/131_hires.png"
    }
  },
  {
    "id": "swsh9-132",
    "name": "Boss's Orders",
    "number": "132",
    "artist": "GIDORA",
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
      "Switch 1 of your opponent's Benched Pokémon with their Active Pokémon.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/132.png",
      "large": "https://images.pokemontcg.io/swsh9/132_hires.png"
    }
  },
  {
    "id": "swsh9-133",
    "name": "Café Master",
    "number": "133",
    "artist": "Hasegawa Saki",
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
      "Choose up to 3 of your Benched Pokémon. For each of those Pokémon, search your deck for a different type of basic Energy card and attach it to that Pokémon. Then, shuffle your deck. Your turn ends.",
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
      "small": "https://images.pokemontcg.io/swsh9/133.png",
      "large": "https://images.pokemontcg.io/swsh9/133_hires.png"
    }
  },
  {
    "id": "swsh9-134",
    "name": "Cheren's Care",
    "number": "134",
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
      "Put 1 of your Colorless Pokémon that has any damage counters on it and all attached cards into your hand.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/134.png",
      "large": "https://images.pokemontcg.io/swsh9/134_hires.png"
    }
  },
  {
    "id": "swsh9-135",
    "name": "Choice Belt",
    "number": "135",
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
      "The attacks of the Pokémon this card is attached to do 30 more damage to your opponent's Active Pokémon V (before applying Weakness and Resistance).",
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/135.png",
      "large": "https://images.pokemontcg.io/swsh9/135_hires.png"
    }
  },
  {
    "id": "swsh9-136",
    "name": "Cleansing Gloves",
    "number": "136",
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
      "The attacks of the Pokémon this card is attached to do 30 more damage to your opponent's Active Psychic Pokémon (before applying Weakness and Resistance).",
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
      "small": "https://images.pokemontcg.io/swsh9/136.png",
      "large": "https://images.pokemontcg.io/swsh9/136_hires.png"
    }
  },
  {
    "id": "swsh9-137",
    "name": "Collapsed Stadium",
    "number": "137",
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
      "Each player can't have more than 4 Benched Pokémon. If a player has 5 or more Benched Pokémon, they discard Benched Pokémon until they have 4 Pokémon on the Bench. The player who played this card discards first. If more than one effect changes the number of Benched Pokémon allowed, use the smaller number."
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/137.png",
      "large": "https://images.pokemontcg.io/swsh9/137_hires.png"
    }
  },
  {
    "id": "swsh9-138",
    "name": "Cynthia's Ambition",
    "number": "138",
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
      "Draw cards until you have 5 cards in your hand. If any of your Pokémon were Knocked Out during your opponent's last turn, draw cards until you have 8 cards in your hand instead.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/138.png",
      "large": "https://images.pokemontcg.io/swsh9/138_hires.png"
    }
  },
  {
    "id": "swsh9-139",
    "name": "Fresh Water Set",
    "number": "139",
    "artist": "AYUMI ODASHIMA",
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
      "Heal 20 damage from each of your Pokémon.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/139.png",
      "large": "https://images.pokemontcg.io/swsh9/139_hires.png"
    }
  },
  {
    "id": "swsh9-140",
    "name": "Friends in Galar",
    "number": "140",
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
      "Draw 3 cards.",
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
      "small": "https://images.pokemontcg.io/swsh9/140.png",
      "large": "https://images.pokemontcg.io/swsh9/140_hires.png"
    }
  },
  {
    "id": "swsh9-141",
    "name": "Gloria",
    "number": "141",
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
      "Search your deck for up to 3 Basic Pokémon that don't have a Rule Box and put them onto your Bench. Then, shuffle your deck. (Pokémon V, Pokémon-GX, etc. have Rule Boxes.)",
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
      "small": "https://images.pokemontcg.io/swsh9/141.png",
      "large": "https://images.pokemontcg.io/swsh9/141_hires.png"
    }
  },
  {
    "id": "swsh9-142",
    "name": "Hunting Gloves",
    "number": "142",
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
      "The attacks of the Pokémon this card is attached to do 30 more damage to your opponent's Active Dragon Pokémon (before applying Weakness and Resistance).",
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
      "small": "https://images.pokemontcg.io/swsh9/142.png",
      "large": "https://images.pokemontcg.io/swsh9/142_hires.png"
    }
  },
  {
    "id": "swsh9-143",
    "name": "Kindler",
    "number": "143",
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
      "You can use this card only if you discard a Fire Energy card from your hand. Look at the top 7 cards of your deck and put up to 2 of them into your hand. Shuffle the other cards back into your deck.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/143.png",
      "large": "https://images.pokemontcg.io/swsh9/143_hires.png"
    }
  },
  {
    "id": "swsh9-144",
    "name": "Magma Basin",
    "number": "144",
    "artist": "ORBITALLINK Inc.",
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
      "Once during each player's turn, that player may attach a Fire Energy card from their discard pile to 1 of their Benched Fire Pokémon. If a player attached Energy to a Pokémon in this way, put 2 damage counters on that Pokémon."
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/144.png",
      "large": "https://images.pokemontcg.io/swsh9/144_hires.png"
    }
  },
  {
    "id": "swsh9-145",
    "name": "Marnie's Pride",
    "number": "145",
    "artist": "saino misaki",
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
      "Attach a basic Energy card from your discard pile to 1 of your Benched Pokémon.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/145.png",
      "large": "https://images.pokemontcg.io/swsh9/145_hires.png"
    }
  },
  {
    "id": "swsh9-146",
    "name": "Pot Helmet",
    "number": "146",
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
      "If the Pokémon this card is attached to doesn't have a Rule Box, it takes 30 less damage from attacks from your opponent's Pokémon (after applying Weakness and Resistance). (Pokémon V, Pokémon-GX, etc. have Rule Boxes.)",
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/146.png",
      "large": "https://images.pokemontcg.io/swsh9/146_hires.png"
    }
  },
  {
    "id": "swsh9-147",
    "name": "Professor's Research",
    "number": "147",
    "artist": "Sanosuke Sakuma",
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
      "Discard your hand and draw 7 cards.",
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
    "regulationMark": "D",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/147.png",
      "large": "https://images.pokemontcg.io/swsh9/147_hires.png"
    }
  },
  {
    "id": "swsh9-148",
    "name": "Roseanne's Backup",
    "number": "148",
    "artist": "Nagomi Nijo",
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
      "Choose 1 or more:\n• Shuffle a Pokémon from your discard pile into your deck.\n• Shuffle a Pokémon Tool card from your discard pile into your deck.\n• Shuffle a Stadium card from your discard pile into your deck.\n• Shuffle an Energy card from your discard pile into your deck.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/148.png",
      "large": "https://images.pokemontcg.io/swsh9/148_hires.png"
    }
  },
  {
    "id": "swsh9-149",
    "name": "Team Yell's Cheer",
    "number": "149",
    "artist": "GOSSAN",
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
      "Shuffle up to 3 in any combination of Pokémon and Supporter cards, except for Team Yell's Cheer, from your discard pile into your deck.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/149.png",
      "large": "https://images.pokemontcg.io/swsh9/149_hires.png"
    }
  },
  {
    "id": "swsh9-150",
    "name": "Ultra Ball",
    "number": "150",
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
      "You can use this card only if you discard 2 other cards from your hand. Search your deck for a Pokémon, reveal it, and put it into your hand. Then, shuffle your deck.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/150.png",
      "large": "https://images.pokemontcg.io/swsh9/150_hires.png"
    }
  },
  {
    "id": "swsh9-151",
    "name": "Double Turbo Energy",
    "number": "151",
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
      "As long as this card is attached to a Pokémon, it provides ColorlessColorless Energy. The attacks of the Pokémon this card is attached to do 20 less damage to your opponent's Pokémon (before applying Weakness and Resistance)."
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/151.png",
      "large": "https://images.pokemontcg.io/swsh9/151_hires.png"
    }
  },
  {
    "id": "swsh9-152",
    "name": "Shaymin V",
    "number": "152",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "190",
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
        "name": "Flap",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Revenge Blast",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60+",
        "text": "This attack does 40 more damage for each Prize card your opponent has taken."
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
      492
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/152.png",
      "large": "https://images.pokemontcg.io/swsh9/152_hires.png"
    }
  },
  {
    "id": "swsh9-153",
    "name": "Charizard V",
    "number": "153",
    "artist": "N-DESIGN Inc.",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
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
        "name": "Incinerate",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Before doing damage, discard all Pokémon Tools from your opponent's Active Pokémon."
      },
      {
        "name": "Heat Blast",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
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
      6
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/153.png",
      "large": "https://images.pokemontcg.io/swsh9/153_hires.png"
    }
  },
  {
    "id": "swsh9-154",
    "name": "Charizard V",
    "number": "154",
    "artist": "Ryota Murayama",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
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
        "name": "Incinerate",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Before doing damage, discard all Pokémon Tools from your opponent's Active Pokémon."
      },
      {
        "name": "Heat Blast",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
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
      6
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/154.png",
      "large": "https://images.pokemontcg.io/swsh9/154_hires.png"
    }
  },
  {
    "id": "swsh9-155",
    "name": "Lumineon V",
    "number": "155",
    "artist": "takuyoa",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "170",
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
        "name": "Luminous Sign",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may search your deck for a Supporter card, reveal it, and put it into your hand. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Aqua Return",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Shuffle this Pokémon and all attached cards into your deck."
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
      457
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/155.png",
      "large": "https://images.pokemontcg.io/swsh9/155_hires.png"
    }
  },
  {
    "id": "swsh9-156",
    "name": "Lumineon V",
    "number": "156",
    "artist": "Ligton",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "170",
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
        "name": "Luminous Sign",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may search your deck for a Supporter card, reveal it, and put it into your hand. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Aqua Return",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Shuffle this Pokémon and all attached cards into your deck."
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
      457
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/156.png",
      "large": "https://images.pokemontcg.io/swsh9/156_hires.png"
    }
  },
  {
    "id": "swsh9-157",
    "name": "Pikachu V",
    "number": "157",
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
    "evolvesTo": [
      "Raichu"
    ],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Lightning Blast",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100+",
        "text": "You may discard all Lightning Energy from this Pokémon. If you do, this attack does 120 more damage."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/157.png",
      "large": "https://images.pokemontcg.io/swsh9/157_hires.png"
    }
  },
  {
    "id": "swsh9-158",
    "name": "Raichu V",
    "number": "158",
    "artist": "MUGENUP",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
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
        "name": "Fast Charge",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If you go first, you can use this attack during your first turn. Search your deck for a Lightning Energy card and attach it to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Dynamic Spark",
        "cost": [
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "60×",
        "text": "You may discard any amount of Lightning Energy from your Pokémon. This attack does 60 damage for each card you discarded in this way."
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
      26
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/158.png",
      "large": "https://images.pokemontcg.io/swsh9/158_hires.png"
    }
  },
  {
    "id": "swsh9-159",
    "name": "Granbull V",
    "number": "159",
    "artist": "Ayaka Yoshida",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "210",
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
        "name": "Chomp",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 10 more damage for each damage counter on this Pokémon."
      },
      {
        "name": "Bull Dash",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "190",
        "text": "This Pokémon also does 30 damage to itself."
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
      210
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/159.png",
      "large": "https://images.pokemontcg.io/swsh9/159_hires.png"
    }
  },
  {
    "id": "swsh9-160",
    "name": "Whimsicott V",
    "number": "160",
    "artist": "Saki Hayashiro",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "190",
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
        "name": "Fluff Gets in the Way",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "If the Defending Pokémon is a Basic Pokémon, it can't attack during your opponent's next turn."
      },
      {
        "name": "Cotton Guard",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      547
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/160.png",
      "large": "https://images.pokemontcg.io/swsh9/160_hires.png"
    }
  },
  {
    "id": "swsh9-161",
    "name": "Honchkrow V",
    "number": "161",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
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
    "abilities": [
      {
        "name": "Boss Pockets",
        "text": "This Pokémon may have up to 4 Pokémon Tools attached to it. If it loses this Ability, discard Pokémon Tools from it until only 1 remains.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Fearsome Shadow",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "Your opponent reveals their hand."
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
      430
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/161.png",
      "large": "https://images.pokemontcg.io/swsh9/161_hires.png"
    }
  },
  {
    "id": "swsh9-162",
    "name": "Honchkrow V",
    "number": "162",
    "artist": "zig",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
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
    "abilities": [
      {
        "name": "Boss Pockets",
        "text": "This Pokémon may have up to 4 Pokémon Tools attached to it. If it loses this Ability, discard Pokémon Tools from it until only 1 remains.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Fearsome Shadow",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "Your opponent reveals their hand."
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
      430
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/162.png",
      "large": "https://images.pokemontcg.io/swsh9/162_hires.png"
    }
  },
  {
    "id": "swsh9-163",
    "name": "Zamazenta V",
    "number": "163",
    "artist": "Ayaka Yoshida",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Regal Stance",
        "text": "Once during your turn, you may discard your hand and draw 5 cards. If you use this Ability, your turn ends.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Revenge Blast",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120+",
        "text": "This attack does 30 more damage for each Prize card your opponent has taken."
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
      889
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/163.png",
      "large": "https://images.pokemontcg.io/swsh9/163_hires.png"
    }
  },
  {
    "id": "swsh9-164",
    "name": "Flygon V",
    "number": "164",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
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
        "name": "Sand Spray",
        "cost": [
          "Grass",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": ""
      },
      {
        "name": "Draconic Impulse",
        "cost": [
          "Grass",
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "160+",
        "text": "If your opponent's Active Pokémon is a Pokémon VMAX, this attack does 160 more damage, and discard 3 Energy from this Pokémon."
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
      330
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/164.png",
      "large": "https://images.pokemontcg.io/swsh9/164_hires.png"
    }
  },
  {
    "id": "swsh9-165",
    "name": "Arceus V",
    "number": "165",
    "artist": "N-DESIGN Inc.",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Trinity Charge",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Search your deck for up to 3 basic Energy cards and attach them to your Pokémon V in any way you like. Then, shuffle your deck."
      },
      {
        "name": "Power Edge",
        "cost": [
          "Colorless",
          "Colorless",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      493
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/165.png",
      "large": "https://images.pokemontcg.io/swsh9/165_hires.png"
    }
  },
  {
    "id": "swsh9-166",
    "name": "Arceus V",
    "number": "166",
    "artist": "kawayoo",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Trinity Charge",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Search your deck for up to 3 basic Energy cards and attach them to your Pokémon V in any way you like. Then, shuffle your deck."
      },
      {
        "name": "Power Edge",
        "cost": [
          "Colorless",
          "Colorless",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      493
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/166.png",
      "large": "https://images.pokemontcg.io/swsh9/166_hires.png"
    }
  },
  {
    "id": "swsh9-167",
    "name": "Barry",
    "number": "167",
    "artist": "Yuu Nishida",
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
      "Draw 3 cards.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/167.png",
      "large": "https://images.pokemontcg.io/swsh9/167_hires.png"
    }
  },
  {
    "id": "swsh9-168",
    "name": "Cheren's Care",
    "number": "168",
    "artist": "Ryuta Fuse",
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
      "Put 1 of your Colorless Pokémon that has any damage counters on it and all attached cards into your hand.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/168.png",
      "large": "https://images.pokemontcg.io/swsh9/168_hires.png"
    }
  },
  {
    "id": "swsh9-169",
    "name": "Cynthia's Ambition",
    "number": "169",
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
      "Draw cards until you have 5 cards in your hand. If any of your Pokémon were Knocked Out during your opponent's last turn, draw cards until you have 8 cards in your hand instead.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/169.png",
      "large": "https://images.pokemontcg.io/swsh9/169_hires.png"
    }
  },
  {
    "id": "swsh9-170",
    "name": "Kindler",
    "number": "170",
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
      "You can use this card only if you discard a Fire Energy card from your hand. Look at the top 7 cards of your deck and put up to 2 of them into your hand. Shuffle the other cards back into your deck.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/170.png",
      "large": "https://images.pokemontcg.io/swsh9/170_hires.png"
    }
  },
  {
    "id": "swsh9-171",
    "name": "Marnie's Pride",
    "number": "171",
    "artist": "Souichirou Gunjima",
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
      "Attach a basic Energy card from your discard pile to 1 of your Benched Pokémon.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/171.png",
      "large": "https://images.pokemontcg.io/swsh9/171_hires.png"
    }
  },
  {
    "id": "swsh9-172",
    "name": "Roseanne's Backup",
    "number": "172",
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
      "Choose 1 or more:\n• Shuffle a Pokémon from your discard pile into your deck.\n• Shuffle a Pokémon Tool card from your discard pile into your deck.\n• Shuffle a Stadium card from your discard pile into your deck.\n• Shuffle an Energy card from your discard pile into your deck.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/172.png",
      "large": "https://images.pokemontcg.io/swsh9/172_hires.png"
    }
  },
  {
    "id": "swsh9-173",
    "name": "Shaymin VSTAR",
    "number": "173",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VSTAR"
    ],
    "hp": "250",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Shaymin V",
    "evolvesTo": [],
    "rules": [
      "VSTAR rule: When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Star Bloom",
        "text": "During your turn, you may heal 120 damage from each of your Benched Grass Pokémon. (You can't use more than 1 VSTAR Power in a game.)",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Revenge Blast",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "120+",
        "text": "This attack does 40 more damage for each Prize card your opponent has taken."
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
      492
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/173.png",
      "large": "https://images.pokemontcg.io/swsh9/173_hires.png"
    }
  },
  {
    "id": "swsh9-174",
    "name": "Charizard VSTAR",
    "number": "174",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VSTAR"
    ],
    "hp": "280",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charizard V",
    "evolvesTo": [],
    "rules": [
      "VSTAR rule: When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Explosive Fire",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130+",
        "text": "If this Pokémon has any damage counters on it, this attack does 100 more damage."
      },
      {
        "name": "Star Blaze",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "320",
        "text": "Discard 2 Energy from this Pokémon. (You can't use more than 1 VSTAR Power in a game.)"
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/174.png",
      "large": "https://images.pokemontcg.io/swsh9/174_hires.png"
    }
  },
  {
    "id": "swsh9-175",
    "name": "Whimsicott VSTAR",
    "number": "175",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VSTAR"
    ],
    "hp": "250",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Whimsicott V",
    "evolvesTo": [],
    "rules": [
      "VSTAR rule: When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Trick Wind",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "During your opponent's next turn, they can't play any Pokémon Tool or Special Energy cards from their hand."
      },
      {
        "name": "Fluffball Star",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 60 damage to 1 of your opponent's Pokémon for each Energy attached to this Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) (You can't use more than 1 VSTAR Power in a game.)"
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
      547
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/175.png",
      "large": "https://images.pokemontcg.io/swsh9/175_hires.png"
    }
  },
  {
    "id": "swsh9-176",
    "name": "Arceus VSTAR",
    "number": "176",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VSTAR"
    ],
    "hp": "280",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Arceus V",
    "evolvesTo": [],
    "rules": [
      "VSTAR rule: When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Starbirth",
        "text": "During your turn, you may search your deck for up to 2 cards and put them into your hand. Then, shuffle your deck. (You can't use more than 1 VSTAR Power in a game.)",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Trinity Nova",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "Search your deck for up to 3 basic Energy cards and attach them to your Pokémon V in any way you like. Then, shuffle your deck."
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
      493
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/176.png",
      "large": "https://images.pokemontcg.io/swsh9/176_hires.png"
    }
  },
  {
    "id": "swsh9-177",
    "name": "Cheren's Care",
    "number": "177",
    "artist": "Ryuta Fuse",
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
      "Put 1 of your Colorless Pokémon that has any damage counters on it and all attached cards into your hand.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/177.png",
      "large": "https://images.pokemontcg.io/swsh9/177_hires.png"
    }
  },
  {
    "id": "swsh9-178",
    "name": "Cynthia's Ambition",
    "number": "178",
    "artist": "Megumi Mizutani",
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
      "Draw cards until you have 5 cards in your hand. If any of your Pokémon were Knocked Out during your opponent's last turn, draw cards until you have 8 cards in your hand instead.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/178.png",
      "large": "https://images.pokemontcg.io/swsh9/178_hires.png"
    }
  },
  {
    "id": "swsh9-179",
    "name": "Kindler",
    "number": "179",
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
      "You can use this card only if you discard a Fire Energy card from your hand. Look at the top 7 cards of your deck and put up to 2 of them into your hand. Shuffle the other cards back into your deck.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/179.png",
      "large": "https://images.pokemontcg.io/swsh9/179_hires.png"
    }
  },
  {
    "id": "swsh9-180",
    "name": "Roseanne's Backup",
    "number": "180",
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
      "Choose 1 or more:\n• Shuffle a Pokémon from your discard pile into your deck.\n• Shuffle a Pokémon Tool card from your discard pile into your deck.\n• Shuffle a Stadium card from your discard pile into your deck.\n• Shuffle an Energy card from your discard pile into your deck.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/180.png",
      "large": "https://images.pokemontcg.io/swsh9/180_hires.png"
    }
  },
  {
    "id": "swsh9-181",
    "name": "Galarian Articuno V",
    "number": "181",
    "artist": "5ban Graphics",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "210",
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
        "name": "Reconstitute",
        "text": "You must discard 2 cards from your hand in order to use this Ability. Once during your turn, you may draw a card.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Psyray",
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/181.png",
      "large": "https://images.pokemontcg.io/swsh9/181_hires.png"
    }
  },
  {
    "id": "swsh9-182",
    "name": "Galarian Zapdos V",
    "number": "182",
    "artist": "5ban Graphics",
    "rarity": "Rare Secret",
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
    "abilities": [
      {
        "name": "Fighting Instinct",
        "text": "This Pokémon's attacks cost Colorless less for each of your opponent's Pokémon V in play.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Thunderous Kick",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "170",
        "text": "Before doing damage, discard a Special Energy from your opponent's Active Pokémon."
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
      145
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/182.png",
      "large": "https://images.pokemontcg.io/swsh9/182_hires.png"
    }
  },
  {
    "id": "swsh9-183",
    "name": "Galarian Moltres V",
    "number": "183",
    "artist": "akyCG Works",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Direflame Wings",
        "text": "Once during your turn, you may attach a Darkness Energy card from your discard pile to this Pokémon. You can't use more than 1 Direflame Wings Ability each turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Aura Burn",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "190",
        "text": "This Pokémon also does 30 damage to itself."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/183.png",
      "large": "https://images.pokemontcg.io/swsh9/183_hires.png"
    }
  },
  {
    "id": "swsh9-184",
    "name": "Arceus VSTAR",
    "number": "184",
    "artist": "5ban Graphics",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "VSTAR"
    ],
    "hp": "280",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Arceus V",
    "evolvesTo": [],
    "rules": [
      "VSTAR rule: When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Starbirth",
        "text": "During your turn, you may search your deck for up to 2 cards and put them into your hand. Then, shuffle your deck. (You can't use more than 1 VSTAR Power in a game.)",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Trinity Nova",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "Search your deck for up to 3 basic Energy cards and attach them to your Pokémon V in any way you like. Then, shuffle your deck."
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
      493
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/184.png",
      "large": "https://images.pokemontcg.io/swsh9/184_hires.png"
    }
  },
  {
    "id": "swsh9-185",
    "name": "Magma Basin",
    "number": "185",
    "artist": "ORBITALLINK Inc.",
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
      "Once during each player's turn, that player may attach a Fire Energy card from their discard pile to 1 of their Benched Fire Pokémon. If a player attached Energy to a Pokémon in this way, put 2 damage counters on that Pokémon."
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/185.png",
      "large": "https://images.pokemontcg.io/swsh9/185_hires.png"
    }
  },
  {
    "id": "swsh9-186",
    "name": "Ultra Ball",
    "number": "186",
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
      "You can use this card only if you discard 2 other cards from your hand. Search your deck for a Pokémon, reveal it, and put it into your hand. Then, shuffle your deck.",
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
    "regulationMark": "F",
    "images": {
      "small": "https://images.pokemontcg.io/swsh9/186.png",
      "large": "https://images.pokemontcg.io/swsh9/186_hires.png"
    }
  }
]

export default cardDetails
