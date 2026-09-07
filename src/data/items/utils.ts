import spriteIndex from '../item-sprite-index.json'

// Presentation must not import the authored move/ability/item mechanics graph.
const paths = new Map<string, string>()
for (const [path, ids] of Object.entries(spriteIndex.paths)) {
  for (const id of ids) paths.set(id, `/sprites/items/${path}`)
}
const hues = spriteIndex.hues as Record<string, number>

export function getItemSpriteUrl(itemId: string): string {
  const known = paths.get(itemId)
  if (known) return known
  const target = itemId.replace(/^\/+/, '')
  const alias = paths.get(target)
  if (alias) return alias
  const filename = target.split('/').at(-1) || target
  const file = filename.includes('.') ? filename : `${filename}.avif`
  if (itemId.startsWith('binder-') || itemId.startsWith('pack-')) {
    return `/sprites/items/tcg/${target.includes('.') ? target : `${target}.avif`}`
  }
  if (target.startsWith('tm-')) return `/sprites/items/tm/${file}`
  if (target.endsWith('-gem')) return `/sprites/items/materials/${file}`
  return `/sprites/items/${target.includes('.') ? target : `${target}.avif`}`
}

export function getItemHueRotate(itemId: string): number | undefined {
  return Object.hasOwn(hues, itemId) ? hues[itemId] : undefined
}
