import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "bw8-1",
    "name": "Turtwig",
    "number": "1",
    "artist": "Kouki Saitou",
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
        "name": "Nap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 20 damage from this Pokémon."
      },
      {
        "name": "Razor Leaf",
        "cost": [
          "Grass",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      387
    ],
    "flavorText": "The shell on its back is made of soil. On a very healthy Turtwig, the shell should feel moist.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/1.png",
      "large": "https://images.pokemontcg.io/bw8/1_hires.png"
    }
  },
  {
    "id": "bw8-2",
    "name": "Grotle",
    "number": "2",
    "artist": "Sumiyoshi Kizuki",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Knock Away",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
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
      388
    ],
    "flavorText": "It knows where pure water wells up. It carries fellow Pokémon there on its back.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/2.png",
      "large": "https://images.pokemontcg.io/bw8/2_hires.png"
    }
  },
  {
    "id": "bw8-3",
    "name": "Torterra",
    "number": "3",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Team Plasma"
    ],
    "hp": "150",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Grotle",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Guard Press",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "During your opponent's next turn, any damage to this Pokémon by attacks is reduced by 20 (after applying Weakness and Resistance)."
      },
      {
        "name": "Rumble Stomp",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80+",
        "text": "Flip a coin until you get tails. This attack does 20 more damage for each heads."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      389
    ],
    "flavorText": "Some Pokémon are born on a Torterra's back and spend their entire life there.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/3.png",
      "large": "https://images.pokemontcg.io/bw8/3_hires.png"
    }
  },
  {
    "id": "bw8-4",
    "name": "Combee",
    "number": "4",
    "artist": "Yukiko Baba",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "30",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Vespiquen"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sting Missile",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Shuffle this Pokémon and all cards attached to it into your deck."
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
      415
    ],
    "flavorText": "This Pokémon is a set of three. When they sleep, they gather up and form a giant hive of 100 Combee.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/4.png",
      "large": "https://images.pokemontcg.io/bw8/4_hires.png"
    }
  },
  {
    "id": "bw8-5",
    "name": "Vespiquen",
    "number": "5",
    "artist": "Hajime Kusajima",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Combee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gather Order",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for as many Combee as you like and put them onto your Bench. Shuffle your deck afterward."
      },
      {
        "name": "Damage Beat",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Does 20 damage times the number of damage counters on the Defending Pokémon."
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
      416
    ],
    "flavorText": "It houses its colony in cells in its body and releases various pheromones to make those grubs do its bidding.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/5.png",
      "large": "https://images.pokemontcg.io/bw8/5_hires.png"
    }
  },
  {
    "id": "bw8-6",
    "name": "Cherubi",
    "number": "6",
    "artist": "sui",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Leech Seed",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Heal 10 damage from this Pokémon."
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      420
    ],
    "flavorText": "The small ball is not only filled with nutrients, it is also tasty. Starly try to peck it off.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/6.png",
      "large": "https://images.pokemontcg.io/bw8/6_hires.png"
    }
  },
  {
    "id": "bw8-7",
    "name": "Cherrim",
    "number": "7",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Cherubi",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fair-Weather Heal",
        "text": "Once during your turn (before your attack), you may heal 20 damage from 1 of your Pokémon that has any Grass Energy attached to it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Random Peck",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip 2 coins. This attack does 20 more damage for each heads."
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
      "small": "https://images.pokemontcg.io/bw8/7.png",
      "large": "https://images.pokemontcg.io/bw8/7_hires.png"
    }
  },
  {
    "id": "bw8-8",
    "name": "Sewaddle",
    "number": "8",
    "artist": "Atsuko Nishida",
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
      "Swadloon"
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
      540
    ],
    "flavorText": "Since this Pokémon makes its own clothes out of leaves, it is a popular mascot for fashion designers.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/8.png",
      "large": "https://images.pokemontcg.io/bw8/8_hires.png"
    }
  },
  {
    "id": "bw8-9",
    "name": "Swadloon",
    "number": "9",
    "artist": "Kyoko Umemoto",
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
        "name": "Swaddle Guard",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, any damage done to this Pokémon by attacks is reduced by 40 (after applying Weakness and Resistance)."
      },
      {
        "name": "Surprise Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
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
      541
    ],
    "flavorText": "Preferring dark, damp places, it spends the entire day eating fallen leaves that lie around it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/9.png",
      "large": "https://images.pokemontcg.io/bw8/9_hires.png"
    }
  },
  {
    "id": "bw8-10",
    "name": "Leavanny",
    "number": "10",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Swadloon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Cleave",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip 2 coins. If both of them are heads, discard all Energy attached to the Defending Pokémon."
      },
      {
        "name": "Leaf Blade",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
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
      542
    ],
    "flavorText": "Upon finding a small Pokémon, it weaves clothing for it from leaves by using the sticky silk secreted from its mouth.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/10.png",
      "large": "https://images.pokemontcg.io/bw8/10_hires.png"
    }
  },
  {
    "id": "bw8-11",
    "name": "Maractus",
    "number": "11",
    "artist": "Shigenori Negishi",
    "rarity": "Uncommon",
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
        "name": "Dazzle Dance",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "The Defending Pokémon is now Confused."
      },
      {
        "name": "Ambush",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 30 more damage."
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      556
    ],
    "flavorText": "When it moves rhythmically, it makes a sound similar to maracas, making the surprised Pokémon flee.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/11.png",
      "large": "https://images.pokemontcg.io/bw8/11_hires.png"
    }
  },
  {
    "id": "bw8-12",
    "name": "Foongus",
    "number": "12",
    "artist": "Mitsuhiro Arita",
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
      "Amoonguss"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Astonish",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, choose a random card from your opponent's hand. Your opponent reveals that card and shuffles it into his or her deck."
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      590
    ],
    "flavorText": "It lures Pokémon with its pattern that looks just like a Poké Ball then releases poison spores.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/12.png",
      "large": "https://images.pokemontcg.io/bw8/12_hires.png"
    }
  },
  {
    "id": "bw8-13",
    "name": "Amoonguss",
    "number": "13",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Team Plasma"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Foongus",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Astonish",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, choose a random card from your opponent's hand. Your opponent reveals that card and shuffles it into his or her deck."
      },
      {
        "name": "Miracle Powder",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, choose a Special Condition. The Defending Pokémon is now affected by that Special Condition."
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      591
    ],
    "flavorText": "It moves the caps on both arms and does a dance to lure prey. It prefers damp places.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/13.png",
      "large": "https://images.pokemontcg.io/bw8/13_hires.png"
    }
  },
  {
    "id": "bw8-14",
    "name": "Moltres-EX",
    "number": "14",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX",
      "Team Plasma"
    ],
    "hp": "170",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Destructive Flame",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, discard an Energy attached to the Defending Pokémon."
      },
      {
        "name": "Power Flame",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80+",
        "text": "If this Pokémon has any Plasma Energy attached to it, this attack does 40 more damage."
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
      146
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/14.png",
      "large": "https://images.pokemontcg.io/bw8/14_hires.png"
    }
  },
  {
    "id": "bw8-15",
    "name": "Chimchar",
    "number": "15",
    "artist": "sui",
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
      390
    ],
    "flavorText": "It is very agile. Before going to sleep, it extinguishes the flame on its tail to prevent fires.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/15.png",
      "large": "https://images.pokemontcg.io/bw8/15_hires.png"
    }
  },
  {
    "id": "bw8-16",
    "name": "Monferno",
    "number": "16",
    "artist": "Masakazu Fukuda",
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
        "name": "Loud Howl",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent Switches the Defending Pokémon with 1 of his or her Benched Pokémon."
      },
      {
        "name": "Fire Tail Slap",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Discard an Energy attached to this Pokémon."
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
    "flavorText": "It skillfully controls the intensity of the fire on its tail to keep its foes at an ideal distance.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/16.png",
      "large": "https://images.pokemontcg.io/bw8/16_hires.png"
    }
  },
  {
    "id": "bw8-17",
    "name": "Infernape",
    "number": "17",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Team Plasma"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Monferno",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Torment",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Choose 1 of the Defending Pokémon's attack. That Pokémon can't use that attack during your opponent's next turn."
      },
      {
        "name": "Malevolent Fire",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "Discard all Energy attached to this Pokémon."
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
    "flavorText": "It uses unique fighting moves with fire on its hand and feet. It will take on any opponent.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/17.png",
      "large": "https://images.pokemontcg.io/bw8/17_hires.png"
    }
  },
  {
    "id": "bw8-18",
    "name": "Victini-EX",
    "number": "18",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "110",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Turbo Energize",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for 2 basic Energy cards and attach them to your Benched Pokémon in any way you like. Shuffle your deck afterward."
      },
      {
        "name": "Intensifying Burn",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "If the Defending Pokémon is a Pokémon-EX, this attack does 50 more damage."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/18.png",
      "large": "https://images.pokemontcg.io/bw8/18_hires.png"
    }
  },
  {
    "id": "bw8-19",
    "name": "Pansear",
    "number": "19",
    "artist": "Atsuko Nishida",
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
      "Simisear"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scratch",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Double Fire",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40×",
        "text": "Flip 2 coins. This attack does 40 damage times the number of heads."
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
    "flavorText": "Very intelligent, it roasts berries before eating them. It likes to help people.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/19.png",
      "large": "https://images.pokemontcg.io/bw8/19_hires.png"
    }
  },
  {
    "id": "bw8-20",
    "name": "Simisear",
    "number": "20",
    "artist": "Naoki Saito",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Pansear",
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
        "damage": "20",
        "text": "The Defending Pokémon is now Burned."
      },
      {
        "name": "Flame Blast",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "Does 20 more damage for each Fire Energy attached to this Pokémon."
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
      514
    ],
    "flavorText": "When it gets excited, embers rise from its head and tail and it gets hot. For some reason, it loves sweets.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/20.png",
      "large": "https://images.pokemontcg.io/bw8/20_hires.png"
    }
  },
  {
    "id": "bw8-21",
    "name": "Litwick",
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
      "Lampent"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Surprise Attack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
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
      607
    ],
    "flavorText": "Its flame is usually out, but it starts shining when it absorbs life force from people or Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/21.png",
      "large": "https://images.pokemontcg.io/bw8/21_hires.png"
    }
  },
  {
    "id": "bw8-22",
    "name": "Lampent",
    "number": "22",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Litwick",
    "evolvesTo": [
      "Chandelure"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Freefloating",
        "text": "If this Pokémon has no Energy attached to it, this Pokémon has no Retreat Cost.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Will-O-Wisp",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      608
    ],
    "flavorText": "The spirits it absorbs fuel its baleful fire. It hangs around hospitals waiting for people to pass on.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/22.png",
      "large": "https://images.pokemontcg.io/bw8/22_hires.png"
    }
  },
  {
    "id": "bw8-23",
    "name": "Heatmor",
    "number": "23",
    "artist": "Suwama Chiaki",
    "rarity": "Uncommon",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Luring Flame",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch 1 of your opponent's Benched Pokémon with the Defending Pokémon. The new Defending Pokémon is now Burned."
      },
      {
        "name": "Fiery Licks",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "50×",
        "text": "Discard the top 4 cards of your deck. This attack does 50 damage times the number of Fire Energy cards discarded."
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
    "flavorText": "It draws in air through its tail, transforms it into fire, and uses it like a tongue. It melts Durant and eats them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/23.png",
      "large": "https://images.pokemontcg.io/bw8/23_hires.png"
    }
  },
  {
    "id": "bw8-24",
    "name": "Squirtle",
    "number": "24",
    "artist": "Naoki Saito",
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
      7
    ],
    "flavorText": "It shelters itself in its shell, then strikes back with spouts of water at every opportunity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/24.png",
      "large": "https://images.pokemontcg.io/bw8/24_hires.png"
    }
  },
  {
    "id": "bw8-25",
    "name": "Articuno-EX",
    "number": "25",
    "artist": "Toyste Beach",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX",
      "Team Plasma"
    ],
    "hp": "170",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Blizzard",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Does 10 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Frost Prison",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "If this Pokémon has any Plasma Energy attached to it, the Defending Pokémon is now Paralyzed."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/25.png",
      "large": "https://images.pokemontcg.io/bw8/25_hires.png"
    }
  },
  {
    "id": "bw8-26",
    "name": "Swinub",
    "number": "26",
    "artist": "Kouki Saitou",
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
      "Piloswine"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Headbutt",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Flip 2 coins. This attack does 20 damage times the number of heads."
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
      220
    ],
    "flavorText": "Rooting the tip of its snout into the ground, it searches for food. Sometimes, it even digs up a hot spring.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/26.png",
      "large": "https://images.pokemontcg.io/bw8/26_hires.png"
    }
  },
  {
    "id": "bw8-27",
    "name": "Piloswine",
    "number": "27",
    "artist": "Suwama Chiaki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Swinub",
    "evolvesTo": [
      "Mamoswine"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ice Beam",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Quintuple Headbutt",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "40×",
        "text": "Flip 5 coins. This attack does 40 damage times the number of heads."
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
      221
    ],
    "flavorText": "With its excellent sense of smell, it's even able to find mushrooms that are buried under frozen ground.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/27.png",
      "large": "https://images.pokemontcg.io/bw8/27_hires.png"
    }
  },
  {
    "id": "bw8-28",
    "name": "Mamoswine",
    "number": "28",
    "artist": "match",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Piloswine",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Frost Stone",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "Flip a coin. If heads, this attack does 20 more damage and the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Continuous Headbutt",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "90×",
        "text": "Flip a coin until you get tails. This attack does 90 damage times the number of heads."
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
      473
    ],
    "flavorText": "When the temperature rose at the end of the ice age, most Mamoswine disappeared.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/28.png",
      "large": "https://images.pokemontcg.io/bw8/28_hires.png"
    }
  },
  {
    "id": "bw8-29",
    "name": "Lotad",
    "number": "29",
    "artist": "Midori Harada",
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
      "Lombre"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bubble Beam",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
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
      270
    ],
    "flavorText": "It looks like an aquatic plant and serves as a ferry to Pokémon that can't swim.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/29.png",
      "large": "https://images.pokemontcg.io/bw8/29_hires.png"
    }
  },
  {
    "id": "bw8-30",
    "name": "Lombre",
    "number": "30",
    "artist": "Suwama Chiaki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Lotad",
    "evolvesTo": [
      "Ludicolo"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Jump On",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
      },
      {
        "name": "Wave Splash",
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
      271
    ],
    "flavorText": "It has a mischievous spirit. If it spots an angler, it will tug on the fishing line to interfere.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/30.png",
      "large": "https://images.pokemontcg.io/bw8/30_hires.png"
    }
  },
  {
    "id": "bw8-31",
    "name": "Ludicolo",
    "number": "31",
    "artist": "match",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Lombre",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Rain Dish",
        "text": "At any times between turns, heal 20 damage from this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Groovy Dance",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "You may discard an Energy attached to this Pokémon. If you do, the Defending Pokémon is now Confused."
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
      272
    ],
    "flavorText": "If it hears festive music, all its muscles fill with energy. It can't help breaking out into a dance.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/31.png",
      "large": "https://images.pokemontcg.io/bw8/31_hires.png"
    }
  },
  {
    "id": "bw8-32",
    "name": "Carvanha",
    "number": "32",
    "artist": "Mitsuhiro Arita",
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
      "Sharpedo"
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
      318
    ],
    "flavorText": "They swarm any foe that invades their territory. Their sharp fangs can tear out boat hulls.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/32.png",
      "large": "https://images.pokemontcg.io/bw8/32_hires.png"
    }
  },
  {
    "id": "bw8-33",
    "name": "Sharpedo",
    "number": "33",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Team Plasma"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Carvanha",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Rough Skin",
        "text": "If this Pokémon is your Active Pokémon and is damaged by an opponent's attack (even if this Pokémon is Knocked Out), put 2 damage counters on the Attacking Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hard Bite",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
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
      319
    ],
    "flavorText": "Its fangs rip through sheet iron. It swims at 75 mph and is known as",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/33.png",
      "large": "https://images.pokemontcg.io/bw8/33_hires.png"
    }
  },
  {
    "id": "bw8-34",
    "name": "Manaphy",
    "number": "34",
    "artist": "Naoki Saito",
    "rarity": "Rare Holo",
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
        "name": "Final Wish",
        "text": "When this Pokémon is Knocked Out by damage from an opponent's attack, search your deck for a card and put it into your hand. Shuffle your deck afterward.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Seafaring",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip 3 coins. For each heads, attach a Water Energy card from your discard pile to your Benched Pokémon in any way you like."
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
    "flavorText": "It is born with a wondrous power that lets it bond with any kind of Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/34.png",
      "large": "https://images.pokemontcg.io/bw8/34_hires.png"
    }
  },
  {
    "id": "bw8-35",
    "name": "Vanillite",
    "number": "35",
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
      "Vanillish"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Snow Squall",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "This attack's damage isn't affected by Resistance."
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
      582
    ],
    "flavorText": "Theoretically, this Pokémon formed from icicles bathed in energy from the morning sun. Their breath is -58° F.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/35.png",
      "large": "https://images.pokemontcg.io/bw8/35_hires.png"
    }
  },
  {
    "id": "bw8-36",
    "name": "Vanillish",
    "number": "36",
    "artist": "Shin Nagasawa",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Vanillite",
    "evolvesTo": [
      "Vanilluxe"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Icy Snow",
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
      583
    ],
    "flavorText": "They cool down the surrounding air and create ice particles, which they use to freeze their foes.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/36.png",
      "large": "https://images.pokemontcg.io/bw8/36_hires.png"
    }
  },
  {
    "id": "bw8-37",
    "name": "Vanilluxe",
    "number": "37",
    "artist": "Shin Nagasawa",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Vanillish",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Enefountain",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Attach 2 basic Energy cards from your hand to 1 of your Pokémon."
      },
      {
        "name": "Blizzard",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Does 10 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      584
    ],
    "flavorText": "Swallowing large amounts of water, they make snow clouds inside their bodies and, when angry, cause violent blizzards.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/37.png",
      "large": "https://images.pokemontcg.io/bw8/37_hires.png"
    }
  },
  {
    "id": "bw8-38",
    "name": "Frillish",
    "number": "38",
    "artist": "Akira Komayama",
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
      "Jellicent"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Absorb",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Heal 10 damage from this Pokémon."
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
      592
    ],
    "flavorText": "If its veil-like arms stun and wrap a foe, that foe will be dragged miles below the surface, never to return.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/38.png",
      "large": "https://images.pokemontcg.io/bw8/38_hires.png"
    }
  },
  {
    "id": "bw8-39",
    "name": "Jellicent",
    "number": "39",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Team Plasma"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Frillish",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Spiteful Spirit",
        "text": "If this Pokémon is your Active Pokémon and is Knocked Out by damage from an opponent's attack, the Attacking Pokémon is now Confused and Poisoned.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Aqua Bullet",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Does 10 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      593
    ],
    "flavorText": "Its body is mostly seawater. It's said there's a castle of ships Jellicent have sunk on the seafloor.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/39.png",
      "large": "https://images.pokemontcg.io/bw8/39_hires.png"
    }
  },
  {
    "id": "bw8-40",
    "name": "Cubchoo",
    "number": "40",
    "artist": "MAHOU",
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
      "Beartic"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hail",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, this attack does 10 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Icy Snow",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      613
    ],
    "flavorText": "Their snot is a barometer of health. When healthy, their snot is sticky and the power of their ice moves increases.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/40.png",
      "large": "https://images.pokemontcg.io/bw8/40_hires.png"
    }
  },
  {
    "id": "bw8-41",
    "name": "Beartic",
    "number": "41",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Team Plasma"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Cubchoo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Powerful Rage",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Does 20 damage times the number of damage counters on this Pokémon."
      },
      {
        "name": "Glacier Drop",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Discard the top card of your opponent's deck."
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
      614
    ],
    "flavorText": "They love the cold seas of the north. They create pathways around the ocean waters by freezing their own breath.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/41.png",
      "large": "https://images.pokemontcg.io/bw8/41_hires.png"
    }
  },
  {
    "id": "bw8-42",
    "name": "Magnemite",
    "number": "42",
    "artist": "Shigenori Negishi",
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
        "name": "Metal Sound",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused."
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
      81
    ],
    "flavorText": "The electromagnetic waves emitted by the units at the sides of its head expel antigravity, which allows it to float.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/42.png",
      "large": "https://images.pokemontcg.io/bw8/42_hires.png"
    }
  },
  {
    "id": "bw8-43",
    "name": "Magnemite",
    "number": "43",
    "artist": "match",
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
        "name": "Electro Ball",
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
      81
    ],
    "flavorText": "The electromagnetic waves emitted by the units at the sides of its head expel antigravity, which allows it to float.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/43.png",
      "large": "https://images.pokemontcg.io/bw8/43_hires.png"
    }
  },
  {
    "id": "bw8-44",
    "name": "Magneton",
    "number": "44",
    "artist": "MAHOU",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
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
        "name": "Metal Sound",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Confused."
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      82
    ],
    "flavorText": "The stronger electromagnetic waves from the three linked Magnemite are enough to dry out surrounding moisture.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/44.png",
      "large": "https://images.pokemontcg.io/bw8/44_hires.png"
    }
  },
  {
    "id": "bw8-45",
    "name": "Magneton",
    "number": "45",
    "artist": "match",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
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
        "name": "Knock Away",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      82
    ],
    "flavorText": "The stronger electromagnetic waves from the three linked Magnemite are enough to dry out surrounding moisture.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/45.png",
      "large": "https://images.pokemontcg.io/bw8/45_hires.png"
    }
  },
  {
    "id": "bw8-46",
    "name": "Magnezone",
    "number": "46",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Team Plasma"
    ],
    "hp": "140",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Magneton",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Dual Brains",
        "text": "During your turn, you may play 2 Supporter cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Gyro Ball",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon. Then, your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon."
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
      462
    ],
    "flavorText": "Sometimes the magnetism emitted by Magnezone is too strong, making them attract each other so they cannot move.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/46.png",
      "large": "https://images.pokemontcg.io/bw8/46_hires.png"
    }
  },
  {
    "id": "bw8-47",
    "name": "Magnezone",
    "number": "47",
    "artist": "match",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Magneton",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Assist",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Attach 2 basic Energy cards from your discard pile to 1 of your Pokémon."
      },
      {
        "name": "Tumbling Attack",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70+",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      462
    ],
    "flavorText": "Sometimes the magnetism emitted by Magnezone is too strong, making them attract each other so they cannot move.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/47.png",
      "large": "https://images.pokemontcg.io/bw8/47_hires.png"
    }
  },
  {
    "id": "bw8-48",
    "name": "Zapdos-EX",
    "number": "48",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX",
      "Team Plasma"
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
        "name": "Agility",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn."
      },
      {
        "name": "Powervolt",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80+",
        "text": "If this Pokémon has any Plasma Energy attached to it, this attack does 40 more damage."
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
      145
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/48.png",
      "large": "https://images.pokemontcg.io/bw8/48_hires.png"
    }
  },
  {
    "id": "bw8-49",
    "name": "Rotom",
    "number": "49",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Team Plasma"
    ],
    "hp": "60",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Electribonus",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard a Lightning Energy card from your hand. If you do, draw 3 cards."
      },
      {
        "name": "Poltergeist",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Your opponent reveals his or her hand. This attack does 20 damage times the number of Trainer cards in your opponent's hand."
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
    "flavorText": "Its electric-like body can enter some kinds of machines and take control in order to make mischief.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/49.png",
      "large": "https://images.pokemontcg.io/bw8/49_hires.png"
    }
  },
  {
    "id": "bw8-50",
    "name": "Joltik",
    "number": "50",
    "artist": "Tomokazu Komiya",
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
      "Galvantula"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Jump On",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 more damage."
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
      595
    ],
    "flavorText": "Since it can't generate its own electricity, it sticks onto large-bodied Pokémon and absorbs static electricity.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/50.png",
      "large": "https://images.pokemontcg.io/bw8/50_hires.png"
    }
  },
  {
    "id": "bw8-51",
    "name": "Galvantula",
    "number": "51",
    "artist": "Hajime Kusajima",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Joltik",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Discharge",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "30×",
        "text": "Discard all Lightning Energy attached to this Pokémon. This attack does 30 damage times the number of Energy cards you discarded."
      },
      {
        "name": "Signal Beam",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused."
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
      596
    ],
    "flavorText": "It creates barriers from electrified silk that stun foes. This works as a weapon as well as a defense.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/51.png",
      "large": "https://images.pokemontcg.io/bw8/51_hires.png"
    }
  },
  {
    "id": "bw8-52",
    "name": "Zubat",
    "number": "52",
    "artist": "Kagemaru Himeno",
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
      "Golbat"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spiral Drain",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Heal 10 damage from this Pokémon."
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
      41
    ],
    "flavorText": "It does not need eyes, because it emits ultrasonic waves to check its surrounding while it flies.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/52.png",
      "large": "https://images.pokemontcg.io/bw8/52_hires.png"
    }
  },
  {
    "id": "bw8-53",
    "name": "Zubat",
    "number": "53",
    "artist": "Mizue",
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
      "Golbat"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Free Flight",
        "text": "If this Pokémon has no Energy attached to it, this Pokémon has no Retreat Cost.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Wing Attack",
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
      41
    ],
    "flavorText": "It does not need eyes, because it emits ultrasonic waves to check its surrounding while it flies.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/53.png",
      "large": "https://images.pokemontcg.io/bw8/53_hires.png"
    }
  },
  {
    "id": "bw8-54",
    "name": "Golbat",
    "number": "54",
    "artist": "Kyoko Umemoto",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Zubat",
    "evolvesTo": [
      "Crobat"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spiral Drain",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Heal 20 damage from this Pokémon."
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
      42
    ],
    "flavorText": "Flitting around in the dead of night, it sinks its fangs into its prey and drains a nearly fatal amount of blood.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/54.png",
      "large": "https://images.pokemontcg.io/bw8/54_hires.png"
    }
  },
  {
    "id": "bw8-55",
    "name": "Crobat",
    "number": "55",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Team Plasma"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Golbat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Night Sight",
        "text": "Once during your turn (before your attack), you may draw a card.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Ultra-Toxic Fang",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "The Defending Pokémon is now Poisoned. Put 4 damage counters instead of 1 on this Pokémon between turns."
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
      169
    ],
    "flavorText": "Having four wings allows it to fly more quickly and quietly so it can sneak up on prey without its noticing.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/55.png",
      "large": "https://images.pokemontcg.io/bw8/55_hires.png"
    }
  },
  {
    "id": "bw8-56",
    "name": "Koffing",
    "number": "56",
    "artist": "Kagemaru Himeno",
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
      "Weezing"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tackle",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Double Spin",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Flip 2 coins. This attack does 20 damage times the number of heads."
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
      109
    ],
    "flavorText": "Toxic gas is held within its thin, balloon-shaped body, so it can cause massive explosions.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/56.png",
      "large": "https://images.pokemontcg.io/bw8/56_hires.png"
    }
  },
  {
    "id": "bw8-57",
    "name": "Koffing",
    "number": "57",
    "artist": "match",
    "rarity": "Uncommon",
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
        "name": "Smokescreen",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "If the Defending Pokémon tries to attack during your opponent's next turn, your opponent flips a coin. If tails, that attack does nothing."
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
      109
    ],
    "flavorText": "Toxic gas is held within its thin, balloon-shaped body, so it can cause massive explosions.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/57.png",
      "large": "https://images.pokemontcg.io/bw8/57_hires.png"
    }
  },
  {
    "id": "bw8-58",
    "name": "Weezing",
    "number": "58",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Team Plasma"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Koffing",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Aftermath",
        "text": "When this Pokémon is Knocked Out by damage from an opponent's attack, discard the top 3 cards of your opponent's deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Smogbank",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 20 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      110
    ],
    "flavorText": "Inhaling toxic fumes from trash and mixing them inside its body lets it spread an even fouler stench.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/58.png",
      "large": "https://images.pokemontcg.io/bw8/58_hires.png"
    }
  },
  {
    "id": "bw8-59",
    "name": "Ralts",
    "number": "59",
    "artist": "Kanako Eo",
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
      "Kirlia"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psy Bolt",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
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
      280
    ],
    "flavorText": "If its horns capture the warm feelings of people or Pokémon, its body warms up slightly.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/59.png",
      "large": "https://images.pokemontcg.io/bw8/59_hires.png"
    }
  },
  {
    "id": "bw8-60",
    "name": "Kirlia",
    "number": "60",
    "artist": "Mizue",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Ralts",
    "evolvesTo": [
      "Gardevoir",
      "Gallade"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psy Bolt",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
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
      281
    ],
    "flavorText": "If its Trainer becomes happy, it overflows with energy, dancing joyously while spinning about.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/60.png",
      "large": "https://images.pokemontcg.io/bw8/60_hires.png"
    }
  },
  {
    "id": "bw8-61",
    "name": "Gallade",
    "number": "61",
    "artist": "kawayoo",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Kirlia",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Powerful Storm",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Does 20 damage times the amount of Energy attached to all of your Pokémon."
      },
      {
        "name": "Swift Lunge",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon."
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
    "flavorText": "When trying to protect someone, it extends its elbows as if they were swords and fights savagely.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/61.png",
      "large": "https://images.pokemontcg.io/bw8/61_hires.png"
    }
  },
  {
    "id": "bw8-62",
    "name": "Giratina",
    "number": "62",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Team Plasma"
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
        "name": "Hex",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "If the Defending Pokémon is affected by a Special Condition, this attack does 50 more damage."
      },
      {
        "name": "Shadow Claw",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "90",
        "text": "Discard a random card from your opponent's hand."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
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
      487
    ],
    "flavorText": "It was banished for its violence. It silently gazed upon the old world from the Distortion World.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/62.png",
      "large": "https://images.pokemontcg.io/bw8/62_hires.png"
    }
  },
  {
    "id": "bw8-63",
    "name": "Trubbish",
    "number": "63",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
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
      "Garbodor"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pile Up",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, search your deck for a Pokémon Tool card, reveal it, and put it into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Sludge Toss",
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
      568
    ],
    "flavorText": "The combination of garbage bags and industrial waste caused the chemical reaction that created this Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/63.png",
      "large": "https://images.pokemontcg.io/bw8/63_hires.png"
    }
  },
  {
    "id": "bw8-64",
    "name": "Trubbish",
    "number": "64",
    "artist": "Kouki Saitou",
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
      "Garbodor"
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
        "name": "Sludge Bomb",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
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
      568
    ],
    "flavorText": "Wanting more garbage, they follow people who litter. They always belch poison gas.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/64.png",
      "large": "https://images.pokemontcg.io/bw8/64_hires.png"
    }
  },
  {
    "id": "bw8-65",
    "name": "Trubbish",
    "number": "65",
    "artist": "Midori Harada",
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
      "Garbodor"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tool Drop",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Does 20 damage for each Pokémon Tool card attached to Pokémon in play (both yours and your opponent's)."
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
      568
    ],
    "flavorText": "Wanting more garbage, they follow people who litter. They always belch poison gas.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/65.png",
      "large": "https://images.pokemontcg.io/bw8/65_hires.png"
    }
  },
  {
    "id": "bw8-66",
    "name": "Garbodor",
    "number": "66",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Team Plasma"
    ],
    "hp": "110",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Trubbish",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Biosmog",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "The Defending Pokémon is now Poisoned. Flip a coin. If heads, discard an Energy attached to that Pokémon."
      },
      {
        "name": "Sludge Bomb",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
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
      569
    ],
    "flavorText": "Consuming garbage makes new kinds of poison gases and liquids inside their bodies.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/66.png",
      "large": "https://images.pokemontcg.io/bw8/66_hires.png"
    }
  },
  {
    "id": "bw8-67",
    "name": "Garbodor",
    "number": "67",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Team Plasma"
    ],
    "hp": "110",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Trubbish",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ensnarl",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Does 20 damage times the number of Colorless in the Defending Pokémon's Retreat Cost."
      },
      {
        "name": "Double Ducts",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80×",
        "text": "Flip 2 coins. This attack does 80 damage times the number of heads."
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
      569
    ],
    "flavorText": "Consuming garbage makes new kinds of poison gases and liquids inside their bodies.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/67.png",
      "large": "https://images.pokemontcg.io/bw8/67_hires.png"
    }
  },
  {
    "id": "bw8-68",
    "name": "Elgyem",
    "number": "68",
    "artist": "Kouki Saitou",
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
      "Beheeyem"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psyshot",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      605
    ],
    "flavorText": "Rumors of its origin are linked to a UFO crash site in the desert 50 years ago.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/68.png",
      "large": "https://images.pokemontcg.io/bw8/68_hires.png"
    }
  },
  {
    "id": "bw8-69",
    "name": "Elgyem",
    "number": "69",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
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
      "Beheeyem"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Reflect",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, any damage done to this Pokémon by attacks is reduced by 20 (after applying Weakness and Resistance)."
      },
      {
        "name": "Smash Punch",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If tails, this attack does nothing."
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
      605
    ],
    "flavorText": "Rumors of its origin are linked to a UFO crash site in the desert 50 years ago.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/69.png",
      "large": "https://images.pokemontcg.io/bw8/69_hires.png"
    }
  },
  {
    "id": "bw8-70",
    "name": "Beheeyem",
    "number": "70",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Team Plasma"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Elgyem",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Lock Up",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      },
      {
        "name": "Damakinesis",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Move 6 damage counters from any of your Pokémon to the Defending Pokémon."
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
      606
    ],
    "flavorText": "Apparently, it communicates by flashing its three fingers, but those patterns haven't been decoded.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/70.png",
      "large": "https://images.pokemontcg.io/bw8/70_hires.png"
    }
  },
  {
    "id": "bw8-71",
    "name": "Phanpy",
    "number": "71",
    "artist": "Sumiyoshi Kizuki",
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
      "Donphan"
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
        "damage": "10",
        "text": ""
      },
      {
        "name": "Rollout",
        "cost": [
          "Fighting",
          "Fighting",
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
      231
    ],
    "flavorText": "It is strong despite its compact size. It can easily pick up and carry an adult human on its back.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/71.png",
      "large": "https://images.pokemontcg.io/bw8/71_hires.png"
    }
  },
  {
    "id": "bw8-72",
    "name": "Donphan",
    "number": "72",
    "artist": "Shin Nagasawa",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Phanpy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spinning Turn",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Wreck",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80+",
        "text": "If there is any Stadium card in play, this attack does 60 more damage. Discard the Stadium card."
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
    "flavorText": "It attacks by curling up, then rolling into its foe. It can blow apart a house in one hit.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/72.png",
      "large": "https://images.pokemontcg.io/bw8/72_hires.png"
    }
  },
  {
    "id": "bw8-73",
    "name": "Lunatone",
    "number": "73",
    "artist": "Kouji Tajima",
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
        "name": "Premonition",
        "text": "Once during your turn (before your attack), you may look at the top 2 cards of your deck and put them back on top of your deck in any order.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rock Throw",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      337
    ],
    "flavorText": "The phase of the moon apparently has some effect on its power. It's active on the night of a full moon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/73.png",
      "large": "https://images.pokemontcg.io/bw8/73_hires.png"
    }
  },
  {
    "id": "bw8-74",
    "name": "Solrock",
    "number": "74",
    "artist": "Kouji Tajima",
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
        "name": "Heat Burn",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "The Defending Pokémon is now Burned."
      },
      {
        "name": "Explosion",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "This Pokémon does 90 damage to itself."
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
      338
    ],
    "flavorText": "Solar energy is the source of its power, so it is strong during the daytime. When it spins, its body shines.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/74.png",
      "large": "https://images.pokemontcg.io/bw8/74_hires.png"
    }
  },
  {
    "id": "bw8-75",
    "name": "Riolu",
    "number": "75",
    "artist": "Ken Sugimori",
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
        "name": "Punch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Kick",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      447
    ],
    "flavorText": "It has the peculiar power of being able to see emotions such as joy and rage in the form of waves.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/75.png",
      "large": "https://images.pokemontcg.io/bw8/75_hires.png"
    }
  },
  {
    "id": "bw8-76",
    "name": "Riolu",
    "number": "76",
    "artist": "Akira Komayama",
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
        "name": "Kick",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Feint",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
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
      447
    ],
    "flavorText": "They communicate with one another using their auras made tangible by their emotions.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/76.png",
      "large": "https://images.pokemontcg.io/bw8/76_hires.png"
    }
  },
  {
    "id": "bw8-77",
    "name": "Lucario",
    "number": "77",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Riolu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Kick",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Mach Cross",
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
    "flavorText": "A well-trained one can sense auras to identify and take in the feelings of creatures over half a mile away.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/77.png",
      "large": "https://images.pokemontcg.io/bw8/77_hires.png"
    }
  },
  {
    "id": "bw8-78",
    "name": "Lucario",
    "number": "78",
    "artist": "Satoshi Shirai",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Riolu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Dual Armor",
        "text": "If this Pokémon has any Metal Energy attached to it, this Pokémon's type is both Fighting and Metal.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hurricane Kick",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "Does 30 more damage for each Prize card your opponent has taken."
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
    "flavorText": "By reading the auras of all things, it can tell how others are feeling from over half a mile away.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/78.png",
      "large": "https://images.pokemontcg.io/bw8/78_hires.png"
    }
  },
  {
    "id": "bw8-79",
    "name": "Timburr",
    "number": "79",
    "artist": "Kagemaru Himeno",
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
      "Gurdurr"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Knock Back",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon."
      },
      {
        "name": "Low Kick",
        "cost": [
          "Fighting",
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
      532
    ],
    "flavorText": "Always carrying squared logs, they help out with construction. As they grow, they carry bigger logs.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/79.png",
      "large": "https://images.pokemontcg.io/bw8/79_hires.png"
    }
  },
  {
    "id": "bw8-80",
    "name": "Gurdurr",
    "number": "80",
    "artist": "Masakazu Fukuda",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Timburr",
    "evolvesTo": [
      "Conkeldurr"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dynamic Punch",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "Flip a coin. If heads, this attack does 20 more damage and the Defending Pokémon is now Confused."
      },
      {
        "name": "Hammer In",
        "cost": [
          "Fighting",
          "Fighting",
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
      533
    ],
    "flavorText": "With strengthened bodies, they skillfully wield steel beams to take down buildings.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/80.png",
      "large": "https://images.pokemontcg.io/bw8/80_hires.png"
    }
  },
  {
    "id": "bw8-81",
    "name": "Conkeldurr",
    "number": "81",
    "artist": "Shin Nagasawa",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Gurdurr",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Facade",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "If this Pokémon is Burned or Poisoned, this attack does 60 more damage."
      },
      {
        "name": "Drain Punch",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "Heal 20 damage from this Pokémon."
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
    "flavorText": "Rather than rely on force, they master moves that utilize the centrifugal force of spinning concrete.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/81.png",
      "large": "https://images.pokemontcg.io/bw8/81_hires.png"
    }
  },
  {
    "id": "bw8-82",
    "name": "Purrloin",
    "number": "82",
    "artist": "MAHOU",
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
      "Liepard"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tail Trickery",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused."
      },
      {
        "name": "Fury Swipes",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10×",
        "text": "Flip 3 coins. This attack does 10 damage times the number of heads."
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
      509
    ],
    "flavorText": "Its cute act is a ruse. When victims let down their guard, they find their items taken. It attacks with sharp claws.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/82.png",
      "large": "https://images.pokemontcg.io/bw8/82_hires.png"
    }
  },
  {
    "id": "bw8-83",
    "name": "Purrloin",
    "number": "83",
    "artist": "Masakazu Fukuda",
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
      "Liepard"
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
        "text": "Your opponent reveals his or her hand."
      },
      {
        "name": "Fasten Claws",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 10 more damage."
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
      509
    ],
    "flavorText": "Their cute act is a ruse. They trick people and steal their valuables just to see the looks on their faces.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/83.png",
      "large": "https://images.pokemontcg.io/bw8/83_hires.png"
    }
  },
  {
    "id": "bw8-84",
    "name": "Liepard",
    "number": "84",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Team Plasma"
    ],
    "hp": "80",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Purrloin",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Silent Claw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent reveal his or her hand. Discard a Supporter card you find there. Use the effect of that card as the effect of this attack."
      },
      {
        "name": "Fake Out",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
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
      510
    ],
    "flavorText": "Their beautiful form comes from the muscles they have developed. They run silently in the night.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/84.png",
      "large": "https://images.pokemontcg.io/bw8/84_hires.png"
    }
  },
  {
    "id": "bw8-85",
    "name": "Scraggy",
    "number": "85",
    "artist": "Kouki Saitou",
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
      "Scrafty"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Headbutt",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Low Kick",
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
      559
    ],
    "flavorText": "Proud of its sturdy skull, it suddenly headbutts everything, but its weight makes it unstable, too.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/85.png",
      "large": "https://images.pokemontcg.io/bw8/85_hires.png"
    }
  },
  {
    "id": "bw8-86",
    "name": "Scrafty",
    "number": "86",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Team Plasma"
    ],
    "hp": "90",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Scraggy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Kick Away",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon."
      },
      {
        "name": "Reinforced Headbutt",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "If this Pokémon has a Pokémon Tool card attached to it, this attack does 50 more damage."
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
      560
    ],
    "flavorText": "It pulls up its shed skin to protect itself while it kicks. The bigger the crest, the more respected it is.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/86.png",
      "large": "https://images.pokemontcg.io/bw8/86_hires.png"
    }
  },
  {
    "id": "bw8-87",
    "name": "Skarmory",
    "number": "87",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Team Plasma"
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
        "name": "Cargo Jet",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard a Team Plasma card from your hand. if you do, draw 3 cards."
      },
      {
        "name": "Steel Wing",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "During your opponent's next turn, any damage done to this Pokémon by attacks is reduced by 20 (after applying Weakness and Resistance)."
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
      227
    ],
    "flavorText": "Its heavy-looking iron body is actually thin and light, so it can fly at speeds over 180 mph.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/87.png",
      "large": "https://images.pokemontcg.io/bw8/87_hires.png"
    }
  },
  {
    "id": "bw8-88",
    "name": "Klink",
    "number": "88",
    "artist": "Akira Komayama",
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
      "Klang"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rigidify",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, any damage done to this Pokémon by attacks is reduced by 20 (after applying Weakness and Resistance)."
      },
      {
        "name": "Vice Grip",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      599
    ],
    "flavorText": "Two bodies comprise a fixed pair. They spin around each other to generate energy.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/88.png",
      "large": "https://images.pokemontcg.io/bw8/88_hires.png"
    }
  },
  {
    "id": "bw8-89",
    "name": "Klang",
    "number": "89",
    "artist": "Akira Komayama",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
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
        "name": "Vice Grip",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Gear Smash",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Flip 2 coins. This attack does 20 more damage for each heads."
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
      600
    ],
    "flavorText": "A minigear and big gear comprises its body. If the minigear it launches at its foe doesn't return, it will die.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/89.png",
      "large": "https://images.pokemontcg.io/bw8/89_hires.png"
    }
  },
  {
    "id": "bw8-90",
    "name": "Klinklang",
    "number": "90",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Team Plasma"
    ],
    "hp": "140",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Klang",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Plasma Steel",
        "text": "Prevent all damage done to your Metal Pokémon by attacks from your opponent's Pokémon-EX.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Heavy Bullet",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Flip a coin. If heads, this attack does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      601
    ],
    "flavorText": "The minigear spins at high speed. Then the energy from the red core charges the minigear to make it ready to fire.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/90.png",
      "large": "https://images.pokemontcg.io/bw8/90_hires.png"
    }
  },
  {
    "id": "bw8-91",
    "name": "Durant",
    "number": "91",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Team Plasma"
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
        "name": "Gnaw",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Hard Crunch",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "If the Defending Pokémon already has any damage counters on it, this attack does 30 more damage."
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
      632
    ],
    "flavorText": "Individuals each play different roles in driving Heatmor, their natural predator, away from their colony.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/91.png",
      "large": "https://images.pokemontcg.io/bw8/91_hires.png"
    }
  },
  {
    "id": "bw8-92",
    "name": "Durant",
    "number": "92",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Team Plasma"
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
        "name": "Call for Backup",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Pokémon, reveal it, and put it into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Metal Jail",
        "cost": [
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
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
      632
    ],
    "flavorText": "Individuals each play different roles in driving Heatmor, their natural predator, away from their colony.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/92.png",
      "large": "https://images.pokemontcg.io/bw8/92_hires.png"
    }
  },
  {
    "id": "bw8-93",
    "name": "Cobalion-EX",
    "number": "93",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Righteous Edge",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Discard a Special Energy attached to the Defending Pokémon."
      },
      {
        "name": "Steel Bullet",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "This attack's damage isn't affected by Weakness, Resistance, or any other effects on the Defending Pokémon."
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
      638
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/93.png",
      "large": "https://images.pokemontcg.io/bw8/93_hires.png"
    }
  },
  {
    "id": "bw8-94",
    "name": "Druddigon",
    "number": "94",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Team Plasma"
    ],
    "hp": "110",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
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
        "damage": "20",
        "text": "During your opponent's next turn, any damage done to this Pokémon by attacks is reduced by 20 (after applying Weakness and Resistance)."
      },
      {
        "name": "Dragon Claw",
        "cost": [
          "Fire",
          "Fire",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "90",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Dragon",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      621
    ],
    "flavorText": "It runs through the narrow tunnels formed by Excadrill and Onix. It uses its sharp claws to catch prey.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/94.png",
      "large": "https://images.pokemontcg.io/bw8/94_hires.png"
    }
  },
  {
    "id": "bw8-95",
    "name": "Black Kyurem-EX",
    "number": "95",
    "artist": "Shizurow",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Slash",
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
        "name": "Black Ballista",
        "cost": [
          "Water",
          "Water",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "200",
        "text": "Discard 3 Energy attached to this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Dragon",
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
      646
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/95.png",
      "large": "https://images.pokemontcg.io/bw8/95_hires.png"
    }
  },
  {
    "id": "bw8-96",
    "name": "White Kyurem-EX",
    "number": "96",
    "artist": "Shizurow",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Slash",
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
        "name": "White Inferno",
        "cost": [
          "Fire",
          "Fire",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100+",
        "text": "Does 10 more damage for each damage counter on this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Dragon",
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
      646
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/96.png",
      "large": "https://images.pokemontcg.io/bw8/96_hires.png"
    }
  },
  {
    "id": "bw8-97",
    "name": "Clefairy",
    "number": "97",
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
        "name": "Double Slap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Flip 2 coins. This attack does 20 damage times the number of heads."
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
      35
    ],
    "flavorText": "On nights with a full moon, Clefairy gather from all over and dance. Bathing in moonlight makes them float.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/97.png",
      "large": "https://images.pokemontcg.io/bw8/97_hires.png"
    }
  },
  {
    "id": "bw8-98",
    "name": "Clefable",
    "number": "98",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Clefairy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Moon Guidance",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, search your deck for a card that evolves from 1 of your Pokémon and put it onto that Pokémon. (This counts as evolving that Pokémon.) Shuffle your deck afterward.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Moon Impact",
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
      36
    ],
    "flavorText": "Their ears are sensitive enough to hear a pin drop from over a mile away, so they're usually found in quiet places.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/98.png",
      "large": "https://images.pokemontcg.io/bw8/98_hires.png"
    }
  },
  {
    "id": "bw8-99",
    "name": "Doduo",
    "number": "99",
    "artist": "Kyoko Umemoto",
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
      "Dodrio"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gatling Peck",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10×",
        "text": "Flip 5 coins. This attack does 10 damage times the number of heads."
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
      84
    ],
    "flavorText": "The brains in its two heads appear to communicate emotions to each other with telepathic power.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/99.png",
      "large": "https://images.pokemontcg.io/bw8/99_hires.png"
    }
  },
  {
    "id": "bw8-100",
    "name": "Dodrio",
    "number": "100",
    "artist": "kawayoo",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Doduo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Raging Pecks",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30×",
        "text": "Flip 3 coins. This attack does 30 damage times the number of heads. This Pokémon is now Confused."
      },
      {
        "name": "Drill Peck",
        "cost": [
          "Colorless",
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
      85
    ],
    "flavorText": "When Doduo evolves into this odd breed, one of its heads splits into two. It runs at nearly 40 mph.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/100.png",
      "large": "https://images.pokemontcg.io/bw8/100_hires.png"
    }
  },
  {
    "id": "bw8-101",
    "name": "Snorlax",
    "number": "101",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Team Plasma"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Block",
        "text": "As long as this Pokémon is your Active Pokémon, your opponent's Active Pokémon can't retreat.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Teampact",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "30×",
        "text": "Does 30 damage times the number of Team Plasma Pokémon you have in play."
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
    "flavorText": "When its belly is full, it becomes too lethargic to even lift a finger, so it is safe to bounce on its belly.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/101.png",
      "large": "https://images.pokemontcg.io/bw8/101_hires.png"
    }
  },
  {
    "id": "bw8-102",
    "name": "Togepi",
    "number": "102",
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
      "Togetic"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Yawn",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
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
      175
    ],
    "flavorText": "It transforms the kindness and joy of others into happiness, which it stores in its shell.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/102.png",
      "large": "https://images.pokemontcg.io/bw8/102_hires.png"
    }
  },
  {
    "id": "bw8-103",
    "name": "Togetic",
    "number": "103",
    "artist": "Akira Komayama",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Togepi",
    "evolvesTo": [
      "Togekiss"
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
        "damage": "30",
        "text": "Your opponent draws a card."
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
      176
    ],
    "flavorText": "To share its happiness, it flies around the world seeking kind-hearted people.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/103.png",
      "large": "https://images.pokemontcg.io/bw8/103_hires.png"
    }
  },
  {
    "id": "bw8-104",
    "name": "Togekiss",
    "number": "104",
    "artist": "Shin Nagasawa",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Togetic",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Bright Veil",
        "text": "As long as this Pokémon is your Active Pokémon, whenever your opponent plays an Item card from his or her hand, prevent all effects of that card done to your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Return",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Draw cards until you have 6 cards in your hand."
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
      468
    ],
    "flavorText": "It shares many blessings with people who respect one another's rights and avoid needless strife.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/104.png",
      "large": "https://images.pokemontcg.io/bw8/104_hires.png"
    }
  },
  {
    "id": "bw8-105",
    "name": "Whismur",
    "number": "105",
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
    "evolvesTo": [
      "Loudred"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shout",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, discard a random card from your opponent's hand."
      },
      {
        "name": "Hyper Voice",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      293
    ],
    "flavorText": "Usually, its cries are like quiet murmurs. If frightened, it shrieks at the same volume as a jet plane.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/105.png",
      "large": "https://images.pokemontcg.io/bw8/105_hires.png"
    }
  },
  {
    "id": "bw8-106",
    "name": "Loudred",
    "number": "106",
    "artist": "Aya Kusube",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Whismur",
    "evolvesTo": [
      "Exploud"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Supersonic",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Confused."
      },
      {
        "name": "Hyper Voice",
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
      294
    ],
    "flavorText": "The shock waves from its cries can tip over trucks. It stamps its feet to power up.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/106.png",
      "large": "https://images.pokemontcg.io/bw8/106_hires.png"
    }
  },
  {
    "id": "bw8-107",
    "name": "Exploud",
    "number": "107",
    "artist": "match",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Loudred",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Destructive Sound",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Your opponent reveals his or her hand. Discard all Item cards you find there."
      },
      {
        "name": "Round",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "50×",
        "text": "Does 50 damage times the number of your Pokémon that have the Round attack."
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
      295
    ],
    "flavorText": "Its howls can be heard over six miles away. It emits all sorts of noises from the ports on its body.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/107.png",
      "large": "https://images.pokemontcg.io/bw8/107_hires.png"
    }
  },
  {
    "id": "bw8-108",
    "name": "Lugia-EX",
    "number": "108",
    "artist": "Toyste Beach",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX",
      "Team Plasma"
    ],
    "hp": "180",
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
        "name": "Overflow",
        "text": "If your opponent's Pokémon is Knocked Out by damage from an attack of this Pokémon, take 1 more Prize card.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Plasma Gale",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120",
        "text": "Discard a Plasma Energy attached to this Pokémon. If you can't discard a Plasma Energy, this attack does nothing."
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
      249
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/108.png",
      "large": "https://images.pokemontcg.io/bw8/108_hires.png"
    }
  },
  {
    "id": "bw8-109",
    "name": "Skitty",
    "number": "109",
    "artist": "Masakazu Fukuda",
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
      "Delcatty"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Triple Slap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      300
    ],
    "flavorText": "It shows its cute side by chasing its own tail until it gets dizzy.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/109.png",
      "large": "https://images.pokemontcg.io/bw8/109_hires.png"
    }
  },
  {
    "id": "bw8-110",
    "name": "Patrat",
    "number": "110",
    "artist": "Kouki Saitou",
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
      "Watchog"
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
        "damage": "20",
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
      504
    ],
    "flavorText": "Extremely cautious, one of them will always be on the lookout, but it won't notice a foe coming from behind.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/110.png",
      "large": "https://images.pokemontcg.io/bw8/110_hires.png"
    }
  },
  {
    "id": "bw8-111",
    "name": "Patrat",
    "number": "111",
    "artist": "Naoki Saito",
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
      "Watchog"
    ],
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
        "name": "Slam",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Flip 2 coins. This attack does 20 damage times the number of heads."
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
    "flavorText": "Extremely cautious, there is always one keeping watch, but they don't notice enemies coming from behind.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/111.png",
      "large": "https://images.pokemontcg.io/bw8/111_hires.png"
    }
  },
  {
    "id": "bw8-112",
    "name": "Watchog",
    "number": "112",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Team Plasma"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Patrat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fast Swipe",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard a random card from your opponent's hand."
      },
      {
        "name": "Biting Fang",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
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
      505
    ],
    "flavorText": "Using luminescent matter, it makes its eyes and body glow and stuns attacking opponents.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/112.png",
      "large": "https://images.pokemontcg.io/bw8/112_hires.png"
    }
  },
  {
    "id": "bw8-113",
    "name": "Watchog",
    "number": "113",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "Team Plasma"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Patrat",
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
        "damage": "20+",
        "text": "Does 10 more damage for each damage counter on the Defending Pokémon."
      },
      {
        "name": "Low Kick",
        "cost": [
          "Colorless",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      505
    ],
    "flavorText": "Using luminescent matter, it makes its eyes and body glow and stuns attacking opponents.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/113.png",
      "large": "https://images.pokemontcg.io/bw8/113_hires.png"
    }
  },
  {
    "id": "bw8-114",
    "name": "Bouffalant",
    "number": "114",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Team Plasma"
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
        "name": "Tool Breaker",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard a Pokémon Tool card attached to the Defending Pokémon."
      },
      {
        "name": "Hammer In",
        "cost": [
          "Colorless",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      626
    ],
    "flavorText": "They are known to charge so wildly that if a train were to enter their territory, they would send it flying.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/114.png",
      "large": "https://images.pokemontcg.io/bw8/114_hires.png"
    }
  },
  {
    "id": "bw8-115",
    "name": "Rufflet",
    "number": "115",
    "artist": "kawayoo",
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
      "Braviary"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Incessant Peck",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin until you get tails. This attack does 20 more damage for each heads."
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
      627
    ],
    "flavorText": "It stands up to massive opponents, not out of courage, but out of recklessness. But that is how it gets stronger.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/115.png",
      "large": "https://images.pokemontcg.io/bw8/115_hires.png"
    }
  },
  {
    "id": "bw8-116",
    "name": "Braviary",
    "number": "116",
    "artist": "Akira Komayama",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Rufflet",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Big Wing",
        "text": "Once during your turn (before your attack), if this Pokémon is your Active Pokémon, you may have your opponent switch his or her Active Pokémon with 1 of his or her Benched Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Wild Edge",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "You may do 20 more damage. If you do, this Pokémon does 20 damage to itself."
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
      628
    ],
    "flavorText": "The more scars they have, the more respect these brave soldiers of the sky get from their peers.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/116.png",
      "large": "https://images.pokemontcg.io/bw8/116_hires.png"
    }
  },
  {
    "id": "bw8-117",
    "name": "Bicycle",
    "number": "117",
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
      "Draw cards until you have 4 cards in your hand.",
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
      "small": "https://images.pokemontcg.io/bw8/117.png",
      "large": "https://images.pokemontcg.io/bw8/117_hires.png"
    }
  },
  {
    "id": "bw8-118",
    "name": "Colress",
    "number": "118",
    "artist": "Yusuke Ohmura",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter",
      "Team Plasma"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Shuffle your hand into your deck. Then, draw a number of cards equal to the number of Benched Pokémon (both yours and your opponent's).",
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
      "small": "https://images.pokemontcg.io/bw8/118.png",
      "large": "https://images.pokemontcg.io/bw8/118_hires.png"
    }
  },
  {
    "id": "bw8-119",
    "name": "Colress Machine",
    "number": "119",
    "artist": "Ryo Ueda",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "Team Plasma"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Search your deck for a Plasma Energy card and attach it to 1 of your Team Plasma Pokémon. Shuffle your deck afterward.",
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
      "small": "https://images.pokemontcg.io/bw8/119.png",
      "large": "https://images.pokemontcg.io/bw8/119_hires.png"
    }
  },
  {
    "id": "bw8-120",
    "name": "Escape Rope",
    "number": "120",
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
      "Each player switches his or her Active Pokémon with 1 of his or her Benched Pokémon. (Your opponent switches first. If a player does not have a Benched Pokémon, he or she doesn't switch Pokémon.)",
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
      "small": "https://images.pokemontcg.io/bw8/120.png",
      "large": "https://images.pokemontcg.io/bw8/120_hires.png"
    }
  },
  {
    "id": "bw8-121",
    "name": "Ether",
    "number": "121",
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
      "Reveal the top card of your deck. If that card is a basic Energy card, attach it to 1 of your Pokémon. If it is not a basic Energy card, return it to the top of your deck.",
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
      "small": "https://images.pokemontcg.io/bw8/121.png",
      "large": "https://images.pokemontcg.io/bw8/121_hires.png"
    }
  },
  {
    "id": "bw8-122",
    "name": "Eviolite",
    "number": "122",
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
      "If the Pokémon this card is attached to is a Basic Pokémon, any damage done to this Pokémon by attacks is reduced by 20 (after applying Weakness and Resistance).",
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
      "small": "https://images.pokemontcg.io/bw8/122.png",
      "large": "https://images.pokemontcg.io/bw8/122_hires.png"
    }
  },
  {
    "id": "bw8-123",
    "name": "Hypnotoxic Laser",
    "number": "123",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "Team Plasma"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Your opponent's Active Pokémon is now Poisoned. Flip a coin. If heads, your opponent's Active Pokémon is also Asleep.",
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
      "small": "https://images.pokemontcg.io/bw8/123.png",
      "large": "https://images.pokemontcg.io/bw8/123_hires.png"
    }
  },
  {
    "id": "bw8-124",
    "name": "Plasma Frigate",
    "number": "124",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Stadium",
      "Team Plasma"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Each Pokémon that has any Plasma Energy attached to it (both yours and your opponent's) has no Weakness.",
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
      "small": "https://images.pokemontcg.io/bw8/124.png",
      "large": "https://images.pokemontcg.io/bw8/124_hires.png"
    }
  },
  {
    "id": "bw8-125",
    "name": "Team Plasma Grunt",
    "number": "125",
    "artist": "Yusuke Ohmura",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter",
      "Team Plasma"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Discard a Team Plasma card from your card. (if you can't discard a Team Plasma card, you can't play this card.) Draw 4 cards.",
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
      "small": "https://images.pokemontcg.io/bw8/125.png",
      "large": "https://images.pokemontcg.io/bw8/125_hires.png"
    }
  },
  {
    "id": "bw8-126",
    "name": "Virbank City Gym",
    "number": "126",
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
      "Put 2 more damage counters on Poisoned Pokémon (both yours and your opponent's) between turns.",
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
      "small": "https://images.pokemontcg.io/bw8/126.png",
      "large": "https://images.pokemontcg.io/bw8/126_hires.png"
    }
  },
  {
    "id": "bw8-127",
    "name": "Plasma Energy",
    "number": "127",
    "artist": "5ban Graphics",
    "rarity": "Uncommon",
    "supertype": "Energy",
    "subtypes": [
      "Special",
      "Team Plasma"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "This card provides Colorless Energy."
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
      "small": "https://images.pokemontcg.io/bw8/127.png",
      "large": "https://images.pokemontcg.io/bw8/127_hires.png"
    }
  },
  {
    "id": "bw8-128",
    "name": "Dowsing Machine",
    "number": "128",
    "artist": "Ryo Ueda",
    "rarity": "Rare ACE",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "ACE SPEC"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Discard 2 cards from your hand. (If you can't discard 2 cards, you can't play this card.) Put a Trainer card from your discard pile into your hand.",
      "You may play as many Item cards as you like during your turn (before your attack).",
      "You can't have more than 1 ACE SPEC card in your deck."
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
      "small": "https://images.pokemontcg.io/bw8/128.png",
      "large": "https://images.pokemontcg.io/bw8/128_hires.png"
    }
  },
  {
    "id": "bw8-129",
    "name": "Scramble Switch",
    "number": "129",
    "artist": "5ban Graphics",
    "rarity": "Rare ACE",
    "supertype": "Trainer",
    "subtypes": [
      "Item",
      "ACE SPEC"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Switch your Active Pokémon with 1 of your Benched Pokémon. Then, you may move as many Energy attached to the old Active Pokémon to the new Active Pokémon as you like.",
      "You may play as many Item cards as you like during your turn (before your attack).",
      "You can't have more than 1 ACE SPEC card in your deck."
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
      "small": "https://images.pokemontcg.io/bw8/129.png",
      "large": "https://images.pokemontcg.io/bw8/129_hires.png"
    }
  },
  {
    "id": "bw8-130",
    "name": "Victory Piece",
    "number": "130",
    "artist": "5ban Graphics",
    "rarity": "Rare ACE",
    "supertype": "Trainer",
    "subtypes": [
      "Pokémon Tool",
      "ACE SPEC"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Attach a Pokémon Tool to 1 of your Pokémon that doesn't already have a Pokémon Tool attached to it.",
      "If this card is attached to Victini-EX, Victini-EX can use its attacks regardless of the amount or type of Energy attached to it.",
      "You may play as many Item cards as you like during your turn (before your attack).",
      "You can't have more than 1 ACE SPEC card in your deck."
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
      "small": "https://images.pokemontcg.io/bw8/130.png",
      "large": "https://images.pokemontcg.io/bw8/130_hires.png"
    }
  },
  {
    "id": "bw8-131",
    "name": "Victini-EX",
    "number": "131",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "110",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Turbo Energize",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for 2 basic Energy cards and attach them to your Benched Pokémon in any way you like. Shuffle your deck afterward."
      },
      {
        "name": "Intensifying Burn",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "If the Defending Pokémon is a Pokémon-EX, this attack does 50 more damage."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/131.png",
      "large": "https://images.pokemontcg.io/bw8/131_hires.png"
    }
  },
  {
    "id": "bw8-132",
    "name": "Articuno-EX",
    "number": "132",
    "artist": "Toyste Beach",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX",
      "Team Plasma"
    ],
    "hp": "170",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Blizzard",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Does 10 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Frost Prison",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "If this Pokémon has any Plasma Energy attached to it, the Defending Pokémon is now Paralyzed."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/132.png",
      "large": "https://images.pokemontcg.io/bw8/132_hires.png"
    }
  },
  {
    "id": "bw8-133",
    "name": "Cobalion-EX",
    "number": "133",
    "artist": "Ryo Ueda",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "180",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-EX rule: When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Righteous Edge",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Discard a Special Energy attached to the Defending Pokémon."
      },
      {
        "name": "Steel Bullet",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "This attack's damage isn't affected by Weakness, Resistance, or any other effects on the Defending Pokémon."
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
      638
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/133.png",
      "large": "https://images.pokemontcg.io/bw8/133_hires.png"
    }
  },
  {
    "id": "bw8-134",
    "name": "Lugia-EX",
    "number": "134",
    "artist": "Toyste Beach",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX",
      "Team Plasma"
    ],
    "hp": "180",
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
        "name": "Overflow",
        "text": "If your opponent's Pokémon is Knocked Out by damage from an attack of this Pokémon, take 1 more Prize card.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Plasma Gale",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120",
        "text": "Discard a Plasma Energy attached to this Pokémon. If you can't discard a Plasma Energy, this attack does nothing."
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
      249
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/134.png",
      "large": "https://images.pokemontcg.io/bw8/134_hires.png"
    }
  },
  {
    "id": "bw8-135",
    "name": "Colress",
    "number": "135",
    "artist": "Kanako Eo",
    "rarity": "Rare Ultra",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter",
      "Team Plasma"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Shuffle your hand into your deck. Then, draw a number of cards equal to the number of Benched Pokémon (both yours and your opponent's).",
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
      "small": "https://images.pokemontcg.io/bw8/135.png",
      "large": "https://images.pokemontcg.io/bw8/135_hires.png"
    }
  },
  {
    "id": "bw8-136",
    "name": "Charizard",
    "number": "136",
    "artist": "Ayaka Yoshida",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Split Bomb",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 40 damage to 2 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Scorching Fire",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "150",
        "text": "Discard a Fire Energy attached to this Pokémon."
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
    "flavorText": "This extremely rare Pokémon is a different color than usual. It is very hard to find.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/136.png",
      "large": "https://images.pokemontcg.io/bw8/136_hires.png"
    }
  },
  {
    "id": "bw8-137",
    "name": "Blastoise",
    "number": "137",
    "artist": "Ayaka Yoshida",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wartortle",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Deluge",
        "text": "As often as you like during your turn (before your attack), you may attach a Water Energy card from your hand to 1 of your Pokémon.",
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
        "damage": "60+",
        "text": "Does 10 more damage for each Water Energy attached to this Pokémon."
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
      9
    ],
    "flavorText": "This extremely rare Pokémon is a different color than usual. It is very hard to find.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/bw8/137.png",
      "large": "https://images.pokemontcg.io/bw8/137_hires.png"
    }
  },
  {
    "id": "bw8-138",
    "name": "Random Receiver",
    "number": "138",
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
      "Reveal cards from the top of your deck until you reveal a Supporter card. Put it into your hand. Shuffle the other cards back into your deck.",
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
      "small": "https://images.pokemontcg.io/bw8/138.png",
      "large": "https://images.pokemontcg.io/bw8/138_hires.png"
    }
  }
]

export default cardDetails
