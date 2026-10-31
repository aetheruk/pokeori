import type { TrainerSpriteConfig } from './types'

export const trainerIconSprites = [
  { id: 'gb-blue', name: 'Blue', spriteId: '/sprites/trainers/icon/gb_blue.avif', overworldSpriteId: 'trainer-gb-blue', gender: 'm', kind: 'icon' },
  { id: 'gb-blue-2', name: 'Blue', spriteId: '/sprites/trainers/icon/gb_blue_2.avif', overworldSpriteId: 'trainer-gb-blue', gender: 'm', kind: 'icon' },
  { id: 'gb-red', name: 'Red', spriteId: '/sprites/trainers/icon/gb_red.avif', overworldSpriteId: 'trainer-gb-red', gender: 'm', kind: 'icon' },
  { id: 'gb-red-2', name: 'Red', spriteId: '/sprites/trainers/icon/gb_red_2.avif', overworldSpriteId: 'trainer-gb-red', gender: 'm', kind: 'icon' },
  { id: 'rocket', name: 'Team Rocket', spriteId: '/sprites/trainers/icon/rocket.avif', overworldSpriteId: 'trainer-rocket-grunt-m', gender: 'm', kind: 'icon' },
  { id: 'fuji', name: 'Fuji', spriteId: '/sprites/trainers/special/fuji.avif', gender: 'm', kind: 'icon', overworldSpriteId: 'trainer-gentleman' },
] as const satisfies readonly TrainerSpriteConfig[]
