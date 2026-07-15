---
name: pokeori-ui-style
description: Apply the PokeOri field-journal visual system to player-facing UI work, including page layouts, React components, shared primitives, navigation, dialogs, buttons, typography, color tokens, responsive states, and supporting illustration assets. Use when creating, refactoring, reviewing, or extending any PokeOri auth, game, battle, research, collection, or exploration interface.
---

# PokeOri UI Style

Use this skill for every player-facing PokeOri UI change. Read the canonical guide at `docs/design/pokeori-ui-style-guide.md` before editing a component, and inspect nearby existing patterns before introducing a new one.

## Workflow

1. Identify whether the surface is a paper-first management screen or a dark-night activity screen.
2. Reuse semantic tokens and shared primitives before adding local Tailwind colors, borders, radii, or shadows.
3. Keep actions, status, progress, error, rarity, and Pokemon-type colors semantically distinct.
4. Preserve mobile touch sizing, keyboard focus, reduced-motion behavior, and existing gameplay/session logic.
5. Use existing route art first; add illustrated UI motifs only where the guide permits them.
6. Check both narrow mobile and wide desktop layouts, then run the project typecheck and lint checks.

## Non-negotiable rules

- Prefer parchment, cream, ink navy, moss, clay, and ochre over neon teal/green or pure black.
- Use serif display text for brand/page titles, humanist sans for interface copy, and monospace only for timers and numeric data.
- Use 8–12px paper cards and clipped/map-like tabs; reserve pill shapes for statuses and compact metadata.
- Use moss for active navigation and selection, clay for primary actions and rewards, and ochre for discoveries/progress.
- Keep glow, shimmer, gradients, hover scaling, and looping decorative motion out of routine UI. Preserve meaningful battle, capture, rarity, and milestone feedback.
- Do not change authored game data, server actions, requirements, rewards, battle mechanics, or encounter validation as part of visual work.

## References

- `docs/design/pokeori-ui-style-guide.md` — canonical tokens, typography, geometry, component patterns, and asset guidance.
- `src/styles/globals.css` — implementation source for global visual tokens and shared panel/focus helpers.
- `src/components/ui/` — shared primitives to extend before creating one-off UI.
