# Application audit — 7 September 2026

Reviewed version: **0.29.11**, commit **6ec19d89**. This report covers security, game integrity, UI/UX, accessibility, runtime performance, and build/deployment design. Recommendations only; application behavior has not been changed.

**Assessment**

The most urgent work is authorization and reward integrity. Several generic Payload writes and exported Server Actions bypass protections in the normal player flows. Passing mechanics tests do not establish that these alternate entry points are safe. Fix these before prioritizing cosmetic changes or micro-optimizations.

The app already has substantial good infrastructure: server-owned normalized user state, transactional economy receipts, token-safe Redis lock release, scoped data reads, SWR, versioned catalog requests, sprite caching, and cached Docker dependency/compiler layers. Extend these patterns.

**Scope and evidence limits**

Three parallel reviews covered security, game backend integrity, and player UI. The primary review covered shared data loading, tests, dependencies, caching, and build configuration. The route inventory contains 44 page/route source files across the application, including 17 game page files; the research encounter directory contains 36 files. Individual feature internals were sampled according to risk, rather than every line receiving equal scrutiny.

This is a broad source audit with local verification, not a production penetration test or complete browser accessibility certification. No live account mutations, production load tests, deployment, or new production build were performed. Existing `.next` output corroborates emitted Server Actions but is not evidence of the currently deployed commit. Visual findings are from source inspection, not measured contrast, screenshots, screen-reader sessions, or device testing. Host configuration, installed database indexes, production image size, build durations, and p95 latency remain unverified.

| Surface | Review coverage | Main follow-up |
| --- | --- | --- |
| Authentication, registration, sessions, account settings | Custom auth, Payload access, token/cookie policy, sync authentication | Close generic registration bypass; endpoint integration tests |
| Trainer, friends, rival features | Profile UI and friend actions; sampled rival flows | Transactional friendship updates; accessible interaction review |
| Explore, tasks, locations, voyages, expeditions | Requirements, task completion, expedition persistence/rewards, shared action paths | Close progress-write bypasses and daily replay |
| Pokémon box, team, inventory, shops | Collection permissions, mutation boundaries, economy infrastructure, UI entry points | Protect generic Pokémon writes; collection-size profiling |
| PVE/PVP, battle powers | Public action exports, state helpers, turn infrastructure and existing tests | Remove exposed trusted helpers; cross-user HTTP tests |
| Games and field research | Shared lifecycle/completion and representative individual games, including fishing, Match 3, Pachinko | Authoritative outcomes, completion retry, resume behavior |
| Artisan and spirit channeling | Sampled action/economy and interface paths | Include in transaction-failure and mobile smoke matrix |
| Pokédex, Abilitydex, Movedex, Carddex/decks | Catalog/data-loading design and UI patterns | Bundle/request measurement and keyboard navigation |
| PWA, shared navigation, rewards | Version reload, service worker, shell, motion and interaction patterns | Protect active runs during updates; keyboard/reduced-motion checks |
| Payload admin, developer tools, infrastructure | Collection policies, emitted actions, Docker, Next config, lint/test setup | Disable production authoring surface; enforce validation gate |

**Checks performed**

| Check | Result |
| --- | --- |
| `bun run typecheck` | Passed |
| `bun run lint` | Passed; one informational Biome configuration deprecation |
| `bun test` | 1,457 passed, 0 failed; 147 test files, 71,418 assertions; 9.89 seconds locally |
| `bun audit` | One moderate Payload advisory; application mitigation already present, detailed below |
| Existing emitted action manifest | Unsafe battle, expedition, daily-progress and developer exports present |
| Browser/production profiling | Not performed; no measured performance uplift claimed |

Priority definitions: **P0** immediate security remediation; **P1** next security/reliability work; **P2** planned usability/performance work; **P3** maintenance. Effort estimates are relative implementation scope, not delivery promises.

**Security and game integrity findings**

**S1 — P0: trusted battle helpers are remotely exposed without authenticating their caller.**

