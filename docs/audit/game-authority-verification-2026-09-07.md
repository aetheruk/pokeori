# Game authority verification — 7 September 2026

This is an implementation checkpoint, not a declaration that every settlement
path is atomic. Inventory was generated from `allGames`: 29 distinct game types.
The main audit and remediation report records release readiness and remaining work.

## Reward and result authority inventory

| Authored game types | Result authority in the current implementation |
| --- | --- |
| silhouette, identify, cry, compare | Server session selects the subject and verifies submitted answers; completion uses recorded wins. |
| snap | Server subject and target timing window; completion uses recorded wins. |
| spelling, sliding-puzzle, procedure-order | Server session validates each letter, tile move, or submitted ordering. |
| field-observation | Private server observation data verifies answers and reward subjects. |
| grid-puzzle | Rock Push, Echo Map, and Voltorb proof verifiers reconstruct the solution. Rock Push reward objects additionally require activity evidence relative to the session baseline. |
| magnemite-circuit | Submitted circuit solution is verified against authored connections. |
| run, flap, surf | Seeded fixed-step simulation replays bounded inputs, collision survival, score, and collectible rewards. |
| rhythm, mining | Same checkpoint protocol: seeded notes/targets, actual timed button inputs, computed hit quality, damage, and win/loss. |
| snake, brick-breaker | Integrated with the shared checkpoint protocol by the game-integrity agent; see its trajectory simulator tests. |
| match3 | Server board, legal swaps, cascade score, revision, and deadline. |
| tcg-inspection | Server rounds, answers, score, and deadline. |
| diglett-tunnel-tap | Server-generated targets and verified hits; stored score drives completion. |
| art-academy | Server evaluates the submitted bounded drawing against private reference data. |
| slots | Server generates reels; transactional wager and payout. |
| pachinko | Server simulation resolves launch inputs; transactional wager and payout. |
| ufo-catcher | Server validates hold durations and resolves seeded prizes/private grip roll. Durable start receipts contain the charged attempt; payout and stats share a settlement transaction. |
| prize-wheel | Server chooses outcome. Durable start receipts contain the charged spin; payout and stats share a settlement transaction. |
| fishing | Server cast selection and hook deadline. Item grant and activity win now share a durable transaction; the Pokemon branch enters the separate catch pipeline. |
| tcg-battle | Server battle state must be finished and winner must match before generic completion. |
| battle-bets | Dedicated server wager/battle resolution. Generic completion no longer adds client-declared wins. |

The generic completion helper is `src/app/(frontend)/game/_shared/activity-actions.ts`.
Per-game actions live in `research/games`; Battle Bets actions live in
`game/games/battle-bets-actions.ts`. Proof utilities live in `src/utilities/research`
and the corresponding game utility modules.

## Checkpoint protocol and behavioral changes

`arcade-authority.ts` accepts a session identifier, exact revision, target tick,
and input transcript. It accepts at most 600 ticks and 300 inputs per checkpoint,
checks elapsed server time, rejects invalid controls and duplicate input events,
and computes results from stored settings. `checkpointArcade` authenticates the
actor, takes the shared settlement lock, and atomically saves the Redis state and
replay receipt using compare-and-set. Submitted scores and collectible counts
have no authority. Browser prediction runs the same simulator.

The client saves every 300 ticks and pauses while saving or recovering a failed
request. Reload resumes the last acknowledged checkpoint, so up to five seconds
of unacknowledged play can be replayed. Run/Flap collision masks were replaced by
deterministic padded geometry; those difficulty changes require player testing.
Rhythm uses a fixed 300-pixel logical track scaled to the display, making hit
windows independent of viewport width. All arcade sessions have a bounded two-hour
durable lifetime for paused tabs and network recovery. Authored timed games still
end at their simulation time limit; untimed/endless simulation no longer inherits
a 60-second limit.

This verifies legal gameplay, not that a human produced the inputs. A determined
client can automate valid inputs; public seeds and puzzle data are not secrets.

## Separate catch pipeline

