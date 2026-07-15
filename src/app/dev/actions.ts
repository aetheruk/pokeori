'use server'

import { execFile } from 'node:child_process'
import { promises as fs } from 'node:fs'
import path from 'node:path'
import { promisify } from 'node:util'
import { format } from 'prettier'
import { BattleConfig, Location, Task } from '@/data/types'
import { ABILITIES, type AbilityConfig, type AbilityEffect } from '@/data/abilities'
import type { MoveConfig } from '@/data/moves/types'
import { ShopConfig } from '@/data/shops/types'
import { VoyageConfig } from '@/data/voyages/types'
import { allPokemon } from '@/data/pokemon'
import { items } from '@/data/items/all-items'

import { currencies } from '@/data/currencies'
import { banners } from '@/data/user/banners'
import { icons } from '@/data/user/icons'
import { titles } from '@/data/user/titles'
import { tcgSets } from '@/data/tcg'
import { skills } from '@/data/skills'
import { allGames } from '@/data/games'
import { expeditions } from '@/data/expeditions'
import {
  formatDevCommandOutput,
  getGameDataGenerationCommand,
  getGameDataValidationCommand,
} from '@/utilities/dev/game-data-tools'

const DATA_DIR = path.join(process.cwd(), 'src/data')
const SOURCE_DATA_DIR = path.join(process.cwd(), 'source_data', 'pokemon')
const SOURCE_POKEMON_MOVES_PATH = path.join(SOURCE_DATA_DIR, 'pokemon_moves.json')
const ABILITIES_PATH = path.join(DATA_DIR, 'abilities.ts')
const POKEMON_RESEARCH_LEVEL_REWARDS_PATH = path.join(DATA_DIR, 'pokemon-research-level-rewards.json')
const execFileAsync = promisify(execFile)

type EntryType = 'battles' | 'locations' | 'tasks' | 'shops' | 'voyages' | 'research'
const entryTypes = new Set<EntryType>(['battles', 'locations', 'tasks', 'shops', 'voyages', 'research'])
const MOVE_FILE_TYPES = ['normal', 'fire', 'water', 'electric', 'grass', 'ice', 'fighting', 'poison', 'ground', 'flying', 'psychic', 'bug', 'rock', 'ghost', 'dragon', 'dark', 'steel', 'fairy'] as const
const MOVE_TYPE_BY_FILE: Record<
  (typeof MOVE_FILE_TYPES)[number],
  { filename: string; variableName: string; label: string }
> = {
  normal: { filename: 'normal.ts', variableName: 'NORMAL_TM_MOVES', label: 'Normal' },
  fire: { filename: 'fire.ts', variableName: 'FIRE_TM_MOVES', label: 'Fire' },
  water: { filename: 'water.ts', variableName: 'WATER_TM_MOVES', label: 'Water' },
  electric: { filename: 'electric.ts', variableName: 'ELECTRIC_TM_MOVES', label: 'Electric' },
  grass: { filename: 'grass.ts', variableName: 'GRASS_TM_MOVES', label: 'Grass' },
  ice: { filename: 'ice.ts', variableName: 'ICE_TM_MOVES', label: 'Ice' },
  fighting: { filename: 'fighting.ts', variableName: 'FIGHTING_TM_MOVES', label: 'Fighting' },
  poison: { filename: 'poison.ts', variableName: 'POISON_TM_MOVES', label: 'Poison' },
  ground: { filename: 'ground.ts', variableName: 'GROUND_TM_MOVES', label: 'Ground' },
  flying: { filename: 'flying.ts', variableName: 'FLYING_TM_MOVES', label: 'Flying' },
  psychic: { filename: 'psychic.ts', variableName: 'PSYCHIC_TM_MOVES', label: 'Psychic' },
  bug: { filename: 'bug.ts', variableName: 'BUG_TM_MOVES', label: 'Bug' },
  rock: { filename: 'rock.ts', variableName: 'ROCK_TM_MOVES', label: 'Rock' },
  ghost: { filename: 'ghost.ts', variableName: 'GHOST_TM_MOVES', label: 'Ghost' },
  dragon: { filename: 'dragon.ts', variableName: 'DRAGON_TM_MOVES', label: 'Dragon' },
  dark: { filename: 'dark.ts', variableName: 'DARK_TM_MOVES', label: 'Dark' },
  steel: { filename: 'steel.ts', variableName: 'STEEL_TM_MOVES', label: 'Steel' },
  fairy: { filename: 'fairy.ts', variableName: 'FAIRY_TM_MOVES', label: 'Fairy' },
}
type MoveTypeFile = keyof typeof MOVE_TYPE_BY_FILE

