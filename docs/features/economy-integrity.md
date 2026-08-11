# Economy Integrity

Player balances, inventories, rewards, ownership changes, and claim markers are
treated as one economy boundary.

## Transaction contract

- `runEconomyAction` serializes mutations per user, opens a Payload MongoDB
  transaction, and inserts an `economy-action-receipts` row in that same
  transaction.
- Player-triggered actions send a stable client action UUID. A retry with the
  same user, action, and UUID returns the committed response without applying
  the mutation twice.
- Transaction-aware helpers receive the Payload `req`; MongoDB operations in a
  transaction run sequentially because a session must not execute concurrent
  operations.
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

## MongoDB and Redis workflows

MongoDB is authoritative for durable value. Redis remains the short-lived
session coordinator. A workflow that starts an external Redis-backed game from
an inventory item first records the durable debit, then starts the session; a
definite start failure runs a separately idempotent compensating refund. Battle
Bets uses the same debit/compensation pattern. Session result keys remain as a
fast retry cache, while MongoDB receipts are the durable duplicate barrier.

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
