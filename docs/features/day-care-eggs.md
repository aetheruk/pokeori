# Day Care Eggs

Eggs are server-owned `user-eggs` records rather than Pokemon records. This prevents an egg from being used in battles, teams, voyages, item targeting, or release flows before it hatches.

Unlocking requires the completed `day-care-egg-program` task and Researcher level 32. A successful Field Observation can find one egg with a 1-in-26 roll, provided the user's Pokemon Box capacity (Pokemon plus active eggs) is not full.

An egg becomes hatchable 12 hours after discovery. Hatching from the Pokemon Box costs 50 Crystals. The species is rolled only then: caught forms have 80 weight, baby forms 18, and seen-but-uncaught forms 2. Empty pools are skipped; legendary and mythical forms are never candidates. The resulting Pokemon is level 5 and grants 15 Pokemon Research XP. Caught and seen pools use a 1.1x shiny multiplier; pools are configured in `src/utilities/day-care/eggs.ts` for future custom pools.
