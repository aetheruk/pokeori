import { spawn } from 'child_process'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.join(__dirname, '..')

const steps = [
  {
    name: 'Fetch Pokemon source data',
    command: ['bun', 'scripts/fetch-pokemon-data.mjs'],
    flag: '--skip-fetch',
  },
  {
    name: 'Fetch TCG source data',
    command: ['bun', 'scripts/fetch-tcg-data.mjs'],
    flag: '--skip-fetch',
  },
  {
    name: 'Sync bundled TCG set sprites',
    command: ['bun', 'scripts/sync-tcg-set-sprites.mjs'],
    flag: '--skip-tcg-sprites',
    passSkipFetch: true,
  },
  {
    name: 'Generate Pokemon modules',
    command: ['bun', 'scripts/generate-pokemon-modules.mjs'],
  },
  {
    name: 'Sync bundled Pokemon sprites',
    command: ['bun', 'scripts/sync-pokemon-sprites.mjs'],
    flag: '--skip-sprites',
    passSkipFetch: true,
  },
  {
    name: 'Generate evolution map',
    command: ['bun', 'scripts/generate-evolutions.mjs'],
  },
  {
    name: 'Generate TCG modules and booster packs',
    command: ['bun', 'scripts/generate-tcg-modules.mjs'],
  },
  {
    name: 'Generate mega stone items',
    command: ['bun', 'scripts/generate-mega-stones.mjs'],
  },
  {
    name: 'Sync bundled item sprites',
    command: ['bun', 'scripts/sync-item-sprites.mjs'],
    flag: '--skip-item-sprites',
  },
  {
    name: 'Generate blank region entry files',
    command: ['bun', 'scripts/generate-data-entries.mjs'],
    flag: '--skip-entry-scaffold',
  },
  {
    name: 'Validate generated data',
    command: ['bun', 'run', 'validate:data'],
    flag: '--skip-validate',
  },
]

const args = new Set(process.argv.slice(2))
const shouldRun = (step) => !step.flag || !args.has(step.flag)
const dryRun = args.has('--dry-run')

const runStep = (step) =>
  new Promise((resolve, reject) => {
    console.log(`\n▶ ${step.name}`)
    const command = step.passSkipFetch && args.has('--skip-fetch')
      ? [...step.command, '--skip-fetch']
      : step.command
    const [bin, ...commandArgs] = command
    if (dryRun) {
      console.log(`[dry-run] ${[bin, ...commandArgs].join(' ')}`)
      resolve()
      return
    }

    const child = spawn(bin, commandArgs, {
      cwd: root,
      stdio: 'inherit',
      env: process.env,
    })

    child.on('error', reject)
    child.on('close', (code) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(new Error(`${step.name} failed with exit code ${code}`))
    })
  })

console.log(dryRun ? 'Planning Pokeori game data generation...' : 'Generating Pokeori game data...')

for (const step of steps) {
  if (!shouldRun(step)) {
    console.log(`\n- Skipping ${step.name}`)
    continue
  }

  await runStep(step)
}

console.log(dryRun ? '\n✅ Game data generation dry run complete.' : '\n✅ Game data generation complete.')
