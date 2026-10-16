import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`Ball Bag has an Open action and full odds at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/ui-test/ball-bag')
    await expect(page.getByRole('button', { name: 'Open Ball Bag', exact: true })).toBeVisible()
    await page.getByRole('button', { name: 'View Ball Bag', exact: true }).click()
    const dialog = page.getByRole('dialog')
    await expect(dialog).toContainText('1 in 1,000,000')
    await expect(dialog.getByRole('button', { name: 'Open Bag', exact: true })).toBeVisible()
    expect((await dialog.boundingBox())!.width).toBeLessThanOrEqual(width)
  })
}
