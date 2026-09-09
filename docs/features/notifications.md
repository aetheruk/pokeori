# Device notifications

Trainer settings offers separate **Voyage completion** and **Daily task reset** controls. Both default off, independently on each browser/device. Permission is requested only after a player presses a control. The app must be served over HTTPS (localhost is also supported). iPhone/iPad require iOS/iPadOS 16.4 or later and a Home Screen installation opened from its icon.

Voyage notifications announce that a result is ready, not that the success roll passed. They neither settle voyages nor grant rewards. An active voyage finishing after opt-in is eligible; already-finished voyages are not replayed when enabling. Claimed voyages disappear from the source of truth. Each run has its own delivery identity. Completions older than 24 hours are skipped after outages.

Daily reminders use the same UTC date boundary as daily task refresh (00:00 UTC), and require `tutorial-16` completion. Enabling does not immediately send today's reminder. After an outage only the current day's reminder is considered. Players still refresh tasks in Explore; push does not generate tasks or affect streaks.

Notification clicks open Explore, or focus an existing Explore window. They do not deliberately navigate an active battle away. Voyage messages supply authored activity artwork; daily messages use the Explorer journal. The operating system controls presentation and may show only the installed app icon, especially on iOS. **Send test notification** helps verify the current device without waiting for an activity; Focus modes and OS delivery policies can delay or silence alerts.

## Storage and dispatch

Standard Web Push uses `web-push` and a stable VAPID keypair; no external notification vendor account is needed. `push-subscriptions` stores the endpoint, encryption keys, owner, opt-ins, delivery cursors, bounded sent-voyage identities, and next check in MongoDB. Public Payload CRUD access is denied. Authenticated, rate-limited server actions validate browser credentials and use a SHA-256 endpoint hash as the document's primary key. Outbound hosts are restricted to Apple, FCM, Mozilla, and Windows push services to prevent arbitrary server requests.

The persistent Next server starts a dispatcher through `src/instrumentation.ts`. It polls due subscriptions in batches of 100, processes five concurrently, and checks active subscribers about once per minute under normal load (plus 15 seconds between batches). It does not rely on the PWA remaining open. A serverless or scale-to-zero host would need a dedicated dispatcher instead.

Redis leases serialize device preference writes with delivery across overlapping instances. MongoDB delivery cursors survive restarts and Redis loss. Successful voyage deliveries are recorded individually; transient errors retry with bounded exponential backoff. HTTP 404/410 and invalid/expired subscriptions are removed. Provider error bodies, endpoints, and keys are not logged. A crash after a provider accepts a message but before its receipt is stored can cause a retry: stable notification tags replace duplicate visible notifications where supported. This is best-effort Web Push, not guaranteed exact-once delivery.

Disabling both controls removes the server subscription and unsubscribes the browser. Previously queued provider messages cannot be recalled. Another trainer cannot modify an existing endpoint's preferences; the explicit device reset requires possession of its complete browser credential and clears the old binding before re-enabling. Opt-in persists while the account is not actively open, so shared-device users should turn it off before handing over the device. Each account is limited to ten device records.

## Deployment setup

1. Generate a stable keypair with `bunx web-push generate-vapid-keys` in a private terminal. Store it in the deployment secret manager, never in source control. Avoid rotating it routinely: existing subscriptions are bound to the original public key.
2. Set runtime-only `WEB_PUSH_PUBLIC_KEY`, `WEB_PUSH_PRIVATE_KEY`, and `WEB_PUSH_SUBJECT` (a monitored `mailto:` contact or an HTTPS contact URL) in Coolify. All instances must use the same keypair. The public key is delivered through an authenticated settings action, so no build-time secret or `NEXT_PUBLIC_*` key is needed. Missing configuration leaves the controls disabled with an explanation.
3. With the new collection registered, run the existing `migrate:performance-indexes -- --phase=prepare` workflow against the target database to add the due-time and user indexes. Production automatic index creation remains disabled. The endpoint hash's `_id` uniqueness works without a secondary unique-index migration.
4. Deploy through the normal versioned release flow. Verify `/api/app-version` returns `0.32.0` (or the later release), an older client refreshes, and `/sw.js` contains the push/click handlers.
5. On a Home Screen iPhone PWA and a desktop browser, verify default off, permission acceptance/denial, separate opt-ins, reload persistence, the test notification, and turning both off. Start a voyage, close the PWA, and verify one alert after its end time. Check a daily reset across midnight UTC, expired subscriptions, and a server restart. Unit tests cannot establish APNs delivery.

If VAPID keys must change, turn off/reset notifications on existing devices and enable again. Existing image downloads and application-version checks continue through the same root service worker.
