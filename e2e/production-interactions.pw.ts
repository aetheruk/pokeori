import { readFile, writeFile } from 'node:fs/promises'
import { expect, test } from '@playwright/test'

test('isolated populated box measures scrolling and navigation intent', async ({ browser }) => {
  test.skip(process.env.STANDALONE_CSP_SMOKE !== '1', 'Requires isolated standalone fixture with 160 owned Pokemon')
  const origin = 'http://127.0.0.1:3112'
  const fixture = JSON.parse(await readFile('/tmp/pokeori-csp-fixture.json', 'utf8'))
  const account = fixture.users.find((user: { role: string }) => user.role === 'player')
  const context = await browser.newContext({ viewport: { width: 1280, height: 900 } })
  const login = await context.request.post(`${origin}/api/users/login`, { data: { email: account.email, password: 'isolated-csp-browser-password-123' } })
  expect(login.ok()).toBe(true)
  await context.addCookies([{ name: 'payload-token', value: (await login.json()).token, url: origin, httpOnly: true, sameSite: 'Lax' }])
  const page = await context.newPage()
  const prefetch: string[] = []
  const sync: string[] = []
  page.on('request', (request) => {
    const url = new URL(request.url())
    if (request.headers()['next-router-prefetch']) prefetch.push(url.pathname)
    if (url.pathname === '/api/game/sync') sync.push(url.searchParams.get('scope') || '')
  })
  await page.goto(`${origin}/game/explore`)
  const nav = page.getByRole('navigation', { name: 'Game sections' })
  await expect(nav).toBeVisible()
  await page.waitForTimeout(1200)
  const automaticPrefetch = [...prefetch]
  expect(automaticPrefetch.filter((path) => ['/game/pokemon', '/game/artisan', '/game/dex'].includes(path))).toEqual([])
  await nav.getByRole('link', { name: 'Pokemon', exact: true }).hover()
  await expect.poll(() => prefetch.filter((path) => path === '/game/pokemon').length).toBeGreaterThan(0)
  const intentPrefetch = [...prefetch]
  const profiler = await context.newCDPSession(page)
  await profiler.send('Profiler.enable')
  await profiler.send('Profiler.start')
  await nav.getByRole('link', { name: 'Pokemon', exact: true }).click()
  const cards = page.getByRole('button', { name: /^Audit sample / })
  await expect(cards.first()).toBeVisible()
  const initialCards = await cards.count()
  const initialNodes = await page.locator('*').count()
  await page.evaluate(() => {
    const samples: number[] = []
    Object.assign(window, { __scrollTasks: samples })
    new PerformanceObserver((list) => samples.push(...list.getEntries().map((entry) => entry.duration))).observe({ type: 'longtask', buffered: false })
  })
  for (let attempt = 0; attempt < 16 && await cards.count() < 160; attempt++) {
    await cards.last().scrollIntoViewIfNeeded()
    await cards.last().hover()
    await page.mouse.wheel(0, 1400)
    await page.waitForTimeout(350)
  }
  await expect(cards).toHaveCount(160)
  const finalNodes = await page.locator('*').count()
  const longTasks = await page.evaluate(() => (window as unknown as { __scrollTasks: number[] }).__scrollTasks)
  const profile = await profiler.send('Profiler.stop')
  await writeFile('/tmp/pokeori-box-profile.json', JSON.stringify(profile.profile))
  sync.length = 0
  await nav.getByRole('link', { name: 'Explore', exact: true }).click()
  await expect(page).toHaveURL(`${origin}/game/explore`)
  await nav.getByRole('link', { name: 'Pokemon', exact: true }).click()
  await expect(cards.first()).toBeVisible()
  await page.waitForTimeout(600)
  const evidence = { viewport: { width: 1280, height: 900 }, ownedPokemon: 160, automaticPrefetch, intentPrefetch, initialCards, initialNodes, finalCards: 160, finalNodes, scrollLongTasksMs: longTasks, revisitSyncScopes: [...sync] }
  await writeFile('/tmp/pokeori-production-interactions.json', JSON.stringify(evidence, null, 2))
  console.log(JSON.stringify(evidence))
  await cards.first().focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog', { name: 'Details', exact: true })).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(page.getByRole('dialog', { name: 'Details', exact: true })).toBeHidden()
  await expect(cards.first()).toBeFocused()
  await context.close()
})
