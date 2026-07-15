import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, '../source_data/pokemon')
const outputDir = path.join(__dirname, '../src/data')
const formExclusionsPath = path.join(__dirname, 'pokemon-form-exclusions.json')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

/**
 * Load JSON files from the source data directory
 */
function loadJsonFile(filename) {
  const filePath = path.join(dataDir, filename)
  try {
    const data = fs.readFileSync(filePath, 'utf-8')
    return JSON.parse(data)
  } catch (error) {
    console.error(`Error loading ${filename}:`, error.message)
    return []
  }
}

function loadExcludedFormIds() {
  try {
    const data = fs.readFileSync(formExclusionsPath, 'utf-8')
    const parsed = JSON.parse(data)
    if (!Array.isArray(parsed.excludedFormIds)) {
      throw new Error('expected excludedFormIds to be an array')
    }
    if (parsed.excludedFormIds.some((id) => typeof id !== 'string')) {
      throw new Error('expected every excludedFormIds value to be a string')
    }

    return new Set(parsed.excludedFormIds.map((id) => id.trim()).filter(Boolean))
  } catch (error) {
    console.error(
      `Error loading ${path.relative(process.cwd(), formExclusionsPath)}:`,
      error.message,
    )
    process.exit(1)
  }
}

/**
 * Generate Pokemon data module according to pokemonmap.md specification
 */
