import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "pl2-1",
    "name": "Arcanine",
    "number": "1",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Growlithe",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Flare Condition",
        "text": "As long as Arcanine has any Fire Energy attached to it, Arcanine has no Weakness.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Burn Out",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "You may do 30 damage plus 30 more damage. If you do, Arcanine is now Burned."
      },
      {
        "name": "Flames of Rage",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "Discard a Fire Energy attached to Arcanine. This attack does 60 damage plus 10 more damage for each damage counter on Arcanine."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
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
      59
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/1.png",
      "large": "https://images.pokemontcg.io/pl2/1_hires.png"
    }
  },
  {
    "id": "pl2-2",
    "name": "Bastiodon GL",
    "number": "2",
    "artist": "Hajime Kusajima",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
    ],
    "hp": "90",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bounce Back",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "Your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon."
      },
      {
        "name": "Smack Attack",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "60",
        "text": "Remove 1 damage counter from Bastiodon GL."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/2.png",
      "large": "https://images.pokemontcg.io/pl2/2_hires.png"
    }
  },
  {
    "id": "pl2-3",
    "name": "Darkrai G",
    "number": "3",
    "artist": "Makoto Imai",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Eerie Aura",
        "text": "Put 1 damage counter on each of your opponent's Pokémon that remains Asleep between turns.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Darkness Sleep",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "If the Defending Pokémon already has any damage counters on it, that Pokémon is now Asleep."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/3.png",
      "large": "https://images.pokemontcg.io/pl2/3_hires.png"
    }
  },
  {
    "id": "pl2-4",
    "name": "Floatzel GL",
    "number": "4",
    "artist": "Midori Harada",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Incite",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your discard pile for up to 2 Supporter cards, show them to your opponent, and put them into your hand."
      },
      {
        "name": "Giant Wave",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Floatzel GL can't use Giant Wave during your next turn."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/4.png",
      "large": "https://images.pokemontcg.io/pl2/4_hires.png"
    }
  },
  {
    "id": "pl2-5",
    "name": "Flygon",
    "number": "5",
    "artist": "Kouki Saitou",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "120",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Vibrava",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Rainbow Float",
        "text": "If any basic Energy card attached to Flygon is the same type as any of your Pokémon, the Retreat Cost for those Pokémon is 0.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Sand Wall",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Discard a Stadium card your opponent has in play. If you do, prevent all effects of an attack, including damage, done to Flygon during your opponent's next turn."
      },
      {
        "name": "Power Swing",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "Does 60 damage plus 10 more damage for each Evolved Pokémon on your Bench."
      }
    ],
    "weaknesses": [
      {
        "type": "Colorless",
        "value": "+30"
      }
    ],
    "resistances": [
      {
        "type": "Lightning",
        "value": "-20"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      330
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/5.png",
      "large": "https://images.pokemontcg.io/pl2/5_hires.png"
    }
  },
  {
    "id": "pl2-6",
    "name": "Froslass GL",
    "number": "6",
    "artist": "Atsuko Nishida",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Sleep Inducer",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch the Defending Pokémon with 1 of your opponent's Benched Pokémon. The new Defending Pokémon is now Asleep."
      },
      {
        "name": "Wake-Up Slap",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If the Defending Pokémon is affected by any Special Conditions, this attack does 30 damage plus 20 more damage. Then, remove all Special Conditions from the Defending Pokémon."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/6.png",
      "large": "https://images.pokemontcg.io/pl2/6_hires.png"
    }
  },
  {
    "id": "pl2-7",
    "name": "Jirachi",
    "number": "7",
    "artist": "Kenkichi Toyama",
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
        "name": "Final Wish",
        "text": "Once during your opponent's turn, if Jirachi would be Knocked Out by damage from an attack, you may search your deck for any 1 card and put it into your hand. Shuffle your deck afterward.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Detour",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "If you have a Supporter card in play, use the effect of that card as the effect of this attack."
      },
      {
        "name": "Swift",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "This attack's damage isn't affected by Weakness, Resistance, Poké-Powers, Poké-Bodies, or any other effects on the Defending Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "+20"
      }
    ],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      385
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/7.png",
      "large": "https://images.pokemontcg.io/pl2/7_hires.png"
    }
  },
  {
    "id": "pl2-8",
    "name": "Lucario GL",
    "number": "8",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
    ],
    "hp": "80",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Boundary Aura",
        "text": "Apply Weakness for each Pokémon (both yours and your opponent's) as ×2 instead.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Combo Throw",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Does 30 damage plus 10 more damage for each Energy attached to the Defending Pokémon."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/8.png",
      "large": "https://images.pokemontcg.io/pl2/8_hires.png"
    }
  },
  {
    "id": "pl2-9",
    "name": "Luxray GL",
    "number": "9",
    "artist": "Kouki Saitou",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Bite",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Trash Bolt",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Discard an Energy card from your hand. (If you can't discard a card from your hand, this attack does nothing.)"
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
      405
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/9.png",
      "large": "https://images.pokemontcg.io/pl2/9_hires.png"
    }
  },
  {
    "id": "pl2-10",
    "name": "Mismagius GL",
    "number": "10",
    "artist": "Naoyo Kimura",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Psychic Removal",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip 2 coins. If both of them are heads, discard all Energy attached to the Defending Pokémon."
      },
      {
        "name": "Grudge",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Does 20 damage plus 10 more damage for each Prize card your opponent has taken."
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
        "type": "Colorless",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      429
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/10.png",
      "large": "https://images.pokemontcg.io/pl2/10_hires.png"
    }
  },
  {
    "id": "pl2-11",
    "name": "Rampardos GL",
    "number": "11",
    "artist": "Suwama Chiaki",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Trample",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip a coin for each Benched Pokémon (both yours and your opponent's). If that coin flip is heads, this attack does 30 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Rend",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "If the Defending Pokémon has any damage counters on it, this attack does 40 damage plus 20 more damage."
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
      409
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/11.png",
      "large": "https://images.pokemontcg.io/pl2/11_hires.png"
    }
  },
  {
    "id": "pl2-12",
    "name": "Roserade GL",
    "number": "12",
    "artist": "Kanako Eo",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Poison Bind",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "The Defending Pokémon is now Poisoned and can't retreat during your opponent's next turn."
      },
      {
        "name": "Long Whip",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "If the Defending Pokémon is affected by any Special Conditions, you may do 30 damage to any 1 Benched Pokémon instead. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/12.png",
      "large": "https://images.pokemontcg.io/pl2/12_hires.png"
    }
  },
  {
    "id": "pl2-13",
    "name": "Shiftry",
    "number": "13",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Nuzleaf",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Unlucky Wind",
        "text": "As long as Shiftry is your Active Pokémon, whenever your opponent flips a coin during his or her turn, treat it as tails.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Conform",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "If you have the same number of cards in your hand as your opponent, the Defending Pokémon is now Confused."
      },
      {
        "name": "Seal Off",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "The Defending Pokémon can't use any Poké-Powers or Poké-Bodies during your opponent's next turn."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "+30"
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
      275
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/13.png",
      "large": "https://images.pokemontcg.io/pl2/13_hires.png"
    }
  },
  {
    "id": "pl2-14",
    "name": "Aggron",
    "number": "14",
    "artist": "Naoyo Kimura",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Lairon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Return Blow",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "If Aggron was damaged by an attack during your opponent's last turn, this attack does the same amount of damage done to Aggron to the Defending Pokémon."
      },
      {
        "name": "Metal Fang",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "You may discard the top card of your deck. If you do, remove 2 damage counters and all Special Conditions from Aggron."
      },
      {
        "name": "Heavy Impact",
        "cost": [
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "70",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "+30"
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
      306
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/14.png",
      "large": "https://images.pokemontcg.io/pl2/14_hires.png"
    }
  },
  {
    "id": "pl2-15",
    "name": "Beedrill",
    "number": "15",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "110",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Kakuna",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Flutter Wings",
        "text": "Once during your turn (before your attack), you may search your deck for a Grass Pokémon, show it to your opponent, and put it into your hand. Shuffle your deck afterward. This power can't be used if Beedrill is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Needle Shock",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "The Defending Pokémon is now Paralyzed and Poisoned. Ignore this effect if any of your Pokémon used Needle Shock during your last turn."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "+30"
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
    "flavorText": "Its best attack involves flying around at high speed, striking with poison needles, then flying off.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/15.png",
      "large": "https://images.pokemontcg.io/pl2/15_hires.png"
    }
  },
  {
    "id": "pl2-16",
    "name": "Bronzong E4",
    "number": "16",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Hand Refresh",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Each player shuffles his or her hand into his or her deck and draws up to 4 cards. (You draw your cards first.)"
      },
      {
        "name": "Payback",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "If your opponent has only 1 Prize card left, this attack does 10 damage plus 50 more damage and the Defending Pokémon is now Confused."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Fire",
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/16.png",
      "large": "https://images.pokemontcg.io/pl2/16_hires.png"
    }
  },
  {
    "id": "pl2-17",
    "name": "Drapion E4",
    "number": "17",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Body Slam",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Mega Impact",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
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
      452
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/17.png",
      "large": "https://images.pokemontcg.io/pl2/17_hires.png"
    }
  },
  {
    "id": "pl2-18",
    "name": "Espeon E4",
    "number": "18",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Hypnosis",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Psywave",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Does 20 damage plus 10 more damage for each Energy attached to the Defending Pokémon."
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
      196
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/18.png",
      "large": "https://images.pokemontcg.io/pl2/18_hires.png"
    }
  },
  {
    "id": "pl2-19",
    "name": "Flareon",
    "number": "19",
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
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Undevelop",
        "text": "Once during your turn (before your attack), you may devolve Flareon and put Flareon into your hand. This power can't be used if Flareon is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Tail Slap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Evolving Flare",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40+",
        "text": "If Flareon evolved from Eevee during this turn, this attack does 40 damage plus 20 more damage and the Defending Pokémon is now Burned."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "+20"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      136
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/19.png",
      "large": "https://images.pokemontcg.io/pl2/19_hires.png"
    }
  },
  {
    "id": "pl2-20",
    "name": "Gallade E4",
    "number": "20",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Chop Up",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Does 10 damage to each of your opponent's Benched Pokémon that has any damage counters on it. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Feint",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
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
      475
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/20.png",
      "large": "https://images.pokemontcg.io/pl2/20_hires.png"
    }
  },
  {
    "id": "pl2-21",
    "name": "Gastrodon East Sea",
    "number": "21",
    "artist": "Ken Sugimori",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Shellos East Sea",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Sticky Hold",
        "text": "If Gastrodon East Sea is switched or retreats to your Bench, move as many Energy cards attached to Gastrodon East Sea as you like to the new Active Pokémon.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Calling Wave",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Gastrodon and put them onto your Bench as Basic Pokémon. Put 2 damage counters on each of them. Shuffle your deck afterward."
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
        "type": "Grass",
        "value": "+30"
      }
    ],
    "resistances": [
      {
        "type": "Lightning",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      423
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/21.png",
      "large": "https://images.pokemontcg.io/pl2/21_hires.png"
    }
  },
  {
    "id": "pl2-22",
    "name": "Gastrodon West Sea",
    "number": "22",
    "artist": "Kyoko Umemoto",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Shellos West Sea",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tackle",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Muddy Bomb",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 30 damage to that Pokémon and 10 damage to each of your opponent's other Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Raging Sea",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "60+",
        "text": "Does 60 damage plus 10 more damage for each of your Benched Pokémon that has any damage counters on it."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "+30"
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      423
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/22.png",
      "large": "https://images.pokemontcg.io/pl2/22_hires.png"
    }
  },
  {
    "id": "pl2-23",
    "name": "Golem E4",
    "number": "23",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Rage",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20+",
        "text": "Does 20 damage plus 10 more damage for each damage counter on Golem GL."
      },
      {
        "name": "Double-edge",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": "Golem E4 does 60 damage to itself."
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
      76
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/23.png",
      "large": "https://images.pokemontcg.io/pl2/23_hires.png"
    }
  },
  {
    "id": "pl2-24",
    "name": "Heracross E4",
    "number": "24",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Focus Energy",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "During your next turn, Heracross E4's Megahorn attack's base damage is 100."
      },
      {
        "name": "Megahorn",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      214
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/24.png",
      "large": "https://images.pokemontcg.io/pl2/24_hires.png"
    }
  },
  {
    "id": "pl2-25",
    "name": "Hippowdon",
    "number": "25",
    "artist": "Tomoaki Imakuni",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Hippopotas",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Sand Cover",
        "text": "As long as Hippowdon is your Active Pokémon, put 1 damage counter on each of your opponent's Pokémon LV.X between turns.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Save Sand",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "Does 20 damage plus 10 more damage for each Energy attached to Hippowdon. Before doing damage, you may search your discard pile for a Fighting Energy card and attach it to Hippowdon."
      },
      {
        "name": "Groundquake",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "Does 10 damage to each Benched Pokémon that isn't an Evolved Pokémon (both yours and your opponent's). (Don't apply Weakness and Resistance for Benched Pokémon)."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "+20"
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
      450
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/25.png",
      "large": "https://images.pokemontcg.io/pl2/25_hires.png"
    }
  },
  {
    "id": "pl2-26",
    "name": "Jolteon",
    "number": "26",
    "artist": "Hajime Kusajima",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Undevelop",
        "text": "Once during your turn (before your attack), you may devolve Jolteon and put Jolteon into your hand. This power can't be used if Jolteon is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Quick Attack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 30 more damage."
      },
      {
        "name": "Evolving Thunder",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "If Jolteon evolved from Eevee during this turn, this attack does 10 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon)."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "+20"
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
      135
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/26.png",
      "large": "https://images.pokemontcg.io/pl2/26_hires.png"
    }
  },
  {
    "id": "pl2-27",
    "name": "Mamoswine GL",
    "number": "27",
    "artist": "Atsuko Nishida",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Icy Aura",
        "text": "As long as Mamoswine GL is your Active Pokémon, put 1 damage counter on each Active Pokémon (excluding Water Pokémon) (both yours and your opponent's) between turns.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Avalanche",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "60",
        "text": "Flip a coin. If heads, this attack does 10 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      473
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/27.png",
      "large": "https://images.pokemontcg.io/pl2/27_hires.png"
    }
  },
  {
    "id": "pl2-28",
    "name": "Mr. Mime E4",
    "number": "28",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Magic Heal",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Flip 3 coins. Remove a number of damage counters equal to the number of heads from your Pokémon in any way you like."
      },
      {
        "name": "Barrier Attack",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "During your opponent's next turn, any damage done to Mr. Mime E4 by attacks is reduced by 10 (after applying Weakness and Resistance)."
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
      122
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/28.png",
      "large": "https://images.pokemontcg.io/pl2/28_hires.png"
    }
  },
  {
    "id": "pl2-29",
    "name": "Nidoking",
    "number": "29",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Nidorino",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Territoriality",
        "text": "If your Active Pokémon is damaged by an opponent's attack (even if that Pokémon is Knocked Out), put 2 damage counters on the Attacking Pokémon. You can't put more than 2 damage counters in this way.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Fling Away",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "If your opponent has any Benched Pokémon, this attack's base damage is 30 instead of 60 and this attack does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Giga Horn",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": "Flip 2 coins. If both of them are tails, this attack does nothing."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "+30"
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      34
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/29.png",
      "large": "https://images.pokemontcg.io/pl2/29_hires.png"
    }
  },
  {
    "id": "pl2-30",
    "name": "Nidoqueen",
    "number": "30",
    "artist": "Midori Harada",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "120",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Nidorina",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Maternal Comfort",
        "text": "At any times between turns, remove 1 damage counter from each of your Pokémon. You can't use more than 1 Maternal Comfort Poké-Body between turns.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Mega Punch",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Ruthless Tail",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "Does 50 damage plus 10 more damage for each of your opponent's Benched Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "+30"
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      31
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/30.png",
      "large": "https://images.pokemontcg.io/pl2/30_hires.png"
    }
  },
  {
    "id": "pl2-31",
    "name": "Raichu GL",
    "number": "31",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Thunder Throw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 2 of your opponent's Benched Pokémon. This attack does 10 damage to each of them. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Repeat Lightning",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "Does 30 damage plus 10 more damage for each of your opponent's Benched Pokémon that has any damage counters on it."
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
      26
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/31.png",
      "large": "https://images.pokemontcg.io/pl2/31_hires.png"
    }
  },
  {
    "id": "pl2-32",
    "name": "Rhyperior E4",
    "number": "32",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Double Lariat",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "Flip 2 coins. This attack does 30 damage times the number of heads."
      },
      {
        "name": "Rock Tumble",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "60",
        "text": "This attack's damage isn't affected by Resistance."
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      464
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/32.png",
      "large": "https://images.pokemontcg.io/pl2/32_hires.png"
    }
  },
  {
    "id": "pl2-33",
    "name": "Snorlax",
    "number": "33",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pick and Collect",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your discard pile for up to 4 basic Energy cards, show them to your opponent, and put them into your hand."
      },
      {
        "name": "Roll Over",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "60",
        "text": "Flip a coin. If heads, both Snorlax and the Defending Pokémon are now Asleep. If tails, Snorlax is now Asleep."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "+20"
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
    "flavorText": "It stops eating only to sleep. It doesn't feel full unless it eats nearly 900 pounds a day.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/33.png",
      "large": "https://images.pokemontcg.io/pl2/33_hires.png"
    }
  },
  {
    "id": "pl2-34",
    "name": "Vaporeon",
    "number": "34",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Undevelop",
        "text": "Once during your turn (before your attack), you may devolve Vaporeon and put Vaporeon into your hand. This power can't be used if Vaporeon is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Muddy Water",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Does 10 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Evolving Aqua",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon that has any damage counters on it. This attack does 40 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) If Vaporeon evolved from Eevee during this turn, this attack does 60 damage instead."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
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
      134
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/34.png",
      "large": "https://images.pokemontcg.io/pl2/34_hires.png"
    }
  },
  {
    "id": "pl2-35",
    "name": "Vespiquen E4",
    "number": "35",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Royal Gain",
        "text": "When you attach a Grass Energy card from your hand to Vespiquen E4, remove 1 damage counter from Vespiquen E4.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Leaf Needle",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Flip a coin for each Grass Energy attached to Vespiquen E4. This attack does 30 damage plus 20 more damage for each heads."
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
      416
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/35.png",
      "large": "https://images.pokemontcg.io/pl2/35_hires.png"
    }
  },
  {
    "id": "pl2-36",
    "name": "Walrein",
    "number": "36",
    "artist": "kawayoo",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Sealeo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Gather Ice",
        "text": "Once during your turn (before your attack), when you play Walrein from your hand to evolve 1 of your Pokémon, you may attach as many Water Energy cards from your hand to Walrein as you like.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Cold Crush",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "70",
        "text": "Discard an Energy card attached to Walrein and then discard an Energy card attached to the Defending Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "+30"
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
      365
    ],
    "flavorText": "It shatters ice with its big tusks. Its thick blubber repels not only the cold, but also enemy attacks.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/36.png",
      "large": "https://images.pokemontcg.io/pl2/36_hires.png"
    }
  },
  {
    "id": "pl2-37",
    "name": "Yanmega E4",
    "number": "37",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Skill Dive",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 10 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Whirlwind",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/37.png",
      "large": "https://images.pokemontcg.io/pl2/37_hires.png"
    }
  },
  {
    "id": "pl2-38",
    "name": "Alakazam E4",
    "number": "38",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Recover",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard a Psychic Energy attached to Alakazam E4 and remove 4 damage counters from Alakazam E4."
      },
      {
        "name": "Mysterious Beam",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "Flip a coin. If heads, discard an Energy card attached to the Defending Pokémon."
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
      65
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/38.png",
      "large": "https://images.pokemontcg.io/pl2/38_hires.png"
    }
  },
  {
    "id": "pl2-39",
    "name": "Electrode G",
    "number": "39",
    "artist": "Yusuke Ishikawa",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Reckless Bomb",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 20 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) Electrode G does 100 damage to itself."
      },
      {
        "name": "Reflect Energy",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Move an Energy card attached to Electrode G to 1 of your Benched Pokémon."
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
      101
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/39.png",
      "large": "https://images.pokemontcg.io/pl2/39_hires.png"
    }
  },
  {
    "id": "pl2-40",
    "name": "Gengar GL",
    "number": "40",
    "artist": "Naoyo Kimura",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Confuse Ray",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "The Defending Pokémon is now Confused."
      },
      {
        "name": "Attack and Hide",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Put 3 damage counters on 1 of your opponent's Pokémon. You may shuffle Gengar GL and all cards attached to it back into your deck."
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
        "type": "Colorless",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      94
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/40.png",
      "large": "https://images.pokemontcg.io/pl2/40_hires.png"
    }
  },
  {
    "id": "pl2-41",
    "name": "Glaceon",
    "number": "41",
    "artist": "Naoyo Kimura",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Frost Wind",
        "text": "As long as Glaceon is your Active Pokémon, any damage done to your Pokémon by your opponent's attacks is reduced by 10 (after applying Weakness and Resistance).",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Ice Blade",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 30 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Ice Bind",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "If your opponent doesn't discard a card from his or her hand, the Defending Pokémon is now Paralyzed."
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "+20"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      471
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/41.png",
      "large": "https://images.pokemontcg.io/pl2/41_hires.png"
    }
  },
  {
    "id": "pl2-42",
    "name": "Hippowdon E4",
    "number": "42",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Sand Armor",
        "text": "If Hippowdon E4 has any Fighting Energy attached to it, any damage done to Hippowdon E4 by attacks is reduced by 10 (after applying Weakness and Resistance).",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Bite and Crush",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Flip 2 coins. This attack does 30 damage plus 10 more damage for each heads."
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      450
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/42.png",
      "large": "https://images.pokemontcg.io/pl2/42_hires.png"
    }
  },
  {
    "id": "pl2-43",
    "name": "Infernape E4",
    "number": "43",
    "artist": "Masakazu Fukuda",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
    ],
    "hp": "90",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
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
        "text": "Choose 2 of your opponent's Pokémon. This attack does 20 damage to each of them. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "High Jump Kick",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      392
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/43.png",
      "large": "https://images.pokemontcg.io/pl2/43_hires.png"
    }
  },
  {
    "id": "pl2-44",
    "name": "Lairon",
    "number": "44",
    "artist": "Yukiko Baba",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Aron",
    "evolvesTo": [
      "Aggron"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Heavy Metal",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin for each Metal Energy attached to Lairon. This attack does 10 damage plus 20 more damage for each heads."
      },
      {
        "name": "Granite Head",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "During your opponent's next turn, any damage done to Lairon by attacks is reduced by 10 (after applying Weakness and Resistance)."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "+20"
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
      305
    ],
    "flavorText": "For food, it digs up iron ore. It smashes its steely body against others to fight over territory.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/44.png",
      "large": "https://images.pokemontcg.io/pl2/44_hires.png"
    }
  },
  {
    "id": "pl2-45",
    "name": "Leafeon",
    "number": "45",
    "artist": "Suwama Chiaki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Energy Refresh",
        "text": "As long as Leafeon is your Active Pokémon, whenever you attach an Energy card from your hand to 1 of your Pokémon, remove 2 damage counters from that Pokémon.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Plus Energy",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Attach a basic Energy card from your hand to 1 of your Pokémon."
      },
      {
        "name": "Soothing Scent",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "The Defending Pokémon is now Asleep."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "+20"
      }
    ],
    "resistances": [
      {
        "type": "Water",
        "value": "-20"
      }
    ],
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/45.png",
      "large": "https://images.pokemontcg.io/pl2/45_hires.png"
    }
  },
  {
    "id": "pl2-46",
    "name": "Machamp GL",
    "number": "46",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Cross-Cut",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "If the Defending Pokémon is an Evolved Pokémon, this attack does 30 damage plus 20 more damage."
      },
      {
        "name": "Brush Off",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "",
        "text": "Put the Defending Pokémon and all cards attached to it on top of your opponent's deck. Your opponent shuffles his or her deck afterward. (If your opponent doesn't have any Benched Pokémon, this attack does nothing.)"
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
      68
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/46.png",
      "large": "https://images.pokemontcg.io/pl2/46_hires.png"
    }
  },
  {
    "id": "pl2-47",
    "name": "Rapidash E4",
    "number": "47",
    "artist": "Masakazu Fukuda",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Pickup Power",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Flip 3 coins. For each heads, search your discard pile for a basic Energy card, show it to your opponent, and put it into your hand."
      },
      {
        "name": "Fire Mane",
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
      78
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/47.png",
      "large": "https://images.pokemontcg.io/pl2/47_hires.png"
    }
  },
  {
    "id": "pl2-48",
    "name": "Scizor E4",
    "number": "48",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Cut",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Crushing Blow",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "Flip a coin. If heads, discard an Energy card attached to the Defending Pokémon."
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
      212
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/48.png",
      "large": "https://images.pokemontcg.io/pl2/48_hires.png"
    }
  },
  {
    "id": "pl2-49",
    "name": "Sharpedo",
    "number": "49",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Carvanha",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Energy Shark",
        "text": "If Sharpedo is your Active Pokémon and is damaged by an opponent's attack (even if Sharpedo is Knocked Out), flip a coin. If heads, discard an Energy card attached to the Attacking Pokémon.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Crunch",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "If an attack does damage to the Defending Pokémon (after applying Weakness and Resistance), that attack does 40 more damage to that Pokémon until the end of your next turn."
      },
      {
        "name": "Sharp Fang",
        "cost": [
          "Darkness",
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
        "value": "+20"
      }
    ],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      319
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/49.png",
      "large": "https://images.pokemontcg.io/pl2/49_hires.png"
    }
  },
  {
    "id": "pl2-50",
    "name": "Starmie",
    "number": "50",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Staryu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Aqua Recycle",
        "text": "Once during your turn (before your attack), you may search your discard pile for a Water Energy card, show it to your opponent, and put it into your hand. This power can't be used if Starmie is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Synchro Gain",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "If Starmie and the Defending Pokémon have the same amount of Energy attached to them, remove 4 damage counters from Starmie."
      },
      {
        "name": "Powerful Spin",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "Starmie can't attack during your next turn."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "+20"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      121
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/50.png",
      "large": "https://images.pokemontcg.io/pl2/50_hires.png"
    }
  },
  {
    "id": "pl2-51",
    "name": "Steelix GL",
    "number": "51",
    "artist": "Hajime Kusajima",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
    ],
    "hp": "110",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mend",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Search your discard pile for a Metal Energy card and attach it to Steelix GL. If you do, remove 1 damage counter from Steelix GL."
      },
      {
        "name": "Squeeze",
        "cost": [
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 30 damage plus 50 more damage and the Defending Pokémon is now Paralyzed."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      208
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/51.png",
      "large": "https://images.pokemontcg.io/pl2/51_hires.png"
    }
  },
  {
    "id": "pl2-52",
    "name": "Tropius",
    "number": "52",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
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
        "name": "Fly",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If tails, this attack does nothing. If heads, prevent all effects of an attack, including damage, done to Tropius during your opponent's next turn."
      },
      {
        "name": "Blessed Fruit",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Remove all damage counters from 1 of your Benched Grass Pokémon."
      },
      {
        "name": "Solarbeam",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "60",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "+20"
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
      357
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/52.png",
      "large": "https://images.pokemontcg.io/pl2/52_hires.png"
    }
  },
  {
    "id": "pl2-53",
    "name": "Vibrava",
    "number": "53",
    "artist": "Kyoko Umemoto",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Trapinch",
    "evolvesTo": [
      "Flygon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Energy Typhoon",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "Does 20 damage times the number of Energy cards in your opponent's discard pile. Then, put those Energy cards on top of your opponent's deck. Your opponent shuffles his or her deck afterward."
      },
      {
        "name": "Quick Attack",
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
        "value": "+20"
      }
    ],
    "resistances": [
      {
        "type": "Lightning",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      329
    ],
    "flavorText": "It violently shudders its wings, generating ultrasonic waves to induce headaches in people.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/53.png",
      "large": "https://images.pokemontcg.io/pl2/53_hires.png"
    }
  },
  {
    "id": "pl2-54",
    "name": "Whiscash E4",
    "number": "54",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Sleep Pulse",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Earthquake",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Does 10 damage to each of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
        "type": "Lightning",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      340
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/54.png",
      "large": "https://images.pokemontcg.io/pl2/54_hires.png"
    }
  },
  {
    "id": "pl2-55",
    "name": "Aerodactyl GL",
    "number": "55",
    "artist": "Suwama Chiaki",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Collect",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw 2 cards."
      },
      {
        "name": "Primal Breath",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Your opponent can't play any Pokémon from his or her hand to Evolve or to Level-Up the Defending Pokémon during his or her next turn."
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
      142
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/55.png",
      "large": "https://images.pokemontcg.io/pl2/55_hires.png"
    }
  },
  {
    "id": "pl2-56",
    "name": "Ambipom G",
    "number": "56",
    "artist": "Makoto Imai",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Tail Code",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Move an Energy card attached to the Defending Pokémon to another of your opponent's Pokémon."
      },
      {
        "name": "Snap Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "If the Defending Pokémon has any Energy cards attached to it, this attack's base damage is 20 instead of 60."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/56.png",
      "large": "https://images.pokemontcg.io/pl2/56_hires.png"
    }
  },
  {
    "id": "pl2-57",
    "name": "Aron",
    "number": "57",
    "artist": "Takao Unno",
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
      "Lairon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Iron Head",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip a coin until you get tails. This attack does 10 damage times the number of heads."
      },
      {
        "name": "Ram",
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
        "value": "+10"
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
      304
    ],
    "flavorText": "It usually lives deep in mountains. However, hunger may drive it to eat railroad tracks and cars.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/57.png",
      "large": "https://images.pokemontcg.io/pl2/57_hires.png"
    }
  },
  {
    "id": "pl2-58",
    "name": "Carvanha",
    "number": "58",
    "artist": "Midori Harada",
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
      "Sharpedo"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scary Face",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon can't attack or retreat during your opponent's next turn."
      },
      {
        "name": "Whirlpool",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, discard an Energy attached to the Defending Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "+10"
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
      318
    ],
    "flavorText": "They swarm any foes that invades their territory. Their sharp fangs can tear out boat hulls.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/58.png",
      "large": "https://images.pokemontcg.io/pl2/58_hires.png"
    }
  },
  {
    "id": "pl2-59",
    "name": "Eevee",
    "number": "59",
    "artist": "Naoyo Kimura",
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
        "name": "Signs of Evolution",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your deck for up to 2 cards that evolve from Eevee, show them to your opponent, and put them into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Bounce",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Switch Eevee with 1 of your Benched Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "+10"
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
    "flavorText": "Because its genetic makeup is irregular, it quickly changes its form due to a variety of causes.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/59.png",
      "large": "https://images.pokemontcg.io/pl2/59_hires.png"
    }
  },
  {
    "id": "pl2-60",
    "name": "Flareon E4",
    "number": "60",
    "artist": "Masakazu Fukuda",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
      },
      {
        "name": "Fire Tail Slap",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Flip a coin. If tails, discard a Fire Energy attached to Flareon ."
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
      136
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/60.png",
      "large": "https://images.pokemontcg.io/pl2/60_hires.png"
    }
  },
  {
    "id": "pl2-61",
    "name": "Forretress G",
    "number": "61",
    "artist": "Ryota Saito",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Shell Scatter",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 10 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) Forretress G can't use Shell Scatter during your next turn."
      },
      {
        "name": "Bomb Risk",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Does 10 damage to each Benched Pokémon (both yours and your opponent's). (Don't apply Weakness and Resistance for Benched Pokémon.) Flip a coin. If tails, Forretress G does 80 damage to itself."
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
      205
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/61.png",
      "large": "https://images.pokemontcg.io/pl2/61_hires.png"
    }
  },
  {
    "id": "pl2-62",
    "name": "Gliscor E4",
    "number": "62",
    "artist": "Kagemaru Himeno",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Irongrip",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Loaded Needle",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 30 more damage. If tails, the Defending Pokémon is now Poisoned."
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
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      472
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/62.png",
      "large": "https://images.pokemontcg.io/pl2/62_hires.png"
    }
  },
  {
    "id": "pl2-63",
    "name": "Growlithe",
    "number": "63",
    "artist": "Naoyo Kimura",
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
      "Arcanine"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stoke",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Fire Energy card and attach it to Growlithe. Shuffle your deck afterward."
      },
      {
        "name": "Take Down",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Growlithe does 10 damage to itself."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
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
      58
    ],
    "flavorText": "A Pokémon with a loyal nature. It will remain motionless until it is given an order by its Trainer.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/63.png",
      "large": "https://images.pokemontcg.io/pl2/63_hires.png"
    }
  },
  {
    "id": "pl2-64",
    "name": "Hippopotas",
    "number": "64",
    "artist": "kawayoo",
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
      "Hippowdon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Push Down",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon."
      },
      {
        "name": "Endeavor",
        "cost": [
          "Fighting",
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
        "type": "Water",
        "value": "+10"
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      449
    ],
    "flavorText": "It shuts its nostrils tight then travels through sand as if walking. They form colonies of around ten.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/64.png",
      "large": "https://images.pokemontcg.io/pl2/64_hires.png"
    }
  },
  {
    "id": "pl2-65",
    "name": "Houndoom E4",
    "number": "65",
    "artist": "Masakazu Fukuda",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
    ],
    "hp": "80",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Corner",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      },
      {
        "name": "Fire Fang",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "The Defending Pokémon is now Burned."
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
      229
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/65.png",
      "large": "https://images.pokemontcg.io/pl2/65_hires.png"
    }
  },
  {
    "id": "pl2-66",
    "name": "Kakuna",
    "number": "66",
    "artist": "Midori Harada",
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
        "name": "Exoskeleton",
        "text": "Any damage done to Kakuna by attacks is reduced by 20 (after applying Weakness and Resistance).",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Dangerous Evolution",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Poisoned. Flip a coin. If heads, search your deck for an Evolution card that evolves from Kakuna and put it onto Kakuna. (This counts as evolving Kakuna.) Shuffle your deck afterward."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
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
      14
    ],
    "flavorText": "While awaiting evolution, it hides from predators under leaves and in nooks of branches.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/66.png",
      "large": "https://images.pokemontcg.io/pl2/66_hires.png"
    }
  },
  {
    "id": "pl2-67",
    "name": "Kecleon",
    "number": "67",
    "artist": "Midori Harada",
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
        "name": "Colorful Body",
        "text": "Kecleon's type is Grass Fire Water Lightning Psychic Fighting Darkness Metal Colorless.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Triple Smash",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "10+",
        "text": "Flip 3 coins. This attack does 10 damage plus 20 more damage for each heads."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "+20"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      352
    ],
    "flavorText": "It can freely change its body's color. The zigzag pattern on its belly doesn't change, however.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/67.png",
      "large": "https://images.pokemontcg.io/pl2/67_hires.png"
    }
  },
  {
    "id": "pl2-68",
    "name": "Koffing",
    "number": "68",
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
      "Weezing"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Offensive Gas",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused and Poisoned."
      },
      {
        "name": "Gas Bomb",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Koffing does 30 damage to itself, and don't apply Weakness and Resistance to this damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "+10"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      109
    ],
    "flavorText": "Lighter-than-air gases in its body keep it aloft. The gases not only smell, they are also explosive.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/68.png",
      "large": "https://images.pokemontcg.io/pl2/68_hires.png"
    }
  },
  {
    "id": "pl2-69",
    "name": "Munchlax",
    "number": "69",
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
      "Snorlax"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Baby Evolution",
        "text": "Once during your turn (before your attack), you may put Snorlax from your hand onto Munchlax (this counts as evolving Munchlax) and remove all damage counters from Munchlax.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Rest",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Remove all Special Conditions and 6 damage counters from Munchlax. Munchlax is now Asleep."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "+10"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      446
    ],
    "flavorText": "In its desperation to gulp down food, it forgets about the food it has hidden under its fur.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/69.png",
      "large": "https://images.pokemontcg.io/pl2/69_hires.png"
    }
  },
  {
    "id": "pl2-70",
    "name": "Munchlax",
    "number": "70",
    "artist": "Kagemaru Himeno",
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
      "Snorlax"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Baby Evolution",
        "text": "Once during your turn (before your attack), you may put Snorlax from your hand onto Munchlax (this counts as evolving Munchlax) and remove all damage counters from Munchlax.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Errand-Running",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Search your deck for a Trainer card, show it to your opponent, and put it into your hand. Shuffle your deck afterward."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
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
      446
    ],
    "flavorText": "It hides food under its long body hair. However, it forgets it has hidden the food.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/70.png",
      "large": "https://images.pokemontcg.io/pl2/70_hires.png"
    }
  },
  {
    "id": "pl2-71",
    "name": "Nidoran ♀",
    "number": "71",
    "artist": "Miki Tanaka",
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
      "Nidorina"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scratch",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Offer Help",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Search your deck for a Supporter card, show it to your opponent, and put it into your hand. Shuffle your deck afterward."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "+10"
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
    "flavorText": "While it does not prefer to fight, even one drop of the poison it secretes from barbs can be fatal.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/71.png",
      "large": "https://images.pokemontcg.io/pl2/71_hires.png"
    }
  },
  {
    "id": "pl2-72",
    "name": "Nidoran ♂",
    "number": "72",
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
      "Nidorino"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Leer",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon can't attack during your opponent's next turn."
      },
      {
        "name": "Horn Hazard",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Flip a coin. If tails, this attack does nothing."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "+10"
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
    "flavorText": "It scans its surroundings by raising its ears out of the grass. Its toxic horn is for protection.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/72.png",
      "large": "https://images.pokemontcg.io/pl2/72_hires.png"
    }
  },
  {
    "id": "pl2-73",
    "name": "Nidorina",
    "number": "73",
    "artist": "Ken Sugimori",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Nidoran ♀",
    "evolvesTo": [
      "Nidoqueen"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Jump Tackle",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Nidorina does 10 damage to itself, and don't apply Weakness and Resistance to this damage."
      },
      {
        "name": "Stress Poison",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "If Nidorina has any damage counters on it, this attack does 40 damage plus 20 more damage and the Defending Pokémon is now Poisoned."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
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
      30
    ],
    "flavorText": "When it senses danger, it raises all the barbs on its body. These barbs grow slower than NIDORINO's.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/73.png",
      "large": "https://images.pokemontcg.io/pl2/73_hires.png"
    }
  },
  {
    "id": "pl2-74",
    "name": "Nidorino",
    "number": "74",
    "artist": "kawayoo",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Nidoran ♂",
    "evolvesTo": [
      "Nidoking"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Toxic",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "The Defending Pokémon is now Poisoned. Put 2 damage counters instead of 1 on the Defending Pokémon between turns."
      },
      {
        "name": "Frustration",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon that doesn't have any damage counters on it. This attack does 40 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "+20"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      33
    ],
    "flavorText": "It has a violent disposition and stabs foes with its horn, which oozes poison upon impact.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/74.png",
      "large": "https://images.pokemontcg.io/pl2/74_hires.png"
    }
  },
  {
    "id": "pl2-75",
    "name": "Nuzleaf",
    "number": "75",
    "artist": "Yukiko Baba",
    "rarity": "Common",
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
        "name": "Blind",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "If the Defending Pokémon tries to attack during your opponent's next turn, your opponent flips a coin. If tails, that attack does nothing."
      },
      {
        "name": "Feint Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 30 damage to that Pokémon. This attack's damage isn't affected by Weakness, Resistance, Poké-Powers, Poké-Bodies, or any other effects on that Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "+20"
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
      274
    ],
    "flavorText": "The sound of its grass flute makes its listeners uneasy. It lives deep in forests.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/75.png",
      "large": "https://images.pokemontcg.io/pl2/75_hires.png"
    }
  },
  {
    "id": "pl2-76",
    "name": "Quagsire GL",
    "number": "76",
    "artist": "Midori Harada",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Submerge",
        "text": "As long as Quagsire GL is on your Bench, prevent all damage done to Quagsire GL by attacks (both yours and your opponent's).",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Punch and Run",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "You may switch Quagsire GL with 1 of your Benched Pokémon."
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
        "type": "Lightning",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      195
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/76.png",
      "large": "https://images.pokemontcg.io/pl2/76_hires.png"
    }
  },
  {
    "id": "pl2-77",
    "name": "Sealeo",
    "number": "77",
    "artist": "Saya Tsuruta",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Spheal",
    "evolvesTo": [
      "Walrein"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Find Ice",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your deck for up to 2 Water Energy cards, show them to your opponent, and put them into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Sheer Cold",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon can't attack during your opponent's next turn."
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
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
      364
    ],
    "flavorText": "It habitually spins things on its nose. By doing so, it learns textures and odors.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/77.png",
      "large": "https://images.pokemontcg.io/pl2/77_hires.png"
    }
  },
  {
    "id": "pl2-78",
    "name": "Seedot",
    "number": "78",
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
      "Nuzleaf"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Harden",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, if Seedot would be damaged by an attack, prevent that attack's damage done to Seedot if that damage is 40 or less."
      },
      {
        "name": "Astonish",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Choose 1 card from your opponent's hand without looking. Look at that card you chose, then have your opponent shuffle that card into his or her deck."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "+10"
      }
    ],
    "resistances": [
      {
        "type": "Water",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      273
    ],
    "flavorText": "When it dangles from a tree branch, it looks just like an acorn. It enjoys scaring other Pokémon.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/78.png",
      "large": "https://images.pokemontcg.io/pl2/78_hires.png"
    }
  },
  {
    "id": "pl2-79",
    "name": "Shellos East Sea",
    "number": "79",
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
      "Gastrodon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ripple",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, put 1 damage counter on each of your opponent's Pokémon."
      },
      {
        "name": "Brine",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon that has any damage counters on it. This attack does 20 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "+10"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      422
    ],
    "flavorText": "Beware of pushing strongly on its squishy body, as it makes a mysterious purple fluid ooze out.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/79.png",
      "large": "https://images.pokemontcg.io/pl2/79_hires.png"
    }
  },
  {
    "id": "pl2-80",
    "name": "Shellos West Sea",
    "number": "80",
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
      "Gastrodon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Healing Sea",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Flip 2 coins. Choose 1 of your Pokémon. For each heads, remove 1 damage counter from that Pokémon."
      },
      {
        "name": "Mud Shot",
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
      422
    ],
    "flavorText": "Beware of pushing strongly on its squishy body, as it makes a mysterious purple fluid ooze out.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/80.png",
      "large": "https://images.pokemontcg.io/pl2/80_hires.png"
    }
  },
  {
    "id": "pl2-81",
    "name": "Snorlax",
    "number": "81",
    "artist": "Kouki Saitou",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Bad Sleeping Habits",
        "text": "As long as Snorlax is Asleep, your opponent's Active Pokémon can't retreat.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Toss and Turn",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "If Snorlax is Asleep, this attack does 20 damage plus 30 more damage. (This attack can be used even if Snorlax is Asleep.)"
      },
      {
        "name": "Heavy Press",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "40+",
        "text": "Flip a coin. If heads, this attack does 40 damage plus 40 more damage. If tails, Snorlax is now Asleep."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "+20"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/81.png",
      "large": "https://images.pokemontcg.io/pl2/81_hires.png"
    }
  },
  {
    "id": "pl2-82",
    "name": "Spheal",
    "number": "82",
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
      "Sealeo"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Powder Snow",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Ice Ball",
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
        "value": "+10"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      363
    ],
    "flavorText": "It rolls across ice floes to reach shore because its body is poorly shaped for swimming.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/82.png",
      "large": "https://images.pokemontcg.io/pl2/82_hires.png"
    }
  },
  {
    "id": "pl2-83",
    "name": "Staryu",
    "number": "83",
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
      "Starmie"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Cosmic Draw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If your opponent has any Evolved Pokémon in play, draw 3 cards."
      },
      {
        "name": "Swift",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "This attack's damage isn't affected by Weakness, Resistance, Poké-Powers, Poké-Bodies, or any other effects on the Defending Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "+10"
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
    "flavorText": "If its body is torn, it can grow back if the red core remains. The core flashes at midnight.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/83.png",
      "large": "https://images.pokemontcg.io/pl2/83_hires.png"
    }
  },
  {
    "id": "pl2-84",
    "name": "Trapinch",
    "number": "84",
    "artist": "Atsuko Nishida",
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
      "Vibrava"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Gather Sand",
        "text": "Once during your turn (before your attack), if Trapinch is your Active Pokémon, you may search your discard pile for a basic Fighting Energy card and attach it to Trapinch.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Grind",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Does 10 damage times the amount of Energy attached to Trapinch."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "+10"
      }
    ],
    "resistances": [
      {
        "type": "Lightning",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      328
    ],
    "flavorText": "It makes a conical pit in desert sand and lies in wait at the bottom for prey to come tumbling down.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/84.png",
      "large": "https://images.pokemontcg.io/pl2/84_hires.png"
    }
  },
  {
    "id": "pl2-85",
    "name": "Turtwig GL",
    "number": "85",
    "artist": "Kanako Eo",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "SP"
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
        "name": "Overgrow",
        "text": "As long as Turtwig GL's remaining HP is 60 or less, each of Turtwig GL's attacks does 30 more damage to the Defending Pokémon (before applying Weakness and Resistance).",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Giga Drain",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "After your attack, remove from Turtwig GL the number of damage counters equal to the damage you did to the Defending Pokémon."
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
      387
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/85.png",
      "large": "https://images.pokemontcg.io/pl2/85_hires.png"
    }
  },
  {
    "id": "pl2-86",
    "name": "Weedle",
    "number": "86",
    "artist": "Ken Sugimori",
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
      "Kakuna"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rescue String",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your discard pile for up to 5 Pokémon, show them to your opponent, and shuffle them into your deck."
      },
      {
        "name": "Needling Sting",
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
        "value": "+10"
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
    "flavorText": "It eats its weight in leaves every day. It fends off attackers with the needle on its head.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/86.png",
      "large": "https://images.pokemontcg.io/pl2/86_hires.png"
    }
  },
  {
    "id": "pl2-87",
    "name": "Weezing",
    "number": "87",
    "artist": "Ken Sugimori",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Koffing",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Camouflage Gas",
        "text": "If Weezing is Confused and is Knocked Out, your opponent can't take a Prize card.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Damage Breakdown",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Count the number of damage counters on Weezing. Put that many damage counters on the Defending Pokémon and Weezing is now Confused."
      },
      {
        "name": "Smog",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "The Defending Pokémon is now Poisoned."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
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
      110
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/87.png",
      "large": "https://images.pokemontcg.io/pl2/87_hires.png"
    }
  },
  {
    "id": "pl2-88",
    "name": "Aaron's Collection",
    "number": "88",
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
      "Search your discard pile for up to 2 in any combination of Pokémon SP and basic Energy cards, show them to your opponent, and put them into your hand."
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
      "small": "https://images.pokemontcg.io/pl2/88.png",
      "large": "https://images.pokemontcg.io/pl2/88_hires.png"
    }
  },
  {
    "id": "pl2-89",
    "name": "Bebe's Search",
    "number": "89",
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
      "Choose a card from your hand and put it on top of your deck. Search your deck for a Pokémon, show it to your opponent, and put it into your hand. Shuffle your deck afterward. (If this is the only card in your hand, you can't play this card.)"
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
      "small": "https://images.pokemontcg.io/pl2/89.png",
      "large": "https://images.pokemontcg.io/pl2/89_hires.png"
    }
  },
  {
    "id": "pl2-90",
    "name": "Bertha's Warmth",
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
      "Remove 5 damage counters from 1 of your Pokémon SP."
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
      "small": "https://images.pokemontcg.io/pl2/90.png",
      "large": "https://images.pokemontcg.io/pl2/90_hires.png"
    }
  },
  {
    "id": "pl2-91",
    "name": "Flint's Willpower",
    "number": "91",
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
      "Attach a basic Energy card from your hand to 1 of your Pokémon SP."
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
      "small": "https://images.pokemontcg.io/pl2/91.png",
      "large": "https://images.pokemontcg.io/pl2/91_hires.png"
    }
  },
  {
    "id": "pl2-92",
    "name": "Lucian's Assignment",
    "number": "92",
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
      "Move as many Energy cards attached to 1 of your Pokémon as you like to another of your Pokémon."
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
      "small": "https://images.pokemontcg.io/pl2/92.png",
      "large": "https://images.pokemontcg.io/pl2/92_hires.png"
    }
  },
  {
    "id": "pl2-93",
    "name": "Pokémon Contest Hall",
    "number": "93",
    "artist": "Makoto Imai",
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
      "This card stays in play when you play it. Discard this card if another Stadium card comes into play. If another card with the same name is in play, you can't play this card.",
      "Once during each player's turn, if that player's Bench isn't full, the player may flip a coin. If heads, that player searches his or her deck for a Basic Pokémon and puts it onto his or her Bench. If the player does, he or she may search his or her deck for a Pokémon Tool card and attach it to that Pokémon. If that player searched his or her deck, the player shuffles his or her deck afterward."
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
      "small": "https://images.pokemontcg.io/pl2/93.png",
      "large": "https://images.pokemontcg.io/pl2/93_hires.png"
    }
  },
  {
    "id": "pl2-94",
    "name": "Sunyshore City Gym",
    "number": "94",
    "artist": "Yusuke Ishikawa",
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
      "This card stays in play when you play it. Discard this card if another Stadium card comes into play. If another card with the same name is in play, you can't play this card.",
      "Any damage done by attacks from Lightning Pokémon (both yours and your opponent's) to the Defending Pokémon isn't affected by Resistance. Each Lightning Pokémon in play (both yours and your opponent's) has no Weakness."
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
      "small": "https://images.pokemontcg.io/pl2/94.png",
      "large": "https://images.pokemontcg.io/pl2/94_hires.png"
    }
  },
  {
    "id": "pl2-95",
    "name": "Team Galactic's Invention G-107 Technical Machine G",
    "number": "95",
    "artist": "Makoto Imai",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Technical Machine"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Attach this card to 1 of your Pokémon SP in play. That Pokémon may use this card's attack instead of its own. When the Pokémon this card is attached to is no longer Pokémon SP, discard this card."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Damage Porter",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 10 damage times the number of damage counters on the Pokémon this card is attached to to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
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
      "small": "https://images.pokemontcg.io/pl2/95.png",
      "large": "https://images.pokemontcg.io/pl2/95_hires.png"
    }
  },
  {
    "id": "pl2-96",
    "name": "Team Galactic's Invention G-109 SP Radar",
    "number": "96",
    "artist": "Kent Kanetsuna",
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
      "Choose a card from your hand and put it on top of your deck. Search your deck for a Pokémon SP, show it to your opponent, and put it into your hand. Shuffle your deck afterward. (If this is the only card in your hand, you can't play this card.)"
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
      "small": "https://images.pokemontcg.io/pl2/96.png",
      "large": "https://images.pokemontcg.io/pl2/96_hires.png"
    }
  },
  {
    "id": "pl2-97",
    "name": "Underground Expedition",
    "number": "97",
    "artist": "Kagemaru Himeno",
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
      "Look at the 4 cards from the bottom of your deck. Choose any 2 cards there and put them into your hand. Put the remaining cards back on the bottom of your deck in any order."
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
      "small": "https://images.pokemontcg.io/pl2/97.png",
      "large": "https://images.pokemontcg.io/pl2/97_hires.png"
    }
  },
  {
    "id": "pl2-98",
    "name": "Volkner's Philosophy",
    "number": "98",
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
      "You may discard a card from your hand. Then, draw cards until you have 6 cards in your hand. (If you can't draw any cards, you can't play this card.)"
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
      "small": "https://images.pokemontcg.io/pl2/98.png",
      "large": "https://images.pokemontcg.io/pl2/98_hires.png"
    }
  },
  {
    "id": "pl2-99",
    "name": "Darkness Energy",
    "number": "99",
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
      "If the Pokémon Darkness Energy is attached to attacks, the attack does 10 more damage to the Active Pokémon (before applying Weakness and Resistance). Ignore this effect if the Pokémon that Darkness Energy is attached to isn't Darkness. Darkness Energy provides Darkness Energy. (Doesn't count as a basic Energy card.)"
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
      "small": "https://images.pokemontcg.io/pl2/99.png",
      "large": "https://images.pokemontcg.io/pl2/99_hires.png"
    }
  },
  {
    "id": "pl2-100",
    "name": "Metal Energy",
    "number": "100",
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
      "Damage done by attacks to the Pokémon that Metal Energy is attached to is reduced by 10 (after applying Weakness and Resistance). Ignore this effect if the Pokémon that Metal Energy is attached to isn't Metal. Metal Energy provides Metal Energy. (Doesn't count as a basic Energy card.)"
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
      "small": "https://images.pokemontcg.io/pl2/100.png",
      "large": "https://images.pokemontcg.io/pl2/100_hires.png"
    }
  },
  {
    "id": "pl2-101",
    "name": "SP Energy",
    "number": "101",
    "artist": "Kent Kanetsuna",
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
      "SP Energy provides Colorless Energy. If the Pokémon SP Energy is attached to is a Pokémon SP, SP Energy provides every type of Energy buy provides only 1 Energy at a time. (Doesn't count as a basic Energy card.)"
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
      "small": "https://images.pokemontcg.io/pl2/101.png",
      "large": "https://images.pokemontcg.io/pl2/101_hires.png"
    }
  },
  {
    "id": "pl2-102",
    "name": "Upper Energy",
    "number": "102",
    "artist": "Ryo Ueda",
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
      "Upper Energy provides Colorless Energy. If you have more Prize cards left than your opponent and this card is attached to a Pokémon (excluding Pokémon LV.X), Upper Energy provides ColorlessColorless."
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
      "small": "https://images.pokemontcg.io/pl2/102.png",
      "large": "https://images.pokemontcg.io/pl2/102_hires.png"
    }
  },
  {
    "id": "pl2-103",
    "name": "Alakazam E4 LV.X",
    "number": "103",
    "artist": "Ryo Ueda",
    "rarity": "Rare Holo LV.X",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up",
      "SP"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Alakazam E4",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Alakazam E4. Alakazam E4 LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
    ],
    "abilities": [
      {
        "name": "Damage Switch",
        "text": "As often as you like during your turn (before your attack), you may move 1 damage counter from 1 of your Pokémon SP to another of your Pokémon SP. This power can't be used if Alakazam E4 is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Mind Shock",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "This attack's damage isn't affected by Weakness or Resistance."
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
      65
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/103.png",
      "large": "https://images.pokemontcg.io/pl2/103_hires.png"
    }
  },
  {
    "id": "pl2-104",
    "name": "Floatzel GL LV.X",
    "number": "104",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo LV.X",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up",
      "SP"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Floatzel GL",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Floatzel GL. Floatzel GL LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
    ],
    "abilities": [
      {
        "name": "Water Rescue",
        "text": "Whenever any of your Water Pokémon (excluding any Floatzel GL) is Knocked Out by damage from your opponent's attack, you may put that Pokémon and all cards that were attached to it from your discard pile into your hand.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Energy Cyclone",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Choose as many Energy cards from your hand as you like and show them to your opponent. This attack does 20 damage times the number of Energy cards you chose. Put those Energy cards on top of your deck. Shuffle your deck afterward."
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
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      419
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/104.png",
      "large": "https://images.pokemontcg.io/pl2/104_hires.png"
    }
  },
  {
    "id": "pl2-105",
    "name": "Flygon LV.X",
    "number": "105",
    "artist": "Shizurow",
    "rarity": "Rare Holo LV.X",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up"
    ],
    "hp": "140",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Flygon",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Flygon. Flygon LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
    ],
    "abilities": [
      {
        "name": "Wind Erosion",
        "text": "As long as Flygon is your Active Pokémon, discard the top card from your opponent's deck between turns.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Extreme Attack",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon LV.X. This attack does 150 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon)."
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
        "type": "Lightning",
        "value": "-20"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      330
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/105.png",
      "large": "https://images.pokemontcg.io/pl2/105_hires.png"
    }
  },
  {
    "id": "pl2-106",
    "name": "Gallade E4 LV.X",
    "number": "106",
    "artist": "Ryo Ueda",
    "rarity": "Rare Holo LV.X",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up",
      "SP"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Gallade E4",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Gallade E4. Gallade E4 LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
    ],
    "abilities": [
      {
        "name": "Blade Storm",
        "text": "Once during your turn (before your attack), when you put Gallade E4 LV.X from your hand onto your Active Gallade E4, you may put 1 damage counter on each of your opponent's Pokémon.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Aimed Cut",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "Does 40 damage plus 10 more damage for each damage counter on the Defending Pokémon."
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
      475
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/106.png",
      "large": "https://images.pokemontcg.io/pl2/106_hires.png"
    }
  },
  {
    "id": "pl2-107",
    "name": "Hippowdon LV.X",
    "number": "107",
    "artist": "Shizurow",
    "rarity": "Rare Holo LV.X",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up"
    ],
    "hp": "130",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Hippowdon",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Hippowdon. Hippowdon LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
    ],
    "abilities": [
      {
        "name": "Sand Reset",
        "text": "Once during a game on your turn (before your attack), each player shuffles all cards in play (excluding Pokémon and Supporter cards) into his or her deck. You can't use more than 1 Sand Reset Poké-Power each game.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Double Shoot",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "",
        "text": "Discard 2 Fighting Energy attached to Hippowdon and choose 2 of your opponent's Benched Pokémon. This attack does 40 damage to each of them. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      450
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/107.png",
      "large": "https://images.pokemontcg.io/pl2/107_hires.png"
    }
  },
  {
    "id": "pl2-108",
    "name": "Infernape E4 LV.X",
    "number": "108",
    "artist": "Ryo Ueda",
    "rarity": "Rare Holo LV.X",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up",
      "SP"
    ],
    "hp": "110",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Infernape E4",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Infernape E4. Infernape E4 LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
    ],
    "abilities": [
      {
        "name": "Intimidating Roar",
        "text": "Once during your turn (before your attack), you may have your opponent switch his or her Active Pokémon with 1 of his or her Benched Pokémon. This power can't be used if Infernape E4 is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Fire Spin",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "Discard 2 Energy attached to Infernape E4."
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
      392
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/108.png",
      "large": "https://images.pokemontcg.io/pl2/108_hires.png"
    }
  },
  {
    "id": "pl2-109",
    "name": "Luxray GL LV.X",
    "number": "109",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo LV.X",
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
      "Put this card onto your Active Luxray GL. Luxray GL LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
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
      "small": "https://images.pokemontcg.io/pl2/109.png",
      "large": "https://images.pokemontcg.io/pl2/109_hires.png"
    }
  },
  {
    "id": "pl2-110",
    "name": "Mismagius GL LV.X",
    "number": "110",
    "artist": "Kent Kanetsuna",
    "rarity": "Rare Holo LV.X",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up",
      "SP"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Mismagius GL",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Mismagius GL. Mismagius GL LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
    ],
    "abilities": [
      {
        "name": "Magical Return",
        "text": "As often as you like during your turn (before your attack), you may return a Pokémon Tool or Technical Machine card attached to your Pokémon to your hand. This power can't be used if Mismagius GL is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Darkness Magic",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Count the number of cards in your hand. Put that many damage counters on the Defending Pokémon. You can't put more than 8 damage counters in this way."
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
        "type": "Colorless",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      429
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/110.png",
      "large": "https://images.pokemontcg.io/pl2/110_hires.png"
    }
  },
  {
    "id": "pl2-111",
    "name": "Snorlax LV.X",
    "number": "111",
    "artist": "Shizurow",
    "rarity": "Rare Holo LV.X",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Snorlax",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Snorlax. Snorlax LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
    ],
    "abilities": [
      {
        "name": "Big Appetite",
        "text": "Once during your turn (before your attack), if Snorlax is your Active Pokémon, you may draw cards until you have 6 cards in your hand. If you do, Snorlax is now Asleep. This power can't be used if Snorlax is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Exercise",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "You may discard as many Energy cards as you like from your hand. If you do, remove that many damage counters from Snorlax."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/111.png",
      "large": "https://images.pokemontcg.io/pl2/111_hires.png"
    }
  },
  {
    "id": "pl2-112",
    "name": "Pikachu",
    "number": "112",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Secret",
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
        "text": "Flip a coin. If tails, Pikachu does 10 damage to itself."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/112.png",
      "large": "https://images.pokemontcg.io/pl2/112_hires.png"
    }
  },
  {
    "id": "pl2-113",
    "name": "Flying Pikachu",
    "number": "113",
    "artist": "Toshinao Aoki",
    "rarity": "Rare Secret",
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
      "Raichu"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Thundershock",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Fly",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "Flip a coin. If tails, this attack does nothing. If heads, prevent all effects of an attack, including damage, done to Flying Pikachu during your opponent's next turn."
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      25
    ],
    "flavorText": "By learning how to fly, Pikachu overcame its weakness to Fighting Pokémon.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/113.png",
      "large": "https://images.pokemontcg.io/pl2/113_hires.png"
    }
  },
  {
    "id": "pl2-114",
    "name": "Surfing Pikachu",
    "number": "114",
    "artist": "Toshinao Aoki",
    "rarity": "Rare Secret",
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
      "Raichu"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Surf",
        "cost": [
          "Water",
          "Water"
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
      25
    ],
    "flavorText": "One summer, a group of Pikachu was found riding the waves at the local beach.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/114.png",
      "large": "https://images.pokemontcg.io/pl2/114_hires.png"
    }
  },
  {
    "id": "pl2-RT1",
    "name": "Fan Rotom",
    "number": "RT1",
    "artist": "Motofumi Fujiwara",
    "rarity": "Rare",
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
        "name": "Fan Shift",
        "text": "Once during your turn (before your attack), you may use this power. Fan Rotom's type is Colorless until the end of your turn.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Spin Storm",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip a coin. If heads, your opponent returns the Defending Pokémon and all cards attached to it to his or her hand."
      },
      {
        "name": "Air Slash",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Flip a coin. If tails, discard an Energy attached to Fan Rotom."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "+20"
      }
    ],
    "resistances": [
      {
        "type": "Colorless",
        "value": "-20"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      479
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/RT1.png",
      "large": "https://images.pokemontcg.io/pl2/RT1_hires.png"
    }
  },
  {
    "id": "pl2-RT2",
    "name": "Frost Rotom",
    "number": "RT2",
    "artist": "Hironobu Yoshida",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Frost Shift",
        "text": "Once during your turn (before your attack), you may use this power. Frost Rotom's type is Water until the end of your turn.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Hail",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 10 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Crushing Ice",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "Does 40 damage plus 10 more damage for each Colorless Energy in the Defending Pokémon's Retreat Cost (after applying effects to the Retreat Cost)."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "+20"
      }
    ],
    "resistances": [
      {
        "type": "Colorless",
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
      479
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/RT2.png",
      "large": "https://images.pokemontcg.io/pl2/RT2_hires.png"
    }
  },
  {
    "id": "pl2-RT3",
    "name": "Heat Rotom",
    "number": "RT3",
    "artist": "Lee HyunJung",
    "rarity": "Rare",
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
    "abilities": [
      {
        "name": "Heat Shift",
        "text": "Once during your turn (before your attack), you may use this power. Heat Rotom's type is Fire until the end of your turn.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Warm Up",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Fire Energy card and attach it to 1 of your Benched Pokémon. Shuffle your deck afterward."
      },
      {
        "name": "Heat Burn",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "The Defending Pokémon is now Burned."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "+20"
      }
    ],
    "resistances": [
      {
        "type": "Colorless",
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/RT3.png",
      "large": "https://images.pokemontcg.io/pl2/RT3_hires.png"
    }
  },
  {
    "id": "pl2-RT4",
    "name": "Mow Rotom",
    "number": "RT4",
    "artist": "Yusuke Ohmura",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Mow Shift",
        "text": "Once during your turn (before your attack), you may use this power. Mow Rotom's type is Grass until the end of your turn.",
        "type": "Poké-Power"
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
        "damage": "20",
        "text": ""
      },
      {
        "name": "Mow Down",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Flip a coin. If heads, discard an Energy card attached to each of your opponent's Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "+20"
      }
    ],
    "resistances": [
      {
        "type": "Colorless",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      479
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/RT4.png",
      "large": "https://images.pokemontcg.io/pl2/RT4_hires.png"
    }
  },
  {
    "id": "pl2-RT5",
    "name": "Wash Rotom",
    "number": "RT5",
    "artist": "Hiroki Fuchino",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Wash Shift",
        "text": "Once during your turn (before your attack), you may use this power. Wash Rotom's type is Water until the end of your turn.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Cleanse Away",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Remove 3 damage counters from each of your Benched Pokémon."
      },
      {
        "name": "Drain Wash",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin until you get tails. For each heads, choose 1 card from your opponent's hand without looking and discard it."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "+20"
      }
    ],
    "resistances": [
      {
        "type": "Colorless",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      479
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pl2/RT5.png",
      "large": "https://images.pokemontcg.io/pl2/RT5_hires.png"
    }
  },
  {
    "id": "pl2-RT6",
    "name": "Charon's Choice",
    "number": "RT6",
    "artist": "Ken Sugimori",
    "rarity": "Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can play only one Supporter card each turn. When you play this card, put it next to your Active Pokémon. When your turn ends, put this card into your hand instead of discarding it.",
      "Search your deck for any Rotom and switch it with any Rotom you have in play. Any cards attached to Rotom and damage counters on it are now on the new Pokémon. (Remove all Special Conditions and effects from Rotom.) Put Rotom on top of your deck. Shuffle your deck afterward."
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
      "small": "https://images.pokemontcg.io/pl2/RT6.png",
      "large": "https://images.pokemontcg.io/pl2/RT6_hires.png"
    }
  }
]

export default cardDetails