Evidence: `src/app/(frontend)/game/battles/actions.ts:47`, `:199`, `:207`; `helpers/state-management.ts`; `helpers/win-handler.ts:109`; `helpers/turn-finalization.ts`. The module is marked `'use server'`, but exports `getActiveBattleState(user)`, `handleWin(state, user, battleConfig)`, and `finalizeTurn(state, userId, user)` as forwarding helpers. They accept caller-supplied identity/state/configuration without deriving them from an authenticated session and authoritative battle record. The win helper grants rewards derived from the supplied state/configuration, and finalization persists supplied battle state. These names occur in the existing production action manifest.

Impact: a caller with an emitted action identifier can bypass the validated turn entry point, read or overwrite another user's state, or invoke reward processing with forged inputs. Existing reward idempotency does not establish authenticity when its identifiers are supplied by the caller. This is confirmed source exposure, not a live exploitation claim.

Recommendation: move internal helpers into modules marked `import 'server-only'` without a module-level `'use server'`. Expose only authenticated actions accepting small validated commands; load identity, battle state, configuration, and reward identifiers on the server. Test unauthenticated access, forged identities/configuration, stale turns, and duplicate wins through actual HTTP action boundaries. Effort: medium.

**S2 — P0: ordinary players can edit gameplay Pokémon fields through the generic API.**

Evidence: `src/collections/Pokemon.ts:18` permits owner update/delete without field-level gameplay restrictions; Payload REST/GraphQL routes are enabled. This permits changing stats, level, rarity, form, moves, ability, held items, and other protected state outside normal game actions. Ownership filtering restricts which existing document can be edited, not which submitted fields are legitimate.

Recommendation: make generic create/update/delete administrative, following `UserState`; retain validated game actions for player edits. If generic customization is necessary, explicitly allow only safe fields and protect the ownership relationship. Test both REST and GraphQL, including arbitrary field changes and document deletion. Effort: small to medium.

**S3 — P0: fabricated expedition completion can produce authored rewards.**

Evidence: `src/collections/ExpeditionRuns.ts:11` allows authenticated creation and owner update/delete. All fields, including `status`, `expeditionId`, and `steps`, are writable. `src/utilities/expeditions/actions.ts:641` finds `ready_to_claim`, then grants the expedition's configured rewards at `:658`. A player can fabricate or edit a completed run and use the legitimate claim flow.

Recommendation: make all generic run writes server-owned and ensure completion transitions are derived from authoritative progress. Test fabricated creation and status modification, alongside duplicate legitimate claims. Effort: small to medium.

**S4 — P0: expedition and daily-progress helpers trust arbitrary caller identities.**

Evidence: `src/utilities/expeditions/actions.ts:407`, `:428`, `:461`, `:862` expose Safari-ball updates, termination, state reads, and activity-result recording from a `'use server'` module without caller authentication. `src/utilities/tasks/daily-progress.ts:83` and `:165` similarly expose progress recording. These exports are present in the existing action manifest.

Recommendation: apply the same server-only/helper separation as S1; require server-generated activity evidence instead of accepting client-provided win flags or progress amounts. Derive the user from authentication at the public boundary. Effort: medium; share implementation with S1.

**S5 — P1: developer authoring actions have no action-level administrator check.**

Evidence: `src/app/dev/actions.ts:254`, `:279`, `:563`, `:644`, `:862`, `:1068` include subprocess invocation and file writes. The administrator check in `src/app/dev/layout.tsx:25` protects page rendering only. Existing emitted output includes these actions, and Docker compiles the developer route. Some operations may fail in the standalone runtime because source/tooling is absent; production arbitrary code execution has not been established.

Recommendation: authenticate and authorize inside every exposed operation, fail closed in production unless these tools are explicitly required, and preferably separate authoring tooling from the game deployment. Removing this surface also offers a build/dependency reduction opportunity. Effort: small for guards, medium for separation.

**S6 — P1: generated daily tasks can be claimed again with a new request identifier.**

Evidence: `src/utilities/tasks/actions.ts:118` loads an active daily without rejecting `completed: true`; `:178` checks only `completedTasks`; generated dailies instead record their completion in `activeDailyTasks` at `:413`. Rewards are granted at `:357`. An economy receipt prevents replay of the same request ID, but a different ID still reaches the missing business-state check.

Recommendation: reject an already-completed daily inside the transaction before consumption or reward grant; enforce one claim per user/task occurrence/day independently of request ID. Test sequential calls with different IDs and concurrent duplicate claims. Effort: small.

