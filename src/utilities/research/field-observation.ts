import type {
  FieldObservationGlobalPokemonEvent,
  FieldObservationPokemonPoolEntry,
  FieldObservationSettings,
  FieldObservationTimeRange,
} from '@/data/games/field-observation/types'
import { EVOLUTIONS } from '@/data/evolutions'
import {
  calculatePokemonContentSkillXpWithModifier,
  getAveragePokemonBaseExperienceXpModifier,
} from '@/data/skills/xp'
import { getPokemonForm, getPokemonSpecies } from '@/utilities/pokemon/pokedex'
import { rollPokemonGender, type PokemonGender } from '@/utilities/pokemon/gender'
import type { Reward } from '@/data/types'

type NormalizedFieldObservationPoolEntry = Required<
  Omit<FieldObservationPokemonPoolEntry, 'requirements'>
>

export type FieldObservationMovement =
  | 'still'
  | 'left-to-right'
  | 'right-to-left'
  | 'up'
  | 'down'

export type FieldObservationSizeVariant = 'normal' | 'large' | 'small'
export type FieldObservationSurveyFocus =
  | 'standard'
  | 'count-survey'
  | 'material-survey'
  | 'berry-survey'
  | 'salvage-survey'
  | 'swarm-survey'
  | 'rare-trace'

export type FieldObservationCollectibleKind = 'material' | 'nut' | 'berry' | 'broken-ball' | 'item'

export interface FieldObservationSpawn {
  id: string
  speciesId: number
  formId: string
  name: string
  level: number
  startMs: number
  durationMs: number
  x: number
  y: number
  scale: number
  movement: FieldObservationMovement
  sizeVariant: FieldObservationSizeVariant
  shiny: boolean
  gender: PokemonGender
  hidden: boolean
  wave: number
  event: 'rustle' | 'flash' | null
}

export interface FieldObservationQuestionOption {
  id: string
  label: string
  speciesId?: number
}

export interface FieldObservationQuestion {
  id: string
  type: string
  prompt: string
  options: FieldObservationQuestionOption[]
}

export interface FieldObservationAvailablePokemon {
  speciesId: number
  formId: string
  name: string
}

export interface FieldObservationPublicCollectibleDrop {
  id: string
  itemId: string
  label: string
  kind: FieldObservationCollectibleKind
  startMs: number
  durationMs: number
  x: number
  y: number
}

export interface FieldObservationPrivateCollectibleDrop extends FieldObservationPublicCollectibleDrop {
  reward: Reward
}

export interface FieldObservationPublicRoundData {
  gameType: 'field-observation'
  observationDurationMs: number
  answerDurationMs: number
  difficulty: number
  surveyFocus: FieldObservationSurveyFocus
  spawns: FieldObservationSpawn[]
  availablePokemon: FieldObservationAvailablePokemon[]
  collectibleDrops: FieldObservationPublicCollectibleDrop[]
  collectedDropIds?: string[]
  question: FieldObservationQuestion
}

export interface FieldObservationRewardSubject {
  speciesId: number
  formId: string
  level: number
  baseExperience?: number
  pokemonResearchXp: number
}

export interface FieldObservationPrivateRoundData {
  correctOptionId: string
  questionType: string
  countAnswer?: Record<string, number>
  rewardSubjects: FieldObservationRewardSubject[]
  surveyFocus: FieldObservationSurveyFocus
  collectibleDrops: FieldObservationPrivateCollectibleDrop[]
  collectedDropIds?: string[]
}

export interface FieldObservationSpawnModifiers {
  spawnCountMultiplier?: number
  shinyChanceMultiplier?: number
  hiddenChanceMultiplier?: number
  eventChanceMultiplier?: number
}

export interface GeneratedFieldObservationRound {
  publicRoundData: FieldObservationPublicRoundData
  privateRoundData: FieldObservationPrivateRoundData
}

interface QuestionCandidate {
  question: FieldObservationQuestion
  correctOptionId: string
  rewardSpeciesIds: number[]
}

type RandomFn = () => number

const TYPE_NAMES = [
  'Normal',
  'Fire',
  'Water',
  'Electric',
  'Grass',
  'Ice',
  'Fighting',
  'Poison',
  'Ground',
  'Flying',
  'Psychic',
  'Bug',
  'Rock',
  'Ghost',
  'Dragon',
  'Dark',
  'Steel',
  'Fairy',
]

const MOVEMENTS: FieldObservationMovement[] = [
  'still',
  'left-to-right',
  'right-to-left',
  'up',
  'down',
]

const evolutionNeighbors = new Map<number, Set<number>>()

for (const [source, evolutions] of Object.entries(EVOLUTIONS)) {
  const sourceId = Number(source)
  if (!evolutionNeighbors.has(sourceId)) evolutionNeighbors.set(sourceId, new Set())
  for (const evolution of evolutions) {
    if (!evolutionNeighbors.has(evolution.speciesId)) {
      evolutionNeighbors.set(evolution.speciesId, new Set())
    }
    evolutionNeighbors.get(sourceId)?.add(evolution.speciesId)
    evolutionNeighbors.get(evolution.speciesId)?.add(sourceId)
  }
}

export function getFieldObservationSessionSeconds(settings: FieldObservationSettings): number {
  return (
    resolveFieldObservationDurationSeconds(settings.timeLimit, 60, 'max') +
    resolveFieldObservationDurationSeconds(settings.answerTimeLimit, 15, 'max')
  )
}

