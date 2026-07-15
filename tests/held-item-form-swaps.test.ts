import { describe, expect, test } from 'bun:test'
import { resolveHeldItemFormId } from '@/utilities/pokemon/held-item-form-swaps'

describe('held item form swaps', () => {
  test('plates drive Arceus forms and removal returns to base', () => {
    expect(
      resolveHeldItemFormId({
        speciesId: 493,
        currentFormId: '493',
        nextHeldItemId: 'fire-plate',
      }),
    ).toBe('493-fire')
    expect(
      resolveHeldItemFormId({
        speciesId: 493,
        currentFormId: '493-fire',
        nextHeldItemId: 'water-plate',
      }),
    ).toBe('493-water')
    expect(
      resolveHeldItemFormId({
        speciesId: 493,
        currentFormId: '493-water',
        nextHeldItemId: 'normal-plate',
      }),
    ).toBe('493')
    expect(
      resolveHeldItemFormId({
        speciesId: 493,
        currentFormId: '493-water',
        nextHeldItemId: null,
      }),
    ).toBe('493')
  })

  test('memories drive Silvally forms and Normal Memory returns to base', () => {
    expect(
      resolveHeldItemFormId({
        speciesId: 773,
        currentFormId: '773',
        nextHeldItemId: 'water-memory',
      }),
    ).toBe('773-water')
    expect(
      resolveHeldItemFormId({
        speciesId: 773,
        currentFormId: '773-water',
        nextHeldItemId: 'normal-memory',
      }),
    ).toBe('773')
    expect(
      resolveHeldItemFormId({
        speciesId: 773,
        currentFormId: '773-fire',
        nextHeldItemId: 'leftovers',
      }),
    ).toBe('773')
  })

  test('drives drive Genesect forms and removal returns to base', () => {
    expect(
      resolveHeldItemFormId({
        speciesId: 649,
        currentFormId: '649',
        nextHeldItemId: 'shock-drive',
      }),
    ).toBe('649-shock')
    expect(
      resolveHeldItemFormId({
        speciesId: 649,
        currentFormId: '649-shock',
        nextHeldItemId: 'burn-drive',
      }),
    ).toBe('649-burn')
    expect(
      resolveHeldItemFormId({
        speciesId: 649,
        currentFormId: '649-burn',
        nextHeldItemId: null,
      }),
    ).toBe('649')
  })

  test('form-driving items do not change unrelated Pokemon', () => {
    expect(
      resolveHeldItemFormId({
        speciesId: 6,
        currentFormId: '6',
        nextHeldItemId: 'fire-plate',
      }),
    ).toBe('6')
  })
})
