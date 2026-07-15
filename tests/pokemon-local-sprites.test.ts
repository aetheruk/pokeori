import { describe, expect, test } from 'bun:test'
import spriteManifest from '@/data/pokemon-sprite-manifest.json'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import {
  getBundledPokemonSpriteUrl,
  getFieldObservationPokemonSpriteSources,
} from '@/utilities/pokemon/local-sprites'
import { getPokemonTypeIconUrl } from '@/utilities/pokemon/sprite-proxy'

describe('bundled pokemon sprites', () => {
  test('uses local home shiny sprites for available app forms', () => {
    expect(getPokemonImageUrl('13', 'home', true)).toBe('/sprites/pokemon/home/shiny/13.avif')
  })

  test('uses female home sprites when a female variant exists', () => {
    expect(getPokemonImageUrl('25', 'home', false, 'female')).toBe(
      '/sprites/pokemon/home/female/25.avif',
    )
    expect(getPokemonImageUrl('25', 'home', true, 'female')).toBe(
      '/sprites/pokemon/home/shiny-female/25.avif',
    )
    expect(getPokemonImageUrl('1', 'home', false, 'female')).toBe(
      '/sprites/pokemon/home/normal/1.avif',
    )
  })

  test('maps battle pixel sprites to bundled gen v front and back assets', () => {
    expect(getBundledPokemonSpriteUrl({ formId: '25', family: 'gen-v', shiny: true })).toBe(
      '/sprites/pokemon/gen-v/front/shiny/25.avif',
    )
    expect(
      getBundledPokemonSpriteUrl({
        formId: '25',
        family: 'gen-v',
        direction: 'back',
        shiny: true,
      }),
    ).toBe('/sprites/pokemon/gen-v/back/shiny/25.avif')
  })

  test('uses female pixel sprites when a female variant exists', () => {
    expect(getPokemonImageUrl('25', 'sprite', false, 'female')).toBe(
      '/sprites/pokemon/gen-v/front/female/25.avif',
    )
    expect(getPokemonImageUrl('25', 'sprite', true, 'female')).toBe(
      '/sprites/pokemon/gen-v/front/shiny-female/25.avif',
    )
    expect(getPokemonImageUrl('1', 'sprite', false, 'female')).toBe(
      '/sprites/pokemon/gen-v/front/normal/1.avif',
    )
  })

  test('falls back to Unown for missing local sprites', () => {
    expect(getPokemonImageUrl('172-spiky-eared', 'home')).toBe(
      '/sprites/pokemon/home/normal/201.avif',
    )
  })

  test('field observation shiny sources prefer exact shiny sprites before Unown fallback', () => {
    expect(getFieldObservationPokemonSpriteSources('13', true)).toEqual([
      '/sprites/pokemon/home/shiny/13.avif',
      '/sprites/pokemon/gen-v/front/shiny/13.avif',
      '/sprites/pokemon/home/shiny/201.avif',
    ])
    expect(getFieldObservationPokemonSpriteSources('25', true, true)).toEqual([
      '/sprites/pokemon/home/shiny-female/25.avif',
      '/sprites/pokemon/gen-v/front/shiny-female/25.avif',
      '/sprites/pokemon/home/shiny/201.avif',
    ])
    expect(getFieldObservationPokemonSpriteSources('172-spiky-eared', true)).toEqual([
      '/sprites/pokemon/home/shiny/201.avif',
    ])
  })

  test('manifest includes complete Unown fallback sprites', () => {
    expect(spriteManifest.fallbackFormId).toBe('201')
    expect(spriteManifest.sprites['201']?.home?.normal).toBe('/sprites/pokemon/home/normal/201.avif')
    expect(spriteManifest.sprites['201']?.home?.shiny).toBe('/sprites/pokemon/home/shiny/201.avif')
    expect(spriteManifest.sprites['201']?.genV?.front?.normal).toBe(
      '/sprites/pokemon/gen-v/front/normal/201.avif',
    )
    expect(spriteManifest.sprites['201']?.genV?.back?.normal).toBe(
      '/sprites/pokemon/gen-v/back/normal/201.avif',
    )
  })

  test('uses bundled local type icons', () => {
    expect(getPokemonTypeIconUrl(10)).toBe('/sprites/types/default/10.avif')
    expect(getPokemonTypeIconUrl(10, true)).toBe('/sprites/types/tera/10.avif')
    expect(getPokemonTypeIconUrl(10002)).toBe('/sprites/types/default/10001.avif')
  })
})