export function generateFieldObservationRound(
  settings: FieldObservationSettings,
  random: RandomFn = Math.random,
  options: {
    globalPokemonEvent?: FieldObservationGlobalPokemonEvent | null
    spawnModifiers?: FieldObservationSpawnModifiers
    spawnModifierResolver?: (surveyFocus: FieldObservationSurveyFocus) => FieldObservationSpawnModifiers
  } = {},
): GeneratedFieldObservationRound {
  const difficulty = clampInteger(settings.difficulty || 1, 1, 10)
  const observationDurationMs =
    resolveFieldObservationDurationSeconds(settings.timeLimit, 60, 'roll', random) * 1000
  const answerDurationMs =
    resolveFieldObservationDurationSeconds(settings.answerTimeLimit, 15, 'roll', random) * 1000
  const pool = normalizePool(settings.pokemonPool)
  const surveyFocus = pickSurveyFocus(random)
  const spawnModifiers = options.spawnModifierResolver
    ? options.spawnModifierResolver(surveyFocus)
    : options.spawnModifiers
  const spawns = [
    ...generateSpawns(
      settings,
      pool,
      difficulty,
      observationDurationMs,
      surveyFocus,
      random,
      spawnModifiers,
    ),
    ...generateGlobalPokemonSpawns(settings, observationDurationMs, options.globalPokemonEvent, random),
  ].sort((a, b) => a.startMs - b.startMs)
  const selected =
    surveyFocus === 'count-survey'
      ? buildCountSurveyQuestion(spawns)
      : buildStandardQuestion(spawns, pool, random)
  const rewardSubjects = buildRewardSubjects(spawns)

  return {
    publicRoundData: {
      gameType: 'field-observation',
      observationDurationMs,
      answerDurationMs,
      difficulty,
      surveyFocus,
      spawns,
      availablePokemon: buildAvailablePokemon(pool, spawns),
      collectibleDrops: [],
      question: selected.question,
    },
    privateRoundData: {
      correctOptionId: selected.correctOptionId,
      questionType: selected.question.type,
      countAnswer: surveyFocus === 'count-survey' ? buildCountAnswer(spawns, pool) : undefined,
      rewardSubjects,
      surveyFocus,
      collectibleDrops: [],
    },
  }
}

function generateGlobalPokemonSpawns(
  settings: FieldObservationSettings,
  observationDurationMs: number,
  event: FieldObservationGlobalPokemonEvent | null | undefined,
  random: RandomFn,
): FieldObservationSpawn[] {
  if (!event || observationDurationMs <= 0) return []

  const formId = event.formId || event.speciesId.toString()
  const formData = getPokemonForm(formId) || getPokemonSpecies(event.speciesId)
  const durationMs = Math.min(
    Math.round(randomRange(2800, 4200, random)),
    Math.max(1000, observationDurationMs - 800),
  )
  const latestStart = Math.max(0, observationDurationMs - durationMs - 500)

  return [
    {
      id: `global-${event.id}`,
      speciesId: event.speciesId,
      formId,
      name: formData?.name || `Pokemon #${event.speciesId}`,
      level: rollLevel(settings.levelRange.min, settings.levelRange.max, random),
      startMs: Math.round(randomRange(500, latestStart, random)),
      durationMs,
      x: Math.round(randomRange(12, 78, random)),
      y: Math.round(randomRange(14, 68, random)),
      scale: Number(randomRange(1.08, 1.24, random).toFixed(2)),
      movement: MOVEMENTS[Math.floor(random() * MOVEMENTS.length)],
      sizeVariant: 'large',
      shiny: false,
      gender: rollPokemonGender(event.speciesId, random),
      hidden: false,
      wave: 0,
      event: 'flash',
    },
  ]
}

export function isFieldObservationAnswerCorrect(
  privateRoundData: FieldObservationPrivateRoundData | undefined,
  answer: unknown,
): boolean {
  if (!privateRoundData) return false
  if (privateRoundData.questionType === 'count-survey') {
    return isFieldObservationCountAnswerCorrect(privateRoundData.countAnswer, answer)
  }
  return String(answer) === privateRoundData.correctOptionId
}

export function calculateFieldObservationSkillXp(
  contentLevel: number,
  outcomeModifier = 1,
  pokemonBaseExperienceModifier = 1,
): number {
  return calculatePokemonContentSkillXpWithModifier(
    'researching',
    contentLevel,
    pokemonBaseExperienceModifier,
    outcomeModifier,
  )
}

export function getFieldObservationCollectedItemXpModifier(collectedItemCount: number): number {
  const safeCount = Math.max(0, Math.floor(collectedItemCount || 0))
  return 1 + Math.min(0.4, safeCount * 0.04)
}

export function getFieldObservationBaseExperienceXpModifier(
  subjects: FieldObservationRewardSubject[],
): number {
  return getAveragePokemonBaseExperienceXpModifier(
    subjects.map((subject) => subject.baseExperience),
  )
}

export function getFieldObservationSkillXpLevel(
  subjects: FieldObservationRewardSubject[],
  fallbackRange?: { min: number; max: number },
): number {
  if (subjects.length > 0) {
    const total = subjects.reduce((sum, subject) => sum + (subject.level || 1), 0)
    return Math.round(total / subjects.length)
  }

  if (fallbackRange) {
    return Math.round((fallbackRange.min + fallbackRange.max) / 2)
  }

  return 1
}

function resolveFieldObservationDurationSeconds(
  value: number | FieldObservationTimeRange | undefined,
  fallback: number,
  mode: 'roll' | 'max',
  random: RandomFn = Math.random,
): number {
  if (typeof value === 'number') return Math.max(5, value)
  if (!value || typeof value !== 'object') return Math.max(5, fallback)

  const min = Math.max(5, Math.floor(value.min))
  const max = Math.max(min, Math.floor(value.max))
  if (mode === 'max') return max
  return Math.floor(random() * (max - min + 1)) + min
}

function normalizePool(pool: FieldObservationPokemonPoolEntry[]): NormalizedFieldObservationPoolEntry[] {
  return pool
    .filter((entry) => entry.speciesId > 0 && entry.weight > 0)
    .map((entry) => ({
      speciesId: entry.speciesId,
      formId: entry.formId || entry.speciesId.toString(),
      weight: entry.weight,
    }))
}

function buildAvailablePokemon(
  pool: NormalizedFieldObservationPoolEntry[],
  spawns: FieldObservationSpawn[] = [],
): FieldObservationAvailablePokemon[] {
  const seen = new Set<string>()
  const available: FieldObservationAvailablePokemon[] = []

  const entries = [
    ...pool.map((entry) => ({
      speciesId: entry.speciesId,
      formId: entry.formId,
    })),
    ...spawns.map((spawn) => ({
      speciesId: spawn.speciesId,
      formId: spawn.formId,
    })),
  ]

  for (const entry of entries) {
    const key = getCountAnswerKey(entry.speciesId, entry.formId)
    if (seen.has(key)) continue
    seen.add(key)
    const formData = getPokemonForm(entry.formId) || getPokemonSpecies(entry.speciesId)
    available.push({
      speciesId: entry.speciesId,
      formId: entry.formId,
      name: formData?.name || `Pokemon #${entry.speciesId}`,
    })
  }

  return available
}

