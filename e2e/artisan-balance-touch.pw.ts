import { expect, test } from '@playwright/test'

test('Artisan Balance locks immediately on touch pointer-down without a duplicate click', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/ui-test')
  await page.getByRole('button', { name: 'Test Artisan balance' }).click()

  const lockButton = page.getByRole('button', { name: 'Lock in' })
  const waitingStages = page.getByText('Waiting', { exact: true })
  await expect(waitingStages).toHaveCount(3)

  await lockButton.dispatchEvent('pointerdown', {
    button: 0,
    isPrimary: true,
    pointerType: 'touch',
  })
  await expect(waitingStages).toHaveCount(2)

  await lockButton.dispatchEvent('pointerup', {
    button: 0,
    isPrimary: true,
    pointerType: 'touch',
  })
  await lockButton.dispatchEvent('click', { button: 0, detail: 1 })
  await expect(waitingStages).toHaveCount(2)
})
