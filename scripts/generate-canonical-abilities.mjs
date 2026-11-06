#!/usr/bin/env bun
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { allPokemon } from '../src/data/pokemon/index.ts'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')
const sourceDir = path.join(root, 'source_data/pokemon')
const outputPath = path.join(root, 'src/data/abilities/canonical-generated.ts')

function loadJson(filename) {
  return JSON.parse(fs.readFileSync(path.join(sourceDir, filename), 'utf8'))
}

function abilityId(identifier) {
  return identifier.replace(/-/g, '_')
}

function formatSlug(slug) {
  return slug
    .split('-')
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ')
}

function cleanDescription(text) {
  return String(text || '')
    .replace(/\[\]\{[^:}]+:([^}]+)\}/g, (_, slug) => formatSlug(slug))
    .replace(/\[([^\]]+)\]\{[^}]+\}/g, '$1')
    .replace(/\s+/g, ' ')
    .trim()
}

function quote(value) {
  return JSON.stringify(value)
}

function writeArray(values, indent) {
  if (values.length === 0) return '[]'
  return `[\n${values.map((value) => `${indent}${quote(value)},`).join('\n')}\n${indent.slice(2)}]`
}

const abilities = loadJson('abilities.json').filter((ability) => ability.is_main_series === '1')
const abilityNames = loadJson('ability_names.json')
const abilityProse = loadJson('ability_prose.json')
const pokemonAbilities = loadJson('pokemon_abilities.json')
const sourcePokemon = loadJson('pokemon.json')

const namesByAbilityId = new Map(
  abilityNames
    .filter((entry) => entry.local_language_id === '9')
    .map((entry) => [entry.ability_id, entry.name]),
)
const proseByAbilityId = new Map(
  abilityProse
    .filter((entry) => entry.local_language_id === '9')
    .map((entry) => [entry.ability_id, cleanDescription(entry.short_effect || entry.effect)]),
)
const pokemonAbilitiesByPokemonId = new Map()
for (const row of pokemonAbilities) {
  const rows = pokemonAbilitiesByPokemonId.get(row.pokemon_id) || []
  rows.push(row)
  pokemonAbilitiesByPokemonId.set(row.pokemon_id, rows)
}
for (const rows of pokemonAbilitiesByPokemonId.values()) {
  rows.sort((a, b) => Number(a.slot) - Number(b.slot))
}

const defaultPokemonIdBySpecies = new Map()
const sourcePokemonById = new Map(
  sourcePokemon.map((pokemon) => [String(pokemon.id), pokemon]),
)
for (const pokemon of sourcePokemon) {
  if (pokemon.is_default === '1') {
    defaultPokemonIdBySpecies.set(String(pokemon.species_id), String(pokemon.id))
  }
}

// PokeAPI represents a small number of female forms as separate Pokemon rows.
// Keep them attached to the default species form, but preserve gender-specific
// ability assignments for the runtime resolver.
const femalePokemonByDefaultId = new Map()
for (const pokemon of sourcePokemon) {
  if (pokemon.is_default === '1' || !pokemon.identifier.endsWith('-female')) continue
  const defaultPokemonId = defaultPokemonIdBySpecies.get(String(pokemon.species_id))
  const defaultPokemon = defaultPokemonId
    ? sourcePokemonById.get(defaultPokemonId)
    : undefined
  const defaultIdentifier = defaultPokemon?.identifier?.replace(/-male$/, '')
  if (defaultIdentifier && pokemon.identifier === `${defaultIdentifier}-female`) {
    femalePokemonByDefaultId.set(defaultPokemonId, pokemon)
  }
}

const abilityByNumericId = new Map(abilities.map((ability) => [ability.id, ability]))
const entriesByAbilityId = new Map()
const formIdsByAbilityId = new Map()

function addNaturalAssignment(row, formId, chance, gender) {
  const ability = abilityByNumericId.get(row.ability_id)
  if (!ability) return
  const id = abilityId(ability.identifier)
  const hidden = row.is_hidden === '1'
  const slot = Number(row.slot)
  const key = `${id}|${chance}|${hidden ? 'hidden' : 'normal'}|${slot}|${gender || 'any'}`
  const entry = entriesByAbilityId.get(key) || {
    abilityId: id,
    chance,
    hidden,
    slot,
    gender,
    forms: [],
  }
  entry.forms.push(formId)
  entriesByAbilityId.set(key, entry)

  const formIds = formIdsByAbilityId.get(id) || new Set()
  formIds.add(formId)
  formIdsByAbilityId.set(id, formIds)
}

function buildNaturalAssignments(rows) {
  const hiddenRows = rows.filter((row) => row.is_hidden === '1')
  const normalRows = rows.filter((row) => row.is_hidden !== '1')
  return [
    ...hiddenRows.map((row) => ({ row, chance: 5 })),
    ...normalRows.map((row, index) => {
      const remainingSlots = normalRows.length - index
      const chance = remainingSlots <= 1 ? 100 : Number((100 / remainingSlots).toFixed(4))
      return { row, chance }
    }),
  ]
}