interface PokemonFormForMoveEditor {
  speciesId: number
  speciesName: string
  forms: {
    id: string
    name: string
    types: string[]
  }[]
}

interface SourcePokemonMove {
  pokemon_id?: string | number
  move_id?: string | number
  pokemon_move_method_id?: string | number
}

interface SourcePokemonMoveMeta {
  id?: string | number
  identifier?: string
}

interface MoveTypeFileData {
  moves: MoveConfig[]
  recommendationsByMoveId: Record<string, string[]>
}

export interface AbilityEditorEntry {
  id: string
  name: string
  description: string
  type: AbilityConfig['type']
  value: number
  rate: number
  naturalChance?: number
  failureRate?: number
  forms: AbilityConfig['forms']
  criteria?: AbilityConfig['criteria']
  rewards?: AbilityConfig['rewards']
  encounters?: AbilityConfig['encounters']
  effects: readonly AbilityEffect[]
  explicitEffects: readonly AbilityEffect[]
  generated: boolean
}

export type AbilityEditorSavePayload = Omit<AbilityEditorEntry, 'explicitEffects' | 'generated'>

interface AbilityEditorData {
  abilities: AbilityEditorEntry[]
}

interface MoveTypeFileMeta {
  id: MoveTypeFile
  filename: string
  label: string
  variableName: string
}

export interface PokemonResearchLevelReward {
  formId: string
  level: number
  itemId: string
  quantity?: number
}

interface EntryMap {
  battles: BattleConfig
  locations: Location
  tasks: Task
  shops: ShopConfig
  voyages: VoyageConfig
  research: any
}

function getDirectory(type: EntryType) {
  if (!entryTypes.has(type)) {
    throw new Error('Invalid entry type')
  }

  return path.join(DATA_DIR, type, 'entries')
}

export async function runGameDataValidation() {

  try {
    const { stdout, stderr } = await execFileAsync('bun', getGameDataValidationCommand(), {
      cwd: process.cwd(),
      timeout: 120_000,
      maxBuffer: 1024 * 1024 * 5,
    })

    return { success: true, output: formatDevCommandOutput(stdout, stderr) }
  } catch (error) {
    const err = error as { stdout?: string; stderr?: string; message?: string }
    return {
      success: false,
      output: formatDevCommandOutput(err.stdout, err.stderr) || err.message || 'Validation failed',
    }
  }
}

export async function runGameDataGeneration(options?: { skipFetch?: boolean; dryRun?: boolean }) {

  try {
    const { stdout, stderr } = await execFileAsync('bun', getGameDataGenerationCommand(options), {
      cwd: process.cwd(),
      timeout: 300_000,
      maxBuffer: 1024 * 1024 * 10,
    })

    return { success: true, output: formatDevCommandOutput(stdout, stderr) }
  } catch (error) {
    const err = error as { stdout?: string; stderr?: string; message?: string }
    return {
      success: false,
      output: formatDevCommandOutput(err.stdout, err.stderr) || err.message || 'Generation failed',
    }
  }
}

async function parseExportedEntryArray<T>(content: string): Promise<T[] | null> {
  const ts = await import('typescript')
  const source = ts.createSourceFile('entry.ts', content, ts.ScriptTarget.Latest, true)

  const toValue = (node: import('typescript').Node): unknown => {
    if (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) return toValue(node.expression)
    if (ts.isParenthesizedExpression(node)) return toValue(node.expression)
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text
    if (ts.isNumericLiteral(node)) return Number(node.text)
    if (node.kind === ts.SyntaxKind.TrueKeyword) return true
    if (node.kind === ts.SyntaxKind.FalseKeyword) return false
    if (node.kind === ts.SyntaxKind.NullKeyword) return null
    if (ts.isPrefixUnaryExpression(node)) {
      const value = toValue(node.operand)
      if (typeof value !== 'number') throw new Error('Unsupported unary expression')
      return node.operator === ts.SyntaxKind.MinusToken ? -value : value
    }
    if (ts.isArrayLiteralExpression(node)) {
      return node.elements.map((element) => toValue(element))
    }
    if (ts.isObjectLiteralExpression(node)) {
      const result: Record<string, unknown> = {}
      for (const property of node.properties) {
        if (!ts.isPropertyAssignment(property)) {
          throw new Error('Unsupported object property')
        }

        const name = property.name
        let key: string
        if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
          key = name.text
        } else {
          throw new Error('Unsupported object key')
        }

        result[key] = toValue(property.initializer)
      }
      return result
    }

    throw new Error(`Unsupported syntax in entry file: ${ts.SyntaxKind[node.kind]}`)
  }

  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    const isExported = statement.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    )
    if (!isExported) continue

    for (const declaration of statement.declarationList.declarations) {
      if (declaration.initializer && ts.isArrayLiteralExpression(declaration.initializer)) {
        return toValue(declaration.initializer) as T[]
      }
    }
  }

  return null
}

