# Kanto Abilities Draft

Status: Draft for design discussion. Do not implement directly from this file without a follow-up pass.

## Intent

This document is a working draft for giving the first 151 Pokemon more flavorful Explore/catch-minigame abilities. The goal is not to make every Pokemon stronger. The goal is to make ability rolls feel like a small personality trait attached to the Pokemon.

For now, these abilities should only affect wild Explore/catch encounters. They should not affect battles, fishing, research mini-games, Field Observation, voyages, shops, or TCG systems.

## Current System Notes

The current ability system can already express these broad effect types:

- `timer`: changes the catch encounter timer.
- `reward`: adds possible rewards after a catch.
- `shiny`: multiplies shiny odds at encounter start.
- `encounter`: can replace a normal encounter with another encounter.
- `level`: nudges the caught Pokemon level within the location range.
- `catch`: multiplies final catch chance when throwing a ball.
- `escape`: gives the companion an active escape action.
- `answer`: currently exists, but Voltorb's `unstable` behavior is hard-coded and should become generic before more answer abilities are implemented.

The intended cleaned-up natural assignment pools are:

- Species/form pool: Kanto flavor abilities.
- Type pool: none.
- Global pool: none.

Existing ability patches should remain. Patch-taught abilities, including Charmer and Gem Finder, can continue to exist even when they are not natural rolls.

Evolution rule: if a Pokemon has a natural species/form ability and evolves, that ability should become the evolved form's natural species/form ability. If the evolved form has no species/form ability, the old species ability is cleared. Patch-taught abilities should not be changed by evolution. This matters for lines where a base form has a joke or weak trait, such as Pidgey's `kick_sand`, but the evolved form should have a different identity.

## Balance Guidelines

Use these numbers as defaults, not laws:

- Most natural species abilities: 4-8% roll chance.
- Common, low-impact flavor abilities: up to 10%.
- Strong, rare, or encounter-changing abilities: 1-3%.
- Catch multipliers: usually x1.02 to x1.05.
- Timer bonuses: usually +3 to +6 seconds.
- Timer penalties: rare, flavorful, and usually no worse than -3 seconds unless deliberately chaotic.
- Shiny effects: avoid broad shiny boosts. Prefer no shiny effects until the roster feels stable.
- Reward abilities: small independent drop rolls, never guaranteed.
- Encounter replacements: very rare and always blocked by `keyEncounter`.
- Chaotic downside abilities are allowed when the Pokemon strongly supports the joke or flavor.

## Effect Vocabulary

These are reusable effect shapes for the draft roster.

| Effect | Draft Meaning | Notes |
| --- | --- | --- |
| Small timer bonus | +3 to +5 seconds | Good default for calm, slow, defensive, or watchful Pokemon. |
| Large timer bonus | +6 to +8 seconds | Use sparingly for very slow or protective Pokemon. |
| Tiny catch nudge | x1.02 to x1.03 catch rate | Broad but low-impact. |
| Type catch nudge | x1.04 to x1.05 against matching types | Better than broad catch, but narrower. |
| Answer grace | 8-12% chance for a wrong answer not to count | Requires generic answer support. |
| Answer flourish | 10-15% chance for a correct answer to add +1 or +2 catch rate | Requires generic answer support. |
| Risky answer flourish | Correct answer upside with wrong-answer downside | Use only for volatile Pokemon. |
| Tiny reward roll | 1-5% item rolls after catch | Should use already-existing, low-economy items. |
| Rare encounter hint | 1/128 to 1/512 replacement chance | Must respect `keyEncounter`. |
| Active escape | 25-45% chance | Player-triggered utility, not passive power. |

## Open Design Questions

- Should every final evolution feel better than its base form, or should some lines keep one family ability throughout?
- Should shiny-affecting abilities be omitted entirely from the first implementation pass?
- Should answer abilities be added now, or should v1 use only currently generic effects?
- Should ability names lean closer to canonical Pokemon abilities or custom app flavor?
- Should legendary Pokemon have normal utility abilities, or rare prestige abilities with very low assignment odds?

## Draft Kanto Roster

This table covers species 1-151 with one editable row per species. Rates and effects are placeholders for discussion.

