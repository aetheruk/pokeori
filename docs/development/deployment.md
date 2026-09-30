# Coolify deployment

The production target is the Hetzner `pokeori-server` (CX23, 2 vCPU, 4 GiB RAM). Once GitHub auto-deployment is connected to the Pokeori app in Coolify, merging a validated release PR to protected `main` will make Coolify build the checked-in Dockerfile and start the new container. No local production build or registry publish is required. Keep one build active at a time and monitor host memory during the first cold build.

## Hetzner migration status (2026-09-30)

The N150 is retired. The Hetzner `pokeori-server` is the current production
target. No Hetzner server snapshot schedule is configured. The MongoDB resource
described below is a new database; the previous production data has not been
restored. Keep the Pokeori app stopped until the data-recovery versus fresh
start decision is resolved.

The available environment also had no usable `RESEND_API_KEY` and no
`BETA_INVITATION_SECRET`. Configure a valid mail key and a new stable invitation
signing secret before enabling registration and transactional email.

Coolify is installed on `pokeori-server` and reachable at
`https://coolify.pokeori.app`. Its `Pokeori` production project now contains a
private `pokeori-dragonfly` database on the same destination network, with a
generated password, persistent `/data` volume, and 768 MiB memory limit. The
Dragonfly container is healthy. Dragonfly snapshot persistence is not enabled;
its gameplay coordination state currently has no backup. The app is stopped.

The private `pokeori-mongodb` resource runs `mongo:7` with authorization and a
keyfile-enabled, single-member `rs0` replica set. The member is `PRIMARY`, which
provides the transaction support Payload requires; a single member does not
provide node or host failover. MongoDB listens only on the private Coolify
network, uses persistent `/data/configdb` and `/data/db` volumes, and has a
one-CPU limit, a 512 MiB memory reservation, and a 1 GiB memory limit. The
keyfile is managed on the host at `/data/coolify/mongodb/pokeori/replica.key`
with mode `0400` and mounted read-only by file permissions into the container.

The production app's `DATABASE_URI` is configured as a runtime-only literal
environment value and Preview has no database URI. It connects to the internal
MongoDB alias with `replicaSet=rs0` and `authSource=admin`. The generated MongoDB
credential was exposed in a setup response; rotate it and update the production
`DATABASE_URI` before starting the app. Never put connection strings or keys in
the repository.

MongoDB has an enabled daily backup at 02:00 UTC, a 3,600-second timeout, a
two-day missed-backup alert, and local retention of seven copies / 14 days. The
first manual dump completed successfully on the new, unrestored database. It
proves the dump path works but does not prove that historical player data is
present. Local backups remain on the database host until the R2 destination is
configured and verified.

The private Cloudflare R2 bucket `pokeori-backups` has been created in the
automatically selected Western Europe location. Coolify does not yet have a
validated S3 destination, so no backup has reached R2. A bucket-scoped token was
issued during setup but appeared in a browser response; revoke it before use.
Create a replacement with Object Read & Write limited to this bucket, then
store its S3 credentials in Coolify. Confirm both MongoDB and Coolify backup
executions show S3 availability before relying on off-host copies.

The Coolify instance database backup schedule is enabled daily at 00:00 UTC
with a 3,600-second timeout, a two-day missed-backup alert, and local retention
of seven copies / 14 days. No instance backup execution has been verified yet.
An instance backup contains Coolify's configuration database, not application
volumes or MongoDB. Save the Coolify `APP_KEY` from
`/data/coolify/source/.env` separately in a secure location; without the same
key, credentials encrypted in an instance backup cannot be restored.

The production `pokeori-app` resource reads the public `aetheruk/pokeori` Git
repository on `main`, uses `/Dockerfile`, exposes port `3000`, and has
`https://pokeori.app` and `https://www.pokeori.app` configured in Coolify.
Docker BuildKit secret handling and the app's deploy-on-push setting are
selected, but no GitHub push webhook or GitHub App source is connected yet.
The production app environment contains `NEXT_PUBLIC_APP_URL`, the private
internal `REDIS_URL` for Dragonfly, and the runtime-only `DATABASE_URI`. It is
not deployed. Configure the stable Server Actions key and Payload secret in
Coolify, rotate the MongoDB credential as described above, and supply a valid
mail key and stable invitation secret before starting the public app. Never put
these values in the repo.

