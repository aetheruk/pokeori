# Pokedex Feature

Track Pokemon seen/caught status with research levels.

## Locations
- Route: `/game/pokedex/*`
- Components: `src/components/game/shared/PokemonSelectionList.tsx`
- Data: `src/data/pokemon/`
- Hook: `src/hooks/usePokedex.ts`
- Owned Pokemon collection: `src/collections/Pokemon.ts`

## Data Structure
Pokedex stored as JSON map in User collection:
```typescript
{
  "1": { // speciesId
    "1": { seen: true, caught: true, researchXp: 20, researchLevel: 1 }
  }
}
```

## Features
- Filter by region (Kanto, Johto, etc.)
- Search by name/number
- Research level tracking per species/form, with automatic breakthroughs at 25, 75, 200, 500, and 1000 XP.
- Research levels unlock species-specific gameplay: level 1 battle moves and held items, level 2 release materials and Battle Observation stance reads, level 3 catch crystals, free escape, and Pokemon Powers, level 4 better IV behavior, raises the hidden ability roll from 5% to 10% when hidden abilities are globally unlocked, plus a 2% survival bond, and level 5 shiny bonus. Releasing a Pokemon returns its held item before adding any candy, casing, or research-material release rewards.
- Maintenance note: if these Pokemon Research rank benefits change, update the Pewter School `pewter-school-pokemon-research-ranks` tutor text and the matching summary docs in the same change.
- Shiny/shadow status indicators
- Owned Pokemon evolution always rolls a fresh natural ability for the evolved form, including the normal hidden-ability chance.
- Pokemon detail battle-move assignment includes a clear action so stale assigned moves can be removed even if the Pokemon can no longer legally select them.
- Source species data includes `gender_rate` and `has_gender_differences`; newly obtained Pokemon store `gender` as `male`, `female`, or `genderless`. Legacy owned Pokemon without the field are treated as male in UI helpers.
- Female HOME and Gen V sprite variants from the bundled sprite manifest are used for owned/battle Pokemon when `gender` is `female` and a separate source sprite exists.
- Catch encounters, Field Observation spawns, and PVE battle enemies roll gender from source species rates before rendering, so female visual differences can appear during live encounters when a bundled female sprite exists.
- Pokedex detail entries do not track seen/caught by gender, but any seen or caught species with source `has_gender_differences` can toggle the displayed sprite between male and female forms.
- Seen Pokemon detail cards use habitat-specific background art for cave, forest, grassland, mountain, rare, rough terrain, sea, urban, and water's edge habitats. Unseen or unmapped entries use the generic Pokedex background.
- Sort by number, name, research level

## Hook Usage
```typescript
const { pokedex, isSeen, isCaught, getResearchLevel } = usePokedex()
```
