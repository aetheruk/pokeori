# Battle Rarity Effects

## Goal

Give every Pokemon rarity a clear battle identity while preserving Normal and Shiny as cosmetic references and retaining the existing Shadow and Radiant mechanics.

## Player behavior

- Entry effects trigger once when a Pokemon first becomes active. Gold/Silver raise HP, Emerald/Ruby/Sapphire grant Shield, Crystal changes offensive/defensive stages, Retro gives distinct random +3/-3 combat stages, Galactic grants Mystic Veil, Celestial grants Regeneration, and Pixelated grants Evasion.
- Levin, Inferno, Ancient, and Toxic add Electric, Fire, Rock, and Poison types. Prism adds one random legal type; Rainbow changes that extra type after each active turn. Black and White replace the Pokemon's types with Dark and Normal respectively.
- Levin, Inferno, and Toxic roll their status rider after every attack attempt. Void can make its own user Vanish after an attack attempt. Glitch shuffles the active Pokemon's five non-HP combat stats at turn end.

## Rules and constraints

- Rarity outcomes are resolved and persisted server-side in both PvE and PvP.
- Entry Shield, Regeneration, and Mystic Veil replace the holder's current main status. Offensive status riders retain ordinary status immunities and do not replace an occupied target status.
- Tera and temporary type replacements take precedence; when they end, the rarity-adjusted type set returns.
- The feature must not add Payload rarity values or change existing Shadow/Radiant behavior.

## Acceptance criteria

- Every existing rarity ID has its intended battle effect or explicit cosmetic-only behavior.
- Opening leads, voluntary switches, forced switches, and faint replacements apply one-time entry effects.
- PvE and PvP resolve rarity riders, Rainbow, and Glitch consistently.
- Battle logs expose visible rarity activations, and unit tests cover entry, type, rider, and turn-end behavior.