function generateSpawns(
  settings: FieldObservationSettings,
  pool: NormalizedFieldObservationPoolEntry[],
  difficulty: number,
  observationDurationMs: number,
  surveyFocus: FieldObservationSurveyFocus,
  random: RandomFn,
  modifiers: FieldObservationSpawnModifiers = {},
): FieldObservationSpawn[] {
  const spawnMultiplier =
    surveyFocus === 'swarm-survey' ? 1.35 : surveyFocus === 'rare-trace' ? 0.78 : 1
  const spawnCount = Math.max(
    5,
    Math.min(
      42,
      Math.round(
        (observationDurationMs / 1000) *
          (0.3 + difficulty * 0.06) *
          spawnMultiplier *
          clampNumber(modifiers.spawnCountMultiplier ?? 1, 0.75, 1.1),
      ),
    ),
  )
  const durationMin = lerp(3000, 900, (difficulty - 1) / 9)
  const durationMax = lerp(4600, 1700, (difficulty - 1) / 9)
  const waveCount = Math.max(2, Math.min(8, Math.ceil(spawnCount / 3)))
  const waveMs = observationDurationMs / waveCount
  const shinyChance =
    (0.02 + difficulty * 0.006) * clampNumber(modifiers.shinyChanceMultiplier ?? 1, 0.5, 1)
  const sizeChance = 0.05 + difficulty * 0.012
  const hiddenChance =
    (0.04 + difficulty * 0.016) * clampNumber(modifiers.hiddenChanceMultiplier ?? 1, 0.75, 1.1)
  const eventChance =
    (0.08 + difficulty * 0.018) * clampNumber(modifiers.eventChanceMultiplier ?? 1, 0.75, 1.1)

  const spawns: FieldObservationSpawn[] = []
  const rareEntries = getRarestPoolEntries(pool)

  for (let i = 0; i < spawnCount; i++) {
    const entry =
      surveyFocus === 'rare-trace' && rareEntries.length > 0 && random() < 0.6
        ? rareEntries[Math.floor(random() * rareEntries.length)]
        : pickWeighted(pool, random)
    const formData = getPokemonForm(entry.formId) || getPokemonSpecies(entry.speciesId)
    const durationMs = Math.round(randomRange(durationMin, durationMax, random))
    const maxStart = Math.max(0, observationDurationMs - durationMs - 250)
    const startMs = Math.round(randomRange(0, maxStart, random))
    const wave = Math.min(waveCount - 1, Math.floor(startMs / waveMs))
    const sizeRoll = random()
    const sizeVariant: FieldObservationSizeVariant =
      sizeRoll < sizeChance / 2 ? 'large' : sizeRoll < sizeChance ? 'small' : 'normal'
    const scaleBase = sizeVariant === 'large' ? 1.2 : sizeVariant === 'small' ? 0.82 : 1
    const movement = MOVEMENTS[Math.floor(random() * MOVEMENTS.length)]

    spawns.push({
      id: `spawn-${i}`,
      speciesId: entry.speciesId,
      formId: entry.formId,
      name: formData?.name || `Pokemon #${entry.speciesId}`,
      level: rollLevel(settings.levelRange.min, settings.levelRange.max, random),
      startMs,
      durationMs,
      x: Math.round(randomRange(8, 82, random)),
      y: Math.round(randomRange(10, 72, random)),
      scale: Number((scaleBase * randomRange(0.88, 1.12, random)).toFixed(2)),
      movement,
      sizeVariant,
      shiny: random() < shinyChance,
      gender: rollPokemonGender(entry.speciesId, random),
      hidden: random() < hiddenChance,
      wave,
      event: random() < eventChance ? (random() < 0.5 ? 'rustle' : 'flash') : null,
    })
  }

  return spawns.sort((a, b) => a.startMs - b.startMs)
}

function pickSurveyFocus(random: RandomFn): FieldObservationSurveyFocus {
  const roll = random()
  if (roll < 0.36) return 'standard'
  if (roll < 0.48) return 'count-survey'
  if (roll < 0.62) return 'material-survey'
  if (roll < 0.74) return 'berry-survey'
  if (roll < 0.86) return 'salvage-survey'
  if (roll < 0.95) return 'swarm-survey'
  return 'rare-trace'
}

function buildStandardQuestion(
  spawns: FieldObservationSpawn[],
  pool: NormalizedFieldObservationPoolEntry[],
  random: RandomFn,
): QuestionCandidate {
  const candidates = buildQuestionCandidates(spawns, pool, random)
  return candidates[Math.floor(random() * candidates.length)] || buildFallbackQuestion(spawns)
}

function buildCountSurveyQuestion(spawns: FieldObservationSpawn[]): QuestionCandidate {
  return {
    question: {
      id: 'field-count-survey',
      type: 'count-survey',
      prompt: 'Set the Pokemon counters to match what appeared.',
      options: [{ id: 'count-survey', label: 'Submit count report' }],
    },
    correctOptionId: 'count-survey',
    rewardSpeciesIds: unique(spawns.map((spawn) => spawn.speciesId)),
  }
}

function buildCountAnswer(
  spawns: FieldObservationSpawn[],
  pool: NormalizedFieldObservationPoolEntry[],
): Record<string, number> {
  const expected: Record<string, number> = {}
  for (const entry of pool) {
    expected[getCountAnswerKey(entry.speciesId, entry.formId)] = 0
  }
  for (const spawn of spawns) {
    const key = getCountAnswerKey(spawn.speciesId, spawn.formId)
    expected[key] = (expected[key] || 0) + 1
  }
  return expected
}

