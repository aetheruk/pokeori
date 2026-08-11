import { getPayload, type Payload, type PayloadRequest } from 'payload'
import payloadConfig from '@/payload.config'
import { tcgRarityOdds } from '@/data/tcg-rarity'
import type { TcgCard } from '@/data/tcg/types'
import { getAllTcgCards, getTcgSetById } from '@/utilities/tcg/tcg'
import { checkUserAuth } from '@/utilities/auth/server-auth'
import { incrementDailyTaskProgress } from '@/utilities/tasks/daily-progress'
import { getUserInventoryMap, getUserTcgMap, setUserTcgMap } from '@/utilities/user-state'

export interface CardDrawParams {
  allowedSetIds?: string[]
  allowedPokemonIds?: Array<number | string>
  allowedCardIds?: string[]
  rarityModifier?: number
  qty?: number
  bonusThreshold?: number
  allowedRarities?: string[]
  guaranteed?: boolean
  rng?: () => number
  logger?: Pick<Console, 'debug' | 'warn'>
  userInventory?: Record<string, number>
  payload?: Payload
  req?: PayloadRequest
  persist?: boolean
}

export interface SingleCardDrawResult {
  card: TcgCard | null
  roll: number
  initialPoolSize: number
  finalPoolSize: number
  bonusRoll: number | null
  bonusRewardApplied: boolean
  discarded?: boolean
  discardReason?: string
}

export interface CardDrawResult extends SingleCardDrawResult {
  draws: SingleCardDrawResult[]
}

export type NormalizedTcgPackRarity =
  | 'common'
  | 'uncommon'
  | 'rare'
  | 'chase'

type BoosterPackSlot = 'standard' | 'rareOrBetter' | 'promo'

/**
 * The source API has many historical rarity labels. These are the labels used
 * by pack generation after they have been reduced to the four game buckets.
 * Rare is the broad, general rare pool; chase is reserved for secret and
 * special-illustration style cards.
 */
export const TCG_PACK_RARITY_BUCKETS = {
  common: ['Common', 'Promo', 'Unknown'],
  uncommon: ['Uncommon'],
  rare: [
    'Rare',
    'Rare Holo',
    'Double Rare',
    'Rare Holo EX',
    'Rare Holo GX',
    'Rare Holo V',
    'Rare Holo VMAX',
    'Rare Holo VSTAR',
    'Rare Shining',
    'Rare Shiny',
    'Rare Shiny GX',
    'Shiny Rare',
    'Radiant Rare',
    'Rare ACE',
    'ACE SPEC Rare',
    'Amazing Rare',
    'Rare Prism Star',
    'Rare Prime',
    'Rare Holo LV.X',
    'Rare BREAK',
    'Rare Ultra',
    'Ultra Rare',
    'Shiny Ultra Rare',
    'Illustration Rare',
    'Trainer Gallery Rare Holo',
    'LEGEND',
    'Classic Collection',
  ],
  chase: [
    'Special Illustration Rare',
    'MEGA_ATTACK_RARE',
    'Rare Secret',
    'Rare Rainbow',
    'Hyper Rare',
    'Mega Hyper Rare',
    'Black White Rare',
    'Rare Holo Star',
  ],
} as const

export type TcgBoosterRarityWeights = Record<NormalizedTcgPackRarity, number>

/** Per-slot odds for a normal booster pack. Values are percentage points. */
export const TCG_BOOSTER_SLOT_WEIGHTS: TcgBoosterRarityWeights = {
  common: 65,
  uncommon: 20,
  rare: 14,
  chase: 1,
}

export interface BoosterPackDraw {
  cards: TcgCard[]
  godPack: boolean
}

export interface BoosterPackDrawResult extends CardDrawResult {
  packs: BoosterPackDraw[]
}

export interface BuildBoosterPackDrawParams {
  setId: string
  cardsPerPack: number
  packCount?: number
  bulkPenalty?: boolean
  rng?: () => number
  collection?: Record<string, number>
}

