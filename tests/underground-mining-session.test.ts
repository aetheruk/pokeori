import { expect, test } from 'bun:test'

test('Underground Mining validates actions, settles finds once, and closes completed sessions', () => {
  const result = Bun.spawnSync({
    cmd: ['bun', 'tests/fixtures/underground-mining-session.ts'],
    cwd: process.cwd(),
    stdout: 'pipe',
    stderr: 'pipe',
  })
  const output = result.stdout.toString() + result.stderr.toString()
  expect(output).toContain(
    'Underground Mining session security and settlement passed',
  )
  expect(result.exitCode).toBe(0)
})
