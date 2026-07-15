import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "mcd12-1",
    "name": "Servine",
    "number": "1",
    "artist": "Kagemaru Himeno",
    "rarity": null,
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Snivy",
    "evolvesTo": [
      "Serperior"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wrap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Tackle",
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
      496
    ],
    "flavorText": "They avoid attacks by sinking into the shadows of thick foliage. They retaliate with masterful whipping techniques.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/mcd12/1.png",
      "large": "https://images.pokemontcg.io/mcd12/1_hires.png"
    }
  },
  {
    "id": "mcd12-2",
    "name": "Pansage",
    "number": "2",
    "artist": "Kouki Saitou",
    "rarity": null,
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
      "Simisage"
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
        "name": "Scratch",
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
      511
    ],
    "flavorText": "This Pokémon dwells deep in the forest. Eating a leaf from its head whisks weariness away as if by magic.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/mcd12/2.png",
      "large": "https://images.pokemontcg.io/mcd12/2_hires.png"
    }
  },
  {
    "id": "mcd12-3",
    "name": "Dwebble",
    "number": "3",
    "artist": "MAHOU",
    "rarity": null,
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
      "Crustle"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Withdraw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, prevent all damage done to this Pokémon by attacks during your opponent's next turn."
      },
      {
        "name": "Slash",
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
      557
    ],
    "flavorText": "The Pokémon can easily melt holes in hard rocks with a liquid secreted from its mouth.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/mcd12/3.png",
      "large": "https://images.pokemontcg.io/mcd12/3_hires.png"
    }
  },
  {
    "id": "mcd12-4",
    "name": "Pignite",
    "number": "4",
    "artist": "Kouki Saitou",
    "rarity": null,
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Tepig",
    "evolvesTo": [
      "Emboar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flame Charge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Fire Energy card and attach it to this Pokémon. Shuffle your deck afterward."
      },
      {
        "name": "Heat Crash",
        "cost": [
          "Fire",
          "Fire",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      499
    ],
    "flavorText": "When its internal fire flares up, its movements grow sharper and faster. When in trouble, it emits smoke.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/mcd12/4.png",
      "large": "https://images.pokemontcg.io/mcd12/4_hires.png"
    }
  },
  {
    "id": "mcd12-5",
    "name": "Dewott",
    "number": "5",
    "artist": "Masakazu Fukuda",
    "rarity": null,
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Oshawott",
    "evolvesTo": [
      "Samurott"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Water Gun",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Razor Shell",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
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
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      502
    ],
    "flavorText": "Scalchop techniques differ from one Dewott to another. It never neglects maintaining its scalchops.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/mcd12/5.png",
      "large": "https://images.pokemontcg.io/mcd12/5_hires.png"
    }
  },
  {
    "id": "mcd12-6",
    "name": "Emolga",
    "number": "6",
    "artist": "Kouki Saitou",
    "rarity": null,
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
        "name": "Thundershock",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Acrobatics",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip 2 coins. This attack does 20 more damage for each heads."
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
      587
    ],
    "flavorText": "The energy made in its cheeks' electric pouches is stored inside its membranes and released while it is gliding.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/mcd12/6.png",
      "large": "https://images.pokemontcg.io/mcd12/6_hires.png"
    }
  },
  {
    "id": "mcd12-7",
    "name": "Woobat",
    "number": "7",
    "artist": "Masakazu Fukuda",
    "rarity": null,
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
      "Swoobat"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psy Bolt",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      527
    ],
    "flavorText": "Its habitat is dark forests and caves. It emits ultrasonic waves from its nose to learn about its surroundings.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/mcd12/7.png",
      "large": "https://images.pokemontcg.io/mcd12/7_hires.png"
    }
  },
  {
    "id": "mcd12-8",
    "name": "Drilbur",
    "number": "8",
    "artist": "match",
    "rarity": null,
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
      "Excadrill"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hone ClawsScratch",
        "cost": [
          "Colorless",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "During your next turn, each of this Pokémon's attacks does 30 more damage (before applying Weakness and Resistance)."
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
      529
    ],
    "flavorText": "It can dig through the ground at a speed of 30 mph. It could give a car running aboveground a good race.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/mcd12/8.png",
      "large": "https://images.pokemontcg.io/mcd12/8_hires.png"
    }
  },
  {
    "id": "mcd12-9",
    "name": "Purrloin",
    "number": "9",
    "artist": "Atsuko Nishida",
    "rarity": null,
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
      "Liepard"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Knock Off",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, discard a random card from your opponent's hand."
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
    "flavorText": "They steal from people for fun, but their victims can't help but forgive them. Their deceptively cute act is perfect.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/mcd12/9.png",
      "large": "https://images.pokemontcg.io/mcd12/9_hires.png"
    }
  },
  {
    "id": "mcd12-10",
    "name": "Scraggy",
    "number": "10",
    "artist": "Masakazu Fukuda",
    "rarity": null,
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
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      559
    ],
    "flavorText": "Its skin has a rubbery elasticity, so it can reduce damage by defensively pulling its skin up to its neck.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/mcd12/10.png",
      "large": "https://images.pokemontcg.io/mcd12/10_hires.png"
    }
  },
  {
    "id": "mcd12-11",
    "name": "Klang",
    "number": "11",
    "artist": "Kouki Saitou",
    "rarity": null,
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
        "name": "Metal Sound",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Confused."
      },
      {
        "name": "Guard Press",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
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
      600
    ],
    "flavorText": "Spinning minigears are rotated at high speed and repeatedly fired away. It is dangerous if the gears don't return.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/mcd12/11.png",
      "large": "https://images.pokemontcg.io/mcd12/11_hires.png"
    }
  },
  {
    "id": "mcd12-12",
    "name": "Axew",
    "number": "12",
    "artist": "Atsuko Nishida",
    "rarity": null,
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
      "Fraxure"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dual Chop",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 2 coins. This attack does 10 damage times the number of heads."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      610
    ],
    "flavorText": "They use their tusks to crush the berries they eat. Repeated regrowth makes their tusks strong and sharp.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/mcd12/12.png",
      "large": "https://images.pokemontcg.io/mcd12/12_hires.png"
    }
  }
]

export default cardDetails
