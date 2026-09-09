import { z } from 'zod'
import {
  settingsByGameType,
  rewardSchema,
  taskConditionSchema,
} from '@/data/games/schemas'
import { rarityChancesSchema } from '@/utilities/pokemon/rarity-chances'
import { POKEMON_RARITY_IDS } from '@/utilities/pokemon/rarity-effects'
import type { BattleConfig, Location, Task } from '@/data/types'
import type { ShopConfig } from '@/data/shops/types'
import type { FieldObservationConfig } from '@/data/games/field-observation/types'

const id = z
  .string()
  .min(1)
  .max(160)
  .regex(/^[a-zA-Z0-9:_-]+$/)
const text = z.string().max(4000)
const positive = z.number().finite().positive()
const percent = z.number().finite().min(0).max(100)
const level = z.number().int().min(1).max(100)
const range = z
  .object({ min: level, max: level })
  .strict()
  .refine((v) => v.min <= v.max, 'Minimum must not exceed maximum')
const icon = z
  .object({
    type: z.enum(['item', 'pokemon', 'trainer', 'local', 'lucide']),
    id: z.string().min(1),
  })
  .strict()
const conditions = z.array(taskConditionSchema).max(50)
const stats = z
  .object({
    hp: z.number().int().min(0),
    attack: z.number().int().min(0),
    defense: z.number().int().min(0),
    specialAttack: z.number().int().min(0),
    specialDefense: z.number().int().min(0),
    speed: z.number().int().min(0),
  })
  .partial()
  .strict()
const eventRewardSchema = rewardSchema.extend({
  type: z.enum([
    'item',
    'pokemon',
    'card',
    'xp',
    'currency',
    'task_complete',
    'banner',
    'icon',
    'title',
    'increase_max_pokemon',
    'increase_max_boxes',
    'pokemon_research_xp',
    'active_companion_friendship',
    'active_companion_research_xp',
    'egg',
  ]),
  quantity: z
    .union([
      z.number().int().nonnegative(),
      z
        .object({
          min: z.number().int().nonnegative(),
          max: z.number().int().nonnegative(),
        })
        .strict()
        .refine(
          (range) => range.min <= range.max,
          'Minimum must not exceed maximum',
        ),
    ])
    .optional(),
  pokemonData: z
    .object({
      level: level.optional(),
      formId: id.optional(),
      ability: id.optional(),
      shiny: z.boolean().optional(),
      rarity: z.enum(POKEMON_RARITY_IDS as [string, ...string[]]).optional(),
      ivs: stats.optional(),
      evs: stats.optional(),
      nature: id.optional(),
      ballType: id.optional(),
      background: text.optional(),
      isShadow: z.boolean().optional(),
      isRadiant: z.boolean().optional(),
      partner: z.boolean().optional(),
      gender: z.enum(['male', 'female', 'genderless']).optional(),
      obtainedMethod: z
        .enum([
          'caught',
          'trade',
          'gift',
          'starter',
          'purchased',
          'reward',
          'hatched',
        ])
        .optional(),
      obtainedRegion: text.optional(),
      obtainedLocation: text.optional(),
      obtainedSourceId: id.optional(),
    })
    .strict()
    .optional(),
  eggData: z
    .object({
      rarity: z.enum(POKEMON_RARITY_IDS as [string, ...string[]]).optional(),
      sourceResearchId: id.optional(),
      sourceBackground: text.optional(),
      sourceRegion: text.optional(),
      sourceLocation: text.optional(),
    })
    .strict()
    .optional(),
  isCompanion: z.boolean().optional(),
})
const rewards = z.array(eventRewardSchema).max(100)
const common = {
  id,
  name: z.string().min(1).max(150),
  description: text,
  icon,
  category: z.string().min(1).max(100),
  subCategory: z.string().max(100).optional(),
  requirements: conditions,
  background: text.optional(),
  hide: id.optional(),
  overrides: id.optional(),
  isRandomEvent: z.boolean().optional(),
}
const activity = {
  ...common,
  criteria: conditions.optional(),
  rewards,
  music: text.optional(),
  daily: z.boolean().optional(),
  skillXp: z
    .object({
      skill: z.enum(['catching', 'battling', 'researching', 'artisan']),
      level: positive,
    })
    .strict()
    .optional(),
}
const rarity = z.enum(POKEMON_RARITY_IDS as [string, ...string[]])
const enemy = z
  .object({
    speciesId: z.number().int().positive(),
    formId: id.optional(),
    level: z.union([level, range]),
    name: text.optional(),
    requirements: conditions.optional(),
    rarity: rarity.optional(),
    rarityChances: rarityChancesSchema.optional(),
    shiny: z.boolean().optional(),
    isShadow: z.boolean().optional(),
    isRadiant: z.boolean().optional(),
    ivs: stats.optional(),
    evs: stats.optional(),
    heldItemId: id.optional(),
    aiMoves: z.array(id).max(20).optional(),
    initialStatus: id.optional(),
    gender: z.enum(['male', 'female', 'genderless']).optional(),
  })
  .strict()
