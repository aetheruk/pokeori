# Haptics

Pokeori provides a shared selection haptic for actionable frontend controls.
The `@haptics/react` provider is mounted in the frontend layout and marks native
buttons, links, and accessible custom controls with the `selection` preset. It
also observes later UI and dialog content so dynamically rendered controls get
the same feedback.

The provider uses the library's platform-specific behavior: direct switch
overlays for iOS, the Vibration API where supported, and no sound fallback on
desktop. Reduced-motion preferences suppress haptic output.

On iOS, haptic overlays allow native horizontal and vertical panning and pinch
gestures, so scrollable lists remain usable across Explore, inventory, Artisan,
crafting, and other app surfaces. Explore activity cards, region and area
selectors, and scenic choice cards set their targets explicitly. Inventory item
cards and Artisan recipe cards trigger selection haptics from their click
handlers so a drag across a card remains a scroll gesture; their nested action
buttons trigger haptics manually as well. Continuous pointer surfaces
such as drawing canvases, steering stages, and swipe gestures keep their existing
pointer behavior instead of receiving a full-size overlay. Flap's outside-
playfield tap target remains explicitly haptic-enabled.

Pokémon roster tiles, Pokédex/MoveDex/AbilityDex records, and Trainer collection
cards call the shared selection haptic from their click handlers. This lets a
drag across a large tile or virtualized record grid remain a scroll gesture
without placing an iOS switch overlay over the scroll target.
