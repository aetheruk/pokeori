import type { TrainerSpriteConfig } from './types'

export const trainerIconSprites = [
  { id: 'gb-blue', name: 'Blue', spriteId: '/sprites/trainers/icon/gb_blue.avif', gender: 'm', kind: 'icon' },
  { id: 'gb-blue-2', name: 'Blue', spriteId: '/sprites/trainers/icon/gb_blue_2.avif', gender: 'm', kind: 'icon' },
  { id: 'gb-red', name: 'Red', spriteId: '/sprites/trainers/icon/gb_red.avif', gender: 'm', kind: 'icon' },
  { id: 'gb-red-2', name: 'Red', spriteId: '/sprites/trainers/icon/gb_red_2.avif', gender: 'm', kind: 'icon' },
  { id: 'rocket', name: 'Team Rocket', spriteId: '/sprites/trainers/icon/rocket.avif', gender: 'm', kind: 'icon' },
] as const satisfies readonly TrainerSpriteConfig[]