function getMoveTypeList() {
  return MOVE_FILE_TYPES.map((type) => ({
    id: type,
    filename: MOVE_TYPE_BY_FILE[type].filename,
    variableName: MOVE_TYPE_BY_FILE[type].variableName,
    label: MOVE_TYPE_BY_FILE[type].label,
  }))
}

function getMoveTypePath(type: MoveTypeFile) {
  const config = MOVE_TYPE_BY_FILE[type]
  return path.join(DATA_DIR, 'moves', 'tms', config.filename)
}

let machineMoveRecommendationCache: Promise<Map<string, Set<string>>> | null = null
let pokemonMoveIdMapCache: Promise<Map<string, string>> | null = null

async function getMoveIdToIdentifierMap() {
  if (pokemonMoveIdMapCache) return pokemonMoveIdMapCache

  pokemonMoveIdMapCache = (async () => {
    const content = await fs.readFile(path.join(SOURCE_DATA_DIR, 'moves.json'), 'utf-8')
    const parsed = JSON.parse(content) as SourcePokemonMoveMeta[]
    const map = new Map<string, string>()

    for (const row of parsed) {
      if (!row || typeof row !== 'object') continue

      const moveId = row.id?.toString().trim()
      const identifier = row.identifier?.toString().trim().toLowerCase()
      if (!moveId || !identifier) continue

      map.set(moveId, identifier)
    }

    return map
  })().catch((error) => {
    pokemonMoveIdMapCache = null
    throw error
  })

  return pokemonMoveIdMapCache
}

function addRecommendation(map: Map<string, Set<string>>, moveId: string, formId: string) {
  const nextMoveId = moveId.toString().trim()
  if (!nextMoveId || !formId) return

  const existing = map.get(nextMoveId)
  if (existing) {
    existing.add(formId)
  } else {
    map.set(nextMoveId, new Set([formId]))
  }
}

function sortNumericStringIds(a: string, b: string) {
  const ai = Number(a)
  const bi = Number(b)
  if (Number.isNaN(ai) || Number.isNaN(bi)) return a.localeCompare(b)
  return ai - bi
}

async function getPokemonMoveRecommendations() {
  if (machineMoveRecommendationCache) return machineMoveRecommendationCache

  machineMoveRecommendationCache = (async () => {
    const moveIdToIdentifier = await getMoveIdToIdentifierMap()
    const content = await fs.readFile(SOURCE_POKEMON_MOVES_PATH, 'utf-8')
    const parsed = JSON.parse(content) as SourcePokemonMove[]
    const recommendations = new Map<string, Set<string>>()

    for (const row of parsed) {
      if (!row || typeof row !== 'object') continue

      const moveId = row.move_id?.toString().trim()
      const formId = row.pokemon_id?.toString().trim()
      if (!moveId || !formId) continue

      addRecommendation(recommendations, moveId, formId)
      const identifier = moveIdToIdentifier.get(moveId)
      if (identifier) addRecommendation(recommendations, identifier, formId)
    }

    return recommendations
  })().catch((error) => {
    machineMoveRecommendationCache = null
    throw error
  })

  return machineMoveRecommendationCache
}

async function getRecommendationsForMoveIds(moveIds: string[]): Promise<Record<string, string[]>> {
  const sourceRecommendations = await getPokemonMoveRecommendations()
  const result: Record<string, string[]> = {}

  for (const moveId of moveIds) {
    const normalizedMoveId = moveId.toString().trim()
    const formIds = sourceRecommendations.get(normalizedMoveId)
    if (!formIds?.size) continue

    result[normalizedMoveId] = Array.from(formIds).sort((a, b) => {
      const aNum = Number(a)
      const bNum = Number(b)
      if (Number.isNaN(aNum) || Number.isNaN(bNum)) return a.localeCompare(b)
      return aNum - bNum
    })
  }

  return result
}

function normalizeMoveRecord(move: MoveConfig): MoveConfig {
  const formId = Array.isArray(move.formId)
    ? move.formId.map((id) => id.toString()).filter(Boolean)
    : []

  return {
    ...move,
    formId: formId.length ? formId : undefined,
  }
}

