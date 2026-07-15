import type { User } from '@/payload-types'
import type { BattleStance } from '@/utilities/battle/types'
import type { RequirementData } from '@/utilities/requirements'
import type { GameDataKeys } from '@/utilities/requirements/analysis'

export const USER_STATE_COLLECTIONS = {
  inventory: 'user-inventory-items',
  pokedex: 'user-pokedex-entries',
  abilityDex: 'user-abilitydex-entries',
  tasks: 'user-task-progress',
  activityStats: 'user-activity-stats',
  tcg: 'user-tcg-cards',
  shopPurchases: 'user-shop-purchases',
} as const

type PayloadLike = {
  find: (args: any) => Promise<{ docs?: any[] }>
  create: (args: any) => Promise<any>
  update: (args: any) => Promise<any>
  delete: (args: any) => Promise<any>
}

export type UserStateDomain =
  | 'inventory'
  | 'pokedex'
  | 'abilityDex'
  | 'completedTasks'
  | 'battleResults'
  | 'locationEncounterResults'
  | 'researchEncounterResults'
  | 'expeditionResults'
  | 'tcg'
  | 'shopPurchases'

type UserStateData = Pick<
  RequirementData,
  | 'inventory'
  | 'tcg'
  | 'pokedex'
  | 'abilityDex'
  | 'completedTasks'
  | 'battleResults'
  | 'locationEncounterResults'
  | 'researchEncounterResults'
  | 'expeditionResults'
  | 'shopPurchases'
>

type PokedexEntry = RequirementData['pokedex'][number] & {
  totalCaught?: number
  totalSeen?: number
  shinyCaught?: boolean
  shinySeen?: boolean
  preferredBattleStance?: BattleStance
}

type AbilityDexEntry = NonNullable<RequirementData['abilityDex']>[number]
type CompletedTaskEntry = RequirementData['completedTasks'][number]
type InventoryEntry = RequirementData['inventory'][number]
type TcgEntry = RequirementData['tcg'][number]

export type InventoryMap = Record<string, number>
export type TcgMap = Record<string, number>
export type CompletedTasksMap = Record<
  string,
  {
    taskId?: string
    completedAt?: string
    count?: number
    updatedAt?: string
  }
>
export type PokedexMapEntry = Omit<PokedexEntry, 'speciesId' | 'formId'>
export type PokedexMap = Record<string, Record<string, PokedexMapEntry>>
export type AbilityDexMap = Record<string, AbilityDexEntry>
export type ShopPurchasesRecord = NonNullable<RequirementData['shopPurchases']>
export type ActivityStatEntry = {
  wins?: number
  losses?: number
  highScore?: number
  lastPlayed?: string
  updatedAt?: string
  metadata?: Record<string, unknown>
}
export type ActivityStatsMap = {
  battles?: Record<string, ActivityStatEntry>
  locations?: Record<string, ActivityStatEntry>
  research?: Record<string, ActivityStatEntry>
  expeditions?: Record<string, ActivityStatEntry>
}
export type ActivityResultDomain =
  | 'battleResults'
  | 'locationEncounterResults'
  | 'researchEncounterResults'
  | 'expeditionResults'

const HEAVY_USER_KEYS = [
  'inventory',
  'pokedex',
  'stats',
  'completedTasks',
  'shopPurchases',
  'tcg',
  'tcgDecks',
  'tcgDecksByGeneration',
  'redeemedCodes',
  'friends',
  'friendRequests',
  'pokemon',
] as const

const ACTIVITY_TYPES = {
  battleResults: 'battle',
  locationEncounterResults: 'location',
  researchEncounterResults: 'research',
  expeditionResults: 'expedition',
} as const satisfies Record<
  Extract<
    UserStateDomain,
    'battleResults' | 'locationEncounterResults' | 'researchEncounterResults' | 'expeditionResults'
  >,
  string
>

export interface UserStateSyncSummary {
  created: number
  updated: number
  deleted: number
}

function toNumber(value: unknown, fallback = 0): number {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : fallback
}

function toOptionalNumber(value: unknown): number | undefined {
  const numberValue = Number(value)
  return Number.isFinite(numberValue) ? numberValue : undefined
}

function isObjectRecord(value: unknown): value is Record<string, any> {
  return Boolean(value) && typeof value === 'object' && !Array.isArray(value)
}

