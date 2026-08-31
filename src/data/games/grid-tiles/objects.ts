import type { GridObjectLibrary } from './types'

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
} satisfies GridObjectLibrary
