import type { GridObjectDefinition, GridObjectLibrary } from './types'

/**
 * Shared gameplay entities. Keep them independent of terrain sets so the same
 * object can be placed in multiple maps; variant rules decide how it resolves.
 */
export const gridObjects = {
  voltorb: {
    id: 'voltorb',
    name: 'Voltorb',
    purpose: 'hazard',
    size: { cols: 1, rows: 1 },
    asset: { src: '/sprites/pokemon/gen-v/front/normal/100.avif' },
    collision: 'pushable',
  },
  breakableRock: {
    id: 'breakable-rock',
    name: 'Breakable Rock',
    purpose: 'destructible',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/rockpush/breakable-rock.png' },
    collision: 'solid',
  },
  pushableBoulder: {
    id: 'pushable-boulder',
    name: 'Pushable Boulder',
    purpose: 'pushable',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/rockpush/boulder.avif' },
    collision: 'pushable',
  },
  battleTrigger: {
    id: 'battle-trigger',
    name: 'Battle Trigger',
    purpose: 'battle-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/games/rockpush/trainer.avif' },
    collision: 'none',
    interaction: 'battle',
  },
  encounterTrigger: {
    id: 'encounter-trigger',
    name: 'Encounter Trigger',
    purpose: 'encounter-trigger',
    size: { cols: 1, rows: 1 },
    asset: { src: '/sprites/pokemon/gen-v/front/normal/666-poke-ball.avif' },
    collision: 'none',
    interaction: 'encounter',
  },
} satisfies GridObjectLibrary

/**
 * Resolve a shared object by its stable authored id.
 *
 * Libraries are often authored with ergonomic property names (for example
 * `battleTrigger`) while map placements use the serialized `id`
 * (`battle-trigger`). Looking up by both keeps the registry pleasant to use
 * in code without making placement ids depend on object property names.
 */
export function getGridObjectDefinition(
  library: GridObjectLibrary,
  objectId: string,
): GridObjectDefinition | undefined {
  return (
    library[objectId] ||
    Object.values(library).find((object) => object.id === objectId)
  )
}
