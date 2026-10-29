'use client'

import { useState } from 'react'
import { SWRConfig } from 'swr'
import { GridAdventurePartyManager } from '@/app/(frontend)/game/research/encounter/grid-adventure-party-manager'
import { Button } from '@/components/ui/button'
import { UserProvider } from '@/context/UserContext'
import type { Pokemon } from '@/payload-types'
import type { RequirementData } from '@/utilities/requirements'

const first = { id: 'fixture-team-1', speciesId: 1, formId: '1', name: 'Bulbasaur', level: 12, identified: true, onBattleTeam: true, battleTeamPosition: 1 } as Pokemon
const second = { id: 'fixture-team-2', speciesId: 4, formId: '4', name: 'Charmander', level: 10, identified: true, onBattleTeam: true, battleTeamPosition: 2 } as Pokemon
const partnerPokemon = { id: 'fixture-partner', speciesId: 7, formId: '7', name: 'Squirtle', level: 11, identified: true, isCompanion: true } as Pokemon
const newPokemon = { id: 'fixture-box', speciesId: 25, formId: '25', name: 'Pikachu', level: 9, identified: true } as Pokemon

export function PartyManagerFixture() {
  const [open, setOpen] = useState(true)
  const [team, setTeam] = useState<Pokemon[]>([first, second])
  const [companion, setCompanion] = useState<Pokemon | null>(partnerPokemon)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [choosing, setChoosing] = useState<'battle-team' | 'companion' | null>(null)

  return (
    <SWRConfig value={{ isPaused: () => true }}>
      <UserProvider initialGameData={{ user: { id: 'ui-test', skills: { researching: { level: 10 }, battling: { level: 10 } } }, inventory: [], pokedex: [], pokemon: [] } as unknown as RequirementData}>
        {choosing && <Button onClick={() => {
          if (choosing === 'battle-team') setTeam((current) => [...current, { ...newPokemon, onBattleTeam: true, battleTeamPosition: current.length + 1 }])
          else setCompanion({ ...newPokemon, isCompanion: true })
          setSelectedId(newPokemon.id)
          setChoosing(null)
          setOpen(true)
        }}>Choose Pikachu from box</Button>}
        <GridAdventurePartyManager box={{
          open, onOpenChange: setOpen, selectedPokemonId: selectedId, battleTeam: team, companion,
          onChooseFromBox: (role) => { setOpen(false); setChoosing(role) },
          onRemove: async (pokemon) => {
            setTeam((current) => current.filter((member) => member.id !== pokemon.id))
            setCompanion((current) => current?.id === pokemon.id ? null : current)
            return true
          },
          onPokemonUpdated: () => {},
          onTeamPositionsChanged: () => {},
        }} />
      </UserProvider>
    </SWRConfig>
  )
}
