import { expect, test, type Locator } from '@playwright/test'

async function expectFullViewport(dialog: Locator, width: number, height: number) {
  await expect.poll(async () => {
    const box = await dialog.boundingBox()
    return box && {
      x: Math.round(box.x),
      y: Math.round(box.y),
      width: Math.round(box.width),
      height: Math.round(box.height),
    }
  }).toEqual({ x: 0, y: 0, width, height })
}

for (const width of [390, 1280]) {
  test(`result and task narrative fill the viewport at ${width}px`, async ({ page }) => {
    const height = width === 390 ? 844 : 800
    await page.setViewportSize({ width, height })
    await page.goto('/ui-test/result-layout')
    const result = page.getByRole('dialog')
    await expect(result.getByRole('heading', { name: 'Task complete' })).toBeVisible()
    await expectFullViewport(result, width, height)
    const resultImage = result.locator('section img').first()
    await expect.poll(() => resultImage.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0)
    expect(Math.round((await resultImage.boundingBox())?.x ?? -1)).toBe(0)
    expect(Math.round((await resultImage.boundingBox())?.width ?? 0)).toBe(width)
    await page.screenshot({ path: `test-results/result-summary-${width}.png` })

    await result.getByRole('button', { name: 'Continue' }).click()
    const story = page.getByRole('dialog')
    await expect(story.getByRole('heading', { name: 'A new path opens' })).toBeVisible()
    await expectFullViewport(story, width, height)

    const hero = story.locator('img[alt="Background"]')
    const heroBox = await hero.boundingBox()
    expect(heroBox?.height).toBeGreaterThan(height * 0.4)
    expect(Math.round(heroBox?.x ?? -1)).toBe(0)
    expect(Math.round(heroBox?.width ?? 0)).toBe(width)
    await expect.poll(() => hero.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0)
    await expect.poll(() => story.locator('img[alt="Icon"]').evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0)
    expect((await story.locator('.game-icon-orb').boundingBox())?.width).toBeGreaterThan(90)
    await expect(story.getByText('The next challenge awaits beyond the forest.')).toBeVisible()
    await expect(story.getByRole('button', { name: 'Continue journey' })).toBeVisible()
    await page.screenshot({ path: `test-results/result-story-${width}.png` })
  })
}

test('VS cards use the battle scene behind a readable overlay', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/ui-test/result-layout')
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await page.getByRole('button', { name: 'Continue journey' }).click()
  await page.getByRole('button', { name: 'Open VS' }).click()

  const backdrop = page.getByTestId('vs-animation-backdrop')
  await expect(backdrop).toHaveCSS('background-image', /forest\.avif/)
  await expect(backdrop).toBeVisible()
  await page.waitForTimeout(800)
  await page.screenshot({ path: 'test-results/vs-battle-scene.png' })
})

test('level-up and research results also fill the viewport', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/ui-test/result-layout')
  await page.getByRole('button', { name: 'Continue', exact: true }).click()
  await page.getByRole('button', { name: 'Continue journey' }).click()

  await page.getByRole('button', { name: 'Open level up' }).click()
  await expectFullViewport(page.getByRole('dialog'), 390, 844)
  await page.getByRole('dialog').getByRole('button', { name: 'Continue' }).click()

  await page.getByRole('button', { name: 'Open research' }).click()
  await expectFullViewport(page.getByRole('dialog'), 390, 844)
})
