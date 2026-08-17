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
authored exactly like any other area, and the empty-state card is hidden when
the list has nothing to show:

- Tasks, locations, battles, games, shops, voyages, and expeditions with
  `category: '???'` and `subCategory: '???'` appear in the list.
- The `???` region is registered in `src/data/region-map.ts` and
  `src/data/sub-region-map.ts` with `alwaysAvailable: true`, so it never
  needs unlock requirements and only shows its entries while the takeover is
  active. Entries should also gate themselves with a `task_completed`
  requirement on `saffron-gym-ambush` so they never surface in the normal
  region picker for players outside the blackout.

While the takeover is active the shell toggles a `pokeori-blackout` class on
`document.body`, which inverts the paper palette to the night palette across
the Explore page and every portaled drawer (task details, enter/exit modals).
This is driven purely by CSS variables in `src/styles/globals.css`.
The shell only toggles the class from confident state: while the initial sync
or a dev hot-reload is in flight (when the server snapshot is missing and the
client store is unset), the class is left untouched so the blackout never
flashes back to the light palette.

The blackout list also renders a decorative layer of Unown sprites
(`BlackoutUnowns`) that drift and fade in and out behind the content. The layer
is `pointer-events-none` and `aria-hidden`, uses the bundled home Unown forms,
includes occasional scale "peeks", and disables all motion under
`prefers-reduced-motion`. The same layer adds a soft vignette that keeps the
centre readable.

Behind the Unown sits the bundled `cosmos` artwork
(`BlackoutBackdrop`), anchored to the top and bottom edges with fade masks over
a deep void sky: an inverted copy hangs overhead and a darker copy grounds the
bottom, leaving the centre open for content. It is a static layer, so
`prefers-reduced-motion` needs no special handling. Two slow-breathing warm
clay/ochre glows at the top and bottom horizons pulse on an 11s cycle to add
depth (offset from each other), and the artwork itself slowly breathes and
twists (skew/rotate/scale on 18s and 23s loops, reversed for the mirrored top
copy). All of it freezes under `prefers-reduced-motion`.

In the centre band, additional Unown fade in letter-by-letter to spell the
trainer's name with a question-mark Unown at the end (`BlackoutUnowns` sizes
the glyphs responsively to the name length and viewport, accounting for gaps,
and caps very long names). Each letter gets slightly jittered delay, drift,
fade, and peak timings so the word materialises organically rather than as a
uniform ticker. The letters use the same drift/fade motion and freeze under
`prefers-reduced-motion`.

Tapping or clicking anywhere on the blackout page triggers a brief, subtle
screen shake (0.28s) as interaction feedback; it is skipped entirely under
`prefers-reduced-motion`.

There is also an ethereal golden glow at the centre of the blackout that
breathes gently and grows with every tap. After 20 taps the full screen
flashes to white and the glow becomes an egg floating in an ethereal halo,
which silently completes the hidden one-time `struggle` task (`secret: true`,
so it never appears in the client UI). Once the egg is revealed the screen
shake and the growing-glow mechanic are disabled. Completing `struggle` unlocks
the one-time task `golden-glow` in the `???` list: a golden-cosmos dialogue
with egg icons where every title and button reads `…` except the final
answer, which completes the task.

In the takeover state the task list is vertically centred, card titles and
text are centred, and each card carries a slow-moving golden orbit ring around
its edge. The glow growth, orbit, rays, and breathing all freeze or keep only
user-driven motion under `prefers-reduced-motion`.

- The `saffron-gym-ambush` task stays in Saffron City as the trigger; it is
  one-time and disappears after completion.

## State derivation

- The state is derived, not persisted separately. It is active when the
  `saffron-gym-ambush` task is completed and the escape completion task
  (`celadon-timeline-divergence` or legacy `saffron-escape-complete`) is not yet recorded.
- The server exposes the boolean as `RequirementData.storyState.saffronTakeover`
  (loaded on the `core` game-data scope, which the shell uses).
- The Explore page computes the same boolean client-side from its
  `completedTasks` payload via `isSaffronTakeoverActive`.
- Completing `celadon-timeline-divergence` records the escape completion, turning
  the takeover off and cleanly restoring the normal navigation shell and Kanto Explore list.

## Story Sequence & Resolution

1. **The Ambush & The Void**:
   - Completing `saffron-gym-ambush` knocks the player unconscious and triggers the blackout state.
   - In Explore (locked to `???`), tapping the golden glow completes `struggle` and unlocks `golden-glow`.
2. **The Blackout Chronicles**:
   - `golden-glow` unlocks two narrative Chronicles in the `???` region:
     - `chronicle-rocket-assassination`: Played as Executive Ariana. Begins at the summit of Pokemon Tower with Kita the Marowak fallen on the stone floor and Mr. Fuji bound as a captive. Follows Rocket surveillance reports of the player and Detective Choo investigating Celadon, and Ariana authorizing the lethal toxin assassination ambush at Saffron Gym.
     - `chronicle-ray-choo-pursuit`: Played as Detective Ray Choo. Shows Ray speeding toward Saffron on his motorbike with his newly evolved Arcanine, breaking through a perimeter guard, witnessing a Rocket courier stashing a sealed dark vial into a Celadon alley drainage grate, and arriving at Saffron Gym moments too late as the poison strikes the player down.
3. **The Entity & Celebi Time Travel**:
   - Completing both chronicles unlocks `entity-reflections` ("Threads of Fate") with the cosmic entity in the void, testing the trainer's resolve.
   - `entity-celebi-warp` ("The Voice Across Time") follows, where the entity summons Celebi to turn back the river of time.
4. **Celadon Divergence & Poison Dead Drop**:
   - `celadon-timeline-divergence` ("A Divergence in Time") returns the player to Celadon right as Ray Choo suggests going to Saffron. The player interrupts, warning Ray of the assassination ambush. Completing this task ends the blackout state.
   - The player can now inspect the Celadon alley drainage grate (`celadon-poison-dead-drop`) to recover the **Sealed Rocket Toxin** (`rocket-poison-vial`), establishing the narrative reason to consult Master Koga in Fuchsia City.
5. **Pokemon Tower Ascent & The Azure Flute**:
   - `pokemon-tower-return-with-choo` brings the player and Detective Choo to Lavender Town, where the player calls out to Kita.
   - Guided by Kita's spiritual resonance, they ascend the tower in `pokemon-tower-clearing-the-floors`.
   - At the summit in `pokemon-tower-summit-azure-flute`, they discover a weathered note addressed to the trainer and the **Azure Flute** (`azure-flute`), which awakens the sleeping Snorlax blocking Route 12 and Route 16 to open southern Kanto.

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
- `GameRouteDataBoundary` also redirects server-side: when `storyState` says
  the takeover is active, every non-Explore, non-activity RSC page 302s to
  `/game/explore` before rendering, so reopening the app mid-blackout never
  paints the Trainer page. The game layout seeds the shell's takeover state
  from the server and the Explore page carries a `pokeori-blackout-scope`
  class in its SSR markup, so the first paint is already the dark Unown list
  with no navigation.
- The `saffron-gym-ambush` task opens with a short enter modal ("Choo will be
  right behind me, I'll go on ahead.") and, because completing it activates
  the takeover, its exit modal ("Hello is anyo........." with the "...."
  button) plays before Explore locks down to the `???` region.
