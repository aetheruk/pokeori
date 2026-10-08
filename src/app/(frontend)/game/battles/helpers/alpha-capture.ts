import type { BattleConfig } from '@/data/types'
import type { BattleState } from '@/utilities/battle/types'
import {
  ALPHA_CAPTURE_SECONDS,
  type AlphaCapturePokemon,
} from '@/utilities/pokemon/alpha'
import { getPokemonForm } from '@/utilities/pokemon/pokedex'
import { resolvePokemonRarity } from '@/utilities/pokemon/rarity-effects'
import type { EncounterState } from '../../locations/encounter/actions/types'

const STANDARD_CAPTURE_SECONDS = 30

export function buildBattleCaptureEncounter(
  state: BattleState,
  config: BattleConfig,
  userId: string,
  now: number,
): EncounterState | null {
  const pokemon = state.battleCapturePokemon || state.alphaCapturePokemon
  const isAlpha = pokemon?.isAlpha === true
  const isVariant =
    !!pokemon && resolvePokemonRarity(pokemon) !== 'normal'
  if (
    state.status !== 'won' ||
    !state.isWildBattle ||
    state.isPvp ||
    state.chronicle ||
    state.alphaCaptureStartedAt ||
    state.battleCaptureStartedAt ||
    !pokemon ||
    (!isAlpha && (!config.allowVariantCatches || !isVariant)) ||
    !state.enemyTeam.some(
      (enemy) =>
        enemy.currentHp <= 0 &&
        enemy.speciesId === pokemon.speciesId &&
        enemy.formId === pokemon.formId &&
        (isAlpha
          ? enemy.isAlpha
          : resolvePokemonRarity(enemy) === resolvePokemonRarity(pokemon)),
    )
  ) {
    return null
  }
  const battleCaptureId = state.economyActionId || state.battleId
  const locationId = `battle-capture:${battleCaptureId}`
  const duration = isAlpha ? ALPHA_CAPTURE_SECONDS : STANDARD_CAPTURE_SECONDS
  const captureRate = isAlpha
    ? 0
    : Math.floor((getPokemonForm(pokemon.formId)?.capture_rate || 100) / 2)
  return {
    userId,
    locationId,
    pokemonId: pokemon.speciesId,
    formId: pokemon.formId,
    gender: pokemon.gender || undefined,
    isShiny: pokemon.shiny === true,
    rarity: pokemon.rarity || undefined,
    ...(isAlpha
      ? { alphaPokemon: structuredClone(pokemon) as AlphaCapturePokemon }
      : {}),
    battleCapturePokemon: structuredClone(pokemon),
    battleCaptureId,
    ...(isAlpha ? { alphaBattleId: battleCaptureId } : {}),
    background: pokemon.background || state.background,
    level: pokemon.level,
    startTime: now,
    expiry: now + duration * 1000,
    baseCatchRate: captureRate,
    currentCatchRate: captureRate,
    questionsAnswered: [],
    itemsUsed: [],
    weather: state.weather,
    locationSnapshot: {
      id: locationId,
      name: config.subCategory || config.name,
      description: isAlpha
        ? 'Capture the defeated Alpha Pokémon.'
        : 'Capture the defeated variant Pokémon.',
      category: config.category,
      subCategory: config.subCategory,
      icon: { type: 'pokemon', id: pokemon.formId },
      requirements: [],
      encounters: [
        { speciesId: pokemon.speciesId, formId: pokemon.formId, chance: 100 },
      ],
      rewards: [],
      background: pokemon.background || state.background,
      timer: duration,
      levelRange: { min: pokemon.level, max: pokemon.level },
      keyEncounter: isAlpha,
    },
  }
}