function ensureMoveType(type: string): MoveTypeFile {
  if (!Object.hasOwn(MOVE_TYPE_BY_FILE, type)) {
    throw new Error(`Invalid move type: ${type}`)
  }
  return type as MoveTypeFile
}

export async function listMoveTypeFiles() {
  return getMoveTypeList()
}

export async function readMoveTypeFile(type: string): Promise<MoveTypeFileData> {
  const moveType = ensureMoveType(type)
  const filePath = getMoveTypePath(moveType)
  const content = await fs.readFile(filePath, 'utf-8')

  try {
    const parsed = await parseExportedEntryArray<MoveConfig>(content)
    if (!parsed) return { moves: [], recommendationsByMoveId: {} }
    const normalizedMoves = parsed.map((move) => normalizeMoveRecord(move))
    const recommendationsByMoveId = await getRecommendationsForMoveIds(
      normalizedMoves.map((move) => move.id),
    )

    return {
      moves: normalizedMoves,
      recommendationsByMoveId,
    }
  } catch (error) {
    console.error(`Error reading move file ${type}:`, error)
    throw new Error('Invalid move file format')
  }
}

export async function saveMoveTypeFile(type: string, moves: MoveConfig[]) {
  const moveType = ensureMoveType(type)
  const filePath = getMoveTypePath(moveType)
  const config = MOVE_TYPE_BY_FILE[moveType]

  const normalized = moves.map((move) => normalizeMoveRecord(move))
  const json = JSON.stringify(normalized, null, 2)
  const fileContents = await format(
    `import type { MoveConfig } from '../types'\n\nexport const ${config.variableName}: MoveConfig[] = ${json}\n`,
    {
      parser: 'typescript',
      singleQuote: true,
      semi: false,
      trailingComma: 'all',
      printWidth: 100,
      quoteProps: 'as-needed',
    },
  )

  try {
    await fs.writeFile(filePath, fileContents, 'utf-8')
    const recommendationsByMoveId = await getRecommendationsForMoveIds(
      normalized.map((move) => move.id),
    )
    return { success: true, recommendationsByMoveId }
  } catch (error) {
    console.error(`Error saving move file ${type}:`, error)
    return { success: false, error: String(error) }
  }
}

function sortPokemonResearchLevelRewards(
  rewards: PokemonResearchLevelReward[],
): PokemonResearchLevelReward[] {
  return [...rewards].sort((a, b) => {
    const formCompare = sortNumericStringIds(a.formId, b.formId)
    if (formCompare !== 0) return formCompare
    if (a.level !== b.level) return a.level - b.level
    return a.itemId.localeCompare(b.itemId)
  })
}

function normalizePokemonResearchLevelReward(
  reward: PokemonResearchLevelReward,
): PokemonResearchLevelReward | null {
  const formId = reward.formId?.toString().trim()
  const itemId = reward.itemId?.toString().trim()
  const level = Number(reward.level)
  const quantity = reward.quantity === undefined ? undefined : Number(reward.quantity)

  if (!formId || !itemId || !Number.isFinite(level) || level < 1) return null

  return {
    formId,
    level,
    itemId,
    ...(quantity !== undefined && Number.isFinite(quantity) && quantity > 1 ? { quantity } : {}),
  }
}

export async function readPokemonResearchLevelRewards(): Promise<PokemonResearchLevelReward[]> {
  const content = await fs.readFile(POKEMON_RESEARCH_LEVEL_REWARDS_PATH, 'utf-8')
  const parsed = JSON.parse(content) as PokemonResearchLevelReward[]

  return sortPokemonResearchLevelRewards(
    parsed
      .map((reward) => normalizePokemonResearchLevelReward(reward))
      .filter((reward): reward is PokemonResearchLevelReward => Boolean(reward)),
  )
}

export async function savePokemonResearchLevelRewards(
  rewards: PokemonResearchLevelReward[],
) {
  const normalized = sortPokemonResearchLevelRewards(
    rewards
      .map((reward) => normalizePokemonResearchLevelReward(reward))
      .filter((reward): reward is PokemonResearchLevelReward => Boolean(reward)),
  )

  const deduped = new Map<string, PokemonResearchLevelReward>()
  for (const reward of normalized) {
    deduped.set(`${reward.formId}:${reward.level}:${reward.itemId}`, reward)
  }

  const fileContents = await format(JSON.stringify(Array.from(deduped.values()), null, 2), {
    parser: 'json',
    printWidth: 100,
  })

  try {
    await fs.writeFile(POKEMON_RESEARCH_LEVEL_REWARDS_PATH, fileContents, 'utf-8')
    return { success: true }
  } catch (error) {
    console.error('Error saving Pokemon research level rewards:', error)
    return { success: false, error: String(error) }
  }
}

