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
# These values are only used while compiling the image. The real runtime
# values must be configured in Coolify and are not copied into the runner.
ARG DATABASE_URI=mongodb://127.0.0.1:27017/pokeori
ARG PAYLOAD_SECRET=pokeori-build-only-placeholder
ARG RESEND_API_KEY=re_pokeori-build-only-placeholder
ARG REDIS_URL=redis://127.0.0.1:6379
ENV DATABASE_URI=${DATABASE_URI}
ENV PAYLOAD_SECRET=${PAYLOAD_SECRET}
ENV RESEND_API_KEY=${RESEND_API_KEY}
ENV REDIS_URL=${REDIS_URL}
RUN bun next build --webpack

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
