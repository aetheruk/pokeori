import { describe, expect, test } from 'bun:test'
import { tcgSetSummaries } from '@/data/tcg/summaries'
import { getTcgCatalogPage } from '@/utilities/tcg/catalog'
import {
  getNextAutocompleteIndex,
  getTcgCardAccessibleLabel,
} from '@/utilities/tcg/presentation'

describe('TCG catalog ownership totals', () => {
  test('owned totals describe the complete result set, not the loaded cursor page', async () => {
    const setId = tcgSetSummaries[0].id
    const sample = await getTcgCatalogPage({ setIds: [setId], limit: 2 })
    expect(sample.items.length).toBe(2)

    const ownedCardIds = sample.items.map(({ card }) => card.id)
    const firstPage = await getTcgCatalogPage({
      setIds: [setId],
      ownedCardIds,
      offset: 0,
      limit: 1,
    })
    const secondPage = await getTcgCatalogPage({
      setIds: [setId],
      ownedCardIds,
      offset: 1,
      limit: 1,
    })

    expect(firstPage.ownedTotal).toBe(2)
    expect(secondPage.ownedTotal).toBe(2)
    expect(firstPage.total).toBe(secondPage.total)
  })
})

describe('Carddex discovery and keyboard presentation', () => {
  test('conceals uncollected card identity from accessible labels', () => {
    expect(
      getTcgCardAccessibleLabel({
        isOwned: false,
        name: 'Hidden Pokémon',
        number: '007',
        slot: 9,
      }),
    ).toBe('Uncollected card, slot 9')
    expect(
      getTcgCardAccessibleLabel({
        isOwned: true,
        name: 'Pikachu',
        number: '58',
        slot: 9,
      }),
    ).toBe('View Pikachu card 58')
  })

  test('wraps autocomplete arrow navigation in both directions', () => {
    expect(
      getNextAutocompleteIndex({ current: -1, direction: 1, count: 3 }),
    ).toBe(0)
    expect(
      getNextAutocompleteIndex({ current: 0, direction: -1, count: 3 }),
    ).toBe(2)
    expect(
      getNextAutocompleteIndex({ current: 2, direction: 1, count: 3 }),
    ).toBe(0)
  })
})
