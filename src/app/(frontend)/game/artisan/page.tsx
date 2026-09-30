import { ArtisanPanel } from '@/components/game/artisan/artisan-panel'
import { GameRouteDataBoundary } from '@/components/game/shared/GameRouteDataBoundary'

export default async function ArtisanPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const ingredientParam = params.ingredient
  const initialIngredientId =
    typeof ingredientParam === 'string' ? ingredientParam : null

  return (
    <GameRouteDataBoundary scope="artisan">
      <div className="game-paper-first game-paper-background flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
        <ArtisanPanel initialIngredientId={initialIngredientId} />
      </div>
    </GameRouteDataBoundary>
  )
}
