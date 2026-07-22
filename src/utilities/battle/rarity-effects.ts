import type { StatusEffectId } from '@/data/moves/types'
import { resolvePokemonRarity } from '@/utilities/pokemon/rarity-effects'
import { applyStatus } from './status-effects-logic'
import type { BattlePokemon } from './types'

const BATTLE_TYPES = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
] as const

const RETRO_STATS = [
  'attack',
  'defense',
  'specialAttack',
  'specialDefense',
  'speed',
] as const

type RarityRandom = () => number

function formatType(type: string) {
  return `${type[0]?.toUpperCase() ?? ''}${type.slice(1)}`
}

function formatStat(stat: (typeof RETRO_STATS)[number]) {
  return {
    attack: 'Attack',
    defense: 'Defense',
    specialAttack: 'Sp. Atk',
    specialDefense: 'Sp. Def',
    speed: 'Speed',
  }[stat]
}

function addType(types: string[], type: string) {
  return types.some((entry) => entry.toLowerCase() === type)
    ? types
    : [...types, type]
}

function getEligibleExtraTypes(types: string[], previous?: string) {
  const current = new Set(types.map((type) => type.toLowerCase()))
  return BATTLE_TYPES.filter(
    (type) => !current.has(type) && type !== previous,
  )
}

function chooseType(types: string[], random: RarityRandom, previous?: string) {
  const eligible = getEligibleExtraTypes(types, previous)
  if (!eligible.length) return undefined
  return eligible[Math.min(eligible.length - 1, Math.floor(random() * eligible.length))]
}

function getRarityAddedType(rarity: ReturnType<typeof resolvePokemonRarity>) {
  if (rarity === 'levin') return 'electric'
  if (rarity === 'inferno') return 'fire'
  if (rarity === 'ancient') return 'rock'
  if (rarity === 'toxic') return 'poison'
  return undefined
}

function getRarityBattleState(pokemon: BattlePokemon) {
  if (!pokemon.rarityBattleState) pokemon.rarityBattleState = {}
  return pokemon.rarityBattleState
}

function applyRarityTypes(pokemon: BattlePokemon, random: RarityRandom) {
  const rarity = resolvePokemonRarity(pokemon)
  const state = getRarityBattleState(pokemon)
  const baseTypes = state.baseTypes ?? [...pokemon.types]
  state.baseTypes = [...baseTypes]

  let types = [...baseTypes]
  if (rarity === 'white') types = ['normal']
  if (rarity === 'black') types = ['dark']

  const addedType = getRarityAddedType(rarity)
  if (addedType) types = addType(types, addedType)

  if (rarity === 'prism' || rarity === 'rainbow') {
    state.extraType ??= chooseType(types, random)
    if (state.extraType) types = addType(types, state.extraType)
  }

  pokemon.types = types
}

function forceRarityStatus(
  pokemon: BattlePokemon,
  statusId: StatusEffectId,
): string | undefined {
  const result = applyStatus(pokemon, statusId, undefined, { force: true })
  return result.applied ? result.message : undefined
}

