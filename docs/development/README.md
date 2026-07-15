# Development Guide

Guides for setting up and contributing to Pokeori.

## Getting Started
Follow the [Setup Guide](/docs/development/getting-started.md) to run the project locally.

## Guides
- [Environment Variables](/docs/development/environment-variables.md) - All required env vars
- [Scripts](/docs/development/scripts.md) - Data fetch/generate scripts
- [Testing](/docs/development/testing.md) - Testing strategy and current checks
- [Linting](/docs/development/linting.md) - ESLint/Prettier setup
- [Deployment](/docs/development/deployment.md) - Build and deploy guide
- [GitHub Actions and Coolify](/docs/development/github-actions-coolify.md) - Pre-built image CI/CD flow
- [Release Checklist](/docs/development/release-checklist.md) - Pre-deploy validation checklist

## Prerequisites
- Node.js 22 or newer
- pnpm 10.24.0
- Bun 1.3.13 for the current test runner and data scripts
- MongoDB database
- Redis server (for local dev)
- Git

## Available Scripts
| Script | Description |
|--------|-------------|
| `pnpm run dev` | Start dev server with Redis + Next.js |
| `pnpm run build` | Production build |
| `pnpm run start` | Start production server |
| `pnpm run fetch:pokemon` | Fetch Pokemon data from PokeAPI |
| `pnpm run generate:pokemon` | Generate Pokemon data modules |
| `pnpm run lint` | Run Biome linting |
