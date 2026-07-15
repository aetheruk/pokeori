import configPromise from '@payload-config'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { getPayload } from 'payload'
import { BattleErrorBoundary } from '@/app/(frontend)/game/battles/_components/battle-error-boundary'
import { BattleInterface } from '@/app/(frontend)/game/battles/_components/battle-interface'
import { getBattleState } from '@/app/(frontend)/game/battles/actions'

export const dynamic = 'force-dynamic'

export default async function BattleEncounterPage() {
  const battleState = await getBattleState()

  if (!battleState) {
    redirect('/game/explore')
  }

  if (battleState?.status !== 'ongoing') {
    // If no active battle, redirect to selection
    // But wait, if we just won/lost, we might want to show the result screen which is handled by BattleInterface
    // BattleInterface handles 'won' and 'lost' states.
    // So we should check if state exists.
    if (
      battleState &&
      (battleState.status === 'won' || battleState.status === 'lost')
    ) {
      return (
        <div className="h-full game-night bg-game-night-canvas text-game-night-ink">
          <BattleErrorBoundary>
            <BattleInterface initialState={battleState} />
          </BattleErrorBoundary>
        </div>
      )
    }

    redirect('/game/battles')
  }

  return (
    <div className="game-night h-full bg-game-night-canvas text-game-night-ink">
      <BattleErrorBoundary>
        <BattleInterface initialState={battleState} />
      </BattleErrorBoundary>
    </div>
  )
}
