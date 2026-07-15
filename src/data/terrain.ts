export const TERRAIN_TYPES = [
  'electric',
  'grassy',
  'misty',
  'psychic',
] as const

export type TerrainType = (typeof TERRAIN_TYPES)[number]

export const TERRAIN_LABELS: Record<TerrainType, string> = {
  electric: 'Electric Terrain',
  grassy: 'Grassy Terrain',
  misty: 'Misty Terrain',
  psychic: 'Psychic Terrain',
}

export function isTerrainType(value: unknown): value is TerrainType {
  return typeof value === 'string' && TERRAIN_TYPES.includes(value as TerrainType)
}
