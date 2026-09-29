import { expect, test } from '@playwright/test'

test('prefetched snapshots stay visible while fresh data arrives and on revisit', async ({ page }) => {
  let release: () => void = () => {}
  const held = new Promise<void>((resolve) => { release = resolve })
  let hold = false
  await page.route('**/api/game/sync?*', async (route) => {
    if (hold) await held
    await route.fulfill({ json: {
      snapshotAt: '2026-01-02T00:00:00.000Z',
      user: { id: 'sync-fixture', currency: { pokedollars: 35 } },
      inventory: [],
    } })
  })
  await page.goto('/ui-test')
  await page.getByRole('button', { name: 'Test scoped sync', exact: true }).click()
  const fixture = page.getByRole('region', { name: 'Scoped sync fixture' })
  await expect(fixture.getByLabel('Fixture currency')).toHaveText('35')
  // Let SWR's request deduplication expire before simulating a prefetched entry.
  await page.waitForTimeout(5100)
  hold = true
  try {
    await fixture.getByRole('button', { name: 'Use prefetched snapshot' }).click()
    await expect(fixture.getByLabel('Fixture currency')).toHaveText('10')
    await expect(fixture.getByLabel('Fixture loading')).toHaveText('false')
    release()
    await expect(fixture.getByLabel('Fixture currency')).toHaveText('35')
    await fixture.getByRole('button', { name: 'Toggle snapshot' }).click()
    await fixture.getByRole('button', { name: 'Toggle snapshot' }).click()
    await expect(fixture.getByLabel('Fixture currency')).toHaveText('35')
    await expect(fixture.getByLabel('Fixture loading')).toHaveText('false')
  } finally {
    release()
  }
})

test('reward refresh avoids unrelated cached scopes and revisits fetch current data', async ({ page }) => {
  const requests: string[] = []
  let currency = 10
  await page.route('**/api/game/sync?*', async (route) => {
    requests.push(new URL(route.request().url()).searchParams.get('scope') || '')
    await route.fulfill({ json: { user: { id: 'sync-fixture', trainerName: 'Sync fixture', currency: { pokedollars: currency } }, inventory: [], pokemon: [], gameResults: [] } })
  })
  await page.goto('/ui-test')
  await page.getByRole('button', { name: 'Test scoped sync', exact: true }).click()
  const fixture = page.getByRole('region', { name: 'Scoped sync fixture' })
  await expect(fixture.getByLabel('Fixture currency')).toHaveText('10')
  for (const scope of ['tcg', 'abilitydex', 'core']) {
    await fixture.getByRole('button', { name: `Visit ${scope} scope`, exact: true }).click()
    await expect.poll(() => requests.includes(scope)).toBe(true)
    await expect(fixture.getByLabel('Fixture currency')).toHaveText('10')
  }
  expect(requests).toEqual(['inventory', 'tcg', 'abilitydex', 'core'])
  requests.length = 0
  currency = 35
  await fixture.getByRole('button', { name: 'Apply acknowledged reward invalidation' }).click()
  await expect(fixture.getByText('Reward refresh finished')).toBeVisible()
  await expect(fixture.getByLabel('Fixture currency')).toHaveText('35')
  await page.waitForTimeout(300)
  expect(requests).toEqual(['core'])
  await fixture.getByRole('button', { name: 'Visit tcg scope', exact: true }).click()
  await expect(fixture.getByLabel('Fixture currency')).toHaveText('35')
  expect(requests).toEqual(['core'])
  await page.waitForTimeout(5100)
  await fixture.getByRole('button', { name: 'Visit inventory scope', exact: true }).click()
  await expect.poll(() => requests).toEqual(['core', 'inventory'])
  await expect(fixture.getByLabel('Fixture currency')).toHaveText('35')
})
