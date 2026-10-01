# Coolify deployment

The production target is the Hetzner `pokeori-server` (CX23, 2 vCPU, 4 GiB RAM). A merge to `main` runs the GitHub Actions release workflow: it builds a `linux/amd64` image on GitHub, pushes tagged images to private GHCR, then asks Coolify to pull and start the image. GitHub Actions does not run typecheck, lint, test, or dependency-audit jobs. Coolify does not compile the application. This keeps Next.js compilation off the memory-constrained host; the CX23 still needs enough headroom for Coolify, MongoDB, Dragonfly, and the running app.

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

The old `pokeori-app` resource still points to the public `aetheruk/pokeori`
Git repository and `/Dockerfile`, but is stopped and no longer owns the
production domains. The new `pokeori-ghcr` Docker Image resource targets
`ghcr.io/aetheruk/pokeori-production:latest` on port `3000`; it owns
`https://pokeori.app` and `https://www.pokeori.app`, with HTTP-to-HTTPS routing
and the `/api/health` check configured. `NEXT_PUBLIC_APP_URL` is set. The
resource is not deployed yet.

The GitHub Actions workflow, private GHCR package, push token, and authenticated
Coolify webhook target are configured. The GHCR read-only login was verified
on Hetzner by pulling the private `bootstrap` tag. The stable Server Actions
key now exists in GitHub; set the same rotated value in Coolify at runtime.
`COOLIFY_TOKEN` already exists as a GitHub secret; verify that it has Coolify's
deploy permission for this instance. The `pokeori-ghcr` variable editor has
runtime entries pending save. Before saving, rotate the MongoDB and Dragonfly
credentials, Payload secret, beta invitation secret, and Server Actions key;
then re-enter them in Coolify. Use a beta invitation secret of at least 32
characters. Add a valid `RESEND_API_KEY`. The old MongoDB credential was also
exposed during setup. Keep all secret values out of the repo.

The Hetzner Cloud firewall allows inbound SSH, HTTP, and HTTPS; Coolify's direct
port `8000` stays closed. Cloudflare proxies `pokeori.app` and
`www.pokeori.app` and `coolify.pokeori.app` to the Hetzner origin. The `www`
record resolves through Cloudflare, and Coolify's DNS check matches both app
domains. Cloudflare SSL mode is Full; wait for the
app's origin certificates before switching the zone to Full (strict). The
current origin firewall permits direct HTTP/HTTPS access as well, so leave
`TRUST_CLOUDFLARE_PROXY` unset until the origin is restricted to Cloudflare's
published IP ranges.

## GitHub Actions image release

`.github/workflows/build-and-deploy.yml` runs on pushes to `main` and can be
manually dispatched from `main`. It builds for `linux/amd64`, pushes the private GHCR image,
and triggers Coolify only after the push succeeds. Each image is tagged
`latest`, `v<package-version>`, and `sha-<12-character-commit>`. The workflow
retains the three newest release image versions in GHCR. Coolify tracks
`latest`; the retained version and commit tags identify rollback candidates.

The existing `ghcr.io/aetheruk/pokeori` package is public and currently holds
the old `v0.29.9` image. GitHub does not allow a published public personal
package to be made private. Use the separate, private, unlinked package named
`pokeori-production` for all new images. It has been seeded with an empty
`bootstrap` image; the workflow refuses to publish if the package is public or
linked to the public repository. Do not reuse or publish future key-bearing
images to `pokeori`.

Add these repository secrets under **Settings → Secrets and variables →
Actions**:

| Secret | Purpose |
| --- | --- |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | **Configured in GitHub.** BuildKit secret used by the Dockerfile; set the same rotated value in Coolify at runtime. |
| `COOLIFY_WEBHOOK` | **Configured.** Authenticated deploy webhook URL for `pokeori-ghcr`. |
| `COOLIFY_TOKEN` | **Configured.** Coolify API token with deploy-only permission. |
| `GHCR_PUSH_TOKEN` | **Configured.** GitHub classic PAT with `read:packages` and `write:packages`, used only by the main-branch release workflow. |

