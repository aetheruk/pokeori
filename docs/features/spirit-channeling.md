# Spirit Channeling

Spirit Channeling is a gated side activity launched from eligible memento items in Inventory.

- The player must own the Book of Channeling before channeling actions appear.
- Only owned memento items with authored channeling configs can be selected.
- Incense items are reusable key items; configs hide the correct incense from the player.
- Offerings use three item slots. T1 type materials provide 1 matching elemental energy, and base type gems provide 3. Quantity can be adjusted with the stepper or entered directly, and the panel shows the currently offered energy totals without revealing the target.
- A single owned Pokemon performs the channeling. Every ritual keeps a minimum level and then uses one of three mutually exclusive identity modes: any Pokemon, one required Pokemon type, or one exact form ID. This supports both type + level and form ID + level rituals without accidentally stacking type and form constraints. The searchable picker covers the full owned roster, marks ineligible Pokemon with the complete requirement, and the server independently enforces the same rule.
- Failed attempts consume nothing. Successful attempts consume only the selected offering quantities, grant the config rewards, and mark that memento channeling complete.
- Completion is tracked in user activity stats under the research activity id `spirit-channeling:{mementoItemId}`.

Fuji's Glasses Memory uses Memory Incense, 5 Ground energy, and any level 5+ Pokemon to unlock the Mr. Fuji Pokemon Tower Chronicle. The introductory lesson explains that every Pokemon can channel, while some memories favour a type or exact form; it recommends a Psychic type for this first ritual without making Psychic typing mandatory.

The channeler picker and server return the same incompatibility guidance:

- No selection: `Choose a Pokémon to channel this memory.`
- Level only: `This memory needs a channeler at level {level} or higher.`
- Required type: `This memory needs a {Type}-type Pokémon at level {level} or higher.`
- Required exact form: `This memory needs {Form name} at level {level} or higher.`

Each Kanto Gym Badge is also an authored memento. Every badge ritual uses Memory Incense and unlocks one Gym Leader Chronicle marker:

| Badge | Chronicle | Offering energy | Channeler |
| --- | --- | ---: | ---: |
| Boulder | The Empty Chair | 49 Rock (Small Stone and/or Rock Gem) | Any Level 5+ |
| Cascade | Out of Step | 86 Water (Aqua Solvent and/or Water Gem) | Any Level 10+ |
| Thunder | After the Thunder | 70 Electric (Electric Component and/or Electric Gem) | Any Level 15+ |
| Rainbow | The Unspoken Bloom | 44 Grass (Wood Scraps and/or Grass Gem) | Any Level 20+ |
| Soul | The Daughter's Method | 34 Poison (Toxic Resin and/or Poison Gem) | Any Level 25+ |
| Marsh | The Quiet Room | 64 Psychic (Mind Thread and/or Psychic Gem) | Any Level 30+ |
| Volcano | The Last Question | 43 Fire (Cinder Shard and/or Fire Gem) | Any Level 35+ |
| Earth | Dinner at Eight | 91 Ground (Terra Dust and/or Ground Gem) | Any Level 40+ |
