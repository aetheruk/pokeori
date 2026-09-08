export const TRAINER_GENDERS = ['male', 'female', 'neither'] as const
export type TrainerGender = (typeof TRAINER_GENDERS)[number]
export type GridPlayerDirection = 'down' | 'left' | 'right' | 'up'

export const GRID_TRAINER_SPRITES = {
  male: '/games/trainers/lucas.png',
  female: '/games/trainers/dawn.png',
  neither: '/sprites/pokemon/gen-v/front/normal/132.avif',
} as const

export function getTrainerGender(value: unknown): TrainerGender {
  return value === 'male' || value === 'female' ? value : 'neither'
}

export function getGridPlayerAppearance(
  gender: unknown,
  direction: GridPlayerDirection = 'down',
  step = 0,
) {
  const selection = getTrainerGender(gender)
  const row = { down: 0, left: 1, right: 2, up: 3 }[direction]
  const frame = ((Math.trunc(step) % 4) + 4) % 4
  return {
    src: GRID_TRAINER_SPRITES[selection],
    backgroundSize: selection === 'neither' ? 'contain' : '400% 400%',
    backgroundPosition:
      selection === 'neither'
        ? 'center'
        : `${(frame * 100) / 3}% ${(row * 100) / 3}%`,
  }
}
