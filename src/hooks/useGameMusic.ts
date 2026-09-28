'use client'

import { useEffect } from 'react'
import { useAudio } from '@/context/AudioContext'
import { subCategories } from '@/data/sub-region-map'
import type { BaseGameConfig } from '@/data/games/shared'

/**
 * Hook to play music for research games.
 * Plays the game's configured music, then the sub-region track, then the mini-game fallback.
 * Automatically stops music when unmounting.
 */
export function useGameMusic(
  encounter: Pick<BaseGameConfig, 'music' | 'subCategory'>,
) {
  const { changeMusic, stopMusic } = useAudio()

  useEffect(() => {
    const musicUrl =
      encounter.music ||
      subCategories[encounter.subCategory || '']?.music ||
      '/music/minigame.m4a'
    changeMusic(musicUrl, { fade: true })

    return () => {
      stopMusic({ delayMs: 750 })
    }
  }, [encounter.music, encounter.subCategory, changeMusic, stopMusic])
}
