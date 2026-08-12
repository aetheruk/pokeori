import type {
  ChronicleNarrativePhase,
  ExpeditionActivityType,
} from '@/data/expeditions/types'
import type { TaskIcon } from '@/data/tasks/types'

export interface ChronicleCharacter {
  name: string
  icon: TaskIcon
}

export interface ChronicleSpeechPanel {
  kind: 'speech'
  message: string
  speaker: ChronicleCharacter
  background?: string
}

export interface ChronicleNarrationPanel {
  kind: 'narration'
  message: string
  background?: string
  icon?: 'badge' | 'incense'
}

export type ChronicleNarrativePanel =
  | ChronicleSpeechPanel
  | ChronicleNarrationPanel

export interface ChronicleSceneBeat {
  type: 'scene'
  id: string
  title: string
  description: string
  background: string
  panels: ChronicleNarrativePanel[]
  phase: ChronicleNarrativePhase
  phaseTitle: string
}

export interface ChronicleActivityBeat {
  type: Extract<ExpeditionActivityType, 'battle' | 'game'>
  id: string
  phase: ChronicleNarrativePhase
  phaseTitle: string
}

export type ChronicleStoryBeat = ChronicleSceneBeat | ChronicleActivityBeat

export interface KantoGymChronicleStory {
  sequence: ChronicleStoryBeat[]
}
