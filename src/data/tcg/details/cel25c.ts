import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "cel25c-2_A",
    "name": "Blastoise",
    "number": "2",
    "artist": "Ken Sugimori",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wartortle",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Rain Dance",
        "text": "As often as you like during your turn (before your attack), you may attach 1 Water Energy card to 1 of your Water Pokémon. (This doesn't use up your 1 Energy card attachment for the turn.) This power can't be used if Blastoise is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Hydro Pump",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "Does 40 damage plus 10 more damage for each Water Energy attached to Blastoise but not used to pay for this attack's Energy cost. Extra Water Energy after the 2nd doesn't count."
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
    "flavorText": "A brutal Pokémon with pressurized water jets on its shell. They are used for high-speed tackles.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/2_A.png",
      "large": "https://images.pokemontcg.io/cel25c/2_A_hires.png"
    }
  },
  {
    "id": "cel25c-4_A",
    "name": "Charizard",
    "number": "4",
    "artist": "Mitsuhiro Arita",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "120",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Energy Burn",
        "text": "As often as you like during your turn (before your attack), you may turn all Energy attached to Charizard into Fire Energy for the rest of the turn. This power can't be used if Charizard is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Fire Spin",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": "Discard 2 Energy cards attached to Charizard in order to use this attack."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
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
      6
    ],
    "flavorText": "Spits fire that is hot enough to melt boulders. Known to unintentionally cause forest fires.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/4_A.png",
      "large": "https://images.pokemontcg.io/cel25c/4_A_hires.png"
    }
  },
  {
    "id": "cel25c-8_A",
    "name": "Dark Gyarados",
    "number": "8",
    "artist": "Kagemaru Himeno",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Magikarp",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Final Beam",
        "text": "When Dark Gyarados is Knocked Out by an attack, flip a coin. If heads, this power does 20 damage for each Water Energy attached to Dark Gyarados to the Pokémon that Knocked Out Dark Gyarados. Apply Weakness and Resistance. This power doesn't work if Dark Gyarados is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Ice Beam",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
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
      130
    ],
    "flavorText": "Normally found only in the deep ocean, it has recently been seen in shallow waters as well.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/8_A.png",
      "large": "https://images.pokemontcg.io/cel25c/8_A_hires.png"
    }
  },
  {
    "id": "cel25c-9_A",
    "name": "Team Magma's Groudon",
    "number": "9",
    "artist": "Kazuo Yazawa",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Fighting",
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "This Pokémon is both Fighting Darkness type."
    ],
    "abilities": [
      {
        "name": "Power Saver",
        "text": "As long as the number of Pokémon in play (both yours and your opponent's) that has Team Magma in its name is 3 or less, Team Magma's Groudon can't attack.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Linear Attack",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 20 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Pulverize",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "If the Defending Pokémon already has at least 2 damage counters on it, this attack does 50 damage plus 20 more damage."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/9_A.png",
      "large": "https://images.pokemontcg.io/cel25c/9_A_hires.png"
    }
  },
  {
    "id": "cel25c-15_A4",
    "name": "Claydol",
    "number": "15",
    "artist": "Midori Harada",
    "rarity": "Classic Collection",
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
        "name": "Cosmic Power",
        "text": "Once during your turn (before your attack), you may choose up to 2 cards from your hand and put them on the bottom of your deck in any order. If you do, draw cards until you have 6 cards in your hand. This power can't be used if Claydol is affected by a Special Condition.",
        "type": "Poké-Power"
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
        "damage": "40",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "+20"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/15_D.png",
      "large": "https://images.pokemontcg.io/cel25c/15_D_hires.png"
    }
  },
  {
    "id": "cel25c-15_A2",
    "name": "Here Comes Team Rocket!",
    "number": "15",
    "artist": "Ken Sugimori",
    "rarity": "Classic Collection",
    "supertype": "Trainer",
    "subtypes": [],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Each player plays with his or her Prize cards face up for the rest of the game."
    ],
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
      "small": "https://images.pokemontcg.io/cel25c/15_B.png",
      "large": "https://images.pokemontcg.io/cel25c/15_B_hires.png"
    }
  },
  {
    "id": "cel25c-15_A3",
    "name": "Rocket's Zapdos",
    "number": "15",
    "artist": "Shin-ichi Yoshida",
    "rarity": "Classic Collection",
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
        "name": "Plasma",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "If there are any Lightning Energy cards in your discard pile, attach 1 of them to Rocket's Zapdos."
      },
      {
        "name": "Electroburn",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "70",
        "text": "Rocket's Zapdos does damage to itself equal to 10 times the number of Lightning Energy cards attached to it."
      }
    ],
    "weaknesses": [],
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/15_C.png",
      "large": "https://images.pokemontcg.io/cel25c/15_C_hires.png"
    }
  },
  {
    "id": "cel25c-15_A1",
    "name": "Venusaur",
    "number": "15",
    "artist": "Mitsuhiro Arita",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "100",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Ivysaur",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Energy Trans",
        "text": "As often as you like during your turn (before your attack), you may take 1 Grass Energy card attached to 1 of your Pokémon and attach it to a different one. This power can't be used if Venusaur is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Solarbeam",
        "cost": [
          "Grass",
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 4,
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
      3
    ],
    "flavorText": "This plant blooms when it is absorbing solar energy. It stays on the move to seek sunlight.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/15_A.png",
      "large": "https://images.pokemontcg.io/cel25c/15_A_hires.png"
    }
  },
  {
    "id": "cel25c-17_A",
    "name": "Umbreon ★",
    "number": "17",
    "artist": "Masakazu Fukuda",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Star"
    ],
    "hp": "70",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can't have more than 1 Pokémon Star in your deck."
    ],
    "abilities": [
      {
        "name": "Dark Ray",
        "text": "Once during your turn, when you put Umbreon Star from your hand onto your Bench, you may choose 1 card from your opponent's hand without looking and discard it.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Feint Attack",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 30 damage to that Pokémon. This attack's damage isn't affected by Weakness, Resistance, Poké-Powers, Poké-Bodies, or any other effects on that Pokémon."
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
      197
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/17_A.png",
      "large": "https://images.pokemontcg.io/cel25c/17_A_hires.png"
    }
  },
  {
    "id": "cel25c-20_A",
    "name": "Cleffa",
    "number": "20",
    "artist": "Kagemaru Himeno",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "Baby"
    ],
    "hp": "30",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Clefairy"
    ],
    "rules": [
      "If this Baby Pokémon is your Active Pokémon and your opponent tries to attack, your opponent flips a coin (before doing anything required in order to use that attack). If tails, your opponent's turn ends without an attack."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Eeeeeeek",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Shuffle your hand into your deck, then draw 7 cards."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      173
    ],
    "flavorText": "Because of its unusual, star-like silhouette, people believe that it came here on a meteor.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/20_A.png",
      "large": "https://images.pokemontcg.io/cel25c/20_A_hires.png"
    }
  },
  {
    "id": "cel25c-24_A",
    "name": "_____'s Pikachu",
    "number": "24",
    "artist": "Kagemaru Himeno",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Birthday Surprise",
        "cost": [
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If it's not your birthday, this attack does 30 damage. If it is your birthday, flip a coin. If heads, this attack does 30 damage plus 50 more damage; if tails, this attack does 30 damage."
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
    "flavorText": "Your Birthdate: ______________________________",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/24_A.png",
      "large": "https://images.pokemontcg.io/cel25c/24_A_hires.png"
    }
  },
  {
    "id": "cel25c-54_A",
    "name": "Mewtwo-EX",
    "number": "54",
    "artist": "Shizurow",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "X Ball",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Does 20 damage times the amount of Energy attached to this Pokémon and the Defending Pokémon."
      },
      {
        "name": "Psydrive",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Discard an Energy attached to this Pokémon."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/54_A.png",
      "large": "https://images.pokemontcg.io/cel25c/54_A_hires.png"
    }
  },
  {
    "id": "cel25c-60_A",
    "name": "Tapu Lele-GX",
    "number": "60",
    "artist": "5ban Graphics",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "170",
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
        "name": "Wonder Tag",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may search your deck for a Supporter card, reveal it, and put it into your hand. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Energy Drive",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage times the amount of Energy attached to both Active Pokémon. This damage isn't affected by Weakness or Resistance."
      },
      {
        "name": "Tapu Cure-GX",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal all damage from 2 of your Benched Pokémon. (You can't use more than 1 GX attack in a game.)"
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      786
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/60_A.png",
      "large": "https://images.pokemontcg.io/cel25c/60_A_hires.png"
    }
  },
  {
    "id": "cel25c-66_A",
    "name": "Shining Magikarp",
    "number": "66",
    "artist": "Ken Sugimori",
    "rarity": "Classic Collection",
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
    "rules": [
      "You can't have more than 1 Shining Magikarp in your deck."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Gold Scale",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent may draw 2 cards. Either way, you may draw 2 cards."
      },
      {
        "name": "Dragon Bond",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a card named Gyarados, Dark Gyarados, or Shining Gyarados. Show it to your opponent and put it into your hand. Shuffle your deck afterward."
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
    "flavorText": "An underpowered, pathetic Pokémon. It may jump high on rare occasions, but never more than seven feet.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/66_A.png",
      "large": "https://images.pokemontcg.io/cel25c/66_A_hires.png"
    }
  },
  {
    "id": "cel25c-73_A",
    "name": "Imposter Professor Oak",
    "number": "73",
    "artist": "Ken Sugimori",
    "rarity": "Classic Collection",
    "supertype": "Trainer",
    "subtypes": [],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Your opponent shuffles his or her hand into his or her deck, then draws 7 cards."
    ],
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
      "small": "https://images.pokemontcg.io/cel25c/73_A.png",
      "large": "https://images.pokemontcg.io/cel25c/73_A_hires.png"
    }
  },
  {
    "id": "cel25c-76_A",
    "name": "M Rayquaza-EX",
    "number": "76",
    "artist": "5ban Graphics",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "220",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Rayquaza-EX",
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards.",
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Emerald Break",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30×",
        "text": "This attack does 30 damage times the number of your Benched Pokémon."
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
      384
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/76_A.png",
      "large": "https://images.pokemontcg.io/cel25c/76_A_hires.png"
    }
  },
  {
    "id": "cel25c-86_A",
    "name": "Rocket's Admin.",
    "number": "86",
    "artist": "Ken Sugimori",
    "rarity": "Classic Collection",
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
      "Each player shuffles his or her hand into his or her deck. Then, each player counts his or her Prize cards left and draws up to that many cards. (You draw your cards first.)"
    ],
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
      "small": "https://images.pokemontcg.io/cel25c/86_A.png",
      "large": "https://images.pokemontcg.io/cel25c/86_A_hires.png"
    }
  },
  {
    "id": "cel25c-88_A",
    "name": "Mew ex",
    "number": "88",
    "artist": "Ryo Ueda",
    "rarity": "Classic Collection",
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
      "When Pokémon-ex has been knocked out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Versatile",
        "text": "Mew ex can use the attacks of all Pokémon in play as its own. (You still need the necessary Energy to use each attack.)",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Power Move",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Search your deck for an Energy card and attach it to Mew ex. Shuffle your deck afterward. Then, you may switch Mew ex with 1 of your Benched Pokémon."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/88_A.png",
      "large": "https://images.pokemontcg.io/cel25c/88_A_hires.png"
    }
  },
  {
    "id": "cel25c-93_A",
    "name": "Gardevoir ex δ",
    "number": "93",
    "artist": "Masahiko Ishii",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "150",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Kirlia",
    "evolvesTo": [],
    "rules": [
      "When Pokémon-ex has been knocked out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Imprison",
        "text": "Once during your turn (before your attack), if Gardevoir ex is your Active Pokémon, you may put an Imprison marker on 1 of your opponent's Pokémon. Any Pokémon that has any Imprison markers on it can't use any Poké-Powers or Poké-Bodies. This power can't be used if Gardevoir ex is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Flame Ball",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "You may move a Fire Energy card attached to Gardevoir ex to 1 of your Benched Pokémon."
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
      282
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/93_A.png",
      "large": "https://images.pokemontcg.io/cel25c/93_A_hires.png"
    }
  },
  {
    "id": "cel25c-97_A",
    "name": "Xerneas-EX",
    "number": "97",
    "artist": "5ban Graphics",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Break Through",
        "cost": [
          "Fairy",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "This attack does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "X Blast",
        "cost": [
          "Fairy",
          "Fairy",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "140",
        "text": "This Pokémon can't use X Blast during your next turn."
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
      716
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/97_A.png",
      "large": "https://images.pokemontcg.io/cel25c/97_A_hires.png"
    }
  },
  {
    "id": "cel25c-107_A",
    "name": "Donphan",
    "number": "107",
    "artist": "Kent Kanetsuna",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Prime"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Phanpy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Exoskeleton",
        "text": "Any damage done to Donphan by attacks is reduced by 20 (after applying Weakness and Resistance).",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Earthquake",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "60",
        "text": "Does 10 damage to each of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Heavy Impact",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Lightning",
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
      232
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/107_A.png",
      "large": "https://images.pokemontcg.io/cel25c/107_A_hires.png"
    }
  },
  {
    "id": "cel25c-109_A",
    "name": "Luxray GL LV.X",
    "number": "109",
    "artist": "Mitsuhiro Arita",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up",
      "SP"
    ],
    "hp": "110",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Luxray GL",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Luxray GL. Luxray GL LV. X can use any attack, Poké-Power, or Poké-Body from its previous Level."
    ],
    "abilities": [
      {
        "name": "Bright Look",
        "text": "Once during your turn (before your attack), when you put Luxray GL LV.X from your hand onto your Active Luxray GL, you may switch the Defending Pokémon with 1 of your opponent's Benched Pokémon.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Flash Impact",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Does 30 damage to 1 of your Pokémon, and don't apply Weakness and Resistance to this damage."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/109_A.png",
      "large": "https://images.pokemontcg.io/cel25c/109_A_hires.png"
    }
  },
  {
    "id": "cel25c-113_A",
    "name": "Reshiram",
    "number": "113",
    "artist": "5ban Graphics",
    "rarity": "Classic Collection",
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
        "name": "Outrage",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Does 10 more damage for each damage counter on this Pokémon."
      },
      {
        "name": "Blue Flare",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Discard 2 Fire Energy attached to this Pokémon."
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
      643
    ],
    "flavorText": "This Pokémon appears in legends. It sends flames into the air from its tail, burning up everything around it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/113_A.png",
      "large": "https://images.pokemontcg.io/cel25c/113_A_hires.png"
    }
  },
  {
    "id": "cel25c-114_A",
    "name": "Zekrom",
    "number": "114",
    "artist": "5ban Graphics",
    "rarity": "Classic Collection",
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
        "name": "Outrage",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Does 10 more damage for each damage counter on this Pokémon."
      },
      {
        "name": "Bolt Strike",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This Pokémon does 40 damage to itself."
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
      644
    ],
    "flavorText": "This Pokémon appears in legends. In its tail, it has a giant generator that creates electricity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/114_A.png",
      "large": "https://images.pokemontcg.io/cel25c/114_A_hires.png"
    }
  },
  {
    "id": "cel25c-145_A",
    "name": "Garchomp C LV.X",
    "number": "145",
    "artist": "Shizurow",
    "rarity": "Classic Collection",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up",
      "SP"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Garchomp C",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Garchomp C. Garchomp C LV.X can use any attack, Poké-Power, or Poké-Body from its previous Level."
    ],
    "abilities": [
      {
        "name": "Healing Breath",
        "text": "Once during your turn (before your attack), when you put Garchomp C LV.X from your hand onto your Active Garchomp C, you may remove all damage counters from each of your Pokémon SP.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Dragon Rush",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard 2 Energy attached to Garchomp C. Choose 1 of your opponent's Pokémon. This attack does 80 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) Garchomp C can't use Dragon Rush during your next turn."
      }
    ],
    "weaknesses": [
      {
        "type": "Colorless",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      445
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/cel25c/145_A.png",
      "large": "https://images.pokemontcg.io/cel25c/145_A_hires.png"
    }
  }
]

export default cardDetails
