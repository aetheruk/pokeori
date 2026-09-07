import { expect, test } from 'bun:test'

test('task claims enforce daily completion and server password proof across distinct request IDs', () => {
  // Isolate action-module mocks from other tests in Bun's shared module cache.
  const result = Bun.spawnSync({
    cmd: ['bun', 'tests/fixtures/task-claim-security.ts'],
    cwd: process.cwd(),
    stdout: 'pipe',
    stderr: 'pipe',
  })
  expect(new TextDecoder().decode(result.stderr)).toBe('')
  expect(result.exitCode).toBe(0)
})
