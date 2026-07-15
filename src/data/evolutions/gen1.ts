/**
 * GEN1 Evolutions
 */
import { Evolution } from './types'

export const gen1Evolutions: Record<number, Evolution[]> = {
  "1": [
    {
      "speciesId": 2,
      "name": "ivysaur",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 16
      }
    }
  ],
  "2": [
    {
      "speciesId": 3,
      "name": "venusaur",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 32
      }
    }
  ],
  "4": [
    {
      "speciesId": 5,
      "name": "charmeleon",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 16
      }
    }
  ],
  "5": [
    {
      "speciesId": 6,
      "name": "charizard",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 36
      }
    }
  ],
  "7": [
    {
      "speciesId": 8,
      "name": "wartortle",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 16
      }
    }
  ],
  "8": [
    {
      "speciesId": 9,
      "name": "blastoise",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 36
      }
    }
  ],
  "10": [
    {
      "speciesId": 11,
      "name": "metapod",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 7
      }
    }
  ],
  "11": [
    {
      "speciesId": 12,
      "name": "butterfree",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 10
      }
    }
  ],
  "13": [
    {
      "speciesId": 14,
      "name": "kakuna",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 7
      }
    }
  ],
  "14": [
    {
      "speciesId": 15,
      "name": "beedrill",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 10
      }
    }
  ],
  "16": [
    {
      "speciesId": 17,
      "name": "pidgeotto",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 18
      }
    }
  ],
  "17": [
    {
      "speciesId": 18,
      "name": "pidgeot",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 36
      }
    }
  ],
  "19": [
    {
      "speciesId": 20,
      "name": "raticate",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 20,
        "requiredSourceForm": "base"
      },
      "targetForm": "base"
    },
    {
      "speciesId": 20,
      "name": "raticate",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 20,
        "timeOfDay": "night",
        "requiredSourceForm": "Alolan Form"
      },
      "targetForm": "Alolan Form"
    }
  ],
  "21": [
    {
      "speciesId": 22,
      "name": "fearow",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 20
      }
    }
  ],
  "23": [
    {
      "speciesId": 24,
      "name": "arbok",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 22
      }
    }
  ],
  "25": [
    {
      "speciesId": 26,
      "name": "raichu",
      "trigger": "use-item",
      "conditions": {
        "itemId": "thunder-stone"
      }
    },
    {
      "speciesId": 26,
      "name": "raichu",
      "trigger": "use-item",
      "conditions": {
        "itemId": "thunder-stone"
      }
    }
  ],
  "27": [
    {
      "speciesId": 28,
      "name": "sandslash",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 22,
        "requiredSourceForm": "base"
      },
      "targetForm": "base"
    },
    {
      "speciesId": 28,
      "name": "sandslash",
      "trigger": "use-item",
      "conditions": {
        "itemId": "ice-stone",
        "requiredSourceForm": "Alolan Form"
      },
      "targetForm": "Alolan Form"
    }
  ],
  "29": [
    {
      "speciesId": 30,
      "name": "nidorina",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 16
      }
    }
  ],
  "30": [
    {
      "speciesId": 31,
      "name": "nidoqueen",
      "trigger": "use-item",
      "conditions": {
        "itemId": "moon-stone"
      }
    }
  ],
  "32": [
    {
      "speciesId": 33,
      "name": "nidorino",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 16
      }
    }
  ],
  "33": [
    {
      "speciesId": 34,
      "name": "nidoking",
      "trigger": "use-item",
      "conditions": {
        "itemId": "moon-stone"
      }
    }
  ],
  "35": [
    {
      "speciesId": 36,
      "name": "clefable",
      "trigger": "use-item",
      "conditions": {
        "itemId": "moon-stone"
      }
    }
  ],
  "37": [
    {
      "speciesId": 38,
      "name": "ninetales",
      "trigger": "use-item",
      "conditions": {
        "itemId": "fire-stone",
        "requiredSourceForm": "base"
      },
      "targetForm": "base"
    },
    {
      "speciesId": 38,
      "name": "ninetales",
      "trigger": "use-item",
      "conditions": {
        "itemId": "ice-stone",
        "requiredSourceForm": "Alolan Form"
      },
      "targetForm": "Alolan Form"
    }
  ],
  "39": [
    {
      "speciesId": 40,
      "name": "wigglytuff",
      "trigger": "use-item",
      "conditions": {
        "itemId": "moon-stone"
      }
    }
  ],
  "41": [
    {
      "speciesId": 42,
      "name": "golbat",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 22
      }
    }
  ],
  "42": [
    {
      "speciesId": 169,
      "name": "crobat",
      "trigger": "level-up",
      "conditions": {
        "minHappiness": 160
      }
    }
  ],
  "43": [
    {
      "speciesId": 44,
      "name": "gloom",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 21
      }
    }
  ],
  "44": [
    {
      "speciesId": 45,
      "name": "vileplume",
      "trigger": "use-item",
      "conditions": {
        "itemId": "leaf-stone"
      }
    },
    {
      "speciesId": 182,
      "name": "bellossom",
      "trigger": "use-item",
      "conditions": {
        "itemId": "sun-stone"
      }
    }
  ],
  "46": [
    {
      "speciesId": 47,
      "name": "parasect",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 24
      }
    }
  ],
  "48": [
    {
      "speciesId": 49,
      "name": "venomoth",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 31
      }
    }
  ],
  "50": [
    {
      "speciesId": 51,
      "name": "dugtrio",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 26,
        "requiredSourceForm": "base"
      },
      "targetForm": "base"
    },
    {
      "speciesId": 51,
      "name": "dugtrio",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 26,
        "requiredSourceForm": "Alolan Form"
      },
      "targetForm": "Alolan Form"
    }
  ],
  "52": [
    {
      "speciesId": 53,
      "name": "persian",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 28,
        "requiredSourceForm": "base"
      },
      "targetForm": "base"
    },
    {
      "speciesId": 53,
      "name": "persian",
      "trigger": "level-up",
      "conditions": {
        "minHappiness": 160,
        "requiredSourceForm": "Alolan Form"
      },
      "targetForm": "Alolan Form"
    },
    {
      "speciesId": 863,
      "name": "perrserker",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 28,
        "requiredSourceForm": "Galarian Form"
      },
      "targetForm": "base"
    }
  ],
  "54": [
    {
      "speciesId": 55,
      "name": "golduck",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 33
      }
    }
  ],
  "56": [
    {
      "speciesId": 57,
      "name": "primeape",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 28
      }
    }
  ],
  "58": [
    {
      "speciesId": 59,
      "name": "arcanine",
      "trigger": "use-item",
      "conditions": {
        "itemId": "fire-stone",
        "requiredSourceForm": "base"
      },
      "targetForm": "base"
    },
    {
      "speciesId": 59,
      "name": "arcanine",
      "trigger": "use-item",
      "conditions": {
        "itemId": "fire-stone",
        "requiredSourceForm": "Hisuian Form"
      },
      "targetForm": "Hisuian Form"
    }
  ],
  "60": [
    {
      "speciesId": 61,
      "name": "poliwhirl",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 25
      }
    }
  ],
  "61": [
    {
      "speciesId": 62,
      "name": "poliwrath",
      "trigger": "use-item",
      "conditions": {
        "itemId": "water-stone"
      }
    },
    {
      "speciesId": 186,
      "name": "politoed",
      "trigger": "use-item",
      "conditions": {
        "itemId": "kings-rock",
        "trade": true
      }
    }
  ],
  "63": [
    {
      "speciesId": 64,
      "name": "kadabra",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 16
      }
    }
  ],
  "64": [
    {
      "speciesId": 65,
      "name": "alakazam",
      "trigger": "use-item",
      "conditions": {
        "itemId": "link-cable",
        "trade": true
      }
    }
  ],
  "66": [
    {
      "speciesId": 67,
      "name": "machoke",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 28
      }
    }
  ],
  "67": [
    {
      "speciesId": 68,
      "name": "machamp",
      "trigger": "use-item",
      "conditions": {
        "itemId": "link-cable",
        "trade": true
      }
    }
  ],
  "69": [
    {
      "speciesId": 70,
      "name": "weepinbell",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 21
      }
    }
  ],
  "70": [
    {
      "speciesId": 71,
      "name": "victreebel",
      "trigger": "use-item",
      "conditions": {
        "itemId": "leaf-stone"
      }
    }
  ],
  "72": [
    {
      "speciesId": 73,
      "name": "tentacruel",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 30
      }
    }
  ],
  "74": [
    {
      "speciesId": 75,
      "name": "graveler",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 25,
        "requiredSourceForm": "base"
      },
      "targetForm": "base"
    },
    {
      "speciesId": 75,
      "name": "graveler",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 25,
        "requiredSourceForm": "Alolan Form"
      },
      "targetForm": "Alolan Form"
    }
  ],
  "75": [
    {
      "speciesId": 76,
      "name": "golem",
      "trigger": "use-item",
      "conditions": {
        "itemId": "link-cable",
        "trade": true,
        "requiredSourceForm": "base"
      },
      "targetForm": "base"
    },
    {
      "speciesId": 76,
      "name": "golem",
      "trigger": "use-item",
      "conditions": {
        "itemId": "link-cable",
        "trade": true,
        "requiredSourceForm": "Alolan Form"
      },
      "targetForm": "Alolan Form"
    }
  ],
  "77": [
    {
      "speciesId": 78,
      "name": "rapidash",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 40,
        "requiredSourceForm": "base"
      },
      "targetForm": "base"
    },
    {
      "speciesId": 78,
      "name": "rapidash",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 40,
        "requiredSourceForm": "Galarian Form"
      },
      "targetForm": "Galarian Form"
    }
  ],
  "79": [
    {
      "speciesId": 80,
      "name": "slowbro",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 37,
        "requiredSourceForm": "base"
      },
      "targetForm": "base"
    },
    {
      "speciesId": 80,
      "name": "slowbro",
      "trigger": "use-item",
      "conditions": {
        "itemId": "galarica-cuff",
        "requiredSourceForm": "Galarian Form"
      },
      "targetForm": "Galarian Form"
    },
    {
      "speciesId": 199,
      "name": "slowking",
      "trigger": "use-item",
      "conditions": {
        "itemId": "kings-rock",
        "trade": true,
        "requiredSourceForm": "base"
      },
      "targetForm": "base"
    },
    {
      "speciesId": 199,
      "name": "slowking",
      "trigger": "use-item",
      "conditions": {
        "itemId": "galarica-wreath",
        "requiredSourceForm": "Galarian Form"
      },
      "targetForm": "Galarian Form"
    }
  ],
  "81": [
    {
      "speciesId": 82,
      "name": "magneton",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 30
      }
    }
  ],
  "82": [
    {
      "speciesId": 462,
      "name": "magnezone",
      "trigger": "level-up",
      "conditions": {
        "locationId": "10"
      }
    },
    {
      "speciesId": 462,
      "name": "magnezone",
      "trigger": "level-up",
      "conditions": {
        "locationId": "379"
      }
    },
    {
      "speciesId": 462,
      "name": "magnezone",
      "trigger": "level-up",
      "conditions": {
        "locationId": "629"
      }
    },
    {
      "speciesId": 462,
      "name": "magnezone",
      "trigger": "level-up",
      "conditions": {
        "locationId": "771"
      }
    },
    {
      "speciesId": 462,
      "name": "magnezone",
      "trigger": "level-up",
      "conditions": {
        "locationId": "789"
      }
    },
    {
      "speciesId": 462,
      "name": "magnezone",
      "trigger": "use-item",
      "conditions": {
        "itemId": "thunder-stone"
      }
    },
    {
      "speciesId": 462,
      "name": "magnezone",
      "trigger": "level-up",
      "conditions": {
        "locationId": "446"
      }
    }
  ],
  "84": [
    {
      "speciesId": 85,
      "name": "dodrio",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 31
      }
    }
  ],
  "86": [
    {
      "speciesId": 87,
      "name": "dewgong",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 34
      }
    }
  ],
  "88": [
    {
      "speciesId": 89,
      "name": "muk",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 38,
        "requiredSourceForm": "base"
      },
      "targetForm": "base"
    },
    {
      "speciesId": 89,
      "name": "muk",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 38,
        "requiredSourceForm": "Alolan Form"
      },
      "targetForm": "Alolan Form"
    }
  ],
  "90": [
    {
      "speciesId": 91,
      "name": "cloyster",
      "trigger": "use-item",
      "conditions": {
        "itemId": "water-stone"
      }
    }
  ],
  "92": [
    {
      "speciesId": 93,
      "name": "haunter",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 25
      }
    }
  ],
  "93": [
    {
      "speciesId": 94,
      "name": "gengar",
      "trigger": "use-item",
      "conditions": {
        "itemId": "link-cable",
        "trade": true
      }
    }
  ],
  "95": [
    {
      "speciesId": 208,
      "name": "steelix",
      "trigger": "use-item",
      "conditions": {
        "itemId": "metal-coat",
        "trade": true
      }
    }
  ],
  "96": [
    {
      "speciesId": 97,
      "name": "hypno",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 26
      }
    }
  ],
  "98": [
    {
      "speciesId": 99,
      "name": "kingler",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 28
      }
    }
  ],
  "100": [
    {
      "speciesId": 101,
      "name": "electrode",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 30,
        "requiredSourceForm": "base"
      },
      "targetForm": "base"
    },
    {
      "speciesId": 101,
      "name": "electrode",
      "trigger": "use-item",
      "conditions": {
        "itemId": "leaf-stone",
        "requiredSourceForm": "Hisuian Form"
      },
      "targetForm": "Hisuian Form"
    }
  ],
  "102": [
    {
      "speciesId": 103,
      "name": "exeggutor",
      "trigger": "use-item",
      "conditions": {
        "itemId": "leaf-stone"
      }
    },
    {
      "speciesId": 103,
      "name": "exeggutor",
      "trigger": "use-item",
      "conditions": {
        "itemId": "leaf-stone"
      }
    }
  ],
  "104": [
    {
      "speciesId": 105,
      "name": "marowak",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 28
      }
    },
    {
      "speciesId": 105,
      "name": "marowak",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 28,
        "timeOfDay": "night"
      }
    }
  ],
  "108": [
    {
      "speciesId": 463,
      "name": "lickilicky",
      "trigger": "level-up",
      "conditions": {
        "knownMoveId": "205"
      }
    }
  ],
  "109": [
    {
      "speciesId": 110,
      "name": "weezing",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 35
      }
    },
    {
      "speciesId": 110,
      "name": "weezing",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 35
      }
    }
  ],
  "111": [
    {
      "speciesId": 112,
      "name": "rhydon",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 42
      }
    }
  ],
  "112": [
    {
      "speciesId": 464,
      "name": "rhyperior",
      "trigger": "use-item",
      "conditions": {
        "itemId": "protector",
        "trade": true
      }
    }
  ],
  "113": [
    {
      "speciesId": 242,
      "name": "blissey",
      "trigger": "level-up",
      "conditions": {
        "minHappiness": 160
      }
    }
  ],
  "114": [
    {
      "speciesId": 465,
      "name": "tangrowth",
      "trigger": "level-up",
      "conditions": {
        "knownMoveId": "246"
      }
    }
  ],
  "116": [
    {
      "speciesId": 117,
      "name": "seadra",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 32
      }
    }
  ],
  "117": [
    {
      "speciesId": 230,
      "name": "kingdra",
      "trigger": "use-item",
      "conditions": {
        "itemId": "dragon-scale",
        "trade": true
      }
    }
  ],
  "118": [
    {
      "speciesId": 119,
      "name": "seaking",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 33
      }
    }
  ],
  "120": [
    {
      "speciesId": 121,
      "name": "starmie",
      "trigger": "use-item",
      "conditions": {
        "itemId": "water-stone"
      }
    }
  ],
  "122": [
    {
      "speciesId": 866,
      "name": "mr-rime",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 42,
        "requiredSourceForm": "Galarian Form"
      }
    }
  ],
  "123": [
    {
      "speciesId": 212,
      "name": "scizor",
      "trigger": "use-item",
      "conditions": {
        "itemId": "metal-coat",
        "trade": true
      }
    },
    {
      "speciesId": 900,
      "name": "kleavor",
      "trigger": "use-item",
      "conditions": {
        "itemId": "black-augurite"
      }
    }
  ],
  "125": [
    {
      "speciesId": 466,
      "name": "electivire",
      "trigger": "use-item",
      "conditions": {
        "itemId": "electirizer",
        "trade": true
      }
    }
  ],
  "126": [
    {
      "speciesId": 467,
      "name": "magmortar",
      "trigger": "use-item",
      "conditions": {
        "itemId": "magmarizer",
        "trade": true
      }
    }
  ],
  "129": [
    {
      "speciesId": 130,
      "name": "gyarados",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 20
      }
    }
  ],
  "133": [
    {
      "speciesId": 134,
      "name": "vaporeon",
      "trigger": "use-item",
      "conditions": {
        "itemId": "water-stone"
      }
    },
    {
      "speciesId": 135,
      "name": "jolteon",
      "trigger": "use-item",
      "conditions": {
        "itemId": "thunder-stone"
      }
    },
    {
      "speciesId": 136,
      "name": "flareon",
      "trigger": "use-item",
      "conditions": {
        "itemId": "fire-stone"
      }
    },
    {
      "speciesId": 196,
      "name": "espeon",
      "trigger": "level-up",
      "conditions": {
        "minHappiness": 160,
        "timeOfDay": "day"
      }
    },
    {
      "speciesId": 197,
      "name": "umbreon",
      "trigger": "level-up",
      "conditions": {
        "minHappiness": 160,
        "timeOfDay": "night"
      }
    },
    {
      "speciesId": 470,
      "name": "leafeon",
      "trigger": "level-up",
      "conditions": {
        "locationId": "8"
      }
    },
    {
      "speciesId": 470,
      "name": "leafeon",
      "trigger": "level-up",
      "conditions": {
        "locationId": "375"
      }
    },
    {
      "speciesId": 470,
      "name": "leafeon",
      "trigger": "level-up",
      "conditions": {
        "locationId": "650"
      }
    },
    {
      "speciesId": 470,
      "name": "leafeon",
      "trigger": "use-item",
      "conditions": {
        "itemId": "leaf-stone"
      }
    },
    {
      "speciesId": 470,
      "name": "leafeon",
      "trigger": "level-up",
      "conditions": {
        "locationId": "438"
      }
    },
    {
      "speciesId": 471,
      "name": "glaceon",
      "trigger": "level-up",
      "conditions": {
        "locationId": "48"
      }
    },
    {
      "speciesId": 471,
      "name": "glaceon",
      "trigger": "level-up",
      "conditions": {
        "locationId": "380"
      }
    },
    {
      "speciesId": 471,
      "name": "glaceon",
      "trigger": "level-up",
      "conditions": {
        "locationId": "640"
      }
    },
    {
      "speciesId": 471,
      "name": "glaceon",
      "trigger": "use-item",
      "conditions": {
        "itemId": "ice-stone"
      }
    },
    {
      "speciesId": 471,
      "name": "glaceon",
      "trigger": "level-up",
      "conditions": {
        "locationId": "445"
      }
    },
    {
      "speciesId": 700,
      "name": "sylveon",
      "trigger": "level-up",
      "conditions": {}
    },
    {
      "speciesId": 700,
      "name": "sylveon",
      "trigger": "level-up",
      "conditions": {
        "minHappiness": 160
      }
    }
  ],
  "137": [
    {
      "speciesId": 233,
      "name": "porygon2",
      "trigger": "use-item",
      "conditions": {
        "itemId": "up-grade",
        "trade": true
      }
    }
  ],
  "138": [
    {
      "speciesId": 139,
      "name": "omastar",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 40
      }
    }
  ],
  "140": [
    {
      "speciesId": 141,
      "name": "kabutops",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 40
      }
    }
  ],
  "147": [
    {
      "speciesId": 148,
      "name": "dragonair",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 30
      }
    }
  ],
  "148": [
    {
      "speciesId": 149,
      "name": "dragonite",
      "trigger": "level-up",
      "conditions": {
        "minLevel": 55
      }
    }
  ]
}
