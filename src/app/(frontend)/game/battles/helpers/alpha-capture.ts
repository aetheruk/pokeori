import type { BattleConfig } from '@/data/types'
import type { BattleState } from '@/utilities/battle/types'
import { ALPHA_CAPTURE_SECONDS } from '@/utilities/pokemon/alpha'
import type { EncounterState } from '../../locations/encounter/actions/types'

export function buildAlphaCaptureEncounter(
  state: BattleState,
  config: BattleConfig,
  userId: string,
  now: number,
): EncounterState | null {
  const pokemon = state.alphaCapturePokemon
  if (
    state.status !== 'won' ||
    !state.isWildBattle ||
    state.isPvp ||
    state.chronicle ||
    state.alphaCaptureStartedAt ||
    !pokemon?.isAlpha ||
    !state.enemyTeam.some((enemy) => enemy.isAlpha && enemy.currentHp <= 0)
  ) {
    return null
  }
  const locationId = `alpha:${state.economyActionId || state.battleId}`
  return {
    userId,
    locationId,
    pokemonId: pokemon.speciesId,
    formId: pokemon.formId,
    gender: pokemon.gender || undefined,
    isShiny: pokemon.shiny === true,
    rarity: pokemon.rarity || undefined,
    alphaPokemon: structuredClone(pokemon),
    alphaBattleId: state.economyActionId || state.battleId,
    background: pokemon.background || state.background,
    level: pokemon.level,
    startTime: now,
    expiry: now + ALPHA_CAPTURE_SECONDS * 1000,
    baseCatchRate: 0,
    currentCatchRate: 0,
    questionsAnswered: [],
    itemsUsed: [],
    weather: state.weather,
    locationSnapshot: {
      id: locationId,
      name: config.subCategory || config.name,
      description: 'Capture the defeated Alpha Pokémon.',
      category: config.category,
      subCategory: config.subCategory,
      icon: { type: 'pokemon', id: pokemon.formId },
      requirements: [],
      encounters: [
        { speciesId: pokemon.speciesId, formId: pokemon.formId, chance: 100 },
      ],
      rewards: [],
      background: pokemon.background || state.background,
      timer: ALPHA_CAPTURE_SECONDS,
      levelRange: { min: pokemon.level, max: pokemon.level },
      keyEncounter: true,
    },
  }
}
