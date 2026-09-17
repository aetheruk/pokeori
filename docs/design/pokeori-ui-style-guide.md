# Pokeori UI style guide

Pokeori is a field journal for exploring, observing, collecting, and caring for Pokemon. The interface should feel authored by a curious naturalist: warm paper, ink, charcoal, clay, and field marks layered over the project’s hand-painted route scenes.

## Visual language

Use one field-journal presentation across player-facing UI. Focused activities may contain a contextual scene or playfield, but their readable interface chrome, controls, dialogs, and status surfaces remain paper-first.

## Palette and semantics

The exact CSS variables live in `src/styles/globals.css`. Use semantic roles instead of raw color utilities.

| Role | Color direction | Use |
| --- | --- | --- |
| Paper canvas | warm parchment `#efe4cf` | ordinary page backgrounds |
| Paper background | warm cream `#f4eacf` | surfaces that previously carried the paper texture |
| Raised paper | cream `#fff8e8` | cards, drawers, dialogs, selected panels |
| Ink | deep charcoal `#293532` | primary text and headings |
| Muted ink | neutral grey `#6b6f6d` | descriptions, metadata, disabled copy |
| Paper line | warm tan `#cbbd9f` | borders, rules, separators |
| Charcoal | `#293532` | active navigation, selected states, positive progress, and focused controls |
| Deep charcoal | `#1d2522` | pressed/strong charcoal states |
| Clay | `#b86148` | primary actions, rewards, urgent calls to action |
| Ochre | `#b58a43` | discoveries, milestones, special progress |

Do not use green, moss, teal, or saturated emerald in routine interface chrome. Avoid pure black, arbitrary gradient text, and decorative color that does not communicate state. Preserve Pokemon type colors and rarity colors only when they are gameplay semantics.

## Typography

- Use the self-hosted Nunito Sans family for the Pokeori wordmark companion text, page titles, section titles, authored story moments, labels, controls, descriptions, and body copy, with the system sans stack as a fallback for non-Next surfaces.
- Use the system monospace stack only for timers, levels, quantities, IDs, and other numeric readouts.
- Prefer sentence case. Use uppercase or letter spacing only for short metadata labels, not entire page titles or paragraphs.
- Keep display titles compact and editorial rather than oversized or italicized by default.

## Geometry and surfaces

- Use 8px to 12px corner radii for cards and panels.
- Use crisp 1px warm borders with low-contrast paper shadows; avoid black glow halos.
- Raised white cards use the shared `game-card-border` edge, a slightly firmer charcoal-tinted line than ordinary paper rules. This is the card treatment used by Artisan, Explore, and collection chips; keep state borders such as clay, ochre, and charcoal accents on top where they communicate selection or progress.
- Use clipped, ticket-like, or map-tab shapes for navigation and section selectors when they improve hierarchy.
- Reserve pill shapes for statuses, filters, compact tags, and counts.
- Keep touch targets at least 40px, with 44px preferred for primary mobile controls.
- Use the solid warm cream canvas `#f4eacf` for paper-first surfaces. Keep map motifs and field-note marks restrained; do not add paper grain or texture to routine UI.

## Component rules

- Extend `src/components/ui/button.tsx`, `card.tsx`, `input.tsx`, `select.tsx`, `tabs.tsx`, `dialog.tsx`, `drawer.tsx`, and `page-header.tsx` before adding a local variant.
- Primary buttons are clay; active navigation and selected controls are charcoal; discovery/progress callouts are ochre; errors remain brick red.
- Secondary actions use outlined or lightly tinted paper surfaces, never a second competing neon accent.
- Page headers combine a small contextual label, a serif title, and an optional short description. Avoid repeated oversized headers above every subsection.
- Lists use stable rows with a centered glass icon orb, clear title/metadata hierarchy, and visible keyboard focus. Hover should not move or enlarge the row.
- Section headings use centered text with rules extending to both sides; do not add a decorative diamond before the heading.
- Explore list cards keep the activity artwork on the left, remove redundant right-side type accessories, and right-align the title and status. When content provides a background, use it as a low-opacity scenic layer beneath a directional raised-paper fade so the scene remains visible on the art side while titles and statuses stay readable. Special Events use the cosmic-gold scene with an ochre bulletin treatment; trainer rematches use the battle scene. Repeatable tasks use a small repeat badge at the bottom center of their icon. When a card groups multiple activities, its actions stay right-aligned and use clean two-part buttons with semantic activity-colored icon wells: Fishing uses blue, Explore/catch uses charcoal, battles use clay, and study uses ochre. Every activity icon sits directly in its colored well without an extra icon orb.
- Badge collections show the badge artwork without a label or rounded-square frame. Inventory’s bag artwork follows the same unframed treatment as skill artwork.
- Dialogs and drawers use paper surfaces across player-facing screens, while retaining the same padding and close/focus behavior.
- Explore drawers use gesture dismissal and keep the scenic header free of a redundant close button. Their category chip sits below the centered icon as a glass orb treatment, with a centered icon/text row, tight line-height, and comfortable horizontal inset; requirements/reward carousels render their own single card items without a second wrapper card.

## Activity and scene composition

- Focused activities use light field-journal chrome by default: parchment HUDs, cream controls, ink copy, charcoal selection, clay calls to action, and ochre discovery states.
- Keep the playfield itself contextual. A fishing pond, battle scene, card table, or puzzle board may use its own artwork or scene treatment, but it must be separated from the readable UI by a dedicated scene layer.
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
- Supporting motifs live under `public/ui/pokeori/` and should remain subtle: contour-map lines and field-note marks.
- Do not add text into generated decorative images when the text can be rendered as accessible HTML.

## Review checklist

- Is this readable interface chrome, or is it a contextual playfield layer?
- Are colors communicating a state or merely decorating the component?
- Does the component reuse the shared primitive and semantic token?
- Does the layout work at mobile width, desktop width, and with long copy?
- Is the focus state visible and is reduced motion respected?
- Does the change preserve gameplay behavior and authored content?

## Migration note

The player-facing refactor is staged. A compatibility bridge at the end of `src/styles/globals.css` maps older zinc, white, teal, emerald, black, and legacy moss utilities to neutral field-journal tokens while data-heavy screens are migrated. New work should use the semantic `game-*` utilities directly, especially `game-charcoal` and `game-icon-orb`; the bridge is a safety net, not a replacement for updating touched components.

Explore drawer and dialog header plaques, the explore page weather chip, expedition abandon control, trainer banner chips, and trainer-card icon tiles now use light raised-paper surfaces with clay/ochre accents directly, so they stay paper-first even outside `game-activity-chrome` screens.
