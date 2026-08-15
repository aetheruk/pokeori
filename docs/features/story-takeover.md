# Saffron Takeover (Blackout Mode)

The Saffron takeover is the first story-driven UI lockdown in the game. After
the player completes the one-time `saffron-gym-ambush` task in Saffron City,
the game restricts the shell to a single Explore screen: the navigation rail
and mobile bottom nav are removed entirely, direct visits to other game pages
redirect back to `/game/explore`, and Explore renders a normal list pinned to
the `???` region and `???` location.

## Blackout Explore list

During the takeover, Explore keeps its normal list rendering (header, grid,
drawers for detail modals) but hides the entire Explore header, the
region/area selectors, and the filter bar, so the blackout list begins
directly with its content. The VS Seeker and random-event cards are also
suppressed so only authored `???` content appears. Content for the blackout is
authored exactly like any other area:

- Tasks, locations, battles, games, shops, voyages, and expeditions with
  `category: '???'` and `subCategory: '???'` appear in the list.
- The `???` region is registered in `src/data/region-map.ts` and
  `src/data/sub-region-map.ts` with `alwaysAvailable: true`, so it never
  needs unlock requirements and only shows its entries while the takeover is
  active. Entries should also gate themselves with a `task_completed`
  requirement on `saffron-gym-ambush` so they never surface in the normal
  region picker for players outside the blackout.
- The `saffron-gym-ambush` task stays in Saffron City as the trigger; it is
  one-time and disappears after completion.

## State derivation

- The state is derived, not persisted separately. It is active when the
  `saffron-gym-ambush` task is completed and the `saffron-escape-complete`
  task is not yet recorded.
- The server exposes the boolean as `RequirementData.storyState.saffronTakeover`
  (loaded on the `core` game-data scope, which the shell uses).
- The Explore page computes the same boolean client-side from its
  `completedTasks` payload via `isSaffronTakeoverActive`.
- The future escape chronicle will record `saffron-escape-complete` when it is
  claimed, which turns the takeover off and restores the normal shell.

## Guards

- `GameShell` hides `GameNavigation` entirely and removes the nav/padding while
  the takeover is active, so Trainer, Pokemon, Artisan, Dex, and the profile
  link are unreachable. Explore mirrors the derived flag into the shared
  `useStoryStateStore` client store the moment the ambush task completes, so
  the shell hides navigation immediately instead of waiting for its next data
  sync; the server-side `storyState` flag covers fresh loads and direct route
  visits.
- `TakeoverRouteGuard` in `GameShell` redirects any non-Explore game route back
  to `/game/explore`; fullscreen activity routes (`/game/games/*`,
  `/game/battles/*`, field research, encounters) remain reachable so chronicle
  activities authored under `???` can launch from the blackout list.
- The `saffron-gym-ambush` task opens with a short enter modal ("Choo will be
  right behind me, I'll go on ahead.") and, because completing it activates
  the takeover, its exit modal ("Hello is anyo........." with the "...."
  button) plays before Explore locks down to the `???` region.

Server-side action guards (PVP, bets, socials) are intentionally not part of
this slice; they should be added when the chronicle content lands so a
story-locked player can only run takeover activities.
