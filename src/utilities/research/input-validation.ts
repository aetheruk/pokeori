import { z } from 'zod'
import type { GameType } from '@/data/games'

export interface ValidationResult<T> {
  success: boolean
  value?: T
  error?: string
}

const idAnswerSchema = z.union([
  z.number().int().finite(),
  z.string().trim().min(1).max(128),
])

const fieldObservationCountAnswerSchema = z.object({
  type: z.literal('count-survey'),
  counts: z.record(
    z.string().regex(/^\d+:[a-z0-9:_-]+$/i),
    z.number().int().min(0).max(999),
  ),
})

const fieldObservationAnswerSchema = z.union([
  idAnswerSchema,
  fieldObservationCountAnswerSchema,
])

const booleanAnswerSchema = z.boolean()

const spellingAnswerSchema = z.object({
  letter: z
    .string()
    .trim()
    .length(1)
    .regex(/^[a-z]$/i),
})

const slidingPuzzleAnswerSchema = z.object({
  moveTileIndex: z.number().int().min(0).max(255),
})

const encounterIdSchema = z
  .string()
  .trim()
  .min(1)
  .max(160)
  .regex(/^[a-z0-9:_-]+$/i)
const consumedPokemonIdsSchema = z
  .array(z.string().trim().min(1).max(128))
  .max(100)
  .optional()
const collectedEndlessRewardsSchema = z
  .record(z.string().regex(/^\d+:\d+$/), z.number().int().min(0).max(10_000))
  .optional()
const collectedRockPushRewardIdsSchema = z
  .array(
    z
      .string()
      .trim()
      .min(1)
      .max(80)
      .regex(/^[a-z0-9:_-]+$/i),
  )
  .max(100)
  .optional()

const submitAnswerSchemas: Partial<Record<GameType, z.ZodType>> = {
  silhouette: idAnswerSchema,
  identify: idAnswerSchema,
  snap: idAnswerSchema,
  cry: idAnswerSchema,
  compare: idAnswerSchema,
  run: booleanAnswerSchema,
  flap: booleanAnswerSchema,
  'rock-push': booleanAnswerSchema,
  rhythm: booleanAnswerSchema,
  mining: booleanAnswerSchema,
  'field-observation': fieldObservationAnswerSchema,
  spelling: spellingAnswerSchema,
  'sliding-puzzle': slidingPuzzleAnswerSchema,
}

export function validateResearchAnswer(
  gameType: GameType,
  answer: unknown,
): ValidationResult<any> {
  const schema = submitAnswerSchemas[gameType]
  if (!schema) {
    return {
      success: false,
      error: 'This game does not accept answer submissions',
    }
  }

  const result = schema.safeParse(answer)
  if (!result.success) {
    return { success: false, error: 'Invalid answer payload' }
  }

  return { success: true, value: result.data }
}

export function validateResearchStartInput(
  encounterId: unknown,
  forceReset: unknown,
  consumedPokemonIds?: unknown,
): ValidationResult<{
  encounterId: string
  forceReset: boolean
  consumedPokemonIds?: string[]
}> {
  const encounterResult = encounterIdSchema.safeParse(encounterId)
  if (!encounterResult.success) {
    return { success: false, error: 'Invalid encounter id' }
  }

  const forceResetResult = z.boolean().safeParse(forceReset)
  if (!forceResetResult.success) {
    return { success: false, error: 'Invalid reset flag' }
  }

  const consumedResult = consumedPokemonIdsSchema.safeParse(consumedPokemonIds)
  if (!consumedResult.success) {
    return { success: false, error: 'Invalid Pokemon selection' }
  }

  const uniqueIds = consumedResult.data
    ? Array.from(new Set(consumedResult.data))
    : undefined
  return {
    success: true,
    value: {
      encounterId: encounterResult.data,
      forceReset: forceResetResult.data,
      consumedPokemonIds: uniqueIds,
    },
  }
}

export function validateResearchEncounterId(
  encounterId: unknown,
): ValidationResult<string> {
  const result = encounterIdSchema.safeParse(encounterId)
  if (!result.success) {
    return { success: false, error: 'Invalid encounter id' }
  }

  return { success: true, value: result.data }
}

export function validateResearchCompletionInput(
  success: unknown,
  finalScore?: unknown,
  additionalLosses?: unknown,
  collectedEndlessRewards?: unknown,
  collectedRockPushRewardIds?: unknown,
): ValidationResult<{
  success: boolean
  finalScore?: number
  additionalLosses?: number
  collectedEndlessRewards?: Record<string, number>
  collectedRockPushRewardIds?: string[]
}> {
  const successResult = z.boolean().safeParse(success)
  if (!successResult.success) {
    return { success: false, error: 'Invalid completion state' }
  }

  const scoreResult = z
    .number()
    .finite()
    .min(0)
    .max(100_000_000)
    .optional()
    .safeParse(finalScore)
  if (!scoreResult.success) {
    return { success: false, error: 'Invalid final score' }
  }

  const lossesResult = z
    .number()
    .int()
    .min(0)
    .max(1000)
    .optional()
    .safeParse(additionalLosses)
  if (!lossesResult.success) {
    return { success: false, error: 'Invalid loss count' }
  }

  const collectedResult = collectedEndlessRewardsSchema.safeParse(
    collectedEndlessRewards,
  )
  if (!collectedResult.success) {
    return { success: false, error: 'Invalid collected rewards' }
  }

  const rockPushCollectedResult = collectedRockPushRewardIdsSchema.safeParse(
    collectedRockPushRewardIds,
  )
  if (!rockPushCollectedResult.success) {
    return { success: false, error: 'Invalid rock push rewards' }
  }

  return {
    success: true,
    value: {
      success: successResult.data,
      finalScore: scoreResult.data,
      additionalLosses: lossesResult.data,
      collectedEndlessRewards: collectedResult.data,
      collectedRockPushRewardIds: rockPushCollectedResult.data
        ? Array.from(new Set(rockPushCollectedResult.data))
        : undefined,
    },
  }
}
