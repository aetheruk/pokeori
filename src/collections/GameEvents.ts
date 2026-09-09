import type { CollectionConfig } from 'payload'

const serverOnly = {
  create: () => false,
  read: () => false,
  update: () => false,
  delete: () => false,
}

export const GameEvents: CollectionConfig = {
  slug: 'game-events',
  admin: { hidden: true },
  access: serverOnly,
  fields: [
    { name: 'id', type: 'text', required: true },
    {
      name: 'status',
      type: 'select',
      options: ['draft', 'published', 'cancelled'],
      required: true,
    },
    { name: 'startAt', type: 'date', required: true, index: true },
    { name: 'endAt', type: 'date', required: true, index: true },
    { name: 'definition', type: 'json', required: true },
    { name: 'revision', type: 'number', required: true },
    {
      name: 'createdBy',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
  ],
}
export const EventParticipation: CollectionConfig = {
  slug: 'event-participation',
  admin: { hidden: true },
  access: serverOnly,
  fields: [
    { name: 'id', type: 'text', required: true },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    { name: 'eventId', type: 'text', required: true, index: true },
    { name: 'activityId', type: 'text', required: true },
    { name: 'acceptedAt', type: 'date', required: true },
    { name: 'readyAt', type: 'date' },
    { name: 'claimedAt', type: 'date' },
    { name: 'snapshot', type: 'json', required: true },
    { name: 'progress', type: 'json', defaultValue: {} },
  ],
}
export const EventAudit: CollectionConfig = {
  slug: 'event-audit',
  admin: { hidden: true },
  access: serverOnly,
  fields: [
    { name: 'eventId', type: 'text', required: true, index: true },
    {
      name: 'actor',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    { name: 'action', type: 'text', required: true },
    { name: 'revision', type: 'number', required: true },
  ],
}
export const EventDeliveries: CollectionConfig = {
  slug: 'event-deliveries',
  admin: { hidden: true },
  access: serverOnly,
  fields: [
    { name: 'id', type: 'text', required: true },
    { name: 'eventId', type: 'text', required: true, index: true },
    { name: 'subscriptionId', type: 'text', required: true },
    {
      name: 'outcome',
      type: 'select',
      options: ['sent', 'ineligible'],
      required: true,
    },
  ],
}
