import fs from 'fs'
import path from 'path'
import { fileURLToPath, pathToFileURL } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const tcgdexDataDir = path.join(__dirname, '../source_data/tcg/tcgdex/data')
const outputDir = path.join(__dirname, '../src/data')
const tcgRootDir = path.join(outputDir, 'tcg')
const setsOutputDir = path.join(tcgRootDir, 'sets')
const detailsOutputDir = path.join(tcgRootDir, 'details')
const legacyDataFile = path.join(outputDir, 'tcg-data.ts')
const boosterPacksOutputPath = path.join(outputDir, 'items/entries/booster-packs.ts')
const setSummariesOutputPath = path.join(tcgRootDir, 'summaries.ts')
const setLoaderOutputPath = path.join(tcgRootDir, 'set-loader.ts')

// TCGdex set IDs are the source IDs; Pokeori keeps its existing IDs as storage keys.
// These aliases protect collection rows, binders, packs, decks, and authored content.
const TCGDEX_SET_ID_ALIASES = {
  lc: 'base6',
  bog: 'bp',
  cel25cc: 'cel25c',
  fut2020: 'fut20',
  hgssp: 'hsp',
  '2011bw': 'mcd11',
  '2012bw': 'mcd12',
  '2014xy': 'mcd14',
  '2015xy': 'mcd15',
  '2016xy': 'mcd16',
  '2017sm': 'mcd17',
  '2018sm': 'mcd18',
  '2019sm': 'mcd19',
  '2021swsh': 'mcd21',
  '2022swsh': 'mcd22',
  me01: 'me1',
  me02: 'me2',
  'me02.5': 'me2pt5',
  me03: 'me3',
  me04: 'me4',
  me05: 'me5',
  '30th': 'me55',
  '30th-c': 'me55c',
  'swsh10.5': 'pgo',
  'sv10.5w': 'rsv10pt5',
  'sm3.5': 'sm35',
  'sm7.5': 'sm75',
  sv01: 'sv1',
  sv02: 'sv2',
  sv03: 'sv3',
  'sv03.5': 'sv3pt5',
  sv04: 'sv4',
  'sv04.5': 'sv4pt5',
  sv05: 'sv5',
  sv06: 'sv6',
  'sv06.5': 'sv6pt5',
  sv07: 'sv7',
  sv08: 'sv8',
  'sv08.5': 'sv8pt5',
  sv09: 'sv9',
  'swsh12.5': 'swsh12pt5',
  'swsh12.5gg': 'swsh12pt5gg',
  'swsh3.5': 'swsh35',
  'swsh4.5': 'swsh45',
  'swsh4.5sv': 'swsh45sv',
  'tk-ex-latia': 'tk1a',
  'tk-ex-latio': 'tk1b',
  'tk-ex-p': 'tk2a',
  'tk-ex-m': 'tk2b',
  'sv10.5b': 'zsv10pt5',
}

// Keep curated game groupings here so regenerated TCG source data preserves them.
const SET_METADATA_OVERRIDES = {
  base6: { series: 'Base' },
  bp: { series: 'Base' },
  fut20: { series: 'Sword & Shield' },
  si1: { series: 'Neo' },
}

function sanitizeIdentifier(value) {
  const cleaned = value.replace(/[^a-zA-Z0-9_]/g, '_')
  if (/^[0-9]/.test(cleaned)) {
    return `_${cleaned}`
  }
  return cleaned
}

function getEnglish(value) {
  if (typeof value === 'string') return value
  return typeof value?.en === 'string' ? value.en : ''
}

