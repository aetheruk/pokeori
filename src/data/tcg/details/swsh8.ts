import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "swsh8-1",
    "name": "Caterpie",
    "number": "1",
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
      "Metapod"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flock",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Caterpie and put it onto your Bench. Then, shuffle your deck."
      },
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
    "flavorText": "Its short feet are tipped with suction pads that enable it to tirelessly climb slopes and walls.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/1.png",
      "large": "https://images.pokemontcg.io/swsh8/1_hires.png"
    }
  },
  {
    "id": "swsh8-2",
    "name": "Metapod",
    "number": "2",
    "artist": "Saya Tsuruta",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
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
        "name": "Exoskeleton",
        "text": "This Pokémon takes 20 less damage from attacks (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Ram",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      11
    ],
    "flavorText": "Even though it is encased in a sturdy shell, the body inside is tender. It can't withstand a harsh attack.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/2.png",
      "large": "https://images.pokemontcg.io/swsh8/2_hires.png"
    }
  },
  {
    "id": "swsh8-3",
    "name": "Butterfree",
    "number": "3",
    "artist": "ryoma uratsuka",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "120",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Metapod",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Tricolored Scales",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may make your opponent's Active Pokémon Burned, Confused, and Poisoned.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Gust",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      12
    ],
    "flavorText": "It collects honey every day. It rubs honey onto the hairs on its legs to carry it back to its nest.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/3.png",
      "large": "https://images.pokemontcg.io/swsh8/3_hires.png"
    }
  },
  {
    "id": "swsh8-4",
    "name": "Shroomish",
    "number": "4",
    "artist": "Naoyo Kimura",
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
      "Breloom"
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
      285
    ],
    "flavorText": "It spouts poison spores from the top of its head. These spores cause pain all over if inhaled.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/4.png",
      "large": "https://images.pokemontcg.io/swsh8/4_hires.png"
    }
  },
  {
    "id": "swsh8-5",
    "name": "Breloom",
    "number": "5",
    "artist": "Yukiko Baba",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Shroomish",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Headbutt",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Impact Blow",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "During your next turn, this Pokémon can't use Impact Blow."
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
      286
    ],
    "flavorText": "It scatters poisonous spores and throws powerful punches while its foe is hampered by inhaled spores.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/5.png",
      "large": "https://images.pokemontcg.io/swsh8/5_hires.png"
    }
  },
  {
    "id": "swsh8-6",
    "name": "Breloom V",
    "number": "6",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Single Strike"
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
        "name": "Counter",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "If this Pokémon was damaged by an attack during your opponent's last turn, this attack does that much more damage."
      },
      {
        "name": "Mach Cross",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
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
      286
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/6.png",
      "large": "https://images.pokemontcg.io/swsh8/6_hires.png"
    }
  },
  {
    "id": "swsh8-7",
    "name": "Pansage",
    "number": "7",
    "artist": "Nagomi Nijo",
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
      511
    ],
    "flavorText": "It's good at finding berries and gathers them from all over. It's kind enough to share them with friends.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/7.png",
      "large": "https://images.pokemontcg.io/swsh8/7_hires.png"
    }
  },
  {
    "id": "swsh8-8",
    "name": "Simisage",
    "number": "8",
    "artist": "Akira Komayama",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Pansage",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Return",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "You may draw cards until you have 6 cards in your hand."
      },
      {
        "name": "Whip Smash",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      512
    ],
    "flavorText": "Ill tempered, it fights by swinging its barbed tail around wildly. The leaf growing on its head is very bitter.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/8.png",
      "large": "https://images.pokemontcg.io/swsh8/8_hires.png"
    }
  },
  {
    "id": "swsh8-9",
    "name": "Sewaddle",
    "number": "9",
    "artist": "Akira Komayama",
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
      "Swadloon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Grass Munch",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Discard a Grass Energy from your opponent's Active Pokémon."
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
      540
    ],
    "flavorText": "Since this Pokémon makes its own clothes out of leaves, it is a popular mascot for fashion designers.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/9.png",
      "large": "https://images.pokemontcg.io/swsh8/9_hires.png"
    }
  },
  {
    "id": "swsh8-10",
    "name": "Swadloon",
    "number": "10",
    "artist": "0313",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Sewaddle",
    "evolvesTo": [
      "Leavanny"
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
        "text": "Flip a coin. If heads, this attack does 20 more damage."
      },
      {
        "name": "Seed Bomb",
        "cost": [
          "Grass",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      541
    ],
    "flavorText": "It protects itself from the cold by wrapping up in leaves. It stays on the move, eating leaves in forests.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/10.png",
      "large": "https://images.pokemontcg.io/swsh8/10_hires.png"
    }
  },
  {
    "id": "swsh8-11",
    "name": "Leavanny",
    "number": "11",
    "artist": "kodama",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Swadloon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Healing Circle",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Heal all damage from each of your Benched Pokémon. If you healed any damage in this way, shuffle this Pokémon and all attached cards into your deck."
      },
      {
        "name": "Razor Leaf",
        "cost": [
          "Grass",
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
      542
    ],
    "flavorText": "It keeps its eggs warm with heat from fermenting leaves. It also uses leaves to make warm wrappings for Sewaddle.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/11.png",
      "large": "https://images.pokemontcg.io/swsh8/11_hires.png"
    }
  },
  {
    "id": "swsh8-12",
    "name": "Maractus",
    "number": "12",
    "artist": "0313",
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
        "name": "Peck",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Ditch and Shake",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50×",
        "text": "Discard any number of Pokémon Tool cards from your hand. This attack does 50 damage for each card you discarded in this way."
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
      556
    ],
    "flavorText": "Once each year, this Pokémon scatters its seeds. They're jam-packed with nutrients, making them a precious food source out in the desert.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/12.png",
      "large": "https://images.pokemontcg.io/swsh8/12_hires.png"
    }
  },
  {
    "id": "swsh8-13",
    "name": "Shelmet",
    "number": "13",
    "artist": "Shibuzoh.",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Fusion Strike"
    ],
    "hp": "70",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Accelgor"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spit Beam",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      616
    ],
    "flavorText": "It has a strange physiology that responds to electricity. When together with Karrablast, Shelmet evolves for some reason.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/13.png",
      "large": "https://images.pokemontcg.io/swsh8/13_hires.png"
    }
  },
  {
    "id": "swsh8-14",
    "name": "Accelgor",
    "number": "14",
    "artist": "nagimiso",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Fusion Strike"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Shelmet",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ninja Tornado",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "If this Pokémon moved from your Bench to the Active Spot this turn, this attack can be used for Grass."
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
      617
    ],
    "flavorText": "Discarding its shell made it nimble. To keep itself from dehydrating, it wraps its body in bands of membrane.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/14.png",
      "large": "https://images.pokemontcg.io/swsh8/14_hires.png"
    }
  },
  {
    "id": "swsh8-15",
    "name": "Virizion",
    "number": "15",
    "artist": "Kagemaru Himeno",
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
        "name": "Bail Out",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put up to 2 Pokémon from your discard pile into your hand."
      },
      {
        "name": "Solar Beam",
        "cost": [
          "Grass",
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/15.png",
      "large": "https://images.pokemontcg.io/swsh8/15_hires.png"
    }
  },
  {
    "id": "swsh8-16",
    "name": "Phantump",
    "number": "16",
    "artist": "OKACHEKE",
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
      "Trevenant"
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
      708
    ],
    "flavorText": "With a voice like a human child's, it cries out to lure adults deep into the forest, getting them lost among the trees.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/16.png",
      "large": "https://images.pokemontcg.io/swsh8/16_hires.png"
    }
  },
  {
    "id": "swsh8-17",
    "name": "Trevenant",
    "number": "17",
    "artist": "Narumi Sato",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Phantump",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gentle Slap",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Wood Hammer",
        "cost": [
          "Grass",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      709
    ],
    "flavorText": "Small roots that extend from the tips of this Pokémon's feet can tie into the trees of the forest and give Trevenant control over them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/17.png",
      "large": "https://images.pokemontcg.io/swsh8/17_hires.png"
    }
  },
  {
    "id": "swsh8-18",
    "name": "Grubbin",
    "number": "18",
    "artist": "Asako Ito",
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
      "Charjabug"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Energize",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach a Lightning Energy card from your discard pile to this Pokémon."
      },
      {
        "name": "Surprise Attack",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      736
    ],
    "flavorText": "It uses its big jaws to dig nests into the forest floor, and it loves to feed on sweet tree sap.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/18.png",
      "large": "https://images.pokemontcg.io/swsh8/18_hires.png"
    }
  },
  {
    "id": "swsh8-19",
    "name": "Dewpider",
    "number": "19",
    "artist": "Miki Tanaka",
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
      "Araquanid"
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
      751
    ],
    "flavorText": "Dewpider normally lives underwater. When it comes onto land in search of food, it takes water with it in the form of a bubble on its head.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/19.png",
      "large": "https://images.pokemontcg.io/swsh8/19_hires.png"
    }
  },
  {
    "id": "swsh8-20",
    "name": "Araquanid",
    "number": "20",
    "artist": "KIYOTAKA OSHIYAMA",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Dewpider",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bug Bite",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Bubble Launch",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
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
    "flavorText": "It acts as a caretaker for Dewpider, putting them inside its bubble and letting them eat any leftover food.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/20.png",
      "large": "https://images.pokemontcg.io/swsh8/20_hires.png"
    }
  },
  {
    "id": "swsh8-21",
    "name": "Tsareena V",
    "number": "21",
    "artist": "PLANETA Mochizuki",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Queen's Orders",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "You may discard any number of your Benched Pokémon. This attack does 40 more damage for each Benched Pokémon you discarded in this way."
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
      763
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/21.png",
      "large": "https://images.pokemontcg.io/swsh8/21_hires.png"
    }
  },
  {
    "id": "swsh8-22",
    "name": "Rillaboom V",
    "number": "22",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Rapid Strike"
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
        "name": "Drain Punch",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Heal 30 damage from this Pokémon."
      },
      {
        "name": "Drum Rush",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      812
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/22.png",
      "large": "https://images.pokemontcg.io/swsh8/22_hires.png"
    }
  },
  {
    "id": "swsh8-23",
    "name": "Rillaboom VMAX",
    "number": "23",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Rapid Strike"
    ],
    "hp": "330",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Rillaboom V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "G-Max Drum Solo",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "This attack also does 40 damage to 2 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      812
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/23.png",
      "large": "https://images.pokemontcg.io/swsh8/23_hires.png"
    }
  },
  {
    "id": "swsh8-24",
    "name": "Gossifleur",
    "number": "24",
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
      "Eldegoss"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Leafage",
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
      829
    ],
    "flavorText": "It whirls around in the wind while singing a joyous song. This delightful display has charmed many into raising this Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/24.png",
      "large": "https://images.pokemontcg.io/swsh8/24_hires.png"
    }
  },
  {
    "id": "swsh8-25",
    "name": "Eldegoss",
    "number": "25",
    "artist": "Akira Komayama",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Gossifleur",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sunny Wind",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
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
      830
    ],
    "flavorText": "The cotton on the head of this Pokémon can be spun into a glossy, gorgeous yarn—a Galar regional specialty.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/25.png",
      "large": "https://images.pokemontcg.io/swsh8/25_hires.png"
    }
  },
  {
    "id": "swsh8-26",
    "name": "Appletun V",
    "number": "26",
    "artist": "aky CG Works",
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
        "name": "Headbutt",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Sweet Impact",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
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
      842
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/26.png",
      "large": "https://images.pokemontcg.io/swsh8/26_hires.png"
    }
  },
  {
    "id": "swsh8-27",
    "name": "Zarude",
    "number": "27",
    "artist": "Anesaki Dynamic",
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
      },
      {
        "name": "Wild Whip",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40+",
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
      893
    ],
    "flavorText": "Once the vines on Zarude's body tear off, they become nutrients in the soil. This helps the plants of the forest grow.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/27.png",
      "large": "https://images.pokemontcg.io/swsh8/27_hires.png"
    }
  },
  {
    "id": "swsh8-28",
    "name": "Vulpix",
    "number": "28",
    "artist": "Sekio",
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
        "name": "Live Coal",
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
      37
    ],
    "flavorText": "As each tail grows, its fur becomes more lustrous. When held, it feels slightly warm.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/28.png",
      "large": "https://images.pokemontcg.io/swsh8/28_hires.png"
    }
  },
  {
    "id": "swsh8-29",
    "name": "Vulpix",
    "number": "29",
    "artist": "Megumi Mizutani",
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
        "name": "Smash Kick",
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
      37
    ],
    "flavorText": "As each tail grows, its fur becomes more lustrous. When held, it feels slightly warm.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/29.png",
      "large": "https://images.pokemontcg.io/swsh8/29_hires.png"
    }
  },
  {
    "id": "swsh8-30",
    "name": "Ninetales",
    "number": "30",
    "artist": "kirisAki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Vulpix",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Supernatural Flames",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      38
    ],
    "flavorText": "Very smart and very vengeful. Grabbing one of its many tails could result in a 1,000-year curse.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/30.png",
      "large": "https://images.pokemontcg.io/swsh8/30_hires.png"
    }
  },
  {
    "id": "swsh8-31",
    "name": "Ninetales",
    "number": "31",
    "artist": "Tika Matsuno",
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
    "abilities": [
      {
        "name": "Byway of the Nine-Tailed Fox",
        "text": "The Retreat Cost of each of your Pokémon that has any Fire Energy attached is ColorlessColorless less.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Flame Tail",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      38
    ],
    "flavorText": "Very smart and very vengeful. Grabbing one of its many tails could result in a 1,000-year curse.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/31.png",
      "large": "https://images.pokemontcg.io/swsh8/31_hires.png"
    }
  },
  {
    "id": "swsh8-32",
    "name": "Growlithe",
    "number": "32",
    "artist": "Narumi Sato",
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
        "name": "Warm Up",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Fire Energy card and attach it to 1 of your Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Combustion",
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
      58
    ],
    "flavorText": "Extremely loyal, it will fearlessly bark at any opponent to protect its own Trainer from harm.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/32.png",
      "large": "https://images.pokemontcg.io/swsh8/32_hires.png"
    }
  },
  {
    "id": "swsh8-33",
    "name": "Arcanine",
    "number": "33",
    "artist": "Yuu Nishida",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Growlithe",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fire Claws",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Heat Tackle",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
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
      59
    ],
    "flavorText": "A Pokémon that has long been admired for its beauty. It runs agilely as if on wings.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/33.png",
      "large": "https://images.pokemontcg.io/swsh8/33_hires.png"
    }
  },
  {
    "id": "swsh8-34",
    "name": "Slugma",
    "number": "34",
    "artist": "otumami",
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
      "Magcargo"
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
        "name": "Flare",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      218
    ],
    "flavorText": "Its body is made of magma. If it doesn't keep moving, its body will cool and harden.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/34.png",
      "large": "https://images.pokemontcg.io/swsh8/34_hires.png"
    }
  },
  {
    "id": "swsh8-35",
    "name": "Magcargo",
    "number": "35",
    "artist": "Eri Yamaki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Slugma",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rock Throw",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Body Splash",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Flip 3 coins. For each tails, discard an Energy from this Pokémon."
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
    "flavorText": "Its body is as hot as lava and is always billowing. Flames will occasionally burst from its shell.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/35.png",
      "large": "https://images.pokemontcg.io/swsh8/35_hires.png"
    }
  },
  {
    "id": "swsh8-36",
    "name": "Victini",
    "number": "36",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fiery Cheering",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach a basic Energy card from your discard pile to 1 of your Benched Pokémon."
      },
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
      "small": "https://images.pokemontcg.io/swsh8/36.png",
      "large": "https://images.pokemontcg.io/swsh8/36_hires.png"
    }
  },
  {
    "id": "swsh8-37",
    "name": "Pansear",
    "number": "37",
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
      "Simisear"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Surprise Attack",
        "cost": [
          "Fire"
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
      513
    ],
    "flavorText": "This Pokémon lives in caves in volcanoes. The fire within the tuft on its head can reach 600 degrees Fahrenheit.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/37.png",
      "large": "https://images.pokemontcg.io/swsh8/37_hires.png"
    }
  },
  {
    "id": "swsh8-38",
    "name": "Simisear",
    "number": "38",
    "artist": "Tomokazu Komiya",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Pansear",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Light Punch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Fling Fire",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "60×",
        "text": "Discard up to 2 basic Energy cards from your hand. This attack does 60 damage for each card you discarded in this way."
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
    "flavorText": "When it gets excited, embers rise from its head and tail and it gets hot. For some reason, it loves sweets.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/38.png",
      "large": "https://images.pokemontcg.io/swsh8/38_hires.png"
    }
  },
  {
    "id": "swsh8-39",
    "name": "Chandelure V",
    "number": "39",
    "artist": "Saki Hayashiro",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
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
        "name": "Confuse Ray",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Confused."
      },
      {
        "name": "Poltergeist",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40×",
        "text": "Your opponent reveals their hand. This attack does 40 damage for each Trainer card you find there."
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
      609
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/39.png",
      "large": "https://images.pokemontcg.io/swsh8/39_hires.png"
    }
  },
  {
    "id": "swsh8-40",
    "name": "Chandelure VMAX",
    "number": "40",
    "artist": "AKIRA EGAWA",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "320",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Chandelure V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Cursed Shimmer",
        "text": "As long as this Pokémon is in the Active Spot, your opponent can't play any Pokémon Tool cards from their hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Max Poltergeist",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70×",
        "text": "Your opponent reveals their hand. This attack does 70 damage for each Trainer card you find there."
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
      609
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/40.png",
      "large": "https://images.pokemontcg.io/swsh8/40_hires.png"
    }
  },
  {
    "id": "swsh8-41",
    "name": "Heatmor",
    "number": "41",
    "artist": "Oswaldo KATO",
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
        "name": "Flame Cloak",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Attach a Fire Energy card from your discard pile to this Pokémon."
      },
      {
        "name": "Exciting Flame",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "If this Pokémon has at least 3 extra Energy attached (in addition to this attack's cost), this attack also does 180 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      631
    ],
    "flavorText": "A flame serves as its tongue, melting through the hard shell of Durant so that Heatmor can devour their insides.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/41.png",
      "large": "https://images.pokemontcg.io/swsh8/41_hires.png"
    }
  },
  {
    "id": "swsh8-42",
    "name": "Oricorio",
    "number": "42",
    "artist": "Oswaldo KATO",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Fusion Strike"
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
        "name": "Lesson in Zeal",
        "text": "All of your Fusion Strike Pokémon take 20 less damage from attacks from your opponent's Pokémon (after applying Weakness and Resistance). You can't apply more than 1 Lesson in Zeal Ability at a time.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Glistening Droplets",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put 5 damage counters on your opponent's Pokémon in any way you like."
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
      741
    ],
    "flavorText": "This Oricorio has drunk red nectar. If its Trainer gives the wrong order, this passionate Pokémon becomes fiercely angry.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/42.png",
      "large": "https://images.pokemontcg.io/swsh8/42_hires.png"
    }
  },
  {
    "id": "swsh8-43",
    "name": "Cinderace V",
    "number": "43",
    "artist": "5ban Graphics",
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
        "name": "Blaze Kick",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "210",
        "text": "Discard 2 Fire Energy from this Pokémon."
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
      815
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/43.png",
      "large": "https://images.pokemontcg.io/swsh8/43_hires.png"
    }
  },
  {
    "id": "swsh8-44",
    "name": "Cinderace V",
    "number": "44",
    "artist": "aky CG Works",
    "rarity": "Rare Holo V",
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
        "name": "Flare",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      },
      {
        "name": "All-Out Shot",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "210",
        "text": "During your next turn, this Pokémon can't attack."
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
      815
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/44.png",
      "large": "https://images.pokemontcg.io/swsh8/44_hires.png"
    }
  },
  {
    "id": "swsh8-45",
    "name": "Cinderace VMAX",
    "number": "45",
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
    "evolvesFrom": "Cinderace V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "G-Max Fireball",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "230",
        "text": "Your opponent's Active Pokémon is now Burned. During your next turn, this Pokémon can't attack."
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
      815
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/45.png",
      "large": "https://images.pokemontcg.io/swsh8/45_hires.png"
    }
  },
  {
    "id": "swsh8-46",
    "name": "Sizzlipede",
    "number": "46",
    "artist": "miki kudo",
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
        "name": "Gnaw",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Ember",
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
      850
    ],
    "flavorText": "It wraps prey up with its heated body, cooking them in its coils. Once they're well-done, it will voraciously nibble them down to the last morsel.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/46.png",
      "large": "https://images.pokemontcg.io/swsh8/46_hires.png"
    }
  },
  {
    "id": "swsh8-47",
    "name": "Sizzlipede",
    "number": "47",
    "artist": "Narumi Sato",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
    ],
    "hp": "70",
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
        "name": "Singe",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
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
      850
    ],
    "flavorText": "It wraps prey up with its heated body, cooking them in its coils. Once they're well-done, it will voraciously nibble them down to the last morsel.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/47.png",
      "large": "https://images.pokemontcg.io/swsh8/47_hires.png"
    }
  },
  {
    "id": "swsh8-48",
    "name": "Centiskorch",
    "number": "48",
    "artist": "Hasuno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Rapid Strike"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Sizzlipede",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Coil",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "During your next turn, this Pokémon's attacks do 90 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance)."
      },
      {
        "name": "Burning Train",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
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
      851
    ],
    "flavorText": "While its burning body is already dangerous on its own, this excessively hostile Pokémon also has large and very sharp fangs.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/48.png",
      "large": "https://images.pokemontcg.io/swsh8/48_hires.png"
    }
  },
  {
    "id": "swsh8-49",
    "name": "Centiskorch",
    "number": "49",
    "artist": "Misa Tsutsui",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Sizzlipede",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Steady Firebreathing",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Heat Blast",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      851
    ],
    "flavorText": "While its burning body is already dangerous on its own, this excessively hostile Pokémon also has large and very sharp fangs.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/49.png",
      "large": "https://images.pokemontcg.io/swsh8/49_hires.png"
    }
  },
  {
    "id": "swsh8-50",
    "name": "Shellder",
    "number": "50",
    "artist": "kawayoo",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
    ],
    "hp": "70",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Cloyster"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tongue Slap",
        "cost": [
          "Water"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      90
    ],
    "flavorText": "Its hard shell repels any kind of attack. It is vulnerable only when its shell is open.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/50.png",
      "large": "https://images.pokemontcg.io/swsh8/50_hires.png"
    }
  },
  {
    "id": "swsh8-51",
    "name": "Cloyster",
    "number": "51",
    "artist": "nagimiso",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Rapid Strike"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Shellder",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Shell Armor",
        "text": "This Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Aqua Split",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "This attack also does 30 damage to 2 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      91
    ],
    "flavorText": "Once it slams its shell shut, it is impossible to open, even by those with superior strength.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/51.png",
      "large": "https://images.pokemontcg.io/swsh8/51_hires.png"
    }
  },
  {
    "id": "swsh8-52",
    "name": "Staryu",
    "number": "52",
    "artist": "tetsuya koizumi",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
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
        "name": "Soak in Water",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach a Water Energy card from your hand to this Pokémon."
      },
      {
        "name": "Spinning Attack",
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
      120
    ],
    "flavorText": "No number of injuries can bother Staryu. Its amazing regenerative powers return it to its previous state in half a day!",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/52.png",
      "large": "https://images.pokemontcg.io/swsh8/52_hires.png"
    }
  },
  {
    "id": "swsh8-53",
    "name": "Starmie",
    "number": "53",
    "artist": "Megumi Mizutani",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Rapid Strike"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Staryu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Multishot Star",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard any amount of Water Energy from this Pokémon. Then, for each Energy card you discarded in this way, choose 1 of your opponent's Pokémon and do 30 damage to it. (You can choose the same Pokémon more than once.) This damage isn't affected by Weakness or Resistance."
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
    "flavorText": "It rotates its geometrically shaped body to swim through the water. It always seems to be sending out mysterious radio waves.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/53.png",
      "large": "https://images.pokemontcg.io/swsh8/53_hires.png"
    }
  },
  {
    "id": "swsh8-54",
    "name": "Lapras",
    "number": "54",
    "artist": "Naoki Saito",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
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
        "name": "Icy Wind",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Splash Arch",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Put all Energy attached to this Pokémon into your hand. This attack does 100 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": "Crossing icy seas is no issue for this cold-resistant Pokémon. Its smooth skin is a little cool to the touch.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/54.png",
      "large": "https://images.pokemontcg.io/swsh8/54_hires.png"
    }
  },
  {
    "id": "swsh8-55",
    "name": "Totodile",
    "number": "55",
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
    "evolvesTo": [
      "Croconaw"
    ],
    "rules": [],
    "abilities": [],
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
      158
    ],
    "flavorText": "Its powerful, well-developed jaws are capable of crushing anything. Even its Trainer must be careful.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/55.png",
      "large": "https://images.pokemontcg.io/swsh8/55_hires.png"
    }
  },
  {
    "id": "swsh8-56",
    "name": "Croconaw",
    "number": "56",
    "artist": "Tomokazu Komiya",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Totodile",
    "evolvesTo": [
      "Feraligatr"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wave Splash",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Surf",
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
      159
    ],
    "flavorText": "Once it bites down, it won't let go until it loses its fangs. New fangs quickly grow into place.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/56.png",
      "large": "https://images.pokemontcg.io/swsh8/56_hires.png"
    }
  },
  {
    "id": "swsh8-57",
    "name": "Feraligatr",
    "number": "57",
    "artist": "Anesaki Dynamic",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Croconaw",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Rowdy",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you must flip a coin. If heads, discard the top 5 cards of your opponent's deck. If tails, discard the top 5 cards of your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Crunch",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "140",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      160
    ],
    "flavorText": "When it bites with its massive and powerful jaws, it shakes its head and savagely tears its victim up.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/57.png",
      "large": "https://images.pokemontcg.io/swsh8/57_hires.png"
    }
  },
  {
    "id": "swsh8-58",
    "name": "Marill",
    "number": "58",
    "artist": "sowsow",
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
      "Azumarill"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Aqua Liner",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Let's All Rollout",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage for each of your Benched Pokémon that has the Let's All Rollout attack."
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
      183
    ],
    "flavorText": "Even after Marill swims in a cold sea, its water- repellent fur dries almost as soon as Marill leaves the water. That's why this Pokémon is never cold.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/58.png",
      "large": "https://images.pokemontcg.io/swsh8/58_hires.png"
    }
  },
  {
    "id": "swsh8-59",
    "name": "Azumarill",
    "number": "59",
    "artist": "Sanosuke Sakuma",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Marill",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dive and Rescue",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put up to 3 in any combination of Pokémon and Supporter cards from your discard pile into your hand."
      },
      {
        "name": "Surf",
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
      184
    ],
    "flavorText": "The bubble-like pattern on its stomach helps it camouflage itself when it's in the water.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/59.png",
      "large": "https://images.pokemontcg.io/swsh8/59_hires.png"
    }
  },
  {
    "id": "swsh8-60",
    "name": "Qwilfish",
    "number": "60",
    "artist": "HYOGONOSUKE",
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
        "text": "Draw a card."
      },
      {
        "name": "Spike Sting",
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
      211
    ],
    "flavorText": "The small spikes covering its body developed from scales. They inject a toxin that causes fainting.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/60.png",
      "large": "https://images.pokemontcg.io/swsh8/60_hires.png"
    }
  },
  {
    "id": "swsh8-61",
    "name": "Mantine",
    "number": "61",
    "artist": "Saya Tsuruta",
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
        "name": "Bounce",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "You may switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Wave Splash",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      226
    ],
    "flavorText": "As it majestically swims, it doesn't care if Remoraid attach to it to scavenge for its leftovers.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/61.png",
      "large": "https://images.pokemontcg.io/swsh8/61_hires.png"
    }
  },
  {
    "id": "swsh8-62",
    "name": "Mudkip",
    "number": "62",
    "artist": "KIYOTAKA OSHIYAMA",
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
      "Marshtomp"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mud-Slap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Playful Kick",
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
      258
    ],
    "flavorText": "To alert it, the fin on its head senses the flow of water. It has the strength to heft boulders.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/62.png",
      "large": "https://images.pokemontcg.io/swsh8/62_hires.png"
    }
  },
  {
    "id": "swsh8-63",
    "name": "Marshtomp",
    "number": "63",
    "artist": "tetsuya koizumi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Mudkip",
    "evolvesTo": [
      "Swampert"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mud-Slap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Energy Loop",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Put an Energy attached to this Pokémon into your hand."
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
      259
    ],
    "flavorText": "Living on muddy ground that provides poor footing has made its legs sturdy.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/63.png",
      "large": "https://images.pokemontcg.io/swsh8/63_hires.png"
    }
  },
  {
    "id": "swsh8-64",
    "name": "Swampert",
    "number": "64",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Marshtomp",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Muddy Maker",
        "text": "Once during your turn, you may attach a Water Energy card or a Fighting Energy card from your hand to 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Earthquake",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
        "text": "This attack also does 20 damage to each of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      260
    ],
    "flavorText": "It can swim while towing a large ship. It bashes down foes with a swing of its thick arms.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/64.png",
      "large": "https://images.pokemontcg.io/swsh8/64_hires.png"
    }
  },
  {
    "id": "swsh8-65",
    "name": "Clamperl",
    "number": "65",
    "artist": "Anesaki Dynamic",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Fusion Strike"
    ],
    "hp": "60",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Huntail",
      "Gorebyss"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bursting Bubble",
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
      366
    ],
    "flavorText": "Clamperl's pearls are exceedingly precious. They can be more than 10 times as costly as Shellder's pearls.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/65.png",
      "large": "https://images.pokemontcg.io/swsh8/65_hires.png"
    }
  },
  {
    "id": "swsh8-66",
    "name": "Huntail",
    "number": "66",
    "artist": "otumami",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Fusion Strike"
    ],
    "hp": "110",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Clamperl",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Single Strike Jammer",
        "text": "Your opponent's Single Strike Pokémon's attacks cost Colorless more.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Cavernous Chomp",
        "cost": [
          "Water",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      367
    ],
    "flavorText": "Deep seas are their habitat. According to tradition, when Huntail wash up onshore, something unfortunate will happen.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/66.png",
      "large": "https://images.pokemontcg.io/swsh8/66_hires.png"
    }
  },
  {
    "id": "swsh8-67",
    "name": "Gorebyss",
    "number": "67",
    "artist": "Misa Tsutsui",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Fusion Strike"
    ],
    "hp": "110",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Clamperl",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Rapid Strike Canceler",
        "text": "Your opponent's Rapid Strike Pokémon in play have no Abilities.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Draining Kiss",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Heal 30 damage from this Pokémon."
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
      368
    ],
    "flavorText": "It sucks bodily fluids out of its prey. The leftover meat sinks to the seafloor, where it becomes food for other Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/67.png",
      "large": "https://images.pokemontcg.io/swsh8/67_hires.png"
    }
  },
  {
    "id": "swsh8-68",
    "name": "Panpour",
    "number": "68",
    "artist": "Sekio",
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
        "name": "Pry",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Your opponent reveals their hand."
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
    "flavorText": "The water stored inside the tuft on its head is full of nutrients. Plants that receive its water grow large.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/68.png",
      "large": "https://images.pokemontcg.io/swsh8/68_hires.png"
    }
  },
  {
    "id": "swsh8-69",
    "name": "Simipour",
    "number": "69",
    "artist": "Shin Nagasawa",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Panpour",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Water Pulse",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Circus Soaking",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60×",
        "text": "Your opponent reveals their hand. This attack does 60 damage for each Supporter card you find there."
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
    "flavorText": "It prefers places with clean water. When its tuft runs low, it replenishes it by siphoning up water with its tail.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/69.png",
      "large": "https://images.pokemontcg.io/swsh8/69_hires.png"
    }
  },
  {
    "id": "swsh8-70",
    "name": "Basculin",
    "number": "70",
    "artist": "Souichirou Gunjima",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Swarm the Wound",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 10 more damage for each damage counter on your opponent's Active Pokémon."
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
    "flavorText": "Known for their violence, these Pokémon have the most fights with schools of red-striped Basculin.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/70.png",
      "large": "https://images.pokemontcg.io/swsh8/70_hires.png"
    }
  },
  {
    "id": "swsh8-71",
    "name": "Galarian Darumaka",
    "number": "71",
    "artist": "Atsuko Nishida",
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
      "Darmanitan"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Reckless Charge",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If tails, this Pokémon also does 10 damage to itself."
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
      554
    ],
    "flavorText": "The colder they get, the more energetic they are. They freeze their breath to make snowballs, using them as ammo for playful snowball fights.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/71.png",
      "large": "https://images.pokemontcg.io/swsh8/71_hires.png"
    }
  },
  {
    "id": "swsh8-72",
    "name": "Galarian Darmanitan",
    "number": "72",
    "artist": "SATOSHI NAKAI",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Galarian Darumaka",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Powder Snow",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Daruma Headbutt",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "If this Pokémon has any damage counters on it, this attack can be used for Water."
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
      555
    ],
    "flavorText": "Though it has a gentle disposition, it's also very strong. It will quickly freeze the snowball on its head before going for a headbutt.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/72.png",
      "large": "https://images.pokemontcg.io/swsh8/72_hires.png"
    }
  },
  {
    "id": "swsh8-73",
    "name": "Greninja V",
    "number": "73",
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
        "name": "Water Drip",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Dancing Shuriken",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80×",
        "text": "Flip 3 coins. This attack does 80 damage for each heads."
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
      658
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/73.png",
      "large": "https://images.pokemontcg.io/swsh8/73_hires.png"
    }
  },
  {
    "id": "swsh8-74",
    "name": "Clauncher",
    "number": "74",
    "artist": "Pani Kobayashi",
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
      "Clawitzer"
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
        "name": "Vise Grip",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      692
    ],
    "flavorText": "It moves around by jetting water from its right pincer. It has a poor sense of balance, so it's terrible at swimming straight.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/74.png",
      "large": "https://images.pokemontcg.io/swsh8/74_hires.png"
    }
  },
  {
    "id": "swsh8-75",
    "name": "Clawitzer",
    "number": "75",
    "artist": "tetsuya koizumi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Clauncher",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Snipe Shot",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 50 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Crabhammer",
        "cost": [
          "Water",
          "Water",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      693
    ],
    "flavorText": "Its right arm is packed with meat. When its pincer falls off, it's exported to be used as a cooking ingredient.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/75.png",
      "large": "https://images.pokemontcg.io/swsh8/75_hires.png"
    }
  },
  {
    "id": "swsh8-76",
    "name": "Crabominable V",
    "number": "76",
    "artist": "MUGENUP",
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
        "name": "Trigger Avalanche",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard the top 2 cards of your opponent's deck."
      },
      {
        "name": "Destroyer Punch",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "This attack does 60 more damage for each damage counter on your opponent's Active Pokémon."
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
      740
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/76.png",
      "large": "https://images.pokemontcg.io/swsh8/76_hires.png"
    }
  },
  {
    "id": "swsh8-77",
    "name": "Pyukumuku",
    "number": "77",
    "artist": "Tomokazu Komiya",
    "rarity": "Uncommon",
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
        "name": "Pitch a Pyukumuku",
        "text": "Once during your turn, if this Pokémon is in your hand, you may reveal it and put it on the bottom of your deck. If you do, draw a card. You can't use more than 1 Pitch a Pyukumuku Ability each turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Knuckle Punch",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      771
    ],
    "flavorText": "It's covered in a slime that keeps its skin moist, allowing it to stay on land for days without drying up.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/77.png",
      "large": "https://images.pokemontcg.io/swsh8/77_hires.png"
    }
  },
  {
    "id": "swsh8-78",
    "name": "Inteleon V",
    "number": "78",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Rapid Strike"
    ],
    "hp": "200",
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
        "name": "Surf",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Aqua Bullet",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This attack also does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      818
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/78.png",
      "large": "https://images.pokemontcg.io/swsh8/78_hires.png"
    }
  },
  {
    "id": "swsh8-79",
    "name": "Inteleon VMAX",
    "number": "79",
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
    "evolvesFrom": "Inteleon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Double Gunner",
        "text": "You must discard a Water Energy card from your hand in order to use this Ability. Once during your turn, you may choose 2 of your opponent's Benched Pokémon and put 2 damage counters on each of them.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "G-Max Spiral",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70+",
        "text": "You may put an Energy attached to this Pokémon into your hand. If you do, this attack does 70 more damage."
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
      818
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/79.png",
      "large": "https://images.pokemontcg.io/swsh8/79_hires.png"
    }
  },
  {
    "id": "swsh8-80",
    "name": "Chewtle",
    "number": "80",
    "artist": "Saya Tsuruta",
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
      "Drednaw"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bite",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      833
    ],
    "flavorText": "It starts off battles by attacking with its rock-hard horn, but as soon as the opponent flinches, this Pokémon bites down and never lets go.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/80.png",
      "large": "https://images.pokemontcg.io/swsh8/80_hires.png"
    }
  },
  {
    "id": "swsh8-81",
    "name": "Drednaw",
    "number": "81",
    "artist": "kodama",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Chewtle",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hard Bite",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "Flip a coin. If heads, this attack does 50 more damage."
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
      834
    ],
    "flavorText": "This Pokémon rapidly extends its retractable neck to sink its sharp fangs into distant enemies and take them down.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/81.png",
      "large": "https://images.pokemontcg.io/swsh8/81_hires.png"
    }
  },
  {
    "id": "swsh8-82",
    "name": "Arrokuda",
    "number": "82",
    "artist": "Miki Tanaka",
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
      "Barraskewda"
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
      846
    ],
    "flavorText": "After it's eaten its fill, its movements become extremely sluggish. That's when Cramorant swallows it up.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/82.png",
      "large": "https://images.pokemontcg.io/swsh8/82_hires.png"
    }
  },
  {
    "id": "swsh8-83",
    "name": "Barraskewda",
    "number": "83",
    "artist": "Hideki Ishikawa",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Arrokuda",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pierce",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
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
      847
    ],
    "flavorText": "It spins its tail fins to propel itself, surging forward at speeds of over 100 knots before ramming prey and spearing into them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/83.png",
      "large": "https://images.pokemontcg.io/swsh8/83_hires.png"
    }
  },
  {
    "id": "swsh8-84",
    "name": "Snom",
    "number": "84",
    "artist": "Yuka Morii",
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
      "Frosmoth"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Find Ice",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Water Energy cards, reveal them, and put them into your hand. Then, shuffle your deck."
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
    "flavorText": "It eats snow that piles up on the ground. The more snow it eats, the bigger and more impressive the spikes on its back grow.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/84.png",
      "large": "https://images.pokemontcg.io/swsh8/84_hires.png"
    }
  },
  {
    "id": "swsh8-85",
    "name": "Frosmoth",
    "number": "85",
    "artist": "chibi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Snom",
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
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Blizzard Loop",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Put all Energy attached to this Pokémon into your hand."
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
      873
    ],
    "flavorText": "It shows no mercy to any who desecrate fields and mountains. It will fly around on its icy wings, causing a blizzard to chase offenders away.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/85.png",
      "large": "https://images.pokemontcg.io/swsh8/85_hires.png"
    }
  },
  {
    "id": "swsh8-86",
    "name": "Pikachu V",
    "number": "86",
    "artist": "5ban Graphics",
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
    "evolvesTo": [
      "Raichu"
    ],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Tail Whap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Thunderbolt",
        "cost": [
          "Lightning",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/86.png",
      "large": "https://images.pokemontcg.io/swsh8/86_hires.png"
    }
  },
  {
    "id": "swsh8-87",
    "name": "Voltorb",
    "number": "87",
    "artist": "Tomokazu Komiya",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Single Strike"
    ],
    "hp": "60",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Electrode"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Single Shot Blast",
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
      100
    ],
    "flavorText": "Usually found in power plants. Easily mistaken for a Poké Ball, it has zapped many people.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/87.png",
      "large": "https://images.pokemontcg.io/swsh8/87_hires.png"
    }
  },
  {
    "id": "swsh8-88",
    "name": "Electrode",
    "number": "88",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Single Strike"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Voltorb",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sonic Boom",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "This attack's damage isn't affected by Weakness or Resistance."
      },
      {
        "name": "Explosion",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "120",
        "text": "This Pokémon also does 90 damage to itself."
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
      101
    ],
    "flavorText": "It stores an overflowing amount of electric energy inside its body. Even a small shock makes it explode.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/88.png",
      "large": "https://images.pokemontcg.io/swsh8/88_hires.png"
    }
  },
  {
    "id": "swsh8-89",
    "name": "Plusle",
    "number": "89",
    "artist": "Megumi Higuchi",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
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
        "name": "Spark Duo",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "If 1 of your Minun used an attack during your last turn, this attack does 100 more damage."
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
    "flavorText": "It absorbs electricity from telephone poles. It shorts out its body to create crackling noises.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/89.png",
      "large": "https://images.pokemontcg.io/swsh8/89_hires.png"
    }
  },
  {
    "id": "swsh8-90",
    "name": "Minun",
    "number": "90",
    "artist": "HYOGONOSUKE",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
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
        "name": "Call for Family",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Static Shock",
        "cost": [
          "Lightning"
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
      312
    ],
    "flavorText": "It cheers on friends. If its friends are losing, its body lets off more and more sparks.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/90.png",
      "large": "https://images.pokemontcg.io/swsh8/90_hires.png"
    }
  },
  {
    "id": "swsh8-91",
    "name": "Shinx",
    "number": "91",
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
      },
      {
        "name": "Electric Claws",
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
      403
    ],
    "flavorText": "All of its fur dazzles if danger is sensed. It flees while the foe is momentarily blinded.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/91.png",
      "large": "https://images.pokemontcg.io/swsh8/91_hires.png"
    }
  },
  {
    "id": "swsh8-92",
    "name": "Luxio",
    "number": "92",
    "artist": "Tika Matsuno",
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
        "name": "Electric Claws",
        "cost": [
          "Lightning",
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
      404
    ],
    "flavorText": "Strong electricity courses through the tips of its sharp claws. A light scratch causes fainting in foes.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/92.png",
      "large": "https://images.pokemontcg.io/swsh8/92_hires.png"
    }
  },
  {
    "id": "swsh8-93",
    "name": "Luxray",
    "number": "93",
    "artist": "Atsushi Furusawa",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Luxio",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Thunder Claws",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      405
    ],
    "flavorText": "Luxray's ability to see through objects comes in handy when it's scouting for danger.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/93.png",
      "large": "https://images.pokemontcg.io/swsh8/93_hires.png"
    }
  },
  {
    "id": "swsh8-94",
    "name": "Rotom",
    "number": "94",
    "artist": "Sekio",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Surprise Short",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard all Pokémon Tools from all of your opponent's Pokémon."
      },
      {
        "name": "Static Shock",
        "cost": [
          "Lightning"
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
      479
    ],
    "flavorText": "With a body made of plasma, it can inhabit all sorts of machines. It loves to surprise others.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/94.png",
      "large": "https://images.pokemontcg.io/swsh8/94_hires.png"
    }
  },
  {
    "id": "swsh8-95",
    "name": "Tynamo",
    "number": "95",
    "artist": "Yuka Morii",
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
      "Eelektrik"
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
      602
    ],
    "flavorText": "One alone can emit only a trickle of electricity, so a group of them gathers to unleash a powerful electric shock.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/95.png",
      "large": "https://images.pokemontcg.io/swsh8/95_hires.png"
    }
  },
  {
    "id": "swsh8-96",
    "name": "Eelektrik",
    "number": "96",
    "artist": "Shigenori Negishi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Tynamo",
    "evolvesTo": [
      "Eelektross"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Lightning Ball",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Thunder",
        "cost": [
          "Lightning",
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
      603
    ],
    "flavorText": "These Pokémon have a big appetite. When they spot their prey, they attack it and paralyze it with electricity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/96.png",
      "large": "https://images.pokemontcg.io/swsh8/96_hires.png"
    }
  },
  {
    "id": "swsh8-97",
    "name": "Eelektross",
    "number": "97",
    "artist": "OKACHEKE",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Eelektrik",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Upper Shock",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "If this Pokémon evolved from Eelektrik during this turn, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Wild Charge",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "This Pokémon also does 30 damage to itself."
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
      604
    ],
    "flavorText": "They crawl out of the ocean using their arms. They will attack prey on shore and immediately drag it into the ocean.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/97.png",
      "large": "https://images.pokemontcg.io/swsh8/97_hires.png"
    }
  },
  {
    "id": "swsh8-98",
    "name": "Helioptile",
    "number": "98",
    "artist": "Mina Nakai",
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
        "name": "Gnaw",
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
      694
    ],
    "flavorText": "The sun powers this Pokémon's electricity generation. Interruption of that process stresses Helioptile to the point of weakness.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/98.png",
      "large": "https://images.pokemontcg.io/swsh8/98_hires.png"
    }
  },
  {
    "id": "swsh8-99",
    "name": "Heliolisk",
    "number": "99",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Helioptile",
    "evolvesTo": [],
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
      },
      {
        "name": "Electrobullet",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "This attack also does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": "One Heliolisk basking in the sun with its frill outspread is all it would take to produce enough electricity to power a city.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/99.png",
      "large": "https://images.pokemontcg.io/swsh8/99_hires.png"
    }
  },
  {
    "id": "swsh8-100",
    "name": "Charjabug",
    "number": "100",
    "artist": "sowsow",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Grubbin",
    "evolvesTo": [
      "Vikavolt"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Vise Grip",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Head Bolt",
        "cost": [
          "Lightning",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      737
    ],
    "flavorText": "Its digestive processes convert the leaves it eats into electricity. An electric sac in its belly stores the electricity for later use.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/100.png",
      "large": "https://images.pokemontcg.io/swsh8/100_hires.png"
    }
  },
  {
    "id": "swsh8-101",
    "name": "Vikavolt",
    "number": "101",
    "artist": "nagimiso",
    "rarity": "Rare",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Bite",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": ""
      },
      {
        "name": "Electro Blaster",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "",
        "text": "Discard 2 Lightning Energy from this Pokémon. This attack does 200 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      738
    ],
    "flavorText": "If it carries a Charjabug to use as a spare battery, a flying Vikavolt can rapidly fire high-powered beams of electricity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/101.png",
      "large": "https://images.pokemontcg.io/swsh8/101_hires.png"
    }
  },
  {
    "id": "swsh8-102",
    "name": "Zeraora",
    "number": "102",
    "artist": "Teeziro",
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
        "name": "Wild Charge",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      807
    ],
    "flavorText": "It approaches its enemies at the speed of lightning, then tears them limb from limb with its sharp claws.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/102.png",
      "large": "https://images.pokemontcg.io/swsh8/102_hires.png"
    }
  },
  {
    "id": "swsh8-103",
    "name": "Boltund V",
    "number": "103",
    "artist": "Shin Nagasawa",
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
        "name": "Smash Turn",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "You may switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Electrobullet",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This attack also does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      836
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/103.png",
      "large": "https://images.pokemontcg.io/swsh8/103_hires.png"
    }
  },
  {
    "id": "swsh8-104",
    "name": "Boltund VMAX",
    "number": "104",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "320",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Boltund V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Bolt Storm",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 30 more damage for each Lightning Energy attached to all of your Pokémon."
      },
      {
        "name": "Max Bolt",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "230",
        "text": "During your next turn, this Pokémon can't use Max Bolt."
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
      836
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/104.png",
      "large": "https://images.pokemontcg.io/swsh8/104_hires.png"
    }
  },
  {
    "id": "swsh8-105",
    "name": "Toxel",
    "number": "105",
    "artist": "Mina Nakai",
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
      "Toxtricity"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ram",
        "cost": [
          "Lightning"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      848
    ],
    "flavorText": "It manipulates the chemical makeup of its poison to produce electricity. The voltage is weak, but it can cause a tingling paralysis.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/105.png",
      "large": "https://images.pokemontcg.io/swsh8/105_hires.png"
    }
  },
  {
    "id": "swsh8-106",
    "name": "Toxel",
    "number": "106",
    "artist": "kodama",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Fusion Strike"
    ],
    "hp": "60",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Toxtricity"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Growl",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, the Defending Pokémon's attacks do 30 less damage (before applying Weakness and Resistance)."
      },
      {
        "name": "Tiny Bolt",
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
      848
    ],
    "flavorText": "It manipulates the chemical makeup of its poison to produce electricity. The voltage is weak, but it can cause a tingling paralysis.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/106.png",
      "large": "https://images.pokemontcg.io/swsh8/106_hires.png"
    }
  },
  {
    "id": "swsh8-107",
    "name": "Toxtricity",
    "number": "107",
    "artist": "Ryuta Fuse",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Toxel",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Punk Shock",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "You may choose to make your opponent's Active Pokémon Paralyzed. If you do, this Pokémon also does 70 damage to itself."
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
      849
    ],
    "flavorText": "This short-tempered and aggressive Pokémon chugs stagnant water to absorb any toxins it might contain.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/107.png",
      "large": "https://images.pokemontcg.io/swsh8/107_hires.png"
    }
  },
  {
    "id": "swsh8-108",
    "name": "Toxtricity",
    "number": "108",
    "artist": "nagimiso",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Fusion Strike"
    ],
    "hp": "120",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Toxel",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Maximum Downer",
        "text": "If all your Pokémon in play are Fusion Strike Pokémon, your opponent's Pokémon VMAX in play get -30 HP.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Head Bolt",
        "cost": [
          "Lightning",
          "Lightning",
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
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      849
    ],
    "flavorText": "It has an electrical organ on its chest. While generating electricity, it fills its surroundings with sounds like the strumming of a bass guitar.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/108.png",
      "large": "https://images.pokemontcg.io/swsh8/108_hires.png"
    }
  },
  {
    "id": "swsh8-109",
    "name": "Morpeko",
    "number": "109",
    "artist": "Sanosuke Sakuma",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Targeted Spark",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 30 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      877
    ],
    "flavorText": "It carries electrically roasted seeds with it as if they're precious treasures. No matter how much it eats, it always gets hungry again in short order.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/109.png",
      "large": "https://images.pokemontcg.io/swsh8/109_hires.png"
    }
  },
  {
    "id": "swsh8-110",
    "name": "Jigglypuff",
    "number": "110",
    "artist": "Saya Tsuruta",
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
      "Wigglytuff"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pound",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Let's All Rollout",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage for each of your Benched Pokémon that has the Let's All Rollout attack."
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
      39
    ],
    "flavorText": "The songs they sing are totally different depending on the region they live in. Some even sound like they're shouting!",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/110.png",
      "large": "https://images.pokemontcg.io/swsh8/110_hires.png"
    }
  },
  {
    "id": "swsh8-111",
    "name": "Wigglytuff",
    "number": "111",
    "artist": "Asako Ito",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Jigglypuff",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Find Treasure",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 cards and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Hyper Voice",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      40
    ],
    "flavorText": "When it gets angry, it inhales with all its might, and its body gradually inflates. Sometimes they can grow 20 times larger!",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/111.png",
      "large": "https://images.pokemontcg.io/swsh8/111_hires.png"
    }
  },
  {
    "id": "swsh8-112",
    "name": "Jynx",
    "number": "112",
    "artist": "Shigenori Negishi",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Psychic"
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
        "name": "Dazzle Dance",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      124
    ],
    "flavorText": "Its strange cries sound like human language. There are some musicians who compose songs for Jynx to sing.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/112.png",
      "large": "https://images.pokemontcg.io/swsh8/112_hires.png"
    }
  },
  {
    "id": "swsh8-113",
    "name": "Mew V",
    "number": "113",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Fusion Strike"
    ],
    "hp": "180",
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
        "name": "Energy Mix",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for an Energy card and attach it to 1 of your Fusion Strike Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Psychic Leap",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "You may shuffle this Pokémon and all attached cards into your deck."
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
      151
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/113.png",
      "large": "https://images.pokemontcg.io/swsh8/113_hires.png"
    }
  },
  {
    "id": "swsh8-114",
    "name": "Mew VMAX",
    "number": "114",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Fusion Strike"
    ],
    "hp": "310",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Mew V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Cross Fusion Strike",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your Benched Fusion Strike Pokémon's attacks and use it as this attack."
      },
      {
        "name": "Max Miracle",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "130",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
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
      151
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/114.png",
      "large": "https://images.pokemontcg.io/swsh8/114_hires.png"
    }
  },
  {
    "id": "swsh8-115",
    "name": "Snubbull",
    "number": "115",
    "artist": "Kyoko Umemoto",
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
      "Granbull"
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
      },
      {
        "name": "Bite",
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
      209
    ],
    "flavorText": "In contrast to its appearance, it's quite timid. When playing with other puppy Pokémon, it sometimes gets bullied.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/115.png",
      "large": "https://images.pokemontcg.io/swsh8/115_hires.png"
    }
  },
  {
    "id": "swsh8-116",
    "name": "Granbull",
    "number": "116",
    "artist": "Akira Komayama",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Snubbull",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Dig Up",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may put up to 2 Pokémon Tool cards from your discard pile into your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Bite",
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
    "flavorText": "Although it's popular with young people, Granbull is timid and sensitive, so it's totally incompetent as a watchdog.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/116.png",
      "large": "https://images.pokemontcg.io/swsh8/116_hires.png"
    }
  },
  {
    "id": "swsh8-117",
    "name": "Galarian Corsola",
    "number": "117",
    "artist": "Kouki Saitou",
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
      "Cursola"
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
      222
    ],
    "flavorText": "Sudden climate change wiped out this ancient kind of Corsola. This Pokémon absorbs others' life-force through its branches.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/117.png",
      "large": "https://images.pokemontcg.io/swsh8/117_hires.png"
    }
  },
  {
    "id": "swsh8-118",
    "name": "Galarian Cursola",
    "number": "118",
    "artist": "Misa Tsutsui",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Galarian Corsola",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Force Regeneration",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put a Basic Pokémon V from your opponent's discard pile onto their Bench. If you do, put damage counters on that Pokémon until its remaining HP is 30."
      },
      {
        "name": "Spooky Shot",
        "cost": [
          "Psychic",
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
      864
    ],
    "flavorText": "Be cautious of the ectoplasmic body surrounding its soul. You'll become stiff as stone if you touch it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/118.png",
      "large": "https://images.pokemontcg.io/swsh8/118_hires.png"
    }
  },
  {
    "id": "swsh8-119",
    "name": "Mawile",
    "number": "119",
    "artist": "Kouki Saitou",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Chomp Chomp Hold",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, the Defending Pokémon's attacks cost Colorless more, and its Retreat Cost is Colorless more."
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
      303
    ],
    "flavorText": "It chomps with its gaping mouth. Its huge jaws are actually steel horns that have been transformed.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/119.png",
      "large": "https://images.pokemontcg.io/swsh8/119_hires.png"
    }
  },
  {
    "id": "swsh8-120",
    "name": "Deoxys",
    "number": "120",
    "artist": "Kouki Saitou",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Fusion Strike",
      "Single Strike",
      "Rapid Strike"
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
        "name": "Photon Boost",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If this Pokémon has any Fusion Strike Energy attached, this attack does 80 more damage."
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
      386
    ],
    "flavorText": "DNA from a space virus mutated and became a Pokémon. It appears where auroras are seen.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/120.png",
      "large": "https://images.pokemontcg.io/swsh8/120_hires.png"
    }
  },
  {
    "id": "swsh8-121",
    "name": "Munna",
    "number": "121",
    "artist": "miki kudo",
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
      "Musharna"
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
      517
    ],
    "flavorText": "It eats dreams and releases mist. The mist is pink when it's eating a good dream, and black when it's eating a nightmare.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/121.png",
      "large": "https://images.pokemontcg.io/swsh8/121_hires.png"
    }
  },
  {
    "id": "swsh8-122",
    "name": "Musharna",
    "number": "122",
    "artist": "Tika Matsuno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Munna",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sleep Inducer",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch 1 of your opponent's Benched Pokémon with their Active Pokémon. The new Active Pokémon is now Asleep."
      },
      {
        "name": "Psychic",
        "cost": [
          "Psychic",
          "Colorless"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      518
    ],
    "flavorText": "It drowses and dreams all the time. It's best to leave it be if it's just woken up, as it's a terrible grump when freshly roused from sleep.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/122.png",
      "large": "https://images.pokemontcg.io/swsh8/122_hires.png"
    }
  },
  {
    "id": "swsh8-123",
    "name": "Sigilyph",
    "number": "123",
    "artist": "Yukiko Baba",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Joust",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Before doing damage, discard all Pokémon Tools from your opponent's Active Pokémon."
      },
      {
        "name": "Reflect Energy",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
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
    "flavorText": "A discovery was made in the desert where Sigilyph fly. The ruins of what may have been an ancient city were found beneath the sands.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/123.png",
      "large": "https://images.pokemontcg.io/swsh8/123_hires.png"
    }
  },
  {
    "id": "swsh8-124",
    "name": "Meloetta",
    "number": "124",
    "artist": "kirisAki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Fusion Strike"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Melodious Echo",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70×",
        "text": "This attack does 70 damage for each Fusion Strike Energy attached to all of your Pokémon."
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
      648
    ],
    "flavorText": "Its melodies are sung with a special vocalization method that can control the feelings of those who hear it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/124.png",
      "large": "https://images.pokemontcg.io/swsh8/124_hires.png"
    }
  },
  {
    "id": "swsh8-125",
    "name": "Sandygast",
    "number": "125",
    "artist": "KIYOTAKA OSHIYAMA",
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
      "Palossand"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Vibration",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Spooky Shot",
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
      769
    ],
    "flavorText": "If you build sand mounds when you're playing, destroy them before you go home, or they may get possessed and become Sandygast.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/125.png",
      "large": "https://images.pokemontcg.io/swsh8/125_hires.png"
    }
  },
  {
    "id": "swsh8-126",
    "name": "Palossand",
    "number": "126",
    "artist": "Shibuzoh.",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Sandygast",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spooky Sand",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": ""
      },
      {
        "name": "Oppressing Sandstorm",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "",
        "text": "If your opponent's Active Pokémon is a Basic Pokémon, it is Knocked Out."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      770
    ],
    "flavorText": "Once it has whipped up a sandstorm to halt its opponents in their tracks, this terrifying Pokémon snatches away their vitality.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/126.png",
      "large": "https://images.pokemontcg.io/swsh8/126_hires.png"
    }
  },
  {
    "id": "swsh8-127",
    "name": "Indeedee",
    "number": "127",
    "artist": "Misa Tsutsui",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Call for Family",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Heart Sign",
        "cost": [
          "Psychic",
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
      876
    ],
    "flavorText": "They diligently serve people and Pokémon so they can gather feelings of gratitude. The females are particularly good at babysitting.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/127.png",
      "large": "https://images.pokemontcg.io/swsh8/127_hires.png"
    }
  },
  {
    "id": "swsh8-128",
    "name": "Dreepy",
    "number": "128",
    "artist": "Teeziro",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Fusion Strike"
    ],
    "hp": "60",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Drakloak"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Infestation",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
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
      885
    ],
    "flavorText": "If this weak Pokémon is by itself, a mere child could defeat it. But if Dreepy has friends to help it train, it can evolve and become much stronger.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/128.png",
      "large": "https://images.pokemontcg.io/swsh8/128_hires.png"
    }
  },
  {
    "id": "swsh8-129",
    "name": "Drakloak",
    "number": "129",
    "artist": "HYOGONOSUKE",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Fusion Strike"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Dreepy",
    "evolvesTo": [
      "Dragapult"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spooky Shot",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "U-turn",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
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
      886
    ],
    "flavorText": "Without a Dreepy to place on its head and care for, it gets so uneasy it'll try to substitute any Pokémon it finds for the missing Dreepy.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/129.png",
      "large": "https://images.pokemontcg.io/swsh8/129_hires.png"
    }
  },
  {
    "id": "swsh8-130",
    "name": "Dragapult",
    "number": "130",
    "artist": "Souichirou Gunjima",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Fusion Strike"
    ],
    "hp": "150",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Drakloak",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fusion Strike Assault",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30×",
        "text": "This attack does 30 damage for each of your Fusion Strike Pokémon in play."
      },
      {
        "name": "Speed Attack",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      887
    ],
    "flavorText": "Apparently the Dreepy inside Dragapult's horns eagerly look forward to being launched out at Mach speeds.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/130.png",
      "large": "https://images.pokemontcg.io/swsh8/130_hires.png"
    }
  },
  {
    "id": "swsh8-131",
    "name": "Sandshrew",
    "number": "131",
    "artist": "Yuka Morii",
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
      "Sandslash"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dig It Up",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top card of your deck. You may discard that card."
      },
      {
        "name": "Let's All Rollout",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage for each of your Benched Pokémon that has the Let's All Rollout attack."
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
    "flavorText": "When its skin gets wrinkled from moisture, it heads for a volcano. It lies flat on a spot with a lot of geothermal heat and dries itself out.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/131.png",
      "large": "https://images.pokemontcg.io/swsh8/131_hires.png"
    }
  },
  {
    "id": "swsh8-132",
    "name": "Sandslash",
    "number": "132",
    "artist": "Kyoko Umemoto",
    "rarity": "Uncommon",
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
        "name": "Dig Uppercut",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Put a card from your discard pile into your hand."
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
      28
    ],
    "flavorText": "Thanks to its thick claws, it's good at climbing trees. There are plenty of Sandslash that park themselves in trees and go right to sleep.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/132.png",
      "large": "https://images.pokemontcg.io/swsh8/132_hires.png"
    }
  },
  {
    "id": "swsh8-133",
    "name": "Mankey",
    "number": "133",
    "artist": "sowsow",
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
      "Primeape"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scratch",
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
      56
    ],
    "flavorText": "If one gets angry, all the others around it will get angry, so silence is a rare visitor in a troop of Mankey.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/133.png",
      "large": "https://images.pokemontcg.io/swsh8/133_hires.png"
    }
  },
  {
    "id": "swsh8-134",
    "name": "Primeape",
    "number": "134",
    "artist": "Yuya Oka",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Mankey",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gut Punch",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "30+",
        "text": "If your opponent's Active Pokémon is a Pokémon V, this attack does 60 more damage."
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
      57
    ],
    "flavorText": "The blood vessels in its brain are sturdier than those of other Pokémon, so it can stay healthy despite its constant raging.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/134.png",
      "large": "https://images.pokemontcg.io/swsh8/134_hires.png"
    }
  },
  {
    "id": "swsh8-135",
    "name": "Geodude",
    "number": "135",
    "artist": "OKACHEKE",
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
        "name": "Light Punch",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      74
    ],
    "flavorText": "It uses both hands to climb precipitous cliffs. People who see it in action have been known to take up bouldering.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/135.png",
      "large": "https://images.pokemontcg.io/swsh8/135_hires.png"
    }
  },
  {
    "id": "swsh8-136",
    "name": "Graveler",
    "number": "136",
    "artist": "Masakazu Fukuda",
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
        "name": "Tackle",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Boulder Crush",
        "cost": [
          "Fighting",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      75
    ],
    "flavorText": "It travels by rolling down cliffs. If it falls into a river, it will explode with its last gasp.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/136.png",
      "large": "https://images.pokemontcg.io/swsh8/136_hires.png"
    }
  },
  {
    "id": "swsh8-137",
    "name": "Golem",
    "number": "137",
    "artist": "KEIICHIRO ITO",
    "rarity": "Rare",
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
    "abilities": [
      {
        "name": "Desperate Blast",
        "text": "If this Pokémon is in the Active Spot and is Knocked Out by damage from an attack from your opponent's Pokémon, put 10 damage counters on the Attacking Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Double-Edge",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      76
    ],
    "flavorText": "It detonates its own body. The power from that explosion can propel it up steep mountain paths with amazing speed.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/137.png",
      "large": "https://images.pokemontcg.io/swsh8/137_hires.png"
    }
  },
  {
    "id": "swsh8-138",
    "name": "Onix",
    "number": "138",
    "artist": "KEIICHIRO ITO",
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
    "evolvesTo": [
      "Steelix"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Guard Press",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Rock Throw",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
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
      95
    ],
    "flavorText": "It rapidly bores through the ground at 50 mph by squirming and twisting its massive, rugged body.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/138.png",
      "large": "https://images.pokemontcg.io/swsh8/138_hires.png"
    }
  },
  {
    "id": "swsh8-139",
    "name": "Steelix",
    "number": "139",
    "artist": "Ryuta Fuse",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "190",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Onix",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Powerful Rage",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage for each damage counter on this Pokémon."
      },
      {
        "name": "Earthquake",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
        "text": "This attack also does 30 damage to each of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      208
    ],
    "flavorText": "It is thought its body transformed as a result of iron accumulating internally from swallowing soil.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/139.png",
      "large": "https://images.pokemontcg.io/swsh8/139_hires.png"
    }
  },
  {
    "id": "swsh8-140",
    "name": "Gligar",
    "number": "140",
    "artist": "Misa Tsutsui",
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
      "Gliscor"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Sting",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Poisoned."
      },
      {
        "name": "Pierce",
        "cost": [
          "Fighting",
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
      207
    ],
    "flavorText": "It flies straight at its target's face, then clamps down on the startled victim to inject poison.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/140.png",
      "large": "https://images.pokemontcg.io/swsh8/140_hires.png"
    }
  },
  {
    "id": "swsh8-141",
    "name": "Gliscor",
    "number": "141",
    "artist": "SATOSHI NAKAI",
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
        "name": "Cut Down",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Discard an Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Venomous Hit",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
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
      472
    ],
    "flavorText": "Its flight is soundless. It uses its lengthy tail to carry off its prey... Then its elongated fangs do the rest.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/141.png",
      "large": "https://images.pokemontcg.io/swsh8/141_hires.png"
    }
  },
  {
    "id": "swsh8-142",
    "name": "Makuhita",
    "number": "142",
    "artist": "Oswaldo KATO",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Single Strike"
    ],
    "hp": "90",
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
        "name": "Lunge Out",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Hammer In",
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
      296
    ],
    "flavorText": "There's a rumor of a traditional recipe for stew that Trainers can use to raise strong Makuhita.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/142.png",
      "large": "https://images.pokemontcg.io/swsh8/142_hires.png"
    }
  },
  {
    "id": "swsh8-143",
    "name": "Hariyama",
    "number": "143",
    "artist": "Hitoshi Ariga",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Single Strike"
    ],
    "hp": "140",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Makuhita",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Guts",
        "text": "If this Pokémon would be Knocked Out by damage from an attack, flip a coin. If heads, this Pokémon is not Knocked Out, and its remaining HP becomes 10.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hammer In",
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
      297
    ],
    "flavorText": "Hariyama that are big and fat aren't necessarily strong. There are some small ones that move nimbly and use moves skillfully.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/143.png",
      "large": "https://images.pokemontcg.io/swsh8/143_hires.png"
    }
  },
  {
    "id": "swsh8-144",
    "name": "Baltoy",
    "number": "144",
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
      "Claydol"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Smack",
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
      343
    ],
    "flavorText": "It was discovered in ancient ruins. While moving, it constantly spins. It stands on one foot even when asleep.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/144.png",
      "large": "https://images.pokemontcg.io/swsh8/144_hires.png"
    }
  },
  {
    "id": "swsh8-145",
    "name": "Claydol",
    "number": "145",
    "artist": "Akira Komayama",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Baltoy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rapid Spin",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon. If you do, your opponent switches their Active Pokémon with 1 of their Benched Pokémon."
      },
      {
        "name": "Ancient Imprint",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put damage counters on your opponent's Active Pokémon until its remaining HP is 60."
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
      344
    ],
    "flavorText": "It appears to have been born from clay dolls made by ancient people. It uses telekinesis to float and move.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/145.png",
      "large": "https://images.pokemontcg.io/swsh8/145_hires.png"
    }
  },
  {
    "id": "swsh8-146",
    "name": "Lucario V",
    "number": "146",
    "artist": "aky CG Works",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
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
        "name": "Aura Sphere",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/146.png",
      "large": "https://images.pokemontcg.io/swsh8/146_hires.png"
    }
  },
  {
    "id": "swsh8-147",
    "name": "Drilbur",
    "number": "147",
    "artist": "tetsuya koizumi",
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
      "Excadrill"
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
      529
    ],
    "flavorText": "It's a digger, using its claws to burrow through the ground. It causes damage to vegetable crops, so many farmers have little love for it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/147.png",
      "large": "https://images.pokemontcg.io/swsh8/147_hires.png"
    }
  },
  {
    "id": "swsh8-148",
    "name": "Landorus",
    "number": "148",
    "artist": "NC Empire",
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
        "name": "Strafe",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "You may switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Earthen Boom",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Move all Energy from this Pokémon to your Benched Pokémon in any way you like."
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
    "flavorText": "From the forces of lightning and wind, it creates energy to give nutrients to the soil and make the land abundant.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/148.png",
      "large": "https://images.pokemontcg.io/swsh8/148_hires.png"
    }
  },
  {
    "id": "swsh8-149",
    "name": "Pancham",
    "number": "149",
    "artist": "Mina Nakai",
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
      "Pangoro"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Raised Bad",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Darkness Energy cards and attach them to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Smash Kick",
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
      674
    ],
    "flavorText": "Wanting to make sure it's taken seriously, Pancham's always giving others a glare. But if it's not focusing, it ends up smiling.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/149.png",
      "large": "https://images.pokemontcg.io/swsh8/149_hires.png"
    }
  },
  {
    "id": "swsh8-150",
    "name": "Stufful",
    "number": "150",
    "artist": "OKACHEKE",
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
      "Bewear"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Beat",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Rollout",
        "cost": [
          "Fighting",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      759
    ],
    "flavorText": "The way it protects itself by flailing its arms may be an adorable sight, but stay well away. This is flailing that can snap thick tree trunks.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/150.png",
      "large": "https://images.pokemontcg.io/swsh8/150_hires.png"
    }
  },
  {
    "id": "swsh8-151",
    "name": "Bewear",
    "number": "151",
    "artist": "Shigenori Negishi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Stufful",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Split Spiral Punch",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Your opponent's Active Pokémon is now Confused."
      },
      {
        "name": "Strength",
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
      760
    ],
    "flavorText": "The moves it uses to take down its prey would make a martial artist jealous. It tucks subdued prey under its arms to carry them to its nest.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/151.png",
      "large": "https://images.pokemontcg.io/swsh8/151_hires.png"
    }
  },
  {
    "id": "swsh8-152",
    "name": "Clobbopus",
    "number": "152",
    "artist": "Mizue",
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
      "Grapploct"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Beat",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Knuckle Punch",
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
      852
    ],
    "flavorText": "Its tentacles tear off easily, but it isn't alarmed when that happens—it knows they'll grow back. It's about as smart as a three-year-old.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/152.png",
      "large": "https://images.pokemontcg.io/swsh8/152_hires.png"
    }
  },
  {
    "id": "swsh8-153",
    "name": "Grapploct",
    "number": "153",
    "artist": "Souichirou Gunjima",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Clobbopus",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Lunge Out",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Magnum Punch",
        "cost": [
          "Fighting",
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
      853
    ],
    "flavorText": "Searching for an opponent to test its skills against, it emerges onto land. Once the battle is over, it returns to the sea.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/153.png",
      "large": "https://images.pokemontcg.io/swsh8/153_hires.png"
    }
  },
  {
    "id": "swsh8-154",
    "name": "Falinks",
    "number": "154",
    "artist": "Akira Komayama",
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
        "name": "Headbutt",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Cliff Edge Formation",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "If your opponent has exactly 1 Prize card remaining, this attack does 160 more damage."
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
      870
    ],
    "flavorText": "The six of them work together as one Pokémon. Teamwork is also their battle strategy, and they constantly change their formation as they fight.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/154.png",
      "large": "https://images.pokemontcg.io/swsh8/154_hires.png"
    }
  },
  {
    "id": "swsh8-155",
    "name": "Falinks",
    "number": "155",
    "artist": "Yuu Nishida",
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
        "name": "Invade",
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
      870
    ],
    "flavorText": "The six of them work together as one Pokémon. Teamwork is also their battle strategy, and they constantly change their formation as they fight.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/155.png",
      "large": "https://images.pokemontcg.io/swsh8/155_hires.png"
    }
  },
  {
    "id": "swsh8-156",
    "name": "Gengar V",
    "number": "156",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Single Strike"
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
        "name": "Dark Slumber",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Pain Explosion",
        "cost": [
          "Darkness",
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 3,
        "damage": "190",
        "text": "Put 3 damage counters on this Pokémon."
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
      94
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/156.png",
      "large": "https://images.pokemontcg.io/swsh8/156_hires.png"
    }
  },
  {
    "id": "swsh8-157",
    "name": "Gengar VMAX",
    "number": "157",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Single Strike"
    ],
    "hp": "320",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Gengar V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Fear and Panic",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "60×",
        "text": "This attack does 60 damage for each of your opponent's Pokémon V and Pokémon-GX in play."
      },
      {
        "name": "G-Max Swallow Up",
        "cost": [
          "Darkness",
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 3,
        "damage": "250",
        "text": "During your next turn, this Pokémon can't attack."
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
      94
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/157.png",
      "large": "https://images.pokemontcg.io/swsh8/157_hires.png"
    }
  },
  {
    "id": "swsh8-158",
    "name": "Tyranitar V",
    "number": "158",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "230",
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
        "name": "Hammer In",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": ""
      },
      {
        "name": "Land Crush",
        "cost": [
          "Darkness",
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "150",
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
      248
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/158.png",
      "large": "https://images.pokemontcg.io/swsh8/158_hires.png"
    }
  },
  {
    "id": "swsh8-159",
    "name": "Galarian Zigzagoon",
    "number": "159",
    "artist": "Eri Yamaki",
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
      "Linoone"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Lick",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
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
      263
    ],
    "flavorText": "Thought to be the oldest form of Zigzagoon, it moves in zigzags and wreaks havoc upon its surroundings.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/159.png",
      "large": "https://images.pokemontcg.io/swsh8/159_hires.png"
    }
  },
  {
    "id": "swsh8-160",
    "name": "Galarian Linoone",
    "number": "160",
    "artist": "sowsow",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Galarian Zigzagoon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rear Kick",
        "cost": [
          "Darkness"
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
      264
    ],
    "flavorText": "This very aggressive Pokémon will recklessly challenge opponents stronger than itself.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/160.png",
      "large": "https://images.pokemontcg.io/swsh8/160_hires.png"
    }
  },
  {
    "id": "swsh8-161",
    "name": "Galarian Obstagoon",
    "number": "161",
    "artist": "kodama",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Galarian Linoone",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Silence",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Choose 1 of your opponent's Active Pokémon's attacks. During your opponent's next turn, that Pokémon can't use that attack."
      },
      {
        "name": "Merciless Strike",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "60+",
        "text": "If your opponent's Active Pokémon already has any damage counters on it, this attack does 90 more damage."
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
      862
    ],
    "flavorText": "It evolved after experiencing numerous fights. While crossing its arms, it lets out a shout that would make any opponent flinch.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/161.png",
      "large": "https://images.pokemontcg.io/swsh8/161_hires.png"
    }
  },
  {
    "id": "swsh8-162",
    "name": "Carvanha",
    "number": "162",
    "artist": "NC Empire",
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
      318
    ],
    "flavorText": "With its sturdy jaws and fangs, it can easily chomp wooden boats to splinters. It fights with Basculin over food.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/162.png",
      "large": "https://images.pokemontcg.io/swsh8/162_hires.png"
    }
  },
  {
    "id": "swsh8-163",
    "name": "Sharpedo",
    "number": "163",
    "artist": "Hasuno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Carvanha",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sharp Fang",
        "cost": [
          "Darkness",
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
      "small": "https://images.pokemontcg.io/swsh8/163.png",
      "large": "https://images.pokemontcg.io/swsh8/163_hires.png"
    }
  },
  {
    "id": "swsh8-164",
    "name": "Absol",
    "number": "164",
    "artist": "Eri Yamaki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Drag Off",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Switch 1 of your opponent's Benched Pokémon with their Active Pokémon. This attack does 30 damage to the new Active Pokémon."
      },
      {
        "name": "Slash",
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
      359
    ],
    "flavorText": "The elderly call it the disaster Pokémon and detest it, but interest in its power to predict disasters is on the rise.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/164.png",
      "large": "https://images.pokemontcg.io/swsh8/164_hires.png"
    }
  },
  {
    "id": "swsh8-165",
    "name": "Croagunk",
    "number": "165",
    "artist": "Nagomi Nijo",
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
      "Toxicroak"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Corkscrew Punch",
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
      453
    ],
    "flavorText": "Once diluted, its poison becomes medicinal. This Pokémon came into popularity after a pharmaceutical company chose it as a mascot.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/165.png",
      "large": "https://images.pokemontcg.io/swsh8/165_hires.png"
    }
  },
  {
    "id": "swsh8-166",
    "name": "Toxicroak",
    "number": "166",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Croagunk",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Severe Poison",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Poisoned. During Pokémon Checkup, put 4 damage counters on that Pokémon instead of 1."
      },
      {
        "name": "Magnum Punch",
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
      454
    ],
    "flavorText": "It booms out a victory croak when its prey goes down in defeat. This Pokémon and Seismitoad are related species.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/166.png",
      "large": "https://images.pokemontcg.io/swsh8/166_hires.png"
    }
  },
  {
    "id": "swsh8-167",
    "name": "Darkrai",
    "number": "167",
    "artist": "Megumi Mizutani",
    "rarity": "Uncommon",
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
        "name": "Dark Cutter",
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
      491
    ],
    "flavorText": "It can lull people to sleep and make them dream. It is active during nights of the new moon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/167.png",
      "large": "https://images.pokemontcg.io/swsh8/167_hires.png"
    }
  },
  {
    "id": "swsh8-168",
    "name": "Trubbish",
    "number": "168",
    "artist": "Shibuzoh.",
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
      "Garbodor"
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
        "name": "Super Poison Breath",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      568
    ],
    "flavorText": "This Pokémon was born from a bag stuffed with trash. Galarian Weezing relish the fumes belched by Trubbish.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/168.png",
      "large": "https://images.pokemontcg.io/swsh8/168_hires.png"
    }
  },
  {
    "id": "swsh8-169",
    "name": "Garbodor",
    "number": "169",
    "artist": "Misa Tsutsui",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Trubbish",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Gas",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Poisoned."
      },
      {
        "name": "Sludge Whirlpool",
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
    "flavorText": "The toxic liquid it launches from its right arm is so virulent that it can kill a weakened creature instantly.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/169.png",
      "large": "https://images.pokemontcg.io/swsh8/169_hires.png"
    }
  },
  {
    "id": "swsh8-170",
    "name": "Zorua",
    "number": "170",
    "artist": "nagimiso",
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
        "name": "Ram",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Rear Kick",
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
      "small": "https://images.pokemontcg.io/swsh8/170.png",
      "large": "https://images.pokemontcg.io/swsh8/170_hires.png"
    }
  },
  {
    "id": "swsh8-171",
    "name": "Zoroark",
    "number": "171",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Double Claw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40×",
        "text": "Flip 2 coins. This attack does 40 damage for each heads."
      },
      {
        "name": "Night Daze",
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
      "small": "https://images.pokemontcg.io/swsh8/171.png",
      "large": "https://images.pokemontcg.io/swsh8/171_hires.png"
    }
  },
  {
    "id": "swsh8-172",
    "name": "Vullaby",
    "number": "172",
    "artist": "Shigenori Negishi",
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
      "Mandibuzz"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Razor Wing",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Air Slash",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Discard an Energy from this Pokémon."
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
      629
    ],
    "flavorText": "Vullaby grow quickly. Bones that have gotten too small for older Vullaby to wear often get passed down to younger ones in the nest.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/172.png",
      "large": "https://images.pokemontcg.io/swsh8/172_hires.png"
    }
  },
  {
    "id": "swsh8-173",
    "name": "Mandibuzz",
    "number": "173",
    "artist": "Narumi Sato",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Vullaby",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bone Block",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "During your opponent's next turn, Pokémon can't be played from your opponent's hand to evolve the Defending Pokémon."
      },
      {
        "name": "Dark Cutter",
        "cost": [
          "Darkness",
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
      630
    ],
    "flavorText": "They adorn themselves with bones. There seem to be fashion trends among them, as different bones come into and fall out of popularity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/173.png",
      "large": "https://images.pokemontcg.io/swsh8/173_hires.png"
    }
  },
  {
    "id": "swsh8-174",
    "name": "Pangoro",
    "number": "174",
    "artist": "HYOGONOSUKE",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Pancham",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Knocking Hammer",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Discard the top card of your opponent's deck."
      },
      {
        "name": "Shakedown",
        "cost": [
          "Darkness",
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "150",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      675
    ],
    "flavorText": "Using its leaf, Pangoro can predict the moves of its opponents. It strikes with punches that can turn a dump truck into scrap with just one hit.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/174.png",
      "large": "https://images.pokemontcg.io/swsh8/174_hires.png"
    }
  },
  {
    "id": "swsh8-175",
    "name": "Yveltal",
    "number": "175",
    "artist": "kawayoo",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Single Strike"
    ],
    "hp": "130",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dark Cutter",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Single Strike Wings",
        "cost": [
          "Darkness",
          "Darkness",
          "Darkness"
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
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      717
    ],
    "flavorText": "When its life comes to an end, it absorbs the life energy of every living thing and turns into a cocoon once more.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/175.png",
      "large": "https://images.pokemontcg.io/swsh8/175_hires.png"
    }
  },
  {
    "id": "swsh8-176",
    "name": "Impidimp",
    "number": "176",
    "artist": "sowsow",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Single Strike"
    ],
    "hp": "70",
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
        "name": "Play Rough",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 30 more damage."
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
    "flavorText": "It sneaks into people's homes, stealing things and feasting on the negative energy of the frustrated occupants.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/176.png",
      "large": "https://images.pokemontcg.io/swsh8/176_hires.png"
    }
  },
  {
    "id": "swsh8-177",
    "name": "Morgrem",
    "number": "177",
    "artist": "tetsuya koizumi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Single Strike"
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
        "name": "Bite",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Crushing Blow",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Flip a coin. If heads, discard an Energy from your opponent's Active Pokémon."
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
      860
    ],
    "flavorText": "With sly cunning, it tries to lure people into the woods. Some believe it to have the power to make crops grow.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/177.png",
      "large": "https://images.pokemontcg.io/swsh8/177_hires.png"
    }
  },
  {
    "id": "swsh8-178",
    "name": "Grimmsnarl",
    "number": "178",
    "artist": "kawayoo",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Single Strike"
    ],
    "hp": "170",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Morgrem",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bite",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "60",
        "text": ""
      },
      {
        "name": "Rear Attack",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "100+",
        "text": "If you have 2 or fewer Benched Pokémon, this attack does 140 more damage."
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
      861
    ],
    "flavorText": "Its hairs work like muscle fibers. When its hairs unfurl, they latch on to opponents, ensnaring them as tentacles would.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/178.png",
      "large": "https://images.pokemontcg.io/swsh8/178_hires.png"
    }
  },
  {
    "id": "swsh8-179",
    "name": "Morpeko",
    "number": "179",
    "artist": "Teeziro",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Single Strike"
    ],
    "hp": "50",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Explosive Discontent",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30×",
        "text": "This attack does 30 damage for each damage counter on this Pokémon."
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
    "flavorText": "Hunger hormones affect its temperament. Until its hunger is appeased, it gets up to all manner of evil deeds.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/179.png",
      "large": "https://images.pokemontcg.io/swsh8/179_hires.png"
    }
  },
  {
    "id": "swsh8-180",
    "name": "Galarian Meowth",
    "number": "180",
    "artist": "0313",
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
      "Persian"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Growl",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, the Defending Pokémon's attacks do 20 less damage (before applying Weakness and Resistance)."
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
      52
    ],
    "flavorText": "These daring Pokémon have coins on their foreheads. Darker coins are harder, and harder coins garner more respect among Meowth.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/180.png",
      "large": "https://images.pokemontcg.io/swsh8/180_hires.png"
    }
  },
  {
    "id": "swsh8-181",
    "name": "Galarian Perrserker",
    "number": "181",
    "artist": "Shigenori Negishi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Galarian Meowth",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Call to Muster",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 basic Energy cards and attach them to your Pokémon in any way you like. Then, shuffle your deck."
      },
      {
        "name": "Headbang",
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
      863
    ],
    "flavorText": "After many battles, it evolved dangerous claws that come together to form daggers when extended.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/181.png",
      "large": "https://images.pokemontcg.io/swsh8/181_hires.png"
    }
  },
  {
    "id": "swsh8-182",
    "name": "Skarmory",
    "number": "182",
    "artist": "Megumi Higuchi",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Single Strike"
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
        "name": "Steel Wing",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Slicing Blade",
        "cost": [
          "Metal",
          "Metal",
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
      227
    ],
    "flavorText": "Its body is draped in steel armor. It looks heavy, but it can fly at speeds of up to 185 miles an hour!",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/182.png",
      "large": "https://images.pokemontcg.io/swsh8/182_hires.png"
    }
  },
  {
    "id": "swsh8-183",
    "name": "Excadrill",
    "number": "183",
    "artist": "Lee HyunJung",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Drilbur",
    "evolvesTo": [],
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
        "damage": "50",
        "text": ""
      },
      {
        "name": "Rock Tomb",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
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
      530
    ],
    "flavorText": "Known as the Drill King, this Pokémon can tunnel through the terrain at speeds of over 90 mph.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/183.png",
      "large": "https://images.pokemontcg.io/swsh8/183_hires.png"
    }
  },
  {
    "id": "swsh8-184",
    "name": "Durant",
    "number": "184",
    "artist": "Shin Nagasawa",
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
        "name": "Adversity Jaws",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "If your opponent's Active Pokémon is a Fire Pokémon, it is now Paralyzed."
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
      632
    ],
    "flavorText": "With their large mandibles, these Pokémon can crunch their way through rock. They work together to protect their eggs from Sandaconda.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/184.png",
      "large": "https://images.pokemontcg.io/swsh8/184_hires.png"
    }
  },
  {
    "id": "swsh8-185",
    "name": "Genesect V",
    "number": "185",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Fusion Strike"
    ],
    "hp": "190",
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
        "name": "Fusion Strike System",
        "text": "Once during your turn, you may draw cards until you have as many cards in your hand as you have Fusion Strike Pokémon in play.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Techno Blast",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "210",
        "text": "During your next turn, this Pokémon can't attack."
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
      649
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/185.png",
      "large": "https://images.pokemontcg.io/swsh8/185_hires.png"
    }
  },
  {
    "id": "swsh8-186",
    "name": "Klefki",
    "number": "186",
    "artist": "MAHOU",
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
        "name": "Unlock",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Draw 2 cards."
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
      707
    ],
    "flavorText": "Long ago it lived in mines, but once the minerals that make up its diet became scarcer, Klefki began appearing in human settlements.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/186.png",
      "large": "https://images.pokemontcg.io/swsh8/186_hires.png"
    }
  },
  {
    "id": "swsh8-187",
    "name": "Togedemaru",
    "number": "187",
    "artist": "Oswaldo KATO",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Let's All Rollout",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage for each of your Benched Pokémon that has the Let's All Rollout attack."
      },
      {
        "name": "Rolling Attack",
        "cost": [
          "Metal",
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
      777
    ],
    "flavorText": "When it's in trouble, it curls up into a ball, makes its fur spikes stand on end, and then discharges electricity indiscriminately.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/187.png",
      "large": "https://images.pokemontcg.io/swsh8/187_hires.png"
    }
  },
  {
    "id": "swsh8-188",
    "name": "Meltan",
    "number": "188",
    "artist": "Teeziro",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Single Strike"
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
        "name": "Iron Intake",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 30 damage from this Pokémon."
      },
      {
        "name": "Headbutt",
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
        "type": "Grass",
        "value": "-30"
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/188.png",
      "large": "https://images.pokemontcg.io/swsh8/188_hires.png"
    }
  },
  {
    "id": "swsh8-189",
    "name": "Melmetal",
    "number": "189",
    "artist": "Hasuno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Single Strike"
    ],
    "hp": "150",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Meltan",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ingot Swing",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "During your opponent's next turn, prevent all damage done to this Pokémon by attacks from Pokémon that have an Ability."
      },
      {
        "name": "Blasting Hammer",
        "cost": [
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "150",
        "text": "Discard an Energy from this Pokémon."
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
      809
    ],
    "flavorText": "Revered long ago for its capacity to create iron from nothing, for some reason it has come back to life after 3,000 years.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/189.png",
      "large": "https://images.pokemontcg.io/swsh8/189_hires.png"
    }
  },
  {
    "id": "swsh8-190",
    "name": "Corviknight",
    "number": "190",
    "artist": "Ryuta Fuse",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Corvisquire",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Steel Wing",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Power Cyclone",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      823
    ],
    "flavorText": "With their great intellect and flying skills, these Pokémon very successfully act as the Galar region's airborne taxi service.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/190.png",
      "large": "https://images.pokemontcg.io/swsh8/190_hires.png"
    }
  },
  {
    "id": "swsh8-191",
    "name": "Cufant",
    "number": "191",
    "artist": "Oswaldo KATO",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Single Strike"
    ],
    "hp": "100",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Copperajah"
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
      },
      {
        "name": "High Horsepower",
        "cost": [
          "Metal",
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
      878
    ],
    "flavorText": "If a job requires serious strength, this Pokémon will excel at it. Its copper body tarnishes in the rain, turning a vibrant green color.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/191.png",
      "large": "https://images.pokemontcg.io/swsh8/191_hires.png"
    }
  },
  {
    "id": "swsh8-192",
    "name": "Copperajah",
    "number": "192",
    "artist": "KEIICHIRO ITO",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Single Strike"
    ],
    "hp": "190",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Cufant",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Strength",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": ""
      },
      {
        "name": "High Horsepower",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "160",
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
      879
    ],
    "flavorText": "These Pokémon live in herds. Their trunks have incredible grip strength, strong enough to crush giant rocks into powder.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/192.png",
      "large": "https://images.pokemontcg.io/swsh8/192_hires.png"
    }
  },
  {
    "id": "swsh8-193",
    "name": "Latias",
    "number": "193",
    "artist": "Yuu Nishida",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Fusion Strike"
    ],
    "hp": "120",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Red Assist",
        "text": "Once during your turn, you may attach a Psychic Energy card from your hand to 1 of your Latios.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dyna Barrier",
        "cost": [
          "Fire",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "During your opponent's next turn, prevent all damage done to this Pokémon by attacks from Pokémon VMAX."
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
    "flavorText": "It can telepathically communicate with people. It changes its appearance using its down that refracts light.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/193.png",
      "large": "https://images.pokemontcg.io/swsh8/193_hires.png"
    }
  },
  {
    "id": "swsh8-194",
    "name": "Latios",
    "number": "194",
    "artist": "hatachu",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Fusion Strike"
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
        "name": "Blue Assist",
        "text": "Once during your turn, you may attach a Psychic Energy card from your hand to 1 of your Latias.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Luster Purge",
        "cost": [
          "Water",
          "Water",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "210",
        "text": "Discard 2 Energy from this Pokémon."
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
      381
    ],
    "flavorText": "It understands human speech and is highly intelligent. It is a tender Pokémon that dislikes fighting.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/194.png",
      "large": "https://images.pokemontcg.io/swsh8/194_hires.png"
    }
  },
  {
    "id": "swsh8-195",
    "name": "Goomy",
    "number": "195",
    "artist": "Miki Tanaka",
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
        "name": "Tackle",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Melt",
        "cost": [
          "Water",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
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
      704
    ],
    "flavorText": "Their horns are powerful sensors. As soon as Goomy pick up any sign of enemies, they go into hiding. This is how they've survived.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/195.png",
      "large": "https://images.pokemontcg.io/swsh8/195_hires.png"
    }
  },
  {
    "id": "swsh8-196",
    "name": "Sliggoo",
    "number": "196",
    "artist": "Saya Tsuruta",
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
        "name": "Melt",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Body Slam",
        "cost": [
          "Water",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
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
      705
    ],
    "flavorText": "The lump on its back contains its tiny brain. It thinks only of food and escaping its enemies.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/196.png",
      "large": "https://images.pokemontcg.io/swsh8/196_hires.png"
    }
  },
  {
    "id": "swsh8-197",
    "name": "Goodra",
    "number": "197",
    "artist": "Nagomi Nijo",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Sliggoo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Slimy Room",
        "text": "As long as this Pokémon is in the Active Spot, whenever your opponent tries to attach an Energy card from their hand to a Pokémon, they must flip a coin. If tails, your opponent discards that Energy card instead of attaching it, and this doesn't use up their Energy attachment for the turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Buster Tail",
        "cost": [
          "Water",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
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
      706
    ],
    "flavorText": "Its form of offense is forcefully stretching out its horns. The strikes land 100 times harder than any blow from a heavyweight boxer.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/197.png",
      "large": "https://images.pokemontcg.io/swsh8/197_hires.png"
    }
  },
  {
    "id": "swsh8-198",
    "name": "Turtonator",
    "number": "198",
    "artist": "Ryuta Fuse",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Shell Trap",
        "cost": [
          "Fire",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "During your opponent's next turn, if this Pokémon is damaged by an attack (even if it is Knocked Out), put 8 damage counters on the Attacking Pokémon."
      },
      {
        "name": "Heat Crash",
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
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      776
    ],
    "flavorText": "Eating sulfur in its volcanic habitat is what causes explosive compounds to develop in its shell. Its droppings are also dangerously explosive.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/198.png",
      "large": "https://images.pokemontcg.io/swsh8/198_hires.png"
    }
  },
  {
    "id": "swsh8-199",
    "name": "Meowth",
    "number": "199",
    "artist": "Kouki Saitou",
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
      "Persian"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pay Day",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Draw a card."
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
    "flavorText": "It washes its face regularly to keep the coin on its forehead spotless. It doesn't get along with Galarian Meowth.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/199.png",
      "large": "https://images.pokemontcg.io/swsh8/199_hires.png"
    }
  },
  {
    "id": "swsh8-200",
    "name": "Persian",
    "number": "200",
    "artist": "Lee HyunJung",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Meowth",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pay Day",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Draw a card."
      },
      {
        "name": "Bite",
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
    "flavorText": "Its elegant and refined behavior clashes with that of the barbaric Perrserker. The relationship between the two is one of mutual disdain.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/200.png",
      "large": "https://images.pokemontcg.io/swsh8/200_hires.png"
    }
  },
  {
    "id": "swsh8-201",
    "name": "Dodrio V",
    "number": "201",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Rapid Strike"
    ],
    "hp": "200",
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
        "name": "No Reprieve",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "During your next turn, this Pokémon's attacks do 80 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance)."
      },
      {
        "name": "Rampage Drill",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "This Pokémon also does 30 damage to itself."
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
      85
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/201.png",
      "large": "https://images.pokemontcg.io/swsh8/201_hires.png"
    }
  },
  {
    "id": "swsh8-202",
    "name": "Chansey",
    "number": "202",
    "artist": "miki kudo",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Blissey"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Drain Slap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Heal 30 damage from this Pokémon."
      },
      {
        "name": "Gentle Slap",
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
      113
    ],
    "flavorText": "Because the eggs on their bellies have been overharvested by people in the past, the Chansey population remains very small.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/202.png",
      "large": "https://images.pokemontcg.io/swsh8/202_hires.png"
    }
  },
  {
    "id": "swsh8-203",
    "name": "Blissey",
    "number": "203",
    "artist": "Mizue",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Chansey",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Expert in Roundness",
        "text": "Prevent all damage done to each of your Pokémon that has the Let's All Rollout attack by attacks from your opponent's Pokémon VMAX.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Let's All Rollout",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20×",
        "text": "This attack does 20 damage for each of your Benched Pokémon that has the Let's All Rollout attack."
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
      242
    ],
    "flavorText": "This Pokémon is overflowing with love. Only Chansey that share a strong bond with their Trainer can evolve, so people say.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/203.png",
      "large": "https://images.pokemontcg.io/swsh8/203_hires.png"
    }
  },
  {
    "id": "swsh8-204",
    "name": "Kangaskhan",
    "number": "204",
    "artist": "Souichirou Gunjima",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
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
        "name": "Pound",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Coordinated One-Two Punch",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      115
    ],
    "flavorText": "You shouldn't get close to the child when it's playing outside its mother's pouch. Its mother is always nearby watching over it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/204.png",
      "large": "https://images.pokemontcg.io/swsh8/204_hires.png"
    }
  },
  {
    "id": "swsh8-205",
    "name": "Eevee",
    "number": "205",
    "artist": "0313",
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
        "name": "Continuous Steps",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30×",
        "text": "Flip a coin until you get tails. This attack does 30 damage for each heads."
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
      "small": "https://images.pokemontcg.io/swsh8/205.png",
      "large": "https://images.pokemontcg.io/swsh8/205_hires.png"
    }
  },
  {
    "id": "swsh8-206",
    "name": "Snorlax",
    "number": "206",
    "artist": "Oswaldo KATO",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "160",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Heavy Impact",
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
      143
    ],
    "flavorText": "This Pokémon's stomach is so strong, even eating moldy or rotten food will not affect it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/206.png",
      "large": "https://images.pokemontcg.io/swsh8/206_hires.png"
    }
  },
  {
    "id": "swsh8-207",
    "name": "Dunsparce",
    "number": "207",
    "artist": "ryoma uratsuka",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Mysterious Nest",
        "text": "Colorless Pokémon in play (both yours and your opponent's) have no Weakness.",
        "type": "Ability"
      }
    ],
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      206
    ],
    "flavorText": "When it sees a person, it digs a hole with its tail to make its escape. If you happen to find one, consider yourself lucky.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/207.png",
      "large": "https://images.pokemontcg.io/swsh8/207_hires.png"
    }
  },
  {
    "id": "swsh8-208",
    "name": "Stantler",
    "number": "208",
    "artist": "Shibuzoh.",
    "rarity": "Uncommon",
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
        "name": "Rear Kick",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Wild Dive",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "This attack does 30 damage for each Energy attached to your opponent's Active Pokémon."
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
      234
    ],
    "flavorText": "The curved antlers subtly change the flow of air to create a strange space where reality is distorted.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/208.png",
      "large": "https://images.pokemontcg.io/swsh8/208_hires.png"
    }
  },
  {
    "id": "swsh8-209",
    "name": "Smeargle",
    "number": "209",
    "artist": "Mitsuhiro Arita",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Fusion Strike"
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
        "name": "Sketching Trash",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put up to 2 Fusion Strike Trainer cards from your discard pile into your hand."
      },
      {
        "name": "Tail Whap",
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
      "small": "https://images.pokemontcg.io/swsh8/209.png",
      "large": "https://images.pokemontcg.io/swsh8/209_hires.png"
    }
  },
  {
    "id": "swsh8-210",
    "name": "Skitty",
    "number": "210",
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
      "Delcatty"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Whimsy Tackle",
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
      300
    ],
    "flavorText": "It shows its cute side by chasing its own tail until it gets dizzy.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/210.png",
      "large": "https://images.pokemontcg.io/swsh8/210_hires.png"
    }
  },
  {
    "id": "swsh8-211",
    "name": "Delcatty",
    "number": "211",
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
    "evolvesFrom": "Skitty",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Willful Busybody",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent reveals their hand. Choose a card you find there and put it on the bottom of their deck."
      },
      {
        "name": "Double Slap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      301
    ],
    "flavorText": "It is highly popular among female Trainers for its sublime fur. It does not keep a nest.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/211.png",
      "large": "https://images.pokemontcg.io/swsh8/211_hires.png"
    }
  },
  {
    "id": "swsh8-212",
    "name": "Buneary",
    "number": "212",
    "artist": "Yuu Nishida",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
    ],
    "hp": "50",
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
        "name": "Double Kick",
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
    "flavorText": "The reason it keeps one ear rolled up is so it can launch a swift counterattack if it's attacked by an enemy.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/212.png",
      "large": "https://images.pokemontcg.io/swsh8/212_hires.png"
    }
  },
  {
    "id": "swsh8-213",
    "name": "Lopunny",
    "number": "213",
    "artist": "AKIRA EGAWA",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Rapid Strike"
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
        "name": "Hopping Shot",
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
    "flavorText": "It's notably wary and has a dislike of fighting, but at the same time, it can deliver powerful kicks with its lithe legs.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/213.png",
      "large": "https://images.pokemontcg.io/swsh8/213_hires.png"
    }
  },
  {
    "id": "swsh8-214",
    "name": "Bunnelby",
    "number": "214",
    "artist": "Misa Tsutsui",
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
      "Diggersby"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Find a Friend",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Pokémon, reveal it, and put it into your hand. Then, shuffle your deck."
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
      659
    ],
    "flavorText": "It's very sensitive to danger. The sound of Corviknight's flapping will have Bunnelby digging a hole to hide underground in moments.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/214.png",
      "large": "https://images.pokemontcg.io/swsh8/214_hires.png"
    }
  },
  {
    "id": "swsh8-215",
    "name": "Diggersby",
    "number": "215",
    "artist": "MAHOU",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Bunnelby",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hammer In",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": ""
      },
      {
        "name": "Take Down",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "150",
        "text": "This Pokémon also does 30 damage to itself."
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
      660
    ],
    "flavorText": "The fur on its belly retains heat exceptionally well. People used to make heavy winter clothing from fur shed by this Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/215.png",
      "large": "https://images.pokemontcg.io/swsh8/215_hires.png"
    }
  },
  {
    "id": "swsh8-216",
    "name": "Hawlucha",
    "number": "216",
    "artist": "Taira Akitsu",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Rapid Strike"
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
        "name": "Flying Stomp",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Discard a Special Energy from your opponent's Active Pokémon."
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
    "flavorText": "It always strikes a pose before going for its finishing move. Sometimes opponents take advantage of that time to counterattack.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/216.png",
      "large": "https://images.pokemontcg.io/swsh8/216_hires.png"
    }
  },
  {
    "id": "swsh8-217",
    "name": "Greedent V",
    "number": "217",
    "artist": "PLANETA Yamashita",
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
        "name": "Body Slam",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Nom-Nom-Nom Incisors",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Draw 3 cards."
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
      820
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/217.png",
      "large": "https://images.pokemontcg.io/swsh8/217_hires.png"
    }
  },
  {
    "id": "swsh8-218",
    "name": "Greedent VMAX",
    "number": "218",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "320",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Greedent V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Turn a Profit",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "If your opponent's Basic Pokémon is Knocked Out by damage from this attack, take 2 more Prize cards."
      },
      {
        "name": "Max Gimme Gimme",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Draw 3 cards."
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
      820
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/218.png",
      "large": "https://images.pokemontcg.io/swsh8/218_hires.png"
    }
  },
  {
    "id": "swsh8-219",
    "name": "Rookidee",
    "number": "219",
    "artist": "OKACHEKE",
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
      "Corvisquire"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fury Attack",
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
      821
    ],
    "flavorText": "Jumping nimbly about, this small-bodied Pokémon takes advantage of even the slightest opportunity to disorient larger opponents.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/219.png",
      "large": "https://images.pokemontcg.io/swsh8/219_hires.png"
    }
  },
  {
    "id": "swsh8-220",
    "name": "Corvisquire",
    "number": "220",
    "artist": "Naoyo Kimura",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Rookidee",
    "evolvesTo": [
      "Corviknight"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fury Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "Flip 3 coins. This attack does 30 damage for each heads."
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
      822
    ],
    "flavorText": "The lessons of many harsh battles have taught it how to accurately judge an opponent's strength.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/220.png",
      "large": "https://images.pokemontcg.io/swsh8/220_hires.png"
    }
  },
  {
    "id": "swsh8-221",
    "name": "Wooloo",
    "number": "221",
    "artist": "Miki Tanaka",
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
      "Dubwool"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Derail",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Discard a Special Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Let's All Rollout",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage for each of your Benched Pokémon that has the Let's All Rollout attack."
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
      831
    ],
    "flavorText": "If its fleece grows too long, Wooloo won't be able to move. Cloth made with the wool of this Pokémon is surprisingly strong.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/221.png",
      "large": "https://images.pokemontcg.io/swsh8/221_hires.png"
    }
  },
  {
    "id": "swsh8-222",
    "name": "Wooloo",
    "number": "222",
    "artist": "Yukiko Baba",
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
      "Dubwool"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Knock Away",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 40 more damage."
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
      831
    ],
    "flavorText": "If its fleece grows too long, Wooloo won't be able to move. Cloth made with the wool of this Pokémon is surprisingly strong.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/222.png",
      "large": "https://images.pokemontcg.io/swsh8/222_hires.png"
    }
  },
  {
    "id": "swsh8-223",
    "name": "Dubwool",
    "number": "223",
    "artist": "Shibuzoh.",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Wooloo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bounce",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "You may switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Rolling Tackle",
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
      832
    ],
    "flavorText": "Its majestic horns are meant only to impress the opposite gender. They never see use in battle.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/223.png",
      "large": "https://images.pokemontcg.io/swsh8/223_hires.png"
    }
  },
  {
    "id": "swsh8-224",
    "name": "Adventurer's Discovery",
    "number": "224",
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
      "Search your deck for up to 3 Pokémon V, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/swsh8/224.png",
      "large": "https://images.pokemontcg.io/swsh8/224_hires.png"
    }
  },
  {
    "id": "swsh8-225",
    "name": "Battle VIP Pass",
    "number": "225",
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
      "You can use this card only during your first turn.",
      "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/swsh8/225.png",
      "large": "https://images.pokemontcg.io/swsh8/225_hires.png"
    }
  },
  {
    "id": "swsh8-226",
    "name": "Bug Catcher",
    "number": "226",
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
      "Draw 2 cards. Flip a coin. If heads, draw 2 more cards.",
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
      "small": "https://images.pokemontcg.io/swsh8/226.png",
      "large": "https://images.pokemontcg.io/swsh8/226_hires.png"
    }
  },
  {
    "id": "swsh8-227",
    "name": "Chili & Cilan & Cress",
    "number": "227",
    "artist": "Yusuke Ohmura",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter",
      "Fusion Strike"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Search your deck for up to 3 Fusion Strike Pokémon, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/swsh8/227.png",
      "large": "https://images.pokemontcg.io/swsh8/227_hires.png"
    }
  },
  {
    "id": "swsh8-228",
    "name": "Cook",
    "number": "228",
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
      "Heal 70 damage from your Active Pokémon.",
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
      "small": "https://images.pokemontcg.io/swsh8/228.png",
      "large": "https://images.pokemontcg.io/swsh8/228_hires.png"
    }
  },
  {
    "id": "swsh8-229",
    "name": "Cram-o-matic",
    "number": "229",
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
      "You can use this card only if you discard another Item card from your hand. Flip a coin. If heads, search your deck for a card and put it into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/swsh8/229.png",
      "large": "https://images.pokemontcg.io/swsh8/229_hires.png"
    }
  },
  {
    "id": "swsh8-230",
    "name": "Cross Switcher",
    "number": "230",
    "artist": "inose yukie",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "Fusion Strike"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You must play 2 Cross Switcher cards at once. (This effect works one time for 2 cards.)",
      "Switch 1 of your opponent's Benched Pokémon with their Active Pokémon. If you do, switch your Active Pokémon with 1 of your Benched Pokémon.",
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
      "small": "https://images.pokemontcg.io/swsh8/230.png",
      "large": "https://images.pokemontcg.io/swsh8/230_hires.png"
    }
  },
  {
    "id": "swsh8-231",
    "name": "Crossceiver",
    "number": "231",
    "artist": "Studio Bora Inc.",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "Fusion Strike"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You must play 2 Crossceiver cards at once. (This effect works one time for 2 cards.)",
      "Put a Pokémon or a Supporter card from your discard pile into your hand.",
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
      "small": "https://images.pokemontcg.io/swsh8/231.png",
      "large": "https://images.pokemontcg.io/swsh8/231_hires.png"
    }
  },
  {
    "id": "swsh8-232",
    "name": "Dancer",
    "number": "232",
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
      "Draw 2 cards. If you go second and it's your first turn, draw 3 more cards.",
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
      "small": "https://images.pokemontcg.io/swsh8/232.png",
      "large": "https://images.pokemontcg.io/swsh8/232_hires.png"
    }
  },
  {
    "id": "swsh8-233",
    "name": "Elesa's Sparkle",
    "number": "233",
    "artist": "Yusuke Ohmura",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter",
      "Fusion Strike"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Choose up to 2 of your Fusion Strike Pokémon. For each of those Pokémon, search your deck for a Fusion Strike Energy card and attach it to that Pokémon. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/swsh8/233.png",
      "large": "https://images.pokemontcg.io/swsh8/233_hires.png"
    }
  },
  {
    "id": "swsh8-234",
    "name": "Farewell Bell",
    "number": "234",
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
      "If the Pokémon VMAX this card is attached to is Knocked Out by damage from an attack from your opponent's Pokémon, search your deck for a card and put it into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/swsh8/234.png",
      "large": "https://images.pokemontcg.io/swsh8/234_hires.png"
    }
  },
  {
    "id": "swsh8-235",
    "name": "Judge",
    "number": "235",
    "artist": "Ryuta Fuse",
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
      "Each player shuffles their hand into their deck and draws 4 cards.",
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
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/235.png",
      "large": "https://images.pokemontcg.io/swsh8/235_hires.png"
    }
  },
  {
    "id": "swsh8-236",
    "name": "Power Tablet",
    "number": "236",
    "artist": "Toyste Beach",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "Fusion Strike"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "During this turn, your Fusion Strike Pokémon's attacks do 30 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
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
      "small": "https://images.pokemontcg.io/swsh8/236.png",
      "large": "https://images.pokemontcg.io/swsh8/236_hires.png"
    }
  },
  {
    "id": "swsh8-237",
    "name": "Quick Ball",
    "number": "237",
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
      "You can play this card only if you discard another card from your hand. Search your deck for a Basic Pokémon, reveal it, and put it into your hand. Then, shuffle your deck.",
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
    "regulationMark": "D",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/237.png",
      "large": "https://images.pokemontcg.io/swsh8/237_hires.png"
    }
  },
  {
    "id": "swsh8-238",
    "name": "Schoolboy",
    "number": "238",
    "artist": "kirisAki",
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
      "Draw 2 cards. If your opponent has exactly 1, 3, or 5 Prize cards remaining, draw 2 more cards.",
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
      "small": "https://images.pokemontcg.io/swsh8/238.png",
      "large": "https://images.pokemontcg.io/swsh8/238_hires.png"
    }
  },
  {
    "id": "swsh8-239",
    "name": "Schoolgirl",
    "number": "239",
    "artist": "kirisAki",
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
      "Draw 2 cards. If your opponent has exactly 2, 4, or 6 Prize cards remaining, draw 2 more cards.",
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
      "small": "https://images.pokemontcg.io/swsh8/239.png",
      "large": "https://images.pokemontcg.io/swsh8/239_hires.png"
    }
  },
  {
    "id": "swsh8-240",
    "name": "Shauna",
    "number": "240",
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
      "Shuffle your hand into your deck. Then, draw 5 cards.",
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
      "small": "https://images.pokemontcg.io/swsh8/240.png",
      "large": "https://images.pokemontcg.io/swsh8/240_hires.png"
    }
  },
  {
    "id": "swsh8-241",
    "name": "Sidney",
    "number": "241",
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
      "Your opponent reveals their hand. Discard up to 2 in any combination of Pokémon Tool cards, Special Energy cards, and Stadium cards from it.",
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
      "small": "https://images.pokemontcg.io/swsh8/241.png",
      "large": "https://images.pokemontcg.io/swsh8/241_hires.png"
    }
  },
  {
    "id": "swsh8-242",
    "name": "Skaters' Park",
    "number": "242",
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
      "Whenever either player's Active Pokémon retreats, put any basic Energy that would be discarded into their hand instead of the discard pile."
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
      "small": "https://images.pokemontcg.io/swsh8/242.png",
      "large": "https://images.pokemontcg.io/swsh8/242_hires.png"
    }
  },
  {
    "id": "swsh8-243",
    "name": "Spongy Gloves",
    "number": "243",
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
      "The attacks of the Pokémon this card is attached to do 30 more damage to your opponent's Active Water Pokémon (before applying Weakness and Resistance).",
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
      "small": "https://images.pokemontcg.io/swsh8/243.png",
      "large": "https://images.pokemontcg.io/swsh8/243_hires.png"
    }
  },
  {
    "id": "swsh8-244",
    "name": "Fusion Strike Energy",
    "number": "244",
    "artist": null,
    "rarity": "Uncommon",
    "supertype": "Energy",
    "subtypes": [
      "Fusion Strike",
      "Special"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "This card can only be attached to a Fusion Strike Pokémon. If this card is attached to anything other than a Fusion Strike Pokémon, discard this card. As long as this card is attached to a Pokémon, it provides every type of Energy but provides only 1 Energy at a time. Prevent all effects of your opponent's Pokémon's Abilities done to the Pokémon this card is attached to."
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
      "small": "https://images.pokemontcg.io/swsh8/244.png",
      "large": "https://images.pokemontcg.io/swsh8/244_hires.png"
    }
  },
  {
    "id": "swsh8-245",
    "name": "Celebi V",
    "number": "245",
    "artist": "Teeziro",
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
        "name": "Leaflet Dance",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach any number of Grass Energy cards from your hand to your Pokémon in any way you like."
      },
      {
        "name": "Slash Back",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
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
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/245.png",
      "large": "https://images.pokemontcg.io/swsh8/245_hires.png"
    }
  },
  {
    "id": "swsh8-246",
    "name": "Tsareena V",
    "number": "246",
    "artist": "PLANETA Mochizuki",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Queen's Orders",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "You may discard any number of your Benched Pokémon. This attack does 40 more damage for each Benched Pokémon you discarded in this way."
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
      763
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/246.png",
      "large": "https://images.pokemontcg.io/swsh8/246_hires.png"
    }
  },
  {
    "id": "swsh8-247",
    "name": "Chandelure V",
    "number": "247",
    "artist": "Saki Hayashiro",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "200",
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
        "name": "Confuse Ray",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Confused."
      },
      {
        "name": "Poltergeist",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40×",
        "text": "Your opponent reveals their hand. This attack does 40 damage for each Trainer card you find there."
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
      609
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/247.png",
      "large": "https://images.pokemontcg.io/swsh8/247_hires.png"
    }
  },
  {
    "id": "swsh8-248",
    "name": "Crabominable V",
    "number": "248",
    "artist": "MUGENUP",
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
        "name": "Trigger Avalanche",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard the top 2 cards of your opponent's deck."
      },
      {
        "name": "Destroyer Punch",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "This attack does 60 more damage for each damage counter on your opponent's Active Pokémon."
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
      740
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/248.png",
      "large": "https://images.pokemontcg.io/swsh8/248_hires.png"
    }
  },
  {
    "id": "swsh8-249",
    "name": "Boltund V",
    "number": "249",
    "artist": "Eske Yoshinob",
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
        "name": "Smash Turn",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "You may switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Electrobullet",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This attack also does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      836
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/249.png",
      "large": "https://images.pokemontcg.io/swsh8/249_hires.png"
    }
  },
  {
    "id": "swsh8-250",
    "name": "Mew V",
    "number": "250",
    "artist": "aky CG Works",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Fusion Strike"
    ],
    "hp": "180",
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
        "name": "Energy Mix",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for an Energy card and attach it to 1 of your Fusion Strike Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Psychic Leap",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "You may shuffle this Pokémon and all attached cards into your deck."
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
      151
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/250.png",
      "large": "https://images.pokemontcg.io/swsh8/250_hires.png"
    }
  },
  {
    "id": "swsh8-251",
    "name": "Mew V",
    "number": "251",
    "artist": "Naoki Saito",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Fusion Strike"
    ],
    "hp": "180",
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
        "name": "Energy Mix",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for an Energy card and attach it to 1 of your Fusion Strike Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Psychic Leap",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "You may shuffle this Pokémon and all attached cards into your deck."
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
      151
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/251.png",
      "large": "https://images.pokemontcg.io/swsh8/251_hires.png"
    }
  },
  {
    "id": "swsh8-252",
    "name": "Sandaconda V",
    "number": "252",
    "artist": "Narumi Sato",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
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
        "name": "Wall of Sand",
        "text": "This Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Land Crush",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "140",
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
      844
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/252.png",
      "large": "https://images.pokemontcg.io/swsh8/252_hires.png"
    }
  },
  {
    "id": "swsh8-253",
    "name": "Hoopa V",
    "number": "253",
    "artist": "takuyoa",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Fusion Strike"
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
        "name": "Two-Faced",
        "text": "As long as this Pokémon is in play, it is Psychic and Darkness type.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Shadow Impact",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "170",
        "text": "Put 3 damage counters on 1 of your Pokémon."
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
      720
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/253.png",
      "large": "https://images.pokemontcg.io/swsh8/253_hires.png"
    }
  },
  {
    "id": "swsh8-254",
    "name": "Genesect V",
    "number": "254",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Fusion Strike"
    ],
    "hp": "190",
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
        "name": "Fusion Strike System",
        "text": "Once during your turn, you may draw cards until you have as many cards in your hand as you have Fusion Strike Pokémon in play.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Techno Blast",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "210",
        "text": "During your next turn, this Pokémon can't attack."
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
      649
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/254.png",
      "large": "https://images.pokemontcg.io/swsh8/254_hires.png"
    }
  },
  {
    "id": "swsh8-255",
    "name": "Genesect V",
    "number": "255",
    "artist": "Akira Komayama",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V",
      "Fusion Strike"
    ],
    "hp": "190",
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
        "name": "Fusion Strike System",
        "text": "Once during your turn, you may draw cards until you have as many cards in your hand as you have Fusion Strike Pokémon in play.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Techno Blast",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "210",
        "text": "During your next turn, this Pokémon can't attack."
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
      649
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/255.png",
      "large": "https://images.pokemontcg.io/swsh8/255_hires.png"
    }
  },
  {
    "id": "swsh8-256",
    "name": "Greedent V",
    "number": "256",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Ultra",
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
        "name": "Body Slam",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Nom-Nom-Nom Incisors",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Draw 3 cards."
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
      820
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/256.png",
      "large": "https://images.pokemontcg.io/swsh8/256_hires.png"
    }
  },
  {
    "id": "swsh8-257",
    "name": "Greedent V",
    "number": "257",
    "artist": "Saya Tsuruta",
    "rarity": "Rare Ultra",
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
        "name": "Body Slam",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Nom-Nom-Nom Incisors",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Draw 3 cards."
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
      820
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/257.png",
      "large": "https://images.pokemontcg.io/swsh8/257_hires.png"
    }
  },
  {
    "id": "swsh8-258",
    "name": "Chili & Cilan & Cress",
    "number": "258",
    "artist": "Sanosuke Sakuma",
    "rarity": "Rare Ultra",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter",
      "Fusion Strike"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Search your deck for up to 3 Fusion Strike Pokémon, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/swsh8/258.png",
      "large": "https://images.pokemontcg.io/swsh8/258_hires.png"
    }
  },
  {
    "id": "swsh8-259",
    "name": "Dancer",
    "number": "259",
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
      "Draw 2 cards. If you go second and it's your first turn, draw 3 more cards.",
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
      "small": "https://images.pokemontcg.io/swsh8/259.png",
      "large": "https://images.pokemontcg.io/swsh8/259_hires.png"
    }
  },
  {
    "id": "swsh8-260",
    "name": "Elesa's Sparkle",
    "number": "260",
    "artist": "Ryuta Fuse",
    "rarity": "Rare Ultra",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter",
      "Fusion Strike"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Choose up to 2 of your Fusion Strike Pokémon. For each of those Pokémon, search your deck for a Fusion Strike Energy card and attach it to that Pokémon. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/swsh8/260.png",
      "large": "https://images.pokemontcg.io/swsh8/260_hires.png"
    }
  },
  {
    "id": "swsh8-261",
    "name": "Schoolboy",
    "number": "261",
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
      "Draw 2 cards. If your opponent has exactly 1, 3, or 5 Prize cards remaining, draw 2 more cards.",
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
      "small": "https://images.pokemontcg.io/swsh8/261.png",
      "large": "https://images.pokemontcg.io/swsh8/261_hires.png"
    }
  },
  {
    "id": "swsh8-262",
    "name": "Schoolgirl",
    "number": "262",
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
      "Draw 2 cards. If your opponent has exactly 2, 4, or 6 Prize cards remaining, draw 2 more cards.",
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
      "small": "https://images.pokemontcg.io/swsh8/262.png",
      "large": "https://images.pokemontcg.io/swsh8/262_hires.png"
    }
  },
  {
    "id": "swsh8-263",
    "name": "Shauna",
    "number": "263",
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
      "Shuffle your hand into your deck. Then, draw 5 cards.",
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
      "small": "https://images.pokemontcg.io/swsh8/263.png",
      "large": "https://images.pokemontcg.io/swsh8/263_hires.png"
    }
  },
  {
    "id": "swsh8-264",
    "name": "Sidney",
    "number": "264",
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
      "Your opponent reveals their hand. Discard up to 2 in any combination of Pokémon Tool cards, Special Energy cards, and Stadium cards from it.",
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
      "small": "https://images.pokemontcg.io/swsh8/264.png",
      "large": "https://images.pokemontcg.io/swsh8/264_hires.png"
    }
  },
  {
    "id": "swsh8-265",
    "name": "Chandelure VMAX",
    "number": "265",
    "artist": "AKIRA EGAWA",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "320",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Chandelure V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Cursed Shimmer",
        "text": "As long as this Pokémon is in the Active Spot, your opponent can't play any Pokémon Tool cards from their hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Max Poltergeist",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70×",
        "text": "Your opponent reveals their hand. This attack does 70 damage for each Trainer card you find there."
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
      609
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/265.png",
      "large": "https://images.pokemontcg.io/swsh8/265_hires.png"
    }
  },
  {
    "id": "swsh8-266",
    "name": "Inteleon VMAX",
    "number": "266",
    "artist": "Kazuma Koda",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Rapid Strike"
    ],
    "hp": "320",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Inteleon V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Double Gunner",
        "text": "You must discard a Water Energy card from your hand in order to use this Ability. Once during your turn, you may choose 2 of your opponent's Benched Pokémon and put 2 damage counters on each of them.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "G-Max Spiral",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70+",
        "text": "You may put an Energy attached to this Pokémon into your hand. If you do, this attack does 70 more damage."
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
      818
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/266.png",
      "large": "https://images.pokemontcg.io/swsh8/266_hires.png"
    }
  },
  {
    "id": "swsh8-267",
    "name": "Boltund VMAX",
    "number": "267",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "320",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Boltund V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Bolt Storm",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 30 more damage for each Lightning Energy attached to all of your Pokémon."
      },
      {
        "name": "Max Bolt",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "230",
        "text": "During your next turn, this Pokémon can't use Max Bolt."
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
      836
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/267.png",
      "large": "https://images.pokemontcg.io/swsh8/267_hires.png"
    }
  },
  {
    "id": "swsh8-268",
    "name": "Mew VMAX",
    "number": "268",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Fusion Strike"
    ],
    "hp": "310",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Mew V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Cross Fusion Strike",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your Benched Fusion Strike Pokémon's attacks and use it as this attack."
      },
      {
        "name": "Max Miracle",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "130",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
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
      151
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/268.png",
      "large": "https://images.pokemontcg.io/swsh8/268_hires.png"
    }
  },
  {
    "id": "swsh8-269",
    "name": "Mew VMAX",
    "number": "269",
    "artist": "AKIRA EGAWA",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Fusion Strike"
    ],
    "hp": "310",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Mew V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Cross Fusion Strike",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your Benched Fusion Strike Pokémon's attacks and use it as this attack."
      },
      {
        "name": "Max Miracle",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "130",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
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
      151
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/269.png",
      "large": "https://images.pokemontcg.io/swsh8/269_hires.png"
    }
  },
  {
    "id": "swsh8-270",
    "name": "Espeon VMAX",
    "number": "270",
    "artist": "Kouki Saitou",
    "rarity": "Rare Rainbow",
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
      "small": "https://images.pokemontcg.io/swsh8/270.png",
      "large": "https://images.pokemontcg.io/swsh8/270_hires.png"
    }
  },
  {
    "id": "swsh8-271",
    "name": "Gengar VMAX",
    "number": "271",
    "artist": "sowsow",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX",
      "Single Strike"
    ],
    "hp": "320",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Gengar V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Fear and Panic",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "60×",
        "text": "This attack does 60 damage for each of your opponent's Pokémon V and Pokémon-GX in play."
      },
      {
        "name": "G-Max Swallow Up",
        "cost": [
          "Darkness",
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 3,
        "damage": "250",
        "text": "During your next turn, this Pokémon can't attack."
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
      94
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/271.png",
      "large": "https://images.pokemontcg.io/swsh8/271_hires.png"
    }
  },
  {
    "id": "swsh8-272",
    "name": "Greedent VMAX",
    "number": "272",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "320",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Greedent V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Turn a Profit",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "If your opponent's Basic Pokémon is Knocked Out by damage from this attack, take 2 more Prize cards."
      },
      {
        "name": "Max Gimme Gimme",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Draw 3 cards."
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
      820
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/swsh8/272.png",
      "large": "https://images.pokemontcg.io/swsh8/272_hires.png"
    }
  },
  {
    "id": "swsh8-273",
    "name": "Chili & Cilan & Cress",
    "number": "273",
    "artist": "Sanosuke Sakuma",
    "rarity": "Rare Rainbow",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter",
      "Fusion Strike"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Search your deck for up to 3 Fusion Strike Pokémon, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/swsh8/273.png",
      "large": "https://images.pokemontcg.io/swsh8/273_hires.png"
    }
  },
  {
    "id": "swsh8-274",
    "name": "Dancer",
    "number": "274",
    "artist": "Yuu Nishida",
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
      "Draw 2 cards. If you go second and it's your first turn, draw 3 more cards.",
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
      "small": "https://images.pokemontcg.io/swsh8/274.png",
      "large": "https://images.pokemontcg.io/swsh8/274_hires.png"
    }
  },
  {
    "id": "swsh8-275",
    "name": "Elesa's Sparkle",
    "number": "275",
    "artist": "Ryuta Fuse",
    "rarity": "Rare Rainbow",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter",
      "Fusion Strike"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Choose up to 2 of your Fusion Strike Pokémon. For each of those Pokémon, search your deck for a Fusion Strike Energy card and attach it to that Pokémon. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/swsh8/275.png",
      "large": "https://images.pokemontcg.io/swsh8/275_hires.png"
    }
  },
  {
    "id": "swsh8-276",
    "name": "Schoolboy",
    "number": "276",
    "artist": "Hideki Ishikawa",
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
      "Draw 2 cards. If your opponent has exactly 1, 3, or 5 Prize cards remaining, draw 2 more cards.",
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
      "small": "https://images.pokemontcg.io/swsh8/276.png",
      "large": "https://images.pokemontcg.io/swsh8/276_hires.png"
    }
  },
  {
    "id": "swsh8-277",
    "name": "Schoolgirl",
    "number": "277",
    "artist": "Hideki Ishikawa",
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
      "Draw 2 cards. If your opponent has exactly 2, 4, or 6 Prize cards remaining, draw 2 more cards.",
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
      "small": "https://images.pokemontcg.io/swsh8/277.png",
      "large": "https://images.pokemontcg.io/swsh8/277_hires.png"
    }
  },
  {
    "id": "swsh8-278",
    "name": "Shauna",
    "number": "278",
    "artist": "Yuu Nishida",
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
      "Shuffle your hand into your deck. Then, draw 5 cards.",
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
      "small": "https://images.pokemontcg.io/swsh8/278.png",
      "large": "https://images.pokemontcg.io/swsh8/278_hires.png"
    }
  },
  {
    "id": "swsh8-279",
    "name": "Sidney",
    "number": "279",
    "artist": "Hideki Ishikawa",
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
      "Your opponent reveals their hand. Discard up to 2 in any combination of Pokémon Tool cards, Special Energy cards, and Stadium cards from it.",
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
      "small": "https://images.pokemontcg.io/swsh8/279.png",
      "large": "https://images.pokemontcg.io/swsh8/279_hires.png"
    }
  },
  {
    "id": "swsh8-280",
    "name": "Flaaffy",
    "number": "280",
    "artist": "Studio Bora Inc.",
    "rarity": "Rare Secret",
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
      "small": "https://images.pokemontcg.io/swsh8/280.png",
      "large": "https://images.pokemontcg.io/swsh8/280_hires.png"
    }
  },
  {
    "id": "swsh8-281",
    "name": "Power Tablet",
    "number": "281",
    "artist": "Toyste Beach",
    "rarity": "Rare Secret",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "Fusion Strike"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "During this turn, your Fusion Strike Pokémon's attacks do 30 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
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
      "small": "https://images.pokemontcg.io/swsh8/281.png",
      "large": "https://images.pokemontcg.io/swsh8/281_hires.png"
    }
  },
  {
    "id": "swsh8-282",
    "name": "Training Court",
    "number": "282",
    "artist": "5ban Graphics",
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
      "Once during each player's turn, that player may put a basic Energy card from their discard pile into their hand."
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
      "small": "https://images.pokemontcg.io/swsh8/282.png",
      "large": "https://images.pokemontcg.io/swsh8/282_hires.png"
    }
  },
  {
    "id": "swsh8-283",
    "name": "Grass Energy",
    "number": "283",
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
      "small": "https://images.pokemontcg.io/swsh8/283.png",
      "large": "https://images.pokemontcg.io/swsh8/283_hires.png"
    }
  },
  {
    "id": "swsh8-284",
    "name": "Fire Energy",
    "number": "284",
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
      "small": "https://images.pokemontcg.io/swsh8/284.png",
      "large": "https://images.pokemontcg.io/swsh8/284_hires.png"
    }
  }
]

export default cardDetails
