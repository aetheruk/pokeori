import { Users } from '../src/collections/Users'
import { readFileSync } from 'node:fs'
import { GraphQLPhoneNumber } from 'graphql-scalars'

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
const deepmergeAdvisory = 'https://github.com/advisories/GHSA-gcqx-w48m-w2h4'
const graphqlScalarsAdvisory = 'https://github.com/advisories/GHSA-x8rm-f576-gq67'

function hasVerifiedDeepmergePatch() {
  const installedPackage = JSON.parse(
    readFileSync(new URL('../node_modules/deepmerge/package.json', import.meta.url), 'utf8'),
  )
  const projectPackage = JSON.parse(
    readFileSync(new URL('../package.json', import.meta.url), 'utf8'),
  )
  const source = readFileSync(
    new URL('../node_modules/deepmerge/dist/cjs.js', import.meta.url),
    'utf8',
  )
  return (
    installedPackage.version === '4.3.1' &&
    projectPackage.patchedDependencies?.['deepmerge@4.3.1'] ===
      'patches/deepmerge@4.3.1.patch' &&
    source.includes("return key === '__proto__'") &&
    source.includes('propertyIsForbidden(key) || propertyIsUnsafe(target, key)')
  )
}

function hasVerifiedGraphqlScalarsVersion() {
  const packageJson = JSON.parse(
    readFileSync(
      new URL('../node_modules/graphql-scalars/package.json', import.meta.url),
      'utf8',
    ),
  )
  if (packageJson.version !== '1.22.2') return false

  const start = performance.now()
  try {
    GraphQLPhoneNumber.parseValue(`${'1'.repeat(30)}x`)
  } catch {
    return performance.now() - start < 100
  }
  return false
}

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
    if (name === 'deepmerge' && advisory.url === deepmergeAdvisory) {
      if (hasVerifiedDeepmergePatch()) {
        console.warn(
          `Mitigated advisory: ${advisory.title} (${advisory.url}); the installed package has the verified __proto__ guard patch.`,
        )
        continue
      }
    }
    if (name === 'graphql-scalars' && advisory.url === graphqlScalarsAdvisory) {
      if (hasVerifiedGraphqlScalarsVersion()) {
        console.warn(
          `Not affected: ${advisory.title} (${advisory.url}); installed graphql-scalars 1.22.2 rejects the adversarial PhoneNumber value immediately, and the vendor advisory identifies 1.24.1 as the first affected release.`,
        )
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
