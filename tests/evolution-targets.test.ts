import { describe, expect, test } from 'bun:test'
import { EVOLUTIONS } from '@/data/evolutions'
import pokemonData, { type PokemonData } from '@/data/pokemon-data'
import {
  resolveEvolutionTargetForm,
  VIVILLON_EVOLUTION_FORMS,
} from '@/utilities/pokemon/evolution-targets'

const pikachuToRaichu = EVOLUTIONS[25]?.find(
  (evolution) =>
    evolution.speciesId === 26 &&
    evolution.conditions.itemId === 'thunder-stone',
)

if (!pikachuToRaichu) {
  throw new Error('Missing Pikachu to Raichu Thunder Stone evolution')
}

const spewpaToVivillon = EVOLUTIONS[665]?.find(
  (evolution) => evolution.speciesId === 666,
)

if (!spewpaToVivillon) {
  throw new Error('Missing Spewpa to Vivillon evolution')
}

const rockruffToLycanroc = EVOLUTIONS[744]?.filter(
  (evolution) => evolution.speciesId === 745,
)

if (!rockruffToLycanroc?.length) {
  throw new Error('Missing Rockruff to Lycanroc evolutions')
}

const toxelToToxtricity = EVOLUTIONS[848]?.find(
  (evolution) => evolution.speciesId === 849,
)

if (!toxelToToxtricity) {
  throw new Error('Missing Toxel to Toxtricity evolution')
}

const darumakaToDarmanitan = EVOLUTIONS[554]?.filter(
  (evolution) => evolution.speciesId === 555,
)

if (!darumakaToDarmanitan?.length) {
  throw new Error('Missing Darumaka to Darmanitan evolutions')
}

const alolanRattataToRaticate = EVOLUTIONS[19]?.find(
  (evolution) =>
    evolution.speciesId === 20 &&
    evolution.conditions.requiredSourceForm === 'Alolan Form',
)

if (!alolanRattataToRaticate) {
  throw new Error('Missing Alolan Rattata to Alolan Raticate evolution')
}

describe('evolution target form resolution', () => {
  test('evolves Alola-origin Pikachu into Alolan Raichu with a Thunder Stone', () => {
    expect(
      resolveEvolutionTargetForm(
        {
          speciesId: 25,
          obtainedRegion: 'Alola',
          obtainedLocation: null,
        },
        pikachuToRaichu,
      ),
    ).toBe('Alolan Form')
  })

  test('keeps non-Alola-origin Pikachu evolution as base Raichu', () => {
    expect(
      resolveEvolutionTargetForm(
        {
          speciesId: 25,
          obtainedRegion: 'Kanto',
          obtainedLocation: 'Viridian Forest',
        },
        pikachuToRaichu,
      ),
    ).toBe('base')
  })

  test('evolves Alolan Rattata into Alolan Raticate', () => {
    expect(
      resolveEvolutionTargetForm(
        {
          speciesId: 19,
          obtainedRegion: 'Alola',
          obtainedLocation: null,
        },
        alolanRattataToRaticate,
      ),
    ).toBe('Alolan Form')
  })

  test('randomly resolves Spewpa evolution into available Vivillon patterns', () => {
    const spewpa = {
      speciesId: 665,
      obtainedRegion: null,
      obtainedLocation: null,
    }

    expect(resolveEvolutionTargetForm(spewpa, spewpaToVivillon, () => 0)).toBe(
      'base',
    )

    expect(
      resolveEvolutionTargetForm(spewpa, spewpaToVivillon, () => 0.999999),
    ).toBe('Poké Ball Pattern')
  })

  test('keeps the random Vivillon evolution pool aligned with Pokemon data', () => {
    const vivillonForms = (pokemonData as PokemonData)
      .find((species) => species.id === 666)
      ?.forms.map((form) => form.form)

    expect(vivillonForms).toBeDefined()
    expect([...(vivillonForms || [])].sort()).toEqual(
      [...VIVILLON_EVOLUTION_FORMS].sort(),
    )
  })

  test('resolves Rockruff time-based evolutions to each Lycanroc form', () => {
    const rockruff = {
      speciesId: 744,
      obtainedRegion: null,
      obtainedLocation: null,
    }

    const byTimeOfDay = new Map(
      rockruffToLycanroc.map((evolution) => [
        evolution.conditions.timeOfDay,
        evolution,
      ]),
    )

    expect(resolveEvolutionTargetForm(rockruff, byTimeOfDay.get('day')!)).toBe(
      'base',
    )
    expect(
      resolveEvolutionTargetForm(rockruff, byTimeOfDay.get('night')!),
    ).toBe('Midnight Form')
    expect(resolveEvolutionTargetForm(rockruff, byTimeOfDay.get('dusk')!)).toBe(
      'Dusk Form',
    )
  })

  test('resolves Toxel nature split to Amped and Low Key Toxtricity forms', () => {
    const baseToxel = {
      speciesId: 848,
      obtainedRegion: null,
      obtainedLocation: null,
    }

    expect(
      resolveEvolutionTargetForm(
        { ...baseToxel, nature: 'adamant' },
        toxelToToxtricity,
      ),
    ).toBe('base')
    expect(
      resolveEvolutionTargetForm(
        { ...baseToxel, nature: 'modest' },
        toxelToToxtricity,
      ),
    ).toBe('Low Key Form')
    expect(
      resolveEvolutionTargetForm(
        { ...baseToxel, nature: 'Serious' },
        toxelToToxtricity,
      ),
    ).toBe('Low Key Form')
    expect(resolveEvolutionTargetForm(baseToxel, toxelToToxtricity)).toBe(
      'base',
    )
  })

  test('resolves Darumaka evolutions with a rare Zen Mode roll', () => {
    const darumaka = {
      speciesId: 554,
      obtainedRegion: null,
      obtainedLocation: null,
    }
    const bySourceForm = new Map(
      darumakaToDarmanitan.map((evolution) => [
        evolution.conditions.requiredSourceForm,
        evolution,
      ]),
    )
    const baseEvolution = bySourceForm.get('base')!
    const galarianEvolution = bySourceForm.get('Galarian Form')!

    expect(resolveEvolutionTargetForm(darumaka, baseEvolution, () => 0)).toBe(
      '555',
    )
    expect(
      resolveEvolutionTargetForm(darumaka, baseEvolution, () => 0.949999),
    ).toBe('555')
    expect(resolveEvolutionTargetForm(darumaka, baseEvolution, () => 0.95)).toBe(
      '10017',
    )

    expect(
      resolveEvolutionTargetForm(darumaka, galarianEvolution, () => 0),
    ).toBe('10177')
    expect(
      resolveEvolutionTargetForm(darumaka, galarianEvolution, () => 0.949999),
    ).toBe('10177')
    expect(
      resolveEvolutionTargetForm(darumaka, galarianEvolution, () => 0.95),
    ).toBe('10178')
  })
})
