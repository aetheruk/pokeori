import { useMemo } from 'react'
import { useUser } from '@/context/UserContext'
import type { BattleStance } from '@/utilities/battle/types'
import type { PokemonRarityId } from '@/utilities/pokemon/rarity-effects'

// Helper type for the Pokedex entry format in the User document
export type PokedexEntry = {
  seen?: boolean | null
  caught?: boolean | null
  shinySeen?: boolean | null
  shinyCaught?: boolean | null
  raritiesCaught?: PokemonRarityId[] | null
  formId?: string | null
  totalSeen?: number
  totalCaught?: number
  researchXp?: number
  researchLevel?: number
  preferredBattleStance?: BattleStance
}

export function usePokedex() {
  const { gameData, refreshUser } = useUser()

  const entries = useMemo(() => {
    const flatPokedex: Record<string, PokedexEntry> = {}

    gameData?.pokedex?.forEach(({ formId, ...entry }) => {
      flatPokedex[formId] = entry
    })

    return flatPokedex
  }, [gameData?.pokedex])

  // We need to calculate summary statistics from the map
  const summary = useMemo(() => {
    let seen = 0
    let caught = 0
    // Count unique catch/seen.
    // Note: The previous implementation might have counted totals differently?
    // Usually Pokedex count is by Species, but here we have Form entries.
    // Let's assume the UI handles grouping by species if needed,
    // but the summary count here serves as a rough "Total Progress".

    // To be accurate to "Pokedex Count" usually means Caught Species or Seen Species.
    // But since the map is by FormID, we might count duplicates if we just iterate values.
    // However, the original hook did `Object.values(entries).forEach`, effectively counting per form.
    // We will stick to that behavior for now to minimize regression risk.

    Object.values(entries).forEach((entry) => {
      if (entry?.seen || entry?.caught) {
        seen += 1
      }
      if (entry?.caught) {
        caught += 1
      }
    })
    return { seen, caught }
  }, [entries])

  return {
    entriesByForm: entries,
    isLoading: !gameData,
    error: null,
    summary,
    refresh: refreshUser, // Expose refresh function for manual revalidation
  }
}
