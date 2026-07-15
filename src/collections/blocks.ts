import type { Block } from 'payload'
import { items } from '../data/items'
import { currencies } from '../data/currencies'
import { tcgSets } from '../data/tcg'
import { skills } from '../data/skills'
import { battles } from '../data/battles'
import { locations } from '../data/locations'
import { research } from '../data/games'
import { expeditions } from '../data/expeditions'
import pokemonData from '../data/pokemon-data'

const itemOptions = items.map((item) => ({
  label: item.name,
  value: item.id,
}))

const currencyOptions = currencies.map((currency) => ({
  label: currency.name,
  value: currency.id,
}))

const setOptions = tcgSets.map((set) => ({
  label: set.name,
  value: set.id,
}))

const skillOptions = skills.map((skill) => ({
  label: skill.name,
  value: skill.id,
}))

const battleOptions = battles.map((battle) => ({
  label: battle.name,
  value: battle.id,
}))

const locationOptions = locations.map((location) => ({
  label: location.name,
  value: location.id,
}))

const researchOptions = research.map((encounter) => ({
  label: encounter.name,
  value: encounter.id,
}))

const expeditionOptions = expeditions.map((expedition) => ({
  label: expedition.name,
  value: expedition.id,
}))

const pokemonOptions = pokemonData.map((species) => {
  const baseForm = species.forms.find((f) => f.form === 'base') || species.forms[0]
  return {
    label: baseForm.name,
    value: String(species.id),
  }
})

export const TaskConditionBlock: Block = {
  slug: 'taskCondition',
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'User Level', value: 'user_level' },
        { label: 'Item Owned', value: 'item_owned' },
        { label: 'Currency Owned', value: 'currency_owned' },
        { label: 'Pokemon Owned', value: 'pokemon_owned' },
        { label: 'Card Collected (Total)', value: 'card_collected_total' },
        { label: 'Card Collected (Set)', value: 'card_collected_set' },
        { label: 'Card Collected (Specific)', value: 'card_collected_specific' },
        { label: 'Pokedex Seen (Total)', value: 'pokedex_seen_total' },
        { label: 'Pokedex Caught (Total)', value: 'pokedex_caught_total' },
        { label: 'Pokedex Seen (Specific)', value: 'pokedex_seen_specific' },
        { label: 'Pokedex Caught (Specific)', value: 'pokedex_caught_specific' },
        { label: 'Task Completed', value: 'task_completed' },
        { label: 'Battle Result', value: 'battle_result' },
        { label: 'Location Encounter Result', value: 'location_encounter_result' },
        { label: 'Research Encounter Result', value: 'research_encounter_result' },
        { label: 'Expedition Result', value: 'expedition_result' },
        { label: 'Time Range', value: 'time_range' },
        { label: 'Date Range', value: 'date_range' },
        { label: 'Power Usage', value: 'power_usage' },
        { label: 'Total Evolutions', value: 'total_evolutions' },
        { label: 'Weather', value: 'weather' },
      ],
    },
    {
      name: 'targetItemId',
      type: 'select',
      options: itemOptions,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'item_owned',
      },
    },
    {
      name: 'targetBattleId',
      type: 'select',
      options: battleOptions,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'battle_result',
      },
    },
    {
      name: 'targetLocationId',
      type: 'select',
      options: locationOptions,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'location_encounter_result',
      },
    },
    {
      name: 'targetResearchEncounterId',
      type: 'select',
      options: researchOptions,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'research_encounter_result',
      },
    },
    {
      name: 'targetExpeditionId',
      type: 'select',
      options: expeditionOptions,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'expedition_result',
      },
    },
    {
      name: 'battleStatus',
      type: 'select',
      options: [
        { label: 'Win', value: 'win' },
        { label: 'Loss', value: 'loss' },
      ],
      defaultValue: 'win',
      admin: {
        condition: (_, siblingData) =>
          siblingData.type === 'battle_result' ||
          siblingData.type === 'location_encounter_result' ||
          siblingData.type === 'research_encounter_result',
      },
    },
    {
      name: 'expeditionStatus',
      type: 'select',
      options: [
        { label: 'Completed', value: 'completed' },
        { label: 'Failed', value: 'failed' },
      ],
      defaultValue: 'completed',
      admin: {
        condition: (_, siblingData) => siblingData.type === 'expedition_result',
      },
    },
    {
      name: 'itemPreview',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/admin/ItemPreview',
        },
        condition: (_, siblingData) =>
          siblingData.type === 'item_owned' && siblingData.targetItemId,
      },
    },
    {
      name: 'targetCurrencyId',
      type: 'select',
      options: currencyOptions,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'currency_owned',
      },
    },
    {
      name: 'targetSetId',
      type: 'select',
      options: setOptions,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'card_collected_set',
      },
    },
    {
      name: 'targetSkillId',
      type: 'select',
      options: skillOptions,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'user_level',
      },
    },
    {
      name: 'targetId',
      type: 'text',
      admin: {
        condition: (_, siblingData) =>
          ![
            'user_level',
            'item_owned',
            'currency_owned',
            'card_collected_set',
            'card_collected_total',
            'pokedex_seen_total',
            'pokedex_caught_total',
            'battle_result',
            'location_encounter_result',
            'research_encounter_result',
            'expedition_result',
            'time_range',
            'date_range',
            'power_usage',
          ].includes(siblingData.type),
      },
    },
    {
      name: 'count',
      type: 'number',
      admin: {
        condition: (_, siblingData) =>
          ![
            'task_completed',
            'pokedex_seen_specific',
            'pokedex_caught_specific',
            'time_range',
            'date_range',
          ].includes(siblingData.type),
      },
    },
    {
      name: 'powerType',
      type: 'select',
      options: [
        { label: 'Tera', value: 'tera' },
        { label: 'Mega Evolution', value: 'mega' },
        { label: 'Z-Move', value: 'z-move' },
        { label: 'Dynamax', value: 'dynamax' },
      ],
      admin: {
        condition: (_, siblingData) => siblingData.type === 'power_usage',
      },
    },
    {
      name: 'consume',
      type: 'checkbox',
      label: 'Consume on Completion',
      admin: {
        condition: (_, siblingData) =>
          ['item_owned', 'currency_owned', 'pokemon_owned'].includes(siblingData.type),
      },
    },
    {
      name: 'unique',
      type: 'checkbox',
      label: 'Unique Count Only',
      admin: {
        condition: (_, siblingData) =>
          ['card_collected_total', 'card_collected_set'].includes(siblingData.type),
      },
    },
    {
      name: 'pokemonCriteria',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData.type === 'pokemon_owned',
      },
      fields: [
        { name: 'type', type: 'text', label: 'Type (e.g. Fire)' },
        { name: 'speciesId', type: 'number', label: 'Species ID' },
        { name: 'formId', type: 'text', label: 'Form ID' },
        { name: 'minLevel', type: 'number' },
        { name: 'maxLevel', type: 'number' },
        {
          name: 'size',
          type: 'select',
          options: ['XS', 'S', 'L', 'XL'],
        },
        { name: 'shiny', type: 'checkbox' },
        { name: 'identified', type: 'checkbox' },
        {
          name: 'ivs',
          type: 'group',
          fields: [
            { name: 'hp', type: 'number' },
            { name: 'attack', type: 'number' },
            { name: 'defense', type: 'number' },
            { name: 'specialAttack', type: 'number' },
            { name: 'specialDefense', type: 'number' },
            { name: 'speed', type: 'number' },
          ],
        },
      ],
    },
    {
      name: 'timeRange',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData.type === 'time_range',
      },
      fields: [
        { name: 'start', type: 'text', label: 'Start Time (HH:mm)' },
        { name: 'end', type: 'text', label: 'End Time (HH:mm)' },
      ],
    },
    {
      name: 'dateRange',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData.type === 'date_range',
      },
      fields: [
        { name: 'start', type: 'text', label: 'Start Date (YYYY-MM-DD)' },
        { name: 'end', type: 'text', label: 'End Date (YYYY-MM-DD)' },
      ],
    },
  ],
}

