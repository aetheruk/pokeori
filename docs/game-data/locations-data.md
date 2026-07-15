# Locations Data

Structure of location data in `src/data/locations/`.

## Region Structure
Locations organized by region (Gen 1-9).

## Location Module Example
```typescript
export const kantoLocations = [
  {
    id: "pallet-town",
    name: "Pallet Town",
    region: "kanto",
    type: "town",
    encounters: ["pokemon-1", "pokemon-4"], // Wild Pokemon
    background: "/backgrounds/town.avif",
    music: "/music/kanto.mp3"
  }
]
```

## Fields
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique location ID |
| name | string | Display name |
| region | string | Region (kanto, johto, etc.) |
| type | string | "town", "city", "route", "cave" |
| encounters | string[] | Wild Pokemon species IDs |
| background | string | Background image path |
| music | string | Background music path |

## Regions
- Kanto: 15+ locations
- Johto: 20+ locations
- Hoenn: 25+ locations
- And more...
