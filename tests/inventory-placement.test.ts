import { describe, expect, test } from 'bun:test'
import { items } from '@/data/items'
import {
  getInventoryDisplayPlacement,
  INVENTORY_GROUP_LABELS,
  INVENTORY_GROUP_ORDER,
  INVENTORY_SUBCATEGORY_ORDER,
  isCraftingMaterialItem,
} from '@/data/items/types'

function item(id: string) {
  const found = items.find((entry) => entry.id === id)
  expect(found, id).toBeTruthy()
  return found!
}

describe('inventory placement', () => {
  test('inventory top-level groups and labels match the current navigation', () => {
    expect(INVENTORY_GROUP_ORDER).toEqual([
      'encounter',
      'crafting',
      'tcg',
      'key-items',
      'tms',
      'training',
      'misc',
    ])
    expect(INVENTORY_GROUP_LABELS['key-items']).toBe('Key Items')
    expect(INVENTORY_SUBCATEGORY_ORDER.training).toEqual([
      'candies',
      'berries',
      'evolution-items',
      'vitamins',
      'ability-patches',
    ])
    expect(INVENTORY_SUBCATEGORY_ORDER['key-items']).toEqual([
      'key-items',
      'badges',
      'books',
    ])
    expect(INVENTORY_SUBCATEGORY_ORDER.tms).toEqual(['tms'])
    expect(INVENTORY_SUBCATEGORY_ORDER.misc).toEqual(['scratch-cards', 'other'])
  })

  test('crafting materials and gems use the materials pocket', () => {
    const craftingMaterials = items.filter(isCraftingMaterialItem)
    expect(craftingMaterials.length).toBeGreaterThan(0)

    for (const definition of craftingMaterials) {
      expect(isCraftingMaterialItem(definition)).toBe(true)
      expect(getInventoryDisplayPlacement(definition)).toEqual({
        group: 'crafting',
        subCategory: 'materials',
      })
      if (definition.id.startsWith('nut-')) {
        expect(definition.sellValue).toBeUndefined()
      } else {
        expect(definition.sellValue).toBe(10)
      }
    }
  })

  test('dye nuts are crafting materials without sell value', () => {
    for (const itemId of [
      'nut-red',
      'nut-purple',
      'nut-green',
      'nut-blue',
      'nut-yellow',
      'nut-white',
      'nut-black',
    ]) {
      const definition = item(itemId)
      expect(definition.sellValue).toBeUndefined()
      expect(getInventoryDisplayPlacement(definition)).toEqual({
        group: 'crafting',
        subCategory: 'materials',
      })
    }
  })

  test('tiered crafting materials use base, plus and ex display names', () => {
    expect(item('soft-fluff-t1').name).toBe('Soft Fluff')
    expect(item('soft-fluff-t2').name).toBe('Soft Fluff+')
    expect(item('soft-fluff-t3').name).toBe('Soft Fluff EX')
    expect(item('mind-thread-t1').name).toBe('Rune Stone')
    expect(item('mind-thread-t2').name).toBe('Rune Stone+')
    expect(item('mind-thread-t3').name).toBe('Rune Stone EX')
    expect(item('terra-dust-t1').name).toBe('Soft Clay')
    expect(item('terra-dust-t2').name).toBe('Soft Clay+')
    expect(item('terra-dust-t3').name).toBe('Soft Clay EX')
    expect(item('spirit-wisp-t1').name).toBe('Ectoplasm')
    expect(item('spirit-wisp-t2').name).toBe('Ectoplasm+')
    expect(item('spirit-wisp-t3').name).toBe('Ectoplasm EX')
    expect(item('shadow-fiber-t1').name).toBe('Shadow Cloth')
    expect(item('shadow-fiber-t2').name).toBe('Shadow Cloth+')
    expect(item('shadow-fiber-t3').name).toBe('Shadow Cloth EX')
    expect(item('pixie-powder-t1').name).toBe('Fairy Charm')
    expect(item('pixie-powder-t2').name).toBe('Fairy Charm+')
    expect(item('pixie-powder-t3').name).toBe('Fairy Charm EX')
    expect(item('broken-ball-t1').name).toBe('Broken Ball')
    expect(item('broken-ball-t2').name).toBe('Broken Ball+')
    expect(item('broken-ball-t3').name).toBe('Broken Ball EX')
  })

  test('poke powder uses the materials pocket', () => {
    expect(item('poke-powder-xs').name).toBe('XS PokePowder')
    expect(getInventoryDisplayPlacement(item('poke-powder-xs'))).toEqual({
      group: 'crafting',
      subCategory: 'materials',
    })
  })

  test('field tms display in the dedicated tms pocket', () => {
    for (const itemId of [
      'tm-cut',
      'tm-fly',
      'tm-surf',
      'tm-strength',
      'tm-flash',
    ]) {
      expect(getInventoryDisplayPlacement(item(itemId))).toEqual({
        group: 'tms',
        subCategory: 'tms',
      })
    }

    expect(item('captains-credit').category).toBe('key')
    expect(getInventoryDisplayPlacement(item('captains-credit'))).toEqual({
      group: 'key-items',
      subCategory: 'key-items',
    })
  })

  test('candies, berries, and evolution items display under training', () => {
    expect(getInventoryDisplayPlacement(item('rare-candy-s'))).toEqual({
      group: 'training',
      subCategory: 'candies',
    })
    expect(getInventoryDisplayPlacement(item('oran-berry'))).toEqual({
      group: 'training',
      subCategory: 'berries',
    })
    expect(getInventoryDisplayPlacement(item('moon-stone'))).toEqual({
      group: 'training',
      subCategory: 'evolution-items',
    })
  })

  test('books display under key items', () => {
    expect(getInventoryDisplayPlacement(item('manics-journal-pg-322'))).toEqual(
      {
        group: 'key-items',
        subCategory: 'books',
      },
    )
  })

  test('badges display under key items', () => {
    expect(getInventoryDisplayPlacement(item('badge-kanto-boulder'))).toEqual({
      group: 'key-items',
      subCategory: 'badges',
    })
  })

  test('legendary beast trace items display as non-sellable key items', () => {
    for (const itemId of [
      'token-of-fire',
      'token-of-thunder',
      'token-of-water',
      'mark-of-fire',
      'mark-of-thunder',
      'mark-of-water',
      'proof-of-fire',
      'proof-of-thunder',
      'proof-of-water',
      'rainbow-feather',
      'silver-feather',
      'clear-bell',
      'flaming-branch',
      'charged-branch',
      'frozen-branch',
      'flaming-bough',
      'charged-bough',
      'frozen-bough',
      'flaming-twig',
      'charged-twig',
      'frozen-twig',
      'lifeless-flaming-branch',
      'lifeless-charged-branch',
      'lifeless-frozen-branch',
      'concentrated-flaming-branch',
      'concentrated-charged-branch',
      'concentrated-frozen-branch',
    ]) {
      const definition = item(itemId)
      expect(definition.category).toBe('key')
      expect(definition.sellValue).toBeUndefined()
      expect(getInventoryDisplayPlacement(definition)).toEqual({
        group: 'key-items',
        subCategory: 'key-items',
      })
    }
  })

  test('dedicated valuables pocket is not used for sellable valuables', () => {
    expect(getInventoryDisplayPlacement(item('nugget'))).toEqual({
      group: 'misc',
      subCategory: 'other',
    })
  })
})
