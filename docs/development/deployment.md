# Deployment Guide

Deploy Pokeori to production.

## Prerequisites
- PostgreSQL database (hosted, e.g., Supabase, Neon)
- Redis instance (hosted, e.g., Upstash)
- Payload CMS compatible hosting (Vercel, Railway, etc.)

## Build for Production
```bash
bun run build
```

Docker deployments use Bun for dependency installation, the Next build, and the standalone server runtime.

## Environment Setup
Set all production environment variables:
- `DATABASE_URI`: Production PostgreSQL connection string
- `PAYLOAD_SECRET`: Strong random secret (generate with `openssl rand -hex 32`)
- `RESEND_API_KEY`: Production Resend API key
- `NEXT_PUBLIC_APP_URL`: Production URL (e.g., `https://pokeori.app`)

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
1. Run Payload CMS migrations
2. Verify API endpoints
3. Test critical user flows
4. Monitor error logs
