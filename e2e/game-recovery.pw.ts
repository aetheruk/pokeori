import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => { await page.goto('/ui-test') })

test('keyboard retry preserves the submitted game result', async ({ page }) => {
  const trigger = page.getByRole('button', { name: 'Test dropped result' })
  await trigger.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('dialog')).toBeVisible()
  await expect(page.getByRole('button', { name: 'Retry', exact: true })).toBeFocused()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('status').filter({ hasText: 'Saved score: 120' })).toBeVisible()
  await expect(page.getByRole('dialog')).toBeHidden()
})

test('scratch reveal and claim are operable using the keyboard', async ({ page }) => {
  await page.getByRole('button', { name: 'Test scratch card' }).click()
  await expect(page.getByRole('button', { name: 'Claim Prize' })).toBeDisabled()
  const reveal = page.getByRole('button', { name: 'Reveal card' })
  await reveal.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByRole('button', { name: 'Claim Prize' })).toBeEnabled()
})

for (const viewport of [{ width: 390, height: 844 }, { width: 844, height: 390 }]) {
  test(`auth remains usable at ${viewport.width}×${viewport.height}`, async ({ page }) => {
    await page.setViewportSize(viewport)
    await expect(page.getByRole('button', { name: 'Log in', exact: true })).toBeVisible()
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(viewport.width)
    expect(await page.locator('meta[name="viewport"]').getAttribute('content')).not.toContain('user-scalable=no')
  })
}

test('page scripts function under the nonce policy without violations', async ({ page }) => {
  const reports: string[] = []
  page.on('request', (request) => {
    if (request.url().includes('/api/security/csp-report')) reports.push(request.url())
  })
  const response = await page.reload()
  expect(response?.headers()['content-security-policy']).toContain("'strict-dynamic'")
  await page.getByRole('button', { name: 'Test scratch card' }).click()
  await expect(page.getByRole('dialog')).toBeVisible()
  expect(reports).toEqual([])
})
