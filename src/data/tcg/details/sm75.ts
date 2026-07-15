import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "sm75-1",
    "name": "Charmander",
    "number": "1",
    "artist": "tetsuya koizumi",
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
      "Charmeleon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fire Fang",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Your opponent's Active Pokémon is now Burned."
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
    "flavorText": "From the time it is born, a flame burns at the tip of its tail. Its life would end if the flame were to go out.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/1.png",
      "large": "https://images.pokemontcg.io/sm75/1_hires.png"
    }
  },
  {
    "id": "sm75-2",
    "name": "Charmeleon",
    "number": "2",
    "artist": "kodama",
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
    "abilities": [
      {
        "name": "Burning Fighter",
        "text": "When you play this Pokémon from your hand to evolve 1 of your Pokémon during your turn, you may discard the top 5 cards of your deck. If any of those cards are Fire Energy cards, attach them to this Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Flamethrower",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80",
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
      5
    ],
    "flavorText": "When it swings its burning tail, it elevates the air temperature to unbearably high levels.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/2.png",
      "large": "https://images.pokemontcg.io/sm75/2_hires.png"
    }
  },
  {
    "id": "sm75-3",
    "name": "Charizard",
    "number": "3",
    "artist": "Ryota Murayama",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Charmeleon",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Resolute Flame",
        "text": "This Pokémon's attacks do 30 more damage to your opponent's Active Pokémon for each of their Pokémon-GX and Pokémon-EX in play.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Fiery Blast",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "130",
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
      6
    ],
    "flavorText": "Its wings can carry this Pokémon close to an altitude of 4,600 feet. It blows out fire at very high temperatures.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/3.png",
      "large": "https://images.pokemontcg.io/sm75/3_hires.png"
    }
  },
  {
    "id": "sm75-4",
    "name": "Torchic",
    "number": "4",
    "artist": "Kouki Saitou",
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
        "name": "Singe",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      255
    ],
    "flavorText": "A fire burns inside, so it feels very warm to hug. It launches fireballs of 1,800 degrees Fahrenheit.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/4.png",
      "large": "https://images.pokemontcg.io/sm75/4_hires.png"
    }
  },
  {
    "id": "sm75-5",
    "name": "Combusken",
    "number": "5",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Torchic",
    "evolvesTo": [
      "Blaziken"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Natural Cure",
        "text": "Whenever you attach an Energy card from your hand to this Pokémon, remove all Special Conditions from it.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Lunge",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "Flip a coin. If tails, this attack does nothing."
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
      256
    ],
    "flavorText": "During a battle, the hot flame in its body increases. Its kicks have outstanding destructive power.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/5.png",
      "large": "https://images.pokemontcg.io/sm75/5_hires.png"
    }
  },
  {
    "id": "sm75-6",
    "name": "Blaziken",
    "number": "6",
    "artist": "Kouki Saitou",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "150",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Combusken",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Firestarter",
        "text": "Once during your turn (before your attack), you may attach a Fire Energy card from your discard pile to 1 of your Benched Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Fire Stream",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Discard a Fire Energy from this Pokémon. This attack does 20 damage to each of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": "When facing a tough foe, it looses flames from its wrists. Its powerful legs let it jump clear over buildings.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/6.png",
      "large": "https://images.pokemontcg.io/sm75/6_hires.png"
    }
  },
  {
    "id": "sm75-7",
    "name": "Victini ◇",
    "number": "7",
    "artist": "Shin Nagasawa",
    "rarity": "Rare Prism Star",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "Prism Star"
    ],
    "hp": "90",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "◇ (Prism Star) Rule: You can't have more than 1 ◇ card with the same name in your deck. If a ◇ card would go to the discard pile, put it in the Lost Zone instead."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Infinity",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "20×",
        "text": "This attack does 20 damage for each basic Energy card in your discard pile. Then, shuffle those cards into your deck."
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
      494
    ],
    "flavorText": "When it shares the infinite energy it creates, that being's entire body will be overflowing with power.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/7.png",
      "large": "https://images.pokemontcg.io/sm75/7_hires.png"
    }
  },
  {
    "id": "sm75-8",
    "name": "Darumaka",
    "number": "8",
    "artist": "Mitsuhiro Arita",
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
      "Darmanitan"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Damage Rush",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "Flip a coin until you get tails. This attack does 30 more damage for each heads."
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
    "flavorText": "When it sleeps, it pulls its limbs into its body and its internal fire goes down to 1,100 degrees Fahrenheit.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/8.png",
      "large": "https://images.pokemontcg.io/sm75/8_hires.png"
    }
  },
  {
    "id": "sm75-9",
    "name": "Darmanitan",
    "number": "9",
    "artist": "Masakazu Fukuda",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "130",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Darumaka",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Heat Assist",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Attach up to 3 Fire Energy cards from your hand to your Pokémon in any way you like."
      },
      {
        "name": "Darmani-Hands",
        "cost": [
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "30+",
        "text": "Flip 4 coins. This attack does 50 more damage for each heads."
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
      555
    ],
    "flavorText": "Its internal fire burns at 2,500 degrees Fahrenheit, making enough power that it can destroy a dump truck with one punch.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/9.png",
      "large": "https://images.pokemontcg.io/sm75/9_hires.png"
    }
  },
  {
    "id": "sm75-10",
    "name": "Heatmor",
    "number": "10",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Singe",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Burned."
      },
      {
        "name": "Charring Breath",
        "cost": [
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 2,
        "damage": "120",
        "text": "If your opponent's Active Pokémon isn't Burned, this attack does nothing."
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
      631
    ],
    "flavorText": "It draws in air through its tail, transforms it into fire, and uses it like a tongue. It melts Durant and eats them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/10.png",
      "large": "https://images.pokemontcg.io/sm75/10_hires.png"
    }
  },
  {
    "id": "sm75-11",
    "name": "Reshiram-GX",
    "number": "11",
    "artist": "PLANETA Otani",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "180",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Flame Charge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Fire Energy cards and attach them to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Scorching Column",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "110",
        "text": "Your opponent's Active Pokémon is now Burned."
      },
      {
        "name": "Vermilion-GX",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "You may attach up to 5 Fire Energy cards from your hand to your Pokémon in any way you like. (You can't use more than 1 GX attack in a game.)"
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/11.png",
      "large": "https://images.pokemontcg.io/sm75/11_hires.png"
    }
  },
  {
    "id": "sm75-12",
    "name": "Litten",
    "number": "12",
    "artist": "Ryota Murayama",
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
      "Torracat"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Fury Swipes",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 3 coins. This attack does 10 damage for each heads."
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
      725
    ],
    "flavorText": "While grooming itself, it builds up fur inside its stomach. It sets the fur alight and spews fiery attacks, which change based on how it coughs.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/12.png",
      "large": "https://images.pokemontcg.io/sm75/12_hires.png"
    }
  },
  {
    "id": "sm75-13",
    "name": "Salandit",
    "number": "13",
    "artist": "MAHOU",
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
      "Salazzle"
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
        "text": "Search your deck for a Basic Pokémon and put it onto your Bench. Then, shuffle your deck."
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
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      757
    ],
    "flavorText": "Volcanoes or dry, craggy places are its home. It emanates a sweet-smelling poisonous gas that attracts bug Pokémon, then attacks them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/13.png",
      "large": "https://images.pokemontcg.io/sm75/13_hires.png"
    }
  },
  {
    "id": "sm75-14",
    "name": "Salazzle",
    "number": "14",
    "artist": "Naoki Saito",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "110",
    "types": [
      "Fire"
    ],
    "evolvesFrom": "Salandit",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Ring of Fire",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Your opponent's Active Pokémon is now Burned. It can't retreat during your opponent's next turn."
      },
      {
        "name": "Flamethrower",
        "cost": [
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "80",
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
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      758
    ],
    "flavorText": "Filled with pheromones, its poisonous gas can be diluted to use in the production of luscious perfumes.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/14.png",
      "large": "https://images.pokemontcg.io/sm75/14_hires.png"
    }
  },
  {
    "id": "sm75-15",
    "name": "Horsea",
    "number": "15",
    "artist": "Yukiko Baba",
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
      "Seadra"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Splatter",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 20 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      116
    ],
    "flavorText": "It makes its nest in the shade of corals. If it senses danger, it spits murky ink and flees.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/15.png",
      "large": "https://images.pokemontcg.io/sm75/15_hires.png"
    }
  },
  {
    "id": "sm75-16",
    "name": "Horsea",
    "number": "16",
    "artist": "Mizue",
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
      "Seadra"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hydro Pump",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "This attack does 10 more damage times the amount of Water Energy attached to this Pokémon."
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
      116
    ],
    "flavorText": "It makes its nest in the shade of corals. If it senses danger, it spits murky ink and flees.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/16.png",
      "large": "https://images.pokemontcg.io/sm75/16_hires.png"
    }
  },
  {
    "id": "sm75-17",
    "name": "Seadra",
    "number": "17",
    "artist": "Yumi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Horsea",
    "evolvesTo": [
      "Kingdra"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Hydro Pump",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "This attack does 20 more damage times the amount of Water Energy attached to this Pokémon."
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
      117
    ],
    "flavorText": "It is capable of swimming backwards by rapidly flapping its winglike pectoral fins and stout tail.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/17.png",
      "large": "https://images.pokemontcg.io/sm75/17_hires.png"
    }
  },
  {
    "id": "sm75-18",
    "name": "Kingdra-GX",
    "number": "18",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "230",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Seadra",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Hydro Pump",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "This attack does 50 more damage times the amount of Water Energy attached to this Pokémon."
      },
      {
        "name": "Reverse Thrust",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Maelstrom-GX",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 40 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) (You can't use more than 1 GX attack in a game.)"
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
      230
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/18.png",
      "large": "https://images.pokemontcg.io/sm75/18_hires.png"
    }
  },
  {
    "id": "sm75-19",
    "name": "Magikarp",
    "number": "19",
    "artist": "Sekio",
    "rarity": "Common",
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
        "text": "Flip a coin. If heads, this attack does 10 more damage."
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
    "flavorText": "Its reckless leaps make it easy pickings for predators. On the bright side, many Pokémon enjoy longer life spans, thanks to Magikarp.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/19.png",
      "large": "https://images.pokemontcg.io/sm75/19_hires.png"
    }
  },
  {
    "id": "sm75-20",
    "name": "Gyarados",
    "number": "20",
    "artist": "kawayoo",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "160",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Magikarp",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Commotion",
        "text": "If this Pokémon is your Active Pokémon and is damaged by an opponent's attack (even if this Pokémon is Knocked Out), put 2 damage counters on each of your Benched Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Wild Tail",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "160",
        "text": "You may discard any Stadium card in play."
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
      130
    ],
    "flavorText": "There are people who swear that any place Gyarados appears is fated for destruction.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/20.png",
      "large": "https://images.pokemontcg.io/sm75/20_hires.png"
    }
  },
  {
    "id": "sm75-21",
    "name": "Lapras",
    "number": "21",
    "artist": "Saya Tsuruta",
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
        "name": "Aqua Bullet",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "This attack does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      },
      {
        "name": "Hydro Pump",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70+",
        "text": "This attack does 10 more damage times the amount of Water Energy attached to this Pokémon."
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
      131
    ],
    "flavorText": "These Pokémon were once near extinction due to poaching. Following protective regulations, there is now an overabundance of them.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/21.png",
      "large": "https://images.pokemontcg.io/sm75/21_hires.png"
    }
  },
  {
    "id": "sm75-22",
    "name": "Totodile",
    "number": "22",
    "artist": "Hironobu Yoshida",
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
      "Croconaw"
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
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      },
      {
        "name": "Fury Swipes",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "10×",
        "text": "Flip 3 coins. This attack does 10 damage for each heads."
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
    "flavorText": "Its powerful, well-developed jaws are capable of crushing anything. Even its Trainer must be careful.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/22.png",
      "large": "https://images.pokemontcg.io/sm75/22_hires.png"
    }
  },
  {
    "id": "sm75-23",
    "name": "Croconaw",
    "number": "23",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
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
        "name": "Tackle",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "Sweep Away",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90",
        "text": "Discard the top 3 cards of your deck."
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
    "flavorText": "Once it bites down, it won't let go until it loses its fangs. New fangs quickly grow into place.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/23.png",
      "large": "https://images.pokemontcg.io/sm75/23_hires.png"
    }
  },
  {
    "id": "sm75-24",
    "name": "Feraligatr",
    "number": "24",
    "artist": "Ken Sugimori",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Croconaw",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Downpour",
        "text": "As often as you like during your turn (before your attack), you may discard a Water Energy card from your hand.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Riptide",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "10+",
        "text": "This attack does 20 more damage for each Water Energy card in your discard pile. Then, shuffle those cards into your deck."
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
    "flavorText": "When it bites with its massive and powerful jaws, it shakes its head and savagely tears its victim up.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/24.png",
      "large": "https://images.pokemontcg.io/sm75/24_hires.png"
    }
  },
  {
    "id": "sm75-25",
    "name": "Wooper",
    "number": "25",
    "artist": "Shibuzoh.",
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
      "Quagsire"
    ],
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
      },
      {
        "name": "Rain Splash",
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
      194
    ],
    "flavorText": "When the temperature cools in the evening, they emerge from water to seek food along the shore.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/25.png",
      "large": "https://images.pokemontcg.io/sm75/25_hires.png"
    }
  },
  {
    "id": "sm75-26",
    "name": "Quagsire",
    "number": "26",
    "artist": "Ken Sugimori",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Wooper",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Wash Out",
        "text": "As often as you like during your turn (before your attack), you may move a Water Energy from 1 of your Benched Pokémon to your Active Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Hydro Pump",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "This attack does 20 more damage times the amount of Water Energy attached to this Pokémon."
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
      195
    ],
    "flavorText": "This carefree Pokémon has an easygoing nature. While swimming, it always bumps into boat hulls.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/26.png",
      "large": "https://images.pokemontcg.io/sm75/26_hires.png"
    }
  },
  {
    "id": "sm75-27",
    "name": "Corsola",
    "number": "27",
    "artist": "Kagemaru Himeno",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "90",
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
        "name": "Bubble Shoot",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 20 damage times the amount of Water Energy attached to this Pokémon to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      222
    ],
    "flavorText": "Pursued by Mareanie for the branches on its head, this Pokémon will sometimes snap its own branches off as a diversion while it escapes.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/27.png",
      "large": "https://images.pokemontcg.io/sm75/27_hires.png"
    }
  },
  {
    "id": "sm75-28",
    "name": "Feebas",
    "number": "28",
    "artist": "Shin Nagasawa",
    "rarity": "Common",
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
      "Milotic"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Submerge",
        "text": "As long as this Pokémon is on your Bench, prevent all damage done to this Pokémon by attacks (both yours and your opponent's).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rain Splash",
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
      349
    ],
    "flavorText": "Although unattractive and unpopular, this Pokémon's marvelous vitality has made it a subject of research.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/28.png",
      "large": "https://images.pokemontcg.io/sm75/28_hires.png"
    }
  },
  {
    "id": "sm75-29",
    "name": "Milotic",
    "number": "29",
    "artist": "hatachu",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "120",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Feebas",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Aurora Wave",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Confused."
      },
      {
        "name": "Aqua Split",
        "cost": [
          "Water",
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 3,
        "damage": "40",
        "text": "This attack does 40 damage to 2 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
      350
    ],
    "flavorText": "It lives at the bottom of clear lakes. In times of war, it shows itself, which soothes people's minds and hearts.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/29.png",
      "large": "https://images.pokemontcg.io/sm75/29_hires.png"
    }
  },
  {
    "id": "sm75-30",
    "name": "Phione",
    "number": "30",
    "artist": "kawayoo",
    "rarity": "Uncommon",
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
        "name": "Murmurs of the Sea",
        "text": "Your Water Pokémon can't be Confused. If those Pokémon are already Confused, remove that Special Condition.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Water Pulse",
        "cost": [
          "Water",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": "Your opponent's Active Pokémon is now Asleep."
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
      489
    ],
    "flavorText": "It drifts in warm seas. It always returns to where it was born, no matter how far it may have drifted.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/30.png",
      "large": "https://images.pokemontcg.io/sm75/30_hires.png"
    }
  },
  {
    "id": "sm75-31",
    "name": "Wishiwashi",
    "number": "31",
    "artist": "Kouki Saitou",
    "rarity": "Common",
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
    "abilities": [
      {
        "name": "Meet Up",
        "text": "Your Wishiwashi-GX in play get +20 HP, and their attacks do 20 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
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
      746
    ],
    "flavorText": "It's awfully weak and notably tasty, so everyone is always out to get it. As it happens, anyone trying to bully it receives a painful lesson.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/31.png",
      "large": "https://images.pokemontcg.io/sm75/31_hires.png"
    }
  },
  {
    "id": "sm75-32",
    "name": "Trapinch",
    "number": "32",
    "artist": "Naoyo Kimura",
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
      "Vibrava"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Mini Earthquake",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "This attack does 10 damage to each of your Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
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
    "flavorText": "As it digs through the sand, its giant jaws crush any rocks that obstruct its path. It builds a funnel-shaped nest.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/32.png",
      "large": "https://images.pokemontcg.io/sm75/32_hires.png"
    }
  },
  {
    "id": "sm75-33",
    "name": "Hydreigon",
    "number": "33",
    "artist": "Masakazu Fukuda",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Darkness"
    ],
    "evolvesFrom": "Zweilous",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Weed Out",
        "text": "Once during your turn (before your attack), you may choose 3 of your Benched Pokémon. Then, discard your other Benched Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dark Destruction",
        "cost": [
          "Darkness",
          "Darkness",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "120",
        "text": "You may discard an Energy from this Pokémon. If you do, discard an Energy from your opponent's Active Pokémon."
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
      "Colorless",
      "Colorless"
    ],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      635
    ],
    "flavorText": "The heads on their arms do not have brains. They use all three heads to consume and destroy everything.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/33.png",
      "large": "https://images.pokemontcg.io/sm75/33_hires.png"
    }
  },
  {
    "id": "sm75-34",
    "name": "Dratini",
    "number": "34",
    "artist": "Ayaka Yoshida",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Dragonair"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Wrap",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If heads, your opponent's Active Pokémon is now Paralyzed."
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      147
    ],
    "flavorText": "After a 10-hour struggle, a fisherman was able to pull one up and confirm its existence.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/34.png",
      "large": "https://images.pokemontcg.io/sm75/34_hires.png"
    }
  },
  {
    "id": "sm75-35",
    "name": "Dratini",
    "number": "35",
    "artist": "Anesaki Dynamic",
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
      "Dragonair"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Tail Whap",
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
        "type": "Fairy",
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
      147
    ],
    "flavorText": "After a 10-hour struggle, a fisherman was able to pull one up and confirm its existence.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/35.png",
      "large": "https://images.pokemontcg.io/sm75/35_hires.png"
    }
  },
  {
    "id": "sm75-36",
    "name": "Dragonair",
    "number": "36",
    "artist": "sui",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "100",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Dratini",
    "evolvesTo": [
      "Dragonite"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Dragon Tail",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60×",
        "text": "Flip 2 coins. This attack does 60 damage for each heads."
      },
      {
        "name": "Waterfall",
        "cost": [
          "Water",
          "Lightning",
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
        "type": "Fairy",
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
      148
    ],
    "flavorText": "From time immemorial, it has been venerated by agricultural peoples as an entity able to control the weather.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/36.png",
      "large": "https://images.pokemontcg.io/sm75/36_hires.png"
    }
  },
  {
    "id": "sm75-37",
    "name": "Dragonite-GX",
    "number": "37",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Dragonair",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Dragon Claw",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "70",
        "text": ""
      },
      {
        "name": "Giga Impact",
        "cost": [
          "Water",
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "200",
        "text": "This Pokémon can't attack during your next turn."
      },
      {
        "name": "Dragonporter-GX",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Put 3 Dragon Pokémon from your discard pile onto your Bench. (You can't use more than 1 GX attack in a game.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      149
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/37.png",
      "large": "https://images.pokemontcg.io/sm75/37_hires.png"
    }
  },
  {
    "id": "sm75-38",
    "name": "Vibrava",
    "number": "38",
    "artist": "Ken Sugimori",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Trapinch",
    "evolvesTo": [
      "Flygon"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sonic Edge",
        "cost": [
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
    "flavorText": "To help make its wings grow, it dissolves quantities of prey in its digestive juices and guzzles them down every day.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/38.png",
      "large": "https://images.pokemontcg.io/sm75/38_hires.png"
    }
  },
  {
    "id": "sm75-39",
    "name": "Flygon",
    "number": "39",
    "artist": "Shigenori Negishi",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "140",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Vibrava",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Dragon Guard",
        "text": "Prevent all effects of your opponent's attacks, except damage, done to your Dragon Pokémon. (Existing effects are not removed.)",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Sand Tomb",
        "cost": [
          "Fighting",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
    "flavorText": "This Pokémon hides in the heart of sandstorms it creates and seldom appears where people can see it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/39.png",
      "large": "https://images.pokemontcg.io/sm75/39_hires.png"
    }
  },
  {
    "id": "sm75-40",
    "name": "Altaria",
    "number": "40",
    "artist": "Kyoko Umemoto",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Swablu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fight Song",
        "text": "Your Dragon Pokémon's attacks do 20 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Pierce",
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
        "type": "Fairy",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      334
    ],
    "flavorText": "On sunny days, it flies freely through the sky and blends into the clouds. It sings in a beautiful soprano.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/40.png",
      "large": "https://images.pokemontcg.io/sm75/40_hires.png"
    }
  },
  {
    "id": "sm75-40a",
    "name": "Altaria",
    "number": "40a",
    "artist": "Shin Nagasawa",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Swablu",
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Fight Song",
        "text": "Your Dragon Pokémon's attacks do 20 more damage to your opponent's Active Pokémon (before applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Pierce",
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
        "type": "Fairy",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      334
    ],
    "flavorText": "On sunny days, it flies freely through the sky and blends into the clouds. It sings in a beautiful soprano.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/40a.png",
      "large": "https://images.pokemontcg.io/sm75/40a_hires.png"
    }
  },
  {
    "id": "sm75-41",
    "name": "Altaria-GX",
    "number": "41",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Swablu",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Bright Tone",
        "cost": [
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "During your opponent's next turn, prevent all damage done to this Pokémon by attacks from Pokémon-GX and Pokémon-EX."
      },
      {
        "name": "Sonic Edge",
        "cost": [
          "Water",
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      },
      {
        "name": "Euphoria-GX",
        "cost": [
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Asleep. Heal all damage from all of your Pokémon. (You can't use more than 1 GX attack in a game.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      334
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/41.png",
      "large": "https://images.pokemontcg.io/sm75/41_hires.png"
    }
  },
  {
    "id": "sm75-42",
    "name": "Bagon",
    "number": "42",
    "artist": "Kouki Saitou",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
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
        "name": "Risky Kick",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10",
        "text": "Flip a coin. If tails, this attack does nothing."
      },
      {
        "name": "Dragon Eye",
        "cost": [
          "Fire",
          "Water"
        ],
        "convertedEnergyCost": 2,
        "damage": "20",
        "text": "Your opponent's Active Pokémon is now Asleep."
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      371
    ],
    "flavorText": "With its steel-hard stone head, it headbutts indiscriminately. This is because of the stress it feels at being unable to fly.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/42.png",
      "large": "https://images.pokemontcg.io/sm75/42_hires.png"
    }
  },
  {
    "id": "sm75-43",
    "name": "Shelgon",
    "number": "43",
    "artist": "Yuka Morii",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "80",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Bagon",
    "evolvesTo": [
      "Salamence"
    ],
    "rules": [],
    "abilities": [
      {
        "name": "Energy Guard",
        "text": "If this Pokémon has any basic Energy attached to it, it takes 20 less damage from attacks (after applying Weakness and Resistance).",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Rollout",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      372
    ],
    "flavorText": "They lurk deep within caves—motionless, neither eating nor drinking. Why they don't die is not known.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/43.png",
      "large": "https://images.pokemontcg.io/sm75/43_hires.png"
    }
  },
  {
    "id": "sm75-44",
    "name": "Salamence-GX",
    "number": "44",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Shelgon",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dragon Lift",
        "text": "Your Pokémon in play have no Retreat Cost, except Pokémon-GX and Pokémon-EX.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Bright Flame",
        "cost": [
          "Fire",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "200",
        "text": "Discard 2 Energy from this Pokémon."
      },
      {
        "name": "Flame Jet-GX",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 120 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) (You can't use more than 1 GX attack in a game.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      373
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/44.png",
      "large": "https://images.pokemontcg.io/sm75/44_hires.png"
    }
  },
  {
    "id": "sm75-45",
    "name": "Druddigon",
    "number": "45",
    "artist": "Mitsuhiro Arita",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [
      {
        "name": "Rough Skin",
        "text": "If this Pokémon is your Active Pokémon and is damaged by an opponent's attack (even if this Pokémon is Knocked Out), put 3 damage counters on the Attacking Pokémon.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Dragon Claw",
        "cost": [
          "Fire",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      621
    ],
    "flavorText": "It warms its body by absorbing sunlight with its wings. When its body temperature falls, it can no longer move.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/45.png",
      "large": "https://images.pokemontcg.io/sm75/45_hires.png"
    }
  },
  {
    "id": "sm75-46",
    "name": "Zekrom",
    "number": "46",
    "artist": "Hasuno",
    "rarity": "Rare Holo",
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
        "name": "Shred",
        "cost": [
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      },
      {
        "name": "Bolt Strike",
        "cost": [
          "Lightning",
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "150",
        "text": "Flip a coin. If tails, this Pokémon does 50 damage to itself."
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      644
    ],
    "flavorText": "Concealing itself in lightning clouds, it flies throughout the Unova region. It creates electricity in its tail.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/46.png",
      "large": "https://images.pokemontcg.io/sm75/46_hires.png"
    }
  },
  {
    "id": "sm75-47",
    "name": "Kyurem",
    "number": "47",
    "artist": "TOKIYA",
    "rarity": "Rare Holo",
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
        "name": "Outrage",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "This attack does 10 more damage for each damage counter on this Pokémon."
      },
      {
        "name": "Frost Spear",
        "cost": [
          "Water",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "100",
        "text": "This attack does 20 damage to 1 of your opponent's Benched Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      646
    ],
    "flavorText": "It generates a powerful, freezing energy inside itself, but its body became frozen when the energy leaked out.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/47.png",
      "large": "https://images.pokemontcg.io/sm75/47_hires.png"
    }
  },
  {
    "id": "sm75-48",
    "name": "White Kyurem-GX",
    "number": "48",
    "artist": "5ban Graphics",
    "rarity": "Rare Holo GX",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "190",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Shred",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      },
      {
        "name": "Raging Blade",
        "cost": [
          "Fire",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If this Pokémon has any damage counters on it, this attack does 80 more damage."
      },
      {
        "name": "Dragon Nova-GX",
        "cost": [
          "Fire",
          "Fire",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "200",
        "text": "Your opponent's Active Pokémon is now Burned and Paralyzed. (You can't use more than 1 GX attack in a game.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      646
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/48.png",
      "large": "https://images.pokemontcg.io/sm75/48_hires.png"
    }
  },
  {
    "id": "sm75-49",
    "name": "Zygarde",
    "number": "49",
    "artist": "Misa Tsutsui",
    "rarity": "Uncommon",
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
        "name": "Rumble",
        "cost": [
          "Fighting"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "The Defending Pokémon can't retreat during your opponent's next turn."
      },
      {
        "name": "Raging Blade",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "If this Pokémon has any damage counters on it, this attack does 60 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      718
    ],
    "flavorText": "It's thought to be monitoring the ecosystem. There are rumors that even greater power lies hidden within it.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/49.png",
      "large": "https://images.pokemontcg.io/sm75/49_hires.png"
    }
  },
  {
    "id": "sm75-50",
    "name": "Turtonator",
    "number": "50",
    "artist": "Sumiyoshi Kizuki",
    "rarity": "Uncommon",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "110",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Explosive Jet",
        "cost": [
          "Fire",
          "Fire",
          "Fire"
        ],
        "convertedEnergyCost": 3,
        "damage": "50×",
        "text": "Discard any amount of Fire Energy from your Pokémon. This attack does 50 damage for each card you discarded in this way."
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      776
    ],
    "flavorText": "It gushes fire and poisonous gases from its nostrils. Its dung is an explosive substance and can be put to various uses.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/50.png",
      "large": "https://images.pokemontcg.io/sm75/50_hires.png"
    }
  },
  {
    "id": "sm75-51",
    "name": "Drampa",
    "number": "51",
    "artist": "Sanosuke Sakuma",
    "rarity": "Uncommon",
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
        "name": "Dragon Wisdom",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "20",
        "text": "Attach a basic Energy card from your discard pile to 1 of your Dragon Pokémon."
      },
      {
        "name": "Hyper Voice",
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
        "type": "Fairy",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      780
    ],
    "flavorText": "This Pokémon is friendly to people and loves children most of all. It comes from deep in the mountains to play with children it likes in town.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/51.png",
      "large": "https://images.pokemontcg.io/sm75/51_hires.png"
    }
  },
  {
    "id": "sm75-52",
    "name": "Jangmo-o",
    "number": "52",
    "artist": "Yusuke Ohmura",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic"
    ],
    "hp": "60",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [
      "Hakamo-o"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Rigidify",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "During your opponent's next turn, this Pokémon takes 20 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Dragon Claw",
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
        "type": "Fairy",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      782
    ],
    "flavorText": "They live in mountains where no trace of humans can be detected. Jangmo-o grow little by little as they battle one another.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/52.png",
      "large": "https://images.pokemontcg.io/sm75/52_hires.png"
    }
  },
  {
    "id": "sm75-53",
    "name": "Hakamo-o",
    "number": "53",
    "artist": "hatachu",
    "rarity": "Common",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "90",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Jangmo-o",
    "evolvesTo": [
      "Kommo-o"
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
        "name": "Dragon Claw",
        "cost": [
          "Lightning",
          "Fighting",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "70",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      783
    ],
    "flavorText": "It sheds and regrows its scales on a continuous basis. The scales become harder and sharper each time they're regrown.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/53.png",
      "large": "https://images.pokemontcg.io/sm75/53_hires.png"
    }
  },
  {
    "id": "sm75-54",
    "name": "Kommo-o",
    "number": "54",
    "artist": "so-taro",
    "rarity": "Rare Holo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2"
    ],
    "hp": "160",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Hakamo-o",
    "evolvesTo": [],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Guard Press",
        "cost": [
          "Lightning",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "60",
        "text": "During your opponent's next turn, this Pokémon takes 30 less damage from attacks (after applying Weakness and Resistance)."
      },
      {
        "name": "Raging Uppercut",
        "cost": [
          "Fighting",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "90+",
        "text": "If this Pokémon has 8 or more damage counters on it, this attack does 120 more damage."
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      784
    ],
    "flavorText": "Its rigid scales function as offense and defense. In the past, its scales were processed and used to make weapons and other commodities.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/54.png",
      "large": "https://images.pokemontcg.io/sm75/54_hires.png"
    }
  },
  {
    "id": "sm75-55",
    "name": "Kangaskhan",
    "number": "55",
    "artist": "Naoyo Kimura",
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
        "name": "Fetch",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Draw a card."
      },
      {
        "name": "Headbutt",
        "cost": [
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "30",
        "text": ""
      },
      {
        "name": "One-Two Punch",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "60+",
        "text": "Flip a coin. If heads, this attack does 30 more damage."
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
      115
    ],
    "flavorText": "The child in its pouch leaves home after roughly three years. That is the only time the mother is heard to cry wildly.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/55.png",
      "large": "https://images.pokemontcg.io/sm75/55_hires.png"
    }
  },
  {
    "id": "sm75-56",
    "name": "Swablu",
    "number": "56",
    "artist": "Yukiko Baba",
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
      "Altaria"
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
        "value": "-20"
      }
    ],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      333
    ],
    "flavorText": "It constantly grooms its cotton-like wings. It takes a shower to clean itself if it becomes dirty.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/56.png",
      "large": "https://images.pokemontcg.io/sm75/56_hires.png"
    }
  },
  {
    "id": "sm75-57",
    "name": "Swablu",
    "number": "57",
    "artist": "Shibuzoh.",
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
      "Altaria"
    ],
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Sing",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Asleep."
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
      333
    ],
    "flavorText": "It constantly grooms its cotton-like wings. It takes a shower to clean itself if it becomes dirty.",
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/57.png",
      "large": "https://images.pokemontcg.io/sm75/57_hires.png"
    }
  },
  {
    "id": "sm75-58",
    "name": "Blaine's Last Stand",
    "number": "58",
    "artist": "Ken Sugimori",
    "rarity": "Rare Holo",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can play this card only when it is the last card in your hand.",
      "Draw 2 cards for each Fire Pokémon you have in play.",
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
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/58.png",
      "large": "https://images.pokemontcg.io/sm75/58_hires.png"
    }
  },
  {
    "id": "sm75-59",
    "name": "Dragon Talon",
    "number": "59",
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
      "Attach a Pokémon Tool to 1 of your Pokémon that doesn't already have a Pokémon Tool attached to it.",
      "If the Dragon Pokémon this card is attached to is your Active Pokémon and is damaged by an opponent's attack (even if that Pokémon is Knocked Out), put 3 damage counters on the Attacking Pokémon.",
      "You may play as many Item cards as you like during your turn (before your attack)."
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
      "small": "https://images.pokemontcg.io/sm75/59.png",
      "large": "https://images.pokemontcg.io/sm75/59_hires.png"
    }
  },
  {
    "id": "sm75-60",
    "name": "Fiery Flint",
    "number": "60",
    "artist": "Eske Yoshinob",
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
      "You can play this card only if you discard 2 other cards from your hand.",
      "Search your deck for up to 4 Fire Energy cards, reveal them, and put them into your hand. Then, shuffle your deck.",
      "You may play as many Item cards as you like during your turn (before your attack)."
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
      "small": "https://images.pokemontcg.io/sm75/60.png",
      "large": "https://images.pokemontcg.io/sm75/60_hires.png"
    }
  },
  {
    "id": "sm75-60a",
    "name": "Fiery Flint",
    "number": "60a",
    "artist": "Yoshinobu Saito",
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
      "You can play this card only if you discard 2 other cards from your hand.",
      "Search your deck for up to 4 Fire Energy cards, reveal them, and put them into your hand. Then, shuffle your deck.",
      "You may play as many Item cards as you like during your turn (before your attack)."
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
      "small": "https://images.pokemontcg.io/sm75/60a.png",
      "large": "https://images.pokemontcg.io/sm75/60a_hires.png"
    }
  },
  {
    "id": "sm75-61",
    "name": "Lance ◇",
    "number": "61",
    "artist": "kodama",
    "rarity": "Rare Prism Star",
    "supertype": "Trainer",
    "subtypes": [
      "Supporter",
      "Prism Star"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can play this card only if 1 of your Pokémon was Knocked Out during your opponent's last turn.",
      "Search your deck for up to 2 Dragon Pokémon and put them onto your Bench. Then, shuffle your deck.",
      "You may play only 1 Supporter card during your turn (before your attack).",
      "◇ (Prism Star) Rule: You can't have more than 1 ◇ card with the same name in your deck. If a ◇ card would go to the discard pile, put it in the Lost Zone instead."
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
      "small": "https://images.pokemontcg.io/sm75/61.png",
      "large": "https://images.pokemontcg.io/sm75/61_hires.png"
    }
  },
  {
    "id": "sm75-62",
    "name": "Switch Raft",
    "number": "62",
    "artist": "Yoshinobu Saito",
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
      "Switch your Active Water Pokémon with 1 of your Benched Pokémon. If you do, heal 30 damage from the Pokémon you moved to your Bench.",
      "You may play as many Item cards as you like during your turn (before your attack)."
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
      "small": "https://images.pokemontcg.io/sm75/62.png",
      "large": "https://images.pokemontcg.io/sm75/62_hires.png"
    }
  },
  {
    "id": "sm75-63",
    "name": "Wela Volcano Park",
    "number": "63",
    "artist": "5ban Graphics",
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
      "Whenever a player flips a coin for the Special Condition Burned between turns, that Special Condition isn't removed even if the result is heads.",
      "This card stays in play when you play it. Discard this card if another Stadium card comes into play. If another card with the same name is in play, you can't play this card."
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
      "small": "https://images.pokemontcg.io/sm75/63.png",
      "large": "https://images.pokemontcg.io/sm75/63_hires.png"
    }
  },
  {
    "id": "sm75-64",
    "name": "Zinnia",
    "number": "64",
    "artist": "Megumi Mizutani",
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
      "You can play this card only if 1 of your Pokémon was Knocked Out during your opponent's last turn.",
      "Attach up to 2 basic Energy cards from your hand to 1 of your Dragon Pokémon.",
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
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/64.png",
      "large": "https://images.pokemontcg.io/sm75/64_hires.png"
    }
  },
  {
    "id": "sm75-65",
    "name": "Reshiram-GX",
    "number": "65",
    "artist": "PLANETA Igarashi",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "180",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Flame Charge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Fire Energy cards and attach them to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Scorching Column",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "110",
        "text": "Your opponent's Active Pokémon is now Burned."
      },
      {
        "name": "Vermilion-GX",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "You may attach up to 5 Fire Energy cards from your hand to your Pokémon in any way you like. (You can't use more than 1 GX attack in a game.)"
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/65.png",
      "large": "https://images.pokemontcg.io/sm75/65_hires.png"
    }
  },
  {
    "id": "sm75-66",
    "name": "Kingdra-GX",
    "number": "66",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "230",
    "types": [
      "Water"
    ],
    "evolvesFrom": "Seadra",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Hydro Pump",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "10+",
        "text": "This attack does 50 more damage times the amount of Water Energy attached to this Pokémon."
      },
      {
        "name": "Reverse Thrust",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "30",
        "text": "Switch this Pokémon with 1 of your Benched Pokémon."
      },
      {
        "name": "Maelstrom-GX",
        "cost": [
          "Water"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "This attack does 40 damage to each of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) (You can't use more than 1 GX attack in a game.)"
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
      230
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/66.png",
      "large": "https://images.pokemontcg.io/sm75/66_hires.png"
    }
  },
  {
    "id": "sm75-67",
    "name": "Dragonite-GX",
    "number": "67",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Dragonair",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Dragon Claw",
        "cost": [
          "Lightning"
        ],
        "convertedEnergyCost": 1,
        "damage": "70",
        "text": ""
      },
      {
        "name": "Giga Impact",
        "cost": [
          "Water",
          "Lightning",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "200",
        "text": "This Pokémon can't attack during your next turn."
      },
      {
        "name": "Dragonporter-GX",
        "cost": [
          "Colorless",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "Put 3 Dragon Pokémon from your discard pile onto your Bench. (You can't use more than 1 GX attack in a game.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      149
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/67.png",
      "large": "https://images.pokemontcg.io/sm75/67_hires.png"
    }
  },
  {
    "id": "sm75-68",
    "name": "Altaria-GX",
    "number": "68",
    "artist": "5ban Graphics",
    "rarity": "Rare Ultra",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Swablu",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Bright Tone",
        "cost": [
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "During your opponent's next turn, prevent all damage done to this Pokémon by attacks from Pokémon-GX and Pokémon-EX."
      },
      {
        "name": "Sonic Edge",
        "cost": [
          "Water",
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      },
      {
        "name": "Euphoria-GX",
        "cost": [
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Asleep. Heal all damage from all of your Pokémon. (You can't use more than 1 GX attack in a game.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      334
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/68.png",
      "large": "https://images.pokemontcg.io/sm75/68_hires.png"
    }
  },
  {
    "id": "sm75-69",
    "name": "Blaine's Last Stand",
    "number": "69",
    "artist": "Mitsuhiro Arita",
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
      "You can play this card only when it is the last card in your hand.",
      "Draw 2 cards for each Fire Pokémon you have in play.",
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
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/69.png",
      "large": "https://images.pokemontcg.io/sm75/69_hires.png"
    }
  },
  {
    "id": "sm75-70",
    "name": "Zinnia",
    "number": "70",
    "artist": "Hideki Ishikawa",
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
      "You can play this card only if 1 of your Pokémon was Knocked Out during your opponent's last turn.",
      "Attach up to 2 basic Energy cards from your hand to 1 of your Dragon Pokémon.",
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
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/70.png",
      "large": "https://images.pokemontcg.io/sm75/70_hires.png"
    }
  },
  {
    "id": "sm75-71",
    "name": "Reshiram-GX",
    "number": "71",
    "artist": "PLANETA Igarashi",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "180",
    "types": [
      "Fire"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Flame Charge",
        "cost": [
          "Colorless"
        ],
        "convertedEnergyCost": 1,
        "damage": "",
        "text": "Search your deck for up to 2 Fire Energy cards and attach them to this Pokémon. Then, shuffle your deck."
      },
      {
        "name": "Scorching Column",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "110",
        "text": "Your opponent's Active Pokémon is now Burned."
      },
      {
        "name": "Vermilion-GX",
        "cost": [
          "Fire",
          "Fire",
          "Fire",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "180",
        "text": "You may attach up to 5 Fire Energy cards from your hand to your Pokémon in any way you like. (You can't use more than 1 GX attack in a game.)"
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
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/71.png",
      "large": "https://images.pokemontcg.io/sm75/71_hires.png"
    }
  },
  {
    "id": "sm75-72",
    "name": "Altaria-GX",
    "number": "72",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1",
      "GX"
    ],
    "hp": "200",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Swablu",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Bright Tone",
        "cost": [
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "50",
        "text": "During your opponent's next turn, prevent all damage done to this Pokémon by attacks from Pokémon-GX and Pokémon-EX."
      },
      {
        "name": "Sonic Edge",
        "cost": [
          "Water",
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "110",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      },
      {
        "name": "Euphoria-GX",
        "cost": [
          "Fairy",
          "Colorless"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "Your opponent's Active Pokémon is now Asleep. Heal all damage from all of your Pokémon. (You can't use more than 1 GX attack in a game.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
        "value": "×2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless"
    ],
    "convertedRetreatCost": 1,
    "nationalPokedexNumbers": [
      334
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/72.png",
      "large": "https://images.pokemontcg.io/sm75/72_hires.png"
    }
  },
  {
    "id": "sm75-73",
    "name": "Salamence-GX",
    "number": "73",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 2",
      "GX"
    ],
    "hp": "250",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": "Shelgon",
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [
      {
        "name": "Dragon Lift",
        "text": "Your Pokémon in play have no Retreat Cost, except Pokémon-GX and Pokémon-EX.",
        "type": "Ability"
      }
    ],
    "attacks": [
      {
        "name": "Bright Flame",
        "cost": [
          "Fire",
          "Water",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "200",
        "text": "Discard 2 Energy from this Pokémon."
      },
      {
        "name": "Flame Jet-GX",
        "cost": [
          "Fire",
          "Colorless",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "",
        "text": "This attack does 120 damage to 1 of your opponent's Pokémon. (Don't apply Weakness and Resistance for Benched Pokémon.) (You can't use more than 1 GX attack in a game.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      373
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/73.png",
      "large": "https://images.pokemontcg.io/sm75/73_hires.png"
    }
  },
  {
    "id": "sm75-74",
    "name": "White Kyurem-GX",
    "number": "74",
    "artist": "5ban Graphics",
    "rarity": "Rare Rainbow",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX"
    ],
    "hp": "190",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Shred",
        "cost": [
          "Fire"
        ],
        "convertedEnergyCost": 1,
        "damage": "40",
        "text": "This attack's damage isn't affected by any effects on your opponent's Active Pokémon."
      },
      {
        "name": "Raging Blade",
        "cost": [
          "Fire",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 3,
        "damage": "80+",
        "text": "If this Pokémon has any damage counters on it, this attack does 80 more damage."
      },
      {
        "name": "Dragon Nova-GX",
        "cost": [
          "Fire",
          "Fire",
          "Water",
          "Colorless"
        ],
        "convertedEnergyCost": 4,
        "damage": "200",
        "text": "Your opponent's Active Pokémon is now Burned and Paralyzed. (You can't use more than 1 GX attack in a game.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      646
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/74.png",
      "large": "https://images.pokemontcg.io/sm75/74_hires.png"
    }
  },
  {
    "id": "sm75-75",
    "name": "Dragon Talon",
    "number": "75",
    "artist": "Toyste Beach",
    "rarity": "Rare Secret",
    "supertype": "Trainer",
    "subtypes": [
      "Pokémon Tool"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Attach a Pokémon Tool to 1 of your Pokémon that doesn't already have a Pokémon Tool attached to it.",
      "If the Dragon Pokémon this card is attached to is your Active Pokémon and is damaged by an opponent's attack (even if that Pokémon is Knocked Out), put 3 damage counters on the Attacking Pokémon.",
      "You may play as many Item cards as you like during your turn (before your attack)."
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
      "small": "https://images.pokemontcg.io/sm75/75.png",
      "large": "https://images.pokemontcg.io/sm75/75_hires.png"
    }
  },
  {
    "id": "sm75-76",
    "name": "Fiery Flint",
    "number": "76",
    "artist": "Eske Yoshinob",
    "rarity": "Rare Secret",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "You can play this card only if you discard 2 other cards from your hand.",
      "Search your deck for up to 4 Fire Energy cards, reveal them, and put them into your hand. Then, shuffle your deck.",
      "You may play as many Item cards as you like during your turn (before your attack)."
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
      "small": "https://images.pokemontcg.io/sm75/76.png",
      "large": "https://images.pokemontcg.io/sm75/76_hires.png"
    }
  },
  {
    "id": "sm75-77",
    "name": "Switch Raft",
    "number": "77",
    "artist": "Yoshinobu Saito",
    "rarity": "Rare Secret",
    "supertype": "Trainer",
    "subtypes": [
      "Item"
    ],
    "hp": null,
    "types": [],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Switch your Active Water Pokémon with 1 of your Benched Pokémon. If you do, heal 30 damage from the Pokémon you moved to your Bench.",
      "You may play as many Item cards as you like during your turn (before your attack)."
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
      "small": "https://images.pokemontcg.io/sm75/77.png",
      "large": "https://images.pokemontcg.io/sm75/77_hires.png"
    }
  },
  {
    "id": "sm75-78",
    "name": "Ultra Necrozma-GX",
    "number": "78",
    "artist": "PLANETA Igarashi",
    "rarity": "Rare Secret",
    "supertype": "Pokémon",
    "subtypes": [
      "Basic",
      "GX",
      "Ultra Beast"
    ],
    "hp": "190",
    "types": [
      "Dragon"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "rules": [
      "Pokémon-GX rule: When your Pokémon-GX is Knocked Out, your opponent takes 2 Prize cards."
    ],
    "abilities": [],
    "attacks": [
      {
        "name": "Photon Geyser",
        "cost": [
          "Psychic",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "20+",
        "text": "Discard all basic Psychic Energy from this Pokémon. This attack does 80 more damage for each card you discarded in this way."
      },
      {
        "name": "Sky-Scorching Light-GX",
        "cost": [
          "Psychic",
          "Metal"
        ],
        "convertedEnergyCost": 2,
        "damage": "",
        "text": "You can use this attack only if the total of both players' remaining Prize cards is 6 or less. Put 6 damage counters on each of your opponent's Pokémon. (You can't use more than 1 GX attack in a game.)"
      }
    ],
    "weaknesses": [
      {
        "type": "Fairy",
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
      800
    ],
    "flavorText": null,
    "legalities": {
      "unlimited": "Legal",
      "expanded": "Legal"
    },
    "regulationMark": null,
    "images": {
      "small": "https://images.pokemontcg.io/sm75/78.png",
      "large": "https://images.pokemontcg.io/sm75/78_hires.png"
    }
  }
]

export default cardDetails
