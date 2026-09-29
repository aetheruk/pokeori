'use client'

import { useMemo, useState } from 'react'
import { SWRConfig } from 'swr'
import { UserProvider, useUser } from '@/context/UserContext'
import type { GameDataScope } from '@/utilities/game-data-scopes'
import type { RequirementData } from '@/utilities/requirements'

function Snapshot() {
  const { user, refreshUser, isLoading } = useUser()
  const [settled, setSettled] = useState(false)
  return <>
    <output aria-label="Fixture currency">{user?.currency?.pokedollars ?? 'loading'}</output>
    <output aria-label="Fixture loading">{String(isLoading)}</output>
    <button type="button" onClick={async () => { await refreshUser(true, ['gameResults']); setSettled(true) }}>Apply acknowledged reward invalidation</button>
    {settled && <p>Reward refresh finished</p>}
  </>
}

/** Real scoped provider, isolated SWR cache; browser intercepts every sync request. */
export function SyncFixture() {
  const [scope, setScope] = useState<GameDataScope>('inventory')
  const [seeded, setSeeded] = useState(false)
  const [visible, setVisible] = useState(true)
  const cache = useMemo(() => new Map(), [])
  return <SWRConfig value={{ provider: () => cache }}>
    <section aria-label="Scoped sync fixture">
      {(['inventory', 'tcg', 'abilitydex', 'core'] as const).map((next) => <button key={next} type="button" onClick={() => setScope(next)}>Visit {next} scope</button>)}
      <p>Current scope: {scope}</p>
      <button type="button" onClick={() => { cache.clear(); setSeeded(true) }}>Use prefetched snapshot</button>
      <button type="button" onClick={() => setVisible((current) => !current)}>Toggle snapshot</button>
      {visible && <UserProvider key={String(seeded)} scopeOverride={scope} initialGameData={seeded ? {
        snapshotAt: '2026-01-01T00:00:00.000Z',
        user: { id: 'sync-fixture', currency: { pokedollars: 10 } },
        inventory: [],
      } as unknown as RequirementData : undefined}><Snapshot /></UserProvider>}
    </section>
  </SWRConfig>
}
