import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "dp3-1",
    "name": "Ampharos",
    "number": "1",
    "artist": "Kouki Saitou",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Flaaffy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Jamming",
        "text": "After your opponent plays a Supporter card from his or her hand, put 1 damage counter on each of your opponent's Pokémon. You can't use more than 1 Jamming Poké-Body each turn.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Cluster Bolt",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "You may discard all Lightning Energy attached to Ampharos. If you do, this attack does 20 damage to each of your opponent's Benched Pokémon that has any Energy cards attached to it. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "+30"
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      181
    ],
    "flavorText": "The tip of its tail shines brightly. In the olden days, people sent signals using the tail's light.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/1.png",
      "large": "https://images.pokemontcg.io/dp3/1_hires.png"
    }
  },
  {
    "id": "dp3-2",
    "name": "Blastoise",
    "number": "2",
    "artist": "Daisuke Ito",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wartortle",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Waterlog",
        "text": "Once during your turn (before your attack), you may attach as many basic Water Energy cards from your hand to any of your Pokémon in any way you like. If you do, your turn ends. This power can't be used if Blastoise is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Hydro Pump",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "Does 50 damage plus 20 more damage for each Water Energy attached to Blastoise but not used to pay for this attack's Energy cost. You can't add more than 40 damage in this way."
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
      9
    ],
    "flavorText": "The jets of water it spouts from the rocket cannons on its shell can punch through thick steel.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/2.png",
      "large": "https://images.pokemontcg.io/dp3/2_hires.png"
    }
  },
  {
    "id": "dp3-3",
    "name": "Charizard",
    "number": "3",
    "artist": "Daisuke Ito",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fury Blaze",
        "text": "If your opponent has 3 or less Prize cards left, each of Charizard's attacks does 50 more damage to the Active Pokémon (before applying Weakness and Resistance).",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Blast Burn",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120",
        "text": "Flip a coin. If heads, discard 2 Energy cards attached to Charizard. If tails, discard 4 Energy cards attached to Charizard. (If you can't, this attack does nothing.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "+40"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      6
    ],
    "flavorText": "It is said that CHARIZARD's fire burns hotter if it has experienced harsh battles.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/3.png",
      "large": "https://images.pokemontcg.io/dp3/3_hires.png"
    }
  },
  {
    "id": "dp3-4",
    "name": "Entei",
    "number": "4",
    "artist": "Ryo Ueda",
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
        "name": "Burning Coat",
        "text": "Whenever 1 of your opponent's Pokémon is Knocked Out by damage from Entei's attacks, discard the top 3 cards from your opponent's deck.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Blaze Roar",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) Flip a coin. If tails, discard 2 Fire Energy attached to Entei."
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
      244
    ],
    "flavorText": "It is said that when it roars, a volcano erupts somewhere around the globe.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/4.png",
      "large": "https://images.pokemontcg.io/dp3/4_hires.png"
    }
  },
  {
    "id": "dp3-5",
    "name": "Flygon",
    "number": "5",
    "artist": "Daisuke Ito",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Vibrava",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Irritating Buzz",
        "text": "As long as Flygon is your Active Pokémon, put 1 damage counter on each of your opponent's Active Pokémon between turns, excluding Fighting Pokémon.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Sand Sonic",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "If you attach a Fighting Energy card from your hand to Flygon during this turn, this attack does 60 damage plus 20 more damage."
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      330
    ],
    "flavorText": "It whips up sandstorms with powerful flaps of its wings. It is known as \"The Desert Spirit.\"",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/5.png",
      "large": "https://images.pokemontcg.io/dp3/5_hires.png"
    }
  },
  {
    "id": "dp3-6",
    "name": "Gallade",
    "number": "6",
    "artist": "Daisuke Ito",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Kirlia",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sonic Blade",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put damage counters on the Defending Pokémon until it is 50 HP away from being Knocked Out. If you do, your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon."
      },
      {
        "name": "Psychic Cut",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "You may choose as many of your face-down Prize cards as you like and put them face up. If you do, this attack does 60 damage plus 20 more damage for each Prize card you chose. (These cards remain face up for the rest of the game.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
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
      475
    ],
    "flavorText": "A master of courtesy and swordsmanship, it fights using extending swords on its elbows.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/6.png",
      "large": "https://images.pokemontcg.io/dp3/6_hires.png"
    }
  },
  {
    "id": "dp3-7",
    "name": "Gardevoir",
    "number": "7",
    "artist": "Atsuko Nishida",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "110",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Kirlia",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Telepass",
        "text": "Once during your turn (before your attack), you may search your opponent's discard pile for a Supporter card and use the effect of that card as the effect of this power. (The Supporter card remains in your opponent's discard pile.) You can't use more than 1 Telepass Poké-Power each turn. This power can't be used if Gardevoir is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Psychic Lock",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "During your opponent's next turn, your opponent can't use any Poké-Powers on his or her Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
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
      282
    ],
    "flavorText": "It will try to guard its trusted Trainer with its life. It has the ability to see the future.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/7.png",
      "large": "https://images.pokemontcg.io/dp3/7_hires.png"
    }
  },
  {
    "id": "dp3-8",
    "name": "Gastrodon East Sea",
    "number": "8",
    "artist": "Kazuyuki Kano",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Shellos East Sea",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Osmotic Pressure",
        "text": "Once during your turn (before your attack), if you have Gastrodon West Sea in play, you may move up to 3 damage counters from Gastrodon East Sea to 1 of your Gastrodon West Sea.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Dwindling Wave",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80-",
        "text": "Does 80 damage minus 10 damage for each damage counter on Gastrodon East Sea."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      423
    ],
    "flavorText": "It has a pliable body without any bones. If any part of its body is torn off, it grows right back.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/8.png",
      "large": "https://images.pokemontcg.io/dp3/8_hires.png"
    }
  },
  {
    "id": "dp3-9",
    "name": "Gastrodon West Sea",
    "number": "9",
    "artist": "Kazuyuki Kano",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Shellos West Sea",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Raging Flood",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Does 20 damage plus 10 more damage for each damage counter on Gastrodon West Sea. Then, remove 2 damage counters from Gastrodon West Sea."
      },
      {
        "name": "Wild Waves",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "Put 1 damage counter on each Benched Pokémon (both yours and your opponent's)."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      423
    ],
    "flavorText": "It has a pliable body without any bones. If any part of its body is torn off, it grows right back.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/9.png",
      "large": "https://images.pokemontcg.io/dp3/9_hires.png"
    }
  },
  {
    "id": "dp3-10",
    "name": "Ho-Oh",
    "number": "10",
    "artist": "Kazuyuki Kano",
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
    "abilities": [
      {
        "name": "Phoenix Turn",
        "text": "Once during your opponent's turn, if Ho-Oh would be Knocked Out by damage from an attack, you may flip a coin. If heads, Ho-Oh isn't discarded. Instead, remove all damage counters, Special Conditions, and other effects from Ho-Oh. Then, discard all cards attached to Ho-Oh (except for Energy cards). This counts as Ho-Oh being Knocked Out and your opponent takes a Prize card.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Rainbow Wing",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "20×",
        "text": "This attack does 20 damage times the number of different types of basic Energy cards attached to Ho-Oh."
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
      250
    ],
    "flavorText": "Its feathers are in seven colors. It is said that anyone seeing it is promised eternal happiness.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/10.png",
      "large": "https://images.pokemontcg.io/dp3/10_hires.png"
    }
  },
  {
    "id": "dp3-11",
    "name": "Jumpluff",
    "number": "11",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Skiploom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Cotton Spore",
        "text": "Whenever Jumpluff would be damaged by your opponent's attack, flip a coin. If heads, prevent all damage done to Jumpluff by that attack.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Cottonweed Punch",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip 2 coins. Choose 1 of your opponent's Pokémon. For each heads, this attack does 30 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
        "type": "Fighting",
        "value": "-20"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      189
    ],
    "flavorText": "Blown by seasonal winds, it circles the globe, scattering cotton spores as it goes.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/11.png",
      "large": "https://images.pokemontcg.io/dp3/11_hires.png"
    }
  },
  {
    "id": "dp3-12",
    "name": "Lickilicky",
    "number": "12",
    "artist": "Kazuyuki Kano",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Lickitung",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tongue Reel",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. If you choose a Benched Pokémon, switch the Defending Pokémon with that Pokémon. This attack does 20 damage to the Pokémon you chose. Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Boundless Power",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "During your next turn, Lickilicky can't attack."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
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
      463
    ],
    "flavorText": "It wraps things with its extensible tongue. Getting to close to it will leave you soaked with drool.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/12.png",
      "large": "https://images.pokemontcg.io/dp3/12_hires.png"
    }
  },
  {
    "id": "dp3-13",
    "name": "Ludicolo",
    "number": "13",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Lombre",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Rain Dish",
        "text": "At any time between turns, remove 1 damage counter from Ludicolo.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Nature Power",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "If you have a Stadium Card in play, this attack does 60 damage plus 20 more damage. If your opponent has a Stadium card in play, the Defending Pokémon is now Confused."
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
      272
    ],
    "flavorText": "If it hears festive music, all its muscles fill with energy. It can't help breaking out into a dance.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/13.png",
      "large": "https://images.pokemontcg.io/dp3/13_hires.png"
    }
  },
  {
    "id": "dp3-14",
    "name": "Lugia",
    "number": "14",
    "artist": "Kazuyuki Kano",
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
        "name": "Silver Wing",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If heads, choose an Energy card attached to the Defending Pokémon and return it to your opponent's hand."
      },
      {
        "name": "Psychic Destruction",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "If the Defending Pokémon has any Energy cards attached to it, this attack's base damage is 40 instead of 120."
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
    "flavorText": "It sleeps in a deep-sea trench. If it flaps its wings, it is said to cause a 40-day storm.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/14.png",
      "large": "https://images.pokemontcg.io/dp3/14_hires.png"
    }
  },
  {
    "id": "dp3-15",
    "name": "Mew",
    "number": "15",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psychic Balance",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "If you have less cards in your hand than your opponent, draw cards until you have the same number of cards as your opponent. (If you have more or the same number of cards in your hand as your opponent, this attack does nothing.)"
      },
      {
        "name": "Re-creation",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Choose an attack on 1 of your opponent's Pokémon in his or her discard pile. Re-creation copies that attack except for its Energy cost. (You must still do anything else required for that attack.) Mew performs that attack."
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
      151
    ],
    "flavorText": "Because it can use all kinds of moves, many scientists believe MEW to be the ancestor of Pokémon.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/15.png",
      "large": "https://images.pokemontcg.io/dp3/15_hires.png"
    }
  },
  {
    "id": "dp3-16",
    "name": "Raikou",
    "number": "16",
    "artist": "Ryo Ueda",
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
        "name": "Thunder Rumble",
        "text": "Once during your turn (before your attack), when you attach a Lightning Energy card from your hand to Raikou, you may put 1 damage counter on 1 of your opponent's Benched Pokémon.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Thunder Climb",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "Discard 3 cards from the top of your deck. This attack does 50 damage plus 10 more damage for each Lightning Energy card you discarded. Then, attach those Lightning Energy cards to 1 of your Pokémon."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      243
    ],
    "flavorText": "It is said to have fallen with lightning. It can fire thunderbolts from the rain clouds on its back.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/16.png",
      "large": "https://images.pokemontcg.io/dp3/16_hires.png"
    }
  },
  {
    "id": "dp3-17",
    "name": "Roserade",
    "number": "17",
    "artist": "Ken Sugimori",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Roselia",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sleep Poison",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "The Defending Pokémon is now Asleep and Poisoned."
      },
      {
        "name": "Magical Leaf",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "Flip a coin. If heads, this attack does 40 damage plus 30 more damage and remove 3 damage counters from Roserade."
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      407
    ],
    "flavorText": "It attracts prey with a sweet aroma, then downs it with thorny whips hidden in its arms.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/17.png",
      "large": "https://images.pokemontcg.io/dp3/17_hires.png"
    }
  },
  {
    "id": "dp3-18",
    "name": "Salamence",
    "number": "18",
    "artist": "Kazuyuki Kano",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Shelgon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Direct Hit",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "This attack's damage isn't affected by Weakness, Resistance, Poké-Powers, Poké-Bodies, or any other effects on the Defending Pokémon."
      },
      {
        "name": "Dragon Finish",
        "cost": [
          "Fire",
          "Fire",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 4,
        "damage": "",
        "text": "Discard 2 basic Fire Energy cards or 2 basic Water Energy cards attached to Salamence. If you discarded 2 basic Fire Energy cards, this attack does 100 damage to the Defending Pokémon. If you discarded 2 Basic Water Energy cards, this attack does 100 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) (If you can't discard cards, this attack does nothing.)"
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
        "type": "Fighting",
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
      373
    ],
    "flavorText": "As a result of its long-held dream of flying, its cellular structure changes, and wings grew out.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/18.png",
      "large": "https://images.pokemontcg.io/dp3/18_hires.png"
    }
  },
  {
    "id": "dp3-19",
    "name": "Suicune",
    "number": "19",
    "artist": "Ryo Ueda",
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
        "name": "Aqua Recover",
        "text": "Once during your turn, when you put Suicune from your hand onto your Bench, you may search your discard pile for up to 3 Water Pokémon, show them to your opponent, and put them into your hand.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Cure Stream",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "During your opponent's next turn, any damage done by attacks from the Defending Pokémon is reduced by 20 (before applying Weakness and Resistance)."
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
      245
    ],
    "flavorText": "It races around the world to purify fouled water. It dashes away with the north wind.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/19.png",
      "large": "https://images.pokemontcg.io/dp3/19_hires.png"
    }
  },
  {
    "id": "dp3-20",
    "name": "Venusaur",
    "number": "20",
    "artist": "Kazuyuki Kano",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Ivysaur",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Miracle Aroma",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, choose either Asleep, Burned, or Poisoned. The Defending Pokémon is now affected by that Special Condition. This power can't be used if Venusaur is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Giant Bloom",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Flip a coin. If heads, remove 4 damage counters from Venusaur."
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      3
    ],
    "flavorText": "After a rainy day, the flower on its back smells stronger. The scent attracts other Pokémon.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/20.png",
      "large": "https://images.pokemontcg.io/dp3/20_hires.png"
    }
  },
  {
    "id": "dp3-21",
    "name": "Absol",
    "number": "21",
    "artist": "Ken Sugimori",
    "rarity": "Rare",
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
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Baleful Wind",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose a card from your opponent's hand without looking and discard it. If you discarded a Trainer, Supporter, or Stadium card, choose 1 more card from your opponent's hand without looking and discard it."
      },
      {
        "name": "Raid",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "If you played Absol from your hand during this turn, this attack's base damage is 40 instead of 10."
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
      359
    ],
    "flavorText": "It senses disasters coming and appears before people only to warn them of impending danger.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/21.png",
      "large": "https://images.pokemontcg.io/dp3/21_hires.png"
    }
  },
  {
    "id": "dp3-22",
    "name": "Arcanine",
    "number": "22",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
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
        "name": "Flame Dash",
        "text": "Once during your turn, when you play Arcanine from your hand to evolve 1 of your Benched Pokémon, you may switch Arcanine with 1 of your Active Pokémon. If you do, you may move any number of Energy cards attached to that Pokémon to Arcanine.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Inferno Onrush",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "120",
        "text": "Arcanine does 40 damage to itself."
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
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
      59
    ],
    "flavorText": "Its proud and regal appearance has captured the hearts of people since long ago.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/22.png",
      "large": "https://images.pokemontcg.io/dp3/22_hires.png"
    }
  },
  {
    "id": "dp3-23",
    "name": "Banette",
    "number": "23",
    "artist": "Kouki Saitou",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Ghost Head",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Put as many damage counters as you like on Banette. (You can't put more than Banette's remaining HP.) Put that many damage counters on the Defending Pokémon."
      },
      {
        "name": "Spiteful Pain",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "40+",
        "text": "If Banette is in your discard pile, this attack does 40 damage plus 40 more damage, then search your discard pile for Banette, show it to your opponent, and shuffle it into your deck."
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
      354
    ],
    "flavorText": "A doll that became a Pokémon over its grudge from being junked. It seeks the child that disowned it.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/23.png",
      "large": "https://images.pokemontcg.io/dp3/23_hires.png"
    }
  },
  {
    "id": "dp3-24",
    "name": "Dugtrio",
    "number": "24",
    "artist": "Ken Sugimori",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Diglett",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dig Trap",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip a coin. If tails, this attack does nothing. If heads, prevent all effects of an attack, including damage, done to Dugtrio during your opponent's next turn. If Dugtrio is your Active Pokémon at the end of your opponent's next turn, put 6 damage counters on 1 of your opponent's Benched Pokémon."
      },
      {
        "name": "Pit Trap",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "Your opponent flips a coin. If tails, this attack does 50 damage plus 50 more damage."
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      51
    ],
    "flavorText": "Its three heads moves alternately, driving it through tough soil to depths of over 60 miles.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/24.png",
      "large": "https://images.pokemontcg.io/dp3/24_hires.png"
    }
  },
  {
    "id": "dp3-25",
    "name": "Electivire",
    "number": "25",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Electabuzz",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Motor Drive",
        "text": "Once during your turn (before your attack), you may search your discard pile for a Lightning Energy card and attach it to Electivire. This power can't be used if Electivire is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Discharge",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50×",
        "text": "Discard all Lightning Energy attached to Electivire. Flip a coin for each Lightning Energy you discarded. This attack does 50 damage times the number of heads."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "+30"
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      466
    ],
    "flavorText": "It pushes the tips of its two tails against the foe, then lets loose with over 20,000 volts of power.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/25.png",
      "large": "https://images.pokemontcg.io/dp3/25_hires.png"
    }
  },
  {
    "id": "dp3-26",
    "name": "Electrode",
    "number": "26",
    "artist": "Ken Sugimori",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Voltorb",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Energy Shift",
        "text": "Once during your turn, if Electrode would be Knocked Out by damage from an attack, you may use this power. Electrode isn't discarded. Instead, attach it as an Energy card to 1 of your Pokémon. While attached, this card is a Special Energy card and provides every type of Energy but provides only 1 Energy at a time. (Has no effect other than providing Energy.)",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Ion Blast",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40+",
        "text": "You may do 40 damage plus 60 more damage. If you do, Electrode does 100 damage to itself."
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
      101
    ],
    "flavorText": "It is known to drift on winds if it is bloated to bursting with stored electricity.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/26.png",
      "large": "https://images.pokemontcg.io/dp3/26_hires.png"
    }
  },
  {
    "id": "dp3-27",
    "name": "Furret",
    "number": "27",
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
    "evolvesFrom": "Sentret",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Keen Eye",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your deck for up to 2 cards and put them into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Baton Pass",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "You may switch Furret with 1 of your Benched Pokémon. If you do, move as many Energy cards attached to Furret as you like to the new Active Pokémon."
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
      162
    ],
    "flavorText": "The mother puts its offspring to sleep by curling up around them. It corners foes with speed.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/27.png",
      "large": "https://images.pokemontcg.io/dp3/27_hires.png"
    }
  },
  {
    "id": "dp3-28",
    "name": "Golduck",
    "number": "28",
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
    "evolvesFrom": "Psyduck",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Encore",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Choose 1 of the Defending Pokémon's attacks. That Pokémon can use only that attack during your opponent's next turn."
      },
      {
        "name": "Break Beam",
        "cost": [
          "Water",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "40+",
        "text": "You may do 40 damage plus 20 more damage. If you do, Golduck is now Confused."
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
      55
    ],
    "flavorText": "A Pokémon that lives in lakes. It swims faster than any human swimming champion.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/28.png",
      "large": "https://images.pokemontcg.io/dp3/28_hires.png"
    }
  },
  {
    "id": "dp3-29",
    "name": "Golem",
    "number": "29",
    "artist": "Naoyo Kimura",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Graveler",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Throw",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Choose 2 of your opponent's Pokémon. This attack does 30 damage to each of them. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Megaton Rock",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "You may do 40 damage instead of 80 to the Defending Pokémon. If you do, during your opponent's next turn, any damage done to Golem by attacks is reduced by 40 (after applying Weakness and Resistance)."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      76
    ],
    "flavorText": "It sheds its hide once a year. Its boulderlike body is so tough, even dynamite can't harm it.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/29.png",
      "large": "https://images.pokemontcg.io/dp3/29_hires.png"
    }
  },
  {
    "id": "dp3-30",
    "name": "Jynx",
    "number": "30",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
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
        "name": "Icy Kiss",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "If Jynx was damaged by an attack during your opponent's last turn, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Lovely Kiss",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Move 2 damage counters from Jynx to the Defending Pokémon. If Smoochum is anywhere under Jynx, move 4 damage counters instead."
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
      124
    ],
    "flavorText": "It cries sound like human speech. However, it is impossible to tell what it is trying to say.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/30.png",
      "large": "https://images.pokemontcg.io/dp3/30_hires.png"
    }
  },
  {
    "id": "dp3-31",
    "name": "Magmortar",
    "number": "31",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Magmar",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Flame Body",
        "text": "When you attach a Fire Energy card from your hand to Magmortar, remove 2 damage counters from Magmortar.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Flame Blast",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "Does 20 damage times the number of Fire Energy attached to Magmortar."
      },
      {
        "name": "Fireball Bazooka",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "Does 20 damage to 2 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Water",
        "value": "+30"
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
      467
    ],
    "flavorText": "It blasts fireballs of over 3,600 degrees F from the ends of its arms. It lives in volcanic craters.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/31.png",
      "large": "https://images.pokemontcg.io/dp3/31_hires.png"
    }
  },
  {
    "id": "dp3-32",
    "name": "Minun",
    "number": "32",
    "artist": "Masakazu Fukuda",
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
        "name": "Minus Charge",
        "text": "Once during your turn (before your attack), if any Pokémon were Knocked Out during your opponent's last turn, you may draw 2 cards. You can't use more than 1 Minus Charge Poké-Power each turn. This power can't be used if Minun is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Tag Play —",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "If you have Plusle on your Bench, you may move an Energy card attached to Minun to 1 of your Benched Pokémon."
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
      "small": "https://images.pokemontcg.io/dp3/32.png",
      "large": "https://images.pokemontcg.io/dp3/32_hires.png"
    }
  },
  {
    "id": "dp3-33",
    "name": "Mothim",
    "number": "33",
    "artist": "Kazuyuki Kano",
    "rarity": "Rare",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Silver Wind",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "During your next turn, if an attack does damage to the Defending Pokémon (after applying Weakness and Resistance), that attack does 40 more damage."
      },
      {
        "name": "Raging Scales",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If Mothim has any damage counters on it, this attack does 30 damage plus 40 more damage."
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
    "flavorText": "It loves the honey of flowers and steals honey collected by COMBEE.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/33.png",
      "large": "https://images.pokemontcg.io/dp3/33_hires.png"
    }
  },
  {
    "id": "dp3-34",
    "name": "Nidoking",
    "number": "34",
    "artist": "Kouki Saitou",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Nidorino",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Rub",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "The Defending Pokémon is now Poisoned. Before doing damage, you may switch 1 of the Defending Pokémon with 1 of your opponent's Benched Pokémon. The new Defending Pokémon is now Poisoned."
      },
      {
        "name": "Pride Attack",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "60+",
        "text": "Flip a coin for each Nidoqueen on your Bench. This attack does 60 damage plus 30 more damage for each heads."
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
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
      34
    ],
    "flavorText": "One swing of its mighty tail can snap a telephone pole as if it were a matchstick.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/34.png",
      "large": "https://images.pokemontcg.io/dp3/34_hires.png"
    }
  },
  {
    "id": "dp3-35",
    "name": "Pidgeot",
    "number": "35",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "120",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Pidgeotto",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mirror Move",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "If Pidgeot was damaged by an attack during your opponent's last turn, this attack does the same amount of damage done to Pidgeot to the Defending Pokémon."
      },
      {
        "name": "Whirlwind",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "+30"
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
      18
    ],
    "flavorText": "By flapping its wings with all its might, PIDGEOT can make a gust of wind capable of bending tall trees.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/35.png",
      "large": "https://images.pokemontcg.io/dp3/35_hires.png"
    }
  },
  {
    "id": "dp3-36",
    "name": "Plusle",
    "number": "36",
    "artist": "Masakazu Fukuda",
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
        "name": "Plus Charge",
        "text": "Once during your turn (before your attack), if any of your Pokémon were Knocked Out during your opponent's last turn, you may search your discard pile for up to 2 basic Energy cards, show them to your opponent, and put them into your hand. You can't use more than 1 Plus Charge Poké-Power each turn. This power can't be used if Plusle is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Tag Play +",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "If you have Minun on your Bench, you may do 20 damage to any 1 Benched Pokémon instead. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      "small": "https://images.pokemontcg.io/dp3/36.png",
      "large": "https://images.pokemontcg.io/dp3/36_hires.png"
    }
  },
  {
    "id": "dp3-37",
    "name": "Sharpedo",
    "number": "37",
    "artist": "Ken Sugimori",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Carvanha",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Rough Skin",
        "text": "If Sharpedo is your Active Pokémon and is damaged by an opponent's attack (even if Sharpedo is Knocked Out), put 2 damage counters on the Attacking Pokémon.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Strike Wound",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "If the Defending Pokémon has 2 or more damage counters on it, this attack does 60 damage plus 20 more damage. This attack damage isn't affected by Weakness, Resistance, Poké-Powers, Poké-Bodies, or any other effects on that Pokémon."
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
    "flavorText": "Its fangs rip through sheet iron. It swims at 75 mph and is known as \"The Bully of the Sea.\"",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/37.png",
      "large": "https://images.pokemontcg.io/dp3/37_hires.png"
    }
  },
  {
    "id": "dp3-38",
    "name": "Sunflora",
    "number": "38",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Sunkern",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Grass Whistle",
        "text": "Once during your turn (before your attack), you may remove 1 damage counter from each of your Grass Pokémon. You can't use more than 1 Grass Whistle Poké-Power each turn. This power can't be used if Sunflora is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Petal Dance",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "30×",
        "text": "Flip 3 coins. This attack does 30 damage times the number of heads. If you get 2 or more heads, Sunflora is now Confused."
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
      192
    ],
    "flavorText": "It gets energy from warm sunlight and is known for its habit of moving in pursuit of it.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/38.png",
      "large": "https://images.pokemontcg.io/dp3/38_hires.png"
    }
  },
  {
    "id": "dp3-39",
    "name": "Unown [S]",
    "number": "39",
    "artist": "Kazuyuki Kano",
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
        "name": "Set",
        "text": "Once during your turn (before your attack), if you have Unown S, Unown E, and Unown T on your Bench, you may flip a coin. If heads, search your discard pile for an Energy card, show it to your opponent, and put it on top of your deck.",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      201
    ],
    "flavorText": "Shaped like ancient writing, it is a huge mystery whether language or UNOWN came first.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/39.png",
      "large": "https://images.pokemontcg.io/dp3/39_hires.png"
    }
  },
  {
    "id": "dp3-40",
    "name": "Weavile",
    "number": "40",
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
    "evolvesFrom": "Sneasel",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Dark Engage",
        "text": "Once during your turn (before your attack), you may use this power. Each of your Active Pokémon's type is Darkness until the end of your turn. If that Pokémon is no longer your Active Pokémon, this effect ends.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Shadow Charge",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your deck for up to 2 Darkness Energy cards and attach them to any of your Pokémon in any way you like. Shuffle your deck afterward."
      },
      {
        "name": "Chip Off",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "If your opponent has 6 or more cards in his or her hand, discard a number of cards without looking until your opponent has 5 cards left in his or her hand."
      }
    ],
    "weaknesses": [
      {
        "type": "Metal",
        "value": "+20"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      461
    ],
    "flavorText": "They live in cold regions, forming groups of four or five that hunt prey with impressive coordination.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/40.png",
      "large": "https://images.pokemontcg.io/dp3/40_hires.png"
    }
  },
  {
    "id": "dp3-41",
    "name": "Wormadam Plant Cloak",
    "number": "41",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Burmy Plant Cloak",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Plant Cloak",
        "text": "If Wormadam Plant Cloak has 2 or more Grass Energy attached to it, Wormadam Plant Cloak gets +40 HP.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Leaf Hurricane",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "If the Defending Pokémon has fewer remaining HP than Wormadam Plant Cloak, the Defending Pokémon is now Confused."
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      413
    ],
    "flavorText": "When BURMY evolved, its cloak became a part of this Pokémon's body. The cloak is never shed.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/41.png",
      "large": "https://images.pokemontcg.io/dp3/41_hires.png"
    }
  },
  {
    "id": "dp3-42",
    "name": "Wormadam Sandy Cloak",
    "number": "42",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Burmy Sandy Cloak",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Sandy Cloak",
        "text": "Prevent all effects of attacks, excluding damage, done to Wormadam Sandy Cloak.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Push Over",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "Does 40 damage plus 10 damage for each Fighting Energy attached to Wormadam Sandy Cloak."
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
        "type": "Lightning",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      413
    ],
    "flavorText": "When BURMY evolved, its cloak became a part of this Pokémon's body. The cloak is never shed.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/42.png",
      "large": "https://images.pokemontcg.io/dp3/42_hires.png"
    }
  },
  {
    "id": "dp3-43",
    "name": "Wormadam Trash Cloak",
    "number": "43",
    "artist": "Kazuyuki Kano",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Burmy Trash Cloak",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Trash Cloak",
        "text": "If Wormadam Trash Cloak has a Pokémon Tool card attached to it, any damage done to Wormadam Trash Cloak by attacks is reduced by 20 (after applying Weakness and Resistance).",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Iron Tackle",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Wormadam Trash Cloak does 20 damage to itself."
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
      413
    ],
    "flavorText": "When BURMY evolved, its cloak became a part of this Pokémon's body. The cloak is never shed.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/43.png",
      "large": "https://images.pokemontcg.io/dp3/43_hires.png"
    }
  },
  {
    "id": "dp3-44",
    "name": "Xatu",
    "number": "44",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Natu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Psychic Shift",
        "text": "Once during your turn, if Xatu is on your Bench, you may choose 1 Special Condition from 1 of your Active Pokémon and remove that Special Condition. Then, 1 of the Defending Pokémon is now affected by that Special Condition that you chose.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Energy Singe",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 20 damage plus 10 more damage for each Energy attached to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
        "type": "Fighting",
        "value": "-20"
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/44.png",
      "large": "https://images.pokemontcg.io/dp3/44_hires.png"
    }
  },
  {
    "id": "dp3-45",
    "name": "Breloom",
    "number": "45",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Shroomish",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Drain Punch",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Remove from Breloom a number of damage counters equal to the amount of Energy attached to the Defending Pokémon."
      },
      {
        "name": "Homing Uppercut",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "If the Defending Pokémon's Retreat Cost is 0, this attack does 60 damage plus 60 more damage."
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      286
    ],
    "flavorText": "Its short arms stretch when it throws punches. Its technique is equal to that of pro boxers.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/45.png",
      "large": "https://images.pokemontcg.io/dp3/45_hires.png"
    }
  },
  {
    "id": "dp3-46",
    "name": "Charmeleon",
    "number": "46",
    "artist": "Atsuko Nishida",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charmander",
    "evolvesTo": [
      "Charizard"
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
        "damage": "20",
        "text": "The Defending Pokémon is now Burned."
      },
      {
        "name": "Flare Tail",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "Flip a coin. If heads, discard a Fire Energy attached to Charmeleon and this attack does 50 damage plus 20 more damage."
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
      5
    ],
    "flavorText": "In the rocky mountains where CHARMELEON live, their fiery tails shine at night like stars.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/46.png",
      "large": "https://images.pokemontcg.io/dp3/46_hires.png"
    }
  },
  {
    "id": "dp3-47",
    "name": "Cloyster",
    "number": "47",
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
    "evolvesFrom": "Shellder",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Withdraw",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Flip a coin. If heads, prevent all damage done to Cloyster by attacks during your opponent's next turn."
      },
      {
        "name": "Spine Missile",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip 4 coins. For each heads, choose an opponent's Pokémon in play and this attack does 20 damage to those Pokémon. (You may choose the same Pokémon more than once.) (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      91
    ],
    "flavorText": "It fights by keeping its shell tightly shut for protection and by shooting spikes to repel foes.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/47.png",
      "large": "https://images.pokemontcg.io/dp3/47_hires.png"
    }
  },
  {
    "id": "dp3-48",
    "name": "Donphan",
    "number": "48",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Phanpy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rapid Spin",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon, if any. You switch Donphan with 1 of your Benched Pokémon, if any."
      },
      {
        "name": "Bash In",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "70+",
        "text": "If the Defending Pokémon has a Pokémon Tool card attached to it, this attack does 70 damage plus 60 more damage."
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      232
    ],
    "flavorText": "It attacks by curling up, then rolling into its foe. It can blow apart a house in one hit.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/48.png",
      "large": "https://images.pokemontcg.io/dp3/48_hires.png"
    }
  },
  {
    "id": "dp3-49",
    "name": "Farfetch'd",
    "number": "49",
    "artist": "Ken Sugimori",
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
    "evolvesTo": [
      "Sirfetch'd"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Swords Dance",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your next turn, Farfetch'd's Leek Slap attack's base damage is 60."
      },
      {
        "name": "Leek Slap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "During your next turn, Farfetch'd can't use Leek Slap."
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
      83
    ],
    "flavorText": "It can't live without the stalk it holds. That's why it defends the stalk from attackers with its life.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/49.png",
      "large": "https://images.pokemontcg.io/dp3/49_hires.png"
    }
  },
  {
    "id": "dp3-50",
    "name": "Flaaffy",
    "number": "50",
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
    "evolvesFrom": "Mareep",
    "evolvesTo": [
      "Ampharos"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Attract Current",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Search your deck for a Lightning Energy card and attach it to 1 of your Pokémon. Shuffle your deck afterward."
      },
      {
        "name": "Electromagnetic Kick",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Flip a coin. If tails, Flaaffy does 10 damage to itself."
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
      180
    ],
    "flavorText": "If its coat becomes fully charged with electricity, its tail lights up. It fires hair that zaps on impact.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/50.png",
      "large": "https://images.pokemontcg.io/dp3/50_hires.png"
    }
  },
  {
    "id": "dp3-51",
    "name": "Ivysaur",
    "number": "51",
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
    "evolvesFrom": "Bulbasaur",
    "evolvesTo": [
      "Venusaur"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Leech Seed",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Remove 1 damage counter from Ivysaur."
      },
      {
        "name": "Razor Leaf",
        "cost": [
          "Grass",
          "Grass",
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
      2
    ],
    "flavorText": "When the bud on its back starts swelling, a sweet aroma wafts to indicate the flower's coming bloom.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/51.png",
      "large": "https://images.pokemontcg.io/dp3/51_hires.png"
    }
  },
  {
    "id": "dp3-52",
    "name": "Kecleon",
    "number": "52",
    "artist": "Mitsuhiro Arita",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Camouflage",
        "text": "If any basic Energy card attached to Kecleon is the same as the Attacking Pokémon's type, any damage done by attacks from the Pokémon to Kecleon is reduced by 40 (after applying Weakness and Resistance).",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Blind Scratch",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Flip a coin. If tails, this attack does no damage to the Defending Pokémon. Instead, this attack does 20 damage to 1 of your Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      352
    ],
    "flavorText": "It can freely change its body's color. The zigzag pattern on its belly doesn't change, however.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/52.png",
      "large": "https://images.pokemontcg.io/dp3/52_hires.png"
    }
  },
  {
    "id": "dp3-53",
    "name": "Kirlia",
    "number": "53",
    "artist": "Masakazu Fukuda",
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
        "name": "Psychic Research",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your discard pile for a Supporter card and use the effect of that card as the effect of this attack. (The Supporter card remains in your discard pile.)"
      },
      {
        "name": "Telekinesis",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 40 damage to that Pokémon. This attack's damage isn't affected by Weakness or Resistance."
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
      281
    ],
    "flavorText": "It is highly perceptive of its Trainer's feelings. It dances when it is feeling happy.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/53.png",
      "large": "https://images.pokemontcg.io/dp3/53_hires.png"
    }
  },
  {
    "id": "dp3-54",
    "name": "Lombre",
    "number": "54",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
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
        "name": "Torment",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, your opponent can't play any Supporter cards from his or her hand during his or her next turn."
      },
      {
        "name": "Absorb",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Remove 2 damage counters from Lombre."
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
      271
    ],
    "flavorText": "It has a mischievous spirit. If it spots an angler, it will tug on the fishing line to interfere.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/54.png",
      "large": "https://images.pokemontcg.io/dp3/54_hires.png"
    }
  },
  {
    "id": "dp3-55",
    "name": "Miltank",
    "number": "55",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Healing Milk",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Flip 2 coins. For each heads, remove 3 damage counters from 1 of your Pokémon."
      },
      {
        "name": "Continuous Tumble",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Flip a coin until you get tails. This attack does 20 damage times the number of heads."
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
      241
    ],
    "flavorText": "It is said that kids who drink MILTANK's milk grow up to become hearty, healthy adults.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/55.png",
      "large": "https://images.pokemontcg.io/dp3/55_hires.png"
    }
  },
  {
    "id": "dp3-56",
    "name": "Muk",
    "number": "56",
    "artist": "Daisuke Ito",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Grimer",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Toxic Sludge",
        "text": "At the end of each player's turn, each of your opponent's Active Pokémon that has any Grass Energy attached to it is now Poisoned. If that Pokémon is already Poisoned, Toxic Sludge Poké-Body does nothing to that Pokémon.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Panic Liquid",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "The Defending Pokémon is now Confused and can't retreat during your opponent's next turn."
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
      89
    ],
    "flavorText": "A toxic fluids seeps from its body. The fluid instantly kills plants and trees on contact.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/56.png",
      "large": "https://images.pokemontcg.io/dp3/56_hires.png"
    }
  },
  {
    "id": "dp3-57",
    "name": "Nidorino",
    "number": "57",
    "artist": "Naoyo Kimura",
    "rarity": "Uncommon",
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
        "name": "Spirited Drill",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "During your next turn, each of Nidorino's attacks does 20 more damage to the Defending Pokémon (before applying Weakness and Resistance)."
      },
      {
        "name": "Poison Horn",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
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
      "small": "https://images.pokemontcg.io/dp3/57.png",
      "large": "https://images.pokemontcg.io/dp3/57_hires.png"
    }
  },
  {
    "id": "dp3-58",
    "name": "Pidgeotto",
    "number": "58",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Pidgey",
    "evolvesTo": [
      "Pidgeot"
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
        "damage": "20",
        "text": ""
      },
      {
        "name": "Quick Attack",
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
      17
    ],
    "flavorText": "It flies over its wide territory in search of prey, downing it with its highly developed claws.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/58.png",
      "large": "https://images.pokemontcg.io/dp3/58_hires.png"
    }
  },
  {
    "id": "dp3-59",
    "name": "Pinsir",
    "number": "59",
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
        "name": "Grip and Squeeze",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      },
      {
        "name": "Power Guillotine",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "Flip 2 coins. If either of them is tails, this attack's base damage is 10 instead of 100."
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      127
    ],
    "flavorText": "It grips prey with its pincers until the prey is torn in half. What it can't tear, it tosses far.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/59.png",
      "large": "https://images.pokemontcg.io/dp3/59_hires.png"
    }
  },
  {
    "id": "dp3-60",
    "name": "Quagsire",
    "number": "60",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wooper",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Aqua Healing",
        "text": "Once during your turn (before your attack), if Quagsire is your Active Pokémon and the Defending Pokémon has any Water Energy attached to it, you may remove 3 damage counters from Quagsire.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Muddy Water",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      195
    ],
    "flavorText": "It has a sluggish nature. It lies at the river's bottom, waiting for prey to stray into its mouth.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/60.png",
      "large": "https://images.pokemontcg.io/dp3/60_hires.png"
    }
  },
  {
    "id": "dp3-61",
    "name": "Raticate",
    "number": "61",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Rattata",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gnaw Off",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 60 more damage."
      },
      {
        "name": "Sneaky Attack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "If Raticate has any Darkness Energy attached to it, this attack does 20 damage plus 20 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "+20"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      20
    ],
    "flavorText": "It whittles its constantly growing fangs by gnawing on hard things. It can chew apart cinder walls.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/61.png",
      "large": "https://images.pokemontcg.io/dp3/61_hires.png"
    }
  },
  {
    "id": "dp3-62",
    "name": "Roselia",
    "number": "62",
    "artist": "Kouki Saitou",
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
      "Roserade"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sleep Powder",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Razor Leaf",
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
        "value": "+10"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      315
    ],
    "flavorText": "ROSELIA raised on clean drinking water are known to grow vividly colored flowers.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/62.png",
      "large": "https://images.pokemontcg.io/dp3/62_hires.png"
    }
  },
  {
    "id": "dp3-63",
    "name": "Sableye",
    "number": "63",
    "artist": "Sumiyoshi Kizuki",
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
        "name": "Rummage",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 5 cards of your deck. Choose as many Trainer cards as you like, show them to your opponent, and put them into your hand. Put the other cards back on top of your deck. Shuffle your deck afterward."
      },
      {
        "name": "Shadow Sneak",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "If you and your opponent have a different number of Prize cards left, this attack does 20 damage plus 20 more damage."
      }
    ],
    "weaknesses": [],
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
      302
    ],
    "flavorText": "It hides in the darkness of caves. Its diet of gems has transformed its eyes into gemstones.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/63.png",
      "large": "https://images.pokemontcg.io/dp3/63_hires.png"
    }
  },
  {
    "id": "dp3-64",
    "name": "Shelgon",
    "number": "64",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Bagon",
    "evolvesTo": [
      "Salamence"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Focus Energy",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your next turn, Shelgon's Protect Charge attack's base damage is 80."
      },
      {
        "name": "Protect Charge",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "During your opponent's next turn, any damage done to Shelgon by attacks is reduced by 30 (after applying Weakness and Resistance)."
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
      372
    ],
    "flavorText": "Within its rugged shell, its cells have begun changing. The shell peels off the instant it evolves.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/64.png",
      "large": "https://images.pokemontcg.io/dp3/64_hires.png"
    }
  },
  {
    "id": "dp3-65",
    "name": "Skiploom",
    "number": "65",
    "artist": "Masakazu Fukuda",
    "rarity": "Uncommon",
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
    "abilities": [
      {
        "name": "Cotton Balloon",
        "text": "If Skiploom has any Grass Energy attached to it, any damage done to Skiploom by attacks from your opponent's Evolved Pokémon is reduced by 20 (after applying Weakness and Resistance).",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "U-turn",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Switch Skiploom with 1 of your Benched Pokémon."
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
      188
    ],
    "flavorText": "It blooms when the weather warms. It floats in the sky to soak up as much sunlight as possible.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/65.png",
      "large": "https://images.pokemontcg.io/dp3/65_hires.png"
    }
  },
  {
    "id": "dp3-66",
    "name": "Smeargle",
    "number": "66",
    "artist": "Masakazu Fukuda",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Color Pick",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your deck for up to 3 basic Energy cards, show them to your opponent, and put them into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Trace",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, choose an attack on 1 of your opponent's Benched Pokémon. Trace copies that attack except for its Energy cost. (You must still do anything else required for that attack.) Smeargle performs that attack."
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
      235
    ],
    "flavorText": "It marks its territory by using its tail like a paintbrush. There are more than 5,000 different marks.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/66.png",
      "large": "https://images.pokemontcg.io/dp3/66_hires.png"
    }
  },
  {
    "id": "dp3-67",
    "name": "Smoochum",
    "number": "67",
    "artist": "Atsuko Nishida",
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
    "evolvesTo": [
      "Jynx"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Baby Evolution",
        "text": "Once during your turn (before your attack), you may put Jynx from your hand onto Smoochum (this counts as evolving Smoochum) and remove all damage counters from Smoochum.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Psykiss",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Flip a coin. If heads, choose a Special Energy card attached to 1 of your opponent's Pokémon and have your opponent shuffle that card into his or her deck."
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
      238
    ],
    "flavorText": "It tests everything by touching with its lips, which remember what it likes and dislikes.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/67.png",
      "large": "https://images.pokemontcg.io/dp3/67_hires.png"
    }
  },
  {
    "id": "dp3-68",
    "name": "Unown [K]",
    "number": "68",
    "artist": "Daisuke Ito",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Kind",
        "text": "Once during your turn (before your attack), you may remove 2 damage counters from 1 of the Defending Pokémon.",
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
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      201
    ],
    "flavorText": "Shaped like ancient writing, it is a huge mystery whether language or UNOWN came first.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/68.png",
      "large": "https://images.pokemontcg.io/dp3/68_hires.png"
    }
  },
  {
    "id": "dp3-69",
    "name": "Unown [N]",
    "number": "69",
    "artist": "Daisuke Ito",
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
    "rules": [],
    "abilities": [
      {
        "name": "Nod",
        "text": "Once during your turn (before your attack), if you have Unown N, Unown O, and Unown D on your Bench, you may ask your opponent to take a Prize card. If he or she does, you take a Prize card. If he or she doesn't, draw a card.",
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
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Burned."
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
    "flavorText": "Shaped like ancient writing, it is a huge mystery whether language or UNOWN came first.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/69.png",
      "large": "https://images.pokemontcg.io/dp3/69_hires.png"
    }
  },
  {
    "id": "dp3-70",
    "name": "Unown [O]",
    "number": "70",
    "artist": "Daisuke Ito",
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
    "rules": [],
    "abilities": [
      {
        "name": "ONE",
        "text": "Once during your turn (before your attack), if you have Unown O, Unown N, and Unown E on your Bench and you have 1 card left in your hand, you may draw cards until you have 7 cards in your hand.",
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
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Asleep."
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
    "flavorText": "Shaped like ancient writing, it is a huge mystery whether language or UNOWN came first.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/70.png",
      "large": "https://images.pokemontcg.io/dp3/70_hires.png"
    }
  },
  {
    "id": "dp3-71",
    "name": "Unown [X]",
    "number": "71",
    "artist": "Kazuyuki Kano",
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
    "rules": [],
    "abilities": [
      {
        "name": "X-RAY",
        "text": "Once during your turn (before your attack), if you have Unown X on your Bench, you may look at the top card of your opponent's deck and put it back on top of his or her deck.",
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
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
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
    "flavorText": "Shaped like ancient writing, it is a huge mystery whether language or UNOWN came first.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/71.png",
      "large": "https://images.pokemontcg.io/dp3/71_hires.png"
    }
  },
  {
    "id": "dp3-72",
    "name": "Unown [Z]",
    "number": "72",
    "artist": "Kazuyuki Kano",
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
    "rules": [],
    "abilities": [
      {
        "name": "ZERO",
        "text": "Once during your turn (before your attack), if Unown Z is on your Bench and you have no cards in your deck, you may discard all cards attached to Unown Z and put Unown Z on top of your deck.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Hidden Power",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Remove as many damage counters as you like from each Unown you have in play. Put that many damage counters on the Defending Pokémon."
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
    "flavorText": "Shaped like ancient writing, it is a huge mystery whether language or UNOWN came first.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/72.png",
      "large": "https://images.pokemontcg.io/dp3/72_hires.png"
    }
  },
  {
    "id": "dp3-73",
    "name": "Venomoth",
    "number": "73",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Venonat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Dangerous Scales",
        "text": "If Venomoth is your Active Pokémon and is damaged by an opponent's attack (even if Venomoth is Knocked Out), the Attacking Pokémon is now Asleep and Poisoned.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Disturbance Dive",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Prevent all effects of an attack, excluding damage, done to Venomoth during your opponent's next turn."
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
      49
    ],
    "flavorText": "It flutters its wings to scatter dustlike scales. The scales leach toxins if they contact skin.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/73.png",
      "large": "https://images.pokemontcg.io/dp3/73_hires.png"
    }
  },
  {
    "id": "dp3-74",
    "name": "Vibrava",
    "number": "74",
    "artist": "Kouki Saitou",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Trapinch",
    "evolvesTo": [
      "Flygon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sand Wind",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Does 10 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Hyper Beam",
        "cost": [
          "Fighting",
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
      "small": "https://images.pokemontcg.io/dp3/74.png",
      "large": "https://images.pokemontcg.io/dp3/74_hires.png"
    }
  },
  {
    "id": "dp3-75",
    "name": "Wartortle",
    "number": "75",
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
    "evolvesFrom": "Squirtle",
    "evolvesTo": [
      "Blastoise"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Giant Wave",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Wartortle can't use Giant Wave during your next turn."
      },
      {
        "name": "Shell Attack",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      8
    ],
    "flavorText": "It is said to live 10,000 years. Its furry tail is popular as a symbol of longevity.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/75.png",
      "large": "https://images.pokemontcg.io/dp3/75_hires.png"
    }
  },
  {
    "id": "dp3-76",
    "name": "Bagon",
    "number": "76",
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
      "Shelgon"
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
        "name": "Rage",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each damage counter on Bagon."
      }
    ],
    "weaknesses": [
      {
        "type": "Colorless",
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
      371
    ],
    "flavorText": "Dreaming of one day flying, it practices by leaping off cliffs every day.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/76.png",
      "large": "https://images.pokemontcg.io/dp3/76_hires.png"
    }
  },
  {
    "id": "dp3-77",
    "name": "Bulbasaur",
    "number": "77",
    "artist": "Kouki Saitou",
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
      "Ivysaur"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shake Vine",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Bullet Seed",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10×",
        "text": "Flip 4 coins. This attack does 10 damage times the number of heads."
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
      1
    ],
    "flavorText": "For some time after its birth, it grows by gaining nourishment from the seed on its back.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/77.png",
      "large": "https://images.pokemontcg.io/dp3/77_hires.png"
    }
  },
  {
    "id": "dp3-78",
    "name": "Burmy Plant Cloak",
    "number": "78",
    "artist": "Kouki Saitou",
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
      "Wormadam"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Wear Cloak",
        "text": "Once during your turn (before your attack), if Burmy Plant Cloak is your Active Pokémon, you may search your discard pile for a basic Grass Energy card and attach it to Burmy Plant Cloak.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Plant Cloak Tackle",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If Burmy Plant Cloak has any Grass Energy attached to it, this attack does 10 damage plus 10 more damage."
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
    "flavorText": "To shelter itself from cold, wintry winds, it covers itself with a cloak made of twigs and leaves.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/78.png",
      "large": "https://images.pokemontcg.io/dp3/78_hires.png"
    }
  },
  {
    "id": "dp3-79",
    "name": "Burmy Sandy Cloak",
    "number": "79",
    "artist": "Midori Harada",
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
      "Wormadam"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Wear Cloak",
        "text": "Once during your turn (before your attack), if Burmy Sandy Cloak is your Active Pokémon, you may search your discard for a basic Fighting Energy card and attach it to Burmy Sandy Cloak.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Sandy Cloak Tackle",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If Burmy Sandy Cloak has any Fighting Energy attached to it, this attack does 10 damage plus 10 more damage."
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
    "flavorText": "To shelter itself from cold, wintry winds, it covers itself with a cloak made of twigs and leaves.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/79.png",
      "large": "https://images.pokemontcg.io/dp3/79_hires.png"
    }
  },
  {
    "id": "dp3-80",
    "name": "Burmy Trash Cloak",
    "number": "80",
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
      "Wormadam"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Wear Cloak",
        "text": "Once during your turn (before your attack), if Burmy Trash Cloak is your Active Pokémon, you may search your discard for a basic Metal Energy card and attach it to Burmy Trash Cloak.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Trash Cloak Tackle",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If Burmy Trash Cloak has any Metal Energy attached to it, this attack does 10 damage plus 10 more damage."
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
    "flavorText": "To shelter itself from cold, wintry winds, it covers itself with a cloak made of twigs and leaves.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/80.png",
      "large": "https://images.pokemontcg.io/dp3/80_hires.png"
    }
  },
  {
    "id": "dp3-81",
    "name": "Carvanha",
    "number": "81",
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
      "Sharpedo"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Slash",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Bite Away",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, choose a card from your opponent's hand without looking and discard it."
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
    "flavorText": "They can swarm any foe that invades their territory. Their sharp fangs can tear out boat hulls.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/81.png",
      "large": "https://images.pokemontcg.io/dp3/81_hires.png"
    }
  },
  {
    "id": "dp3-82",
    "name": "Charmander",
    "number": "82",
    "artist": "Masakazu Fukuda",
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
      "Charmeleon"
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
        "name": "Lava Burn",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Does 10 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      4
    ],
    "flavorText": "The fire on the tip of its tail is a measure of its life. If healthy, its tail burns intensely.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/82.png",
      "large": "https://images.pokemontcg.io/dp3/82_hires.png"
    }
  },
  {
    "id": "dp3-83",
    "name": "Clefairy",
    "number": "83",
    "artist": "Lee HyunJung",
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
    "rules": [
      "Moon Stone: Clefairy can evolve during the turn you play it."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Slap",
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
      35
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/83.png",
      "large": "https://images.pokemontcg.io/dp3/83_hires.png"
    }
  },
  {
    "id": "dp3-84",
    "name": "Corsola",
    "number": "84",
    "artist": "Midori Harada",
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
      "Cursola"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rally",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 3 different types of Basic Pokémon and put them onto your Bench. Shuffle your deck afterward."
      },
      {
        "name": "Hook",
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
      222
    ],
    "flavorText": "Many live in the clean seas of the south. They apparently can't live in polluted waters.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/84.png",
      "large": "https://images.pokemontcg.io/dp3/84_hires.png"
    }
  },
  {
    "id": "dp3-85",
    "name": "Diglett",
    "number": "85",
    "artist": "Takao Unno",
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
      "Dugtrio"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Down Draw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card from the bottom of your deck."
      },
      {
        "name": "Mud Spatter",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
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
      50
    ],
    "flavorText": "A Pokémon that lives underground. Because of its dark habitat, it is repelled by bright sunlight.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/85.png",
      "large": "https://images.pokemontcg.io/dp3/85_hires.png"
    }
  },
  {
    "id": "dp3-86",
    "name": "Duskull",
    "number": "86",
    "artist": "Hiroki Fuchino",
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
      "Dusclops"
    ],
    "rules": [
      "Reaper Cloth: Duskull can evolve during the turn you play it."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Astonish",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, choose 1 card from your opponent's hand without looking. Look at that card you chose, then have your opponent shuffle that card into his or her deck."
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
      355
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/86.png",
      "large": "https://images.pokemontcg.io/dp3/86_hires.png"
    }
  },
  {
    "id": "dp3-87",
    "name": "Electabuzz",
    "number": "87",
    "artist": "Masakazu Fukuda",
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
      "Electivire"
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
        "name": "Thunder",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "Flip a coin. If tails, Electabuzz does 30 damage to itself."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      125
    ],
    "flavorText": "Half of all blackouts occur when this Pokémon appears at power plants and eats electricity.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/87.png",
      "large": "https://images.pokemontcg.io/dp3/87_hires.png"
    }
  },
  {
    "id": "dp3-88",
    "name": "Grimer",
    "number": "88",
    "artist": "Ken Sugimori",
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
      "Muk"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mud Bomb",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Gunky",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If the Defending Pokémon tries to attack during your opponent's next turn, your opponent flips a coin. If tails, that attack does nothing."
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
      88
    ],
    "flavorText": "It was born when sludge in a dirty stream was exposed to the moon's X-rays. It appears among filth.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/88.png",
      "large": "https://images.pokemontcg.io/dp3/88_hires.png"
    }
  },
  {
    "id": "dp3-89",
    "name": "Growlithe",
    "number": "89",
    "artist": "Kagemaru Himeno",
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
        "name": "Roar",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent switches the Defending Pokémon with 1 of his or her Benched Pokémon."
      },
      {
        "name": "Dig Claws",
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
      "small": "https://images.pokemontcg.io/dp3/89.png",
      "large": "https://images.pokemontcg.io/dp3/89_hires.png"
    }
  },
  {
    "id": "dp3-90",
    "name": "Hoppip",
    "number": "90",
    "artist": "Motofumi Fujiwara",
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
      "Skiploom"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Cottonweed",
        "text": "If Hoppip has any Grass Energy attached to it, the Retreat Cost for Hoppip is 0.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Hover Heal",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Remove all Special Conditions from Hoppip."
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
      187
    ],
    "flavorText": "It drifts on winds. It is said that when HOPPIP gather in fields and mountains, spring is on the way.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/90.png",
      "large": "https://images.pokemontcg.io/dp3/90_hires.png"
    }
  },
  {
    "id": "dp3-91",
    "name": "Lickitung",
    "number": "91",
    "artist": "Ken Sugimori",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
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
        "name": "Lick",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Stomp",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 30 more damage."
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
      108
    ],
    "flavorText": "Instead of hands, it uses its tongue, which is twice its height. Its sticky saliva grips anything.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/91.png",
      "large": "https://images.pokemontcg.io/dp3/91_hires.png"
    }
  },
  {
    "id": "dp3-92",
    "name": "Lotad",
    "number": "92",
    "artist": "Saya Tsuruta",
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
      "Lombre"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Water Sport",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If Lotad has less Energy attached to it than the Defending Pokémon, this attack does 10 damage plus 20 more damage."
      },
      {
        "name": "Ram",
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
        "value": "+10"
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
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/92.png",
      "large": "https://images.pokemontcg.io/dp3/92_hires.png"
    }
  },
  {
    "id": "dp3-93",
    "name": "Magmar",
    "number": "93",
    "artist": "Ken Sugimori",
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
      "Magmortar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fire Punch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Smog",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "The Defending Pokémon is now Poisoned."
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
      126
    ],
    "flavorText": "Born in the spout of a volcano, its body is covered by flames that shimmer like the sun.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/93.png",
      "large": "https://images.pokemontcg.io/dp3/93_hires.png"
    }
  },
  {
    "id": "dp3-94",
    "name": "Mareep",
    "number": "94",
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
      "Flaaffy"
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
        "name": "Static Shock",
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
      179
    ],
    "flavorText": "Its fluffy coat swells to double when static electricity builds up. Touching it can be shocking.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/94.png",
      "large": "https://images.pokemontcg.io/dp3/94_hires.png"
    }
  },
  {
    "id": "dp3-95",
    "name": "Murkrow",
    "number": "95",
    "artist": "Yusuke Ohmura",
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
      "Honchkrow"
    ],
    "rules": [
      "Dusk Stone: Murkrow can evolve during the turn you play it."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Feint Attack",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 20 damage to that Pokémon. This attack's damage isn't affected by Weakness, Resistance, Poké-Powers, Poké-Bodies, or any other effects on that Pokémon."
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
      198
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/95.png",
      "large": "https://images.pokemontcg.io/dp3/95_hires.png"
    }
  },
  {
    "id": "dp3-96",
    "name": "Natu",
    "number": "96",
    "artist": "Midori Harada",
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
        "name": "Bothering Wave",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If tails, this attack does nothing. If heads, discard an Energy card attached to the Defending Pokémon."
      },
      {
        "name": "Future Sight",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 5 cards of either player's deck and put them back on top of that player's deck in any order."
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
        "type": "Fighting",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      177
    ],
    "flavorText": "It picks food from cactus plants, deftly avoiding buds and spines. It seems to skip about to move.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/96.png",
      "large": "https://images.pokemontcg.io/dp3/96_hires.png"
    }
  },
  {
    "id": "dp3-97",
    "name": "Nidoran ♂",
    "number": "97",
    "artist": "Mitsuhiro Arita",
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
      "Nidorino"
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
        "name": "Poison Skin",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip 2 coins. If either of them is heads, the Defending Pokémon is now Poisoned."
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
      "small": "https://images.pokemontcg.io/dp3/97.png",
      "large": "https://images.pokemontcg.io/dp3/97_hires.png"
    }
  },
  {
    "id": "dp3-98",
    "name": "Phanpy",
    "number": "98",
    "artist": "Kouki Saitou",
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
      "Donphan"
    ],
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
        "text": "Does 10 damage times the number of damage counters on Phanpy."
      },
      {
        "name": "Take Down",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Phanpy does 10 damage to itself."
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
      231
    ],
    "flavorText": "It is strong despite its compact size. It can easily pick up and carry an adult human on its back.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/98.png",
      "large": "https://images.pokemontcg.io/dp3/98_hires.png"
    }
  },
  {
    "id": "dp3-99",
    "name": "Pidgey",
    "number": "99",
    "artist": "Hironobu Yoshida",
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
      "Pidgeotto"
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
        "text": "During your opponent's next turn, any damage done by attacks from the Defending Pokémon is reduced by 20 (before applying Weakness and Resistance)."
      },
      {
        "name": "Peck",
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
      16
    ],
    "flavorText": "It is docile and prefers to avoid conflict. If disturbed, however, it can ferociously strike back.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/99.png",
      "large": "https://images.pokemontcg.io/dp3/99_hires.png"
    }
  },
  {
    "id": "dp3-100",
    "name": "Psyduck",
    "number": "100",
    "artist": "Kagemaru Himeno",
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
      "Golduck"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Delusion",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If Psyduck is Confused, draw 2 cards."
      },
      {
        "name": "Migraine",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused. If tails, Psyduck is now Confused."
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
      54
    ],
    "flavorText": "If its usual headache worsens, its starts exhibiting odd powers. It can't remember doing so, however.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/100.png",
      "large": "https://images.pokemontcg.io/dp3/100_hires.png"
    }
  },
  {
    "id": "dp3-101",
    "name": "Qwilfish",
    "number": "101",
    "artist": "Kenkichi Toyama",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Balloon Sting",
        "text": "Once during your opponent's turn, if Qwilfish is your Active Pokémon and is damage by an attack (even if Qwilfish is Knocked Out), you may flip a coin. If heads, the Attacking Pokémon is now Poisoned. Put 2 damage counters instead of 1 on that Pokémon between turns.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Nerve Shot",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
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
      211
    ],
    "flavorText": "It shoots the poison spines on its body in all directions. Its round form makes it a poor swimmer.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/101.png",
      "large": "https://images.pokemontcg.io/dp3/101_hires.png"
    }
  },
  {
    "id": "dp3-102",
    "name": "Ralts",
    "number": "102",
    "artist": "Sumiyoshi Kizuki",
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
        "name": "Smack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Confuse Ray",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused."
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
      280
    ],
    "flavorText": "It uses the thorns on its head to sense human emotions. It is said to appear in front of cheerful people.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/102.png",
      "large": "https://images.pokemontcg.io/dp3/102_hires.png"
    }
  },
  {
    "id": "dp3-103",
    "name": "Rattata",
    "number": "103",
    "artist": "Mitsuhiro Arita",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "30",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Raticate"
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
        "name": "Bite",
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
        "value": "+10"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      19
    ],
    "flavorText": "Cautious in the extreme, its hardy vitality lets it live in any kind of environment.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/103.png",
      "large": "https://images.pokemontcg.io/dp3/103_hires.png"
    }
  },
  {
    "id": "dp3-104",
    "name": "Sentret",
    "number": "104",
    "artist": "Midori Harada",
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
      "Furret"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Grope",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top 2 cards of your deck, choose 1 of them, and put it into your hand. Put the other card on the bottom of your deck."
      },
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
      161
    ],
    "flavorText": "It has a very nervous nature. It stands up high on its tail so it can scan wide areas.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/104.png",
      "large": "https://images.pokemontcg.io/dp3/104_hires.png"
    }
  },
  {
    "id": "dp3-105",
    "name": "Shellder",
    "number": "105",
    "artist": "Ken Sugimori",
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
      "Cloyster"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shell Rest",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Remove 2 damage counters from Shellder."
      },
      {
        "name": "Tongue Slap",
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
        "value": "+10"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      90
    ],
    "flavorText": "It swims backwards by opening and closing its two shells. Its large tongue is always kept hanging out.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/105.png",
      "large": "https://images.pokemontcg.io/dp3/105_hires.png"
    }
  },
  {
    "id": "dp3-106",
    "name": "Shellos East Sea",
    "number": "106",
    "artist": "Ken Sugimori",
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
        "name": "Shell Hunting",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 in any combination of Shellos West Sea and Shellos East Sea and put them on your Bench. Shuffle your deck afterward."
      },
      {
        "name": "Sprinkle Water",
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
    "flavorText": "Its colors and shapes differ from region to region. In the Sinnoh region, two types are confirmed.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/106.png",
      "large": "https://images.pokemontcg.io/dp3/106_hires.png"
    }
  },
  {
    "id": "dp3-107",
    "name": "Shellos West Sea",
    "number": "107",
    "artist": "Ken Sugimori",
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
        "name": "Mud Spatter",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Recover",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard a Water Energy attached to Shellos West Sea and remove all damage counters from Shellos West Sea."
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
      422
    ],
    "flavorText": "Its colors and shapes differ from region to region. In the Sinnoh region, two types are confirmed.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/107.png",
      "large": "https://images.pokemontcg.io/dp3/107_hires.png"
    }
  },
  {
    "id": "dp3-108",
    "name": "Shroomish",
    "number": "108",
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
      "Breloom"
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
        "name": "Toxic Spore",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Poisoned."
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
      285
    ],
    "flavorText": "It spouts poison spores from the top of its head. These spores cause pain all over if inhaled.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/108.png",
      "large": "https://images.pokemontcg.io/dp3/108_hires.png"
    }
  },
  {
    "id": "dp3-109",
    "name": "Shuckle",
    "number": "109",
    "artist": "Emi Yoshida",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Pot Shell",
        "text": "Prevent all effects of attacks, including damage, done to Shuckle by your opponent's Pokémon that has any Special Energy cards attached to it.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Ferment Poison",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "The Defending Pokémon is now Poisoned. As long as the Defending Pokémon remains Poisoned by this attack, it can't use any Poké-Body."
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      213
    ],
    "flavorText": "It stores berries in its shell. The berries eventually ferment to become delicious juices.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/109.png",
      "large": "https://images.pokemontcg.io/dp3/109_hires.png"
    }
  },
  {
    "id": "dp3-110",
    "name": "Shuppet",
    "number": "110",
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
      "Banette"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gossip",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put 1 damage counter on 1 of your opponent's Pokémon."
      },
      {
        "name": "Hang Down",
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
      353
    ],
    "flavorText": "It loves vengeful emotions and hangs in rows under the eaves of houses where vengeful people live.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/110.png",
      "large": "https://images.pokemontcg.io/dp3/110_hires.png"
    }
  },
  {
    "id": "dp3-111",
    "name": "Spinda",
    "number": "111",
    "artist": "Atsuko Nishida",
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
        "name": "Dish Out",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card from the top and the bottom of your deck."
      },
      {
        "name": "Synchro Punch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If any basic Energy card attached to Spinda is the same type as any Energy attached to the Defending Pokémon, this attack does 10 damage plus 30 more damage."
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
      327
    ],
    "flavorText": "No two Spinda have the same pattern of spots. Its tottering step fouls the aim of foes.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/111.png",
      "large": "https://images.pokemontcg.io/dp3/111_hires.png"
    }
  },
  {
    "id": "dp3-112",
    "name": "Squirtle",
    "number": "112",
    "artist": "Kagemaru Himeno",
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
      "Wartortle"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bubble",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Aqua Tail",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin for each Water Energy attached to Squirtle. This attack does 20 damage plus 10 more damage for each heads."
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
      7
    ],
    "flavorText": "It shelters itself in its shell, then strikes back with spouts of water at every opportunity.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/112.png",
      "large": "https://images.pokemontcg.io/dp3/112_hires.png"
    }
  },
  {
    "id": "dp3-113",
    "name": "Stantler",
    "number": "113",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Lead",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Search your deck for a Supporter card, show it to your opponent, and put it into your hand. Shuffle your deck afterward."
      },
      {
        "name": "Frighten Horn",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "If the Defending Pokémon isn't an Evolved Pokémon, that Pokémon is now Confused."
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
      234
    ],
    "flavorText": "Staring at its antlers creates an odd sensation as if one were being drawn into their centers.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/113.png",
      "large": "https://images.pokemontcg.io/dp3/113_hires.png"
    }
  },
  {
    "id": "dp3-114",
    "name": "Sunkern",
    "number": "114",
    "artist": "Midori Harada",
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
      "Sunflora"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sun Soak",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, remove all damage counters from Sunkern, search your deck for an Evolution card that evolves from Sunkern, and put it onto Sunkern. (This counts as evolving Sunkern.) Shuffle your deck afterward."
      },
      {
        "name": "Seed Bomb",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      191
    ],
    "flavorText": "It suddenly falls out of the sky in the morning. A year after a cold summer, their population explodes.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/114.png",
      "large": "https://images.pokemontcg.io/dp3/114_hires.png"
    }
  },
  {
    "id": "dp3-115",
    "name": "Trapinch",
    "number": "115",
    "artist": "Sumiyoshi Kizuki",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Inviting Trap",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch the Defending Pokémon with 1 of your opponent's Benched Pokémon."
      },
      {
        "name": "Sand Tomb",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
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
      "small": "https://images.pokemontcg.io/dp3/115.png",
      "large": "https://images.pokemontcg.io/dp3/115_hires.png"
    }
  },
  {
    "id": "dp3-116",
    "name": "Venonat",
    "number": "116",
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
      "Venomoth"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stun Spore",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Signal Beam",
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
        "value": "+10"
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
    "flavorText": "Its big eyes are actually clusters of tiny eyes. At nights, its kind is drawn by light.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/116.png",
      "large": "https://images.pokemontcg.io/dp3/116_hires.png"
    }
  },
  {
    "id": "dp3-117",
    "name": "Voltorb",
    "number": "117",
    "artist": "Satoshi Ohta",
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
      "Electrode"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Speed Ball",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Big Explosion",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Voltorb does 50 damage to itself."
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
      100
    ],
    "flavorText": "It looks just like a Poké Ball. It is dangerous because it may electrocute or explode on touch.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/117.png",
      "large": "https://images.pokemontcg.io/dp3/117_hires.png"
    }
  },
  {
    "id": "dp3-118",
    "name": "Wooper",
    "number": "118",
    "artist": "Masakazu Fukuda",
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
      "Quagsire"
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
      },
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
        "type": "Grass",
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
      194
    ],
    "flavorText": "It lives in cold water, half burying itself in mud at the bottom to sleep.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/118.png",
      "large": "https://images.pokemontcg.io/dp3/118_hires.png"
    }
  },
  {
    "id": "dp3-119",
    "name": "Bebe's Search",
    "number": "119",
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
      "small": "https://images.pokemontcg.io/dp3/119.png",
      "large": "https://images.pokemontcg.io/dp3/119_hires.png"
    }
  },
  {
    "id": "dp3-120",
    "name": "Night Maintenance",
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
      "Search your discard pile for up to 3 in any combination of Pokémon and basic Energy cards. Show them to your opponent and shuffle them into your deck."
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
      "small": "https://images.pokemontcg.io/dp3/120.png",
      "large": "https://images.pokemontcg.io/dp3/120_hires.png"
    }
  },
  {
    "id": "dp3-121",
    "name": "PlusPower",
    "number": "121",
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
      "Attach PlusPower to 1 of your Pokémon. Discard this card at the end of your turn.",
      "If the Pokémon PlusPower is attached to attacks, the attack does 10 more damage to the Active Pokémon (before applying Weakness and Resistance)."
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
      "small": "https://images.pokemontcg.io/dp3/121.png",
      "large": "https://images.pokemontcg.io/dp3/121_hires.png"
    }
  },
  {
    "id": "dp3-122",
    "name": "Professor Oak's Visit",
    "number": "122",
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
      "Draw 3 cards. Then, choose a card from your hand and put it on the bottom of your deck."
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
      "small": "https://images.pokemontcg.io/dp3/122.png",
      "large": "https://images.pokemontcg.io/dp3/122_hires.png"
    }
  },
  {
    "id": "dp3-123",
    "name": "Professor Rowan",
    "number": "123",
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
      "Choose 1 card in your hand and shuffle the rest of your cards into your deck. Then, draw 4 cards. (If this is the only card in your hand, you can't play this card.)"
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
      "small": "https://images.pokemontcg.io/dp3/123.png",
      "large": "https://images.pokemontcg.io/dp3/123_hires.png"
    }
  },
  {
    "id": "dp3-124",
    "name": "Rival",
    "number": "124",
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
      "Reveal the top 5 cards of your deck. Your opponent chooses 3 of those cards. Put those cards into your hand and put other 2 cards on top of your deck. Shuffle your deck afterward."
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
      "small": "https://images.pokemontcg.io/dp3/124.png",
      "large": "https://images.pokemontcg.io/dp3/124_hires.png"
    }
  },
  {
    "id": "dp3-125",
    "name": "Roseanne's Research",
    "number": "125",
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
      "Search your deck for up to 2 in any combination of Basic Pokémon and basic Energy cards, show them to your opponent, and put them into your hand. Shuffle your deck afterward."
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
      "small": "https://images.pokemontcg.io/dp3/125.png",
      "large": "https://images.pokemontcg.io/dp3/125_hires.png"
    }
  },
  {
    "id": "dp3-126",
    "name": "Team Galactic's Mars",
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
      "You can play only one Supporter card each turn. When you play this card, put it next to your Active Pokémon. When your turn ends, discard this card.",
      "Draw 2 cards. Then, choose a card from your opponent's hand without looking and put it on the bottom of his or her deck."
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
      "small": "https://images.pokemontcg.io/dp3/126.png",
      "large": "https://images.pokemontcg.io/dp3/126_hires.png"
    }
  },
  {
    "id": "dp3-127",
    "name": "Potion",
    "number": "127",
    "artist": "Shin-ichi Yoshikawa",
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
      "Remove 2 damage counters from 1 of your Pokémon (remove 1 damage counter if that Pokémon has only 1)."
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
      "small": "https://images.pokemontcg.io/dp3/127.png",
      "large": "https://images.pokemontcg.io/dp3/127_hires.png"
    }
  },
  {
    "id": "dp3-128",
    "name": "Switch",
    "number": "128",
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
      "Switch 1 of your Active Pokémon with 1 of your Benched Pokémon."
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
      "small": "https://images.pokemontcg.io/dp3/128.png",
      "large": "https://images.pokemontcg.io/dp3/128_hires.png"
    }
  },
  {
    "id": "dp3-129",
    "name": "Darkness Energy",
    "number": "129",
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
      "small": "https://images.pokemontcg.io/dp3/129.png",
      "large": "https://images.pokemontcg.io/dp3/129_hires.png"
    }
  },
  {
    "id": "dp3-130",
    "name": "Metal Energy",
    "number": "130",
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
      "small": "https://images.pokemontcg.io/dp3/130.png",
      "large": "https://images.pokemontcg.io/dp3/130_hires.png"
    }
  },
  {
    "id": "dp3-131",
    "name": "Gardevoir LV.X",
    "number": "131",
    "artist": "Ryo Ueda",
    "rarity": "Rare Holo LV.X",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Gardevoir",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Gardevoir. Gardevoir LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
    ],
    "abilities": [
      {
        "name": "Teleportation",
        "text": "Once during your turn (before your attack), choose 1 of your Active Pokémon or 1 or your Benched Pokémon and switch Gardevoir with that Pokémon. This power can't be used if Gardevoir is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Bring Down",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 Pokémon (yours or your opponent's) with the fewest remaining HP (excluding Gardevoir) and that Pokémon is now Knocked Out."
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
      282
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/131.png",
      "large": "https://images.pokemontcg.io/dp3/131_hires.png"
    }
  },
  {
    "id": "dp3-132",
    "name": "Honchkrow LV.X",
    "number": "132",
    "artist": "Ryo Ueda",
    "rarity": "Rare Holo LV.X",
    "supertype": "Pokémon",
    "subtypes": [
      "Level-Up"
    ],
    "hp": "110",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Honchkrow",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Honchkrow. Honchkrow LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Feint Attack",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 40 damage to that Pokémon. This attack's damage isn't affected by Weakness, Resistance, Poké-Powers, Poké-Bodies, or any other effects on that Pokémon."
      },
      {
        "name": "Darkness Wing",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "If the Defending Pokémon would be Knocked Out by damage from this attack, you may search your discard pile for any 1 card, show it to your opponent, and put it into your hand."
      }
    ],
    "weaknesses": [
      {
        "type": "Lightning",
        "value": "+30"
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
      430
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/dp3/132.png",
      "large": "https://images.pokemontcg.io/dp3/132_hires.png"
    }
  }
]

export default cardDetails
