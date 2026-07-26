# Release Checklist

Use this checklist before deploying gameplay, schema, security, or generated-data
changes.

## Security
- Rotate any credentials that have ever appeared in `.env` or logs.
- Confirm production has `DATABASE_URI`, `PAYLOAD_SECRET`, and `RESEND_API_KEY`.
- Confirm the release machine has the stable `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`.
- Confirm `.env` is ignored and no real secrets are committed.
- Confirm `/dev` routes are inaccessible to non-admin users.
- Confirm sensitive routes/actions are rate-limited or queued.

## Data Integrity
- Run `bun run validate:data`.
- Confirm generated game entries pass schema validation.
- Review any allowlisted unresolved references in `tests/data-references.test.ts`.
- Verify new rewards point to real item, currency, and task IDs.
- Verify `requirements`, `criteria`, `hide`, `overrides`, and daily locks match the intended unlock flow.

## Quality Gates
- Run `bun run lint`.
- Run `bun run typecheck`.
- Run `bun test`.
- Run focused manual smoke tests for changed game modes.

## Gameplay
- Test cost-bearing games with insufficient balance, exact balance, and repeated submit/claim attempts.
- Test timed games after tab background/resume.
- Test mobile touch targets and keyboard-safe layouts.
- Test reward summary and user data refresh after completion.

## Rollout
- Increment `package.json` to a new semantic version for this release; do this for every production deploy, including content updates and hotfixes.
- Back up production MongoDB before schema or data migrations.
- For 0.1.1, run `migrate:performance-indexes` prepare and finalize phases using the performance runbook; never let production Payload auto-build these indexes at startup.
- For the 0.1.0 activity split, run `bun run migrate:game-activity-domains --dry-run`, review the counts, then run `bun run migrate:game-activity-domains`.
- Confirm Redis is reachable and TLS settings match the deployment environment.
- Confirm `/api/health` checks both MongoDB and Dragonfly and Coolify reports one healthy replica.
- Deploy to staging first when available.
- Check server logs for request IDs on API failures.
- Verify login, Explore, Pokemon box, one battle, one location encounter, one Mini Game, and one Field Research study.
- With an already-open PWA session, confirm it detects the new `/api/app-version` response and reloads to the latest client bundle.
