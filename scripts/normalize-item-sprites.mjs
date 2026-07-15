import { copyFile, mkdir, readdir, unlink } from 'fs/promises'
import { existsSync } from 'fs'
import { dirname, extname, join, relative } from 'path'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

const repoRoot = join(dirname(fileURLToPath(import.meta.url)), '..')
const itemSpritesDir = join(repoRoot, 'public', 'sprites', 'items')
const sourceDir = join(repoRoot, 'source_data', 'item-sprites-originals')
const imageExtensions = new Set(['.avif', '.webp', '.png', '.jpg', '.jpeg'])
const canvasSize = 100
const edgePadding = 8
const maxContentSize = canvasSize - edgePadding * 2 - 2

async function walkFiles(dir) {
  const entries = await readdir(dir, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const path = join(dir, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await walkFiles(path)))
    } else if (entry.isFile() && imageExtensions.has(extname(entry.name).toLowerCase())) {
      files.push(path)
    }
  }

  return files
}

function alphaBounds(data, width, height) {
  let minX = width
  let minY = height
  let maxX = -1
  let maxY = -1

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const alpha = data[(y * width + x) * 4 + 3]
      if (alpha === 0) continue
      minX = Math.min(minX, x)
      minY = Math.min(minY, y)
      maxX = Math.max(maxX, x)
      maxY = Math.max(maxY, y)
    }
  }

  if (maxX < minX || maxY < minY) return null
  return { left: minX, top: minY, width: maxX - minX + 1, height: maxY - minY + 1 }
}

async function normalizeSprite(file, inputRoot = itemSpritesDir) {
  const rel = relative(inputRoot, file)
  const sourcePath = join(sourceDir, rel)
  if (inputRoot === itemSpritesDir && !existsSync(sourcePath)) {
    await mkdir(dirname(sourcePath), { recursive: true })
    await copyFile(file, sourcePath)
  }

  const raw = await sharp(file).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const bounds = alphaBounds(raw.data, raw.info.width, raw.info.height)
  const outputRel = rel.replace(/\.(webp|png|jpe?g|avif)$/i, '.avif')
  const outputPath = join(itemSpritesDir, outputRel)

  const input = bounds
    ? sharp(raw.data, { raw: raw.info }).extract(bounds)
    : sharp({
        create: {
          width: 1,
          height: 1,
          channels: 4,
          background: { r: 0, g: 0, b: 0, alpha: 0 },
        },
      })

  const resized = await input
    .resize({
      width: maxContentSize,
      height: maxContentSize,
      fit: 'inside',
      withoutEnlargement: false,
    })
    .png()
    .toBuffer()

  await mkdir(dirname(outputPath), { recursive: true })
  await sharp({
    create: {
      width: canvasSize,
      height: canvasSize,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  })
    .composite([
      {
        input: resized,
        gravity: 'center',
      },
    ])
    .avif({ quality: 80, effort: 4 })
    .toFile(outputPath)

  if (inputRoot === itemSpritesDir && file !== outputPath) {
    await unlink(file)
  }

  return { input: rel, output: outputRel }
}

const inputRoot = existsSync(sourceDir) ? sourceDir : itemSpritesDir
const files = await walkFiles(inputRoot)
const normalized = []

for (const file of files) {
  normalized.push(await normalizeSprite(file, inputRoot))
}

console.log(`Normalized ${normalized.length} item sprites to ${canvasSize}x${canvasSize} AVIF.`)
console.log(`Originals preserved in ${relative(repoRoot, sourceDir)}.`)
