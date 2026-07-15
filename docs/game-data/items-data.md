# Items Data

Structure of item data in `src/data/items/`.

## Item Categories
- **Poke Balls**: Poke Ball, Great Ball, Ultra Ball, Master Ball
- **Berries**: Oran, Sitrus, Pecha, etc.
- **Medicines**: Potion, Super Potion, Full Restore
- **Battle Items**: X Attack, X Defense, etc.
- **Evolution Stones**: Fire Stone, Water Stone, etc.
- **TMs**: Technical Machines, Technical Machines

## Item Module Example
```typescript
export const itemsData = {
  "poke-ball": {
    id: "poke-ball",
    name: "Poke Ball",
    category: "poke-balls",
    price: 200,
    description: "A device for catching wild Pokemon.",
    usableInBattle: false,
    usableOnPokemon: true
  }
}
```

## Fields
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique item identifier |
| name | string | Display name |
| category | string | Item category |
| price | number | Pokedollar cost |
| description | string | Item description |
| usableInBattle | boolean | Can use during battles? |
| usableOnPokemon | boolean | Can use on Pokemon? |
