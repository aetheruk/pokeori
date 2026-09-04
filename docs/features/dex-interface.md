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
