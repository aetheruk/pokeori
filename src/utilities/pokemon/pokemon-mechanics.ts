import type { Pokemon } from '@/payload-types'
import { NATURES, NatureName } from '@/data/natures'
import pokemonData from '@/data/pokemon-data'
import type { PokemonData, PokemonStats as BasePokemonStats } from '@/data/pokemon-data'
import type { Payload } from 'payload'

export interface PokemonIVs {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

export interface PokemonStats {
  hp: number
  attack: number
  defense: number
  specialAttack: number
  specialDefense: number
  speed: number
}

export type PokemonSize = 'XS' | 'S' | 'L' | 'XL' | null

export interface GeneratedPokemonStats {
  ivs: PokemonIVs
  evs: PokemonIVs // Initial EVs are 0
  nature: string
  height: number
  weight: number
  size: PokemonSize
  messages: string[]
}

type StatName = 'hp' | 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed'

// Helper to get base stats from pokemon-data
function getBaseData(speciesId: number, formId: string) {
  const data = pokemonData as PokemonData
  const species = data.find((s) => s.id === speciesId)
  if (!species) throw new Error(`Species ${speciesId} not found`)

  const form = species.forms.find((f) => f.id === formId) || species.forms[0]
  if (!form) throw new Error(`Form ${formId} not found`)

  return form
}

// --- Core Logic Functions (operate on the object) ---

export function generatePokemonAttributes(baseHeight: number, baseWeight: number) {
  // Generate IVs
  const ivs = {
    hp: Math.floor(Math.random() * 32),
    attack: Math.floor(Math.random() * 32),
    defense: Math.floor(Math.random() * 32),
    specialAttack: Math.floor(Math.random() * 32),
    specialDefense: Math.floor(Math.random() * 32),
    speed: Math.floor(Math.random() * 32),
  }

  // Generate Nature
  const natureKeys = Object.keys(NATURES) as NatureName[]
  const nature = natureKeys[Math.floor(Math.random() * natureKeys.length)]

  // Generate Size
  // Variance between -0.20 and +0.20
  const heightVariance = Math.random() * 0.4 - 0.2
  const weightVariance = Math.random() * 0.4 - 0.2

  // Keep 1 decimal place
  const height = Math.round(baseHeight * (1 + heightVariance) * 10) / 10
  const weight = Math.round(baseWeight * (1 + weightVariance) * 10) / 10

  let size: 'XS' | 'S' | 'L' | 'XL' | null = null
  const messages: string[] = []

  // XL Logic: Both must be >= 0.15 (+15%)
  if (heightVariance >= 0.15 && weightVariance >= 0.15) {
    size = 'XL'
    messages.push('This pokemon is massive')
  }
  // XS Logic: Both must be <= -0.15 (-15%)
  else if (heightVariance <= -0.15 && weightVariance <= -0.15) {
    size = 'XS'
    messages.push('This pokemon is Tiny')
  }
  // L Logic: Both must be >= 0.1 (+10%)
  else if (heightVariance >= 0.1 && weightVariance >= 0.1) {
    size = 'L'
    messages.push('This pokemon looks bigger than usual')
  }
  // S Logic: Both must be <= -0.1 (-10%)
  else if (heightVariance <= -0.1 && weightVariance <= -0.1) {
    size = 'S'
    messages.push('This Pokemon seems smaller than usual')
  }

  // IV Messages
  if (ivs.hp === 31) messages.push('It looks incredibly robust')
  if (ivs.attack === 31) messages.push('It seems incredibly powerful')
  if (ivs.defense === 31) messages.push('It looks incredibly sturdy')
  if (ivs.specialAttack === 31) messages.push('It looks incredibly gifted')
  if (ivs.specialDefense === 31) messages.push('It looks incredibly disciplined')
  if (ivs.speed === 31) messages.push('It looks incredibly quick')

  return { ivs, nature, height, weight, size, messages }
}

export function generatePokemonStats(
  baseHeight: number,
  baseWeight: number,
): GeneratedPokemonStats {
  const { ivs, nature, height, weight, size, messages } = generatePokemonAttributes(
    baseHeight,
    baseWeight,
  )

  // Initial EVs are 0
  const evs: PokemonIVs = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  }

  return {
    ivs,
    evs,
    nature,
    height,
    weight,
    size,
    messages,
  }
}

