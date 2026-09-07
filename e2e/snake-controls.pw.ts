import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`Onix countdown and circular joystick survive checkpoints at ${width}px`, async ({ page, context }) => {
    test.setTimeout(90000)
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/ui-test')
    await page.clock.install()
    await page.getByRole('button', { name: 'Test Onix joystick', exact: true }).click()
    await expect(page.getByRole('button', { name: 'Start survey', exact: true })).toHaveCount(0)
    await expect(page.getByRole('timer', { name: '3 seconds remaining' })).toBeVisible()
    const joystick = page.getByRole('button', { name: 'Steering joystick', exact: true })
    await expect(joystick).toBeDisabled()
    const bounds = (await joystick.boundingBox())!
    expect(Math.abs(bounds.x + bounds.width / 2 - width / 2)).toBeLessThan(2)
    const score = (await page.getByLabel('Score', { exact: true }).boundingBox())!
    const exit = page.getByRole('button', { name: 'Leave game', exact: true })
    const exitBounds = (await exit.boundingBox())!
    expect(score.x).toBeLessThan(width / 2)
    expect(exitBounds.x).toBeGreaterThan(width / 2)
    await page.clock.runFor(3150)
    await expect(joystick).toBeEnabled()
    await expect(page.getByRole('timer')).toHaveCount(0)
    await page.screenshot({ path: `/tmp/pokeori-onix-${width}.png` })
    const head = page.locator('img[src*="onix-head"]').locator('..')
    const rotation = async () => (await head.getAttribute('style'))?.match(/rotate\(([^)]+)\)/)?.[1]
    const beforeSceneTap = await rotation()
    await page.mouse.click(width - 30, 180)
    await page.clock.runFor(100)
    expect(await rotation()).toBe(beforeSceneTap)
    await joystick.focus()
    await page.keyboard.down('ArrowUp')
    await page.clock.runFor(100)
    await page.keyboard.up('ArrowUp')
    const cdp = await context.newCDPSession(page)
    const centre = { x: bounds.x + bounds.width / 2, y: bounds.y + bounds.height / 2 }
    const point = (angle: number) => ({ x: centre.x + Math.cos(angle * Math.PI / 180) * 35, y: centre.y + Math.sin(angle * Math.PI / 180) * 35 })
    const first = point(270)
    if (width === 390) await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ ...first, id: 1 }] })
    else { await page.mouse.move(first.x, first.y); await page.mouse.down() }
    for (const angle of [258, 270]) {
      const target = point(angle)
      if (width === 390) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ ...target, id: 1 }] })
      else await page.mouse.move(target.x, target.y)
      await page.clock.runFor(100)
    }
    for (let step = 1; step <= 210; step++) {
      const target = point(270 + step * 18)
      if (width === 390) await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ ...target, id: 1 }] })
      else await page.mouse.move(target.x, target.y)
      await page.clock.runFor(100)
    }
    if (width === 390) await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
    else await page.mouse.up()
    await expect.poll(async () => Number(await page.getByLabel('Verified Onix checkpoints').textContent()), { timeout: 30000 }).toBeGreaterThanOrEqual(4)
    await expect(page.getByLabel('Onix checkpoint error')).toHaveText('')
    await expect(page.getByRole('dialog')).toHaveCount(0, { timeout: 15000 })
    await expect(joystick.locator('span').last()).toHaveAttribute('style', /0px.*0px/)
    const exits: string[] = []
    page.on('request', (request) => { if (new URL(request.url()).pathname === '/game/explore') exits.push(request.url()) })
    await exit.focus()
    await page.clock.resume()
    await page.keyboard.press('Enter')
    await expect.poll(() => exits.length).toBeGreaterThan(0)
    // The local fixture has no auth cookie; the real Explore guard can redirect
    // onward to auth after the exit requests its canonical destination.
    await expect(page).toHaveURL(/\/(game\/explore|auth)/, { timeout: 20000 })
  })
}