function extractSetId(cardId: string): string | undefined {
  const parts = cardId.split('-')
  return parts.length > 1 ? parts.slice(0, -1).join('-') : undefined
}

function fieldValue(value: unknown): unknown {
  if (value && typeof value === 'object' && 'id' in value) {
    return (value as { id: unknown }).id
  }
  return value
}

function valuesEqual(left: unknown, right: unknown): boolean {
  return JSON.stringify(fieldValue(left) ?? null) === JSON.stringify(fieldValue(right) ?? null)
}

function getSlimStats(rawStats: unknown): Record<string, unknown> | undefined {
  if (!isObjectRecord(rawStats)) return undefined

  const { battles, locations, research, expeditions, ...smallStats } = rawStats
  void battles
  void locations
  void research
  void expeditions

  return Object.keys(smallStats).length > 0 ? smallStats : undefined
}

function hasRequiredKey(requiredData: GameDataKeys[] | undefined, key: GameDataKeys): boolean {
  return !requiredData || requiredData.length === 0 || requiredData.includes(key)
}

async function findRows(
  payload: PayloadLike,
  collection: string,
  userId: string,
  extraWhere: Record<string, unknown>[] = [],
): Promise<any[]> {
  const and = [{ user: { equals: userId } }, ...extraWhere]
  const result = await payload.find({
    collection,
    where: and.length === 1 ? and[0] : { and },
    pagination: false,
    depth: 0,
    overrideAccess: true,
  })

  return result.docs || []
}

export function toSlimUser(user: User): User {
  const slimUser = { ...(user as any) }

  for (const key of HEAVY_USER_KEYS) {
    delete slimUser[key]
  }

  const smallStats = getSlimStats((user as any).stats)
  if (smallStats) {
    slimUser.stats = smallStats
  }

  return slimUser as User
}

export function getUserProfileStats(user: User | null | undefined): Record<string, any> {
  return getSlimStats((user as any)?.stats) || {}
}

export function inventoryRowsToArray(rows: any[]): InventoryEntry[] {
  return rows.map((row) => ({
    itemId: String(row.itemId),
    quantity: toNumber(row.quantity),
  }))
}

export function inventoryArrayToMap(entries: InventoryEntry[] | undefined): InventoryMap {
  if (!Array.isArray(entries)) return {}

  return Object.fromEntries(
    entries
      .filter((entry) => entry.itemId)
      .map((entry) => [entry.itemId, toNumber(entry.quantity)]),
  )
}

function inventoryMapToRows(
  userId: string,
  inventory: InventoryMap,
): Array<{ key: string; data: Record<string, unknown> }> {
  return Object.entries(inventory)
    .filter(([itemId, quantity]) => itemId && toNumber(quantity) > 0)
    .map(([itemId, quantity]) => ({
      key: itemId,
      data: {
        user: userId,
        itemId,
        quantity: toNumber(quantity),
      },
    }))
}

export function pokedexRowsToArray(rows: any[]): PokedexEntry[] {
  return rows.map((row) => {
    const caught = Boolean(row.caught)
    const totalCaught = toOptionalNumber(row.totalCaught)
    const totalSeen = toOptionalNumber(row.totalSeen)
    const researchXp = toOptionalNumber(row.researchXp)
    const researchLevel = toOptionalNumber(row.researchLevel)
    const seen =
      Boolean(row.seen) ||
      caught ||
      Number(totalCaught || 0) > 0 ||
      Number(totalSeen || 0) > 0 ||
      Number(researchXp || 0) > 0 ||
      Number(researchLevel || 0) > 0

    return {
      speciesId: toNumber(row.speciesId),
      formId: String(row.formId),
      seen,
      caught,
      totalCaught,
      totalSeen,
      shinyCaught: row.shinyCaught === undefined ? undefined : Boolean(row.shinyCaught),
      shinySeen: row.shinySeen === undefined ? undefined : Boolean(row.shinySeen),
      researchXp,
      researchLevel,
      preferredBattleStance: row.preferredBattleStance as BattleStance | undefined,
    }
  })
}

export function pokedexArrayToMap(entries: PokedexEntry[] | undefined): PokedexMap {
  if (!Array.isArray(entries)) return {}

  return entries.reduce<PokedexMap>((map, { speciesId, formId, ...entry }) => {
    const speciesKey = String(speciesId)
    if (!speciesKey || !formId) return map
    map[speciesKey] ||= {}
    map[speciesKey][formId] = entry
    return map
  }, {})
}