export interface TcgBoosterPackDrawParams extends BuildBoosterPackDrawParams {
  logger?: Pick<Console, 'debug' | 'warn'>
  userInventory?: Record<string, number>
  payload?: Payload
  req?: PayloadRequest
  persist?: boolean
}

const GUARANTEED_BONUS_ROLL_CUTOFF = 0.0001
export const TCG_GOD_PACK_RATE = 1 / 1000
const NEW_CARD_WEIGHT_BONUS = 1.15

const TCG_PACK_RARITY_LOOKUP = new Map<string, NormalizedTcgPackRarity>(
  (Object.entries(TCG_PACK_RARITY_BUCKETS) as Array<
    [NormalizedTcgPackRarity, readonly string[]]
  >).flatMap(([bucket, rarities]) => rarities.map((rarity) => [rarity, bucket])),
)

const defaultLogger: Pick<Console, 'debug' | 'warn'> =
  typeof console !== 'undefined'
    ? console
    : {
        debug: () => {},
        warn: () => {},
      }

function clamp(value: number, min: number, max: number): number {
  if (Number.isNaN(value)) {
    return min
  }
  return Math.min(max, Math.max(min, value))
}

function normalizeSetIds(ids?: string[]): Set<string> | null {
  if (!ids || ids.length === 0) {
    return null
  }
  return new Set(ids.map((id) => id.trim().toLowerCase()).filter(Boolean))
}

function normalizePokemonIds(ids?: Array<number | string>): Set<number> | null {
  if (!ids || ids.length === 0) {
    return null
  }

  const output = new Set<number>()

  ids.forEach((value) => {
    if (typeof value === 'number' && Number.isFinite(value)) {
      output.add(value)
      return
    }

    if (typeof value === 'string') {
      const parsed = Number.parseInt(value, 10)
      if (Number.isFinite(parsed)) {
        output.add(parsed)
      }
    }
  })

  return output.size > 0 ? output : null
}

function normalizeQuantity(qty?: number): number {
  if (qty === undefined) {
    return 1
  }

  if (!Number.isFinite(qty)) {
    return 1
  }

  const floored = Math.floor(qty)
  if (floored <= 0) {
    return 1
  }

  // prevent unbounded loops but allow reasonably large pulls
  return clamp(floored, 1, 100)
}

function getCardSetId(card: TcgCard): string {
  return card.id.split('-')[0]?.trim().toLowerCase() ?? ''
}

function getCardRarityChance(card: TcgCard, modifier: number): number {
  const rarityKey =
    card.rarity && tcgRarityOdds[card.rarity as keyof typeof tcgRarityOdds] !== undefined
      ? card.rarity
      : 'Unknown'
  const baseChance = tcgRarityOdds[rarityKey as keyof typeof tcgRarityOdds] ?? 0
  return clamp(baseChance + modifier, 0, 1)
}

export function normalizeTcgPackRarity(rarity?: string | null): NormalizedTcgPackRarity {
  return TCG_PACK_RARITY_LOOKUP.get(rarity?.trim() || '') ?? 'common'
}

function getBoosterPackSlots(cardsPerPack: number, godPack: boolean): BoosterPackSlot[] {
  const count = normalizeQuantity(cardsPerPack)
  if (count === 1) return ['promo']
  return Array.from({ length: count }, () => (godPack ? 'rareOrBetter' : 'standard'))
}

export function getTcgBoosterSlotRarityWeights(_bulkPenalty = false): TcgBoosterRarityWeights {
  return { ...TCG_BOOSTER_SLOT_WEIGHTS }
}

function weightedPick<T>(
  entries: T[],
  getWeight: (entry: T) => number,
  rng: () => number,
): T | null {
  const weighted = entries
    .map((entry) => ({ entry, weight: Math.max(0, getWeight(entry)) }))
    .filter(({ weight }) => weight > 0)
  const total = weighted.reduce((sum, entry) => sum + entry.weight, 0)
  if (total <= 0) return null

  let roll = clamp(rng(), 0, 1) * total
  for (const { entry, weight } of weighted) {
    roll -= weight
    if (roll <= 0) return entry
  }

  return weighted[weighted.length - 1]?.entry ?? null
}

