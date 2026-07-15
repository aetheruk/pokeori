import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "pop6-1",
    "name": "Bastiodon",
    "number": "1",
    "artist": "Kazuyuki Kano",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Shieldon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Protective Wall",
        "text": "Prevent all damage done to your Benched Pokémon by your opponent's attacks.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Anger Revenge",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "If Bastiodon was damaged by an attack during your opponent's last turn, this attack does 40 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "+40"
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
    "flavorText": "Any frontal attack is repulsed. It is a docile Pokémon that feeds on grass and berries.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/1.png",
      "large": "https://images.pokemontcg.io/pop6/1_hires.png"
    }
  },
  {
    "id": "pop6-2",
    "name": "Lucario",
    "number": "2",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
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
        "name": "Feint",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This attack's damage isn't affected by Resistance."
      },
      {
        "name": "Aura Sphere",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      448
    ],
    "flavorText": "It has the ability to sense the auras of all things. It understands human speech.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/2.png",
      "large": "https://images.pokemontcg.io/pop6/2_hires.png"
    }
  },
  {
    "id": "pop6-3",
    "name": "Manaphy",
    "number": "3",
    "artist": "Atsuko Nishida",
    "rarity": "Rare",
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
        "name": "Call for Family",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Basic Pokémon and put it onto your Bench. Shuffle your deck afterward."
      },
      {
        "name": "Aqua Ring",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Switch Manaphy with 1 of your Benched Pokémon."
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      490
    ],
    "flavorText": "Born on a cold seafloor, it will swim great distances to return to its birthplace.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/3.png",
      "large": "https://images.pokemontcg.io/pop6/3_hires.png"
    }
  },
  {
    "id": "pop6-4",
    "name": "Pachirisu",
    "number": "4",
    "artist": "Atsuko Nishida",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Minor Errand-Running",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a basic Energy card, show it to your opponent, and put it into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Thunder Jolt",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If tails, Pachirisu does 10 damage to itself."
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
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      417
    ],
    "flavorText": "It makes fur balls that crackle with static electricity. It stores them with berries in tree holes.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/4.png",
      "large": "https://images.pokemontcg.io/pop6/4_hires.png"
    }
  },
  {
    "id": "pop6-5",
    "name": "Rampardos",
    "number": "5",
    "artist": "Kazuyuki Kano",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Cranidos",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Assurance",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "As long as the Defending Pokémon's remaining HP is 60 or less, this attack's base damage is 60 instead of 30."
      },
      {
        "name": "Hasty Headbutt",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "Rampardos does 20 damage to itself. This attack's damage isn't affected by Weakness, Resistance, Poké-Powers, Poké-Bodies, or any other effects on the Defending Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "+30"
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
    "flavorText": "Its powerful head butt has enough power to shatter even the most durable things upon impact.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/5.png",
      "large": "https://images.pokemontcg.io/pop6/5_hires.png"
    }
  },
  {
    "id": "pop6-6",
    "name": "Drifloon",
    "number": "6",
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
      "Drifblim"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Blowing Wind",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, put 1 of your Benched Pokémon and all cards attached to it on top of your deck. Shuffle your deck afterward."
      },
      {
        "name": "Ominous Wind",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused and can't retreat during your opponent's next turn."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "+10"
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
      425
    ],
    "flavorText": "A Pokémon formed by the spirits of people and Pokémon. It loves damp, humid seasons.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/6.png",
      "large": "https://images.pokemontcg.io/pop6/6_hires.png"
    }
  },
  {
    "id": "pop6-7",
    "name": "Gible",
    "number": "7",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
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
      "Gabite"
    ],
    "rules": [
      "Oran Berry: Remove 1 damage counter from Gible at the end of your turn."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Surprise Attack",
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
        "type": "Colorless",
        "value": "+10"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      443
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/7.png",
      "large": "https://images.pokemontcg.io/pop6/7_hires.png"
    }
  },
  {
    "id": "pop6-8",
    "name": "Riolu",
    "number": "8",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
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
        "name": "Wild Kick",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
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
      447
    ],
    "flavorText": "The aura that emanates from its body intensifies to alert others if it is afraid or sad.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/8.png",
      "large": "https://images.pokemontcg.io/pop6/8_hires.png"
    }
  },
  {
    "id": "pop6-9",
    "name": "Pikachu",
    "number": "9",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
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
    "rules": [
      "Oran Berry: Remove 1 damage counter from Pikachu at the end of your turn."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Spark",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Does 10 damage to 2 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "+10"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/9.png",
      "large": "https://images.pokemontcg.io/pop6/9_hires.png"
    }
  },
  {
    "id": "pop6-10",
    "name": "Staravia",
    "number": "10",
    "artist": "Masakazu Fukuda",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Starly",
    "evolvesTo": [
      "Staraptor"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Whirlwind",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon."
      },
      {
        "name": "Clutch",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
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
        "type": "Fighting",
        "value": "-20"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      397
    ],
    "flavorText": "It flies around forests and fields in search of bug Pokémon. It stays within a huge flock.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/10.png",
      "large": "https://images.pokemontcg.io/pop6/10_hires.png"
    }
  },
  {
    "id": "pop6-11",
    "name": "Bidoof",
    "number": "11",
    "artist": "Mitsuhiro Arita",
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
      "Bibarel"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Amnesia",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 1 of the Defending Pokémon's attacks. That Pokémon can't use that attack during your opponent's next turn."
      },
      {
        "name": "Scavenge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your discard pile for a Trainer card, show it to your opponent, an put it into your hand."
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
      399
    ],
    "flavorText": "With nerves of steel, nothing can perturb it. It is more agile and active than it appears.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/11.png",
      "large": "https://images.pokemontcg.io/pop6/11_hires.png"
    }
  },
  {
    "id": "pop6-12",
    "name": "Buneary",
    "number": "12",
    "artist": "Kagemaru Himeno",
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
      "Lopunny"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Splash",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Jump Kick",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Does 10 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      427
    ],
    "flavorText": "It slams foes by sharply uncoiling is rolled ears. It stings enough to make a grown-up cry in pain.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/12.png",
      "large": "https://images.pokemontcg.io/pop6/12_hires.png"
    }
  },
  {
    "id": "pop6-13",
    "name": "Cherubi",
    "number": "13",
    "artist": "Atsuko Nishida",
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
      "Cherrim"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sleep Powder",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Leech Seed",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "If this attack does any damage to the Defending Pokémon (after applying Weakness and Resistance), remove 1 damage counter from Cherubi."
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
      420
    ],
    "flavorText": "The small ball holds the nutrients needed for evolution. Apparently, it is very sweet and tasty.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/13.png",
      "large": "https://images.pokemontcg.io/pop6/13_hires.png"
    }
  },
  {
    "id": "pop6-14",
    "name": "Chimchar",
    "number": "14",
    "artist": "Kagemaru Himeno",
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
        "name": "Scratch",
        "cost": [],
        "convertedEnergyCost": 0,
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
        "damage": "30",
        "text": "Flip a coin. If heads discard a Fire Energy attached to Chimchar."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "+10"
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
    "flavorText": "It agilely scales cliffs to live atop craggy mountains. Its fire is put out when it sleeps.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/14.png",
      "large": "https://images.pokemontcg.io/pop6/14_hires.png"
    }
  },
  {
    "id": "pop6-15",
    "name": "Piplup",
    "number": "15",
    "artist": "Atsuko Nishida",
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
      "Prinplup"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Peck",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Water Spash",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 damage plus 10 more damage."
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
      393
    ],
    "flavorText": "Because it is very proud, it hates accepting food from people. Its thick down guards it from cold.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/15.png",
      "large": "https://images.pokemontcg.io/pop6/15_hires.png"
    }
  },
  {
    "id": "pop6-16",
    "name": "Starly",
    "number": "16",
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
      "Staravia"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gust",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Quick Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 20 more damage."
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
        "type": "Fighting",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      396
    ],
    "flavorText": "They flock in great numbers. Though small, they flap their wings with great power.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/16.png",
      "large": "https://images.pokemontcg.io/pop6/16_hires.png"
    }
  },
  {
    "id": "pop6-17",
    "name": "Turtwig",
    "number": "17",
    "artist": "Masakazu Fukuda",
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
      "Grotle"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tackle",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Razor Leaf",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      387
    ],
    "flavorText": "Made from soil, the shell on its back hardens when it drinks water. It lives along lakes.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/pop6/17.png",
      "large": "https://images.pokemontcg.io/pop6/17_hires.png"
    }
  }
]

export default cardDetails
