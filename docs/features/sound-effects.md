# Sound effects

`AudioProvider` maps typed sound names to files under `public/sfx/`, applies the shared audio setting, and pools frequently used clips. The `select` sound is the shared menu and interface sound used across navigation and game controls.

`RewardResultOverlay` plays the flower pickup sound once when a new result is shown. It follows the same audio-enabled setting as the other sound effects.
