import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "svp-1",
    "name": "Sprigatito",
    "number": "1",
    "artist": "Yuu Nishida",
    "rarity": "Promo",
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
        "name": "Mini Drain",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      906
    ],
    "flavorText": "Its fluffy fur is similar in composition to plants. This Pokémon frequently washes its face to keep it from drying out.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/001/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/001/high.webp"
    }
  },
  {
    "id": "svp-2",
    "name": "Fuecoco",
    "number": "2",
    "artist": "Ryuta Fuse",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Super Singe",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      909
    ],
    "flavorText": "It lies on warm rocks and uses the heat absorbed by its square-shaped scales to create fire energy.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/002/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/002/high.webp"
    }
  },
  {
    "id": "svp-3",
    "name": "Quaxly",
    "number": "3",
    "artist": "Narumi Sato",
    "rarity": "Promo",
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
        "name": "Water Splash",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
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
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      912
    ],
    "flavorText": "This Pokémon migrated to Paldea from distant lands long ago. The gel secreted by its feathers repels water and grime.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/003/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/003/high.webp"
    }
  },
  {
    "id": "svp-4",
    "name": "Mimikyu ex",
    "number": "4",
    "artist": "PLANETA Yamashita",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "190",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Void Return",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "You may switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Energy Burst",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30×",
        "text": "This attack does 30 damage for each Energy attached to both Active Pokémon."
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
      778
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/004/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/004/high.webp"
    }
  },
  {
    "id": "svp-5",
    "name": "Quaquaval",
    "number": "5",
    "artist": "kodama",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Quaxwell",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Energy Carnival",
        "text": "Once during your turn, you may attach a Basic Energy card from your hand to 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hydro Kick",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "140",
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
      914
    ],
    "flavorText": "A single kick from a Quaquaval can send a truck rolling. This Pokémon uses its powerful legs to perform striking dances from far-off lands.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/005/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/005/high.webp"
    }
  },
  {
    "id": "svp-6",
    "name": "Pawmot",
    "number": "6",
    "artist": "GIDORA",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Pawmo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Electrogenesis",
        "text": "Once during your turn, you may search your deck for a Basic {L} Energy card and attach it to this Pokémon. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Electro Paws",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "230",
        "text": "Discard all Energy from this Pokémon."
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
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      923
    ],
    "flavorText": "Pawmot's fluffy fur acts as a battery. It can store the same amount of electricity as an electric car.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/006/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/006/high.webp"
    }
  },
  {
    "id": "svp-7",
    "name": "Hawlucha",
    "number": "7",
    "artist": "Yuya Oka",
    "rarity": "Promo",
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
    "abilities": [
      {
        "name": "Flying Entry",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may choose 2 of your opponent's Benched Pokémon and put 1 damage counter on each of them.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Wing Attack",
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
      701
    ],
    "flavorText": "Its elegant finishing moves—performed by nimbly leaping around using its wings—are polished in the forest where it was born and raised.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/007/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/007/high.webp"
    }
  },
  {
    "id": "svp-8",
    "name": "Revavroom",
    "number": "8",
    "artist": "DOM",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Varoom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Rumbling Engine",
        "text": "You must discard an Energy card from your hand in order to use this Ability. Once during your turn, you may draw cards until you have 6 cards in your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Knock Away",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "90+",
        "text": "Flip a coin. If heads, this attack does 90 more damage."
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
      966
    ],
    "flavorText": "It creates a gas out of poison and minerals from rocks. It then detonates the gas in its cylinders— now numbering eight—to generate energy.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/008/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/008/high.webp"
    }
  },
  {
    "id": "svp-9",
    "name": "Spidops",
    "number": "9",
    "artist": "Anesaki Dynamic",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Tarountula",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "String Truss",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Jet Headbutt",
        "cost": [
          "Grass",
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
      918
    ],
    "flavorText": "It clings to branches and ceilings using its threads and moves without a sound. It takes out its prey before the prey even notices it.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/009/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/009/high.webp"
    }
  },
  {
    "id": "svp-10",
    "name": "Espathra",
    "number": "10",
    "artist": "Sanosuke Sakuma",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Flittle",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Aurora Gain",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Heal 30 damage from this Pokémon."
      },
      {
        "name": "Super Psy Bolt",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      956
    ],
    "flavorText": "It immobilizes opponents by bathing them in psychic power from its large eyes. Despite its appearance, it has a vicious temperament.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/010/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/010/high.webp"
    }
  },
  {
    "id": "svp-11",
    "name": "Arcanine",
    "number": "11",
    "artist": "Ryuta Fuse",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Growlithe",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Crunch",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, discard an Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Fire Mane",
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
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
      "small": "https://assets.tcgdex.net/en/sv/svp/011/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/011/high.webp"
    }
  },
  {
    "id": "svp-12",
    "name": "Dondozo",
    "number": "12",
    "artist": "Shin Nagasawa",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "150",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hammer In",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": ""
      },
      {
        "name": "Dangerous Wave",
        "cost": [
          "Water",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100+",
        "text": "Flip 2 coins. If both of them are heads, this attack does 100 more damage."
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
      977
    ],
    "flavorText": "This Pokémon is a glutton, but it's bad at getting food. It teams up with a Tatsugiri to catch prey.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/012/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/012/high.webp"
    }
  },
  {
    "id": "svp-13",
    "name": "Miraidon",
    "number": "13",
    "artist": "Akira Komayama",
    "rarity": "Promo",
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
        "name": "Sharp Fang",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Lightning Laser",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "This attack also does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      1008
    ],
    "flavorText": "Much remains unknown about this creature. It resembles Cyclizar, but it is far more ruthless and powerful.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/013/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/013/high.webp"
    }
  },
  {
    "id": "svp-14",
    "name": "Koraidon",
    "number": "14",
    "artist": "Mina Nakai",
    "rarity": "Promo",
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
        "name": "Claw Slash",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": ""
      },
      {
        "name": "Rampaging Fang",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "190",
        "text": "Discard 3 Energy from this Pokémon."
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
      1007
    ],
    "flavorText": "This seems to be the Winged King mentioned in an old expedition journal. It was said to have split the land with its bare fists.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/014/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/014/high.webp"
    }
  },
  {
    "id": "svp-15",
    "name": "Flaaffy",
    "number": "15",
    "artist": "0313",
    "rarity": "Promo",
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
        "name": "Static Shock",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Extreme Current",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Discard an Energy from this Pokémon."
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
    "flavorText": "As a result of storing too much electricity, it developed patches where even downy wool won't grow.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/015/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/015/high.webp"
    }
  },
  {
    "id": "svp-16",
    "name": "Ampharos ex",
    "number": "16",
    "artist": "PLANETA Tsuji",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Flaaffy",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Electro Ball",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "60",
        "text": ""
      },
      {
        "name": "Thunderstrike Tail",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "140+",
        "text": "You may discard 2 Energy from this Pokémon to have this attack do 100 more damage."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/016/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/016/high.webp"
    }
  },
  {
    "id": "svp-17",
    "name": "Lucario ex",
    "number": "17",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "260",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Riolu",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Low Sweep",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": ""
      },
      {
        "name": "Aura Sphere",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "This attack also does 50 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/017/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/017/high.webp"
    }
  },
  {
    "id": "svp-18",
    "name": "Cyclizar ex",
    "number": "18",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "210",
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
        "name": "Power Run",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Search your deck for a Basic Energy card and attach it to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Full Throttle",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
        "text": "During your next turn, this Pokémon can't attack."
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
      967
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/018/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/018/high.webp"
    }
  },
  {
    "id": "svp-19",
    "name": "Baxcalibur",
    "number": "19",
    "artist": "Oswaldo KATO",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Arctibax",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Super Cold",
        "text": "As often as you like during your turn, you may attach a Basic {W} Energy card from your hand to 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Buster Tail",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
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
      998
    ],
    "flavorText": "This Pokémon blasts cryogenic air out from its mouth. This air can instantly freeze even liquid-hot lava.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/019/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/019/high.webp"
    }
  },
  {
    "id": "svp-20",
    "name": "Tinkaton",
    "number": "20",
    "artist": "Anesaki Dynamic",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Tinkatuff",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Gather Materials",
        "text": "You must discard a card from your hand in order to use this Ability. Once during your turn, you may draw 3 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Special Hammer",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90+",
        "text": "If this Pokémon has any Special Energy attached, this attack does 90 more damage."
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
      959
    ],
    "flavorText": "This intelligent Pokémon has a very daring disposition. It knocks rocks into the sky with its hammer, aiming for flying Corviknight.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/020/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/020/high.webp"
    }
  },
  {
    "id": "svp-21",
    "name": "Murkrow",
    "number": "21",
    "artist": "Shiburingaru",
    "rarity": "Promo",
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
      "Honchkrow"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spin Turn",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "United Wings",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "This attack does 20 damage for each Pokémon in your discard pile that has the United Wings attack."
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
      198
    ],
    "flavorText": "Feared and loathed by many, it is believed to bring misfortune to all those who see it at night.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/021/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/021/high.webp"
    }
  },
  {
    "id": "svp-22",
    "name": "Pelipper",
    "number": "22",
    "artist": "Nisota Niso",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Wingull",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Hearsay",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may choose 1: put a Supporter card from your discard pile into your hand; or search your deck for a Supporter card, reveal it, put it into your hand, and then shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Wing Attack",
        "cost": [
          "Colorless",
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
      279
    ],
    "flavorText": "It is a flying transporter that carries small Pokémon in its beak. It bobs on the waves to rest its wings.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/022/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/022/high.webp"
    }
  },
  {
    "id": "svp-23",
    "name": "Smoliv",
    "number": "23",
    "artist": "Misa Tsutsui",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Nutrients",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 30 damage from 1 of your Pokémon."
      },
      {
        "name": "Spray Fluid",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      928
    ],
    "flavorText": "It protects itself from enemies by emitting oil from the fruit on its head. This oil is bitter and astringent enough to make someone flinch.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/023/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/023/high.webp"
    }
  },
  {
    "id": "svp-24",
    "name": "Growlithe",
    "number": "24",
    "artist": "Uta",
    "rarity": "Promo",
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
        "text": "Search your deck for up to 2 Basic {R} Energy cards and attach them to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Fire Claws",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      58
    ],
    "flavorText": "It's very friendly and faithful to people. It will try to repel enemies by barking and biting.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/024/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/024/high.webp"
    }
  },
  {
    "id": "svp-25",
    "name": "Tinkatink",
    "number": "25",
    "artist": "Kouki Saitou",
    "rarity": "Promo",
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
        "name": "Smithereen Smash",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, discard an Energy from your opponent's Active Pokémon."
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
      957
    ],
    "flavorText": "It swings its handmade hammer around to protect itself, but the hammer is often stolen by Pokémon that eat metal.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/025/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/025/high.webp"
    }
  },
  {
    "id": "svp-26",
    "name": "Varoom",
    "number": "26",
    "artist": "Mina Nakai",
    "rarity": "Promo",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Gas",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Poisoned."
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
      965
    ],
    "flavorText": "It is said that this Pokémon was born when an unknown poison Pokémon entered and inspirited an engine left at a scrap-processing factory.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/026/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/026/high.webp"
    }
  },
  {
    "id": "svp-27",
    "name": "Pikachu",
    "number": "27",
    "artist": "Atsushi Furusawa",
    "rarity": "Promo",
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
        "name": "Adventuring Together",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "This attack does 10 more damage for each of your Benched Pokémon."
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
    "flavorText": "Pikachu seems excited to be going on an adventure, and so do its new pals, from attention-seeking Sprigatito to laid-back Fuecoco and tidy Quaxly.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/027/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/027/high.webp"
    }
  },
  {
    "id": "svp-28",
    "name": "Miraidon ex",
    "number": "28",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "220",
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
        "name": "Tandem Unit",
        "text": "Once during your turn, you may search your deck for up to 2 Basic {L} Pokémon and put them onto your Bench. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Photon Blaster",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "220",
        "text": "During your next turn, this Pokémon can't attack."
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
      1008
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/028/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/028/high.webp"
    }
  },
  {
    "id": "svp-29",
    "name": "Koraidon ex",
    "number": "29",
    "artist": "aky CG Works",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "230",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dino Cry",
        "text": "Once during your turn, you may attach up to 2 Basic {F} Energy cards from your discard pile to your Basic {F} Pokémon in any way you like. If you use this Ability, your turn ends.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Wild Impact",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "220",
        "text": "During your next turn, this Pokémon can't attack."
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
      1007
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/029/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/029/high.webp"
    }
  },
  {
    "id": "svp-30",
    "name": "Chien-Pao ex",
    "number": "30",
    "artist": "aky CG Works",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "220",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Shivery Chill",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may search your deck for up to 2 Basic {W} Energy cards, reveal them, and put them into your hand. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hail Blade",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "60×",
        "text": "You may discard any amount of {W} Energy from your Pokémon. This attack does 60 damage for each card you discarded in this way."
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
      1002
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/030/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/030/high.webp"
    }
  },
  {
    "id": "svp-31",
    "name": "Tinkaton ex",
    "number": "31",
    "artist": "takuyoa",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "300",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Tinkatuff",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Big Hammer",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "This attack does 30 damage for each card in your hand."
      },
      {
        "name": "Pulverizing Press",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "140",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
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
      959
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/031/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/031/high.webp"
    }
  },
  {
    "id": "svp-32",
    "name": "Annihilape ex",
    "number": "32",
    "artist": "PLANETA Hiiragi",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "320",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Primeape",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Angry Grudge",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "Put up to 12 damage counters on this Pokémon. This attack does 20 damage for each damage counter you placed in this way."
      },
      {
        "name": "Seismic Toss",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      979
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/032/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/032/high.webp"
    }
  },
  {
    "id": "svp-33",
    "name": "Meowscarada ex",
    "number": "33",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "310",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Floragato",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Bouquet Magic",
        "text": "You must discard a Basic {G} Energy card from your hand in order to use this Ability. Once during your turn, you may put 3 damage counters on 1 of your opponent's Benched Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Scratching Nails",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "100+",
        "text": "If your opponent's Active Pokémon already has any damage counters on it, this attack does 120 more damage."
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
      908
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/033/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/033/high.webp"
    }
  },
  {
    "id": "svp-34",
    "name": "Skeledirge ex",
    "number": "34",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Crocalor",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Vitality Song",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "Heal 30 damage from each of your Pokémon."
      },
      {
        "name": "Burning Voice",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "270-",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      911
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/034/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/034/high.webp"
    }
  },
  {
    "id": "svp-35",
    "name": "Quaquaval ex",
    "number": "35",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "320",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Quaxwell",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Exciting Dance",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "60",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon. If you do, switch out your opponent's Active Pokémon to the Bench. (Your opponent chooses the new Active Pokémon.)"
      },
      {
        "name": "Spiral Shot",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "230",
        "text": "Put 2 Energy attached to this Pokémon into your hand."
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
      914
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/035/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/035/high.webp"
    }
  },
  {
    "id": "svp-36",
    "name": "Palafin",
    "number": "36",
    "artist": "nagimiso",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "150",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Finizen",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Jet Punch",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This attack also does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Justice Kick",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "210",
        "text": "If this Pokémon didn't move from the Bench to the Active Spot this turn, this attack does nothing."
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
      964
    ],
    "flavorText": "This Pokémon's ancient genes have awakened. It is now so extraordinarily strong that it can easily lift a cruise ship with one fin.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/036/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/036/high.webp"
    }
  },
  {
    "id": "svp-37",
    "name": "Cleffa",
    "number": "37",
    "artist": "Mina Nakai",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "30",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Clefairy"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Grasping Draw",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Draw cards until you have 7 cards in your hand."
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      173
    ],
    "flavorText": "Because of its unusual, starlike silhouette, people believe that it came here on a meteor.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/037/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/037/high.webp"
    }
  },
  {
    "id": "svp-38",
    "name": "Togekiss",
    "number": "38",
    "artist": "OKACHEKE",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Togetic",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Precious Gift",
        "text": "Once at the end of your turn (after your attack), you may use this Ability. Draw cards until you have 8 cards in your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Power Cyclone",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "110",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      468
    ],
    "flavorText": "Known as a bringer of blessings, it's been depicted on good-luck charms since ancient times.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/038/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/038/high.webp"
    }
  },
  {
    "id": "svp-39",
    "name": "Mawile",
    "number": "39",
    "artist": "Souichirou Gunjima",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Special Eater",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may discard a Special Energy from your opponent's Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Sharp Fang",
        "cost": [
          "Metal",
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
      303
    ],
    "flavorText": "It chomps with its gaping mouth. Its huge jaws are actually steel horns that have been transformed.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/039/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/039/high.webp"
    }
  },
  {
    "id": "svp-40",
    "name": "Pawmi",
    "number": "40",
    "artist": "Ryuta Fuse",
    "rarity": "Promo",
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
        "name": "Static Slap",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      921
    ],
    "flavorText": "It has underdeveloped electric sacs on its cheeks. These sacs can produce electricity only if Pawmi rubs them furiously with the pads on its forepaws.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/040/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/040/high.webp"
    }
  },
  {
    "id": "svp-41",
    "name": "Paldean Wooper",
    "number": "41",
    "artist": "kirisAki",
    "rarity": "Promo",
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
      "Quagsire"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Splattering Poison",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Both Active Pokémon are now Poisoned."
      },
      {
        "name": "Tail Whap",
        "cost": [
          "Darkness",
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
      194
    ],
    "flavorText": "After losing a territorial struggle, Wooper began living on land. The Pokémon changed over time, developing a poisonous film to protect its body.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/041/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/041/high.webp"
    }
  },
  {
    "id": "svp-42",
    "name": "Houndstone",
    "number": "42",
    "artist": "Pani Kobayashi",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Greavard",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Delve",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put up to 2 Item cards from your discard pile into your hand."
      },
      {
        "name": "Spooky Shot",
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
      972
    ],
    "flavorText": "Houndstone spends most of its time sleeping in graveyards. Among all the dog Pokémon, this one is most loyal to its master.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/042/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/042/high.webp"
    }
  },
  {
    "id": "svp-43",
    "name": "Eevee",
    "number": "43",
    "artist": "saino misaki",
    "rarity": "Promo",
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
        "name": "Call for Family",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Basic Pokémon and put it onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Tackle",
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
      "small": "https://assets.tcgdex.net/en/sv/svp/043/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/043/high.webp"
    }
  },
  {
    "id": "svp-44",
    "name": "Charmander",
    "number": "44",
    "artist": "MINAMINAMI Take",
    "rarity": "Promo",
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
        "name": "Heat Tackle",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This Pokémon also does 10 damage to itself."
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
      "small": "https://assets.tcgdex.net/en/sv/svp/044/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/044/high.webp"
    }
  },
  {
    "id": "svp-45",
    "name": "Paradise Resort",
    "number": "45",
    "artist": "Naoki Saito",
    "rarity": "Promo",
    "supertype": "Trainer",
    "subtypes": [
      "Stadium"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "The Retreat Cost of each Psyduck in play (both yours and your opponent's) is Colorless less.",
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
      "small": "https://assets.tcgdex.net/en/sv/svp/045/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/045/high.webp"
    }
  },
  {
    "id": "svp-46",
    "name": "Bulbasaur",
    "number": "46",
    "artist": "OKACHEKE",
    "rarity": "Promo",
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
        "name": "Vine Whip",
        "cost": [
          "Grass",
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
      "small": "https://assets.tcgdex.net/en/sv/svp/046/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/046/high.webp"
    }
  },
  {
    "id": "svp-47",
    "name": "Charmander",
    "number": "47",
    "artist": "NC Empire",
    "rarity": "Promo",
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
        "name": "Ember",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
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
      "small": "https://assets.tcgdex.net/en/sv/svp/047/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/047/high.webp"
    }
  },
  {
    "id": "svp-48",
    "name": "Squirtle",
    "number": "48",
    "artist": "Gemi",
    "rarity": "Promo",
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
        "name": "Bubble",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
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
      "small": "https://assets.tcgdex.net/en/sv/svp/048/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/048/high.webp"
    }
  },
  {
    "id": "svp-49",
    "name": "Zapdos ex",
    "number": "49",
    "artist": "takuyoa",
    "rarity": "Promo",
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
        "text": "If this Pokémon has any {L} Energy attached, it has no Retreat Cost.",
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
      "small": "https://assets.tcgdex.net/en/sv/svp/049/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/049/high.webp"
    }
  },
  {
    "id": "svp-50",
    "name": "Alakazam ex",
    "number": "50",
    "artist": "Mitsuhiro Arita",
    "rarity": "Promo",
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
      "small": "https://assets.tcgdex.net/en/sv/svp/050/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/050/high.webp"
    }
  },
  {
    "id": "svp-51",
    "name": "Snorlax",
    "number": "51",
    "artist": "GOSSAN",
    "rarity": "Promo",
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
    "flavorText": "This POKéMON's stomach is so strong, even eating moldy or rotten food will not affect it.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/051/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/051/high.webp"
    }
  },
  {
    "id": "svp-52",
    "name": "Mewtwo",
    "number": "52",
    "artist": "Bun Toujo",
    "rarity": "Promo",
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
      "small": "https://assets.tcgdex.net/en/sv/svp/052/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/052/high.webp"
    }
  },
  {
    "id": "svp-53",
    "name": "Mew ex",
    "number": "53",
    "artist": "Natsumi Yoshida",
    "rarity": "Promo",
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
    "convertedRetreatCost": 0,
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
      "small": "https://assets.tcgdex.net/en/sv/svp/053/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/053/high.webp"
    }
  },
  {
    "id": "svp-54",
    "name": "Greninja ex",
    "number": "54",
    "artist": "takuyoa",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "300",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Frogadier",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Stealthy Shuriken",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 40 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Torrential Slash",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "120+",
        "text": "If your opponent's Active Pokémon already has any damage counters on it, this attack does 120 more damage."
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
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/054/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/054/high.webp"
    }
  },
  {
    "id": "svp-55",
    "name": "Kangaskhan ex",
    "number": "55",
    "artist": "N-DESIGN Inc.",
    "rarity": "Promo",
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
      "small": "https://assets.tcgdex.net/en/sv/svp/055/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/055/high.webp"
    }
  },
  {
    "id": "svp-56",
    "name": "Charizard ex",
    "number": "56",
    "artist": "takuyoa",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Tera",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "rules": [
      "Tera: As long as this Pokémon is on your Bench, prevent all damage done to this Pokémon by attacks (both yours and your opponent's).",
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Infernal Reign",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may search your deck for up to 3 Basic {R} Energy cards and attach them to your Pokémon in any way you like. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Burning Darkness",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "180+",
        "text": "This attack does 30 more damage for each Prize card your opponent has taken."
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
      "small": "https://assets.tcgdex.net/en/sv/svp/056/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/056/high.webp"
    }
  },
  {
    "id": "svp-57",
    "name": "Chi-Yu",
    "number": "57",
    "artist": "Dsuke",
    "rarity": "Promo",
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
        "name": "Flare Bringer",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach up to 2 Basic {R} Energy cards from your discard pile to 1 of your Pokémon."
      },
      {
        "name": "Megafire of Envy",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "50+",
        "text": "If any of your Pokémon were Knocked Out by damage from an attack during your opponent's last turn, this attack does 90 more damage."
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
      1004
    ],
    "flavorText": "It controls flames burning at over 5,400 degrees Fahrenheit. It casually swims through the sea of lava it creates by melting rock and sand.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/057/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/057/high.webp"
    }
  },
  {
    "id": "svp-58",
    "name": "Iron Bundle",
    "number": "58",
    "artist": "Lee HyunJung",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Future"
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
        "name": "Hyper Blower",
        "text": "Once during your turn, if this Pokémon is on your Bench, you may switch out your opponent's Active Pokémon to the Bench. (Your opponent chooses the new Active Pokémon.) If you do, discard this Pokémon and all attached cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Refrigerated Stream",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "If the Defending Pokémon is an Evolution Pokémon, it can't attack during your opponent's next turn."
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
      991
    ],
    "flavorText": "It resembles a mysterious object mentioned in an old book. There are only two reported sightings of this Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/058/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/058/high.webp"
    }
  },
  {
    "id": "svp-59",
    "name": "Xatu",
    "number": "59",
    "artist": "GOSSAN",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Natu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Clairvoyant Sense",
        "text": "Once during your turn, you may attach a Basic {P} Energy card from your hand to 1 of your Benched Pokémon. If you attached Energy to a Pokémon in this way, draw 2 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Super Psy Bolt",
        "cost": [
          "Psychic",
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
      178
    ],
    "flavorText": "This odd Pokémon can see both the past and the future. It eyes the sun's movement all day.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/059/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/059/high.webp"
    }
  },
  {
    "id": "svp-60",
    "name": "Aegislash",
    "number": "60",
    "artist": "Takeshi Nakamura",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Doublade",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Mysterious Shield",
        "text": "Prevent all damage done to this Pokémon by attacks from your opponent's Pokémon ex and Pokémon V.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hard Bashing",
        "cost": [
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
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
      681
    ],
    "flavorText": "Its potent spectral powers allow it to manipulate others. It once used its powers to force people and Pokémon to build a kingdom to its liking.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/060/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/060/high.webp"
    }
  },
  {
    "id": "svp-61",
    "name": "Pineco",
    "number": "61",
    "artist": "Nobuhiro Imagawa",
    "rarity": "Promo",
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
      "Forretress"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rollout",
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
      204
    ],
    "flavorText": "It likes to make its shell thicker by adding layers of tree bark. The additional weight doesn't bother it.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/061/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/061/high.webp"
    }
  },
  {
    "id": "svp-62",
    "name": "Sinistea",
    "number": "62",
    "artist": "kurumitsu",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "30",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Polteageist"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Cold Tea",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
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
      854
    ],
    "flavorText": "The soul of someone who died alone possessed some leftover tea. This Pokémon appears in hotels and houses.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/062/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/062/high.webp"
    }
  },
  {
    "id": "svp-63",
    "name": "Cetitan",
    "number": "63",
    "artist": "GOSSAN",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "170",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Cetoddle",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Avalanche",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This attack also does 10 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Rolling Slider",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "100×",
        "text": "Flip 3 coins. This attack does 100 damage for each heads."
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
      975
    ],
    "flavorText": "This Pokémon wanders around snowy, icy areas. It protects its body with powerful muscles and a thick layer of fat under its skin.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/063/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/063/high.webp"
    }
  },
  {
    "id": "svp-64",
    "name": "Arctibax",
    "number": "64",
    "artist": "Teeziro",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Frigibax",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sharp Fin",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Frost Smash",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
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
      997
    ],
    "flavorText": "Arctibax freezes the air around it, protecting its face with an ice mask and turning its dorsal fin into a blade of ice.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/064/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/064/high.webp"
    }
  },
  {
    "id": "svp-65",
    "name": "Scream Tail",
    "number": "65",
    "artist": "GIDORA",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Ancient"
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
        "name": "Slap",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Roaring Scream",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This attack does 20 damage to 1 of your opponent's Pokémon for each damage counter on this Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      985
    ],
    "flavorText": "There has been only one reported sighting of this Pokémon. It resembles a mysterious creature depicted in an old expedition journal.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/065/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/065/high.webp"
    }
  },
  {
    "id": "svp-66",
    "name": "Iron Bundle",
    "number": "66",
    "artist": "Teeziro",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Future"
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
        "name": "Hyper Blower",
        "text": "Once during your turn, if this Pokémon is on your Bench, you may switch out your opponent's Active Pokémon to the Bench. (Your opponent chooses the new Active Pokémon.) If you do, discard this Pokémon and all attached cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Refrigerated Stream",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "If the Defending Pokémon is an Evolution Pokémon, it can't attack during your opponent's next turn."
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
      991
    ],
    "flavorText": "It resembles a mysterious object mentioned in an old book. There are only two reported sightings of this Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/066/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/066/high.webp"
    }
  },
  {
    "id": "svp-67",
    "name": "Roaring Moon ex",
    "number": "67",
    "artist": "takuyoa",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex",
      "Ancient"
    ],
    "hp": "230",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Frenzied Gouging",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Knock Out your opponent's Active Pokémon. If your opponent's Active Pokémon is Knocked Out in this way, this Pokémon does 200 damage to itself."
      },
      {
        "name": "Calamity Storm",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100+",
        "text": "You may discard a Stadium in play. If you do, this attack does 120 more damage."
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
      1005
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/067/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/067/high.webp"
    }
  },
  {
    "id": "svp-68",
    "name": "Iron Valiant ex",
    "number": "68",
    "artist": "aky CG Works",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex",
      "Future"
    ],
    "hp": "220",
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
        "name": "Tachyon Bits",
        "text": "Once during your turn, when this Pokémon moves from your Bench to the Active Spot, you may put 2 damage counters on 1 of your opponent's Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Laser Blade",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "During your next turn, this Pokémon can't attack."
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
      1006
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/068/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/068/high.webp"
    }
  },
  {
    "id": "svp-69",
    "name": "Fidough",
    "number": "69",
    "artist": "sowsow",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rear Kick",
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
      926
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/069/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/069/high.webp"
    }
  },
  {
    "id": "svp-70",
    "name": "Greavard",
    "number": "70",
    "artist": "Nisota Niso",
    "rarity": "Promo",
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
        "name": "Graveyard Gamboling",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "This attack does 10 damage for each {P} Pokémon in your discard pile."
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
      971
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/070/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/070/high.webp"
    }
  },
  {
    "id": "svp-71",
    "name": "Maschiff",
    "number": "71",
    "artist": "Kagemaru Himeno",
    "rarity": "Promo",
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
        "name": "Ambush",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
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
      942
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/071/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/071/high.webp"
    }
  },
  {
    "id": "svp-72",
    "name": "Great Tusk ex",
    "number": "72",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex",
      "Ancient"
    ],
    "hp": "250",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Quaking Demolition",
        "text": "Once at the end of your turn (after your attack), if this Pokémon is in the Active Spot, you must discard the top 5 cards of your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Great Bash",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "260",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      984
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/072/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/072/high.webp"
    }
  },
  {
    "id": "svp-73",
    "name": "Iron Treads ex",
    "number": "73",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex",
      "Future"
    ],
    "hp": "220",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Iron-Clad Roll",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "After doing damage, you may discard all Future Booster Energy Capsules from this Pokémon. If you do, during your opponent's next turn, this Pokémon takes 150 less damage from attacks (after applying Weakness and Resistance)."
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
      990
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/073/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/073/high.webp"
    }
  },
  {
    "id": "svp-74",
    "name": "Charizard ex",
    "number": "74",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Tera",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "rules": [
      "As long as this Pokémon is on your Bench, prevent all damage done to this Pokémon by attacks (both yours and your opponent's).",
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Infernal Reign",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may search your deck for up to 3 Basic {R} Energy cards and attach them to your Pokémon in any way you like. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Burning Darkness",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "180+",
        "text": "This attack does 30 more damage for each Prize card your opponent has taken."
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
      "small": "https://assets.tcgdex.net/en/sv/svp/074/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/074/high.webp"
    }
  },
  {
    "id": "svp-75",
    "name": "Mimikyu",
    "number": "75",
    "artist": "Mitsuhiro Arita",
    "rarity": "Promo",
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
        "name": "Safeguard",
        "text": "Prevent all damage done to this Pokémon by attacks from your opponent's Pokémon ex and Pokémon V.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Ghost Eye",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put 7 damage counters on your opponent's Active Pokémon."
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
      778
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/075/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/075/high.webp"
    }
  },
  {
    "id": "svp-76",
    "name": "Sprigatito",
    "number": "76",
    "artist": "kurumitsu",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gather Sunlight",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Energy cards, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Seed Bomb",
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
      906
    ],
    "flavorText": "Its fluffy fur is similar in composition to plants. This Pokémon frequently washes its face to keep it from drying out.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/076/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/076/high.webp"
    }
  },
  {
    "id": "svp-77",
    "name": "Floragato",
    "number": "77",
    "artist": "GIDORA",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Sprigatito",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Seed Bomb",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Magic Whip",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Switch out your opponent's Active Pokémon to the Bench. (Your opponent chooses the new Active Pokémon.)"
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
      907
    ],
    "flavorText": "Floragato deftly wields the vine hidden beneath its long fur, slamming the hard flower bud against its opponents.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/077/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/077/high.webp"
    }
  },
  {
    "id": "svp-78",
    "name": "Meowscarada ex",
    "number": "78",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "310",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Floragato",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Bouquet Magic",
        "text": "You must discard a Basic {G} Energy card from your hand in order to use this Ability. Once during your turn, you may put 3 damage counters on 1 of your opponent's Benched Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Scratching Nails",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "100+",
        "text": "If your opponent's Active Pokémon already has any damage counters on it, this attack does 120 more damage."
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
      908
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/078/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/078/high.webp"
    }
  },
  {
    "id": "svp-79",
    "name": "Fuecoco",
    "number": "79",
    "artist": "OKACHEKE",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      909
    ],
    "flavorText": "It lies on warm rocks and uses the heat absorbed by its square-shaped scales to create fire energy.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/079/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/079/high.webp"
    }
  },
  {
    "id": "svp-80",
    "name": "Crocalor",
    "number": "80",
    "artist": "Hideki Ishikawa",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Fuecoco",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Steady Firebreathing",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Hyper Voice",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      910
    ],
    "flavorText": "The combination of Crocalor's fire energy and overflowing vitality has caused an egg-shaped fireball to appear on the Pokémon's head.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/080/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/080/high.webp"
    }
  },
  {
    "id": "svp-81",
    "name": "Skeledirge ex",
    "number": "81",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Crocalor",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Vitality Song",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "Heal 30 damage from each of your Pokémon."
      },
      {
        "name": "Burning Voice",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "270-",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      911
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/081/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/081/high.webp"
    }
  },
  {
    "id": "svp-82",
    "name": "Quaxly",
    "number": "82",
    "artist": "GIDORA",
    "rarity": "Promo",
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
        "name": "Reckless Charge",
        "cost": [
          "Water"
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      912
    ],
    "flavorText": "This Pokémon migrated to Paldea from distant lands long ago. The gel secreted by its feathers repels water and grime.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/082/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/082/high.webp"
    }
  },
  {
    "id": "svp-83",
    "name": "Quaxwell",
    "number": "83",
    "artist": "Atsushi Furusawa",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Quaxly",
    "evolvesTo": [],
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
        "name": "Wave Splash",
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
      913
    ],
    "flavorText": "These Pokémon constantly run through shallow waters to train their legs, then compete with each other to see which of them kicks most gracefully.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/083/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/083/high.webp"
    }
  },
  {
    "id": "svp-84",
    "name": "Quaquaval ex",
    "number": "84",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "320",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Quaxwell",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Exciting Dance",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "60",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon. If you do, switch out your opponent's Active Pokémon to the Bench. (Your opponent chooses the new Active Pokémon.)"
      },
      {
        "name": "Spiral Shot",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "230",
        "text": "Put 2 Energy attached to this Pokémon into your hand."
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
      914
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/084/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/084/high.webp"
    }
  },
  {
    "id": "svp-85",
    "name": "Pikachu with Grey Felt Hat",
    "number": "85",
    "artist": "Naoyo Kimura",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
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
        "name": "Pika-Portrait",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Pikachu and put it onto your Bench. Then, shuffle your deck."
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
    "flavorText": "When it is angered, it immediately discharges the energy stored in the pouches of its cheeks.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/085/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/085/high.webp"
    }
  },
  {
    "id": "svp-86",
    "name": "Mabosstiff ex",
    "number": "86",
    "artist": "PLANETA Mochizuki",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "260",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Maschiff",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Daunt",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "During your opponent's next turn, attacks used by the Defending Pokémon do 50 less damage (before applying Weakness and Resistance)."
      },
      {
        "name": "Proud Fangs",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100+",
        "text": "If your Benched Pokémon have any damage counters on them, this attack does 120 more damage."
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
      943
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/086/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/086/high.webp"
    }
  },
  {
    "id": "svp-87",
    "name": "Sprigatito ex",
    "number": "87",
    "artist": "takuyoa",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "200",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Scratch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Magical Leaf",
        "cost": [
          "Grass",
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
      906
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/087/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/087/high.webp"
    }
  },
  {
    "id": "svp-88",
    "name": "Pikachu",
    "number": "88",
    "artist": "saino misaki",
    "rarity": "Promo",
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
        "name": "Growl",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, attacks used by the Defending Pokémon do 20 less damage (before applying Weakness and Resistance)."
      },
      {
        "name": "Pika Bolt",
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
      "small": "https://assets.tcgdex.net/en/sv/svp/088/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/088/high.webp"
    }
  },
  {
    "id": "svp-89",
    "name": "Feraligatr",
    "number": "89",
    "artist": "Kurata So",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Croconaw",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Torrential Heart",
        "text": "Once during your turn, you may put 5 damage counters on this Pokémon. If you do, during this turn, attacks used by this Pokémon do 120 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Giant Wave",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "160",
        "text": "During your next turn, this Pokémon can't use Giant Wave."
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
      160
    ],
    "flavorText": "It usually moves slowly, but it goes at blinding speed when it attacks and bites prey.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/089/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/089/high.webp"
    }
  },
  {
    "id": "svp-90",
    "name": "Metang",
    "number": "90",
    "artist": "Uta",
    "rarity": "Promo",
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
    "abilities": [
      {
        "name": "Metal Maker",
        "text": "Once during your turn, you may look at the top 4 cards of your deck and attach any number of Basic {M} Energy cards you find there to your Pokémon in any way you like. Shuffle the other cards and put them on the bottom of your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Beam",
        "cost": [
          "Metal",
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
    "flavorText": "Two Beldum have become stuck together via their own magnetic forces. With two brains, the resulting Metang has doubled psychic powers.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/090/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/090/high.webp"
    }
  },
  {
    "id": "svp-91",
    "name": "Koraidon",
    "number": "91",
    "artist": "Anesaki Dynamic",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Ancient"
    ],
    "hp": "140",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Primordial Beatdown",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "This attack does 30 damage for each of your Ancient Pokémon in play."
      },
      {
        "name": "Shred",
        "cost": [
          "Fire",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
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
      1007
    ],
    "flavorText": "This seems to be the Winged King mentioned in an old expedition journal. It was said to have split the land with its bare fists.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/091/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/091/high.webp"
    }
  },
  {
    "id": "svp-92",
    "name": "Miraidon",
    "number": "92",
    "artist": "akagi",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Future"
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
        "name": "Peak Acceleration",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "Search your deck for up to 2 Basic Energy cards and attach them to your Future Pokémon in any way you like. Then, shuffle your deck."
      },
      {
        "name": "Sparking Strike",
        "cost": [
          "Lightning",
          "Lightning",
          "Psychic"
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
      1008
    ],
    "flavorText": "This seems to be the Iron Serpent mentioned in an old book. The Iron Serpent is said to have turned the land to ash with its lightning.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/092/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/092/high.webp"
    }
  },
  {
    "id": "svp-93",
    "name": "Carvanha",
    "number": "93",
    "artist": "Tonji Matsuno",
    "rarity": "Promo",
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
        "name": "Sharp Fang",
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
      318
    ],
    "flavorText": "These Pokémon have sharp fangs and powerful jaws. Sailors avoid Carvanha dens at all costs.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/093/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/093/high.webp"
    }
  },
  {
    "id": "svp-94",
    "name": "Bellibolt",
    "number": "94",
    "artist": "Mizue",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Tadbulb",
    "evolvesTo": [],
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
        "name": "Two-Bump Bolt",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "10+",
        "text": "You may discard up to 2 {L} Energy from this Pokémon. This attack does 80 more damage for each card you discarded in this way."
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
      939
    ],
    "flavorText": "When this Pokémon expands and contracts its wobbly body, the belly-button dynamo in its stomach produces a huge amount of electricity.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/094/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/094/high.webp"
    }
  },
  {
    "id": "svp-95",
    "name": "Cleffa",
    "number": "95",
    "artist": "Tika Matsuno",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "30",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Twinkling Hope",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Energy cards, reveal them, and put them into your hand. Then, shuffle your deck."
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
      173
    ],
    "flavorText": "Because of its unusual, starlike silhouette, people believe that it came here on a meteor.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/095/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/095/high.webp"
    }
  },
  {
    "id": "svp-96",
    "name": "Cyclizar",
    "number": "96",
    "artist": "Hasuno",
    "rarity": "Promo",
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
        "name": "Flat-Out Dash",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin until you get tails. For each heads, draw a card."
      },
      {
        "name": "Power Tackle",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "During your next turn, this Pokémon can't attack."
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
      967
    ],
    "flavorText": "Apparently Cyclizar has been allowing people to ride on its back since ancient times. Depictions of this have been found in 10,000-year-old murals.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/096/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/096/high.webp"
    }
  },
  {
    "id": "svp-97",
    "name": "Flutter Mane",
    "number": "97",
    "artist": "Takumi Wada",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Ancient"
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
        "name": "Midnight Fluttering",
        "text": "As long as this Pokémon is in the Active Spot, your opponent's Active Pokémon has no Abilities, except for Midnight Fluttering.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hex Hurl",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Put 2 damage counters on your opponent's Benched Pokémon in any way you like."
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
      987
    ],
    "flavorText": "This Pokémon has characteristics similar to those of Flutter Mane, a creature mentioned in a certain book.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/097/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/097/high.webp"
    }
  },
  {
    "id": "svp-98",
    "name": "Iron Thorns",
    "number": "98",
    "artist": "Tonji Matsuno",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Future"
    ],
    "hp": "140",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Destructo-Press",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70×",
        "text": "Reveal the top 5 cards of your deck. This attack does 70 damage for each Future card you find there. Then, discard those Future cards and shuffle the other cards back into your deck."
      },
      {
        "name": "Megaton Lariat",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "140",
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
      995
    ],
    "flavorText": "Some of its notable features match those of an object named within a certain expedition journal as Iron Thorns.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/098/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/098/high.webp"
    }
  },
  {
    "id": "svp-99",
    "name": "Shroodle",
    "number": "99",
    "artist": "Hitoshi Ariga",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scratch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Toxic Teeth",
        "cost": [
          "Colorless",
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
      944
    ],
    "flavorText": "Though usually a mellow Pokémon, it will sink its sharp, poison-soaked front teeth into any that anger it, causing paralysis in the object of its ire.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/099/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/099/high.webp"
    }
  },
  {
    "id": "svp-100",
    "name": "Grafaiai ex",
    "number": "100",
    "artist": "aky CG Works",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "250",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Shroodle",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Numbing Saliva",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Toxic Throw",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
        "text": "Your opponent's Active Pokémon is now Poisoned. During your next turn, this Pokémon can't use Toxic Throw."
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
      945
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/100/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/100/high.webp"
    }
  },
  {
    "id": "svp-101",
    "name": "Pikachu",
    "number": "101",
    "artist": "Jiro Sasumo",
    "rarity": "Promo",
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
        "name": "Scrappy Spark",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Flip a coin until you get tails. This attack does 30 more damage for each heads."
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
      "small": "https://assets.tcgdex.net/en/sv/svp/101/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/101/high.webp"
    }
  },
  {
    "id": "svp-102",
    "name": "Oddish",
    "number": "102",
    "artist": "Miranda Branley",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Razor Leaf",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Grass Knot",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage for each {C} in your opponent's Active Pokémon's Retreat Cost."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "x2"
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
      "small": "https://assets.tcgdex.net/en/sv/svp/102/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/102/high.webp"
    }
  },
  {
    "id": "svp-103",
    "name": "Houndoom ex",
    "number": "103",
    "artist": "PLANETA Tsuji",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "270",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Houndour",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Evil Claw",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "90",
        "text": "If the Defending Pokémon is a Basic Pokémon, it can't attack during your opponent's next turn."
      },
      {
        "name": "Hound's Fang",
        "cost": [
          "Darkness",
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 3,
        "damage": "220",
        "text": "This Pokémon also does 30 damage to itself."
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
      229
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/103/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/103/high.webp"
    }
  },
  {
    "id": "svp-104",
    "name": "Melmetal ex",
    "number": "104",
    "artist": "PLANETA Igarashi",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "300",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Meltan",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Metal-bolize",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic {M} Energy cards and attach them to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Full Metal Knuckle",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "90+",
        "text": "This attack does 30 more damage for each {M} Energy attached to this Pokémon."
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
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/104/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/104/high.webp"
    }
  },
  {
    "id": "svp-105",
    "name": "Armarouge ex",
    "number": "105",
    "artist": "PLANETA Tsuji",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "260",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charcadet",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Armor Cannon",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "Discard a {R} Energy from this Pokémon."
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
      936
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/105/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/105/high.webp"
    }
  },
  {
    "id": "svp-106",
    "name": "Pikachu ex",
    "number": "106",
    "artist": "takuyoa",
    "rarity": "Promo",
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
    "evolvesTo": [
      "Raichu"
    ],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Thunderbolt",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/106/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/106/high.webp"
    }
  },
  {
    "id": "svp-107",
    "name": "Mareep",
    "number": "107",
    "artist": "Orca",
    "rarity": "Promo",
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
      "Flaaffy"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Headbutt",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Lightning Ball",
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
      179
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/107/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/107/high.webp"
    }
  },
  {
    "id": "svp-108",
    "name": "Flaaffy",
    "number": "108",
    "artist": "Akira Komayama",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Mareep",
    "evolvesTo": [
      "Ampharos"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Headbutt",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Electro Ball",
        "cost": [
          "Lightning",
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
      180
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/108/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/108/high.webp"
    }
  },
  {
    "id": "svp-109",
    "name": "Ampharos",
    "number": "109",
    "artist": "GIDORA",
    "rarity": "Promo",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Electric Ball",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      181
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/109/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/109/high.webp"
    }
  },
  {
    "id": "svp-110",
    "name": "Darkrai ex",
    "number": "110",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "210",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Wind of Darkness",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Night Impact",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
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
      491
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/110/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/110/high.webp"
    }
  },
  {
    "id": "svp-111",
    "name": "Pawniard",
    "number": "111",
    "artist": "matazo",
    "rarity": "Promo",
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
      "Bisharp"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pierce",
        "cost": [
          "Darkness"
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
      624
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/111/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/111/high.webp"
    }
  },
  {
    "id": "svp-112",
    "name": "Bisharp",
    "number": "112",
    "artist": "AKIRA EGAWA",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Pawniard",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Cut",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
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
      625
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/112/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/112/high.webp"
    }
  },
  {
    "id": "svp-113",
    "name": "Kingambit",
    "number": "113",
    "artist": "nagimiso",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Bisharp",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Elbow Strike",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Slicing Blade",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      983
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/113/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/113/high.webp"
    }
  },
  {
    "id": "svp-114",
    "name": "Picnicker",
    "number": "114",
    "artist": "Susumu Maeya",
    "rarity": "Promo",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Flip a coin. If heads, draw 4 cards. If tails, draw 2 cards.",
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
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/114/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/114/high.webp"
    }
  },
  {
    "id": "svp-115",
    "name": "Thwackey",
    "number": "115",
    "artist": "Uninori",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Grookey",
    "evolvesTo": [
      "Rillaboom"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Boom Boom Groove",
        "text": "Once during your turn, if your Active Pokémon has the Festival Lead Ability, you may search your deck for a card and put it into your hand. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Beat",
        "cost": [
          "Grass",
          "Grass"
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
      811
    ],
    "flavorText": "The faster a Thwackey can beat out a rhythm with its two sticks, the more respect it wins from its peers.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/115/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/115/high.webp"
    }
  },
  {
    "id": "svp-116",
    "name": "Infernape",
    "number": "116",
    "artist": "Kazumasa Yasukuni",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Monferno",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Pyro Dance",
        "text": "Once during your turn, you may attach a Basic {R} Energy card, a Basic {F} Energy card, or 1 of each from your hand to your Pokémon in any way you like.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Scorching Fire",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
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
      392
    ],
    "flavorText": "Its crown of fire is indicative of its fiery nature. It is beaten by none in terms of quickness.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/116/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/116/high.webp"
    }
  },
  {
    "id": "svp-117",
    "name": "Froslass",
    "number": "117",
    "artist": "mingo",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Snorunt",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Freezing Shroud",
        "text": "During Pokémon Checkup, put 1 damage counter on each Pokémon that has an Ability (both yours and your opponent's), except any Froslass.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Frost Smash",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      478
    ],
    "flavorText": "It freezes prey by blowing its −58 degree Fahrenheit breath. It is said to then secretly display its prey.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/117/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/117/high.webp"
    }
  },
  {
    "id": "svp-118",
    "name": "Tatsugiri",
    "number": "118",
    "artist": "Shimaris Yukichi",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Attract Customers",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may look at the top 6 cards of your deck, reveal a Supporter card you find there, and put it into your hand. Shuffle the other cards back into your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Surf",
        "cost": [
          "Fire",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
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
      978
    ],
    "flavorText": "Tatsugiri is an extremely cunning Pokémon. It feigns weakness to lure in prey, then orders its partner to attack.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/118/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/118/high.webp"
    }
  },
  {
    "id": "svp-119",
    "name": "Toxel",
    "number": "119",
    "artist": "Natsumi Yoshida",
    "rarity": "Promo",
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
      "Toxtricity"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Slight Intrusion",
        "cost": [
          "Lightning"
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
      848
    ],
    "flavorText": "It has no problem drinking dirty water. An organ inside Toxel's body filters such water into a poisonous liquid that is harmless to Toxel.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/119/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/119/high.webp"
    }
  },
  {
    "id": "svp-120",
    "name": "Pupitar",
    "number": "120",
    "artist": "Shiburingaru",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
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
        "name": "Rock Throw",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Blasting Tackle",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "This attack also does 20 damage to 1 of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": "This pupa flies around wildly by venting with great force the gas pressurized inside its body.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/120/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/120/high.webp"
    }
  },
  {
    "id": "svp-121",
    "name": "Revavroom",
    "number": "121",
    "artist": "Nisota Niso",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Varoom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Swagger",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, discard an Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Huge Tackle",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70+",
        "text": "If you have more cards in your hand than your opponent, this attack does 80 more damage."
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
      966
    ],
    "flavorText": "It creates a gas out of poison and minerals from rocks. It then detonates the gas in its cylinders— now numbering eight—to generate energy.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/121/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/121/high.webp"
    }
  },
  {
    "id": "svp-122",
    "name": "Snorlax",
    "number": "122",
    "artist": "Po-Suzuki",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "160",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Lazy Press",
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
      143
    ],
    "flavorText": "It is not satisfied unless it eats over 880 pounds of food every day. When it is done eating, it goes promptly to sleep.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/122/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/122/high.webp"
    }
  },
  {
    "id": "svp-123",
    "name": "Teal Mask Ogerpon",
    "number": "123",
    "artist": "kodama",
    "rarity": "Promo",
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
        "name": "Mountain Stroll",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Energy cards, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Ogre Comeback",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 20 more damage for each of your opponent's Benched Pokémon."
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
      1017
    ],
    "flavorText": "This mischief-loving Pokémon is full of curiosity. It battles by drawing out the type-based energy contained within its masks.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/123/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/123/high.webp"
    }
  },
  {
    "id": "svp-124",
    "name": "Iono",
    "number": "124",
    "artist": "yuu",
    "rarity": "Promo",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Each player shuffles their hand and puts it on the bottom of their deck. If either player put any cards on the bottom of their deck in this way, each player draws a card for each of their remaining Prize cards.",
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
      "small": "https://assets.tcgdex.net/en/sv/svp/124/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/124/high.webp"
    }
  },
  {
    "id": "svp-125",
    "name": "Armarouge ex",
    "number": "125",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "260",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charcadet",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Crimson Armor",
        "text": "If this Pokémon has full HP, it takes 80 less damage from attacks from your opponent's Pokémon (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Scorching Bazooka",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40+",
        "text": "This attack does 40 more damage for each {R} Energy attached to this Pokémon."
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
      936
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/125/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/125/high.webp"
    }
  },
  {
    "id": "svp-126",
    "name": "Palafin ex",
    "number": "126",
    "artist": "PLANETA Mochizuki",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Finizen",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Hero's Spirit",
        "text": "Put this Pokémon into play only with the effect of Palafin's Zero to Hero Ability.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Giga Impact",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "250",
        "text": "During your next turn, this Pokémon can't attack."
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
      964
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/126/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/126/high.webp"
    }
  },
  {
    "id": "svp-127",
    "name": "Walking Wake ex",
    "number": "127",
    "artist": "takuyoa",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex",
      "Ancient"
    ],
    "hp": "220",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Azure Seas",
        "text": "Damage from attacks used by this Pokémon isn't affected by any effects on your opponent's Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Catharsis Roar",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120+",
        "text": "If your opponent's Active Pokémon is affected by a Special Condition, this attack does 120 more damage."
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
      1009
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/127/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/127/high.webp"
    }
  },
  {
    "id": "svp-128",
    "name": "Iron Leaves ex",
    "number": "128",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex",
      "Future"
    ],
    "hp": "220",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Rapid Vernier",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may switch it with your Active Pokémon. If you do, you may move any amount of Energy from your other Pokémon to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Prism Edge",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
        "text": "During your next turn, this Pokémon can't attack."
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
      1010
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/128/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/128/high.webp"
    }
  },
  {
    "id": "svp-129",
    "name": "Pecharunt",
    "number": "129",
    "artist": "nagimiso",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Toxic Subjugation",
        "text": "As long as this Pokémon is in the Active Spot, put 5 more damage counters on your opponent's Poisoned Pokémon during Pokémon Checkup.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Poison Chain",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Your opponent's Active Pokémon is now Poisoned. During your opponent's next turn, that Pokémon can't retreat."
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
      1025
    ],
    "flavorText": "Its peach-shaped shell serves as storage for a potent poison. It makes poisonous mochi and serves them to people and Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/129/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/129/high.webp"
    }
  },
  {
    "id": "svp-130",
    "name": "Kingambit",
    "number": "130",
    "artist": "Oku",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Bisharp",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Strike Down",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If your opponent's Active Pokémon has 4 or more damage counters on it, that Pokémon is Knocked Out."
      },
      {
        "name": "Massive Rend",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      983
    ],
    "flavorText": "Only a Bisharp that stands above all others in its vast army can evolve into Kingambit.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/130/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/130/high.webp"
    }
  },
  {
    "id": "svp-131",
    "name": "Kingdra ex",
    "number": "131",
    "artist": "akagi",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "310",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Seadra",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "King's Order",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put up to 3 {W} Pokémon from your discard pile onto your Bench."
      },
      {
        "name": "Hydro Pump",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50+",
        "text": "This attack does 50 more damage for each {W} Energy attached to this Pokémon."
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
      230
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/131/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/131/high.webp"
    }
  },
  {
    "id": "svp-132",
    "name": "Greninja ex",
    "number": "132",
    "artist": "SIE NANAHARA",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "300",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Frogadier",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Stealthy Shuriken",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 40 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Torrential Slash",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "120+",
        "text": "If your opponent's Active Pokémon already has any damage counters on it, this attack does 120 more damage."
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
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/132/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/132/high.webp"
    }
  },
  {
    "id": "svp-133",
    "name": "Ledian",
    "number": "133",
    "artist": "Natsumi Yoshida",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Ledyba",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Glittering Star Pattern",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may switch in 1 of your opponent's Benched Pokémon that has 90 HP or less remaining to the Active Spot.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Swift",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "This attack's damage isn't affected by Weakness or Resistance, or by any effects on your opponent's Active Pokémon."
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
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      166
    ],
    "flavorText": "When the stars flicker in the night sky, it flutters about, scattering a glowing powder.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/133/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/133/high.webp"
    }
  },
  {
    "id": "svp-134",
    "name": "Crabominable",
    "number": "134",
    "artist": "KEIICHIRO ITO",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "160",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Crabrawler",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Food Prep",
        "text": "Attacks used by this Pokémon cost {C} less for each Kofu card in your discard pile.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Haymaker",
        "cost": [
          "Water",
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "250",
        "text": "During your next turn, this Pokémon can't use Haymaker."
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
      740
    ],
    "flavorText": "Though its punches are powerful, this Pokémon's movements are sluggish. It blows icy bubbles from its mouth to immobilize its opponents.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/134/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/134/high.webp"
    }
  },
  {
    "id": "svp-135",
    "name": "Drifblim",
    "number": "135",
    "artist": "Keisin",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Drifloon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Everyone Explode Now",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "This attack does 50 damage for each of your Drifloon and Drifblim in play. This attack also does 30 damage to each of your Drifloon and Drifblim. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      426
    ],
    "flavorText": "They carry people and Pokémon, but the wind can catch them, so there can't be a fixed destination.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/135/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/135/high.webp"
    }
  },
  {
    "id": "svp-136",
    "name": "Bouffalant",
    "number": "136",
    "artist": "Tonji Matsuno",
    "rarity": "Promo",
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
        "name": "Curly Wall",
        "text": "As long as you have at least 1 other Bouffalant in play, all of your Basic {C} Pokémon take 60 less damage from attacks from your opponent's Pokémon (after applying Weakness and Resistance). The effect of Curly Wall doesn't stack.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Boundless Power",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "During your next turn, this Pokémon can't attack."
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
    "flavorText": "These Pokémon can crush a car with no more than a headbutt. Bouffalant with more hair on their heads hold higher positions within the herd.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/136/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/136/high.webp"
    }
  },
  {
    "id": "svp-137",
    "name": "Horsea",
    "number": "137",
    "artist": "MAHOU",
    "rarity": "Promo",
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
        "name": "Hook",
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
      "small": "https://assets.tcgdex.net/en/sv/svp/137/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/137/high.webp"
    }
  },
  {
    "id": "svp-138",
    "name": "Porygon2",
    "number": "138",
    "artist": "GOSSAN",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Porygon",
    "evolvesTo": [
      "Porygon-Z"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Powered Ball",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "Discard an Energy from this Pokémon."
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
      233
    ],
    "flavorText": "After artificial intelligence was implemented in Porygon2, the Pokémon began using a strange language that only other Porygon2 understand.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/138/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/138/high.webp"
    }
  },
  {
    "id": "svp-139",
    "name": "Latias",
    "number": "139",
    "artist": "hncl",
    "rarity": "Promo",
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
    "abilities": [
      {
        "name": "Mist Float",
        "text": "If this Pokémon has any {P} Energy attached, it has no Retreat Cost.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Psychic Sphere",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
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
      380
    ],
    "flavorText": "It can telepathically communicate with people. It changes its appearance using its down that refracts light.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/139/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/139/high.webp"
    }
  },
  {
    "id": "svp-140",
    "name": "Tinkaton",
    "number": "140",
    "artist": "DOM",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Tinkatuff",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Knock Off",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "Discard a random card from your opponent's hand."
      },
      {
        "name": "Wild Press",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "220",
        "text": "This Pokémon also does 60 damage to itself."
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
      959
    ],
    "flavorText": "This intelligent Pokémon has a very daring disposition. It knocks rocks into the sky with its hammer, aiming for flying Corviknight.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/140/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/140/high.webp"
    }
  },
  {
    "id": "svp-141",
    "name": "Noctowl",
    "number": "141",
    "artist": "Tetsu Kayama",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Hoothoot",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Jewel Seeker",
        "text": "Once during your turn, when you play this Pokémon from your hand to evolve 1 of your Pokémon, if you have any Tera Pokémon in play, you may search your deck for up to 2 Trainer cards, reveal them, and put them into your hand. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Speed Wing",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      164
    ],
    "flavorText": "Its extremely soft wings make no sound in flight. It silently sneaks up on prey without being detected.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/141/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/141/high.webp"
    }
  },
  {
    "id": "svp-142",
    "name": "Victini ex",
    "number": "142",
    "artist": "Saki Hayashiro",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "190",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Strafe",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "You may switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Victory Flame",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "220",
        "text": "During your next turn, this Pokémon can't attack."
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/142/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/142/high.webp"
    }
  },
  {
    "id": "svp-143",
    "name": "Miraidon ex",
    "number": "143",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "220",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Rapid Draw",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Draw 2 cards."
      },
      {
        "name": "Techno Turbo",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Attach a Basic {L} Energy card from your discard pile to 1 of your Benched Pokémon."
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
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      1008
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/143/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/143/high.webp"
    }
  },
  {
    "id": "svp-144",
    "name": "Gouging Fire ex",
    "number": "144",
    "artist": "PLANETA Mochizuki",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex",
      "Ancient"
    ],
    "hp": "230",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Heat Blast",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": ""
      },
      {
        "name": "Blaze Blitz",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "260",
        "text": "This Pokémon can't use Blaze Blitz again until it leaves the Active Spot."
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
      1020
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/144/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/144/high.webp"
    }
  },
  {
    "id": "svp-145",
    "name": "Raging Bolt ex",
    "number": "145",
    "artist": "PLANETA Mochizuki",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex",
      "Ancient"
    ],
    "hp": "240",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Burst Roar",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard your hand and draw 6 cards."
      },
      {
        "name": "Bellowing Thunder",
        "cost": [
          "Lightning",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "70×",
        "text": "You may discard any amount of Basic Energy from your Pokémon. This attack does 70 damage for each card you discarded in this way."
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
      1021
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/145/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/145/high.webp"
    }
  },
  {
    "id": "svp-146",
    "name": "Iron Crown ex",
    "number": "146",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex",
      "Future"
    ],
    "hp": "220",
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
        "name": "Cobalt Command",
        "text": "Attacks used by your Future Pokémon, except any Iron Crown ex, do 20 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Twin Shotels",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 50 damage to 2 of your opponent's Pokémon. This attack's damage isn't affected by Weakness or Resistance, or by any effects on those Pokémon."
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
      1023
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/146/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/146/high.webp"
    }
  },
  {
    "id": "svp-147",
    "name": "Iron Boulder ex",
    "number": "147",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex",
      "Future"
    ],
    "hp": "240",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Repulsor Axe",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "During your opponent's next turn, if this Pokémon is damaged by an attack (even if it is Knocked Out), put 8 damage counters on the Attacking Pokémon."
      },
      {
        "name": "Power Stomp",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
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
      1022
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/147/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/147/high.webp"
    }
  },
  {
    "id": "svp-148",
    "name": "Miraidon",
    "number": "148",
    "artist": "hncl",
    "rarity": "Promo",
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
        "name": "Electric Claws",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Mach Bolt",
        "cost": [
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
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
      1008
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/148/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/148/high.webp"
    }
  },
  {
    "id": "svp-149",
    "name": "Pecharunt",
    "number": "149",
    "artist": "Souichirou Gunjima",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Toxic Subjugation",
        "text": "As long as this Pokémon is in the Active Spot, put 5 more damage counters on your opponent's Poisoned Pokémon during Pokémon Checkup.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Poison Chain",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Your opponent's Active Pokémon is now Poisoned. During your opponent's next turn, that Pokémon can't retreat."
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
      1025
    ],
    "flavorText": "Its peach-shaped shell serves as storage for a potent poison. It makes poisonous mochi and serves them to people and Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/149/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/149/high.webp"
    }
  },
  {
    "id": "svp-150",
    "name": "Paradise Resort",
    "number": "150",
    "artist": "Naoki Saito",
    "rarity": "Promo",
    "supertype": "Trainer",
    "subtypes": [
      "Stadium"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "The Retreat Cost of each Psyduck in play (both yours and your opponent's) is Colorless less.",
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
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/150/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/150/high.webp"
    }
  },
  {
    "id": "svp-151",
    "name": "Gouging Fire",
    "number": "151",
    "artist": "Hasuno",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Ancient"
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
        "name": "Lunge Out",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Blazing Charge",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100+",
        "text": "If your opponent has 4 or fewer Prize cards remaining, this attack does 70 more damage."
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
      1020
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/151/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/151/high.webp"
    }
  },
  {
    "id": "svp-152",
    "name": "Chien-Pao",
    "number": "152",
    "artist": "toi8",
    "rarity": "Promo",
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
        "name": "Snow Sink",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may discard a Stadium in play.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Icicle Loop",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Put an Energy attached to this Pokémon into your hand."
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
      1002
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/152/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/152/high.webp"
    }
  },
  {
    "id": "svp-153",
    "name": "Magneton",
    "number": "153",
    "artist": "Shinya Mizuno",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Magnemite",
    "evolvesTo": [
      "Magnezone"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Overvolt Discharge",
        "text": "Once during your turn, you may attach up to 3 Basic Energy cards from your discard pile to your {L} Pokémon in any way you like. If you use this Ability, this Pokémon is Knocked Out.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Electric Ball",
        "cost": [
          "Lightning",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      82
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/153/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/153/high.webp"
    }
  },
  {
    "id": "svp-154",
    "name": "Indeedee",
    "number": "154",
    "artist": "buchi",
    "rarity": "Promo",
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
    "abilities": [
      {
        "name": "Obliging Heal",
        "text": "When you play this Pokémon from your hand onto your Bench during your turn, you may heal 30 damage from your Active Pokémon and have it recover from a Special Condition.",
        "type": "Ability"
      }
    ],
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
      876
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/154/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/154/high.webp"
    }
  },
  {
    "id": "svp-155",
    "name": "Wooper",
    "number": "155",
    "artist": "Saboteri",
    "rarity": "Promo",
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
      "Quagsire"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scoop Water",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Shuffle up to 3 Basic {W} Energy cards from your discard pile into your deck."
      },
      {
        "name": "Headbutt",
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
      194
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/155/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/155/high.webp"
    }
  },
  {
    "id": "svp-156",
    "name": "Quagsire",
    "number": "156",
    "artist": "Saboteri",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wooper",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rollout",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Drenched Headbutt",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80×",
        "text": "Discard the top 3 cards of your deck, and this attack does 80 damage for each Energy card you discarded in this way."
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
      195
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/156/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/156/high.webp"
    }
  },
  {
    "id": "svp-157",
    "name": "Zapdos",
    "number": "157",
    "artist": "Nisota Niso",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Follow-Up Bolt",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 10 more damage for each damage counter on your opponent's Active Pokémon."
      },
      {
        "name": "Drill Peck",
        "cost": [
          "Lightning",
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
        "value": "-30"
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/157/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/157/high.webp"
    }
  },
  {
    "id": "svp-158",
    "name": "Pachirisu",
    "number": "158",
    "artist": "Yuya Oka",
    "rarity": "Promo",
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
        "name": "Crackling Charge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip 3 coins. Attach a number of Basic {L} Energy cards up to the number of heads from your discard pile to your Benched Pokémon in any way you like."
      },
      {
        "name": "Tiny Bolt",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      417
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/158/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/158/high.webp"
    }
  },
  {
    "id": "svp-159",
    "name": "Magneton",
    "number": "159",
    "artist": "Shinji Kanda",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Magnemite",
    "evolvesTo": [
      "Magnezone"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Overvolt Discharge",
        "text": "Once during your turn, you may attach up to 3 Basic Energy cards from your discard pile to your {L} Pokémon in any way you like. If you use this Ability, this Pokémon is Knocked Out.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Electric Ball",
        "cost": [
          "Lightning",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      82
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/159/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/159/high.webp"
    }
  },
  {
    "id": "svp-160",
    "name": "Squawkabilly ex",
    "number": "160",
    "artist": "N-DESIGN Inc.",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "160",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Squawk and Seize",
        "text": "Once during your first turn, you may discard your hand and draw 6 cards. You can't use more than 1 Squawk and Seize Ability during your turn.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Motivate",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Attach up to 2 Basic Energy cards from your discard pile to 1 of your Benched Pokémon."
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
      931
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "G",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/160/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/160/high.webp"
    }
  },
  {
    "id": "svp-161",
    "name": "Charizard ex",
    "number": "161",
    "artist": "PLANETA Mochizuki",
    "rarity": "Promo",
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
      "small": "https://assets.tcgdex.net/en/sv/svp/161/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/161/high.webp"
    }
  },
  {
    "id": "svp-162",
    "name": "Houndstone ex",
    "number": "162",
    "artist": "takuyoa",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "260",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Greavard",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Horrifying Fang",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100+",
        "text": "Flip a coin until you get tails. This attack does 20 more damage for each heads."
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
      972
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/162/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/162/high.webp"
    }
  },
  {
    "id": "svp-163",
    "name": "Cinderace ex",
    "number": "163",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Tera",
      "ex"
    ],
    "hp": "320",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Raboot",
    "evolvesTo": [],
    "rules": [
      "As long as this Pokémon is on your Bench, prevent all damage done to this Pokémon by attacks (both yours and your opponent's).",
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Flare Strike",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "280",
        "text": "During your next turn, this Pokémon can't use Flare Strike."
      },
      {
        "name": "Garnet Volley",
        "cost": [
          "Fire",
          "Fighting",
          "Darkness"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 180 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      815
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/163/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/163/high.webp"
    }
  },
  {
    "id": "svp-164",
    "name": "Lapras ex",
    "number": "164",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Tera",
      "ex"
    ],
    "hp": "220",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "As long as this Pokémon is on your Bench, prevent all damage done to this Pokémon by attacks (both yours and your opponent's).",
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Power Splash",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "40×",
        "text": "This attack does 40 damage for each Energy attached to this Pokémon."
      },
      {
        "name": "Larimar Rain",
        "cost": [
          "Water",
          "Psychic",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Look at the top 20 cards of your deck and attach any number of Energy cards you find there to your Pokémon in any way you like. Shuffle the other cards back into your deck."
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
      131
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/164/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/164/high.webp"
    }
  },
  {
    "id": "svp-165",
    "name": "Terapagos ex",
    "number": "165",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Tera",
      "ex"
    ],
    "hp": "230",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "As long as this Pokémon is on your Bench, prevent all damage done to this Pokémon by attacks (both yours and your opponent's).",
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Unified Beatdown",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "If you go second, you can't use this attack during your first turn. This attack does 30 damage for each of your Benched Pokémon."
      },
      {
        "name": "Crown Opal",
        "cost": [
          "Grass",
          "Water",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "180",
        "text": "During your opponent's next turn, prevent all damage done to this Pokémon by attacks from Basic non-{C} Pokémon."
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
      1024
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/165/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/165/high.webp"
    }
  },
  {
    "id": "svp-166",
    "name": "Teal Mask Ogerpon ex",
    "number": "166",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "210",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      1017
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/166/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/166/high.webp"
    },
    "rules": [],
    "abilities": [
      {
        "name": "Teal Dance",
        "text": "Once during your turn, you may attach a Basic {G} Energy card from your hand to this Pokémon. If you attached Energy to a Pokémon in this way, draw a card.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Myriad Leaf Shower",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "This attack does 30 more damage for each Energy attached to both Active Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-167",
    "name": "Flareon",
    "number": "167",
    "artist": "SIE NANAHARA",
    "rarity": "Promo",
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
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      136
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/167/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/167/high.webp"
    },
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
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "G"
  },
  {
    "id": "svp-168",
    "name": "Vaporeon",
    "number": "168",
    "artist": "Taira Akitsu",
    "rarity": "Promo",
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
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      134
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/168/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/168/high.webp"
    },
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
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "G"
  },
  {
    "id": "svp-169",
    "name": "Jolteon",
    "number": "169",
    "artist": "Nisota Niso",
    "rarity": "Promo",
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
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      135
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/169/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/169/high.webp"
    },
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
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "G"
  },
  {
    "id": "svp-170",
    "name": "Leafeon",
    "number": "170",
    "artist": "Iori Suzuki",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      470
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/170/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/170/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Leaflet Blessings",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach a Basic {G} Energy card from your hand to 1 of your Benched Pokémon. If you do, heal all damage from that Pokémon."
      },
      {
        "name": "Solar Beam",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": ""
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-171",
    "name": "Glaceon",
    "number": "171",
    "artist": "Keisin",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      471
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/171/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/171/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Permeating Chill",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "At the end of your opponent's next turn, put 9 damage counters on the Defending Pokémon."
      },
      {
        "name": "Icicle Missile",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": ""
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-172",
    "name": "Sylveon",
    "number": "172",
    "artist": "Susumu Maeya",
    "rarity": "Promo",
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
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      700
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/172/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/172/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mystical Return",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, choose 1 of your opponent's Benched Pokémon. Shuffle that Pokémon and all attached cards into their deck."
      },
      {
        "name": "Disarming Voice",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Your opponent's Active Pokémon is now Confused."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-173",
    "name": "Eevee",
    "number": "173",
    "artist": "Makura Tami",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      133
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/173/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/173/high.webp"
    },
    "rules": [],
    "abilities": [
      {
        "name": "Boosted Evolution",
        "text": "As long as this Pokémon is in the Active Spot, it can evolve during your first turn or the turn you play it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Reckless Charge",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "This Pokémon also does 10 damage to itself."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-174",
    "name": "Eevee ex",
    "number": "174",
    "artist": "Natsuko Shoji été",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "200",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      133
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/174/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/174/high.webp"
    },
    "rules": [],
    "abilities": [
      {
        "name": "Rainbow DNA",
        "text": "This Pokémon can evolve into any Pokémon ex that evolves from Eevee if you play it from your hand onto this Pokémon. (This Pokémon can't evolve during your first turn or the turn you play it.)",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Coruscating Quartz",
        "cost": [
          "Fire",
          "Water",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": ""
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-175",
    "name": "Espeon ex",
    "number": "175",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "270",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      196
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/175/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/175/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psych Out",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Discard a random card from your opponent's hand."
      },
      {
        "name": "Amazez",
        "cost": [
          "Grass",
          "Psychic",
          "Darkness"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Devolve each of your opponent's evolved Pokémon by shuffling the highest Stage Evolution card on it into your opponent's deck."
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-176",
    "name": "Umbreon ex",
    "number": "176",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "280",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      197
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/176/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/176/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Moon Mirage",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Your opponent's Active Pokémon is now Confused."
      },
      {
        "name": "Onyx",
        "cost": [
          "Lightning",
          "Psychic",
          "Darkness"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard all Energy from this Pokémon, and take a Prize card."
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-177",
    "name": "Bloodmoon Ursaluna ex",
    "number": "177",
    "artist": "aky CG Works",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "260",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      901
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/177/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/177/high.webp"
    },
    "rules": [],
    "abilities": [
      {
        "name": "Seasoned Skill",
        "text": "Blood Moon used by this Pokémon costs {C} less for each Prize card your opponent has taken.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Blood Moon",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "240",
        "text": "During your next turn, this Pokémon can't attack."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-178",
    "name": "Kyogre ex",
    "number": "178",
    "artist": "takuyoa",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "230",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      382
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/178/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/178/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Winding Waves",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "You may switch out your opponent's Active Pokémon to the Bench. (Your opponent chooses the new Active Pokémon.)"
      },
      {
        "name": "Tidal Surge",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "230",
        "text": "Discard 2 Energy from this Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-179",
    "name": "Xerneas ex",
    "number": "179",
    "artist": "PLANETA Igarashi",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "210",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      716
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/179/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/179/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Aurora Beam",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Rising Horns",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120+",
        "text": "If your opponent's Active Pokémon is a Pokémon ex, this attack does 100 more damage."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-180",
    "name": "Dialga ex",
    "number": "180",
    "artist": "PLANETA Tsuji",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "220",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      483
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/180/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/180/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Time Bellow",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Draw a card."
      },
      {
        "name": "Metal Blast",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100+",
        "text": "This attack does 20 more damage for each {M} Energy attached to this Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-181",
    "name": "N's Darmanitan",
    "number": "181",
    "artist": "Takeshi Nakamura",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "N's Darumaka",
    "evolvesTo": [],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      555
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/181/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/181/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Back Draft",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "This attack does 30 damage for each Basic Energy card in your opponent's discard pile."
      },
      {
        "name": "Flamebody Cannon",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Discard all Energy from this Pokémon, and this attack also does 90 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-182",
    "name": "Iono's Kilowattrel",
    "number": "182",
    "artist": "DOM",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Iono's Wattrel",
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      941
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/182/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/182/high.webp"
    },
    "rules": [],
    "abilities": [
      {
        "name": "Flashing Draw",
        "text": "You must discard a Basic {L} Energy from this Pokémon in order to use this Ability. Once during your turn, you may draw cards until you have 6 cards in your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Mach Bolt",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": ""
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-183",
    "name": "Lillie's Ribombee",
    "number": "183",
    "artist": "tono",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Lillie's Cutiefly",
    "evolvesTo": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      743
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/183/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/183/high.webp"
    },
    "rules": [],
    "abilities": [
      {
        "name": "Inviting Wink",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may have your opponent reveal their hand and you put any number of Basic Pokémon you find there onto their Bench.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Magical Shot",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": ""
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-184",
    "name": "Hop's Snorlax",
    "number": "184",
    "artist": "OKACHEKE",
    "rarity": "Promo",
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
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      143
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/184/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/184/high.webp"
    },
    "rules": [],
    "abilities": [
      {
        "name": "Extra Helpings",
        "text": "Attacks used by your Hop's Pokémon do 30 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance). The effect of Extra Helpings doesn't stack.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dynamic Press",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "140",
        "text": "This Pokémon also does 80 damage to itself."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-185",
    "name": "Yanma",
    "number": "185",
    "artist": "Dsuke",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      193
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/185/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/185/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Silent Wing",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Your opponent reveals their hand."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-186",
    "name": "Scraggy",
    "number": "186",
    "artist": "OKUBO",
    "rarity": "Promo",
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
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      559
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/186/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/186/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Kick Shot",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If tails, this attack does nothing."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-187",
    "name": "Yanmega",
    "number": "187",
    "artist": "Dsuke",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Yanma",
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      469
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/187/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/187/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gyro Shockwave",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-188",
    "name": "Scrafty",
    "number": "188",
    "artist": "OKUBO",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Scraggy",
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      560
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/188/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/188/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Nab 'n' Dash",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a number of cards up to the number of your Benched Pokémon and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "High Jump Kick",
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
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-189",
    "name": "N's Zorua",
    "number": "189",
    "artist": "Megumi Mizutani",
    "rarity": "Promo",
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
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      570
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/189/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/189/high.webp"
    },
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
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-190",
    "name": "Pikachu",
    "number": "190",
    "artist": "Atsushi Furusawa",
    "rarity": "Promo",
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
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      25
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/190/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/190/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scrappy Spark",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Flip a coin until you get tails. This attack does 30 more damage for each heads."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-191",
    "name": "Sprigatito",
    "number": "191",
    "artist": "Yamazaki Rei",
    "rarity": "Promo",
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
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      906
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/191/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/191/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scratch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Leafage",
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
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "G"
  },
  {
    "id": "svp-192",
    "name": "Fuecoco",
    "number": "192",
    "artist": "Ito Kyoko",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      909
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/192/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/192/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tackle",
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
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "G"
  },
  {
    "id": "svp-193",
    "name": "Hop's Zacian ex",
    "number": "193",
    "artist": "PLANETA Mochizuki",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "230",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      888
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/193/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/193/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Insta-Strike",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This attack also does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Brave Slash",
        "cost": [
          "Metal",
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "240",
        "text": "During your next turn, this Pokémon can't use Brave Slash."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-194",
    "name": "Iono's Bellibolt ex",
    "number": "194",
    "artist": "PLANETA Mochizuki",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "280",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Iono's Tadbulb",
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      939
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/194/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/194/high.webp"
    },
    "rules": [],
    "abilities": [
      {
        "name": "Electric Streamer",
        "text": "As often as you like during your turn, you may attach a Basic {L} Energy card from your hand to 1 of your Iono's Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Thunderous Bolt",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "230",
        "text": "During your next turn, this Pokémon can't attack."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-195",
    "name": "Lillie's Clefairy ex",
    "number": "195",
    "artist": "PLANETA Tsuji",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "190",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      35
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/195/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/195/high.webp"
    },
    "rules": [],
    "abilities": [
      {
        "name": "Fairy Zone",
        "text": "The Weakness of each of your opponent's {N} Pokémon in play is now {P}. (Apply Weakness as ×2.)",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Full Moon Rondo",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 20 more damage for each Benched Pokémon (both yours and your opponent's)."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-196",
    "name": "Charizard ex",
    "number": "196",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "330",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      6
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/196/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/196/high.webp"
    },
    "rules": [],
    "abilities": [
      {
        "name": "Infernal Reign",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may search your deck for up to 3 Basic {R} Energy cards and attach them to your Pokémon in any way you like. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Burning Darkness",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "180+",
        "text": "This attack does 30 more damage for each Prize card your opponent has taken."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "x2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "G"
  },
  {
    "id": "svp-197",
    "name": "Koraidon ex",
    "number": "197",
    "artist": "PLANETA Tsuji",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "230",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      1007
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/197/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/197/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Claw Slash",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Revenge Buster",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100+",
        "text": "If your Benched Pokémon have any damage counters on them, this attack does 120 more damage."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-198",
    "name": "Zacian ex",
    "number": "198",
    "artist": "PLANETA Mochizuki",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "220",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      888
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/198/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/198/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Steel Armament",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Search your deck for a Basic {M} Energy card and attach it to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Slashing Strike",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "210",
        "text": "During your next turn, this Pokémon can't use Slashing Strike."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-199",
    "name": "Zarude",
    "number": "199",
    "artist": "Uninori",
    "rarity": "Promo",
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
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      893
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/199/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/199/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pluck Off",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 Basic {G} Energy cards, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Hammer Whip",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "During your next turn, this Pokémon can't attack."
      }
    ],
    "weaknesses": [
      {
        "type": "Fire",
        "value": "x2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-200",
    "name": "Eevee",
    "number": "200",
    "artist": "Kariya",
    "rarity": "Promo",
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
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      133
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/200/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/200/high.webp"
    },
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
        "text": "Search your deck for a Basic Pokémon and put it onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Gnaw",
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
        "value": "x2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-201",
    "name": "Zebstrika",
    "number": "201",
    "artist": "Krgc",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Blitzle",
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      523
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/201/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/201/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Full Speed",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard your hand and draw 6 cards."
      },
      {
        "name": "Head Bolt",
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
        "value": "x2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-202",
    "name": "Kangaskhan",
    "number": "202",
    "artist": "Uta",
    "rarity": "Promo",
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
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      115
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/202/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/202/high.webp"
    },
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
        "text": "Search your deck for a Basic Pokémon and put it onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Mega Punch",
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
        "value": "x2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-203",
    "name": "Team Rocket's Wobbuffet",
    "number": "203",
    "artist": "Saboteri",
    "rarity": "Promo",
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
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      202
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/203/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/203/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rocket Mirror",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Move all damage counters from 1 of your Benched Team Rocket's Pokémon to your opponent's Active Pokémon."
      },
      {
        "name": "Headbutt Bounce",
        "cost": [
          "Psychic",
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
        "type": "Darkness",
        "value": "x2"
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-204",
    "name": "Cynthia's Garchomp ex",
    "number": "204",
    "artist": "PLANETA Igarashi",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "330",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Cynthia's Gabite",
    "evolvesTo": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      445
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/204/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/204/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Corkscrew Dive",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "100",
        "text": "You may draw cards until you have 6 cards in your hand."
      },
      {
        "name": "Draconic Buster",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "260",
        "text": "Discard all Energy from this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "x2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-205",
    "name": "Team Rocket's Mewtwo ex",
    "number": "205",
    "artist": "aky CG Works",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "280",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      150
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/205/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/205/high.webp"
    },
    "rules": [],
    "abilities": [
      {
        "name": "Power Saver",
        "text": "This Pokémon can't attack unless you have 4 or more Team Rocket's Pokémon in play.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Erasure Ball",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160+",
        "text": "You may discard up to 2 Energy from your Benched Pokémon. This attack does 60 more damage for each card you discarded in this way."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "x2"
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-206",
    "name": "Marnie's Morpeko",
    "number": "206",
    "artist": "Susumu Maeya",
    "rarity": "Promo",
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
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      877
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/206/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/206/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spiky Wheel",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20+",
        "text": "This attack does 40 more damage for each {D} Energy attached to this Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-207",
    "name": "Steven's Beldum",
    "number": "207",
    "artist": "hncl",
    "rarity": "Promo",
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
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      374
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/207/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/207/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ram",
        "cost": [
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-208",
    "name": "Victini",
    "number": "208",
    "artist": "Amelicart",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      494
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/208/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/208/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "V-Force",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "If you have 4 or fewer Benched Pokémon, this attack does nothing."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "x2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-209",
    "name": "Thundurus",
    "number": "209",
    "artist": "Anesaki Dynamic",
    "rarity": "Promo",
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
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      642
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/209/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/209/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Charge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Basic {L} Energy card and attach it to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Disaster Volt",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "Discard an Energy from this Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "x2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-210",
    "name": "Tornadus",
    "number": "210",
    "artist": "Kouki Saitou",
    "rarity": "Promo",
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
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      641
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/210/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/210/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wrapped in Wind",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach a Basic Energy card from your hand to this Pokémon."
      },
      {
        "name": "Hurricane",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "Move a Basic Energy from this Pokémon to 1 of your Benched Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "x2"
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-211",
    "name": "Gothitelle",
    "number": "211",
    "artist": "IKEDA Saki",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Gothorita",
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      576
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/211/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/211/high.webp"
    },
    "rules": [],
    "abilities": [
      {
        "name": "Distorted Future",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may have your opponent shuffle their hand into their deck and draw 3 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Synchro Shot",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90+",
        "text": "If you have the same number of cards in your hand as your opponent, this attack does 90 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "x2"
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-212",
    "name": "Reuniclus",
    "number": "212",
    "artist": "satoma",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Duosion",
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      579
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/212/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/212/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Cellular Ascension",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "For each of your Benched Pokémon, search your deck for a card that evolves from that Pokémon and put it onto that Pokémon to evolve it. Then, shuffle your deck."
      },
      {
        "name": "Evo-Lariat",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "40+",
        "text": "This attack does 40 more damage for each of your Evolution Pokémon in play."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "x2"
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-213",
    "name": "Feraligatr",
    "number": "213",
    "artist": "Acorviart",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Croconaw",
    "evolvesTo": [],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      160
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/213/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/213/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Deep Submergence",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "140",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage from and effects of attacks done to this Pokémon."
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-214",
    "name": "Pikachu",
    "number": "214",
    "artist": "Kazuki Minami",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      25
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/214/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/214/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Unwind",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 20 damage from this Pokémon."
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-215",
    "name": "Toxtricity ex",
    "number": "215",
    "artist": "Anderson",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "260",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Toxel",
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      849
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/215/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/215/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Strumming Thunder",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "240",
        "text": "Discard 2 Energy from this Pokémon."
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-216",
    "name": "Team Rocket's Mewtwo ex",
    "number": "216",
    "artist": "aky CG Works",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "280",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      150
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/216/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/216/high.webp"
    },
    "rules": [],
    "abilities": [
      {
        "name": "Power Saver",
        "text": "This Pokémon can't attack unless you have 4 or more Team Rocket's Pokémon in play.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Erasure Ball",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160+",
        "text": "You may discard up to 2 Energy from your Benched Pokémon. This attack does 60 more damage for each card you discarded in this way."
      }
    ],
    "weaknesses": [
      {
        "type": "Darkness",
        "value": "x2"
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-217",
    "name": "Team Rocket's Nidoking ex",
    "number": "217",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "330",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Team Rocket's Nidorino",
    "evolvesTo": [],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      34
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/217/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/217/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tainted Horn",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "Your opponent's Active Pokémon is now Poisoned. During Pokémon Checkup, put 8 damage counters on that Pokémon instead of 1."
      },
      {
        "name": "Kingly Impact",
        "cost": [
          "Darkness",
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "240",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "x2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-218",
    "name": "Team Rocket's Persian ex",
    "number": "218",
    "artist": "5ban Graphics",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "260",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Team Rocket's Meowth",
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      53
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/218/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/218/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Haughty Order",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Reveal the top 10 cards of your opponent's deck. You may choose an attack from a Pokémon you find there and use it as this attack. Shuffle the revealed cards into your opponent's deck."
      },
      {
        "name": "Cruel Slash",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "140",
        "text": "Your opponent's Active Pokémon is now Confused."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "x2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-219",
    "name": "Black Belt's Training",
    "number": "219",
    "artist": "GOSSAN",
    "rarity": "Promo",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/219/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/219/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-220",
    "name": "Black Belt's Training",
    "number": "220",
    "artist": "GOSSAN",
    "rarity": "Promo",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/220/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/220/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "H"
  },
  {
    "id": "svp-221",
    "name": "Professor's Research",
    "number": "221",
    "artist": "Hideki Ishikawa",
    "rarity": "Promo",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/221/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/221/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "G"
  },
  {
    "id": "svp-222",
    "name": "Professor's Research",
    "number": "222",
    "artist": "Hideki Ishikawa",
    "rarity": "Promo",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/222/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/222/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "G"
  },
  {
    "id": "svp-223",
    "name": "Professor's Research",
    "number": "223",
    "artist": "Taira Akitsu",
    "rarity": "Promo",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/223/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/223/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "G"
  },
  {
    "id": "svp-224",
    "name": "Paradise Resort",
    "number": "224",
    "artist": "Naoki Saito",
    "rarity": "Promo",
    "supertype": "Trainer",
    "subtypes": [
      "Stadium"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/224/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/224/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-225",
    "name": "Pikachu",
    "number": "225",
    "artist": "DOM",
    "rarity": "Promo",
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
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      25
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/225/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/225/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scrappy Spark",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Flip a coin until you get tails. This attack does 30 more damage for each heads."
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": "I"
  },
  {
    "id": "svp-500",
    "name": "Terapagos & Friends",
    "number": "500",
    "artist": "Yamazaki Rei",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      1024,
      25,
      906,
      909,
      912
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/svp/500/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/svp/500/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "A Grand Adventure with Friends",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100×",
        "text": "This attack does 100 damage for each of your Pokémon in play."
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": null
  }
]

export default cardDetails
