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
  'trainer-gym-alola-acerola': 'alola/013-Acerola.png',
  'trainer-gym-alola-hala': 'alola/007-Hala.png',
  'trainer-gym-alola-hapu': 'alola/016-Hapu.png',
  'trainer-gym-alola-ilima': 'alola/006-Illima.png',
  'trainer-gym-alola-kiawe': 'alola/009-Kiawe.png',
  'trainer-gym-alola-lana': 'alola/008-Lana.png',
  'trainer-gym-alola-mallow': 'alola/010-Mallow.png',
  'trainer-gym-alola-mina': 'alola/015-Mina.png',
  'trainer-gym-alola-nanu': 'alola/014-Nanu.png',
  'trainer-gym-alola-olivia': 'alola/011-Olivia.png',
  'trainer-gym-alola-sophocles': 'alola/012-Sophocles.png',
  'trainer-gym-galar-allister': 'galar/0115fddl.webp',
  'trainer-gym-galar-bea': 'galar/01a5bwe7.webp',
  'trainer-gym-galar-gordie': 'galar/01zuecx4.webp',
  'trainer-gym-galar-kabu': 'galar/01w7a5vi.webp',
  'trainer-gym-galar-melony': 'galar/01klfd6q.webp',
  'trainer-gym-galar-milo': 'galar/01o9if40.webp',
  'trainer-gym-galar-nessa': 'galar/01ipzmzp.webp',
  'trainer-gym-galar-opal': 'galar/01csl0fi.webp',
  'trainer-gym-galar-piers': 'galar/01pgheek.webp',
  'trainer-gym-galar-raihan': 'galar/01km6ox3.webp',
  'trainer-gym-paldea-brassius': 'paldea/017dym5u.webp',
  'trainer-gym-paldea-grusha': 'paldea/01mrnw4i.webp',
  'trainer-gym-paldea-iono': 'paldea/01ng5w44.webp',
  'trainer-gym-paldea-katy': 'paldea/01so438i.webp',
  'trainer-gym-paldea-kofu': 'paldea/015t4fis.webp',
  'trainer-gym-paldea-larry': 'paldea/01qeiu7c.webp',
  'trainer-gym-paldea-ryme': 'paldea/01yffzi4.webp',
  'trainer-gym-paldea-tulip': 'paldea/01hrwa9d.webp',
  'trainer-butler': 'kalos/trButler.png',
  'trainer-ace-trainer-f': 'trainer_ACETRAINER_F.png',
  'trainer-ace-trainer-m': 'trainer_ACETRAINER_M.png',
  'trainer-aroma-lady': 'trainer_AROMALADY.png',
  'trainer-beauty': 'trainer_BEAUTY.png',
  'trainer-biker': 'trainer_BIKER2.png',
  'trainer-bird-keeper': 'trainer_BIRDKEEPER.png',
  'trainer-black-belt': 'trainer_BLACKBELT.png',
  'trainer-breeder': 'trainer_BREEDER.png',
  'trainer-bug-catcher': 'trainer_BUGCATCHER.png',
  'trainer-bug-maniac': 'trainer_BUGMANIAC.png',
  'trainer-burglar': 'trainer_BURGLAR.png',
  'trainer-camper': 'trainer_CAMPER.png',
  'trainer-channeler': 'trainer_CHANNELER.png',
  'trainer-cyclist-f': 'trainer_CYCLIST_F.png',
  'trainer-cyclist-m': 'trainer_CYCLIST_M.png',
  'trainer-crush-girl': 'trainer_CRUSHGIRL.png',
  'trainer-engineer': 'trainer_ENGINEER.png',
  'trainer-expert-f': 'trainer_EXPERT_F.png',
  'trainer-expert-m': 'trainer_EXPERT_M.png',
  'trainer-fisherman': 'trainer_FISHERMAN.png',
  'trainer-gamer': 'trainer_GAMBLER.png',
  'trainer-leaf': 'trainer_POKEMONTRAINER_Leaf.png',
  'trainer-gentleman': 'trainer_GENTLEMAN.png',
  // Original Gen I Red/Blue character sprites, adapted to the shared 4×4 walker sheet.
  'trainer-gb-blue': 'trainer_GB_BLUE.png',
  'trainer-gb-red': 'trainer_GB_RED.png',
  'trainer-hex-maniac': 'trainer_HEXMANIAC.png',
  'trainer-hiker': 'trainer_HIKER.png',
  'trainer-juggler': 'trainer_JUGGLER.png',
  'trainer-lady': 'trainer_LADY.png',
  'trainer-lass': 'trainer_LASS.png',
  'trainer-maid': 'trainer_MAID.png',
  'trainer-nurse': 'trainer_NURSE.png',
  'trainer-painter': 'trainer_PAINTER.png',
  'trainer-picnicker': 'trainer_PICNICKER.png',
  'trainer-poke-kid': 'trainer_POKEKID.png',
  'trainer-pokefan-f': 'trainer_POKEFAN_F.png',
  'trainer-pokefan-m': 'trainer_POKEFAN_M.png',
  'trainer-pokemaniac': 'trainer_POKEMANIAC.png',
  'trainer-policeman': 'trainer_POLICEMAN.png',
  'trainer-preschooler-f': 'trainer_PRESCHOOLER_F.png',
  'trainer-preschooler-m': 'trainer_PRESCHOOLER_M.png',
  'trainer-psychic-f': 'trainer_PSYCHIC_F.png',
  'trainer-psychic-m': 'trainer_PSYCHIC_M.png',
  'trainer-rich-boy': 'trainer_RICHBOY.png',
  'trainer-researcher-f': 'trainer_SCIENTIST_F.png',
  'trainer-researcher-m': 'trainer_SCIENTIST_M3.png',
  'trainer-red': 'trainer_POKEMONTRAINER_Red.png',
  'trainer-ranger-f': 'trainer_RANGER_F.png',
  'trainer-ranger-m': 'trainer_RANGER_M.png',
  'trainer-rocker': 'trainer_ROCKER.png',
  'trainer-rocket-grunt-f': 'trainer_TEAMROCKET_F.png',
  'trainer-rocket-grunt-m': 'trainer_TEAMROCKET_M.png',
  'trainer-runner': 'trainer_JOGGER.png',
  'trainer-roughneck': 'trainer_ROUGHNECK.png',
  'trainer-roughneck-2v1': 'trainer_ROUGHNECK2v1.png',
  'trainer-roughneck-v1': 'trainer_ROUGHNECKv1.png',
  'trainer-roughneck-v1a': 'trainer_ROUGHNECKv1a.png',
  'trainer-ruin-maniac': 'trainer_RUINMANIAC.png',
  'trainer-sailor': 'trainer_SAILOR.png',
  'trainer-scientist': 'trainer_SCIENTIST.png',
  'trainer-school-kid-f': 'trainer_SCHOOLGIRL.png',
  'trainer-school-kid-m': 'trainer_SCHOOLBOY.png',
  'trainer-socialite': 'trainer_SOCIALITE.png',
  'trainer-silver': 'trainer_SILVER.png',
  'trainer-super-nerd': 'trainer_SUPERNERD.png',
  'trainer-swimmer-f': 'trainer_SWIMMER_F.png',
  'trainer-swimmer-m': 'trainer_SWIMMER_M.png',
  'trainer-tamer': 'trainer_TAMER.png',
  'trainer-tuber-f': 'trainer_TUBER_F.png',
  'trainer-tuber-m': 'trainer_TUBER_M.png',
  'trainer-twins': 'trainer_TWINS.png',
  'trainer-waiter': 'trainer_WAITER.png',
  'trainer-waitress': 'trainer_WAITRESS.png',
  'trainer-youngster': 'trainer_YOUNGSTER.png',
  'trainer-young-couple-f': 'trainer_YOUNGCOUPLE_F.png',
  'trainer-young-couple-m': 'trainer_YOUNGCOUPLE_M.png',
  'trainer-gym-kanto-blaine': 'trainer_LEADER_Blaine.png',
  'trainer-gym-kanto-brock': 'trainer_LEADER_Brock.png',
  'trainer-gym-kanto-erika': 'trainer_LEADER_Erika.png',
  'trainer-gym-kanto-giovanni': 'trainer_LEADER_Giovanni.png',
  'trainer-gym-kanto-koga': 'trainer_LEADER_Koga.png',
  'trainer-gym-kanto-misty': 'trainer_LEADER_Misty.png',
  'trainer-gym-kanto-sabrina': 'trainer_LEADER_Sabrina.png',
  'trainer-gym-kanto-surge': 'trainer_LEADER_Surge.png',
  'trainer-gym-kalos-clemont': 'kalos/trGymLeaderClemont.png',
  'trainer-gym-kalos-grant': 'kalos/trGymLeaderGrant.png',
  'trainer-gym-kalos-korrina': 'kalos/trGymLeaderKorinna.png',
  'trainer-gym-kalos-olympia': 'kalos/trGymLeaderOlympia.png',
  'trainer-gym-kalos-ramos': 'kalos/trGymLeaderRamos.png',
  'trainer-gym-kalos-valerie': 'kalos/trGymLeaderValerie.png',
  'trainer-gym-kalos-viola': 'kalos/trGymLeaderViola.png',
  'trainer-gym-kalos-wulfric': 'kalos/trGymLeaderWulfric.png',
  'trainer-gym-hoenn-brawly': 'trainer_LEADER_Brawly.png',
  'trainer-gym-hoenn-flannery': 'trainer_LEADER_Flannery.png',
  'trainer-gym-hoenn-norman': 'trainer_LEADER_Norman.png',
  'trainer-gym-hoenn-roxanne': 'trainer_LEADER_Roxanne.png',
  'trainer-gym-hoenn-wallace': 'trainer_LEADER_Wallace.png',
  'trainer-gym-hoenn-wattson': 'trainer_LEADER_Wattson.png',
  'trainer-gym-hoenn-winona': 'trainer_LEADER_Winona.png',
  'trainer-gym-hoenn-tateandliza': 'trainer_LEADER_TateLiza.png',
  'trainer-gym-johto-bugsy': 'trainer_LEADER_Johto_Bugsy.png',
  'trainer-gym-johto-chuck': 'trainer_LEADER_Johto_Chuck.png',
  'trainer-gym-johto-clair': 'trainer_LEADER_Johto_Clair.png',
  'trainer-gym-johto-falkner': 'trainer_LEADER_Johto_Falkner.png',
  'trainer-gym-johto-jasmine': 'trainer_LEADER_Johto_Jasmine.png',
  'trainer-gym-johto-morty': 'trainer_LEADER_Johto_Morty.png',
  'trainer-gym-johto-pryce': 'trainer_LEADER_Johto_Pryce.png',
  'trainer-gym-johto-whitney': 'trainer_LEADER_Johto_Whitney.png',
  'trainer-gym-sinnoh-byron': 'trainer_LEADER_Sinnoh_Byron.png',
  'trainer-gym-sinnoh-candice': 'trainer_LEADER_Sinnoh_Candice.png',
  'trainer-gym-sinnoh-crasherwake': 'trainer_LEADER_Sinnoh_CrasherWake.png',
  'trainer-gym-sinnoh-fantina': 'trainer_LEADER_Sinnoh_Fantina.png',
  'trainer-gym-sinnoh-gardenia': 'trainer_LEADER_Sinnoh_Gardenia.png',
  'trainer-gym-sinnoh-maylene': 'trainer_LEADER_Sinnoh_Maylene.png',
  'trainer-gym-sinnoh-roark': 'trainer_LEADER_Sinnoh_Roark.png',
  'trainer-gym-sinnoh-volkner': 'trainer_LEADER_Sinnoh_Volkner.png',
  'trainer-gym-unova-brycen': 'trainer_LEADER_Unova_Brycen.png',
  'trainer-gym-unova-burgh': 'trainer_LEADER_Unova_Burgh.png',
  'trainer-gym-unova-chili': 'trainer_LEADER_Unova_Chili.png',
  'trainer-gym-unova-cilan': 'trainer_LEADER_Unova_Cilan.png',
  'trainer-gym-unova-clay': 'trainer_LEADER_Unova_Clay.png',
  'trainer-gym-unova-cress': 'trainer_LEADER_Unova_Cress.png',
  'trainer-gym-unova-drayden': 'trainer_LEADER_Unova_Drayden.png',
  'trainer-gym-unova-elesa': 'trainer_LEADER_Unova_Elesa.png',
  'trainer-gym-unova-iris': 'trainer_LEADER_Unova_Iris.png',
  'trainer-gym-unova-lenora': 'trainer_LEADER_Unova_Lenora.png',
  'trainer-gym-unova-skyla': 'trainer_LEADER_Unova_Skyla.png',
  'trainer-oak': 'trainer_OAK.png',
}

