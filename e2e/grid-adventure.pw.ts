import { expect, test } from '@playwright/test'

test('Grid Adventure trainer objects block movement and A starts their battle', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 850 })
  await page.route('**/ui-test**', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ contentType: 'text/x-component', body: '0:{"a":"$@1","f":"","b":"development"}\n1:{"success":true}\n' })
    } else await route.continue()
  })
  await page.route('**/game/battles/encounter?**', (route) => route.fulfill({ contentType: 'text/html', body: '<p>Battle checkpoint</p>' }))

  await page.goto('/ui-test')
  await page.getByRole('button', { name: 'Test grid appearance', exact: true }).click()
  await expect(page.getByRole('button', { name: 'Move right', exact: true })).toBeEnabled()
  await expect(page.getByRole('button', { name: 'No object in front to interact with' })).toBeDisabled()

  await page.getByRole('button', { name: 'Move right', exact: true }).click()
  await page.getByRole('button', { name: 'Interact with Route 1 Rattata', exact: true }).click()
  await expect(page).toHaveURL(/\/game\/battles\/encounter/)

  const resume = await page.evaluate(() =>
    JSON.parse(sessionStorage.getItem('grid-puzzle-resume:appearance-fixture') || 'null'),
  )
  expect(resume.activeScreenId).toBe('entry')
  expect(resume.pendingObjectKey).toBe('entry:entry-rattata')
  expect(resume.pendingVictory).toBe('clear')
})
