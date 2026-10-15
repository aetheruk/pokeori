# Pokémon Tower: Channeler encounter variety

Status: implemented for release 0.51.45. The thirteen descriptions and rules below are authored in battle data, with server-side allowed-type validation and pre-battle rule/team details. Production availability follows the release deployment.

## Direction

Turn the climb into a sequence of small spirit trials. Give each Channeler a permanent rule and a short atmospheric description that states it explicitly. Mix the rules across floors, but do not randomize them on entry or retry: a player should be able to read the challenge, prepare, and retry the same encounter.

The scope is the 13 mandatory Channelers on floors 3–6. Keep their existing battle IDs, completion chain, enemy teams, levels, and payouts initially. Leave the wild encounters, three Shadow Surges, Kita, and Fuji's memory battles separate. This makes the familiar Gastly/Haunter encounters play differently without rewriting the Tower story.

Rules should change a decision rather than merely increase difficulty. Alternate starting ailments, team-building restrictions, resource limits, and easier spirit encounters. Do not combine multiple new restrictions on one trainer in the first release.

## Trainer roster and proposed descriptions

Source of truth: `src/data/battles/entries/pokemon-tower.ts`. Every trainer ID below has the prefix `pokemon-tower-channeler-`.

| Floor | Trainer / ID suffix | Current opposing team | Proposed rule | Replacement description |
| --- | --- | --- | --- | --- |
| 3F | Hope / `hope` | Gastly 22 | Player team starts paralysed where susceptible. | Hope's whispered prayer sends a shiver through your team. Your Pokémon start paralysed unless protected by an immunity or ability. |
| 3F | Patricia / `patricia` | Gastly 22 | Grass types only; dual types qualify. | Roots curl between Patricia's memorial stones. Only Grass-type Pokémon may enter, including dual types. |
| 3F | Carly / `carly` | Gastly 24 | One player Pokémon. | Carly calls for a single guardian at the stairway. Face her Gastly with just one Pokémon. |
| 4F | Laurel / `laurel` | Gastly 23 ×2 | No voluntary switching. | Laurel's spirits hold your partner in place. You cannot switch voluntarily; replacements after fainting and move-driven switches still work. |
| 4F | Jody / `jody` | Gastly 22 | Player team starts poisoned where susceptible. | Jody's ancient chant stirs a poisonous mist. Your Pokémon start poisoned unless protected by an immunity or ability. |
| 4F | Paula / `paula` | Gastly 24 | At most one battle-item use. | Paula asks you to climb with a single offering. You may use a battle item only once during this encounter. |
| 5F | Ruth / `ruth` | Gastly 22 | Enemy Gastly starts asleep; an easier beat. | The sanctuary has quieted Ruth's restless Gastly. It begins the battle asleep, giving you a moment to act. |
| 5F | Karina / `karina` | Haunter 23 | Water types only; dual types qualify. | Karina watches a circle of still, reflected moonlight. Only Water-type Pokémon may enter, including dual types. |
| 5F | Tammy / `tammy` | Haunter 24 | Player team starts burned where susceptible. | Tammy's ghostly candles flare as you approach. Your Pokémon start burned unless protected by an immunity or ability. |
| 5F | Janae / `janae` | Gastly 24 | Enemy Gastly starts confused; an easier beat. | Janae's overlapping chants leave her own Gastly bewildered. It starts confused; make use of the opening before it recovers. |
| 6F | Angelica / `angelica` | Gastly 22 ×3 | Double battle; two or three player Pokémon. | Angelica's apparitions gather in pairs. Bring at least two Pokémon for a double battle against her three Gastly. |
| 6F | Jennifer / `jennifer` | Gastly 24 | No battle-item uses. | Jennifer seals away your battle supplies. Win without using battle items; held items still work. |
| 6F | Emilia / `emilia` | Gastly 24 | At most one manual move use per Pokémon. | Emilia's chant muffles elaborate commands. Each Pokémon may use a manual move only once; ordinary stance attacks remain available. |

The current progression document has an outdated 5F roster. The actual sequence is Ruth (Gastly 22), Karina (Haunter 23), Tammy (Haunter 24), Janae (Gastly 24). Correct that summary alongside implementation.

## Exact rule behavior

