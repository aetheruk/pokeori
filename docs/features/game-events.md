# Game events

## Authoring

Admins open **Trainer → Events**. Create a draft, set announcement details, create or copy content, add modifiers, and choose start/end timestamps. Times display in the browser timezone and persist as UTC; duration entry and immediate starts are supported. Scheduled events can be edited or cancelled. Active gameplay definitions freeze; admins can change announcement copy, extend the end time, or end immediately. Duplicating creates a fresh draft/run. Recurrence is not included.

**Schedule → Timing mode → Manual on/off** creates an event with no automatic end. Publish it off by default, or select **Enable when published**. Open a published manual event to use **Enable event** or **Disable event**. While disabled it has no announcement or available content, and gameplay settings can be edited. Enabling rechecks conflicts against all overlapping published events, including future schedules. Timing mode is fixed after publication; duplicate to change it. Enabling preserves activity IDs, task progress and shop stock rather than resetting rewards. Disabling stops new entries and task progress; accepted battles/encounters finish using their snapshots, and already-earned task rewards retain the usual 24-hour claim grace. Each enable starts a new optional activation notification, once per eligible device; leaving notifications off keeps every activation silent.

Manual state is stored in the existing definition JSON (`timingMode`, `enabled`), so no collection migration is required. Server-managed start/end timestamps preserve indexed runtime queries and claim expiry. Enabled manual events use an internal open-ended upper bound; player event details omit timing text, and modified Explore cards show only the event title. Scheduled events continue to show their dates. The admin editor retains explicit on/off guidance. Existing definitions without a timing mode remain scheduled.

The Events panel owns its vertical scroll area within the Trainer layout, so long content forms and save/publish controls remain reachable on mobile and desktop.

Supported domains are standard PvE battles, capture locations, shops, Field Observation, and tasks. Structured forms provide source-content search, entity/asset lookup, optional advanced settings, and rarity previews. Other mini-game engines, copied rival teams, PvP, expedition orchestration, and custom password/script handlers are outside this editor. Permanent content remains authored in `src/data`.

The creation flow uses persistent Details, Content, Schedule and Review navigation with next-step actions. Activity choices explain their purpose. Activity editors group Explore presentation, Pokémon, gameplay rules, offers/rewards, availability and scene settings; uncommon options remain in an advanced section. Capture, battle and Field Observation Pokémon pools use searchable sprite rows, with names, levels or relative weights and per-Pokémon options. Encounter shares describe the listed pool; trainer eligibility can change the final pool. Item lookups show sprites, and manual reference entry remains available. Defaults provide a working card icon and unique activity reference without exposing those details as mandatory setup steps.

An event bundles additions and modifiers. Event requirements and normal content requirements both apply. Nullable `visibleAt` controls announcement visibility independently of activation. Silent events still label affected active content; activation push is separately optional.

Visible announcements appear through one **Active Events** card in the scrolling Explore list, matching VS Seeker. Its count distinguishes active and upcoming events. Opening it shows descriptions and schedules in a scrollable mobile sheet or desktop side panel. Notification links open the panel at the matching event; closing it does not reopen it on periodic refresh.

## Resolution

Private `game-events` documents store bounded definitions, schedules, status, and revision. Admin writes use authorization, rate limits, the publication lock, optimistic revision checks, and an economy transaction; audit entries are separate. Publishing validates definitions, references, and overlapping schedules. Runtime activation is `startAt <= serverNow < endAt`; push-worker availability does not control gameplay.

The resolver overlays eligible events on static content. Additions receive an event-run namespace and internal activity references are remapped. Modifications retain static IDs. New shop offers include the shop identity in their namespace; repricing an existing offer retains its stock count. Stock is per trainer. Purchases reread effective content and reject stale quoted costs.

Across overlapping events, the strongest boost wins per field and the lowest price factor wins. Distinct additions coexist. Conflicting replacements, including parent/child fields, are rejected. Review can show resolved effective configurations before publication.