export const eventBattleSchema = z
  .object({
    ...activity,
    background: text,
    enemyTeam: z.array(enemy).min(1).max(100),
    rarityChances: rarityChancesSchema.optional(),
    maxPokemon: z.number().int().min(1).max(6),
    isWildBattle: z.boolean().optional(),
    title: text.optional(),
    trainerName: text.optional(),
    trainerClassId: id.optional(),
    trainerItems: z
      .array(
        z
          .object({
            itemId: id,
            quantity: z.number().int().positive().optional(),
          })
          .strict(),
      )
      .max(50)
      .optional(),
    levelCap: level.optional(),
    bannedPlayerTypes: z.array(id).max(18).optional(),
    playerTeamInitialStatus: id.optional(),
    itemsPerBattle: z.number().int().nonnegative().optional(),
    allowedItems: z.array(id).max(100).optional(),
    allowSwapping: z.boolean().optional(),
    aiProfile: z.enum(['wild', 'trainer', 'advanced', 'boss']).optional(),
    enemyAttackTelegraphChance: percent.optional(),
    ...Object.fromEntries(
      [
        'movesPerBattle',
        'enemyMovesPerBattle',
        'teraUsesPerBattle',
        'dynamaxPerBattle',
        'megaEvolutionsPerBattle',
        'zMovesPerBattle',
        'victoryUses',
        'weatherUses',
        'shoutsPerBattle',
        'circadianUses',
      ].map((key) => [key, z.number().int().nonnegative().optional()]),
    ),
    generatedXpMultiplier: positive.optional(),
    disableRewards: z.boolean().optional(),
    disableLossPayout: z.boolean().optional(),
    disableCandyRewards: z.boolean().optional(),
    gemConfig: z
      .object(
        Object.fromEntries(
          ['base', 'shining', 'pristine'].map((key) => [
            key,
            z
              .object({
                min: z.number().int().nonnegative(),
                max: z.number().int().nonnegative(),
                dropRate: percent,
              })
              .strict()
              .optional(),
          ]),
        ),
      )
      .strict()
      .optional(),
  })
  .strict()
export const eventLocationSchema = z
  .object({
    ...activity,
    encounters: z
      .array(
        z
          .object({
            speciesId: z.number().int().positive(),
            formId: id.optional(),
            rarity: rarity.optional(),
            rarityChances: rarityChancesSchema.optional(),
            chance: percent,
            requirements: conditions.optional(),
            secret: z.boolean().optional(),
          })
          .strict(),
      )
      .min(1)
      .max(200),
    rarityChances: rarityChancesSchema.optional(),
    shinyChanceModifier: z.number().finite().nonnegative().optional(),
    catchRateModifier: z.number().min(0).max(255).optional(),
    fleeRate: percent.optional(),
    timer: positive.max(86400).optional(),
    levelRange: range.optional(),
    encounterMode: z.enum(['standard', 'safari']).optional(),
    safariBallAllowance: z.number().int().positive().optional(),
    keyEncounter: z.boolean().optional(),
    requiredItem: z
      .object({
        id,
        useOnCatch: z.boolean().optional(),
        breakChance: percent.optional(),
      })
      .strict()
      .optional(),
    shield: z
      .object({
        type: z.enum(['consecutive', 'total']),
        requiredCorrectAnswers: z.number().int().positive(),
        regenSeconds: positive.optional(),
        bubbleColor: text.optional(),
      })
      .strict()
      .optional(),
  })
  .strict()
