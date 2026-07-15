import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const cardsDir = path.join(__dirname, '../source_data/tcg/cards/en')
const setsMetadataPath = path.join(__dirname, '../source_data/tcg/sets/en.json')
const outputDir = path.join(__dirname, '../src/data')
const tcgRootDir = path.join(outputDir, 'tcg')
const setsOutputDir = path.join(tcgRootDir, 'sets')
const detailsOutputDir = path.join(tcgRootDir, 'details')
const legacyDataFile = path.join(outputDir, 'tcg-data.ts')
const boosterPacksOutputPath = path.join(outputDir, 'items/entries/booster-packs.ts')
const setSummariesOutputPath = path.join(tcgRootDir, 'summaries.ts')

if (!fs.existsSync(tcgRootDir)) {
  fs.mkdirSync(tcgRootDir, { recursive: true })
}
if (fs.existsSync(setsOutputDir)) {
  fs.rmSync(setsOutputDir, { recursive: true, force: true })
}
fs.mkdirSync(setsOutputDir, { recursive: true })
if (fs.existsSync(detailsOutputDir)) {
  fs.rmSync(detailsOutputDir, { recursive: true, force: true })
}
fs.mkdirSync(detailsOutputDir, { recursive: true })

function loadSetsMetadata() {
  if (!fs.existsSync(setsMetadataPath)) {
    throw new Error(`Set metadata file not found: ${setsMetadataPath}`)
  }

  const raw = fs.readFileSync(setsMetadataPath, 'utf-8')
  const parsed = JSON.parse(raw)
  const map = new Map()
  parsed.forEach((set) => {
    if (!set || typeof set !== 'object' || !set.id) return
    map.set(set.id, set)
  })
  return map
}

function sanitizeIdentifier(value) {
  const cleaned = value.replace(/[^a-zA-Z0-9_]/g, '_')
  if (/^[0-9]/.test(cleaned)) {
    return `_${cleaned}`
  }
  return cleaned
}

function compareCardNumbers(a, b) {
  const normalize = (value) => {
    if (!value) return { number: Number.MAX_SAFE_INTEGER, suffix: '' }
    const match = value.match(/^(\d+)(.*)$/)
    if (!match) return { number: Number.MAX_SAFE_INTEGER, suffix: value }
    return { number: parseInt(match[1], 10), suffix: match[2] || '' }
  }
  const an = normalize(a)
  const bn = normalize(b)
  if (an.number !== bn.number) {
    return an.number - bn.number
  }
  return an.suffix.localeCompare(bn.suffix)
}

function loadCardFiles() {
  if (!fs.existsSync(cardsDir)) {
    throw new Error(`Cards directory not found: ${cardsDir}`)
  }

  const files = fs.readdirSync(cardsDir).filter((file) => file.endsWith('.json'))

  const cardsBySet = new Map()

  files.forEach((file) => {
    const filePath = path.join(cardsDir, file)
    const rawContent = fs.readFileSync(filePath, 'utf-8')
    let parsed
    try {
      parsed = JSON.parse(rawContent)
    } catch (error) {
      console.error(`Failed to parse ${file}: ${error.message}`)
      return
    }

    if (!Array.isArray(parsed)) {
      return
    }

    const setId = path.basename(file, '.json')

    parsed.forEach((card) => {
      if (!card || typeof card !== 'object') {
        return
      }

      const simplified = {
        id: card.id || '',
        name: card.name || '',
        number: card.number || '',
        artist: card.artist || null,
        rarity: card.rarity || null,
        supertype: card.supertype || '',
        subtypes: Array.isArray(card.subtypes) ? card.subtypes : [],
        hp: card.hp || null,
        types: Array.isArray(card.types) ? card.types : [],
        evolvesFrom: card.evolvesFrom || null,
        evolvesTo: Array.isArray(card.evolvesTo) ? card.evolvesTo : [],
        convertedRetreatCost:
          typeof card.convertedRetreatCost === 'number' ? card.convertedRetreatCost : null,
        nationalPokedexNumbers: Array.isArray(card.nationalPokedexNumbers)
          ? card.nationalPokedexNumbers
          : [],
        images: {
          small: card.images?.small || '',
          large: card.images?.large || '',
        },
      }

      if (!simplified.id || !simplified.name) {
        return
      }

      if (!cardsBySet.has(setId)) {
        cardsBySet.set(setId, [])
      }
      cardsBySet.get(setId).push(simplified)
    })
  })

  return cardsBySet
}

