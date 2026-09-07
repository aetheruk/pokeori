import { expect, test } from 'bun:test'

test('held item settlement rolls back partial writes, retains retry state and replays without duplicate charges', () => {
  const result = Bun.spawnSync({ cmd: ['bun', 'tests/fixtures/held-item-settlement.ts'], cwd: process.cwd(), stdout: 'pipe', stderr: 'pipe' })
  expect(new TextDecoder().decode(result.stderr)).toBe('')
  expect(result.exitCode).toBe(0)
})