Encounter QTEs previously accepted aggregate success counters. They now require
three bounded circle paths, six distinct decoy selections, or a timed tap
transcript. Server checks geometry, control indices, ordering, elapsed time, and
event spacing. Existing counters alone fail. Calm still verifies the chosen berry.

The scalar throw ring quality has been replaced with a server-issued, per-attempt
timing challenge. The server checks the challenge, attempt, elapsed time, and a
bounded network-latency allowance before deriving ring phase. This stops arbitrary
ring-scale submission; it does not prevent automated timing or prove human input.
Capture and mid-encounter items now use a durable settlement bridge, with MongoDB
writes committed before deferred Redis publication. Failure and escape paths use
the same bridge. Semantic aliases prevent a new client request identifier from
repeating an already committed encounter operation.

Durable receipt envelopes may contain private outcome data. Generic receipt reads
are therefore administrator-only; authenticated gameplay helpers replay receipts
through trusted server code. Compression is reversible storage, never secrecy.
Encoding rejects JSON larger than the decompression replay bound before commit.

## Battle terminal outcomes

PVP terminal resolution and surrender now share one durable outcome identity.
Both participants' statistics and expedition results, winner rewards and Sketch
unlocks, KO credit, and held-item effects commit in the same MongoDB transaction.
The receipt preserves the canonical terminal snapshot: a retry that computes the
opposite winner restores the original result. Draws preserve the prior no-win/loss
statistics rule while persisting item consumption and KO effects.

Surrender and turn resolution share a per-battle lock. Turn state publication uses
Redis compare-and-set, and lock release checks the owning token atomically. PVE
surrender uses the same loss handler as normal terminal resolution. Clearing an
ongoing battle is refused; the player must surrender or finish it first.

## Executed evidence

- `bun test tests/encounter-items.test.ts tests/arcade-authority.test.ts`:
  30 passing tests, 177 assertions. Tests cover legal wins, collision death,
  impossible time, forged scores/rewards, stale identity/revision, invalid controls,
  mining hit damage, rhythm scoring, and QTE aggregate-counter rejection.
- `bun run test:security:integration`: 141 assertions passed against isolated
  replica-set MongoDB, Redis, and a real Next server. This includes protected
  Payload Local API/REST/GraphQL writes, signup invitation concurrency, real direct
  Server Action access checks, safe original-trainer projection, compressed durable
  receipt replay, and checkpoint authorization/revision/replay behavior.
- Fishing crash recovery was exercised by restoring the hooked Redis state and
  removing transient receipts after the database commit, then invoking the real
  action again. Exactly one potion and one activity win remained.
- Wheel and UFO tests remove pending Redis data after the wallet commit and retry
  the original request. The exact paid outcome is restored with one debit. Removing
  transient settlement receipts and restoring pending data produces one payout and
  one activity result. A claimed wheel request cannot be resurrected as a free spin.
- Private receipt reads are denied to the owner through Local API, REST, and
  GraphQL; administrator positive controls pass. The final integration run also
  includes the coordinating agent's capture settlement checks.
- Final receipt/alias review regressions passed 17 tests with 126 assertions,
  including oversized response rejection and a legacy null receipt that must not
  be treated as an unused operation identity.
- PVP engine, synchronization, and settlement regressions passed 46 tests with
  187 assertions. An injected final held-item failure rolls back both players'
  effects. Actual direct-action tests reject ongoing clear, settle surrender once,
  and restore the same result after Redis loss and an opposing terminal retry.
- The final run includes concurrent generated-daily claims with different UUIDs
  (one currency grant), and concurrent milestone/finish requests followed by loss
  of the transient claimed marker (one milestone item and one game win). These
  exercise the original audit's S6 and S12 acceptance cases through real actions.
- The final focused security/auth/QTE/arcade command passed 42 tests with 512
  assertions across five files.
- `bun run lint` passed after the security and QTE changes. Cross-repository
  typechecking and final full-suite results are owned by the coordinating agent.

The integration runner explicitly overwrites repository credentials with loopback
test DSNs and asserts the test database before mutations. Tests delete their own
fixture records; no production services were mutated.
