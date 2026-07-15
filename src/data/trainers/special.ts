import type { TrainerClass } from './types'

export const specialTrainerClasses = [
  { id: 'ariana', name: 'Ariana', spriteId: '/sprites/trainers/special/ariana.avif', payoutModifier: 65, gender: 'f', kind: 'special', special: true },
  { id: 'bill', name: 'Bill', spriteId: '/sprites/trainers/special/bill.avif', payoutModifier: 35, gender: 'm', kind: 'special', special: true },
  { id: 'joey', name: 'Joey', spriteId: '/sprites/trainers/special/joey.avif', payoutModifier: 15, gender: 'm', kind: 'special', special: true },
  { id: 'leaf', name: 'Leaf', spriteId: '/sprites/trainers/special/leaf.avif', payoutModifier: 65, gender: 'f', kind: 'special', special: true },
  { id: 'oak', name: 'Professor Oak', spriteId: '/sprites/trainers/special/oak.avif', payoutModifier: 65, gender: 'm', kind: 'special', special: true },
  { id: 'red', name: 'Red', spriteId: '/sprites/trainers/special/red.avif', payoutModifier: 65, gender: 'm', kind: 'special', special: true },
  { id: 'rival-late', name: 'Rival', spriteId: '/sprites/trainers/icon/gb_blue.avif', payoutModifier: 65, gender: 'm', kind: 'special', special: true },
] as const satisfies readonly TrainerClass[]
