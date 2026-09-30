# Production Performance Runbook

This is the production baseline for the Hetzner CX23 `pokeori-server` (2 vCPU,
4 GiB RAM) running Coolify, MongoDB, and Dragonfly. The Pokeori app remains
stopped while the previous production data-recovery versus fresh-start decision
is unresolved. See the [deployment guide](/docs/development/deployment.md) for
the current migration state.

## Coolify and Hetzner

- Run one Pokeori replica. In-process Next.js state is not required for
  correctness, but a second replica on the same host adds memory pressure
  without adding host redundancy.
- Configure Pokeori as a Docker Image application for private
  `ghcr.io/aetheruk/pokeori-production:latest`. Keep GHCR pull credentials on the Coolify
  deployment server. Do not publish a host port; route only through Coolify's
  proxy.
- GitHub Actions builds and publishes the image, then calls Coolify's
  authenticated deploy webhook. The CX23 runs Coolify, MongoDB, Dragonfly, and
  Pokeori; it does not compile the application. See the
  [deployment guide](/docs/development/deployment.md).
- Use `/api/health` as the health endpoint with a 30 second interval, 10 second
  timeout, 60 second start period, and 3 retries. The image includes the same
  health check.
- Size resource limits from the host's installed RAM and observed peak use. Leave headroom for the OS, Coolify, and briefly overlapping app containers during rollout. GitHub's build runner handles compiler RAM, so a Coolify app memory cap does not limit image compilation. Do not allocate all four cores or all memory to steady-state services.
- Keep Dragonfly eviction disabled because battle, encounter, action-lock, and
  idempotency keys are correctness state. Alert before it approaches its memory
  limit.
- Keep MongoDB and Dragonfly on the private Docker network. Only Pokeori and
  the Coolify proxy should be publicly reachable.

Resize when any limit is sustained for 15 minutes: host memory above 85% or
swap use, MongoDB cache eviction/latency growth, Pokeori RSS above 2.5 GiB,
Dragonfly above 75% of its limit, or `/api/health` failures. First inspect a
runaway query or key family; if traffic is legitimate and the working set no
longer fits, resize the server before raising all container limits.

## MongoDB rollout

Production uses the private Coolify `pokeori-mongodb` resource (`mongo:7`) with
authorization and a single-member `rs0` replica set. Its member is `PRIMARY`,
so Payload transactions are supported, but this is not a failover topology.
MongoDB has persistent `/data/configdb` and `/data/db` volumes, a one-CPU limit,
512 MiB memory reservation, and 1 GiB memory limit. The Pokeori production
`DATABASE_URI` is runtime-only and targets the private resource alias with
`replicaSet=rs0&authSource=admin`; Preview has no database URI. Rotate the
generated credential exposed during setup, then replace the production URI
before starting the app. The database has not been restored from the former
production host.

The enabled database backup schedule runs daily at 02:00 UTC. It has a
3,600-second timeout, alerts after two missed days, and keeps seven local
archives / 14 days under `/data/coolify/backups`. The first manual dump
completed successfully against the new database, but the dump is not evidence
of restored historical player data. The private Cloudflare R2 bucket
`pokeori-backups` exists in Western Europe, but Coolify has no validated S3
destination yet. The token created during setup was exposed in a browser
response; revoke it and create a replacement scoped to Object Read & Write on
this bucket only. Verify a database execution shows S3 availability before
relying on an off-host copy.

Coolify's own instance database backup is enabled daily at 00:00 UTC, with a
3,600-second timeout, a two-day missed-backup alert, and local retention of
seven copies / 14 days. It has no verified execution or S3 copy yet. This
backup protects Coolify's projects, resources, settings, and deployment
history; it does not include workload volumes or application databases. Store
the Coolify instance `APP_KEY` separately and securely: the key is required to
decrypt saved credentials during restore, and is not in the database dump.

Production disables Payload's automatic index creation. Back up MongoDB, then
run the index migration from a release container or a machine with production
network access:

```bash
bun run migrate:performance-indexes -- --phase=prepare --dry-run
bun run migrate:performance-indexes -- --phase=prepare
bun run migrate:performance-indexes -- --phase=finalize --dry-run
bun run migrate:performance-indexes -- --phase=finalize
```

`prepare` reconciles duplicate normalized rows, backfills owned Pokémon rarity
ledgers, and creates query indexes. `finalize` repeats the duplicate audit and
adds the compound unique indexes. Run `finalize` only after the deployed
application is healthy on the prepared schema. The migration keeps maximum
quantities/counters, unions rarity ledgers, and preserves earliest/latest
timestamps as appropriate. It also clamps historical negative economy balances
to zero and reconciles durable economy receipt duplicates. The migration exits
without writing unless MongoDB advertises replica-set and logical-session
support.

