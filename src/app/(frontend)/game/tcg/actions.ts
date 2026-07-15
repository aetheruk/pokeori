'use server'

import { revalidatePath } from 'next/cache'
import { getPayload } from 'payload'
import config from '@/payload.config'
import { headers } from 'next/headers'
import type { CardDrawParams, CardDrawResult } from '@/utilities/tcg/tcg-card-draw'
import { drawRandomTcgCard } from '@/utilities/tcg/tcg-card-draw'
import {
  autoBuildTcgBattleDeck,
  normalizeTcgBattleEnergyType,
  normalizeTcgDeckFormat,
  TCG_BATTLE_FORMATS,
  validateTcgBattleDeck,
  type TcgBattleCardSummary,
  type TcgBattleDeckFormat,
  type TcgBattleEnergyType,
} from '@/utilities/tcg/tcg-battle'
import { getAllTcgSets, getTcgCardSeriesById } from '@/utilities/tcg/tcg'
import {
  getUserInventoryMap,
  getUserTcgMap,
  setUserTcgMap,
} from '@/utilities/user-state'

export interface DrawActionState {
  ok: boolean
  error?: string
  result?: CardDrawResult
  params?: NormalizedParams
  submittedAt?: string
}

export interface TcgDeckActionResult {
  ok: boolean
  error?: string
  generationDecks?: Record<string, Partial<Record<TcgBattleDeckFormat, { cards: string[]; energy?: TcgBattleEnergyType }>>>
  generations?: string[]
  generation?: string
  deck?: string[]
  cards?: TcgBattleCardSummary[]
  totalCost?: number
  costLimit?: number
  startingEnergy?: number
  validation?: Record<string, Record<TcgBattleDeckFormat, { valid: boolean; errors: string[]; totalCost: number }>>
}

type TcgDeckEntry = { cards: string[]; energy?: TcgBattleEnergyType }
type TcgGenerationDeckMap = Record<string, Partial<Record<TcgBattleDeckFormat, TcgDeckEntry>>>
const CARD_CRYSTALIZER_ITEM_ID = 'card-crystalizer'

function normalizeGenerationDecks(
  value: unknown,
): TcgGenerationDeckMap {
  const raw = (value || {}) as Record<string, unknown>
  const result: TcgGenerationDeckMap = {}
  for (const [generation, generationDecks] of Object.entries(raw)) {
    if (!generation || !generationDecks || typeof generationDecks !== 'object') continue
    const decks = generationDecks as Record<string, unknown>
    const normalizeEntry = (format: TcgBattleDeckFormat): TcgDeckEntry => {
      const formatValue = decks[format]
      if (Array.isArray(formatValue)) {
        return {
          cards: formatValue.filter((id): id is string => typeof id === 'string'),
        }
      }
      if (!formatValue || typeof formatValue !== 'object') return { cards: [] }
      const entry = formatValue as Record<string, unknown>
      return {
        cards: Array.isArray(entry.cards) ? entry.cards.filter((id): id is string => typeof id === 'string') : [],
        energy: normalizeTcgBattleEnergyType(entry.energy) || undefined,
      }
    }
    result[generation] = {
      baby: normalizeEntry('baby'),
      champions: normalizeEntry('champions'),
      masters: normalizeEntry('masters'),
    }
  }
  return result
}

function getKnownTcgGenerations(): string[] {
  return Array.from(new Set(getAllTcgSets().map((set) => set.series))).sort((a, b) => a.localeCompare(b))
}

function ensureGeneration(generationInput: string): string | null {
  const generation = generationInput.trim()
  if (!generation) return null
  const known = getKnownTcgGenerations()
  return known.includes(generation) ? generation : null
}

function filterDeckToGeneration(deck: string[], generation: string): string[] {
  return deck.filter((cardId) => getTcgCardSeriesById(cardId) === generation)
}

function generationSupportsEnergyType(generation: string, energyType: TcgBattleEnergyType): boolean {
  for (const set of getAllTcgSets()) {
    if (set.series !== generation) continue
    for (const card of set.cards) {
      if ((card.types || []).includes(energyType)) return true
    }
  }
  return false
}

async function getAuthedUserForDecks() {
  const payload = await getPayload({ config })
  const { user } = await payload.auth({ headers: await headers() })
  return { payload, user }
}

