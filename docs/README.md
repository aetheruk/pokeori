# Pokeori - Documentation

Comprehensive documentation for the Pokeori full-stack game application.

## Quick Links
- [Audit Reports](/docs/audit/README.md) - Security, code quality, and performance findings
- [Architecture Overview](/docs/architecture/README.md) - Tech stack, folder structure, database schema
- [Feature Documentation](/docs/features/README.md) - Battle system, Pokedex, mini-games, TCG, and more
- [Development Guide](/docs/development/README.md) - Setup, scripts, testing, deployment
- [API Reference](/docs/api/README.md) - REST endpoints, GraphQL, authentication
- [Game Data Reference](/docs/game-data/README.md) - Pokemon, moves, items, locations data structures
- [Contributor Guide](/docs/contributors/README.md) - Code standards, PR process, issue templates

## Project Summary
Pokeori is a Next.js 16 + Payload CMS 3 game with:
- 18+ mini-games
- Full battle system with advanced mechanics
- Pokedex tracking with research levels
- TCG card collection and booster packs
- Voyage/expedition systems
- Multi-region support (Gen 1-9 Pokemon)

## Public-repository safety

Keep local `.env` files and deployment credentials out of version control. Start from the root
`.env.example` file and rotate any credential that may have been exposed. The repository includes
automated tests; see the [Testing Guide](/docs/development/testing.md) for the current coverage and
commands.
