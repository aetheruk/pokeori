# Production Performance Runbook

This is the production baseline for the single Intel N150 host running Pokeori,
MongoDB, and Dragonfly through Coolify.

## Coolify and N150

- Run one Pokeori replica. In-process Next.js state is not required for
  correctness, but a second replica on the same host adds memory pressure
  without adding host redundancy.
- Configure Pokeori as a public Git repository Application using the root Dockerfile and automatic deployment from `main`. Do not publish a
  host port; route only through Coolify's proxy.
- Coolify builds natively on the N150. Preserve BuildKit caches and run one build at a time; see the [deployment guide](/docs/development/deployment.md).
- Use `/api/health` as the health endpoint with a 30 second interval, 10 second
  timeout, 60 second start period, and 3 retries. The image includes the same
  health check.
- Size resource limits from the host's installed RAM and observed peak use. Leave headroom for the OS, Coolify, the compiler, and briefly overlapping app containers during rollout. Do not allocate all four cores or all memory to steady-state services.
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

Set `TRUST_CLOUDFLARE_PROXY=true` only when the origin firewall prevents direct
public access that could spoof `CF-Connecting-IP`. Use
`TRUST_PROXY_HEADERS=true` only for a separately trusted reverse proxy. Never
enable both merely to make an unknown client address disappear.

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

Game sync now authenticates once and reuses the same Payload instance through its data loader. Successful authenticated `/api/game/sync` responses include `Server-Timing: game-data;dur=...` and `Cache-Control: private, no-store`. The timing covers data loading, not authentication, rate limiting, JSON serialization, or network time. Use the browser Network timing panel to compare it with total response time.

For N150 profiling, record representative Explore, box, battle, and research flows on both small and large player accounts. Collect response size and p50/p95 latency, host CPU/RAM/swap during idle and deployment, and MongoDB connection checkout wait/failure counts. Check the actual container's `bun --version`, base OS, and image digest rather than inferring the running version from the Dockerfile. Scan that image's OS packages as well as running the dependency audit. Change connection-pool limits only after checking wait times and database utilization.

User-state reads use per-user filters, route scopes, and field projections. The complete snapshots also feed trusted write diffs and requirement checks; adding a limit to `findRows` can silently remove progress or corrupt updates. Separate paginated browsing reads from complete mechanics snapshots if profiling shows large accounts are slow. Do not claim those snapshots have been optimized solely by adding a row cap.

As of the 0.29.11 preparation, the public health/version URLs returned 404 and the available Coolify token returned 403 for application/deployment reads. Host metrics, live image scanning, authenticated flow timings, and PWA refresh therefore remain unverified; use a Coolify session with read access and an authenticated player session to complete these checks.

Run the release checklist before merging. Coolify builds and deploys from
protected `main` automatically. Inspect its build logs and deployed commit,
then verify the running image; see the [deployment guide](/docs/development/deployment.md).

After rollout:

1. Confirm `/api/health` returns 200 with `mongo`, `mongoTransactions`, and
   `dragonfly` all true.
2. Confirm `/api/app-version` and `/sw.js` are `no-store`.
3. Confirm a repeated catalog and sprite request becomes a Cloudflare HIT.
4. Smoke login, Trainer, Explore, Pokémon box, Inventory, Carddex search and
   card details, Pokedex, one battle, one catch, fishing, and one research game.
5. Keep an older PWA open and confirm it reloads to the new package version.
