'use client'

import { useState } from 'react'
import { ExploreDetailsModal } from '@/components/game/features/explore/ExploreDetailsModal'
import { UserProvider } from '@/context/UserContext'
import { pokemonTowerBattles } from '@/data/battles/entries/pokemon-tower'
import type { RequirementData } from '@/utilities/requirements'

const battle = pokemonTowerBattles.find((entry) => entry.id === 'pokemon-tower-channeler-patricia')!
const userData = {
  user: { id: 'tower-test', skills: {}, currency: {} },
  pokemon: [
    { id: 'oddish', name: 'Oddish', speciesId: 43, formId: '43', onBattleTeam: true, battleTeamPosition: 1 },
    { id: 'bellsprout', name: 'Bellsprout', speciesId: 69, formId: '69', onBattleTeam: true, battleTeamPosition: 2 },
    { id: 'bulbasaur', name: 'Bulbasaur', speciesId: 1, formId: '1', onBattleTeam: true, battleTeamPosition: 3 },
    { id: 'pikachu', name: 'Pikachu', speciesId: 25, formId: '25', onBattleTeam: true, battleTeamPosition: 4 },
  ],
  inventory: [], completedTasks: [], battleResults: [], currency: {}, pokedex: [],
} as unknown as RequirementData
const noop = () => {}

export function TowerTrialsFixture() {
  const [open, setOpen] = useState(true)
  return (
    <UserProvider initialUser={null} initialGameData={userData}>
      <ExploreDetailsModal
        open={open} onOpenChange={setOpen}
        item={{ ...battle, type: 'battle', originalData: battle }}
        userData={userData} trainerName="Trainer"
        activeVoyages={[]} activeExpedition={null} selectedPokemonIds={[]}
        togglePokemonSelection={noop} selectedEncounterItemId={null}
        setSelectedEncounterItemId={noop} handleConfirmTaskWithSelection={noop}
        handleConfirmEncounterWithSelection={noop} loadingId={null} handleAction={noop}
        handleCompleteVoyage={noop} handleClaimExpeditionRewards={noop} completingTaskId={null}
      />
    </UserProvider>
  )
}
