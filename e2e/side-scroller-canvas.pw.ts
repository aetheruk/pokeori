import { expect, test, type Locator, type Page } from '@playwright/test'

async function readCanvasFrame(canvas: Locator) {
  return canvas.evaluate((element) => {
    const node = element as HTMLCanvasElement
    const context = node.getContext('2d')
    if (!context) return { checksum: 0, paintedSamples: 0 }
    const pixels = context.getImageData(0, 0, node.width, node.height).data
    let checksum = 0
    let paintedSamples = 0
    for (let index = 0; index < pixels.length; index += 388) {
      const alpha = pixels[index + 3]
      if (alpha > 0) paintedSamples += 1
      checksum =
        (checksum * 33 + pixels[index] + pixels[index + 1] + pixels[index + 2] + alpha) >>>
        0
    }
    return { checksum, paintedSamples }
  })
}

async function openCanvasFixture(
  page: Page,
  gameType: 'run' | 'flap',
) {
  await page.goto('/ui-test')
  await page
    .getByRole('button', {
      name: gameType === 'run' ? 'Test Rattata canvas' : 'Test Flap canvas',
    })
    .click()
  const canvas = page.getByTestId(`side-scroller-canvas-${gameType}`)
  await expect(canvas).toBeVisible()
  await expect(canvas).toHaveAttribute('width', '600')
  await expect(canvas).toHaveAttribute('height', '600')
  await expect
    .poll(async () => (await readCanvasFrame(canvas)).paintedSamples)
    .toBeGreaterThan(0)
  return canvas
}

test('Rattata Run canvas paints interpolated frames in the mobile stage', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 })
  const canvas = await openCanvasFixture(page, 'run')
  await page.waitForTimeout(3400)
  const first = await readCanvasFrame(canvas)
  await page.waitForTimeout(250)
  const second = await readCanvasFrame(canvas)
  const bounds = await canvas.boundingBox()

  expect(second.checksum).not.toBe(first.checksum)
  expect(bounds?.width).toBeLessThanOrEqual(390)
  expect(Math.abs((bounds?.width || 0) - (bounds?.height || 0))).toBeLessThan(1)
})

test('Flap canvas paints interpolated frames in the desktop stage', async ({
  page,
}) => {
  await page.setViewportSize({ width: 1280, height: 900 })
  const canvas = await openCanvasFixture(page, 'flap')
  await page.waitForTimeout(3150)
  await page.keyboard.press('Space')
  const first = await readCanvasFrame(canvas)
  await page.waitForTimeout(250)
  const second = await readCanvasFrame(canvas)
  const bounds = await canvas.boundingBox()

  expect(second.checksum).not.toBe(first.checksum)
  expect(bounds?.width).toBeLessThanOrEqual(600)
  expect(Math.abs((bounds?.width || 0) - (bounds?.height || 0))).toBeLessThan(1)
})