export async function getMovePokemonFormList(): Promise<PokemonFormForMoveEditor[]> {
  return allPokemon.map((species) => ({
    speciesId: species.id,
    speciesName: species.forms[0]?.name || `Pokemon #${species.id}`,
    forms: species.forms.map((form) => ({
      id: form.id,
      name: form.name,
      types: form.types || [],
    })),
  }))
}

export async function getAbilityPokemonFormList(): Promise<PokemonFormForMoveEditor[]> {
  return getMovePokemonFormList()
}

export async function readAbilityEditorData(): Promise<AbilityEditorData> {
  const abilities = Object.values(ABILITIES)
    .map((ability): AbilityEditorEntry => ({
      id: ability.id,
      name: ability.name,
      description: ability.description,
      type: ability.type,
      value: ability.value,
      rate: ability.rate,
      naturalChance: ability.naturalChance,
      failureRate: ability.failureRate,
      forms: ability.forms,
      criteria: ability.criteria,
      rewards: ability.rewards,
      encounters: ability.encounters,
      effects: ability.effects || [],
      explicitEffects: ability.effects || [],
      generated: false,
    }))
    .sort((a, b) => a.name.localeCompare(b.name))

  return { abilities }
}

function isPropertyNamed(
  ts: typeof import('typescript'),
  property: import('typescript').ObjectLiteralElementLike,
  name: string,
) {
  return (
    ts.isPropertyAssignment(property) &&
    ((ts.isIdentifier(property.name) && property.name.text === name) ||
      (ts.isStringLiteral(property.name) && property.name.text === name))
  )
}

function normalizeAbilityForSave(ability: AbilityEditorSavePayload): AbilityEditorSavePayload {
  const normalizedForms = Array.isArray(ability.forms)
    ? Array.from(
        new Set(
          ability.forms
            .flat()
            .map((formId) => String(formId).trim())
            .filter(Boolean),
        ),
      ).sort(sortNumericStringIds)
    : undefined

  const normalized: AbilityEditorSavePayload = {
    id: ability.id.trim(),
    name: ability.name.trim(),
    description: ability.description.trim(),
    type: ability.type,
    value: Number.isFinite(ability.value) ? ability.value : 0,
    rate: Number.isFinite(ability.rate) ? ability.rate : 100,
    forms: normalizedForms,
    effects: ability.effects || [],
  }

  if (ability.naturalChance !== undefined && Number.isFinite(ability.naturalChance)) {
    normalized.naturalChance = ability.naturalChance
  }
  if (ability.failureRate !== undefined && Number.isFinite(ability.failureRate)) {
    normalized.failureRate = ability.failureRate
  }
  if (normalizedForms?.length) normalized.forms = normalizedForms
  if (ability.criteria && Object.keys(ability.criteria).length) normalized.criteria = ability.criteria
  if (ability.rewards?.length) normalized.rewards = ability.rewards
  if (ability.encounters?.length) normalized.encounters = ability.encounters

  return normalized
}

async function findAuthoredAbilityArray(content: string) {
  const ts = await import('typescript')
  const source = ts.createSourceFile('abilities.ts', content, ts.ScriptTarget.Latest, true)
  let array: import('typescript').ArrayLiteralExpression | undefined

  source.forEachChild((node) => {
    if (!ts.isVariableStatement(node)) return
    for (const declaration of node.declarationList.declarations) {
      if (!ts.isIdentifier(declaration.name) || declaration.name.text !== 'AUTHORED_ABILITIES') {
        continue
      }
      if (!declaration.initializer || !ts.isArrayLiteralExpression(declaration.initializer)) {
        continue
      }
      array = declaration.initializer
    }
  })

  return { ts, source, array }
}

async function findAuthoredAbilityObject(content: string, abilityId: string) {
  const parsed = await findAuthoredAbilityArray(content)
  let targetObject: import('typescript').ObjectLiteralExpression | undefined

  if (!parsed.array) return { ...parsed, targetObject }

  for (const element of parsed.array.elements) {
    if (!parsed.ts.isObjectLiteralExpression(element)) continue
    const idProperty = element.properties.find((property) =>
      isPropertyNamed(parsed.ts, property, 'id'),
    )
    if (!idProperty || !parsed.ts.isPropertyAssignment(idProperty)) continue
    const initializer = idProperty.initializer
    if (
      (parsed.ts.isStringLiteral(initializer) ||
        parsed.ts.isNoSubstitutionTemplateLiteral(initializer)) &&
      initializer.text === abilityId
    ) {
      targetObject = element
      break
    }
  }

  return { ...parsed, targetObject }
}

