import { expect, test } from '@playwright/test'

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
