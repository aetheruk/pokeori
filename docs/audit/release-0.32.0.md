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

## Production rollout

Deployment authorized on 2026-09-09. A new matching VAPID keypair and the `https://pokeori.app` contact were saved in Coolify as runtime-only environment variables, without printing or committing private values. No third-party push vendor account is required.

- PR [#364](https://github.com/aetheruk/pokeori/pull/364) merged as `e209b9572dbaf5d8d85c645815b0e3952f02dafd` at 08:06:30 UTC. The merge tree exactly matches tested PR head `d55fab7f1c54f930dac1c10c2824dba91407b0b5`.
- Both required CI jobs passed. CI ran the real disposable MongoDB/Redis security integration suite (152 assertions), which was unavailable locally. Browser CI reported 42 passed, one existing Onix desktop test passing on retry, and two optional skips.
- Confirmed `push-subscriptions` did not exist before setup. Created the new empty collection's `nextCheckAt_1` and `user_1` query indexes; `_id_` supplies primary-key uniqueness. No existing collections or player records were changed.
- Coolify webhook deployment `04oyqbn9ut5qqsuvv9ghxmwh` built the image successfully, passed its first container health check at 08:10:04 UTC, and completed the rolling update at 08:10:05 UTC.
- Production `/api/app-version` returns `0.32.0` with no-store caching. `/api/health` confirms MongoDB, transactions, and Dragonfly healthy. `/sw.js` returns the new version's push/click handlers with no-store caching. `/dev` and `/ui-test` return 404.
- Verified the runtime VAPID private key derives the configured public key, without exposing either credential. A synthetic disabled subscription with no real player was inserted as a bounded smoke probe; the running dispatcher removed it automatically within the 45-second observation window. No push was sent, and the probe cleanup was scoped to that one generated ID.
- The signed-in production Trainer page displays both notification controls available and off, with an empty error status. The held-open browser loaded the new client, but login/navigation occurred during rollout, so automatic refresh was not isolated as a separate verification.

## Remaining device verification

Real APNs/FCM delivery, an installed iOS Home Screen PWA, a closed-app voyage completion, and midnight UTC delivery still need device checks. Notifications were left off on the user's Chrome device. Authenticated gameplay mutation checks were covered by local/CI tests; no production battle, voyage, reward, or inventory mutation was performed for this release.