function normalizeName(value) {
  return String(value || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

function normalizeCardNumber(value) {
  const normalized = String(value || '').trim()
  const match = normalized.match(/^([a-z]*)(0*\d+)(.*)$/i)
  if (!match) return normalized.toLowerCase()
  return `${match[1].toLowerCase()}${Number(match[2])}${match[3].toLowerCase()}`
}

function normalizeLocalId(value) {
  const normalized = String(value || '').trim()
  return /^\d+$/.test(normalized) ? String(Number(normalized)) : normalized
}

function compareCardNumbers(a, b) {
  const normalize = (value) => {
    if (!value) return { number: Number.MAX_SAFE_INTEGER, suffix: '' }
    const match = String(value).match(/^(\d+)(.*)$/)
    if (!match) return { number: Number.MAX_SAFE_INTEGER, suffix: value }
    return { number: parseInt(match[1], 10), suffix: match[2] || '' }
  }
  const an = normalize(a)
  const bn = normalize(b)
  if (an.number !== bn.number) return an.number - bn.number
  return an.suffix.localeCompare(bn.suffix)
}

async function loadExistingCatalog() {
  if (!fs.existsSync(setsOutputDir)) {
    throw new Error('The existing Pokeori TCG catalog is missing; refusing to generate without an ID compatibility baseline.')
  }

  const sets = new Map()
  for (const file of fs.readdirSync(setsOutputDir).filter((entry) => entry.endsWith('.ts'))) {
    const module = await import(pathToFileURL(path.join(setsOutputDir, file)).href)
    const set = module.default
    if (set?.id && Array.isArray(set.cards)) sets.set(set.id, set)
  }

  if (sets.size === 0) {
    throw new Error('The existing Pokeori TCG catalog is empty; refusing to generate without an ID compatibility baseline.')
  }

  const detailsById = new Map()
  if (fs.existsSync(detailsOutputDir)) {
    for (const file of fs.readdirSync(detailsOutputDir).filter((entry) => entry.endsWith('.ts'))) {
      const module = await import(pathToFileURL(path.join(detailsOutputDir, file)).href)
      for (const detail of module.default || []) {
        if (detail?.id) detailsById.set(detail.id, detail)
      }
    }
  }

  const summariesById = new Map()
  if (fs.existsSync(setSummariesOutputPath)) {
    const module = await import(pathToFileURL(setSummariesOutputPath).href)
    for (const summary of module.tcgSetSummaries || []) {
      if (summary?.id) summariesById.set(summary.id, summary)
    }
  }

  return { sets, detailsById, summariesById }
}

async function loadTcgdexSets(existingSetIds) {
  if (!fs.existsSync(tcgdexDataDir)) {
    throw new Error('TCGdex source files are missing. Run `bun run fetch:tcg` first.')
  }

  const sets = new Map()
  for (const group of fs.readdirSync(tcgdexDataDir, { withFileTypes: true }).filter((entry) => entry.isDirectory())) {
    const groupDir = path.join(tcgdexDataDir, group.name)
    for (const file of fs.readdirSync(groupDir).filter((entry) => entry.endsWith('.ts'))) {
      const filePath = path.join(groupDir, file)
      const module = await import(pathToFileURL(filePath).href)
      const sourceSet = module.default
      if (!sourceSet?.id || !sourceSet?.name) continue

      const setId = TCGDEX_SET_ID_ALIASES[sourceSet.id] || sourceSet.id
      if (!existingSetIds.has(setId)) continue
      if (sets.has(setId)) {
        throw new Error(`More than one TCGdex set maps to Pokeori set ${setId}.`)
      }

      const cardDir = filePath.slice(0, -3)
      const cards = []
      if (fs.existsSync(cardDir)) {
        for (const cardFile of fs.readdirSync(cardDir).filter((entry) => entry.endsWith('.ts'))) {
          const cardPath = path.join(cardDir, cardFile)
          const cardModule = await import(pathToFileURL(cardPath).href)
          if (!cardModule.default) continue
          cards.push({
            localId: path.basename(cardFile, '.ts'),
            card: cardModule.default,
          })
        }
      }

      sets.set(setId, { sourceSet, cards })
    }
  }

  return sets
}

function getArtistTokens(value) {
  return new Set(
    String(value || '')
      .split(/[,;+]/)
      .map(normalizeName)
      .filter(Boolean),
  )
}

function scoreLegacyCardMatch(sourceCard, sourceLocalId, legacyCard, legacyDetail) {
  let score = 0
  if (normalizeCardNumber(sourceLocalId) === normalizeCardNumber(legacyCard.number)) score += 12

  const sourceArtists = getArtistTokens(sourceCard.illustrator)
  const legacyArtists = getArtistTokens(legacyCard.artist)
  const sharedArtists = [...sourceArtists].filter((artist) => legacyArtists.has(artist)).length
  if (sharedArtists > 0) {
    score += sharedArtists === sourceArtists.size && sharedArtists === legacyArtists.size ? 5 : 2
  }

  const sourceAttackNames = (sourceCard.attacks || []).map((attack) => normalizeName(getEnglish(attack?.name)))
  const legacyAttackNames = (legacyDetail?.attacks || []).map((attack) => normalizeName(attack?.name))
  const sharedAttacks = sourceAttackNames.filter((name) => name && legacyAttackNames.includes(name)).length
  if (sharedAttacks > 0) {
    const overlap = sharedAttacks / Math.max(sourceAttackNames.length, legacyAttackNames.length, 1)
    score += overlap >= 0.5 ? 6 : 3
  }

  if (sourceCard.hp != null && String(sourceCard.hp) === String(legacyCard.hp)) score += 1
  if (Array.isArray(sourceCard.types) && sourceCard.types.join('|') === (legacyCard.types || []).join('|')) {
    score += 1
  }
  return score
}

function findLegacyCardById(sourceLocalId, legacySet, cardsById) {
  const candidateIds = [
    `${legacySet.id}-${normalizeLocalId(sourceLocalId)}`,
    `${legacySet.id}-${sourceLocalId}`,
  ]

  for (const candidateId of candidateIds) {
    const direct = cardsById.get(candidateId)
    if (direct) return direct
  }
  return null
}

function findLegacyCardByName(sourceCard, sourceLocalId, legacySet, detailsById, claimedIds) {
  const normalizedSourceName = normalizeName(getEnglish(sourceCard.name))
  if (!normalizedSourceName) return null
  const candidates = legacySet.cards.filter(
    (card) => !claimedIds.has(card.id) && normalizeName(card.name) === normalizedSourceName,
  )
  if (candidates.length === 1) return candidates[0]
  if (candidates.length <= 1) return null

  const scored = candidates
    .map((card) => ({
      card,
      score: scoreLegacyCardMatch(sourceCard, sourceLocalId, card, detailsById.get(card.id)),
    }))
    .sort((left, right) => right.score - left.score)

  if (scored[0].score <= 0 || scored[0].score === scored[1].score) return null
  return scored[0].card
}

function getTcgdexCardImages(sourceSet, localId) {
  const seriesId = sourceSet.serie?.id
  if (!seriesId || !sourceSet.id) return null
  const prefix = `https://assets.tcgdex.net/en/${encodeURIComponent(seriesId)}/${encodeURIComponent(sourceSet.id)}/${encodeURIComponent(localId)}`
  return { small: `${prefix}/low.webp`, large: `${prefix}/high.webp` }
}

function mapCategory(category, fallback) {
  if (category === 'Pokemon') return 'Pokémon'
  if (category === 'Trainer' || category === 'Energy') return category
  return fallback || ''
}

function mapSubtypes(sourceCard, fallback = []) {
  if (Array.isArray(fallback) && fallback.length > 0) return fallback
  const stageNames = {
    Basic: 'Basic',
    Stage1: 'Stage 1',
    Stage2: 'Stage 2',
    BREAK: 'BREAK',
    'LEVEL-UP': 'Level-Up',
    MEGA: 'Mega',
    RESTORED: 'Restored',
    VMAX: 'VMAX',
    'V-UNION': 'V-UNION',
    VSTAR: 'VSTAR',
    Baby: 'Baby',
  }
  if (sourceCard.stage && stageNames[sourceCard.stage]) return [stageNames[sourceCard.stage]]
  if (sourceCard.trainerType) return [sourceCard.trainerType === 'Tool' ? 'Pokémon Tool' : sourceCard.trainerType]
  if (sourceCard.energyType === 'Special') return ['Special']
  return []
}

function toLegacyCard(sourceCard, sourceSet, localId, legacyCard) {
  const sourceImages = getTcgdexCardImages(sourceSet, localId)
  const sourceRarity = sourceCard.rarity && sourceCard.rarity !== 'None' ? sourceCard.rarity : null
  return {
    ...legacyCard,
    id: legacyCard.id,
    name: legacyCard.name || getEnglish(sourceCard.name),
    number: legacyCard.number || normalizeLocalId(localId),
    artist: sourceCard.illustrator || legacyCard.artist || null,
    rarity: legacyCard.rarity || sourceRarity,
    supertype: mapCategory(sourceCard.category, legacyCard.supertype),
    subtypes: mapSubtypes(sourceCard, legacyCard.subtypes),
    hp: sourceCard.hp != null ? String(sourceCard.hp) : legacyCard.hp || null,
    types: Array.isArray(sourceCard.types) ? sourceCard.types : legacyCard.types || [],
    evolvesFrom: getEnglish(sourceCard.evolveFrom) || legacyCard.evolvesFrom || null,
    // TCGdex records evolvesFrom but not evolvesTo. Preserve the existing reverse edge.
    evolvesTo: Array.isArray(legacyCard.evolvesTo) ? legacyCard.evolvesTo : [],
    convertedRetreatCost:
      typeof sourceCard.retreat === 'number'
        ? sourceCard.retreat
        : legacyCard.convertedRetreatCost ?? null,
    nationalPokedexNumbers: Array.isArray(sourceCard.dexId)
      ? sourceCard.dexId
      : legacyCard.nationalPokedexNumbers || [],
    images: sourceImages || legacyCard.images || { small: '', large: '' },
  }
}

function toLegacyCardDetail(sourceCard, sourceSet, localId, legacyCard, legacyDetail) {
  const card = toLegacyCard(sourceCard, sourceSet, localId, legacyCard)
  const retreatCost =
    typeof sourceCard.retreat === 'number'
      ? Array.from({ length: sourceCard.retreat }, () => 'Colorless')
      : legacyDetail?.retreatCost || []
  const abilities = Array.isArray(sourceCard.abilities)
    ? sourceCard.abilities.map((ability) => ({
        name: getEnglish(ability?.name),
        text: getEnglish(ability?.effect),
        type: ability?.type || '',
      }))
    : legacyDetail?.abilities || []
  const legacyAttacks = Array.isArray(legacyDetail?.attacks) ? legacyDetail.attacks : []
  const attacks = Array.isArray(sourceCard.attacks)
    ? sourceCard.attacks.map((attack, index) => {
        const sourceName = getEnglish(attack?.name)
        const sameNameAttack = legacyAttacks.find(
          (legacyAttack) => normalizeName(legacyAttack.name) === normalizeName(sourceName),
        )
        const legacyAttack =
          sameNameAttack || (legacyAttacks.length === sourceCard.attacks.length ? legacyAttacks[index] : null)
        const sourceText = getEnglish(attack?.effect)
        // TCGdex has a few incomplete English transcriptions of older card text.
        // Keep the established English rules text for those entries, and use
        // existing attack data when the newer source omits its printed damage.
        const incompleteSourceText = /after the end don't count|is reduce by|can't this attack\b/i.test(sourceText)

        return {
          name: sourceName || legacyAttack?.name || '',
          cost: Array.isArray(attack?.cost) ? attack.cost : legacyAttack?.cost || [],
          convertedEnergyCost: Array.isArray(attack?.cost)
            ? attack.cost.length
            : legacyAttack?.convertedEnergyCost || 0,
          damage: attack?.damage == null ? legacyAttack?.damage || '' : String(attack.damage),
          text: incompleteSourceText ? legacyAttack?.text || sourceText : sourceText || legacyAttack?.text || '',
        }
      })
    : legacyDetail?.attacks || []

  return {
    ...legacyDetail,
    ...card,
    rules: legacyDetail?.rules || [],
    abilities,
    attacks,
    weaknesses: Array.isArray(sourceCard.weaknesses)
      ? sourceCard.weaknesses.map((weakness) => ({
          type: weakness.type,
          value: weakness.value || '',
        }))
      : legacyDetail?.weaknesses || [],
    resistances: Array.isArray(sourceCard.resistances)
      ? sourceCard.resistances.map((resistance) => ({
          type: resistance.type,
          value: resistance.value || '',
        }))
      : legacyDetail?.resistances || [],
    retreatCost,
    convertedRetreatCost: card.convertedRetreatCost,
    flavorText: getEnglish(sourceCard.description) || legacyDetail?.flavorText || null,
    legalities: legacyDetail?.legalities || {},
    regulationMark: sourceCard.regulationMark || legacyDetail?.regulationMark || null,
  }
}

async function buildCompatibleCatalog() {
  const existing = await loadExistingCatalog()
  const tcgdexSets = await loadTcgdexSets(new Set(existing.sets.keys()))
  const migratedSets = new Map()
  const migrationStats = {
    legacySets: existing.sets.size,
    tcgdexSets: tcgdexSets.size,
    migratedCards: 0,
    legacyFallbackCards: 0,
    addedCards: 0,
    unmatchedTcgdexCards: 0,
    unmatchedTcgdexCardIds: [],
  }

  for (const [setId, legacySet] of existing.sets) {
    const source = tcgdexSets.get(setId)
    const sourceCardsByCardId = new Map()
    const additionalCards = []
    if (source) {
      const claimedIds = new Set()
      const existingCardIds = new Set(legacySet.cards.map((card) => card.id))
      const legacyCardsById = new Map(legacySet.cards.map((card) => [card.id, card]))
      const pendingSourceEntries = []
      const orderedSourceCards = [...source.cards].sort((left, right) =>
        String(left.localId).localeCompare(String(right.localId), undefined, { numeric: true }),
      )

      // Reserve all exact collector-number identities before fuzzy name matching;
      // a newer reprint with the same name must not steal an older owned-card ID.
      for (const sourceEntry of orderedSourceCards) {
        const legacyCard = findLegacyCardById(sourceEntry.localId, legacySet, legacyCardsById)
        if (!legacyCard || claimedIds.has(legacyCard.id)) {
          pendingSourceEntries.push(sourceEntry)
          continue
        }
        claimedIds.add(legacyCard.id)
        sourceCardsByCardId.set(legacyCard.id, sourceEntry)
      }

      for (const sourceEntry of pendingSourceEntries) {
        const legacyCard = findLegacyCardByName(
          sourceEntry.card,
          sourceEntry.localId,
          legacySet,
          existing.detailsById,
          claimedIds,
        )
        if (legacyCard) {
          claimedIds.add(legacyCard.id)
          sourceCardsByCardId.set(legacyCard.id, sourceEntry)
          continue
        }

        const localNumber = normalizeLocalId(sourceEntry.localId)
        const newCardId = `${setId}-${localNumber}`
        if (existingCardIds.has(newCardId)) {
          migrationStats.unmatchedTcgdexCards += 1
          migrationStats.unmatchedTcgdexCardIds.push(
            `${newCardId} (${getEnglish(sourceEntry.card.name) || 'unnamed'})`,
          )
          continue
        }

        const newCard = toLegacyCard(sourceEntry.card, source.sourceSet, sourceEntry.localId, {
          id: newCardId,
          name: '',
          number: localNumber,
          artist: null,
          rarity: null,
          supertype: '',
          subtypes: [],
          hp: null,
          types: [],
          evolvesFrom: null,
          evolvesTo: [],
          convertedRetreatCost: null,
          nationalPokedexNumbers: [],
          images: { small: '', large: '' },
        })
        additionalCards.push(newCard)
        sourceCardsByCardId.set(newCardId, sourceEntry)
        existingCardIds.add(newCardId)
        migrationStats.addedCards += 1
      }
    }

    const cards = legacySet.cards.map((legacyCard) => {
      const sourceEntry = sourceCardsByCardId.get(legacyCard.id)
      if (!sourceEntry) {
        migrationStats.legacyFallbackCards += 1
        return legacyCard
      }
      migrationStats.migratedCards += 1
      return toLegacyCard(sourceEntry.card, source.sourceSet, sourceEntry.localId, legacyCard)
    }).concat(additionalCards)

    const details = legacySet.cards.map((legacyCard) => {
      const sourceEntry = sourceCardsByCardId.get(legacyCard.id)
      const legacyDetail = existing.detailsById.get(legacyCard.id)
      if (!sourceEntry) {
        if (legacyDetail) return legacyDetail
        return {
          ...legacyCard,
          rules: [],
          abilities: [],
          attacks: [],
          weaknesses: [],
          resistances: [],
          retreatCost: [],
          flavorText: null,
          legalities: {},
          regulationMark: null,
        }
      }
      return toLegacyCardDetail(
        sourceEntry.card,
        source.sourceSet,
        sourceEntry.localId,
        legacyCard,
        legacyDetail,
      )
    }).concat(
      additionalCards.map((card) => {
        const sourceEntry = sourceCardsByCardId.get(card.id)
        return toLegacyCardDetail(sourceEntry.card, source.sourceSet, sourceEntry.localId, card, null)
      }),
    )

    migratedSets.set(setId, {
      metadata: {
        id: setId,
        name: legacySet.name,
        series: SET_METADATA_OVERRIDES[setId]?.series || legacySet.series,
        total: Math.max(legacySet.total || 0, cards.length),
        printedTotal: legacySet.printedTotal,
        releaseDate: legacySet.releaseDate,
        // Existing set symbols/logos have complete coverage; migrate card art
        // separately because TCGdex's set-symbol endpoint is currently unavailable.
        images: existing.summariesById.get(setId)?.images || legacySet.images || { symbol: '', logo: '' },
      },
      cards,
      details,
    })
  }

  const missingSourceSets = [...existing.sets.keys()].filter((setId) => !tcgdexSets.has(setId))
  if (missingSourceSets.length) {
    console.warn(`TCGdex did not contain ${missingSourceSets.length} current sets; preserving those Pokeori sets unchanged: ${missingSourceSets.join(', ')}`)
  }
  console.log(
    `Compatibility import: ${migrationStats.migratedCards} existing cards refreshed, ${migrationStats.addedCards} new cards added, ${migrationStats.legacyFallbackCards} legacy cards retained, ${migrationStats.unmatchedTcgdexCards} colliding TCGdex records ignored.`,
  )
  if (migrationStats.unmatchedTcgdexCardIds.length) {
    console.warn(`Unmatched TCGdex card sample: ${migrationStats.unmatchedTcgdexCardIds.slice(0, 20).join(', ')}`)
  }

  return migratedSets
}

function writeSetModule(setId, metadata, cards) {
  const setOutputPath = path.join(setsOutputDir, `${setId}.ts`)
  const setData = {
    id: setId,
    name: metadata?.name || setId,
    series: metadata?.series || 'Unknown',
    total: Number(metadata?.total) || cards.length,
    printedTotal: Number(metadata?.printedTotal) || null,
    releaseDate: metadata?.releaseDate || null,
    // Set badges live in the compact summary catalog; keeping them out of the
    // full set modules avoids bundling duplicate runtime artwork metadata.
    images: { symbol: '', logo: '' },
    cards: cards.sort((a, b) => {
      const numberComparison = compareCardNumbers(a.number, b.number)
      if (numberComparison !== 0) return numberComparison
      return a.name.localeCompare(b.name)
    }),
  }

  const fileContents = `import type { TcgSet } from '../types'

const setData: TcgSet = ${JSON.stringify(setData, null, 2)}

export default setData
`

  fs.writeFileSync(setOutputPath, fileContents)
  console.log(`✓ Created ${path.relative(process.cwd(), setOutputPath)}`)
}

function writeSetDetailModule(setId, cards) {
  const setOutputPath = path.join(detailsOutputDir, `${setId}.ts`)
  const detailData = cards.sort((a, b) => {
    const numberComparison = compareCardNumbers(a.number, b.number)
    if (numberComparison !== 0) return numberComparison
    return a.name.localeCompare(b.name)
  })

  const fileContents = `import type { TcgCardDetail } from '../types'

const cardDetails: TcgCardDetail[] = ${JSON.stringify(detailData, null, 2)}

export default cardDetails
`

  fs.writeFileSync(setOutputPath, fileContents)
  console.log(`✓ Created ${path.relative(process.cwd(), setOutputPath)}`)
}

function writeIndexFile(setIds) {
  const indexPath = path.join(tcgRootDir, 'index.ts')
  const imports = setIds
    .map((setId) => {
      const varName = sanitizeIdentifier(setId)
      return `import ${varName} from './sets/${setId}'`
    })
    .join('\n')

  const varNames = setIds.map((setId) => sanitizeIdentifier(setId))
  const content = `${imports}

import type { TcgSet } from './types'

export const tcgSets: TcgSet[] = [
${varNames.map((name) => `  ${name},`).join('\n')}
]

export default tcgSets
`

  fs.writeFileSync(indexPath, content)
  console.log(`✓ Created ${path.relative(process.cwd(), indexPath)}`)
}

function writeSetSummariesFile(setIds, setMetadataMap) {
  const entries = setIds
    .map((setId) => {
      const metadata = setMetadataMap.get(setId)
      return `  ${JSON.stringify({
        id: setId,
        name: metadata?.name || setId,
        series: metadata?.series || 'Unknown',
        total: Number(metadata?.total) || 0,
        printedTotal: Number(metadata?.printedTotal) || null,
        releaseDate: metadata?.releaseDate || null,
        images: {
          symbol: metadata?.images?.symbol || '',
          logo: metadata?.images?.logo || '',
        },
      })},`
    })
    .join('\n')

  const content = `export interface TcgSetSummary {
  id: string
  name: string
  series: string
  total: number
  printedTotal: number | null
  releaseDate: string | null
  images: {
    symbol: string
    logo: string
  }
}

export const tcgSetSummaries: TcgSetSummary[] = [
${entries}
]
`

  fs.writeFileSync(setSummariesOutputPath, content)
  console.log(`✓ Created ${path.relative(process.cwd(), setSummariesOutputPath)}`)
}

function writeSetLoaderFile(setIds) {
  const cases = setIds
    .map(
      (setId) =>
        `    case '${setId}':\n      return (await import('./sets/${setId}')).default`,
    )
    .join('\n')
  const content = `import type { TcgSet } from './types'

export async function getTcgSetByIdLazy(setId: string): Promise<TcgSet | null> {
  switch (setId) {
${cases}
    default:
      return null
  }
}
`

  fs.writeFileSync(setLoaderOutputPath, content)
  console.log(`✓ Created ${path.relative(process.cwd(), setLoaderOutputPath)}`)
}

function writeBoosterPacksFile(setIds) {
  // Define custom pack sizes for specific sets, default is 5.
  // Example: 'base1': 11, 'det1': 10
  const PACK_SIZE_OVERRIDES = {
    // Promo sets
    basep: 1,
    np: 1,
    dpp: 1,
    hsp: 1,
    bwp: 1,
    xyp: 1,
    smp: 1,
    swshp: 1,
    svp: 1,
    // POP Series
    pop1: 1,
    pop2: 1,
    pop3: 1,
    pop4: 1,
    pop5: 1,
    pop6: 1,
    pop7: 1,
    pop8: 1,
    pop9: 1,
    // McDonald's Collections
    mcd11: 1,
    mcd12: 1,
    mcd14: 1,
    mcd15: 1,
    mcd16: 1,
    mcd17: 1,
    mcd18: 1,
    mcd19: 1,
    mcd21: 1,
    mcd22: 1,
    // Trainer Kits
    tk1a: 1,
    tk1b: 1,
    tk2a: 1,
    tk2b: 1,
    // Other special small sets
    det1: 1,
    dv1: 1,
  }

  const content = `import { Item } from '../types'
import { tcgSetSummaries } from '@/data/tcg/summaries'

export const boosterPackItems: Item[] = []

// Map of set IDs to their specific pack sizes
const PACK_SIZE_OVERRIDES: Record<string, number> = ${JSON.stringify(PACK_SIZE_OVERRIDES, null, 2)}

tcgSetSummaries.forEach((set) => {
  const cardsPerPack = PACK_SIZE_OVERRIDES[set.id] || 5

  boosterPackItems.push({
    id: \`pack-\${set.id}\`,
    name: \`\${set.name} Booster Pack\`,
    description: \`A booster pack from the \${set.name} set. Contains \${cardsPerPack} random cards.\`,
    category: 'booster-pack',
    spriteId: \`pack-\${set.id}\`,
    boosterPack: {
      setId: set.id,
      cardsPerPack,
    },
  })
})
`

  const dir = path.dirname(boosterPacksOutputPath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }

  fs.writeFileSync(boosterPacksOutputPath, content)
  console.log(`✓ Created ${path.relative(process.cwd(), boosterPacksOutputPath)}`)
}

function writeDetailsLoaderFile(setIds) {
  const detailsIndexPath = path.join(tcgRootDir, 'details.ts')
  const cases = setIds
    .map((setId) => `    case '${setId}':\n      return (await import('./details/${setId}')).default`)
    .join('\n')

  const content = `import type { TcgCardDetail } from './types'

export async function getTcgSetDetailsById(setId: string): Promise<TcgCardDetail[] | null> {
  switch (setId) {
${cases}
    default:
      return null
  }
}

export async function getTcgCardDetailById(cardId: string): Promise<TcgCardDetail | null> {
  const setId = cardId.split('-')[0]
  if (!setId) return null
  const details = await getTcgSetDetailsById(setId)
  return details?.find((card) => card.id === cardId) ?? null
}
`

  fs.writeFileSync(detailsIndexPath, content)
  console.log(`✓ Created ${path.relative(process.cwd(), detailsIndexPath)}`)
}

try {
  console.log('Loading TCGdex cards and matching them to the current Pokeori catalog...')
  const catalog = await buildCompatibleCatalog()
  const setIds = Array.from(catalog.keys()).sort()

  fs.rmSync(setsOutputDir, { recursive: true, force: true })
  fs.mkdirSync(setsOutputDir, { recursive: true })
  fs.rmSync(detailsOutputDir, { recursive: true, force: true })
  fs.mkdirSync(detailsOutputDir, { recursive: true })

  for (const setId of setIds) {
    const entry = catalog.get(setId)
    writeSetModule(setId, entry.metadata, entry.cards)
    writeSetDetailModule(setId, entry.details)
  }

  writeIndexFile(setIds)
  const setMetadataMap = new Map([...catalog].map(([setId, entry]) => [setId, entry.metadata]))
  writeSetSummariesFile(setIds, setMetadataMap)
  writeSetLoaderFile(setIds)
  writeDetailsLoaderFile(setIds)
  writeBoosterPacksFile(setIds)

  if (fs.existsSync(legacyDataFile)) {
    fs.rmSync(legacyDataFile)
    console.log(`✓ Removed legacy file ${path.relative(process.cwd(), legacyDataFile)}`)
  }

  console.log(`✅ Successfully generated ${setIds.length} TCG set modules.`)
} catch (error) {
  console.error('❌ Failed to generate TCG data: ', error)
  process.exit(1)
}
