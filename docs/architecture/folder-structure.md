# Folder Structure

Complete project directory tree with descriptions.

```
pokeori/
├── certificates/          # SSL certificates for HTTPS dev
├── public/               # Static assets (served as-is)
│   ├── backgrounds/      # App background images
│   ├── fallback/         # Legacy non-item fallback images, such as skill icons
│   ├── games/            # Mini-game assets
│   ├── music/            # Audio tracks
 Region maps (14 dirs)
# Region maps (14 dirs)
│   ├── scratchcard/      # Scratch card assets
│   ├── sfx/              # Sound effects
│   ├── sprites/          # Bundled game sprites, including Pokemon, items, and gym leaders
│   ├── sw.js             # Service worker (PWA)
│   └── web-app-manifest-* # PWA manifest icons
├── scripts/              # Data fetch/generate scripts
│   ├── fetch-pokemon-data.mjs
│   ├── fetch-tcg-data.mjs
│   ├── generate-*.mjs    # Data module generators
│   └── generate-quizzes.ts
├── source_data/          # Raw API data (not committed)
│   ├── pokemon/          # Pokemon JSON data
│   └── tcg/              # TCG card/set data
├── src/                  # Main source code
│   ├── app/              # Next.js App Router
│   │   ├── (frontend)/   # Game UI routes
│   │   │   ├── game/     # Game features (battles, explore, etc.)
│   │   │   ├── store/    # Zustand stores
│   │   │   └── auth/     # Login/register
│   │   ├── (payload)/    # Payload CMS admin/routes
│   │   └── api/          # Custom API routes
│   ├── collections/      # Payload CMS collections
│   ├── components/       # React components
│   ├── context/          # React Context providers
│   ├── data/             # Game data modules
│   ├── hooks/            # Custom React hooks
│   ├── utilities/        # Helper functions
│   ├── styles/           # Global CSS
│   └── types/            # TypeScript types
├── tools/                # Dev tools (Redis server)
├── .env                  # Environment variables (not committed)
├── .gitignore
├── next.config.mjs       # Next.js configuration
├── package.json
├── tsconfig.json         # TypeScript configuration
└── payload.config.ts     # Payload CMS configuration
```
