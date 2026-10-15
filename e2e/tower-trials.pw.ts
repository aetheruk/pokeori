import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`Tower type trial explains its rules and actual participants at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/ui-test/tower-trials')
    await expect(page.getByText('Only Grass-type Pokémon may enter', { exact: false })).toBeVisible()
    await expect(page.getByText('Allowed types', { exact: true })).toBeVisible()
    const team = page.getByText('Entering team:', { exact: false })
    await expect(team).toBeVisible()
    await expect(team).toContainText('Oddish, Bellsprout, Bulbasaur')
    await expect(team).not.toContainText('Pikachu')
    const manage = page.getByRole('link', { name: 'Manage Battle Team' })
    await expect(manage).toHaveAttribute('href', '/game/pokemon')
    await expect(manage).toBeVisible()
    expect((await manage.boundingBox())!.width).toBeLessThanOrEqual(width)
    await page.screenshot({ path: `test-results/tower-trial-${width}.png` })
  })
}
