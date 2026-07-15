/**
 * Generation 1 (Kanto)
 * Pokemon #1-151
 */

import type { PokemonData } from './types';

const gen1Data: PokemonData = [
  {
    "id": 1,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Green",
    "forms": [
      {
        "id": "1",
        "height": 7,
        "weight": 69,
        "base_experience": 64,
        "name": "Bulbasaur",
        "form": "base",
        "types": [
          "Grass",
          "Poison"
        ],
        "stats": {
          "hp": 45,
          "attack": 49,
          "defense": 49,
          "special-attack": 65,
          "special-defense": 65,
          "speed": 45
        }
      }
    ]
  },
  {
    "id": 2,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Green",
    "forms": [
      {
        "id": "2",
        "height": 10,
        "weight": 130,
        "base_experience": 142,
        "name": "Ivysaur",
        "form": "base",
        "types": [
          "Grass",
          "Poison"
        ],
        "stats": {
          "hp": 60,
          "attack": 62,
          "defense": 63,
          "special-attack": 80,
          "special-defense": 80,
          "speed": 60
        }
      }
    ]
  },
  {
    "id": 3,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Green",
    "forms": [
      {
        "id": "3",
        "height": 20,
        "weight": 1000,
        "base_experience": 236,
        "name": "Venusaur",
        "form": "base",
        "types": [
          "Grass",
          "Poison"
        ],
        "stats": {
          "hp": 80,
          "attack": 82,
          "defense": 83,
          "special-attack": 100,
          "special-defense": 100,
          "speed": 80
        }
      },
      {
        "id": "10033",
        "height": 24,
        "weight": 1555,
        "base_experience": 281,
        "name": "Mega Venusaur",
        "form": "Mega",
        "types": [
          "Grass",
          "Poison"
        ],
        "stats": {
          "hp": 80,
          "attack": 100,
          "defense": 123,
          "special-attack": 122,
          "special-defense": 120,
          "speed": 80
        }
      },
      {
        "id": "10195",
        "height": 240,
        "weight": 10000,
        "base_experience": 236,
        "name": "Gigantamax Venusaur",
        "form": "Gigantamax Form",
        "types": [
          "Grass",
          "Poison"
        ],
        "stats": {
          "hp": 80,
          "attack": 82,
          "defense": 83,
          "special-attack": 100,
          "special-defense": 100,
          "speed": 80
        }
      }
    ]
  },
  {
    "id": 4,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Upright",
    "color": "Red",
    "forms": [
      {
        "id": "4",
        "height": 6,
        "weight": 85,
        "base_experience": 62,
        "name": "Charmander",
        "form": "base",
        "types": [
          "Fire"
        ],
        "stats": {
          "hp": 39,
          "attack": 52,
          "defense": 43,
          "special-attack": 60,
          "special-defense": 50,
          "speed": 65
        }
      }
    ]
  },
  {
    "id": 5,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Upright",
    "color": "Red",
    "forms": [
      {
        "id": "5",
        "height": 11,
        "weight": 190,
        "base_experience": 142,
        "name": "Charmeleon",
        "form": "base",
        "types": [
          "Fire"
        ],
        "stats": {
          "hp": 58,
          "attack": 64,
          "defense": 58,
          "special-attack": 80,
          "special-defense": 65,
          "speed": 80
        }
      }
    ]
  },
  {
    "id": 6,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Upright",
    "color": "Red",
    "forms": [
      {
        "id": "6",
        "height": 17,
        "weight": 905,
        "base_experience": 240,
        "name": "Charizard",
        "form": "base",
        "types": [
          "Fire",
          "Flying"
        ],
        "stats": {
          "hp": 78,
          "attack": 84,
          "defense": 78,
          "special-attack": 109,
          "special-defense": 85,
          "speed": 100
        }
      },
      {
        "id": "10034",
        "height": 17,
        "weight": 1105,
        "base_experience": 285,
        "name": "Mega Charizard X",
        "form": "Mega X",
        "types": [
          "Fire",
          "Dragon"
        ],
        "stats": {
          "hp": 78,
          "attack": 130,
          "defense": 111,
          "special-attack": 130,
          "special-defense": 85,
          "speed": 100
        }
      },
      {
        "id": "10035",
        "height": 17,
        "weight": 1005,
        "base_experience": 285,
        "name": "Mega Charizard Y",
        "form": "Mega Y",
        "types": [
          "Fire",
          "Flying"
        ],
        "stats": {
          "hp": 78,
          "attack": 104,
          "defense": 78,
          "special-attack": 159,
          "special-defense": 115,
          "speed": 100
        }
      },
      {
        "id": "10196",
        "height": 280,
        "weight": 10000,
        "base_experience": 240,
        "name": "Gigantamax Charizard",
        "form": "Gigantamax Form",
        "types": [
          "Fire",
          "Flying"
        ],
        "stats": {
          "hp": 78,
          "attack": 84,
          "defense": 78,
          "special-attack": 109,
          "special-defense": 85,
          "speed": 100
        }
      }
    ]
  },
  {
    "id": 7,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Upright",
    "color": "Blue",
    "forms": [
      {
        "id": "7",
        "height": 5,
        "weight": 90,
        "base_experience": 63,
        "name": "Squirtle",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 44,
          "attack": 48,
          "defense": 65,
          "special-attack": 50,
          "special-defense": 64,
          "speed": 43
        }
      }
    ]
  },
  {
    "id": 8,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Upright",
    "color": "Blue",
    "forms": [
      {
        "id": "8",
        "height": 10,
        "weight": 225,
        "base_experience": 142,
        "name": "Wartortle",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 59,
          "attack": 63,
          "defense": 80,
          "special-attack": 65,
          "special-defense": 80,
          "speed": 58
        }
      }
    ]
  },
  {
    "id": 9,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Upright",
    "color": "Blue",
    "forms": [
      {
        "id": "9",
        "height": 16,
        "weight": 855,
        "base_experience": 239,
        "name": "Blastoise",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 79,
          "attack": 83,
          "defense": 100,
          "special-attack": 85,
          "special-defense": 105,
          "speed": 78
        }
      },
      {
        "id": "10036",
        "height": 16,
        "weight": 1011,
        "base_experience": 284,
        "name": "Mega Blastoise",
        "form": "Mega",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 79,
          "attack": 103,
          "defense": 120,
          "special-attack": 135,
          "special-defense": 115,
          "speed": 78
        }
      },
      {
        "id": "10197",
        "height": 250,
        "weight": 10000,
        "base_experience": 239,
        "name": "Gigantamax Blastoise",
        "form": "Gigantamax Form",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 79,
          "attack": 83,
          "defense": 100,
          "special-attack": 85,
          "special-defense": 105,
          "speed": 78
        }
      }
    ]
  },
  {
    "id": 10,
    "capture_rate": 255,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Armor",
    "color": "Green",
    "forms": [
      {
        "id": "10",
        "height": 3,
        "weight": 29,
        "base_experience": 39,
        "name": "Caterpie",
        "form": "base",
        "types": [
          "Bug"
        ],
        "stats": {
          "hp": 45,
          "attack": 30,
          "defense": 35,
          "special-attack": 20,
          "special-defense": 20,
          "speed": 45
        }
      }
    ]
  },
  {
    "id": 11,
    "capture_rate": 120,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Squiggle",
    "color": "Green",
    "forms": [
      {
        "id": "11",
        "height": 7,
        "weight": 99,
        "base_experience": 72,
        "name": "Metapod",
        "form": "base",
        "types": [
          "Bug"
        ],
        "stats": {
          "hp": 50,
          "attack": 20,
          "defense": 55,
          "special-attack": 25,
          "special-defense": 25,
          "speed": 30
        }
      }
    ]
  },
  {
    "id": 12,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Bug wings",
    "color": "White",
    "forms": [
      {
        "id": "12",
        "height": 11,
        "weight": 320,
        "base_experience": 178,
        "name": "Butterfree",
        "form": "base",
        "types": [
          "Bug",
          "Flying"
        ],
        "stats": {
          "hp": 60,
          "attack": 45,
          "defense": 50,
          "special-attack": 90,
          "special-defense": 80,
          "speed": 70
        }
      },
      {
        "id": "10198",
        "height": 170,
        "weight": 10000,
        "base_experience": 178,
        "name": "Gigantamax Butterfree",
        "form": "Gigantamax Form",
        "types": [
          "Bug",
          "Flying"
        ],
        "stats": {
          "hp": 60,
          "attack": 45,
          "defense": 50,
          "special-attack": 90,
          "special-defense": 80,
          "speed": 70
        }
      }
    ]
  },
  {
    "id": 13,
    "capture_rate": 255,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Armor",
    "color": "Brown",
    "forms": [
      {
        "id": "13",
        "height": 3,
        "weight": 32,
        "base_experience": 39,
        "name": "Weedle",
        "form": "base",
        "types": [
          "Bug",
          "Poison"
        ],
        "stats": {
          "hp": 40,
          "attack": 35,
          "defense": 30,
          "special-attack": 20,
          "special-defense": 20,
          "speed": 50
        }
      }
    ]
  },
  {
    "id": 14,
    "capture_rate": 120,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Squiggle",
    "color": "Yellow",
    "forms": [
      {
        "id": "14",
        "height": 6,
        "weight": 100,
        "base_experience": 72,
        "name": "Kakuna",
        "form": "base",
        "types": [
          "Bug",
          "Poison"
        ],
        "stats": {
          "hp": 45,
          "attack": 25,
          "defense": 50,
          "special-attack": 25,
          "special-defense": 25,
          "speed": 35
        }
      }
    ]
  },
  {
    "id": 15,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Bug wings",
    "color": "Yellow",
    "forms": [
      {
        "id": "15",
        "height": 10,
        "weight": 295,
        "base_experience": 178,
        "name": "Beedrill",
        "form": "base",
        "types": [
          "Bug",
          "Poison"
        ],
        "stats": {
          "hp": 65,
          "attack": 90,
          "defense": 40,
          "special-attack": 45,
          "special-defense": 80,
          "speed": 75
        }
      },
      {
        "id": "10090",
        "height": 14,
        "weight": 405,
        "base_experience": 223,
        "name": "Mega Beedrill",
        "form": "Mega",
        "types": [
          "Bug",
          "Poison"
        ],
        "stats": {
          "hp": 65,
          "attack": 150,
          "defense": 40,
          "special-attack": 15,
          "special-defense": 80,
          "speed": 145
        }
      }
    ]
  },
  {
    "id": 16,
    "capture_rate": 255,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Wings",
    "color": "Brown",
    "forms": [
      {
        "id": "16",
        "height": 3,
        "weight": 18,
        "base_experience": 50,
        "name": "Pidgey",
        "form": "base",
        "types": [
          "Normal",
          "Flying"
        ],
        "stats": {
          "hp": 40,
          "attack": 45,
          "defense": 40,
          "special-attack": 35,
          "special-defense": 35,
          "speed": 56
        }
      }
    ]
  },
  {
    "id": 17,
    "capture_rate": 120,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Wings",
    "color": "Brown",
    "forms": [
      {
        "id": "17",
        "height": 11,
        "weight": 300,
        "base_experience": 122,
        "name": "Pidgeotto",
        "form": "base",
        "types": [
          "Normal",
          "Flying"
        ],
        "stats": {
          "hp": 63,
          "attack": 60,
          "defense": 55,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 71
        }
      }
    ]
  },
  {
    "id": 18,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Wings",
    "color": "Brown",
    "forms": [
      {
        "id": "18",
        "height": 15,
        "weight": 395,
        "base_experience": 216,
        "name": "Pidgeot",
        "form": "base",
        "types": [
          "Normal",
          "Flying"
        ],
        "stats": {
          "hp": 83,
          "attack": 80,
          "defense": 75,
          "special-attack": 70,
          "special-defense": 70,
          "speed": 101
        }
      },
      {
        "id": "10073",
        "height": 22,
        "weight": 505,
        "base_experience": 261,
        "name": "Mega Pidgeot",
        "form": "Mega",
        "types": [
          "Normal",
          "Flying"
        ],
        "stats": {
          "hp": 83,
          "attack": 80,
          "defense": 80,
          "special-attack": 135,
          "special-defense": 80,
          "speed": 121
        }
      }
    ]
  },
  {
    "id": 19,
    "capture_rate": 255,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Purple",
    "forms": [
      {
        "id": "19",
        "height": 3,
        "weight": 35,
        "base_experience": 51,
        "name": "Rattata",
        "form": "base",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 30,
          "attack": 56,
          "defense": 35,
          "special-attack": 25,
          "special-defense": 35,
          "speed": 72
        }
      },
      {
        "id": "10091",
        "height": 3,
        "weight": 38,
        "base_experience": 51,
        "name": "Alolan Rattata",
        "form": "Alolan Form",
        "types": [
          "Dark",
          "Normal"
        ],
        "stats": {
          "hp": 30,
          "attack": 56,
          "defense": 35,
          "special-attack": 25,
          "special-defense": 35,
          "speed": 72
        }
      }
    ]
  },
  {
    "id": 20,
    "capture_rate": 127,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Brown",
    "forms": [
      {
        "id": "20",
        "height": 7,
        "weight": 185,
        "base_experience": 145,
        "name": "Raticate",
        "form": "base",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 55,
          "attack": 81,
          "defense": 60,
          "special-attack": 50,
          "special-defense": 70,
          "speed": 97
        }
      },
      {
        "id": "10092",
        "height": 7,
        "weight": 255,
        "base_experience": 145,
        "name": "Alolan Raticate",
        "form": "Alolan Form",
        "types": [
          "Dark",
          "Normal"
        ],
        "stats": {
          "hp": 75,
          "attack": 71,
          "defense": 70,
          "special-attack": 40,
          "special-defense": 80,
          "speed": 77
        }
      }
    ]
  },
  {
    "id": 21,
    "capture_rate": 255,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "rough terrain",
    "shape": "Wings",
    "color": "Brown",
    "forms": [
      {
        "id": "21",
        "height": 3,
        "weight": 20,
        "base_experience": 52,
        "name": "Spearow",
        "form": "base",
        "types": [
          "Normal",
          "Flying"
        ],
        "stats": {
          "hp": 40,
          "attack": 60,
          "defense": 30,
          "special-attack": 31,
          "special-defense": 31,
          "speed": 70
        }
      }
    ]
  },
  {
    "id": 22,
    "capture_rate": 90,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "rough terrain",
    "shape": "Wings",
    "color": "Brown",
    "forms": [
      {
        "id": "22",
        "height": 12,
        "weight": 380,
        "base_experience": 155,
        "name": "Fearow",
        "form": "base",
        "types": [
          "Normal",
          "Flying"
        ],
        "stats": {
          "hp": 65,
          "attack": 90,
          "defense": 65,
          "special-attack": 61,
          "special-defense": 61,
          "speed": 100
        }
      }
    ]
  },
  {
    "id": 23,
    "capture_rate": 255,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Squiggle",
    "color": "Purple",
    "forms": [
      {
        "id": "23",
        "height": 20,
        "weight": 69,
        "base_experience": 58,
        "name": "Ekans",
        "form": "base",
        "types": [
          "Poison"
        ],
        "stats": {
          "hp": 35,
          "attack": 60,
          "defense": 44,
          "special-attack": 40,
          "special-defense": 54,
          "speed": 55
        }
      }
    ]
  },
  {
    "id": 24,
    "capture_rate": 90,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Squiggle",
    "color": "Purple",
    "forms": [
      {
        "id": "24",
        "height": 35,
        "weight": 650,
        "base_experience": 157,
        "name": "Arbok",
        "form": "base",
        "types": [
          "Poison"
        ],
        "stats": {
          "hp": 60,
          "attack": 95,
          "defense": 69,
          "special-attack": 65,
          "special-defense": 79,
          "speed": 80
        }
      }
    ]
  },
  {
    "id": 25,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Quadruped",
    "color": "Yellow",
    "forms": [
      {
        "id": "25",
        "height": 4,
        "weight": 60,
        "base_experience": 112,
        "name": "Pikachu",
        "form": "base",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      },
      {
        "id": "10080",
        "height": 4,
        "weight": 60,
        "base_experience": 112,
        "name": "Pikachu Rock Star",
        "form": "Pikachu Rock Star",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      },
      {
        "id": "10081",
        "height": 4,
        "weight": 60,
        "base_experience": 112,
        "name": "Pikachu Belle",
        "form": "Pikachu Belle",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      },
      {
        "id": "10082",
        "height": 4,
        "weight": 60,
        "base_experience": 112,
        "name": "Pikachu Pop Star",
        "form": "Pikachu Pop Star",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      },
      {
        "id": "10083",
        "height": 4,
        "weight": 60,
        "base_experience": 112,
        "name": "Pikachu Ph.D.",
        "form": "Pikachu Ph.D.",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      },
      {
        "id": "10084",
        "height": 4,
        "weight": 60,
        "base_experience": 112,
        "name": "Pikachu Libre",
        "form": "Pikachu Libre",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      },
      {
        "id": "10085",
        "height": 4,
        "weight": 60,
        "base_experience": 112,
        "name": "Cosplay Pikachu",
        "form": "Cosplay Pikachu",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      },
      {
        "id": "10094",
        "height": 4,
        "weight": 60,
        "base_experience": 112,
        "name": "Original Cap Pikachu",
        "form": "Original Cap",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      },
      {
        "id": "10095",
        "height": 4,
        "weight": 60,
        "base_experience": 112,
        "name": "Hoenn Cap Pikachu",
        "form": "Hoenn Cap",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      },
      {
        "id": "10096",
        "height": 4,
        "weight": 60,
        "base_experience": 112,
        "name": "Sinnoh Cap Pikachu",
        "form": "Sinnoh Cap",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      },
      {
        "id": "10097",
        "height": 4,
        "weight": 60,
        "base_experience": 112,
        "name": "Unova Cap Pikachu",
        "form": "Unova Cap",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      },
      {
        "id": "10098",
        "height": 4,
        "weight": 60,
        "base_experience": 112,
        "name": "Kalos Cap Pikachu",
        "form": "Kalos Cap",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      },
      {
        "id": "10099",
        "height": 4,
        "weight": 60,
        "base_experience": 112,
        "name": "Alola Cap Pikachu",
        "form": "Alola Cap",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      },
      {
        "id": "10148",
        "height": 4,
        "weight": 60,
        "base_experience": 112,
        "name": "Partner Cap Pikachu",
        "form": "Partner Cap",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      },
      {
        "id": "10160",
        "height": 4,
        "weight": 60,
        "base_experience": 112,
        "name": "World Cap Pikachu",
        "form": "World Cap",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      },
      {
        "id": "10199",
        "height": 210,
        "weight": 10000,
        "base_experience": 112,
        "name": "Gigantamax Pikachu",
        "form": "Gigantamax Form",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 35,
          "attack": 55,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      }
    ]
  },
  {
    "id": 26,
    "capture_rate": 75,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Upright",
    "color": "Yellow",
    "forms": [
      {
        "id": "26",
        "height": 8,
        "weight": 300,
        "base_experience": 218,
        "name": "Raichu",
        "form": "base",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 60,
          "attack": 90,
          "defense": 55,
          "special-attack": 90,
          "special-defense": 80,
          "speed": 110
        }
      },
      {
        "id": "10100",
        "height": 7,
        "weight": 210,
        "base_experience": 243,
        "name": "Alolan Raichu",
        "form": "Alolan Form",
        "types": [
          "Electric",
          "Psychic"
        ],
        "stats": {
          "hp": 60,
          "attack": 85,
          "defense": 50,
          "special-attack": 95,
          "special-defense": 85,
          "speed": 110
        }
      },
      {
        "id": "10304",
        "height": 12,
        "weight": 380,
        "base_experience": 0,
        "name": "Mega Raichu X",
        "form": "Mega X",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 60,
          "attack": 135,
          "defense": 95,
          "special-attack": 90,
          "special-defense": 95,
          "speed": 110
        }
      },
      {
        "id": "10305",
        "height": 10,
        "weight": 260,
        "base_experience": 0,
        "name": "Mega Raichu Y",
        "form": "Mega Y",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 60,
          "attack": 100,
          "defense": 55,
          "special-attack": 160,
          "special-defense": 80,
          "speed": 130
        }
      }
    ]
  },
  {
    "id": 27,
    "capture_rate": 255,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "rough terrain",
    "shape": "Upright",
    "color": "Yellow",
    "forms": [
      {
        "id": "27",
        "height": 6,
        "weight": 120,
        "base_experience": 60,
        "name": "Sandshrew",
        "form": "base",
        "types": [
          "Ground"
        ],
        "stats": {
          "hp": 50,
          "attack": 75,
          "defense": 85,
          "special-attack": 20,
          "special-defense": 30,
          "speed": 40
        }
      },
      {
        "id": "10101",
        "height": 7,
        "weight": 400,
        "base_experience": 60,
        "name": "Alolan Sandshrew",
        "form": "Alolan Form",
        "types": [
          "Ice",
          "Steel"
        ],
        "stats": {
          "hp": 50,
          "attack": 75,
          "defense": 90,
          "special-attack": 10,
          "special-defense": 35,
          "speed": 40
        }
      }
    ]
  },
  {
    "id": 28,
    "capture_rate": 90,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "rough terrain",
    "shape": "Upright",
    "color": "Yellow",
    "forms": [
      {
        "id": "28",
        "height": 10,
        "weight": 295,
        "base_experience": 158,
        "name": "Sandslash",
        "form": "base",
        "types": [
          "Ground"
        ],
        "stats": {
          "hp": 75,
          "attack": 100,
          "defense": 110,
          "special-attack": 45,
          "special-defense": 55,
          "speed": 65
        }
      },
      {
        "id": "10102",
        "height": 12,
        "weight": 550,
        "base_experience": 158,
        "name": "Alolan Sandslash",
        "form": "Alolan Form",
        "types": [
          "Ice",
          "Steel"
        ],
        "stats": {
          "hp": 75,
          "attack": 100,
          "defense": 120,
          "special-attack": 25,
          "special-defense": 65,
          "speed": 65
        }
      }
    ]
  },
  {
    "id": 29,
    "capture_rate": 235,
    "gender_rate": 8,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Blue",
    "forms": [
      {
        "id": "29",
        "height": 4,
        "weight": 70,
        "base_experience": 55,
        "name": "Nidoran♀",
        "form": "base",
        "types": [
          "Poison"
        ],
        "stats": {
          "hp": 55,
          "attack": 47,
          "defense": 52,
          "special-attack": 40,
          "special-defense": 40,
          "speed": 41
        }
      }
    ]
  },
  {
    "id": 30,
    "capture_rate": 120,
    "gender_rate": 8,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Blue",
    "forms": [
      {
        "id": "30",
        "height": 8,
        "weight": 200,
        "base_experience": 128,
        "name": "Nidorina",
        "form": "base",
        "types": [
          "Poison"
        ],
        "stats": {
          "hp": 70,
          "attack": 62,
          "defense": 67,
          "special-attack": 55,
          "special-defense": 55,
          "speed": 56
        }
      }
    ]
  },
  {
    "id": 31,
    "capture_rate": 45,
    "gender_rate": 8,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Upright",
    "color": "Blue",
    "forms": [
      {
        "id": "31",
        "height": 13,
        "weight": 600,
        "base_experience": 227,
        "name": "Nidoqueen",
        "form": "base",
        "types": [
          "Poison",
          "Ground"
        ],
        "stats": {
          "hp": 90,
          "attack": 92,
          "defense": 87,
          "special-attack": 75,
          "special-defense": 85,
          "speed": 76
        }
      }
    ]
  },
  {
    "id": 32,
    "capture_rate": 235,
    "gender_rate": 0,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Purple",
    "forms": [
      {
        "id": "32",
        "height": 5,
        "weight": 90,
        "base_experience": 55,
        "name": "Nidoran♂",
        "form": "base",
        "types": [
          "Poison"
        ],
        "stats": {
          "hp": 46,
          "attack": 57,
          "defense": 40,
          "special-attack": 40,
          "special-defense": 40,
          "speed": 50
        }
      }
    ]
  },
  {
    "id": 33,
    "capture_rate": 120,
    "gender_rate": 0,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Purple",
    "forms": [
      {
        "id": "33",
        "height": 9,
        "weight": 195,
        "base_experience": 128,
        "name": "Nidorino",
        "form": "base",
        "types": [
          "Poison"
        ],
        "stats": {
          "hp": 61,
          "attack": 72,
          "defense": 57,
          "special-attack": 55,
          "special-defense": 55,
          "speed": 65
        }
      }
    ]
  },
  {
    "id": 34,
    "capture_rate": 45,
    "gender_rate": 0,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Upright",
    "color": "Purple",
    "forms": [
      {
        "id": "34",
        "height": 14,
        "weight": 620,
        "base_experience": 227,
        "name": "Nidoking",
        "form": "base",
        "types": [
          "Poison",
          "Ground"
        ],
        "stats": {
          "hp": 81,
          "attack": 102,
          "defense": 77,
          "special-attack": 85,
          "special-defense": 75,
          "speed": 85
        }
      }
    ]
  },
  {
    "id": 35,
    "capture_rate": 150,
    "gender_rate": 6,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Upright",
    "color": "Pink",
    "forms": [
      {
        "id": "35",
        "height": 6,
        "weight": 75,
        "base_experience": 113,
        "name": "Clefairy",
        "form": "base",
        "types": [
          "Fairy"
        ],
        "stats": {
          "hp": 70,
          "attack": 45,
          "defense": 48,
          "special-attack": 60,
          "special-defense": 65,
          "speed": 35
        }
      }
    ]
  },
  {
    "id": 36,
    "capture_rate": 25,
    "gender_rate": 6,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Upright",
    "color": "Pink",
    "forms": [
      {
        "id": "36",
        "height": 13,
        "weight": 400,
        "base_experience": 217,
        "name": "Clefable",
        "form": "base",
        "types": [
          "Fairy"
        ],
        "stats": {
          "hp": 95,
          "attack": 70,
          "defense": 73,
          "special-attack": 95,
          "special-defense": 90,
          "speed": 60
        }
      },
      {
        "id": "10278",
        "height": 17,
        "weight": 423,
        "base_experience": 0,
        "name": "Mega Clefable",
        "form": "Mega",
        "types": [
          "Fairy",
          "Flying"
        ],
        "stats": {
          "hp": 95,
          "attack": 80,
          "defense": 93,
          "special-attack": 135,
          "special-defense": 110,
          "speed": 70
        }
      }
    ]
  },
  {
    "id": 37,
    "capture_rate": 190,
    "gender_rate": 6,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Brown",
    "forms": [
      {
        "id": "37",
        "height": 6,
        "weight": 99,
        "base_experience": 60,
        "name": "Vulpix",
        "form": "base",
        "types": [
          "Fire"
        ],
        "stats": {
          "hp": 38,
          "attack": 41,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 65,
          "speed": 65
        }
      },
      {
        "id": "10103",
        "height": 6,
        "weight": 99,
        "base_experience": 60,
        "name": "Alolan Vulpix",
        "form": "Alolan Form",
        "types": [
          "Ice"
        ],
        "stats": {
          "hp": 38,
          "attack": 41,
          "defense": 40,
          "special-attack": 50,
          "special-defense": 65,
          "speed": 65
        }
      }
    ]
  },
  {
    "id": 38,
    "capture_rate": 75,
    "gender_rate": 6,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Yellow",
    "forms": [
      {
        "id": "38",
        "height": 11,
        "weight": 199,
        "base_experience": 177,
        "name": "Ninetales",
        "form": "base",
        "types": [
          "Fire"
        ],
        "stats": {
          "hp": 73,
          "attack": 76,
          "defense": 75,
          "special-attack": 81,
          "special-defense": 100,
          "speed": 100
        }
      },
      {
        "id": "10104",
        "height": 11,
        "weight": 199,
        "base_experience": 177,
        "name": "Alolan Ninetales",
        "form": "Alolan Form",
        "types": [
          "Ice",
          "Fairy"
        ],
        "stats": {
          "hp": 73,
          "attack": 67,
          "defense": 75,
          "special-attack": 81,
          "special-defense": 100,
          "speed": 109
        }
      }
    ]
  },
  {
    "id": 39,
    "capture_rate": 170,
    "gender_rate": 6,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Humanoid",
    "color": "Pink",
    "forms": [
      {
        "id": "39",
        "height": 5,
        "weight": 55,
        "base_experience": 95,
        "name": "Jigglypuff",
        "form": "base",
        "types": [
          "Normal",
          "Fairy"
        ],
        "stats": {
          "hp": 115,
          "attack": 45,
          "defense": 20,
          "special-attack": 45,
          "special-defense": 25,
          "speed": 20
        }
      }
    ]
  },
  {
    "id": 40,
    "capture_rate": 50,
    "gender_rate": 6,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Humanoid",
    "color": "Pink",
    "forms": [
      {
        "id": "40",
        "height": 10,
        "weight": 120,
        "base_experience": 196,
        "name": "Wigglytuff",
        "form": "base",
        "types": [
          "Normal",
          "Fairy"
        ],
        "stats": {
          "hp": 140,
          "attack": 70,
          "defense": 45,
          "special-attack": 85,
          "special-defense": 50,
          "speed": 45
        }
      }
    ]
  },
  {
    "id": 41,
    "capture_rate": 255,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "cave",
    "shape": "Wings",
    "color": "Purple",
    "forms": [
      {
        "id": "41",
        "height": 8,
        "weight": 75,
        "base_experience": 49,
        "name": "Zubat",
        "form": "base",
        "types": [
          "Poison",
          "Flying"
        ],
        "stats": {
          "hp": 40,
          "attack": 45,
          "defense": 35,
          "special-attack": 30,
          "special-defense": 40,
          "speed": 55
        }
      }
    ]
  },
  {
    "id": 42,
    "capture_rate": 90,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "cave",
    "shape": "Wings",
    "color": "Purple",
    "forms": [
      {
        "id": "42",
        "height": 16,
        "weight": 550,
        "base_experience": 159,
        "name": "Golbat",
        "form": "base",
        "types": [
          "Poison",
          "Flying"
        ],
        "stats": {
          "hp": 75,
          "attack": 80,
          "defense": 70,
          "special-attack": 65,
          "special-defense": 75,
          "speed": 90
        }
      }
    ]
  },
  {
    "id": 43,
    "capture_rate": 255,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Legs",
    "color": "Blue",
    "forms": [
      {
        "id": "43",
        "height": 5,
        "weight": 54,
        "base_experience": 64,
        "name": "Oddish",
        "form": "base",
        "types": [
          "Grass",
          "Poison"
        ],
        "stats": {
          "hp": 45,
          "attack": 50,
          "defense": 55,
          "special-attack": 75,
          "special-defense": 65,
          "speed": 30
        }
      }
    ]
  },
  {
    "id": 44,
    "capture_rate": 120,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Humanoid",
    "color": "Blue",
    "forms": [
      {
        "id": "44",
        "height": 8,
        "weight": 86,
        "base_experience": 138,
        "name": "Gloom",
        "form": "base",
        "types": [
          "Grass",
          "Poison"
        ],
        "stats": {
          "hp": 60,
          "attack": 65,
          "defense": 70,
          "special-attack": 85,
          "special-defense": 75,
          "speed": 40
        }
      }
    ]
  },
  {
    "id": 45,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Humanoid",
    "color": "Red",
    "forms": [
      {
        "id": "45",
        "height": 12,
        "weight": 186,
        "base_experience": 221,
        "name": "Vileplume",
        "form": "base",
        "types": [
          "Grass",
          "Poison"
        ],
        "stats": {
          "hp": 75,
          "attack": 80,
          "defense": 85,
          "special-attack": 110,
          "special-defense": 90,
          "speed": 50
        }
      }
    ]
  },
  {
    "id": 46,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Armor",
    "color": "Red",
    "forms": [
      {
        "id": "46",
        "height": 3,
        "weight": 54,
        "base_experience": 57,
        "name": "Paras",
        "form": "base",
        "types": [
          "Bug",
          "Grass"
        ],
        "stats": {
          "hp": 35,
          "attack": 70,
          "defense": 55,
          "special-attack": 45,
          "special-defense": 55,
          "speed": 25
        }
      }
    ]
  },
  {
    "id": 47,
    "capture_rate": 75,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Armor",
    "color": "Red",
    "forms": [
      {
        "id": "47",
        "height": 10,
        "weight": 295,
        "base_experience": 142,
        "name": "Parasect",
        "form": "base",
        "types": [
          "Bug",
          "Grass"
        ],
        "stats": {
          "hp": 60,
          "attack": 95,
          "defense": 80,
          "special-attack": 60,
          "special-defense": 80,
          "speed": 30
        }
      }
    ]
  },
  {
    "id": 48,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Humanoid",
    "color": "Purple",
    "forms": [
      {
        "id": "48",
        "height": 10,
        "weight": 300,
        "base_experience": 61,
        "name": "Venonat",
        "form": "base",
        "types": [
          "Bug",
          "Poison"
        ],
        "stats": {
          "hp": 60,
          "attack": 55,
          "defense": 50,
          "special-attack": 40,
          "special-defense": 55,
          "speed": 45
        }
      }
    ]
  },
  {
    "id": 49,
    "capture_rate": 75,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Bug wings",
    "color": "Purple",
    "forms": [
      {
        "id": "49",
        "height": 15,
        "weight": 125,
        "base_experience": 158,
        "name": "Venomoth",
        "form": "base",
        "types": [
          "Bug",
          "Poison"
        ],
        "stats": {
          "hp": 70,
          "attack": 65,
          "defense": 60,
          "special-attack": 90,
          "special-defense": 75,
          "speed": 90
        }
      }
    ]
  },
  {
    "id": 50,
    "capture_rate": 255,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "cave",
    "shape": "Blob",
    "color": "Brown",
    "forms": [
      {
        "id": "50",
        "height": 2,
        "weight": 8,
        "base_experience": 53,
        "name": "Diglett",
        "form": "base",
        "types": [
          "Ground"
        ],
        "stats": {
          "hp": 10,
          "attack": 55,
          "defense": 25,
          "special-attack": 35,
          "special-defense": 45,
          "speed": 95
        }
      },
      {
        "id": "10105",
        "height": 2,
        "weight": 10,
        "base_experience": 53,
        "name": "Alolan Diglett",
        "form": "Alolan Form",
        "types": [
          "Ground",
          "Steel"
        ],
        "stats": {
          "hp": 10,
          "attack": 55,
          "defense": 30,
          "special-attack": 35,
          "special-defense": 45,
          "speed": 90
        }
      }
    ]
  },
  {
    "id": 51,
    "capture_rate": 50,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "cave",
    "shape": "Heads",
    "color": "Brown",
    "forms": [
      {
        "id": "51",
        "height": 7,
        "weight": 333,
        "base_experience": 149,
        "name": "Dugtrio",
        "form": "base",
        "types": [
          "Ground"
        ],
        "stats": {
          "hp": 35,
          "attack": 100,
          "defense": 50,
          "special-attack": 50,
          "special-defense": 70,
          "speed": 120
        }
      },
      {
        "id": "10106",
        "height": 7,
        "weight": 666,
        "base_experience": 149,
        "name": "Alolan Dugtrio",
        "form": "Alolan Form",
        "types": [
          "Ground",
          "Steel"
        ],
        "stats": {
          "hp": 35,
          "attack": 100,
          "defense": 60,
          "special-attack": 50,
          "special-defense": 70,
          "speed": 110
        }
      }
    ]
  },
  {
    "id": 52,
    "capture_rate": 255,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Quadruped",
    "color": "Yellow",
    "forms": [
      {
        "id": "52",
        "height": 4,
        "weight": 42,
        "base_experience": 58,
        "name": "Meowth",
        "form": "base",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 40,
          "attack": 45,
          "defense": 35,
          "special-attack": 40,
          "special-defense": 40,
          "speed": 90
        }
      },
      {
        "id": "10107",
        "height": 4,
        "weight": 42,
        "base_experience": 58,
        "name": "Alolan Meowth",
        "form": "Alolan Form",
        "types": [
          "Dark"
        ],
        "stats": {
          "hp": 40,
          "attack": 35,
          "defense": 35,
          "special-attack": 50,
          "special-defense": 40,
          "speed": 90
        }
      },
      {
        "id": "10161",
        "height": 4,
        "weight": 75,
        "base_experience": 58,
        "name": "Galarian Meowth",
        "form": "Galarian Form",
        "types": [
          "Steel"
        ],
        "stats": {
          "hp": 50,
          "attack": 65,
          "defense": 55,
          "special-attack": 40,
          "special-defense": 40,
          "speed": 40
        }
      },
      {
        "id": "10200",
        "height": 330,
        "weight": 10000,
        "base_experience": 58,
        "name": "Gigantamax Meowth",
        "form": "Gigantamax Form",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 40,
          "attack": 45,
          "defense": 35,
          "special-attack": 40,
          "special-defense": 40,
          "speed": 90
        }
      }
    ]
  },
  {
    "id": 53,
    "capture_rate": 90,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Quadruped",
    "color": "Yellow",
    "forms": [
      {
        "id": "53",
        "height": 10,
        "weight": 320,
        "base_experience": 154,
        "name": "Persian",
        "form": "base",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 65,
          "attack": 70,
          "defense": 60,
          "special-attack": 65,
          "special-defense": 65,
          "speed": 115
        }
      },
      {
        "id": "10108",
        "height": 11,
        "weight": 330,
        "base_experience": 154,
        "name": "Alolan Persian",
        "form": "Alolan Form",
        "types": [
          "Dark"
        ],
        "stats": {
          "hp": 65,
          "attack": 60,
          "defense": 60,
          "special-attack": 75,
          "special-defense": 65,
          "speed": 115
        }
      }
    ]
  },
  {
    "id": 54,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Upright",
    "color": "Yellow",
    "forms": [
      {
        "id": "54",
        "height": 8,
        "weight": 196,
        "base_experience": 64,
        "name": "Psyduck",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 50,
          "attack": 52,
          "defense": 48,
          "special-attack": 65,
          "special-defense": 50,
          "speed": 55
        }
      }
    ]
  },
  {
    "id": 55,
    "capture_rate": 75,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Upright",
    "color": "Blue",
    "forms": [
      {
        "id": "55",
        "height": 17,
        "weight": 766,
        "base_experience": 175,
        "name": "Golduck",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 80,
          "attack": 82,
          "defense": 78,
          "special-attack": 95,
          "special-defense": 80,
          "speed": 85
        }
      }
    ]
  },
  {
    "id": 56,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Upright",
    "color": "Brown",
    "forms": [
      {
        "id": "56",
        "height": 5,
        "weight": 280,
        "base_experience": 61,
        "name": "Mankey",
        "form": "base",
        "types": [
          "Fighting"
        ],
        "stats": {
          "hp": 40,
          "attack": 80,
          "defense": 35,
          "special-attack": 35,
          "special-defense": 45,
          "speed": 70
        }
      }
    ]
  },
  {
    "id": 57,
    "capture_rate": 75,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Upright",
    "color": "Brown",
    "forms": [
      {
        "id": "57",
        "height": 10,
        "weight": 320,
        "base_experience": 159,
        "name": "Primeape",
        "form": "base",
        "types": [
          "Fighting"
        ],
        "stats": {
          "hp": 65,
          "attack": 105,
          "defense": 60,
          "special-attack": 60,
          "special-defense": 70,
          "speed": 95
        }
      }
    ]
  },
  {
    "id": 58,
    "capture_rate": 190,
    "gender_rate": 2,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Brown",
    "forms": [
      {
        "id": "58",
        "height": 7,
        "weight": 190,
        "base_experience": 70,
        "name": "Growlithe",
        "form": "base",
        "types": [
          "Fire"
        ],
        "stats": {
          "hp": 55,
          "attack": 70,
          "defense": 45,
          "special-attack": 70,
          "special-defense": 50,
          "speed": 60
        }
      },
      {
        "id": "10229",
        "height": 8,
        "weight": 227,
        "base_experience": 70,
        "name": "Hisuian Growlithe",
        "form": "Hisuian Form",
        "types": [
          "Fire",
          "Rock"
        ],
        "stats": {
          "hp": 60,
          "attack": 75,
          "defense": 45,
          "special-attack": 65,
          "special-defense": 50,
          "speed": 55
        }
      }
    ]
  },
  {
    "id": 59,
    "capture_rate": 75,
    "gender_rate": 2,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Brown",
    "forms": [
      {
        "id": "59",
        "height": 19,
        "weight": 1550,
        "base_experience": 194,
        "name": "Arcanine",
        "form": "base",
        "types": [
          "Fire"
        ],
        "stats": {
          "hp": 90,
          "attack": 110,
          "defense": 80,
          "special-attack": 100,
          "special-defense": 80,
          "speed": 95
        }
      },
      {
        "id": "10230",
        "height": 20,
        "weight": 1680,
        "base_experience": 194,
        "name": "Hisuian Arcanine",
        "form": "Hisuian Form",
        "types": [
          "Fire",
          "Rock"
        ],
        "stats": {
          "hp": 95,
          "attack": 115,
          "defense": 80,
          "special-attack": 95,
          "special-defense": 80,
          "speed": 90
        }
      }
    ]
  },
  {
    "id": 60,
    "capture_rate": 255,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Legs",
    "color": "Blue",
    "forms": [
      {
        "id": "60",
        "height": 6,
        "weight": 124,
        "base_experience": 60,
        "name": "Poliwag",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 40,
          "attack": 50,
          "defense": 40,
          "special-attack": 40,
          "special-defense": 40,
          "speed": 90
        }
      }
    ]
  },
  {
    "id": 61,
    "capture_rate": 120,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Humanoid",
    "color": "Blue",
    "forms": [
      {
        "id": "61",
        "height": 10,
        "weight": 200,
        "base_experience": 135,
        "name": "Poliwhirl",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 65,
          "attack": 65,
          "defense": 65,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 90
        }
      }
    ]
  },
  {
    "id": 62,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Humanoid",
    "color": "Blue",
    "forms": [
      {
        "id": "62",
        "height": 13,
        "weight": 540,
        "base_experience": 230,
        "name": "Poliwrath",
        "form": "base",
        "types": [
          "Water",
          "Fighting"
        ],
        "stats": {
          "hp": 90,
          "attack": 95,
          "defense": 95,
          "special-attack": 70,
          "special-defense": 90,
          "speed": 70
        }
      }
    ]
  },
  {
    "id": 63,
    "capture_rate": 200,
    "gender_rate": 2,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Upright",
    "color": "Brown",
    "forms": [
      {
        "id": "63",
        "height": 9,
        "weight": 195,
        "base_experience": 62,
        "name": "Abra",
        "form": "base",
        "types": [
          "Psychic"
        ],
        "stats": {
          "hp": 25,
          "attack": 20,
          "defense": 15,
          "special-attack": 105,
          "special-defense": 55,
          "speed": 90
        }
      }
    ]
  },
  {
    "id": 64,
    "capture_rate": 100,
    "gender_rate": 2,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Upright",
    "color": "Brown",
    "forms": [
      {
        "id": "64",
        "height": 13,
        "weight": 565,
        "base_experience": 140,
        "name": "Kadabra",
        "form": "base",
        "types": [
          "Psychic"
        ],
        "stats": {
          "hp": 40,
          "attack": 35,
          "defense": 30,
          "special-attack": 120,
          "special-defense": 70,
          "speed": 105
        }
      }
    ]
  },
  {
    "id": 65,
    "capture_rate": 50,
    "gender_rate": 2,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Humanoid",
    "color": "Brown",
    "forms": [
      {
        "id": "65",
        "height": 15,
        "weight": 480,
        "base_experience": 225,
        "name": "Alakazam",
        "form": "base",
        "types": [
          "Psychic"
        ],
        "stats": {
          "hp": 55,
          "attack": 50,
          "defense": 45,
          "special-attack": 135,
          "special-defense": 95,
          "speed": 120
        }
      },
      {
        "id": "10037",
        "height": 12,
        "weight": 480,
        "base_experience": 270,
        "name": "Mega Alakazam",
        "form": "Mega",
        "types": [
          "Psychic"
        ],
        "stats": {
          "hp": 55,
          "attack": 50,
          "defense": 65,
          "special-attack": 175,
          "special-defense": 105,
          "speed": 150
        }
      }
    ]
  },
  {
    "id": 66,
    "capture_rate": 180,
    "gender_rate": 2,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Upright",
    "color": "Gray",
    "forms": [
      {
        "id": "66",
        "height": 8,
        "weight": 195,
        "base_experience": 61,
        "name": "Machop",
        "form": "base",
        "types": [
          "Fighting"
        ],
        "stats": {
          "hp": 70,
          "attack": 80,
          "defense": 50,
          "special-attack": 35,
          "special-defense": 35,
          "speed": 35
        }
      }
    ]
  },
  {
    "id": 67,
    "capture_rate": 90,
    "gender_rate": 2,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Humanoid",
    "color": "Gray",
    "forms": [
      {
        "id": "67",
        "height": 15,
        "weight": 705,
        "base_experience": 142,
        "name": "Machoke",
        "form": "base",
        "types": [
          "Fighting"
        ],
        "stats": {
          "hp": 80,
          "attack": 100,
          "defense": 70,
          "special-attack": 50,
          "special-defense": 60,
          "speed": 45
        }
      }
    ]
  },
  {
    "id": 68,
    "capture_rate": 45,
    "gender_rate": 2,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Humanoid",
    "color": "Gray",
    "forms": [
      {
        "id": "68",
        "height": 16,
        "weight": 1300,
        "base_experience": 227,
        "name": "Machamp",
        "form": "base",
        "types": [
          "Fighting"
        ],
        "stats": {
          "hp": 90,
          "attack": 130,
          "defense": 80,
          "special-attack": 65,
          "special-defense": 85,
          "speed": 55
        }
      },
      {
        "id": "10201",
        "height": 250,
        "weight": 10000,
        "base_experience": 227,
        "name": "Gigantamax Machamp",
        "form": "Gigantamax Form",
        "types": [
          "Fighting"
        ],
        "stats": {
          "hp": 90,
          "attack": 130,
          "defense": 80,
          "special-attack": 65,
          "special-defense": 85,
          "speed": 55
        }
      }
    ]
  },
  {
    "id": 69,
    "capture_rate": 255,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Humanoid",
    "color": "Green",
    "forms": [
      {
        "id": "69",
        "height": 7,
        "weight": 40,
        "base_experience": 60,
        "name": "Bellsprout",
        "form": "base",
        "types": [
          "Grass",
          "Poison"
        ],
        "stats": {
          "hp": 50,
          "attack": 75,
          "defense": 35,
          "special-attack": 70,
          "special-defense": 30,
          "speed": 40
        }
      }
    ]
  },
  {
    "id": 70,
    "capture_rate": 120,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Blob",
    "color": "Green",
    "forms": [
      {
        "id": "70",
        "height": 10,
        "weight": 64,
        "base_experience": 137,
        "name": "Weepinbell",
        "form": "base",
        "types": [
          "Grass",
          "Poison"
        ],
        "stats": {
          "hp": 65,
          "attack": 90,
          "defense": 50,
          "special-attack": 85,
          "special-defense": 45,
          "speed": 55
        }
      }
    ]
  },
  {
    "id": 71,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Blob",
    "color": "Green",
    "forms": [
      {
        "id": "71",
        "height": 17,
        "weight": 155,
        "base_experience": 221,
        "name": "Victreebel",
        "form": "base",
        "types": [
          "Grass",
          "Poison"
        ],
        "stats": {
          "hp": 80,
          "attack": 105,
          "defense": 65,
          "special-attack": 100,
          "special-defense": 70,
          "speed": 70
        }
      },
      {
        "id": "10279",
        "height": 45,
        "weight": 1255,
        "base_experience": 0,
        "name": "Mega Victreebel",
        "form": "Mega",
        "types": [
          "Grass",
          "Poison"
        ],
        "stats": {
          "hp": 80,
          "attack": 125,
          "defense": 85,
          "special-attack": 135,
          "special-defense": 95,
          "speed": 70
        }
      }
    ]
  },
  {
    "id": 72,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "sea",
    "shape": "Tentacles",
    "color": "Blue",
    "forms": [
      {
        "id": "72",
        "height": 9,
        "weight": 455,
        "base_experience": 67,
        "name": "Tentacool",
        "form": "base",
        "types": [
          "Water",
          "Poison"
        ],
        "stats": {
          "hp": 40,
          "attack": 40,
          "defense": 35,
          "special-attack": 50,
          "special-defense": 100,
          "speed": 70
        }
      }
    ]
  },
  {
    "id": 73,
    "capture_rate": 60,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "sea",
    "shape": "Tentacles",
    "color": "Blue",
    "forms": [
      {
        "id": "73",
        "height": 16,
        "weight": 550,
        "base_experience": 180,
        "name": "Tentacruel",
        "form": "base",
        "types": [
          "Water",
          "Poison"
        ],
        "stats": {
          "hp": 80,
          "attack": 70,
          "defense": 65,
          "special-attack": 80,
          "special-defense": 120,
          "speed": 100
        }
      }
    ]
  },
  {
    "id": 74,
    "capture_rate": 255,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Arms",
    "color": "Brown",
    "forms": [
      {
        "id": "74",
        "height": 4,
        "weight": 200,
        "base_experience": 60,
        "name": "Geodude",
        "form": "base",
        "types": [
          "Rock",
          "Ground"
        ],
        "stats": {
          "hp": 40,
          "attack": 80,
          "defense": 100,
          "special-attack": 30,
          "special-defense": 30,
          "speed": 20
        }
      },
      {
        "id": "10109",
        "height": 4,
        "weight": 203,
        "base_experience": 60,
        "name": "Alolan Geodude",
        "form": "Alolan Form",
        "types": [
          "Rock",
          "Electric"
        ],
        "stats": {
          "hp": 40,
          "attack": 80,
          "defense": 100,
          "special-attack": 30,
          "special-defense": 30,
          "speed": 20
        }
      }
    ]
  },
  {
    "id": 75,
    "capture_rate": 120,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Humanoid",
    "color": "Brown",
    "forms": [
      {
        "id": "75",
        "height": 10,
        "weight": 1050,
        "base_experience": 137,
        "name": "Graveler",
        "form": "base",
        "types": [
          "Rock",
          "Ground"
        ],
        "stats": {
          "hp": 55,
          "attack": 95,
          "defense": 115,
          "special-attack": 45,
          "special-defense": 45,
          "speed": 35
        }
      },
      {
        "id": "10110",
        "height": 10,
        "weight": 1100,
        "base_experience": 137,
        "name": "Alolan Graveler",
        "form": "Alolan Form",
        "types": [
          "Rock",
          "Electric"
        ],
        "stats": {
          "hp": 55,
          "attack": 95,
          "defense": 115,
          "special-attack": 45,
          "special-defense": 45,
          "speed": 35
        }
      }
    ]
  },
  {
    "id": 76,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Humanoid",
    "color": "Brown",
    "forms": [
      {
        "id": "76",
        "height": 14,
        "weight": 3000,
        "base_experience": 223,
        "name": "Golem",
        "form": "base",
        "types": [
          "Rock",
          "Ground"
        ],
        "stats": {
          "hp": 80,
          "attack": 120,
          "defense": 130,
          "special-attack": 55,
          "special-defense": 65,
          "speed": 45
        }
      },
      {
        "id": "10111",
        "height": 17,
        "weight": 3160,
        "base_experience": 223,
        "name": "Alolan Golem",
        "form": "Alolan Form",
        "types": [
          "Rock",
          "Electric"
        ],
        "stats": {
          "hp": 80,
          "attack": 120,
          "defense": 130,
          "special-attack": 55,
          "special-defense": 65,
          "speed": 45
        }
      }
    ]
  },
  {
    "id": 77,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Yellow",
    "forms": [
      {
        "id": "77",
        "height": 10,
        "weight": 300,
        "base_experience": 82,
        "name": "Ponyta",
        "form": "base",
        "types": [
          "Fire"
        ],
        "stats": {
          "hp": 50,
          "attack": 85,
          "defense": 55,
          "special-attack": 65,
          "special-defense": 65,
          "speed": 90
        }
      },
      {
        "id": "10162",
        "height": 8,
        "weight": 240,
        "base_experience": 82,
        "name": "Galarian Ponyta",
        "form": "Galarian Form",
        "types": [
          "Psychic"
        ],
        "stats": {
          "hp": 50,
          "attack": 85,
          "defense": 55,
          "special-attack": 65,
          "special-defense": 65,
          "speed": 90
        }
      }
    ]
  },
  {
    "id": 78,
    "capture_rate": 60,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Yellow",
    "forms": [
      {
        "id": "78",
        "height": 17,
        "weight": 950,
        "base_experience": 175,
        "name": "Rapidash",
        "form": "base",
        "types": [
          "Fire"
        ],
        "stats": {
          "hp": 65,
          "attack": 100,
          "defense": 70,
          "special-attack": 80,
          "special-defense": 80,
          "speed": 105
        }
      },
      {
        "id": "10163",
        "height": 17,
        "weight": 800,
        "base_experience": 175,
        "name": "Galarian Rapidash",
        "form": "Galarian Form",
        "types": [
          "Psychic",
          "Fairy"
        ],
        "stats": {
          "hp": 65,
          "attack": 100,
          "defense": 70,
          "special-attack": 80,
          "special-defense": 80,
          "speed": 105
        }
      }
    ]
  },
  {
    "id": 79,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Quadruped",
    "color": "Pink",
    "forms": [
      {
        "id": "79",
        "height": 12,
        "weight": 360,
        "base_experience": 63,
        "name": "Slowpoke",
        "form": "base",
        "types": [
          "Water",
          "Psychic"
        ],
        "stats": {
          "hp": 90,
          "attack": 65,
          "defense": 65,
          "special-attack": 40,
          "special-defense": 40,
          "speed": 15
        }
      },
      {
        "id": "10164",
        "height": 12,
        "weight": 360,
        "base_experience": 63,
        "name": "Galarian Slowpoke",
        "form": "Galarian Form",
        "types": [
          "Psychic"
        ],
        "stats": {
          "hp": 90,
          "attack": 65,
          "defense": 65,
          "special-attack": 40,
          "special-defense": 40,
          "speed": 15
        }
      }
    ]
  },
  {
    "id": 80,
    "capture_rate": 75,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Upright",
    "color": "Pink",
    "forms": [
      {
        "id": "80",
        "height": 16,
        "weight": 785,
        "base_experience": 172,
        "name": "Slowbro",
        "form": "base",
        "types": [
          "Water",
          "Psychic"
        ],
        "stats": {
          "hp": 95,
          "attack": 75,
          "defense": 110,
          "special-attack": 100,
          "special-defense": 80,
          "speed": 30
        }
      },
      {
        "id": "10071",
        "height": 20,
        "weight": 1200,
        "base_experience": 207,
        "name": "Mega Slowbro",
        "form": "Mega",
        "types": [
          "Water",
          "Psychic"
        ],
        "stats": {
          "hp": 95,
          "attack": 75,
          "defense": 180,
          "special-attack": 130,
          "special-defense": 80,
          "speed": 30
        }
      },
      {
        "id": "10165",
        "height": 16,
        "weight": 705,
        "base_experience": 172,
        "name": "Galarian Slowbro",
        "form": "Galarian Form",
        "types": [
          "Poison",
          "Psychic"
        ],
        "stats": {
          "hp": 95,
          "attack": 100,
          "defense": 95,
          "special-attack": 100,
          "special-defense": 70,
          "speed": 30
        }
      }
    ]
  },
  {
    "id": 81,
    "capture_rate": 190,
    "gender_rate": -1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "rough terrain",
    "shape": "Arms",
    "color": "Gray",
    "forms": [
      {
        "id": "81",
        "height": 3,
        "weight": 60,
        "base_experience": 65,
        "name": "Magnemite",
        "form": "base",
        "types": [
          "Electric",
          "Steel"
        ],
        "stats": {
          "hp": 25,
          "attack": 35,
          "defense": 70,
          "special-attack": 95,
          "special-defense": 55,
          "speed": 45
        }
      }
    ]
  },
  {
    "id": 82,
    "capture_rate": 60,
    "gender_rate": -1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "rough terrain",
    "shape": "Heads",
    "color": "Gray",
    "forms": [
      {
        "id": "82",
        "height": 10,
        "weight": 600,
        "base_experience": 163,
        "name": "Magneton",
        "form": "base",
        "types": [
          "Electric",
          "Steel"
        ],
        "stats": {
          "hp": 50,
          "attack": 60,
          "defense": 95,
          "special-attack": 120,
          "special-defense": 70,
          "speed": 70
        }
      }
    ]
  },
  {
    "id": 83,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Wings",
    "color": "Brown",
    "forms": [
      {
        "id": "83",
        "height": 8,
        "weight": 150,
        "base_experience": 132,
        "name": "Farfetch’d",
        "form": "base",
        "types": [
          "Normal",
          "Flying"
        ],
        "stats": {
          "hp": 52,
          "attack": 90,
          "defense": 55,
          "special-attack": 58,
          "special-defense": 62,
          "speed": 60
        }
      },
      {
        "id": "10166",
        "height": 8,
        "weight": 420,
        "base_experience": 132,
        "name": "Galarian Farfetch’d",
        "form": "Galarian Form",
        "types": [
          "Fighting"
        ],
        "stats": {
          "hp": 52,
          "attack": 95,
          "defense": 55,
          "special-attack": 58,
          "special-defense": 62,
          "speed": 55
        }
      }
    ]
  },
  {
    "id": 84,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Legs",
    "color": "Brown",
    "forms": [
      {
        "id": "84",
        "height": 14,
        "weight": 392,
        "base_experience": 62,
        "name": "Doduo",
        "form": "base",
        "types": [
          "Normal",
          "Flying"
        ],
        "stats": {
          "hp": 35,
          "attack": 85,
          "defense": 45,
          "special-attack": 35,
          "special-defense": 35,
          "speed": 75
        }
      }
    ]
  },
  {
    "id": 85,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Legs",
    "color": "Brown",
    "forms": [
      {
        "id": "85",
        "height": 18,
        "weight": 852,
        "base_experience": 165,
        "name": "Dodrio",
        "form": "base",
        "types": [
          "Normal",
          "Flying"
        ],
        "stats": {
          "hp": 60,
          "attack": 110,
          "defense": 70,
          "special-attack": 60,
          "special-defense": 60,
          "speed": 110
        }
      }
    ]
  },
  {
    "id": 86,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "sea",
    "shape": "Fish",
    "color": "White",
    "forms": [
      {
        "id": "86",
        "height": 11,
        "weight": 900,
        "base_experience": 65,
        "name": "Seel",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 65,
          "attack": 45,
          "defense": 55,
          "special-attack": 45,
          "special-defense": 70,
          "speed": 45
        }
      }
    ]
  },
  {
    "id": 87,
    "capture_rate": 75,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "sea",
    "shape": "Fish",
    "color": "White",
    "forms": [
      {
        "id": "87",
        "height": 17,
        "weight": 1200,
        "base_experience": 166,
        "name": "Dewgong",
        "form": "base",
        "types": [
          "Water",
          "Ice"
        ],
        "stats": {
          "hp": 90,
          "attack": 70,
          "defense": 80,
          "special-attack": 70,
          "special-defense": 95,
          "speed": 70
        }
      }
    ]
  },
  {
    "id": 88,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Arms",
    "color": "Purple",
    "forms": [
      {
        "id": "88",
        "height": 9,
        "weight": 300,
        "base_experience": 65,
        "name": "Grimer",
        "form": "base",
        "types": [
          "Poison"
        ],
        "stats": {
          "hp": 80,
          "attack": 80,
          "defense": 50,
          "special-attack": 40,
          "special-defense": 50,
          "speed": 25
        }
      },
      {
        "id": "10112",
        "height": 7,
        "weight": 420,
        "base_experience": 65,
        "name": "Alolan Grimer",
        "form": "Alolan Form",
        "types": [
          "Poison",
          "Dark"
        ],
        "stats": {
          "hp": 80,
          "attack": 80,
          "defense": 50,
          "special-attack": 40,
          "special-defense": 50,
          "speed": 25
        }
      }
    ]
  },
  {
    "id": 89,
    "capture_rate": 75,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Arms",
    "color": "Purple",
    "forms": [
      {
        "id": "89",
        "height": 12,
        "weight": 300,
        "base_experience": 175,
        "name": "Muk",
        "form": "base",
        "types": [
          "Poison"
        ],
        "stats": {
          "hp": 105,
          "attack": 105,
          "defense": 75,
          "special-attack": 65,
          "special-defense": 100,
          "speed": 50
        }
      },
      {
        "id": "10113",
        "height": 10,
        "weight": 520,
        "base_experience": 175,
        "name": "Alolan Muk",
        "form": "Alolan Form",
        "types": [
          "Poison",
          "Dark"
        ],
        "stats": {
          "hp": 105,
          "attack": 105,
          "defense": 75,
          "special-attack": 65,
          "special-defense": 100,
          "speed": 50
        }
      }
    ]
  },
  {
    "id": 90,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "sea",
    "shape": "Ball",
    "color": "Purple",
    "forms": [
      {
        "id": "90",
        "height": 3,
        "weight": 40,
        "base_experience": 61,
        "name": "Shellder",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 30,
          "attack": 65,
          "defense": 100,
          "special-attack": 45,
          "special-defense": 25,
          "speed": 40
        }
      }
    ]
  },
  {
    "id": 91,
    "capture_rate": 60,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "sea",
    "shape": "Ball",
    "color": "Purple",
    "forms": [
      {
        "id": "91",
        "height": 15,
        "weight": 1325,
        "base_experience": 184,
        "name": "Cloyster",
        "form": "base",
        "types": [
          "Water",
          "Ice"
        ],
        "stats": {
          "hp": 50,
          "attack": 95,
          "defense": 180,
          "special-attack": 85,
          "special-defense": 45,
          "speed": 70
        }
      }
    ]
  },
  {
    "id": 92,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "cave",
    "shape": "Ball",
    "color": "Purple",
    "forms": [
      {
        "id": "92",
        "height": 13,
        "weight": 1,
        "base_experience": 62,
        "name": "Gastly",
        "form": "base",
        "types": [
          "Ghost",
          "Poison"
        ],
        "stats": {
          "hp": 30,
          "attack": 35,
          "defense": 30,
          "special-attack": 100,
          "special-defense": 35,
          "speed": 80
        }
      }
    ]
  },
  {
    "id": 93,
    "capture_rate": 90,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "cave",
    "shape": "Arms",
    "color": "Purple",
    "forms": [
      {
        "id": "93",
        "height": 16,
        "weight": 1,
        "base_experience": 142,
        "name": "Haunter",
        "form": "base",
        "types": [
          "Ghost",
          "Poison"
        ],
        "stats": {
          "hp": 45,
          "attack": 50,
          "defense": 45,
          "special-attack": 115,
          "special-defense": 55,
          "speed": 95
        }
      }
    ]
  },
  {
    "id": 94,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "cave",
    "shape": "Upright",
    "color": "Purple",
    "forms": [
      {
        "id": "94",
        "height": 15,
        "weight": 405,
        "base_experience": 225,
        "name": "Gengar",
        "form": "base",
        "types": [
          "Ghost",
          "Poison"
        ],
        "stats": {
          "hp": 60,
          "attack": 65,
          "defense": 60,
          "special-attack": 130,
          "special-defense": 75,
          "speed": 110
        }
      },
      {
        "id": "10038",
        "height": 14,
        "weight": 405,
        "base_experience": 270,
        "name": "Mega Gengar",
        "form": "Mega",
        "types": [
          "Ghost",
          "Poison"
        ],
        "stats": {
          "hp": 60,
          "attack": 65,
          "defense": 80,
          "special-attack": 170,
          "special-defense": 95,
          "speed": 130
        }
      },
      {
        "id": "10202",
        "height": 200,
        "weight": 10000,
        "base_experience": 225,
        "name": "Gigantamax Gengar",
        "form": "Gigantamax Form",
        "types": [
          "Ghost",
          "Poison"
        ],
        "stats": {
          "hp": 60,
          "attack": 65,
          "defense": 60,
          "special-attack": 130,
          "special-defense": 75,
          "speed": 110
        }
      }
    ]
  },
  {
    "id": 95,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "cave",
    "shape": "Squiggle",
    "color": "Gray",
    "forms": [
      {
        "id": "95",
        "height": 88,
        "weight": 2100,
        "base_experience": 77,
        "name": "Onix",
        "form": "base",
        "types": [
          "Rock",
          "Ground"
        ],
        "stats": {
          "hp": 35,
          "attack": 45,
          "defense": 160,
          "special-attack": 30,
          "special-defense": 45,
          "speed": 70
        }
      }
    ]
  },
  {
    "id": 96,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Humanoid",
    "color": "Yellow",
    "forms": [
      {
        "id": "96",
        "height": 10,
        "weight": 324,
        "base_experience": 66,
        "name": "Drowzee",
        "form": "base",
        "types": [
          "Psychic"
        ],
        "stats": {
          "hp": 60,
          "attack": 48,
          "defense": 45,
          "special-attack": 43,
          "special-defense": 90,
          "speed": 42
        }
      }
    ]
  },
  {
    "id": 97,
    "capture_rate": 75,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Humanoid",
    "color": "Yellow",
    "forms": [
      {
        "id": "97",
        "height": 16,
        "weight": 756,
        "base_experience": 169,
        "name": "Hypno",
        "form": "base",
        "types": [
          "Psychic"
        ],
        "stats": {
          "hp": 85,
          "attack": 73,
          "defense": 70,
          "special-attack": 73,
          "special-defense": 115,
          "speed": 67
        }
      }
    ]
  },
  {
    "id": 98,
    "capture_rate": 225,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Armor",
    "color": "Red",
    "forms": [
      {
        "id": "98",
        "height": 4,
        "weight": 65,
        "base_experience": 65,
        "name": "Krabby",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 30,
          "attack": 105,
          "defense": 90,
          "special-attack": 25,
          "special-defense": 25,
          "speed": 50
        }
      }
    ]
  },
  {
    "id": 99,
    "capture_rate": 60,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Armor",
    "color": "Red",
    "forms": [
      {
        "id": "99",
        "height": 13,
        "weight": 600,
        "base_experience": 166,
        "name": "Kingler",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 55,
          "attack": 130,
          "defense": 115,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 75
        }
      },
      {
        "id": "10203",
        "height": 190,
        "weight": 10000,
        "base_experience": 166,
        "name": "Gigantamax Kingler",
        "form": "Gigantamax Form",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 55,
          "attack": 130,
          "defense": 115,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 75
        }
      }
    ]
  },
  {
    "id": 100,
    "capture_rate": 190,
    "gender_rate": -1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Ball",
    "color": "Red",
    "forms": [
      {
        "id": "100",
        "height": 5,
        "weight": 104,
        "base_experience": 66,
        "name": "Voltorb",
        "form": "base",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 40,
          "attack": 30,
          "defense": 50,
          "special-attack": 55,
          "special-defense": 55,
          "speed": 100
        }
      },
      {
        "id": "10231",
        "height": 5,
        "weight": 130,
        "base_experience": 66,
        "name": "Hisuian Voltorb",
        "form": "Hisuian Form",
        "types": [
          "Electric",
          "Grass"
        ],
        "stats": {
          "hp": 40,
          "attack": 30,
          "defense": 50,
          "special-attack": 55,
          "special-defense": 55,
          "speed": 100
        }
      }
    ]
  },
  {
    "id": 101,
    "capture_rate": 60,
    "gender_rate": -1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Ball",
    "color": "Red",
    "forms": [
      {
        "id": "101",
        "height": 12,
        "weight": 666,
        "base_experience": 172,
        "name": "Electrode",
        "form": "base",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 60,
          "attack": 50,
          "defense": 70,
          "special-attack": 80,
          "special-defense": 80,
          "speed": 150
        }
      },
      {
        "id": "10232",
        "height": 12,
        "weight": 710,
        "base_experience": 172,
        "name": "Hisuian Electrode",
        "form": "Hisuian Form",
        "types": [
          "Electric",
          "Grass"
        ],
        "stats": {
          "hp": 60,
          "attack": 50,
          "defense": 70,
          "special-attack": 80,
          "special-defense": 80,
          "speed": 150
        }
      }
    ]
  },
  {
    "id": 102,
    "capture_rate": 90,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Heads",
    "color": "Pink",
    "forms": [
      {
        "id": "102",
        "height": 4,
        "weight": 25,
        "base_experience": 65,
        "name": "Exeggcute",
        "form": "base",
        "types": [
          "Grass",
          "Psychic"
        ],
        "stats": {
          "hp": 60,
          "attack": 40,
          "defense": 80,
          "special-attack": 60,
          "special-defense": 45,
          "speed": 40
        }
      }
    ]
  },
  {
    "id": 103,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Legs",
    "color": "Yellow",
    "forms": [
      {
        "id": "103",
        "height": 20,
        "weight": 1200,
        "base_experience": 186,
        "name": "Exeggutor",
        "form": "base",
        "types": [
          "Grass",
          "Psychic"
        ],
        "stats": {
          "hp": 95,
          "attack": 95,
          "defense": 85,
          "special-attack": 125,
          "special-defense": 75,
          "speed": 55
        }
      },
      {
        "id": "10114",
        "height": 109,
        "weight": 4156,
        "base_experience": 186,
        "name": "Alolan Exeggutor",
        "form": "Alolan Form",
        "types": [
          "Grass",
          "Dragon"
        ],
        "stats": {
          "hp": 95,
          "attack": 105,
          "defense": 85,
          "special-attack": 125,
          "special-defense": 75,
          "speed": 45
        }
      }
    ]
  },
  {
    "id": 104,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Upright",
    "color": "Brown",
    "forms": [
      {
        "id": "104",
        "height": 4,
        "weight": 65,
        "base_experience": 64,
        "name": "Cubone",
        "form": "base",
        "types": [
          "Ground"
        ],
        "stats": {
          "hp": 50,
          "attack": 50,
          "defense": 95,
          "special-attack": 40,
          "special-defense": 50,
          "speed": 35
        }
      }
    ]
  },
  {
    "id": 105,
    "capture_rate": 75,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Upright",
    "color": "Brown",
    "forms": [
      {
        "id": "105",
        "height": 10,
        "weight": 450,
        "base_experience": 149,
        "name": "Marowak",
        "form": "base",
        "types": [
          "Ground"
        ],
        "stats": {
          "hp": 60,
          "attack": 80,
          "defense": 110,
          "special-attack": 50,
          "special-defense": 80,
          "speed": 45
        }
      },
      {
        "id": "10115",
        "height": 10,
        "weight": 340,
        "base_experience": 149,
        "name": "Alolan Marowak",
        "form": "Alolan Form",
        "types": [
          "Fire",
          "Ghost"
        ],
        "stats": {
          "hp": 60,
          "attack": 80,
          "defense": 110,
          "special-attack": 50,
          "special-defense": 80,
          "speed": 45
        }
      }
    ]
  },
  {
    "id": 106,
    "capture_rate": 45,
    "gender_rate": 0,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Humanoid",
    "color": "Brown",
    "forms": [
      {
        "id": "106",
        "height": 15,
        "weight": 498,
        "base_experience": 159,
        "name": "Hitmonlee",
        "form": "base",
        "types": [
          "Fighting"
        ],
        "stats": {
          "hp": 50,
          "attack": 120,
          "defense": 53,
          "special-attack": 35,
          "special-defense": 110,
          "speed": 87
        }
      }
    ]
  },
  {
    "id": 107,
    "capture_rate": 45,
    "gender_rate": 0,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Humanoid",
    "color": "Brown",
    "forms": [
      {
        "id": "107",
        "height": 14,
        "weight": 502,
        "base_experience": 159,
        "name": "Hitmonchan",
        "form": "base",
        "types": [
          "Fighting"
        ],
        "stats": {
          "hp": 50,
          "attack": 105,
          "defense": 79,
          "special-attack": 35,
          "special-defense": 110,
          "speed": 76
        }
      }
    ]
  },
  {
    "id": 108,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Upright",
    "color": "Pink",
    "forms": [
      {
        "id": "108",
        "height": 12,
        "weight": 655,
        "base_experience": 77,
        "name": "Lickitung",
        "form": "base",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 90,
          "attack": 55,
          "defense": 75,
          "special-attack": 60,
          "special-defense": 75,
          "speed": 30
        }
      }
    ]
  },
  {
    "id": 109,
    "capture_rate": 190,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Ball",
    "color": "Purple",
    "forms": [
      {
        "id": "109",
        "height": 6,
        "weight": 10,
        "base_experience": 68,
        "name": "Koffing",
        "form": "base",
        "types": [
          "Poison"
        ],
        "stats": {
          "hp": 40,
          "attack": 65,
          "defense": 95,
          "special-attack": 60,
          "special-defense": 45,
          "speed": 35
        }
      }
    ]
  },
  {
    "id": 110,
    "capture_rate": 60,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Heads",
    "color": "Purple",
    "forms": [
      {
        "id": "110",
        "height": 12,
        "weight": 95,
        "base_experience": 172,
        "name": "Weezing",
        "form": "base",
        "types": [
          "Poison"
        ],
        "stats": {
          "hp": 65,
          "attack": 90,
          "defense": 120,
          "special-attack": 85,
          "special-defense": 70,
          "speed": 60
        }
      },
      {
        "id": "10167",
        "height": 30,
        "weight": 160,
        "base_experience": 172,
        "name": "Galarian Weezing",
        "form": "Galarian Form",
        "types": [
          "Poison",
          "Fairy"
        ],
        "stats": {
          "hp": 65,
          "attack": 90,
          "defense": 120,
          "special-attack": 85,
          "special-defense": 70,
          "speed": 60
        }
      }
    ]
  },
  {
    "id": 111,
    "capture_rate": 120,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "rough terrain",
    "shape": "Quadruped",
    "color": "Gray",
    "forms": [
      {
        "id": "111",
        "height": 10,
        "weight": 1150,
        "base_experience": 69,
        "name": "Rhyhorn",
        "form": "base",
        "types": [
          "Ground",
          "Rock"
        ],
        "stats": {
          "hp": 80,
          "attack": 85,
          "defense": 95,
          "special-attack": 30,
          "special-defense": 30,
          "speed": 25
        }
      }
    ]
  },
  {
    "id": 112,
    "capture_rate": 60,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "rough terrain",
    "shape": "Upright",
    "color": "Gray",
    "forms": [
      {
        "id": "112",
        "height": 19,
        "weight": 1200,
        "base_experience": 170,
        "name": "Rhydon",
        "form": "base",
        "types": [
          "Ground",
          "Rock"
        ],
        "stats": {
          "hp": 105,
          "attack": 130,
          "defense": 120,
          "special-attack": 45,
          "special-defense": 45,
          "speed": 40
        }
      }
    ]
  },
  {
    "id": 113,
    "capture_rate": 30,
    "gender_rate": 8,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Upright",
    "color": "Pink",
    "forms": [
      {
        "id": "113",
        "height": 11,
        "weight": 346,
        "base_experience": 395,
        "name": "Chansey",
        "form": "base",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 250,
          "attack": 5,
          "defense": 5,
          "special-attack": 35,
          "special-defense": 105,
          "speed": 50
        }
      }
    ]
  },
  {
    "id": 114,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Legs",
    "color": "Blue",
    "forms": [
      {
        "id": "114",
        "height": 10,
        "weight": 350,
        "base_experience": 87,
        "name": "Tangela",
        "form": "base",
        "types": [
          "Grass"
        ],
        "stats": {
          "hp": 65,
          "attack": 55,
          "defense": 115,
          "special-attack": 100,
          "special-defense": 40,
          "speed": 60
        }
      }
    ]
  },
  {
    "id": 115,
    "capture_rate": 45,
    "gender_rate": 8,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Upright",
    "color": "Brown",
    "forms": [
      {
        "id": "115",
        "height": 22,
        "weight": 800,
        "base_experience": 172,
        "name": "Kangaskhan",
        "form": "base",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 105,
          "attack": 95,
          "defense": 80,
          "special-attack": 40,
          "special-defense": 80,
          "speed": 90
        }
      },
      {
        "id": "10039",
        "height": 22,
        "weight": 1000,
        "base_experience": 207,
        "name": "Mega Kangaskhan",
        "form": "Mega",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 105,
          "attack": 125,
          "defense": 100,
          "special-attack": 60,
          "special-defense": 100,
          "speed": 100
        }
      }
    ]
  },
  {
    "id": 116,
    "capture_rate": 225,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "sea",
    "shape": "Blob",
    "color": "Blue",
    "forms": [
      {
        "id": "116",
        "height": 4,
        "weight": 80,
        "base_experience": 59,
        "name": "Horsea",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 30,
          "attack": 40,
          "defense": 70,
          "special-attack": 70,
          "special-defense": 25,
          "speed": 60
        }
      }
    ]
  },
  {
    "id": 117,
    "capture_rate": 75,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "sea",
    "shape": "Blob",
    "color": "Blue",
    "forms": [
      {
        "id": "117",
        "height": 12,
        "weight": 250,
        "base_experience": 154,
        "name": "Seadra",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 55,
          "attack": 65,
          "defense": 95,
          "special-attack": 95,
          "special-defense": 45,
          "speed": 85
        }
      }
    ]
  },
  {
    "id": 118,
    "capture_rate": 225,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Fish",
    "color": "Red",
    "forms": [
      {
        "id": "118",
        "height": 6,
        "weight": 150,
        "base_experience": 64,
        "name": "Goldeen",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 45,
          "attack": 67,
          "defense": 60,
          "special-attack": 35,
          "special-defense": 50,
          "speed": 63
        }
      }
    ]
  },
  {
    "id": 119,
    "capture_rate": 60,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Fish",
    "color": "Red",
    "forms": [
      {
        "id": "119",
        "height": 13,
        "weight": 390,
        "base_experience": 158,
        "name": "Seaking",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 80,
          "attack": 92,
          "defense": 65,
          "special-attack": 65,
          "special-defense": 80,
          "speed": 68
        }
      }
    ]
  },
  {
    "id": 120,
    "capture_rate": 225,
    "gender_rate": -1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "sea",
    "shape": "Blob",
    "color": "Brown",
    "forms": [
      {
        "id": "120",
        "height": 8,
        "weight": 345,
        "base_experience": 68,
        "name": "Staryu",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 30,
          "attack": 45,
          "defense": 55,
          "special-attack": 70,
          "special-defense": 55,
          "speed": 85
        }
      }
    ]
  },
  {
    "id": 121,
    "capture_rate": 60,
    "gender_rate": -1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "sea",
    "shape": "Blob",
    "color": "Purple",
    "forms": [
      {
        "id": "121",
        "height": 11,
        "weight": 800,
        "base_experience": 182,
        "name": "Starmie",
        "form": "base",
        "types": [
          "Water",
          "Psychic"
        ],
        "stats": {
          "hp": 60,
          "attack": 75,
          "defense": 85,
          "special-attack": 100,
          "special-defense": 85,
          "speed": 115
        }
      },
      {
        "id": "10280",
        "height": 23,
        "weight": 800,
        "base_experience": 0,
        "name": "Mega Starmie",
        "form": "Mega",
        "types": [
          "Water",
          "Psychic"
        ],
        "stats": {
          "hp": 60,
          "attack": 100,
          "defense": 105,
          "special-attack": 130,
          "special-defense": 105,
          "speed": 120
        }
      }
    ]
  },
  {
    "id": 122,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Humanoid",
    "color": "Pink",
    "forms": [
      {
        "id": "122",
        "height": 13,
        "weight": 545,
        "base_experience": 161,
        "name": "Mr. Mime",
        "form": "base",
        "types": [
          "Psychic",
          "Fairy"
        ],
        "stats": {
          "hp": 40,
          "attack": 45,
          "defense": 65,
          "special-attack": 100,
          "special-defense": 120,
          "speed": 90
        }
      },
      {
        "id": "10168",
        "height": 14,
        "weight": 568,
        "base_experience": 161,
        "name": "Galarian Mr. Mime",
        "form": "Galarian Form",
        "types": [
          "Ice",
          "Psychic"
        ],
        "stats": {
          "hp": 50,
          "attack": 65,
          "defense": 65,
          "special-attack": 90,
          "special-defense": 90,
          "speed": 100
        }
      }
    ]
  },
  {
    "id": 123,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Bug wings",
    "color": "Green",
    "forms": [
      {
        "id": "123",
        "height": 15,
        "weight": 560,
        "base_experience": 100,
        "name": "Scyther",
        "form": "base",
        "types": [
          "Bug",
          "Flying"
        ],
        "stats": {
          "hp": 70,
          "attack": 110,
          "defense": 80,
          "special-attack": 55,
          "special-defense": 80,
          "speed": 105
        }
      }
    ]
  },
  {
    "id": 124,
    "capture_rate": 45,
    "gender_rate": 8,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Humanoid",
    "color": "Red",
    "forms": [
      {
        "id": "124",
        "height": 14,
        "weight": 406,
        "base_experience": 159,
        "name": "Jynx",
        "form": "base",
        "types": [
          "Ice",
          "Psychic"
        ],
        "stats": {
          "hp": 65,
          "attack": 50,
          "defense": 35,
          "special-attack": 115,
          "special-defense": 95,
          "speed": 95
        }
      }
    ]
  },
  {
    "id": 125,
    "capture_rate": 45,
    "gender_rate": 2,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Upright",
    "color": "Yellow",
    "forms": [
      {
        "id": "125",
        "height": 11,
        "weight": 300,
        "base_experience": 172,
        "name": "Electabuzz",
        "form": "base",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 65,
          "attack": 83,
          "defense": 57,
          "special-attack": 95,
          "special-defense": 85,
          "speed": 105
        }
      }
    ]
  },
  {
    "id": 126,
    "capture_rate": 45,
    "gender_rate": 2,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Upright",
    "color": "Red",
    "forms": [
      {
        "id": "126",
        "height": 13,
        "weight": 445,
        "base_experience": 173,
        "name": "Magmar",
        "form": "base",
        "types": [
          "Fire"
        ],
        "stats": {
          "hp": 65,
          "attack": 95,
          "defense": 57,
          "special-attack": 100,
          "special-defense": 85,
          "speed": 93
        }
      }
    ]
  },
  {
    "id": 127,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "forest",
    "shape": "Humanoid",
    "color": "Brown",
    "forms": [
      {
        "id": "127",
        "height": 15,
        "weight": 550,
        "base_experience": 175,
        "name": "Pinsir",
        "form": "base",
        "types": [
          "Bug"
        ],
        "stats": {
          "hp": 65,
          "attack": 125,
          "defense": 100,
          "special-attack": 55,
          "special-defense": 70,
          "speed": 85
        }
      },
      {
        "id": "10040",
        "height": 17,
        "weight": 590,
        "base_experience": 210,
        "name": "Mega Pinsir",
        "form": "Mega",
        "types": [
          "Bug",
          "Flying"
        ],
        "stats": {
          "hp": 65,
          "attack": 155,
          "defense": 120,
          "special-attack": 65,
          "special-defense": 90,
          "speed": 105
        }
      }
    ]
  },
  {
    "id": 128,
    "capture_rate": 45,
    "gender_rate": 0,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "grassland",
    "shape": "Quadruped",
    "color": "Brown",
    "forms": [
      {
        "id": "128",
        "height": 14,
        "weight": 884,
        "base_experience": 172,
        "name": "Tauros",
        "form": "base",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 75,
          "attack": 100,
          "defense": 95,
          "special-attack": 40,
          "special-defense": 70,
          "speed": 110
        }
      },
      {
        "id": "10250",
        "height": 14,
        "weight": 1150,
        "base_experience": 172,
        "name": "Paldean Tauros (Combat Breed)",
        "form": "Paldean Form (Combat Breed)",
        "types": [
          "Fighting"
        ],
        "stats": {
          "hp": 75,
          "attack": 110,
          "defense": 105,
          "special-attack": 30,
          "special-defense": 70,
          "speed": 100
        }
      },
      {
        "id": "10251",
        "height": 14,
        "weight": 850,
        "base_experience": 172,
        "name": "Paldean Tauros (Blaze Breed)",
        "form": "Paldean Form (Blaze Breed)",
        "types": [
          "Fighting",
          "Fire"
        ],
        "stats": {
          "hp": 75,
          "attack": 110,
          "defense": 105,
          "special-attack": 30,
          "special-defense": 70,
          "speed": 100
        }
      },
      {
        "id": "10252",
        "height": 14,
        "weight": 1100,
        "base_experience": 172,
        "name": "Paldean Tauros (Aqua Breed)",
        "form": "Paldean Form (Aqua Breed)",
        "types": [
          "Fighting",
          "Water"
        ],
        "stats": {
          "hp": 75,
          "attack": 110,
          "defense": 105,
          "special-attack": 30,
          "special-defense": 70,
          "speed": 100
        }
      }
    ]
  },
  {
    "id": 129,
    "capture_rate": 255,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Fish",
    "color": "Red",
    "forms": [
      {
        "id": "129",
        "height": 9,
        "weight": 100,
        "base_experience": 40,
        "name": "Magikarp",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 20,
          "attack": 10,
          "defense": 55,
          "special-attack": 15,
          "special-defense": 20,
          "speed": 80
        }
      }
    ]
  },
  {
    "id": 130,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Squiggle",
    "color": "Blue",
    "forms": [
      {
        "id": "130",
        "height": 65,
        "weight": 2350,
        "base_experience": 189,
        "name": "Gyarados",
        "form": "base",
        "types": [
          "Water",
          "Flying"
        ],
        "stats": {
          "hp": 95,
          "attack": 125,
          "defense": 79,
          "special-attack": 60,
          "special-defense": 100,
          "speed": 81
        }
      },
      {
        "id": "10041",
        "height": 65,
        "weight": 3050,
        "base_experience": 224,
        "name": "Mega Gyarados",
        "form": "Mega",
        "types": [
          "Water",
          "Dark"
        ],
        "stats": {
          "hp": 95,
          "attack": 155,
          "defense": 109,
          "special-attack": 70,
          "special-defense": 130,
          "speed": 81
        }
      }
    ]
  },
  {
    "id": 131,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "sea",
    "shape": "Fish",
    "color": "Blue",
    "forms": [
      {
        "id": "131",
        "height": 25,
        "weight": 2200,
        "base_experience": 187,
        "name": "Lapras",
        "form": "base",
        "types": [
          "Water",
          "Ice"
        ],
        "stats": {
          "hp": 130,
          "attack": 85,
          "defense": 80,
          "special-attack": 85,
          "special-defense": 95,
          "speed": 60
        }
      },
      {
        "id": "10204",
        "height": 240,
        "weight": 10000,
        "base_experience": 187,
        "name": "Gigantamax Lapras",
        "form": "Gigantamax Form",
        "types": [
          "Water",
          "Ice"
        ],
        "stats": {
          "hp": 130,
          "attack": 85,
          "defense": 80,
          "special-attack": 85,
          "special-defense": 95,
          "speed": 60
        }
      }
    ]
  },
  {
    "id": 132,
    "capture_rate": 35,
    "gender_rate": -1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Ball",
    "color": "Purple",
    "forms": [
      {
        "id": "132",
        "height": 3,
        "weight": 40,
        "base_experience": 101,
        "name": "Ditto",
        "form": "base",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 48,
          "attack": 48,
          "defense": 48,
          "special-attack": 48,
          "special-defense": 48,
          "speed": 48
        }
      }
    ]
  },
  {
    "id": 133,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": true,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Quadruped",
    "color": "Brown",
    "forms": [
      {
        "id": "133",
        "height": 3,
        "weight": 65,
        "base_experience": 65,
        "name": "Eevee",
        "form": "base",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 55,
          "attack": 55,
          "defense": 50,
          "special-attack": 45,
          "special-defense": 65,
          "speed": 55
        }
      },
      {
        "id": "10205",
        "height": 180,
        "weight": 10000,
        "base_experience": 65,
        "name": "Gigantamax Eevee",
        "form": "Gigantamax Form",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 55,
          "attack": 55,
          "defense": 50,
          "special-attack": 45,
          "special-defense": 65,
          "speed": 55
        }
      }
    ]
  },
  {
    "id": 134,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Quadruped",
    "color": "Blue",
    "forms": [
      {
        "id": "134",
        "height": 10,
        "weight": 290,
        "base_experience": 184,
        "name": "Vaporeon",
        "form": "base",
        "types": [
          "Water"
        ],
        "stats": {
          "hp": 130,
          "attack": 65,
          "defense": 60,
          "special-attack": 110,
          "special-defense": 95,
          "speed": 65
        }
      }
    ]
  },
  {
    "id": 135,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Quadruped",
    "color": "Yellow",
    "forms": [
      {
        "id": "135",
        "height": 8,
        "weight": 245,
        "base_experience": 184,
        "name": "Jolteon",
        "form": "base",
        "types": [
          "Electric"
        ],
        "stats": {
          "hp": 65,
          "attack": 65,
          "defense": 60,
          "special-attack": 110,
          "special-defense": 95,
          "speed": 130
        }
      }
    ]
  },
  {
    "id": 136,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Quadruped",
    "color": "Red",
    "forms": [
      {
        "id": "136",
        "height": 9,
        "weight": 250,
        "base_experience": 184,
        "name": "Flareon",
        "form": "base",
        "types": [
          "Fire"
        ],
        "stats": {
          "hp": 65,
          "attack": 130,
          "defense": 60,
          "special-attack": 95,
          "special-defense": 110,
          "speed": 65
        }
      }
    ]
  },
  {
    "id": 137,
    "capture_rate": 45,
    "gender_rate": -1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "urban",
    "shape": "Legs",
    "color": "Pink",
    "forms": [
      {
        "id": "137",
        "height": 8,
        "weight": 365,
        "base_experience": 79,
        "name": "Porygon",
        "form": "base",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 65,
          "attack": 60,
          "defense": 70,
          "special-attack": 85,
          "special-defense": 75,
          "speed": 40
        }
      }
    ]
  },
  {
    "id": 138,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "sea",
    "shape": "Tentacles",
    "color": "Blue",
    "forms": [
      {
        "id": "138",
        "height": 4,
        "weight": 75,
        "base_experience": 71,
        "name": "Omanyte",
        "form": "base",
        "types": [
          "Rock",
          "Water"
        ],
        "stats": {
          "hp": 35,
          "attack": 40,
          "defense": 100,
          "special-attack": 90,
          "special-defense": 55,
          "speed": 35
        }
      }
    ]
  },
  {
    "id": 139,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "sea",
    "shape": "Tentacles",
    "color": "Blue",
    "forms": [
      {
        "id": "139",
        "height": 10,
        "weight": 350,
        "base_experience": 173,
        "name": "Omastar",
        "form": "base",
        "types": [
          "Rock",
          "Water"
        ],
        "stats": {
          "hp": 70,
          "attack": 60,
          "defense": 125,
          "special-attack": 115,
          "special-defense": 70,
          "speed": 55
        }
      }
    ]
  },
  {
    "id": 140,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "sea",
    "shape": "Armor",
    "color": "Brown",
    "forms": [
      {
        "id": "140",
        "height": 5,
        "weight": 115,
        "base_experience": 71,
        "name": "Kabuto",
        "form": "base",
        "types": [
          "Rock",
          "Water"
        ],
        "stats": {
          "hp": 30,
          "attack": 80,
          "defense": 90,
          "special-attack": 55,
          "special-defense": 45,
          "speed": 55
        }
      }
    ]
  },
  {
    "id": 141,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "sea",
    "shape": "Upright",
    "color": "Brown",
    "forms": [
      {
        "id": "141",
        "height": 13,
        "weight": 405,
        "base_experience": 173,
        "name": "Kabutops",
        "form": "base",
        "types": [
          "Rock",
          "Water"
        ],
        "stats": {
          "hp": 60,
          "attack": 115,
          "defense": 105,
          "special-attack": 65,
          "special-defense": 70,
          "speed": 80
        }
      }
    ]
  },
  {
    "id": 142,
    "capture_rate": 45,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Wings",
    "color": "Purple",
    "forms": [
      {
        "id": "142",
        "height": 18,
        "weight": 590,
        "base_experience": 180,
        "name": "Aerodactyl",
        "form": "base",
        "types": [
          "Rock",
          "Flying"
        ],
        "stats": {
          "hp": 80,
          "attack": 105,
          "defense": 65,
          "special-attack": 60,
          "special-defense": 75,
          "speed": 130
        }
      },
      {
        "id": "10042",
        "height": 21,
        "weight": 790,
        "base_experience": 215,
        "name": "Mega Aerodactyl",
        "form": "Mega",
        "types": [
          "Rock",
          "Flying"
        ],
        "stats": {
          "hp": 80,
          "attack": 135,
          "defense": 85,
          "special-attack": 70,
          "special-defense": 95,
          "speed": 150
        }
      }
    ]
  },
  {
    "id": 143,
    "capture_rate": 25,
    "gender_rate": 1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "mountain",
    "shape": "Humanoid",
    "color": "Black",
    "forms": [
      {
        "id": "143",
        "height": 21,
        "weight": 4600,
        "base_experience": 189,
        "name": "Snorlax",
        "form": "base",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 160,
          "attack": 110,
          "defense": 65,
          "special-attack": 65,
          "special-defense": 110,
          "speed": 30
        }
      },
      {
        "id": "10206",
        "height": 350,
        "weight": 10000,
        "base_experience": 189,
        "name": "Gigantamax Snorlax",
        "form": "Gigantamax Form",
        "types": [
          "Normal"
        ],
        "stats": {
          "hp": 160,
          "attack": 110,
          "defense": 65,
          "special-attack": 65,
          "special-defense": 110,
          "speed": 30
        }
      }
    ]
  },
  {
    "id": 144,
    "capture_rate": 3,
    "gender_rate": -1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": true,
    "is_mythical": false,
    "habitat": "rare",
    "shape": "Wings",
    "color": "Blue",
    "forms": [
      {
        "id": "144",
        "height": 17,
        "weight": 554,
        "base_experience": 261,
        "name": "Articuno",
        "form": "base",
        "types": [
          "Ice",
          "Flying"
        ],
        "stats": {
          "hp": 90,
          "attack": 85,
          "defense": 100,
          "special-attack": 95,
          "special-defense": 125,
          "speed": 85
        }
      },
      {
        "id": "10169",
        "height": 17,
        "weight": 509,
        "base_experience": 290,
        "name": "Galarian Articuno",
        "form": "Galarian Form",
        "types": [
          "Psychic",
          "Flying"
        ],
        "stats": {
          "hp": 90,
          "attack": 85,
          "defense": 85,
          "special-attack": 125,
          "special-defense": 100,
          "speed": 95
        }
      }
    ]
  },
  {
    "id": 145,
    "capture_rate": 3,
    "gender_rate": -1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": true,
    "is_mythical": false,
    "habitat": "rare",
    "shape": "Wings",
    "color": "Yellow",
    "forms": [
      {
        "id": "145",
        "height": 16,
        "weight": 526,
        "base_experience": 261,
        "name": "Zapdos",
        "form": "base",
        "types": [
          "Electric",
          "Flying"
        ],
        "stats": {
          "hp": 90,
          "attack": 90,
          "defense": 85,
          "special-attack": 125,
          "special-defense": 90,
          "speed": 100
        }
      },
      {
        "id": "10170",
        "height": 16,
        "weight": 582,
        "base_experience": 290,
        "name": "Galarian Zapdos",
        "form": "Galarian Form",
        "types": [
          "Fighting",
          "Flying"
        ],
        "stats": {
          "hp": 90,
          "attack": 125,
          "defense": 90,
          "special-attack": 85,
          "special-defense": 90,
          "speed": 100
        }
      }
    ]
  },
  {
    "id": 146,
    "capture_rate": 3,
    "gender_rate": -1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": true,
    "is_mythical": false,
    "habitat": "rare",
    "shape": "Wings",
    "color": "Yellow",
    "forms": [
      {
        "id": "146",
        "height": 20,
        "weight": 600,
        "base_experience": 261,
        "name": "Moltres",
        "form": "base",
        "types": [
          "Fire",
          "Flying"
        ],
        "stats": {
          "hp": 90,
          "attack": 100,
          "defense": 90,
          "special-attack": 125,
          "special-defense": 85,
          "speed": 90
        }
      },
      {
        "id": "10171",
        "height": 20,
        "weight": 660,
        "base_experience": 290,
        "name": "Galarian Moltres",
        "form": "Galarian Form",
        "types": [
          "Dark",
          "Flying"
        ],
        "stats": {
          "hp": 90,
          "attack": 85,
          "defense": 90,
          "special-attack": 100,
          "special-defense": 125,
          "speed": 90
        }
      }
    ]
  },
  {
    "id": 147,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Squiggle",
    "color": "Blue",
    "forms": [
      {
        "id": "147",
        "height": 18,
        "weight": 33,
        "base_experience": 60,
        "name": "Dratini",
        "form": "base",
        "types": [
          "Dragon"
        ],
        "stats": {
          "hp": 41,
          "attack": 64,
          "defense": 45,
          "special-attack": 50,
          "special-defense": 50,
          "speed": 50
        }
      }
    ]
  },
  {
    "id": 148,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Squiggle",
    "color": "Blue",
    "forms": [
      {
        "id": "148",
        "height": 40,
        "weight": 165,
        "base_experience": 147,
        "name": "Dragonair",
        "form": "base",
        "types": [
          "Dragon"
        ],
        "stats": {
          "hp": 61,
          "attack": 84,
          "defense": 65,
          "special-attack": 70,
          "special-defense": 70,
          "speed": 70
        }
      }
    ]
  },
  {
    "id": 149,
    "capture_rate": 45,
    "gender_rate": 4,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": false,
    "habitat": "water's edge",
    "shape": "Upright",
    "color": "Brown",
    "forms": [
      {
        "id": "149",
        "height": 22,
        "weight": 2100,
        "base_experience": 270,
        "name": "Dragonite",
        "form": "base",
        "types": [
          "Dragon",
          "Flying"
        ],
        "stats": {
          "hp": 91,
          "attack": 134,
          "defense": 95,
          "special-attack": 100,
          "special-defense": 100,
          "speed": 80
        }
      },
      {
        "id": "10281",
        "height": 22,
        "weight": 2900,
        "base_experience": 0,
        "name": "Mega Dragonite",
        "form": "Mega",
        "types": [
          "Dragon",
          "Flying"
        ],
        "stats": {
          "hp": 91,
          "attack": 124,
          "defense": 115,
          "special-attack": 145,
          "special-defense": 125,
          "speed": 100
        }
      }
    ]
  },
  {
    "id": 150,
    "capture_rate": 3,
    "gender_rate": -1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": true,
    "is_mythical": false,
    "habitat": "rare",
    "shape": "Upright",
    "color": "Purple",
    "forms": [
      {
        "id": "150",
        "height": 20,
        "weight": 1220,
        "base_experience": 306,
        "name": "Mewtwo",
        "form": "base",
        "types": [
          "Psychic"
        ],
        "stats": {
          "hp": 106,
          "attack": 110,
          "defense": 90,
          "special-attack": 154,
          "special-defense": 90,
          "speed": 130
        }
      },
      {
        "id": "10043",
        "height": 23,
        "weight": 1270,
        "base_experience": 351,
        "name": "Mega Mewtwo X",
        "form": "Mega X",
        "types": [
          "Psychic",
          "Fighting"
        ],
        "stats": {
          "hp": 106,
          "attack": 190,
          "defense": 100,
          "special-attack": 154,
          "special-defense": 100,
          "speed": 130
        }
      },
      {
        "id": "10044",
        "height": 15,
        "weight": 330,
        "base_experience": 351,
        "name": "Mega Mewtwo Y",
        "form": "Mega Y",
        "types": [
          "Psychic"
        ],
        "stats": {
          "hp": 106,
          "attack": 150,
          "defense": 70,
          "special-attack": 194,
          "special-defense": 120,
          "speed": 140
        }
      }
    ]
  },
  {
    "id": 151,
    "capture_rate": 45,
    "gender_rate": -1,
    "has_gender_differences": false,
    "is_baby": false,
    "is_legendary": false,
    "is_mythical": true,
    "habitat": "rare",
    "shape": "Upright",
    "color": "Pink",
    "forms": [
      {
        "id": "151",
        "height": 4,
        "weight": 40,
        "base_experience": 270,
        "name": "Mew",
        "form": "base",
        "types": [
          "Psychic"
        ],
        "stats": {
          "hp": 100,
          "attack": 100,
          "defense": 100,
          "special-attack": 100,
          "special-defense": 100,
          "speed": 100
        }
      }
    ]
  }
];

export default gen1Data;