export function abilityDexRowsToArray(rows: any[]): AbilityDexEntry[] {
  return rows.map((row) => ({
    abilityId: String(row.abilityId),
    registered: row.registered === undefined ? true : Boolean(row.registered),
    source: row.source || undefined,
    firstRegisteredAt: row.firstRegisteredAt || row.createdAt,
  }))
}

export function abilityDexArrayToMap(entries: AbilityDexEntry[] | undefined): AbilityDexMap {
  if (!Array.isArray(entries)) return {}

  return Object.fromEntries(
    entries.filter((entry) => entry.abilityId).map((entry) => [entry.abilityId, entry]),
  )
}

function abilityDexMapToRows(
  userId: string,
  abilityDex: AbilityDexMap,
): Array<{ key: string; data: Record<string, unknown> }> {
  return Object.entries(abilityDex)
    .filter(([abilityId, entry]) => abilityId && entry?.registered !== false)
    .map(([abilityId, entry]) => ({
      key: abilityId,
      data: {
        user: userId,
        abilityId,
        registered: true,
        source: entry.source ?? null,
        firstRegisteredAt: entry.firstRegisteredAt ?? null,
      },
    }))
}

function pokedexMapToRows(
  userId: string,
  pokedex: PokedexMap,
): Array<{ key: string; data: Record<string, unknown> }> {
  return Object.entries(pokedex).flatMap(([speciesId, forms]) => {
    if (!isObjectRecord(forms)) return []

    return Object.entries(forms)
      .filter(([formId]) => formId && toNumber(speciesId) > 0)
      .map(([formId, entry]) => ({
        key: `${speciesId}:${formId}`,
        data: {
          user: userId,
          speciesId: toNumber(speciesId),
          formId,
          seen: Boolean(entry.seen),
          caught: Boolean(entry.caught),
          totalSeen: entry.totalSeen ?? 0,
          totalCaught: entry.totalCaught ?? 0,
          shinySeen: entry.shinySeen ?? false,
          shinyCaught: entry.shinyCaught ?? false,
          researchXp: entry.researchXp ?? 0,
          researchLevel: entry.researchLevel ?? 0,
          preferredBattleStance: entry.preferredBattleStance ?? null,
        },
      }))
  })
}

export function taskRowsToArray(rows: any[]): CompletedTaskEntry[] {
  return rows.map((row) => ({
    taskId: String(row.taskId),
    completedAt: String(row.completedAt || row.lastCompletedAt || row.updatedAt || ''),
    count: toNumber(row.count),
    updatedAt: row.lastCompletedAt || row.updatedAt,
  }))
}

export function completedTasksArrayToMap(
  completedTasks: CompletedTaskEntry[] | undefined,
): CompletedTasksMap {
  if (!Array.isArray(completedTasks)) return {}

  return Object.fromEntries(
    completedTasks
      .filter((entry) => entry.taskId)
      .map(({ taskId, ...completion }) => [taskId, completion]),
  )
}

function completedTasksMapToRows(
  userId: string,
  completedTasks: CompletedTasksMap,
): Array<{ key: string; data: Record<string, unknown> }> {
  return Object.entries(completedTasks)
    .filter(([taskId, entry]) => taskId && toNumber(entry?.count) > 0)
    .map(([taskId, entry]) => ({
      key: taskId,
      data: {
        user: userId,
        taskId,
        count: toNumber(entry.count),
        completedAt: entry.completedAt || null,
        lastCompletedAt: entry.updatedAt || entry.completedAt || null,
      },
    }))
}

export function tcgRowsToArray(rows: any[]): TcgEntry[] {
  return rows.map((row) => ({
    cardId: String(row.cardId),
    quantity: toNumber(row.quantity),
    setId: row.setId || extractSetId(String(row.cardId)),
  }))
}

export function tcgArrayToMap(tcg: TcgEntry[] | undefined): TcgMap {
  if (!Array.isArray(tcg)) return {}

  return Object.fromEntries(
    tcg.filter((entry) => entry.cardId).map((entry) => [entry.cardId, toNumber(entry.quantity)]),
  )
}

function tcgMapToRows(
  userId: string,
  tcg: TcgMap,
): Array<{ key: string; data: Record<string, unknown> }> {
  return Object.entries(tcg)
    .filter(([cardId, quantity]) => cardId && toNumber(quantity) > 0)
    .map(([cardId, quantity]) => ({
      key: cardId,
      data: {
        user: userId,
        cardId,
        setId: extractSetId(cardId) ?? null,
        quantity: toNumber(quantity),
      },
    }))
}

