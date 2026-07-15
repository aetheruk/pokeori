# Pokeori frontend UI/UX audit

This document tracks the whole-application frontend redesign. It is a working QA matrix, not a visual mood board. A surface is only complete after mobile, desktop, keyboard/focus, loading, empty, error, modal, and high-content states have been checked where applicable.

## Design thesis

Pokeori is a living expedition folio. Route artwork is the world outside the journal; management screens are annotated field records; focused gameplay is a contextual scene held inside readable field-journal chrome.

- **Palette:** paper `#efe4cf`, cream `#fff8e8`, ink `#293532`, moss `#5f794f`, clay `#b86148`, ochre `#b58a43`.
- **Type:** old-style serif for authored hierarchy, humanist sans for interface copy, monospace only for timers and quantities.
- **Layout:** mobile remains touch-first; desktop uses a 224px journal rail, bounded workspaces, and contextual inspectors.
- **Signature:** field marks encode real state—route stamps, specimen labels, map tabs, observation rules—not generic decoration.
- **Restraint:** one memorable illustrated or structural moment per surface; routine rows remain quiet and fast to scan.

## Baseline findings

- The shared token layer exists, but the initial player UI audit found about 1,400 legacy zinc, white, and teal utility references. The compatibility bridge is being replaced surface by surface where semantic intent is clear.
- The compatibility bridge prevents many contrast failures but cannot infer semantic intent; touched components must migrate to `game-*` tokens.
- Several large screens mix paper and old dark-card patterns internally, especially Pokemon details, Artisan, Inventory, encounters, TCG battle, and research games.
- The CLI and IDE-extension browser remain unavailable, but a signed-in Chrome dev session became available in the Codex desktop app on 14 July 2026. Live responsive QA is now underway; unchecked runtime states remain listed explicitly below.

## Surface matrix

| Surface | Presentation | Primary UX job | Current status |
| --- | --- | --- | --- |
| Authentication / PWA help | Scenic + paper | Enter the expedition quickly and understand installation | Live pass at 320, 1024, and 1440 complete, including install help, tab keyboard focus, and touch targets |
| Global shell / navigation | Paper | Move between core loops without losing context | Live mobile bottom navigation and desktop rail pass complete across management and gameplay routes |
| Trainer | Paper folio | Understand identity, progression, collection, and social state | Live 320/1024 high-content pass complete; shared loading and route-level error treatments are implemented, while live error injection remains unverified |
| Explore | Illustrated paper | Choose the next meaningful activity and understand its cost/reward | Live 320/1024 area, dailies, selectors, and activity-preview pass complete; locked-state pass complete at 320; error/expedition states remain |
| Pokemon boxes / details | Specimen folio | Organize, inspect, improve, and assign Pokemon safely | Live 320/1024 storage and detail-drawer pass complete; empty/error/loading states remain |
| Inventory | Field pack | Find an item, understand it, and act with minimal friction | Live 320/1024 index, item-drawer, and empty-search pass complete; destructive confirmation and error states remain |
| Artisan | Workshop folio | Discover recipes, compare requirements, and craft confidently | Live 320/1024 index, recipe-detail, and precise-craft QTE pass complete; other craft QTE variants remain |
| Pokedex | Specimen index | Scan discovery progress and inspect a species | Live 320/1024 index and species-detail pass complete |
| MoveDex / AbilityDex | Reference index | Scan ownership/registration and compatible Pokemon | Live 320/1024 index and registered-entry detail pass complete |
| TCG management | Collector folio | Browse cards, decks, packs, and progression | Live 320/1024 Carddex, typed search, empty result, and card-detail pass complete; deck and pack states remain |
| Shops / tasks / voyages / expeditions | Paper panels | Evaluate and commit to an activity | Live 320/1024 shop, daily-task, task-detail, and voyage-summary pass complete; purchase commit, claim, and expedition flows remain |
| Battles | Scene + field chrome | Read state instantly and choose an action confidently | Live Route 1 pass complete at 320/1024 through lead choice, HUD, item/move drawers, surrender, defeat, and victory rewards; PvP, faint/swap, and error states remain |
| Catch encounters | Scene + field chrome | Track capture state and make item/action choices | Live Route 1 pass complete at 320/1024 through preview, timed encounter, ball selector, run-away, and result; capture-success and item-result states remain |
| Research minigames | Scene + field chrome | Understand rules, play without obstruction, read results | Live Identify, Field Observation, and Booster Inspection passes complete at 320/1024, plus Diglett Tunnel Tap, Electro Drop, Pika Puzzle, Rattata Test, Spelling Bee, Voltorb Grid, Rock Tunnel Echo Map, and Rock Push Ice active-play passes at 320; other authored game types remain |
| Spirit Channeling | Night ritual + field chrome | Understand ritual cost, state, and outcome | Live empty-state pass complete at 320/1024; memento selection, ritual, and result states remain |

## Cross-application acceptance checks

- No ordinary paper surface relies on white text, zinc-black cards, teal controls, or decorative glow.
- Clay/destructive buttons use cream foregrounds; moss indicates selection/progress, not unrelated decoration.
- Interactive targets are at least 40px, with primary mobile controls at least 44px.
- Every icon-only control has an accessible name; selected navigation exposes `aria-current` or equivalent state.
- Focus is visible, reduced motion is respected, and text inputs permit selection.
- Mobile layouts remain usable at 320px width; desktop layouts are deliberate at 1024px, 1366px, and 1440px.
- Dialogs and drawers share content hierarchy and do not become nested boxes within boxes.
- Dynamic artwork never carries unprotected copy.
- Loading, empty, error, locked, disabled, and success states use actionable language and semantic colour.
- Generated or edited imagery is inspected for cropping, unwanted adjacent assets, hard seams, and compression artifacts before use.

## Verification snapshot — 14 July 2026

- Source audit is complete across the player-facing authentication, management, encounter, battle, research, result, and shared-renderer surfaces.
- The generated Pokeori emblems, empty states, auth scenes, lab scene, app icons, and flight background were inspected at source resolution. No clipped edges or adjacent-sheet fragments remain; the flight layer also passed a repeated-tile seam check.
- `bun run typecheck`, `bun run lint`, `bun run build`, `bun test`, and `bun run validate:data` pass. Lint reports 13 existing optional-chain suggestions and no errors; the complete suite reports 948 passing tests, and data validation reports 316 passing tests.
- A signed-in local Chrome session now supports live visual QA. The completed responsive states and remaining gaps are recorded per surface above; no untested loading, error, success, PvP, expedition, or alternate-minigame state is being claimed as signed off.

## Live visual QA checkpoint — 14 July 2026

