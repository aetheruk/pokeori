import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const SOURCE_DIR = path.join(__dirname, '../source_data/pokemon')
const OUTPUT_FILE = path.join(__dirname, '../src/data/evolutions.ts')
const OUTPUT_DIR = path.join(__dirname, '../src/data/evolutions')
const MISSING_ITEMS_FILE = path.join(__dirname, '../src/data/missing-evo-items.json')
const ITEMS_DIR = path.join(__dirname, '../src/data/items/entries')

const GEN_RANGES = [
  { id: 'gen1', start: 1, end: 151 },
  { id: 'gen2', start: 152, end: 251 },
  { id: 'gen3', start: 252, end: 386 },
  { id: 'gen4', start: 387, end: 493 },
  { id: 'gen5', start: 494, end: 649 },
  { id: 'gen6', start: 650, end: 721 },
  { id: 'gen7', start: 722, end: 809 },
  { id: 'gen8', start: 810, end: 905 },
  { id: 'gen9', start: 906, end: 1025 },
]

// Helper to read JSON
const readJson = (filename) => {
  const content = fs.readFileSync(path.join(SOURCE_DIR, filename), 'utf-8')
  return JSON.parse(content)
}

const getGenerationId = (speciesId) =>
  GEN_RANGES.find((gen) => gen.start <= speciesId && speciesId <= gen.end)?.id || 'gen9'

const writeEvolutionModules = (evolutionMap) => {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true })

  const byGeneration = new Map(GEN_RANGES.map((gen) => [gen.id, {}]))

  for (const [sourceSpeciesId, evolutions] of evolutionMap.entries()) {
    const genId = getGenerationId(Number(sourceSpeciesId))
    byGeneration.get(genId)[sourceSpeciesId] = evolutions
  }

  const typesContent = `export interface EvolutionCondition {
  minLevel?: number
  itemId?: string
  minHappiness?: number
  timeOfDay?: string
  gender?: number
  locationId?: string
  knownMoveId?: string
  heldItem?: string
  trade?: boolean
  requiredSourceForm?: string
}

export interface Evolution {
  speciesId: number
  name: string
  targetForm?: string
  trigger: 'level-up' | 'use-item'
  conditions: EvolutionCondition
}
`

  fs.writeFileSync(path.join(OUTPUT_DIR, 'types.ts'), typesContent)

  for (const gen of GEN_RANGES) {
    const data = byGeneration.get(gen.id) || {}
    const exportName = `${gen.id}Evolutions`
    const content = `/**
 * ${gen.id.toUpperCase()} Evolutions
 */
import { Evolution } from './types'

export const ${exportName}: Record<number, Evolution[]> = ${JSON.stringify(data, null, 2)}
`
    fs.writeFileSync(path.join(OUTPUT_DIR, `${gen.id}.ts`), content)
  }

  const imports = GEN_RANGES.map(
    (gen) => `import { ${gen.id}Evolutions } from './${gen.id}'`,
  ).join('\n')
  const exports = GEN_RANGES.map((gen) => `${gen.id}Evolutions`).join(',\n  ')
  const spreads = GEN_RANGES.map((gen) => `  ...${gen.id}Evolutions,`).join('\n')

  const indexContent = `/**
 * Central export for all Pokemon evolutions across all generations.
 */

import { Evolution } from './types'
${imports}

export * from './types'
export {
  ${exports},
}

export const EVOLUTIONS: Record<number, Evolution[]> = {
${spreads}
}
`

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.ts'), indexContent)

  const wrapperContent = `/**
 * DEPRECATED: This file is maintained for backward compatibility.
 * New code should import from '@/data/evolutions' instead.
 *
 * Evolutions data has been refactored into generation-based modules.
 * See src/data/evolutions/ directory.
 */

// Re-export everything from the index
export * from './evolutions/index'
`

  fs.writeFileSync(OUTPUT_FILE, wrapperContent)
}