function isFieldObservationCountAnswerCorrect(
  expected: Record<string, number> | undefined,
  answer: unknown,
): boolean {
  if (!expected || !answer || typeof answer !== 'object') return false
  const payload = answer as { type?: unknown; counts?: unknown }
  if (payload.type !== 'count-survey' || !payload.counts || typeof payload.counts !== 'object') {
    return false
  }

  const submitted = payload.counts as Record<string, unknown>
  const expectedMatches = Object.entries(expected).every(([key, count]) => {
    const value = submitted[key] ?? 0
    return typeof value === 'number' && Number.isInteger(value) && value === count
  })
  if (!expectedMatches) return false

  return Object.entries(submitted).every(([key, value]) => {
    if (key in expected) return true
    return typeof value === 'number' && Number.isInteger(value) && value === 0
  })
}

function getCountAnswerKey(speciesId: number, formId: string) {
  return `${speciesId}:${formId}`
}

function buildQuestionCandidates(
  spawns: FieldObservationSpawn[],
  pool: NormalizedFieldObservationPoolEntry[],
  random: RandomFn,
): QuestionCandidate[] {
  const candidates: QuestionCandidate[] = []
  const counts = countBySpecies(spawns)
  const appearedSpecies = unique(spawns.map((spawn) => spawn.speciesId))
  const poolSpecies = unique(pool.map((entry) => entry.speciesId))

  add(candidates, numberQuestion('total-count', 'How many Pokemon appeared in total?', spawns.length, spawns.length))

  for (const speciesId of appearedSpecies) {
    add(
      candidates,
      numberQuestion(
        'count-species',
        `How many ${getSpeciesName(speciesId)} appeared?`,
        counts.get(speciesId) || 0,
        spawns.length,
        [speciesId],
      ),
    )
  }

  add(candidates, speciesPredicateQuestion('exactly-once', 'Which Pokemon appeared exactly once?', poolSpecies, (id) => (counts.get(id) || 0) === 1))
  add(candidates, speciesPredicateQuestion('more-than-once', 'Which Pokemon appeared more than once?', poolSpecies, (id) => (counts.get(id) || 0) > 1))
  add(candidates, speciesPredicateQuestion('did-not-appear', 'Which Pokemon did not appear?', poolSpecies, (id) => !counts.has(id)))
  add(candidates, sameCountPairQuestion(poolSpecies, counts))
  add(candidates, uniqueSpeciesByCountQuestion('most-appeared', 'Which Pokemon appeared the most?', appearedSpecies, counts, 'max'))
  add(candidates, uniqueSpeciesByCountQuestion('least-appeared', 'Which Pokemon appeared the least?', appearedSpecies, counts, 'min'))
  add(candidates, uniqueByWeightQuestion('rarest-configured', 'Which Pokemon was the rarest possible Route survey spawn?', poolSpecies, pool))
  add(candidates, uniqueByWeightQuestion('rarest-appeared', 'Which appeared Pokemon was the rarest Route survey spawn?', appearedSpecies, pool))
  add(candidates, rarestAppearedYesNoQuestion(pool, counts))

  add(candidates, speciesPredicateQuestion('shiny-species', 'Which Pokemon was shiny?', poolSpecies, (id) => spawns.some((spawn) => spawn.speciesId === id && spawn.shiny)))
  add(candidates, numberQuestion('shiny-count', 'How many shiny Pokemon appeared?', spawns.filter((spawn) => spawn.shiny).length, Math.max(3, spawns.length)))
  addGenderQuestionCandidates(candidates, spawns, poolSpecies, random)
  add(candidates, speciesPredicateQuestion('large-species', 'Which Pokemon looked unusually large?', poolSpecies, (id) => spawns.some((spawn) => spawn.speciesId === id && spawn.sizeVariant === 'large')))
  add(candidates, speciesPredicateQuestion('small-species', 'Which Pokemon looked unusually small?', poolSpecies, (id) => spawns.some((spawn) => spawn.speciesId === id && spawn.sizeVariant === 'small')))
  add(candidates, speciesPredicateQuestion('alternate-form', 'Which Pokemon appeared in a different form?', poolSpecies, (id) => spawns.some((spawn) => spawn.speciesId === id && spawn.formId !== String(spawn.speciesId))))
  add(candidates, speciesPredicateQuestion('hidden-species', 'Which Pokemon was partly hidden?', poolSpecies, (id) => spawns.some((spawn) => spawn.speciesId === id && spawn.hidden)))

  add(candidates, firstLastQuestion('first-appeared', 'Which Pokemon appeared first?', spawns, 'first'))
  add(candidates, firstLastQuestion('last-appeared', 'Which Pokemon appeared last?', spawns, 'last'))
  add(candidates, afterSpeciesQuestion(spawns))
  add(candidates, speciesPredicateQuestion('twice-in-row', 'Which Pokemon appeared twice in a row?', poolSpecies, (id) => hasConsecutiveAppearance(spawns, id)))
  add(candidates, uniqueSpeciesBySpawnMetric('longest-visible', 'Which Pokemon stayed visible the longest?', spawns, (spawn) => spawn.durationMs, 'max'))
  add(candidates, uniqueSpeciesBySpawnMetric('shortest-visible', 'Which Pokemon stayed visible the shortest time?', spawns, (spawn) => spawn.durationMs, 'min'))

  add(candidates, speciesPredicateQuestion('left-side', 'Which Pokemon appeared on the left side of the frame?', poolSpecies, (id) => spawns.some((spawn) => spawn.speciesId === id && spawn.x < 33)))
  add(candidates, speciesPredicateQuestion('top-side', 'Which Pokemon appeared near the top of the frame?', poolSpecies, (id) => spawns.some((spawn) => spawn.speciesId === id && spawn.y < 33)))
  add(candidates, uniqueSpeciesBySpawnMetric('closest-camera', 'Which Pokemon appeared closest to the camera?', spawns, (spawn) => spawn.scale, 'max'))
  add(candidates, movementQuestion(spawns, poolSpecies, random))
  add(candidates, regionQuestion(spawns, appearedSpecies, random))
  add(candidates, speciesPredicateQuestion('hidden-overlay', 'Which Pokemon hid behind the foreground cover?', poolSpecies, (id) => spawns.some((spawn) => spawn.speciesId === id && spawn.hidden)))

  add(candidates, mostCommonTypeQuestion(spawns))
  add(candidates, typeAppearedQuestion(spawns, random))
  add(candidates, speciesByDataMetricQuestion('heaviest-appeared', 'Which appeared Pokemon was heaviest?', appearedSpecies, (id) => getPokemonMetric(id, 'weight'), 'max'))
  add(candidates, speciesByDataMetricQuestion('fastest-appeared', 'Which appeared Pokemon was fastest?', appearedSpecies, (id) => getPokemonMetric(id, 'speed'), 'max'))
  add(candidates, speciesByDataMetricQuestion('lowest-capture-rate', 'Which appeared Pokemon had the lowest capture rate?', appearedSpecies, (id) => getPokemonMetric(id, 'capture_rate'), 'min'))
  add(candidates, sameEvolutionLineQuestion(poolSpecies, appearedSpecies, random))

  add(candidates, speciesPredicateQuestion('every-wave', 'Which Pokemon appeared in every wave?', poolSpecies, (id) => appearedInEveryWave(spawns, id)))
  add(candidates, speciesPredicateQuestion('final-wave-only', 'Which Pokemon only appeared during the final wave?', poolSpecies, (id) => appearedOnlyInFinalWave(spawns, id)))
  add(candidates, appearedTogetherQuestion(poolSpecies, spawns))
  add(candidates, speciesPredicateQuestion('never-alone', 'Which Pokemon never appeared alone?', poolSpecies, (id) => neverAppearedAlone(spawns, id)))
  add(candidates, speciesPredicateQuestion('after-event', 'Which Pokemon appeared after a rustle or flash?', poolSpecies, (id) => spawns.some((spawn) => spawn.speciesId === id && spawn.event !== null)))

  return candidates
}

