'use client'

import { useMemo, useState } from 'react'
import { SWRConfig } from 'swr'
import {
  UndergroundMiningGame,
  type UndergroundMiningActions,
} from '@/app/(frontend)/game/research/encounter/underground-mining'
import { GameActionRecovery } from '@/components/game/shared/GameActionRecovery'
import { Button } from '@/components/ui/button'
import { AudioProvider } from '@/context/AudioContext'
import { UserProvider } from '@/context/UserContext'
import { testUndergroundMiningEntries } from '@/data/games/underground-mining/entries/test'
import type { UndergroundMiningSettings } from '@/data/games/underground-mining/types'
import type { RequirementData } from '@/utilities/requirements'
import {
  applyUndergroundMiningStrike,
  createUndergroundMiningRound,
  getUndergroundMiningPublicRound,
  getUndergroundMiningRewards,
} from '@/utilities/research/underground-mining'

const items = [
  { itemId: 'fire-gem', name: 'Fire Gem', x: 3, y: 3 },
  { itemId: 'helix-fossil', name: 'Helix Fossil', x: 8, y: 2 },
  { itemId: 'thunder-stone', name: 'Thunder Stone', x: 8, y: 7 },
]
const baseEncounter = {
  ...testUndergroundMiningEntries[0],
  name: 'Underground Mining Preview',
  settings: {
    ...testUndergroundMiningEntries[0].settings,
    treasureCount: { min: 3, max: 3 },
    lootPool: items.map((item) => ({
      itemId: item.itemId,
      weight: 1,
      size: { width: 2, height: 2 },
    })),
  },
}

function makeWall(settings: UndergroundMiningSettings) {
  const { privateRound } = createUndergroundMiningRound(settings, 42)
  privateRound.treasures.forEach((item, index) =>
    Object.assign(item, items[index]),
  )
  for (const cell of privateRound.cells) {
    cell.bedrock = false
    if (
      items.some(
        (item) =>
          cell.x >= item.x &&
          cell.x < item.x + 2 &&
          cell.y >= item.y &&
          cell.y < item.y + 2,
      )
    ) {
      cell.bedrock = false
      cell.layersRemaining = 3
    }
  }
  privateRound.cells[settings.gridSize.cols + 1].bedrock = true
  privateRound.cells[settings.gridSize.cols + 1].layersRemaining = 2
  return {
    privateRound,
    publicRound: getUndergroundMiningPublicRound(settings, privateRound),
  }
}

/** Runs the real client lifecycle against isolated, deterministic session storage. */
export function UndergroundMiningFixture({
  complete = false,
}: {
  complete?: boolean
}) {
  const encounter = useMemo(
    () => ({
      ...baseEncounter,
      settings: { ...baseEncounter.settings, complete },
    }),
    [complete],
  )
  const [closed, setClosed] = useState(false)
  const [stats, setStats] = useState({ active: false, settlements: 0 })
  const actions = useMemo<UndergroundMiningActions>(() => {
    let session: ReturnType<typeof makeWall> | null = null
    let startTime = 0
    let receipt: Awaited<
      ReturnType<UndergroundMiningActions['complete']>
    > | null = null
    return {
      start: async (_id, reset) => {
        if (!session || reset) {
          session = makeWall(encounter.settings)
          startTime = Math.max(Date.now(), startTime + 1)
          receipt = null
          setStats((value) => ({ ...value, active: true }))
        }
        return {
          success: true,
          startTime,
          roundData: structuredClone(session.publicRound),
        }
      },
      strike: async (input) => {
        if (
          !session ||
          input.startTime !== startTime ||
          input.revision !== session.publicRound.revision
        )
          return { success: false, error: 'Preview session is out of date' }
        const result = applyUndergroundMiningStrike(
          encounter.settings,
          session.publicRound,
          session.privateRound,
          input,
        )
        if (!result.success) return result
        session = result
        return { success: true, round: structuredClone(result.publicRound) }
      },
      complete: async (_id, success) => {
        if (receipt) return structuredClone(receipt)
        if (
          !session ||
          session.privateRound.status === 'playing' ||
          success !== (session.privateRound.status === 'cleared')
        )
          return { success: false, error: 'Finish this preview wall first' }
        const rewards = getUndergroundMiningRewards(
          session.privateRound,
          encounter.settings,
        )
        receipt = {
          success: true,
          message:
            !success && encounter.settings.complete
              ? 'Every treasure was required. No rewards earned. This was a practice wall.'
              : 'Practice complete. Preview finds are not added to your inventory.',
          summary: {
            xp: {},
            pokemon: [],
            currency: [],
            cards: [],
            items: rewards.map((reward) => ({
              id: reward.targetId,
              name: items.find((item) => item.itemId === reward.targetId)?.name,
              quantity: reward.quantity,
            })),
          },
          invalidates: [],
        }
        session = null
        setStats((value) => ({
          active: false,
          settlements: value.settlements + 1,
        }))
        return structuredClone(receipt)
      },
    }
  }, [encounter])

  return (
    <SWRConfig value={{ isPaused: () => true }}>
      <UserProvider
        initialGameData={
          {
            user: { id: 'mining-preview', trainerName: 'Trainer' },
            pokemon: [],
            inventory: [],
          } as unknown as RequirementData
        }
      >
        <AudioProvider>
          {closed ? (
            <div className="flex min-h-dvh items-center justify-center bg-game-canvas">
              <Button onClick={() => setClosed(false)}>
                Start another wall
              </Button>
            </div>
          ) : (
            <UndergroundMiningGame
              encounter={encounter}
              actions={actions}
              onExit={() => setClosed(true)}
            />
          )}
          <GameActionRecovery />
          <output aria-label="Preview session state" className="sr-only">
            {stats.active ? 'active' : 'closed'}
          </output>
          <output aria-label="Preview settlements" className="sr-only">
            {stats.settlements}
          </output>
        </AudioProvider>
      </UserProvider>
    </SWRConfig>
  )
}
