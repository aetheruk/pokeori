# Spirit Channeling

Spirit Channeling is a gated side activity launched from eligible memento items in Inventory.

- The player must own the Book of Channeling before channeling actions appear.
- Only owned memento items with authored channeling configs can be selected.
- Incense items are reusable key items; configs hide the correct incense from the player.
- Offerings use three item slots. T1 type materials provide 1 matching elemental energy, and base type gems provide 3. Quantity can be adjusted with the stepper or entered directly, and the panel shows the currently offered energy totals without revealing the target.
- A single owned Psychic-type Pokemon performs the channeling. Underlevel Psychic Pokemon can be selected, but the ritual fails.
- Failed attempts consume nothing. Successful attempts consume only the selected offering quantities, grant the config rewards, and mark that memento channeling complete.
- Completion is tracked in user activity stats under the research activity id `spirit-channeling:{mementoItemId}`.

Fuji's Glasses Memory uses Memory Incense, 5 Ground energy, and a level 5+ Psychic-type Pokemon to unlock the Mr. Fuji Pokemon Tower Chronicle.

Each Kanto Gym Badge is also an authored memento. Every badge ritual uses Memory Incense and unlocks one Gym Leader Chronicle marker:

| Badge | Offering energy | Psychic channeler |
| --- | ---: | ---: |
| Boulder | 97 Rock (Small Stone and/or Rock Gem) | Level 5+ |
| Cascade | 77 Water (Aqua Solvent and/or Water Gem) | Level 10+ |
| Thunder | 54 Electric (Electric Component and/or Electric Gem) | Level 15+ |
| Rainbow | 64 Grass (Wood Scraps and/or Grass Gem) | Level 20+ |
| Soul | 96 Poison (Toxic Resin and/or Poison Gem) | Level 25+ |
| Marsh | 59 Psychic (Mind Thread and/or Psychic Gem) | Level 30+ |
| Volcano | 51 Fire (Cinder Shard and/or Fire Gem) | Level 35+ |
| Earth | 81 Ground (Terra Dust and/or Ground Gem) | Level 40+ |
