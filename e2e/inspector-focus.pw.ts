import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`Pokemon inspector opens on first activation and restores keyboard focus at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test Pokemon inspector', exact: true }).click()
    const trigger = page.getByRole('button', { name: 'Open fixture inspector', exact: true })
    const inspector = page.getByRole('dialog', { name: 'Inspector fixture', exact: true })
    for (let attempt = 0; attempt < 2; attempt++) {
      await trigger.focus()
      await page.keyboard.press('Enter')
      await expect(inspector).toBeVisible()
      await page.keyboard.press('Escape')
      await expect(inspector).toBeHidden()
      await expect(trigger).toBeFocused()
    }
  })
}
