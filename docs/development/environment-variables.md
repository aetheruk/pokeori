# Environment Variables

Required environment variables for Pokeori.

Audit remediation adds `BETA_INVITATION_SECRET` (at least 32 characters), required to issue/accept signed, expiring, single-use registration invitations. There is no shared public beta-code fallback. See [registration invitations](registration-invitations.md).

The nonce CSP is enforced by default. `CSP_ENFORCE=false` temporarily switches to report-only for diagnosis; restore enforcement after resolving violations. Client Zod validation runs without dynamic code generation, and Payload uses its local default avatar. `GAME_PERFORMANCE_LOGS=true` emits structured sync timing/size measurements without user IDs or game payloads. Leave it off unless collecting a profiling window. `POKEORI_UI_TEST` and `POKEORI_TEST_DIST_DIR` are local test settings, not production deployment inputs.

## `.env.example`
Create a `.env` file based on this template:

```env
# Database (MongoDB)
DATABASE_URI=mongodb://localhost:27017/pokeori

# Payload CMS
PAYLOAD_SECRET=your-long-random-secret-key-here

# Email (Resend)
RESEND_API_KEY=re_your-resend-api-key-here

# Google Gemini (optional, for AI features)
GEMINI_API_KEY=your-gemini-api-key-here

# Redis (optional, defaults to localhost:6379)
REDIS_URL=redis://localhost:6379

# Stable 32-byte base64 key shared by production builds/replicas
NEXT_SERVER_ACTIONS_ENCRYPTION_KEY=

# Enable only when the origin is restricted to the named proxy
TRUST_CLOUDFLARE_PROXY=false
TRUST_PROXY_HEADERS=false

# Next.js
NEXT_PUBLIC_APP_URL=https://localhost:3000
```

## Variable Descriptions
| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URI` | ✅ | MongoDB connection string |
| `PAYLOAD_SECRET` | ✅ | Random string for Payload session signing |
| `RESEND_API_KEY` | ✅ | Resend API key for transactional email |
| `GEMINI_API_KEY` | ❌ | Google Gemini API key (for AI features) |
| `REDIS_URL` | ❌ | Redis connection URL (defaults to localhost) |
| `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` | ✅ production | Stable 32-byte base64 key used to build Server Actions |
| `TRUST_CLOUDFLARE_PROXY` | ✅ production | Trust `CF-Connecting-IP`; enable only when direct origin access is blocked |
| `TRUST_PROXY_HEADERS` | ❌ | Trust forwarded IP headers from another controlled proxy |
| `NEXT_PUBLIC_APP_URL` | ✅ | Public URL of the application |

## Security Notes
⚠️ Never commit `.env` to git. It is already added to `.gitignore`.
⚠️ Rotate secrets immediately if exposed (see [Security Report](/docs/audit/security-report.md))
## Trusted proxy chain

`TRUSTED_PROXY_HOPS` selects the address that many entries from the right of
`X-Forwarded-For` when `TRUST_PROXY_HEADERS=true` (default 1, maximum 10).
Only configure it after verifying every request crosses that many trusted,
header-appending proxies. Cloudflare mode requires a firewall-protected origin
and a single valid `CF-Connecting-IP`. Invalid addresses fail to the shared
`unknown` rate-limit identity.
