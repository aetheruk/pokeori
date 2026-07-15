import { create } from 'zustand'

interface InventoryState {
  inventory: Record<string, number>
  setInventory: (inventory: Record<string, number>) => void
  decrementItem: (itemId: string, amount?: number) => void
  incrementItem: (itemId: string, amount?: number) => void
}

export const useInventoryStore = create<InventoryState>((set) => ({
  inventory: {},
  setInventory: (inventory) => set({ inventory }),
  decrementItem: (itemId, amount = 1) =>
    set((state) => ({
      inventory: {
        ...state.inventory,
        [itemId]: Math.max(0, (state.inventory[itemId] || 0) - amount),
      },
    })),
  incrementItem: (itemId, amount = 1) =>
    set((state) => ({
      inventory: {
        ...state.inventory,
        [itemId]: (state.inventory[itemId] || 0) + amount,
      },
    })),
}))
