import type { PokemonTypeName } from '@/data/items'

const PLATE_TYPES: PokemonTypeName[] = [
  'fire',
  'water',
  'electric',
  'grass',
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
  'dark',
  'steel',
  'fairy',
]

const MEMORY_TYPES: PokemonTypeName[] = [
  'normal',
  ...PLATE_TYPES,
]

const DRIVE_FORM_IDS: Record<string, string> = {
  'burn-drive': '649-burn',
  'douse-drive': '649-douse',
  'shock-drive': '649-shock',
  'chill-drive': '649-chill',
}

const arceusFormIds = new Set(['493', ...PLATE_TYPES.map((type) => `493-${type}`)])
const silvallyFormIds = new Set(['773', ...PLATE_TYPES.map((type) => `773-${type}`)])
const genesectFormIds = new Set(['649', ...Object.values(DRIVE_FORM_IDS)])

function typeFromSuffixedItem(
  itemId: string | null | undefined,
  suffix: 'plate' | 'memory',
  validTypes: PokemonTypeName[],
): PokemonTypeName | null {
  if (!itemId) return null
  const match = itemId.match(/^([a-z-]+)-(?:plate|memory)$/)
  if (!match || !itemId.endsWith(`-${suffix}`)) return null
  const type = match[1] as PokemonTypeName
  return validTypes.includes(type) ? type : null
}

export function resolveHeldItemFormId({
  speciesId,
  currentFormId,
  nextHeldItemId,
}: {
  speciesId: number | null | undefined
  currentFormId: string | null | undefined
  nextHeldItemId: string | null | undefined
}): string {
  const formId = currentFormId || String(speciesId || '')

  if (speciesId === 493 || arceusFormIds.has(formId)) {
    const plateType = typeFromSuffixedItem(nextHeldItemId, 'plate', PLATE_TYPES)
    return plateType ? `493-${plateType}` : '493'
  }

  if (speciesId === 773 || silvallyFormIds.has(formId)) {
    const memoryType = typeFromSuffixedItem(nextHeldItemId, 'memory', MEMORY_TYPES)
    return memoryType && memoryType !== 'normal' ? `773-${memoryType}` : '773'
  }

  if (speciesId === 649 || genesectFormIds.has(formId)) {
    return nextHeldItemId && DRIVE_FORM_IDS[nextHeldItemId]
      ? DRIVE_FORM_IDS[nextHeldItemId]
      : '649'
  }

  return formId
}
