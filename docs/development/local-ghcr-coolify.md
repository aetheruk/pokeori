# Local GHCR and Coolify deployment

Production images are built and published from the designated release machine, not from GitHub Actions. Coolify pulls the published GHCR image after its deploy webhook is called.

```text
Pull request -> review -> merge to protected main
     |
     v
release machine -> validate -> build linux/amd64 image -> publish GHCR -> Coolify webhook -> deploy
```

There are no GitHub Actions workflows in this repository. Keep `main` protected in GitHub: require pull requests, enforce branch protection for administrators, disallow force pushes and deletions, and require conversations to be resolved. Do not add a direct-push exception for the release machine.

## One-time setup on the release machine

Install Docker Desktop (including Docker Buildx), Bun 1.3.10+, Git, and curl. Sign in to GitHub with an account that can push packages to `ghcr.io/aetheruk/pokeori`.

Authenticate the GitHub CLI with an account that can write packages (`write:packages`; add `read:packages` if the package is private). Configure the Coolify application as a pre-built Docker image using:

```text
ghcr.io/aetheruk/pokeori:latest
```

If the package is private, configure GHCR registry credentials in Coolify. Runtime secrets remain configured only in Coolify:

```env
DATABASE_URI=your-production-mongodb-uri
REDIS_URL=your-production-redis-uri
PAYLOAD_SECRET=your-production-payload-secret
RESEND_API_KEY=your-production-resend-key
NEXT_PUBLIC_APP_URL=https://pokeori.app
```

Get the application deploy webhook URL and a Coolify API token with `Deploy` permission. Store them locally as `COOLIFY_WEBHOOK_URI` and `COOLIFY_WEBHOOK_TOKEN` in the ignored `.env` file (or export the canonical `COOLIFY_WEBHOOK` and `COOLIFY_TOKEN` names). Do not put either value in GitHub repository secrets; GitHub Actions is not part of this release path.

## Deploy a merged release

Deploy only after the feature pull request has merged to `main`. From a clean feature branch or stale `main`, the command prompts once before switching to `main` and fast-forwarding it to `origin/main`; declining leaves the checkout unchanged. It rejects local modifications or a `main` that has unmerged local commits.

```bash
bun install --frozen-lockfile
bun run deploy:production
```

`deploy:production` obtains the GHCR token from `gh auth token`, defaults the GHCR username to `aetheruk`, and reads the two Coolify aliases from `.env` when they are not already exported. It runs linting, typechecking, the Bun test suite, and data validation, then builds and pushes a `linux/amd64` Docker image. It reuses Bun package downloads, Next compiler output, and a GHCR-backed BuildKit cache, so subsequent releases rebuild and upload only changed layers.

- `ghcr.io/aetheruk/pokeori:latest`
- `ghcr.io/aetheruk/pokeori:v<package-version>`
- `ghcr.io/aetheruk/pokeori:sha-<12-character-commit>`

Only after the image push succeeds does it call the Coolify webhook. The package version is the PWA release identifier, so increment `package.json` as part of every release pull request.

## Verify the rollout

1. Confirm Coolify pulled the new image and its digest matches the release's immutable `sha-` tag; confirm the container is healthy.
2. Verify login, Explore, the Pokemon box, one battle, one location encounter, and one mini-game.
3. Open `/api/app-version` and confirm it returns the new `package.json` version with `Cache-Control: no-store`.
4. Keep an existing PWA session open and confirm it reloads after observing the new version.

## Recovery

To roll back, set the Coolify image to a known-good immutable `sha-` or `v` tag, deploy it from Coolify, and verify the rollout. Do not retag `latest` to hide a rollback; retain immutable tags for traceability.
