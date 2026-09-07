import { expect, test } from 'bun:test'
import type { Pokemon } from '@/payload-types'
import type { PokemonCriteria, TaskCondition } from '@/data/tasks'
import { EXPLORE_POKEMON_SELECT } from '@/utilities/game-data-scopes'
import { getRequirementProgress, isPokemonEligible, type RequirementData } from '@/utilities/requirements'
import { getOwnedPokemonGender } from '@/utilities/pokemon/gender'

const stats = { hp: 30, attack: 20, defense: 25, specialAttack: 35, specialDefense: 40, speed: 15 }
const source = { id: 'owned', speciesId: 1, formId: '1', name: 'Leaf', level: 12, nature: 'modest', ballType: 'friend-ball', size: 'L',
  obtainedRegion: 'Kanto', obtainedLocation: 'Pallet Town', obtainedSourceId: 'pallet-starter', partner: true, identified: true,
  shiny: false, isShadow: false, isRadiant: false, rarity: 'normal', stats, ivs: stats, evs: stats,
  locked: true, onBattleTeam: true, battleTeamPosition: 2, isCompanion: true, gender: 'female',
  markingSquare: true, markingCircle: false, markingTriangle: true, markingDiamond: false,
} as unknown as Pokemon
function project(value: Pokemon): Pokemon {
  return Object.fromEntries(Object.keys(EXPLORE_POKEMON_SELECT).filter((key) => key in value).map((key) => [key, value[key as keyof Pokemon]])) as unknown as Pokemon
}

test('Explore projections preserve every Pokemon eligibility criterion and explicit false/legacy rarity values', () => {
  const criteria: PokemonCriteria[] = [
    { speciesId: 1 }, { speciesId: 2 }, { region: ['kanto', 'johto'] }, { region: 'johto' }, { location: 'PALLET TOWN' }, { location: 'Viridian City' },
    { locationId: 'pallet-starter' }, { locationId: 'route-1' }, { ballType: 'friend-ball' }, { ballType: 'poke-ball' },
    { minLevel: 10 }, { minLevel: 20 }, { maxLevel: 20 }, { maxLevel: 10 }, { size: 'L' }, { size: 'S' },
    { nature: 'Modest' }, { nature: 'adamant' }, { shiny: true }, { shiny: false }, { isShadow: true }, { isShadow: false },
    { isRadiant: true }, { isRadiant: false }, { identified: true }, { identified: false }, { partner: true }, { partner: false },
    { formId: '1' }, { formId: '2' }, { type: 'Grass' }, { type: 'Fire' }, { rarity: 'normal' }, { rarity: 'shadow' }, { rarity: 'radiant' }, { rarity: 'shiny' },
    { stats: { hp: 25 } }, { stats: { hp: 40 } }, { ivs: { attack: 15 } }, { ivs: { attack: 30 } }, { evs: { speed: 10 } }, { evs: { speed: 20 } },
  ]
  for (const pokemon of [source, { ...source, rarity: undefined, isShadow: true }, { ...source, rarity: undefined, isRadiant: true },
    { ...source, rarity: undefined, shiny: true }, { ...source, partner: false, identified: false }]) {
    for (const criterion of criteria) expect(isPokemonEligible(project(pokemon), criterion)).toBe(isPokemonEligible(pokemon, criterion))
    expect(project(pokemon).stats).toEqual(pokemon.stats)
    expect(project(pokemon).ivs).toEqual(pokemon.ivs)
    expect(project(pokemon).evs).toEqual(pokemon.evs)
  }
})

test('Explore team, companion and consumable selection semantics survive projection', () => {
  const conditions: TaskCondition[] = [
    { type: 'pokemon_owned', count: 1, pokemonCriteria: { partner: true, region: 'kanto', identified: true } },
    { type: 'battle_team', battleTeamCheck: { position: 2, speciesId: 1, locationId: 'pallet-starter' } },
    { type: 'battle_team', battleTeamCheck: { position: 1, speciesId: 1 } },
    { type: 'companion', companionCheck: { partner: true, nature: 'modest' } },
  ]
  const data = { user: { id: 'owner' }, inventory: [], pokemon: [source], tcg: [], pokedex: [], completedTasks: [], battleResults: [], locationEncounterResults: [] } as unknown as RequirementData
  for (const condition of conditions) expect(getRequirementProgress({ ...data, pokemon: [project(source)] }, condition)).toEqual(getRequirementProgress(data, condition))
  expect(project(source).locked).toBe(true)
})

test('Explore selection cards retain female sprites and player markings', () => {
  const projected = project(source)
  expect(getOwnedPokemonGender(projected)).toBe('female')
  for (const key of ['markingSquare', 'markingCircle', 'markingTriangle', 'markingDiamond'] as const) expect(projected[key]).toBe(source[key])
})
