'use client'

import { useState } from 'react'
import { SWRConfig } from 'swr'
import { GridPuzzleGame } from '@/app/(frontend)/game/research/encounter/grid-puzzle'
import { AudioProvider } from '@/context/AudioContext'
import { UserProvider } from '@/context/UserContext'
import {
  gridPuzzleGames,
  type GridPuzzleVariant,
} from '@/data/games/grid-puzzle'
import type { RequirementData } from '@/utilities/requirements'
import {
  TRAINER_GENDERS,
  type TrainerGender,
} from '@/utilities/trainer-appearance'

export function GridAppearanceFixture() {
  const [gender, setGender] = useState<TrainerGender>('neither')
  const [variant, setVariant] = useState<GridPuzzleVariant>('rock-push')
  const source = gridPuzzleGames.find(
    (entry) => entry.settings.variant === variant,
  )!
  const encounter = {
    ...source,
    id: 'appearance-fixture',
    settings: { ...source.settings, timeLimit: 300 },
  }
  return (
    <section aria-label="Grid appearance fixture">
      <label>
        Character{' '}
        <select
          aria-label="Grid character"
          value={gender}
          onChange={(event) => setGender(event.target.value as TrainerGender)}
        >
          {TRAINER_GENDERS.map((value) => (
            <option key={value}>{value}</option>
          ))}
        </select>
      </label>
      <label>
        Game{' '}
        <select
          aria-label="Grid variant"
          value={variant}
          onChange={(event) =>
            setVariant(event.target.value as GridPuzzleVariant)
          }
        >
          <option>rock-push</option>
          <option>voltorb</option>
          <option>echo-map</option>
        </select>
      </label>
      <SWRConfig value={{ isPaused: () => true }}>
        <UserProvider
          key={`${gender}-${variant}`}
          initialGameData={
            {
              user: {
                id: 'ui-test',
                trainerName: 'Sprite test',
                trainerGender: gender,
              },
              inventory: [],
              pokemon: [],
            } as unknown as RequirementData
          }
        >
          <AudioProvider>
            <div className="h-[780px]">
              <GridPuzzleGame encounter={encounter} />
            </div>
          </AudioProvider>
        </UserProvider>
      </SWRConfig>
    </section>
  )
}
