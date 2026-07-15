import { kantoArtisanRecipes } from './entries/kanto'
import type { ArtisanRecipe } from './types'

export * from './types'

export const artisanRecipes: ArtisanRecipe[] = [...kantoArtisanRecipes]

export function getArtisanRecipe(id: string): ArtisanRecipe | undefined {
  return artisanRecipes.find((recipe) => recipe.id === id)
}
