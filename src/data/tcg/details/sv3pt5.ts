import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "sv3pt5-1",
    "name": "Bulbasaur",
    "number": "1",
    "artist": "Yuu Nishida",
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
        "name": "Leech Seed",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      1
    ],
    "flavorText": "While it is young, it uses the nutrients that are stored in the seed on its back in order to grow.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/1.png",
      "large": "https://images.pokemontcg.io/sv3pt5/1_hires.png"
    }
  },
  {
    "id": "sv3pt5-2",
    "name": "Ivysaur",
    "number": "2",
    "artist": "Yuu Nishida",
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
        "name": "Leech Seed",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Heal 20 damage from this Pokémon."
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
      2
    ],
    "flavorText": "Exposure to sunlight adds to its strength. Sunlight also makes the bud on its back grow larger.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/2.png",
      "large": "https://images.pokemontcg.io/sv3pt5/2_hires.png"
    }
  },
  {
    "id": "sv3pt5-3",
    "name": "Venusaur ex",
    "number": "3",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Ivysaur",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Tranquil Flower",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may heal 60 damage from 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dangerous Toxwhip",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Your opponent's Active Pokémon is now Confused and Poisoned."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/3.png",
      "large": "https://images.pokemontcg.io/sv3pt5/3_hires.png"
    }
  },
  {
    "id": "sv3pt5-4",
    "name": "Charmander",
    "number": "4",
    "artist": "GIDORA",
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
      "Charmeleon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Blazing Destruction",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard a Stadium in play."
      },
      {
        "name": "Steady Firebreathing",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      4
    ],
    "flavorText": "From the time it is born, a flame burns at the tip of its tail. Its life would end if the flame were to go out.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/4.png",
      "large": "https://images.pokemontcg.io/sv3pt5/4_hires.png"
    }
  },
  {
    "id": "sv3pt5-5",
    "name": "Charmeleon",
    "number": "5",
    "artist": "GIDORA",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
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
        "name": "Combustion",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Fire Blast",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
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
      5
    ],
    "flavorText": "If it becomes agitated during battle, it spouts intense flames, incinerating its surroundings.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/5.png",
      "large": "https://images.pokemontcg.io/sv3pt5/5_hires.png"
    }
  },
  {
    "id": "sv3pt5-6",
    "name": "Charizard ex",
    "number": "6",
    "artist": "PLANETA Mochizuki",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Brave Wing",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "60+",
        "text": "If this Pokémon has any damage counters on it, this attack does 100 more damage."
      },
      {
        "name": "Explosive Vortex",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 4,
        "damage": "330",
        "text": "Discard 3 Energy from this Pokémon."
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/6.png",
      "large": "https://images.pokemontcg.io/sv3pt5/6_hires.png"
    }
  },
  {
    "id": "sv3pt5-7",
    "name": "Squirtle",
    "number": "7",
    "artist": "kantaro",
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
        "name": "Withdraw",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage done to this Pokémon by attacks."
      },
      {
        "name": "Skull Bash",
        "cost": [
          "Water",
          "Water"
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
      7
    ],
    "flavorText": "When it feels threatened, it draws its limbs inside its shell and sprays water from its mouth.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/7.png",
      "large": "https://images.pokemontcg.io/sv3pt5/7_hires.png"
    }
  },
  {
    "id": "sv3pt5-8",
    "name": "Wartortle",
    "number": "8",
    "artist": "kantaro",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
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
        "name": "Free Diving",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put up to 3 Basic Water Energy cards from your discard pile into your hand."
      },
      {
        "name": "Spinning Attack",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      8
    ],
    "flavorText": "It cleverly controls its furry ears and tail to maintain its balance while swimming.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/8.png",
      "large": "https://images.pokemontcg.io/sv3pt5/8_hires.png"
    }
  },
  {
    "id": "sv3pt5-9",
    "name": "Blastoise ex",
    "number": "9",
    "artist": "PLANETA Yamashita",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wartortle",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
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
        "name": "Twin Cannons",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "140×",
        "text": "Discard up to 2 Basic Water Energy cards from your hand. This attack does 140 damage for each card you discarded in this way."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/9.png",
      "large": "https://images.pokemontcg.io/sv3pt5/9_hires.png"
    }
  },
  {
    "id": "sv3pt5-10",
    "name": "Caterpie",
    "number": "10",
    "artist": "Tika Matsuno",
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
        "name": "Leaf Munch",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If your opponent's Active Pokémon is a Grass Pokémon, this attack does 30 more damage."
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/10.png",
      "large": "https://images.pokemontcg.io/sv3pt5/10_hires.png"
    }
  },
  {
    "id": "sv3pt5-11",
    "name": "Metapod",
    "number": "11",
    "artist": "Tika Matsuno",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Caterpie",
    "evolvesTo": [
      "Butterfree"
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
        "damage": "20",
        "text": ""
      },
      {
        "name": "Defensive Posture",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage done to this Pokémon by attacks."
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/11.png",
      "large": "https://images.pokemontcg.io/sv3pt5/11_hires.png"
    }
  },
  {
    "id": "sv3pt5-12",
    "name": "Butterfree",
    "number": "12",
    "artist": "Tika Matsuno",
    "rarity": "Uncommon",
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
        "name": "Whirlwind",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "60",
        "text": "Switch out your opponent's Active Pokémon to the Bench. (Your opponent chooses the new Active Pokémon.)"
      },
      {
        "name": "Bye-Bye Flight",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your opponent's Benched Pokémon. Shuffle that Pokémon and all attached cards into their deck, and then shuffle this Pokémon and all attached cards into your deck. If your opponent has no Benched Pokémon, this attack does nothing."
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/12.png",
      "large": "https://images.pokemontcg.io/sv3pt5/12_hires.png"
    }
  },
  {
    "id": "sv3pt5-13",
    "name": "Weedle",
    "number": "13",
    "artist": "nisimono",
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
      "Kakuna"
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
        "name": "Bug Bite",
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
      13
    ],
    "flavorText": "Its poison stinger is very powerful. Its bright-colored body is intended to warn off its enemies.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/13.png",
      "large": "https://images.pokemontcg.io/sv3pt5/13_hires.png"
    }
  },
  {
    "id": "sv3pt5-14",
    "name": "Kakuna",
    "number": "14",
    "artist": "nisimono",
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
    "evolvesTo": [
      "Beedrill"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Cocoon Cover",
        "text": "Prevent all effects of attacks used by your opponent's Pokémon done to this Pokémon. (Damage is not an effect.)",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Zzzt",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      14
    ],
    "flavorText": "While awaiting evolution, it hides from predators under leaves and in nooks of branches.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/14.png",
      "large": "https://images.pokemontcg.io/sv3pt5/14_hires.png"
    }
  },
  {
    "id": "sv3pt5-15",
    "name": "Beedrill",
    "number": "15",
    "artist": "nisimono",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Kakuna",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Nadir Needle",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If you have no cards in your hand, this attack does 120 more damage, and your opponent's Active Pokémon is now Paralyzed and Poisoned."
      },
      {
        "name": "Pierce",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      15
    ],
    "flavorText": "May appear in a swarm. Flies at violent speeds, all the while stabbing with the toxic stinger on its rear.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/15.png",
      "large": "https://images.pokemontcg.io/sv3pt5/15_hires.png"
    }
  },
  {
    "id": "sv3pt5-16",
    "name": "Pidgey",
    "number": "16",
    "artist": "Oswaldo KATO",
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
      "Pidgeotto"
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
      16
    ],
    "flavorText": "It is docile and prefers to avoid conflict. If disturbed, however, it can ferociously strike back.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/16.png",
      "large": "https://images.pokemontcg.io/sv3pt5/16_hires.png"
    }
  },
  {
    "id": "sv3pt5-17",
    "name": "Pidgeotto",
    "number": "17",
    "artist": "Oswaldo KATO",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Pidgey",
    "evolvesTo": [
      "Pidgeot"
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      17
    ],
    "flavorText": "Very protective of its sprawling territorial area, this Pokémon will fiercely peck at any intruder.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/17.png",
      "large": "https://images.pokemontcg.io/sv3pt5/17_hires.png"
    }
  },
  {
    "id": "sv3pt5-18",
    "name": "Pidgeot",
    "number": "18",
    "artist": "Oswaldo KATO",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Pidgeotto",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Fly",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Flip a coin. If tails, this attack does nothing. If heads, during your opponent's next turn, prevent all damage from and effects of attacks done to this Pokémon."
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
      18
    ],
    "flavorText": "It spreads its gorgeous wings widely to intimidate enemies. It races through the skies at Mach-2 speed.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/18.png",
      "large": "https://images.pokemontcg.io/sv3pt5/18_hires.png"
    }
  },
  {
    "id": "sv3pt5-19",
    "name": "Rattata",
    "number": "19",
    "artist": "sowsow",
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
      "Raticate"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gnaw the Wound",
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
    "flavorText": "This Pokémon is common but hazardous. Its sharp incisors can easily cut right through hard wood.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/19.png",
      "large": "https://images.pokemontcg.io/sv3pt5/19_hires.png"
    }
  },
  {
    "id": "sv3pt5-20",
    "name": "Raticate",
    "number": "20",
    "artist": "sowsow",
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
        "name": "Second Bite",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 30 more damage for each damage counter on your opponent's Active Pokémon."
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
      20
    ],
    "flavorText": "Its whiskers are essential for maintaining its balance. No matter how friendly you are, it will get angry and bite you if you touch its whiskers.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/20.png",
      "large": "https://images.pokemontcg.io/sv3pt5/20_hires.png"
    }
  },
  {
    "id": "sv3pt5-21",
    "name": "Spearow",
    "number": "21",
    "artist": "Gemi",
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
      "Fearow"
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
        "name": "Speed Dive",
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
      21
    ],
    "flavorText": "Due to its short wings, it can't fly long distances. It wanders about restlessly and pecks at bug Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/21.png",
      "large": "https://images.pokemontcg.io/sv3pt5/21_hires.png"
    }
  },
  {
    "id": "sv3pt5-22",
    "name": "Fearow",
    "number": "22",
    "artist": "Gemi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Spearow",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Beak Catch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 cards and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Speed Dive",
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
      22
    ],
    "flavorText": "Carrying food through Fearow's territory is dangerous. It will snatch the food away from you in a flash!",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/22.png",
      "large": "https://images.pokemontcg.io/sv3pt5/22_hires.png"
    }
  },
  {
    "id": "sv3pt5-23",
    "name": "Ekans",
    "number": "23",
    "artist": "Kedamahadaitai Yawarakai",
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
      "Arbok"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Acid Spray",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
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
      23
    ],
    "flavorText": "The eggs of bird Pokémon are its favorite food. It swallows eggs whole, so sometimes an egg gets stuck, and Ekans faints.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/23.png",
      "large": "https://images.pokemontcg.io/sv3pt5/23_hires.png"
    }
  },
  {
    "id": "sv3pt5-24",
    "name": "Arbok ex",
    "number": "24",
    "artist": "Eske Yoshinob",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "270",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Ekans",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Bind Down",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
      },
      {
        "name": "Menacing Fangs",
        "cost": [
          "Darkness",
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Your opponent discards 2 cards from their hand."
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
      24
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/24.png",
      "large": "https://images.pokemontcg.io/sv3pt5/24_hires.png"
    }
  },
  {
    "id": "sv3pt5-25",
    "name": "Pikachu",
    "number": "25",
    "artist": "Naoyo Kimura",
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
        "name": "Charge",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Basic Lightning Energy card and attach it to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Pika Punch",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      25
    ],
    "flavorText": "When it is angered, it immediately discharges the energy stored in the pouches in its cheeks.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/25.png",
      "large": "https://images.pokemontcg.io/sv3pt5/25_hires.png"
    }
  },
  {
    "id": "sv3pt5-26",
    "name": "Raichu",
    "number": "26",
    "artist": "Naoyo Kimura",
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
    "abilities": [
      {
        "name": "Electrical Grounding",
        "text": "When 1 of your Pokémon is Knocked Out by damage from an attack from your opponent's Pokémon, you may move a Lightning Energy from that Pokémon to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Thunder",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
        "text": "This Pokémon also does 50 damage to itself."
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
    "flavorText": "Its tail discharges electricity into the ground, protecting it from getting shocked.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/26.png",
      "large": "https://images.pokemontcg.io/sv3pt5/26_hires.png"
    }
  },
  {
    "id": "sv3pt5-27",
    "name": "Sandshrew",
    "number": "27",
    "artist": "kodama",
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
    "abilities": [
      {
        "name": "Sand Screen",
        "text": "Trainer cards in your opponent's discard pile can't be put into their deck by an effect of your opponent's Item or Supporter cards.",
        "type": "Ability"
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
    "flavorText": "It burrows into the ground to create its nest. If hard stones impede its tunneling, it uses its sharp claws to shatter them and then carries on digging.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/27.png",
      "large": "https://images.pokemontcg.io/sv3pt5/27_hires.png"
    }
  },
  {
    "id": "sv3pt5-28",
    "name": "Sandslash",
    "number": "28",
    "artist": "kodama",
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
        "name": "Rumble",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
      },
      {
        "name": "Spike Rend",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If your opponent's Active Pokémon already has any damage counters on it, this attack does 100 more damage."
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
    "flavorText": "It climbs trees by hooking on with its sharp claws. Sandslash shares the berries it gathers, dropping them down to Sandshrew waiting below the tree.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/28.png",
      "large": "https://images.pokemontcg.io/sv3pt5/28_hires.png"
    }
  },
  {
    "id": "sv3pt5-29",
    "name": "Nidoran ♀",
    "number": "29",
    "artist": "Teeziro",
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
      "Nidorina"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Horn",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      29
    ],
    "flavorText": "It uses its hard incisor teeth to crush and eat berries. The tip of a female Nidoran's horn is a bit more rounded than the tip of a male's horn.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/29.png",
      "large": "https://images.pokemontcg.io/sv3pt5/29_hires.png"
    }
  },
  {
    "id": "sv3pt5-30",
    "name": "Nidorina",
    "number": "30",
    "artist": "Teeziro",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Nidoran ♀",
    "evolvesTo": [
      "Nidoqueen"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fetch Family",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 Pokémon, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Sharp Fang",
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
      30
    ],
    "flavorText": "If the group is threatened, these Pokémon will band together to assault enemies with a chorus of ultrasonic waves.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/30.png",
      "large": "https://images.pokemontcg.io/sv3pt5/30_hires.png"
    }
  },
  {
    "id": "sv3pt5-31",
    "name": "Nidoqueen",
    "number": "31",
    "artist": "Teeziro",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Nidorina",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Queen Press",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90",
        "text": "During your opponent's next turn, prevent all damage done to this Pokémon by attacks from Basic Pokémon."
      },
      {
        "name": "Lunge Out",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
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
      31
    ],
    "flavorText": "It pacifies offspring by placing them in the gaps between the spines on its back. The spines will never secrete poison while young are present.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/31.png",
      "large": "https://images.pokemontcg.io/sv3pt5/31_hires.png"
    }
  },
  {
    "id": "sv3pt5-32",
    "name": "Nidoran ♂",
    "number": "32",
    "artist": "Shiburingaru",
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
      "Nidorino"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Horn Attack",
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
      32
    ],
    "flavorText": "Small but brave, this Pokémon will hold its ground and even risk its life in battle to protect the female it's friendly with.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/32.png",
      "large": "https://images.pokemontcg.io/sv3pt5/32_hires.png"
    }
  },
  {
    "id": "sv3pt5-33",
    "name": "Nidorino",
    "number": "33",
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
    "evolvesFrom": "Nidoran ♂",
    "evolvesTo": [
      "Nidoking"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sharp Fang",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Superpowered Horns",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      33
    ],
    "flavorText": "It's nervous and quick to act aggressively. The potency of its poison increases along with the level of adrenaline present in its body.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/33.png",
      "large": "https://images.pokemontcg.io/sv3pt5/33_hires.png"
    }
  },
  {
    "id": "sv3pt5-34",
    "name": "Nidoking",
    "number": "34",
    "artist": "Shiburingaru",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Nidorino",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Enthusiastic King",
        "text": "If you have Nidoqueen in play, ignore all Energy in the costs of attacks used by this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Venomous Impact",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "190",
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
      34
    ],
    "flavorText": "Nidoking prides itself on its strength. It's forceful and spirited in battle, making use of its thick tail and diamond-crushing horn.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/34.png",
      "large": "https://images.pokemontcg.io/sv3pt5/34_hires.png"
    }
  },
  {
    "id": "sv3pt5-35",
    "name": "Clefairy",
    "number": "35",
    "artist": "ryoma uratsuka",
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
        "name": "Moon-Viewing Invitation",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 Clefairy and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Smack",
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
    "flavorText": "Its adorable behavior and cry make it highly popular. However, this cute Pokémon is rarely found.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/35.png",
      "large": "https://images.pokemontcg.io/sv3pt5/35_hires.png"
    }
  },
  {
    "id": "sv3pt5-36",
    "name": "Clefable",
    "number": "36",
    "artist": "ryoma uratsuka",
    "rarity": "Uncommon",
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
        "name": "Follow Me",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch in 1 of your opponent's Benched Pokémon to the Active Spot."
      },
      {
        "name": "More Moon",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "If your opponent's Pokémon is Knocked Out by damage from this attack, take 1 more Prize card."
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
      36
    ],
    "flavorText": "Their ears are sensitive enough to hear a pin drop from over a mile away, so they're usually found in quiet places.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/36.png",
      "large": "https://images.pokemontcg.io/sv3pt5/36_hires.png"
    }
  },
  {
    "id": "sv3pt5-37",
    "name": "Vulpix",
    "number": "37",
    "artist": "kawayoo",
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
        "name": "Super Singe",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Burned."
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/37.png",
      "large": "https://images.pokemontcg.io/sv3pt5/37_hires.png"
    }
  },
  {
    "id": "sv3pt5-38",
    "name": "Ninetales ex",
    "number": "38",
    "artist": "kawayoo",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "260",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Vulpix",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Heat Wave",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Burned."
      },
      {
        "name": "Mirrored Flames",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "80+",
        "text": "If you have the same number of cards in your hand as your opponent, this attack does 140 more damage."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/38.png",
      "large": "https://images.pokemontcg.io/sv3pt5/38_hires.png"
    }
  },
  {
    "id": "sv3pt5-39",
    "name": "Jigglypuff",
    "number": "39",
    "artist": "saino misaki",
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
      "Wigglytuff"
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
        "name": "Stompy Stomp",
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
      39
    ],
    "flavorText": "When its huge eyes waver, it sings a mysteriously soothing melody that lulls its enemies to sleep.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/39.png",
      "large": "https://images.pokemontcg.io/sv3pt5/39_hires.png"
    }
  },
  {
    "id": "sv3pt5-40",
    "name": "Wigglytuff ex",
    "number": "40",
    "artist": "Saki Hayashiro",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "250",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Jigglypuff",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Expanding Body",
        "text": "If this Pokémon has any Special Energy attached, it gets +100 HP.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Friend Tackle",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "If you played a Supporter card from your hand during this turn, this attack does 90 more damage."
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
      40
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/40.png",
      "large": "https://images.pokemontcg.io/sv3pt5/40_hires.png"
    }
  },
  {
    "id": "sv3pt5-41",
    "name": "Zubat",
    "number": "41",
    "artist": "Scav",
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
      "Golbat"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Revealing Echo",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may have your opponent reveal their hand.",
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
      41
    ],
    "flavorText": "Zubat live in caves, down where the sun's light won't reach. In the morning, they gather together to keep each other warm as they sleep.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/41.png",
      "large": "https://images.pokemontcg.io/sv3pt5/41_hires.png"
    }
  },
  {
    "id": "sv3pt5-42",
    "name": "Golbat",
    "number": "42",
    "artist": "Scav",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Zubat",
    "evolvesTo": [
      "Crobat"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Skill Dive",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 40 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": "Its feet are tiny, but this Pokémon walks skillfully. It sneaks up on sleeping prey before sinking in its fangs and slurping up blood.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/42.png",
      "large": "https://images.pokemontcg.io/sv3pt5/42_hires.png"
    }
  },
  {
    "id": "sv3pt5-43",
    "name": "Oddish",
    "number": "43",
    "artist": "Sekio",
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
        "name": "Razor Leaf",
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
      43
    ],
    "flavorText": "During the day, it stays in the cold underground to avoid the sun. It grows by bathing in moonlight.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/43.png",
      "large": "https://images.pokemontcg.io/sv3pt5/43_hires.png"
    }
  },
  {
    "id": "sv3pt5-44",
    "name": "Gloom",
    "number": "44",
    "artist": "Sekio",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
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
        "name": "Semi-Blooming Energy",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may look at the top 3 cards of your deck and attach any number of Basic Energy cards you find there to your Pokémon in any way you like. Shuffle the other cards back into your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Drool",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      44
    ],
    "flavorText": "What appears to be drool is actually sweet honey. It is very sticky and clings stubbornly if touched.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/44.png",
      "large": "https://images.pokemontcg.io/sv3pt5/44_hires.png"
    }
  },
  {
    "id": "sv3pt5-45",
    "name": "Vileplume",
    "number": "45",
    "artist": "Sekio",
    "rarity": "Rare",
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
        "name": "Fully Blooming Energy",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may look at the top 8 cards of your deck and attach any number of Basic Energy cards you find there to your Pokémon in any way you like. Shuffle the other cards back into your deck.",
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
      45
    ],
    "flavorText": "The larger its petals, the more toxic pollen it contains. Its big head is heavy and hard to hold up.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/45.png",
      "large": "https://images.pokemontcg.io/sv3pt5/45_hires.png"
    }
  },
  {
    "id": "sv3pt5-46",
    "name": "Paras",
    "number": "46",
    "artist": "Yoriyuki Ikegami",
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
      "Parasect"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stampede",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Spore Ball",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      46
    ],
    "flavorText": "The mushrooms, known as tochukaso, are controlling the bug. Even if the bug bugs the mushrooms, they tell it to bug off.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/46.png",
      "large": "https://images.pokemontcg.io/sv3pt5/46_hires.png"
    }
  },
  {
    "id": "sv3pt5-47",
    "name": "Parasect",
    "number": "47",
    "artist": "Yoriyuki Ikegami",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Paras",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spread Filaments",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip 2 coins. Search your deck for a number of Grass Pokémon up to the number of heads and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Claw Slash",
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
      47
    ],
    "flavorText": "The bug is mostly dead, with the mushroom on its back having become the main body. If the mushroom comes off, the bug stops moving.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/47.png",
      "large": "https://images.pokemontcg.io/sv3pt5/47_hires.png"
    }
  },
  {
    "id": "sv3pt5-48",
    "name": "Venonat",
    "number": "48",
    "artist": "Kagemaru Himeno",
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
      "Venomoth"
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
        "name": "Beam",
        "cost": [
          "Grass",
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
      48
    ],
    "flavorText": "Poison oozes from all over its body. It catches small bug Pokémon at night that are attracted by light.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/48.png",
      "large": "https://images.pokemontcg.io/sv3pt5/48_hires.png"
    }
  },
  {
    "id": "sv3pt5-49",
    "name": "Venomoth",
    "number": "49",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
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
        "name": "Perplexing Powder",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Confused. During your opponent's next turn, they can't play any Item cards from their hand."
      },
      {
        "name": "Speed Wing",
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
      49
    ],
    "flavorText": "The wings are covered with dustlike scales. Every time it flaps its wings, it looses highly toxic dust.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/49.png",
      "large": "https://images.pokemontcg.io/sv3pt5/49_hires.png"
    }
  },
  {
    "id": "sv3pt5-50",
    "name": "Diglett",
    "number": "50",
    "artist": "Miki Tanaka",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Headbutt Bounce",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Mud-Slap",
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
    "flavorText": "It lives about one yard underground, where it feeds on plant roots. It sometimes appears aboveground.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/50.png",
      "large": "https://images.pokemontcg.io/sv3pt5/50_hires.png"
    }
  },
  {
    "id": "sv3pt5-51",
    "name": "Dugtrio",
    "number": "51",
    "artist": "Miki Tanaka",
    "rarity": "Uncommon",
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
        "name": "Headbutt Bounce",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Mud Bomb",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
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
      51
    ],
    "flavorText": "Its three heads bob separately up and down to loosen the soil nearby, making it easier for it to burrow.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/51.png",
      "large": "https://images.pokemontcg.io/sv3pt5/51_hires.png"
    }
  },
  {
    "id": "sv3pt5-52",
    "name": "Meowth",
    "number": "52",
    "artist": "Naoki Saito",
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
        "name": "Come Here Right Meow",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, switch in 1 of your opponent's Benched Pokémon to the Active Spot."
      },
      {
        "name": "Dig Claws",
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
      52
    ],
    "flavorText": "All it does is sleep during the daytime. At night, it patrols its territory with its eyes aglow.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/52.png",
      "large": "https://images.pokemontcg.io/sv3pt5/52_hires.png"
    }
  },
  {
    "id": "sv3pt5-53",
    "name": "Persian",
    "number": "53",
    "artist": "Naoki Saito",
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
    "abilities": [
      {
        "name": "Rocket Call",
        "text": "Once during your turn, you may search your deck for a Giovanni's Charisma card, reveal it, and put it into your hand. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Slash",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      53
    ],
    "flavorText": "Although its fur has many admirers, it is tough to raise as a pet because of its fickle meanness.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/53.png",
      "large": "https://images.pokemontcg.io/sv3pt5/53_hires.png"
    }
  },
  {
    "id": "sv3pt5-54",
    "name": "Psyduck",
    "number": "54",
    "artist": "Taira Akitsu",
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
        "name": "Overthink",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, whenever they flip a coin, treat it as tails."
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
      54
    ],
    "flavorText": "It is constantly wracked by a headache. When the headache turns intense, it begins using mysterious powers.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/54.png",
      "large": "https://images.pokemontcg.io/sv3pt5/54_hires.png"
    }
  },
  {
    "id": "sv3pt5-55",
    "name": "Golduck",
    "number": "55",
    "artist": "Taira Akitsu",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Psyduck",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Aquatic Rescue",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put up to 4 Pokémon from your discard pile into your hand."
      },
      {
        "name": "Super Splash",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      55
    ],
    "flavorText": "When it swims at full speed using its long, webbed limbs, its forehead somehow begins to glow.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/55.png",
      "large": "https://images.pokemontcg.io/sv3pt5/55_hires.png"
    }
  },
  {
    "id": "sv3pt5-56",
    "name": "Mankey",
    "number": "56",
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
      "Primeape"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Thrash",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "Flip a coin. If tails, this Pokémon also does 20 damage to itself. If heads, this attack does 20 more damage."
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
    "flavorText": "It lives in groups in the treetops. If it loses sight of its group, it becomes infuriated by its loneliness.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/56.png",
      "large": "https://images.pokemontcg.io/sv3pt5/56_hires.png"
    }
  },
  {
    "id": "sv3pt5-57",
    "name": "Primeape",
    "number": "57",
    "artist": "Mina Nakai",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Mankey",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rant and Rave",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "This Pokémon is now Confused."
      },
      {
        "name": "Raging Smash",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "If this Pokémon isn't Confused, this attack does nothing."
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
      57
    ],
    "flavorText": "It becomes wildly furious if it even senses someone looking at it. It chases anyone that meets its glare.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/57.png",
      "large": "https://images.pokemontcg.io/sv3pt5/57_hires.png"
    }
  },
  {
    "id": "sv3pt5-58",
    "name": "Growlithe",
    "number": "58",
    "artist": "Atsushi Furusawa",
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
        "name": "Vaporize",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Discard a Water Energy from your opponent's Active Pokémon."
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
    "flavorText": "It has a brave and trustworthy nature. It fearlessly stands up to bigger and stronger foes.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/58.png",
      "large": "https://images.pokemontcg.io/sv3pt5/58_hires.png"
    }
  },
  {
    "id": "sv3pt5-59",
    "name": "Arcanine",
    "number": "59",
    "artist": "Atsushi Furusawa",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "150",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Growlithe",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Torrid Torrent",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Attach up to 2 Basic Fire Energy cards from your discard pile to this Pokémon."
      },
      {
        "name": "Dynamite Fang",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "240",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      59
    ],
    "flavorText": "An ancient picture scroll shows that people were captivated by its movement as it ran through prairies.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/59.png",
      "large": "https://images.pokemontcg.io/sv3pt5/59_hires.png"
    }
  },
  {
    "id": "sv3pt5-60",
    "name": "Poliwag",
    "number": "60",
    "artist": "Kurata So",
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
      60
    ],
    "flavorText": "In rivers with fast-flowing water, this Pokémon will cling to a rock by using its thick lips, which act like a suction cup.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/60.png",
      "large": "https://images.pokemontcg.io/sv3pt5/60_hires.png"
    }
  },
  {
    "id": "sv3pt5-61",
    "name": "Poliwhirl",
    "number": "61",
    "artist": "Kurata So",
    "rarity": "Common",
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
        "name": "Wave Splash",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Frog Hop",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 60 more damage."
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
      61
    ],
    "flavorText": "This Pokémon's sweat is a slimy mucus. When captured, Poliwhirl can slither from its enemies' grasp and escape.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/61.png",
      "large": "https://images.pokemontcg.io/sv3pt5/61_hires.png"
    }
  },
  {
    "id": "sv3pt5-62",
    "name": "Poliwrath",
    "number": "62",
    "artist": "Kurata So",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Poliwhirl",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bubble Beam",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Heroic Punch",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100+",
        "text": "Flip a coin. If heads, this attack does 150 more damage."
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
      62
    ],
    "flavorText": "Poliwrath is skilled at both swimming and martial arts. It uses its well-trained arms to dish out powerful punches.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/62.png",
      "large": "https://images.pokemontcg.io/sv3pt5/62_hires.png"
    }
  },
  {
    "id": "sv3pt5-63",
    "name": "Abra",
    "number": "63",
    "artist": "Mitsuhiro Arita",
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
      "Kadabra"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psyshot",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      63
    ],
    "flavorText": "Abra can teleport in its sleep. Apparently the more deeply Abra sleeps, the farther its teleportations go.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/63.png",
      "large": "https://images.pokemontcg.io/sv3pt5/63_hires.png"
    }
  },
  {
    "id": "sv3pt5-64",
    "name": "Kadabra",
    "number": "64",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Abra",
    "evolvesTo": [
      "Alakazam"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Teleportation Attack",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
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
      64
    ],
    "flavorText": "This Pokémon's telekinesis is immensely powerful. To prepare for evolution, Kadabra stores up psychic energy in the star on its forehead.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/64.png",
      "large": "https://images.pokemontcg.io/sv3pt5/64_hires.png"
    }
  },
  {
    "id": "sv3pt5-65",
    "name": "Alakazam ex",
    "number": "65",
    "artist": "Mitsuhiro Arita",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "310",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Kadabra",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Mind Jack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90+",
        "text": "This attack does 30 more damage for each of your opponent's Benched Pokémon."
      },
      {
        "name": "Dimensional Hand",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "This attack can be used even if this Pokémon is on the Bench."
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
      65
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/65.png",
      "large": "https://images.pokemontcg.io/sv3pt5/65_hires.png"
    }
  },
  {
    "id": "sv3pt5-66",
    "name": "Machop",
    "number": "66",
    "artist": "Ryuta Fuse",
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
      "Machoke"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mountain Mashing",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard the top card of your opponent's deck."
      },
      {
        "name": "Punch",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      66
    ],
    "flavorText": "Always brimming with power, it passes time by lifting boulders. Doing so makes it even stronger.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/66.png",
      "large": "https://images.pokemontcg.io/sv3pt5/66_hires.png"
    }
  },
  {
    "id": "sv3pt5-67",
    "name": "Machoke",
    "number": "67",
    "artist": "Ryuta Fuse",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Machop",
    "evolvesTo": [
      "Machamp"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mountain Ramming",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Discard the top card of your opponent's deck."
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
      67
    ],
    "flavorText": "Its formidable body never gets tired. It helps people by doing work such as the moving of heavy goods.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/67.png",
      "large": "https://images.pokemontcg.io/sv3pt5/67_hires.png"
    }
  },
  {
    "id": "sv3pt5-68",
    "name": "Machamp",
    "number": "68",
    "artist": "Ryuta Fuse",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Machoke",
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
        "name": "Mountain Chopping",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "100",
        "text": "Discard the top 2 cards of your opponent's deck."
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
      68
    ],
    "flavorText": "With four arms that react more quickly than it can think, it can execute many punches at once.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/68.png",
      "large": "https://images.pokemontcg.io/sv3pt5/68_hires.png"
    }
  },
  {
    "id": "sv3pt5-69",
    "name": "Bellsprout",
    "number": "69",
    "artist": "Jerky",
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
      "Weepinbell"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Cut",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Bind Down",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      69
    ],
    "flavorText": "Its bud looks like a human face. Because of the bud, it is rumored to be a type of legendary mandrake plant.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/69.png",
      "large": "https://images.pokemontcg.io/sv3pt5/69_hires.png"
    }
  },
  {
    "id": "sv3pt5-70",
    "name": "Weepinbell",
    "number": "70",
    "artist": "Jerky",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
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
        "name": "Cut",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Spray Fluid",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      70
    ],
    "flavorText": "It spits out Poison Powder to immobilize the enemy and then finishes it with a spray of Acid.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/70.png",
      "large": "https://images.pokemontcg.io/sv3pt5/70_hires.png"
    }
  },
  {
    "id": "sv3pt5-71",
    "name": "Victreebel",
    "number": "71",
    "artist": "Jerky",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Weepinbell",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spit Up",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Slow-Acting Acid",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "At the end of your opponent's next turn, put 12 damage counters on the Defending Pokémon."
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
      71
    ],
    "flavorText": "Once ingested into this Pokémon's body, even the hardest object will melt into nothing.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/71.png",
      "large": "https://images.pokemontcg.io/sv3pt5/71_hires.png"
    }
  },
  {
    "id": "sv3pt5-72",
    "name": "Tentacool",
    "number": "72",
    "artist": "miki kudo",
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
        "name": "Tingle",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Watering",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      72
    ],
    "flavorText": "This Pokémon is mostly made of water. A Tentacool out in the ocean is very hard to spot, because its body blends in with the sea.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/72.png",
      "large": "https://images.pokemontcg.io/sv3pt5/72_hires.png"
    }
  },
  {
    "id": "sv3pt5-73",
    "name": "Tentacruel",
    "number": "73",
    "artist": "miki kudo",
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
        "name": "Poisonous Whip",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Poisoned."
      },
      {
        "name": "Tentacular Panic",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90×",
        "text": "Flip a coin until you get tails. This attack does 90 damage for each heads. If the first flip is tails, your opponent's Active Pokémon is now Confused."
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
    "flavorText": "Its 80 tentacles can stretch and shrink freely. Tentacruel ensnares prey in a net of spread-out tentacles, delivering venomous stings to its catch.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/73.png",
      "large": "https://images.pokemontcg.io/sv3pt5/73_hires.png"
    }
  },
  {
    "id": "sv3pt5-74",
    "name": "Geodude",
    "number": "74",
    "artist": "Uta",
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
        "name": "Stiffen",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
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
    "flavorText": "It uses both hands to climb precipitous cliffs. People who see it in action have been known to take up bouldering.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/74.png",
      "large": "https://images.pokemontcg.io/sv3pt5/74_hires.png"
    }
  },
  {
    "id": "sv3pt5-75",
    "name": "Graveler",
    "number": "75",
    "artist": "Uta",
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
        "name": "Rock Cannon",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "40×",
        "text": "Flip a coin until you get tails. This attack does 40 damage for each heads."
      },
      {
        "name": "Heavy Impact",
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      75
    ],
    "flavorText": "It travels by rolling down cliffs. If it falls into a river, it will explode with its last gasp.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/75.png",
      "large": "https://images.pokemontcg.io/sv3pt5/75_hires.png"
    }
  },
  {
    "id": "sv3pt5-76",
    "name": "Golem ex",
    "number": "76",
    "artist": "Uta",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Graveler",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Dynamic Roll",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "During your next turn, attacks used by this Pokémon do 120 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance)."
      },
      {
        "name": "Rock Blaster",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
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
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      76
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/76.png",
      "large": "https://images.pokemontcg.io/sv3pt5/76_hires.png"
    }
  },
  {
    "id": "sv3pt5-77",
    "name": "Ponyta",
    "number": "77",
    "artist": "Nurikabe",
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
      "Rapidash"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Collect",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card."
      },
      {
        "name": "Flop",
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
      77
    ],
    "flavorText": "If you've been accepted by Ponyta, its burning mane is mysteriously no longer hot to the touch.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/77.png",
      "large": "https://images.pokemontcg.io/sv3pt5/77_hires.png"
    }
  },
  {
    "id": "sv3pt5-78",
    "name": "Rapidash",
    "number": "78",
    "artist": "Nurikabe",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Ponyta",
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
      },
      {
        "name": "Mach Turn",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
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
      78
    ],
    "flavorText": "The fastest runner becomes the leader, and it decides the herd's pace and direction of travel.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/78.png",
      "large": "https://images.pokemontcg.io/sv3pt5/78_hires.png"
    }
  },
  {
    "id": "sv3pt5-79",
    "name": "Slowpoke",
    "number": "79",
    "artist": "OKACHEKE",
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
      "Slowbro",
      "Slowking"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sea Bathing",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 30 damage from this Pokémon, and it recovers from all Special Conditions."
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
      79
    ],
    "flavorText": "It is incredibly slow and dopey. It takes five seconds for it to feel pain when under attack.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/79.png",
      "large": "https://images.pokemontcg.io/sv3pt5/79_hires.png"
    }
  },
  {
    "id": "sv3pt5-80",
    "name": "Slowbro",
    "number": "80",
    "artist": "OKACHEKE",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Slowpoke",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Big Yawn",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Both Active Pokémon are now Asleep."
      },
      {
        "name": "Laid-Back Tackle",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "If this Pokémon evolved during this turn, this attack does nothing."
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
      80
    ],
    "flavorText": "When a Slowpoke went hunting in the sea, its tail was bitten by a Shellder. That made it evolve into Slowbro.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/80.png",
      "large": "https://images.pokemontcg.io/sv3pt5/80_hires.png"
    }
  },
  {
    "id": "sv3pt5-81",
    "name": "Magnemite",
    "number": "81",
    "artist": "Yuka Morii",
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
      "Magneton"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tiny Charge",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Big Explosion",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "This Pokémon also does 60 damage to itself."
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
      81
    ],
    "flavorText": "The electromagnetic waves emitted by the units at the sides of its head expel antigravity, which allows it to float.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/81.png",
      "large": "https://images.pokemontcg.io/sv3pt5/81_hires.png"
    }
  },
  {
    "id": "sv3pt5-82",
    "name": "Magneton",
    "number": "82",
    "artist": "Yuka Morii",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Magnemite",
    "evolvesTo": [
      "Magnezone"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Junk Magnet",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put up to 2 Item cards from your discard pile into your hand."
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      82
    ],
    "flavorText": "Three Magnemite are linked by a strong magnetic force. Earaches will occur if you get too close.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/82.png",
      "large": "https://images.pokemontcg.io/sv3pt5/82_hires.png"
    }
  },
  {
    "id": "sv3pt5-83",
    "name": "Farfetch'd",
    "number": "83",
    "artist": "KG-2000",
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
      "Sirfetch'd"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Package Deal",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw 2 cards."
      },
      {
        "name": "Leek Clobber",
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
    "flavorText": "They use a plant stalk as a weapon, but not all of them use it in the same way. Several distinct styles of stalk fighting have been observed.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/83.png",
      "large": "https://images.pokemontcg.io/sv3pt5/83_hires.png"
    }
  },
  {
    "id": "sv3pt5-84",
    "name": "Doduo",
    "number": "84",
    "artist": "Anesaki Dynamic",
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
        "name": "Reckless Charge",
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
      84
    ],
    "flavorText": "The brains in its two heads appear to communicate emotions to each other with a telepathic power.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/84.png",
      "large": "https://images.pokemontcg.io/sv3pt5/84_hires.png"
    }
  },
  {
    "id": "sv3pt5-85",
    "name": "Dodrio",
    "number": "85",
    "artist": "Anesaki Dynamic",
    "rarity": "Rare",
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
    "abilities": [
      {
        "name": "Zooming Draw",
        "text": "Once during your turn, you may put 1 damage counter on this Pokémon. If you do, draw a card.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Ballistic Beak",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "This attack does 30 more damage for each damage counter on this Pokémon."
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
    "flavorText": "An odd species that is rarely found. The three heads respectively represent joy, sadness, and anger.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/85.png",
      "large": "https://images.pokemontcg.io/sv3pt5/85_hires.png"
    }
  },
  {
    "id": "sv3pt5-86",
    "name": "Seel",
    "number": "86",
    "artist": "aoki",
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
      86
    ],
    "flavorText": "Thanks to its thick fat, cold seas don't bother it at all, but it gets tired pretty easily in warm waters.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/86.png",
      "large": "https://images.pokemontcg.io/sv3pt5/86_hires.png"
    }
  },
  {
    "id": "sv3pt5-87",
    "name": "Dewgong",
    "number": "87",
    "artist": "aoki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Seel",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dual Splash",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 50 damage to 2 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Aurora Beam",
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
      87
    ],
    "flavorText": "It sunbathes on the beach after meals. The rise in its body temperature helps its digestion.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/87.png",
      "large": "https://images.pokemontcg.io/sv3pt5/87_hires.png"
    }
  },
  {
    "id": "sv3pt5-88",
    "name": "Grimer",
    "number": "88",
    "artist": "Nisota Niso",
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
        "name": "Gummy Press",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "During your opponent's next turn, the Defending Pokémon's Retreat Cost is Colorless more."
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
      88
    ],
    "flavorText": "Born from sludge, these Pokémon now gather in polluted places and increase the bacteria in their bodies.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/88.png",
      "large": "https://images.pokemontcg.io/sv3pt5/88_hires.png"
    }
  },
  {
    "id": "sv3pt5-89",
    "name": "Muk",
    "number": "89",
    "artist": "Nisota Niso",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "150",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Grimer",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sticky Jail",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, attacks used by the Defending Pokémon cost Colorless more, and its Retreat Cost is Colorless more."
      },
      {
        "name": "Sludge Bomb",
        "cost": [
          "Darkness",
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
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
      89
    ],
    "flavorText": "It's thickly covered with a filthy, vile sludge. It is so toxic, even its footprints contain poison.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/89.png",
      "large": "https://images.pokemontcg.io/sv3pt5/89_hires.png"
    }
  },
  {
    "id": "sv3pt5-90",
    "name": "Shellder",
    "number": "90",
    "artist": "Nelnal",
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
      "Cloyster"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shell Press",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
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
    "flavorText": "It is encased in a shell that is harder than diamond. Inside, however, it is surprisingly tender.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/90.png",
      "large": "https://images.pokemontcg.io/sv3pt5/90_hires.png"
    }
  },
  {
    "id": "sv3pt5-91",
    "name": "Cloyster",
    "number": "91",
    "artist": "Nelnal",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Shellder",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Protect Charge",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "80",
        "text": "During your opponent's next turn, this Pokémon takes 80 less damage from attacks (after applying Weakness and Resistance)."
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
      91
    ],
    "flavorText": "Cloyster that live in seas with harsh tidal currents grow large, sharp spikes on their shells.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/91.png",
      "large": "https://images.pokemontcg.io/sv3pt5/91_hires.png"
    }
  },
  {
    "id": "sv3pt5-92",
    "name": "Gastly",
    "number": "92",
    "artist": "Tomokazu Komiya",
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
      "Haunter"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Suffocating Gas",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      92
    ],
    "flavorText": "It wraps its opponent in its gas-like body, slowly weakening its prey by poisoning it through the skin.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/92.png",
      "large": "https://images.pokemontcg.io/sv3pt5/92_hires.png"
    }
  },
  {
    "id": "sv3pt5-93",
    "name": "Haunter",
    "number": "93",
    "artist": "Tomokazu Komiya",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Gastly",
    "evolvesTo": [
      "Gengar"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Spirit Return",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may put a Supporter card from your opponent's discard pile into their hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Mumble",
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
      93
    ],
    "flavorText": "It likes to lurk in the dark and tap shoulders with a gaseous hand. Its touch causes endless shuddering.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/93.png",
      "large": "https://images.pokemontcg.io/sv3pt5/93_hires.png"
    }
  },
  {
    "id": "sv3pt5-94",
    "name": "Gengar",
    "number": "94",
    "artist": "Tomokazu Komiya",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Poltergeist",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "Your opponent reveals their hand. This attack does 50 damage for each Trainer card you find there."
      },
      {
        "name": "Hollow Dive",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "110",
        "text": "Put 3 damage counters on your opponent's Benched Pokémon in any way you like."
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
      94
    ],
    "flavorText": "To steal the life of its target, it slips into the prey's shadow and silently waits for an opportunity.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/94.png",
      "large": "https://images.pokemontcg.io/sv3pt5/94_hires.png"
    }
  },
  {
    "id": "sv3pt5-95",
    "name": "Onix",
    "number": "95",
    "artist": "Shin Nagasawa",
    "rarity": "Uncommon",
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
        "name": "Thumpalanche",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "80×",
        "text": "Discard the top 5 cards of your deck. This attack does 80 damage for each Pokémon with a Retreat Cost of exactly 4 that you discarded in this way."
      },
      {
        "name": "Heavy Impact",
        "cost": [
          "Fighting",
          "Fighting",
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/95.png",
      "large": "https://images.pokemontcg.io/sv3pt5/95_hires.png"
    }
  },
  {
    "id": "sv3pt5-96",
    "name": "Drowzee",
    "number": "96",
    "artist": "Mousho",
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
      "Hypno"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Zen Headbutt",
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
    "flavorText": "It remembers every dream it eats. It rarely eats the dreams of adults because children's are much tastier.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/96.png",
      "large": "https://images.pokemontcg.io/sv3pt5/96_hires.png"
    }
  },
  {
    "id": "sv3pt5-97",
    "name": "Hypno",
    "number": "97",
    "artist": "Mousho",
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
    "abilities": [
      {
        "name": "Here for Hypnosis",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may make your opponent's Active Pokémon Asleep.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Super Psy Bolt",
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
      97
    ],
    "flavorText": "When it locks eyes with an enemy, it will use a mix of psi moves, such as Hypnosis and Confusion.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/97.png",
      "large": "https://images.pokemontcg.io/sv3pt5/97_hires.png"
    }
  },
  {
    "id": "sv3pt5-98",
    "name": "Krabby",
    "number": "98",
    "artist": "Yukiko Baba",
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
        "name": "Salt Water",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, search your deck for up to 2 Basic Water Energy cards and attach them to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Crabhammer",
        "cost": [
          "Water",
          "Water",
          "Water"
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
      98
    ],
    "flavorText": "If it senses danger approaching, it cloaks itself with bubbles from its mouth so it will look bigger.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/98.png",
      "large": "https://images.pokemontcg.io/sv3pt5/98_hires.png"
    }
  },
  {
    "id": "sv3pt5-99",
    "name": "Kingler",
    "number": "99",
    "artist": "Yukiko Baba",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Krabby",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hammer Arm",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Discard the top card of your opponent's deck."
      },
      {
        "name": "Guillotine",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 4,
        "damage": "220",
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
      99
    ],
    "flavorText": "Its oversized claw is very powerful, but when it's not in battle, the claw just gets in the way.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/99.png",
      "large": "https://images.pokemontcg.io/sv3pt5/99_hires.png"
    }
  },
  {
    "id": "sv3pt5-100",
    "name": "Voltorb",
    "number": "100",
    "artist": "nagimiso",
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
      "Electrode"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tumbling Attack",
        "cost": [
          "Lightning"
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      100
    ],
    "flavorText": "It rolls to move. If the ground is uneven, a sudden jolt from hitting a bump can cause it to explode.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/100.png",
      "large": "https://images.pokemontcg.io/sv3pt5/100_hires.png"
    }
  },
  {
    "id": "sv3pt5-101",
    "name": "Electrode",
    "number": "101",
    "artist": "nagimiso",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
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
        "name": "Bang Boom Chain",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "Before doing damage, you may discard any number of Pokémon Tools from your Pokémon. This attack does 40 more damage for each card you discarded in this way."
      },
      {
        "name": "Electro Ball",
        "cost": [
          "Lightning",
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
      101
    ],
    "flavorText": "The more energy it charges up, the faster it gets. But this also makes it more likely to explode.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/101.png",
      "large": "https://images.pokemontcg.io/sv3pt5/101_hires.png"
    }
  },
  {
    "id": "sv3pt5-102",
    "name": "Exeggcute",
    "number": "102",
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
      "Exeggutor"
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
        "damage": "30×",
        "text": "Flip a coin until you get tails. This attack does 30 damage for each heads."
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
    "flavorText": "These Pokémon get nervous when they're not in a group of six. The minute even one member of the group goes missing, Exeggcute become cowardly.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/102.png",
      "large": "https://images.pokemontcg.io/sv3pt5/102_hires.png"
    }
  },
  {
    "id": "sv3pt5-103",
    "name": "Exeggutor",
    "number": "103",
    "artist": "Shigenori Negishi",
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
        "name": "Psychic",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 30 more damage for each Energy attached to your opponent's Active Pokémon."
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
      103
    ],
    "flavorText": "When they work together, Exeggutor's three heads can put out powerful psychic energy. Cloudy days make this Pokémon sluggish.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/103.png",
      "large": "https://images.pokemontcg.io/sv3pt5/103_hires.png"
    }
  },
  {
    "id": "sv3pt5-104",
    "name": "Cubone",
    "number": "104",
    "artist": "Shinya Komatsu",
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
      "Marowak"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Cheering Bone",
        "text": "As long as this Pokémon is on your Bench, attacks used by your Marowak do 30 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hit Twice",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 2 coins. This attack does 10 damage for each heads."
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
    "flavorText": "This Pokémon wears the skull of its deceased mother. Sometimes Cubone's dreams make it cry, but each tear Cubone sheds makes it stronger.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/104.png",
      "large": "https://images.pokemontcg.io/sv3pt5/104_hires.png"
    }
  },
  {
    "id": "sv3pt5-105",
    "name": "Marowak",
    "number": "105",
    "artist": "Shinya Komatsu",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Cubone",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bone Throw",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This attack also does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Boundless Power",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      105
    ],
    "flavorText": "When this Pokémon evolved, the skull of its mother fused to it. Marowak's temperament also turned vicious at the same time.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/105.png",
      "large": "https://images.pokemontcg.io/sv3pt5/105_hires.png"
    }
  },
  {
    "id": "sv3pt5-106",
    "name": "Hitmonlee",
    "number": "106",
    "artist": "Hitoshi Ariga",
    "rarity": "Uncommon",
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
        "name": "Twister Kick",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 10 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) Switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Low Kick",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      106
    ],
    "flavorText": "The legs freely contract and stretch. The stretchy legs allow it to hit a distant foe with a rising kick.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/106.png",
      "large": "https://images.pokemontcg.io/sv3pt5/106_hires.png"
    }
  },
  {
    "id": "sv3pt5-107",
    "name": "Hitmonchan",
    "number": "107",
    "artist": "DOM",
    "rarity": "Uncommon",
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
    "abilities": [
      {
        "name": "Counterattack",
        "text": "If this Pokémon is in the Active Spot and is damaged by an attack from your opponent's Pokémon (even if this Pokémon is Knocked Out), put 3 damage counters on the Attacking Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Excited Punch",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "During your next turn, this Pokémon's Excited Punch attack does 60 more damage (before applying Weakness and Resistance)."
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/107.png",
      "large": "https://images.pokemontcg.io/sv3pt5/107_hires.png"
    }
  },
  {
    "id": "sv3pt5-108",
    "name": "Lickitung",
    "number": "108",
    "artist": "Saya Tsuruta",
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
        "name": "Tongue-Tied",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "During your opponent's next turn, the Defending Pokémon can't attack."
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
      108
    ],
    "flavorText": "Bug Pokémon are Lickitung's main food source. This Pokémon paralyzes its prey with a lick from its long tongue, then swallows the prey whole.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/108.png",
      "large": "https://images.pokemontcg.io/sv3pt5/108_hires.png"
    }
  },
  {
    "id": "sv3pt5-109",
    "name": "Koffing",
    "number": "109",
    "artist": "Shibuzoh.",
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
      "Weezing"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Suspicious Gas",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      109
    ],
    "flavorText": "Its body is full of poisonous gas. It floats into garbage dumps, seeking out the fumes of raw, rotting trash.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/109.png",
      "large": "https://images.pokemontcg.io/sv3pt5/109_hires.png"
    }
  },
  {
    "id": "sv3pt5-110",
    "name": "Weezing",
    "number": "110",
    "artist": "Shibuzoh.",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Koffing",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Let's Have a Blast",
        "text": "If this Pokémon is in the Active Spot and is Knocked Out by damage from an attack from your opponent's Pokémon, flip a coin. If heads, the Attacking Pokémon is Knocked Out.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Spinning Fumes",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "This attack also does 10 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      110
    ],
    "flavorText": "Very rarely, a sudden mutation can result in two small Koffing twins becoming conjoined as a Weezing.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/110.png",
      "large": "https://images.pokemontcg.io/sv3pt5/110_hires.png"
    }
  },
  {
    "id": "sv3pt5-111",
    "name": "Rhyhorn",
    "number": "111",
    "artist": "GOSSAN",
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
      "Rhydon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Push Down",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Switch out your opponent's Active Pokémon to the Bench. (Your opponent chooses the new Active Pokémon.)"
      },
      {
        "name": "Boulder Crush",
        "cost": [
          "Fighting",
          "Fighting",
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      111
    ],
    "flavorText": "It can remember only one thing at a time. Once it starts rushing, it forgets why it started.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/111.png",
      "large": "https://images.pokemontcg.io/sv3pt5/111_hires.png"
    }
  },
  {
    "id": "sv3pt5-112",
    "name": "Rhydon",
    "number": "112",
    "artist": "GOSSAN",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
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
        "name": "Wrack Down",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Charismatic Drill",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "If you played Giovanni's Charisma from your hand during this turn, this attack does 140 more damage."
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/112.png",
      "large": "https://images.pokemontcg.io/sv3pt5/112_hires.png"
    }
  },
  {
    "id": "sv3pt5-113",
    "name": "Chansey",
    "number": "113",
    "artist": "Taiga Kayama",
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
    "evolvesTo": [
      "Blissey"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Lucky Bonus",
        "text": "If you took this Pokémon as a face-down Prize card during your turn and your Bench isn't full, before you put it into your hand, you may put it onto your Bench. If you put this Pokémon onto your Bench in this way, flip a coin. If heads, take 1 more Prize card.",
        "type": "Ability"
      }
    ],
    "attacks": [
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
    "flavorText": "This kindly Pokémon lays highly nutritious eggs and shares them with injured Pokémon or people.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/113.png",
      "large": "https://images.pokemontcg.io/sv3pt5/113_hires.png"
    }
  },
  {
    "id": "sv3pt5-114",
    "name": "Tangela",
    "number": "114",
    "artist": "Aya Kusube",
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
        "name": "Tactful Tangling",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If you played Erika's Invitation from your hand during this turn, this attack does 60 more damage."
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
    "flavorText": "Hidden beneath a tangle of vines that grows nonstop even if the vines are torn off, this Pokémon's true appearance remains a mystery.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/114.png",
      "large": "https://images.pokemontcg.io/sv3pt5/114_hires.png"
    }
  },
  {
    "id": "sv3pt5-115",
    "name": "Kangaskhan ex",
    "number": "115",
    "artist": "N-DESIGN Inc.",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "230",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
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
        "name": "Incessant Punching",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100×",
        "text": "Flip 4 coins. This attack does 100 damage for each heads."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/115.png",
      "large": "https://images.pokemontcg.io/sv3pt5/115_hires.png"
    }
  },
  {
    "id": "sv3pt5-116",
    "name": "Horsea",
    "number": "116",
    "artist": "aspara",
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
      "Seadra"
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
        "damage": "10",
        "text": ""
      },
      {
        "name": "Sharp Fin",
        "cost": [
          "Water",
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
      116
    ],
    "flavorText": "They swim with dance-like motions and cause whirlpools to form. Horsea compete to see which of them can generate the biggest whirlpool.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/116.png",
      "large": "https://images.pokemontcg.io/sv3pt5/116_hires.png"
    }
  },
  {
    "id": "sv3pt5-117",
    "name": "Seadra",
    "number": "117",
    "artist": "aspara",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Horsea",
    "evolvesTo": [
      "Kingdra"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Blinding Ink",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "During your opponent's next turn, if the Defending Pokémon tries to use an attack, your opponent flips 2 coins. If either of them is tails, that attack doesn't happen."
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
      117
    ],
    "flavorText": "Seadra's mouth is slender, but its suction power is strong. In an instant, Seadra can suck in food that's larger than the opening of its mouth.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/117.png",
      "large": "https://images.pokemontcg.io/sv3pt5/117_hires.png"
    }
  },
  {
    "id": "sv3pt5-118",
    "name": "Goldeen",
    "number": "118",
    "artist": "SIE NANAHARA",
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
      "Seaking"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Triple Strike",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 3 coins. This attack does 10 damage for each heads."
      },
      {
        "name": "Sprinkle Water",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      118
    ],
    "flavorText": "Its dorsal and pectoral fins are strongly developed like muscles. It can swim at a speed of five knots.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/118.png",
      "large": "https://images.pokemontcg.io/sv3pt5/118_hires.png"
    }
  },
  {
    "id": "sv3pt5-119",
    "name": "Seaking",
    "number": "119",
    "artist": "SIE NANAHARA",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Goldeen",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Swim Freely",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage from and effects of attacks done to this Pokémon."
      },
      {
        "name": "Aqua Horn",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      119
    ],
    "flavorText": "Using its horn, it bores holes in riverbed boulders, making nests to prevent its eggs from washing away.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/119.png",
      "large": "https://images.pokemontcg.io/sv3pt5/119_hires.png"
    }
  },
  {
    "id": "sv3pt5-120",
    "name": "Staryu",
    "number": "120",
    "artist": "Arai Kiriko",
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
        "name": "Swift",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "This attack's damage isn't affected by Weakness or Resistance, or by any effects on your opponent's Active Pokémon."
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
    "flavorText": "Fish Pokémon nibble at it, but Staryu isn't bothered. Its body regenerates quickly, even if part of it is completely torn off.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/120.png",
      "large": "https://images.pokemontcg.io/sv3pt5/120_hires.png"
    }
  },
  {
    "id": "sv3pt5-121",
    "name": "Starmie",
    "number": "121",
    "artist": "Arai Kiriko",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Staryu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Mysterious Comet",
        "text": "Once during your turn, you may put 2 damage counters on 1 of your opponent's Pokémon. If you placed any damage counters in this way, discard this Pokémon and all attached cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Speed Attack",
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
      121
    ],
    "flavorText": "Starmie swims by spinning its body at high speed. As this Pokémon cruises through the ocean, it absorbs tiny plankton.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/121.png",
      "large": "https://images.pokemontcg.io/sv3pt5/121_hires.png"
    }
  },
  {
    "id": "sv3pt5-122",
    "name": "Mr. Mime",
    "number": "122",
    "artist": "OOYAMA",
    "rarity": "Rare",
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
    "abilities": [
      {
        "name": "Mimic Barrier",
        "text": "If this Pokémon and your opponent's Active Pokémon have the same amount of Energy attached, prevent all damage done to this Pokémon by attacks from your opponent's Pokémon.",
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
        "text": "Put 3 damage counters on your opponent's Pokémon in any way you like."
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
      122
    ],
    "flavorText": "It's known for its top-notch pantomime skills. It protects itself from all sorts of attacks by emitting auras from its fingers to create walls.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/122.png",
      "large": "https://images.pokemontcg.io/sv3pt5/122_hires.png"
    }
  },
  {
    "id": "sv3pt5-123",
    "name": "Scyther",
    "number": "123",
    "artist": "Hideki Ishikawa",
    "rarity": "Uncommon",
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
      "Scizor"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Helpful Slash",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Attach a Basic Grass Energy card from your discard pile to 1 of your Benched Pokémon."
      },
      {
        "name": "Slicing Blade",
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      123
    ],
    "flavorText": "It slashes through grass with its sharp scythes, moving too fast for the human eye to track.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/123.png",
      "large": "https://images.pokemontcg.io/sv3pt5/123_hires.png"
    }
  },
  {
    "id": "sv3pt5-124",
    "name": "Jynx ex",
    "number": "124",
    "artist": "Ayaka Yoshida",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "200",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Heart-Stopping Kiss",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "If your opponent's Active Pokémon is Asleep, it is Knocked Out."
      },
      {
        "name": "Icy Wind",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      124
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/124.png",
      "large": "https://images.pokemontcg.io/sv3pt5/124_hires.png"
    }
  },
  {
    "id": "sv3pt5-125",
    "name": "Electabuzz",
    "number": "125",
    "artist": "NC Empire",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
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
        "name": "Electro Combo",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If Magmar is on your Bench, this attack does 40 more damage."
      },
      {
        "name": "Light Punch",
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
    "flavorText": "With the coming of a storm, many of these Pokémon will gather under tall trees and sit there waiting for lightning to strike.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/125.png",
      "large": "https://images.pokemontcg.io/sv3pt5/125_hires.png"
    }
  },
  {
    "id": "sv3pt5-126",
    "name": "Magmar",
    "number": "126",
    "artist": "Toshinao Aoki",
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
        "name": "Live Coal",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Flare Combo",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If Electabuzz is on your Bench, this attack does 80 more damage."
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
    "flavorText": "These Pokémon's bodies are constantly burning. Magmar are feared as one of the causes behind fires.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/126.png",
      "large": "https://images.pokemontcg.io/sv3pt5/126_hires.png"
    }
  },
  {
    "id": "sv3pt5-127",
    "name": "Pinsir",
    "number": "127",
    "artist": "Yuya Oka",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Vise Grip",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Reckless Throw",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "If you have more Prize cards remaining than your opponent, this attack does 90 more damage."
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
    "flavorText": "This Pokémon clamps its pincers down on its prey and then either splits the prey in half or flings it away.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/127.png",
      "large": "https://images.pokemontcg.io/sv3pt5/127_hires.png"
    }
  },
  {
    "id": "sv3pt5-128",
    "name": "Tauros",
    "number": "128",
    "artist": "Takeshi Nakamura",
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
        "name": "Gather the Crew",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Basic Pokémon and put it onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Rage",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "This attack does 10 more damage for each damage counter on this Pokémon."
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
    "flavorText": "When it targets an enemy, it charges furiously while whipping its body with its long tails.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/128.png",
      "large": "https://images.pokemontcg.io/sv3pt5/128_hires.png"
    }
  },
  {
    "id": "sv3pt5-129",
    "name": "Magikarp",
    "number": "129",
    "artist": "Kouki Saitou",
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
        "name": "Splashy Splash",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin until you get tails. For each heads, draw a card."
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
    "flavorText": "An underpowered, pathetic Pokémon. It may jump high on rare occasions but never more than seven feet.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/129.png",
      "large": "https://images.pokemontcg.io/sv3pt5/129_hires.png"
    }
  },
  {
    "id": "sv3pt5-130",
    "name": "Gyarados",
    "number": "130",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "190",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Magikarp",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Untamed One",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you must discard the top 5 cards of your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hyper Beam",
        "cost": [
          "Water",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "200",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      130
    ],
    "flavorText": "Once it appears, it goes on a rampage. It remains enraged until it demolishes everything around it.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/130.png",
      "large": "https://images.pokemontcg.io/sv3pt5/130_hires.png"
    }
  },
  {
    "id": "sv3pt5-131",
    "name": "Lapras",
    "number": "131",
    "artist": "LINNE",
    "rarity": "Uncommon",
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
        "name": "Hop on My Back",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Pokémon, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Aqua Edge",
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
      131
    ],
    "flavorText": "Crossing icy seas is no issue for this cold-resistant Pokémon. Its smooth skin is a little cool to the touch.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/131.png",
      "large": "https://images.pokemontcg.io/sv3pt5/131_hires.png"
    }
  },
  {
    "id": "sv3pt5-132",
    "name": "Ditto",
    "number": "132",
    "artist": "KIYOTAKA OSHIYAMA",
    "rarity": "Rare",
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
        "name": "Transformative Start",
        "text": "Once during your first turn, if this Pokémon is in the Active Spot, you may search your deck and choose a Basic Pokémon you find there, except any Ditto. If you do, discard this Pokémon and all attached cards, and put the chosen Pokémon in its place. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Splup",
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
      132
    ],
    "flavorText": "Its transformation ability is perfect. However, if made to laugh, it can't maintain its disguise.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/132.png",
      "large": "https://images.pokemontcg.io/sv3pt5/132_hires.png"
    }
  },
  {
    "id": "sv3pt5-133",
    "name": "Eevee",
    "number": "133",
    "artist": "Narumi Sato",
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
        "name": "Colorful Friends",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 Pokémon of different types, reveal them, and put them into your hand. Then, shuffle your deck."
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
      133
    ],
    "flavorText": "Its ability to evolve into many forms allows it to adapt smoothly and perfectly to any environment.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/133.png",
      "large": "https://images.pokemontcg.io/sv3pt5/133_hires.png"
    }
  },
  {
    "id": "sv3pt5-134",
    "name": "Vaporeon",
    "number": "134",
    "artist": "kirisAki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spiral Drain",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Heal 30 damage from this Pokémon."
      },
      {
        "name": "Fighting Whirlpool",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "If your opponent's Active Pokémon is a Pokémon ex or Pokémon V, this attack does 90 more damage."
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
    "flavorText": "It lives close to water. Its long tail is ridged with a fin, which is often mistaken for a mermaid's.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/134.png",
      "large": "https://images.pokemontcg.io/sv3pt5/134_hires.png"
    }
  },
  {
    "id": "sv3pt5-135",
    "name": "Jolteon",
    "number": "135",
    "artist": "sui",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Linear Attack",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 30 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Fighting Lightning",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "If your opponent's Active Pokémon is a Pokémon ex or Pokémon V, this attack does 90 more damage."
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
    "flavorText": "It concentrates the weak electric charges emitted by its cells and launches wicked lightning bolts.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/135.png",
      "large": "https://images.pokemontcg.io/sv3pt5/135_hires.png"
    }
  },
  {
    "id": "sv3pt5-136",
    "name": "Flareon",
    "number": "136",
    "artist": "Ryota Murayama",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Destructive Flame",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If heads, discard an Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Fighting Blaze",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "If your opponent's Active Pokémon is a Pokémon ex or Pokémon V, this attack does 90 more damage."
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
    "flavorText": "Inhaled air is carried to its flame sac, heated, and exhaled as fire that reaches over 3,000 degrees Fahrenheit.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/136.png",
      "large": "https://images.pokemontcg.io/sv3pt5/136_hires.png"
    }
  },
  {
    "id": "sv3pt5-137",
    "name": "Porygon",
    "number": "137",
    "artist": "5ban Graphics",
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
        "name": "Conversion 4",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose Grass, Fire, Water, Lightning, Psychic, Fighting, Darkness, Metal, or Dragon type. Until the Defending Pokémon leaves the Active Spot, its Weakness is now that type. (The amount of Weakness doesn't change.)"
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
    "flavorText": "In recent years, this species has been very helpful in cyberspace. These Pokémon will go around checking to make sure no suspicious data exists.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/137.png",
      "large": "https://images.pokemontcg.io/sv3pt5/137_hires.png"
    }
  },
  {
    "id": "sv3pt5-138",
    "name": "Omanyte",
    "number": "138",
    "artist": "Akira Komayama",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Antique Helix Fossil",
    "evolvesTo": [
      "Omastar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tentacular Return",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Put an Energy attached to your opponent's Active Pokémon into their hand."
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
      138
    ],
    "flavorText": "This Pokémon is a member of an ancient, extinct species. Omanyte paddles through water with its 10 tentacles, looking like it's just drifting along.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/138.png",
      "large": "https://images.pokemontcg.io/sv3pt5/138_hires.png"
    }
  },
  {
    "id": "sv3pt5-139",
    "name": "Omastar",
    "number": "139",
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
    "evolvesFrom": "Omanyte",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Primordial Tentacles",
        "text": "As long as this Pokémon is in the Active Spot, your opponent's Active Pokémon can't retreat.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Aqua Split",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "90",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      139
    ],
    "flavorText": "Omastar's sharp fangs could crush rock, but the Pokémon can attack only the prey that come within reach of its tentacles.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/139.png",
      "large": "https://images.pokemontcg.io/sv3pt5/139_hires.png"
    }
  },
  {
    "id": "sv3pt5-140",
    "name": "Kabuto",
    "number": "140",
    "artist": "Souichirou Gunjima",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Antique Dome Fossil",
    "evolvesTo": [
      "Kabutops"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Scratch",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70×",
        "text": "Flip 2 coins. This attack does 70 damage for each heads."
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
      140
    ],
    "flavorText": "While some say this species has gone extinct, Kabuto sightings are apparently fairly common in some places.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/140.png",
      "large": "https://images.pokemontcg.io/sv3pt5/140_hires.png"
    }
  },
  {
    "id": "sv3pt5-141",
    "name": "Kabutops",
    "number": "141",
    "artist": "Souichirou Gunjima",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Kabuto",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Ancient Way",
        "text": "Apply Weakness for your opponent's Active Pokémon as ×4 instead.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Draining Blade",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "Heal 30 damage from this Pokémon."
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
      141
    ],
    "flavorText": "The cause behind the extinction of this species is unknown. Kabutops were aggressive Pokémon that inhabited warm seas.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/141.png",
      "large": "https://images.pokemontcg.io/sv3pt5/141_hires.png"
    }
  },
  {
    "id": "sv3pt5-142",
    "name": "Aerodactyl",
    "number": "142",
    "artist": "Shinji Kanda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Antique Old Amber",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Glide",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Devolution Ray",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "100",
        "text": "If your opponent's Active Pokémon is an evolved Pokémon, devolve it by putting the highest Stage Evolution card on it into your opponent's hand."
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
      142
    ],
    "flavorText": "Aerodactyl's sawlike fangs can shred skin to tatters—even the skin of Steel-type Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/142.png",
      "large": "https://images.pokemontcg.io/sv3pt5/142_hires.png"
    }
  },
  {
    "id": "sv3pt5-143",
    "name": "Snorlax",
    "number": "143",
    "artist": "HYOGONOSUKE",
    "rarity": "Uncommon",
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
        "name": "Voraciousness",
        "text": "Once during your turn, you may put up to 2 Leftovers cards from your discard pile into your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Thudding Press",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
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
      143
    ],
    "flavorText": "This Pokémon's stomach is so strong, even eating moldy or rotten food will not affect it.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/143.png",
      "large": "https://images.pokemontcg.io/sv3pt5/143_hires.png"
    }
  },
  {
    "id": "sv3pt5-144",
    "name": "Articuno",
    "number": "144",
    "artist": "chibi",
    "rarity": "Rare",
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
        "name": "Ice Float",
        "text": "If this Pokémon has any Water Energy attached, it has no Retreat Cost.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Blizzard",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "This attack also does 10 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      144
    ],
    "flavorText": "This Pokémon can control ice at will. Articuno is said to live in snowy mountains riddled with permafrost.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/144.png",
      "large": "https://images.pokemontcg.io/sv3pt5/144_hires.png"
    }
  },
  {
    "id": "sv3pt5-145",
    "name": "Zapdos ex",
    "number": "145",
    "artist": "takuyoa",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "200",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Voltaic Float",
        "text": "If this Pokémon has any Lightning Energy attached, it has no Retreat Cost.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Multishot Lightning",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This attack also does 90 damage to 1 of your opponent's Benched Pokémon that has any damage counters on it. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      145
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/145.png",
      "large": "https://images.pokemontcg.io/sv3pt5/145_hires.png"
    }
  },
  {
    "id": "sv3pt5-146",
    "name": "Moltres",
    "number": "146",
    "artist": "KEIICHIRO ITO",
    "rarity": "Rare",
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
        "name": "Flare Float",
        "text": "If this Pokémon has any Fire Energy attached, it has no Retreat Cost.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Blazing Flight",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard 2 Fire Energy from this Pokémon. This attack does 120 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      146
    ],
    "flavorText": "There are stories of this Pokémon using its radiant, flame-cloaked wings to light up paths for those lost in the mountains.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/146.png",
      "large": "https://images.pokemontcg.io/sv3pt5/146_hires.png"
    }
  },
  {
    "id": "sv3pt5-147",
    "name": "Dratini",
    "number": "147",
    "artist": "Sanosuke Sakuma",
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
      "Dragonair"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Beat",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Draconic Whip",
        "cost": [
          "Water",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
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
      147
    ],
    "flavorText": "It sheds many layers of skin as it grows larger. During this process, it is protected by a rapid waterfall.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/147.png",
      "large": "https://images.pokemontcg.io/sv3pt5/147_hires.png"
    }
  },
  {
    "id": "sv3pt5-148",
    "name": "Dragonair",
    "number": "148",
    "artist": "Sanosuke Sakuma",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Dratini",
    "evolvesTo": [
      "Dragonite"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Beat",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Aqua Slash",
        "cost": [
          "Water",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "90",
        "text": "During your next turn, this Pokémon can't attack."
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
      148
    ],
    "flavorText": "They say that if it emits an aura from its whole body, the weather will begin to change instantly.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/148.png",
      "large": "https://images.pokemontcg.io/sv3pt5/148_hires.png"
    }
  },
  {
    "id": "sv3pt5-149",
    "name": "Dragonite",
    "number": "149",
    "artist": "Sanosuke Sakuma",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Dragonair",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Jet Cruise",
        "text": "Your Pokémon in play have no Retreat Cost.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dragon Pulse",
        "cost": [
          "Water",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "180",
        "text": "Discard the top 2 cards of your deck."
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
    "flavorText": "It is said that somewhere in the ocean lies an island where these gather. Only they live there.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/149.png",
      "large": "https://images.pokemontcg.io/sv3pt5/149_hires.png"
    }
  },
  {
    "id": "sv3pt5-150",
    "name": "Mewtwo",
    "number": "150",
    "artist": "AKIRA EGAWA",
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
        "name": "Reflective Barrier",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "During your opponent's next turn, if this Pokémon is damaged by an attack (even if it is Knocked Out), put damage counters on the Attacking Pokémon equal to the damage done to this Pokémon."
      },
      {
        "name": "Psyslash",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/150.png",
      "large": "https://images.pokemontcg.io/sv3pt5/150_hires.png"
    }
  },
  {
    "id": "sv3pt5-151",
    "name": "Mew ex",
    "number": "151",
    "artist": "aky CG Works",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "180",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Restart",
        "text": "Once during your turn, you may draw cards until you have 3 cards in your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Genome Hacking",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Choose 1 of your opponent's Active Pokémon's attacks and use it as this attack."
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/151.png",
      "large": "https://images.pokemontcg.io/sv3pt5/151_hires.png"
    }
  },
  {
    "id": "sv3pt5-152",
    "name": "Antique Dome Fossil",
    "number": "152",
    "artist": "AYUMI ODASHIMA",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": "60",
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [
      "Kabuto"
    ],
    "rules": [
      "Play this card as if it were a 60-HP Basic Colorless Pokémon. This card can't be affected by any Special Conditions and can't retreat.  At any time during your turn, you may discard this card from play.",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [
      {
        "name": "Domed Armor",
        "text": "This Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/152.png",
      "large": "https://images.pokemontcg.io/sv3pt5/152_hires.png"
    }
  },
  {
    "id": "sv3pt5-153",
    "name": "Antique Helix Fossil",
    "number": "153",
    "artist": "AYUMI ODASHIMA",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": "60",
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [
      "Omanyte"
    ],
    "rules": [
      "Play this card as if it were a 60-HP Basic Colorless Pokémon. This card can't be affected by any Special Conditions and can't retreat.  At any time during your turn, you may discard this card from play.",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [
      {
        "name": "Helical Swell",
        "text": "As long as this Pokémon is in the Active Spot, your opponent can't play any Stadium cards from their hand.",
        "type": "Ability"
      }
    ],
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/153.png",
      "large": "https://images.pokemontcg.io/sv3pt5/153_hires.png"
    }
  },
  {
    "id": "sv3pt5-154",
    "name": "Antique Old Amber",
    "number": "154",
    "artist": "AYUMI ODASHIMA",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": "60",
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [
      "Aerodactyl",
      "Aerodactyl ex"
    ],
    "rules": [
      "Play this card as if it were a 60-HP Basic Colorless Pokémon. This card can't be affected by any Special Conditions and can't retreat.  At any time during your turn, you may discard this card from play.",
      "You may play any number of Item cards during your turn."
    ],
    "abilities": [
      {
        "name": "Amber Protection",
        "text": "Prevent all effects of your opponent's Pokémon's Abilities done to this Pokémon.",
        "type": "Ability"
      }
    ],
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/154.png",
      "large": "https://images.pokemontcg.io/sv3pt5/154_hires.png"
    }
  },
  {
    "id": "sv3pt5-155",
    "name": "Big Air Balloon",
    "number": "155",
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
      "The Stage 2 Pokémon this card is attached to has no Retreat Cost.",
      "You may attach any number of Pokémon Tools to your Pokémon during your turn. You may attach only 1 Pokémon Tool to each Pokémon, and it stays attached."
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/155.png",
      "large": "https://images.pokemontcg.io/sv3pt5/155_hires.png"
    }
  },
  {
    "id": "sv3pt5-156",
    "name": "Bill's Transfer",
    "number": "156",
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
      "Look at the top 8 cards of your deck. You may reveal any number of Pokémon you find there and put them into your hand. Shuffle the other cards back into your deck.",
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/156.png",
      "large": "https://images.pokemontcg.io/sv3pt5/156_hires.png"
    }
  },
  {
    "id": "sv3pt5-157",
    "name": "Cycling Road",
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
      "Once during each player's turn, that player may discard a Basic Energy card from their hand in order to draw a card.",
      "You may play only 1 Stadium card during your turn. Put it next to the Active Spot, and discard it if another Stadium comes into play. A Stadium with the same name can't be played."
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/157.png",
      "large": "https://images.pokemontcg.io/sv3pt5/157_hires.png"
    }
  },
  {
    "id": "sv3pt5-158",
    "name": "Daisy's Help",
    "number": "158",
    "artist": "Tomomi Kaneko",
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
      "Draw 2 cards. Look at your face-down Prize cards.",
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/158.png",
      "large": "https://images.pokemontcg.io/sv3pt5/158_hires.png"
    }
  },
  {
    "id": "sv3pt5-159",
    "name": "Energy Sticker",
    "number": "159",
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
      "Flip a coin. If heads, attach a Basic Energy card from your discard pile to 1 of your Benched Pokémon.",
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/159.png",
      "large": "https://images.pokemontcg.io/sv3pt5/159_hires.png"
    }
  },
  {
    "id": "sv3pt5-160",
    "name": "Erika's Invitation",
    "number": "160",
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
      "Your opponent reveals their hand, and you put a Basic Pokémon you find there onto your opponent's Bench. If you put a Pokémon onto their Bench in this way, switch in that Pokémon to the Active Spot.",
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/160.png",
      "large": "https://images.pokemontcg.io/sv3pt5/160_hires.png"
    }
  },
  {
    "id": "sv3pt5-161",
    "name": "Giovanni's Charisma",
    "number": "161",
    "artist": "hncl",
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
      "Put an Energy attached to your opponent's Active Pokémon into their hand. If you do, attach an Energy card from your hand to your Active Pokémon.",
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/161.png",
      "large": "https://images.pokemontcg.io/sv3pt5/161_hires.png"
    }
  },
  {
    "id": "sv3pt5-162",
    "name": "Grabber",
    "number": "162",
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
      "Your opponent reveals their hand, and you put a Pokémon you find there on the bottom of their deck.",
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/162.png",
      "large": "https://images.pokemontcg.io/sv3pt5/162_hires.png"
    }
  },
  {
    "id": "sv3pt5-163",
    "name": "Leftovers",
    "number": "163",
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
      "At the end of your turn, if the Pokémon this card is attached to is in the Active Spot, heal 20 damage from it.",
      "You may attach any number of Pokémon Tools to your Pokémon during your turn. You may attach only 1 Pokémon Tool to each Pokémon, and it stays attached."
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/163.png",
      "large": "https://images.pokemontcg.io/sv3pt5/163_hires.png"
    }
  },
  {
    "id": "sv3pt5-164",
    "name": "Protective Goggles",
    "number": "164",
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
      "The Basic Pokémon this card is attached to has no Weakness.",
      "You may attach any number of Pokémon Tools to your Pokémon during your turn. You may attach only 1 Pokémon Tool to each Pokémon, and it stays attached."
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/164.png",
      "large": "https://images.pokemontcg.io/sv3pt5/164_hires.png"
    }
  },
  {
    "id": "sv3pt5-165",
    "name": "Rigid Band",
    "number": "165",
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
      "The Stage 1 Pokémon this card is attached to takes 30 less damage from attacks from your opponent's Pokémon (after applying Weakness and Resistance).",
      "You may attach any number of Pokémon Tools to your Pokémon during your turn. You may attach only 1 Pokémon Tool to each Pokémon, and it stays attached."
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/165.png",
      "large": "https://images.pokemontcg.io/sv3pt5/165_hires.png"
    }
  },
  {
    "id": "sv3pt5-166",
    "name": "Bulbasaur",
    "number": "166",
    "artist": "Yoriyuki Ikegami",
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
    "evolvesTo": [
      "Ivysaur"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Leech Seed",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      1
    ],
    "flavorText": "While it is young, it uses the nutrients that are stored in the seed on its back in order to grow.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/166.png",
      "large": "https://images.pokemontcg.io/sv3pt5/166_hires.png"
    }
  },
  {
    "id": "sv3pt5-167",
    "name": "Ivysaur",
    "number": "167",
    "artist": "Yoriyuki Ikegami",
    "rarity": "Illustration Rare",
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
        "name": "Leech Seed",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Heal 20 damage from this Pokémon."
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
      2
    ],
    "flavorText": "Exposure to sunlight adds to its strength. Sunlight also makes the bud on its back grow larger.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/167.png",
      "large": "https://images.pokemontcg.io/sv3pt5/167_hires.png"
    }
  },
  {
    "id": "sv3pt5-168",
    "name": "Charmander",
    "number": "168",
    "artist": "miki kudo",
    "rarity": "Illustration Rare",
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
      "Charmeleon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Blazing Destruction",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard a Stadium in play."
      },
      {
        "name": "Steady Firebreathing",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      4
    ],
    "flavorText": "From the time it is born, a flame burns at the tip of its tail. Its life would end if the flame were to go out.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/168.png",
      "large": "https://images.pokemontcg.io/sv3pt5/168_hires.png"
    }
  },
  {
    "id": "sv3pt5-169",
    "name": "Charmeleon",
    "number": "169",
    "artist": "miki kudo",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
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
        "name": "Combustion",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Fire Blast",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
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
      5
    ],
    "flavorText": "If it becomes agitated during battle, it spouts intense flames, incinerating its surroundings.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/169.png",
      "large": "https://images.pokemontcg.io/sv3pt5/169_hires.png"
    }
  },
  {
    "id": "sv3pt5-170",
    "name": "Squirtle",
    "number": "170",
    "artist": "Mitsuhiro Arita",
    "rarity": "Illustration Rare",
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
        "name": "Withdraw",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage done to this Pokémon by attacks."
      },
      {
        "name": "Skull Bash",
        "cost": [
          "Water",
          "Water"
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
      7
    ],
    "flavorText": "When it feels threatened, it draws its limbs inside its shell and sprays water from its mouth.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/170.png",
      "large": "https://images.pokemontcg.io/sv3pt5/170_hires.png"
    }
  },
  {
    "id": "sv3pt5-171",
    "name": "Wartortle",
    "number": "171",
    "artist": "Mitsuhiro Arita",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
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
        "name": "Free Diving",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put up to 3 Basic Water Energy cards from your discard pile into your hand."
      },
      {
        "name": "Spinning Attack",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      8
    ],
    "flavorText": "It cleverly controls its furry ears and tail to maintain its balance while swimming.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/171.png",
      "large": "https://images.pokemontcg.io/sv3pt5/171_hires.png"
    }
  },
  {
    "id": "sv3pt5-172",
    "name": "Caterpie",
    "number": "172",
    "artist": "Teeziro",
    "rarity": "Illustration Rare",
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
        "name": "Leaf Munch",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If your opponent's Active Pokémon is a Grass Pokémon, this attack does 30 more damage."
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/172.png",
      "large": "https://images.pokemontcg.io/sv3pt5/172_hires.png"
    }
  },
  {
    "id": "sv3pt5-173",
    "name": "Pikachu",
    "number": "173",
    "artist": "Hiroyuki Yamamoto",
    "rarity": "Illustration Rare",
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
        "name": "Charge",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Basic Lightning Energy card and attach it to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Pika Punch",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      25
    ],
    "flavorText": "When it is angered, it immediately discharges the energy stored in the pouches in its cheeks.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/173.png",
      "large": "https://images.pokemontcg.io/sv3pt5/173_hires.png"
    }
  },
  {
    "id": "sv3pt5-174",
    "name": "Nidoking",
    "number": "174",
    "artist": "Misaki Hashimoto",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Nidorino",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Enthusiastic King",
        "text": "If you have Nidoqueen in play, ignore all Energy in the costs of attacks used by this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Venomous Impact",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "190",
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
      34
    ],
    "flavorText": "Nidoking prides itself on its strength. It's forceful and spirited in battle, making use of its thick tail and diamond-crushing horn.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/174.png",
      "large": "https://images.pokemontcg.io/sv3pt5/174_hires.png"
    }
  },
  {
    "id": "sv3pt5-175",
    "name": "Psyduck",
    "number": "175",
    "artist": "Whisker",
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
    "evolvesTo": [
      "Golduck"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Overthink",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, whenever they flip a coin, treat it as tails."
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
      54
    ],
    "flavorText": "It is constantly wracked by a headache. When the headache turns intense, it begins using mysterious powers.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/175.png",
      "large": "https://images.pokemontcg.io/sv3pt5/175_hires.png"
    }
  },
  {
    "id": "sv3pt5-176",
    "name": "Poliwhirl",
    "number": "176",
    "artist": "Gemi",
    "rarity": "Illustration Rare",
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
        "name": "Wave Splash",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Frog Hop",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 60 more damage."
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
      61
    ],
    "flavorText": "This Pokémon's sweat is a slimy mucus. When captured, Poliwhirl can slither from its enemies' grasp and escape.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/176.png",
      "large": "https://images.pokemontcg.io/sv3pt5/176_hires.png"
    }
  },
  {
    "id": "sv3pt5-177",
    "name": "Machoke",
    "number": "177",
    "artist": "Tetsu Kayama",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Machop",
    "evolvesTo": [
      "Machamp"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mountain Ramming",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Discard the top card of your opponent's deck."
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
      67
    ],
    "flavorText": "Its formidable body never gets tired. It helps people by doing work such as the moving of heavy goods.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/177.png",
      "large": "https://images.pokemontcg.io/sv3pt5/177_hires.png"
    }
  },
  {
    "id": "sv3pt5-178",
    "name": "Tangela",
    "number": "178",
    "artist": "Oswaldo KATO",
    "rarity": "Illustration Rare",
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
        "name": "Tactful Tangling",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If you played Erika's Invitation from your hand during this turn, this attack does 60 more damage."
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
    "flavorText": "Hidden beneath a tangle of vines that grows nonstop even if the vines are torn off, this Pokémon's true appearance remains a mystery.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/178.png",
      "large": "https://images.pokemontcg.io/sv3pt5/178_hires.png"
    }
  },
  {
    "id": "sv3pt5-179",
    "name": "Mr. Mime",
    "number": "179",
    "artist": "OKACHEKE",
    "rarity": "Illustration Rare",
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
    "abilities": [
      {
        "name": "Mimic Barrier",
        "text": "If this Pokémon and your opponent's Active Pokémon have the same amount of Energy attached, prevent all damage done to this Pokémon by attacks from your opponent's Pokémon.",
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
        "text": "Put 3 damage counters on your opponent's Pokémon in any way you like."
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
      122
    ],
    "flavorText": "It's known for its top-notch pantomime skills. It protects itself from all sorts of attacks by emitting auras from its fingers to create walls.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/179.png",
      "large": "https://images.pokemontcg.io/sv3pt5/179_hires.png"
    }
  },
  {
    "id": "sv3pt5-180",
    "name": "Omanyte",
    "number": "180",
    "artist": "Yano Keiji",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Antique Helix Fossil",
    "evolvesTo": [
      "Omastar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tentacular Return",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Put an Energy attached to your opponent's Active Pokémon into their hand."
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
      138
    ],
    "flavorText": "This Pokémon is a member of an ancient, extinct species. Omanyte paddles through water with its 10 tentacles, looking like it's just drifting along.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/180.png",
      "large": "https://images.pokemontcg.io/sv3pt5/180_hires.png"
    }
  },
  {
    "id": "sv3pt5-181",
    "name": "Dragonair",
    "number": "181",
    "artist": "rika",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Dratini",
    "evolvesTo": [
      "Dragonite"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Beat",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Aqua Slash",
        "cost": [
          "Water",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "90",
        "text": "During your next turn, this Pokémon can't attack."
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
      148
    ],
    "flavorText": "They say that if it emits an aura from its whole body, the weather will begin to change instantly.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/181.png",
      "large": "https://images.pokemontcg.io/sv3pt5/181_hires.png"
    }
  },
  {
    "id": "sv3pt5-182",
    "name": "Venusaur ex",
    "number": "182",
    "artist": "PLANETA Yamashita",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Ivysaur",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Tranquil Flower",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may heal 60 damage from 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dangerous Toxwhip",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Your opponent's Active Pokémon is now Confused and Poisoned."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/182.png",
      "large": "https://images.pokemontcg.io/sv3pt5/182_hires.png"
    }
  },
  {
    "id": "sv3pt5-183",
    "name": "Charizard ex",
    "number": "183",
    "artist": "PLANETA Mochizuki",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Brave Wing",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "60+",
        "text": "If this Pokémon has any damage counters on it, this attack does 100 more damage."
      },
      {
        "name": "Explosive Vortex",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 4,
        "damage": "330",
        "text": "Discard 3 Energy from this Pokémon."
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/183.png",
      "large": "https://images.pokemontcg.io/sv3pt5/183_hires.png"
    }
  },
  {
    "id": "sv3pt5-184",
    "name": "Blastoise ex",
    "number": "184",
    "artist": "PLANETA Yamashita",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wartortle",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
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
        "name": "Twin Cannons",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "140×",
        "text": "Discard up to 2 Basic Water Energy cards from your hand. This attack does 140 damage for each card you discarded in this way."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/184.png",
      "large": "https://images.pokemontcg.io/sv3pt5/184_hires.png"
    }
  },
  {
    "id": "sv3pt5-185",
    "name": "Arbok ex",
    "number": "185",
    "artist": "Eske Yoshinob",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "270",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Ekans",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Bind Down",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
      },
      {
        "name": "Menacing Fangs",
        "cost": [
          "Darkness",
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Your opponent discards 2 cards from their hand."
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
      24
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/185.png",
      "large": "https://images.pokemontcg.io/sv3pt5/185_hires.png"
    }
  },
  {
    "id": "sv3pt5-186",
    "name": "Ninetales ex",
    "number": "186",
    "artist": "PLANETA Tsuji",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "260",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Vulpix",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Heat Wave",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Burned."
      },
      {
        "name": "Mirrored Flames",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "80+",
        "text": "If you have the same number of cards in your hand as your opponent, this attack does 140 more damage."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/186.png",
      "large": "https://images.pokemontcg.io/sv3pt5/186_hires.png"
    }
  },
  {
    "id": "sv3pt5-187",
    "name": "Wigglytuff ex",
    "number": "187",
    "artist": "Saki Hayashiro",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "250",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Jigglypuff",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Expanding Body",
        "text": "If this Pokémon has any Special Energy attached, it gets +100 HP.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Friend Tackle",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "If you played a Supporter card from your hand during this turn, this attack does 90 more damage."
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
      40
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/187.png",
      "large": "https://images.pokemontcg.io/sv3pt5/187_hires.png"
    }
  },
  {
    "id": "sv3pt5-188",
    "name": "Alakazam ex",
    "number": "188",
    "artist": "PLANETA Tsuji",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "310",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Kadabra",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Mind Jack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90+",
        "text": "This attack does 30 more damage for each of your opponent's Benched Pokémon."
      },
      {
        "name": "Dimensional Hand",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "This attack can be used even if this Pokémon is on the Bench."
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
      65
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/188.png",
      "large": "https://images.pokemontcg.io/sv3pt5/188_hires.png"
    }
  },
  {
    "id": "sv3pt5-189",
    "name": "Golem ex",
    "number": "189",
    "artist": "PLANETA Igarashi",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Graveler",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Dynamic Roll",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "During your next turn, attacks used by this Pokémon do 120 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance)."
      },
      {
        "name": "Rock Blaster",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
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
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      76
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/189.png",
      "large": "https://images.pokemontcg.io/sv3pt5/189_hires.png"
    }
  },
  {
    "id": "sv3pt5-190",
    "name": "Kangaskhan ex",
    "number": "190",
    "artist": "N-DESIGN Inc.",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "230",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
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
        "name": "Incessant Punching",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100×",
        "text": "Flip 4 coins. This attack does 100 damage for each heads."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/190.png",
      "large": "https://images.pokemontcg.io/sv3pt5/190_hires.png"
    }
  },
  {
    "id": "sv3pt5-191",
    "name": "Jynx ex",
    "number": "191",
    "artist": "Ayaka Yoshida",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "200",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Heart-Stopping Kiss",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "If your opponent's Active Pokémon is Asleep, it is Knocked Out."
      },
      {
        "name": "Icy Wind",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      124
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/191.png",
      "large": "https://images.pokemontcg.io/sv3pt5/191_hires.png"
    }
  },
  {
    "id": "sv3pt5-192",
    "name": "Zapdos ex",
    "number": "192",
    "artist": "takuyoa",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "200",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Voltaic Float",
        "text": "If this Pokémon has any Lightning Energy attached, it has no Retreat Cost.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Multishot Lightning",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This attack also does 90 damage to 1 of your opponent's Benched Pokémon that has any damage counters on it. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      145
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/192.png",
      "large": "https://images.pokemontcg.io/sv3pt5/192_hires.png"
    }
  },
  {
    "id": "sv3pt5-193",
    "name": "Mew ex",
    "number": "193",
    "artist": "aky CG Works",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "180",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Restart",
        "text": "Once during your turn, you may draw cards until you have 3 cards in your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Genome Hacking",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Choose 1 of your opponent's Active Pokémon's attacks and use it as this attack."
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/193.png",
      "large": "https://images.pokemontcg.io/sv3pt5/193_hires.png"
    }
  },
  {
    "id": "sv3pt5-194",
    "name": "Bill's Transfer",
    "number": "194",
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
      "Look at the top 8 cards of your deck. You may reveal any number of Pokémon you find there and put them into your hand. Shuffle the other cards back into your deck.",
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/194.png",
      "large": "https://images.pokemontcg.io/sv3pt5/194_hires.png"
    }
  },
  {
    "id": "sv3pt5-195",
    "name": "Daisy's Help",
    "number": "195",
    "artist": "Fumie Kittaka",
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
      "Draw 2 cards. Look at your face-down Prize cards.",
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/195.png",
      "large": "https://images.pokemontcg.io/sv3pt5/195_hires.png"
    }
  },
  {
    "id": "sv3pt5-196",
    "name": "Erika's Invitation",
    "number": "196",
    "artist": "saino misaki",
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
      "Your opponent reveals their hand, and you put a Basic Pokémon you find there onto your opponent's Bench. If you put a Pokémon onto their Bench in this way, switch in that Pokémon to the Active Spot.",
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/196.png",
      "large": "https://images.pokemontcg.io/sv3pt5/196_hires.png"
    }
  },
  {
    "id": "sv3pt5-197",
    "name": "Giovanni's Charisma",
    "number": "197",
    "artist": "hncl",
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
      "Put an Energy attached to your opponent's Active Pokémon into their hand. If you do, attach an Energy card from your hand to your Active Pokémon.",
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/197.png",
      "large": "https://images.pokemontcg.io/sv3pt5/197_hires.png"
    }
  },
  {
    "id": "sv3pt5-198",
    "name": "Venusaur ex",
    "number": "198",
    "artist": "Yoriyuki Ikegami",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Ivysaur",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Tranquil Flower",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may heal 60 damage from 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dangerous Toxwhip",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Your opponent's Active Pokémon is now Confused and Poisoned."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/198.png",
      "large": "https://images.pokemontcg.io/sv3pt5/198_hires.png"
    }
  },
  {
    "id": "sv3pt5-199",
    "name": "Charizard ex",
    "number": "199",
    "artist": "miki kudo",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Brave Wing",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "60+",
        "text": "If this Pokémon has any damage counters on it, this attack does 100 more damage."
      },
      {
        "name": "Explosive Vortex",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 4,
        "damage": "330",
        "text": "Discard 3 Energy from this Pokémon."
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/199.png",
      "large": "https://images.pokemontcg.io/sv3pt5/199_hires.png"
    }
  },
  {
    "id": "sv3pt5-200",
    "name": "Blastoise ex",
    "number": "200",
    "artist": "Mitsuhiro Arita",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wartortle",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
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
        "name": "Twin Cannons",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "140×",
        "text": "Discard up to 2 Basic Water Energy cards from your hand. This attack does 140 damage for each card you discarded in this way."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/200.png",
      "large": "https://images.pokemontcg.io/sv3pt5/200_hires.png"
    }
  },
  {
    "id": "sv3pt5-201",
    "name": "Alakazam ex",
    "number": "201",
    "artist": "Shinya Komatsu",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "310",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Kadabra",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Mind Jack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90+",
        "text": "This attack does 30 more damage for each of your opponent's Benched Pokémon."
      },
      {
        "name": "Dimensional Hand",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "This attack can be used even if this Pokémon is on the Bench."
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
      65
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/201.png",
      "large": "https://images.pokemontcg.io/sv3pt5/201_hires.png"
    }
  },
  {
    "id": "sv3pt5-202",
    "name": "Zapdos ex",
    "number": "202",
    "artist": "Shiburingaru",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "200",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Voltaic Float",
        "text": "If this Pokémon has any Lightning Energy attached, it has no Retreat Cost.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Multishot Lightning",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This attack also does 90 damage to 1 of your opponent's Benched Pokémon that has any damage counters on it. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      145
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/202.png",
      "large": "https://images.pokemontcg.io/sv3pt5/202_hires.png"
    }
  },
  {
    "id": "sv3pt5-203",
    "name": "Erika's Invitation",
    "number": "203",
    "artist": "Cona Nitanda",
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
      "Your opponent reveals their hand, and you put a Basic Pokémon you find there onto your opponent's Bench. If you put a Pokémon onto their Bench in this way, switch in that Pokémon to the Active Spot.",
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/203.png",
      "large": "https://images.pokemontcg.io/sv3pt5/203_hires.png"
    }
  },
  {
    "id": "sv3pt5-204",
    "name": "Giovanni's Charisma",
    "number": "204",
    "artist": "Hideki Ishikawa",
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
      "Put an Energy attached to your opponent's Active Pokémon into their hand. If you do, attach an Energy card from your hand to your Active Pokémon.",
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/204.png",
      "large": "https://images.pokemontcg.io/sv3pt5/204_hires.png"
    }
  },
  {
    "id": "sv3pt5-205",
    "name": "Mew ex",
    "number": "205",
    "artist": "aky CG Works",
    "rarity": "Hyper Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "180",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Restart",
        "text": "Once during your turn, you may draw cards until you have 3 cards in your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Genome Hacking",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Choose 1 of your opponent's Active Pokémon's attacks and use it as this attack."
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/205.png",
      "large": "https://images.pokemontcg.io/sv3pt5/205_hires.png"
    }
  },
  {
    "id": "sv3pt5-206",
    "name": "Switch",
    "number": "206",
    "artist": "Studio Bora Inc.",
    "rarity": "Hyper Rare",
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
    "regulationMark": "G",
    "images": {
      "small": "https://images.pokemontcg.io/sv3pt5/206.png",
      "large": "https://images.pokemontcg.io/sv3pt5/206_hires.png"
    }
  },
  {
    "id": "sv3pt5-207",
    "name": "Basic Psychic Energy",
    "number": "207",
    "artist": null,
    "rarity": "Hyper Rare",
    "supertype": "Energy",
    "subtypes": [
      "Basic"
    ],
    "hp": null,
    "types": [
      "Psychic"
    ],
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
      "small": "https://images.pokemontcg.io/sv3pt5/207.png",
      "large": "https://images.pokemontcg.io/sv3pt5/207_hires.png"
    }
  }
]

export default cardDetails
