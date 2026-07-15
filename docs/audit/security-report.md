# Security Audit Report

## Critical Issues

### 1. Exposed Environment Variables
**Severity**: 🔴 Critical  
**Location**: `.env` (lines 1-5)  
**Description**: The `.env` file contains unencrypted production credentials:
- `DATABASE_URI`: Full MongoDB connection string with credentials
- `PAYLOAD_SECRET`: CMS session signing key
- `RESEND_API_KEY`: Email service API key
- `GEMINI_API_KEY`: Google Gemini API key

**Impact**: Full database access, unauthorized CMS access, API quota theft.

**Fix Required**:
1. Rotate all exposed secrets immediately
2. Purge `.env` from git history if committed (use `git filter-repo`)
3. Use `.env.example` for reference (never commit real secrets)

### 2. Insecure Redis TLS Configuration
**Severity**: 🔴 Critical  
**Location**: `src/utilities/redis.ts:17`  
**Description**: `rejectUnauthorized: false` disables TLS certificate validation for Redis connections.

**Impact**: Man-in-the-middle attacks on Redis traffic.

**Fix Applied**: ✅ Set `rejectUnauthorized: true`

### 3. Missing API Rate Limiting
**Severity**: 🟡 High  
**Location**: All `/api/*` routes  
**Description**: No rate limiting on API endpoints, allowing brute force or abuse.

**Fix Applied**: ✅ `/api/game/sync` and `/api/auth/check` use the shared per-IP
limiter, forwarded IP extraction is centralized, and the in-memory limiter now
prunes inactive IP buckets to avoid unbounded growth.

**Fix Required**: Continue reviewing sensitive server actions for action-specific
limits; API routes currently share rate limiting.

## High Priority Issues

### 4. No Request Validation on API Routes
**Severity**: 🟡 High  
**Location**: `/src/app/api/*`  
**Description**: API routes only check authentication, not input validation.

**Partial Fix Applied**: `/api/game/sync` validates its query string with Zod,
`/api/auth/check` rejects unexpected bodies, and research server actions now
validate encounter IDs, reset flags, submitted answers, completion success,
final scores, loss counts, and consumed Pokemon selections before using them in
Redis keys, history, or reward/completion logic.

**Fix Required**: Use Zod schemas to validate all remaining incoming request bodies/params.

### 5. Research Reward Integrity
**Severity**: 🟡 High  
**Location**: `src/app/(frontend)/game/research/actions.ts`  
**Description**: Endless milestone rewards could be claimed during a session and
then paid again on completion. Milestone claim idempotency was also keyed only by
user/encounter/score, not by the specific session start time.

**Fix Applied**: ✅ Endless milestone calculation now excludes already claimed
scores during completion, claim idempotency is scoped to the active session, and
the shared score anti-cheat helper is covered by tests.

### 6. Dynamic Evaluation in Developer Tools
**Severity**: 🟡 High  
**Location**: `src/app/dev/actions.ts`  
**Description**: Developer entry reading previously evaluated TypeScript array contents.

**Fix Applied**: ✅ `/dev` is admin-gated at the layout and server-action layers, entry filenames are constrained, and entry arrays are parsed via the TypeScript AST instead of `eval`.

### 7. Redis Lock Script
**Severity**: 🟢 Low
**Location**: `src/utilities/redis.ts` (`deleteIfValue`)
**Description**: Redis uses a fixed Lua script for compare-and-delete lock release. Inputs are passed as `KEYS`/`ARGV`; no user-provided script text is executed.

**Fix Required**: None currently; keep script text static.

## Recommendations
1. Use a secrets manager (Vault, AWS Secrets Manager) for production
2. Enable Payload CMS's built-in rate limiting
3. Add security headers via Next.js `next.config.mjs`
4. Implement input validation on all API routes
5. Continue moving game-specific completion rules into server-side validators