function compactCardDetail(card) {
  return {
    id: card.id || '',
    name: card.name || '',
    number: card.number || '',
    artist: card.artist || null,
    rarity: card.rarity || null,
    supertype: card.supertype || '',
    subtypes: Array.isArray(card.subtypes) ? card.subtypes : [],
    hp: card.hp || null,
    types: Array.isArray(card.types) ? card.types : [],
    evolvesFrom: card.evolvesFrom || null,
    evolvesTo: Array.isArray(card.evolvesTo) ? card.evolvesTo : [],
    rules: Array.isArray(card.rules) ? card.rules : [],
    abilities: Array.isArray(card.abilities)
      ? card.abilities.map((ability) => ({
          name: ability?.name || '',
          text: ability?.text || '',
          type: ability?.type || '',
        }))
      : [],
    attacks: Array.isArray(card.attacks)
      ? card.attacks.map((attack) => ({
          name: attack?.name || '',
          cost: Array.isArray(attack?.cost) ? attack.cost : [],
          convertedEnergyCost:
            typeof attack?.convertedEnergyCost === 'number' ? attack.convertedEnergyCost : null,
          damage: attack?.damage || '',
          text: attack?.text || '',
        }))
      : [],
    weaknesses: Array.isArray(card.weaknesses) ? card.weaknesses : [],
    resistances: Array.isArray(card.resistances) ? card.resistances : [],
    retreatCost: Array.isArray(card.retreatCost) ? card.retreatCost : [],
    convertedRetreatCost:
      typeof card.convertedRetreatCost === 'number' ? card.convertedRetreatCost : null,
    nationalPokedexNumbers: Array.isArray(card.nationalPokedexNumbers)
      ? card.nationalPokedexNumbers
      : [],
    flavorText: card.flavorText || null,
    legalities: card.legalities || {},
    regulationMark: card.regulationMark || null,
    images: {
      small: card.images?.small || '',
      large: card.images?.large || '',
    },
  }
}

function loadCardDetailsForSet(setId) {
  const filePath = path.join(cardsDir, `${setId}.json`)
  const rawContent = fs.readFileSync(filePath, 'utf-8')
  const parsed = JSON.parse(rawContent)
  if (!Array.isArray(parsed)) return []
  return parsed.filter((card) => card && card.id && card.name).map(compactCardDetail)
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
    images: {
      symbol: '',
      logo: '',
    },
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
      return `  { id: ${JSON.stringify(setId)}, name: ${JSON.stringify(metadata?.name || setId)} },`
    })
    .join('\n')

  const content = `export interface TcgSetSummary {
  id: string
  name: string
}

export const tcgSetSummaries: TcgSetSummary[] = [
${entries}
]
`

  fs.writeFileSync(setSummariesOutputPath, content)
  console.log(`✓ Created ${path.relative(process.cwd(), setSummariesOutputPath)}`)
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
  console.log('Loading TCG set metadata...')
  const setMetadataMap = loadSetsMetadata()
  console.log('Loading TCG card data...')
  const cardsBySet = loadCardFiles()
  const setIds = Array.from(cardsBySet.keys()).sort()

  setIds.forEach((setId) => {
    const cards = cardsBySet.get(setId) || []
    const metadata = setMetadataMap.get(setId)
    writeSetModule(setId, metadata, cards)
    writeSetDetailModule(setId, loadCardDetailsForSet(setId))
  })

  writeIndexFile(setIds)
  writeSetSummariesFile(setIds, setMetadataMap)
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
