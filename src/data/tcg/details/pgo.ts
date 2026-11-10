import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "pgo-1",
    "name": "Bulbasaur",
    "number": "1",
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
      "Ivysaur"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Vine Whip",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Razor Leaf",
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
      1
    ],
    "flavorText": "There is a plant seed on its back right from the day this Pokémon is born. The seed slowly grows larger.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/001/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/001/high.webp"
    }
  },
  {
    "id": "pgo-2",
    "name": "Ivysaur",
    "number": "2",
    "artist": "zig",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Bulbasaur",
    "evolvesTo": [
      "Venusaur"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Summoning Aroma",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Pokémon, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Razor Leaf",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      2
    ],
    "flavorText": "When the bulb on its back grows large, it appears to lose the ability to stand on its hind legs.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/002/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/002/high.webp"
    }
  },
  {
    "id": "pgo-3",
    "name": "Venusaur",
    "number": "3",
    "artist": "KEIICHIRO ITO",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Ivysaur",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Loopy Lasso",
        "text": "Once during your turn, you may flip a coin. If heads, switch 1 of your opponent's Benched Pokémon with their Active Pokémon, and the new Active Pokémon is now Asleep and Poisoned.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Solar Beam",
        "cost": [
          "Grass",
          "Grass",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      3
    ],
    "flavorText": "Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/003/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/003/high.webp"
    }
  },
  {
    "id": "pgo-4",
    "name": "Radiant Venusaur",
    "number": "4",
    "artist": "Misa Tsutsui",
    "rarity": "Radiant Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Radiant"
    ],
    "hp": "150",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Radiant Pokémon Rule: You can't have more than 1 Radiant Pokémon in your deck."
    ],
    "abilities": [
      {
        "name": "Sunny Bloom",
        "text": "Once at the end of your turn (after your attack), you may use this Ability. Draw cards until you have 4 cards in your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Pollen Hazard",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Your opponent's Active Pokémon is now Burned, Confused, and Poisoned."
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
      3
    ],
    "flavorText": "Its plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/004/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/004/high.webp"
    }
  },
  {
    "id": "pgo-5",
    "name": "Alolan Exeggutor V",
    "number": "5",
    "artist": "MUGENUP",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "240",
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
        "name": "Growing Tall",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, search your deck for up to 5 Grass Energy cards and attach them to your Pokémon in any way you like. Then, shuffle your deck."
      },
      {
        "name": "Head Swing",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 30 damage to 1 of your opponent's Pokémon for each Grass Energy attached to this Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/005/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/005/high.webp"
    }
  },
  {
    "id": "pgo-6",
    "name": "Spinarak",
    "number": "6",
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
      "Ariados"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Sting",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Poisoned."
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
    "flavorText": "Although the poison from its fangs isn't that strong, it's potent enough to weaken prey that gets caught in its web.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/006/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/006/high.webp"
    }
  },
  {
    "id": "pgo-7",
    "name": "Ariados",
    "number": "7",
    "artist": "Misa Tsutsui",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Spinarak",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison String-Up",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed and Poisoned."
      },
      {
        "name": "Absorb",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Heal 50 damage from this Pokémon."
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
    "flavorText": "It spews threads from its mouth to catch its prey. When night falls, it leaves its web to go hunt aggressively.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/007/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/007/high.webp"
    }
  },
  {
    "id": "pgo-8",
    "name": "Charmander",
    "number": "8",
    "artist": "saino misaki",
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
      "Charmeleon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tail on Fire",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Search your deck for a Fire Energy card and attach it to this Pokémon. Then, shuffle your deck."
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
      4
    ],
    "flavorText": "It has a preference for hot things. When it rains, steam is said to spout from the tip of its tail.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/008/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/008/high.webp"
    }
  },
  {
    "id": "pgo-9",
    "name": "Charmeleon",
    "number": "9",
    "artist": "Shiburingaru",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charmander",
    "evolvesTo": [
      "Charizard"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scratch",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Flamethrower",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
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
      5
    ],
    "flavorText": "It has a barbaric nature. In battle, it whips its fiery tail around and slashes away with sharp claws.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/009/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/009/high.webp"
    }
  },
  {
    "id": "pgo-10",
    "name": "Charizard",
    "number": "10",
    "artist": "N-DESIGN Inc.",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Burn Brightly",
        "text": "Each basic Fire Energy attached to your Pokémon provides FireFire Energy. You can't apply more than 1 Burn Brightly Ability at a time.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Flare Blitz",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "170",
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
      6
    ],
    "flavorText": "It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/010/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/010/high.webp"
    }
  },
  {
    "id": "pgo-11",
    "name": "Radiant Charizard",
    "number": "11",
    "artist": "Shigenori Negishi",
    "rarity": "Radiant Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Radiant"
    ],
    "hp": "160",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Radiant Pokémon Rule: You can't have more than 1 Radiant Pokémon in your deck."
    ],
    "abilities": [
      {
        "name": "Excited Heart",
        "text": "This Pokémon's attacks cost Colorless less for each Prize card your opponent has taken.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Combustion Blast",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "250",
        "text": "During your next turn, this Pokémon can't use Combustion Blast."
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
      6
    ],
    "flavorText": "It spits fire that is hot enough to melt boulders. It may cause forest fires by blowing flames.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/011/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/011/high.webp"
    }
  },
  {
    "id": "pgo-12",
    "name": "Moltres",
    "number": "12",
    "artist": "Pani Kobayashi",
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
    "abilities": [
      {
        "name": "Flare Symbol",
        "text": "Your Basic Fire Pokémon's attacks, except any Moltres, do 10 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Fire Wing",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/012/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/012/high.webp"
    }
  },
  {
    "id": "pgo-13",
    "name": "Numel",
    "number": "13",
    "artist": "Shibuzoh.",
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
      "Camerupt"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tackle",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Stomp",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "Flip a coin. If heads, this attack does 50 more damage."
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
      322
    ],
    "flavorText": "The magma in its body reaches 2,200 degrees Fahrenheit. Its hump gets smaller when it uses Fire-type moves.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/013/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/013/high.webp"
    }
  },
  {
    "id": "pgo-14",
    "name": "Camerupt",
    "number": "14",
    "artist": "yuu",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Numel",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Split Bomb",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 50 damage to 2 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Heat Blast",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      323
    ],
    "flavorText": "If angered, the humps on its back erupt in a shower of molten lava. It lives in the craters of volcanoes.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/014/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/014/high.webp"
    }
  },
  {
    "id": "pgo-15",
    "name": "Squirtle",
    "number": "15",
    "artist": "sowsow",
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
      "Wartortle"
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
      7
    ],
    "flavorText": "When it retracts its long neck into its shell, it squirts out water with vigorous force.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/015/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/015/high.webp"
    }
  },
  {
    "id": "pgo-16",
    "name": "Wartortle",
    "number": "16",
    "artist": "kurumitsu",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Squirtle",
    "evolvesTo": [
      "Blastoise"
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
        "damage": "30",
        "text": ""
      },
      {
        "name": "Hydro Pump",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "This attack does 10 more damage for each Water Energy attached to this Pokémon."
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
      8
    ],
    "flavorText": "It is recognized as a symbol of longevity. If its shell has algae on it, that Wartortle is very old.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/016/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/016/high.webp"
    }
  },
  {
    "id": "pgo-17",
    "name": "Blastoise",
    "number": "17",
    "artist": "NC Empire",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wartortle",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Vitality Spring",
        "text": "Once during your turn, you may search your deck for up to 6 Energy cards and attach them to your Pokémon in any way you like. Then, shuffle your deck. If you use this Ability, your turn ends.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hydro Pump",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "90+",
        "text": "This attack does 30 more damage for each Water Energy attached to this Pokémon."
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
      9
    ],
    "flavorText": "It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/017/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/017/high.webp"
    }
  },
  {
    "id": "pgo-18",
    "name": "Radiant Blastoise",
    "number": "18",
    "artist": "Masakazu Fukuda",
    "rarity": "Radiant Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Radiant"
    ],
    "hp": "150",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Radiant Pokémon Rule: You can't have more than 1 Radiant Pokémon in your deck."
    ],
    "abilities": [
      {
        "name": "Pump Shot",
        "text": "You must discard a Water Energy card from your hand in order to use this Ability. Once during your turn, you may put 2 damage counters on 1 of your opponent's Benched Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Torrential Cannon",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "170",
        "text": "During your next turn, this Pokémon can't use Torrential Cannon."
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
      9
    ],
    "flavorText": "It crushes its foe under its heavy body to cause fainting. In a pinch, it will withdraw inside its shell.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/018/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/018/high.webp"
    }
  },
  {
    "id": "pgo-19",
    "name": "Slowpoke",
    "number": "19",
    "artist": "N-DESIGN Inc.",
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
        "name": "Hold Still",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 30 damage from this Pokémon."
      },
      {
        "name": "Ideal Fishing Day",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put an Item card from your discard pile into your hand."
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
      79
    ],
    "flavorText": "Slow-witted and oblivious, this Pokémon won't feel any pain if its tail gets eaten. It won't notice when its tail grows back, either.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/019/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/019/high.webp"
    }
  },
  {
    "id": "pgo-20",
    "name": "Slowbro",
    "number": "20",
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
    "evolvesFrom": "Slowpoke",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tumbling Tackle",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Both Active Pokémon are now Asleep."
      },
      {
        "name": "Twilight Inspiration",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "You can use this attack only if your opponent has exactly 1 Prize card remaining. Take 2 Prize cards."
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
      80
    ],
    "flavorText": "Slowpoke became Slowbro when a Shellder bit on to its tail. Sweet flavors seeping from the tail make the Shellder feel as if its life is a dream.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/020/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/020/high.webp"
    }
  },
  {
    "id": "pgo-21",
    "name": "Magikarp",
    "number": "21",
    "artist": "N-DESIGN Inc.",
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
        "name": "Lively Grouping",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for any number of Magikarp, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Raging Fin",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "This attack does 30 more damage for each Magikarp and Gyarados in your discard pile."
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
    "flavorText": "It is virtually worthless in terms of both power and speed. It is the most weak and pathetic Pokémon in the world.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/021/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/021/high.webp"
    }
  },
  {
    "id": "pgo-22",
    "name": "Gyarados",
    "number": "22",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "170",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Magikarp",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wreak Havoc",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin until you get tails. For each heads, discard the top 2 cards of your opponent's deck."
      },
      {
        "name": "Wild Splash",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "230",
        "text": "Discard the top 5 cards of your deck."
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
    "flavorText": "It has an extremely aggressive nature. The Hyper Beam it shoots from its mouth totally incinerates all targets.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/022/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/022/high.webp"
    }
  },
  {
    "id": "pgo-23",
    "name": "Lapras",
    "number": "23",
    "artist": "N-DESIGN Inc.",
    "rarity": "Rare Holo",
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
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Surf",
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/023/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/023/high.webp"
    }
  },
  {
    "id": "pgo-24",
    "name": "Articuno",
    "number": "24",
    "artist": "Jiro Sasumo",
    "rarity": "Rare Holo",
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
    "abilities": [
      {
        "name": "Ice Symbol",
        "text": "Your Basic Water Pokémon's attacks, except any Articuno, do 10 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Freezing Wind",
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
      144
    ],
    "flavorText": "It's said that this Pokémon's beautiful blue wings are made of ice. Articuno flies over snowy mountains, its long tail fluttering along behind it.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/024/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/024/high.webp"
    }
  },
  {
    "id": "pgo-25",
    "name": "Wimpod",
    "number": "25",
    "artist": "Miki Tanaka",
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
      "Golisopod"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Punk Out",
        "text": "If your opponent has any Pokémon V in play, this Pokémon has no Retreat Cost.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Gnaw",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      767
    ],
    "flavorText": "It's nature's cleaner—it eats anything and everything, including garbage and rotten things. The ground near its nest is always clean.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/025/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/025/high.webp"
    }
  },
  {
    "id": "pgo-26",
    "name": "Golisopod",
    "number": "26",
    "artist": "otumami",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wimpod",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "First Impression",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "If this Pokémon moved from your Bench to the Active Spot this turn, this attack does 90 more damage."
      },
      {
        "name": "Slash",
        "cost": [
          "Water",
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
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/026/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/026/high.webp"
    }
  },
  {
    "id": "pgo-27",
    "name": "Pikachu",
    "number": "27",
    "artist": "N-DESIGN Inc.",
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
        "name": "Buddy Bolt",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "If you played a Supporter card from your hand during this turn, this attack does 30 more damage."
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
    "flavorText": "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/027/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/027/high.webp"
    }
  },
  {
    "id": "pgo-28",
    "name": "Pikachu",
    "number": "28",
    "artist": "Narumi Sato",
    "rarity": "Rare Holo",
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
        "name": "Wild Charge",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      25
    ],
    "flavorText": "Pikachu that can generate powerful electricity have cheek sacs that are extra soft and super stretchy.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/028/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/028/high.webp"
    }
  },
  {
    "id": "pgo-29",
    "name": "Zapdos",
    "number": "29",
    "artist": "Yuya Oka",
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
    "abilities": [
      {
        "name": "Lightning Symbol",
        "text": "Your Basic Lightning Pokémon's attacks, except any Zapdos, do 10 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Electric Ball",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      145
    ],
    "flavorText": "This Pokémon has complete control over electricity. There are tales of Zapdos nesting in the dark depths of pitch-black thunderclouds.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/029/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/029/high.webp"
    }
  },
  {
    "id": "pgo-30",
    "name": "Mewtwo V",
    "number": "30",
    "artist": "Nurikabe",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
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
        "name": "Super Psy Bolt",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Transfer Break",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/030/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/030/high.webp"
    }
  },
  {
    "id": "pgo-31",
    "name": "Mewtwo VSTAR",
    "number": "31",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Holo VSTAR",
    "supertype": "Pokémon",
    "subtypes": [
      "VSTAR"
    ],
    "hp": "280",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Mewtwo V",
    "evolvesTo": [],
    "rules": [
      "VSTAR rule: When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Psy Purge",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90×",
        "text": "Discard up to 3 Psychic Energy from your Pokémon. This attack does 90 damage for each card you discarded in this way."
      },
      {
        "name": "Star Raid",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 120 damage to each of your opponent's Pokémon V. This damage isn't affected by Weakness or Resistance. (You can't use more than 1 VSTAR Power in a game.)"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/031/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/031/high.webp"
    }
  },
  {
    "id": "pgo-32",
    "name": "Natu",
    "number": "32",
    "artist": "HYOGONOSUKE",
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
        "name": "Peck",
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
      177
    ],
    "flavorText": "It is extremely good at climbing tree trunks and likes to eat the new sprouts on the trees.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/032/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/032/high.webp"
    }
  },
  {
    "id": "pgo-33",
    "name": "Xatu",
    "number": "33",
    "artist": "Hataya",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Natu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pinpoint Wave",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 90 damage to 1 of your opponent's Pokémon V. This damage isn't affected by Weakness or Resistance."
      },
      {
        "name": "Mind Bend",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
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
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      178
    ],
    "flavorText": "They say that it stays still and quiet because it is seeing both the past and future at the same time.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/033/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/033/high.webp"
    }
  },
  {
    "id": "pgo-34",
    "name": "Lunatone",
    "number": "34",
    "artist": "miki kudo",
    "rarity": "Uncommon",
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
        "name": "Cycle Draw",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard a card from your hand. If you do, draw 3 cards."
      },
      {
        "name": "Moon Kinesis",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "This attack does 30 more damage for each Psychic Energy attached to this Pokémon."
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
      337
    ],
    "flavorText": "The phase of the moon apparently has some effect on its power. It's active on the night of a full moon.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/034/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/034/high.webp"
    }
  },
  {
    "id": "pgo-35",
    "name": "Sylveon",
    "number": "35",
    "artist": "Atsushi Furusawa",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Souvenir",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 cards and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Wonder Flash",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "If your opponent's Active Pokémon is a Dragon Pokémon, this attack does 90 more damage."
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
    "flavorText": "By releasing enmity-erasing waves from its ribbonlike feelers, Sylveon stops any conflict.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/035/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/035/high.webp"
    }
  },
  {
    "id": "pgo-36",
    "name": "Onix",
    "number": "36",
    "artist": "Mitsuhiro Arita",
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
    "evolvesTo": [
      "Steelix"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rock Tomb",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
      },
      {
        "name": "Raging Swing",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "50×",
        "text": "This attack does 50 damage for each damage counter on this Pokémon."
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
    "flavorText": "As it digs through the ground, it absorbs many hard objects. This is what makes its body so solid.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/036/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/036/high.webp"
    }
  },
  {
    "id": "pgo-37",
    "name": "Larvitar",
    "number": "37",
    "artist": "sui",
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
      "Pupitar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rock Smash",
        "cost": [
          "Colorless"
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
      246
    ],
    "flavorText": "Born deep underground, it comes aboveground and becomes a pupa once it has finished eating the surrounding soil.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/037/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/037/high.webp"
    }
  },
  {
    "id": "pgo-38",
    "name": "Pupitar",
    "number": "38",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Larvitar",
    "evolvesTo": [
      "Tyranitar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Crashing Bullet",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "This attack also does 20 damage to each Benched Pokémon (both yours and your opponent's). (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Tackle",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      247
    ],
    "flavorText": "Even sealed in its shell, it can move freely. Hard and fast, it has outstanding destructive power.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/038/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/038/high.webp"
    }
  },
  {
    "id": "pgo-39",
    "name": "Solrock",
    "number": "39",
    "artist": "Sekio",
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
    "abilities": [
      {
        "name": "Sun Energy",
        "text": "Once during your turn, you may attach a Psychic Energy card from your discard pile to 1 of your Lunatone.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Spinning Attack",
        "cost": [
          "Fighting",
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
      338
    ],
    "flavorText": "When it rotates itself, it gives off light similar to the sun, thus blinding its foes.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/039/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/039/high.webp"
    }
  },
  {
    "id": "pgo-40",
    "name": "Conkeldurr V",
    "number": "40",
    "artist": "Ayaka Yoshida",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "230",
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
        "name": "Counter",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "If this Pokémon was damaged by an attack during your opponent's last turn, this attack does that much more damage."
      },
      {
        "name": "Dynamic Punch",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "Flip a coin. If heads, this attack does 90 more damage, and your opponent's Active Pokémon is now Confused."
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
      534
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/040/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/040/high.webp"
    }
  },
  {
    "id": "pgo-41",
    "name": "Alolan Rattata",
    "number": "41",
    "artist": "KIYOTAKA OSHIYAMA",
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
    "evolvesTo": [
      "Raticate"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hyper Fang",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
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
      19
    ],
    "flavorText": "Night after night, they sneak into people's homes seeking food. A massive outbreak of them has become an issue of public concern.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/041/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/041/high.webp"
    }
  },
  {
    "id": "pgo-42",
    "name": "Alolan Raticate",
    "number": "42",
    "artist": "Atsuko Nishida",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Alolan Rattata",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Chase Up",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a card and put it into your hand. Then, shuffle your deck."
      },
      {
        "name": "Super Fang",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Put damage counters on your opponent's Active Pokémon until its remaining HP is 10."
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
      20
    ],
    "flavorText": "It commands a nest of Rattata. Different nests don't get along, whipping up severe fights over feeding grounds.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/042/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/042/high.webp"
    }
  },
  {
    "id": "pgo-43",
    "name": "Tyranitar",
    "number": "43",
    "artist": "Nisota Niso",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Pupitar",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Raging Crash",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10×",
        "text": "This attack does 10 damage for each damage counter on all of your Benched Pokémon."
      },
      {
        "name": "Earthquake",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "This attack also does 20 damage to each of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      248
    ],
    "flavorText": "Its body can't be harmed by any sort of attack, so it is very eager to make challenges against enemies.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/043/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/043/high.webp"
    }
  },
  {
    "id": "pgo-44",
    "name": "Steelix",
    "number": "44",
    "artist": "GOSSAN",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "180",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Onix",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Body Slam",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Iron Buster",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "170",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      208
    ],
    "flavorText": "It is said that if an Onix lives for over 100 years, its composition changes to become diamond-like.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/044/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/044/high.webp"
    }
  },
  {
    "id": "pgo-45",
    "name": "Meltan",
    "number": "45",
    "artist": "Sumiyoshi Kizuki",
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
        "name": "Thunder Shock",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
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
      808
    ],
    "flavorText": "It melts particles of iron and other metals found in the subsoil, so it can absorb them into its body of molten steel.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/045/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/045/high.webp"
    }
  },
  {
    "id": "pgo-46",
    "name": "Melmetal",
    "number": "46",
    "artist": "Shigenori Negishi",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "160",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Meltan",
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
        "damage": "60",
        "text": ""
      },
      {
        "name": "Swinging Smash",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Flip 2 coins. This attack does 90 more damage for each heads."
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/046/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/046/high.webp"
    }
  },
  {
    "id": "pgo-47",
    "name": "Melmetal V",
    "number": "47",
    "artist": "sadaji",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Arm Charge",
        "cost": [
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "You may attach a Metal Energy card from your hand to this Pokémon."
      },
      {
        "name": "Mega Punch",
        "cost": [
          "Metal",
          "Metal",
          "Metal"
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
      809
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/047/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/047/high.webp"
    }
  },
  {
    "id": "pgo-48",
    "name": "Melmetal VMAX",
    "number": "48",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "330",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Melmetal V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "G-Max Juggernaut",
        "cost": [
          "Metal",
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "160+",
        "text": "This attack does 60 more damage for each extra Metal Energy attached to this Pokémon (in addition to this attack's cost). You can't add more than 120 damage in this way."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/048/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/048/high.webp"
    }
  },
  {
    "id": "pgo-49",
    "name": "Dragonite V",
    "number": "49",
    "artist": "kawayoo",
    "rarity": "Rare Holo V",
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
        "name": "Hyper Beam",
        "cost": [
          "Water",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Discard an Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Buster Tail",
        "cost": [
          "Water",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
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
      149
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/049/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/049/high.webp"
    }
  },
  {
    "id": "pgo-50",
    "name": "Dragonite VSTAR",
    "number": "50",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Holo VSTAR",
    "supertype": "Pokémon",
    "subtypes": [
      "VSTAR"
    ],
    "hp": "280",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Dragonite V",
    "evolvesTo": [],
    "rules": [
      "VSTAR rule: When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Giga Impact",
        "cost": [
          "Water",
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "250",
        "text": "During your next turn, this Pokémon can't attack."
      },
      {
        "name": "Draconic Star",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 12 cards of your deck and attach any number of Water or Lightning Energy cards you find there to your Pokémon in any way you like. Shuffle the other cards back into your deck. (You can't use more than 1 VSTAR Power in a game.)"
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
      149
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/050/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/050/high.webp"
    }
  },
  {
    "id": "pgo-51",
    "name": "Chansey",
    "number": "51",
    "artist": "ryoma uratsuka",
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
    "evolvesTo": [
      "Blissey"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Delicious Egg",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 30 damage from 1 of your Benched Pokémon."
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
      113
    ],
    "flavorText": "The egg Chansey carries is not only delicious but also packed with nutrition. It's used as a high-class cooking ingredient.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/051/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/051/high.webp"
    }
  },
  {
    "id": "pgo-52",
    "name": "Blissey",
    "number": "52",
    "artist": "Teeziro",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "200",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Chansey",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Enriching Egg",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal all damage from 1 of your Benched Pokémon."
      },
      {
        "name": "Zen Headbutt",
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
      242
    ],
    "flavorText": "Whenever a Blissey finds a weakened Pokémon, it will share its egg and offer its care until the other Pokémon is all better.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/052/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/052/high.webp"
    }
  },
  {
    "id": "pgo-53",
    "name": "Ditto",
    "number": "53",
    "artist": "Misa Tsutsui",
    "rarity": "Rare Holo",
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
        "name": "Sudden Transformation",
        "text": "This Pokémon can use the attacks of any Basic Pokémon in your discard pile, except for Pokémon with a Rule Box (Pokémon V, Pokémon-GX, etc. have Rule Boxes). (You still need the necessary Energy to use each attack.)",
        "type": "Ability"
      }
    ],
    "attacks": [],
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
      132
    ],
    "flavorText": "It can reconstitute its entire cellular structure to change into what it sees, but it returns to normal when it relaxes.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/053/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/053/high.webp"
    }
  },
  {
    "id": "pgo-54",
    "name": "Eevee",
    "number": "54",
    "artist": "N-DESIGN Inc.",
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
        "name": "Whiny Voice",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose a random card from your opponent's hand. Your opponent reveals that card and shuffles it into their deck."
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
      133
    ],
    "flavorText": "It has the ability to alter the composition of its body to suit its surrounding environment.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/054/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/054/high.webp"
    }
  },
  {
    "id": "pgo-55",
    "name": "Snorlax",
    "number": "55",
    "artist": "N-DESIGN Inc.",
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
        "name": "Block",
        "text": "As long as this Pokémon is in the Active Spot, your opponent's Active Pokémon can't retreat.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Collapse",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "150",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      143
    ],
    "flavorText": "It is not satisfied unless it eats over 880 pounds of food every day. When it is done eating, it goes promptly to sleep.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/055/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/055/high.webp"
    }
  },
  {
    "id": "pgo-56",
    "name": "Aipom",
    "number": "56",
    "artist": "Sanosuke Sakuma",
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
      "Ambipom"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bustle",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage from and effects of attacks done to this Pokémon."
      },
      {
        "name": "Slap",
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
      190
    ],
    "flavorText": "It searches for prey from the tops of trees. When it spots its favorite food, Bounsweet, Aipom gets excited and pounces.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/056/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/056/high.webp"
    }
  },
  {
    "id": "pgo-57",
    "name": "Ambipom",
    "number": "57",
    "artist": "Scav",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Aipom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Primate Dexterity",
        "text": "If any damage is done to this Pokémon by attacks, flip a coin. If heads, prevent that damage.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Full Tilt Fling",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "60×",
        "text": "Flip a coin for each Energy attached to this Pokémon. This attack does 60 damage for each heads."
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
      424
    ],
    "flavorText": "It uses its tails for everything. If it wraps both of its tails around you and gives you a squeeze, that's proof it really likes you.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/057/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/057/high.webp"
    }
  },
  {
    "id": "pgo-58",
    "name": "Slaking V",
    "number": "58",
    "artist": "Saki Hayashiro",
    "rarity": "Rare Holo V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "230",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Kinda Lazy",
        "text": "If you have exactly 2, 4, or 6 Prize cards remaining, this Pokémon can't attack.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Heavy Impact",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "260",
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
      289
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/058/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/058/high.webp"
    }
  },
  {
    "id": "pgo-59",
    "name": "Bidoof",
    "number": "59",
    "artist": "Tomokazu Komiya",
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
        "name": "Take Down",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/059/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/059/high.webp"
    }
  },
  {
    "id": "pgo-60",
    "name": "Bibarel",
    "number": "60",
    "artist": "KIYOTAKA OSHIYAMA",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Bidoof",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Reassuring Dam",
        "text": "As long as this Pokémon is on your Bench, cards in your deck can't be discarded by effects of your opponent's attacks, Abilities, Item cards, or Supporter cards.",
        "type": "Ability"
      }
    ],
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/060/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/060/high.webp"
    }
  },
  {
    "id": "pgo-61",
    "name": "Pidove",
    "number": "61",
    "artist": "N-DESIGN Inc.",
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
      "Tranquill"
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
        "text": "During your opponent's next turn, the Defending Pokémon's attacks do 20 less damage (before applying Weakness and Resistance)."
      },
      {
        "name": "Flap",
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
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      519
    ],
    "flavorText": "Where people go, these Pokémon follow. If you're scattering food for them, be careful— several hundred of them can gather at once.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/061/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/061/high.webp"
    }
  },
  {
    "id": "pgo-62",
    "name": "Tranquill",
    "number": "62",
    "artist": "0313",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
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
        "name": "Aerial Ace",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
      },
      {
        "name": "Flap",
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
      520
    ],
    "flavorText": "It can fly moderately quickly. No matter how far it travels, it can always find its way back to its master and its nest.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/062/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/062/high.webp"
    }
  },
  {
    "id": "pgo-63",
    "name": "Unfezant",
    "number": "63",
    "artist": "GIDORA",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Tranquill",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gust",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Hurricane Wing",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70×",
        "text": "Flip 4 coins. This attack does 70 damage for each heads."
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
      521
    ],
    "flavorText": "Unfezant are exceptional fliers. The females are known for their stamina, while the males outclass them in terms of speed.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/063/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/063/high.webp"
    }
  },
  {
    "id": "pgo-64",
    "name": "Blanche",
    "number": "64",
    "artist": "Anesaki Dynamic",
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
      "Draw 2 cards. If you drew any cards in this way, flip a coin. If heads, attach a Water Energy card from your discard pile to 1 of your Benched Pokémon.",
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/064/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/064/high.webp"
    }
  },
  {
    "id": "pgo-65",
    "name": "Candela",
    "number": "65",
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
      "Draw 2 cards. If you drew any cards in this way, flip a coin. If heads, attach a Fire Energy card from your discard pile to 1 of your Benched Pokémon.",
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/065/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/065/high.webp"
    }
  },
  {
    "id": "pgo-66",
    "name": "Egg Incubator",
    "number": "66",
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
      "Flip a coin. If heads, search your deck for a Basic Pokémon, put it onto your Bench, and shuffle your deck. If tails, put this Egg Incubator on the bottom of your deck instead of in the discard pile.",
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/066/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/066/high.webp"
    }
  },
  {
    "id": "pgo-67",
    "name": "Lure Module",
    "number": "67",
    "artist": "ORBITALLINK Inc.",
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
      "Each player reveals the top 3 cards of their deck and puts all Pokémon they find there into their hand. Then, each player shuffles the other cards back into their deck.",
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/067/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/067/high.webp"
    }
  },
  {
    "id": "pgo-68",
    "name": "PokéStop",
    "number": "68",
    "artist": "Studio Bora Inc.",
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
      "Once during each player's turn, that player may discard 3 cards from the top of their deck. If a player discarded any Item cards in this way, they put those Item cards into their hand."
    ],
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/068/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/068/high.webp"
    }
  },
  {
    "id": "pgo-69",
    "name": "Rare Candy",
    "number": "69",
    "artist": "Ayaka Yoshida",
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
      "Choose 1 of your Basic Pokémon in play. If you have a Stage 2 card in your hand that evolves from that Pokémon, put that card onto the Basic Pokémon to evolve it, skipping the Stage 1. You can't use this card during your first turn or on a Basic Pokémon that was put into play this turn.",
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/069/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/069/high.webp"
    }
  },
  {
    "id": "pgo-70",
    "name": "Spark",
    "number": "70",
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
      "Draw 2 cards. If you drew any cards in this way, flip a coin. If heads, attach a Lightning Energy card from your discard pile to 1 of your Benched Pokémon.",
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/070/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/070/high.webp"
    }
  },
  {
    "id": "pgo-71",
    "name": "Alolan Exeggutor V",
    "number": "71",
    "artist": "MUGENUP",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "240",
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
        "name": "Growing Tall",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, search your deck for up to 5 Grass Energy cards and attach them to your Pokémon in any way you like. Then, shuffle your deck."
      },
      {
        "name": "Head Swing",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 30 damage to 1 of your opponent's Pokémon for each Grass Energy attached to this Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/071/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/071/high.webp"
    }
  },
  {
    "id": "pgo-72",
    "name": "Mewtwo V",
    "number": "72",
    "artist": "N-DESIGN Inc.",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
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
        "name": "Super Psy Bolt",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Transfer Break",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/072/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/072/high.webp"
    }
  },
  {
    "id": "pgo-73",
    "name": "Conkeldurr V",
    "number": "73",
    "artist": "Ayaka Yoshida",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "230",
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
        "name": "Counter",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "If this Pokémon was damaged by an attack during your opponent's last turn, this attack does that much more damage."
      },
      {
        "name": "Dynamic Punch",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "Flip a coin. If heads, this attack does 90 more damage, and your opponent's Active Pokémon is now Confused."
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
      534
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/073/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/073/high.webp"
    }
  },
  {
    "id": "pgo-74",
    "name": "Conkeldurr V",
    "number": "74",
    "artist": "N-DESIGN Inc.",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "230",
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
        "name": "Counter",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "If this Pokémon was damaged by an attack during your opponent's last turn, this attack does that much more damage."
      },
      {
        "name": "Dynamic Punch",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "Flip a coin. If heads, this attack does 90 more damage, and your opponent's Active Pokémon is now Confused."
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
      534
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/074/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/074/high.webp"
    }
  },
  {
    "id": "pgo-75",
    "name": "Melmetal V",
    "number": "75",
    "artist": "sadaji",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Arm Charge",
        "cost": [
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "You may attach a Metal Energy card from your hand to this Pokémon."
      },
      {
        "name": "Mega Punch",
        "cost": [
          "Metal",
          "Metal",
          "Metal"
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
      809
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/075/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/075/high.webp"
    }
  },
  {
    "id": "pgo-76",
    "name": "Dragonite V",
    "number": "76",
    "artist": "5ban Graphics",
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
        "name": "Hyper Beam",
        "cost": [
          "Water",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Discard an Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Buster Tail",
        "cost": [
          "Water",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
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
      149
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/076/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/076/high.webp"
    }
  },
  {
    "id": "pgo-77",
    "name": "Slaking V",
    "number": "77",
    "artist": "Saki Hayashiro",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "230",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "V rule: When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Kinda Lazy",
        "text": "If you have exactly 2, 4, or 6 Prize cards remaining, this Pokémon can't attack.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Heavy Impact",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "260",
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
      289
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/077/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/077/high.webp"
    }
  },
  {
    "id": "pgo-78",
    "name": "Professor's Research",
    "number": "78",
    "artist": "Yusuke Kozaki",
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
    "flavorText": "Professor Willow",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "D",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/078/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/078/high.webp"
    }
  },
  {
    "id": "pgo-79",
    "name": "Mewtwo VSTAR",
    "number": "79",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VSTAR"
    ],
    "hp": "280",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Mewtwo V",
    "evolvesTo": [],
    "rules": [
      "VSTAR rule: When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Psy Purge",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90×",
        "text": "Discard up to 3 Psychic Energy from your Pokémon. This attack does 90 damage for each card you discarded in this way."
      },
      {
        "name": "Star Raid",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 120 damage to each of your opponent's Pokémon V. This damage isn't affected by Weakness or Resistance. (You can't use more than 1 VSTAR Power in a game.)"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/079/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/079/high.webp"
    }
  },
  {
    "id": "pgo-80",
    "name": "Melmetal VMAX",
    "number": "80",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "330",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Melmetal V",
    "evolvesTo": [],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "G-Max Juggernaut",
        "cost": [
          "Metal",
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "160+",
        "text": "This attack does 60 more damage for each extra Metal Energy attached to this Pokémon (in addition to this attack's cost). You can't add more than 120 damage in this way."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/080/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/080/high.webp"
    }
  },
  {
    "id": "pgo-81",
    "name": "Dragonite VSTAR",
    "number": "81",
    "artist": "PLANETA Tsuji",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "VSTAR"
    ],
    "hp": "280",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Dragonite V",
    "evolvesTo": [],
    "rules": [
      "VSTAR rule: When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Giga Impact",
        "cost": [
          "Water",
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "250",
        "text": "During your next turn, this Pokémon can't attack."
      },
      {
        "name": "Draconic Star",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 12 cards of your deck and attach any number of Water or Lightning Energy cards you find there to your Pokémon in any way you like. Shuffle the other cards back into your deck. (You can't use more than 1 VSTAR Power in a game.)"
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
      149
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/081/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/081/high.webp"
    }
  },
  {
    "id": "pgo-82",
    "name": "Blanche",
    "number": "82",
    "artist": "Anesaki Dynamic",
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
      "Draw 2 cards. If you drew any cards in this way, flip a coin. If heads, attach a Water Energy card from your discard pile to 1 of your Benched Pokémon.",
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/082/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/082/high.webp"
    }
  },
  {
    "id": "pgo-83",
    "name": "Candela",
    "number": "83",
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
      "Draw 2 cards. If you drew any cards in this way, flip a coin. If heads, attach a Fire Energy card from your discard pile to 1 of your Benched Pokémon.",
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/083/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/083/high.webp"
    }
  },
  {
    "id": "pgo-84",
    "name": "Professor's Research",
    "number": "84",
    "artist": "Yusuke Kozaki",
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
    "flavorText": "Professor Willow",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "D",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/084/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/084/high.webp"
    }
  },
  {
    "id": "pgo-85",
    "name": "Spark",
    "number": "85",
    "artist": "Naoki Saito",
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
      "Draw 2 cards. If you drew any cards in this way, flip a coin. If heads, attach a Lightning Energy card from your discard pile to 1 of your Benched Pokémon.",
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/085/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/085/high.webp"
    }
  },
  {
    "id": "pgo-86",
    "name": "Mewtwo VSTAR",
    "number": "86",
    "artist": "PLANETA Mochizuki",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "VSTAR"
    ],
    "hp": "280",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Mewtwo V",
    "evolvesTo": [],
    "rules": [
      "VSTAR rule: When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Psy Purge",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90×",
        "text": "Discard up to 3 Psychic Energy from your Pokémon. This attack does 90 damage for each card you discarded in this way."
      },
      {
        "name": "Star Raid",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 120 damage to each of your opponent's Pokémon V. This damage isn't affected by Weakness or Resistance. (You can't use more than 1 VSTAR Power in a game.)"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "F",
    "images": {
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/086/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/086/high.webp"
    }
  },
  {
    "id": "pgo-87",
    "name": "Egg Incubator",
    "number": "87",
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
      "Flip a coin. If heads, search your deck for a Basic Pokémon, put it onto your Bench, and shuffle your deck. If tails, put this Egg Incubator on the bottom of your deck instead of in the discard pile.",
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/087/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/087/high.webp"
    }
  },
  {
    "id": "pgo-88",
    "name": "Lure Module",
    "number": "88",
    "artist": "ORBITALLINK Inc.",
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
      "Each player reveals the top 3 cards of their deck and puts all Pokémon they find there into their hand. Then, each player shuffles the other cards back into their deck.",
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
      "small": "https://assets.tcgdex.net/en/swsh/swsh10.5/088/low.webp",
      "large": "https://assets.tcgdex.net/en/swsh/swsh10.5/088/high.webp"
    }
  }
]

export default cardDetails