export function rollIVs(pokemon: Pokemon): Pokemon {
  const newIVs = {
    hp: Math.floor(Math.random() * 32),
    attack: Math.floor(Math.random() * 32),
    defense: Math.floor(Math.random() * 32),
    specialAttack: Math.floor(Math.random() * 32),
    specialDefense: Math.floor(Math.random() * 32),
    speed: Math.floor(Math.random() * 32),
  }

  return {
    ...pokemon,
    ivs: newIVs,
  }
}

export function computeStats(
  baseStats: BasePokemonStats,
  ivs: PokemonIVs,
  evs: PokemonIVs,
  level: number,
  nature: string,
): PokemonStats {
  // Basic stat calculation formula (Gen 3+)
  // HP = ((2 * Base + IV + (EV/4)) * Level / 100) + Level + 10
  // Other = (((2 * Base + IV + (EV/4)) * Level / 100) + 5) * Nature

  // Nature multipliers
  const natureMultipliers: Record<
    string,
    { up: keyof PokemonStats; down: keyof PokemonStats } | null
  > = {
    Adamant: { up: 'attack', down: 'specialAttack' },
    Bashful: null,
    Bold: { up: 'defense', down: 'attack' },
    Brave: { up: 'attack', down: 'speed' },
    Calm: { up: 'specialDefense', down: 'attack' },
    Careful: { up: 'specialDefense', down: 'specialAttack' },
    Docile: null,
    Gentle: { up: 'specialDefense', down: 'defense' },
    Hardy: null,
    Hasty: { up: 'speed', down: 'defense' },
    Impish: { up: 'defense', down: 'specialAttack' },
    Jolly: { up: 'speed', down: 'specialAttack' },
    Lax: { up: 'defense', down: 'specialDefense' },
    Lonely: { up: 'attack', down: 'defense' },
    Mild: { up: 'specialAttack', down: 'defense' },
    Modest: { up: 'specialAttack', down: 'attack' },
    Naive: { up: 'speed', down: 'specialDefense' },
    Naughty: { up: 'attack', down: 'specialDefense' },
    Quiet: { up: 'specialAttack', down: 'speed' },
    Quirky: null,
    Rash: { up: 'specialAttack', down: 'specialDefense' },
    Relaxed: { up: 'defense', down: 'speed' },
    Sassy: { up: 'specialDefense', down: 'speed' },
    Serious: null,
    Timid: { up: 'speed', down: 'attack' },
  }

  const getMultiplier = (stat: keyof PokemonStats): number => {
    const mod = natureMultipliers[nature]
    if (!mod) return 1.0
    if (mod.up === stat) return 1.1
    if (mod.down === stat) return 0.9
    return 1.0
  }

  const stats: PokemonStats = {
    hp: 0,
    attack: 0,
    defense: 0,
    specialAttack: 0,
    specialDefense: 0,
    speed: 0,
  }

  // HP
  stats.hp =
    Math.floor(((2 * baseStats.hp + ivs.hp + Math.floor(evs.hp / 4)) * level) / 100) + level + 10

  // Others
  const otherStats: (keyof PokemonStats)[] = [
    'attack',
    'defense',
    'specialAttack',
    'specialDefense',
    'speed',
  ]

  // Map base stats keys (which might be 'special-attack' in data) to our keys
  const baseStatMap: Record<string, number> = {
    attack: baseStats.attack,
    defense: baseStats.defense,
    specialAttack: baseStats['special-attack'],
    specialDefense: baseStats['special-defense'],
    speed: baseStats.speed,
  }

  otherStats.forEach((stat) => {
    const base = baseStatMap[stat]
    const iv = ivs[stat]
    const ev = evs[stat]
    const raw = Math.floor(((2 * base + iv + Math.floor(ev / 4)) * level) / 100) + 5
    stats[stat] = Math.floor(raw * getMultiplier(stat))
  })

  return stats
}

