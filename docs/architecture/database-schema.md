# Database Schema

Payload CMS collections and data structures.

## Collections

### Users
| Field | Type | Description |
|-------|------|-------------|
| email | string | Login email |
| password | string | Hashed password |
| trainerName | string | Display name |
| banner/icon | image | Profile assets |
| skills | object | Catching/battling/researching levels + XP |
| currency | object | Crystals, mega-shards, pokedollars, League Tickets, etc. |
| pokemon | relationship | Array of Pokemon collection entries |
| dailyTasks | array | Active daily tasks |
| friends | array | Friend user IDs |

### User State
| Collection | Description |
|------------|-------------|
| user-inventory-items | Owned item quantities |
| user-pokedex-entries | Seen/caught status and research level per species/form |
| user-task-progress | Completed task counts and timestamps |
| user-activity-stats | Battle, location, research, and expedition results |
| user-tcg-cards | Owned TCG card quantities |
| user-shop-purchases | Purchased shop item counts and timestamps |

### Pokemon
| Field | Type | Description |
|-------|------|-------------|
| user | relationship | Owner (User ID) |
| speciesId | number | Pokemon species (e.g., 1 for Bulbasaur) |
| formId | string | Form identifier (default, alola, etc.) |
| stats | object | HP, Attack, Defense, Sp.Attack, Sp.Defense, Speed |
| ivs | object | Individual Values (0-31) |
| evs | object | Effort Values (0-252 per stat) |
| nature | string | Pokemon nature |
| ability | string | Pokemon ability |
| shiny | boolean | Is shiny? |
| shadow | boolean | Is shadow Pokemon? |
| radiant | boolean | Is radiant Pokemon? |
| ball | string | Ball type used to catch |
| box | number | Storage box number |
| boxSlot | number | Slot in box |
| battleTeam | boolean | Is in active battle team? |

### ExpeditionRuns
Tracks active voyage/expedition runs started by users.

## Relationships
- User (1) -> Pokemon (many)
- User (1) -> ExpeditionRuns (many)
