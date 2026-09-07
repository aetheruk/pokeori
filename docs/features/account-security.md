# Account and game-state access

Generic Users creation is administrator-only; player signup uses the validated invitation action. Invitations are signed, expiring and single-use, with account creation and redemption in one MongoDB transaction. See [registration invitations](../development/registration-invitations.md) for issuance and configuration. Owner-scoped account updates retain Payload's built-in email/password fields and trainer name.

All other authored writable fields are server-controlled by default. Their field-level create/update access requires an authenticated admin; this includes `isAdmin`, currency, skills, profile selections/unlocks, kid mode, collection capacity, statistics, gifts, friends, voyages, and weather state. Join/UI fields are excluded from this policy. New authored game fields inherit protection automatically.

Normal game changes use validated server actions and Payload's trusted Local API (access override is its default). Those actions must authenticate the caller, validate ownership and values, and preserve economy transactions, action locks, and idempotency. Do not forward arbitrary client objects to the Local API. Registration explicitly constructs its allowed fields, including its existing kid-mode choice. Pokémon and ExpeditionRuns generic mutations are also administrator-only. Trusted battle, expedition, daily-progress and encounter helpers live in server-only modules rather than public action exports. Developer authoring actions authorize inside each call and are unavailable in production.

Economy receipt reads are administrator-only, including a player's own receipts.
Durable envelopes can contain private RNG outcomes and settlement snapshots;
lossless compression does not make those values secret. Public gameplay actions
replay receipts through trusted server code and return their intended response.
Pokemon responses project original-trainer relations to public attribution
(`id` and `trainerName`), preventing expanded Users relations from exposing email
or account economy fields.

## Cookies, browser policy, and client addresses

Payload authentication and custom login/signup cookies explicitly use
`SameSite=Lax`; production authentication cookies require HTTPS (`Secure`).
Signup validates bounded fields, normalizes email, and applies IP and email
rate limits. Invitation redemption and account creation share a transaction.

The page proxy generates a fresh nonce and overwrites inbound nonce/CSP headers.
The enforced-by-default policy uses nonce-based scripts with `strict-dynamic`,
blocks object embedding and framing, and restricts form submissions to the same
origin. Production scripts have no `unsafe-eval`; development retains it for
tooling. Inline styles remain permitted for React/Payload/game positioning.
Explicit image/media origins support authored assets. `CSP_ENFORCE=false` is the
documented report-only rollback, not the default. Reports use the bounded
`/api/security/csp-report` endpoint.

Forwarded addresses are ignored unless proxy trust is explicitly enabled. Trusted
X-Forwarded-For processing counts from the trusted right-hand end using
`TRUSTED_PROXY_HOPS` and accepts valid IP addresses only. Cloudflare's connecting-IP
header is trusted only with its separate option. Production must prevent direct
origin access that bypasses the trusted proxy, and the configured hop count must
match the actual chain. Local tests verify parsing and spoofed-prefix behavior;
they do not verify the deployed firewall or proxy chain.

## Game result authority

Seeded arcade checkpoints replay bounded controls to derive survival, score, and
collected rewards. Mining and rhythm derive damage/hits from replayed inputs.
Puzzle solutions, server rounds, and chance-game outcomes use their specific
server verifiers. Generic completion no longer manufactures a win from a client
boolean. Encounter QTEs validate bounded gesture/tap transcripts; throws derive
ring phase from a live per-attempt timing challenge instead of a supplied scale.

These protocols verify legal inputs and session progress. They do not prove that
a human supplied the inputs or prevent automation of valid play. Arcade sessions
retain state for at most two hours to support paused tabs and network recovery;
authored simulation time limits still bound the amount of gameplay. See the
[29-mode authority inventory](../audit/game-authority-verification-2026-09-07.md)
and [economy contract](economy-integrity.md).

Account unlocking requires an admin. This mitigates CVE-2026-11779 / GHSA-jg8r-5jh2-v2xj for this auth collection. Payload 3.88.0 still triggers the dependency audit because no upstream patched release is listed; do not suppress that advisory globally. Re-evaluate it when Payload publishes a fix.

Tests in `tests/user-access.test.ts` exercise anonymous, player, forged-input, and admin permissions for creation, updates, and unlocking. `tests/game-sync-auth.test.ts` verifies that sync uses the authenticated user, authenticates once, and returns private timing metadata.

The final isolated integration run passed **141 assertions**, including real
Local API, REST, GraphQL, and direct Server Action authorization checks. Private
receipt owner-denial tests include administrator positive controls. The suite
also exercises concurrent invitation redemption, different-UUID daily claims,
milestone/finish races, and durable claim replay.
Production proxy/firewall configuration and deployment environment prerequisites
remain operational verification tasks; no production deployment was performed.
