import { mkdtempSync, openSync, closeSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'
import { spawn } from 'node:child_process'
import Redis from 'ioredis'

// This runner deliberately replaces any application credentials loaded by Bun.
// Only the disposable services in compose.test.yml are used.
const env = {
  ...process.env,
  DATABASE_URI: 'mongodb://127.0.0.1:27028/pokeori_security_test?replicaSet=audit-rs&directConnection=true',
  REDIS_URL: 'redis://127.0.0.1:6399/15',
  PAYLOAD_SECRET: 'isolated-security-test-secret-not-for-production',
  BETA_INVITATION_SECRET: 'integration-test-only-invitation-signing-secret',
  RESEND_API_KEY: 're_isolated_test',
  POKEORI_TEST_DIST_DIR: '.next-security',
  SECURITY_TEST_ORIGIN: 'http://127.0.0.1:3110',
  NEXT_TELEMETRY_DISABLED: '1',
}
const logPath = join(mkdtempSync(join(tmpdir(), 'pokeori-security-')), 'server.log')
const log = openSync(logPath, 'w')
console.log(`Isolated server log: ${logPath}`)
// DB 15 belongs exclusively to this test runner, including signup rate limits.
const testRedis = new Redis(env.REDIS_URL)
await testRedis.flushdb()
await testRedis.quit()
const server = spawn(process.execPath.includes('bun') ? 'node' : process.execPath,
  ['node_modules/next/dist/bin/next', 'dev', '--hostname', '127.0.0.1', '--port', '3110'],
  { env: { ...env, NODE_ENV: 'development' }, stdio: ['ignore', log, log] })
let exited = false
server.on('exit', () => { exited = true })
try {
  const deadline = Date.now() + 180_000
  let ready = false
  while (Date.now() < deadline && !exited) {
    try {
      const response = await fetch(`${env.SECURITY_TEST_ORIGIN}/api/health`, { signal: AbortSignal.timeout(5000) })
      if (response.ok) { ready = true; break }
    } catch { /* The server may still be compiling its first route. */ }
    await Bun.sleep(500)
  }
  if (!ready) throw new Error(`Isolated security server failed to start; see ${logPath}`)
  const test = Bun.spawn(['bun', '--preload', './tests/setup.ts', 'scripts/test-security-integration.ts'], {
    env: { ...env, NODE_ENV: 'test' }, stdout: 'inherit', stderr: 'inherit',
  })
  process.exitCode = await test.exited
} finally {
  server.kill('SIGTERM')
  await new Promise<void>((resolve) => {
    if (exited) return resolve()
    const timeout = setTimeout(() => { server.kill('SIGKILL'); resolve() }, 5000)
    server.once('exit', () => { clearTimeout(timeout); resolve() })
  })
  closeSync(log)
}
