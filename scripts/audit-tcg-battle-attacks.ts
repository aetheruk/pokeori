import { writeFileSync } from 'node:fs'
import tcgSets from '../src/data/tcg'
import { getTcgSetDetailsById } from '../src/data/tcg/details'
import { getSupportedTcgBattleAttacks } from '../src/utilities/tcg/tcg-battle'

type UnmatchedAttack = {
  setId: string
  cardId: string
  cardName: string
  attackName: string
  damage: string
  text: string
}

const unmatched = new Map<string, { attack: UnmatchedAttack; count: number; cards: Set<string> }>()
const cardsWithoutSupportedAttacks: Array<{ setId: string; cardId: string; name: string }> = []
let pokemonCards = 0
let attackOccurrences = 0
let unsupportedOccurrences = 0

for (const set of tcgSets) {
  const cards = await getTcgSetDetailsById(set.id)
  for (const card of cards || []) {
    if (card.supertype !== 'Pokémon') continue
    pokemonCards += 1
    const attacks = card.attacks || []
    attackOccurrences += attacks.length
    const supported = getSupportedTcgBattleAttacks(attacks, set.id)
    if (attacks.length && !supported.length) {
      cardsWithoutSupportedAttacks.push({ setId: set.id, cardId: card.id, name: card.name })
    }

    const supportedKeys = new Set(supported.map((attack) => `${attack.name}\u0000${attack.damage}\u0000${attack.text}`))
    for (const attack of attacks) {
      const key = `${attack.name}\u0000${attack.damage}\u0000${attack.text}`
      if (supportedKeys.has(key)) continue
      unsupportedOccurrences += 1
      const groupKey = `${set.id}\u0000${key}`
      const entry = unmatched.get(groupKey) || {
        attack: {
          setId: set.id,
          cardId: card.id,
          cardName: card.name,
          attackName: attack.name,
          damage: attack.damage,
          text: attack.text,
        },
        count: 0,
        cards: new Set<string>(),
      }
      entry.count += 1
      entry.cards.add(`${card.id} (${card.name})`)
      unmatched.set(groupKey, entry)
    }
  }
}

const groups = [...unmatched.values()].sort((a, b) => b.count - a.count || a.attack.setId.localeCompare(b.attack.setId) || a.attack.attackName.localeCompare(b.attack.attackName))
const table = groups.map(({ attack, count, cards }) => {
  const examples = [...cards].slice(0, 5).join('; ')
  const text = attack.text.replace(/\s+/g, ' ').replace(/\|/g, '\\|').trim() || '—'
  return `| ${count} | ${attack.setId} | ${attack.attackName.replace(/\|/g, '\\|')} | ${attack.damage.replace(/\|/g, '\\|')} | ${text} | ${examples.replace(/\|/g, '\\|')} |`
}).join('\n')

const noAttackList = cardsWithoutSupportedAttacks.map(({ setId, cardId, name }) => `| ${setId} | ${cardId} | ${name.replace(/\|/g, '\\|')} |`).join('\n') || '| — | — | — |'
const report = `# TCG Battle Attack Support Audit\n\n` +
  `Generated from all ${tcgSets.length} catalogued sets using the set-aware attack resolver. The catalog contains ${pokemonCards.toLocaleString('en-US')} Pokémon cards and ${attackOccurrences.toLocaleString('en-US')} attack occurrences. ${(attackOccurrences - unsupportedOccurrences).toLocaleString('en-US')} attacks match an implemented effect; ${unsupportedOccurrences.toLocaleString('en-US')} occurrences across ${groups.length.toLocaleString('en-US')} set-specific text groups have no resolver mapping and need review. Matching a text family does not prove every printed rider is implemented; this report only audits whether an attack is offered by the current set-aware resolver.\n\n` +
  `Cards listed below have printed attacks but no attack currently supported by the resolver; the card may therefore have no usable attack in battle.\n\n` +
  `| Set | Card ID | Pokémon |\n| --- | --- | --- |\n${noAttackList}\n\n` +
  `## Unmatched attack groups\n\n` +
  `Review these exact set-specific attack texts against the battle engine. Repeated prints in one set are grouped; examples list up to five card IDs. A missing mapping may be a genuine off-model effect or a coverage gap, so this generated list does not classify entries as supported, skipped, or implementable.\n\n` +
  `| Occurrences | Set | Attack | Printed damage | Printed effect text | Example cards |\n| ---: | --- | --- | --- | --- | --- |\n${table}\n`

writeFileSync('docs/game-data/tcg-attack-support-audit.md', report)
