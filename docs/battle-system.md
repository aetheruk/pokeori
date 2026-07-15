# Battle System Notes

## State Ownership

PVE battles store one `BattleState` at `battle:<userId>`. The `powers` field belongs to that player.

PVP battles store one shared `BattleState` at `pvp:battle:<battleId>`. Shared state keeps canonical teams, active indexes, turn, history, and status. Per-player power counters are stored in `pvpPowers`, keyed by user id. When the shared state is converted to a viewer perspective, `powers` is set to that viewer's own `pvpPowers` bucket so existing UI and action code can read the same field without treating the opponent's counters as its own.

## Turn Flow

PVE turn submission validates stance and power commands, applies any selected power, resolves enemy action, then finalizes status, durations, rewards, and persistence.

PVP turn submission validates the viewer perspective, queues a compact `PvpMove`, and resolves the shared turn only when both players have submitted. Resolution applies swaps, powers, special move use consumption, combat, faint checks, reward/stat updates, history trimming, and per-player power advancement.

Ranked queue membership is tracked separately from the queue list. Cancelling a queue removes the user's active queue marker and status immediately; any stale list entry is ignored by matchmaking when it is popped.

Pure PVP turn helpers live in `src/utilities/battle/engine/pvp-turn.ts`. Keep deterministic rules there when possible, especially result inversion, per-player power use consumption, power duration advancement, dimensional charge updates, swap handling, combat damage, and faint replacement logic. Server actions and PVP resolution should orchestrate Redis, Payload, rewards, and side effects around those helpers rather than embedding new deterministic rules inline.

Pure PVE turn helpers live in `src/utilities/battle/engine/pve-turn.ts`. Keep stance multipliers, damage exchange application, single-turn cleanup, and dimensional charge accounting there where possible. PVE server actions should continue to own async behavior such as Payload updates, reward finalization, AI move selection, and dynamic move imports.

The basic stance triangle is intentionally moderate and symmetric: a stance win deals 1.35x outgoing damage, a stance loss deals 0.75x outgoing damage, and a tie keeps both sides at 1x.

Stance-disable effects are stored on battle Pokemon as `disabledStance` rather than as normal status. Player action validation rejects disabled stances, AI stance selection gives disabled stances zero weight, and turn-end processing clears the lock after its remaining turns expire.

## Powers

Power commands are parsed by `src/utilities/battle/action-validation.ts`. The parser rejects malformed command payloads and validates target-specific data:

- Mega targets must belong to the active Pokemon and have generated Mega Stone data.
- Gigantamax targets must match the active Pokemon's generated Gmax form.
- Tera commands use the Tera Orb and the active Pokemon's stored `teraType`.
- Z-Move commands use the Z-Ring to prepare the active Pokemon's next normal stance attack.
- Dimensional Shift commands only accept `time`, `space`, or `chaos`.

Requirement validation checks key items, inventory, shadow Pokemon restrictions, active power locks, and remaining per-battle uses. In PVP, this validation reads the viewer's perspective `powers`, then shared resolution consumes the matching bucket in `pvpPowers`.

Special battle moves are selected per owned Pokemon before battle. The Pokemon collection stores up to four `assignedMoves` rows, with Researcher level unlocking 1/2/3/4 usable slots at levels 10/20/45/60. The assignment pool comes from owned move-granting TMs/HMs, with move-level and form gates enforced. Move configs do not author Pokemon type eligibility. The Power Up drawer lists only the active Pokemon's assigned moves that still pass current item/form/level eligibility, and `useMove` repeats that validation server-side before consuming one of that Pokemon's move uses.

PVE enemy AI automatically considers every authored move whose form and level gates match the enemy Pokemon. Battle configs only author `enemyTeam[].aiMoves` for special exception moves outside normal form/level compatibility. Each enemy Pokemon gets its own move budget, defaulting from the highest enemy Pokemon level using the same battle-move ladder as Trainer level, while `enemyMovesPerBattle` remains available as an explicit per-Pokemon special-battle override.

Pokemon Powers are selected per owned Pokemon before battle. The Pokemon collection stores one `selectedPokemonPower` value. `getBattlePowers` filters the Power Up drawer to that selected category, while normal power command validation and the dedicated Victory/Shout/Circadian actions reject any power that does not match the active Pokemon's selected category.

## Special Pokemon

Shadow Pokemon use the `isShadow` flag on Pokemon records and authored battle enemies. They receive the existing shadow visual treatment, a stat bonus during stat calculation, and cannot use battle powers. Player-owned Shadow Pokemon have a 20% chance before each move to scream out in pain, lose the action, and take 1/8 max HP self-damage before the enemy response if they survive.

Radiant Pokemon use the `isRadiant` flag on Pokemon records, Pokemon rewards, authored battle enemies, and Pokemon criteria/team checks. They use a blue aura visual treatment and their attacks have a 10% chance to deal 1.1x damage. When this triggers, battle logs include `{pokemon}'s aura burns bright.`

## Battle Items

Generic battle items are resolved by `src/utilities/battle/item-effects.ts` and orchestrated by `src/app/(frontend)/game/battles/actions/item-usage.ts`.

- HP healing, full healing, status cures, stat boosts, vanish cancellation, and stance reveal effects should stay in the pure resolver.
- Inventory reads, Payload writes, item-per-battle limits, battle allowlists, enemy response turns, Redis persistence, and route revalidation stay in the server action.
- Z-Moves use the Z-Ring from the Power Up flow. Preparing a Z-Move spends the turn, the next normal stance attack deals 5x damage, and the prepared charge fades if another move or item is used first.
- Tera Shards are used outside battle on owned Pokemon to set `teraType`; they have no battle item effect.
- The battle item drawer only lists active-battle-allowed items and disables items that cannot affect the active Pokemon's current HP, status, or stat stages.

## Generated Data Expectations

Generated battle data must keep these references aligned:

- Mega evolution maps must reference real generated Pokemon forms.
- Mega Stone items must exist for every generated Mega evolution.
- Evolution maps must reference real Pokemon and item ids.
- TCG binder and booster generation must cover every generated set.

The integrity tests in `tests/generated-data-integrity.test.ts` and battle validation tests in `tests/battle-action-validation.test.ts` guard these assumptions.

## Production Checks

Before changing battle mechanics, run:

```bash
bun run lint
bun run typecheck
bun test tests/battle-action-validation.test.ts tests/pvp-power-state.test.ts tests/pvp-turn-engine.test.ts tests/pve-turn-engine.test.ts
bun run validate:data
```

Builds are intentionally excluded from this terminal workflow.
