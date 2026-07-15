import { describe, expect, test } from 'bun:test'
import { existsSync, readdirSync, statSync } from 'node:fs'
import { join } from 'node:path'
import { currencies } from '@/data/currencies'
import itemSpriteManifest from '@/data/item-sprite-manifest.json'
import { candyItems } from '@/data/items/entries/candies'
import { getItemSpriteUrl, items } from '@/data/items'

const repoRoot = process.cwd()
const missingItemSpriteEntries = itemSpriteManifest.missing as Array<{
  itemId: string
}>

function publicPathExists(publicPath: string) {
  return existsSync(join(repoRoot, 'public', publicPath.replace(/^\//, '')))
}

function walkFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const path = join(dir, entry)
    const stats = statSync(path)
    if (stats.isDirectory()) return walkFiles(path)
    return stats.isFile() ? [path] : []
  })
}

describe('local item sprites', () => {
  test('resolves bundled custom item sprites from the item sprite folder', () => {
    expect(getItemSpriteUrl('poke-ball')).toBe(
      '/sprites/items/balls/poke-ball.avif',
    )
    expect(getItemSpriteUrl('quality-forest-photo')).toBe(
      '/sprites/items/forest-photo.avif',
    )
    expect(getItemSpriteUrl('health-feather')).toBe(
      '/sprites/items/health-feather.avif',
    )
    expect(getItemSpriteUrl('zap-n-scratch')).toBe(
      '/sprites/items/scratchcard.avif',
    )
    expect(getItemSpriteUrl('moon-scratch')).toBe(
      '/sprites/items/scratchcard.avif',
    )
    expect(getItemSpriteUrl('card-crystalizer')).toBe(
      '/sprites/items/crystalizer.avif',
    )
    expect(getItemSpriteUrl('hiker-boots')).toBe(
      '/sprites/items/hiker-boots.avif',
    )
    expect(getItemSpriteUrl('hiker-clothes')).toBe(
      '/sprites/items/hiker-clothes.avif',
    )
    expect(getItemSpriteUrl('hiker-gloves')).toBe(
      '/sprites/items/hiker-gloves.avif',
    )
    expect(getItemSpriteUrl('green-berry-candy')).toBe(
      '/sprites/items/green-berry-candy.avif',
    )
    expect(getItemSpriteUrl('rubber-mallet')).toBe(
      '/sprites/items/rubber-mallet.avif',
    )
    expect(getItemSpriteUrl('teal-mask')).toBe('/sprites/items/teal-mask.avif')
    expect(getItemSpriteUrl('wellspring-mask')).toBe(
      '/sprites/items/wellspring-mask.avif',
    )
    expect(getItemSpriteUrl('hearthflame-mask')).toBe(
      '/sprites/items/hearthflame-mask.avif',
    )
    expect(getItemSpriteUrl('cornerstone-mask')).toBe(
      '/sprites/items/cornerstone-mask.avif',
    )
    expect(getItemSpriteUrl('reveal-glass')).toBe(
      '/sprites/items/reveal-glass.avif',
    )
    expect(getItemSpriteUrl('gracidea')).toBe('/sprites/items/gracidea.avif')
    expect(getItemSpriteUrl('prison-bottle')).toBe(
      '/sprites/items/key/prison-bottle.avif',
    )
    expect(getItemSpriteUrl('meteorite')).toBe('/sprites/items/meteor.avif')
    expect(getItemSpriteUrl('dna-splicers')).toBe(
      '/sprites/items/dna-splicers.avif',
    )
    expect(getItemSpriteUrl('n-solarizer')).toBe(
      '/sprites/items/n-solarizer.avif',
    )
    expect(getItemSpriteUrl('n-lunarizer')).toBe(
      '/sprites/items/n-lunarizer.avif',
    )
    expect(getItemSpriteUrl('reins-of-unity')).toBe(
      '/sprites/items/reins-of-unity.avif',
    )
    expect(getItemSpriteUrl('book-of-channeling')).toBe(
      '/sprites/items/guide-book.avif',
    )
    expect(getItemSpriteUrl('dev-channeling-memento')).toBe(
      '/sprites/items/guide-book.avif',
    )
    expect(getItemSpriteUrl('incense-memory')).toBe(
      '/sprites/items/key/incense-memory.avif',
    )
    expect(getItemSpriteUrl('incense-dev')).toBe(
      '/sprites/items/key/incense-dev.avif',
    )
  })

  test('resolves bundled PokeAPI item sprites without using the sprite proxy', () => {
    expect(getItemSpriteUrl('potion')).toBe('/sprites/items/potion.avif')
    expect(getItemSpriteUrl('rare-candy-s')).toBe(
      '/sprites/items/materials/candy-xs.avif',
    )
    expect(getItemSpriteUrl('thunder-stone')).toBe(
      '/sprites/items/evolution/thunder-stone.avif',
    )
    expect(getItemSpriteUrl('abomasite')).toBe(
      '/sprites/items/mega/abomasite.avif',
    )
    expect(getItemSpriteUrl('tm-dig')).toBe('/sprites/items/tm/tm-ground.avif')
    expect(getItemSpriteUrl('tm-fly')).toBe('/sprites/items/tm/tm-flying.avif')
    expect(getItemSpriteUrl('water-gem')).toBe(
      '/sprites/items/materials/water-gem.avif',
    )
    expect(getItemSpriteUrl('nut-red')).toBe(
      '/sprites/items/materials/nut-red.avif',
    )
    expect(getItemSpriteUrl('dried-red')).toBe(
      '/sprites/items/materials/dried-red.avif',
    )
    expect(getItemSpriteUrl('spelon-berry')).toBe(
      '/sprites/items/berries/spelon.avif',
    )
  })

  test('level-up candies use the XS to XL visual tier ladder', () => {
    expect(candyItems.map((item) => item.name)).toEqual([
      'XS Candy',
      'XS Candy EX',
      'S Candy',
      'S Candy EX',
      'M Candy',
      'M Candy EX',
      'L Candy',
      'L Candy EX',
      'XL Candy',
      'XL Candy EX',
    ])

    expect(candyItems.map((item) => item.spriteId)).toEqual([
      'materials/candy-xs',
      'materials/candy-xs',
      'materials/candy-s',
      'materials/candy-s',
      'materials/candy-m',
      'materials/candy-m',
      'materials/candy-l',
      'materials/candy-l',
      'materials/candy-xl',
      'materials/candy-xl',
    ])
    expect(
      candyItems
        .filter((_, index) => index % 2 === 1)
        .every((item) => item.hueRotate === 80),
    ).toBe(true)
  })

  test('missing evolution and mega sprites resolve to their grouped folders', () => {
    expect(getItemSpriteUrl('galarica-cuff')).toBe(
      '/sprites/items/evolution/galarica-cuff.avif',
    )
    expect(getItemSpriteUrl('barbaraclite')).toBe(
      '/sprites/items/mega/barbaraclite.avif',
    )
  })

  test('currency-only icon ids resolve from bundled item sprites', () => {
    const currencyIconIds = currencies.map((currency) => currency.iconId)

    expect(getItemSpriteUrl('relic-gold')).toBe(
      '/sprites/items/relic-gold.avif',
    )
    expect(getItemSpriteUrl('revive')).toBe('/sprites/items/revive.avif')
    expect(
      currencyIconIds.every((iconId) =>
        publicPathExists(getItemSpriteUrl(iconId)),
      ),
    ).toBe(true)
  })

  test('TCG binder and booster pack item sprites resolve to bundled generated sprites', () => {
    expect(getItemSpriteUrl('binder-base1')).toBe(
      '/sprites/items/tcg/binder-base1.avif',
    )
    expect(getItemSpriteUrl('pack-base1')).toBe(
      '/sprites/items/tcg/pack-base1.avif',
    )
    expect(publicPathExists(getItemSpriteUrl('binder-base1'))).toBe(true)
    expect(publicPathExists(getItemSpriteUrl('pack-base1'))).toBe(true)
  })

  test('all manifest item paths exist in public sprites', () => {
    const missingFiles = Object.entries(itemSpriteManifest.items)
      .filter(([, spritePath]) => !publicPathExists(spritePath))
      .map(([itemId, spritePath]) => `${itemId}: ${spritePath}`)

    expect(missingFiles).toEqual([])
  })

  test('all manifest sprite paths exist in public sprites', () => {
    const missingFiles = Object.entries(itemSpriteManifest.sprites)
      .filter(([, spritePath]) => !publicPathExists(spritePath))
      .map(([spriteId, spritePath]) => `${spriteId}: ${spritePath}`)

    expect(missingFiles).toEqual([])
  })

  test('missing sprite report only contains authored items', () => {
    const itemIds = new Set(items.map((item) => item.id))
    const invalidMissingEntries = missingItemSpriteEntries.filter(
      (entry) => !itemIds.has(entry.itemId),
    )

    expect(invalidMissingEntries).toEqual([])
  })

  test('public sprite assets do not use PNG files', () => {
    const pngSprites = walkFiles(join(repoRoot, 'public', 'sprites'))
      .filter((file) => file.endsWith('.png'))
      .map((file) => file.replace(repoRoot, ''))

    expect(pngSprites).toEqual([])
  })
})
