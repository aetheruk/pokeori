# Pokeori

Pokeori is an open-source, unofficial Pokémon fan project built as a field-journal adventure game. Explore locations, research and collect Pokémon, play mini-games, battle, and build your own expedition record.

The current release is **v0.0.1**.

> **Important fan-project notice**
>
> Pokeori is not affiliated with, endorsed by, sponsored by, or otherwise associated with Nintendo, Creatures Inc., GAME FREAK inc., or The Pokémon Company. Pokémon, Pokémon character names, artwork, marks, and related intellectual property belong to their respective owners. This is a fan-made project and is not an official Pokémon product.

## Open-source status

The original source code in this repository is released under the [MIT License](./LICENSE). Third-party libraries, datasets, services, images, audio, and Pokémon-related intellectual property remain subject to their own licenses, terms, and ownership. The MIT License does not grant permission to use Pokémon trademarks or relicense third-party material.

See [ATTRIBUTIONS.md](./ATTRIBUTIONS.md) for source credits and important third-party notices.

## What is included

- Next.js App Router frontend with a responsive field-journal interface
- Payload CMS-backed trainer accounts and authored game data
- Pokémon research, collection, evolution, forms, and Pokedex systems
- PVE and PVP battle systems
- TCG card collection, sets, binders, and booster packs
- Research encounters and mini-games
- Voyage, expedition, shop, crafting, tasks, and reward systems
- Static data-generation and source-sync tooling for Pokémon and TCG data

## Technology

- [Bun](https://bun.sh/)
- [Next.js](https://nextjs.org/)
- [React](https://react.dev/)
- [Payload CMS](https://payloadcms.com/)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Radix UI](https://www.radix-ui.com/)

## Local development

### Requirements

- Bun `1.3.13` or a compatible current Bun release
- MongoDB
- Redis
- A Resend API key if transactional email is enabled

Copy the example environment file and fill in values for your local services:

```bash
cp .env.example .env
bun install
```

Start the development server:

```bash
bun run dev
```

The app uses the local MongoDB and Redis connection details from `.env`. See [the development guide](./docs/development/getting-started.md) and [environment variable reference](./docs/development/environment-variables.md) for more detail.

## Useful commands

```bash
bun run dev             # Start the local app and Redis helper
bun run build           # Create a production build
bun run start           # Run the production build
bun run typecheck       # Check TypeScript
bun run lint            # Run Biome linting
bun test                # Run the test suite
bun run validate:data   # Run data and integrity validation tests
```

Source-data workflows are documented in [docs/development/scripts.md](./docs/development/scripts.md). They include the commands used to fetch and generate local Pokémon and Pokémon TCG data. Review each upstream service's terms before redistributing generated or cached third-party data.

## Repository map

```text
src/app/(frontend)/game   Player-facing game routes and server actions
src/data                  Authored game data and generated data modules
src/utilities              Shared mechanics, validation, rewards, and helpers
public                     App assets, backgrounds, sprites, and sounds
scripts                    Data fetching and generation tools
docs                       Architecture, feature, data, and contributor guides
tests                      Unit, integrity, and mechanics tests
```

## Contributing

Issues, documentation improvements, tests, accessibility fixes, and code contributions are welcome. Please read the [contributor guide](./docs/contributors/README.md) before opening a pull request. Keep third-party source credits intact and do not add assets that imply official Pokémon affiliation.

## Deployment

Production images are built on GitHub Actions and deployed to Coolify after changes are merged to protected `main`. See the [GitHub Actions and Coolify guide](./docs/development/github-actions-coolify.md).

## Versioning

Pokeori currently uses the pre-release version `0.0.1`. Until the first stable release, APIs, data formats, and game systems may change without backwards compatibility.

## Credits and sources

Pokeori would not exist without the open-source projects and community data services listed in [ATTRIBUTIONS.md](./ATTRIBUTIONS.md), including PokeAPI and the Pokémon TCG API/data community project. Thank you to all of their maintainers and contributors.
