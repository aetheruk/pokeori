# Spirit Channeling

Spirit Channeling is a gated side activity launched from eligible memento items in Inventory.

- The player must own the Book of Channeling before channeling actions appear.
- Only owned memento items with authored channeling configs can be selected.
- Incense items are reusable key items; configs hide the correct incense from the player.
- Offerings use three item slots. T1 type materials provide 1 matching elemental energy, and base type gems provide 3.
- A single owned Psychic-type Pokemon performs the channeling. Underlevel Psychic Pokemon can be selected, but the ritual fails.
- Failed attempts consume nothing. Successful attempts consume only the selected offering quantities, grant the config rewards, and mark that memento channeling complete.
- Completion is tracked in user activity stats under the research activity id `spirit-channeling:{mementoItemId}`.

The first authored ritual is Fuji's Glasses Memory, which uses Memory Incense, 5 Ground energy, and a level 5+ Psychic-type Pokemon to unlock the Mr. Fuji Pokemon Tower Chronicle.