export function shopPurchaseRowsToRecord(
  rows: any[],
): NonNullable<RequirementData['shopPurchases']> {
  return rows.reduce<Record<string, unknown>>((record, row) => {
    record[String(row.shopItemId)] = {
      count: toNumber(row.count),
      lastPurchasedAt: row.lastPurchasedAt,
      shopId: row.shopId,
      itemId: row.itemId,
    }
    return record
  }, {}) as NonNullable<RequirementData['shopPurchases']>
}

function shopPurchasesRecordToRows(
  userId: string,
  shopPurchases: ShopPurchasesRecord,
): Array<{ key: string; data: Record<string, unknown> }> {
  return Object.entries(shopPurchases)
    .filter(([shopItemId, entry]) => shopItemId && toNumber((entry as any)?.count) > 0)
    .map(([shopItemId, entry]) => {
      const purchase = isObjectRecord(entry) ? entry : {}

      return {
        key: shopItemId,
        data: {
          user: userId,
          shopItemId,
          shopId: purchase.shopId ?? null,
          itemId: purchase.itemId ?? null,
          count: toNumber(purchase.count),
          firstPurchasedAt: purchase.firstPurchasedAt || purchase.purchasedAt || null,
          lastPurchasedAt: purchase.lastPurchasedAt || purchase.purchasedAt || null,
        },
      }
    })
}

type ActivityBuckets = Pick<
  UserStateData,
  'battleResults' | 'locationEncounterResults' | 'researchEncounterResults' | 'expeditionResults'
>

export function activityRowsToArrays(rows: any[]): ActivityBuckets {
  const rowsForType = (activityType: string) =>
    rows.filter((row) => row.activityType === activityType)

  const mapRows = (activityType: string, idKey: string): any[] =>
    rowsForType(activityType).map((row) => {
      return {
        [idKey]: String(row.activityId),
        wins: toNumber(row.wins),
        losses: toNumber(row.losses),
        highScore: toOptionalNumber(row.highScore),
        lastPlayed: row.lastPlayed || row.updatedAt,
        updatedAt: row.updatedAt,
      }
    })

  return {
    battleResults: mapRows('battle', 'battleId') as ActivityBuckets['battleResults'],
    locationEncounterResults: mapRows(
      'location',
      'locationId',
    ) as ActivityBuckets['locationEncounterResults'],
    researchEncounterResults: mapRows(
      'research',
      'encounterId',
    ) as ActivityBuckets['researchEncounterResults'],
    expeditionResults: mapRows('expedition', 'expeditionId') as NonNullable<
      ActivityBuckets['expeditionResults']
    >,
  }
}

export function activityRowsToMap(rows: any[]): ActivityStatsMap {
  const map: ActivityStatsMap = {
    battles: {},
    locations: {},
    research: {},
    expeditions: {},
  }

  for (const row of rows) {
    const activityId = String(row.activityId || '')
    if (!activityId) continue

    const entry = {
      wins: toNumber(row.wins),
      losses: toNumber(row.losses),
      highScore: toOptionalNumber(row.highScore),
      lastPlayed: row.lastPlayed || row.updatedAt,
      updatedAt: row.updatedAt,
      metadata: isObjectRecord(row.metadata) ? row.metadata : undefined,
    }

    if (row.activityType === 'battle') map.battles![activityId] = entry
    if (row.activityType === 'location') map.locations![activityId] = entry
    if (row.activityType === 'research') map.research![activityId] = entry
    if (row.activityType === 'expedition') map.expeditions![activityId] = entry
  }

  return map
}

function activityMapToRows(
  userId: string,
  stats: ActivityStatsMap,
  domain: keyof typeof ACTIVITY_TYPES,
): Array<{ key: string; data: Record<string, unknown> }> {
  const activityType = ACTIVITY_TYPES[domain]
  const sourceKey =
    domain === 'battleResults'
      ? 'battles'
      : domain === 'locationEncounterResults'
        ? 'locations'
        : domain === 'researchEncounterResults'
          ? 'research'
          : 'expeditions'
  const source = isObjectRecord(stats[sourceKey]) ? stats[sourceKey] : {}

  return Object.entries(source)
    .map(([activityId, entry]) => ({
      key: activityId,
      data: {
        user: userId,
        activityType,
        activityId,
        wins: toNumber(entry.wins),
        losses: toNumber(entry.losses),
        highScore: toOptionalNumber(entry.highScore) ?? null,
        lastPlayed: entry.lastPlayed || entry.updatedAt || null,
        metadata: isObjectRecord(entry.metadata) ? entry.metadata : {},
      },
    }))
    .filter(({ data }) => data.wins || data.losses || data.highScore || data.lastPlayed)
}

