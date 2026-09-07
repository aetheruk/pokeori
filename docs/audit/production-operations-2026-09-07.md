# Production operations verification — 7 September 2026

Read-only verification used the already signed-in Coolify session and short
metadata commands inside the existing application container. No deployment,
configuration save, player-data change, index creation or receipt compaction was
performed. Raw deployment logs are not attached: debug command lines can contain
environment secrets and must not be copied into public issues or build reports.

## Running release and deployment

- Running source: `aetheruk/pokeori`, protected `main`, commit `6ec19d89`.
- Public `/api/app-version`: **0.29.11**, HTTP 200, `no-store, max-age=0,
  must-revalidate`, Cloudflare cache status `DYNAMIC`.
- Public `/api/health`: HTTP 200, MongoDB, replica-set transactions and Dragonfly
  all healthy; `no-store, max-age=0`, Cloudflare `DYNAMIC`.
- Coolify: Dockerfile build on the deployment server, port 3000, build cache
  enabled, source commit available at runtime only, auto-deploy on push enabled,
  preview deployments disabled, Docker BuildKit secrets enabled.
- The last successful deployment took **3m 56s**. Compilation took **70s**;
  the builder RUN took **99.7s**, standalone copy **3.5s**, image export **21.4s**.
  Page-data collection took about **10.7s**, static generation **11.1s**.
  Container startup was 15:15:05 UTC; the first successful health probe finished
  at 15:15:11. Coolify waited the configured 60-second start period and completed
  the rollout at 15:16:05. This is the old release's baseline, not a measured
  improvement from the audit changes.

## Resource snapshot

The runtime reported Bun **1.4.2**, Alpine **3.22.5**, Intel N150 with four CPUs,
12,273,922,048 bytes of host memory, about 9.8 GB free, and load averages
0.31 / 0.52 / 0.50. Container memory was 466,890,752 bytes with no cgroup memory
ceiling. Swap was about 4 GiB, almost entirely free. These are one idle snapshot,
not peak memory or a build-time load profile. Coolify Sentinel metrics are disabled,
so historical CPU/RAM/swap trends are unavailable. Retain the current worker
settings until concurrent build/runtime measurements justify changing them.

## Database and receipt storage

MongoDB metadata confirmed the authored compound indexes are already installed:
Pokemon owner/box/date, owner/team/position, owner/fusion, owner/date,
owner/companion and owner/species/form; expeditions owner/status/date. No index
migration is indicated by this inspection.

| Collection | Documents | Logical bytes | Allocated storage bytes |
| --- | ---: | ---: | ---: |
| Users | 4 | 26,364 | 53,248 |
| Pokemon (`pokemons`) | 92 | 86,286 | 77,824 |
| Economy receipts | 4,739 | 12,410,250 | 2,846,720 |
| Expedition runs | 1 | 2,796 | 36,864 |

Receipt `key` has a unique index and no TTL; action, user and committed-at indexes
are present. There is no immediate storage pressure at this size. New lossless
compression is preventive; optional old-result compaction should follow a fresh
report, preserve all identities and use a compatible rollback reader. A single
snapshot cannot establish a growth rate.

Dragonfly reports **df-v1.40.2**, Redis protocol **7.4.0**, `noeviction`, zero
evicted keys, three clients, 1,131,008 bytes used, 1,817,536 peak bytes and
8,767,314,329 configured maximum bytes. Correctness keys are not subject to
memory-pressure eviction under this reported policy.

## Outstanding release settings

The existing environment has the database, Redis, Payload, Resend and stable
Server Actions encryption variables. **`BETA_INVITATION_SECRET` is absent** and
must be configured before restricted registration in 0.29.12 can work. No new
secret was generated or saved in Coolify during this inspection.

Proxy trust variables are absent. The new application therefore uses one trusted
forwarded hop by default. Coolify's generated routing uses Traefik gzip forwarding,
a cloudflared container is present, and Cloudflare fronts the public domain.
Host `ufw status` reports **inactive**; Traefik's command arguments contain no
explicit forwarded-header trusted-IP setting. This does not establish public
origin exposure because router/tunnel and other firewall rules were not inspected.
The exact ingress path, router firewall and forwarded-header stripping/chain still
need verification before changing trust settings. Do not enable Cloudflare-specific
trust merely because Cloudflare appears in response headers. The observed dynamic
health/version responses do not prove every authenticated route bypasses edge caches.

Both validation jobs are required on protected main, verified through GitHub's
API. The 0.29.12 workflow and application changes have not yet been merged or
deployed; verify the new health, version and already-open PWA after rollout.
