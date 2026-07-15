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
- Bun 1.3.13
- PostgreSQL database
- Redis server (for local dev)
- Git

## Available Scripts
| Script | Description |
|--------|-------------|
| `bun dev` | Start dev server with Redis + Next.js |
| `bun run build` | Production build |
| `bun start` | Start production server |
| `bun run fetch:pokemon` | Fetch Pokemon data from PokeAPI |
| `bun run generate:pokemon` | Generate Pokemon data modules |
| `bun run lint` | Run ESLint |
