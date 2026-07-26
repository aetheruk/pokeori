import { APP_VERSION } from '@/utilities/app-version'

export const CATALOG_MAX_PAGE_SIZE = 80
export const CATALOG_CACHE_CONTROL =
  'public, max-age=3600, s-maxage=2592000, stale-while-revalidate=86400'

export function parseCatalogPage(searchParams: URLSearchParams) {
  const requestedLimit = Number(searchParams.get('limit') || 40)
  const requestedCursor = Number(searchParams.get('cursor') || 0)
  return {
    limit: Number.isFinite(requestedLimit)
      ? Math.max(1, Math.min(CATALOG_MAX_PAGE_SIZE, Math.floor(requestedLimit)))
      : 40,
    offset:
      Number.isFinite(requestedCursor) && requestedCursor >= 0
        ? Math.floor(requestedCursor)
        : 0,
  }
}

export function catalogResponse<T>(
  items: T[],
  total: number,
  offset: number,
  limit: number,
) {
  const nextOffset = offset + items.length
  return Response.json(
    {
      version: APP_VERSION,
      items,
      total,
      nextCursor: nextOffset < total ? String(nextOffset) : null,
    },
    {
      headers: {
        'Cache-Control': CATALOG_CACHE_CONTROL,
      },
    },
  )
}
