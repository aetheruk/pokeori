# Coolify deployment

Production builds and deploys automatically from the public repository's protected `main` branch on the Intel N150 host. Validate and merge a release PR; Coolify compiles the checked-in Dockerfile and starts the new container. No local production build or registry publish is required.

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
| `TRUST_CLOUDFLARE_PROXY` | Disabled | `true` only when direct origin access is firewalled |

The Dockerfile preserves injected environment values. It rejects a missing Server Actions key; Next embeds this key in server build output, so generated images must remain private even though the source repository is public. For an intentional local Docker diagnostic, the key can also be supplied with `--secret id=NEXT_SERVER_ACTIONS_ENCRYPTION_KEY,env=NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` from an exported variable. Do not print the key.

MongoDB must support replica-set transactions, and the application must reach MongoDB and Dragonfly on the private network. The health endpoint checks both services and transaction support.

## N150 build performance

The image uses Bun for installation, Turbopack compilation, and the standalone server. Frozen installs include build dependencies even if Coolify injects production mode. Package downloads and `.next/cache` persist in BuildKit cache mounts, with locking to prevent concurrent writers. Next 16.3 enables Turbopack's filesystem build cache by default.

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

For urgent recovery, use Coolify's rollback to a retained successful deployment if available and verify health. Reconcile `main` through a revert PR with a new package version so a subsequent automatic deployment preserves the correction. If no prior image remains, revert the faulty change through a PR and let Coolify rebuild. Do not reset or force-push main.

Follow the [release checklist](/docs/development/release-checklist.md) for migrations and the [performance runbook](/docs/development/performance-runbook.md) for database/index and proxy setup.