function getNaturalAssignmentKey(assignment) {
  return [
    assignment.row.ability_id,
    assignment.chance,
    assignment.row.is_hidden === '1' ? 'hidden' : 'normal',
    assignment.row.slot,
  ].join('|')
}

for (const species of allPokemon) {
  const fallbackPokemonId = defaultPokemonIdBySpecies.get(String(species.id))
  for (const form of species.forms) {
    const formId = String(form.id)
    const rows =
      pokemonAbilitiesByPokemonId.get(formId) ||
      (fallbackPokemonId ? pokemonAbilitiesByPokemonId.get(fallbackPokemonId) : undefined) ||
      []
    if (rows.length === 0) continue

    const femaleVariant = femalePokemonByDefaultId.get(formId)
    const femaleRows = femaleVariant
      ? pokemonAbilitiesByPokemonId.get(String(femaleVariant.id)) || []
      : []
    const maleAssignments = buildNaturalAssignments(rows)
    const femaleAssignments = buildNaturalAssignments(femaleRows)

    if (
      femaleAssignments.length > 0 &&
      maleAssignments.map(getNaturalAssignmentKey).sort().join(',') !==
        femaleAssignments.map(getNaturalAssignmentKey).sort().join(',')
    ) {
      const unmatchedFemaleAssignments = [...femaleAssignments]
      for (const assignment of maleAssignments) {
        const matchingFemaleIndex = unmatchedFemaleAssignments.findIndex(
          (femaleAssignment) =>
            getNaturalAssignmentKey(femaleAssignment) ===
            getNaturalAssignmentKey(assignment),
        )
        if (matchingFemaleIndex >= 0) {
          unmatchedFemaleAssignments.splice(matchingFemaleIndex, 1)
          addNaturalAssignment(assignment.row, formId, assignment.chance)
        } else {
          addNaturalAssignment(assignment.row, formId, assignment.chance, 'male')
        }
      }
      for (const assignment of unmatchedFemaleAssignments) {
        addNaturalAssignment(assignment.row, formId, assignment.chance, 'female')
      }
    } else {
      for (const assignment of maleAssignments) {
        addNaturalAssignment(assignment.row, formId, assignment.chance)
      }
    }
  }
}

const lockedAbilityIds = new Set([
  'battle_bond',
  'disguise',
  'ice_face',
  'levitate',
  'schooling',
  'stance_change',
  'wonder_guard',
  'zero_to_hero',
])

const lines = [
  "import type { AbilityConfig } from './types'",
  '',
  '// Generated by scripts/generate-canonical-abilities.mjs from source_data/pokemon PokeAPI CSV JSON.',
  'export const CANONICAL_ABILITIES: AbilityConfig[] = [',
]

for (const ability of abilities) {
  const id = abilityId(ability.identifier)
  const naturalAssignments = [...entriesByAbilityId.values()]
    .filter((entry) => entry.abilityId === id)
    .sort((a, b) => {
      if (a.hidden !== b.hidden) return a.hidden ? -1 : 1
      if (a.slot !== b.slot) return a.slot - b.slot
      return a.forms[0].localeCompare(b.forms[0], undefined, { numeric: true })
    })
  if (naturalAssignments.length === 0) continue

  const formIds = [...(formIdsByAbilityId.get(id) || new Set())].sort((a, b) =>
    a.localeCompare(b, undefined, { numeric: true }),
  )
  const name = namesByAbilityId.get(ability.id) || formatSlug(ability.identifier)
  const description = proseByAbilityId.get(ability.id) || `Main-game ability: ${name}.`

  lines.push('  {')
  lines.push(`    id: ${quote(id)},`)
  lines.push(`    name: ${quote(name)},`)
  lines.push(`    description: ${quote(description)},`)
  lines.push("    type: 'answer',")
  lines.push('    value: 1,')
  lines.push('    rate: 100,')
  if (lockedAbilityIds.has(id)) {
    lines.push('    locked: true,')
  }
  lines.push(`    forms: ${writeArray(formIds, '      ')},`)
  lines.push('    naturalAssignments: [')
  for (const assignment of naturalAssignments) {
    const sortedForms = [...new Set(assignment.forms)].sort((a, b) =>
      a.localeCompare(b, undefined, { numeric: true }),
    )
    lines.push('      {')
    lines.push(`        forms: ${writeArray(sortedForms, '          ')},`)
    lines.push(`        chance: ${assignment.chance},`)
    if (assignment.hidden) lines.push('        hidden: true,')
    lines.push(`        slot: ${assignment.slot},`)
    if (assignment.gender) lines.push(`        gender: ${quote(assignment.gender)},`)
    lines.push('      },')
  }
  lines.push('    ],')
  lines.push('  },')
}

lines.push(']')
lines.push('')

fs.writeFileSync(outputPath, `${lines.join('\n')}`, 'utf8')
console.log(`Wrote ${path.relative(root, outputPath)}`)
