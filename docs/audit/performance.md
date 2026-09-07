# Performance audit status

The earlier checklist in this file is superseded by the [September 2026 application audit](application-audit-2026-09-07.md) and its [remediation ledger](remediation-progress.md).

SWR is active in UserContext, scoped route snapshots and projections are implemented, and the service worker caches versioned sprites. Pokémon box browsing and Carddex already page their reads; complete mechanics snapshots intentionally remain untruncated. Do not replace SWR, add WebSockets, or cap mechanics rows solely on the older checklist's assumptions.

Current remediation includes parallel independent snapshot reads with sequential transaction reads, reused story tasks, safe Pokémon relation projection, explicit mutation-domain invalidation, and extended sync timing. `bun run analyze` uses the Turbopack analyzer corresponding to the actual build. Auth art uses a media-selected picture instead of two priority downloads. Docker dependency/compiler caches remain intact.

Use the [production performance runbook](../development/performance-runbook.md) for runtime measurement. Source changes and micro-tests are not evidence of a production p95 improvement; record route bytes/query counts and build stage timings before claiming gains.

## Recorded measurements

| Measurement | Earlier sample | Later sample | Interpretation |
| --- | --- | --- | --- |
| Explore HTTP sync, 1,002 owned Pokémon | 350 / 372 ms | 71 / 73 ms | Two warm requests per revision against disposable local Mongo/Redis using a development server; not a production p95. |
| Explore data-loading portion, same account | 316.0 / 350.1 ms | 34.5 / 44.7 ms | The complete owned read model avoids Payload document processing when safe; canonical DTO parity is asserted for all 1,002 rows. |
| Explore serialized response, same account | 475,490 bytes | 475,486 bytes | Effectively unchanged. This optimization preserves complete requirements data rather than reducing the snapshot. |
| Mongo Pokémon query, same account | 4 ms; 1,002 keys/documents examined | 2 ms; 1,002 keys/documents examined | Existing owner index already bounds the query to the account; these samples do not justify another index. |
| Run initial observed JavaScript bodies | 4,544,014 bytes / 42 scripts | 2,656,088 bytes / 29 scripts | 41.55% fewer decoded body bytes after the client game-registry split in an isolated Linux production container. These are not compressed transfer bytes or a measured latency reduction. |

Sources: [query baseline](large-account-query-baseline.json), [query/read-model result](large-account-query-after.json), [production browser baseline](production-browser-baseline.json), and [production browser result](production-browser-final.json). Small-account Explore samples overlap (32–33 ms before, 29–42 ms after), so a small-account speedup is not established. The native Explore path is read-only, bypassed inside transactions, and falls back to Payload for read hooks or missing selected defaults. Projection tests cover origins, legacy rarity flags, team/companion selection, female sprites, and markings.

The initial production browser sample used fresh 1280px Chromium contexts and an observation window ending 800 ms after hydration. Pokemon/inventory fixtures were empty, and Run was observed during its countdown. Separate final interaction tests then loaded 160 Pokemon: deferring closed inspector calculations removed all eight measured 412–562ms scrolling long tasks, with 1,562 DOM nodes retained. Keyboard focus return also passes. Navigation makes no automatic expensive-route prefetch, one Pokemon intent prefetch and zero sync requests on the measured route revisit. See [browser verification](production-browser-verification.md) for scope and fixture details.

Local Linux image observations were 225,721,879 bytes for the earlier 0.29.12 diagnostic image and 220,143,248 bytes for the later image. Uncompressed module directories decreased from 274,004 to 253,576 KiB, and Next output from 215,340 to 203,624 KiB. These compare evolving source/build configuration, not a controlled one-variable experiment. A later Next compilation took 27.3 seconds; analyzer durations were 2.5 minutes and 115 seconds. These must not be reported as established warm-build speedups. Broad Payload tracing remains until narrower includes have complete Linux runtime coverage.

The parsed local Docker stage observations below use different source/cache states and are diagnostic, not a controlled cold/warm comparison. The earlier 90.6-second figure is the complete builder RUN, not solely Next compilation.

| Stage | Earlier diagnostic | Slim diagnostic | Final diagnostic |
| --- | ---: | ---: | ---: |
| Dependency install | 25.3 s | Cached | Cached |
| Builder RUN | 90.6 s | 60.7 s | 57.7 s |
| Standalone copy | 4.6 s | 4.6 s | 3.0 s |

## Remaining acceptance evidence

| Finding | Implemented evidence | Evidence still needed |
| --- | --- | --- |
| P1–P2 | Parallel independent reads, transaction-safe sequencing, full Explore read model, 1,002-row DTO parity, paginated box browsing | Representative mature accounts with many inventory/progress/card rows; route query counts and production p50/p95. Never cap mechanics snapshots to obtain a smaller benchmark. |
| P3 | Real UserProvider browser test confirms affected-scope refresh and updated cached wallets without unrelated requests; production route revisit makes zero sync requests | Extend measurement across other mutation families as they change. Controlled sync fixtures do not themselves execute reward transactions. |
| P4–P5 | Compatible Turbopack analysis; observed Run split; item presentation index parity; five reproducible gzip budgets pass in production smoke | Budgets are enforced by the opt-in production smoke, not the default development-browser CI job; asynchronous graph totals remain a different measure. |
| P6 | Linux runtime/browser smoke; reduced authoring/tooling reachability | Any further tracing reduction requires Payload admin, Mongo, email, GraphQL, and Sharp smoke in the actual image. |
| P7 | Pinned validation/integration workflows and local real endpoint tests; both branch checks required remotely with up-to-date enforcement | Successful hosted checks on the exact release merge candidate. |
| P8 | Dependency/compiler caches preserved; diagnostic images measured | Controlled repeat builds with install/compile/trace/image/start timings and peak CPU/RAM/swap on the same revision and host. |
| P9 | Sync authentication/data/serialization/total timing, response bytes, existing battle timing; opt-in economy duration/attempt/retry/replay/error and lock events; live compound indexes, noeviction and idle N150 snapshot verified | Production aggregation, pool checkout timing and build-time resource peaks. Lock durations measure Redis acquisition/release calls; no blocking wait queue exists. |
| P10 | Historical claims corrected; current evidence linked | Keep the remediation ledger synchronized with final checks rather than retaining intermediate counts. |
| P11 | Intent prefetch and one-image auth tests; measured authenticated navigation counts and 160-card scroll/DOM/CPU profiling; lazy inspector eliminates measured long tasks | Repeat on low-end mobile devices and substantially longer sessions before considering virtualization. |
| P12 | Lossless compressed receipts, semantic aliases, replay tests, report/compaction script; live 4,739 receipts / 12.4MB logical / 2.85MB allocated, unique key and no TTL | Repeat volume/size measurement to establish growth trend. Preserve permanent replay identities when compacting. |

[Read-only production operations evidence](production-operations-2026-09-07.md)
records the old release's 3m56s deployment, 70s compilation, live indexes and
resource snapshot. It does not establish a before/after production improvement.
