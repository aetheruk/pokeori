'use client'

import { useEffect } from 'react'
import { useAudio } from '@/context/AudioContext'
import type { BaseGameConfig } from '@/data/games/shared'

/**
 * Hook to play music for research games.
 * Plays the game's configured music or falls back to '/music/minigame.mp3'.
 * Automatically stops music when unmounting.
 */
export function useGameMusic(encounter: BaseGameConfig | { music?: string }) {
  const { changeMusic, stopMusic } = useAudio()

  useEffect(() => {
    const musicUrl = encounter.music || '/music/minigame.mp3'
    changeMusic(musicUrl, { fade: true })

    return () => {
      stopMusic({ delayMs: 750 })
    }
  }, [encounter.music, changeMusic, stopMusic])
}
