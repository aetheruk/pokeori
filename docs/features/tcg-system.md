# TCG System

Trading Card Game collection and booster pack opening.

## Locations
- Route: `/game/tcg/*`
- Components: `src/components/tcg/`
- Data: `src/data/tcg/`
- Utilities: `src/utilities/tcg/`
- Hook: `src/hooks/useTCG.ts`

## Features
- Collect TCG cards from various sets
- Open booster packs
- Open all owned packs for a set from the inventory lightning action, skipping card-by-card flips and going straight to the summary
- View collection by set
- Build saved 15-card Baby, Champions, and Masters battle decks per TCG generation series
- Crystallize duplicate cards into Crystals after unlocking the `card-crystalizer` key item
- Card rarity indicators
- Trade with friends (planned)

## Data Structure
TCG collection stored in User:
```typescript
{
  "tcg": {
    "base1-1": 3 // cardId: quantity
  },
  "tcgDecks": {
    "baby": ["base1-47"]
  },
  "tcgDecksByGeneration": {
    "Scarlet & Violet": {
      "baby": ["sv1-1"],
      "champions": [],
      "masters": []
    }
  }
}
```

## TCG Battle
- Decks require exactly 15 unique owned Pokemon cards with HP, type, image, and attacks.
- Deck management is hidden until the `deck-box` key item is owned, then lives on the Trainer page (`/game`) in a dedicated TCG Decks tab and appears in eligible TCG card drawers.
- Each generation series has three deck slots (`baby`, `champions`, `masters`) and auto-build runs per generation+format, only using owned cards from sets in that generation series.
- Each generation+format deck also stores one extra energy-card type slot (outside the 15 card list). The selected type must be valid for that generation series.
- Each TCG Battle game entry can now require a specific series (`settings.requiredSeries`), and battle start enforces both the required series and required format.
- Format deck-cost caps are Baby 30, Champions 55, and Masters 85.
- Format energy pacing uses low starts and charge turns: Baby 4 start / 12 cap / +2 charge, Champions 5 / 16 / +2, Masters 6 / 22 / +2.
- Manual pass is replaced by Charge/End Turn. When at cap and a legal attack exists, the player must attack before ending turn.
- Card timing gates include subtype and cost locks: Stage 1 unlocks at turn 3, Stage 2 at turn 5, 10-cost cards at turn 7, and 15-cost cards at turn 10.
- Card cost is Basic with evolution 1, Stage 1 3, Stage 2 5, Basic without evolution 5, EX/GX/V/Radiant 10, and VMAX/VSTAR/Mega/TAG TEAM/LEGEND/V-UNION/Eternamax 15.
- Battles draw six cards from each deck. The player arranges three front cards and three bench cards; the opponent auto-arranges by battle score.
- Only front cards attack and receive damage. Retreat swaps a front and bench card for the retreating card's converted retreat cost, defaulting to 1.
- Legal attacks include exact numeric damage, supported zero-damage energy discard attacks, and a conservative set of inferred text effects: fixed self-damage, simple self-KO, `Flip a coin` damage gates/bonuses, fixed-count heads multipliers, bench-count damage, direct bench-targeted damage to bench cards, Pokemon-in-play damage, damage-counter scaling on the attacker or target, direct `put damage counters` placement, fixed and damage-dealt-based healing/`remove damage counters` effects, limited next-opponent-turn self protection (`prevent all damage` or `reduce damage by N`), simple self/opponent energy discard, and simple special conditions. Extra energy discards are applied after the attack cost is paid and never block the attack; `discard all Energy` clears the remaining simplified energy pool for that side. Poison and Burn each deal 10 damage at the end of a full player-plus-opponent round. Asleep and Paralyzed attackers flip before attacking; heads clears the condition and attacks, tails fails. Confused attackers flip before attacking; heads clears and attacks, tails fails and deals 10 self-damage. Attack-applied opponent statuses attach to the selected target card, while self statuses attach to the attacking card. Prevention beyond this limited shielding, plus prize-card, deck, hand, discard-pile, and other full-TCG effects remain intentionally unsupported in this simplified mode.
- Coin-flip attacks store their resolved heads/tails results in the battle state and show a short client-side flip animation using the coin front/back images in `public/images`.
- Client action playback stages player commands, coin results, damage, recoil, opponent responses, and promotion prompts while advancing interim HP and front-row snapshots before the final returned board state is committed.
- Generic energy is spent from a side pool. A turn is a full player-plus-opponent round. Turn gates allow attacks costing 0-1 energy on turns 1-2, 2 on turns 3-4, 3 on turns 5-6, 4 on turns 7-9, and unlimited from turn 10.
- On turn 15+, both sides' selected energy-card types activate globally. Each selected type removes one matching energy symbol from all attack costs for both players for the rest of the battle; matching selections stack.
- Wins are decided by remaining living cards. Claiming a player victory counts as one completed research win; opponent wins and exact ties record a failed attempt. Pass-stall tiebreakers only resolve after both sides pass consecutively once the 4+ attack allowance is reached and neither side has a legal attack with remaining energy; results are decided by remaining HP, then living card count. Exact ties are losses for the player.

## Booster Packs
- Generated via `src/utilities/tcg/` logic
- Booster packs use structured slots instead of the general card reward bonus-roll draw. Standard 5-card packs draw 3 common cards, 1 uncommon card, and 1 rare-slot card.
- Rare-slot cards use normalized rarity buckets with a 70 rare / 18 holo rare / 8 ultra / 3 secret / 1 chase upgrade table. Missing buckets are skipped and the available bucket weights are rebalanced.
- Bulk opening applies a 10% penalty to holo rare, ultra, secret, and chase rare-slot weights, moving the reclaimed weight into plain rare. Single-pack opening uses the standard table.
- Non-promo packs have a 1:1000 God Pack chance; a God Pack changes every slot in that pack into a rare-or-better slot.
- Pack draws avoid exact duplicate card IDs within a single pack when possible and give unowned cards a small selection weight bonus.
- Shiny/rare card animations
- Single-pack opening uses the standard card drawer reveal. The inventory lightning action consumes every owned pack for that set, draws all cards in safe server chunks, and opens directly on the summary grid.

## Local Set Artwork
- TCG card art remains remote through each card's `images.small` / `images.large` URL.
- TCG set logo and symbol artwork is cached in source data for generated item sprite composition only and is not bundled as public runtime assets.
- Booster pack and binder item icons are generated for every TCG set under `public/sprites/items/tcg/`.
- `bun run sync:tcg-sprites` fetches set logo/symbol source artwork into `source_data/tcg/set-artwork/` and composes generated pack/binder sprites from the base images in `source_data/tcg/sprite-bases/`.
- Booster pack use skips the old pack-opening animation and opens directly into the card drawer reveal; bulk pack opening skips the card-by-card reveal and starts on the summary.
