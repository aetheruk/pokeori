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
- Route-scoped player data is cached by SWR in `UserContext` and revalidates
  every 5 minutes and when the window regains focus
- Initial Server Component snapshots seed SWR on the main management routes
- Failed syncs retain the latest usable snapshot; only independently confirmed
  authentication loss redirects to `/auth`
- Payload CMS handles authentication through an HTTP-only cookie, while the
  persistent game shell refreshes active sessions before token expiry
