# Economy Integrity

Player balances, inventories, rewards, ownership changes, and claim markers are
treated as one economy boundary.

The boundary includes friendship changes, invitation redemption, battle outcomes,
captures, encounter items and escapes, and shared game completion/progression.
Milestone and finish flows share a session lock and consult durable milestone
receipts before selecting rewards. Generated daily completion also checks the
task occurrence's completed flag and generation date; a different request UUID
is not permission to claim again. Keep session cleanup after durable settlement
so retries can recover committed results.

## Transaction contract

- `runEconomyAction` serializes mutations per user, opens a Payload MongoDB
  transaction, and inserts an `economy-action-receipts` row in that same
  transaction.
- Player-triggered actions send a stable client action UUID. A retry with the
  same user, action, and UUID returns the committed response without applying
  the mutation twice.
- Semantic aliases identify the underlying session step or outcome independently
  of the client UUID. All alias receipts commit with the operation; a new UUID
  cannot repeat an already committed step. Keys include the authenticated user
  and action domain. Never accept semantic aliases directly from the client.
- Transaction-aware helpers receive the Payload `req`; MongoDB operations in a
  transaction run sequentially because a session must not execute concurrent
  operations. Payload `find` calls on that request disable pagination because
  its paginated adapter executes the document and count queries concurrently;
  normalized user-state fan-out reads are likewise serialized only while a
  transaction request is active.
- Reward grants without an existing transaction open their own fail-closed
  transaction. Settlement paths with an existing server result key also use it
  as the durable reward idempotency identity.
- MongoDB replica-set transaction support is mandatory. The application does
  not fall back to non-transactional economy writes.

The shared boundary covers shop purchases; item selling, scratch cards,
boosters, consumables, and event-item compensation; task completion; Pokemon
release, evolution, hatching, held items, and targeted item use; Mystery Gift;
voyages and expeditions; Spirit Channeling; Artisan settlement; TCG duplicate
redistribution; Slots and Pachinko settlement; Battle Bets debit, refund, and
settlement; and reward grants used by battles, captures, fishing, activity
completion, UFO Catcher, and Prize Wheel.

## Captures and battle outcomes

The encounter settlement bridge commits ball/item consumption, caught Pokemon,
Pokedex changes, rewards, statistics, and expedition effects before publishing
the updated Redis state. Capture, item, escape, and terminal failure paths share
a revision-based semantic identity. This prevents competing action kinds from
settling the same stale encounter step twice. Deferred Redis writes are published
with compare-and-set; a retry restores the committed response and state.

PVE victory, defeat, and surrender share one terminal outcome receipt. PVP
resolution and surrender likewise share one identity, and both players' durable
effects commit in one transaction: statistics, expedition results, winner
rewards, Sketch unlocks, KO credit, and held-item effects. The receipt retains the
canonical terminal snapshot, so an opposing outcome computed on retry cannot
award both sides. Draws retain their existing no-win/loss-statistics behavior.
PVP turn resolution and surrender use the same battle lock and compare-and-set
publication. Clearing an ongoing battle is refused.

## MongoDB and Redis workflows

MongoDB is authoritative for durable value. Redis remains the short-lived
session coordinator. A workflow that starts an external Redis-backed game from
an inventory item first records the durable debit, then starts the session; a
definite start failure runs a separately idempotent compensating refund. Battle
Bets uses the same debit/compensation pattern. Session result keys remain as a
fast retry cache, while MongoDB receipts are the durable duplicate barrier.

Prize Wheel and UFO Catcher store their paid outcome/attempt in the same durable
receipt as the debit. Failed Redis publication retries restore that outcome
without charging again or rerolling. Client pending-start UUIDs survive reload
until the successful response. Their payouts and activity results commit
together. Fishing item grants and activity wins also share one transaction.

## Audit and repair

`migrate:performance-indexes` requires a replica-set topology. Its prepare and
finalize phases:

- reconcile duplicate normalized user-state and economy receipt rows;
- clamp historical negative inventory, card, counter, activity, and currency
  balances to zero;
- backfill owned Pokedex rarity ledgers;
- create query indexes and then unique compound ledger/receipt indexes.

The duplicate merge is conservative and deterministic: quantities and counters
keep the maximum historical value, booleans are unioned, rarity sets are
unioned, and earliest/latest timestamps retain their intended meaning.

`/api/health` returns unhealthy unless MongoDB responds, the topology advertises
a replica set and logical sessions, Payload has transactions enabled, and
Dragonfly responds.
## Receipt storage and replay retention

Large committed responses are losslessly compressed when this saves at least 20%.
Legacy JSON remains readable. Receipt keys and results never expire; malformed
compressed results fail closed instead of rerunning a charge or reward.
Encoding rejects JSON larger than the 16 MiB decompression limit before the
transaction commits, so compression cannot create an unreplayable success.
Generic receipt reads are administrator-only: envelopes can contain private
outcomes and settlement snapshots. Compression is not encryption. Player-facing
actions return their public response through trusted replay helpers.
`bun scripts/compact-economy-receipts.ts` reports aggregate counts, document bytes,
and date ranges by action without printing player identities or response data.
After deploying the compatible reader, `--apply` compresses at most 1,000 legacy
receipts older than 30 days per invocation. It preserves keys, timestamps and exact
results. No TTL index, deletion, or external archive is introduced. Measure growth
with the read-only report before scheduling batches; do not downgrade to a reader
that lacks compression support once compressed receipts exist.
If a batch returns `nextAfterId`, pass it as `--after-id=<value>` to continue past
small or incompressible rows. A null cursor ends that pass; start a future
maintenance pass without a cursor to pick up newly aged receipts.

## Verification

The final isolated `bun run test:security:integration` run passed **141
assertions** against a replica-set MongoDB, Redis, and real Next HTTP endpoints.
It includes lost-Redis-state retries for captures, encounter items, fishing,
Wheel/UFO debit and settlement, and PVP surrender; semantic-alias replay;
compressed receipt roundtrips; protected receipt reads; concurrent different-UUID
daily claims; and a concurrent milestone/finish race with its transient claimed
marker removed before retry. PVP rollback tests
inject a held-item persistence failure and confirm that both players' effects
roll back. See the [authority inventory](../audit/game-authority-verification-2026-09-07.md)
for detailed evidence and the limits of gameplay verification. These checks did
not mutate production services or deploy the application.
