Production browser verification used the isolated Linux standalone container on
`127.0.0.1:3112`, fresh Chromium contexts, and temporary synthetic player/admin
accounts. No production accounts or email delivery were involved. Fixture users
and the owned Run session were removed afterward.

The final image served an enforced nonce CSP with `CSP_ENFORCE` omitted. Explore,
Pokemon, Inventory, Run and the Payload admin dashboard all hydrated with zero
`securitypolicyviolation` events and zero uncaught page errors. The initial image
reported Zod's optional `Function()` probe and the admin Gravatar URL; client
`jitless` configuration and a local admin avatar removed these without allowing
production `unsafe-eval`.

Run initially downloaded 42 scripts containing numerous unrelated game exports.
After introducing the client dynamic registry, it downloaded 29 scripts and only
the Run game export. Decoded JavaScript response bodies fell from 4,544,014 to
2,656,113 bytes (41.55%). These are **uncompressed body sizes**, not compressed
transfer sizes or a measured page-latency improvement. Other sampled routes had
roughly unchanged totals. See `production-browser-baseline.json` and
`production-browser-final.json` for sanitized measurements.

Measurements used a 1280px viewport, empty Pokemon/inventory fixture lists and
an observation window ending 800ms after hydration. The isolated Run session was
seeded directly and observed during its countdown without playing or charging.
The initial measurements used empty lists; a subsequent populated-box profile
is described below. The standard browser suite passed 17 tests in 42.8 seconds
after the scoped-sync and inspector additions; both opt-in production tests were
skipped as intended in that run.

For a repeat smoke check, run `scripts/prepare-production-smoke.ts` with the
explicit isolated database, Redis and Payload-secret environment matching the
test container, then run it again with `--seed-run`. Execute
`STANDALONE_CSP_SMOKE=1 bun run test:e2e e2e/production-csp.pw.ts` and finish with
the setup helper's `--cleanup` mode. The helper rejects every database/Redis URL
except the dedicated local standalone-test services. It does not start or deploy
a production server.

For the populated-box comparison, also run the helper's `--seed-pokemon` mode on
the fresh fixture account and execute the opt-in `e2e/production-interactions.pw.ts`
test. Cleanup deletes only those users' Pokémon and game sessions before removing
the fixture users. CPU profile output and unsanitized network samples stay in
temporary local files; the checked-in JSON reports contain aggregate evidence.

## Coverage against the original audit acceptance matrix

The original source audit remains a historical record. The implementation adds
the following browser evidence; it does **not** complete the original matrix of
every surface in normal/Kid Mode, every viewport, and every failure condition.

| Original surface | Browser evidence | Material browser coverage still absent |
| --- | --- | --- |
| Authentication, registration, sessions, account settings | Auth at 390×844 and 844×390; one responsive background download per fresh mobile/desktop context | Registration/login submission and recovery journeys, account settings |
| Trainer, friends, rival features | Shared authenticated shell smoke | Friendship/trading/rival interaction journeys |
| Explore, tasks, locations, voyages, expeditions | Production Explore hydration and enforced CSP | Full task, location, expedition and voyage progression/reward journeys |
| Pokémon box, team, inventory, shops | Production box/inventory hydration and enforced CSP; 160-Pokémon pagination/DOM profile; inspector keyboard opening/closing and focus return at 390/1280px | Team editing, shop transactions, large populated inventory and wider collection sizes |
| PVE/PVP, battle powers | Injected PVP join/poll/cancel errors and retry; VS reduced-motion fixture | Live multiplayer/PVE turns, faint/switch animation sequences, powers and terminal rewards |
| Games and Field Research | Production Run startup; Art short-landscape keyboard drawing; Scratch keyboard reveal/claim; capture Throw keyboard control; real arcade hook with simulated saved-but-lost checkpoint response and remount | Individual game playthroughs and rewards, fishing lifecycle, capture gesture/QTE journey, Field Research |
| Artisan and spirit channeling | Source review only | Crafting/channeling transactions and mobile journeys |
| Pokédex, Abilitydex, Movedex, Carddex/decks | Source review only | Catalog keyboard/filter/deck journeys and populated-list measurements |
| PWA, shared navigation, rewards | Retry dialog retains pending result; mocked version update countdown/new-run cancellation and delayed-response race; selected reduced-motion checks; authenticated intent-prefetch counts and scoped sync fixture | Actual two-release installed-PWA rollout, device edge gestures and full navigation/reward matrix |
| Payload admin, developer tools, infrastructure | Production admin dashboard hydration, Users link and enforced CSP; fresh-context route script measurements | Admin CRUD workflows and host/device performance testing |

No Kid Mode browser journey, screen-reader session, measured contrast audit, or
real iOS/Android installed-PWA test was performed. Controlled fixtures exercise
recovery branches without contacting production services. Server fault-injection
and authority tests are separate evidence, not substitutes for full browser
journeys. No production load, p95 latency, or build-duration uplift is claimed.

## Scoped refresh and populated-box follow-up

The real `UserProvider` and SWR cache were exercised through intercepted sync HTTP
responses in `e2e/scoped-sync.pw.ts`. Visiting inventory, TCG, Abilitydex and core
made one request per scope. Applying an acknowledged `gameResults` invalidation
then requested core once, updated currency from 10 to 35, and made no unrelated
cached-scope requests. Revisiting inventory after the deduplication window made
one fresh request and retained the updated currency. An immediate cached TCG
revisit also showed 35 without fetching that scope. This tests client refresh
behavior with a controlled response; it is not a browser reward transaction test.

On the authenticated production fixture, no expensive navigation routes prefetched
during the initial observation window; hovering Pokémon issued exactly one
Pokémon prefetch. Explore → Pokémon → Explore → Pokémon generated no sync API
requests during the measured revisit window (server route data and the router
cache still participate). This does not establish behavior after every mutation.

The 160-Pokémon fixture initially rendered 18 cards/429 DOM nodes and eventually
rendered 160 cards/1,562 nodes through existing pagination. CPU sampling attributed
412–562ms scroll-period long tasks to full move-option scans in every closed
Pokémon inspector. The inspector now defers those calculations and subscriptions
until first activation, retaining its state afterward. Native dialog/drawer
trigger association also fixes Escape focus return. Baseline measurements are in
`populated-box-baseline.json`. The rebuilt image repeated the same 160-Pokémon
profile with the same final DOM count and **zero long tasks** during the measured
scroll window (`populated-box-final.json`). Keyboard opening, Escape closing and
focus return also passed in that production run. This is one controlled desktop
sample, not a guarantee of frame rate on every device or collection size.

The final opt-in production smoke and interaction tests plus scoped-sync test
passed together (3 tests, 33.4 seconds). All five route budgets passed using
deterministic gzip level 6 on downloaded script bodies: Explore 973,971 bytes,
Pokémon 834,092, Inventory 948,402, Run 582,170 and admin 651,142. These are
reproducible compressed-size estimates, not measured HTTP transfer sizes.
