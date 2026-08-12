import type { ChronicleNarrativePhase } from '@/data/expeditions/types'
import type { TaskIcon } from '@/data/tasks/types'
import type {
  ChronicleActivityBeat,
  ChronicleCharacter,
  ChronicleNarrationPanel,
  ChronicleSceneBeat,
  ChronicleSpeechPanel,
} from './types'

export const PHASE_TITLES: Record<ChronicleNarrativePhase, string> = {
  backstory: 'Backstory',
  development: 'Development',
  conflict: 'Conflict',
  contemplation: 'Contemplation',
  resolution: 'Resolution',
  reflection: 'Reflection',
}

export const trainer = (id: string): TaskIcon => ({ type: 'trainer', id })
export const local = (id: string): TaskIcon => ({ type: 'local', id })
export const pokemon = (id: string | number): TaskIcon => ({
  type: 'pokemon',
  id: String(id),
})
export const item = (id: string): TaskIcon => ({ type: 'item', id })

export const character = (
  name: string,
  icon: TaskIcon,
): ChronicleCharacter => ({ name, icon })

export const speech = (
  speaker: ChronicleCharacter,
  message: string,
  background?: string,
): ChronicleSpeechPanel => ({ kind: 'speech', speaker, message, background })

export const narration = (
  message: string,
  options: {
    background?: string
    icon?: 'badge' | 'incense'
  } = {},
): ChronicleNarrationPanel => ({ kind: 'narration', message, ...options })

export const scene = (
  phase: ChronicleNarrativePhase,
  id: string,
  title: string,
  description: string,
  background: string,
  panels: ChronicleSceneBeat['panels'],
): ChronicleSceneBeat => ({
  type: 'scene',
  phase,
  phaseTitle: PHASE_TITLES[phase],
  id,
  title,
  description,
  background,
  panels,
})

export const battle = (
  phase: ChronicleNarrativePhase,
  id: string,
): ChronicleActivityBeat => ({
  type: 'battle',
  id,
  phase,
  phaseTitle: PHASE_TITLES[phase],
})

export const game = (
  phase: ChronicleNarrativePhase,
  id: string,
): ChronicleActivityBeat => ({
  type: 'game',
  id,
  phase,
  phaseTitle: PHASE_TITLES[phase],
})
