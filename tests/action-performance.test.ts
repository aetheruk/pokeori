import { expect, test } from 'bun:test'

test('action telemetry measures retry, replay, contention and errors without private data or behavior changes', () => {
  const result = Bun.spawnSync({ cmd: ['bun', 'tests/fixtures/action-performance.ts'], cwd: process.cwd(), stdout: 'pipe', stderr: 'pipe' })
  expect(new TextDecoder().decode(result.stderr)).toBe('')
  expect(result.exitCode).toBe(0)
})
