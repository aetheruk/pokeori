# Pokeori UI style guide

Pokeori is a field journal for exploring, observing, collecting, and caring for Pokemon. The interface should feel authored by a curious naturalist: warm paper, ink, moss, clay, and field marks layered over the project’s hand-painted route scenes.

## Visual language

Use two related presentations rather than one universal dark theme:

- **Paper-first:** Trainer, Explore, Pokemon, Pokedex, MoveDex, AbilityDex, Inventory, Artisan, TCG management, social rows, shops, tasks, and planning screens.
- **Night activity:** battles, catches, Field Observation, research minigames, Spirit Channeling, TCG battles, and other focused full-screen activities.

Both presentations share geometry, typography, semantic color, focus states, touch sizing, and motion rules.

## Palette and semantics

The exact CSS variables live in `src/styles/globals.css`. Use semantic roles instead of raw color utilities.

| Role | Color direction | Use |
| --- | --- | --- |
| Paper canvas | warm parchment `#efe4cf` | ordinary page backgrounds |
| Raised paper | cream `#fff8e8` | cards, drawers, dialogs, selected panels |
| Ink | deep charcoal `#293532` | primary text and headings |
| Muted ink | olive-grey `#667269` | descriptions, metadata, disabled copy |
| Paper line | warm tan `#cbbd9f` | borders, rules, separators |
| Moss | `#5f794f` | active navigation, selected states, positive progress |
| Deep moss | `#405d3d` | pressed/strong moss states |
| Clay | `#b86148` | primary actions, rewards, urgent calls to action |
| Ochre | `#b58a43` | discoveries, milestones, special progress |
| Night canvas | ink navy `#172733` | battle/research activity background |
| Night surface | blue charcoal `#22353d` | activity cards and controls |
| Night text | cream `#f7ecd6` | readable activity text |

Avoid pure black, electric teal, saturated emerald, arbitrary gradient text, and decorative color that does not communicate state. Preserve Pokemon type colors and rarity colors when they are gameplay semantics.

## Typography

- Use a Georgia/Times-style serif stack for the Pokeori wordmark companion text, page titles, section titles, and authored story moments.
- Use the system sans stack for labels, controls, descriptions, and body copy.
- Use the system monospace stack only for timers, levels, quantities, IDs, and other numeric readouts.
- Prefer sentence case. Use uppercase or letter spacing only for short metadata labels, not entire page titles or paragraphs.
- Keep display titles compact and editorial rather than oversized or italicized by default.

## Geometry and surfaces

- Use 8px to 12px corner radii for cards and panels.
- Use crisp 1px warm borders with low-contrast paper shadows; avoid black glow halos.
- Use clipped, ticket-like, or map-tab shapes for navigation and section selectors when they improve hierarchy.
- Reserve pill shapes for statuses, filters, compact tags, and counts.
- Keep touch targets at least 40px, with 44px preferred for primary mobile controls.
- Use paper texture and map motifs sparingly on page shells, hero headers, empty states, and special detail surfaces. Never texture every row.

## Component rules

- Extend `src/components/ui/button.tsx`, `card.tsx`, `input.tsx`, `select.tsx`, `tabs.tsx`, `dialog.tsx`, `drawer.tsx`, and `page-header.tsx` before adding a local variant.
- Primary buttons are clay; active navigation and selected controls are moss; discovery/progress callouts are ochre; errors remain brick red.
- Secondary actions use outlined or lightly tinted paper surfaces, never a second competing neon accent.
- Page headers combine a small contextual label, a serif title, and an optional short description. Avoid repeated oversized headers above every subsection.
- Lists use stable rows with an icon tile, clear title/metadata hierarchy, and visible keyboard focus. Hover should not move or enlarge the row.
- Dialogs and drawers use paper surfaces on paper-first screens and night surfaces on activity screens, while retaining the same padding and close/focus behavior.

## Activity and scene composition

- Focused activities use light field-journal chrome by default: parchment HUDs, cream controls, ink copy, moss selection, clay calls to action, and ochre discovery states.
- Keep the playfield itself contextual. A fishing pond, battle scene, card table, or puzzle board may be dark or colourful, but it must be separated from the readable UI by a dedicated scene layer.
- Dynamic artwork never carries unprotected copy. Put titles, time/weather chips, and close controls on a deep-ink translucent plaque or a raised paper surface.
- Brand marks use their deep-ink plaque over scenery; do not recolor the supplied artwork to match a local activity palette.

## Desktop composition

The wide-screen breakpoint is `lg` (1024px). Below it, the app remains touch-first: bottom navigation, bottom sheets, compact grids, and thumb-zone controls are preserved. At `lg`:

- The navigation rail expands to a labelled 224px journal rail and the content canvas gains a deliberate maximum width rather than stretching edge to edge.
- Collection and management pages use two-column compositions when there is a useful inspector (for example, the Pokémon roster panel and Trainer journal tabs). Filters can sit inline with the page instead of occupying permanent bottom-screen space.
- `ResponsivePanel` is the shared inspector primitive. It opens as a right-side field-note panel on desktop and remains a bottom sheet on touch layouts. Keep the same title, focus order, close behavior, and content in both presentations.
- Focused activities receive a framed desktop stage with space for history or HUD information beside the primary playfield. Do not change the game rules or timer behavior to achieve this.
- Desktop-only illustrations are restrained, transparent, and supplementary. They may anchor a sidebar or empty state, but they never replace accessible HTML labels and are hidden below `lg`.
- Use `game-desktop-workspace`, `game-desktop-inspector`, and `game-desktop-activity-stage` for the shared geometry. Avoid page-specific viewport hacks and never add a desktop rule that changes the mobile layout.
- Timers and research HUDs remain high contrast and self-contained; low-time/completion states use semantic color changes rather than glow.

## Motion and accessibility

- Keep transitions short and purposeful for selection, opening, loading, and completion.
- Remove routine shimmer, ambient glow, looping background motion, hover scaling, and gradient animation.
- Preserve expressive animation for capture, battle impact, rarity, milestone, and other meaningful game feedback.
- Honor `prefers-reduced-motion` for every decorative or feedback animation.
- Maintain visible `:focus-visible` rings using the current semantic accent, readable contrast, keyboard activation, and safe-area spacing.

## Illustration and branding

- Use the Pokeori expedition mark for app icons and compact navigation identity.
- Use the transparent Pokeori wordmark for wide brand lockups; do not put it inside a rectangular color panel unless the surrounding surface requires contrast.
- Reuse existing route/location artwork as the primary environmental storytelling.
- Supporting motifs live under `public/ui/pokeori/` and should remain subtle: parchment grain, contour-map lines, and field-note marks.
- Do not add text into generated decorative images when the text can be rendered as accessible HTML.

## Review checklist

- Is this a paper-first or night-activity surface?
- Are colors communicating a state or merely decorating the component?
- Does the component reuse the shared primitive and semantic token?
- Does the layout work at mobile width, desktop width, and with long copy?
- Is the focus state visible and is reduced motion respected?
- Does the change preserve gameplay behavior and authored content?

## Migration note

The player-facing refactor is staged. A compatibility bridge at the end of `src/styles/globals.css` maps older zinc, white, teal, emerald, and black utility classes to the active paper/night tokens while data-heavy screens are migrated. New work should use the semantic `game-*` utilities directly; the bridge is a safety net, not a replacement for updating touched components.
