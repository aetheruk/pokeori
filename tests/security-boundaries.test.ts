import { describe, expect, test } from 'bun:test'
import ts from 'typescript6'
import { Pokemon } from '@/collections/Pokemon'
import { ExpeditionRuns } from '@/collections/ExpeditionRuns'
import { EconomyActionReceipts } from '@/collections/EconomyActionReceipts'
import { registrationSchema } from '@/utilities/auth/registration-validation'
import { issueRegistrationInvitation, verifyRegistrationInvitation } from '@/utilities/auth/invitations'

describe('generic game-data authorization', () => {
  test('private settlement receipts cannot be read by their player owner', async () => {
    const access = EconomyActionReceipts.access!.read!
    expect(await access({req: {user: null}} as any)).toBe(false)
    expect(await access({req: {user: {id: 'owner', isAdmin: false}}, id: 'owned-receipt'} as any)).toBe(false)
    expect(await access({req: {user: {id: 'admin', isAdmin: true}}} as any)).toBe(true)
  })
  for (const collection of [Pokemon, ExpeditionRuns]) {
    test(`${collection.slug} only allows administrative writes, including forged ownership/state`, async () => {
      for (const operation of ['create', 'update', 'delete'] as const) {
        const access = collection.access![operation]!
        for (const user of [null, { id: 'owner', isAdmin: false }]) {
          expect(await access({
            req: { user }, id: 'owned-document',
            data: { user: 'owner', isAdmin: true, level: 100, status: 'ready_to_claim' },
          } as any)).toBe(false)
        }
        expect(await access({ req: { user: { id: 'admin', isAdmin: true } } } as any)).toBe(true)
      }
      expect(await collection.access!.read!({ req: { user: { id: 'owner' } } } as any))
        .toEqual({ user: { equals: 'owner' } })
    })
  }
})

async function parseSource(path: string) {
  const source = await Bun.file(path).text()
  return ts.createSourceFile(path, source, ts.ScriptTarget.Latest, true)
}

function publicFunctions(source: ts.SourceFile) {
  return source.statements.filter((node): node is ts.FunctionDeclaration =>
    ts.isFunctionDeclaration(node) && Boolean(node.modifiers?.some((m) => m.kind === ts.SyntaxKind.ExportKeyword)),
  )
}

