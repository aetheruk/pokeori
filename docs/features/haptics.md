# Haptics

Pokeori provides a shared selection haptic for actionable frontend controls.
The `@haptics/react` provider is mounted in the frontend layout and marks native
buttons, links, and accessible custom controls with the `selection` preset. It
also observes later UI and dialog content so dynamically rendered controls get
the same feedback.

The provider uses the library's platform-specific behavior: direct switch
overlays for iOS, the Vibration API where supported, and no sound fallback on
desktop. Reduced-motion preferences suppress haptic output.

Automatic haptic overlays are omitted from selected controls inside horizontally
or vertically scrollable areas. Individual result cards can opt out explicitly
with `data-haptic-disabled`. This keeps
swipes over collection grids, search results, and selector lists available on
touch screens. Explore activity cards, region and area selectors, and scenic
choice cards keep their explicit targets. Inventory item cards and Artisan
recipe cards trigger selection haptics from their click handlers; their nested
action buttons trigger haptics manually as well. Continuous pointer surfaces
such as drawing canvases, steering stages, and swipe gestures keep their existing
pointer behavior. Flap's outside-playfield tap target remains explicitly
haptic-enabled.

Pokémon roster tiles and Carddex, Pokédex, MoveDex, and AbilityDex result cards
do not trigger haptics, leaving their grids free to scroll. Trainer collection
summary cards keep their own selection feedback.

The TCG battle opening hand uses the same manual selection haptic on each card
and leaves the horizontal card rail free of iOS switch overlays, so selecting a
card and swiping through the hand both work on touch screens.
