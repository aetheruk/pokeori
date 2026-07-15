import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "xy6-1",
    "name": "Exeggcute",
    "number": "1",
    "artist": "Tomokazu Komiya",
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
      "Exeggutor"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Loathe",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, switch this Pokémon with 1 of your Benched Pokémon."
      },
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      102
    ],
    "flavorText": "Even though it appears to be eggs of some sort, it was discovered to be a life-form more like plant seeds.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/1.png",
      "large": "https://images.pokemontcg.io/xy6/1_hires.png"
    }
  },
  {
    "id": "xy6-2",
    "name": "Exeggutor",
    "number": "2",
    "artist": "Shin Nagasawa",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Exeggcute",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shake It Off",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "This attack does 20 damage times the number of Colorless Pokémon your opponent has in play."
      },
      {
        "name": "Seed Bomb",
        "cost": [
          "Grass",
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
    "flavorText": "It is called \"The Walking Jungle.\" If a head grows too big, it falls off and becomes an Exeggcute.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/2.png",
      "large": "https://images.pokemontcg.io/xy6/2_hires.png"
    }
  },
  {
    "id": "xy6-3",
    "name": "Wurmple",
    "number": "3",
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
      "Silcoon",
      "Cascoon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flock",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for Wurmple and put it onto your Bench. Shuffle your deck afterward."
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
      265
    ],
    "flavorText": "It lives among the tall grass and in forests. It repels attacks by raising up the spikes on its rear.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/3.png",
      "large": "https://images.pokemontcg.io/xy6/3_hires.png"
    }
  },
  {
    "id": "xy6-4",
    "name": "Silcoon",
    "number": "4",
    "artist": "Shigenori Negishi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Wurmple",
    "evolvesTo": [
      "Beautifly"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "String Shot",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      266
    ],
    "flavorText": "It drinks dew that collects on its silk and waits for evolution. Its hard cocoon repels attacks.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/4.png",
      "large": "https://images.pokemontcg.io/xy6/4_hires.png"
    }
  },
  {
    "id": "xy6-5",
    "name": "Beautifly",
    "number": "5",
    "artist": "Midori Harada",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Silcoon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Miraculous Scales",
        "text": "Prevent all damage done to this Pokémon by attacks from your opponent's Pokémon-EX.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Whirlwind",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "You may have your opponent switch his or her Active Pokémon with 1 of his or her Benched Pokémon."
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
      267
    ],
    "flavorText": "It has an aggressive nature. It stabs prey with its long, narrow mouth to drain the prey's fluids.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/5.png",
      "large": "https://images.pokemontcg.io/xy6/5_hires.png"
    }
  },
  {
    "id": "xy6-6",
    "name": "Cascoon",
    "number": "6",
    "artist": "MAHOU",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Wurmple",
    "evolvesTo": [
      "Dustox"
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
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Poisoned."
      },
      {
        "name": "Iron Defense",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip a coin. If heads, prevent all damage done to this Pokémon by attacks during your opponent's next turn."
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
      268
    ],
    "flavorText": "It never forgets any attack it endured while in the cocoon. After evolution, it seeks payback.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/6.png",
      "large": "https://images.pokemontcg.io/xy6/6_hires.png"
    }
  },
  {
    "id": "xy6-7",
    "name": "Dustox",
    "number": "7",
    "artist": "Akira Komayama",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Cascoon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psybeam",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Confused."
      },
      {
        "name": "Twilight Poison",
        "cost": [
          "Grass",
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "Your opponent's Active Pokémon is now Asleep and Poisoned."
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
      269
    ],
    "flavorText": "It violently flutters its wings to scatter toxic dust when attacked. It becomes active after sunset.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/7.png",
      "large": "https://images.pokemontcg.io/xy6/7_hires.png"
    }
  },
  {
    "id": "xy6-8",
    "name": "Dustox",
    "number": "8",
    "artist": "match",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Cascoon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flap",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Wind Shard",
        "cost": [
          "Grass",
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
      269
    ],
    "flavorText": "It violently flutters its wings to scatter toxic dust when attacked. It becomes active after sunset.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/8.png",
      "large": "https://images.pokemontcg.io/xy6/8_hires.png"
    }
  },
  {
    "id": "xy6-9",
    "name": "Nincada",
    "number": "9",
    "artist": "Kyoko Umemoto",
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
      "Ninjask"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Slight Intrusion",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "This Pokémon does 10 damage to itself."
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
      290
    ],
    "flavorText": "It can sometimes live underground for more than 10 years. It absorbs nutrients from the roots of trees.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/9.png",
      "large": "https://images.pokemontcg.io/xy6/9_hires.png"
    }
  },
  {
    "id": "xy6-10",
    "name": "Ninjask",
    "number": "10",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Nincada",
    "evolvesTo": [
      "Shedinja"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Wing Buzz",
        "text": "Once during your turn (before your attack), if this Pokémon is your Active Pokémon, you may discard a card from your hand. If you do, discard the top card of your opponent's deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Afterimage Assault",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Search your deck for up to 2 Ninjask and put them onto your Bench. Shuffle your deck afterward."
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
      291
    ],
    "flavorText": "Because it moves so quickly, it sometimes becomes unseeable. It congregates around tree sap.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/10.png",
      "large": "https://images.pokemontcg.io/xy6/10_hires.png"
    }
  },
  {
    "id": "xy6-11",
    "name": "Shedinja",
    "number": "11",
    "artist": "Aya Kusube",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "30",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Nincada",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Cursed Rain",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put 1 damage counter on each of your opponent's Pokémon. Switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Hopeless Scream",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "This attack does 50 damage times the number of damage counters on this Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      292
    ],
    "flavorText": "A most peculiar Pokémon that somehow appears in a Poké Ball when a Nincada evolves.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/11.png",
      "large": "https://images.pokemontcg.io/xy6/11_hires.png"
    }
  },
  {
    "id": "xy6-12",
    "name": "Tropius",
    "number": "12",
    "artist": "Kyoko Umemoto",
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
        "name": "Stomp",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
      },
      {
        "name": "Solar Beam",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      357
    ],
    "flavorText": "The bunch of fruit around its neck ripens twice a year and is delicious. It's a highly favored tropical snack.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/12.png",
      "large": "https://images.pokemontcg.io/xy6/12_hires.png"
    }
  },
  {
    "id": "xy6-13",
    "name": "Victini",
    "number": "13",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
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
        "name": "Me First",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card."
      },
      {
        "name": "Psy Bolt",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
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
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/13.png",
      "large": "https://images.pokemontcg.io/xy6/13_hires.png"
    }
  },
  {
    "id": "xy6-14",
    "name": "Fletchinder",
    "number": "14",
    "artist": "Naoyo Kimura",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Fletchling",
    "evolvesTo": [
      "Talonflame"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Peck Off",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Before doing damage, discard all Pokémon Tool cards attached to your opponent's Active Pokémon."
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
      662
    ],
    "flavorText": "The hotter the flame sac on its belly, the faster it can fly, but it takes some time to get the fire going.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/14.png",
      "large": "https://images.pokemontcg.io/xy6/14_hires.png"
    }
  },
  {
    "id": "xy6-15",
    "name": "Talonflame",
    "number": "15",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Fletchinder",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Grand Loop",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw 3 cards. You may switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Brave Bird",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90",
        "text": "This Pokémon does 20 damage to itself."
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
      663
    ],
    "flavorText": "When attacking prey, it can reach speeds of up to 310 mph. It finishes its prey off with a colossal kick.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/15.png",
      "large": "https://images.pokemontcg.io/xy6/15_hires.png"
    }
  },
  {
    "id": "xy6-16",
    "name": "Articuno",
    "number": "16",
    "artist": "Naoki Saito",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Find Ice",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 Water Energy cards, reveal them, and put them into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Freezing Wind",
        "cost": [
          "Water",
          "Water",
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
        "type": "Metal",
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
      144
    ],
    "flavorText": "A legendary bird Pokémon that is said to appear to doomed people who are lost in icy mountains.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/16.png",
      "large": "https://images.pokemontcg.io/xy6/16_hires.png"
    }
  },
  {
    "id": "xy6-17",
    "name": "Articuno",
    "number": "17",
    "artist": "5ban Graphics",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Chilling Sigh",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Tri Edge",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20+",
        "text": "Flip 3 coins. This attack does 40 more damage for each heads."
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
      144
    ],
    "flavorText": "A legendary bird Pokémon that is said to appear to doomed people who are lost in icy mountains.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/17.png",
      "large": "https://images.pokemontcg.io/xy6/17_hires.png"
    }
  },
  {
    "id": "xy6-18",
    "name": "Wingull",
    "number": "18",
    "artist": "MAHOU",
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
      "Pelipper"
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
      278
    ],
    "flavorText": "It makes its nest on steep sea cliffs. Riding updrafts, it soars to great heights.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/18.png",
      "large": "https://images.pokemontcg.io/xy6/18_hires.png"
    }
  },
  {
    "id": "xy6-19",
    "name": "Pelipper",
    "number": "19",
    "artist": "Midori Harada",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wingull",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Swallow",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Heal from this Pokémon the same amount of damage you did to your opponent's Active Pokémon."
      },
      {
        "name": "Water Pulse",
        "cost": [
          "Water",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "70",
        "text": "Your opponent's Active Pokémon is now Asleep."
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      279
    ],
    "flavorText": "It is a messenger of the skies, carrying small Pokémon and eggs to safety in its bill.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/19.png",
      "large": "https://images.pokemontcg.io/xy6/19_hires.png"
    }
  },
  {
    "id": "xy6-20",
    "name": "Pikachu",
    "number": "20",
    "artist": "Naoki Saito",
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
        "name": "Tail Whip",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon can't attack during your opponent's next turn."
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
      25
    ],
    "flavorText": "It raises its tail to check its surroundings. The tail is sometimes struck by lightning in this pose.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/20.png",
      "large": "https://images.pokemontcg.io/xy6/20_hires.png"
    }
  },
  {
    "id": "xy6-21",
    "name": "Voltorb",
    "number": "21",
    "artist": "Suwama Chiaki",
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
        "name": "Thunder Wave",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Big Explosion",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "This Pokémon does 60 damage to itself."
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
      100
    ],
    "flavorText": "Usually found in power plants. Easily mistaken for a Poké Ball, it has zapped many people.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/21.png",
      "large": "https://images.pokemontcg.io/xy6/21_hires.png"
    }
  },
  {
    "id": "xy6-22",
    "name": "Electrode",
    "number": "22",
    "artist": "Tomokazu Komiya",
    "rarity": "Uncommon",
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
        "name": "Continuous Tumble",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "Flip a coin until you get tails. This attack does 20 damage times the number of heads."
      },
      {
        "name": "Energy Bomb",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "You may move all Energy from this Pokémon to your Benched Pokémon in any way you like."
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
    "flavorText": "It stores an overflowing amount of electric energy inside its body. Even a small shock makes it explode.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/22.png",
      "large": "https://images.pokemontcg.io/xy6/22_hires.png"
    }
  },
  {
    "id": "xy6-23",
    "name": "Zapdos",
    "number": "23",
    "artist": "Hitoshi Ariga",
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
        "name": "Drill Peck",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Raging Thunder",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This attack does 40 damage to 1 of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      145
    ],
    "flavorText": "A legendary Pokémon that is said to live in thunderclouds. It freely controls lightning bolts.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/23.png",
      "large": "https://images.pokemontcg.io/xy6/23_hires.png"
    }
  },
  {
    "id": "xy6-24",
    "name": "Electrike",
    "number": "24",
    "artist": "Akira Komayama",
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
      "Manectric"
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
      309
    ],
    "flavorText": "It stores static electricity in its fur for discharging. It gives off sparks if a storm approaches.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/24.png",
      "large": "https://images.pokemontcg.io/xy6/24_hires.png"
    }
  },
  {
    "id": "xy6-25",
    "name": "Manectric",
    "number": "25",
    "artist": "match",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Electrike",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Random Spark",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 30 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Bite",
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
      310
    ],
    "flavorText": "It discharges electricity from its mane. It creates a thundercloud overhead to drop lightning bolts.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/25.png",
      "large": "https://images.pokemontcg.io/xy6/25_hires.png"
    }
  },
  {
    "id": "xy6-26",
    "name": "Thundurus-EX",
    "number": "26",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Headlock",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 30 more damage. If tails, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Voltage Rush",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "This Pokémon does 50 damage to itself."
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
      642
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/26.png",
      "large": "https://images.pokemontcg.io/xy6/26_hires.png"
    }
  },
  {
    "id": "xy6-27",
    "name": "Natu",
    "number": "27",
    "artist": "Atsuko Nishida",
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
      177
    ],
    "flavorText": "It usually forages for food on the ground but may, on rare occasions, hop onto branches to peck at shoots.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/27.png",
      "large": "https://images.pokemontcg.io/xy6/27_hires.png"
    }
  },
  {
    "id": "xy6-28",
    "name": "Natu",
    "number": "28",
    "artist": "Kagemaru Himeno",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
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
        "name": "Psywave",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10×",
        "text": "This attack does 10 damage times the amount of Energy attached to your opponent's Active Pokémon."
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
      177
    ],
    "flavorText": "It usually forages for food on the ground but may, on rare occasions, hop onto branches to peck at shoots.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/28.png",
      "large": "https://images.pokemontcg.io/xy6/28_hires.png"
    }
  },
  {
    "id": "xy6-29",
    "name": "Xatu",
    "number": "29",
    "artist": "Hajime Kusajima",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Natu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Future Sight",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 5 cards of either player's deck and put them back on top of that player's deck in any order."
      },
      {
        "name": "Stressful Eye",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Your opponent reveals his or her hand. Discard a Trainer card you find there."
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
      178
    ],
    "flavorText": "They say that it stays still and quiet because it is seeing both the past and future at the same time.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/29.png",
      "large": "https://images.pokemontcg.io/xy6/29_hires.png"
    }
  },
  {
    "id": "xy6-30",
    "name": "Shuppet",
    "number": "30",
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
      "Banette"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bleh",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard a Special Energy attached to 1 of your opponent's Pokémon."
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      353
    ],
    "flavorText": "It loves vengeful emotions and hangs in rows under the eaves of houses where vengeful people live.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/30.png",
      "large": "https://images.pokemontcg.io/xy6/30_hires.png"
    }
  },
  {
    "id": "xy6-31",
    "name": "Banette",
    "number": "31",
    "artist": "Aya Kusube",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Shuppet",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Tool Concealment",
        "text": "Each Pokémon Tool card in play has no effect.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Psyshot",
        "cost": [
          "Psychic",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      354
    ],
    "flavorText": "Strong feelings of hatred turned a puppet into a Pokémon. If it opens its mouth, its cursed energy escapes.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/31.png",
      "large": "https://images.pokemontcg.io/xy6/31_hires.png"
    }
  },
  {
    "id": "xy6-32",
    "name": "Banette",
    "number": "32",
    "artist": "Shin Nagasawa",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Shuppet",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Evolution Jammer",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Your opponent can't play any Pokémon from his or her hand to evolve his or her Pokémon during his or her next turn."
      },
      {
        "name": "Curse Deeply",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put 5 damage counters on your opponent's Active Pokémon."
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      354
    ],
    "flavorText": "Strong feelings of hatred turned a puppet into a Pokémon. If it opens its mouth, its cursed energy escapes.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/32.png",
      "large": "https://images.pokemontcg.io/xy6/32_hires.png"
    }
  },
  {
    "id": "xy6-33",
    "name": "Deoxys",
    "number": "33",
    "artist": "kawayoo",
    "rarity": "Rare Holo",
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
        "name": "Close Encounter",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If you go first, you can use this attack on your first turn. Draw 2 cards."
      },
      {
        "name": "Overdrive Smash",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "During your next turn, this Pokémon's Overdrive Smash attack does 60 more damage (before applying Weakness and Resistance)."
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
      386
    ],
    "flavorText": "DNA from a space virus mutated and became a Pokémon. It appears where auroras are seen.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/33.png",
      "large": "https://images.pokemontcg.io/xy6/33_hires.png"
    }
  },
  {
    "id": "xy6-34",
    "name": "Gallade-EX",
    "number": "34",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
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
    "evolvesTo": [
      "M Gallade-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Swift Lunge",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "You may have your opponent switch his or her Active Pokémon with 1 of his or her Benched Pokémon."
      },
      {
        "name": "Piercing Prizes",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "This attack does 20 more damage for each of your remaining Prize cards."
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
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/34.png",
      "large": "https://images.pokemontcg.io/xy6/34_hires.png"
    }
  },
  {
    "id": "xy6-35",
    "name": "M Gallade-EX",
    "number": "35",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "220",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Gallade-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Unwavering Blade",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "This attack does 30 damage to each of your opponent's Benched Pokémon that has any damage counters on it. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/35.png",
      "large": "https://images.pokemontcg.io/xy6/35_hires.png"
    }
  },
  {
    "id": "xy6-36",
    "name": "Gligar",
    "number": "36",
    "artist": "Suwama Chiaki",
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
        "name": "Stun Poison",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed and Poisoned."
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
      207
    ],
    "flavorText": "It flies straight at its target's face then clamps down on the startled victim to inject poison.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/36.png",
      "large": "https://images.pokemontcg.io/xy6/36_hires.png"
    }
  },
  {
    "id": "xy6-37",
    "name": "Gliscor",
    "number": "37",
    "artist": "Hajime Kusajima",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Gligar",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rock Slide",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "This attack does 20 damage to 2 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Slash",
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
      472
    ],
    "flavorText": "Its flight is soundless. It uses its lengthy tail to carry off its prey… Then its elongated fangs do the rest.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/37.png",
      "large": "https://images.pokemontcg.io/xy6/37_hires.png"
    }
  },
  {
    "id": "xy6-38",
    "name": "Binacle",
    "number": "38",
    "artist": "Kanako Eo",
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
      "Barbaracle"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sand Attack",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If the Defending Pokémon tries to attack during your opponent's next turn, your opponent flips a coin. If tails, that attack does nothing."
      },
      {
        "name": "Mud-Slap",
        "cost": [
          "Fighting",
          "Fighting",
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
      688
    ],
    "flavorText": "Two Binacle live together on one rock. When they fight, one of them will move to a different rock.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/38.png",
      "large": "https://images.pokemontcg.io/xy6/38_hires.png"
    }
  },
  {
    "id": "xy6-39",
    "name": "Hawlucha",
    "number": "39",
    "artist": "Shin Nagasawa",
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
        "name": "Tackle",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Midair Strike",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "Flip a coin. If heads, this attack does 40 more damage."
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
      701
    ],
    "flavorText": "Although its body is small, its proficient fighting skills enable it to keep up with big bruisers like Machamp and Hariyama.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/39.png",
      "large": "https://images.pokemontcg.io/xy6/39_hires.png"
    }
  },
  {
    "id": "xy6-40",
    "name": "Absol",
    "number": "40",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
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
    "abilities": [
      {
        "name": "Cursed Eyes",
        "text": "When you play this Pokémon from your hand onto your Bench, you may move 3 damage counters from 1 of your opponent's Pokémon to another of his or her Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Mach Claw",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "This attack's damage isn't affected by Resistance."
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
      359
    ],
    "flavorText": "It appears when it senses an impending natural disaster. As a result, it was mistaken as a doom bringer.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/40.png",
      "large": "https://images.pokemontcg.io/xy6/40_hires.png"
    }
  },
  {
    "id": "xy6-41",
    "name": "Inkay",
    "number": "41",
    "artist": "Akira Komayama",
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
      "Malamar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rip Off",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose a random card from your opponent's hand. Your opponent reveals that card and shuffles it into his or her deck."
      },
      {
        "name": "Psybeam",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Confused."
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
      686
    ],
    "flavorText": "It flashes the light-emitting spots on its body, which drains its opponent's will to fight. It takes the opportunity to scuttle away and hide.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/41.png",
      "large": "https://images.pokemontcg.io/xy6/41_hires.png"
    }
  },
  {
    "id": "xy6-42",
    "name": "Jirachi",
    "number": "42",
    "artist": "Sanosuke Sakuma",
    "rarity": "Rare Holo",
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
        "name": "Diminutive Desire",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 7 cards of your deck and put 1 of them into your hand. Shuffle the other cards back into your deck."
      },
      {
        "name": "Doom Desire",
        "cost": [
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Discard all Energy attached to this Pokémon. The Defending Pokémon is Knocked Out at the end of your opponent's next turn."
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
      385
    ],
    "flavorText": "It is said to have the ability to grant any wish for just one week every thousand years.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/42.png",
      "large": "https://images.pokemontcg.io/xy6/42_hires.png"
    }
  },
  {
    "id": "xy6-43",
    "name": "Togepi",
    "number": "43",
    "artist": "HiRON",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Togetic"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sweet Kiss",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Your opponent draws a card."
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
      175
    ],
    "flavorText": "A proverb claims that happiness will come to anyone who can make a sleeping Togepi stand up.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/43.png",
      "large": "https://images.pokemontcg.io/xy6/43_hires.png"
    }
  },
  {
    "id": "xy6-44",
    "name": "Togetic",
    "number": "44",
    "artist": "Kanako Eo",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Togepi",
    "evolvesTo": [
      "Togekiss"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Go Fetch",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Shuffle 3 basic Energy cards from your discard pile into your deck."
      },
      {
        "name": "Fairy Wind",
        "cost": [
          "Fairy",
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
      176
    ],
    "flavorText": "They say that it will appear before kindhearted, caring people and shower them with happiness.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/44.png",
      "large": "https://images.pokemontcg.io/xy6/44_hires.png"
    }
  },
  {
    "id": "xy6-45",
    "name": "Togekiss",
    "number": "45",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Togetic",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Powerful Slap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "Flip a coin for each Energy attached to this Pokémon. This attack does 50 damage times the number of heads."
      },
      {
        "name": "Aura Sphere",
        "cost": [
          "Fairy",
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "This attack does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      468
    ],
    "flavorText": "It shares many blessings with people who respect one another's rights and avoid needless strife.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/45.png",
      "large": "https://images.pokemontcg.io/xy6/45_hires.png"
    }
  },
  {
    "id": "xy6-46",
    "name": "Togekiss",
    "number": "46",
    "artist": "PLANETA",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Togetic",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Serene Grace",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon, you may look at the top 8 cards of your deck. Choose any basic Energy cards you find there and attach them to your Pokémon in any way you like. Shuffle the other cards back into your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Fairy Wind",
        "cost": [
          "Fairy",
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
      468
    ],
    "flavorText": "It shares many blessings with people who respect one another's rights and avoid needless strife.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/46.png",
      "large": "https://images.pokemontcg.io/xy6/46_hires.png"
    }
  },
  {
    "id": "xy6-47",
    "name": "Carbink",
    "number": "47",
    "artist": "Akira Komayama",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Jewel Armor",
        "text": "As long as this Pokémon is on your Bench, prevent all damage done to this Pokémon by attacks (both yours and your opponent's).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Spin Tackle",
        "cost": [
          "Fairy",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Flip a coin. If tails, this Pokémon does 20 damage to itself."
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
      703
    ],
    "flavorText": "Born from temperatures and pressures deep underground, it fires beams from the stone in its head.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/47.png",
      "large": "https://images.pokemontcg.io/xy6/47_hires.png"
    }
  },
  {
    "id": "xy6-48",
    "name": "Klefki",
    "number": "48",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Look for Keys",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Reveal cards from the top of your deck until you reveal an Item card. Put it into your hand. Shuffle the other cards back into your deck."
      },
      {
        "name": "Play Rough",
        "cost": [
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
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
      707
    ],
    "flavorText": "These key collectors threaten any attackers by fiercely jingling their keys at them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/48.png",
      "large": "https://images.pokemontcg.io/xy6/48_hires.png"
    }
  },
  {
    "id": "xy6-49",
    "name": "Dratini",
    "number": "49",
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
      "Dragonair"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hook",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Slam",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Flip 2 coins. This attack does 20 damage times the number of heads."
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
      147
    ],
    "flavorText": "This Pokémon is full of life energy. It continually sheds its skin and grows steadily larger.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/49.png",
      "large": "https://images.pokemontcg.io/xy6/49_hires.png"
    }
  },
  {
    "id": "xy6-50",
    "name": "Dragonair",
    "number": "50",
    "artist": "Mizue",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
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
        "name": "Shed Skin",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 30 damage from this Pokémon."
      },
      {
        "name": "Slam",
        "cost": [
          "Grass",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60×",
        "text": "Flip 2 coins. This attack does 60 damage times the number of heads."
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      148
    ],
    "flavorText": "A mystical Pokémon that exudes a gentle aura. It is said to have the ability to change the weather.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/50.png",
      "large": "https://images.pokemontcg.io/xy6/50_hires.png"
    }
  },
  {
    "id": "xy6-51",
    "name": "Dragonite",
    "number": "51",
    "artist": "kawayoo",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Dragonair",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Max Wind",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon, you may heal all damage from 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Mach Press",
        "cost": [
          "Grass",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Flip 2 coins. If both of them are heads, your opponent's Active Pokémon is now Paralyzed."
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
      149
    ],
    "flavorText": "It is said to make its home somewhere in the sea. It guides crews of shipwrecks to shore.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/51.png",
      "large": "https://images.pokemontcg.io/xy6/51_hires.png"
    }
  },
  {
    "id": "xy6-52",
    "name": "Dragonite",
    "number": "52",
    "artist": "hatachu",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Dragonair",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wrapped in Wind",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach up to 2 basic Energy cards from your hand to this Pokémon."
      },
      {
        "name": "Heavy Impact",
        "cost": [
          "Grass",
          "Grass",
          "Grass",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "150",
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
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      149
    ],
    "flavorText": "It is said to make its home somewhere in the sea. It guides crews of shipwrecks to shore.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/52.png",
      "large": "https://images.pokemontcg.io/xy6/52_hires.png"
    }
  },
  {
    "id": "xy6-53",
    "name": "Altaria",
    "number": "53",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Swablu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Song of Echoes",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Shuffle your hand into your deck. Then, draw a number of cards equal to the number of Benched Pokémon (both yours and your opponent's)."
      },
      {
        "name": "Midnight Eyes",
        "cost": [
          "Water",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Asleep."
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
      334
    ],
    "flavorText": "On sunny days, it flies freely through the sky and blends into the clouds. It sings in a beautiful soprano.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/53.png",
      "large": "https://images.pokemontcg.io/xy6/53_hires.png"
    }
  },
  {
    "id": "xy6-54",
    "name": "Bagon",
    "number": "54",
    "artist": "Kagemaru Himeno",
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
      "Shelgon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Continuous Headbutt",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "Flip a coin until you get tails. This attack does 30 damage times the number of heads."
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
      371
    ],
    "flavorText": "Dreaming of one day flying, it practices by leaping off cliffs every day.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/54.png",
      "large": "https://images.pokemontcg.io/xy6/54_hires.png"
    }
  },
  {
    "id": "xy6-55",
    "name": "Bagon",
    "number": "55",
    "artist": "kirisAki",
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
      "Shelgon"
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
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Almost Flight",
        "cost": [
          "Fire",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "This Pokémon does 10 damage to itself."
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
      371
    ],
    "flavorText": "Dreaming of one day flying, it practices by leaping off cliffs every day.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/55.png",
      "large": "https://images.pokemontcg.io/xy6/55_hires.png"
    }
  },
  {
    "id": "xy6-56",
    "name": "Shelgon",
    "number": "56",
    "artist": "sui",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Bagon",
    "evolvesTo": [
      "Salamence"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Exoskeleton",
        "text": "Any damage done to this Pokémon by attacks is reduced by 10 (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rolling Tackle",
        "cost": [
          "Fire",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      372
    ],
    "flavorText": "Its armored body makes all attacks bounce off. The armor is too tough, however, making it heavy and somewhat sluggish.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/56.png",
      "large": "https://images.pokemontcg.io/xy6/56_hires.png"
    }
  },
  {
    "id": "xy6-57",
    "name": "Salamence",
    "number": "57",
    "artist": "TOKIYA",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Shelgon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shatter",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "60",
        "text": "Discard any Stadium card in play."
      },
      {
        "name": "Power Howl",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20×",
        "text": "This attack does 20 damage times the number of cards in your opponent's hand."
      },
      {
        "name": "Steam Blast",
        "cost": [
          "Fire",
          "Fire",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "170",
        "text": "Discard 3 Energy attached to this Pokémon."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      373
    ],
    "flavorText": "It's uncontrollable if enraged. It flies around spouting flames and scorching fields and mountains.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/57.png",
      "large": "https://images.pokemontcg.io/xy6/57_hires.png"
    }
  },
  {
    "id": "xy6-58",
    "name": "Latios-EX",
    "number": "58",
    "artist": "Ayaka Yoshida",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Latios-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Fast Raid",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "If you go first, you can use this attack on your first turn."
      },
      {
        "name": "Light Pulse",
        "cost": [
          "Water",
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "110",
        "text": "Prevent all effects of your opponent's attacks, except damage, done to this Pokémon during your opponent's next turn."
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      381
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/58.png",
      "large": "https://images.pokemontcg.io/xy6/58_hires.png"
    }
  },
  {
    "id": "xy6-59",
    "name": "M Latios-EX",
    "number": "59",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "220",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Latios-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Sonic Ace",
        "cost": [
          "Water",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard 2 Energy attached to this Pokémon. This attack does 120 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      381
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/59.png",
      "large": "https://images.pokemontcg.io/xy6/59_hires.png"
    }
  },
  {
    "id": "xy6-60",
    "name": "Rayquaza-EX",
    "number": "60",
    "artist": "PLANETA",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Rayquaza-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Dragon Claw",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Dragon Strike",
        "cost": [
          "Fire",
          "Fire",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "130",
        "text": "Flip a coin. If tails, this Pokémon can't use Dragon Strike during your next turn."
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
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/60.png",
      "large": "https://images.pokemontcg.io/xy6/60_hires.png"
    }
  },
  {
    "id": "xy6-61",
    "name": "M Rayquaza-EX",
    "number": "61",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "230",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Rayquaza-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Dragon Ascent",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "300",
        "text": "Discard 2 Energy attached to this Pokémon."
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
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/61.png",
      "large": "https://images.pokemontcg.io/xy6/61_hires.png"
    }
  },
  {
    "id": "xy6-62",
    "name": "Hydreigon-EX",
    "number": "62",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dragon Road",
        "text": "If there is any Stadium card in play, the Retreat Cost of each of your Dragon Pokémon in play is ColorlessColorless less.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Shred",
        "cost": [
          "Psychic",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
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
      635
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/62.png",
      "large": "https://images.pokemontcg.io/xy6/62_hires.png"
    }
  },
  {
    "id": "xy6-63",
    "name": "Reshiram",
    "number": "63",
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
    "abilities": [
      {
        "name": "Turboblaze",
        "text": "Once during your turn (before your attack), if this Pokémon is your Active Pokémon, you may attach a Fire Energy card from your hand to 1 of your Dragon Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Bright Wing",
        "cost": [
          "Fire",
          "Fire",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "110",
        "text": "Discard a Fire Energy attached to this Pokémon."
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      643
    ],
    "flavorText": "When Reshiram's tail flares, the heat energy moves the atmosphere and changes the world's weather.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/63.png",
      "large": "https://images.pokemontcg.io/xy6/63_hires.png"
    }
  },
  {
    "id": "xy6-64",
    "name": "Zekrom",
    "number": "64",
    "artist": "kawayoo",
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
        "name": "Energy Stream",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Attach a basic Energy card from your discard pile to this Pokémon."
      },
      {
        "name": "Electric Ball",
        "cost": [
          "Fire",
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      644
    ],
    "flavorText": "Concealing itself in lightning clouds, it flies throughout the Unova region. It creates electricity in its tail.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/64.png",
      "large": "https://images.pokemontcg.io/xy6/64_hires.png"
    }
  },
  {
    "id": "xy6-65",
    "name": "Spearow",
    "number": "65",
    "artist": "Masakazu Fukuda",
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
      "Fearow"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Peck",
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
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      21
    ],
    "flavorText": "Eats bugs in grassy areas. It has to flap its short wings at high speed to stay airborne.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/65.png",
      "large": "https://images.pokemontcg.io/xy6/65_hires.png"
    }
  },
  {
    "id": "xy6-66",
    "name": "Fearow",
    "number": "66",
    "artist": "Satoshi Shirai",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Spearow",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Peck",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Drill Run",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "70",
        "text": "Flip a coin. If heads, discard an Energy attached to your opponent's Active Pokémon."
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
      22
    ],
    "flavorText": "It has the stamina to fly all day on its broad wings. It fights by using its sharp beak.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/66.png",
      "large": "https://images.pokemontcg.io/xy6/66_hires.png"
    }
  },
  {
    "id": "xy6-67",
    "name": "Meowth",
    "number": "67",
    "artist": "Akira Komayama",
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
      "Persian"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Feelin' Fine",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card."
      },
      {
        "name": "Fury Swipes",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20×",
        "text": "Flip 3 coins. This attack does 20 damage times the number of heads."
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
    "flavorText": "Adores round objects. It wanders the streets on a nightly basis to look for dropped loose change.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/67.png",
      "large": "https://images.pokemontcg.io/xy6/67_hires.png"
    }
  },
  {
    "id": "xy6-68",
    "name": "Dunsparce",
    "number": "68",
    "artist": "Yuka Morii",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Burrow",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard the top card of your opponent's deck."
      },
      {
        "name": "Rollout",
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      206
    ],
    "flavorText": "It digs into the ground with its tail and makes a mazelike nest. It can fly just a little.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/68.png",
      "large": "https://images.pokemontcg.io/xy6/68_hires.png"
    }
  },
  {
    "id": "xy6-69",
    "name": "Skarmory",
    "number": "69",
    "artist": "Hitoshi Ariga",
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
        "name": "Call for Family",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Shuffle your deck afterward."
      },
      {
        "name": "Blow Through",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If there is any Stadium card in play, this attack does 30 more damage."
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
      227
    ],
    "flavorText": "Despite being clad entirely in iron-hard armor, it flies at speed of over 180 mph.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/69.png",
      "large": "https://images.pokemontcg.io/xy6/69_hires.png"
    }
  },
  {
    "id": "xy6-70",
    "name": "Taillow",
    "number": "70",
    "artist": "Atsuko Nishida",
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
      "Swellow"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Peck",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 2 coins. This attack does 10 damage times the number of heads."
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
      276
    ],
    "flavorText": "It dislikes cold seasons. They migrate to other lands in search of warmth, flying over 180 miles a day.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/70.png",
      "large": "https://images.pokemontcg.io/xy6/70_hires.png"
    }
  },
  {
    "id": "xy6-71",
    "name": "Swellow",
    "number": "71",
    "artist": "Sanosuke Sakuma",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Taillow",
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
        "damage": "20",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      },
      {
        "name": "Aerial Ace",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "Flip a coin. If heads, this attack does 30 more damage."
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
      277
    ],
    "flavorText": "It dives at a steep angle as soon as it spots its prey. It catches its prey with sharp claws.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/71.png",
      "large": "https://images.pokemontcg.io/xy6/71_hires.png"
    }
  },
  {
    "id": "xy6-72",
    "name": "Swellow",
    "number": "72",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Taillow",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Peck",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Wing Attack",
        "cost": [
          "Colorless",
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
      277
    ],
    "flavorText": "It dives at a steep angle as soon as it spots its prey. It catches its prey with sharp claws.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/72.png",
      "large": "https://images.pokemontcg.io/xy6/72_hires.png"
    }
  },
  {
    "id": "xy6-73",
    "name": "Swablu",
    "number": "73",
    "artist": "Mizue",
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
      "Altaria"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bind Wound",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 20 damage from 1 of your Pokémon."
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
      333
    ],
    "flavorText": "It constantly grooms its cotton-like wings. It takes a shower to clean itself if it becomes dirty.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/73.png",
      "large": "https://images.pokemontcg.io/xy6/73_hires.png"
    }
  },
  {
    "id": "xy6-74",
    "name": "Altaria",
    "number": "74",
    "artist": "Naoki Saito",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Swablu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Clear Humming",
        "text": "Each of your Colorless Pokémon has no Weakness.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Wing Attack",
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
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      334
    ],
    "flavorText": "On sunny days, it flies freely through the sky and blends into the clouds. It sings in a beautiful soprano.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/74.png",
      "large": "https://images.pokemontcg.io/xy6/74_hires.png"
    }
  },
  {
    "id": "xy6-75",
    "name": "Rayquaza-EX",
    "number": "75",
    "artist": "Ryota Murayama",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Rayquaza-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Intensifying Burn",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If your opponent's Active Pokémon is a Pokémon-EX, this attack does 50 more damage."
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
        "text": "Discard the top 3 cards of your deck."
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
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/75.png",
      "large": "https://images.pokemontcg.io/xy6/75_hires.png"
    }
  },
  {
    "id": "xy6-76",
    "name": "M Rayquaza-EX",
    "number": "76",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo EX",
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
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
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
      "small": "https://images.pokemontcg.io/xy6/76.png",
      "large": "https://images.pokemontcg.io/xy6/76_hires.png"
    }
  },
  {
    "id": "xy6-77",
    "name": "Shaymin-EX",
    "number": "77",
    "artist": "Ayaka Yoshida",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Set Up",
        "text": "When you play this Pokémon from your hand onto your Bench, you may draw cards until you have 6 cards in your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Sky Return",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Return this Pokémon and all cards attached to it to your hand."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Banned"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/77.png",
      "large": "https://images.pokemontcg.io/xy6/77_hires.png"
    }
  },
  {
    "id": "xy6-77a",
    "name": "Shaymin-EX",
    "number": "77a",
    "artist": "TOKIYA",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Set Up",
        "text": "When you play this Pokémon from your hand onto your Bench, you may draw cards until you have 6 cards in your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Sky Return",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Return this Pokémon and all cards attached to it to your hand."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Banned"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/77a.png",
      "large": "https://images.pokemontcg.io/xy6/77a_hires.png"
    }
  },
  {
    "id": "xy6-78",
    "name": "Pidove",
    "number": "78",
    "artist": "kirisAki",
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
        "name": "Homing Pidove",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top card of your deck. Then, you may shuffle your deck."
      },
      {
        "name": "Gust",
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
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      519
    ],
    "flavorText": "These Pokémon live in cities. They are accustomed to people. Flocks often gather in parks and plazas.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/78.png",
      "large": "https://images.pokemontcg.io/xy6/78_hires.png"
    }
  },
  {
    "id": "xy6-79",
    "name": "Tranquill",
    "number": "79",
    "artist": "sui",
    "rarity": "Uncommon",
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
        "name": "Fly",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Flip a coin. If tails, this attack does nothing. If heads, prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn."
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
      520
    ],
    "flavorText": "No matter where in the world it goes, it knows where its nest is, so it never gets separated from its Trainer.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/79.png",
      "large": "https://images.pokemontcg.io/xy6/79_hires.png"
    }
  },
  {
    "id": "xy6-80",
    "name": "Unfezant",
    "number": "80",
    "artist": "Shigenori Negishi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Tranquill",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Quick Attack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 30 more damage."
      },
      {
        "name": "Strong Winds",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Shuffle all cards attached to each player's Pokémon into that player's deck."
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
      521
    ],
    "flavorText": "Males have plumage on their heads. They will never let themselves fell close to anyone other than their Trainers.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/80.png",
      "large": "https://images.pokemontcg.io/xy6/80_hires.png"
    }
  },
  {
    "id": "xy6-81",
    "name": "Unfezant",
    "number": "81",
    "artist": "TOKIYA",
    "rarity": "Rare",
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
        "name": "Feather Dance",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "During your next turn, each of this Pokémon's attacks does 80 more damage (before applying Weakness and Resistance)."
      },
      {
        "name": "Sky Attack",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
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
        "value": "-20"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      521
    ],
    "flavorText": "Males have plumage on their heads. They will never let themselves feel close to anyone other than their Trainers.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/81.png",
      "large": "https://images.pokemontcg.io/xy6/81_hires.png"
    }
  },
  {
    "id": "xy6-82",
    "name": "Fletchling",
    "number": "82",
    "artist": "Kanako Eo",
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
        "name": "Acrobatics",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip 2 coins. This attack does 10 more damage for each heads."
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
      661
    ],
    "flavorText": "Despite the beauty of its lilting voice, it's merciless to intruders that enter its territory.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/82.png",
      "large": "https://images.pokemontcg.io/xy6/82_hires.png"
    }
  },
  {
    "id": "xy6-83",
    "name": "Gallade Spirit Link",
    "number": "83",
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
      "Your turn does not end if the Pokémon this card is attached to becomes M Gallade-EX.",
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
      "small": "https://images.pokemontcg.io/xy6/83.png",
      "large": "https://images.pokemontcg.io/xy6/83_hires.png"
    }
  },
  {
    "id": "xy6-84",
    "name": "Healing Scarf",
    "number": "84",
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
      "Whenever you attach an Energy card from your hand to the Pokémon this card is attached to, heal 20 damage from it.",
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
      "small": "https://images.pokemontcg.io/xy6/84.png",
      "large": "https://images.pokemontcg.io/xy6/84_hires.png"
    }
  },
  {
    "id": "xy6-85",
    "name": "Latios Spirit Link",
    "number": "85",
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
      "Your turn does not end if the Pokémon this card is attached to becomes M Latios-EX.",
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
      "small": "https://images.pokemontcg.io/xy6/85.png",
      "large": "https://images.pokemontcg.io/xy6/85_hires.png"
    }
  },
  {
    "id": "xy6-86",
    "name": "Mega Turbo",
    "number": "86",
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
      "Attach a basic Energy card from your discard pile to 1 of your Mega Evolution Pokémon.",
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
      "small": "https://images.pokemontcg.io/xy6/86.png",
      "large": "https://images.pokemontcg.io/xy6/86_hires.png"
    }
  },
  {
    "id": "xy6-87",
    "name": "Rayquaza Spirit Link",
    "number": "87",
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
      "Your turn does not end if the Pokémon this card is attached to becomes M Rayquaza-EX.",
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
      "small": "https://images.pokemontcg.io/xy6/87.png",
      "large": "https://images.pokemontcg.io/xy6/87_hires.png"
    }
  },
  {
    "id": "xy6-88",
    "name": "Revive",
    "number": "88",
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
      "Put a Basic Pokémon from your discard pile onto your Bench.",
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
      "small": "https://images.pokemontcg.io/xy6/88.png",
      "large": "https://images.pokemontcg.io/xy6/88_hires.png"
    }
  },
  {
    "id": "xy6-89",
    "name": "Sky Field",
    "number": "89",
    "artist": "Ayaka Yoshida",
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
      "Each player can have 8 Pokémon on his or her Bench.",
      "(When this card leaves play, each player discards Benched Pokémon until he or she has 5 Pokémon on the Bench. The owner of this card discards first.)",
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
      "small": "https://images.pokemontcg.io/xy6/89.png",
      "large": "https://images.pokemontcg.io/xy6/89_hires.png"
    }
  },
  {
    "id": "xy6-90",
    "name": "Steven",
    "number": "90",
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
      "Search your deck for a Supporter card and a basic Energy card, reveal them, and put them into your hand. Shuffle your deck afterward.",
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
      "small": "https://images.pokemontcg.io/xy6/90.png",
      "large": "https://images.pokemontcg.io/xy6/90_hires.png"
    }
  },
  {
    "id": "xy6-91",
    "name": "Switch",
    "number": "91",
    "artist": "5ban Graphics",
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
      "Switch your Active Pokémon with 1 of your Benched Pokémon.",
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
      "small": "https://images.pokemontcg.io/xy6/91.png",
      "large": "https://images.pokemontcg.io/xy6/91_hires.png"
    }
  },
  {
    "id": "xy6-92",
    "name": "Trainers' Mail",
    "number": "92",
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
      "Look at the top 4 cards of your deck. You may reveal a Trainer card you find there (except Trainers' Mail) and put it into your hand. Shuffle the other cards back into your deck.",
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
      "small": "https://images.pokemontcg.io/xy6/92.png",
      "large": "https://images.pokemontcg.io/xy6/92_hires.png"
    }
  },
  {
    "id": "xy6-92a",
    "name": "Trainers' Mail",
    "number": "92a",
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
      "Look at the top 4 cards of your deck. You may reveal a Trainer card you find there (except Trainers' Mail) and put it into your hand. Shuffle the other cards back into your deck.",
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
      "small": "https://images.pokemontcg.io/xy6/92a.png",
      "large": "https://images.pokemontcg.io/xy6/92a_hires.png"
    }
  },
  {
    "id": "xy6-93",
    "name": "Ultra Ball",
    "number": "93",
    "artist": "5ban Graphics",
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
      "Discard 2 cards from your hand. (If you can't discard 2 cards, you can't play this card.) Search your deck for a Pokémon, reveal it, and put it into your hand. Shuffle your deck afterward.",
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
      "small": "https://images.pokemontcg.io/xy6/93.png",
      "large": "https://images.pokemontcg.io/xy6/93_hires.png"
    }
  },
  {
    "id": "xy6-94",
    "name": "Wally",
    "number": "94",
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
      "Search your deck for a card that evolves from 1 of your Pokémon (excluding Pokémon-EX) and put it onto that Pokémon. (This counts as evolving that Pokémon.) Shuffle your deck afterward. You can use this card during your first turn or on a Pokémon that was put into play this turn.",
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
      "small": "https://images.pokemontcg.io/xy6/94.png",
      "large": "https://images.pokemontcg.io/xy6/94_hires.png"
    }
  },
  {
    "id": "xy6-95",
    "name": "Wide Lens",
    "number": "95",
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
      "Damage from the attacks of the Pokémon this card is attached to is affected by Weakness and Resistance for your opponent's Benched Pokémon.",
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
      "small": "https://images.pokemontcg.io/xy6/95.png",
      "large": "https://images.pokemontcg.io/xy6/95_hires.png"
    }
  },
  {
    "id": "xy6-96",
    "name": "Winona",
    "number": "96",
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
      "Search your deck for up to 3 Colorless Pokémon and put them into your hand. Shuffle your deck afterward.",
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
      "small": "https://images.pokemontcg.io/xy6/96.png",
      "large": "https://images.pokemontcg.io/xy6/96_hires.png"
    }
  },
  {
    "id": "xy6-97",
    "name": "Double Dragon Energy",
    "number": "97",
    "artist": "5ban Graphics",
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
      "This card can only be attached to Dragon Pokémon. This card provides every type of Energy, but provides only 2 Energy at a time, only while this card is attached to a Dragon Pokémon.",
      "(If this card is attached to anything other than a Dragon Pokémon, discard this card.)"
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
      "small": "https://images.pokemontcg.io/xy6/97.png",
      "large": "https://images.pokemontcg.io/xy6/97_hires.png"
    }
  },
  {
    "id": "xy6-98",
    "name": "Thundurus-EX",
    "number": "98",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Headlock",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 30 more damage. If tails, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Voltage Rush",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "This Pokémon does 50 damage to itself."
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
      642
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/98.png",
      "large": "https://images.pokemontcg.io/xy6/98_hires.png"
    }
  },
  {
    "id": "xy6-99",
    "name": "Gallade-EX",
    "number": "99",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
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
    "evolvesTo": [
      "M Gallade-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Swift Lunge",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "You may have your opponent switch his or her Active Pokémon with 1 of his or her Benched Pokémon."
      },
      {
        "name": "Piercing Prizes",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "This attack does 20 more damage for each of your remaining Prize cards."
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
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/99.png",
      "large": "https://images.pokemontcg.io/xy6/99_hires.png"
    }
  },
  {
    "id": "xy6-100",
    "name": "M Gallade-EX",
    "number": "100",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "220",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Gallade-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Unwavering Blade",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "This attack does 30 damage to each of your opponent's Benched Pokémon that has any damage counters on it. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/100.png",
      "large": "https://images.pokemontcg.io/xy6/100_hires.png"
    }
  },
  {
    "id": "xy6-101",
    "name": "Latios-EX",
    "number": "101",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Latios-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Fast Raid",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "If you go first, you can use this attack on your first turn."
      },
      {
        "name": "Light Pulse",
        "cost": [
          "Water",
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "110",
        "text": "Prevent all effects of your opponent's attacks, except damage, done to this Pokémon during your opponent's next turn."
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      381
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/101.png",
      "large": "https://images.pokemontcg.io/xy6/101_hires.png"
    }
  },
  {
    "id": "xy6-102",
    "name": "M Latios-EX",
    "number": "102",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "220",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Latios-EX",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Sonic Ace",
        "cost": [
          "Water",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard 2 Energy attached to this Pokémon. This attack does 120 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      381
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/102.png",
      "large": "https://images.pokemontcg.io/xy6/102_hires.png"
    }
  },
  {
    "id": "xy6-103",
    "name": "Hydreigon-EX",
    "number": "103",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dragon Road",
        "text": "If there is any Stadium card in play, the Retreat Cost of each of your Dragon Pokémon in play is ColorlessColorless less.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Shred",
        "cost": [
          "Psychic",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
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
      635
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/103.png",
      "large": "https://images.pokemontcg.io/xy6/103_hires.png"
    }
  },
  {
    "id": "xy6-104",
    "name": "Rayquaza-EX",
    "number": "104",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "M Rayquaza-EX"
    ],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Intensifying Burn",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If your opponent's Active Pokémon is a Pokémon-EX, this attack does 50 more damage."
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
        "text": "Discard the top 3 cards of your deck."
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
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/104.png",
      "large": "https://images.pokemontcg.io/xy6/104_hires.png"
    }
  },
  {
    "id": "xy6-105",
    "name": "M Rayquaza-EX",
    "number": "105",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
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
      "Mega Evolution rule: When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
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
      "small": "https://images.pokemontcg.io/xy6/105.png",
      "large": "https://images.pokemontcg.io/xy6/105_hires.png"
    }
  },
  {
    "id": "xy6-106",
    "name": "Shaymin-EX",
    "number": "106",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Set Up",
        "text": "When you play this Pokémon from your hand onto your Bench, you may draw cards until you have 6 cards in your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Sky Return",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Return this Pokémon and all cards attached to it to your hand."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Banned"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/xy6/106.png",
      "large": "https://images.pokemontcg.io/xy6/106_hires.png"
    }
  },
  {
    "id": "xy6-107",
    "name": "Wally",
    "number": "107",
    "artist": "Emi Ando",
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
      "Search your deck for a card that evolves from 1 of your Pokémon (excluding Pokémon-EX) and put it onto that Pokémon. (This counts as evolving that Pokémon.) Shuffle your deck afterward. You can use this card during your first turn or on a Pokémon that was put into play this turn.",
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
      "small": "https://images.pokemontcg.io/xy6/107.png",
      "large": "https://images.pokemontcg.io/xy6/107_hires.png"
    }
  },
  {
    "id": "xy6-108",
    "name": "Winona",
    "number": "108",
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
      "Search your deck for up to 3 Colorless Pokémon and put them into your hand. Shuffle your deck afterward.",
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
      "small": "https://images.pokemontcg.io/xy6/108.png",
      "large": "https://images.pokemontcg.io/xy6/108_hires.png"
    }
  },
  {
    "id": "xy6-109",
    "name": "Energy Switch",
    "number": "109",
    "artist": "5ban Graphics",
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
      "Move a basic Energy from 1 of your Pokémon to another of your Pokémon.",
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
      "small": "https://images.pokemontcg.io/xy6/109.png",
      "large": "https://images.pokemontcg.io/xy6/109_hires.png"
    }
  },
  {
    "id": "xy6-110",
    "name": "VS Seeker",
    "number": "110",
    "artist": "5ban Graphics",
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
      "Put a Supporter card from your discard pile into your hand.",
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
      "small": "https://images.pokemontcg.io/xy6/110.png",
      "large": "https://images.pokemontcg.io/xy6/110_hires.png"
    }
  }
]

export default cardDetails
