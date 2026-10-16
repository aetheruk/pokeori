# Razz Berry Crushing score balance

Base-duration balance for release 0.51.48. Companion ability timer bonuses remain an intentional advantage. Berry costs, powder payouts, the EX unlock, speed, and scoring are unchanged.

## Why the old thresholds failed

The logical track is 300 pixels wide. A berry spawns at x=0, its center is x+32, and the target is x=255. At 300 pixels per second (5 pixels per tick), the first Perfect opportunity is 43 ticks after spawning: `ceil((255 - 32 - 8) / 5)`. A berry spawned too late cannot be hit before the timer ends.

Hits award Perfect 30, Great 20, Good 10. Missed berries and incorrect taps cost 15. The old 1–1.4-second random spawn intervals produced a variable number of scoring opportunities. In a 500-seed sample using the actual engine, perfect standard runs scored 420–510 (median 480), and perfect EX runs scored 1,410–1,530 (median 1,470). Neither sample reached the old top targets of 550 and 1,650; the old standard middle target of 470 was reachable in only 64% of those perfect runs. These are simulated opportunity counts, not measured human skill percentiles.

## Fixed opportunity count and new thresholds

Both modes now spawn one berry every 1.2 seconds (72 ticks), preserving the old average pace while removing spawn luck. The number of Perfect opportunities is `floor((durationTicks - 43) / 72)`.

| Mode | Duration | Hittable berries | Perfect maximum | Easy | Above average | Near perfect |
| --- | --- | --- | --- | --- | --- | --- |
| Standard | 20 seconds | 16 | 480 | 120 | 320 | 460 |
| EX | 60 seconds | 49 | 1,470 | 360 | 980 | 1,400 |

The tiers represent approximately 25%, 67%, and 95% of the maximum score. An all-Good run scores 160/490 and earns the bottom tier. An all-Great run scores 320/980 and earns the middle tier. Example qualifying top-tier runs are 14 Perfect plus 2 Great hits in standard (460), and 42 Perfect plus 7 Great hits in EX (1,400). A standard run with one missed berry cannot reach the top; EX can tolerate one miss only with otherwise very strong timing. An incorrect tap is also penalized, so spamming cannot replace timing.

Powder rewards remain cumulative: standard awards 20, then 30, then 50 (100 total); EX awards 100, then 150, then 250 (500 total). Crossing the bottom tier still marks a successful crushing run toward the existing 20-win EX unlock.

The unused legacy `entries/basic.ts` is not imported by the runtime registry. Only the active Cerulean entries are changed; Fuji and Misty Chronicle rhythm games retain their existing settings.

## Verification

`tests/razz-rhythm-balance.test.ts` plays the real fixed-step engine across seeds and hit-quality profiles, checks the travel cutoff and note count, verifies milestone selection, and requires a 95%-of-maximum top threshold. `tests/rhythm-timer.test.ts` also replays the full standard and EX runs through the authoritative checkpoint verifier. Browser timer/result coverage remains in `e2e/rhythm-timer.pw.ts`.
