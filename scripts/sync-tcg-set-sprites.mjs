import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.join(__dirname, '..')
const setsMetadataPath = path.join(repoRoot, 'source_data', 'tcg', 'sets', 'en.json')
const sourceArtworkDir = path.join(repoRoot, 'source_data', 'tcg', 'set-artwork')
const baseDir = path.join(repoRoot, 'source_data', 'tcg', 'sprite-bases')
const publicItemDir = path.join(repoRoot, 'public', 'sprites', 'items', 'tcg')
const boosterBasePath = path.join(baseDir, 'booster-pack-base.png')
const binderBasePath = path.join(baseDir, 'binder-base.png')

const args = new Set(process.argv.slice(2))
const skipFetch = args.has('--skip-fetch')
const force = args.has('--force')

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true })
}

function loadSetsMetadata() {
  if (!fs.existsSync(setsMetadataPath)) {
    throw new Error(`Set metadata file not found: ${setsMetadataPath}`)
  }

  const parsed = JSON.parse(fs.readFileSync(setsMetadataPath, 'utf8'))
  if (!Array.isArray(parsed)) {
    throw new Error(`Expected ${setsMetadataPath} to contain an array`)
  }

  return parsed.filter((set) => set?.id)
}

function sourcePathForSetImage(setId, kind) {
  return path.join(sourceArtworkDir, setId, `${kind}.png`)
}

async function downloadToFile(url, outputPath) {
  if (!url) return false
  if (!force && fs.existsSync(outputPath)) return true
  if (skipFetch) return fs.existsSync(outputPath)

  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
  }

  ensureDir(path.dirname(outputPath))
  const bytes = Buffer.from(await response.arrayBuffer())
  fs.writeFileSync(outputPath, bytes)
  return true
}

async function makeOverlay(sourcePath, width, height, rotate = 0) {
  if (!fs.existsSync(sourcePath)) return null

  let pipeline = sharp(sourcePath)
    .trim({ background: { r: 0, g: 0, b: 0, alpha: 0 }, threshold: 8 })
    .resize(width, height, {
      fit: 'inside',
      withoutEnlargement: true,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })

  if (rotate) {
    pipeline = pipeline.rotate(rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
  }

  return pipeline
    .png()
    .toBuffer()
}

async function composeItemSprite({ basePath, overlayPath, overlayBox, outputPath }) {
  if (!fs.existsSync(basePath)) {
    throw new Error(`Missing TCG sprite base: ${basePath}`)
  }

  if (!force && fs.existsSync(outputPath)) return true

  const overlay = await makeOverlay(overlayPath, overlayBox.width, overlayBox.height, overlayBox.rotate || 0)
  ensureDir(path.dirname(outputPath))

  const pipeline = sharp(basePath).resize(100, 100, {
    fit: 'contain',
    background: { r: 0, g: 0, b: 0, alpha: 0 },
  })

  if (overlay) {
    await pipeline
      .composite([{ input: overlay, left: overlayBox.left, top: overlayBox.top }])
      .avif({ quality: 82, effort: 4 })
      .toFile(outputPath)
    return true
  }

  await pipeline.avif({ quality: 82, effort: 4 }).toFile(outputPath)
  return false
}

async function syncSet(set) {
  const logoSourcePath = sourcePathForSetImage(set.id, 'logo')
  const symbolSourcePath = sourcePathForSetImage(set.id, 'symbol')

  const logoDownloaded = await downloadToFile(set.images?.logo, logoSourcePath)
  const symbolDownloaded = await downloadToFile(set.images?.symbol, symbolSourcePath)

  await composeItemSprite({
    basePath: boosterBasePath,
    overlayPath: logoSourcePath,
    overlayBox: { left: 25, top: 36, width: 52, height: 34 },
    outputPath: path.join(publicItemDir, `pack-${set.id}.avif`),
  })

  await composeItemSprite({
    basePath: binderBasePath,
    overlayPath: symbolSourcePath,
    overlayBox: { left: 43, top: 22, width: 30, height: 19, rotate: 10 },
    outputPath: path.join(publicItemDir, `binder-${set.id}.avif`),
  })

  return {
    id: set.id,
    logo: logoDownloaded,
    symbol: symbolDownloaded,
  }
}

try {
  ensureDir(sourceArtworkDir)
  ensureDir(publicItemDir)

  const sets = loadSetsMetadata()
  const results = []

  for (const set of sets) {
    results.push(await syncSet(set))
  }

  const missing = results.filter((result) => !result.logo || !result.symbol)
  console.log(`TCG set sprite sync complete.`)
  console.log(`- processed sets: ${results.length}`)
  console.log(`- missing local artwork: ${missing.length}`)
  if (missing.length) {
    console.log(missing.map((result) => `  - ${result.id}`).join('\n'))
  }
} catch (error) {
  console.error(error)
  process.exit(1)
}
