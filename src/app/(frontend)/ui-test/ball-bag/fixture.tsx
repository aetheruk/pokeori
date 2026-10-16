'use client'

import { SWRConfig } from 'swr'
import { InventoryList } from '@/app/(frontend)/game/inventory/_components/inventory-list'
import { UserProvider } from '@/context/UserContext'
import type { RequirementData } from '@/utilities/requirements'

const data = {
  user: { id: 'bag-test', trainerName: 'Trainer', skills: {}, currency: {} },
  inventory: [{ itemId: 'ball-bag', quantity: 1 }, { itemId: 'pouch-of-materials', quantity: 1 }],
  pokemon: [], pokedex: [], completedTasks: [], currency: {},
} as unknown as RequirementData

export function BallBagFixture() {
  return <SWRConfig value={{ isPaused: () => true }}>
    <UserProvider initialGameData={data}>
      <InventoryList />
    </UserProvider>
  </SWRConfig>
}
