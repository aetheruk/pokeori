import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`UFO holds and result above the button fit at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test UFO Catcher', exact: true }).click()
    await page.getByRole('button', { name: /Play for 30/ }).click()
    const right = page.getByRole('button', { name: 'Hold to move right', exact: true })
    await expect(right).toBeEnabled()
    await page.screenshot({ path: `/tmp/pokeori-ufo-${width}.png` })
    const cabinet = await page.getByRole('region', { name: 'UFO Catcher cabinet' }).boundingBox()
    const controls = await right.boundingBox()
    expect(cabinet!.width).toBeGreaterThan(300)
    expect(cabinet!.y + cabinet!.height).toBeLessThan(controls!.y)
    expect(controls!.y + controls!.height).toBeLessThan(844)
    await right.focus()
    await page.keyboard.down('Space')
    // Moving focus must lock the held axis even without a keyup on the control.
    await page.keyboard.press('Tab')
    await page.keyboard.up('Space')
    const back = page.getByRole('button', { name: 'Hold to move toward the back', exact: true })
    await expect(back).toBeEnabled()
    const box = (await back.boundingBox())!
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2)
    await page.mouse.down()
    // Pointer capture preserves release when the pointer leaves the button.
    await page.mouse.move(2, 2)
    await page.mouse.up()
    await expect(page.getByText('The claw came up empty')).toBeVisible({ timeout: 15000 })
    await expect(page.getByRole('button', { name: /Play for 30/ })).toBeEnabled()
    const result = (await page.getByText('The claw came up empty').boundingBox())!
    const play = (await page.getByRole('button', { name: /Play for 30/ }).boundingBox())!
    expect(result.y + result.height).toBeLessThan(play.y)
    await page.screenshot({ path: `/tmp/pokeori-ufo-result-${width}.png` })
  })
}
