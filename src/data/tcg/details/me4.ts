import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "me4-1",
    "name": "Weedle",
    "number": "1",
    "artist": "sowsow",
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
    "evolvesTo": [],
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
      13
    ],
    "flavorText": "Often found in forests and grasslands. It has a sharp, toxic barb of around two inches on top of its head.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-1/small",
      "large": "https://images.scrydex.com/pokemon/me4-1/large"
    }
  },
  {
    "id": "me4-2",
    "name": "Kakuna",
    "number": "2",
    "artist": "Mugi Hamada",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Weedle",
    "evolvesTo": [],
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
        "name": "Hang Down",
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
      14
    ],
    "flavorText": "Almost incapable of moving, this Pokémon can only harden its shell to protect itself when it is in danger.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-2/small",
      "large": "https://images.scrydex.com/pokemon/me4-2/large"
    }
  },
  {
    "id": "me4-3",
    "name": "Beedrill ex",
    "number": "3",
    "artist": "toriyufu",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "310",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Kakuna",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Rumbling Bees",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "110×",
        "text": "This attack does 110 damage for each of your Beedrill and Beedrill ex in play."
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
      15
    ],
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-3/small",
      "large": "https://images.scrydex.com/pokemon/me4-3/large"
    }
  },
  {
    "id": "me4-4",
    "name": "Carnivine",
    "number": "4",
    "artist": "Heisuke Kitazawa",
    "rarity": "Common",
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
        "name": "Chomp Whole",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If your opponent's Active Pokémon has no Retreat Cost, this attack does 80 more damage."
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
      455
    ],
    "flavorText": "It attracts prey with its sweet-smelling saliva, then chomps down. It takes a whole day to eat prey.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-4/small",
      "large": "https://images.scrydex.com/pokemon/me4-4/large"
    }
  },
  {
    "id": "me4-5",
    "name": "Chespin",
    "number": "5",
    "artist": "HACCAN",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Beat",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Spike Sting",
        "cost": [
          "Grass",
          "Grass"
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
      650
    ],
    "flavorText": "The quills on its head are usually soft. When it flexes them, the points become so hard and sharp that they can pierce rock.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-5/small",
      "large": "https://images.scrydex.com/pokemon/me4-5/large"
    }
  },
  {
    "id": "me4-6",
    "name": "Quilladin",
    "number": "6",
    "artist": "Hideki Ishikawa",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Chespin",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Leafy Charge",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Search your deck for a Basic Grass Energy card and attach it to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Vine Whip",
        "cost": [
          "Grass",
          "Grass",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      651
    ],
    "flavorText": "They strengthen their lower bodies by running into one another. They are very kind and won't start fights.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-6/small",
      "large": "https://images.scrydex.com/pokemon/me4-6/large"
    }
  },
  {
    "id": "me4-7",
    "name": "Chesnaught",
    "number": "7",
    "artist": "Uta",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Quilladin",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Needly Armor",
        "text": "If this Pokémon is in the Active Spot and is damaged by an attack from your opponent's Pokémon (even if this Pokémon is Knocked Out), place 3 damage counters on the Attacking Pokémon for each Grass Energy attached to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Impound",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
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
      652
    ],
    "flavorText": "Its tackle is forceful enough to flip a 50-ton tank. It shields its allies from danger with its own body.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-7/small",
      "large": "https://images.scrydex.com/pokemon/me4-7/large"
    }
  },
  {
    "id": "me4-8",
    "name": "Vulpix",
    "number": "8",
    "artist": "Yoshimoto Yoshimon",
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
    "evolvesTo": [],
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      37
    ],
    "flavorText": "As its body grows larger, its six warm tails become more beautiful, with a more luxurious coat of fur.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-8/small",
      "large": "https://images.scrydex.com/pokemon/me4-8/large"
    }
  },
  {
    "id": "me4-9",
    "name": "Ninetales",
    "number": "9",
    "artist": "Ryuta Fuse",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Nine-Tailed Transfer",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Move all damage counters from 1 of your Benched Pokémon to your opponent's Active Pokémon."
      },
      {
        "name": "Will-O-Wisp",
        "cost": [
          "Fire",
          "Fire"
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
    "flavorText": "It has nine long tails and fur that gleams gold. It is said to live for 1,000 years.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-9/small",
      "large": "https://images.scrydex.com/pokemon/me4-9/large"
    }
  },
  {
    "id": "me4-10",
    "name": "Ho-Oh",
    "number": "10",
    "artist": "Takumi Wada",
    "rarity": "Rare",
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
        "name": "Flames of Revival",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put up to 3 Basic Pokémon from your discard pile onto your Bench."
      },
      {
        "name": "Bright Wing",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "Discard a Fire Energy from this Pokémon."
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
      250
    ],
    "flavorText": "A legend says that its body glows in seven colors. A rainbow is said to form behind it when it flies.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-10/small",
      "large": "https://images.scrydex.com/pokemon/me4-10/large"
    }
  },
  {
    "id": "me4-11",
    "name": "Fennekin",
    "number": "11",
    "artist": "saino misaki",
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
        "name": "Steady Firebreathing",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      653
    ],
    "flavorText": "Eating a twig fills it with energy, and its roomy ears give vent to air hotter than 390 degrees Fahrenheit.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-11/small",
      "large": "https://images.scrydex.com/pokemon/me4-11/large"
    }
  },
  {
    "id": "me4-12",
    "name": "Braixen",
    "number": "12",
    "artist": "Taiga Kasai",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Fennekin",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flamethrower",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      654
    ],
    "flavorText": "It keeps a twig in its tail. Using friction from its tail fur, it sets the twig on fire and launches into battle.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-12/small",
      "large": "https://images.scrydex.com/pokemon/me4-12/large"
    }
  },
  {
    "id": "me4-13",
    "name": "Delphox",
    "number": "13",
    "artist": "Gemi",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Braixen",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Flaring Magic",
        "text": "Once during your turn, you may discard a Basic Fire Energy card from your hand in order to use this Ability. Draw cards until you have 7 cards in your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Energized Storm",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "This attack does 30 damage for each Energy attached to all Pokémon."
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
      655
    ],
    "flavorText": "Using psychic power, it generates a fiery vortex of 5,400 degrees Fahrenheit, incinerating foes swept into this whirl of flame.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-13/small",
      "large": "https://images.scrydex.com/pokemon/me4-13/large"
    }
  },
  {
    "id": "me4-14",
    "name": "Litleo",
    "number": "14",
    "artist": "Mina Nakai",
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
    "evolvesTo": [],
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
    "flavorText": "They set off on their own from their pride and live by themselves to become stronger. These hot-blooded Pokémon are quick to fight.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-14/small",
      "large": "https://images.scrydex.com/pokemon/me4-14/large"
    }
  },
  {
    "id": "me4-15",
    "name": "Mega Pyroar ex",
    "number": "15",
    "artist": "Keisuke Azuma",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Litleo",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Ferocious Bellow",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "80",
        "text": "During your opponent's next turn, attacks used by the Defending Pokémon do 50 less damage (before applying Weakness and Resistance)."
      },
      {
        "name": "Fiery Big Bang",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "290-",
        "text": "This attack does 10 less damage for each damage counter on this Pokémon."
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
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-15/small",
      "large": "https://images.scrydex.com/pokemon/me4-15/large"
    }
  },
  {
    "id": "me4-16",
    "name": "Remoraid",
    "number": "16",
    "artist": "Mori You",
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
        "name": "Sharp Fin",
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
      223
    ],
    "flavorText": "The water they shoot from their mouths can hit moving prey from more than 300 feet away.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-16/small",
      "large": "https://images.scrydex.com/pokemon/me4-16/large"
    }
  },
  {
    "id": "me4-17",
    "name": "Octillery",
    "number": "17",
    "artist": "matazo",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Remoraid",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Jet of Ink",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, if the Defending Pokémon tries to use an attack, your opponent flips 2 coins. If either of them is tails, that attack doesn't happen."
      },
      {
        "name": "Tantrum",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "This Pokémon is now Confused."
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
      224
    ],
    "flavorText": "Its instinct is to bury itself in holes. It often steals the nesting holes of others to sleep in them.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-17/small",
      "large": "https://images.scrydex.com/pokemon/me4-17/large"
    }
  },
  {
    "id": "me4-18",
    "name": "Delibird",
    "number": "18",
    "artist": "Saboteri",
    "rarity": "Uncommon",
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
        "name": "Pleasing Present",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Each player may attach up to 3 Basic Energy cards from their hand to their Pokémon in any way they like. Your opponent does this first."
      },
      {
        "name": "Flap",
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
      225
    ],
    "flavorText": "It carries food rolled up in its tail. It has a habit of sharing food with people lost in the mountains.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-18/small",
      "large": "https://images.scrydex.com/pokemon/me4-18/large"
    }
  },
  {
    "id": "me4-19",
    "name": "Keldeo",
    "number": "19",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
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
        "name": "Shoot Through",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "This attack also does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Reflect Energy",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
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
      647
    ],
    "flavorText": "Keldeo has strengthened its resolve for battle filling its body with power and changing its form.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-19/small",
      "large": "https://images.scrydex.com/pokemon/me4-19/large"
    }
  },
  {
    "id": "me4-20",
    "name": "Froakie",
    "number": "20",
    "artist": "Kariya",
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
        "name": "Collect",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card."
      },
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      656
    ],
    "flavorText": "It protects its skin by covering its body in delicate bubbles. Beneath its happy-go-lucky air, it keeps a watchful eye on its surroundings.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-20/small",
      "large": "https://images.scrydex.com/pokemon/me4-20/large"
    }
  },
  {
    "id": "me4-21",
    "name": "Frogadier",
    "number": "21",
    "artist": "Nelnal",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Froakie",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Summoning Jutsu",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 Pokémon, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Aqua Edge",
        "cost": [
          "Water",
          "Water"
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
      657
    ],
    "flavorText": "Its swiftness is unparalleled. It can scale a tower of more than 2,000 feet in a minute's time.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-21/small",
      "large": "https://images.scrydex.com/pokemon/me4-21/large"
    }
  },
  {
    "id": "me4-22",
    "name": "Mega Greninja ex",
    "number": "22",
    "artist": "takuyoa",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "350",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Frogadier",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Mortal Shuriken",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may discard a Basic Water Energy card from your hand in order to use this Ability. Place 6 damage counters on 1 of your opponent's Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Ninja Spinner",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "120+",
        "text": "You may put a Water Energy attached to this Pokémon into your hand and have this attack do 80 more damage."
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
      658
    ],
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-22/small",
      "large": "https://images.scrydex.com/pokemon/me4-22/large"
    }
  },
  {
    "id": "me4-23",
    "name": "Bergmite",
    "number": "23",
    "artist": "Anesaki Dynamic",
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
        "name": "Chilly",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Frost Breath",
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
    "flavorText": "It blocks opponents' attacks with the ice that shields its body. If the ice breaks, this Pokémon uses cold air to quickly create new ice.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-23/small",
      "large": "https://images.scrydex.com/pokemon/me4-23/large"
    }
  },
  {
    "id": "me4-24",
    "name": "Avalugg",
    "number": "24",
    "artist": "Tomoki Sone",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "160",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Bergmite",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Iceberg Breaker",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "60×",
        "text": "Discard the top 6 cards of your deck, and this attack does 60 damage for each Basic Water Energy card you discarded in this way."
      },
      {
        "name": "Frost Stamp",
        "cost": [
          "Water",
          "Water",
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
    "flavorText": "Its ice-covered body is as hard as steel. Its enormous frame crushes anything that stands in its way.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-24/small",
      "large": "https://images.scrydex.com/pokemon/me4-24/large"
    }
  },
  {
    "id": "me4-25",
    "name": "Wimpod",
    "number": "25",
    "artist": "0313",
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
        "name": "Gnaw",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Corkscrew Punch",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      767
    ],
    "flavorText": "It's nature's cleaner-it eats anything and everything, including garbage and rotten things. The ground near its nest is always clean.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-25/small",
      "large": "https://images.scrydex.com/pokemon/me4-25/large"
    }
  },
  {
    "id": "me4-26",
    "name": "Golisopod",
    "number": "26",
    "artist": "Takeshi Nakamura",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wimpod",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Critical Slash",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "If your opponent's Pokémon is Knocked Out by damage from this attack, during your opponent's next turn, prevent all damage from and effects of attacks done to this Pokémon."
      },
      {
        "name": "Boundless Power",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "During your next turn, this Pokémon can't use attacks."
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
      768
    ],
    "flavorText": "It will do anything to win, taking advantage of every opening and finishing opponents off with the small claws on its front legs.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-26/small",
      "large": "https://images.scrydex.com/pokemon/me4-26/large"
    }
  },
  {
    "id": "me4-27",
    "name": "Mareep",
    "number": "27",
    "artist": "UKUMO viti",
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
        "name": "Thunder Wave",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      179
    ],
    "flavorText": "Its fluffy coat doubles in size when static electricity builds up. Touching it can be shocking.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-27/small",
      "large": "https://images.scrydex.com/pokemon/me4-27/large"
    }
  },
  {
    "id": "me4-28",
    "name": "Flaaffy",
    "number": "28",
    "artist": "miki kudo",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Mareep",
    "evolvesTo": [],
    "rules": [],
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
        "text": "During your opponent's next turn, they can't play any Item cards from their hand."
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
    "flavorText": "If its coat becomes fully charged with electricity, its tail lights up. Flaaffy can fire wool that zaps on impact.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-28/small",
      "large": "https://images.scrydex.com/pokemon/me4-28/large"
    }
  },
  {
    "id": "me4-29",
    "name": "Ampharos",
    "number": "29",
    "artist": "CHORISO",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Flaaffy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Synchro Pulse",
        "text": "If you have the same number of cards in your hand as your opponent, attacks used by this Pokémon do 80 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Flashing Bolt",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "140",
        "text": "During your next turn, this Pokémon can't use Flashing Bolt."
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
    "flavorText": "The tail's tip shines brightly and can be seen from far away. It acts as a beacon for lost people.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-29/small",
      "large": "https://images.scrydex.com/pokemon/me4-29/large"
    }
  },
  {
    "id": "me4-30",
    "name": "Emolga",
    "number": "30",
    "artist": "Kazumasa Yasukuni",
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
        "name": "Minor Errand-Running",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Energy cards, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Sky Return",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Put this Pokémon and all attached cards into your hand."
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
      587
    ],
    "flavorText": "The energy made in its cheeks' electric pouches is stored inside its patagial membranes and released while it is gliding.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-30/small",
      "large": "https://images.scrydex.com/pokemon/me4-30/large"
    }
  },
  {
    "id": "me4-31",
    "name": "Deoxys",
    "number": "31",
    "artist": "Shiburingaru",
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
        "name": "Genome Charge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Psychic Energy cards and attach them to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Psychic",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "This attack does 20 more damage for each Energy attached to your opponent's Active Pokémon."
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
    "flavorText": "An alien virus that fell to earth on a meteor underwent a DNA mutation to become this Pokémon.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-31/small",
      "large": "https://images.scrydex.com/pokemon/me4-31/large"
    }
  },
  {
    "id": "me4-32",
    "name": "Deoxys",
    "number": "32",
    "artist": "nagimiso",
    "rarity": "Uncommon",
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
        "name": "Psyspear",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "If this Pokémon has at least 2 extra Energy attached (in addition to this attack's cost), this attack also does 120 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      386
    ],
    "flavorText": "An alien virus that fell to earth on a meteor underwent a DNA mutation to become this Pokémon.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-32/small",
      "large": "https://images.scrydex.com/pokemon/me4-32/large"
    }
  },
  {
    "id": "me4-33",
    "name": "Deoxys",
    "number": "33",
    "artist": "GOSSAN",
    "rarity": "Uncommon",
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
        "name": "Psy Protection",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "During your opponent's next turn, prevent all damage done to this Pokémon by attacks from Pokémon that have an Ability."
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
      386
    ],
    "flavorText": "An alien virus that fell to earth on a meteor underwent a DNA mutation to become this Pokémon.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-33/small",
      "large": "https://images.scrydex.com/pokemon/me4-33/large"
    }
  },
  {
    "id": "me4-34",
    "name": "Deoxys",
    "number": "34",
    "artist": "hncl",
    "rarity": "Uncommon",
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
        "name": "Psyspeed",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "You may draw cards until you have 5 cards in your hand."
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
      386
    ],
    "flavorText": "An alien virus that fell to earth on a meteor underwent a DNA mutation to become this Pokémon.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-34/small",
      "large": "https://images.scrydex.com/pokemon/me4-34/large"
    }
  },
  {
    "id": "me4-35",
    "name": "Mega Floette ex",
    "number": "35",
    "artist": "aky CG Works",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "250",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Gentle Light",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 30 damage from each Pokémon (both yours and your opponent's)."
      },
      {
        "name": "Eternity Bloom",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "Search your deck for up to 4 Basic Psychic Energy cards and attach them to your Benched Pokémon in any way you like. Then, shuffle your deck."
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
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-35/small",
      "large": "https://images.scrydex.com/pokemon/me4-35/large"
    }
  },
  {
    "id": "me4-36",
    "name": "Espurr",
    "number": "36",
    "artist": "sowsow",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Buddy Attack",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If you played Emma from your hand during this turn, this attack does 60 more damage."
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
      677
    ],
    "flavorText": "It keeps its intense psychic power from leaking out by using its ears to cover the organs emitting that power.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-36/small",
      "large": "https://images.scrydex.com/pokemon/me4-36/large"
    }
  },
  {
    "id": "me4-37",
    "name": "Meowstic",
    "number": "37",
    "artist": "mingo",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Espurr",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tricky Steps",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "80",
        "text": "You may move an Energy from your opponent's Active Pokémon to 1 of their Benched Pokémon."
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
      678
    ],
    "flavorText": "When in danger, it raises its ears and releases enough psychic power to grind a 10-ton truck into dust.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-37/small",
      "large": "https://images.scrydex.com/pokemon/me4-37/large"
    }
  },
  {
    "id": "me4-38",
    "name": "Phantump",
    "number": "38",
    "artist": "Taiga Kasai",
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
    "abilities": [
      {
        "name": "Spiteful Evolution",
        "text": "Once during your turn, you may use this Ability. Choose a card in your hand that evolves from this Pokémon and put it onto this Pokémon to evolve it. If you do, place 2 damage counters on the Pokémon you evolved in this way. You can't use this Ability during your first turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Mumble",
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
      708
    ],
    "flavorText": "According to old tales, these Pokémon are stumps possessed by the spirits of children who died while lost in the forest.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-38/small",
      "large": "https://images.scrydex.com/pokemon/me4-38/large"
    }
  },
  {
    "id": "me4-39",
    "name": "Trevenant",
    "number": "39",
    "artist": "Uninori",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Phantump",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Cursed Roots",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, Energy can't be attached from your opponent's hand to the Defending Pokémon."
      },
      {
        "name": "Overwhelming Pain",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "60+",
        "text": "This attack does 10 more damage for each damage counter on all of your opponent's Pokémon."
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
      709
    ],
    "flavorText": "Using its roots as a nervous system, it controls the trees in the forest. It's kind to the Pokémon that reside in its body.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-39/small",
      "large": "https://images.scrydex.com/pokemon/me4-39/large"
    }
  },
  {
    "id": "me4-40",
    "name": "Pumpkaboo",
    "number": "40",
    "artist": "Jerky",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Stampede",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
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
    "flavorText": "It was recently discovered that the different varieties of Pumpkaboo vary not only in size but also in the size of the souls they collect.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-40/small",
      "large": "https://images.scrydex.com/pokemon/me4-40/large"
    }
  },
  {
    "id": "me4-41",
    "name": "Gourgeist ex",
    "number": "41",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "270",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Pumpkaboo",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Horrifying Rondo",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30+",
        "text": "This attack does 50 more damage for each of your Benched Pokémon that has any damage counters on it."
      },
      {
        "name": "Ghostly Touch",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "140",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      711
    ],
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-41/small",
      "large": "https://images.scrydex.com/pokemon/me4-41/large"
    }
  },
  {
    "id": "me4-42",
    "name": "Xerneas",
    "number": "42",
    "artist": "KEIICHIRO ITO",
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
        "name": "Geo Storm",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "30×",
        "text": "This attack does 30 damage for each Psychic Energy attached to all of your Pokémon."
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
      716
    ],
    "flavorText": "When the horns on its head shine in seven colors, it is said to be sharing everlasting life.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-42/small",
      "large": "https://images.scrydex.com/pokemon/me4-42/large"
    }
  },
  {
    "id": "me4-43",
    "name": "Sudowoodo",
    "number": "43",
    "artist": "GOTO minori",
    "rarity": "Uncommon",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Trials and Trip-ulations",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Transformation Tome cards, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Rock Hurl",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      185
    ],
    "flavorText": "To avoid being attacked, it does nothing but mimic a tree. It hates water and flees from rain.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-43/small",
      "large": "https://images.scrydex.com/pokemon/me4-43/large"
    }
  },
  {
    "id": "me4-44",
    "name": "Phanpy",
    "number": "44",
    "artist": "Akino Fukuji",
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
    "evolvesTo": [],
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
        "name": "Rollout",
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
      231
    ],
    "flavorText": "It is far stronger than it appears. If a Phanpy is swinging its trunk around and your arm gets hit by it, your arm bone will shatter.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-44/small",
      "large": "https://images.scrydex.com/pokemon/me4-44/large"
    }
  },
  {
    "id": "me4-45",
    "name": "Donphan",
    "number": "45",
    "artist": "Julie Hang",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "150",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Phanpy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "No Reprieve",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "During your next turn, attacks used by this Pokémon do 120 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance)."
      },
      {
        "name": "Smashing Headbutt",
        "cost": [
          "Fighting",
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
      232
    ],
    "flavorText": "Donphan is normally a calm Pokemon, but once it is enraged, it will curl its body into a ball and charge at you while rolling.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-45/small",
      "large": "https://images.scrydex.com/pokemon/me4-45/large"
    }
  },
  {
    "id": "me4-46",
    "name": "Baltoy",
    "number": "46",
    "artist": "Tomomi Ozaki",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Continuous Spin",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "30×",
        "text": "Flip a coin until you get tails. This attack does 30 damage for each heads."
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
      343
    ],
    "flavorText": "It moves while spinning around on its single foot. Some Baltoy have been seen spinning on their heads.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-46/small",
      "large": "https://images.scrydex.com/pokemon/me4-46/large"
    }
  },
  {
    "id": "me4-47",
    "name": "Claydol",
    "number": "47",
    "artist": "Oswaldo KATO",
    "rarity": "Uncommon",
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
        "name": "Devolution Ray",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "If your opponent's Active Pokémon is an evolved Pokémon, devolve it by putting the highest Stage Evolution card on it into your opponent's hand."
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
    "flavorText": "This mysterious Pokémon started life as an ancient clay figurine made over 20,000 years ago.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-47/small",
      "large": "https://images.scrydex.com/pokemon/me4-47/large"
    }
  },
  {
    "id": "me4-48",
    "name": "Mega Gallade ex",
    "number": "48",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "350",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Kirlia",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Gale Slash",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "50+",
        "text": "If this Pokémon has no damage counters on it, this attack does 150 more damage."
      },
      {
        "name": "Marvelous Edge",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "240",
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
      475
    ],
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-48/small",
      "large": "https://images.scrydex.com/pokemon/me4-48/large"
    }
  },
  {
    "id": "me4-49",
    "name": "Zubat",
    "number": "49",
    "artist": "Mékayu",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Supersonic",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Confused."
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
      41
    ],
    "flavorText": "It emits ultrasonic waves from its mouth to check its surroundings. Even in tight caves, Zubat flies around with skill.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-49/small",
      "large": "https://images.scrydex.com/pokemon/me4-49/large"
    }
  },
  {
    "id": "me4-50",
    "name": "Golbat",
    "number": "50",
    "artist": "Mousho",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Zubat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Covert Flight",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, prevent all damage done to this Pokémon by attacks from Basic Pokémon."
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
      42
    ],
    "flavorText": "It loves to drink other creatures' blood. It's said that if it finds others of its kind going hungry, it sometimes shares the blood it's gathered.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-50/small",
      "large": "https://images.scrydex.com/pokemon/me4-50/large"
    }
  },
  {
    "id": "me4-51",
    "name": "Crobat",
    "number": "51",
    "artist": "IKEDA Saki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Golbat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Nighttime Maneuvers",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may use this Ability. Search your deck for a card. Shuffle your deck, then put that card on top of it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Poison Sound Wave",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "80",
        "text": "Your opponent's Active Pokémon is now Confused and Poisoned."
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
      169
    ],
    "flavorText": "Both of its legs have turned into wings. Without a sound, Crobat flies swiftly toward its prey and sinks its fangs into the nape of its target's neck.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-51/small",
      "large": "https://images.scrydex.com/pokemon/me4-51/large"
    }
  },
  {
    "id": "me4-52",
    "name": "Qwilfish",
    "number": "52",
    "artist": "nisimono",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Poison Point",
        "text": "If this Pokémon is in the Active Spot and is damaged by an attack from your opponent's Pokémon (even if this Pokémon is Knocked Out), the Attacking Pokémon is now Poisoned.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Venoshock",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30+",
        "text": "If your opponent's Active Pokémon is Poisoned, this attack does 50 more damage."
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
      211
    ],
    "flavorText": "Experienced fishers say they try to catch Qwilfish in the brief moment that these Pokemon become defenseless just after launching poisonous spikes.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-52/small",
      "large": "https://images.scrydex.com/pokemon/me4-52/large"
    }
  },
  {
    "id": "me4-53",
    "name": "Stunky",
    "number": "53",
    "artist": "Nobuhiro Imagawa",
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
        "name": "Scratch",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      434
    ],
    "flavorText": "The foul fluid from its rear is so revolting that it can make people feel queasy up to a mile and a quarter away.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-53/small",
      "large": "https://images.scrydex.com/pokemon/me4-53/large"
    }
  },
  {
    "id": "me4-54",
    "name": "Skuntank",
    "number": "54",
    "artist": "Yuriko Akase",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Stunky",
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
        "damage": "40",
        "text": ""
      },
      {
        "name": "Smash Turn",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      435
    ],
    "flavorText": "It attacks by spraying a repugnant fluid from its tail, but the stench dulls after a few squirts.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-54/small",
      "large": "https://images.scrydex.com/pokemon/me4-54/large"
    }
  },
  {
    "id": "me4-55",
    "name": "Krookodile ex",
    "number": "55",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "320",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Krokorok",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Corner",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "80",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
      },
      {
        "name": "Strong Bite",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "140+",
        "text": "If this Pokémon has a Pokémon Tool attached, this attack does 140 more damage."
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
      553
    ],
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-55/small",
      "large": "https://images.scrydex.com/pokemon/me4-55/large"
    }
  },
  {
    "id": "me4-56",
    "name": "Trubbish",
    "number": "56",
    "artist": "Souichirou Gunjima",
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
        "name": "Acid Spray",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, discard an Energy from your opponent's Active Pokémon."
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
    "flavorText": "The combination of garbage bags and industrial waste caused the chemical reaction that created this Pokémon.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-56/small",
      "large": "https://images.scrydex.com/pokemon/me4-56/large"
    }
  },
  {
    "id": "me4-57",
    "name": "Garbodor",
    "number": "57",
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
    "evolvesFrom": "Trubbish",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Gloomy Garbage",
        "text": "Attacks used by your opponent's Active Pokémon that has a Pokémon Tool attached do 20 less damage (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Sludge Bomb",
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
    "flavorText": "Consuming garbage makes new kinds of poison gases and liquids inside their bodies.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-57/small",
      "large": "https://images.scrydex.com/pokemon/me4-57/large"
    }
  },
  {
    "id": "me4-58",
    "name": "Skrelp",
    "number": "58",
    "artist": "Shimaris Yukichi",
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
        "name": "Hook",
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
      690
    ],
    "flavorText": "Camouflaged as rotten kelp, this Pokemon sprays liquid poison to take down prey that approach unawares.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-58/small",
      "large": "https://images.scrydex.com/pokemon/me4-58/large"
    }
  },
  {
    "id": "me4-59",
    "name": "Beldum",
    "number": "59",
    "artist": "toi8",
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
        "name": "Headbutt",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Beam",
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
      374
    ],
    "flavorText": "They communicate with one another by using magnetic pulses. In a swarm, they move in perfect unison.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-59/small",
      "large": "https://images.scrydex.com/pokemon/me4-59/large"
    }
  },
  {
    "id": "me4-60",
    "name": "Metang",
    "number": "60",
    "artist": "Kazumasa Yasukuni",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Beldum",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Metal Claw",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Guard Press",
        "cost": [
          "Metal",
          "Metal",
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
      375
    ],
    "flavorText": "It is formed by two Beldum joining together. Its steel body won't be scratched if it collides with a jet.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-60/small",
      "large": "https://images.scrydex.com/pokemon/me4-60/large"
    }
  },
  {
    "id": "me4-61",
    "name": "Metagross",
    "number": "61",
    "artist": "Bun Toujo",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Metang",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bounce Back",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "60",
        "text": "Switch out your opponent's Active Pokémon to the Bench. (Your opponent chooses the new Active Pokémon.)"
      },
      {
        "name": "Metallic Hammer",
        "cost": [
          "Metal",
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "150+",
        "text": "You may discard 3 Metal Energy from this Pokémon and have this attack do 150 more damage."
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
      376
    ],
    "flavorText": "Metang combined to form it. With four brains, it has the intelligence of a supercomputer.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-61/small",
      "large": "https://images.scrydex.com/pokemon/me4-61/large"
    }
  },
  {
    "id": "me4-62",
    "name": "Ferroseed",
    "number": "62",
    "artist": "OKUBO",
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
        "name": "Rolling Tackle",
        "cost": [
          "Metal",
          "Metal"
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
      597
    ],
    "flavorText": "It defends itself by launching spikes, but its aim isn't very good at first. Only after a lot of practice will it improve.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-62/small",
      "large": "https://images.scrydex.com/pokemon/me4-62/large"
    }
  },
  {
    "id": "me4-63",
    "name": "Ferrothorn",
    "number": "63",
    "artist": "Haru Akasaka",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Ferroseed",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Startling Drop",
        "text": "During your opponent's turn, if this Pokémon is discarded from your deck by an effect of an attack or Ability from your opponent's Pokémon, or by an effect of your opponent's Item or Supporter cards, discard the top 8 cards of your opponent's deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Special Whip",
        "cost": [
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "70+",
        "text": "If this Pokémon has any Special Energy attached, this attack does 70 more damage."
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
      598
    ],
    "flavorText": "This Pokémon scrapes its spikes across rocks, and then uses the tips of its feelers to absorb the nutrients it finds within the stone.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-63/small",
      "large": "https://images.scrydex.com/pokemon/me4-63/large"
    }
  },
  {
    "id": "me4-64",
    "name": "Cobalion ex",
    "number": "64",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "210",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Metal Road",
        "text": "Once during your turn, when this Pokémon moves from your Bench to the Active Spot, you may use this Ability. Move any amount of Metal Energy from your other Pokémon to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Power Tackle",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "During your next turn, this Pokémon can't use attacks."
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
      638
    ],
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-64/small",
      "large": "https://images.scrydex.com/pokemon/me4-64/large"
    }
  },
  {
    "id": "me4-65",
    "name": "Mega Dragalge ex",
    "number": "65",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Skrelp",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Corrosive Liquid",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Discard all Pokémon Tools and Special Energy from all of your opponent's Pokémon."
      },
      {
        "name": "Pernicious Poison",
        "cost": [
          "Water",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Poisoned. During Pokémon Checkup, place 16 damage counters on that Pokémon instead of 1."
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
      691
    ],
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-65/small",
      "large": "https://images.scrydex.com/pokemon/me4-65/large"
    }
  },
  {
    "id": "me4-66",
    "name": "Goomy",
    "number": "66",
    "artist": "Anesaki Dynamic",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Absorb",
        "cost": [
          "Water",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Heal 30 damage from this Pokémon."
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
      704
    ],
    "flavorText": "Thanks to the slimy membrane covering its body punches or kicks from its enemies slide right off it.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-66/small",
      "large": "https://images.scrydex.com/pokemon/me4-66/large"
    }
  },
  {
    "id": "me4-67",
    "name": "Sliggoo",
    "number": "67",
    "artist": "Yoriyuki Ikegami",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Goomy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gentle Slap",
        "cost": [
          "Water",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
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
      705
    ],
    "flavorText": "Its four horns are a high-performance radar system. It uses them to sense sounds and smells, rather than using ears or a nose.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-67/small",
      "large": "https://images.scrydex.com/pokemon/me4-67/large"
    }
  },
  {
    "id": "me4-68",
    "name": "Goodra",
    "number": "68",
    "artist": "Tonji Matsuno",
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
        "name": "Slimy Sliding",
        "text": "When your opponent's Active Pokémon retreats, your opponent flips a coin. If tails, Energy for its Retreat Cost is not discarded, and they don't switch Pokémon. The effect of Slimy Sliding doesn't stack.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dragon Pulse",
        "cost": [
          "Water",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "160",
        "text": "Discard the top card of your deck."
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
    "flavorText": "This very friendly dragon Pokémon will hug its beloved Trainer, leaving that Trainer covered in sticky slime.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-68/small",
      "large": "https://images.scrydex.com/pokemon/me4-68/large"
    }
  },
  {
    "id": "me4-69",
    "name": "Tauros",
    "number": "69",
    "artist": "Satoshi Ito",
    "rarity": "Uncommon",
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
        "name": "Target Together",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon and flip a coin for each of your Pokémon in play that has \"Tauros\" in its name. This attack does 50 damage to the chosen Pokémon for each heads. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      128
    ],
    "flavorText": "They fight each other by locking horns. The herd's protectors take pride in their battle-scarred horns.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-69/small",
      "large": "https://images.scrydex.com/pokemon/me4-69/large"
    }
  },
  {
    "id": "me4-70",
    "name": "Patrat",
    "number": "70",
    "artist": "Souichirou Gunjima",
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
    "abilities": [
      {
        "name": "Watchful Eye",
        "text": "Damage counters on each Pokémon (both yours and your opponent's) can't be moved to other Pokémon.",
        "type": "Ability"
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
    "flavorText": "Using food stored in cheek pouches, they can keep watch for days. They use their tails to communicate with others.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-70/small",
      "large": "https://images.scrydex.com/pokemon/me4-70/large"
    }
  },
  {
    "id": "me4-71",
    "name": "Watchog",
    "number": "71",
    "artist": "Kouki Saitou",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Patrat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Snap Inspection",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip 3 coins. If any of them are heads, your opponent reveals their hand. For each heads, choose a card you find there and shuffle it into your opponent's deck."
      },
      {
        "name": "Low Kick",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
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
      505
    ],
    "flavorText": "Using luminescent matter within its body, it makes its eyes and body glow and stuns attacking opponents.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-71/small",
      "large": "https://images.scrydex.com/pokemon/me4-71/large"
    }
  },
  {
    "id": "me4-72",
    "name": "Minccino",
    "number": "72",
    "artist": "ryoma uratsuka",
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
        "name": "Take Down",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
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
      572
    ],
    "flavorText": "These Pokemon like things neat and tidy. They are always sweeping and dusting their habitat, using their tails as brooms.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-72/small",
      "large": "https://images.scrydex.com/pokemon/me4-72/large"
    }
  },
  {
    "id": "me4-73",
    "name": "Cinccino ex",
    "number": "73",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "240",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Minccino",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Smooth Coat",
        "text": "If any damage is done to this Pokémon by attacks, flip a coin. If heads, prevent that damage.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Energized Slap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40×",
        "text": "This attack does 40 damage for each Energy attached to this Pokémon."
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
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-73/small",
      "large": "https://images.scrydex.com/pokemon/me4-73/large"
    }
  },
  {
    "id": "me4-74",
    "name": "Adversity Policy",
    "number": "74",
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
      "If the Pokémon this card is attached to has Weakness to your opponent's Active Pokémon's type, is in the Active Spot, and is damaged by an attack from your opponent's Pokémon (even if this Pokémon is Knocked Out), draw 3 cards."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-74/small",
      "large": "https://images.scrydex.com/pokemon/me4-74/large"
    }
  },
  {
    "id": "me4-75",
    "name": "Ange Floette",
    "number": "75",
    "artist": "MARINA Chikazawa",
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
      "You can put this card into play only if you discard a Prism Tower in play, and you can put this card into play during the same turn you play Prism Tower.\nEach Mega Floette ex in play (both yours and your opponent's) gets +150 HP."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-75/small",
      "large": "https://images.scrydex.com/pokemon/me4-75/large"
    }
  },
  {
    "id": "me4-76",
    "name": "AZ's Tranquility",
    "number": "76",
    "artist": "GIDORA",
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
      "Switch your Active Pokémon with 1 of your Benched Pokémon. If you moved a Pokémon ex to your Bench in this way, heal 80 damage from that Pokémon."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-76/small",
      "large": "https://images.scrydex.com/pokemon/me4-76/large"
    }
  },
  {
    "id": "me4-77",
    "name": "Emma",
    "number": "77",
    "artist": "Akira Komayama",
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
      "Your opponent reveals their hand, and you draw a card for each Pokémon you find there."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-77/small",
      "large": "https://images.scrydex.com/pokemon/me4-77/large"
    }
  },
  {
    "id": "me4-78",
    "name": "Great Haul Net",
    "number": "78",
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
      "Choose 1 or both:\n• Shuffle up to 3 Water Pokémon from your discard pile into your deck.\n• Shuffle up to 3 Basic Water Energy cards from your discard pile into your deck."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-78/small",
      "large": "https://images.scrydex.com/pokemon/me4-78/large"
    }
  },
  {
    "id": "me4-79",
    "name": "Philippe",
    "number": "79",
    "artist": "Souichirou Gunjima",
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
      "Attach up to 2 Basic Metal Energy cards from your discard pile to 1 of your Metal Pokémon."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-79/small",
      "large": "https://images.scrydex.com/pokemon/me4-79/large"
    }
  },
  {
    "id": "me4-80",
    "name": "Prism Tower",
    "number": "80",
    "artist": "MARINA Chikazawa",
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
      "Once during each player's turn, that player may discard 2 cards from their hand in order to draw a card."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-80/small",
      "large": "https://images.scrydex.com/pokemon/me4-80/large"
    }
  },
  {
    "id": "me4-81",
    "name": "Roxie's Performance",
    "number": "81",
    "artist": "Nobusawa/Mochipuyo",
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
      "During your opponent's next turn, their Poisoned Pokémon can't retreat. (This includes newly Poisoned Pokémon.)"
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-81/small",
      "large": "https://images.scrydex.com/pokemon/me4-81/large"
    }
  },
  {
    "id": "me4-82",
    "name": "Special Red Card",
    "number": "82",
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
      "You can use this card only if your opponent has 3 or fewer Prize cards remaining.\n\nYour opponent shuffles their hand and puts it on the bottom of their deck. If they put any cards on the bottom of their deck in this way, they draw 3 cards."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-82/small",
      "large": "https://images.scrydex.com/pokemon/me4-82/large"
    }
  },
  {
    "id": "me4-83",
    "name": "Transformation Tome",
    "number": "83",
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
      "You must play 2 Transformation Tome cards at once. (This effect works one time for 2 cards.)\n \nChoose a Basic Pokémon in your discard pile and switch it with 1 of your Basic Pokémon in play. Any attached cards, damage counters, Special Conditions, turns in play, and any other effects remain on the new Pokémon."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-83/small",
      "large": "https://images.scrydex.com/pokemon/me4-83/large"
    }
  },
  {
    "id": "me4-84",
    "name": "Bubbly Water Energy",
    "number": "84",
    "artist": null,
    "rarity": "Rare",
    "supertype": "Energy",
    "subtypes": [
      "Special"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "As long as this card is attached to a Pokémon, it provides Water Energy.\n\nThe Water Pokémon this card is attached to recovers from all Special Conditions and can't be affected by any Special Conditions."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-84/small",
      "large": "https://images.scrydex.com/pokemon/me4-84/large"
    }
  },
  {
    "id": "me4-85",
    "name": "Magnetic Metal Energy",
    "number": "85",
    "artist": null,
    "rarity": "Rare",
    "supertype": "Energy",
    "subtypes": [
      "Special"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "As long as this card is attached to a Pokémon, it provides Metal Energy.\n\nThe Metal Pokémon this card is attached to has no Retreat Cost."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-85/small",
      "large": "https://images.scrydex.com/pokemon/me4-85/large"
    }
  },
  {
    "id": "me4-86",
    "name": "Nitro Fire Energy",
    "number": "86",
    "artist": null,
    "rarity": "Rare",
    "supertype": "Energy",
    "subtypes": [
      "Special"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "As long as this card is attached to a Pokémon, it provides Fire Energy.\n \nIf this card is discarded by an effect of an attack used by the Fire Pokémon this card is attached to, put this card into your hand after attack damage and effects."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-86/small",
      "large": "https://images.scrydex.com/pokemon/me4-86/large"
    }
  },
  {
    "id": "me4-87",
    "name": "Chespin",
    "number": "87",
    "artist": "Atsushi Furusawa",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
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
        "name": "Beat",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Spike Sting",
        "cost": [
          "Grass",
          "Grass"
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
      650
    ],
    "flavorText": "The quills on its head are usually soft. When it flexes them, the points become so hard and sharp that they can pierce rock.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-87/small",
      "large": "https://images.scrydex.com/pokemon/me4-87/large"
    }
  },
  {
    "id": "me4-88",
    "name": "Froakie",
    "number": "88",
    "artist": "Susumu Maeya",
    "rarity": "Illustration Rare",
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
        "name": "Collect",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card."
      },
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      656
    ],
    "flavorText": "It protects its skin by covering its body in delicate bubbles. Beneath its happy-go-lucky air, it keeps a watch ful eye on its surroundings.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-88/small",
      "large": "https://images.scrydex.com/pokemon/me4-88/large"
    }
  },
  {
    "id": "me4-89",
    "name": "Frogadier",
    "number": "89",
    "artist": "Susumu Maeya",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Froakie",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Summoning Jutsu",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 Pokémon, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Aqua Edge",
        "cost": [
          "Water",
          "Water"
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
      657
    ],
    "flavorText": "Its swiftness is unparalleled. It can scale a tower of more than 2,000 feet in a minute's time.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-89/small",
      "large": "https://images.scrydex.com/pokemon/me4-89/large"
    }
  },
  {
    "id": "me4-90",
    "name": "Ampharos",
    "number": "90",
    "artist": "saino misaki",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Flaaffy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Synchro Pulse",
        "text": "If you have the same number of cards in your hand as your opponent, attacks used by this Pokémon do 80 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Flashing Bolt",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "140",
        "text": "During your next turn, this Pokémon can't use Flashing Bolt."
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
    "flavorText": "The tail's tip shines brightly and can be seen from far away. It acts as a beacon for lost people.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-90/small",
      "large": "https://images.scrydex.com/pokemon/me4-90/large"
    }
  },
  {
    "id": "me4-91",
    "name": "Xerneas",
    "number": "91",
    "artist": "YASHIRO Nanaco",
    "rarity": "Illustration Rare",
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
        "name": "Geo Storm",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "30×",
        "text": "This attack does 30 damage for each Psychic Energy attached to all of your Pokémon."
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
      716
    ],
    "flavorText": "When the horns on its head shine in seven colors, it is said to be sharing everlasting life.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-91/small",
      "large": "https://images.scrydex.com/pokemon/me4-91/large"
    }
  },
  {
    "id": "me4-92",
    "name": "Claydol",
    "number": "92",
    "artist": "matazo",
    "rarity": "Illustration Rare",
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
        "name": "Devolution Ray",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "If your opponent's Active Pokémon is an evolved Pokémon, devolve it by putting the highest Stage Evolution card on it into your opponent's hand."
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
    "flavorText": "This mysterious Pokémon started life as an ancient clay figurine made over 20,000 years ago.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-92/small",
      "large": "https://images.scrydex.com/pokemon/me4-92/large"
    }
  },
  {
    "id": "me4-93",
    "name": "Crobat",
    "number": "93",
    "artist": "Kazuhisa Uragami",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Golbat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Nighttime Maneuvers",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may use this Ability. Search your deck for a card. Shuffle your deck, then put that card on top of it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Poison Sound Wave",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "80",
        "text": "Your opponent's Active Pokémon is now Confused and Poisoned."
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
      169
    ],
    "flavorText": "Both of its legs have turned into wings. Without a sound, Crobat flies swiftly toward its prey and sinks its fangs into the nape of its target's neck.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-93/small",
      "large": "https://images.scrydex.com/pokemon/me4-93/large"
    }
  },
  {
    "id": "me4-94",
    "name": "Metang",
    "number": "94",
    "artist": "Kurata So",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Beldum",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Metal Claw",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Guard Press",
        "cost": [
          "Metal",
          "Metal",
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
      375
    ],
    "flavorText": "It is formed by two Beldum joining together. Its steel body won't be scratched if it collides with a jet.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-94/small",
      "large": "https://images.scrydex.com/pokemon/me4-94/large"
    }
  },
  {
    "id": "me4-95",
    "name": "Sliggoo",
    "number": "95",
    "artist": "aspara",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Goomy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gentle Slap",
        "cost": [
          "Water",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
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
      705
    ],
    "flavorText": "Its four horns are a high-performance radar system. It uses them to sense sounds and smells, rather than using ears or a nose.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-95/small",
      "large": "https://images.scrydex.com/pokemon/me4-95/large"
    }
  },
  {
    "id": "me4-96",
    "name": "Tauros",
    "number": "96",
    "artist": "Tsuyoshi Nagano",
    "rarity": "Illustration Rare",
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
        "name": "Target Together",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon and flip a coin for each of your Pokémon in play that has \"Tauros\" in its name. This attack does 50 damage to the chosen Pokémon for each heads. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      128
    ],
    "flavorText": "They fight each other by locking horns. The herd's protectors take pride in their battle-scarred horns.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-96/small",
      "large": "https://images.scrydex.com/pokemon/me4-96/large"
    }
  },
  {
    "id": "me4-97",
    "name": "Watchog",
    "number": "97",
    "artist": "MARINA Chikazawa",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Patrat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Snap Inspection",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip 3 coins. If any of them are heads, your opponent reveals their hand. For each heads, choose a card you find there and shuffle it into your opponent's deck."
      },
      {
        "name": "Low Kick",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
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
      505
    ],
    "flavorText": "Using luminescent matter within its body, it makes its eyes and body glow and stuns attacking opponents.",
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-97/small",
      "large": "https://images.scrydex.com/pokemon/me4-97/large"
    }
  },
  {
    "id": "me4-98",
    "name": "Beedrill ex",
    "number": "98",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "310",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Kakuna",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Rumbling Bees",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "110×",
        "text": "This attack does 110 damage for each of your Beedrill and Beedrill ex in play."
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
      15
    ],
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-98/small",
      "large": "https://images.scrydex.com/pokemon/me4-98/large"
    }
  },
  {
    "id": "me4-99",
    "name": "Mega Pyroar ex",
    "number": "99",
    "artist": "Keisuke Azuma",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Litleo",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Ferocious Bellow",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "80",
        "text": "During your opponent's next turn, attacks used by the Defending Pokémon do 50 less damage (before applying Weakness and Resistance)."
      },
      {
        "name": "Fiery Big Bang",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "290-",
        "text": "This attack does 10 less damage for each damage counter on this Pokémon."
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
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-99/small",
      "large": "https://images.scrydex.com/pokemon/me4-99/large"
    }
  },
  {
    "id": "me4-100",
    "name": "Mega Greninja ex",
    "number": "100",
    "artist": "takuyoa",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "350",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Frogadier",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Mortal Shuriken",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may discard a Basic Water Energy card from your hand in order to use this Ability. Place 6 damage counters on 1 of your opponent's Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Ninja Spinner",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "120+",
        "text": "You may put a Water Energy attached to this Pokémon into your hand and have this attack do 80 more damage."
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
      658
    ],
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-100/small",
      "large": "https://images.scrydex.com/pokemon/me4-100/large"
    }
  },
  {
    "id": "me4-101",
    "name": "Mega Floette ex",
    "number": "101",
    "artist": "aky CG Works",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "250",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Gentle Light",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 30 damage from each Pokémon (both yours and your opponent's)."
      },
      {
        "name": "Eternity Bloom",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "Search your deck for up to 4 Basic Psychic Energy cards and attach them to your Benched Pokémon in any way you like. Then, shuffle your deck."
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
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-101/small",
      "large": "https://images.scrydex.com/pokemon/me4-101/large"
    }
  },
  {
    "id": "me4-102",
    "name": "Gourgeist ex",
    "number": "102",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "270",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Pumpkaboo",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Horrifying Rondo",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30+",
        "text": "This attack does 50 more damage for each of your Benched Pokémon that has any damage counters on it."
      },
      {
        "name": "Ghostly Touch",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "140",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      711
    ],
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-102/small",
      "large": "https://images.scrydex.com/pokemon/me4-102/large"
    }
  },
  {
    "id": "me4-103",
    "name": "Cobalion ex",
    "number": "103",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "210",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Metal Road",
        "text": "Once during your turn, when this Pokémon moves from your Bench to the Active Spot, you may use this Ability. Move any amount of Metal Energy from your other Pokémon to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Power Tackle",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "During your next turn, this Pokémon can't use attacks."
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
      638
    ],
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-103/small",
      "large": "https://images.scrydex.com/pokemon/me4-103/large"
    }
  },
  {
    "id": "me4-104",
    "name": "Mega Dragalge ex",
    "number": "104",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Skrelp",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Corrosive Liquid",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Discard all Pokémon Tools and Special Energy from all of your opponent's Pokémon."
      },
      {
        "name": "Pernicious Poison",
        "cost": [
          "Water",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Poisoned. During Pokémon Checkup, place 16 damage counters on that Pokémon instead of 1."
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
      691
    ],
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-104/small",
      "large": "https://images.scrydex.com/pokemon/me4-104/large"
    }
  },
  {
    "id": "me4-105",
    "name": "Cinccino ex",
    "number": "105",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "240",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Minccino",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Smooth Coat",
        "text": "If any damage is done to this Pokémon by attacks, flip a coin. If heads, prevent that damage.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Energized Slap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40×",
        "text": "This attack does 40 damage for each Energy attached to this Pokémon."
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
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-105/small",
      "large": "https://images.scrydex.com/pokemon/me4-105/large"
    }
  },
  {
    "id": "me4-106",
    "name": "AZ's Tranquility",
    "number": "106",
    "artist": "GIDORA",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Switch your Active Pokémon with 1 of your Benched Pokémon. If you moved a Pokémon ex to your Bench in this way, heal 80 damage from that Pokémon."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-106/small",
      "large": "https://images.scrydex.com/pokemon/me4-106/large"
    }
  },
  {
    "id": "me4-107",
    "name": "Emma",
    "number": "107",
    "artist": "Akira Komayama",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Your opponent reveals their hand, and you draw a card for each Pokémon you find there."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-107/small",
      "large": "https://images.scrydex.com/pokemon/me4-107/large"
    }
  },
  {
    "id": "me4-108",
    "name": "Energy Retrieval",
    "number": "108",
    "artist": "Studio Bora Inc.",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Put up to 2 Basic Energy cards from your discard pile into your hand."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-108/small",
      "large": "https://images.scrydex.com/pokemon/me4-108/large"
    }
  },
  {
    "id": "me4-109",
    "name": "Jumbo Ice Cream",
    "number": "109",
    "artist": "AYUMI ODASHIMA",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Heal 80 damage from your Active Pokémon that has 3 or more Energy attached."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-109/small",
      "large": "https://images.scrydex.com/pokemon/me4-109/large"
    }
  },
  {
    "id": "me4-110",
    "name": "Philippe",
    "number": "110",
    "artist": "Souichirou Gunjima",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Attach up to 2 Basic Metal Energy cards from your discard pile to 1 of your Metal Pokémon."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-110/small",
      "large": "https://images.scrydex.com/pokemon/me4-110/large"
    }
  },
  {
    "id": "me4-111",
    "name": "Prism Tower",
    "number": "111",
    "artist": "MARINA Chikazawa",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Stadium"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Once during each player's turn, that player may discard 2 cards from their hand in order to draw a card."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-111/small",
      "large": "https://images.scrydex.com/pokemon/me4-111/large"
    }
  },
  {
    "id": "me4-112",
    "name": "Roxie's Performance",
    "number": "112",
    "artist": "Nobusawa/Mochipuyo",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "During your opponent's next turn, their Poisoned Pokémon can't retreat. (This includes newly Poisoned Pokémon.)"
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-112/small",
      "large": "https://images.scrydex.com/pokemon/me4-112/large"
    }
  },
  {
    "id": "me4-113",
    "name": "Special Red Card",
    "number": "113",
    "artist": "Studio Bora Inc.",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can use this card only if your opponent has 3 or fewer Prize cards remaining.\n\nYour opponent shuffles their hand and puts it on the bottom of their deck. If they put any cards on the bottom of their deck in this way, they draw 3 cards."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-113/small",
      "large": "https://images.scrydex.com/pokemon/me4-113/large"
    }
  },
  {
    "id": "me4-114",
    "name": "Surfing Beach",
    "number": "114",
    "artist": "AYUMI ODASHIMA",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Stadium"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Once during each player's turn, that player may switch their Active Water Pokémon with 1 of their Benched Water Pokémon."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-114/small",
      "large": "https://images.scrydex.com/pokemon/me4-114/large"
    }
  },
  {
    "id": "me4-115",
    "name": "Tool Scrapper",
    "number": "115",
    "artist": "Studio Bora Inc.",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Choose up to 2 Pokémon Tools attached to Pokémon (yours or your opponent's) and discard them."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-115/small",
      "large": "https://images.scrydex.com/pokemon/me4-115/large"
    }
  },
  {
    "id": "me4-116",
    "name": "Mega Greninja ex",
    "number": "116",
    "artist": "Susumu Maeya",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "350",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Frogadier",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Mortal Shuriken",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may discard a Basic Water Energy card from your hand in order to use this Ability. Place 6 damage counters on 1 of your opponent's Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Ninja Spinner",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "120+",
        "text": "You may put a Water Energy attached to this Pokémon into your hand and have this attack do 80 more damage."
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
      658
    ],
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-116/small",
      "large": "https://images.scrydex.com/pokemon/me4-116/large"
    }
  },
  {
    "id": "me4-117",
    "name": "Mega Floette ex",
    "number": "117",
    "artist": "Teeziro",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "250",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Gentle Light",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 30 damage from each Pokémon (both yours and your opponent's)."
      },
      {
        "name": "Eternity Bloom",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "Search your deck for up to 4 Basic Psychic Energy cards and attach them to your Benched Pokémon in any way you like. Then, shuffle your deck."
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
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-117/small",
      "large": "https://images.scrydex.com/pokemon/me4-117/large"
    }
  },
  {
    "id": "me4-118",
    "name": "Mega Dragalge ex",
    "number": "118",
    "artist": "Kazumasa Yasukunio",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Skrelp",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Corrosive Liquid",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Discard all Pokémon Tools and Special Energy from all of your opponent's Pokémon."
      },
      {
        "name": "Pernicious Poison",
        "cost": [
          "Water",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Poisoned. During Pokémon Checkup, place 16 damage counters on that Pokémon instead of 1."
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
      691
    ],
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-118/small",
      "large": "https://images.scrydex.com/pokemon/me4-118/large"
    }
  },
  {
    "id": "me4-119",
    "name": "Cinccino ex",
    "number": "119",
    "artist": "Keisin",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "240",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Minccino",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Smooth Coat",
        "text": "If any damage is done to this Pokémon by attacks, flip a coin. If heads, prevent that damage.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Energized Slap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40×",
        "text": "This attack does 40 damage for each Energy attached to this Pokémon."
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
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-119/small",
      "large": "https://images.scrydex.com/pokemon/me4-119/large"
    }
  },
  {
    "id": "me4-120",
    "name": "AZ's Tranquility",
    "number": "120",
    "artist": "OKACHEKE",
    "rarity": "Special Illustration Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Switch your Active Pokémon with 1 of your Benched Pokémon. If you moved a Pokémon ex to your Bench in this way, heal 80 damage from that Pokémon."
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-120/small",
      "large": "https://images.scrydex.com/pokemon/me4-120/large"
    }
  },
  {
    "id": "me4-121",
    "name": "Roxie's Performance",
    "number": "121",
    "artist": "Tomowaka",
    "rarity": "Special Illustration Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "During your opponent's next turn, their Poisoned Pokémon can't retreat. (This includes newly Poisoned Pokémon.)"
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
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-121/small",
      "large": "https://images.scrydex.com/pokemon/me4-121/large"
    }
  },
  {
    "id": "me4-122",
    "name": "Mega Greninja ex",
    "number": "122",
    "artist": "takuyoa",
    "rarity": "Mega Hyper Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "350",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Frogadier",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Mortal Shuriken",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may discard a Basic Water Energy card from your hand in order to use this Ability. Place 6 damage counters on 1 of your opponent's Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Ninja Spinner",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "120+",
        "text": "You may put a Water Energy attached to this Pokémon into your hand and have this attack do 80 more damage."
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
      658
    ],
    "flavorText": null,
    "legalities": {
      "standard": "Legal",
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "J",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me4-122/small",
      "large": "https://images.scrydex.com/pokemon/me4-122/large"
    }
  }
]

export default cardDetails
