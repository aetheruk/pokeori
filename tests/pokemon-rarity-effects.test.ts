import { describe, expect, test } from 'bun:test'
import { getBundledPokemonSpriteUrl } from '@/utilities/pokemon/local-sprites'
import { Pokemon as PokemonCollection } from '@/collections/Pokemon'
import {
  getPokemonRarityEffect,
  getPokemonRarityLegacyFields,
  POKEMON_RARITY_EFFECTS,
  resolvePokemonRarity,
} from '@/utilities/pokemon/rarity-effects'

describe('Pokemon rarity effects', () => {
  test('keeps the complete preview set uniquely identified', () => {
    expect(POKEMON_RARITY_EFFECTS.map((effect) => effect.id)).toEqual([
      'normal',
      'shiny',
      'shadow',
      'radiant',
      'silver',
      'gold',
      'emerald',
      'ruby',
      'sapphire',
      'crystal',
      'retro',
      'galactic',
      'levin',
      'inferno',
      'prism',
      'rainbow',
      'celestial',
      'black',
      'white',
      'void',
      'glitch',
      'ancient',
      'toxic',
      'pixelated',
    ])
    expect(new Set(POKEMON_RARITY_EFFECTS.map((effect) => effect.id)).size).toBe(
      POKEMON_RARITY_EFFECTS.length,
    )
  })

  test('uses the existing shiny source only for the shiny reference', () => {
    expect(getPokemonRarityEffect('shiny').sourcePalette).toBe('shiny')
    expect(getPokemonRarityEffect('gold').sourcePalette).toBe('normal')
    expect(getPokemonRarityEffect('black').sourcePalette).toBe('normal')
    expect(getPokemonRarityEffect('white').sourcePalette).toBe('normal')
    expect(getPokemonRarityEffect('glitch').sourcePalette).toBe('normal')
    expect(getPokemonRarityEffect('ancient').sourcePalette).toBe('normal')
    expect(getPokemonRarityEffect('toxic').sourcePalette).toBe('normal')
    expect(getPokemonRarityEffect('pixelated').sourcePalette).toBe('normal')
  })

  test('resolves every Pokemon to one canonical rarity and derives legacy flags', () => {
    expect(resolvePokemonRarity({ shiny: true, isShadow: true })).toBe('shadow')
    expect(resolvePokemonRarity({ rarity: 'black' })).toBe('black')
    expect(resolvePokemonRarity({ rarity: 'white' })).toBe('white')
    expect(resolvePokemonRarity({ rarity: 'glitch' })).toBe('glitch')
    expect(resolvePokemonRarity({ rarity: 'ancient' })).toBe('ancient')
    expect(resolvePokemonRarity({ rarity: 'toxic' })).toBe('toxic')
    expect(resolvePokemonRarity({ rarity: 'pixelated' })).toBe('pixelated')
    expect(resolvePokemonRarity({ rarity: 'inferno', shiny: true })).toBe('inferno')
    expect(resolvePokemonRarity({ rarity: 'invalid', isRadiant: true })).toBe('radiant')
    expect(getPokemonRarityLegacyFields('rainbow')).toEqual({
      shiny: false,
      isShadow: false,
      isRadiant: false,
    })
    expect(getPokemonRarityLegacyFields('shadow')).toEqual({
      shiny: false,
      isShadow: true,
      isRadiant: false,
    })
  })

  test('enforces a single rarity before Pokemon documents are saved', async () => {
    const normalizePokemonRarity = PokemonCollection.hooks?.beforeChange?.[0]
    const result = await normalizePokemonRarity?.({
      data: { rarity: 'inferno', shiny: true, isRadiant: true },
      originalDoc: {},
    } as never)

    expect(result).toMatchObject({
      rarity: 'inferno',
      shiny: false,
      isShadow: false,
      isRadiant: false,
    })
  })

  test('resolves Charizard preview sprites in every lab presentation', () => {
    expect(
      getBundledPokemonSpriteUrl({ formId: '6', family: 'gen-v', direction: 'front' }),
    ).toBe('/sprites/pokemon/gen-v/front/normal/6.avif')
    expect(
      getBundledPokemonSpriteUrl({ formId: '6', family: 'gen-v', direction: 'back' }),
    ).toBe('/sprites/pokemon/gen-v/back/normal/6.avif')
    expect(getBundledPokemonSpriteUrl({ formId: '6', family: 'home' })).toBe(
      '/sprites/pokemon/home/normal/6.avif',
    )
  })
})