function generatePokemonModule() {
  console.log('Loading source data files...')
  const excludedFormIds = loadExcludedFormIds()
  if (excludedFormIds.size > 0) {
    console.log(
      `Excluding ${excludedFormIds.size} configured Pokemon form ID${excludedFormIds.size === 1 ? '' : 's'} from generated data.`,
    )
  }

  // Load all required data files
  const pokemonSpecies = loadJsonFile('pokemon_species.json')
  const pokemon = loadJsonFile('pokemon.json')
  const pokemonStats = loadJsonFile('pokemon_stats.json')
  const pokemonTypes = loadJsonFile('pokemon_types.json')
  const typeNames = loadJsonFile('type_names.json')
  const pokemonSpeciesNames = loadJsonFile('pokemon_species_names.json')
  const pokemonColorNames = loadJsonFile('pokemon_color_names.json')
  const pokemonHabitatNames = loadJsonFile('pokemon_habitat_names.json')
  const pokemonShapeProse = loadJsonFile('pokemon_shape_prose.json')
  const pokemonForms = loadJsonFile('pokemon_forms.json')
  const pokemonFormNames = loadJsonFile('pokemon_form_names.json')

  // Create lookup maps for faster access
  const statsMap = new Map(
    pokemonStats.map((s) => [`${s.pokemon_id}_${s.stat_id}`, parseInt(s.base_stat)]),
  )
  const typeNamesMap = new Map(
    typeNames.map((t) => [`${t.type_id}_${t.local_language_id}`, t.name]),
  )
  const speciesNamesMap = new Map(
    pokemonSpeciesNames.map((s) => [`${s.pokemon_species_id}_${s.local_language_id}`, s.name]),
  )
  const colorNamesMap = new Map(
    pokemonColorNames.map((c) => [`${c.pokemon_color_id}_${c.local_language_id}`, c.name]),
  )
  const habitatNamesMap = new Map(
    pokemonHabitatNames.map((h) => [`${h.pokemon_habitat_id}_${h.local_language_id}`, h.name]),
  )
  const shapeNamesMap = new Map(
    pokemonShapeProse.map((s) => [`${s.pokemon_shape_id}_${s.local_language_id}`, s.name]),
  )
  // Map pokemon_form_names by pokemon_form_id and local_language_id
  const formNamesMap = new Map(
    pokemonFormNames.map((f) => [`${f.pokemon_form_id}_${f.local_language_id}`, f]),
  )
  // Group pokemon_forms by pokemon_id for richer form metadata
  const formsByPokemonId = new Map()
  pokemonForms.forEach((form) => {
    const pokemonId = parseInt(form.pokemon_id)
    if (!formsByPokemonId.has(pokemonId)) {
      formsByPokemonId.set(pokemonId, [])
    }
    formsByPokemonId.get(pokemonId).push(form)
  })
  formsByPokemonId.forEach((forms) =>
    forms.sort((a, b) => parseInt(a.form_order) - parseInt(b.form_order)),
  )

  // Group types by pokemon for easier lookup
  const pokemonTypesGrouped = new Map()
  pokemonTypes.forEach((pt) => {
    const pid = parseInt(pt.pokemon_id)
    if (!pokemonTypesGrouped.has(pid)) {
      pokemonTypesGrouped.set(pid, [])
    }
    pokemonTypesGrouped.get(pid).push(pt)
  })

  const capitalizeFirst = (value) => (value ? value.charAt(0).toUpperCase() + value.slice(1) : '')

  const formatFormIdentifier = (identifier, speciesIdentifier) => {
    if (!identifier) {
      return ''
    }
    let formatted = identifier
    if (speciesIdentifier && formatted.startsWith(`${speciesIdentifier}-`)) {
      formatted = formatted.slice(speciesIdentifier.length + 1)
    }
    return formatted
      .split('-')
      .filter(Boolean)
      .map((part) => capitalizeFirst(part))
      .join(' ')
  }

  const formatPokemonIdentifierName = (identifier) => {
    if (!identifier) {
      return ''
    }
    return identifier
      .split('-')
      .filter(Boolean)
      .map((part) => capitalizeFirst(part))
      .join(' ')
  }

  const normalizeMegaForm = (form) => {
    if (!form || !form.startsWith('Mega ')) {
      return form || 'base'
    }
    const megaSuffix = form.slice(5).trim()
    if (megaSuffix.endsWith(' X') || megaSuffix.endsWith(' Y')) {
      return `Mega ${megaSuffix.slice(-1)}`
    }
    return 'Mega'
  }

  const getSpriteSlug = (speciesId, speciesIdentifier, formData) => {
    if (!formData) {
      return speciesId.toString()
    }
    const rawIdentifier = formData.form_identifier?.trim()
    if (rawIdentifier) {
      return `${speciesId}-${rawIdentifier}`
    }
    const identifier = formData.identifier || ''
    if (identifier.startsWith(`${speciesIdentifier}-`)) {
      return `${speciesId}-${identifier.slice(speciesIdentifier.length + 1)}`
    }
    if (identifier) {
      return `${speciesId}-${identifier}`
    }
    return speciesId.toString()
  }

  const getTypesForPokemon = (pokemonId) => {
    const types = []
    const pokemonTypesList = pokemonTypesGrouped.get(pokemonId) || []
    pokemonTypesList
      .slice()
      .sort((a, b) => parseInt(a.slot) - parseInt(b.slot))
      .forEach((pt) => {
        const typeId = parseInt(pt.type_id)
        const typeName = typeNamesMap.get(`${typeId}_9`) || ''
        if (typeName) {
          types.push(typeName)
        }
      })
    return types
  }

  const getStatsForPokemon = (pokemonId) => ({
    hp: statsMap.get(`${pokemonId}_1`) || 0,
    attack: statsMap.get(`${pokemonId}_2`) || 0,
    defense: statsMap.get(`${pokemonId}_3`) || 0,
    'special-attack': statsMap.get(`${pokemonId}_4`) || 0,
    'special-defense': statsMap.get(`${pokemonId}_5`) || 0,
    speed: statsMap.get(`${pokemonId}_6`) || 0,
  })

  console.log('Generating Pokemon data...')

  // Build the final Pokemon data structure
  const allPokemon = pokemonSpecies.map((species) => {
    const speciesId = parseInt(species.id)
    const speciesData = {
      id: speciesId,
      capture_rate: parseInt(species.capture_rate),
      gender_rate: parseInt(species.gender_rate),
      has_gender_differences: species.has_gender_differences === '1',
      is_baby: species.is_baby === '1',
      is_legendary: species.is_legendary === '1',
      is_mythical: species.is_mythical === '1',
      habitat: habitatNamesMap.get(`${species.habitat_id}_9`) || undefined,
      shape: shapeNamesMap.get(`${species.shape_id}_9`) || undefined,
      color: colorNamesMap.get(`${species.color_id}_9`) || undefined,
      forms: [],
    }

    const speciesIdentifier = species.identifier
    const baseSpeciesNameRaw = speciesNamesMap.get(`${speciesId}_9`) || speciesIdentifier
    const baseSpeciesName = capitalizeFirst(baseSpeciesNameRaw).trim()

    const speciesPokemon = pokemon.filter((p) => parseInt(p.species_id) === speciesId)
    if (speciesPokemon.length === 0) {
      return speciesData
    }

    const speciesPokemonIdentifiers = new Set(speciesPokemon.map((p) => p.identifier))

    speciesPokemon.forEach((poke) => {
      const pokemonId = parseInt(poke.id)
      const formId = pokemonId.toString()
      if (excludedFormIds.has(formId)) {
        return
      }

      const isDefault = poke.is_default === '1'
      const height = parseInt(poke.height)
      const weight = parseInt(poke.weight)
      const baseExperience = parseInt(poke.base_experience)

      const formGroup = formsByPokemonId.get(pokemonId) || []
      const defaultFormData = formGroup.find((form) => form.is_default === '1') || formGroup[0]
      const defaultFormId = defaultFormData ? parseInt(defaultFormData.id) : null
      const defaultFormNames =
        defaultFormId !== null ? formNamesMap.get(`${defaultFormId}_9`) : undefined

      const englishPokemonName = defaultFormNames?.pokemon_name?.trim() || ''
      const englishFormName = defaultFormNames?.form_name?.trim() || ''

      let name = baseSpeciesName
      if (!isDefault) {
        const descriptorWords = ['form', 'forme', 'mode', 'pattern', 'type', 'style']
        const candidateName =
          englishPokemonName || formatPokemonIdentifierName(poke.identifier) || baseSpeciesName
        if (englishPokemonName) {
          const candidateLower = candidateName.toLowerCase()
          const baseLower = baseSpeciesName.toLowerCase()
          const hasDescriptor = descriptorWords.some((word) => candidateLower.includes(word))
          const includesBase = candidateLower.includes(baseLower)
          name = hasDescriptor && includesBase ? baseSpeciesName : candidateName
        } else {
          name = candidateName
        }
      }
      name = (name || baseSpeciesName).trim()

      let form = isDefault
        ? 'base'
        : englishFormName || formatFormIdentifier(poke.identifier, speciesIdentifier)
      form = normalizeMegaForm(form)

      const types = getTypesForPokemon(pokemonId)
      const stats = getStatsForPokemon(pokemonId)

      speciesData.forms.push({
        id: formId,
        height,
        weight,
        base_experience: baseExperience,
        name,
        form,
        types,
        stats,
      })

      const syntheticForms = formGroup.filter(
        (formData) =>
          formData.is_default !== '1' && !speciesPokemonIdentifiers.has(formData.identifier),
      )
      syntheticForms.forEach((formData) => {
        const syntheticId = parseInt(formData.id)
        const syntheticFormId = getSpriteSlug(speciesId, speciesIdentifier, formData)
        if (excludedFormIds.has(syntheticFormId)) {
          return
        }

        const englishNames = formNamesMap.get(`${syntheticId}_9`)
        const syntheticName = baseSpeciesName
        let syntheticFormLabel =
          englishNames?.form_name ||
          formatFormIdentifier(
            formData.form_identifier || formData.identifier,
            speciesIdentifier,
          ) ||
          'base'
        syntheticFormLabel = normalizeMegaForm(syntheticFormLabel)

        speciesData.forms.push({
          id: syntheticFormId,
          height,
          weight,
          base_experience: baseExperience,
          name: syntheticName,
          form: syntheticFormLabel,
          types: [...types],
          stats: { ...stats },
        })
      })
    })

    return speciesData
  })

  return allPokemon
}

