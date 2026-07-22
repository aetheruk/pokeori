export const ART_ACADEMY_SCORE_GRID_SIZE = 64
export const ART_ACADEMY_GUIDE_GRID_SIZE = 3
const ALPHA_CUTOFF = 32

export interface ArtAcademyColor {
  r: number
  g: number
  b: number
}

export interface ArtAcademyReference {
  palette: ArtAcademyColor[]
  referenceCells: Uint8Array
}

interface HistogramBucket {
  weight: number
  r: number
  g: number
  b: number
}

function colorDistance(a: ArtAcademyColor, b: ArtAcademyColor) {
  return Math.sqrt((a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2)
}

function nearestPaletteIndex(
  color: ArtAcademyColor,
  palette: ArtAcademyColor[],
) {
  let closestIndex = 0
  let closestDistance = Number.POSITIVE_INFINITY

  palette.forEach((candidate, index) => {
    const distance = colorDistance(color, candidate)
    if (distance < closestDistance) {
      closestDistance = distance
      closestIndex = index
    }
  })

  return closestIndex
}

export function artAcademyColorToHex(color: ArtAcademyColor) {
  return `#${[color.r, color.g, color.b]
    .map((channel) => Math.round(channel).toString(16).padStart(2, '0'))
    .join('')}`
}

/**
 * Converts opaque artwork into a compact, distinct palette. The source is already
 * normalized to the fixed score grid before this runs.
 */
export function buildArtAcademyReference(
  rgba: Uint8Array,
  paletteSize = 12,
): ArtAcademyReference {
  const buckets = new Map<string, HistogramBucket>()

  for (let index = 0; index < rgba.length; index += 4) {
    const alpha = rgba[index + 3]
    if (alpha < ALPHA_CUTOFF) continue

    const r = rgba[index]
    const g = rgba[index + 1]
    const b = rgba[index + 2]
    const key = `${r >> 4}:${g >> 4}:${b >> 4}`
    const bucket = buckets.get(key) || { weight: 0, r: 0, g: 0, b: 0 }
    bucket.weight += alpha
    bucket.r += r * alpha
    bucket.g += g * alpha
    bucket.b += b * alpha
    buckets.set(key, bucket)
  }

  const candidates = [...buckets.values()]
    .sort((a, b) => b.weight - a.weight)
    .map<ArtAcademyColor>((bucket) => ({
      r: Math.round(bucket.r / bucket.weight),
      g: Math.round(bucket.g / bucket.weight),
      b: Math.round(bucket.b / bucket.weight),
    }))

  const palette: ArtAcademyColor[] = []
  for (const candidate of candidates) {
    if (palette.length >= paletteSize) break
    if (palette.some((selected) => colorDistance(selected, candidate) < 24)) {
      continue
    }
    palette.push(candidate)
  }

  // A valid Pokemon HOME sprite always has opaque pixels, but preserve a safe
  // fallback for malformed authored files.
  if (palette.length === 0) palette.push({ r: 41, g: 53, b: 50 })

  const referenceCells = new Uint8Array(rgba.length / 4)
  for (let cell = 0; cell < referenceCells.length; cell += 1) {
    const index = cell * 4
    if (rgba[index + 3] < ALPHA_CUTOFF) continue
    referenceCells[cell] =
      nearestPaletteIndex(
        { r: rgba[index], g: rgba[index + 1], b: rgba[index + 2] },
        palette,
      ) + 1
  }

  return { palette, referenceCells }
}

export function scoreArtAcademyDrawing(
  referenceCells: Uint8Array,
  drawingCells: Uint8Array,
  palette: ArtAcademyColor[],
) {
  if (referenceCells.length !== drawingCells.length || palette.length === 0) {
    return 0
  }

  let foregroundTotal = 0
  let foregroundScore = 0

  for (let index = 0; index < referenceCells.length; index += 1) {
    const reference = referenceCells[index]
    const drawing = drawingCells[index]

    if (reference === 0) continue

    foregroundTotal += 1
    if (drawing === reference) foregroundScore += 1
  }

  const foregroundAccuracy =
    foregroundTotal > 0 ? foregroundScore / foregroundTotal : 0
  return Math.round(foregroundAccuracy * 100)
}

export function hasValidArtAcademyCellValues(
  cells: Uint8Array,
  paletteLength: number,
) {
  return [...cells].every((cell) => cell <= paletteLength)
}