function add(candidates: QuestionCandidate[], candidate: QuestionCandidate | null) {
  if (candidate && candidate.question.options.length >= 2) candidates.push(candidate)
}

function addGenderQuestionCandidates(
  candidates: QuestionCandidate[],
  spawns: FieldObservationSpawn[],
  poolSpecies: number[],
  random: RandomFn,
) {
  const genderDifferenceSpecies = poolSpecies.filter(hasGenderDifferences)
  if (genderDifferenceSpecies.length === 0) return

  add(
    candidates,
    speciesPredicateQuestion(
      'female-species',
      'Which Pokemon appeared as female?',
      genderDifferenceSpecies,
      (id) => spawns.some((spawn) => spawn.speciesId === id && spawn.gender === 'female'),
    ),
  )
  add(
    candidates,
    speciesPredicateQuestion(
      'male-species',
      'Which Pokemon appeared as male?',
      genderDifferenceSpecies,
      (id) => spawns.some((spawn) => spawn.speciesId === id && spawn.gender === 'male'),
    ),
  )

  const appearedGenderDifferenceSpecies = genderDifferenceSpecies.filter((id) =>
    spawns.some((spawn) => spawn.speciesId === id),
  )
  if (appearedGenderDifferenceSpecies.length === 0) return

  const speciesId =
    appearedGenderDifferenceSpecies[Math.floor(random() * appearedGenderDifferenceSpecies.length)]
  const speciesSpawns = spawns.filter((spawn) => spawn.speciesId === speciesId)
  const femaleCount = speciesSpawns.filter((spawn) => spawn.gender === 'female').length
  const maleCount = speciesSpawns.filter((spawn) => spawn.gender === 'male').length

  add(
    candidates,
    numberQuestion(
      'female-count-species',
      `How many female ${getSpeciesName(speciesId)} appeared?`,
      femaleCount,
      speciesSpawns.length,
      [speciesId],
    ),
  )
  add(
    candidates,
    numberQuestion(
      'male-count-species',
      `How many male ${getSpeciesName(speciesId)} appeared?`,
      maleCount,
      speciesSpawns.length,
      [speciesId],
    ),
  )
  add(candidates, genderMajorityQuestion(speciesId, femaleCount, maleCount))
}

function genderMajorityQuestion(
  speciesId: number,
  femaleCount: number,
  maleCount: number,
): QuestionCandidate {
  const correct = femaleCount > maleCount ? 'female' : maleCount > femaleCount ? 'male' : 'same'

  return {
    question: {
      id: 'field-gender-majority-species',
      type: 'gender-majority-species',
      prompt: `Were there more male or female ${getSpeciesName(speciesId)}?`,
      options: [
        { id: 'gender:male', label: 'Male' },
        { id: 'gender:female', label: 'Female' },
        { id: 'gender:same', label: 'Same' },
      ],
    },
    correctOptionId: `gender:${correct}`,
    rewardSpeciesIds: [speciesId],
  }
}

function numberQuestion(
  type: string,
  prompt: string,
  correct: number,
  maxValue: number,
  rewardSpeciesIds: number[] = [],
): QuestionCandidate {
  const values = new Set<number>([correct])
  let offset = 1
  while (values.size < 4 && (correct - offset >= 0 || correct + offset <= maxValue + 2)) {
    if (correct - offset >= 0) values.add(correct - offset)
    if (correct + offset <= maxValue + 2) values.add(correct + offset)
    offset += 1
  }

  const options = Array.from(values)
    .slice(0, 4)
    .sort((a, b) => a - b)
    .map((value) => ({
      id: `number:${value}`,
      label: value.toString(),
    }))

  return {
    question: {
      id: `field-${type}`,
      type,
      prompt,
      options,
    },
    correctOptionId: `number:${correct}`,
    rewardSpeciesIds,
  }
}

function speciesPredicateQuestion(
  type: string,
  prompt: string,
  speciesIds: number[],
  predicate: (speciesId: number) => boolean,
): QuestionCandidate | null {
  const correct = speciesIds.filter(predicate)
  const incorrect = speciesIds.filter((id) => !predicate(id))
  if (correct.length === 0 || incorrect.length === 0) return null

  const correctId = correct[0]
  const optionIds = unique([correctId, ...incorrect]).slice(0, 4)
  return speciesQuestion(type, prompt, correctId, optionIds)
}

