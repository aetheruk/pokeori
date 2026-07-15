import { useState, useRef, useCallback, useEffect } from 'react'
import type { BattleState, BattleLogEntry } from '../types'
import { BattleEvent, AnimationState, INITIAL_ANIMATION_STATE } from './types'
import { generateBattleEvents } from './event-generator'
import { useAudio } from '@/context/AudioContext'
import { tasks } from '@/data/tasks'
import { prependBattleHistory, trimBattleHistory } from '../history'

// Helper for deep cloning battle state to prevent mutation side-effects
const shallowCloneState = (state: BattleState): BattleState => ({
  ...state,
  playerTeam: Array.isArray(state.playerTeam) ? [...state.playerTeam] : [],
  enemyTeam: Array.isArray(state.enemyTeam) ? [...state.enemyTeam] : [],
  history: Array.isArray(state.history) ? [...state.history] : [],
})

const cloneState = (state: BattleState): BattleState => {
  if (typeof globalThis.structuredClone === 'function') {
    try {
      return globalThis.structuredClone(state)
    } catch (error) {
      if (process.env.NODE_ENV === 'development')
        console.warn(
          '[ENGINE] structuredClone failed, falling back to JSON clone',
          error,
        )
    }
  }

  try {
    const parsed = JSON.parse(JSON.stringify(state))
    return parsed as BattleState
  } catch (error) {
    console.error(
      '[ENGINE] Failed to clone battle state, using shallow fallback',
      error,
    )
    return shallowCloneState(state)
  }
}

const normalizeState = (state: BattleState): BattleState => {
  // Validate indices are within bounds
  const maxPlayerIndex = state.playerTeam?.length ?? 0
  const maxEnemyIndex = state.enemyTeam?.length ?? 0

  const cloned = cloneState(state)

  // Clamp active indices to valid ranges
  if (maxPlayerIndex <= 0) cloned.activePlayerIndex = 0
  else if (cloned.activePlayerIndex < 0) cloned.activePlayerIndex = 0
  else if (cloned.activePlayerIndex >= maxPlayerIndex)
    cloned.activePlayerIndex = maxPlayerIndex - 1
  if (maxEnemyIndex <= 0) cloned.activeEnemyIndex = 0
  else if (cloned.activeEnemyIndex < 0) cloned.activeEnemyIndex = 0
  else if (cloned.activeEnemyIndex >= maxEnemyIndex)
    cloned.activeEnemyIndex = maxEnemyIndex - 1

  cloned.history = trimBattleHistory(cloned.history)
  return cloned
}

const isSameLogEntry = (a?: BattleLogEntry, b?: BattleLogEntry) => {
  if (!a || !b) return false
  return a.turn === b.turn && a.message === b.message
}

const prependVisualLogEntry = (
  history: BattleLogEntry[],
  entry?: BattleLogEntry,
) => {
  if (!entry) return trimBattleHistory(history)
  if (isSameLogEntry(history[0], entry)) return trimBattleHistory(history)
  return prependBattleHistory(history, entry)
}

const BATTLE_DEBUG_LOG_KEY = 'pokemon-app:battle-debug-log'

const getBattleDebugSnapshot = (state?: BattleState | null) => {
  if (!state) return undefined

  const latestLog = state.history?.[0]

  return {
    battleId: state.battleId,
    status: state.status,
    turn: state.turn,
    activePlayerIndex: state.activePlayerIndex,
    activeEnemyIndex: state.activeEnemyIndex,
    playerHp: state.playerTeam?.[state.activePlayerIndex]?.currentHp,
    enemyHp: state.enemyTeam?.[state.activeEnemyIndex]?.currentHp,
    playerFormId: state.playerTeam?.[state.activePlayerIndex]?.formId,
    enemyFormId: state.enemyTeam?.[state.activeEnemyIndex]?.formId,
    pendingPlayerSwitch: state.pendingPlayerSwitch,
    latestLog: latestLog
      ? {
          turn: latestLog.turn,
          result: latestLog.result,
          damageDealt: latestLog.damageDealt,
          damageTaken: latestLog.damageTaken,
          message: latestLog.message?.slice(0, 500),
        }
      : undefined,
  }
}

