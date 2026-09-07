'use client'

import { useMemo, useState } from 'react'
import { SWRConfig } from 'swr'
import { SnakeGame } from '@/app/(frontend)/game/research/encounter/snake'
import { AudioProvider } from '@/context/AudioContext'
import { UserProvider } from '@/context/UserContext'
import { snakeGames } from '@/data/games/snake'
import type { RequirementData } from '@/utilities/requirements'
import { createArcadeRound, verifyArcadeCheckpoint, type ArcadeProof } from '@/utilities/research/arcade-authority'

/** Actual Onix artwork/settings and client; only transport is replaced with a
 * JSON-round-tripping server verifier. No account or reward writes occur. */
export function SnakeFixture() {
  const encounter = snakeGames[0]
  const [checkpoints, setCheckpoints] = useState(0)
  const [error, setError] = useState('')
  const actions = useMemo(() => {
    let saved = createArcadeRound('snake', encounter.settings, Date.now(), 42)
    return {
      start: async () => ({ success: true, roundData: JSON.parse(JSON.stringify(saved)) }),
      checkpoint: async (proof: ArcadeProof) => {
        const verified = verifyArcadeCheckpoint('snake', encounter.settings, JSON.parse(JSON.stringify(saved)), JSON.parse(JSON.stringify(proof)), Date.now())
        if (!verified.success) { setError(verified.error); return verified }
        saved = JSON.parse(JSON.stringify(verified.roundData))
        setCheckpoints((count) => count + 1)
        return { success: true as const, roundData: JSON.parse(JSON.stringify(saved)) }
      },
      complete: async () => ({ success: true }),
    }
  }, [encounter])
  return <SWRConfig value={{ isPaused: () => true }}><UserProvider initialGameData={{ user: { id: 'ui-test', trainerName: 'Test trainer' }, inventory: [], pokemon: [] } as unknown as RequirementData}><AudioProvider>
    <div className="fixed inset-0 z-40">
      <SnakeGame encounter={encounter} actions={actions} />
      <output aria-label="Verified Onix checkpoints" className="sr-only">{checkpoints}</output>
      <output aria-label="Onix checkpoint error" className="sr-only">{error}</output>
    </div>
  </AudioProvider></UserProvider></SWRConfig>
}