/**
 * Generate Mega Evolution data
 */
function generateMegaEvolutions(pokemon) {
  console.log('Generating Mega Evolution data...')
  const excludedFormIds = loadExcludedFormIds()

  const megaEvolutions = []

  pokemon.forEach((poke) => {
    if (poke.identifier && /(^|-)mega($|-)/.test(poke.identifier)) {
      const baseFormId = poke.species_id
      const megaFormId = poke.id
      if (excludedFormIds.has(String(baseFormId)) || excludedFormIds.has(String(megaFormId))) {
        return
      }

      megaEvolutions.push({
        baseFormId,
        megaFormId,
        megaStoneId: '',
        megaStoneName: '',
      })
    }
  })

  // Sort by baseFormId
  megaEvolutions.sort((a, b) => parseInt(a.baseFormId) - parseInt(b.baseFormId))

  return megaEvolutions
}

/**
 * Update powers.ts with new mega evolutions
 */
function updatePowersTs(newMegaEvolutions) {
  console.log('Updating powers.ts with new mega evolutions...')
  const excludedFormIds = loadExcludedFormIds()

  const powersPath = path.join(outputDir, 'powers.ts')
  let powersContent = fs.readFileSync(powersPath, 'utf-8')

  // Extract existing MEGA_EVOLUTIONS array
  const megaRegex = /export const MEGA_EVOLUTIONS: MegaEvolutionEntry\[\] = \[([\s\S]*?)\]/
  const match = powersContent.match(megaRegex)
  if (!match) {
    console.error('Could not find MEGA_EVOLUTIONS array in powers.ts')
    return
  }

  let existingMegas = []
  try {
    // Parse the array content manually
    const arrayContent = match[1].trim()
    if (arrayContent) {
      // Split by '},\n' or '}\n' to get entries
      const entries = arrayContent
        .split(/},\s*\n/)
        .map((e) => e.trim())
        .filter((e) => e)
      existingMegas = entries.map((entry) => {
        // Parse each entry like { baseFormId: '3', megaFormId: '10033', megaStoneId: 'venusaurite', megaStoneName: 'Venusaurite' }
        const obj = {}
        const pairs = entry
          .replace(/[{}]/g, '')
          .split(',')
          .map((p) => p.trim())
        pairs.forEach((pair) => {
          const [key, ...valueParts] = pair.split(':')
          const value = valueParts
            .join(':')
            .trim()
            .replace(/^['"]|['"]$/g, '')
          obj[key.trim()] = value
        })
        return obj
      })
    }
  } catch (error) {
    console.error('Error parsing existing MEGA_EVOLUTIONS:', error)
    return
  }

  // Create a map of existing megas by megaFormId
  const existingMap = new Map(existingMegas.map((m) => [m.megaFormId, m]))

  // Merge: keep existing, add new
  const mergedMegas = [...existingMegas]
  mergedMegas.forEach((mega) => {
    if (mega.baseFormId === 'undefined') {
      const newMega = newMegaEvolutions.find((n) => n.megaFormId === mega.megaFormId)
      if (newMega) {
        mega.baseFormId = newMega.baseFormId
      }
    }
  })
  newMegaEvolutions.forEach((newMega) => {
    if (!existingMap.has(newMega.megaFormId)) {
      mergedMegas.push(newMega)
    }
  })
  const filteredMegas = mergedMegas.filter((mega) => {
    return (
      !excludedFormIds.has(String(mega.baseFormId)) &&
      !excludedFormIds.has(String(mega.megaFormId))
    )
  })

  // Sort by baseFormId
  filteredMegas.sort((a, b) => parseInt(a.baseFormId) - parseInt(b.baseFormId))

  // Generate the new array string
  const newArrayString = filteredMegas
    .map(
      (mega) =>
        `  { baseFormId: '${mega.baseFormId}', megaFormId: '${mega.megaFormId}', megaStoneId: '${mega.megaStoneId}', megaStoneName: '${mega.megaStoneName}' },`,
    )
    .join('\n')

  // Replace in the content
  const newContent = powersContent.replace(
    megaRegex,
    `export const MEGA_EVOLUTIONS: MegaEvolutionEntry[] = [\n${newArrayString}\n]`,
  )

  fs.writeFileSync(powersPath, newContent)
  console.log(
    `✓ Updated ${powersPath} with ${filteredMegas.length} mega evolutions (${newMegaEvolutions.length} new)`,
  )
}

/**
 * Export as TypeScript module
 */
/**
 * Export as TypeScript modules split by generation
 */
function exportPokemonData(pokemonData) {
  console.log('Writing output files...')

  const pokemonDir = path.join(outputDir, 'pokemon')
  if (!fs.existsSync(pokemonDir)) {
    fs.mkdirSync(pokemonDir, { recursive: true })
  }

  // 1. Export types.ts
  const typeDefContent = `export interface PokemonStats {
  hp: number;
  attack: number;
  defense: number;
  'special-attack': number;
  'special-defense': number;
  speed: number;
}

export interface PokemonForm {
  id: string;
  height: number;
  weight: number;
  base_experience: number; // Can be 0 if unknown
  name: string;
  form: string;
  types: string[];
  stats: PokemonStats;
}

export interface PokemonSpecies {
  id: number;
  capture_rate: number;
  gender_rate: number; // -1 = genderless, 0 = all male, 8 = all female, otherwise female eighths
  has_gender_differences: boolean;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  habitat?: string;
  shape?: string;
  color?: string;
  forms: PokemonForm[];
}

export type PokemonData = PokemonSpecies[];
`
  const typesPath = path.join(pokemonDir, 'types.ts')
  fs.writeFileSync(typesPath, typeDefContent)
  console.log(`✓ Created ${typesPath}`)

  // 2. Export generation files
  const genRanges = [
    { id: 'gen1', start: 1, end: 151, name: 'Generation 1 (Kanto)' },
    { id: 'gen2', start: 152, end: 251, name: 'Generation 2 (Johto)' },
    { id: 'gen3', start: 252, end: 386, name: 'Generation 3 (Hoenn)' },
    { id: 'gen4', start: 387, end: 493, name: 'Generation 4 (Sinnoh)' },
    { id: 'gen5', start: 494, end: 649, name: 'Generation 5 (Unova)' },
    { id: 'gen6', start: 650, end: 721, name: 'Generation 6 (Kalos)' },
    { id: 'gen7', start: 722, end: 809, name: 'Generation 7 (Alola)' },
    { id: 'gen8', start: 810, end: 905, name: 'Generation 8 (Galar)' },
    { id: 'gen9', start: 906, end: 1025, name: 'Generation 9 (Paldea)' },
  ]

  const createdFiles = []

  genRanges.forEach((gen) => {
    const genData = pokemonData.filter((p) => p.id >= gen.start && p.id <= gen.end)

    // Ensure base_experience is never null (fix for build error)
    genData.forEach((species) => {
      species.forms.forEach((form) => {
        if (form.base_experience === null || isNaN(form.base_experience)) {
          form.base_experience = 0
        }
      })
    })

    const fileContent = `/**
 * ${gen.name}
 * Pokemon #${gen.start}-${gen.end}
 */

import type { PokemonData } from './types';

const ${gen.id}Data: PokemonData = ${JSON.stringify(genData, null, 2)};

export default ${gen.id}Data;
`
    const filePath = path.join(pokemonDir, `${gen.id}.ts`)
    fs.writeFileSync(filePath, fileContent)
    createdFiles.push(gen.id)
    console.log(`✓ Created ${filePath} (${genData.length} species)`)
  })

  // 3. Export index.ts
  const indexContent = `/**
 * Central export for all Pokemon data across all generations.
 * Combines data from gen1-gen9 modules.
 */

import type { PokemonData } from './types';
${createdFiles.map((id) => `import ${id}Data from './${id}';`).join('\n')}

// Export individual generations
export { ${createdFiles.map((id) => `${id}Data`).join(', ')} };

// Export types
export * from './types';

// Combined data across all generations
export const allPokemon: PokemonData = [
  ${createdFiles.map((id) => `...${id}Data,`).join('\n  ')}
];

// Default export for backward compatibility
export default allPokemon;
`
  const indexPath = path.join(pokemonDir, 'index.ts')
  fs.writeFileSync(indexPath, indexContent)
  console.log(`✓ Created ${indexPath}`)

  // 4. Update root wrapper for backward compatibility
  const wrapperPath = path.join(outputDir, 'pokemon-data.ts')
  const wrapperContent = `/**
 * DEPRECATED: This file is maintained for backward compatibility.
 * New code should import from '@/data/pokemon' instead.
 * 
 * Pokemon data has been refactored into generation-based modules for better
 * maintainability and performance. See src/data/pokemon/ directory.
 */

// Re-export types
export * from './pokemon/types';

// Re-export default for backward compatibility
import { allPokemon } from './pokemon';
export default allPokemon;
`
  fs.writeFileSync(wrapperPath, wrapperContent)
  console.log(`✓ Updated ${wrapperPath} wrapper`)

  console.log(`\n✅ Successfully generated modular Pokemon data for ${pokemonData.length} species!`)
}

// Main execution
try {
  const pokemonData = generatePokemonModule()
  exportPokemonData(pokemonData)

  // Load pokemon data for mega evolutions
  const pokemon = loadJsonFile('pokemon.json')
  const megaEvolutions = generateMegaEvolutions(pokemon)
  updatePowersTs(megaEvolutions)
} catch (error) {
  console.error('❌ Error generating Pokemon module:', error)
  process.exit(1)
}
