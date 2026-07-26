import { redirect } from 'next/navigation'
import { PokemonList } from './_components/pokemon-list'
import { UserProvider } from '@/context/UserContext'
import { getGameRouteData } from '@/utilities/game-route-data'
import { getPokemonBoxInitialState } from './actions/box'

export default async function PokemonPage() {
  const [gameDataResult, boxStateResult] = await Promise.allSettled([
    getGameRouteData('pokemon-box'),
    getPokemonBoxInitialState(),
  ])

  if (gameDataResult.status === 'rejected') throw gameDataResult.reason
  if (!gameDataResult.value) redirect('/auth')
  if (boxStateResult.status === 'rejected') throw boxStateResult.reason

  const initialGameData = gameDataResult.value
  const initialBoxState = boxStateResult.value

  return (
    <UserProvider initialGameData={initialGameData} scopeOverride="pokemon-box">
      <div className="game-paper-first game-paper-background flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
        <PokemonList initialBoxState={initialBoxState} />
      </div>
    </UserProvider>
  )
}
