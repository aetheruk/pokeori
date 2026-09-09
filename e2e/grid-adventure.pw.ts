import { expect, test } from '@playwright/test'

test('combined grid course preserves rooms, items and proof across encounter and battle returns', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 850 })
  await page.route('**/ui-test**', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ contentType: 'text/x-component', body: '0:{"a":"$@1","f":"","b":"development"}\n1:{"success":true}\n' })
    } else await route.continue()
  })
  await page.route('**/game/locations/encounter?**', (route) => route.fulfill({ contentType: 'text/html', body: '<p>Encounter checkpoint</p>' }))
  await page.route('**/game/battles/encounter?**', (route) => route.fulfill({ contentType: 'text/html', body: '<p>Battle checkpoint</p>' }))
  const open = async (returning = false) => {
    await page.goto(returning ? '/ui-test?gridReturn=1&outcome=won' : '/ui-test')
    await page.getByRole('button', { name: 'Test grid appearance', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Move down', exact: true })).toBeEnabled()
  }
  const walk = async (moves: string[]) => {
    for (const direction of moves) {
      await page.getByRole('button', { name: `Move ${direction}`, exact: true }).click()
      // Allow the longest authored slide (680ms) and checkpoint handoff to settle.
      await page.waitForTimeout(900)
    }
  }
  const resume = () => page.evaluate(() => JSON.parse(sessionStorage.getItem('grid-puzzle-resume:appearance-fixture') || 'null'))
  await open()
  await walk(['down', 'right', 'right', 'right', 'right', 'down', 'right', 'down'])
  await expect(page).toHaveURL(/\/game\/locations\/encounter/)
  const wild = await resume()
  expect(wild.activeScreenId).toBe('frost')
  expect(wild.screenStates.entry.rocksSolved).toBe(1)
  expect(wild.collectedPrizeIds).toEqual(['entry:entry-supplies', 'frost:ice-supplies'])
  expect(wild.pendingObjectKey).toBe('frost:wild-checkpoint')
  await open(true)
  await walk(['down', 'right', 'right', 'right', 'down', 'right'])
  await expect(page).toHaveURL(/\/game\/battles\/encounter/)
  const battle = await resume()
  expect(battle.activeScreenId).toBe('vault')
  expect(battle.clearedObjectKeys).toContain('frost:wild-checkpoint')
  expect(battle.pendingObjectKey).toBe('vault:trainer-checkpoint')
  expect(battle.moveProof).toHaveLength(14)
  await open(true)
  await walk(['right', 'right'])
  await page.getByRole('grid').screenshot({ path: '/tmp/pokeori-grid-course-vault.png' })
  await walk(['down'])
  await expect(page.getByText('Level Complete!', { exact: true })).toBeVisible()
})
