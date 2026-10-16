import { expect, test } from '@playwright/test'

test('Razz Berry Crushing submits its timed result once and stops accepting hits', async ({ page }) => {
  await page.clock.install()
  await page.goto('/ui-test/rhythm')
  await expect(page.getByRole('button', { name: 'Razz', exact: true })).toBeVisible()
  for (let seconds = 0; seconds < 25; seconds++) await page.clock.runFor(1000)
  await expect(page.getByRole('dialog')).toContainText('Game Over')
  await expect(page.getByLabel('Verified rhythm completions')).toHaveText('1')
  await expect(page.getByRole('button', { name: 'Razz', exact: true, includeHidden: true })).toBeDisabled()
  await page.clock.runFor(5000)
  await expect(page.getByLabel('Verified rhythm completions')).toHaveText('1')
})