function pickCardFromPool(
  pool: TcgCard[],
  openedInPack: Set<string>,
  collection: Record<string, number>,
  rng: () => number,
): TcgCard | null {
  if (pool.length === 0) return null

  const dedupedPool = pool.filter((card) => !openedInPack.has(card.id))
  const workingPool = dedupedPool.length > 0 ? dedupedPool : pool
  return weightedPick(
    workingPool,
    (card) => ((collection[card.id] || 0) <= 0 ? NEW_CARD_WEIGHT_BONUS : 1),
    rng,
  )
}

function pickBucketCard(
  bucketedCards: Record<NormalizedTcgPackRarity, TcgCard[]>,
  buckets: NormalizedTcgPackRarity[],
  openedInPack: Set<string>,
  collection: Record<string, number>,
  rng: () => number,
): TcgCard | null {
  for (const bucket of buckets) {
    const card = pickCardFromPool(bucketedCards[bucket], openedInPack, collection, rng)
    if (card) return card
  }
  return null
}

function pickChaseCard(
  bucketedCards: Record<NormalizedTcgPackRarity, TcgCard[]>,
  openedInPack: Set<string>,
  collection: Record<string, number>,
  rng: () => number,
): TcgCard | null {
  const unownedChaseCards = bucketedCards.chase.filter(
    (card) => (collection[card.id] || 0) <= 0 && !openedInPack.has(card.id),
  )

  // Prefer a chase card the user has not collected. Once every chase card is
  // owned (or all remaining unowned cards are already in this pack), fall back
  // to the normal pool so the slot is still drawable.
  return pickCardFromPool(
    unownedChaseCards.length > 0 ? unownedChaseCards : bucketedCards.chase,
    openedInPack,
    collection,
    rng,
  )
}

function pickWeightedBucketCard(
  bucketedCards: Record<NormalizedTcgPackRarity, TcgCard[]>,
  openedInPack: Set<string>,
  collection: Record<string, number>,
  weights: TcgBoosterRarityWeights,
  allowedBuckets: NormalizedTcgPackRarity[],
  rng: () => number,
): TcgCard | null {
  const availableBuckets = allowedBuckets.filter(
    (bucket) => bucketedCards[bucket].length > 0 && weights[bucket] > 0,
  )
  const selectedBucket = weightedPick(availableBuckets, (bucket) => weights[bucket], rng)
  if (!selectedBucket) {
    return pickBucketCard(
      bucketedCards,
      ['uncommon', 'common'],
      openedInPack,
      collection,
      rng,
    )
  }

  return selectedBucket === 'chase'
    ? pickChaseCard(bucketedCards, openedInPack, collection, rng)
    : pickCardFromPool(bucketedCards[selectedBucket], openedInPack, collection, rng)
}