const trainerSpriteFrameSizes: Record<string, { width: number; height: number }> = {
  'trainer-gym-alola-acerola': { width: 32, height: 48 },
  'trainer-gym-alola-hala': { width: 32, height: 48 },
  'trainer-gym-alola-hapu': { width: 32, height: 48 },
  'trainer-gym-alola-ilima': { width: 32, height: 48 },
  'trainer-gym-alola-kiawe': { width: 32, height: 48 },
  'trainer-gym-alola-lana': { width: 32, height: 48 },
  'trainer-gym-alola-mallow': { width: 32, height: 48 },
  'trainer-gym-alola-mina': { width: 32, height: 48 },
  'trainer-gym-alola-nanu': { width: 32, height: 48 },
  'trainer-gym-alola-olivia': { width: 32, height: 48 },
  'trainer-gym-alola-sophocles': { width: 32, height: 48 },
  'trainer-gym-galar-allister': { width: 32, height: 32 },
  'trainer-gym-galar-bea': { width: 32, height: 32 },
  'trainer-gym-galar-gordie': { width: 32, height: 32 },
  'trainer-gym-galar-kabu': { width: 32, height: 32 },
  'trainer-gym-galar-melony': { width: 32, height: 32 },
  'trainer-gym-galar-milo': { width: 32, height: 32 },
  'trainer-gym-galar-nessa': { width: 32, height: 32 },
  'trainer-gym-galar-opal': { width: 32, height: 32 },
  'trainer-gym-galar-piers': { width: 32, height: 32 },
  'trainer-gym-galar-raihan': { width: 32, height: 32 },
  'trainer-gym-paldea-brassius': { width: 32, height: 32 },
  'trainer-gym-paldea-grusha': { width: 32, height: 32 },
  'trainer-gym-paldea-iono': { width: 32, height: 32 },
  'trainer-gym-paldea-katy': { width: 32, height: 32 },
  'trainer-gym-paldea-kofu': { width: 32, height: 32 },
  'trainer-gym-paldea-larry': { width: 32, height: 32 },
  'trainer-gym-paldea-ryme': { width: 32, height: 32 },
  'trainer-gym-paldea-tulip': { width: 32, height: 32 },
  'trainer-cyclist-f': { width: 48, height: 48 },
  'trainer-cyclist-m': { width: 48, height: 48 },
  'trainer-researcher-f': { width: 64, height: 64 },
  'trainer-researcher-m': { width: 64, height: 64 },
  'trainer-roughneck-2v1': { width: 48, height: 48 },
  'trainer-gym-hoenn-flannery': { width: 40, height: 48 },
  'trainer-gym-hoenn-roxanne': { width: 40, height: 48 },
  'trainer-gym-hoenn-tateandliza': { width: 64, height: 48 },
  'trainer-channeler': { width: 64, height: 64 },
  'trainer-butler': { width: 64, height: 64 },
  'trainer-gb-blue': { width: 16, height: 16 },
  'trainer-gb-red': { width: 16, height: 16 },
  'trainer-gamer': { width: 64, height: 64 },
  'trainer-maid': { width: 64, height: 64 },
  'trainer-nurse': { width: 64, height: 64 },
  'trainer-poke-kid': { width: 64, height: 64 },
  'trainer-policeman': { width: 64, height: 64 },
  'trainer-preschooler-f': { width: 64, height: 64 },
  'trainer-preschooler-m': { width: 64, height: 64 },
  'trainer-rocket-grunt-f': { width: 64, height: 64 },
  'trainer-rocket-grunt-m': { width: 64, height: 64 },
  'trainer-runner': { width: 64, height: 64 },
  'trainer-waiter': { width: 64, height: 64 },
  'trainer-waitress': { width: 64, height: 64 },
  'trainer-gym-kanto-blaine': { width: 64, height: 64 },
  'trainer-gym-kanto-brock': { width: 64, height: 64 },
  'trainer-gym-kanto-erika': { width: 64, height: 64 },
  'trainer-gym-kanto-giovanni': { width: 64, height: 64 },
  'trainer-gym-kanto-koga': { width: 64, height: 64 },
  'trainer-gym-kanto-misty': { width: 64, height: 64 },
  'trainer-gym-kanto-sabrina': { width: 64, height: 64 },
  'trainer-gym-kanto-surge': { width: 64, height: 64 },
  'trainer-gym-kalos-clemont': { width: 64, height: 64 },
  'trainer-gym-kalos-grant': { width: 64, height: 64 },
  'trainer-gym-kalos-korrina': { width: 64, height: 64 },
  'trainer-gym-kalos-olympia': { width: 64, height: 64 },
  'trainer-gym-kalos-ramos': { width: 64, height: 64 },
  'trainer-gym-kalos-valerie': { width: 64, height: 64 },
  'trainer-gym-kalos-viola': { width: 64, height: 64 },
  'trainer-gym-kalos-wulfric': { width: 64, height: 64 },
  'trainer-gym-johto-bugsy': { width: 64, height: 64 },
  'trainer-gym-johto-chuck': { width: 64, height: 64 },
  'trainer-gym-johto-clair': { width: 64, height: 64 },
  'trainer-gym-johto-falkner': { width: 64, height: 64 },
  'trainer-gym-johto-jasmine': { width: 64, height: 64 },
  'trainer-gym-johto-morty': { width: 64, height: 64 },
  'trainer-gym-johto-pryce': { width: 64, height: 64 },
  'trainer-gym-johto-whitney': { width: 64, height: 64 },
  'trainer-gym-sinnoh-byron': { width: 64, height: 64 },
  'trainer-gym-sinnoh-candice': { width: 64, height: 64 },
  'trainer-gym-sinnoh-crasherwake': { width: 64, height: 64 },
  'trainer-gym-sinnoh-fantina': { width: 64, height: 64 },
  'trainer-gym-sinnoh-gardenia': { width: 64, height: 64 },
  'trainer-gym-sinnoh-maylene': { width: 64, height: 64 },
  'trainer-gym-sinnoh-roark': { width: 64, height: 64 },
  'trainer-gym-sinnoh-volkner': { width: 64, height: 64 },
  'trainer-gym-unova-brycen': { width: 64, height: 64 },
  'trainer-gym-unova-burgh': { width: 64, height: 64 },
  'trainer-gym-unova-chili': { width: 64, height: 64 },
  'trainer-gym-unova-cilan': { width: 64, height: 64 },
  'trainer-gym-unova-clay': { width: 64, height: 64 },
  'trainer-gym-unova-cress': { width: 64, height: 64 },
  'trainer-gym-unova-drayden': { width: 64, height: 64 },
  'trainer-gym-unova-elesa': { width: 64, height: 64 },
  'trainer-gym-unova-iris': { width: 64, height: 64 },
  'trainer-gym-unova-lenora': { width: 64, height: 64 },
  'trainer-gym-unova-skyla': { width: 64, height: 64 },
}

