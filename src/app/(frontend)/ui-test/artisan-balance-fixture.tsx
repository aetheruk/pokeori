'use client'

import { useState } from 'react'
import { BalanceDialog } from '@/components/game/artisan/artisan-panel'
import { artisanRecipes } from '@/data/artisan'
import type { ArtisanCraftSession } from '@/utilities/artisan/types'

const balanceRecipe =
  artisanRecipes.find((recipe) => recipe.id === 'craft-water-lure') || null

export function ArtisanBalanceFixture() {
  const [open, setOpen] = useState(true)
  const [status, setStatus] = useState('Waiting for locks')
  const [session] = useState<ArtisanCraftSession>(() => {
    const now = Date.now()

    return {
      id: 'ui-test-artisan-balance',
      userId: 'ui-test',
      recipeId: balanceRecipe?.id || 'craft-water-lure',
      craftType: 'balance',
      createdAt: now,
      startAt: now - 1_000,
      targetAt: now,
      endAt: now + 14_600,
      perfectWindowMs: 100,
      goodWindowMs: 200,
      balanceTargets: [0.5, 0.5, 0.5],
      balanceGoodWindow: 0.084,
      balancePerfectWindow: 0.084,
      balancePeriodMs: 1_200,
    }
  })

  return (
    <>
      <p role="status" className="p-4">
        {status}
      </p>
      <BalanceDialog
        recipe={balanceRecipe}
        session={session}
        open={open}
        completing={false}
        onComplete={(locks) =>
          setStatus(`Completed with ${locks.length} locks`)
        }
        onClose={() => setOpen(false)}
      />
    </>
  )
}