export async function getUserInventoryMap(
  payload: PayloadLike,
  userId: string,
): Promise<InventoryMap> {
  return inventoryArrayToMap(
    inventoryRowsToArray(await findRows(payload, USER_STATE_COLLECTIONS.inventory, userId)),
  )
}

export async function setUserInventoryMap(
  payload: PayloadLike,
  userId: string,
  inventory: InventoryMap,
): Promise<UserStateSyncSummary> {
  return replaceRowsForUser(
    payload,
    USER_STATE_COLLECTIONS.inventory,
    userId,
    inventoryMapToRows(userId, inventory),
    (row) => String(row.itemId),
  )
}

export async function getUserTcgMap(payload: PayloadLike, userId: string): Promise<TcgMap> {
  return tcgArrayToMap(tcgRowsToArray(await findRows(payload, USER_STATE_COLLECTIONS.tcg, userId)))
}

export async function setUserTcgMap(
  payload: PayloadLike,
  userId: string,
  tcg: TcgMap,
): Promise<UserStateSyncSummary> {
  return replaceRowsForUser(
    payload,
    USER_STATE_COLLECTIONS.tcg,
    userId,
    tcgMapToRows(userId, tcg),
    (row) => String(row.cardId),
  )
}

export async function getUserPokedexMap(payload: PayloadLike, userId: string): Promise<PokedexMap> {
  return pokedexArrayToMap(
    pokedexRowsToArray(await findRows(payload, USER_STATE_COLLECTIONS.pokedex, userId)),
  )
}

export async function getUserAbilityDexMap(
  payload: PayloadLike,
  userId: string,
): Promise<AbilityDexMap> {
  return abilityDexArrayToMap(
    abilityDexRowsToArray(await findRows(payload, USER_STATE_COLLECTIONS.abilityDex, userId)),
  )
}

export async function setUserPokedexMap(
  payload: PayloadLike,
  userId: string,
  pokedex: PokedexMap,
): Promise<UserStateSyncSummary> {
  return replaceRowsForUser(
    payload,
    USER_STATE_COLLECTIONS.pokedex,
    userId,
    pokedexMapToRows(userId, pokedex),
    (row) => `${row.speciesId}:${row.formId}`,
  )
}

export async function setUserAbilityDexMap(
  payload: PayloadLike,
  userId: string,
  abilityDex: AbilityDexMap,
): Promise<UserStateSyncSummary> {
  return replaceRowsForUser(
    payload,
    USER_STATE_COLLECTIONS.abilityDex,
    userId,
    abilityDexMapToRows(userId, abilityDex),
    (row) => String(row.abilityId),
  )
}

export async function getUserCompletedTasksMap(
  payload: PayloadLike,
  userId: string,
): Promise<CompletedTasksMap> {
  return completedTasksArrayToMap(
    taskRowsToArray(await findRows(payload, USER_STATE_COLLECTIONS.tasks, userId)),
  )
}

export async function setUserCompletedTasksMap(
  payload: PayloadLike,
  userId: string,
  completedTasks: CompletedTasksMap,
): Promise<UserStateSyncSummary> {
  return replaceRowsForUser(
    payload,
    USER_STATE_COLLECTIONS.tasks,
    userId,
    completedTasksMapToRows(userId, completedTasks),
    (row) => String(row.taskId),
  )
}

export async function getUserShopPurchasesRecord(
  payload: PayloadLike,
  userId: string,
): Promise<ShopPurchasesRecord> {
  return shopPurchaseRowsToRecord(
    await findRows(payload, USER_STATE_COLLECTIONS.shopPurchases, userId),
  )
}

export async function setUserShopPurchasesRecord(
  payload: PayloadLike,
  userId: string,
  shopPurchases: ShopPurchasesRecord,
): Promise<UserStateSyncSummary> {
  return replaceRowsForUser(
    payload,
    USER_STATE_COLLECTIONS.shopPurchases,
    userId,
    shopPurchasesRecordToRows(userId, shopPurchases),
    (row) => String(row.shopItemId),
  )
}

