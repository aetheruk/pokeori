import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "sm5-1",
    "name": "Exeggcute",
    "number": "1",
    "artist": "kawayoo",
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
        "name": "Continuous Eggsplosion",
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
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      102
    ],
    "flavorText": "Its six eggs use telepathy to communicate among themselves. It is believed to carry plant genes and the genes of other species.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/1.png",
      "large": "https://images.pokemontcg.io/sm5/1_hires.png"
    }
  },
  {
    "id": "sm5-2",
    "name": "Yanma",
    "number": "2",
    "artist": "Akira Komayama",
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
      "Yanmega"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Super Speed",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn."
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
      193
    ],
    "flavorText": "If it flaps its wings really fast, it can generate shock waves that will shatter windows in the area.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/2.png",
      "large": "https://images.pokemontcg.io/sm5/2_hires.png"
    }
  },
  {
    "id": "sm5-3",
    "name": "Yanmega",
    "number": "3",
    "artist": "SATOSHI NAKAI",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Yanma",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Supersonic",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Confused."
      },
      {
        "name": "Cutting Wind",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
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
      469
    ],
    "flavorText": "This six-legged Pokémon is easily capable of transporting an adult in flight. The wings on its tail help it stay balanced.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/3.png",
      "large": "https://images.pokemontcg.io/sm5/3_hires.png"
    }
  },
  {
    "id": "sm5-4",
    "name": "Roselia",
    "number": "4",
    "artist": "Kyoko Umemoto",
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
      "Roserade"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Petal Dance",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "Flip 3 coins. This attack does 30 damage for each heads. This Pokémon is now Confused."
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
    "flavorText": "Roselia that drink nutritionally rich springwater are said to reveal rare coloration when they bloom.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/4.png",
      "large": "https://images.pokemontcg.io/sm5/4_hires.png"
    }
  },
  {
    "id": "sm5-5",
    "name": "Roserade",
    "number": "5",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Roselia",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Inviting Poison",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch 1 of your opponent's Benched Pokémon with their Active Pokémon. The new Active Pokémon is now Poisoned."
      },
      {
        "name": "Flower Tornado",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "Move any number of Grass Energy from your Pokémon to your other Pokémon in any way you like."
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
    "flavorText": "With the movements of a dancer, it strikes with whips that are densely lined with poison thorns.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/5.png",
      "large": "https://images.pokemontcg.io/sm5/5_hires.png"
    }
  },
  {
    "id": "sm5-6",
    "name": "Turtwig",
    "number": "6",
    "artist": "Ken Sugimori",
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
      "Grotle"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Synthesis",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Grass Energy card and attach it to 1 of your Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Headbutt Bounce",
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
      387
    ],
    "flavorText": "It undertakes photosynthesis with its body, making oxygen. The leaf on its head wilts if it is thirsty.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/6.png",
      "large": "https://images.pokemontcg.io/sm5/6_hires.png"
    }
  },
  {
    "id": "sm5-7",
    "name": "Turtwig",
    "number": "7",
    "artist": "OOYAMA",
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
        "name": "Tackle",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Razor Leaf",
        "cost": [
          "Grass",
          "Grass",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      387
    ],
    "flavorText": "It undertakes photosynthesis with its body, making oxygen. The leaf on its head wilts if it is thirsty.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/7.png",
      "large": "https://images.pokemontcg.io/sm5/7_hires.png"
    }
  },
  {
    "id": "sm5-8",
    "name": "Grotle",
    "number": "8",
    "artist": "Shigenori Negishi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Turtwig",
    "evolvesTo": [
      "Torterra"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mega Drain",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Heal 30 damage from this Pokémon."
      },
      {
        "name": "Razor Leaf",
        "cost": [
          "Grass",
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
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
      388
    ],
    "flavorText": "It knows where pure water wells up. It carries fellow Pokémon there on its back.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/8.png",
      "large": "https://images.pokemontcg.io/sm5/8_hires.png"
    }
  },
  {
    "id": "sm5-9",
    "name": "Torterra",
    "number": "9",
    "artist": "kawayoo",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Grotle",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Giga Drain",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Heal from this Pokémon the same amount of damage you did to your opponent's Active Pokémon."
      },
      {
        "name": "Earthquake",
        "cost": [
          "Grass",
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "This attack does 20 damage to each of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/9.png",
      "large": "https://images.pokemontcg.io/sm5/9_hires.png"
    }
  },
  {
    "id": "sm5-10",
    "name": "Cherubi",
    "number": "10",
    "artist": "Asako Ito",
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
      "Cherrim"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Surprise Attack",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If tails, this attack does nothing."
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
    "flavorText": "It evolves by sucking the energy out of the small ball where it had been storing nutrients.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/10.png",
      "large": "https://images.pokemontcg.io/sm5/10_hires.png"
    }
  },
  {
    "id": "sm5-11",
    "name": "Cherrim",
    "number": "11",
    "artist": "MAHOU",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Cherubi",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Weather Guard",
        "text": "Your Grass Pokémon have no Weakness.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Seed Bomb",
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
      421
    ],
    "flavorText": "If it senses strong sunlight, it opens its folded petals to absorb the sun's rays with its whole body.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/11.png",
      "large": "https://images.pokemontcg.io/sm5/11_hires.png"
    }
  },
  {
    "id": "sm5-12",
    "name": "Carnivine",
    "number": "12",
    "artist": "Anesaki Dynamic",
    "rarity": "Common",
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
        "name": "Chomp Chomp",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Heal 20 damage from this Pokémon."
      },
      {
        "name": "Loom Over",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "90-",
        "text": "This attack does 10 less damage for each damage counter on this Pokémon."
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
      455
    ],
    "flavorText": "It binds itself to trees in marshes. It attracts prey with its sweet-smelling drool and gulps them down.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/12.png",
      "large": "https://images.pokemontcg.io/sm5/12_hires.png"
    }
  },
  {
    "id": "sm5-13",
    "name": "Leafeon-GX",
    "number": "13",
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
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Breath of the Leaves",
        "text": "If this Pokémon is your Active Pokémon, once during your turn (before your attack), you may heal 50 damage from 1 of your Pokémon that has any Energy attached to it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Solar Beam",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": ""
      },
      {
        "name": "Grand Bloom-GX",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "For each of your Benched Basic Pokémon, search your deck for a card that evolves from that Pokémon and put it onto that Pokémon to evolve it. Then, shuffle your deck. (You can't use more than 1 GX attack in a game.)"
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
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/13.png",
      "large": "https://images.pokemontcg.io/sm5/13_hires.png"
    }
  },
  {
    "id": "sm5-14",
    "name": "Mow Rotom",
    "number": "14",
    "artist": "kawayoo",
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
    "abilities": [
      {
        "name": "Roto Motor",
        "text": "If you have 9 or more Pokémon Tool cards in your discard pile, ignore all Energy in the attack cost of each of this Pokémon's attacks.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Special Mow",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Discard a Special Energy from your opponent's Active Pokémon."
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
      479
    ],
    "flavorText": "Its body is composed of plasma. It is known to infiltrate electronic devices and wreak havoc.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/14.png",
      "large": "https://images.pokemontcg.io/sm5/14_hires.png"
    }
  },
  {
    "id": "sm5-15",
    "name": "Shaymin",
    "number": "15",
    "artist": "Mizue",
    "rarity": "Rare Holo",
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
        "name": "Coax",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 Basic Pokémon of different types and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Soothing Scent",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Asleep."
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
    "flavorText": "The blooming of Gracidea flowers confers the power of flight upon it. Feelings of gratitude are the message it delivers.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/15.png",
      "large": "https://images.pokemontcg.io/sm5/15_hires.png"
    }
  },
  {
    "id": "sm5-16",
    "name": "Dewpider",
    "number": "16",
    "artist": "Midori Harada",
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
      "Araquanid"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bubble",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
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
      751
    ],
    "flavorText": "It crawls onto the land in search of food. Its water bubble allows it to breathe and protects its soft head.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/16.png",
      "large": "https://images.pokemontcg.io/sm5/16_hires.png"
    }
  },
  {
    "id": "sm5-17",
    "name": "Araquanid",
    "number": "17",
    "artist": "Shin Nagasawa",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Dewpider",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Water Bubble",
        "text": "Prevent all damage done to this Pokémon by attacks from your opponent's Fire Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Aqua Edge",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      752
    ],
    "flavorText": "It delivers headbutts with the water bubble on its head. Small Pokémon get sucked into the bubble, where they drown.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/17.png",
      "large": "https://images.pokemontcg.io/sm5/17_hires.png"
    }
  },
  {
    "id": "sm5-18",
    "name": "Magmar",
    "number": "18",
    "artist": "Yumi",
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
      "Magmortar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Controlled Burn",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard the top card of your opponent's deck."
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
      126
    ],
    "flavorText": "When angered, it spouts brilliant fire from all over its body. It doesn't calm down until its opponent has burned to ash.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/18.png",
      "large": "https://images.pokemontcg.io/sm5/18_hires.png"
    }
  },
  {
    "id": "sm5-19",
    "name": "Magmortar",
    "number": "19",
    "artist": "nagimiso",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Magmar",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Incandescent Body",
        "text": "If this Pokémon is your Active Pokémon and is damaged by an opponent's attack (even if this Pokémon is Knocked Out), the Attacking Pokémon is now Burned.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Fire Blaster",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "You may discard 2 Energy from this Pokémon. If you do, this attack does 80 more damage."
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
    "flavorText": "From its arm, it launches fireballs hotter than 3,500 degrees Fahrenheit. Its arm starts to melt when it fires a whole barrage.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/19.png",
      "large": "https://images.pokemontcg.io/sm5/19_hires.png"
    }
  },
  {
    "id": "sm5-20",
    "name": "Chimchar",
    "number": "20",
    "artist": "Ken Sugimori",
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
      "Monferno"
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      390
    ],
    "flavorText": "The gas made in its belly burns from its rear end. The fire burns weakly when it feels sick.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/20.png",
      "large": "https://images.pokemontcg.io/sm5/20_hires.png"
    }
  },
  {
    "id": "sm5-21",
    "name": "Chimchar",
    "number": "21",
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
      "Monferno"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fury Swipes",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 3 coins. This attack does 10 damage for each heads."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/21.png",
      "large": "https://images.pokemontcg.io/sm5/21_hires.png"
    }
  },
  {
    "id": "sm5-22",
    "name": "Monferno",
    "number": "22",
    "artist": "Shigenori Negishi",
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
        "name": "Super Singe",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      391
    ],
    "flavorText": "It uses ceilings and walls to launch aerial attacks. Its fiery tail is but one weapon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/22.png",
      "large": "https://images.pokemontcg.io/sm5/22_hires.png"
    }
  },
  {
    "id": "sm5-23",
    "name": "Infernape",
    "number": "23",
    "artist": "nagimiso",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Monferno",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Flaming Fighter",
        "text": "Put 6 damage counters instead of 2 on your opponent's Burned Pokémon between turns.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Burst Punch",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      392
    ],
    "flavorText": "It tosses its enemies around with agility. It uses all its limbs to fight in its own unique style.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/23.png",
      "large": "https://images.pokemontcg.io/sm5/23_hires.png"
    }
  },
  {
    "id": "sm5-24",
    "name": "Heat Rotom",
    "number": "24",
    "artist": "Shin Nagasawa",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Roto Motor",
        "text": "If you have 9 or more Pokémon Tool cards in your discard pile, ignore all Energy in the attack cost of each of this Pokémon's attacks.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Heat Blast",
        "cost": [
          "Fire",
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
      479
    ],
    "flavorText": "Its body is composed of plasma. It is known to infiltrate electronic devices and wreak havoc.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/24.png",
      "large": "https://images.pokemontcg.io/sm5/24_hires.png"
    }
  },
  {
    "id": "sm5-25",
    "name": "Salandit",
    "number": "25",
    "artist": "Misa Tsutsui",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      757
    ],
    "flavorText": "Volcanoes or dry, craggy places are its home. It emanates a sweet-smelling poisonous gas that attracts bug Pokémon, then attacks them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/25.png",
      "large": "https://images.pokemontcg.io/sm5/25_hires.png"
    }
  },
  {
    "id": "sm5-26",
    "name": "Salazzle",
    "number": "26",
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
    "evolvesFrom": "Salandit",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Panic Poison",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Burned, Confused, and Poisoned."
      },
      {
        "name": "Hunter's Nails",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60+",
        "text": "If your opponent's Active Pokémon is affected by a Special Condition, this attack does 60 more damage."
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
    "flavorText": "Filled with pheromones, its poisonous gas can be diluted to use in the production of luscious perfumes.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/26.png",
      "large": "https://images.pokemontcg.io/sm5/26_hires.png"
    }
  },
  {
    "id": "sm5-27",
    "name": "Turtonator",
    "number": "27",
    "artist": "Anesaki Dynamic",
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
        "name": "Searing Flame",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Your opponent's Active Pokémon is now Burned."
      },
      {
        "name": "Steam Artillery",
        "cost": [
          "Fire",
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
      776
    ],
    "flavorText": "It gushes fire and poisonous gases from its nostrils. Its dung is an explosive substance and can be put to various uses.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/27.png",
      "large": "https://images.pokemontcg.io/sm5/27_hires.png"
    }
  },
  {
    "id": "sm5-28",
    "name": "Alolan Sandshrew",
    "number": "28",
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
      "Sandslash"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fury Swipes",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "10×",
        "text": "Flip 3 coins. This attack does 10 damage for each heads."
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
      27
    ],
    "flavorText": "An ancient tradition of Alolan festivals, still carried on to this day, is a competition to slide Sandshrew across ice as far as one can.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/28.png",
      "large": "https://images.pokemontcg.io/sm5/28_hires.png"
    }
  },
  {
    "id": "sm5-29",
    "name": "Alolan Sandslash",
    "number": "29",
    "artist": "Anesaki Dynamic",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Alolan Sandshrew",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spike Armor",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "30",
        "text": "During your opponent's next turn, if this Pokémon is damaged by an attack (even if this Pokémon is Knocked Out), put 6 damage counters on the Attacking Pokémon."
      },
      {
        "name": "Frost Breath",
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
      28
    ],
    "flavorText": "This Pokémon's steel spikes are sheathed in ice. Stabs from these spikes cause deep wounds and severe frostbite as well.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/29.png",
      "large": "https://images.pokemontcg.io/sm5/29_hires.png"
    }
  },
  {
    "id": "sm5-30",
    "name": "Alolan Vulpix",
    "number": "30",
    "artist": "Tomokazu Komiya",
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
      "Ninetales"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Roar",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Your opponent switches their Active Pokémon with 1 of their Benched Pokémon."
      },
      {
        "name": "Icy Snow",
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
      37
    ],
    "flavorText": "It exhales air colder than -58 degrees Fahrenheit. Elderly people in Alola call this Pokémon by an older name—Keokeo.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/30.png",
      "large": "https://images.pokemontcg.io/sm5/30_hires.png"
    }
  },
  {
    "id": "sm5-31",
    "name": "Piplup",
    "number": "31",
    "artist": "Ken Sugimori",
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
        "name": "Splatter",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 20 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/31.png",
      "large": "https://images.pokemontcg.io/sm5/31_hires.png"
    }
  },
  {
    "id": "sm5-32",
    "name": "Piplup",
    "number": "32",
    "artist": "Shibuzoh.",
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
      "Prinplup"
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/32.png",
      "large": "https://images.pokemontcg.io/sm5/32_hires.png"
    }
  },
  {
    "id": "sm5-33",
    "name": "Prinplup",
    "number": "33",
    "artist": "Mizue",
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
        "name": "Bubble Beam",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Wave Splash",
        "cost": [
          "Water",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      394
    ],
    "flavorText": "It lives a solitary life. Its wings deliver wicked blows that can snap even the thickest of trees.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/33.png",
      "large": "https://images.pokemontcg.io/sm5/33_hires.png"
    }
  },
  {
    "id": "sm5-34",
    "name": "Empoleon",
    "number": "34",
    "artist": "nagimiso",
    "rarity": "Rare",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Total Command",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage for each Benched Pokémon (both yours and your opponent's)."
      },
      {
        "name": "Whirlpool",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Discard an Energy from your opponent's Active Pokémon."
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/34.png",
      "large": "https://images.pokemontcg.io/sm5/34_hires.png"
    }
  },
  {
    "id": "sm5-35",
    "name": "Buizel",
    "number": "35",
    "artist": "so-taro",
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
      "Floatzel"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Water Gun",
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
    "flavorText": "It inflates the flotation sac around its neck and pokes its head out of the water to see what is going on.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/35.png",
      "large": "https://images.pokemontcg.io/sm5/35_hires.png"
    }
  },
  {
    "id": "sm5-36",
    "name": "Floatzel",
    "number": "36",
    "artist": "Naoyo Kimura",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Buizel",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Agility",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If heads, prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn."
      },
      {
        "name": "Aqua Blast",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "80",
        "text": "Discard a Water Energy from this Pokémon."
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
    "flavorText": "Its flotation sac developed as a result of pursuing aquatic prey. It can double as a rubber raft.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/36.png",
      "large": "https://images.pokemontcg.io/sm5/36_hires.png"
    }
  },
  {
    "id": "sm5-37",
    "name": "Snover",
    "number": "37",
    "artist": "match",
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
      "Abomasnow"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ice Shard",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "If your opponent's Active Pokémon is a Fighting Pokémon, this attack does 40 more damage."
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
    "flavorText": "In the spring, it grows berries with the texture of frozen treats around its belly.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/37.png",
      "large": "https://images.pokemontcg.io/sm5/37_hires.png"
    }
  },
  {
    "id": "sm5-38",
    "name": "Abomasnow",
    "number": "38",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Snover",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Blessings of the Frost",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may attach a Water Energy card from your discard pile to 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hypno Hammer",
        "cost": [
          "Water",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      460
    ],
    "flavorText": "It lives a quiet life on mountains that are perpetually covered in snow. It hides itself by whipping up blizzards.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/38.png",
      "large": "https://images.pokemontcg.io/sm5/38_hires.png"
    }
  },
  {
    "id": "sm5-39",
    "name": "Glaceon-GX",
    "number": "39",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Freezing Gaze",
        "text": "As long as this Pokémon is your Active Pokémon, your opponent's Pokémon-GX and Pokémon-EX in play, in their hand, and in their discard pile have no Abilities, except for Freezing Gaze.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Frost Bullet",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "This attack does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Polar Spear-GX",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50×",
        "text": "This attack does 50 damage for each damage counter on your opponent's Active Pokémon. (You can't use more than 1 GX attack in a game.)"
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
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/39.png",
      "large": "https://images.pokemontcg.io/sm5/39_hires.png"
    }
  },
  {
    "id": "sm5-40",
    "name": "Wash Rotom",
    "number": "40",
    "artist": "Shigenori Negishi",
    "rarity": "Rare",
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
    "abilities": [
      {
        "name": "Roto Motor",
        "text": "If you have 9 or more Pokémon Tool cards in your discard pile, ignore all Energy in the attack cost of each of this Pokémon's attacks.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Wash Arrow",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 50 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      479
    ],
    "flavorText": "Its body is composed of plasma. It is known to infiltrate electronic devices and wreak havoc.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/40.png",
      "large": "https://images.pokemontcg.io/sm5/40_hires.png"
    }
  },
  {
    "id": "sm5-41",
    "name": "Frost Rotom",
    "number": "41",
    "artist": "MAHOU",
    "rarity": "Rare",
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
    "abilities": [
      {
        "name": "Roto Motor",
        "text": "If you have 9 or more Pokémon Tool cards in your discard pile, ignore all Energy in the attack cost of each of this Pokémon's attacks.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Frost Crush",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "This attack does 20 more damage times the amount of Energy attached to all of your opponent's Pokémon."
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
      479
    ],
    "flavorText": "Its body is composed of plasma. It is known to infiltrate electronic devices and wreak havoc.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/41.png",
      "large": "https://images.pokemontcg.io/sm5/41_hires.png"
    }
  },
  {
    "id": "sm5-42",
    "name": "Manaphy",
    "number": "42",
    "artist": "kawayoo",
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
        "name": "Deep Currents",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Shuffle 5 Water Energy cards from your discard pile into your deck."
      },
      {
        "name": "Water Pulse",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Your opponent's Active Pokémon is now Asleep."
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
      490
    ],
    "flavorText": "It starts its life with a wondrous power that permits it to bond with any kind of Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/42.png",
      "large": "https://images.pokemontcg.io/sm5/42_hires.png"
    }
  },
  {
    "id": "sm5-43",
    "name": "Electabuzz",
    "number": "43",
    "artist": "Kouki Saitou",
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
        "name": "Low Kick",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Thunder",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      125
    ],
    "flavorText": "Electricity leaks from it in amounts far greater than the amount of electricity it eats.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/43.png",
      "large": "https://images.pokemontcg.io/sm5/43_hires.png"
    }
  },
  {
    "id": "sm5-44",
    "name": "Electivire",
    "number": "44",
    "artist": "Anesaki Dynamic",
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
        "name": "Steel Short",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "If your opponent's Active Pokémon is a Metal Pokémon, it is now Paralyzed."
      },
      {
        "name": "Volt Knuckle",
        "cost": [
          "Lightning",
          "Lightning",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      466
    ],
    "flavorText": "When it gets excited, it thumps its chest. With every thud, thunder roars and electric sparks shower all around.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/44.png",
      "large": "https://images.pokemontcg.io/sm5/44_hires.png"
    }
  },
  {
    "id": "sm5-45",
    "name": "Shinx",
    "number": "45",
    "artist": "Shibuzoh.",
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
      "Luxio"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Evolutionary Advantage",
        "text": "If you go second, this Pokémon can evolve during your first turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Static Shock",
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
    "flavorText": "All of its fur dazzles if danger is sensed. It flees while the foe is momentarily blinded.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/45.png",
      "large": "https://images.pokemontcg.io/sm5/45_hires.png"
    }
  },
  {
    "id": "sm5-46",
    "name": "Shinx",
    "number": "46",
    "artist": "Ken Sugimori",
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
        "name": "Charge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Lightning Energy card and attach it to this Pokémon. Then, shuffle your deck."
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
    "flavorText": "All of its fur dazzles if danger is sensed. It flees while the foe is momentarily blinded.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/46.png",
      "large": "https://images.pokemontcg.io/sm5/46_hires.png"
    }
  },
  {
    "id": "sm5-47",
    "name": "Luxio",
    "number": "47",
    "artist": "tetsuya koizumi",
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
        "name": "Disconnect",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Your opponent can't play any Item cards from their hand during their next turn."
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
    "flavorText": "Strong electricity courses through the tips of its sharp claws. A light scratch causes fainting in foes.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/47.png",
      "large": "https://images.pokemontcg.io/sm5/47_hires.png"
    }
  },
  {
    "id": "sm5-48",
    "name": "Luxray",
    "number": "48",
    "artist": "Akira Komayama",
    "rarity": "Rare Holo",
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
    "abilities": [
      {
        "name": "Intimidating Fang",
        "text": "As long as this Pokémon is your Active Pokémon, your opponent's Active Pokémon's attacks do 30 less damage (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Volt Bolt",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard all Lightning Energy from this Pokémon. This attack does 150 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      405
    ],
    "flavorText": "Luxray's ability to see through objects comes in handy when it's scouting for danger.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/48.png",
      "large": "https://images.pokemontcg.io/sm5/48_hires.png"
    }
  },
  {
    "id": "sm5-49",
    "name": "Pachirisu",
    "number": "49",
    "artist": "OOYAMA",
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
        "name": "Snuggly Generator",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "For each of your Benched Pokémon that has the Nuzzle attack, search your deck for a Lightning Energy card and attach it to that Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Nuzzle",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
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
      417
    ],
    "flavorText": "A pair may be seen rubbing their cheek pouches together in an effort to share stored electricity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/49.png",
      "large": "https://images.pokemontcg.io/sm5/49_hires.png"
    }
  },
  {
    "id": "sm5-50",
    "name": "Rotom",
    "number": "50",
    "artist": "Naoyo Kimura",
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
    "abilities": [
      {
        "name": "Roto Motor",
        "text": "If you have 9 or more Pokémon Tool cards in your discard pile, ignore all Energy in the attack cost of each of this Pokémon's attacks.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Plasma Slice",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This Pokémon can't attack during your next turn."
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
      "small": "https://images.pokemontcg.io/sm5/50.png",
      "large": "https://images.pokemontcg.io/sm5/50_hires.png"
    }
  },
  {
    "id": "sm5-51",
    "name": "Drifloon",
    "number": "51",
    "artist": "Asako Ito",
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
      "Drifblim"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Creepy Wind",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Confused."
      },
      {
        "name": "Hang Down",
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
      425
    ],
    "flavorText": "If for some reason its body bursts, its soul spills out with a screaming sound.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/51.png",
      "large": "https://images.pokemontcg.io/sm5/51_hires.png"
    }
  },
  {
    "id": "sm5-52",
    "name": "Drifblim",
    "number": "52",
    "artist": "Yumi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Drifloon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Damage Transport",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Move 4 damage counters from each of your Pokémon to your opponent's Active Pokémon."
      },
      {
        "name": "Wind Wheel",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
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
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      426
    ],
    "flavorText": "Even while under careful observation, large flocks of Drifblim flying at dusk will inexplicably disappear from view.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/52.png",
      "large": "https://images.pokemontcg.io/sm5/52_hires.png"
    }
  },
  {
    "id": "sm5-53",
    "name": "Spiritomb",
    "number": "53",
    "artist": "Shin Nagasawa",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Lightless World",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put 2 Supporter cards from your discard pile into your hand."
      },
      {
        "name": "Terrify",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "If the Defending Pokémon is a Basic Pokémon, it can't attack during your opponent's next turn."
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
    "flavorText": "It was bound to a fissure in an Odd Keystone as punishment for misdeeds 500 years ago.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/53.png",
      "large": "https://images.pokemontcg.io/sm5/53_hires.png"
    }
  },
  {
    "id": "sm5-54",
    "name": "Skorupi",
    "number": "54",
    "artist": "Misa Tsutsui",
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
    "evolvesTo": [
      "Drapion"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hone Claws",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your next turn, this Pokémon's Pierce attack's base damage is 90."
      },
      {
        "name": "Pierce",
        "cost": [
          "Psychic",
          "Psychic"
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
      451
    ],
    "flavorText": "It burrows under the sand to lie in wait for prey. Its tail claws can inject its prey with a savage poison.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/54.png",
      "large": "https://images.pokemontcg.io/sm5/54_hires.png"
    }
  },
  {
    "id": "sm5-55",
    "name": "Drapion",
    "number": "55",
    "artist": "Studio Bora Inc.",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Skorupi",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dangerous Stinger",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": "Your opponent's Active Pokémon is now Paralyzed and Poisoned."
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
      452
    ],
    "flavorText": "It has the power in its clawed arms to make scrap of a car. The tips of its claws release poison.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/55.png",
      "large": "https://images.pokemontcg.io/sm5/55_hires.png"
    }
  },
  {
    "id": "sm5-56",
    "name": "Croagunk",
    "number": "56",
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
      "Toxicroak"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Swagger",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
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
      453
    ],
    "flavorText": "Inflating its poison sacs, it fills the area with an odd sound and hits flinching opponents with a poison jab.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/56.png",
      "large": "https://images.pokemontcg.io/sm5/56_hires.png"
    }
  },
  {
    "id": "sm5-57",
    "name": "Toxicroak",
    "number": "57",
    "artist": "Hasuno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Croagunk",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Jab",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Poisoned."
      },
      {
        "name": "Exact Revenge",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50+",
        "text": "If any of your Fighting Pokémon were Knocked Out by damage from an opponent's attack during their last turn, this attack does 70 more damage."
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
      454
    ],
    "flavorText": "Its knuckle claws secrete a toxin so vile that even a scratch could prove fatal.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/57.png",
      "large": "https://images.pokemontcg.io/sm5/57_hires.png"
    }
  },
  {
    "id": "sm5-58",
    "name": "Giratina ◇",
    "number": "58",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Prism Star",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Prism Star"
    ],
    "hp": "160",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "◇ (Prism Star) Rule: You can't have more than 1 ◇ card with the same name in your deck. If a ◇ card would go to the discard pile, put it in the Lost Zone instead."
    ],
    "abilities": [
      {
        "name": "Chaotic Star",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may attach 2 Psychic Energy cards from your hand to it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Crisis Dive",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 4,
        "damage": "160",
        "text": "Discard 2 Energy from this Pokémon."
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
      487
    ],
    "flavorText": "It was banished for its violence. It silently gazed upon the old world from the Distortion World.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/58.png",
      "large": "https://images.pokemontcg.io/sm5/58_hires.png"
    }
  },
  {
    "id": "sm5-59",
    "name": "Cresselia",
    "number": "59",
    "artist": "chibi",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Lunar Payback",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard an Energy from this Pokémon. If you do, switch all damage counters on this Pokémon with those on your opponent's Active Pokémon."
      },
      {
        "name": "Psychic",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "This attack does 20 more damage times the amount of Energy attached to your opponent's Active Pokémon."
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
      488
    ],
    "flavorText": "Those who sleep holding Cresselia's feather are assured of joyful dreams. It is said to represent the crescent moon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/59.png",
      "large": "https://images.pokemontcg.io/sm5/59_hires.png"
    }
  },
  {
    "id": "sm5-60",
    "name": "Cosmog",
    "number": "60",
    "artist": "Shin Nagasawa",
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
      "Cosmoem"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Teleport",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
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
      789
    ],
    "flavorText": "Its body is gaseous and frail. It slowly grows as it collects dust from the atmosphere.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/60.png",
      "large": "https://images.pokemontcg.io/sm5/60_hires.png"
    }
  },
  {
    "id": "sm5-61",
    "name": "Cosmoem",
    "number": "61",
    "artist": "Sanosuke Sakuma",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Cosmog",
    "evolvesTo": [
      "Solgaleo",
      "Lunala"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Teleport",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
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
      790
    ],
    "flavorText": "There's something accumulating around the black core within its hard shell. People think this Pokémon may come from another world.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/61.png",
      "large": "https://images.pokemontcg.io/sm5/61_hires.png"
    }
  },
  {
    "id": "sm5-62",
    "name": "Lunala ◇",
    "number": "62",
    "artist": "Hitoshi Ariga",
    "rarity": "Rare Prism Star",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Prism Star"
    ],
    "hp": "160",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "◇ (Prism Star) Rule: You can't have more than 1 ◇ card with the same name in your deck. If a ◇ card would go to the discard pile, put it in the Lost Zone instead."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Full Moon Star",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "For each of your opponent's Pokémon in play, attach a Psychic Energy card from your discard pile to your Pokémon in any way you like."
      },
      {
        "name": "Psystorm",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 4,
        "damage": "20×",
        "text": "This attack does 20 damage times the amount of Energy attached to all Pokémon."
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
      792
    ],
    "flavorText": "Said to live in another world, this Pokémon devours light, drawing the moonless dark veil of night over the brightness of day.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/62.png",
      "large": "https://images.pokemontcg.io/sm5/62_hires.png"
    }
  },
  {
    "id": "sm5-63",
    "name": "Dawn Wings Necrozma-GX",
    "number": "63",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "180",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Invasion",
        "text": "Once during your turn (before your attack), if this Pokémon is on your Bench, you may switch it with your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dark Flash",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This attack's damage isn't affected by Resistance."
      },
      {
        "name": "Moon's Eclipse-GX",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
        "text": "You can use this attack only if you have more Prize cards remaining than your opponent. Prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn. (You can't use more than 1 GX attack in a game.)"
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
      800
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/63.png",
      "large": "https://images.pokemontcg.io/sm5/63_hires.png"
    }
  },
  {
    "id": "sm5-64",
    "name": "Cranidos",
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
    "evolvesFrom": "Unidentified Fossil",
    "evolvesTo": [
      "Rampardos"
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
        "damage": "30",
        "text": ""
      },
      {
        "name": "Headstrike",
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
      408
    ],
    "flavorText": "In rock layers where Cranidos fossils are found, the fossilized trunks of trees snapped in two are also often found.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/64.png",
      "large": "https://images.pokemontcg.io/sm5/64_hires.png"
    }
  },
  {
    "id": "sm5-65",
    "name": "Rampardos",
    "number": "65",
    "artist": "Yoshinobu Saito",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Cranidos",
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
        "damage": "60+",
        "text": "If your opponent's Active Pokémon is an Evolution Pokémon, this attack does 60 more damage."
      },
      {
        "name": "Wild Crash",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "If your opponent's Active Pokémon is a Basic Pokémon, it is Knocked Out."
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
      409
    ],
    "flavorText": "Records exist of a revived fossil that evolved into Rampardos. It proceeded to escape and then destroy a skyscraper with a headbutt.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/65.png",
      "large": "https://images.pokemontcg.io/sm5/65_hires.png"
    }
  },
  {
    "id": "sm5-66",
    "name": "Riolu",
    "number": "66",
    "artist": "Kyoko Umemoto",
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
        "name": "Detect",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn."
      },
      {
        "name": "Jab",
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
    "flavorText": "It's tough enough to run right through the night, and it's also a hard worker, but it's still just a youngster.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/66.png",
      "large": "https://images.pokemontcg.io/sm5/66_hires.png"
    }
  },
  {
    "id": "sm5-67",
    "name": "Lucario",
    "number": "67",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Riolu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Precognitive Aura",
        "text": "Once during your turn (before your attack), if you have Garchomp in play, you may search your deck for a card and put it into your hand. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Missile Jab",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
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
      448
    ],
    "flavorText": "They can detect the species of a living being—and its emotions—from over half a mile away. They control auras and hunt their prey in packs.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/67.png",
      "large": "https://images.pokemontcg.io/sm5/67_hires.png"
    }
  },
  {
    "id": "sm5-68",
    "name": "Hippopotas",
    "number": "68",
    "artist": "Yumi",
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
      "Hippowdon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Eleventh Hour Tackle",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "If there are 3 or fewer cards in your deck, this attack does 130 more damage."
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
      449
    ],
    "flavorText": "It enshrouds itself with sand to protect itself from germs. It does not enjoy getting wet.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/68.png",
      "large": "https://images.pokemontcg.io/sm5/68_hires.png"
    }
  },
  {
    "id": "sm5-69",
    "name": "Hippowdon",
    "number": "69",
    "artist": "Shigenori Negishi",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Hippopotas",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sand Tomb",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      },
      {
        "name": "Dust Cannon",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100+",
        "text": "This attack does 10 more damage for each Colorless in your opponent's Active Pokémon's Retreat Cost."
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
    "flavorText": "It blasts internally stored sand from ports on its body to create a towering twister for attack.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/69.png",
      "large": "https://images.pokemontcg.io/sm5/69_hires.png"
    }
  },
  {
    "id": "sm5-70",
    "name": "Passimian",
    "number": "70",
    "artist": "kawayoo",
    "rarity": "Common",
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
        "name": "Power Huddle",
        "text": "As long as this Pokémon is on your Bench, your Passimian's attacks do 30 more damage to your opponent's Active Evolution Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rock Hurl",
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
      766
    ],
    "flavorText": "They battle with hard berries for weapons. Their techniques are passed from the boss to the group, generation upon generation.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/70.png",
      "large": "https://images.pokemontcg.io/sm5/70_hires.png"
    }
  },
  {
    "id": "sm5-71",
    "name": "Murkrow",
    "number": "71",
    "artist": "match",
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
        "name": "Mean Look",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
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
    "flavorText": "Seen as a symbol of bad luck, it's generally disliked. Yet it gives presents—objects that sparkle or shine—to Trainers it's close to.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/71.png",
      "large": "https://images.pokemontcg.io/sm5/71_hires.png"
    }
  },
  {
    "id": "sm5-72",
    "name": "Honchkrow",
    "number": "72",
    "artist": "Hitoshi Ariga",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Murkrow",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rip and Run",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard a random card from your opponent's hand. Switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Speed Dive",
        "cost": [
          "Darkness",
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
      430
    ],
    "flavorText": "If its Murkrow cronies fail to catch food for it, or if it feels they have betrayed it, it will hunt them down wherever they are and punish them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/72.png",
      "large": "https://images.pokemontcg.io/sm5/72_hires.png"
    }
  },
  {
    "id": "sm5-73",
    "name": "Sneasel",
    "number": "73",
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
      "Weavile"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sneaky Smash",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "You can use this attack only if you go second, and only on your first turn. Discard an Energy from 1 of your opponent's Pokémon."
      },
      {
        "name": "Ambush",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
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
    "flavorText": "It uses its claws to poke holes in eggs so it can slurp out the insides. Breeders consider it a scourge and will drive it away or eradicate it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/73.png",
      "large": "https://images.pokemontcg.io/sm5/73_hires.png"
    }
  },
  {
    "id": "sm5-74",
    "name": "Weavile",
    "number": "74",
    "artist": "Misa Tsutsui",
    "rarity": "Rare Holo",
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
        "name": "Icy Wind",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Evil Admonition",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "This attack does 50 damage for each of your opponent's Pokémon that has an Ability."
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
    "flavorText": "They dwell in cold places. This Pokémon's main food source in Alola is Vulpix and Sandshrew, which they carefully divide among their group.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/74.png",
      "large": "https://images.pokemontcg.io/sm5/74_hires.png"
    }
  },
  {
    "id": "sm5-75",
    "name": "Stunky",
    "number": "75",
    "artist": "Naoyo Kimura",
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
      "Skuntank"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gas Bond",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Both Active Pokémon are now Confused."
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
      434
    ],
    "flavorText": "It protects itself by spraying a noxious fluid from its rear. The stench lingers for 24 hours.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/75.png",
      "large": "https://images.pokemontcg.io/sm5/75_hires.png"
    }
  },
  {
    "id": "sm5-76",
    "name": "Skuntank",
    "number": "76",
    "artist": "Studio Bora Inc.",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Stunky",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sticky Smokescreen",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "If the Defending Pokémon tries to attack during your opponent's next turn, your opponent flips 2 coins. If either of them is tails, that attack does nothing."
      },
      {
        "name": "Hammer In",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      435
    ],
    "flavorText": "It sprays a stinky fluid from its tail. The fluid smells worse the longer it is allowed to fester.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/76.png",
      "large": "https://images.pokemontcg.io/sm5/76_hires.png"
    }
  },
  {
    "id": "sm5-77",
    "name": "Darkrai ◇",
    "number": "77",
    "artist": "Naoki Saito",
    "rarity": "Rare Prism Star",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Prism Star"
    ],
    "hp": "160",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "◇ (Prism Star) Rule: You can't have more than 1 ◇ card with the same name in your deck. If a ◇ card would go to the discard pile, put it in the Lost Zone instead."
    ],
    "abilities": [
      {
        "name": "Nightmare Star",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may attach 2 Darkness Energy cards from your hand to it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Abyssal Sleep",
        "cost": [
          "Darkness",
          "Darkness",
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 4,
        "damage": "120",
        "text": "Your opponent's Active Pokémon is now Asleep. Your opponent flips 2 coins instead of 1 between turns. If either of them is tails, that Pokémon is still Asleep."
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
      491
    ],
    "flavorText": "It can lull people to sleep and make them dream. It is active during nights of the new moon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/77.png",
      "large": "https://images.pokemontcg.io/sm5/77_hires.png"
    }
  },
  {
    "id": "sm5-78",
    "name": "Alolan Diglett",
    "number": "78",
    "artist": "Naoyo Kimura",
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
        "name": "Iron Head",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "10×",
        "text": "Flip a coin until you get tails. This attack does 10 damage for each heads."
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
    "flavorText": "Its golden hairs function as sensors. It pokes them out of its burrow to monitor its surroundings.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/78.png",
      "large": "https://images.pokemontcg.io/sm5/78_hires.png"
    }
  },
  {
    "id": "sm5-79",
    "name": "Alolan Dugtrio",
    "number": "79",
    "artist": "Megumi Mizutani",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Alolan Diglett",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gold Rush",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "30×",
        "text": "Discard any number of Metal Energy cards from your hand. This attack does 30 damage for each card you discarded in this way."
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
    "flavorText": "These Pokémon are cherished in the Alola region, where they are thought to be feminine deities of the land incarnate.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/79.png",
      "large": "https://images.pokemontcg.io/sm5/79_hires.png"
    }
  },
  {
    "id": "sm5-80",
    "name": "Magnemite",
    "number": "80",
    "artist": "MAHOU",
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
      "Magneton"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Searching Magnet",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 Metal Energy cards, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Tackle",
        "cost": [
          "Metal"
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
      81
    ],
    "flavorText": "It sends out electromagnetic waves, which let it float through the air. Touching it while it's eating electricity will give you a full-body shock.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/80.png",
      "large": "https://images.pokemontcg.io/sm5/80_hires.png"
    }
  },
  {
    "id": "sm5-81",
    "name": "Magnemite",
    "number": "81",
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
      "Magneton"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Solid Unit",
        "text": "As long as this Pokémon is on your Bench, prevent all damage done to this Pokémon by attacks (both yours and your opponent's).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Ram",
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
      81
    ],
    "flavorText": "It sends out electromagnetic waves, which let it float through the air. Touching it while it's eating electricity will give you a full-body shock.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/81.png",
      "large": "https://images.pokemontcg.io/sm5/81_hires.png"
    }
  },
  {
    "id": "sm5-82",
    "name": "Magneton",
    "number": "82",
    "artist": "kirisAki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Magnemite",
    "evolvesTo": [
      "Magnezone"
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
        "damage": "20",
        "text": ""
      },
      {
        "name": "Zap Cannon",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "This Pokémon can't use Zap Cannon during your next turn."
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
      82
    ],
    "flavorText": "It has about three times the electrical power of Magnemite. For some reason, outbreaks of this Pokémon happen when lots of sunspots appear.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/82.png",
      "large": "https://images.pokemontcg.io/sm5/82_hires.png"
    }
  },
  {
    "id": "sm5-83",
    "name": "Magnezone",
    "number": "83",
    "artist": "Yoshinobu Saito",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Magneton",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Magnetic Circuit",
        "text": "As often as you like during your turn (before your attack), you may attach a Metal Energy card from your hand to 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Zap Cannon",
        "cost": [
          "Metal",
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "130",
        "text": "This Pokémon can't use Zap Cannon during your next turn."
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
      462
    ],
    "flavorText": "As it zooms through the sky, this Pokémon seems to be receiving signals of unknown origin, while transmitting signals of unknown purpose.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/83.png",
      "large": "https://images.pokemontcg.io/sm5/83_hires.png"
    }
  },
  {
    "id": "sm5-84",
    "name": "Shieldon",
    "number": "84",
    "artist": "so-taro",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Unidentified Fossil",
    "evolvesTo": [
      "Bastiodon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Take Down",
        "cost": [
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "This Pokémon does 10 damage to itself."
      },
      {
        "name": "Confront",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
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
      410
    ],
    "flavorText": "This Pokémon lived in primeval jungles. Few enemies would have been willing to square off against its heavily armored face, so it's thought.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/84.png",
      "large": "https://images.pokemontcg.io/sm5/84_hires.png"
    }
  },
  {
    "id": "sm5-85",
    "name": "Bastiodon",
    "number": "85",
    "artist": "Hasuno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Shieldon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Earthen Shield",
        "text": "Prevent all damage done to your Metal Pokémon by attacks from your opponent's Pokémon that have any Special Energy attached to them.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Push Down",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "You may have your opponent switch their Active Pokémon with 1 of their Benched Pokémon."
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
      411
    ],
    "flavorText": "It lived in the same environments as Rampardos. Their fossils have been found together—seemingly from after they'd fought to the finish.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/85.png",
      "large": "https://images.pokemontcg.io/sm5/85_hires.png"
    }
  },
  {
    "id": "sm5-86",
    "name": "Bronzor",
    "number": "86",
    "artist": "Sumiyoshi Kizuki",
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
      "Bronzong"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hypnosis",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Spinning Attack",
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
      436
    ],
    "flavorText": "Implements shaped like it were discovered in ancient tombs. It is unknown if they are related.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/86.png",
      "large": "https://images.pokemontcg.io/sm5/86_hires.png"
    }
  },
  {
    "id": "sm5-87",
    "name": "Bronzong",
    "number": "87",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Bronzor",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psy Bolt",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Psychic Resonance",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "If your opponent has any Psychic Pokémon in play, this attack does 60 more damage."
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
      437
    ],
    "flavorText": "Ancient people believed that petitioning Bronzong for rain was the way to make crops grow.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/87.png",
      "large": "https://images.pokemontcg.io/sm5/87_hires.png"
    }
  },
  {
    "id": "sm5-88",
    "name": "Heatran",
    "number": "88",
    "artist": "tetsuya koizumi",
    "rarity": "Rare Holo",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Guard Press",
        "cost": [
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Boiling Impact",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "Discard 2 Energy from this Pokémon."
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
      485
    ],
    "flavorText": "Boiling blood, like magma, circulates through its body. It makes its dwelling place in volcanic caves.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/88.png",
      "large": "https://images.pokemontcg.io/sm5/88_hires.png"
    }
  },
  {
    "id": "sm5-89",
    "name": "Solgaleo ◇",
    "number": "89",
    "artist": "Shin Nagasawa",
    "rarity": "Rare Prism Star",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Prism Star"
    ],
    "hp": "160",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "◇ (Prism Star) Rule: You can't have more than 1 ◇ card with the same name in your deck. If a ◇ card would go to the discard pile, put it in the Lost Zone instead."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Radiant Star",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "For each of your opponent's Pokémon in play, attach a Metal Energy card from your discard pile to your Pokémon in any way you like."
      },
      {
        "name": "Corona Impact",
        "cost": [
          "Metal",
          "Metal",
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 4,
        "damage": "160",
        "text": "This Pokémon can't attack during your next turn."
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
      791
    ],
    "flavorText": "This Pokémon is said to be a male evolution of Cosmog. At the activation of its third eye, it departs for another world.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/89.png",
      "large": "https://images.pokemontcg.io/sm5/89_hires.png"
    }
  },
  {
    "id": "sm5-90",
    "name": "Dusk Mane Necrozma-GX",
    "number": "90",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "190",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Claw Slash",
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
        "name": "Meteor Tempest",
        "cost": [
          "Metal",
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "220",
        "text": "Discard 3 Energy from this Pokémon."
      },
      {
        "name": "Sun's Eclipse-GX",
        "cost": [
          "Metal",
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "250",
        "text": "You can use this attack only if you have more Prize cards remaining than your opponent. (You can't use more than 1 GX attack in a game.)"
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
      800
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/90.png",
      "large": "https://images.pokemontcg.io/sm5/90_hires.png"
    }
  },
  {
    "id": "sm5-91",
    "name": "Magearna",
    "number": "91",
    "artist": "kawayoo",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Change Clothes",
        "text": "Once during your turn (before your attack), you may put a Pokémon Tool card attached to 1 of your Pokémon into your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rolling Attack",
        "cost": [
          "Metal",
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
      801
    ],
    "flavorText": "This artificial Pokémon, constructed more than 500 years ago, can understand human speech but cannot itself speak.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/91.png",
      "large": "https://images.pokemontcg.io/sm5/91_hires.png"
    }
  },
  {
    "id": "sm5-92",
    "name": "Morelull",
    "number": "92",
    "artist": "Midori Harada",
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
      "Shiinotic"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flickering Spores",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Ram",
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
      755
    ],
    "flavorText": "It scatters spores that flicker and glow. Anyone seeing these lights falls into a deep slumber.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/92.png",
      "large": "https://images.pokemontcg.io/sm5/92_hires.png"
    }
  },
  {
    "id": "sm5-93",
    "name": "Shiinotic",
    "number": "93",
    "artist": "kawayoo",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Morelull",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Illuminate",
        "text": "Once during your turn (before your attack), you may search your deck for a Fairy Pokémon, reveal it, and put it into your hand. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Flickering Spores",
        "cost": [
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      756
    ],
    "flavorText": "Forests where Shiinotic live are treacherous to enter at night. People confused by its strange lights can never find their way home again.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/93.png",
      "large": "https://images.pokemontcg.io/sm5/93_hires.png"
    }
  },
  {
    "id": "sm5-94",
    "name": "Tapu Lele",
    "number": "94",
    "artist": "Shin Nagasawa",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psywave",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "This attack does 20 damage times the amount of Energy attached to your opponent's Active Pokémon."
      },
      {
        "name": "Magical Swap",
        "cost": [
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Move any number of damage counters on your opponent's Pokémon to their other Pokémon in any way you like."
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
      786
    ],
    "flavorText": "This guardian deity of Akala is guilelessly cruel. The fragrant aroma of flowers is the source of its energy.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/94.png",
      "large": "https://images.pokemontcg.io/sm5/94_hires.png"
    }
  },
  {
    "id": "sm5-95",
    "name": "Alolan Exeggutor",
    "number": "95",
    "artist": "Hasuno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Exeggcute",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Exeggutor's Paradise",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "For each of your Benched Exeggcute, search your deck for an Alolan Exeggutor or Alolan Exeggutor-GX and put it onto that Exeggcute to evolve it. Then, shuffle your deck."
      },
      {
        "name": "Draco Meteor Barrage",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80×",
        "text": "Flip a coin for each Grass Energy attached to this Pokémon. This attack does 80 damage for each heads."
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
      103
    ],
    "flavorText": "Alola is the best environment for this Pokémon. Local people take pride in its appearance, saying this is how Exeggutor ought to look.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/95.png",
      "large": "https://images.pokemontcg.io/sm5/95_hires.png"
    }
  },
  {
    "id": "sm5-96",
    "name": "Gible",
    "number": "96",
    "artist": "Kyoko Umemoto",
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
      "Gabite"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ascension",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a card that evolves from this Pokémon and put it onto this Pokémon to evolve it. Then, shuffle your deck."
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
      443
    ],
    "flavorText": "It skulks in caves, and when prey or an enemy passes by, it leaps out and chomps them. The force of its attack sometimes chips its teeth.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/96.png",
      "large": "https://images.pokemontcg.io/sm5/96_hires.png"
    }
  },
  {
    "id": "sm5-97",
    "name": "Gible",
    "number": "97",
    "artist": "Ken Sugimori",
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
      "Gabite"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Rock Hiding",
        "text": "If this Pokémon has any Fighting Energy attached to it, it has no Retreat Cost.",
        "type": "Ability"
      }
    ],
    "attacks": [
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
      443
    ],
    "flavorText": "It skulks in caves, and when prey or an enemy passes by, it leaps out and chomps them. The force of its attack sometimes chips its teeth.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/97.png",
      "large": "https://images.pokemontcg.io/sm5/97_hires.png"
    }
  },
  {
    "id": "sm5-98",
    "name": "Gabite",
    "number": "98",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
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
        "name": "Ascension",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a card that evolves from this Pokémon and put it onto this Pokémon to evolve it. Then, shuffle your deck."
      },
      {
        "name": "Slash",
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
      444
    ],
    "flavorText": "Shiny objects are its passion. It can be found in its cave, scarcely moving, its gaze fixed on the jewels it's amassed or Carbink it has caught.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/98.png",
      "large": "https://images.pokemontcg.io/sm5/98_hires.png"
    }
  },
  {
    "id": "sm5-99",
    "name": "Garchomp",
    "number": "99",
    "artist": "Megumi Mizutani",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Gabite",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Quick Dive",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 50 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Royal Blades",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100+",
        "text": "If you played Cynthia from your hand during this turn, this attack does 100 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      445
    ],
    "flavorText": "The protuberances on its head serve as sensors. It can even detect distant prey.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/99.png",
      "large": "https://images.pokemontcg.io/sm5/99_hires.png"
    }
  },
  {
    "id": "sm5-100",
    "name": "Dialga-GX",
    "number": "100",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "180",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Overclock",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw cards until you have 6 cards in your hand."
      },
      {
        "name": "Shred",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      },
      {
        "name": "Timeless-GX",
        "cost": [
          "Metal",
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "150",
        "text": "Take another turn after this one. (Skip the between-turns step.) (You can't use more than 1 GX attack in a game.)"
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
      483
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/100.png",
      "large": "https://images.pokemontcg.io/sm5/100_hires.png"
    }
  },
  {
    "id": "sm5-101",
    "name": "Palkia-GX",
    "number": "101",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "180",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Spatial Control",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Move any number of Energy from your Benched Pokémon to this Pokémon."
      },
      {
        "name": "Hydro Pressure",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "This attack does 20 more damage times the amount of Water Energy attached to this Pokémon."
      },
      {
        "name": "Zero Vanish-GX",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "150",
        "text": "Shuffle all Energy from each of your opponent's Pokémon into their deck. (You can't use more than 1 GX attack in a game.)"
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
      484
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/101.png",
      "large": "https://images.pokemontcg.io/sm5/101_hires.png"
    }
  },
  {
    "id": "sm5-102",
    "name": "Lickitung",
    "number": "102",
    "artist": "Mizue",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
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
        "name": "Lap Up",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Draw 3 cards."
      },
      {
        "name": "Slam",
        "cost": [
          "Colorless",
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
    "flavorText": "Its tongue is twice the length of its body. It can be moved like an arm for grabbing food and attacking.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/102.png",
      "large": "https://images.pokemontcg.io/sm5/102_hires.png"
    }
  },
  {
    "id": "sm5-103",
    "name": "Lickilicky",
    "number": "103",
    "artist": "Yumi",
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
        "name": "Dangerous Lick",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "Flip a coin until you get tails. This attack does 50 more damage for each heads. If the first flip is tails, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Rolling Tackle",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
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
      463
    ],
    "flavorText": "Their saliva contains lots of components that can dissolve anything. The numbness caused by their lick does not dissipate.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/103.png",
      "large": "https://images.pokemontcg.io/sm5/103_hires.png"
    }
  },
  {
    "id": "sm5-104",
    "name": "Eevee",
    "number": "104",
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
        "name": "Gnaw",
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
    "flavorText": "Current studies show it can evolve into an incredible eight different species of Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/104.png",
      "large": "https://images.pokemontcg.io/sm5/104_hires.png"
    }
  },
  {
    "id": "sm5-105",
    "name": "Eevee",
    "number": "105",
    "artist": "Hideki Ishikawa",
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
        "name": "Palette of Friends",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10×",
        "text": "This attack does 10 damage for each different type of Pokémon on your Bench."
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
    "flavorText": "Possessing an unbalanced and unstable genetic makeup, it conceals many possible evolutions.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/105.png",
      "large": "https://images.pokemontcg.io/sm5/105_hires.png"
    }
  },
  {
    "id": "sm5-106",
    "name": "Buneary",
    "number": "106",
    "artist": "Kagemaru Himeno",
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
        "name": "Weak Kneed",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If the Defending Pokémon tries to attack during your opponent's next turn, your opponent flips a coin. If tails, that attack does nothing."
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
    "flavorText": "When it senses danger, it perks up its ears. On cold nights, it sleeps with its head tucked into its fur.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/106.png",
      "large": "https://images.pokemontcg.io/sm5/106_hires.png"
    }
  },
  {
    "id": "sm5-107",
    "name": "Lopunny",
    "number": "107",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Stompy Stomp",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40×",
        "text": "Flip 2 coins. This attack does 40 damage for each heads."
      },
      {
        "name": "Happy Turn",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "You may shuffle this Pokémon and all cards attached to it into your deck."
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
    "flavorText": "The ears appear to be delicate. If they are touched roughly, it kicks with its graceful legs.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/107.png",
      "large": "https://images.pokemontcg.io/sm5/107_hires.png"
    }
  },
  {
    "id": "sm5-108",
    "name": "Glameow",
    "number": "108",
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
      "Purugly"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gentle Bite",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "During your opponent's next turn, the Defending Pokémon's attacks do 40 less damage (before applying Weakness and Resistance)."
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
    "flavorText": "When it's happy, Glameow demonstrates beautiful movements of its tail, like a dancing ribbon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/108.png",
      "large": "https://images.pokemontcg.io/sm5/108_hires.png"
    }
  },
  {
    "id": "sm5-109",
    "name": "Purugly",
    "number": "109",
    "artist": "Shibuzoh.",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Glameow",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Own the Place",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "If your opponent has a Stadium card in play, discard it. If you do, prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn."
      },
      {
        "name": "Toss Aside",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Discard random cards from your opponent's hand until they have 3 cards in their hand."
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
      432
    ],
    "flavorText": "To make itself appear intimidatingly beefy, it tightly cinches its waist with its twin tails.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/109.png",
      "large": "https://images.pokemontcg.io/sm5/109_hires.png"
    }
  },
  {
    "id": "sm5-110",
    "name": "Fan Rotom",
    "number": "110",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
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
    "abilities": [
      {
        "name": "Roto Motor",
        "text": "If you have 9 or more Pokémon Tool cards in your discard pile, ignore all Energy in the attack cost of each of this Pokémon's attacks.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Spinning Fan",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 20 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "convertedRetreatCost": null,
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
      "small": "https://images.pokemontcg.io/sm5/110.png",
      "large": "https://images.pokemontcg.io/sm5/110_hires.png"
    }
  },
  {
    "id": "sm5-111",
    "name": "Shaymin",
    "number": "111",
    "artist": "kirisAki",
    "rarity": "Rare",
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
        "name": "Call for Family",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Glide",
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
      492
    ],
    "flavorText": "The blooming of Gracidea flowers confers the power of flight upon it. Feelings of gratitude are the message it delivers.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/111.png",
      "large": "https://images.pokemontcg.io/sm5/111_hires.png"
    }
  },
  {
    "id": "sm5-112",
    "name": "Yungoos",
    "number": "112",
    "artist": "Misa Tsutsui",
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
        "name": "Scout",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent reveals their hand."
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
    "flavorText": "It wanders around in a never-ending search for food. At dusk, it collapses from exhaustion and falls asleep on the spot.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/112.png",
      "large": "https://images.pokemontcg.io/sm5/112_hires.png"
    }
  },
  {
    "id": "sm5-113",
    "name": "Gumshoos",
    "number": "113",
    "artist": "nagimiso",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Yungoos",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Identify",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Your opponent reveals their hand. If you find a Pokémon there, this attack does 80 more damage."
      },
      {
        "name": "Whap Down",
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
      735
    ],
    "flavorText": "It adores having Rattata and Raticate for dinner, but as it's diurnal, it never encounters them. This Pokémon boasts incredible patience.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/113.png",
      "large": "https://images.pokemontcg.io/sm5/113_hires.png"
    }
  },
  {
    "id": "sm5-114",
    "name": "Oranguru",
    "number": "114",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
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
        "name": "Resource Management",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put 3 cards from your discard pile on the bottom of your deck in any order."
      },
      {
        "name": "Profound Knowledge",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
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
      765
    ],
    "flavorText": "Deep in the jungle, high in the lofty canopy, this Pokémon abides. On rare occasions, it shows up at the beach to match wits with Slowking.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Banned"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/114.png",
      "large": "https://images.pokemontcg.io/sm5/114_hires.png"
    }
  },
  {
    "id": "sm5-115",
    "name": "Type: Null",
    "number": "115",
    "artist": "match",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Merciless Strike",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If your opponent's Active Pokémon already has any damage counters on it, this attack does 30 more damage."
      },
      {
        "name": "Headbang",
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
      772
    ],
    "flavorText": "The heavy control mask it wears suppresses its intrinsic capabilities. This Pokémon has some hidden special power.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/115.png",
      "large": "https://images.pokemontcg.io/sm5/115_hires.png"
    }
  },
  {
    "id": "sm5-116",
    "name": "Silvally-GX",
    "number": "116",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "210",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Type: Null",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Gyro Unit",
        "text": "Your Basic Pokémon in play have no Retreat Cost.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Turbo Drive",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Attach a basic Energy card from your discard pile to 1 of your Benched Pokémon."
      },
      {
        "name": "Rebel-GX",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50×",
        "text": "This attack does 50 damage for each of your opponent's Benched Pokémon. (You can't use more than 1 GX attack in a game.)"
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
      773
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/116.png",
      "large": "https://images.pokemontcg.io/sm5/116_hires.png"
    }
  },
  {
    "id": "sm5-117",
    "name": "Drampa",
    "number": "117",
    "artist": "Hasuno",
    "rarity": "Rare Holo",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Outrage",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 10 more damage for each damage counter on this Pokémon."
      },
      {
        "name": "Dragon Pulse",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      780
    ],
    "flavorText": "This Pokémon is friendly to people and loves children most of all. It comes from deep in the mountains to play with children it likes in town.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/117.png",
      "large": "https://images.pokemontcg.io/sm5/117_hires.png"
    }
  },
  {
    "id": "sm5-118",
    "name": "Ancient Crystal",
    "number": "118",
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
      "The Regirock, Regice, Registeel, or Regigigas this card is attached to takes 30 less damage from your opponent's attacks (after applying Weakness and Resistance).",
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
      "small": "https://images.pokemontcg.io/sm5/118.png",
      "large": "https://images.pokemontcg.io/sm5/118_hires.png"
    }
  },
  {
    "id": "sm5-119",
    "name": "Cynthia",
    "number": "119",
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
      "Shuffle your hand into your deck. Then, draw 6 cards.",
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
      "small": "https://images.pokemontcg.io/sm5/119.png",
      "large": "https://images.pokemontcg.io/sm5/119_hires.png"
    }
  },
  {
    "id": "sm5-119a",
    "name": "Cynthia",
    "number": "119a",
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
      "Shuffle your hand into your deck. Then, draw 6 cards.",
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
      "small": "https://images.pokemontcg.io/sm5/119a.png",
      "large": "https://images.pokemontcg.io/sm5/119a_hires.png"
    }
  },
  {
    "id": "sm5-120",
    "name": "Cyrus ◇",
    "number": "120",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Prism Star",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter",
      "Prism Star"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can play this card only if your Active Pokémon is a Water or Metal Pokémon.",
      "Your opponent chooses 2 Benched Pokémon and shuffles the others, and all cards attached to them, into their deck.",
      "You may play only 1 Supporter card during your turn (before your attack).",
      "◇ (Prism Star) Rule: You can't have more than 1 ◇ card with the same name in your deck. If a ◇ card would go to the discard pile, put it in the Lost Zone instead."
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
      "small": "https://images.pokemontcg.io/sm5/120.png",
      "large": "https://images.pokemontcg.io/sm5/120_hires.png"
    }
  },
  {
    "id": "sm5-121",
    "name": "Electric Memory",
    "number": "121",
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
      "The Silvally-GX this card is attached to is a Lightning Pokémon.",
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
      "small": "https://images.pokemontcg.io/sm5/121.png",
      "large": "https://images.pokemontcg.io/sm5/121_hires.png"
    }
  },
  {
    "id": "sm5-122",
    "name": "Escape Board",
    "number": "122",
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
      "The Retreat Cost of the Pokémon this card is attached to is Colorless less, and it can retreat even if it's Asleep or Paralyzed.",
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
      "small": "https://images.pokemontcg.io/sm5/122.png",
      "large": "https://images.pokemontcg.io/sm5/122_hires.png"
    }
  },
  {
    "id": "sm5-122a",
    "name": "Escape Board",
    "number": "122a",
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
      "The Retreat Cost of the Pokémon this card is attached to is Colorless less, and it can retreat even if it's Asleep or Paralyzed.",
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
      "small": "https://images.pokemontcg.io/sm5/122a.png",
      "large": "https://images.pokemontcg.io/sm5/122a_hires.png"
    }
  },
  {
    "id": "sm5-123",
    "name": "Fire Memory",
    "number": "123",
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
      "The Silvally-GX this card is attached to is a Fire Pokémon.",
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
      "small": "https://images.pokemontcg.io/sm5/123.png",
      "large": "https://images.pokemontcg.io/sm5/123_hires.png"
    }
  },
  {
    "id": "sm5-124",
    "name": "Gardenia",
    "number": "124",
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
      "Heal 80 damage from 1 of your Pokémon that has any Grass Energy attached to it.",
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
      "small": "https://images.pokemontcg.io/sm5/124.png",
      "large": "https://images.pokemontcg.io/sm5/124_hires.png"
    }
  },
  {
    "id": "sm5-125",
    "name": "Lillie",
    "number": "125",
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
      "Draw cards until you have 6 cards in your hand. If it's your first turn, draw cards until you have 8 cards in your hand.",
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
      "small": "https://images.pokemontcg.io/sm5/125.png",
      "large": "https://images.pokemontcg.io/sm5/125_hires.png"
    }
  },
  {
    "id": "sm5-125a",
    "name": "Lillie",
    "number": "125a",
    "artist": "Mana Ibe",
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
      "Draw cards until you have 6 cards in your hand. If it's your first turn, draw cards until you have 8 cards in your hand.",
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
      "small": "https://images.pokemontcg.io/sm5/125a.png",
      "large": "https://images.pokemontcg.io/sm5/125a_hires.png"
    }
  },
  {
    "id": "sm5-126",
    "name": "Looker",
    "number": "126",
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
      "Draw 3 cards from the bottom of your deck.",
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
      "small": "https://images.pokemontcg.io/sm5/126.png",
      "large": "https://images.pokemontcg.io/sm5/126_hires.png"
    }
  },
  {
    "id": "sm5-127",
    "name": "Looker Whistle",
    "number": "127",
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
      "Search your deck for up to 2 cards named Looker, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/sm5/127.png",
      "large": "https://images.pokemontcg.io/sm5/127_hires.png"
    }
  },
  {
    "id": "sm5-128",
    "name": "Mars",
    "number": "128",
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
      "Draw 2 cards. If you do, discard a random card from your opponent's hand.",
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
      "small": "https://images.pokemontcg.io/sm5/128.png",
      "large": "https://images.pokemontcg.io/sm5/128_hires.png"
    }
  },
  {
    "id": "sm5-129",
    "name": "Missing Clover",
    "number": "129",
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
      "You may play 4 Missing Clover cards at once.\n• If you played 1 card, look at the top card of your deck.\n• If you played 4 cards, take a Prize card. (This effect works one time for 4 cards.)",
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
      "small": "https://images.pokemontcg.io/sm5/129.png",
      "large": "https://images.pokemontcg.io/sm5/129_hires.png"
    }
  },
  {
    "id": "sm5-130",
    "name": "Mt. Coronet",
    "number": "130",
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
      "Once during each player's turn, that player may put 2 Metal Energy cards from their discard pile into their hand.",
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
      "small": "https://images.pokemontcg.io/sm5/130.png",
      "large": "https://images.pokemontcg.io/sm5/130_hires.png"
    }
  },
  {
    "id": "sm5-131",
    "name": "Order Pad",
    "number": "131",
    "artist": "Eske Yoshinob",
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
      "Flip a coin. If heads, search your deck for an Item card, reveal it, and put it into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/sm5/131.png",
      "large": "https://images.pokemontcg.io/sm5/131_hires.png"
    }
  },
  {
    "id": "sm5-132",
    "name": "Pal Pad",
    "number": "132",
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
      "small": "https://images.pokemontcg.io/sm5/132.png",
      "large": "https://images.pokemontcg.io/sm5/132_hires.png"
    }
  },
  {
    "id": "sm5-133",
    "name": "Pokémon Fan Club",
    "number": "133",
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
      "Search your deck for up to 2 Basic Pokémon, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/sm5/133.png",
      "large": "https://images.pokemontcg.io/sm5/133_hires.png"
    }
  },
  {
    "id": "sm5-134",
    "name": "Unidentified Fossil",
    "number": "134",
    "artist": "Toyste Beach",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": "60",
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Play this card as if it were a 60-HP Colorless Basic Pokémon. At any time during your turn (before your attack), you may discard this card from play.",
      "This card can't retreat.",
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
      "small": "https://images.pokemontcg.io/sm5/134.png",
      "large": "https://images.pokemontcg.io/sm5/134_hires.png"
    }
  },
  {
    "id": "sm5-135",
    "name": "Volkner",
    "number": "135",
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
      "Search your deck for an Item card and a Lightning Energy card, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/sm5/135.png",
      "large": "https://images.pokemontcg.io/sm5/135_hires.png"
    }
  },
  {
    "id": "sm5-135a",
    "name": "Volkner",
    "number": "135a",
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
      "Search your deck for an Item card and a Lightning Energy card, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/sm5/135a.png",
      "large": "https://images.pokemontcg.io/sm5/135a_hires.png"
    }
  },
  {
    "id": "sm5-136",
    "name": "Super Boost Energy ◇",
    "number": "136",
    "artist": null,
    "rarity": "Rare Prism Star",
    "supertype": "Energy",
    "subtypes": [
      "Special",
      "Prism Star"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "This card provides Colorless Energy.",
      "While this card is attached to a Stage 2 Pokémon, it provides every type of Energy but provides only 1 Energy at a time. If you have 3 or more Stage 2 Pokémon in play, it provides every type of Energy but provides 4 Energy at a time.",
      "◇ (Prism Star) Rule: You can't have more than 1 ◇ card with the same name in your deck. If a ◇ card would go to the discard pile, put it in the Lost Zone instead."
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
      "small": "https://images.pokemontcg.io/sm5/136.png",
      "large": "https://images.pokemontcg.io/sm5/136_hires.png"
    }
  },
  {
    "id": "sm5-137",
    "name": "Unit Energy GrassFireWater",
    "number": "137",
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
      "This card provides Colorless Energy.",
      "While this card is attached to a Pokémon, it provides Grass, Fire, and Water Energy but provides only 1 Energy at a time."
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
      "small": "https://images.pokemontcg.io/sm5/137.png",
      "large": "https://images.pokemontcg.io/sm5/137_hires.png"
    }
  },
  {
    "id": "sm5-138",
    "name": "Unit Energy LightningPsychicMetal",
    "number": "138",
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
      "This card provides Colorless Energy.",
      "While this card is attached to a Pokémon, it provides Lightning, Psychic, and Metal Energy but provides only 1 Energy at a time."
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
      "small": "https://images.pokemontcg.io/sm5/138.png",
      "large": "https://images.pokemontcg.io/sm5/138_hires.png"
    }
  },
  {
    "id": "sm5-139",
    "name": "Leafeon-GX",
    "number": "139",
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
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Breath of the Leaves",
        "text": "If this Pokémon is your Active Pokémon, once during your turn (before your attack), you may heal 50 damage from 1 of your Pokémon that has any Energy attached to it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Solar Beam",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": ""
      },
      {
        "name": "Grand Bloom-GX",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "For each of your Benched Basic Pokémon, search your deck for a card that evolves from that Pokémon and put it onto that Pokémon to evolve it. Then, shuffle your deck. (You can't use more than 1 GX attack in a game.)"
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
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/139.png",
      "large": "https://images.pokemontcg.io/sm5/139_hires.png"
    }
  },
  {
    "id": "sm5-140",
    "name": "Pheromosa-GX",
    "number": "140",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "170",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Fast Raid",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "If you go first, you can use this attack on your first turn."
      },
      {
        "name": "Cruel Spike",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Your opponent's Active Pokémon is now Confused."
      },
      {
        "name": "Beauty-GX",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "50×",
        "text": "This attack does 50 damage for each Prize card your opponent has taken. (You can't use more than 1 GX attack in a game.)"
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
      795
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/140.png",
      "large": "https://images.pokemontcg.io/sm5/140_hires.png"
    }
  },
  {
    "id": "sm5-141",
    "name": "Glaceon-GX",
    "number": "141",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Freezing Gaze",
        "text": "As long as this Pokémon is your Active Pokémon, your opponent's Pokémon-GX and Pokémon-EX in play, in their hand, and in their discard pile have no Abilities, except for Freezing Gaze.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Frost Bullet",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "This attack does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Polar Spear-GX",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50×",
        "text": "This attack does 50 damage for each damage counter on your opponent's Active Pokémon. (You can't use more than 1 GX attack in a game.)"
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
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/141.png",
      "large": "https://images.pokemontcg.io/sm5/141_hires.png"
    }
  },
  {
    "id": "sm5-142",
    "name": "Xurkitree-GX",
    "number": "142",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "180",
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
        "name": "Flashing Head",
        "text": "Prevent all damage done to this Pokémon by attacks from your opponent's Pokémon that have any Special Energy attached to them.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rumbling Wires",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "Discard the top card of your opponent's deck."
      },
      {
        "name": "Lighting-GX",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent reveals their hand. Add a card you find there to their Prize cards face down. (You can't use more than 1 GX attack in a game.)"
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
      796
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/142.png",
      "large": "https://images.pokemontcg.io/sm5/142_hires.png"
    }
  },
  {
    "id": "sm5-143",
    "name": "Dawn Wings Necrozma-GX",
    "number": "143",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "180",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Invasion",
        "text": "Once during your turn (before your attack), if this Pokémon is on your Bench, you may switch it with your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dark Flash",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This attack's damage isn't affected by Resistance."
      },
      {
        "name": "Moon's Eclipse-GX",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
        "text": "You can use this attack only if you have more Prize cards remaining than your opponent. Prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn. (You can't use more than 1 GX attack in a game.)"
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
      800
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/143.png",
      "large": "https://images.pokemontcg.io/sm5/143_hires.png"
    }
  },
  {
    "id": "sm5-144",
    "name": "Celesteela-GX",
    "number": "144",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "200",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Rocket Fall",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "This attack does 30 more damage for each Colorless in your opponent's Active Pokémon's Retreat Cost."
      },
      {
        "name": "Moon Press",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "130",
        "text": ""
      },
      {
        "name": "Blaster-GX",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "Turn all of your Prize cards face up. (Those Prize cards remain face up for the rest of the game.) (You can't use more than 1 GX attack in a game.)"
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
      "small": "https://images.pokemontcg.io/sm5/144.png",
      "large": "https://images.pokemontcg.io/sm5/144_hires.png"
    }
  },
  {
    "id": "sm5-145",
    "name": "Dusk Mane Necrozma-GX",
    "number": "145",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "190",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Claw Slash",
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
        "name": "Meteor Tempest",
        "cost": [
          "Metal",
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "220",
        "text": "Discard 3 Energy from this Pokémon."
      },
      {
        "name": "Sun's Eclipse-GX",
        "cost": [
          "Metal",
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "250",
        "text": "You can use this attack only if you have more Prize cards remaining than your opponent. (You can't use more than 1 GX attack in a game.)"
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
      800
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/145.png",
      "large": "https://images.pokemontcg.io/sm5/145_hires.png"
    }
  },
  {
    "id": "sm5-146",
    "name": "Dialga-GX",
    "number": "146",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "180",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Overclock",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw cards until you have 6 cards in your hand."
      },
      {
        "name": "Shred",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      },
      {
        "name": "Timeless-GX",
        "cost": [
          "Metal",
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "150",
        "text": "Take another turn after this one. (Skip the between-turns step.) (You can't use more than 1 GX attack in a game.)"
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
      483
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/146.png",
      "large": "https://images.pokemontcg.io/sm5/146_hires.png"
    }
  },
  {
    "id": "sm5-147",
    "name": "Palkia-GX",
    "number": "147",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "180",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Spatial Control",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Move any number of Energy from your Benched Pokémon to this Pokémon."
      },
      {
        "name": "Hydro Pressure",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "This attack does 20 more damage times the amount of Water Energy attached to this Pokémon."
      },
      {
        "name": "Zero Vanish-GX",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "150",
        "text": "Shuffle all Energy from each of your opponent's Pokémon into their deck. (You can't use more than 1 GX attack in a game.)"
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
      484
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/147.png",
      "large": "https://images.pokemontcg.io/sm5/147_hires.png"
    }
  },
  {
    "id": "sm5-148",
    "name": "Cynthia",
    "number": "148",
    "artist": "nagimiso",
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
      "Shuffle your hand into your deck. Then, draw 6 cards.",
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
      "small": "https://images.pokemontcg.io/sm5/148.png",
      "large": "https://images.pokemontcg.io/sm5/148_hires.png"
    }
  },
  {
    "id": "sm5-149",
    "name": "Gardenia",
    "number": "149",
    "artist": "You Iribi",
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
      "Heal 80 damage from 1 of your Pokémon that has any Grass Energy attached to it.",
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
      "small": "https://images.pokemontcg.io/sm5/149.png",
      "large": "https://images.pokemontcg.io/sm5/149_hires.png"
    }
  },
  {
    "id": "sm5-150",
    "name": "Lana",
    "number": "150",
    "artist": "Kanako Eo",
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
      "Heal 50 damage from each of your Pokémon that has any Water Energy attached to it.",
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
      "small": "https://images.pokemontcg.io/sm5/150.png",
      "large": "https://images.pokemontcg.io/sm5/150_hires.png"
    }
  },
  {
    "id": "sm5-151",
    "name": "Lillie",
    "number": "151",
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
      "Draw cards until you have 6 cards in your hand. If it's your first turn, draw cards until you have 8 cards in your hand.",
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
      "small": "https://images.pokemontcg.io/sm5/151.png",
      "large": "https://images.pokemontcg.io/sm5/151_hires.png"
    }
  },
  {
    "id": "sm5-152",
    "name": "Looker",
    "number": "152",
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
      "Draw 3 cards from the bottom of your deck.",
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
      "small": "https://images.pokemontcg.io/sm5/152.png",
      "large": "https://images.pokemontcg.io/sm5/152_hires.png"
    }
  },
  {
    "id": "sm5-153",
    "name": "Lusamine",
    "number": "153",
    "artist": "You Iribi",
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
      "Put 2 in any combination of Supporter and Stadium cards from your discard pile into your hand.",
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
      "small": "https://images.pokemontcg.io/sm5/153.png",
      "large": "https://images.pokemontcg.io/sm5/153_hires.png"
    }
  },
  {
    "id": "sm5-153a",
    "name": "Lusamine",
    "number": "153a",
    "artist": "Mana Ibe",
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
      "Put 2 in any combination of Supporter and Stadium cards from your discard pile into your hand.",
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
      "small": "https://images.pokemontcg.io/sm5/153a.png",
      "large": "https://images.pokemontcg.io/sm5/153a_hires.png"
    }
  },
  {
    "id": "sm5-154",
    "name": "Mars",
    "number": "154",
    "artist": "kodama",
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
      "Draw 2 cards. If you do, discard a random card from your opponent's hand.",
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
      "small": "https://images.pokemontcg.io/sm5/154.png",
      "large": "https://images.pokemontcg.io/sm5/154_hires.png"
    }
  },
  {
    "id": "sm5-155",
    "name": "Pokémon Fan Club",
    "number": "155",
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
      "Search your deck for up to 2 Basic Pokémon, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/sm5/155.png",
      "large": "https://images.pokemontcg.io/sm5/155_hires.png"
    }
  },
  {
    "id": "sm5-156",
    "name": "Volkner",
    "number": "156",
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
      "Search your deck for an Item card and a Lightning Energy card, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/sm5/156.png",
      "large": "https://images.pokemontcg.io/sm5/156_hires.png"
    }
  },
  {
    "id": "sm5-157",
    "name": "Leafeon-GX",
    "number": "157",
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
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Breath of the Leaves",
        "text": "If this Pokémon is your Active Pokémon, once during your turn (before your attack), you may heal 50 damage from 1 of your Pokémon that has any Energy attached to it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Solar Beam",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": ""
      },
      {
        "name": "Grand Bloom-GX",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "For each of your Benched Basic Pokémon, search your deck for a card that evolves from that Pokémon and put it onto that Pokémon to evolve it. Then, shuffle your deck. (You can't use more than 1 GX attack in a game.)"
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
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/157.png",
      "large": "https://images.pokemontcg.io/sm5/157_hires.png"
    }
  },
  {
    "id": "sm5-158",
    "name": "Pheromosa-GX",
    "number": "158",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "170",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Fast Raid",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "If you go first, you can use this attack on your first turn."
      },
      {
        "name": "Cruel Spike",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Your opponent's Active Pokémon is now Confused."
      },
      {
        "name": "Beauty-GX",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "50×",
        "text": "This attack does 50 damage for each Prize card your opponent has taken. (You can't use more than 1 GX attack in a game.)"
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
      795
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/158.png",
      "large": "https://images.pokemontcg.io/sm5/158_hires.png"
    }
  },
  {
    "id": "sm5-159",
    "name": "Glaceon-GX",
    "number": "159",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Freezing Gaze",
        "text": "As long as this Pokémon is your Active Pokémon, your opponent's Pokémon-GX and Pokémon-EX in play, in their hand, and in their discard pile have no Abilities, except for Freezing Gaze.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Frost Bullet",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "This attack does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Polar Spear-GX",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50×",
        "text": "This attack does 50 damage for each damage counter on your opponent's Active Pokémon. (You can't use more than 1 GX attack in a game.)"
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
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/159.png",
      "large": "https://images.pokemontcg.io/sm5/159_hires.png"
    }
  },
  {
    "id": "sm5-160",
    "name": "Xurkitree-GX",
    "number": "160",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "180",
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
        "name": "Flashing Head",
        "text": "Prevent all damage done to this Pokémon by attacks from your opponent's Pokémon that have any Special Energy attached to them.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rumbling Wires",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "Discard the top card of your opponent's deck."
      },
      {
        "name": "Lighting-GX",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent reveals their hand. Add a card you find there to their Prize cards face down. (You can't use more than 1 GX attack in a game.)"
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
      796
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/160.png",
      "large": "https://images.pokemontcg.io/sm5/160_hires.png"
    }
  },
  {
    "id": "sm5-161",
    "name": "Dawn Wings Necrozma-GX",
    "number": "161",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "180",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Invasion",
        "text": "Once during your turn (before your attack), if this Pokémon is on your Bench, you may switch it with your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dark Flash",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This attack's damage isn't affected by Resistance."
      },
      {
        "name": "Moon's Eclipse-GX",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
        "text": "You can use this attack only if you have more Prize cards remaining than your opponent. Prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn. (You can't use more than 1 GX attack in a game.)"
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
      800
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/161.png",
      "large": "https://images.pokemontcg.io/sm5/161_hires.png"
    }
  },
  {
    "id": "sm5-162",
    "name": "Celesteela-GX",
    "number": "162",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "200",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Rocket Fall",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "This attack does 30 more damage for each Colorless in your opponent's Active Pokémon's Retreat Cost."
      },
      {
        "name": "Moon Press",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "130",
        "text": ""
      },
      {
        "name": "Blaster-GX",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "Turn all of your Prize cards face up. (Those Prize cards remain face up for the rest of the game.) (You can't use more than 1 GX attack in a game.)"
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
      "small": "https://images.pokemontcg.io/sm5/162.png",
      "large": "https://images.pokemontcg.io/sm5/162_hires.png"
    }
  },
  {
    "id": "sm5-163",
    "name": "Dusk Mane Necrozma-GX",
    "number": "163",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "190",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Claw Slash",
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
        "name": "Meteor Tempest",
        "cost": [
          "Metal",
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "220",
        "text": "Discard 3 Energy from this Pokémon."
      },
      {
        "name": "Sun's Eclipse-GX",
        "cost": [
          "Metal",
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "250",
        "text": "You can use this attack only if you have more Prize cards remaining than your opponent. (You can't use more than 1 GX attack in a game.)"
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
      800
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/163.png",
      "large": "https://images.pokemontcg.io/sm5/163_hires.png"
    }
  },
  {
    "id": "sm5-164",
    "name": "Dialga-GX",
    "number": "164",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "180",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Overclock",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw cards until you have 6 cards in your hand."
      },
      {
        "name": "Shred",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      },
      {
        "name": "Timeless-GX",
        "cost": [
          "Metal",
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "150",
        "text": "Take another turn after this one. (Skip the between-turns step.) (You can't use more than 1 GX attack in a game.)"
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
      483
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/164.png",
      "large": "https://images.pokemontcg.io/sm5/164_hires.png"
    }
  },
  {
    "id": "sm5-165",
    "name": "Palkia-GX",
    "number": "165",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "180",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Spatial Control",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Move any number of Energy from your Benched Pokémon to this Pokémon."
      },
      {
        "name": "Hydro Pressure",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "This attack does 20 more damage times the amount of Water Energy attached to this Pokémon."
      },
      {
        "name": "Zero Vanish-GX",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "150",
        "text": "Shuffle all Energy from each of your opponent's Pokémon into their deck. (You can't use more than 1 GX attack in a game.)"
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
      484
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/165.png",
      "large": "https://images.pokemontcg.io/sm5/165_hires.png"
    }
  },
  {
    "id": "sm5-166",
    "name": "Crushing Hammer",
    "number": "166",
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
      "Flip a coin. If heads, discard an Energy from 1 of your opponent's Pokémon.",
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
      "small": "https://images.pokemontcg.io/sm5/166.png",
      "large": "https://images.pokemontcg.io/sm5/166_hires.png"
    }
  },
  {
    "id": "sm5-167",
    "name": "Escape Board",
    "number": "167",
    "artist": "Toyste Beach",
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
      "The Retreat Cost of the Pokémon this card is attached to is Colorless less, and it can retreat even if it's Asleep or Paralyzed.",
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
      "small": "https://images.pokemontcg.io/sm5/167.png",
      "large": "https://images.pokemontcg.io/sm5/167_hires.png"
    }
  },
  {
    "id": "sm5-168",
    "name": "Missing Clover",
    "number": "168",
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
      "You may play 4 Missing Clover cards at once.\n• If you played 1 card, look at the top card of your deck.\n• If you played 4 cards, take a Prize card. (This effect works one time for 4 cards.)",
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
      "small": "https://images.pokemontcg.io/sm5/168.png",
      "large": "https://images.pokemontcg.io/sm5/168_hires.png"
    }
  },
  {
    "id": "sm5-169",
    "name": "Peeking Red Card",
    "number": "169",
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
      "Your opponent reveals their hand. You may have your opponent count the cards in their hand, shuffle those cards into their deck, then draw that many cards.",
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
      "small": "https://images.pokemontcg.io/sm5/169.png",
      "large": "https://images.pokemontcg.io/sm5/169_hires.png"
    }
  },
  {
    "id": "sm5-170",
    "name": "Unit Energy GrassFireWater",
    "number": "170",
    "artist": null,
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
      "This card provides Colorless Energy.",
      "While this card is attached to a Pokémon, it provides Grass, Fire, and Water Energy but provides only 1 Energy at a time."
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
      "small": "https://images.pokemontcg.io/sm5/170.png",
      "large": "https://images.pokemontcg.io/sm5/170_hires.png"
    }
  },
  {
    "id": "sm5-171",
    "name": "Unit Energy LightningPsychicMetal",
    "number": "171",
    "artist": null,
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
      "This card provides Colorless Energy.",
      "While this card is attached to a Pokémon, it provides Lightning, Psychic, and Metal Energy but provides only 1 Energy at a time."
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
      "small": "https://images.pokemontcg.io/sm5/171.png",
      "large": "https://images.pokemontcg.io/sm5/171_hires.png"
    }
  },
  {
    "id": "sm5-172",
    "name": "Lunala-GX",
    "number": "172",
    "artist": "5ban Graphics",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Cosmoem",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Psychic Transfer",
        "text": "As often as you like during your turn (before your attack), you may move a Psychic Energy from 1 of your Pokémon to another of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Moongeist Beam",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 4,
        "damage": "120",
        "text": "The Defending Pokémon can't be healed during your opponent's next turn."
      },
      {
        "name": "Lunar Fall-GX",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Knock Out 1 of your opponent's Basic Pokémon that isn't a Pokémon-GX. (You can't use more than 1 GX attack in a game.)"
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
      792
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/172.png",
      "large": "https://images.pokemontcg.io/sm5/172_hires.png"
    }
  },
  {
    "id": "sm5-173",
    "name": "Solgaleo-GX",
    "number": "173",
    "artist": "5ban Graphics",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Cosmoem",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Ultra Road",
        "text": "Once during your turn (before your attack), you may switch your Active Pokémon with 1 of your Benched Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Sunsteel Strike",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "230",
        "text": "Discard all Energy from this Pokémon."
      },
      {
        "name": "Sol Burst-GX",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 5 Energy cards and attach them to your Pokémon in any way you like. Then, shuffle your deck. (You can't use more than 1 GX attack in a game.)"
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
      791
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm5/173.png",
      "large": "https://images.pokemontcg.io/sm5/173_hires.png"
    }
  }
]

export default cardDetails
