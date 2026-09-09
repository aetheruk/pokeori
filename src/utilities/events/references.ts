import 'server-only'
import { items } from '@/data/items'
import { getAllMoves, STATUS_EFFECTS, POKEMON_TYPES } from '@/data/moves'
import { trainerClassById } from '@/data/trainers'
import {
  getPokemonForm,
  getSpeciesIdForForm,
} from '@/utilities/pokemon/pokedex'
import type { EventKind } from './model'
import { eventCatalog } from './catalog'
import { currencies } from '@/data/currencies'

const itemIds = new Set(items.map((item) => item.id))
const moveIds = new Set(getAllMoves().map((move) => move.id))
const currencyIds = new Set(currencies.map((currency) => currency.id))
const conditionTargets: Record<string, EventKind> = {
  battle_result: 'battle',
  location_encounter_result: 'location',
  field_research_result: 'field-research',
  task_completed: 'task',
  task_active: 'task',
  task_complete: 'task',
}
export function validateEventReferences(
  value: unknown,
  localIds: Set<string> = new Set(),
) {
  function visit(node: any) {
    if (!node || typeof node !== 'object') return
    if (Array.isArray(node)) {
      node.forEach(visit)
      return
    }
    if (node.speciesId !== undefined && !getPokemonForm(node.speciesId))
      throw new Error(`Unknown Pokémon species: ${node.speciesId}`)
    if (
      node.formId !== undefined &&
      (!getPokemonForm(node.formId) ||
        (node.speciesId !== undefined &&
          getSpeciesIdForForm(node.formId) !== node.speciesId))
    )
      throw new Error(`Invalid Pokémon form: ${node.formId}`)
    for (const key of ['itemId', 'heldItemId'])
      if (node[key] && !itemIds.has(node[key]))
        throw new Error(`Unknown item: ${node[key]}`)
    if (node.requiredItem?.id && !itemIds.has(node.requiredItem.id))
      throw new Error(`Unknown required item: ${node.requiredItem.id}`)
    for (const key of ['aiMoves'])
      for (const id of node[key] || [])
        if (!moveIds.has(id)) throw new Error(`Unknown move: ${id}`)
    for (const id of node.allowedItems || [])
      if (!itemIds.has(id)) throw new Error(`Unknown battle item: ${id}`)
    for (const id of node.bannedPlayerTypes || [])
      if (!POKEMON_TYPES.includes(id))
        throw new Error(`Unknown Pokémon type: ${id}`)
    for (const key of ['initialStatus', 'playerTeamInitialStatus'])
      if (node[key] && !Object.hasOwn(STATUS_EFFECTS, node[key]))
        throw new Error(`Unknown status: ${node[key]}`)
    if (
      node.trainerClassId &&
      !Object.hasOwn(trainerClassById, node.trainerClassId)
    )
      throw new Error(`Unknown trainer class: ${node.trainerClassId}`)
    if (node.type === 'item' && node.targetId && !itemIds.has(node.targetId))
      throw new Error(`Unknown reward item: ${node.targetId}`)
    if (node.type === 'item' && node.id && !itemIds.has(node.id))
      throw new Error(`Unknown item: ${node.id}`)
    if (
      node.type === 'currency' &&
      !currencyIds.has(String(node.targetId || node.id))
    )
      throw new Error(`Unknown currency: ${node.targetId || node.id}`)
    if (
      node.type === 'pokemon' &&
      node.targetId &&
      !getPokemonForm(node.targetId)
    )
      throw new Error(`Unknown reward Pokémon: ${node.targetId}`)
    const kind = conditionTargets[node.type]
    if (kind && node.targetId)
      for (const target of [node.targetId].flat())
        if (
          !localIds.has(String(target)) &&
          !eventCatalog[kind].some((entry) => entry.id === String(target))
        )
          throw new Error(`Unknown ${kind} requirement: ${target}`)
    for (const [key, entry] of Object.entries(node)) {
      if (
        ['background', 'music'].includes(key) &&
        typeof entry === 'string' &&
        (/^(https?:|data:|javascript:)/i.test(entry) || entry.includes('..'))
      )
        throw new Error('Choose an existing local asset')
      visit(entry)
    }
  }
  visit(value)
}
