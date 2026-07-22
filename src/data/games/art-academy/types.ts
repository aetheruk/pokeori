import { BaseGameConfig } from '../shared'

export interface ArtAcademySettings {
  /** Pokemon form id used to resolve the normal bundled HOME sprite. */
  formId: string
  /** Seconds available to finish the drawing. */
  timeLimit: number
  /** Required server-calculated similarity score, from 50 through 100. */
  successThreshold: number
  /** Maximum representative sprite colours offered to the player. Defaults to 12. */
  paletteSize?: number
}

export interface ArtAcademyGameConfig extends BaseGameConfig {
  settings: ArtAcademySettings
}
