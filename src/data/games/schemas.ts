import { z } from 'zod'
import { isPokemonRarityId } from '@/utilities/pokemon/rarity-effects'

const currencyTypeSchema = z.enum([
  'crystals',
  'mega-shards',
  'pokedollars',
  'battle-points',
  'berry-powder',
  'prof-scrip',
  'league-ticket',
])

const taskIconSchema = z.object({
  type: z.enum(['item', 'pokemon', 'trainer', 'local', 'lucide']),
  id: z.string().min(1),
})

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
    minLevel: z.number().int().min(1).max(100).optional(),
    maxLevel: z.number().int().min(1).max(100).optional(),
    size: z.enum(['XS', 'S', 'L', 'XL']).optional(),
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
        'research_encounter_result',
        'expedition_result',
        'power_usage',
        'total_evolutions',
        'voyage_completed',
        'skill_level',
        'user_banner',
        'user_icon',
        'user_title',
        'battle_team',
        'companion',
        'research_level',
        'research_level_total',
        'total_battles_won',
        'daily_catch',
        'daily_battle',
        'daily_card',
        'daily_crystalize',
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
      level: z.number().optional(),
      inverse: z.boolean().optional(),
      label: z.string().optional(),
      conditions: z.array(taskConditionSchema).optional(),
    })
    .strict(),
)

export const rewardSchema = z
  .object({
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
    ]),
    targetId: z.union([z.string(), z.number()]).optional(),
    skill: z.string().optional(),
    quantity: z.union([z.number(), z.object({ min: z.number(), max: z.number() })]).optional(),
    cardDrawParams: z.record(z.string(), z.unknown()).optional(),
    requirements: z.array(taskConditionSchema).optional(),
    dropChance: z.number().min(0).max(100).optional(),
    guaranteed: z.boolean().optional(),
    secret: z.boolean().optional(),
    label: z.string().optional(),
    icon: taskIconSchema.optional(),
    pokemonData: z.record(z.string(), z.unknown()).optional(),
  })
  .strict()

const skillXpSchema = z
  .object({
    skill: z.enum(['catching', 'battling', 'researching', 'artisan']),
    level: z.number().int().min(1).max(100),
  })
  .strict()

const baseGameSchema = z.object({
  id: z.string().min(1),
  gameType: z.string().min(1),
  hide: z.string().optional(),
  name: z.string().min(1),
  description: z.string(),
  category: z.string().min(1),
  subCategory: z.string().optional(),
  icon: taskIconSchema,
  requirements: z.array(taskConditionSchema),
  criteria: z.array(taskConditionSchema).optional(),
  rewards: z.array(rewardSchema),
  overrides: z.string().optional(),
  background: z.string().optional(),
  music: z.string().optional(),
  daily: z.boolean().optional(),
  isEligibleForReplay: z.boolean().optional(),
  isRandomEvent: z.boolean().optional(),
  skillXp: skillXpSchema.optional(),
})

const commonKnowledgeSettings = z
  .object({
    target: z.number().int().positive().optional(),
    targetMissMessage: z.string().optional(),
    pokemonPool: z.array(z.number().int().positive()).optional(),
    itemPool: z.array(z.string()).optional(),
    optionsPool: z.array(z.number().int().positive()).optional(),
    timeLimit: z.number().positive().optional(),
    winRate: z.number().positive().optional(),
    successThreshold: z.number().positive().optional(),
    death: z.boolean().optional(),
    lose_points: z.number().nonnegative().optional(),
  })
  .passthrough()

const rockPushPositionSchema = z
  .object({
    x: z.number().int().min(0).max(50),
    y: z.number().int().min(0).max(50),
  })
  .strict()

const voltorbGridPositionSchema = z
  .object({
    x: z.number().int().min(0).max(30),
    y: z.number().int().min(0).max(30),
  })
  .strict()

const voltorbGridVoltorbSchema = voltorbGridPositionSchema
  .extend({
    id: z.string().min(1).max(80).optional(),
    blastRadius: z.number().int().positive().max(20).optional(),
  })
  .strict()

const voltorbGridProtectedPokemonSchema = voltorbGridPositionSchema
  .extend({
    id: z.string().min(1).max(80).optional(),
    speciesId: z.number().int().positive(),
    formId: z.string().min(1).max(80).optional(),
  })
  .strict()

const magnemiteCircuitTileSchema = voltorbGridPositionSchema
  .extend({
    type: z.enum(['straight', 'corner', 'tee', 'cross']),
    rotation: z.number().int().min(0).max(3).optional(),
    locked: z.boolean().optional(),
  })
  .strict()