function hasDeckBox(inventory: Record<string, number>): boolean {
  return (inventory['deck-box'] || 0) > 0
}

function hasCardCrystalizer(inventory: Record<string, number>): boolean {
  return (inventory[CARD_CRYSTALIZER_ITEM_ID] || 0) > 0
}

export async function getTcgDecks(): Promise<TcgDeckActionResult> {
  try {
    const { payload, user } = await getAuthedUserForDecks()
    if (!user) return { ok: false, error: 'You must be logged in.' }
    const [inventory, collection] = await Promise.all([
      getUserInventoryMap(payload as any, user.id),
      getUserTcgMap(payload as any, user.id),
    ])
    if (!hasDeckBox(inventory)) return { ok: false, error: 'Deck Box required.' }

    const generationDecks = normalizeGenerationDecks((user as any).tcgDecksByGeneration)
    const generations = getKnownTcgGenerations()
    const validation = {} as Record<
      string,
      Record<TcgBattleDeckFormat, { valid: boolean; errors: string[]; totalCost: number }>
    >

    for (const generation of generations) {
      validation[generation] = {} as Record<
        TcgBattleDeckFormat,
        { valid: boolean; errors: string[]; totalCost: number }
      >
      const generationEntry = generationDecks[generation] || {}
      for (const format of Object.keys(TCG_BATTLE_FORMATS) as TcgBattleDeckFormat[]) {
        const generationDeck = filterDeckToGeneration(generationEntry[format]?.cards || [], generation)
        const result = await validateTcgBattleDeck(generationDeck, collection, format)
        validation[generation][format] = {
          valid: result.valid,
          errors: result.errors,
          totalCost: result.totalCost,
        }
      }
    }

    return { ok: true, generationDecks, generations, validation }
  } catch (error) {
    console.error('[TCG Decks] Failed to load decks.', error)
    return { ok: false, error: error instanceof Error ? error.message : 'Unable to load decks.' }
  }
}

export async function saveTcgDeck(
  generationInput: string,
  formatInput: string,
  cardIds: string[],
  energyTypeInput?: string | null,
): Promise<TcgDeckActionResult> {
  try {
    const generation = ensureGeneration(generationInput)
    if (!generation) return { ok: false, error: 'Invalid generation.' }
    const format = normalizeTcgDeckFormat(formatInput)
    if (!format) return { ok: false, error: 'Invalid deck format.' }
    const energyType = energyTypeInput ? normalizeTcgBattleEnergyType(energyTypeInput) : null
    if (energyTypeInput && !energyType) return { ok: false, error: 'Invalid energy type.' }
    if (energyType && !generationSupportsEnergyType(generation, energyType)) {
      return { ok: false, error: `Selected energy type is unavailable in ${generation}.` }
    }

    const { payload, user } = await getAuthedUserForDecks()
    if (!user) return { ok: false, error: 'You must be logged in.' }
    const [inventory, collection] = await Promise.all([
      getUserInventoryMap(payload as any, user.id),
      getUserTcgMap(payload as any, user.id),
    ])
    if (!hasDeckBox(inventory)) return { ok: false, error: 'Deck Box required.' }

    const generationCards = filterDeckToGeneration(cardIds, generation)
    if (generationCards.length !== cardIds.length) {
      return { ok: false, error: `Deck contains cards outside the ${generation} generation.` }
    }
    if (generationCards.length > 15) {
      return { ok: false, error: 'Deck cannot contain more than 15 cards.' }
    }

    const uniqueCards = new Set(generationCards)
    if (uniqueCards.size !== generationCards.length) {
      return { ok: false, error: 'Deck cannot contain duplicate cards.' }
    }

    for (const cardId of generationCards) {
      if ((collection[cardId] || 0) <= 0) {
        return { ok: false, error: 'Deck contains cards you do not own.' }
      }
    }

    const validation =
      generationCards.length === 15
        ? await validateTcgBattleDeck(generationCards, collection, format)
        : {
            valid: true,
            errors: [],
            cards: [],
            totalCost: 0,
          }
    if (!validation.valid) return { ok: false, error: validation.errors.join(' '), ...validation }

    const generationDecks = normalizeGenerationDecks((user as any).tcgDecksByGeneration)
    const targetGenerationDecks = generationDecks[generation] || {}
    targetGenerationDecks[format] = {
      cards: generationCards,
      energy: energyType || undefined,
    }
    generationDecks[generation] = targetGenerationDecks

    await payload.update({
      collection: 'users',
      id: user.id,
      data: { tcgDecksByGeneration: generationDecks } as any,
    })

    revalidatePath('/game')
    revalidatePath('/game/tcg')
    return {
      ok: true,
      generationDecks,
      generation,
      deck: targetGenerationDecks[format]?.cards,
      cards: validation.cards,
      totalCost: validation.totalCost,
      costLimit: TCG_BATTLE_FORMATS[format].deckCostLimit,
      startingEnergy: TCG_BATTLE_FORMATS[format].startingEnergy,
    }
  } catch (error) {
    console.error('[TCG Decks] Failed to save deck.', error)
    return { ok: false, error: error instanceof Error ? error.message : 'Unable to save deck.' }
  }
}

