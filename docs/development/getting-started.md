# Getting Started

Set up Pokeori locally.

## Prerequisites
- Node.js 22 or newer
- pnpm 10.24.0
- Bun 1.3.13 for the current test runner and data scripts
- MongoDB database
- Redis server

## Steps
1. **Clone Repository**
   ```bash
   git clone <repo-url>
   cd pokeori
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Setup Environment**
   Copy `.env.example` to `.env` and fill in values:
   ```bash
   cp .env.example .env
   ```
   See [Environment Variables](/docs/development/environment-variables.md) for details.

4. **Start Redis**
   Redis is included in `tools/redis-stable/` for local dev:
   ```bash
   ./tools/redis-stable/src/redis-server
   ```
   Or use the dev script which starts it automatically.

5. **Run Data Scripts**
   Fetch Pokemon and TCG data:
   ```bash
   pnpm run fetch:pokemon
   pnpm run generate:pokemon
   pnpm run fetch:tcg
   pnpm run generate:tcg
   ```

6. **Start Dev Server**
   ```bash
   pnpm run dev
   ```
   App runs at `https://localhost:3000` (HTTPS enabled)

## Troubleshooting
- **Port 3000 in use**: Kill process with `lsof -ti:3000 | xargs kill`
- **Redis connection failed**: Ensure Redis is running on default port 6379
- **Database connection failed**: Verify `DATABASE_URI` in `.env`
