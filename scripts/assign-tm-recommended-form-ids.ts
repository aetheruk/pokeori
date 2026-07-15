import { promises as fs } from 'node:fs'
import path from 'node:path'
import { format } from 'prettier'
import ts from 'typescript'
import { allPokemon } from '@/data/pokemon'
import type { MoveConfig } from '@/data/moves/types'

const DATA_DIR = path.join(process.cwd(), 'src/data')
const SOURCE_DATA_DIR = path.join(process.cwd(), 'source_data', 'pokemon')
const SOURCE_POKEMON_MOVES_PATH = path.join(SOURCE_DATA_DIR, 'pokemon_moves.json')
const SOURCE_MOVES_PATH = path.join(SOURCE_DATA_DIR, 'moves.json')

const MOVE_TYPE_BY_FILE = {
  fire: { filename: 'fire.ts', variableName: 'FIRE_TM_MOVES' },
  water: { filename: 'water.ts', variableName: 'WATER_TM_MOVES' },
  electric: { filename: 'electric.ts', variableName: 'ELECTRIC_TM_MOVES' },
  grass: { filename: 'grass.ts', variableName: 'GRASS_TM_MOVES' },
  ice: { filename: 'ice.ts', variableName: 'ICE_TM_MOVES' },
  fighting: { filename: 'fighting.ts', variableName: 'FIGHTING_TM_MOVES' },
  poison: { filename: 'poison.ts', variableName: 'POISON_TM_MOVES' },
  ground: { filename: 'ground.ts', variableName: 'GROUND_TM_MOVES' },
  flying: { filename: 'flying.ts', variableName: 'FLYING_TM_MOVES' },
  psychic: { filename: 'psychic.ts', variableName: 'PSYCHIC_TM_MOVES' },
  bug: { filename: 'bug.ts', variableName: 'BUG_TM_MOVES' },
  rock: { filename: 'rock.ts', variableName: 'ROCK_TM_MOVES' },
  ghost: { filename: 'ghost.ts', variableName: 'GHOST_TM_MOVES' },
  dragon: { filename: 'dragon.ts', variableName: 'DRAGON_TM_MOVES' },
  dark: { filename: 'dark.ts', variableName: 'DARK_TM_MOVES' },
  steel: { filename: 'steel.ts', variableName: 'STEEL_TM_MOVES' },
  fairy: { filename: 'fairy.ts', variableName: 'FAIRY_TM_MOVES' },
} as const

type MoveTypeFile = keyof typeof MOVE_TYPE_BY_FILE

interface SourcePokemonMove {
  pokemon_id?: string | number
  move_id?: string | number
}

interface SourcePokemonMoveMeta {
  id?: string | number
  identifier?: string
}

function sortNumericStringIds(a: string, b: string) {
  const ai = Number(a)
  const bi = Number(b)
  if (Number.isNaN(ai) || Number.isNaN(bi)) return a.localeCompare(b)
  return ai - bi
}

function addRecommendation(map: Map<string, Set<string>>, moveId: string, formId: string) {
  const normalizedMoveId = moveId.toString().trim()
  const normalizedFormId = formId.toString().trim()
  if (!normalizedMoveId || !normalizedFormId) return

  const existing = map.get(normalizedMoveId)
  if (existing) existing.add(normalizedFormId)
  else map.set(normalizedMoveId, new Set([normalizedFormId]))
}

async function parseJsonFile<T>(filePath: string): Promise<T> {
  const content = await fs.readFile(filePath, 'utf-8')
  return JSON.parse(content) as T
}

async function getMoveIdToIdentifierMap() {
  const parsed = await parseJsonFile<SourcePokemonMoveMeta[]>(SOURCE_MOVES_PATH)
  const map = new Map<string, string>()

  for (const row of parsed) {
    if (!row || typeof row !== 'object') continue
    const moveId = row.id?.toString().trim()
    const identifier = row.identifier?.toString().trim().toLowerCase()
    if (!moveId || !identifier) continue
    map.set(moveId, identifier)
  }

  return map
}

async function getPokemonMoveRecommendations() {
  const moveIdToIdentifier = await getMoveIdToIdentifierMap()
  const parsed = await parseJsonFile<SourcePokemonMove[]>(SOURCE_POKEMON_MOVES_PATH)
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
}

function getAllFormIds() {
  return new Set(
    allPokemon.flatMap((species) => species.forms.map((form) => form.id.toString())),
  )
}

function normalizeFormIds(formIds: string[] | undefined, allFormIds: Set<string>) {
  return Array.from(new Set((formIds || []).map((id) => id.toString()).filter(Boolean)))
    .filter((id) => allFormIds.has(id))
    .sort(sortNumericStringIds)
}

function getMoveTypePath(type: MoveTypeFile) {
  return path.join(DATA_DIR, 'moves', 'tms', MOVE_TYPE_BY_FILE[type].filename)
}

