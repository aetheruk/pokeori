# Voyages System

Send Pokemon on timed voyages for rewards.

## Locations
- Route: `/game/voyages/*`
- Components: `src/components/game/voyages/`
- Data: `src/data/voyages/`
- Utilities: `src/utilities/voyages/`

## Features
- Select Pokemon for a voyage
- The voyage selection modal uses the current Explore user-data snapshot for both its Pokemon roster and reward preview. A transient snapshot without a Pokemon array is treated as an empty roster instead of crashing the page.
- Simultaneous Active Voyages come from Explorer level: 1 at Explorer 1, 2 at 22, 3 at 46, 4 at 71, and 5 at 93
- Voyage duration (1-24 hours)
- Rewards scale with Pokemon level/stats
- Risk of failure (low HP Pokemon)
- Claim rewards on completion