async function formatAbilitySource(content: string) {
  return format(content, {
    parser: 'typescript',
    singleQuote: true,
    semi: false,
    trailingComma: 'all',
    printWidth: 100,
    quoteProps: 'as-needed',
  })
}

async function serializeAbilityForSource(ability: AbilityEditorSavePayload) {
  const formatted = await formatAbilitySource(
    `const ability = ${JSON.stringify(normalizeAbilityForSave(ability), null, 2)}`,
  )
  return formatted.trim().replace(/^const ability = /, '')
}

export async function saveAbilityEntry(ability: AbilityEditorSavePayload) {
  const normalized = normalizeAbilityForSave(ability)
  if (!normalized.id) return { success: false, error: 'Ability ID is required' }
  if (!normalized.name) return { success: false, error: 'Ability name is required' }

  try {
    const content = await fs.readFile(ABILITIES_PATH, 'utf-8')
    const { source, targetObject } = await findAuthoredAbilityObject(content, normalized.id)
    if (!targetObject) {
      return {
        success: false,
        error: 'Only authored abilities in src/data/abilities.ts can be saved here.',
      }
    }

    const serialized = await serializeAbilityForSource(normalized)
    const nextContent =
      content.slice(0, targetObject.getStart(source)) +
      serialized +
      content.slice(targetObject.end)
    await fs.writeFile(ABILITIES_PATH, await formatAbilitySource(nextContent), 'utf-8')
    return { success: true, ability: normalized }
  } catch (error) {
    console.error('Error saving ability:', error)
    return { success: false, error: String(error) }
  }
}

export async function createAbilityEntry(ability: AbilityEditorSavePayload) {
  const normalized = normalizeAbilityForSave(ability)
  if (!normalized.id) return { success: false, error: 'Ability ID is required' }
  if (!normalized.name) return { success: false, error: 'Ability name is required' }

  try {
    const content = await fs.readFile(ABILITIES_PATH, 'utf-8')
    const { array, targetObject } = await findAuthoredAbilityObject(content, normalized.id)
    if (targetObject || ABILITIES[normalized.id]) {
      return { success: false, error: `Ability "${normalized.id}" already exists.` }
    }
    if (!array) {
      return { success: false, error: 'Could not locate AUTHORED_ABILITIES.' }
    }

    const serialized = await serializeAbilityForSource(normalized)
    const insertAt = array.getEnd() - 1
    const separator = array.elements.length ? ',\n' : '\n'
    const nextContent =
      `${content.slice(0, insertAt)}${separator}${serialized},\n${content.slice(insertAt)}`
    await fs.writeFile(ABILITIES_PATH, await formatAbilitySource(nextContent), 'utf-8')
    return { success: true, ability: normalized }
  } catch (error) {
    console.error('Error creating ability:', error)
    return { success: false, error: String(error) }
  }
}

export async function saveAbilityEffects(abilityId: string, effects: AbilityEffect[]) {
  const normalizedAbilityId = abilityId.trim()
  if (!normalizedAbilityId) return { success: false, error: 'Ability ID is required' }

  try {
    const ts = await import('typescript')
    const content = await fs.readFile(ABILITIES_PATH, 'utf-8')
    const source = ts.createSourceFile('abilities.ts', content, ts.ScriptTarget.Latest, true)
    let targetObject: import('typescript').ObjectLiteralExpression | undefined

    source.forEachChild((node) => {
      if (!ts.isVariableStatement(node)) return
      for (const declaration of node.declarationList.declarations) {
        if (!ts.isIdentifier(declaration.name) || declaration.name.text !== 'AUTHORED_ABILITIES') {
          continue
        }
        if (!declaration.initializer || !ts.isArrayLiteralExpression(declaration.initializer)) {
          continue
        }
        for (const element of declaration.initializer.elements) {
          if (!ts.isObjectLiteralExpression(element)) continue
          const idProperty = element.properties.find((property) => isPropertyNamed(ts, property, 'id'))
          if (!idProperty || !ts.isPropertyAssignment(idProperty)) continue
          const initializer = idProperty.initializer
          if (
            (ts.isStringLiteral(initializer) || ts.isNoSubstitutionTemplateLiteral(initializer)) &&
            initializer.text === normalizedAbilityId
          ) {
            targetObject = element
          }
        }
      }
    })

    if (!targetObject) {
      return {
        success: false,
        error: 'Only authored abilities in src/data/abilities.ts can be saved here.',
      }
    }

    const json = JSON.stringify(effects || [], null, 2)
    const effectsText = `effects: ${json},`
    const existingEffects = targetObject.properties.find((property) =>
      isPropertyNamed(ts, property, 'effects'),
    )
    let nextContent: string
    if (existingEffects) {
      nextContent =
        content.slice(0, existingEffects.getStart(source)) +
        effectsText +
        content.slice(existingEffects.end)
    } else {
      const insertAt = targetObject.getEnd() - 1
      const prefix = targetObject.properties.length > 0 ? ',\n' : '\n'
      nextContent =
        content.slice(0, insertAt) +
        `${prefix}${effectsText}\n` +
        content.slice(insertAt)
    }

    const formatted = await format(nextContent, {
      parser: 'typescript',
      singleQuote: true,
      semi: false,
      trailingComma: 'all',
      printWidth: 100,
      quoteProps: 'as-needed',
    })
    await fs.writeFile(ABILITIES_PATH, formatted, 'utf-8')
    return { success: true }
  } catch (error) {
    console.error('Error saving ability effects:', error)
    return { success: false, error: String(error) }
  }
}

