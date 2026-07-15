# Artisan Crafting

Artisan introduces a dedicated material and recipe loop in `/game/artisan`.

## Core Loop
- Gather Pokemon materials from wild catches and active Field Observation drops.
- Salvage broken ball casings from wild battles and active Field Observation salvage drops.
- Crush no-effect color berries directly into matching dyes in the Materials category. Dye recipes unlock by Artisan level: Red/Spelon 1, Purple/Nanab 7, Green/Wepear 14, Blue/Bluk 21, Yellow/Pinap 28, and White/Enigma plus Black/Pamtre at 40. Each dye recipe shows an x5 bulk craft from the same recipe once the player is 5 Artisan levels above that recipe.
- Crush two matching Pokemon candies into PokePowder material in the Materials category. PokePowder now has five output sizes: XS, S, M, L, and XL. Normal candy recipes produce 1/2/3 powder by Bad/Good/Perfect quality, while matching EX candy recipes produce the same powder size at 1/3/5 quantity. Each PokePowder recipe shows an x5 bulk craft once the player is 5 Artisan levels above that recipe.
- Craft utility outputs from materials, gems, dyes, and recipe-specific components such as broken ball casings. Battle Observer shows an x5 bulk craft once the player is 5 Artisan levels above its recipe.
- Crafting materials, dyes, PokePowder, and Pokemon type gems across every tier sell for 10 PokeDollars each. Dye nuts are crafting inputs but are not sellable.
- Each craft starts a short recipe-specific craft check. Precise crafts use Hold Release: the player releases three holds into moving small targets, with 2 hits for Good and 3 for Perfect. Crush crafts, currently used by dyes and PokePowder, ask the player to rapidly tap before the timer expires. Balance crafts, currently used by lures, give 15.6 seconds to lock Gem, Material, and PokePowder meters into the green zone; 2 green locks are Good and 3 are Perfect. Mix crafts, currently used by Potion and status remedies, ask the player to quickly spin a dial; defaults are 6 spins for Good and 9 spins for Perfect. Scatter crafts show circular buttons for the recipe components and ask the player to tap away as many as possible in 4 seconds; defaults are 11 taps for Good and 15 for Perfect. When a recipe has a primary item output, Bad crafts produce the minimum quantity, Good crafts produce the midpoint quantity, and Perfect crafts produce the maximum quantity unless the recipe opts into failed bad crafts.
- Recipes can set `fail: true` so Bad crafts grant no rewards and do not consume materials, or set `minimumQuality` to require Good or Perfect quality. If `materialFail: true` is set, failed crafts grant no rewards and still consume the recipe materials; `materialFailQualities` can limit that material loss to specific failed quality tiers.
- Crafting consumes costs only after the server validates the active craft session, recipe gates, and available inventory or currency. Recipe costs can include inventory items or currencies such as Crystals.
- The recipe index groups Lures by tier instead of showing every type as a top-level card. Opening Base, Advanced, or Master Lures lets the player choose the specific type variant and craft it from the modal.
- Recipes can define `qualityOutputQuantity` for exact per-quality primary output counts when the default min/mid/max scaling is not appropriate.
- Recipes can also be service-style crafts with no primary item output, using `primaryOutputRewardIndex: null`; these keep authored reward quantities and can use `iconItemId` or the first ingredient as the recipe icon.

## Material Sources
- Wild catches: guaranteed primary material roll.
- Field Observation: pre-rolled active material drops from observed Pokemon.
- Wild battles: 25% broken ball casing salvage.
- Field Observation: active broken ball casing salvage drops generated from the study round.

Primary material family is determined from the Pokemon's type. Active drop paths currently emit base-tier materials only: wild catches choose one of a dual-type Pokemon's types at random, then grant 1 matching primary material, with a 50% chance to grant 2 total and a 20% chance to grant 3 total. Field Observation primary material pre-rolls use a 75% chance and cap at 3 per report by default, then increase to 4 at Researcher 22 and 5 at Researcher 39.
Secondary rolls use the built app Pokemon metadata (`habitat` and `shape`) where applicable; runtime game code must not read from `source_data`.
Special Pokemon material overrides live on `TYPE_MATERIAL_CONFIG`. Overrides can set `guaranteed: true`; guaranteed special materials always create an active Field Observation drop and bypass the normal primary-material cap. Entei, Raikou, and Suicune currently map to Token of Fire, Token of Thunder, and Token of Water. Combining each element's Mark, Proof, and Token through the guaranteed beast-stone random task creates a matching Lifeless key item, which unlocks a one-time Artisan 50 recipe for the matching Concentrated key item.
Tiered material IDs remain authored for recipes and future reward sources, but active catch, Field Observation, release, and broken-ball salvage drops suppress T2/T3 output and emit base-tier IDs.
Tiered material item ids stay stable as `-t1`, `-t2`, and `-t3`, but player-facing names use base, `+`, and `EX` labels.

