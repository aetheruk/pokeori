import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "me55c-4",
    "name": "Charizard",
    "number": "4",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "120",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Energy Burn",
        "text": "As often as you like during your turn (before your attack), you may turn all Energy attached to Charizard into Fire Energy for the rest of the turn. This power can't be used if Charizard is Asleep, Confused, or Paralyzed.",
        "type": "Pokémon Power"
      }
    ],
    "attacks": [
      {
        "name": "Fire Spin",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": "Discard 2 Energy cards attached to Charizard in order to use this attack."
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-4/small",
      "large": "https://images.scrydex.com/pokemon/me55c-4/large"
    }
  },
  {
    "id": "me55c-5",
    "name": "Delcatty",
    "number": "5",
    "artist": "Atsuko Nishida",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Skitty",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Energy Draw",
        "text": "Once during your turn (before your attack), you may discard 1 Energy card from your hand. Then draw up to 3 cards from your deck. This power can't be used if Delcatty is affected by a Special Condition.",
        "type": "Poké-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Max Energy Source",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Does 10 damage times the amount of Energy attached to all of your Active Pokémon."
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
      301
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-5/small",
      "large": "https://images.scrydex.com/pokemon/me55c-5/large"
    }
  },
  {
    "id": "me55c-11g",
    "name": "Genesect-EX",
    "number": "11",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Red Signal",
        "text": "When you attach a Plasma Energy from your hand to this Pokémon, you may switch 1 of your opponent's Benched Pokémon with his or her Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Megalo Cannon",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "Does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      649
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-11g/small",
      "large": "https://images.scrydex.com/pokemon/me55c-11g/large"
    }
  },
  {
    "id": "me55c-11",
    "name": "Metagross",
    "number": "11",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "100",
    "types": [
      "Lightning",
      "Metal"
    ],
    "evolvesFrom": "Metang",
    "evolvesTo": [],
    "rules": [
      "This Pokémon is both Lightning Metal type."
    ],
    "abilities": [
      {
        "name": "Delta Control",
        "text": "Once during your turn (before your attack), you may look at the top 4 cards of your deck, choose 1 of them, and put it into your hand. Put the 3 other cards on the bottom of your deck in any order. This power can't be used if Metagross is affected by a Special Condition.",
        "type": "Poké-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Crush and Burn",
        "cost": [
          "Lightning",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "You may discard as many Energy cards as you like attached to your Pokémon in play. If you do, this attack does 30 damage plus 20 more damage for each Energy card you discarded."
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
      376
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-11/small",
      "large": "https://images.scrydex.com/pokemon/me55c-11/large"
    }
  },
  {
    "id": "me55c-18",
    "name": "Misty",
    "number": "18",
    "artist": "Ken Sugimori",
    "rarity": "Rare Holo",
    "supertype": "Trainer",
    "subtypes": [],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Discard 2 of the other cards in your hand in order to play this card. If this turn's attack does damage to the Defending Pokémon (after applying Weakness and Resistance), and if the attacking Pokémon has Misty in its name, the attack does 20 more damage to the Defending Pokémon."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-18/small",
      "large": "https://images.scrydex.com/pokemon/me55c-18/large"
    }
  },
  {
    "id": "me55c-19",
    "name": "Dark Tyranitar",
    "number": "19",
    "artist": "Nakaoka",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "120",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Dark Pupitar",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Grind",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Does 10 damage plus 10 more damage for each Energy attached to Dark Tyranitar."
      },
      {
        "name": "Spinning Tail",
        "cost": [
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Does 20 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Bite Off",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 5,
        "damage": "70+",
        "text": "If the Defending Pokémon is Pokémon-ex, this attack does 70 damage plus 50 more damage."
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
      248
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-19/small",
      "large": "https://images.scrydex.com/pokemon/me55c-19/large"
    }
  },
  {
    "id": "me55c-25",
    "name": "Sneasel",
    "number": "25",
    "artist": "Ken Sugimori",
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
    "evolvesTo": [],
    "rules": [],
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
      },
      {
        "name": "Beat Up",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Flip a coin for each of your Pokémon in play (including this one). This attack does 20 damage times the number of heads."
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-25/small",
      "large": "https://images.scrydex.com/pokemon/me55c-25/large"
    }
  },
  {
    "id": "me55c-33",
    "name": "Pikachu & Zekrom-GX",
    "number": "33",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "TAG TEAM"
    ],
    "hp": "240",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "When your TAG TEAM is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Full Blitz",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Search your deck for up to 3 Lightning Energy cards and attach them to 1 of your Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Tag Bolt-GX",
        "cost": [
          "Lightning",
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "If this Pokémon has at least 3 extra Lightning Energy attached to it (in addition to this attack's cost), this attack does 170 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) (You can't use more than 1 GX attack in a game.)"
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      25
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-33/small",
      "large": "https://images.scrydex.com/pokemon/me55c-33/large"
    }
  },
  {
    "id": "me55c-41",
    "name": "Greninja BREAK",
    "number": "41",
    "artist": "5ban Graphics",
    "rarity": "Rare BREAK",
    "supertype": "Pokémon",
    "subtypes": [
      "BREAK"
    ],
    "hp": "170",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Greninja",
    "evolvesTo": [],
    "rules": [
      "Greninja BREAK retains the attacks, Abilities, Weakness, Resistance, and Retreat Cost of its previous Evolution."
    ],
    "abilities": [
      {
        "name": "Giant Water Shuriken",
        "text": "Once during your turn (before your attack), if this Pokémon is your Active Pokémon, you may discard a Water Energy card from your hand. If you do, put 6 damage counters on 1 of your opponents Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      658
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-41/small",
      "large": "https://images.scrydex.com/pokemon/me55c-41/large"
    }
  },
  {
    "id": "me55c-43",
    "name": "Uxie",
    "number": "43",
    "artist": "Ken Sugimori",
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
    "abilities": [
      {
        "name": "Set Up",
        "text": "Once during your turn, when you put Uxie from your hand onto your Bench, you may draw cards until you have 7 cards in your hand.",
        "type": "Poké-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Psychic Restore",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "You may put Uxie and all cards attached to it on the bottom of your deck in any order."
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
      480
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-43/small",
      "large": "https://images.scrydex.com/pokemon/me55c-43/large"
    }
  },
  {
    "id": "me55c-47",
    "name": "Crobat G",
    "number": "47",
    "artist": "Makoto Imai",
    "rarity": "Uncommon",
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
    "abilities": [
      {
        "name": "Flash Bite",
        "text": "Once during your turn, when you put Crobat G from your hand onto your Bench, you may put 1 damage counter on 1 of your opponent's Pokémon.",
        "type": "Poké-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Toxic Fang",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "The Defending Pokémon is now Poisoned. Put 2 damage counters instead of 1 on the Defending Pokémon between turns."
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
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      169
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-47/small",
      "large": "https://images.scrydex.com/pokemon/me55c-47/large"
    }
  },
  {
    "id": "me55c-50",
    "name": "Raikou",
    "number": "50",
    "artist": "Hideki Ishikawa",
    "rarity": "Amazing Rare",
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
        "name": "Amazing Shot",
        "cost": [
          "Grass",
          "Lightning",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "This attack also does 120 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      243
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "D",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-50/small",
      "large": "https://images.scrydex.com/pokemon/me55c-50/large"
    }
  },
  {
    "id": "me55c-57",
    "name": "Buzzwole-GX",
    "number": "57",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "190",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Jet Punch",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This attack does 30 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Knuckle Impact",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "This Pokémon can't attack during your next turn."
      },
      {
        "name": "Absorption-GX",
        "cost": [
          "Fighting",
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 3,
        "damage": "40×",
        "text": "This attack does 40 damage for each of your remaining Prize cards. (You can't use more than 1 GX attack in a game.)"
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
      794
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-57/small",
      "large": "https://images.scrydex.com/pokemon/me55c-57/large"
    }
  },
  {
    "id": "me55c-58",
    "name": "Pikachu",
    "number": "58",
    "artist": "Mitsuhiro Arita",
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
    "evolvesTo": [],
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
        "name": "Thunder Jolt",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Flip a coin. If tails, Pikachu does 10 damage to itself."
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
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-58/small",
      "large": "https://images.scrydex.com/pokemon/me55c-58/large"
    }
  },
  {
    "id": "me55c-69",
    "name": "Erika's Jigglypuff",
    "number": "69",
    "artist": "Ken Sugimori",
    "rarity": "Common",
    "supertype": "Trainer",
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
        "name": "Group Therapy",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "You and your opponent remove 1 damage counter from each of your Pokémon with damage counters on them."
      },
      {
        "name": "Pulled Punch",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40-",
        "text": "If the Defending Pokémon has no damage counters on it, this attack does 40 damage. If it has any damage counters on it, this attack does 10 damage."
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
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-69/small",
      "large": "https://images.scrydex.com/pokemon/me55c-69/large"
    }
  },
  {
    "id": "me55c-85",
    "name": "Rayquaza-EX",
    "number": "85",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "EX"
    ],
    "hp": "170",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Celestial Roar",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Discard the top 3 cards of your deck. If any of those cards are Energy cards, attach them to this Pokémon."
      },
      {
        "name": "Dragon Burst",
        "cost": [
          "Fire",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "60×",
        "text": "Discard all basic Fire Energy or all basic Lightning Energy attached to this Pokémon. This attack does 60 damage times the number of Energy cards you discarded."
      }
    ],
    "weaknesses": [
      {
        "type": "Dragon",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      384
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-85/small",
      "large": "https://images.scrydex.com/pokemon/me55c-85/large"
    }
  },
  {
    "id": "me55c-89",
    "name": "Solgaleo-GX",
    "number": "89",
    "artist": "PLANETA",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Cosmoem",
    "evolvesTo": [],
    "rules": [
      "When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Ultra Road",
        "text": "Once during your turn (before your attack), you may switch your Active Pokémon with 1 of your Benched Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Sunsteel Strike",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "230",
        "text": "Discard all Energy from this Pokémon."
      },
      {
        "name": "Sol Burst-GX",
        "cost": [
          "Metal"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 5 Energy cards and attach them to your Pokémon in any way you like. Then, shuffle your deck. (You can't use more than 1 GX attack in a game.)"
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
      "Colorless",
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 3,
    "nationalPokedexNumbers": [
      791
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-89/small",
      "large": "https://images.scrydex.com/pokemon/me55c-89/large"
    }
  },
  {
    "id": "me55c-94",
    "name": "Gengar",
    "number": "94",
    "artist": "Takashi Yamaguchi",
    "rarity": "Rare Prime",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Haunter",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Catastrophe",
        "text": "As long as Gengar is your Active Pokémon, if any of your opponent's Pokémon would be Knocked Out, put that Pokémon in the Lost Zone instead of discarding. (Discard all cards attached to that Pokémon.)",
        "type": "Poké-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Hurl into Darkness",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Look at your opponent's hand and choose a number of Pokémon you find there up to the number of Psychic Energy attached to Gengar. Put the Pokémon you chose in the Lost Zone."
      },
      {
        "name": "Cursed Drop",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Put 4 damage counters on your opponent's Pokémon in any way you like."
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
        "type": "Colorless",
        "value": "-20"
      }
    ],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      94
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-94/small",
      "large": "https://images.scrydex.com/pokemon/me55c-94/large"
    }
  },
  {
    "id": "me55c-99",
    "name": "Darkrai & Cresselia LEGEND",
    "number": "99",
    "artist": "Noriko Takaya,                   \n                    \n                      Shinji Higuchi",
    "rarity": "LEGEND",
    "supertype": "Pokémon",
    "subtypes": [
      "LEGEND"
    ],
    "hp": "150",
    "types": [
      "Darkness",
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Put this card from your hand onto your Bench only with the other half of Darkrai & Cresselia LEGEND.",
      "When this Pokémon has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Lost Crisis",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": "Choose 2 Energy attached to Darkrai & Cresselia LEGEND and put them in the Lost Zone. If any of your opponent's Pokémon would be Knocked Out by damage from this attack, put that Pokémon and all cards attached to it in the Lost Zone instead of discarding it."
      },
      {
        "name": "Moon's Invite",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Move as many damage counters on your opponent's Pokémon as you like to any of your opponent's other Pokémon in any way you like."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      },
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
      488
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-99/small",
      "large": "https://images.scrydex.com/pokemon/me55c-99/large"
    }
  },
  {
    "id": "me55c-100",
    "name": "Darkrai & Cresselia LEGEND",
    "number": "100",
    "artist": "Noriko Takaya,                   \n                    \n                      Shinji Higuchi",
    "rarity": "LEGEND",
    "supertype": "Pokémon",
    "subtypes": [
      "LEGEND"
    ],
    "hp": "150",
    "types": [
      "Darkness",
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Put this card from your hand onto your Bench only with the other half of Darkrai & Cresselia LEGEND.",
      "When this Pokémon has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Lost Crisis",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "100",
        "text": "Choose 2 Energy attached to Darkrai & Cresselia LEGEND and put them in the Lost Zone. If any of your opponent's Pokémon would be Knocked Out by damage from this attack, put that Pokémon and all cards attached to it in the Lost Zone instead of discarding it."
      },
      {
        "name": "Moon's Invite",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Move as many damage counters on your opponent's Pokémon as you like to any of your opponent's other Pokémon in any way you like."
      }
    ],
    "weaknesses": [
      {
        "type": "Fighting",
        "value": "×2"
      },
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
      488
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-100/small",
      "large": "https://images.scrydex.com/pokemon/me55c-100/large"
    }
  },
  {
    "id": "me55c-101",
    "name": "N",
    "number": "101",
    "artist": "Ken Sugimori",
    "rarity": "Rare Ultra",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Each player shuffles his or her hand into his or her deck. Then, each player draws a card for each of his or her remaining Prize cards.",
      "You may play only 1 Supporter card during your turn (before your attack)."
    ],
    "abilities": [],
    "attacks": [],
    "weaknesses": [],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-101/small",
      "large": "https://images.scrydex.com/pokemon/me55c-101/large"
    }
  },
  {
    "id": "me55c-106m",
    "name": "M Gardevoir-EX",
    "number": "106",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo EX",
    "supertype": "Pokémon",
    "subtypes": [
      "MEGA",
      "EX"
    ],
    "hp": "210",
    "types": [
      "Fairy"
    ],
    "evolvesFrom": "Gardevoir-EX",
    "evolvesTo": [],
    "rules": [
      "When 1 of your Pokémon becomes a Mega Evolution Pokémon, your turn ends.",
      "When a Pokémon-EX has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Brilliant Arrow",
        "cost": [
          "Fairy",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30×",
        "text": "This attack does 30 damage times the number of Fairy Energy attached to all of your Pokémon."
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
        "type": "Darkness",
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      282
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-106m/small",
      "large": "https://images.scrydex.com/pokemon/me55c-106m/large"
    }
  },
  {
    "id": "me55c-106p",
    "name": "Palkia LV.X",
    "number": "106",
    "artist": "Ryo Ueda",
    "rarity": "Rare Holo LV.X",
    "supertype": "Pokémon",
    "subtypes": [
      "LEVEL-UP"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Palkia",
    "evolvesTo": [],
    "rules": [
      "Put this card onto your Active Palkia. Palkia LV.X can use any attack, Poké-Power, or Poké-Body from its previous level."
    ],
    "abilities": [
      {
        "name": "Restructure",
        "text": "Once during your turn (before your attack), you may have your opponent switch 1 of your Active Pokémon with 1 of your Benched Pokémon. Then, you switch 1 of the Defending Pokémon with 1 of your opponent's Benched Pokémon. This power can't be used if Palkia is affected by a Special Condition.",
        "type": "Poké-POWER"
      }
    ],
    "attacks": [
      {
        "name": "Hydro Reflect",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "60",
        "text": "You may move all Energy cards attached to Palkia to your Benched Pokémon in any way you like. (Ignore this effect if you don't have any Benched Pokémon.)"
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
      484
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-106p/small",
      "large": "https://images.scrydex.com/pokemon/me55c-106p/large"
    }
  },
  {
    "id": "me55c-106",
    "name": "Shining Celebi",
    "number": "106",
    "artist": "Hironobu Yoshida",
    "rarity": "Rare Secret",
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
        "text": "Remove a number of damage counters from 1 of your Benched Pokémon equal to the number of Water Energy cards attached to Shining Celebi. If the Pokémon has fewer damage counters than that, remove all of them."
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-106/small",
      "large": "https://images.scrydex.com/pokemon/me55c-106/large"
    }
  },
  {
    "id": "me55c-108",
    "name": "Scizor ex",
    "number": "108",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare Holo ex",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "120",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Scyther",
    "evolvesTo": [],
    "rules": [
      "When Pokémon-ex has been Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Danger Perception",
        "text": "As long as Scizor ex's remaining HP is 60 or less, Scizor ex does 40 more damage to the Defending Pokémon (before applying Weakness and Resistance).",
        "type": "Poké-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Steel Wing",
        "cost": [
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": "During your opponent's next turn, any damage done to Scizor ex by attacks is reduced by 20 (after applying Weakness and Resistance)."
      },
      {
        "name": "Cross-Cut",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "50+",
        "text": "If the Defending Pokémon is an Evolved Pokémon, this attack does 50 damage plus 30 more damage."
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
      212
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-108/small",
      "large": "https://images.scrydex.com/pokemon/me55c-108/large"
    }
  },
  {
    "id": "me55c-114",
    "name": "Mew VMAX",
    "number": "114",
    "artist": "5ban Graphics",
    "rarity": "Holo Rare VMAX",
    "supertype": "Pokémon",
    "subtypes": [
      "VMAX"
    ],
    "hp": "310",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Mew V",
    "evolvesTo": [],
    "rules": [
      "When your Pokémon VMAX is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Cross Fusion Strike",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Choose 1 of your Benched Fusion Strike Pokémon's attacks and use it as this attack."
      },
      {
        "name": "Max Miracle",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "130",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
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
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      151
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "E",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-114/small",
      "large": "https://images.scrydex.com/pokemon/me55c-114/large"
    }
  },
  {
    "id": "me55c-123",
    "name": "Arceus VSTAR",
    "number": "123",
    "artist": "5ban Graphics",
    "rarity": "Holo Rare VSTAR",
    "supertype": "Pokémon",
    "subtypes": [
      "VSTAR"
    ],
    "hp": "280",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Arceus V",
    "evolvesTo": [],
    "rules": [
      "When your Pokémon VSTAR is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Starbirth",
        "text": "During your turn, you may search your deck for up to 2 cards and put them into your hand. Then, shuffle your deck. (You can't use more than 1 VSTAR Power in a game.)",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Trinity Nova",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "200",
        "text": "Search your deck for up to 3 basic Energy cards and attach them to your Pokémon V in any way you like. Then, shuffle your deck."
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
      493
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "F",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-123/small",
      "large": "https://images.scrydex.com/pokemon/me55c-123/large"
    }
  },
  {
    "id": "me55c-138",
    "name": "Zacian V",
    "number": "138",
    "artist": "5ban Graphics",
    "rarity": "Holo Rare V",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "V"
    ],
    "hp": "220",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "When your Pokémon V is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Intrepid Sword",
        "text": "Once during your turn, you may look at the top 3 cards of your deck and attach any number of Metal Energy cards you find there to this Pokémon. Put the other cards into your hand. If you use this Ability, your turn ends.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Brave Blade",
        "cost": [
          "Metal",
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "230",
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
      888
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": "D",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-138/small",
      "large": "https://images.scrydex.com/pokemon/me55c-138/large"
    }
  },
  {
    "id": "me55c-149",
    "name": "Lugia",
    "number": "149",
    "artist": "Naoyo Kimura",
    "rarity": "Rare Secret",
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
    "abilities": [
      {
        "name": "Crystal Type",
        "text": "Whenever you attach a Fire, Water, or Psychic basic Energy card from your hand to Lugia, Lugia's type (color) becomes the same as that Energy card type until the end of the turn.",
        "type": "Poké-BODY"
      }
    ],
    "attacks": [
      {
        "name": "Psychic",
        "cost": [
          "Psychic",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "10×",
        "text": "This attack does 10 damage times the number of Energy cards attached to the Defending Pokémon."
      },
      {
        "name": "Steam Blast",
        "cost": [
          "Water",
          "Water",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "50",
        "text": "Discard an Energy card attached to Lugia."
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
      249
    ],
    "flavorText": null,
    "legalities": {},
    "regulationMark": null,
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-149/small",
      "large": "https://images.scrydex.com/pokemon/me55c-149/large"
    }
  },
  {
    "id": "me55c-203",
    "name": "Magikarp",
    "number": "203",
    "artist": "Shinji Kanda",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "30",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Expert Splasher",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "Flip 2 coins. If both of them are heads, this attack does 20 more damage."
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
    "flavorText": null,
    "legalities": {},
    "regulationMark": "G",
    "images": {
      "small": "https://images.scrydex.com/pokemon/me55c-203/small",
      "large": "https://images.scrydex.com/pokemon/me55c-203/large"
    }
  }
]

export default cardDetails
