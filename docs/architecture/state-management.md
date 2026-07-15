# State Management

Patterns used for state management in Pokeori.

## Zustand (Client UI State)
Lightweight state for ephemeral UI state.

### Stores
| Store | Location | Purpose |
|-------|----------|---------|
| inventoryStore | `src/app/(frontend)/store/inventory-store.ts` | Item inventory state, quantity updates |

## React Context (Global State)
Shared state accessed by many components.

### Contexts
| Context | Location | Purpose |
|---------|----------|---------|
| UserContext | `src/context/UserContext.tsx` | Authenticated user, game data, refresh logic |
| AudioContext | `src/context/AudioContext.tsx` | Background music, sound effects, volume control |

## Server State (Payload CMS)
Backend data managed via Payload CMS:

- **Users**: Fetched via `/api/game/sync` route
- **Pokemon**: Fetched via Payload `find` API
- **Game Data**: Static data imported from `src/data/` modules

## State Sync
- User data polls every 5 minutes via `UserContext`
- Payload CMS handles session/auth state via cookies
- No client-side cache (SWR installed but unused)