const recordBattleDebug = (
  event: string,
  data: {
    state?: BattleState | null
    targetState?: BattleState | null
    eventType?: string
    sequenceType?: string
    events?: string[]
    error?: unknown
  } = {},
) => {
  if (typeof window === 'undefined') return

  try {
    const raw = window.localStorage.getItem(BATTLE_DEBUG_LOG_KEY)
    const existing = raw ? JSON.parse(raw) : []
    const entries = Array.isArray(existing) ? existing : []
    const entry = {
      at: new Date().toISOString(),
      event,
      eventType: data.eventType,
      sequenceType: data.sequenceType,
      events: data.events,
      state: getBattleDebugSnapshot(data.state),
      targetState: getBattleDebugSnapshot(data.targetState),
      error:
        data.error instanceof Error
          ? { name: data.error.name, message: data.error.message }
          : data.error
            ? String(data.error)
            : undefined,
    }

    window.localStorage.setItem(
      BATTLE_DEBUG_LOG_KEY,
      JSON.stringify([...entries.slice(-39), entry]),
    )
  } catch {
    // Diagnostics must never affect gameplay.
  }
}

export function useBattleManager(initialState: BattleState) {
  // The 'true' state from the server (latest known target)
  const [battleState, setBattleState] = useState<BattleState>(() =>
    normalizeState(initialState),
  )

  // The 'visual' state that the UI actually renders (so we can delay HP drops/logs)
  const [visualState, setVisualState] = useState<BattleState>(() =>
    normalizeState(initialState),
  )

  const [anim, setAnim] = useState<AnimationState>(INITIAL_ANIMATION_STATE)
  const [isProcessing, setIsProcessing] = useState(false)

  // UI Flow States
  const [showResultScreen, setShowResultScreen] = useState(false)
  const [showCardReveal, setShowCardReveal] = useState(false)
  const [cardsToReveal, setCardsToReveal] = useState<any[]>([])
  const [showLevelUpModal, setShowLevelUpModal] = useState(false)
  const [showTaskExitModal, setShowTaskExitModal] = useState(false)
  const [taskExitModalData, setTaskExitModalData] = useState<any>(null)
  const [researchBreakthroughs, setResearchBreakthroughs] = useState<any[]>([])
  const [isWaitingForOpponent, setIsWaitingForOpponent] = useState(false)
  const showResultScreenRef = useRef(showResultScreen)

  const { playSfx, playPokemonCry } = useAudio()

  // Queue Refs
  const queueRef = useRef<BattleEvent[]>([])
  const isAnimatingRef = useRef(false)
  const queueRunIdRef = useRef(0)
  const pendingTimersRef = useRef<Set<number>>(new Set())
  const isMountedRef = useRef(true)
  const terminalFallbackTimerRef = useRef<number | null>(null)
  const processingWatchdogTimerRef = useRef<number | null>(null)

  // Crucial: This ref tracks the 'Target' state we are animating TOWARDS.
  // Subsequent pushTurnResult calls must diff against this to avoid duplicate anims.
  const targetStateRef = useRef<BattleState>(cloneState(battleState))
  const lastResultRef = useRef<string | null>(null)

  const safePlaySfx = useCallback(
    (name: Parameters<typeof playSfx>[0]) => {
      try {
        playSfx(name)
      } catch (error) {
        recordBattleDebug('sfx-error', {
          targetState: targetStateRef.current,
          error,
        })
      }
    },
    [playSfx],
  )

  const safePlayPokemonCry = useCallback(
    (formId: string | number | undefined) => {
      if (formId === undefined || formId === null) {
        recordBattleDebug('pokemon-cry-skipped', {
          targetState: targetStateRef.current,
        })
        return
      }

      try {
        playPokemonCry(formId)
      } catch (error) {
        recordBattleDebug('pokemon-cry-error', {
          targetState: targetStateRef.current,
          error,
        })
      }
    },
    [playPokemonCry],
  )

  const clearPendingTimers = useCallback(() => {
    for (const timerId of pendingTimersRef.current) {
      window.clearTimeout(timerId)
    }
    pendingTimersRef.current.clear()
    terminalFallbackTimerRef.current = null
    processingWatchdogTimerRef.current = null
  }, [])

  const clearTerminalFallbackTimer = useCallback(() => {
    const timerId = terminalFallbackTimerRef.current
    if (timerId === null) return

    window.clearTimeout(timerId)
    pendingTimersRef.current.delete(timerId)
    terminalFallbackTimerRef.current = null
  }, [])

  const clearProcessingWatchdogTimer = useCallback(() => {
    const timerId = processingWatchdogTimerRef.current
    if (timerId === null) return

    window.clearTimeout(timerId)
    pendingTimersRef.current.delete(timerId)
    processingWatchdogTimerRef.current = null
  }, [])

  const setTrackedTimeout = useCallback((callback: () => void, ms: number) => {
    if (!isMountedRef.current) return null

    const timerId = window.setTimeout(() => {
      pendingTimersRef.current.delete(timerId)
      if (isMountedRef.current) callback()
    }, ms)

    pendingTimersRef.current.add(timerId)
    return timerId
  }, [])

  const delay = useCallback(
    (ms: number) => {
      return new Promise<void>((resolve) => {
        const timerId = setTrackedTimeout(resolve, ms)
        if (timerId === null) resolve()
      })
    },
    [setTrackedTimeout],
  )

  useEffect(() => {
    isMountedRef.current = true

    return () => {
      isMountedRef.current = false
      queueRunIdRef.current += 1
      queueRef.current.length = 0
      isAnimatingRef.current = false
      clearPendingTimers()
    }
  }, [clearPendingTimers])

  useEffect(() => {
    showResultScreenRef.current = showResultScreen
  }, [showResultScreen])

  useEffect(() => {
    const nextState = normalizeState(initialState)

    queueRunIdRef.current += 1
    queueRef.current.length = 0
    isAnimatingRef.current = false
    clearPendingTimers()

    targetStateRef.current = cloneState(nextState)
    lastResultRef.current = null

    setBattleState(nextState)
    setVisualState(nextState)
    setAnim(INITIAL_ANIMATION_STATE)
    setIsProcessing(false)
    setIsWaitingForOpponent(false)
    setShowResultScreen(false)
    setShowCardReveal(false)
    setCardsToReveal([])
    setShowLevelUpModal(false)
    setShowTaskExitModal(false)
    setTaskExitModalData(null)
    setResearchBreakthroughs([])
    clearTerminalFallbackTimer()
    clearProcessingWatchdogTimer()
  }, [
    initialState.battleId,
    clearPendingTimers,
    clearTerminalFallbackTimer,
    clearProcessingWatchdogTimer,
  ])

  const applyBattleEndState = useCallback((newState: BattleState) => {
    const r = newState.rewards

    // Result screen first
    setShowResultScreen(true)

    if (newState.status === 'won' && r) {
      if (r.cards?.length > 0) {
        setCardsToReveal(r.cards)
        setShowCardReveal(true)
      }
      const taskExitModals = r.taskExitModals || []
      if (taskExitModals.length > 0) {
        setTaskExitModalData(taskExitModals[0])
        setShowTaskExitModal(true)
      } else if (r.tasksCompleted?.length > 0) {
        const task = r.tasksCompleted.find(
          (tc: any) => tasks.find((t) => t.id === tc.id)?.exitModal,
        )
        if (task) {
          setTaskExitModalData(tasks.find((t) => t.id === task.id)?.exitModal)
          setShowTaskExitModal(true)
        }
      }
      const breakthroughs = r.researchBreakthroughs
      if (Array.isArray(breakthroughs) && breakthroughs.length > 0) {
        setResearchBreakthroughs(breakthroughs)
      }
      if (r.levelUp) setShowLevelUpModal(true)
    }
  }, [])

  const forceSyncToTargetState = useCallback(() => {
    if (!isMountedRef.current) return

    queueRunIdRef.current += 1
    queueRef.current.length = 0
    isAnimatingRef.current = false
    clearPendingTimers()

    const normalizedTarget = normalizeState(targetStateRef.current)
    targetStateRef.current = cloneState(normalizedTarget)

    setBattleState(normalizedTarget)
    setVisualState(normalizedTarget)
    setAnim(INITIAL_ANIMATION_STATE)
    setIsProcessing(false)
    setIsWaitingForOpponent(false)

    if (normalizedTarget.status !== 'ongoing') {
      applyBattleEndState(normalizedTarget)
    }
  }, [applyBattleEndState, clearPendingTimers])

  // Fail-safe: if queue processing fails after we already received a terminal state,
  // force sync and show results so the battle cannot hang post-KO.
  useEffect(() => {
    if (showResultScreen || isProcessing) return
    if (battleState.status === 'ongoing') return

    setVisualState(normalizeState(battleState))
    applyBattleEndState(battleState)
  }, [battleState, showResultScreen, isProcessing, applyBattleEndState])

  // Watchdog: iOS PWAs can aggressively suspend/kill timers and media decoding under memory
  // pressure. If terminal battle state is reached but queue processing doesn't finish, force
  // results after a grace window so UI never hangs post-KO.
  useEffect(() => {
    if (battleState.status === 'ongoing' || showResultScreen) {
      clearTerminalFallbackTimer()
      return
    }

    if (terminalFallbackTimerRef.current !== null) return

    const timerId = setTrackedTimeout(() => {
      terminalFallbackTimerRef.current = null
      if (!isMountedRef.current || showResultScreenRef.current) return

      queueRunIdRef.current += 1
      queueRef.current.length = 0
      isAnimatingRef.current = false
      setIsProcessing(false)

      const fallbackState =
        targetStateRef.current.status !== 'ongoing'
          ? targetStateRef.current
          : battleState
      const normalizedFallback = normalizeState(fallbackState)

      setVisualState(normalizedFallback)
      applyBattleEndState(normalizedFallback)
    }, 2800)

    if (timerId !== null) {
      terminalFallbackTimerRef.current = timerId
    }

    return clearTerminalFallbackTimer
  }, [
    battleState,
    showResultScreen,
    setTrackedTimeout,
    clearTerminalFallbackTimer,
    applyBattleEndState,
  ])

  // Recovery path for mobile Safari/PWA timer stalls. The normal queue is short; if it is
  // still processing after this window, snap to the already-confirmed server state and unlock UI.
  useEffect(() => {
    if (!isProcessing) {
      clearProcessingWatchdogTimer()
      return
    }

    if (processingWatchdogTimerRef.current !== null) return

    const timerId = setTrackedTimeout(() => {
      processingWatchdogTimerRef.current = null
      forceSyncToTargetState()
    }, 12000)

    if (timerId !== null) {
      processingWatchdogTimerRef.current = timerId
    }

    return clearProcessingWatchdogTimer
  }, [
    isProcessing,
    setTrackedTimeout,
    forceSyncToTargetState,
    clearProcessingWatchdogTimer,
  ])

  useEffect(() => {
    const handleResume = () => {
      if (document.visibilityState !== 'visible') return
      if (isAnimatingRef.current || queueRef.current.length > 0) {
        forceSyncToTargetState()
      }
    }

    document.addEventListener('visibilitychange', handleResume)
    window.addEventListener('pageshow', handleResume)

    return () => {
      document.removeEventListener('visibilitychange', handleResume)
      window.removeEventListener('pageshow', handleResume)
    }
  }, [forceSyncToTargetState])

  const processQueue = useCallback(async () => {
    if (isAnimatingRef.current || !isMountedRef.current) return

    const runId = ++queueRunIdRef.current
    const shouldStop = () =>
      !isMountedRef.current || runId !== queueRunIdRef.current

    isAnimatingRef.current = true
    setIsProcessing(true)
    recordBattleDebug('queue-start', { targetState: targetStateRef.current })

    try {
      while (queueRef.current.length > 0) {
        if (shouldStop()) break

        const event = queueRef.current.shift()
        if (!event) break
        recordBattleDebug('queue-event-start', {
          eventType: event.type,
          sequenceType: event.payload?.type,
          targetState: targetStateRef.current,
        })
        // console.log('[ENGINE] Event:', event.type, event.payload?.type || '')

        try {
          switch (event.type) {
            case 'SET_INITIAL_STATE':
              if (shouldStop()) break
              setVisualState(normalizeState(event.payload))
              break

            case 'PLAY_SEQUENCE': {
              const seq = event.payload
              if (seq.type === 'SWAP') {
                if (shouldStop()) break
                const side = seq.side as 'player' | 'enemy'
                const outKey =
                  side === 'player' ? 'playerSwitchingOut' : 'enemySwitchingOut'
                const inKey =
                  side === 'player' ? 'playerSwitchingIn' : 'enemySwitchingIn'

                setAnim((prev) => ({ ...prev, [outKey]: true }))
                await delay(350)
                if (shouldStop()) break

                setVisualState(normalizeState(seq.state))
                setAnim((prev) => ({ ...prev, [outKey]: false, [inKey]: true }))
                await delay(50)
                if (shouldStop()) break

                setAnim((prev) => ({ ...prev, [inKey]: false }))
                await delay(300)
              } else if (seq.type === 'REPLACEMENT') {
                if (shouldStop()) break
                const side = seq.side as 'player' | 'enemy'
                const inKey =
                  side === 'player' ? 'playerSwitchingIn' : 'enemySwitchingIn'

                setAnim((prev) => ({
                  ...prev,
                  [inKey]: true,
                  playerFainting:
                    side === 'player' ? false : prev.playerFainting,
                  enemyFainting: side === 'enemy' ? false : prev.enemyFainting,
                }))
                setVisualState(normalizeState(seq.state))
                await delay(50)
                if (shouldStop()) break

                setAnim((prev) => ({ ...prev, [inKey]: false }))
                await delay(300)
              } else if (seq.type === 'HEAL') {
                if (shouldStop()) break
                const side = seq.side as 'player' | 'enemy'
                const index = Number(seq.index)
                const hp = Number(seq.hp)

                if (Number.isFinite(index) && Number.isFinite(hp)) {
                  setVisualState((prev) => {
                    try {
                      const newState = cloneState(prev)
                      const team =
                        side === 'player'
                          ? newState.playerTeam
                          : newState.enemyTeam
                      const pokemon = team[index]
                      if (pokemon) {
                        pokemon.currentHp = Math.min(
                          pokemon.maxHp,
                          Math.max(0, hp),
                        )
                      }
                      return newState
                    } catch (err) {
                      console.error('[ENGINE] Error syncing heal:', err)
                      return prev
                    }
                  })
                }
              } else if (seq.type === 'COMBAT') {
                const {
                  result,
                  damageDealt,
                  damageTaken,
                  playerAttackType,
                  enemyAttackType,
                  logEntry,
                } = seq

                // 1. Attack Movement
                if (shouldStop()) break
                if (result === 'win') {
                  safePlaySfx('stance_win')
                  setAnim((prev) => ({ ...prev, playerAttacking: true }))
                  await delay(300)
                  if (shouldStop()) break
                  setAnim((prev) => ({
                    ...prev,
                    playerAttacking: false,
                    enemyHit: true,
                  }))
                } else if (result === 'loss') {
                  safePlaySfx('stance_loss')
                  setAnim((prev) => ({ ...prev, enemyAttacking: true }))
                  await delay(300)
                  if (shouldStop()) break
                  setAnim((prev) => ({
                    ...prev,
                    enemyAttacking: false,
                    playerHit: true,
                  }))
                } else {
                  safePlaySfx('stance_tie')
                  setAnim((prev) => ({
                    ...prev,
                    playerAttacking: true,
                    enemyAttacking: true,
                  }))
                  await delay(300)
                  if (shouldStop()) break
                  setAnim((prev) => ({
                    ...prev,
                    playerAttacking: false,
                    enemyAttacking: false,
                    playerHit: true,
                    enemyHit: true,
                  }))
                }

                // 2. IMPACT: Splat + HP Drop + Log sync
                if (shouldStop()) break
                const impactAnim: Partial<AnimationState> = {}
                if (damageDealt > 0) {
                  impactAnim.enemyDamageSplat = damageDealt
                  impactAnim.enemyImpactType =
                    result === 'win' ? playerAttackType || null : null
                }
                if (damageTaken > 0) {
                  impactAnim.playerDamageSplat = damageTaken
                  impactAnim.playerImpactType =
                    result === 'loss' ? enemyAttackType || null : null
                }
                if (Object.keys(impactAnim).length > 0) {
                  setAnim((prev) => ({
                    ...prev,
                    ...impactAnim,
                  }))
                }

                // Update visual HP and Log precisely at impact
                setVisualState((prev) => {
                  try {
                    const newState = cloneState(prev)
                    newState.history = prependVisualLogEntry(
                      newState.history,
                      logEntry,
                    )

                    const enemy = newState.enemyTeam[newState.activeEnemyIndex]
                    const player =
                      newState.playerTeam[newState.activePlayerIndex]
                    if (enemy && damageDealt > 0)
                      enemy.currentHp = Math.max(
                        0,
                        enemy.currentHp - damageDealt,
                      )
                    if (player && damageTaken > 0)
                      player.currentHp = Math.max(
                        0,
                        player.currentHp - damageTaken,
                      )

                    return newState
                  } catch (err) {
                    console.error('[ENGINE] Error updating visual HP:', err)
                    return prev
                  }
                })

                await delay(400)
                if (shouldStop()) break
                setAnim((prev) => ({
                  ...prev,
                  playerHit: false,
                  enemyHit: false,
                }))
                setTrackedTimeout(
                  () =>
                    setAnim((prev) => ({
                      ...prev,
                      enemyDamageSplat: null,
                      playerDamageSplat: null,
                      enemyImpactType: null,
                      playerImpactType: null,
                    })),
                  1500,
                )
              } else if (seq.type === 'STATUS_DAMAGE') {
                const { matches, logEntry } = seq
                if (shouldStop()) break
                setVisualState((prev) => {
                  try {
                    const newState = cloneState(prev)
                    newState.history = prependVisualLogEntry(
                      newState.history,
                      logEntry,
                    )
                    return newState
                  } catch (err) {
                    return prev
                  }
                })

                for (const match of matches) {
                  if (shouldStop()) break
                  const { amount, target, kind = 'damage' } = match
                  if (target === 'player') {
                    setAnim((prev) => ({
                      ...prev,
                      playerStatusDamageSplat:
                        kind === 'damage' ? amount : prev.playerStatusDamageSplat,
                    }))
                    setVisualState((prev) => {
                      try {
                        const newState = cloneState(prev)
                        const p =
                          newState.playerTeam[newState.activePlayerIndex]
                        if (p) {
                          p.currentHp =
                            kind === 'heal'
                              ? Math.min(p.maxHp, p.currentHp + amount)
                              : Math.max(0, p.currentHp - amount)
                        }
                        return newState
                      } catch (err) {
                        return prev
                      }
                    })
                  } else {
                    setAnim((prev) => ({
                      ...prev,
                      enemyStatusDamageSplat:
                        kind === 'damage' ? amount : prev.enemyStatusDamageSplat,
                    }))
                    setVisualState((prev) => {
                      try {
                        const newState = cloneState(prev)
                        const e = newState.enemyTeam[newState.activeEnemyIndex]
                        if (e) {
                          e.currentHp =
                            kind === 'heal'
                              ? Math.min(e.maxHp, e.currentHp + amount)
                              : Math.max(0, e.currentHp - amount)
                        }
                        return newState
                      } catch (err) {
                        return prev
                      }
                    })
                  }
                }

                if (shouldStop()) break
                await delay(600)
                if (shouldStop()) break
                setAnim((prev) => ({
                  ...prev,
                  playerStatusDamageSplat: null,
                  enemyStatusDamageSplat: null,
                }))
              }
              break
            }

            case 'KO_SEQUENCE': {
              const {
                playerKOd,
                enemyKOd,
                playerFormId,
                enemyFormId,
                newState,
                playerReplacement,
                enemyReplacement,
                isGameOver,
              } = event.payload
              if (shouldStop()) break

              await delay(200) // Slight pause before fainting
              if (shouldStop()) break

              if (playerKOd) {
                safePlayPokemonCry(playerFormId)
                setAnim((prev) => ({ ...prev, playerFainting: true }))
              }
              if (enemyKOd) {
                safePlayPokemonCry(enemyFormId)
                setAnim((prev) => ({ ...prev, enemyFainting: true }))
              }

              await delay(1000) // Faint animation duration
              if (shouldStop()) break

              const keepPlayerFaintedHidden = Boolean(
                playerKOd &&
                  !playerReplacement &&
                  !isGameOver &&
                  newState?.pendingPlayerSwitch,
              )

              setAnim((prev) => ({
                ...prev,
                playerFainting: keepPlayerFaintedHidden,
                enemyFainting: false,
              }))

              if (newState) {
                const nextAnim: Partial<AnimationState> = {}
                if (!isGameOver && playerReplacement)
                  nextAnim.playerSwitchingIn = true
                if (!isGameOver && enemyReplacement)
                  nextAnim.enemySwitchingIn = true

                if (Object.keys(nextAnim).length > 0) {
                  setAnim((prev) => ({ ...prev, ...nextAnim }))
                }

                // ALWAYS apply new state after fainting is done,
                // ensuring HP bars are zeroed out and new replacements do not inherit fainting.
                setVisualState(normalizeState(newState))
                if (!isGameOver && Object.keys(nextAnim).length > 0) {
                  await delay(50)
                  if (shouldStop()) break
                  setAnim((prev) => ({
                    ...prev,
                    playerSwitchingIn: playerReplacement
                      ? false
                      : prev.playerSwitchingIn,
                    enemySwitchingIn: enemyReplacement
                      ? false
                      : prev.enemySwitchingIn,
                  }))
                  await delay(350) // Replacement entrance
                } else if (!isGameOver) {
                  await delay(200)
                }
              }
              break
            }

            case 'BATTLE_END': {
              if (shouldStop()) break
              applyBattleEndState(event.payload)
              break
            }
          }

          if (event.delay && !shouldStop()) await delay(event.delay)
          recordBattleDebug('queue-event-end', {
            eventType: event.type,
            sequenceType: event.payload?.type,
            targetState: targetStateRef.current,
          })
        } catch (eventError) {
          recordBattleDebug('queue-event-error', {
            eventType: event.type,
            sequenceType: event.payload?.type,
            targetState: targetStateRef.current,
            error: eventError,
          })
          console.error(
            '[ENGINE] Battle event processing error:',
            event.type,
            eventError,
          )
          if (targetStateRef.current.status !== 'ongoing') {
            setVisualState(normalizeState(targetStateRef.current))
            applyBattleEndState(targetStateRef.current)
          }
        }
      }
    } catch (error) {
      recordBattleDebug('queue-error', {
        targetState: targetStateRef.current,
        error,
      })
      console.error('[ENGINE] Battle Engine Error:', error)
    } finally {
      if (runId === queueRunIdRef.current) {
        isAnimatingRef.current = false
        if (isMountedRef.current) setIsProcessing(false)
        recordBattleDebug('queue-finished', {
          targetState: targetStateRef.current,
        })
      }
    }
  }, [
    applyBattleEndState,
    delay,
    safePlaySfx,
    safePlayPokemonCry,
    setTrackedTimeout,
  ])

  const pushTurnResult = useCallback(
    (result: {
      success: boolean
      state?: BattleState
      waiting?: boolean
      error?: string
    }) => {
      if (!isMountedRef.current || !result.success || !result.state) return

      const nextState = normalizeState(result.state)
      recordBattleDebug('turn-result-received', {
        state: nextState,
        targetState: targetStateRef.current,
      })

      // Prevent duplicate processing of the same turn
      const latestLog = nextState.history[0]
      const stateHash = `${nextState.turn}-${nextState.status}-${nextState.activePlayerIndex}-${nextState.activeEnemyIndex}-${latestLog?.turn || 0}-${latestLog?.message || ''}`
      if (lastResultRef.current === stateHash) {
        recordBattleDebug('turn-result-duplicate', {
          state: nextState,
          targetState: targetStateRef.current,
        })
        return
      }
      lastResultRef.current = stateHash

      if (result.waiting) {
        recordBattleDebug('turn-result-waiting', {
          state: nextState,
          targetState: targetStateRef.current,
        })
        setIsWaitingForOpponent(true)
        return
      }

      setIsWaitingForOpponent(false)

      // Diff against our current Target state
      const events = generateBattleEvents(targetStateRef.current, nextState)
      recordBattleDebug('turn-events-generated', {
        state: nextState,
        targetState: targetStateRef.current,
        events: events.map((event) =>
          event.payload?.type ? `${event.type}:${event.payload.type}` : event.type,
        ),
      })

      // Immediately update Target State so next push diffs correctly
      targetStateRef.current = cloneState(nextState)
      setBattleState(targetStateRef.current)

      queueRef.current.push(...events)
      void processQueue()
    },
    [processQueue],
  )

  return {
    battleState: visualState, // UI renders visual state!
    anim,
    isProcessing,
    isWaitingForOpponent,
    pushTurnResult,
    forceSyncToTargetState,
    showResultScreen,
    setShowResultScreen,
    showCardReveal,
    setShowCardReveal,
    cardsToReveal,
    setCardsToReveal,
    showLevelUpModal,
    setShowLevelUpModal,
    showTaskExitModal,
    setShowTaskExitModal,
    taskExitModalData,
    setTaskExitModalData,
    researchBreakthroughs,
  }
}
