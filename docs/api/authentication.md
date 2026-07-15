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
- Sessions stored in Payload CMS
- Token refresh endpoint: `POST /api/users/refresh-token`
- Logout: `POST /api/users/logout`

## Auth Checks
All API routes check auth via Payload's `getPayload()` utility.
Example in custom route:
```typescript
const payload = await getPayload({ config })
const { user } = await payload.auth({ headers: req.headers })
if (!user) return new NextResponse('Unauthorized', { status: 401 })
```
