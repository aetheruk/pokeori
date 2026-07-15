import type { CollectionConfig } from 'payload'
import superAdminCheck, { adminOrAuthenticated, adminOrUserOwned } from '@/utilities/access'

export const ExpeditionRuns: CollectionConfig = {
  slug: 'expedition-runs',
  admin: {
    useAsTitle: 'expeditionName',
  },
  access: {
    admin: superAdminCheck,
    create: adminOrAuthenticated,
    read: adminOrUserOwned,
    update: adminOrUserOwned,
    delete: adminOrUserOwned,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    {
      name: 'expeditionId',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'expeditionName',
      type: 'text',
      required: true,
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'active',
      options: [
        { label: 'Active', value: 'active' },
        { label: 'Ready To Claim', value: 'ready_to_claim' },
      ],
      index: true,
    },
    {
      name: 'mapItemId',
      type: 'text',
      required: false,
    },
    {
      name: 'maxLosses',
      type: 'number',
      required: true,
    },
    {
      name: 'losses',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'currentStepIndex',
      type: 'number',
      required: true,
      defaultValue: 0,
    },
    {
      name: 'totalSteps',
      type: 'number',
      required: true,
    },
    {
      name: 'steps',
      type: 'json',
      required: true,
      defaultValue: [],
    },
    {
      name: 'startedAt',
      type: 'date',
      required: true,
    },
    {
      name: 'completedAt',
      type: 'date',
    },
  ],
}
