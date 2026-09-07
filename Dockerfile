# syntax=docker/dockerfile:1

# Bun is the package manager, build runtime, and production runtime. Keep the
# image on the same stable patch used by packageManager in package.json.
FROM oven/bun:1.4.2-alpine AS base
WORKDIR /app

# Refresh OS security packages when advancing this base stage. Bun's 1.4.2
# image shipped OpenSSL 3.5.7; Alpine 3.5.8 fixes CVE-2026-14456.
RUN apk upgrade --no-cache && apk add --no-cache libc6-compat

# Copy lockfiles before application source so dependency installation is reused
# unless the dependency graph changes. The cache mount retains Bun's package
# downloads even when the dependency layer must be rebuilt.
FROM base AS deps
COPY package.json bun.lock ./
RUN --mount=type=cache,id=pokeori-bun-cache,target=/root/.bun/install/cache,sharing=locked \
    NODE_ENV=development bun install --frozen-lockfile

FROM base AS builder

COPY --from=deps /app/node_modules ./node_modules
# Public assets are copied directly into the runner. Artwork-only changes do
# not need to invalidate the compiler layer.
COPY package.json next.config.mjs tsconfig.json postcss.config.mjs ./
COPY src ./src
COPY scripts/reset-gym-chronicles-v2.ts ./scripts/reset-gym-chronicles-v2.ts

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_IGNORE_TYPECHECK=true
ENV POKEORI_BUILD_LIBC=musl
# Coolify injects build secrets as environment mounts on RUN instructions.
# Local Docker diagnostics can supply the same key using the file mount below;
# prefer Coolify's environment value when present. Never compile a production
# image with a public placeholder Server Actions key (Next embeds it in output).
RUN --mount=type=secret,id=NEXT_SERVER_ACTIONS_ENCRYPTION_KEY,required=false \
    --mount=type=cache,id=pokeori-next-cache,target=/app/.next/cache,sharing=locked \
    export DATABASE_URI="${DATABASE_URI:-mongodb://127.0.0.1:27017/pokeori}" && \
    export PAYLOAD_SECRET="${PAYLOAD_SECRET:-pokeori-build-only-placeholder}" && \
    export RESEND_API_KEY="${RESEND_API_KEY:-re_pokeori-build-only-placeholder}" && \
    export REDIS_URL="${REDIS_URL:-redis://127.0.0.1:6379}" && \
    export NEXT_SERVER_ACTIONS_ENCRYPTION_KEY="${NEXT_SERVER_ACTIONS_ENCRYPTION_KEY:-$(cat /run/secrets/NEXT_SERVER_ACTIONS_ENCRYPTION_KEY 2>/dev/null)}" && \
    { test -n "$NEXT_SERVER_ACTIONS_ENCRYPTION_KEY" || { echo 'Set NEXT_SERVER_ACTIONS_ENCRYPTION_KEY as a Coolify build secret.' >&2; exit 1; }; } && \
    bun build scripts/reset-gym-chronicles-v2.ts --target=bun --outfile /tmp/reset-gym-chronicles-v2.js && \
    bun --bun next build --turbopack

# Production image: Bun runs the generated standalone Next.js server.
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S pokeori && \
    adduser -S pokeori -u 1001 -G pokeori

COPY --chown=pokeori:pokeori public ./public

COPY --from=builder --chown=pokeori:pokeori /app/.next/standalone ./
COPY --from=builder --chown=pokeori:pokeori /app/.next/static ./.next/static
COPY --from=builder --chown=pokeori:pokeori /tmp/reset-gym-chronicles-v2.js ./scripts/reset-gym-chronicles-v2.js

USER pokeori

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

HEALTHCHECK --interval=30s --timeout=10s --start-period=60s --retries=3 \
  CMD wget -q -T 10 -O /dev/null http://127.0.0.1:3000/api/health || exit 1

CMD ["bun", "server.js"]