| Dex | Pokemon | Draft Ability | Rate | Draft Effect | Notes |
| ---: | --- | --- | ---: | --- | --- |
| 1 | Bulbasaur | `shining_personality` | 0.1% | Encounters with the same species & form id have +1 shiny roll | NEW |
| 2 | Ivysaur | `shining_personality` | 0.1% | Encounters with the same species & form id have +1 shiny roll | NEW |
| 3 | Venusaur | `shining_personality` | 0.1% | Encounters with the same species & form id have +1 shiny roll | NEW |
| 4 | Charmander | `shining_personality` | 0.1% | Encounters with the same species & form id have +1 shiny roll | NEW |
| 5 | Charmeleon | `shining_personality` | 0.1% | Encounters with the same species & form id have +1 shiny roll | NEW |
| 6 | Charizard | `shining_personality` | 0.3% | Encounters with the same species & form id have +1 shiny roll | NEW |
| 7 | Squirtle | `shining_personality` | 0.3% | Encounters with the same species & form id have +1 shiny roll | NEW |
| 8 | Wartortle | `shining_personality` | 0.3% | Encounters with the same species & form id have +1 shiny roll | NEW |
| 9 | Blastoise | `shining_personality` | 0.3% | Encounters with the same species & form id have +1 shiny roll | NEW |
| 10 | Caterpie | `swarm` | 3% | catch increase from correct answers are doubled against the same species/form id | NEW |
| 11 | Metapod | `swarm` | 3% | catch increase from correct answers are doubled against the same species/form id | NEW |
| 12 | Butterfree | `swarm` | 3% | catch increase from correct answers are doubled against the same species/form id | NEW |
| 13 | Weedle | `swarm` | 3% | catch increase from correct answers are doubled against the same species/form id | NEW |
| 14 | Kakuna | `swarm` | 3% | catch increase from correct answers are doubled against the same species/form id | NEW |
| 15 | Beedrill | `swarm` | 3% | catch increase from correct answers are doubled against the same species/form id | NEW |
| 16 | Pidgey | `nesting` | 2% | +3 normal materials | NEW |
| 17 | Pidgeotto | `preen` | 4% | 100% chance for 3x feather materials to drop | NEW |
| 18 | Pidgeot | `tailwind` | 2% | +3 Seconds on Timer | NEW |
| 19 | Rattata | `scavenge` | 3% | 10% for extra Normal crafting material after catch | Existing effect, higher natural rate than before but low drops. |
| 20 | Raticate | `scavenge` | 3% | 10% for extra Normal crafting material after catch | Duplicated from Rattata for easy family-line editing. |
| 21 | Spearow | `sharp_eye` | 2% | 10% Chance 1 Incorrect answer is removed from selection per question. | New |
| 22 | Fearow | `sharp_eye` | 3% | 10% Chance 1 Incorrect answer is removed from selection per question. | New |
| 23 | Ekans | `shed_skin` | 6% | Active escape chance, 25%. | Player utility, not passive catch power. |
| 24 | Arbok | `shed_skin` | 6% | Active escape chance, 25%. | Duplicated from Ekans for easy family-line editing. |
| 25 | Pikachu | `secret_admirer` | 1% | Mimikyu battle replacement 1:256 | Existing but modified slightly |
| 26 | Raichu | `charge` | 5% | 100% chance for 3x electrical components to drop | new |
| 27 | Sandshrew | `reckless_burrow` | 3% | 100% chance 3 ground materials drop | new |
| 28 | Sandslash | `instant_claw` | 8% | first question gives 3x catch rate if correct | new |
| 29 | Nidoran-F | `young-love` | 2% | +50% catch rate against Nidoran-M | new |
| 30 | Nidorina | `teen-angst` | 2% | -50% catch rate against Nidorino | new |
| 31 | Nidoqueen | `royal_authority` | 2% | +50% catch rate against nidoran male female, nidorino and nidorina | new |
| 32 | Nidoran-M | `young-love` | 2% | +50% catch rate against Nidoran-F | new |
| 33 | Nidorino | `horn_sense` | 2% | -50% catch rate against Nidorina | new |
| 34 | Nidoking | `royal_authority` | 2% | +50% catch rate against nidoran male female, nidorino and nidorina | new |
| 35 | Clefairy | `midnight_blessing` | 1% | 15% Catch rate + only at 23:55 - 00:05 | Night condition would need criteria support uses location time. |
| 36 | Clefable | `midnight_blessing` | 1% | 15% Catch rate + only at 23:55 - 00:05 | Night condition would need criteria support uses location time. |
| 37 | Vulpix | `foxfire_path` | 1% | Tiny reward roll for Fire gems. | Keep below Gem Finder value. |
| 38 | Ninetales | `foxfire_path` | 1% | Tiny reward roll for Fire gems. | Duplicated from Vulpix for easy family-line editing. |
| 39 | Jigglypuff | `baby_doll_eyes` | 4% | 20% Chance incorrect answers dont reduce catch rate | new |
| 40 | Wigglytuff | `baby_doll_eyes`| 4% | 20% Chance incorrect answers dont reduce catch rate | new |
| 41 | Zubat | `blind` | 0.5% | all answers show as ??? | new |
| 42 | Golbat | `screech` | 1% | lowets timer by 5s | new |
| 43 | Oddish | `sweet_scent` | 0.3% | +5% catch rate against grass pokemon | new |
| 44 | Gloom | `sweet_scent` | 0.8% | +5% catch rate against grass pokemon | new |
| 45 | Vileplume | `sweet_scent` | 1% | +5% catch rate against grass pokemon | new |
| 46 | Paras | `weak_parasite` | 5% | 1:100 chance to drop tiny_mushroom if it does this ability is lost | new |
| 47 | Parasect | `weak_parasite` | 5% | 1:100 chance to drop big_mushroom if it does this ability is lost | new |
| 48 | Venonat | `bug_hunt` | 2% | +10% catch rate againt bugs 6pm-6am | new |
| 49 | Venomoth | `bug_hunt` | 2% | +10% catch rate againt bugs 6pm-6am | new |
| 50 | Diglett | `dig` | 6% | Active escape chance, around 30%. | new |
| 51 | Dugtrio | `dig` | 6% | Active escape chance, around 30%. | new |
| 52 | Meowth | `coin_catcher` | 3% | Adds 3x pokemon level as pokedollar drop at end of catch | new |
| 53 | Persian | `coin_catcher` | 3% | Adds 3x pokemon level as pokedollar drop at end of catch | new |
| 54 | Psyduck | `confused` | 1% | correct answers lose catch rate incorrect gain | new |
| 55 | Golduck | `swit_swim` | 1% | +6 seconds against water pokemon | new |
| 56 | Mankey | `short_fuse` | 20% | Incorrect answers give double punishment | new |
| 57 | Primeape | `short_fuse` | 20% | Incorrect answers give double punishment | new |
| 58 | Growlithe | `treat_search` | 2% | 30% chance to drop a level appopriate candy based on enemys level | new |
| 59 | Arcanine | `legendary_aura` | 1% | +10 seconds against legendary pokemon | new |
| 60 | Poliwag | `ydrate` | 4% | +3 water materials | new |
| 61 | Poliwhirl | `dizzy_swirl` | 3% | 15% chance answer positions rotate after being shown; correct answer gives 2x catch rate | new |
| 62 | Poliwrath | `knuckle_lock` | 2% | +15% catch rate against Fighting pokemon, but wrong answers remove 2 catch rate | new |
| 63 | Abra | `teleport` | 5% | Active escape chance, around 35% | Existing natural ability can stay. |
| 64 | Kadabra | `spoon_bend` | 2% | 10% chance one incorrect answer is changed into "bent spoon" and cannot be selected | new |
| 65 | Alakazam | `calculated_future` | 1% | First question preview shows the correct answer for 1 second, then timer loses 3 seconds | new |
| 66 | Machop | `training_rep` | 6% | 3x grip weave drop | new |
| 67 | Machoke | `show_off` | 4% | First correct answer gives +3 catch rate; first wrong answer gives -3 catch rate | new |
| 68 | Machamp | `four_arm_hold` | 2% | Against pokemon with lower level, correct answers are worth +1 extra catch rate | new |
| 69 | Bellsprout | `trip_vine` | 3% | 20% chance the first wrong answer does not reduce catch rate against Grass pokemon | new |
| 70 | Weepinbell | `hanging_lure` | 2% | 10% chance a Bug pokemon encounter gets +20% catch rate | new |
| 71 | Victreebel | `pitcher_trap` | 1% | +20% catch rate against Bug pokemon, but escape action is disabled for that encounter | new |
| 72 | Tentacool | `clear_jelly` | 3% | 15% chance wrong answers only remove timer, not catch rate | new |
| 73 | Tentacruel | `venom_tangle` | 2% | Correct answers against Poison pokemon add +1 catch rate; wrong answers remove 2 seconds | new |
| 74 | Geodude | `skipping_stone` | 4% | adds 3x small stone material to rewards | new |
| 75 | Graveler | `rolling_start` | 3% | Encounter starts with +5 seconds, but each wrong answer removes an extra 1 second | new |
| 76 | Golem | `rolling_start` | 3% | Encounter starts with +5 seconds, but each wrong answer removes an extra 1 second | new |
| 77 | Ponyta | `fire_gallop` | 2% | If caught with time remaining +6 fire material components | new |
| 78 | Rapidash | `fire_gallop` | 2% | If caught with time remaining +6 fire material components | new |
| 79 | Slowpoke | `lazy` | 10% | +5 seconds on timer | User-proposed style. |
| 80 | Slowbro | `tail_bite` | 4% | First wrong answer does not count, but timer starts 3 seconds lower | new |
| 81 | Magnemite | `magnet_pickup` | 1% | adds 3x metal scraps material to rewards | new |
| 82 | Magneton | `magnet_pickup` | 1% | adds 3x metal scraps material to rewards | new |
| 83 | Farfetch'd | `leek_guard` | 4% | unable to select wrong answer in first 5s of encounter | new |
| 84 | Doduo | `two_heads` | 3% | highlights an answer 50% chance its wrong 50% chance right | new |
| 85 | Dodrio | `three_heads` | 2% | First three correct answers each add +1 catch rate, but first wrong answer removes 3x catch | new |
| 86 | Seel | `seal_clap` | 5% | Correct answer streak of 3 adds +2 catch against Water or Ice pokemon | new |
| 87 | Dewgong | `aurora_drift` | 2% | Between 18:00 and 06:00, +10% catch rate against Ice pokemon | new |
| 88 | Grimer | `sludge_trail` | 4% | +3 poison components | new |
| 89 | Muk | `sludge_trail` | 4% | +3 poison components | new |
| 90 | Shellder | `pearl_peek` | 3% | 15% chance Pearl is added to rewards if caught with no wrong answers | new |
| 91 | Cloyster | `pearl_peek` | 3% | 15% chance Pearl is added to rewards if caught with no wrong answers | new |
| 92 | Gastly | `ghostly_power` | 2% | Between 18:00 and 06:00, drops 3x ghost component | new |
| 93 | Haunter | `ghostly_power` | 2% | Between 18:00 and 06:00, drops 3x ghost component | new |
| 94 | Gengar | `ghostly_power` | 2% | Between 18:00 and 06:00, drops 3x ghost component | new |
| 95 | Onix | `rock_smash` | 3% | 50% chance to drop 5 rock materials against rock pokemon | new |
| 96 | Drowzee | `dream_eater` | 2% | +3% catch rate 18:00 - 06:00 | new |
| 97 | Hypno | `dream_eater` | 2% | +3% catch rate 18:00 - 06:00 | new |
| 98 | Krabby | `sideways_step` | 4% | 10% chance to remove the leftmost incorrect answer each question | new |
| 99 | Kingler | `crabhammer` | 2% | First correct answer gives +6 catch rate, but wrong first answer gives -6 catch rate | new |
| 100 | Voltorb | `unstable` | 12% | Correct answer upside, wrong answer fail risk and ability loss | Existing behavior, but rate may need lowering from 20%. |
| 101 | Electrode | `chain_reaction` | 8% | Each correct answer adds +1 extra catch rate; first wrong answer ends the encounter and removes ability | new |
| 102 | Exeggcute | `egg_count` | 3% | If exactly 6 correct answers are given, +10% catch rate | new |
| 103 | Exeggutor | `egg_count` | 3% | If exactly 6 correct answers are given, +10% catch rate | new |
| 104 | Cubone | `lonely_bone` | 2% | +20% catch rate against Cubone or Marowak, but -3 seconds on timer | new |
| 105 | Marowak | `lonely_bone` | 2% | +20% catch rate against Cubone or Marowak, but -3 seconds on timer | new |
| 106 | Hitmonlee | `counter` | 3% | 5% chance incorrect answers count as a correct answer | new |
| 107 | Hitmonchan | `counter` | 3% | 5% chance incorrect answers count as a correct answer | new |
| 108 | Lickitung | `tongue_tie` | 2% | questions and answers have scrambled text but +1 catch rate per question | new |
| 109 | Koffing | `smoke_screen` | 3% | Active escape chance around 40% | new |
| 110 | Weezing | `smoke_screen` | 3% | Active escape chance around 40% | new |
| 111 | Rhyhorn | `battle_hardened` | 3% | + 1 enemy level | new |
| 112 | Rhydon | `battle_hardened` | 3% | + 1 enemy level | new |
| 113 | Chansey | `soft_boiled` | 2% | 20% chance to add Battle Potion; if the encounter was failed, 5% chance item is still granted | new |
| 114 | Tangela | `tangle_step` | 3% | First wrong answer is ignored against Grass pokemon, but timer starts 2 seconds lower | new |
| 115 | Kangaskhan | `protective_pouch` | 1% | 1:256 chance Cubone replaces a non-key encounter | new |
| 116 | Horsea | `bubble` | 4% | +3 water component materials | new |
| 117 | Seadra | `spike_current` | 2% | +10% catch rate against Water pokemon, but wrong answers remove 1 extra catch rate | new |
| 118 | Goldeen | `beauty_splash` | 3% | If caught with no wrong answers, 10% chance to add 1 water material | new |
| 119 | Seaking | `horn_drill` | 1% | First correct answer has 0.1% chance to instantly add +100 catch rate; otherwise no effect | new |
| 120 | Staryu | `stardust_trail` | 3% | 5% chance Stardust is added if caught after 20:00 | new |
| 121 | Starmie | `cosmic_core` | 0.5% | Between 00:00 and 00:05, first correct answer gives +10 catch rate | new |
| 122 | Mr. Mime | `invisible_wall` | 3% | 50% chance incorrect answers dont lower catch chance | new |
| 123 | Scyther | `rapid-blade` | 2% | first question is +3 catch or -3 for incorrect | new |
| 124 | Jynx | `strange_song` | 2% | 15% chance the correct answer repeats the previous correct answer position | new |
| 125 | Electabuzz | `static_charge` | 3% | Every 3 correct answers adds 1 electric material to rewards against Electric pokemon | new |
| 126 | Magmar | `warm_coal` | 3% | 3x fire material drop | new |
| 127 | Pinsir | `bug_rival` | 2% | +1 catch rate against heracross | new |
| 128 | Tauros | `stampede` | 3% | Correct streaks add +2 catch rate; any wrong answer removes 5 seconds and resets streak | new |
| 129 | Magikarp | `flop` | 10% | +3 seconds on timer, but first correct answer gives no catch rate | new |
| 130 | Gyarados | `rage_surge` | 1% | Each wrong answer adds catch rate instead of decreasing and removes 2 seconds | new |
| 131 | Lapras | `gentle_ferry` | 2% | Adds 5 seconds to the encounter timer | new |
| 132 | Ditto | `wild-transform` | 100% | more complicated 50% chance to become caught pokemon replacing form id and species id adds new transformed form id on pokemon if set button appears on pokemon modal allowing it to transform back | new |
| 133 | Eevee | `stone_search` | 3% | 1:512 chance to drop either fire water, thunder ice, leaf stones | new |
| 134 | Vaporeon | `find_friends` | 2% | 1:128 replace encounter with eevee | new |
| 135 | Jolteon | `find_friends` | 2% | 1:128 replace encounter with eevee | new |
| 136 | Flareon | `find_friends` | 2% | 1:128 replace encounter with eevee | new |
| 137 | Porygon | `scan` | 2% | +5 pokemon research on caught pokemon | new |
| 138 | Omanyte | `ancestral_home` | 1% | 1:512 chance omanyte/aerodactyl/kabuto spawn | new |
| 139 | Omastar | `ancient_spiral` | 1% | First correct answer against Rock or Water pokemon gives +4 catch rate | new |
| 140 | Kabuto | `ancestral_home` | 1% | 1:512 chance omanyte/aerodactyl/kabuto spawn | new |
| 141 | Kabutops | `fossil_blade` | 1% | First correct answer against Rock or Water pokemon gives +4 catch rate | new |
| 142 | Aerodactyl | `ancestral_home` | 1% | 1:512 chance omanyte/aerodactyl/kabuto spawn | new |
| 143 | Snorlax | `deep_sleep` | 5% | +10 seconds on timer, adds oran berry to drop table | new |
| 144 | Articuno | `frigid-call` | 100% | 1:1024 articuno encounter | new |
| 145 | Zapdos | `thunder-communion` | 100% | 1:1024 zapdos encounter | new |
| 146 | Moltres | `inferno-screech` | 100% | 1:1024 moltres encounter | new |
| 147 | Dratini | `shed-scales` | 1% | +3 dragon materials | new |
| 148 | Dragonair | `shed-scales` | 1% | +3 dragon materials | new |
| 149 | Dragonite | `sonic-flight` | 0.5% | 65% escape chance | new |
| 150 | Mewtwo | `psychic_pressure` | 0.5% | correct answers worth 1.1 instead of 1 | new |
| 151 | Mew | `origin_dna` | 100% | +1% shiny chance | new |

## Implementation Notes For Later

Do not implement this roster directly without a balancing pass. When this draft is approved, implementation should:

- Move Voltorb-style answer behavior into a generic answer ability config.
- Keep Ball Boy abilities out of natural global rolls.
- Keep type-pool abilities out of natural rolls.
- Keep all existing ability patch items.
- Add tests proving every Kanto species has a natural species/form assignment.
- Add tests proving type rolls stay empty and type-themed abilities are patch-only.
- Update `docs/game-data/battle-mechanics-inventory.md`, `docs/current-game-state.md`, and `docs/features/exploration.md` when behavior actually changes.
