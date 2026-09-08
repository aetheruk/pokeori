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

  test('human sheets use down/left/right/up rows and four walking columns', async () => {
    for (const gender of ['male', 'female'] as const) {
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

  test('Neither always renders a complete Ditto, never a cropped trainer frame', async () => {
    expect(
      (
        await sharp(
          await readFile(`public${GRID_TRAINER_SPRITES.neither}`),
        ).metadata()
      ).width,
    ).toBeGreaterThan(0)
    expect(getGridPlayerAppearance('neither', 'up', 3)).toEqual({
      src: GRID_TRAINER_SPRITES.neither,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
    })
  })
})