## Lure Economy
- Direct lure drops from Field Observation are removed.
- Type lures are crafted from matching type gems, matching Pokemon material, and one level-relevant PokePowder, and use the Balance craft type. Base lures use two base gems, Advanced lures use five base gems, and Master lures use five pristine gems. Base and Advanced lures use base materials; Master lures use T3 materials. Each lure recipe shows an x3 bulk craft once the player is 5 Artisan levels above that recipe.
- All base type lure recipes unlock at Artisan 10 and Researcher 10, all Advanced type lure recipes unlock at Artisan 40 and Researcher 40, and all Master type lure recipes unlock at Artisan 70 and Researcher 70.
- Lure strength is item-tier based: base, Advanced, and Master lures apply 1x/2x/3x of the normal correct-answer catch-rate boost. Researcher no longer provides a passive lure multiplier.
- Explorer controls encounter item capacity automatically: 1 item at Explorer 1, 2 at 25, 3 at 50, 4 at 80, and 5 at 95.

## Ball Crafting Progression
- Artisan now crafts every ball type except Master Ball. Ball recipes produce 1 ball normally and 2 balls on Perfect quality.
- Core ball progression currently starts with Poké Ball, adds Moon Ball through the hidden Moon Ball Manual at Artisan 12, Net Ball through the Bug Maniac at Artisan 16, Great Ball at 25, and Ultra Ball at 50. Other specialty balls are held at Artisan 100 until their unlocks are authored. Every ball recipe shows an x3 bulk craft once the player is 5 Artisan levels above that recipe.
- Poké Ball, Great Ball, and Ultra Ball are visible from their Artisan/material gates. Moon Ball is an authored early specialty recipe at Artisan 12 through its hidden manual and costs 3 Broken Balls, 2 Fairy Gems, and 3 T1 Fairy Charms, while Net Ball is authored at Artisan 16 through the Bug Maniac manual, uses green dye, and only gets its catch bonus on Bug-type Pokemon. Every other craftable specialty ball is temporarily held at Artisan 100 and has a hidden auto `"{Ball Name} Manual"` task gate, so those recipes can be unlocked by authored content before appearing in the Artisan recipe list. Held recipes exist for all 18 type boost item families in three recipe-gated tiers: diminished tier at Artisan 18, normal tier at Artisan 50, and Unstable tier at Artisan 75. Diminished held recipe manual tasks exist for all 18 types; authored prize unlocks are visible recipe prizes, while unauthored manuals remain secret placeholders.
- Special Ball recipe costs use base broken ball casings, one dye, one themed base Pokemon material, and two level-relevant PokePowder. Potion mixing unlocks at Artisan 5 and costs XS PokePowder, Purple Dye, and Aqua Solvent. Fresh Water unlocks at Artisan 13 with 3 XS PokePowder, 1 Aqua Solvent, and 1 Water Gem, Super Potion at 32 with S PokePowder, Red Dye, and base Aqua Solvent, Soda Pop at 35 with S PokePowder, base Aqua Solvent, and Blue Dye, and Lemonade at 41 with M PokePowder, base Aqua Solvent, and Yellow Dye. Status remedy mixing unlocks at Artisan 8/18/26/32/39 for Antidote, Paralyze Heal, Awakening, Burn Heal, and Ice Heal; each costs two XS PokePowder plus three matching Pokemon materials: Poison, Grass, Psychic, Water, and Fire respectively. Medicine and status remedy recipes show x3 bulk crafts once the player is 5 Artisan levels above the recipe. Basic Poké Ball remains the simple starter recipe without powder. Metal Scrap remains the Steel-type material instead of the generic ball casing input.
- The hidden `Recipe: Elemental Stones` task unlocks eight level 30 Held recipes: Inferior Fire, Water, Leaf, Thunder, Shiny, Ice, Dark, and Light Stone. Each costs 10 matching gems, 100 matching T1 Pokemon material, 1 Neutral Stone, and 1000 Crystals. Dark uses Dark Gem and Shadow Cloth; Light uses Dragon Gem and Drake Scale. These recipes require Perfect quality; Bad or Good results grant no output and preserve all item and Crystal costs.
- Existing recipes avoid `+`/T2 material costs; active material and broken-ball drop paths currently emit only base-tier IDs.

### Diminished Held Recipe Prize Status

