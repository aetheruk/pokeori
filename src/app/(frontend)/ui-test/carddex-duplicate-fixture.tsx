'use client'

import { useMemo, useState } from 'react'
import { SWRConfig } from 'swr'
import TcgExplorerPage from '@/app/(frontend)/game/tcg/tcg-client'
import { UserProvider } from '@/context/UserContext'
import baseSet from '@/data/tcg/sets/base1'
import type { TcgSet } from '@/data/tcg/types'
import {
  DEFAULT_CARDDEX_FILTERS,
  type CarddexViewFilters,
} from '@/utilities/tcg/carddex-view'
import type { RequirementData } from '@/utilities/requirements'

const fixtureCard = baseSet.cards[0]
const fixtureSet: Omit<TcgSet, 'cards'> & { cards: [] } = {
  ...baseSet,
  cards: [],
}
const fixtureFilters: CarddexViewFilters = {
  ...DEFAULT_CARDDEX_FILTERS,
  ownership: 'duplicates',
}

function createFixtureData(quantity: number): RequirementData {
  return {
    snapshotAt: new Date().toISOString(),
    user: {
      id: 'ui-test-carddex',
      trainerName: 'Test trainer',
      currency: { pokedollars: quantity > 1 ? 0 : 100 },
    },
    inventory: [
      { itemId: 'binder-base1', quantity: 1 },
      { itemId: 'card-crystalizer', quantity: 1 },
    ],
    pokemon: [],
    tcg: [{ cardId: fixtureCard.id, setId: baseSet.id, quantity }],
    pokedex: [],
    completedTasks: [],
    battleResults: [],
    locationEncounterResults: [],
    gameResults: [],
  } as unknown as RequirementData
}

export function CarddexDuplicateFixture() {
  const [gameData, setGameData] = useState(() => createFixtureData(3))
  const actions = useMemo(
    () => ({
      redistributeDuplicateCards: async () => {
        setGameData(createFixtureData(1))
        return {
          ok: true,
          pokedollarsAdded: 100,
          cardsRemoved: 2,
          summary: {
            xp: {},
            items: [],
            pokemon: [],
            currency: [{ type: 'pokedollars', quantity: 100 }],
            cards: [],
            tasksCompleted: [],
          },
        }
      },
    }),
    [],
  )

  return (
    <SWRConfig value={{ isPaused: () => true }}>
      <UserProvider initialGameData={gameData} scopeOverride="tcg">
        <TcgExplorerPage
          initialScope={{ series: 'Base', setId: baseSet.id }}
          initialFilters={fixtureFilters}
          initialCatalog={{
            items: [{ card: fixtureCard, set: fixtureSet }],
            total: 1,
            ownedTotal: 1,
            nextCursor: null,
          }}
          actions={actions}
        />
      </UserProvider>
    </SWRConfig>
  )
}
