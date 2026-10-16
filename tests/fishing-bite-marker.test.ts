import { expect, test } from 'bun:test'
import { getFishingBiteMarker } from '../src/utilities/fishing/bite-marker'
import type { FishingPokemonEntry } from '../src/data/games/fishing/types'

const entry: FishingPokemonEntry = {
  speciesId: 129, weight: 1, reactionTime: 900,
  appearTime: { min: 2000, max: 5000 }, symbol: 'ignored',
}

test('universal bite markers reflect the rolled result, with Alpha then rarity priority', () => {
  expect(getFishingBiteMarker({ type: 'pokemon', entry })).toBe('!')
  expect(getFishingBiteMarker({ type: 'pokemon', entry: { ...entry, fromKeepNet: true } })).toBe('?!')
  for (const rarity of ['shiny', 'shadow', 'gold'] as const) {
    expect(getFishingBiteMarker({ type: 'pokemon', entry: { ...entry, fromKeepNet: true }, rarity })).toBe('variant')
  }
  expect(getFishingBiteMarker({ type: 'pokemon', entry, isAlpha: true, rarity: 'shiny' })).toBe('alpha')
  expect(getFishingBiteMarker({ type: 'item', entry })).toBe('!!')
  expect(getFishingBiteMarker({ type: 'item', entry: { ...entry, dropTable: 'common' } })).toBe('!!')
  expect(getFishingBiteMarker({ type: 'item', entry: { ...entry, dropTable: 'rare' } })).toBe('!!!')
})
