import { expect, test } from 'bun:test'
import { items } from '@/data/items'
import { getInventoryDisplayPlacement } from '@/data/items/types'

test('Ball Bag uses the material pouch sprite and exact independent bonus odds', () => {
  const bag = items.find((item) => item.id === 'ball-bag')!
  expect(bag.spriteId).toBe(items.find((item) => item.id === 'pouch-of-materials')!.spriteId)
  expect(getInventoryDisplayPlacement(bag)).toEqual(getInventoryDisplayPlacement(items.find((item) => item.id === 'pouch-of-materials')!))
  expect(bag.effects?.openRewards).toEqual([
    { type: 'item', targetId: 'poke-ball', quantity: { min: 1, max: 3 }, dropChance: 100 },
    { type: 'item', targetId: 'great-ball', quantity: 1, dropChance: 15 },
    { type: 'item', targetId: 'ultra-ball', quantity: 1, dropChance: 2 },
    { type: 'item', targetId: 'master-ball', quantity: 1, dropChance: 100 / 1_000_000 },
  ])
})

test('opening a bag grants actual rewards atomically and retries do not reroll', () => {
  const result = Bun.spawnSync({ cmd: ['bun', 'tests/fixtures/ball-bag.ts'], cwd: process.cwd(), stdout: 'pipe', stderr: 'pipe' })
  expect(result.stdout.toString() + result.stderr.toString()).toContain('Ball bag opening passed')
  expect(result.exitCode).toBe(0)
})
