'use client'

import { useMemo, useState } from 'react'
import { SWRConfig } from 'swr'
import { UserProvider, useUser } from '@/context/UserContext'
import type { GameDataScope } from '@/utilities/game-data-scopes'

function Snapshot() {
  const { user, refreshUser } = useUser()
  const [settled, setSettled] = useState(false)
  return <>
    <output aria-label="Fixture currency">{user?.currency?.pokedollars ?? 'loading'}</output>
    <button type="button" onClick={async () => { await refreshUser(true, ['gameResults']); setSettled(true) }}>Apply acknowledged reward invalidation</button>
    {settled && <p>Reward refresh finished</p>}
  </>
}

/** Real scoped provider, isolated SWR cache; browser intercepts every sync request. */
export function SyncFixture() {
  const [scope, setScope] = useState<GameDataScope>('inventory')
  const cache = useMemo(() => new Map(), [])
  return <SWRConfig value={{ provider: () => cache }}>
    <section aria-label="Scoped sync fixture">
      {(['inventory', 'tcg', 'abilitydex', 'core'] as const).map((next) => <button key={next} type="button" onClick={() => setScope(next)}>Visit {next} scope</button>)}
      <p>Current scope: {scope}</p>
      <UserProvider scopeOverride={scope}><Snapshot /></UserProvider>
    </section>
  </SWRConfig>
}