The Hetzner Cloud firewall allows inbound SSH, HTTP, and HTTPS; Coolify's direct
port `8000` stays closed. Cloudflare proxies `pokeori.app` and
`www.pokeori.app` and `coolify.pokeori.app` to the Hetzner origin. The `www`
record resolves through Cloudflare, although Coolify's DNS check currently
reports a mismatch for that alias. Cloudflare SSL mode is Full; wait for the
app's origin certificates before switching the zone to Full (strict). The
current origin firewall permits direct HTTP/HTTPS access as well, so leave
`TRUST_CLOUDFLARE_PROXY` unset until the origin is restricted to Cloudflare's
published IP ranges.

## GitHub push webhook

The Coolify dashboard and manual Git webhook use `coolify.pokeori.app` through
the Coolify proxy. Set the Coolify public URL to `https://coolify.pokeori.app`
and use
`https://coolify.pokeori.app/webhooks/source/github/events/manual` as the
repository webhook URL. The existing GitHub webhook is push-only. Keep JSON
content, SSL verification, and the same private signing secret in Coolify and
GitHub. Do not publish the secret or replace this with the token-based deploy
API URL.

GitHub must reach the webhook hostname over HTTPS. Verify a push delivery and
confirm Coolify records a webhook deployment for the merged SHA. Coolify returns
HTTP 200 even for invalid signatures, so inspect the response body rather than
treating the status alone as authentication success. Do not add a throwaway
`main` commit or disable caches to test the hook.

## Coolify application settings

- Source: the public Git repository, branch `main`, automatic deployment enabled. Confirm the repository push webhook targets this application.
- Build pack: Dockerfile. Base directory: `/`. Dockerfile: `/Dockerfile`. Build target: final stage (leave unset).
- Exposed container port: `3000`; route the domain through Coolify's proxy. Leave build/start command overrides empty.
- Enable **Use Docker Build Secrets**. Keep build cache enabled and **Include Source Commit in Build** disabled; package version supplies the deployment identifier.
- Run one application replica. Allow 30 seconds for graceful shutdown.
- Health check: GET `/api/health` on port 3000, interval 30 seconds, timeout 10 seconds, start period 60 seconds, 3 retries. Apply these values in Coolify if its health check overrides the Dockerfile.

