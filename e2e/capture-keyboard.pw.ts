import { expect, test } from '@playwright/test'

test('capture requires prepared aim and supports a native keyboard throw', async ({ page }) => {
  await page.goto('/ui-test')
  await page.getByRole('button', { name: 'Test capture keyboard' }).click()
  await expect(page.getByRole('button', { name: 'Preparing throw…' })).toBeDisabled()
  await page.getByRole('button', { name: 'Prepare test throw' }).focus()
  await page.keyboard.press('Space')
  const throwButton = page.getByRole('button', { name: 'Throw Poké Ball', exact: true })
  await expect(throwButton).toBeEnabled()
  await throwButton.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByText('Keyboard throws: 1')).toBeVisible()
})
