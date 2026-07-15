import { afterEach, describe, expect, mock, test } from 'bun:test'
import { NextRequest } from 'next/server'
import { GET as getSpriteByQuery } from '@/app/api/pokemon-sprite/route'
import { GET as getSpriteByPath } from '@/app/api/pokemon-sprite/[resource]/[variant]/[id]/route'

const POKEAPI_SPRITES_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites'

const originalFetch = global.fetch

function mockSuccessfulFetch() {
  const fetchMock = mock(async (_url: RequestInfo | URL) => {
    return new Response('sprite-bytes', {
      status: 200,
      headers: {
        'Content-Type': 'image/png',
      },
    })
  })

  global.fetch = fetchMock as unknown as typeof fetch
  return fetchMock
}

async function requestSprite({
  variant,
  id = '25.png',
  shiny = false,
  back = false,
}: {
  variant: string
  id?: string
  shiny?: boolean
  back?: boolean
}) {
  const params = new URLSearchParams()
  if (shiny) params.set('shiny', '1')
  if (back) params.set('back', '1')

  const query = params.toString()
  return getSpriteByPath(
    new NextRequest(
      `http://localhost/api/pokemon-sprite/pokemon/${variant}/${id}${query ? `?${query}` : ''}`,
    ),
    {
      params: Promise.resolve({
        resource: 'pokemon',
        variant,
        id,
      }),
    },
  )
}

describe('pokemon sprite proxy route', () => {
  afterEach(() => {
    global.fetch = originalFetch
  })

  test.each([
    {
      label: 'home shiny',
      variant: 'home',
      shiny: true,
      expected: `${POKEAPI_SPRITES_BASE}/pokemon/other/home/shiny/25.png`,
    },
    {
      label: 'home normal',
      variant: 'home',
      expected: `${POKEAPI_SPRITES_BASE}/pokemon/other/home/25.png`,
    },
    {
      label: 'default shiny',
      variant: 'default',
      shiny: true,
      expected: `${POKEAPI_SPRITES_BASE}/pokemon/shiny/25.png`,
    },
    {
      label: 'showdown front shiny',
      variant: 'showdown',
      shiny: true,
      expected: `${POKEAPI_SPRITES_BASE}/pokemon/other/showdown/shiny/25.gif`,
    },
    {
      label: 'showdown back normal',
      variant: 'showdown',
      back: true,
      expected: `${POKEAPI_SPRITES_BASE}/pokemon/other/showdown/back/25.gif`,
    },
    {
      label: 'showdown back shiny',
      variant: 'showdown',
      shiny: true,
      back: true,
      expected: `${POKEAPI_SPRITES_BASE}/pokemon/other/showdown/back/shiny/25.gif`,
    },
  ])('fetches the correct upstream URL for $label', async ({ variant, shiny, back, expected }) => {
    const fetchMock = mockSuccessfulFetch()

    const response = await requestSprite({ variant, shiny, back })

    expect(response.status).toBe(200)
    expect(response.headers.get('Content-Type')).toBe('image/png')
    expect(fetchMock).toHaveBeenCalledTimes(1)
    const fetchCalls = fetchMock.mock.calls as Array<[RequestInfo | URL]>
    expect(fetchCalls[0]?.[0]).toBe(expected)
  })

  test('returns a 404 response when the upstream sprite is missing', async () => {
    global.fetch = mock(async () => {
      return new Response('not found', { status: 404 })
    }) as unknown as typeof fetch

    const response = await requestSprite({ variant: 'home', shiny: true })

    expect(response.status).toBe(404)
    expect(await response.text()).toBe('Sprite not found')
  })

  test('does not proxy item sprites at runtime', async () => {
    const fetchMock = mock(async () => new Response('sprite-bytes', { status: 200 }))
    global.fetch = fetchMock as unknown as typeof fetch

    const response = await getSpriteByQuery(
      new NextRequest('http://localhost/api/pokemon-sprite?resource=item&id=potion'),
    )

    expect(response.status).toBe(400)
    expect(await response.text()).toBe('Invalid sprite request')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  test('does not proxy type icons at runtime', async () => {
    const fetchMock = mock(async () => new Response('sprite-bytes', { status: 200 }))
    global.fetch = fetchMock as unknown as typeof fetch

    const response = await getSpriteByQuery(
      new NextRequest('http://localhost/api/pokemon-sprite?resource=type&id=10'),
    )

    expect(response.status).toBe(400)
    expect(await response.text()).toBe('Invalid sprite request')
    expect(fetchMock).not.toHaveBeenCalled()
  })
})
