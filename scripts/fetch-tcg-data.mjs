#!/usr/bin/env bun
import fs from 'node:fs/promises'
import path from 'node:path'
import { spawnSync } from 'node:child_process'

const GITHUB_REPO = 'tcgdex/cards-database'
const BRANCH = process.env.TCGDEX_BRANCH || 'master'

function usage() {
  console.log(`Usage: bun scripts/fetch-tcg-data.mjs

Downloads the English-capable TCGdex card database source. The card modules include
language fields; the generator currently imports English only.

Environment:
  TCGDEX_BRANCH  Optional TCGdex cards-database branch (default: master)
`)
}

async function main() {
  const args = process.argv.slice(2)
  if (args.includes('--help') || args.includes('-h')) return usage()

  const root = process.cwd()
  const dataRoot = path.join(root, 'source_data', 'tcg')
  const targetRoot = path.join(dataRoot, 'tcgdex')
  const temporaryRoot = path.join(dataRoot, `.tcgdex-download-${process.pid}`)
  const extractionRoot = path.join(temporaryRoot, 'extract')
  const archivePath = path.join(temporaryRoot, 'cards-database.tar.gz')
  const encodedBranch = BRANCH.split('/').map(encodeURIComponent).join('/')
  const archiveUrl = `https://codeload.github.com/${GITHUB_REPO}/tar.gz/refs/heads/${encodedBranch}`

  await fs.mkdir(dataRoot, { recursive: true })
  await fs.rm(temporaryRoot, { recursive: true, force: true })
  await fs.mkdir(extractionRoot, { recursive: true })

  console.log(`Downloading ${GITHUB_REPO}@${BRANCH}...`)
  try {
    const response = await fetch(archiveUrl)
    if (!response.ok) {
      throw new Error(`Failed to download ${archiveUrl}: ${response.status} ${response.statusText}`)
    }

    await fs.writeFile(archivePath, Buffer.from(await response.arrayBuffer()))

    const listing = spawnSync('tar', ['-tzf', archivePath], {
      encoding: 'utf8',
      maxBuffer: 64 * 1024 * 1024,
    })
    if (listing.error) throw listing.error
    if (listing.status !== 0) {
      throw new Error(listing.stderr || `tar listing exited with status ${listing.status}`)
    }
    const archiveRoot = listing.stdout.split('\n').find(Boolean)?.split('/')[0]
    if (!archiveRoot) throw new Error('The downloaded TCGdex archive is empty.')

    const extraction = spawnSync(
      'tar',
      [
        '-xzf',
        archivePath,
        '-C',
        extractionRoot,
        '--strip-components=1',
        `${archiveRoot}/data`,
        `${archiveRoot}/interfaces.d.ts`,
      ],
      { encoding: 'utf8' },
    )

    if (extraction.error) throw extraction.error
    if (extraction.status !== 0) {
      throw new Error(extraction.stderr || `tar exited with status ${extraction.status}`)
    }

    const extractedDataRoot = path.join(extractionRoot, 'data')
    const extractedInterfaces = path.join(extractionRoot, 'interfaces.d.ts')
    if (!(await fs.stat(extractedDataRoot).catch(() => null)) ||
        !(await fs.stat(extractedInterfaces).catch(() => null))) {
      throw new Error('The TCGdex archive did not contain its expected data and interfaces files.')
    }

    await fs.rm(targetRoot, { recursive: true, force: true })
    await fs.rename(extractionRoot, targetRoot)
    console.log(`Saved TCGdex source to ${path.relative(root, targetRoot)}`)
  } finally {
    await fs.rm(temporaryRoot, { recursive: true, force: true })
  }
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
