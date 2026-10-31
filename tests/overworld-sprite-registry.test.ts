import { describe, expect, test } from 'bun:test'
import { existsSync } from 'node:fs'
import pokemonSprites from '@/data/pokemon-overworld-sprite-manifest.json'
import pokemonFollowerAssets from '@/data/pokemon-overworld-follower-assets.json'
import { trainerSprites } from '@/data/trainers/classes'
import {
  getGridOverworldSpriteAppearance,
  getOverworldSpriteIdForProfileIcon,
  getPokemonFollowerSpriteId,
  getTrainerOverworldSpriteId,
} from '@/data/games/overworld-sprites'
import { getGridPlayerAppearance } from '@/utilities/trainer-appearance'

describe('overworld sprite registry', () => {
  test('every generated Pokémon mapping points to bundled source sheets', () => {
    expect(Object.keys(pokemonSprites).length).toBeGreaterThan(1200)
    for (const sprite of Object.values(pokemonSprites) as Array<{
      normal: string
      shiny?: string
      female?: string
      shinyFemale?: string
    }>) {
      expect(existsSync(`public${sprite.normal}`)).toBe(true)
      if (sprite.shiny) expect(existsSync(`public${sprite.shiny}`)).toBe(true)
      if (sprite.female) expect(existsSync(`public${sprite.female}`)).toBe(true)
      if (sprite.shinyFemale)
        expect(existsSync(`public${sprite.shinyFemale}`)).toBe(true)
    }
  })

  test('every extracted follower file is addressable by its source filename', () => {
    expect(Object.keys(pokemonFollowerAssets).length).toBe(2740)
    for (const sprite of Object.values(pokemonFollowerAssets)) {
      expect(existsSync(`public${sprite.src}`)).toBe(true)
    }
    const pikachuVariant = getPokemonFollowerSpriteId('PIKACHU_10')
    expect(pikachuVariant).toBe('pokemon-follower-normal:PIKACHU_10')
    expect(getGridOverworldSpriteAppearance(pikachuVariant!)?.src).toContain(
      'Followers/PIKACHU_10.png',
    )
  })

  test('profile icons resolve to walkable sheets when a mapping exists', () => {
    expect(getOverworldSpriteIdForProfileIcon('bulbasaur')).toBe('1')
    expect(getOverworldSpriteIdForProfileIcon('bird-keeper')).toBe(
      'trainer-bird-keeper',
    )
    expect(getOverworldSpriteIdForProfileIcon('koga')).toBe(
      'trainer-gym-kanto-koga',
    )
    expect(getOverworldSpriteIdForProfileIcon('trainer-gym-kanto-koga')).toBe(
      'trainer-gym-kanto-koga',
    )
    expect(getOverworldSpriteIdForProfileIcon('gym-kanto-koga')).toBe(
      'trainer-gym-kanto-koga',
    )
    expect(getOverworldSpriteIdForProfileIcon('trainer-oak')).toBe(
      'trainer-oak',
    )
    expect(getOverworldSpriteIdForProfileIcon('trainer-researcher-f')).toBe(
      'trainer-researcher-f',
    )
    expect(getOverworldSpriteIdForProfileIcon('nugget')).toBe('1000')
    expect(getOverworldSpriteIdForProfileIcon('safari-ball')).toBe('128')
    expect(getOverworldSpriteIdForProfileIcon('trainer-rival-late')).toBe(
      'trainer-gb-blue',
    )
    expect(getOverworldSpriteIdForProfileIcon('trainer-rocket')).toBe(
      'trainer-rocket-grunt-m',
    )
    expect(getOverworldSpriteIdForProfileIcon('trainer-fuji')).toBe(
      'trainer-gentleman',
    )
    expect(getOverworldSpriteIdForProfileIcon('trainer-gym-kalos-clemont')).toBe(
      'trainer-gym-kalos-clemont',
    )
    expect(getOverworldSpriteIdForProfileIcon('alolan-meowth')).toBe('10107')
    expect(getOverworldSpriteIdForProfileIcon('pokemon-10033')).toBe('3')
    expect(getOverworldSpriteIdForProfileIcon('pokemon-10195')).toBe('3')
    expect(getOverworldSpriteIdForProfileIcon('pokemon-1012')).toBe('1012')
    expect(pokemonSprites['1012'].normal).toContain('POLTCHAGEIST.png')
    expect(getTrainerOverworldSpriteId('bill')).toBe('trainer-pokemaniac')
    expect(getTrainerOverworldSpriteId('ariana')).toBe('trainer-rocket-grunt-f')
    expect(getTrainerOverworldSpriteId('detective')).toBe('trainer-gentleman')
    expect(getTrainerOverworldSpriteId('old-couple')).toBe('trainer-expert-m')
    expect(getTrainerOverworldSpriteId('tcg-kid')).toBe('trainer-pokemaniac')
  })

  test('manually mapped regional, breed, and punctuation forms use their exact follower sheets', () => {
    expect(getOverworldSpriteIdForProfileIcon('pokemon-10107')).toBe('10107')
    expect(getOverworldSpriteIdForProfileIcon('pokemon-10251')).toBe('10251')
    expect(getOverworldSpriteIdForProfileIcon('pokemon-201-exclamation')).toBe(
      '201-exclamation',
    )
    expect(getOverworldSpriteIdForProfileIcon('pokemon-201-question')).toBe(
      '201-question',
    )
    expect(
      (pokemonSprites as Record<string, { normal: string }>)['201-exclamation']
        .normal,
    ).toContain('UNOWN_27.png')
    expect(
      (pokemonSprites as Record<string, { normal: string }>)['201-question']
        .normal,
    ).toContain('UNOWN_26.png')
  })

  test('sprite sheets allow only verified shiny and female variants', () => {
    const venusaur = pokemonSprites['3']
    const normal = getGridOverworldSpriteAppearance('3')
    const shinyFemale = getGridOverworldSpriteAppearance('3', 'down', 0, {
      shiny: true,
      female: true,
    })
    expect(venusaur.shinyFemale).toBeDefined()
    expect(shinyFemale?.src).toBe(venusaur.shinyFemale)
    expect(normal?.src).toBe(venusaur.normal)
  })

  test('trainer classes and reusable markers resolve separately from battle portraits', () => {
    expect(getTrainerOverworldSpriteId('bug-catcher')).toBe(
      'trainer-bug-catcher',
    )
    expect(getTrainerOverworldSpriteId('youngster')).toBe('trainer-youngster')
    const appearance = getGridOverworldSpriteAppearance('trainer-bug-catcher')
    expect(appearance).toMatchObject({
      src: '/games/trainers/source/trainer_BUGCATCHER.png',
      frameWidth: 32,
      frameHeight: 48,
      frameAspect: 2 / 3,
      backgroundSize: '400% 400%',
      backgroundPosition: '0% 0%',
    })

    expect(getGridOverworldSpriteAppearance('trainer-gym-kanto-koga')).toMatchObject({
      src: '/games/trainers/source/trainer_LEADER_Koga.png',
      frameWidth: 64,
      frameHeight: 64,
    })
    expect(getGridPlayerAppearance('male', 'down', 0, 'koga').src).toBe(
      '/games/trainers/source/trainer_LEADER_Koga.png',
    )
    expect(getGridPlayerAppearance('male', 'down', 0, 'gym-kanto-koga').src).toBe(
      '/games/trainers/source/trainer_LEADER_Koga.png',
    )
    expect(getGridOverworldSpriteAppearance('trainer-oak')).toMatchObject({
      src: '/games/trainers/source/trainer_OAK.png',
      frameWidth: 32,
      frameHeight: 48,
    })
    expect(getGridOverworldSpriteAppearance('trainer-gym-kalos-clemont')).toMatchObject({
      src: '/games/trainers/source/kalos/trGymLeaderClemont.png',
      frameWidth: 64,
      frameHeight: 64,
      columns: 4,
      rows: 4,
    })
    expect(getGridOverworldSpriteAppearance('trainer-gym-alola-mallow')).toMatchObject({
      src: '/games/trainers/source/alola/010-Mallow.png',
      frameWidth: 32,
      frameHeight: 48,
      columns: 4,
      rows: 4,
    })
    expect(getGridOverworldSpriteAppearance('trainer-gym-galar-milo')).toMatchObject({
      src: '/games/trainers/source/galar/01o9if40.webp',
      frameWidth: 32,
      frameHeight: 32,
      columns: 3,
      rows: 4,
    })
    expect(getGridOverworldSpriteAppearance('trainer-gym-paldea-iono')).toMatchObject({
      src: '/games/trainers/source/paldea/01ng5w44.webp',
      frameWidth: 32,
      frameHeight: 32,
      columns: 3,
      rows: 4,
    })
    expect(getGridOverworldSpriteAppearance('trainer-researcher-f')).toMatchObject({
      src: '/games/trainers/source/trainer_SCIENTIST_F.png',
      frameWidth: 64,
      frameHeight: 64,
    })
  })

  test('every registered trainer icon keeps its identity on the grid', () => {
    for (const trainer of trainerSprites) {
      const appearance = getGridPlayerAppearance(
        trainer.gender === 'f' ? 'female' : 'male',
        'down',
        0,
        `trainer-${trainer.id}`,
      )
      expect(appearance.src).not.toMatch(/\/games\/trainers\/(lucas|dawn)\.png$/)
      expect(appearance.src).not.toBe('/games/overworld/ditto.png')
    }
  })
})
