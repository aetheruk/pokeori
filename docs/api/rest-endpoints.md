# REST Endpoints

Custom Next.js API routes in Pokeori.

## Auth Check
`GET /api/auth/check`
- **Description**: Check if user is authenticated
- **Auth**: Required
- **Response**: User object or 401

## Game Sync
`GET /api/game/sync`
- **Description**: Fetch full user game data (user + Pokemon + inventory + tasks)
- **Auth**: Required
- **Response**: `RequirementData` object with user and game state

## Payload CMS Endpoints
Payload CMS auto-generates REST endpoints for all collections:

### Users
- `GET /api/users` - List users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create user (register)
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

### Pokemon
- `GET /api/pokemon` - List Pokemon (filtered by user)
- `POST /api/pokemon` - Catch new Pokemon
- `PATCH /api/pokemon/:id` - Update Pokemon (rename, move boxes)

### Expedition Runs
- `GET /api/expedition-runs` - List expedition runs
- `POST /api/expedition-runs` - Start new expedition
- `PATCH /api/expedition-runs/:id` - Update expedition status
