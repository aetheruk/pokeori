# Linting & Formatting

ESLint and Prettier configuration for Pokeori.

## Tools
- **ESLint**: Catches code quality issues (v9.39.3)
- **Prettier**: Enforces consistent formatting (v3.8.1)
- **TypeScript ESLint**: TypeScript-specific rules

## Configuration Files
| File | Purpose |
|------|---------|
| `eslint.config.mjs` | ESLint rules and plugins |
| `.prettierrc.json` | Prettier formatting options |
| `tsconfig.json` | TypeScript compiler options |

## Available Scripts
```bash
bun run lint        # Check for lint errors
bun run lint:fix    # Auto-fix lint errors
```

## ESLint Rules
- React hooks rules enabled
- TypeScript strict mode
- No unused variables
- Prefer const over let
- No console.log in production (warning only)

## Prettier Options
- Single quotes
- 2 spaces indentation
- Semicolons required
- Trailing commas (ES5)
