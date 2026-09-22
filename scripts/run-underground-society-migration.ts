import { existsSync } from 'node:fs'

const runtimeEntry = './scripts/migrate-underground-society.js'
const isRuntimeImage = existsSync(runtimeEntry)
const entry = isRuntimeImage ? runtimeEntry : './scripts/migrate-underground-society.ts'
const command = isRuntimeImage
  ? ['bun', entry, ...Bun.argv.slice(2)]
  : ['bun', '--preload', './tests/setup.ts', entry, ...Bun.argv.slice(2)]

const child = Bun.spawn(command, { stdin: 'inherit', stdout: 'inherit', stderr: 'inherit' })
process.exit(await child.exited)