export function buildTcgBoosterPackDraws({
  setId,
  cardsPerPack,
  packCount = 1,
  bulkPenalty = false,
  rng = Math.random,
  collection = {},
}: BuildBoosterPackDrawParams): BoosterPackDraw[] {
  const set = getTcgSetById(setId)
  const setCards = set?.cards || []
  if (setCards.length === 0) return []

  const bucketedCards = {
    common: [] as TcgCard[],
    uncommon: [] as TcgCard[],
    rare: [] as TcgCard[],
    chase: [] as TcgCard[],
  } satisfies Record<NormalizedTcgPackRarity, TcgCard[]>

  for (const card of setCards) {
    bucketedCards[normalizeTcgPackRarity(card.rarity)].push(card)
  }

  const normalizedPackCount = normalizeQuantity(packCount)
  const packs: BoosterPackDraw[] = []
  const slotWeights = getTcgBoosterSlotRarityWeights(bulkPenalty)
  // Keep selections from earlier packs in this operation visible to the chase
  // protection without mutating the caller's collection object.
  const workingCollection = { ...collection }

  for (let packIndex = 0; packIndex < normalizedPackCount; packIndex += 1) {
    const godPack = cardsPerPack > 1 && clamp(rng(), 0, 1) < TCG_GOD_PACK_RATE
    const slots = getBoosterPackSlots(cardsPerPack, godPack)
    const openedInPack = new Set<string>()
    const packCards: TcgCard[] = []

    for (const slot of slots) {
      const card =
        slot === 'promo'
          ? pickCardFromPool(setCards, openedInPack, workingCollection, rng)
          : pickWeightedBucketCard(
              bucketedCards,
              openedInPack,
              workingCollection,
              slot === 'rareOrBetter'
                ? { common: 0, uncommon: 0, rare: slotWeights.rare, chase: slotWeights.chase }
                : slotWeights,
              slot === 'rareOrBetter'
                ? ['rare', 'chase']
                : ['common', 'uncommon', 'rare', 'chase'],
              rng,
            )

      if (card) {
        packCards.push(card)
        openedInPack.add(card.id)
        workingCollection[card.id] = (workingCollection[card.id] || 0) + 1
      }
    }

    packs.push({ cards: packCards, godPack })
  }

  return packs
}

