'use client'

import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  useState,
  useEffect,
} from 'react'

// Typed SFX names for type safety
export type SfxName =
  | 'select'
  | 'good'
  | 'bad'
  | 'catch'
  | 'escape'
  | 'flee'
  | 'stance_win'
  | 'stance_loss'
  | 'stance_tie'

// SFX file paths mapping
const SFX_PATHS: Record<SfxName, string> = {
  select: '/sfx/select.mp3',
  good: '/sfx/good.mp3',
  bad: '/sfx/bad.mp3',
  catch: '/sfx/catch.mp3',
  escape: '/sfx/escape.mp3',
  flee: '/sfx/flee.mp3',
  stance_win: '/sfx/stance_win.mp3',
  stance_loss: '/sfx/stance_loss.mp3',
  stance_tie: '/sfx/stance_tie.mp3',
}

// Default volumes for each SFX
const SFX_VOLUMES: Record<SfxName, number> = {
  select: 0.9,
  good: 0.9,
  bad: 0.9,
  catch: 0.9,
  escape: 0.9,
  flee: 0.9,
  stance_win: 0.9,
  stance_loss: 0.9,
  stance_tie: 0.9,
}

// Pool size for frequently used SFX
const SFX_POOL_SIZE: Partial<Record<SfxName, number>> = {
  select: 5,
  good: 3,
  bad: 3,
}

interface SfxPool {
  pool: HTMLAudioElement[]
  index: number
}

interface AudioContextType {
  // SFX
  playSfx: (name: SfxName) => void
  preloadSfx: (name: SfxName) => void

  // Global audio toggle
  isAudioEnabled: boolean
  toggleAudioEnabled: () => void
  setAudioEnabled: (enabled: boolean) => void

  // Music
  playMusic: (
    url: string,
    options?: { loop?: boolean; volume?: number },
  ) => void
  changeMusic: (url: string | null, options?: { fade?: boolean }) => void
  stopMusic: (options?: { fade?: boolean; delayMs?: number }) => void
  resumeMusic: () => void

  // Pokemon Cries
  playPokemonCry: (formId: string | number) => void

  // State
  isMusicPlaying: boolean
  currentMusicUrl: string | null
}

const AudioContext = createContext<AudioContextType | undefined>(undefined)
const AUDIO_ENABLED_STORAGE_KEY = 'pokemon-app-audio-enabled'

