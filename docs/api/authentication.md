# Authentication Flow

Authentication handled by Payload CMS.

## Login
1. User submits email/password to `POST /api/users/login`
2. Payload returns session cookie
3. Cookie is automatically sent with subsequent requests

## Registration
1. User submits email/password to `POST /api/users`
2. Verification email sent (via Resend)
3. User verifies email to activate account

## Session Management
- Authentication uses Payload's HTTP-only `payload-token` cookie
- Player tokens have a 30-day lifetime
- The persistent game shell calls `POST /api/users/refresh-token` when play
  begins, after returning from a sufficiently long background period, and
  before the current token expires
- Temporary refresh failures are retried without navigating away from the
  current game screen
- Logout: `POST /api/users/logout`

## Auth Checks
All API routes check auth via Payload's `getPayload()` utility.
Example in custom route:
```typescript
const payload = await getPayload({ config })
const { user } = await payload.auth({ headers: req.headers })
if (!user) return new NextResponse('Unauthorized', { status: 401 })
```

Client game-data sync errors are not themselves proof that the cookie expired.
`UserContext` only navigates to `/auth` when `/api/game/sync` reports an
authentication status and the independent `POST /api/auth/check` request
confirms that the session is no longer valid. Rate limits, server failures, and
network interruptions retain the latest usable SWR snapshot.