export async function drawRandomTcgCard(params: CardDrawParams = {}): Promise<CardDrawResult> {
  'use server'
  const { user } = await checkUserAuth()
  const userId = typeof user === 'string' ? user : user?.id
  if (!userId) {
    throw new Error('[TCG Draw] Authenticated user is missing an ID.')
  }

  const {
    allowedSetIds,
    allowedPokemonIds,
    allowedCardIds,
    rarityModifier = 0,
    qty = 1,
    bonusThreshold = 0.1,
    rng = Math.random,
    logger = defaultLogger,
    userInventory,
  } = params

  const quantity = normalizeQuantity(qty)
  const modifier = clamp(rarityModifier, -1, 1)
  const bonusCutoff = clamp(bonusThreshold, 0, 1)
  if (bonusCutoff !== bonusThreshold) {
    logger.warn?.('[TCG Draw] Bonus threshold clamped to range [0, 1].', {
      requested: bonusThreshold,
      applied: bonusCutoff,
    })
  }
  if (modifier !== rarityModifier) {
    logger.warn?.('[TCG Draw] Rarity modifier clamped to range [-1, 1].', {
      requested: rarityModifier,
      applied: modifier,
    })
  }

  const setFilter = normalizeSetIds(allowedSetIds)
  const pokemonFilter = normalizePokemonIds(allowedPokemonIds)
  const cardIdFilter = normalizeSetIds(allowedCardIds)
  const rarityFilter = normalizeSetIds(params.allowedRarities)
  const cards = getAllTcgCards()

  const initialPool = cards.filter((card) => {
    if (cardIdFilter && !cardIdFilter.has(card.id.toLowerCase())) {
      return false
    }

    if (setFilter && !setFilter.has(getCardSetId(card))) {
      return false
    }

    if (rarityFilter && (!card.rarity || !rarityFilter.has(card.rarity.trim().toLowerCase()))) {
      return false
    }

    if (pokemonFilter) {
      const matchesPokemon =
        card.nationalPokedexNumbers?.some((num) => pokemonFilter.has(num)) ?? false
      if (!matchesPokemon) {
        return false
      }
    }

    return true
  })

  logger.debug?.('[TCG Draw] Initial pool size:', initialPool.length)

  if (initialPool.length === 0) {
    const createEmptyDraw = (): SingleCardDrawResult => ({
      card: null,
      roll: 0,
      initialPoolSize: 0,
      finalPoolSize: 0,
      bonusRoll: null,
      bonusRewardApplied: false,
    })

    const draws = Array.from({ length: quantity }, () => createEmptyDraw())
    return {
      ...draws[0],
      draws,
    }
  }

  const draws: SingleCardDrawResult[] = []

  for (let attempt = 0; attempt < quantity; attempt += 1) {
    const roll = clamp(rng(), 0, 1)
    logger.debug?.(`[TCG Draw] Roll #${attempt + 1}:`, roll)
    const guaranteedBonus = roll < GUARANTEED_BONUS_ROLL_CUTOFF

    const eligibleCards = initialPool.filter((card) => roll <= getCardRarityChance(card, modifier))
    logger.debug?.(`[TCG Draw] Final pool size #${attempt + 1}:`, eligibleCards.length)

    let workingPool = eligibleCards

    // If guaranteed is true and rarity check failed, fall back to initialPool
    if (params.guaranteed && workingPool.length === 0) {
      logger.debug?.(
        `[TCG Draw] Rarity check failed for guaranteed draw #${attempt + 1}; falling back to initial pool.`,
      )
      workingPool = initialPool
    }

    let selectedCard: TcgCard | null = null
    let bonusRoll: number | null = null
    let bonusRewardApplied = false

    if (workingPool.length === 0) {
      logger.warn?.(
        `[TCG Draw] No cards matched the rarity roll for draw #${attempt + 1}; returning null.`,
      )
    } else {
      bonusRoll = clamp(rng(), 0, 1)
      logger.debug?.(`[TCG Draw] Bonus roll #${attempt + 1}:`, bonusRoll)
      const bonusTriggered = guaranteedBonus || bonusRoll < bonusCutoff

      if (bonusTriggered) {
        let rarestChance = Infinity
        workingPool.forEach((card) => {
          const chance = getCardRarityChance(card, modifier)
          if (chance < rarestChance) {
            rarestChance = chance
          }
        })

        const EPS = 1e-10
        workingPool = workingPool.filter((card) => {
          const chance = getCardRarityChance(card, modifier)
          return Math.abs(chance - rarestChance) <= EPS
        })

        bonusRewardApplied = true
        if (guaranteedBonus) {
          logger.debug?.(
            `[TCG Draw] Guaranteed ultra-low roll triggered bonus for draw #${attempt + 1}.`,
          )
        }
        logger.debug?.(
          `[TCG Draw] Bonus applied for draw #${attempt + 1}, rarest pool size: ${workingPool.length}`,
        )

        if (workingPool.length === 0) {
          logger.warn?.(
            '[TCG Draw] Bonus filtering removed all cards unexpectedly; reverting to original pool.',
          )
          workingPool = eligibleCards
          bonusRewardApplied = false
        }
      }
    }

    if (workingPool.length > 0) {
      const selectionRollRaw = rng()
      const selectionRoll = Math.min(1 - Number.EPSILON, Math.max(0, selectionRollRaw))
      const selectedIndex = Math.floor(selectionRoll * workingPool.length)
      selectedCard = workingPool[selectedIndex]
      logger.debug?.(`[TCG Draw] Selected card #${attempt + 1}:`, selectedCard?.id ?? 'None')
    }

    draws.push({
      card: selectedCard,
      roll,
      initialPoolSize: initialPool.length,
      finalPoolSize: workingPool.length,
      bonusRoll,
      bonusRewardApplied,
    })
  }

  const primary = draws[0] ?? {
    card: null,
    roll: 0,
    initialPoolSize: initialPool.length,
    finalPoolSize: 0,
    bonusRoll: null,
    bonusRewardApplied: false,
  }

  try {
    if (params.persist !== false) {
      await persistDrawnCards(
        userId,
        draws,
        logger,
        userInventory,
        params.payload,
        params.req,
      )
    }
  } catch (error) {
    logger.warn?.('[TCG Draw] Failed to persist drawn cards.', error)
    throw error
  }

  return {
    ...primary,
    draws,
  }
}

