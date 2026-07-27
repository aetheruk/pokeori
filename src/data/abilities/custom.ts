import type { AbilityConfig } from './types'

export const customAbilities: AbilityConfig[] = [
  {
    id: 'backup',
    name: 'Backup',
    description:
      'While Porygon is your partner, normal catch encounters have a 1-in-50 chance to be replaced by Porygon.',
    type: 'encounter',
    value: 1,
    rate: 2,
    forms: ['137'],
    encounters: [{ speciesId: 137, formId: '137', chance: 100 }],
    effects: [
      {
        type: 'battle-no-single-battle-effect',
        reason: 'Backup is a companion encounter ability.',
      },
    ],
  },
  {
    id: 'lets_go',
    name: "Let's Go",
    description:
      'While Pikachu is your partner, normal catch encounters have a 1-in-32 chance to be replaced by Eevee.',
    type: 'encounter',
    value: 1,
    rate: 3.125,
    forms: ['25'],
    encounters: [{ speciesId: 133, formId: '133', chance: 100 }],
    effects: [
      {
        type: 'battle-no-single-battle-effect',
        reason: 'Let’s Go is a companion encounter ability.',
      },
    ],
  },
]
