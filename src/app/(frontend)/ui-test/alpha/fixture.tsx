'use client'

import { SWRConfig } from 'swr'
import { HealthDisplay } from '@/app/(frontend)/game/battles/_components/health-display'
import { PokemonDetailsDialog } from '@/app/(frontend)/game/pokemon/_components/pokemon-details-dialog'
import { Button } from '@/components/ui/button'
import { UserProvider } from '@/context/UserContext'
import { AudioProvider } from '@/context/AudioContext'
import type { Pokemon } from '@/payload-types'
import type { RequirementData } from '@/utilities/requirements'

const pokemon: Pokemon = {
  id: 'alpha-ui',
  user: 'ui-test',
  originalTrainer: 'ui-test',
  speciesId: 19,
  formId: '19',
  name: 'Rattata',
  level: 11,
  identified: true,
  isAlpha: true,
  rarity: 'shiny',
  shiny: true,
  gender: 'female',
  size: 'XXXL',
  height: 3.9,
  weight: 45.8,
  background: '/backgrounds/grassy-route.avif',
  createdAt: '2026-01-01T00:00:00.000Z',
  updatedAt: '2026-01-01T00:00:00.000Z',
}

/** Account-free presentation fixture; never invokes gameplay actions. */
export function AlphaUiFixture() {
  return (
    <SWRConfig value={{ isPaused: () => true }}>
      <UserProvider
        initialGameData={
          {
            user: { id: 'ui-test', trainerName: 'Trainer', skills: {} },
            inventory: [{ itemId: 'poke-scales', quantity: 1 }],
            pokemon: [pokemon],
          } as unknown as RequirementData
        }
      >
        <AudioProvider>
          <main className="mx-auto flex min-h-dvh max-w-lg flex-col gap-6 bg-game-canvas p-4">
            <div data-testid="alpha-hud">
              <HealthDisplay
                name="Rattata"
                level={11}
                currentHp={60}
                maxHp={100}
                isAlpha
                gender="female"
              />
            </div>
            <PokemonDetailsDialog
              pokemon={pokemon}
              boxes={[]}
              trigger={<Button>Inspect Alpha</Button>}
            />
          </main>
        </AudioProvider>
      </UserProvider>
    </SWRConfig>
  )
}
