// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { resendAdapter } from '@payloadcms/email-resend'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'node:path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'node:url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import {
  UserActivityStats,
  UserAbilityDexEntries,
  UserInventoryItems,
  UserPokedexEntries,
  UserShopPurchases,
  UserTaskProgress,
  UserTcgCards,
} from './collections/UserState'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

import { Pokemon } from './collections/Pokemon'
import { ExpeditionRuns } from './collections/ExpeditionRuns'

const requiredEnv = (name: string) => {
  const value = process.env[name]
  if (process.env.NODE_ENV === 'production' && !value) {
    throw new Error(`Missing required environment variable: ${name}`)
  }
  return value || ''
}

const databaseUrl = requiredEnv('DATABASE_URI')

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Pokemon,
    ExpeditionRuns,
    UserInventoryItems,
    UserPokedexEntries,
    UserAbilityDexEntries,
    UserTaskProgress,
    UserActivityStats,
    UserTcgCards,
    UserShopPurchases,
  ],
  editor: lexicalEditor(),
  email: resendAdapter({
    defaultFromAddress: 'noreply@pokemon.theaether.co.uk',
    defaultFromName: 'Pokeori',
    apiKey: requiredEnv('RESEND_API_KEY'),
  }),
  secret: requiredEnv('PAYLOAD_SECRET'),
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
    autoGenerate: false,
  },
  db: mongooseAdapter({
    url: databaseUrl,
  }),
  sharp,
  plugins: [
    // storage-adapter-placeholder
  ],
})
