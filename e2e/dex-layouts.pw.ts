import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`Carddex collection shelves scroll within the page at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test dex layouts' }).click()
    for (const name of ['Card series', 'Base sets']) {
      const shelf = page.getByRole('group', { name, exact: true })
      expect(await shelf.evaluate((element) => element.scrollWidth > element.clientWidth)).toBe(true)
      await shelf.hover()
      await page.mouse.wheel(600, 0)
      await expect.poll(() => shelf.evaluate((element) => element.scrollLeft)).toBeGreaterThan(0)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
      await shelf.getByRole('button').last().focus()
    }
    await expect(page.locator('[data-tcg-mark^="logo-"]').first()).toBeVisible()
    await expect(page.locator('[data-tcg-mark^="symbol-"]').first()).toBeVisible()
    await page.getByRole('group', { name: 'Base sets', exact: true }).getByRole('button').last().click()
    await expect(page.getByRole('group', { name: 'Base sets', exact: true }).getByRole('button').last()).toHaveAttribute('aria-pressed', 'true')
  })

  test(`page skeletons fit the viewport without spinners at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test dex layouts' }).click()
    for (const name of ['Trainer', 'Explore', 'Pokemon', 'Artisan', 'Dex', 'MoveDex', 'AbilityDex', 'Pokedex', 'Carddex', 'Inventory']) {
      await page.getByLabel('Loading preview').selectOption(name)
      const preview = page.getByTestId('layout-preview')
      await expect(preview.getByRole('heading', { level: 1 })).toBeVisible()
      await expect(preview.getByRole('status')).toContainText('Loading')
      await expect(preview.locator('.animate-spin, .animate-pulse')).toHaveCount(0)
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    }
  })
}
