import type { TaskIcon } from '@/data/tasks'
import { trainerSprites } from '@/data/trainers'
import pokemonIconCatalog from './pokemon-icon-catalog.json'

export type IconSource =
  | { type: 'pokemon'; id: string; speciesId: number }
  | { type: 'trainer'; id: string }
  | { type: 'other'; id: string }

export interface IconConfig {
  id: string
  name: string
  icon: TaskIcon
  /** Stable link to the game entity represented by this reusable icon. */
  source: IconSource
}

interface PokemonIconCatalogEntry {
  formId: string
  speciesId: number
  name: string
}

const pokemonForms = pokemonIconCatalog as PokemonIconCatalogEntry[]
const pokemonFormsById = new Map(pokemonForms.map((form) => [form.formId, form]))

function pokemonIcon(form: PokemonIconCatalogEntry, id = `pokemon-${form.formId}`): IconConfig {
  return {
    id,
    name: form.name,
    icon: { type: 'pokemon', id: form.formId },
    source: { type: 'pokemon', id: form.formId, speciesId: form.speciesId },
  }
}

const pokemonIcons = pokemonForms.map((form) => pokemonIcon(form))

// Keep previously saved profile/reward IDs stable. New entries use
// `pokemon-${formId}` and are generated from the Pokémon data catalog.
const legacyPokemonIconIds: Record<string, string> = {
  ditto: '132',
  raticate: '20',
  metapod: '11',
  jigglypuff: '39',
  'alolan-meowth': '10107',
  charmander: '4',
  squirtle: '7',
  bulbasaur: '1',
  rotom: '479',
  tauros: '128',
  nidoking: '34',
  nidoqueen: '31',
  chikorita: '152',
  cyndaquil: '155',
  totodile: '158',
  treecko: '252',
  torchic: '255',
  mudkip: '258',
  turtwig: '387',
  chimchar: '390',
  piplup: '393',
  snivy: '495',
  tepig: '498',
  oshawott: '501',
  chespin: '650',
  fennekin: '653',
  froakie: '656',
  rowlet: '722',
  litten: '725',
  popplio: '728',
  grookey: '810',
  scorbunny: '813',
  sobble: '816',
  sprigatito: '906',
  fuecoco: '909',
  quaxly: '912',
}

const legacyPokemonIcons = Object.entries(legacyPokemonIconIds).flatMap(
  ([legacyId, formId]) => {
    const form = pokemonFormsById.get(formId)
    return form ? [pokemonIcon(form, legacyId)] : []
  },
)

const trainerNameOverrides: Record<string, string> = {
  'trainer-gb-red': 'Red (Red)',
  'trainer-gb-blue': 'Blue (Red)',
  'trainer-gb-red-2': 'Red (Blue)',
  'trainer-gb-blue-2': 'Blue (Blue)',
}

const trainerIcons: IconConfig[] = trainerSprites.map((trainer) => ({
  id: `trainer-${trainer.id}`,
  name: trainerNameOverrides[`trainer-${trainer.id}`] || trainer.name,
  icon: { type: 'trainer', id: trainer.id },
  source: { type: 'trainer', id: trainer.id },
}))

// These IDs were used by prior rewards and saved profile selections. They are
// aliases for canonical trainer records, rather than independent sprite data.
const legacyTrainerAliases: Array<{
  id: string
  name: string
  trainerId: string
}> = [
  { id: 'brock', name: 'Brock', trainerId: 'gym-kanto-brock' },
  { id: 'misty', name: 'Misty', trainerId: 'gym-kanto-misty' },
  { id: 'lt-surge', name: 'Lt. Surge', trainerId: 'gym-kanto-ltsurge' },
  { id: 'koga', name: 'Koga', trainerId: 'gym-kanto-koga' },
  { id: 'rocket-m', name: 'Team Rocket Grunt', trainerId: 'rocket-grunt-m' },
  { id: 'rocket-f', name: 'Team Rocket Grunt', trainerId: 'rocket-grunt-f' },
  { id: 'sailor', name: 'Sailor', trainerId: 'sailor' },
  { id: 'hiker', name: 'Hiker', trainerId: 'hiker' },
  { id: 'cyclist', name: 'Cyclist', trainerId: 'cyclist-m' },
  { id: 'cyclist-f', name: 'Cyclist', trainerId: 'cyclist-f' },
  { id: 'bird-keeper', name: 'Birdkeeper', trainerId: 'bird-keeper' },
  { id: 'gambler', name: 'Gambler', trainerId: 'gamer' },
]

const trainerIds = new Set(trainerSprites.map((trainer) => trainer.id))
const legacyTrainerIcons: IconConfig[] = legacyTrainerAliases.flatMap(
  ({ id, name, trainerId }) =>
    trainerIds.has(trainerId)
      ? [
          {
            id,
            name,
            icon: { type: 'trainer', id: trainerId },
            source: { type: 'trainer', id: trainerId },
          },
        ]
      : [],
)

const otherIcons: IconConfig[] = [
  {
    id: 'nugget',
    name: 'Nugget',
    icon: { type: 'item', id: 'nugget' },
    source: { type: 'other', id: 'nugget' },
  },
  {
    id: 'safari-ball',
    name: 'Safari Ball',
    icon: { type: 'item', id: 'safari-ball' },
    source: { type: 'other', id: 'safari-ball' },
  },
]

const registry = new Map<string, IconConfig>()
for (const icon of [
  ...pokemonIcons,
  ...trainerIcons,
  ...legacyPokemonIcons,
  ...legacyTrainerIcons,
  ...otherIcons,
]) {
  if (!registry.has(icon.id)) registry.set(icon.id, icon)
}

export const icons = [...registry.values()]

const sourceRegistry = new Map<string, IconConfig[]>()
for (const icon of icons) {
  const sourceKey = `${icon.source.type}:${icon.source.id}`
  const sourceIcons = sourceRegistry.get(sourceKey) || []
  sourceIcons.push(icon)
  sourceRegistry.set(sourceKey, sourceIcons)
}

export function getIcon(id: string): IconConfig | undefined {
  return registry.get(id)
}

/** Returns the canonical icon registered for a Pokémon, trainer, or other source. */
export function getIconForSource(
  source: Pick<IconSource, 'type' | 'id'>,
): IconConfig | undefined {
  return sourceRegistry.get(`${source.type}:${source.id}`)?.[0]
}

/** Includes legacy profile/reward aliases that resolve to the same source. */
export function getIconsForSource(
  source: Pick<IconSource, 'type' | 'id'>,
): IconConfig[] {
  return sourceRegistry.get(`${source.type}:${source.id}`) || []
}