- Starting status affects the participating player team once at battle creation, including reserves. Switching does not reapply it. Normal cures, held berries, type immunities, and status-blocking abilities work. These are battle-instance effects and must not be written onto owned Pokémon. Resuming an encounter must restore its current state rather than inflict the starting status again.
- Poison means ordinary poison, not escalating bad poison. Avoid starting the player asleep or frozen: those add waiting and missed turns to a section already criticized for being slow.
- Type-only battles require every participating Pokémon to have the specified type. Grass/Poison qualifies for Grass; Water/Flying qualifies for Water. Do not implement this by banning every other type, which would reject valid dual types.
- Prefer validating only the Pokémon entering the battle, after applying the existing team-size selection. Extra nonparticipating Battle Team slots should not force repeated full-roster edits. The pre-battle screen must identify exactly which Pokémon will enter. Never silently substitute or reorder the player's team.
- A type challenge requires at least one eligible Pokémon, not three. Allow the normal maximum of three. Provide a direct route to team management before starting.
- Grass-only is intentionally a team-building puzzle against a Ghost/Poison opponent. Playtest with ordinary available Grass Pokémon, including Oddish and Bellsprout, rather than assuming this is an easy type matchup. Verify a practical available Water option too. No rare capture, evolved form, paid item, or TM should be mandatory.
- Laurel uses the current switching rule: lead selection, forced replacements, and switches caused by moves remain valid. Do not describe it as an absolute prohibition on all switching.
- Paula's one-item cap is the lower of the player's existing skill allowance and one. Jennifer's cap is zero. Held-item activations do not consume these allowances. Never use an empty `allowedItems` list to mean no items: that currently means unrestricted items.
- Emilia's one-move cap is per Pokémon for the whole battle, limited by the player's existing allowance. Switching cannot refresh it. This limits the existing manual-move system, not the ordinary stance attacks. Existing battle powers retain their normal behavior.
- Angelica keeps her three Gastly and a three-Pokémon player maximum. Require two available participants before starting; support forced replacement after a double KO. Preserve the existing double-battle turn rules.
- Ruth and Janae get enemy starting statuses using the normal status system and recovery timing. These encounters deliberately provide relief between restrictions rather than adding another player penalty. Starting sleep duration remains the engine's normal roll; it is not a fixed free-turn promise.

## Implementation shape

Most of this is existing data authoring:

| Rule | Existing configuration |
| --- | --- |
| Hope, Jody, Tammy | `playerTeamInitialStatus: 'paralysis' / 'poison' / 'burn'` |
| Carly | `maxPokemon: 1` |
| Laurel | `allowSwapping: false` |
| Paula, Jennifer | `itemsPerBattle: 1 / 0` |
| Ruth, Janae | `enemyTeam[0].initialStatus: 'sleep' / 'confusion'` |
| Angelica | `format: 'double'`, existing `maxPokemon: 3` |
| Emilia | `movesPerBattle: 1` |

Add one narrowly scoped config field for Patricia and Karina, for example `allowedPlayerTypes?: PokemonTypeName[]`. Its meaning is: each participant must match at least one listed type. A single entry gives the proposed Grass-only or Water-only challenge. Define behavior alongside existing banned types: both rules must pass when both are authored.

Validate allowed types on the server in `src/app/(frontend)/game/battles/pve/start-battle.ts`, using the authoritative form types. Check the actual participants before creating state or consuming any start costs. Preserve existing Celadon banned-type behavior. Add the field to relevant schemas, authoring/reference validation, and Event Studio only where battle configuration is exposed.

Show the challenge in the existing pre-battle details: explicit description, a compact rules summary, and a useful entry error such as “Patricia's spirit trial allows only Grass-type Pokémon. Pikachu does not qualify.” Reuse existing type/status visuals and team-management navigation. A new rules engine or new per-trainer interface is unnecessary.

Keep rule details available during battle through the existing battle details surface where feasible. Opening log messages should explain actual starting effects, including cures triggered by held items. Do not claim that an immune Pokémon received a status.

## Validation and rollout

1. Test server-side entry for eligible, ineligible, dual-type, empty, and oversized teams. Confirm the selected participants are the ones shown before entry, and forged requests cannot bypass restrictions. Cover allowed/banned combinations without changing older Gym restrictions.
2. Test starting status on leads and reserves, immunity/ability protection, held-item cures, no reapplication after switching/resume, and no persistence on owned Pokémon.
3. Test voluntary-switch denial while lead selection, forced replacement, and move switches still succeed. Test zero/one item uses, held-item independence, per-Pokémon move budgets, and retry-safe usage counts.
4. Test Angelica's two-Pokémon minimum, all three enemies, double KO/replacement, and completion rewards. Ensure the existing trainer chain and Shadow Surge handoff remain intact.
5. Play through the full sequence with a modest account at Tower progression. Measure total time and preparation friction. If the result feels slower, first soften or remove a restriction rather than adding more rewards or more enemy HP. Do not increase levels, add enemy healing, or stack enemy status spam in this pass.
6. Update the live descriptions and rule config together. Update `docs/current-game-state.md`, battle-system feature docs, and testing docs; update the battle mechanics inventory if the final implementation changes authored moves or abilities. Assign a new patch release version and run relevant tests, data validation, typecheck, and lint before the requested release workflow.

## Later options

If the fixed trial sequence proves fun, add deterministic weather/terrain or alternative enemy teams in a later pass. Do not add random mid-battle mutations, turn-limit losses, repeat status application, or full-roster type grinding in the first version. Those broaden the engine and balance work and can make the climb more laborious.
