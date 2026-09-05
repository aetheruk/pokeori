# Dex interface

Player collection indexes use a shared field-journal structure: a compact,
searchable index stays in the main workspace and a selected record opens as a
field note. Detail views use `ResponsivePanel`, remaining a bottom sheet on
touch layouts and becoming a right-side inspector when the route has enough
desktop space.

Shared Dex presentation primitives live in `src/components/game/dex`. They
provide the page shell, filter surface, result summary, status chips, empty
state, and inspector sections without forcing specimen, move, ability, and card
indexes to use the same entry geometry.

## Pokédex

- Discovery remains visible through each specimen sprite's colour treatment;
  grid tiles do not repeat that state with overlay icons that compete with the
  artwork.
- Search and details remain discovery-safe: unknown names and types cannot be
  searched, and measurements, stats, research, and variants stay gated until
  the appropriate observation tier.

## Carddex

- Unlocked sets are organized as a newest-first series shelf with a second
  binder shelf for the selected series. Series, set, and overall cards report
  real collected/total progress.
- Search matches card names, collector numbers, set names, and series while
  staying inside the chosen shelf. Ownership, card kind, Pokémon type, normalized
  rarity, and sort filters run before cursor pagination.
- The current view is encoded in the URL. Desktop keeps scope and filters above
  the artwork-first grid; mobile keeps search in the thumb zone and opens the
  complete controls in a full-height field note.
- Multi-set collector-number results retain visible set dividers. Owned-card
  field notes expose previous/next browsing, quantity, rarity, and existing
  duplicate/deck actions without exposing uncollected identities.

## AbilityDex

- Known abilities and all discoveries are separate views.
- Search only matches registered ability names; it never reveals an unknown
  record through hidden names or descriptions.
- The main list is virtualized and exposes registration with text as well as
  color.
- Known records show their description, partner effects, and compatible forms
  in a responsive field-note inspector.
- Compatible forms use Pokédex observation state. Caught forms are shown in
  full color, observed forms are muted, and undiscovered forms keep their names
  concealed.
