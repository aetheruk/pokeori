import { describe, expect, test } from 'bun:test'
import { readFile } from 'node:fs/promises'
import sharp from 'sharp'
import {
  getGridPlayerAppearance,
  getTrainerGender,
  GRID_TRAINER_SPRITES,
  TRAINER_GENDERS,
} from '@/utilities/trainer-appearance'
import { UpdateUserSchema } from '@/utilities/validators'

describe('trainer appearance', () => {
  test('overworld idle images preserve the first transparent source frame', async () => {
    for (const name of ['ditto', 'rattata', 'voltorb']) {
      const sheet = sharp(`public/games/overworld/${name}.png`)
      const metadata = await sheet.metadata()
      expect([metadata.width, metadata.height, metadata.hasAlpha]).toEqual([256, 256, true])
      const expected = await sheet.extract({ left: 0, top: 0, width: 64, height: 64 }).raw().toBuffer()
      const actual = await sharp(`public/games/overworld/${name}-idle.png`).raw().toBuffer()
      expect(actual.equals(expected)).toBe(true)
    }
  })

  test('legacy profiles default to Neither and all explicit choices validate', () => {
    expect(getTrainerGender(undefined)).toBe('neither')
    expect(getTrainerGender(null)).toBe('neither')
    for (const trainerGender of TRAINER_GENDERS) {
      expect(UpdateUserSchema.parse({ trainerGender }).trainerGender).toBe(
        trainerGender,
      )
    }
    for (const trainerGender of ['other', '', 1, {}, null]) {
      expect(UpdateUserSchema.safeParse({ trainerGender }).success).toBe(false)
    }
  })

  test('all sheets use down/left/right/up rows and four walking columns', async () => {
    for (const gender of TRAINER_GENDERS) {
      const metadata = await sharp(
        await readFile(`public${GRID_TRAINER_SPRITES[gender]}`),
      ).metadata()
      expect([metadata.width, metadata.height]).toEqual([256, 256])
      for (const [row, facing] of (
        ['down', 'left', 'right', 'up'] as const
      ).entries()) {
        for (let frame = 0; frame < 4; frame++) {
          expect(getGridPlayerAppearance(gender, facing, frame)).toEqual({
            src: GRID_TRAINER_SPRITES[gender],
            backgroundSize: '400% 400%',
            backgroundPosition: `${(frame * 100) / 3}% ${(row * 100) / 3}%`,
          })
        }
      }
      expect(getGridPlayerAppearance(gender, 'down', 4)).toEqual(
        getGridPlayerAppearance(gender, 'down', 0),
      )
    }
  })

  test('Neither renders the selected directional Ditto frame', async () => {
    expect(
      (
        await sharp(
          await readFile(`public${GRID_TRAINER_SPRITES.neither}`),
        ).metadata()
      ).width,
    ).toBeGreaterThan(0)
    expect(getGridPlayerAppearance('neither', 'up', 3)).toEqual({
      src: GRID_TRAINER_SPRITES.neither,
      backgroundSize: '400% 400%',
      backgroundPosition: '100% 100%',
    })
  })
})
