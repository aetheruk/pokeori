# Mini-Games

23+ mini-games available in Pokeori.

## Locations
- Mini Game routes: `/game/games/[gameType]`
- Field Research route: `/game/field-research`
- Components: `src/components/game/` (various)
- Data: `src/data/games/`
- Utilities: `src/utilities/games/`

Mini Games and Field Research are separate runtime domains. Every activity
except `field-observation` uses the `game` domain, a `game:{userId}` Redis
session, and `game` activity-stat rows. Field Observation alone uses the
`field-research` domain, a `field-research:{userId}` session, and
`field-research` activity-stat rows. A player can therefore keep one active
Mini Game and one active Field Research study at the same time.

Legacy `/game/research` and `/game/research/encounter` links resolve the
player's old active session and redirect to its canonical route. Legacy
`research:{userId}` sessions migrate lazily on first read.

Installed PWAs suppress outward horizontal touch gestures that begin at the
left or right viewport edge so browser history navigation cannot close an
active game. The guard is limited to standalone display mode and leaves taps,
vertical movement, inward swipes, and the game's own touch handlers intact.
This supplements the app shell's `overscroll-behavior: none` fallback for
WebKit, which may still permit history swipes despite that CSS property.

## Available Games
| Game | Route | Description |
|------|-------|-------------|
| Compare | `/game/games/compare` | Compare Pokemon stats |
| Cry | `/game/games/cry` | Guess Pokemon by cry |
| Identify | `/game/games/identify` | Identify Pokemon from silhouette |
| Silhouette | `/game/games/silhouette` | Similar to Identify |
| Snap | `/game/games/snap` | Pokemon photography |
| Slots | `src/data/games/slots` | Slot machine |
| Berry Picker | `src/data/games/berry-picker` | Pick berries under time limit |
| Mining | `src/data/games/mining` | Mine for items |
| Spelling | `src/data/games/spelling` | Spell Pokemon names |
| Fishing | `src/data/games/fishing` | Catch Pokemon while fishing |
| Field Observation | `/game/field-research` | Watch a timed research frame with route and global random spawns, then answer a server-generated observation question |
| TCG Battle | `src/data/games/tcg-battle` | Server-resolved card battles using saved 15-card TCG decks |
| Run | `src/data/games/run` | Endless runner |
| Rock Push | `src/data/games/rock-push` | Puzzle game |
| Prize Wheel | `src/data/games/prize-wheel` | Spin for rewards |
| Pachinko | `src/data/games/pachinko` | Physics ball drop with bucket rewards |
| Voltorb Grid | `src/data/games/voltorb-grid` | Sokoban-style cave puzzle where Voltorb are shoved into discharge positions to clear rubble and open an exit |
| Diglett Tunnel Tap | `src/data/games/diglett-tunnel-tap` | Reflex tunnel game where Diglett score and Dugtrio punish rushed taps |
| Magnemite Circuit | `src/data/games/magnemite-circuit` | Rotating circuit puzzle for powering route machinery |
| Rock Tunnel Echo Map | `src/data/games/rock-tunnel-echo-map` | Dark movement maze with one opening echo reveal and hidden hole traps |
| Art Academy | `src/data/games/art-academy` | Timed Pokemon sprite-copying study with an extracted artwork palette and server-scored canvas |
| Battle Bets | `/game/games/battle-bets` | Single-stake Fun Token wagering on AI-vs-AI Shadow battles |
| TCG Memory | `src/data/games/tcg-memory` | Memory match with TCG cards |
| Voltorb Flip | `src/data/games/voltorb-flip` | Puzzle game |
| And more... | | |

## Rewards
- Berries
- Pokedollars
- Items
- Research XP, either authored as a flat one-off reward or generated from `skillXp`
- Endless score games author one-time rewards under `settings.endless.milestones` and score-scaled rewards under `settings.endless.repeatingRewards`. Repeating rewards can set `random: true` for Run/Flap collectible spawns; these must be touched by the player and can use either a numeric interval with 25% variance or an authored `{ min, max }` score interval for explicit random cadence. Random collectible rewards show in Explore details by reward name only without point or chance labels. Non-random score rewards show the full score reward range and label each previewed reward with either the score threshold or repeating point interval.
- Paid Run and Flap entries use the shared `currency_owned` criterion with `consume: true`. The server checks and deducts the authored amount only when creating a new session; restoring an active session does not charge again.
- Run and Flap use a shared side-scroller stage shell. Their gameplay coordinates remain a fixed 600x600 layer, while the visible stage scales responsively inside a full-screen painted backdrop with authored `settings.scene` art, premium repeat-x `parallaxLayers`, and region-time tinting. Tapping outside the square playfield triggers the primary action for both games, and Run uses a horizontal outside-playfield swipe for boost. Layer `style.backgroundPosition` is treated as the vertical anchor; the client always owns the animated X offset.