`pokeori-production` is already created as a private personal package and is
unlinked from `aetheruk/pokeori`; do not enable permission inheritance from the
public repository. Coolify still needs a separate GHCR PAT with only
`read:packages`, authenticated on the Hetzner deployment server as the Docker
user configured in Coolify. This login was verified with a pull of the private
`bootstrap` tag. The workflow uses a PAT instead of `GITHUB_TOKEN` so a
public-repository Actions grant does not expose the private image to fork
workflows. Keep the image private: Next embeds the Server Actions key in the
compiled app. Give Coolify a separate GHCR credential with only `read:packages`
for pulling the image. BuildKit caching uses GitHub Actions cache rather than an
additional GHCR image version.

Before publishing, the workflow reduces GHCR to the two newest release images; afterward it keeps only the three newest release images, each tagged `latest` (for the current version), `v<major>.<minor>.<patch>`, and `sha-<commit>`. It deletes old releases, untagged manifests, and cache manifests so the package contains no more than three image versions. Grant the `aetheruk/pokeori` repository **Admin** under the package's **Manage Actions access** settings so the workflow's `GITHUB_TOKEN` can prune the package. This is separate from linking the package to the public repository: keep the package private and unlinked.

The Coolify public URL is `https://coolify.pokeori.app`. `COOLIFY_WEBHOOK` now
targets the `pokeori-ghcr` authenticated deploy webhook. The `COOLIFY_TOKEN`
secret has deploy-only permission. This is an API deploy request from CI using
POST; the old repository push webhook is not used by the
Docker Image application. Do not use the manual Git webhook URL here. After
the remaining runtime values are saved, confirm the deploy
webhook queues an image pull.

## Coolify application settings

- Application type: Docker Image. Authenticate the Hetzner deployment server's configured Docker user to GHCR with a separate `read:packages` credential before deploying the private image.
- Image: `ghcr.io/aetheruk/pokeori-production`; tag: `latest`. Use a `v<version>` or `sha-<12-character-commit>` tag for a deliberate rollback.
- Do not configure a Git source, Dockerfile build, or repository auto-deploy webhook. GitHub Actions publishes the image and triggers the authenticated Coolify deploy webhook.
- Exposed container port: `3000`; route the domain through Coolify's proxy. Leave build/start command overrides empty.
- Run one application replica. Allow 30 seconds for graceful shutdown.
- Health check: GET `/api/health` on port 3000, interval 30 seconds, timeout 10 seconds, start period 60 seconds, 3 retries. Apply these values in Coolify if its health check overrides the Dockerfile.

