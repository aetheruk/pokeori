import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = [
  {
    "id": "miscp-1",
    "name": "Ancient Mew",
    "number": "1",
    "artist": null,
    "rarity": "Promo",
    "supertype": "Pokémon",
    "subtypes": [
      "Stage 1"
    ],
    "hp": "30",
    "types": [
      "Psychic"
    ],
    "evolvesFrom": null,
    "evolvesTo": [],
    "convertedRetreatCost": 2,
    "nationalPokedexNumbers": [
      151
    ],
    "images": {
      "small": "https://assets.tcgdex.net/en/misc/miscp/001/low.webp",
      "large": "https://assets.tcgdex.net/en/misc/miscp/001/high.webp"
    },
    "rules": [],
    "abilities": [],
    "attacks": [
      {
        "name": "Psyche",
        "cost": [
          "Psychic",
          "Psychic"
        ],
        "convertedEnergyCost": 2,
        "damage": "40",
        "text": ""
      }
    ],
    "weaknesses": [
      {
        "type": "Psychic",
        "value": "x2"
      }
    ],
    "resistances": [],
    "retreatCost": [
      "Colorless",
      "Colorless"
    ],
    "flavorText": "New Species. Little God or Evil?",
    "legalities": {},
    "regulationMark": null
  }
]

export default cardDetails
