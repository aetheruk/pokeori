import { expect, test } from 'bun:test'

test('game sync authenticates once, enforces ownership, and emits private timing', async () => {
  // Isolate module replacements from the rest of the Bun suite.
  const child = Bun.spawn([process.execPath, '--eval', `
    import { mock } from 'bun:test'
    import assert from 'node:assert/strict'
    let authCalls = 0
    let reads = 0
    let signedIn = true
    const payload = {
      auth: async () => { authCalls++; return { user: signedIn ? { id: 'player-1' } : null } },
      findByID: async (args) => {
        reads++
        assert.equal(args.id, 'player-1')
        assert.equal(args.depth, 0)
        return { id: args.id }
      },
    }
    mock.module('payload', () => ({ getPayload: async () => payload }))
    mock.module('@payload-config', () => ({ default: {} }))
    mock.module('next/headers', () => ({ headers: async () => new Headers() }))
    mock.module('@/utilities/rate-limiter', () => ({ getClientIp: () => '127.0.0.1', rateLimit: async () => ({ allowed: true }) }))
    mock.module('@/utilities/game-data', () => ({ getGameUserData: async user => ({ user }) }))
    const { GET } = await import('./src/app/api/game/sync/route.ts')
    const response = await GET(new Request('https://example.test/api/game/sync?scope=core&userId=someone-else'))
    assert.equal(response.status, 200)
    assert.equal(authCalls, 1)
    assert.equal(reads, 1)
    assert.equal((await response.json()).user.id, 'player-1')
    assert.equal(response.headers.get('cache-control'), 'private, no-store')
    assert.match(response.headers.get('server-timing'), /^game-data;dur=/)
    signedIn = false
    const denied = await GET(new Request('https://example.test/api/game/sync'))
    assert.equal(denied.status, 401)
    assert.equal(reads, 1)
  `], { cwd: process.cwd(), stdout: 'pipe', stderr: 'pipe' })
  const [exitCode, stderr] = await Promise.all([child.exited, new Response(child.stderr).text()])
  expect(stderr).toBe('')
  expect(exitCode).toBe(0)
})
