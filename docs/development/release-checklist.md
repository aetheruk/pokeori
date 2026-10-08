# Release Checklist

Use this checklist before deploying gameplay, schema, security, or generated-data
changes.

## Security
- Run `bun run security:audit`. The 0.44.0 dependency set reports no advisories. Payload packages must stay on matching versions (currently 3.90.2); Sharp is 0.35.5. Overrides keep fast-copy, shell-quote, and source-map-js on patched releases, while Sass 1.105.1 removes the unpatched braces dependency from the old watcher chain. The audit still verifies the admin-only unlock policy if the earlier named Payload advisory is ever reported again, and rejects other advisories.
- Rotate credentials known to have been exposed to unauthorized parties.
- Confirm production has `DATABASE_URI`, `PAYLOAD_SECRET`, and `RESEND_API_KEY`.
- Confirm GitHub Actions has `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` as a build secret and Coolify has the same stable value at runtime. Keep the unlinked `pokeori-production` GHCR package and its registry build cache private.
- Confirm `.env` is ignored and no real secrets are committed.
- Configure `BETA_INVITATION_SECRET` and use the signed, expiring, single-use invitation workflow for registration.
- Confirm the main app contains no `/dev` authoring routes. The local Content Studio is not part of the production image, and its direct file-writing actions require its local opt-in.
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
- GitHub Actions does not run or require validation jobs for release publication. Run the relevant commands above manually when validating a change.
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
- The Gym Chronicle reset, Fuchsia Guild conversions, and Underground Society initialization were one-off data migrations for earlier releases. They are not part of the current release workflow and their utilities are not bundled into the production image. Keep any future data migration as an explicit, separately reviewed operation with a fresh backup and dry run.
- Confirm Redis is reachable and TLS settings match the deployment environment.
- Confirm `/api/health` checks MongoDB, replica-set transaction support, and Dragonfly, and Coolify reports one healthy application replica.
- Deploy to staging first when available.
- After GitHub Actions and the Coolify Docker Image resource are configured, merge the release PR to `main`; GitHub builds and publishes `ghcr.io/aetheruk/pokeori-production` and then calls Coolify's authenticated deploy webhook. Coolify pulls the image and does not build the Dockerfile. No local production build or publish step is required.
- Check server logs for request IDs on API failures.
- Verify login, Explore, Pokemon box, one battle, one location encounter, one Mini Game, and one Field Research study.
- With an already-open PWA session, confirm it detects the new `/api/app-version` response and reloads to the latest client bundle.
