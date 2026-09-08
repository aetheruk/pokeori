import { createHash } from 'node:crypto'
import { expect, test } from '@playwright/test'

const body = '<svg xmlns="http://www.w3.org/2000/svg" width="1" height="1"></svg>'
const revision = createHash('sha256').update(body).digest('hex')

test('real service worker serves bundled art and Next image variants offline', async ({ page, context }) => {
  await page.goto('/ui-test')
  await page.evaluate(async () => {
    await navigator.serviceWorker.register('/sw.js')
    await navigator.serviceWorker.ready
    if (!navigator.serviceWorker.controller) await new Promise<void>((resolve) => {
      navigator.serviceWorker.addEventListener('controllerchange', () => resolve(), { once: true })
    })
  })
  const asset = '/sprites/pokemon/home/normal/1.avif'
  const initial = await page.evaluate(async (url) => {
    const response = await fetch(url)
    return { status: response.status, bytes: (await response.arrayBuffer()).byteLength }
  }, asset)
  expect(initial.status).toBe(200)
  expect(initial.bytes).toBeGreaterThan(0)
  await context.setOffline(true)
  for (const url of [asset, `/_next/image?url=${encodeURIComponent(asset)}&w=640&q=75`]) {
    const result = await page.evaluate(async (source) => {
      const response = await fetch(source)
      return { status: response.status, bytes: (await response.arrayBuffer()).byteLength }
    }, url)
    expect(result).toEqual(initial)
  }
  await context.setOffline(false)
})

for (const width of [390, 1280]) {
  test(`trainer settings download, resume, remove, and audio at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 })
    let downloads = 0
    await page.route('**/api/game-images', (route) => route.fulfill({ json: [
      { url: '/test-art.svg', revision, bytes: body.length },
    ] }))
    await page.route('**/test-art.svg?*', (route) => {
      downloads++
      return route.fulfill({ body, contentType: 'image/svg+xml' })
    })
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test trainer settings', exact: true }).click()
    await page.getByRole('button', { name: 'Trainer settings', exact: true }).click()
    const panel = page.getByRole('dialog', { name: 'Settings', exact: true })
    await expect(panel).toBeVisible()
    const audio = panel.getByRole('button', { name: /Game audio/ })
    const before = await audio.getAttribute('aria-pressed')
    await audio.click()
    await expect(audio).toHaveAttribute('aria-pressed', before === 'true' ? 'false' : 'true')
    await panel.getByRole('button', { name: 'Download images', exact: true }).click()
    await expect(panel.getByRole('button', { name: 'Images downloaded' })).toBeDisabled()
    expect(downloads).toBe(1)
    await expect(panel.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1')
    const bounds = await panel.boundingBox()
    expect(bounds!.x).toBeGreaterThanOrEqual(0)
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width + 1)
    await page.screenshot({ path: `/tmp/pokeori-settings-${width}.png` })
    await page.keyboard.press('Escape')
    await page.getByRole('button', { name: 'Trainer settings', exact: true }).click()
    await expect(panel.getByRole('button', { name: 'Images downloaded' })).toBeDisabled()
    expect(downloads).toBe(1)
    await panel.getByRole('button', { name: 'Remove downloads', exact: true }).click()
    await expect(panel.getByRole('button', { name: 'Download images', exact: true })).toBeEnabled()
    await expect(panel.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '0')
  })
}

test('cancelled downloads retain completed files and resume only missing images', async ({ page }) => {
  let slow = true
  let firstDownloads = 0
  await page.route('**/api/game-images', (route) => route.fulfill({ json: [
    { url: '/first-art.svg', revision, bytes: body.length },
    { url: '/second-art.svg', revision, bytes: body.length },
  ] }))
  await page.route('**/first-art.svg?*', (route) => {
    firstDownloads++
    return route.fulfill({ body, contentType: 'image/svg+xml' })
  })
  await page.route('**/second-art.svg?*', async (route) => {
    if (slow) await new Promise((resolve) => setTimeout(resolve, 1500))
    await route.fulfill({ body, contentType: 'image/svg+xml' }).catch(() => {})
  })
  await page.goto('/ui-test')
  await page.getByRole('button', { name: 'Test trainer settings', exact: true }).click()
  await page.getByRole('button', { name: 'Trainer settings', exact: true }).click()
  const panel = page.getByRole('dialog', { name: 'Settings', exact: true })
  await panel.getByRole('button', { name: 'Download images', exact: true }).click()
  await expect(panel.getByRole('progressbar')).toHaveAttribute('aria-valuenow', '1')
  await panel.getByRole('button', { name: 'Cancel download', exact: true }).click()
  await expect(panel.getByRole('status')).toContainText('Download paused')
  slow = false
  await panel.getByRole('button', { name: 'Resume download', exact: true }).click()
  await expect(panel.getByRole('button', { name: 'Images downloaded' })).toBeDisabled()
  expect(firstDownloads).toBe(1)
})