export async function autoBuildTcgDeck(
  generationInput: string,
  formatInput: string,
): Promise<TcgDeckActionResult> {
  try {
    const generation = ensureGeneration(generationInput)
    if (!generation) return { ok: false, error: 'Invalid generation.' }
    const format = normalizeTcgDeckFormat(formatInput)
    if (!format) return { ok: false, error: 'Invalid deck format.' }

    const { payload, user } = await getAuthedUserForDecks()
    if (!user) return { ok: false, error: 'You must be logged in.' }
    const [inventory, collection] = await Promise.all([
      getUserInventoryMap(payload as any, user.id),
      getUserTcgMap(payload as any, user.id),
    ])
    if (!hasDeckBox(inventory)) return { ok: false, error: 'Deck Box required.' }

    const generationCollection = Object.fromEntries(
      Object.entries(collection).filter(([cardId, qty]) => qty > 0 && getTcgCardSeriesById(cardId) === generation),
    )
    const result = await autoBuildTcgBattleDeck(generationCollection, format)
    if (!result.valid) return { ok: false, error: result.errors.join(' '), ...result }

    const generationDecks = normalizeGenerationDecks((user as any).tcgDecksByGeneration)
    const targetGenerationDecks = generationDecks[generation] || {}
    targetGenerationDecks[format] = {
      cards: result.cards.map((card) => card.id),
      energy: targetGenerationDecks[format]?.energy,
    }
    generationDecks[generation] = targetGenerationDecks

    await payload.update({
      collection: 'users',
      id: user.id,
      data: { tcgDecksByGeneration: generationDecks } as any,
    })

    revalidatePath('/game')
    revalidatePath('/game/tcg')
    return {
      ok: true,
      generationDecks,
      generation,
      deck: targetGenerationDecks[format]?.cards,
      cards: result.cards,
      totalCost: result.totalCost,
      costLimit: TCG_BATTLE_FORMATS[format].deckCostLimit,
      startingEnergy: TCG_BATTLE_FORMATS[format].startingEnergy,
    }
  } catch (error) {
    console.error('[TCG Decks] Failed to auto-build deck.', error)
    return { ok: false, error: error instanceof Error ? error.message : 'Unable to auto-build deck.' }
  }
}

interface NormalizedParams {
  allowedSetIds?: string[]
  allowedPokemonIds?: number[]
  rarityModifier: number
  qty: number
  bonusThreshold: number
}

export async function runTestTcgDrawAction(
  _prevState: DrawActionState,
  formData: FormData,
): Promise<DrawActionState> {
  try {
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: await headers() })

    if (!user) {
      return {
        ok: false,
        error: 'You must be logged in to perform this action.',
      }
    }

    if (!user.isAdmin) {
      return {
        ok: false,
        error: 'Unauthorized: Admin access required.',
      }
    }

    const params = normalizeFormData(formData)
    const result = await drawRandomTcgCard(params)

    revalidatePath('/game/tcg')

    return {
      ok: true,
      result,
      params,
      submittedAt: new Date().toISOString(),
    }
  } catch (error) {
    console.error('[TCG Draw Action] Failed to run test draw.', error)
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error triggering draw.',
    }
  }
}

