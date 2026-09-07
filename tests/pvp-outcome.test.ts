import {expect, test} from 'bun:test'

test('PVP both-player effects roll back together and opposing terminal retries restore one result', () => {
  const result = Bun.spawnSync({cmd: ['bun', 'tests/fixtures/pvp-outcome.ts'], cwd: process.cwd(), stdout: 'pipe', stderr: 'pipe'})
  expect(new TextDecoder().decode(result.stderr)).toBe('')
  expect(result.exitCode).toBe(0)
})
