import { gymTrainerClasses } from './gym'
import { trainerIconSprites } from './icons'
import { normalTrainerClasses } from './normal'
import { specialTrainerClasses } from './special'
import type { TrainerClass, TrainerSpriteConfig } from './types'

export const trainerClasses = [
  ...normalTrainerClasses,
  ...gymTrainerClasses,
  ...specialTrainerClasses,
] as const satisfies readonly TrainerClass[]

export type TrainerClassId = (typeof trainerClasses)[number]['id']

export const trainerSprites = [
  ...trainerClasses,
  ...trainerIconSprites,
] as const satisfies readonly TrainerSpriteConfig[]

export type TrainerSpriteId = (typeof trainerSprites)[number]['id']

export const trainerClassById = Object.fromEntries(
  trainerClasses.map((trainerClass) => [trainerClass.id, trainerClass]),
) as Record<TrainerClassId, TrainerClass>

export const trainerSpriteById = Object.fromEntries(
  trainerSprites.map((trainerSprite) => [trainerSprite.id, trainerSprite]),
) as Record<TrainerSpriteId, TrainerSpriteConfig>

export function getTrainerClass(trainerClassId: TrainerClassId): TrainerClass {
  return trainerClassById[trainerClassId]
}

export function getTrainerSprite(trainerSpriteId: TrainerSpriteId): TrainerSpriteConfig {
  return trainerSpriteById[trainerSpriteId]
}

export function getTrainerSpriteUrl(trainerSpriteId: string): string {
  return trainerSpriteById[trainerSpriteId as TrainerSpriteId]?.spriteId || '/sprites/trainers/youngster.avif'
}

export function getVsSeekerTrainerClasses(): TrainerClass[] {
  return trainerClasses.filter(
    (trainerClass) => !trainerClass.special && 'vsSeeker' in trainerClass && trainerClass.vsSeeker,
  )
}

export function buildTrainerDisplayName(params: {
  trainerClassId: TrainerClassId
  trainerName?: string
}): string {
  const trainerClass = getTrainerClass(params.trainerClassId)
  const trainerName = params.trainerName?.trim()

  if (trainerClass.special) return trainerClass.name
  if (!trainerName) return trainerClass.name
  return `${trainerClass.name} ${trainerName}`
}
