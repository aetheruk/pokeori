import path from 'node:path'
import sharp from 'sharp'
import type { ArtAcademySettings } from '@/data/games/art-academy'
import { getBundledPokemonSpriteUrl } from '@/utilities/pokemon/local-sprites'
import {
  ART_ACADEMY_GUIDE_GRID_SIZE,
  ART_ACADEMY_SCORE_GRID_SIZE,
  artAcademyColorToHex,
  buildArtAcademyReference,
  hasValidArtAcademyCellValues,
  scoreArtAcademyDrawing,
  type ArtAcademyColor,
} from './art-academy'

export interface ArtAcademyPrivateRoundData {
  palette: ArtAcademyColor[]
  referenceCells: string
}

export interface ArtAcademyPublicRoundData {
  artAcademy: {
    spriteUrl: string
    palette: string[]
    scoreGridSize: number
    guideGridSize: number
  }
}

export async function createArtAcademyRound(
  settings: ArtAcademySettings,
): Promise<{
  privateRoundData: ArtAcademyPrivateRoundData
  publicRoundData: ArtAcademyPublicRoundData
}> {
  const spriteUrl = getBundledPokemonSpriteUrl({
    formId: settings.formId,
    family: 'home',
  })
  const imagePath = path.join(process.cwd(), 'public', spriteUrl)
  const { data } = await sharp(imagePath)
    .ensureAlpha()
    .resize(ART_ACADEMY_SCORE_GRID_SIZE, ART_ACADEMY_SCORE_GRID_SIZE, {
      fit: 'contain',
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    })
    .raw()
    .toBuffer({ resolveWithObject: true })
  const reference = buildArtAcademyReference(
    new Uint8Array(data),
    settings.paletteSize || 12,
  )

  return {
    privateRoundData: {
      palette: reference.palette,
      referenceCells: Buffer.from(reference.referenceCells).toString(
        'base64url',
      ),
    },
    publicRoundData: {
      artAcademy: {
        spriteUrl,
        palette: reference.palette.map(artAcademyColorToHex),
        scoreGridSize: ART_ACADEMY_SCORE_GRID_SIZE,
        guideGridSize: ART_ACADEMY_GUIDE_GRID_SIZE,
      },
    },
  }
}

export function scoreSerializedArtAcademyDrawing(params: {
  encodedDrawing: string
  privateRoundData: ArtAcademyPrivateRoundData
}) {
  const drawingCells = new Uint8Array(
    Buffer.from(params.encodedDrawing, 'base64url'),
  )
  const referenceCells = new Uint8Array(
    Buffer.from(params.privateRoundData.referenceCells, 'base64url'),
  )
  const expectedLength = ART_ACADEMY_SCORE_GRID_SIZE ** 2

  if (
    drawingCells.length !== expectedLength ||
    referenceCells.length !== expectedLength ||
    !hasValidArtAcademyCellValues(
      drawingCells,
      params.privateRoundData.palette.length,
    )
  ) {
    return null
  }

  return scoreArtAcademyDrawing(
    referenceCells,
    drawingCells,
    params.privateRoundData.palette,
  )
}