const magnemiteCircuitTargetSchema = voltorbGridPositionSchema
  .extend({
    formId: z.string().min(1).max(80).optional(),
    sprite: z.string().min(1).optional(),
  })
  .strict()

function addGridPositionBoundsIssues(
  ctx: z.RefinementCtx,
  gridSize: { cols: number; rows: number },
  positions: Array<{ label: string; position: { x: number; y: number } }>,
  message: string,
) {
  positions.forEach(({ label, position }) => {
    if (position.x >= gridSize.cols || position.y >= gridSize.rows) {
      ctx.addIssue({
        code: 'custom',
        path: label.split('.'),
        message,
      })
    }
  })
}

const rockPushPrizeSchema = rockPushPositionSchema
  .extend({
    id: z.string().min(1).max(80).optional(),
    itemId: z.string().min(1),
    quantity: z.number().int().positive().optional(),
    reward: rewardSchema.optional(),
  })
  .strict()

const rockPushTeleporterSchema = rockPushPositionSchema
  .extend({
    id: z.string().min(1).max(80),
    target: rockPushPositionSchema.extend({
      screen: z.string().min(1).max(80).optional(),
    }),
    oneWay: z.boolean().optional(),
  })
  .strict()

const rockPushScreenSchema = z
  .object({
    id: z.string().min(1).max(80),
    grid_size: z.number().int().min(6).max(15).optional(),
    boulders: z.array(rockPushPositionSchema).optional(),
    holes: z.array(rockPushPositionSchema).optional(),
    barriers: z.array(rockPushPositionSchema).optional(),
    ice: z.array(rockPushPositionSchema).optional(),
    winTiles: z.array(rockPushPositionSchema).optional(),
    teleporters: z.array(rockPushTeleporterSchema).optional(),
    prizes: z.array(rockPushPrizeSchema).optional(),
  })
  .strict()

const fieldObservationItemDropSchema = z
  .object({
    id: z.string().min(1).max(80),
    itemId: z.string().min(1),
    dropChance: z.number().min(0).max(100),
    secret: z.boolean().optional(),
    quantity: z
      .union([
        z.number().int().positive(),
        z
          .object({
            min: z.number().int().positive(),
            max: z.number().int().positive(),
          })
          .refine((range) => range.max >= range.min, {
            message: 'max must be greater than or equal to min',
          }),
      ])
      .optional(),
    requirements: z.array(taskConditionSchema).optional(),
  })
  .strict()

const costSchema = z.object({
  currencyType: currencyTypeSchema,
  amount: z.number().positive(),
})

const pachinkoPegSchema = z
  .object({
    x: z.number().nonnegative(),
    y: z.number().nonnegative(),
    radius: z.number().positive().optional(),
    isBouncer: z.boolean().optional(),
  })
  .strict()

const pachinkoBucketSchema = z
  .object({
    id: z.string().min(1),
    x: z.number().nonnegative(),
    y: z.number().nonnegative(),
    width: z.number().positive(),
    height: z.number().positive(),
    label: z.string().min(1).optional(),
    color: z.string().min(1).optional(),
    icon: taskIconSchema.optional(),
    rewards: z.array(rewardSchema),
  })
  .strict()

const pachinkoObstacleSchema = z
  .object({
    x: z.number().nonnegative(),
    y: z.number().nonnegative(),
    width: z.number().positive(),
    height: z.number().positive(),
    angle: z.number().optional(),
    isStatic: z.boolean().optional(),
    bounce: z.number().nonnegative().optional(),
    friction: z.number().nonnegative().optional(),
  })
  .strict()

const pachinkoBoardSchema = z
  .object({
    width: z.number().positive(),
    height: z.number().positive(),
    pegs: z.array(pachinkoPegSchema).min(1),
    buckets: z.array(pachinkoBucketSchema).min(1),
    obstacles: z.array(pachinkoObstacleSchema).optional(),
    wallBounciness: z.number().nonnegative().optional(),
  })
  .strict()
  .superRefine((board, ctx) => {
    const bucketIds = new Set<string>()
    board.buckets.forEach((bucket, index) => {
      if (bucketIds.has(bucket.id)) {
        ctx.addIssue({
          code: 'custom',
          path: ['buckets', index, 'id'],
          message: `Duplicate bucket id: ${bucket.id}`,
        })
      }
      bucketIds.add(bucket.id)

      const halfWidth = bucket.width / 2
      const halfHeight = bucket.height / 2
      if (
        bucket.x - halfWidth < 0 ||
        bucket.x + halfWidth > board.width ||
        bucket.y - halfHeight < 0 ||
        bucket.y + halfHeight > board.height
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['buckets', index],
          message: 'Bucket must fit inside the pachinko board',
        })
      }
    })

    board.pegs.forEach((peg, index) => {
      const radius = peg.radius || 5
      if (
        peg.x - radius < 0 ||
        peg.x + radius > board.width ||
        peg.y - radius < 0 ||
        peg.y + radius > board.height
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['pegs', index],
          message: 'Peg must fit inside the pachinko board',
        })
      }
    })
  })

