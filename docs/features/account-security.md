# Account and game-state access

The Users collection allows public account creation and owner-scoped account updates. Payload's built-in email/password fields and the required trainer name remain available for account management.

All other authored writable fields are server-controlled by default. Their field-level create/update access requires an authenticated admin; this includes `isAdmin`, currency, skills, profile selections/unlocks, kid mode, collection capacity, statistics, gifts, friends, voyages, and weather state. Join/UI fields are excluded from this policy. New authored game fields inherit protection automatically.

Normal game changes use validated server actions and Payload's trusted Local API (access override is its default). Those actions must authenticate the caller, validate ownership and values, and preserve economy transactions, action locks, and idempotency. Do not forward arbitrary client objects to the Local API. Registration explicitly constructs its allowed fields, including its existing kid-mode choice.

Account unlocking requires an admin. This mitigates CVE-2026-11779 / GHSA-jg8r-5jh2-v2xj for this auth collection. Payload 3.88.0 still triggers the dependency audit because no upstream patched release is listed; do not suppress that advisory globally. Re-evaluate it when Payload publishes a fix.

Tests in `tests/user-access.test.ts` exercise anonymous, player, forged-input, and admin permissions for creation, updates, and unlocking. `tests/game-sync-auth.test.ts` verifies that sync uses the authenticated user, authenticates once, and returns private timing metadata.
