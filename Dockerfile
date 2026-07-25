# syntax=docker/dockerfile:1.7

# Bun is the package manager, build runtime, and production runtime.
FROM oven/bun:1.3.10-alpine AS base
WORKDIR /app

RUN apk add --no-cache libc6-compat

# Copy lockfiles before application source so dependency installation is reused
# unless the dependency graph changes. The cache mount retains Bun's package
# downloads even when the dependency layer must be rebuilt.
FROM base AS deps
COPY package.json bun.lock ./
RUN --mount=type=cache,id=pokeori-bun-cache,target=/root/.bun/install/cache \
    bun install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1
ENV NEXT_IGNORE_TYPECHECK=true
# These values are only used while compiling the image. Real runtime values
# are configured in Coolify and are never copied into the runner image. The
# optional BuildKit mounts allow callers to provide build-time values without
# persisting them in an image layer; placeholders keep PR builds independent
# of external services.
RUN --mount=type=secret,id=DATABASE_URI,required=false \
    --mount=type=secret,id=PAYLOAD_SECRET,required=false \
    --mount=type=secret,id=RESEND_API_KEY,required=false \
    --mount=type=secret,id=REDIS_URL,required=false \
    --mount=type=cache,id=pokeori-next-cache,target=/app/.next/cache \
    export DATABASE_URI="$(cat /run/secrets/DATABASE_URI 2>/dev/null || printf 'mongodb://127.0.0.1:27017/pokeori')" && \
    export PAYLOAD_SECRET="$(cat /run/secrets/PAYLOAD_SECRET 2>/dev/null || printf 'pokeori-build-only-placeholder')" && \
    export RESEND_API_KEY="$(cat /run/secrets/RESEND_API_KEY 2>/dev/null || printf 're_pokeori-build-only-placeholder')" && \
    export REDIS_URL="$(cat /run/secrets/REDIS_URL 2>/dev/null || printf 'redis://127.0.0.1:6379')" && \
    bun run build

# Production image: Bun runs the generated standalone Next.js server.
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -S pokeori && \
    adduser -S pokeori -u 1001 -G pokeori

COPY --from=builder --chown=pokeori:pokeori /app/public ./public

COPY --from=deps --chown=pokeori:pokeori /app/node_modules ./node_modules
COPY --from=builder --chown=pokeori:pokeori /app/.next/standalone ./
COPY --from=builder --chown=pokeori:pokeori /app/.next/static ./.next/static

USER pokeori

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "server.js"]
