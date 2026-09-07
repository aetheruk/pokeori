import { expect, test } from 'bun:test'

test('capture settlement recovers post-commit Redis failure, semantic aliases, stale retries and rejected actions', () => {
  const result = Bun.spawnSync({ cmd: ['bun', 'tests/fixtures/capture-settlement.ts'], cwd: process.cwd(), stdout: 'pipe', stderr: 'pipe' })
  expect(new TextDecoder().decode(result.stderr)).toBe('')
  expect(result.exitCode).toBe(0)
})
