# Fishing hook and item tables

Release 0.51.49 replaces the global item pool and hook balance. Rod-specific Pokemon pools, secret Pokemon replacements, capture rewards, net forfeiture/retry rules, and rod reaction windows are unchanged. Eligible special location item pools still override global item drops and fall back to global tables only when exhausted.

## Hook balance

Each cast starts at 50% items and 50% Pokemon. Each of the ten keep-net slots containing an item/currency bundle reduces the item chance by two percentage points; each stored Pokemon increases it by two points. Bundle quantity does not affect this balance.

`item chance = 50 + 2 × Pokemon slots − 2 × item slots`

Ten items therefore give 30% items / 70% Pokemon; ten Pokemon give 70% items / 30% Pokemon. Five of each retain 50/50. This hook balance also applies before special location item pools.

## Common and rare global item hooks

After rolling an item hook, independently choose the common table at 99% or rare table at 1%. Each unnumbered Golden Scale stored in the keep net adds one percentage point to rare chance and removes one from common chance. Numbered collectibles do not boost this roll. A Golden Scale is normally a one-item bundle; the helper counts stored units, capped at 100% rare. The table selection is separate from entry weights.

All eligible entries have equal weight 1. Old, Good, and Super Rods share contents and odds, retaining reaction windows of 900/850/800 milliseconds and global bite delays of 2–5 seconds.

Common entries:

- All eighteen base/Tier 1 Pokemon type materials, each in a uniform quantity of 1–2: Soft Fluff, Cinder Shard, Aqua Solvent, Electric Component, Wood Scraps, Frost Crystal, Grip Weave, Toxic Resin, Soft Clay, Wing Feather, Rune Stone, Chitin Fragment, Small Stone, Ectoplasm, Drake Scale, Shadow Cloth, Metal Scrap, and Fairy Charm.
- Broken Ball T1, quantity 1–2.
- 100 Pokedollars or 25 Crystals, one bundle each.
- One Poke Ball when the net holds at least 2 Broken Ball T1 units, one Great Ball at 5 units, and one Ultra Ball at 8 units. Unlocks are cumulative and count total quantity across bundles, rather than occupied slots. Inventory quantities do not qualify.

Rare entries:

- Golden Scale (1) through (8), each unique; already-owned or netted scales are filtered out.
- One Discarded Rubbish, 500 Pokedollars, or 200 Crystals.
- One repeatable unnumbered Golden Scale while all eight numbered scales are owned in Inventory. It has the same weight as every other eligible rare entry, replacing the old fixed 1-in-50 global-item rate.
- Each eligible evolution stone listed below, quantity one.

No global gems, upgraded materials, 250-Pokedollar bundles, or old 5/15/50-Crystal bundles remain in these tables. Existing special location pools may still contain their authored rewards.

## Stone gates

A stone requires five distinct occupied keep-net slots of its mapped Tier 1 material. One bundle containing five units does not qualify. Matching materials are not consumed to unlock the stone.

| Stone | Type | Five slots must contain |
| --- | --- | --- |
| Fire Stone | Fire | Cinder Shard |
| Water Stone | Water | Aqua Solvent |
| Thunder Stone | Electric | Electric Component |
| Leaf Stone | Grass | Wood Scraps |
| Ice Stone | Ice | Frost Crystal |
| Sun Stone | Grass | Wood Scraps |
| Moon Stone | Fairy | Fairy Charm |
| Shiny Stone | Fairy | Fairy Charm |
| Dusk Stone | Dark | Shadow Cloth |
| Dawn Stone | Psychic | Rune Stone |
| Oval Stone | Normal | Soft Fluff |

## Example probabilities

At an empty net before numbered-scale collection, there are 21 eligible common entries and 11 eligible rare entries. Each common entry is `50% × 99% ÷ 21 = 2.3571%` per cast, while each rare entry is `50% × 1% ÷ 11 = 0.04545%` per cast.

After all numbered scales are owned, the ungated rare table has four entries: Rubbish, 500 Pokedollars, 200 Crystals, and Golden Scale. With one unnumbered scale in the net, item chance is 48%, rare-table chance is 2%, and each of those four rewards is `48% × 2% ÷ 4 = 0.24%` per cast. Eligible stones expand that equal-weight table without changing the rare-table selection chance.

## Persistence

The server resolves a global material bundle's quantity once at cast creation and persists the concrete quantity in the hooked result. Hook retries, netting, direct taking, and capture settlement reuse it. Existing paid reward transactions and idempotent action receipts remain responsible for collection; this change does not reroll contents on retries.

## Universal bobber markers

Every rod and location uses the rolled hook result for its bite marker. Normal Pokémon show `!`, common-table items show `!!`, rare-table items show `!!!`, and Pokémon unlocked by keep-net conditions show `?!`. Local override items show `!!` because they bypass the global table roll.

Relicanth requires five Tier 1 Rock material units (`small-stone-t1`) in the keep net and rolls at 1 in 64 after a Pokémon hook is selected. Quantities can be spread across bundles; five distinct slots are not required. It is checked before Feebas, Staryu, and Gold Magikarp and uses `?!` unless a rarity variant takes priority.

Alpha Pokémon use the existing Alpha symbol. Rarity variants (including shiny, shadow, and gold) use the Lucide Sparkle icon. Alpha takes precedence over rarity, and rarity takes precedence over the net-condition marker. Alpha is rolled once at casting and retained through hooking, netting, and capture, so the bite can show its actual symbol. Legacy per-entry `symbol` settings are ignored.
