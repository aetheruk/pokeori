#!/usr/bin/env bun
import fs from 'fs/promises'
import path from 'path'

const GITHUB_REPO = 'PokemonTCG/pokemon-tcg-data'
const BRANCH = 'master'

function githubHeaders() {
  const headers = { Accept: 'application/vnd.github.v3+json' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `token ${process.env.GITHUB_TOKEN}`
  return headers
}

async function listContents(dir) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${dir}?ref=${BRANCH}`
  const res = await fetch(url, { headers: githubHeaders() })
  if (!res.ok) {
    const text = await res.text()
    throw new Error(`Failed to list ${dir}: ${res.status} ${res.statusText} - ${text}`)
  }
  return res.json()
}

async function downloadToFile(url, dest) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status} ${res.statusText}`)
  const body = await res.text()
  await fs.writeFile(dest, body, 'utf8')
}

function usage() {
  console.log(`Usage: bun scripts/fetch-tcg-data.mjs [--only=sets|cards]

Options:
  --only=sets    Only fetch the sets JSON files (fast, small)
  --only=cards   Only fetch the cards JSON files (many files, large)

Environment:
  GITHUB_TOKEN   Optional GitHub token to increase API rate limits
`)
}

async function main() {
  const args = process.argv.slice(2)
  if (args.includes('--help') || args.includes('-h')) return usage()
  let only = null
  const onlyArg = args.find((a) => a.startsWith('--only='))
  if (onlyArg) only = onlyArg.split('=')[1]

  const root = process.cwd()
  const outRoot = path.join(root, 'source_data', 'tcg')
  await fs.mkdir(outRoot, { recursive: true })

  const targets = [
    { dir: 'cards/en', out: path.join(outRoot, 'cards', 'en') },
    { dir: 'sets', out: path.join(outRoot, 'sets') },
  ]

  for (const t of targets) {
    if (only) {
      if (only === 'sets' && t.dir !== 'sets') continue
      if (only === 'cards' && !t.dir.startsWith('cards')) continue
    }

    await fs.mkdir(t.out, { recursive: true })
    console.log(`Listing ${t.dir}...`)
    const items = await listContents(t.dir)
    const files = items.filter((it) => it.type === 'file' && it.name.endsWith('.json'))
    console.log(`Found ${files.length} JSON files in ${t.dir}`)

    for (const file of files) {
      const dest = path.join(t.out, file.name)
      process.stdout.write(`Downloading ${file.name} -> ${path.relative(root, dest)}... `)
      try {
        await downloadToFile(file.download_url, dest)
        console.log('OK')
      } catch (err) {
        console.log('FAILED')
        console.error(err.message)
      }
    }
  }

  console.log('All done.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