export async function drawTcgBoosterPacks(
  params: TcgBoosterPackDrawParams,
): Promise<BoosterPackDrawResult> {
  'use server'
  const { user } = await checkUserAuth()
  const userId = typeof user === 'string' ? user : user?.id
  if (!userId) {
    throw new Error('[TCG Pack Draw] Authenticated user is missing an ID.')
  }

  const logger = params.logger || defaultLogger
  const packCount = normalizeQuantity(params.packCount)
  const set = getTcgSetById(params.setId)
  const initialPoolSize = set?.cards.length || 0
  const payload = params.payload || (await getPayload({ config: payloadConfig }))
  const requestOptions = params.req ? { req: params.req } : {}
  const collection = await getUserTcgMap(
    payload as any,
    userId,
    requestOptions,
  )
  const packs = buildTcgBoosterPackDraws({
    ...params,
    packCount,
    collection,
  })

  const draws: SingleCardDrawResult[] = packs.flatMap((pack) =>
    pack.cards.map((card) => ({
      card,
      roll: 0,
      initialPoolSize,
      finalPoolSize: pack.cards.length,
      bonusRoll: null,
      bonusRewardApplied: pack.godPack,
    })),
  )

  try {
    if (params.persist !== false) {
      await persistDrawnCards(
        userId,
        draws,
        logger,
        params.userInventory,
        payload,
        params.req,
      )
    }
  } catch (error) {
    logger.warn?.('[TCG Pack Draw] Failed to persist drawn cards.', error)
    throw error
  }

  const primary = draws[0] ?? {
    card: null,
    roll: 0,
    initialPoolSize,
    finalPoolSize: 0,
    bonusRoll: null,
    bonusRewardApplied: false,
  }

  return {
    ...primary,
    draws,
    packs,
  }
}

type DrawAggregation = {
  count: number
  setId: string
}

async function persistDrawnCards(
  userId: string,
  draws: SingleCardDrawResult[],
  logger: Pick<Console, 'debug' | 'warn'>,
  providedInventory?: Record<string, number>,
  providedPayload?: Payload,
  req?: PayloadRequest,
): Promise<void> {
  const payload =
    providedPayload ||
    (await getPayload({ config: await payloadConfig }))
  const requestOptions = req ? { req } : {}

  const cardsMap = await getUserTcgMap(payload as any, userId, requestOptions)
  const inventory =
    providedInventory ||
    (await getUserInventoryMap(payload as any, userId, requestOptions))

  const aggregates = new Map<string, DrawAggregation>()

  // Validate Binder Ownership and Aggregate
  for (const draw of draws) {
    const card = draw.card
    if (!card) continue

    const setId = getCardSetId(card)
    const binderId = `binder-${setId}`

    // Check if user has the binder
    // Assuming quantity > 0 means they have it
    const hasBinder = (inventory[binderId] || 0) > 0

    if (!hasBinder) {
      draw.discarded = true
      draw.discardReason = `Missing binder for set: ${setId}`
      logger.debug?.(`[TCG Draw] Discarding card ${card.id} - missing ${binderId}`)
      continue
    }

    // If has binder, proceed to aggregate
    const existing = aggregates.get(card.id)
    if (existing) {
      existing.count += 1
    } else {
      aggregates.set(card.id, {
        count: 1,
        setId: setId,
      })
    }
  }

  if (aggregates.size === 0) {
    logger.debug?.('[TCG Draw] No cards to persist (all discarded or empty).')
    return
  }

  let totalCardsAdded = 0
  for (const [cardId, aggregate] of aggregates.entries()) {
    cardsMap[cardId] = (cardsMap[cardId] || 0) + aggregate.count
    totalCardsAdded += aggregate.count
  }

  await setUserTcgMap(payload as any, userId, cardsMap, requestOptions)

  // Hook into explicit daily progress
  if (totalCardsAdded > 0) {
    await incrementDailyTaskProgress(
      userId,
      'daily_card',
      totalCardsAdded,
      undefined,
      { payload, req },
    )
  }

  logger.debug?.('[TCG Draw] Persisted drawn cards for user.', {
    userId,
    totalUniqueCards: aggregates.size,
  })
}
