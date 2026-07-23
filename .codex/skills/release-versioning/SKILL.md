---
name: release-versioning
description: Prepare any Pokeori production update, release PR, merge, or deployment by assigning a new semantic package version and verifying that already-open PWAs refresh to the deployed client version. Use whenever a change is intended to ship.
---

# Release Versioning

The `package.json` version is Pokeori's release identifier. Every production release—feature, bug fix, hotfix, or content change—must receive a new semantic version before the PR is opened or deployed.

## Workflow

1. Inspect the current `package.json` version and choose the correct semantic increment. Use patch for compatible fixes/content, minor for backward-compatible features, and major for breaking changes.
2. Update `package.json` before opening the release PR. Never reuse a version that has been deployed.
3. Run the applicable validation commands and the release checklist in `docs/development/release-checklist.md`.
4. Confirm `/api/app-version` returns the new version with no-store caching after deployment. Keep an existing PWA session open and verify it reloads when the endpoint reports the new version.

Do not use timestamps, commit hashes, or display-only labels in place of the package version.
