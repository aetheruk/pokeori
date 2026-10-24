import { getOverworldSpriteIdForProfileIcon, getOverworldSpriteSheet } from '@/data/games/overworld-sprites'
import { getIcon } from '@/data/user/icons'
import { getTrainerSprite } from '@/data/trainers'

export const TRAINER_GENDERS = ['male', 'female', 'neither'] as const
export type TrainerGender = (typeof TRAINER_GENDERS)[number]
export type GridPlayerDirection = 'down' | 'left' | 'right' | 'up'

export const GRID_TRAINER_SPRITES = {
  male: '/games/trainers/lucas.png',
  female: '/games/trainers/dawn.png',
  neither: '/games/overworld/ditto.png',
} as const

interface GridPlayerAppearance {
  src: string
  frameAspect: number
  backgroundSize: string
  backgroundPosition: string
  isStatic?: boolean
}

export function getTrainerGender(value: unknown): TrainerGender {
  return value === 'male' || value === 'female' ? value : 'neither'
}

export function getGridPlayerAppearance(
  gender: unknown,
  direction: GridPlayerDirection = 'down',
  step = 0,
  iconId?: string | null,
): GridPlayerAppearance {
  const selection = getTrainerGender(gender)
  const row = { down: 0, left: 1, right: 2, up: 3 }[direction]
  const frame = ((Math.trunc(step) % 4) + 4) % 4
  const iconSpriteId = getOverworldSpriteIdForProfileIcon(iconId)
  const iconSheet = iconSpriteId ? getOverworldSpriteSheet(iconSpriteId) : null

  // Trainer portraits are registered alongside their battle trainer records.
  // When a matching directional sheet is not in the overworld pack, keep the
  // chosen trainer recognizable instead of silently replacing them with Lucas.
  const profileIcon = iconId ? getIcon(iconId) : undefined
  const trainerId = profileIcon?.icon.type === 'trainer'
    ? profileIcon.icon.id
    : iconId
  const trainerSprite = trainerId
    ? getTrainerSprite(trainerId as Parameters<typeof getTrainerSprite>[0])
    : undefined
  if (!iconSheet && trainerSprite) {
    return {
      src: trainerSprite.spriteId,
      frameAspect: 1,
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      isStatic: true,
    }
  }

  const sprite = iconSheet || {
    src: GRID_TRAINER_SPRITES[selection],
    frameWidth: 64,
    frameHeight: 64,
    columns: 4,
    rows: 4,
  }
  const spriteFrame = frame % sprite.columns
  const spriteRow = Math.min(row, sprite.rows - 1)
  return {
    src: sprite.src,
    frameAspect: sprite.frameWidth / sprite.frameHeight,
    backgroundSize: `${sprite.columns * 100}% ${sprite.rows * 100}%`,
    backgroundPosition: `${(spriteFrame * 100) / (sprite.columns - 1)}% ${(spriteRow * 100) / (sprite.rows - 1)}%`,
  }
}
