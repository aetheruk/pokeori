# Ability Implementation Audit

This audit tracks canonical ability behavior against the current single-battle engine.
The active registry has a battle effect for every ability, but that does not mean every
ability has its cartridge-accurate mechanic. Many generated abilities still use a
best-effort stat or damage approximation.

## Current Engine Support

Supported directly:

- Type immunity and type absorb.
- Main status immunity.
- Opponent-caused stat-stage drop immunity.
- Pokemon-type-gated status and stat-stage drop immunity.
- Opponent-caused stat-stage drop boost triggers.
- Opponent-caused stat-stage drop reflection.
- Opposing positive stat-stage bypass in damage calculations.
- Main-status reflection for direct move/status infliction.
- Opponent stat-stage boost copying.
- Entry ability copying.
- Entry opponent move, dangerous-move, and held-item scouting.
- Entry fainted-ally ability copying for Receiver-style abilities.
- Display-only entry identity masking for Illusion.
- Entry transform effects.
- Attacker ability bypass for defender-side battle ability protections.
- Mental effect immunity for authored infatuation, move-block, move-lock, and stance-disable effects.
- Ability-based voluntary switch prevention.
- Forced-switch immunity.
- Switch-out healing and status cure triggers.
- Low-HP self-switch triggers.
- Outgoing damage-reduction immunity for accuracy-style secondary statuses.
- On-damaged stat-stage triggers with optional attack-type and HP-threshold filters.
- On-damaged stance-disable triggers.
- On-damaged main-status triggers, reactive attacker chip damage, and KO reactive damage.
- Recoil-move damage boosts and recoil self-damage prevention.
- Broad indirect-damage immunity for status ticks, weather chip, hazards, and secondary-status residual damage.
- Weather-gated end-turn healing and damage ability triggers.
- End-turn status cure ability triggers.
- Main-status counter step modifiers.
- Entry weather setting from ability activation, including primal-weather replacement blocking.
- Weather-driven active battle type changes.
- On-damaged and terrain-driven active battle type changes.
- Held-item-driven active battle type changes.
- Entry terrain setting from ability activation, plus Seed Sower's on-damaged Grassy Terrain activation.
- Terrain damage modifiers plus grounded terrain sub-rules: Electric Terrain blocks sleep, Misty Terrain blocks major statuses, Psychic Terrain blocks priority moves, and Grassy Terrain heals grounded active Pokemon at turn end.
- Weather residual-damage immunity.
- Incoming and field-scope move-ID blocking from abilities.
- Incoming non-damaging status-move blocking/reflection from abilities.
- Added-effect suppression from abilities on damaging moves.
- Added-effect chance multiplication and added-effect damage boosts from abilities.
- Ability-granted same-turn interruption chance from damaging moves.
- Move accuracy multipliers and bypass from abilities.
- Ability-granted priority move contests.
- Move-ID-gated outgoing damage boosts.
- Variable multi-hit maximum damage-range selection.
- Extra-hit damage events for second-hit abilities.
- Contact-like reactive effect immunity.
- Held-item theft/removal/swap/berry-consumption protection.
- Held-item effect suppression.
- On-damaged and post-damage held-item theft triggers.
- Post-damage attacker status riders.
- Held-berry trigger thresholds, effect multipliers, post-consumption healing, and consumed-berry restoration.
- Battle-win reward triggers for involved Pokemon.
- Before-move ability skips.
- Opposing move-use depletion.
- Self move-lock from abilities.
- Move-last counter-prevention suppression.
- Before-attack active battle type changes.
- Active-turn-limited stat multipliers.
- Same-turn move interruption immunity.
- Critical-hit immunity, guaranteed-critical conditions, critical-hit chance modifiers, and critical-hit damage modifiers.
- After-KO stat-stage triggers.
- Flat battle stat multipliers.
- Outgoing/incoming damage multipliers.
- Ability type-effectiveness overrides.
- Super-effective damage gates.
- One-hit shields and full-HP lethal-hit survival.
- HP override.
- Battle form changes from entry, before-attack, after-KO, switch-out, and HP threshold triggers.
- Tera-activation ability hooks that can apply form changes and clear weather/terrain.
- Active ability suppression from Neutralizing Gas.

Not supported directly yet:

- Accuracy/evasion stages.
- Contact-only filtering.
- Full cartridge grounded overrides for terrain from items or field effects beyond the current Flying-type and Levitate checks.
- Non-weather end-of-turn healing/damage ability triggers beyond status cures.
- Broad ability copying in battle. Neutralizing Gas-style active ability suppression, Trace-style entry copying, Receiver-style fainted-ally entry copying, Illusion-style display masking, Imposter-style entry transforms, contact-like ability replacement/swapping, Pickpocket/Magician-style held-item theft, and temporary battle ability mutations/transforms are supported. Mold Breaker-style defender ability bypass is supported for modeled defender-side protections.
- Doubles/ally redirection behavior.
- Forced switch prevention from abilities.
- Ally held-item transfer ability triggers.
- Per-turn ramping ability state, except bespoke form-change state and simple active-turn-limited effects.

