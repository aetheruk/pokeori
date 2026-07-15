import { NextRequest } from 'next/server'
import { getRemoteSpriteUrl } from '@/utilities/pokemon/sprite-proxy-server'

function badRequest(message: string) {
  return new Response(message, { status: 400 })
}

const CACHE_CONTROL =
  'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000'

export async function GET(request: NextRequest) {
  const remoteUrl = getRemoteSpriteUrl(request.nextUrl.searchParams)

  if (!remoteUrl) return badRequest('Invalid sprite request')

  const upstream = await fetch(remoteUrl, {
    next: { revalidate: 60 * 60 * 24 * 7 },
  })

  if (!upstream.ok) {
    return new Response('Sprite not found', {
      status: upstream.status === 404 ? 404 : 502,
      headers: {
        'Cache-Control': 'public, max-age=300, s-maxage=300',
      },
    })
  }

  return new Response(upstream.body, {
    status: upstream.status,
    headers: {
      'Cache-Control': CACHE_CONTROL,
      'Content-Type': upstream.headers.get('Content-Type') || 'image/png',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
