'use client'

import { useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import { useArcadeSession } from '@/hooks/use-arcade-session'
import { createArcadeRound, verifyArcadeCheckpoint, type ArcadeProof } from '@/utilities/research/arcade-authority'

const encounter = { id: 'ui-test-arcade', settings: { speed: 120, timeLimit: 3600, winScore: 10000, parallaxLayers: [] } }

/** Fake server verifies the real transcript and drops its first saved reply. */
export function ArcadeFixture() {
  const [generation, setGeneration] = useState(0)
  const [acknowledged, setAcknowledged] = useState(0)
  const [attempts, setAttempts] = useState(0)
  const actions = useMemo(() => {
    let saved = createArcadeRound('run', encounter.settings, Date.now(), 42)
    let dropped = false
    let previousProof = ''
    return {
      start: async () => ({ success: true, roundData: structuredClone(saved) }),
      checkpoint: async (proof: ArcadeProof) => {
        setAttempts((value) => value + 1)
        const serialized = JSON.stringify(proof)
        if (serialized !== previousProof) {
          const verified = verifyArcadeCheckpoint('run', encounter.settings, saved, proof, Date.now())
          if (!verified.success) return { success: false as const, error: verified.error }
          saved = verified.roundData
          previousProof = serialized
          setAcknowledged(saved.simulation.tick)
        }
        if (!dropped) { dropped = true; throw new Error('Dropped checkpoint response') }
        return { success: true as const, roundData: structuredClone(saved) }
      },
      complete: async () => ({ success: true }),
    }
  }, [])
  return <section aria-label="Arcade checkpoint fixture">
    <p>Checkpoint attempts: {attempts}</p>
    <p>Saved tick: {acknowledged}</p>
    <Button onClick={() => setGeneration((value) => value + 1)}>Restore arcade checkpoint</Button>
    <ArcadeProbe key={generation} actions={actions} />
  </section>
}

function ArcadeProbe({ actions }: { actions: Parameters<typeof useArcadeSession>[2] }) {
  const session = useArcadeSession('run', encounter, actions)
  return <>
    <p data-testid="arcade-tick">{session.simulation?.tick ?? 0}</p>
    <p>Arcade countdown: {session.countdown}</p>
    <p>Arcade saving: {String(session.saving)}</p>
    <Button onClick={() => { session.sendInput('jump'); session.sendInput('jump') }}>Jump arcade</Button>
  </>
}
