# Registration invitations

Registration uses signed, expiring, single-use invitations. The old shared beta
code is no longer accepted. Generic Payload user creation is administrator-only;
the application registration action is the player signup entry point.

## Configure the signing secret

Generate a random secret with `openssl rand -base64 32` and configure it as
`BETA_INVITATION_SECRET` in the application runtime and the trusted operator's
local environment. Keep the same value in both places. Never commit it or put it
in a `NEXT_PUBLIC_` variable. Missing or short secrets disable registration.
Rotating this secret invalidates all unredeemed invitations.

Registration also needs MongoDB transaction support and the existing unique
`economy-action-receipts.key` index. Follow the performance-index migration in the
release runbook before enabling signup. Account creation and invitation receipt
are committed together; duplicate receipt insertion rolls back the new account.
The receipt binds the invitation UUID to the new user. Do not delete invitation
receipts while their invitations remain valid.

## Issue an invitation

With `BETA_INVITATION_SECRET` available locally:

```sh
bun scripts/issue-registration-invitation.ts
bun scripts/issue-registration-invitation.ts 3
```

The optional argument is the lifetime in days: default seven, range one to
thirty. The command signs locally, prints the expiry and code, and makes no
network or database calls. Share that code privately with its intended recipient;
the first successful signup consumes it. Issue a separate code for each person.

Players paste the code into the beta invitation field. Passwords must contain
12–128 characters. Signup is limited to ten attempts per fifteen minutes per
trusted client IP and five per hour per normalized email. The configured proxy
must strip untrusted forwarding headers; without trusted IP configuration the
application deliberately shares an `unknown` IP rate-limit bucket.

An expired, malformed or modified token is rejected before account creation.
If account creation fails, its invitation remains unconsumed after rollback. If
signup commits but the subsequent automatic login fails, the account exists and
the invitation is consumed; the player can sign in normally.

## Validation

```sh
bun test tests/security-boundaries.test.ts tests/registration-invitation-transaction.test.ts tests/user-access.test.ts
```

The unit suite covers token expiry/tampering, controlled account creation, protected collection
access, action boundaries and atomic invitation consumption/rollback with a
transaction adapter.

The isolated integration runner additionally exercises real MongoDB transactions
and collection access. With the test services in `compose.test.yml` running and
the `audit-rs` replica set initialized, run:

```sh
NODE_ENV=test \
DATABASE_URI='mongodb://127.0.0.1:27028/pokeori_security_test?replicaSet=audit-rs&directConnection=true' \
REDIS_URL='redis://127.0.0.1:6399' \
PAYLOAD_SECRET='integration-test-payload-secret' \
RESEND_API_KEY='re_integration_test' \
bun --preload ./tests/setup.ts scripts/test-security-integration.ts
```

The runner asserts loopback hosts, dedicated ports and the test database before
importing Payload. It creates its own tagged fixtures and removes them afterward.
It verifies concurrent redemption creates exactly one account/receipt and rolls
back the losing account, failed creation preserves the invitation, and bilateral
friendship writes remain atomic under injected failure and concurrency.

For HTTP checks, start an isolated Next development server on `127.0.0.1:3110`
using the same database, Redis and Payload secret, with
`BETA_INVITATION_SECRET=integration-test-only-invitation-signing-secret` and
`POKEORI_TEST_DIST_DIR=.next-security`. Add
`SECURITY_TEST_ORIGIN=http://127.0.0.1:3110` to the runner command. This also checks
REST/GraphQL access, direct developer/Pokémon Server Action authorization,
server-derived identification level, trainer relation projection, registration
and invitation replay through the actual signup action, and the emitted action
manifest. Restart/stop only that test server, never the user's normal server.

A release smoke test should still verify the installed production database's
required indexes and transaction support without using this fixture runner
against production.
