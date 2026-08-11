# Production Performance Runbook

This is the production baseline for the single Hetzner CX33 running Pokeori,
MongoDB, and Dragonfly through Coolify.

## Coolify and CX33

- Run one Pokeori replica. In-process Next.js state is not required for
  correctness, but a second replica on the same host adds memory pressure
  without adding host redundancy.
- Configure Pokeori as an Application from the GHCR image. Do not publish a
  host port; route only through Coolify's proxy.
- Build the `linux/amd64` image on the release machine and push it to GHCR;
  Coolify should pull the verified image rather than compile on the CX33.
- Use `/api/health` as the health endpoint with a 30 second interval, 3 second
  timeout, 20 second start period, and 3 retries. The image includes the same
  health check.
- Starting resource envelope: Pokeori 2 vCPU / 3 GiB, MongoDB 1.5 vCPU / 3 GiB,
  Dragonfly 0.5 vCPU / 512 MiB. Leave at least 1.5 GiB for the OS, Docker, and
  Coolify. Treat these as ceilings, then tune from observed 95th-percentile use.
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

`bun run deploy:production` validates the repository, builds a local
`linux/amd64` candidate, rejects an image over 350 MiB, starts that exact
candidate, verifies `/api/app-version`, pushes immutable tags, and only then
calls Coolify.

After rollout:

1. Confirm `/api/health` returns 200 with `mongo`, `mongoTransactions`, and
   `dragonfly` all true.
2. Confirm `/api/app-version` and `/sw.js` are `no-store`.
3. Confirm a repeated catalog and sprite request becomes a Cloudflare HIT.
4. Smoke login, Trainer, Explore, Pokémon box, Inventory, Carddex search and
   card details, Pokedex, one battle, one catch, fishing, and one research game.
5. Keep an older PWA open and confirm it reloads to the new package version.
