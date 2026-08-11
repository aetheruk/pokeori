import 'dotenv/config'

import { getPayload } from 'payload'
import payloadConfig from '../src/payload.config'

type Phase = 'prepare' | 'finalize'
type Document = Record<string, any> & { _id: any }

type UniqueIndexPlan = {
  slug: string
  keys: Record<string, 1 | -1>
  name: string
  merge: (documents: Document[]) => Record<string, unknown>
}

type QueryIndexPlan = {
  slug: string
  keys: Record<string, 1 | -1>
  name: string
}

const numericMax = (documents: Document[], field: string) =>
  Math.max(0, ...documents.map((document) => Number(document[field] || 0)))

const booleanAny = (documents: Document[], field: string) =>
  documents.some((document) => document[field] === true)

const earliest = (documents: Document[], field: string) =>
  documents
    .map((document) => document[field])
    .filter(Boolean)
    .sort((left, right) => new Date(left).getTime() - new Date(right).getTime())[0]

const latest = (documents: Document[], field: string) =>
  documents
    .map((document) => document[field])
    .filter(Boolean)
    .sort((left, right) => new Date(right).getTime() - new Date(left).getTime())[0]

const mergeQuantity = (field: string) => (documents: Document[]) => ({
  [field]: numericMax(documents, field),
})

const uniqueIndexes: UniqueIndexPlan[] = [
  {
    slug: 'economy-action-receipts',
    keys: { key: 1 },
    name: 'key_1',
    merge: (documents) => {
      const latestDocument = [...documents].sort(
        (left, right) =>
          new Date(right.committedAt || right.createdAt || 0).getTime() -
          new Date(left.committedAt || left.createdAt || 0).getTime(),
      )[0]
      return {
        response: latestDocument?.response,
        committedAt: latestDocument?.committedAt,
      }
    },
  },
  {
    slug: 'user-inventory-items',
    keys: { user: 1, itemId: 1 },
    name: 'user_item_unique',
    merge: mergeQuantity('quantity'),
  },
  {
    slug: 'user-pokedex-entries',
    keys: { user: 1, speciesId: 1, formId: 1 },
    name: 'user_species_form_unique',
    merge: (documents) => ({
      seen: booleanAny(documents, 'seen'),
      caught: booleanAny(documents, 'caught'),
      totalSeen: numericMax(documents, 'totalSeen'),
      totalCaught: numericMax(documents, 'totalCaught'),
      shinySeen: booleanAny(documents, 'shinySeen'),
      shinyCaught: booleanAny(documents, 'shinyCaught'),
      raritiesCaught: [
        ...new Set(
          documents.flatMap((document) =>
            Array.isArray(document.raritiesCaught) ? document.raritiesCaught : [],
          ),
        ),
      ],
      researchXp: numericMax(documents, 'researchXp'),
      researchLevel: numericMax(documents, 'researchLevel'),
      preferredBattleStance:
        [...documents]
          .sort(
            (left, right) =>
              new Date(right.updatedAt || 0).getTime() -
              new Date(left.updatedAt || 0).getTime(),
          )
          .find((document) => document.preferredBattleStance)
          ?.preferredBattleStance,
    }),
  },
  {
    slug: 'user-abilitydex-entries',
    keys: { user: 1, abilityId: 1 },
    name: 'user_ability_unique',
    merge: (documents) => ({
      registered: booleanAny(documents, 'registered'),
      firstRegisteredAt: earliest(documents, 'firstRegisteredAt'),
      source: documents.find((document) => document.source)?.source,
    }),
  },
  {
    slug: 'user-task-progress',
    keys: { user: 1, taskId: 1 },
    name: 'user_task_unique',
    merge: (documents) => ({
      count: numericMax(documents, 'count'),
      completedAt: earliest(documents, 'completedAt'),
      lastCompletedAt: latest(documents, 'lastCompletedAt'),
    }),
  },
  {
    slug: 'user-activity-stats',
    keys: { user: 1, activityType: 1, activityId: 1 },
    name: 'user_activity_unique',
    merge: (documents) => ({
      wins: numericMax(documents, 'wins'),
      losses: numericMax(documents, 'losses'),
      highScore: numericMax(documents, 'highScore'),
      lastPlayed: latest(documents, 'lastPlayed'),
      metadata:
        [...documents]
          .sort(
            (left, right) =>
              new Date(right.lastPlayed || 0).getTime() -
              new Date(left.lastPlayed || 0).getTime(),
          )
          .find((document) => document.metadata)?.metadata ?? {},
    }),
  },
  {
    slug: 'user-tcg-cards',
    keys: { user: 1, cardId: 1 },
    name: 'user_card_unique',
    merge: mergeQuantity('quantity'),
  },
  {
    slug: 'user-shop-purchases',
    keys: { user: 1, shopItemId: 1 },
    name: 'user_shop_item_unique',
    merge: (documents) => ({
      count: numericMax(documents, 'count'),
      firstPurchasedAt: earliest(documents, 'firstPurchasedAt'),
      lastPurchasedAt: latest(documents, 'lastPurchasedAt'),
    }),
  },
]

