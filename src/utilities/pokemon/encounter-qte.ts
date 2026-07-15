import type { Item } from '@/data/items'

export type EncounterQteType = 'focus' | 'calm' | 'scare' | 'chase'
export type EncounterQteStatus = 'pending' | 'active' | 'completed' | 'failed'

export interface EncounterQteState {
  id: string
  type: EncounterQteType
  status: EncounterQteStatus
  offeredAt?: number
  success?: boolean
  catchStageBonus?: number
  berryOptions?: string[]
  correctBerryId?: string
  decoyFormIds?: string[]
  tapTarget?: number
}

export interface PublicEncounterQte {
  id: string
  type: EncounterQteType
  berryOptions?: string[]
  correctBerryId?: string
  decoyFormIds?: string[]
  tapTarget?: number
}

export type EncounterQteCompletionPayload =
  | { type: 'focus'; completedCircles?: number }
  | { type: 'calm'; berryId?: string }
  | { type: 'scare'; tappedDecoys?: number; hitTarget?: boolean }
  | { type: 'chase'; tapCount?: number }

export const ENCOUNTER_QTE_CHANCE = 0.3
export const ENCOUNTER_QTE_MIN_QUESTIONS = 2
export const ENCOUNTER_QTE_FORCE_AFTER_QUESTIONS = 3

export const ENCOUNTER_QTE_STAGE_BONUS: Record<EncounterQteType, number> = {
  calm: 1,
  chase: 1.5,
  focus: 1.5,
  scare: 2,
}

export const SCARE_QTE_DECOY_COUNT = 6
export const CHASE_QTE_TAP_COUNT = 12
export const UNOWN_SCARE_DECOY_FORM_IDS = [
  '201',
  '201-b',
  '201-c',
  '201-d',
  '201-e',
  '201-f',
  '201-g',
  '201-h',
  '201-i',
  '201-j',
  '201-k',
  '201-l',
  '201-m',
  '201-n',
  '201-o',
  '201-p',
  '201-q',
  '201-r',
  '201-s',
  '201-t',
  '201-u',
  '201-v',
  '201-w',
  '201-x',
  '201-y',
  '201-z',
  '201-exclamation',
  '201-question',
]

export function serializeEncounterQte(qte?: EncounterQteState): PublicEncounterQte | undefined {
  if (qte?.status !== 'active') return undefined
  return {
    id: qte.id,
    type: qte.type,
    berryOptions: qte.berryOptions,
    correctBerryId: qte.correctBerryId,
    decoyFormIds: qte.decoyFormIds,
    tapTarget: qte.tapTarget,
  }
}

function shuffleCopy<T>(items: T[], random: () => number): T[] {
  const copy = [...items]
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1))
    const value = copy[index]
    copy[index] = copy[swapIndex]
    copy[swapIndex] = value
  }
  return copy
}

export function buildScareQteDecoyFormIds({
  encounterPool,
  activeFormId,
  count = SCARE_QTE_DECOY_COUNT,
  random = Math.random,
}: {
  encounterPool?: { speciesId: number; formId?: string }[]
  activeFormId: string
  count?: number
  random?: () => number
}): string[] {
  const uniqueLocationFormIds = new Set<string>()
  for (const encounter of encounterPool || []) {
    const candidateFormId = String(encounter.formId || encounter.speciesId)
    if (candidateFormId !== activeFormId) {
      uniqueLocationFormIds.add(candidateFormId)
    }
  }

  const source =
    uniqueLocationFormIds.size > 0
      ? Array.from(uniqueLocationFormIds)
      : UNOWN_SCARE_DECOY_FORM_IDS.filter((formId) => formId !== activeFormId)
  const decoys: string[] = []

  while (decoys.length < count) {
    const shuffled = shuffleCopy(source, random)
    decoys.push(...shuffled.slice(0, count - decoys.length))
  }

  return decoys
}

export function buildEncounterQte({
  inventory,
  items,
  random = Math.random,
}: {
  inventory: Record<string, number>
  items: Item[]
  random?: () => number
}): EncounterQteState | undefined {
  const ownedBerries = items
    .filter((item) => item.category === 'berry' && (inventory[item.id] || 0) > 0)
    .map((item) => item.id)
  const types: EncounterQteType[] = ['focus', 'scare', 'chase']
  if (ownedBerries.length >= 3) types.push('calm')

  const type = types[Math.floor(random() * types.length)] || 'focus'
  const qte: EncounterQteState = {
    id: crypto.randomUUID(),
    type,
    status: 'pending',
  }

  if (type === 'calm') {
    const pool = [...ownedBerries].sort(() => random() - 0.5).slice(0, 3)
    qte.berryOptions = pool
    qte.correctBerryId = pool[Math.floor(random() * pool.length)]
  } else if (type === 'chase') {
    qte.tapTarget = CHASE_QTE_TAP_COUNT
  }

  return qte
}

export function shouldRollEncounterQte({
  normalQuestionsSinceLastQte,
  shieldActive,
  random = Math.random,
}: {
  normalQuestionsSinceLastQte: number
  shieldActive?: boolean
  random?: () => number
}): boolean {
  if (shieldActive) return false
  if (normalQuestionsSinceLastQte < ENCOUNTER_QTE_MIN_QUESTIONS) return false
  if (normalQuestionsSinceLastQte >= ENCOUNTER_QTE_FORCE_AFTER_QUESTIONS) return true
  return random() < ENCOUNTER_QTE_CHANCE
}

export function activateEncounterQte(qte: EncounterQteState, now = Date.now()): EncounterQteState {
  qte.status = 'active'
  qte.offeredAt = now
  return qte
}

export function completeEncounterQteState(
  qte: EncounterQteState,
  payload: EncounterQteCompletionPayload,
): EncounterQteState {
  let success = false

  if (qte.type === 'focus' && payload.type === 'focus') {
    success = Math.floor(payload.completedCircles || 0) >= 3
  } else if (qte.type === 'calm' && payload.type === 'calm') {
    success = !!payload.berryId && payload.berryId === qte.correctBerryId
  } else if (qte.type === 'scare' && payload.type === 'scare') {
    success = Math.floor(payload.tappedDecoys || 0) >= 6 && payload.hitTarget !== true
  } else if (qte.type === 'chase' && payload.type === 'chase') {
    success = Math.floor(payload.tapCount || 0) >= (qte.tapTarget || CHASE_QTE_TAP_COUNT)
  }

  qte.success = success
  qte.status = success ? 'completed' : 'failed'
  qte.catchStageBonus = success ? ENCOUNTER_QTE_STAGE_BONUS[qte.type] : 0
  return qte
}