function speciesQuestion(
  type: string,
  prompt: string,
  correctSpeciesId: number,
  optionSpeciesIds: number[],
): QuestionCandidate | null {
  const optionIds = unique([correctSpeciesId, ...optionSpeciesIds]).slice(0, 4)
  if (optionIds.length < 2) return null

  return {
    question: {
      id: `field-${type}`,
      type,
      prompt,
      options: optionIds.map((speciesId) => ({
        id: `species:${speciesId}`,
        label: getSpeciesName(speciesId),
        speciesId,
      })),
    },
    correctOptionId: `species:${correctSpeciesId}`,
    rewardSpeciesIds: [correctSpeciesId],
  }
}

function sameCountPairQuestion(speciesIds: number[], counts: Map<number, number>): QuestionCandidate | null {
  const pairs = getPairs(speciesIds)
  const correctPairs = pairs.filter(([a, b]) => (counts.get(a) || 0) === (counts.get(b) || 0))
  const incorrectPairs = pairs.filter(([a, b]) => (counts.get(a) || 0) !== (counts.get(b) || 0))
  if (correctPairs.length === 0 || incorrectPairs.length === 0) return null
  const correct = correctPairs[0]
  const options = [correct, ...incorrectPairs].slice(0, 4)
  return pairQuestion('same-count-pair', 'Which two Pokemon appeared the same number of times?', correct, options)
}

function appearedTogetherQuestion(speciesIds: number[], spawns: FieldObservationSpawn[]): QuestionCandidate | null {
  const pairs = getPairs(speciesIds)
  const correctPairs = pairs.filter(([a, b]) => appearedTogether(spawns, a, b))
  const incorrectPairs = pairs.filter(([a, b]) => !appearedTogether(spawns, a, b))
  if (correctPairs.length === 0 || incorrectPairs.length === 0) return null
  const correct = correctPairs[0]
  const options = [correct, ...incorrectPairs].slice(0, 4)
  return pairQuestion('appeared-together', 'Which pair appeared together?', correct, options)
}

function pairQuestion(
  type: string,
  prompt: string,
  correctPair: [number, number],
  optionPairs: [number, number][],
): QuestionCandidate {
  const options = optionPairs.map((pair) => ({
    id: `pair:${pair[0]}-${pair[1]}`,
    label: `${getSpeciesName(pair[0])} and ${getSpeciesName(pair[1])}`,
  }))

  return {
    question: {
      id: `field-${type}`,
      type,
      prompt,
      options,
    },
    correctOptionId: `pair:${correctPair[0]}-${correctPair[1]}`,
    rewardSpeciesIds: correctPair,
  }
}

function uniqueSpeciesByCountQuestion(
  type: string,
  prompt: string,
  speciesIds: number[],
  counts: Map<number, number>,
  mode: 'min' | 'max',
): QuestionCandidate | null {
  const scored = speciesIds.map((speciesId) => ({
    speciesId,
    value: counts.get(speciesId) || 0,
  }))
  const target = mode === 'max' ? Math.max(...scored.map((entry) => entry.value)) : Math.min(...scored.map((entry) => entry.value))
  const winners = scored.filter((entry) => entry.value === target)
  if (winners.length !== 1) return null
  return speciesQuestion(type, prompt, winners[0].speciesId, speciesIds)
}

function uniqueByWeightQuestion(
  type: string,
  prompt: string,
  speciesIds: number[],
  pool: NormalizedFieldObservationPoolEntry[],
): QuestionCandidate | null {
  const scored = speciesIds.map((speciesId) => ({
    speciesId,
    value: getConfiguredWeight(speciesId, pool),
  }))
  const target = Math.min(...scored.map((entry) => entry.value))
  const winners = scored.filter((entry) => entry.value === target)
  if (winners.length !== 1) return null
  return speciesQuestion(type, prompt, winners[0].speciesId, speciesIds)
}

function rarestAppearedYesNoQuestion(
  pool: NormalizedFieldObservationPoolEntry[],
  counts: Map<number, number>,
): QuestionCandidate | null {
  const speciesIds = unique(pool.map((entry) => entry.speciesId))
  const scored = speciesIds.map((speciesId) => ({
    speciesId,
    value: getConfiguredWeight(speciesId, pool),
  }))
  const minWeight = Math.min(...scored.map((entry) => entry.value))
  const rarest = scored.filter((entry) => entry.value === minWeight)
  if (rarest.length !== 1) return null
  const appeared = counts.has(rarest[0].speciesId)
  return yesNoQuestion(
    'rarest-appeared-yes-no',
    `Did the rarest Route survey Pokemon (${getSpeciesName(rarest[0].speciesId)}) appear?`,
    appeared,
    [rarest[0].speciesId],
  )
}

function yesNoQuestion(
  type: string,
  prompt: string,
  correct: boolean,
  rewardSpeciesIds: number[] = [],
): QuestionCandidate {
  return {
    question: {
      id: `field-${type}`,
      type,
      prompt,
      options: [
        { id: 'boolean:yes', label: 'Yes' },
        { id: 'boolean:no', label: 'No' },
      ],
    },
    correctOptionId: correct ? 'boolean:yes' : 'boolean:no',
    rewardSpeciesIds,
  }
}

function firstLastQuestion(
  type: string,
  prompt: string,
  spawns: FieldObservationSpawn[],
  mode: 'first' | 'last',
): QuestionCandidate | null {
  const ordered = [...spawns].sort((a, b) => a.startMs - b.startMs)
  const target = mode === 'first' ? ordered[0] : ordered[ordered.length - 1]
  if (!target) return null
  return speciesQuestion(type, prompt, target.speciesId, unique(spawns.map((spawn) => spawn.speciesId)))
}

function afterSpeciesQuestion(spawns: FieldObservationSpawn[]): QuestionCandidate | null {
  const ordered = [...spawns].sort((a, b) => a.startMs - b.startMs)
  if (ordered.length < 2) return null
  const previous = ordered[0]
  const next = ordered[1]
  return speciesQuestion(
    'after-species',
    `Which Pokemon appeared immediately after the first ${previous.name}?`,
    next.speciesId,
    unique(spawns.map((spawn) => spawn.speciesId)),
  )
}