const queryIndexes: QueryIndexPlan[] = [
  {
    slug: 'user-tcg-cards',
    keys: { user: 1, setId: 1 },
    name: 'user_set',
  },
  {
    slug: 'user-eggs',
    keys: { user: 1, status: 1, hatchAt: 1 },
    name: 'user_status_hatch',
  },
  {
    slug: 'expedition-runs',
    keys: { user: 1, status: 1, createdAt: -1 },
    name: 'user_status_created',
  },
  {
    slug: 'pokemon',
    keys: { user: 1, createdAt: -1 },
    name: 'user_created',
  },
  {
    slug: 'pokemon',
    keys: { user: 1, boxId: 1, createdAt: -1 },
    name: 'user_box_created',
  },
  {
    slug: 'pokemon',
    keys: { user: 1, onBattleTeam: 1, battleTeamPosition: 1 },
    name: 'user_team_position',
  },
  {
    slug: 'pokemon',
    keys: { user: 1, isCompanion: 1 },
    name: 'user_companion',
  },
  {
    slug: 'pokemon',
    keys: { user: 1, speciesId: 1, formId: 1 },
    name: 'user_species_form',
  },
  {
    slug: 'pokemon',
    keys: { user: 1, fusedIntoPokemonId: 1 },
    name: 'user_fusion',
  },
]

function parsePhase(): Phase {
  const phaseArgument = process.argv.find((argument) =>
    argument.startsWith('--phase='),
  )
  const phase = phaseArgument?.split('=')[1] || 'prepare'
  if (phase !== 'prepare' && phase !== 'finalize') {
    throw new Error('Expected --phase=prepare or --phase=finalize')
  }
  return phase
}

function compactUndefined(value: Record<string, unknown>) {
  return Object.fromEntries(
    Object.entries(value).filter(([, entry]) => entry !== undefined),
  )
}

async function reconcileDuplicates(
  collection: any,
  plan: UniqueIndexPlan,
  dryRun: boolean,
) {
  const groupId = Object.fromEntries(
    Object.keys(plan.keys).map((field) => [field, `$${field}`]),
  )
  const duplicateGroups = await collection
    .aggregate([
      { $group: { _id: groupId, ids: { $push: '$_id' }, count: { $sum: 1 } } },
      { $match: { count: { $gt: 1 } } },
    ])
    .toArray()

  for (const group of duplicateGroups) {
    const documents = await collection
      .find({ _id: { $in: group.ids } })
      .sort({ createdAt: 1, _id: 1 })
      .toArray()
    const [keeper, ...duplicates] = documents
    const merged = compactUndefined(plan.merge(documents))

    if (!dryRun && keeper) {
      await collection.updateOne({ _id: keeper._id }, { $set: merged })
      await collection.deleteMany({
        _id: { $in: duplicates.map((document: Document) => document._id) },
      })
    }
  }

  return duplicateGroups.length
}

async function backfillPokedexRarities(payload: any, dryRun: boolean) {
  const pokemon = payload.db.collections.pokemon?.collection
  const pokedex =
    payload.db.collections['user-pokedex-entries']?.collection
  if (!pokemon || !pokedex) {
    throw new Error('Missing Pokemon or Pokedex collection for rarity backfill')
  }

  const ownedForms = await pokemon
    .aggregate([
      {
        $match: {
          $or: [
            { fusedIntoPokemonId: { $exists: false } },
            { fusedIntoPokemonId: null },
            { fusedIntoPokemonId: '' },
          ],
        },
      },
      {
        $project: {
          user: 1,
          speciesId: 1,
          formId: 1,
          rarity: {
            $ifNull: [
              '$rarity',
              {
                $switch: {
                  branches: [
                    { case: { $eq: ['$isRadiant', true] }, then: 'radiant' },
                    { case: { $eq: ['$isShadow', true] }, then: 'shadow' },
                    { case: { $eq: ['$shiny', true] }, then: 'shiny' },
                  ],
                  default: 'normal',
                },
              },
            ],
          },
        },
      },
      {
        $group: {
          _id: {
            user: '$user',
            speciesId: '$speciesId',
            formId: '$formId',
          },
          rarities: { $addToSet: '$rarity' },
        },
      },
    ])
    .toArray()

  if (!dryRun && ownedForms.length > 0) {
    await pokedex.bulkWrite(
      ownedForms.map((entry: any) => ({
        updateOne: {
          filter: entry._id,
          update: {
            $set: { seen: true, caught: true },
            $setOnInsert: {
              totalSeen: 1,
              totalCaught: 1,
              researchXp: 0,
              researchLevel: 0,
            },
            $addToSet: {
              raritiesCaught: { $each: entry.rarities },
            },
          },
          upsert: true,
        },
      })),
      { ordered: false },
    )
  }

  console.log(
    `${dryRun ? 'Would backfill' : 'Backfilled'} ${ownedForms.length} owned Pokedex form rarity ledger(s)`,
  )
}

