'use client'

import { create } from 'zustand'

interface StoryStateStore {
  saffronTakeover: boolean | null
  setSaffronTakeover: (active: boolean) => void
}

/**
 * Instant client-side mirror of the Saffron blackout takeover. Explore writes
 * the derived flag as soon as it computes it, so the shell (which lives in a
 * separate data provider) can hide navigation immediately after the ambush
 * task completes instead of waiting for the next core sync revalidation.
 */
export const useStoryStateStore = create<StoryStateStore>((set) => ({
  saffronTakeover: null,
  setSaffronTakeover: (active) => set({ saffronTakeover: active }),
}))
