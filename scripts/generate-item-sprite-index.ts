import { writeFileSync } from 'node:fs'
import { items } from '../src/data/items/all-items'
import manifest from '../src/data/item-sprite-manifest.json'
import { getItemHueRotate, getItemSpriteFilter, getItemSpriteUrl } from '../src/data/items/sprite-source'

const ids = new Set([
  ...Object.keys(manifest.items), ...Object.keys(manifest.sprites),
  ...items.flatMap((item) => [item.id, item.spriteId?.replace(/^\/+/, '') || item.id]),
])
const paths: Record<string, string[]> = {}
const hues: Record<string, number> = {}
const filters: Record<string, string> = {}
for (const id of [...ids].sort()) {
  const path = getItemSpriteUrl(id)
  const pathIds = paths[path.replace('/sprites/items/', '')] ??= []
  pathIds.push(id)
  const hue = getItemHueRotate(id)
  if (hue !== undefined) hues[id] = hue
  const filter = getItemSpriteFilter(id)
  if (filter) filters[id] = filter
}
writeFileSync('src/data/item-sprite-index.json', `${JSON.stringify({ paths, hues, filters })}\n`)
console.log(`Generated item sprite index for ${ids.size} IDs`)
