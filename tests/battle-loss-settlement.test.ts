import { expect, test } from 'bun:test'

test('battle loss atomically settles stats, expedition, payout and Pokemon effects with durable replay', () => {
  const result = Bun.spawnSync({ cmd: ['bun', 'tests/fixtures/battle-loss-settlement.ts'], cwd: process.cwd(), stdout: 'pipe', stderr: 'pipe' })
  expect(new TextDecoder().decode(result.stderr)).toBe('')
  expect(result.exitCode).toBe(0)
})
