import { useMemo } from 'react'
import { useUser } from '@/context/UserContext'

export function useTCG() {
  const { gameData, refreshUser } = useUser()
  
  const entries = useMemo(() => {
    const map: Record<string, { quantity: number; cardId: string }> = {}

    gameData?.tcg?.forEach((entry) => {
      if (typeof entry.quantity === 'number') {
        map[entry.cardId] = { cardId: entry.cardId, quantity: entry.quantity }
      }
    })

    return map
  }, [gameData?.tcg])

  const summary = useMemo(() => {
    let uniqueCards = 0
    let totalQuantity = 0

    Object.values(entries).forEach((entry) => {
      if (entry.quantity > 0) {
        uniqueCards += 1
        totalQuantity += entry.quantity
      }
    })

    return { uniqueCards, totalQuantity }
  }, [entries])

  return {
    entriesByCard: entries,
    isLoading: !gameData,
    error: null,
    summary,
    refreshCollection: refreshUser, // Expose refresh function for manual revalidation
  }
}