- Checked the authenticated app at 320px and 1024px across Trainer, Explore, Inventory, Pokemon, Artisan, Pokedex, MoveDex, AbilityDex, Carddex, shops, tasks, voyages, Spirit Channeling, a wild battle, a catch encounter, and an Identify research game. Authentication and PWA help were also checked at 1440px.
- Confirmed no horizontal overflow on the checked surfaces. Shared tabs, compact buttons, icon buttons, dialog closes, carousel arrows, and surface-specific controls now meet the 40px minimum target; primary mobile actions remain 44px or larger.
- Corrected 1024px density regressions in Trainer skills, Inventory items, Artisan recipes, and Explore task/activity cards by delaying their narrow extra columns until wider breakpoints.
- Disabled reward-carousel auto-advance by default and suppress it when reduced motion is requested, so wallet and reward content no longer moves while being read.
- Added accessible names and keyboard activation to trainer customization, Pokemon storage cards, Pokemon markings, and close controls. Artisan recipe containers now ignore bubbled Enter/Space events from their nested action buttons.
- Reworked the mobile forced battle picker into a scrollable single column. Pokemon names, HP values, percentages, and type badges no longer collide at 320px; the 1024px two-column picker is unchanged.
- Tightened mobile Pokemon research-reward rows so longer names and XP values stay readable on one line in the 320px battle-victory result.
- Converted the Field Observation question card to a bounded flex column. Its fourth 48px answer no longer sits below a clipped mobile panel; the answer list now scrolls through the card's remaining height.
- Enlarged the precise-craft close control to 40px and reduced the mobile recipe emblem/header footprint so the recipe name and instruction remain fully visible at 320px.
- Expanded the catch-preview encounter-item selector to the inspector width, removing the one-word wrapping caused by forcing a single Repel into a three-column grid.
- Corrected Carddex search so free text filters immediately across owned binders using the matching Pokemon's Pokedex id. Arbitrary text now reaches the authored empty state, partial matches exclude unrelated Trainer cards, and choosing a suggestion still narrows to the exact species.
- Preserved long Explore activity names at mobile width with three-line clamping; Test-area variants such as Spirit Channeling Supplies and Mewtwo Shield now expose their meaningful suffixes instead of hiding them behind an ellipsis.
- Rechecked the signed-in Route 1 catch modal at 320px: the preview keeps the encounter-item selector and inhabitant strip readable, while the account's available state still stops before capture-success/item-result coverage. Rechecked Spirit Channeling at 320px as well; its intentional “No Mementos” empty state is centered and readable, with ritual/result states still gated on inventory.
- Rechecked the Test-area Diglett Tunnel Tap game at 320px: the timed tap field exposes a single active Diglett target among disabled holes, then transitions cleanly into the Reward Result dialog. The visible Fail state keeps the outcome text and Play Again/Continue actions readable at the mobile width.
- Checked the Explore region chooser at 320px: Kanto is selectable while Orange Isles, Southern Isles, Battle Isles, Underground, Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, and Paldea are visibly disabled, giving the locked state an explicit affordance.
- Rechecked the Test-area Electro Drop game at 320px: its preview opens into a readable Pachinko playfield with a visible DROP action, prize counter, spend counter, and Prizes control; the drop action was left untouched to avoid spending the signed-in account's currency.
- Rechecked the Test-area Pika Puzzle game at 320px: its preview and active 3×3 playfield fit the viewport without horizontal overflow. Added descriptive accessible names to each focusable tile so keyboard and screen-reader users can identify its number and grid position.
- Source-reviewed the Match 3 board while expanding the alternate-game pass: crystal cells now expose their type and row/column through accessible names and report their selected state; live active-play coverage remains gated by the existing research session.
- Rechecked the Test-area Rattata Test at 320px: the run playfield stayed within the viewport, the score remained readable, and the timed fail result exposed Final Score plus Play Again and Continue actions without clipping.
- Rechecked the Test-area Spelling Bee at 320px: the prompt, answer slots, and 45px keyboard letter targets fit the full 800px viewport with no horizontal or vertical page overflow; the active answer was left incomplete to avoid committing a reward result.
- Rechecked the Route 10 Voltorb Grid at 320px after the prior session expired: the live board exposes readable progress counters and timer, labeled discharge/directional controls sized 48–64px, and no horizontal overflow. The puzzle was left unsolved, so its result state remains unverified.
- Rechecked the Rock Tunnel Echo Map Test at 320px after the Voltorb timeout: the live maze exposes its progress counter, timer, flash-state message, and 64px labeled directional controls without horizontal overflow. The maze was left unsolved, so its result state remains unverified.
- Rechecked the Rock Push Ice Test at 320px after the Rock Tunnel timeout: the board exposes readable progress counters and timer, 40px named Undo/Restart controls, and 64px named movement controls without horizontal overflow. Added the missing movement labels in the shared Rock Push implementation; the puzzle was left unsolved.
- Rechecked the TCG Battle Test: Baby preview at 320px: its full-width scrollable dialog keeps the overview readable and the 44px Start Game action visible without horizontal overflow. Starting the battle was left untouched because it would commit a battle session.
- Rechecked the TCG Battle Test: Champions preview at 1024px: the right-side dialog settles into a 430px inspector with a visible 44px Start Game action and no document overflow. Starting the battle was left untouched.
- Source-reviewed the expedition detail action while the live expedition flow remains gated: the destructive abandon icon now exposes an explicit accessible name in addition to its tooltip.
- Rechecked the Pallet Town Prof's Scrip Shop at 320px: purchase controls now expose item-specific names such as “Buy League Ticket” while preserving disabled affordability states; no purchase was submitted.
- Source- and runtime-checked the Pallet Town Explore cards: non-grouped entries such as Prof's Scrip Shop and Rattata Scavenge now expose button semantics, an “Open …” accessible name, and Enter/Space activation; grouped cards retain their nested Normal/EX mode buttons without a competing parent action.
- Rechecked the Rattata Scavenge task detail via keyboard at 320px: its bounded dialog keeps the reward copy readable, with a 40px Close control and 44px Check Results action visible; Check Results was left untouched to avoid committing task progress.
- Rechecked the Pokedex index at 320px after labeling its species tiles: known entries expose names such as “View Bulbasaur,” while unseen placeholders expose “Unknown Pokémon #…” names instead of blank buttons; the index remains within the viewport.
- Rechecked MoveDex and AbilityDex at 320px after labeling unknown reference entries: unregistered rows now announce “Unknown move” or “Unknown ability,” while known rows expose “View …” names; both indexes remain within the viewport.
- Rechecked MoveDex and AbilityDex at 1024px as well: the expanded unknown/known grids retain their labels and remain within the document width.
- Checked the signed-in Trainer dashboard for the missing TCG deck state: the TCG Decks tab is correctly gated behind the `deck-box` inventory item, which this account does not own, so deck editing and pack-opening remain unverified rather than inferred from Carddex.
- Source-reviewed the battle item drawer trigger: it now announces “Items” plus the remaining-use count instead of exposing only a bare numeric counter; live battle interaction remains covered by the existing gated-state notes.
- Standardized the lazy Explore and Trainer loading fallbacks, plus the Explore activity-detail modal, on the shared field-journal loading state with contextual status labels instead of generic “Loading…” text.
- Added polite status semantics and contextual copy to card-reveal fallbacks in reward, inventory, and battle flows so asynchronous transitions are announced without changing their presentation.
- Reworked the battle error boundary into a clearly labeled “Battle interrupted” recovery state with assertive announcement semantics, Pokeori danger tokens, selectable diagnostics, and explicit reload/clear-state recovery copy.
- Added an inventory sale confirmation step that shows the exact quantity and payout before committing, with “Keep item” and “Confirm sale” actions sized for touch; the live signed-in sale action remains intentionally unsubmitted.
- Aligned the expedition-abandon confirmation with the shared paper dialog treatment: clearer heading hierarchy, Pokeori clay destructive action, and 44px-class Cancel/Abandon controls.
- Added a shop purchase confirmation that lists the exact item and cost before spending currency or inventory, with a touch-safe “Keep browsing” escape; no purchase was submitted during QA.
- Added explicit accessible names, busy state, and minimum touch height to task completion, voyage, expedition continuation, and expedition reward-claim actions; commit behavior remains unsubmitted in live QA.
- Migrated the shop’s inaccessible/out-of-stock, unaffordable, and restock status colors from legacy red/rose/sky utilities to semantic Pokeori danger and ochre tokens.
- Migrated Trainer friend-removal hover states and trainer-search errors from legacy rose/red utilities to semantic Pokeori danger tokens, hiding the decorative alert icon from assistive technology.
- Hardened the gated TCG deck panel’s save/auto-fill controls with 44px-class touch height, busy semantics, and polite save-status announcements; deck-box gating remains explicit for accounts without the required item.
- Added selected-state and descriptive labels to voyage team-selection buttons, plus busy semantics to the voyage start/complete action so keyboard and screen-reader users can distinguish roster changes and commit states.
- Replaced the Rock Push Ice game’s legacy red warning utilities with semantic Pokeori danger tokens while preserving its high-visibility low-move warning treatment.
- Migrated remaining Explore status, expedition icon, locked-encounter, and consumable-Pokemon caution colors from legacy rose/red/sky utilities to semantic Pokeori danger, clay, and ochre tokens.
- Added state-aware labels and expanded-state semantics to Explore inhabitant cards; locked cards announce their requirements toggle while discovered cards no longer appear as unlabeled interactive controls.
- Completed a Pokemon surface token sweep: HP/stat bars, lock and marking states, bulk-release warnings, and release actions now use semantic Pokeori danger/clay tokens with touch-safe release controls; no legacy red/rose/teal/zinc utility references remain in the Pokemon route.
- Continued reference-index QA by moving the Pokedex HP bar to the semantic danger token and giving MoveDex’s lost-TM recovery action busy semantics and a touch-safe height.
- Added state-aware labels to the shared Pokemon selection grid and migrated its circle-marking indicator to the semantic danger token, improving task/expedition selection announcements.
- Migrated shared stance-icon tones and low-time timer warnings to semantic Pokeori danger, moss, ochre, and clay tokens so battle and research surfaces no longer inherit legacy rose/cyan/red utilities.
- Disabled automatic card-reward carousel advancement so reward cards remain still while read, and migrated discarded-card and negative-currency styling to semantic Pokeori danger tokens.
- Aligned both Trainer Leveling scroll regions with the shared game-border scrollbar token, removing the last visible zinc scrollbar treatment from that folio surface.
- Aligned the VS battle transition cards with game-night surface and border tokens, preserving the dark cinematic overlay while removing zinc-black container styling.
- Migrated Artisan’s insufficient-ingredient recipe state from legacy red/rose utilities to semantic Pokeori danger styling; authored DynamicSky gradients remain intentionally scenic.
- Migrated shared Research Result failure treatments and Reward Result failure titles to the semantic danger token, and aligned Explore’s page scrollbar with the shared game-border token.
- Migrated battle-log damage, healing, and bad-effect chips from legacy red/emerald utility pairs to semantic Pokeori danger and moss tokens while preserving the compact inline hierarchy.
- Aligned surrender icon, low-health bar, and battle stance badges with centralized Pokeori clay, danger, moss, and ochre tokens.
- Aligned battle error recovery and victory/defeat result messaging with semantic Pokeori clay, danger, and ochre tokens.
- Rechecked the signed-in inventory item drawer at 320px: the Dark Gem detail, owned quantity, sell quantity controls, sell actions, and 40px close control fit the viewport without horizontal overflow. Selling was left untouched.
- Rechecked the signed-in Carddex at 320px: the four-column owned-card grid, typed search, filter bar, and Charizard detail remain readable; this account exposes no deck-builder or pack-opening controls from the TCG surface, so those states remain unverified rather than inferred.
- Rechecked the signed-in VS Seeker voyage modal at 320px: the Trainer Rematch label, overview, 3-on-3 rule, level cap, reward card, close control, and Start action all remain readable without clipping. Starting the voyage was left untouched because it would commit the account's team to a battle.
- Verified the live battle HUD, battle item and move drawers, surrender confirmation, defeat and victory results, catch ball selector, escaped result, Identify and Field Observation research states, and Booster Inspection preview/active playfield at 320px. Remaining runtime gaps are intentionally retained in the matrix rather than inferred from source review.
- Migrated faint-team swap styling and HP thresholds from legacy red/green/yellow utilities to semantic Pokeori danger, moss, and ochre tokens; the forced faint-swap flow remains a live-QA gap while the browser session is signed out.
- Aligned battle power and shout status accents with semantic Pokeori danger, moss, and ochre tokens; weather-specific sky accents remain intentional category styling.
- Aligned the PvP lobby copy-success indicator with the shared moss success token.
- Aligned current expedition-step and Explore event headings with the shared ochre accent token.
- Aligned inventory move fallback stance coloring and expedition fallback icons with shared Pokeori moss/ochre tokens.
- Added polite status semantics to the shared GameResult outcome heading so research, encounter, battle, and reward result states announce their success/failure outcome when mounted.
- Raised shared GameResult secondary actions, including alternate-game “Play Again” controls, to the 44px-class touch target without requiring per-game markup changes.
- Raised GameInfoModal action buttons to the same 44px-class minimum, covering task, expedition, shop, and exit-modal commit surfaces.
- Hardened the shared GameErrorBoundary with alert semantics, a hidden decorative warning icon, and touch-safe Reload/Try again controls.
- Set shared AlertDialog action and cancel primitives to a 44px-class minimum so destructive confirmations retain touch-safe controls by default.
- Hardened Fishing’s early/missed feedback with polite live-region announcements, migrated its nibble accent to ochre, and raised the Release action to a touch-safe height.
- Hardened Prize Wheel controls with busy semantics for spin/claim actions, a touch-safe Prizes button, and the shared ochre trophy accent.
- Hardened Slots controls with a touch-safe Prizes button and busy semantics on the spin action while preserving authored theme colors for the game scene.
- Hardened Pachinko with a touch-safe Prizes control, live drop-summary feedback, and state-aware Drop button labeling/busy semantics.
- Added polite live-region semantics to Match 3 cascade announcements and aligned the combo accent with the shared ochre token.
- Migrated Voltorb Grid’s near-limit move warning to semantic danger styling while preserving its authored blast animation.
- Hardened Rock Tunnel Echo Map’s near-limit warning and intro copy with semantic danger styling and polite status announcements.
- Rechecked the signed-in Inventory item drawer at the current 924px viewport: Dark Gem ownership, quantity controls, sell actions, and close control are all visible in the full-height dialog with no horizontal overflow; no sale was submitted.
- Rechecked the signed-in Prof’s Scrip Shop modal from Explore: the shop title, ownership/currency context, League Ticket purchase control, disabled unaffordable item controls, and close control render in a full-height dialog without viewport overflow; no purchase was submitted.
- Rechecked the signed-in Route 1 catch flow through the live encounter and item selector at the 924px viewport. The mobile “Use Item” drawer had no dismiss action; added a shared touch-safe Close control to the ResponsivePanel drawer path and verified it closes without consuming an item or leaving the encounter.
- Rechecked the signed-in Prof's Scrip Shop purchase boundary at the 924px viewport: Buy League Ticket opens a centered “Confirm purchase” alert with exact item/cost copy, 44px Keep browsing/Confirm purchase actions, and no horizontal overflow; Keep browsing returns to the shop without submitting a purchase or spending currency. The existing 320px and desktop shop layout checks remain unchanged.
- Rechecked the signed-in Rattata Scavenge task detail at the 924px viewport after the shared drawer close addition: the bounded detail remains within the viewport, its Begin action is readable, and the drawer exposes exactly one Close control after suppressing the duplicate shared close on custom-header panels; no task was started.
- Rechecked the signed-in VS Seeker voyage detail at the 924px viewport: the full-height dialog stays within the document width, exposes a 40px Close control and 44px Start action, and dismisses cleanly with Escape. A later Start activation transitioned into the live 3-on-3 battle scene; no battle move, item, switch, or surrender action was submitted. The live HUD remained within the viewport with 48px action controls, while voyage completion and reward states remain unverified.
- Rechecked the live voyage-battle surrender boundary at the 924px viewport: the “Surrender Battle” confirmation is centered, keeps the exact loss-warning copy, retains a 44px destructive action and 40px Close control, and has no horizontal overflow; Close returned to the battle without surrendering.
- Rechecked the signed-in Rattata Scavenge expedition flow at the 924px viewport: the overview stays within the document width with a 40px Close control and 44px Begin Voyage action; opening team assembly exposes explicit Pokemon labels, a permanent-consumption caution, a disabled Start Voyage state until the 1–6 team and speed requirement are met, 112×128 selection cards, and no horizontal overflow. The expedition was left unstarted.
- Rechecked Artisan’s Base Lures variant inspector at the 924px viewport: the full-height variant panel stays within the document width, exposes 18 clearly named variants with ingredient counts and locked/missing-material states, retains a 40px Close control and 40px disabled state actions, and has no horizontal overflow. Crafting was left untouched.
- Rechecked Artisan’s Held Type Boost variant inspector at the 924px viewport: the 12-variant panel keeps its explanatory copy, type-variant list, 40px Close control, and disabled Locked actions inside the viewport with no horizontal overflow. Crafting was left untouched.
- Rechecked the signed-in Inventory destructive boundary at the 924px viewport: Dark Gem’s “Confirm sale” alert states the exact item, quantity, payout, and irreversible-action warning; both Keep item and Confirm sale are 44px touch-safe actions in a centered 512px alert with no horizontal overflow. Keep item dismissed the alert without changing the owned quantity.
- Rechecked the signed-in Pokemon bulk-release boundary at the 924px viewport: selecting one Pokemon opens a centered “Bulk Release Pokemon” confirmation with the count, collected-rewards copy, irreversible-action warning, a 44px Release All action, and 40px/40px Cancel and Close controls; no horizontal overflow. Cancel dismissed both the confirmation and release mode without releasing anything.
- Rechecked the signed-in Pokémon GO Booster Pack detail at the 924px viewport: the TCG drawer explains the set and five-card contents, shows the owned quantity, and exposes a 44px Open pack action plus a labeled 44px Open all control alongside a 40px Close control; the full-height drawer has no horizontal overflow. Pack opening was left untouched because it immediately consumes packs.
- Fixed a broad foreground-token regression: `text-game-cream` now resolves to the shared night-ink cream token, restoring readable light text across clay/danger actions and badges that had fallen back to black. Removed the battle type selector’s decorative star/icon glow in favor of a restrained moss selected state, and corrected the battle-result Continue action to use the defined raised-surface foreground.
- Rechecked the signed-in Trainer Friends empty state at the 924px viewport: the counts, empty illustration, and journal section control fit without overflow; updated the empty-state copy to direct players to the Trainers section, where the promised trainer search actually lives.
- Rechecked the signed-in Trainer registry no-results state at the 924px viewport: the labeled 44px search field and 44px Search action remain readable, the “No trainers found.” result is concise, and the section selector remains within the viewport without overflow.
- Rechecked the signed-in Trainer High Scores surface at the 924px viewport: the populated Explorer and PVP Rank leaderboards, 44px ranking filter, and 48px section selector remain readable with no horizontal overflow.
- Rechecked the signed-in Mystery Gift invalid-code state at the 924px viewport: the 56px gift-code field, 44px Redeem gift action, and inline “Invalid code” feedback remain readable and within the viewport without overflow; no gift was redeemed.
- Rechecked the signed-in Trainer Collection dashboard at the 924px viewport: the 2% progress summary, collection counters, four linked index cards, snapshot metrics, and 48px section selector remain readable with no horizontal overflow.
- Rechecked the signed-in Pokédex unknown-entry state at the 924px viewport: the “Unknown Pokémon” dialog gives clear unavailable-record copy, preserves seen/caught counts and placeholder stats, keeps a 40px Close control, and remains within the viewport without overflow.
- Fixed a shared mobile drawer hit-testing regression found during Pokédex QA: the drawer surface now restores pointer events and its Close control sits above the content layer; the unknown-entry drawer now dismisses via pointer click as well as Escape without reopening.
- Rechecked the signed-in MoveDex at the 924px viewport: a known Water Gun detail drawer and an unknown TM entry both stay within the viewport with 40px Close controls; the unknown entry clearly reports “TM Not Found” and the clue-added outcome. The recovery clue interaction was left at its resulting informational state.
- Rechecked the signed-in AbilityDex at the 924px viewport: the 37/310 index, registered and unknown ability cards, known Anger Point detail, and “Ability Not Registered” state all remain readable with centered 576px details and 40px Close controls, without horizontal overflow.
- Rechecked the signed-in Carddex at the 924px viewport: the Base binder grid, zero-result search state, corrected binder-neutral recovery copy, and Charizard detail panel remain readable with a 40px Close control and no horizontal overflow.
- Rechecked the signed-in Explore Tasks & Rewards surface at the 924px viewport: the challenge list, daily-task cards, region/area selectors, and Return to Area control remain contained within the document width and viewport height with readable task copy; no task or expedition was opened.
- Fixed and rechecked Artisan’s recipe-detail drawer at the 924px viewport: its mobile sheet now accounts for the app chrome instead of extending below the viewport, while the 40px Close, 44px Start Craft, and bulk x5 controls remain visible and the document returns to viewport height.
- Rechecked the signed-in Explore “Misty’s Pool Cleanup” task detail after the shared drawer adjustment: once settled, the 963px sheet fits exactly between the app chrome and viewport edge, the 40px Close control remains visible, requirements/rewards stay readable, and the unmet task was not started.
- Refined the signed-in battle type selector at the 924px viewport: the rectangular selection box and underline are gone; the type buttons are now transparent with generous 80×56px touch targets, the chips are larger and easier to read, and the selected state is carried by the type icon itself with a restrained edge highlight, scale, and full-colour treatment. Keyboard/focus behavior and the battle controls below remain unchanged.
- Added a compatibility rule for legacy clay/moss accent controls that still pair `text-game-surface-raised` with a filled action background: those controls now use the light night-ink foreground, preventing black-on-red/orange regressions across older player-facing dialogs and action flows.
- Rechecked the signed-in Explore “Rattata Scavenge” voyage detail at the 924px viewport: the shared mobile sheet settles exactly between the app chrome and viewport edge, the 40px Close and 44px Begin Voyage controls remain visible, and the overview/rules/rewards copy stays readable without starting the voyage.
- Corrected voyage team-selection and completion states to use the light accent foreground on moss/clay fills, keeping selected Pokémon labels, level text, completion icons, and the Check Results action legible in night mode.
- Replaced remaining dark surface foregrounds in Explore’s task/voyage action helpers and shared selected-state badges with the light accent foreground, including confirm/complete/claim/continue controls, caught markers, team-selection checks, and the Diglett score chip.
- Corrected Artisan hold/tap/lock action states and Trainer profile-save/banner labels to use the light accent foreground on clay fills, preventing conditional night-mode regressions when those actions become active.
- Fixed the Trainer journal at small desktop widths: the profile content now stacks its Skills and Gym Badges sections vertically instead of laying them out as clipped side-by-side columns inside the secondary rail.
- Fixed the Trainer Collection grid at small desktop widths: the four collection panels now use two columns while the journal rail is present, reserving four columns for wider desktop layouts so titles and completion stats no longer collapse into narrow vertical text.
- Rechecked the adjacent small-desktop surfaces at 1091px after the Trainer layout fix: Explore, Carddex, Artisan, Pokédex, MoveDex, and AbilityDex remain contained within the viewport with readable headings; Inventory’s off-screen reward cards remain contained by its intentional horizontal carousel.
- Attempted to re-open the signed-in battle encounter during the next QA pass; the route still returns the transient “ERR max number of clients reached” interruption page, so live battle-state verification remains pending while the source-level responsive layout and 80×56px type controls remain in place.
- Rechecked the Trainer profile detail modal at the small-desktop viewport: the centered 448px profile dialog keeps its stats, skill rows, and 40px Close control inside the viewport; its only off-screen nodes belong to the intentionally contained horizontal skill carousel.
- Added descriptive Carddex card-button names so owned cards announce “View [name] card [number]” and unowned cards announce their unavailable state instead of exposing only a bare number; verified the labels live on the signed-in Base binder without changing the 1091px grid geometry.
- Added concise primary-action names to Inventory item cards so their keyboard-focusable surfaces announce “View [item]” while item actions such as Use, Sell, or Open all retain their own item-specific labels; verified the names live on the signed-in inventory grid.
- Added an explicit accessible name to Explore’s 48px Active Dailies/Return to Area icon control instead of relying on its tooltip title; verified the control live in the signed-in Pallet Town view.
- Added concise names to Artisan’s focusable recipe and variant-group cards so they announce “View [recipe] recipe” instead of requiring a screen-reader user to parse the full status string; verified the labels live on the recipe index.
- Rechecked signed-in Pokémon storage and the MoveDex, AbilityDex, and Pokédex indexes for unlabeled or undersized visible controls at the small-desktop viewport; no new unlabeled controls or sub-40px interactive targets were found.
- Rechecked signed-in Spirit Channeling at the small-desktop viewport: the account remains in the intentional “No Mementos” empty state with no rendered ritual controls; the available ritual source paths retain explicit selection labels and touch-safe targets.
- Rechecked shared navigation, ResponsivePanel closes, PremiumSelect triggers, Pokémon detail marking actions, and visible ritual/reference controls for named actions and target sizing; no additional shared-control regression was found.
- Added polite status semantics to the Trainer Friends loading state so its existing “Loading friends…” treatment is announced while the empty state remains unchanged.
- Added status semantics to Trainer search and High Scores fallbacks: no-result/search failures announce assertively, while leaderboard loading announces politely; the live Trainer no-results state now exposes an assertive alert.
- Added concise `View [item]` names to Inventory’s Recently Acquired horizontal cards and a busy-aware accessible name to Artisan’s detail-panel Start Craft action while it displays its loading spinner.
- Rechecked the signed-in Prof’s Scrip Shop detail at the current small-desktop viewport: the 458px right-side inspector fits without document overflow, and all buy actions remain named and contained; no purchase was submitted.
- Rechecked the signed-in Rattata Scavenge detail at the current small-desktop viewport: the 458px right-side inspector fits flush to the viewport, the 44px Begin Voyage and 40px Close controls remain visible, and the document width stays contained; the voyage was not started.
- Rechecked the signed-in Misty’s Pool Cleanup task detail at the current small-desktop viewport: the 458px right-side inspector fits flush to the viewport, requirements and rewards remain readable, and the document width stays contained; no completion action was available or submitted.
- Rechecked Trainer High Scores and Friends at the current small-desktop viewport: the populated leaderboard row and the Friends empty state remain readable with no horizontal overflow.
- Updated the shared card-reward carousel image description from generic “Card” to the actual rewarded card name, preserving the compact 48px result row while making card rewards identifiable.
- Replaced the last legacy yellow Identify action on unidentified Pokémon cards with the shared ochre field accent, keeping the high-visibility action while matching the route’s semantic palette.
- Added a route-level game error surface for management and gameplay pages so render failures now keep the field-journal treatment, expose selectable diagnostics, announce assertively, and provide touch-safe Try again/Reload recovery actions.
- Added selected-state semantics to the mobile Trainer section drawer buttons so the active journal section is announced consistently with the desktop navigation.
- Updated the Pokémon box responsive grid to four columns on mobile (with tighter gaps and larger breakpoints for wider screens), making the box denser without shrinking the touchable card surfaces excessively.
- Fixed roster assignment feedback in the Pokémon quick menu and selection flow: assigning a battle-team slot or partner, and moving either back to a box, now synchronises local box/team/partner state immediately while the server refresh completes.
- Increased the mobile Pokémon roster-panel headings and team count metadata so Battle Team and Partner remain legible beneath the denser four-column box grid.
- Increased shared SectionDivider headings from 11px to 12px and Inventory move-detail metadata labels from 9px to 10px; the live Tail Whip detail now exposes readable “Move data”, “Can learn”, and stat labels without changing its panel geometry.
- Aligned the mobile bottom navigation to the bottom edge of its safe-area content so labels no longer float a couple of pixels above the navigation bar.
- Increased contrast and legibility for catch encounter instructions, berry prompts, and Poké Ball selection headings, and gave berry buttons specific accessible names instead of the generic “Flick berry” label.
- Increased Trainer profile modal stat and battle-formation labels from 9px to 10px with controlled tracking so secondary metrics remain readable without changing the dialog geometry.
- Increased Artisan recipe-card and variant status metadata from 10px to 11px with slightly tighter tracking; live verification now shows the Ready/Missing materials states at 11px without changing card geometry or the 40px actions.
- Increased the persistent Trainer Collection progress-dial “Done” labels from 8px to 10px with controlled tracking; all four live collection cards now expose the label at 10px without changing the dial geometry.
- Increased Trainer progression level/category badges and Rank labels to 10px with controlled tracking; the live Explorer skill detail now exposes all four Rank labels at 10px without changing the card layout.
- Increased the shared Pokémon selection-row level metadata from 9px to 10px so roster, voyage, and team-selection cards retain readable LVL labels alongside their 10px names.
- Increased Pokémon detail-drawer research, form, Shiny, move-chip, and Partner Effect metadata from 8–9px to 10px with controlled tracking; the signed-in Pokémon Box remains live-verified without changing the drawer geometry.
- Increased Pokédex, AbilityDex, and MoveDex species-number overlays from 8px to 10px, adding a restrained surface backing where needed; live Pokédex verification now measures the visible index labels at 10px without changing card sizing.
- Increased Voyage selection LVL metadata and compact badge/reference chips from 8–9px to 10px with controlled tracking; live MoveDex verification now measures its Unknown chips at 10px while preserving the existing card density.
- Increased Explore encounter-status and locked-requirement labels from 9px to 10px, tightening tracking and removing the partial-danger opacity from requirement prompts; the live Explore route remains verified for its task/region surface, while those encounter states are not rendered in the current account.
- Increased shop out-of-stock, cost, stock, and restock metadata from 8–9px to 10px with controlled tracking, promoted the out-of-stock chip to a touch-safe 20px height, and increased the inventory roster species overlay and action badge to 10px; live inventory remains reachable, though the current account did not render those exact metadata labels for computed-style verification.
- Reworked the Pokémon empty-box state into a responsive field-note panel with visible artwork at mobile widths, a stronger hierarchy, and a polite status announcement; the signed-in account remains populated, so the empty branch is source-verified rather than live-triggered.
- Increased Spirit Channeling offering counts, item names, slot indices, and empty-slot labels from 8px to 10px with controlled tracking and taller text rhythm, and increased the battle TrainerCard title badge from 9px to 10px; the account’s live Spirit Channeling page remains the intentional empty state, so offering labels are source-verified.
- Increased battle-log result labels from 9px to 10px and replaced the 40%-opacity empty log placeholder with a bordered, explanatory empty state; this improves scanability without changing the battle log’s action-row geometry.
- Increased the catch Poké Ball “Swipe up” instruction from 9px/80% opacity to a solid 10px label, and increased empty battle-team slot numbers from 9px to 10px so the selection affordance remains legible inside the touch-safe cards.
- Normalized the remaining Pokédex species-detail and Pokémon research badges/chips from 9px to 10px with controlled tracking, including level/rank metadata, unlock tags, reward labels, and the maxed-state badge; detail-panel geometry remains unchanged.
- Removed low-opacity treatment from TCG battle-deck counts, Trainer High Scores position labels, and GameInfo rules icons so secondary state remains readable against the paper surfaces; no grid or panel geometry changed.
- Confirmed the Trainer dashboard’s lazy profile path uses the shared `GameLoadingState` with a polite status announcement and readable field-note label; the matrix now distinguishes implemented loading/error treatments from still-uninjected live error coverage.
- Replaced the dark app/PWA icon artwork with a light paper field-journal compass, exported matching 96px, 180px, 192px, 512px, and full-resolution variants, and updated the in-app mark to match.
- Reworked the Pokeori wordmark into a quieter expedition-journal lockup with a transparent background, charcoal lettering, and a restrained clay accent instead of the previous high-fantasy treatment.
- Removed partial-opacity treatment from Trainer search failure and Explore Pokémon-consumption warnings so critical status copy and icons remain immediately legible; live Trainer desktop layout remains contained with no horizontal overflow or undersized visible controls.
- Increased MoveDex detail metadata labels and Pokémon Snap photo names from 9px to 10px with controlled tracking, preserving the existing card geometry; live MoveDex remains contained with 44px filters and 74px move rows.
- Increased TCG battle attack projections, side-score labels, card counts, and attack-cap metadata from 9px to 10px with controlled tracking so compact night-activity HUD copy remains readable without changing its action-row geometry.
- Made Inventory’s sale confirmation mobile-first: the dialog is width-contained, and Keep item/Confirm sale become full-width 44px actions on narrow screens before returning to an inline desktop footer.
- Removed partial-opacity from Artisan’s Hold Plate helper copy (“release anywhere” / attempt count), keeping the interaction guidance solid against both active ochre and clay button states.
- Strengthened shop stock metadata by removing faded “In Stock”/“Restocks” labels and replacing whole-card out-of-stock opacity with a danger border/canvas treatment, preserving the disabled distinction without washing out item names or status copy.
- Replaced legacy muted text tokens in the battle item drawer with the night-surface semantic muted token for the remaining-use summary and item-effect descriptions, keeping drawer copy consistent with the battle palette.
- Replaced remaining legacy muted tokens in Pokédex loading, Explore empty-state, and battle team-swap metadata with their paper/night semantic equivalents so fallback and selection copy keeps the intended contrast.
- Strengthened the Pokédex unknown-species label from 12px/50% opacity to a solid 14px semantic-muted label so “Unknown” and “Shiny Unknown” remain readable beneath the silhouette.
- Removed partial-opacity from the selected Pokémon level label in Voyage selection so the highlighted team’s LVL metadata remains fully legible against the moss selection surface.
- Normalized the final 9px player-facing activity labels to 10px: Pachinko bucket names, TCG charge gain, and the compact TCG HP pill; truncation and existing HUD geometry remain intact.
- Reworked faint Pokémon cards in the battle swapper from whole-card opacity to a danger border/canvas treatment with restrained grayscale, keeping the faint state obvious while preserving names, levels, and HP copy readability.
- Added explicit busy feedback to the Pokémon roster quick menu: assignment actions now swap their icon/label to a spinner and “Adding…”, “Making partner…”, or “Moving…” while the local roster update and server action settle.
- Marked the same roster quick-menu action group `aria-busy` during assignment so assistive technology receives the same in-flight state as the visible spinner and label.
- Removed whole-card opacity from unmet Voyage team requirements, retaining their neutral border/icon/dot treatment while keeping stat names and current-versus-required values readable.
- Confirmed the signed-in Trainer dashboard is mounted at `/game` through the main shell; `/game/trainer` is not an authored route and returns 404, so no standalone Trainer URL coverage is claimed.
- Strengthened Explore’s undiscovered Pokémon fallback markers from 60%-opacity question marks to solid semantic-muted markers; the locked clay state remains distinct while unknown-but-unlocked cards are easier to scan.
- Removed partial-opacity from battle waiting (“Thinking…”) and TCG resolution-detail copy so live status text remains clear over the night-surface overlays.
- Removed partial-opacity from the Inventory “Sell All” total so the transaction amount remains as prominent as the action label.
- Strengthened remaining activity HUD accents: the Pokémon Snap camera action icon and Pachinko currency/bet indicators now use solid night-cream contrast instead of partial-opacity treatments.
- Removed the final partial-opacity treatment from the desktop Explore header description so route context copy remains solid and readable over the dark scene gradient.
- Reworked unowned Trainer badge tiles to use a clear neutral canvas/border state instead of 40% whole-tile opacity; the grayscale/low-opacity badge art still communicates locked ownership without obscuring the tile itself.
- Added `aria-pressed` semantics and explicit button types to Trainer banner and avatar selectors so their moss-ring selected state is announced consistently and cannot accidentally submit the customization form.
- Added matching `aria-pressed` semantics to Spirit Channeling’s incense, offering, and channeler pickers so the selected moss treatment is available to keyboard and screen-reader users.
- Re-aligned the mobile game-navigation items to the bottom edge so icon/label tags no longer float inside the nav with a visible lower gap; the safe-area padding remains on the nav container.
- Increased catch encounter instruction headings to 16px and the Poké Ball “Swipe up” cue to 12px, keeping the solid cream/moss contrast while making the required gestures readable at a glance.
- Added explicit button and pressed-state semantics to catch question answers so the highlighted option is announced consistently during answer submission.
- Added pressed-state semantics to Explore encounter-item selection, Pokémon battle-power selection, and Pokédex grid cards so their moss/ochre selected treatments are exposed consistently.
- Strengthened unknown-entry question marks in AbilityDex, MoveDex, Pokédex, and Inventory from 50% opacity to solid semantic-muted text; unknown artwork remains intentionally subdued.
- Normalized the remaining Carddex reward-card “NEW” and rarity chips from 9px to 10px so compact TCG metadata meets the readable label baseline.
- Enlarged Trainer deck-format controls to 40px minimum height and migrated Pokédex gender toggles from legacy teal/rose colors to semantic moss/clay states; both now expose pressed state and keep their icon controls touch-safe.
- Migrated Pokédex stat bars, Mythical/Baby badges, and Tech stance accents from legacy orange/yellow/blue/green/pink/teal/rose utilities to the Pokeori clay, ochre, moss, and danger palette.
- Migrated battle-log status-effect labels and effectiveness chips from hard-coded purple/blue/red utilities to semantic Pokeori clay, ochre, moss, danger, and muted states while preserving each effect’s distinction.
- Migrated battle stance cards and the fallback Tera-type label from legacy teal/green utilities to semantic moss, clay, and ochre states so the action menu no longer mixes palettes between selectable controls.
- Normalized Pokémon detail stat/EV/IV bars, marking controls, move-stance icons, and selected-power checks to semantic Pokeori tokens; the dark full-screen presentation layer and data-driven type icons remain intentionally unchanged.
- Migrated Expedition branch-choice chips, branch icons, and the back action from legacy teal/red accents to semantic moss/clay/night-surface tokens, keeping route decisions visually distinct and touch-safe.
- Added explicit button types and pressed-state semantics to Explore’s region and area selectors so the visible moss check badge is announced consistently for keyboard and screen-reader users.
- Migrated shared reward stars/coins and Pokémon selection shiny/marking indicators from legacy yellow/blue/green utilities to semantic ochre, moss, and danger accents.
- Migrated the remaining shared criteria requirement dot and reward-star accents from legacy yellow utilities to semantic ochre.
- Added pressed-state semantics to the Trainer profile audio toggle and contextual accessible names to each skill card’s detail action.
- Confirmed the Trainer profile audio control is an explicit non-submit button, keeping the toggle safe inside the composite profile card.
- Added busy-state semantics to Trainer friend add/remove actions and the destructive confirmation action so the visible loading state is announced while requests settle.
- Completed an explicit-button-type sweep across player-facing controls, including Explore filters, Carddex cards, and TCG battle attack/bench/card controls; no remaining `<button>` in the player UI relies on the default submit behavior.
- Corrected Explore inhabitant cards so only locked cards remain actionable requirement disclosures; discovered/captured cards are now genuinely disabled instead of focusable no-op buttons.
- Added dialog affordance semantics to Artisan recipe/group cards and Inventory item cards, matching their existing keyboard activation with the detail surfaces they open.
- Added matching dialog affordance semantics to Trainer search results, high-score rows, and friend cards so their profile-opening behavior is announced before activation.
- Added pressed and busy semantics to battle stance buttons while a stance action is pending, matching the existing moss highlight and spinner.
- Migrated Power Selector’s remaining purple/pink/sky/indigo status accents to semantic moss, clay, ochre, and night-ink tokens across Tera, evolution, weather, dimensional, and circadian powers.
- Migrated battle health status badges and floating damage/Z-power effects from legacy purple/blue/red/yellow colors to semantic Pokeori clay, danger, ochre, moss, and night-surface tokens.
- Migrated Battle Header team-health markers and waiting overlay copy from hard-coded night colors to shared night-surface, night-ink, muted, ochre, and danger tokens.
- Replaced hard-coded battle-field and HP-track backgrounds with shared night-surface, night-canvas, and night-border tokens so the core battle chrome follows the same surface system as its drawers.
- Migrated battle TrainerCard overlays and the VS animation accent from hard-coded white/yellow/night colors to shared night-ink, night-surface, and ochre tokens while preserving the cinematic contrast.
- Normalized Explore completion stars, locked region/area badges, and clay action icon foregrounds to the shared ochre, night-surface, night-border, and cream tokens for a cleaner state palette.
- Migrated Pokémon marking indicators and the remaining Circadian power heading/label accents from legacy blue/green/yellow/indigo utilities to semantic moss, ochre, and night-ink tokens.
- Corrected battle result actions so both victory and defeat return buttons use coloured semantic surfaces with forced cream foreground text; the replay action now uses the same explicit contrast guard.
- Corrected the Pokémon box Identify action to use the same cream-on-colour button contrast as the battle result actions instead of dark text on ochre.
- Added the same explicit cream foreground guard to Fishing’s dynamic action button so the nibble/ochre state cannot fall back to dark text.
- Corrected remaining solid ochre status chips in Match 3 feedback and Card Draw reveal labels to use cream foreground text, eliminating the last obvious dark-on-colour badges in those player flows.
- Normalized the shared Game Info close control to night-surface, night-border, and cream tokens so its overlay chrome no longer depends on one-off hex colours.
- Normalized the mobile Trainer avatar badge in the shared navigation from the generic primary palette to semantic moss tokens, keeping the bottom bar visually consistent with the rest of the game shell.
- Raised the shared SectionDivider label baseline from 12px to 14px so recurring tabs and instruction headings remain legible without relying on route-specific overrides.
- Improved encounter capture metadata readability by raising the Poké Ball quantity label to 12px and moving the revealed-name pill and shiny accent onto shared night/ochre tokens.
- Preserved full opacity on the selected catch-question answer during submission and correct/incorrect feedback so the result state remains visually prominent even while the answer row is disabled.
- Migrated shared Game Info category/drawer accents and the Reward Result card-loading fallback to semantic night, cream, and ochre tokens while preserving their dark presentation surfaces.
- Normalized Explore header category, title, description, time/weather chip, and separator accents to semantic ochre, cream, night-surface, and night-border tokens; the artwork gradient and text shadows remain intentionally scenic.
- Completed the remaining Expedition header chrome and encounter companion badge migration to shared night, cream, and ochre tokens, keeping close/abandon controls visually consistent with the action surface.
- Migrated the Pokémon quick-menu partner icon and loading accent from a legacy rose hex to the shared danger token, keeping the companion action aligned with the rest of the roster palette.
- Migrated the Spirit Channeling ghost-state sparkle accent from a one-off pale-green hex to the shared moss-strong token; intentional cinematic black/white and rarity-gradient treatments remain unchanged.
- Replaced the remaining Game Info image-overlay gradient hex values with the shared night-surface token, preserving the same darkening strength over artwork.
- Normalized Field Observation’s survey/drop HUD badges to night/cream/ochre tokens and made its count/answer actions explicit non-submit buttons.
- Added pressed and busy semantics to Field Observation answers, with a full-opacity moss selected state so the submitted option remains clear while the response is processing.
- Added pressed/busy semantics to Who’s That Pokémon voice and keyboard controls, keeping the active microphone state and processing lock visible to assistive technology.
- Added explicit non-submit and busy semantics to Quick Identify option cards and Cry Recognition playback/guess actions, making processing states clear and preventing accidental form submission in compact research encounters.
- Corrected the battle card-reveal fallback Continue action to use the same clay/cream contrast as the normal battle-end controls, with an explicit button type.
- Normalized opaque research-game stage surfaces from legacy night hex values to the shared night-surface tokens across Quick Identify, Cry Recognition, Who’s That Pokémon, Snap, Rhythm, Mining, Compare, Spelling, TCG inspection, Voltorb, Side Scroller, Sliding Puzzle, Rock Push, and Pachinko; translucent cinematic overlays remain unchanged.
- Tightened battle lobby, surrender, and error-recovery actions with explicit button types, busy states, and forced cream contrast on clay actions so loading and destructive flows remain clear and consistent.
- Normalized compact Voltorb, Slots, Fishing, and Pachinko utility controls onto shared night-surface/night-border tokens, replacing one-off cream/blue-grey values while preserving their dark game-stage treatment.
- Added explicit cream contrast, button types, and busy semantics to the dynamic Pachinko, Slots, and Prize Wheel action buttons so themed gradients cannot regress to dark text during play or claiming.
- Shifted the Trainer dashboard’s desktop sidebar breakpoint from `lg` to `xl`, keeping the compact section chooser active through small-desktop widths so the content pane is not squeezed beside a 16rem navigation rail.
- Kept Trainer Collection panels at two columns through `xl` and reserved the four-column layout for `2xl`, giving small-desktop cards enough width for titles, progress rails, and stat labels without clipping or awkward wraps.
- Tightened mobile game-navigation label line-height to remove the small visual gap below the bottom-nav tags while preserving the safe-area inset.
- Raised compact research HUD labels in Field Observation, Slots, and Pachinko from 10px to the shared 12px baseline and moved Pachinko’s divider/foreground to semantic night tokens for easier reading.
- Added busy semantics to the battle action surface and locked-move continuation control so animation/server locks are exposed consistently while the visual waiting overlay is active.
- Kept the primary game navigation in its compact 80px rail through small-desktop widths, moving the shell’s content offset to `xl` with the expanded 14rem sidebar so Trainer, Collection, and other pages retain usable width at the crossover.
- Added per-action busy semantics to the Pokémon quick roster menu so partner/team/box moves communicate the same in-flight state as the panel while local roster updates settle.
- Normalized Fishing, Side Scroller, and Pachinko HUD foregrounds/chips onto shared night/cream tokens, keeping dark-stage contrast consistent without changing the themed game artwork.
- Normalized reusable TCG battle command and attack buttons to shared night/moss/ochre tokens, added explicit button types, and retained 44–52px touch targets for the dense battle toolbar.
- Aligned ResponsivePanel’s wide right-rail breakpoint with the shell’s `xl` navigation breakpoint, keeping sheets touch-friendly through small-desktop widths instead of switching to a cramped 1024px side panel.
- Aligned shared SecondaryControlBar visibility and inline mode to the same `xl` breakpoint across Pokédex, MoveDex, Inventory, TCG, Artisan, and Explore, preventing page controls from switching layouts before the shell does.
- Aligned Pokémon boxes’ two-pane team panel and dense auto-fill grid to `xl`, keeping the expandable team drawer and touch-first box layout active through small-desktop widths instead of forcing a cramped 22rem side panel at 1024px.
- Kept the Trainer profile banner at its compact 144px height through small-desktop widths, reserving the taller 176px treatment for `xl` screens so more progression content remains visible without scrolling.
- Gave Inventory’s empty/search-result state a bounded dashed field-note treatment with polite status semantics, making a blank pocket feel intentional and keeping long guidance readable at small widths.
- Added polite status semantics to the Trainer High Scores empty ledger state so a valid no-results condition is announced separately from ranking-load failures.
- Applied the bounded dashed field-note empty treatment to Explore’s no-results state and the catch encounter’s unavailable-tool state, with polite announcements for both valid empty conditions.
- Added polite status semantics to Pokémon held-item/TM sections and Use Item partner/item empty states so detail drawers distinguish valid “nothing available” results from failures.
- Reworked Battle Power Selector’s no-resource messages into compact dashed night-surface empty states with polite status semantics, keeping Tera, Mega, Z, Dynamax, Victory, Weather, and move drawers visually consistent.
- Split Trainer Search’s valid “No trainers found” result from genuine search failures: empty results now use a neutral dashed field-note/status treatment, while request failures retain danger alert styling.
- Added polite status semantics to the Friends empty ledger and busy semantics to the Mystery Gift redeem action, keeping Trainer social/claim states explicit while requests are in flight.
- Added per-request busy/disabled states to Friends accept/reject controls, preventing duplicate actions and keeping the active request visibly in progress.
- Added a collection-level busy state to Trainer Collection so its syncing summary and progress panels expose the same loading state to assistive technology as the visible “Syncing” copy.
- Standardized Level Up and Artisan recipe-index empty messages with dashed field-note surfaces and polite status semantics, keeping modal and workshop no-content states intentional and readable.
- Added polite status semantics to missing Pokémon artwork, unavailable Pokedex TM authoring, and empty TCG bench states so detail and battle panels announce valid no-content conditions consistently.
- Added a visible alert state to Friends loading failures, preventing failed requests from rendering as a misleading empty friends/request ledger.
- Added a touch-safe “Try again” recovery action to the Friends load-failure state so the alert is actionable without leaving the Trainer section.
- Raised Trainer hub, league-ranking, and Mystery Gift section labels from 10px to the shared 12px baseline so their headings remain legible at compact widths.
- Raised Friends/Requests summary labels to the same 12px baseline, improving quick scanning of the social ledger on narrow screens.
- Added busy semantics to Trainer Search’s submit control so the registry action exposes its request state alongside the existing spinner.
- Battle result actions now enforce cream text (including nested icons) for Continue, Battle More, and the interrupted-battle clear action, preventing default black button text from returning on coloured end-state controls.
- Added explicit button types to the shared result return, card-reveal recovery, and ranked-queue cancel actions; battle recovery icons now inherit the same forced cream contrast as their labels.
- Added busy/disabled feedback to encounter-result “Try again” so replay requests cannot be double-submitted while the result route reloads.
- Aligned fullscreen activity and battle/encounter stage breakpoints to the expanded xl layout, keeping compact desktop widths in the touch-first stacked treatment instead of forcing cramped two-column panels beside the compact navigation rail.
- Moved the remaining desktop-only utility bars in Pokédex, MoveDex, Inventory, TCG, and Artisan to the xl breakpoint so compact desktop views do not show wide desktop chrome beside the compact rail.
- Forced nested icon contrast on the remaining filled battle actions (PVP join, surrender, and clear-state recovery) so spinners and icons stay cream with their labels.
- Added explicit types and busy semantics to the encounter item-picker actions so berry/tool selection cannot be double-submitted while the catch state updates.
- Strengthened the encounter footer actions with explicit types/busy semantics and a moss-toned enabled Run icon, avoiding muted-looking escape affordances during capture.
- Added explicit button types to Poké Ball navigation and the no-ball Leave encounter fallback, keeping capture controls safe when rendered inside surrounding forms.
- Kept Trainer Collection’s multi-panel grid in its stacked touch layout until xl, preventing two dense collection cards from competing for width beside the compact desktop rail.
- Added min-width constraints to the Trainer mobile control bar so the section chooser and ranking/deck selectors can shrink cleanly instead of forcing horizontal overflow at compact widths.
- Raised Trainer Collection card labels and progress captions from 10px to 11px, improving scanability without changing the compact card hierarchy.
- Raised the compact Trainer section selector label to the shared 11px baseline so the mobile control bar remains legible beside its icon.
- Added explicit button typing to battle stance cards, keeping the enlarged touch targets safe when rendered inside a surrounding form context.
- Raised the remaining Pokédex detail section label to 11px so compact entry metadata follows the shared readability baseline.
- Raised MoveDex owned/total counters and move metadata labels to 11px, keeping the parallel reference surfaces readable at compact widths.
- Raised Inventory quantity, sell-quantity, tag, and item-category labels to 11px while retaining compact 10px badges for dense chips.
- Raised the High Scores rank caption to 11px so the position marker remains legible in the compact ledger rows.
- Raised Trainer sidebar journal, ranking-skill, and deck-generation headings to 11px for consistent navigation hierarchy on wider screens.
- Added a shared `game-accent-button` contrast rule and applied it only to filled battle/result actions, preventing Continue and Battle More from regressing to dark text without changing outline secondary actions.
- Promoted the accent contrast rule into the shared default/destructive Button variants so filled actions stay light-on-colour by construction, while outline and ghost buttons retain their surface-appropriate text.
- Extended accent inheritance to nested spans as well as icons, preventing child text utilities from reintroducing dark labels inside filled actions.
- Raised Pokédex type badges, Height/Weight labels, and stat abbreviations to 11px so compact entry tabs and metadata remain readable.
- Added busy/disabled feedback to Battle More while a replay is starting, preventing repeated taps and making the transition state visible.
- Cleaned the battle encounter route’s optional-state guard so the touched battle surface no longer carries its pre-existing lint warning.
- Cleaned the TCG battle’s optional-state guards, removing two stale warnings from the player-facing card battle surface without changing interaction behavior.
- Added shrink-safe result-footer flex children so replay labels and loading text remain contained at narrow mobile widths.
- Added `min-w-0` to the Trainer dashboard’s active-panel grid child so long collection/search content cannot widen the page beyond the responsive shell.
