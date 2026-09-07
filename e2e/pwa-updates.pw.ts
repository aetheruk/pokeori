import { expect, test } from '@playwright/test'

test('a saved result schedules an update, and a new game cancels that countdown', async ({ page }) => {
  let newer = false
  await page.route('**/api/app-version', async (route) => {
    if (newer) await route.fulfill({ json: { version: '99.0.1-ui-test' } })
    else await route.continue()
  })
  await page.goto('/ui-test')
  await page.route('**/game/games/ui-test', async (route) => {
    if (route.request().isNavigationRequest()) await route.fulfill({ contentType: 'text/html', body: '<p>Updated test page</p>' })
    else await route.continue()
  })
  await page.clock.install()
  await page.evaluate(() => window.history.pushState({}, '', '/game/games/ui-test'))
  newer = true
  await page.evaluate(() => window.dispatchEvent(new Event('focus')))
  await expect(page.getByRole('status').filter({ hasText: 'Update ready.' })).toBeVisible()
  await page.evaluate(() => window.dispatchEvent(new Event('pokeori:activity-settled')))
  await expect(page.getByRole('status').filter({ hasText: 'Updating in 15 seconds' })).toBeVisible()
  await page.clock.runFor(5000)
  await page.evaluate(() => window.dispatchEvent(new Event('pokeori:activity-started')))
  await page.clock.runFor(20000)
  await expect(page.getByRole('button', { name: 'Test dropped result' })).toBeVisible()
  await expect(page.getByRole('status').filter({ hasText: 'Update ready.' })).toBeVisible()
  await page.evaluate(() => window.dispatchEvent(new Event('pokeori:activity-settled')))
  await expect(page.getByRole('status').filter({ hasText: 'Updating in 15 seconds' })).toBeVisible()
  await page.clock.runFor(15000)
  await expect(page.getByText('Updated test page')).toBeVisible()
})

test('a delayed version response from a safe route cannot reload a newly entered game', async ({ page }) => {
  await page.goto('/ui-test')
  let release: (() => void) | undefined
  let started: (() => void) | undefined
  const seen = new Promise<void>((resolve) => { started = resolve })
  const held = new Promise<void>((resolve) => { release = resolve })
  let first = true
  await page.route('**/api/app-version', async (route) => {
    if (first) {
      first = false
      started?.()
      await held
    }
    await route.fulfill({ json: { version: '99.0.2-ui-test' } }).catch(() => {})
  })
  await page.evaluate(() => window.dispatchEvent(new Event('focus')))
  await seen
  await page.evaluate(() => window.history.pushState({}, '', '/game/games/ui-test'))
  release?.()
  await expect(page.getByRole('status').filter({ hasText: 'Update ready.' })).toBeVisible()
  await expect(page.getByRole('button', { name: 'Test dropped result' })).toBeVisible()
})