export const eventShopItemSchema = z
  .object({
    id,
    name: z.string().min(1),
    description: text.optional(),
    icon: icon.optional(),
    cost: z
      .array(
        z
          .object({
            type: z.enum(['currency', 'item']),
            id,
            amount: z.number().int().positive(),
          })
          .strict(),
      )
      .min(1)
      .max(20),
    rewards,
    stock: z.number().int().nonnegative().optional(),
    daily: z.boolean().optional(),
    requirements: conditions.optional(),
  })
  .strict()
export const eventShopSchema = z
  .object({ ...common, items: z.array(eventShopItemSchema).min(1).max(200) })
  .strict()
export const eventTaskSchema = z
  .object({
    ...activity,
    criteria: conditions,
    repeatable: z.boolean(),
    chat: z.boolean().optional(),
    secret: z.boolean().optional(),
    completionTrigger: z.enum(['manual', 'auto']).optional(),
    completeButtonText: text.optional(),
    exitModal: z
      .object({
        title: text,
        message: text,
        closeButtonText: text,
        background: text.optional(),
        icon: icon.optional(),
      })
      .strict()
      .optional(),
    enterModal: z
      .array(
        z
          .object({
            id: z.number().int().positive(),
            icon: icon.optional(),
            title: text,
            message: text,
            background: text.optional(),
            buttons: z
              .array(
                z
                  .object({
                    text,
                    type: z.enum(['navigate', 'success', 'fail']),
                    id: z.number().int().optional(),
                    fail: z.number().int().optional(),
                  })
                  .strict(),
              )
              .min(1)
              .max(4),
          })
          .strict(),
      )
      .max(30)
      .optional(),
  })
  .strict()
export const eventResearchSchema = z
  .object({
    ...activity,
    gameType: z.literal('field-observation'),
    settings: settingsByGameType['field-observation'],
    isEligibleForReplay: z.boolean().optional(),
    skillXpOnFailure: z.boolean().optional(),
  })
  .strict()
