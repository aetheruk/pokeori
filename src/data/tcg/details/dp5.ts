import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "dp5-1",
    "name": "Articuno",
    "number": "1",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Holo",
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
    "rules": [],
    "abilities": [
      {
        "name": "Freezing Screech",
        "text": "Once during your turn, when you put Articuno from your hand onto your Bench, you may flip a coin. If heads, choose 1 of the Defending Pokémon. That Pokémon is now Paralyzed.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Blizzard",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Flip a coin. If heads, this attack does 10 damage to each of your opponent's Benched Pokémon. If tails, this attack does 10 damage to each of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": "A legendary bird Pokémon. It can create blizzards by freezing moisture in the air.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/1.png",
      "large": "https://images.pokemontcg.io/dp5/1_hires.png"
    }
  },
  {
    "id": "dp5-2",
    "name": "Cresselia",
    "number": "2",
    "artist": "Mitsuhiro Arita",
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
        "name": "Future Sight",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 5 cards of either player's deck and put them back on top of that player's deck in any order."
      },
      {
        "name": "Healing Light",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "Remove 1 damage counter from each of your Pokémon."
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
      488
    ],
    "flavorText": "Shiny particles are released from its wings like a veil. It is said to represent the crescent moon.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/2.png",
      "large": "https://images.pokemontcg.io/dp5/2_hires.png"
    }
  },
  {
    "id": "dp5-3",
    "name": "Darkrai",
    "number": "3",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
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
        "name": "Darkness Shade",
        "text": "Once during your turn, when you put Darkrai from your hand onto your Bench, you may choose 1 of the Defending Pokémon. That Pokémon is now Asleep.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Dark Slumber",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "At the end of your opponent's next turn, the Defending Pokémon is now Asleep."
      },
      {
        "name": "Dark Resolve",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "If the Defending Pokémon is Asleep, remove 4 damage counters from Darkrai."
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
    "flavorText": "It can lull people to sleep and make them dream. It is active during nights of the new moon.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/3.png",
      "large": "https://images.pokemontcg.io/dp5/3_hires.png"
    }
  },
  {
    "id": "dp5-4",
    "name": "Dialga",
    "number": "4",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Adamant Orb: If an Active Pokémon has Weakness to Metal type, Dialga's attacks do 20 more damage to that Pokémon (before applying Weakness and Resistance)."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Time Shift",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw cards until you have 6 cards in your hand."
      },
      {
        "name": "Diamond Blast",
        "cost": [
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "60+",
        "text": "Flip a coin. If heads, this attack does 60 damage plus 20 more damage."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      483
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/4.png",
      "large": "https://images.pokemontcg.io/dp5/4_hires.png"
    }
  },
  {
    "id": "dp5-5",
    "name": "Glaceon",
    "number": "5",
    "artist": "Atsuko Nishida",
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
        "name": "Snow Cloak",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If heads, prevent all effects of an attack, including damage, done to Glaceon during your opponent's next turn."
      },
      {
        "name": "Speed Slide",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "This attack's damage isn't affected by Resistance, Poké-Powers, Poké-Bodies, or any other effects on the Defending Pokémon."
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
    "flavorText": "As a protective technique, it can completely freeze its fur to make its hairs stand like needles.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/5.png",
      "large": "https://images.pokemontcg.io/dp5/5_hires.png"
    }
  },
  {
    "id": "dp5-6",
    "name": "Kabutops",
    "number": "6",
    "artist": "Kouki Saitou",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Kabuto",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Primal Shell",
        "text": "As long as Kabutops is your Active Pokémon, your opponent can't play any Trainer cards from his or her hand.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Chop Up",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Does 10 damage to each of your opponent's Benched Pokémon that has any damage counters on it. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      141
    ],
    "flavorText": "It is thought that this Pokémon came onto land because its prey adapted to life on land.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/6.png",
      "large": "https://images.pokemontcg.io/dp5/6_hires.png"
    }
  },
  {
    "id": "dp5-7",
    "name": "Leafeon",
    "number": "7",
    "artist": "Kouki Saitou",
    "rarity": "Rare Holo",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Bind Down",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      },
      {
        "name": "Leaf Guard",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "During your opponent's next turn, any damage done to Leafeon by attacks is reduced by 20 (after applying Weakness and Resistance)."
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
    "flavorText": "Just like a plant, it uses photosynthesis. As a result, it is always enveloped in clear air.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/7.png",
      "large": "https://images.pokemontcg.io/dp5/7_hires.png"
    }
  },
  {
    "id": "dp5-8",
    "name": "Manaphy",
    "number": "8",
    "artist": "Suwama Chiaki",
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
        "name": "Aqua Skin",
        "text": "When you attach a Water Energy card from your hand to Manaphy, remove 2 damage counters from Manaphy.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Chase Up",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, search your deck for any 1 card and put it into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Fountain",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "You may attach up to 2 basic Water Energy cards from your hand to your Benched Pokémon in any way you like."
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
      "small": "https://images.pokemontcg.io/dp5/8.png",
      "large": "https://images.pokemontcg.io/dp5/8_hires.png"
    }
  },
  {
    "id": "dp5-9",
    "name": "Mewtwo",
    "number": "9",
    "artist": "Kent Kanetsuna",
    "rarity": "Rare Holo",
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
        "name": "Energy Absorption",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your discard pile for up to 2 Energy cards and attach them to Mewtwo."
      },
      {
        "name": "Recover",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard a Psychic Energy attached to Mewtwo and remove 6 damage counters from Mewtwo."
      },
      {
        "name": "Psyburn",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
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
      150
    ],
    "flavorText": "A Pokémon created by recombining Mew's genes. It's said to have the most savage heart among Pokémon.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/9.png",
      "large": "https://images.pokemontcg.io/dp5/9_hires.png"
    }
  },
  {
    "id": "dp5-10",
    "name": "Moltres",
    "number": "10",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Flame Charge",
        "text": "Once during your turn, when you put Moltres from your hand onto your Bench, you may flip a coin. If heads, search your discard pile for up to 3 Fire Energy cards and attach them to Moltres.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Scorching Wing",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "Discard all Fire Energy attached to Moltres."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      146
    ],
    "flavorText": "One of the legendary bird Pokémon. It is said that its appearance indicates the coming of spring.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/10.png",
      "large": "https://images.pokemontcg.io/dp5/10_hires.png"
    }
  },
  {
    "id": "dp5-11",
    "name": "Palkia",
    "number": "11",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Holo",
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
      "Lustrous Orb: If an Active Pokémon has Weakness to Water type, Palkia's attacks do 20 more damage to that Pokémon (before applying Weakness and Resistance)."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Zone Shift",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon."
      },
      {
        "name": "Pearl Blast",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "60",
        "text": "You may return an Energy card attached to Palkia to your hand. If you do, choose an Energy card attached to the Defending Pokémon and return it to your opponent's hand."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      484
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/11.png",
      "large": "https://images.pokemontcg.io/dp5/11_hires.png"
    }
  },
  {
    "id": "dp5-12",
    "name": "Phione",
    "number": "12",
    "artist": "Daisuke Ito",
    "rarity": "Rare Holo",
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
        "name": "Evolution Wish",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a card that evolves from 1 of your Pokémon and put it onto that Pokémon. (This counts as evolving that Pokémon.) Shuffle your deck afterward."
      },
      {
        "name": "Water Pulse",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "The Defending Pokémon is now Asleep."
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
      489
    ],
    "flavorText": "A Pokémon that lives in warm seas. It inflates the flotation sac on its head to drift and search for food.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/12.png",
      "large": "https://images.pokemontcg.io/dp5/12_hires.png"
    }
  },
  {
    "id": "dp5-13",
    "name": "Rotom",
    "number": "13",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
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
        "name": "Dual Trans",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your discard pile for up to 2 basic Energy cards and attach them to 1 of your Pokémon."
      },
      {
        "name": "Reflect Energy",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Move an Energy card attached to Rotom to 1 of your Benched Pokémon."
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
    "flavorText": "Its body is composed of plasma. It is known to infiltrate electronic devices and wreak havoc.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/13.png",
      "large": "https://images.pokemontcg.io/dp5/13_hires.png"
    }
  },
  {
    "id": "dp5-14",
    "name": "Zapdos",
    "number": "14",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Sheet Lightning",
        "text": "Once during your turn, when you put Zapdos from your hand onto your Bench, you may flip a coin. If heads, put 1 damage counter on each of your opponent's Pokémon.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Raging Thunder",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Does 40 damage to 1 of your Pokémon, and don't apply Weakness and Resistance to this damage."
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/14.png",
      "large": "https://images.pokemontcg.io/dp5/14_hires.png"
    }
  },
  {
    "id": "dp5-15",
    "name": "Aerodactyl",
    "number": "15",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Old Amber",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Primal Claw",
        "text": "After your opponent's Pokémon uses a Poké-Power, put 2 damage counters on that Pokémon.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Supersonic",
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
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      142
    ],
    "flavorText": "A Pokémon that roamed the skies in the dinosaur era. Its teeth are like saw blades.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/15.png",
      "large": "https://images.pokemontcg.io/dp5/15_hires.png"
    }
  },
  {
    "id": "dp5-16",
    "name": "Bronzong",
    "number": "16",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Bronzor",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Cursed Alloy",
        "text": "As long as Bronzong is your Active Pokémon, put 1 damage counter on each of your opponent's Pokémon that has any Poké-Powers between turns.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Pain Amplifier",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Put 1 damage counter on each of your opponent's Pokémon that already has damage counters on it."
      },
      {
        "name": "Coating",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "During your opponent's next turn, any damage done to Bronzong by attacks is reduced by 20 (after applying Weakness and Resistance)."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "+20"
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
    "flavorText": "One caused a news sensation when it was dug up at a construction site after a 2,000-year sleep.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/16.png",
      "large": "https://images.pokemontcg.io/dp5/16_hires.png"
    }
  },
  {
    "id": "dp5-17",
    "name": "Empoleon",
    "number": "17",
    "artist": "Kent Kanetsuna",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Prinplup",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dual Splash",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 2 of your opponent's Pokémon. This attack does 30 damage to each of them. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Surf Together",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "Does 50 damage plus 10 more damage for each of your Benched Pokémon. Flip a coin. If tails, this attack does 10 damage to each of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "+30"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      395
    ],
    "flavorText": "It swims as fast as a jet boat. The edges of its wings are sharp and can slice apart drifting ice.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/17.png",
      "large": "https://images.pokemontcg.io/dp5/17_hires.png"
    }
  },
  {
    "id": "dp5-18",
    "name": "Espeon",
    "number": "18",
    "artist": "Naoyo Kimura",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Sunlight Veil",
        "text": "Each of your Pokémon that evolves from Eevee gets +20 HP. You can't use more than 1 Sunlight Veil Poké-Body each turn.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Morning Sun",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "You may move an Energy card attached to Espeon to 1 of your Benched Pokémon."
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
      196
    ],
    "flavorText": "Its fur has the look and feel of velvet. The orb on its forehead glows when it uses psycho-power.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/18.png",
      "large": "https://images.pokemontcg.io/dp5/18_hires.png"
    }
  },
  {
    "id": "dp5-19",
    "name": "Flareon",
    "number": "19",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fire Fang",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Burned."
      },
      {
        "name": "Kindle",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Discard an Energy card attached to Flareon and then discard an Energy card attached to the Defending Pokémon."
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
      136
    ],
    "flavorText": "It has a flame sac in its body. Its body temperature tops 1,650 degrees Fahrenheit before battle.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/19.png",
      "large": "https://images.pokemontcg.io/dp5/19_hires.png"
    }
  },
  {
    "id": "dp5-20",
    "name": "Glaceon",
    "number": "20",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Ice Shot",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Does 10 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Icy Wind",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Asleep."
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
    "flavorText": "As a protective technique, it can completely freeze its fur to make its hairs stand like needles.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/20.png",
      "large": "https://images.pokemontcg.io/dp5/20_hires.png"
    }
  },
  {
    "id": "dp5-21",
    "name": "Hippowdon",
    "number": "21",
    "artist": "Kent Kanetsuna",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Hippopotas",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Vacuum Sand",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "20",
        "text": "Search your discard pile for a Fighting Energy card and attach it to Hippowdon."
      },
      {
        "name": "Sand Impact",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "Flip a coin for each Fighting Energy attached to Hippowdon. This attack does 50 damage plus 20 more damage for each heads."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      450
    ],
    "flavorText": "Its huge mouth is almost seven feet across. It has enough power to completely crush a car.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/21.png",
      "large": "https://images.pokemontcg.io/dp5/21_hires.png"
    }
  },
  {
    "id": "dp5-22",
    "name": "Infernape",
    "number": "22",
    "artist": "Daisuke Ito",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "110",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Monferno",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mach Punch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Does 10 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Mega Bravo",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "40×",
        "text": "Discard all Fire Energy attached to Infernape. This attack does 40 damage times the amount of Fire Energy you discarded."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "+30"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      392
    ],
    "flavorText": "Its crown of fire is indicative of its fiery nature. It is beaten by none in terms of quickness.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/22.png",
      "large": "https://images.pokemontcg.io/dp5/22_hires.png"
    }
  },
  {
    "id": "dp5-23",
    "name": "Jolteon",
    "number": "23",
    "artist": "Midori Harada",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Thunder Fang",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Lightning Strike",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "You may discard 2 Energy attached to Jolteon. If you do, this attack's base damage is 90 instead of 50."
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
    "flavorText": "It controls 10,000-volt power and can raise all the furs on its body as if it were sharp needles.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/23.png",
      "large": "https://images.pokemontcg.io/dp5/23_hires.png"
    }
  },
  {
    "id": "dp5-24",
    "name": "Leafeon",
    "number": "24",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Sprial Drain",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Remove 1 damage counter from Leafeon."
      },
      {
        "name": "Leaf Blade",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "Flip a coin. If heads, this attack does 50 damage plus 20 more damage."
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      470
    ],
    "flavorText": "Just like a plant, it uses photosynthesis. As a result, it is always enveloped in clear air.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/24.png",
      "large": "https://images.pokemontcg.io/dp5/24_hires.png"
    }
  },
  {
    "id": "dp5-25",
    "name": "Minun",
    "number": "25",
    "artist": "Suwama Chiaki",
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
        "name": "(+) Spark",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "If Plusle is on your Bench, this attack does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      312
    ],
    "flavorText": "It cheers on friends. If its friends are losing, its body lets off more and more sparks.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/25.png",
      "large": "https://images.pokemontcg.io/dp5/25_hires.png"
    }
  },
  {
    "id": "dp5-26",
    "name": "Omastar",
    "number": "26",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "110",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Omanyte",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Primal Swirl",
        "text": "Once during your turn, when you play Omastar from your hand to evolve 1 of your Pokémon, you may remove the highest Stage Evolution card from each of your opponent's Benched Evolved Pokémon and put those cards back into his or her hand. You can't use more than 1 Primal Swirl Poké-Power each turn.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Send Back",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon."
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
      139
    ],
    "flavorText": "It is thought that this Pokémon became extinct because its spiral shell grew too large.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/26.png",
      "large": "https://images.pokemontcg.io/dp5/26_hires.png"
    }
  },
  {
    "id": "dp5-27",
    "name": "Phione",
    "number": "27",
    "artist": "Ken Sugimori",
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
        "name": "Charm",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, any damage done by attacks from the Defending Pokémon is reduced by 20 (before applying Weakness and Resistance)."
      },
      {
        "name": "Whirlpool",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, discard an Energy card attached to the Defending Pokémon."
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
      489
    ],
    "flavorText": "A Pokémon that lives in warm seas. It inflates the flotation sac on its head to drift and search for food.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/27.png",
      "large": "https://images.pokemontcg.io/dp5/27_hires.png"
    }
  },
  {
    "id": "dp5-28",
    "name": "Plusle",
    "number": "28",
    "artist": "Suwama Chiaki",
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
        "name": "– Boost",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "If Minun is on your Bench, this attack does 20 damage plus 20 more damage."
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
      311
    ],
    "flavorText": "It cheers on friends with pom-poms made of sparks. It drains power from telephone poles.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/28.png",
      "large": "https://images.pokemontcg.io/dp5/28_hires.png"
    }
  },
  {
    "id": "dp5-29",
    "name": "Scizor",
    "number": "29",
    "artist": "Daisuke Ito",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Scyther",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Special Blow",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "30+",
        "text": "If the Defending Pokémon has any Special Energy cards attached to it, this attack does 30 damage plus 50 more damage."
      },
      {
        "name": "X-Scissor",
        "cost": [
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "Flip a coin. If heads, this attack does 50 damage plus 40 more damage."
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
      212
    ],
    "flavorText": "It has a steel-hard body. It intimidates foes by upraising its eye-patterned pincers.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/29.png",
      "large": "https://images.pokemontcg.io/dp5/29_hires.png"
    }
  },
  {
    "id": "dp5-30",
    "name": "Torterra",
    "number": "30",
    "artist": "Daisuke Ito",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Grotle",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Earthquake",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Does 10 damage to each of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Frenzy Plant",
        "cost": [
          "Grass",
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": "Torterra can't use Frenzy Plant during your next turn."
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
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      389
    ],
    "flavorText": "Groups of this Pokémon migrating in search of water have been mistaken for \"moving forests.\"",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/30.png",
      "large": "https://images.pokemontcg.io/dp5/30_hires.png"
    }
  },
  {
    "id": "dp5-31",
    "name": "Toxicroak",
    "number": "31",
    "artist": "Kent Kanetsuna",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Croagunk",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Paralyze Poison",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "The Defending Pokémon is now Poisoned. Flip a coin. If heads, the Defending Pokémon is now Paralyzed and Poisoned."
      },
      {
        "name": "Slash",
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
      454
    ],
    "flavorText": "The toxin made in its poison sacs is pumped to the knuckle claws through tubes down its arms.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/31.png",
      "large": "https://images.pokemontcg.io/dp5/31_hires.png"
    }
  },
  {
    "id": "dp5-32",
    "name": "Umbreon",
    "number": "32",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Moonlight Veil",
        "text": "Each of your Pokémon that evolves from Eevee has no Weakness, and that Pokémon's Retreat Cost is 0.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Confuse Ray",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "The Defending Pokémon is now Confused."
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
        "type": "Psychic",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      197
    ],
    "flavorText": "The light of the moon changed Eevee's genetic structure. It lurks in darkness for prey.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/32.png",
      "large": "https://images.pokemontcg.io/dp5/32_hires.png"
    }
  },
  {
    "id": "dp5-33",
    "name": "Unown [P]",
    "number": "33",
    "artist": "Kent Kanetsuna",
    "rarity": "Rare",
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
        "name": "PUT",
        "text": "Once during your turn (before your attack), if Unown P is on your Bench, you may put 1 damage counter on 1 of your Pokémon (excluding any Unown).",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Hidden Power",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "Each player discards the top card of his or her deck. This attack does 20 damage plus 20 more damage for each Unown discarded in this way."
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
      201
    ],
    "flavorText": "Shaped like ancient writing, it is a huge mystery whether language or Unown came first.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/33.png",
      "large": "https://images.pokemontcg.io/dp5/33_hires.png"
    }
  },
  {
    "id": "dp5-34",
    "name": "Vaporeon",
    "number": "34",
    "artist": "Kagemaru Himeno",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Cleanse Away",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Remove 2 damage counters from each of your Benched Pokémon."
      },
      {
        "name": "Hyper Whirlpool",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Flip a coin until you get tails. For each heads, discard an Energy card attached to the Defending Pokémon."
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
      134
    ],
    "flavorText": "It has evolved to be suitable for aquatic life. It can invisibly melt away into water.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/34.png",
      "large": "https://images.pokemontcg.io/dp5/34_hires.png"
    }
  },
  {
    "id": "dp5-35",
    "name": "Ambipom",
    "number": "35",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Aipom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Astonish",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Choose 1 card from your opponent's hand without looking. Look at that card you chose, then have your opponent shuffle that card into his or her deck."
      },
      {
        "name": "Hang High",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 40 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      424
    ],
    "flavorText": "To eat, it deftly shucks nuts with its two tails. It rarely uses its arms now.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/35.png",
      "large": "https://images.pokemontcg.io/dp5/35_hires.png"
    }
  },
  {
    "id": "dp5-36",
    "name": "Fearow",
    "number": "36",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Spearow",
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
        "damage": "20×",
        "text": "Flip 3 coins. This attack does 20 damage times the number of heads."
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
      22
    ],
    "flavorText": "It has the stamina to fly all day on its broad wings. It fights by using its sharp beak.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/36.png",
      "large": "https://images.pokemontcg.io/dp5/36_hires.png"
    }
  },
  {
    "id": "dp5-37",
    "name": "Grotle",
    "number": "37",
    "artist": "Daisuke Ito",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
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
        "name": "Planting",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Attach a Grass Energy card from your hand to 1 of your Pokémon."
      },
      {
        "name": "Body Slam",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      388
    ],
    "flavorText": "The shell is hardened soil. Some Pokémon come to peck the berries growing on the trees on its back.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/37.png",
      "large": "https://images.pokemontcg.io/dp5/37_hires.png"
    }
  },
  {
    "id": "dp5-38",
    "name": "Kangaskhan",
    "number": "38",
    "artist": "Atsuko Nishida",
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
        "name": "Comet Punch",
        "cost": [
          "Colorless",
          "Colorless",
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
        "value": "+20"
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
      115
    ],
    "flavorText": "It raises its offspring in its belly pouch. It lets the baby out to play only when it feels safe.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/38.png",
      "large": "https://images.pokemontcg.io/dp5/38_hires.png"
    }
  },
  {
    "id": "dp5-39",
    "name": "Lickitung",
    "number": "39",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
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
      "Lickilicky"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Lap Up",
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
      108
    ],
    "flavorText": "Instead of hands, it uses its tongue, which is twice its height. Its sticky saliva grips anything.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/39.png",
      "large": "https://images.pokemontcg.io/dp5/39_hires.png"
    }
  },
  {
    "id": "dp5-40",
    "name": "Manectric",
    "number": "40",
    "artist": "Daisuke Ito",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Electrike",
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
        "damage": "30",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Volt Crush",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40+",
        "text": "Flip a coin. If heads, discard an Energy attached to Manectric and this attack does 40 damage plus 30 more damage."
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
      310
    ],
    "flavorText": "It discharges electricity from its mane. It creates a thundercloud overhead to drop lightning bolts.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/40.png",
      "large": "https://images.pokemontcg.io/dp5/40_hires.png"
    }
  },
  {
    "id": "dp5-41",
    "name": "Monferno",
    "number": "41",
    "artist": "Daisuke Ito",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
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
        "name": "Fire Fang",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "The Defending Pokémon is now Burned."
      },
      {
        "name": "Mid-air Strike",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 30 damage plus 30 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "+20"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      391
    ],
    "flavorText": "It uses ceilings and walls to launch aerial attacks. Its fiery tail is but one weapon.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/41.png",
      "large": "https://images.pokemontcg.io/dp5/41_hires.png"
    }
  },
  {
    "id": "dp5-42",
    "name": "Mothim",
    "number": "42",
    "artist": "Masakazu Fukuda",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Burmy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Disturbance Scales",
        "text": "Any damage done by attacks from your Pokémon to the Defending Pokémon isn't affected by Resistance.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Get Help",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30×",
        "text": "Does 30 damage times the number of different types of Wormadam on your Bench."
      },
      {
        "name": "Quick Touch",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "You may switch Mothim with 1 of your Benched Pokémon. If you do, move as many Energy cards attached to Mothim as you like to the new Active Pokémon."
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      414
    ],
    "flavorText": "It loves the honey of flowers and steals honey collected by Combee.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/42.png",
      "large": "https://images.pokemontcg.io/dp5/42_hires.png"
    }
  },
  {
    "id": "dp5-43",
    "name": "Pachirisu",
    "number": "43",
    "artist": "Tomokazu Komiya",
    "rarity": "Uncommon",
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
        "name": "Trans Tail",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your discard pile for a Lightning Energy card, show it to your opponent, and put it into your hand."
      },
      {
        "name": "Thundershock",
        "cost": [
          "Lightning",
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
    "flavorText": "It makes electricity with pouches in its cheeks and shoots charges from its tail. It lives atop trees.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/43.png",
      "large": "https://images.pokemontcg.io/dp5/43_hires.png"
    }
  },
  {
    "id": "dp5-44",
    "name": "Prinplup",
    "number": "44",
    "artist": "Kent Kanetsuna",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Piplup",
    "evolvesTo": [
      "Empoleon"
    ],
    "rules": [],
    "abilities": [],
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
        "name": "Wash Over",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Does 10 damage to 2 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      394
    ],
    "flavorText": "Its wings deliver wicked blows that snap even the thickest of trees. It searches for prey in icy seas.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/44.png",
      "large": "https://images.pokemontcg.io/dp5/44_hires.png"
    }
  },
  {
    "id": "dp5-45",
    "name": "Raichu",
    "number": "45",
    "artist": "Daisuke Ito",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Pikachu",
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
        "text": "Flip a coin. If heads, prevent all effects of an attack, including damage, done to Raichu during your opponent's next turn."
      },
      {
        "name": "Thunderbolt",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "Discard all Energy cards attached to Raichu."
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
      26
    ],
    "flavorText": "It can loose 100,000-volt bursts of electricity, instantly downing foes several times its size.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/45.png",
      "large": "https://images.pokemontcg.io/dp5/45_hires.png"
    }
  },
  {
    "id": "dp5-46",
    "name": "Scyther",
    "number": "46",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
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
        "name": "Slash",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Fury Cutter",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip 3 coins. If 1 of them is heads, this attack does 10 damage plus 10 more damage. If 2 of them are heads, this attack does 10 damage plus 20 more damage. If all of them are heads, this attack does 10 damage plus 40 more damage."
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      123
    ],
    "flavorText": "It is nearly impossible to parry its attacking scythes. Its movements are like a ninja's.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/46.png",
      "large": "https://images.pokemontcg.io/dp5/46_hires.png"
    }
  },
  {
    "id": "dp5-47",
    "name": "Staravia",
    "number": "47",
    "artist": "Kent Kanetsuna",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
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
        "name": "Quick Attack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 30 more damage."
      },
      {
        "name": "Drill Peck",
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
    "flavorText": "It lives in forests and fields. Squabbles over territory occur when flocks collide.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/47.png",
      "large": "https://images.pokemontcg.io/dp5/47_hires.png"
    }
  },
  {
    "id": "dp5-48",
    "name": "Sudowoodo",
    "number": "48",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
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
        "name": "Flail",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Does 10 damage times the number of damage counters on Sudowoodo."
      },
      {
        "name": "Wood Hammer",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Sudowoodo does 30 damage to itself."
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
      185
    ],
    "flavorText": "It stands along paths pretending to be a tree. If it starts raining, it seems to disappear.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/48.png",
      "large": "https://images.pokemontcg.io/dp5/48_hires.png"
    }
  },
  {
    "id": "dp5-49",
    "name": "Unown [Q]",
    "number": "49",
    "artist": "Kent Kanetsuna",
    "rarity": "Uncommon",
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
    "abilities": [
      {
        "name": "QUICK",
        "text": "Once during your turn (before your attack), if Unown Q is on your Bench, you may discard all cards attached to Unown Q and attach Unown Q to 1 of your Pokémon as a Pokémon Tool card. As long as Unown Q is attached to a Pokémon, you pay Colorless less to retreat that Pokémon.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Hidden Power",
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
        "type": "Psychic",
        "value": "+10"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      201
    ],
    "flavorText": "Shaped like ancient writing, it is a huge mystery whether language or Unown came first.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/49.png",
      "large": "https://images.pokemontcg.io/dp5/49_hires.png"
    }
  },
  {
    "id": "dp5-50",
    "name": "Aipom",
    "number": "50",
    "artist": "Tomokazu Komiya",
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
      "Ambipom"
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
        "name": "Hand Trick",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Return Aipom and all cards attached to it to your hand. (If you don't have any Benched Pokémon, this attack does nothing.)"
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
      190
    ],
    "flavorText": "It lives atop giant trees. It wraps its tail around a branch so it won't fall off while asleep.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/50.png",
      "large": "https://images.pokemontcg.io/dp5/50_hires.png"
    }
  },
  {
    "id": "dp5-51",
    "name": "Aipom",
    "number": "51",
    "artist": "Kouki Saitou",
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
      "Ambipom"
    ],
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
        "name": "Last Resort",
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
      190
    ],
    "flavorText": "It uses its tail to pluck fruits that are out of reach. Its tail is more adept than its real hands.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/51.png",
      "large": "https://images.pokemontcg.io/dp5/51_hires.png"
    }
  },
  {
    "id": "dp5-52",
    "name": "Bronzor",
    "number": "52",
    "artist": "Daisuke Ito",
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
      "Bronzong"
    ],
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
        "name": "Confuse Ray",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "+10"
      }
    ],
    "resistances": [
      {
        "type": "Fire",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      436
    ],
    "flavorText": "X-ray photos were taken to check its body structure. Nothing appeared, however.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/52.png",
      "large": "https://images.pokemontcg.io/dp5/52_hires.png"
    }
  },
  {
    "id": "dp5-53",
    "name": "Buneary",
    "number": "53",
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
      "Lopunny"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Drawup Power",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your deck for an Energy card, show it to your opponent, and put it into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Extend Ears",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Remove 1 damage counter from each of your Benched Pokémon."
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
    "flavorText": "When it senses danger, it perks up its ears. On cold nights, it sleeps with its head tucked into its fur.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/53.png",
      "large": "https://images.pokemontcg.io/dp5/53_hires.png"
    }
  },
  {
    "id": "dp5-54",
    "name": "Burmy Sandy Cloak",
    "number": "54",
    "artist": "Ken Sugimori",
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
      "Wormadam"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Iron Defense",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, prevent all effects of an attack, including damage, done to Burmy Sandy Cloak during your opponent's next turn."
      },
      {
        "name": "Tackle",
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
      412
    ],
    "flavorText": "If its cloak is broken in battle, it quickly remakes the cloak with materials nearby.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/54.png",
      "large": "https://images.pokemontcg.io/dp5/54_hires.png"
    }
  },
  {
    "id": "dp5-55",
    "name": "Chatot",
    "number": "55",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mimic",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Shuffle your hand into your deck. Then, draw a number of cards equal to the number of cards in your opponent's hand."
      },
      {
        "name": "Chatter",
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
      441
    ],
    "flavorText": "It can learn and speak human words. If they gather, they all learn the same saying.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/55.png",
      "large": "https://images.pokemontcg.io/dp5/55_hires.png"
    }
  },
  {
    "id": "dp5-56",
    "name": "Chimchar",
    "number": "56",
    "artist": "Daisuke Ito",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "40",
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
      },
      {
        "name": "Lunge",
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
    "flavorText": "Its fiery rear end is fueled by gas made in its belly. Even rain can't extinguish the fire.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/56.png",
      "large": "https://images.pokemontcg.io/dp5/56_hires.png"
    }
  },
  {
    "id": "dp5-57",
    "name": "Chimchar",
    "number": "57",
    "artist": "Naoyo Kimura",
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
    "rules": [
      "Cheri Berry: If Chimchar is Paralyzed, remove the Special Condition Paralyzed from Chimchar at the end of each player's turn."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Fury Swipes",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 3 coins. This attack does 10 damage times the number of heads."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/57.png",
      "large": "https://images.pokemontcg.io/dp5/57_hires.png"
    }
  },
  {
    "id": "dp5-58",
    "name": "Chingling",
    "number": "58",
    "artist": "Ken Sugimori",
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
      "Chimecho"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Baby Evolution",
        "text": "Once during your turn (before your attack), you may put Chimecho from your hand onto Chingling (this counts as evolving Chingling) and remove all damage counters from Chingling.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Uproar",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Flip a coin. If heads, this attack does 10 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      433
    ],
    "flavorText": "It emits cries by agitating an orb at the back of its throat. It moves with flouncing hops.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/58.png",
      "large": "https://images.pokemontcg.io/dp5/58_hires.png"
    }
  },
  {
    "id": "dp5-59",
    "name": "Combee",
    "number": "59",
    "artist": "Midori Harada",
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
      "Vespiquen"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Honey Scent",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Remove 2 damage counters from 1 of your Pokémon."
      },
      {
        "name": "Flitter",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 20 damage to that Pokémon. This attack's damage isn't affected by Weakness or Resistance."
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
        "type": "Fighting",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      415
    ],
    "flavorText": "It collects and delivers honey to its colony. At night, they cluster to form a beehive and sleep.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/59.png",
      "large": "https://images.pokemontcg.io/dp5/59_hires.png"
    }
  },
  {
    "id": "dp5-60",
    "name": "Croagunk",
    "number": "60",
    "artist": "Kent Kanetsuna",
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
      "Toxicroak"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Light Punch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Poison Sting",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Poisoned."
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
      453
    ],
    "flavorText": "Inflating its poison sacs, it makes an eerie blubbering sound for intimidation.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/60.png",
      "large": "https://images.pokemontcg.io/dp5/60_hires.png"
    }
  },
  {
    "id": "dp5-61",
    "name": "Drifloon",
    "number": "61",
    "artist": "Masakazu Fukuda",
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
      "Drifblim"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Delivery",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Flip a coin. If heads, put any 1 card from your discard pile into your hand."
      },
      {
        "name": "Reaction",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Switch Drifloon with 1 of your Benched Pokémon."
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
    "flavorText": "It tugs on the hands of children to steal them away. However, it gets pulled around instead.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/61.png",
      "large": "https://images.pokemontcg.io/dp5/61_hires.png"
    }
  },
  {
    "id": "dp5-62",
    "name": "Eevee",
    "number": "62",
    "artist": "Ken Sugimori",
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
        "text": "Search your deck for as many Eevee as you like and put them onto your Bench. Shuffle your deck afterward."
      },
      {
        "name": "Lunge",
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
    "flavorText": "A rare Pokémon that adapts to harsh environments by taking on different evolutionary forms.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/62.png",
      "large": "https://images.pokemontcg.io/dp5/62_hires.png"
    }
  },
  {
    "id": "dp5-63",
    "name": "Eevee",
    "number": "63",
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
        "name": "Gnaw",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Sand Attack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If the Defending Pokémon tries to attack during your opponent's next turn, your opponent flips a coin. If tails, that attack does nothing."
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
    "flavorText": "A rare Pokémon that adapts to harsh environments by taking on different evolutionary forms.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/63.png",
      "large": "https://images.pokemontcg.io/dp5/63_hires.png"
    }
  },
  {
    "id": "dp5-64",
    "name": "Electrike",
    "number": "64",
    "artist": "Daisuke Ito",
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
        "name": "Random Spark",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 10 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      309
    ],
    "flavorText": "Using electricity stored in its fur, it stimulates its muscles to heighten its reaction speed.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/64.png",
      "large": "https://images.pokemontcg.io/dp5/64_hires.png"
    }
  },
  {
    "id": "dp5-65",
    "name": "Glameow",
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
      "Purugly"
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
        "text": "Search your deck for a Basic Pokémon and put it onto your Bench. Shuffle your deck afterward."
      },
      {
        "name": "Rip Claw",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Flip a coin. If heads, discard an Energy attached to the Defending Pokémon."
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
      431
    ],
    "flavorText": "With its sharp glare, it puts foes in a mild hypnotic state. It is a very fickle Pokémon.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/65.png",
      "large": "https://images.pokemontcg.io/dp5/65_hires.png"
    }
  },
  {
    "id": "dp5-66",
    "name": "Hippopotas",
    "number": "66",
    "artist": "Kent Kanetsuna",
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
      "Hippowdon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Grainy Sand",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 10 more damage."
      },
      {
        "name": "Double-edge",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "Hippopotas does 10 damage to itself."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      449
    ],
    "flavorText": "It enshrouds itself with sand to protect itself from germs. It does not enjoy getting wet.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/66.png",
      "large": "https://images.pokemontcg.io/dp5/66_hires.png"
    }
  },
  {
    "id": "dp5-67",
    "name": "Kabuto",
    "number": "67",
    "artist": "Midori Harada",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Dome Fossil",
    "evolvesTo": [
      "Kabutops"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Ancient Guidance",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, search your deck for Helix Fossil, Dome Fossil, or Old Amber and put it onto your Bench. Shuffle your deck afterward. This power can't be used if Kabuto is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Shell Attack",
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
        "value": "+20"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      140
    ],
    "flavorText": "It is thought to have inhabited beaches 300 million years ago. It is protected by a stiff shell.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/67.png",
      "large": "https://images.pokemontcg.io/dp5/67_hires.png"
    }
  },
  {
    "id": "dp5-68",
    "name": "Munchlax",
    "number": "68",
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
        "name": "Lick",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
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
    "flavorText": "It hides food under its long body hair. However, it forgets it has hidden the food.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/68.png",
      "large": "https://images.pokemontcg.io/dp5/68_hires.png"
    }
  },
  {
    "id": "dp5-69",
    "name": "Omanyte",
    "number": "69",
    "artist": "Suwama Chiaki",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Helix Fossil",
    "evolvesTo": [
      "Omastar"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Call Up",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, search your discard pile for Helix Fossil, Dome Fossil, or Old Amber and put it onto your Bench. This power can't be used if Omanyte is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Wash Over",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Does 10 damage to 2 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      138
    ],
    "flavorText": "A Pokémon that was resurrected from a fossil using modern science. It swam in ancient seas.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/69.png",
      "large": "https://images.pokemontcg.io/dp5/69_hires.png"
    }
  },
  {
    "id": "dp5-70",
    "name": "Pikachu",
    "number": "70",
    "artist": "Daisuke Ito",
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
        "name": "Quick Attack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 10 more damage."
      },
      {
        "name": "Volt Tackle",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Pikachu does 10 damage to itself."
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
    "flavorText": "If it looses crackling power from the electric pouches on its cheeks, it is being wary.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/70.png",
      "large": "https://images.pokemontcg.io/dp5/70_hires.png"
    }
  },
  {
    "id": "dp5-71",
    "name": "Piplup",
    "number": "71",
    "artist": "Kent Kanetsuna",
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
        "name": "Water Splash",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 10 more damage."
      },
      {
        "name": "Headbutt",
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
    "flavorText": "It lives along shores in northern countries. A skilled swimmer, it dives for over 10 minutes to hunt.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/71.png",
      "large": "https://images.pokemontcg.io/dp5/71_hires.png"
    }
  },
  {
    "id": "dp5-72",
    "name": "Piplup",
    "number": "72",
    "artist": "Naoyo Kimura",
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
      "Prinplup"
    ],
    "rules": [
      "Pecha Berry: If Piplup is Poisoned, remove the Special Condition Poisoned from Piplup at the end of each player's turn."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Splatter",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 10 damage to that Pokémon. This attack's damage isn't affected by Weakness or Resistance."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/72.png",
      "large": "https://images.pokemontcg.io/dp5/72_hires.png"
    }
  },
  {
    "id": "dp5-73",
    "name": "Shellos East Sea",
    "number": "73",
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
      "Gastrodon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Surf",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Muddy Water",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Does 10 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      422
    ],
    "flavorText": "It lives along bodies of water. Its body shape changed to suit its habitat.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/73.png",
      "large": "https://images.pokemontcg.io/dp5/73_hires.png"
    }
  },
  {
    "id": "dp5-74",
    "name": "Spearow",
    "number": "74",
    "artist": "Ken Sugimori",
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
        "name": "Wing Attack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Claw",
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
      21
    ],
    "flavorText": "It flaps its small wings busily to fly. Using its beak, it searches in grass for prey.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/74.png",
      "large": "https://images.pokemontcg.io/dp5/74_hires.png"
    }
  },
  {
    "id": "dp5-75",
    "name": "Starly",
    "number": "75",
    "artist": "Kent Kanetsuna",
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
        "name": "Whirlwind",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon."
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
    "flavorText": "Usually with a large flock, it is barely noticeable when alone. Its cries are very strident.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/75.png",
      "large": "https://images.pokemontcg.io/dp5/75_hires.png"
    }
  },
  {
    "id": "dp5-76",
    "name": "Stunky",
    "number": "76",
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
      "Skuntank"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Gas",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Poisoned."
      },
      {
        "name": "Slash",
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
      434
    ],
    "flavorText": "It sprays a nose-curling, stinky fluid from its rear to repel attackers.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/76.png",
      "large": "https://images.pokemontcg.io/dp5/76_hires.png"
    }
  },
  {
    "id": "dp5-77",
    "name": "Turtwig",
    "number": "77",
    "artist": "Daisuke Ito",
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
        "name": "Rollout",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Razor Leaf",
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
    "flavorText": "It undertakes photosynthesis with its body, making oxygen. The leaf on its head wilts if it is thirsty.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/77.png",
      "large": "https://images.pokemontcg.io/dp5/77_hires.png"
    }
  },
  {
    "id": "dp5-78",
    "name": "Turtwig",
    "number": "78",
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
      "Grotle"
    ],
    "rules": [
      "Persim Berry: If Turtwig is Confused, remove the Special Condition Confused from Turtwig at the end of each player's turn."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Bite",
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/78.png",
      "large": "https://images.pokemontcg.io/dp5/78_hires.png"
    }
  },
  {
    "id": "dp5-79",
    "name": "Dawn Stadium",
    "number": "79",
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
      "This card stays in play when you play it. Discard this card if another Stadium card comes into play. If another card with the same name is in play, you can't play this card.",
      "Whenever any player attaches an Energy card from his or her hand to Grass Pokémon or Water Pokémon, remove 1 damage counter and all Special Conditions from that Pokémon."
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
      "small": "https://images.pokemontcg.io/dp5/79.png",
      "large": "https://images.pokemontcg.io/dp5/79_hires.png"
    }
  },
  {
    "id": "dp5-80",
    "name": "Dusk Ball",
    "number": "80",
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
      "Look at the 7 cards from the bottom of your deck. Choose 1 Pokémon you find there, show it to your opponent, and put it into your hand. Put the remaining cards back on top of your deck. Shuffle your deck afterward."
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
      "small": "https://images.pokemontcg.io/dp5/80.png",
      "large": "https://images.pokemontcg.io/dp5/80_hires.png"
    }
  },
  {
    "id": "dp5-81",
    "name": "Energy Restore",
    "number": "81",
    "artist": "Hideyuki Nakajima",
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
      "Flip 3 coins. For each heads, put a Basic Energy card from your discard pile into your hand. If you don't have that many basic Energy cards in your discard pile, put all of them into your hand."
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
      "small": "https://images.pokemontcg.io/dp5/81.png",
      "large": "https://images.pokemontcg.io/dp5/81_hires.png"
    }
  },
  {
    "id": "dp5-82",
    "name": "Fossil Excavator",
    "number": "82",
    "artist": "Kanako Eo",
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
      "Search your deck or discard pile for a Trainer card that has Fossil in its name or a Stage 1 or Stage 2 Evolution card that evolves from a Fossil. Show it to your opponent and put it into your hand. If you searched your deck, shuffle your deck afterward."
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
      "small": "https://images.pokemontcg.io/dp5/82.png",
      "large": "https://images.pokemontcg.io/dp5/82_hires.png"
    }
  },
  {
    "id": "dp5-83",
    "name": "Mom's Kindness",
    "number": "83",
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
      "Draw 2 cards."
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
      "small": "https://images.pokemontcg.io/dp5/83.png",
      "large": "https://images.pokemontcg.io/dp5/83_hires.png"
    }
  },
  {
    "id": "dp5-84",
    "name": "Old Amber",
    "number": "84",
    "artist": "Ryo Ueda",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": "50",
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Play Old Amber as if it were a Colorless Basic Pokémon. (Old Amber counts as a Trainer card as well, but if Old Amber is Knocked Out, this counts as a Knocked Out Pokémon.) Old Amber can't be affected by any Special Conditions and can't retreat. At any time during your turn before your attack, you may discard Old Amber from play. (This doesn't count as a Knocked Out Pokémon.)"
    ],
    "abilities": [
      {
        "name": "Hard Amber",
        "text": "As long as Old Amber is on your Bench, prevent all damage done to Old Amber by attacks (both yours and your opponent's).",
        "type": "Poké-Body"
      }
    ],
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
      "small": "https://images.pokemontcg.io/dp5/84.png",
      "large": "https://images.pokemontcg.io/dp5/84_hires.png"
    }
  },
  {
    "id": "dp5-85",
    "name": "Poké Ball",
    "number": "85",
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
      "Flip a coin. If heads, search your deck for a Pokémon, show it to your opponent, and put it into your hand. Shuffle your deck afterward."
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
      "small": "https://images.pokemontcg.io/dp5/85.png",
      "large": "https://images.pokemontcg.io/dp5/85_hires.png"
    }
  },
  {
    "id": "dp5-86",
    "name": "Quick Ball",
    "number": "86",
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
      "Reveal cards from your deck until you reveal a Pokémon. Show that Pokémon to your opponent and put it into your hand. Shuffle the other revealed cards back into your deck. (If you don't reveal a Pokémon, shuffle all the revealed cards back into your deck.)"
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
      "small": "https://images.pokemontcg.io/dp5/86.png",
      "large": "https://images.pokemontcg.io/dp5/86_hires.png"
    }
  },
  {
    "id": "dp5-87",
    "name": "Super Scoop Up",
    "number": "87",
    "artist": "Shizurow",
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
      "Flip a coin. If heads, return 1 of your Pokémon and all cards attached to it to your hand."
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
      "small": "https://images.pokemontcg.io/dp5/87.png",
      "large": "https://images.pokemontcg.io/dp5/87_hires.png"
    }
  },
  {
    "id": "dp5-88",
    "name": "Warp Point",
    "number": "88",
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
      "Your opponent switches 1 of his or her Defending Pokémon with 1 of his or her Benched Pokémon, if any. You switch 1 of your Active Pokémon with 1 of your Benched Pokémon, if any."
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
      "small": "https://images.pokemontcg.io/dp5/88.png",
      "large": "https://images.pokemontcg.io/dp5/88_hires.png"
    }
  },
  {
    "id": "dp5-89",
    "name": "Dome Fossil",
    "number": "89",
    "artist": "Ryo Ueda",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": "50",
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Play Dome Fossil as if it were a Colorless Basic Pokémon. (Dome Fossil counts as a Trainer card as well, but if Dome Fossil is Knocked Out, this counts as a Knocked Out Pokémon.) Dome Fossil can't be affected by any Special Conditions and can't retreat. At any time during your turn before your attack, you may discard Dome Fossil from play. (This doesn't count as a Knocked Out Pokémon.)"
    ],
    "abilities": [
      {
        "name": "Rock Reaction",
        "text": "When you attach a Fighting Energy card from your hand to Dome Fossil (excluding effects of attacks or Poké-Powers), search your deck for a card that evolves from Dome Fossil and put it onto Dome Fossil (this counts as evolving Dome Fossil). Shuffle your deck afterward.",
        "type": "Poké-Body"
      }
    ],
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
      "small": "https://images.pokemontcg.io/dp5/89.png",
      "large": "https://images.pokemontcg.io/dp5/89_hires.png"
    }
  },
  {
    "id": "dp5-90",
    "name": "Energy Search",
    "number": "90",
    "artist": "Ryo Ueda",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Search your deck for a basic Energy card, show it to your opponent, and put it into your hand. Shuffle your deck afterward."
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
      "small": "https://images.pokemontcg.io/dp5/90.png",
      "large": "https://images.pokemontcg.io/dp5/90_hires.png"
    }
  },
  {
    "id": "dp5-91",
    "name": "Helix Fossil",
    "number": "91",
    "artist": "Ryo Ueda",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": "50",
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Play Helix Fossil as if it were a Colorless Basic Pokémon. (Helix Fossil counts as a Trainer card as well, but if Helix Fossil is Knocked Out, this counts as a Knocked Out Pokémon.) Helix Fossil can't be affected by any Special Conditions and can't retreat. At any time during your turn before your attack, you may discard Helix Fossil from play. (This doesn't count as a Knocked Out Pokémon.)"
    ],
    "abilities": [
      {
        "name": "Aqua Reaction",
        "text": "When you attach a Water Energy card from your hand to Helix Fossil (excluding effects of attacks or Poké-Powers), search your deck for a card that evolves from Helix Fossil and put it onto Helix Fossil (this counts as evolving Helix Fossil). Shuffle your deck afterward.",
        "type": "Poké-Body"
      }
    ],
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
      "small": "https://images.pokemontcg.io/dp5/91.png",
      "large": "https://images.pokemontcg.io/dp5/91_hires.png"
    }
  },
  {
    "id": "dp5-92",
    "name": "Call Energy",
    "number": "92",
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
      "Call Energy provides Colorless Energy. Once during your turn, if the Pokémon Call Energy is attached to is your Active Pokémon, you may search your deck for up to 2 Basic Pokémon and put them onto your Bench. If you do, shuffle your deck and your turn ends."
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
      "small": "https://images.pokemontcg.io/dp5/92.png",
      "large": "https://images.pokemontcg.io/dp5/92_hires.png"
    }
  },
  {
    "id": "dp5-93",
    "name": "Darkness Energy",
    "number": "93",
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
      "small": "https://images.pokemontcg.io/dp5/93.png",
      "large": "https://images.pokemontcg.io/dp5/93_hires.png"
    }
  },
  {
    "id": "dp5-94",
    "name": "Health Energy",
    "number": "94",
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
      "Health Energy provides Colorless Energy. When you attach this card from your hand to 1 of your Pokémon, remove 1 damage counter from that Pokémon."
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
      "small": "https://images.pokemontcg.io/dp5/94.png",
      "large": "https://images.pokemontcg.io/dp5/94_hires.png"
    }
  },
  {
    "id": "dp5-95",
    "name": "Metal Energy",
    "number": "95",
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
      "small": "https://images.pokemontcg.io/dp5/95.png",
      "large": "https://images.pokemontcg.io/dp5/95_hires.png"
    }
  },
  {
    "id": "dp5-96",
    "name": "Recover Energy",
    "number": "96",
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
      "Recover Energy provides Colorless Energy. When you attach this card from your hand to 1 of your Pokémon, remove all Special Conditions from that Pokémon."
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
      "small": "https://images.pokemontcg.io/dp5/96.png",
      "large": "https://images.pokemontcg.io/dp5/96_hires.png"
    }
  },
  {
    "id": "dp5-97",
    "name": "Garchomp LV.X",
    "number": "97",
    "artist": "Ryo Ueda",
    "rarity": "Rare Holo LV.X",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up"
    ],
    "hp": "140",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Garchomp",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Garchomp. Garchomp LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
    ],
    "abilities": [
      {
        "name": "Dragon Pulse",
        "text": "Once during your turn (before your attack), when you put Garchomp LV.X from your hand onto your Active Garchomp, you may flip 3 coins. For each heads, put 1 damage counter on each of your opponent's Benched Pokémon.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Restore",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your discard pile for a Pokémon (excluding Pokémon LV.X) and put it onto your Bench as a Basic Pokémon. Then, you may search your discard pile for up to 3 basic Energy cards and attach them to that Pokémon."
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
      "small": "https://images.pokemontcg.io/dp5/97.png",
      "large": "https://images.pokemontcg.io/dp5/97_hires.png"
    }
  },
  {
    "id": "dp5-98",
    "name": "Glaceon LV.X",
    "number": "98",
    "artist": "Ryo Ueda",
    "rarity": "Rare Holo LV.X",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Glaceon",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Glaceon. Glaceon LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
    ],
    "abilities": [
      {
        "name": "Chilly Breath",
        "text": "As long as Glaceon is your Active Pokémon, your opponent's Pokémon can't use any Poké-Powers.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Avalanche",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Flip a coin. If heads, this attack does 20 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      "small": "https://images.pokemontcg.io/dp5/98.png",
      "large": "https://images.pokemontcg.io/dp5/98_hires.png"
    }
  },
  {
    "id": "dp5-99",
    "name": "Leafeon LV.X",
    "number": "99",
    "artist": "Ryo Ueda",
    "rarity": "Rare Holo LV.X",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up"
    ],
    "hp": "110",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Leafeon",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Leafeon. Leafeon LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
    ],
    "abilities": [
      {
        "name": "Energy Forcing",
        "text": "Once during your turn (before your attack), you may attach an Energy card from your hand to 1 of your Pokémon. This power can't be used if Leafeon is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Verdant Dance",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "Does 30 damage plus 10 more damage for each Energy attached to all of your Pokémon."
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
      "small": "https://images.pokemontcg.io/dp5/99.png",
      "large": "https://images.pokemontcg.io/dp5/99_hires.png"
    }
  },
  {
    "id": "dp5-100",
    "name": "Porygon-Z LV.X",
    "number": "100",
    "artist": "Ryo Ueda",
    "rarity": "Rare Holo LV.X",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up"
    ],
    "hp": "130",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Porygon-Z",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Porygon-Z. Porygon-Z LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
    ],
    "abilities": [
      {
        "name": "Mode Crash",
        "text": "Once during your turn (before your attack), when you put Porygon-Z LV.X from your hand onto your Active Porygon-Z, you may discard all of your opponent's Special Energy cards in play.",
        "type": "Poké-Power"
      },
      {
        "name": "Decode",
        "text": "Once during your turn (before your attack), you may search your deck for up to any 2 cards and shuffle your deck afterward. Then, put those cards on top of your deck in any order. This power can't be used if Porygon-Z is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [],
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
      474
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp5/100.png",
      "large": "https://images.pokemontcg.io/dp5/100_hires.png"
    }
  }
]

export default cardDetails
