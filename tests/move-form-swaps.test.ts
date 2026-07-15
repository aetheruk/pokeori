import { describe, expect, test } from 'bun:test'
import { resolveAssignedMoveFormId } from '@/utilities/pokemon/move-form-swaps'

describe('assigned move form swaps', () => {
  test('Sacred Sword switches Keldeo to Resolute Form', () => {
    expect(
      resolveAssignedMoveFormId({
        speciesId: 647,
        currentFormId: '647',
        assignedMoves: ['sacred-sword'],
      }),
    ).toBe('10024')
    expect(
      resolveAssignedMoveFormId({
        speciesId: 647,
        currentFormId: '647',
        assignedMoves: [{ moveId: 'water-gun' }, { moveId: 'sacred-sword' }],
      }),
    ).toBe('10024')
  })

  test('removing Sacred Sword returns Keldeo to base form', () => {
    expect(
      resolveAssignedMoveFormId({
        speciesId: 647,
        currentFormId: '10024',
        assignedMoves: ['secret-sword'],
      }),
    ).toBe('647')
    expect(
      resolveAssignedMoveFormId({
        speciesId: 647,
        currentFormId: '10024',
        assignedMoves: [],
      }),
    ).toBe('647')
  })

  test('Sacred Sword does not change unrelated Pokemon', () => {
    expect(
      resolveAssignedMoveFormId({
        speciesId: 475,
        currentFormId: '475',
        assignedMoves: ['sacred-sword'],
      }),
    ).toBe('475')
  })

  test('Relic Song switches Meloetta to Pirouette Form', () => {
    expect(
      resolveAssignedMoveFormId({
        speciesId: 648,
        currentFormId: '648',
        assignedMoves: ['relic-song'],
      }),
    ).toBe('10018')
    expect(
      resolveAssignedMoveFormId({
        speciesId: 648,
        currentFormId: '648',
        assignedMoves: [{ moveId: 'relic-song' }],
      }),
    ).toBe('10018')
  })

  test('removing Relic Song returns Meloetta to base form', () => {
    expect(
      resolveAssignedMoveFormId({
        speciesId: 648,
        currentFormId: '10018',
        assignedMoves: ['quick-attack'],
      }),
    ).toBe('648')
    expect(
      resolveAssignedMoveFormId({
        speciesId: 648,
        currentFormId: '10018',
        assignedMoves: [],
      }),
    ).toBe('648')
  })
})
