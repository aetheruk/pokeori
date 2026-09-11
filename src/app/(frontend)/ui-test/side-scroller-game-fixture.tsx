'use client'

import { useMemo } from 'react'
import { FlapGame } from '@/app/(frontend)/game/research/encounter/flap'
import { RunGame } from '@/app/(frontend)/game/research/encounter/run'
import { celadonCityFlapEntries } from '@/data/games/flap/entries/celadon-city'
import { pewterCitybasicEntries } from '@/data/games/run/entries/pewter-city'
import {
  createArcadeRound,
  type ArcadeGameType,
  type ArcadeProof,
  verifyArcadeCheckpoint,
} from '@/utilities/research/arcade-authority'

const runEncounter = pewterCitybasicEntries[0]
const flapEncounter = celadonCityFlapEntries[0]

function useFixtureActions(
  gameType: ArcadeGameType,
  encounter: typeof runEncounter | typeof flapEncounter,
) {
  return useMemo(() => {
    let saved = createArcadeRound(
      gameType,
      encounter.settings,
      Date.now(),
      42,
    )

    return {
      start: async () => ({
        success: true,
        roundData: structuredClone(saved),
      }),
      checkpoint: async (proof: ArcadeProof) => {
        const verified = verifyArcadeCheckpoint(
          gameType,
          encounter.settings,
          saved,
          proof,
          Date.now(),
        )
        if (!verified.success) return verified
        saved = verified.roundData
        return {
          success: true as const,
          roundData: structuredClone(saved),
        }
      },
      complete: async () => ({
        success: true,
        summary: [],
        invalidates: [],
      }),
    }
  }, [encounter, gameType])
}

export function SideScrollerGameFixture({
  gameType,
}: {
  gameType: 'run' | 'flap'
}) {
  const encounter = gameType === 'run' ? runEncounter : flapEncounter
  const actions = useFixtureActions(gameType, encounter)

  return gameType === 'run' ? (
    <RunGame encounter={runEncounter} actions={actions} />
  ) : (
    <FlapGame encounter={flapEncounter} actions={actions} />
  )
}
