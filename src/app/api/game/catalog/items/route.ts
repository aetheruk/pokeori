import { items } from '@/data/items'
import {
  catalogResponse,
  parseCatalogPage,
} from '@/utilities/catalog-response'

export const dynamic = 'force-dynamic'

export function GET(request: Request) {
  const searchParams = new URL(request.url).searchParams
  const ids = Array.from(
    new Set(
      (searchParams.get('ids') || '')
        .split(',')
        .map((id) => id.trim())
        .filter(Boolean),
    ),
  ).slice(0, 100)
  const { offset } = parseCatalogPage(searchParams)
  const limit = 100
  const requestedIds = new Set(ids)
  const matches = items.filter((item) => requestedIds.has(item.id))

  return catalogResponse(
    matches.slice(offset, offset + limit),
    matches.length,
    offset,
    limit,
  )
}
