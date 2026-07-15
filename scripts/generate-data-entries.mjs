import fs from 'fs'
import path from 'path'

// Helper to kebab-case a string
const toKebabCase = (str) =>
  str
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')

// Helper to camelCase a string
const toCamelCase = (str) =>
  str.toLowerCase().replace(/[^a-z0-9]+(.)/g, (m, chr) => chr.toUpperCase())

const DATA_DIR = path.join(process.cwd(), 'src/data')

// 1. Get all categories from sub-region-map.ts
const subRegionMapPath = path.join(DATA_DIR, 'sub-region-map.ts')
const subRegionMapContent = fs.readFileSync(subRegionMapPath, 'utf-8')

const categoryRegex = /'\s*([^']+)\s*'\s*:\s*{/g
let match
const categories = []
while ((match = categoryRegex.exec(subRegionMapContent)) !== null) {
  categories.push(match[1])
}

console.log(`Found ${categories.length} categories.`)

const BASE_TYPES = [
  { dir: 'locations', type: 'Location', import: '../../types', suffix: 'Locations' },
  { dir: 'battles', type: 'BattleConfig', import: '../../types', suffix: 'Battles' },
  { dir: 'tasks', type: 'Task', import: '../../types', suffix: 'Tasks' },
  { dir: 'shops', type: 'ShopConfig', import: '../types', suffix: 'Shops' },
  { dir: 'voyages', type: 'VoyageConfig', import: '../types', suffix: 'Voyages' },
]

const GAMES = [
  { dir: 'silhouette', type: 'SilhouetteConfig', export: 'silhouetteEntries' },
  { dir: 'identify', type: 'IdentifyConfig', export: 'identifyEntries' },
  { dir: 'snap', type: 'SnapConfig', export: 'snapEntries' },
  { dir: 'cry', type: 'CryConfig', export: 'cryEntries' },
  { dir: 'compare', type: 'CompareConfig', export: 'compareEntries' },
  { dir: 'rock-push', type: 'RockPushGameConfig', export: 'basicEntries' },
  { dir: 'run', type: 'RunGameConfig', export: 'basicEntries' },
  { dir: 'flap', type: 'FlapGameConfig', export: 'basicEntries' },
  { dir: 'slots', type: 'SlotGameConfig', export: 'slotGames' },
  { dir: 'pachinko', type: 'PachinkoGameConfig', export: 'PachinkoEntries' },
  { dir: 'prize-wheel', type: 'PrizeWheelGameConfig', export: 'chanseyEntries' },
  { dir: 'fishing', type: 'FishingGameConfig', export: 'Fishing' },
  { dir: 'match3', type: 'Match3GameConfig', export: 'match3gamesEntries' },
  { dir: 'spelling', type: 'SpellingConfig', export: 'spellingEntries' },
  { dir: 'sliding-puzzle', type: 'SlidingPuzzleConfig', export: 'slidingPuzzleGames' },
  { dir: 'rhythm', type: 'RhythmConfig', export: 'rhythmEntries' },
  { dir: 'mining', type: 'MiningConfig', export: 'miningEntries' },
]

// 2. Process each category
let createdCount = 0
for (const cat of categories) {
  const kebab = toKebabCase(cat)
  const camel = toCamelCase(cat)

  // Locations, Battles, Tasks
  for (const base of BASE_TYPES) {
    const filePath = path.join(DATA_DIR, base.dir, 'entries', `${kebab}.ts`)
    if (!fs.existsSync(filePath)) {
      const content = `import { ${base.type} } from '${base.import}'\n\nexport const ${camel}${base.suffix}: ${base.type}[] = []\n`
      fs.mkdirSync(path.dirname(filePath), { recursive: true })
      fs.writeFileSync(filePath, content)
      createdCount++
    }
  }

  // Games
  for (const game of GAMES) {
    const entriesDir = path.join(DATA_DIR, 'games', game.dir, 'entries')
    if (!fs.existsSync(entriesDir)) continue

    const filePath = path.join(entriesDir, `${kebab}.ts`)
    if (!fs.existsSync(filePath)) {
      const content = `import { ${game.type} } from '../types'\n\nexport const ${camel}${game.export}: ${game.type}[] = []\n`
      fs.mkdirSync(path.dirname(filePath), { recursive: true })
      fs.writeFileSync(filePath, content)
      createdCount++
    }
  }
}

console.log(`Successfully generated ${createdCount} blank entry files.`)