function getEntryPath(type: EntryType, filename: string) {
  if (path.basename(filename) !== filename || !filename.endsWith('.ts')) {
    throw new Error('Invalid entry filename')
  }

  return path.join(getDirectory(type), filename)
}

export async function listEntries(type: EntryType) {
  const dir = getDirectory(type)
  try {
    const files = await fs.readdir(dir)
    return files.filter((file) => file.endsWith('.ts'))
  } catch (error) {
    console.error(`Error listing entries for ${type}:`, error)
    return []
  }
}

export async function readEntry<T extends EntryType>(
  type: T,
  filename: string,
): Promise<EntryMap[T][] | null> {
  const filePath = getEntryPath(type, filename)
  try {
    const content = await fs.readFile(filePath, 'utf-8')
    return await parseExportedEntryArray<EntryMap[T]>(content)
  } catch (error) {
    console.error(`Error reading entry ${type}/${filename}:`, error)
    return null
  }
}

export async function saveEntry<T extends EntryType>(
  type: T,
  filename: string,
  data: EntryMap[T][],
) {
  const filePath = getEntryPath(type, filename)
  try {
    const existingContent = await fs.readFile(filePath, 'utf-8').catch(() => null)

    let variableName = ''
    let typeName = ''

    const typeMap: Record<string, { typeName: string; importLine: string }> = {
      battles: {
        typeName: 'BattleConfig',
        importLine: "import { BattleConfig } from '../../types'",
      },
      locations: { typeName: 'Location', importLine: "import { Location } from '../../types'" },
      tasks: { typeName: 'Task', importLine: "import { Task } from '../../types'" },
      shops: { typeName: 'ShopConfig', importLine: "import { ShopConfig } from '../types'" },
      voyages: { typeName: 'VoyageConfig', importLine: "import { VoyageConfig } from '../types'" },
    }

    typeName = typeMap[type]?.typeName || 'any'
    const importLine = typeMap[type]?.importLine || ''

    if (existingContent) {
      const match = existingContent.match(/export const (\w+)\s*:/)
      if (match) {
        variableName = match[1]
      }
    }

    if (!variableName) {
      const baseName = filename.replace('.ts', '').replace(/-([a-z])/g, (g) => g[1].toUpperCase())
      variableName = baseName + type.charAt(0).toUpperCase() + type.slice(1)
    }

    // Apply required defaults per type so that saved files always satisfy the TypeScript interface
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const defaultsByType: Record<string, Record<string, any>> = {
      tasks: {
        repeatable: false,
        requirements: [],
        criteria: [],
        rewards: [],
      },
      battles: {
        requirements: [],
        rewards: [],
        enemyTeam: [],
        maxPokemon: 1,
      },
      locations: {
        requirements: [],
        rewards: [],
        encounters: [],
      },
      shops: {
        items: [],
      },
      voyages: {
        rewards: [],
        isRepeatable: false,
        maxPokemon: 1,
        durationMinutes: 60,
        successChance: 100,
      },
    }

    const defaults = defaultsByType[type] || {}
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataWithDefaults = data.map((entry: any) => {
      const result = { ...entry }
      for (const [key, defaultValue] of Object.entries(defaults)) {
        if (result[key] === undefined || result[key] === null) {
          result[key] = defaultValue
        }
      }
      return result
    })

    const jsonString = JSON.stringify(dataWithDefaults, null, 2)

    let newContent = importLine ? `${importLine}\n\n` : ''

    newContent += `export const ${variableName}: ${typeName}[] = ${jsonString}\n`

    await fs.writeFile(filePath, newContent, 'utf-8')
    return { success: true }
  } catch (error) {
    console.error(`Error saving entry ${type}/${filename}:`, error)
    return { success: false, error: String(error) }
  }
}

