# Pokedex Feature

Track Pokemon seen/caught status with research levels.

## Locations
- Route: `/game/pokedex/*`
- Components: `src/components/game/shared/PokemonSelectionList.tsx`
- Data: `src/data/pokemon/`
- Hook: `src/hooks/usePokedex.ts`
- Owned Pokemon collection: `src/collections/Pokemon.ts`

## Data Structure

Pokedex progress is stored as normalized `user-pokedex-entries` rows. Each row is keyed by user, species, and form; compound indexes keep collection and form lookups bounded as the catalog grows. The read layer exposes the familiar nested map:

```typescript
{
  "1": { // speciesId
    "1": { seen: true, caught: true, researchXp: 20, researchLevel: 1 }
  }
}
```

Release `0.1.1` includes a one-time rarity backfill in the performance-index migration so existing owned Pokemon do not require a full collection scan during normal game syncs.

## Features
- Filter by region, discovery state, and observed type, with an explicit result count and clear action.
- Search by visible name/form or National number. Undiscovered names, forms, types, traits, and ability data never participate in filtering or accessible labels.
- Records reveal progressively: undiscovered entries show only their number and silhouette; seen entries reveal identity, type, habitat, and appearance; caught entries reveal measurements, stats, forms, moves, and research.
- The responsive field-note inspector returns focus to the originating specimen tile when closed and remains a bottom sheet on touch layouts.
- Research level tracking per species/form, with automatic breakthroughs at 25, 75, 200, 500, and 1000 XP.
- Research levels unlock species-specific gameplay: level 1 battle moves and held items, level 2 release materials and Battle Observation stance reads, level 3 catch crystals, free escape, and Pokemon Powers, level 4 better IV behavior, raises the hidden ability roll from 5% to 10% when hidden abilities are globally unlocked, plus a 2% survival bond for the player's side only in PvE (both player sides in PvP), and level 5 shiny bonus. Releasing a Pokemon returns its held item before adding any candy, casing, or research-material release rewards.
- Pure level-based evolutions now also consume an Artisan-crafted Evolution Catalyst: the required catalyst tier is based on the evolution level band (0-20, 21-40, or 41+). Friendship, item, move, location, time, gender, and trade evolutions remain on their existing routes.
- Maintenance note: if these Pokemon Research rank benefits change, update the Pewter School `pewter-school-pokemon-research-ranks` tutor text and the matching summary docs in the same change.
- Shiny/shadow status indicators
- The owned Pokemon detail modal capitalizes revealed natures and, once the Nature Module is owned, marks nature-boosted stats with a green up arrow and nature-reduced stats with a red down arrow. Evolution previews capitalize the revealed evolved Pokemon name.
- Owned Pokemon evolution always rolls a fresh natural ability for the evolved form, including the normal hidden-ability chance.
- Pokemon detail battle-move assignment includes a clear action so stale assigned moves can be removed even if the Pokemon can no longer legally select them.
- Source species data includes `gender_rate` and `has_gender_differences`; newly obtained Pokemon store `gender` as `male`, `female`, or `genderless`. Legacy owned Pokemon without the field are treated as male in UI helpers.
- Female HOME and Gen V sprite variants from the bundled sprite manifest are used for owned/battle Pokemon when `gender` is `female` and a separate source sprite exists.
- Catch encounters, Field Observation spawns, and PVE battle enemies roll gender from source species rates before rendering, so female visual differences can appear during live encounters when a bundled female sprite exists.
- Pokedex detail entries do not track seen/caught by gender, but any seen or caught species with source `has_gender_differences` can toggle the displayed sprite between male and female forms.
- Seen Pokemon detail cards use habitat-specific background art for cave, forest, grassland, mountain, rare, rough terrain, sea, urban, and water's edge habitats. Unseen or unmapped entries use the generic Pokedex background.
- Sort by number, name, or research level without exposing concealed data.

## Hook Usage
```typescript
const { pokedex, isSeen, isCaught, getResearchLevel } = usePokedex()
```
