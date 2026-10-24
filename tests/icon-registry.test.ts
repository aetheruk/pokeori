import { describe, expect, test } from 'bun:test'
import { allPokemon } from '@/data/pokemon'
import { trainerSprites } from '@/data/trainers'
import {
  getIcon,
  getIconForSource,
  getIconsForSource,
  icons,
} from '@/data/user/icons'

describe('reusable icon registry', () => {
  test('generates an icon for every Pokémon form in the data catalog', () => {
    for (const species of allPokemon) {
      for (const form of species.forms) {
        expect(getIcon(`pokemon-${form.id}`)).toMatchObject({
          name: form.name,
          icon: { type: 'pokemon', id: form.id },
          source: {
            type: 'pokemon',
            id: form.id,
            speciesId: species.id,
          },
        })
      }
    }
  })

  test('generates an icon for every registered trainer sprite', () => {
    for (const trainer of trainerSprites) {
      expect(getIcon(`trainer-${trainer.id}`)).toMatchObject({
        icon: { type: 'trainer', id: trainer.id },
        source: { type: 'trainer', id: trainer.id },
      })
    }
  })

  test('keeps previously granted aliases and tracks non-Pokémon icons as other', () => {
    expect(getIcon('alolan-meowth')).toMatchObject({
      icon: { type: 'pokemon', id: '10107' },
      source: { type: 'pokemon', id: '10107', speciesId: 52 },
    })
    expect(getIcon('brock')).toMatchObject({
      icon: { type: 'trainer', id: 'gym-kanto-brock' },
      source: { type: 'trainer', id: 'gym-kanto-brock' },
    })
    expect(getIcon('safari-ball')).toMatchObject({
      icon: { type: 'item', id: 'safari-ball' },
      source: { type: 'other', id: 'safari-ball' },
    })
    expect(new Set(icons.map((icon) => icon.id)).size).toBe(icons.length)
  })

  test('looks up canonical icons and legacy aliases from their linked source', () => {
    expect(getIconForSource({ type: 'pokemon', id: '10107' })?.id).toBe(
      'pokemon-10107',
    )
    expect(
      getIconsForSource({ type: 'pokemon', id: '10107' }).map(
        (icon) => icon.id,
      ),
    ).toContain('alolan-meowth')
    expect(getIconForSource({ type: 'trainer', id: 'bug-catcher' })?.id).toBe(
      'trainer-bug-catcher',
    )
  })
})
