#!/usr/bin/env bun
import fs from 'fs/promises'
import path from 'path'
import { parse as csvParse } from 'csv-parse/sync'

const GITHUB_REPO = 'PokeAPI/pokeapi'
const BRANCH = 'master'
const BASE_DIR = 'data/v2/csv'

function githubHeaders() {
  const headers = { Accept: 'application/vnd.github.v3+json' }
  if (process.env.GITHUB_TOKEN) headers.Authorization = `token ${process.env.GITHUB_TOKEN}`
  return headers
}

async function listContents(dir) {
  const url = `https://api.github.com/repos/${GITHUB_REPO}/contents/${dir}?ref=${BRANCH}`
  const res = await fetch(url, { headers: githubHeaders() })
  if (!res.ok) {
    const txt = await res.text()
    throw new Error(`Failed to list ${dir}: ${res.status} ${res.statusText} - ${txt}`)
  }
  return res.json()
}

async function collectCsvFiles(dir, out = []) {
  const items = await listContents(dir)
  for (const it of items) {
    if (it.type === 'dir') await collectCsvFiles(it.path, out)
    else if (it.type === 'file' && it.name.toLowerCase().endsWith('.csv')) out.push(it)
  }
  return out
}

// Use `csv-parse` to robustly handle quoted fields, newlines inside fields, etc.

function usage() {
  console.log(`Usage: bun scripts/fetch-pokemon-data.mjs [--only=<name>] [--test]

Options:
  --only=<name>   Only process CSVs whose filename (without extension) matches <name>
  --test          Process only the first discovered CSV (fast validation)

Environment:
  GITHUB_TOKEN    Optional token to increase GitHub API rate limits
`)
}

async function main() {
  const args = process.argv.slice(2)
  if (args.includes('--help') || args.includes('-h')) return usage()
  let only = null
  let testMode = false
  const onlyArg = args.find((a) => a.startsWith('--only='))
  if (onlyArg) only = onlyArg.split('=')[1]
  if (args.includes('--test')) testMode = true

  console.log('Listing CSV files in', BASE_DIR)
  const files = await collectCsvFiles(BASE_DIR)
  console.log(`Found ${files.length} CSV files`)
  if (files.length === 0) return

  const root = process.cwd()
  const outRoot = path.join(root, 'source_data', 'pokemon')
  await fs.mkdir(outRoot, { recursive: true })

  let processed = 0
  for (const file of files) {
    const filename = path.basename(file.name, '.csv')
    if (only && filename !== only && file.name !== only && filename !== only.replace('.csv', ''))
      continue

    console.log(`Fetching ${file.path}...`)
    const res = await fetch(file.download_url, { headers: githubHeaders() })
    if (!res.ok) {
      console.error('Failed to download', file.download_url, res.status, res.statusText)
      continue
    }
    const text = await res.text()
    // parse CSV into array of objects using header row as keys
    // Use relax_quotes to tolerate stray/unbalanced quotes found in some PokeAPI CSVs.
    let records = []
    try {
      records = csvParse(text, {
        columns: true,
        skip_empty_lines: true,
        relax_quotes: true,
        relax_column_count: true,
        relax_column_count_more: true,
        escape: null,
        trim: true,
      })
    } catch (err) {
      console.warn(`Failed to parse ${file.path}: ${err.message}. Skipping.`)
      continue
    }
    const objs = records

    const rel = path.relative(BASE_DIR, file.path)
    const outPath = path.join(outRoot, rel).replace(/\.csv$/i, '.json')
    await fs.mkdir(path.dirname(outPath), { recursive: true })
    await fs.writeFile(outPath, JSON.stringify(objs, null, 2), 'utf8')
    console.log(`Wrote ${path.relative(root, outPath)}`)

    processed++
    if (testMode) break
  }

  console.log(`Processed ${processed} files. CSVs were not saved locally.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
