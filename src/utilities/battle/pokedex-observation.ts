import type { BattlePokemon, BattleStance } from './types'

export type PokedexObservationMap = Record<string, Record<string, Record<string, unknown>>>

export function getObservedPreferredStance(
  pokedex: PokedexObservationMap | null | undefined,
  pokemon: Pick<BattlePokemon, 'speciesId' | 'formId'>,
): BattleStance | undefined {
  const entry = pokedex?.[String(pokemon.speciesId)]?.[String(pokemon.formId)]
  const stance = entry?.preferredBattleStance
  return stance === 'power' || stance === 'speed' || stance === 'tech' ? stance : undefined
}

export function applyObservedPreferredStance(
  pokedex: PokedexObservationMap | null | undefined,
  pokemon: Pick<BattlePokemon, 'speciesId' | 'formId'>,
  stance: BattleStance,
): { pokedex: PokedexObservationMap; updated: boolean } {
  const speciesId = String(pokemon.speciesId)
  const formId = String(pokemon.formId)
  const nextPokedex: PokedexObservationMap = { ...(pokedex || {}) }
  const speciesEntry = { ...(nextPokedex[speciesId] || {}) }
  const formEntry = {
    seen: true,
    caught: false,
    ...(speciesEntry[formId] || {}),
    preferredBattleStance: stance,
  }

  const updated = speciesEntry[formId]?.preferredBattleStance !== stance
  speciesEntry[formId] = formEntry
  nextPokedex[speciesId] = speciesEntry

  return { pokedex: nextPokedex, updated }
}
