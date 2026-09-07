import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`slow section navigation stays usable at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test game navigation' }).click()
    const nav = page.getByRole('navigation', { name: 'Game sections' }).filter({ visible: true })
    const pokemon = nav.locator('a[href="/game/pokemon"]')
    const before = await pokemon.boundingBox()
    // Hold the RSC response to exercise cold navigation feedback, without
    // loading authenticated gameplay or altering any player state.
    let release: () => void = () => {}
    const held = new Promise<void>((resolve) => { release = resolve })
    await page.route('**/game/pokemon*', async (route) => {
      await held
      await route.abort()
    })
    try {
      await pokemon.focus()
      await page.keyboard.press('Enter')
      await expect(pokemon.getByRole('status')).toHaveText('Opening section…')
      await expect(pokemon.getByRole('status')).toHaveCSS('opacity', '1')
      expect(await pokemon.boundingBox()).toEqual(before)
      await expect(nav.getByRole('link', { name: 'Explore', exact: true })).toBeEnabled()
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width)
    } finally {
      release()
    }
  })
}