const trainerSpriteColumns: Record<string, number> = {
  'trainer-gym-galar-allister': 3,
  'trainer-gym-galar-bea': 3,
  'trainer-gym-galar-gordie': 3,
  'trainer-gym-galar-kabu': 3,
  'trainer-gym-galar-melony': 3,
  'trainer-gym-galar-milo': 3,
  'trainer-gym-galar-nessa': 3,
  'trainer-gym-galar-opal': 3,
  'trainer-gym-galar-piers': 3,
  'trainer-gym-galar-raihan': 3,
  'trainer-gym-paldea-brassius': 3,
  'trainer-gym-paldea-grusha': 3,
  'trainer-gym-paldea-iono': 3,
  'trainer-gym-paldea-katy': 3,
  'trainer-gym-paldea-kofu': 3,
  'trainer-gym-paldea-larry': 3,
  'trainer-gym-paldea-ryme': 3,
  'trainer-gym-paldea-tulip': 3,
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
    const frameSize = trainerSpriteFrameSizes[spriteId]
    return {
      id: spriteId,
      src: `/games/trainers/source/${trainerFilename}`,
      frameWidth: frameSize?.width ?? 32,
      frameHeight: frameSize?.height ?? 48,
      columns: trainerSpriteColumns[spriteId] ?? 4,
      rows: 4,
      directionRows: directions,
    }
  }
  return null
}

export function getOverworldSpriteIdForProfileIcon(iconId: string | null | undefined) {
  const profileIcon = iconId ? getIcon(iconId) : undefined
  const icon = profileIcon?.icon
  if (!icon) {
    // Some older profiles stored the trainer class ID itself instead of an
    // icon-registry ID. Keep those saved selections linked to trainer data.
    return iconId
      ? trainerClassById[iconId as keyof typeof trainerClassById]?.overworldSpriteId
      : undefined
  }
  if (icon.type === 'item') {
    const itemWalkerIds: Record<string, string> = {
      nugget: '1000',
      'safari-ball': '128',
    }
    return itemWalkerIds[String(icon.id)]
  }
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
