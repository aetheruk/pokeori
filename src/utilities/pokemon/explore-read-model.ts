import 'server-only'
import type { Payload } from 'payload'
import type { Pokemon } from '@/payload-types'
import { EXPLORE_POKEMON_SELECT } from '@/utilities/game-data-scopes'

function hasReadHooks(fields: unknown[]): boolean {
  return fields.some((value) => {
    const field = value as { hooks?: { afterRead?: unknown[] }; fields?: unknown[]; tabs?: { fields: unknown[] }[] }
    return !!field.hooks?.afterRead?.length || !!(field.fields && hasReadHooks(field.fields)) ||
      !!field.tabs?.some((tab) => hasReadHooks(tab.fields))
  })
}

function needsLegacyDefaults(data: Record<string, unknown>, fields: unknown[], selection?: Record<string, boolean>): boolean {
  return fields.some((value) => {
    const field = value as { name?: string; defaultValue?: unknown; fields?: unknown[]; tabs?: { name?: string; fields: unknown[] }[] }
    if (field.name && selection && !selection[field.name]) return false
    const stored = field.name ? data[field.name] : data
    if (field.name && stored === undefined && field.defaultValue !== undefined) return true
    const childData = stored && typeof stored === 'object' ? stored as Record<string, unknown> : {}
    return !!(field.fields && needsLegacyDefaults(childData, field.fields, field.name ? undefined : selection)) ||
      !!field.tabs?.some((tab) => needsLegacyDefaults(
        tab.name ? (data[tab.name] || {}) as Record<string, unknown> : data, tab.fields, tab.name ? undefined : selection))
  })
}

/** Complete, owned presentation/requirements DTO. Never use for writes or an
 * existing transaction: those require Payload's normal request-aware path.
 * Pokemon currently has no read hooks; fall back if future hooks are authored. */
export async function loadExplorePokemonReadModel(payload: Payload, userId: string): Promise<Pokemon[] | null> {
  const collection = payload.collections?.pokemon?.config
  const model = (payload.db as { collections?: Record<string, any> } | undefined)?.collections?.pokemon
  if (!/^[a-f0-9]{24}$/i.test(userId) || !model?.find || !collection ||
    collection.hooks?.beforeRead?.length || collection.hooks?.afterRead?.length ||
    collection.hooks?.afterOperation?.length || collection.hooks?.beforeOperation?.length ||
    hasReadHooks(collection.fields)) return null
  const rows = await model.find({
    user: userId,
    $or: [{ fusedIntoPokemonId: { $exists: false } }, { fusedIntoPokemonId: null }, { fusedIntoPokemonId: '' }],
  }).select(EXPLORE_POKEMON_SELECT).sort({ createdAt: -1 }).lean().exec()
  // Payload supplies newly authored defaults to older documents on read. Keep
  // its canonical behavior for those accounts instead of inventing defaults.
  if (rows.some((row: Record<string, unknown>) => needsLegacyDefaults(row, collection.fields, EXPLORE_POKEMON_SELECT))) return null
  return rows.map((row: Record<string, unknown>) => {
    const { _id, ...data } = row
    return { ...data, id: String(_id) } as unknown as Pokemon
  })
}
