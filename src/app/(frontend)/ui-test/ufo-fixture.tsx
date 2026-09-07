'use client'

import { useMemo } from 'react'
import { SWRConfig } from 'swr'
import { UfoCatcherGame } from '@/app/(frontend)/game/research/encounter/ufo-catcher'
import { AudioProvider } from '@/context/AudioContext'
import { UserProvider } from '@/context/UserContext'
import { ufoCatcherGames } from '@/data/games/ufo-catcher'
import {
  buildUfoCatcherPrizeLayout,
  resolveUfoCatcherAttempt,
} from '@/utilities/research/ufo-catcher'
import type { RequirementData } from '@/utilities/requirements'

/** Real cabinet and geometry, with deterministic local transport and no reward writes. */
export function UfoFixture() {
  const encounter = ufoCatcherGames[0]
  const actions = useMemo(() => {
    const prizes = buildUfoCatcherPrizeLayout({
      settings: encounter.settings,
      tierRolls: [0, 0, 0, 0, 0],
      anchorRolls: [0, 0, 0, 0, 0],
      jitterRolls: [],
    })
    return {
      start: async () => ({
        success: true,
        balance: 270,
        attempt: {
          attemptId: 'ufo-ui-test',
          encounterId: encounter.id,
          createdAt: Date.now(),
          prizes,
          xTravelMs: encounter.settings.xTravelMs,
          yTravelMs: encounter.settings.yTravelMs,
        },
      }),
      settle: async ({
        input,
      }: {
        input: { xHoldMs: number; yHoldMs: number }
      }) => ({
        success: true,
        balance: 270,
        ...resolveUfoCatcherAttempt({
          settings: encounter.settings,
          prizes,
          input,
          gripRoll: 0,
        })!,
      }),
      exit: async () => ({ success: false, error: 'Local fixture' }),
    }
  }, [encounter])
  return (
    <SWRConfig value={{ isPaused: () => true }}>
      <UserProvider
        initialGameData={
          {
            user: {
              id: 'ui-test',
              trainerName: 'Test trainer',
              currency: { 'fun-tokens': 300 },
            },
            inventory: [],
            pokemon: [],
          } as unknown as RequirementData
        }
      >
        <AudioProvider>
          <div className="fixed inset-0 z-40 overflow-auto">
            <UfoCatcherGame encounter={encounter} actions={actions} />
          </div>
        </AudioProvider>
      </UserProvider>
    </SWRConfig>
  )
}