export const eventContentSchemas = {
  battle: eventBattleSchema,
  location: eventLocationSchema,
  shop: eventShopSchema,
  task: eventTaskSchema,
  'field-research': eventResearchSchema,
}
export type EventKind = keyof typeof eventContentSchemas
export type EventConfigMap = {
  battle: BattleConfig
  location: Location
  shop: ShopConfig
  task: Task
  'field-research': FieldObservationConfig & { gameType: 'field-observation' }
}
export type EventContent = {
  [K in EventKind]: { kind: K; config: EventConfigMap[K] }
}[EventKind]
export type EventModifier = {
  kind: EventKind
  targetId: string
  field: string
  operation: 'replace' | 'boost' | 'discount' | 'append'
  value: unknown
}
const kinds = z.enum(['battle', 'location', 'shop', 'task', 'field-research'])
export const eventDraftSchema = z
  .object({
    name: z.string().min(1).max(150),
    title: z.string().min(1).max(150),
    description: text,
    icon: icon.default({ type: 'local', id: 'app-icon.avif' }),
    timingMode: z.enum(['scheduled', 'manual']).optional(),
    enabled: z.boolean().optional(),
    startAt: z.iso.datetime(),
    endAt: z.iso.datetime(),
    visibleAt: z.iso.datetime().nullable(),
    requirements: conditions.default([]),
    notify: z.boolean().default(false),
    notificationBody: z.string().max(240).default(''),
    content: z
      .array(
        z
          .object({ kind: kinds, config: z.record(z.string(), z.unknown()) })
          .strict(),
      )
      .max(100),
    modifiers: z
      .array(
        z
          .object({
            kind: kinds,
            targetId: id,
            field: z.string().min(1).max(100),
            operation: z.enum(['replace', 'boost', 'discount', 'append']),
            value: z.unknown(),
          })
          .strict(),
      )
      .max(200),
  })
  .strict()
  .superRefine((event, ctx) => {
    if (
      event.timingMode !== 'manual' &&
      Date.parse(event.endAt) <= Date.parse(event.startAt)
    )
      ctx.addIssue({
        code: 'custom',
        path: ['endAt'],
        message: 'End must follow start',
      })
    if (
      event.timingMode !== 'manual' &&
      event.visibleAt &&
      Date.parse(event.visibleAt) > Date.parse(event.endAt)
    )
      ctx.addIssue({
        code: 'custom',
        path: ['visibleAt'],
        message: 'Announcement must precede end',
      })
    if (!event.content.length && !event.modifiers.length)
      ctx.addIssue({
        code: 'custom',
        path: ['content'],
        message: 'Add content or a modifier',
      })
    const ids = new Set<string>()
    event.content.forEach((entry, index) => {
      if (String(entry.config.id).length > 64)
        ctx.addIssue({
          code: 'custom',
          path: ['content', index, 'config', 'id'],
          message: 'Use a local content ID of at most 64 characters',
        })
      if (entry.kind === 'shop') {
        const ids = (
          Array.isArray(entry.config.items) ? entry.config.items : []
        ).map((item: any) => item.id)
        if (new Set(ids).size !== ids.length)
          ctx.addIssue({
            code: 'custom',
            path: ['content', index, 'config', 'items'],
            message: 'Shop offer IDs must be unique',
          })
      }
      const result = eventContentSchemas[entry.kind].safeParse(entry.config)
      if (!result.success)
        for (const issue of result.error.issues)
          ctx.addIssue({
            code: 'custom',
            path: ['content', index, 'config', ...issue.path],
            message: issue.message,
          })
      const key = String(entry.config.id)
      if (ids.has(key))
        ctx.addIssue({
          code: 'custom',
          path: ['content', index],
          message: 'Content IDs must be unique within an event',
        })
      ids.add(key)
    })
  })
export type EventDraft = z.infer<typeof eventDraftSchema>
export type GameEventDefinition = EventDraft & {
  id: string
  status: 'draft' | 'published' | 'cancelled'
  revision: number
  updatedAt?: string
}
export function eventPhase(
  event: Pick<
    GameEventDefinition,
    'status' | 'startAt' | 'endAt' | 'timingMode' | 'enabled'
  >,
  now = Date.now(),
) {
  if (event.status !== 'published') return event.status
  if (event.timingMode === 'manual')
    return event.enabled ? 'active' : 'disabled'
  if (now < Date.parse(event.startAt)) return 'scheduled'
  return now < Date.parse(event.endAt) ? 'active' : 'ended'
}
// An open upper bound keeps existing indexed schedule queries and accepted-session
// snapshots compatible. Never expose this storage value as a player-facing date.
export const MANUAL_EVENT_END = '9999-12-31T23:59:59.999Z'
export function setManualEventEnabled(
  event: GameEventDefinition,
  enabled: boolean,
  now = Date.now(),
): GameEventDefinition {
  if (event.timingMode !== 'manual' || event.status !== 'published')
    throw new Error('Only published manual events can be switched on or off')
  if (Boolean(event.enabled) === enabled)
    throw new Error(
      enabled ? 'Event is already enabled' : 'Event is already disabled',
    )
  return {
    ...event,
    enabled,
    ...(enabled
      ? { startAt: new Date(now).toISOString(), endAt: MANUAL_EVENT_END }
      : { endAt: new Date(now).toISOString() }),
  }
}
export function eventNotificationRun(event: GameEventDefinition) {
  return event.timingMode === 'manual'
    ? `${event.id}:${event.startAt}`
    : event.id
}
export function eventContentId(eventId: string, localId: string) {
  return `event:${eventId}:${localId}`
}
