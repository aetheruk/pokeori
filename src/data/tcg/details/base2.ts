import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "base2-1",
    "name": "Clefable",
    "number": "1",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Clefairy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Metronome",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 1 of the Defending Pokémon's attacks. Metronome copies that attack except for its Energy costs and anything else required in order to use that attack, such as discarding Energy cards. (No matter what type the Defending Pokémon is, Clefable's type is still Colorless.)"
      },
      {
        "name": "Minimize",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "All damage done by attacks to Clefable during your opponent's next turn is reduced by 20 (after applying Weakness and Resistance)."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      36
    ],
    "flavorText": "A timid Fairy Pokémon that is rarely seen. It will run and hide the moment it senses people.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/1.png",
      "large": "https://images.pokemontcg.io/base2/1_hires.png"
    }
  },
  {
    "id": "base2-2",
    "name": "Electrode",
    "number": "2",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
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
        "name": "Tackle",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Chain Lightning",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "20",
        "text": "If the Defending Pokémon isn't Colorless, this attack does 10 damage to each Benched Pokémon of the same type as the Defending Pokémon (including your own)."
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
    "flavorText": "It stores electrical energy under very high pressure. It often explodes with little or no provocation.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/2.png",
      "large": "https://images.pokemontcg.io/base2/2_hires.png"
    }
  },
  {
    "id": "base2-3",
    "name": "Flareon",
    "number": "3",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Quick Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 20 more damage; if tails, this attack does 10 damage."
      },
      {
        "name": "Flamethrower",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "60",
        "text": "Discard 1 Fire Energy card attached to Flareon in order to use this attack."
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
    "flavorText": "When storing thermal energy in its body, its temperature could soar to over 1600 degrees.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/3.png",
      "large": "https://images.pokemontcg.io/base2/3_hires.png"
    }
  },
  {
    "id": "base2-4",
    "name": "Jolteon",
    "number": "4",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Quick Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 20 more damage; if tails, this attack does 10 damage."
      },
      {
        "name": "Pin Missile",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20×",
        "text": "Flip 4 coins. This attack does 20 damage times the number of heads."
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
      135
    ],
    "flavorText": "It accumulates negative ions from the atmosphere to blast out 10,000-volt lightning bolts.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/4.png",
      "large": "https://images.pokemontcg.io/base2/4_hires.png"
    }
  },
  {
    "id": "base2-5",
    "name": "Kangaskhan",
    "number": "5",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
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
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fetch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card."
      },
      {
        "name": "Comet Punch",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "20×",
        "text": "Flip 4 coins. This attack does 20 damage times the number of heads."
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      115
    ],
    "flavorText": "The infant rarely ventures out of its mother's protective pouch until it is three years old.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/5.png",
      "large": "https://images.pokemontcg.io/base2/5_hires.png"
    }
  },
  {
    "id": "base2-6",
    "name": "Mr. Mime",
    "number": "6",
    "artist": "Ken Sugimori",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Invisible Wall",
        "text": "Whenever an attack (including your own) does 30 or more damage to Mr. Mime (after applying Weakness and Resistance), prevent that damage. (Any other effects of attacks still happen.) This power can't be used if Mr. Mime is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Meditate",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each damage counter on the Defending Pokémon."
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
    "flavorText": "If interrupted while miming, it will slap around the enemy with its broad hands.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/6.png",
      "large": "https://images.pokemontcg.io/base2/6_hires.png"
    }
  },
  {
    "id": "base2-7",
    "name": "Nidoqueen",
    "number": "7",
    "artist": "Ken Sugimori",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Nidorina",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Boyfriends",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Does 20 damage plus 20 more damage for each Nidoking you have in play."
      },
      {
        "name": "Mega Punch",
        "cost": [
          "Grass",
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      31
    ],
    "flavorText": "Its hard scales provide strong protection. It uses its hefty bulk to execute powerful moves.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/7.png",
      "large": "https://images.pokemontcg.io/base2/7_hires.png"
    }
  },
  {
    "id": "base2-8",
    "name": "Pidgeot",
    "number": "8",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Pidgeotto",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wing Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Hurricane",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "Unless this attack Knocks Out the Defending Pokémon, return the Defending Pokémon and all cards attached to it to your opponent's hand."
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
    "flavorText": "When hunting, it skims the surface of water at high speed to pick off unwary prey such as Magikarp.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/8.png",
      "large": "https://images.pokemontcg.io/base2/8_hires.png"
    }
  },
  {
    "id": "base2-9",
    "name": "Pinsir",
    "number": "9",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
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
        "name": "Irongrip",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Guillotine",
        "cost": [
          "Grass",
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      127
    ],
    "flavorText": "If it fails to crush the victim in its pincers, it will swing its victim around and toss it hard.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/9.png",
      "large": "https://images.pokemontcg.io/base2/9_hires.png"
    }
  },
  {
    "id": "base2-10",
    "name": "Scyther",
    "number": "10",
    "artist": "Ken Sugimori",
    "rarity": "Rare Holo",
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
        "name": "Swords Dance",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your next turn, Scyther's Slash attack's base damage is 60 instead of 30."
      },
      {
        "name": "Slash",
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
        "type": "Fire",
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
      123
    ],
    "flavorText": "With ninja-like agility and speed, it can create the illusion that there is more than one of it.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/10.png",
      "large": "https://images.pokemontcg.io/base2/10_hires.png"
    }
  },
  {
    "id": "base2-11",
    "name": "Snorlax",
    "number": "11",
    "artist": "Ken Sugimori",
    "rarity": "Rare Holo",
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
    "rules": [],
    "abilities": [
      {
        "name": "Thick Skinned",
        "text": "Snorlax can't become Asleep, Confused, Paralyzed, or Poisoned. This power can't be used if Snorlax is already Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Body Slam",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
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
      143
    ],
    "flavorText": "Very lazy. Just eats and sleeps. As its rotund bulk builds, it becomes steadily more slothful.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/11.png",
      "large": "https://images.pokemontcg.io/base2/11_hires.png"
    }
  },
  {
    "id": "base2-12",
    "name": "Vaporeon",
    "number": "12",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Quick Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 20 more damage; if tails, this attack does 10 damage."
      },
      {
        "name": "Water Gun",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Does 30 damage plus 10 more damage for each Water Energy attached to Vaporeon but not used to pay for this attack's Energy cost. Extra Water Energy after the 2nd doesn't count."
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
      134
    ],
    "flavorText": "Lives close to water. Its long tail is ridged with a fin that is often mistaken for a mermaid's.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/12.png",
      "large": "https://images.pokemontcg.io/base2/12_hires.png"
    }
  },
  {
    "id": "base2-13",
    "name": "Venomoth",
    "number": "13",
    "artist": "Ken Sugimori",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Venonat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Shift",
        "text": "Once during your turn (before your attack), you may change the type of Venomoth to the type of any other Pokémon in play other than Colorless. This power can't be used if Venomoth is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Venom Powder",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused and Poisoned."
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
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      49
    ],
    "flavorText": "The dust-like scales covering its wings are color coded to indicate the kinds of poison it has.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/13.png",
      "large": "https://images.pokemontcg.io/base2/13_hires.png"
    }
  },
  {
    "id": "base2-14",
    "name": "Victreebel",
    "number": "14",
    "artist": "Ken Sugimori",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Weepinbell",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Lure",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If your opponent has any Benched Pokémon, choose 1 of them and switch it with his or her Active Pokémon."
      },
      {
        "name": "Acid",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon can't retreat during your next turn."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/14.png",
      "large": "https://images.pokemontcg.io/base2/14_hires.png"
    }
  },
  {
    "id": "base2-15",
    "name": "Vileplume",
    "number": "15",
    "artist": "Keiji Kinebuchi",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Gloom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Heal",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, remove 1 damage counter from 1 of your Pokémon. This power can't be used if Vileplume is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Petal Dance",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 3,
        "damage": "40×",
        "text": "Flip 3 coins. This attack does 40 damage times the number of heads. Vileplume is now Confused (after doing damage)."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/15.png",
      "large": "https://images.pokemontcg.io/base2/15_hires.png"
    }
  },
  {
    "id": "base2-16",
    "name": "Wigglytuff",
    "number": "16",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Jigglypuff",
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
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Do the Wave",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each of your Benched Pokémon."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      40
    ],
    "flavorText": "The body is soft and rubbery. When angered, it will suck in air and inflate itself to an enormous size.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/16.png",
      "large": "https://images.pokemontcg.io/base2/16_hires.png"
    }
  },
  {
    "id": "base2-17",
    "name": "Clefable",
    "number": "17",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Clefairy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Metronome",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 1 of the Defending Pokémon's attacks. Metronome copies that attack except for its Energy costs and anything else required in order to use that attack, such as discarding Energy cards. (No matter what type the Defending Pokémon is, Clefable's type is still Colorless.)"
      },
      {
        "name": "Minimize",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "All damage done by attacks to Clefable during your opponent's next turn is reduced by 20 (after applying Weakness and Resistance)."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      36
    ],
    "flavorText": "A timid Fairy Pokémon that is rarely seen. It will run and hide the moment it senses people.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/17.png",
      "large": "https://images.pokemontcg.io/base2/17_hires.png"
    }
  },
  {
    "id": "base2-18",
    "name": "Electrode",
    "number": "18",
    "artist": "Mitsuhiro Arita",
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
        "name": "Tackle",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Chain Lightning",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "20",
        "text": "If the Defending Pokémon isn't Colorless, this attack does 10 damage to each Benched Pokémon of the same type as the Defending Pokémon (including your own)."
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
    "flavorText": "It stores electrical energy under very high pressure. It often explodes with little or no provocation.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/18.png",
      "large": "https://images.pokemontcg.io/base2/18_hires.png"
    }
  },
  {
    "id": "base2-19",
    "name": "Flareon",
    "number": "19",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Quick Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 20 more damage; if tails, this attack does 10 damage."
      },
      {
        "name": "Flamethrower",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "60",
        "text": "Discard 1 Fire Energy card attached to Flareon in order to use this attack."
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
    "flavorText": "When storing thermal energy in its body, its temperature could soar to over 1600 degrees.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/19.png",
      "large": "https://images.pokemontcg.io/base2/19_hires.png"
    }
  },
  {
    "id": "base2-20",
    "name": "Jolteon",
    "number": "20",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Quick Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 20 more damage; if tails, this attack does 10 damage."
      },
      {
        "name": "Pin Missile",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20×",
        "text": "Flip 4 coins. This attack does 20 damage times the number of heads."
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
      135
    ],
    "flavorText": "It accumulates negative ions from the atmosphere to blast out 10,000-volt lightning bolts.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/20.png",
      "large": "https://images.pokemontcg.io/base2/20_hires.png"
    }
  },
  {
    "id": "base2-21",
    "name": "Kangaskhan",
    "number": "21",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
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
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fetch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card."
      },
      {
        "name": "Comet Punch",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "20×",
        "text": "Flip 4 coins. This attack does 20 damage times the number of heads."
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      115
    ],
    "flavorText": "The infant rarely ventures out of its mother's protective pouch until it is three years old.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/21.png",
      "large": "https://images.pokemontcg.io/base2/21_hires.png"
    }
  },
  {
    "id": "base2-22",
    "name": "Mr. Mime",
    "number": "22",
    "artist": "Ken Sugimori",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Invisible Wall",
        "text": "Whenever an attack (including your own) does 30 or more damage to Mr. Mime (after applying Weakness and Resistance), prevent that damage. (Any other effects of attacks still happen.) This power can't be used if Mr. Mime is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Meditate",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each damage counter on the Defending Pokémon."
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
    "flavorText": "If interrupted while miming, it will slap around the enemy with its broad hands.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/22.png",
      "large": "https://images.pokemontcg.io/base2/22_hires.png"
    }
  },
  {
    "id": "base2-23",
    "name": "Nidoqueen",
    "number": "23",
    "artist": "Ken Sugimori",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Nidorina",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Boyfriends",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Does 20 damage plus 20 more damage for each Nidoking you have in play."
      },
      {
        "name": "Mega Punch",
        "cost": [
          "Grass",
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      31
    ],
    "flavorText": "Its hard scales provide strong protection. It uses its hefty bulk to execute powerful moves.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/23.png",
      "large": "https://images.pokemontcg.io/base2/23_hires.png"
    }
  },
  {
    "id": "base2-24",
    "name": "Pidgeot",
    "number": "24",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Pidgeotto",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wing Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Hurricane",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "Unless this attack Knocks Out the Defending Pokémon, return the Defending Pokémon and all cards attached to it to your opponent's hand."
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
    "flavorText": "When hunting, it skims the surface of water at high speed to pick off unwary prey such as Magikarp.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/24.png",
      "large": "https://images.pokemontcg.io/base2/24_hires.png"
    }
  },
  {
    "id": "base2-25",
    "name": "Pinsir",
    "number": "25",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
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
        "name": "Irongrip",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Guillotine",
        "cost": [
          "Grass",
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      127
    ],
    "flavorText": "If it fails to crush the victim in its pincers, it will swing its victim around and toss it hard.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/25.png",
      "large": "https://images.pokemontcg.io/base2/25_hires.png"
    }
  },
  {
    "id": "base2-26",
    "name": "Scyther",
    "number": "26",
    "artist": "Ken Sugimori",
    "rarity": "Rare",
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
        "name": "Swords Dance",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your next turn, Scyther's Slash attack's base damage is 60 instead of 30."
      },
      {
        "name": "Slash",
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
        "type": "Fire",
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
      123
    ],
    "flavorText": "With ninja-like agility and speed, it can create the illusion that there is more than one of it.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/26.png",
      "large": "https://images.pokemontcg.io/base2/26_hires.png"
    }
  },
  {
    "id": "base2-27",
    "name": "Snorlax",
    "number": "27",
    "artist": "Ken Sugimori",
    "rarity": "Rare",
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
    "rules": [],
    "abilities": [
      {
        "name": "Thick Skinned",
        "text": "Snorlax can't become Asleep, Confused, Paralyzed, or Poisoned. This power can't be used if Snorlax is already Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Body Slam",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
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
      143
    ],
    "flavorText": "Very lazy. Just eats and sleeps. As its rotund bulk builds, it becomes steadily more slothful.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/27.png",
      "large": "https://images.pokemontcg.io/base2/27_hires.png"
    }
  },
  {
    "id": "base2-28",
    "name": "Vaporeon",
    "number": "28",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Quick Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 20 more damage; if tails, this attack does 10 damage."
      },
      {
        "name": "Water Gun",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Does 30 damage plus 10 more damage for each Water Energy attached to Vaporeon but not used to pay for this attack's Energy cost. Extra Water Energy after the 2nd doesn't count."
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
      134
    ],
    "flavorText": "Lives close to water. Its long tail is ridged with a fin that is often mistaken for a mermaid's.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/28.png",
      "large": "https://images.pokemontcg.io/base2/28_hires.png"
    }
  },
  {
    "id": "base2-29",
    "name": "Venomoth",
    "number": "29",
    "artist": "Ken Sugimori",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Venonat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Shift",
        "text": "Once during your turn (before your attack), you may change the type of Venomoth to the type of any other Pokémon in play other than Colorless. This power can't be used if Venomoth is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Venom Powder",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused and Poisoned."
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
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      49
    ],
    "flavorText": "The dust-like scales covering its wings are color coded to indicate the kinds of poison it has.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/29.png",
      "large": "https://images.pokemontcg.io/base2/29_hires.png"
    }
  },
  {
    "id": "base2-30",
    "name": "Victreebel",
    "number": "30",
    "artist": "Ken Sugimori",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Weepinbell",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Lure",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If your opponent has any Benched Pokémon, choose 1 of them and switch it with his or her Active Pokémon."
      },
      {
        "name": "Acid",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon can't retreat during your next turn."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/30.png",
      "large": "https://images.pokemontcg.io/base2/30_hires.png"
    }
  },
  {
    "id": "base2-31",
    "name": "Vileplume",
    "number": "31",
    "artist": "Keiji Kinebuchi",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Gloom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Heal",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, remove 1 damage counter from 1 of your Pokémon. This power can't be used if Vileplume is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Petal Dance",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 3,
        "damage": "40×",
        "text": "Flip 3 coins. This attack does 40 damage times the number of heads. Vileplume is now Confused (after doing damage)."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/31.png",
      "large": "https://images.pokemontcg.io/base2/31_hires.png"
    }
  },
  {
    "id": "base2-32",
    "name": "Wigglytuff",
    "number": "32",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Jigglypuff",
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
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Do the Wave",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each of your Benched Pokémon."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      40
    ],
    "flavorText": "The body is soft and rubbery. When angered, it will suck in air and inflate itself to an enormous size.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/32.png",
      "large": "https://images.pokemontcg.io/base2/32_hires.png"
    }
  },
  {
    "id": "base2-33",
    "name": "Butterfree",
    "number": "33",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "70",
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
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "If your opponent has any Benched Pokémon, he or she chooses 1 of them and switches it with the Defending Pokémon. (Do the damage before switching the Pokémon.)"
      },
      {
        "name": "Mega Drain",
        "cost": [
          "Grass",
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 4,
        "damage": "40",
        "text": "Remove a number of damage counters from Butterfree equal to half the damage done to the Defending Pokémon (after applying Weakness and Resistance) (rounded up to the nearest 10)."
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
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      12
    ],
    "flavorText": "In battle, it flaps its wings at high speed to release highly toxic dust into the air.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/33.png",
      "large": "https://images.pokemontcg.io/base2/33_hires.png"
    }
  },
  {
    "id": "base2-34",
    "name": "Dodrio",
    "number": "34",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Doduo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Retreat Aid",
        "text": "As long as Dodrio is Benched, pay Colorless less to retreat your Active Pokémon.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Rage",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each damage counter on Dodrio."
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
      85
    ],
    "flavorText": "Uses its three brains to execute complex plans. While two heads sleep, one head stays awake.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/34.png",
      "large": "https://images.pokemontcg.io/base2/34_hires.png"
    }
  },
  {
    "id": "base2-35",
    "name": "Exeggutor",
    "number": "35",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Exeggcute",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Teleport",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch Exeggutor with 1 of your Benched Pokémon."
      },
      {
        "name": "Big Eggsplosion",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "Flip a number of coins equal to the number of Energy attached to Exeggutor. This attack does 20 damage times the number of heads."
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
    "flavorText": "Legend has it that on rare occasions, one of its heads will drop off and continue on as an Exeggcute.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/35.png",
      "large": "https://images.pokemontcg.io/base2/35_hires.png"
    }
  },
  {
    "id": "base2-36",
    "name": "Fearow",
    "number": "36",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Spearow",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Agility",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all effects of attacks, including damage, done to Fearow."
      },
      {
        "name": "Drill Peck",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
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
    "flavorText": "With its huge and magnificent wings, it can keep aloft without ever having to land for rest.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/36.png",
      "large": "https://images.pokemontcg.io/base2/36_hires.png"
    }
  },
  {
    "id": "base2-37",
    "name": "Gloom",
    "number": "37",
    "artist": "Keiji Kinebuchi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Oddish",
    "evolvesTo": [
      "Vileplume",
      "Bellossom"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poisonpowder",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Poisoned."
      },
      {
        "name": "Foul Odor",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Both the Defending Pokémon and Gloom are now Confused (after doing damage)."
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
    "flavorText": "The fluid that oozes from its mouth isn't drool; it is a nectar that is used to attract prey.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/37.png",
      "large": "https://images.pokemontcg.io/base2/37_hires.png"
    }
  },
  {
    "id": "base2-38",
    "name": "Lickitung",
    "number": "38",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
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
      "Lickilicky"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tongue Wrap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Supersonic",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused."
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      108
    ],
    "flavorText": "Its tongue can be extended like a chameleon's. It leaves a stinging sensation when it licks enemies.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/38.png",
      "large": "https://images.pokemontcg.io/base2/38_hires.png"
    }
  },
  {
    "id": "base2-39",
    "name": "Marowak",
    "number": "39",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Cubone",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bonemerang",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "Flip 2 coins. This attack does 30 damage times the number of heads."
      },
      {
        "name": "Call for Friend",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Search your deck for a Fighting Basic Pokémon card and put it onto your Bench. Shuffle your deck afterward. (You can't use this attack if your Bench is full.)"
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
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      105
    ],
    "flavorText": "The bone it holds is its key weapon. It throws the bone skillfully like a boomerang to K.O. targets.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/39.png",
      "large": "https://images.pokemontcg.io/base2/39_hires.png"
    }
  },
  {
    "id": "base2-40",
    "name": "Nidorina",
    "number": "40",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Nidoran ♀",
    "evolvesTo": [
      "Nidoqueen"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Supersonic",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused."
      },
      {
        "name": "Double Kick",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30×",
        "text": "Flip 2 coins. This attack does 30 damage times the number of heads."
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
      30
    ],
    "flavorText": "The female's horn develops slowly. Prefers physical attacks such as clawing and biting.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/40.png",
      "large": "https://images.pokemontcg.io/base2/40_hires.png"
    }
  },
  {
    "id": "base2-41",
    "name": "Parasect",
    "number": "41",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Paras",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spore",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Slash",
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
      47
    ],
    "flavorText": "A host-parasite pair in which the parasite mushroom has taken over the host bug. Prefers damp places.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/41.png",
      "large": "https://images.pokemontcg.io/base2/41_hires.png"
    }
  },
  {
    "id": "base2-42",
    "name": "Persian",
    "number": "42",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Meowth",
    "evolvesTo": [],
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
        "name": "Pounce",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "If the Defending Pokémon attacks Persian during your next turn, any damage done by the attack is reduced by 10 (after applying Weakness and Resistance). (Benching either Pokémon ends this effect.)"
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      53
    ],
    "flavorText": "Although its fur has many admirers, it is tough to raise as a pet because of its fickle meanness.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/42.png",
      "large": "https://images.pokemontcg.io/base2/42_hires.png"
    }
  },
  {
    "id": "base2-43",
    "name": "Primeape",
    "number": "43",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Mankey",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fury Swipes",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Flip 3 coins. This attack does 20 damage times the number of heads."
      },
      {
        "name": "Tantrum",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Flip a coin. If tails, Primeape is now Confused (after doing damage)."
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
      57
    ],
    "flavorText": "Always furious and tenacious to boot. It will not abandon chasing its quarry until its quarry is caught.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/43.png",
      "large": "https://images.pokemontcg.io/base2/43_hires.png"
    }
  },
  {
    "id": "base2-44",
    "name": "Rapidash",
    "number": "44",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Ponyta",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stomp",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 damage plus 10 more damage; if tails, this attack does 20 damage."
      },
      {
        "name": "Agility",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all effects of attacks, including damage, done to Rapidash."
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
    "flavorText": "Very competitive, this Pokémon will chase anything that moves fast in the hopes of racing it.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/44.png",
      "large": "https://images.pokemontcg.io/base2/44_hires.png"
    }
  },
  {
    "id": "base2-45",
    "name": "Rhydon",
    "number": "45",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
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
        "name": "Horn Attack",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Ram",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 4,
        "damage": "50",
        "text": "Rhydon does 20 damage to itself. If your opponent has any Benched Pokémon, he or she chooses 1 of them and switches it with the Defending Pokémon. (Do the damage before switching the Pokémon. Switch the Pokémon even if Rhydon is knocked out.)"
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
      112
    ],
    "flavorText": "Protected by an armor-like hide, it is capable of living in molten lava of 3600 degrees.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/45.png",
      "large": "https://images.pokemontcg.io/base2/45_hires.png"
    }
  },
  {
    "id": "base2-46",
    "name": "Seaking",
    "number": "46",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Goldeen",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Horn Attack",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Waterfall",
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
      119
    ],
    "flavorText": "In the autumn spawning season, they can be seen swimming powerfully up rivers and creeks.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/46.png",
      "large": "https://images.pokemontcg.io/base2/46_hires.png"
    }
  },
  {
    "id": "base2-47",
    "name": "Tauros",
    "number": "47",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
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
        "name": "Stomp",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 damage plus 10 more damage; if tails, this attack does 20 damage."
      },
      {
        "name": "Rampage",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20+",
        "text": "Does 20 damage plus 10 more damage for each damage counter on Tauros. Flip a coin. If tails, Tauros is now Confused (after doing damage)."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      128
    ],
    "flavorText": "When it targets an enemy, it charges furiously while whipping its body with its long tails.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/47.png",
      "large": "https://images.pokemontcg.io/base2/47_hires.png"
    }
  },
  {
    "id": "base2-48",
    "name": "Weepinbell",
    "number": "48",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
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
        "name": "Poisonpowder",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Poisoned."
      },
      {
        "name": "Razor Leaf",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      70
    ],
    "flavorText": "It spits out poisonpowder to immobilize the enemy, and then finishes the enemy with a spray of acid.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/48.png",
      "large": "https://images.pokemontcg.io/base2/48_hires.png"
    }
  },
  {
    "id": "base2-49",
    "name": "Bellsprout",
    "number": "49",
    "artist": "Kagemaru Himeno",
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
      "Weepinbell"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Vine Whip",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Call for Family",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Basic Pokémon named Bellsprout and put it onto your Bench. Shuffle your deck afterward. (You can't use this attack if your Bench is full.)"
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
    "flavorText": "A carnivorous Pokémon that traps and eats bugs. It uses its root feet to soak up needed moisture.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/49.png",
      "large": "https://images.pokemontcg.io/base2/49_hires.png"
    }
  },
  {
    "id": "base2-50",
    "name": "Cubone",
    "number": "50",
    "artist": "Mitsuhiro Arita",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Marowak"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Snivel",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If the Defending Pokémon attacks Cubone during your opponent's next turn, any damage done by the attack is reduced by 20 (after applying Weakness and Resistance). (Benching either Pokémon ends this effect.)"
      },
      {
        "name": "Rage",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each damage counter on Cubone."
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
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      104
    ],
    "flavorText": "Because it never removes its skull helmet, no one has ever seen this Pokémon's real face.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/50.png",
      "large": "https://images.pokemontcg.io/base2/50_hires.png"
    }
  },
  {
    "id": "base2-51",
    "name": "Eevee",
    "number": "51",
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
        "name": "Tail Wag",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon can't attack Eevee during your opponent's next turn. (Benching either Pokémon ends this effect.)"
      },
      {
        "name": "Quick Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 20 more damage; if tails, this attack does 10 damage."
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
      133
    ],
    "flavorText": "Its genetic code is irregular. It may mutate if it is exposed to radiation from elemental stones.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/51.png",
      "large": "https://images.pokemontcg.io/base2/51_hires.png"
    }
  },
  {
    "id": "base2-52",
    "name": "Exeggcute",
    "number": "52",
    "artist": "Mitsuhiro Arita",
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
      "Exeggutor"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hypnosis",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Leech Seed",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Unless all damage from this attack is prevented, you may remove 1 damage counter from Exeggcute."
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
    "flavorText": "Often mistaken for eggs. When disturbed, they quickly gather and attack in swarms.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/52.png",
      "large": "https://images.pokemontcg.io/base2/52_hires.png"
    }
  },
  {
    "id": "base2-53",
    "name": "Goldeen",
    "number": "53",
    "artist": "Kagemaru Himeno",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
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
        "name": "Horn Attack",
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      118
    ],
    "flavorText": "Its tail fin billows like an elegant ballroom dress, giving it the nickname \"Water Queen.\"",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/53.png",
      "large": "https://images.pokemontcg.io/base2/53_hires.png"
    }
  },
  {
    "id": "base2-54",
    "name": "Jigglypuff",
    "number": "54",
    "artist": "Kagemaru Himeno",
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
      "Wigglytuff"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Lullaby",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Pound",
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
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      39
    ],
    "flavorText": "When its huge eyes light up, it sings a mysteriously soothing melody that lulls its enemies to sleep.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/54.png",
      "large": "https://images.pokemontcg.io/base2/54_hires.png"
    }
  },
  {
    "id": "base2-55",
    "name": "Mankey",
    "number": "55",
    "artist": "Kagemaru Himeno",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "30",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Primeape"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Peek",
        "text": "Once during your turn (before your attack), you may look at one of the following: the top card of either player's deck, a random card from your opponent's hand, or one of either player's Prizes. This power can't be used if Mankey is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Scratch",
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      56
    ],
    "flavorText": "Extremely quick to anger. It could be docile one moment, then thrashing away the next.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/55.png",
      "large": "https://images.pokemontcg.io/base2/55_hires.png"
    }
  },
  {
    "id": "base2-56",
    "name": "Meowth",
    "number": "56",
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
      "Persian"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pay Day",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Flip a coin. If heads, draw a card."
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
      52
    ],
    "flavorText": "Adores circular objects. Wanders the streets on a nightly basis to look for dropped loose change.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/56.png",
      "large": "https://images.pokemontcg.io/base2/56_hires.png"
    }
  },
  {
    "id": "base2-57",
    "name": "Nidoran ♀",
    "number": "57",
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
      "Nidorina"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fury Swipes",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 3 coins. This attack does 10 damage times the number of heads."
      },
      {
        "name": "Call for Family",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Search your deck for a Basic Pokémon named Nidoran ♂ or Nidoran ♀ and put it onto your Bench. Shuffle your deck afterward. (You can't use this attack if your Bench is full.)"
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
      29
    ],
    "flavorText": "Although small, its venomous barbs make this Pokémon dangerous. The female has smaller horns.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/57.png",
      "large": "https://images.pokemontcg.io/base2/57_hires.png"
    }
  },
  {
    "id": "base2-58",
    "name": "Oddish",
    "number": "58",
    "artist": "Keiji Kinebuchi",
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
      "Gloom"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stun Spore",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Sprout",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Search your deck for a Basic Pokémon named Oddish and put it onto your Bench. Shuffle your deck afterward. (You can't use this attack if your Bench is full.)"
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
    "flavorText": "During the day, it keeps its face buried in the ground. At night, it wanders around sowing its seeds.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/58.png",
      "large": "https://images.pokemontcg.io/base2/58_hires.png"
    }
  },
  {
    "id": "base2-59",
    "name": "Paras",
    "number": "59",
    "artist": "Ken Sugimori",
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
      "Parasect"
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
        "name": "Spore",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
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
      46
    ],
    "flavorText": "Burrows to suck tree roots. The mushrooms on its back grow by drawing nutrients from the bug host.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/59.png",
      "large": "https://images.pokemontcg.io/base2/59_hires.png"
    }
  },
  {
    "id": "base2-60",
    "name": "Pikachu",
    "number": "60",
    "artist": "Ken Sugimori",
    "rarity": "Common",
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
        "name": "Spark",
        "cost": [
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "If your opponent has any Benched Pokémon, choose 1 of them and this attack does 10 damage to it. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": "When several of these Pokémon gather, their electricity can build and cause lightning storms.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/60.png",
      "large": "https://images.pokemontcg.io/base2/60_hires.png"
    }
  },
  {
    "id": "base2-61",
    "name": "Rhyhorn",
    "number": "61",
    "artist": "Mitsuhiro Arita",
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
      "Rhydon"
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
        "text": "Flip a coin. If heads, the Defending Pokémon can't attack Rhyhorn during your opponent's next turn. (Benching either Pokémon ends this effect.)"
      },
      {
        "name": "Horn Attack",
        "cost": [
          "Fighting",
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
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [
      {
        "type": "Lightning",
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
      111
    ],
    "flavorText": "Its massive bones are 1,000 times harder than human bones. It can easily knock a trailer flying.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/61.png",
      "large": "https://images.pokemontcg.io/base2/61_hires.png"
    }
  },
  {
    "id": "base2-62",
    "name": "Spearow",
    "number": "62",
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
      "Fearow"
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
      },
      {
        "name": "Mirror Move",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "If Spearow was attacked last turn, do the final result of that attack on Spearow to the Defending Pokémon."
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
      21
    ],
    "flavorText": "Eats bugs in grassy areas. It has to flap its short wings at high speeds to stay airborne.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/62.png",
      "large": "https://images.pokemontcg.io/base2/62_hires.png"
    }
  },
  {
    "id": "base2-63",
    "name": "Venonat",
    "number": "63",
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
      "Venomoth"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stun Spore",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Leech Life",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Remove a number of damage counters from Venonat equal to the damage done to the Defending Pokémon (after applying Weakness and Resistance)."
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
      48
    ],
    "flavorText": "Lives in the shadows of tall trees where it eats insects. It is attracted by light at night.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/base2/63.png",
      "large": "https://images.pokemontcg.io/base2/63_hires.png"
    }
  },
  {
    "id": "base2-64",
    "name": "Poké Ball",
    "number": "64",
    "artist": "Keiji Kinebuchi",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Flip a coin. If heads, you may search your deck for any Basic Pokémon or Evolution card. Show that card to your opponent, then put it into your hand. Shuffle your deck afterward."
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
      "small": "https://images.pokemontcg.io/base2/64.png",
      "large": "https://images.pokemontcg.io/base2/64_hires.png"
    }
  }
]

export default cardDetails
