import { expect, test } from '@playwright/test'

test('a saved result schedules an update, and a new game cancels that countdown', async ({ page }) => {
  const updateStatusTimeout = 15_000
  let newer = false
  let versionChecks = 0
  await page.route('**/api/app-version', async (route) => {
    versionChecks += 1
    if (newer) await route.fulfill({ json: { version: '99.0.1-ui-test' } })
    else await route.continue()
  })
  await page.goto('/game/games/ui-test')
  await page.route('**/game/games/ui-test', async (route) => {
    if (route.request().isNavigationRequest()) await route.fulfill({ contentType: 'text/html', body: '<p>Updated test page</p>' })
    else await route.continue()
  })
  await page.clock.install()
  await page.evaluate(() => window.dispatchEvent(new Event('focus')))
  await expect.poll(() => versionChecks).toBeGreaterThan(1)
  const versionChecksBeforeUpdate = versionChecks
  newer = true
  await page.evaluate(() => window.dispatchEvent(new Event('focus')))
  await expect.poll(() => versionChecks).toBeGreaterThan(versionChecksBeforeUpdate)
  await expect(page.getByRole('status').filter({ hasText: 'Update ready.' })).toBeVisible({ timeout: updateStatusTimeout })
  await page.evaluate(() => window.dispatchEvent(new Event('pokeori:activity-settled')))
  await expect(page.getByRole('status').filter({ hasText: 'Updating in 15 seconds' })).toBeVisible({ timeout: updateStatusTimeout })
  await page.clock.runFor(5000)
  await page.evaluate(() => window.dispatchEvent(new Event('pokeori:activity-started')))
  await page.clock.runFor(20000)
  await expect(page.getByRole('button', { name: 'Test dropped result' })).toBeVisible()
  await expect(page.getByRole('status').filter({ hasText: 'Update ready.' })).toBeVisible({ timeout: updateStatusTimeout })
  await page.evaluate(() => window.dispatchEvent(new Event('pokeori:activity-settled')))
  await expect(page.getByRole('status').filter({ hasText: 'Updating in 15 seconds' })).toBeVisible({ timeout: updateStatusTimeout })
  await page.clock.runFor(15000)
  await expect(page.getByText('Updated test page')).toBeVisible()
})

test('a delayed version response from a safe route cannot reload a newly entered game', async ({ page }) => {
  let release: (() => void) | undefined
  let started: (() => void) | undefined
  const seen = new Promise<void>((resolve) => { started = resolve })
  const held = new Promise<void>((resolve) => { release = resolve })
  let holdNextVersionCheck = false
  await page.route('**/api/app-version', async (route) => {
    if (!holdNextVersionCheck) {
      await route.continue()
      return
    }
    holdNextVersionCheck = false
    started?.()
    await held
    await route.fulfill({ json: { version: '99.0.2-ui-test' } }).catch(() => {})
  })
  await page.goto('/ui-test')
  holdNextVersionCheck = true
  await page.evaluate(() => window.dispatchEvent(new Event('focus')))
  await seen
  await page.evaluate(() => window.history.pushState({}, '', '/game/games/ui-test'))
  release?.()
  await expect(page).toHaveURL(/\/game\/games\/ui-test$/)
  await expect(page.getByRole('button', { name: 'Test dropped result' })).toBeVisible()
})
