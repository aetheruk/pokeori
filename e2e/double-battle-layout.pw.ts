import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`double battle keeps the single-battle scene and repeats its controls at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 800 })
    await page.goto('/ui-test/doubles')

    await expect(page.getByRole('group', { name: 'Your Pokemon 1 health' })).toBeVisible()
    await expect(page.getByRole('group', { name: 'Your Pokemon 2 health' })).toBeVisible()
    await expect(page.getByRole('group', { name: 'Opponent Pokemon 1 health' })).toBeVisible()
    await expect(page.getByRole('group', { name: 'Opponent Pokemon 2 health' })).toBeVisible()
    await expect(page.getByTestId('selected-doubles-arrow')).toHaveCount(1)
    await expect(page.getByRole('button', { name: 'Items, 2 of 2 uses remaining' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'Moves, 4 uses remaining' })).toBeVisible()
    await expect(page.getByText('Item · Potion')).toHaveCount(0)
    await expect(page.getByRole('button', { name: 'SPEED' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'POWER' })).toBeVisible()
    await expect(page.getByRole('button', { name: 'TECH' })).toBeVisible()

    await page.screenshot({ path: `test-results/doubles-${width}-first.png` })
    const firstArrow = await page.getByTestId('selected-doubles-arrow').boundingBox()
    await page.getByRole('button', { name: 'POWER' }).click()
    await page.getByRole('button', { name: 'Next Pokemon' }).click()
    const secondArrow = await page.getByTestId('selected-doubles-arrow').boundingBox()
    expect(secondArrow?.x).toBeGreaterThan(firstArrow?.x ?? 0)
    await expect(page.getByRole('button', { name: 'Moves, 4 uses remaining' })).toBeVisible()
    await page.getByRole('button', { name: 'TECH' }).click()
    await expect(page.getByRole('button', { name: 'Confirm turn' })).toBeEnabled()
    await page.screenshot({ path: `test-results/doubles-${width}-second.png` })

    const overflows = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth)
    expect(overflows).toBe(false)
  })
}
