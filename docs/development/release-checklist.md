# Release Checklist

Use this checklist before deploying gameplay, schema, security, or generated-data
changes.

## Security
- Run `bun run security:audit`. It checks the actual admin-only unlock policy before accepting Payload's one named upstream advisory and rejects new advisories.
- Rotate credentials known to have been exposed to unauthorized parties.
- Confirm production has `DATABASE_URI`, `PAYLOAD_SECRET`, and `RESEND_API_KEY`.
- Confirm Coolify has the same stable `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` enabled for build and runtime, with Docker Build Secrets enabled.
- Confirm `.env` is ignored and no real secrets are committed.
- Configure `BETA_INVITATION_SECRET` and use the signed, expiring, single-use invitation workflow for registration.
- Confirm `/dev` and `/ui-test` routes are unavailable in production, including direct authoring actions.
- Confirm CSP is enforced; check legitimate player/admin flows without adding production `unsafe-eval`.
- Confirm sensitive routes/actions are rate-limited or queued.

## Data Integrity
- Run `bun run validate:data`.
- Confirm generated game entries pass schema validation.
- Review any allowlisted unresolved references in `tests/data-references.test.ts`.
- Verify new rewards point to real item, currency, and task IDs.
- Verify `requirements`, `criteria`, `hide`, `overrides`, and daily locks match the intended unlock flow.
- For economy changes, confirm every related MongoDB write shares one Payload transaction request and retries use a stable action identity.

## Quality Gates
- Run `bun run lint`.
- Run `bun run typecheck`.
- Run `bun test`.
- Run `bun run test:security:integration` and `bun run test:e2e` against the isolated services described in the testing guide.
- Require both Validate jobs in branch protection on the exact merge candidate. Merely adding a workflow does not enforce this.
- Run focused manual smoke tests for changed game modes.

## Gameplay
- Test cost-bearing games with insufficient balance, exact balance, and repeated submit/claim attempts.
- Test timed games after tab background/resume.
- Test mobile touch targets and keyboard-safe layouts.
- Test reward summary and user data refresh after completion.

## Rollout
- Increment `package.json` to a new semantic version for this release; do this for every production deploy, including content updates and hotfixes.
- Back up production MongoDB before schema or data migrations.
- Keep durable receipt keys and responses indefinitely; compressed responses require a compatible reader during rollback. Run the receipt storage report before optional bounded compaction.
- For 0.1.1, run `migrate:performance-indexes` prepare and finalize phases using the performance runbook; never let production Payload auto-build these indexes at startup.
- For the 0.1.0 activity split, run `bun run migrate:game-activity-domains --dry-run`, review the counts, then run `bun run migrate:game-activity-domains`.
- For the 0.13.0 Gym Chronicle rebuild, run `bun scripts/reset-gym-chronicles-v2.js --dry-run` inside the deployed production container, review the counts, then run `bun scripts/reset-gym-chronicles-v2.js`. The command is bundled in the image and must not be run before the v2 image is live.
- Confirm Redis is reachable and TLS settings match the deployment environment.
- Confirm `/api/health` checks MongoDB, replica-set transaction support, and Dragonfly, and Coolify reports one healthy application replica.
- Deploy to staging first when available.
- Merge the validated release PR to protected `main`; Coolify automatically builds the Dockerfile and deploys. No local production build or publish step is required. Preserve the host's build caches.
- Check server logs for request IDs on API failures.
- Verify login, Explore, Pokemon box, one battle, one location encounter, one Mini Game, and one Field Research study.
- With an already-open PWA session, confirm it detects the new `/api/app-version` response and reloads to the latest client bundle.
