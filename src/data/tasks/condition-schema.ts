import { z } from 'zod'
import { isPokemonRarityId } from '@/utilities/pokemon/rarity-effects'

const statRequirementsSchema = z
  .object({
    hp: z.number().optional(),
    attack: z.number().optional(),
    defense: z.number().optional(),
    specialAttack: z.number().optional(),
    specialDefense: z.number().optional(),
    speed: z.number().optional(),
  })
  .strict()

const pokemonCriteriaSchema = z
  .object({
    type: z.string().optional(),
    speciesId: z.number().int().positive().optional(),
    region: z.union([z.string(), z.array(z.string())]).optional(),
    location: z.union([z.string(), z.array(z.string())]).optional(),
    locationId: z.union([z.string(), z.array(z.string())]).optional(),
    ballType: z.string().optional(),
    minLevel: z.number().int().min(1).max(100).optional(),
    maxLevel: z.number().int().min(1).max(100).optional(),
    size: z.enum(['XS', 'S', 'L', 'XL', 'XXL', 'XXXL']).optional(),
    shiny: z.boolean().optional(),
    rarity: z.string().refine(isPokemonRarityId, 'Invalid Pokemon rarity').optional(),
    isShadow: z.boolean().optional(),
    isRadiant: z.boolean().optional(),
    identified: z.boolean().optional(),
    partner: z.boolean().optional(),
    form: z.string().optional(),
    formId: z.string().optional(),
    stats: statRequirementsSchema.optional(),
    ivs: statRequirementsSchema.optional(),
    evs: statRequirementsSchema.optional(),
  })
  .strict()

const battleTeamCheckSchema = z
  .object({
    position: z.union([z.number().int().min(1).max(6), z.literal('any')]),
    speciesId: z.number().int().positive().optional(),
    formId: z.string().optional(),
    type: z.string().optional(),
    region: z.union([z.string(), z.array(z.string())]).optional(),
    location: z.union([z.string(), z.array(z.string())]).optional(),
    locationId: z.union([z.string(), z.array(z.string())]).optional(),
    stats: statRequirementsSchema.optional(),
    qty: z.number().int().positive().optional(),
  })
  .strict()

export const taskConditionSchema: z.ZodType<any> = z.lazy(() =>
  z
    .object({
      type: z.enum([
        'user_level',
        'item_owned',
        'currency_owned',
        'pokemon_owned',
        'card_collected_total',
        'card_collected_set',
        'card_collected_specific',
        'pokedex_seen_total',
        'pokedex_caught_total',
        'pokedex_seen_specific',
        'pokedex_caught_specific',
        'task_completed',
        'task_active',
        'time_range',
        'date_range',
        'battle_result',
        'location_encounter_result',
        'game_result',
        'field_research_result',
        'expedition_result',
        'power_usage',
        'total_evolutions',
        'voyage_completed',
        'skill_level',
        'guild_rank',
        'user_banner',
        'user_icon',
        'user_title',
        'battle_team',
        'companion',
        'research_level',
        'research_level_total',
        'total_battles_won',
        'kid_mode',
        'daily_catch',
        'daily_battle',
        'daily_card',
        'daily_crystalize',
        'daily_activity',
        'daily_not_completed',
        'weather',
        'roll',
        'any_of',
      ]),
      targetId: z.union([z.string(), z.number(), z.array(z.string())]).optional(),
      count: z.number().optional(),
      progress: z.number().optional(),
      consume: z.boolean().optional(),
      unique: z.boolean().optional(),
      secret: z.boolean().optional(),
      pokemonCriteria: pokemonCriteriaSchema.optional(),
      battleTeamCheck: battleTeamCheckSchema.optional(),
      companionCheck: pokemonCriteriaSchema.optional(),
      battleStatus: z.enum(['win', 'loss']).optional(),
      expeditionStatus: z.enum(['completed', 'failed']).optional(),
      timeRange: z.object({ start: z.string(), end: z.string() }).optional(),
      dateRange: z.object({ start: z.string(), end: z.string() }).optional(),
      powerType: z
        .enum(['tera', 'mega', 'z-move', 'dynamax', 'shout', 'victory', 'weather', 'circadian'])
        .optional(),
      battleType: z.enum(['wild', 'trainer']).optional(),
      dailyActivity: z
        .object({
          kind: z.enum([
            'catch',
            'battle_win',
            'game_win',
            'field_research_win',
            'fishing_catch',
            'craft_success',
            'shop_purchase',
            'voyage_success',
            'card_collected',
            'card_crystalized',
          ]),
          sourceIds: z.array(z.string()).optional(),
        })
        .optional(),
      level: z.number().optional(),
      inverse: z.boolean().optional(),
      label: z.string().optional(),
      conditions: z.array(taskConditionSchema).optional(),
    })
    .strict(),
)