const pachinkoSettingsSchema = z
  .object({
    board: pachinkoBoardSchema,
    cost: costSchema.optional(),
    ballRadius: z.number().positive().optional(),
    ballBounciness: z.number().nonnegative().optional(),
    gravityScale: z.number().positive().optional(),
    background: z.string().optional(),
    themeColour: z.string().min(1).optional(),
  })
  .strict()

const settingsByGameType: Record<string, z.ZodTypeAny> = {
  silhouette: commonKnowledgeSettings,
  identify: commonKnowledgeSettings,
  snap: commonKnowledgeSettings,
  cry: commonKnowledgeSettings,
  compare: commonKnowledgeSettings.extend({
    maxPokemonShown: z.number().int().min(2).max(6).optional(),
    comparisonOperator: z
      .array(
        z.enum([
          'height',
          'weight',
          'hp',
          'attack',
          'defense',
          'specialAttack',
          'specialDefense',
          'speed',
        ]),
      )
      .optional(),
  }),
  'rock-push': z
    .object({
      grid_size: z.number().int().min(6).max(15).optional(),
      playerStart: rockPushPositionSchema,
      startScreen: z.string().min(1).max(80).optional(),
      boulders: z.array(rockPushPositionSchema).optional(),
      holes: z.array(rockPushPositionSchema).optional(),
      barriers: z.array(rockPushPositionSchema).optional(),
      ice: z.array(rockPushPositionSchema).optional(),
      winTiles: z.array(rockPushPositionSchema).optional(),
      teleporters: z.array(rockPushTeleporterSchema).optional(),
      screens: z.array(rockPushScreenSchema).optional(),
      prizes: z.array(rockPushPrizeSchema).optional(),
      timeLimit: z.number().positive().optional(),
      maxMoves: z.number().int().positive().optional(),
    })
    .passthrough(),
  run: z.object({ speed: z.number().positive() }).passthrough(),
  flap: z.object({ speed: z.number().positive().optional() }).passthrough(),
  slots: z
    .object({
      symbols: z.array(z.object({ id: z.string(), icon: taskIconSchema }).passthrough()).min(1),
      paytable: z.array(z.object({ icons: z.array(z.string()), rewards: z.array(rewardSchema) })),
      cost: costSchema,
    })
    .passthrough(),
  pachinko: pachinkoSettingsSchema,
  'prize-wheel': z
    .object({
      slots: z.array(z.object({ id: z.string(), percentage: z.number().min(0).max(100) }).passthrough()),
      spinTime: z.object({ min: z.number().positive(), max: z.number().positive() }),
      cost: costSchema.optional(),
    })
    .passthrough(),
  fishing: z.object({ rods: z.record(z.string(), z.unknown()) }).passthrough(),
  match3: z.object({ gridSize: z.union([z.number(), z.object({ cols: z.number(), rows: z.number() })]) }).passthrough(),
  spelling: commonKnowledgeSettings.extend({
    missingLetters: z.number().int().positive().optional(),
    extraLetters: z.number().int().nonnegative().optional(),
  }),
  'sliding-puzzle': z
    .object({
      gridSize: z.union([z.number(), z.object({ cols: z.number(), rows: z.number() })]).optional(),
      image: z.string().min(1).optional(),
    })
    .passthrough(),
  rhythm: z
    .object({
      icons: z.array(taskIconSchema.passthrough()).min(1),
      speed: z.number().positive(),
      spawnRate: z.object({ min: z.number().positive(), max: z.number().positive() }),
      timeLimit: z.number().positive(),
    })
    .passthrough(),
  mining: z
    .object({
      targetSize: z.object({ min: z.number().positive(), max: z.number().positive() }),
      speed: z.object({ min: z.number().positive(), max: z.number().positive() }),
      itemHp: z.number().positive(),
      perfectDamage: z.number().positive(),
      okDamage: z.number().positive(),
      timeLimit: z.number().positive(),
      buttonIcon: taskIconSchema,
      miningTarget: z.string().min(1),
    })
    .passthrough(),
  'tcg-inspection': z
    .object({
      packSize: z.number().int().min(3).max(10),
      rounds: z.number().int().positive(),
      countdownSeconds: z.number().positive().optional(),
      attentionSeconds: z.number().positive().optional(),
      previewSeconds: z.number().positive(),
      timeLimit: z.number().positive(),
      winScore: z.number().nonnegative(),
      allowedSetIds: z.array(z.string()).optional(),
      allowedRarities: z.array(z.string()).optional(),
      questionTypes: z
        .array(z.enum(['name', 'rarity', 'supertype', 'set', 'number', 'artist', 'pokemonType', 'hp']))
        .min(1)
        .optional(),
    })
    .passthrough(),
  'tcg-battle': z
    .object({
      deckFormat: z.enum(['baby', 'champions', 'masters']),
      requiredSeries: z.string().min(1),
      opponentDeckCardIds: z.array(z.string().min(1)).length(15),
      themeColour: z.string().min(1).optional(),
    })
    .passthrough(),
  'field-observation': z
    .object({
      pokemonPool: z
        .array(
          z
            .object({
              speciesId: z.number().int().positive(),
              formId: z.string().min(1).optional(),
              weight: z.number().positive(),
              requirements: z.array(taskConditionSchema).optional(),
            })
            .strict(),
        )
        .min(1),
      levelRange: z
        .object({
          min: z.number().int().min(1).max(100),
          max: z.number().int().min(1).max(100),
        })
        .refine((range) => range.max >= range.min, {
          message: 'max must be greater than or equal to min',
        }),
      timeLimit: z.union([
        z.number().positive(),
        z
          .object({
            min: z.number().positive(),
            max: z.number().positive(),
          })
          .refine((range) => range.max >= range.min, {
            message: 'max must be greater than or equal to min',
          }),
      ]),
      answerTimeLimit: z
        .union([
          z.number().positive(),
          z
            .object({
              min: z.number().positive(),
              max: z.number().positive(),
            })
            .refine((range) => range.max >= range.min, {
              message: 'max must be greater than or equal to min',
            }),
        ])
        .optional(),
      difficulty: z.number().int().min(1).max(10).optional(),
      itemDrops: z.array(fieldObservationItemDropSchema).optional(),
    })
    .passthrough(),
  'voltorb-grid': z
    .object({
      gridSize: z
        .object({
          cols: z.number().int().min(5).max(12),
          rows: z.number().int().min(5).max(12),
        })
        .strict(),
      playerStart: voltorbGridPositionSchema,
      exit: voltorbGridPositionSchema,
      walls: z.array(voltorbGridPositionSchema).optional(),
      debris: z.array(voltorbGridPositionSchema).optional(),
      voltorbs: z.array(voltorbGridVoltorbSchema).min(1),
      protectedPokemon: z.array(voltorbGridProtectedPokemonSchema).optional(),
      requiredCleared: z.number().int().nonnegative().optional(),
      timeLimit: z.number().positive().optional(),
      maxMoves: z.number().int().positive().optional(),
      maxDischarges: z.number().int().positive().optional(),
      winRate: z.number().positive().optional(),
      themeColour: z.string().min(1).optional(),
      background: z.string().optional(),
      floorSprite: z.string().optional(),
      boulderSprite: z.string().optional(),
      barrierSprite: z.string().optional(),
      winTileSprite: z.string().optional(),
      playerSprite: z.string().optional(),
    })
    .passthrough()
    .superRefine((settings, ctx) => {
      addGridPositionBoundsIssues(
        ctx,
        settings.gridSize,
        [
          { label: 'playerStart', position: settings.playerStart },
          { label: 'exit', position: settings.exit },
          ...(settings.walls || []).map((position, index) => ({
            label: `walls.${index}`,
            position,
          })),
          ...(settings.debris || []).map((position, index) => ({
            label: `debris.${index}`,
            position,
          })),
          ...settings.voltorbs.map((position, index) => ({
            label: `voltorbs.${index}`,
            position,
          })),
          ...(settings.protectedPokemon || []).map((position, index) => ({
            label: `protectedPokemon.${index}`,
            position,
          })),
        ],
        'Voltorb Grid position must fit inside the board',
      )

      if (
        typeof settings.requiredCleared === 'number' &&
        settings.requiredCleared > (settings.debris || []).length
      ) {
        ctx.addIssue({
          code: 'custom',
          path: ['requiredCleared'],
          message: 'requiredCleared cannot exceed authored debris count',
        })
      }
    }),
  'diglett-tunnel-tap': z
    .object({
      gridSize: z
        .object({
          cols: z.number().int().min(3).max(8),
          rows: z.number().int().min(3).max(8),
        })
        .strict(),
      targetScore: z.number().int().positive(),
      timeLimit: z.number().positive(),
      spawnIntervalMs: z.number().int().min(250).max(3000),
      visibleMs: z.number().int().min(250).max(5000),
      diglettScore: z.number().int().positive().optional(),
      dugtrioPenalty: z.number().int().positive().optional(),
      hazardPokemonId: z.string().min(1).optional(),
      maxLives: z.number().int().positive().optional(),
      winRate: z.number().positive().optional(),
      themeColour: z.string().min(1).optional(),
      background: z.string().optional(),
      floorSprite: z.string().optional(),
      barrierSprite: z.string().optional(),
      winTileSprite: z.string().optional(),
      playerSprite: z.string().optional(),
    })
    .passthrough(),
  'magnemite-circuit': z
    .object({
      gridSize: z
        .object({
          cols: z.number().int().min(4).max(10),
          rows: z.number().int().min(4).max(10),
        })
        .strict(),
      source: voltorbGridPositionSchema,
      targets: z.array(magnemiteCircuitTargetSchema).min(1),
      tiles: z.array(magnemiteCircuitTileSchema).min(1),
      timeLimit: z.number().positive().optional(),
      maxRotations: z.number().int().positive().optional(),
      winRate: z.number().positive().optional(),
      themeColour: z.string().min(1).optional(),
      background: z.string().optional(),
    })
    .passthrough()
    .superRefine((settings, ctx) => {
      addGridPositionBoundsIssues(
        ctx,
        settings.gridSize,
        [
          { label: 'source', position: settings.source },
          ...settings.targets.map((position, index) => ({
            label: `targets.${index}`,
            position,
          })),
          ...settings.tiles.map((position, index) => ({
            label: `tiles.${index}`,
            position,
          })),
        ],
        'Magnemite Circuit position must fit inside the board',
      )

      const tileKeys = new Set(settings.tiles.map((tile) => `${tile.x},${tile.y}`))
      if (!tileKeys.has(`${settings.source.x},${settings.source.y}`)) {
        ctx.addIssue({
          code: 'custom',
          path: ['source'],
          message: 'Magnemite Circuit source must have an authored tile',
        })
      }

      settings.targets.forEach((target, index) => {
        if (!tileKeys.has(`${target.x},${target.y}`)) {
          ctx.addIssue({
            code: 'custom',
            path: ['targets', index],
            message: 'Magnemite Circuit target must have an authored tile',
          })
        }
      })
    }),
  'rock-tunnel-echo-map': z
    .object({
      gridSize: z
        .object({
          cols: z.number().int().min(5).max(12),
          rows: z.number().int().min(5).max(12),
        })
        .strict(),
      playerStart: voltorbGridPositionSchema,
      exit: voltorbGridPositionSchema,
      walls: z.array(voltorbGridPositionSchema),
      holes: z.array(voltorbGridPositionSchema).optional(),
      timeLimit: z.number().positive().optional(),
      maxMoves: z.number().int().positive().optional(),
      revealDurationMs: z.number().int().min(250).max(10000).optional(),
      winRate: z.number().positive().optional(),
      themeColour: z.string().min(1).optional(),
      background: z.string().optional(),
      floorSprite: z.string().optional(),
      barrierSprite: z.string().optional(),
      holeSprite: z.string().optional(),
      winTileSprite: z.string().optional(),
      playerSprite: z.string().optional(),
    })
    .passthrough()
    .superRefine((settings, ctx) => {
      addGridPositionBoundsIssues(
        ctx,
        settings.gridSize,
        [
          { label: 'playerStart', position: settings.playerStart },
          { label: 'exit', position: settings.exit },
          ...settings.walls.map((position, index) => ({
            label: `walls.${index}`,
            position,
          })),
          ...(settings.holes || []).map((position, index) => ({
            label: `holes.${index}`,
            position,
          })),
        ],
        'Rock Tunnel Echo Map position must fit inside the board',
      )
    }),
}

export const gameItemSchema = baseGameSchema
  .extend({
    settings: z.record(z.string(), z.unknown()),
  })
  .superRefine((game, ctx) => {
    const settingsSchema = settingsByGameType[game.gameType]
    if (!settingsSchema) {
      ctx.addIssue({
        code: 'custom',
        path: ['gameType'],
        message: `Unsupported game type: ${game.gameType}`,
      })
      return
    }

    const parsed = settingsSchema.safeParse(game.settings)
    if (!parsed.success) {
      for (const issue of parsed.error.issues) {
        ctx.addIssue({ ...issue, path: ['settings', ...issue.path] })
      }
    }
  })

export function validateGameItem(game: unknown) {
  return gameItemSchema.safeParse(game)
}
