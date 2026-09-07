import { items } from './all-items'
import { evolutionItems } from './entries/evolution'
import { megaStones } from './entries/mega-stones'
import { tmItems } from './entries/tms'
import itemSpriteManifest from '../item-sprite-manifest.json'

type ItemSpriteManifest = {
  items: Record<string, string>
  sprites: Record<string, string>
}

const manifest = itemSpriteManifest as ItemSpriteManifest
const evolutionItemIds = new Set(evolutionItems.map((item) => item.id))
const megaStoneItemIds = new Set(megaStones.map((item) => item.id))
const tmItemIds = new Set(tmItems.map((item) => item.id))
const evolutionSpriteIds = new Set(evolutionItems.map((item) => sanitizeSpriteId(item.spriteId || item.id)))
const megaStoneSpriteIds = new Set(megaStones.map((item) => sanitizeSpriteId(item.spriteId || item.id)))
const tmSpriteIds = new Set(tmItems.map((item) => sanitizeSpriteId(item.spriteId || item.id)))
const itemsById = new Map(items.map((item) => [item.id, item]))

// Helper to strip leading slash if present
function sanitizeSpriteId(id: string): string {
  return id.replace(/^\/+/, '')
}

function getExpectedItemSpritePath(itemId: string, targetId: string): string {
  const filename = targetId.includes('/') ? targetId.split('/').at(-1) || targetId : targetId
  const expectedFilename = filename.includes('.') ? filename : `${filename}.avif`

  if (itemId.startsWith('binder-') || itemId.startsWith('pack-')) {
    return `/sprites/items/tcg/${targetId.includes('.') ? targetId : `${targetId}.avif`}`
  }

  if (megaStoneItemIds.has(itemId) || megaStoneSpriteIds.has(targetId)) {
    return `/sprites/items/mega/${expectedFilename}`
  }

  if (
    tmItemIds.has(itemId) ||
    tmSpriteIds.has(targetId) ||
    itemId.startsWith('tm-') ||
    targetId.startsWith('tm-')
  ) {
    return `/sprites/items/tm/${expectedFilename}`
  }

  if (targetId.endsWith('-gem')) {
    return `/sprites/items/materials/${expectedFilename}`
  }

  if (evolutionItemIds.has(itemId) || evolutionSpriteIds.has(targetId)) {
    return `/sprites/items/evolution/${expectedFilename}`
  }

  return `/sprites/items/${targetId.includes('.') ? targetId : `${targetId}.avif`}`
}

export function getItemSpriteUrl(itemId: string): string {
  const item = itemsById.get(itemId)
  const targetId = sanitizeSpriteId(item?.spriteId || itemId)
  const expectedPath = getExpectedItemSpritePath(itemId, targetId)

  return (
    manifest.items[itemId] ||
    manifest.sprites[targetId] ||
    expectedPath
  )
}

export function getItemHueRotate(itemId: string): number | undefined {
  return itemsById.get(itemId)?.hueRotate
}
