import { expect, test } from 'bun:test'
import { statSync } from 'node:fs'
import manifest from '../src/data/item-sprite-manifest.json'
import { items } from '../src/data/items/all-items'
import * as authored from '../src/data/items/sprite-source'
import * as compact from '../src/data/items/utils'

test('compact presentation index preserves every authored item and sprite alias', () => {
  const ids = new Set([...Object.keys(manifest.items), ...Object.keys(manifest.sprites),
    ...items.flatMap((item) => [item.id, item.spriteId?.replace(/^\/+/, '') || item.id]),
    'unknown-item', 'tm-unknown', 'unknown-gem', 'binder-unknown', 'pack-unknown'])
  for (const id of ids) {
    expect(compact.getItemSpriteUrl(id)).toBe(authored.getItemSpriteUrl(id))
    expect(compact.getItemHueRotate(id)).toBe(authored.getItemHueRotate(id))
  }
  expect(statSync('src/data/item-sprite-index.json').size).toBeLessThan(120_000)
})
