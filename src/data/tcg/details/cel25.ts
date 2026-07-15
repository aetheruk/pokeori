import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "cel25-1",
    "name": "Ho-Oh",
    "number": "1",
    "artist": "Kouki Saitou",
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
        "name": "Sacred Fire",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 50 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Fire Blast",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      250
    ],
    "flavorText": "It will reveal itself before a pure-hearted Trainer by shining its bright, rainbow-colored wings.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/1.png",
      "large": "https://images.pokemontcg.io/cel25/1_hires.png"
    }
  },
  {
    "id": "cel25-2",
    "name": "Reshiram",
    "number": "2",
    "artist": "Aya Kusube",
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
        "name": "Scorching Wind",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 20 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Black Flame",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If Zekrom is on your Bench, this attack does 80 more damage."
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
      643
    ],
    "flavorText": "When Reshiram's tail flares, the heat energy moves the atmosphere and changes the world's weather.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/2.png",
      "large": "https://images.pokemontcg.io/cel25/2_hires.png"
    }
  },
  {
    "id": "cel25-3",
    "name": "Kyogre",
    "number": "3",
    "artist": "Ryuta Fuse",
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
        "name": "Aqua Storm",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard the top 5 cards of your deck, and then choose 2 of your opponent's Benched Pokémon. This attack does 50 damage for each Energy card you discarded in this way to each of those Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Surf",
        "cost": [
          "Water",
          "Water",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      382
    ],
    "flavorText": "It is said to have widened the seas by causing downpours. It had been asleep in a marine trench.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/3.png",
      "large": "https://images.pokemontcg.io/cel25/3_hires.png"
    }
  },
  {
    "id": "cel25-4",
    "name": "Palkia",
    "number": "4",
    "artist": "5ban Graphics",
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
    "abilities": [
      {
        "name": "Absolute Space",
        "text": "As long as this Pokémon is in the Active Spot, your opponent can't play any Stadium cards from their hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Overdrive Smash",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "During your next turn, this Pokémon's Overdrive Smash attack does 80 more damage (before applying Weakness and Resistance)."
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
      484
    ],
    "flavorText": "It has the ability to distort space. It is described as a deity in Sinnoh-region mythology.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/4.png",
      "large": "https://images.pokemontcg.io/cel25/4_hires.png"
    }
  },
  {
    "id": "cel25-5",
    "name": "Pikachu",
    "number": "5",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
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
        "name": "Gnaw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Thunder Jolt",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If tails, this Pokémon also does 10 damage to itself."
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
    "flavorText": "It has small electric sacs on both its cheeks. If threatened, it looses electric charges from the sacs.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/5.png",
      "large": "https://images.pokemontcg.io/cel25/5_hires.png"
    }
  },
  {
    "id": "cel25-6",
    "name": "Flying Pikachu V",
    "number": "6",
    "artist": "aky CG Works",
    "rarity": "Rare Holo V",
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
        "name": "Thunder Shock",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Fly",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
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
      25
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/6.png",
      "large": "https://images.pokemontcg.io/cel25/6_hires.png"
    }
  },
  {
    "id": "cel25-7",
    "name": "Flying Pikachu VMAX",
    "number": "7",
    "artist": "aky CG Works",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "310",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Flying Pikachu V",
    "evolvesTo": [
      "Raichu"
    ],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Max Balloon",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
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
    "retreatCost": [],
    "convertedRetreatCost": null,
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
      "small": "https://images.pokemontcg.io/cel25/7.png",
      "large": "https://images.pokemontcg.io/cel25/7_hires.png"
    }
  },
  {
    "id": "cel25-8",
    "name": "Surfing Pikachu V",
    "number": "8",
    "artist": "aky CG Works",
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
        "name": "Surf",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
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
      "small": "https://images.pokemontcg.io/cel25/8.png",
      "large": "https://images.pokemontcg.io/cel25/8_hires.png"
    }
  },
  {
    "id": "cel25-9",
    "name": "Surfing Pikachu VMAX",
    "number": "9",
    "artist": "aky CG Works",
    "rarity": "Rare Holo VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "310",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Surfing Pikachu V",
    "evolvesTo": [
      "Raichu"
    ],
    "rules": [
      "VMAX rule: When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Max Surfer",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "This attack also does 30 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      "small": "https://images.pokemontcg.io/cel25/9.png",
      "large": "https://images.pokemontcg.io/cel25/9_hires.png"
    }
  },
  {
    "id": "cel25-10",
    "name": "Zekrom",
    "number": "10",
    "artist": "Aya Kusube",
    "rarity": "Rare",
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
        "name": "Field Crush",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "If your opponent has a Stadium in play, discard it."
      },
      {
        "name": "White Thunder",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If Reshiram is on your Bench, this attack does 80 more damage."
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
      644
    ],
    "flavorText": "Concealing itself in lightning clouds, it flies throughout the Unova region. It creates electricity in its tail.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/10.png",
      "large": "https://images.pokemontcg.io/cel25/10_hires.png"
    }
  },
  {
    "id": "cel25-11",
    "name": "Mew",
    "number": "11",
    "artist": "Yuu Nishida",
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
        "name": "Mysterious Tail",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may look at the top 6 cards of your deck, reveal an Item card you find there, and put it into your hand. Shuffle the other cards back into your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Psyshot",
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
      151
    ],
    "flavorText": "Its DNA is said to contain the genetic codes of all Pokémon, so it can use all kinds of techniques.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/11.png",
      "large": "https://images.pokemontcg.io/cel25/11_hires.png"
    }
  },
  {
    "id": "cel25-12",
    "name": "Xerneas",
    "number": "12",
    "artist": "AKIRA EGAWA",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Breath of Life",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Search your deck for up to 3 basic Energy cards of different types and attach them to your Pokémon in any way you like. Then, shuffle your deck."
      },
      {
        "name": "Aurora Horns",
        "cost": [
          "Psychic",
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
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/12.png",
      "large": "https://images.pokemontcg.io/cel25/12_hires.png"
    }
  },
  {
    "id": "cel25-13",
    "name": "Cosmog",
    "number": "13",
    "artist": "kirisAki",
    "rarity": "Rare",
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
        "name": "Star Protection",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage done to this Pokémon by attacks."
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
      789
    ],
    "flavorText": "Whether or not it's a Pokémon from this world is a mystery. When it's in a jam, it warps away to a safe place to hide.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/13.png",
      "large": "https://images.pokemontcg.io/cel25/13_hires.png"
    }
  },
  {
    "id": "cel25-14",
    "name": "Cosmoem",
    "number": "14",
    "artist": "kirisAki",
    "rarity": "Rare",
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
        "name": "Star Protection",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage done to this Pokémon by attacks."
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
      790
    ],
    "flavorText": "As it absorbs light, Cosmoem continues to grow. Its golden shell is surprisingly solid.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/14.png",
      "large": "https://images.pokemontcg.io/cel25/14_hires.png"
    }
  },
  {
    "id": "cel25-15",
    "name": "Lunala",
    "number": "15",
    "artist": "kirisAki",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Cosmoem",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Lunar Pain",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Double the number of damage counters on each of your opponent's Pokémon."
      },
      {
        "name": "Psychic Shot",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "This attack also does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      792
    ],
    "flavorText": "It sometimes summons unknown powers and life-forms here to this world from holes that lead to other worlds.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/15.png",
      "large": "https://images.pokemontcg.io/cel25/15_hires.png"
    }
  },
  {
    "id": "cel25-16",
    "name": "Zacian V",
    "number": "16",
    "artist": "Mitsuhiro Arita",
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
    "abilities": [
      {
        "name": "Roar of the Sword",
        "text": "Once during your turn, you may search your deck for a Psychic Energy card and attach it to 1 of your Pokémon. Then, shuffle your deck. If you use this Ability, your turn ends.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Storm Slash",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "This attack does 30 more damage for each Psychic Energy attached to this Pokémon."
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
      888
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/16.png",
      "large": "https://images.pokemontcg.io/cel25/16_hires.png"
    }
  },
  {
    "id": "cel25-17",
    "name": "Groudon",
    "number": "17",
    "artist": "Ryuta Fuse",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "130",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Magma Volcano",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80×",
        "text": "Discard the top 5 cards of your deck. This attack does 80 damage for each Energy card you discarded in this way."
      },
      {
        "name": "Massive Rend",
        "cost": [
          "Fighting",
          "Fighting",
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
      383
    ],
    "flavorText": "This legendary Pokémon is said to represent the land. It went to sleep after dueling Kyogre.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/17.png",
      "large": "https://images.pokemontcg.io/cel25/17_hires.png"
    }
  },
  {
    "id": "cel25-18",
    "name": "Zamazenta V",
    "number": "18",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo V",
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
        "name": "Growl of the Shield",
        "text": "All of your Fighting Pokémon take 20 less damage from attacks from your opponent's Pokémon VMAX (after applying Weakness and Resistance). You can't apply more than 1 Growl of the Shield Ability at a time.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Heavy Impact",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
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
      889
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/18.png",
      "large": "https://images.pokemontcg.io/cel25/18_hires.png"
    }
  },
  {
    "id": "cel25-19",
    "name": "Yveltal",
    "number": "19",
    "artist": "AKIRA EGAWA",
    "rarity": "Rare",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Cry of Destruction",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Discard up to 3 Special Energy from your opponent's Pokémon."
      },
      {
        "name": "Dark Feather",
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
      "small": "https://images.pokemontcg.io/cel25/19.png",
      "large": "https://images.pokemontcg.io/cel25/19_hires.png"
    }
  },
  {
    "id": "cel25-20",
    "name": "Dialga",
    "number": "20",
    "artist": "5ban Graphics",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Temporal Backflow",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put a card from your discard pile into your hand."
      },
      {
        "name": "Metal Blast",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "This attack does 20 more damage for each Metal Energy attached to this Pokémon."
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
      483
    ],
    "flavorText": "It has the power to control time. It appears in Sinnoh-region myths as an ancient deity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/20.png",
      "large": "https://images.pokemontcg.io/cel25/20_hires.png"
    }
  },
  {
    "id": "cel25-21",
    "name": "Solgaleo",
    "number": "21",
    "artist": "kirisAki",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Cosmoem",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Rush In",
        "text": "Once during your turn, if this Pokémon is on your Bench, you may switch it with your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Solar Geyser",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "100",
        "text": "Attach up to 2 basic Energy cards from your discard pile to 1 of your Benched Pokémon."
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
      791
    ],
    "flavorText": "In writings from the distant past, it's called by the name \"the beast that devours the sun.\"",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/21.png",
      "large": "https://images.pokemontcg.io/cel25/21_hires.png"
    }
  },
  {
    "id": "cel25-22",
    "name": "Lugia",
    "number": "22",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
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
        "name": "Aero Ball",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage for each Energy attached to both Active Pokémon."
      },
      {
        "name": "Deep Crush",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "160",
        "text": "During your next turn, this Pokémon can't attack."
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
      249
    ],
    "flavorText": "It is said to be the guardian of the seas. It is rumored to have been seen on the night of a storm.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/22.png",
      "large": "https://images.pokemontcg.io/cel25/22_hires.png"
    }
  },
  {
    "id": "cel25-23",
    "name": "Professor's Research (Professor Oak)",
    "number": "23",
    "artist": "KIYOTAKA OSHIYAMA",
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
      "small": "https://images.pokemontcg.io/cel25/23.png",
      "large": "https://images.pokemontcg.io/cel25/23_hires.png"
    }
  },
  {
    "id": "cel25-24",
    "name": "Professor's Research (Professor Oak)",
    "number": "24",
    "artist": "Ken Sugimori",
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "D",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/24.png",
      "large": "https://images.pokemontcg.io/cel25/24_hires.png"
    }
  },
  {
    "id": "cel25-25",
    "name": "Mew",
    "number": "25",
    "artist": "Saki Hayashiro",
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
        "name": "Mysterious Tail",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may look at the top 6 cards of your deck, reveal an Item card you find there, and put it into your hand. Shuffle the other cards back into your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Psyshot",
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
      151
    ],
    "flavorText": "Its DNA is said to contain the genetic codes of all Pokémon, so it can use all kinds of techniques.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "E",
    "images": {
      "small": "https://images.pokemontcg.io/cel25/25.png",
      "large": "https://images.pokemontcg.io/cel25/25_hires.png"
    }
  }
]

export default cardDetails