**S7 — P1: Pachinko rewards are selected by caller-supplied outcomes.**

Evidence: `src/app/(frontend)/game/research/games/pachinko.ts:116` resolves client bucket IDs and `:126` builds rewards from those buckets. Validation checks that the buckets and counts are legal, rather than proving the ball reached them. A local pure-function probe accepted a hand-selected jackpot. Session validity and charging the round cost do not authenticate its result.

Recommendation: issue a server-owned round/outcome and animate it on the client, or validate a deterministic replay if physical skill must determine the result. Bind outcome, cost, reward, and claim receipt to the same server-created round ID. Effort: medium.

**S8 — P1: client-reported game completion and scores need stronger reward validation.**

Evidence: shared completion accepts client success/score reports, while `src/utilities/research/endless-milestones.ts:178` deliberately leaves endless Match 3 without a gameplay score bound. Numeric validation is necessary but does not prove a score was earned. Exact exposure varies by game; this is a shared design weakness, not a claim that every game has identical validation.

Recommendation: inventory each game by reward value and validation model. Prioritize deterministic seeded boards plus move replay for reward-bearing puzzles, authoritative RNG for chance games, and session-bound checkpoints/plausibility bounds for reflex games. Bounds reduce easy abuse but are not equivalent to authoritative verification. Preserve legitimate score-based Match 3 completion. Effort: large across all games; stage by economic impact.

**S9 — P1: the beta signup gate is bypassable through Payload account creation.**

Evidence: `src/collections/Users.ts:32` allows public creation, bypassing the custom beta check in `src/app/(frontend)/auth/actions.ts:62`; the shared code is also embedded in public source. Custom registration has no application-level rate limit. Existing login lockout should be retained.

Recommendation: use one controlled registration path, disable public generic user creation, and validate server-stored, expiring invitations if restricted signup is still intended. Add signup limits independently of login lockout. Effort: small to medium.

**S10 — P1: friend acceptance can duplicate or desynchronize relationships.**

Evidence: `src/app/(frontend)/game/trainer/friend-actions.ts:148` does not require a request to remain pending before acceptance. Separate read/modify/write updates append IDs to both users; retries can duplicate IDs and concurrent requests can lose updates. Eligibility checks are not all completed before writes.

Recommendation: require pending state, check both users before mutation, use set semantics and transactional bilateral updates, and bound/rate-limit requests. Test accept-twice, accept/remove races, and Kid Mode eligibility changes. Effort: medium.

**S11 — P2: hardening and deployment verification.**

`next.config.mjs` already sets several useful security headers but no Content Security Policy. Introduce report-only CSP, exercise Payload and player flows, then enforce a compatible policy. Explicitly align custom and Payload cookie SameSite/Secure settings. Verify proxy trust and header stripping: an unconfigured client IP falls into the shared `unknown` bucket, while incorrectly trusting forwarded headers permits spoofing. These deployment settings were not inspected live. Do not cache authenticated HTML/RSC, actions, sync, or rewards at the edge.