MongoDB must run as a replica set, including single-node production installs.
Economy actions deliberately fail closed when transactions are unavailable.
`/api/health` reports `mongoTransactions: true` only when both the topology and
Payload adapter support transactions; a false value makes the application
unhealthy.

The runtime MongoDB pool is capped at 20 connections with a minimum of 2,
60-second idle retirement, 5-second connect/server-selection timeouts, and a
30-second socket timeout.

## Dragonfly

Use one private `REDIS_URL`. The client uses automatic pipelining, TCP
keepalive/no-delay, a 3-second command/connect timeout, and at most two retries
per request. HTTP and gameplay rate counters use atomic increment-and-expire
scripts. `/api/game/sync` is limited in Dragonfly to 30 requests/minute per
authenticated user and 120/minute per client IP.

Dragonfly persistence and backups are not enabled on the current host. Its
keys include gameplay coordination and idempotency state; configure a separate
persistence/backup strategy before treating Redis as recoverable after host
loss.

Set `TRUST_CLOUDFLARE_PROXY=true` only when the origin firewall prevents direct
public access that could spoof `CF-Connecting-IP`. Use
`TRUST_PROXY_HEADERS=true` only for a separately trusted reverse proxy. Never
enable both merely to make an unknown client address disappear.

Forwarded addresses are now selected from the right of `X-Forwarded-For`, using
`TRUSTED_PROXY_HOPS` (default 1, allowed 1–10). Set it to the verified number of
trusted proxies that append addresses on every request path. A different path
must not bypass one of those proxies. Malformed/short chains return `unknown`;
the app does not trust a caller-prepended first entry or fall back to `X-Real-IP`.
Verify the actual Coolify/Cloudflare chain and origin firewall before enabling
trust. A setting in this repository is not evidence of the live proxy policy.

Enable `GAME_PERFORMANCE_LOGS=true` for bounded observation windows. Sync emits
request IDs, scope, timing and serialized response bytes without player data.
Use Server-Timing to separate authentication, scoped reads and serialization;
compare representative large accounts on identical routes and cache states.
Receipt growth can be measured with `bun scripts/compact-economy-receipts.ts`;
see [economy integrity](../features/economy-integrity.md) before compacting.

## Cloudflare Free

Keep the DNS record proxied. Use the default cache key; it includes the full
query string, which is required for catalog cursors, filters, and image
variants. Do not select “Ignore query string”.

Create cache rules in this order:

1. Bypass cache for `/sw.js`, `/api/app-version`, `/api/health`,
   `/api/game/sync`, and every authenticated/gameplay API not explicitly
   listed below.
2. Mark GET/HEAD requests beginning `/api/game/catalog/` eligible for cache.
   Respect the origin browser TTL and origin edge cache control. The origin
   emits browser TTL 1 hour and shared edge TTL 30 days.
3. Mark GET/HEAD `/api/pokemon-sprite`, `/api/pokemon-sprite/*`, and
   `/_next/image` eligible for cache while respecting origin headers.
4. Leave `/_next/static/*` and fingerprinted static assets on normal
   Cloudflare caching. They already carry immutable origin headers. Set the
   zone Browser Cache TTL to “Respect Existing Headers”.

Do not enable a site-wide “Cache Everything” rule. HTML, RSC, authentication,
sync, Server Actions, battles, encounters, and rewards are dynamic.

Cloudflare Free has one rate-limiting rule. Apply it to path
`/api/game/sync`, per IP, 30 requests per 10 seconds, with a 10-second managed
challenge or block period. Dragonfly remains the authoritative finer-grained
user/IP limiter.

Enable HTTP/3, Early Hints, Tiered Cache, and the default compression support.
Keep Rocket Loader off for this Next.js application. Keep 0-RTT off: the small
returning-client latency win is not worth introducing replayable early
requests around a stateful game.

When a stable-path asset or catalog payload changes without a URL/version
change, purge the exact URL or prefix. Never purge everything during ordinary
releases. Verify a second request with `curl -I` shows the intended
`Cache-Control`, `Age`, and `CF-Cache-Status`.

## Release and smoke checks

Game sync authenticates once and reuses the same Payload instance through its data loader. Successful authenticated `/api/game/sync` responses include `Server-Timing` entries for `game-data`, `auth`, `serialize`, and `total`, plus `Cache-Control: private, no-store`. `game-data` measures only scoped data loading; `total` measures server work up to response construction, including rate limiting, but excludes response transmission and browser rendering. Opt-in logs also include serialized response bytes. Compare these with browser Network timings; do not label either one as end-to-end interaction latency.