Dockerfile syntax tracks stable `docker/dockerfile:1`. Coolify's injected `RUN --mount=type=secret,...,env=...` needs frontend 1.10 or newer; pinning 1.7 causes `unexpected key 'env'` before the application is compiled. See [Docker's secret mount reference](https://docs.docker.com/reference/dockerfile/#run---mounttypesecret) and [Coolify environment variables](https://coolify.io/docs/knowledge-base/environment-variables).

## Environment variables

Configure values in Coolify, never in committed environment files.

| Variable | Build | Runtime |
| --- | --- | --- |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Required, stable private base64 AES key (32 bytes recommended) | Same value |
| `DATABASE_URI` | Disabled; compiler uses a local placeholder | Required, MongoDB replica-set URI |
| `REDIS_URL` | Disabled; compiler uses a local placeholder | Required, private Redis/Dragonfly URI |
| `PAYLOAD_SECRET` | Disabled; compiler uses a placeholder | Required, stable private secret |
| `RESEND_API_KEY` | Disabled; compiler uses a placeholder | Required |
| `NEXT_PUBLIC_APP_URL` | Production URL | Production URL |
| `BETA_INVITATION_SECRET` | Disabled | Private signing secret, at least 32 characters; required for restricted registration |
| `CSP_ENFORCE` | Disabled | Enforcement is the default; `false` explicitly selects report-only |
| `TRUSTED_PROXY_HOPS` | Disabled | Number of trusted proxies counted from the right of X-Forwarded-For; default 1 |
| `GAME_PERFORMANCE_LOGS` | Disabled | Optional privacy-safe timing/size diagnostics |
| `WEB_PUSH_PUBLIC_KEY` | Disabled | Optional stable VAPID public key; enables device notifications with the following two values |
| `WEB_PUSH_PRIVATE_KEY` | Disabled | Matching private VAPID key; keep secret and retain across deployments |
| `WEB_PUSH_SUBJECT` | Disabled | VAPID contact (`mailto:` or HTTPS URL) |
| `TRUST_CLOUDFLARE_PROXY` | Disabled | `true` only when direct origin access is firewalled |

The Dockerfile preserves injected environment values. It rejects a missing Server Actions key; Next embeds this key in server build output, so generated images must remain private even though the source repository is public. For an intentional local Docker diagnostic, the key can also be supplied with `--secret id=NEXT_SERVER_ACTIONS_ENCRYPTION_KEY,env=NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` from an exported variable. Do not print the key.

MongoDB must support replica-set transactions, and the application must reach MongoDB and Dragonfly on the private network. The health endpoint checks both services and transaction support.

For the 0.32.0 notification feature, follow [device notification setup](../features/notifications.md). Add the `push-subscriptions` due-time and user indexes through the existing prepare migration before enabling production dispatch. The dispatcher runs in the persistent Next process; no additional cron provider or paid push account is needed. Without the three runtime VAPID values, notifications remain unavailable and no dispatcher starts.

## Hetzner build performance

The image pins Bun 1.4.2 for installation, Turbopack compilation, and the standalone server, matching `packageManager`. Frozen installs include build dependencies even if Coolify injects production mode. Package downloads and `.next/cache` persist in BuildKit cache mounts, with locking to prevent concurrent writers. Next 16.3 enables Turbopack's filesystem build cache by default.

The Alpine builder sets `POKEORI_BUILD_LIBC=musl` so tracing excludes unused glibc Sharp packages while retaining linuxmusl Sharp/libvips. Remove/change this setting if switching to a glibc base. Broad Payload runtime includes remain: earlier runtime tracing fixes required them, so further narrowing needs a complete image smoke test. The inspected 0.29.9 image contained approximately 18 MiB of unused glibc libvips; this is not a measured final-image size for the new release.

The base stage updates Alpine packages before installing compatibility libraries. The upstream Bun 1.4.2 image scan found CVE-2026-14456 in libcrypto3/libssl3 3.5.7-r0, fixed by Alpine 3.5.8-r0. A cached RUN does not recheck repositories: when future OS advisories appear, refresh/rebuild the base stage and rescan it. Preserve ordinary application/compiler caches during routine releases.

On 2026-09-07, the rebuilt linux/amd64 base stage (Alpine 3.22.5, 21 OS packages) passed Trivy 0.74.0's HIGH/CRITICAL scan with zero findings after the OpenSSL update. This covers the base's OS packages, not the compiled Bun binary or the final application image.

Page-generation workers are capped at four and respect smaller available CPU allocations; per-worker page concurrency is eight. This has not been benchmarked on the current CX23 and does not limit every Turbopack thread. Keep one build active at a time and measure build duration, peak RAM, swap, and live request latency before further tuning. Installed RAM and competing workloads determine the safe build memory budget.

Only compiler inputs enter the builder stage. Public assets are copied directly into the runner, so their contents do not invalidate the compiler layer (the required package-version bump still does). The final image includes standalone server dependencies, static files, and public assets. One-off data migration utilities remain available in the repository but are no longer built or shipped in the production image. The non-root runtime owns its files and can write Next caches.

Keep the Docker builder/cache on persistent host storage. Do not run routine builder/system pruning or no-cache deployments. Configure cleanup based on disk pressure while retaining recent successful images for rollback. The first build after migration is cold; evaluate subsequent builds separately.

## Validation and rollout

Before merging, increment the semantic package version and run `bun run lint`, `bun run typecheck`, `bun run validate:data`, and `bun test`. Typechecking is skipped in the Docker build to keep compilation work on the host lower.

After Coolify reports success:

1. Confirm the deployed commit matches the merged release and the container is healthy.
2. Confirm `/api/health` returns 200 and healthy database/transaction/Redis results.
3. Confirm `/api/app-version` returns the new package version with `Cache-Control: no-store`. Keep this endpoint and `/sw.js` outside CDN caching.
4. Keep an older PWA open and verify it reloads to the new version. If its first reload still lands on the prior client during rollout, the open client retries with a bounded delay on later version checks until the new bundle loads.
5. Smoke login, Explore, Pokemon box, a battle, a location encounter, and a mini-game.

A successful Dockerfile syntax check does not establish that the application compiles or that production services are reachable. Treat the first Coolify build and runtime smoke checks as required verification.

## Recovery

For urgent recovery, use Coolify's rollback to a retained compatible deployment if available and verify health. From 0.29.12, economy receipts can contain compressed responses: rollback code must retain that decoder and semantic receipt identities. An older image without the decoder is not a safe rollback once compressed receipts exist. Reconcile `main` through a revert PR with a new package version so a subsequent automatic deployment preserves the correction. If no compatible prior image remains, revert the faulty behavior while preserving receipt compatibility through a PR and let Coolify rebuild. Do not reset or force-push main.

Follow the [release checklist](/docs/development/release-checklist.md) for release validation and required migrations, and the [performance runbook](/docs/development/performance-runbook.md) for database/index and proxy setup.
