import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "sm2-1",
    "name": "Bellsprout",
    "number": "1",
    "artist": "Aya Kusube",
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
        "name": "Vine Whip",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      69
    ],
    "flavorText": "Even though its body is extremely skinny, it is blindingly fast when catching its prey.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/1.png",
      "large": "https://images.pokemontcg.io/sm2/1_hires.png"
    }
  },
  {
    "id": "sm2-2",
    "name": "Weepinbell",
    "number": "2",
    "artist": "Mina Nakai",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
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
        "name": "Muddy Acid",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Flip a coin. If heads, discard an Energy from your opponent's Active Pokémon."
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
    "flavorText": "The leafy parts act as cutters for slashing foes. It spits a fluid that dissolves everything.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/2.png",
      "large": "https://images.pokemontcg.io/sm2/2_hires.png"
    }
  },
  {
    "id": "sm2-3",
    "name": "Victreebel",
    "number": "3",
    "artist": "TOKIYA",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Weepinbell",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pollen Hazard",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Your opponent's Active Pokémon is now Burned, Confused, and Poisoned."
      },
      {
        "name": "Stick and Absorb",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Heal 20 damage from this Pokémon. The Defending Pokémon can't retreat during your opponent's next turn."
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
      71
    ],
    "flavorText": "Said to live in huge colonies deep in jungles, although no one has ever returned from there.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/3.png",
      "large": "https://images.pokemontcg.io/sm2/3_hires.png"
    }
  },
  {
    "id": "sm2-4",
    "name": "Petilil",
    "number": "4",
    "artist": "Naoki Saito",
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
      "Lilligant"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Blot",
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
      548
    ],
    "flavorText": "Although the leaves on its head are bitter enough to cause dizziness, they provide relief from weariness—even more so when boiled.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/4.png",
      "large": "https://images.pokemontcg.io/sm2/4_hires.png"
    }
  },
  {
    "id": "sm2-5",
    "name": "Lilligant",
    "number": "5",
    "artist": "You Iribi",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Petilil",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Petal Blizzard",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 10 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Petal Dance",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40×",
        "text": "Flip 3 coins. This attack does 40 damage for each heads. This Pokémon is now Confused."
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
      549
    ],
    "flavorText": "No matter how much time and money is spent raising it, its flowers are the most beautiful when they bloom in the wild.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/5.png",
      "large": "https://images.pokemontcg.io/sm2/5_hires.png"
    }
  },
  {
    "id": "sm2-6",
    "name": "Phantump",
    "number": "6",
    "artist": "Sanosuke Sakuma",
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
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Confuse Ray",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Confused."
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
      708
    ],
    "flavorText": "These Pokémon are stumps possessed by the spirits of children who died in the forest. Their cries sound like eerie screams.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/6.png",
      "large": "https://images.pokemontcg.io/sm2/6_hires.png"
    }
  },
  {
    "id": "sm2-7",
    "name": "Trevenant",
    "number": "7",
    "artist": "Hiroyuki Yamamoto",
    "rarity": "Rare",
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
        "name": "Poltergeist",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "Your opponent reveals their hand. This attack does 30 damage for each Trainer card you find there."
      },
      {
        "name": "Horn Leech",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      709
    ],
    "flavorText": "This Pokémon is said to devour anyone daring to ravage the forest. To the creatures dwelling in the forest, it offers great kindness.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/7.png",
      "large": "https://images.pokemontcg.io/sm2/7_hires.png"
    }
  },
  {
    "id": "sm2-8",
    "name": "Wimpod",
    "number": "8",
    "artist": "match",
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
      "Golisopod"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scamper Away",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Shuffle this Pokémon and all cards attached to it into your deck."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      767
    ],
    "flavorText": "This Pokémon is a coward. As it desperately dashes off, the flailing of its many legs leaves a sparkling clean path in its wake.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/8.png",
      "large": "https://images.pokemontcg.io/sm2/8_hires.png"
    }
  },
  {
    "id": "sm2-9",
    "name": "Golisopod",
    "number": "9",
    "artist": "Kouki Saitou",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Wimpod",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Armor",
        "text": "This Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Resolute Claws",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If your opponent's Active Pokémon is a Pokémon-GX or a Pokémon-EX, this attack does 70 more damage (before applying Weakness and Resistance)."
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
      768
    ],
    "flavorText": "With a flashing slash of its giant sharp claws, it cleaves seawater—or even air—right in two.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/9.png",
      "large": "https://images.pokemontcg.io/sm2/9_hires.png"
    }
  },
  {
    "id": "sm2-10",
    "name": "Victini",
    "number": "10",
    "artist": "kodama",
    "rarity": "Rare Holo",
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
    "abilities": [
      {
        "name": "Victory Star",
        "text": "Once during your turn, after you flip any coins for an attack, you may ignore all results of those coin flips and begin flipping those coins again. You can't use more than 1 Victory Star Ability each turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "V-Flame",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      494
    ],
    "flavorText": "This Pokémon brings victory. It is said that Trainers with Victini always win, regardless of the type of encounter.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/10.png",
      "large": "https://images.pokemontcg.io/sm2/10_hires.png"
    }
  },
  {
    "id": "sm2-11",
    "name": "Litwick",
    "number": "11",
    "artist": "Mitsuhiro Arita",
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
      "Lampent"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flickering Flames",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Your opponent's Active Pokémon is now Asleep."
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
    "flavorText": "While shining a light and pretending to be a guide, it leeches off the life force of any who follow it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/11.png",
      "large": "https://images.pokemontcg.io/sm2/11_hires.png"
    }
  },
  {
    "id": "sm2-12",
    "name": "Lampent",
    "number": "12",
    "artist": "0313",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Litwick",
    "evolvesTo": [
      "Chandelure"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Will-O-Wisp",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
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
      608
    ],
    "flavorText": "The spirits it absorbs fuel its baleful fire. It hangs around hospitals waiting for people to pass on.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/12.png",
      "large": "https://images.pokemontcg.io/sm2/12_hires.png"
    }
  },
  {
    "id": "sm2-13",
    "name": "Chandelure",
    "number": "13",
    "artist": "Kouki Saitou",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Lampent",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Shady Move",
        "text": "Once during your turn (before your attack), you may move 1 damage counter from 1 Pokémon to another Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Super Singe",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
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
      609
    ],
    "flavorText": "Being consumed in Chandelure's flame burns up the spirit, leaving the body behind.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/13.png",
      "large": "https://images.pokemontcg.io/sm2/13_hires.png"
    }
  },
  {
    "id": "sm2-14",
    "name": "Oricorio",
    "number": "14",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Passionate Dance",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 Basic Fire Pokémon and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Kindle",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Discard an Energy from this Pokémon. If you do, discard an Energy from your opponent's Active Pokémon."
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
    "flavorText": "It beats its wings together to create fire. As it moves in the steps of its beautiful dance, it bathes opponents in intense flames.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/14.png",
      "large": "https://images.pokemontcg.io/sm2/14_hires.png"
    }
  },
  {
    "id": "sm2-15",
    "name": "Salandit",
    "number": "15",
    "artist": "TOKIYA",
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
        "name": "Scratch",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Venoshock",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "If your opponent's Active Pokémon is Poisoned, this attack does 40 more damage."
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
    "flavorText": "It burns its bodily fluids to create a poisonous gas. When its enemies become disoriented from inhaling the gas, it attacks them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/15.png",
      "large": "https://images.pokemontcg.io/sm2/15_hires.png"
    }
  },
  {
    "id": "sm2-16",
    "name": "Salazzle",
    "number": "16",
    "artist": "Mitsuhiro Arita",
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
    "abilities": [
      {
        "name": "Hot Poison",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may leave your opponent's Active Pokémon Burned and Poisoned.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Flamethrower",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      758
    ],
    "flavorText": "For some reason, only females have been found. It creates a reverse harem of male Salandit that it lives with.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/16.png",
      "large": "https://images.pokemontcg.io/sm2/16_hires.png"
    }
  },
  {
    "id": "sm2-17",
    "name": "Turtonator",
    "number": "17",
    "artist": "Shin Nagasawa",
    "rarity": "Rare",
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
        "name": "Body Slam",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Heat Blast",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
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
    "flavorText": "The shell on its back is chemically unstable and explodes violently if struck. The hole in its stomach is its weak point.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/17.png",
      "large": "https://images.pokemontcg.io/sm2/17_hires.png"
    }
  },
  {
    "id": "sm2-18",
    "name": "Turtonator-GX",
    "number": "18",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "190",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Shell Trap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "During your opponent's next turn, if this Pokémon is damaged by an attack (even if this Pokémon is Knocked Out), put 8 damage counters on the Attacking Pokémon."
      },
      {
        "name": "Bright Flame",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Discard 2 Fire Energy from this Pokémon."
      },
      {
        "name": "Nitro Tank-GX",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach 5 Fire Energy cards from your discard pile to your Pokémon in any way you like. (You can't use more than 1 GX attack in a game.)"
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
      776
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/18.png",
      "large": "https://images.pokemontcg.io/sm2/18_hires.png"
    }
  },
  {
    "id": "sm2-19",
    "name": "Alolan Sandshrew",
    "number": "19",
    "artist": "Mizue",
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
        "name": "Defense Curl",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Flip a coin. If heads, prevent all damage done to this Pokémon by attacks during your opponent's next turn."
      },
      {
        "name": "Ice Ball",
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
    "flavorText": "It lives on snowy mountains. Its steel shell is very hard—so much so, it can't roll its body up into a ball.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/19.png",
      "large": "https://images.pokemontcg.io/sm2/19_hires.png"
    }
  },
  {
    "id": "sm2-19a",
    "name": "Alolan Sandshrew",
    "number": "19a",
    "artist": "Hideki Ishikawa",
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
        "name": "Defense Curl",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Flip a coin. If heads, prevent all damage done to this Pokémon by attacks during your opponent's next turn."
      },
      {
        "name": "Ice Ball",
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
    "flavorText": "It lives on snowy mountains. Its steel shell is very hard—so much so, it can't roll its body up into a ball.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/19a.png",
      "large": "https://images.pokemontcg.io/sm2/19a_hires.png"
    }
  },
  {
    "id": "sm2-20",
    "name": "Alolan Sandslash",
    "number": "20",
    "artist": "TOKIYA",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Alolan Sandshrew",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Slush Rush",
        "text": "Once during your turn (before your attack), you may draw a card.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Smash Turn",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
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
      28
    ],
    "flavorText": "Fleeing a volcanic eruption, it settled on a snowy mountain. As it races through the snowfields, it sends up a spray of snow.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/20.png",
      "large": "https://images.pokemontcg.io/sm2/20_hires.png"
    }
  },
  {
    "id": "sm2-21",
    "name": "Alolan Vulpix",
    "number": "21",
    "artist": "You Iribi",
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
        "name": "Beacon",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your deck for up to 2 Pokémon, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Icy Snow",
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
      "small": "https://images.pokemontcg.io/sm2/21.png",
      "large": "https://images.pokemontcg.io/sm2/21_hires.png"
    }
  },
  {
    "id": "sm2-21a",
    "name": "Alolan Vulpix",
    "number": "21a",
    "artist": "kirisAki",
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
        "name": "Beacon",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your deck for up to 2 Pokémon, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Icy Snow",
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
      "small": "https://images.pokemontcg.io/sm2/21a.png",
      "large": "https://images.pokemontcg.io/sm2/21a_hires.png"
    }
  },
  {
    "id": "sm2-22",
    "name": "Alolan Ninetales-GX",
    "number": "22",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "210",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Alolan Vulpix",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Ice Blade",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 50 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Blizzard Edge",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Discard 2 Energy from this Pokémon."
      },
      {
        "name": "Ice Path-GX",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Move all damage counters from this Pokémon to your opponent's Active Pokémon. (You can't use more than 1 GX attack in a game.)"
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
      38
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/22.png",
      "large": "https://images.pokemontcg.io/sm2/22_hires.png"
    }
  },
  {
    "id": "sm2-23",
    "name": "Tentacool",
    "number": "23",
    "artist": "Shibuzoh.",
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
        "name": "Sludge Shock",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "The Defending Pokémon can't be healed during your opponent's next turn."
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
      72
    ],
    "flavorText": "They can be found lying dehydrated on beaches, but they are often still alive. When soaked in water, they will revive.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/23.png",
      "large": "https://images.pokemontcg.io/sm2/23_hires.png"
    }
  },
  {
    "id": "sm2-24",
    "name": "Tentacruel",
    "number": "24",
    "artist": "Masakazu Fukuda",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Tentacool",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Sting",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Poisoned."
      },
      {
        "name": "Seething Tentacles",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "Flip a coin. If heads, this attack does 40 more damage. If tails, your opponent's Active Pokémon is now Paralyzed."
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
      73
    ],
    "flavorText": "Normally, it has 80 poisonous tentacles. The longer one has been alive, the fewer tentacles it will have.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/24.png",
      "large": "https://images.pokemontcg.io/sm2/24_hires.png"
    }
  },
  {
    "id": "sm2-25",
    "name": "Politoed",
    "number": "25",
    "artist": "Saya Tsuruta",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Poliwhirl",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Roll Call",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Poliwag, a Poliwhirl, and a Poliwrath, and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Hyper Jump",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "You may shuffle this Pokémon and all cards attached to it into your deck."
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
      186
    ],
    "flavorText": "They gather on moonlit nights to form a large chorus. Their cries sound angry and not at all pleasant, but they are certainly distinctive.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/25.png",
      "large": "https://images.pokemontcg.io/sm2/25_hires.png"
    }
  },
  {
    "id": "sm2-26",
    "name": "Delibird",
    "number": "26",
    "artist": "sui",
    "rarity": "Common",
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
        "name": "All the Presents",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin until you get tails. For each heads, you may search your deck for a card and put it into your hand. Then, shuffle your deck."
      },
      {
        "name": "Surprise Attack",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "Flip a coin. If tails, this attack does nothing."
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
    "flavorText": "Although it naturally prefers colder locales, Delibird in Alola seem able to withstand the heat to a certain extent.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/26.png",
      "large": "https://images.pokemontcg.io/sm2/26_hires.png"
    }
  },
  {
    "id": "sm2-27",
    "name": "Carvanha",
    "number": "27",
    "artist": "Hideki Ishikawa",
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
      "Sharpedo"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bite",
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
    "flavorText": "Each school has its own territory. Any intruders are mercilessly attacked with fangs bared.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/27.png",
      "large": "https://images.pokemontcg.io/sm2/27_hires.png"
    }
  },
  {
    "id": "sm2-28",
    "name": "Sharpedo",
    "number": "28",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Carvanha",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Jet Headbutt",
        "cost": [
          "Water",
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      319
    ],
    "flavorText": "It pursues its prey at speeds of 75 mph and finishes them off with fangs that can crush iron. It is known as the bully of the sea.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/28.png",
      "large": "https://images.pokemontcg.io/sm2/28_hires.png"
    }
  },
  {
    "id": "sm2-29",
    "name": "Wailmer",
    "number": "29",
    "artist": "Miki Tanaka",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Wailord"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Splash",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Surf",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
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
      320
    ],
    "flavorText": "It loves to startle people. It fills itself up with seawater and plays by bouncing around like a ball.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/29.png",
      "large": "https://images.pokemontcg.io/sm2/29_hires.png"
    }
  },
  {
    "id": "sm2-30",
    "name": "Wailord",
    "number": "30",
    "artist": "OOYAMA",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "200",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wailmer",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dive",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "Flip a coin. If heads, prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn."
      },
      {
        "name": "Open Sea",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "Heal 30 damage from each of your Water Pokémon."
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
      321
    ],
    "flavorText": "Wailord pursue their prey in pods. With their large mouths, they can swallow entire schools of Wishiwashi whole.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/30.png",
      "large": "https://images.pokemontcg.io/sm2/30_hires.png"
    }
  },
  {
    "id": "sm2-31",
    "name": "Snorunt",
    "number": "31",
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
      "Glalie",
      "Froslass"
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
        "damage": "10",
        "text": ""
      },
      {
        "name": "Frost Breath",
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
      361
    ],
    "flavorText": "Their numbers seem to have rapidly increased in Alola. Custom has it that houses where Snorunt live will be prosperous for generations to come.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/31.png",
      "large": "https://images.pokemontcg.io/sm2/31_hires.png"
    }
  },
  {
    "id": "sm2-32",
    "name": "Glalie",
    "number": "32",
    "artist": "so-taro",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Snorunt",
    "evolvesTo": [
      "Froslass"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Crunch",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Flip a coin. If heads, discard an Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Raging Floe",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "70+",
        "text": "If this Pokémon has any damage counters on it, this attack does 80 more damage."
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
      362
    ],
    "flavorText": "Legend says a boulder on an icy mountain absorbed the distress and regrets of a stranded mountaineer, giving rise to Glalie.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/32.png",
      "large": "https://images.pokemontcg.io/sm2/32_hires.png"
    }
  },
  {
    "id": "sm2-33",
    "name": "Vanillite",
    "number": "33",
    "artist": "OOYAMA",
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
      "Vanillish"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Triple Spin",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
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
      582
    ],
    "flavorText": "Born of an icicle, this Pokémon uses its frosty breath to make ice crystals, causing snow to fall.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/33.png",
      "large": "https://images.pokemontcg.io/sm2/33_hires.png"
    }
  },
  {
    "id": "sm2-34",
    "name": "Vanillish",
    "number": "34",
    "artist": "Naoki Saito",
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
        "name": "Ice Shard",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30+",
        "text": "If your opponent's Active Pokémon is a Fighting Pokémon, this attack does 30 more damage."
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
      583
    ],
    "flavorText": "Hot days cause its body to melt. It can be restored by refreezing it, but the process leaves its body slightly warped.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/34.png",
      "large": "https://images.pokemontcg.io/sm2/34_hires.png"
    }
  },
  {
    "id": "sm2-35",
    "name": "Vanilluxe",
    "number": "35",
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
    "evolvesFrom": "Vanillish",
    "evolvesTo": [],
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
        "text": "This attack does 20 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Frozen Breath",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "You may discard 2 Water Energy from this Pokémon. If you do, your opponent's Active Pokémon is now Paralyzed."
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
      584
    ],
    "flavorText": "Each of its two heads has a brain, and when they are in agreement, it attacks its enemies by exhaling a violent blizzard.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/35.png",
      "large": "https://images.pokemontcg.io/sm2/35_hires.png"
    }
  },
  {
    "id": "sm2-36",
    "name": "Alomomola",
    "number": "36",
    "artist": "Aya Kusube",
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
        "name": "Borne Ashore",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put a Basic Pokémon from either player's discard pile onto its owner's Bench."
      },
      {
        "name": "Hydro Splash",
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
      594
    ],
    "flavorText": "It uses its special mucus to close the wounds of injured Pokémon. The reason for this behavior remains unknown.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/36.png",
      "large": "https://images.pokemontcg.io/sm2/36_hires.png"
    }
  },
  {
    "id": "sm2-37",
    "name": "Wishiwashi",
    "number": "37",
    "artist": "Sanosuke Sakuma",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Schooling",
        "text": "Once during your turn (before your attack), you may switch this Pokémon with a Wishiwashi-GX in your hand. Any attached cards, damage counters, Special Conditions, turns in play, and any other effects remain on the new Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Sharpshooting",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 10 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      746
    ],
    "flavorText": "When it's in trouble, its eyes moisten and begin to shine. The shining light attracts its comrades, and they stand together against their enemies.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/37.png",
      "large": "https://images.pokemontcg.io/sm2/37_hires.png"
    }
  },
  {
    "id": "sm2-38",
    "name": "Wishiwashi-GX",
    "number": "38",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "210",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
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
      },
      {
        "name": "Torrential Vortex",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "120",
        "text": "Discard a Special Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Blue Surge-GX",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "220",
        "text": "Move all Energy from this Pokémon to your Benched Pokémon in any way you like. (You can't use more than 1 GX attack in a game.)"
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
      746
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/38.png",
      "large": "https://images.pokemontcg.io/sm2/38_hires.png"
    }
  },
  {
    "id": "sm2-39",
    "name": "Mareanie",
    "number": "39",
    "artist": "Shin Nagasawa",
    "rarity": "Uncommon",
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
      "Toxapex"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bail Out",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put a Pokémon from your discard pile into your hand."
      },
      {
        "name": "Rain Splash",
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
      747
    ],
    "flavorText": "It plunges the poison spike on its head into its prey. When the prey has weakened, Mareanie deals the finishing blow with its 10 tentacles.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/39.png",
      "large": "https://images.pokemontcg.io/sm2/39_hires.png"
    }
  },
  {
    "id": "sm2-40",
    "name": "Alolan Geodude",
    "number": "40",
    "artist": "Hitoshi Ariga",
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
      "Graveler"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rock Polish",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "During your next turn, this Pokémon has no Retreat Cost."
      },
      {
        "name": "Rollout",
        "cost": [
          "Lightning",
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
      74
    ],
    "flavorText": "Its body is a magnetic stone. Iron sand attaches firmly to the portions of its body that are particularly magnetic.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/40.png",
      "large": "https://images.pokemontcg.io/sm2/40_hires.png"
    }
  },
  {
    "id": "sm2-41",
    "name": "Alolan Graveler",
    "number": "41",
    "artist": "match",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Alolan Geodude",
    "evolvesTo": [
      "Golem"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Thunder Punch",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "Flip a coin. If heads, this attack does 20 more damage. If tails, this Pokémon does 20 damage to itself."
      },
      {
        "name": "Electrobullet",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "This attack does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      75
    ],
    "flavorText": "Its preferred food is dravite. After it has eaten this mineral, crystals form inside the Pokémon, rising to the surface of part of its body.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/41.png",
      "large": "https://images.pokemontcg.io/sm2/41_hires.png"
    }
  },
  {
    "id": "sm2-42",
    "name": "Alolan Golem",
    "number": "42",
    "artist": "Shin Nagasawa",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Alolan Graveler",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Electromagnetic Rock Wrecker",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80×",
        "text": "Flip a coin for each Lightning Energy attached to this Pokémon. This attack does 80 damage for each heads."
      },
      {
        "name": "Heavy Slam",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "200-",
        "text": "This attack does 30 less damage for each Colorless in your opponent's Active Pokémon's Retreat Cost."
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
      76
    ],
    "flavorText": "It fires rocks charged with electricity. Even if the rock isn't fired that accurately, just grazing an opponent will cause numbness and fainting.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/42.png",
      "large": "https://images.pokemontcg.io/sm2/42_hires.png"
    }
  },
  {
    "id": "sm2-43",
    "name": "Helioptile",
    "number": "43",
    "artist": "Masakazu Fukuda",
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
      "Heliolisk"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Thunder Shock",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
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
      694
    ],
    "flavorText": "They make their home in deserts. They can generate their energy from basking in the sun, so eating food is not a requirement.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/43.png",
      "large": "https://images.pokemontcg.io/sm2/43_hires.png"
    }
  },
  {
    "id": "sm2-44",
    "name": "Heliolisk",
    "number": "44",
    "artist": "Shin Nagasawa",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Helioptile",
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
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
      },
      {
        "name": "Raging Thunder",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This attack does 30 damage to 1 of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      695
    ],
    "flavorText": "They flare their frills and generate energy. A single Heliolisk can generate sufficient electricity to power a skyscraper.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/44.png",
      "large": "https://images.pokemontcg.io/sm2/44_hires.png"
    }
  },
  {
    "id": "sm2-45",
    "name": "Vikavolt-GX",
    "number": "45",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "240",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Charjabug",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Charge Beam",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "Attach an Energy card from your discard pile to this Pokémon."
      },
      {
        "name": "Super Zap Cannon",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "Discard 2 Energy from this Pokémon."
      },
      {
        "name": "Gigatron-GX",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "",
        "text": "This attack does 60 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) (You can't use more than 1 GX attack in a game.)"
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
      738
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/45.png",
      "large": "https://images.pokemontcg.io/sm2/45_hires.png"
    }
  },
  {
    "id": "sm2-46",
    "name": "Oricorio",
    "number": "46",
    "artist": "Naoki Saito",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Feather Dance",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your next turn, this Pokémon's Pom-Pom Punch attack's base damage is 100."
      },
      {
        "name": "Pom-Pom Punch",
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
      741
    ],
    "flavorText": "This Oricorio has sipped bright yellow nectar. Its bright, cheerful dance melts the hearts of its enemies.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/46.png",
      "large": "https://images.pokemontcg.io/sm2/46_hires.png"
    }
  },
  {
    "id": "sm2-47",
    "name": "Tapu Koko-GX",
    "number": "47",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "170",
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
        "name": "Aero Trail",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may move any number of Lightning Energy from your other Pokémon to this Pokémon. If you do, switch this Pokémon with your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Sky-High Claws",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": ""
      },
      {
        "name": "Tapu Thunder-GX",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50×",
        "text": "This attack does 50 damage times the amount of Energy attached to all of your opponent's Pokémon. (You can't use more than 1 GX attack in a game.)"
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
      785
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/47.png",
      "large": "https://images.pokemontcg.io/sm2/47_hires.png"
    }
  },
  {
    "id": "sm2-48",
    "name": "Slowpoke",
    "number": "48",
    "artist": "Mina Nakai",
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
      "Slowbro",
      "Slowking"
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
        "name": "Whimsy Tackle",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      79
    ],
    "flavorText": "Its long tail often breaks off. It doesn't really feel any pain, though, and the tail grows back, so Slowpoke isn't particularly bothered.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/48.png",
      "large": "https://images.pokemontcg.io/sm2/48_hires.png"
    }
  },
  {
    "id": "sm2-49",
    "name": "Slowbro",
    "number": "49",
    "artist": "Shibuzoh.",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Slowpoke",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Amnesia",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Choose 1 of your opponent's Active Pokémon's attacks. That Pokémon can't use that attack during your opponent's next turn."
      },
      {
        "name": "Facade",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "If this Pokémon is Burned or Poisoned, this attack does 80 more damage."
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
      80
    ],
    "flavorText": "It spaces out while gazing at the sea. With Shellder's poison flowing through its body, it becomes even spacier.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/49.png",
      "large": "https://images.pokemontcg.io/sm2/49_hires.png"
    }
  },
  {
    "id": "sm2-50",
    "name": "Trubbish",
    "number": "50",
    "artist": "Yuka Morii",
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
        "name": "Stomp Off",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard the top card of your opponent's deck."
      },
      {
        "name": "Drool",
        "cost": [
          "Psychic",
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
      568
    ],
    "flavorText": "Unsanitary places are what they like best. They can be spotted in Alola, often with Grimer in hot pursuit.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/50.png",
      "large": "https://images.pokemontcg.io/sm2/50_hires.png"
    }
  },
  {
    "id": "sm2-51",
    "name": "Garbodor",
    "number": "51",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Trubbish",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Trashalanche",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "This attack does 20 damage for each Item card in your opponent's discard pile."
      },
      {
        "name": "Acid Spray",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      569
    ],
    "flavorText": "Beware the poisonous liquid it shoots from its right arm. If even a little of it gets on you, you'll experience the effects of the unidentified toxin.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/51.png",
      "large": "https://images.pokemontcg.io/sm2/51_hires.png"
    }
  },
  {
    "id": "sm2-51a",
    "name": "Garbodor",
    "number": "51a",
    "artist": "nagimiso",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Trubbish",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Trashalanche",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "This attack does 20 damage for each Item card in your opponent's discard pile."
      },
      {
        "name": "Acid Spray",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      569
    ],
    "flavorText": "Beware the poisonous liquid it shoots from its right arm. If even a little of it gets on you, you'll experience the effects of the unidentified toxin.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/51a.png",
      "large": "https://images.pokemontcg.io/sm2/51a_hires.png"
    }
  },
  {
    "id": "sm2-52",
    "name": "Gothita",
    "number": "52",
    "artist": "Yuka Morii",
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
      "Gothorita"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Blown Kiss",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put 1 damage counter on 1 of your opponent's Pokémon."
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
      574
    ],
    "flavorText": "Their ribbonlike feelers increase their psychic power. They are always staring at something.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/52.png",
      "large": "https://images.pokemontcg.io/sm2/52_hires.png"
    }
  },
  {
    "id": "sm2-53",
    "name": "Gothorita",
    "number": "53",
    "artist": "kawayoo",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Gothita",
    "evolvesTo": [
      "Gothitelle"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Slap",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Psybeam",
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
      575
    ],
    "flavorText": "Starlight is the source of their power. At night, they mark star positions by using psychic power to float stones.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/53.png",
      "large": "https://images.pokemontcg.io/sm2/53_hires.png"
    }
  },
  {
    "id": "sm2-54",
    "name": "Gothitelle",
    "number": "54",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Gothorita",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tractorbeam",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch 1 of your opponent's Benched Pokémon with their Active Pokémon. This attack does 30 damage to the new Active Pokémon."
      },
      {
        "name": "Link Blast",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50+",
        "text": "If this Pokémon and your opponent's Active Pokémon have the same amount of Energy attached to them, this attack does 80 more damage."
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
      576
    ],
    "flavorText": "Starry skies thousands of light-years away are visible in the space distorted by their intense psychic power.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/54.png",
      "large": "https://images.pokemontcg.io/sm2/54_hires.png"
    }
  },
  {
    "id": "sm2-55",
    "name": "Oricorio",
    "number": "55",
    "artist": "Kouki Saitou",
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
        "name": "Vital Dance",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may search your deck for up to 2 basic Energy cards, reveal them, and put them into your hand. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Casual Slap",
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
      741
    ],
    "flavorText": "This Oricorio relaxes by swaying gently. This increases its psychic energy, which it then fires at its enemies.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/55.png",
      "large": "https://images.pokemontcg.io/sm2/55_hires.png"
    }
  },
  {
    "id": "sm2-56",
    "name": "Oricorio",
    "number": "56",
    "artist": "TOKIYA",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Supernatural Dance",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "For each Pokémon in your opponent's discard pile, put 1 damage counter on your opponent's Pokémon in any way you like."
      },
      {
        "name": "Revelation Dance",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "If there is no Stadium card in play, this attack does nothing."
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
      741
    ],
    "flavorText": "This Oricorio has sipped purple nectar. Its elegant, attractive dance will send the minds and hearts of its enemies to another world.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/56.png",
      "large": "https://images.pokemontcg.io/sm2/56_hires.png"
    }
  },
  {
    "id": "sm2-57",
    "name": "Toxapex-GX",
    "number": "57",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "210",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Mareanie",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Spike Cannon",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30×",
        "text": "Flip 4 coins. This attack does 30 damage for each heads."
      },
      {
        "name": "Super Intense Poison",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Poisoned. Put 10 damage counters instead of 1 on that Pokémon between turns."
      },
      {
        "name": "Total Shelter-GX",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn. (You can't use more than 1 GX attack in a game.)"
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
      748
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/57.png",
      "large": "https://images.pokemontcg.io/sm2/57_hires.png"
    }
  },
  {
    "id": "sm2-58",
    "name": "Mimikyu",
    "number": "58",
    "artist": "Megumi Mizutani",
    "rarity": "Rare Holo",
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
        "name": "Filch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw 2 cards."
      },
      {
        "name": "Copycat",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "If your opponent's Pokémon used an attack that isn't a GX attack during their last turn, use it as this attack."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      778
    ],
    "flavorText": "Its actual appearance is unknown. A scholar who saw what was under its rag was overwhelmed by horror and died of the shock.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/58.png",
      "large": "https://images.pokemontcg.io/sm2/58_hires.png"
    }
  },
  {
    "id": "sm2-59",
    "name": "Dhelmise",
    "number": "59",
    "artist": "Hasuno",
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
    "abilities": [
      {
        "name": "Steelworker",
        "text": "Your Metal Pokémon's attacks do 10 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Anchor Shot",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
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
      781
    ],
    "flavorText": "Swinging its massive anchor, it can KO Wailord in a single blow. What appears to be green seaweed is actually its body.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/59.png",
      "large": "https://images.pokemontcg.io/sm2/59_hires.png"
    }
  },
  {
    "id": "sm2-60",
    "name": "Tapu Lele-GX",
    "number": "60",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
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
      "small": "https://images.pokemontcg.io/sm2/60.png",
      "large": "https://images.pokemontcg.io/sm2/60_hires.png"
    }
  },
  {
    "id": "sm2-60a",
    "name": "Tapu Lele-GX",
    "number": "60a",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
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
      "small": "https://images.pokemontcg.io/sm2/60a.png",
      "large": "https://images.pokemontcg.io/sm2/60a_hires.png"
    }
  },
  {
    "id": "sm2-61",
    "name": "Lunala",
    "number": "61",
    "artist": "5ban Graphics",
    "rarity": "Rare",
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
        "name": "Shatter Shot",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "40×",
        "text": "This attack does 40 damage times the amount of Psychic Energy attached to this Pokémon."
      },
      {
        "name": "Wings of the Moone",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "Move all Energy from this Pokémon to your Benched Pokémon in any way you like."
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
    "flavorText": "It is said to be a female evolution of Cosmog. When its third eye activates, away it flies to another world.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/61.png",
      "large": "https://images.pokemontcg.io/sm2/61_hires.png"
    }
  },
  {
    "id": "sm2-62",
    "name": "Machop",
    "number": "62",
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
      "Machoke"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dual Chop",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "Flip 2 coins. This attack does 30 damage for each heads."
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
    "flavorText": "It loves working out. As it gazes at its muscles, which continue to swell day by day, it becomes more and more dedicated to its training.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/62.png",
      "large": "https://images.pokemontcg.io/sm2/62_hires.png"
    }
  },
  {
    "id": "sm2-63",
    "name": "Machop",
    "number": "63",
    "artist": "Masakazu Fukuda",
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
      "Machoke"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dynamic Chop",
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
    "flavorText": "It loves working out. As it gazes at its muscles, which continue to swell day by day, it becomes more and more dedicated to its training.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/63.png",
      "large": "https://images.pokemontcg.io/sm2/63_hires.png"
    }
  },
  {
    "id": "sm2-64",
    "name": "Machoke",
    "number": "64",
    "artist": "Kouki Saitou",
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
    "abilities": [
      {
        "name": "Daunting Pose",
        "text": "Prevent all damage done to your Benched Pokémon by your opponent's attacks. Your opponent's attacks and Abilities can't put damage counters on your Benched Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Cross Chop",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 30 more damage."
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
      67
    ],
    "flavorText": "As a result of its continual workouts, it has developed tremendous power. It uses that power to help people with their work.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/64.png",
      "large": "https://images.pokemontcg.io/sm2/64_hires.png"
    }
  },
  {
    "id": "sm2-65",
    "name": "Machamp",
    "number": "65",
    "artist": "Hitoshi Ariga",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Machoke",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Settle the Score",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 80 more damage for each Prize card your opponent took on their last turn."
      },
      {
        "name": "Submission",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "This Pokémon does 30 damage to itself."
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
    "flavorText": "It unleashes megaton-level punches that send opponents flying clear over the horizon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/65.png",
      "large": "https://images.pokemontcg.io/sm2/65_hires.png"
    }
  },
  {
    "id": "sm2-66",
    "name": "Sudowoodo",
    "number": "66",
    "artist": "Hajime Kusajima",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Roadblock",
        "text": "Your opponent can't have more than 4 Benched Pokémon. If they have 5 or more Benched Pokémon, they discard Benched Pokémon until they have 4 Pokémon on the Bench. If more than one effect changes the number of Benched Pokémon allowed, use the smaller number.",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      185
    ],
    "flavorText": "To avoid attack, it mimics a tree. It will run off if splashed with water, which it hates.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/66.png",
      "large": "https://images.pokemontcg.io/sm2/66_hires.png"
    }
  },
  {
    "id": "sm2-67",
    "name": "Gligar",
    "number": "67",
    "artist": "Mina Nakai",
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
        "name": "Double Shot",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 10 damage to 2 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": "It usually clings to cliffs. When it spots its prey, it spreads its wings and glides down to attack.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/67.png",
      "large": "https://images.pokemontcg.io/sm2/67_hires.png"
    }
  },
  {
    "id": "sm2-68",
    "name": "Gliscor",
    "number": "68",
    "artist": "Yoshinobu Saito",
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
        "name": "Finishing Stinger",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "70",
        "text": "If your opponent's Active Pokémon has no damage counters on it before this attack does damage, this attack does nothing."
      },
      {
        "name": "Guillotine",
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
    "flavorText": "It observes prey while hanging inverted from branches. When the chance presents itself, it swoops!",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/68.png",
      "large": "https://images.pokemontcg.io/sm2/68_hires.png"
    }
  },
  {
    "id": "sm2-69",
    "name": "Nosepass",
    "number": "69",
    "artist": "Tomokazu Komiya",
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
      "Probopass"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ram",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Rising Lunge",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      299
    ],
    "flavorText": "The magnet in Nosepass's nose provides an unerring compass, making it an excellent partner for Trainers going on a journey.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/69.png",
      "large": "https://images.pokemontcg.io/sm2/69_hires.png"
    }
  },
  {
    "id": "sm2-70",
    "name": "Barboach",
    "number": "70",
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
      "Whiscash"
    ],
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
      },
      {
        "name": "Mud-Slap",
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
      339
    ],
    "flavorText": "Its two whiskers provide a sensitive radar. Even in muddy waters, it can detect its prey's location.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/70.png",
      "large": "https://images.pokemontcg.io/sm2/70_hires.png"
    }
  },
  {
    "id": "sm2-71",
    "name": "Whiscash",
    "number": "71",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Barboach",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Water Pulse",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Landslip",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100×",
        "text": "Discard the top 3 cards of your deck. This attack does 100 damage for each Energy card you discarded in this way."
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
      340
    ],
    "flavorText": "A glutton that devours anything that moves, it quietly lurks at the bottom of swamps, lying in wait for prey.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/71.png",
      "large": "https://images.pokemontcg.io/sm2/71_hires.png"
    }
  },
  {
    "id": "sm2-72",
    "name": "Pancham",
    "number": "72",
    "artist": "TOKIYA",
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
        "name": "Karate Chop",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "60-",
        "text": "This attack does 10 less damage for each damage counter on this Pokémon."
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
    "flavorText": "It grows up imitating the behavior of Pangoro, which it looks up to as a leader.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/72.png",
      "large": "https://images.pokemontcg.io/sm2/72_hires.png"
    }
  },
  {
    "id": "sm2-73",
    "name": "Rockruff",
    "number": "73",
    "artist": "Naoki Saito",
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
      "Lycanroc"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Corner",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      },
      {
        "name": "Wild Kick",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
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
      744
    ],
    "flavorText": "It's considered to be a good Pokémon for beginners because of its friendliness, but its disposition grows rougher as it grows up.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/73.png",
      "large": "https://images.pokemontcg.io/sm2/73_hires.png"
    }
  },
  {
    "id": "sm2-74",
    "name": "Lycanroc-GX",
    "number": "74",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Rockruff",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Bloodthirsty Eyes",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may switch 1 of your opponent's Benched Pokémon with their Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Claw Slash",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": ""
      },
      {
        "name": "Dangerous Rogue-GX",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50×",
        "text": "This attack does 50 damage for each of your opponent's Benched Pokémon. (You can't use more than 1 GX attack in a game.)"
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
      745
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/74.png",
      "large": "https://images.pokemontcg.io/sm2/74_hires.png"
    }
  },
  {
    "id": "sm2-75",
    "name": "Mudbray",
    "number": "75",
    "artist": "Kouki Saitou",
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
      "Mudsdale"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Kick",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "Flip 2 coins. This attack does 30 damage for each heads."
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
      749
    ],
    "flavorText": "The mud stuck to Mudbray's hooves enhances its grip and its powerful running gait.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/75.png",
      "large": "https://images.pokemontcg.io/sm2/75_hires.png"
    }
  },
  {
    "id": "sm2-76",
    "name": "Mudsdale",
    "number": "76",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Mudbray",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Enhanced Stomp",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "If this Pokémon has a Pokémon Tool card attached to it, this attack does 60 more damage."
      },
      {
        "name": "High Horsepower",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "This Pokémon does 40 damage to itself."
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
      750
    ],
    "flavorText": "It spits a mud that provides resistance to both wind and rain, so the walls of old houses were often coated with it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/76.png",
      "large": "https://images.pokemontcg.io/sm2/76_hires.png"
    }
  },
  {
    "id": "sm2-77",
    "name": "Minior",
    "number": "77",
    "artist": "Naoki Saito",
    "rarity": "Rare Holo",
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
        "name": "Swift",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "This attack's damage isn't affected by Weakness, Resistance, or any other effects on your opponent's Active Pokémon."
      },
      {
        "name": "Cosmicsplosion",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 3,
        "damage": "190",
        "text": "This Pokémon is Knocked Out."
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
      774
    ],
    "flavorText": "It eats dust in the atmosphere. The composition of the dust determines the color of its core.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/77.png",
      "large": "https://images.pokemontcg.io/sm2/77_hires.png"
    }
  },
  {
    "id": "sm2-78",
    "name": "Murkrow",
    "number": "78",
    "artist": "Sekio",
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
        "name": "Whirlwind",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
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
      198
    ],
    "flavorText": "They awaken at dusk and take wing in the twilight, leading to the expression, \"Get home before the Murkrow fly.\"",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/78.png",
      "large": "https://images.pokemontcg.io/sm2/78_hires.png"
    }
  },
  {
    "id": "sm2-79",
    "name": "Honchkrow",
    "number": "79",
    "artist": "Hideki Ishikawa",
    "rarity": "Rare",
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
        "name": "Feint Attack",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 30 damage to 1 of your opponent's Pokémon. This damage isn't affected by Weakness, Resistance, or any other effects on that Pokémon."
      },
      {
        "name": "Raven's Claw",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "This attack does 10 more damage for each damage counter on all of your opponent's Pokémon."
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
    "flavorText": "A single cry from this nocturnal Pokémon, and more than a hundred of its Murkrow cronies will assemble.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/79.png",
      "large": "https://images.pokemontcg.io/sm2/79_hires.png"
    }
  },
  {
    "id": "sm2-80",
    "name": "Sableye",
    "number": "80",
    "artist": "Aya Kusube",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Limitation",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent can't play any Supporter cards from their hand during their next turn."
      },
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
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      302
    ],
    "flavorText": "It's a fiend for gemstones, so it stalks Carbink. Unfortunately, Gabite almost always grabs them first.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/80.png",
      "large": "https://images.pokemontcg.io/sm2/80_hires.png"
    }
  },
  {
    "id": "sm2-81",
    "name": "Absol",
    "number": "81",
    "artist": "Anesaki Dynamic",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Future Sight",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 4 cards of either player's deck and put them back in any order."
      },
      {
        "name": "Doom News",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put all Energy attached to this Pokémon into your hand. At the end of your opponent's next turn, the Defending Pokémon will be Knocked Out."
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
    "flavorText": "Long ago, superstitions were spread about it, saying it brought disaster. This fed a hatred of it, and it was driven deep into the mountains.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/81.png",
      "large": "https://images.pokemontcg.io/sm2/81_hires.png"
    }
  },
  {
    "id": "sm2-82",
    "name": "Pangoro",
    "number": "82",
    "artist": "kodama",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Pancham",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sky Uppercut",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "This attack's damage isn't affected by Resistance."
      },
      {
        "name": "Magnum Punch",
        "cost": [
          "Darkness",
          "Colorless",
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
      675
    ],
    "flavorText": "It boasts superb physical strength. Those who wish to become Pangoro's Trainer have no choice but to converse with their fists.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/82.png",
      "large": "https://images.pokemontcg.io/sm2/82_hires.png"
    }
  },
  {
    "id": "sm2-83",
    "name": "Beldum",
    "number": "83",
    "artist": "Kyoko Umemoto",
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
      "Metang"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Core Beam",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Discard a Metal Energy from this Pokémon."
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
      374
    ],
    "flavorText": "Its cells are all magnets. It uses magnetism to communicate with others of its kind.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/83.png",
      "large": "https://images.pokemontcg.io/sm2/83_hires.png"
    }
  },
  {
    "id": "sm2-84",
    "name": "Metang",
    "number": "84",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Beldum",
    "evolvesTo": [
      "Metagross"
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
        "damage": "20",
        "text": ""
      },
      {
        "name": "Core Beam",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Discard a Metal Energy from this Pokémon."
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
      375
    ],
    "flavorText": "When two Beldum link together, their psychic power is doubled. Their intelligence, however, remains unchanged.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/84.png",
      "large": "https://images.pokemontcg.io/sm2/84_hires.png"
    }
  },
  {
    "id": "sm2-85",
    "name": "Metagross-GX",
    "number": "85",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Metang",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Geotech System",
        "text": "Once during your turn (before your attack), you may attach a Psychic or Metal Energy card from your discard pile to your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Giga Hammer",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "This Pokémon can't use Giga Hammer during your next turn."
      },
      {
        "name": "Algorithm-GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 5 cards and put them into your hand. Then, shuffle your deck. (You can't use more than 1 GX attack in a game.)"
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
      376
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/85.png",
      "large": "https://images.pokemontcg.io/sm2/85_hires.png"
    }
  },
  {
    "id": "sm2-86",
    "name": "Probopass",
    "number": "86",
    "artist": "Yoshinobu Saito",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Nosepass",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Energy Link",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Attach an Energy card from your discard pile to this Pokémon."
      },
      {
        "name": "Power Gem",
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
      476
    ],
    "flavorText": "It radiates such a powerful magnetic field that nearby electrical appliances become unusable.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/86.png",
      "large": "https://images.pokemontcg.io/sm2/86_hires.png"
    }
  },
  {
    "id": "sm2-87",
    "name": "Solgaleo",
    "number": "87",
    "artist": "5ban Graphics",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Cosmoem",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shining Arrow",
        "cost": [
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 50 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Fangs of the Sunne",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "170",
        "text": "This Pokémon can't use Fangs of the Sunne during your next turn."
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
    "flavorText": "It is said to live in another world. The intense light it radiates from the surface of its body can make the darkest of nights light up like midday.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/87.png",
      "large": "https://images.pokemontcg.io/sm2/87_hires.png"
    }
  },
  {
    "id": "sm2-88",
    "name": "Clefairy",
    "number": "88",
    "artist": "Kagemaru Himeno",
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
      "Clefable"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Slap",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Follow Me",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Switch 1 of your opponent's Benched Pokémon with their Active Pokémon."
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
      35
    ],
    "flavorText": "Its adorable behavior and appearance make it popular with men and women, young and old. Its numbers are few, however.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/88.png",
      "large": "https://images.pokemontcg.io/sm2/88_hires.png"
    }
  },
  {
    "id": "sm2-89",
    "name": "Clefable",
    "number": "89",
    "artist": "Miki Tanaka",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Clefairy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Lullaby",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Meteor Mash",
        "cost": [
          "Fairy",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "During your next turn, this Pokémon's Meteor Mash attack does 60 more damage (before applying Weakness and Resistance)."
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
      36
    ],
    "flavorText": "They don't like to reveal themselves in front of people. They live quietly in packs deep in the mountains.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/89.png",
      "large": "https://images.pokemontcg.io/sm2/89_hires.png"
    }
  },
  {
    "id": "sm2-90",
    "name": "Cottonee",
    "number": "90",
    "artist": "Megumi Mizutani",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Whimsicott"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Continuous Tumble",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip a coin until you get tails. This attack does 10 damage for each heads."
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
      546
    ],
    "flavorText": "When it finds others of its kind, they all stick together. When enough of them have collected, the mass resembles a cumulonimbus cloud.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/90.png",
      "large": "https://images.pokemontcg.io/sm2/90_hires.png"
    }
  },
  {
    "id": "sm2-91",
    "name": "Whimsicott",
    "number": "91",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Cottonee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "The Wages of Fluff",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If the Defending Pokémon is Knocked Out during your next turn, take 2 more Prize cards."
      },
      {
        "name": "Fairy Wind",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
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
    "resistances": [
      {
        "type": "Darkness",
        "value": "-20"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      547
    ],
    "flavorText": "It rides on the wind and slips into people's homes. After it has turned a room into a cotton-filled mess, it giggles to itself and takes off.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/91.png",
      "large": "https://images.pokemontcg.io/sm2/91_hires.png"
    }
  },
  {
    "id": "sm2-92",
    "name": "Sylveon-GX",
    "number": "92",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Magical Ribbon",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 cards and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Fairy Wind",
        "cost": [
          "Fairy",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": ""
      },
      {
        "name": "Plea-GX",
        "cost": [
          "Fairy",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Put 2 of your opponent's Benched Pokémon and all cards attached to them into your opponent's hand. (You can't use more than 1 GX attack in a game.)"
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
      700
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/92.png",
      "large": "https://images.pokemontcg.io/sm2/92_hires.png"
    }
  },
  {
    "id": "sm2-92a",
    "name": "Sylveon-GX",
    "number": "92a",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Magical Ribbon",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 cards and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Fairy Wind",
        "cost": [
          "Fairy",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": ""
      },
      {
        "name": "Plea-GX",
        "cost": [
          "Fairy",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Put 2 of your opponent's Benched Pokémon and all cards attached to them into your opponent's hand. (You can't use more than 1 GX attack in a game.)"
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
      700
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/92a.png",
      "large": "https://images.pokemontcg.io/sm2/92a_hires.png"
    }
  },
  {
    "id": "sm2-93",
    "name": "Comfey",
    "number": "93",
    "artist": "Sanosuke Sakuma",
    "rarity": "Rare Holo",
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
        "name": "Flower Shield",
        "text": "Each of your Pokémon that has any Fairy Energy attached to it can't be affected by any Special Conditions. Remove any Special Conditions affecting those Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Sweet Kiss",
        "cost": [
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
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
      764
    ],
    "flavorText": "It attaches flowers to its highly nutritious vine. This revitalizes the flowers, and they give off an aromatic scent.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/93.png",
      "large": "https://images.pokemontcg.io/sm2/93_hires.png"
    }
  },
  {
    "id": "sm2-94",
    "name": "Goomy",
    "number": "94",
    "artist": "Asako Ito",
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
        "name": "Bubble",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If head, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Tackle",
        "cost": [
          "Water",
          "Fairy"
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
      704
    ],
    "flavorText": "The weakest of all Dragon-type Pokémon, it's unable to breathe if its skin dries out, so it sticks to shady places.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/94.png",
      "large": "https://images.pokemontcg.io/sm2/94_hires.png"
    }
  },
  {
    "id": "sm2-95",
    "name": "Sliggoo",
    "number": "95",
    "artist": "Tomokazu Komiya",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
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
        "name": "Division",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Sliggoo and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Tackle",
        "cost": [
          "Water",
          "Fairy"
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      705
    ],
    "flavorText": "It has trouble drawing a line between friends and food. It will calmly try to melt and eat even those it gets along well with.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/95.png",
      "large": "https://images.pokemontcg.io/sm2/95_hires.png"
    }
  },
  {
    "id": "sm2-96",
    "name": "Goodra",
    "number": "96",
    "artist": "Naoki Saito",
    "rarity": "Rare Holo",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Power Whip",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 20 damage times the amount of Energy attached to this Pokémon to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Beat Slider",
        "cost": [
          "Water",
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "Your opponent switches their Active Pokémon with 1 of their Benched Pokémon."
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
      706
    ],
    "flavorText": "An amazingly friendly Pokémon, but if left to itself, loneliness overcomes it, and it oozes gooey tears.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/96.png",
      "large": "https://images.pokemontcg.io/sm2/96_hires.png"
    }
  },
  {
    "id": "sm2-97",
    "name": "Drampa",
    "number": "97",
    "artist": "match",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Amass",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a basic Energy card and attach it to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Power Cyclone",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
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
      780
    ],
    "flavorText": "It has a compassionate personality, but if it is angered, it will completely destroy its surroundings with its intense breath.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/97.png",
      "large": "https://images.pokemontcg.io/sm2/97_hires.png"
    }
  },
  {
    "id": "sm2-98",
    "name": "Jangmo-o",
    "number": "98",
    "artist": "match",
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
      "Hakamo-o"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Bulletproof",
        "text": "This Pokémon takes 10 less damage from attacks (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dragon Claw",
        "cost": [
          "Lightning",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
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
      782
    ],
    "flavorText": "It expresses its feelings by smacking its scales. Metallic sounds echo through the tall mountains where Jangmo-o lives.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/98.png",
      "large": "https://images.pokemontcg.io/sm2/98_hires.png"
    }
  },
  {
    "id": "sm2-99",
    "name": "Hakamo-o",
    "number": "99",
    "artist": "Shin Nagasawa",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Jangmo-o",
    "evolvesTo": [
      "Kommo-o"
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
        "damage": "30",
        "text": ""
      },
      {
        "name": "Dragon Claw",
        "cost": [
          "Lightning",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
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
      783
    ],
    "flavorText": "It leaps at its prey with a courageous shout. Its scaly punches tear its opponents to shreds.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/99.png",
      "large": "https://images.pokemontcg.io/sm2/99_hires.png"
    }
  },
  {
    "id": "sm2-100",
    "name": "Kommo-o-GX",
    "number": "100",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "240",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Hakamo-o",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Adamantine Press",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Shred",
        "cost": [
          "Lightning",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "130",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      },
      {
        "name": "Ultra Uppercut-GX",
        "cost": [
          "Lightning",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "240",
        "text": "(You can't use more than 1 GX attack in a game.)"
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
      784
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/100.png",
      "large": "https://images.pokemontcg.io/sm2/100_hires.png"
    }
  },
  {
    "id": "sm2-101",
    "name": "Chansey",
    "number": "101",
    "artist": "Megumi Mizutani",
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
        "name": "Bind Wound",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip a coin. If heads, heal 30 damage from 1 of your Pokémon."
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
      113
    ],
    "flavorText": "The eggs laid by Chansey are rich in nutrients and a favorite food of many Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/101.png",
      "large": "https://images.pokemontcg.io/sm2/101_hires.png"
    }
  },
  {
    "id": "sm2-102",
    "name": "Blissey",
    "number": "102",
    "artist": "Hideki Ishikawa",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "160",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Chansey",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fresh Egg",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may heal 80 damage from your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Double-Edge",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "160",
        "text": "This Pokémon does 80 damage to itself."
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
    "flavorText": "Even the most ferocious Pokémon become calm when they eat Blissey's egg, which is said to be filled with happiness.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/102.png",
      "large": "https://images.pokemontcg.io/sm2/102_hires.png"
    }
  },
  {
    "id": "sm2-103",
    "name": "Taillow",
    "number": "103",
    "artist": "Ayaka Yoshida",
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
      "Swellow"
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
    "flavorText": "It has a gutsy spirit that makes it bravely take on tough foes. It flies in search of warm climates.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/103.png",
      "large": "https://images.pokemontcg.io/sm2/103_hires.png"
    }
  },
  {
    "id": "sm2-104",
    "name": "Swellow",
    "number": "104",
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
    "evolvesFrom": "Taillow",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Agility",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn."
      },
      {
        "name": "Swallow Dive",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40+",
        "text": "If this Pokémon used Agility during your last turn, this attack does 80 more damage."
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
    "flavorText": "If its two tail feathers are standing at attention, it is proof of good health. It soars elegantly in the sky.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/104.png",
      "large": "https://images.pokemontcg.io/sm2/104_hires.png"
    }
  },
  {
    "id": "sm2-105",
    "name": "Castform",
    "number": "105",
    "artist": "sui",
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
        "name": "Weather Teller",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Stadium cards, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Water Pulse",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Asleep."
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
      351
    ],
    "flavorText": "It changes its form depending on the weather. Changes in the temperature or humidity appear to affect its cellular structure.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/105.png",
      "large": "https://images.pokemontcg.io/sm2/105_hires.png"
    }
  },
  {
    "id": "sm2-106",
    "name": "Rayquaza",
    "number": "106",
    "artist": "Yoshinobu Saito",
    "rarity": "Rare",
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
        "name": "Turbo Storm",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Attach 2 basic Energy cards from your discard pile to 1 of your Benched Pokémon."
      },
      {
        "name": "Dragon Claw",
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
    "flavorText": "It lives in the ozone layer far above the clouds and cannot be seen from the ground.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/106.png",
      "large": "https://images.pokemontcg.io/sm2/106_hires.png"
    }
  },
  {
    "id": "sm2-107",
    "name": "Patrat",
    "number": "107",
    "artist": "Ayaka Yoshida",
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
      "Watchog"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Glance",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top card of your opponent's deck."
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
      504
    ],
    "flavorText": "Using food stored in cheek pouches, they can keep watch for days. They use their tails to communicate with others.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/107.png",
      "large": "https://images.pokemontcg.io/sm2/107_hires.png"
    }
  },
  {
    "id": "sm2-108",
    "name": "Watchog",
    "number": "108",
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
    "evolvesFrom": "Patrat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scrutinize",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 2 cards of your opponent's deck, discard 1 of them, and put the other card back."
      },
      {
        "name": "Slam",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60×",
        "text": "Flip 2 coins. This attack does 60 damage for each heads."
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
      "small": "https://images.pokemontcg.io/sm2/108.png",
      "large": "https://images.pokemontcg.io/sm2/108_hires.png"
    }
  },
  {
    "id": "sm2-109",
    "name": "Fletchling",
    "number": "109",
    "artist": "You Iribi",
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
      "Fletchinder"
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
    "flavorText": "This amiable Pokémon is easy to train. But when battle is joined, it shows its ferocious side.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/109.png",
      "large": "https://images.pokemontcg.io/sm2/109_hires.png"
    }
  },
  {
    "id": "sm2-110",
    "name": "Fletchinder",
    "number": "110",
    "artist": "kawayoo",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Fletchling",
    "evolvesTo": [
      "Talonflame"
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
      },
      {
        "name": "Razor Wind",
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
      662
    ],
    "flavorText": "From its beak, it fires embers at its prey. Once it has caught them, it grills them at high heat before feasting upon them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/110.png",
      "large": "https://images.pokemontcg.io/sm2/110_hires.png"
    }
  },
  {
    "id": "sm2-111",
    "name": "Talonflame",
    "number": "111",
    "artist": "Shin Nagasawa",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Fletchinder",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flame Charge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Search your deck for a Fire Energy card and attach it to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Loop-the-Loop",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90",
        "text": "Put all Energy attached to this Pokémon into your hand."
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
      663
    ],
    "flavorText": "Its favorite foods are Wingull and Pikipek. It attacks with a powerful kick and grasps them firmly in its talons.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/111.png",
      "large": "https://images.pokemontcg.io/sm2/111_hires.png"
    }
  },
  {
    "id": "sm2-112",
    "name": "Stufful",
    "number": "112",
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
      "Bewear"
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
        "name": "Hammer In",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      759
    ],
    "flavorText": "Despite its adorable appearance, when it gets angry and flails about, its arms and legs could knock a pro wrestler sprawling.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/112.png",
      "large": "https://images.pokemontcg.io/sm2/112_hires.png"
    }
  },
  {
    "id": "sm2-113",
    "name": "Bewear",
    "number": "113",
    "artist": "Shin Nagasawa",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Stufful",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Rake It In",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may draw 3 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dangerous Blow",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "If your opponent's Active Pokémon is a Basic Pokémon, this attack does 60 more damage."
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
      760
    ],
    "flavorText": "This immensely dangerous Pokémon possesses overwhelming physical strength. Its habitat is generally off-limits.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/113.png",
      "large": "https://images.pokemontcg.io/sm2/113_hires.png"
    }
  },
  {
    "id": "sm2-114",
    "name": "Komala",
    "number": "114",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Comatose",
        "text": "As long as this Pokémon is your Active Pokémon, whenever you attach an Energy from your hand to it, it is now Asleep.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hypno Roll",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "This attack can be used if this Pokémon is Asleep. If it is not Asleep, this attack does nothing."
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
      775
    ],
    "flavorText": "It is born asleep, and it dies asleep. All its movements are apparently no more than the results of it tossing and turning in its dreams.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/114.png",
      "large": "https://images.pokemontcg.io/sm2/114_hires.png"
    }
  },
  {
    "id": "sm2-115",
    "name": "Drampa-GX",
    "number": "115",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "180",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Righteous Edge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Discard a Special Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Berserk",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If your Benched Pokémon have any damage counters on them, this attack does 70 more damage."
      },
      {
        "name": "Big Wheel-GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Shuffle your hand into your deck. Then, draw 10 cards. (You can't use more than 1 GX attack in a game.)"
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
      780
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/115.png",
      "large": "https://images.pokemontcg.io/sm2/115_hires.png"
    }
  },
  {
    "id": "sm2-116",
    "name": "Aether Paradise Conservation Area",
    "number": "116",
    "artist": "5ban Graphics",
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
      "Basic Grass and Basic Lightning Pokémon (both yours and your opponent's) take 30 less damage from the opponent's attacks (after applying Weakness and Resistance).",
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
      "small": "https://images.pokemontcg.io/sm2/116.png",
      "large": "https://images.pokemontcg.io/sm2/116_hires.png"
    }
  },
  {
    "id": "sm2-117",
    "name": "Altar of the Moone",
    "number": "117",
    "artist": "5ban Graphics",
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
      "The Retreat Cost of each Pokémon (both yours and your opponent's) that has any Psychic or Darkness Energy attached to it is ColorlessColorless less.",
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
      "small": "https://images.pokemontcg.io/sm2/117.png",
      "large": "https://images.pokemontcg.io/sm2/117_hires.png"
    }
  },
  {
    "id": "sm2-118",
    "name": "Altar of the Sunne",
    "number": "118",
    "artist": "5ban Graphics",
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
      "Fire Pokémon and Metal Pokémon (both yours and your opponent's) have no Weakness.",
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
      "small": "https://images.pokemontcg.io/sm2/118.png",
      "large": "https://images.pokemontcg.io/sm2/118_hires.png"
    }
  },
  {
    "id": "sm2-119",
    "name": "Aqua Patch",
    "number": "119",
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
      "Attach a Water Energy card from your discard pile to 1 of your Benched Water Pokémon.",
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
      "small": "https://images.pokemontcg.io/sm2/119.png",
      "large": "https://images.pokemontcg.io/sm2/119_hires.png"
    }
  },
  {
    "id": "sm2-120",
    "name": "Brooklet Hill",
    "number": "120",
    "artist": "5ban Graphics",
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
      "Once during each player's turn, that player may search their deck for a Basic Water Pokémon or Basic Fighting Pokémon and, put it onto their Bench, and shuffle their deck.",
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
      "small": "https://images.pokemontcg.io/sm2/120.png",
      "large": "https://images.pokemontcg.io/sm2/120_hires.png"
    }
  },
  {
    "id": "sm2-121",
    "name": "Choice Band",
    "number": "121",
    "artist": "Eske Yoshinob",
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
      "The attacks of the Pokémon this card is attached to do 30 more damage to your opponent's Active Pokémon-GX or Active Pokémon-EX (before applying Weakness and Resistance).",
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
      "small": "https://images.pokemontcg.io/sm2/121.png",
      "large": "https://images.pokemontcg.io/sm2/121_hires.png"
    }
  },
  {
    "id": "sm2-121a",
    "name": "Choice Band",
    "number": "121a",
    "artist": "Eske Yoshinob",
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
      "The attacks of the Pokémon this card is attached to do 30 more damage to your opponent's Active Pokémon-GX or Active Pokémon-EX (before applying Weakness and Resistance).",
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
      "small": "https://images.pokemontcg.io/sm2/121a.png",
      "large": "https://images.pokemontcg.io/sm2/121a_hires.png"
    }
  },
  {
    "id": "sm2-122",
    "name": "Energy Loto",
    "number": "122",
    "artist": "Yoshinobu Saito",
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
      "Look at the top 7 cards of your deck. You may reveal an Energy card you find there and put it into your hand. Shuffle the other cards back into your deck.",
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
      "small": "https://images.pokemontcg.io/sm2/122.png",
      "large": "https://images.pokemontcg.io/sm2/122_hires.png"
    }
  },
  {
    "id": "sm2-123",
    "name": "Energy Recycler",
    "number": "123",
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
      "Shuffle 5 basic Energy cards from your discard pile into your deck.",
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
      "small": "https://images.pokemontcg.io/sm2/123.png",
      "large": "https://images.pokemontcg.io/sm2/123_hires.png"
    }
  },
  {
    "id": "sm2-124",
    "name": "Enhanced Hammer",
    "number": "124",
    "artist": "Yoshinobu Saito",
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
      "Discard a Special Energy from 1 of your opponent's Pokémon.",
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
      "small": "https://images.pokemontcg.io/sm2/124.png",
      "large": "https://images.pokemontcg.io/sm2/124_hires.png"
    }
  },
  {
    "id": "sm2-124a",
    "name": "Enhanced Hammer",
    "number": "124a",
    "artist": "Yoshinobu Saito",
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
      "Discard a Special Energy from 1 of your opponent's Pokémon.",
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
      "small": "https://images.pokemontcg.io/sm2/124a.png",
      "large": "https://images.pokemontcg.io/sm2/124a_hires.png"
    }
  },
  {
    "id": "sm2-125",
    "name": "Field Blower",
    "number": "125",
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
      "Choose up to 2 in any combination of Pokémon Tool cards and Stadium cards in play (yours or your opponent's) and discard them.",
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
      "small": "https://images.pokemontcg.io/sm2/125.png",
      "large": "https://images.pokemontcg.io/sm2/125_hires.png"
    }
  },
  {
    "id": "sm2-125a",
    "name": "Field Blower",
    "number": "125a",
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
      "Choose up to 2 in any combination of Pokémon Tool cards and Stadium cards in play (yours or your opponent's) and discard them.",
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
      "small": "https://images.pokemontcg.io/sm2/125a.png",
      "large": "https://images.pokemontcg.io/sm2/125a_hires.png"
    }
  },
  {
    "id": "sm2-126",
    "name": "Hala",
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
      "Shuffle your hand into your deck. If you have used your GX attack, draw 7 cards. If not, draw 4 cards.",
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
      "small": "https://images.pokemontcg.io/sm2/126.png",
      "large": "https://images.pokemontcg.io/sm2/126_hires.png"
    }
  },
  {
    "id": "sm2-127",
    "name": "Mallow",
    "number": "127",
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
      "Search your deck for 2 cards, shuffle your deck, and put those cards on top of your deck in any order.",
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
      "small": "https://images.pokemontcg.io/sm2/127.png",
      "large": "https://images.pokemontcg.io/sm2/127_hires.png"
    }
  },
  {
    "id": "sm2-128",
    "name": "Max Potion",
    "number": "128",
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
      "Heal all damage from 1 of your Pokémon. If you do, discard all Energy from that Pokémon.",
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
      "small": "https://images.pokemontcg.io/sm2/128.png",
      "large": "https://images.pokemontcg.io/sm2/128_hires.png"
    }
  },
  {
    "id": "sm2-128a",
    "name": "Max Potion",
    "number": "128a",
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
      "Heal all damage from 1 of your Pokémon. If you do, discard all Energy from that Pokémon.",
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
      "small": "https://images.pokemontcg.io/sm2/128a.png",
      "large": "https://images.pokemontcg.io/sm2/128a_hires.png"
    }
  },
  {
    "id": "sm2-129",
    "name": "Multi Switch",
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
      "Move an Energy from 1 of your Benched Pokémon to your Active Pokémon.",
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
      "small": "https://images.pokemontcg.io/sm2/129.png",
      "large": "https://images.pokemontcg.io/sm2/129_hires.png"
    }
  },
  {
    "id": "sm2-130",
    "name": "Rescue Stretcher",
    "number": "130",
    "artist": "Yoshinobu Saito",
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
      "Choose 1:\n• Put a Pokémon from your discard pile into your hand.\n• Shuffle 3 Pokémon from your discard pile into your deck.",
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
      "small": "https://images.pokemontcg.io/sm2/130.png",
      "large": "https://images.pokemontcg.io/sm2/130_hires.png"
    }
  },
  {
    "id": "sm2-130a",
    "name": "Rescue Stretcher",
    "number": "130a",
    "artist": "Yoshinobu Saito",
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
      "Choose 1:\n• Put a Pokémon from your discard pile into your hand.\n• Shuffle 3 Pokémon from your discard pile into your deck.",
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
      "small": "https://images.pokemontcg.io/sm2/130a.png",
      "large": "https://images.pokemontcg.io/sm2/130a_hires.png"
    }
  },
  {
    "id": "sm2-131",
    "name": "Turtonator-GX",
    "number": "131",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "190",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Shell Trap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "During your opponent's next turn, if this Pokémon is damaged by an attack (even if this Pokémon is Knocked Out), put 8 damage counters on the Attacking Pokémon."
      },
      {
        "name": "Bright Flame",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Discard 2 Fire Energy from this Pokémon."
      },
      {
        "name": "Nitro Tank-GX",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach 5 Fire Energy cards from your discard pile to your Pokémon in any way you like. (You can't use more than 1 GX attack in a game.)"
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
      776
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/131.png",
      "large": "https://images.pokemontcg.io/sm2/131_hires.png"
    }
  },
  {
    "id": "sm2-132",
    "name": "Alolan Ninetales-GX",
    "number": "132",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "210",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Alolan Vulpix",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Ice Blade",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 50 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Blizzard Edge",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Discard 2 Energy from this Pokémon."
      },
      {
        "name": "Ice Path-GX",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Move all damage counters from this Pokémon to your opponent's Active Pokémon. (You can't use more than 1 GX attack in a game.)"
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
      38
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/132.png",
      "large": "https://images.pokemontcg.io/sm2/132_hires.png"
    }
  },
  {
    "id": "sm2-133",
    "name": "Wishiwashi-GX",
    "number": "133",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "210",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
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
      },
      {
        "name": "Torrential Vortex",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "120",
        "text": "Discard a Special Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Blue Surge-GX",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "220",
        "text": "Move all Energy from this Pokémon to your Benched Pokémon in any way you like. (You can't use more than 1 GX attack in a game.)"
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
      746
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/133.png",
      "large": "https://images.pokemontcg.io/sm2/133_hires.png"
    }
  },
  {
    "id": "sm2-134",
    "name": "Vikavolt-GX",
    "number": "134",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "240",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Charjabug",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Charge Beam",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "Attach an Energy card from your discard pile to this Pokémon."
      },
      {
        "name": "Super Zap Cannon",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "Discard 2 Energy from this Pokémon."
      },
      {
        "name": "Gigatron-GX",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "",
        "text": "This attack does 60 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) (You can't use more than 1 GX attack in a game.)"
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
      738
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/134.png",
      "large": "https://images.pokemontcg.io/sm2/134_hires.png"
    }
  },
  {
    "id": "sm2-135",
    "name": "Tapu Koko-GX",
    "number": "135",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "170",
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
        "name": "Aero Trail",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may move any number of Lightning Energy from your other Pokémon to this Pokémon. If you do, switch this Pokémon with your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Sky-High Claws",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": ""
      },
      {
        "name": "Tapu Thunder-GX",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50×",
        "text": "This attack does 50 damage times the amount of Energy attached to all of your opponent's Pokémon. (You can't use more than 1 GX attack in a game.)"
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
      785
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/135.png",
      "large": "https://images.pokemontcg.io/sm2/135_hires.png"
    }
  },
  {
    "id": "sm2-136",
    "name": "Toxapex-GX",
    "number": "136",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "210",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Mareanie",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Spike Cannon",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30×",
        "text": "Flip 4 coins. This attack does 30 damage for each heads."
      },
      {
        "name": "Super Intense Poison",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Poisoned. Put 10 damage counters instead of 1 on that Pokémon between turns."
      },
      {
        "name": "Total Shelter-GX",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn. (You can't use more than 1 GX attack in a game.)"
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
      748
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/136.png",
      "large": "https://images.pokemontcg.io/sm2/136_hires.png"
    }
  },
  {
    "id": "sm2-137",
    "name": "Tapu Lele-GX",
    "number": "137",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
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
      "small": "https://images.pokemontcg.io/sm2/137.png",
      "large": "https://images.pokemontcg.io/sm2/137_hires.png"
    }
  },
  {
    "id": "sm2-138",
    "name": "Lycanroc-GX",
    "number": "138",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Rockruff",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Bloodthirsty Eyes",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may switch 1 of your opponent's Benched Pokémon with their Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Claw Slash",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": ""
      },
      {
        "name": "Dangerous Rogue-GX",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50×",
        "text": "This attack does 50 damage for each of your opponent's Benched Pokémon. (You can't use more than 1 GX attack in a game.)"
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
      745
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/138.png",
      "large": "https://images.pokemontcg.io/sm2/138_hires.png"
    }
  },
  {
    "id": "sm2-139",
    "name": "Metagross-GX",
    "number": "139",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Metang",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Geotech System",
        "text": "Once during your turn (before your attack), you may attach a Psychic or Metal Energy card from your discard pile to your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Giga Hammer",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "This Pokémon can't use Giga Hammer during your next turn."
      },
      {
        "name": "Algorithm-GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 5 cards and put them into your hand. Then, shuffle your deck. (You can't use more than 1 GX attack in a game.)"
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
      376
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/139.png",
      "large": "https://images.pokemontcg.io/sm2/139_hires.png"
    }
  },
  {
    "id": "sm2-140",
    "name": "Sylveon-GX",
    "number": "140",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Magical Ribbon",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 cards and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Fairy Wind",
        "cost": [
          "Fairy",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": ""
      },
      {
        "name": "Plea-GX",
        "cost": [
          "Fairy",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Put 2 of your opponent's Benched Pokémon and all cards attached to them into your opponent's hand. (You can't use more than 1 GX attack in a game.)"
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
      700
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/140.png",
      "large": "https://images.pokemontcg.io/sm2/140_hires.png"
    }
  },
  {
    "id": "sm2-141",
    "name": "Kommo-o-GX",
    "number": "141",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "240",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Hakamo-o",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Adamantine Press",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Shred",
        "cost": [
          "Lightning",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "130",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      },
      {
        "name": "Ultra Uppercut-GX",
        "cost": [
          "Lightning",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "240",
        "text": "(You can't use more than 1 GX attack in a game.)"
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
      784
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/141.png",
      "large": "https://images.pokemontcg.io/sm2/141_hires.png"
    }
  },
  {
    "id": "sm2-142",
    "name": "Drampa-GX",
    "number": "142",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "180",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Righteous Edge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Discard a Special Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Berserk",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If your Benched Pokémon have any damage counters on them, this attack does 70 more damage."
      },
      {
        "name": "Big Wheel-GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Shuffle your hand into your deck. Then, draw 10 cards. (You can't use more than 1 GX attack in a game.)"
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
      780
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/142.png",
      "large": "https://images.pokemontcg.io/sm2/142_hires.png"
    }
  },
  {
    "id": "sm2-143",
    "name": "Hala",
    "number": "143",
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
      "Shuffle your hand into your deck. If you have used your GX attack, draw 7 cards. If not, draw 4 cards.",
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
      "small": "https://images.pokemontcg.io/sm2/143.png",
      "large": "https://images.pokemontcg.io/sm2/143_hires.png"
    }
  },
  {
    "id": "sm2-144",
    "name": "Hau",
    "number": "144",
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
      "Draw 3 cards.",
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
      "small": "https://images.pokemontcg.io/sm2/144.png",
      "large": "https://images.pokemontcg.io/sm2/144_hires.png"
    }
  },
  {
    "id": "sm2-145",
    "name": "Mallow",
    "number": "145",
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
      "Search your deck for 2 cards, shuffle your deck, then put those cards on top of it in any order.",
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
      "small": "https://images.pokemontcg.io/sm2/145.png",
      "large": "https://images.pokemontcg.io/sm2/145_hires.png"
    }
  },
  {
    "id": "sm2-146",
    "name": "Decidueye-GX",
    "number": "146",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "240",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Dartrix",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Feather Arrow",
        "text": "Once during your turn (before your attack), you may put 2 damage counters on 1 of your opponent's Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Razor Leaf",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": ""
      },
      {
        "name": "Hollow Hunt-GX",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put 3 cards from your discard pile into your hand. (You can't use more than 1 GX attack in a game.)"
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
      724
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/146.png",
      "large": "https://images.pokemontcg.io/sm2/146_hires.png"
    }
  },
  {
    "id": "sm2-147",
    "name": "Incineroar-GX",
    "number": "147",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Torracat",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Hustling Strike",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "This attack does 20 more damage for each of your Benched Fire Pokémon."
      },
      {
        "name": "Tiger Swing",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "Flip 2 coins. This attack does 50 more damage for each heads."
      },
      {
        "name": "Burning Slam-GX",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "Your opponent's Active Pokémon is now Burned. (You can't use more than 1 GX attack in a game.)"
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
      727
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/147.png",
      "large": "https://images.pokemontcg.io/sm2/147_hires.png"
    }
  },
  {
    "id": "sm2-148",
    "name": "Turtonator-GX",
    "number": "148",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "190",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Shell Trap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "During your opponent's next turn, if this Pokémon is damaged by an attack (even if this Pokémon is Knocked Out), put 8 damage counters on the Attacking Pokémon."
      },
      {
        "name": "Bright Flame",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Discard 2 Fire Energy from this Pokémon."
      },
      {
        "name": "Nitro Tank-GX",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach 5 Fire Energy cards from your discard pile to your Pokémon in any way you like. (You can't use more than 1 GX attack in a game.)"
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
      776
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/148.png",
      "large": "https://images.pokemontcg.io/sm2/148_hires.png"
    }
  },
  {
    "id": "sm2-149",
    "name": "Primarina-GX",
    "number": "149",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Brionne",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Bubble Beat",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "This attack does 20 more damage times the amount of Water Energy attached to your Pokémon."
      },
      {
        "name": "Roaring Seas",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120",
        "text": "Discard an Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Grand Echo-GX",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Heal all damage from all of your Pokémon. (You can't use more than 1 GX attack in a game.)"
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
      730
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/149.png",
      "large": "https://images.pokemontcg.io/sm2/149_hires.png"
    }
  },
  {
    "id": "sm2-150",
    "name": "Alolan Ninetales-GX",
    "number": "150",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "210",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Alolan Vulpix",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Ice Blade",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 50 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Blizzard Edge",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Discard 2 Energy from this Pokémon."
      },
      {
        "name": "Ice Path-GX",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Move all damage counters from this Pokémon to your opponent's Active Pokémon. (You can't use more than 1 GX attack in a game.)"
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
      38
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/150.png",
      "large": "https://images.pokemontcg.io/sm2/150_hires.png"
    }
  },
  {
    "id": "sm2-151",
    "name": "Wishiwashi-GX",
    "number": "151",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "210",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
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
      },
      {
        "name": "Torrential Vortex",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "120",
        "text": "Discard a Special Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Blue Surge-GX",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "220",
        "text": "Move all Energy from this Pokémon to your Benched Pokémon in any way you like. (You can't use more than 1 GX attack in a game.)"
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
      746
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/151.png",
      "large": "https://images.pokemontcg.io/sm2/151_hires.png"
    }
  },
  {
    "id": "sm2-152",
    "name": "Vikavolt-GX",
    "number": "152",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "240",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Charjabug",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Charge Beam",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "Attach an Energy card from your discard pile to this Pokémon."
      },
      {
        "name": "Super Zap Cannon",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "Discard 2 Energy from this Pokémon."
      },
      {
        "name": "Gigatron-GX",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "",
        "text": "This attack does 60 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) (You can't use more than 1 GX attack in a game.)"
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
      738
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/152.png",
      "large": "https://images.pokemontcg.io/sm2/152_hires.png"
    }
  },
  {
    "id": "sm2-153",
    "name": "Tapu Koko-GX",
    "number": "153",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "170",
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
        "name": "Aero Trail",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may move any number of Lightning Energy from your other Pokémon to this Pokémon. If you do, switch this Pokémon with your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Sky-High Claws",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": ""
      },
      {
        "name": "Tapu Thunder-GX",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50×",
        "text": "This attack does 50 damage times the amount of Energy attached to all of your opponent's Pokémon. (You can't use more than 1 GX attack in a game.)"
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
      785
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/153.png",
      "large": "https://images.pokemontcg.io/sm2/153_hires.png"
    }
  },
  {
    "id": "sm2-154",
    "name": "Toxapex-GX",
    "number": "154",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "210",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Mareanie",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Spike Cannon",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30×",
        "text": "Flip 4 coins. This attack does 30 damage for each heads."
      },
      {
        "name": "Super Intense Poison",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Poisoned. Put 10 damage counters instead of 1 on that Pokémon between turns."
      },
      {
        "name": "Total Shelter-GX",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Prevent all effects of attacks, including damage, done to this Pokémon during your opponent's next turn. (You can't use more than 1 GX attack in a game.)"
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
      748
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/154.png",
      "large": "https://images.pokemontcg.io/sm2/154_hires.png"
    }
  },
  {
    "id": "sm2-155",
    "name": "Tapu Lele-GX",
    "number": "155",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
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
      "small": "https://images.pokemontcg.io/sm2/155.png",
      "large": "https://images.pokemontcg.io/sm2/155_hires.png"
    }
  },
  {
    "id": "sm2-156",
    "name": "Lycanroc-GX",
    "number": "156",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Rockruff",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Bloodthirsty Eyes",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may switch 1 of your opponent's Benched Pokémon with their Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Claw Slash",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": ""
      },
      {
        "name": "Dangerous Rogue-GX",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50×",
        "text": "This attack does 50 damage for each of your opponent's Benched Pokémon. (You can't use more than 1 GX attack in a game.)"
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
      745
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/156.png",
      "large": "https://images.pokemontcg.io/sm2/156_hires.png"
    }
  },
  {
    "id": "sm2-157",
    "name": "Metagross-GX",
    "number": "157",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Metang",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Geotech System",
        "text": "Once during your turn (before your attack), you may attach a Psychic or Metal Energy card from your discard pile to your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Giga Hammer",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "This Pokémon can't use Giga Hammer during your next turn."
      },
      {
        "name": "Algorithm-GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 5 cards and put them into your hand. Then, shuffle your deck. (You can't use more than 1 GX attack in a game.)"
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
      376
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/157.png",
      "large": "https://images.pokemontcg.io/sm2/157_hires.png"
    }
  },
  {
    "id": "sm2-157a",
    "name": "Metagross-GX",
    "number": "157a",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Metang",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Geotech System",
        "text": "Once during your turn (before your attack), you may attach a Psychic or Metal Energy card from your discard pile to your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Giga Hammer",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "This Pokémon can't use Giga Hammer during your next turn."
      },
      {
        "name": "Algorithm-GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 5 cards and put them into your hand. Then, shuffle your deck. (You can't use more than 1 GX attack in a game.)"
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
      376
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/157a.png",
      "large": "https://images.pokemontcg.io/sm2/157a_hires.png"
    }
  },
  {
    "id": "sm2-158",
    "name": "Sylveon-GX",
    "number": "158",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Magical Ribbon",
        "cost": [
          "Fairy"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 cards and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Fairy Wind",
        "cost": [
          "Fairy",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": ""
      },
      {
        "name": "Plea-GX",
        "cost": [
          "Fairy",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Put 2 of your opponent's Benched Pokémon and all cards attached to them into your opponent's hand. (You can't use more than 1 GX attack in a game.)"
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
      700
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/158.png",
      "large": "https://images.pokemontcg.io/sm2/158_hires.png"
    }
  },
  {
    "id": "sm2-159",
    "name": "Kommo-o-GX",
    "number": "159",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "240",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Hakamo-o",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Adamantine Press",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Shred",
        "cost": [
          "Lightning",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "130",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      },
      {
        "name": "Ultra Uppercut-GX",
        "cost": [
          "Lightning",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "240",
        "text": "(You can't use more than 1 GX attack in a game.)"
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
      784
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/159.png",
      "large": "https://images.pokemontcg.io/sm2/159_hires.png"
    }
  },
  {
    "id": "sm2-160",
    "name": "Drampa-GX",
    "number": "160",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "180",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Righteous Edge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Discard a Special Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Berserk",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If your Benched Pokémon have any damage counters on them, this attack does 70 more damage."
      },
      {
        "name": "Big Wheel-GX",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Shuffle your hand into your deck. Then, draw 10 cards. (You can't use more than 1 GX attack in a game.)"
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
      780
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm2/160.png",
      "large": "https://images.pokemontcg.io/sm2/160_hires.png"
    }
  },
  {
    "id": "sm2-161",
    "name": "Aqua Patch",
    "number": "161",
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
      "Attach a Water Energy card from your discard pile to 1 of your Benched Water Pokémon.",
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
      "small": "https://images.pokemontcg.io/sm2/161.png",
      "large": "https://images.pokemontcg.io/sm2/161_hires.png"
    }
  },
  {
    "id": "sm2-162",
    "name": "Enhanced Hammer",
    "number": "162",
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
      "Discard a Special Energy from 1 of your opponent's Pokémon.",
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
      "small": "https://images.pokemontcg.io/sm2/162.png",
      "large": "https://images.pokemontcg.io/sm2/162_hires.png"
    }
  },
  {
    "id": "sm2-163",
    "name": "Field Blower",
    "number": "163",
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
      "Choose up to 2 in any combination of Pokémon Tool cards and Stadium cards in play (yours or your opponent's) and discard them.",
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
      "small": "https://images.pokemontcg.io/sm2/163.png",
      "large": "https://images.pokemontcg.io/sm2/163_hires.png"
    }
  },
  {
    "id": "sm2-164",
    "name": "Max Potion",
    "number": "164",
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
      "Heal all damage from 1 of your Pokémon. If you do, discard all Energy from that Pokémon.",
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
      "small": "https://images.pokemontcg.io/sm2/164.png",
      "large": "https://images.pokemontcg.io/sm2/164_hires.png"
    }
  },
  {
    "id": "sm2-165",
    "name": "Rare Candy",
    "number": "165",
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
      "Choose 1 of your Basic Pokémon in play. If you have a Stage 2 card in your hand that evolves from that Pokémon, put that card onto the Basic Pokémon to evolve it. You can't use this card during your first turn or on a Basic Pokémon that was put into play this turn.",
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
      "small": "https://images.pokemontcg.io/sm2/165.png",
      "large": "https://images.pokemontcg.io/sm2/165_hires.png"
    }
  },
  {
    "id": "sm2-166",
    "name": "Double Colorless Energy",
    "number": "166",
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
      "Double Colorless Energy provides ColorlessColorless Energy."
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
      "small": "https://images.pokemontcg.io/sm2/166.png",
      "large": "https://images.pokemontcg.io/sm2/166_hires.png"
    }
  },
  {
    "id": "sm2-167",
    "name": "Grass Energy",
    "number": "167",
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
      "small": "https://images.pokemontcg.io/sm2/167.png",
      "large": "https://images.pokemontcg.io/sm2/167_hires.png"
    }
  },
  {
    "id": "sm2-168",
    "name": "Lightning Energy",
    "number": "168",
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
      "small": "https://images.pokemontcg.io/sm2/168.png",
      "large": "https://images.pokemontcg.io/sm2/168_hires.png"
    }
  },
  {
    "id": "sm2-169",
    "name": "Fighting Energy",
    "number": "169",
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
      "small": "https://images.pokemontcg.io/sm2/169.png",
      "large": "https://images.pokemontcg.io/sm2/169_hires.png"
    }
  }
]

export default cardDetails
