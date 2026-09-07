import { writeFileSync } from 'node:fs'
import { items } from '../src/data/items/all-items'
import manifest from '../src/data/item-sprite-manifest.json'
import { getItemHueRotate, getItemSpriteUrl } from '../src/data/items/sprite-source'

const ids = new Set([
  ...Object.keys(manifest.items), ...Object.keys(manifest.sprites),
  ...items.flatMap((item) => [item.id, item.spriteId?.replace(/^\/+/, '') || item.id]),
])
const paths: Record<string, string[]> = {}
const hues: Record<string, number> = {}
for (const id of [...ids].sort()) {
  const path = getItemSpriteUrl(id)
  const pathIds = paths[path.replace('/sprites/items/', '')] ??= []
  pathIds.push(id)
  const hue = getItemHueRotate(id)
  if (hue !== undefined) hues[id] = hue
}
writeFileSync('src/data/item-sprite-index.json', `${JSON.stringify({ paths, hues })}\n`)
console.log(`Generated item sprite index for ${ids.size} IDs`)
