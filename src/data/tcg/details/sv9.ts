import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "sv9-1",
    "name": "Caterpie",
    "number": "1",
    "artist": "Shimaris Yukichi",
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
      "Metapod"
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
      10
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/001/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/001/high.webp"
    }
  },
  {
    "id": "sv9-2",
    "name": "Metapod",
    "number": "2",
    "artist": "OKUBO",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Caterpie",
    "evolvesTo": [
      "Butterfree"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Harden",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, prevent all damage done to this Pokémon by attacks if that damage is 60 or less."
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
      11
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/002/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/002/high.webp"
    }
  },
  {
    "id": "sv9-3",
    "name": "Butterfree",
    "number": "3",
    "artist": "satoma",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "120",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Metapod",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scale Hurricane",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "60×",
        "text": "Flip 4 coins. This attack does 60 damage for each heads. If at least 2 of them are heads, your opponent's Active Pokémon is now Paralyzed."
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
      12
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/003/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/003/high.webp"
    }
  },
  {
    "id": "sv9-4",
    "name": "Paras",
    "number": "4",
    "artist": "Ayako Ozaki",
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
      "Parasect"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Leech Life",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Heal from this Pokémon the same amount of damage you did to your opponent's Active Pokémon."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/004/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/004/high.webp"
    }
  },
  {
    "id": "sv9-5",
    "name": "Parasect",
    "number": "5",
    "artist": "Tetsu Kayama",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
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
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Scissor Swing",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60+",
        "text": "Flip 2 coins. This attack does 30 more damage for each heads."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/005/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/005/high.webp"
    }
  },
  {
    "id": "sv9-6",
    "name": "Petilil",
    "number": "6",
    "artist": "Shibuzoh.",
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
        "name": "Leaf Step",
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
      548
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/006/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/006/high.webp"
    }
  },
  {
    "id": "sv9-7",
    "name": "Lilligant",
    "number": "7",
    "artist": "Jiro Sasumo",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Petilil",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Sunny Day",
        "text": "Attacks used by your {G} Pokémon and {R} Pokémon do 20 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Spinning Attack",
        "cost": [
          "Grass",
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
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      549
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/007/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/007/high.webp"
    }
  },
  {
    "id": "sv9-8",
    "name": "Maractus",
    "number": "8",
    "artist": "Dsuke",
    "rarity": "Uncommon",
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
    "abilities": [
      {
        "name": "Exploding Needles",
        "text": "If this Pokémon is in the Active Spot and is Knocked Out by damage from an attack from your opponent's Pokémon, put 6 damage counters on the Attacking Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Corner",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
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
      556
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/008/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/008/high.webp"
    }
  },
  {
    "id": "sv9-9",
    "name": "Karrablast",
    "number": "9",
    "artist": "Yuka Morii",
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
      "Escavalier"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Push Down",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
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
      588
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/009/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/009/high.webp"
    }
  },
  {
    "id": "sv9-10",
    "name": "Foongus",
    "number": "10",
    "artist": "Saboteri",
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
      "Amoonguss"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spore Ball",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Your opponent's Active Pokémon is now Asleep."
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
      590
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/010/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/010/high.webp"
    }
  },
  {
    "id": "sv9-11",
    "name": "Amoonguss ex",
    "number": "11",
    "artist": "PLANETA Mochizuki",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "260",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Foongus",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Spore Ball",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Asleep."
      },
      {
        "name": "Champignon's Swing",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "100+",
        "text": "Flip a coin. If heads, this attack does 80 more damage."
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
      591
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/011/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/011/high.webp"
    }
  },
  {
    "id": "sv9-12",
    "name": "Shelmet",
    "number": "12",
    "artist": "Toshinao Aoki",
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
      "Accelgor"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shell Smack",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage done to this Pokémon by attacks."
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
      616
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/012/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/012/high.webp"
    }
  },
  {
    "id": "sv9-13",
    "name": "Accelgor",
    "number": "13",
    "artist": "Kazumasa Yasukuni",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Shelmet",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poisonous Ploy",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "Your opponent's Active Pokémon is now Confused and Poisoned. Switch this Pokémon with 1 of your Benched Pokémon."
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
      617
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/013/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/013/high.webp"
    }
  },
  {
    "id": "sv9-14",
    "name": "Durant",
    "number": "14",
    "artist": "KEIICHIRO ITO",
    "rarity": "Common",
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
        "name": "Crunch",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      632
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/014/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/014/high.webp"
    }
  },
  {
    "id": "sv9-15",
    "name": "Virizion",
    "number": "15",
    "artist": "Anesaki Dynamic",
    "rarity": "Uncommon",
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
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Leaf Drain",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Heal 30 damage from this Pokémon."
      },
      {
        "name": "Slicing Blade",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      640
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/015/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/015/high.webp"
    }
  },
  {
    "id": "sv9-16",
    "name": "Sprigatito",
    "number": "16",
    "artist": "Mina Nakai",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Tons of Treading",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 3 coins. This attack does 10 damage for each heads."
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/016/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/016/high.webp"
    }
  },
  {
    "id": "sv9-17",
    "name": "Floragato",
    "number": "17",
    "artist": "Felicia Chen",
    "rarity": "Common",
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
        "name": "Magical Leaf",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 30 more damage, and heal 30 damage from this Pokémon."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/017/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/017/high.webp"
    }
  },
  {
    "id": "sv9-18",
    "name": "Meowscarada",
    "number": "18",
    "artist": "kodama",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Floragato",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Showtime",
        "text": "Once during your turn, if this Pokémon is on your Bench, you may switch it with your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rising Bloom",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "90+",
        "text": "If your opponent's Active Pokémon is a Pokémon ex, this attack does 90 more damage."
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
      908
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/018/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/018/high.webp"
    }
  },
  {
    "id": "sv9-19",
    "name": "Nymble",
    "number": "19",
    "artist": "Ayako Ozaki",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rear Kick",
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
      919
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/019/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/019/high.webp"
    }
  },
  {
    "id": "sv9-20",
    "name": "Magmar",
    "number": "20",
    "artist": "Naoyo Kimura",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
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
        "name": "Searing Flame",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Burned."
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
      126
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/020/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/020/high.webp"
    }
  },
  {
    "id": "sv9-21",
    "name": "Magmortar",
    "number": "21",
    "artist": "Tonji Matsuno",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Magmar",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Magma Surge",
        "text": "During Pokémon Checkup, put 3 more damage counters on your opponent's Burned Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Searing Flame",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Burned."
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
      467
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/021/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/021/high.webp"
    }
  },
  {
    "id": "sv9-22",
    "name": "Torchic",
    "number": "22",
    "artist": "OKACHEKE",
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
      "Combusken"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Scratch",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      255
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/022/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/022/high.webp"
    }
  },
  {
    "id": "sv9-23",
    "name": "Combusken",
    "number": "23",
    "artist": "Fujimoto Gold",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Torchic",
    "evolvesTo": [
      "Blaziken"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Slash",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      256
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/023/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/023/high.webp"
    }
  },
  {
    "id": "sv9-24",
    "name": "Blaziken ex",
    "number": "24",
    "artist": "takuyoa",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "320",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Combusken",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Seething Spirit",
        "text": "Once during your turn, you may attach a Basic Energy card from your discard pile to 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Smolder-sault",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "200",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      257
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/024/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/024/high.webp"
    }
  },
  {
    "id": "sv9-25",
    "name": "Torkoal",
    "number": "25",
    "artist": "kodama",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
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
        "name": "Live Coal",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Heat Blast",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
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
      324
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/025/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/025/high.webp"
    }
  },
  {
    "id": "sv9-26",
    "name": "N's Darumaka",
    "number": "26",
    "artist": "Gemi",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Darmanitan"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rolling Tackle",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Flare",
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
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      554
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/026/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/026/high.webp"
    }
  },
  {
    "id": "sv9-27",
    "name": "N's Darmanitan",
    "number": "27",
    "artist": "nagimiso",
    "rarity": "Uncommon",
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
      555
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/027/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/027/high.webp"
    }
  },
  {
    "id": "sv9-28",
    "name": "Larvesta",
    "number": "28",
    "artist": "Kyoko Umemoto",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Volcarona"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Will-O-Wisp",
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
      636
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/028/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/028/high.webp"
    }
  },
  {
    "id": "sv9-29",
    "name": "Volcarona",
    "number": "29",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Larvesta",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Smoldering Scales",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "80",
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
      637
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/029/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/029/high.webp"
    }
  },
  {
    "id": "sv9-30",
    "name": "Reshiram ex",
    "number": "30",
    "artist": "PLANETA Mochizuki",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "220",
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
        "name": "Fire Wing",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": ""
      },
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      643
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/030/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/030/high.webp"
    }
  },
  {
    "id": "sv9-31",
    "name": "Volcanion ex",
    "number": "31",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "220",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Scalding Steam",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may make your opponent's Active Pokémon Burned.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Scorching Cyclone",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
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
      721
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/031/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/031/high.webp"
    }
  },
  {
    "id": "sv9-32",
    "name": "Articuno",
    "number": "32",
    "artist": "Takumi Wada",
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
        "name": "Frigid Fluttering",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic {W} Energy cards and attach them to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Ice Blast",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
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
      144
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/032/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/032/high.webp"
    }
  },
  {
    "id": "sv9-33",
    "name": "Remoraid",
    "number": "33",
    "artist": "Minahamu",
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
      "Octillery"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flail",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "This attack does 10 damage for each damage counter on this Pokémon."
      },
      {
        "name": "Rain Splash",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      223
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/033/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/033/high.webp"
    }
  },
  {
    "id": "sv9-34",
    "name": "Octillery",
    "number": "34",
    "artist": "Toshinao Aoki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Remoraid",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Aqua Wash",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "You may put an Energy attached to your opponent's Active Pokémon into their hand."
      },
      {
        "name": "Octo Beatdown",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90×",
        "text": "Flip a coin until you get tails. This attack does 90 damage for each heads."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/034/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/034/high.webp"
    }
  },
  {
    "id": "sv9-35",
    "name": "Lotad",
    "number": "35",
    "artist": "Ayako Ozaki",
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
        "name": "Water Gun",
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
      270
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/035/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/035/high.webp"
    }
  },
  {
    "id": "sv9-36",
    "name": "Lombre",
    "number": "36",
    "artist": "Mousho",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
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
        "name": "Aqua Slash",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      271
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/036/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/036/high.webp"
    }
  },
  {
    "id": "sv9-37",
    "name": "Ludicolo",
    "number": "37",
    "artist": "Jerky",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Lombre",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Vibrant Dance",
        "text": "All of your Pokémon in play get +40 HP. The effect of Vibrant Dance doesn't stack.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hydro Splash",
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
      272
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/037/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/037/high.webp"
    }
  },
  {
    "id": "sv9-38",
    "name": "Wingull",
    "number": "38",
    "artist": "Mékayu",
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
      "Pelipper"
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
      278
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/038/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/038/high.webp"
    }
  },
  {
    "id": "sv9-39",
    "name": "Pelipper",
    "number": "39",
    "artist": "Nelnal",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wingull",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spit Up",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Speed Dive",
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/039/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/039/high.webp"
    }
  },
  {
    "id": "sv9-40",
    "name": "Wailmer",
    "number": "40",
    "artist": "Shinya Mizuno",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "130",
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
        "name": "Surf",
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/040/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/040/high.webp"
    }
  },
  {
    "id": "sv9-41",
    "name": "Wailord",
    "number": "41",
    "artist": "Takeshi Nakamura",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "240",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wailmer",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
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
        "damage": "10+",
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
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      321
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/041/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/041/high.webp"
    }
  },
  {
    "id": "sv9-42",
    "name": "Regice",
    "number": "42",
    "artist": "Takumi Wada",
    "rarity": "Uncommon",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Icicle",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Blizzard",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "This attack also does 10 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      378
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/042/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/042/high.webp"
    }
  },
  {
    "id": "sv9-43",
    "name": "Veluza ex",
    "number": "43",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "210",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Razor Fin",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Purging Strike",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120+",
        "text": "You may discard your hand. If you discarded any cards in this way, this attack does 120 more damage."
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
      976
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/043/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/043/high.webp"
    }
  },
  {
    "id": "sv9-44",
    "name": "Alolan Geodude",
    "number": "44",
    "artist": "svlt",
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
      "Graveler"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Knuckle Punch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Tiny Charge",
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
      74
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/044/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/044/high.webp"
    }
  },
  {
    "id": "sv9-45",
    "name": "Alolan Graveler",
    "number": "45",
    "artist": "HYOGONOSUKE",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
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
        "name": "Rolling Tackle",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Electric Punch",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      75
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/045/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/045/high.webp"
    }
  },
  {
    "id": "sv9-46",
    "name": "Alolan Golem",
    "number": "46",
    "artist": "Takeshi Nakamura",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Alolan Graveler",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Electromagnetic Catapult",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "70×",
        "text": "Flip a coin until you get tails. This attack does 70 damage for each heads."
      },
      {
        "name": "Megaton Fall",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "160",
        "text": "This Pokémon also does 40 damage to itself."
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
      76
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/046/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/046/high.webp"
    }
  },
  {
    "id": "sv9-47",
    "name": "Iono's Voltorb",
    "number": "47",
    "artist": "Kazumasa Yasukuni",
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
      "Electrode"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Voltaic Chain",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 20 more damage for each {L} Energy attached to all of your Iono's Pokémon."
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
      100
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/047/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/047/high.webp"
    }
  },
  {
    "id": "sv9-48",
    "name": "Iono's Electrode",
    "number": "48",
    "artist": "GOTO minori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Iono's Voltorb",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Thump-Thump Boom",
        "cost": [
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "This Pokémon does 100 damage to itself. Flip a coin. If heads, your opponent's Active Pokémon is Knocked Out."
      },
      {
        "name": "Electric Ball",
        "cost": [
          "Lightning",
          "Lightning",
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
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      101
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/048/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/048/high.webp"
    }
  },
  {
    "id": "sv9-49",
    "name": "N's Joltik",
    "number": "49",
    "artist": "Iori Suzuki",
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
        "name": "Zapping Short",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Before doing damage, discard all Pokémon Tools from your opponent's Active Pokémon. If you discarded a Pokémon Tool in this way, your opponent's Active Pokémon is now Paralyzed."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/049/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/049/high.webp"
    }
  },
  {
    "id": "sv9-50",
    "name": "Togedemaru",
    "number": "50",
    "artist": "Susumu Maeya",
    "rarity": "Common",
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
        "name": "Toge Spark",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage from and effects of attacks done to this Pokémon."
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
      777
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/050/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/050/high.webp"
    }
  },
  {
    "id": "sv9-51",
    "name": "Tapu Koko ex",
    "number": "51",
    "artist": "PLANETA Igarashi",
    "rarity": "Double Rare",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Linked Lightning",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60+",
        "text": "This attack does 20 more damage for each of your Benched Pokémon."
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
      785
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/051/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/051/high.webp"
    }
  },
  {
    "id": "sv9-52",
    "name": "Iono's Tadbulb",
    "number": "52",
    "artist": "kurumitsu",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tiny Charge",
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
      938
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/052/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/052/high.webp"
    }
  },
  {
    "id": "sv9-53",
    "name": "Iono's Bellibolt ex",
    "number": "53",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Iono's Tadbulb",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
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
      939
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/053/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/053/high.webp"
    }
  },
  {
    "id": "sv9-54",
    "name": "Iono's Wattrel",
    "number": "54",
    "artist": "Akira Komayama",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Quick Attack",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 20 more damage."
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
      940
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/054/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/054/high.webp"
    }
  },
  {
    "id": "sv9-55",
    "name": "Iono's Kilowattrel",
    "number": "55",
    "artist": "chibi",
    "rarity": "Rare",
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
      941
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/055/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/055/high.webp"
    }
  },
  {
    "id": "sv9-56",
    "name": "Lillie's Clefairy ex",
    "number": "56",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
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
    "evolvesTo": [
      "Clefable"
    ],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
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
      35
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/056/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/056/high.webp"
    }
  },
  {
    "id": "sv9-57",
    "name": "Alolan Marowak",
    "number": "57",
    "artist": "Uta",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Cubone",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Retaliate",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30+",
        "text": "If any of your Pokémon were Knocked Out by damage from an attack during your opponent's last turn, this attack does 90 more damage."
      },
      {
        "name": "Will-O-Wisp",
        "cost": [
          "Psychic",
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
      105
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/057/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/057/high.webp"
    }
  },
  {
    "id": "sv9-58",
    "name": "Mr. Mime",
    "number": "58",
    "artist": "GOTO minori",
    "rarity": "Common",
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
        "name": "Mimic",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Shuffle your hand into your deck. Then, draw a card for each card in your opponent's hand."
      },
      {
        "name": "Psy Bolt",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
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
      122
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/058/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/058/high.webp"
    }
  },
  {
    "id": "sv9-59",
    "name": "Shuppet",
    "number": "59",
    "artist": "miki kudo",
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
      "Banette"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spooky Shot",
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
      353
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/059/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/059/high.webp"
    }
  },
  {
    "id": "sv9-60",
    "name": "Banette",
    "number": "60",
    "artist": "Anesaki Dynamic",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Shuppet",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Cursed Words",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent chooses 3 cards from their hand and shuffles those cards into their deck."
      },
      {
        "name": "Spooky Shot",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
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
      354
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/060/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/060/high.webp"
    }
  },
  {
    "id": "sv9-61",
    "name": "Beldum",
    "number": "61",
    "artist": "Izucch",
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
      "Metang"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spinning Attack",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Beam",
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
      374
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/061/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/061/high.webp"
    }
  },
  {
    "id": "sv9-62",
    "name": "Metang",
    "number": "62",
    "artist": "Oswaldo KATO",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Beldum",
    "evolvesTo": [
      "Metagross"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psypunch",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Zen Headbutt",
        "cost": [
          "Psychic",
          "Psychic"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      375
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/062/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/062/high.webp"
    }
  },
  {
    "id": "sv9-63",
    "name": "Metagross",
    "number": "63",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Metang",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wrack Down",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "60",
        "text": ""
      },
      {
        "name": "Conjoined Beams",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "130+",
        "text": "If Beldum and Metang are on your Bench, this attack does 150 more damage."
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
      376
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/063/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/063/high.webp"
    }
  },
  {
    "id": "sv9-64",
    "name": "N's Sigilyph",
    "number": "64",
    "artist": "Shiburingaru",
    "rarity": "Common",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Psychic Sphere",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Victory Symbol",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "If you use this attack when you have exactly 1 Prize card remaining, you win this game."
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
      561
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/064/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/064/high.webp"
    }
  },
  {
    "id": "sv9-65",
    "name": "Oricorio",
    "number": "65",
    "artist": "aspara",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Psychic"
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
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Spooky Shot",
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
      741
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/065/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/065/high.webp"
    }
  },
  {
    "id": "sv9-66",
    "name": "Lillie's Cutiefly",
    "number": "66",
    "artist": "Saya Tsuruta",
    "rarity": "Common",
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
      "Ribombee"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hold Still",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 10 damage from this Pokémon."
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
      742
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/066/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/066/high.webp"
    }
  },
  {
    "id": "sv9-67",
    "name": "Lillie's Ribombee",
    "number": "67",
    "artist": "mashu",
    "rarity": "Rare",
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
      743
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/067/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/067/high.webp"
    }
  },
  {
    "id": "sv9-68",
    "name": "Lillie's Comfey",
    "number": "68",
    "artist": "Narumi Sato",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Inviting Flowers",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "You may search your deck for any number of Basic Lillie's Pokémon and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Fade Out",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Put this Pokémon and all attached cards into your hand."
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
      764
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/068/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/068/high.webp"
    }
  },
  {
    "id": "sv9-69",
    "name": "Mimikyu ex",
    "number": "69",
    "artist": "PLANETA Igarashi",
    "rarity": "Double Rare",
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
        "name": "Mischievous Hands",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 2 of your opponent's Pokémon and put 3 damage counters on each of them."
      },
      {
        "name": "Ghostly Trip",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "Your opponent's Active Pokémon is now Confused."
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
      778
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/069/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/069/high.webp"
    }
  },
  {
    "id": "sv9-70",
    "name": "Dhelmise",
    "number": "70",
    "artist": "Sanosuke Sakuma",
    "rarity": "Common",
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
        "name": "Bind Down",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
      },
      {
        "name": "Anchor Smash",
        "cost": [
          "Psychic",
          "Psychic",
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
      781
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/070/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/070/high.webp"
    }
  },
  {
    "id": "sv9-71",
    "name": "Impidimp",
    "number": "71",
    "artist": "Haru Akasaka",
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
      "Morgrem"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gentle Slap",
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
      859
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/071/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/071/high.webp"
    }
  },
  {
    "id": "sv9-72",
    "name": "Morgrem",
    "number": "72",
    "artist": "Lee HyunJung",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Impidimp",
    "evolvesTo": [
      "Grimmsnarl"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Light Punch",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Smash Kick",
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
      860
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/072/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/072/high.webp"
    }
  },
  {
    "id": "sv9-73",
    "name": "Grimmsnarl",
    "number": "73",
    "artist": "Nisota Niso",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Morgrem",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shadowy Knot",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "50×",
        "text": "This attack does 50 damage for each {C} in your opponent's Active Pokémon's Retreat Cost."
      },
      {
        "name": "Mega Punch",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
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
      861
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/073/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/073/high.webp"
    }
  },
  {
    "id": "sv9-74",
    "name": "Milcery",
    "number": "74",
    "artist": "Shibuzoh.",
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
      "Alcremie"
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
      868
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/074/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/074/high.webp"
    }
  },
  {
    "id": "sv9-75",
    "name": "Alcremie ex",
    "number": "75",
    "artist": "PLANETA Mochizuki",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "250",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Milcery",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Confectionary Gift",
        "text": "Once during your turn, you may heal 30 damage from 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Whipped Shot",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
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
      869
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/075/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/075/high.webp"
    }
  },
  {
    "id": "sv9-76",
    "name": "Cubone",
    "number": "76",
    "artist": "Mugi Hamada",
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
      "Marowak"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stampede",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Light Punch",
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
      104
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/076/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/076/high.webp"
    }
  },
  {
    "id": "sv9-77",
    "name": "Swinub",
    "number": "77",
    "artist": "REND",
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
      "Piloswine"
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
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Lunge Out",
        "cost": [
          "Fighting"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      220
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/077/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/077/high.webp"
    }
  },
  {
    "id": "sv9-78",
    "name": "Piloswine",
    "number": "78",
    "artist": "Aliya Chen",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
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
        "name": "Strength",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Impaling Tusk",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
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
      221
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/078/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/078/high.webp"
    }
  },
  {
    "id": "sv9-79",
    "name": "Mamoswine ex",
    "number": "79",
    "artist": "Nisota Niso",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Piloswine",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Mammoth Hauler",
        "text": "Once during your turn, you may search your deck for a Pokémon, reveal it, and put it into your hand. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rumbling March",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "180+",
        "text": "This attack does 40 more damage for each Stage 2 Pokémon on your Bench."
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
      473
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/079/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/079/high.webp"
    }
  },
  {
    "id": "sv9-80",
    "name": "Larvitar",
    "number": "80",
    "artist": "Dsuke",
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
      "Pupitar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Crunch",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, discard an Energy from your opponent's Active Pokémon."
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
      246
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/080/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/080/high.webp"
    }
  },
  {
    "id": "sv9-81",
    "name": "Pupitar",
    "number": "81",
    "artist": "Scav",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
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
        "name": "Take Down",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "This Pokémon also does 20 damage to itself."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/081/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/081/high.webp"
    }
  },
  {
    "id": "sv9-82",
    "name": "Regirock",
    "number": "82",
    "artist": "Uta",
    "rarity": "Rare",
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
    "abilities": [
      {
        "name": "Rock Armor",
        "text": "If this Pokémon has any Energy attached, it takes 30 less damage from attacks (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Breaching Lariat",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This attack's damage isn't affected by Resistance."
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
      377
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/082/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/082/high.webp"
    }
  },
  {
    "id": "sv9-83",
    "name": "Pancham",
    "number": "83",
    "artist": "Yuriko Akase",
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
        "name": "Corkscrew Punch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Focus Fist",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
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
      674
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/083/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/083/high.webp"
    }
  },
  {
    "id": "sv9-84",
    "name": "Rockruff",
    "number": "84",
    "artist": "Yoshimi Miyoshi",
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
      "Lycanroc"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dig It Up",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at the top card of your deck. You may discard that card."
      },
      {
        "name": "Stampede",
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/084/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/084/high.webp"
    }
  },
  {
    "id": "sv9-85",
    "name": "Lycanroc",
    "number": "85",
    "artist": "Shiburingaru",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Rockruff",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Spike-Clad",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may attach up to 2 Spiky Energy cards from your discard pile to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Clamping Fangs",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "This attack does 40 more damage for each damage counter on your opponent's Active Pokémon."
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/085/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/085/high.webp"
    }
  },
  {
    "id": "sv9-86",
    "name": "Hop's Silicobra",
    "number": "86",
    "artist": "aspara",
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
      "Sandaconda"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Turf Maker",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Stadium card, reveal it, and put it into your hand. Then, shuffle your deck."
      },
      {
        "name": "Gnaw",
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
      843
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/086/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/086/high.webp"
    }
  },
  {
    "id": "sv9-87",
    "name": "Hop's Sandaconda",
    "number": "87",
    "artist": "Sanosuke Sakuma",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Hop's Silicobra",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rumble",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
      },
      {
        "name": "Break Ground",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "140",
        "text": "This attack also does 20 damage to each of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      844
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/087/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/087/high.webp"
    }
  },
  {
    "id": "sv9-88",
    "name": "Toedscool",
    "number": "88",
    "artist": "osare",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spray Fluid",
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
      948
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/088/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/088/high.webp"
    }
  },
  {
    "id": "sv9-89",
    "name": "Toedscruel",
    "number": "89",
    "artist": "Masako Tomii",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Toedscool",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Secret Forest Path",
        "text": "As long as this Pokémon is on your Bench, your Active Pokémon's Retreat Cost is {C}{C} less.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Mud Shot",
        "cost": [
          "Fighting",
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
      949
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/089/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/089/high.webp"
    }
  },
  {
    "id": "sv9-90",
    "name": "Klawf",
    "number": "90",
    "artist": "Shinya Komatsu",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Snipping Pincers",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip 2 coins. For each heads, discard an Energy from your opponent's Active Pokémon."
      },
      {
        "name": "Hammer In",
        "cost": [
          "Fighting",
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
      950
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/090/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/090/high.webp"
    }
  },
  {
    "id": "sv9-91",
    "name": "Koffing",
    "number": "91",
    "artist": "Rond",
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
      "Weezing"
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
        "name": "Suffocating Gas",
        "cost": [
          "Darkness",
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
      109
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/091/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/091/high.webp"
    }
  },
  {
    "id": "sv9-92",
    "name": "Weezing",
    "number": "92",
    "artist": "KEIICHIRO ITO",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Koffing",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pervasive Gas",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Confused."
      },
      {
        "name": "Crazy Blast",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50+",
        "text": "If this Pokémon used Pervasive Gas during your last turn, this attack does 120 more damage."
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
      110
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/092/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/092/high.webp"
    }
  },
  {
    "id": "sv9-93",
    "name": "Paldean Wooper",
    "number": "93",
    "artist": "Lee HyunJung",
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
      "Quagsire"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Trip Over",
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/093/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/093/high.webp"
    }
  },
  {
    "id": "sv9-94",
    "name": "Paldean Clodsire ex",
    "number": "94",
    "artist": "PLANETA Tsuji",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Paldean Wooper",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Ring",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Your opponent's Active Pokémon is now Poisoned. During your opponent's next turn, that Pokémon can't retreat."
      },
      {
        "name": "Giga Impact",
        "cost": [
          "Darkness",
          "Darkness",
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      980
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/094/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/094/high.webp"
    }
  },
  {
    "id": "sv9-95",
    "name": "Tyranitar",
    "number": "95",
    "artist": "AKIRA EGAWA",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "190",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Pupitar",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Daunting Gaze",
        "text": "As long as this Pokémon is in the Active Spot, your opponent can't play any Item cards from their hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Cracking Stomp",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "150",
        "text": "Discard the top 2 cards of your opponent's deck."
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
      248
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/095/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/095/high.webp"
    }
  },
  {
    "id": "sv9-96",
    "name": "N's Purrloin",
    "number": "96",
    "artist": "Keisin",
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
      "Liepard"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Thieving Swipe",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Your opponent reveals their hand, and you choose a card you find there and put it on the bottom of their deck."
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
      509
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/096/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/096/high.webp"
    }
  },
  {
    "id": "sv9-97",
    "name": "N's Zorua",
    "number": "97",
    "artist": "Jiro Sasumo",
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
      "Zoroark"
    ],
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
      570
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/097/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/097/high.webp"
    }
  },
  {
    "id": "sv9-98",
    "name": "N's Zoroark ex",
    "number": "98",
    "artist": "takuyoa",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "N's Zorua",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Trade",
        "text": "You must discard a card from your hand in order to use this Ability. Once during your turn, you may draw 2 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Night Joker",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your Benched N's Pokémon's attacks and use it as this attack."
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
      571
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/098/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/098/high.webp"
    }
  },
  {
    "id": "sv9-99",
    "name": "Pangoro",
    "number": "99",
    "artist": "nagimiso",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Pancham",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Torment",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Choose 1 of your opponent's Active Pokémon's attacks. During your opponent's next turn, that Pokémon can't use that attack."
      },
      {
        "name": "Power Tackle",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "During your next turn, this Pokémon can't attack."
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
      675
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/099/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/099/high.webp"
    }
  },
  {
    "id": "sv9-100",
    "name": "Lokix",
    "number": "100",
    "artist": "AKIRA EGAWA",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Nymble",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Low Sweep",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      920
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/100/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/100/high.webp"
    }
  },
  {
    "id": "sv9-101",
    "name": "Bombirdier",
    "number": "101",
    "artist": "Gemi",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Glide",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Drop Shot",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard all Energy from this Pokémon, and this attack does 120 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      962
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/101/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/101/high.webp"
    }
  },
  {
    "id": "sv9-102",
    "name": "Escavalier",
    "number": "102",
    "artist": "Takumi Wada",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Karrablast",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pierce",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Iron Buster",
        "cost": [
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "During your next turn, this Pokémon can't attack."
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
      589
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/102/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/102/high.webp"
    }
  },
  {
    "id": "sv9-103",
    "name": "N's Klink",
    "number": "103",
    "artist": "Saboteri",
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
        "name": "Double Spin",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 2 coins. This attack does 10 damage for each heads."
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
      599
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/103/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/103/high.webp"
    }
  },
  {
    "id": "sv9-104",
    "name": "N's Klang",
    "number": "104",
    "artist": "KEIICHIRO ITO",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "N's Klink",
    "evolvesTo": [
      "Klinklang"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spinning Gears",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Your opponent's Active Pokémon is now Confused."
      },
      {
        "name": "Confront",
        "cost": [
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
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
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      600
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/104/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/104/high.webp"
    }
  },
  {
    "id": "sv9-105",
    "name": "N's Klinklang",
    "number": "105",
    "artist": "matazo",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "N's Klang",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Magnetic Blast",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Triple Smash",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120×",
        "text": "Flip 3 coins. This attack does 120 damage for each heads."
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
      601
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/105/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/105/high.webp"
    }
  },
  {
    "id": "sv9-106",
    "name": "Galarian Stunfisk",
    "number": "106",
    "artist": "Aya Kusube",
    "rarity": "Common",
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
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mud-Slap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      },
      {
        "name": "Bounding Bite",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "This Pokémon also does 30 damage to itself."
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
      618
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/106/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/106/high.webp"
    }
  },
  {
    "id": "sv9-107",
    "name": "Magearna",
    "number": "107",
    "artist": "rika",
    "rarity": "Rare",
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
        "name": "Auto Heal",
        "text": "As long as this Pokémon is in the Active Spot, whenever you attach an Energy card from your hand to 1 of your Pokémon, heal 90 damage from that Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Spike Draw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Draw 2 cards."
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
      801
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/107/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/107/high.webp"
    }
  },
  {
    "id": "sv9-108",
    "name": "Hop's Corviknight",
    "number": "108",
    "artist": "GIDORA",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Hop's Corvisquire",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shoot Through",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "This attack also does 50 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Steel Wing",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "During your opponent's next turn, this Pokémon takes 60 less damage from attacks (after applying Weakness and Resistance)."
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
      823
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/108/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/108/high.webp"
    }
  },
  {
    "id": "sv9-109",
    "name": "Cufant",
    "number": "109",
    "artist": "kodama",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "100",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Copperajah"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rollout",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
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
      878
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/109/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/109/high.webp"
    }
  },
  {
    "id": "sv9-110",
    "name": "Copperajah",
    "number": "110",
    "artist": "Ryuta Fuse",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "190",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Cufant",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ram",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": ""
      },
      {
        "name": "Mega Impact",
        "cost": [
          "Metal",
          "Metal",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "160",
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
      879
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/110/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/110/high.webp"
    }
  },
  {
    "id": "sv9-111",
    "name": "Hop's Zacian ex",
    "number": "111",
    "artist": "aky CG Works",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "230",
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
      888
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/111/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/111/high.webp"
    }
  },
  {
    "id": "sv9-112",
    "name": "Bagon",
    "number": "112",
    "artist": "Miki Tanaka",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "70",
    "types": [
      "Dragon"
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
        "name": "Reckless Charge",
        "cost": [
          "Fire",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "This Pokémon also does 10 damage to itself."
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
      371
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/112/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/112/high.webp"
    }
  },
  {
    "id": "sv9-113",
    "name": "Shelgon",
    "number": "113",
    "artist": "Julie Hang",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Bagon",
    "evolvesTo": [
      "Salamence"
    ],
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
        "damage": "30",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Heavy Impact",
        "cost": [
          "Fire",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
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
      372
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/113/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/113/high.webp"
    }
  },
  {
    "id": "sv9-114",
    "name": "Salamence ex",
    "number": "114",
    "artist": "toriyufu",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "320",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Shelgon",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Wide Blast",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 50 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Dragon Impact",
        "cost": [
          "Fire",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "300",
        "text": "Discard 2 Energy from this Pokémon."
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
      373
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/114/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/114/high.webp"
    }
  },
  {
    "id": "sv9-115",
    "name": "Druddigon",
    "number": "115",
    "artist": "kawayoo",
    "rarity": "Common",
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
        "name": "Dragon's Fury",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Attach a Basic {R} Energy card from your discard pile to 1 of your {N} Pokémon."
      },
      {
        "name": "Slashing Claw",
        "cost": [
          "Fire",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
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
      621
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/115/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/115/high.webp"
    }
  },
  {
    "id": "sv9-116",
    "name": "N's Reshiram",
    "number": "116",
    "artist": "rika",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "130",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Powerful Rage",
        "cost": [
          "Fire",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage for each damage counter on this Pokémon."
      },
      {
        "name": "Virtuous Flame",
        "cost": [
          "Fire",
          "Fire",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "170",
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
      643
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/116/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/116/high.webp"
    }
  },
  {
    "id": "sv9-117",
    "name": "Hop's Snorlax",
    "number": "117",
    "artist": "GOSSAN",
    "rarity": "Rare",
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/117/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/117/high.webp"
    }
  },
  {
    "id": "sv9-118",
    "name": "Sentret",
    "number": "118",
    "artist": "Taiga Kayama",
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
        "name": "Smack",
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
        "value": "×2"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/118/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/118/high.webp"
    }
  },
  {
    "id": "sv9-119",
    "name": "Furret",
    "number": "119",
    "artist": "Tomomi Ozaki",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Sentret",
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
        "damage": "40",
        "text": ""
      },
      {
        "name": "Jet Headbutt",
        "cost": [
          "Colorless",
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
        "value": "×2"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/119/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/119/high.webp"
    }
  },
  {
    "id": "sv9-120",
    "name": "Dunsparce",
    "number": "120",
    "artist": "Asako Ito",
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
        "name": "Trading Places",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Ram",
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
      206
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/120/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/120/high.webp"
    }
  },
  {
    "id": "sv9-121",
    "name": "Dudunsparce ex",
    "number": "121",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "270",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Dunsparce",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Tenacious Tail",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "60×",
        "text": "This attack does 60 damage for each of your opponent's Pokémon ex in play."
      },
      {
        "name": "Destructive Drill",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
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
      982
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/121/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/121/high.webp"
    }
  },
  {
    "id": "sv9-122",
    "name": "Kecleon",
    "number": "122",
    "artist": "0313",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stealth Attack",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage from and effects of attacks done to this Pokémon."
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
      352
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/122/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/122/high.webp"
    }
  },
  {
    "id": "sv9-123",
    "name": "Tropius",
    "number": "123",
    "artist": "Atsuya Uki",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fruit Bearing",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard a card from your hand. If you do, draw 3 cards."
      },
      {
        "name": "Gust",
        "cost": [
          "Colorless",
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
      357
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/123/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/123/high.webp"
    }
  },
  {
    "id": "sv9-124",
    "name": "Audino",
    "number": "124",
    "artist": "Minahamu",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Beckon",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put a Supporter card from your discard pile into your hand."
      },
      {
        "name": "Zen Headbutt",
        "cost": [
          "Colorless",
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
      531
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/124/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/124/high.webp"
    }
  },
  {
    "id": "sv9-125",
    "name": "Minccino",
    "number": "125",
    "artist": "Oswaldo KATO",
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
      "Cinccino"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Slap",
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
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      572
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/125/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/125/high.webp"
    }
  },
  {
    "id": "sv9-126",
    "name": "Cinccino",
    "number": "126",
    "artist": "En Morikura",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Minccino",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tail Smack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
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
      573
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/126/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/126/high.webp"
    }
  },
  {
    "id": "sv9-127",
    "name": "Noibat",
    "number": "127",
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
      "Noivern"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rapid Draw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Draw a card."
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
      714
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/127/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/127/high.webp"
    }
  },
  {
    "id": "sv9-128",
    "name": "Noivern",
    "number": "128",
    "artist": "Anesaki Dynamic",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Noibat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Tuning Echo",
        "text": "If you have the same number of cards in your hand as your opponent, ignore all Energy in the cost of Frightening Howl used by this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Frightening Howl",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "Your opponent's Active Pokémon is now Confused."
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
    "convertedRetreatCost": 0,
    "nationalPokedexNumbers": [
      715
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/128/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/128/high.webp"
    }
  },
  {
    "id": "sv9-129",
    "name": "Komala",
    "number": "129",
    "artist": "Natsumi Yoshida",
    "rarity": "Common",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Slumbering Smack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Both Active Pokémon are now Asleep. During your next turn, attacks used by this Pokémon do 100 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance)."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/129/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/129/high.webp"
    }
  },
  {
    "id": "sv9-130",
    "name": "Drampa",
    "number": "130",
    "artist": "Tetsu Kayama",
    "rarity": "Common",
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
        "name": "Ram",
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
          "Colorless",
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
      780
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/130/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/130/high.webp"
    }
  },
  {
    "id": "sv9-131",
    "name": "Skwovet",
    "number": "131",
    "artist": "sowsow",
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
      "Greedent"
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
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      819
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/131/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/131/high.webp"
    }
  },
  {
    "id": "sv9-132",
    "name": "Greedent",
    "number": "132",
    "artist": "Jerky",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Skwovet",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gluttonous Tail",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Draw 2 cards."
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
      820
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/132/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/132/high.webp"
    }
  },
  {
    "id": "sv9-133",
    "name": "Hop's Rookidee",
    "number": "133",
    "artist": "Shinya Mizuno",
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
      "Corvisquire"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Intimidating Stare",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, attacks used by the Defending Pokémon do 20 less damage (before applying Weakness and Resistance)."
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
      821
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/133/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/133/high.webp"
    }
  },
  {
    "id": "sv9-134",
    "name": "Hop's Corvisquire",
    "number": "134",
    "artist": "Souichirou Gunjima",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Hop's Rookidee",
    "evolvesTo": [
      "Corviknight"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Speed Dive",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Razor Wing",
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
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      822
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/134/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/134/high.webp"
    }
  },
  {
    "id": "sv9-135",
    "name": "Hop's Wooloo",
    "number": "135",
    "artist": "Tomomi Ozaki",
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
      "Dubwool"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Smash Kick",
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
      831
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/135/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/135/high.webp"
    }
  },
  {
    "id": "sv9-136",
    "name": "Hop's Dubwool",
    "number": "136",
    "artist": "Ryota Murayama",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Hop's Wooloo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Defiant Horn",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may switch in 1 of your opponent's Benched Pokémon to the Active Spot.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Headbutt",
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
      832
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/136/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/136/high.webp"
    }
  },
  {
    "id": "sv9-137",
    "name": "Cramorant",
    "number": "137",
    "artist": "Tomomi Ozaki",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ceaseless Spitting",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50×",
        "text": "Flip a coin until you get tails. This attack does 50 damage for each heads."
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
      845
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/137/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/137/high.webp"
    }
  },
  {
    "id": "sv9-138",
    "name": "Hop's Cramorant",
    "number": "138",
    "artist": "Saboteri",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fickle Spitting",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "120",
        "text": "If your opponent doesn't have exactly 3 or 4 Prize cards remaining, this attack does nothing."
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
      845
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/138/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/138/high.webp"
    }
  },
  {
    "id": "sv9-139",
    "name": "Lechonk",
    "number": "139",
    "artist": "OKACHEKE",
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
        "name": "Ram",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      915
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/139/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/139/high.webp"
    }
  },
  {
    "id": "sv9-140",
    "name": "Oinkologne",
    "number": "140",
    "artist": "Mina Nakai",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Lechonk",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Aromatic Stomps",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Flip a coin. If heads, during your opponent's next turn, the Defending Pokémon can't attack."
      },
      {
        "name": "Headbutt Bounce",
        "cost": [
          "Colorless",
          "Colorless",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      916
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/140/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/140/high.webp"
    }
  },
  {
    "id": "sv9-141",
    "name": "Squawkabilly",
    "number": "141",
    "artist": "sowsow",
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
        "name": "Add On",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw 2 cards."
      },
      {
        "name": "Hyper Voice",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
    "regulationMark": "H",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/141/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/141/high.webp"
    }
  },
  {
    "id": "sv9-142",
    "name": "Billy & O'Nare",
    "number": "142",
    "artist": "Sanosuke Sakuma",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Draw 2 cards. Then, if you have 10 or more cards in your hand, draw 2 more cards.",
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
      "small": "https://assets.tcgdex.net/en/sv/sv09/142/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/142/high.webp"
    }
  },
  {
    "id": "sv9-143",
    "name": "Black Belt's Training",
    "number": "143",
    "artist": "GOSSAN",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "During this turn, attacks used by your Pokémon do 40 more damage to your opponent's Active Pokémon ex (before applying Weakness and Resistance).",
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
      "small": "https://assets.tcgdex.net/en/sv/sv09/143/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/143/high.webp"
    }
  },
  {
    "id": "sv9-144",
    "name": "Black Belt's Training",
    "number": "144",
    "artist": "GOSSAN",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "During this turn, attacks used by your Pokémon do 40 more damage to your opponent's Active Pokémon ex (before applying Weakness and Resistance).",
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
      "small": "https://assets.tcgdex.net/en/sv/sv09/144/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/144/high.webp"
    }
  },
  {
    "id": "sv9-145",
    "name": "Black Belt's Training",
    "number": "145",
    "artist": "GOSSAN",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "During this turn, attacks used by your Pokémon do 40 more damage to your opponent's Active Pokémon ex (before applying Weakness and Resistance).",
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
      "small": "https://assets.tcgdex.net/en/sv/sv09/145/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/145/high.webp"
    }
  },
  {
    "id": "sv9-146",
    "name": "Brock's Scouting",
    "number": "146",
    "artist": "Teeziro",
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
      "Search your deck for up to 2 Basic Pokémon or 1 Evolution Pokémon, reveal them, and put them into your hand. Then, shuffle your deck.",
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/146/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/146/high.webp"
    }
  },
  {
    "id": "sv9-147",
    "name": "Hop's Bag",
    "number": "147",
    "artist": "AYUMI ODASHIMA",
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
      "Search your deck for up to 2 Basic Hop's Pokémon and put them onto your Bench. Then, shuffle your deck.",
      "You may play any number of Item cards during your turn."
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/147/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/147/high.webp"
    }
  },
  {
    "id": "sv9-148",
    "name": "Hop's Choice Band",
    "number": "148",
    "artist": "Toyste Beach",
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
      "Attacks used by the Hop's Pokémon this card is attached to cost Colorless less and do 30 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
      "You may attach any number of Pokémon Tools to your Pokémon during your turn. You may attach only 1 Pokémon Tool to each Pokémon, and it stays attached."
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/148/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/148/high.webp"
    }
  },
  {
    "id": "sv9-149",
    "name": "Iris's Fighting Spirit",
    "number": "149",
    "artist": "yuu",
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
      "You can use this card only if you discard another card from your hand.  Draw cards until you have 6 cards in your hand.",
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/149/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/149/high.webp"
    }
  },
  {
    "id": "sv9-150",
    "name": "Levincia",
    "number": "150",
    "artist": "MARINA Chikazawa",
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
      "Once during each player's turn, that player may put up to 2 Basic Lightning Energy cards from their discard pile into their hand.",
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/150/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/150/high.webp"
    }
  },
  {
    "id": "sv9-151",
    "name": "Lillie's Pearl",
    "number": "151",
    "artist": "AYUMI ODASHIMA",
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
      "If the Lillie's Pokémon this card is attached to is Knocked Out by damage from an attack from your opponent's Pokémon, that player takes 1 fewer Prize card.",
      "You may attach any number of Pokémon Tools to your Pokémon during your turn. You may attach only 1 Pokémon Tool to each Pokémon, and it stays attached."
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/151/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/151/high.webp"
    }
  },
  {
    "id": "sv9-152",
    "name": "N's Castle",
    "number": "152",
    "artist": "AYUMI ODASHIMA",
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
      "N's Pokémon in play (both yours and your opponent's) have no Retreat Cost.",
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/152/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/152/high.webp"
    }
  },
  {
    "id": "sv9-153",
    "name": "N's PP Up",
    "number": "153",
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
      "Attach a Basic Energy card from your discard pile to 1 of your Benched N's Pokémon.",
      "You may play any number of Item cards during your turn."
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/153/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/153/high.webp"
    }
  },
  {
    "id": "sv9-154",
    "name": "Postwick",
    "number": "154",
    "artist": "AYUMI ODASHIMA",
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
      "Attacks used by Hop's Pokémon (both yours and your opponent's) do 30 more damage to the opponent's Active Pokémon (before applying Weakness and Resistance).",
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/154/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/154/high.webp"
    }
  },
  {
    "id": "sv9-155",
    "name": "Professor's Research",
    "number": "155",
    "artist": "Taira Akitsu",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Discard your hand and draw 7 cards.",
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
      "small": "https://assets.tcgdex.net/en/sv/sv09/155/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/155/high.webp"
    }
  },
  {
    "id": "sv9-156",
    "name": "Redeemable Ticket",
    "number": "156",
    "artist": "Studio Bora Inc.",
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
      "Count your Prize cards, shuffle them, and put them on the bottom of your deck. Then, take that many cards from the top of your deck and put them face down as your Prize cards.",
      "You may play any number of Item cards during your turn."
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/156/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/156/high.webp"
    }
  },
  {
    "id": "sv9-157",
    "name": "Ruffian",
    "number": "157",
    "artist": "Hideki Ishikawa",
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
      "Discard a Pokémon Tool and a Special Energy from 1 of your opponent's Pokémon.",
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/157/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/157/high.webp"
    }
  },
  {
    "id": "sv9-158",
    "name": "Super Potion",
    "number": "158",
    "artist": "Studio Bora Inc.",
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
      "Heal 60 damage from 1 of your Pokémon. If you healed any damage in this way, discard an Energy from that Pokémon.",
      "You may play any number of Item cards during your turn."
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/158/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/158/high.webp"
    }
  },
  {
    "id": "sv9-159",
    "name": "Spiky Energy",
    "number": "159",
    "artist": null,
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
      "As long as this card is attached to a Pokémon, it provides Colorless Energy.  If the Pokémon this card is attached to is in the Active Spot and is damaged by an attack from your opponent's Pokémon (even if this Pokémon is Knocked Out), put 2 damage counters on the Attacking Pokémon."
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/159/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/159/high.webp"
    }
  },
  {
    "id": "sv9-160",
    "name": "Maractus",
    "number": "160",
    "artist": "Ounishi",
    "rarity": "Illustration Rare",
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
    "abilities": [
      {
        "name": "Exploding Needles",
        "text": "If this Pokémon is in the Active Spot and is Knocked Out by damage from an attack from your opponent's Pokémon, put 6 damage counters on the Attacking Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Corner",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "During your opponent's next turn, the Defending Pokémon can't retreat."
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
      556
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/160/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/160/high.webp"
    }
  },
  {
    "id": "sv9-161",
    "name": "Articuno",
    "number": "161",
    "artist": "Kuroimori",
    "rarity": "Illustration Rare",
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
        "name": "Frigid Fluttering",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic {W} Energy cards and attach them to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Ice Blast",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
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
      144
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/161/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/161/high.webp"
    }
  },
  {
    "id": "sv9-162",
    "name": "Wailord",
    "number": "162",
    "artist": "Katsunori Sato",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "240",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wailmer",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
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
        "damage": "10+",
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
      "Colorless",
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 4,
    "nationalPokedexNumbers": [
      321
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/162/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/162/high.webp"
    }
  },
  {
    "id": "sv9-163",
    "name": "Iono's Kilowattrel",
    "number": "163",
    "artist": "Terada Tera",
    "rarity": "Illustration Rare",
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
      941
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/163/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/163/high.webp"
    }
  },
  {
    "id": "sv9-164",
    "name": "Lillie's Ribombee",
    "number": "164",
    "artist": "saino misaki",
    "rarity": "Illustration Rare",
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
      743
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/164/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/164/high.webp"
    }
  },
  {
    "id": "sv9-165",
    "name": "Swinub",
    "number": "165",
    "artist": "Nakamura Ippan",
    "rarity": "Illustration Rare",
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
      "Piloswine"
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
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Lunge Out",
        "cost": [
          "Fighting"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      220
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/165/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/165/high.webp"
    }
  },
  {
    "id": "sv9-166",
    "name": "Lycanroc",
    "number": "166",
    "artist": "GIDORA",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Rockruff",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Spike-Clad",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may attach up to 2 Spiky Energy cards from your discard pile to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Clamping Fangs",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "This attack does 40 more damage for each damage counter on your opponent's Active Pokémon."
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
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/166/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/166/high.webp"
    }
  },
  {
    "id": "sv9-167",
    "name": "N's Reshiram",
    "number": "167",
    "artist": "Bun Toujo",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "130",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Powerful Rage",
        "cost": [
          "Fire",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage for each damage counter on this Pokémon."
      },
      {
        "name": "Virtuous Flame",
        "cost": [
          "Fire",
          "Fire",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "170",
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
      643
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/167/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/167/high.webp"
    }
  },
  {
    "id": "sv9-168",
    "name": "Furret",
    "number": "168",
    "artist": "REND",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Sentret",
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
        "damage": "40",
        "text": ""
      },
      {
        "name": "Jet Headbutt",
        "cost": [
          "Colorless",
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
        "value": "×2"
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/168/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/168/high.webp"
    }
  },
  {
    "id": "sv9-169",
    "name": "Noibat",
    "number": "169",
    "artist": "sowsow",
    "rarity": "Illustration Rare",
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
      "Noivern"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rapid Draw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Draw a card."
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
      714
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/169/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/169/high.webp"
    }
  },
  {
    "id": "sv9-170",
    "name": "Hop's Wooloo",
    "number": "170",
    "artist": "MINAMINAMI Take",
    "rarity": "Illustration Rare",
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
      "Dubwool"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Smash Kick",
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
      831
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/170/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/170/high.webp"
    }
  },
  {
    "id": "sv9-171",
    "name": "Volcanion ex",
    "number": "171",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "220",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Scalding Steam",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may make your opponent's Active Pokémon Burned.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Scorching Cyclone",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
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
      721
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/171/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/171/high.webp"
    }
  },
  {
    "id": "sv9-172",
    "name": "Iono's Bellibolt ex",
    "number": "172",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Iono's Tadbulb",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
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
      939
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/172/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/172/high.webp"
    }
  },
  {
    "id": "sv9-173",
    "name": "Lillie's Clefairy ex",
    "number": "173",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
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
    "evolvesTo": [
      "Clefable"
    ],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
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
      35
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/173/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/173/high.webp"
    }
  },
  {
    "id": "sv9-174",
    "name": "Mamoswine ex",
    "number": "174",
    "artist": "N-DESIGN Inc.",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "340",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Piloswine",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Mammoth Hauler",
        "text": "Once during your turn, you may search your deck for a Pokémon, reveal it, and put it into your hand. Then, shuffle your deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rumbling March",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "180+",
        "text": "This attack does 40 more damage for each Stage 2 Pokémon on your Bench."
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
      473
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/174/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/174/high.webp"
    }
  },
  {
    "id": "sv9-175",
    "name": "N's Zoroark ex",
    "number": "175",
    "artist": "takuyoa",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "N's Zorua",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Trade",
        "text": "You must discard a card from your hand in order to use this Ability. Once during your turn, you may draw 2 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Night Joker",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your Benched N's Pokémon's attacks and use it as this attack."
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
      571
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/175/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/175/high.webp"
    }
  },
  {
    "id": "sv9-176",
    "name": "Hop's Zacian ex",
    "number": "176",
    "artist": "aky CG Works",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "230",
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
      888
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/176/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/176/high.webp"
    }
  },
  {
    "id": "sv9-177",
    "name": "Salamence ex",
    "number": "177",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "320",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Shelgon",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Wide Blast",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 50 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Dragon Impact",
        "cost": [
          "Fire",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "300",
        "text": "Discard 2 Energy from this Pokémon."
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
      373
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/177/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/177/high.webp"
    }
  },
  {
    "id": "sv9-178",
    "name": "Dudunsparce ex",
    "number": "178",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "270",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Dunsparce",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Tenacious Tail",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "60×",
        "text": "This attack does 60 damage for each of your opponent's Pokémon ex in play."
      },
      {
        "name": "Destructive Drill",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
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
      982
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/178/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/178/high.webp"
    }
  },
  {
    "id": "sv9-179",
    "name": "Brock's Scouting",
    "number": "179",
    "artist": "Teeziro",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Search your deck for up to 2 Basic Pokémon or 1 Evolution Pokémon, reveal them, and put them into your hand. Then, shuffle your deck.",
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/179/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/179/high.webp"
    }
  },
  {
    "id": "sv9-180",
    "name": "Iris's Fighting Spirit",
    "number": "180",
    "artist": "yuu",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can use this card only if you discard another card from your hand.  Draw cards until you have 6 cards in your hand.",
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/180/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/180/high.webp"
    }
  },
  {
    "id": "sv9-181",
    "name": "Ruffian",
    "number": "181",
    "artist": "Hideki Ishikawa",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Discard a Pokémon Tool and a Special Energy from 1 of your opponent's Pokémon.",
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/181/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/181/high.webp"
    }
  },
  {
    "id": "sv9-182",
    "name": "Volcanion ex",
    "number": "182",
    "artist": "akagi",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "220",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Scalding Steam",
        "text": "Once during your turn, if this Pokémon is in the Active Spot, you may make your opponent's Active Pokémon Burned.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Scorching Cyclone",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
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
      721
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/182/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/182/high.webp"
    }
  },
  {
    "id": "sv9-183",
    "name": "Iono's Bellibolt ex",
    "number": "183",
    "artist": "Yuu Nishida",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Iono's Tadbulb",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
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
      939
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/183/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/183/high.webp"
    }
  },
  {
    "id": "sv9-184",
    "name": "Lillie's Clefairy ex",
    "number": "184",
    "artist": "Susumu Maeya",
    "rarity": "Special Illustration Rare",
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
    "evolvesTo": [
      "Clefable"
    ],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
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
      35
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/184/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/184/high.webp"
    }
  },
  {
    "id": "sv9-185",
    "name": "N's Zoroark ex",
    "number": "185",
    "artist": "Megumi Mizutani",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "N's Zorua",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Trade",
        "text": "You must discard a card from your hand in order to use this Ability. Once during your turn, you may draw 2 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Night Joker",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your Benched N's Pokémon's attacks and use it as this attack."
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
      571
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/185/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/185/high.webp"
    }
  },
  {
    "id": "sv9-186",
    "name": "Hop's Zacian ex",
    "number": "186",
    "artist": "DOM",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "230",
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
      888
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/186/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/186/high.webp"
    }
  },
  {
    "id": "sv9-187",
    "name": "Salamence ex",
    "number": "187",
    "artist": "Tsuyoshi Nagano",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "320",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Shelgon",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Wide Blast",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 50 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Dragon Impact",
        "cost": [
          "Fire",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "300",
        "text": "Discard 2 Energy from this Pokémon."
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
      373
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/187/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/187/high.webp"
    }
  },
  {
    "id": "sv9-188",
    "name": "Iono's Bellibolt ex",
    "number": "188",
    "artist": "5ban Graphics",
    "rarity": "Hyper Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Iono's Tadbulb",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
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
      939
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/188/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/188/high.webp"
    }
  },
  {
    "id": "sv9-189",
    "name": "N's Zoroark ex",
    "number": "189",
    "artist": "takuyoa",
    "rarity": "Hyper Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "N's Zorua",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Trade",
        "text": "You must discard a card from your hand in order to use this Ability. Once during your turn, you may draw 2 cards.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Night Joker",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your Benched N's Pokémon's attacks and use it as this attack."
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
      571
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/189/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/189/high.webp"
    }
  },
  {
    "id": "sv9-190",
    "name": "Spiky Energy",
    "number": "190",
    "artist": null,
    "rarity": "Hyper Rare",
    "supertype": "Energy",
    "subtypes": [
      "Special"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "As long as this card is attached to a Pokémon, it provides Colorless Energy.  If the Pokémon this card is attached to is in the Active Spot and is damaged by an attack from your opponent's Pokémon (even if this Pokémon is Knocked Out), put 2 damage counters on the Attacking Pokémon."
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
    "regulationMark": "I",
    "images": {
      "small": "https://assets.tcgdex.net/en/sv/sv09/190/low.webp",
      "large": "https://assets.tcgdex.net/en/sv/sv09/190/high.webp"
    }
  }
]

export default cardDetails