export async function getUserActivityStatsMap(
  payload: PayloadLike,
  userId: string,
  domains?: Array<keyof typeof ACTIVITY_TYPES>,
): Promise<ActivityStatsMap> {
  const activityTypes = domains?.map((domain) => ACTIVITY_TYPES[domain]) || []
  const extraWhere = activityTypes.length > 0 ? [{ activityType: { in: activityTypes } }] : []

  return activityRowsToMap(
    await findRows(payload, USER_STATE_COLLECTIONS.activityStats, userId, extraWhere),
  )
}

export async function setUserActivityStatsMap(
  payload: PayloadLike,
  userId: string,
  stats: ActivityStatsMap,
  domains: Array<keyof typeof ACTIVITY_TYPES> = [
    'battleResults',
    'locationEncounterResults',
    'researchEncounterResults',
    'expeditionResults',
  ],
): Promise<UserStateSyncSummary> {
  let summary: UserStateSyncSummary = { created: 0, updated: 0, deleted: 0 }

  for (const domain of domains) {
    summary = mergeSummaries(
      summary,
      await replaceRowsForUser(
        payload,
        USER_STATE_COLLECTIONS.activityStats,
        userId,
        activityMapToRows(userId, stats, domain),
        (row) => String(row.activityId),
        {
          extraWhere: [{ activityType: { equals: ACTIVITY_TYPES[domain] } }],
        },
      ),
    )
  }

  return summary
}

export async function incrementUserActivityResult(
  payload: PayloadLike,
  userId: string,
  domain: ActivityResultDomain,
  activityId: string,
  result: {
    wins?: number
    losses?: number
    highScore?: number
    metadata?: Record<string, unknown>
  },
): Promise<ActivityStatEntry> {
  const activityType = ACTIVITY_TYPES[domain]
  const now = new Date().toISOString()
  const existingRows = await findRows(payload, USER_STATE_COLLECTIONS.activityStats, userId, [
    { activityType: { equals: activityType } },
    { activityId: { equals: activityId } },
  ])
  const existing = existingRows[0]
  const existingHighScore = toOptionalNumber(existing?.highScore)
  const nextHighScore =
    result.highScore === undefined
      ? existingHighScore
      : Math.max(existingHighScore ?? 0, result.highScore)
  const entry: ActivityStatEntry = {
    wins: toNumber(existing?.wins) + toNumber(result.wins),
    losses: toNumber(existing?.losses) + toNumber(result.losses),
    highScore: nextHighScore,
    lastPlayed: now,
    updatedAt: now,
    metadata: {
      ...(isObjectRecord(existing?.metadata) ? existing.metadata : {}),
      ...(result.metadata || {}),
    },
  }
  const data = {
    user: userId,
    activityType,
    activityId,
    wins: entry.wins,
    losses: entry.losses,
    highScore: entry.highScore ?? null,
    lastPlayed: entry.lastPlayed,
    metadata: entry.metadata || {},
  }

  if (existing) {
    await payload.update({
      collection: USER_STATE_COLLECTIONS.activityStats,
      id: existing.id,
      data,
      overrideAccess: true,
    })
  } else {
    await payload.create({
      collection: USER_STATE_COLLECTIONS.activityStats,
      data,
      overrideAccess: true,
    })
  }

  return entry
}