export function calculateStats(pokemon: Pokemon): Pokemon {
  const baseData = getBaseData(pokemon.speciesId, pokemon.formId)
  const baseStats = baseData.stats
  const level = pokemon.level || 1
  const nature = pokemon.nature || 'Hardy'

  // Prepare IVs with defaults
  const ivs: PokemonIVs = {
    hp: pokemon.ivs?.hp ?? 0,
    attack: pokemon.ivs?.attack ?? 0,
    defense: pokemon.ivs?.defense ?? 0,
    specialAttack: pokemon.ivs?.specialAttack ?? 0,
    specialDefense: pokemon.ivs?.specialDefense ?? 0,
    speed: pokemon.ivs?.speed ?? 0,
  }

  // Prepare EVs with defaults
  const evs: PokemonIVs = {
    hp: pokemon.evs?.hp ?? 0,
    attack: pokemon.evs?.attack ?? 0,
    defense: pokemon.evs?.defense ?? 0,
    specialAttack: pokemon.evs?.specialAttack ?? 0,
    specialDefense: pokemon.evs?.specialDefense ?? 0,
    speed: pokemon.evs?.speed ?? 0,
  }

  const newStats = computeStats(baseStats, ivs, evs, level, nature)

  return {
    ...pokemon,
    stats: newStats,
  }
}

// --- Action Functions (Database Operations) ---

export async function identifyPokemon(
  payload: Payload,
  pokemonId: string,
  userLevel: number,
): Promise<Pokemon> {
  // 1. Fetch Pokemon
  const pokemon = await payload.findByID({
    collection: 'pokemon',
    id: pokemonId,
  })

  if (!pokemon) throw new Error('Pokemon not found')
  if (pokemon.identified) return pokemon // Already identified

  // 2. Determine Level (+/- 3 of user level, min 3, max 50)
  const minLevel = Math.max(3, userLevel - 3)
  const maxLevel = Math.min(50, userLevel + 3)
  const level = Math.floor(Math.random() * (maxLevel - minLevel + 1)) + minLevel

  // 3. Determine Nature, Height, Weight, Size, and IVs
  const baseData = getBaseData(pokemon.speciesId, pokemon.formId)
  const { ivs, nature, height, weight, size } = generatePokemonAttributes(
    baseData.height,
    baseData.weight,
  )

  // 4. Update Object
  let updatedPokemon: Pokemon = {
    ...pokemon,
    identified: true,
    level,
    nature,
    height,
    weight,
    size,
    ivs,
  }

  // 5. Calculate Stats (requires IVs and Level to be set)
  updatedPokemon = calculateStats(updatedPokemon)

  // 7. Save
  const result = await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      identified: true,
      level: updatedPokemon.level,
      nature: updatedPokemon.nature,
      ivs: updatedPokemon.ivs,
      stats: updatedPokemon.stats,
      height: updatedPokemon.height,
      weight: updatedPokemon.weight,
      size: updatedPokemon.size,
    },
  })

  return result
}

export async function increaseEV(
  payload: Payload,
  pokemonId: string,
  stat: StatName,
  amount: number,
): Promise<Pokemon> {
  const pokemon = await payload.findByID({ collection: 'pokemon', id: pokemonId })
  if (!pokemon) throw new Error('Pokemon not found')

  const currentVal = pokemon.evs?.[stat] ?? 0
  const newVal = Math.min(255, currentVal + amount)

  if (newVal === currentVal) return pokemon

  let updatedPokemon: Pokemon = {
    ...pokemon,
    evs: {
      ...pokemon.evs,
      [stat]: newVal,
    },
  }

  updatedPokemon = calculateStats(updatedPokemon)

  return await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      evs: updatedPokemon.evs,
      stats: updatedPokemon.stats,
    },
  })
}

export async function decreaseEV(
  payload: Payload,
  pokemonId: string,
  stat: StatName,
  amount: number,
): Promise<Pokemon> {
  const pokemon = await payload.findByID({ collection: 'pokemon', id: pokemonId })
  if (!pokemon) throw new Error('Pokemon not found')

  const currentVal = pokemon.evs?.[stat] ?? 0
  const newVal = Math.max(0, currentVal - amount)

  if (newVal === currentVal) return pokemon

  let updatedPokemon: Pokemon = {
    ...pokemon,
    evs: {
      ...pokemon.evs,
      [stat]: newVal,
    },
  }

  updatedPokemon = calculateStats(updatedPokemon)

  return await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      evs: updatedPokemon.evs,
      stats: updatedPokemon.stats,
    },
  })
}