## Fishing
- Every fishing cast rolls Pokemon at 80% and items at 20%.
- After a Pokemon result is rolled, Old Rod hooks have a hidden 1:512 chance to replace that Pokemon with Relicanth and Good Rod hooks have a hidden 1:512 chance to replace that Pokemon with Feebas. These secret replacements are runtime-only and do not appear in Explore fishing previews.
- Fishing item hooks grant the item immediately and return the player to the fishing screen. Pokemon hooks still start the catch encounter.
- Day/night Pokemon filters use the fishing entry's authored category timezone, matching Explore region time.
- Fishing sessions inherit the Mini Game entry's weather snapshot; Pokemon hooks pass that weather into the reused location-style catch state.
- The fishing play screen is portrait-first and scene-led. Entries can author `settings.scene` with a portrait background, optional landscape background, water style, and waterline; the client adds time-of-day tinting plus subtle water shimmer/ripple overlays.
- Generic item drops use the global Old, Good, and Super Rod pools in `src/data/games/fishing/item-pools.ts`.
- Location `items.entries` are reserved for quest or location-specific override drops.
- Explore fishing details show rod-specific Pokemon previews and only manually authored `items.entries` drops. Global fallback rod item pools stay hidden from reward previews and do not count as unclaimed location collectibles. Secret authored fishing item entries display as secret rewards until found.

## Rock Push
- Rock Push renders tile backgrounds separately from moving entities so the player and boulders slide between cells.
- Players can undo successful movement with the undo control or `Z`; invalid moves play a short bump animation and do not increment move count.
- Boulders that fall into holes leave a traversable filled-hole tile, and simple corner deadlocks are highlighted on the boulder as a warning.
- Rock Push boards are fully authored in `settings` with `grid_size`, `playerStart`, `boulders`, `holes`, and `barriers`; there is no automatic puzzle generator.
- Boards can also author `ice` coordinate tiles. A player or boulder that enters ice keeps sliding in that direction until blocked or until it reaches the first non-ice destination tile.
- Boards can author `winTiles` as an alternate success condition. Stepping on a win tile completes the puzzle successfully even if holes remain unfilled.
- Boards can author `teleporters`, including cross-screen teleports through `settings.screens`. A two-way pair is represented by two source teleporter entries targeting each other; a one-way teleporter renders only its source entry and uses the target coordinate as a hidden landing reference.
- Optional `settings.prizes` entries place item reward squares on the board. A prize is added to the final reward pool only if the player walks over that square and then completes the puzzle.
- Optional `settings.screens[*].prizes` entries work like board-level prizes and are validated with screen-scoped ids.
- Default rock-push sprites live under `public/games/rockpush`, including separate floor, ice, stalagmite barrier, boulder, hole, filled-hole, win-tile, teleporter, and trainer assets. Entries can override these through `settings.floorSprite`, `settings.iceSprite`, `settings.barrierSprite`, `settings.boulderSprite`, `settings.holeSprite`, `settings.filledHoleSprite`, `settings.winTileSprite`, `settings.teleporterSprite`, and `settings.playerSprite`.

## Snap
- Standard Snap asks the player to photograph randomly requested Pokemon from `settings.pokemonPool`.
- Target Snap is enabled with `settings.target`. The server generates one random target appearance window in `roundData.snapTargetAppearAtMs`, using `settings.successThreshold` as the visible duration. Snapping the target wins; missing that window or snapping an optional decoy from `settings.pokemonPool` immediately fails. `settings.targetMissMessage` can override the failure text.
- Snap result overlays include expedition progress on normal completions and server time-up failures, so expedition steps return through the same result screen before Explore.