For production profiling, record representative Explore, box, battle, and research flows on both small and large player accounts. Collect response size and p50/p95 latency, host CPU/RAM/swap during idle and deployment, and MongoDB connection checkout wait/failure counts. Check the actual container's `bun --version`, base OS, and image digest rather than inferring the running version from the Dockerfile. Scan that image's OS packages as well as running the dependency audit. Change connection-pool limits only after checking wait times and database utilization.

User-state reads use per-user filters, route scopes, and field projections. The complete snapshots also feed trusted write diffs and requirement checks; adding a limit to `findRows` can silently remove progress or corrupt updates. Separate paginated browsing reads from complete mechanics snapshots if profiling shows large accounts are slow. Do not claim those snapshots have been optimized solely by adding a row cap.

As of the 0.29.11 preparation, the public health/version URLs returned 404 and the available Coolify token returned 403 for application/deployment reads. Host metrics, live image scanning, authenticated flow timings, and PWA refresh therefore remain unverified; use a Coolify session with read access and an authenticated player session to complete these checks.

Run the release checklist before merging. A push to protected `main` runs the
GitHub Actions image release and triggers Coolify after the image is published.
Inspect the Actions build/publish logs and Coolify's image-pull deployment log,
then verify the running image; see the
[deployment guide](/docs/development/deployment.md).

After rollout:

1. Confirm `/api/health` returns 200 with `mongo`, `mongoTransactions`, and
   `dragonfly` all true.
2. Confirm `/api/app-version` and `/sw.js` are `no-store`.
3. Confirm a repeated catalog and sprite request becomes a Cloudflare HIT.
4. Smoke login, Trainer, Explore, Pokémon box, Inventory, Carddex search and
   card details, Pokedex, one battle, one catch, fishing, and one research game.
5. Keep an older PWA open and confirm it reloads to the new package version.

## Reproducible acceptance captures

Use the same revision, fixture account, viewport, runtime, and cache state when comparing changes. Keep cold navigation, warm navigation, and action-triggered refreshes separate. Record request counts and compressed transfer bytes independently from decoded JSON/JavaScript body bytes. Preserve raw sanitized measurements with the commit and scenario; a two-request sample is not a p95.

- **Scoped refresh:** open Explore, box, and inventory in a fixed sequence, perform one item-only reward and one Pokémon/progression reward, then revisit each route. Count `/api/game/sync` by scope, Server Actions, and RSC navigation/prefetch requests. Confirm affected values change and unrelated scopes do not refetch. Include a dropped-response retry to separate intended replay traffic from redundant invalidation.
- **Long lists:** use populated box, inventory, and Carddex fixtures; browse enough pages to reproduce accumulation, then revisit filters and scroll back. Record rendered row/DOM count, heap where the browser exposes it, long tasks, and scroll responsiveness at defined page counts. The initial production smoke's empty lists do not cover this scenario.
- **Builds:** retain normal BuildKit/Bun/Next caches. Record install, compile, trace/copy, image assembly, and health-ready/restart durations separately for repeated builds on the same revision, including peak CPU, RSS, swap and background traffic. Never prune correctness/service caches or skip the required version bump to improve a benchmark. Treat changed-source diagnostic timings separately from controlled cache comparisons.
- **Receipts and contention:** sample receipt row counts, encoded response sizes and age distributions; measure retries, failed transactions and lock waits/busy responses by action category without user IDs, lock keys, arguments or reward results. Use distribution/rate trends rather than isolated slow requests.

`GAME_PERFORMANCE_LOGS=true` also emits JSON `game-action` events with bounded `operation` (`economy`, `lock-acquire`, `lock-release`), `outcome`, `durationMs`, `attempts`, `retries`, and `rollbackErrors`. Count busy acquisition outcomes for contention; these locks fail immediately instead of waiting. Economy duration includes receipt reads, transaction attempts and release; replay events distinguish retry traffic from new writes. Aggregate duration distributions and outcome/retry rates at the log collector. Events deliberately omit action names, account IDs, lock keys, request IDs, arguments, results and exception details. A failed telemetry sink does not change action results. Logs are disabled by default.

Local evidence and its limits are recorded in [performance audit status](../audit/performance.md). Required checks on protected main were verified through the remote API. Post-migration live measurements, deployed index state, and the Cloudflare-to-origin firewall path remain deployment-environment verification rather than conclusions from local fixtures.