## Rarity thresholds

`rarityChances` maps every registered special rarity to a threshold from zero to one. Forms show percentages. Missing entries inherit their parent and system defaults; explicit zero disables. Capture and wild-battle shiny defaults to 1/512. Trainer enemies default all thresholds to zero. Normal is the fallback. Fixed rarity or explicit shiny/shadow/radiant flags take precedence.

Roll uniformly once. Choose the smallest threshold greater than the roll; break equal-threshold ties uniformly. For Shadow 10%, Silver 1%, Shiny 1/512, final probabilities are Shadow 9%, Silver 0.8046875%, Shiny 0.1953125%, normal 90%. Thresholds need not sum to one.

Capture skill/ability modifiers and extra shiny opportunities become one equivalent threshold: `1 - product(1 - opportunityChance)`. The editor provides base and current-trainer previews for a selected entry. The latter is conditional on the current companion, research, and time; random ability copying/replacement can change the generated entry. Battle enemies roll independently before existing rarity effects are applied.

## Sessions and tasks

Battles retain their existing dynamic configuration snapshot; captures store `locationSnapshot`; Field Observation stores a private `eventConfigSnapshot`. Resumption and settlement use these accepted settings. Expiry blocks new starts and purchases without interrupting or extending existing session lifetimes. Legacy sessions retain static fallbacks.

Event tasks require explicit acceptance. Capture, battle, field-research, game, voyage, and daily-activity objectives count qualifying actions after acceptance. Battle losses use loss settlement; capture filters inspect the caught Pokémon, including rarity. Evolution and power-use counters store acceptance baselines. State-based objectives are recorded alongside transactional gameplay changes before the economy receipt commits. Ownership/unlock conditions use current state; consumable costs remain due at claim.

Progress ends at event expiry. Earned objectives remain claimable for 24 hours; later session finishes retain session rewards but cannot advance expired tasks. Accepted task terms are pinned. Permanent tasks preserve their completion identity and return to base rules if unfinished after expiry. Event-created tasks use fresh identities on duplicate runs. Participation and claims are separate private records; existing economy receipts protect reward claims.

## Notifications

**Game events** is an independent per-device preference, default off. Old documents and old preference payloads default it off. Disabling all three notification categories removes the subscription. Optional activation pushes use the existing persistent worker, opt-in timestamps, requirements, the active window, and a 24-hour retry horizon. `event-deliveries` stores sent/ineligible decisions per device/event. Stable tags reduce duplicate visible alerts if a provider accepts delivery before a receipt is persisted.

Devices enabled after activation do not receive a replay. Eligibility is evaluated on first dispatch, with ineligible receipts preventing later unlocks replaying the announcement. Delivery remains best effort and may be delayed by worker or OS. Clicks open the event in Explore using the existing active-gameplay navigation protection.

## Validation and rollout

Run `bun test tests/game-events.test.ts tests/event-runtime.test.ts tests/rarity-chances.test.ts tests/notifications.test.ts`, typecheck, lint, data validation, and the full Bun suite. `bun run test:e2e e2e/event-studio.pw.ts e2e/event-card.pw.ts e2e/notification-settings.pw.ts` checks phone/desktop authoring, Pokémon selection, validated configuration saves and Explore event panels with an isolated UI transport. Runtime fixtures cover participation and delivery behavior; they do not replace real MongoDB/Redis integration.

Prepare the event/participation/audit/delivery indexes through the existing performance-index migration before enabling production authoring. Custom text primary keys provide participation/delivery identity. No events are seeded or launched automatically. Ship `0.33.0` or the next unused minor version through protected main/Coolify. Verify `/api/app-version`, open-PWA refresh, real start/end transitions, transactional purchases/claims, restarts, and a Home Screen push. Keep historical event, audit, and claim records; no destructive cleanup migration is included.
