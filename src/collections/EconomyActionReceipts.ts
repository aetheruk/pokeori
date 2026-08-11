import type { CollectionConfig } from 'payload'
import superAdminCheck, { adminOrUserOwned } from '@/utilities/access'

/**
 * Durable idempotency receipts for player-facing economic actions.
 *
 * A receipt is inserted in the same MongoDB transaction as the action it
 * represents. Replaying the same key therefore returns the committed response
 * without charging or rewarding the player a second time.
 */
export const EconomyActionReceipts: CollectionConfig = {
  slug: 'economy-action-receipts',
  admin: {
    useAsTitle: 'action',
  },
  access: {
    admin: superAdminCheck,
    create: superAdminCheck,
    read: adminOrUserOwned,
    update: superAdminCheck,
    delete: superAdminCheck,
  },
  fields: [
    {
      name: 'key',
      type: 'text',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      index: true,
    },
    {
      name: 'action',
      type: 'text',
      required: true,
      index: true,
    },
    {
      name: 'requestId',
      type: 'text',
      required: true,
    },
    {
      name: 'response',
      type: 'json',
      required: true,
    },
    {
      name: 'committedAt',
      type: 'date',
      required: true,
      index: true,
    },
  ],
}
