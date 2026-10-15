import { expect, test } from 'bun:test'

test('Battle Bets credits matching daily tasks only once per winning settlement', () => {
  const result = Bun.spawnSync({
    cmd: ['bun', 'tests/fixtures/battle-bets-daily-settlement.ts'],
    cwd: process.cwd(),
    stdout: 'pipe',
    stderr: 'pipe',
  })
  expect(result.stdout.toString() + result.stderr.toString()).toContain('Battle Bets daily settlement passed')
  expect(result.exitCode).toBe(0)
})