export function AudioProvider({ children }: { children: React.ReactNode }) {
  // SFX pools for frequently used sounds
  const sfxPoolsRef = useRef<Map<SfxName, SfxPool>>(new Map())

  // Music state
  const musicRef = useRef<HTMLAudioElement | null>(null)
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const stopMusicTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pendingMusicRef = useRef<string | null>(null)
  const cryAudioRef = useRef<HTMLAudioElement | null>(null)
  const cryPlayTokenRef = useRef(0)
  const lastCryAtRef = useRef(0)
  const isIosPwaRef = useRef(false)
  const isProviderMountedRef = useRef(false)
  const [isAudioEnabled, setIsAudioEnabledState] = useState(true)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [currentMusicUrl, setCurrentMusicUrl] = useState<string | null>(null)

  const releaseAudio = useCallback((audio: HTMLAudioElement | null) => {
    if (!audio) return

    audio.pause()
    audio.onended = null
    audio.onerror = null
    audio.removeAttribute('src')
    try {
      audio.load()
    } catch {
      // Ignore media release failures.
    }
  }, [])

  const clearStopMusicTimer = useCallback(() => {
    if (stopMusicTimerRef.current) {
      clearTimeout(stopMusicTimerRef.current)
      stopMusicTimerRef.current = null
    }
  }, [])

  // Preload an SFX into a pool
  const preloadSfx = useCallback((name: SfxName) => {
    if (sfxPoolsRef.current.has(name)) return

    const poolSize = SFX_POOL_SIZE[name] || 1
    const pool: HTMLAudioElement[] = []

    for (let i = 0; i < poolSize; i++) {
      const audio = new Audio(SFX_PATHS[name])
      audio.preload = 'auto'
      audio.volume = SFX_VOLUMES[name]
      pool.push(audio)
    }

    sfxPoolsRef.current.set(name, { pool, index: 0 })
  }, [])

  // Preload common SFX on mount
  useEffect(() => {
    isProviderMountedRef.current = true

    // Preload frequently used SFX
    preloadSfx('select')
    preloadSfx('good')
    preloadSfx('bad')

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent)
    const standalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      (navigator as Navigator & { standalone?: boolean }).standalone === true
    isIosPwaRef.current = isIOS && standalone

    return () => {
      isProviderMountedRef.current = false
    }
  }, [preloadSfx])

  // Play an SFX
  const playSfx = useCallback(
    (name: SfxName) => {
      if (!isAudioEnabled) return

      let sfxPool = sfxPoolsRef.current.get(name)
      if (!sfxPool) {
        preloadSfx(name)
        sfxPool = sfxPoolsRef.current.get(name)
      }

      if (!sfxPool || sfxPool.pool.length === 0) return

      // Use pooled audio for all SFX to avoid repeated allocations.
      const audio = sfxPool.pool[sfxPool.index]
      audio.currentTime = 0
      audio.play().catch(() => {})
      sfxPool.index = (sfxPool.index + 1) % sfxPool.pool.length
    },
    [isAudioEnabled, preloadSfx],
  )

  // Clear any existing fade interval
  const clearFadeInterval = useCallback(() => {
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current)
      fadeIntervalRef.current = null
    }
  }, [])

  const setAudioEnabled = useCallback(
    (enabled: boolean) => {
      setIsAudioEnabledState(enabled)

      try {
        window.localStorage.setItem(
          AUDIO_ENABLED_STORAGE_KEY,
          enabled ? '1' : '0',
        )
      } catch {
        // Ignore persistence errors.
      }

      if (enabled) return

      clearFadeInterval()
      clearStopMusicTimer()
      pendingMusicRef.current = null
      setIsMusicPlaying(false)
      setCurrentMusicUrl(null)

      if (musicRef.current) {
        releaseAudio(musicRef.current)
        musicRef.current = null
      }

      if (cryAudioRef.current) {
        cryAudioRef.current.pause()
        cryAudioRef.current.currentTime = 0
      }

      for (const { pool } of sfxPoolsRef.current.values()) {
        for (const audio of pool) {
          audio.pause()
          audio.currentTime = 0
        }
      }
    },
    [clearFadeInterval, clearStopMusicTimer, releaseAudio],
  )

  const toggleAudioEnabled = useCallback(() => {
    setAudioEnabled(!isAudioEnabled)
  }, [isAudioEnabled, setAudioEnabled])

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(AUDIO_ENABLED_STORAGE_KEY)
      if (stored === '0') {
        setAudioEnabled(false)
      }
    } catch {
      // Ignore storage access errors.
    }
  }, [setAudioEnabled])

  // Fade out current music
  const fadeOutMusic = useCallback(
    (audio: HTMLAudioElement, onComplete?: () => void) => {
      if (!audio) {
        onComplete?.()
        return
      }

      const fadeDuration = 500
      const fadeSteps = 10
      const stepTime = fadeDuration / fadeSteps
      const volumeStep = audio.volume / fadeSteps

      clearFadeInterval()
      fadeIntervalRef.current = setInterval(() => {
        if (audio.volume > volumeStep) {
          audio.volume -= volumeStep
        } else {
          audio.volume = 0
          releaseAudio(audio)
          clearFadeInterval()
          onComplete?.()
        }
      }, stepTime)
    },
    [clearFadeInterval, releaseAudio],
  )

  // Stop music
  const stopMusicNow = useCallback(
    (options?: { fade?: boolean }) => {
      clearStopMusicTimer()
      if (!musicRef.current) return

      const audioToStop = musicRef.current

      if (options?.fade) {
        fadeOutMusic(audioToStop, () => {
          // Check if the current music is still the one we stopped
          if (musicRef.current === audioToStop) {
            musicRef.current = null
            setIsMusicPlaying(false)
            setCurrentMusicUrl(null)
          }
        })
      } else {
        clearFadeInterval()
        releaseAudio(musicRef.current)
        musicRef.current = null
        pendingMusicRef.current = null
        setIsMusicPlaying(false)
        setCurrentMusicUrl(null)
      }
    },
    [fadeOutMusic, clearFadeInterval, releaseAudio, clearStopMusicTimer],
  )

  // Stop music
  const stopMusic = useCallback(
    (options?: { fade?: boolean; delayMs?: number }) => {
      const delayMs = options?.delayMs ?? 0
      if (delayMs <= 0) {
        stopMusicNow(options)
        return
      }

      clearStopMusicTimer()
      stopMusicTimerRef.current = setTimeout(() => {
        stopMusicTimerRef.current = null
        stopMusicNow(options)
      }, delayMs)
    },
    [stopMusicNow, clearStopMusicTimer],
  )

  // Play music
  const playMusic = useCallback(
    (url: string, options?: { loop?: boolean; volume?: number }) => {
      if (!isAudioEnabled) return
      clearStopMusicTimer()

      // Stop any existing music first
      if (musicRef.current) {
        clearFadeInterval()
        releaseAudio(musicRef.current)
      }

      const audio = new Audio(url)
      audio.loop = options?.loop ?? true
      audio.volume = options?.volume ?? 0.5
      musicRef.current = audio

      audio
        .play()
        .then(() => {
          if (!isProviderMountedRef.current || musicRef.current !== audio) {
            releaseAudio(audio)
            return
          }
          setIsMusicPlaying(true)
          setCurrentMusicUrl(url)
          pendingMusicRef.current = null // Clear pending on success
        })
        .catch(() => {
          if (!isProviderMountedRef.current || musicRef.current !== audio) {
            releaseAudio(audio)
            return
          }
          // Autoplay blocked - will start on user interaction
          if (process.env.NODE_ENV === 'development')
            console.log('Music autoplay blocked, waiting for user interaction')
          setCurrentMusicUrl(url)
          pendingMusicRef.current = url // Track as pending for mobile
        })
    },
    [isAudioEnabled, clearFadeInterval, releaseAudio, clearStopMusicTimer],
  )

  // Change music (with optional fade)
  const changeMusic = useCallback(
    (url: string | null, options?: { fade?: boolean }) => {
      // If null, stop music
      if (url === null) {
        stopMusic(options)
        return
      }

      if (!isAudioEnabled) {
        stopMusic()
        return
      }

      // If same URL and music IS actively playing, keep it as-is
      // Use musicRef.current directly to avoid dependency on volatile state
      if (
        musicRef.current &&
        !musicRef.current.paused &&
        (musicRef.current.src === url || musicRef.current.src.endsWith(url))
      ) {
        return
      }

      // When changing to different music, always call playMusic directly
      // playMusic already handles stopping current music (including canceling fades)
      playMusic(url)
    },
    [isAudioEnabled, stopMusic, playMusic],
  )

  // Resume music on user interaction (for mobile autoplay policy)
  const resumeMusic = useCallback(() => {
    if (!isAudioEnabled) return

    // If we have a pending music URL from blocked autoplay, try to play it
    if (pendingMusicRef.current && !isMusicPlaying) {
      const url = pendingMusicRef.current
      pendingMusicRef.current = null
      playMusic(url)
      return
    }
    // If we have a paused audio element, try to resume it
    if (musicRef.current?.paused && currentMusicUrl) {
      musicRef.current
        .play()
        .then(() => setIsMusicPlaying(true))
        .catch(() => {})
    }
  }, [isAudioEnabled, isMusicPlaying, currentMusicUrl, playMusic])

  // Play Pokemon cry
  const playPokemonCry = useCallback(
    (formId: string | number) => {
      if (!isAudioEnabled) return

      const now = Date.now()
      if (now - lastCryAtRef.current < 300) return
      lastCryAtRef.current = now

      // Extract numeric ID from formId (handles both '25' and string formIds like '25-alola')
      const id =
        typeof formId === 'number' ? formId : parseInt(formId.split('-')[0], 10)
      if (Number.isNaN(id)) return

      const audio = cryAudioRef.current ?? new Audio()
      if (!cryAudioRef.current) {
        audio.preload = 'none'
        cryAudioRef.current = audio
      }

      const playToken = ++cryPlayTokenRef.current
      audio.pause()
      audio.currentTime = 0
      audio.volume = 0.5
      audio.onended = () => {
        if (cryPlayTokenRef.current === playToken) {
          releaseAudio(audio)
        }
      }

      const remoteCry = `https://raw.githubusercontent.com/PokeAPI/cries/main/cries/pokemon/latest/${id}.ogg`
      const sources = isIosPwaRef.current
        ? [`/cries/${id}.mp3`, `/cries/${id}.ogg`, remoteCry]
        : [remoteCry, `/cries/${id}.mp3`, `/cries/${id}.ogg`]

      const playFromSource = (index: number) => {
        if (
          !isProviderMountedRef.current ||
          cryPlayTokenRef.current !== playToken
        )
          return

        if (index >= sources.length) {
          releaseAudio(audio)
          return
        }

        const source = sources[index]
        audio.src = source

        audio.play().catch(() => {
          if (cryPlayTokenRef.current !== playToken) return
          playFromSource(index + 1)
        })
      }

      playFromSource(0)
    },
    [isAudioEnabled, releaseAudio],
  )

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearFadeInterval()
      clearStopMusicTimer()
      pendingMusicRef.current = null

      if (musicRef.current) {
        releaseAudio(musicRef.current)
        musicRef.current = null
      }

      if (cryAudioRef.current) {
        releaseAudio(cryAudioRef.current)
        cryAudioRef.current = null
      }

      for (const { pool } of sfxPoolsRef.current.values()) {
        for (const audio of pool) {
          releaseAudio(audio)
        }
      }
      sfxPoolsRef.current.clear()
    }
  }, [clearFadeInterval, releaseAudio])

  return (
    <AudioContext.Provider
      value={{
        playSfx,
        preloadSfx,
        isAudioEnabled,
        toggleAudioEnabled,
        setAudioEnabled,
        playMusic,
        changeMusic,
        stopMusic,
        resumeMusic,
        playPokemonCry,
        isMusicPlaying,
        currentMusicUrl,
      }}
    >
      {children}
    </AudioContext.Provider>
  )
}

export function useAudio() {
  const context = useContext(AudioContext)
  if (context === undefined) {
    throw new Error('useAudio must be used within an AudioProvider')
  }
  return context
}
