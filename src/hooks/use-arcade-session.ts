'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import { checkpointArcade } from '@/app/(frontend)/game/research/games/arcade'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import { recoverGameAction } from '@/utilities/games/action-recovery'
import { completeGame, startGame } from '@/utilities/games/client-action-recovery'
import {
  ARCADE_TICK_RATE, type ArcadeGameType, type ArcadeInput, type ArcadeProof,
  type ArcadeRound, type ArcadeSimulation, stepArcadeSimulation,
} from '@/utilities/research/arcade-authority'
import type { GameDataKeys } from '@/utilities/requirements/analysis'
import { normalizeArcadeInput } from '@/utilities/research/arcade-inputs'

/** Predict locally using the same fixed-step engine the server verifies. Only
 * acknowledged checkpoints survive a reload; a failed save pauses this run. */
const defaultActions = { start: startGame, checkpoint: checkpointArcade, complete: completeGame }

export function useArcadeSession(gameType: ArcadeGameType, encounter: { id: string; settings: any }, actions = defaultActions, controls?: { paused?: boolean; inputForTick?: (simulation: ArcadeSimulation) => Array<Omit<ArcadeInput, 'tick'>> }) {
  const router = useRouter()
  const { playSfx } = useAudio()
  const { refreshUser } = useUser()
  const [simulation, setSimulation] = useState<ArcadeSimulation | null>(null)
  const [countdown, setCountdown] = useState(3)
  const [saving, setSaving] = useState(false)
  const [result, setResult] = useState<any | null>(null)
  const roundRef = useRef<ArcadeRound | null>(null)
  const inputsRef = useRef<ArcadeInput[]>([])
  const checkpointTickRef = useRef(0)
  const busyRef = useRef(false)
  const countdownRef = useRef(3)
  const invalidatesRef = useRef<GameDataKeys[] | undefined>(undefined)
  const playSfxRef = useRef(playSfx)
  playSfxRef.current = playSfx
  const controlsRef = useRef(controls)
  controlsRef.current = controls
  const abandonRef = useRef<() => Promise<void>>(async () => {})

  useEffect(() => {
    let disposed = false
    let frameId = 0
    let lastTime = 0
    let accumulator = 0
    let readyAt = 0
    let completionStarted = false
    let settings = encounter.settings

    const proof = (): ArcadeProof => {
      const round = roundRef.current!
      return { kind: 'arcade', sessionId: round.sessionId, revision: round.revision, targetTick: round.simulation.tick, inputs: structuredClone(inputsRef.current.filter((input) => input.tick <= round.simulation.tick)) }
    }

    const save = async (finished: boolean) => {
      if (busyRef.current || !roundRef.current) return
      busyRef.current = true
      setSaving(true)
      const request = proof()
      const current = roundRef.current.simulation
      if (finished) {
        completionStarted = true
        const lowestMilestone = Math.min(...(settings.endless?.milestones || []).map((milestone: { score: number }) => milestone.score))
        const passed = current.status === 'won' || (settings.endless?.enabled && current.score >= lowestMilestone)
        const completion = await actions.complete(encounter.id, Boolean(passed), Math.max(0, Math.floor(current.score)), undefined, current.collectedRewards, undefined, undefined, request)
        if (disposed) return
        invalidatesRef.current = completion.invalidates
        setResult({ success: Boolean(passed) && completion.success, message: `Final score: ${Math.floor(current.score)}`, rewards: completion.summary })
        playSfxRef.current(passed && completion.success ? 'good' : 'bad')
      } else {
        const response = await recoverGameAction(() => actions.checkpoint(request), 'Progress could not be saved. Retry to continue this same run.', (response) => response.success ? undefined : response.error)
        if (disposed || !response.success) return
        const acknowledged = response.roundData
        roundRef.current = acknowledged
        checkpointTickRef.current = acknowledged.simulation.tick
        inputsRef.current = inputsRef.current.filter((input) => input.tick > acknowledged.simulation.tick)
        setSimulation(acknowledged.simulation)
      }
      busyRef.current = false
      setSaving(false)
      lastTime = 0
      accumulator = 0
    }

    const frame = (now: number) => {
      if (disposed) return
      frameId = requestAnimationFrame(frame)
      const round = roundRef.current
      if (!round) return
      const remaining = Math.max(0, Math.ceil((readyAt - now) / 1000))
      if (remaining !== countdownRef.current) {
        countdownRef.current = remaining
        setCountdown(remaining)
      }
      if (remaining || busyRef.current || completionStarted || controlsRef.current?.paused || document.visibilityState === 'hidden') { lastTime = 0; return }
      if (round.simulation.status !== 'playing') { void save(true); return }
      if (!lastTime) { lastTime = now; return }
      accumulator += Math.min(100, now - lastTime)
      lastTime = now
      let next = round.simulation
      const tickMs = 1000 / ARCADE_TICK_RATE
      while (accumulator >= tickMs && next.status === 'playing') {
        for (const input of controlsRef.current?.inputForTick?.(next) || []) {
          const tick = next.tick + 1
          inputsRef.current = inputsRef.current.filter((queued) => queued.tick !== tick || queued.kind !== input.kind)
          inputsRef.current.push(normalizeArcadeInput({ ...input, tick }))
        }
        next = stepArcadeSimulation(gameType, settings, next, inputsRef.current.filter((input) => input.tick === next.tick + 1))
        accumulator -= tickMs
        // Stop at a checkpoint boundary even when one animation frame catches
        // up several simulation ticks. Do not overfill high-frequency controls.
        if (next.tick - checkpointTickRef.current >= 300 ||
            inputsRef.current.filter((input) => input.tick <= next.tick).length >= 250) break
      }
      round.simulation = next
      setSimulation(next)
      if (next.status !== 'playing') void save(true)
      else if (next.tick - checkpointTickRef.current >= 300 || inputsRef.current.length >= 250) void save(false)
    }
    abandonRef.current = () => save(true)

    void (async () => {
      const response = await recoverGameAction(() => actions.start(encounter.id), 'Unable to restore this run.', (response) => response.roundData?.kind === 'arcade' && response.roundData.gameType === gameType ? undefined : 'The saved run is unavailable. Retry or return to Explore.')
      if (disposed) return
      const round = response.roundData as ArcadeRound
      settings = round.settings
      roundRef.current = round
      checkpointTickRef.current = round.simulation.tick
      inputsRef.current = []
      busyRef.current = false
      countdownRef.current = 3
      readyAt = performance.now() + 3000
      setCountdown(3)
      setSimulation(round.simulation)
      frameId = requestAnimationFrame(frame)
    })()

    return () => { disposed = true; cancelAnimationFrame(frameId) }
  }, [encounter.id, encounter.settings, gameType, actions])

  const sendInput = useCallback((kind: ArcadeInput['kind'], value?: number) => {
    const round = roundRef.current
    if (!round || busyRef.current || countdownRef.current || round.simulation.status !== 'playing') return
    const tick = round.simulation.tick + 1
    // Pointer motion can deliver multiple targets before one simulation frame.
    if (kind === 'steer' || kind === 'heading' || kind === 'paddle') inputsRef.current = inputsRef.current.filter((input) => input.tick !== tick || input.kind !== kind)
    else if (inputsRef.current.some((input) => input.tick === tick && input.kind === kind)) return
    if (inputsRef.current.length >= 300) return
    inputsRef.current.push(normalizeArcadeInput({ tick, kind, ...(value === undefined ? {} : { value }) }))
  }, [])

  const close = () => {
    void refreshUser(true, invalidatesRef.current)
    router.push('/game/explore')
  }
  const replay = async () => { await actions.start(encounter.id, true); window.location.reload() }
  return { simulation, countdown, saving, result, sendInput, close, replay, abandon: () => abandonRef.current(),
    timeLeft: Math.max(0, (roundRef.current?.settings.timeLimit || encounter.settings.timeLimit || 0) - Math.floor((simulation?.tick || 0) / ARCADE_TICK_RATE)),
  }
}