function uniqueSpeciesBySpawnMetric(
  type: string,
  prompt: string,
  spawns: FieldObservationSpawn[],
  metric: (spawn: FieldObservationSpawn) => number,
  mode: 'min' | 'max',
): QuestionCandidate | null {
  const scored = spawns.map((spawn) => ({
    speciesId: spawn.speciesId,
    value: metric(spawn),
  }))
  const target = mode === 'max' ? Math.max(...scored.map((entry) => entry.value)) : Math.min(...scored.map((entry) => entry.value))
  const winners = unique(scored.filter((entry) => entry.value === target).map((entry) => entry.speciesId))
  if (winners.length !== 1) return null
  return speciesQuestion(type, prompt, winners[0], unique(spawns.map((spawn) => spawn.speciesId)))
}

function movementQuestion(
  spawns: FieldObservationSpawn[],
  speciesIds: number[],
  random: RandomFn,
): QuestionCandidate | null {
  const movements = MOVEMENTS.filter(
    (movement) =>
      movement !== 'still' &&
      spawns.some((spawn) => spawn.movement === movement) &&
      spawns.some((spawn) => spawn.movement !== movement),
  )
  if (movements.length === 0) return null
  const movement = movements[Math.floor(random() * movements.length)]
  return speciesPredicateQuestion(
    'movement-direction',
    `Which Pokemon crossed the frame ${movement.replaceAll('-', ' ')}?`,
    speciesIds,
    (id) => spawns.some((spawn) => spawn.speciesId === id && spawn.movement === movement),
  )
}

function regionQuestion(
  spawns: FieldObservationSpawn[],
  speciesIds: number[],
  random: RandomFn,
): QuestionCandidate | null {
  const speciesId = speciesIds[Math.floor(random() * speciesIds.length)]
  const speciesSpawns = spawns.filter((spawn) => spawn.speciesId === speciesId)
  if (speciesSpawns.length === 0) return null
  const counts = new Map<string, number>()
  for (const spawn of speciesSpawns) {
    const region = spawn.x < 33 ? 'left' : spawn.x > 66 ? 'right' : 'center'
    counts.set(region, (counts.get(region) || 0) + 1)
  }
  const max = Math.max(...counts.values())
  const winners = Array.from(counts.entries()).filter(([, count]) => count === max)
  if (winners.length !== 1) return null

  return {
    question: {
      id: 'field-species-region',
      type: 'species-region',
      prompt: `Where did ${getSpeciesName(speciesId)} appear most often?`,
      options: [
        { id: 'region:left', label: 'Left' },
        { id: 'region:center', label: 'Center' },
        { id: 'region:right', label: 'Right' },
      ],
    },
    correctOptionId: `region:${winners[0][0]}`,
    rewardSpeciesIds: [speciesId],
  }
}

function mostCommonTypeQuestion(spawns: FieldObservationSpawn[]): QuestionCandidate | null {
  const counts = new Map<string, number>()
  for (const spawn of spawns) {
    for (const type of getPokemonTypes(spawn.speciesId)) {
      counts.set(type, (counts.get(type) || 0) + 1)
    }
  }
  if (counts.size < 2) return null
  const max = Math.max(...counts.values())
  const winners = Array.from(counts.entries()).filter(([, count]) => count === max)
  if (winners.length !== 1) return null

  const optionTypes = unique([winners[0][0], ...Array.from(counts.keys()), ...TYPE_NAMES]).slice(0, 4)
  return {
    question: {
      id: 'field-most-common-type',
      type: 'most-common-type',
      prompt: 'Which Pokemon type appeared most often?',
      options: optionTypes.map((type) => ({ id: `type:${type}`, label: type })),
    },
    correctOptionId: `type:${winners[0][0]}`,
    rewardSpeciesIds: [],
  }
}

function typeAppearedQuestion(spawns: FieldObservationSpawn[], random: RandomFn): QuestionCandidate | null {
  const appearedTypes = unique(spawns.flatMap((spawn) => getPokemonTypes(spawn.speciesId)))
  if (appearedTypes.length === 0) return null
  const absentTypes = TYPE_NAMES.filter((type) => !appearedTypes.includes(type))
  const askAppeared = absentTypes.length === 0 || random() < 0.5
  const type = askAppeared
    ? appearedTypes[Math.floor(random() * appearedTypes.length)]
    : absentTypes[Math.floor(random() * absentTypes.length)]
  return yesNoQuestion('type-appeared', `Did any ${type}-type Pokemon appear?`, appearedTypes.includes(type))
}

function speciesByDataMetricQuestion(
  type: string,
  prompt: string,
  speciesIds: number[],
  metric: (speciesId: number) => number,
  mode: 'min' | 'max',
): QuestionCandidate | null {
  const scored = speciesIds.map((speciesId) => ({ speciesId, value: metric(speciesId) }))
  const target = mode === 'max' ? Math.max(...scored.map((entry) => entry.value)) : Math.min(...scored.map((entry) => entry.value))
  const winners = scored.filter((entry) => entry.value === target)
  if (winners.length !== 1) return null
  return speciesQuestion(type, prompt, winners[0].speciesId, speciesIds)
}

function sameEvolutionLineQuestion(
  poolSpecies: number[],
  appearedSpecies: number[],
  random: RandomFn,
): QuestionCandidate | null {
  const source = appearedSpecies[Math.floor(random() * appearedSpecies.length)]
  if (!source) return null
  const line = getEvolutionLine(source).filter((id) => id !== source)
  const correct = poolSpecies.filter((id) => line.includes(id))
  const incorrect = poolSpecies.filter((id) => id !== source && !line.includes(id))
  if (correct.length === 0 || incorrect.length === 0) return null
  return speciesQuestion(
    'same-evolution-line',
    `Which Pokemon belongs to the same evolution line as ${getSpeciesName(source)}?`,
    correct[0],
    [correct[0], ...incorrect],
  )
}

function buildFallbackQuestion(spawns: FieldObservationSpawn[]): QuestionCandidate {
  return numberQuestion('total-count', 'How many Pokemon appeared in total?', spawns.length, spawns.length)
}

