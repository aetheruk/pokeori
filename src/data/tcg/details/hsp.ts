import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "hsp-HGSS01",
    "name": "Ho-Oh",
    "number": "HGSS01",
    "artist": "Takashi Yamaguchi",
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
        "name": "Combustion",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Sacred Fire",
        "cost": [
          "Fire",
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "",
        "text": "Flip a coin. If heads, choose 1 of your opponent's Pokémon. This attack does 80 damage to that Pokémon. This attack's damage isn't affected by Weakness or Resistance."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      250
    ],
    "flavorText": "A legend says that its body glows in seven colors. A rainbow is said to form behind when it flies.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS01.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS01_hires.png"
    }
  },
  {
    "id": "hsp-HGSS02",
    "name": "Lugia",
    "number": "HGSS02",
    "artist": "Takashi Yamaguchi",
    "rarity": "Promo",
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
        "name": "Wave Splash",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Aeroblast",
        "cost": [
          "Water",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "50+",
        "text": "Flip 2 coins. This attack does 50 damage plus 20 more damage for each heads."
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
    "flavorText": "It is said that it quietly spends its time deep at the bottom of the sea because its powers are too strong.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS02.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS02_hires.png"
    }
  },
  {
    "id": "hsp-HGSS03",
    "name": "Pikachu",
    "number": "HGSS03",
    "artist": "Kanako Eo",
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
      "Raichu"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Recharge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, search your deck for a Lightning Energy card and attach it to Pikachu. Shuffle your deck afterward."
      },
      {
        "name": "Thunderbolt",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": "Discard all Energy attached to Pikachu."
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
    "flavorText": "It occasionally uses an electric shock to recharge a fellow Pikachu that is in a weakened state.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS03.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS03_hires.png"
    }
  },
  {
    "id": "hsp-HGSS04",
    "name": "Wobbuffet",
    "number": "HGSS04",
    "artist": "match",
    "rarity": "Promo",
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
        "name": "Tenacious Bind",
        "text": "As long as Wobbuffet is your Active Pokémon, your opponent's Active Pokémon's Retreat Cost is ColorlessColorless more.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Trip Over",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Flip a coin. If heads, this attack does 20 damage plus 30 more damage."
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
      202
    ],
    "flavorText": "To keep its pitch-black tail hidden, it lives quietly in the darkness. It is never first to attack.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS04.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS04_hires.png"
    }
  },
  {
    "id": "hsp-HGSS05",
    "name": "Hoothoot",
    "number": "HGSS05",
    "artist": "Masakazu Fukuda",
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
    "evolvesTo": [
      "Noctowl"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Insomnia",
        "text": "Hoothoot can't be Asleep.",
        "type": "Poké-Body"
      }
    ],
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
      163
    ],
    "flavorText": "It has a perfect sense of time. Whatever happens, it keeps rhythm by precisely tilting its head in time.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS05.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS05_hires.png"
    }
  },
  {
    "id": "hsp-HGSS06",
    "name": "Noctowl",
    "number": "HGSS06",
    "artist": "Masakazu Fukuda",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Hoothoot",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Night Scope",
        "text": "Once during your turn (before your attack), you may look at your opponent's hand. This power can't be used if Noctowl is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Hypnoblast",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "The Defending Pokémon is now Asleep."
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
      164
    ],
    "flavorText": "When it needs to think, it rotates its head 180 degrees to sharpen its intellectual power.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS06.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS06_hires.png"
    }
  },
  {
    "id": "hsp-HGSS07",
    "name": "Feraligatr",
    "number": "HGSS07",
    "artist": "Kent Kanetsuna",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Prime"
    ],
    "hp": "140",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Croconaw",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Rain Dance",
        "text": "As often as you like during your turn (before your attack), you may attach a Water Energy from your hand to 1 of your Water Pokémon. This power can't be used if Feraligatr is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Hydro Crunch",
        "cost": [
          "Water",
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 4,
        "damage": "60+",
        "text": "Does 60 damage plus 10 more damage for each damage counter on the Defending Pokémon."
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
      160
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS07.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS07_hires.png"
    }
  },
  {
    "id": "hsp-HGSS08",
    "name": "Meganium",
    "number": "HGSS08",
    "artist": "Noriko Hotta",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Prime"
    ],
    "hp": "150",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Bayleef",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Leaf Trans",
        "text": "As often as you like during your turn (before your attack), you may move a Grass Energy attached to 1 of your Pokémon to another of your Pokémon. This power can't be used if Meganium is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Solarbeam",
        "cost": [
          "Grass",
          "Grass",
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
      154
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS08.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS08_hires.png"
    }
  },
  {
    "id": "hsp-HGSS09",
    "name": "Typhlosion",
    "number": "HGSS09",
    "artist": "Wataru Kawahara",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "Prime"
    ],
    "hp": "140",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Quilava",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Afterburner",
        "text": "Once during your turn (before your attack), you may search your discard pile for a Fire Energy card and attach it to 1 of your Pokémon. If you do, put 1 damage counter on that Pokémon. This power can't be used if Typhlosion is affected by a Special Condition.",
        "type": "Poké-Power"
      }
    ],
    "attacks": [
      {
        "name": "Flare Destroy",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Discard an Energy card attached to Typhlosion and discard an Energy card attached to the Defending Pokémon."
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
      157
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS09.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS09_hires.png"
    }
  },
  {
    "id": "hsp-HGSS10",
    "name": "Latias",
    "number": "HGSS10",
    "artist": "Wataru Kawahara",
    "rarity": "Promo",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Energy Assist",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Search your discard pile for a basic Energy card and attach it to 1 of your Benched Pokémon."
      },
      {
        "name": "Infinite Wind",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "If Latios is on your Bench, remove 2 damage counters from each of your Benched Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Colorless",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      380
    ],
    "flavorText": "It communicates using telepathy. Its body is covered in down that refracts light to make it invisible.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS10.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS10_hires.png"
    }
  },
  {
    "id": "hsp-HGSS11",
    "name": "Latios",
    "number": "HGSS11",
    "artist": "Wataru Kawahara",
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
    "rules": [],
    "abilities": [
      {
        "name": "Luster Float",
        "text": "If you have Latias in play, the Retreat Cost for Latios is 0.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Infinite Wing",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "Discard 2 Energy attached to Latios."
      }
    ],
    "weaknesses": [
      {
        "type": "Colorless",
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
    "flavorText": "It understands human speech and is highly intelligent. It is a tender Pokémon that dislikes fighting.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS11.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS11_hires.png"
    }
  },
  {
    "id": "hsp-HGSS12",
    "name": "Cleffa",
    "number": "HGSS12",
    "artist": "Masakazu Fukuda",
    "rarity": "Promo",
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
      "Clefairy"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Sweet Sleeping Face",
        "text": "As long as Cleffa is Asleep, prevent all damage done to Cleffa by attacks.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Eeeeeeek",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Shuffle your hand into your deck, then draw 6 cards. Cleffa is now Asleep."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      173
    ],
    "flavorText": "Because of its unusual, star-like silhouette, people believe that it came here on a meteor.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS12.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS12_hires.png"
    }
  },
  {
    "id": "hsp-HGSS13",
    "name": "Smoochum",
    "number": "HGSS13",
    "artist": "Midori Harada",
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
      "Jynx"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Sweet Sleeping Face",
        "text": "As long as Smoochum is Asleep, prevent all damage done to Smoochum by attacks.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Energy Antics",
        "cost": [],
        "convertedEnergyCost": 0,
        "damage": "",
        "text": "Move an Energy card attached to 1 of your opponent's Pokémon to another of your opponent's Pokémon. Smoochum is now Asleep."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      238
    ],
    "flavorText": "Its lips are the most sensitive part of its body. It always uses its lips first to examine things.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS13.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS13_hires.png"
    }
  },
  {
    "id": "hsp-HGSS14",
    "name": "Lapras",
    "number": "HGSS14",
    "artist": "Masakazu Fukuda",
    "rarity": "Promo",
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
        "name": "Ferry",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your discard pile for a Supporter card, show it to your opponent, and put it into your hand."
      },
      {
        "name": "Surf",
        "cost": [
          "Water",
          "Water",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      131
    ],
    "flavorText": "It ferries people across the sea on its back. It may sing an enchanting cry if it is in a good mood.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS14.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS14_hires.png"
    }
  },
  {
    "id": "hsp-HGSS15",
    "name": "Shuckle",
    "number": "HGSS15",
    "artist": "match",
    "rarity": "Promo",
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
        "name": "Fermenting Liquid",
        "text": "Whenever you attach an Energy card from your hand to Shuckle, draw a card.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Shell Stunner",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, prevent all damage done to Shuckle by attacks during your opponent's next turn."
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
      213
    ],
    "flavorText": "It stores berries inside its shell. To avoid attacks, it hides beneath rocks and remains completely still.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS15.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS15_hires.png"
    }
  },
  {
    "id": "hsp-HGSS16",
    "name": "Plusle",
    "number": "HGSS16",
    "artist": "Kouki Saitou",
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
        "name": "Collect",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw 2 cards."
      },
      {
        "name": "Thunder Jolt",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Flip a coin. If tails, Plusle does 10 damage to itself."
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
      311
    ],
    "flavorText": "It absorbs electricity from telephone poles. It shorts out its body to create crackling noises.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS16.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS16_hires.png"
    }
  },
  {
    "id": "hsp-HGSS17",
    "name": "Minun",
    "number": "HGSS17",
    "artist": "Kouki Saitou",
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
        "name": "Call for Family",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Shuffle your deck afterward."
      },
      {
        "name": "Tag Team Boost",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "If Plusle is on your Bench, this attack does 10 damage plus 20 more damage."
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
      312
    ],
    "flavorText": "Exposure to electricity from Minun and Plusle promotes blood circulation and relaxes muscles.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS17.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS17_hires.png"
    }
  },
  {
    "id": "hsp-HGSS18",
    "name": "Tropical Tidal Wave",
    "number": "HGSS18",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Promo",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Flip a coin. If heads, discard all Trainer and Stadium cards your opponent has in play. If tails, discard all Trainer and Stadium cards you have in play."
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
      "small": "https://images.pokemontcg.io/hsp/HGSS18.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS18_hires.png"
    }
  },
  {
    "id": "hsp-HGSS19",
    "name": "Raikou",
    "number": "HGSS19",
    "artist": "Noriko Hotta",
    "rarity": "Promo",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Zap Cannon",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "During your next turn, Raikou can't use Zap Cannon."
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
      243
    ],
    "flavorText": "The rain clouds it carries let it fire thunderbolts at will. They say that it descended with lightning.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS19.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS19_hires.png"
    }
  },
  {
    "id": "hsp-HGSS20",
    "name": "Entei",
    "number": "HGSS20",
    "artist": "Yuri Umemura",
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
        "name": "Flare Blitz",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Discard all Fire Energy attached to Entei."
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
    "flavorText": "Volcanoes erupt when it barks. Unable to contain its sheer power, it races headlong around the land.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS20.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS20_hires.png"
    }
  },
  {
    "id": "hsp-HGSS21",
    "name": "Suicune",
    "number": "HGSS21",
    "artist": "Hideaki Hakozaki",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sheer Cold",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Flip a coin. If heads, the Defending Pokémon can't attack during your opponent's next turn."
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
    "flavorText": "Said to be the embodiment of north winds, it can instantly purify filthy, murky water.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS21.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS21_hires.png"
    }
  },
  {
    "id": "hsp-HGSS22",
    "name": "Porygon",
    "number": "HGSS22",
    "artist": "TOKIYA",
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
    "evolvesTo": [
      "Porygon2"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stiffen",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, any damage done to Porygon by attacks is reduced by 20 (after applying Weakness and Resistance)."
      },
      {
        "name": "Version Update",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Search your deck for Porygon2, show it to your opponent, and put it into your hand. Shuffle your deck afterward."
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
      137
    ],
    "flavorText": "It is a manmade Pokémon. Since it doesn't breathe, people are eager to try it in any environment..",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS22.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS22_hires.png"
    }
  },
  {
    "id": "hsp-HGSS23",
    "name": "Porygon2",
    "number": "HGSS23",
    "artist": "TOKIYA",
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
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
        "name": "Shortcut",
        "text": "The Retreat Cost for each Porygon, Porygon2, and Porygon-Z you have in play is Colorless less.",
        "type": "Poké-Body"
      }
    ],
    "attacks": [
      {
        "name": "Reckless Charge",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Porygon2 does 10 damage to itself."
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
      233
    ],
    "flavorText": "This upgraded version of Porygon is designed for space exploration. It can't fly, though.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS23.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS23_hires.png"
    }
  },
  {
    "id": "hsp-HGSS24",
    "name": "Hitmonchan",
    "number": "HGSS24",
    "artist": "Kouki Saitou",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Detect",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, prevent all effects of attacks, including damage, done to Hitmonchan during your opponent's next turn."
      },
      {
        "name": "Sky Uppercut",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
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
      107
    ],
    "flavorText": "Its punches slice the air. However, it seems to need a short break after fighting for three minutes.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS24.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS24_hires.png"
    }
  },
  {
    "id": "hsp-HGSS25",
    "name": "Hitmonlee",
    "number": "HGSS25",
    "artist": "Kouki Saitou",
    "rarity": "Promo",
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
        "name": "Kick",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "High Jump Kick",
        "cost": [
          "Fighting",
          "Fighting",
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
      106
    ],
    "flavorText": "If it starts kicking repeatedly, both legs will stretch even longer to strike a fleeing foe.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/hsp/HGSS25.png",
      "large": "https://images.pokemontcg.io/hsp/HGSS25_hires.png"
    }
  }
]

export default cardDetails