function toValue(node: ts.Node): unknown {
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
  if (ts.isBinaryExpression(node)) {
    const left = toValue(node.left)
    const right = toValue(node.right)
    if (typeof left !== 'number' || typeof right !== 'number') {
      throw new Error('Unsupported non-numeric binary expression')
    }
    if (node.operatorToken.kind === ts.SyntaxKind.PlusToken) return left + right
    if (node.operatorToken.kind === ts.SyntaxKind.MinusToken) return left - right
    if (node.operatorToken.kind === ts.SyntaxKind.AsteriskToken) return left * right
    if (node.operatorToken.kind === ts.SyntaxKind.SlashToken) return left / right
    throw new Error('Unsupported binary operator')
  }
  if (ts.isArrayLiteralExpression(node)) return node.elements.map((element) => toValue(element))
  if (ts.isObjectLiteralExpression(node)) {
    const result: Record<string, unknown> = {}
    for (const property of node.properties) {
      if (!ts.isPropertyAssignment(property)) throw new Error('Unsupported object property')
      const name = property.name
      if (ts.isIdentifier(name) || ts.isStringLiteral(name) || ts.isNumericLiteral(name)) {
        result[name.text] = toValue(property.initializer)
        continue
      }
      throw new Error('Unsupported object key')
    }
    return result
  }

  throw new Error(`Unsupported syntax in move file: ${ts.SyntaxKind[node.kind]}`)
}

function parseExportedMoveArray(content: string): MoveConfig[] {
  const source = ts.createSourceFile('moves.ts', content, ts.ScriptTarget.Latest, true)

  for (const statement of source.statements) {
    if (!ts.isVariableStatement(statement)) continue
    const isExported = statement.modifiers?.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    )
    if (!isExported) continue

    for (const declaration of statement.declarationList.declarations) {
      if (declaration.initializer && ts.isArrayLiteralExpression(declaration.initializer)) {
        return toValue(declaration.initializer) as MoveConfig[]
      }
    }
  }

  throw new Error('No exported move array found')
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

async function saveMoveTypeFile(type: MoveTypeFile, moves: MoveConfig[]) {
  const config = MOVE_TYPE_BY_FILE[type]
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

  await fs.writeFile(getMoveTypePath(type), fileContents, 'utf-8')
}

function getRequestedTypes(args: string[]) {
  const typesArg = args.find((arg) => arg.startsWith('--types='))
  if (!typesArg) return Object.keys(MOVE_TYPE_BY_FILE) as MoveTypeFile[]

  const requested = typesArg
    .slice('--types='.length)
    .split(',')
    .map((type) => type.trim())
    .filter(Boolean)

  const invalid = requested.filter((type) => !Object.hasOwn(MOVE_TYPE_BY_FILE, type))
  if (invalid.length) {
    throw new Error(`Invalid move type(s): ${invalid.join(', ')}`)
  }

  return requested as MoveTypeFile[]
}

async function main() {
  const args = process.argv.slice(2)
  const dryRun = args.includes('--dry-run')
  const onlyEmpty = args.includes('--only-empty')
  const verbose = args.includes('--verbose')
  const requestedTypes = getRequestedTypes(args)
  const allFormIds = getAllFormIds()
  const recommendations = await getPokemonMoveRecommendations()

  let totalUpdatedMoves = 0
  let totalSkippedWithoutRecommendations = 0
  let totalSkippedExisting = 0

  for (const type of requestedTypes) {
    const filePath = getMoveTypePath(type)
    const content = await fs.readFile(filePath, 'utf-8')
    const moves = parseExportedMoveArray(content)
    let updatedMoves = 0
    let skippedWithoutRecommendations = 0
    let skippedExisting = 0
    const withoutRecommendationMoveIds: string[] = []

    const nextMoves = moves.map((move) => {
      if (onlyEmpty && move.formId?.length) {
        skippedExisting += 1
        return move
      }

      const recommended = recommendations.get(move.id)
      if (!recommended?.size) {
        skippedWithoutRecommendations += 1
        withoutRecommendationMoveIds.push(move.id)
        return move
      }

      const formId = normalizeFormIds(Array.from(recommended), allFormIds)
      if (!formId.length) {
        skippedWithoutRecommendations += 1
        withoutRecommendationMoveIds.push(move.id)
        return move
      }

      const current = normalizeFormIds(move.formId, allFormIds)
      if (current.join(',') === formId.join(',')) return normalizeMoveRecord({ ...move, formId })

      updatedMoves += 1
      return normalizeMoveRecord({ ...move, formId })
    })

    totalUpdatedMoves += updatedMoves
    totalSkippedWithoutRecommendations += skippedWithoutRecommendations
    totalSkippedExisting += skippedExisting

    if (!dryRun && updatedMoves > 0) await saveMoveTypeFile(type, nextMoves)

    console.log(
      `${type}: ${updatedMoves} move${updatedMoves === 1 ? '' : 's'} ${
        dryRun ? 'would be updated' : 'updated'
      }, ${skippedWithoutRecommendations} without recommendations${
        onlyEmpty ? `, ${skippedExisting} skipped with existing formId` : ''
      }`,
    )
    if (verbose && withoutRecommendationMoveIds.length) {
      console.log(`  no recommendations: ${withoutRecommendationMoveIds.join(', ')}`)
    }
  }

  console.log(
    `Done: ${totalUpdatedMoves} total move${totalUpdatedMoves === 1 ? '' : 's'} ${
      dryRun ? 'would be updated' : 'updated'
    }, ${totalSkippedWithoutRecommendations} without recommendations${
      onlyEmpty ? `, ${totalSkippedExisting} skipped with existing formId` : ''
    }.`,
  )
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
