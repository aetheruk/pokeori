import { describe, expect, test } from 'bun:test'
import {
  CATALOG_MAX_PAGE_SIZE,
  catalogResponse,
  parseCatalogPage,
} from '@/utilities/catalog-response'
import { APP_VERSION } from '@/utilities/app-version'

describe('public game catalog responses', () => {
  test('caps pages and rejects invalid cursors', () => {
    expect(
      parseCatalogPage(new URLSearchParams({ limit: '500', cursor: '-20' })),
    ).toEqual({ limit: CATALOG_MAX_PAGE_SIZE, offset: 0 })
  })

  test('returns versioned cursor metadata and public cache policy', async () => {
    const response = catalogResponse([{ id: 2 }], 3, 1, 1)
    expect(response.headers.get('cache-control')).toContain('s-maxage=2592000')
    expect(await response.json()).toMatchObject({
      version: APP_VERSION,
      items: [{ id: 2 }],
      total: 3,
      nextCursor: '2',
    })
  })
})
