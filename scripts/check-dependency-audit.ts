import { Users } from '../src/collections/Users'

const result = Bun.spawnSync(['bun', 'audit', '--json'], {
  stdout: 'pipe', stderr: 'pipe',
})
const output = new TextDecoder().decode(result.stdout)
let advisories: Record<string, Array<{ url: string; severity: string; title: string }>>
try {
  advisories = JSON.parse(output)
} catch {
  console.error('Dependency audit did not return valid JSON; refusing to skip the check.')
  process.exit(1)
}
const knownAdvisory = 'https://github.com/advisories/GHSA-jg8r-5jh2-v2xj'
let failures = 0
for (const [name, entries] of Object.entries(advisories)) {
  for (const advisory of entries) {
    if (name === 'payload' && advisory.url === knownAdvisory && advisory.severity === 'moderate') {
      const unlock = Users.access?.unlock
      const denied = unlock && await unlock({ req: { user: null } } as any) === false &&
        await unlock({ req: { user: { id: 'player', isAdmin: false } } } as any) === false
      if (denied) {
        console.warn(`Mitigated advisory: ${advisory.title} (${advisory.url}); explicit admin-only unlock verified.`)
        continue
      }
    }
    console.error(`${name}: ${advisory.severity} ${advisory.title} (${advisory.url})`)
    failures += 1
  }
}
if (result.exitCode !== 0 && Object.keys(advisories).length === 0) {
  console.error('Dependency audit failed without advisory results.')
  failures += 1
}
if (failures) process.exit(1)
console.log('Dependency audit passed with all reported advisories evaluated.')
