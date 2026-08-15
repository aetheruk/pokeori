# Saffron Takeover (Blackout Mode)

The Saffron takeover is the first story-driven UI lockdown in the game. After
the player completes the one-time `saffron-gym-ambush` task in Saffron City,
the entire game collapses to a single Explore screen: navigation shows only
Explore, direct visits to other game pages redirect back to Explore, and the
Explore chrome (region/area selectors, filters, dailies) is replaced by a
distinct night "blackout" view.

## State derivation

- The state is derived, not persisted separately. It is active when the
  `saffron-gym-ambush` task is completed and the `saffron-escape-complete`
  task is not yet recorded.
- The server exposes the boolean as `RequirementData.storyState.saffronTakeover`
  (loaded on the `core` game-data scope, which the shell navigation uses).
- The Explore page computes the same boolean client-side from its
  `completedTasks` payload via `isSaffronTakeoverActive`.
- The future escape chronicle will record `saffron-escape-complete` when it is
  claimed, which turns the takeover off.

## Takeover view

`SaffronTakeoverView` renders instead of the normal Explore header, region/area
tabs, grid, and filter bar. It uses the `game-night` palette over the Saffron
artwork for a visually distinct "lights out" treatment and shows memory slots
from `src/data/saffron-takeover.ts`:

- `arianna-saffron-takeover-chronicle` (Ariana's Record)
- `choo-saffron-investigation-chronicle` (Choo's Case File)
- `player-saffron-escape-chronicle` (The Escape), which is revealed only once
  both prior chronicle expeditions show a completed result.

Slots are sealed (non-interactive) placeholders until the chronicle
expeditions are authored. When those land, the slots should be replaced by
real expedition entries rendered on the takeover screen.

## Guards

- `GameNavigation` filters the desktop rail and mobile bottom nav to Explore
  only while the takeover is active and hides the profile/currency block.
- `TakeoverRouteGuard` in `GameShell` redirects any non-Explore game route back
  to `/game/explore`; fullscreen activity routes (`/game/games/*`,
  `/game/battles/*`, field research, encounters) remain reachable so future
  chronicle activities can launch from the takeover screen.
- The `saffron-gym-ambush` task opens with a short enter modal ("Choo will be
  right behind me, I'll go on ahead.") and, because completing it activates
  the takeover, its exit modal ("Hello is anyo........." with the "...."
  button) plays over the blackout view before Explore is locked down.

Server-side action guards (PVP, bets, socials) are intentionally not part of
this first slice; they should be added when the chronicle content lands so a
story-locked player can only run takeover activities.
