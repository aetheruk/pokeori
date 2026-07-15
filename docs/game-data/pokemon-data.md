# Pokemon Data

Structure of Pokemon data in `src/data/pokemon/`.

## Pokemon Module Example
```typescript
export const pokemonData = {
  "1": { // speciesId
    name: "Bulbasaur",
    types: ["grass", "poison"],
    baseStats: {
      hp: 45,
      attack: 49,
      defense: 49,
      spAttack: 65,
      spDefense: 65,
      speed: 45
    },
    abilities: ["overgrow", "chlorophyll"],
    evolutionChain: [1, 2, 3], // Bulbasaur -> Ivysaur -> Venusaur
    forms: ["default", "gmax"] // Available forms
  }
}
```

## Fields
| Field | Type | Description |
|-------|------|-------------|
| speciesId | number | National Pokedex number |
| name | string | Pokemon name |
| habitat | string | Built English habitat metadata from source data, used by runtime systems such as material drops |
| shape | string | Built English body-shape metadata from source data, used by runtime systems such as material drops |
| color | string | Built English Pokedex color metadata from source data |
| types | string[] | Primary/secondary types |
| baseStats | object | Base stats (HP, Attack, etc.) |
| abilities | string[] | Available abilities |
| evolutionChain | number[] | Evolution chain species IDs |
| forms | string[] | Available forms (default, alola, etc.) |

## Regions Supported
- Kanto (Gen 1)
- Johto (Gen 2)
- Hoenn (Gen 3)
- Sinnoh (Gen 4)
- Unova (Gen 5)
- Kalos (Gen 6)
- Alola (Gen 7)
- Galar (Gen 8)
- Paldea (Gen 9)

## Form Exclusions
Generated Pokemon modules read `scripts/pokemon-form-exclusions.json` and omit configured non-playable forms. Current intentional exclusions include duplicate Power Construct Zygarde entries (`10118` for 10% Forme and `10119` for 50% Forme), Minior's alternate Meteor color forms (`10130`-`10135`), Roaming Form Gimmighoul (`10263`), and Alcremie's dessert variants, leaving ordinary 10% Zygarde (`10181`), base 50% Zygarde (`718`), base Alcremie (`869`), and Gigantamax Alcremie (`10223`) available in game data.
