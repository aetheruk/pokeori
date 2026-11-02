import { expect, test } from '@playwright/test'

for (const viewport of [
  { width: 390, height: 844 },
  { width: 390, height: 667 },
  { width: 320, height: 568 },
  { width: 844, height: 390 },
]) {
  test(`box team manager fits without scrolling at ${viewport.width}×${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test party manager' }).click()

    const manager = page.getByRole('dialog', { name: 'Battle team' })
    await expect(manager).toBeVisible()
    await manager.getByRole('button', { name: /Bulbasaur/ }).click()

    const content = manager.locator('main').locator('xpath=..')
    await expect.poll(() => content.evaluate((element) => element.scrollHeight <= element.clientHeight)).toBe(true)
    await expect(manager.getByRole('button', { name: 'Select partner Squirtle' })).toBeInViewport()
    await expect(manager.getByRole('button', { name: 'Stats' })).toBeInViewport()
    await expect(manager.getByRole('button', { name: 'Remove' })).toBeInViewport()
  })
}

for (const width of [390, 1280]) {
  test(`box team manager opens Stats and returns from selection at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test party manager' }).click()
    const manager = page.getByRole('dialog', { name: 'Battle team' })
    await expect(manager).toBeVisible()
    await expect(manager.getByRole('button', { name: 'Stats' })).toBeVisible()
    await expect(manager.getByRole('button', { name: 'Remove' })).toBeVisible()
    await expect(manager.getByRole('button', { name: /Edit moves|Item|Power/ })).toHaveCount(0)
    await expect(manager.getByRole('button', { name: 'Choose a Pokémon for the battle team' })).toHaveCount(4)
    await expect(manager.getByRole('button', { name: 'Select partner Squirtle' })).toBeVisible()
    await manager.getByRole('button', { name: 'Stats' }).click()
    const statsDialog = page.getByRole('dialog', { name: /Bulbasaur/ })
    await expect(statsDialog).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(statsDialog).not.toBeVisible()
    await expect(manager).toBeVisible()
    await manager.getByRole('button', { name: 'Choose a Pokémon for the battle team' }).first().click()
    await page.getByRole('button', { name: 'Choose Pikachu from box' }).click()
    await expect(manager).toBeVisible()
    await expect(manager.getByRole('heading', { name: 'Pikachu' })).toBeVisible()
    await expect(manager.getByRole('button', { name: 'Remove' })).toBeVisible()
    await page.waitForTimeout(500)
    await page.screenshot({ path: `/tmp/pokeori-party-manager-${width}.png` })
    await manager.getByRole('button', { name: 'Remove' }).click()
    await expect(manager.getByRole('button', { name: 'Choose a Pokémon for the battle team' })).toHaveCount(4)
    await manager.getByRole('button', { name: 'Select partner Squirtle' }).click()
    await expect(manager.getByRole('heading', { name: 'Squirtle' })).toBeVisible()
    await manager.getByRole('button', { name: 'Remove' }).click()
    await expect(manager.getByRole('button', { name: 'Choose a partner Pokémon' })).toBeVisible()
    await expect.poll(() => manager.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
  })
}
