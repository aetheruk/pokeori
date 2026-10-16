'use client'

import { useMemo, useState } from 'react'
import { SWRConfig } from 'swr'
import { RhythmGame } from '@/app/(frontend)/game/research/encounter/rhythm'
import { AudioProvider } from '@/context/AudioContext'
import { UserProvider } from '@/context/UserContext'
import { ceruleanCityrhythmEntries } from '@/data/games/rhythm/entries/cerulean-city'
import type { RequirementData } from '@/utilities/requirements'
import { createArcadeRound, getArcadeSessionSettings, verifyArcadeCheckpoint, type ArcadeProof } from '@/utilities/research/arcade-authority'

const encounter = ceruleanCityrhythmEntries[0]

export function RhythmFixture() {
  const [completions, setCompletions] = useState(0)
  const actions = useMemo(() => {
    let saved = createArcadeRound('rhythm', getArcadeSessionSettings('rhythm', encounter.settings, 20), Date.now(), 42)
    return {
      start: async () => ({ success: true, roundData: structuredClone(saved) }),
      checkpoint: async (proof: ArcadeProof) => {
        const verified = verifyArcadeCheckpoint('rhythm', encounter.settings, saved, proof, Date.now())
        if (!verified.success) return verified
        saved = verified.roundData
        return { success: true as const, roundData: structuredClone(saved) }
      },
      complete: async (...args: any[]) => {
        const verified = verifyArcadeCheckpoint('rhythm', encounter.settings, saved, args[7], Date.now())
        if (!verified.success) throw new Error(verified.error)
        if (verified.roundData.simulation.status === 'playing') throw new Error('Cannot complete an unfinished round')
        saved = verified.roundData
        setCompletions((count) => count + 1)
        return { success: true }
      },
    }
  }, [])
  return (
    <SWRConfig value={{ isPaused: () => true }}>
      <UserProvider initialGameData={{ user: { id: 'rhythm-test', trainerName: 'Trainer' }, pokemon: [], inventory: [] } as unknown as RequirementData}>
        <AudioProvider>
          <RhythmGame encounter={encounter} actions={actions} />
          <output aria-label="Verified rhythm completions" className="sr-only">{completions}</output>
        </AudioProvider>
      </UserProvider>
    </SWRConfig>
  )
}
