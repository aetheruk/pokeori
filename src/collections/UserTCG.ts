import type { CollectionConfig } from 'payload'
import superAdminCheck, { adminOrUserOwned } from '@/utilities/access'

export const UserTCG: CollectionConfig = {
  slug: 'user-tcg',
  admin: {
    useAsTitle: 'id',
  },
  access: {
    admin: superAdminCheck,
    create: superAdminCheck,
    read: adminOrUserOwned,
    update: adminOrUserOwned,
    delete: superAdminCheck,
  },
  fields: [
    {
      name: 'user',
      type: 'relationship',
      relationTo: 'users',
      required: true,
      unique: true,
      index: true,
    },
    {
      name: 'cards',
      type: 'json',
      defaultValue: {},
      admin: {
        description: 'Map of cardId to quantity',
      },
      required: true,
    },
  ],
}