export async function getPokemonList() {
  return allPokemon.map((p) => ({
    id: p.id,
    name: p.forms[0]?.name || `Pokemon #${p.id}`,
  }))
}

export async function getPokemonForms(speciesId: number): Promise<{ id: string; name: string }[]> {
  const species = allPokemon.find((p) => p.id === speciesId)
  if (!species) return []
  return species.forms.map((f) => ({
    id: f.id,
    name: f.name,
  }))
}

export async function getSpeciesIdForForm(formId: string): Promise<number | null> {
  const targetId = formId.toString()
  for (const species of allPokemon) {
    const form = species.forms.find((f) => f.id === targetId)
    if (form) return species.id
  }
  return null
}

export async function getItemList() {
  return items.map((item) => ({
    id: item.id,
    name: item.name,
  }))
}

export async function getCurrencyList() {
  return currencies.map((c) => ({
    id: c.id,
    name: c.name,
  }))
}

export async function getTaskList() {
  const filenames = await listEntries('tasks')
  const allTasks: { id: string; name: string }[] = []

  for (const filename of filenames) {
    const tasks = await readEntry('tasks', filename)
    if (tasks) {
      tasks.forEach((t) => {
        allTasks.push({ id: t.id, name: t.name })
      })
    }
  }

  return allTasks
}

export async function getVoyageList() {
  const filenames = await listEntries('voyages')
  const allVoyages: { id: string; name: string }[] = []

  for (const filename of filenames) {
    const voyages = await readEntry('voyages', filename)
    if (voyages) {
      voyages.forEach((v: any) => {
        allVoyages.push({ id: v.id, name: v.name })
      })
    }
  }

  return allVoyages
}

export async function getBannerList() {
  return banners.map((b) => ({
    id: b.id,
    name: b.name,
  }))
}

export async function getIconList() {
  return icons.map((i) => ({
    id: i.id,
    name: i.name,
  }))
}

export async function getTitleList() {
  return titles.map((t) => ({
    id: t.id,
    name: t.name,
  }))
}

export async function getTcgSetList() {
  return tcgSets.map((s) => ({
    id: s.id,
    name: s.name,
  }))
}

export async function getTcgCardList(setIds?: string[]) {
  const cards: { id: string; name: string }[] = []
  const targetSets = setIds?.length ? tcgSets.filter((s) => setIds.includes(s.id)) : tcgSets

  targetSets.forEach((s) => {
    s.cards.forEach((c) => {
      cards.push({
        id: c.id,
        name: `${c.name} (${s.name} #${c.number})`,
      })
    })
  })

  return cards
}

export async function getSkillList() {
  return skills.map((s) => ({
    id: s.id,
    name: s.name,
  }))
}

export async function getBattleList() {
  const filenames = await listEntries('battles')
  const allBattles: { id: string; name: string }[] = []

  for (const filename of filenames) {
    const battles = await readEntry('battles', filename)
    if (battles) {
      battles.forEach((b) => {
        allBattles.push({ id: b.id, name: b.name })
      })
    }
  }

  return allBattles
}

export async function getLocationList() {
  const filenames = await listEntries('locations')
  const allLocations: { id: string; name: string }[] = []

  for (const filename of filenames) {
    const locations = await readEntry('locations', filename)
    if (locations) {
      locations.forEach((l) => {
        allLocations.push({ id: l.id, name: l.name })
      })
    }
  }

  return allLocations
}

export async function getResearchList() {
  return allGames.map((g) => ({
    id: g.id,
    name: g.name,
  }))
}

export async function getExpeditionList() {
  return expeditions.map((entry) => ({
    id: entry.id,
    name: entry.name,
  }))
}

export async function getPokemonTypeList() {
  const types = [
    'normal',
    'fire',
    'water',
    'grass',
    'electric',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'steel',
    'fairy',
    'dark',
    'stellar',
  ]
  return types.map((t) => ({ id: t, name: t.charAt(0).toUpperCase() + t.slice(1) }))
}
