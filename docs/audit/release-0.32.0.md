# 0.32.0 — Optional device notifications

Implementation adds per-device opt-in controls in Trainer settings for voyage completion and the midnight UTC daily reset. Both default off. A persistent server dispatcher sends standard Web Push messages with activity artwork and stores preferences/delivery cursors in a private Payload collection. Voyage claims, success rolls, rewards, daily refresh and tutorial unlocks are unchanged.

Includes endpoint validation, subscription ownership and device reset, rate limits, serialized writes/delivery, transient retry, expired credential removal, visible fallback pushes, same-origin notification navigation, and an opt-in test notification. The existing image service worker and PWA version refresh remain in use. A pre-existing type error in the scoped trainer loader was corrected by supplying the authenticated users-collection discriminator when constructing its game-data input.

## Verified locally

- Typecheck and lint passed.
- Full Bun suite: 1,571 tests passed, zero failures.
- Authored data validation: 424 tests passed, zero failures.
- Six Playwright checks passed: notifications off/unsupported at 390px and 1280px, trainer settings at both widths, real service-worker artwork delivery offline, and download cancellation/resume.
- Notification tests include isolated server-action/dispatcher execution with an in-memory store and provider substitute: authentication/rate limiting, account isolation, full-credential device reset, successful/partial delivery, persisted retry cursors, tutorial-gated daily resets, and expired provider credentials. No real notifications were sent.
- Mobile and desktop notification screenshots were reviewed.
- Dependency audit passed under the repository's documented Payload advisory mitigation.

## Pending release and real-device checks

Deployment authorized on 2026-09-09. A new matching VAPID keypair and the `https://pokeori.app` contact were saved in Coolify as runtime-only environment variables, without printing or committing private values. The release PR, subscription indexes, rollout, and real-device verification are tracked during deployment. No third-party push vendor account is required.

The Docker daemon is unavailable locally, so the disposable MongoDB/Redis security integration suite was not run. Unit/provider substitutes and UI fixtures do not verify production MongoDB persistence or APNs delivery. Verify the notification collection against the target services, an iOS Home Screen PWA, a desktop browser, a closed-app voyage completion, midnight UTC, and server restart recovery before calling the feature live. Confirm the deployed `/api/app-version` and an older open PWA refresh through the usual release process.
