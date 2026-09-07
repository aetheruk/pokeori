---
name: deploy-pokeori
description: Prepare and verify Pokeori releases automatically built from public main by Coolify on the N150 host. Use for release PRs, Dockerfile deployment troubleshooting, rollout verification, rollback, and deployment workflow changes.
---

# Deploy Pokeori

Coolify builds the root Dockerfile from the public repository's protected `main` branch and deploys automatically after a merge. A local production build, package publish, and manual webhook are not release steps.

## Release workflow

1. Inspect the worktree and release diff; preserve unrelated changes.
2. Apply `release-versioning`: increment `package.json` before the release PR and preserve the `/api/app-version` PWA refresh check.
3. Run the relevant tests and pre-merge checks in `docs/development/release-checklist.md`. The Docker build skips typechecking, so run it before merging.
4. When the user has authorized shipping, merge the reviewed PR through the protected-main workflow. This triggers production deployment; do not merge just to test configuration.
5. Inspect Coolify's build/deployment result and verify the deployed commit, `/api/health`, `/api/app-version`, critical gameplay, and an already-open PWA refresh. If deployment access is unavailable, report verification as pending.

## Dockerfile and host constraints

- Keep the Dockerfile frontend on stable `:1` (at least 1.10); Coolify injects secret mounts with `env=`.
- Enable Docker Build Secrets. The stable `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` must be available during build and runtime. Never replace it with a public placeholder or print it. Next embeds this key in server build output, so keep images private.
- Prefer runtime-only settings for database, Redis, Payload, and email credentials. Build placeholders allow compilation without connecting to production services.
- Preserve Docker layers and the Bun/Next cache mounts on the Coolify host. Avoid routine cache pruning and no-cache builds; they make N150 deployments slower.
- Keep one application replica and leave build-time CPU/memory headroom for the running app and databases. Tune from measured timings and memory, not assumed speedups.
- Preserve main branch protection and require PRs; no force pushes or direct-push exceptions.

Use `docs/development/deployment.md` for the exact Coolify settings and recovery procedure. Roll back through Coolify's retained successful deployment when available, then reconcile main with a revert PR and a new package version.
