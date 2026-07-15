import type {
  FieldObservationGlobalItemEvent,
  FieldObservationGlobalPokemonEvent,
} from './types'

const notOwned = (itemId: string) => ({
  type: 'item_owned' as const,
  targetId: itemId,
  inverse: true,
})
const clearBellRequirement = { type: 'item_owned' as const, targetId: 'clear-bell' }

export const fieldObservationGlobalPokemonEvents: FieldObservationGlobalPokemonEvent[] = [
  {
    id: 'field-observation-entei',
    speciesId: 244,
    formId: '244',
    odds: 256,
    requirements: [
      clearBellRequirement,
      notOwned('token-of-fire'),
      notOwned('lifeless-fire'),
      notOwned('concentrated-fire'),
    ],
  },
  {
    id: 'field-observation-raikou',
    speciesId: 243,
    formId: '243',
    odds: 256,
    requirements: [
      clearBellRequirement,
      notOwned('token-of-thunder'),
      notOwned('lifeless-thunder'),
      notOwned('concentrated-thunder'),
    ],
  },
  {
    id: 'field-observation-suicune',
    speciesId: 245,
    formId: '245',
    odds: 256,
    requirements: [
      clearBellRequirement,
      notOwned('token-of-water'),
      notOwned('lifeless-water'),
      notOwned('concentrated-water'),
    ],
  },
  {
    id: 'field-observation-moltres',
    speciesId: 146,
    formId: '146',
    odds: 256,
    requirements: [
      notOwned('flaming-twig'),
      notOwned('lifeless-flaming-branch'),
      notOwned('concentrated-flaming-branch'),
    ],
  },
  {
    id: 'field-observation-zapdos',
    speciesId: 145,
    formId: '145',
    odds: 256,
    requirements: [
      notOwned('charged-twig'),
      notOwned('lifeless-charged-branch'),
      notOwned('concentrated-charged-branch'),
    ],
  },
  {
    id: 'field-observation-articuno',
    speciesId: 144,
    formId: '144',
    odds: 256,
    requirements: [
      notOwned('frozen-twig'),
      notOwned('lifeless-frozen-branch'),
      notOwned('concentrated-frozen-branch'),
    ],
  },
]

export const fieldObservationGlobalItemEvents: FieldObservationGlobalItemEvent[] = [
  {
    id: 'global-field-observation-repel',
    itemId: 'repel',
    dropChance: 5,
    requirements: [{ type: 'skill_level', targetId: 'catching', count: 20 }],
  },
  {
    id: 'global-field-observation-escape-rope',
    itemId: 'escape-rope',
    dropChance: 5,
  },
  {
    id: 'global-field-observation-researchers-journal-page',
    itemId: 'researchers-journal-page',
    dropChance: 33,
  },
  {
    id: 'global-field-observation-researchers-journal-volume',
    itemId: 'researchers-journal-volume',
    dropChance: 10,
  },
  {
    id: 'global-field-observation-researchers-journal-archive',
    itemId: 'researchers-journal-archive',
    dropChance: 1.3,
  },
  {
    id: 'global-field-observation-researchers-journal-compendium',
    itemId: 'researchers-journal-compendium',
    dropChance: 0.4,
  },
]
