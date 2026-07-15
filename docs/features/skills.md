# Skills

Core skill progression for Trainer, Explorer, and Researcher.

## Locations
- Route: `/game/trainer`
- UI: `src/components/game/trainer-leveling.tsx`
- Guide data: `src/data/skills/guide.ts`
- Unlock helpers: `src/utilities/skills/unlocks.ts`

## Core Skills
| Player skill id | Player-facing name | Main unlock role |
| --- | --- | --- |
| `battling` | Trainer | Battle readiness, powers, held items, effective IV caps, and battle-use items. |
| `catching` | Explorer | Exploration utility items and authored exploration gates. |
| `researching` | Researcher | Move slots, capture tools, encounter quality bonuses, and authored research gates. |

The Trainer menu shows a skill guide for Trainer, Explorer, Researcher, and Artisan in the shared game drawer. Guide rows combine fixed authored milestones with dynamic item unlock rows from item `skillRequirements`. The drawer renders upcoming unlocks immediately, while the full level-by-level guide is expandable and uses lazy-loaded row icons. The Trainer guide includes Gym Challenge milestones at Trainer 5 for Brock, 10 for Misty, and 15 for Lt. Surge. Ranked battling remains tracked separately where needed, but it is not part of the core guide grid.

## Skill XP
- Generated core skill XP uses `20 + 2 * (contentLevel - 1)`, clamped to content levels 1-100.
- Skill modifiers are Explorer/catching 1.8, Researcher/researching 1.45, Trainer/battling 1, and Artisan 1.
- Pokemon-driven Battle, Catching, and Field Observation XP also applies a bounded Pokemon base-experience modifier around baseline 160, capped to a 15% decrease or increase. Missing or zero base experience is neutral.
- Catching uses the Pokemon level and grants 50% XP on failed ball throws only, with the same base-experience modifier as successful catches. Battle wins grant XP per enemy Pokemon and losses grant none. Field Observation grants one Researcher XP reward from the rounded average observed reward-subject level and averaged subject base-experience modifiers, with 40% XP on failed reports only after a submitted guess. Artisan grants XP from recipe level on successful crafts, then applies 1.15x for Good quality or 1.3x for Perfect quality.
- Authored flat `type: 'xp'` rewards are still valid for one-off bonuses. Content can use `skillXp` to override generated skill/level.

## Trainer Unlocks
- Held item assignment unlocks at Trainer level 15. Type boost held items are crafted through recipe-unlock tasks at Artisan 18, 50, and 75 by tier. Training Bands and held berries use the same Trainer 15 held-item unlock instead of individual item-level Trainer gates.
- Pokemon still roll and store their natural IVs at capture. Trainer level applies an effective IV cap for displayed stats and battle stats: 10 by default, then 15/20/25/30/31 at Trainer levels 10/20/30/40/50.
- Battle Shouts unlock at Trainer level 40.
- Higher battle powers unlock from Trainer level 65 onward: Weather Control 65, Tera 70, Mega 75, Z-Move 80, Dynamax 85, Victory Power 90, Circadian Power 95, and Dimensional Shift 95.
- Potions, status recovery items, X items, and Battle Observer require Trainer levels from their item data. Battle Observer is available from Trainer level 1. Current battle item gates include Potion at 3, Fresh Water at 4, Antidote at 5, Paralyze Heal at 6, Awakening at 7, Burn Heal at 8, Ice Heal at 9, Super Potion at 27, Soda Pop at 29, Lemonade at 34, X items across 31-35, Dire Hit at 36, Full Heal at 37, Hyper Potion at 51, Max Potion at 60, and Full Restore at 81.

## Explorer Unlocks
- Explorer remains the main level gate for exploration progression and route-style authored criteria.
- Simultaneous Active Voyages unlock from Explorer level: 1 at level 1, 2 at 22, 3 at 46, 4 at 71, and 5 at 93.
- Repels, Escape Rope, and other exploration utility items can require Explorer levels through item data.
- Itemfinder appears in the skill guide at Researcher level 12 for the Route 11 researcher task that rewards the `dowsing-machine` key item.
- Ball usage is not Explorer-gated; stronger and specialty balls are naturally gated by shops, drops, Artisan recipes, materials, and recipe unlocks.

## Researcher Unlocks
- Battle move slots unlock at Researcher levels 10, 20, 45, and 60 for 1, 2, 3, and 4 usable assigned moves.
- Type lure recipe research unlocks at Researcher 10 for base lures, 40 for Advanced lures, and 70 for Master lures. Lure strength is item-tier based rather than a passive Researcher multiplier.
- Researcher level adds modest global bonuses to wild-encounter ability roll attempts at later levels and shiny odds. Ability Insight at Researcher 27 unlocks hidden ability rolls for wild catches.
- Field Observation Pokemon Research XP is guaranteed per reward subject and scales by Researcher level: base 1 XP by default, then 2/3/4/5 at Researcher levels 18/50/70/100, with a 20% per-subject chance to grant +1 above the base tier.
- Field Observation primary material pre-rolls use a 75% chance and cap at 3 per report by default, then 4 at Researcher 22 and 5 at Researcher 39.
- Field Observation dye nut drops unlock from Researcher 1-40, with Razz Berry joining that pool at Researcher 14 at a lower selection weight than dye nuts. Healing berry drops unlock at Researcher 16 with Oran, Cheri, Chesto, Pecha, Rawst, Aspear, and Persim together, then add Sitrus and Lum at Researcher 38. Trainer level still controls battle use and held use.
- Individual Pokemon Research levels use thresholds of 25, 75, 200, 500, and 1000 XP. Breakthroughs no longer grant Researcher skill XP.
- Individual Pokemon Research level 1 allows battle moves and held items for that species, level 2 adds release material rolls and Battle Observation stance-read chances, level 3 adds +15 crystals on catch, free escape, and Pokemon Powers, level 4 adds better IV behavior, raises the hidden ability roll from 5% to 10% when hidden abilities are globally unlocked, plus a 2% survival bond in battle, and level 5 keeps the shiny bonus.
- Research Kit grants 5 Pokemon Research XP to a chosen non-legendary, non-mythical Pokemon and requires Researcher level 35. The Artisan guide also lists its crafting recipe at Artisan level 35.
- Stats Module appears in the Researcher guide at level 7 and corresponds to completing Pallet Town's stat module calibration for the `stats-scanner`.
- Researcher can also gate extra Pokemon pools or authored research progression when entries define those requirements.

## Titles
Each core skill unlocks a title every 10 levels. The suffix ladder is New, Junior, Growing, Adept, Expert, Professional, Ace, Incredible, Master, and then the bare skill name at level 100. These skill-derived titles are equipable from the player's current skill levels without needing to be persisted in `unlockedTitles`.
