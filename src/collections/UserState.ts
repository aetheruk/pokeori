import type { CollectionConfig } from 'payload'
import superAdminCheck, { adminOrUserOwned } from '@/utilities/access'

const serverOwnedAccess = {
  admin: superAdminCheck,
  create: superAdminCheck,
  read: adminOrUserOwned,
  update: superAdminCheck,
  delete: superAdminCheck,
}

export const UserInventoryItems: CollectionConfig = {
  slug: 'user-inventory-items',
  admin: {
    useAsTitle: 'itemId',
  },
  access: serverOwnedAccess,
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    {
      name: 'itemId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'quantity',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
    },
  ],
}

export const UserPokedexEntries: CollectionConfig = {
  slug: 'user-pokedex-entries',
  admin: {
    useAsTitle: 'formId',
  },
  access: serverOwnedAccess,
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    {
      name: 'speciesId',
      type: 'number',
      required: true,
      index: true,
      min: 1,
    },
    {
      name: 'formId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'seen',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'caught',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'totalSeen',
      type: 'number',
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'totalCaught',
      type: 'number',
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'shinySeen',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'shinyCaught',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'researchXp',
      type: 'number',
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'researchLevel',
      type: 'number',
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'preferredBattleStance',
      type: 'select',
      options: [
        { label: 'Power', value: 'power' },
        { label: 'Speed', value: 'speed' },
        { label: 'Tech', value: 'tech' },
      ],
    },
  ],
}

export const UserAbilityDexEntries: CollectionConfig = {
  slug: 'user-abilitydex-entries',
  admin: {
    useAsTitle: 'abilityId',
  },
  access: serverOwnedAccess,
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    {
      name: 'abilityId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'registered',
      type: 'checkbox',
      defaultValue: true,
    },
    {
      name: 'source',
      type: 'text',
      index: true,
    },
    {
      name: 'firstRegisteredAt',
      type: 'date',
    },
  ],
}

export const UserTaskProgress: CollectionConfig = {
  slug: 'user-task-progress',
  admin: {
    useAsTitle: 'taskId',
  },
  access: serverOwnedAccess,
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    {
      name: 'taskId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'count',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'completedAt',
      type: 'date',
    },
    {
      name: 'lastCompletedAt',
      type: 'date',
    },
  ],
}

export const UserActivityStats: CollectionConfig = {
  slug: 'user-activity-stats',
  admin: {
    useAsTitle: 'activityId',
  },
  access: serverOwnedAccess,
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    {
      name: 'activityType',
      type: 'select',
      required: true,
      index: true,
      options: [
        { label: 'Battle', value: 'battle' },
        { label: 'Research', value: 'research' },
        { label: 'Location', value: 'location' },
        { label: 'Expedition', value: 'expedition' },
      ],
    },
    {
      name: 'activityId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'wins',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'losses',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'highScore',
      type: 'number',
      min: 0,
    },
    {
      name: 'lastPlayed',
      type: 'date',
    },
    {
      name: 'metadata',
      type: 'json',
      defaultValue: {},
    },
  ],
}

export const UserTcgCards: CollectionConfig = {
  slug: 'user-tcg-cards',
  admin: {
    useAsTitle: 'cardId',
  },
  access: serverOwnedAccess,
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    {
      name: 'cardId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'setId',
      type: 'text',
      index: true,
    },
    {
      name: 'quantity',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
    },
  ],
}

export const UserShopPurchases: CollectionConfig = {
  slug: 'user-shop-purchases',
  admin: {
    useAsTitle: 'shopItemId',
  },
  access: serverOwnedAccess,
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    {
      name: 'shopItemId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'shopId',
      type: 'text',
      index: true,
    },
    {
      name: 'itemId',
      type: 'text',
      index: true,
    },
    {
      name: 'count',
      type: 'number',
      required: true,
      defaultValue: 0,
      min: 0,
    },
    {
      name: 'firstPurchasedAt',
      type: 'date',
    },
    {
      name: 'lastPurchasedAt',
      type: 'date',
    },
  ],
}

/** Eggs reserve storage but intentionally are not Pokemon records before hatching. */
export const UserEggs: CollectionConfig = {
  slug: 'user-eggs',
  admin: { useAsTitle: 'id' },
  access: serverOwnedAccess,
  fields: [
    { name: 'user', type: 'relationship', relationTo: 'users', required: true, index: true },
    { name: 'foundAt', type: 'date', required: true, index: true },
    { name: 'hatchAt', type: 'date', required: true, index: true },
    { name: 'sourceResearchId', type: 'text', index: true },
    { name: 'status', type: 'select', required: true, defaultValue: 'incubating', index: true, options: [{ label: 'Incubating', value: 'incubating' }, { label: 'Hatched', value: 'hatched' }] },
    { name: 'hatchedPokemonId', type: 'text' },
    { name: 'hatchPoolId', type: 'text' },
  ],
}
