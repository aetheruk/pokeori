import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "me2-1",
    "name": "Oddish",
    "number": "1",
    "artist": "MINAMINAMI Take",
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
    "flavorText": "Its scientific name is Oddium wanderus. It is said to cover distances as far as 1,000 feet when night falls, walking on its two roots.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/1.png",
      "large": "https://images.pokemontcg.io/me2/1_hires.png"
    }
  },
  {
    "id": "me2-2",
    "name": "Gloom",
    "number": "2",
    "artist": "Yoriyuki Ikegami",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "70",
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
        "name": "Disperse Drool",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "This attack also does 20 damage to each Benched Pokémon (both yours and your opponent's). (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": "The fluid that oozes from its mouth isn't drool. It is a nectar that is used to attract prey.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/2.png",
      "large": "https://images.pokemontcg.io/me2/2_hires.png"
    }
  },
  {
    "id": "me2-3",
    "name": "Vileplume",
    "number": "3",
    "artist": "Shibuzoh.",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Gloom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Pollen Bomb",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Asleep and Poisoned."
      },
      {
        "name": "Lively Flower",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "60+",
        "text": "If this Pokémon was healed during this turn, this attack does 120 more damage."
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
    "flavorText": "The bud bursts into bloom with a bang. It then starts scattering allergenic, poisonous pollen.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/3.png",
      "large": "https://images.pokemontcg.io/me2/3_hires.png"
    }
  },
  {
    "id": "me2-4",
    "name": "Mega Heracross ex",
    "number": "4",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Juggernaut Horn",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "100+",
        "text": "If this Pokémon was damaged by an attack during your opponent's last turn, this attack does that much more damage."
      },
      {
        "name": "Mountain Ramming",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 3,
        "damage": "170",
        "text": "Discard the top 2 cards of your opponent's deck."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/4.png",
      "large": "https://images.pokemontcg.io/me2/4_hires.png"
    }
  },
  {
    "id": "me2-5",
    "name": "Lotad",
    "number": "5",
    "artist": "Wintr Wandr",
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
      "Lombre"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Headbutt",
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
      270
    ],
    "flavorText": "The leaf on its head is naturally dirt repellent and will stay clean even after transporting Pokémon that are covered in mud.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/5.png",
      "large": "https://images.pokemontcg.io/me2/5_hires.png"
    }
  },
  {
    "id": "me2-6",
    "name": "Lombre",
    "number": "6",
    "artist": "Shigenori Negishi",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Lotad",
    "evolvesTo": [
      "Ludicolo"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mega Drain",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
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
      271
    ],
    "flavorText": "It prefers waterfronts with plentiful food. It became nocturnal so it wouldn't have to compete for food with bird Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/6.png",
      "large": "https://images.pokemontcg.io/me2/6_hires.png"
    }
  },
  {
    "id": "me2-7",
    "name": "Ludicolo",
    "number": "7",
    "artist": "Anesaki Dynamic",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Lombre",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Excited Heal",
        "text": "Once during your turn, if you have any Grass Mega Evolution Pokémon ex in play, you may use this Ability. Heal 60 damage from 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Lunge Out",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
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
      272
    ],
    "flavorText": "There are structures throughout its whole body that produce energy when hit by sound waves with a cheerful rhythm.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/7.png",
      "large": "https://images.pokemontcg.io/me2/7_hires.png"
    }
  },
  {
    "id": "me2-8",
    "name": "Genesect",
    "number": "8",
    "artist": "Mitsuhiro Arita",
    "rarity": "Rare",
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
        "name": "Bug's Cannon",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 20 damage to 1 of your opponent's Pokémon for each Grass Energy attached to this Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Speed Attack",
        "cost": [
          "Grass",
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
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
      649
    ],
    "flavorText": "This Pokémon existed 300 million years ago. Team Plasma altered it and attached a cannon to its back.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/8.png",
      "large": "https://images.pokemontcg.io/me2/8_hires.png"
    }
  },
  {
    "id": "me2-9",
    "name": "Nymble",
    "number": "9",
    "artist": "Yuka Morii",
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
        "name": "Flail Around",
        "cost": [
          "Grass"
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
      919
    ],
    "flavorText": "It has its third set of legs folded up. When it's in a tough spot, this Pokémon jumps over 30 feet using the strength of its legs.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/9.png",
      "large": "https://images.pokemontcg.io/me2/9_hires.png"
    }
  },
  {
    "id": "me2-10",
    "name": "Lokix",
    "number": "10",
    "artist": "Taiga Kasai",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Nymble",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Low Kick",
        "cost": [
          "Grass"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Jumping Shot",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "150",
        "text": "Shuffle this Pokémon and all attached cards into your deck."
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
      920
    ],
    "flavorText": "When it decides to fight all out, it stands on its previously folded legs to enter Showdown Mode. It neutralizes its enemies in short order.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/10.png",
      "large": "https://images.pokemontcg.io/me2/10_hires.png"
    }
  },
  {
    "id": "me2-11",
    "name": "Charmander",
    "number": "11",
    "artist": "HYOGONOSUKE",
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
      "Charmeleon"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Agile",
        "text": "If this Pokémon has no Energy attached, it has no Retreat Cost.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Live Coal",
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
      4
    ],
    "flavorText": "The flame on its tail shows the strength of its life-force. If Charmander is weak, the flame also burns weakly.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/11.png",
      "large": "https://images.pokemontcg.io/me2/11_hires.png"
    }
  },
  {
    "id": "me2-12",
    "name": "Charmeleon",
    "number": "12",
    "artist": "Uninori",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
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
        "name": "Steady Firebreathing",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
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
      5
    ],
    "flavorText": "When it swings its burning tail, the temperature around it rises higher and higher, tormenting its opponents.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/12.png",
      "large": "https://images.pokemontcg.io/me2/12_hires.png"
    }
  },
  {
    "id": "me2-13",
    "name": "Mega Charizard X ex",
    "number": "13",
    "artist": "takuyoa",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "360",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Inferno X",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "90×",
        "text": "Discard any amount of Fire Energy from among your Pokémon, and this attack does 90 damage for each card you discarded in this way."
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
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/13.png",
      "large": "https://images.pokemontcg.io/me2/13_hires.png"
    }
  },
  {
    "id": "me2-14",
    "name": "Moltres",
    "number": "14",
    "artist": "Kazumasa Yasukuni",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fighting Wings",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "If your opponent's Active Pokémon is a Pokémon ex, this attack does 90 more damage."
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
      146
    ],
    "flavorText": "There are stories of this Pokémon using its radiant, flame-cloaked wings to light up paths for those lost in the mountains.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/14.png",
      "large": "https://images.pokemontcg.io/me2/14_hires.png"
    }
  },
  {
    "id": "me2-15",
    "name": "Darumaka",
    "number": "15",
    "artist": "NC Empire",
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
        "name": "Blaze Ball",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "10+",
        "text": "This attack does 20 more damage for each Fire Energy attached to this Pokémon."
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
    "flavorText": "This popular symbol of good fortune will never fall over in its sleep, no matter how it's pushed or pulled.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/15.png",
      "large": "https://images.pokemontcg.io/me2/15_hires.png"
    }
  },
  {
    "id": "me2-16",
    "name": "Darmanitan",
    "number": "16",
    "artist": "Uta",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "150",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Darumaka",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Blaze Ball",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "40+",
        "text": "This attack does 40 more damage for each Fire Energy attached to this Pokémon."
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
    "flavorText": "This Pokémon's power level rises along with the temperature of its fire, which can reach 2,500 degrees Fahrenheit.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/16.png",
      "large": "https://images.pokemontcg.io/me2/16_hires.png"
    }
  },
  {
    "id": "me2-17",
    "name": "Reshiram",
    "number": "17",
    "artist": "AKIRA EGAWA",
    "rarity": "Rare",
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
        "name": "Combustion",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Burning Flare",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 4,
        "damage": "240",
        "text": "This Pokémon also does 60 damage to itself."
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
    "flavorText": "According to myth, if people ignore truth and let themselves become consumed by greed, Reshiram will arrive to burn their kingdoms down.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/17.png",
      "large": "https://images.pokemontcg.io/me2/17_hires.png"
    }
  },
  {
    "id": "me2-18",
    "name": "Oricorio ex",
    "number": "18",
    "artist": "akagi",
    "rarity": "Double Rare",
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
    "abilities": [
      {
        "name": "Excited Turbo",
        "text": "As often as you like during your turn, if you have any Fire Mega Evolution Pokémon ex in play, you may use this Ability. Attach a Basic Fire Energy card from your hand to 1 of your Benched Fire Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Fire Wing",
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
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/18.png",
      "large": "https://images.pokemontcg.io/me2/18_hires.png"
    }
  },
  {
    "id": "me2-19",
    "name": "Charcadet",
    "number": "19",
    "artist": "Tomokazu Komiya",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Gather Strength",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Energy cards, reveal them, and put them into your hand. Then, shuffle your deck."
      },
      {
        "name": "Chop",
        "cost": [
          "Fire"
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
      935
    ],
    "flavorText": "Burnt charcoal came to life and became a Pokémon. Possessing a fiery fighting spirit, Charcadet will battle even tough opponents.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/19.png",
      "large": "https://images.pokemontcg.io/me2/19_hires.png"
    }
  },
  {
    "id": "me2-20",
    "name": "Ceruledge",
    "number": "20",
    "artist": "Gemi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charcadet",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Infernal Slash",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "220",
        "text": "Discard 4 Basic Fire Energy cards from your hand. If you can't discard 4 cards in this way, this attack does nothing."
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
      937
    ],
    "flavorText": "The fiery blades on its arms burn fiercely with the lingering resentment of a sword wielder who fell before accomplishing their goal.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/20.png",
      "large": "https://images.pokemontcg.io/me2/20_hires.png"
    }
  },
  {
    "id": "me2-21",
    "name": "Seel",
    "number": "21",
    "artist": "svlt",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
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
        "name": "Bubble Drain",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Heal 20 damage from this Pokémon."
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
      86
    ],
    "flavorText": "The protrusion on its head is very hard. It is used for bashing through thick ice.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/21.png",
      "large": "https://images.pokemontcg.io/me2/21_hires.png"
    }
  },
  {
    "id": "me2-22",
    "name": "Dewgong",
    "number": "22",
    "artist": "Taira Akitsu",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Seel",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Thick Fat",
        "text": "This Pokémon takes 30 less damage from attacks from your opponent's Fire or Water Pokémon (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Slam",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70×",
        "text": "Flip 2 coins. This attack does 70 damage for each heads."
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
    "flavorText": "It sleeps under shallow ocean waters during the day, then looks for food at night when it's colder.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/22.png",
      "large": "https://images.pokemontcg.io/me2/22_hires.png"
    }
  },
  {
    "id": "me2-23",
    "name": "Swinub",
    "number": "23",
    "artist": "imoniii",
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
      "Piloswine"
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
        "name": "Icy Snow",
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
      220
    ],
    "flavorText": "It searches for food by digging into the ground with its snout. Even frozen ground doesn't give it any trouble.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/23.png",
      "large": "https://images.pokemontcg.io/me2/23_hires.png"
    }
  },
  {
    "id": "me2-24",
    "name": "Piloswine",
    "number": "24",
    "artist": "Shinya Komatsu",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Swinub",
    "evolvesTo": [
      "Mamoswine"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rising Lunge",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "Flip a coin. If heads, this attack does 30 more damage."
      },
      {
        "name": "Frost Smash",
        "cost": [
          "Water",
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
      221
    ],
    "flavorText": "Covered by a shaggy coat, it is resistant to the cold. Its tusks of ice thicken when it snows.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/24.png",
      "large": "https://images.pokemontcg.io/me2/24_hires.png"
    }
  },
  {
    "id": "me2-25",
    "name": "Mamoswine",
    "number": "25",
    "artist": "Takumi Wada",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "180",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Piloswine",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wreck",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120+",
        "text": "If a Stadium is in play, this attack does 120 more damage. Then, discard that Stadium."
      },
      {
        "name": "Blizzard Edge",
        "cost": [
          "Water",
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "200",
        "text": "Discard 2 Energy from this Pokémon."
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
      473
    ],
    "flavorText": "A frozen Mamoswine was dug from ice dating back 10,000 years. This Pokémon has been around a long, long, long time.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/25.png",
      "large": "https://images.pokemontcg.io/me2/25_hires.png"
    }
  },
  {
    "id": "me2-26",
    "name": "Suicune",
    "number": "26",
    "artist": "Takeshi Nakamura",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Crystal Fall",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "30+",
        "text": "If you have at least 4 Water Energy in play, this attack does 90 more damage."
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
      245
    ],
    "flavorText": "Said to be the embodiment of north winds, it can instantly purify filthy, murky water.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/26.png",
      "large": "https://images.pokemontcg.io/me2/26_hires.png"
    }
  },
  {
    "id": "me2-27",
    "name": "Piplup",
    "number": "27",
    "artist": "Hideki Ishikawa",
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
      "Prinplup"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Call for Support",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Supporter card, reveal it, and put it into your hand. Then, shuffle your deck."
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
      393
    ],
    "flavorText": "A poor walker, it often falls down. However, its strong pride makes it puff up its chest without a care.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/27.png",
      "large": "https://images.pokemontcg.io/me2/27_hires.png"
    }
  },
  {
    "id": "me2-28",
    "name": "Prinplup",
    "number": "28",
    "artist": "Atsuya Uki",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
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
        "name": "Peck",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": ""
      },
      {
        "name": "Targeted Dive",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 70 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      394
    ],
    "flavorText": "It lives a solitary life. Its wings deliver wicked blows that can snap even the thickest of trees in half with a single hit.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/28.png",
      "large": "https://images.pokemontcg.io/me2/28_hires.png"
    }
  },
  {
    "id": "me2-29",
    "name": "Rotom ex",
    "number": "29",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "190",
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
        "name": "Multi Adapter",
        "text": "Each of your Pokémon that has \"Rotom\" in its name may have up to 2 Pokémon Tool cards attached. If this Ability goes away, discard Pokémon Tools from those Pokémon until only 1 remains on each.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Thunderbolt",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "130",
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
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      479
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/29.png",
      "large": "https://images.pokemontcg.io/me2/29_hires.png"
    }
  },
  {
    "id": "me2-30",
    "name": "Yamper",
    "number": "30",
    "artist": "Ayako Ozaki",
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
      "Boltund"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Play Rough",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
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
      835
    ],
    "flavorText": "This gluttonous Pokémon only assists people with their work because it wants treats. As it runs, it crackles with electricity.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/30.png",
      "large": "https://images.pokemontcg.io/me2/30_hires.png"
    }
  },
  {
    "id": "me2-31",
    "name": "Boltund",
    "number": "31",
    "artist": "Orca",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Yamper",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Electric Run",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70+",
        "text": "Flip a coin. If heads, this attack does 70 more damage."
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
      836
    ],
    "flavorText": "It sends electricity through its legs to boost their strength. Running at top speed, it easily breaks 50 mph.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/31.png",
      "large": "https://images.pokemontcg.io/me2/31_hires.png"
    }
  },
  {
    "id": "me2-32",
    "name": "Pawmi",
    "number": "32",
    "artist": "Shimaris Yukichi",
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
        "name": "Growl",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, attacks used by the Defending Pokémon do 30 less damage (before applying Weakness and Resistance)."
      },
      {
        "name": "Tiny Charge",
        "cost": [
          "Lightning"
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
      921
    ],
    "flavorText": "It has underdeveloped electric sacs on its cheeks. These sacs can produce electricity only if Pawmi rubs them furiously with the pads on its forepaws.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/32.png",
      "large": "https://images.pokemontcg.io/me2/32_hires.png"
    }
  },
  {
    "id": "me2-33",
    "name": "Pawmo",
    "number": "33",
    "artist": "Taiga Kayama",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Pawmi",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Electric Punch",
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
      922
    ],
    "flavorText": "When its group is attacked, Pawmo is the first to leap into battle, defeating enemies with a fighting technique that utilizes electric shocks.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/33.png",
      "large": "https://images.pokemontcg.io/me2/33_hires.png"
    }
  },
  {
    "id": "me2-34",
    "name": "Pawmot",
    "number": "34",
    "artist": "satoma",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Lightning"
    ],
    "evolvesFrom": "Pawmo",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Voltaic Fist",
        "cost": [
          "Lightning",
          "Lightning"
        ],
        "convertedEnergyCost": 2,
        "damage": "130",
        "text": "You may have this Pokémon also do 60 damage to itself and make your opponent's Active Pokémon Paralyzed."
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
      923
    ],
    "flavorText": "This Pokémon normally is slow to react, but once it enters battle, it will strike down its enemies with lightning-fast movements.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/34.png",
      "large": "https://images.pokemontcg.io/me2/34_hires.png"
    }
  },
  {
    "id": "me2-35",
    "name": "Misdreavus",
    "number": "35",
    "artist": "Mousho",
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
      "Mismagius"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Petty Grudge",
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
      200
    ],
    "flavorText": "This Pokémon startles people in the middle of the night. It gathers fear as its energy.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/35.png",
      "large": "https://images.pokemontcg.io/me2/35_hires.png"
    }
  },
  {
    "id": "me2-36",
    "name": "Mismagius ex",
    "number": "36",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "260",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Misdreavus",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Swirling Prose",
        "text": "As long as this Pokémon is in the Active Spot, whenever your opponent's Active Pokémon moves to the Bench during their turn, their new Active Pokémon is now Confused.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hexa-Magic",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "150",
        "text": "You may draw cards until you have 6 cards in your hand."
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
      429
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/36.png",
      "large": "https://images.pokemontcg.io/me2/36_hires.png"
    }
  },
  {
    "id": "me2-37",
    "name": "Snubbull",
    "number": "37",
    "artist": "Gapao",
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
      "Granbull"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tackle",
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
      209
    ],
    "flavorText": "In truth, it is a cowardly Pokémon. It growls eagerly in order to hide its fear from its opponent.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/37.png",
      "large": "https://images.pokemontcg.io/me2/37_hires.png"
    }
  },
  {
    "id": "me2-38",
    "name": "Granbull",
    "number": "38",
    "artist": "Ryuta Fuse",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Snubbull",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bite",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Finishing Blow",
        "cost": [
          "Psychic",
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "If your opponent's Active Pokémon already has any damage counters on it, this attack does 90 more damage."
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
      210
    ],
    "flavorText": "It is actually timid and easily spooked. If attacked, it desperately flails its limbs about in an attempt to repel its opponent.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/38.png",
      "large": "https://images.pokemontcg.io/me2/38_hires.png"
    }
  },
  {
    "id": "me2-39",
    "name": "Cresselia",
    "number": "39",
    "artist": "Raita Kazama",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "120",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Swelling Light",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Psychic Energy cards and attach them to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Aurora Beam",
        "cost": [
          "Psychic",
          "Psychic",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      488
    ],
    "flavorText": "Shiny particles are released from its wings like a veil. It is said to represent the crescent moon.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/39.png",
      "large": "https://images.pokemontcg.io/me2/39_hires.png"
    }
  },
  {
    "id": "me2-40",
    "name": "Meloetta",
    "number": "40",
    "artist": "MINAMINAMI Take",
    "rarity": "Uncommon",
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
        "name": "Soothing Melody",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Heal 120 damage from 1 of your Benched Psychic Pokémon."
      },
      {
        "name": "Magical Shot",
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
      648
    ],
    "flavorText": "Its melodies are sung with a special vocalization method that can control the feelings of those who hear it.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/40.png",
      "large": "https://images.pokemontcg.io/me2/40_hires.png"
    }
  },
  {
    "id": "me2-41",
    "name": "Mega Diancie ex",
    "number": "41",
    "artist": "aky CG Works",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "270",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Diamond Coat",
        "text": "This Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Garland Ray",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "120×",
        "text": "Discard up to 2 Energy cards from this Pokémon, and this attack does 120 damage for each card you discarded in this way."
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
      719
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/41.png",
      "large": "https://images.pokemontcg.io/me2/41_hires.png"
    }
  },
  {
    "id": "me2-42",
    "name": "Mimikyu",
    "number": "42",
    "artist": "miki kudo",
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
        "name": "Call for Family",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Basic Pokémon and put it onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Scratch",
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
      778
    ],
    "flavorText": "This Pokémon lives in dark places untouched by sunlight. When it appears before humans, it hides itself under a cloth that resembles a Pikachu.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/42.png",
      "large": "https://images.pokemontcg.io/me2/42_hires.png"
    }
  },
  {
    "id": "me2-43",
    "name": "Milcery",
    "number": "43",
    "artist": "Taiga Kayama",
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
        "name": "Draining Kiss",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
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
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      868
    ],
    "flavorText": "The more sweet aromas it absorbs, the more its body swells. Milcery will deflate when its energy level drops.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/43.png",
      "large": "https://images.pokemontcg.io/me2/43_hires.png"
    }
  },
  {
    "id": "me2-44",
    "name": "Alcremie",
    "number": "44",
    "artist": "Narumi Sato",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Milcery",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sweet Circle",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "This attack does 20 damage for each of your Pokémon in play."
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
      869
    ],
    "flavorText": "Desserts that Alcremie have decorated with their cream have a rich, sweet flavor and bring happiness to all who eat them.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/44.png",
      "large": "https://images.pokemontcg.io/me2/44_hires.png"
    }
  },
  {
    "id": "me2-45",
    "name": "Zacian",
    "number": "45",
    "artist": "kawayoo",
    "rarity": "Rare",
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
        "name": "Limit Break",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50+",
        "text": "If your opponent has 3 or fewer Prize cards remaining, this attack does 90 more damage."
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
      888
    ],
    "flavorText": "Able to cut down anything with a single strike, it became known as the Fairy King's Sword, and it inspired awe in friend and foe alike.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/45.png",
      "large": "https://images.pokemontcg.io/me2/45_hires.png"
    }
  },
  {
    "id": "me2-46",
    "name": "Bramblin",
    "number": "46",
    "artist": "Takeshi Nakamura",
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
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sneaky Placement",
        "cost": [
          "Psychic"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Place 1 damage counter on 1 of your opponent's Pokémon."
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
      946
    ],
    "flavorText": "A soul unable to move on to the afterlife was blown around by the wind until it got tangled up with dried grass and became a Pokémon.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/46.png",
      "large": "https://images.pokemontcg.io/me2/46_hires.png"
    }
  },
  {
    "id": "me2-47",
    "name": "Brambleghast",
    "number": "47",
    "artist": "Tetsu Kayama",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Bramblin",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Prison Panic",
        "text": "Once during your turn, when you play this Pokémon from your hand to evolve 1 of your Pokémon, you may use this Ability. Make your opponent's Active Pokémon Confused.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Psychic Sphere",
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      947
    ],
    "flavorText": "It will open the branches of its head to envelop its prey. Once it absorbs all the life energy it needs, it expels the prey and discards it.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/47.png",
      "large": "https://images.pokemontcg.io/me2/47_hires.png"
    }
  },
  {
    "id": "me2-48",
    "name": "Paldean Tauros",
    "number": "48",
    "artist": "Souichirou Gunjima",
    "rarity": "Uncommon",
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
        "name": "Raging Charge",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "40×",
        "text": "This attack does 40 damage for each of your Pokémon that has \"Tauros\" in its name that has any damage counters on it."
      },
      {
        "name": "Double-Edge",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "70",
        "text": "This Pokémon also does 20 damage to itself."
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
      128
    ],
    "flavorText": "This Pokémon has a muscular body and excels at close-quarters combat. It uses its short horns to strike the opponent's weak spots.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/48.png",
      "large": "https://images.pokemontcg.io/me2/48_hires.png"
    }
  },
  {
    "id": "me2-49",
    "name": "Gligar",
    "number": "49",
    "artist": "Kazumasa Yasukuni",
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
      "Gliscor"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Jab",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Your opponent's Active Pokémon is now Poisoned."
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
      207
    ],
    "flavorText": "It builds its nest on a steep cliff. When it is done gliding, it hops along the ground back to its nest.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/49.png",
      "large": "https://images.pokemontcg.io/me2/49_hires.png"
    }
  },
  {
    "id": "me2-50",
    "name": "Gliscor",
    "number": "50",
    "artist": "Dsuke",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Gligar",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Poison Ring",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "50",
        "text": "Your opponent's Active Pokémon is now Poisoned. During your opponent's next turn, that Pokémon can't retreat."
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
      472
    ],
    "flavorText": "If it succeeds in catching even a faint breeze properly, it can circle the globe without flapping once.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/50.png",
      "large": "https://images.pokemontcg.io/me2/50_hires.png"
    }
  },
  {
    "id": "me2-51",
    "name": "Trapinch",
    "number": "51",
    "artist": "Uta",
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
      "Vibrava"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Double Headbutt",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 2 coins. This attack does 10 damage for each heads."
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
      328
    ],
    "flavorText": "This Pokémon lives in arid deserts. It patiently awaits prey inside its funnel- shaped nest.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/51.png",
      "large": "https://images.pokemontcg.io/me2/51_hires.png"
    }
  },
  {
    "id": "me2-52",
    "name": "Vibrava",
    "number": "52",
    "artist": "Miki Tanaka",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
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
        "name": "Super Vibration",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
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
      329
    ],
    "flavorText": "Rather than using its underdeveloped wings for flight, it rubs them together, emitting ultrasonic waves to attack its enemies.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/52.png",
      "large": "https://images.pokemontcg.io/me2/52_hires.png"
    }
  },
  {
    "id": "me2-53",
    "name": "Flygon",
    "number": "53",
    "artist": "Jerky",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Vibrava",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Sandy Flapping",
        "text": "Once during your turn, when you play this Pokémon from your hand to evolve 1 of your Pokémon, you may use this Ability. You may also use this Ability if this Pokémon is in the Active Spot and is Knocked Out by damage from an attack from your opponent's Pokémon. Discard the top 2 cards of your opponent's deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Cutting Wind",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "130",
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
      330
    ],
    "flavorText": "Known as the Desert Spirit, this Pokémon hides in the sandstorms it causes by beating its wings.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/53.png",
      "large": "https://images.pokemontcg.io/me2/53_hires.png"
    }
  },
  {
    "id": "me2-54",
    "name": "Gastly",
    "number": "54",
    "artist": "Saboteri",
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
      "Haunter"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Petty Grudge",
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
      92
    ],
    "flavorText": "It wraps its opponent in its gas-like body, slowly weakening its prey by poisoning it through the skin.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/54.png",
      "large": "https://images.pokemontcg.io/me2/54_hires.png"
    }
  },
  {
    "id": "me2-55",
    "name": "Haunter",
    "number": "55",
    "artist": "Rianti Hidayat",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Gastly",
    "evolvesTo": [
      "Gengar"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Spooky Shot",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
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
      93
    ],
    "flavorText": "It likes to lurk in the dark and tap shoulders with a gaseous hand. Its touch causes endless shuddering.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/55.png",
      "large": "https://images.pokemontcg.io/me2/55_hires.png"
    }
  },
  {
    "id": "me2-56",
    "name": "Mega Gengar ex",
    "number": "56",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "350",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Haunter",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [
      {
        "name": "Shadowy Concealment",
        "text": "If 1 of your Darkness Pokémon is Knocked Out by damage from an attack from your opponent's Pokémon ex, that player takes 1 fewer Prize card. The effect of Shadowy Concealment doesn't stack.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Void Gale",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "230",
        "text": "Move an Energy from this Pokémon to 1 of your Benched Pokémon."
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
      94
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/56.png",
      "large": "https://images.pokemontcg.io/me2/56_hires.png"
    }
  },
  {
    "id": "me2-57",
    "name": "Murkrow",
    "number": "57",
    "artist": "Tomokazu Komiya",
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
      "Honchkrow"
    ],
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
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/57.png",
      "large": "https://images.pokemontcg.io/me2/57_hires.png"
    }
  },
  {
    "id": "me2-58",
    "name": "Honchkrow",
    "number": "58",
    "artist": "Anesaki Dynamic",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Murkrow",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wind of Darkness",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Sniping Feathers",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard 2 Energy from this Pokémon, and this attack does 120 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      430
    ],
    "flavorText": "It is merciless by nature. It is said that it never forgives the mistakes of its Murkrow followers.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/58.png",
      "large": "https://images.pokemontcg.io/me2/58_hires.png"
    }
  },
  {
    "id": "me2-59",
    "name": "Sableye",
    "number": "59",
    "artist": "osare",
    "rarity": "Common",
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
    "abilities": [],
    "attacks": [
      {
        "name": "Cocky Claw",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "20+",
        "text": "If you have any Stage 2 Darkness Pokémon on your Bench, this attack does 70 more damage."
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
      302
    ],
    "flavorText": "It dwells in the darkness of caves. It uses its sharp claws to dig up gems to nourish itself.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/59.png",
      "large": "https://images.pokemontcg.io/me2/59_hires.png"
    }
  },
  {
    "id": "me2-60",
    "name": "Carvanha",
    "number": "60",
    "artist": "Shin Nagasawa",
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
      "Sharpedo"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Reckless Charge",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "This Pokémon also does 10 damage to itself."
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
      318
    ],
    "flavorText": "These Pokémon have sharp fangs and powerful jaws. Sailors avoid Carvanha dens at all costs.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/60.png",
      "large": "https://images.pokemontcg.io/me2/60_hires.png"
    }
  },
  {
    "id": "me2-61",
    "name": "Mega Sharpedo ex",
    "number": "61",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Carvanha",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Greedy Fang",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "70",
        "text": "Draw 2 cards."
      },
      {
        "name": "Hungry Jaws",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "120+",
        "text": "If this Pokémon has any damage counters on it, this attack does 150 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      319
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/61.png",
      "large": "https://images.pokemontcg.io/me2/61_hires.png"
    }
  },
  {
    "id": "me2-62",
    "name": "Seviper",
    "number": "62",
    "artist": "hncl",
    "rarity": "Uncommon",
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
    "abilities": [
      {
        "name": "Excited Power",
        "text": "If you have any Darkness Mega Evolution Pokémon ex in play, attacks used by this Pokémon do 120 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Pitch-Black Fangs",
        "cost": [
          "Darkness",
          "Darkness",
          "Darkness"
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
      336
    ],
    "flavorText": "It sharpens its swordlike tail on hard rocks. It hides in tall grass and strikes unwary prey with venomous fangs.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/62.png",
      "large": "https://images.pokemontcg.io/me2/62_hires.png"
    }
  },
  {
    "id": "me2-63",
    "name": "Absol",
    "number": "63",
    "artist": "Takumi Wada",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Allure",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw 2 cards."
      },
      {
        "name": "Dark Cutter",
        "cost": [
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
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
      359
    ],
    "flavorText": "Because of this Pokémon's ability to detect danger, people mistook Absol as a bringer of doom.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/63.png",
      "large": "https://images.pokemontcg.io/me2/63_hires.png"
    }
  },
  {
    "id": "me2-64",
    "name": "Sandile",
    "number": "64",
    "artist": "Taiga Kasai",
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
      "Krokorok"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ram",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": ""
      },
      {
        "name": "Rear Kick",
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
      551
    ],
    "flavorText": "It submerges itself in sand and moves as if swimming. This wise behavior keeps its enemies from finding it and maintains its temperature.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/64.png",
      "large": "https://images.pokemontcg.io/me2/64_hires.png"
    }
  },
  {
    "id": "me2-65",
    "name": "Krokorok",
    "number": "65",
    "artist": "Uninori",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Sandile",
    "evolvesTo": [
      "Krookodile"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Bite",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Confront",
        "cost": [
          "Darkness",
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
      552
    ],
    "flavorText": "Protected by thin membranes, their eyes can see even in the dead of night. They live in groups of a few individuals.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/65.png",
      "large": "https://images.pokemontcg.io/me2/65_hires.png"
    }
  },
  {
    "id": "me2-66",
    "name": "Krookodile",
    "number": "66",
    "artist": "Ryuta Fuse",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "170",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Krokorok",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Vengeful Fang",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "60+",
        "text": "If any of your Pokémon were Knocked Out by damage from an attack during your opponent's last turn, this attack does 160 more damage."
      },
      {
        "name": "Hammer In",
        "cost": [
          "Darkness",
          "Colorless",
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
      553
    ],
    "flavorText": "After clamping down with its powerful jaws, it twists its body around to rip its prey in half.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/66.png",
      "large": "https://images.pokemontcg.io/me2/66_hires.png"
    }
  },
  {
    "id": "me2-67",
    "name": "Toxel",
    "number": "67",
    "artist": "OKACHEKE",
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
      "Toxtricity"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Call for Family",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Basic Pokémon and put them onto your Bench. Then, shuffle your deck."
      },
      {
        "name": "Playful Kick",
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
      848
    ],
    "flavorText": "It has no problem drinking dirty water. An organ inside Toxel's body filters such water into a poisonous liquid that is harmless to Toxel.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/67.png",
      "large": "https://images.pokemontcg.io/me2/67_hires.png"
    }
  },
  {
    "id": "me2-68",
    "name": "Toxtricity",
    "number": "68",
    "artist": "DOM",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Toxel",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Sinister Surge",
        "text": "Once during your turn, you may use this Ability. Search your deck for a Basic Darkness Energy card and attach it to 1 of your Benched Darkness Pokémon. Then, shuffle your deck. If you attached Energy to a Pokémon in this way, place 2 damage counters on that Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Gentle Slap",
        "cost": [
          "Darkness",
          "Darkness",
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
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      849
    ],
    "flavorText": "As it scatters toxic sweat and emits electricity, a melody that sounds like it came from a guitar reverberates through the surrounding area.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/68.png",
      "large": "https://images.pokemontcg.io/me2/68_hires.png"
    }
  },
  {
    "id": "me2-69",
    "name": "Eternatus",
    "number": "69",
    "artist": "akagi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "150",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Shatter",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "Discard a Stadium in play."
      },
      {
        "name": "Power Rush",
        "cost": [
          "Darkness",
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
        "text": "Flip a coin. If tails, during your next turn, this Pokémon can't use attacks."
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
      890
    ],
    "flavorText": "The core on its chest absorbs energy emanating from the lands of the Galar region. This energy is what allows Eternatus to stay active.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/69.png",
      "large": "https://images.pokemontcg.io/me2/69_hires.png"
    }
  },
  {
    "id": "me2-70",
    "name": "Empoleon ex",
    "number": "70",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "320",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Prinplup",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Emperor's Stance",
        "text": "Prevent all effects of attacks used by your opponent's Pokémon done to this Pokémon. (Damage is not an effect.)",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Iron Feathers",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "210",
        "text": "During your opponent's next turn, this Pokémon takes 60 less damage from attacks (after applying Weakness and Resistance)."
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
      395
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/70.png",
      "large": "https://images.pokemontcg.io/me2/70_hires.png"
    }
  },
  {
    "id": "me2-71",
    "name": "Bronzor",
    "number": "71",
    "artist": "OKUBO",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Bronzong"
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
        "text": "Flip a coin. If heads, during your opponent's next turn, prevent all damage done to this Pokémon by attacks."
      },
      {
        "name": "Rollout",
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
      436
    ],
    "flavorText": "Ancient people believed that the pattern on Bronzor's back contained a mysterious power.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/71.png",
      "large": "https://images.pokemontcg.io/me2/71_hires.png"
    }
  },
  {
    "id": "me2-72",
    "name": "Bronzong",
    "number": "72",
    "artist": "Masako Tomii",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Bronzor",
    "evolvesTo": [],
    "rules": [],
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
        "name": "Tool Drop",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "40×",
        "text": "This attack does 40 damage for each Pokémon Tool attached to all Pokémon."
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
      437
    ],
    "flavorText": "In ages past, this Pokémon was revered as a bringer of rain. It was found buried in the ground.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/72.png",
      "large": "https://images.pokemontcg.io/me2/72_hires.png"
    }
  },
  {
    "id": "me2-73",
    "name": "Togedemaru",
    "number": "73",
    "artist": "Bun Toujo",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Find a Friend",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Pokémon, reveal it, and put it into your hand. Then, shuffle your deck."
      },
      {
        "name": "Gnaw",
        "cost": [
          "Metal"
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
        "type": "Grass",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      777
    ],
    "flavorText": "When it's in trouble, it curls up into a ball, makes its fur spikes stand on end, and then discharges electricity indiscriminately.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/73.png",
      "large": "https://images.pokemontcg.io/me2/73_hires.png"
    }
  },
  {
    "id": "me2-74",
    "name": "Duraludon",
    "number": "74",
    "artist": "Shinji Kanda",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "130",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hyper Beam",
        "cost": [
          "Metal",
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "Discard an Energy from your opponent's Active Pokémon."
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
      884
    ],
    "flavorText": "Duraludon's body is comprised of a special metal that's lightweight and scratch resistant. It's also smooth, as though it was given a mirror finish.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/74.png",
      "large": "https://images.pokemontcg.io/me2/74_hires.png"
    }
  },
  {
    "id": "me2-75",
    "name": "Archaludon",
    "number": "75",
    "artist": "toriyufu",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "180",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Duraludon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Coated Attack",
        "cost": [
          "Metal",
          "Metal",
          "Metal"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "During your opponent's next turn, prevent all damage done to this Pokémon by attacks from Basic Pokémon."
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
      1018
    ],
    "flavorText": "It gathers static electricity from its surroundings. The beams it launches when down on all fours are tremendously powerful.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/75.png",
      "large": "https://images.pokemontcg.io/me2/75_hires.png"
    }
  },
  {
    "id": "me2-76",
    "name": "Jigglypuff",
    "number": "76",
    "artist": "Naoyo Kimura",
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
      "Wigglytuff"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ball Roll",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20×",
        "text": "Flip a coin until you get tails. This attack does 20 damage for each heads."
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
      39
    ],
    "flavorText": "When its huge eyes waver, it sings a mysteriously soothing melody that lulls its enemies to sleep.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/76.png",
      "large": "https://images.pokemontcg.io/me2/76_hires.png"
    }
  },
  {
    "id": "me2-77",
    "name": "Wigglytuff",
    "number": "77",
    "artist": "En Morikura",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Jigglypuff",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Round",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40×",
        "text": "This attack does 40 damage for each of your Pokémon in play that has the Round attack."
      },
      {
        "name": "Seismic Toss",
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
      40
    ],
    "flavorText": "It has a very fine fur. Take care not to make it angry, or it may inflate steadily and hit with a body slam.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/77.png",
      "large": "https://images.pokemontcg.io/me2/77_hires.png"
    }
  },
  {
    "id": "me2-78",
    "name": "Aipom",
    "number": "78",
    "artist": "Saboteri",
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
      "Ambipom"
    ],
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
        "text": "Choose a random card from your opponent's hand, and your opponent reveals that card and shuffles it into their deck."
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
      190
    ],
    "flavorText": "It lives atop tall trees. When leaping from branch to branch, it deftly uses its tail for balance.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/78.png",
      "large": "https://images.pokemontcg.io/me2/78_hires.png"
    }
  },
  {
    "id": "me2-79",
    "name": "Ambipom",
    "number": "79",
    "artist": "hncl",
    "rarity": "Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Aipom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Slap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Dual Tail",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard 2 Energy from this Pokémon, and this attack does 60 damage to each of 2 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      424
    ],
    "flavorText": "They live on large trees. They are said to communicate by connecting their tails to those of others.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/79.png",
      "large": "https://images.pokemontcg.io/me2/79_hires.png"
    }
  },
  {
    "id": "me2-80",
    "name": "Smeargle",
    "number": "80",
    "artist": "REND",
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
        "name": "Energizing Sketch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Flip 3 coins. Attach an amount of Basic Energy up to the number of heads from your discard pile to your Benched Pokémon in any way you like."
      },
      {
        "name": "Hook",
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
      235
    ],
    "flavorText": "Once a Smeargle reaches adulthood, it will have other members of its species leave paw prints on its back.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/80.png",
      "large": "https://images.pokemontcg.io/me2/80_hires.png"
    }
  },
  {
    "id": "me2-81",
    "name": "Zigzagoon",
    "number": "81",
    "artist": "Dsuke",
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
      "Linoone"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Surprise Attack",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Flip a coin. If tails, this attack does nothing."
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
      263
    ],
    "flavorText": "A Pokémon with abundant curiosity. It shows an interest in everything, so it always zigzags.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/81.png",
      "large": "https://images.pokemontcg.io/me2/81_hires.png"
    }
  },
  {
    "id": "me2-82",
    "name": "Linoone",
    "number": "82",
    "artist": "nagimiso",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Zigzagoon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Excited Dash",
        "text": "Once during your turn, if this Pokémon is on your Bench, and if you have any Mega Evolution Pokémon ex in play, you may use this Ability. Switch this Pokémon with your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Slash",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
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
      264
    ],
    "flavorText": "It uses its explosive speed and razor-sharp claws to bring down prey. Running along winding paths is not its strong suit.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/82.png",
      "large": "https://images.pokemontcg.io/me2/82_hires.png"
    }
  },
  {
    "id": "me2-83",
    "name": "Buneary",
    "number": "83",
    "artist": "tono",
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
      "Lopunny"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Run Around",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Kick",
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
      427
    ],
    "flavorText": "Buneary can attack by rolling up their ears and then striking with the force created by unrolling them. This attack becomes stronger with training.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/83.png",
      "large": "https://images.pokemontcg.io/me2/83_hires.png"
    }
  },
  {
    "id": "me2-84",
    "name": "Mega Lopunny ex",
    "number": "84",
    "artist": "5ban Graphics",
    "rarity": "Double Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Buneary",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Gale Thrust",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "60+",
        "text": "If this Pokémon moved from your Bench to the Active Spot this turn, this attack does 170 more damage."
      },
      {
        "name": "Spiky Hopper",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "160",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      428
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/84.png",
      "large": "https://images.pokemontcg.io/me2/84_hires.png"
    }
  },
  {
    "id": "me2-85",
    "name": "Battle Cage",
    "number": "85",
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
      "Prevent all damage counters from being placed on Benched Pokémon (both yours and your opponent's) by effects of attacks and Abilities from the opponent's Pokémon. (Damage from attacks is still taken.)",
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
      "small": "https://images.pokemontcg.io/me2/85.png",
      "large": "https://images.pokemontcg.io/me2/85_hires.png"
    }
  },
  {
    "id": "me2-86",
    "name": "Blowtorch",
    "number": "86",
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
      "You can use this card only if you discard a Basic Fire Energy card from your hand.  Discard a Pokémon Tool or Special Energy card from 1 of your opponent's Pokémon, or discard a Stadium in play.",
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
      "small": "https://images.pokemontcg.io/me2/86.png",
      "large": "https://images.pokemontcg.io/me2/86_hires.png"
    }
  },
  {
    "id": "me2-87",
    "name": "Dawn",
    "number": "87",
    "artist": "Yuu Nishida",
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
      "Search your deck for a Basic Pokémon, a Stage 1 Pokémon, and a Stage 2 Pokémon, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/me2/87.png",
      "large": "https://images.pokemontcg.io/me2/87_hires.png"
    }
  },
  {
    "id": "me2-88",
    "name": "Dizzying Valley",
    "number": "88",
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
      "Confused Pokémon (both yours and your opponent's) don't recover from that Special Condition when they evolve or devolve.",
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
      "small": "https://images.pokemontcg.io/me2/88.png",
      "large": "https://images.pokemontcg.io/me2/88_hires.png"
    }
  },
  {
    "id": "me2-89",
    "name": "Firebreather",
    "number": "89",
    "artist": "Naoki Saito",
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
      "Search your deck for up to 7 Basic Fire Energy cards, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/me2/89.png",
      "large": "https://images.pokemontcg.io/me2/89_hires.png"
    }
  },
  {
    "id": "me2-90",
    "name": "Grimsley's Move",
    "number": "90",
    "artist": "GIDORA",
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
      "Look at the top 7 cards of your deck and put a Darkness Pokémon you find there onto your Bench. Shuffle the other cards and put them on the bottom of your deck. You can't use this card during your first turn.",
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
      "small": "https://images.pokemontcg.io/me2/90.png",
      "large": "https://images.pokemontcg.io/me2/90_hires.png"
    }
  },
  {
    "id": "me2-91",
    "name": "Jumbo Ice Cream",
    "number": "91",
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
      "Heal 80 damage from your Active Pokémon that has 3 or more Energy attached.",
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
      "small": "https://images.pokemontcg.io/me2/91.png",
      "large": "https://images.pokemontcg.io/me2/91_hires.png"
    }
  },
  {
    "id": "me2-92",
    "name": "Punk Helmet",
    "number": "92",
    "artist": "Studio Bora Inc.",
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
      "If the Darkness Pokémon this card is attached to is in the Active Spot and is damaged by an attack from your opponent's Pokémon (even if this Pokémon is Knocked Out), place 4 damage counters on the Attacking Pokémon.",
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
      "small": "https://images.pokemontcg.io/me2/92.png",
      "large": "https://images.pokemontcg.io/me2/92_hires.png"
    }
  },
  {
    "id": "me2-93",
    "name": "Sacred Charm",
    "number": "93",
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
      "The Pokémon this card is attached to takes 30 less damage from attacks from your opponent's Pokémon that have an Ability (after applying Weakness and Resistance).",
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
      "small": "https://images.pokemontcg.io/me2/93.png",
      "large": "https://images.pokemontcg.io/me2/93_hires.png"
    }
  },
  {
    "id": "me2-94",
    "name": "Wondrous Patch",
    "number": "94",
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
      "Attach a Basic Psychic Energy card from your discard pile to 1 of your Benched Psychic Pokémon.",
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
      "small": "https://images.pokemontcg.io/me2/94.png",
      "large": "https://images.pokemontcg.io/me2/94_hires.png"
    }
  },
  {
    "id": "me2-95",
    "name": "Ludicolo",
    "number": "95",
    "artist": "Jerky",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Grass"
    ],
    "evolvesFrom": "Lombre",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Excited Heal",
        "text": "Once during your turn, if you have any Grass Mega Evolution Pokémon ex in play, you may use this Ability. Heal 60 damage from 1 of your Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Lunge Out",
        "cost": [
          "Grass",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
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
      272
    ],
    "flavorText": "There are structures throughout its whole body that produce energy when hit by sound waves with a cheerful rhythm.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/95.png",
      "large": "https://images.pokemontcg.io/me2/95_hires.png"
    }
  },
  {
    "id": "me2-96",
    "name": "Nymble",
    "number": "96",
    "artist": "Nakamura Ippan",
    "rarity": "Illustration Rare",
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
        "name": "Flail Around",
        "cost": [
          "Grass"
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
      919
    ],
    "flavorText": "It has its third set of legs folded up. When it's in a tough spot, this Pokémon jumps over 30 feet using the strength of its legs.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/96.png",
      "large": "https://images.pokemontcg.io/me2/96_hires.png"
    }
  },
  {
    "id": "me2-97",
    "name": "Dewgong",
    "number": "97",
    "artist": "satoma",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Seel",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Thick Fat",
        "text": "This Pokémon takes 30 less damage from attacks from your opponent's Fire or Water Pokémon (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Slam",
        "cost": [
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "70×",
        "text": "Flip 2 coins. This attack does 70 damage for each heads."
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
    "flavorText": "It sleeps under shallow ocean waters during the day, then looks for food at night when it's colder.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/97.png",
      "large": "https://images.pokemontcg.io/me2/97_hires.png"
    }
  },
  {
    "id": "me2-98",
    "name": "Piplup",
    "number": "98",
    "artist": "Jiro Sasumo",
    "rarity": "Illustration Rare",
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
      "Prinplup"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Call for Support",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Supporter card, reveal it, and put it into your hand. Then, shuffle your deck."
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
      393
    ],
    "flavorText": "A poor walker, it often falls down. However, its strong pride makes it puff up its chest without a care.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/98.png",
      "large": "https://images.pokemontcg.io/me2/98_hires.png"
    }
  },
  {
    "id": "me2-99",
    "name": "Yamper",
    "number": "99",
    "artist": "tono",
    "rarity": "Illustration Rare",
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
      "Boltund"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Play Rough",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
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
      835
    ],
    "flavorText": "This gluttonous Pokémon only assists people with their work because it wants treats. As it runs, it crackles with electricity.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/99.png",
      "large": "https://images.pokemontcg.io/me2/99_hires.png"
    }
  },
  {
    "id": "me2-100",
    "name": "Zacian",
    "number": "100",
    "artist": "Yoriyuki Ikegami",
    "rarity": "Illustration Rare",
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
        "name": "Limit Break",
        "cost": [
          "Psychic",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50+",
        "text": "If your opponent has 3 or fewer Prize cards remaining, this attack does 90 more damage."
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
      888
    ],
    "flavorText": "Able to cut down anything with a single strike, it became known as the Fairy King's Sword, and it inspired awe in friend and foe alike.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/100.png",
      "large": "https://images.pokemontcg.io/me2/100_hires.png"
    }
  },
  {
    "id": "me2-101",
    "name": "Flygon",
    "number": "101",
    "artist": "Ryota Murayama",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Fighting"
    ],
    "evolvesFrom": "Vibrava",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Sandy Flapping",
        "text": "Once during your turn, when you play this Pokémon from your hand to evolve 1 of your Pokémon, you may use this Ability. You may also use this Ability if this Pokémon is in the Active Spot and is Knocked Out by damage from an attack from your opponent's Pokémon. Discard the top 2 cards of your opponent's deck.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Cutting Wind",
        "cost": [
          "Fighting",
          "Fighting"
        ],
        "convertedEnergyCost": 2,
        "damage": "130",
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
      330
    ],
    "flavorText": "Known as the Desert Spirit, this Pokémon hides in the sandstorms it causes by beating its wings.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/101.png",
      "large": "https://images.pokemontcg.io/me2/101_hires.png"
    }
  },
  {
    "id": "me2-102",
    "name": "Paldean Wooper",
    "number": "102",
    "artist": "OKACHEKE",
    "rarity": "Illustration Rare",
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
    "flavorText": "It's dangerous for Wooper to travel alone. They line up in groups of three or four and help each other as they walk around the wetlands.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://images.pokemontcg.io/me2/102.png",
      "large": "https://images.pokemontcg.io/me2/102_hires.png"
    }
  },
  {
    "id": "me2-103",
    "name": "Toxtricity",
    "number": "103",
    "artist": "Terada Tera",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "140",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Toxel",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Sinister Surge",
        "text": "Once during your turn, you may use this Ability. Search your deck for a Basic Darkness Energy card and attach it to 1 of your Benched Darkness Pokémon. Then, shuffle your deck. If you attached Energy to a Pokémon in this way, place 2 damage counters on that Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Gentle Slap",
        "cost": [
          "Darkness",
          "Darkness",
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
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      849
    ],
    "flavorText": "As it scatters toxic sweat and emits electricity, a melody that sounds like it came from a guitar reverberates through the surrounding area.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/103.png",
      "large": "https://images.pokemontcg.io/me2/103_hires.png"
    }
  },
  {
    "id": "me2-104",
    "name": "Togedemaru",
    "number": "104",
    "artist": "Orca",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "80",
    "types": [
      "Metal"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Find a Friend",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for a Pokémon, reveal it, and put it into your hand. Then, shuffle your deck."
      },
      {
        "name": "Gnaw",
        "cost": [
          "Metal"
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
        "type": "Grass",
        "value": "-30"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      777
    ],
    "flavorText": "When it's in trouble, it curls up into a ball, makes its fur spikes stand on end, and then discharges electricity indiscriminately.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/104.png",
      "large": "https://images.pokemontcg.io/me2/104_hires.png"
    }
  },
  {
    "id": "me2-105",
    "name": "Wigglytuff",
    "number": "105",
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
    "evolvesFrom": "Jigglypuff",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Round",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "40×",
        "text": "This attack does 40 damage for each of your Pokémon in play that has the Round attack."
      },
      {
        "name": "Seismic Toss",
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
      40
    ],
    "flavorText": "It has a very fine fur. Take care not to make it angry, or it may inflate steadily and hit with a body slam.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/105.png",
      "large": "https://images.pokemontcg.io/me2/105_hires.png"
    }
  },
  {
    "id": "me2-106",
    "name": "Meowth",
    "number": "106",
    "artist": "Uninori",
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
      "Persian"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fury Swipes",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "Flip 3 coins. This attack does 20 damage for each heads."
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
      52
    ],
    "flavorText": "It loves things that sparkle. When it sees a shiny object, the gold coin on its head shines, too.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "H",
    "images": {
      "small": "https://images.pokemontcg.io/me2/106.png",
      "large": "https://images.pokemontcg.io/me2/106_hires.png"
    }
  },
  {
    "id": "me2-107",
    "name": "Ambipom",
    "number": "107",
    "artist": "Shigenori Negishi",
    "rarity": "Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Aipom",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Slap",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": ""
      },
      {
        "name": "Dual Tail",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Discard 2 Energy from this Pokémon, and this attack does 60 damage to each of 2 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      424
    ],
    "flavorText": "They live on large trees. They are said to communicate by connecting their tails to those of others.",
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/107.png",
      "large": "https://images.pokemontcg.io/me2/107_hires.png"
    }
  },
  {
    "id": "me2-108",
    "name": "Mega Heracross ex",
    "number": "108",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "MEGA",
      "ex"
    ],
    "hp": "280",
    "types": [
      "Grass"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Juggernaut Horn",
        "cost": [
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 2,
        "damage": "100+",
        "text": "If this Pokémon was damaged by an attack during your opponent's last turn, this attack does that much more damage."
      },
      {
        "name": "Mountain Ramming",
        "cost": [
          "Grass",
          "Grass",
          "Grass"
        ],
        "convertedEnergyCost": 3,
        "damage": "170",
        "text": "Discard the top 2 cards of your opponent's deck."
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
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/108.png",
      "large": "https://images.pokemontcg.io/me2/108_hires.png"
    }
  },
  {
    "id": "me2-109",
    "name": "Mega Charizard X ex",
    "number": "109",
    "artist": "takuyoa",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "360",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Inferno X",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "90×",
        "text": "Discard any amount of Fire Energy from among your Pokémon, and this attack does 90 damage for each card you discarded in this way."
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
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/109.png",
      "large": "https://images.pokemontcg.io/me2/109_hires.png"
    }
  },
  {
    "id": "me2-110",
    "name": "Oricorio ex",
    "number": "110",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
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
    "abilities": [
      {
        "name": "Excited Turbo",
        "text": "As often as you like during your turn, if you have any Fire Mega Evolution Pokémon ex in play, you may use this Ability. Attach a Basic Fire Energy card from your hand to 1 of your Benched Fire Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Fire Wing",
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
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/110.png",
      "large": "https://images.pokemontcg.io/me2/110_hires.png"
    }
  },
  {
    "id": "me2-111",
    "name": "Rotom ex",
    "number": "111",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "190",
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
        "name": "Multi Adapter",
        "text": "Each of your Pokémon that has \"Rotom\" in its name may have up to 2 Pokémon Tool cards attached. If this Ability goes away, discard Pokémon Tools from those Pokémon until only 1 remains on each.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Thunderbolt",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "130",
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
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      479
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/111.png",
      "large": "https://images.pokemontcg.io/me2/111_hires.png"
    }
  },
  {
    "id": "me2-112",
    "name": "Mismagius ex",
    "number": "112",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "ex"
    ],
    "hp": "260",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": "Misdreavus",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Swirling Prose",
        "text": "As long as this Pokémon is in the Active Spot, whenever your opponent's Active Pokémon moves to the Bench during their turn, their new Active Pokémon is now Confused.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hexa-Magic",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "150",
        "text": "You may draw cards until you have 6 cards in your hand."
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
      429
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/112.png",
      "large": "https://images.pokemontcg.io/me2/112_hires.png"
    }
  },
  {
    "id": "me2-113",
    "name": "Mega Sharpedo ex",
    "number": "113",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Carvanha",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Greedy Fang",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "70",
        "text": "Draw 2 cards."
      },
      {
        "name": "Hungry Jaws",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "120+",
        "text": "If this Pokémon has any damage counters on it, this attack does 150 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      319
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/113.png",
      "large": "https://images.pokemontcg.io/me2/113_hires.png"
    }
  },
  {
    "id": "me2-114",
    "name": "Empoleon ex",
    "number": "114",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "ex"
    ],
    "hp": "320",
    "types": [
      "Metal"
    ],
    "evolvesFrom": "Prinplup",
    "evolvesTo": [],
    "rules": [
      "Pokémon ex rule: When your Pokémon ex is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Emperor's Stance",
        "text": "Prevent all effects of attacks used by your opponent's Pokémon done to this Pokémon. (Damage is not an effect.)",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Iron Feathers",
        "cost": [
          "Metal",
          "Metal",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "210",
        "text": "During your opponent's next turn, this Pokémon takes 60 less damage from attacks (after applying Weakness and Resistance)."
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
      395
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/114.png",
      "large": "https://images.pokemontcg.io/me2/114_hires.png"
    }
  },
  {
    "id": "me2-115",
    "name": "Mega Lopunny ex",
    "number": "115",
    "artist": "5ban Graphics",
    "rarity": "Ultra Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Buneary",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Gale Thrust",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "60+",
        "text": "If this Pokémon moved from your Bench to the Active Spot this turn, this attack does 170 more damage."
      },
      {
        "name": "Spiky Hopper",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "160",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      428
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/115.png",
      "large": "https://images.pokemontcg.io/me2/115_hires.png"
    }
  },
  {
    "id": "me2-116",
    "name": "Battle Cage",
    "number": "116",
    "artist": "MARINA Chikazawa",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Stadium"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Prevent all damage counters from being placed on Benched Pokémon (both yours and your opponent's) by effects of attacks and Abilities from the opponent's Pokémon. (Damage from attacks is still taken.)",
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
      "small": "https://images.pokemontcg.io/me2/116.png",
      "large": "https://images.pokemontcg.io/me2/116_hires.png"
    }
  },
  {
    "id": "me2-117",
    "name": "Blowtorch",
    "number": "117",
    "artist": "Toyste Beach",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can use this card only if you discard a Basic Fire Energy card from your hand.  Discard a Pokémon Tool or Special Energy card from 1 of your opponent's Pokémon, or discard a Stadium in play.",
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
      "small": "https://images.pokemontcg.io/me2/117.png",
      "large": "https://images.pokemontcg.io/me2/117_hires.png"
    }
  },
  {
    "id": "me2-118",
    "name": "Dawn",
    "number": "118",
    "artist": "Yuu Nishida",
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
      "Search your deck for a Basic Pokémon, a Stage 1 Pokémon, and a Stage 2 Pokémon, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/me2/118.png",
      "large": "https://images.pokemontcg.io/me2/118_hires.png"
    }
  },
  {
    "id": "me2-119",
    "name": "Firebreather",
    "number": "119",
    "artist": "Naoki Saito",
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
      "Search your deck for up to 7 Basic Fire Energy cards, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/me2/119.png",
      "large": "https://images.pokemontcg.io/me2/119_hires.png"
    }
  },
  {
    "id": "me2-120",
    "name": "Grimsley's Move",
    "number": "120",
    "artist": "GIDORA",
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
      "Look at the top 7 cards of your deck and put a Darkness Pokémon you find there onto your Bench. Shuffle the other cards and put them on the bottom of your deck. You can't use this card during your first turn.",
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
      "small": "https://images.pokemontcg.io/me2/120.png",
      "large": "https://images.pokemontcg.io/me2/120_hires.png"
    }
  },
  {
    "id": "me2-121",
    "name": "Punk Helmet",
    "number": "121",
    "artist": "Studio Bora Inc.",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "If the Darkness Pokémon this card is attached to is in the Active Spot and is damaged by an attack from your opponent's Pokémon (even if this Pokémon is Knocked Out), place 4 damage counters on the Attacking Pokémon.",
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
      "small": "https://images.pokemontcg.io/me2/121.png",
      "large": "https://images.pokemontcg.io/me2/121_hires.png"
    }
  },
  {
    "id": "me2-122",
    "name": "Sacred Charm",
    "number": "122",
    "artist": "Toyste Beach",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "The Pokémon this card is attached to takes 30 less damage from attacks from your opponent's Pokémon that have an Ability (after applying Weakness and Resistance).",
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
      "small": "https://images.pokemontcg.io/me2/122.png",
      "large": "https://images.pokemontcg.io/me2/122_hires.png"
    }
  },
  {
    "id": "me2-123",
    "name": "Switch",
    "number": "123",
    "artist": "Studio Bora Inc.",
    "rarity": "Ultra Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Switch your Active Pokémon with 1 of your Benched Pokémon.",
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
      "small": "https://images.pokemontcg.io/me2/123.png",
      "large": "https://images.pokemontcg.io/me2/123_hires.png"
    }
  },
  {
    "id": "me2-124",
    "name": "Ignition Energy",
    "number": "124",
    "artist": null,
    "rarity": "Ultra Rare",
    "supertype": "Energy",
    "subtypes": [
      "Special"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "If this card is attached to 1 of your Pokémon, discard it at the end of your turn.  As long as this card is attached to a Pokémon, it provides Colorless Energy.  If this card is attached to an Evolution Pokémon, it provides ColorlessColorlessColorless Energy instead."
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
      "small": "https://images.pokemontcg.io/me2/124.png",
      "large": "https://images.pokemontcg.io/me2/124_hires.png"
    }
  },
  {
    "id": "me2-125",
    "name": "Mega Charizard X ex",
    "number": "125",
    "artist": "danciao",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "360",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Inferno X",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "90×",
        "text": "Discard any amount of Fire Energy from among your Pokémon, and this attack does 90 damage for each card you discarded in this way."
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
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/125.png",
      "large": "https://images.pokemontcg.io/me2/125_hires.png"
    }
  },
  {
    "id": "me2-126",
    "name": "Rotom ex",
    "number": "126",
    "artist": "Yoshimi Miyoshi",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "ex"
    ],
    "hp": "190",
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
        "name": "Multi Adapter",
        "text": "Each of your Pokémon that has \"Rotom\" in its name may have up to 2 Pokémon Tool cards attached. If this Ability goes away, discard Pokémon Tools from those Pokémon until only 1 remains on each.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Thunderbolt",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "130",
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
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      479
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/126.png",
      "large": "https://images.pokemontcg.io/me2/126_hires.png"
    }
  },
  {
    "id": "me2-127",
    "name": "Mega Sharpedo ex",
    "number": "127",
    "artist": "nagimiso",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Carvanha",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Greedy Fang",
        "cost": [
          "Darkness"
        ],
        "convertedEnergyCost": 1,
        "damage": "70",
        "text": "Draw 2 cards."
      },
      {
        "name": "Hungry Jaws",
        "cost": [
          "Darkness",
          "Darkness"
        ],
        "convertedEnergyCost": 2,
        "damage": "120+",
        "text": "If this Pokémon has any damage counters on it, this attack does 150 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Grass",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [],
    "convertedRetreatCost": null,
    "nationalPokedexNumbers": [
      319
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/127.png",
      "large": "https://images.pokemontcg.io/me2/127_hires.png"
    }
  },
  {
    "id": "me2-128",
    "name": "Mega Lopunny ex",
    "number": "128",
    "artist": "Kinu Nishimura",
    "rarity": "Special Illustration Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "MEGA",
      "ex"
    ],
    "hp": "330",
    "types": [
      "Colorless"
    ],
    "evolvesFrom": "Buneary",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Gale Thrust",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "60+",
        "text": "If this Pokémon moved from your Bench to the Active Spot this turn, this attack does 170 more damage."
      },
      {
        "name": "Spiky Hopper",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "160",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      428
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "standard": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/128.png",
      "large": "https://images.pokemontcg.io/me2/128_hires.png"
    }
  },
  {
    "id": "me2-129",
    "name": "Dawn",
    "number": "129",
    "artist": "Atsushi Furusawa",
    "rarity": "Special Illustration Rare",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Search your deck for a Basic Pokémon, a Stage 1 Pokémon, and a Stage 2 Pokémon, reveal them, and put them into your hand. Then, shuffle your deck.",
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
      "small": "https://images.pokemontcg.io/me2/129.png",
      "large": "https://images.pokemontcg.io/me2/129_hires.png"
    }
  },
  {
    "id": "me2-130",
    "name": "Mega Charizard X ex",
    "number": "130",
    "artist": "takuyoa",
    "rarity": "Mega Hyper Rare",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "MEGA",
      "ex"
    ],
    "hp": "360",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "rules": [
      "Mega Evolution ex Rule: When your Mega Evolution Pokémon ex is Knocked Out, your opponent takes 3 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Inferno X",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "90×",
        "text": "Discard any amount of Fire Energy from among your Pokémon, and this attack does 90 damage for each card you discarded in this way."
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
    "regulationMark": "I",
    "images": {
      "small": "https://images.pokemontcg.io/me2/130.png",
      "large": "https://images.pokemontcg.io/me2/130_hires.png"
    }
  }
]

export default cardDetails
