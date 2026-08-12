import type { KantoGymChronicleKey } from '@/data/gym-leader-chronicles'
import { blaineChronicleStory } from './gym-leader-chronicles/stories/blaine'
import { brockChronicleStory } from './gym-leader-chronicles/stories/brock'
import { erikaChronicleStory } from './gym-leader-chronicles/stories/erika'
import { giovanniChronicleStory } from './gym-leader-chronicles/stories/giovanni'
import { kogaChronicleStory } from './gym-leader-chronicles/stories/koga'
import { mistyChronicleStory } from './gym-leader-chronicles/stories/misty'
import { sabrinaChronicleStory } from './gym-leader-chronicles/stories/sabrina'
import { surgeChronicleStory } from './gym-leader-chronicles/stories/surge'
import type { KantoGymChronicleStory } from './gym-leader-chronicles/types'

export type {
  ChronicleActivityBeat,
  ChronicleCharacter,
  ChronicleNarrationPanel,
  ChronicleNarrativePanel,
  ChronicleSceneBeat,
  ChronicleSpeechPanel,
  ChronicleStoryBeat,
  KantoGymChronicleStory,
} from './gym-leader-chronicles/types'

export const KANTO_GYM_CHRONICLE_STORIES: Record<
  KantoGymChronicleKey,
  KantoGymChronicleStory
> = {
  brock: brockChronicleStory,
  misty: mistyChronicleStory,
  surge: surgeChronicleStory,
  erika: erikaChronicleStory,
  koga: kogaChronicleStory,
  sabrina: sabrinaChronicleStory,
  blaine: blaineChronicleStory,
  giovanni: giovanniChronicleStory,
}

/**
 * Versioned IDs deliberately make the rebuilt anthology incompatible with
 * partial progress recorded against the shorter first edition.
 */
export function chronicleActivityId(
  key: KantoGymChronicleKey,
  activityId: string,
): string {
  return `chronicle-v2-${key}-${activityId}`
}