| Type | Diminished recipe | Authored prize source |
| --- | --- | --- |
| Normal | Cotton Scarf Recipe | Route 3 catches, 12% |
| Fire | Dusty Charcoal Recipe | Charmander's Den post-shortcut catches, 12% |
| Water | Magic Water Recipe | Squirtle Cove post-regular catches, 12% |
| Electric | Weak Magnet Recipe | Route 10 catches, 12% |
| Grass | Regular Seed Recipe | Secret Garden post-trust catches, 12% |
| Ice | Often-Melt Ice Recipe | Not currently authored |
| Fighting | Brown Belt Recipe | Not currently authored |
| Poison | Poison Tip Recipe | Route 22 catches, 12% |
| Ground | Coarse Sand Recipe | Diglett's Cave catches, 12% |
| Flying | Dull Beak Recipe | Not currently authored |
| Psychic | Straight Spoon Recipe | Not currently authored |
| Bug | Aluminium Powder Recipe | Buggy Champion, 100% |
| Rock | Brittle Hard Stone Recipe | Mt. Moon 1F/B1F/B2F catches, 12% |
| Ghost | Faux Spell Tag Recipe | Not currently authored |
| Dragon | Chipped Dragon Fang Recipe | Not currently authored |
| Dark | Chipped Glasses Recipe | Not currently authored |
| Steel | Rusty Coat Recipe | Rock Tunnel metal mining, 12% |
| Fairy | Fairy Down Recipe | Clefairy Cavern catches, 12% |

## Skill Progression
- `artisan` is a first-class skill.
- Recipe access is gated by Artisan level.
- Recipes can also use the shared requirements/criteria system: failed requirements hide recipes, while failed criteria keep recipes visible but locked.
- Material-finding tier progression scales with Researcher level progression.
- Recipe rewards use the shared reward infrastructure. Craft quality scaling applies only to the primary item output, while secondary items, currency, Pokemon research XP, titles, icons, cards, upgrades, and chance-based rewards keep their authored reward definitions. Successful crafts grant generated Artisan XP from recipe level with a 1x base modifier, then Good crafts apply 1.15x Artisan XP and Perfect crafts apply 1.3x. Failed crafts grant no generated Artisan XP unless a separate flat reward is explicitly authored elsewhere.

## Crafting UI
- `/game/artisan` uses the standard premium game UI patterns: `PremiumHeader`, compact recipe rows, a sticky bottom recipe category selector, item sprites for outputs and costs, and `GameInfoModal` recipe details. Lures appear as tier groups, and type boost held item recipes appear under a single `Held Type Boost` group that opens a variant picker.
- Level-locked and criteria-locked recipes remain visible with lock reasons so players can see upcoming progression. Requirement-locked recipes are hidden until their requirements pass.
- Recipe categories are Materials, Balls, Lures, Held, Items, and Special. Special is reserved for quest and task recipes.
- `craft-tiny-bug-armour` is a Special recipe unlocked by the completed Bug God offering chain plus the Jungle binder, costs 3 Bug material plus 2 XS PokePowder, uses Scatter, requires Good quality, consumes materials on Bad failure, produces `tiny-bug-armour` for the repeatable Bug God hand-in, and shows an x10 bulk craft once the player is 5 Artisan levels above the recipe. The hand-in pays a Jungle booster pack until the player has all 64 unique Jungle cards, then pays 2 Chitin Fragments instead.
- `craft-day-care-clay-brick` is a Special recipe unlocked during the post-Thunder Badge Day Care building repairs, costs 1 Soft Clay (`terra-dust-t1`), uses Mix, requires Good quality, consumes clay on Bad for no brick, produces 1 Kiln-Fired Brick on Good and 2 on Perfect, and has no bulk craft.
- `craft-hiker-clothes` is a Special recipe unlocked by the Route 9 Pass clothing pattern task, costs 10 Soft Fluff and 6 Wing Feather, uses Precise, requires Good quality, preserves materials on Bad failure, and produces the Trail Clothes needed for the Hiker outfit gate.
- `craft-battle-observer` is a level 3 Items recipe that costs 2 basic Electric components and 2 basic Metal scraps, uses Scatter, produces at least 1 Battle Observer, produces 2 on Perfect quality, and shows an x5 bulk craft once the player is 5 Artisan levels above the recipe.
- Berry Candy Items recipes cost 1 matching Dye and 2 XS PokePowder, use Scatter, produce 1 candy normally or 2 on Perfect quality, and show an x3 bulk craft once the player is 5 Artisan levels above the recipe. They unlock four Artisan levels after the matching dye: Red Berry Candy at 5, Purple Berry Candy at 11, Green Berry Candy at 18, Blue Berry Candy at 25, and Yellow Berry Candy at 32. Each raises a Pokemon's friendship by 5 and can be used during wild encounters to add +10 percentage points to that encounter's Second Chance roll.
- `craft-research-kit` is a level 35 Items recipe that packs a Battle Observer, Potion, Poke Ball, 2 XS PokePowder, and 2 Soft Fluff into 1 Research Kit.