function normalizeFormData(formData: FormData): CardDrawParams & NormalizedParams {
  const allowedSetIds = parseStringList(formData.get('allowedSetIds'))
  const allowedPokemonIds = parseNumberList(formData.get('allowedPokemonIds'))
  const qty = clampInt(formData.get('qty'), 1, 20, 1)
  const rarityModifier = clampNumber(formData.get('rarityModifier'), -1, 1, 0)
  const bonusThreshold = clampNumber(formData.get('bonusThreshold'), 0, 1, 0.1)

  return {
    allowedSetIds,
    allowedPokemonIds,
    qty,
    rarityModifier,
    bonusThreshold,
  }
}

function parseStringList(value: FormDataEntryValue | null): string[] | undefined {
  if (!value) return undefined
  const list = value
    .toString()
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean)
  return list.length > 0 ? list : undefined
}

function parseNumberList(value: FormDataEntryValue | null): number[] | undefined {
  if (!value) return undefined
  const list = value
    .toString()
    .split(',')
    .map((item) => Number.parseInt(item.trim(), 10))
    .filter((num) => Number.isFinite(num))
  return list.length > 0 ? list : undefined
}

function clampInt(
  value: FormDataEntryValue | null,
  min: number,
  max: number,
  fallback: number,
): number {
  const parsed = Number.parseInt((value ?? '').toString(), 10)
  if (!Number.isFinite(parsed)) return fallback
  return clampNumber(parsed, min, max, fallback)
}

function clampNumber(
  value: FormDataEntryValue | number | null,
  min: number,
  max: number,
  fallback: number,
): number {
  const parsed = typeof value === 'number' ? value : Number.parseFloat((value ?? '').toString())
  if (!Number.isFinite(parsed)) return fallback
  return Math.min(max, Math.max(min, parsed))
}

export interface CrystallizeResult {
  ok: boolean
  error?: string
  crystalsAdded?: number
  cardsRemoved?: number
  summary?: any // RewardSummary compatible
}

export async function crystallizeDuplicates(cardId: string): Promise<CrystallizeResult> {
  const { tcgRarityCrystalValues } = await import('@/data/tcg-rarity')
  const { getTcgCardById } = await import('@/utilities/tcg/tcg')

  try {
    const payload = await getPayload({ config })
    const { user } = await payload.auth({ headers: await headers() })

    if (!user) {
      return { ok: false, error: 'You must be logged in.' }
    }

    const inventory = await getUserInventoryMap(payload as any, user.id)
    if (!hasCardCrystalizer(inventory)) {
      return { ok: false, error: 'Card Crystalizer required.' }
    }

    const cardsMap = await getUserTcgMap(payload as any, user.id)
    const currentQty = cardsMap[cardId] || 0

    if (currentQty <= 1) {
      return { ok: false, error: 'No duplicate copies to crystallize.' }
    }

    // Get card definition for rarity
    const cardDef = getTcgCardById(cardId)
    if (!cardDef) {
      return { ok: false, error: 'Card definition not found.' }
    }

    const removeQty = currentQty - 1
    const rarity = cardDef.rarity || 'Common'
    const crystalValue = tcgRarityCrystalValues[rarity] || 1 // Default to 1 if unknown
    const totalCrystals = removeQty * crystalValue

    // Update TCG entry locally
    cardsMap[cardId] = 1 // Keep 1 copy

    // Add currency locally
    const currentCurrency = user.currency || {}
    const updatedCurrency = {
      ...currentCurrency,
      crystals: (currentCurrency.crystals || 0) + totalCrystals,
    }

    const { incrementDailyTaskProgress } = await import('@/utilities/tasks/daily-progress')

    await setUserTcgMap(payload as any, user.id, cardsMap)
    await payload.update({
      collection: 'users',
      id: user.id,
      data: {
        currency: updatedCurrency,
      },
    })

    // Explicit Daily Progress Tracking
    await incrementDailyTaskProgress(user.id, 'daily_crystalize', removeQty)

    revalidatePath('/game/tcg')

    // Construct RewardSummary-like object for the UI
    const summary = {
      xp: 0,
      items: [],
      pokemon: [],
      currency: [{ type: 'crystals', quantity: totalCrystals }],
      cards: [],
      tasksCompleted: [],
    }

    return {
      ok: true,
      crystalsAdded: totalCrystals,
      cardsRemoved: removeQty,
      summary,
    }
  } catch (error) {
    console.error('[Crystallize Action] Error:', error)
    return {
      ok: false,
      error: error instanceof Error ? error.message : 'Unknown error',
    }
  }
}
