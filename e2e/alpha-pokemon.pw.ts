import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`Alpha marks fit the battle HUD and owned Pokémon modal at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/ui-test/alpha')
    const hud = page.getByTestId('alpha-hud')
    await expect(hud.getByRole('img', { name: 'Alpha', exact: true })).toBeVisible()
    expect(await hud.getByText('Rattata', { exact: true }).evaluate((name) => name.nextElementSibling?.getAttribute('alt'))).toBe('Alpha')
    await page.getByRole('button', { name: 'Inspect Alpha' }).click()
    const modal = page.getByRole('dialog', { name: 'Alpha Rattata', exact: true })
    await expect(modal).toBeVisible()
    await expect(modal.getByText('XXXL', { exact: true })).toBeVisible()
    const alpha = modal.getByRole('img', { name: 'Alpha', exact: true }).last()
    await expect(alpha).toBeVisible()
    expect(await alpha.evaluate((icon) => icon.parentElement?.textContent?.trim())).toBe('Rattata')
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true)
    await expect(modal).toBeInViewport()
    // Let the drawer/panel's entrance motion finish before visual inspection.
    await page.waitForTimeout(500)
    await page.screenshot({ path: `/tmp/pokeori-alpha-${width}.png` })
  })
}
