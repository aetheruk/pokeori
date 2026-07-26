# Deployment Guide

Deploy Pokeori to production.

## Prerequisites
- MongoDB database (hosted, e.g., MongoDB Atlas)
- Redis instance (hosted, e.g., Upstash)
- Payload CMS compatible hosting (Vercel, Railway, etc.)

## Build for Production
```bash
bun run build
```

Docker deployments use Bun for dependency installation and the standalone server runtime. The disposable builder stage compiles Next with Node for stable Alpine worker behavior; Node is not copied into the runtime image. Dependency, Next compiler, and GHCR registry caches are reused between releases.

## Environment Setup
Set all production environment variables:
- `DATABASE_URI`: Production MongoDB connection string
- `PAYLOAD_SECRET`: Strong random secret (generate with `openssl rand -hex 32`)
- `RESEND_API_KEY`: Production Resend API key
- `NEXT_PUBLIC_APP_URL`: Production URL (e.g., `https://pokeori.app`)
- `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY`: Stable 32-byte base64 build secret
- `TRUST_CLOUDFLARE_PROXY=true`: Only when direct origin access is firewalled

## Deployment Options

### Vercel (Recommended for Next.js)
1. Push code to GitHub
2. Import repository in Vercel
3. Set environment variables
4. Deploy

### Docker
1. Build the checked-in `Dockerfile`
2. Run the generated standalone Next server

## Post-Deployment
1. Follow the prepare/finalize index procedure in the [performance runbook](/docs/development/performance-runbook.md)
2. Verify API endpoints
3. Test critical user flows
4. Monitor error logs
