export type TrainerSection =
  | 'profile'
  | 'decks'
  | 'trainers'
  | 'friends'
  | 'gift'
  | 'rankings'

export const TRAINER_SECTIONS = new Set<TrainerSection>([
  'profile',
  'decks',
  'trainers',
  'friends',
  'gift',
  'rankings',
])

const KID_RESTRICTED_SECTIONS = new Set<TrainerSection>([
  'trainers',
  'friends',
  'gift',
  'rankings',
])

export function resolveTrainerSection(
  requested: string | undefined,
  options: { hasDeckBox: boolean; isKidMode: boolean },
): TrainerSection {
  if (!TRAINER_SECTIONS.has(requested as TrainerSection)) return 'profile'
  const section = requested as TrainerSection
  if (section === 'decks' && !options.hasDeckBox) return 'profile'
  if (options.isKidMode && KID_RESTRICTED_SECTIONS.has(section))
    return 'profile'
  return section
}

export function getTrainerSectionHref(section: TrainerSection) {
  return section === 'profile' ? '/game' : `/game?section=${section}`
}
