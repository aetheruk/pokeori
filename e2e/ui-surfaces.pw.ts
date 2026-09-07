import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => { await page.goto('/ui-test') })

for (const width of [390, 1280]) {
  test(`auth downloads only the intended background at ${width}px`, async ({ browser }) => {
    const context = await browser.newContext({ viewport: { width, height: 844 } })
    const page = await context.newPage()
    const backgrounds: string[] = []
    page.on('request', (request) => {
      if (/pokeori-auth-(mobile|desktop)\.avif/.test(request.url())) backgrounds.push(request.url())
    })
    await page.goto('http://127.0.0.1:3101/ui-test')
    const expected = width < 768 ? 'mobile' : 'desktop'
    await expect(page.locator('picture img')).toHaveJSProperty('complete', true)
    expect(backgrounds).toHaveLength(1)
    expect(backgrounds[0]).toContain(`pokeori-auth-${expected}.avif`)
    await context.close()
  })
}

test('Art Academy stays drawable in short landscape and supports keyboard strokes', async ({ page }) => {
  await page.setViewportSize({ width: 844, height: 390 })
  await page.getByRole('button', { name: 'Test Art Academy' }).click()
  const canvas = page.getByLabel('Drawing canvas')
  await expect(canvas).toBeVisible()
  await expect(page.getByRole('button', { name: 'Use colour 1' })).toBeEnabled()
  const bounds = await canvas.boundingBox()
  expect(bounds?.width).toBeGreaterThanOrEqual(200)
  expect(bounds?.height).toBeGreaterThanOrEqual(200)
  await expect(page.getByRole('button', { name: 'Clear', exact: true })).toBeDisabled()
  await canvas.focus()
  await page.keyboard.press('Space')
  await page.keyboard.press('Shift+ArrowRight')
  await expect(page.getByRole('button', { name: 'Clear', exact: true })).toBeEnabled()
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(844)
})

test('ranked queue exposes join and polling failures and cancellation can be retried', async ({ page }) => {
  await page.getByRole('button', { name: 'Test ranked queue' }).click()
  const dialog = page.getByRole('dialog', { name: 'Ranked Queue' })
  await expect(dialog.getByRole('alert')).toContainText('Unable to confirm your queue entry')
  await dialog.getByRole('button', { name: 'Retry queue' }).click()
  await expect(dialog.getByRole('alert')).toContainText('Connection interrupted', { timeout: 10000 })
  await dialog.getByRole('button', { name: 'Cancel', exact: true }).click()
  await expect(dialog.getByRole('alert')).toContainText('Cancellation could not be confirmed')
  await dialog.getByRole('button', { name: 'Cancel', exact: true }).click()
  await expect(dialog).toBeHidden()
})

test('reduced-motion battle introduction avoids moving the trainer cards', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.getByRole('button', { name: 'Test battle intro' }).click()
  await expect(page.getByText('Test trainer', { exact: true })).toBeVisible()
  const animatedCard = page.getByText('Test trainer', { exact: true }).locator('xpath=ancestor::*[contains(@class,"max-w-3xl")][1]')
  await expect(animatedCard).toHaveCSS('transform', 'none')
})