## Fixed In This Pass

| Ability | Previous behavior | Current behavior |
| --- | --- | --- |
| `inner_focus` | Generic 10% incoming damage reduction. | Blocks same-turn interruption/flinch-style move effects through `battle-interrupt-immunity`. |
| `big_pecks` | Reduced incoming Flying damage. | Blocks opponent-caused Defense stage drops. |
| `clear_body` | Generic 10% incoming damage reduction. | Blocks opponent-caused stat-stage drops. |
| `full_metal_body` | Best-effort non-specific fallback. | Blocks opponent-caused stat-stage drops. |
| `hyper_cutter` | Generic Attack multiplier. | Blocks opponent-caused Attack stage drops. |
| `white_smoke` | Generic 10% incoming damage reduction. | Blocks opponent-caused stat-stage drops. |
| `flower_veil` | Reduced incoming Grass damage plus blanket status immunity even on non-Grass holders. | Protects active Grass-type Pokemon from main statuses and opponent-caused stat-stage drops. This is a single-active adaptation of the cartridge ally protection because there is no ally slot. |
| `aroma_veil` | Generic incoming damage reduction. | Protects the active Pokemon from authored mental effects such as Infatuation, Torment-style move-block statuses, Encore move locks, Disable stance disables, and Cursed Body stance disables. This is a single-active adaptation of the cartridge ally protection because there is no ally slot. |
| `battle_armor` | Generic 10% incoming damage reduction. | Prevents critical hits. |
| `shell_armor` | Generic 10% incoming damage reduction. | Prevents critical hits. |
| `super_luck` | Generic 10% outgoing damage boost. | Adds critical-hit chance. |
| `sniper` | Generic 15% outgoing damage boost. | Increases critical-hit damage. |
| `merciless` | Generic damage boost against poisoned targets. | Guarantees critical hits against poisoned or badly poisoned targets. |
| `anger_point` | Always-on Attack multiplier. | Raises Attack to the stage cap after taking critical-hit damage. |
| `moxie` | Always-on Attack multiplier. | Raises Attack by one stage after directly KOing an opposing Pokemon. |
| `chilling_neigh` | Always-on Attack multiplier. | Raises Attack by one stage after directly KOing an opposing Pokemon. |
| `grim_neigh` | Always-on Special Attack multiplier. | Raises Special Attack by one stage after directly KOing an opposing Pokemon. |
| `soul_heart` | Always-on Special Attack multiplier. | Raises Special Attack by one stage after directly KOing an opposing Pokemon. |
| `as_one_glastrier` | Always-on Attack multiplier. | Raises Attack by one stage after directly KOing an opposing Pokemon. |
| `as_one_spectrier` | Always-on Special Attack multiplier. | Raises Special Attack by one stage after directly KOing an opposing Pokemon. |
| `beast_boost` | Always-on Attack multiplier. | Raises Attack by one stage after directly KOing an opposing Pokemon. This is still an approximation; exact Beast Boost needs highest-stat selection. |
| `competitive` | Always-on Special Attack multiplier. | Raises Special Attack by two stages when an opponent lowers a stat. |
| `defiant` | Always-on Attack multiplier. | Raises Attack by two stages when an opponent lowers a stat. |
| `guard_dog` | Always-on Attack multiplier. | Raises Attack by one stage when an opponent lowers a stat. |
| `mirror_armor` | Generic incoming damage reduction. | Reflects opponent-caused stat-stage drops back to the attacker. |
| `opportunist` | Generic outgoing damage boost. | Copies an opposing Pokemon's positive stat-stage boosts. |
| `keen_eye` | Always-on outgoing damage boost. | Prevents accuracy-style secondary statuses such as Sand Attack and Mud-Slap from lowering outgoing damage. |
| `stamina` | Always-on Defense multiplier. | Raises Defense by one stage after taking damage. |
| `weak_armor` | Always-on Speed boost and Defense penalty. | Lowers Defense by one stage and raises Speed by two stages after taking damage. This is still approximate because the engine does not distinguish physical/contact hits. |
| `steam_engine` | Always-on Speed multiplier. | Raises Speed by six stages after taking Fire- or Water-type damage. |
| `water_compaction` | Always-on Defense multiplier. | Raises Defense by two stages after taking Water-type damage. |
| `thermal_exchange` | Always-on Attack multiplier. | Raises Attack by one stage after taking Fire-type damage; burn immunity remains separate. |
| `electromorphosis` | Always-on Special Attack multiplier. | Raises Special Attack by one stage after taking damage. This approximates the cartridge charged-state behavior. |
| `wind_power` | Always-on Special Attack multiplier. | Raises Special Attack by one stage after taking Flying-type damage. This approximates wind-move detection until move flags exist. |
| `rattled` | Always-on Speed multiplier. | Raises Speed by one stage after taking Bug-, Dark-, or Ghost-type damage. Intimidate-trigger behavior is not represented. |
| `anger_shell` | Always-on offensive/speed multipliers below half HP. | When damage crosses HP to 50% or lower, raises Attack, Special Attack, and Speed by one stage, and lowers Defense and Special Defense by one stage. |
| `berserk` | Always-on Special Attack multiplier below half HP. | When damage crosses HP to 50% or lower, raises Special Attack by one stage. |
| `cotton_down` | Generic incoming damage reduction. | Lowers the attacker's Speed by one stage after the Pokemon takes damage. This approximates contact/global behavior in the single-battle engine. |
| `gooey` | Always-on Defense multiplier. | Lowers the attacker's Speed by one stage after the Pokemon takes damage. This approximates contact behavior until contact metadata exists. |
| `tangling_hair` | Always-on Defense multiplier. | Lowers the attacker's Speed by one stage after the Pokemon takes damage. This approximates contact behavior until contact metadata exists. |
| `arena_trap` | Generic outgoing damage boost. | Blocks voluntary switching for opposing active Pokemon, excluding Flying types and Levitate users. |
| `magnet_pull` | Generic Electric/Steel outgoing damage boost. | Blocks voluntary switching for opposing active Steel-type Pokemon. |
| `shadow_tag` | Generic outgoing damage boost. | Blocks voluntary switching for opposing active Pokemon. |
| `suction_cups` | Generic incoming damage reduction. | Blocks forced-switch move effects such as Whirlwind. |
| `run_away` | Generic battle damage fallback plus escape effect. | Grants a 70% active escape chance and bypasses ability-based switch prevention without a fake battle damage modifier. |
| `natural_cure` | Generic status-gated incoming damage reduction. | Cures the active Pokemon's main status when it switches out. |
| `regenerator` | Generic incoming damage reduction. | Restores one third max HP when the active Pokemon switches out. |
| `emergency_exit` | Damage reduction below half HP. | Forces a switch when damage drops the Pokemon to half HP or lower. Player PVE uses the existing pending switch prompt; enemy/PVP sides auto-switch to a healthy bench Pokemon. |
| `wimp_out` | Damage reduction below half HP. | Forces a switch when damage drops the Pokemon to half HP or lower. Player PVE uses the existing pending switch prompt; enemy/PVP sides auto-switch to a healthy bench Pokemon. |
| `static` | Generic Electric-oriented fallback. | Has a 30% chance to paralyze the attacker after the Pokemon takes damaging contact-like hit damage, respecting normal status immunities. |
| `flame_body` | Reduced incoming Fire damage. | Has a 30% chance to burn the attacker after the Pokemon takes damaging contact-like hit damage, respecting normal status immunities. |
| `poison_point` | Reduced incoming Poison damage. | Has a 30% chance to poison the attacker after the Pokemon takes damaging contact-like hit damage, respecting normal status immunities. |
| `effect_spore` | Reduced incoming Grass damage. | Has a 30% chance to inflict sleep, poison, or paralysis on the attacker after the Pokemon takes damaging contact-like hit damage, respecting normal status immunities. |
| `poison_touch` | Generic Poison damage boost. | Has a 30% chance to poison the damaged target after the holder deals direct damage. This is hit-based until move contact flags exist. |
| `toxic_chain` | Generic Poison damage boost. | Has a 30% chance to badly poison the damaged target after the holder deals direct damage. |
| `poison_puppeteer` | Generic Poison damage boost. | Explicitly marked as unsupported instead of boosting damage. Exact behavior needs poison and confusion to coexist after the holder poisons a target; the current engine models confusion as a main status rather than a volatile secondary status. |
| `cute_charm` | Generic incoming damage reduction. | Has a 30% chance to infatuate a compatible-gender attacker after the Pokemon takes damaging contact-like hit damage. This uses the same battle infatuation secondary status as Attract, with true contact filtering deferred until move contact flags exist. |
| `rough_skin` | Generic incoming damage reduction. | Damages the attacker for one eighth of the attacker's max HP after the Pokemon takes damaging contact-like hit damage. |
| `iron_barbs` | Reduced incoming Steel damage. | Damages the attacker for one eighth of the attacker's max HP after the Pokemon takes damaging contact-like hit damage. |
| `aftermath` | Generic incoming damage reduction. | Damages the attacker for one quarter of its max HP when the holder is knocked out by damaging contact-like hit damage. Long Reach blocks it under the current contact approximation. |
| `innards_out` | Generic incoming damage reduction. | Damages the attacker for the direct damage dealt when the holder is knocked out. This is not contact-gated. |
| `toxic_debris` | Reduced incoming Poison damage. | Scatters Toxic Spikes on the attacker's side after the holder takes damaging contact-like hit damage. This uses the existing side secondary-status switch-in hazard system and poisons switch-ins; physical-hit filtering is deferred until move category/contact flags exist. |
| `perish_body` | Generic incoming damage reduction. | Applies the existing delayed Perish Song secondary status to both active Pokemon after the holder takes damaging contact-like hit damage. True contact filtering is deferred until move contact flags exist. |
| `mummy` | Generic incoming damage reduction. | Changes the attacker's active battle ability to Mummy after damaging contact-like hit damage. True contact filtering and full unchangeable-ability exceptions are deferred. |
| `lingering_aroma` | Generic incoming damage reduction. | Changes the attacker's active battle ability to Lingering Aroma after damaging contact-like hit damage. True contact filtering and full unchangeable-ability exceptions are deferred. |
| `wandering_spirit` | Generic incoming damage reduction. | Swaps active battle abilities with the attacker after damaging contact-like hit damage. True contact filtering and full unchangeable-ability exceptions are deferred. |
| `rock_head` | Generic incoming damage reduction. | Prevents recoil self-damage from recoil-style damaging moves while still allowing HP-cost moves such as Steel Beam and Substitute to damage the user. |
| `reckless` | Unconditional outgoing damage boost. | Boosts only recoil-style damaging moves by 20%. |
| `magic_guard` | Generic incoming damage reduction. | Prevents recoil self-damage from recoil-style damaging moves and blocks indirect damage from main status ticks, weather chip, hazards, and secondary-status residual damage. Direct attack damage and HP-cost moves are still allowed. |
| `rain_dish` | Weather-gated incoming damage reduction. | Restores 1/16 max HP at end of turn in rain, heavy rain, or thunderstorm. |
| `ice_body` | Reduced incoming Ice damage. | Restores 1/16 max HP at end of turn in hail, snow, or snowstorm. |
| `dry_skin` | Water absorb plus increased incoming Fire damage. | Keeps Water absorb and Fire vulnerability, now also restores 1/8 max HP in rain/heavy rain/thunderstorm and loses 1/8 max HP in harsh sunlight/extreme sunlight. |
| `solar_power` | Sun-gated Special Attack multiplier only. | Keeps the sun-gated Special Attack multiplier and now loses 1/8 max HP at end of turn in harsh sunlight/extreme sunlight. |
| `healer` | Generic incoming damage reduction while statused. | Has a 30% chance to cure the active Pokemon's own main status at end of turn. This is a single-battle adaptation of the cartridge ally cure because there is no ally slot. |
| `soundproof` | Generic incoming damage reduction. | Blocks authored sound move IDs such as Sing, Roar, Hyper Voice, Bug Buzz, Boomburst, Sparkling Aria, Torch Song, and Psychic Noise. Exact coverage still depends on the current authored sound list until move flags exist. |
| `bulletproof` | Generic incoming damage reduction. | Blocks authored ball, bomb, and bullet move IDs such as Aura Sphere, Bullet Seed, Energy Ball, Focus Blast, Gyro Ball, Pollen Puff, Pyro Ball, Seed Bomb, Shadow Ball, Sludge Bomb, and Weather Ball. Exact coverage still depends on the current authored list until move flags exist. |
| `overcoat` | Generic incoming damage reduction plus a powder status-immunity approximation. | Blocks authored powder and spore move IDs such as Cotton Spore, Poison Powder, Sleep Powder, Spore, Stun Spore, Powder, and Magic Powder. Also prevents residual weather chip from sandstorm and hail-style weather. |
| `good_as_gold` | Generic incoming damage reduction plus broad main-status immunity. | Blocks incoming non-damaging enemy status moves without granting blanket main-status immunity or changing damage. |
| `magic_bounce` | Generic incoming damage reduction. | Prevents incoming non-damaging enemy status moves and logs the move as bounced. Full retargeted reflection remains approximated as a block because move-effect retargeting is not modeled. |
| `shield_dust` | Generic incoming damage reduction. | Suppresses added target-side effects from damaging moves, such as Ember's burn chance, without changing the incoming damage. |
| `iron_fist` | Boosted all Fighting-type damage. | Boosts only authored punch move IDs such as Bullet Punch, Drain Punch, Fire Punch, Ice Punch, Mach Punch, Mega Punch, Power-Up Punch, Shadow Punch, and Thunder Punch. |
| `strong_jaw` | Boosted all damage. | Boosts only authored bite/fang/jaw move IDs such as Bite, Bug Bite, Crunch, Fire Fang, Hyper Fang, Jaw Lock, Psychic Fangs, and Thunder Fang. |
| `sharpness` | Boosted all damage. | Boosts only authored slicing move IDs such as Air Cutter, Aqua Cutter, Bitter Blade, Cut, Fury Cutter, Leaf Blade, Night Slash, Razor Leaf, Razor Shell, Slash, Sacred Sword, Secret Sword, and X-Scissor. |
| `mega_launcher` | Boosted all Water-type damage. | Boosts only authored pulse/aura move IDs such as Aura Sphere, Dark Pulse, Dragon Pulse, Origin Pulse, and Water Pulse. |
| `long_reach` | Generic outgoing damage boost. | Prevents reactive contact-like ability effects such as Static, Effect Spore, Rough Skin, and Iron Barbs. This applies to the current engine's hit-based contact approximation until move contact flags exist. |
| `dazzling` | Generic incoming damage reduction. | Blocks authored priority move IDs such as Quick Attack, Aqua Jet, Bullet Punch, Mach Punch, Ice Shard, Shadow Sneak, Sucker Punch, and Extreme Speed. Exact coverage depends on the current authored priority list until move priority metadata exists. |
| `queenly_majesty` | Generic incoming damage reduction plus a flinch status-immunity approximation. | Blocks authored priority move IDs such as Quick Attack, Aqua Jet, Bullet Punch, Mach Punch, Ice Shard, Shadow Sneak, Sucker Punch, and Extreme Speed. Exact coverage depends on the current authored priority list until move priority metadata exists. |
| `armor_tail` | Generic Speed multiplier. | Blocks authored priority move IDs such as Quick Attack, Aqua Jet, Bullet Punch, Mach Punch, Ice Shard, Shadow Sneak, Sucker Punch, and Extreme Speed. Exact coverage depends on the current authored priority list until move priority metadata exists. |
| `compound_eyes` | Generic Attack multiplier. | Multiplies authored move accuracy by 1.3, capped at 100%. |
| `victory_star` | Generic Attack multiplier. | Multiplies the active Pokemon's authored move accuracy by 1.1. Ally-wide behavior is omitted in the single-battle engine. |
| `no_guard` | Generic outgoing damage boost. | Makes authored move accuracy resolve to 100% when the ability holder is either the attacker or defender. |
| `sand_veil` | Weather-gated incoming damage reduction. | Lowers incoming authored move accuracy by 20% in sandstorm and prevents sandstorm residual damage. This uses the engine's accuracy primitive rather than separate evasion stages. |
| `snow_cloak` | Weather-gated incoming damage reduction. | Lowers incoming authored move accuracy by 20% in hail/snow/snowstorm and prevents matching residual weather damage. This uses the engine's accuracy primitive rather than separate evasion stages. |
| `tangled_feet` | No battle effect beyond generic fallback coverage. | Halves incoming authored move accuracy while the holder is confused. |
| `wonder_skin` | Generic incoming damage reduction plus broad status immunity. | Caps incoming non-damaging move accuracy at 50% without granting blanket status immunity. |
| `sticky_hold` | Generic incoming damage reduction. | Protects the active Pokemon's held item from opposing Knock Off-style removal, Thief/Covet-style theft, Trick/Switcheroo-style swaps, and Pluck/Bug Bite-style berry consumption. |
| `pickpocket` | Generic outgoing damage boost. | Steals the attacker's held item after the holder takes damaging contact-like hit damage, if the holder has no item. Sticky Hold blocks the theft; true contact filtering is deferred until move contact flags exist. |
| `magician` | Generic outgoing damage boost. | Steals the defender's held item after the holder deals damaging move damage, if the holder has no item. Sticky Hold blocks the theft. |
| `klutz` | Generic outgoing damage penalty. | Suppresses the holder's battle held-item effects, including automatic berries, damage-block items, type boost items, held-item charge effects, attack-break consumption, and consumed-berry restoration. |
| `gluttony` | Generic incoming damage reduction below half HP. | Raises automatic HP berry trigger thresholds to 50%; normal held HP berries trigger at 25%. |
| `ripen` | Generic incoming damage reduction below half HP. | Doubles automatic held-berry healing effects when the holder's berry triggers. Status-cure berries have no doubled numeric effect. |
| `cheek_pouch` | Capture/field berry side effects only. | Heals the holder for 33% max HP after its own automatic held berry is consumed. |
| `harvest` | Capture/field berry side effects plus a generic battle fallback. | Has a 50% end-turn chance to restore the holder's last consumed berry, or 100% in harsh/extreme sunlight. |
| `unburden` | Generic 1.25x Speed multiplier. | Doubles Speed only after the holder loses or consumes its held item during battle, and clears the boost when a runtime item effect gives it an item again. |
| `pressure` | Generic incoming damage reduction. | Opposing authored moves that target the Pressure holder spend one extra move use from the attacker's shared battle move-use budget. This approximates PP depletion within the current engine. |
| `early_bird` | Generic outgoing damage boost. | Advances sleep counters by two before move resolution so the holder wakes up faster. It no longer changes damage. |
| `slow_start` | Permanent Attack and Speed penalties. | Halves Attack and Speed only for the first five active turns after entering battle. |
| `truant` | Permanent Speed penalty. | Uses a before-move ability hook to loaf around every other active turn, starting on its second active turn, instead of lowering Speed. |
| `prankster` | Generic outgoing damage boost. | Grants matching non-damaging moves the current engine's priority-style move contest, letting successful priority moves act first and prevent the counterattack. Dark-type target immunity is not represented. |
| `gale_wings` | Full-HP Flying-type outgoing damage boost. | Grants authored Flying move IDs the current engine's priority-style move contest while the holder is at full HP, without changing damage. Exact coverage depends on the current Flying move list until move priority/type flags exist. |
| `triage` | Generic incoming damage reduction. | Grants healing moves the current engine's priority-style move contest, including explicit healing fields and authored recovery descriptions such as draining moves. |
| `quick_draw` | Generic outgoing damage boost. | Gives any move a 30% chance to use the current engine's priority-style move contest, without changing damage. |
| `cursed_body` | Ghost-type incoming damage reduction. | Has a 30% chance after the holder takes damage to disable the attacker's used stance for two turns. This approximates disabling the exact move within the current stance-based battle engine. |
| `gorilla_tactics` | Attack boost only. | Keeps the 1.5x Attack multiplier and now locks the holder into its first successful move until it switches out. |
| `stall` | Permanent Speed penalty. | Uses a move-last ability effect that prevents the holder's priority-style moves from avoiding counter damage. This is the current engine's closest turn-order representation; full move-last ordering is not modeled outside counter-prevention. |
| `drizzle` | Water-type outgoing damage boost. | Sets active battle weather to Rain when the holder enters battle. |
| `drought` | Fire-type outgoing damage boost. | Sets active battle weather to Harsh Sunlight when the holder enters battle. |
| `sand_stream` | Rock/Ground/Steel outgoing damage boost. | Sets active battle weather to Sandstorm when the holder enters battle. |
| `sand_spit` | Rock/Ground/Steel outgoing damage boost. | Sets active battle weather to Sandstorm when the holder enters battle. |
| `snow_warning` | Ice incoming damage reduction. | Sets active battle weather to Snow when the holder enters battle. |
| `primordial_sea` | Water-type outgoing damage boost. | Sets active battle weather to Heavy Rain when the holder enters battle; regular weather setters cannot replace it. |
| `desolate_land` | Fire-type outgoing damage boost. | Sets active battle weather to Extreme Sunlight when the holder enters battle; regular weather setters cannot replace it. |
| `delta_stream` | Generic incoming damage reduction. | Sets active battle weather to Strong Winds when the holder enters battle; regular weather setters cannot replace it. |
| `orichalcum_pulse` | Attack multipliers without setting weather. | Sets active battle weather to Harsh Sunlight when the holder enters battle and keeps its Attack boost behavior. |
| `forecast` | Generic outgoing damage boost. | Changes the holder's active battle type to Fire in harsh sunlight/extreme sunlight, Water in rain/heavy rain/thunderstorm, Ice in hail/snow/snowstorm, and back to Normal in clear or unsupported weather. This affects battle math through the existing active type override; visual form ID/sprite swaps are not represented. |
| `color_change` | Generic incoming damage reduction. | Changes the holder's active battle type to the damaging attack type after taking typed damage. Active Terastallization is not overridden. |
| `mold_breaker` | Generic outgoing damage boost. | Bypasses modeled defender-side ability protections instead of boosting damage. This covers defender ability move blocks, type immunity/absorb effects, Wonder Guard-style damage gates, one-hit shields, critical-hit immunity, stat-drop immunity/reflection, and defender damage multipliers. |
| `teravolt` | Generic outgoing damage boost. | Uses the same defender ability bypass primitive as Mold Breaker. |
| `turboblaze` | Generic outgoing damage boost. | Uses the same defender ability bypass primitive as Mold Breaker. |
| `trace` | Generic outgoing damage boost plus non-battle scouting effects. | Copies the opposing active Pokemon's ability into active battle state and restores Trace when the Pokemon switches out. Existing scouting secondary effects remain. |
| `forewarn` | Reduced incoming super-effective damage. | Logs the opposing active Pokemon's strongest loaded authored battle move when the holder enters battle. It no longer changes damage. |
| `anticipation` | Reduced incoming super-effective damage. | Logs a warning when the opposing active Pokemon has a loaded OHKO move or a loaded damaging move that is super-effective against the holder. It no longer changes damage. |
| `frisk` | Generic outgoing damage boost. | Reveals the opposing active Pokemon's held item on entry when one exists. It no longer changes damage. |
| `damp` | Reduced incoming Fire damage. | Blocks authored explosion moves from either active Pokemon through a field-scope move block. Current blocked moves are Explosion, Self-Destruct, Mind Blown, and Misty Explosion. It no longer reduces Fire damage. |
| `neutralizing_gas` | Generic incoming damage reduction. | Suppresses the opposing active Pokemon's battle ability effects while Neutralizing Gas is active. Suppression refreshes on battle start, switch-in, forced replacement, and faint replacement, and clears when the gas user leaves or faints. |
| `imposter` | Generic outgoing damage boost. | Transforms into the opposing active Pokemon on entry, copying battle-local name, form, types, stats, stat stages, and ability. Original battle identity and Imposter restore on switch-out. Move copying is not represented because the engine uses assigned move budgets rather than cartridge move slots. |
| `unaware` | Generic incoming damage reduction. | Ignores opposing positive stat stages in damage calculations: defender-side Unaware ignores attacker offensive boosts, and attacker-side Unaware ignores defender defensive boosts. It no longer changes unboosted damage. |
| `serene_grace` | Generic outgoing damage boost. | Doubles target-side added-effect chances on damaging moves without changing damage. |
| `sheer_force` | Generic outgoing damage boost. | Boosts damaging moves with target-side added effects by 30% and suppresses those added effects. |
| `stench` | Generic outgoing damage boost. | Grants damaging moves a 10% same-turn interruption chance through the engine's flinch-style interrupt abstraction without changing damage. |
| `tough_claws` | Generic all-damage multiplier. | Boosts current authored contact-like move IDs by 33%. Exact coverage still depends on explicit move lists until contact flags exist. |
| `skill_link` | Generic outgoing damage boost. | Forces variable multi-hit moves to use their maximum hit count and authored maximum damage range. Fixed-hit multi-hit moves keep their fixed total damage, and non-multi-hit moves are not boosted. |
| `parental_bond` | Generic outgoing damage boost. | Adds a separate 25% follow-up hit after direct damaging single-hit attacks. The extra hit reuses defender damage protections, held damage blocks, Endure, and on-damaged ability hooks, so hit-sensitive effects can trigger again. Existing authored multi-hit moves are skipped. |
| `synchronize` | Reduced incoming damage while statused. | Reflects burn, paralysis, poison, and bad poison back to the source when the holder receives that main status through a move/status effect, respecting normal status immunity. |
| `battery`, `commander`, `costar`, `friend_guard`, `hospitality`, `minus`, `plus`, `power_spot`, `telepathy` | Generic single-battle stat or damage fallbacks. | Explicitly marked as no single-battle effect because their canonical mechanics require an active ally or doubles-style command slot. They no longer change direct damage or battle stats. |
| `protean` | Generic outgoing damage boost. | Changes the active Pokemon's battle type to the selected move's attack type before damage, once per switch-in. This uses the current battle type override system and does not override active Terastallization. |
| `libero` | Generic outgoing damage boost. | Changes the active Pokemon's battle type to the selected move's attack type before damage, once per switch-in. This uses the current battle type override system and does not override active Terastallization. |
| `mimicry` | Generic outgoing damage boost. | Changes the holder's active battle type from active battle terrain: Electric Terrain makes Electric, Grassy Terrain makes Grass, Misty Terrain makes Fairy, and Psychic Terrain makes Psychic. The original type is restored when terrain clears, and active Terastallization is not overridden. |
| `multitype` | Generic outgoing damage boost. | Changes the holder's active battle type from its held Plate item, falling back to Normal when no Plate is held. In-battle held item removal/restoration refreshes the active type. |
| `rks_system` | Generic outgoing damage boost. | Changes the holder's active battle type from its held Memory item, falling back to Normal when no Memory is held. In-battle held item removal/restoration refreshes the active type. |
| `zen_mode` | Generic outgoing damage boost below half HP. | Changes regular and Galarian Darmanitan into their Zen Mode forms at 50% HP or lower, and returns them to their standard forms above 50% HP. |
| `power_construct` | Generic incoming damage reduction below half HP. | Changes Zygarde 50% Forme and 10% Forme into Complete Forme at 50% HP or lower, using the existing battle form-change stat recalculation. |
| `tera_shift` | Generic outgoing damage boost. | Changes base Terapagos into Terastal Form when it enters battle. |
| `teraform_zero` | Generic outgoing damage boost. | Clears active battle weather and terrain when Stellar Terapagos activates Tera. Stellar type is not represented as a separate Pokemon type in the current type union. |
| `tera_shell` | Full-HP incoming damage reduction that stacked with normal type effectiveness. | Sets incoming damaging move type effectiveness to not very effective while Terastal Form Terapagos is at full HP. Mold Breaker-style defender ability bypass restores normal type math. |
| `sturdy` | Full-HP incoming damage reduction. | Lets a full-HP holder survive otherwise lethal direct damage at 1 HP. It no longer halves all full-HP incoming damage. |
| `electric_surge` | Electric-type outgoing damage boost only. | Sets Electric Terrain on entry. Electric Terrain boosts Electric damage and prevents grounded active Pokemon from being put to sleep. |
| `grassy_surge` | Grass-type outgoing damage boost only. | Sets Grassy Terrain on entry. Grassy Terrain boosts Grass damage and heals grounded active Pokemon for 1/16 max HP at turn end. |
| `misty_surge` | Fairy-type outgoing damage boost only. | Sets Misty Terrain on entry. Misty Terrain reduces Dragon damage and prevents grounded active Pokemon from receiving major statuses. |
| `psychic_surge` | Psychic-type outgoing damage boost only. | Sets Psychic Terrain on entry. Psychic Terrain boosts Psychic damage and blocks priority moves against grounded active Pokemon. |
| `hadron_engine` | Special Attack multiplier only. | Sets Electric Terrain on entry, including Electric Terrain's grounded sleep prevention, and keeps a Special Attack multiplier. Highest-stat selection is not represented, so the stat boost remains a Special Attack approximation. |
| `seed_sower` | Grass-type outgoing damage boost only. | Creates Grassy Terrain after the holder takes damage instead of acting as an always-on damage boost; Grassy Terrain then boosts Grass damage and heals grounded active Pokemon at turn end. |
| `air_lock` | Generic incoming damage multiplier from weather fallback. | Marked as no single-battle-weather behavior in this engine because full weather suppression is not currently modeled. |
| `cloud_nine` | Generic incoming damage multiplier from weather fallback. | Marked as no single-battle-weather behavior in this engine because full weather suppression is not currently modeled. |
| `intimidate` | Generic Attack boost from description keyword matching. | Lowers the opposing active Pokemon's Attack by one stage when entering; effect is tracked per opposing target to avoid reapplying until the target changes. |
| `ball_fetch` | Generic enemy-hold/entry battle fallback. | Explicitly marked as non-battle so it no longer applies fake damage or status modifiers; it remains a non-combat passive. |
| `bad_dreams` | Generic outgoing damage multiplier. | Marks the holder's turn-end damage to sleeping targets in turn-end residual flow; no fake outgoing modifier. |
| `corrosion` | Generic 20% outgoing damage multiplier. | Explicitly marked as status-application bypass with 20% poison on damage; no longer applies offensive battle multipliers. |
| `cud_chew` | Generic damage multiplier fallback. | Explicitly marked as non-battle because berry storage/usage is handled in non-battle systems. |
| `curious_medicine` | Generic damage multiplier fallback. | Explicitly marked as non-battle; ally-stage healing is handled by ally/party systems unavailable in single-active combat. |
| `honey_gather` | Generic incoming damage reduction. | Explicitly marked as non-battle; berry/loot collection happens in battle-win and field-observation systems. |
| `mega_sol` | Generic status or damage fallback. | Explicitly marked as non-battle form-change behavior that is not represented in single-combat damage math. |
| `poison_heal` | Generic incoming damage reduction. | Heals the holder by 1/8 max HP each turn while poisoned or badly poisoned in end-turn status processing. |
| `punk_rock` | Generic sound-damage multiplier. | Explicitly marked as non-battle; sound move interactions are tracked outside this battle-combat path. |
| `shed_skin` | Generic damage multiplier fallback. | Has a 30% turn-end chance to cure a major status through battle end-turn status-cure processing. |
| `simple` | Generic permanent attack/stat multipliers. | Explicitly marked as non-battle; stage-scale behavior is not modeled as a direct combat modifier in the current implementation. |
| `shields_down` | Generic incoming damage reduction. | Explicitly marked as non-battle; Minior form changes and form-status behavior are outside this combat loop. |
| `unnerve` | Generic offensive multiplier or damage reduction. | Explicitly marked as non-battle; held-berry prevention is handled outside direct combat math. |

