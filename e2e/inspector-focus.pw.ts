import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`Pokemon inspector opens on first activation and restores keyboard focus at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test Pokemon inspector', exact: true }).click()
    const trigger = page.getByRole('button', { name: 'Open fixture inspector', exact: true })
    for (let attempt = 0; attempt < 2; attempt++) {
      await trigger.focus()
      await page.keyboard.press('Enter')
      await expect(page.getByRole('dialog', { name: 'Details', exact: true })).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(page.getByRole('dialog', { name: 'Details', exact: true })).toBeHidden()
      await expect(trigger).toBeFocused()
    }
  })
}
