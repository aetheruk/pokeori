# Coolify deployment

Production builds and deploys automatically from the public repository's protected `main` branch on the Intel N150 host. Validate and merge a release PR; Coolify compiles the checked-in Dockerfile and starts the new container. No local production build or registry publish is required.

## GitHub webhook through the local server's tunnel

The Pokeori Cloudflare Tunnel publishes `deploy.pokeori.app` with the exact path
rule `^/webhooks/source/github/events/manual$`, forwarding to
`http://localhost:8000`. Its catch-all returns 404, so the Coolify dashboard,
login and other API paths are not exposed through this hostname. The existing
`pokeori.app` route continues forwarding to port 80.

The repository's GitHub push webhook uses
`https://deploy.pokeori.app/webhooks/source/github/events/manual`, JSON content
and SSL verification. The same private signing secret must be saved in Coolify's
GitHub manual-webhook field and GitHub's webhook configuration. Do not publish
the secret or replace this with the token-based deploy API URL.

GitHub's initial ping returned HTTP 200. Signature checks with a matching
repository/main payload and a `[skip ci]` commit rejected absent/wrong signatures;
the correctly signed request reached the skip response without queuing a build.
Coolify returns HTTP 200 even for invalid signatures, so inspect its response
body rather than treating the status alone as authentication success.

Verify actual automatic deployment using
the next validated main merge: check the GitHub push delivery response and confirm
Coolify records a webhook deployment for the merged SHA. Do not add a throwaway
main commit or disable caches merely to test the hook. The previous 0.29.12 merge
needed a cached manual Redeploy because no GitHub webhook existed at that time.

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

## N150 build performance

The image pins Bun 1.4.2 for installation, Turbopack compilation, and the standalone server, matching `packageManager`. Frozen installs include build dependencies even if Coolify injects production mode. Package downloads and `.next/cache` persist in BuildKit cache mounts, with locking to prevent concurrent writers. Next 16.3 enables Turbopack's filesystem build cache by default.

The Alpine builder sets `POKEORI_BUILD_LIBC=musl` so tracing excludes unused glibc Sharp packages while retaining linuxmusl Sharp/libvips. Remove/change this setting if switching to a glibc base. Broad Payload runtime includes remain: earlier runtime tracing fixes required them, so further narrowing needs a complete image smoke test. The inspected 0.29.9 image contained approximately 18 MiB of unused glibc libvips; this is not a measured final-image size for the new release.

The base stage updates Alpine packages before installing compatibility libraries. The upstream Bun 1.4.2 image scan found CVE-2026-14456 in libcrypto3/libssl3 3.5.7-r0, fixed by Alpine 3.5.8-r0. A cached RUN does not recheck repositories: when future OS advisories appear, refresh/rebuild the base stage and rescan it. Preserve ordinary application/compiler caches during routine releases.

On 2026-09-07, the rebuilt linux/amd64 base stage (Alpine 3.22.5, 21 OS packages) passed Trivy 0.74.0's HIGH/CRITICAL scan with zero findings after the OpenSSL update. This covers the base's OS packages, not the compiled Bun binary or the final application image.

Page-generation workers are capped at four and respect smaller available CPU allocations; per-worker page concurrency is eight. This is a starting point for the N150, not a measured optimum, and does not limit every Turbopack thread. Keep one build active at a time and measure build duration, peak RAM, swap, and live request latency before further tuning. Installed RAM and competing workloads determine the safe build memory budget.

Only compiler inputs enter the builder stage. Public assets are copied directly into the runner, so their contents do not invalidate the compiler layer (the required package-version bump still does). The final image includes standalone server dependencies, static files, public assets, and the bundled Chronicle migration. The non-root runtime owns its files and can write Next caches.

Keep the Docker builder/cache on persistent host storage. Do not run routine builder/system pruning or no-cache deployments. Configure cleanup based on disk pressure while retaining recent successful images for rollback. The first build after migration is cold; evaluate subsequent builds separately.

## Validation and rollout

Before merging, increment the semantic package version and run `bun run lint`, `bun run typecheck`, `bun run validate:data`, and `bun test`. Typechecking is skipped in the Docker build to keep compilation work on the host lower.

After Coolify reports success:

1. Confirm the deployed commit matches the merged release and the container is healthy.
2. Confirm `/api/health` returns 200 and healthy database/transaction/Redis results.
3. Confirm `/api/app-version` returns the new package version with `Cache-Control: no-store`. Keep this endpoint and `/sw.js` outside CDN caching.
4. Keep an older PWA open and verify it reloads to the new version.
5. Smoke login, Explore, Pokemon box, a battle, a location encounter, and a mini-game.

A successful Dockerfile syntax check does not establish that the application compiles or that production services are reachable. Treat the first Coolify build and runtime smoke checks as required verification.

## Recovery

For urgent recovery, use Coolify's rollback to a retained compatible deployment if available and verify health. From 0.29.12, economy receipts can contain compressed responses: rollback code must retain that decoder and semantic receipt identities. An older image without the decoder is not a safe rollback once compressed receipts exist. Reconcile `main` through a revert PR with a new package version so a subsequent automatic deployment preserves the correction. If no compatible prior image remains, revert the faulty behavior while preserving receipt compatibility through a PR and let Coolify rebuild. Do not reset or force-push main.

Follow the [release checklist](/docs/development/release-checklist.md) for migrations and the [performance runbook](/docs/development/performance-runbook.md) for database/index and proxy setup.
