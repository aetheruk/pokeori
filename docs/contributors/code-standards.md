# Code Standards

Coding conventions for Pokeori.

## TypeScript
- Use strict mode (already enabled)
- Avoid `any` type - use proper interfaces
- Use type guards instead of type assertions
- Export types for shared interfaces

## React
- Use functional components + hooks
- Add `'use client'` directive for client components
- Use `useMemo`/`useCallback` for expensive operations
- Split large components (>300 lines) into smaller ones

## UI Buttons
- Use `AppButton` from `src/components/ui/app-button.tsx` for new app UI buttons.
- Button text should use the shared app style: bold, uppercase, italic text with the teal gradient default state.
- Use `variant="outline"`, `secondary`, `ghost`, or `destructive` only for clear semantic alternatives; avoid one-off button styling unless the control is icon-only or a specialised game input.

## Naming Conventions
- **Files**: kebab-case (`pokemon-selection-list.tsx`)
- **Components**: PascalCase (`PokemonSelectionList`)
- **Functions**: camelCase (`fetchPokemonData`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_POKEMON_LIMIT`)

## Formatting
- 2 spaces indentation
- Single quotes
- Semicolons required
- Trailing commas (ES5)

## Error Handling
- Never swallow errors silently
- Log errors with context
- Show user-facing toasts for recoverable errors
- Return proper HTTP status codes in API routes
