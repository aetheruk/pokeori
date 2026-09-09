import { expect, test } from 'bun:test'

test('event acceptance, progress, expiry, claims and notification retries', async () => {
  const child = Bun.spawn(['bun', 'tests/fixtures/event-runtime.ts'], {
    stdout: 'pipe',
    stderr: 'pipe',
  })
  const [status, stdout, stderr] = await Promise.all([
    child.exited,
    new Response(child.stdout).text(),
    new Response(child.stderr).text(),
  ])
  expect({ status, stdout: stdout.trim(), stderr: stderr.trim() }).toEqual({
    status: 0,
    stdout: 'Event runtime checks passed',
    stderr: '',
  })
})