`bun audit` reports [GHSA-jg8r-5jh2-v2xj](https://github.com/advisories/GHSA-jg8r-5jh2-v2xj) for Payload 3.88.0. The advisory lists no patched version as of this review. `src/collections/Users.ts:36` already restricts `unlock` to administrators, mitigating the reported default-access issue. Keep a regression test and monitor the advisory; do not blindly run an automatic major-version upgrade.

**S12 — P1: milestone claim and final completion can select the same reward concurrently.**

Evidence: `src/app/(frontend)/game/_shared/activity-actions.ts:2817` reads the session before a per-score claim lock, grants at `:2893`, then records the claimed milestone at `:2903`. Completion uses a different lock at `:2162`, selects unclaimed milestones at `:2471`, and grants under a different receipt at `:2516`. If both read before the claim is recorded, serialization of the economy writes does not deduplicate their different receipts. This is a source-supported race, not a reproduced concurrent integration result.

Recommendation: use a common session settlement lock and durable uniqueness on run/milestone shared by both routes; re-read state after acquiring the lock and prevent stale whole-session writes. Test concurrent milestone claim and finish. Effort: medium.

**S13 — P1: progression effects are not settled atomically with rewards and session completion.**

Evidence: `src/app/(frontend)/game/battles/helpers/win-handler.ts:80` applies progression/Pokémon effects before idempotent rewards. Shared activity completion applies activity counters at `activity-actions.ts:2371` before its final result/session cleanup at `:2727`. A failure between stages can let retry reapply earlier effects even when reward receipts prevent duplicate currency. This is failure-path analysis; no fault-injection test was run.

Recommendation: persist durable progression, reward grants, and the run-completed record in one economy transaction where supported. Reconcile Redis session state from that durable settlement and make any remaining side effects independently idempotent. Test failures after each settlement stage. Effort: medium to large.

**S14 — P2: authored task passwords gate dialogue only.**

Evidence: `src/utilities/tasks/actions.ts:57` verifies a puzzle answer but stores no proof; `completeTask` does not require verified state. Direct completion bypasses that interaction when other criteria are met. These are in-game puzzle passwords, not account credentials.

Recommendation: if the answer is intended to gate progression, bind a short-lived verification record to user/task and consume it during completion; otherwise document the dialogue as optional presentation. Effort: small.

**UI, UX, and accessibility findings**

**U1 — P1: completion failures can strand players after a finished game.** `src/app/(frontend)/game/research/encounter/match3.tsx:201` sets ending flags before awaiting completion, without a recovery path for rejected transport; the board can remain disabled without a result. Recommendation: explicit playing/submitting/confirmed/retry states, retain the final result locally until acknowledged, and retry with the same idempotency key. Refreshing must not duplicate payouts. Test a lost response after a committed reward, not just a server rejection.

**U2 — P1: release reloads can discard active client progress.** `src/components/pwa-register.tsx:18` immediately reloads on version mismatch. Match 3 initialization at `match3.tsx:513` reconstructs board/score rather than restoring the complete run. Recommendation: checkpoint resumable state and reload automatically at a safe boundary, with a clear update message and bounded deferral for active play. Preserve the required eventual reload to the new package version. Test a release during a timed run, background/resume, and an in-flight claim.

**U3 — P1: game startup failures are often silent.** Examples: `match3.tsx:506`, `run.tsx:161`, and `rhythm.tsx:233` log failures without actionable UI. Recommendation: display the reason and a retry/return action, preserve the session when retry is safe, and announce status changes accessibly. Distinguish expired sessions, insufficient resources, rate limits, and connection loss.

**U4 — P2: scratch-card controls lack a coherent keyboard path.** `src/app/(frontend)/game/inventory/_components/scratch-card-modal.tsx:189` uses mouse/touch canvas events; `:201` hides the claim button with opacity and pointer-events, leaving it potentially focusable and activatable. Recommendation: a visible keyboard-accessible Reveal action, followed by a genuinely disabled or conditionally rendered Claim button and a spoken result. Preserve server-side reward validation independently of UI visibility.

**U5 — P2: short landscape viewports can collapse the Art Academy board.** `src/app/(frontend)/game/research/encounter/art-academy.tsx:584` sizes it using `calc(100dvh - 27rem)`, which reaches zero at a 432px viewport height. Recommendation: a landscape layout with controls beside the board, a minimum usable size, and scrolling where needed. Verify 375×667, 667×375, 844×390, 768×1024, and desktop, including enlarged text.

**U6 — P2: reduced motion does not consistently reach JavaScript animation.** Global reduced-motion CSS exists, but `src/components/game/level-up-modal.tsx:76` and `src/components/CaptureAnimation.tsx:80` trigger canvas/animation effects without consulting the preference. Recommendation: a shared motion preference for Framer Motion and canvas effects; replace nonessential bursts/loops with immediate state changes while preserving meaningful battle sequencing.

**U7 — P2: accessibility checks are disabled across several relevant rule families.** `biome.json` disables keyboard-click parity, semantic/static-element interaction rules, and Hook ordering checks. Passing lint therefore gives limited assurance here. Re-enable incrementally, starting with new/changed UI; verify focus entry/return, dialog labels, icon-button names, keyboard selection, zoom, and touch targets across the surface matrix. Do not rewrite battle animation state while fixing visual access.

**U8 — P1: ranked matchmaking has incomplete transport-error recovery.** `src/app/(frontend)/game/battles/pvp/pvp-queue-modal.tsx:38` starts joining without a rejection handler; `:75` polls with an async two-second interval without overlap prevention. Leaving at `:64` can reject before the modal closes, while polling is tied to queue status rather than visibility. Recommendation: one in-flight polling loop, backoff, explicit join/cancel error states, and cleanup on close/unmount. Test slow responses, join rejection, and offline cancellation; reconcile actual server queue membership when connectivity returns.

**U9 — P3: persistent form errors and consistent breakpoints would improve navigation.** `src/app/(frontend)/auth/_components/auth-form.tsx:41` uses toast-only server errors; add persistent form/field feedback and password guidance. The navigation switches to sidebar at 768px (`src/components/game/game-navigation.tsx:65`), labels at 1280px, while the style guide calls for touch navigation below 1024px and the responsive panel defaults to 1280px. Validate tablet layouts and deliberately align the guide and components. This is a design inconsistency, not a demonstrated inaccessible rendered layout.

**Performance and build recommendations**

**P1 — P2: reduce data-loading waterfalls.** `src/utilities/game-data.ts:67` fetches Pokémon before `:101` loads user state, then `:105` separately loads story tasks, followed by conditional weather/expedition/rival work. The state loader already parallelizes its own collection reads. Parallelize independent outer reads on read-only paths and reuse task data where available; retain transaction-safe sequencing when a shared transactional request is supplied. Specify `depth: 0` and narrow DTO projections for full box browsing where relationship expansion is unnecessary. Measure query count, response bytes, and p50/p95 by route before/after. Effort: medium.

**P2 — P2: separate large-account browsing from complete mechanics snapshots.** `src/utilities/game-data.ts:85` and `src/utilities/user-state.ts:239` load complete per-user datasets. This is intentional for requirements and trusted write diffs; adding arbitrary limits could corrupt progress or make requirements wrong. Build paginated/filterable box and inventory read models plus compact aggregates for requirements. Test small, mature, and unusually large accounts. Effort: medium to large.

**P3 — P2: narrow refresh invalidation.** `src/context/UserContext.tsx:198` refreshes the current scope then globally invalidates other sync keys. This can trigger redundant revalidation for mounted subscribers and extra work on revisits. Measure actual requests, then return updated domains from mutations and invalidate only affected scopes. Preserve SWR deduplication and authentication-loss confirmation. Effort: medium.

**P4 — P2: measure mini-game chunks before changing imports.** `src/app/(frontend)/game/games/[gameType]/page.tsx:4` statically imports all game implementations into a dispatch map. Since this is a Server Component, the import list alone does not prove every implementation downloads on every visit. Inspect the actual per-route client graph; where shared chunks load unused physics/audio/game code, introduce tested split points or dedicated routes. Do not add dynamic imports indiscriminately. Effort: measurement small; fixes medium.

**P5 — P2: use an analyzer compatible with the actual build.** `next.config.mjs:49` configures `@next/bundle-analyzer`, but `package.json` builds with Turbopack. The installed analyzer explicitly says it cannot generate reports for Turbopack. Use `bunx next experimental-analyze --output` for the current toolchain; keep a Webpack comparison only if useful. Set per-route compressed-JS budgets from a measured baseline. See [Next.js package bundling](https://nextjs.org/docs/app/guides/package-bundling). Effort: small.

**P6 — P2: reduce broad standalone tracing and production authoring dependencies.** `next.config.mjs:11` recursively adds entire runtime dependency directories, including optional dependencies, to every route's tracing includes at `:58`. This favors runtime reliability but can carry unused files and inflate tracing/copy/image work. The existing local standalone output contains TypeScript tooling and Prettier alongside Payload dependencies; this is not a production image measurement. First remove production developer-tool reachability, then replace blanket globs with the smallest proven includes. Smoke Payload admin, MongoDB, email, GraphQL if retained, and Sharp in the Linux image before removing any runtime files. Effort: medium.

**P7 — P1: enforce validation outside the skipped Docker typecheck.** `Dockerfile:30` sets `NEXT_IGNORE_TYPECHECK=true`; no `.github` workflow is present in this checkout. Repository-hosted branch rules/external CI are unverified. Require typecheck, lint, tests/data validation on the exact merge candidate. Add real endpoint/session tests: `test:e2e` currently only echoes that none are configured. Skipping duplicate typechecking in the constrained N150 build is reasonable only with an enforced successful upstream check. Effort: medium.

**P8 — P2: benchmark warm builds and keep existing caches.** Docker already copies manifests before source, caches Bun downloads and `.next/cache`, and copies public assets only into the runner. Preserve these choices. However, the comment that art-only changes avoid compiler invalidation has a qualification: every release changes `package.json`, which is copied into both dependency and compiler layers. Version changes and `APP_VERSION` consumers cause real release work even for content releases. Do not skip required version bumps to improve timings. Record install, compile, trace, image assembly and restart timings separately; inspect CPU/RAM/swap while building alongside live traffic before adjusting workers. No percentage speedup is established by this audit.

**P9 — P2: make production performance observable.** Extend the existing sync `Server-Timing` beyond data loading to authentication and serialization where practical; record action latency/error/retry counts, payload sizes, DB query latency, lock contention, and host resource use without logging secrets. Verify the performance index migration actually ran, transaction support is healthy, and Dragonfly correctness keys cannot be evicted. Use the existing deployment/performance runbooks; size the pool from checkout wait and database utilization rather than guessing.

**P10 — P3: refresh stale performance guidance.** `docs/audit/performance.md` says SWR is unused and sprite service-worker caching is missing; both now exist (`UserContext.tsx`, `sw.js/route.ts`). Treat that file as historical. Avoid introducing another fetching library or WebSockets solely on its advice. This report supersedes those observations. Also migrate the Biome configuration using the installed tool's supported format in a separate maintenance change.

**P11 — P2: profile navigation prefetch and long browsing sessions.** `src/components/game/game-navigation.tsx:85` and `:179` force route prefetch alongside intent prefetch; measure authenticated RSC/database traffic before changing policy for expensive routes. The auth form also marks separate CSS-selected mobile/desktop backgrounds as priority images; check whether both are downloaded and use media-aware art direction if so. Pokémon/TCG lists accumulate rendered items: inspect DOM count, heap and scrolling after many pages before introducing virtualization. These are profiling leads, not measured regressions.

**P12 — P2: define durable receipt retention without reopening replay.** `src/collections/EconomyActionReceipts.ts:49` stores JSON results indefinitely. Measure row growth and response sizes, then archive bulky results where appropriate while preserving compact semantic claim identities. Do not simply TTL records for actions whose inputs can still be replayed. Effort: medium after measurement.

**Suggested implementation order and acceptance checks**

1. Close S1–S5 together: server-only internal helpers, authenticated public wrappers, server-owned collection writes, production developer-tool restrictions. Acceptance: ordinary/unauthenticated users cannot invoke protected behavior through REST, GraphQL, or direct Server Action requests; an emitted-action inventory contains only intended public operations.
2. Fix S6–S10, S12–S13, U1 and U8: domain-level claim uniqueness, authoritative Pachinko results, staged game-result verification, controlled signup, bilateral friendship updates, atomic settlement, and network recovery. Acceptance: duplicate/new-ID claims, forged outcomes, concurrent actions, and lost responses cannot duplicate or lose value.
3. Add browser smoke coverage for every row in the surface matrix, with normal and Kid Mode, keyboard, mobile landscape, network interruption, refresh/resume, and a PWA update during play. Address U2–U7 with that coverage.
4. Capture runtime/build baselines, then implement P1–P6 one at a time. Acceptance: demonstrable reduction in the relevant query count/bytes/latency/build stage without stale state, broken requirements, or missing standalone dependencies.
5. Ship fixes through the existing versioned release process, including `/api/app-version`, old-client refresh, health checks, and protected-main validation. No deployment is part of this audit.

Authorization recommendations follow [Next.js Server Action security guidance](https://nextjs.org/docs/app/guides/data-security) and [Payload access-control behavior](https://payloadcms.com/docs/access-control/overview): a page-level guard does not secure an independently callable action, and access rules must cover every externally exposed mutation path.