/*
  Data Structures:
  pokemon_species.json:
    id, identifier, evolves_from_species_id, ...
  pokemon_evolution.json:
    id, evolved_species_id, evolution_trigger_id, trigger_item_id, minimum_level, ...
  items.json:
    id, identifier, ...
  evolution_triggers.json:
    id, identifier (1=level-up, 2=trade, 3=use-item, etc)
*/

async function generate() {
  console.log('Reading source data...')

  const species = readJson('pokemon_species.json')
  const evolutions = readJson('pokemon_evolution.json')
  const items = readJson('items.json')
  const triggers = readJson('evolution_triggers.json')

  // Map Item ID -> Identifier
  const itemMap = new Map()
  items.forEach((i) => itemMap.set(i.id, i.identifier))

  // Map Trigger ID -> Identifier
  const triggerMap = new Map()
  triggers.forEach((t) => triggerMap.set(t.id, t.identifier))

  // Map Species ID -> Name (for readable output)
  const speciesNameMap = new Map()
  species.forEach((s) => speciesNameMap.set(s.id, s.identifier))

  // Read all item files from the entries directory
  const itemFiles = fs.readdirSync(ITEMS_DIR).filter((file) => file.endsWith('.ts'))
  let existingItemsContent = ''
  itemFiles.forEach((file) => {
    existingItemsContent += fs.readFileSync(path.join(ITEMS_DIR, file), 'utf-8')
  })

  const missingItems = new Set()

  // Build Lookup: ParentID -> [Evolutions]
  const evolutionMap = new Map() // ParentID -> Array

  console.log('Processing evolutions...')

  // Manual Overrides for Regional Forms
  // Uses PokeAPI standard form names: "base", "Alolan Form", "Galarian Form"
  const REGIONAL_OVERRIDES = {
    // Rattata (19)
    19: [
      {
        speciesId: 20,
        name: 'raticate',
        trigger: 'level-up',
        conditions: { minLevel: 20, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 20,
        name: 'raticate',
        trigger: 'level-up',
        conditions: { minLevel: 20, timeOfDay: 'night', requiredSourceForm: 'Alolan Form' },
        targetForm: 'Alolan Form',
      },
    ],
    // Sandshrew (27)
    27: [
      {
        speciesId: 28,
        name: 'sandslash',
        trigger: 'level-up',
        conditions: { minLevel: 22, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 28,
        name: 'sandslash',
        trigger: 'use-item',
        conditions: { itemId: 'ice-stone', requiredSourceForm: 'Alolan Form' },
        targetForm: 'Alolan Form',
      },
    ],
    // Vulpix (37)
    37: [
      {
        speciesId: 38,
        name: 'ninetales',
        trigger: 'use-item',
        conditions: { itemId: 'fire-stone', requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 38,
        name: 'ninetales',
        trigger: 'use-item',
        conditions: { itemId: 'ice-stone', requiredSourceForm: 'Alolan Form' },
        targetForm: 'Alolan Form',
      },
    ],
    // Diglett (50)
    50: [
      {
        speciesId: 51,
        name: 'dugtrio',
        trigger: 'level-up',
        conditions: { minLevel: 26, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 51,
        name: 'dugtrio',
        trigger: 'level-up',
        conditions: { minLevel: 26, requiredSourceForm: 'Alolan Form' },
        targetForm: 'Alolan Form',
      },
    ],
    // Meowth (52) -> Persian (53)
    52: [
      {
        speciesId: 53,
        name: 'persian',
        trigger: 'level-up',
        conditions: { minLevel: 28, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 53,
        name: 'persian',
        trigger: 'level-up',
        conditions: { minHappiness: 160, requiredSourceForm: 'Alolan Form' },
        targetForm: 'Alolan Form',
      },
      {
        speciesId: 863,
        name: 'perrserker',
        trigger: 'level-up',
        conditions: { minLevel: 28, requiredSourceForm: 'Galarian Form' },
        targetForm: 'base',
      },
    ],
    // Geodude (74)
    74: [
      {
        speciesId: 75,
        name: 'graveler',
        trigger: 'level-up',
        conditions: { minLevel: 25, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 75,
        name: 'graveler',
        trigger: 'level-up',
        conditions: { minLevel: 25, requiredSourceForm: 'Alolan Form' },
        targetForm: 'Alolan Form',
      },
    ],
    // Graveler (75)
    75: [
      {
        speciesId: 76,
        name: 'golem',
        trigger: 'use-item',
        conditions: { itemId: 'link-cable', trade: true, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 76,
        name: 'golem',
        trigger: 'use-item',
        conditions: { itemId: 'link-cable', trade: true, requiredSourceForm: 'Alolan Form' },
        targetForm: 'Alolan Form',
      },
    ],
    // Grimer (88)
    88: [
      {
        speciesId: 89,
        name: 'muk',
        trigger: 'level-up',
        conditions: { minLevel: 38, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 89,
        name: 'muk',
        trigger: 'level-up',
        conditions: { minLevel: 38, requiredSourceForm: 'Alolan Form' },
        targetForm: 'Alolan Form',
      },
    ],
    // Growlithe (58)
    58: [
      {
        speciesId: 59,
        name: 'arcanine',
        trigger: 'use-item',
        conditions: { itemId: 'fire-stone', requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 59,
        name: 'arcanine',
        trigger: 'use-item',
        conditions: { itemId: 'fire-stone', requiredSourceForm: 'Hisuian Form' },
        targetForm: 'Hisuian Form',
      },
    ],
    // Ponyta (77)
    77: [
      {
        speciesId: 78,
        name: 'rapidash',
        trigger: 'level-up',
        conditions: { minLevel: 40, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 78,
        name: 'rapidash',
        trigger: 'level-up',
        conditions: { minLevel: 40, requiredSourceForm: 'Galarian Form' },
        targetForm: 'Galarian Form',
      },
    ],
    // Slowpoke (79)
    79: [
      {
        speciesId: 80,
        name: 'slowbro',
        trigger: 'level-up',
        conditions: { minLevel: 37, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 80,
        name: 'slowbro',
        trigger: 'use-item',
        conditions: { itemId: 'galarica-cuff', requiredSourceForm: 'Galarian Form' },
        targetForm: 'Galarian Form',
      },
      {
        speciesId: 199,
        name: 'slowking',
        trigger: 'use-item',
        conditions: { itemId: 'kings-rock', trade: true, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 199,
        name: 'slowking',
        trigger: 'use-item',
        conditions: { itemId: 'galarica-wreath', requiredSourceForm: 'Galarian Form' },
        targetForm: 'Galarian Form',
      },
    ],
    // Voltorb (100)
    100: [
      {
        speciesId: 101,
        name: 'electrode',
        trigger: 'level-up',
        conditions: { minLevel: 30, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 101,
        name: 'electrode',
        trigger: 'use-item',
        conditions: { itemId: 'leaf-stone', requiredSourceForm: 'Hisuian Form' },
        targetForm: 'Hisuian Form',
      },
    ],
    // Mr. Mime (122)
    122: [
      {
        speciesId: 866,
        name: 'mr-rime',
        trigger: 'level-up',
        conditions: { minLevel: 42, requiredSourceForm: 'Galarian Form' },
      },
    ],
    // Wooper (194)
    194: [
      {
        speciesId: 195,
        name: 'quagsire',
        trigger: 'level-up',
        conditions: { minLevel: 20, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 980,
        name: 'clodsire',
        trigger: 'level-up',
        conditions: { minLevel: 20, requiredSourceForm: 'Paldean Form' },
      },
    ],
    // Qwilfish (211)
    211: [
      {
        speciesId: 904,
        name: 'overqwil',
        trigger: 'level-up',
        conditions: { knownMoveId: '839', requiredSourceForm: 'Hisuian Form' },
      },
    ],
    // Sneasel (215)
    215: [
      {
        speciesId: 461,
        name: 'weavile',
        trigger: 'level-up',
        conditions: { timeOfDay: 'night', heldItem: 'razor-claw', requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 903,
        name: 'sneasler',
        trigger: 'level-up',
        conditions: { timeOfDay: 'day', heldItem: 'razor-claw', requiredSourceForm: 'Hisuian Form' },
      },
    ],
    // Corsola (222)
    222: [
      {
        speciesId: 864,
        name: 'cursola',
        trigger: 'level-up',
        conditions: { minLevel: 38, requiredSourceForm: 'Galarian Form' },
      },
    ],
    // Zigzagoon (263)
    263: [
      {
        speciesId: 264,
        name: 'linoone',
        trigger: 'level-up',
        conditions: { minLevel: 20, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 264,
        name: 'linoone',
        trigger: 'level-up',
        conditions: { minLevel: 20, requiredSourceForm: 'Galarian Form' },
        targetForm: 'Galarian Form',
      },
    ],
    // Linoone (264)
    264: [
      {
        speciesId: 862,
        name: 'obstagoon',
        trigger: 'level-up',
        conditions: { minLevel: 35, timeOfDay: 'night', requiredSourceForm: 'Galarian Form' },
      },
    ],
    // Darumaka (554)
    554: [
      {
        speciesId: 555,
        name: 'darmanitan',
        trigger: 'level-up',
        conditions: { minLevel: 35, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 555,
        name: 'darmanitan',
        trigger: 'use-item',
        conditions: { itemId: 'ice-stone', requiredSourceForm: 'Galarian Form' },
        targetForm: 'Galarian Form',
      },
    ],
    // Yamask (562)
    562: [
      {
        speciesId: 563,
        name: 'cofagrigus',
        trigger: 'level-up',
        conditions: { minLevel: 34, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
    ],
    // Zorua (570)
    570: [
      {
        speciesId: 571,
        name: 'zoroark',
        trigger: 'level-up',
        conditions: { minLevel: 30, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 571,
        name: 'zoroark',
        trigger: 'level-up',
        conditions: { minLevel: 30, requiredSourceForm: 'Hisuian Form' },
        targetForm: 'Hisuian Form',
      },
    ],
    // Sliggoo (705)
    705: [
      {
        speciesId: 706,
        name: 'goodra',
        trigger: 'level-up',
        conditions: { minLevel: 50, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 706,
        name: 'goodra',
        trigger: 'level-up',
        conditions: { minLevel: 50, requiredSourceForm: 'Hisuian Form' },
        targetForm: 'Hisuian Form',
      },
    ],
    // Flabébé (669)
    669: [
      {
        speciesId: 670,
        name: 'floette',
        trigger: 'level-up',
        conditions: { minLevel: 19, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 670,
        name: 'floette',
        trigger: 'level-up',
        conditions: { minLevel: 19, requiredSourceForm: 'Yellow Flower' },
        targetForm: 'Yellow Flower',
      },
      {
        speciesId: 670,
        name: 'floette',
        trigger: 'level-up',
        conditions: { minLevel: 19, requiredSourceForm: 'Orange Flower' },
        targetForm: 'Orange Flower',
      },
      {
        speciesId: 670,
        name: 'floette',
        trigger: 'level-up',
        conditions: { minLevel: 19, requiredSourceForm: 'Blue Flower' },
        targetForm: 'Blue Flower',
      },
      {
        speciesId: 670,
        name: 'floette',
        trigger: 'level-up',
        conditions: { minLevel: 19, requiredSourceForm: 'White Flower' },
        targetForm: 'White Flower',
      },
    ],
    // Floette (670)
    670: [
      {
        speciesId: 671,
        name: 'florges',
        trigger: 'use-item',
        conditions: { itemId: 'shiny-stone', requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 671,
        name: 'florges',
        trigger: 'use-item',
        conditions: { itemId: 'shiny-stone', requiredSourceForm: 'Yellow Flower' },
        targetForm: 'Yellow Flower',
      },
      {
        speciesId: 671,
        name: 'florges',
        trigger: 'use-item',
        conditions: { itemId: 'shiny-stone', requiredSourceForm: 'Orange Flower' },
        targetForm: 'Orange Flower',
      },
      {
        speciesId: 671,
        name: 'florges',
        trigger: 'use-item',
        conditions: { itemId: 'shiny-stone', requiredSourceForm: 'Blue Flower' },
        targetForm: 'Blue Flower',
      },
      {
        speciesId: 671,
        name: 'florges',
        trigger: 'use-item',
        conditions: { itemId: 'shiny-stone', requiredSourceForm: 'White Flower' },
        targetForm: 'White Flower',
      },
    ],
    // Kirlia (281)
    281: [
      {
        speciesId: 282,
        name: 'gardevoir',
        trigger: 'level-up',
        conditions: { minLevel: 30 },
      },
      {
        speciesId: 475,
        name: 'gallade',
        trigger: 'use-item',
        conditions: { itemId: 'dawn-stone', gender: 2 },
      },
    ],
    // Snorunt (361)
    361: [
      {
        speciesId: 362,
        name: 'glalie',
        trigger: 'level-up',
        conditions: { minLevel: 42 },
      },
      {
        speciesId: 478,
        name: 'froslass',
        trigger: 'use-item',
        conditions: { itemId: 'dawn-stone', gender: 1 },
      },
    ],
    // Burmy (412)
    412: [
      {
        speciesId: 413,
        name: 'wormadam',
        trigger: 'level-up',
        conditions: { minLevel: 20, gender: 1, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 413,
        name: 'wormadam',
        trigger: 'level-up',
        conditions: { minLevel: 20, gender: 1, requiredSourceForm: 'Sandy Cloak' },
        targetForm: 'Sandy Cloak',
      },
      {
        speciesId: 413,
        name: 'wormadam',
        trigger: 'level-up',
        conditions: { minLevel: 20, gender: 1, requiredSourceForm: 'Trash Cloak' },
        targetForm: 'Trash Cloak',
      },
      {
        speciesId: 414,
        name: 'mothim',
        trigger: 'level-up',
        conditions: { minLevel: 20, gender: 2 },
      },
    ],
    // Shellos (422)
    422: [
      {
        speciesId: 423,
        name: 'gastrodon',
        trigger: 'level-up',
        conditions: { minLevel: 30, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 423,
        name: 'gastrodon',
        trigger: 'level-up',
        conditions: { minLevel: 30, requiredSourceForm: 'East Sea' },
        targetForm: 'East Sea',
      },
    ],
    // Deerling (585)
    585: [
      {
        speciesId: 586,
        name: 'sawsbuck',
        trigger: 'level-up',
        conditions: { minLevel: 34, requiredSourceForm: 'base' },
        targetForm: 'base',
      },
      {
        speciesId: 586,
        name: 'sawsbuck',
        trigger: 'level-up',
        conditions: { minLevel: 34, requiredSourceForm: 'Summer Form' },
        targetForm: 'Summer Form',
      },
      {
        speciesId: 586,
        name: 'sawsbuck',
        trigger: 'level-up',
        conditions: { minLevel: 34, requiredSourceForm: 'Autumn Form' },
        targetForm: 'Autumn Form',
      },
      {
        speciesId: 586,
        name: 'sawsbuck',
        trigger: 'level-up',
        conditions: { minLevel: 34, requiredSourceForm: 'Winter Form' },
        targetForm: 'Winter Form',
      },
    ],
  }

  // Iterate species to find links
  for (const s of species) {
    if (!s.evolves_from_species_id) continue

    const parentId = s.evolves_from_species_id
    const childId = s.id
    const childName = s.identifier

    // manual override check
    if (REGIONAL_OVERRIDES[parentId]) {
      if (!evolutionMap.has(parentId)) {
        // Only add if not already added (assuming overrides are comprehensive for that ID)
        evolutionMap.set(parentId, REGIONAL_OVERRIDES[parentId])
      }
      continue
    }

    // Find evolution conditions in 'pokemon_evolution' for this child
    // Note: pokemon_evolution links by 'evolved_species_id'
    const evolutionEntries = evolutions.filter((e) => e.evolved_species_id === childId)

    for (const evo of evolutionEntries) {
      const triggerId = evo.evolution_trigger_id
      const triggerName = triggerMap.get(triggerId)

      let finalTrigger = 'other'
      const conditions = {}

      // 1. Level Up
      if (triggerName === 'level-up') {
        finalTrigger = 'level-up'
        if (evo.minimum_level) conditions.minLevel = parseInt(evo.minimum_level)
        if (evo.minimum_happiness) conditions.minHappiness = parseInt(evo.minimum_happiness)
        if (evo.time_of_day) conditions.timeOfDay = evo.time_of_day
        if (evo.gender_id) conditions.gender = parseInt(evo.gender_id) // 1=female, 2=male typically
        if (evo.location_id) conditions.locationId = evo.location_id // e.g. magnetic field
        if (evo.known_move_id) conditions.knownMoveId = evo.known_move_id
        if (evo.held_item_id) {
          const itemName = itemMap.get(evo.held_item_id)
          if (itemName) {
            conditions.heldItem = itemName
            // Check existence
            if (
              !existingItemsContent.includes(`'${itemName}'`) &&
              !existingItemsContent.includes(`"${itemName}"`)
            ) {
              missingItems.add(itemName)
            }
          }
        }
      }

      // 2. Use Item
      else if (triggerName === 'use-item') {
        finalTrigger = 'use-item'
        if (evo.trigger_item_id) {
          const itemName = itemMap.get(evo.trigger_item_id)
          if (itemName) {
            conditions.itemId = itemName
            // Check existence
            if (
              !existingItemsContent.includes(`'${itemName}'`) &&
              !existingItemsContent.includes(`"${itemName}"`)
            ) {
              missingItems.add(itemName)
            }
          }
        }
      }

      // 3. Trade
      else if (triggerName === 'trade') {
        finalTrigger = 'use-item' // normalize
        conditions.itemId = 'link-cable'
        conditions.trade = true

        if (evo.held_item_id) {
          const heldItemName = itemMap.get(evo.held_item_id)
          if (heldItemName) {
            conditions.itemId = heldItemName // Overwrite link-cable
            if (
              !existingItemsContent.includes(`'${heldItemName}'`) &&
              !existingItemsContent.includes(`"${heldItemName}"`)
            ) {
              missingItems.add(heldItemName)
            }
          }
        }
      }

      // 4. Other (Shedinja, Spin, etc)
      else {
        finalTrigger = 'other'
      }

      // Only add supported triggers
      if (['level-up', 'use-item'].includes(finalTrigger)) {
        if (!evolutionMap.has(parentId)) {
          evolutionMap.set(parentId, [])
        }
        evolutionMap.get(parentId).push({
          speciesId: parseInt(childId),
          name: childName,
          trigger: finalTrigger,
          conditions,
        })
      }
    }
  }

  // Generate missing items JSON
  if (missingItems.size > 0) {
    console.log(`Found ${missingItems.size} missing items.`)

    // We need details for these items (name, description, sprite ref?)
    // We can grab them from items.json/item_prose.json if we want to be fancy,
    // or just list IDs for manual addition.
    // Let's try to get English names.
    const itemProse = readJson('item_prose.json') // language_id 9 = English

    const missingList = []
    for (const missingId of missingItems) {
      // find numeric id
      let numericId = null
      for (const [key, val] of itemMap.entries()) {
        if (val === missingId) {
          numericId = key
          break
        }
      }

      const prose = itemProse.find((p) => p.item_id === numericId && p.local_language_id === '9')
      missingList.push({
        id: missingId,
        name: prose ? prose.name : missingId,
        description: prose ? prose.effect : 'Evolution Item',
      })
    }

    fs.writeFileSync(MISSING_ITEMS_FILE, JSON.stringify(missingList, null, 2))
    console.log(`Wrote missing items to ${MISSING_ITEMS_FILE}`)
  } else if (fs.existsSync(MISSING_ITEMS_FILE)) {
    fs.unlinkSync(MISSING_ITEMS_FILE)
    console.log(`Removed stale missing items file ${MISSING_ITEMS_FILE}`)
  }

  // Generate Evolutions TS
  console.log('Generating Typescript file...')
  writeEvolutionModules(evolutionMap)
  console.log(`Wrote evolutions to ${OUTPUT_DIR} and wrapper ${OUTPUT_FILE}`)
}

generate().catch(console.error)
