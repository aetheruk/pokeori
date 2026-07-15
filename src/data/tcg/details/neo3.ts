import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "neo3-1",
    "name": "Ampharos",
    "number": "1",
    "artist": "Toshinao Aoki",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Flaaffy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Attract Current",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip 3 coins. For each heads, you may search your deck for a Lightning Energy card and attach it to 1 of your Lightning Pokémon. Shuffle your deck afterward."
      },
      {
        "name": "Gigavolt",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "40+",
        "text": "Flip a coin. If heads, this attack does 40 damage plus 20 more damage. If tails, this attack does 40 damage and the Defending Pokémon is now Paralyzed."
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
      181
    ],
    "flavorText": "The bright light on its tail can be seen far away. It has been treasured since ancient times as a beacon.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/1.png",
      "large": "https://images.pokemontcg.io/neo3/1_hires.png"
    }
  },
  {
    "id": "neo3-2",
    "name": "Blissey",
    "number": "2",
    "artist": "Yuka Morii",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Chansey",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Softboiled",
        "text": "When you play Blissey from your hand, you may flip a coin. If heads, remove 8 damage counters from Blissey. If tails, remove 4 damage counters from Blissey. Either way, if Blissey has fewer damage counters than that, remove all of them.",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      242
    ],
    "flavorText": "Anyone who takes even one bite of Blissey's egg becomes unfailingly caring and pleasant to everyone.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/2.png",
      "large": "https://images.pokemontcg.io/neo3/2_hires.png"
    }
  },
  {
    "id": "neo3-3",
    "name": "Celebi",
    "number": "3",
    "artist": "Hironobu Yoshida",
    "rarity": "Rare Holo",
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
    "abilities": [
      {
        "name": "Time Travel",
        "text": "If an opponent's attack would Knock Out Celebi, flip a coin. If heads, Celebi isn't Knocked Out and you shuffle it and all cards attached to it into your deck. This power doesn't work if Celebi is already Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Psychic Damage",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip 3 coins. For each heads, put 1 damage counter on the Defending Pokémon."
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
      251
    ],
    "flavorText": "This Pokémon wanders across time. Grass and trees flourish in the forests in which it has appeared.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/3.png",
      "large": "https://images.pokemontcg.io/neo3/3_hires.png"
    }
  },
  {
    "id": "neo3-4",
    "name": "Crobat",
    "number": "4",
    "artist": "Shin-ichi Yoshida",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Golbat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Triggered Poison",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "If your opponent attaches an Energy card to the Defending Pokémon during his or her next turn, that Pokémon becomes Poisoned."
      },
      {
        "name": "Cross Attack",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20×",
        "text": "Flip 4 coins. This attack does 20 damage times the number of heads. If you get 2 or more heads, the Defending Pokémon is now Confused."
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
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      169
    ],
    "flavorText": "It flies so silently through the dark on its four wings that it may not be noticed even when nearby.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/4.png",
      "large": "https://images.pokemontcg.io/neo3/4_hires.png"
    }
  },
  {
    "id": "neo3-5",
    "name": "Delibird",
    "number": "5",
    "artist": "Tomokazu Komiya",
    "rarity": "Rare Holo",
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
        "name": "Present",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip 3 coins. If exactly 1 is heads, this attack does 40 damage. If exactly 2 are heads, remove 3 damage counters from the Defending Pokémon. If the Defending Pokémon has fewer damage counters than that, remove all of them. If all 3 are heads, this attack does 60 damage. If all 3 are tails, remove all damage counters from the Defending Pokémon."
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
      225
    ],
    "flavorText": "It carries food all day long. There are tales about lost people who were saved by the food it had.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/5.png",
      "large": "https://images.pokemontcg.io/neo3/5_hires.png"
    }
  },
  {
    "id": "neo3-6",
    "name": "Entei",
    "number": "6",
    "artist": "Ken Sugimori",
    "rarity": "Rare Holo",
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
    "abilities": [
      {
        "name": "Howl",
        "text": "When you play Entei from your hand, you may discard the top 5 cards of your deck. (If you have fewer cards in your deck than that, discard all of them.) If any of those are Fire Energy cards, attach them to any of your Fire Pokémon of your choice. Using this power ends your turn.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Searing Flames",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Discard 2 Fire Energy cards attached to Entei or this attack does nothing."
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
      244
    ],
    "flavorText": "Volcanoes erupt when it barks. Unable to restrain its extreme power, it races headlong around the land.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/6.png",
      "large": "https://images.pokemontcg.io/neo3/6_hires.png"
    }
  },
  {
    "id": "neo3-7",
    "name": "Ho-oh",
    "number": "7",
    "artist": "Kimiya Masago",
    "rarity": "Rare Holo",
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
        "name": "Stoke",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "You may search your deck for a Fire Energy card and attach it to Ho-Oh. Shuffle your deck afterward."
      },
      {
        "name": "Sacred Fire",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Flip a coin. If heads, choose 1 of your opponent's Pokémon. This attack does 40 damage to that Pokémon. Don't apply Weakness and Resistance."
      },
      {
        "name": "Dive Bomb",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 5,
        "damage": "90",
        "text": "Flip a coin. If tails, this attack does nothing."
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      250
    ],
    "flavorText": "Legends claim this Pokémon flies the world's skies continuously on its magnificent seven colored wings.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/7.png",
      "large": "https://images.pokemontcg.io/neo3/7_hires.png"
    }
  },
  {
    "id": "neo3-8",
    "name": "Houndoom",
    "number": "8",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Houndour",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dark Flame",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Discard 1 Fire Energy card attached to Houndoom or this attack does nothing. If there are any Darkness Energy cards in your discard pile, attach 1 of them to Houndoom."
      },
      {
        "name": "Black Fang",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Flip a number of coins equal to the number of Darkness Energy attached to Houndoom. This attack does 30 damage plus 10 more damage for each heads."
      }
    ],
    "weaknesses": [],
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
      229
    ],
    "flavorText": "Upon hearing its eerie howls, other Pokémon get the shivers and head straight back to their nests.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/8.png",
      "large": "https://images.pokemontcg.io/neo3/8_hires.png"
    }
  },
  {
    "id": "neo3-9",
    "name": "Jumpluff",
    "number": "9",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "70",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Skiploom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Evolutionary Spore",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose any number of your Hoppips and Skiplooms. Then, for each Pokémon you chose in this way, you may search your deck for a card that evolves from that Pokémon and attach it to that Pokémon. (This counts as evolving those Pokémon.) Shuffle your deck afterward."
      },
      {
        "name": "Solarbeam",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
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
      189
    ],
    "flavorText": "Drifts on seasonal winds and spreads its cotton-like spores all over the world to make more offspring.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/9.png",
      "large": "https://images.pokemontcg.io/neo3/9_hires.png"
    }
  },
  {
    "id": "neo3-10",
    "name": "Magneton",
    "number": "10",
    "artist": "\"Big Mama\" Tagawa, CR CG gangs",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Magnemite",
    "evolvesTo": [
      "Magnezone"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Electromagnetic Power",
        "text": "As often as you like during your turn (before your attack), you may take 1 Energy card attached to 1 of your Magnemites, Magnetons, or Dark Magnetons and attach it to a different 1 of your Magnemites, Magnetons, and Dark Magnetons. This power can't be used if Magneton is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Plasma",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "If there are any Lightning Energy cards in your discard pile, attach 1 of them to Magneton."
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
      82
    ],
    "flavorText": "Three Magnemites are linked by a strong magnetic force. Earaches will occur if you get too close.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/10.png",
      "large": "https://images.pokemontcg.io/neo3/10_hires.png"
    }
  },
  {
    "id": "neo3-11",
    "name": "Misdreavus",
    "number": "11",
    "artist": "Ken Sugimori",
    "rarity": "Rare Holo",
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
      "Mismagius"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Night Eyes",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Perish Song",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "If the Defending Pokémon is Asleep and was attacked with Night Eyes during your last turn, it is Knocked Out."
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
      200
    ],
    "flavorText": "It likes playing mischievous tricks such as screaming and wailing to startle people at night.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/11.png",
      "large": "https://images.pokemontcg.io/neo3/11_hires.png"
    }
  },
  {
    "id": "neo3-12",
    "name": "Porygon2",
    "number": "12",
    "artist": "Keiji Kinebuchi",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Porygon",
    "evolvesTo": [
      "Porygon-Z"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Energy Converter",
        "text": "Once during your turn (before your attack), you may choose 1 basic Energy card attached to 1 of your Pokémon and choose an Energy type. Treat that Energy card as that type until the end of your turn. This power can't be used if Porygon2 is Asleep, Confused, or Paralyzed. If Porygon2 becomes Asleep, Confused, or Paralyzed, the Energy card goes back to its original type.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Delta Beam",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20",
        "text": "Flip a coin. If heads, choose whether the Defending Pokémon becomes Asleep, Confused, or Paralyzed."
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
      233
    ],
    "flavorText": "This upgraded version of Porygon is designed for space exploration. It can't fly, though.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/12.png",
      "large": "https://images.pokemontcg.io/neo3/12_hires.png"
    }
  },
  {
    "id": "neo3-13",
    "name": "Raikou",
    "number": "13",
    "artist": "Ken Sugimori",
    "rarity": "Rare Holo",
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
        "name": "Lightning Burst",
        "text": "Whenever you attach a Lightning Energy card from your hand to Raikou, if your opponent has any Benched Pokémon, he or she chooses 1 of them and switches it with the Defending Pokémon. This power stops working while Raikou is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Lightning Tackle",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Flip a coin. If tails, Raikou does 20 damage to itself."
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
      243
    ],
    "flavorText": "The rain clouds it carries let it fire thunderbolts at will. They say that it descended with lightning.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/13.png",
      "large": "https://images.pokemontcg.io/neo3/13_hires.png"
    }
  },
  {
    "id": "neo3-14",
    "name": "Suicune",
    "number": "14",
    "artist": "Ken Sugimori",
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
        "name": "Crystal Body",
        "text": "Prevent all effects of your opponent's attacks, other than damage, done to Suicune. This power stops working while Suicune is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Aurora Wave",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "Flip 2 coins. If both are heads, the Defending Pokémon is now Paralyzed. If only 1 is heads, the Defending Pokémon is now Asleep."
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
      245
    ],
    "flavorText": "Said to be the reincarnation of north winds, it can instantly purify filthy, murky water.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/14.png",
      "large": "https://images.pokemontcg.io/neo3/14_hires.png"
    }
  },
  {
    "id": "neo3-15",
    "name": "Aerodactyl",
    "number": "15",
    "artist": "Shin-ichi Yoshida",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Mysterious Fossil",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Prehistoric Memory",
        "text": "Whenever an Evolved Pokémon attacks (even if it's your opponent's), it can use any attack from its Basic Pokémon card or any Evolution card attached to it. It still has to pay for that attack's Energy cost. This power stops working while Aerodactyl is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Fly",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all effects of attacks, including damage, done to Aerodactyl. If tails, this attack does nothing (not even damage)."
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
      142
    ],
    "flavorText": "A vicious Pokémon from the distant past, it appears to have flown by spreading its wings and gliding.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/15.png",
      "large": "https://images.pokemontcg.io/neo3/15_hires.png"
    }
  },
  {
    "id": "neo3-16",
    "name": "Celebi",
    "number": "16",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "50",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psychic Leaf",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin for each Energy attached to the Defending Pokémon. This attack does 10 damage plus 10 more damage for each heads. Remove a number of damage counters from Celebi equal to the damage done to the Defending Pokémon (after applying Weakness and Resistance). If Celebi has fewer damage counters than that, remove all of them."
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
      251
    ],
    "flavorText": "When Celebi disappears deep in a forest, it is said to leave behind an egg it brought from the future.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/16.png",
      "large": "https://images.pokemontcg.io/neo3/16_hires.png"
    }
  },
  {
    "id": "neo3-17",
    "name": "Entei",
    "number": "17",
    "artist": "Naoyo Kimura",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Legendary Body",
        "text": "As long as Entei is your Active Pokémon, Entei and Energy cards attached to it aren't affected by effects from Trainer cards other than Stadium cards. As long as this Power is active, discard any Trainer cards attached to Entei. (This power works even if Entei is Asleep, Confused, or Paralyzed.)",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Mega Flame",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Flip 2 coins. For each tails, discard 1 Fire Energy card from Entei, if it has any."
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
      244
    ],
    "flavorText": "A Pokémon that races across the land. It is said that one is born every time a new volcano appears.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/17.png",
      "large": "https://images.pokemontcg.io/neo3/17_hires.png"
    }
  },
  {
    "id": "neo3-18",
    "name": "Ho-oh",
    "number": "18",
    "artist": "Aya Kusube",
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
        "name": "Rainbow Burn",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "30+",
        "text": "This attack does 30 damage plus 10 more damage for each type of Basic Energy card, if any, attached to Ho-Oh."
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      250
    ],
    "flavorText": "A legend says that its body glows in seven colors. A rainbow is said to form behind it when it flies.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/18.png",
      "large": "https://images.pokemontcg.io/neo3/18_hires.png"
    }
  },
  {
    "id": "neo3-19",
    "name": "Kingdra",
    "number": "19",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Seadra",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Genetic Memory",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Use any attack from Kingdra's Basic Pokémon card or Evolution card. (Kingdra doesn't have to pay for that attack's Energy cost.)"
      },
      {
        "name": "Twister",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "50",
        "text": "Flip 2 coins. For each heads, choose 1 Energy card attached to the Defending Pokémon, if any, and discard it. If both are tails, this attack does nothing (not even damage)."
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
      230
    ],
    "flavorText": "It sleeps deep on the ocean floor to build its energy. It is said to cause tornadoes as it wakes.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/19.png",
      "large": "https://images.pokemontcg.io/neo3/19_hires.png"
    }
  },
  {
    "id": "neo3-20",
    "name": "Lugia",
    "number": "20",
    "artist": "Aya Kusube",
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
        "name": "Aerowing",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "40",
        "text": "You may flip a coin. If heads, this attack does 80 damage. If tails, this attack does nothing."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/20.png",
      "large": "https://images.pokemontcg.io/neo3/20_hires.png"
    }
  },
  {
    "id": "neo3-21",
    "name": "Raichu",
    "number": "21",
    "artist": "Masako Yamashita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Pikachu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Thundershock",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Lightning Strike",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "You may discard all Lightning Energy cards attached to Raichu. If you do, this attack does 80 damage."
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
      26
    ],
    "flavorText": "If the electric pouches in its cheeks become fully charged, both ears will stand straight up.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/21.png",
      "large": "https://images.pokemontcg.io/neo3/21_hires.png"
    }
  },
  {
    "id": "neo3-22",
    "name": "Raikou",
    "number": "22",
    "artist": "Naoyo Kimura",
    "rarity": "Rare",
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
    "abilities": [
      {
        "name": "Legendary Body",
        "text": "As long as Raikou is your Active Pokémon, Raikou and Energy cards attached to it aren't affected by effects from Trainer cards other than Stadium cards. As long as this Power is active, discard any Trainer cards attached to Raikou. (This power works even if Raikou is Asleep, Confused, or Paralyzed.)",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Lightning Spark",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "If your opponent has any Benched Pokémon, flip a coin. If heads, choose 1 of them and this attack does 20 damage to it. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      243
    ],
    "flavorText": "A Pokémon that races across the land while barking a cry that sounds like crashing thunder.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/22.png",
      "large": "https://images.pokemontcg.io/neo3/22_hires.png"
    }
  },
  {
    "id": "neo3-23",
    "name": "Skarmory",
    "number": "23",
    "artist": "Aya Kusube",
    "rarity": "Rare",
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
        "name": "Fury Attack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 2 coins. This attack does 10 damage times the number of heads."
      },
      {
        "name": "Agility",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all effects of attacks, including damage, done to Skarmory."
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
      227
    ],
    "flavorText": "After nesting in bramble bushes, the wings of its chicks grow hard from scratches by thorns.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/23.png",
      "large": "https://images.pokemontcg.io/neo3/23_hires.png"
    }
  },
  {
    "id": "neo3-24",
    "name": "Sneasel",
    "number": "24",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Rare",
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
      "Weavile"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Swipe",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, discard all Trainer cards attached to your opponent's Pokémon."
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
    "weaknesses": [],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      215
    ],
    "flavorText": "Its paws conceal sharp claws. If attacked, it suddenly extends the claws and startles its enemy.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/24.png",
      "large": "https://images.pokemontcg.io/neo3/24_hires.png"
    }
  },
  {
    "id": "neo3-25",
    "name": "Starmie",
    "number": "25",
    "artist": "Keita Komatsuya, CR CG gangs",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Staryu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Confuse Ray",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused."
      },
      {
        "name": "Core Stream",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Choose an Energy type other than Colorless. This attack does 20 damage to each of your opponent's Pokémon with any Energy cards of that type attached to it. Don't apply Weakness and Resistance."
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
      121
    ],
    "flavorText": "The center section of its body is called the core. It glows in a different color each time it is seen.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/25.png",
      "large": "https://images.pokemontcg.io/neo3/25_hires.png"
    }
  },
  {
    "id": "neo3-26",
    "name": "Sudowoodo",
    "number": "26",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Mimic",
        "text": "As long as Sudowoodo is your Active Pokémon, it copies all of the Defending Pokémon's attacks, including their costs. This power can't be used if Sudowoodo is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
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
      185
    ],
    "flavorText": "It disguises itself as a tree to avoid attack. It hates water, so it will disappear if it starts raining.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/26.png",
      "large": "https://images.pokemontcg.io/neo3/26_hires.png"
    }
  },
  {
    "id": "neo3-27",
    "name": "Suicune",
    "number": "27",
    "artist": "Naoyo Kimura",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Legendary Body",
        "text": "As long as Suicune is your Active Pokémon, Suicune and Energy cards attached to it aren't affected by effects from Trainer cards other than Stadium cards. As long as this Power is active, discard any Trainer cards attached to Suicune. (This power works even if Suicune is Asleep, Confused, or Paralyzed.)",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Crystal Wave",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 30 damage plus 10 more damage. If tails, this attack does 30 damage and, if your opponent has any Benched Pokémon, he or she chooses 1 of them and switches it with the Defending Pokémon. (Do the damage before switching the Pokémon.)"
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
      245
    ],
    "flavorText": "This Pokémon races across the land. It is said that north winds will somehow blow whenever it appears.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/27.png",
      "large": "https://images.pokemontcg.io/neo3/27_hires.png"
    }
  },
  {
    "id": "neo3-28",
    "name": "Flaaffy",
    "number": "28",
    "artist": "Toshinao Aoki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
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
        "name": "Electric Punch",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Tail Shock",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "Flip a coin. If heads, this attack does 10 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      180
    ],
    "flavorText": "Its fluffy fleece easily stores electricity. Its rubbery hide keeps it from being electrocuted.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/28.png",
      "large": "https://images.pokemontcg.io/neo3/28_hires.png"
    }
  },
  {
    "id": "neo3-29",
    "name": "Golbat",
    "number": "29",
    "artist": "Masako Yamashita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Zubat",
    "evolvesTo": [
      "Crobat"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Screech",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Until the end of your next turn, if an attack damages the Defending Pokémon (after applying Weakness and Resistance), that attack does 20 more damage to the Defending Pokémon."
      },
      {
        "name": "Poison Bite",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "If this attack damages the Defending Pokémon, the Defending Pokémon is now Poisoned and you remove a number of damage counters from Golbat equal to half that damage (rounded up to the nearest 10). If Golbat has fewer damage counters than that, remove all of them. Either way, the Defending Pokémon is now Poisoned."
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
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      42
    ],
    "flavorText": "It can drink more than 10 ounces of blood at once. If it has too much, it gets heavy and flies clumsily.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/29.png",
      "large": "https://images.pokemontcg.io/neo3/29_hires.png"
    }
  },
  {
    "id": "neo3-30",
    "name": "Graveler",
    "number": "30",
    "artist": "Yukiko Baba",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Geodude",
    "evolvesTo": [
      "Golem"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Earthquake",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Does 10 damage to each of your own Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Rock Tumble",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Don't apply Resistance."
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
      75
    ],
    "flavorText": "With a free and uncaring nature, it doesn't mind if pieces break off while it rolls down mountains.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/30.png",
      "large": "https://images.pokemontcg.io/neo3/30_hires.png"
    }
  },
  {
    "id": "neo3-31",
    "name": "Jynx",
    "number": "31",
    "artist": "Tomokazu Komiya",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Freezing Kiss Goodnight",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Strange Dance",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 damage plus 20 more damage and the Defending Pokémon is now Confused. If tails, this attack does 20 damage."
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
      124
    ],
    "flavorText": "It rocks its body rhythmically. It appears to alter the rhythm depending on how it is feeling.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/31.png",
      "large": "https://images.pokemontcg.io/neo3/31_hires.png"
    }
  },
  {
    "id": "neo3-32",
    "name": "Lanturn",
    "number": "32",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Chinchou",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Submerge",
        "text": "Once during your turn (before your attack), you may change Lanturn's type to Water until the end of your turn. This power can't be used if Lanturn is Asleep, Confused, or Paralyzed. If Lanturn becomes Asleep, Confused, or Paralyzed after you have used this power, its type changes back to Lightning.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Blinding Light",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
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
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      171
    ],
    "flavorText": "It blinds prey with an intense burst of light, then swallows the immobilized prey in a single gulp.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/32.png",
      "large": "https://images.pokemontcg.io/neo3/32_hires.png"
    }
  },
  {
    "id": "neo3-33",
    "name": "Magcargo",
    "number": "33",
    "artist": "Shin-ichi Yoshida",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Slugma",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Magma Pool",
        "text": "If Magcargo is your Active Pokémon and moves to the Bench, remove 1 Fire Energy card attached to Magcargo, if any, and attach it to the new Active Pokémon. (You can't choose an Energy card that you used to pay the Retreat Cost.)",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Lava Flow",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "You may discard any number of Fire Energy cards attached to Magcargo when you use this attack. If you do, this attack does 40 damage plus 20 more damage for each Fire Energy card you discarded in this way."
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
      219
    ],
    "flavorText": "The shell on its back is just skin that has cooled and hardened. It breaks easily with a slight touch.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/33.png",
      "large": "https://images.pokemontcg.io/neo3/33_hires.png"
    }
  },
  {
    "id": "neo3-34",
    "name": "Octillery",
    "number": "34",
    "artist": "Tomokazu Komiya",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Remoraid",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Constrict",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Octazooka",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "Flip a coin. If heads, whenever the Defending Pokémon attacks, your opponent flips a coin. If tails, that attack does nothing. (Benching or evolving that Pokémon ends this effect.)"
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
      224
    ],
    "flavorText": "It traps enemies with its suction cupped tentacles then smashes them with its rockhard head.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/34.png",
      "large": "https://images.pokemontcg.io/neo3/34_hires.png"
    }
  },
  {
    "id": "neo3-35",
    "name": "Parasect",
    "number": "35",
    "artist": "Atsuko Nishida",
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
    "abilities": [
      {
        "name": "Allergic Pollen",
        "text": "As long as Parasect is in play, cards in any player's discard piles are not affected by attacks or Pokémon Powers. This power stops working if Parasect becomes Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Sleep Pinchers",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Asleep."
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
      47
    ],
    "flavorText": "It stays mostly in dark, damp places, the preference not of the bug, but of the big mushrooms on its back.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/35.png",
      "large": "https://images.pokemontcg.io/neo3/35_hires.png"
    }
  },
  {
    "id": "neo3-36",
    "name": "Piloswine",
    "number": "36",
    "artist": "Atsuko Nishida",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Swinub",
    "evolvesTo": [
      "Mamoswine"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Nap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Remove 3 damage counters from Piloswine. If it has fewer damage counters than that, remove all of them."
      },
      {
        "name": "High-Speed Charge",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "Piloswine does 30 damage to itself. Piloswine can't use this attack during your next turn."
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
      221
    ],
    "flavorText": "If it charges at an enemy, the hairs on its back stand up straight. It is very sensitive to sound.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/36.png",
      "large": "https://images.pokemontcg.io/neo3/36_hires.png"
    }
  },
  {
    "id": "neo3-37",
    "name": "Seaking",
    "number": "37",
    "artist": "Miki Tanaka",
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
        "name": "Rising Lunge",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 10 more damage. If tails, this attack does 10 damage."
      },
      {
        "name": "Horn Swipe",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip 2 coins. If both are heads, this attack does 20 damage plus 40 more damage. If 1 or both of them are tails, this attack does 20 damage."
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
    "flavorText": "Using its horn, it bores holes in riverbed boulders, making nests to prevent its eggs from washing away.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/37.png",
      "large": "https://images.pokemontcg.io/neo3/37_hires.png"
    }
  },
  {
    "id": "neo3-38",
    "name": "Stantler",
    "number": "38",
    "artist": "Yukiko Baba",
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
        "name": "Terrorize",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If the Defending Pokémon is a Basic Pokémon, choose 1 of its attacks. That Pokémon can't use that attack during your opponent's next turn."
      },
      {
        "name": "Overhead Toss",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "If you have any Benched Pokémon, flip a coin. If tails, this attack does 10 damage to 1 of them. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      234
    ],
    "flavorText": "Those who stare at its antlers will gradually lose control of their senses and be unable to stand.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/38.png",
      "large": "https://images.pokemontcg.io/neo3/38_hires.png"
    }
  },
  {
    "id": "neo3-39",
    "name": "Unown [B]",
    "number": "39",
    "artist": "CR CG gangs",
    "rarity": "Uncommon",
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
    "rules": [
      "You may have up to 4 Basic Pokémon cards in your deck with Unown in their names."
    ],
    "abilities": [
      {
        "name": "[Bear]",
        "text": "Once during your turn (before your attack), you may move 1 damage counter from 1 of your Pokémon with Unown in its name to Unown [B]. This power can't be used if Unown [B] has 10 HP left. This power can be used even if Unown [B] is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Hidden Power",
        "cost": [
          "Psychic"
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
      201
    ],
    "flavorText": "Their shapes look like hieroglyphs on ancient tablets. It is said that the two are somehow related.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/39.png",
      "large": "https://images.pokemontcg.io/neo3/39_hires.png"
    }
  },
  {
    "id": "neo3-40",
    "name": "Unown [Y]",
    "number": "40",
    "artist": "CR CG gangs",
    "rarity": "Uncommon",
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
    "rules": [
      "You may have up to 4 Basic Pokémon cards in your deck with Unown in their names."
    ],
    "abilities": [
      {
        "name": "[Yield]",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, search your deck for a Psychic Energy card and attach it to 1 of your Pokémon with Unown in its name. Shuffle your deck afterward. This power can be used even if Unown [Y] is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Hidden Power",
        "cost": [
          "Psychic"
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
      201
    ],
    "flavorText": "Their shapes look like hieroglyphs on ancient tablets. It is said that the two are somehow related.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/40.png",
      "large": "https://images.pokemontcg.io/neo3/40_hires.png"
    }
  },
  {
    "id": "neo3-41",
    "name": "Aipom",
    "number": "41",
    "artist": "Sumiyoshi Kizuki",
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
      "Ambipom"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Grab",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose a Trainer card attached to 1 of your opponent's Pokémon. Your opponent shuffles that card into his or her deck."
      },
      {
        "name": "Tail Punch",
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      190
    ],
    "flavorText": "It lives atop tall trees. When leaping from branch to branch, it deftly uses its tail for balance.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/41.png",
      "large": "https://images.pokemontcg.io/neo3/41_hires.png"
    }
  },
  {
    "id": "neo3-42",
    "name": "Chinchou",
    "number": "42",
    "artist": "Atsuko Nishida",
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
      "Lanturn"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Positive Ion",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 10 more damage. If tails, this attack does 10 damage."
      },
      {
        "name": "Negative Ion",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "If the Defending Pokémon attacks Chinchou during your opponent's next turn, any damage done to Chinchou is reduced by 10 (before applying Weakness and Resistance). (Benching or evolving either Pokémon ends this effect.)"
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
      170
    ],
    "flavorText": "On the dark ocean floor, its only means of communication is its constantly flashing lights.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/42.png",
      "large": "https://images.pokemontcg.io/neo3/42_hires.png"
    }
  },
  {
    "id": "neo3-43",
    "name": "Farfetch'd",
    "number": "43",
    "artist": "Miki Tanaka",
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
      "Sirfetch'd"
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
        "name": "Leek Jab",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "This attack can't be used during your next turn. (Benching Farfetch'd ends this effect.)"
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
      83
    ],
    "flavorText": "If anyone tries to disturb where the essential plant sticks grow, it uses its own stick to thwart them.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/43.png",
      "large": "https://images.pokemontcg.io/neo3/43_hires.png"
    }
  },
  {
    "id": "neo3-44",
    "name": "Geodude",
    "number": "44",
    "artist": "Masako Yamashita",
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
      "Graveler"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Knuckle Punch",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      74
    ],
    "flavorText": "It uses its arms to steadily climb steep mountain paths. It swings its fists around if angered.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/44.png",
      "large": "https://images.pokemontcg.io/neo3/44_hires.png"
    }
  },
  {
    "id": "neo3-45",
    "name": "Goldeen",
    "number": "45",
    "artist": "Yuka Morii",
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
        "name": "Fin Smack",
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
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      118
    ],
    "flavorText": "Its dorsal, pectoral and tail fins wave elegantly in the water. That is why it is known as the water dancer.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/45.png",
      "large": "https://images.pokemontcg.io/neo3/45_hires.png"
    }
  },
  {
    "id": "neo3-46",
    "name": "Murkrow",
    "number": "46",
    "artist": "Hironobu Yoshida",
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
      "Honchkrow"
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
        "text": "Search your deck for a Basic Pokémon card named Murkrow and put it onto your Bench. Shuffle your deck afterward. (You can't use this attack if your Bench is full.)"
      },
      {
        "name": "Flock Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a number of coins equal to the number of Murkrows on your Bench. This attack does 10 damage plus 10 more damage for each heads."
      }
    ],
    "weaknesses": [],
    "resistances": [
      {
        "type": "Psychic",
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      198
    ],
    "flavorText": "Feared and loathed by many, it is believed to bring misfortune to all those who see it at night.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/46.png",
      "large": "https://images.pokemontcg.io/neo3/46_hires.png"
    }
  },
  {
    "id": "neo3-47",
    "name": "Paras",
    "number": "47",
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
      "Parasect"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sleep Spore",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Asleep."
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      46
    ],
    "flavorText": "It is doused with mushroom spores when it is born. As its body grows, mushrooms sprout from its back.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/47.png",
      "large": "https://images.pokemontcg.io/neo3/47_hires.png"
    }
  },
  {
    "id": "neo3-48",
    "name": "Quagsire",
    "number": "48",
    "artist": "Yuka Morii",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wooper",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mud Slap",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Whirlpool",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "40",
        "text": "If the Defending Pokémon has any Energy cards attached to it, choose 1 of them and discard it."
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      195
    ],
    "flavorText": "Due to its relaxed and carefree attitude, it often bumps its head on boulders and boat hulls as it swims.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/48.png",
      "large": "https://images.pokemontcg.io/neo3/48_hires.png"
    }
  },
  {
    "id": "neo3-49",
    "name": "Qwilfish",
    "number": "49",
    "artist": "Sumiyoshi Kizuki",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Sting",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Poisoned."
      },
      {
        "name": "Needle Storm",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Flip a coin until you get tails. This attack does 20 damage times the number of heads you get."
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
      211
    ],
    "flavorText": "To fire its poison spikes, it must inflate its body by drinking over 2.6 gallons of water all at once.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/49.png",
      "large": "https://images.pokemontcg.io/neo3/49_hires.png"
    }
  },
  {
    "id": "neo3-50",
    "name": "Remoraid",
    "number": "50",
    "artist": "Miki Tanaka",
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
      "Octillery"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sharpshooting",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, choose 1 of your opponent's Pokémon. This attack does 20 damage to that Pokémon. Don't apply Weakness and Resistance."
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
      223
    ],
    "flavorText": "It has superb accuracy. The water it shoots out can strike even moving prey from more than 300 feet.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/50.png",
      "large": "https://images.pokemontcg.io/neo3/50_hires.png"
    }
  },
  {
    "id": "neo3-51",
    "name": "Shuckle",
    "number": "51",
    "artist": "Yuka Morii",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Hard Shell",
        "text": "Whenever an attack (including your own) does 40 or less damage to Shuckle (after applying Weakness and Resistance), reduce that damage to 10. (Any other effects of attacks still happen.) This power stops working while Shuckle is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Toxic Saliva",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Poisoned. It now takes 20 Poison damage instead of 10 after each player's turn (even if it was already Poisoned)."
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
      213
    ],
    "flavorText": "It stores berries inside its shell. To avoid attacks, it hides beneath rocks and remains completely still.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/51.png",
      "large": "https://images.pokemontcg.io/neo3/51_hires.png"
    }
  },
  {
    "id": "neo3-52",
    "name": "Skiploom",
    "number": "52",
    "artist": "Mitsuhiro Arita",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Hoppip",
    "evolvesTo": [
      "Jumpluff"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hop",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Mysterious Powder",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused."
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
      188
    ],
    "flavorText": "It spreads its petals to absorb sunlight. It also floats in the air to get closer to the sun.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/52.png",
      "large": "https://images.pokemontcg.io/neo3/52_hires.png"
    }
  },
  {
    "id": "neo3-53",
    "name": "Slugma",
    "number": "53",
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
      "Magcargo"
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
        "damage": "10",
        "text": ""
      },
      {
        "name": "Magma Ring",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
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
      218
    ],
    "flavorText": "It never sleeps. It has to keep moving because if it stopped, its magma body would cool and harden.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/53.png",
      "large": "https://images.pokemontcg.io/neo3/53_hires.png"
    }
  },
  {
    "id": "neo3-54",
    "name": "Smoochum",
    "number": "54",
    "artist": "Atsuko Nishida",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Baby"
    ],
    "hp": "30",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Jynx"
    ],
    "rules": [
      "If this Baby Pokémon is your Active Pokémon and your opponent announces an attack, your opponent flips a coin (before doing anything else). If tails, your opponent's turn ends."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Psykiss",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, choose a Special Energy card attached to 1 of your opponent's Pokémon. Your opponent shuffles that card into his or her deck."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      238
    ],
    "flavorText": "It always rocks its head slowly backwards and forwards as if it is trying to kiss someone.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/54.png",
      "large": "https://images.pokemontcg.io/neo3/54_hires.png"
    }
  },
  {
    "id": "neo3-55",
    "name": "Snubbull",
    "number": "55",
    "artist": "Tomokazu Komiya",
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
      "Granbull"
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
      },
      {
        "name": "Raging Headbutt",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 10 damage times the number of damage counters on Snubbull. If tails, this attack does 10 damage."
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
      209
    ],
    "flavorText": "It has an active, playful nature. Many people like to frolic with it because of its affectionate ways.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/55.png",
      "large": "https://images.pokemontcg.io/neo3/55_hires.png"
    }
  },
  {
    "id": "neo3-56",
    "name": "Staryu",
    "number": "56",
    "artist": "Mitsuhiro Arita",
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
      "Starmie"
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
        "name": "Bubblebeam",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
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
      120
    ],
    "flavorText": "At night, the center of its body slowly flickers with the same rhythm as a human heartbeat.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/56.png",
      "large": "https://images.pokemontcg.io/neo3/56_hires.png"
    }
  },
  {
    "id": "neo3-57",
    "name": "Swinub",
    "number": "57",
    "artist": "Miki Tanaka",
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
      "Piloswine"
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
        "name": "Take Down",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Swinub does 10 damage to itself."
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
      220
    ],
    "flavorText": "If it smells something enticing, it dashes headlong off to find the source of the aroma.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/57.png",
      "large": "https://images.pokemontcg.io/neo3/57_hires.png"
    }
  },
  {
    "id": "neo3-58",
    "name": "Unown [K]",
    "number": "58",
    "artist": "CR CG gangs",
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
    "evolvesTo": [],
    "rules": [
      "You may have up to 4 Basic Pokémon cards in your deck with Unown in their names."
    ],
    "abilities": [
      {
        "name": "[Keep]",
        "text": "Your opponent's attacks, Pokémon Powers, and Trainer cards can't discard Energy cards from your Pokémon with Unown in their names. (Any other effects still happen.)",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Hidden Power",
        "cost": [
          "Psychic"
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
      201
    ],
    "flavorText": "Their shapes look like hieroglyphs on ancient tablets. It is said that the two are somehow related.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/58.png",
      "large": "https://images.pokemontcg.io/neo3/58_hires.png"
    }
  },
  {
    "id": "neo3-59",
    "name": "Zubat",
    "number": "59",
    "artist": "Yukiko Baba",
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
      "Golbat"
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
      },
      {
        "name": "Poison Spray",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Poisoned."
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
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      41
    ],
    "flavorText": "While flying, it constantly emits ultrasonic waves from its mouth to check its surroundings.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/59.png",
      "large": "https://images.pokemontcg.io/neo3/59_hires.png"
    }
  },
  {
    "id": "neo3-60",
    "name": "Balloon Berry",
    "number": "60",
    "artist": "Keiji Kinebuchi",
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
      "Attach Balloon Berry to 1 of your Pokémon that doesn't have a Pokémon Tool attached to it.",
      "When the Pokémon Balloon Berry is attached to retreats, discard Balloon Berry instead of discarding Energy cards."
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
      "small": "https://images.pokemontcg.io/neo3/60.png",
      "large": "https://images.pokemontcg.io/neo3/60_hires.png"
    }
  },
  {
    "id": "neo3-61",
    "name": "Healing Field",
    "number": "61",
    "artist": "Keiji Kinebuchi",
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
      "This card stays in play when you play it. Discard this card if another Stadium card comes into play.",
      "Once during each player's turn, he or she may flip a coin. If heads, that player removes 2 damage counters from his or her Active Pokémon (1 if it only has 1)."
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
      "small": "https://images.pokemontcg.io/neo3/61.png",
      "large": "https://images.pokemontcg.io/neo3/61_hires.png"
    }
  },
  {
    "id": "neo3-62",
    "name": "Pokémon Breeder Fields",
    "number": "62",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Flip a coin for 1 or 2 of your non-Baby Pokémon that can evolve. For each heads, search your deck for a later-Stage card that matches that Pokémon. Then put that card into your hand. Shuffle your deck afterward."
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
      "small": "https://images.pokemontcg.io/neo3/62.png",
      "large": "https://images.pokemontcg.io/neo3/62_hires.png"
    }
  },
  {
    "id": "neo3-63",
    "name": "Rocket's Hideout",
    "number": "63",
    "artist": "Keiji Kinebuchi",
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
      "This card stays in play when you play it. Discard this card if another Stadium card comes into play.",
      "Each Pokémon in play with Dark in its name (even your opponent's) gets +20 HP."
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
      "small": "https://images.pokemontcg.io/neo3/63.png",
      "large": "https://images.pokemontcg.io/neo3/63_hires.png"
    }
  },
  {
    "id": "neo3-64",
    "name": "Old Rod",
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
      "Flip 2 coins. If both are heads, put a Baby Pokémon, Basic Pokémon, or Evolution card from your discard pile into your hand. If both are tails, put a Trainer card from your discard pile into your hand."
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
      "small": "https://images.pokemontcg.io/neo3/64.png",
      "large": "https://images.pokemontcg.io/neo3/64_hires.png"
    }
  },
  {
    "id": "neo3-65",
    "name": "Shining Gyarados",
    "number": "65",
    "artist": "Ken Sugimori",
    "rarity": "Rare Shining",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can't have more than 1 Shining Gyarados in your deck."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Outrage",
        "cost": [
          "Water",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 30 damage plus 10 more damage for each damage counter on Shining Gyarados. If tails, this attack does nothing."
      },
      {
        "name": "Devastate",
        "cost": [
          "Water",
          "Water",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 4,
        "damage": "50",
        "text": "Discard 2 Fire Energy cards attached to Shining Gyarados or this attack does nothing. This attack does 10 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) Then, flip a coin. If heads, choose 1 Energy card attached to each of your opponent's Pokémon that has any Energy cards attached to it and discard those Energy cards."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      130
    ],
    "flavorText": "Once it appears, it goes on a rampage. It remains enraged until it demolishes everything around it.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/neo3/65.png",
      "large": "https://images.pokemontcg.io/neo3/65_hires.png"
    }
  },
  {
    "id": "neo3-66",
    "name": "Shining Magikarp",
    "number": "66",
    "artist": "Ken Sugimori",
    "rarity": "Rare Shining",
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
      "small": "https://images.pokemontcg.io/neo3/66.png",
      "large": "https://images.pokemontcg.io/neo3/66_hires.png"
    }
  }
]

export default cardDetails