async function repairInvalidEconomyBalances(payload: any, dryRun: boolean) {
  const repairs = [
    { slug: 'user-inventory-items', fields: ['quantity'] },
    { slug: 'user-tcg-cards', fields: ['quantity'] },
    { slug: 'user-shop-purchases', fields: ['count'] },
    { slug: 'user-task-progress', fields: ['count'] },
    {
      slug: 'user-activity-stats',
      fields: ['wins', 'losses', 'highScore'],
    },
  ]
  let repairedRows = 0

  for (const repair of repairs) {
    const collection = (payload.db.collections as any)[repair.slug]?.collection
    if (!collection) throw new Error(`Missing collection model for ${repair.slug}`)
    for (const field of repair.fields) {
      const filter = { [field]: { $lt: 0 } }
      const count = await collection.countDocuments(filter)
      repairedRows += count
      if (!dryRun && count > 0) {
        await collection.updateMany(filter, { $set: { [field]: 0 } })
      }
      console.log(
        `${dryRun ? 'Would repair' : 'Repaired'} ${count} negative ${repair.slug}.${field} value(s)`,
      )
    }
  }

  const users = (payload.db.collections as any).users?.collection
  if (!users) throw new Error('Missing users collection model')
  const currencyFields = [
    'crystals',
    'mega-shards',
    'pokedollars',
    'fun-tokens',
    'battle-points',
    'berry-powder',
    'prof-scrip',
    'league-ticket',
  ]
  for (const currency of currencyFields) {
    const field = `currency.${currency}`
    const filter = { [field]: { $lt: 0 } }
    const count = await users.countDocuments(filter)
    repairedRows += count
    if (!dryRun && count > 0) {
      await users.updateMany(filter, { $set: { [field]: 0 } })
    }
    console.log(
      `${dryRun ? 'Would repair' : 'Repaired'} ${count} negative ${field} value(s)`,
    )
  }

  return repairedRows
}

async function main() {
  if (process.argv.includes('--help') || process.argv.includes('-h')) {
    console.log(`Usage: bun run migrate:performance-indexes -- [options]

Options:
  --phase=prepare   Reconcile duplicates and create non-unique query indexes.
  --phase=finalize  Re-audit duplicates and create unique compound indexes.
  --dry-run         Report proposed operations without changing MongoDB.`)
    return
  }

  const phase = parsePhase()
  const dryRun = process.argv.includes('--dry-run')
  const payload = await getPayload({ config: payloadConfig })
  const mongoAdmin = payload.db.connection.db?.admin()
  if (!mongoAdmin) throw new Error('MongoDB connection is unavailable')
  const topology = await mongoAdmin.command({ hello: 1 })
  if (!topology.setName || !topology.logicalSessionTimeoutMinutes) {
    throw new Error(
      'MongoDB must run as a replica set with session support before economy migrations can run.',
    )
  }
  let duplicateGroups = 0
  const repairedBalances = await repairInvalidEconomyBalances(payload as any, dryRun)

  for (const plan of uniqueIndexes) {
    const collection = (payload.db.collections as any)[plan.slug]?.collection
    if (!collection) throw new Error(`Missing collection model for ${plan.slug}`)
    const count = await reconcileDuplicates(collection, plan, dryRun)
    duplicateGroups += count
    console.log(`${plan.slug}: ${count} duplicate group(s)`)
  }

  await backfillPokedexRarities(payload as any, dryRun)

  for (const plan of queryIndexes) {
    const collection = (payload.db.collections as any)[plan.slug]?.collection
    if (!collection) throw new Error(`Missing collection model for ${plan.slug}`)
    if (!dryRun) {
      await collection.createIndex(plan.keys, { name: plan.name })
    }
    console.log(`${dryRun ? 'Would create' : 'Ensured'} ${plan.slug}.${plan.name}`)
  }

  if (phase === 'finalize') {
    for (const plan of uniqueIndexes) {
      const collection = (payload.db.collections as any)[plan.slug]?.collection
      if (!dryRun) {
        await collection.createIndex(plan.keys, {
          name: plan.name,
          unique: true,
        })
      }
      console.log(`${dryRun ? 'Would create' : 'Ensured'} ${plan.slug}.${plan.name}`)
    }
  }

  console.log(
    `${dryRun ? 'Dry run' : 'Migration'} complete (${phase}): ${duplicateGroups} duplicate group(s) found, ${repairedBalances} invalid balance(s) found.`,
  )
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error('Performance index migration failed:', error)
    process.exit(1)
  })
