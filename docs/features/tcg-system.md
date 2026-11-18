Energy is modeled as a shared pool, with no Energy cards in deck, hand, or discard. Modeled searches and recoveries that would move Energy cards into hand or from discard add the printed type and amount to the pool, capped at 12. Concealed Cards and Salazzle/Ninetales Fire Energy draw Powers spend a shared-pool unit for their printed hand Energy discard costs. Effects that depend on individual attached Energy are unsupported unless explicitly mapped to another pool operation. Trainer-card effects are not implemented by this Ability/Power system.

NPC turns run in bounded, lightweight steps after the player's action. The opponent evolves any legal Pokémon, then chooses an available attack, charges if it cannot attack, or ends the turn. Attack scoring uses fewer outcome samples to keep battle actions from blocking the app server; a safety limit ends a turn if automatic effects fail to make progress.

Silver Tempest Radiant Alakazam’s once-per-turn Painful Spoons Ability selects an opposing Pokémon with damage and moves up to two counters to another opposing Pokémon using the shared counter-move interface.
Banette ex, Typhlosion δ, and Cresselia LV.X have once-per-turn damage-counter movement across either player's board. Banette ex and Typhlosion δ require the source to be Active; all three effects are blocked by Special Conditions and use the existing source/target selection flow.
Paldea Evolved Shinx’s Active-only forced-switch Ability uses the shared opponent-forced-switch action in PvE and PvP. The Ability is once per turn and the opposing replacement is resolved through the current switch flow.
Deoxys Ninjask’s Fast Protection checks whether the attacker is a Basic Pokémon, then blocks both attack effects and damage to Ninjask. Ability suppression and attacks that ignore target effects are respected.
POP Series 7 Wormadam Sandy Cloak’s Sandy Cloak Poké-Body blocks attack effects but leaves damage intact. The rule runs through attack-effect resolution and respects Ability suppression.
Delta Species Volbeat/Illumise partner protection resolves in the shared attack-protection path. Illumise protects Volbeat from Pokémon-ex attacks; Volbeat protects Illumise from Dark-named Pokémon attacks. These effects prevent both damage and other attack effects, and the provider Ability must be active under current suppression rules.
Legend Maker Dual Aura suppresses Poké-Bodies on evolved non-Pokémon-ex from both players while Latias/Latios and its named partner are in play. The shared suppression check applies this rule across battle effects and avoids the suppressor recursively disabling itself.
Legend Maker Wobbuffet’s evolved-only Poké-Body adds one to the opposing Active Pokémon’s Retreat Cost. The retreat calculation checks Wobbuffet’s Evolution stack, board presence, and Ability suppression.
Energy-conditioned Weakness protection uses this format’s shared Energy count and selected Energy type as an approximation for individual attached Energy. It supports eligible own-board Energy checks and named Pokémon checks that can be evaluated from those fields.
Passive Weakness protection supports board-wide, Active-only, and Pokémon-type scopes, including cross-player type protection and Kingdra’s in-play Active protection. Effects conditioned on Stadiums, Tools, Energy attachments, or a future turn remain outside this change.
Dragon Frontiers Electabuzz δ can use its once-per-turn Poké-Power while evolved and free of Special Conditions to draw the bottom card of its deck. The bottom-deck draw resolves in PvE and PvP.
Deoxys Claydol's Cosmic Power is supported while Active and free of Special Conditions. Once per turn, it shuffles the player's hand into their deck, then draws up to the opponent's hand size. PvE and PvP preserve the opponent's hand size for the draw and shuffle/draw through the battle deck.
White Flare/SV Black Star Promos Gothitelle's Active-only Ability shuffles the opponent's hand into their deck and makes them draw up to 3 cards once per turn. The engine validates the Active requirement, tracks the turn use, and resolves the opponent's hand/deck change in PvE and PvP.
Diamond & Pearl Unown [D]'s Bench-only Ability flips a coin once per turn. On heads, each player draws a card, with the player's draw resolved first; the coin event and both decks are handled in PvE and PvP.
Unbroken Bonds Salazzle's once-per-turn Ability discards a Fire Energy from hand and draws 3 cards. The battle UI filters for Fire Energy and server actions validate the discard in PvE and PvP.
Astral Radiance Radiant Greninja's Concealed Cards Ability requires discarding an Energy card from hand, then draws 2 cards once per turn. The battle UI offers Energy cards as discard choices and the server validates the submitted card in PvE and PvP.
Lost Origin Drapion VSTAR's Venomous Vortex applies Paralysis and Poison to a selected opposing Active Pokémon, with 30 Poison damage during Pokémon Checkup. It consumes the shared once-per-game VSTAR Power limit in PvE and PvP.
# TCG System

Secret Wonders Unown [Z]'s ZERO moves Unown Z from the Bench to the top of its owner's deck once per turn when that deck is empty. The action is available in PvE and PvP.
Holon Phantoms Crawdaunt ex's Splash Back returns a selected opposing Benched Pokémon and its Evolution stack to its owner's hand once per turn when the opponent has at least four Benched Pokémon. Crawdaunt ex must be free of Special Conditions; player, PvP, and automatic NPC paths validate the target and usage limit.
Supreme Victors Yanmega can use its Active-only Power once per turn to recover a Grass Energy from the discard pile into the shared Energy pool. Special Conditions block use; player, PvP, and NPC paths use the existing discard Energy attachment Ability flow.
Unseen Forces Aipom can use Snappy Move once per turn from the Bench to draw a card and move itself to the bottom of its owner's Pokémon deck. The action is supported in player, PvP, and automatic NPC turns. This battle format does not model attached cards, so there are no attached cards to discard as part of the effect.
Brilliant Stars Empoleon can use its discard-pile Ability with an empty hand to put itself onto an open Bench slot, then draw up to three cards. The per-card use is tracked across player, PvP, and NPC actions.
Cosmic Eclipse Aipom can move the top card of the opponent's deck to the bottom without inspecting it, once per turn. Player, PvP, and automatic NPC paths preserve the deck order and track per-Aipom use.
Mega Evolution Gumshoos's Evidence Gathering uses the hand/deck swap action: the player selects a hand card to exchange with the top card of the Pokémon deck, with once-per-turn use enforced for player, PvP, and NPC turns.
Twilight Masquerade Morpeko shares the existing top-card inspection and discard action with Sableye. Morpeko's wording has no Special Condition restriction; player/PvP activation and NPC use enforce its once-per-turn limit.

Deoxys Jirachi's Wish Maker selects one of the top five deck cards, shuffles the rest back, and applies Sleep to all living friendly Active Pokémon once per turn. Jirachi must be Active and free of Special Conditions; PvE and PvP are supported.

Deoxys Sableye can inspect the opponent’s hand once per turn while Active and free of Special Conditions, using the existing PvE/PvP reveal action.

Diamond & Pearl Unown [C] flips once per turn from the Bench to search for a Basic Unown. On heads it is put onto the Bench; deck eligibility, capacity, and use limits are validated by the shared PvE/PvP action.

Diamond & Pearl Unown [A]'s Bench-only Power reorders the top two cards of its owner's deck once per turn using the existing deck-order chooser in PvE and PvP.

BW Black Star Promos Mew’s Psyscan reveals the opponent’s hand once per turn while Mew is Active, reusing the existing PvE/PvP hand reveal action.

Great Encounters Caterpie and Metapod, plus Legend Maker Cascoon, can use their Active-only evolution-search Power once per turn. A coin flip evolves the source Pokémon directly on heads, after the server validates the deck card and evolution timing. Special Conditions and Ability suppression block use in PvE and PvP.

Holon Phantoms Mew ex’s Psychic Vision inspects the opponent’s hand once per turn while Mew ex is on the Bench. PvE and PvP use the existing hand reveal action.

Great Encounters Wigglytuff’s Good Night Melody makes each player’s Active Pokémon Asleep once per turn. Wigglytuff must be free of Special Conditions; PvE and PvP share the status action.

Sandstorm Xatu’s once-per-turn Power heals one damage counter from each of its owner’s Active Pokémon. The Ability is blocked by Special Conditions and resolves in PvE and PvP.

Generations Meowstic-EX’s Shadow Ear moves one damage counter from one of its controller’s Pokémon to an opposing Pokémon once per turn while Meowstic-EX is Active. PvE and PvP use the shared counter movement action.

Unified Minds Jynx’s Ominous Posture moves one damage counter between two of its controller’s Pokémon once per turn, using the shared counter movement action in PvE and PvP.

Sandstorm Golduck’s Psyduck Step is supported once per turn while Golduck is Active and free of Special Conditions. On heads, the opposing Active Pokémon becomes Confused in PvE and PvP.

Holon Phantoms Vileplume’s Poison Pollen flips a coin once per turn while Vileplume is free of Special Conditions. On heads, it Poisons the opposing Active Pokémon in PvE and PvP.

Legend Collection Gengar can move one damage counter between two opposing Pokémon once per turn while free of Special Conditions. This move may Knock Out the target, and works in PvE and PvP.

Skyridge Snorlax’s once-per-turn Poké-Power heals one damage counter from itself while Active, then makes Snorlax Asleep. It cannot be used while Snorlax has a Special Condition; PvE and PvP enforce the gate and apply the resulting status.

Astral Radiance and Crown Zenith Darkrai VSTAR's Ability returns up to two Item cards from its owner's discard pile to hand, once per game. The engine recovers up to two available Items automatically and uses the shared VSTAR Power limit; Ability suppression is enforced in PvE and PvP.

151 and Paldean Fates Snorlax's Voraciousness can return up to two Leftovers cards from its owner's discard pile to hand once per turn. The engine recovers up to two available copies automatically; Ability suppression and the per-turn use limit are enforced in PvE and PvP.

Rebel Clash Eldegoss V can return a chosen Supporter from its owner's discard pile to hand when played from hand onto the Bench. The effect is available in PvE and PvP and is disabled by Ability suppression.

Rising Rivals Starmie's discard-recovery Power returns one Basic Water Energy to hand once per turn. It is available to either side when Starmie is free of Special Conditions and Ability suppression.

HeartGold & SoulSilver Ninetales can discard a Fire Energy card from hand once per turn to draw up to three cards. It cannot use the Power while affected by a Special Condition; the shared Energy pool is not involved.

HeartGold & SoulSilver Slowking's Temporal Backflow rearranges the top three cards of either player's deck once per turn. The player selects the deck and order, and Special Conditions disable the Power.

HS—Unleashed Kingdra can place one damage counter on a selected opposing Pokémon once per turn. Special Conditions, Ability suppression, and target-side Ability protection are enforced.

HS—Unleashed Floatzel can once per turn convert a selected Water Energy type from the shared pool into one additional Energy. It is blocked by Special Conditions. Individual attached Energy cards are not tracked, so this attachment uses the shared pool representation.

Supreme Victors Solrock's Premonition rearranges the top three deck cards once per turn when Lunatone is in play. It is disabled by Solrock's Special Conditions and uses the deck-order choice controls.

Supreme Victors Garchomp C LV.X's Healing Breath can be used when it evolves onto Active Garchomp C to heal all of its owner's Pokémon SP. The evolution prompt can decline it, and healing prevention and Ability suppression apply.

Arceus Lopunny's Hustle Step can discard an Energy card from hand once per turn to heal 10 damage from each of its owner's Pokémon. Special Conditions and healing prevention are enforced.

Arceus Gengar can once per turn move a damage counter between two of the opponent's Pokémon. Special Conditions and counter-movement prevention disable the Power.

Arceus Salamence's Top Entry reveals the top card of its controller's deck once per turn. A Basic Energy adds one Energy to the shared pool; any other card goes to discard. Special Conditions disable the Power.

Arceus Gengar LV.X can once per turn remove an opposing Pokémon LV.X, restore the Pokémon underneath it, and shuffle the LV.X card into its owner's deck. Special Conditions and Ability suppression are enforced.

Platinum Drapion LV.X's Poké-Power can Poison a selected opposing Active Pokémon on heads and raises that Poison checkup to 30 damage. The player selects among eligible Active targets; NPC Drapion chooses the first. Special Conditions and Ability suppression are enforced.

Stormfront Raichu LV.X's Link Lightning grants one additional attack only after Voltage Shoot. The shared extra-attack flow requires the same Active attacker to make the follow-up attack and enforces Special Condition and Ability suppression restrictions.

Legends Awakened Unown J's Bench-entry Power lets its owner choose a Trainer in the discard pile and flip a coin; heads returns that card to hand. Player and PvP choices are explicit, while NPC Unown J chooses the first available Trainer.

Majestic Dawn Garchomp LV.X's Dragon Pulse resolves on evolution onto Active Garchomp, records three coin flips, and places one damage counter per heads on every opposing Benched Pokémon.

Great Encounters Unown H's HEAL is supported once per turn when Unown H, E, A, and L are on the Bench. It removes all Special Conditions from one friendly Active Pokémon; suppression and current-turn use are checked.

TCG Battle also resolves selected printed Pokémon abilities. Board-wide Weakness-removal abilities now apply to eligible Pokémon on their side, with active-provider, subtype/type, and supported named-Pokémon conditions checked from battle state.
DP Black Star Promo Toxicroak G and HS—Undaunted Umbreon can use their Active-only, once-per-turn coin-flip Powers while free of Special Conditions. Heads returns the Pokémon and its modeled Evolution cards to hand; tails leaves it Active. Player, PvP, and NPC battles are supported. Individual attached Energy and Trainer cards are not modeled by this return effect.
Ultra Prism Rotom forms can ignore all Energy in their own attack costs while at least nine Pokémon Tool cards are in the owner's discard pile. This uses the shared discard and attack-cost rules in player, PvP, and NPC battles.
Team Up Incineroar-GX can use Scar Charge while it can survive the 30 damage counters and the deck contains Darkness Energy. It searches up to three Darkness Energy cards and adds that many units to the shared Energy pool; the pool represents its printed attachments. Player-triggered PvE/PvP and NPC turn automation are supported.
Astral Radiance Hisuian Lilligant VSTAR can use its once-per-game VSTAR Power to search up to five Grass Pokémon and Grass Energy cards into hand. Player/PvP selection is validated server-side, and NPC turns choose up to five eligible cards automatically.
Team Magma's Mightyena can use Call for Help once per turn while Active and free of Special Conditions to search the Pokémon-only deck for a Team Magma Pokémon into hand. Hidden Legends Milotic can optionally use Healing Shower when evolved from hand to remove all damage from Pokémon on both sides, excluding Pokémon-ex; healing prevention and Ability suppression apply, and the PvE opponent uses the effect automatically. Beldum's Magnetic Call flips once per turn to search for a Metal Basic Pokémon onto the Bench; Special Conditions, Ability suppression, and Bench capacity are enforced for players and PvE opponents. Castform's Temperamental Weather can switch between its four modeled forms by selecting another form from the Pokémon deck, transferring the modeled damage and conditions, and sharing one use per turn across all copies. Rhydon's Power Diffusion prevents attack damage to its owner's Benched Pokémon while Rhydon is Active; Ability suppression disables it. Active Relicanth's Deep Sleep checks each Pokémon Asleep at the end of a turn with two coin flips; only two heads wake it. This works for either side and respects Ability suppression and Special Conditions on Relicanth.
Groudon ex and Kyogre ex's Mark of Antiquity prevents both players' named legendary Pokémon from attacking while its holder is Active. The attack lock checks either side and is disabled by Ability suppression.
Claydol's Primal Pull adds one Energy to each evolved Pokémon's attack cost while a Claydol is Active; it affects both players' attacks and is disabled by Ability suppression. Regice ex's Crystal Body blocks opposing attack effects, but not damage.
Levitate on Beldum and Metang, and Tentacool's Freefloating, modify their retreat costs using the side-wide Energy pool as an approximation for attached Energy. Igglybuff's Baby Evolution offers its matching Jigglypuff from hand and removes all damage when evolving.
FireRed & LeafGreen Nidoqueen's Family Bonds sets the Retreat Cost of Nidoran♀, Nidorina, Nidoran♂, Nidorino, and Nidoking to zero while Nidoqueen is in play. Victreebel's Acid Sampler puts one damage counter on each opposing front-row Pokémon between turns while Victreebel is Active; it stops if another of its owner's front-row Pokémon is not a Victreebel. Haunter's Head Trip can be activated from the Bench once per turn to Confuse one of its owner's Active Pokémon. Slowbro's Strange Behavior can repeatedly move a damage counter from a friendly Pokémon to Slowbro, provided it is free of Special Conditions and the transfer won't Knock it Out. Benched Wigglytuff's Assistance removes one Special Condition from a chosen Active Pokémon once per turn. Dodrio's Retreat Aid reduces the Active Pokémon's retreat cost by two for non-ex, non-Baby Pokémon while Dodrio is Benched. Venomoth's Protective Dust blocks opposing attack effects while allowing damage. Mr. Mime ex's Magic Odds and Magic Evens prevent attack damage when the damage amount matches their printed odd or even lists. Rapidash's Fiery Aura raises Burn checkup damage to 40 while Rapidash is Active; multiple copies do not stack, and Ability suppression disables the effect.
FireRed & LeafGreen Pidgeot's Quick Search can take one Pokémon card from the Pokémon-only deck into hand once per turn, shared across Quick Search copies. Special Conditions prevent its use; the deck is shuffled after the search.
FireRed & LeafGreen Ditto's Form Variation can replace Ditto with a Basic Pokémon from its owner's discard pile, excluding Pokémon-ex and Ditto. Damage, Special Conditions, and modeled effects transfer to the replacement; Ditto is discarded. The simplified Energy pool does not track individual attached Energy cards.
Team Rocket Returns Dark Crobat's Black Beam can Poison the opposing Active Pokémon once per turn while Dark Crobat is Active and free of Special Conditions. The Poison effect respects immunity and Ability suppression; the PvE opponent uses Black Beam automatically when it can apply.
Team Rocket Returns Mantine's Ripples can heal 10 damage from one friendly Pokémon other than Mantine once per turn. Mantine must be free of Special Conditions; the player chooses the target, and the NPC chooses its most injured eligible Pokémon.
Team Rocket Returns Hoppip, Skiploom, and Jumpluff's Buffer flips to survive an opponent's attack Knockout at 10 HP on heads. The check applies to the named Pokémon on either side.
Team Rocket Returns Dark Ampharos's Darkest Impulse puts 20 damage on an opponent's Pokémon after it evolves from hand, once per turn across all Dark Ampharos copies. The effect applies to PvE and PvP evolutions and uses the normal Knockout handling.
Passive retreat locks from opposing Pokémon abilities are checked before player and PvP retreat actions, including source activity and supported status gates.

Weakness resolution supports selected board-wide multipliers, source-dependent Weakness changes, and Psychic/Darkness exceptions from printed Abilities.
Some Pokémon Abilities can also make eligible attacks ignore the defending Pokémon's Resistance, with attacker type, subtype, and named-Pokémon gates checked at damage resolution.
Conditional Ability damage bonuses check side-to-side hand-size parity and opponent Pokémon-ex/GX board counts when those conditions are printed.
Iron Crown ex’s Cobalt Command boosts attacks from Future Pokémon, excluding Iron Crown ex itself; the boost is applied before Weakness and Resistance.
Walking Wake ex’s attacks ignore represented damage modifiers and prevention on the opponent’s Active Pokémon. Weakness and Resistance still apply.
Reactive passive abilities can apply supported status, damage-counter retaliation, and fixed damage to the attacking Active Pokémon after a qualifying hit. Active Spot requirements are enforced for these reactive effects.
Team-wide passive Special Condition immunities are enforced for supported board and type scopes, and abilities that say eligible Pokémon recover from conditions remove them before checkup damage.
Passive between-turn Ability damage counters are applied to supported board, subtype, and status targets.
Snowy Terrain’s direct Pokémon Checkup damage applies to the opponent’s Active Pokémon when Glaceon ex is Active.
Passive dual-type Abilities add their granted types to attack damage’s Weakness and Resistance checks while the source Pokémon is in play and the Ability is not suppressed.
Venomoth's once-per-turn Shift Power can copy a non-Colorless type from another Pokémon in play for the rest of its owner's turn. It is blocked by Asleep, Confused, and Paralyzed, and the selected type is used for Weakness and Resistance calculations in PvE and PvP.
Abomasnow's Frigid Room blocks modeled healing for both sides while an unsuppressed copy is in play, including healing from attacks, passive and activated Abilities, Energy effects, evolution, and Bench entry.
Neo Discovery Forretress's Spikes deals 10 damage without Weakness or Resistance when an opposing Benched Pokémon switches into the front row during its owner's opponent's turn. It triggers on attack and Ability switches and manual retreat, and is disabled while Forretress is Asleep, Confused, or Paralyzed or its Ability is suppressed.
Neo Discovery Unown [I]'s Increase is offered when Unown [I] is played from hand. The player can choose one Basic Unown from the Pokémon deck to put onto the Bench; the NPC opponent chooses the first eligible card. The ability is unavailable when the Bench is full, and the deck is shuffled after the search.
Neo Discovery Kabuto's Revive Friends flips once per turn; heads searches for Kabuto and puts it on the Bench as a Basic Pokémon, while tails leaves the deck unchanged. The player chooses among matching cards, the NPC chooses the first eligible Kabuto, and Asleep, Confused, Paralyzed, or a full Bench blocks the Power.
Neo Discovery Omanyte's Fossil flips once per turn; heads searches for a Pokémon that evolves from Mysterious Fossil and puts it on the Bench as a Basic Pokémon. The player chooses among matching cards, the NPC chooses the first eligible card, and Asleep, Confused, Paralyzed, or a full Bench blocks the Power. Its printed Stage subtype is retained, so it can evolve normally later.

Neo Genesis Elekid's Playful Punch flips once per turn and deals 20 damage to the opposing Active Pokémon on heads, applying Weakness and Resistance. The player can activate it, and the NPC uses it automatically when legal; either result leaves the turn open.
Neo Revelation Sudowoodo's Mimic copies the opposing Active Pokémon's attacks while Sudowoodo is Active, retaining their attack costs and using normal attack resolution. Asleep, Confused, Paralyzed, or Ability suppression disables the Power.
Ruby & Sapphire Beautifly's Withering Dust removes Resistance from the damage calculation for all Active Pokémon on both sides while Beautifly is in play.
Sandstorm Lunatone's Lunar Eclipse and Solrock's Solar Eclipse can change their holder's type to Darkness or Fire for the turn when the partner is in play. Each can be used once per turn and is blocked by Special Conditions and Ability suppression.
Dragon Ninjask's Loose Shell searches for Shedinja from the Pokémon deck on evolution and benches it as a Basic Pokémon. The player chooses the copy; the NPC chooses the first eligible one.
Dragons Exalted Ninjask's Cast-off Shell also searches the Pokémon deck for Shedinja when Ninjask evolves from hand and puts it onto the Bench as a Basic Pokémon; the player or NPC chooses a copy and the deck is shuffled.
Legends Awakened Ninjask's Loose Shell instead lets the player choose Shedinja from their hand or discard pile when Ninjask evolves, or lets the NPC use its first eligible copy. Shedinja enters the Bench as a Basic Pokémon, and the Ability requires an open Bench slot.
Legends Awakened Ditto's Ditto DNA copies the first living opposing front-row Pokémon's maximum HP while Ditto is Active, preserving the damage already on Ditto, and makes that Pokémon's attacks available with their normal Energy costs. The copied HP and attacks update when the opposing front changes. The battle layout has multiple front slots but no target prompt for this Body, so it uses the first living slot.
Legends Awakened Delcatty's Attracting Body uses the same reactive confusion handling as Delcatty's Feline Grace: when Active Delcatty takes damage from an opposing attack, including a knockout hit, it flips a coin and Confuses the attacker on heads.
Legends Awakened Deoxys Form Change can switch a Deoxys in play with another Deoxys form from the deck, carrying over damage and modeled effects before shuffling the deck. The four forms share one use per turn; the player selects the replacement, and the NPC chooses the first eligible form.
Legends Awakened Castform's Temperament can switch any Castform in play with one of the four Castform forms in the deck, carrying over damage and modeled effects before the deck is shuffled. All four forms share one use per turn; the player chooses the replacement, and the NPC chooses the first eligible form.
Legends Awakened Metagross's Magnetic Reversal can flip once per turn to switch one opposing Active Pokémon with a chosen opposing Benched Pokémon on heads. Metagross must be free of Special Conditions; the player chooses both targets, and the NPC chooses the Active Pokémon with the least HP and its healthiest Bench replacement.
Neo Discovery Igglybuff's Gaze can silence an opposing Benched Pokémon's modeled Poké-Power until the end of the current turn. The effect clears immediately if the target leaves the Bench. Targets with mixed Poké-Power and Poké-Body/Ability types are excluded because the engine suppresses effects at the Pokémon level.
Psyduck and Golduck's Damp suppresses in-play Abilities whose use Knocks Out their own user. Suppression applies to player, PvP, and automated PvE Ability checks.
Mr. Mime-GX's Toolbox prevents the listed exact amounts of damage from the opponent's attacks through the existing passive damage-protection calculation.
Greninja ex's once-per-turn Power lets an Active Water Pokémon switch with a chosen Benched Pokémon; player, PvP, and PvE actions enforce the Water requirement and source location.
Celesteela-GX's Force Canceler blocks damage and attack effects from opposing GX attacks against the owner's whole board while Celesteela-GX is Active.
Bench-only attack protection now prevents both damage and attack effects on the protected Pokémon, and stops applying when it becomes Active.
Empoleon V suppresses Abilities on opposing Basic Pokémon without a Rule Box while Active. The same suppression check is used by supported passive rules, attack eligibility, and activated Ability controls.
Once-per-turn draw Powers can require discarding one or more selected cards from hand and then draw their printed count, including two-card discard to draw one and discard-one draw-three abilities.
Discard-hand draw Powers use their printed draw count and enforce modeled first-turn, shared-use, once-per-game VSTAR, and turn-ending conditions.
Arceus VSTAR can search up to two selected Pokémon cards from the modeled deck into hand, shuffle afterward, and share the side’s once-per-game VSTAR Power limit.
Passive between-turn healing can also target a named allied Pokémon when it is in play and printed board conditions pass.
Team damage-reduction abilities with an Active Pokémon condition now correctly find their “all of your Pokémon” target clause and apply post-Weakness/Resistance reductions.
Ting-Lu ex suppresses opposing damaged Pokémon’s Abilities while Active, except on Pokémon ex. The condition is applied consistently to supported passive effects and activated Ability controls.
Galarian Zapdos V’s attacks cost one fewer Colorless Energy for each opposing Pokémon V in play, up to the attack’s printed Colorless cost. V, VMAX, and VSTAR cards count toward the reduction.
Activated Active-provider status Powers can now apply any of the five Special Conditions to the opposing Active Pokémon, subject to the standard status-immunity rules and once-per-turn use tracking.
Direct once-per-turn draw Powers support printed fixed draw counts and Active Spot requirements using the Pokémon-only deck and hand model.
Draw-to-hand-size Powers use their printed target hand size when drawing from the Pokémon-only deck.
Activated healing Powers can heal a chosen friendly Pokémon from the front or bench, the Active Pokémon, or each friendly Pokémon in supported type/all-board scopes, capped by missing HP.
Healing Powers written as damage-counter removal convert counters to 10 HP and enforce supported shared-use and source Special Condition limits.
Bench-to-Active switch Powers support both self-referential text and printed named-Pokémon clauses, with provider-name checks before switching.
Opposing Abilities can raise the retreat energy cost for supported Active, board-wide, or status-specific targets; the UI and server use the same adjusted cost.
Friendly Abilities can reduce retreat cost for supported typed or subtype groups without attached-Energy conditions.
Benched Dodrio's Retreat Aid reduces its owner's Active Pokémon's retreat cost by one Colorless, down to zero; the effect checks the provider is Benched and the target is Active.
HS—Undaunted Dodrio's Retreat Aid reduces the Active Pokémon's retreat cost by two Colorless while Dodrio is Benched. It shares the same preview/server resolver and is suppressed by opposing Ability-lock effects.
HS—Triumphant Rapidash's Fiery Spirit blocks Confusion through the shared status-immunity check. Opposing Ability suppression disables it.
Call of Legends Sweet Sleeping Face protection now uses the same generic asleep damage shield for Cleffa, Tyrogue, Magby, and Mime Jr.; their enabled Ability prevents attack damage while asleep.
Activated draw Powers can use prior-opponent-turn knockout conditions and shared once-per-turn limits when those clauses are printed.
Passive coin-flip damage protection can prevent all damage on heads, subtract a supported fixed amount after type modifiers, or save the holder from a damage knockout at 10 HP.
Full-HP survival Abilities can also save their holder from attack damage that would Knock it Out, leaving the printed remaining HP.
Passive damage reductions written as “takes −N damage” are applied with printed attacker type restrictions and supported Arceus/Falinks board conditions.
Evolution Abilities can unlock Stage evolution on turn one, subject to the card's normal format-cost unlock. Evolution cards must be in hand; evolving and retreating do not end the turn.

Team Rocket Returns Delibird's Gift Exchange lets its Active Pokémon shuffle one chosen hand card into its deck and draw one card once per turn. Special Conditions block the Power. PvE, PvP, and the opponent AI use the same modeled hand/deck behavior.

Secret Wonders Skiploom's Cottonweed reduces damage from an opposing evolved attack to Skiploom by 20 after Weakness and Resistance when Grass is selected in the shared Energy pool. This approximates its attached Grass Energy requirement; Ability suppression disables the reduction.

Magby’s Baby Evolution can put Magmar from hand onto Magby as a free evolution and remove all damage counters. The effect now accepts the printed comma before “and remove,” and remains limited to once per turn.

Team Rocket Returns Qwilfish's Spiny triggers when an opponent's attack damages it in the Active Spot, even if that damage Knocks it Out. It flips until tails and puts one damage counter on the attacking Pokémon for each heads; the flips and Ability damage are recorded in the battle state.

Neo Destiny Light Arcanine's Drive Off can be used once per turn while Light Arcanine is Active and free of Asleep, Confused, or Paralyzed. It switches an opposing Benched Pokémon into the Active Spot; the opponent chooses the replacement Active Pokémon. Ability suppression and normal switch handling apply in PvE and PvP.

Ruby & Sapphire Slaking's Lazy suppresses opposing Pokémon Powers while Slaking is Active. Poké-Bodies and modern Abilities are not suppressed; the restriction applies to Pokémon Power type entries in both PvE and PvP.

Ruby & Sapphire Blaziken's Firestarter can attach one shared Fire Energy when Blaziken is free of Special Conditions, the selected Energy type is Fire, and a friendly Pokémon is Benched. The discard-pile Energy attachment is represented by the shared Energy pool, and opposing Energy-attachment Abilities still trigger.

Secret Wonders Unown [K]'s KIND removes up to two damage counters from a damaged opposing Defending Pokémon once per turn. The player chooses the Active target; the NPC opponent does not activate this Power because it would heal its opponent.
Secret Wonders Unown [O]'s ONE draws cards until its user has seven in hand, provided Unown O, N, and E are on the Bench and the user has exactly one card in hand. Drawing stops when the Pokémon deck runs out. Player, PvP, and NPC paths enforce the board and hand conditions.
Secret Wonders Unown [X]'s X-RAY inspects the top opposing Pokémon deck card once per turn. It requires an Unown X on the user's Bench and a nonempty opposing deck, and is supported in player, PvP, and NPC battles.
Secret Wonders Electivire's Motor Drive attaches Lightning from the discard-pile Energy action once per turn, provided Electivire is in play and has no Special Condition. As with other discard-pile Energy Powers, the Energy is represented in the shared pool rather than as an individual attachment.
Secret Wonders Venusaur's Miracle Aroma lets the player select Asleep, Burned, or Poisoned, then flips a coin to apply that condition to the opposing Active Pokémon on heads. It can be used once per turn only while Venusaur is free of all Special Conditions; PvP and NPC paths are supported.
Secret Wonders Xatu's Psychic Shift lets the player choose a Special Condition on one of their Active Pokémon and transfer it to the opposing Active Pokémon. The Bench Xatu can use the Power once per turn; the source Pokémon and selected condition are validated by the server.
Secret Wonders Jumpluff's Cotton Spore uses the passive attack protection resolver: when an attack would damage Jumpluff, flip a coin and prevent all damage from that attack on heads.
Secret Wonders Gastrodon East Sea's Osmosis moves up to three damage counters from its holder to a Gastrodon West Sea once per turn. The transfer action requires the West Sea in play and validates both the damaged source and destination names.
Secret Wonders Wormadam Sandy Cloak's Sandy Cloak prevents effects of attacks that do not deal damage. Damage from those attacks still resolves normally.
Secret Wonders Arcanine's Flame Dash can switch Arcanine with a chosen friendly Active Pokémon when Arcanine evolves from hand onto the Bench. The model does not track attached Energy cards, so the optional Energy transfer is omitted.

The shared retreat validator now supports Team Rocket Returns' Dark Muk Sticky Goo surcharge and Rattata Scramble's conditional zero retreat cost against an Active Pokémon-ex. Dark Dragonair's Evolutionary Light is included in the supported Evolution-only deck search family with its Active and Special Condition gates.

Team Rocket Returns Quagsire and Wooper's Saturation remove their Special Conditions and the printed number of damage counters after a Water Energy charge. This follows the battle mode's shared Energy pool approximation for Energy attachments; healing prevention blocks the damage-counter removal but not the Special Condition recovery.

Koffing's Knockout Gas triggers when an opponent's attack Knocks Out Active Koffing. It applies Confused and Poisoned to the attacking Pokémon through the standard Ability status protections.
Once-per-turn Abilities that attach a Basic Energy from the discard pile are supported for typed attachments and generic Basic Energy attachments. Because this battle mode tracks a shared Energy pool rather than individual attachments, each successful attachment adds one shared Energy and typed effects require that Energy type to be selected.

Aquapolis Togetic's Energy Present recycles one selected Basic Energy type from the discard pile. Since individual Pokémon attachments are not tracked, this is approximated as spending one shared Energy and returning one matching Basic Energy card to the shared pool; Special Conditions still block the Power.

Skyridge Charizard, Ho-Oh, Golem, Crobat, Celebi, and Kabutops, plus Aquapolis Nidoking and Kingdra, temporarily change type when the matching Basic Energy is charged from hand. The selected shared Energy type represents that attachment; the override lasts until that side's turn ends.
Paradox Rift Minior's Far-Flying Meteor switches it from the Bench to the Active Spot after a hand Energy charge. It uses the shared switch resolver, including switch-out effects.
Secluded Springs Milotic's Healing Ripples triggers on evolution and lets the player select one damaged Water Pokémon to heal by up to 60 HP. Healing prevention and evolution Ability suppression are checked through the shared evolution resolver.
Aquapolis Lugia's matching Basic Energy attachment Ability also supports its alternate wording, changing Lugia to the selected Energy type until the end of the turn.
Pitch Black Primarina's Enriching Melody offers a friendly Pokémon target on evolution and heals all damage from the selected Pokémon, subject to healing prevention and Ability suppression.
White Flare Archeops's Ancient Wing is a once-per-turn Active Ability that returns the highest Evolution card from one opposing evolved Pokémon to its owner's hand. The resolver preserves existing damage and conditions and handles a Knockout caused by devolution.
Secret Wonders and POP Series 7 Burmy Plant Cloak and Sandy Cloak can recover their matching Basic Energy from discard while Active. The engine approximates the attachment with one shared Energy and requires the matching selected type and a matching Basic Energy in discard.

Cosmic Eclipse Solgaleo's Armor of the Sunne reduces attack damage to Solgaleo and Lunala by 50 while Lunala is in play. The shared damage resolver applies the reduction after Weakness and Resistance and respects Ability suppression.

30th Celebration Illumise applies ×3 Weakness to both Active Pokémon while Volbeat is in play. Ability suppression disables this Weakness rule.

Skyridge Machamp prevents attack effects from the opponent's attacks. This protects Machamp from non-damage effects and follows the engine's standard attack-effect protection handling.

The Nintendo Black Star Promo Legendary Birds reduce each other's retreat cost to zero when all three are in play on the same side. The shared retreat resolver applies all three pair-specific conditions.

Supreme Victors Lunatone's Marvel Eyes prevents all attack damage and effects from Pokémon LV.X to your Lunatone and Solrock while you have Solrock in play. Ability suppression disables the protection.

Crystal Guardians Jirachi ex's attacks Shield Beam and Super Psy Bolt each cost one fewer Colorless Energy while the opponent has a Pokémon-ex or Stage 2 Pokémon in play. The reduction is capped at the attack's Colorless cost and turns off when its Ability is suppressed.

Wisdom of Sea and Sky Typhlosion can use Fire Breath once per turn from either position to Burn the opponent's Active Pokémon. The shared status resolver applies status protections and Ability suppression; NPC Typhlosion uses it automatically when available.

Coalossal's Tar Generator can add up to two shared Energy units once per turn when Fire or Fighting is selected, representing its Fire/Fighting discard-pile attachments. The model does not track discard contents or individual Pokémon attachment targets.

Cinderace's Libero can add up to two shared Fire Energy after Cinderace switches from the Bench to the Active Spot. The switch event gates player and PvP activation, while automatic PvE opponents use the Ability after their own switch. The shared pool does not model discard cards or attachment destinations.

Ditto V's V Transformation replaces Ditto V with an eligible Basic Pokémon V from the discard pile. The replacement inherits modeled damage, Special Conditions, play timing, and other effects; the old Ditto V enters discard. Individual Energy attachments are not tracked, and PvE chooses the first eligible replacement.

Orbeetle's Bug's Radar lets the player inspect and reorder the opponent's top three Pokémon-deck cards in both local PvE and PvP battles. PvP reveals the card names only to the acting player and requires a separate ordering action before either player can continue.

Toedscruel ex's Protective Mycelium blocks attack effects other than damage for the player's Pokémon while their side has Energy. Because battle Energy is shared rather than attached to individual Pokémon, the condition currently checks the shared pool; suppression still disables the Ability.
Espeon VMAX's Solar Revelation uses the same team protection when the printed wording says attacks are “from” the opponent's Pokémon and omits the space before its reminder text. It protects the owner's Pokémon with Energy from attack effects other than damage; the shared pool approximates attachments, and suppression disables the Ability.
Abomasnow's Toughness Boost and Kricketune's Swelling Tune grant 50 HP to friendly Single Strike Pokémon or 40 HP to friendly Grass Pokémon, respectively, excluding the provider itself. Copies of either Ability do not stack, and HP is recalculated when the provider enters, leaves, or loses its Ability.

Mega Golurk ex cannot attack until its owner has 10 cards in hand. This condition is enforced by the shared available-attacks calculation, including AI attack selection, and is inactive while the Ability is suppressed.

Milotic ex's Sparkling Scales blocks attack damage and effects from Tera Pokémon. The same protection check is used by PvE and PvP battle resolution.

Enamorus V's Guardian of Love blocks modeled opposing Ability effects against your Pokémon when the shared pool has Psychic Energy, excluding Enamorus V itself. This condition approximates individual Psychic Energy attachments; the protection covers attack damage modifiers, status effects, and damage-counter Abilities supported by the engine.

Damage reduction now recognizes the en dash minus glyph used in some card text, including Paldean Wonders Armarouge's Armor.

Drapion V's Strike Down discounts its Colorless attack costs for opposing Single Strike, Rapid Strike, and Fusion Strike Pokémon in play. The discount is capped at the attack's Colorless cost.

Mimikyu ex's entrance shield prevents the first positive attack damage after it enters play. It does not consume the shield when an attack would already deal no damage, and attacks that ignore target damage modifiers bypass it.

Alolan Persian-GX's Smug Face blocks damage and effects from attacks used by TAG TEAM Pokémon and Ultra Beasts. The protection condition based on Special Energy attachments is unsupported because those attachments aren't represented in battle state.

M Alakazam-EX's evolution Ability places 2 damage counters on the opposing Active Pokémon and 3 on one opposing Benched Pokémon. The player chooses both targets, and the server validates their positions.
Surging Sparks Archaludon ex's Metal Bridge can recover up to two Basic Metal Energy from the discard pile when it evolves. The cards are consumed and represented in the shared Energy pool; this applies only while the pool is using Metal Energy because individual Pokémon attachments are not modeled.
Solrock's Psychic Energy Power also checks for a living Lunatone before adding one shared Psychic Energy, in both player and PvE flows.
Greninja's Water Shuriken can deal 20 direct Ability damage to one opposing Pokémon once per turn, with a player-selected target and automatic PvE target selection.
Passive attack restrictions check supported Team Rocket/Aqua/Magma board counts, own-board size, named Pokémon on the Bench, and opposing Active Pokémon conditions before attacks can be selected or resolved. Opposing Abilities can also lock attacks by subtype, name, or remaining HP while the printed provider condition holds.
Supported named-board Abilities can reduce an attacker's required Colorless or all Energy; the preview and action playback use the same effective cost as battle resolution.
Passive healing includes supported “During Pokémon Checkup” effects, resolved after Poison and Burn damage on both sides.
Retreat cost rules check supported named Pokémon, type, opposing Pokémon-ex/V, Active Dondozo, and damage-counter conditions. Archaludon's Metal Energy condition uses the shared selected Energy type as an approximation because individual attachments are not tracked; Stadium requirements remain unmodeled.
Direct attack bonuses recognize text that names the opponent's Active Pokémon as the target, including remaining-HP “its attacks” abilities, and apply the printed pre-Weakness/Resistance modifier.
Damage reductions accept the “damage done to [Pokémon] by attacks is reduced by N” wording and supported full-HP, damage-counter, status, board-name, and named-discard-count conditions. Energy-, Tool-, Stadium-, Prize-, and opponent-hand-dependent rules are excluded.

Incoming attack protection also honors attacker subtype restrictions for Pokémon ex, V, VMAX, and VSTAR, including combined ex/V and Basic Pokémon ex clauses, plus directly named attacker types and Ability presence. Supported damage thresholds such as 200 or more are applied after type modifiers.

Protection may also list exact damage amounts; those values are checked against damage after Weakness and Resistance, as printed for Mr. Mime-GX.

First-turn evolution permission can come from the Pokémon already in play or from the evolution card. Abilities requiring the target to be in the Active Spot are checked against its current position.

Holder abilities that prevent opposing Pokémon Abilities from affecting that Pokémon cancel the attacking side's represented damage boosts, including boosts provided by Pokémon on its Bench, and block status conditions caused by opposing activated Abilities. Attack-caused status remains unaffected by this Ability-specific protection.

Shady Tail blocks attacks from Prism Star Pokémon on either side while its source Pokémon remains on the Bench. It also suppresses their modeled passive effects and prevents their supported healing, draw, status, and switching Abilities from being activated.
Simple once-per-turn draw Powers can also draw one Pokémon for each player into their respective hands.
Mandatory fixed healing at end of turn is applied to an eligible Active provider; optional end-of-turn healing remains outside automatic resolution.

Trading Card Game collection and booster pack opening.

## Locations
- Route: `/game/tcg/*`
- Components: `src/components/tcg/`
- Data: `src/data/tcg/`
- Utilities: `src/utilities/tcg/`
- Hook: `src/hooks/useTCG.ts`

## Features
- Collect TCG cards from various sets
- Preserve curated set-series overrides during TCG data generation: Legendary Collection and Best of Game are grouped into Base, Pokémon Futsal Collection into Sword & Shield, and Southern Islands into Neo for collection filters and battle deck eligibility
- Author random card rewards by allowed set(s), card IDs, Pokémon, and exact rarity labels; reward draws can exclude cards already owned with `missingOnly`
- Open booster packs
- Open all owned packs for a set from the inventory lightning action, skipping card-by-card flips and going straight to the summary
- View collection by set
- Build one saved 15-card battle deck per TCG generation series, with card previews and live totals against the shared 60-point limit in Trainer and CardDex
- TCG Battle interprets supported printed Pokémon abilities across sets, including passive combat modifiers, end-of-turn draws, and optional server-validated once-per-turn healing, draw, and switching Powers
- Flygon's Sandy Flapping offers its optional evolution trigger and resolves the Active Spot Knockout trigger; both discard the opponent's top two Pokémon cards into their discard pile
- Send duplicate cards to HQ for Pokedollars after unlocking the `card-crystalizer` key item (the Card Redistribution Box)
- Deliver 36 packs as a repeatable Booster Box Delivery after completing the matching binder; each generated set task consumes the packs and pays 8,000 Pokedollars
- Review the Booster Box Manufacturing chat lesson, unlocked with “A Stroke of Genius,” which explains that 36 matching packs make one Booster Box
- Daily Gym Pack activities for Brock, Misty, Surge, and Erika consume 20 Crystals in addition to their existing entry requirements
- Card rarity indicators
- Trade with friends (planned)

## Data Structure

Card ownership is stored in normalized `user-tcg-cards` rows, each containing a user, card ID, and quantity. A compound unique index prevents duplicate ownership rows. Deck choices remain small profile data:

```typescript
{
  "tcgDecks": {
    "baby": ["base1-47"]
  },
  "tcgDecksByGeneration": {
    "Scarlet & Violet": {
      "baby": ["sv1-1"],
      "champions": [],
      "masters": []
    }
  }
}
```

## Catalog Delivery

Card records and card artwork are generated from English records in the open-source TCGdex card database. The generator adapts those records to Pokeori's existing catalog shape and keeps the current set and card IDs wherever records match. Those IDs are the keys used by ownership, binders, decks, packs, and authored rewards, so keeping them means existing player progress does not need a database migration. New source cards are added under their local collector number when that ID is free; old cards that cannot be confidently matched retain their existing Pokeori data. All English TCGdex sets with card records are imported across series. Existing curated series overrides and artwork remain in place; aliases preserve known IDs, while newly imported IDs are sanitized for safe module and item identifiers. Entries with no English set name or no card records are skipped so they do not create empty catalog shelves. The TCG Pocket (`tcgp`) series remains separate and uses `tcgp_*` local set IDs to avoid collisions with physical TCG sets.

TCGdex rarity labels are retained on cards and mapped to Pokeori's rarity values and booster buckets. New source labels therefore remain usable in collection valuation and pack generation without being silently treated as an unknown rarity.

Pocket sets and cards use the same collection, card detail, and generic pack systems as the physical TCG. Pokeori does not model Pocket's booster-specific pull odds, its separate booster variants, or Pocket-specific battle rules. Pocket pack and binder items are generated with the catalog, but no world rewards or crafting recipes currently grant those packs.

The browser no longer downloads the complete authored TCG catalog with the game bundle. The Carddex loads compact set summaries first, then requests cards from `/api/game/catalog/tcg` in bounded pages. Deck cards are resolved by ID through the same authenticated endpoint.

TCG catalog responses are versioned with the application release and privately returned without shared caching because they include `ownedTotal`, the authenticated trainer's ownership count across the complete matching query. That count remains stable as cursor pages append. Search, ownership, supertype, Pokémon type, normalized rarity, and stable sort rules are applied before pagination, while uncollected cards use discovery-safe visual and accessible labels.

The Carddex preserves an artwork-first index and organizes unlocked expansions as newest-first series and set shelves. The shelves use representative series logos and canonical set symbols instead of generic binder artwork. Scope and filters persist in the URL, search covers card names, collector numbers, set names, and series without leaving the selected shelf, and mobile groups collection scope separately from card-detail filters in a full-height responsive field note. Multi-set results retain symbol-led set dividers. Owned-card notes pair artwork with compact metadata, previous/next browsing, collection quantity, rarity, duplicate redistribution, and battle-deck actions; touch layouts stack the same information. After duplicate redistribution, the selected note stays open through the collection refresh so its receipt and retained-copy count remain visible even when the card leaves the active Duplicates filter.

## TCG Battle

- Printed Pokémon abilities are retained on battle cards. The interpreter handles recognized holder and team-wide damage boosts/reductions, attack damage prevention, Active-attacker damage reduction, and halving, bench-position-gated prevention, attack-effect prevention with or without damage, including attacker-restricted protection, status immunity, Poison/Burn checkup damage boosts, Weakness removal, between-round healing and healing multipliers, and several activated Poké-Powers, including single-card and full-hand discard costs, drawing to a specified hand size, and Active Pokémon Poison/Burn effects and a Dark-type switch-and-Poison Power. Other activated Poké-Powers and passive effect families remain to be added set by set. See the battle mechanics inventory and generated set audit for coverage counts and engine limits.
- Battle controls and setup cards use text labels and the game’s card/energy artwork instead of emoji or Lucide symbols. Player, opponent, progress, and warning copy use the field-journal semantic palette. The opening hand is a horizontally swipeable card rail on touch screens.
- Battle decks require exactly 15 unique owned Pokemon cards with HP, type, image, and attacks, at least 1 Basic Pokemon for the opening-hand mulligan, and enough matching predecessors for every Stage 1 and Stage 2 card.
- The Trainer deck editor shows the actual card artwork for selected cards and displays the current card count and cost against the shared 15-card, 60-point limits. CardDex battle-deck actions show the card's cost to add plus the current deck totals.
- Deck management is hidden until the `deck-box` key item is owned, then lives on the Trainer page (`/game`) in a dedicated TCG Decks tab and appears in eligible TCG card drawers.
- A TCG Battle can start only when the required generation-specific deck entry exists, contains exactly 15 unique owned legal Pokemon cards, has at least 1 Basic, includes each evolution predecessor, stays within the 60-point limit, and uses only the encounter's required series. Invalid starts are rejected server-side and return to Explore.
- Each generation series has one deck slot; Auto Fill builds from owned cards in that series, prioritizing up to three Basics for the front row and favoring Stage cards only when their lines can be completed within the 60-point limit. Opening Deck Box clears saved decks from the retired format-based structure.
- Each series deck also stores one extra Energy type slot (outside the 15 card list). The selected type must be valid for that generation series.
- Each TCG Battle game entry can require a specific series (`settings.requiredSeries`), and battle start enforces that series.
- PVE entries may set `settings.cost` for a server-authoritative entry fee. Explore shows the fee and disables starting when the current balance is too low; after both decks validate, the battle start debits the fee transactionally with an idempotency key tied to the research session. A retry resumes that battle without another debit, and a finished battle cannot be restarted until the player claims its result and starts a new session.
- Six repeatable Kanto world challenges use Base-series decks after the three Underground tutorial deck wins. They charge 50 Crystals, award 100 Crystals and 25 Underground Society guild XP on a win, and layer their trainer-specific pack, material, Egg, and promo-card drops on top.
- Kanto Underground adds a free, unranked Base-series PVP table after the TCG battle wrap-up. It requires the `deck-box`, is unavailable in Kid Mode, and revalidates each collector's saved Base-series deck against ownership, legality, card count, and the 60-point cap before matchmaking can create a battle.
- TCG PVP supports six-digit friendly lobbies and an unranked Quick Match queue. The Explore card fixes the required series; players cannot negotiate or override it in the lobby.
- PVP stores one authoritative shared battle under a match-scoped Redis key and returns a redacted viewer-relative copy to each client. The local collector is always rendered at the bottom, the opponent at the top, private hands and unused opponent deck cards are never sent, and opening arrangements remain hidden until both collectors are ready.
- A random collector takes the first turn, then actions alternate. Setup, turns, and required promotions use two-minute server deadlines. If only one opening board is ready at setup expiry that collector wins; if neither is ready the match is a no-contest. Later action expiry awards the match to the waiting collector, and surrender is available from the battle header.
- PVP has no stake, payout, reward, or ranking. Decisive outcomes record one win and one loss against the PVP Explore entry; exact draws and setup no-contests record neither. All outcomes flow through the shared results screen.
- Celadon Game Corner no longer has Rocket TCG tables. Its former low- and high-stakes tables have been removed from the activity list.
- The three TCG Test battles award 100 Pokédollars each on a win.
- After a TCG battle ends, the finished board remains visible while the result is claimed. Claiming does not refresh the game route after its session is cleared; the shared Results screen stays open until the player returns to Explore. A failed claim offers a retry.
- Every battle uses a 15-card Pokémon deck with a shared cost cap of 60. Each player saves one deck per series; legacy format-based saved decks are cleared when deck management is opened.
- All battles use the same Energy pacing: 5 starting Energy, 12 pool cap, and +2 Energy for a Charge turn.
- TCG Battle deals a three-card opening hand from a shuffled Pokémon deck and reshuffles/redraws until it contains a Basic Pokémon. Players choose one to three Basic Pokémon for the three-slot front row; unselected cards remain in hand, and Bench placement is locked until all three front slots are filled.
- Each side tracks Pokémon Knockouts independently. The sixth Pokémon Knocked Out immediately loses the battle; this limit applies alongside the existing loss condition for having no living Pokémon. The header shows each side's KO progress toward 6, and simultaneous sixth Knockouts result in a tie.
- Playing a Basic from hand is a free action and fills the front row first, then the Bench. Evolution requires the matching evolution card in hand and is free; retreating is also free apart from its Energy cost. Attacking or using Charge ends the player's turn; at the Energy cap, Charge is labeled “End Turn.” After opening setup, the first active side draws one card to begin its turn; each side then draws one card at the start of each turn when its deck is not empty, in both PvE and PvP.
- Charge remains available as the turn-ending Energy action; automatic turn-start draws apply separately. Reaching Energy cap does not force the player to attack before ending the turn.
- NPC opponents take one action per turn even when the player's shared Energy pool is empty. The player then gets their next turn to charge or end turn, so between-round Poison and Burn damage cannot repeat through automatic opponent pressure turns.
- NPC PvE opponents rank legal attacks by deterministic expected outcomes, including knockouts, status, recoil, healing, protection, and shared Energy effects. They choose front cards for early legal attacks and durability, evolve when that improves their next turn or clears harmful conditions, and charge when the extra Energy is worth delaying an attack. A legal attack at full Energy and an available knockout take priority. PVP decisions remain player-controlled.
- Neo Destiny Unown [T]'s Tell is available once per turn even while Asleep, Confused, or Paralyzed. Heads records the flip and reveals both Pokémon-only hands in player, PvP, and NPC turns; tails reveals neither.
- Neo Destiny Unown [L]'s Laugh is available once per turn even while Asleep, Confused, or Paralyzed. Heads records the flip and shuffles both Pokémon-only decks in player, PvP, and NPC turns; tails leaves them unchanged.
- Neo Destiny Unown [H]'s Help is available once per turn with Unown H, E, L, and P on the Bench. It shuffles the owner's Pokémon-only hand into the deck and draws the same number of cards, limited by the remaining deck size.
- Neo Destiny Unown [Q]'s Quicken is shared across copies once per turn. Heads protects all friendly Pokémon with Unown in their name from opposing attack damage and effects through the opponent's next turn, including in PvE, PvP, and NPC turns.
- Neo Destiny Unown [C]'s Chase flips when the opponent successfully retreats its Active Pokémon while Unown C is Active. Heads deals 10 damage modified by Weakness and Resistance to the Pokémon that retreated.
- Neo Destiny Unown [X]'s XXXXX flips until tails when a Pokémon with Unown in its name uses Hidden Power, adding 10 damage per heads before Weakness and Resistance. The once-per-turn use is shared across Unown X copies, and the flips appear in the attack resolution.
- Neo Destiny Unown [G]'s Give checks for Unown G, I, V, and E on the Bench, then flips once. Heads adds one Energy of the selected type to the shared Energy pool; tails adds none. Energy cards are not represented in the Pokémon deck, so this models the attachment as shared Energy rather than searching an Energy card or selecting an attached Pokémon.
- Neo Destiny Dark Slowking's Cunning flips once per turn when usable. Heads reveals the top opposing Pokémon-deck card, then lets the user choose whether to shuffle that deck; the Power is unavailable while Dark Slowking is Asleep, Confused, or Paralyzed. The NPC opponent chooses to shuffle on heads.
- Team Rocket Returns Dark Slowking's Cunning checks the top opposing Pokémon-deck card once per turn without a coin flip, then lets the user choose whether to shuffle that deck. The inspected card is shown only to the user in PvP; the shared battle log does not reveal it. Special Conditions disable the Power.
- Team Rocket Returns Kingdra's Dragon Veil removes Weakness from its owner's Active Pokémon while Kingdra is in play. It applies to attacks against any of the three front slots and does not protect Benched Pokémon.
- Team Rocket Returns Dark Sandslash's Poison Payback Poisons the attacking Pokémon when it damages Active Dark Sandslash, including if Sandslash is Knocked Out. Ability suppression on Dark Sandslash and the attacker's normal status protections apply.
- Team Rocket Returns Dark Weezing adds one damage counter to each Poisoned Pokémon during the engine's between-turn checkup while Dark Weezing is Active. Ability suppression disables this bonus.
- Neo Destiny Unown [V]'s Vanish is offered immediately after Unown V is played from hand. The player chooses a different living Pokémon with Unown in its name; heads returns it and its Evolution stack to hand, while tails leaves it in play. Individual attached Energy is not represented. The NPC selects its lowest-HP eligible Unown Pokémon.
- Neo Discovery Unown [O]'s Observe looks at up to five cards from the top of the opponent's Pokémon deck and leaves them in the same order. Player, PvP, and NPC activations are supported.
- Neo Destiny Dark Gengar's Deep Sleep checks each sleeping Pokémon on the side whose turn just ended. Two heads wake it; any tails leave it Asleep. A live, unsuppressed Dark Gengar without Asleep, Confused, or Paralyzed is required.
- Card timing gates include subtype and cost locks: Stage 1 unlocks at turn 3, Stage 2 at turn 5, 10-cost cards at turn 7, and 15-cost cards at turn 10. One matching Stage card from hand can evolve a living Basic or Stage 1 on the front or Bench without ending the turn; damage counters stay, and status conditions and temporary effects clear.
- Card cost is Basic with evolution 1, Stage 1 3, Stage 2 5, Basic without evolution 5, EX/GX/V/Radiant 10, and VMAX/VSTAR/Mega/TAG TEAM/LEGEND/V-UNION/Eternamax 15.
- Each side draws three cards from its shuffled deck and reshuffles/redraws until the hand contains a Basic Pokémon. The player must place at least one Basic in the three-slot front row; additional Basics can fill remaining front slots, and Bench placement stays locked until all three front slots are occupied. The opponent uses the same opening hand and placement rules, arranging its available Basics automatically. Unplayed cards remain in hand. On knockout, every card in that evolution stack moves to the discard pile.
- Only front cards attack. Direct attack hits resolve on their chosen target, while explicit Bench or play-wide effects can damage the rows they specify, including the active row. Retreat swaps a front and bench card for the retreating card's converted retreat cost, defaulting to 1.
- Legal attacks include exact numeric damage, supported zero-damage energy discard attacks, and a conservative set of inferred text effects: fixed self-damage, simple self-KO, coin gates/tables and until-tails damage, Bench-count and play-wide damage, damage-counter scaling/placement, status and Resistance checks, shared-Energy formulas and gains, fixed and damage-dealt-based healing, next-turn protection/control, switching, attack copying, and selected deck searches. The Pokemon-only battle format also supports selected draws into hand, hand shuffling, and searches of eligible Pokemon into hand; it does not model deck ordering, Trainer/Tool/Stadium/Special Energy cards, card-specific attached Energy, or Prize cards. Unused-Energy bonuses count the simplified side energy remaining after the attack cost and respect the card text's bonus cap. Extra energy discards are applied after the attack cost is paid and never block the attack; `discard all Energy` clears the remaining simplified energy pool for that side. Poison and Burn each deal 10 damage at the end of a full player-plus-opponent round. Asleep and Paralyzed attackers flip before attacking; heads clears the condition and attacks, tails fails. Confused attackers flip before attacking; heads clears and attacks, tails fails and deals 10 self-damage. Attack-applied opponent statuses attach to the selected target card, while self statuses attach to the attacking card.
- Coin flips record their purpose and resolved heads/tails. The client plays the attacker's status-check and attack flips in order, using the coin front/back images in `public/images`.
- Client action playback deducts attack Energy immediately, then advances coin results, damage, newly applied or cleared statuses, recoil, opponent responses, and promotion prompts before committing the server's final board state. A rejected action restores the previous Energy total.
- When the battle reaches a terminal result, it waits for any in-progress battle action to settle, claims the result, and opens the shared rewards/results screen without a separate winner-card animation. If the claim fails, the player can retry from the battle result state. The result screen stays open until the player continues. Currency-only results initialize directly on the summary step to avoid a closed-dialog flash during the handoff.
- Generic energy is spent from a side pool. A turn is a full player-plus-opponent round. Turn gates allow attacks costing 0-1 energy on turns 1-2, 2 on turns 3-4, 3 on turns 5-6, 4 on turns 7-9, and unlimited from turn 10.
- On turn 15+, both sides' selected energy-card types activate globally. Each selected type removes one matching energy symbol from all attack costs for both players for the rest of the battle; matching selections stack.
- Wins are decided by the six-KO limit or by having no living Pokémon. Claiming a player victory counts as one completed research win; opponent wins and exact ties record a failed attempt. Pass-stall tiebreakers only resolve after both sides pass consecutively once the 4+ attack allowance is reached and neither side has a legal attack with remaining energy; results are decided by remaining HP, then living card count. Exact ties are losses for the player.
- Claiming a TCG Battle result invalidates the server-rendered Explore route, and closing the result refreshes the scoped user snapshot before navigation. Recorded wins, task progress, unlocks, and replacement entries therefore appear without restarting the PWA.
- Gym Heroes, Gym Challenge, Neo Genesis, Neo Discovery, Neo Revelation, Neo Destiny, Ruby & Sapphire, Sandstorm, Dragon, Team Magma vs Team Aqua, Hidden Legends, Expedition, Aquapolis, Skyridge, Deoxys, Emerald, Unseen Forces, Delta Species, Legend Maker, Holon Phantoms, Crystal Guardians, Dragon Frontiers, Power Keepers, Diamond & Pearl, Platinum, Arceus, all four HeartGold & SoulSilver sets, Call of Legends, Black & White, all eleven Black & White expansions through Legendary Treasures, XY, Sword & Shield, and Scarlet & Violet use set-scoped mappings in the simplified battle interpreter for supported attacks. Supported effects include conditional damage/healing, per-Pokémon coin effects, Bench and multi-front effects, status/evolution-dependent damage, switching and retreat restrictions, status clearing/protection, attack locks/copying, Energy acceleration, random or selected hand discards/recovery, damage-counter transfers and distribution, discard-pile revival choices, team-based damage, optional damage/recoil choices, and selected deck-to-Bench or deck-to-hand searches. Draws and hand shuffles operate on the Pokemon-only deck. Optional switch attacks let the player decline the switch. Deck ordering, Trainer/Tool/Stadium/Special Energy cards, Prize cards, and card-specific attached Energy are not represented; some supported attacks omit those riders or approximate attached Energy with the shared Energy pool.

- FireRed & LeafGreen (`ex6`) adds set-scoped mappings for status-dependent damage, evolved-Pokemon and discard counts, selected target and bench attacks, healing, retreat prevention, Energy spending, and deck-to-Bench searches. It supports 153 of 171 attacks; 18 remain filtered for hand, Trainer-tool, Prize-card, deck-shuffle, evolution-to-hand, or hand-count effects. Tunneling selects one Benched target in the current engine, and deck Energy attachments use the shared Energy pool.
- Team Rocket Returns (`ex7`) supports 147 of 166 attacks, adding board-wide and bench damage, Energy-count and retreat-cost formulas, bench-count comparisons, Pokémon-ex and Stage 2 bonuses, selected status conditions, attack locks, and healing. Calls that search Pokémon onto the Bench are supported; searches and retrievals involving Energy use the shared Energy pool. Quick Tail Smash offers its optional 30-damage safe hit or an 80/0 coin gamble. Attacks that need card hands, Prize counts, Trainer cards/tools, or copying from a different Pokémon remain filtered; Hard Bone is also filtered because its mandatory hand discard is unsupported. Multi-active damage is adapted to the engine's single active target.
- Deoxys (`ex8`) supports 141 of 159 attacks, adding board/selected-target effects, named-Pokémon and damage-counter formulas, optional costs, status choices, self-switching, and until-tails flips. Shared Energy approximates attached Energy effects. Split Bomb and Triple Breach randomly resolve additional Bench targets after the player selects one; Miracle Essence affects the single active opponent. Hand/deck, Trainer/Stadium, Poké-Body/Poké-Power, typed attached-Energy, and evolved-attacker-only effects remain filtered.
- EX Emerald (`ex9`) supports 143 of 151 attacks, adding resistance-sensitive bonuses, active attack/retreat locks, next-turn attack buffs, board sweeps, selected targets, and Basic deck-to-Bench searches. Shared Energy approximates card-specific attachment/recovery. Pure Power assigns all counters to one chosen target; Power Short omits its Poké-Power bonus. Eruption deals base damage and omits its deck-top discard rider; draw effects remain filtered.
- EX Unseen Forces (`ex10`) supports 177 of 196 attacks, adding Special Condition-count bonuses, team-wide healing and status clearing, threshold-based damage, selected counters and targets, and card-name checks. Grand Loop allows the player to keep Yanma Active, while its draw-two effect is omitted. Call for Family/Call for Friend and Twin Play search eligible Pokémon onto the Bench. Healing Milk chooses one injured Pokémon at random; typed attached-Energy and Poké-Power/Body effects, plus hand/deck operations, remain filtered or use documented shared-Energy approximations.
- EX Delta Species (`ex11`) supports 140 of 147 attacks, adding evolved/damaged/Pokémon-ex bonuses, damage from Energy, damage counters and opposing Bench size, multi-target effects, and selected any-target attacks. It also maps attack disabling/copying, coin-gated protection, healing, and eligible Basic Pokémon searches onto the Bench. Holon Energy uses shared Energy as its approximation; Energy Bone and Sonic Signal randomly choose additional targets. Attacks that draw or search cards into a hand remain filtered.
- EX Legend Maker (`ex12`) supports 134 of 145 attacks, adding evolved and Pokémon-ex bonuses, attacks based on Energy, damage counters and Stage 1 Bench counts, any-target hits, multi-front damage, optional Energy spending, self-healing/status cleanup, attack locks, and eligible deck-to-Bench searches. React Energy is approximated with shared Energy. Attacks requiring hand draws/searches, deck ordering, evolution-card removal, or Supporter discard counts remain filtered.
- EX Holon Phantoms (`ex13`) supports 153 of 159 attacks. It adds named-Pokémon discard and δ-in-play counts, Pokémon-ex/Stage 2 and Fighting-resistance bonuses, multi-coin attacks, selected any-target damage, board damage, healing, attack locks, and Basic deck-to-Bench searches. Energy attached to a particular Pokémon is approximated with the shared Energy pool, including Psychic Star's conditional discard; Zzzap cannot filter for Poké-Powers/Poké-Bodies, and Split Bomb randomly resolves its second target. Draw, deck ordering, and deck-discard effects remain filtered.
- EX Crystal Guardians (`ex14`) supports 129 of 138 attacks. It adds opponent-board-count deck searches, paired status choices, status-count bonuses, next-turn attack buffs, coin-gated protection and attack locks, multi-target damage, healing, and selected targets. Green Blast and card-specific Energy attachments use shared Energy; unavailable Tool, Poké-Power/Body, and Prize-card checks resolve at base damage. Draw, discard-to-hand, evolution-from-deck, and attack-copy effects remain filtered.
- EX Dragon Frontiers (`ex15`) supports 123 of 128 attacks. It adds δ-based attack bonuses and counts, selected-target counters, energy comparisons, type-filtered board damage, temporary attack/retreat locks, damage reduction, and Shock-wave marker knockouts. Delta Copy only targets δ-marked Pokémon; Mimicry copies any eligible opposing attack. Shared Energy approximates attached Energy, and Rainbow Wave uses the selected deck Energy type. Tool and Poké-Power/Body checks use base damage; draw and card-search/recovery-to-hand effects remain filtered.
- EX Power Keepers (`ex16`) supports 124 of 128 attacks. It adds shared-Energy formulas, chosen-Energy discard damage, damaged-Pokémon-count scaling, attack-copying, coin tables, healing, attack locks, and eligible deck-to-Bench searches. Grudge uses the owner's discarded Pokémon as a proxy for prizes taken; Skill Hack copies from the opposing Active Pokémon; stadium-dependent damage uses base values. Pull Down, Cry for Help, Down Draw, and Fast Evolution remain filtered because battle evolution, drawing, and deck-to-hand searches are not represented.
- Diamond & Pearl (`dp1`) supports 172 of 186 attacks. It adds multi-coin and until-tails damage, same-hand-size and evolves-from bonuses, board/counter damage, damage-counter movement, attack locks, selected any-target attacks, and conditional healing/protection. Attached Energy uses the shared Energy pool; effects limited to hand, Trainer, deck, or Prize cards remain filtered because those systems are absent from TCG Battle.
- Mysterious Treasures (`dp2`) supports 154 of 168 attacks. It adds named-Pokémon/type conditions, shared-Energy formulas, multi-coin/until-tails attacks, selected targets, board damage, healing/status, attack and retreat locks, and fixed retaliation. Hand/deck/Trainer effects, card draw, and global coin changes remain filtered; several card-specific Energy and target-selection effects use documented approximations.
- Secret Wonders (`dp3`) supports 177 of 194 attacks. It adds lowest-HP knockouts, counter damage that leaves a target at 50 HP, forced switches, discard/name/retreat checks, board damage, coin formulas, attack locks, and deck-to-Bench searches. Typed Energy uses the shared Energy pool, extra targets may be randomized, and hand/deck/Trainer operations plus player-chosen counter placement remain filtered.
- Great Encounters (`dp4`) supports 157 of 172 attacks. It adds status-gated bonuses and conditions, evolved-from/named-Pokémon checks, shared-Energy formulas, any-target and full-board damage, damage-counter transfer, healing, forced switches, attack/retreat locks, protection, and Basic Pokémon searches to the Bench. Shared Energy approximates typed Energy attachments; Tools, Special Energy, hand/deck/Prize interactions remain filtered or use base damage.
- Majestic Dawn (`dp5`) supports 133 of 143 attacks. It adds dynamic coin attacks, named-Pokémon and distinct-type conditions, multi-target/board damage, status and protection, healing, shared-Energy recovery, and deck-to-Bench searches. Card-draw, deck/hand manipulation, card search to hand, and in-battle evolution remain filtered.
- Legends Awakened (`dp6`) supports 204 of 224 attacks. It adds per-opponent-Pokémon coin damage, selected Bench/any-target damage, status and evolved/damaged-target conditions, healing and status clearing, retreat locks, board damage, and Basic Pokémon searches. Shared Energy approximates attached Energy; Stadium and Tool bonuses use base damage. Deck, hand, discard-pile, Prize-card, delayed-knockout, and card-return effects remain filtered.
- Stormfront (`dp7`) supports 164 of 177 attacks. It adds weighted named-Pokémon damage, counters based on each target's retreat cost, equal-hand-size status riders, discard-based damage, coin tables/until-tails attacks, multi-target damage, and selected-target counters. Shared Energy approximates per-Pokémon Energy, and targets selected from a group resolve randomly. Hand/deck/Trainer/Tool effects and player-chosen counter amounts remain filtered.
- Platinum (`pl1`) supports 210 of 221 attacks. It adds damage and status combinations, damage-history knockouts, selected Basic-Pokémon deck searches, shared-Energy formulas, healing, attack restrictions, and multi-target damage. Seed Flare treats chosen shared Energy as Grass Energy attached from hand, while Howl searches for Poochyena onto the Bench. Eleven attacks remain filtered for hand/deck access, Trainer checks, and in-battle evolution.
- Rising Rivals (`pl2`) supports 173 of 188 attacks. It adds attack-history damage, conditional statuses, board and selected-target damage, dynamic coin attacks, healing, Basic-Pokémon searches, and attack/retreat restrictions. Shared Energy approximates per-Pokémon Energy and Energy recovery; multi-target choices resolve randomly. Trainer, hand/deck/discard, Prize-card, and in-battle evolution effects remain filtered.
- Supreme Victors (`pl3`) supports 238 of 254 attacks. It adds target-side Energy counters, SP type counts, hand-size damage, attack-history effects, conditional attacks, board damage/healing, and multi-attack buffs. Per-Pokémon Energy uses the shared pool; hand Energy choices are approximated with chosen shared Energy, and multi-target counter placement resolves on one selected Pokémon. Trainer, deck, discard, card-return, and delayed-knockout attacks remain filtered.
- Arceus (`pl4`) supports 144 of 164 attacks. It adds remaining-HP comparisons, damage-counter scaling, selected and board-wide damage, named-Pokémon bonuses, shared-Energy formulas, and coin-gated protection. Tumble Down spends chosen shared Energy, and Entangle Tackle applies its recoil to Swalot because this battle board has one active Pokémon per side. Typed Energy, deck/hand/discard, Tool/Stadium, Prize-card, and evolution effects remain filtered or use documented base-damage approximations.
- HeartGold & SoulSilver (`hgss1`) supports 148 of 163 attacks. It adds board-count and damage-counter formulas, until-tails and multi-coin attacks, board damage/healing, selected targets, shared-Energy bonuses, and attack/retreat control. Cosmic Cyclone spends chosen shared Energy, and Cure Kernels randomly heals one friendly Pokémon because the battle UI cannot select any own target. Hand/deck actions, card returns, and Energy movement between opposing Pokémon remain filtered.
- HS—Unleashed (`hgss2`) supports 130 of 142 attacks. It adds selected and multi-target damage, Energy-count formulas, coin-scaled attacks, deck-to-Bench searches, and shared-Energy recovery/spending. Politoed's Leap Frog switches a chosen Benched Water Pokémon with its owner's Active Pokémon once per turn, and Kingdra's Spray Splash places one damage counter on an opposing Pokémon once per turn; both are blocked by Special Conditions and Ability suppression. Lanturn's Underwater Dive uses the existing temporary type-change mechanic. Energy on individual Pokémon is approximated through shared Energy, while top-deck, hand, Poké-Power, evolution, and opposing Energy-movement effects remain filtered.
- HS—Undaunted (`hgss3`) supports 115 of 131 attacks. It adds named-Pokémon board counts, status-count damage, counter-scaled and multi-target attacks, shared-Energy formulas, healing, and coin-gated control. Houndoom's Fire Breath flips once per turn and Burns the opposing Active Pokémon on heads; Special Conditions and Ability suppression prevent its use. Some recoil and self-damage is applied to the Active attacker; card-zone actions and counter redistribution remain filtered.
- HS—Triumphant (`hgss4`) supports 140 of 163 attacks. It adds hand-size counter damage, Energy formulas, coin tables, board damage/healing, selected-target hits, protection, and attack buffs. Spiritomb's Spooky Whirlpool, when played from hand to the Bench, makes the opponent shuffle their hand into the Pokémon-only deck and draw up to six cards. Venomoth's Poison Moth Wind flips once per turn: heads Poisons the opponent's Active Pokémon and tails Poisons its owner's Active Pokémon; Special Conditions and Ability suppression block use. Focus Energy buffs Bite and Bone Rush uses until-tails damage. Stadium checks use base damage, individual attached Energy uses the shared pool, and multi-target damage may select targets randomly. Twenty-three attacks involving hand/deck, Prize/Lost Zone, Poké-Power, type-selection, or counter-movement effects remain filtered.
- Call of Legends (`col1`) supports 128 of 138 attacks across 86 Pokémon cards. It adds conditional board sweeps, status-count and damage-counter scaling, selected targets, self-status effects, healing/protection, attack locks/buffs, and shared-Energy approximations. Phanpy's Ultra-Thick Skin reduces damage by 10 after Weakness and Resistance while its owner's shared Energy pool is nonempty, approximating attached Energy. Suicune, Entei, and Raikou's Extreme Speed subtract the selected matching-type shared Energy count from their Retreat Costs, approximating matching Energy attached to themselves. Wormhole switches Palkia but omits the opponent's forced switch because one attack choice cannot select both benches. Ten attacks remain filtered for card returns, counter movement, evolution, or unavailable hand/deck/Lost Zone effects.
- Black & White (`bw1`) supports 155 of 160 attacks across 94 Pokémon cards. It adds damage-counter and Energy-count formulas, a three-coin damage table, next-turn attack buffs, attack-failure control, deck-to-Bench search, forced switching, attack copying, damaged-target selection, Stage 2 bonuses, and previous-turn knockout history. Five attacks remain filtered because drawing or retrieving cards to hand and Item recovery are not supported by the battle flow.
- Black & White—Emerging Powers (`bw2`) supports 156 of 164 attacks across 91 Pokémon cards. It adds selected-target and board-wide coin-scaled damage, optional bonus/recoil, status and resistance bonuses, shared-Energy formulas, next-turn buffs/protection, forced switching, and team healing. Energy attachment and per-Pokémon Energy use the shared pool; Heal Pulse randomly heals an injured teammate. Eight attacks remain filtered for draw/hand, in-battle evolution, deck order/composition, and individual Energy movement.
- Black & White—Noble Victories (`bw3`) supports 145 of 153 attacks across 94 Pokémon cards. It adds Pokémon-with-an-attack and Bench-type counts, selected-Bench healing, target-type bonuses, forced switching, board damage, previous-turn knockout bonuses, and until-tails coin attacks. Carracosta's Solid Rock flips when attack damage hits and reduces that damage by 50 after Weakness and Resistance on heads. Individual or typed Energy uses the shared pool. Eight attacks remain filtered for evolution, card draw/deck order, discard recovery, counter transfer, or deck discard.
- Black & White—Next Destinies (`bw4`) supports 149 of 161 attacks across 95 Pokémon cards. It adds shared-Energy formulas, coin-scaled damage, damage-counter bonuses, selected-target damage, deck-to-Bench searches, next-turn buffs, attack copying, hand-size and remaining-HP comparisons, and optional damage/recoil. Musharna's Forewarn lets the player choose one of the top two Pokémon-only deck cards for hand and puts the other card back on top. Stadium-dependent attacks keep base damage only. Twelve attacks remain filtered for Prize-card, hand, or deck-to-hand effects.
- Black & White—Dark Explorers (`bw5`) supports 160 of 166 attacks across 98 Pokémon cards. It adds optional Energy-spend damage bonuses, board-wide damage and healing, coin scaling and until-tails attacks, retreat-cost and damage-counter formulas, attack copying/control, and forced pre-damage switches. Blissey's Softboiled flips once per turn and heals 30 damage from its owner's Active Pokémon on heads. Play-wide damage applies to active and benched cards according to scope; Dual Splash randomly selects two opposing Pokémon. Tool, Special Energy, and Stadium riders are omitted where the battle has no matching state. Six attacks remain filtered for card return, hand/deck actions, Prize counts, or in-battle evolution.
- Black & White—Dragons Exalted (`bw6`) supports 190 of 200 attacks across 122 Pokémon cards. It adds exact two-coin damage/knockouts, until-tails attacks, status-count and Resistance bonuses, Bench damage-counter formulas, shared-Energy formulas/gains, healing/status clearing, temporary damage reduction, forced switches, any-target counter placement, and Triple Laser's selected target plus two random additional Pokémon. Add-a-Dash and Reverse Spin draw into the Pokemon-only hand; Clear Search and Chirp select eligible Pokémon into hand. Triple Energy, Energy Assist, and Draw In use shared-Energy gains, while typed or individually attached Energy and Tool riders are approximated or omitted. Ten attacks remain filtered for card-specific Energy movement, Special Energy in discard, deck ordering/top-card effects, and Prize-card counts.
- Black & White—Boundaries Crossed (`bw7`) supports 213 of 216 attacks across 135 Pokémon cards. It adds retreat-cost and damage-counter formulas, until-tails attacks, shared-Energy scaling/gains, conditional deck searches, hand draws/shuffles/reveals, opponent deck milling, hand-size comparisons, previous-turn knockout bonuses, status checks, healing, and forced switches. Crustle's Sturdy survives an attack-damage knockout at full HP and leaves it at 10 HP; Dusknoir's Sinister Hand repeatedly moves one damage counter between opposing Pokémon. Fluffy Tag switches to a selected friendly Benched Pokémon and buffs its next attack; Split Bomb hits the selected target plus one random opposing Pokémon. Typed and individually attached Energy use the shared pool; Stadium bonuses are omitted. Liepard's Assist, Raticate's Gnaw Through, and Patrat's Patrol remain filtered for copying a friendly Bench attack, Pokémon Tool removal, and deck-top ordering.
- Black & White—Plasma Storm (`bw8`) supports 181 of 194 attacks across 122 Pokémon cards. It adds until-tails damage, Combee and Pokémon searches, random hand discards, status and retreat-cost bonuses, Team Plasma and Round counts, shared-Energy formulas, all-board damage, defense, forced switching, and selected damage-counter transfer. Turbo Energize and Seafaring approximate Energy attachment/recovery with shared-Energy gains; Wreck keeps its base damage without Stadium cards. Thirteen attacks remain filtered for Plasma/Special Energy, Trainer or Tool cards, Prize counts, or deck discard.
- Black & White—Plasma Freeze (`bw9`) supports 165 of 175 attacks across 108 Pokémon cards. It adds conditional defenses/status, Energy/discard/Bench/attack-name formulas, typed Pokémon searches into hand, all-board healing/damage, any-target attacks, counter transfers between chosen Pokémon, forced switches, hand refill, and opponent active-Pokémon return to the deck. Kecleon's Color Change makes Active Kecleon the same type as the opponent's first living Active Pokémon. Transfer Junk recovers a Team Plasma Pokémon only; Signs of Evolution does not enforce three distinct types; Imittack omits the copied attack's Energy requirement. Max Milk selects any own Pokémon to heal and discards the remaining shared Energy pool. Ten attacks remain filtered for Plasma/Special/basic Energy cards or deck ordering.
- Black & White—Plasma Blast (`bw10`) supports 131 of 137 attacks across 85 Pokémon cards. It adds selected healing, dynamic Stage 2 searches, shared-Energy damage formulas, filtered top-five Pokémon reveals, any-target damage, user-assigned damage-counter placement, switching, conditional status/knockouts, and until-tails attacks. Solar Transporter approximates the top five as a random sample of the Pokémon-only deck. Fossil Item recovery/discard, Supporter search, Pokémon Tool checks/removal, and Special Energy movement remain filtered.
- Black & White—Legendary Treasures (`bw11`) supports 214 of 220 attacks across 134 Pokémon cards. It adds shared-Energy formulas, Round and named-Pokémon counts, selected healing and counter placement, board-wide damage, next-attack damage changes, conditional draws/milling, and coin-scaled damage or Energy gains. Individual Energy attachments and redistribution use the shared-pool approximation; Energy Wheel and Replace have no visible effect in that model. Six attacks remain filtered for Prize counts, deck ordering, in-battle evolution, or a named discard-pile revival with Energy attachment.
- XY Base (`xy1`) supports 194 of 202 attacks across 120 Pokémon cards. It adds Grass-type target bonuses, optional damage/recoil, selected healing/status, searches and draws, hand shuffling, play-wide counters, remaining-HP counter placement, conditional status removal, and coin-scaled Energy/damage. Typed or attached Energy effects use the shared pool; Geomancy and Seafaring approximate Energy attachment with shared Energy gain. Eight attacks remain filtered for Supporter/Item cards, deck-top order/type, and Energy cards in hand or deck.
- Flashfire (`xy2`) supports 146 of 153 attacks across 94 Pokémon cards. It adds Bench-count and damage-counter formulas, deck searches, shared-Energy gains, selected and spread damage, healing, protection, attack-failure effects, hand discard, and opponent-deck milling. Energy cards are approximated with the shared pool; Pokémon-only battle cards selected into hand or Bench omit non-Pokémon card effects. Seven attacks remain filtered for cross-turn coin changes, draw prevention, discard-to-deck/deck ordering, Prize counts, counter redistribution, and Energy cards in hand.
- Furious Fists (`xy3`) supports 143 of 159 attacks across 94 Pokémon cards. It adds optional bonus/recoil, damage-counter and retreat-cost formulas, named Bench conditions, active-Energy scaling, deck-to-Bench searches, hand discard/draw, switching, and board damage. Attached Energy uses the shared pool; Tag Team Spark uses the shared pool only when Magmortar is on the Bench. Sixteen attacks remain filtered for cross-turn coin control, Stadium/Tool/Item or Prize effects, deck ordering, in-battle evolution, and unavailable Energy cards/zones.
- Phantom Forces (`xy4`) supports 153 of 162 attacks across 99 Pokémon cards. It adds discard-pile Night March counts, attack copying, damage-counter placement, spread damage, coin protection, dynamic coin/Energy effects, hand searches, and status control. Phantom Gate copies from the opposing Active Pokémon. Nine attacks remain filtered for future-turn Trainer control, same-turn switch history, Pokémon Tools, discard-to-deck, Supporters, or Stadiums.
- Primal Clash (`xy5`) supports 208 of 217 attacks across 133 Pokémon cards. It adds named searches, coin-scaled spread damage/milling, Energy expenditure and acceleration, counter distribution, defensive effects, optional recoil, and forced switches. Shared Energy approximates individual or card-zone Energy. Nine attacks remain filtered for delayed knockouts, Energy/Pokémon card-zone actions, Stadiums, Tools, or deck ordering.
- Roaring Skies (`xy6`) supports 136 of 147 attacks across 92 Pokémon cards. It adds coin-gated switching/control, board counters, type and hand-size damage, searches, draws, hand shuffles, healing, and attack buffs. Close Encounter's two-card draw is supported without its first-turn permission. Eleven attacks remain filtered for Prize cards, delayed knockouts, deck-top/discard-to-deck or attached-card effects, Stadiums/Tools, or Energy from hand.
- Ancient Origins (`xy7`) supports 116 of 130 attacks across 82 Pokémon cards. It adds status-gated damage, discard-pile and damage-counter formulas, draw-to-hand-size and one-Pokémon recovery, selected switches and counter transfers, optional damage/recoil, retreat and attack locks, temporary status protection, and EX-specific Energy discard and Bench damage. Individual and typed attached Energy use the side-wide selected-Energy pool. Fourteen attacks remain filtered for Prize counts, multi-Pokémon recovery, deck ordering and card-specific Energy/Tool actions, devolution, Supporters, or Stadiums.
- BREAKthrough (`xy8`) supports 204 of 220 attacks across 142 Pokémon cards. It adds retreat-cost, hand-size, typed shared-Energy, and distinct-Bench-type formulas; healing-turn and damage-counter checks; until-tails damage; damage-counter knockouts; hand shuffles/refills; discard recovery; selected switches; attack copying; and EX-targeted Bench damage. Sixteen attacks remain filtered for Prize and Trainer/Item/Stadium effects, in-play attack auras, or per-card Energy and Energy-card deck/discard actions. Mewtwo's Stadium bonus is omitted while its Resistance/effect protection remains active.
- BREAKpoint (`xy9`) supports 144 of 159 attacks across 104 Pokémon cards. It adds Grass-Pokémon searches to hand, typed and name-based Pokémon searches to hand or Bench, attack-name and Resistance bonuses, hand-size and retreat-cost formulas, Mega-Bench checks, board damage counters, reflection/protection, self-switching, hand refresh/draw/discard, random opponent-hand choices, and until-tails damage and shared-Energy gains. Fifteen attacks remain filtered for Prize, Trainer/Tool, top-deck and individual attached-Energy, conditional deck-mill, evolution/devolution, counter-multiplication, previous-turn attack-copying, and same-turn switch-history effects.
- Fates Collide (`xy10`) supports 142 of 146 attacks across 100 Pokémon cards. It adds Pokémon searches, named-Pokémon and attack-name bonuses, multi-coin and until-tails effects, Energy-scaled damage/discards, attack locks, forced switching, hand draw/shuffle effects, deck milling, energy-gated damage counters, and counter transfers from the full friendly board. Stadium, Special Energy, and deck-card riders retain base damage where possible; random hand choices and per-Pokémon Energy use the simulator's existing approximations. Four attacks remain filtered for Ability checks, multi-target Energy discards, delayed knockouts, and Pokémon Tool actions.
- Steam Siege (`xy11`) supports 154 of 161 attacks across 105 Pokémon cards. It adds shared-Energy and Energy-choice damage, Energy gains, attack buffs and locks, opponent hand reveal, forced switching, selected searches, damage-counter transfers and distribution, and spread damage with the correct Benched Pokémon Weakness/Resistance rules. Unsupported Prize, Trainer/Tool, Supporter, and evolution-history bonuses retain base damage where possible. Seven attacks remain filtered for Prize-card scaling, deck-card effects, hand-size choice, poison enhancement, or damage-counter redistribution.
- Evolutions (`xy12`) supports 128 of 129 attacks across 83 Pokémon cards. It adds damage reduction, Beedrill-count scaling against a selected Pokémon, Fire Energy scaling/discard, BREAK-only spread damage, optional all-Energy discard bonuses, until-tails damage, knockout-triggered Energy loss, Energy gain, opponent-Energy scaling, and weakness changes that preserve the existing weakness amount. Switching-history bonuses retain base damage; shared Energy still approximates card-specific attachments. Only Shadowy Bite remains filtered because Special Energy cards are not represented in the opponent's discard pile.
- Sun & Moon Base (`sm1`) supports 231 of 238 attacks across 130 Pokémon cards. It adds multi-coin damage, selected-target damage and knockouts, optional discard recovery, deck searches, own/opponent hand effects, full-board healing, Energy-scaled attacks and shared-Energy gains, and status clearing. Sol Burst-GX approximates up to five Energy attachments as shared Energy gain; individual attached Energy remains approximated by the shared pool, and once-per-game GX usage is not enforced. Seven attacks remain filtered for Energy cards in hand/deck, Prize cards, Pokémon Tools, deck ordering, Special Energy, or Energy attachments from hand on a future turn.
- Sun & Moon—Guardians Rising (`sm2`) supports 272 of 287 attacks across 148 Pokémon cards. It adds shared-Energy scaling, type and subtype bonuses, selected damage and counters, board-wide damage, forced switching, recovery and revival, Pokémon searches, hand shuffles/draws, and dynamic damage-counter distribution. Energy is tracked by side rather than by Pokémon; Tapu Cure-GX automatically heals up to two injured Benched Pokémon, and Trainer/Item counts resolve as zero because those cards are not in the battle deck. Fifteen attacks remain filtered for retreat-cost changes, prior-turn attack copying, Prize cards, multi-target Bench damage/returns, Energy-card deck effects, protection-bypassing damage, deck ordering, and delayed knockouts.
- Sun & Moon—Burning Shadows (`sm3`) supports 265 of 274 attacks across 142 Pokémon cards. It adds full-board healing and self-return, any-target attacks, attack buffs, discard recovery and milling, selected Bench revival, damage-counter placement, status-based bonuses and knockouts, Energy discards/scaling, and GX/EX-targeted spread damage. Shuffling an Active Pokémon into a deck now returns its Pokémon card to that deck; attached Energy and Tools remain unmodeled. Nine attacks remain filtered for Prize cards, Ability checks, in-battle evolution, Prize inspection, deck ordering, or selecting multiple typed Pokémon from the discard pile.
- Sun & Moon—Shining Legends (`sm35`) supports 119 of 121 attacks across 66 Pokémon cards. It adds hand refresh, turn-history bonuses, status and injured-Bench bonuses, discard recovery by type, until-tails damage, named-Bench bonuses, hand/deck control, counter distribution, Basic searches, GX attack copying, and board-wide damage. Energy formulas use the shared side-wide pool where they refer to attached Energy, and random hand shuffles now return the selected Pokémon to the deck. Dual Pump remains filtered because it requires two independently selected targets; Legendary Guidance remains filtered because Energy cards are not represented in the battle deck.
- Crimson Invasion (`sm4`) supports 178 of 193 attacks across 108 Pokémon cards. It adds Pokémon searches, Energy/status/count bonuses, damaged-Bench targeting, forced switching, until-tails damage, attack failure effects, hand reveal/shuffle, counter placement, and deck milling. Energy scaling uses the shared side-wide pool; several unmodeled Stadium, Tool, Special Energy, and optional counter riders retain printed base damage. Fifteen attacks remain filtered for Energy-card actions, in-battle evolution, Prize cards, Trainer/Supporter/Tool actions, and an opponent-controlled permission choice.
- Ultra Prism (`sm5`) supports 217 of 237 attacks across 137 Pokémon cards. It adds deck-size and board-count formulas, type-distinct Basic searches, optional Energy discards, next-attack protection, turn-history checks, damage-counter movement, damage-counter conditions, until-tails attacks, and shared-Energy acceleration. Energy remains side-wide; Energy-card deck/discard effects and individual attachments use shared-pool approximations. Twenty attacks remain filtered for Prize cards, card-zone actions, in-battle evolution, Ability checks, and counter redistribution or ordering the battle model does not support.
- Forbidden Light (`sm6`) supports 191 of 211 attacks across 120 Pokémon cards. It adds Ultra Beast and named-Pokémon counts, selected-target attacks, damage-counter knockouts, hand draw and Pokémon search, optional milling, Energy gains, and retreat/attack control. Energy remains side-wide; named discarded Basic Energy, Stadium, previous-turn Supporter, Ability, in-battle evolution, and card-zone mechanics are omitted or retain base damage. Twenty attacks remain filtered for in-battle evolution, Prize/Trainer/Energy cards, Ability or zone restrictions, and double-target or delayed-knockout effects.
- Celestial Storm (`sm7`) supports 199 of 232 attacks across 142 Pokémon cards. It adds Energy and board-count formulas, multi-target and selected-target attacks, status/counter conditions, hand effects, counter distribution, damage protection, and Pokémon searches. Energy remains side-wide; GX limits, Energy cards in hand/deck, Trainer cards, Prize counts, and some multi-target choices are not modeled. Thirty-three attacks remain filtered for card-zone effects, Trainer/Ability/Prize conditions, and multi-target choices.
- Dragon Majesty (`sm75`) supports 105 of 115 attacks across 67 Pokémon cards. It adds until-tails damage, selected-target damage, shared-Energy formulas, draw and Basic Pokémon search, temporary damage reduction, board-wide attacks, and GX-targeted effects. Hydro Pump and Photon Geyser use the side-wide Energy pool as approximations. Ten attacks remain filtered for Energy cards in hand/deck/discard, multi-Pokémon discard revival, and Prize-card conditions.
- Lost Thunder (`sm8`) supports 272 of 315 attacks across 192 Pokémon cards. It adds multi-coin and until-tails attacks, damaged/healed/status conditions, multi-target effects, counter distribution, board healing, Pokémon searches, and GX-targeted effects. Energy remains side-wide; some discard and attachment effects use shared-pool approximations, while Lost Zone, Prize, Trainer/Tool, deck-ordering, and turn-history effects remain unmodeled. Forty-three attacks remain filtered for those card-zone effects and unsupported choices.
- Team Up (`sm9`) supports 228 of 260 attacks across 155 Pokémon cards. It adds conditional knockouts, forced switches, damage-counter distribution, board attacks, Pokémon searches, hand effects, and GX-targeted effects. Energy remains side-wide; attachment and Energy-type costs use shared-pool approximations. Thirty-two attacks remain filtered for Lost Zone/Prize, Trainer/Tool, Energy-card, evolution/turn-history, and multi-target effects that the battle model cannot represent.
- Unbroken Bonds (`sm10`) supports 292 of 338 attacks across 196 Pokémon cards. It adds special-condition damage, conditional damage and knockouts, damage-counter placement/distribution, named-Pokémon and TAG TEAM bonuses, hand effects, Pokémon searches, until-tails attacks, and optional typed Energy discards. Energy is tracked side-wide, so per-Pokémon attachment conditions use that shared pool. Flare Starter omits its first-turn bonus, and opponent card choices are randomized for Unfair-GX and Pungent Aroma. Forty-six attacks remain filtered for Prize, Trainer/Tool, Energy-card zone, exact multi-target, and prior-turn effects.
- Unified Minds (`sm11`) supports 315 of 352 attacks across 216 Pokémon cards. It adds selected healing, multi-target damage, named-Pokémon and subtype counts, damage-counter placement, hand and deck effects, attack switching, and Ultra Beast checks. Energy and card-zone effects use side-wide approximations; the first-turn switch bonuses on First Impression and Tandem Shock retain base damage. Thirty-seven attacks remain filtered for evolution/devolution, Prize and Trainer/Tool effects, deck ordering, attack-history conditions, and damage-counter or multi-target choices the battle format cannot represent.
- Cosmic Eclipse (`sm12`) supports 348 of 375 attacks across 229 Pokémon cards. It adds conditional board healing and status, selected healing and damage, TAG TEAM and board-count bonuses, deck searches, milling, hand effects, attack buffs, forced switches, and until-tails attacks. Energy stays side-wide, while Trainer, Stadium, Tool, Prize, and Lost Zone effects are unavailable. Twenty-seven attacks remain filtered for evolution and attack copying, opponent-controlled or exact multi-target choices, deck ordering and top-card choices, extra turns, Prize manipulation, and card-specific Energy actions.
- Sword & Shield Base (`swsh1`) supports 270 of 277 attacks across 173 Pokémon cards. It adds Pokémon searches, switching and shuffling, damage-counter exchanges, hand draw and milling, named-Pokémon and Pokémon V/GX bonuses, Energy-scaled damage, and retreat locks. Energy attachment and type checks use the shared side-wide pool; Octolock’s attack-cost increase and some top-card or prior-turn checks are unavailable. Seven attacks remain filtered for prior-turn knockout history, Energy-card deck/discard actions, conditional hand shuffles, and deck-top inspection.
- Rebel Clash (`swsh2`) supports 270 of 283 attacks across 176 Pokémon cards. It adds selected Pokémon searches and revival, damage-counter placement/distribution and exchange, attack copying, hand effects, Energy-scaled damage, retreat and Special Condition bonuses, forced switches, and milling. Energy uses the shared side-wide pool; unmodeled Energy and Trainer cards, Prize counts, same-turn evolution/switch history, and variable counter/deck choices remain filtered or retain base damage. Thirteen attacks remain filtered for those history and card-zone effects.
- Darkness Ablaze (`swsh3`) supports 267 of 274 attacks across 172 Pokémon cards. It adds variable coin attacks, Mad Party discard counts, Energy-scaled damage, board healing and damage, hand cycling, counter placement, Pokémon searches, and last-turn knockout checks. Energy remains side-wide; Energy-card actions are approximated, while Prize/history conditions and deck ordering remain unavailable. Seven attacks remain filtered for Energy-card choices, Fossil cards, deck ordering, and exact multi-target damage.
- Champion’s Path (`swsh35`) supports all 89 attacks across 57 Pokémon cards. It adds Pokémon searches and draws, discard-pile Energy recovery, Bench Energy acceleration, selectable Energy-discard damage, healing-turn bonuses, discard-pile type counts, and status bonuses. Energy is side-wide; Bad Brawl keeps its base damage because Supporter history is unavailable. No attacks remain filtered in this set.
- Vivid Voltage (`swsh4`) supports 261 of 269 attacks across 166 Pokémon cards. It adds selected-target damage, counter distribution and target-HP effects, discard-pile attack counts, Energy-scaled formulas, searches/draws, Energy acceleration, coin damage, and self-switching. Energy and card-zone effects use Pokémon-only/side-wide approximations; bottom-deck placement is treated as a shuffle. Eight attacks remain filtered for evolution, exact discard/counter choices, deck ordering, hand-gated spread, Trainer/Tool cards, and typed Energy-card effects.
- Shining Fates (`swsh45`) supports 79 of 81 attacks across 58 Pokémon cards. It adds Energy recovery, selected healing, counter placement, knockout effects, searches/draws, attack copying, and Energy-discard damage. Energy uses the shared side-wide pool; two attacks remain filtered for in-battle evolution and a conditional hand shuffle/draw.
- Battle Styles (`swsh5`) supports 219 of 232 attacks across 146 Pokémon cards. It adds V-target bonuses, conditional status/type damage, Energy-scaled attacks, forced and self-switching, Pokémon searches, healing and status effects, and until-tails attacks. Energy attachment and opponent-side Energy counts use the shared side-wide pool; thirteen attacks remain filtered for unmodeled hand/deck card choices, deck ordering, evolution, or exact multi-target actions.
- Chilling Reign (`swsh6`) supports 227 of 249 attacks across 168 Pokémon cards. It adds damage reduction, conditional multi-coin and status damage, retreat/Energy formulas, Pokémon searches, hand draw/discard, Bench attacks, and discard-pile recovery. Stadium/Tool checks and Energy attachment use base-damage or shared-pool approximations; 22 attacks remain filtered for Special Energy, Trainer/Tool/card-zone, delayed-turn, and exact choice effects.
- Evolving Skies (`swsh7`) supports 275 of 307 attacks across 193 Pokémon cards. It adds until-tails attacks, prior-knockout bonuses, V/evolution target checks, retreat and Energy formulas, Pokémon searches, hand effects, switching, Bench attacks, status/protection, and remaining-HP knockouts. Energy cards and types use the shared pool; 32 attacks remain filtered for Trainer/Energy card zones, ordered deck effects, extra turns, Prize state, and exact choices.
- Fusion Strike (`swsh8`) supports 362 of 391 attacks across 245 Pokémon cards. It adds Pokémon searches/recovery, draw and milling, counter distribution, targeted and board-wide damage, status, subtype/hand/Energy formulas, and Basic-Pokémon knockouts. Energy uses the shared pool; 29 attacks remain filtered for Trainer/Energy card zones, cross-turn history, and exact choices.
- Brilliant Stars (`swsh9`) supports 206 of 235 attacks across 151 Pokémon cards. It adds evolution/discard counts, V-target and damaged-target bonuses, conditional knockout checks, Bench and Energy formulas, searches, healing/draw, counter distribution, and coin-based Energy acceleration. Energy uses the shared pool; 29 attacks remain filtered for Prize, Trainer/Tool, Special Energy, evolution history, and exact-choice effects.
- Astral Radiance (`swsh10`) supports 237 of 264 attacks across 167 Pokémon cards. It adds subtype/name/hand/Energy formulas, Pokémon searches, draws, forced/self-switches, board attacks, conditional knockouts, coin attacks, and status. Energy uses the shared pool; 27 attacks remain filtered for first-turn requirements, Trainer/Energy card zones, VSTAR limits, and exact multi-target choices.
- Pokémon GO (`pgo`) supports 109 of 119 attacks across 74 Pokémon cards. It adds named-Pokémon and discard-pile formulas, Energy-scaled attacks, searches/draws, selected healing, hand disruption, coin-based protection and damage, and milling. Energy attachment and counts use the shared side-wide pool; Pokémon-only searches approximate broader card searches. Ten attacks remain filtered for exact multi-target damage, turn-history and Supporter checks, Prize manipulation, and once-per-game effects.
- Lost Origin (`swsh11`) supports 241 of 278 attacks across 177 Pokémon cards. It adds named-Pokémon and weighted formulas, opponent-Energy scaling, discard-pile counts, hand/deck searches and draws, milling, temporary attack/retreat control, damage-counter transfers, protection, and selected Energy discards. Energy movement and card recovery use the shared side-wide/Pokémon-only approximations; 37 attacks remain filtered for Lost Zone, Prize, Trainer/Tool/Stadium, VSTAR, deck-order, delayed knockout, and exact multi-target effects.
- Silver Tempest (`swsh12`) supports 227 of 279 attacks across 177 Pokémon cards. It adds board healing/damage, targeted attacks, Pokémon searches, draw and hand cycling, shared-Energy formulas, status bonuses, conditional knockouts, and damage-counter effects. Energy attachments and opponent Energy counts use the shared side-wide pool; 52 attacks remain filtered for card-zone, Prize/Lost Zone, Stadium/Tool/Supporter, VSTAR, turn-history, and exact multi-target effects.
- Crown Zenith (`swsh12pt5`) supports 180 of 194 attacks across 123 Pokémon cards. It adds optional deck-mill damage, attacker-damage-counter checks, shared-Energy formulas and selected discards, Pokémon searches/draws, switching, target bonuses, and until-tails attacks. Energy remains side-wide, and deck milling uses the Pokémon-only battle deck. Fourteen attacks remain filtered for Energy-in-discard and VSTAR-limit effects, Item/Tool/Supporter/Lost Zone/Prize actions, exact multi-target damage, turn history, and unsupported deck-ordering or attached-Energy checks.
- Scarlet & Violet Base (`sv1`) supports 308 of 324 attacks across 209 Pokémon cards. It adds retreat-cost formulas, selected healing and switching, coin-based switching and milling, Fire/Water Energy gains and counts, named discard-pile counts, counter distribution, protection, targeted attacks, hand shuffling, and Pokémon searches/draws. Energy remains side-wide; Energy-card, Item/Tool/Supporter, Prize, attack-history, in-battle evolution/copying, and exact multi-target effects remain unmodeled. Sixteen attacks remain filtered for those effects.
- Paldea Evolved (`sv2`) supports 353 of 376 attacks across 238 Pokémon cards. It adds damaged-target and attacker-counter formulas, conditional coin protection and multi-coin damage, shared-Energy gains/discards and formulas, named discard and attack-name counts, counter transfer and scaled board-wide counters, status/evolution target bonuses, searches/draws, and targeted attacks. Energy remains side-wide; Prize and turn history, Energy/Trainer/Tool/Stadium card zones, in-battle evolution, and exact multi-target/player choices remain unmodeled. Twenty-three attacks remain filtered for those effects.
- Obsidian Flames (`sv3`) supports 309 of 325 attacks across 210 Pokémon cards. It adds dynamic Energy-based coin flips, hand-size comparisons, discard and hand disruption, attack locks, retreat-cost and discard-pile formulas, forced switching, searches, healing, status, protection, milling, and targeted damage/counters. Energy and attachment effects use the shared side-wide pool, while mill effects use the Pokémon-only battle deck. Camerupt's Eruption keeps its base damage and mills one card from each deck; its Energy-card bonus is unavailable in Pokémon-only decks. Sixteen attacks remain filtered for Prize counts, Energy-card and hand-Energy actions, in-battle evolution, exact deck ordering, and Item/Tool recovery.
- 151 (`sv3pt5`) supports 271 of 287 attacks across 185 Pokémon cards. It adds attacker/target damage conditions, type and hand-size checks, attack copying, weakness changes, coin-scaled attacks/protection, Pokémon searches and recovery, draws, status, forced switching, and damage-counter distribution. Energy attachment uses the shared side-wide pool. Trainer-history attacks retain printed base damage, Trainer-card counts resolve as zero in Pokémon-only decks, and deck shuffles do not carry attached-card state. Sixteen attacks remain filtered for Energy cards, Trainer/Item/Tool/Stadium and Prize actions, future-turn coin control, exact multi-target selection, and deck-top card conditions.
- Paradox Rift (`sv4`) supports 311 of 332 attacks across 222 Pokémon cards. It adds Energy-scaled and Energy-gain attacks, hand-size formulas, conditional damage and status, until-tails coins, Pokémon searches, selected healing/counter effects, protection, milling, and damage-counter transfers. Energy remains a shared side-wide pool; deck/hand effects use the Pokémon-only battle zones. Twenty-one attacks remain filtered for Energy-card zones, Prize counts, future-turn or same-turn history, deck-top choices, Tool actions, and exact three-target damage.
- Temporal Forces (`sv5`) supports 276 of 296 attacks across 185 Pokémon cards. It adds Energy-scaled and type/count formulas, status and target bonuses, until-tails attacks, Pokémon searches, hand cycling/discard, selected Ancient-Pokémon healing, protection, milling, and counter checks. Energy remains side-wide and the hand/deck contain Pokémon only; hand-based attacks use the remaining opening hand and subsequent draws. Twenty attacks remain filtered for Energy/Item/Tool and Special Energy zones, top-deck inspection/order, exact multi-target or counter-transfer choices, opponent-hand choices, switching, and individual Pokémon Energy attachment.
- Twilight Masquerade (`sv6`) supports 271 of 294 attacks across 185 Pokémon cards. It adds retreat/Energy/hand formulas, same-type and named-Pokémon bonuses, last-turn knockout checks, until-tails attacks, Pokémon searches/recovery, hand draw/reveal, selected healing and counters, optional recoil, deck returns, and forced switching. Energy remains side-wide; attached-Energy formulas use that shared pool, and deck-top milling is random because deck order is not represented. Twenty-three attacks remain filtered for delayed knockouts, first-turn restrictions, Energy-card searches/attachments, variable self-counter placement, exact multi-target effects, and in-battle evolution.
- Shrouded Fable (`sv6pt5`) supports 106 of 124 attacks across 79 Pokémon cards. It adds discard-count formulas, draws and Pokémon searches, selected Bench returns, board healing/counters, subtype and status bonuses, optional bonus damage with next-turn attack lock, and damage reduction. Energy remains side-wide, so attached-Energy checks are approximated from the selected Energy type; attacks needing Prize cards, Energy cards, attack history, deck order, exact multi-target choices, or multi-Pokémon discard revival remain filtered.
- Stellar Crown (`sv7`) supports 203 of 214 attacks across 153 Pokémon cards. It adds selected-target damage/counters, named-Pokémon filters, Energy-scaled damage, searches, draw, hand-size bonuses, switching, and protection. Energy remains side-wide; selected-energy searches use the deck’s Pokémon types as an approximation. The Pokémon-only hand starts with cards left after opening setup; drawn or searched Pokémon can later be played under the front-row-first Basic rules. Eleven attacks remain filtered for Energy-card zones, attack history, opponent-selected switching, deck order, Special Energy, and Tool effects.
- Surging Sparks (`sv8`) supports 288 of 317 attacks across 207 Pokémon cards. It adds dynamic coin attacks, draw and Pokémon searches, selected healing, switching, forced Bench returns, spread counters/damage, discard counts, subtype and status bonuses, and next-turn attack buffs. Energy remains side-wide, so attached-Energy checks and Energy-card attachment effects use shared-pool approximations; deck-top discards are randomized because order is not modeled. Twenty-nine attacks remain filtered for evolution, Prize cards, Energy/Trainer card zones, Ability checks, deck ordering, turn history, and exact multi-target choices.
- Prismatic Evolutions (`sv8pt5`) supports 171 of 183 attacks across 123 Pokémon cards. It adds shared-Energy damage formulas and gains, ex/V and Tera target bonuses, selected-target attacks and knockouts, Energy discards, healing, milling, hand cycling, and Special Condition damage. Attached Energy remains approximated by the side-wide Energy pool; Basic Energy attachments/searches become shared-pool gains. The Pokémon-only hand starts with cards left after opening setup; Burst Roar can discard cards from it and draw up to six, and Basic Pokémon can be played under the front-row-first rules. Stadium and Ancient Supporter conditions use base damage or omit their extra mill. Twelve attacks remain filtered for devolution, exact multi-target returns, revival, Prize cards, Energy cards in the discard/hand, and Energy-card choices.
- Journey Together (`sv9`) supports 233 of 243 attacks across 168 Pokémon cards. It adds coin-until-tails attacks, named Bench conditions, ex-target bonuses, hand draw/shuffle/disruption, Pokémon searches to the Bench, counter damage, retreat-cost formulas, retaliation checks, switching, and next-turn damage reduction. Attached-Energy formulas and Basic Water Energy deck searches use the shared Energy pool; Iono-specific Energy counts use all of the side's Energy, while opponent card choices and Mimikyu's two targets are randomized. Ten attacks remain filtered for Prize cards, Basic Energy in the discard, deck order, Stadium/Supporter cards, attack history, and copying from a friendly Bench.
- Destined Rivals (`sv10`) supports 279 of 307 attacks across 209 Pokémon cards. It adds named-knockout history, coin-until-tails attacks, Team Rocket and named-Pokémon counts, hand draw/search, selected healing, forced switches, Energy/target formulas, status counts, optional damage/recoil, attack copying from an opposing Tera Pokémon, and selected damage-counter transfers from Team Rocket's Bench. Energy remains side-wide; typed/individual Energy and Regi Charge's discard-pile Energy recovery use documented shared-pool approximations. Stadium, Supporter-count, and same-turn evolution riders keep base damage where those zones/history are unavailable. Twenty-eight attacks remain filtered for Tools, Prize/Energy/Trainer cards, in-battle evolution, exact multi-target choices, deck ordering and milling, delayed knockouts, and copying attacks from the deck.
- White Flare (`rsv10pt5`) supports 251 of 257 attacks across 162 Pokémon cards. It adds Basic-Pokémon team healing, Energy-scaled damage/gains/discards, Pokémon deck searches and draws, hand-size checks, damage-counter transfer, next-turn damage reduction, forced switching, and attack copying. Attached Energy remains approximated with the side-wide shared-Energy pool; Energy Gift and Wrapped in Wind add shared Energy, while Prize-card, discard-pile Energy, Special Energy, and Basic Energy card zones retain base damage or use that pool. The opening Pokémon-only hand contains cards remaining after opening setup and attacks can refill it for later hand checks. Roar’s forced-switch replacement is chosen by the attack user because the engine does not model an opponent-choice prompt. Six attacks remain filtered for top-deck inspection/discard, deck ordering, and Item searches.
- Black Bolt (`zsv10pt5`) supports 236 of 245 attacks across 161 Pokémon cards. It adds healed-this-turn and Special Condition bonuses, until-tails damage, hand-size and Energy formulas, Basic-Pokémon searches, draw/reveal effects, retreat-cost scaling, Evolution counts, and Basic-target knockouts. Typed and individual attached Energy use the shared-Energy pool; Charge and Abundant Harvest only add Energy when the selected type matches. Nine attacks remain filtered for Trainer/Energy-card searches, in-battle evolution, and moving Energy between individual Pokémon.
- Mega Evolution (`me1`) supports 222 of 226 attacks across 152 Pokémon cards. It adds shared-Energy formulas/gains, Pokémon searches and draws, selected damage/healing, lowest-HP and exact-counter knockouts, optional Energy discards, status checks, shuffling, and temporary attack reduction. Attached Energy remains side-wide; Energy attachments use shared-pool approximations, while Prize, Stadium, top-deck Supporter and discard-pile Energy effects are unavailable. Four attacks remain filtered for those card-zone operations.
- Phantasmal Flames (`me2`) supports 149 of 152 attacks across 110 Pokémon cards. It adds healed-this-turn and incoming-damage checks, Energy-scaled damage/discards/gains, Pokémon searches and draws, selected damage/healing, status protection, knockouts, counters, and switching. Energy stays side-wide; discard recovery and individual attachments use shared-pool approximations. Three attacks remain filtered for Basic Energy and Supporter card-zone actions.
- Ascended Heroes (`me2pt5`) supports 324 of 340 attacks across 243 Pokémon cards. It adds team and Energy-scaled damage, shared-Energy costs/gains, Pokémon-only hand and deck effects, searches, coin attacks, multi-target damage, protection, healing, and knockouts. The hand contains cards remaining after setup and attacks can draw more Pokémon cards into it; Basic Pokémon can be played for free under the front-row-first rule. Energy remains side-wide, and multi-target attacks use automatic target selection. Sixteen attacks remain filtered across twelve distinct attacks for Trainer/Tool/Prize/Energy card zones, in-battle evolution, counter doubling, or turn history.
- Perfect Order (`me3`) supports 132 of 136 attacks across 92 Pokémon cards. It adds Pokémon searches and Pokémon-only hand effects, typed Energy formulas, shared-Energy recovery/transfer approximations, selected healing and switching, coin-based board damage, protection, counter placement, and target bonuses. Energy remains side-wide. Four attacks remain filtered for multi-Pokémon knockouts or name-filtered hand reveals.
- Chaos Rising (`me4`) supports 137 of 139 attacks across 97 Pokémon cards. It adds named-Pokémon and Energy-scaled damage, Pokémon-only searches and hand effects, counter transfers, board healing, switching, coin attacks, and targeted effects. Energy remains side-wide. Two attacks remain filtered for reviving multiple Pokémon from discard or searching for an Item.
- Pitch Black (`me5`) supports 131 of 139 attacks across 95 Pokémon cards. It adds healed-turn and hand-size checks, deck searches, discard/mill effects, typed Energy scaling, hand discards/draws, board healing, counter placement, and coin damage. Eight attacks remain filtered across seven distinct effects for fixed deck-top/bottom selection, discard-pile Ability counts, delayed knockout timing, or conditional attack copying.
- 30th Celebration (`me55`) supports 210 of 227 attacks across 158 Pokémon cards. It adds forced and self-switching, last-turn knockout and Energy formulas, board-wide damage, counter placement, healing, protection, status clearing, Pokémon searches/draws, hand effects, and coin-until-tails attacks. Energy attachments use the shared Energy pool. Seventeen attacks remain filtered across twelve distinct effects for Trainer/Energy/Stadium card zones, deck-top selection, Prize cards, evolution or replacement, discard-pile Energy, and Item choices.
- 30th Celebration: Classic Collection (`me55c`) supports 37 of 42 attacks across 27 Pokémon cards. It adds shared-Energy formulas and discards, board-wide damage, dynamic coin flips, counter distribution, healing, and evolved/ex target bonuses. Energy remains side-wide. Five attacks remain filtered across four distinct effects for deck-top Energy, Lost Zone/hand interactions, counter movement between opposing Pokémon, or copying an attack restricted to Fusion Strike Pokémon.

## Booster Packs
- Generated via `src/utilities/tcg/` logic
- Booster packs use structured slots instead of the general card reward bonus-roll draw. Every standard pack slot independently rolls 65% common, 20% uncommon, 14% general rare, or 1% chase, so any pack can contain multiple rare cards (including two or more chase cards at very low odds).
- The synced Pokemon TCG API rarity labels are grouped into four pack buckets. General rare includes ordinary rares, holo rares, ex/GX/V/VSTAR/VMAX, Radiant, Amazing, Illustration, Trainer Gallery, Ultra, and other special-but-non-secret labels. Chase is reserved for Special Illustration, Secret, Rainbow, Hyper/Mega Hyper, Black White, Holo Star, and `MEGA_ATTACK_RARE` labels. Unknown labels fall back to common so newly added source data remains drawable.
- Bulk opening uses the same per-slot table as single-pack opening; there is no separate bulk rarity penalty now that all slots roll independently. Missing buckets are skipped and the available bucket weights are rebalanced.
- Chase selections prefer cards the user does not own yet, including across a multi-pack opening. Once every chase card in that set is owned, duplicates are allowed so the chase slot can still resolve. Sets without chase cards, such as Base Set, simply omit that bucket and rebalance the remaining common/uncommon/rare weights; God Packs likewise fall back to their available rare-or-better buckets.
- Non-promo packs have a 1:1000 God Pack chance; a God Pack changes every slot in that pack into a rare-or-better slot.
- Pack draws avoid exact duplicate card IDs within a single pack when possible and give unowned cards a small selection weight bonus.
- Shiny/rare card animations
- Single-pack opening uses the standard card drawer reveal. The inventory lightning action consumes every owned pack for that set, draws all cards in safe server chunks, and opens directly on the summary grid.
- Cards granted by activities use the same full-screen card drawer reveal as booster packs, including the same night canvas, flip animation, rarity treatment, summary grid, and collection action.

## Local Set Artwork
- TCG card art remains remote through each card's `images.small` / `images.large` URL.
- TCG set logo and symbol artwork is cached in source data for generated item sprite composition only and is not bundled as public runtime assets.
- Booster pack and binder item icons are generated for every TCG set under `public/sprites/items/tcg/`.
- Duplicate-card redistribution keeps one copy of each card and sends excess copies to HQ through the Card Redistribution Box. The player receives Pokedollars per excess copy: 5 for Common/Unknown/Promo, 10 Uncommon, 20 Rare, 35 Rare Holo, 50 mid-tier special rarities, 75 advanced special rarities, 100 ultra/secret rarities, and 150 for the highest Hyper/Star rarities. No Crystals are generated by duplicate redistribution; the initial 500-Crystal Basic Training contribution is a one-time pit funding sink.
- Basic Training content is authored in Kanto Underground and uses the TCG Inspection, TCG Battle, and Art Academy engines. Gideon recruits the player after mistaking a Promo binder for membership paperwork, while Mina explains the organization’s card-for-crystals operation and treats the talking pit as routine office infrastructure. Completing Basic Training unlocks the 500-Crystal contribution task. Handing over those crystals awards Underground Society Rank 1 and the Card Redistribution Box together; the contribution remains a one-time sink. Duplicate redistribution returns cards to HQ for repacking and compensates the player in Pokédollars rather than generating crystals directly. Its one-time Pikachu card-design lesson uses a 30% Art Academy passing threshold. The later “My Very Own Set” lesson follows the battle wrap-up without requiring completed Base or Jungle collections, awards the Base Set 2 binder, and unlocks foil-plus-dried-dye recipes for Base, Jungle, Fossil, and Base Set 2 packs; the matching Team Rocket recipe additionally requires its binder.
- TCG battles remain Pokemon-only 15-card decks; Trainer cards are intentionally unsupported in the current battle rules. All series use a shared 60-point cap, and Kanto Underground requires a Base-series deck. Pewter School teaches the three-card opening hand and Basic redraw, one to three opening Basics, front-before-Bench placement, automatic turn-start draws, shared Energy/Charge, free Basic plays and evolution, attack/card unlock timing, supported effects, retreating, promotion, and the six-KO/empty-board loss conditions.
- Passing the Pewter quiz unlocks `Lost-and-Found Practice`, a one-time 250-Pokédollar tutorial battle against a legal mixed-type Base-series deck containing fifteen 1-cost Basic cards. Winning introduces the serial slacker arc: Cal’s Fire demonstration, Marina’s Water quality audit, and Fern’s Grass captive-audience tournament each receive a conversation task before their existing one-time battle. The elemental IDs, 1,000-Pokédollar rewards, decks, and recorded wins remain unchanged. New story tasks include an inverse battle-wrap-up requirement so completed players do not receive retroactive unfinished conversations.
- The tutorial, Fire, Water, and Grass battles use Rattata, Charizard, Blastoise, and Venusaur icons respectively; the three post-training rematches retain the elemental icons and 350-Pokédollar payouts. Every authored opponent deck is validated as a legal 15-card deck within the 60-point cap before battle start.
- TCG Battle Explore drawers show Wins and Losses and the required card series before starting.
- Carddex shelves present the newest unlocked series and expansions first for fast collection access. Series and set filters show unique collected cards over the total in each option, and the mobile filter header uses the Base Set booster sprite. Trainer deck-series selectors retain chronological release order rather than alphabetical order.
- Trainer Auto Fill builds fifteen cards under the shared 60-point cap, using only cards from the selected series.
- Evolution-triggered damage-counter Abilities let the player choose an opposing Pokémon or decline the optional effect when evolving; PvE opponents target the player's Active Pokémon. Damage and knockout promotion resolve in the same evolve action.
- Azumarill's Froth can be chosen when Azumarill evolves from hand onto an Active Pokémon; it Paralyzes each living opposing front-row Pokémon. PvE opponents use it automatically, and status immunities apply.
- Active Dark Houndoom's Fire Breath flips once per turn; heads Burns the opposing Active Pokémon and tails applies no Special Condition. Fire Breath is unavailable while Houndoom has a Special Condition, and players, PvP participants, and NPC opponents can use it.
- Misdreavus's Dark Spell flips once per turn while Misdreavus is Active and free of Special Conditions. Heads lets its owner choose an opposing Pokémon for one damage counter; tails places none. Another living Active Misdreavus is required, and the PvE opponent selects a target automatically.
- Dusknoir's 13-counter and Dusclops's 5-counter once-per-turn Abilities can target an opposing Pokémon and then Knock Out their source. The self-Knockout resolves through normal board cleanup, winner checks, and promotion in PvE and PvP.
- Skwovet's once-per-turn Ability shuffles the player's modeled Pokémon hand to the bottom of the deck, then draws one card. It works in PvE and PvP whenever the hand is nonempty, including when the deck is empty before the hand is shuffled; NPC opponents use it automatically.
- Genesect ex's Metallic Signal searches for up to two Metal Pokémon that evolve from another Pokémon, places the selected cards into hand, and shuffles the deck. Player and PvP actions validate the type and evolution requirements; NPC opponents select matching cards automatically.
- Iron Leaves ex and Articuno-GX can switch into the Active Spot when played from hand onto the Bench. Player, PvP, and NPC opponent flows support the switch; their Energy-transfer riders do not change the shared pool because individual Pokémon attachments are not tracked.
- Chien-Pao ex's once-per-turn Active Ability to search for up to two Basic Water Energy adds up to two units to the shared Energy pool in PvE and PvP, subject to the format cap.
- Same-name deck-swap Poké-Powers let a player select a matching Pokémon from the deck. Damage, Special Conditions, and temporary effects transfer to the replacement, while the outgoing Pokémon returns to the shuffled deck; turn limits are shared by Power name. The PvE opponent picks the first safe match.
- Miraidon ex's once-per-turn Ability searches for up to two Basic Lightning Pokémon and puts the selected cards on the Bench, respecting open slots. The PvE opponent selects eligible cards automatically.
- Card Quality Control uses a 30-second manual study phase with a previous/next card carousel and a Ready action. The study timer is separate from the question timer, which starts when Ready is pressed; each session gives two lives, and incorrect answers remove one life. The player must answer three questions correctly, with no question-count cap: generation continues until the target is reached, both lives are lost, or time expires. Question generation avoids immediately repeating the same card, question type, and answer. Session expiry includes both study and question windows, while answer-count validation and rewards remain server-authoritative.
- Pokémon whose Ability allows two attacks per turn can attack twice with that same Pokémon. The battle keeps the current turn open between attacks, handles any required promotion after a knockout, and then ends the turn after the second attack in PvE and PvP.
- Mega Greninja ex and Meowscarada ex can spend one matching typed unit from the shared Energy pool to place their printed damage counters. Active and Bench target restrictions, once-per-turn use, Ability suppression, and knockout promotion are enforced; the source Energy card hand/discard is approximated because those zones are not modeled.
- Decidueye-GX's Feather Arrow can also place its two damage counters on a chosen opposing Pokémon once per turn without a cost. Both flows resolve counters directly, without Weakness or Resistance modifiers.
- Hisuian Samurott VSTAR's VSTAR Power can place four counters on a chosen opposing Pokémon and shares the once-per-game side limit with other VSTAR Powers.
- Draw-to-hand-size Abilities with the “before your attack” timing clause use the existing refill action, including Silvally-GX and Octillery's draw-to-five effect.
- Sylveon ex's evolution Ability offers an optional two-card draw when it evolves, including prints with the “Once during your turn” prefix; players can decline it and still complete the evolution.
- Lycanroc-GX and Umbreon VMAX can use their optional evolution Ability to switch a chosen opposing Benched Pokémon into the Active Spot; the PvE opponent selects the first living Bench target.
- Celebi-EX, Shining Celebi, and Relicanth can grant evolved Pokémon attacks from their prior evolution stack. The grant is active only while the source Ability is present and unsuppressed, and the borrowed attack uses its normal Energy cost.
- Banette-GX can move one damage counter from a damaged Pokémon to another Pokémon once per turn while Active. The server validates both targets and resolves a resulting Knock Out through normal promotion while preserving the current turn.
- Munkidori's Adrena-Brain can move up to three counters from one of your damaged Pokémon to an opposing Pokémon once per turn. The engine approximates its attached-Darkness requirement through the shared Energy selector and pool; PvE opponents also use this Ability when it can create a Knock Out or improve their board.
- Passive Retreat Cost Abilities that require a matching Energy attachment use the side's selected shared Energy type and available Energy pool as an approximation. This covers self and board-wide free-retreat effects while the battle model does not track attachments per Pokémon.
- Glaceon-GX's Freezing Gaze suppresses opposing Pokémon-GX and Pokémon-EX Abilities while Glaceon-GX is Active. Freezing Gaze itself is exempt; hand and discard effects are outside this in-play battle model.
- Gholdengo ex's Coin Bonus draws one card once per turn, plus one more if Gholdengo ex is Active. Its player action and server validation share the Active check.
- Drakloak can choose one of the top two Pokémon cards for hand and put the other on the deck bottom; Charizard's top-three selection puts one into hand and discards the rest. The server limits choices to the looked-at top cards and moves the remaining cards to the printed destination without shuffling.
- Rotom V's once-per-turn Ability draws three cards and leaves the turn open in PvE and PvP. The PvE opponent can then attack or charge.
- Pidgeot ex's Quick Search selects one Pokémon card from the modeled deck into hand, shuffles, and shares its once-per-turn limit across Quick Search copies. PvE opponents can use it too; it does not consume the VSTAR Power allowance.
- Octillery's Rapid Strike Search selects a Rapid Strike Pokémon card from the modeled deck, reveals it, moves it to hand, and shuffles. Its once-per-turn limit is shared across copies, and PvE opponents can use it.
- Umbreon ex can force a damaged opposing Benched Pokémon into the Active Spot once per turn while Umbreon ex is Active. The same target rule and turn use are enforced for PvE and PvP, and the PvE opponent can use it.
- Oranguru's once-per-turn hand/deck swap lets the player choose a Pokémon from hand, exchange it with the top Pokémon of the modeled deck, and use the same effect in PvE and PvP. The PvE opponent chooses a low-cost hand Pokémon automatically. TCG Battle models Pokémon cards only in hand and deck.
- Mabosstiff and Pidgeot's once-per-turn Ability can switch the opponent's Active Pokémon to the Bench. The battle promotes the first living Benched Pokémon automatically; handing the replacement choice to the affected PvP player remains unsupported. The PvE opponent chooses a healthy replacement when using the Ability.
- Passive Abilities that remove a Pokémon's Retreat Cost while it has any Energy attached now use the shared Energy pool as an approximation: the condition passes when that side has at least one Energy. The engine still does not track Energy attachments per Pokémon.
- The inverse passive Retreat Cost condition is also supported: no Retreat Cost while the Pokémon has no Energy attached. It uses the side-wide pool and passes only at zero Energy; individual attachments remain unmodeled.
- Evolution cards with the printed permission to evolve during the first turn or the turn the target was played can now use the existing first-turn evolution rule.
- “If you go second, this Pokémon can evolve during your first turn” is supported for the second PvP participant and PvE opponent. The permission bypasses stage and card-cost evolution locks on turn one and is validated server-side.
- Once-per-turn healing Abilities may now combine an Active Spot requirement with healing a chosen friendly Pokémon, including Espeon ex's wording. The server verifies the Ability source is Active and applies the existing healing amount and once-per-turn rules.
- Iono's Bellibolt ex can repeatedly add one Lightning unit to the shared pool per use, targeting one of the player's Iono's Pokémon. Player and PvE actions require Lightning selected and room under the cap; hand Energy and individual attachments are not represented.
- Flapple's once-per-turn counter Ability places two counters on a chosen opposing Pokémon, then shuffles Flapple and its modeled evolution stack back into its deck. Player and PvE resolution compact the board and handle promotion; attached card types that the engine does not model are not returned as separate cards.
- Pichu's once-per-turn Power can evolve it into Pikachu through the evolution picker and remove all damage from Pichu. PvE can use this option as well. Evolution cards must be in hand, and evolving keeps the current turn open.
- Iron Valiant ex's once-per-turn switch-triggered damage-counter Ability is offered after that Pokémon moves from the Bench to the Active Spot through a recorded switch or retreat. The player can choose an opposing target; PvE opponents select a target automatically.
- Charizard ex's evolution Ability can be selected after evolving to search for up to three Basic Fire Energy. Since the engine has no Energy-card or attachment zones, it adds up to three units to the side-wide Energy pool when the selected pool type is Fire, respecting the format cap.
- Leafeon-GX's once-per-turn healing Ability requires Leafeon-GX to be Active and a side-wide Energy pool of at least one; the player chooses a damaged Pokémon and heals 50. The Energy-on-target clause is approximated by the shared pool.
- Knockout-triggered search Abilities that search for any card now put one random Pokémon from the modeled deck into the owner's hand when attack damage causes the Knock Out. The deck has no Trainer cards and the trigger does not yet offer a player-selected search.
- Eternatus VMAX expands its owner's Bench to eight when all of that side's Pokémon are Darkness type, and blocks non-Darkness Pokémon entering play through deck searches or revival while active. If the condition ends, excess Benched Pokémon are discarded until five remain.
- Eevee-GX's once-per-turn evolution Ability offers matching Eevee evolutions from the modeled deck and clears all damage before evolution. It is unavailable on turn one; the engine does not track the exact turn a Pokémon entered play, so the other timing restriction cannot be enforced.
- Galarian Moltres V's Direflame Wings adds one Darkness Energy unit to the shared pool once per turn, with the use limit shared across copies. This approximates the discard-pile attachment because the battle model does not track Energy cards or discard zones; the selected type must be Darkness and the pool must be below its cap.
- Teal Mask Ogerpon ex's once-per-turn Grass Energy attachment Ability adds one unit to the shared pool and draws one Pokémon card. Player and PvE actions use the selected Grass type and Energy cap; card-in-hand availability and per-Pokémon attachments are not represented.
- Koraidon ex's once-per-turn Ability adds up to two Fighting units from the modeled discard abstraction to the shared pool and leaves the turn open. It requires a Basic Fighting Pokémon in play; individual attachment targets and discard Energy cards are not tracked.
- Gardevoir ex's repeatable Psychic Energy acceleration adds one shared Energy and places two damage counters on a selected Psychic Pokémon per use. The server rejects a target that would be Knocked Out. The PvE opponent uses it once per turn on its healthiest eligible target; Energy-card availability and individual attachments remain outside the model.
- Hydreigon's Dark Trance can repeatedly add Darkness Energy to the shared pool without consuming the turn. The player selects Darkness, and PvE opponents use it up to the format's Energy cap. Hand Energy availability and individual attachments are not represented.
- Champion's Path Galarian Obstagoon's once-per-turn Wicked Ruler reduces the opponent's modeled Pokémon hand to four cards, moving the excess to discard. Player and PvE uses are supported; Trainer cards are not present in the modeled hand.
- Battle Styles Cherrim's repeatable Spring Bloom adds Grass Energy to the shared pool while any Pokémon without a Rule Box is in play. Player and PvE paths enforce Grass selection and the format Energy cap; Energy card availability and per-Pokémon attachments remain unmodeled.
- Battle Styles Meowstic's once-per-turn Ear Moves relocates one damage counter from a friendly Pokémon to an opponent's Pokémon, with player-selected targets and the existing PvE target resolver.
- Battle Styles Aegislash can once per turn switch with another Aegislash in hand. The outgoing card returns to hand while the replacement inherits damage, Special Conditions, effects, and the modeled Evolution stack.
- Burned Active Pokémon now take Checkup damage, then flip for recovery: heads removes Burn and tails keeps it. Battle Styles Centiskorch's Overheater prevents its opponent's Burned Pokémon from recovering on heads while Centiskorch's Ability is active.
- Flareon ex's once-per-turn Ability adds one Fire unit from the modeled discard abstraction to the shared Energy pool, then deals 20 damage to itself. The action is supported for player and PvE turns, including a self-Knockout that resolves through normal promotion flow.
- Frosmoth can repeatedly add one Water unit to the shared Energy pool by selecting a Benched Water Pokémon. Player and PvE actions validate the target, selected Energy type, Ability suppression, and format cap; individual attachments and hand Energy cards are not tracked.
- Baxcalibur can repeatedly add one Water unit to the shared Energy pool by selecting any friendly Pokémon. Player and PvE actions validate the selected type, target, Ability suppression, and format cap; individual attachments and hand Energy cards remain outside the battle model.
- Origin Forme Palkia VSTAR can use its once-per-game Power to add up to three Water units to the shared Energy pool, choosing a Water Pokémon and amount. It shares the side's existing VSTAR use limit; Energy cards in the discard and individual attachment destinations are not represented.
- Electrode-GX can add five units to the shared Energy pool for a chosen non-GX/EX Pokémon, then Knock itself Out. The player and PvE opponent require enough pool capacity, and normal board compaction and promotion settle the Knockout; individual Energy cards and attachments are not tracked.
- Darkrai-GX can return from the discard pile to an open Bench slot at full HP and add one Darkness unit to the shared Energy pool once per turn. Player and PvE actions validate the Ability, Darkness selection, pool cap, and Bench availability; discard Energy cards are not tracked.
- Emboar can repeatedly add Fire Energy units to the shared pool by choosing any friendly Pokémon. Player and PvE actions validate the selected Energy type and pool cap; individual Energy cards and attachment ownership are not modeled.
- Gardevoir-GX can attach one Fairy Energy unit to a chosen friendly Pokémon once per turn. The shared pool represents the attachment; the player and PvE opponent validate the selected type, pool cap, and per-source usage limit.
- Passive Abilities that add two damage counters when the opponent attaches Energy trigger from the opponent's modeled Energy charge in PvE and PvP. The Active Pokémon on the charging side receives the counters because individual Energy attachment targets are not tracked; resulting Knockouts use the normal promotion flow.
- Dragon Ampharos ex's Conductivity adds one damage counter on an opponent Energy attachment and does not stack across multiple Ampharos ex. The shared Energy charge triggers the Body, and the opponent's Active Pokémon is used as the attachment target approximation.
- Rising Rivals Leafeon and Crimson Invasion Miltank heal 20 and 90 damage, respectively, after an Energy card is attached from hand. Their Active-only Abilities trigger on the shared Charge action; healing targets the owner's Active Pokémon as an approximation because individual attachment targets are not modeled.
- Journey Together Magearna heals 90 damage after an Energy card is attached from hand while Magearna is Active. The shared Charge action triggers it, and healing is applied to the owner's Active Pokémon as the untracked attachment-target approximation.
- `bun run sync:tcg-sprites` fetches set logo/symbol source artwork into `source_data/tcg/set-artwork/` and composes generated pack/binder sprites from the base images in `source_data/tcg/sprite-bases/`.
- Booster pack use skips the old pack-opening animation and opens directly into the card drawer reveal; bulk pack opening skips the card-by-card reveal and starts on the summary.
# Volcanion-EX can spend one shared Fire Energy unit once per turn to boost Basic Fire attacks by 30 damage through that turn, before Weakness and Resistance. The shared Energy spend approximates discarding Fire Energy from hand; PvE opponents can use the effect.

Ancient Trait α Growth adds one bonus shared Energy unit to a charge when a matching-type α Growth Pokémon is in play. This approximates attaching two Energy cards to the holder; the battle does not track individual Energy cards or attachment ownership. PvE and PvP charge actions apply the bonus, subject to Ability suppression.

Shadow Rider Calyrex VMAX and Xatu can use their once-per-turn Abilities to add a shared Psychic Energy unit and draw up to two cards. Shadow Rider Calyrex VMAX needs a Benched Psychic Pokémon; Xatu needs any Benched Pokémon. The first eligible Benched Pokémon represents the attachment target, and PvE opponents use the same effects.

Darkrai ex's Nightmare Aura deals 20 damage to the opponent's Active Pokémon per Darkness unit gained when Darkrai ex is Active during the modeled Energy Zone charge. This uses the Active Pokémon as the attachment target approximation and resolves through normal Ability damage and knockout handling.

Active Pokémon with an Energy-triggered Special Condition recovery Ability clear all modeled conditions after their side charges Energy. The shared Energy model treats the charge as attached to the Active Pokémon and respects Ability suppression.

Pawmot can use its once-per-turn Ability to gain one shared Lightning Energy unit, modeling its Basic Lightning Energy search and attachment. It can use the Ability from either position; player and PvE opponent flows validate selected Energy, pool capacity, per-turn use, and Ability suppression.

Iono's Kilowattrel and Revavroom can discard one shared Energy unit to draw until their hand contains six cards. Kilowattrel requires Lightning selected; Revavroom accepts any Energy type. PvE and PvP use the same hand-size and cost checks.

Stakataka-GX reduces attack damage to its side's Ultra Beasts by 10 after Weakness and Resistance, while its Ability is active.

Fan Call searches up to three Colorless Pokémon with 100 HP or less on a side's first turn, and only one Fan Call can be used per turn across copies. The player chooses cards; PvE opponents automatically take up to three eligible cards. The audit covers 1,632 supported records and 2,922 unmatched records; activated search patterns cover 98 records across 34 sets.


Komala and Slaking become Asleep after an Energy Zone attachment while Active. The battle engine uses the Active Pokémon as the attachment target approximation and checks opposing Ability suppression.

Active Pokémon Abilities that add one Colorless Energy to the opponent's Active Pokémon attack costs also match printed text that explicitly says “1 {C} more.”

Abilities that make a Pokémon multiple types while it is in play add those types to its Weakness and Resistance calculations. The added types stop applying when the Ability is suppressed.

An Active Pokémon can use the supported Energy Zone Grass attachment Ability once per turn when a Grass Pokémon is in play. The effect adds one Grass unit to the shared Energy pool; per-Pokémon attachment targets are not tracked.
Giratina ex's Broken-Space Bellow adds one selected Psychic Energy from the Energy Zone to the shared Energy pool once per turn and ends the player's turn. This is also supported in NPC battles; Energy attached to an individual Pokémon is represented by the shared pool.
Gardevoir's Psy Shadow can add one selected Psychic Energy from the Energy Zone to the shared Energy pool once per turn when a Psychic Pokémon is Active. Its owner may use Gardevoir from the Bench or Active Spot.

Tapu Koko-GX's Aero Trail can switch it from the Bench to the Active Spot when played from hand if Lightning Energy is selected and available in the shared pool. The engine does not track per-Pokémon Energy attachments, so the stated transfer of Lightning Energy is represented only by its type and availability requirement; the Energy total does not change.

Palafin's Zero to Hero is available after Palafin retreats from the Active Spot to the Bench. It searches the deck for Palafin ex, replaces Palafin while preserving the in-play state supported by the swap system, returns Palafin to the deck, and shuffles. Palafin ex cannot be evolved from hand; it enters through this Ability. The engine's retreat path clears Special Conditions as part of retreat resolution before this Ability runs.

Manectric's Electric Start lets a player who goes second select Manectric from hand as an opening front-row Pokémon during setup. The setup picker currently models the Active/front-row option; putting it on the Bench during setup is not represented.

Weavile's Dark Cut can switch an opposing Benched Basic Pokémon into the Active Spot after Weavile retreats from the Bench into the Active Spot. The retreat event and Basic requirement are checked by the client and server.

Zeraora's end-of-first-turn Energy Zone Ability adds a Lightning unit from the shared pool for each eligible Zeraora in play. PvP charge actions also apply Energy-triggered Sleep from Komala and Slaking.

Jolteon ex deals 20 damage when the opponent attaches Energy from the Energy Zone while Jolteon ex is Active. This triggers for the regular charge and supported Energy Zone Abilities; the opponent's Active Pokémon stands in for the unspecified attachment target.


Naganadel & Guzzlord-GX can discard a Pokémon from hand once per turn to heal 60 damage from itself. PvE opponents choose a hand Pokémon automatically.

Froslass places one damage counter during Pokémon Checkup on each Pokémon with an Ability on either side, except Froslass. Its damage is recorded as Ability damage.

An Active Galarian Weezing suppresses opposing Pokémon's Abilities in play, except Neutralizing Gas. Suppression is applied through the shared Ability rules used for damage, status, and other Ability effects.

Primal Kyogre-EX, Primal Groudon-EX, and M Rayquaza-EX heal all damage from the evolved Pokémon when it becomes that form. The effect runs automatically through the player and PvE evolution actions, and respects Ability suppression.

Iron Thorns ex suppresses Abilities on Pokémon with Rule Boxes on both sides while Active, except for Future Pokémon. Flutter Mane suppresses the opposing Active Pokémon's Ability, except Midnight Fluttering. These effects use the shared Ability-suppression rule.

Passive text that prevents all effects of the opponent's attacks except damage now blocks supported attack effects while leaving damage intact.

Protection that covers both attacks and Abilities also blocks supported opposing Ability effects, while preserving damage.

Some Pokémon can copy other Pokémon's attacks through a passive Ability. TCG Battle now adds eligible attacks from the scopes printed on the card: your Bench, Basic Pokémon in your discard pile, Pokémon-GX/EX on your Bench or in your discard pile, or Pokémon in play on either side. The copied attacks use the existing battle effect and target selection handlers; Energy requirements use the shared Energy pool abstraction.

Arceus LV.X's Multi-type Poké-Body takes the type of its previous Level from the evolution stack. The existing battle type calculation then applies that type for its attacks and Weakness/Resistance resolution.

An Active Aerodactyl ex prevents the opponent from evolving their Active Pokémon. The AI excludes those options, and the server validates the restriction for player actions.

Wimpod has no Retreat Cost during its owner's first turn. The retreat-cost display and server action both use the current battle turn when evaluating this Ability.

Natural Cure/Water Veil clear all modeled Special Conditions, and Virizion's Earthen Awakening heals 20 damage, when Energy is attached from hand to their holder in play. The shared charge action represents the attachment because per-Pokémon Energy targets are not tracked. These effects run in PvE and PvP, including opponent turns, and respect Ability suppression.

The ability audit now counts the Black & White promo trio's bonus damage against Darkness Pokémon as supported by the existing type-filtered attack damage modifier.

Armarouge ex now takes 80 less damage from the opponent's attacks while at full HP, with the reduction applied after Weakness and Resistance as printed.

Metagross-GX can once per turn attach the selected Psychic or Metal Energy type from the modeled discard abstraction to the Active Pokémon. This adds one unit to the shared Energy pool in PvE and PvP. Individual Energy cards and per-Pokémon attachments are not represented.

Reactive retaliation Abilities now accept both “put” and “place” damage-counter wording for effects on the attacking Pokémon, including when the holder is Knocked Out.

Full-HP damage reduction supports both “attacks from your opponent's Pokémon” and “from your opponent's attacks” wording. The printed reduction is applied after Weakness and Resistance.

Greninja V-UNION's once-per-turn hand-reveal Ability is available from the battle action controls. On use, the battle log lists the Pokémon in the opposing modeled hand in PvE and PvP.

Knock Out retaliation now checks whether the holder had full HP immediately before attack damage, supporting Silver Tempest's conditional 8-counter retaliation Ability. It also resolves fixed damage and damage counters against the attacking Pokémon when a Knocked Out holder's Ability specifies that effect, including Active Spot requirements. Sigilyph-GX's retaliation counts damage received from Pokémon-GX and Pokémon-EX and still resolves when Sigilyph is Knocked Out.

Base Set Machamp's Strikes Back resolves its fixed retaliation damage even when Machamp is Knocked Out. The card catalog misspells “Knocked” as “Knoced” in that Ability text, and the knockout exception now accepts the stored spelling.

Lugia VSTAR's Summoning Star is available as a once-per-game Power. Players choose up to two Colorless Pokémon without a Rule Box from their discard pile for the Bench; the PvE opponent selects eligible cards automatically. The server enforces the VSTAR use limit and available Bench spaces.

Leafeon VSTAR's VSTAR Power lets the player select an opposing Benched Pokémon to bring into the Active Spot. The PvE opponent chooses an opposing target automatically. Both paths validate and consume the once-per-game VSTAR use.

Team Rocket's Crobat ex can put two damage counters on each of two selected opposing Pokémon when it evolves. Players select two distinct targets; the PvE opponent chooses two living targets automatically. Existing single-target evolution damage Abilities keep their one-target choice.

Fezandipiti's Adrena-Pheromones flips for attack damage prevention when Darkness is the selected Energy type and the side has at least one shared Energy. This is a documented side-wide approximation: the engine does not record individual Pokémon Energy attachments.

Okidogi's ability condition also checks the side-wide Darkness Energy selection and adds 100 attack damage for Okidogi's attacks against the Active Pokémon. Its maximum HP bonus is not modeled, and the Energy condition retains the same shared-pool approximation.

Persian-GX's Cat Walk is available after an opposing-turn Knock Out of a Pokémon-GX or Pokémon-EX. Players select up to two Pokémon from their modeled deck to put into hand; PvE opponents choose up to two automatically. Copies share the once-per-turn use limit.

Lucario can search for one Pokémon while Garchomp is in play. Each Lucario has its own once-per-turn use, and the PvE opponent uses the same prerequisite.

Sylveon V's Dream Gift can search one Pokémon from the modeled deck into hand and leaves the turn open. Its printed Item search is approximated because the battle deck contains Pokémon cards only; PvE opponents can still attack or charge afterward.

During battle, playing a Basic Pokémon from hand is free: it fills an open front slot first and can go to the Bench only after all three front slots are occupied. PvE opponents follow the same rule. Crobat V's Dark Asset can draw up to six when played, and Dedenne-GX's Dedechange can discard the hand and draw six. Both enforce their printed once-per-turn shared limits across copies on the same side.
Ribombee's Honey Gather can be used from the Bench once per turn to add up to two Energy to the shared pool. Since Energy cards are absent from deck and hand state, the Energy type follows the side's selected shared-pool type.
Evolving Skies Galarian Articuno, Galarian Zapdos, and Galarian Moltres can use their optional Bench-entry Abilities to add up to two Psychic, Fighting, or Darkness Energy, respectively, to the shared pool. Each trigger is limited to the Pokémon's same-turn play from hand and respects Ability suppression.
Delta Reign Nidoqueen's Maternal Call uses the shared once-per-turn opponent-switch flow. On heads, the player chooses the opposing Benched Pokémon; the NPC automatically selects the player's Benched Pokémon with the most remaining HP. The Ability respects suppression and the usual switch legality checks.

Nihilego-GX's bench-entry Ability can Confuse and Poison both Active Pokémon. The effect respects status protection and opponent Ability-effect protection on each side.

POP Series 5 Espeon ★ can use its optional Bench-entry Power to Confuse both Active Pokémon. This is player-triggered in PvE and available to either owner in PvP; the NPC opponent uses it automatically after playing Espeon ★ from hand. Status protection and opposing Ability-effect protection apply independently to both targets.

Baby Pokémon with a once-per-turn evolve-and-heal Power can evolve into their named Pokémon, including abilities offering multiple choices. The action uses the normal evolution state transition, removes all damage counters, and records the source Power's use for the turn.

Opponent hand Energy attachment retaliation reads the printed damage or damage-counter amount, supports older “his or her” wording, Plusle's non-stacking condition, and relevant Active Spot and Special Condition requirements. Resolution uses the battle's shared Energy event and applies damage to the opponent's Active Pokémon as an approximation because individual attachment targets are not stored. Special-Energy-only conditions remain unsupported.

When a supported Pokémon with a Bench-entry heal Ability is played from hand, its owner can heal the printed amount from their Active Pokémon. Effects that also recover from a Special Condition clear all of its conditions. PvE opponents use the Ability automatically when it would heal damage or remove a condition.

Sudden Shearing discards the top card of the opponent's Pokémon-only deck when played from hand onto the Bench. The discarded card moves into that opponent's discard pile; PvE opponents use the Ability automatically when the player's deck has cards remaining.

Hand-reveal Powers support the optional “before your attack” timing phrase and record a once-per-turn use. Player and PvP actions show the opponent's modeled hand in the battle log; the PvE opponent uses the Power and logs the player's modeled hand.

Pidgeot's Active-only shuffle Power can return a chosen Benched Pokémon to its owner's Pokémon deck, and Suicune-GX can return itself from the Bench. Modeled Evolution cards return with the Pokémon and the deck is shuffled. Tools and Energy attached to individual Pokémon are not represented in this battle mode, so they cannot be moved by these effects.

Once-per-turn Abilities can return their own card from the discard pile to the bottom of its owner's Pokémon deck. Plasma Blast's Exeggcute Propagation also returns itself from the discard pile to its owner's hand. Player and PvP sides can activate both effects, while the PvE opponent uses them automatically. Per-card use is retained for the turn after the card leaves the discard pile.

Malamar's once-per-turn Power can recover a Psychic Energy from the discard pile and attach it to a chosen Benched Pokémon. Because individual Energy cards and attachments are not represented, this adds one Psychic Energy to the side-wide pool, gated by the selected type and tracked per Malamar each turn. The PvE opponent uses it automatically. This supports three printings across Forbidden Light, Hidden Fates Shiny Vault, and SM Black Star Promos; the audit's activated search or Energy acceleration family now includes 126 records across 46 sets.

Snorlax's Active Spot Ability draws to seven cards and ends its owner's turn after use. The player action, PvP resolution, and automatic PvE use share the hand-size and turn-ending rules. This covers three printings across Vivid Voltage, Chilling Reign, and SWSH Black Star Promos.

Crobat's Active Spot Power lets the player choose a Pokémon in the modeled deck, shuffles the remaining deck, then places the chosen Pokémon on top. The PvE opponent resolves the search automatically. The Active requirement and per-turn usage are enforced for both player and PvP actions; the audit recognizes three records across Chaos Rising and MEP Black Star Promos.

Orbeetle VMAX can place one damage counter on every opposing Pokémon once per turn while Active. Player and PvP actions spread across the full opposing board; PvE uses the Ability automatically. This supports the Lost Origin Trainer Gallery and Vivid Voltage printings.

Gengar can return itself from the discard pile to the Bench once per turn, then take three damage counters. Bench legality, the use limit after revival, Knock Outs, and turn continuation are handled in both player/PvP actions and automatic PvE use. This covers Lost Origin, Lost Origin Trainer Gallery, and SWSH Black Star Promos.

Volcarona-GX can discard a Fire Energy once per turn to place two damage counters on a chosen opposing Pokémon. Since Energy cards in hand are not modeled, the cost spends one shared Fire Energy. Player/PvP target choice and automatic PvE resolution are supported for its Cosmic Eclipse printing.

Lunatone's Lunar Cycle checks for Solrock, spends one shared Fighting Energy as an approximation of the Basic Energy discard, and draws three cards. The name-wide once-per-turn limit is enforced across copies for player, PvP, and PvE use.

Delcatty's once-per-turn Power spends one shared Energy to approximate discarding an Energy card, then draws up to three cards. Its Special Condition restriction and per-card turn use are enforced for player/PvP and automated PvE actions.

Kricketune V's Exciting Stage is supported across its Battle Styles and Trainer Gallery prints. It draws until the player has three Pokémon cards in hand, or four if Kricketune V is Active, with one shared use per turn across all copies. PvE opponents use the same hand-size targets.

Lombre, Lampent, and Luxio can use their turn-start Ability when drawn: if the Bench has space, the drawn Pokémon goes directly onto the Bench instead of into hand. PvE and PvP use the same turn-start draw resolution.

Genesect V's Fusion System draws until its owner's hand matches the number of Fusion Strike Pokémon in play. The count is recalculated at use time, with per-card once-per-turn tracking and automatic PvE use when it increases the hand.

Comfey's Flower Selecting inspects the top two Pokémon cards when Comfey is Active, moves one selected card to hand, and puts the other in a distinct Lost Zone. PvE chooses the higher-HP card for hand; Lost Zone cards stay separate from the recoverable discard pile.

Evolution cards must be in hand, and evolving keeps the current turn open in PvE and PvP. Ability effects that say the turn ends also leave it open. Only attacking or charging advances the turn. Tyranitar-GX's Lost Zone effect now sends an opposing Pokémon Knocked Out by its attack damage, along with its modeled evolution stack, to the Lost Zone instead of the discard pile. Individual attached Energy cards are not modeled.

Brock's Primeape's Scram shuffles it and its modeled Evolution stack into its owner's deck when a damage event leaves it at exactly 10 HP. The Power is disabled by Asleep, Confused, Paralyzed, or Ability suppression and resolves through the shared PvE/PvP damage-event path. Individual attached Energy cards are not modeled.

Koga's Kakuna's Emerge flips once per turn; heads searches the Pokémon deck for Koga's Beedrill and evolves Kakuna directly into it. Normal Stage evolution timing, the printed Special Condition restriction, and Ability suppression apply. The action keeps the turn open in PvE and PvP, and NPC opponents resolve it automatically.

Neo Genesis Heracross's Final Blow raises Megahorn's base damage from 60 to 120 while Heracross has 20 HP or less. Asleep, Confused, Paralyzed, or Ability suppression disables the Power. The shared damage calculation applies the boost before Weakness and Resistance in PvE and PvP.

Neo Genesis Meganium's Herbal Scent flips when Meganium evolves from hand. Heads heals all living Grass Pokémon on both sides, subject to healing prevention. The effect is recorded and resolves in PvE and PvP, including NPC evolution.

Neo Genesis Feraligatr's Berserk flips when Feraligatr evolves from hand. Heads discards up to five cards from the opponent's deck; tails discards up to five from its owner's deck. This uses the modeled Pokémon-only decks and works in PvE and PvP.

Neo Genesis Typhlosion's Fire Boost flips when played from hand; heads adds up to four Fire Energy to the shared pool, while tails adds none. Energy is capped, Ability suppression applies, and the deck is shuffled after the search. Individual Energy cards and attachments are represented by the shared-pool approximation.

Neo Discovery Unown [D], [M], and [N] reduce matching Darkness, Metal, or Colorless attacker damage by 30 after Weakness and Resistance. Their Power works while affected by Special Conditions and turns off if more than one copy of the corresponding Unown is in play.

Neo Discovery Politoed's Frog Song adds 40 damage after Weakness and Resistance when more than three Poliwag, Poliwhirl, Poliwrath, or Politoed are in play across both sides. Unown [A]'s Anger adds 10 damage per damage counter on Unown [A] to any Unown's Hidden Power; if there are multiple Unown [A], the engine uses the largest single-copy bonus.

Neo Revelation Shuckle's Hard Shell changes attack damage of 40 or less after Weakness and Resistance to 10, even for the owner's attacks. It leaves other attack effects intact and is disabled while Shuckle is Asleep, Confused, or Paralyzed.

Neo Revelation Blissey's Softboiled is optional on evolution from hand. It flips a coin to heal up to 80 damage on heads or 40 on tails, limited by Blissey's current damage; healing prevention and Ability suppression apply. Player and NPC evolution paths resolve the effect.

Neo Revelation Celebi's Time Travel flips when an opponent's attack would Knock it Out. Heads shuffles Celebi and its modeled Evolution stack into its owner's deck instead of counting it as a Knockout. Asleep, Confused, Paralyzed, and Ability suppression disable it; individual Energy attachments are not represented.

Neo Revelation Unown [B]'s [Bear] moves one damage counter from one of its owner's damaged Pokémon with Unown in its name to Unown [B]. It is once per turn, works through Special Conditions, and cannot be used when Unown [B] has 10 HP left.

Neo Revelation Suicune's Crystal Body blocks effects from opposing attacks but leaves damage intact. It is disabled while Suicune is Asleep, Confused, or Paralyzed.

Neo Revelation Aerodactyl's Prehistoric Memory grants evolved Pokémon access to attacks in their own Evolution stacks, including opposing Pokémon. Printed Energy costs remain in force, and the Ability stops while Aerodactyl is Asleep, Confused, or Paralyzed.

Neo Revelation Lanturn's Submerge changes Lanturn's type to Water for the turn. Becoming Asleep, Confused, or Paralyzed after using Submerge immediately restores its Lightning type; the Power cannot be activated while affected by those conditions.
HS—Unleashed Lanturn's type-change Power also resolves through Submerge: it becomes Water type until the end of the turn and cannot be used while affected by any Special Condition.

Neo Destiny Dark Crobat's Surprise Bite can target one opposing Pokémon for 20 Ability damage when Dark Crobat is played from hand to evolve. Weakness and Resistance do not apply; player, PvP, and NPC evolution flows resolve the selected or automatically chosen target.

Neo Destiny Unown [Z]'s Zoom makes retreat free for Pokémon with Unown in their name while Unown [Z] is on its owner's Bench. The normal retreat action uses this passive cost override, including NPC retreat decisions.

Neo Destiny Dark Magcargo's Hot Plate deals 10 damage without Weakness or Resistance when either player puts a Baby or Basic Pokémon from hand onto the Bench. Its Active-Spot and Special Condition requirements are checked for both sides, and knockout damage uses the regular event and discard flow.

Neo Destiny Dark Feraligatr's Scare disables opposing Baby Pokémon Powers and prevents opposing Baby Pokémon from attacking while Dark Feraligatr is Active. Asleep, Confused, and Paralyzed Dark Feraligatr does not apply Scare; the attack selector and Ability suppression checks both enforce the restriction.

Neo Destiny Light Machamp's Tag Team triggers when it evolves on the Bench: it heals up to 30 damage from its owner's Active Pokémon, then switches into the Active Spot. Healing prevention blocks only the healing portion; Ability suppression disables the Power.

Team Rocket Dark Slowbro's Reel In activates when evolved from hand. In PvE and PvP, the player may choose up to three Basic or Evolution Pokémon from their discard pile to return to hand; the server validates distinct discard targets and the printed limit. This uses the Pokémon-only discard and hand model.

Dark Dragonair's Evolutionary Light searches the Pokémon-only deck for one Evolution card and puts it into hand. It can be used once per turn while Dark Dragonair is free of Asleep, Confused, and Paralyzed; the PvE opponent selects a matching card automatically.

Dark Kadabra's Matter Exchange discards one selected card from hand and draws one card. It is once per turn, blocked by Asleep, Confused, or Paralyzed, and the PvE opponent discards its lowest-cost Pokémon card when the effect is available.

Dark Muk's Sticky Goo adds two to the opponent's Active retreat cost while Dark Muk is Active. It stops while Dark Muk is Asleep, Confused, or Paralyzed and respects Ability suppression; the shared retreat validation applies the surcharge to player and NPC retreats.

Dark Gloom's Pollen Stench can be used from the Bench or front line once per turn. A recorded coin flip Confuses the opposing Active Pokémon on heads or your Active Pokémon on tails; the effect cannot be used while Dark Gloom is Asleep, Confused, or Paralyzed.

Drowzee's Long Distance Hypnosis uses the same recorded coin/status flow to make the opposing Active Pokémon Asleep on heads or your Active Pokémon Asleep on tails. Drowzee cannot use it while Asleep, Confused, or Paralyzed.

Iron Bundle can use its once-per-turn Bench Ability to force an opposing Active switch, then discard itself. The replacement selection follows the engine's deterministic forced-switch behavior, and attached cards are not modeled.

Rillaboom's once-per-turn search for up to two Grass Energy adds up to two Grass units to the shared pool, constrained by the selected Energy type and pool cap. This is available in PvE and PvP; the PvE opponent uses the same acceleration when it has room.

Forretress ex can add up to five Grass Energy units to the shared pool once per turn, then Knocks itself Out. The engine applies the pool cap and resolves board compaction, victory, and promotion in PvE and PvP. This Ability does not consume the turn.

Hydrapple ex's once-per-turn Ability adds one Grass unit to the shared pool and heals 30 damage from a chosen damaged Pokémon. Player and PvP actions enforce the Grass selection, Energy cap, healing target, and per-turn use; the PvE opponent uses it on its most damaged Pokémon.

Houndoom's Single Strike Energy Ability adds one selected Darkness or Fighting unit to the shared pool, then places two damage counters on a chosen Single Strike Pokémon. The use limit, KO, board compaction, and promotion are enforced in PvE and PvP; the PvE opponent chooses a legal target and avoids knocking out its last Pokémon.

Aegislash's Durable Blade, Reuniclus's Persistent Cells, and Gengar's Infinite Shadow return the Pokémon card to its owner's hand when attack damage Knocks it Out. Its modeled evolution stack goes to the discard pile, matching the printed instruction to discard attached cards. The replacement applies to Active or Benched Pokémon in PvE and PvP; Knockouts from non-attack damage do not trigger it.

Energy-triggered self-healing now reads the printed healing amount and any named Energy-type restriction for supported “when/whenever you attach Energy from your hand” Abilities. It resolves on the modeled Energy charge, which represents an attachment to the Ability holder; the shared Energy pool does not track individual attachment targets. Healing prevention still applies.

Roserade's Energy Signal and Vileplume's Energy Reaction can apply their printed Confused, Poisoned, or Asleep condition to the opposing Active Pokémon after a matching Grass or Psychic Energy charge. They respect their once-per-turn use and the holder's Special Condition restriction; the target can still block the condition through its Ability.

Fossil Aerodactyl's Prehistoric Power prevents all evolution while Aerodactyl is in play. It stops applying while Aerodactyl is Asleep, Confused, or Paralyzed, or when its Ability is suppressed. Evolution option generation and server-side evolution validation share this rule in PvE and PvP.

Fossil Muk's Toxic Gas suppresses Poké-Powers on both sides while Muk is unaffected and its Ability is active; Toxic Gas itself remains active. Poké-Bodies and modern Ability cards are not treated as Poké-Powers. The current card-level suppression model leaves mixed Poké-Power/Poké-Body cards unaffected until it can suppress one Ability on a card without suppressing the other.

Jungle Vileplume's Heal Power now flips a coin when the player selects a damaged Pokémon; heads removes one damage counter and tails heals nothing. The once-per-turn use is spent on either result, and the PvE opponent selects its most damaged Pokémon. Coin outcomes are recorded for both PvE and PvP. Legacy suppression recognizes the catalog's “Pokémon Power” type label as well as “Poké-Power.”

Team Rocket Dark Primeape's Frenzy adds 30 to the self-damage when its Confusion check fails. The shared attack resolver applies the bonus in PvE and PvP only while the unsuppressed Primeape remains Confused.

Team Rocket Dark Dugtrio's Sinkhole triggers when an opposing Active Pokémon retreats. Each eligible Dark Dugtrio flips a coin; tails deals 20 direct Ability damage to the retreating Pokémon after it moves to the Bench, without applying Weakness or Resistance. Asleep, Confused, or Paralyzed Dark Dugtrio cannot trigger it, and Ability suppression is respected in PvE and PvP.

Team Rocket Dark Golbat's Sneak Attack can be used when Dark Golbat evolves from hand. The player may select an opposing Pokémon to take 10 damage, applying Weakness and Resistance, or evolve without using the Ability. PvE chooses the opponent's most damaged Pokémon.

Team Rocket Dark Dragonite's Summon Minions searches for up to two Basic Pokémon and puts them onto the Bench when Dark Dragonite evolves from hand. The player selects the cards; PvE selects eligible Basics automatically. The search obeys the three-front-slot-before-Bench rule and remaining legal Bench capacity, then shuffles the deck.

Alakazam's Damage Swap can move one damage counter between two of its owner's Pokémon repeatedly during the turn, as long as the move does not Knock Out the receiving Pokémon. Alakazam must be free of Special Conditions, and Ability suppression is respected. PvE uses it when it can move a counter without causing a Knock Out.

Giovanni's Machamp's Fortitude flips a coin when an opponent's attack would Knock it Out. Heads leaves Machamp at 10 HP; Asleep, Confused, or Paralyzed Machamp cannot use the Power. The existing damage protection and Knockout flow resolve the flip in PvE and PvP.

Erika's Vileplume's Pollen Defense flips when an attack damages it in the Active Spot. Heads Confuses the opposing Active Pokémon. It works even while Vileplume has a Special Condition or is Knocked Out, while Ability suppression still applies.

Misty's Cloyster reduces attack damage to itself by 10 after Weakness and Resistance. Its Special Condition restriction and Ability suppression are applied during damage calculation.

Rocket's Snorlax's Restless Sleep deals 20 damage to the attacking Pokémon when an opponent's attack damages Snorlax while it is already Asleep. It can trigger even if Snorlax is Knocked Out, and Ability suppression is respected.
# Ability search support

Activated deck search now recognizes Shiinotic’s Grass Pokémon search text. The player selects a Grass-subtype Pokémon from the deck; the battle action validates the selection and shuffles the remaining deck after adding the card to hand.

Ultra Conversion uses the discard-and-draw action with a server-validated Ultra Beast subtype cost. It draws three cards and shares the normal once-per-turn Ability-use tracking.

Charizard’s once-per-turn Fire Energy Power checks that it can survive the two damage counters, removes up to two Fire Energy cards from its deck, shuffles, and adds the same number to shared Energy. PvE resolves the same HP, deck, and Energy-cap constraints.

Evolution-triggered draw recognizes Alakazam’s “you may use this Ability” phrasing and draws three cards through the existing evolution resolution flow.

Mew’s Mysterious Tail and Tatsugiri’s Attract Customers share a top-six search flow with Item and Supporter subtype filters, Active Spot checks, once-per-turn tracking, and deck shuffling after resolution.

Crabominable and Veluza count Kofu cards in their owner’s discard pile to reduce their attacks’ Colorless costs, capped by the attack’s printed Colorless cost.

Erika's Victreebel's Fragrance Trap can be used once per turn from the front line or Bench. It flips a coin; on heads, the player chooses an opposing Benched Pokémon to switch into the Active Spot. Asleep, Confused, or Paralyzed Victreebel cannot use it. PvE opponents use the Power automatically.

Blaine's Vulpix can heal 10 damage from itself once per turn. The Power is blocked while Vulpix is Asleep, Confused, or Paralyzed and is available to players and PvP opponents; the PvE opponent uses it automatically when damaged.

Erika's Dratini's Strange Barrier caps damage from Basic Pokémon at 10 when the post-Weakness-and-Resistance hit is at least 20. It applies to both players' Basic attackers and stops working while Dratini is Asleep, Confused, or Paralyzed.

Rocket's Moltres returns to its owner's hand after a Knockout caused by an attack if it is not Asleep, Confused, or Paralyzed. Its evolution stack is discarded, and Ability suppression is respected.

Misty's Tentacruel's Flee triggers after it takes attack damage in the Active Spot. It switches to the living Benched Pokémon with the most HP and prevents the attack's remaining effects on Tentacruel. The Power is blocked while Tentacruel is Asleep, Confused, or Paralyzed and respects Ability suppression.

Brock's Rhydon's Bench Guard redirects 10 attack damage from a Benched Pokémon to a living Brock's Rhydon on the Bench. It can redirect damage for each separate Benched target hit; the first eligible Rhydon is selected automatically.

Misty's Gyarados's Rebellion flips two coins on an attack attempt. Two tails cancels the attack and shuffles Gyarados and its modeled evolution stack into its owner's deck, including when Gyarados is Confused. Individual Energy attachments are not represented.

Blaine's Ninetales's Healing Fire heals 10 damage for each Fire Energy unit represented by a charge. It can trigger from the Bench, respects its Asleep, Confused, and Paralyzed restriction, and follows the shared-Energy approximation.

Erika's Ivysaur's Relaxing Scent halves damage from any attack to any Pokémon after Weakness and Resistance, rounding up to the nearest 10. It works while Ivysaur is Active, including for the owner's own attacks, and is disabled by Asleep, Confused, Paralyzed, or Ability suppression.

Sabrina's Alakazam's Psylink adds attacks from its owner's living Psychic Pokémon in play to Alakazam's attack options. The copied attacks retain their printed costs and supported extra costs. Asleep, Confused, Paralyzed, and Ability suppression disable Psylink.

Lt. Surge's Electrode's Shock Blast flips a coin when attack damage hits it in the Active Spot. On tails, it deals 20 Ability damage to every surviving Active Pokémon, including its owner. It can trigger while Electrode is Knocked Out or affected by a Special Condition; Ability suppression still applies.

Blissey's Busybody Nurse (McDonald's Collection 2023) can be used once per turn to clear all Special Conditions from its owner's Active Pokémon. The player selects the target, and the NPC opponent chooses the Active Pokémon with the most conditions.

Jungle Mankey's Peek can inspect the top card of either Pokémon deck or a random card in the opponent's Pokémon hand once per turn. The inspected card is private to the user; Prize cards are not represented by the engine.

Fossil Gengar's Curse transfers one damage counter from an opposing Pokémon to another opposing Pokémon once per turn. The move may Knock Out its recipient; Gengar must be free of Asleep, Confused, or Paralyzed, and Ability suppression applies.
Fossil Haunter's Transparency flips whenever an attack affects Haunter. Heads prevents the attack's damage and effects; Asleep or opposing Ability suppression disables Transparency.
Fossil and Legendary Collection Omanyte Clairvoyance reveal the opponent's complete Pokémon hand while Omanyte is in play. PvP includes the hand only in Omanyte owner's private perspective; PvE renders the opponent's modeled hand. Fossil blocks while Asleep, Confused, or Paralyzed; Legendary Collection blocks for any Special Condition. Both are disabled by Ability suppression.
Fossil Slowbro's Strange Behavior recognizes the set's printed Asleep/Confused/Paralyzed restriction and can repeatedly move one damage counter from a friendly Pokémon to Slowbro, provided the transfer does not Knock it Out.
Fossil Tentacool's Cowardice can return Tentacool from the field to its owner's hand during their turn, except on the turn it entered play or while it is Asleep, Confused, or Paralyzed. Returning an Active Tentacool opens the front slot and prompts a promotion from the Bench when one is available; attached Energy is not tracked individually in this battle mode. The PvE opponent uses Cowardice to rescue a damaged Tentacool when another Pokémon or a Basic in hand can keep its field occupied.
Fossil Ditto's Transform copies the opposing Active Pokémon's attacks and modeled battle stats while Ditto is Active and free of Asleep, Confused, and Paralyzed. Its copied HP preserves existing damage counters and can cause a Knock Out when the copied maximum is lower; Ditto's own Ability remains, and it cannot evolve. Attached Energy types are not individually modeled.
Jungle Mr. Mime's Invisible Wall prevents attack damage of 30 or more after Weakness and Resistance, including damage from its owner's attacks; other attack effects still resolve. Asleep, Confused, Paralyzed, or Ability suppression disables it.
Base Set 2 Alakazam's Damage Swap can repeatedly move one damage counter between two friendly Pokémon without Knocking Out the recipient. It is unavailable while Alakazam is Asleep, Confused, or Paralyzed, and is blocked by Ability suppression.
Base Set 2 Blastoise's Rain Dance can add one shared Water Energy for each activation, once per chosen friendly Water Pokémon. This represents attaching Water Energy without spending the turn's charge; the engine does not track individual Energy attachments. Asleep, Confused, Paralyzed, or Ability suppression disables Rain Dance.
Base Set and Base Set 2 Electrode's Buzzap can Knock Out Electrode to add two units of the selected Energy type to the shared pool, representing the attached Energy card. It targets another friendly Pokémon, is available from the Bench or front row, and is disabled by Asleep, Confused, Paralyzed, or Ability suppression. The matcher accepts both catalog wordings.

Eevee ex's passive evolution Ability is available through the hand evolution flow. Prismatic Evolutions requires an ex Pokémon that evolves from Eevee; Eevee Grove permits any Pokémon that evolves from Eevee. Both require Eevee ex to have been in play before the current turn and cannot be used during turn one.
Team Rocket Dark Gyarados's Final Beam flips when it is Knocked Out by attack damage. Heads deals 20 damage per remaining shared Water Energy to the attacker, applying Weakness and Resistance; the count approximates Water Energy attached to Dark Gyarados because individual attachments are not tracked. Asleep, Confused, Paralyzed, or Ability suppression disables the effect.

Team Rocket Returns Dark Gyarados's Dark Scale puts 30 damage on the attacking Pokémon when Active Dark Gyarados is Knocked Out by an opponent's attack. This fixed damage reaction respects Ability suppression.

Expedition Base Set Golem's Rock Body and Metapod's Exoskeleton reduce attack damage to their holder by 10 and 20 after Weakness and Resistance. These passive Pokémon Powers use the shared damage modifier in PvE and PvP.

Expedition Base Set Vileplume's Poison Pollen can be used once per turn from the Bench or Active Spot. It flips a coin and Poisons the opposing Active Pokémon on heads; tails has no effect. It cannot be used while Vileplume has a Special Condition.

Expedition Base Set Butterfree's Miraculous Powder removes all Special Conditions from its owner's Active Pokémon once per turn. Butterfree can use it from either front or back row and cannot use it while affected by a Special Condition.

Expedition Base Set Meganium's Soothing Aroma flips once per turn; heads heals 10 damage from every damaged friendly Pokémon, while tails heals nothing. Meganium cannot use the Power while affected by a Special Condition.

Expedition Base Set Machamp's Terraforming lets the player inspect and reorder up to the top four cards of their deck once per turn. It cannot be used while Machamp has a Special Condition. The action validates the submitted ordering against the current deck top in PvE and PvP.

Expedition Base Set Dragonite's Tailwind makes a retreat by the Active Pokémon free once per turn while Dragonite is on the Bench. The retreat action consumes the Power only after the retreat succeeds, and the retreat cost display reflects the available use.
Neo Discovery Unown [U]'s Undo is available once per turn with Unown U, N, D, and O on the Bench. It returns a chosen friendly Active Pokémon and its evolution stack to hand, then requires a Bench promotion; individual attached Energy is not tracked. PvE opponents use Undo to rescue their lowest-HP Active Pokémon.

Secret Wonders Gardevoir LV.X's Teleportation is supported as a once-per-turn Ability: choose a friendly Pokémon in the opposite Active/Bench row and switch it with Gardevoir. Any Special Condition on Gardevoir blocks it.

Shining Fates Manaphy's Ocean Search uses the existing top-of-deck Ability selection: while Active, choose one Pokémon from the top six to add to hand, then shuffle the remaining cards back.

Shining Fates Shiny Vault Appletun's Delicious Aroma selects only opposing Benched Basic Pokémon; heads switches the chosen Pokémon into the Active Spot and tails leaves the board unchanged. It uses the shared coin-flip switching action in player and PvP battles.

Shining Fates Shiny Vault Dracovish's Primal Law prevents an opponent from evolving any Pokémon while Dracovish is Active. Evolution options and server validation share this restriction, including suppression checks.

Skyridge Kabutops's Ancient Power prevents either player from evolving Benched Pokémon while Kabutops is Active. Active Pokémon can still evolve, and Ability suppression disables the restriction.

Skyridge Beedrill applies Paralysis and Poison together to the opposing Active Pokémon when it evolves. Evolution status effects can now carry multiple conditions through the normal status protection rules.

Lost Origin Parasect's Lethargy Spores can apply Asleep and Poisoned to both Active Pokémon on evolution. The same multi-condition evolution flow also covers Haunter's both-Active Confusion effect.

Zacian LV.X and Tyrantrum-EX ignore effects on the opponent's Active Pokémon when calculating their attack damage. The bypass applies only when attacking the opponent's Active Pokémon; Weakness and Resistance still apply.

Crown Zenith Hatterene VMAX can move up to two damage counters from a friendly Pokémon to the opponent's Active Pokémon once per turn. Existing counter-movement protections and Ability suppression apply.

HS—Triumphant Gengar and 30th Celebration Gengar send opposing Pokémon Knocked Out by attacks to the Lost Zone while Gengar is Active. This uses the existing Lost Zone replacement and respects Ability suppression.

Shining Fates Shiny Vault Polteageist's Tea Break reuses the discard-and-draw Ability action. The server requires the selected hand Pokémon to have the Mad Party attack, then draws up to two cards from the remaining deck.

Shining Fates Shiny Vault Galarian Zigzagoon's Headbutt Tantrum is available on the turn it enters the Bench. The player chooses any opposing Pokémon for one damage counter; server validation resolves the target, Knock Outs, and required promotions.

Hawlucha's Bench-entry Ability lets its owner choose two distinct opposing Benched Pokémon and place one damage counter on each. The player chooses both targets, while the PvE opponent chooses two eligible targets automatically. Server validation resolves Knock Outs and required promotions.

Great Tusk ex's Quaking Demolition discards up to the top five cards of its owner's deck at the end of the turn when it is Active. The effect resolves for player and PvE turns, and in PvP, after any additional attack has completed.

Black Bolt Alomomola's Gentle Fin lets an Active Alomomola put one Basic Pokémon with 70 HP or less from its discard pile onto the Bench. The shared draw/search Ability action validates the chosen card and Bench capacity in PvP and standard battles; the PvE opponent selects an eligible target automatically.

XY Black Star Promos Absol's Lamentation discards a random card from the opponent's hand after attack damage to Active Absol, including damage that Knocks it Out. It resolves through the shared reactive Ability handler.

SWSH Black Star Promos Polteageist's Teapot of Surprises reveals a random card from the opponent's hand and puts it on the bottom of their deck after attack damage to Active Polteageist, including a Knock Out.

Dragon Vault Rayquaza's Commotion places two damage counters on each of its owner's Benched Pokémon when Active Rayquaza takes attack damage, including damage that Knocks it Out. Any resulting Knock Outs are handled during normal board cleanup.

Rebel Clash Toxtricity V's Counterattack Kerzap flips three coins when damaged by an opponent's attack while Active, even if Knocked Out, and puts three damage counters on the attacker for each heads.

Black & White and Dragons Exalted Reuniclus's Damage Swap can repeatedly move one damage counter from one of its owner's Pokémon to another, using the shared counter-move action.

Shining Fates Shiny Vault Galarian Meowth's Evolution Roar combines hand discard with a named deck search. The player selects two cards to discard and the server only accepts Galarian Perrserker as the search target, then shuffles the remaining deck.

Shining Fates Shiny Vault Hatterene's Mind Hat uses the discard-and-draw action controls to select a card from the player's hand, then randomly discards one card from the opponent's hand. Both cards go to their owners' discard piles; the Ability needs no deck cards and is limited once per turn.

Shining Fates Shiny Vault Galarian Cursola's Perish Body flips when it is Knocked Out by attack damage in the Active Spot. Heads Knocks Out the attacking Pokémon through the shared reactive-Ability path; Ability suppression applies.

Shining Fates Shiny Vault Grimmsnarl's Dark Oath adds one Colorless to the opponent Active Pokémon's attack costs while Grimmsnarl is Active. The shared cost calculation enforces this for player attacks, PvE choices, and PvP validation.

Shining Fates Shiny Vault Galarian Stunfisk's Snap Trap removes one Energy from the attacking side's shared pool when Active Stunfisk takes attack damage, even if Stunfisk is Knocked Out. This approximates discarding an attached Energy because individual attachments are not tracked.

TCG healing prevention also covers Next Destinies Bronzong's Heal Block and HeartGold & SoulSilver Triumphant Solrock's Lunatone-gated Heal Block. Their passive rules block the shared healing path, including activated and triggered healing.

The shared retreat-cost resolver now applies the all-player cost increases from Ariados and Team Aqua's Muk, respecting each Ability's printed Pokémon exception.

Deoxys Tropius removes Resistance from opposing Pokémon while Active, and the attack damage resolver applies that rule to the opponent's target.

Legacy Poké-Power suppression now handles Muk's Stench on both sides, Glaceon LV.X's Active-only opponent lock, and Muk ex's Toxic Gas lock on both Powers and Bodies while preserving the Toxic Gas exception. Muk's alternate Toxic Gas Special Condition wording also works.

Chaos Rising Patrat's Lockdown prevents damage counters from moving between Pokémon. The player selector, server action, and PvE counter-moving Abilities all honor the lock.

Hidden Legends Dodrio's Fast Feet allows Dodrio to retreat while Asleep or Paralyzed. The shared retreat eligibility check blocks those conditions on other Pokémon and allows Fast Feet to override them.

Generations and Furious Fists Jynx's Victory Kiss is available once per turn while Jynx is on the Bench and heals 10 damage from its owner's Active Pokémon. It uses the shared healing resolver.

Legend Maker Lunatone and Solrock suppress legacy Poké-Powers on both sides when paired: Lunatone locks non-ex Fire Pokémon, and Solrock locks non-ex Colorless Pokémon. Poké-Bodies remain active.

Legends Awakened Unown U protects its owner's Benched Unown from attack damage and effects while Unown U is on the Bench. The same protection is checked by damage and attack-effect resolution.

Aquapolis Gloom's Enervating Pollen changes Resistance on each Active Pokémon to a 10 damage reduction while Gloom is in play. Benched targets are unaffected.

Burning Shadows Lunatone's Heal Block prevents healing for either player while Solrock is in play. The shared healing resolver applies the restriction to activated and triggered healing.

Forbidden Light Mesprit's Silent Waves removes Resistance from opposing Pokémon when its owner has Azelf in play.

Sandstorm Volbeat's free Retreat Cost requires Illumise in play, and Deoxys Lunatone grants free retreat to each Solrock. The shared retreat resolver checks these named partner and target conditions.

Black Bolt Meloetta ex's first-turn attack permission is covered by the custom engine's attack timing, which allows attacks during a player's first turn.

The generated ability audit reports blank source-text placeholders separately from unmatched ability text. Fossil Trainer cards with Poké-Bodies remain outside the Pokémon-only deck format. Neo Destiny's Light Piloswine Fluffy Wool retaliation and Unown [P] Perform damage bonus now resolve through shared PvE/PvP attack processing.

Aquapolis Ariados's Gluey Slime adds one Colorless to either player's Active Pokémon retreat cost while Ariados is in play. The increase is capped at one even when multiple Ariados are present and respects Ability suppression.

Skyridge Umbreon's Dark Gaze suppresses Benched cards whose abilities consist only of legacy Poké-Powers on both sides while Umbreon is Active. Poké-Bodies and modern Abilities remain available. The card-level suppression model cannot selectively disable a Poké-Power when the card also has other ability types.

Ruby & Sapphire Cascoon and Silcoon’s Hard Cocoon each flip a coin against incoming opponent attacks; heads reduces damage by 30 after Weakness and Resistance.

Sandstorm Illumise’s Glowing Screen reduces damage to Illumise by 30 after Weakness and Resistance when Volbeat is in play and the attacker is Fighting or Darkness type. Duplicate Volbeat do not increase the reduction.

Dragon Flygon’s Sand Guard flips once for each incoming opponent attack; heads reduces damage by 20 after Weakness and Resistance.

Team Magma vs Team Aqua’s Groudon and Kyogre Power Saver prevent the holder from attacking while three or fewer Pokémon with the matching team name are in play across both sides.

FireRed & LeafGreen Mr. Mime ex’s Magic Odds and Magic Evens prevent attack damage when the post-Weakness/Resistance amount matches their listed odd or even values.

Deoxys Vigoroth’s Vigorous Aura adds 10 damage before Weakness and Resistance to attacks from either side’s Active Pokémon when the target is Active. The effect respects Ability suppression and opposing Ability effect protection.

Emerald Medicham ex’s Wise Aura suppresses legacy Poké-Powers on non-ex Pokémon on both sides while Medicham ex is Active. Feebas and Swablu’s damage prevention is limited to their printed Bench position, rather than also applying while Active.

Secret Wonders Hoppip's Cottonweed grants free retreat while Grass Energy is selected in the shared Energy pool; this approximates its printed attached-Grass-Energy requirement.

Great Encounters Magcargo's Magma Armor prevents only Asleep and Paralyzed conditions, using the shared status-immunity check.

Great Encounters Milotic's Marvel Scale prevents opposing Pokémon LV.X attacks from affecting it, including attack damage.

Majestic Dawn Umbreon's Moonlight Veil removes Weakness and Retreat Cost from the owner's Eevee evolutions while Umbreon is in play; suppression disables the effect.

Legends Awakened Torkoal blocks opposing attack damage and effects from reaching its owner's Bench while Torkoal is Active, respecting Ability suppression.

Stormfront Abomasnow's Snow Veil reduces opposing attack damage to the owner's Pokémon by 20 after Weakness and Resistance while Abomasnow is Active; suppression disables it.

Platinum Manectric prevents attack damage to its owner's Bench, except to Manectric itself. Ability suppression disables the protection.

Supreme Victors Milotic prevents damage from opposing Pokémon's attacks while its owner's hand is empty; suppression disables the effect.

Supreme Victors Magmortar's Evolutionary Flame may Burn and Confuse the opponent's Active Pokémon when Magmortar evolves from hand. Ivysaur's Evolutionary Pollen may make that Pokémon Asleep when Ivysaur evolves. The player can use or decline either evolution Power; the PvE opponent resolves it automatically, and status immunity and Ability suppression apply.

Supreme Victors Mr. Mime's Focus Wall keeps it at 10 HP when an attack would Knock it Out with at least 70 damage after Weakness and Resistance. Ability suppression disables Focus Wall.

Supreme Victors Exploud's Erasing Sound removes Weakness from all of its owner's Pokémon in play. Ability suppression disables the effect.
Supreme Victors Masquerain's Intimidating Pattern reduces damage from opposing attacks to all of its owner's Pokémon by 20 before Weakness and Resistance while Masquerain is Active. Ability suppression disables the reduction.
Supreme Victors Dewgong's Thick Fat reduces damage from Fire- and Water-type attackers by 30 after Weakness and Resistance. Swampert's Root Protector reduces damage to Swampert by 20 after Weakness and Resistance when the opposing attacker is Basic. Ability suppression disables both effects.
Butterfree FB's Compound Eyes adds 30 damage to its attacks against an Active Pokémon with a Poké-Body, before Weakness and Resistance. Ability suppression disables the bonus.
Lunatone's Marvel Eyes prevents all attack effects, including damage, from opposing Pokémon LV.X to the owner's Lunatone and Solrock while the owner has Solrock in play. Ability suppression disables the protection.
Arcanine G's Extreme Speed reduces its Retreat Cost by one for each selected shared Fire Energy, approximating attached Fire Energy. Ability suppression disables the reduction.
Blaziken FB LV.X's Burning Spirit adds 40 damage after Weakness and Resistance to attacks against Burned Pokémon on either side. All copies share the single 40-damage cap; Ability suppression disables the bonus.
Yanmega's Speed Boost can attach one Grass Energy from the discard pile to the Active Yanmega once per turn. It is approximated as one shared Grass Energy, and Special Conditions or Ability suppression prevent use.

Arceus Cherrim's Cloudy Sky reduces damage from attacks to the owner's Grass and Fire Pokémon by 10 after Weakness and Resistance, including damage from attacks by its owner.
Arceus set Burmy Plant Cloak, Burmy Sandy Cloak, and Burmy Trash Cloak can evolve on the turn they enter play, as their Cloak Evolution Poké-Bodies permit. The permission also bypasses the engine's staged evolution timing for that turn.
Arceus Froslass's Snow Gift searches the Pokémon-only deck for one Pokémon card and adds it to hand when Froslass evolves from hand. The player chooses the card; the PvE opponent resolves the search automatically.

HeartGold & SoulSilver Donphan's Exoskeleton reduces attack damage to Donphan by 20 after Weakness and Resistance.
HeartGold & SoulSilver Hypno's Sleep Pendulum can flip once per turn to make the opponent's Active Pokémon Asleep on heads. Special Conditions block the Power, and the usual status immunity and Ability suppression apply.
HeartGold & SoulSilver Sunflora's Sunshine Grace searches the Pokémon-only deck for one Grass Pokémon and adds it to hand once per turn. Special Conditions and Ability suppression prevent use; the deck is shuffled after the search.

HS—Unleashed Metagross's Psychic Float and Pupitar's Boost Gas grant free retreat using the shared Energy pool as an approximation of attached Energy.

HS—Undaunted Vespiquen's Defense Sign prevents attack damage to the owner's Benched Grass Pokémon and respects Ability suppression.

Call of Legends Phanpy's Ultra-Thick Skin reduces attack damage by 10 after Weakness and Resistance while its owner's shared Energy pool is nonempty, approximating Energy attached to Phanpy.

HS—Triumphant Victreebel's Tangling Tendrils adds two Colorless to the opposing Active Pokémon's retreat cost while Victreebel is Active; suppression disables it.

HS—Triumphant Benched Dodrio's Retreat Aid reduces the owner's Active retreat cost by two Colorless. Yanma's Free Flight grants free retreat when the shared Energy pool is empty.

Black & White Samurott's Shell Armor reduces damage from attacks to Samurott by 20 after Weakness and Resistance.

Next Destinies Amoonguss's Sporprise applies Confusion and Poison to the opponent's Active Pokémon when played from hand to evolve a Pokémon.

Dark Explorers Archeops's Ancient Power blocks evolution from hand for both players while Archeops is in play; Ability suppression disables the lock.

Dark Explorers Espeon's Solar Revelation blocks opposing attack effects other than damage while its owner has Energy in the shared pool, approximating the per-Pokémon attached-Energy condition.

Dark Explorers Volcarona's Scorching Scales raises between-turn damage on opposing Burned Pokémon to four counters while Volcarona is in play.

Dark Explorers Venusaur's Floral Scent searches the deck for one Pokémon and puts it into hand once per turn.

Dragons Exalted Ninetales's Bright Look offers an evolution-time switch of an opposing Benched Pokémon into the Active Spot.

Dragons Exalted Gabite's Dragon Call searches for one Dragon Pokémon and adds it to hand once per turn.

Boundaries Crossed Crustle's Sturdy survives an attack-damage knockout at full HP and sets its remaining HP to 10. Ability suppression prevents the effect.

Boundaries Crossed Dusknoir's Sinister Hand can repeatedly move one damage counter from one opposing Pokémon to another opposing Pokémon; the Ability action enforces opponent-only source and target choices.

Serperior's Royal Heal heals each of its owner's Pokémon by 10 between turns. The shared healing resolver respects Ability suppression and healing prevention.

Roserade's Le Parfum searches the deck for any one card on evolution and adds it to hand.

Jumpluff's Leave It to the Wind returns Jumpluff and its Evolution cards to hand once per turn. The battle model does not track its individual attached Energy or Tools.

Boundaries Crossed Poison Point retaliates with Poison when Active Venipede, Whirlipede, or Scolipede is damaged by an attack, even if Knocked Out.

Munna's Long-Distance Hypnosis makes the opponent's Active Pokémon Asleep on heads or its owner's Active Pokémon Asleep on tails.

Audino's Busybody can be used from hand to heal 10 damage and remove one Special Condition from an Active Pokémon, then Audino is discarded.

Plasma Storm Jellicent's Spiteful Spirit Confuses and Poisons the attacking Pokémon when Active Jellicent is Knocked Out by attack damage.

Plasma Storm Sharpedo's Rough Skin places two damage counters on the attacker when Active Sharpedo takes attack damage, even if Sharpedo is Knocked Out. Weezing's Aftermath discards up to three cards from the opponent's deck when Weezing is Knocked Out by attack damage. Ability suppression applies.

Plasma Storm Blastoise's Deluge can attach shared Water Energy repeatedly to any friendly Pokémon during its owner's turn. The recipient is selected in the UI.

Plasma Storm Cherrim's Fair-Weather Heal heals 20 damage from a selected friendly Pokémon when Grass is the selected shared Energy type; individual Energy attachments are not tracked.

Plasma Storm Lucario's Dual Armor adds Fighting and Metal as effective types while Metal is selected in its owner's shared Energy pool; individual Energy attachments are not tracked.

Plasma Storm Klinklang's Plasma Steel prevents damage from opposing Pokémon-EX attacks to Pokémon with Metal as an effective type. Metal Energy eligibility uses the shared Energy selection, and Ability suppression disables the protection.

Plasma Storm Braviary's Big Wing lets its owner choose an opposing Benched Pokémon to switch into the Active Spot once per turn while Braviary is Active.

Plasma Storm Lunatone's Premonition lets its owner reorder the top two deck cards once per turn in PvE and PvP; Ability suppression disables it.

Plasma Storm Clefable's Moon Guidance flips before revealing legal Evolution choices. On heads, the owner chooses a card and Pokémon to evolve, then the deck is shuffled; tails does not evolve. It is once per turn and follows standard evolution eligibility checks.

Plasma Freeze Kecleon's Color Change copies the printed type of the opponent's first living Active Pokémon while Kecleon is Active. Ability suppression restores its printed type; the first front slot represents the single opposing Active Pokémon in this battle format.

XY Slurpuff's Sweet Veil prevents Special Conditions for its owner's Pokémon while Fairy is the selected shared Energy type and the side has Energy. This approximates individual Fairy Energy attachments; Ability suppression disables the immunity.

XY Base Greninja's Water Shuriken can be used once per turn to put three damage counters on a chosen opposing Pokémon. Discarding a Water Energy from hand is approximated by spending one shared Energy while Water is selected; Ability suppression applies.

XY Base Swellow's Drive Off forces a switch to an opposing Benched Pokémon once per turn. The engine uses its deterministic forced-switch replacement selection, and Ability suppression applies.

Flashfire Dusknoir's Shadow Void can repeatedly move one damage counter from another of its owner's Pokémon onto Dusknoir. The owner may move counters until Dusknoir is Knocked Out; the normal counter-movement lock and Ability suppression apply.

Flashfire Shiftry's Leaf Draw spends one shared Grass Energy and draws three cards. This approximates discarding a Grass Energy from hand because individual Energy cards are not in the hand model; Ability suppression applies.

Furious Fists Hawlucha's Shining Spirit makes its attacks ignore Weakness and Resistance. Ability suppression disables the effect.

Furious Fists Ludicolo's Captivating Rhythm flips a coin once per turn and, on heads, lets the player choose an opposing Benched Pokémon to bring Active. Ability suppression applies.

Furious Fists Bouffalant's Sap Sipper adds 40 damage to its attacks against opposing Grass Pokémon before Weakness and Resistance. Ability suppression applies.

Roaring Skies Shaymin-EX's Set Up draws until its owner has six cards when Shaymin-EX is played from hand onto the Bench. It is limited to that Bench entry, with Ability suppression and the draw pile limit applied.

Ancient Origins Ariados's Poisonous Nest can Poison both Active Pokémon except those with the Grass type. The once-per-turn Ability uses existing status protection and Ability suppression rules.

Ancient Origins Metagross's Magnetic Warp switches a selected friendly Benched Pokémon into the Active Spot, then switches the opponent's Active Pokémon with a Benched Pokémon. It requires an available Pokémon in both Active and Bench areas on each side and follows normal switch handling.

Ancient Origins Flareon, Vaporeon, and Jolteon make all friendly Stage 1 Pokémon Fire, Water, and Lightning types, respectively, in addition to their existing types. These passive type additions respect Ability suppression and feed into weakness, resistance, and type-based effects.

BREAKthrough Gallade's Premonition lets its owner reorder the top five cards of their deck once per turn. The existing deck-order action validates a complete permutation and applies Ability suppression.

Furious Fists Politoed's King's Song ignores Colorless costs for its owner's Poliwag, Poliwhirl, and Poliwrath attacks while Politoed is in play. Ability suppression disables the cost reduction.

XY Inkay's Upside-Down Evolution lets a Confused Inkay evolve into a matching card selected from its owner's deck, following normal Evolution eligibility and once-per-turn limits. The deck is shuffled afterward; Ability suppression disables the effect.

XY Voltorb's Destiny Burst flips a coin when Active Voltorb is Knocked Out by opponent attack damage. Heads places five damage counters on the attacker; the attacker can also be Knocked Out by this Ability damage.

XY Aegislash's Stance Change switches its in-play card with a selected Aegislash in hand once per turn in PvE and PvP. It preserves damage, Special Conditions, the Evolution stack, and field effects on the in-play Pokémon; the outgoing card goes to hand. The shared Energy pool remains unchanged because individual Energy and Tool attachments are not represented. Ability suppression applies.

Flashfire Goodra's Gooey Regeneration can repeatedly discard one shared Energy to heal 60 damage from itself during its owner's turn. It remains available while Goodra is damaged and the side has Energy; Ability suppression and healing prevention apply.

Flashfire Forretress's Thorn Tempest can put one damage counter on every living opposing Pokémon when Forretress evolves. The evolution prompt offers the optional Ability, and the server resolves the current opposing board; suppression disables it.

Flashfire Lopunny's Big Jump returns Lopunny and its Evolution stack from the field to its owner's hand once per turn. Individual Energy and Tool attachments are not tracked by this battle format; Ability suppression applies.

Phantom Forces Wobbuffet's Bide Barricade suppresses Abilities on non-Psychic Pokémon while Wobbuffet is Active. The shared suppression check also covers Pokémon in hand and discard when an Ability is resolved; another Ability suppressor can disable Bide Barricade itself.

Phantom Forces Malamar-EX's Hyper Hypnosis puts the opposing Active Pokémon Asleep after its owner charges Energy. Because Energy cards are represented by a shared pool, the turn's Energy charge approximates attaching an Energy from hand; Ability suppression and status-immunity rules apply.

Primal Clash Milotic's Sparkling Ripples lets its owner return one Pokémon from discard to hand when Milotic evolves. The discard zone stores Pokémon cards only, so Energy and Trainer recovery are outside this battle format.

Primal Clash Swampert's Diving Search lets its owner select any card from the deck and place it on top once per turn. The battle deck contains Pokémon cards, so the choice is among the Pokémon in that deck.

Primal Clash Crawdaunt's Unruly Claw can discard one Energy from the opponent's Active Pokémon when Crawdaunt evolves. This uses one Energy from the opponent's shared pool as the attached Energy approximation.

Primal Clash Flygon's Sand Flap lets its owner choose either player to shuffle their hand into their deck and draw up to four cards. Because hands and decks contain Pokémon cards only in this battle format, only those cards participate.

Primal Clash Sceptile's Nurture and Heal adds one Grass unit to the shared Energy pool and heals 30 damage from one friendly Pokémon. It requires Grass selected and room in the pool, approximating an Energy attachment because individual Energy cards and Energy cards in hand are not represented.

Roaring Skies Absol's Cursed Eyes can move up to three damage counters between opposing Pokémon when Absol is played onto the Bench. It appears as an optional counter-movement choice during that turn and follows the shared movement-prevention and target-protection rules.

Emerging Powers Krookodile's Black Eyes flips once per turn while Active and discards one shared Energy from the opponent on heads, approximating attached Energy on the opponent's Active Pokémon.
Noble Victories Leavanny's Leaf Tailor removes Weakness from its owner's Pokémon while the shared Energy pool is non-empty. This approximates its attached-Energy condition, covers Active and Benched targets, and respects Ability suppression.
Next Destinies Vanilluxe's Slippery Soles now uses the shared switch action to switch both Active Pokémon with their owner's chosen Benched Pokémon.
Dark Explorers Darkrai-EX's Dark Cloak removes retreat costs for its owner's Pokémon when Darkness is selected in the shared Energy pool. This approximates attached Darkness Energy and uses the shared retreat validator.
Dragons Exalted Altaria's Fight Song adds 20 attack damage for each unsuppressed Altaria in play when its owner uses a Dragon-type attack against the opponent's Active Pokémon.
Plasma Freeze Deoxys-EX's Power Connect adds 10 attack damage per unsuppressed Deoxys-EX for its owner's Team Plasma attackers other than Deoxys-EX, against the opponent's Active Pokémon.
Flashfire Shiftry's Leaf Draw spends one shared Grass Energy to draw three cards, approximating discarding a Grass Energy from hand.
Flashfire Floette's Flower Veil adds 20 maximum and current HP to each friendly Grass Pokémon per unsuppressed Floette in play. Existing damage is preserved when the aura changes, and removing the bonus can cause a Knock Out.
Furious Fists Klefki's Secret Key changes its owner's Fairy Pokémon's Resistance to −40 using the shared Resistance calculation; Ability suppression disables the aura.
Phantom Forces Gourgeist's Gourgantic sets its maximum HP to 200 while Grass is selected in the shared Energy pool. This approximates attached Grass Energy and preserves existing damage as the Ability activates or ends.

Noble Victories Druddigon's Rough Skin retaliates with two damage counters when Active Druddigon takes attack damage, including damage that Knocks it Out; suppression disables the effect.

Rising Rivals Glaceon's Frost Wind reduces opposing attack damage to its owner's Pokémon by 10 after Weakness and Resistance while Glaceon is Active; suppression disables it.

Rising Rivals Fan, Frost, Heat, Mow, and Wash Rotom can use their once-per-turn Shift Powers to take their printed type until the end of the turn. The self-targeting type changes are supported in PvE and PvP and are blocked by Special Conditions or Ability suppression.

Rising Rivals Alakazam E4 LV.X can repeatedly move one damage counter between friendly Pokémon SP before attacking. The UI filters both endpoints to Pokémon SP, and Special Conditions block activation.

Rising Rivals Flygon LV.X discards the top card of the opponent's Pokémon deck between turns while Active. The trigger runs for either player's Flygon and respects Ability suppression.

Rising Rivals Beedrill's Flutter Wings searches for a Grass Pokémon once per turn and adds it to the owner's hand. Special Conditions block activation; PvE and PvP are supported.

Rising Rivals Kecleon's Colorful Body adds all nine printed types while Kecleon is in play. Its added types affect Weakness and Resistance calculations and are disabled by Ability suppression.

Rising Rivals Snorlax's Big Appetite draws to six cards while Snorlax is Active, then makes it Asleep if the Ability drew cards. It is blocked by Special Conditions and works in PvE and PvP.

Rising Rivals Flygon's Rainbow Float gives free retreat to friendly Pokémon matching the selected shared Energy type when Flygon is in play. This approximates Flygon's attached Basic Energy requirement; suppression disables the effect.

Rising Rivals Hippowdon E4's Sand Armor reduces incoming attack damage by 10 after Weakness and Resistance while Fighting is the selected shared Energy type. This approximates its attached Fighting Energy requirement; suppression disables the effect.

Rising Rivals Gallade E4 LV.X's Blade Storm optionally places one damage counter on each opposing Pokémon when it evolves onto the Active Gallade E4. Knock Outs resolve through the regular battle settlement.

Rising Rivals Floatzel GL LV.X's Water Rescue returns a Water Pokémon Knocked Out by opposing attack damage and its modeled evolution stack to its owner's hand. Individual attached Energy and Tools are not represented in this battle model.

Rising Rivals Trapinch's Gather Sand can be used once per turn while Trapinch is Active to recover a Fighting Energy from the discard as one shared Energy. The battle model does not track individual Energy cards in hand, attached to a Pokémon, or in the discard pile.

Rising Rivals Infernape E4 LV.X's Intimidating Roar can be used once per turn while Infernape is Active to switch the opponent's Active Pokémon with a Benched Pokémon. Special Conditions block it, and Ability suppression applies.

Rising Rivals Luxray GL LV.X's Bright Look can switch the opponent's Active Pokémon with a chosen Benched Pokémon when Luxray GL LV.X is played from hand onto the Active Luxray GL. The evolution prompt is available only for that Active evolution; the player may decline the optional switch.

Rising Rivals Active Sharpedo's Energy Shark flips when an opposing attack damages it, including a Knock Out. Heads removes one Energy from the attacking side's shared pool; this approximates discarding an attached Energy card. Ability suppression disables the effect.

Rising Rivals Flareon, Jolteon, and Vaporeon can use Undevelop once per turn, while free of Special Conditions, to return themselves to hand and restore the previous Pokémon stage. Damage and Special Conditions stay with the devolved Pokémon; if its remaining HP becomes zero, it is Knocked Out and normal promotion applies.

Unseen Forces Ursaring’s Intimidating Ring blocks attack and Poké-Power use by the opponent’s Basic Pokémon while Ursaring is Active.

Roaring Skies Dragonite's Max Wind is an optional evolution trigger that heals all damage from one chosen, damaged friendly Pokémon. Healing prevention and Ability suppression apply.

Roaring Skies Reshiram's Turboblaze adds one Fire Energy to the shared pool once per turn while Reshiram is Active and a Dragon Pokémon is in play. Fire must be selected and the pool must have capacity; this approximates the Energy card attachment.

Ancient Origins Unown's Farewell Letter can be used from the Bench to discard Unown and draw one card. It is not treated as a Knock Out; the player and PvE opponent paths use the Pokémon-only hand/deck model.

Roaring Skies Active Ninjask can use Wing Buzz once per turn by discarding a card from hand to discard the top card of the opponent's deck.

Roaring Skies Carbink's Jewel Armor prevents all attack damage to Benched Carbink from either player's attacks; Ability suppression disables this protection.

BREAKthrough Florges BREAK's Floral Breeze heals 30 damage from its owner's Active Pokémon and removes one Special Condition once per turn.

BREAKthrough Florges's Calming Aroma reduces a qualifying attack's modeled cost by one when it includes Fairy Energy; suppression disables the reduction.

BREAKthrough Vivillon's Energy Color can be used once per turn to flip for one selected Energy in the shared pool. Heads adds the selected type when there is pool capacity; tails adds none. This approximates the Energy search and attachment from the Pokémon-only deck model, and the flip is recorded for player, PvP, and PvE use.

BREAKpoint Ho-Oh-EX's Purifying Fire heals 50 damage from itself once per turn when Fire is the selected shared Energy type and the pool is nonempty.

BREAKpoint Hypno's Goodnight, Babies makes both Active Pokémon Asleep once per turn.

Fates Collide Mothim's Wormadam First repeatedly moves one damage counter from a damaged friendly Wormadam to another friendly Pokémon. Shared movement prevention and Ability target protection apply.

Fates Collide Omastar BREAK's Dangerous Tentacle can switch an opposing Benched Pokémon-EX into the Active Spot when Omastar BREAK evolves from hand.

Fates Collide Omastar's Restoring Beam searches the deck for one Restored Pokémon and places it on the Bench once per turn.

Fates Collide Servine's Serpentine Strangle resolves a coin flip on evolution and applies Paralysis on heads, respecting status protection. Fates Collide Mew's Memories of Dawn uses the existing copied attack access for friendly Basic Pokémon in play.

Fates Collide Regirock-EX's Regi Power adds 10 damage to attacks from friendly Fighting Pokémon other than Regirock-EX against the opponent's Active Pokémon. Multiple copies stack.

Fates Collide Bronzong's Metal Fortress prevents damage and effects from opposing attacks to the owner's Bench; Ability suppression disables the protection.

Fates Collide Lugia's Pressure reduces incoming damage to itself by 20 before Weakness and Resistance while Lugia is Active and the attacker is also Active.

Fates Collide Delphox BREAK's Flare Witch searches out one Fire Energy card once per turn and adds one shared Energy. The player must have Fire selected; the custom engine does not track individual Energy attachments.

Fates Collide Marowak's Bodyguard blocks effects from opposing attacks that target Marowak. The engine does not yet model attack effects targeting cards in hand or track effect sources to clear already-applied effects.

Steam Siege Magearna-EX's Mystic Heart blocks opposing attack effects, excluding damage, to the owner's Pokémon while Metal is selected and the shared Energy pool is nonempty. This approximates its attached Metal Energy requirement.

Steam Siege Ampharos's Shocking Light places 3 damage counters on a chosen opposing Pokémon-EX once per turn; the server validates the EX target for both players.

Steam Siege Toxicroak's Poison Enzyme prevents attack damage to Toxicroak from an opposing Poisoned Pokémon.

Steam Siege Klinklang's Heavy Bumper reduces incoming damage by 10 per Colorless in the opposing Active Pokémon's Retreat Cost after Weakness and Resistance.

Steam Siege Yanmega's Sonic Vision makes its attacks free while its owner's hand has exactly four cards.

Steam Siege Nidoking's King's Palace adds 20 damage before Weakness and Resistance to Nidoqueen's attacks against the opponent's Active Pokémon while Nidoking is in play. Multiple providers stack, and suppression disables the Ability.

Steam Siege Hawlucha's Sudden Cyclone can switch the opponent's Active Pokémon with one of their Benched Pokémon after Hawlucha is played from hand onto the Bench.

Stellar Crown Ledian's Glittering Star Pattern can switch in an opposing Benched Pokémon with 90 or less HP remaining on evolution.

Stellar Crown Orthworm ex's Pummeling Payback deals 20 damage to an attacking Pokémon for each shared Metal Energy, representing the printed attached Metal Energy count. It triggers even if Orthworm ex is Knocked Out by the attack.

Stellar Crown Bouffalant's Curly Wall reduces attack damage to Basic Colorless Pokémon by 60 after Weakness and Resistance if another Bouffalant is in play. The reduction does not stack across multiple Curly Wall abilities.

Stellar Crown Carracosta's Primal Knowledge adds 30 damage before Weakness and Resistance to attacks against the opponent's Active Evolution Pokémon while Carracosta is in play.

Stellar Crown Cradily's Selective Slime offers Burned, Confused, or Poisoned as status choices; heads applies the selected condition to the opponent's Active Pokémon, while tails applies none.
Stellar Crown Klinklang's Emergency Rotation is available from the hand once per turn while the opponent has a Stage 2 Pokémon in play. It puts Klinklang directly onto the Bench when all three front slots are occupied and a legal Bench slot is open.
Stormfront Staraptor's Protect Wing reduces damage by 20 after Weakness and Resistance from attacks by opposing Stage 2 Pokémon while Staraptor is Active.
Platinum Ampharos's Damage Bind prevents damaged Pokémon with Poké-Powers from using those Powers while Ampharos is healthy and in play.
Platinum Crobat G's Flash Bite places one damage counter on a selected opposing Pokémon when Crobat G is played from hand onto the Bench; the PvE opponent targets the Pokémon with the lowest remaining HP.
Platinum Blissey's Nurse Call discards one card from hand to heal 20 damage from a chosen friendly Pokémon, once per turn. Special Conditions block its use; the PvE opponent chooses its most damaged eligible Pokémon.
Platinum Blaziken's Fire Breath can be used once per turn to Burn the opposing Active Pokémon. Special Conditions block use, and the PvE opponent activates it automatically when eligible.
Platinum Dugtrio's Sinkhole places 2 damage counters on an opposing Active Pokémon when it retreats, in both PvE and PvP.
Platinum Dialga's Time Aura prevents the opponent from evolving their Active Pokémon while Dialga is Active; Ability suppression disables the lock.
Stormfront Regigigas's Regi Form reduces its attack cost by one Colorless Energy while Regirock, Regice, and Registeel are in play.
Stormfront Roserade's Hidden Poison applies Poison to the attacking Pokémon after an opponent's attack damages Active Roserade, even if Roserade is Knocked Out.
Stormfront Salamence's Battle Rush ignores all Colorless Energy in Salamence's attack costs while the opponent has a Pokémon with at least 120 maximum HP in play.
Stormfront Bibarel's Unaware prevents attack effects other than damage from affecting Bibarel.
Stormfront Rapidash's Ability applies Burn to the attacking Pokémon when an opponent's attack damages Active Rapidash, even if Rapidash is Knocked Out.
Stormfront Electrode's Radiance places 1 damage counter on each opposing Pokémon when an opponent's attack damages Active Electrode, even if Electrode is Knocked Out.
Stormfront Sableye's Overeager determines who takes the first turn from the opening front row; if both players have an Active Sableye with Overeager, it does not alter the chosen starting order.
Stormfront Gengar's Fainting Spell flips a coin when attack damage Knocks Out Active Gengar during the opponent's turn; heads Knocks Out the attacking Pokémon as well.
Stormfront Dusknoir's Shadow Command draws two cards, discards down to six when the hand has seven or more, then places two damage counters on Dusknoir. Special Conditions prevent use; automatic hand trimming discards the lowest-cost cards.
Stormfront Magnezone's Magnetic Search finds a Lightning or Metal Pokémon from the deck, puts it in hand, and shuffles; Special Conditions prevent use.
Stormfront Empoleon's Emperor Aura blocks the opponent's Energy charge on their next turn when Empoleon evolves from hand onto the Active Pokémon. Ability suppression disables the trigger.
Stormfront Skuntank's Evolutionary Gas prevents the opposing Active Pokémon from attacking next turn when Skuntank evolves from hand onto the Active Pokémon. It currently targets the engine's first opposing Active Pokémon because evolution effects do not have a target-selection prompt.
Stormfront Budew prevents all effects, including damage, from attacks by Poisoned Pokémon. Ability suppression disables this protection.
Legends Awakened Uxie's Set Up draws to seven cards when Uxie is played from hand onto the Bench, with a per-Uxie turn limit. PvE opponents can use it on the same turn they bench Uxie.
Legends Awakened Houndoom's Revenge Fang boosts its attacks against the Active Pokémon by 40 while it has fewer Benched Pokémon than its opponent. Ability suppression disables the boost.
Legends Awakened Mesprit's Psychic Bind prevents opposing Pokémon from using Poke-Powers on the opponent's next turn when Mesprit is benched from hand; PvE opponents use the same effect. Pokémon that combine a Poke-Power and Poke-Body are excluded because suppression is represented per Pokémon.
Legends Awakened Unown [W]'s WALL reduces damage from opponent attacks to all friendly Pokémon by 10 after Weakness and Resistance while Unown [W] is Active. Ability suppression disables the reduction.
Legends Awakened Swellow has zero Retreat Cost while it has no Energy. The engine uses its shared Energy pool as an approximation for attached Energy.
Legends Awakened Luxray's Rivalry adds 50 damage before Weakness and Resistance when the opponent has a Pokémon LV.X in play.
Legends Awakened Azelf LV.X removes Weakness from friendly Psychic Pokémon while it is in play.
Legends Awakened Armaldo's BODY prevents attack damage of 60 or less to itself after Weakness and Resistance.
Legends Awakened Regigigas recovers from Special Conditions when Energy is attached from hand to it; the battle mode represents attachments with its shared Energy charge.
Legends Awakened Delcatty flips when an opposing attack damages it in the Active Spot; heads Confuses the attacker, including when Delcatty is Knocked Out by that damage.
Legends Awakened Shedinja's Soul Beat places four damage counters on the attacking Pokémon and each opposing Pokémon with the same name if an attack Knocks Out Active Shedinja. It can trigger once during the opponent's turn.
Legends Awakened Spiritomb's Curse Breath puts one damage counter on each already-damaged Pokémon on both sides when Spiritomb is benched from hand. Its shared once-per-turn limit is enforced, and the PvE opponent uses it automatically.
Legends Awakened Unown [Y]'s Hidden Power can be used once per turn from the Bench to remove one damage counter from a damaged Active Unown and make it Asleep. Normal Sleep protection applies, and Healing Prevention blocks the healing.
Legends Awakened Unown [!] can use its Bench-entry Power to flip a coin and place two damage counters on a selected Pokémon: heads targets the opponent's side and tails targets its owner's side. The interface lets the player select a target for either outcome before the server records and resolves the flip.
Legends Awakened Unown [R] can use its once-per-turn Bench Power to discard itself and draw a card, provided its owner's deck is not empty. Attached cards are not tracked by the battle model, so only Unown [R] is discarded.
Legends Awakened Unown [V] removes two damage counters from each damaged friendly Pokémon and ends the turn. Special Conditions prevent the Power, and Healing Prevention blocks it. The PvE opponent uses it when it can heal damage.
Legends Awakened Uxie LV.X's Trade Off can be used once per turn to take one of the top two cards of the deck into the hand and put the other on the bottom. Special Conditions prevent the Power; the PvE opponent chooses the higher-HP card.
Legends Awakened Registeel's Regi Heal is supported in PvE and PvP. Once per turn, Registeel can discard two cards selected from hand to heal 30 damage from itself; Special Conditions prevent use.
Legends Awakened Regice's Regi Move is supported in PvE and PvP. It discards two selected hand cards, targets an opposing Active Pokémon that is not evolved, and switches it with the first available opposing Benched Pokémon; Special Conditions prevent use.
Legends Awakened Forretress's Iron Shell flips once for each Energy unit charged from hand while Forretress is in play. Tails places two damage counters on every living Pokémon except Forretress on both sides. Because Energy attachments are represented by a shared pool, the engine cannot verify that the Energy was attached specifically to Forretress; it resolves the optional Power automatically when Energy is charged.
Legends Awakened Beldum's Metal Chain searches for a Beldum and puts it onto the Bench for each Metal Energy unit charged while an eligible Beldum is in play. The shared Energy pool cannot identify the attachment target, so the trigger runs automatically and uses the first eligible copy from the deck.
Legends Awakened Tyrogue's Baby Evolution uses the existing hand evolution flow to put Hitmonlee, Hitmonchan, or Hitmontop from hand onto Tyrogue and heal all damage. It is usable once per turn.
Majestic Dawn Unown [P]'s PUT places one damage counter on a chosen friendly Pokémon other than Unown, once per turn from the Bench. The PvE opponent chooses its healthiest eligible Pokémon.
Majestic Dawn Darkrai's Darkness Shade can be used once when Darkrai is played from hand onto the Bench to make a chosen opposing Active Pokémon Asleep; PvE uses it on the first eligible Active Pokémon.
Majestic Dawn Articuno's Freezing Screech flips once when Articuno is played from hand onto the Bench; heads makes one selected opposing Active Pokémon Paralyzed. PvE chooses the first eligible Active Pokémon.
Majestic Dawn Zapdos's Sheet Lightning flips once when Zapdos is played from hand onto the Bench; heads places one damage counter on every opposing Pokémon. PvE resolves the flip automatically.

Platinum Banette's Temper Tantrum is a once-per-turn free Ability that discards one or more chosen cards from hand and places the same number of damage counters on Banette. It is blocked by Special Conditions and can Knock Out Banette.

Platinum Mightyena's Cold Feet removes the full Energy cost of Mightyena's attacks while Mightyena has any Special Condition. This Ability changes the cost used by both player and opponent attack validation and selection.

Platinum Slaking's Lazy Paunch records when Slaking attacks and blocks its next-turn attack. The requirement is checked by shared attack validation and opponent attack selection.

Platinum Shaymin LV.X's Revenge Seed adds 60 damage before Weakness and Resistance against the opposing Active Pokémon after one of its owner's Grass Pokémon is Knocked Out by attack damage during the opponent's previous turn. Sleep, Confusion, Paralysis, and Ability suppression turn it off.

Platinum Armor Fossil's Armor Stone rolls until tails when an opponent's attack would damage Armor Fossil, reducing damage by 10 per heads. The coins resolve through the attack damage pipeline.

Platinum Skull Fossil's Skull Stone rolls until tails when an opponent's attack damage would Knock it Out, then adds 10 counter damage to the attacker per heads through the attack resolution.

Platinum Giratina's Let Loose shuffles both players' hands into their decks and draws up to four cards for each player, owner first. The Power is available only during the turn Giratina is played from hand onto the Bench and is supported in PvE and PvP.

Platinum Ludicolo's Cheerful Voice is a free once-per-turn Power that ends the current turn and adds 60 damage to all of Ludicolo's attacks during its next turn. The boost is scoped to Ludicolo and the full following turn; Special Conditions and opposing Ability suppression block activation. PvE selects it instead of charging when the opponent's Energy pool is already capped.

Platinum Giratina LV.X's Invisible Tentacles checks the attacker's hand before an attack: it discards a random card, once per turn, and prevents the attack if no card is available. The rule is enforced for PvE and PvP attacks.
XY9 Suicune's Wind Charm blocks opponent attack effects, while preserving damage, across the owner's field while Suicune is Active. The engine honors suppression and leaves existing effects in place.
XY9 Zebstrika's Zap Zone skips damage-modifying Abilities on the opposing Active Pokémon when a friendly Lightning Pokémon attacks. Benched providers work, while Ability suppression disables Zap Zone.
XY8 Haunter's Gothic Fear is an optional evolution Ability that Confuses both Active Pokémon. Status immunity and Ability suppression are resolved through the shared status-effect rules.
XY8 Raikou's Shining Body reduces attack damage by 20 after Weakness and Resistance when its owner has Lightning selected in the shared Energy pool. This uses the engine's shared Energy approximation for an attached Lightning Energy card; Ability suppression disables it.
XY11 Klinklang's Heavy Bumper scales its damage reduction from the opposing Active Pokémon's modeled Retreat Cost, reducing attack damage by 10 per Colorless after Weakness and Resistance.
XY8 Magnemite's Sparkling Induction reduces its Retreat Cost while Active by the count of living Magnemite on its owner's Bench. The passive discount respects Ability suppression.
XY12 Dragonite-EX's Pull Up triggers when played from hand onto the Bench and lets its owner return up to two selected Basic Pokémon other than Dragonite-EX from the discard pile to hand. The same server validation applies in PvP and solo battles.
SM1 Toxapex's Toxic Spikes apply Poison to the opponent's new Active Pokémon after a Retreat action. The hook does not run for forced switches and uses shared Ability-suppression and Special Condition immunity checks.
SM1 Decidueye-GX's Feather Arrow uses the shared activated damage-counter flow to place two counters on a chosen opposing Pokémon once per turn. Player and PvE opponent actions honor Ability suppression.
SM2 Machoke's Daunting Pose blocks opposing attack damage to Benched Pokémon and prevents opposing attack or Ability damage counters from being placed there. The damage and counter pipelines both honor Ability suppression.
SM2 Chandelure's Shady Move can move one damage counter between any two of its owner's Pokémon once per turn, including from Active to Bench or the reverse. The shared counter-movement action enforces once-per-turn use and Ability suppression.
SM1 Alolan Muk's Power of Alchemy suppresses Abilities on other Basic Pokémon in play, including its owner's own Basics. The suppression check covers modeled hand and discard card states where Ability eligibility is evaluated, and Ability suppression can disable Alolan Muk itself.
SM3 Raichu's Evoshock is offered when Raichu evolves from hand and can Paralyze the opponent's Active Pokémon. The shared evolution-status action applies status immunity and Ability suppression in PvP and solo battles.
SM3 Rhyperior's Toppling Wind discards the top three cards of the opponent's deck when Rhyperior evolves from hand. Its printed “of your opponent's deck” wording is accepted alongside the existing equivalent wording.
SM3 Lucario's Stance can be activated when it evolves from hand to prevent all effects, including damage, from opposing attacks through the opponent's next turn. The protection uses the shared incoming attack effect state.
SM3 Porygon-Z's Initialize is an optional evolution Ability that returns the highest Evolution card from every opposing evolved Pokémon to its owner's hand, preserving damage counters on the devolved Pokémon. Devolution that reduces a Pokémon to 0 HP is handled by the normal Knock Out flow.
SM4 Starmie's Escape can shuffle Starmie and its modeled Evolution cards from either Active or Bench into its owner's deck once per turn. It cannot be used if Starmie is the owner's last Pokémon in play.
SM4 Gogoat's Sap Sipper increases its attack damage by 80 against opposing Grass Pokémon before Weakness and Resistance. The shared damage modifier now applies the printed target-type restriction.
SM4 Regice's Iceberg Shield prevents all effects and damage from opposing Stage 2 Pokémon while its owner has Regirock in play. Damage calculation and attack-effect prevention both enforce the condition and Ability suppression.
SM4 Karrablast's Shell On requires a Shelmet in hand, discards it, and evolves Karrablast with a legal Evolution card selected from the deck; the deck is shuffled afterward. The free evolution is available in player and NPC battles and does not consume the turn.
SM7 Sableye's once-per-turn deck-top Power reveals the top card in the activation control, then discards it only when the player chooses to activate. The NPC opponent uses it automatically when legal; Special Conditions prevent use.
SM7 Banette's Red Eyes can put a Basic Pokémon from the opponent's discard pile onto their Bench when Banette evolves. The player chooses the target from the public discard pile, and the effect is skipped if the opponent's Bench is full or has no Basic Pokémon.
SM75 Flygon's Power of Alchemy prevents effects, but not damage, from opposing attacks to its owner's Dragon Pokémon while Flygon is in play. Ability suppression disables this team protection.
SM4 Bewear's Fluffy reduces damage from an opponent's non-Fire Pokémon by 30 after Weakness and Resistance; Ability suppression disables it.
SM5 Infernape's Flaming Fighter raises between-turn Burn damage to 60 against the opponent's Burned Pokémon. Ability suppression disables the modifier.
SM5 Passimian's Power Huddle adds 30 damage to Passimian's attacks against the opposing Active Evolution Pokémon for each unsuppressed Passimian with Power Huddle on the Bench.

Chilling Reign Passimian's Throwing Coach adds 30 damage before Weakness and Resistance when a Rapid Strike Pokémon attacks an opposing Benched Pokémon V or Pokémon-GX. Multiple Throwing Coach copies do not stack.

Chilling Reign Galarian Slowking's Mysterious Potion is available once per turn as an activated Ability. Choose any of your Pokémon and flip a coin: heads heals up to 90 damage; tails places 3 damage counters, and the standard Ability knockout flow handles a KO.

Chilling Reign Froslass's evolution Ability can recover a Basic Water Energy from the player's discard pile when Froslass evolves. Since individual attachments are abstracted, the card is removed from discard and represented as one Water Energy in the shared pool.

Evolving Skies Flaaffy's Dynamotor can once per turn recover a Basic Lightning Energy from discard for a chosen Benched Pokémon. The Energy card leaves discard and adds one Lightning Energy to the shared pool; the individual attachment target is recorded in the Ability action and log, while attachments remain abstract.

Evolving Skies Thievul's evolution Ability shuffles both players' hands to the bottoms of their own decks. If either hand contained cards, each player then draws up to four cards; empty decks draw only the cards available.
Evolving Skies Salamence's once-per-turn Ability lets the opponent choose a Benched Pokémon to switch into their Active Spot. The shared switch action handles the replacement in PvE and PvP.

Evolving Skies Jumpluff grants a second attack only when its first attack Knocks Out the opponent's Active Pokémon. The opponent promotes a replacement before the extra attack resolves; the effect is supported in PvE and PvP.

Evolving Skies Ludicolo's Enthusiastic Dance adds 100 damage to all Basic Pokémon's attacks against the opponent's Active Pokémon for the turn in which Ludicolo evolves. The Ability is optional and the bonus applies before Weakness and Resistance.

Evolving Skies Pinsir's Resistance rule is supported: Single Strike attacks ignore Resistance when they hit the opponent's Active Pokémon.
Evolving Skies Zoroark's Phantom Transformation can replace itself with a Stage 1 Pokémon other than Zoroark from the discard pile. The replacement enters without Zoroark's damage, conditions, or effects, and is treated as played this turn; Energy attachments remain abstract in the shared pool.
Muk's Poison persistence Ability prevents the opponent's Poisoned Pokémon from recovering when they evolve or devolve. It works across the board and is disabled by Ability suppression.
Spiritomb suppresses Abilities on all Basic Pokémon V in play on both sides, through the shared Ability suppression check.
Fusion Strike Gorebyss suppresses Abilities on the opponent's Rapid Strike Pokémon in play; the rule respects opposing Ability suppression.
Klefki's Mischievous Lock suppresses Abilities on all Basic Pokémon in play while Klefki is Active, except Mischievous Lock itself.
Surging Sparks Gastrodon suppresses Abilities on Benched Stage 2 Pokémon on both sides while Gastrodon remains on its owner's Bench.
Cosmic Eclipse Mimikyu suppresses Abilities on damaged Pokémon-GX on both sides; damage counters and Ability suppression determine whether it applies.
Celestial Storm Lunatone suppresses Abilities on Fire Pokémon on both sides while its owner has Solrock in play, except on Pokémon-GX and Pokémon-EX.
Giratina's suppression rule prevents Pokémon BREAK from using Abilities, including inherited Abilities from their evolution stack.
Celestial Storm Slaking's Lazy suppresses all Abilities on the opponent's Pokémon in play except Lazy itself while Slaking is Active.
Fantastical Parade Alolan Muk suppresses Abilities on Basic Pokémon in play on both sides, without extending the effect to cards in hand or discard.
Paldea Evolved Oricorio can once per turn heal 20 damage from its owner's Active Pokémon if it has evolved. Both player and PvE healing actions enforce the Active and evolution conditions.
Fusion Strike Pyukumuku can be revealed from hand once per turn, put on the bottom of the Pokémon deck, then draw one card. A side-wide usage marker preserves the limit even if the draw returns Pyukumuku to hand.
Cosmic Eclipse Victini can once per turn heal 20 damage from a damaged Benched Pokémon. PvP and PvE validate the target's Bench position.
SM Black Star Promos Vaporeon-GX can once per turn heal 30 damage from its Active Water Pokémon; the healing Ability supports typed Active targets.
Unbroken Bonds Melmetal can discard a Metal Pokémon from hand once per turn to heal 100 damage from itself; the client offers Metal Pokémon and the server validates the discarded card type.
Space-Time Smackdown Lucario increases damage from friendly Fighting Pokémon attacks to the opposing Active Pokémon by 20, before Weakness and Resistance. Ability suppression disables the aura.
Triumphant Light Shaymin reduces its owner's Active Basic Pokémon's Retreat Cost by one while Shaymin is on the Bench; Ability suppression disables the reduction.
Triumphant Light Carnivine and Tyranitar each gain +30 attack damage against the opposing Active Pokémon while their owner has Arceus or Arceus ex in play. Either named prerequisite satisfies the condition, and Ability suppression disables the bonus.
Triumphant Light Abomasnow reduces its attack cost by one Colorless while its owner has Arceus or Arceus ex in play; Ability suppression disables the reduction.
Genetic Apex and Mega Rising Victreebel can once per turn, while Active, switch an opposing Benched Basic Pokémon into the Active Spot. The PvP and PvE actions validate the target subtype and normal switch rules.
Triumphant Light Unown can once per turn inspect the top card of either player's deck. The selected card name remains private to the inspecting player.
Genetic Apex and Mega Rising Hypno can flip a coin once per turn to put the opponent's Active Pokémon to Sleep on heads; the existing status immunity rules apply.
Mega Rising Rillaboom can flip a coin once per turn to switch an opposing Benched Pokémon into the Active Spot on heads; PvP and PvE use the shared switch resolution.
Astral Radiance Mightyena reduces the Colorless cost of all its attacks by three while the opponent has a Pokémon VMAX in play. Ability suppression disables the reduction.
Wisdom of Sea and Sky Politoed boosts attacks by Pokémon that evolve from Poliwhirl by 40 damage against the opponent's Active Pokémon while Politoed is Benched. Ability suppression disables the boost.
Paldean Wonders Quaquaval's attacks deal 60 more damage to the opponent's Active Pokémon while Quaquaval has 50 HP or less.
HS—Unleashed Ursaring's attacks deal 60 more damage while Ursaring has damage counters on it; the shared damage modifier checks the counter threshold.
30th Celebration Snorlax heals all damage from itself during Checkup if it remains Asleep; the between-turn healing resolver now supports full healing.
Unseen Forces Hitmonlee's attacks deal 20 more damage while Hitmonlee is evolved; the attack modifier checks the card's evolution stage.
SM5 Shiinotic's Illuminate searches the Pokémon deck for a Fairy Pokémon and adds the selected card to hand once per turn. The deck is shuffled afterward; Ability suppression blocks use.
SM6 Delphox's Mystical Torch applies Burn to the opponent's Active Pokémon once per turn. It can be used from the Bench, subject to status immunity and Ability suppression; the PvE opponent uses it automatically.
SM6 Tyrantrum's Tyrannical Heart adds 60 damage to its attacks and reduces damage it takes by 30 while its owner's board has no more Pokémon than the opponent's. Ability suppression disables both effects.
SM7 Magcargo's Smooth Over searches the Pokémon deck for one card, shuffles, and places that card on top. It is once per turn and works for the player and PvE opponent.
SM7 Active Beldum's Conductive Body lowers its Retreat Cost by one for each living Beldum on its owner's Bench; Ability suppression disables it.
SM7 Salamence's Dragon Wind can once per turn switch a chosen opposing Benched Pokémon into the Active Spot while Salamence is Active; PvP and PvE support uses the existing switch rules and Ability suppression.
SM8 Grovyle's Sunshine Grace searches the deck for a Grass Pokémon into hand once per turn; both player and PvE opponent use the shared deck-search Ability flow.
SM8 Shaymin's Floral Heal heals 20 damage from the Active Grass Pokémon once per turn; the healing action validates both Active Spot and Grass type.
SM8 Blissey's Happiness Supplement removes one Special Condition from its owner's Active Pokémon once per turn using the shared recovery Ability flow.
SM8 Mareep's Fluffy Pillow puts the opposing Active Pokémon to Sleep once per turn while Mareep is Active; status immunity and Ability suppression apply, and PvE opponents use it automatically.
SM8 Lapras's Go for a Swim lets its owner reorder the top two deck cards once per turn using the existing deck-order choice controls.
SM8 Zebstrika's Sprint discards its owner's hand and draws four cards once per turn; PvE opponents use it when their hand is small.
SM8 Naganadel's Charging Up attaches one Basic Energy from the discard pile to itself once per turn; attachment uses the shared Energy pool model.
SM8 Suicune's Frozen Flow makes the opponent switch their Active Pokémon with a Benched Pokémon once per turn while Suicune is Active; PvE and PvP reuse the forced-switch flow.
SM9 Emolga's Nuzzly Gathering searches the deck for one Pokémon with a Nuzzle attack and adds it to hand once per turn. The player and PvE opponent use attack-name filtering, and the deck is shuffled afterward.
SM9 Nidoqueen's Queen's Call searches for one Pokémon without a Rule Box and adds it to hand once per turn. Pokémon-GX and Pokémon-EX are excluded in player choices, server validation, and PvE selection.
SM9 Pidgeotto's Air Mail lets the player choose one of the top two cards for their hand and puts the other on the deck bottom once per turn; PvE takes the higher-HP card when both are available.
SM9 Absol's Dark Ambition adds one Colorless to the opposing Active Basic Pokémon's Retreat Cost while Absol is in play; Ability suppression disables the modifier.
SM9 Parasect's Panic Spores places two damage counters on each Confused opposing Pokémon between turns; the effect resolves for either side and only affects targets still Confused at checkup.
SM9 Muk's Poison Sacs preserves Poisoned on an opposing Pokémon when it evolves. Devolution is not currently modeled.

Mysterious Treasures Toxicroak prevents the opponent's Poisoned Pokémon from recovering when they evolve; its Level-Up wording is recognized too. Devolution is not modeled.

Delta Species Hypno prevents the opponent from evolving an Asleep Pokémon while Hypno remains active and unsuppressed. The printed Energy attachment restriction cannot be represented because battle Energy is held in a shared pool rather than attached to individual Pokémon.

Wizards Black Star Promos Entei can flip after surviving attack damage and shuffle itself plus its evolution stack into its owner's deck on heads. Asleep, Confused, or Paralyzed Entei cannot use this Power; Energy cards are not individually represented.

Legendary Collection Kabuto halves attack damage to itself after Weakness and Resistance, rounding down to the nearest 10. Its Power is disabled by any Special Condition and doesn't change other attack effects.

Forbidden Light Scatterbug can search for one Spewpa and one Vivillon on its owner's first turn when going second. PvP turn order is enforced, and the NPC opponent uses the search automatically when eligible.
SM9 Bronzong's Heatproof prevents attack damage from opposing Fire Pokémon using the general type-restricted damage prevention rule.
SM9 Bronzor's Evolutionary Advantage allows it to evolve during the second player's first turn. The battle evolution options, server validation, and PvE opponent use the correct side's first-turn permission.
SM9 Kakuna's Grass Cushion reduces attack damage by 30 after Weakness and Resistance when the shared Energy pool has Grass selected, using the same attachment approximation as other Energy-gated effects.
SM9 Klefki's Key of Secrets changes the Resistance value to -40 for its owner's Metal Pokémon when calculating attack damage; Ability suppression disables the board-wide modifier.
SM9 Cobalion-GX's Metal Symbol blocks and clears Special Conditions for its owner's Metal Pokémon while Metal is selected in the shared Energy pool; Ability suppression disables the immunity.
SM9 Lycanroc-GX's Twilight Eyes discards one Energy from the opponent's shared pool when Lycanroc evolves, representing an Energy attached to the opposing Active Pokémon.
SM10 Mismagius's Mysterious Message refills its owner's hand to seven cards and Knocks Out Mismagius if the Ability drew at least one card. The player and PvE opponent use the same direct-draw effect parsing and resolution.
SM11 Mawile-GX's Captivating Wink reveals the opponent's hand and puts all Basic Pokémon found there onto the opponent's Bench, bounded by open Bench slots. Player, PvP, and PvE resolution validate the source play, hand membership, Basic status, and capacity. The current UI does not offer the printed choice of how many Basic Pokémon to take.
SWSH7 Leafeon V's Greening Cells adds one Grass Energy to the shared pool and ends the turn, approximating its deck search and attachment because Energy cards are not in the Pokémon-only deck model. Player/PvP validation requires Grass selected and an available Energy slot; the PvE opponent follows the same rule.
SV2 Flamigo's Insta-Flock searches up to three matching Flamigo from the Pokémon deck into hand when played from hand onto the Bench. PvP and PvE enforce the hand-to-Bench trigger; the search shuffles the deck afterward.
XY7 Hoopa-EX's Scoundrel Ring searches up to three Pokémon-EX, except Hoopa-EX, from deck into hand on its hand-to-Bench play. The player can choose eligible cards; PvP and PvE validate subtype, exclusion, trigger, and count.
SWSH10 Bastiodon's Primal Fortress reduces damage to all friendly Pokémon by 30 after Weakness and Resistance against Pokémon V attacks. The shared target and attacker filters include V, VMAX, and VSTAR in PvP and PvE.
EX15 Kingdra ex δ's Extra Smoke reduces damage to friendly Stage 2 Pokémon-ex by 10 before Weakness and Resistance in PvP and PvE.
SWSH4 Diancie's Sparkle Veil reduces damage to friendly Pokémon by 30 after Weakness and Resistance while Diancie is Active, in both battle modes.
SV10 Steven's Carbink's Stone Palace protects Steven's Pokémon from 30 damage while Carbink is Benched, after Weakness and Resistance; multiple copies do not stack.
Skyridge Kakuna's Exoskeleton reduces attack damage to Kakuna by 10 after Weakness and Resistance through the shared target damage modifier.
EX8 Slaking's Lazy Aura reduces damage to Active Slaking by 30 before Weakness and Resistance against Pokémon-ex attacks.
DP2 Glalie's Craggy Face reduces damage to Active Glalie by 20 before Weakness and Resistance against Stage 2 attacks.
30th Celebration Yveltal's Life-Locked blocks healing on the opposing Active Pokémon while Yveltal is in play and unsuppressed. Healing checks keep Bench targets eligible.
SWSH3 Mimikyu's Heal Block prevents healing the opponent's Benched Pokémon through the same target-aware checks; Active targets remain eligible.
SWSH3 Dunsparce discards the top two Pokémon cards from the opponent's deck when attack damage Knocks it Out, respecting Ability suppression.
SWSH3 Ariados switches an opposing Benched Evolution Pokémon into the Active Spot when played from hand to evolve; PvP and PvE enforce the Evolution target restriction.
SWSH3 Darkrai's Dark Cloak uses the existing Energy-gated damage reduction, treating available selected Darkness Energy as its attached Energy condition.
SWSH3 Vanilluxe's Bitter Cold flips once per turn while Active to Paralyze the opposing Active Pokémon on heads, with suppression and status protection respected in PvP and PvE.
SWSH3 Corviknight returns a selected friendly Pokémon, except Corviknight, and its Evolution stack to hand when played from hand to evolve. Returning the Active Pokémon requires a legal promotion; individual attached cards are not tracked.
XY Black Star Promos Vibrava reduces its Retreat Cost to zero when it is the Pokémon retreating and the shared Energy pool represents an attached Basic Energy; the Psychic variant additionally requires Psychic selected. Individual Energy attachments are not tracked.
Dragon Vibrava's Levitate sets its Retreat Cost to zero whenever the shared Energy pool is nonempty, approximating any Basic Energy attached to Vibrava.
Phantasmal Flames Mismagius ex Confuses the opponent's incoming Active Pokémon after their Active Pokémon moves to the Bench during their turn. This uses the normal status protection and Ability suppression checks and triggers for retreats and supported switch effects.
Temporal Forces Magcargo Burns the opponent's incoming Active Pokémon after their Active Pokémon moves to the Bench during their turn. It uses the same protected status trigger and can function from either board row.
Phantasmal Flames Brambleghast can Confuse the opponent's Active Pokémon when evolved. It uses the existing evolution Ability choice and status protection.
Chilling Reign Porygon-Z may Confuse the opponent's Active Pokémon after an Energy charge. Because individual attachments are not represented, any charge while Porygon-Z is in play acts as the attachment trigger.
Destined Rivals Team Rocket's Ampharos places 4 damage counters on an opponent's Pokémon when it evolves from hand. Only one Darkest Impulse effect resolves per evolution, and a resulting Knock Out is processed through the existing evolution action flow.
Mega Evolution Tinkatuff can flip a coin when evolved; heads discards one shared Energy from the opponent's pool, representing Energy on their Active Pokémon. Tails leaves the pool unchanged.
Arboliva's evolution Ability can heal all damage from one chosen friendly Pokémon. The targeted heal flow is shared with Dragonite's Max Wind and respects healing prevention.
Wisdom of Sea and Sky Porygon2 can evolve itself by taking a random matching Evolution from the Pokémon deck after an Energy charge. Energy attachments are shared, so Porygon2 in play receives the trigger approximation; the standard evolution validator still checks locks and timing.
Wizards Black Star Promos Articuno prevents attacks from affecting your Benched Pokémon while Articuno is Active and free of Special Conditions. Both attack damage and attack effects use the shared protection checks.
Dragon Crawdaunt's Swirling Current adds 10 damage before Weakness and Resistance when one of your Active Pokémon attacks the Defending Pokémon. Crawdaunt must be Active; Ability suppression and opposing Ability effect protection are respected.
Mysterious Treasures Honchkrow grants each Murkrow its attacks for no Energy cost while Honchkrow can pay the copied attack's cost. The shared Energy pool and selected type approximate Honchkrow's attached Energy.
Pokémon GO Moltres, Zapdos, and Articuno boost other Basic Pokémon of their respective types by 10 attack damage before Weakness and Resistance; the matching bird is excluded from its own boost.
Legendary Collection Dodrio reduces its Active Pokémon's Retreat Cost by one Colorless Energy while Dodrio is Benched. Wording that omits the numeral still means one Energy; retreat cost cannot fall below zero.
Twilight Masquerade Ariados increases the opponent's Active Evolution Pokémon's Retreat Cost by one Colorless Energy while Ariados is in play. The rule applies only to an evolved Active Pokémon and respects Ability suppression.
SM and HGSS Black Star Promos Latias give its owner's Latios in play no Retreat Cost while Latias is in play and unsuppressed; both printings use the same partner rule.
Aquapolis Arcanine reduces its own Retreat Cost by the number of Energy represented in its owner's shared pool. The engine cannot track individual attachments, so any available Energy type counts for this printed any-Energy discount.
Fusion Strike Ninetales reduces the Retreat Cost of a friendly Pokémon by two when the shared Energy pool represents Fire Energy. The engine cannot verify an attached Fire Energy on each target, so this approximates its team-wide attachment condition; the Dragon Frontiers Latias/Latios free-retreat wording is also now included in the audit because its named target rule was already supported.
Deoxys Crawdaunt reduces damage from opponent attacks by 10 per modeled Darkness Energy, up to 20, after Weakness and Resistance. Individual attachments are not represented, so selected Darkness Energy on Crawdaunt's side approximates its attached Darkness Energy.
Legends Awakened Probopass and Stormfront Pupitar use the same capped Energy-based reduction: Probopass requires Metal Energy and opponent attacks; Pupitar counts any Energy and reduces damage from any attack. The shared pool approximates attachments, with caps of 20 and 30 respectively.
Deoxys Starmie and Hidden Legends Staryu reduce damage after Weakness and Resistance when Psychic Energy is selected in their owner's shared pool. The same typed attached-Energy guard also handles BREAKthrough Raikou's Lightning Energy wording; individual attachments are not tracked.
Stormfront Dusknoir places one damage counter on each opposing Pokémon between turns while Dusknoir is Active, provided the opponent has Energy in the shared pool. Since Energy attachments are not tracked by Pokémon, any Energy on that side approximates the printed per-target attachment condition.
HS—Triumphant Magby and Call of Legends Mime Jr. prevent attack damage while Asleep. These Poké-Bodies remain active under their stated Special Condition and use the normal target damage-prevention path.
Lanturn, Magcargo, Medicham, and Slowbro gain the two printed types in their Energy-gated type abilities when the selected shared Energy type matches the required attachment. This updates the effective types used by Weakness, Resistance, and type-based effects; individual attachments are not tracked.
Sandstorm Kecleon's Energy Variation changes its effective type to the selected shared Energy type while its owner has Energy. Multiple attached Basic Energy types cannot be represented simultaneously, so the shared selection supplies the single modeled type.
Dragon Frontiers Pinsir reduces attack damage by 30 after Weakness and Resistance while the attacking player's hand has at least five cards. Hand size is tracked by the battle state; Trainer cards are not represented in those hands.
Furious Fists Aurorus reduces attack damage to friendly Water Pokémon by 20 after Weakness and Resistance while Water is selected in the shared Energy pool. That selection approximates Water Energy attached to each target.
Team Rocket Returns Rocket's Snorlax ex heals 10 damage between turns when Darkness is selected in its owner's shared Energy pool. This approximates its attached Darkness Energy requirement; healing prevention and Ability suppression still apply.
Dragon Majesty Shelgon takes 20 less attack damage after Weakness and Resistance when its owner has Energy in the shared pool. This approximates its attached Basic Energy requirement; the battle model does not distinguish attachments by Pokémon.
Crystal Guardians Igglybuff reduces the Retreat Cost of its owner's Jigglypuff, Wigglytuff, Wigglytuff ex, and Igglybuff by one Colorless Energy while Igglybuff is in play.
Aquapolis Magnemite reduces its Retreat Cost by one Colorless Energy for each living Magnemite on its owner's Bench, including the older Poké-Body wording.
Aquapolis Hoppip and Skiploom each reduce their own Retreat Cost by one Colorless Energy per modeled Grass Energy. The shared Energy pool and selected Grass type approximate their attached Grass Energy.
Delta Species Beldum reduces its own Retreat Cost by one Colorless Energy for each living Beldum on its owner's Bench; its legacy Poké-Body wording shares the same count rule.
HS—Triumphant Absol places two damage counters on an opposing Basic Pokémon when it is played from hand onto the Bench, provided Absol is Active and its Ability is not suppressed.
Power Keepers Medicham increases attack damage by 10 before Weakness and Resistance whenever either Active Pokémon attacks an Active target. Its aura follows the same active Ability and suppression checks as Vigoroth's equivalent effect.
HS—Triumphant Venomoth's Poison Pollen is available as a once-per-turn status Power. A coin flip Poisons the opponent's Active Pokémon on heads or your own Active Pokémon on tails, and Venomoth cannot use it while affected by a Special Condition.
Generations and Flashfire Snorlax's Stir and Snooze now replaces its between-turn sleep recovery check with two recorded coin flips. Snorlax wakes only when both are heads; otherwise it remains Asleep. The effect applies while Snorlax is Active and its Ability is not suppressed.
Evolution protection now recognizes both printed phrasings for preventing all attack damage and effects to the newly evolved Pokémon through the opponent's next turn. The protection uses the existing incoming attack modifier and suppression checks.
Deoxys-EX's Power Connect now adds 10 damage before Weakness and Resistance to Team Plasma Pokémon attacks against the Active Pokémon, excluding Deoxys-EX itself. Eligibility uses the attacker's Team Plasma subtype.
Black Bolt Klinklang's Gear Coating reduces attack damage to friendly Pokémon by 20 after Weakness and Resistance while Metal is selected in the shared Energy pool. This approximates whether each target has Metal Energy attached, matching the engine's existing shared-Energy model.
Perfect Order Aurorus's non-stacking Tundra Wall reduces attack damage to Water Pokémon by 50 after Weakness and Resistance while Water is selected in the shared Energy pool, approximating attached Water Energy.
Journey Together Regirock's and Crown Zenith Zamazenta's generic Energy shields reduce attack damage to themselves by 30 after Weakness and Resistance when the owner's shared Energy pool is nonempty. The pool approximates whether that Pokémon has an Energy attached.
Mega Rising and Black Bolt Eiscue's Ice Face is now included in the supported damage-shield audit: its existing target modifier reduces opponent attack damage by 40 while Eiscue is at full HP.
Secret Wonders Kecleon's Camouflage reduces attack damage by 40 after Weakness and Resistance when the selected shared Energy type matches the attacker's type. The shared Energy pool approximates a matching Basic Energy attached to Kecleon.

Plasma Storm Lampent and Zubat's conditional retreat Ability now removes their Retreat Cost when the shared Energy pool is empty. This approximates having no Energy attached to that Pokémon.

Noble Victories Carracosta's existing Ability support reduces post-Weakness/Resistance attack damage by 50 when its coin flip is heads. The generated scan now recognizes this exact rule; the audit counts 2,750 of 4,537 ability records with printed text.

Paradox Rift Spinda's Confusion-triggered shield now flips a coin when Spinda takes attack damage while Confused; heads prevents that damage. It uses the engine's existing status and damage-prevention flow, and is included in the refreshed audit total of 2,751 of 4,537 records.

Aquapolis Jumpluff and Deoxys Swablu now flip for attack damage when they already have damage counters; heads prevents the damage. Their printed effects also stop other effects of the attack, which the battle resolver does not currently block through this coin shield. The scan recognizes the damage-prevention behavior in 2,754 of 4,537 records overall.

Temporal Forces Incineroar ex reduces the Colorless portion of its attack costs by one for each living Pokémon on the opponent's Bench, up to the attack's printed Colorless cost. The current attack-cost resolver applies this rule before checking available Energy; the audit now recognizes 2,756 of 4,537 records.

Plasma Blast Drifblim's attacks cost one fewer Colorless Energy for each living opposing Team Plasma Pokémon in play, capped at the attack's printed Colorless cost. The ability support audit now recognizes 2,757 of 4,537 records.

HGSS Black Star Promos Porygon2 reduces the Retreat Cost of your Porygon, Porygon2, and Porygon-Z in play by one Colorless Energy. The effect applies to matching living Pokémon on the board; the audit now recognizes 2,758 of 4,537 records.

Skyridge Dunsparce has no Retreat Cost while the opponent's Active Pokémon is a living Stage 1 or Stage 2 Pokémon. This is checked against the current opposing Active Pokémon; the scan now recognizes 2,759 of 4,537 records.

The Retreat Cost audit now also recognizes Energy-typed retreat reductions already supported for Supreme Victors Arcanine G and Call of Legends Entei, Raikou, and Suicune. Their selected shared Energy type must match the printed type, and the shared pool estimates the number of attached Energy; the total is 2,763 of 4,537 records.

Unified Minds Golisopod now has no Retreat Cost when the shared Energy pool contains two or fewer Energy. This models its attached Energy threshold using the current shared-pool approximation; the audit recognizes 2,764 of 4,537 records.

Fantastical Parade Meloetta now puts a random Psychic Pokémon from its deck into its hand at the start of its turn when it is Active. The ability uses the modeled Pokémon deck and hand, and is suppressed by Shady Tail; the audit recognizes 2,766 of 4,537 records.

Obsidian Flames Trevenant places one damage counter on the opponent's Active Pokémon during Pokémon Checkup while Trevenant is Active. Destined Rivals Team Rocket's Tyranitar places two counters on each opposing Basic Pokémon during Checkup while Active. The end-of-round Ability resolver now handles both; the audit recognizes 2,768 of 4,537 records.

Lost Origin Pyroar now makes Pokémon Checkup place four damage counters instead of two on the opponent's Burned Pokémon. This uses the status-damage bonus pipeline and brings the audit to 2,769 of 4,537 records.

Legend Maker Misdreavus now makes both players flip two coins for each Asleep Pokémon during between-turn recovery while Misdreavus is Active. The Pokémon wakes only when both coins are heads; the scan recognizes 2,770 of 4,537 records.

Paldea Evolved Slaking now flips two coins instead of one for its own Asleep recovery during Pokémon Checkup. A heads result on both coins wakes it; global two-coin sleep effects take precedence so the same Pokémon is not checked twice. The audit recognizes 2,771 of 4,537 records.

Obsidian Flames Togekiss draws until its hand has 8 cards and Pokémon GO Radiant Venusaur draws until its hand has 4 cards after attacking, before the next turn begins. The ability does not trigger when ending the turn by charging.

Silver Tempest Metagross may put itself onto the Bench when drawn for the turn if space is available, then draws up to 3 additional cards. This extends the existing draw-to-Bench turn-start effect and uses the Pokémon-only deck model.

Extradimensional Crisis Nihilego adds 10 damage to the opponent's Active Pokémon's Poison damage during Pokémon Checkup. This modifier uses the existing status-damage calculation and is suppressed when Nihilego has no usable Ability.

Secluded Springs Zoroark, after its attack damage Knocks Out the opponent's Active Pokémon, prevents attack damage and effects to itself during the opponent's next turn. This uses the existing incoming-attack protection timer.

Crimson Blaze Ariados increases the opponent's Active Pokémon's Retreat Cost by 1 while Ariados is in play. The retreat resolver now accepts printed numeric increases as well as Colorless Energy symbols.

Plasma Blast and Boundaries Crossed Dusknoir can repeatedly move one damage counter from one of the opponent's Pokémon to another. This uses the existing damage-counter movement action, including its checks for valid sources, targets, and prevention effects.

Emerald Claydol and POP Series 4 Flygon have no Retreat Cost while their Pokémon has Energy attached. The rule uses the shared Energy pool as an approximation for attached Energy.

Skyridge Vaporeon, Flareon, and Jolteon clear their Special Conditions when an Energy of the matching printed type is attached from hand. The Energy-charge handler now checks the selected type before applying their recovery Ability.

Cosmic Eclipse Wishiwashi checks at the end of the opponent's turn while it has damage counters. On tails, it and its Evolution cards are shuffled into the owner's Pokémon deck; on heads, it stays in play. The check uses the battle engine's coin and deck-shuffle state.

Call of Legends Phanpy reduces attack damage by 10 while it has Energy attached; Dragon Shelgon reduces attack damage by 10 while it has basic Energy attached; Team Rocket Returns Rocket's Zapdos ex reduces attack damage by 10 while it has Darkness Energy attached. These checks use the shared Energy pool as an approximation of attached Energy, with a Darkness-type check for Rocket's Zapdos ex.

Skyridge Abra has no Retreat Cost while Psychic Energy is selected and present in the shared pool. Crystal Guardians Kyogre ex reduces the Retreat Cost of your Kyogre ex to zero while the shared Energy pool is at 1 or less. Both use the pool as an approximation for Energy attached to the specified Pokémon.

Dragon Frontiers Jynx reduces the Retreat Cost of your Fire and Psychic Pokémon by one while Jynx is evolved.

Obsidian Flames Clefable ex gives your Pokémon with Psychic Energy no Retreat Cost. The check uses the shared Energy pool and selected type to approximate individual attachments.

Legendary Treasures Serperior's Energy Stream removes its Retreat Cost when Grass is selected in the non-empty shared Energy pool, approximating the printed attached Grass Energy requirement.

Scarlet & Violet Slowbro can repeatedly move one damage counter from another friendly Pokémon to itself through the existing damage-counter movement Ability flow.

DP Black Star Promos Gliscor keeps opposing Pokémon's modeled Special Conditions when they evolve while Gliscor is Active. Devolution preserves Special Conditions in the existing state transition; Level-Up cards are handled by the evolution path.

Perfect Order Decidueye ex ignores Colorless Energy in its attack costs when its opponent's hand has exactly four cards. The effect is checked against the modeled opposing hand and each attack's Colorless cost.

Persian's Caturday Ability removes the full Energy cost from attacks named Caturday used by friendly Pokémon in play. It checks all friendly Ability providers and the attacking Pokémon's listed attacks.

Cosmic Eclipse Lycanroc reduces its attacks' Colorless Energy cost by three while the opposing board contains a Pokémon-GX or Pokémon-EX.

Crystal Guardians Cacturne can place one damage counter on a damaged opposing Pokémon once per turn. The target selector filters to damaged Pokémon, and Cacturne must be Active and free of Special Conditions.

Delta Reign Wishiwashi ex can use Oceanic Gain once per turn while Active to heal 50 damage from itself. The standard healing prevention, use limit, and Ability suppression checks apply.

Braviary, Flygon-EX, and Suicune's once-per-turn Active abilities force the opponent to switch their Active Pokémon. The opponent selects a Benched replacement; the Ability holder must be Active.

Regidrago's Dragon's Hoard draws to four cards once per turn while it is Active. The engine shares the use limit across Regidrago copies and respects Special Condition restrictions.

Delta Species Porygon2 can draw to six cards once per turn when its owner has fewer than six cards in hand. Special Conditions block the Ability, and the refill uses the normal Pokémon-only deck draw flow.

HS—Triumphant Magnezone can use Magnetic Draw once per turn to draw until its owner has six cards in hand. The engine applies Magnezone's Special Condition restriction and stops drawing when its Pokémon deck is empty.

Hisuian Decidueye VSTAR can draw until its owner's hand has eight cards with its once-per-game VSTAR Power. The battle state shares the VSTAR use limit across VSTAR effects.

151 Dodrio and Paldean Fates Dodrio can use Zooming Draw once per turn to put one damage counter on themselves and draw a card. The counter is applied through the direct Ability draw aftermath.

Shining Legends and SM Black Star Promos Marshadow can use Let Loose when played from hand onto the Bench. Both players shuffle their hand into their Pokémon deck and draw up to four cards; the engine applies the bench-entry trigger to player and opponent turns.

Aquapolis Nidoking can use Earth Rage once per turn while Active and free of Special Conditions. A heads flip places one damage counter on each opposing Benched Pokémon.

Holon Phantoms Kingdra δ can place two damage counters on an opposing Pokémon with δ on its card once per turn while Active and free of Special Conditions. The target list filters to δ Pokémon.

Unbroken Bonds Tyrogue can use Bratty Kick once per turn to flip for three damage counters on an opposing Pokémon. Using it ends the player's turn, including when the flip is tails.

Unbroken Bonds Poliwag can Confuse the opponent's Active Pokémon with its one-time first-turn Ability when its owner goes second. The battle state’s PvP turn-order flag gates the action, and the opponent AI uses it automatically when it goes second.
SV3.5 and SV4.5 Starmie can once per turn place two damage counters on an opposing Pokémon, then Knock itself Out. It uses the shared activated counter action and normal Knock Out cleanup; the engine does not track individual attached cards.
151 Weezing and Secluded Springs Galarian Cursola use the shared Perish Body retaliation when Knocked Out by an opponent's attack while Active. A heads flip Knocks Out the attacker, and Ability suppression prevents the effect.
30th Celebration Gengar ex's Fainting Spell uses the same coin-flip Knock Out retaliation without requiring Gengar to be Active.
Mega Rising Jellicent's Bouncy Body responds to attack damage while Jellicent is Active by adding one Water Energy from the Energy Zone to the shared pool, provided it survives and has a Benched Pokémon. The engine runs other Energy attachment Abilities for this attachment; Ability suppression disables Bouncy Body.
Destined Rivals Team Rocket's Koffing uses Smog Signals when Active Koffing takes attack damage, including damage that Knocks it Out. It searches up to two Koffing-name Pokémon from its owner's Pokémon deck onto the Bench, subject to Bench capacity and Eternatus expansion rules.
Chaos Rising Chesnaught's Needly Armor places three damage counters on the attacking Pokémon for each Grass Energy represented in the shared pool when Active Chesnaught takes attack damage, including a Knock Out. Ability suppression disables it.
Chaos Rising Delphox's Flaring Magic spends one shared Fire Energy, then draws until the hand contains seven cards. The Ability is once per turn and checks the Fire Energy type in the pool.
Journey Together Mamoswine ex can use Mammoth Hauler once per turn to choose one Pokémon from its Pokémon deck, put it into hand, and shuffle. The opponent resolves the search automatically.
Trainer-name search Abilities are also supported for Cynthia's Gabite and Erika's Tangela: they find one matching Pokémon by name from the Pokémon-only deck and shuffle afterward.
Genetic Apex Porygon can once per turn inspect the top card of its owner's deck through the existing private deck-peek flow.
Fantastical Parade Spiritomb's Final Scream deals 10 damage to each opposing Pokémon when Spiritomb is Knocked Out by attack damage while Active. The engine applies the damage through its shared attack-reaction cleanup, and Ability suppression disables the effect.
Mega Rising Chandelure can discard the top Pokémon card of the opponent's deck once per turn in PvE and PvP battles. The discarded Pokémon enters the opponent's discard pile, and Chandelure's Ability does not consume the turn.
Ascended Heroes Silcoon can search its owner's Pokémon deck for one Silcoon or Cascoon and put that Evolution Pokémon onto the Bench when Silcoon evolves from the hand. The deck is shuffled afterward; player and NPC opponent searches respect Bench capacity and Eternatus rules.
Silver Tempest Claydol can use its once-per-turn Fighting Energy recovery Ability when the discard pile has no Supporter cards. Because this battle format models Energy in a shared pool and its card zones contain Pokémon only, the Ability adds one Fighting Energy to the shared pool.
Unified Minds and SM Black Star Promos Amoonguss can inflict Sleep and Poison on the opponent's Active Pokémon whenever its owner plays a Pokémon with the Spore attack from hand. This trigger works on Basic plays and Evolutions, in player and NPC flows, and is disabled while the Amoonguss Ability is suppressed.
Ascended Heroes Team Rocket's Dugtrio places two damage counters on the opponent's Active Pokémon when it retreats to the Bench during that opponent's turn. It uses the shared retreat reaction and ignores Weakness and Resistance, as printed.
Stormfront and DP Black Star Promos Heatran LV.X keeps opposing Burned Pokémon Burned through evolution and forces their Burn recovery check to tails while Heatran is in play. Ability suppression disables both effects.
Aquapolis Porygon2 can use its once-per-turn hand refill when its owner has two or fewer cards: it draws Pokémon cards until the hand reaches three. Any Special Condition blocks the Power.
Destined Rivals Team Rocket's Orbeetle can repeatedly move one damage counter from one of its owner's Team Rocket Pokémon to another friendly Pokémon. The existing damage-counter movement choice checks the source Pokémon's name.
Gengar from Sword & Shield and its Black Star Promo can repeatedly move one damage counter between friendly Psychic Pokémon. Both source and destination must be Psychic type.
Unbroken Bonds Vileplume can flip once per turn and, on heads, its owner chooses Asleep, Burned, Confused, or Poisoned for the opponent's Active Pokémon. The opponent AI also uses the Power and chooses an available condition.
Togetic, Blissey, and Togekiss heal the damaged Active Pokémon when played from hand to evolve, with the amount set by the Ability. The shared evolution resolver applies opposing healing prevention and also covers Ability-triggered Evolutions.
Goodra's Slimy Sliding checks the opponent's retreat before Energy is discarded or Pokémon switch. Tails cancels the retreat; only one Goodra check applies even if multiple copies are in play.
Vivid Voltage Clefable's once-per-turn Ability heals 20 damage from an Active Pokémon and removes one Special Condition. Its attached Psychic Energy requirement uses the selected type in the shared Energy pool as an approximation.
Vivid Voltage Jirachi's Stellar Wish inspects the top two cards of the Pokémon-only deck once per turn while Active, adds one to hand, and leaves the other on top. Players choose the card; the PvE opponent takes the higher-HP card.
Extradimensional Crisis Luxray reduces damage from attacks used by the opponent's Active Pokémon by 20 while Luxray is Active, before Weakness and Resistance. Ability suppression disables the effect.
Conditional free-Retreat Abilities can now set the holder's Retreat Cost to zero when the selected shared Energy type matches the printed requirement, or when any Energy is in the pool for unrestricted Energy requirements. This approximation applies to matching individual Pokémon cards; the engine does not track which Pokémon has the Energy.
Natu, Xatu, and Suicune reflect Burn and Poison from an opponent's attack onto the attacker, including when the holder is Knocked Out. The resolver uses the attack's newly applied status events and checks Ability suppression.
Mew's Lost Zone Ability copies attack options from Pokémon in either player's Lost Zone. The copied attack retains its normal Energy requirement.
Deoxys Crobat ex's Shadow Guidance uses the targeted damage-counter Ability flow, requiring Crobat ex to be Active and free of Special Conditions. Ability suppression also disables it.
Aquapolis Hypno's Sleep Pendulum makes the opposing Active Pokémon Asleep once per turn while Hypno is Active and free of Special Conditions.
Turtonator and Klawf discard one Energy from the attacking side's shared Energy pool when their Active holder takes attack damage, including damage that Knocks it Out. The model does not identify attached Energy by Pokémon.
Aerodactyl and Shiftry ex trigger reactive damage after an opponent's Poké-Power action, placing two damage counters on the Pokémon that used it. The trigger distinguishes Poké-Powers from other Ability types and respects Ability suppression.
Garchomp's Dragon Intimidation removes one Energy from the attacking side's shared pool when Garchomp is Active and damaged by an opponent's attack. Lugia ex's Silver Sparkle does the same on heads. Both trigger even if their holder is Knocked Out; individual attached Energy is not modeled.
HGSS Black Star Promos Shuckle's Fermenting Liquid draws one card per Energy added to its owner's shared pool while Shuckle is in play. Because the model uses a shared Energy pool, it cannot distinguish hand attachment from other Energy additions.
Promos-A Cresselia ex's Lunar Plumage heals 20 damage per Psychic Energy added to the shared pool, subject to healing prevention.
Legend Maker Arcanine ex's Fire Remedy removes one damage counter and clears all Special Conditions for each Fire Energy added while Arcanine ex is in play. Healing prevention applies to damage recovery but not condition recovery.
Ancient Origins Goomy's Water Down searches a Goomy onto the Bench for each Water Energy addition while the Ability holder is in play, stopping at the Bench limit. Because Energy is shared, the engine cannot track the recipient Pokémon.
Aquapolis Muk's Grass Energy condition adds two Colorless to its Retreat Cost, approximated using the selected shared Energy type.
Mysterious Treasures Nidoqueen reduces the Colorless cost of attacks used by your Nidoran, Nidorina, Nidorino, and Nidoking by one while Nidoqueen is in play.
HS—Triumphant Yanmega's Insight makes all of its attacks free when both players have the same number of cards in hand.
Silver Tempest Medicham reduces its attacks' Colorless cost by three when its owner has exactly four cards in hand.
Lost Origin Cramorant ignores all Energy in its attack costs when its owner has at least four cards in the Lost Zone.
Arceus Charizard's Battle Aura adds 10 pre-Weakness damage per living Benched Fire Pokémon to each Charizard attack against the opposing Active Pokémon.
Mysterious Treasures Garchomp's Rainbow Scale adds 40 pre-Weakness damage if the opposing Active Pokémon is weak to the selected shared Energy type. Special Energy cards are not modeled, so its exclusion cannot be separately tested.
Noble Victories Chandelure's Cursed Shadow can assign its three damage counters individually among opposing Pokémon while Chandelure is Active. The battle log and damage events preserve the resulting per-Pokémon distribution.
Plasma Freeze Cofagrigus can Knock Itself Out to distribute three damage counters among opposing Pokémon using the same target assignment controls.
Cosmic Eclipse Stoutland's Arf Arf Bark discards one Energy from the opponent's shared pool when Stoutland evolves, and again if Active Stoutland is Knocked Out by an opponent's attack. The shared pool cannot identify Energy attached to the opponent's Active Pokémon.
Generations Froslass's Drag Along now recognizes its printed Active Pokémon Knockout wording and flips for a Knockout of the attacker on heads.
Legendary Collection Drowzee's and HeartGold & SoulSilver Hypno's coin-flip Sleep Powers are now recognized in the audit; the shared status flow applies Sleep to the opponent on heads and to your Active Pokémon on tails where printed.
Sun & Moon Pyukumuku's Active Knockout Ability now recognizes its alternate opponent-attack wording and places six damage counters on the attacker.
Unseen Forces Poliwrath's Active Knockout Ability now recognizes its named-Pokémon text and Confuses the attacking Pokémon.
Paradox Rift Gourgeist and Hidden Fates Arbok discard up to two random cards from the attacking player's hand when Knocked Out by an opponent's attack; discarded cards go to that player's discard pile.
Silver Tempest Krookodile discards one random card from the opponent's hand when evolved, and a random card from the attacking player's hand if Active Krookodile is Knocked Out by an opponent's attack.
Plasma Storm Weezing discards the top three cards of the opponent's deck when Knocked Out by an opponent's attack; the existing two-card Knockout deck-discard trigger now uses each card's printed count.
Diamond & Pearl Rhyperior's evolution Ability discards the top three cards of the opponent's deck; the evolution handler now recognizes abilities that name their Pokémon instead of using “this Pokémon.”
Delta Species Flareon ex's Evolutionary Flame applies Burn and Confusion to the opposing Active Pokémon when Flareon ex evolves from hand.
Lost Origin and Crown Zenith Eelektrik can flip for Paralysis when evolved; heads applies Paralysis to the opponent's Active Pokémon.
Sun & Moon Komala's Comatose makes it Asleep when Energy is attached from the hand while it is Active.
Journey Together Hop's Dubwool can choose an opposing Benched Pokémon to switch into the Active Spot when it evolves from hand.
Fusion Strike Butterfree can apply Burn, Confusion, and Poison to the opponent's Active Pokémon when it evolves from hand.
XY Black Star Promos Greninja gains protection from all attack effects, including damage, during the opponent's next turn when it evolves from hand.
Lost Thunder Dustox applies Paralysis and Poison on evolution and raises that Pokémon's Poison checkup damage to 30 until its Special Conditions clear.
Guardians Rising Salazzle applies Burn and Poison to the opposing Active Pokémon when it evolves from hand.
Ruby & Sapphire and Power Keepers Combusken clear all Special Conditions after a Fire Energy charge, approximated as an attachment to Active Combusken because individual Energy attachments are not tracked.
Ruby & Sapphire Grovyle and Marshtomp and Deoxys Lombre use the same Active Pokémon charge approximation for their matching Grass or Water Energy recovery Abilities.
Supreme Victors Roserade C clears all Special Conditions after an Energy charge when Active; individual Energy targets are not tracked.
Natural Cure and Water Veil wording that clears all Special Conditions on an Energy attachment also resolves when the holder is Active. Individual Energy targets are not tracked.
Skyridge's named Flareon, Jolteon, and Vaporeon status recovery follows the same active charge approximation and checks the printed Energy type.
Crown Zenith Radiant Charjabug puts two damage counters on the charging side's Active Pokémon V after either side charges Energy; this models the untracked attachment target as the Active Pokémon V.
Lost Thunder Primarina's Harmonics increases a normal turn charge by one additional shared Energy while an unsuppressed Primarina is in play. Ability- and Trainer-sourced attachments remain outside this hand-charge approximation.
Mysterious Treasures Crobat's evolution Ability lets the player choose an opposing Active Pokémon to Poison and increases its Poison Checkup damage to 20 until its Special Conditions clear.
Mysterious Treasures Magmortar LV.X can use Torrid Wave while Active to Burn a chosen opposing Active Pokémon and increase its Burn Checkup damage to 30 until the condition clears.
Mysterious Treasures Typhlosion's Firestarter adds one Fire Energy from its discard pile to the shared Energy pool once per turn, if Typhlosion has no Special Conditions and its side has a Benched Pokémon. The individual attachment target is not tracked.
Mysterious Treasures Mesprit's Upper Material removes retreat costs from Uxie, Mesprit, and Azelf on both sides while its owner has Uxie and Azelf in play. The effect applies through the shared retreat-cost resolver and respects Ability suppression.
Mysterious Treasures Ninetales can use its once-per-turn Power to copy every type of a chosen opposing Pokémon until the end of the turn. The temporary type override preserves multi-type Pokémon and is cleared when the turn ends; Special Conditions and Ability suppression prevent use.
Mysterious Treasures Lumineon can switch an opposing Benched Pokémon with 100 or more maximum HP into the Active Spot once per turn. Lumineon must be Active and free of Special Conditions; Ability suppression also applies.
Mysterious Treasures Unown M can flip once per turn while Active and switch a chosen opposing Benched Pokémon into the Active Spot on heads. The Power is blocked by any Special Condition and Ability suppression.
Mysterious Treasures Unown T can discard one chosen card and flip once per turn while Active; heads places two damage counters on a chosen opposing Benched Pokémon. The card is discarded before the coin flip, and Special Conditions or Ability suppression prevent use.
Mysterious Treasures Lucario LV.X's evolution Power protects it from all attack effects during the opponent's next turn, including damage. The protection is Active-only and is cleared when Lucario leaves the Active Spot.
Mysterious Treasures Unown I can search for a Trainer card when Unown I, T, E, and M are on its Bench. All copies of Unown I share the once-per-turn limit.
Mysterious Treasures Slaking's Lazy Power flips once per turn while Active. Heads sets Lazy Blow's base damage to 130 for the turn; tails prevents attacks and retreat for that turn. Leaving the Active Spot clears the effect.
Unified Minds Whimsicott can choose any card from the deck to add to hand when it evolves from hand.
Fusion Strike Feraligatr's evolution Ability flips a coin and discards five cards from the opponent's deck on heads or its controller's deck on tails.
Secret Wonders Entei discards three cards from the opponent's deck when Entei's attack Knocks Out an opposing Pokémon with damage.
Legendary Collection Haunter's Transparency flips when an attack affects Haunter; heads prevents all attack effects, including damage, and any Special Condition disables the Power.
Vivid Voltage Ninjask can search its deck for Shedinja and put it onto the Bench when it evolves from hand.
Lost Thunder Ninjask can put a Shedinja from its owner's discard pile onto the Bench as a Basic Pokémon when it evolves from hand.
151 Gyarados's mandatory evolution Ability discards the top five cards of its controller's deck.
Next Destinies Shiftry can flip on evolution and shuffle a chosen opposing Pokémon and its Evolution cards into its owner's deck on heads. Individual attached cards are not tracked.
Wizards Black Star Promos Mew is unaffected by attacks from evolved Pokémon while it is not Asleep, Confused, or Paralyzed. This blocks attack damage and other attack effects, subject to Ability suppression.
Mysterious Treasures Blissey's Kind Egg returns up to the shared Energy count of chosen hand cards to the deck, shuffles, and draws the same number. It requires Happiny in Blissey's Evolution stack and no Special Condition.
Mysterious Treasures Mr. Mime's Mime Protection prevents attack damage when the opposing side has two or fewer shared Energy, approximating the printed attached-Energy condition. When Mime Jr. is anywhere in Mr. Mime's evolution stack, it blocks all attack effects, including damage. Ability suppression disables both protections.
Mysterious Treasures Uxie's reactive Poké-Power disables the exact attack that damaged it for the attacking Pokémon's next turn, including when Uxie is Knocked Out. It triggers once per turn and Ability suppression disables it.
Mysterious Treasures Walrein's evolution Ability flips two coins; if both are heads, it discards the opponent's Active Pokémon and its Evolution cards without counting as a Knock Out or awarding a Prize. The effect is optional for players and automatic for PvE opponents. Individual attached cards are not represented.
Secret Wonders Qwilfish's Balloon Sting flips once per opponent's turn when Active Qwilfish is damaged by an attack, even if Knocked Out. Heads Poisons the attacker and raises its Poison checkup damage to 20; Ability suppression disables the effect.
Secret Wonders Weavile's Dark Engage changes each of its owner's Active Pokémon to Darkness type until the turn ends. Ability suppression disables it.
Secret Wonders Muk's Toxic Sludge Poisons opposing Active Pokémon between turns when Grass is selected in the opposing side's shared Energy pool, approximating its individual Grass attachment condition. It does nothing to already-Poisoned Pokémon and respects Poison protection.
Secret Wonders Suicune's Aqua Recovery is supported as a once-per-turn Bench-entry Power. It returns up to three Water Pokémon from that side's discard pile to hand and is unavailable when Suicune's Abilities are suppressed.
HeartGold & SoulSilver—Unleashed Torkoal's Hot Snort is supported as a Bench-entry Power in PvP and PvE. On heads, it Burns the opposing Active Pokémon; the player chooses whether to use it and normal Special Condition rules apply.
HeartGold & SoulSilver—Triumphant Unown removes all Special Conditions from its owner's Active Pokémon when played from hand onto the Bench.
HeartGold & SoulSilver—Triumphant Celebi can use its once-per-turn Active-only Power to add one selected Grass Energy to the shared pool while free of Special Conditions.
Temporal Forces and Prismatic Evolutions Dudunsparce can draw 3 cards once per turn, then shuffle itself and its Evolution cards into its owner's deck if at least one card was drawn. The shared Energy pool remains unchanged because Energy is not tracked on individual Pokémon.
Dragons Exalted Ninjask's Cast-off Shell searches the deck for Shedinja when Ninjask evolves and puts it onto the Bench as a Basic Pokémon.
Plasma Storm Manaphy's Final Wish triggers on Knockout from an opponent's attack. It draws one card to approximate the printed search for any card.
Rising Rivals Jirachi's Final Wish is supported on Knockout from an opponent's attack and draws one card to approximate the printed deck search.
Sun & Moon Wishiwashi's Cowardice returns Wishiwashi from the Active or Bench area to its owner's hand without causing a Knock Out. It cannot be used on its owner's first turn or the turn Wishiwashi entered play, and cannot leave its owner without a Pokémon in play. Individual attached cards are not represented, so returning Wishiwashi does not change the shared Energy pool.

Guardians Rising Wishiwashi's Schooling can switch it with Wishiwashi-GX from hand, carrying over damage, Special Conditions, turn-in-play state, and modeled effects. The shared Energy pool is unchanged because individual attachments are not tracked. PvE opponents use the same swap effect when Wishiwashi-GX is in hand.

Burning Shadows Dusknoir's Dark Invitation reveals the opponent's hand, moves a chosen Basic Pokémon from it onto their Bench, and places 3 damage counters on that Pokémon. It is once per turn and works for both the player and PvE opponent; a Pokémon Knocked Out by the counters goes to discard without attack Prize handling.

Shining Legends Volcarona's Heat Cyclone can force the opposing player to switch their Active Pokémon with a Benched Pokémon once per turn, using the existing opponent-switch flow. Shining Legends Marshadow's Let Loose already shuffles both hands into their decks and draws up to four cards for each player when Marshadow is played onto the Bench; both effects are recognized in the ability audit.
Lost Thunder adds Magcargo-GX's Crushing Charge, which discards its deck's top card and adds it to the shared Energy pool only if it is Basic Energy. Lapras can reorder its top two cards, Mareep can Sleep the opposing Active Pokémon while Mareep is Active, and Zebstrika discards its hand to draw four.
Lost Thunder Blissey can remove one Special Condition from its owner's Active Pokémon once per turn; the PvE opponent now uses the same effect.
Lost Thunder Naganadel's discard-pile Basic Energy attachment is modeled as one shared Energy gain of the selected type for the player and PvE opponent.
Lost Thunder Meganium can evolve a Basic Pokémon directly into a Stage 2 from hand once per turn, including on the first turn or the Basic's play turn. The chain is validated against the Pokémon cards represented in the modeled zones, and the use is blocked by Ability suppression.
Lost Thunder Ditto Prism can evolve into any Stage 1 from hand once per turn, after turn one and not on Ditto's play turn; player and NPC evolution options enforce these restrictions and Ability suppression.
Team HP auras support typed Pokémon, all-board, Team Plasma, Eevee-evolution, and Shaymin-excluding Grass bonuses, covering effects on Mega Rising Lilligant, Journey Together Ludicolo, Plasma Freeze Umbreon, Majestic Dawn Espeon, and Platinum Shaymin LV.X. Current damage stays stable as providers enter, leave, or become suppressed; printed non-stacking limits are observed.
Player and PvE healing effects now parse Energy-symbol type scopes such as {W}, alongside spelled-out Pokémon types. The opponent chooses the most injured eligible target for single-target healing and heals each legal injured target for team effects.
Genesect (Unbroken Bonds) and Litleo (Lost Thunder) now have their conditional no-Retreat Ability: while the opponent has any Pokémon-GX or Pokémon-EX in play, that Pokémon's Retreat Cost is zero. This checks both opposing Active and Benched Pokémon and respects Ability suppression.
Unbroken Bonds Happiny's Softboiled now offers a once-per-turn coin flip to heal 60 damage from a chosen Pokémon on heads; using it ends the turn on either result in player, PvP, and NPC battles.
Diamond & Pearl Magnezone's Magnetic Circuit zero-Retreat rule now applies to the Active Pokémon when the shared Energy pool is Metal and contains Energy.
Wisdom of Sea and Sky Unown GUARD and POWER now activate when another Unown with a different Ability is in play. GUARD reduces attack damage to the owner's Pokémon by 10; POWER adds 10 damage against the opponent's Active Pokémon. Duplicate active copies apply their printed additive effects, and suppressed Abilities do not count.
Power Keepers Vaporeon ☆'s Refreshing Veil now removes Special Conditions from both Active Pokémon and heals up to 30 damage from each when played from hand onto the Bench. The player, PvP opponent, and NPC paths apply the same two-sided effect and healing-prevention checks.
Self-HP Abilities now recalculate bonuses for evolved Hitmonchan, Active Pokémon with a Bench-count bonus (Pangoro), and Nidoking with Nidoqueen in play. Energy-threshold and per-Energy HP bonuses are also represented through the shared Energy pool, including Orthworm, Alolan Exeggutor, Galarian Stunfisk V, Reuniclus, and Conkeldurr. HP deltas preserve damage as the bonuses change.
The same self-HP reconciliation handles Wormadam Plant Cloak's Grass threshold and Sabrina's Gastly's Psychic per-Energy bonus; Sabrina's printed condition explicitly works while affected by Special Conditions.
Fusion Strike Toxtricity lowers the opposing Pokémon VMAX HP by 30 while every living Pokémon on its controller's board is Fusion Strike. Multiple copies stack, suppressed Abilities do not count, and HP reduction/restoration preserves damage and can cause a Knock Out when the lowered maximum is reached.
Supreme Victors Metagross's Gravitation reduces maximum HP by 20 for every Pokémon in play, capped at one 20 HP reduction across all active copies. Ability suppression removes the effect and HP reconciliation preserves damage.
Cosmic Eclipse Vaporeon-GX's Vitality Cheer adds 60 HP to Pokémon-GX that evolve from Eevee. Only one Vitality Cheer bonus applies, and damage remains stable as eligible Pokémon enter or leave play.
Brilliant Stars Shaymin VSTAR can use its once-per-game VSTAR Power to heal up to 120 damage from each damaged Benched Grass Pokémon. Lost Origin Hisuian Goodra VSTAR can use its once-per-game VSTAR Power to heal all damage from itself. Both actions share the side's existing VSTAR usage limit and support PvE and PvP.
Stellar Crown Dachsbun ex can use its evolution Ability to heal all damage from your Evolution Pokémon. When it heals any damage, the game's shared Energy pool is emptied to represent the printed instruction to discard Energy from those Pokémon.
Temporal Forces Whimsicott can heal all damage from your damaged Active Grass Pokémon when it evolves. If it heals damage, the shared Energy pool is emptied to represent the printed attached-Energy discard.
Space-Time Smackdown Dusknoir can repeatedly move all damage counters from one of your damaged Pokémon to itself. The action moves the exact counter total and resolves a Knock Out if Dusknoir cannot survive the transfer.
Legend Maker Girafarig suppresses Poké-Powers on each Active Basic Pokémon except Pokémon-ex. Platinum Dialga G LV.X suppresses Poké-Bodies on Pokémon that are not Pokémon SP; modern Abilities remain usable.
Crystal Guardians Sceptile ex δ suppresses Poké-Powers on Pokémon-ex and adds one Colorless unit to their attack cost. Multiple Sceptile copies do not stack; the shared cost calculation enforces the printed Extra Liquid limit.
HS—Undaunted Espeon can use attacks from your in-play Eeveelutions; attack costs and the existing attack resolver apply normally.
Legend Maker Mew ex can copy attacks from all Pokémon in play, and Holon Phantoms Bellossom δ can copy attacks from in-play Oddish, Gloom, Vileplume, Vileplume ex, or Bellossom. Copied Energy costs remain required.
XY Black Star Promos Ditto can copy the opposing Active Pokémon's attacks while Ditto is Active, paying their normal Energy costs.
Great Encounters Unown [L] can copy attacks from any Unown in play on either side, paying the copied attack's Energy cost.
Space-Time Smackdown Regice prevents effects of attacks from opposing Pokémon; attack damage still applies.
Temporal Forces Rabsca prevents both damage and effects from opposing attacks to your Benched Pokémon. The protection is limited to the Bench and does not block your own attacks.
Temporal Forces Kecleon changes type to match its attached Basic Energy. Because the battle engine tracks Energy in a shared pool, it uses the selected Energy type when representing this Ability; multiple attached types cannot be represented independently.
Cosmic Eclipse Jolteon's Speed Cheer reduces the Colorless attack cost of your in-play Pokémon-GX that evolve from Eevee by one, while respecting Ability suppression.
Cosmic Eclipse Hakamo-o can evolve on the turn it was played when the opponent's Active Pokémon is Pokémon-GX or Pokémon-EX. This exception does not grant first-turn evolution permission.
Destined Rivals Team Rocket's Articuno protects your Basic Team Rocket's Pokémon from effects of opposing attacks. Attack damage is not blocked, and existing effects are not removed.
Paradox Rift Jirachi prevents opposing Basic Pokémon's attacks from placing damage counters on Benched Pokémon. This uses the shared Bench damage-counter protection check; attack damage and non-counter effects are unaffected.
Dragon Frontiers Cloyster δ prevents damage and other effects of opposing attacks to Benched Pokémon marked δ. The protection is checked against the target card name and does not affect Active Pokémon.
Rebel Clash Galarian Mr. Rime prevents non-damage effects of opposing attacks against your Pokémon. Energy attachment is approximated using the side's shared Energy pool, so when it is nonempty the shield applies across the board.
White Flare Mandibuzz's Dark Asset Search reveals the opponent's hand and benches one Basic Pokémon with 70 HP or less. The player chooses the card; NPC Mandibuzz chooses the lowest-HP legal Basic automatically. PvP and PvE enforce hand membership, Bench capacity, Ability suppression, and once-per-turn use.
Unbroken Bonds Gloom's once-per-turn Poké-Power flips a coin and, on heads, reveals the opponent's hand and lets its owner put a Basic Pokémon from it onto the opponent's Bench. The player selects a Basic when available; the NPC chooses the first available Basic. The flip and use are recorded even on tails, and the Power can be used from either Active Spot or Bench.
Sandstorm Azurill and Wynaut can use their baby-evolution Powers once per turn: evolve them from a matching Pokémon card in hand and remove all damage counters from the baby Pokémon. Player and NPC evolution paths track the ability use, apply the heal, and enforce hand membership.
Aquapolis Blissey's Softboiled can choose a damaged Benched Pokémon once per turn, flip a coin, and on heads heal 10 damage per Energy in the shared pool. Special Conditions block the Power. The shared pool stands in for Energy attached to Blissey because per-card Energy attachment is not modeled.
Aquapolis Victreebel's coin-flip Power can choose an opposing Benched Pokémon to become Active on heads. Any Special Condition prevents use.
Aquapolis Electrode's Buzzap can flip once per turn while Active and free of Special Conditions; on heads, it recovers a Lightning Energy from discard into the shared Energy pool. Player, PvP, and NPC paths require that Energy in discard.
Aquapolis Azumarill's Frolic can flip once per turn from the Bench; heads returns Azumarill and its Evolution cards to hand, while tails leaves it on the Bench. The NPC opponent resolves it automatically.
Aquapolis Bellossom can flip once per turn to attach a matching Basic Energy from hand to the shared pool on heads; the player chooses its type, a Benched Pokémon must be present, and Special Conditions block use. NPC Bellossom selects a Basic Energy from hand automatically.
Aquapolis Furret can return two chosen hand cards to its deck, then search for an Energy card into hand. Furret's Power is blocked by Special Conditions and tracked once per turn; NPC Furret chooses two cards and an Energy automatically.
Delta Reign Azurill's Bouncy-Bounce Charge searches an Energy from deck and adds it to the shared pool when a Benched Pokémon is available. This approximates attaching it to an individual Benched Pokémon; NPC Azurill searches automatically.
Diamond & Pearl Dusknoir can once per turn shuffle one of the opponent's Benched Pokémon and its Evolution cards into their deck when they have at least four Benched Pokémon. Special Conditions block the Power; PvE and PvP both support it.
Repeatable Magnezone and Emboar Energy Powers can consume their matching Energy card from hand and add it to the shared pool, once per activation while below the pool cap. NPCs use an available matching card automatically.
Cosmic Eclipse Lanturn can inspect the opponent's top deck card any number of times during its owner's turn. The information-only Power leaves the deck order unchanged and is available through PvE and PvP deck-peek actions.
Silver Tempest Rapidash can discard a Fire Energy card from hand once per turn to boost all friendly Fire Pokémon attacks by 30 for that turn; the boost is active in PvE and PvP.
Vivid Voltage Alcremie's evolution Ability can draw one card for each player when it evolves. The shared evolution draw flow handles both player and opponent decks.
Deoxys Salamence's Rallying Cry makes friendly Pokémon other than Pokémon-ex and Baby Pokémon free to retreat. Dragon Frontiers Swellow δ's Retreat Aid does the same for friendly Stage 2 Pokémon-ex. Both effects respect Ability suppression.
Delta Species Vaporeon ex's evolution Ability can make the opponent shuffle their hand into their deck and draw up to four cards. It resolves through the opponent hand/deck model in PvE and PvP.
Forbidden Light Abomasnow can recover a Basic Grass Energy from its owner's discard pile when it evolves. The attachment uses the shared Energy pool approximation and obeys the selected Energy type and pool cap.
Delta Reign Pawmot can recover a Basic Lightning Energy from discard once per turn, represented as one shared Energy gain. Player and opponent activation paths require matching Lightning selection, a Lightning Energy in discard, available pool capacity, and no prior use that turn.
Journey Together Blaziken ex can recover a Basic Energy of the selected type from discard once per turn. This is represented by one shared Energy gain and requires the card, matching type selection, and pool capacity.
Scarlet & Violet Quaquaval can attach a Basic Energy from hand once per turn. The shared Energy approximation consumes the chosen matching Basic Energy from hand and checks pool capacity in player and opponent turns.
Evolution Abilities that inspect the top 3 or 8 cards for Basic Energy now remove the attached Energy cards from the deck and shuffle the remaining deck. The shared Energy pool represents the attachments and uses the selected Energy type; support covers Gloom, Trumbeak, Emboar, and Vileplume.
Unbroken Bonds Gengar can place six damage counters on an opposing Pokémon-GX or Pokémon-EX when it evolves. The player chooses a legal target; PvE selects an eligible target automatically. Because the battle engine does not allocate attached Energy, this effect uses the shared damage-counter state.
Celestial Storm Rayquaza-GX's Stormy Winds is available when Rayquaza-GX is played from hand onto the Bench. The player chooses a Basic Energy from the discard pile, then the top three deck cards are discarded and that Energy is recovered into the shared Energy pool. This approximates attaching it to Rayquaza-GX because the engine does not track Energy per Pokémon.
Malamar (Obsidian Flames) can inspect the top card of each player's deck once per turn. In PvE and PvP, the card names are shown privately to the activating player; NPC activation does not reveal either card to the human player.
Top-deck draw Powers now recognize “choose 1, then discard the other N cards” wording. The selected card goes to hand and the remaining looked-at cards go to discard through the existing private-selection flow.
Unbroken Bonds Spiritomb's Building Spite is available once per turn in PvE and PvP and places one damage counter on Spiritomb. If it Knocks itself Out, standard promotion and battle-end handling runs.
Unbroken Bonds Caterpie and Metapod can flip once per turn to evolve directly from a matching card in the deck. The Ability may be used from either row and uses the ordinary evolution legality and promotion flow; this wording has no printed Special Condition restriction.
Paldea Evolved Gothitelle can inspect the opponent’s top two cards and choose which remains on top; the other goes to the bottom. The player chooses in PvP/PvE, while the NPC path resolves a stable order without exposing card names publicly.
Lost Origin Kingdra can choose either player to shuffle their hand onto the bottom of their deck and draw up to four cards. The hand is shuffled before bottoming; PvE, PvP, and NPC opponent turns resolve the selected side.
Lost Origin Clefairy can use Moon-Watching Party while Active to gain Psychic Energy for each Benched Clefairy, capped by the shared Energy pool. This approximates the printed attachments because individual attached Energy cards are not modeled.
Obsidian Flames Decidueye ex's Total Freedom can switch Decidueye between the Active Spot and Bench once per turn. The same choice is available in PvE and PvP.
Silver Tempest Mawile VSTAR's Star Rondo is supported in PvE and PvP, consumes the once-per-game VSTAR allowance, moves Mawile from the Bench to Active, and brings a chosen opposing Benched Pokémon Active. The NPC path chooses the opposing Benched Pokémon with the least remaining HP.
Eelektrik and Flaaffy Dynamotor recovers one Lightning Energy from the discard pile into the shared Energy pool, gated by a Benched Pokémon and the matching discard Energy. This attachment is approximated because the engine does not track Energy on individual Pokémon; player and NPC sides can use the Ability.
Silver Tempest Klinklang's Triple Gears can be used when evolved from hand to search up to three Basic Energy cards and add them to the shared Energy pool. Since the battle model stores one shared Energy type instead of per-Pokémon attachments, it searches only the currently selected type and treats those cards as shared pool Energy.
Silver Tempest Regidrago VSTAR's Legacy Star is available once per game in PvE and PvP. It discards up to seven cards from the deck, then pauses for the activating player to choose up to two cards from discard to return to hand. The NPC opponent automatically chooses the two newest discarded cards.
Silver Tempest Radiant Jirachi's Active-only Knockout Ability adds up to three cards to its owner's hand when an opponent's attack Knocks it Out. Since the Knockout flow cannot pause for a deck search choice yet, the engine takes the top cards and shuffles the remaining deck.
Silver Tempest Ho-Oh V's Reviving Flame can return Ho-Oh from the discard pile to the Bench, recover up to four Basic Energy matching the shared Energy type into the pool, and end the turn. A full Energy pool or no matching Basic Energy still allows Ho-Oh to return, with zero Energy recovered. Individual attachments and mixed Energy types are not represented.
Crown Zenith Rotom VSTAR's Conversion Star allows the player to choose any number of cards in hand to discard and draws the same number. It uses the once-per-game VSTAR limit in PvE and PvP. The NPC chooses up to the smaller of its hand size and remaining deck size.

Crown Zenith and Celebrations Zacian V's Roar of the Sword can search a Basic Psychic Energy from the deck into the shared Energy pool once per turn when Psychic is selected, then ends the turn. This approximates attaching to a specific Pokémon because individual attachments are not tracked; PvE, PvP, and NPC use are supported.

Crown Zenith Zamazenta VSTAR's Shield Star uses the once-per-game VSTAR limit and reduces attack damage to all of its owner's Pokémon by 100 after Weakness and Resistance during the opponent's next turn. The side-wide turn marker includes Pokémon played before that turn ends, so it also covers Pokémon that enter play during the protected turn. PvE, PvP, and NPC opponents can use it.

Crown Zenith Galarian Gallery Latias can once per turn consume a Basic Psychic Energy from hand and add one Psychic Energy to the shared pool while Latios is in play. This approximates attaching to Latios because the engine does not track individual attachments; the Ability is available in PvE, PvP, and NPC battles.

Astral Radiance and Crown Zenith Galarian Gallery Magnezone can once per turn inspect the top six cards of its owner's deck, move Metal Energy found there into the shared pool up to its cap, and shuffle the remaining revealed cards back into the deck. When several Metal Energy are found, the engine attaches the maximum amount that fits; individual attachment targets and the printed choice to attach fewer Energy are abstracted.

Paradox Rift Skeledirge ex can discard a Basic Fire Energy from hand once per turn to add 60 damage to all friendly attacks against the opponent's Active Pokémon for that turn, before Weakness and Resistance.

Paradox Rift Porygon-Z can flip once per turn to recover up to four Basic Energy cards of the selected shared Energy type on heads. On tails, it discards one shared Energy if available, approximating an Energy attached to Porygon-Z. The NPC can use the same Ability.

Paradox Rift Garganacl can once per turn recover a Basic Fighting Energy from discard into the shared pool and heal 30 damage from a chosen friendly Pokémon. The target can be at full HP because the Energy attachment still resolves; individual attachment targets are abstracted. NPCs choose the most damaged friendly Pokémon.

Paradox Rift Milotic's optional Recover Ability can resolve when it evolves from hand: both players put a Basic Pokémon from discard onto the Bench, with the opponent going first. To avoid pausing an evolution for two board choices, each side automatically puts its highest-HP legal Basic Pokémon onto the Bench. The player may decline the Ability; NPC Milotic uses it automatically when a legal target exists.

Surging Sparks Quaquaval can choose one hand card to put on the bottom of its deck, then draw until its hand contains five cards. The player selects the card; the NPC chooses its lowest-cost card. PvE and PvP use the existing hand and deck zones.

Wizards Black Star Promo Dragonite's Poké-Power can draw one card and put a selected hand card on top of the deck. The player chooses the card, NPC Dragonite chooses its lowest-cost card, and the Power requires Dragonite to be Active and free of Special Conditions. It uses the engine's existing deck-top swap flow.

Paradox Rift Toedscruel prevents an opponent's Ability from returning cards from that opponent's discard pile to their hand. The lock applies to the supported Starmie, Suicune, discard-return, and evolution-recovery Ability paths in PvE and PvP. It is inactive if Toedscruel is Knocked Out or its Ability is suppressed. Trainer-card recovery is not modeled because Trainer cards are not part of this battle format.

Mega Evolution Shuckle can heal 30 damage from a chosen friendly Pokémon once per turn. Its Grass Energy requirement is approximated by requiring Grass to be the selected shared Energy type with at least one Energy in the pool; individual attachments are not tracked. The Ability is available in player, PvP, and NPC turns.

Paldean Wonders Arboliva can heal 60 damage from a damaged Pokémon ex once per turn and then discard one shared Energy. The shared pool represents both the attached-Energy requirement and the random attached Energy discard because attachments are not tracked by Pokémon.

Delta Species Espeon δ can remove 10 damage from each damaged δ Pokémon once per turn. Special Conditions block Delta Heal, duplicate Delta Heal Powers share a turn limit, and the source must be in play. Player, PvP, and NPC resolution use the same healing checks.

XY Black Star Promos Shaymin-EX can heal 20 damage from each damaged Benched Basic Pokémon once per turn. Player, PvP, and NPC resolution filters targets by both Bench position and Basic subtype.

Plasma Storm Cherrim and Shining Legends Manaphy can heal 20 damage once per turn from a chosen friendly Pokémon when Grass or Water is selected in the shared Energy pool and the pool is nonempty. This approximates the printed attached-Energy condition.

Secret Wonders Quagsire can heal 30 damage from itself once per turn while Active if the opposing Active Pokémon has Water Energy. The opponent's selected Water Energy and nonempty shared pool stand in for individual Energy attachment tracking.

Cosmic Eclipse Igglybuff can flip once per turn to put the opponent's Active Pokémon to Sleep on heads. Using its Ability ends the turn whether the flip lands heads or tails, and Igglybuff's Special Conditions do not prevent use. PvP, player, and NPC resolution share the status and turn-end behavior.

DP Black Star Promos Garchomp C LV.X's Healing Breath heals all of its owner's Pokémon SP when it evolves onto Active Garchomp C. Its cataloged ability text drops the “C” from both Pokémon names; the evolution-heal matcher supports that variant alongside Supreme Victors' text.
Phantasmal Flames Ludicolo's Cheerful Voice is supported in PvE and PvP: once per turn, while a Grass Mega Evolution Pokémon ex is in play, heal 60 damage from one of your Pokémon. The battle engine identifies the gate from the board's Mega/ex name and Grass type, and the action validates the gate before healing.
Delta Reign Arboliva's Drive Off uses the existing opponent forced-switch Ability flow. It is available once per turn and lets the opponent choose the replacement Pokémon.
Fantastical Parade Swellow's Drive Off uses that forced-switch flow only when the opponent's Active Pokémon is Basic. Swellow can activate from either row.
Chilling Reign Hatterene's once-per-turn Ability now switches both players' Active Pokémon with a Benched Pokémon through the existing two-sided switch action. The NPC selects its healthiest eligible replacement.
Paldean Wonders Skeledirge's Inferno Dance can spend one shared Fire Energy unit once per turn to give Fire Pokémon's attacks +50 damage for the turn. The shared Energy spend approximates discarding Fire Energy attached to Skeledirge; PvE and PvP use the same effect.
Furious Fists Victreebel can spend one shared Grass Energy unit once per turn to Confuse and Poison the opponent's Active Pokémon. This approximates discarding Grass Energy attached specifically to Victreebel because attachments are represented by the side-wide Energy pool.
Legends Awakened Gliscor LV.X can use its evolution Ability to Paralyze and Poison the opponent's Active Pokémon when played onto Active Gliscor. PvE, PvP, and NPC battles use the existing evolution status flow.
Skyridge Wigglytuff can use Good Neighbor from the Bench once per turn. On heads, it heals up to 20 damage from each Pokémon in both front rows; the once-per-turn limit is shared across Wigglytuff copies. Player, PvP, and NPC battles use the shared coin-flip healing flow.
Sword & Shield Zacian V's Intrepid Sword checks the top three deck cards, adds any Metal Energy cards to the shared Energy pool, puts the other cards into hand, and ends the turn. Player, PvP, and NPC battle flows support it; individual Energy attachments are approximated by the pool.
Claydol's Cosmic Power can put one or two chosen cards from hand on the bottom of the deck, then draw to six. It is once per turn, blocked by Special Conditions, and supported in player, PvP, and NPC battles.
Toxtricity's Sinister Surge searches a Basic Darkness Energy into the shared Energy pool once per turn, then puts two damage counters on a Benched Darkness Pokémon. Player, PvP, and NPC battle flows are supported; individual Energy attachments are abstracted.
Expedition Base Set Venusaur can add one extra shared Energy unit when its owner Charges for the turn. The once-per-turn bonus works from either row while Venusaur is free of Special Conditions; Ability suppression blocks it.
Expedition Base Set Feraligatr's Major Tsunami can switch the opponent's Active Pokémon with its healthiest eligible Benched Pokémon, then switch Feraligatr with a player-selected Benched Pokémon if available. It is once per turn, requires Feraligatr Active and free of Special Conditions, and works in player, PvP, and NPC battles.
Delta Species Jolteon ex's evolution Ability puts one damage counter on each opposing Pokémon. The existing evolution damage flow handles player, PvP, and NPC battles.
Unseen Forces Blissey ex and HeartGold & SoulSilver Blissey can heal all damage from the owner's damaged Pokémon when they evolve. The shared Energy pool is discarded if any damage is healed, approximating Energy attached to those Pokémon.
Chaos Rising Phantump can use Natural Cure after the first turn to evolve from a matching card in hand outside the normal evolution window, then place two damage counters on the evolved Pokémon. The action is not offered if the counters would Knock it Out.
Deoxys and Celestial Storm Solrock set friendly Lunatone's maximum HP to 80 and 130, respectively. The aura preserves damage counters as the maximum changes and runs through PvE/PvP HP reconciliation.
Cosmic Eclipse Floette and Florges shuffle one or two random cards from the opponent's hand into their deck when they evolve from hand. The selected cards are revealed and the modeled deck is shuffled.
Evolving Skies Skiploom may evolve into a matching evolution card searched from its owner's deck when Energy is attached from hand. McDonald's Collection 2018 and Sun & Moon Eevee may do the same after a Basic Energy attachment, choosing an evolution whose type matches the selected Energy type. Both use the regular evolution eligibility and state transfer rules, then shuffle the deck.
Cosmic Eclipse Venusaur & Snivy-GX can switch an opposing Benched Pokémon into the Active Spot after its Active Pokémon receives a Grass Energy from hand. Since the trigger is optional but has no player target prompt, the engine selects the opposing Benched Pokémon with the least HP; suppression and once-per-turn usage are enforced.
Temporal Forces Feraligatr's Torrential Heart can put five damage counters on itself to give its attacks +120 damage against the opponent's Active Pokémon for the turn. It is once per turn, respects Ability suppression, and cannot be used if the 50 damage would Knock Feraligatr Out.
Destined Rivals Misty's Psyduck can use Flustered Leap from the Bench once per turn while there is a card at the bottom of its owner's deck. It discards that bottom card, discards any modeled Evolution cards on Psyduck, then puts Psyduck on top of the deck; the opponent AI uses it to save a damaged Psyduck.
Mega Evolution Ninjask's evolution Ability can search its owner's deck for Shedinja and offer the card for the Bench when Ninjask evolves from hand. Shedinja is treated as a Basic Pokémon for Bench placement, and the deck is shuffled after the search.
MEP Psyduck and Golduck suppress Abilities on both sides when the Ability requires its own Pokémon to be Knocked Out. This shares the existing self-Knockout Ability suppression check.
Unseen Forces Feraligatr ex suppresses Poké-Powers and Poké-Bodies on both sides' Pokémon that are not Pokémon-ex while Feraligatr ex is Active. The shared suppression resolver handles the card's Active condition and suppression by other effects.
Ascended Heroes Dustox can use its once-per-turn coin-flip Ability while Active. Heads removes one shared Energy unit from the opponent to approximate returning an attached Energy from the opposing Active Pokémon to hand; tails has no Energy effect. Player and NPC battles use the shared counter-Ability resolver.
Dragon Frontiers and Celebrations Gardevoir ex δ can use Imprison once per turn while Active and free of Special Conditions. It marks one opposing Pokémon; that Pokémon's Poké-Powers and Poké-Bodies stay suppressed while it remains in play. The NPC marks an opposing Pokémon with the most Abilities.
Destined Rivals Team Rocket's Arbok blocks the opponent from playing Pokémon with Abilities from hand while Arbok is Active, except for Team Rocket's Pokémon. The hand-play action validates the restriction in PvE and PvP.
Journey Together Noivern's Tuning Echo ignores all Energy in Frightening Howl's cost while both players have the same number of cards in hand. The shared attack-cost resolver applies the check in PvE and PvP.
Twilight Masquerade and SVP Thwackey's Festival Lead lets it search one card from the modeled deck into hand once per turn when the Active Pokémon has an unsuppressed Festival Lead Ability. PvE, PvP, and NPC ability use share the Active requirement and usage limit.
Perfect Order Vivillon can use its once-per-turn Ability to put the opponent's hand on the bottom of their deck; if any cards were returned, they draw up to four. It shares Kingdra's existing hand-bottoming flow in PvE, PvP, and NPC battles.
Radiant Eternatus's Cast-Off Shell searches up to two Pokémon VMAX from the deck onto open Bench slots when played from hand to the Bench, then shuffles and ends the turn. Player, PvP, and NPC flows validate Bench capacity and VMAX eligibility.
Cradily ex blocks the opponent from evolving their Active Pokémon while Cradily ex is Active. The shared evolution-option resolver checks the unsuppressed Ability for player and NPC turns, including server-side action validation.
Power Keepers Kabutops and Skyridge Omastar also block the opponent from evolving their Active Pokémon while Active. They use the same checked evolution lock as Cradily ex.
Wizards Black Star Promo Venusaur can use Pure Body once per turn to clear Asleep, Confused, Paralyzed, and Poisoned from both Active Pokémon. It cannot use Pure Body while Venusaur is Asleep, Confused, or Paralyzed; player, PvP, and NPC turns use the shared status Ability behavior.
Power Keepers Metagross ex can use its once-per-turn hand shuffle while Active and free of Special Conditions. Both players shuffle their hands into their decks, then draw up to four; player, PvP, and NPC battle flows support the effect.
Delta Species Metagross can use its once-per-turn top-four Power while free of Special Conditions. It puts one chosen card into hand and the remaining cards on the bottom of the deck; the player chooses, and NPC battles take the top card.
151 and Paldean Fates Ditto can use Transform from the Active Spot during its owner's first turn, searching the deck for a Basic Pokémon other than Ditto to replace it. Ditto is discarded, the replacement starts without Ditto's damage or Special Conditions, and the deck is shuffled.
Power Keepers Absol ex's Cursed Eyes can move up to three damage counters between two opposing Pokémon when played from hand to the Bench. The same timing is validated in the client and server, and NPC battles can resolve the trigger.
30th Celebration and MEP Moltres, Zapdos, and Articuno can each use their once-per-turn Ability when the other two Legendary Birds are in play to add one matching Fire, Lightning, or Water Energy unit to the shared pool. The source bird receives the Energy; the selected shared Energy type and pool cap are enforced, and player, PvP, and NPC flows share the same action.

Yanmega ex — Buzzing Boost searches up to three Basic Grass Energy when it moves from the Bench to the Active Spot. The deck search, switch trigger, shared pool cap, and Grass selection are supported in player, PvP, and NPC handling. Since this battle mode tracks Energy in a shared pool, the attachment to Yanmega is approximated by adding those units to that pool.

Phantasmal Flames and MEP Oricorio ex — Fire Dance can repeatedly add Basic Fire Energy from hand to the shared pool while a Fire Mega Evolution Pokémon ex is in play and the owner has a Benched Fire Pokémon. The Ability validates its condition and hand Energy; per-Pokémon Energy attachments are approximated by the shared pool.

Serperior, Meganium, Sceptile, Gardevoir, Galarian Weezing, Charizard, and Venusaur Energy-doubling Abilities reduce effective attack Energy cost when the selected shared Energy type and attacking Pokémon meet the printed type conditions. This approximates attached Energy with the shared pool; Meganium's Neo Genesis Poké-Body also respects its Special Condition restriction.

Ascended Heroes and Destined Rivals Ethan's Ho-Oh ex — Golden Flame consumes up to two Basic Fire Energy cards from hand once per turn when a Benched Ethan's Pokémon is available, adding matching units to the shared Energy pool up to its cap. Individual Pokémon Energy attachments remain approximated by the pool.

Expedition Base Set Typhlosion's Evolutionary Thunder compares the players' shared Energy totals once per turn. When the opponent has more Energy and Typhlosion has no Special Condition, it searches one Fire Energy card and adds one unit to the pool, approximating an attachment to a Benched Pokémon. Player, PvP, and NPC flows enforce the lead, Bench, status, and pool-cap conditions.

Surging Sparks Magneton can recover up to three Basic Lightning Energy from the discard pile once per turn when a Lightning Pokémon is in play. The units enter the shared pool, and Magneton is Knocked Out after the Ability resolves. The printed per-Pokémon attachment distribution is approximated because the battle model uses a shared Energy pool; player, PvP, and NPC flows support the effect.

Plasma Freeze Metagross's Plasma Search finds one card with the Team Plasma subtype and puts it into the player's hand. Its shared once-per-turn key prevents another Plasma Search from being used that turn. Player, PvP, and NPC battles use the existing deck search flow.

Pitch Black Rampardos ex can use its once-per-turn Ability from the Active Spot to flip for discarding one unit from the opponent's shared Energy pool. Player, PvP, and NPC handling record the flip and enforce the Active condition; the Energy unit models an attachment on the opposing Active Pokémon.

Astral Radiance Hisuian Typhlosion — Supernatural Orb discards a Psychic Energy card from hand once per turn to Burn and Confuse the opposing Active Pokémon. Player, PvP, and NPC paths support the two conditions and hand cost.


Phantom Forces and XY Black Star Promos Bronzong can use Metal Links once per turn to recover a Metal Energy from the discard pile to the shared Energy pool, targeting a Benched Pokémon. Player and PvP select the Bench target; NPC turns resolve the recovery automatically. Individual attached Energy remains represented by the shared pool.

Astral Radiance Oranguru V can search for up to two Pokémon Tool cards once per turn while Active. The search filters for Tool subtype cards, and player, PvP, and NPC turns enforce the Active requirement.


Rebel Clash and Shining Fates Shiny Vault Greedent can search for one Pokémon Tool card once per turn. The player chooses from matching Tool cards, while PvP and NPC paths use the same filtered deck search.

Temporal Forces Sawsbuck can search for one Stadium card once per turn. The engine filters the deck by Stadium subtype and adds the selected card to hand before shuffling.


Great Encounters Slowking can search for any one card once per turn if one of its Pokémon was Knocked Out during the opponent's last turn. The Ability is unavailable while Slowking has a Special Condition; player, PvP, and NPC paths check the recent Knock Out state and condition.

Shining Fates Rotom can search for up to two Items with “Rotom” in the name when played from hand onto the Bench. Player, PvP, and NPC paths enforce the Bench-entry timing and filter the deck by Item subtype and name.

Plasma Blast Jirachi-EX can search for one Supporter and add it to hand when played from hand onto the Bench. The existing Bench-entry search flow handles the subtype filter and timing in player, PvP, and NPC battles.

Abilities that search for Trainer cards, including Supporters, Items, Stadiums, and Pokémon Tools, remain unsupported because the battle deck contains Pokémon only. The audit keeps those effects unmatched; the Ability search parser rejects these card zones.

Holon Phantoms Aerodactyl δ can search for a Basic Energy once per turn while free of Special Conditions. Deoxys Magcargo can search for any card and put it on top of its deck, with its Special Condition restriction. Legendary Collection Dark Dragonair can search for an Evolution card while Active and free of Special Conditions. Unseen Forces Slowking can search for a Pokémon Tool while free of Special Conditions. These use the existing filtered deck-search flow. Burning Shadows Ribombee's Energy search is handled through the shared Energy pool because Energy cards are absent from the deck.

Crystal Guardians Fearow δ’s Delta Sign searches for Pokémon whose card name contains δ, with its shared once-per-turn limit and Special Condition restriction enforced.

Dragon Frontiers Nidoqueen δ can search for any Pokémon card under its Basic-or-Evolution wording, with its Special Condition restriction enforced.

Double Crisis Team Aqua’s Sharpedo’s once-per-turn Team Aqua Pokémon search is supported using the card-name filter.

Team Up Emolga’s Nuzzle search is supported through the attack-name deck-search filter.

Unown [J]’s Join search is supported with an exact four-Unown Bench prerequisite and a Pokémon-only deck filter.


Ledian δ and Persian’s any-card searches on evolution are supported by the existing Evolution search interaction.

HS—Undaunted Unown’s Bench-entry Darkness Energy search is supported through the filtered deck-search flow.

Generic Energy attachment effects that name the hand or discard pile resolve into shared-pool Energy instead of looking for Energy card objects in those zones. Aromatisse's search for up to two Basic Psychic Energy adds up to two Psychic Energy to the shared pool; Evolving Skies Eldegoss's Cotton Lift adds up to two generic Energy; and 30th Celebration Solgaleo adds up to two Metal Energy while on the Bench. These effects respect pool capacity and once-per-turn use in player, PvP, and NPC battles. 30th Celebration Vivillon's Guiding Dance flips once per turn and searches for a Pokémon on heads in all three battle flows. Energy search and recovery effects use the same shared-pool model.

30th Celebration: Classic Collection Greninja BREAK can use Giant Water Shuriken once per turn while Active by spending one selected Water Energy from the shared pool to put six damage counters on a chosen opposing Pokémon. Player, PvP, and NPC battles enforce the Water cost and Active condition.

Energy cards are abstracted into the shared Energy pool throughout battle and are never searched for or moved through the Pokémon deck, hand, or discard pile. Evolution Ability effects that search for or recover Energy convert the printed type and amount into Energy added to the pool, subject to its capacity and type rules. Greninja BREAK's Energy discard cost spends the matching shared-pool Energy. Trainer card effects remain unsupported.

Delta Reign Jellicent's Deep Sea Draw draws one Pokémon card, then offers the player the optional choice to put a card from hand on the bottom of the deck. NPC Jellicent resolves the same optional effect automatically.

Perfect Order Talonflame's Sky Hunt flips once per turn and, on heads, discards a random Pokémon from the opponent's hand. The player's action, PvP flow, and NPC automation all resolve the coin flip and hand discard; Energy and Trainer card zones are not involved.

Fusion Strike Inteleon VMAX can spend one shared Water Energy to place two damage counters on each of two opposing Benched Pokémon. The ability uses the shared Energy pool in place of a Water Energy card from hand, and validates the two distinct targets and counter amounts in player, PvP, and NPC battles.

Neo Discovery Unown [E]'s hand-play Ability lets its owner shuffle their hand into the Pokémon deck and draw up to four cards. The opponent's optional hand shuffle and draw is not offered because the battle flow has no opponent choice prompt. The owner can use this in player and PvP battles; the NPC does not make an automatic choice for this optional effect.

Aquapolis Wobbuffet's Mirror Coat reflects Poison or Burn applied by an opposing attack back to the attacker. The reflection uses attack-caused status events, applies only during the Wobbuffet owner's opponent's turn, and respects Ability suppression and status protections.

SM Black Star Promo Greninja-GX and Vivid Voltage Beedrill can play themselves from hand onto the Bench when either is the only card in hand, then draw up to three Pokémon cards. The player and PvP actions validate the hand and board conditions; the NPC can use the effect automatically. All flows retain the three-front-slots-before-Bench rule.

Power Keepers Claydol ex, POP Series 9 Rotom, and Dragon Frontiers Salamence ex δ add temporary Fighting, Psychic, and Fire type-change Powers to the shared player, PvP, and NPC type-change flow.