## Field Observation
- Field Observation is the core Researcher route game and the third route gameplay pillar alongside Catch and Battle. The server generates a short sprite observation round from `settings.pokemonPool`, then asks one question from the full built-in question set; entries configure only the Pokemon pool, level range, observation time, answer time, and difficulty.
- Kid Mode uses one dedicated question type for every Field Observation: `Who appeared the most?`. The generated round guarantees one unambiguous most-seen Pokemon, and the player answers by tapping a Pokemon sprite tile. A restored non-Kid question is regenerated when a Kid Mode player resumes the activity; Standard Mode keeps the full question set.
- Individual Field Observation Pokemon pool entries can define `requirements`; the server filters locked Pokemon out before generating the observation round.
- Weather requirements are supported on Field Observation entries, Pokemon pool entries, authored item drops, and global Pokemon/item events using the weather snapshot resolved when the research session starts.
- Explore groups Field Observation entries with matching route catch/battle entries, exposing them as a `Study` route action with a magnifying glass icon instead of a standalone Mini Games card.
- The client splits the play surface into an upper observation/question panel and a lower note area. Most rounds use a freehand touch canvas for notes. Count Survey rounds replace the note canvas with Pokemon icon counter buttons; players tap the counters during observation, then submit the count report after the upper panel switches to the answer phase.
- Observation and answer timers support authored ranges (`{ min, max }`). Current authored studies use a 20-second observation phase and a 15-second answer phase.
- Difficulty is `1` through `10` and currently increases spawn density, shorter appearances, and the chance of shiny, size, hidden, movement, or event details that can feed questions. Field Observation shiny sightings are intentionally more common than wild encounter shinies.
- Field Observation can ask gender-detail questions, but only for Pokemon whose source species data has visible gender differences. These include female/male species prompts, female/male count prompts, and male-versus-female majority prompts.
- Each round generates a survey focus: Standard, Count Survey, Material Survey, Berry Survey, Salvage Survey, Swarm Survey, or Rare Trace. The focus changes spawn pressure, active drop weighting, and/or the note input mode without creating separate authored game entries.
- The correct answer, Count Survey expected counts, dynamic reward subjects, and active drop reward payloads stay in private Redis state. Public `roundData` contains spawn playback data, answer option ids, survey focus, visible count-button Pokemon, and visible collectible drop timing/position data only.
- Reward subjects now include every unique Pokemon form that appeared during the observation phase.
- Materials, Field Observation berry pools, broken balls, global item events, and route-authored `settings.itemDrops` are pre-rolled at round start and appear as tappable drops in the observation panel. Global item events include Escape Rope, Explorer 20 Repel, and Researcher's Journal items that grant Researching XP when used. Taps are validated server-side against the Redis session, generated drop list, and visible time window.
- Successful completions grant a 10% Research Kit drop at Researcher level 35+, one generated Researching XP reward, Pokemon Research XP, and tapped active drops. Field Observation no longer grants direct currency.
- Field Observation Researching XP uses `20 + 2 * (contentLevel - 1)` with the Researcher 1.45 modifier. Content level is the rounded average level of reward subjects, or the midpoint of `settings.levelRange` when no subjects exist. Reward subjects also average their Pokemon base-experience modifiers around baseline 160, capped to a 15% decrease or increase. Gathered items add +2.5% XP each, capped at +25%. Difficulty does not affect XP. Failed reports grant 40% Researching XP only if the player submitted a guess and use the same base-experience and gathered-item modifiers. Failed reports still award tapped active drops unless a 30% loss roll triggers the gathered-items failure message.
- Active companion abilities can modify Field Observation through the shared data-driven ability effect system. Current supported research-facing hooks cover observation/answer timer deltas, generated Researching XP multipliers, Pokemon Research XP multipliers, extra active item drops, and protection against losing gathered drops on failed reports.
- Each observed reward subject gains Pokemon Research XP: base 1 at Researcher 1, 2 at Researcher 18, 3 at Researcher 50, 4 at Researcher 70, and 5 at Researcher 100, with a 20% per-subject chance to gain +1 above the base tier.
- Successful Mini Games and Field Research studies grant the active partner Pokemon 3 Pokemon Research XP where the activity supports that reward.

