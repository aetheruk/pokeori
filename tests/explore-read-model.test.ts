import { expect, test } from 'bun:test'

test('native Explore reads preserve ownership, projection, hook fallback and legacy Payload defaults', () => {
  const result = Bun.spawnSync({ cmd: ['bun', 'tests/fixtures/explore-read-model.ts'], cwd: process.cwd(), stdout: 'pipe', stderr: 'pipe' })
  expect(new TextDecoder().decode(result.stderr)).toBe('')
  expect(result.exitCode).toBe(0)
})
