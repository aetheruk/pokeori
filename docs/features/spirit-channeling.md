# Spirit Channeling

Spirit Channeling is a gated side activity launched from eligible memento items in Inventory.

- The player must own the Book of Channeling before channeling actions appear.
- Only owned memento items with authored channeling configs can be selected.
- Valuable-category treasure mementos are grouped under Inventory → Key Items and their quick action opens Spirit Channeling instead of Artisan crafting.
- The client receives the memento ID list and display catalogs, while incense answers, offering totals, channeler rules, and rewards stay in the server action's config.
- Incense items are reusable key items; configs hide the correct incense from the player. Fortune Incense is the answer for the eleven Treasure Fortune rituals.
- The active memento's item sprite appears in the page header. Incense, offering, and channeler pickers open directly into full-width Explore-style cards without visible screen titles, back buttons, close icons, or introductory copy; dialog titles remain available to assistive technology. Picker entries suppress automatic haptics so touch scrolling remains uninterrupted. Pokemon search and the materials/gems toggle stay pinned below their scrolling lists with safe-area spacing. Pokemon levels and owned offering quantities (`x{qty}`) appear in orange beside the name in each charcoal title tab. Offering slots stay in a three-column mobile row with compact quantity controls. The Inventory action for a channelable memento uses a Gastly icon.
- The channeling scene fills the content width with the Pokemon Tower background, with incense centered beneath the smoke and the selected Pokemon on the right. Its Channeling title uses the charcoal Explore-card tab.
- Picker cards use Explore's scenic background and directional paper fade. Incense uses Pokemon Tower artwork and shows only its icon and name, without descriptions; materials and gems use Inventory artwork, and channellers use their saved Pokemon backgrounds, including legacy filename normalization. Selected entries retain a charcoal edge and keyboard focus remains visible.
- The slim channeling Pokemon projection includes `background` so both server-rendered snapshots and client sync responses can render the saved scenery.
- Offerings use three item slots. T1 type materials provide 1 matching elemental energy, and base type gems provide 3. Quantity can be adjusted with the stepper or entered directly, and the panel shows the currently offered energy totals without revealing the target.
- The offering picker has Materials and Gems tabs. Treasure mementos are not offerings: the eleven Fortune Incense rituals use the standard T1 material and type Gem offerings to reach their required energy.
- A single owned Pokemon performs the channeling. Every ritual keeps a minimum level and then uses one of three mutually exclusive identity modes: any Pokemon, one required Pokemon type, or one exact form ID. This supports both type + level and form ID + level rituals without accidentally stacking type and form constraints. The searchable picker covers the full owned roster without disclosing hidden ritual requirements. The server enforces the rule and gives an indirect clue when a chosen Pokemon does not resonate.
- Failed attempts consume nothing. Successful attempts consume only the selected offering quantities, grant the config rewards, and mark that memento channeling complete.
- Completion is tracked in user activity stats under the research activity id `spirit-channeling:{mementoItemId}`.

Fuji's Glasses Memory uses Memory Incense, 5 Ground energy, and any level 5+ Pokemon to unlock the Mr. Fuji Pokemon Tower Chronicle. The introductory lesson explains that every Pokemon can channel, while some memories favour a type or exact form; it recommends a Psychic type for this first ritual without making Psychic typing mandatory.

An incompatible channeler fails without consuming incense or offerings. Failure guidance hints at a familiar form, elemental affinity, or stronger bond without naming the required Pokemon, type, or level.

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

The eleven classic treasure items are Fortune Incense mementos only. Channeling each one awards a unique Book of Fortune whose inventory description gives a clue to its buyer task. The memento remains in the inventory; successful channeling consumes only the selected standard material/Gem offerings, and each memento can be channeled once. Channeler requirements and required energy are:

| Treasure | Offering energy | Channeler |
| --- | ---: | --- |
| Nugget | 28 Steel | Any Level 10+ |
| Big Nugget | 63 Steel | Any Level 25+ |
| Pearl | 24 Water | Water type, Level 10+ |
| Big Pearl | 57 Water | Water type, Level 25+ |
| Stardust | 39 Psychic | Clefairy, Level 15+ |
| Star Piece | 68 Psychic | Clefable, Level 30+ |
| Rare Bone | 46 Ground | Ground type, Level 20+ |
| Big Mushroom | 34 Grass | Parasect, Level 15+ |
| Tiny Mushroom | 21 Grass | Paras, Level 10+ |
| Comet Shard | 77 Psychic | Fairy type, Level 35+ |
| Balm Mushroom | 52 Grass | Grass type, Level 25+ |

Each matching Book of Fortune points to a secret repeatable Kanto buyer task, revealed while the player owns that book. The task consumes one matching treasure and pays Pokédollars at its authored exchange value; it is grouped under the existing task subcategory for its supported location. The Kanto Plant Store Room buyer is grouped under Cerulean City, matching that location's authored subcategory.