describe('Server Action export boundary', () => {
  test('trusted helpers cannot be compiled into callable server actions', async () => {
    for (const path of [
      'src/utilities/expeditions/server.ts',
      'src/utilities/tasks/daily-progress.ts',
      'src/utilities/tcg/tcg-card-draw.ts',
      'src/utilities/auth/register-invited-account.ts',
      'src/app/(frontend)/game/_shared/activity-actions.ts',
      'src/app/(frontend)/game/locations/encounter/actions/mechanics-server.ts',
      'src/app/(frontend)/game/battles/helpers/state-management.ts',
      'src/app/(frontend)/game/battles/helpers/win-handler.ts',
      'src/app/(frontend)/game/battles/helpers/turn-finalization.ts',
    ]) {
      const source = await parseSource(path)
      const directives: string[] = []
      const inspect = (node: ts.Node) => {
        if (ts.isExpressionStatement(node) && ts.isStringLiteral(node.expression)) directives.push(node.expression.text)
        ts.forEachChild(node, inspect)
      }
      inspect(source)
      expect(directives, path).not.toContain('use server')
      expect(source.statements.some((n) => ts.isImportDeclaration(n) && ts.isStringLiteral(n.moduleSpecifier) && n.moduleSpecifier.text === 'server-only')).toBe(true)
    }
    const actions = await parseSource('src/app/(frontend)/game/battles/actions.ts')
    const names = publicFunctions(actions).map((n) => n.name?.text)
    for (const name of ['getActiveBattleState', 'handleWin', 'finalizeTurn']) expect(names).not.toContain(name)
    const expedition = await parseSource('src/utilities/expeditions/actions.ts')
    expect(publicFunctions(expedition).map((n) => n.name?.text).sort()).toEqual([
      'abandonExpedition', 'chooseExpeditionBranch', 'claimExpeditionRewards',
      'completeCurrentUserExpeditionTaskStep', 'failCurrentUserExpeditionTaskStep', 'startExpedition',
    ])
    const activities = await parseSource('src/app/(frontend)/game/_shared/activity-actions.ts')
    expect(activities.statements.some((n) => ts.isExpressionStatement(n) && ts.isStringLiteral(n.expression) && n.expression.text === 'use server')).toBe(false)
    for (const fn of publicFunctions(activities)) {
      if (!['getGameActivityStateForUser', 'setGameActivityStateForUser', 'clearGameActivityStateForUser'].includes(fn.name?.text || '')) continue
      expect(fn.body?.statements.some((n) => ts.isExpressionStatement(n) && ts.isStringLiteral(n.expression) && n.expression.text === 'use server'), fn.name?.text).toBe(false)
    }
  })

  test('every developer action checks authorization before accessing files or invoking tools', async () => {
    const source = await parseSource('src/app/dev/actions.ts')
    const exported = publicFunctions(source)
    expect(exported.length).toBeGreaterThan(20)
    for (const fn of exported) {
      expect(fn.body?.statements[0]?.getText(source), fn.name?.text).toBe('await requireDevAdmin()')
    }
  })

  test('developer authorization rejects production and nonadmins before any tool operation', async () => {
    // Isolate framework mocks so other suites continue exercising their own adapters.
    const script = `
      import { mock } from 'bun:test'
      import { strict as assert } from 'node:assert'
      mock.module('server-only', () => ({}))
      mock.module('@/payload.config', () => ({ default: {} }))
      mock.module('next/headers', () => ({ headers: async () => new Headers() }))
      let user = null
      let payloadCalls = 0
      mock.module('payload', () => ({ getPayload: async () => {
        payloadCalls++
        return { auth: async () => ({ user }) }
      } }))
      const { requireDevAdmin } = await import('./src/utilities/dev/authorization.ts')
      process.env.NODE_ENV = 'production'
      user = { id: 'admin', isAdmin: true }
      await assert.rejects(requireDevAdmin(), /disabled in production/)
      assert.equal(payloadCalls, 0)
      process.env.NODE_ENV = 'development'
      user = null
      await assert.rejects(requireDevAdmin(), /Administrator access required/)
      user = { id: 'player', isAdmin: false }
      await assert.rejects(requireDevAdmin(), /Administrator access required/)
      user = { id: 'admin', isAdmin: true }
      await requireDevAdmin()
    `
    const child = Bun.spawn([process.execPath, '-e', script], { stdout: 'pipe', stderr: 'pipe' })
    const stderr = await new Response(child.stderr).text()
    expect(await child.exited, stderr).toBe(0)
  })
})

describe('controlled registration input', () => {
  const input = {
    trainerName: 'Trainer', email: 'TRAINER@example.com', password: 'a-long-password',
    confirmPassword: 'a-long-password', betaCode: 'private-code', kidMode: false,
  }
  test('normalizes account identity and rejects malformed, oversized and weak input', () => {
    expect(registrationSchema.parse(input).email).toBe('trainer@example.com')
    for (const change of [
      { email: 'invalid' }, { trainerName: 'x'.repeat(51) }, { password: 'short' },
      { confirmPassword: 'different' }, { betaCode: 'x'.repeat(257) }, { email: new File([], 'email') },
    ]) expect(registrationSchema.safeParse({ ...input, ...change }).success).toBe(false)
  })
  test('invites reject missing secrets, tampering, wrong signing keys and expiry', () => {
    const secret = 'test-only-invitation-secret-32-characters'
    const now = Date.UTC(2026, 8, 7)
    const invitation = issueRegistrationInvitation(secret, 60, now)
    expect(verifyRegistrationInvitation(invitation.token, secret, now)?.id).toBeString()
    expect(verifyRegistrationInvitation(invitation.token, undefined, now)).toBeNull()
    expect(verifyRegistrationInvitation(invitation.token, 'short', now)).toBeNull()
    expect(verifyRegistrationInvitation(invitation.token, 'another-test-invitation-secret-32-characters', now)).toBeNull()
    expect(verifyRegistrationInvitation(invitation.token, secret, now + 60_000)).toBeNull()
    const parts = invitation.token.split('.')
    parts[1] = Buffer.from(JSON.stringify({ id: 'attacker', exp: 9999999999 })).toString('base64url')
    expect(verifyRegistrationInvitation(parts.join('.'), secret, now)).toBeNull()
    expect(() => issueRegistrationInvitation(secret, 31 * 24 * 3600, now)).toThrow()
    expect(() => issueRegistrationInvitation('', 60, now)).toThrow()
  })
})