function buildRewardSubjects(
  spawns: FieldObservationSpawn[],
): FieldObservationRewardSubject[] {
  const subjectsByForm = new Map<string, FieldObservationRewardSubject>()

  for (const spawn of spawns) {
    if (subjectsByForm.has(spawn.formId)) continue
    const formData = getPokemonForm(spawn.formId) || getPokemonSpecies(spawn.speciesId)
    subjectsByForm.set(spawn.formId, {
      speciesId: spawn.speciesId,
      formId: spawn.formId,
      level: spawn.level,
      baseExperience: formData?.base_experience,
      pokemonResearchXp: 1,
    })
  }

  return Array.from(subjectsByForm.values())
}

function countBySpecies(spawns: FieldObservationSpawn[]) {
  const counts = new Map<number, number>()
  for (const spawn of spawns) {
    counts.set(spawn.speciesId, (counts.get(spawn.speciesId) || 0) + 1)
  }
  return counts
}

function getRarestAppearedSpecies(
  spawns: FieldObservationSpawn[],
  pool: NormalizedFieldObservationPoolEntry[],
): number[] {
  const speciesIds = unique(spawns.map((spawn) => spawn.speciesId))
  const scored = speciesIds.map((speciesId) => ({
    speciesId,
    weight: getConfiguredWeight(speciesId, pool),
  }))
  const minWeight = Math.min(...scored.map((entry) => entry.weight))
  return scored.filter((entry) => entry.weight === minWeight).map((entry) => entry.speciesId)
}

function getConfiguredWeight(speciesId: number, pool: NormalizedFieldObservationPoolEntry[]) {
  return Math.min(...pool.filter((entry) => entry.speciesId === speciesId).map((entry) => entry.weight))
}

function getSpeciesName(speciesId: number) {
  return getPokemonSpecies(speciesId)?.name || `Pokemon #${speciesId}`
}

function getPokemonTypes(speciesId: number) {
  return getPokemonSpecies(speciesId)?.types || []
}

function getPokemonMetric(speciesId: number, metric: 'weight' | 'speed' | 'capture_rate') {
  const pokemon = getPokemonSpecies(speciesId)
  if (!pokemon) return 0
  if (metric === 'speed') return pokemon.stats.speed || 0
  return pokemon[metric] || 0
}

function hasGenderDifferences(speciesId: number) {
  return !!getPokemonSpecies(speciesId)?.has_gender_differences
}

function getEvolutionLine(speciesId: number) {
  const seen = new Set<number>([speciesId])
  const queue = [speciesId]
  while (queue.length > 0) {
    const current = queue.shift()
    if (!current) continue
    for (const next of evolutionNeighbors.get(current) || []) {
      if (!seen.has(next)) {
        seen.add(next)
        queue.push(next)
      }
    }
  }
  return Array.from(seen)
}

function appearedInEveryWave(spawns: FieldObservationSpawn[], speciesId: number) {
  const allWaves = new Set(spawns.map((spawn) => spawn.wave))
  const speciesWaves = new Set(spawns.filter((spawn) => spawn.speciesId === speciesId).map((spawn) => spawn.wave))
  return allWaves.size > 1 && Array.from(allWaves).every((wave) => speciesWaves.has(wave))
}

function appearedOnlyInFinalWave(spawns: FieldObservationSpawn[], speciesId: number) {
  const maxWave = Math.max(...spawns.map((spawn) => spawn.wave))
  const speciesSpawns = spawns.filter((spawn) => spawn.speciesId === speciesId)
  return speciesSpawns.length > 0 && speciesSpawns.every((spawn) => spawn.wave === maxWave)
}

function hasConsecutiveAppearance(spawns: FieldObservationSpawn[], speciesId: number) {
  const ordered = [...spawns].sort((a, b) => a.startMs - b.startMs)
  return ordered.some((spawn, index) => index > 0 && spawn.speciesId === speciesId && ordered[index - 1].speciesId === speciesId)
}

function appearedTogether(spawns: FieldObservationSpawn[], a: number, b: number) {
  return spawns.some(
    (first) =>
      first.speciesId === a &&
      spawns.some(
        (second) =>
          second.speciesId === b &&
          first.startMs < second.startMs + second.durationMs &&
          second.startMs < first.startMs + first.durationMs,
      ),
  )
}

function neverAppearedAlone(spawns: FieldObservationSpawn[], speciesId: number) {
  const speciesSpawns = spawns.filter((spawn) => spawn.speciesId === speciesId)
  return (
    speciesSpawns.length > 0 &&
    speciesSpawns.every((spawn) =>
      spawns.some(
        (other) =>
          other.id !== spawn.id &&
          spawn.startMs < other.startMs + other.durationMs &&
          other.startMs < spawn.startMs + spawn.durationMs,
      ),
    )
  )
}

function getPairs(speciesIds: number[]): [number, number][] {
  const pairs: [number, number][] = []
  for (let i = 0; i < speciesIds.length; i++) {
    for (let j = i + 1; j < speciesIds.length; j++) {
      pairs.push([speciesIds[i], speciesIds[j]])
    }
  }
  return pairs
}

function pickWeighted(
  pool: NormalizedFieldObservationPoolEntry[],
  random: RandomFn,
): NormalizedFieldObservationPoolEntry {
  const total = pool.reduce((sum, entry) => sum + entry.weight, 0)
  let roll = random() * total
  for (const entry of pool) {
    roll -= entry.weight
    if (roll <= 0) return entry
  }
  return pool[pool.length - 1]
}

function getRarestPoolEntries(pool: NormalizedFieldObservationPoolEntry[]) {
  const minWeight = Math.min(...pool.map((entry) => entry.weight))
  return pool.filter((entry) => entry.weight === minWeight)
}

function rollLevel(min: number, max: number, random: RandomFn) {
  const lower = Math.min(min, max)
  const upper = Math.max(min, max)
  return Math.floor(random() * (upper - lower + 1)) + lower
}

function randomRange(min: number, max: number, random: RandomFn) {
  return min + (max - min) * random()
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount
}

function clampNumber(value: number, min: number, max: number) {
  if (!Number.isFinite(value)) return min
  return Math.max(min, Math.min(max, value))
}

function clampInteger(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(value)))
}

function unique<T>(values: T[]): T[] {
  return Array.from(new Set(values))
}
