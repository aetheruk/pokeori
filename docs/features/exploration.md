# Exploration System

Explore locations, mine for items, and discover Pokemon.

## Locations
- Route: `/game/explore/*`
- Components: `src/components/game/features/explore/`
- Data: `src/data/locations/`

## Features
- Region-based location maps
- Route cards can expose the three core route gameplay pillars: Catch, Battle, and Study. Study is powered by Field Observation entries and appears beside Catch/Battle when the route has matching authored data.
- Mine for items (berries, evolution stones)
- Random Pokemon encounters
- Per-player weather rolls persist for 30 minutes. The stored 1-20 weather slot is resolved through each active sub-region's `weatherSlots` map in `src/data/sub-region-map.ts`, defaulting to Clear when a slot is not authored.
- Requirements and criteria can use `{ type: 'weather', targetId: 'rain' }` or a `targetId` array to gate or hide content by the active sub-region weather. Explore, battle starts, catch starts, catch encounter pools, research starts, and Field Observation internal pools validate the same weather server-side.
- The Explore header shows the active sub-region weather beside the region-local time chip.
- Individual catch encounters can define their own `requirements`; locked entries are removed from the roll pool until their gates are met.
- Location modals still preview requirement-locked encounter entries as red unknown cards. Tapping a locked card shows the unmet requirements unless the encounter or one of its requirements is marked `secret`, in which case the modal keeps those requirements hidden.
- Catch locations can author `shield` with `type: 'consecutive'` or `type: 'total'` and `requiredCorrectAnswers`. While the shield is active, the catch rate is 0 and catch-rate boosts are blocked; once broken, the base catch rate is restored and later correct answers increase it normally. Non-regenerating shields are removed after breaking, while `regenSeconds` makes the shield return after a delay without resetting the accumulated catch rate.
- Catch locations can author `fleeRate` as a 0-100 percentage chance for the Pokemon to flee after an incorrect answer.
- Canonical natural species/form abilities are generated from the local PokeAPI source cache. Hidden ability slots roll at 5%, then normal ability slots guarantee a base ability. The active ability registry is canonical-only, with a curated set of canonical abilities adding conservative Capture and Field Observation secondary effects. These include small catch-rate/timer assists, success-only side rewards, Field Observation pool weighting, spawn visibility/count modifiers, global event odds multipliers, extra collectibles, collectible duration/quantity boosts, reward protection, and small Field Observation research XP boosts. These effects do not alter shiny odds, replace encounters, alter encounter levels, or fail encounters.
- Hidden item discovery
- Type lures are crafted in base, Advanced, and Master tiers. Researcher unlocks their recipe research at levels 10/40/70, Artisan unlocks and crafts those same tiers at levels 10/40/70, and the lure effect scales by item tier instead of a passive Researcher multiplier.
- Field Observation no longer grants direct lure drops; lures are obtained through Artisan crafting recipes using matching type gems, matching Pokemon material, and level-relevant PokePowder. Base lures use two base gems, Advanced lures use five base gems, and Master lures use five pristine gems. Base and Advanced lures use base materials; Master lures use T3 materials.
- The wild encounter item drawer only lists mid-encounter tools such as matching type lures, second-chance support items, and Chaos Stone. Quest materials and mismatched type lures are hidden, and the server rejects unsupported item use.
- Capture throws now use a Pokemon-centered precision target with visible concentric timing zones. The moving 1px ring's zone at release produces Poor, Nice, Great, or Excellent quality, applying -1/0/+1/+2 catch stages to that throw before the existing server capture roll; throw distance does not affect quality, and Excellent is limited to the tiny innermost timing zone. The client updates the displayed catch percentage with the throw modifier immediately, starts the throw/contact animation, hides the Pokemon on Pokeball contact, rocks the ball while waiting for the server result, then resolves with a success or fail flash.
- QTEs are first-class catch prompts rather than timer freezes or bonus events: after two normal quiz questions, eligible non-Chronicle encounters roll a 30% chance for a Focus, Calm, or Scare QTE, and force one after three normal questions without a QTE. Active shields block QTE rolls. QTEs have no separate timer and stay active until completed or until the main encounter timer reaches the capture phase; success scores like a correct prompt with catch-stage multipliers of +1 for Calm, +1.5 for Focus, and +2 for Scare, while failure scores like a normal wrong prompt. QTEs do not grant special XP rewards, Focus uses a stationary centered Pokemon with visible drawn-circle trail feedback and live circle-progress feedback, Scare uses large tappable decoy Pokemon without a visible completion counter, and Calm berry choices do not consume berries.
- Explorer automatically controls how many encounter items can be used during a wild encounter: 1 at level 1, 2 at 25, 3 at 50, 4 at 80, and 5 at 95.
- Failed ball throws can trigger one Second Chance per encounter, keeping the Pokemon from fleeing and returning the player to the capture phase. The base chance is 10%, rising to 15% at Explorer 28, 18% at Explorer 46, and 20% at Explorer 72. Berry Candy items are mid-encounter items that add +10 percentage points to that roll and use the same encounter item pool as lures. Encounter items remain usable in the capture phase after the main quiz timer expires while the encounter session is still alive.
- Successful catches generate Crystals from the caught Pokemon's level at 1:1, with the existing +15 Crystal bonus still applied when that Pokemon form has research level 3 or higher. Catch locations should not author static Crystal rewards. Catch result reward summaries still grant partner Pokemon Research XP, but hide that partner XP row so the modal focuses on the caught Pokemon and tangible rewards.
- Ultra Beasts hard-set non-Master Ball catch rolls to 0.1%, regardless of current quiz catch rate, ball bonus, or catch ability modifiers. Master Ball remains guaranteed. Beast Ball is neutral against Ultra Beasts under that same hard-rate rule, and Beast Ball against non-Ultra Beast Pokemon also hard-sets the catch roll to 0.1%. Rocket Ball has 0% catch chance against non-Shadow Pokemon; Shadow Pokemon have 0% catch chance with every other ball, including Master Ball, while Rocket Ball uses the ordinary Poke Ball catch calculation.
- Background music per region
- Battle detail previews show opponent teams with the Pokemon name or `???` plus level or level-range labels, without capture-completion badges.
- Explore detail modals lazy-load their heavier detail helpers after open. Reward previews memoize selected rewards, collapse repeated secret fishing drops, disable reward carousel auto-scroll, and omit generic XP/material/gem/candy/casing previews for catch, battle, and Field Observation entries. Fishing reward previews omit repeatable auto item drops such as Water Gems and Aqua Solvent, while still showing unclaimed unique/secret collectibles.
- Location cards can show a gold star centered along the bottom edge of the icon once every grouped Catch, Battle, Study, and Fish Pokemon form is at least research level 1, every Catch/Fish form is caught, and no one-time collectible rewards such as task unlocks or unique items remain claimable.
- Catch scare-away QTEs show decoy Pokemon from the same eligible catch encounter pool, excluding the active form. Single-Pokemon special catches fall back to Unown forms for the decoys.
- Missing or stale catch encounter sessions clear the client and return the player to Explore instead of leaving the encounter page mounted. Timer-zero responses keep the encounter session alive and move the player into the capture phase.

## Location Data
Locations stored in `src/data/locations/entries/` by region:
- Kanto (Pallet Town, Viridian City, etc.)
- Johto, Hoenn, Sinnoh, Unova, Kalos, Alola, Galar, Paldea