## Pachinko
- Pachinko is a physics-result cost/reward game. Matter.js resolves whether each ball lands in an authored slot or misses, while server actions own currency deduction, reward granting, stats, session totals, rate limits, locks, and duplicate round protection.
- Pachinko physics always run in the authored board coordinate space; CSS scales only the rendered canvas. Arrow positions are clamped inside the physical walls, slot sensors sit behind their rails so a grazing ball cannot claim a prize, and any ball still unsettled after 30 seconds is recorded as a miss. These rules keep odds and settlement behavior stable across viewport sizes.
- Celadon Rocket Pachinko has two 15-token outer prize slots, a narrow 50-token Voltorb jackpot, and two narrow Bonus Drop slots. High Stakes uses the same geometry with 75-token outer prizes and a 250-token Electrode jackpot. A bonus hit replaces the original outcome with five simultaneous fan-spread balls for the same single-drop cost; bonus slots are temporarily removed to prevent retriggers, then every ball's result is settled atomically after all five resolve. The board has no diagonal guides or decorative bucket overlays, and a seeded 30,000-round physics simulation of the 90-unit prize slots and 32-unit special slots returned approximately 120.04% RTP.
- Each paid round carries one idempotency id. Normal rounds submit one prize-slot or miss outcome; bonus rounds submit the triggering bonus-slot id plus exactly five prize-slot or miss outcomes. The server validates the authored slots, deducts one stake, aggregates all payouts, records one win or loss, and returns one session summary.
- Boards are authored through `settings.board` with dimensions, pegs, buckets, optional obstacles, bouncer pegs, bucket labels, bucket colors, and bucket rewards. Validation requires bucket ids to be unique and pegs/buckets to fit inside the board.

## Voltorb Grid
- Voltorb Grid entries are authored through `settings.gridSize`, `playerStart`, `exit`, optional `walls`, optional `debris`, `voltorbs`, optional `protectedPokemon`, `requiredCleared`, `timeLimit`, `maxMoves`, optional `maxDischarges`, and optional Rock Push-style cave sprites.
- Players move around a tile board and shove Voltorb one tile at a time. The Discharge action fires a cross-shaped blast from the first authored Voltorb only; other Voltorb explode only when that blast chain touches them.
- Exploded Voltorb disappear after the blast resolves, so multi-Voltorb layouts can require building a chain before pressing Discharge.
- Blasts stop at walls and protected Pokemon, and clear the first debris tile in each direction. Protected Pokemon can be pushed, block pushed Voltorb, remain on the board, and fail the puzzle if caught in any blast. Standing in any blast fails the puzzle. The exit is blocked until the authored debris goal is met.

## Diglett Tunnel Tap
- Diglett Tunnel Tap entries are authored through `settings.gridSize`, `targetScore`, `timeLimit`, `spawnIntervalMs`, `visibleMs`, optional scoring values, and optional lives.
- Diglett and Dugtrio pop out of tunnel holes. Diglett increase score, while Dugtrio remove score and lives. The game succeeds when the target score is reached before time or lives run out.

## Magnemite Circuit
- Magnemite Circuit entries are authored through `settings.gridSize`, `source`, `targets`, `tiles`, optional `timeLimit`, and optional `maxRotations`.
- Tiles are `straight`, `corner`, `tee`, or `cross`, with authored starting rotations and optional locks. The player rotates open tiles until all targets connect to the source.
- `magnemite-circuit-test` is a no-requirement Test sub-region entry for Power Plant or route equipment puzzle tuning, currently using a 6x6 three-target circuit.

## Rock Tunnel Echo Map
- Rock Tunnel Echo Map entries are authored through `settings.gridSize`, `playerStart`, `exit`, `walls`, optional `holes`, optional `timeLimit`, optional `maxMoves`, opening echo reveal timing, and optional Rock Push-style cave sprites.
- The maze reveals once at the start, then goes dark except for the tile under the player. Hole tiles are shown during the opening echo and instantly fail the run when stepped on.

## Art Academy
- Art Academy entries require `settings.formId`, `timeLimit`, and a 50–100 `successThreshold`; `paletteSize` is optional and defaults to 12 representative opaque HOME-sprite colours.
- The reference plate and freehand drawing board share a visual 3×3 guide overlay. The guides help with proportion but do not limit the player to cells.
- At session start, the server normalizes the normal bundled HOME sprite to a fixed 64×64 transparent raster, builds the round palette, and keeps the indexed reference private in Redis. The client submits an indexed 64×64 version of its canvas, and the server scores exact palette matches only at reference-sprite pixels; paint outside the sprite is ignored.
- `art-academy-test` is a no-requirement Kanto Test entry using Pikachu, a three-minute timer, an 8-colour palette, and a 50% passing threshold. The player sees a live similarity preview until the final 30 seconds, when it is hidden, and can submit at any time.

