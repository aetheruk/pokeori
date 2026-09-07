import { describe, expect, test } from 'bun:test'
import { Users } from '@/collections/Users'

// Payload adds auth/timestamp fields to this shared config object when another
// suite initializes it. Keep this assertion scoped to authored game fields.
const authoredSource = await Bun.file('src/collections/Users.ts').text()
const authoredFieldNames = new Set(
  [...authoredSource.matchAll(/^ {6}name: '([^']+)'/gm)].map((match) => match[1]),
)

describe('user account security boundary', () => {
  const player = { id: 'player', isAdmin: false }
  const admin = { id: 'admin', isAdmin: true }

  test('generic registration is denied and record updates stay owner scoped', async () => {
    expect(await Users.access!.create!({ req: { user: null } } as any)).toBe(false)
    expect(await Users.access!.create!({ req: { user: player } } as any)).toBe(false)
    expect(await Users.access!.create!({ req: { user: admin } } as any)).toBe(true)
    expect(await Users.access!.update!({ req: { user: player } } as any))
      .toEqual({ id: { equals: 'player' } })
    expect(await Users.access!.update!({ req: { user: null } } as any)).toBe(false)
  })

  test('only admins can unlock accounts, including when a player forges admin input', async () => {
    for (const user of [null, player]) {
      expect(await Users.access!.unlock!({
        req: { user }, data: { isAdmin: true },
      } as any)).toBe(false)
    }
    expect(await Users.access!.unlock!({ req: { user: admin } } as any)).toBe(true)
  })

  test('all authored game fields deny public and player create/update requests', async () => {
    for (const field of Users.fields) {
      if (!('name' in field) || !authoredFieldNames.has(field.name) || field.type === 'join' || field.type === 'ui' || field.name === 'trainerName') continue
      for (const operation of ['create', 'update'] as const) {
        const access = field.access?.[operation]
        expect(access, `${field.name}.${operation} must be protected`).toBeFunction()
        for (const user of [null, player]) {
          expect(await access!({
            req: { user },
            data: { isAdmin: true, currency: { pokedollars: 999999 } },
            siblingData: { isAdmin: true },
          } as any), `${field.name}.${operation}`).toBe(false)
        }
        expect(await access!({ req: { user: admin } } as any)).toBe(true)
      }
    }
  })

  test('trainer identity and initial safe defaults remain available', () => {
    const trainerName = Users.fields.find((f) => 'name' in f && f.name === 'trainerName') as any
    const isAdmin = Users.fields.find((f) => 'name' in f && f.name === 'isAdmin') as any
    const kidMode = Users.fields.find((f) => 'name' in f && f.name === 'kidMode') as any
    expect(trainerName.required).toBe(true)
    expect(trainerName.access?.create).toBeUndefined()
    expect(isAdmin.defaultValue).toBe(false)
    expect(kidMode.defaultValue).toBe(false)
  })
})
