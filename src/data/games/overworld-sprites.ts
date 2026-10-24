import pokemonSprites from '@/data/pokemon-overworld-sprite-manifest.json'
import pokemonFollowerAssets from '@/data/pokemon-overworld-follower-assets.json'
import { getIcon } from '@/data/user/icons'
import { getTrainerSprite, trainerClassById } from '@/data/trainers/classes'

export interface OverworldSpriteSheet {
  id: string
  src: string
  frameWidth: number
  frameHeight: number
  columns: number
  rows: number
  directionRows: { down: number; left: number; right: number; up: number }
}

const directions = { down: 0, left: 1, right: 2, up: 3 } as const

export function getPokemonFollowerSpriteId(
  filenameStem: string,
  palette: 'normal' | 'shiny' = 'normal',
) {
  const candidate = `pokemon-follower-${palette}:${filenameStem}`
  return Object.hasOwn(pokemonFollowerAssets, candidate) ? candidate : undefined
}

const trainerSpritePaths: Record<string, string> = {
  'trainer-ace-trainer-f': 'trainer_ACETRAINER_F.png',
  'trainer-ace-trainer-m': 'trainer_ACETRAINER_M.png',
  'trainer-aroma-lady': 'trainer_AROMALADY.png',
  'trainer-biker': 'trainer_BIKER2.png',
  'trainer-bird-keeper': 'trainer_BIRDKEEPER.png',
  'trainer-breeder': 'trainer_BREEDER.png',
  'trainer-bug-catcher': 'trainer_BUGCATCHER.png',
  'trainer-burglar': 'trainer_BURGLAR.png',
  'trainer-crush-girl': 'trainer_CRUSHGIRL.png',
  'trainer-engineer': 'trainer_ENGINEER.png',
  'trainer-juggler': 'trainer_JUGGLER.png',
  'trainer-lady': 'trainer_LADY.png',
  'trainer-lass': 'trainer_LASS.png',
  'trainer-painter': 'trainer_PAINTER.png',
  'trainer-pokemaniac': 'trainer_POKEMANIAC.png',
  'trainer-psychic-f': 'trainer_PSYCHIC_F.png',
  'trainer-psychic-m': 'trainer_PSYCHIC_M.png',
  'trainer-ranger-f': 'trainer_RANGER_F.png',
  'trainer-ranger-m': 'trainer_RANGER_M.png',
  'trainer-rocker': 'trainer_ROCKER.png',
  'trainer-roughneck': 'trainer_ROUGHNECK.png',
  'trainer-roughneck-2v1': 'trainer_ROUGHNECK2v1.png',
  'trainer-roughneck-v1': 'trainer_ROUGHNECKv1.png',
  'trainer-roughneck-v1a': 'trainer_ROUGHNECKv1a.png',
  'trainer-ruin-maniac': 'trainer_RUINMANIAC.png',
  'trainer-scientist': 'trainer_SCIENTIST.png',
  'trainer-super-nerd': 'trainer_SUPERNERD.png',
  'trainer-tamer': 'trainer_TAMER.png',
  'trainer-twins': 'trainer_TWINS.png',
  'trainer-young-couple-f': 'trainer_YOUNGCOUPLE_F.png',
  'trainer-young-couple-m': 'trainer_YOUNGCOUPLE_M.png',
}

export function getTrainerOverworldSpriteId(trainerClassId: string | undefined) {
  return trainerClassId
    ? trainerClassById[trainerClassId as keyof typeof trainerClassById]
        ?.overworldSpriteId
    : undefined
}

export function getOverworldSpriteSheet(
  spriteId: string,
  options: { shiny?: boolean; female?: boolean } = {},
): OverworldSpriteSheet | null {
  const followerAsset = (pokemonFollowerAssets as Record<
    string,
    { src: string; palette: 'normal' | 'shiny' }
  >)[spriteId]
  if (followerAsset) {
    return {
      id: spriteId,
      src: followerAsset.src,
      frameWidth: 64,
      frameHeight: 64,
      columns: 4,
      rows: 4,
      directionRows: directions,
    }
  }

  const pokemon = (pokemonSprites as Record<
    string,
    { normal: string; shiny?: string; female?: string; shinyFemale?: string }
  >)[spriteId]
  if (pokemon) {
    const src = options.shiny && options.female
      ? pokemon.shinyFemale || pokemon.shiny || pokemon.female || pokemon.normal
      : options.shiny
        ? pokemon.shiny || pokemon.normal
        : options.female
          ? pokemon.female || pokemon.normal
          : pokemon.normal
    return {
      id: spriteId,
      src,
      frameWidth: 64,
      frameHeight: 64,
      columns: 4,
      rows: 4,
      directionRows: directions,
    }
  }

  if (spriteId === 'player-lucas' || spriteId === 'player-dawn') {
    return {
      id: spriteId,
      src: spriteId === 'player-lucas' ? '/games/trainers/lucas.png' : '/games/trainers/dawn.png',
      frameWidth: 64,
      frameHeight: 64,
      columns: 4,
      rows: 4,
      directionRows: directions,
    }
  }
  if (spriteId === 'pokemon-ditto') {
    return {
      id: spriteId,
      src: '/games/overworld/ditto.png',
      frameWidth: 64,
      frameHeight: 64,
      columns: 4,
      rows: 4,
      directionRows: directions,
    }
  }

  const trainerFilename = trainerSpritePaths[spriteId]
  if (trainerFilename) {
    return {
      id: spriteId,
      src: `/games/trainers/source/${trainerFilename}`,
      frameWidth: 32,
      frameHeight: 48,
      columns: 4,
      rows: 4,
      directionRows: directions,
    }
  }
  return null
}

export function getOverworldSpriteIdForProfileIcon(iconId: string | null | undefined) {
  const profileIcon = iconId ? getIcon(iconId) : undefined
  const icon = profileIcon?.icon
  if (!icon) return undefined
  if (icon.type === 'pokemon') {
    const key = String(icon.id)
    if (Object.hasOwn(pokemonSprites, key)) return key

    // Some Pokémon forms do not have a separate follower sheet in the source
    // pack. Keep the profile identity and use that species' verified base art.
    if (profileIcon.source.type === 'pokemon') {
      const baseSpeciesId = String(profileIcon.source.speciesId)
      return Object.hasOwn(pokemonSprites, baseSpeciesId)
        ? baseSpeciesId
        : undefined
    }
    return undefined
  }
  if (icon.type === 'trainer') {
    const trainer = getTrainerSprite(icon.id)
    return trainer?.overworldSpriteId
  }
  return undefined
}

export function getGridOverworldSpriteAppearance(
  spriteId: string,
  direction: keyof OverworldSpriteSheet['directionRows'] = 'down',
  step = 0,
  variant: { shiny?: boolean; female?: boolean } = {},
) {
  const sheet = getOverworldSpriteSheet(spriteId, variant)
  if (!sheet) return null
  const frame = ((Math.trunc(step) % sheet.columns) + sheet.columns) % sheet.columns
  const row = sheet.directionRows[direction]
  return {
    ...sheet,
    frameAspect: sheet.frameWidth / sheet.frameHeight,
    backgroundSize: `${sheet.columns * 100}% ${sheet.rows * 100}%`,
    backgroundPosition: `${(frame * 100) / (sheet.columns - 1)}% ${(row * 100) / (sheet.rows - 1)}%`,
  }
}
