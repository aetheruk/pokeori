import { describe, expect, test } from 'bun:test'
import { createHash } from 'node:crypto'
import { mkdtemp, mkdir, rm, writeFile } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import path from 'node:path'
import { runInNewContext } from 'node:vm'
import { IMAGE_CACHE_NAME } from '@/utilities/image-cache'
import { scanGameImages } from '@/utilities/image-manifest'
import { createImageServiceWorker } from '@/utilities/image-service-worker'

const origin = 'https://pokeori.test'
const hash = (text: string) => createHash('sha256').update(text).digest('hex')
const image = (text: string) =>
  new Response(text, { headers: { 'Content-Type': 'image/png' } })

class MemoryCache {
  entries = new Map<string, Response>()
  url(key: string | Request) {
    return new URL(typeof key === 'string' ? key : key.url, origin).href
  }
  async keys() {
    return [...this.entries.keys()].map((url) => new Request(url))
  }
  async match(key: string | Request) {
    return this.entries.get(this.url(key))?.clone()
  }
  async put(key: string | Request, response: Response) {
    this.entries.set(this.url(key), response.clone())
  }
  async delete(key: string | Request) {
    return this.entries.delete(this.url(key))
  }
}

function setup() {
  const stores = new Map<string, MemoryCache>()
  const requests: string[] = []
  let content = 'first'
  const caches = {
    async open(name: string) {
      if (!stores.has(name)) stores.set(name, new MemoryCache())
      return stores.get(name)!
    },
    async keys() {
      return [...stores.keys()]
    },
    async delete(name: string) {
      return stores.delete(name)
    },
  }
  const worker = (version: string, value = content) => {
    const handlers: Record<string, (event: any) => void> = {}
    runInNewContext(createImageServiceWorker(version), {
      self: {
        location: { origin },
        addEventListener: (name: string, callback: any) => {
          handlers[name] = callback
        },
        skipWaiting() {},
      },
      clients: { claim() {} },
      caches,
      URL,
      crypto,
      fetch: async (url: string) => {
        if (url === '/api/game-images')
          return Response.json([
            { url: '/art.png', revision: hash(value), bytes: value.length },
          ])
        requests.push(url)
        return image(content)
      },
    })
    return {
      async activate() {
        let result: Promise<void> | undefined
        handlers.activate({
          waitUntil: (promise: Promise<void>) => {
            result = promise
          },
        })
        await result
      },
      async fetch(url: string, method = 'GET') {
        let result: Promise<Response> | undefined
        handlers.fetch({
          request: new Request(new URL(url, origin), { method }),
          respondWith: (promise: Promise<Response>) => {
            result = promise
          },
        })
        return result
      },
    }
  }
  return {
    caches,
    requests,
    worker,
    setContent: (value: string) => {
      content = value
    },
  }
}

describe('image downloads across releases', () => {
  test('reuses unchanged bytes across app versions and Next image variants', async () => {
    const state = setup()
    const first = state.worker('1.0.0')
    await first.activate()
    expect(await (await first.fetch('/art.png'))?.text()).toBe('first')
    const second = state.worker('1.0.1')
    await second.activate()
    expect(
      await (
        await second.fetch('/_next/image?url=%2Fart.png&w=640&q=75')
      )?.text(),
    ).toBe('first')
    expect(state.requests).toHaveLength(1)
  })

  test('refreshes changed art and removes only outdated image entries', async () => {
    const state = setup()
    await state.worker('1').fetch('/art.png')
    await (await state.caches.open('unrelated')).put(
      '/data',
      new Response('keep'),
    )
    state.setContent('second')
    const updated = state.worker('2')
    await updated.activate()
    expect(
      (await (await state.caches.open(IMAGE_CACHE_NAME)).keys()).length,
    ).toBe(0)
    expect(await (await updated.fetch('/art.png'))?.text()).toBe('second')
    expect(state.requests).toHaveLength(2)
    expect(
      await (
        await (await state.caches.open('unrelated')).match('/data')
      )?.text(),
    ).toBe('keep')
  })

  test('migrates valid legacy sprites without downloading them again', async () => {
    const state = setup()
    await (await state.caches.open('pokeori-sprites-0.29.22')).put(
      '/art.png',
      image('first'),
    )
    const worker = state.worker('0.30.0')
    await worker.activate()
    expect(await (await worker.fetch('/art.png'))?.text()).toBe('first')
    expect(state.requests).toHaveLength(0)
    expect(await state.caches.keys()).not.toContain('pokeori-sprites-0.29.22')
  })

  test('does not cache mismatched bytes or intercept APIs, remote images, or downloads', async () => {
    const state = setup()
    const worker = state.worker('1', 'expected')
    await worker.fetch('/art.png')
    expect(
      await (await state.caches.open(IMAGE_CACHE_NAME)).keys(),
    ).toHaveLength(0)
    expect(await worker.fetch('/api/app-version')).toBeUndefined()
    expect(await worker.fetch('/art.png', 'POST')).toBeUndefined()
    expect(await worker.fetch('/art.png?revision=abc')).toBeUndefined()
    expect(
      await worker.fetch('/_next/image?url=https://external.test/art.png'),
    ).toBeUndefined()
  })

  test('manifest hashes file contents, includes nested images, and excludes audio', async () => {
    const root = await mkdtemp(path.join(tmpdir(), 'pokeori-images-'))
    try {
      await mkdir(path.join(root, 'nested'))
      await writeFile(path.join(root, 'nested', 'a b.png'), 'first')
      await writeFile(path.join(root, 'music.mp3'), 'audio')
      expect(await scanGameImages(root)).toEqual([
        { url: '/nested/a%20b.png', revision: hash('first'), bytes: 5 },
      ])
      await writeFile(path.join(root, 'nested', 'a b.png'), 'second')
      expect((await scanGameImages(root))[0].revision).toBe(hash('second'))
    } finally {
      await rm(root, { recursive: true, force: true })
    }
  })
})
