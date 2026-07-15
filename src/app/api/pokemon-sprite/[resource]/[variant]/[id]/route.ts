import { NextRequest } from 'next/server'
import { getRemoteSpriteUrl } from '@/utilities/pokemon/sprite-proxy-server'

const CACHE_CONTROL =
  'public, max-age=86400, s-maxage=604800, stale-while-revalidate=2592000'

function stripExtension(id: string) {
  return id.replace(/\.[a-z0-9]+$/i, '')
}

export async function GET(
  request: NextRequest,
  context: {
    params: Promise<{ resource: string; variant: string; id: string }>
  },
) {
  const { resource, variant, id } = await context.params
  const searchParams = request.nextUrl.searchParams
  const params = new URLSearchParams({
    resource,
    variant,
    id: stripExtension(id),
  })

  if (resource === 'type' && variant === 'tera') {
    params.set('tera', '1')
  }

  if (searchParams.get('shiny') === '1') params.set('shiny', '1')
  if (searchParams.get('back') === '1') params.set('back', '1')

  const remoteUrl = getRemoteSpriteUrl(params)
  if (!remoteUrl) return new Response('Invalid sprite request', { status: 400 })

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
