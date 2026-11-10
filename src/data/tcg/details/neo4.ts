import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "neo4-1",
    "name": "Dark Ampharos",
    "number": "1",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "70",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Flaaffy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Conductivity",
        "text": "Whenever your opponent attaches an Energy card to a Pokémon from his or her hand, this Power does 10 damage to that Pokémon. (Don't apply Weakness and Resistance) This power stops working if you have more than 1 Dark Ampharos in play or while Dark Ampharos is Asleep, Confused or Paralysed.",
        "type": "Pokemon Power"
      }
    ],
    "attacks": [
      {
        "name": "Shock Bolt",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Discard all Energy cards attached to this Pokémon in order to use this attack."
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
    "flavorText": "Its brightly lit tail can be seen for miles in the dark, even by ships on the sea.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/1/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/1/high.webp"
    }
  },
  {
    "id": "neo4-2",
    "name": "Dark Crobat",
    "number": "2",
    "artist": "Shin-ichi Yoshikawa, CR CG gangs",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "70",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Dark Golbat",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Surprise Bite",
        "text": "When you play Dark Crobat from your hand, you may choose 1 of your opponent's Pokémon. This power does 20 damage do that Pokémon. (Don't apply Weakness and Resistance.)",
        "type": "Pokemon Power"
      }
    ],
    "attacks": [
      {
        "name": "Dark Drain",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip a coin for each of your opponent's Pokémon. For each heads, this attack does 10 damage to that Pokémon. Don't apply Weakness and Resistance. Remove a number of damage counters from Dark Crobat equal to the damage dealt. If Dark Crobat has fewer damage counters than that, remove all of them."
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
    "flavorText": "Although the wings it has evolved on its feet allow it to fly at high speeds, they unfortunately make it difficult to perch.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/2/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/2/high.webp"
    }
  },
  {
    "id": "neo4-3",
    "name": "Dark Donphan",
    "number": "3",
    "artist": "Shin-ichi Yoshida",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Phanpy",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tusk Toss",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "If your opponent has any Benched Pokémon, flip a coin. If heads, return the Defending Pokémon and all cards attached to it to your opponent's hand. If tails, your opponent chooses 1 of his or her Benched Pokémon and switches it with the Defending Pokémon."
      },
      {
        "name": "Giant Tusk",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
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
      232
    ],
    "flavorText": "The larger its tusks, the higher its status in the herd.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/3/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/3/high.webp"
    }
  },
  {
    "id": "neo4-4",
    "name": "Dark Espeon",
    "number": "4",
    "artist": "Atsuko Nishida",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gouge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 10 more damage; if tails, this attack does 10 damage."
      },
      {
        "name": "Psysplash",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Does 10 damage to each of your opponent's Pokémon for each Energy card attached to that Pokémon. Don't apply Weakness and Resistance."
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
      196
    ],
    "flavorText": "The tips of its split tail quiver whenever it uses its psychic abilities to read its opponent's next move.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/4/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/4/high.webp"
    }
  },
  {
    "id": "neo4-5",
    "name": "Dark Feraligatr",
    "number": "5",
    "artist": "Atsuko Nishida",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Croconaw",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Scare",
        "text": "As long as Dark Feraligatr is your Active Pokémon, all of your opponent's Baby Pokémon Powers stop working and your opponent's Baby Pokémon can't attack. This power stops working while Dark Feraligatr is Asleep, Confused, or Paralyzed.",
        "type": "Pokemon Power"
      }
    ],
    "attacks": [
      {
        "name": "Crushing Blow",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "If the Defending Pokémon has any Energy cards attached to it, flip a coin. If heads, choose 1 of those cards and discard it."
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
    "flavorText": "Its powerful muscles allow it to move at a speed that belies its bulk.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/5/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/5/high.webp"
    }
  },
  {
    "id": "neo4-6",
    "name": "Dark Gengar",
    "number": "6",
    "artist": "Aya Kusube",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "70",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Haunter",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Deep Sleep",
        "text": "As long as any Dark Gengar are in play, a player flips 2 coins for each of his or her Pokémon that is Asleep at the end of each turn. If either of them is tails, that Pokémon is still Asleep. This power stops working if Dark Gengar is Asleep, Confused, or Paralyzed.",
        "type": "Pokemon Power"
      }
    ],
    "attacks": [
      {
        "name": "Pull In",
        "cost": [
          "Psychic",
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "If your opponent has any Benched Pokémon, you may choose 1 of them and switch it with the Defending Pokémon (before doing damage or other effects of this attack). Either way, the Defending Pokémon is now Asleep."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      94
    ],
    "flavorText": "It absorbs the heat in the air around it. If you suddenly feel cold, it's because a Gengar has appeared.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/6/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/6/high.webp"
    }
  },
  {
    "id": "neo4-7",
    "name": "Dark Houndoom",
    "number": "7",
    "artist": "Kagemaru Himeno",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Houndour",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Eerie Howl",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If your opponent's Bench isn't full, look at his or her hand. If your opponent has any Baby Pokémon or Basic Pokémon there, choose 1 of them and put it on his or her Bench. Then, switch it with the Defending Pokémon."
      },
      {
        "name": "Dark Fire",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If there are any Energy cards attached to Dark Houndoom, discard 1 of them and this attack does 30 damage plus 20 more damage (plus 10 more damage for the Energy you discarded). If there aren't any, this attack does 30 damage."
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
      229
    ],
    "flavorText": "The flame it breathes is actually a volatile poison it produces internally that ignites when exposed to air.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/7/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/7/high.webp"
    }
  },
  {
    "id": "neo4-8",
    "name": "Dark Porygon2",
    "number": "8",
    "artist": "Shin-ichi Yoshikawa, CR CG gangs",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
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
        "name": "Spatial Distortion",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, choose a Stadium card from your discard pile and put it into play. (If there's already a Stadium card in play, discard it.) This power can't be used if Dark Porygon2 is Asleep, Confused, or Paralyzed.",
        "type": "Pokemon Power"
      }
    ],
    "attacks": [
      {
        "name": "Curve Attack",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20",
        "text": "Flip a coin. If heads, prevent all damage done by attacks to Dark Porygon2 during your opponent's next turn. (Any other effects of attacks still happen.)"
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
    "flavorText": "Advances in technology have allowed it to evolve. It occasionally displays behavior not found in its programming.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/8/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/8/high.webp"
    }
  },
  {
    "id": "neo4-9",
    "name": "Dark Scizor",
    "number": "9",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Scyther",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Threaten",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip a coin. If heads, look at your opponent's hand. If he or she has any Trainer cards there, choose 1 of them. Your opponent shuffles that card into his or her deck."
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
      212
    ],
    "flavorText": "Nothing can withstand the pressure of the vise-like grip of this Pokémon's steel claws.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/9/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/9/high.webp"
    }
  },
  {
    "id": "neo4-10",
    "name": "Dark Typhlosion",
    "number": "10",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Quilava",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Claw Swipe",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Rushing Flames",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "40x",
        "text": "You may discard any number of Energy cards attached to your Pokémon. Flip a coin for each Energy card discarded in this way. This attack does 40 damage times the number of heads."
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
      157
    ],
    "flavorText": "When it's in combat, the air around it shimmers and warps from the intense heat it produces.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/10/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/10/high.webp"
    }
  },
  {
    "id": "neo4-11",
    "name": "Dark Tyranitar",
    "number": "11",
    "artist": "Shin-ichi Yoshida",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "90",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Pupitar",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mountain Smasher",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20x",
        "text": "Flip a number of coins equal to the number of Energy cards attached to Dark Tyranitar. This attack does 20 damage times the number of heads. Then, for each heads, discard the top card from your opponent's deck."
      },
      {
        "name": "Fling Away",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "50",
        "text": "If your opponent has any Benched Pokémon, this attack does 30 damage instead of 50 and choose 1 of those Benched Pokémon. This attack does 30 damage to that Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      248
    ],
    "flavorText": "Its power is such that not even mountains can stand in its way.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/11/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/11/high.webp"
    }
  },
  {
    "id": "neo4-12",
    "name": "Light Arcanine",
    "number": "12",
    "artist": "Atsuko Nishida",
    "rarity": "Rare Holo",
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
        "name": "Drive Off",
        "text": "As long as Light Arcanine is your Active Pokémon, once during your turn (before your attack), if your opponent has any Benched Pokémon, he or she chooses 1 of them and switches it with the Defending Pokémon. This power can't be used while Light Arcanine is Asleep, Confused, or Paralyzed.",
        "type": "Pokemon Power"
      }
    ],
    "attacks": [
      {
        "name": "Gentle Flames",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "If the Defending Pokémon is a Baby Pokémon, this attack does 10 damage instead of 50. If the Defending Pokémon is a Basic Pokémon, this attack does 30 damage instead of 50."
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
      59
    ],
    "flavorText": "This legendary Chinese Pokémon is easily recognized by its large flowing mane.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/12/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/12/high.webp"
    }
  },
  {
    "id": "neo4-13",
    "name": "Light Azumarill",
    "number": "13",
    "artist": "Yuka Morii",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Marill",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bubble",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Bubble Jump",
        "cost": [
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "If you have any Benched Pokémon, flip a coin. If heads, take 2 Energy cards attached to Light Azumarill and attach them to 1 of your Benched Pokémon. Then return Light Azumarill and all cards attached to it to your hand."
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
      184
    ],
    "flavorText": "It curls up its long ears when swimming to prevent water from entering them.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/13/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/13/high.webp"
    }
  },
  {
    "id": "neo4-14",
    "name": "Light Dragonite",
    "number": "14",
    "artist": "Atsuko Nishida",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Dragonair",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Miraculous Wind",
        "text": "As long as Light Dragonite is your Active Pokémon, each Special Energy card provides Colorless Energy instead of its usual type and its other effects stop working. This power stops working while Light Dragonite is Asleep, Confused, or Paralyzed.",
        "type": "Pokemon Power"
      }
    ],
    "attacks": [
      {
        "name": "Light Wave",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "During your opponent's next turn, prevent all effects of attacks that are not damage done to this Pokémon."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      149
    ],
    "flavorText": "It is said to fly constantly over the sea, looking for people in need of aid.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/14/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/14/high.webp"
    }
  },
  {
    "id": "neo4-15",
    "name": "Light Togetic",
    "number": "15",
    "artist": "Naoyo Kimura",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Togepi",
    "evolvesTo": [
      "Togekiss"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Gift",
        "text": "When you play Light Togetic from your hand, your opponent may search his or her deck for a Pokémon Tool card, show that card to you, and put it into his or her hand. Either way, you may do the same, and then each player who searched shuffles his or her deck.",
        "type": "Pokemon Power"
      }
    ],
    "attacks": [
      {
        "name": "Sweet Kiss",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Your opponent may draw a card."
      }
    ],
    "weaknesses": [],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      176
    ],
    "flavorText": "It becomes depressed if it is not near kind-hearted people. Is is able to float in the air without moving its wings.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/15/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/15/high.webp"
    }
  },
  {
    "id": "neo4-16",
    "name": "Miracle Energy",
    "number": "16",
    "artist": "Milky Isobe",
    "rarity": "Rare Holo",
    "supertype": "Energy",
    "subtypes": [
      "Special"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can't have more than 1 Miracle Energy in your deck. Attach Miracle Energy to 1 of your Shining or Light Pokémon. At the end of your turn, discard Miracle Energy.\nWhile in play, Miracle Energy counts as every type of Energy but provides only 2 Energy at a time."
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
      "small": "https://assets.tcgdex.net/en/neo/neo4/16/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/16/high.webp"
    }
  },
  {
    "id": "neo4-17",
    "name": "Dark Ariados",
    "number": "17",
    "artist": "Toshinao Aoki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Spinarak",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Entangle",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If your opponent has any Benched Pokémon, choose 1 of them and switch it with the Defending Pokémon, then flip a coin. If heads, the new Defending Pokémon is now Paralyzed."
      },
      {
        "name": "Poison Bind",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "The Defending Pokémon is now Poisoned. Flip a coin. If heads, the Defending Pokémon can't retreat until the end of your opponent's next turn and if the effect of an attack, Pokémon Power, or Trainer card would change that player's Active Pokémon, that part of the effect does nothing."
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
      168
    ],
    "flavorText": "Wherever it goes, it spins a thread that always leads back to its web.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/17/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/17/high.webp"
    }
  },
  {
    "id": "neo4-18",
    "name": "Dark Magcargo",
    "number": "18",
    "artist": "Toshinao Aoki",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Slugma",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Hot Plate",
        "text": "As long as Dark Magcargo is your Active Pokémon, whenever a player puts a Baby Pokémon or Basic Pokémon onto his or her Bench from his or her hand, this power does 10 damage to that Pokémon. (Don't apply Weakness and Resistance.) This power stops working if Dark Magcargo is Asleep, Confused, or Paralyzed.",
        "type": "Pokemon Power"
      }
    ],
    "attacks": [
      {
        "name": "Ball of Flame",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "You may discard a Energy card attached to Dark Magcargo when you use this attack. If you do and if your opponent has any Benched Pokémon, choose 1 of them and this attack does 20 damage to it. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": "The shell on its back comes off easily, exposing the flames running through its body.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/18/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/18/high.webp"
    }
  },
  {
    "id": "neo4-19",
    "name": "Dark Omastar",
    "number": "19",
    "artist": "Tomokazu Komiya",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "70",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Omanyte",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Prehistoric Water",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If your opponent has any evolved Pokémon in play, choose 1 of them and flip a coin. If heads, your opponent takes the highest Stage Evolution card on that Pokémon and shuffles it into his or her deck."
      },
      {
        "name": "Dark Tentacle",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "During your opponent's next turn, the Defending Pokémon can't evolve except from effects of attacks or Pokémon Powers. (Benching that Pokémon ends this effect.)"
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
      139
    ],
    "flavorText": "Nothing can escape once wrapped in its tentacles, which it uses for self-defense as well as to catch food.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/19/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/19/high.webp"
    }
  },
  {
    "id": "neo4-20",
    "name": "Dark Slowking",
    "number": "20",
    "artist": "Tomokazu Komiya",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Slowpoke",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Cunning",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, look at the top card of your opponent's deck. Then, you may have your opponent shuffle his or her deck. This power can't be used if Dark Slowking is Asleep, Confused, or Paralyzed.",
        "type": "Pokemon Power"
      }
    ],
    "attacks": [
      {
        "name": "Mind Shock",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Don't apply Weakness or Resistance for this attack."
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
      199
    ],
    "flavorText": "Each time it yawns, the Shellder on its head releases an enzyme that makes it grow even smarter.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/20/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/20/high.webp"
    }
  },
  {
    "id": "neo4-21",
    "name": "Dark Ursaring",
    "number": "21",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Teddiursa",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Provoke",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at your opponent's hand. If he or she has any Baby Pokémon and/or Basic Pokémon there, you may put any number of them onto your opponent's Bench (as long as there's room). Then, your opponent looks at your hand. If you have any Baby Pokémon and/or Basic Pokémon there, your opponent may put any number of them onto your Bench (as long as there's room)."
      },
      {
        "name": "Battle Frenzy",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "For each Pokémon in play (yours and your opponent's), flip a coin. For each heads, this attack does 20 damage to that Pokémon. Don't apply Weakness and Resistance for this attack."
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
      217
    ],
    "flavorText": "Its keen nose can pick out any scent, even that of food buried deep underground.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/21/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/21/high.webp"
    }
  },
  {
    "id": "neo4-22",
    "name": "Light Dragonair",
    "number": "22",
    "artist": "Atsuko Nishida",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Dratini",
    "evolvesTo": [
      "Dragonite"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Healing Light",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Remove 1 damage counter from each of your Pokémon that has any damage counters on it."
      },
      {
        "name": "Protective Wave",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all effects of attacks, including damage, done to Light Dragonair."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      148
    ],
    "flavorText": "The aura it projects from its body has an effect on the surrounding climate and weather.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/22/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/22/high.webp"
    }
  },
  {
    "id": "neo4-23",
    "name": "Light Lanturn",
    "number": "23",
    "artist": "Miki Tanaka",
    "rarity": "Rare",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Searchlight",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip a coin. If heads, each player may choose a card from his or her discard pile and put it into his or her hand."
      },
      {
        "name": "Spark",
        "cost": [
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      171
    ],
    "flavorText": "This Pokémon has evolved its dorsal fin to emit light, which attracts the fish it feeds on.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/23/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/23/high.webp"
    }
  },
  {
    "id": "neo4-24",
    "name": "Light Ledian",
    "number": "24",
    "artist": "Tomokazu Komiya",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Ledyba",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flash Touch",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If you have any Benched Pokémon, switch 1 of them with Light Ledian. As long as that Pokémon is your Active Pokémon, it can't become Asleep, Confused, Paralyzed, or Poisoned. (All other effects of attacks, Pokémon Powers, and Trainer cards still happen.)"
      },
      {
        "name": "Comet Punch",
        "cost": [
          "Grass",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20x",
        "text": "Flip 4 coins. This attack does 20 damage times the number of heads."
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
      166
    ],
    "flavorText": "The number of spots on its back increase or decrease depending on the number of stars visible in the night sky.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/24/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/24/high.webp"
    }
  },
  {
    "id": "neo4-25",
    "name": "Light Machamp",
    "number": "25",
    "artist": "Miki Tanaka",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "100",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Machoke",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Tag Team",
        "text": "When you play Light Machamp from your hand, if is on your Bench, remove 3 damage counters than that, remove all of them. Then, switch Light Machamp with your Active Pokémon.",
        "type": "Pokemon Power"
      }
    ],
    "attacks": [
      {
        "name": "Beatdown",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "If the Defending Pokémon has Dark in its name or is a Pokémon, flip a coin. If heads, this attack does 100 damage instead of 50."
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
      68
    ],
    "flavorText": "It uses its four arms in combat to unleash a ceaseless flurry of punches.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/25/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/25/high.webp"
    }
  },
  {
    "id": "neo4-26",
    "name": "Light Piloswine",
    "number": "26",
    "artist": "Yukiko Baba",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Swinub",
    "evolvesTo": [
      "Mamoswine"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "",
        "text": "",
        "type": "Pokemon Power"
      }
    ],
    "attacks": [
      {
        "name": "Knock Over",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "If there is a Stadium card in play, you may discard it."
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
    "flavorText": "Its legs are short, but its hooves are wide and flat, allowing it to easily walk over snow.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/26/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/26/high.webp"
    }
  },
  {
    "id": "neo4-27",
    "name": "Unown [G]",
    "number": "27",
    "artist": "CR CG gangs",
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
    "rules": [
      "You may have up to 4 Basic Pokémon cards in your deck with Unown in their names."
    ],
    "abilities": [
      {
        "name": "[Give]",
        "text": "Once during your turn (before your attack), if you have Unown G, Unown I, Unown V, and Unown E on your Bench, you may flip a coin. If heads, search your deck for a basic Energy card and attach it to 1 of your Pokémon. Shuffle your deck afterward.",
        "type": "Pokemon Power"
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
    "flavorText": "It is believed that the variety of types of this Pokémon were created by evolutionary adaptation, as each possesses a different ability.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/27/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/27/high.webp"
    }
  },
  {
    "id": "neo4-28",
    "name": "Unown [H]",
    "number": "28",
    "artist": "CR CG gangs",
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
    "rules": [
      "You may have up to 4 Basic Pokémon cards in your deck with Unown in their names."
    ],
    "abilities": [
      {
        "name": "[Help]",
        "text": "Once during your turn (before your attack), if you have Unown H, Unown E, Unown L, and Unown P on your Bench, you may shuffle your hand into your deck, then draw a new hand of the same number of cards.",
        "type": "Pokemon Power"
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
    "flavorText": "It is believed that the variety of types of this Pokémon were created by evolutionary adaptation, as each possesses a different ability.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/28/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/28/high.webp"
    }
  },
  {
    "id": "neo4-29",
    "name": "Unown [W]",
    "number": "29",
    "artist": "CR CG gangs",
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
    "rules": [
      "You may have up to 4 Basic Pokémon cards in your deck with Unown in their names."
    ],
    "abilities": [
      {
        "name": "[Want]",
        "text": "Once during your turn (before your attack), if you have Unown W, Unown A, Unown N, and Unown T on your Bench, you may flip a coin. If heads, put a Trainer card from your discard pile into your hand.",
        "type": "Pokemon Power"
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
    "flavorText": "It is believed that the variety of types of this Pokémon were created by evolutionary adaptation, as each possesses a different ability.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/29/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/29/high.webp"
    }
  },
  {
    "id": "neo4-30",
    "name": "Unown [X]",
    "number": "30",
    "artist": "CR CG gangs",
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
    "rules": [
      "You may have up to 4 Basic Pokémon cards in your deck with Unown in their names."
    ],
    "abilities": [
      {
        "name": "[XXXXX]",
        "text": "Whenever 1 of your Pokémon with Unown in its name uses its Hidden Power attack, flip a coin until you get tails. That attack does 10 more damage for each heads. If you have more than 1 Unown X in play, use only 1 [XXXXX] per turn.",
        "type": "Pokemon Power"
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
    "flavorText": "It is believed that the variety of types of this Pokémon were created by evolutionary adaptation, as each possesses a different ability.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/30/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/30/high.webp"
    }
  },
  {
    "id": "neo4-31",
    "name": "Chansey",
    "number": "31",
    "artist": "Yuka Morii",
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
      "Blissey"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Slap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20x",
        "text": "Flip 2 coins. This attack does 20 damage times the number of heads."
      },
      {
        "name": "Egg Toss",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
        "text": "Flip 2 coins. If either of them is tails, this attack does nothing."
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
      113
    ],
    "flavorText": "It holds its egg carefully when moving so as not to break it. Still, it is fast enough to disappear in the blink of an eye.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/31/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/31/high.webp"
    }
  },
  {
    "id": "neo4-32",
    "name": "Dark Croconaw",
    "number": "32",
    "artist": "Shin-ichi Yoshida",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Totodile",
    "evolvesTo": [
      "Feraligatr"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Clamping Jaw",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn. If the Defending Pokémon tries to attack during your opponent's next turn, your opponent flips a coin. If tails, that attack does nothing. (Benching either Pokémon ends this effect.)"
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
      159
    ],
    "flavorText": "It has 49 teeth in its mouth that are constantly replacing themselves. Pull one out, and a new one grows in.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/32/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/32/high.webp"
    }
  },
  {
    "id": "neo4-33",
    "name": "Dark Exeggutor",
    "number": "33",
    "artist": "Toshinao Aoki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Exeggcute",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Triple Headbutt",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10x",
        "text": "Flip 3 coins. This attack does 10 damage times the number of heads."
      },
      {
        "name": "MAX Burst",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20x",
        "text": "Flip a number of coins equal to the number of Energy cards attached to your opponent's Pokémon. This attack does 20 damage times the number of heads."
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
      103
    ],
    "flavorText": "If one of its heads falls off, it turns into an Exeggcute, which begins to look for other Exeggcutes using a special form of telepathy.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/33/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/33/high.webp"
    }
  },
  {
    "id": "neo4-34",
    "name": "Dark Flaaffy",
    "number": "34",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
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
        "name": "High Voltage",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, your opponent can't play Trainer cards during his or her next turn."
      },
      {
        "name": "Stun Wave",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "If the Defending Pokémon has a Pokémon Power, that power stops working until the end of your next turn."
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
    "flavorText": "As a result of storing massive amounts of electricity there, it can no longer grow wool on certain areas of its body.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/34/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/34/high.webp"
    }
  },
  {
    "id": "neo4-35",
    "name": "Dark Forretress",
    "number": "35",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Pineco",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Armor Up",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Until the end of your next turn, if Dark Forretress would be Knocked Out by damage from an attack, flip a coin. If heads, Dark Forretress is not Knocked Out and its remaining HP become 10 instead."
      },
      {
        "name": "Explosion",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Dark Forretress does 60 damage to itself."
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
      205
    ],
    "flavorText": "It stays motionless in trees, driving away with flying armored shards from its hard shell any who come close.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/35/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/35/high.webp"
    }
  },
  {
    "id": "neo4-36",
    "name": "Dark Haunter",
    "number": "36",
    "artist": "Aya Kusube",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "50",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Gastly",
    "evolvesTo": [
      "Gengar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Call Back",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Put a Baby Pokémon or Basic Pokémon card from your opponent's discard pile onto his or her Bench. Put 1 damage counter on that Pokémon. (You can't use this attack if your Bench is full.)"
      },
      {
        "name": "Surround",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Asleep. If tails, the Defending Pokémon can't retreat during your opponent's next turn."
      }
    ],
    "weaknesses": [],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      93
    ],
    "flavorText": "It silently hunts its prey in dark rooms.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/36/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/36/high.webp"
    }
  },
  {
    "id": "neo4-37",
    "name": "Dark Omanyte",
    "number": "37",
    "artist": "Tomokazu Komiya",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "40",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Mysterious Fossil",
    "evolvesTo": [
      "Omastar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Water Cannon",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Choose 1 of your opponent's Pokémon. This attack does 10 damage for each Energy card attached to Dark Omanyte. Don't apply Weakness and Resistance. You can't do more than 30 damage in this way."
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
      138
    ],
    "flavorText": "This ancient Pokémon possessed 10 tentacles, which it used to swim through the ocean.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/37/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/37/high.webp"
    }
  },
  {
    "id": "neo4-38",
    "name": "Dark Pupitar",
    "number": "38",
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
    "evolvesFrom": "Larvitar",
    "evolvesTo": [
      "Tyranitar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rock Tackle",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Dark Pupitar does 10 damage to itself. Dark Pupitar can't use this attack during your next turn."
      },
      {
        "name": "Explosive Evolution",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Flip a coin. If heads, this attack does 10 damage to each of your opponent's Pokémon. Don't apply Weakness and Resistance. Then, search your deck for an Evolution card named Dark Tyranitar and put it on Dark Pupitar. (This counts as evolving Dark Pupitar.) Shuffle your deck afterward."
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
      247
    ],
    "flavorText": "It is encased within a hard shell, yet retains a great deal of mobility—a dangerous combination.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/38/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/38/high.webp"
    }
  },
  {
    "id": "neo4-39",
    "name": "Dark Quilava",
    "number": "39",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Cyndaquil",
    "evolvesTo": [
      "Typhlosion"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Incinerate",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Show the top card of your opponent's deck to all players. If it's a Trainer card, discard it."
      },
      {
        "name": "Rushing Magma",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "20x",
        "text": "Discard the top 5 cards of your deck. (If there are fewer than 5 cards in your deck, discard all of them.) This attack does 20 damage for each Energy card you discarded in this way."
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
      156
    ],
    "flavorText": "If it turns its back to an opponent, it is a sign that it is getting ready to attack.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/39/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/39/high.webp"
    }
  },
  {
    "id": "neo4-40",
    "name": "Dark Wigglytuff",
    "number": "40",
    "artist": "Miki Tanaka",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Jigglypuff",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dark Song",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Asleep. If tails, the Defending Pokémon is now Confused."
      },
      {
        "name": "Slap Awake",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20+",
        "text": "If the Defending Pokémon is Asleep or Confused, this attack does 20 damage plus 20 more damage. Then, the Defending Pokémon is no longer Asleep or Confused."
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
    "flavorText": "This Pokémon has soft, fine hair. When angered, it increases in size and has been known to charge those it considers a threat.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/40/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/40/high.webp"
    }
  },
  {
    "id": "neo4-41",
    "name": "Heracross",
    "number": "41",
    "artist": "K. Hoshiba, CR CG gangs",
    "rarity": "Uncommon",
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
        "name": "Tackle",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Charging Horn",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 30 damage plus 30 more damage. If tails, this attack does 30 damage."
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
      214
    ],
    "flavorText": "It is normally peaceful, but will attack any who get between it and honey, its favorite food.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/41/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/41/high.webp"
    }
  },
  {
    "id": "neo4-42",
    "name": "Hitmonlee",
    "number": "42",
    "artist": "Yukiko Baba",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "One-Two Kick",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "20x",
        "text": "Flip 2 coins. This attack does 20 damage times the number of heads."
      },
      {
        "name": "Heel Drop",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      106
    ],
    "flavorText": "It has a perfect sense of balance and can lash out with powerful kicks from any position.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/42/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/42/high.webp"
    }
  },
  {
    "id": "neo4-43",
    "name": "Houndour",
    "number": "43",
    "artist": "Yukiko Baba",
    "rarity": "Uncommon",
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
      "Houndoom"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Corner",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      },
      {
        "name": "Lunge",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If tails, this attack does nothing."
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
      228
    ],
    "flavorText": "When night falls, the air fills with the eerie cries of this Pokémon as it stakes out its territory.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/43/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/43/high.webp"
    }
  },
  {
    "id": "neo4-44",
    "name": "Jigglypuff",
    "number": "44",
    "artist": "Yuka Morii",
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
      "Wigglytuff"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Expand",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "All damage done to Jigglypuff during your opponent's next turn is reduced by 10 (after applying Weakness and Resistance)."
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
    "flavorText": "If puffs its body up like a balloon and sings a lullaby that makes all who hear it fall into a deep sleep.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/44/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/44/high.webp"
    }
  },
  {
    "id": "neo4-45",
    "name": "Light Dewgong",
    "number": "45",
    "artist": "Masako Yamashita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Seel",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Freezing Breath",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed. If tails, the Defending Pokémon is now Asleep."
      },
      {
        "name": "Ice Pillar",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "Until the end of your opponent's next turn, as long as Light Dewgong is your Active Pokémon, prevent all damage done by attacks to your Benched Pokémon. (Any other effects of attacks still happen.)"
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
      87
    ],
    "flavorText": "It has an aerodynamic shape that allows it to swim at great speeds. The colder the water gets, the more active it becomes.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/45/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/45/high.webp"
    }
  },
  {
    "id": "neo4-46",
    "name": "Light Flareon",
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
    "evolvesFrom": "Eevee",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Warm Up",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If you have any benched Pokémon, search your deck for a Energy card and attach it to 1 of them. Then shuffle your deck."
      },
      {
        "name": "Burning Flame",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Flip 2 coins. For each heads, discard a Energy card attached to Light Flareon or this attack does nothing. This attack does 30 damage plus 20 damage for each heads."
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
    "flavorText": "It creates its flames by swallowing air into a special pouch within its body, then heating it to over 3000 degrees.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/46/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/46/high.webp"
    }
  },
  {
    "id": "neo4-47",
    "name": "Light Golduck",
    "number": "47",
    "artist": "Atsuko Nishida",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Psyduck",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flipper Stroke",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent looks at the top 3 cards of his or her deck. If any of them are basic Energy cards, he or she may show any number of them to you and put them into his or her hand. You do the same. Either way, each player shuffles his or her deck."
      },
      {
        "name": "Core Blast",
        "cost": [
          "Psychic",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "This attack does 30 damage plus 20 more damage for each Special Energy card attached to the Defending Pokémon."
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
      55
    ],
    "flavorText": "The faster it swims, the brighter the glow on its forehead becomes.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/47/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/47/high.webp"
    }
  },
  {
    "id": "neo4-48",
    "name": "Light Jolteon",
    "number": "48",
    "artist": "Naoyo Kimura",
    "rarity": "Uncommon",
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
        "name": "Pulse Guard",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, whenever 30 or more damage is done to Light Jolteon (after applying Weakness and Resistance), prevent that damage. (Any other effects of attacks still happen.)"
      },
      {
        "name": "Thunder Needle",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20x",
        "text": "Flip 3 coins. This attack does 20 damage times the number of heads. If you get 2 or more heads, the Defending Pokémon is now Paralyzed."
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
      135
    ],
    "flavorText": "It can collect the ambient electrical energy in its cells and expel it in massive bursts.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/48/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/48/high.webp"
    }
  },
  {
    "id": "neo4-49",
    "name": "Light Machoke",
    "number": "49",
    "artist": "Miki Tanaka",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Machop",
    "evolvesTo": [
      "Machamp"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Return Home",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If you have any Benched Pokémon, shuffle 1 of them and all cards attached to it into your deck."
      },
      {
        "name": "Gentle Kick",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "If the Defending Pokémon has no damage counters on it, this attack does 40 damage. If it has any, this attack does 20 damage."
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
      67
    ],
    "flavorText": "This Pokémon never gets tired, no matter what it does or how hard it works.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/49/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/49/high.webp"
    }
  },
  {
    "id": "neo4-50",
    "name": "Light Ninetales",
    "number": "50",
    "artist": "Masako Yamashita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Vulpix",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Guiding Flame",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Put a Baby Pokémon or a Basic Pokémon card from your discard pile onto your Bench. (You can't use this attack if your Bench is full.)"
      },
      {
        "name": "Fire Blast",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "50",
        "text": "Discard a Energy card attached to Light Ninetales in order to use this attack."
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
      38
    ],
    "flavorText": "It is said that each of its nine tails contains a different magical power.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/50/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/50/high.webp"
    }
  },
  {
    "id": "neo4-51",
    "name": "Light Slowbro",
    "number": "51",
    "artist": "Tomokazu Komiya",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Slowpoke",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fish Out",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent may choose up to 3 Baby Pokémon, Basic Pokémon, and/or Evolution cards from his or her discard pile and shuffle them into his or her deck. Either way, you may do the same."
      },
      {
        "name": "Slash About",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "If there are more Energy cards attached to the Defending Pokémon than to Light Slowbro, this attack does 20 damage plus 20 more damage. If not, this attack does 20 damage."
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
      80
    ],
    "flavorText": "If the Shellder attached to its tail becomes separated, this Pokémon reverts to a normal Slowpoke.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/51/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/51/high.webp"
    }
  },
  {
    "id": "neo4-52",
    "name": "Light Vaporeon",
    "number": "52",
    "artist": "Kagemaru Himeno",
    "rarity": "Uncommon",
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
        "name": "Wash Away",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If you have any Benched Pokémon, flip a coin. If heads, remove all damage counters from 1 of your Benched Pokémon and discard all Energy cards attached to it."
      },
      {
        "name": "Hypno Shower",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "The Defending Pokémon is now Asleep. Remove 1 damage counter from each Benched Pokémon (yours and your opponent's) with any damage counters on it."
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
    "flavorText": "If its fins being to vibrate, it is a sign that it will begin raining soon.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/52/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/52/high.webp"
    }
  },
  {
    "id": "neo4-53",
    "name": "Light Venomoth",
    "number": "53",
    "artist": "Masako Yamashita",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Mysterious Wing",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent may choose a Baby Pokémon, Basic Pokémon, or Evolution card from his or her discard pile and put it into his or her hand. Either way, you may do the same."
      },
      {
        "name": "Synchronize",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "If Light Venomoth and the Defending Pokémon have a different number of Energy cards attached to them, this attack does nothing."
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
    "flavorText": "It defends itself by flapping its wings at high speed, spreading poisonous powder throughout the air.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/53/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/53/high.webp"
    }
  },
  {
    "id": "neo4-54",
    "name": "Light Wigglytuff",
    "number": "54",
    "artist": "Naoyo Kimura",
    "rarity": "Uncommon",
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
        "name": "Evolution Song",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent may choose 1 of his or her Pokémon and search his or her deck for a card that evolves from that Pokémon. Your opponent attaches that card to that Pokémon. This counts as evolving that Pokémon. Either way, you may do the same, and then each player who searched shuffles his or her deck."
      },
      {
        "name": "Body Slam",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "20",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      40
    ],
    "flavorText": "If two of them brush against each other, they will not be able to separate themselves, as they enjoy touching each other's soft fur too much.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/54/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/54/high.webp"
    }
  },
  {
    "id": "neo4-55",
    "name": "Scyther",
    "number": "55",
    "artist": "Shin-ichi Yoshida",
    "rarity": "Uncommon",
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
      "Scizor"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Agility",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all effects of attacks, including damage, done to Scyther."
      },
      {
        "name": "Sharp Sickle",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 3,
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
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      123
    ],
    "flavorText": "It moves so fast as to be invisible to the naked eye. Even when standing still, its camouflage prevents it from being seen.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/55/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/55/high.webp"
    }
  },
  {
    "id": "neo4-56",
    "name": "Togepi",
    "number": "56",
    "artist": "Yuka Morii",
    "rarity": "Uncommon",
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
      "Togetic"
    ],
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
        "text": "If the Defending Pokémon attacks during your opponent's next turn, any damage it does is reduced by 10 (before applying Weakness and Resistance)."
      },
      {
        "name": "Spike Ball Tackle",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Togepi does 10 damage to itself."
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
      175
    ],
    "flavorText": "Its shell is said to contain happiness itself, which it will share with those who are kind to it.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/56/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/56/high.webp"
    }
  },
  {
    "id": "neo4-57",
    "name": "Unown [C]",
    "number": "57",
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
        "name": "[Chase]",
        "text": "As long as Unown C is your Active Pokémon, whenever your opponent's Active Pokémon tries to retreat, flip a coin. If heads, put 1 damage counter on that Pokémon. Apply Weakness and Resistance.",
        "type": "Pokemon Power"
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
    "flavorText": "It is believed that the variety of types of this Pokémon were created by evolutionary adaptation, as each possesses a different ability.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/57/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/57/high.webp"
    }
  },
  {
    "id": "neo4-58",
    "name": "Unown [P]",
    "number": "58",
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
        "name": "",
        "text": "",
        "type": "Pokemon Power"
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
    "flavorText": "It is believed that the variety of types of this Pokémon were created by evolutionary adaptation, as each possesses a different ability.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/58/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/58/high.webp"
    }
  },
  {
    "id": "neo4-59",
    "name": "Unown [Q]",
    "number": "59",
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
        "name": "[Quicken]",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, prevent all effects of attacks, including damage, done to any of your Pokémon with Unown in its name during your opponent's next turn. If you have more than 1 Unown Q in play, use only 1 [Quicken] each turn. This power can be used even if Unown Q is Asleep, Confused, or Paralyzed.",
        "type": "Pokemon Power"
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
    "flavorText": "It is believed that the variety of types of this Pokémon were created by evolutionary adaptation, as each possesses a different ability.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/59/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/59/high.webp"
    }
  },
  {
    "id": "neo4-60",
    "name": "Unown [Z]",
    "number": "60",
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
        "name": "[Zoom]",
        "text": "As long as Unown Z is Benched, you pay no Energy cost to retreat a Pokémon with Unown in its name.",
        "type": "Pokemon Power"
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
    "flavorText": "It is believed that the variety of types of this Pokémon were created by evolutionary adaptation, as each possesses a different ability.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/60/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/60/high.webp"
    }
  },
  {
    "id": "neo4-61",
    "name": "Cyndaquil",
    "number": "61",
    "artist": "Yukiko Baba",
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
      "Quilava"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Smokescreen",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "If the Defending Pokémon tries to attack during your opponent's next turn, your opponent flips a coin. If tails, that attack does nothing."
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
      155
    ],
    "flavorText": "It is very meek and constantly crouches in a defensive posture. When threatened, it protects itself with the flame on its back.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/61/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/61/high.webp"
    }
  },
  {
    "id": "neo4-62",
    "name": "Dark Octillery",
    "number": "62",
    "artist": "Shin-ichi Yoshida",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "60",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Remoraid",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ink Blast",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "This attack does 20 damage plus 10 more damage for each Energy attached to Dark Octillery but not used to pay for this attack's Energy cost. You can't add more than 20 damage in this way."
      },
      {
        "name": "Tentacle Wrap",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed. If tails, during your opponent's next turn, your opponent pays more to retreat the Defending Pokémon."
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
    "flavorText": "It likes to sleep in rock caves and will even steal other Octillery's nests.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/62/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/62/high.webp"
    }
  },
  {
    "id": "neo4-63",
    "name": "Dratini",
    "number": "63",
    "artist": "Yuka Morii",
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
      "Dragonair"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shed",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Remove 1 damage counter from Dratini."
      },
      {
        "name": "Fury Attack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10x",
        "text": "Flip 2 coins. This attack does 10 damage times the number of heads."
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
      147
    ],
    "flavorText": "Large from birth, this Pokémon increases in size throughout its life by regularly shedding its skin.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/63/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/63/high.webp"
    }
  },
  {
    "id": "neo4-64",
    "name": "Exeggcute",
    "number": "64",
    "artist": "Toshinao Aoki",
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
      "Exeggutor"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sleep Power",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "The Defending Pokémon is now Asleep."
      },
      {
        "name": "Psyshock",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
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
      102
    ],
    "flavorText": "Its shell is very durable, allowing it to survive even if the shell becomes cracked.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/64/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/64/high.webp"
    }
  },
  {
    "id": "neo4-65",
    "name": "Gastly",
    "number": "65",
    "artist": "Aya Kusube",
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
      "Haunter"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Nightmare",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "The Defending Pokémon is now Asleep."
      }
    ],
    "weaknesses": [],
    "resistances": [
      {
        "type": "Fighting",
        "value": "-30"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      92
    ],
    "flavorText": "Its gas-like body allows it to enter almost anywhere, but it is vulnerable to high winds.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/65/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/65/high.webp"
    }
  },
  {
    "id": "neo4-66",
    "name": "Girafarig",
    "number": "66",
    "artist": "Yuka Morii",
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
        "name": "Tail Bite",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 20 more damage; if tails, this attack does 10 damage."
      },
      {
        "name": "Psychic",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each Energy card attached to the Defending Pokémon."
      }
    ],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      203
    ],
    "flavorText": "Its tail has a brain of its own, which can respond to stimuli such as scents. Many unsuspecting people have been bitten by it.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/66/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/66/high.webp"
    }
  },
  {
    "id": "neo4-67",
    "name": "Gligar",
    "number": "67",
    "artist": "Ken Sugimori",
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
      "Gliscor"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Stun Poison",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed and Poisoned."
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      207
    ],
    "flavorText": "It spends its days hanging from cliffs, swooping down on any prey it spots from its high vantage point.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/67/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/67/high.webp"
    }
  },
  {
    "id": "neo4-68",
    "name": "Growlithe",
    "number": "68",
    "artist": "Atsuko Nishida",
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
      "Arcanine"
    ],
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      58
    ],
    "flavorText": "It fears nothing, not even opponents larger than itself.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/68/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/68/high.webp"
    }
  },
  {
    "id": "neo4-69",
    "name": "Hitmonchan",
    "number": "69",
    "artist": "Shin-ichi Yoshida",
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
        "name": "Dodge",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "If Hitmonchan would be damaged by an attack during your opponent's next turn, flip a coin. If heads, prevent that attack's damage done to Hitmonchan. (Any other effects of attacks still happen.)"
      },
      {
        "name": "Supersonic Jab",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
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
      107
    ],
    "flavorText": "Its punches are blindingly fast, but it can only fight for three minutes before tiring and needing to rest.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/69/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/69/high.webp"
    }
  },
  {
    "id": "neo4-70",
    "name": "Larvitar",
    "number": "70",
    "artist": "Ken Sugimori",
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
      "Pupitar"
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
        "text": "Flip a coin. If heads, the Defending Pokémon can't attack during your opponent's next turn. (Benching or evolving either Pokémon ends this effect.)"
      },
      {
        "name": "Rock Throw",
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
      246
    ],
    "flavorText": "It is born deep within the ground and has to burrow its way out.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/70/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/70/high.webp"
    }
  },
  {
    "id": "neo4-71",
    "name": "Ledyba",
    "number": "71",
    "artist": "Tomokazu Komiya",
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
      "Ledian"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Swift",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "This attack's damage isn't affected by Weakness, Resistance, Pokémon Powers, or any other effects on the Defending Pokémon."
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
      165
    ],
    "flavorText": "Sensitive to cold, Ledyba gather in groups to share warmth when the temperature drops.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/71/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/71/high.webp"
    }
  },
  {
    "id": "neo4-72",
    "name": "Light Sunflora",
    "number": "72",
    "artist": "Toshinao Aoki",
    "rarity": "Common",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Reflected Sunlight",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Attach up to 2 Energy cards from your hand to 1 of your Pokémon."
      },
      {
        "name": "Solarbeam",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 3,
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      192
    ],
    "flavorText": "Although it is extremely active during the day, it stops moving entirely as soon as the sun sets.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/72/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/72/high.webp"
    }
  },
  {
    "id": "neo4-73",
    "name": "Machop",
    "number": "73",
    "artist": "Toshinao Aoki",
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
      "Machoke"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Chop",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Punch",
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
      66
    ],
    "flavorText": "When bored, this super-strong Pokémon trains by lifting rocks.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/73/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/73/high.webp"
    }
  },
  {
    "id": "neo4-74",
    "name": "Mantine",
    "number": "74",
    "artist": "Yukiko Baba",
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
        "name": "Giant Wave",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "Mantine can't attack during your next turn."
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
      226
    ],
    "flavorText": "This Pokémon is perfectly adapted to its ocean home. It can gather up enough speed to burst above the water like a whale.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/74/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/74/high.webp"
    }
  },
  {
    "id": "neo4-75",
    "name": "Mareep",
    "number": "75",
    "artist": "Kagemaru Himeno",
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
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      179
    ],
    "flavorText": "Its soft wool coat captures air, allowing it to remain cool during the summer and warm in the winter.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/75/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/75/high.webp"
    }
  },
  {
    "id": "neo4-76",
    "name": "Phanpy",
    "number": "76",
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
      "Donphan"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Crushing Step",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip a coin. If heads, this attack does 10 damage plus 10 more damage; if tails, this attack does 10 damage."
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
      231
    ],
    "flavorText": "It hits people with its nose as a sign of affection but doesn't know its own strength and so sometimes knocks people off their feet.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/76/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/76/high.webp"
    }
  },
  {
    "id": "neo4-77",
    "name": "Pineco",
    "number": "77",
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
      "Forretress"
    ],
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
    "flavorText": "It waits suspended from tree branches for insects to fly into its mouth, often not moving for hours at a time.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/77/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/77/high.webp"
    }
  },
  {
    "id": "neo4-78",
    "name": "Porygon",
    "number": "78",
    "artist": "Hiromichi Sugiyama, CR CG gangs",
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
      "Porygon2"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sharpen",
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
      137
    ],
    "flavorText": "This Pokémon was created by human computer engineering. Its program is only capable of simple action and reaction.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/78/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/78/high.webp"
    }
  },
  {
    "id": "neo4-79",
    "name": "Psyduck",
    "number": "79",
    "artist": "Yuka Morii",
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
      "Golduck"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Flipper Splash",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Migraine",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Confused. If tails, Psyduck is now Confused."
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
      54
    ],
    "flavorText": "Although possessed of great mental powers, it doesn't know how to use them.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/79/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/79/high.webp"
    }
  },
  {
    "id": "neo4-80",
    "name": "Remoraid",
    "number": "80",
    "artist": "Jungo Suzuki, CR CG gangs",
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
        "name": "Fury Strikes",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10x",
        "text": "Flip 3 coins. This attack does 10 damage times the number of heads."
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
    "flavorText": "It can shoot a burst of water from its mouth to propel itself backward at high speeds, allowing it to flee from surprised enemies.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/80/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/80/high.webp"
    }
  },
  {
    "id": "neo4-81",
    "name": "Seel",
    "number": "81",
    "artist": "Masako Yamashita",
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
      "Dewgong"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Take Down",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Seel does 10 damage to itself."
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
      86
    ],
    "flavorText": "Although clumsy on land, it moves easily through the arctic waters it calls home.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/81/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/81/high.webp"
    }
  },
  {
    "id": "neo4-82",
    "name": "Slugma",
    "number": "82",
    "artist": "Ken Sugimori",
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
        "name": "Combustion",
        "cost": [
          "Fire",
          "Fire"
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      218
    ],
    "flavorText": "This Pokémon is often seen crawling around in volcanic regions.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/82/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/82/high.webp"
    }
  },
  {
    "id": "neo4-83",
    "name": "Sunkern",
    "number": "83",
    "artist": "Etsuya Hattori",
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
        "name": "Rollout",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Sunbathe",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Flip a coin. If heads, remove all damage counters from Sunkern. Search your deck for a card that evolves from Sunkern and attach that card to Sunkern. This counts as evolving Sunkern. Shuffle your deck afterward."
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
      191
    ],
    "flavorText": "It is very small and powerless. If attacked, the best it can do is flap its leaves in an attempt to frighten away its enemies.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/83/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/83/high.webp"
    }
  },
  {
    "id": "neo4-84",
    "name": "Swinub",
    "number": "84",
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
      "Piloswine"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Generate Cold",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Flip a coin. If heads, the Defending Pokémon is now Paralyzed."
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
    "flavorText": "It moves with its sensitive nose pressed to the ground, always searching for food.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/84/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/84/high.webp"
    }
  },
  {
    "id": "neo4-85",
    "name": "Totodile",
    "number": "85",
    "artist": "Miki Tanaka",
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
      "Croconaw"
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
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each Energy attached to Totodile but not used to pay for this attack's Energy cost. You can't add more than 20 damage in this way."
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
      158
    ],
    "flavorText": "Its highly developed jaws are powerful enough to crush anything. Even experienced adult trainers must handle it with great caution.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/85/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/85/high.webp"
    }
  },
  {
    "id": "neo4-86",
    "name": "Unown [L]",
    "number": "86",
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
        "name": "[Laugh]",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, each player shuffles his or her deck. This power can be used even if Unown L is Asleep, Confused, or Paralyzed.",
        "type": "Pokemon Power"
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
    "flavorText": "It is believed that the variety of types of this Pokémon were created by evolutionary adaptation, as each possesses a different ability.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/86/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/86/high.webp"
    }
  },
  {
    "id": "neo4-87",
    "name": "Unown [S]",
    "number": "87",
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
        "name": "[Search]",
        "text": "Once during your turn (before your attack), you may look at 1 of your Prize cards. Return that Prize card face down. This power can be used even if Unown S is Asleep, Confused, or Paralyzed.",
        "type": "Pokemon Power"
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
        "damage": "20",
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
    "flavorText": "It is believed that the variety of types of this Pokémon were created by evolutionary adaptation, as each possesses a different ability.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/87/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/87/high.webp"
    }
  },
  {
    "id": "neo4-88",
    "name": "Unown [T]",
    "number": "88",
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
        "name": "[Tell]",
        "text": "Once during your turn (before your attack), you may flip a coin. If heads, look at your opponent's hand and show your hand to your opponent. This power can be used even if Unown T is Asleep, Confused, or Paralyzed.",
        "type": "Pokemon Power"
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
        "damage": "20",
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
    "flavorText": "It is believed that the variety of types of this Pokémon were created by evolutionary adaptation, as each possesses a different ability.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/88/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/88/high.webp"
    }
  },
  {
    "id": "neo4-89",
    "name": "Unown [V]",
    "number": "89",
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
        "name": "[Vanish]",
        "text": "When you play Unown V from your hand, you may flip a coin. If heads, return 1 of your Pokémon with Unown in its name (other than Unown V) to your hand. (Discard all cards attached to that card.)",
        "type": "Pokemon Power"
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
    "flavorText": "It is believed that the variety of types of this Pokémon were created by evolutionary adaptation, as each possesses a different ability.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/89/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/89/high.webp"
    }
  },
  {
    "id": "neo4-90",
    "name": "Venonat",
    "number": "90",
    "artist": "Masako Yamashita",
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
        "name": "Gnaw",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Poisonpowder",
        "cost": [
          "Grass",
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
    "flavorText": "It possesses a type of radar, which it can use to find the insects it eats for food, even in pitch darkness.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/90/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/90/high.webp"
    }
  },
  {
    "id": "neo4-91",
    "name": "Vulpix",
    "number": "91",
    "artist": "Masako Yamashita",
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
      "Ninetales"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ember",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Discard 1 Energy card attached to this Pokémon in order to use this attack."
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
      37
    ],
    "flavorText": "As it grows older, its white tail changes colors and splits into six different tails. Its body radiates a faint warmth.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/91/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/91/high.webp"
    }
  },
  {
    "id": "neo4-92",
    "name": "Broken Ground Gym",
    "number": "92",
    "artist": "Tomokazu Komiya",
    "rarity": "Rare",
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
      "Each player pays Colorless more to retreat a Baby Pokémon or Basic Pokémon."
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
      "small": "https://assets.tcgdex.net/en/neo/neo4/92/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/92/high.webp"
    }
  },
  {
    "id": "neo4-93",
    "name": "EXP.ALL",
    "number": "93",
    "artist": "Keiji Kinebuchi",
    "rarity": "Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Attach EXP.ALL to 1 of your Pokémon that doesn't have a Pokémon Tool attached to it.",
      "During your opponent's turn, if your Active Pokémon would be Knocked Out by your opponent's attack, you may take 1 of the basic Energy cards attached to your Active Pokémon and attach it to the Pokémon with EXP.ALL attached to it. If you do, discard EXP.ALL."
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
      "small": "https://assets.tcgdex.net/en/neo/neo4/93/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/93/high.webp"
    }
  },
  {
    "id": "neo4-94",
    "name": "Impostor Professor Oak's Invention",
    "number": "94",
    "artist": "Ken Sugimori",
    "rarity": "Rare",
    "supertype": "Trainer",
    "subtypes": [],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Look at your opponent's Prize cards. You may have your opponent shuffle them into his or her deck. If you do, your opponent takes that many cards from the top of his or her deck and sets them aside as his or her new Prize cards (without looking at them)."
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
      "small": "https://assets.tcgdex.net/en/neo/neo4/94/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/94/high.webp"
    }
  },
  {
    "id": "neo4-95",
    "name": "Radio Tower",
    "number": "95",
    "artist": "Yousuke Hirata, CR CG gangs",
    "rarity": "Rare",
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
      "Once during each player's turn (before attacking), that player may look at the top 2 cards of his or her deck and put them back in the same order."
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
      "small": "https://assets.tcgdex.net/en/neo/neo4/95/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/95/high.webp"
    }
  },
  {
    "id": "neo4-96",
    "name": "Thought Wave Machine",
    "number": "96",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Rocket's Secret Machine"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Flip a coin until you get tails. For each heads, return an Energy card attached to your opponent's Active Pokémon to your opponent's hand. If the Pokémon has fewer attached Energy cards than that, return all of them to your opponent's hand. Your turn is over now (you don't get to attack)."
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
      "small": "https://assets.tcgdex.net/en/neo/neo4/96/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/96/high.webp"
    }
  },
  {
    "id": "neo4-97",
    "name": "Counterattack Claws",
    "number": "97",
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
      "Attach Counterattack Claws to 1 of your Pokémon that doesn't have a Pokémon Tool attached to it.",
      "During your opponent's turn, if the Pokémon Counterattack Claws is attached to is your Active Pokémon and an opponent's attack damages it (even if it is Knocked Out), flip a coin. If heads, put 2 damage counters on the Defending Pokémon. Then, discard Counterattack Claws."
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
      "small": "https://assets.tcgdex.net/en/neo/neo4/97/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/97/high.webp"
    }
  },
  {
    "id": "neo4-98",
    "name": "Energy Amplifier",
    "number": "98",
    "artist": "\"Big Mama\" Tagawa, CR CG gangs",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Choose an Energy card in your hand, show it to your opponent, and shuffle it into your deck. Then flip a coin. If heads, search your deck for up to 3 basic Energy cards. Show them to your opponent, and put them into your hand. Shuffle your deck afterward."
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
      "small": "https://assets.tcgdex.net/en/neo/neo4/98/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/98/high.webp"
    }
  },
  {
    "id": "neo4-99",
    "name": "Energy Stadium",
    "number": "99",
    "artist": "Hideki Kazama",
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
      "Once during each player's turn (before attacking), that player may flip a coin. If heads, that player puts a basic Energy card from his or her discard pile into his or her hand."
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
      "small": "https://assets.tcgdex.net/en/neo/neo4/99/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/99/high.webp"
    }
  },
  {
    "id": "neo4-100",
    "name": "Lucky Stadium",
    "number": "100",
    "artist": "Imakuni?",
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
      "Once during each player's turn (before attacking), that player may flip a coin. If heads, that player draws a card."
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
      "small": "https://assets.tcgdex.net/en/neo/neo4/100/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/100/high.webp"
    }
  },
  {
    "id": "neo4-101",
    "name": "Magnifier",
    "number": "101",
    "artist": "Keiji Kinebuchi",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Attach Magnifier to 1 of your Pokémon. At the end of your turn, discard Magnifier. If the Pokémon Magnifier is attached to attacks, don't apply Resistance for that attack."
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
      "small": "https://assets.tcgdex.net/en/neo/neo4/101/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/101/high.webp"
    }
  },
  {
    "id": "neo4-102",
    "name": "Pokémon Personality Test",
    "number": "102",
    "artist": "Tomokazu Komiya",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Put an Evolution card from your hand face down in front of you. Your opponent guesses whether it is a Pokémon card with Light in its name, a Pokémon card with Dark in its name, or neither one. Flip the card over. If your opponent guessed right, he or she draws 3 cards. If your opponent guessed wrong, you draw 3 cards. Either way, return the card to your hand."
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
      "small": "https://assets.tcgdex.net/en/neo/neo4/102/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/102/high.webp"
    }
  },
  {
    "id": "neo4-103",
    "name": "Team Rocket's Evil Deeds",
    "number": "103",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Trainer",
    "subtypes": [],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Look at your opponent's hand and choose a card there. Your opponent shuffles that card into his or her deck. Then, your opponent may draw up to 2 cards."
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
      "small": "https://assets.tcgdex.net/en/neo/neo4/103/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/103/high.webp"
    }
  },
  {
    "id": "neo4-104",
    "name": "Heal Powder",
    "number": "104",
    "artist": "Ryuta Kusumi, CR CG gangs",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Flip a coin. If heads, your Active Pokémon is no longer Asleep, Confused, Paralyzed, or Poisoned and remove 2 damage counters from it. If your Active Pokémon has fewer damage counters than that, remove all of them."
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
      "small": "https://assets.tcgdex.net/en/neo/neo4/104/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/104/high.webp"
    }
  },
  {
    "id": "neo4-105",
    "name": "Mail from Bill",
    "number": "105",
    "artist": "Ken Sugimori",
    "rarity": "Common",
    "supertype": "Trainer",
    "subtypes": [],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can't play this card if you have 5 or more cards in your hand (including this one). Draw cards until you have exactly 4 cards in your hand."
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
      "small": "https://assets.tcgdex.net/en/neo/neo4/105/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/105/high.webp"
    }
  },
  {
    "id": "neo4-106",
    "name": "Shining Celebi",
    "number": "106",
    "artist": "Hironobu Yoshida",
    "rarity": "Rare Shining",
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
    "rules": [
      "You can't have more than 1 Shining Celebi in your deck."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Healing Water",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Remove a number of damage counters from 1 of your Benched Pokémon equal to the number of Energy cards attached to Shining Celebi. If the Pokémon has fewer damage counters than that, remove all of them."
      },
      {
        "name": "Miracle Leaf",
        "cost": [
          "Grass",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "10",
        "text": "Flip a number of coins equal to the number of Energy attached to the Defending Pokémon. If you get 1 or more heads, the Defending Pokémon is now Asleep, Confused, or Poisoned (your choice)."
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
    "flavorText": "It is worshipped as a god of the forest. It appears only in undisturbed old-growth forests.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/106/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/106/high.webp"
    }
  },
  {
    "id": "neo4-107",
    "name": "Shining Charizard",
    "number": "107",
    "artist": "Hironobu Yoshida",
    "rarity": "Rare Shining",
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
    "rules": [
      "You can't have more than 1 Shining Charizard in your deck."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "White-Hot Flame",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 5,
        "damage": "100",
        "text": "Discard 1 Energy card and 1 Energy card attached to Shining Charizard or this attack does nothing. Flip a coin. If tails, Shining Charizard does 30 damage to itself."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      6
    ],
    "flavorText": "The flames it breathes are so hot that they can melt anything.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/107/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/107/high.webp"
    }
  },
  {
    "id": "neo4-108",
    "name": "Shining Kabutops",
    "number": "108",
    "artist": "Hironobu Yoshida",
    "rarity": "Rare Shining",
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
    "rules": [
      "You can't have more than 1 Shining Kabutops in your deck."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Lightning Cut",
        "cost": [
          "Fighting",
          "Fighting",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 30 damage plus 10 more damage and does 10 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) If tails, this attack does 30 damage and Shining Kabutops does 10 damage to itself."
      },
      {
        "name": "Water Slash",
        "cost": [
          "Fighting",
          "Fighting",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 4,
        "damage": "50+",
        "text": "Does 50 damage plus 10 more damage for each Energy attached to Shining Kabutops but not used to pay for this attack's Energy cost. Don't apply Resistance."
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
      141
    ],
    "flavorText": "This ancient Pokémon uses its razor-sharp claws to cut open its prey and gain access to its blood.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/108/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/108/high.webp"
    }
  },
  {
    "id": "neo4-109",
    "name": "Shining Mewtwo",
    "number": "109",
    "artist": "Hironobu Yoshida",
    "rarity": "Rare Shining",
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
    "rules": [
      "You can't have more than 1 Shining Mewtwo in your deck."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Reflect Shield",
        "cost": [
          "Psychic",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "If an attack does damage to Shining Mewtwo during your opponent's next turn (even if Shining Mewtwo is Knocked Out), flip a coin. If heads, prevent all damage done to Shining Mewtwo from that attack (any other effects of attacks still happen) and do 20 damage to the attacking Pokémon."
      },
      {
        "name": "Psyburst",
        "cost": [
          "Psychic",
          "Psychic",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "40+",
        "text": "Discard a Energy card attached to Shining Mewtwo or this attack does nothing. This attack does 40 damage plus 10 damage for each Energy attached to the Defending Pokémon."
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
    "flavorText": "It uses its highly developed psychic powers to defeat its enemies before they even have time to think.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/109/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/109/high.webp"
    }
  },
  {
    "id": "neo4-110",
    "name": "Shining Noctowl",
    "number": "110",
    "artist": "Ken Sugimori",
    "rarity": "Rare Shining",
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
    "rules": [
      "You can't have more than 1 Shining Noctowl in your deck."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Flashing Eyes",
        "cost": [
          "Psychic",
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": "Flip 3 coins. If exactly 1 is heads, the Defending Pokémon is now Asleep. If exactly 2 are heads, the Defending Pokémon is now Confused. If all 3 are heads, the Defending Pokémon is now Paralyzed."
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
    "flavorText": "It speeds up its thought processes by turning its head around 180 degrees.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/110/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/110/high.webp"
    }
  },
  {
    "id": "neo4-111",
    "name": "Shining Raichu",
    "number": "111",
    "artist": "Hironobu Yoshida",
    "rarity": "Rare Shining",
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
    "rules": [
      "You can't have more than 1 Shining Raichu in your deck."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Thundersquall",
        "cost": [
          "Lightning",
          "Lightning",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 4,
        "damage": "40",
        "text": "If your opponent has any Benched Pokémon, choose 1 of them and this attack does 10 damage to that Pokémon for each Energy attached to Shining Raichu. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": "If the electricity in its cheeks runs out, it sticks its tail straight up and uses it to collect energy from the air.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/111/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/111/high.webp"
    }
  },
  {
    "id": "neo4-112",
    "name": "Shining Steelix",
    "number": "112",
    "artist": "Ken Sugimori",
    "rarity": "Rare Shining",
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
    "rules": [
      "You can't have more than 1 Shining Steelix in your deck."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Crushing Earth",
        "cost": [
          "Metal",
          "Metal",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 4,
        "damage": "80",
        "text": "Flip a coin. If heads, this attack does 10 damage to each Benched Pokémon (yours and your opponent's). (Don't apply Weakness and Resistance for Benched Pokémon.) If tails, this attack does nothing. Either way, Shining Steelix can't attack during your next turn."
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
      208
    ],
    "flavorText": "If an Onix lives 100 years or more, its skin hardens, eventually becoming even harder than a diamond.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/112/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/112/high.webp"
    }
  },
  {
    "id": "neo4-113",
    "name": "Shining Tyranitar",
    "number": "113",
    "artist": "Ken Sugimori",
    "rarity": "Rare Shining",
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
    "rules": [
      "You can't have more than 1 Shining Tyranitar in your deck."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "",
        "cost": [
          "Darkness",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 3,
        "damage": "30",
        "text": ""
      },
      {
        "name": "",
        "cost": [
          "Darkness",
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 4,
        "damage": "50",
        "text": ""
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      248
    ],
    "flavorText": "It is so powerful, it can knock down a mountain with hust one arm.",
    "legalities": {
      "unlimited": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://assets.tcgdex.net/en/neo/neo4/113/low.webp",
      "large": "https://assets.tcgdex.net/en/neo/neo4/113/high.webp"
    }
  }
]

export default cardDetails