export const RewardBlock: Block = {
  slug: 'reward',
  fields: [
    {
      name: 'type',
      type: 'select',
      required: true,
      options: [
        { label: 'Item', value: 'item' },
        { label: 'Pokemon', value: 'pokemon' },
        { label: 'Card', value: 'card' },
        { label: 'XP', value: 'xp' },
        { label: 'Currency', value: 'currency' },
        { label: 'Task Complete', value: 'task_complete' },
      ],
    },
    {
      name: 'dropChance',
      type: 'number',
      required: true,
      defaultValue: 100,
      min: 0,
      max: 100,
    },
    {
      name: 'targetItemId',
      type: 'select',
      options: itemOptions,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'item',
      },
    },
    {
      name: 'itemPreview',
      type: 'ui',
      admin: {
        components: {
          Field: '@/components/admin/ItemPreview',
        },
        condition: (_, siblingData) => siblingData.type === 'item' && siblingData.targetItemId,
      },
    },
    {
      name: 'targetId',
      type: 'text',
      admin: {
        condition: (_, siblingData) => ['pokemon', 'task_complete'].includes(siblingData.type),
      },
    },
    {
      name: 'skill',
      type: 'select',
      options: skillOptions,
      defaultValue: 'catching',
      admin: {
        condition: (_, siblingData) => siblingData.type === 'xp',
      },
    },
    {
      name: 'currencyType',
      type: 'select',
      options: currencyOptions,
      admin: {
        condition: (_, siblingData) => siblingData.type === 'currency',
      },
    },
    {
      name: 'quantity',
      type: 'group',
      fields: [
        { name: 'min', type: 'number', required: true, defaultValue: 1 },
        { name: 'max', type: 'number' }, // If max is present, it's a range
      ],
    },
    {
      name: 'cardDrawParams',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData.type === 'card',
      },
      fields: [
        {
          name: 'allowedSetIds',
          type: 'array',
          fields: [
            {
              name: 'id',
              type: 'select',
              options: setOptions,
            },
          ],
        },
        {
          name: 'allowedPokemonIds',
          type: 'array',
          fields: [
            {
              name: 'id',
              type: 'select',
              options: pokemonOptions,
            },
          ],
        },
        { name: 'allowedCardIds', type: 'array', fields: [{ name: 'id', type: 'text' }] },
        { name: 'rarityModifier', type: 'number' },
        { name: 'bonusThreshold', type: 'number' },
        { name: 'qty', type: 'number', defaultValue: 1 },
      ],
    },
    {
      name: 'pokemonData',
      type: 'group',
      admin: {
        condition: (_, siblingData) => siblingData.type === 'pokemon',
      },
      fields: [
        { name: 'level', type: 'number' },
        { name: 'formId', type: 'text' },
        { name: 'shiny', type: 'checkbox' },
        { name: 'ballType', type: 'text' },
        { name: 'nature', type: 'text' },
      ],
    },
  ],
}
