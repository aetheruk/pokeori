# Haptics

Pokeori provides a shared selection haptic for actionable frontend controls.
The `@haptics/react` provider is mounted in the frontend layout and marks native
buttons, links, and accessible custom controls with the `selection` preset. It
also observes later UI and dialog content so dynamically rendered controls get
the same feedback.

The provider uses the library's platform-specific behavior: direct switch
overlays for iOS, the Vibration API where supported, and no sound fallback on
desktop. Reduced-motion preferences suppress haptic output.

Inventory item cards and Artisan recipe cards also receive a target for their
card area, while their action buttons stay above it. Continuous pointer surfaces
such as drawing canvases, steering stages, and swipe gestures keep their existing
pointer behavior instead of receiving a full-size overlay. Flap's outside-
playfield tap target remains explicitly haptic-enabled.
