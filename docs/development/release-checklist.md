# Release Checklist

Use this checklist before deploying gameplay, schema, security, or generated-data
changes.

## Security
- Rotate any credentials that have ever appeared in `.env` or logs.
- Confirm production has `DATABASE_URI`, `PAYLOAD_SECRET`, and `RESEND_API_KEY`.
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
- Back up production MongoDB before schema or data migrations.
- Confirm Redis is reachable and TLS settings match the deployment environment.
- Deploy to staging first when available.
- Check server logs for request IDs on API failures.
- Verify login, Explore, Pokemon box, one battle, one location encounter, and one mini-game.