/** Applies one-time effects when a Pokemon first becomes active. */
export function applyBattleRarityEntryEffects(
  pokemon: BattlePokemon | undefined,
  random: RarityRandom = Math.random,
): string[] {
  if (!pokemon || pokemon.rarityBattleState?.entryApplied) return []

  const rarity = resolvePokemonRarity(pokemon)
  const state = getRarityBattleState(pokemon)
  state.entryApplied = true
  applyRarityTypes(pokemon, random)
  const addedType = getRarityAddedType(rarity)
  const messages: string[] = []

  pokemon.statStages ??= {
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
    crit: 0,
    accuracy: 0,
    evasion: 0,
  }

  if (rarity === 'crystal') {
    pokemon.statStages.attack = Math.min(6, pokemon.statStages.attack + 2)
    pokemon.statStages.specialAttack = Math.min(6, pokemon.statStages.specialAttack + 2)
    pokemon.statStages.defense = Math.max(-6, pokemon.statStages.defense - 2)
    pokemon.statStages.specialDefense = Math.max(-6, pokemon.statStages.specialDefense - 2)
    messages.push(`${pokemon.name} sharpened its offense!`)
  }

  if (rarity === 'retro') {
    const boostIndex = Math.floor(random() * RETRO_STATS.length)
    const boosted = RETRO_STATS[boostIndex]
    const remaining = RETRO_STATS.filter((stat) => stat !== boosted)
    const lowered = remaining[Math.floor(random() * remaining.length)]
    pokemon.statStages[boosted] = Math.min(6, pokemon.statStages[boosted] + 3)
    pokemon.statStages[lowered] = Math.max(-6, pokemon.statStages[lowered] - 3)
    messages.push(
      `${pokemon.name} raised ${formatStat(boosted)} and lowered ${formatStat(lowered)}!`,
    )
  }

  if (rarity === 'pixelated') {
    pokemon.statStages.evasion = Math.min(6, pokemon.statStages.evasion + 1)
    messages.push(`${pokemon.name}'s Evasion rose!`)
  }

  const entryStatus =
    rarity === 'emerald' || rarity === 'ruby' || rarity === 'sapphire'
      ? 'shield'
      : rarity === 'celestial'
        ? 'regen'
        : rarity === 'galactic'
          ? 'mystic-veil'
          : undefined
  if (entryStatus) {
    const message = forceRarityStatus(pokemon, entryStatus)
    if (message) messages.push(message)
  }

  if (state.extraType) {
    messages.push(
      `${pokemon.name} added ${formatType(state.extraType)} Type!`,
    )
  } else if (rarity === 'white' || rarity === 'black') {
    messages.push(`${pokemon.name} became ${formatType(pokemon.types[0])} Type!`)
  } else if (addedType) {
    messages.push(`${pokemon.name} added ${formatType(addedType)} Type!`)
  }

  return messages
}

/** Reapplies persistent rarity type changes after a battle form change. */
export function refreshBattleRarityTypes(
  pokemon: BattlePokemon,
  random: RarityRandom = Math.random,
) {
  if (!pokemon.rarityBattleState?.entryApplied) return
  pokemon.rarityBattleState.baseTypes = [...pokemon.types]
  applyRarityTypes(pokemon, random)
}

/** Runs at active-turn end for Rainbow and Glitch Pokemon. */
export function processBattleRarityTurnEnd(
  pokemon: BattlePokemon | undefined,
  random: RarityRandom = Math.random,
): string[] {
  if (!pokemon?.rarityBattleState?.entryApplied || pokemon.currentHp <= 0) return []
  const rarity = resolvePokemonRarity(pokemon)
  const messages: string[] = []

  if (rarity === 'rainbow') {
    const state = pokemon.rarityBattleState
    const previous = state.extraType
    const baseTypes = state.baseTypes ?? pokemon.types.filter((type) => type !== previous)
    const next = chooseType(baseTypes, random, previous)
    if (next) {
      state.extraType = next
      applyRarityTypes(pokemon, random)
      messages.push(`${pokemon.name}'s extra type changed to ${formatType(next)}!`)
    }
  }

  if (rarity === 'glitch') {
    const values = RETRO_STATS.map((stat) => pokemon.stats[stat])
    for (let index = values.length - 1; index > 0; index -= 1) {
      const other = Math.floor(random() * (index + 1))
      ;[values[index], values[other]] = [values[other], values[index]]
    }
    RETRO_STATS.forEach((stat, index) => {
      pokemon.stats[stat] = values[index]
    })
    messages.push(`${pokemon.name}'s stats shuffled!`)
  }

  return messages
}

/** Resolves rarity riders after an attack has been committed, even if it misses. */
export function processBattleRarityAttackAttempt(params: {
  attacker: BattlePokemon | undefined
  defender: BattlePokemon | undefined
  random?: RarityRandom
}): string[] {
  const { attacker, defender, random = Math.random } = params
  if (!attacker || attacker.currentHp <= 0) return []
  const rarity = resolvePokemonRarity(attacker)
  const messages: string[] = []

  const rider =
    rarity === 'levin'
      ? ('paralysis' as const)
      : rarity === 'inferno'
        ? ('burn' as const)
        : rarity === 'toxic'
          ? ('poison' as const)
          : undefined
  if (rider && defender && defender.currentHp > 0 && random() < 0.2) {
    const result = applyStatus(defender, rider, undefined, { sourcePokemon: attacker })
    if (result.applied) messages.push(result.message)
  }

  if (rarity === 'void' && random() < 0.05) {
    const message = forceRarityStatus(attacker, 'vanished')
    if (message) messages.push(message)
  }

  return messages
}
