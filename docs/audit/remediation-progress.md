# Audit remediation progress

Objective: implement and verify every finding in [the September application audit](application-audit-2026-09-07.md). Release version: **0.29.12**, including the Onix Snake artwork and controls. Prepared in [draft PR #348](https://github.com/aetheruk/pokeori/pull/348) on `audit/application-remediation-0.29.12`; no release has been merged or deployed. Operational verification below remains separate from implementation.

| Findings | Implementation and evidence | Remaining verification |
| --- | --- | --- |
| S1–S5 | Internal battle/progress/expedition helpers are server-only; generic gameplay writes are admin-only; all developer actions authorize and fail closed in production. Real REST, GraphQL and raw action tests pass. Final Linux manifest contains 192 intended actions and none of the banned internal exports. | Hosted CI and deployed route checks |
| S6, S14 | Completed/stale daily generations rejected inside settlement; expiring user/task answer proofs and rate limits protect password-gated completion. | Hosted CI |
| S7–S8 | All 29 game types have explicit authority models; seeded replay/checkpoints for arcade games including Snake/Brick, server boards for Match3, deterministic paid Pachinko, private casino outcomes, complete puzzle transcripts and stored round wins. See [mode inventory](game-authority-verification-2026-09-07.md). | Legal input replay is not proof of human play; exhaustive manual play of all authored entries is not claimed |
| S9 | Generic registration is admin-only; controlled signup uses signed expiring single-use invitations with transactional redemption and rate limits. Actual duplicate/concurrent/rollback tests pass. | Configure the new invitation secret before release |
| S10 | Both friendship records settle together; pending/kid-mode/duplicate checks and bounded history; real concurrent request and rollback tests. | Hosted CI |
| S11 | Default enforced nonce CSP, secure/SameSite cookies, validated proxy IP parsing, public trainer DTOs, private receipt reads, supported GraphQL, named upstream advisory mitigation. Five authenticated player/admin production routes report zero CSP violations or page errors. | Actual origin firewall/proxy chain and hosted environment are not verified |
| S12–S13 | Shared session locks, durable milestone identities, transactional progression/rewards; both PVP players settle together. Capture/item/escape use immutable commands, semantic encounter revisions and a durable Redis publication bridge. Actual crash/stale-state retries do not double-spend or reward. | Hosted CI and rollout health |
| U1–U3 | Shared visible startup/result retry, immutable replay, checkpoint recovery and safe PWA reload; canceled old-run countdown and stale route responses covered. | Broader authenticated surface/device matrix remains to be documented |
| U4–U9 | Keyboard scratch/Art, usable landscape board, reduced motion, PVP transport recovery, persistent auth errors, consistent navigation, restored semantic/keyboard/Hook lint rules. | Fixtures and sampled production routes are not complete screen-reader or every-surface certification |
| P1–P2 | Parallel independent reads and reused tasks; complete, safely projected Explore read model with ownership/hook/default fallbacks; public relation DTOs and validated existing pagination. Exact Payload row parity at 1,002 Pokemon. Local Explore samples improve from 350–372ms to 71–73ms. | Production p50/p95; complete snapshots remain untruncated |
| P3 | Reward-domain mutation hints update shared account state and invalidate affected scopes only. | Real UserProvider browser test verifies scoped refresh and cached wallet propagation; production route revisit makes zero sync requests |
| P4–P5 | Native Turbopack analysis; per-mode dynamic client registry; compact item icon index with 3,236-ID parity. Run initial decoded JS falls 41.55%; reproducible gzip route budgets added to production smoke. | All five gzip budgets pass in the final Linux smoke; hosted CI pending |
| P6 | Removed obsolete analyzer and unnecessary forced authoring-package tracing; Linux standalone runtime/admin/GraphQL/Sharp/email-adapter smoke passes. Image falls from 225,721,879 to 220,143,248 bytes. | No unsafe blanket removal of dependencies still traced by Next |
| P7 | Pinned validation and isolated browser/security workflows. GitHub protected main now requires both jobs with an up-to-date branch; API readback confirmed. | Workflow published in draft PR #348; hosted CI running |
| P8–P9 | Bun/Next/Docker caches preserved; local Linux builds and sync/query measurements recorded; privacy-safe performance logging and metadata-only storage tooling. | Privacy-safe action/lock telemetry and six focused tests pass; live idle resource/index/eviction and old-release build baseline verified; build-time peaks and complete ingress trust remain pending |
| P10 | Current performance guidance replaces obsolete SWR/service-worker advice; Biome migrated and relevant checks restored. | Current measurement and release-state documentation updated |
| P11 | Navigation prefetch on intent, one media-selected auth image, existing paginated readers preserved. Mobile/desktop image network checks pass. | Same 160-card production comparison falls from eight 412–562ms long tasks to zero; keyboard focus return passes |
| P12 | Lossless receipt compression with bounded decoding/encoding, permanent semantic keys and admin-only result access; actual Mongo replay/alias tests. Read-only storage report and bounded cursor-based old-result compactor. | Live metadata: 4,739 receipts, 12.4 MB logical / 2.85 MB allocated, unique permanent key and no TTL. No production compaction; growth trend needs repeat measurement |

## Verification recorded

- Full Bun suite: **1,540 passed, 0 failed**, 78,563 assertions across 177 files.
- Data validation: **424 passed, 0 failed**.
- Actual isolated REST/GraphQL/Server Action and transaction integration: **141 assertions passed**.
- Standard browser suite: **17 passed**, two intentionally skipped opt-in production tests. Separate final production run passed three tests covering Explore, Pokemon, Inventory, Run, Payload admin, gzip budgets, populated-box interaction and scoped sync.
- Typecheck, lint, dependency policy audit and diff whitespace checks passed. The dependency audit explicitly verifies the mitigation for one named Payload advisory; it does not report zero upstream advisories.
- Linux health returned MongoDB, transaction and Redis readiness. Version endpoint returned **0.29.12** with no-store; production developer and UI fixture routes returned 404.
- [Production browser evidence](production-browser-verification.md), [large-account baseline](large-account-query-baseline.json), and [after/parity evidence](large-account-query-after.json) describe measurement conditions.

The Run comparison is decoded JavaScript response bodies, not wire transfer or latency. Explore measurements are two warm local development samples, not production p95. Build timings across changing source/cache states are observations, not a controlled speedup claim.

## Release and operational follow-up

Configure `BETA_INVITATION_SECRET` (at least 32 characters), retain the stable build/runtime Server Actions encryption key, and verify trusted proxy hops against the actual network. Default CSP enforcement has been exercised in a clean Linux browser. Both required CI jobs must pass on the release candidate before merging.

Receipt compression preserves exact results and permanent replay protection but requires a compatible reader during rollback. Do not roll back to a version unable to decode compressed receipts; do not TTL durable identities. No production receipt compaction, index changes or load test has been performed.

After the direct database connection timed out, the existing Coolify session allowed read-only production verification. [Operational evidence](production-operations-2026-09-07.md) confirms the installed compound indexes, permanent receipt keys, Dragonfly noeviction/zero evictions, healthy 0.29.11 endpoints and an idle N150 resource snapshot. Sentinel metrics are disabled; build-time peaks, receipt growth trend, complete ingress/firewall trust and post-deploy PWA verification remain outstanding. The new invitation secret is absent and must be configured before release. Preserve caches; use the existing deployment and performance runbooks.
