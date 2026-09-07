import { expect, test } from 'bun:test'

test('invitation signup commits both records together and rolls back duplicate or failed consumption', async () => {
  const script = `
    import { mock } from 'bun:test'
    import { strict as assert } from 'node:assert'
    mock.module('server-only', () => ({}))
    let available = true
    let commits = 0
    let rollbacks = 0
    mock.module('payload', () => ({
      createLocalReq: async () => ({ pending: [] }),
      initTransaction: async () => available,
      commitTransaction: async (req) => { commits++; committed.push(...req.pending) },
      killTransaction: async (req) => { rollbacks++; req.pending = [] },
    }))
    const { registerInvitedAccount } = await import('./src/utilities/auth/register-invited-account.ts')
    const committed = []
    let duplicateRace = false
    const payload = {
      db: {},
      find: async ({ where, req }) => {
        assert.ok(req)
        return { docs: committed.filter(x => x.collection === 'economy-action-receipts' && x.data.key === where.key.equals) }
      },
      create: async ({ collection, data, req }) => {
        assert.ok(req)
        if (collection === 'economy-action-receipts' && duplicateRace) throw new Error('duplicate key from concurrent consumption')
        req.pending.push({ collection, data })
        return { id: 'created-user', ...data }
      },
    }
    const data = { trainerName: 'test', email: 'test@example.com', password: 'test-password', kidMode: false }
    const invitation = { id: 'one-invitation', exp: Math.floor(Date.now()/1000) + 3600 }
    await registerInvitedAccount(payload, data, invitation)
    assert.equal(commits, 1)
    assert.equal(committed.length, 2)
    assert.equal(committed[1].data.user, 'created-user')
    assert.equal(committed[1].data.requestId, invitation.id)
    await assert.rejects(registerInvitedAccount(payload, data, invitation), /already been used/)
    assert.equal(committed.length, 2)
    duplicateRace = true
    await assert.rejects(registerInvitedAccount(payload, data, { ...invitation, id: 'another-invitation' }), /duplicate key/)
    assert.equal(committed.length, 2)
    assert.equal(commits, 1)
    assert.equal(rollbacks, 2)
    available = false
    await assert.rejects(registerInvitedAccount(payload, data, invitation), /requires database transactions/)
    await assert.rejects(registerInvitedAccount(payload, data, { ...invitation, exp: 1 }), /expired/)
    assert.equal(committed.length, 2)
  `
  const child = Bun.spawn([process.execPath, '-e', script], { stdout: 'pipe', stderr: 'pipe' })
  const stderr = await new Response(child.stderr).text()
  expect(await child.exited, stderr).toBe(0)
})