## Prize Wheel
- Prize Wheel entries can require an authored currency cost before a spin starts. Current Chansey wheels spend League Tickets, are available anytime, do not use daily completion gates, and show their ticket cost plus prize pool odds in Explore modals.
- Celadon's standard Rocket Prize Wheel costs 25 Fun Tokens and gives no prize at 66.49%, 25 Fun Tokens at 18%, 100 at 10%, 200 at 5%, one Rocket Scratch Card at 0.5%, and a 50,000-token Ultra Jackpot at 0.01% (1 in 10,000). Its 125-token High Stakes counterpart keeps the same odds while multiplying every prize by five: 125/500/1,000 tokens, five cards, or a 250,000-token Ultra Jackpot. Valuing cards at their authored 100-token shop price gives both wheels exactly 120% long-run RTP; ordinary token outcomes return 98%. The prize modal preserves enough decimal precision to show ultra-rare odds rather than rounding them to zero. The leave action remains server-backed and idempotent.

## Celadon Game Corner balance

- Standard Rocket Slots cost 5 Fun Tokens and retain a 40% total win rate. Their common 5/15/50-token lines return 95.8%; the 100-token Porygon line and 1-in-1,000 1,100-token jackpot bring full RTP to 119.8%. High Stakes costs and every payout are exactly five times larger, including its 5,500-token jackpot, so it has the same odds and RTP. Every payline supplies a human-readable token reward label for both the prize table and win toast.
- Celadon Slots, Prize Wheel, Pachinko, and Match 3 entries use game-specific Pokemon icons in Explore, with evolved variants distinguishing their High Stakes versions. Match 3 reward rules are unchanged by the chance-game balance pass.
- A 100-token Rocket Scratch Card always pays something: 25% awards three Rocket Balls, 60% awards 50 Fun Tokens, 5% awards 250, 3% awards 500, 1% awards 1,000, 3% awards a Nugget, and three separate 1% outcomes unlock the Gambler icon, Gambler title, or Game Corner background.

## Battle Bets

- Battle Bets is a custom High Stakes Room mini-game session under `battle-bets:{userId}` rather than the generic `game:{userId}` completion runtime. Its unlock task and matchup initialization are free. The Redis session exists only to recover the current inspection, wager battle, or terminal result; completed games never carry a pot or matchup forward.
- Each side is an independently generated Rocket Grunt F/M team of three Shadow Pokemon. Team selection follows the VS Seeker pool and scaling rules, including seen non-Legendary/non-Mythical forms, badge-scaled levels, Advanced AI, held-berry chance, and an independent trainer healing-item chance.
- Match odds come from 200 server-side headless battles using the normal battle turn engine. Match generation makes up to 20 attempts to find a matchup whose win probability falls between 25% and 75%, retaining the closest attempt if none enters that band. Decimal odds are `(1 - 0.05) / selectedProbability`; they display to two decimals, while payouts use full precision and `floor(stake × decimalOdds)`.
- Selecting a side opens a whole-token stake dialog with a minimum of 1 and a maximum of the fresh server-verified Fun Token balance. Placing the wager deducts the stake exactly once and orients the backed team as the battle's player side. The server then chooses both Advanced AI actions and resolves one shared-engine turn per request; the client waits for `useBattleManager` to finish the normal animation queue before requesting the next turn.
- A player-side win credits the gross payout, including the returned stake, and exposes it through the standard Fun Token reward summary. A player-side loss credits zero. Both outcomes use the shared result screen with Return to Explore and Play Again; replay creates a new matchup without carrying state. Wager, turn, settlement, and result-clear transitions use rate limits, per-user locks, session IDs, and idempotent result keys.
- Headless wager battles keep normal battle persistence disabled, so they do not grant Pokemon XP, battle rewards, KO credit, friendship changes, or held-item inventory changes. Terminal settlement separately records exactly one `gameResults` win or loss for normal mini-game statistics and daily progress.