export async function increaseIV(
  payload: Payload,
  pokemonId: string,
  stat: StatName,
  amount: number,
): Promise<Pokemon> {
  const pokemon = await payload.findByID({ collection: 'pokemon', id: pokemonId })
  if (!pokemon) throw new Error('Pokemon not found')

  const currentVal = pokemon.ivs?.[stat] ?? 0
  const newVal = Math.min(31, currentVal + amount) // Max 31 for IVs

  if (newVal === currentVal) return pokemon

  let updatedPokemon: Pokemon = {
    ...pokemon,
    ivs: {
      ...pokemon.ivs,
      [stat]: newVal,
    },
  }

  updatedPokemon = calculateStats(updatedPokemon)

  return await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      ivs: updatedPokemon.ivs,
      stats: updatedPokemon.stats,
    },
  })
}

export async function decreaseIV(
  payload: Payload,
  pokemonId: string,
  stat: StatName,
  amount: number,
): Promise<Pokemon> {
  const pokemon = await payload.findByID({ collection: 'pokemon', id: pokemonId })
  if (!pokemon) throw new Error('Pokemon not found')

  const currentVal = pokemon.ivs?.[stat] ?? 0
  const newVal = Math.max(0, currentVal - amount)

  if (newVal === currentVal) return pokemon

  let updatedPokemon: Pokemon = {
    ...pokemon,
    ivs: {
      ...pokemon.ivs,
      [stat]: newVal,
    },
  }

  updatedPokemon = calculateStats(updatedPokemon)

  return await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      ivs: updatedPokemon.ivs,
      stats: updatedPokemon.stats,
    },
  })
}

export async function levelUp(
  payload: Payload,
  pokemonId: string,
  levels: number = 1,
): Promise<Pokemon> {
  const pokemon = await payload.findByID({ collection: 'pokemon', id: pokemonId })
  if (!pokemon) throw new Error('Pokemon not found')

  const currentLevel = pokemon.level || 1
  const newLevel = Math.min(100, currentLevel + levels)

  if (newLevel === currentLevel) return pokemon

  let updatedPokemon: Pokemon = {
    ...pokemon,
    level: newLevel,
  }

  updatedPokemon = calculateStats(updatedPokemon)

  return await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      level: updatedPokemon.level,
      stats: updatedPokemon.stats,
    },
  })
}

export async function changeNature(
  payload: Payload,
  pokemonId: string,
  newNature: NatureName,
): Promise<Pokemon> {
  const pokemon = await payload.findByID({ collection: 'pokemon', id: pokemonId })
  if (!pokemon) throw new Error('Pokemon not found')

  if (!NATURES[newNature]) throw new Error(`Invalid nature: ${newNature}`)

  if (pokemon.nature === newNature) return pokemon

  let updatedPokemon: Pokemon = {
    ...pokemon,
    nature: newNature,
  }

  updatedPokemon = calculateStats(updatedPokemon)

  return await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      nature: updatedPokemon.nature,
      stats: updatedPokemon.stats,
    },
  })
}

export async function renamePokemon(
  payload: Payload,
  pokemonId: string,
  newName: string,
): Promise<Pokemon> {
  const pokemon = await payload.findByID({ collection: 'pokemon', id: pokemonId })
  if (!pokemon) throw new Error('Pokemon not found')

  // Sanitize input: trim whitespace
  const sanitizedName = newName.trim()

  // Validate input: only letters allowed
  if (!/^[a-zA-Z]+$/.test(sanitizedName)) {
    throw new Error('Nickname must contain only letters')
  }

  // Validate length (e.g., 1-12 characters)
  if (sanitizedName.length < 1 || sanitizedName.length > 12) {
    throw new Error('Nickname must be between 1 and 12 characters')
  }

  return await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      name: sanitizedName,
    },
  })
}

export async function increaseFriendship(
  payload: Payload,
  pokemonId: string,
  amount: number,
): Promise<Pokemon> {
  const pokemon = await payload.findByID({ collection: 'pokemon', id: pokemonId })
  if (!pokemon) throw new Error('Pokemon not found')

  const currentFriendship = pokemon.friendship || 0
  const newFriendship = Math.min(255, currentFriendship + amount)

  if (newFriendship === currentFriendship) return pokemon

  return await payload.update({
    collection: 'pokemon',
    id: pokemonId,
    data: {
      friendship: newFriendship,
    },
  })
}
