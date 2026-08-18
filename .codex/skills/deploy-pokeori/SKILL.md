---
name: deploy-pokeori
description: Build, publish, and verify Pokeori production releases from the local release machine through GHCR and Coolify. Use when preparing a release PR, deploying a merged Pokeori feature, checking local deployment prerequisites, rolling back a container image, or changing this repository's deployment workflow.
---

# Deploy Pokeori

The release boundary is a pull request merged to protected `main`. Never deploy an unmerged branch or bypass GitHub branch protection.

## Release workflow

1. Confirm the checkout is clean. The deploy command prompts before switching to `main` and fast-forwarding it to `origin/main` when needed.
2. Apply the `release-versioning` skill: increment `package.json` before the release PR and preserve the `/api/app-version` PWA-refresh check.
3. Confirm Docker Desktop with Buildx, Bun 1.3.10+, Git, and curl are available on the release machine.
4. Before building, reclaim Docker disk space on the release machine: run `docker builder prune -af` and `docker system prune -af` (do not use `--volumes`; local volumes may hold dev data). A host disk that is nearly full stops the Docker engine mid-deploy with `no space left on device` in `com.docker.backend.log`, so keep several GB free before starting.
5. Authenticate the GitHub CLI with package-write permission. Store the Coolify webhook and token locally as `COOLIFY_WEBHOOK_URI` and `COOLIFY_WEBHOOK_TOKEN` in ignored `.env`, or export the canonical `COOLIFY_WEBHOOK` and `COOLIFY_TOKEN` names. Never commit them or add them to GitHub Actions secrets.
6. Run `bun run deploy:production`. It validates the project, builds a `linux/amd64` image, reuses local and GHCR BuildKit caches, pushes `latest`, `v<package-version>`, and immutable `sha-<commit>` tags to GHCR, then triggers Coolify only after a successful push.
7. Verify Coolify health, critical gameplay flows, `/api/app-version`, and a refresh of an already-open PWA session.

## Release-machine execution

Run release operations with host access, outside the restricted sandbox (or with
an equivalent escalated execution context). The sandbox cannot reliably access
the Git metadata needed by `git fetch`/`git push`, GitHub CLI credentials and
network services, or the Docker Desktop socket. This applies to `gh auth
status`, GitHub PR/push commands, `docker version`/Buildx, and
`bun run deploy:production`. A sandbox permission error for one of these tools
is an environment limitation, not evidence that the release-machine setup is
missing.

Never print `.env` or credential values while checking prerequisites. Inspect
only whether required variables are present, and rotate any credential that is
accidentally exposed in command output.

## Guardrails

- Preserve GitHub protection for `main`: pull requests, admin enforcement, no force pushes/deletions, and resolved conversations.
- Do not restore GitHub Actions for builds or deploys; the release machine is the build executor.
- Do not tag an image from a dirty checkout or a commit that differs from `origin/main`.
- Roll back in Coolify by selecting a known-good immutable `sha-` or `v` tag. Do not rewrite `latest` to conceal a rollback.
- Keep the release machine's disk clear: prune Docker images and build cache before deploys so the engine never stops from a full host disk. If the engine does stop with `no space left on device`, free host space (regenerable app caches are a safe first target), restart Docker Desktop, then re-run the prune before deploying.

See `docs/development/local-ghcr-coolify.md` for setup, credential scopes, exact commands, and recovery details.