Dockerfile syntax tracks stable `docker/dockerfile:1` and reads the build key through a BuildKit secret file mount. See [Docker's secret mount reference](https://docs.docker.com/reference/dockerfile/#run---mounttypesecret).

## Environment variables

Configure runtime values in Coolify and the build key in GitHub Actions, never in committed environment files.

| Variable | Build | Runtime |
| --- | --- | --- |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | Required as a GitHub Actions secret for the image build | Same stable value in Coolify at runtime |
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

The Dockerfile preserves injected environment values. It rejects a missing Server Actions key; Next embeds this key in server build output, so generated images and build cache must remain private even though the source repository is public. GitHub Actions passes the key through BuildKit's secret mechanism. Do not put it in a build argument, print it, or use a public build cache.

MongoDB must support replica-set transactions, and the application must reach MongoDB and Dragonfly on the private network. The health endpoint checks both services and transaction support.

For the 0.32.0 notification feature, follow [device notification setup](../features/notifications.md). Add the `push-subscriptions` due-time and user indexes through the existing prepare migration before enabling production dispatch. The dispatcher runs in the persistent Next process; no additional cron provider or paid push account is needed. Without the three runtime VAPID values, notifications remain unavailable and no dispatcher starts.

## Build and host resources

The image pins Bun 1.4.2 for installation, Turbopack compilation, and the standalone server, matching `packageManager`. Frozen installs include build dependencies. GitHub Actions builds the image and reads/writes the private GHCR `buildcache` tag; Coolify only pulls and runs the published image. Next 16.3 enables Turbopack's filesystem build cache by default.

The Alpine builder sets `POKEORI_BUILD_LIBC=musl` so tracing excludes unused glibc Sharp packages while retaining linuxmusl Sharp/libvips. Remove/change this setting if switching to a glibc base. Broad Payload runtime includes remain: earlier runtime tracing fixes required them, so further narrowing needs a complete image smoke test. The inspected 0.29.9 image contained approximately 18 MiB of unused glibc libvips; this is not a measured final-image size for the new release.

The base stage updates Alpine packages before installing compatibility libraries. The upstream Bun 1.4.2 image scan found CVE-2026-14456 in libcrypto3/libssl3 3.5.7-r0, fixed by Alpine 3.5.8-r0. A cached RUN does not recheck repositories: when future OS advisories appear, refresh/rebuild the base stage and rescan it. Preserve ordinary application/compiler caches during routine releases.

On 2026-09-07, the rebuilt linux/amd64 base stage (Alpine 3.22.5, 21 OS packages) passed Trivy 0.74.0's HIGH/CRITICAL scan with zero findings after the OpenSSL update. This covers the base's OS packages, not the compiled Bun binary or the final application image.

The CX23 no longer needs build-time RAM, but its 4 GiB still serves Coolify, MongoDB, Dragonfly, and the app at runtime. A Coolify container memory limit only constrains that running container; it does not tune GitHub's build runner. If runtime memory pressure appears, inspect actual service usage before increasing host RAM or limiting a service.

Only compiler inputs enter the builder stage. Public assets are copied directly into the runner, so their contents do not invalidate the compiler layer (the required package-version bump still does). The final image includes standalone server dependencies, static files, and public assets. One-off data migration utilities remain available in the repository but are no longer built or shipped in the production image. The non-root runtime owns its files and can write Next caches.

Keep the registry package and cache private. Configure Coolify cleanup based on disk pressure while retaining recent successful images for rollback.

## Validation and rollout

Before merging, increment the semantic package version. GitHub Actions publishes without running project validation jobs; run the relevant release checklist locally when validation is needed. Typechecking is not part of the Docker build.

After Coolify reports success:

1. Confirm the deployed commit matches the merged release and the container is healthy.
2. Confirm `/api/health` returns 200 and healthy database/transaction/Redis results.
3. Confirm `/api/app-version` returns the new package version with `Cache-Control: no-store`. Keep this endpoint and `/sw.js` outside CDN caching.
4. Keep an older PWA open and verify it reloads to the new version. If its first reload still lands on the prior client during rollout, the open client retries with a bounded delay on later version checks until the new bundle loads.
5. Smoke login, Explore, Pokemon box, a battle, a location encounter, and a mini-game.

GitHub Actions logs establish whether compilation and image publication completed. Coolify logs establish whether it pulled the new image and started it; runtime health and smoke checks remain required.

## Recovery

For urgent recovery, use Coolify's rollback to a retained compatible deployment if available and verify health. From 0.29.12, economy receipts can contain compressed responses: rollback code must retain that decoder and semantic receipt identities. An older image without the decoder is not a safe rollback once compressed receipts exist. Reconcile `main` through a revert PR with a new package version so a subsequent GitHub image build and Coolify deployment preserve the correction. If no compatible prior image remains, revert the faulty behavior while preserving receipt compatibility through a PR and let GitHub Actions build the replacement. Do not reset or force-push main.

Follow the [release checklist](/docs/development/release-checklist.md) for release validation and required migrations, and the [performance runbook](/docs/development/performance-runbook.md) for database/index and proxy setup.