export async function getUserStateData(
  payload: PayloadLike,
  user: User,
  requiredData?: GameDataKeys[],
): Promise<UserStateData> {
  const shouldFetchActivityStats =
    hasRequiredKey(requiredData, 'battleResults') ||
    hasRequiredKey(requiredData, 'locationEncounterResults') ||
    hasRequiredKey(requiredData, 'researchEncounterResults') ||
    hasRequiredKey(requiredData, 'expeditionResults')

  const [
    inventoryRows,
    pokedexRows,
    abilityDexRows,
    taskRows,
    activityRows,
    tcgRows,
    shopPurchaseRows,
  ] = await Promise.all([
    hasRequiredKey(requiredData, 'inventory')
      ? findRows(payload, USER_STATE_COLLECTIONS.inventory, user.id)
      : Promise.resolve([]),
    hasRequiredKey(requiredData, 'pokedex')
      ? findRows(payload, USER_STATE_COLLECTIONS.pokedex, user.id)
      : Promise.resolve([]),
    hasRequiredKey(requiredData, 'abilityDex')
      ? findRows(payload, USER_STATE_COLLECTIONS.abilityDex, user.id)
      : Promise.resolve([]),
    hasRequiredKey(requiredData, 'completedTasks')
      ? findRows(payload, USER_STATE_COLLECTIONS.tasks, user.id)
      : Promise.resolve([]),
    shouldFetchActivityStats
      ? findRows(payload, USER_STATE_COLLECTIONS.activityStats, user.id)
      : Promise.resolve([]),
    hasRequiredKey(requiredData, 'tcg')
      ? findRows(payload, USER_STATE_COLLECTIONS.tcg, user.id)
      : Promise.resolve([]),
    hasRequiredKey(requiredData, 'shopPurchases')
      ? findRows(payload, USER_STATE_COLLECTIONS.shopPurchases, user.id)
      : Promise.resolve([]),
  ])

  const rowStats = activityRowsToArrays(activityRows)

  return {
    inventory: hasRequiredKey(requiredData, 'inventory') ? inventoryRowsToArray(inventoryRows) : [],
    tcg: hasRequiredKey(requiredData, 'tcg') ? tcgRowsToArray(tcgRows) : [],
    pokedex: hasRequiredKey(requiredData, 'pokedex') ? pokedexRowsToArray(pokedexRows) : [],
    abilityDex: hasRequiredKey(requiredData, 'abilityDex')
      ? abilityDexRowsToArray(abilityDexRows)
      : [],
    completedTasks: hasRequiredKey(requiredData, 'completedTasks') ? taskRowsToArray(taskRows) : [],
    battleResults: hasRequiredKey(requiredData, 'battleResults') ? rowStats.battleResults : [],
    locationEncounterResults: hasRequiredKey(requiredData, 'locationEncounterResults')
      ? rowStats.locationEncounterResults
      : [],
    researchEncounterResults: hasRequiredKey(requiredData, 'researchEncounterResults')
      ? rowStats.researchEncounterResults
      : [],
    expeditionResults: hasRequiredKey(requiredData, 'expeditionResults')
      ? rowStats.expeditionResults
      : [],
    shopPurchases: hasRequiredKey(requiredData, 'shopPurchases')
      ? shopPurchaseRowsToRecord(shopPurchaseRows)
      : undefined,
  }
}

function existingValueMatches(
  doc: Record<string, unknown>,
  data: Record<string, unknown>,
): boolean {
  return Object.entries(data)
    .filter(([key]) => key !== 'user')
    .every(([key, value]) => valuesEqual(doc[key], value))
}

async function replaceRowsForUser(
  payload: PayloadLike,
  collection: string,
  userId: string,
  rows: Array<{ key: string; data: Record<string, unknown> }>,
  getExistingKey: (row: any) => string,
  options: {
    dryRun?: boolean
    extraWhere?: Record<string, unknown>[]
  } = {},
): Promise<UserStateSyncSummary> {
  const existingRows = await findRows(payload, collection, userId, options.extraWhere)
  const existingByKey = new Map(existingRows.map((row) => [getExistingKey(row), row]))
  const wantedByKey = new Map(rows.map((row) => [row.key, row.data]))
  const summary: UserStateSyncSummary = { created: 0, updated: 0, deleted: 0 }

  for (const row of existingRows) {
    if (wantedByKey.has(getExistingKey(row))) continue
    summary.deleted += 1

    if (!options.dryRun) {
      await payload.delete({
        collection,
        id: row.id,
        overrideAccess: true,
      })
    }
  }

  for (const [key, data] of wantedByKey) {
    const existing = existingByKey.get(key)

    if (!existing) {
      summary.created += 1

      if (!options.dryRun) {
        await payload.create({
          collection,
          data,
          overrideAccess: true,
        })
      }
      continue
    }

    if (existingValueMatches(existing, data)) continue
    summary.updated += 1

    if (!options.dryRun) {
      await payload.update({
        collection,
        id: existing.id,
        data,
        overrideAccess: true,
      })
    }
  }

  return summary
}

function mergeSummaries(
  summary: UserStateSyncSummary,
  nextSummary: UserStateSyncSummary,
): UserStateSyncSummary {
  return {
    created: summary.created + nextSummary.created,
    updated: summary.updated + nextSummary.updated,
    deleted: summary.deleted + nextSummary.deleted,
  }
}
