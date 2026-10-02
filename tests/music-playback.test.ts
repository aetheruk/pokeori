import { existsSync } from 'node:fs'
import { describe, expect, it } from 'bun:test'
import { subCategories } from '@/data/sub-region-map'

describe('area music', () => {
  it('assigns dedicated music to the final Kanto areas', () => {
    const tracks = {
      'Pewter School': '/music/pewter-school.m4a',
      'Silph Co': '/music/silph-co.m4a',
      'Cycling Road': '/music/cycling-road.m4a',
      'Rocket Factory': '/music/rocket-factory.m4a',
      'Power Plant': '/music/power-plant.m4a',
      'Cinnabar Island': '/music/cinnabar.m4a',
      'Pokemon Mansion': '/music/pokemon-mansion.m4a',
      'Seafoam Islands': '/music/seafoam.m4a',
      'Victory Road': '/music/victory-road.m4a',
      'Indigo Plateau': '/music/indigo-plateau.m4a',
      'Cerulean Cave': '/music/cerulean-cave.m4a',
    }

    for (const [area, music] of Object.entries(tracks)) {
      expect(subCategories[area]?.music).toBe(music)
      expect(existsSync(`public${music}`)).toBe(true)
    }
  })

  it('keeps Rocket Factory locked until its content is authored', () => {
    expect(subCategories['Rocket Factory']).toMatchObject({
      category: 'Rocket Factory',
      region: 'Kanto',
      image: '/backgrounds/rocket-factory.avif',
      music: '/music/rocket-factory.m4a',
      unlockRequirements: [],
    })
    expect(existsSync('public/backgrounds/rocket-factory.avif')).toBe(true)
  })

  it('replaces the Viridian City recording', () => {
    expect(subCategories['Viridian City']?.music).toBe('/music/viridian.m4a')
    expect(existsSync('public/music/viridian.m4a')).toBe(true)
  })

  it('uses separate new recordings for Rock Tunnel and Digletts Cave', () => {
    expect(subCategories['Rock Tunnel']?.music).toBe('/music/rock-tunnel.m4a')
    expect(subCategories['Digletts Cave']?.music).toBe(
      '/music/digletts-cave.m4a',
    )
    expect(existsSync('public/music/rock-tunnel.m4a')).toBe(true)
    expect(existsSync('public/music/digletts-cave.m4a')).toBe(true)
  })

  it('points every authored area track to an existing audio file', () => {
    const missing = Object.entries(subCategories)
      .filter(([, area]) => area.music && !existsSync(`public${area.music}`))
      .map(([area, data]) => `${area}: ${data.music}`)

    expect(missing).toEqual([])
  })
})