## Known Bad Or Incomplete Implementations

No currently tracked battle ability has a known bad damage/stat fallback. Doubles/ally-only
abilities that cannot operate in the single-active engine are explicitly marked as
having no single-battle effect instead of receiving generic damage or stat modifiers.

## Acceptable Current Approximations

These are not exact cartridge behavior, but the current approximation is close enough for
the available battle engine until a more specific primitive exists:

- Type-damage boost abilities such as `adaptability`, `aerilate`, `pixilate`, `refrigerate`,
  `galvanize`, `steelworker`, and `rocky_payload` as outgoing damage multipliers.
- Type immunity/absorb abilities such as `levitate`, `water_absorb`, `volt_absorb`,
  `flash_fire`, `sap_sipper`, `earth_eater`, `well_baked_body`, `storm_drain`,
  and `lightning_rod`.
- Simple status immunities such as `limber`, `immunity`, `insomnia`, `vital_spirit`,
  `water_veil`, `own_tempo`, `oblivious`, `magma_armor`, and `leaf_guard`.
- Healer as a single-active 30% end-turn self status cure, since the current engine
  has no active ally slot to cure.
- Flower Veil as single-active Grass-type status and stat-drop protection, since the
  current engine has no active ally slot to protect.
- Aroma Veil as single-active mental-effect protection for authored infatuation,
  move-block, move-lock, and stance-disable effects, since the current engine has no
  active ally slot to protect.
- Pickup as involved-Pokemon battle-win item reward rolls while the holder has no held item,
  plus its existing capture and field utility effects.
- Symbiosis as an explicit no-single-battle-effect marker, since its canonical behavior
  requires an active ally item-transfer slot.
- Receiver and Power of Alchemy as entry copies from a fainted same-side Pokemon, using
  team order as a single-battle approximation of ally-faint timing.
- Forewarn, Anticipation, and Frisk as entry scouting logs for the opposing active
  Pokemon's loaded moves or held item.
- Damp as field-scope blocking for authored explosion moves from either active Pokemon.
- Sturdy as full-HP survival at 1 HP against otherwise lethal direct damage.
- Skill Link as maximum hit count and maximum authored damage range for variable multi-hit moves.
- Illusion as a display-only name/form mask from a healthy reserve Pokemon that breaks
  after damaging hit damage, without changing battle stats, types, or damage.

## Audit Notes

- Every active ability still resolves to at least one battle effect.
- Passing the registry integrity test only proves a battle effect exists; it does not prove
  semantic accuracy.
- Future ability work should prefer adding a small battle primitive over adding another
  always-on damage multiplier when the canonical behavior is event-driven.
