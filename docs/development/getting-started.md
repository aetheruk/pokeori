# Getting Started

Set up Pokeori locally.

## Prerequisites
- Bun 1.3.10 or newer
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
   bun install --frozen-lockfile
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
   bun run fetch:pokemon
   bun run generate:pokemon
   bun run fetch:tcg
   bun run generate:tcg
   ```

6. **Start Dev Server**
   ```bash
   bun run dev
   ```
   App runs at `https://localhost:3000` (HTTPS enabled)

## Test the standalone production build locally

Install Caddy once with `brew install caddy`, then build the complete standalone
artifact and run it behind the checked-in local HTTPS proxy:

```bash
bun run build:standalone
bun run start:https
```

Open `https://localhost:3000`. Next listens internally on
`http://127.0.0.1:3001`; Caddy terminates the locally trusted TLS connection on
port 3000. The first run may ask for the macOS password needed to trust Caddy's
local certificate authority.

## Troubleshooting
- **Port 3000 in use**: Kill process with `lsof -ti:3000 | xargs kill`
- **Redis connection failed**: Ensure Redis is running on default port 6379
- **Database connection failed**: Verify `DATABASE_URI` in `.env`
