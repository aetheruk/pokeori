import type { CollectionConfig } from 'payload'

/** Push endpoints are credentials; only the authenticated server actions access them. */
export const PushSubscriptions: CollectionConfig = {
  slug: 'push-subscriptions',
  admin: { hidden: true },
  access: {
    create: () => false,
    read: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    // The endpoint hash is the primary key, including when production autoIndex is off.
    { name: 'id', type: 'text', required: true },
    { name: 'user', type: 'relationship', relationTo: 'users', required: true, index: true },
    { name: 'subscription', type: 'json', required: true },
    { name: 'voyages', type: 'checkbox', defaultValue: false },
    { name: 'dailyReset', type: 'checkbox', defaultValue: false },
    { name: 'gameEvents', type: 'checkbox', defaultValue: false },
    { name: 'eventsEnabledAt', type: 'date' },
    { name: 'voyagesEnabledAt', type: 'date' },
    { name: 'dailyCursor', type: 'date', required: true },
    { name: 'sentVoyages', type: 'json', defaultValue: [] },
    { name: 'nextCheckAt', type: 'date', required: true, index: true },
    { name: 'failures', type: 'number', defaultValue: 0 },
  ],
}
