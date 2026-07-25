---
name: deploy-pokeori
description: Build, publish, and verify Pokeori production releases from the local release machine through GHCR and Coolify. Use when preparing a release PR, deploying a merged Pokeori feature, checking local deployment prerequisites, rolling back a container image, or changing this repository's deployment workflow.
---

# Deploy Pokeori

The release boundary is a pull request merged to protected `main`. Never deploy an unmerged branch or bypass GitHub branch protection.

## Release workflow

1. Confirm the checkout is clean. The deploy command prompts before switching to `main` and fast-forwarding it to `origin/main` when needed.
2. Apply the `release-versioning` skill: increment `package.json` before the release PR and preserve the `/api/app-version` PWA-refresh check.
3. Confirm Docker Desktop with Buildx, Node 22+, pnpm 10.24.0, Bun 1.3.13, Git, and curl are available on the release machine.
4. Authenticate the GitHub CLI with package-write permission. Store the Coolify webhook and token locally as `COOLIFY_WEBHOOK_URI` and `COOLIFY_WEBHOOK_TOKEN` in ignored `.env`, or export the canonical `COOLIFY_WEBHOOK` and `COOLIFY_TOKEN` names. Never commit them or add them to GitHub Actions secrets.
5. Run `pnpm run deploy:production`. It validates the project, builds a `linux/amd64` image, pushes `latest`, `v<package-version>`, and immutable `sha-<commit>` tags to GHCR, then triggers Coolify only after a successful push.
6. Verify Coolify health, critical gameplay flows, `/api/app-version`, and a refresh of an already-open PWA session.

## Guardrails

- Preserve GitHub protection for `main`: pull requests, admin enforcement, no force pushes/deletions, and resolved conversations.
- Do not restore GitHub Actions for builds or deploys; the release machine is the build executor.
- Do not tag an image from a dirty checkout or a commit that differs from `origin/main`.
- Roll back in Coolify by selecting a known-good immutable `sha-` or `v` tag. Do not rewrite `latest` to conceal a rollback.

See `docs/development/local-ghcr-coolify.md` for setup, credential scopes, exact commands, and recovery details.
