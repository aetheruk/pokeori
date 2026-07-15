# Pokeori - Payload CMS + Next.js + Bun
# To use this Dockerfile, set `output: 'standalone'` in your next.config.mjs file.

FROM oven/bun:1.3.13-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json bun.lock* ./
RUN bun install --frozen-lockfile

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
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
    export DATABASE_URI="$(cat /run/secrets/DATABASE_URI 2>/dev/null || printf 'mongodb://127.0.0.1:27017/pokeori')" && \
    export PAYLOAD_SECRET="$(cat /run/secrets/PAYLOAD_SECRET 2>/dev/null || printf 'pokeori-build-only-placeholder')" && \
    export RESEND_API_KEY="$(cat /run/secrets/RESEND_API_KEY 2>/dev/null || printf 're_pokeori-build-only-placeholder')" && \
    export REDIS_URL="$(cat /run/secrets/REDIS_URL 2>/dev/null || printf 'redis://127.0.0.1:6379')" && \
    bun next build --webpack

# Production image, copy all the files and run next
FROM base AS runner

WORKDIR /app

ENV NODE_ENV=production

RUN addgroup -g 1001 -S bunjs && \
    adduser -S nextjs -u 1001

COPY --from=builder /app/public ./public

COPY --from=deps /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:bunjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:bunjs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

CMD ["bun", "server.js"]
