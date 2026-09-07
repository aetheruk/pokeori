import { readFile, writeFile } from 'node:fs/promises'
import { gzipSync } from 'node:zlib'
import { expect, test } from '@playwright/test'
import budgets from './production-js-budgets.json' with { type: 'json' }

test('isolated production player and admin pages hydrate under enforced CSP', async ({ browser }) => {
  test.skip(process.env.STANDALONE_CSP_SMOKE !== '1', 'Requires the explicitly isolated standalone container and temporary synthetic users')
  const fixture = JSON.parse(await readFile('/tmp/pokeori-csp-fixture.json', 'utf8'))
  const origin = process.env.STANDALONE_CSP_ORIGIN || 'http://127.0.0.1:3112'
  expect(['http://127.0.0.1:3112', 'http://127.0.0.1:3113', 'http://127.0.0.1:3114']).toContain(origin)
  const evidence: unknown[] = []
  for (const role of ['player', 'admin']) {
    for (const route of role === 'admin' ? ['/admin'] : ['/game/explore', '/game/pokemon', '/game/inventory', '/game/games/run']) {
    const context = await browser.newContext()
    await context.addInitScript(() => {
      const errors: unknown[] = []
      Object.assign(window, { __smokeCsp: errors })
      document.addEventListener('securitypolicyviolation', (event) => errors.push({ directive: event.effectiveDirective, blocked: event.blockedURI, source: event.sourceFile, line: event.lineNumber }))
    })
    const page = await context.newPage()
    const errors: string[] = []
    const scripts: Array<{ url: string; bytes: number; gzipBytes: number }> = []
    const bodies: Promise<void>[] = []
    page.on('response', (response) => {
      if (response.request().resourceType() !== 'script') return
      bodies.push(response.body().then((body) => { scripts.push({ url: response.url(), bytes: body.length, gzipBytes: gzipSync(body, { level: 6 }).length }) }))
    })
    page.on('pageerror', (error) => errors.push(error.message))
    const account = fixture.users.find((user: any) => user.role === role)
    const login = await context.request.post(`${origin}/api/users/login`, { data: { email: account.email, password: 'isolated-csp-browser-password-123' } })
    expect(login.ok()).toBe(true)
    const body = await login.json()
    await context.addCookies([{ name: 'payload-token', value: body.token, url: origin, httpOnly: true, sameSite: 'Lax' }])
      const response = await page.goto(origin + route)
      expect(response?.status(), route).toBe(200)
      expect(response?.headers()['content-security-policy']).toContain("'strict-dynamic'")
      if (role === 'player') await expect(page.getByRole('main')).toBeVisible()
      if (route === '/game/games/run') await expect(page).toHaveURL(origin + route)
      else if (role === 'player') await expect(page.getByText(account.email.split('@')[0], { exact: true }).first()).toBeVisible()
      else {
        await expect.soft(page.getByRole('link', { name: 'Users', exact: true }).first()).toBeVisible()
      }
      await page.waitForTimeout(800)
      await Promise.all(bodies)
      const violations = await page.evaluate(() => (window as unknown as { __smokeCsp: unknown[] }).__smokeCsp)
      const gzipBytes = scripts.reduce((sum, script) => sum + script.gzipBytes, 0)
      const budget = budgets.routes[route as keyof typeof budgets.routes]
      expect.soft(gzipBytes, `${route} initial compressed JavaScript budget`).toBeLessThanOrEqual(budget.maxGzipBytes)
      const sample = { route, cspViolations: violations, pageErrors: errors, width: await page.evaluate(() => document.documentElement.scrollWidth), scriptCount: scripts.length, scriptBodyBytes: scripts.reduce((sum, script) => sum + script.bytes, 0), gzipBytes, scripts }
      evidence.push(sample)
      console.log(JSON.stringify({ ...sample, scripts: undefined }))
      expect.soft(violations, route).toEqual([])
      expect.soft(errors, route).toEqual([])
    await context.close()
    }
  }
  await writeFile(`/tmp/pokeori-production-network-${new URL(origin).port}.json`, JSON.stringify(evidence, null, 2))
})
