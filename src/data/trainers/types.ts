export type TrainerGender = 'm' | 'f'
export type TrainerKind = 'normal' | 'gym' | 'special' | 'icon'

export interface TrainerSpriteConfig {
  id: string
  name: string
  spriteId: string
  gender: TrainerGender
  kind: TrainerKind
}

export interface TrainerClass extends TrainerSpriteConfig {
  payoutModifier: number
  special: boolean
  vsSeeker?: boolean
}
