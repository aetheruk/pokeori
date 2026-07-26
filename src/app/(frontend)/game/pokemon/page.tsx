import { redirect } from 'next/navigation'
import { PokemonList } from './_components/pokemon-list'
import { UserProvider } from '@/context/UserContext'
import { getGameRouteData } from '@/utilities/game-route-data'
import { getPokemonBoxInitialState } from './actions/box'

export default async function PokemonPage() {
  const [initialGameData, initialBoxState] = await Promise.all([
    getGameRouteData('pokemon-box'),
    getPokemonBoxInitialState(),
  ])
  if (!initialGameData) redirect('/auth')

  return (
    <UserProvider initialGameData={initialGameData} scopeOverride="pokemon-box">
      <div className="game-paper-first game-paper-background flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
        <PokemonList initialBoxState={initialBoxState} />
      </div>
    </UserProvider>
  )
}
