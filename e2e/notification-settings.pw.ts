import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`notifications default off without prompting on an unsupported browser at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 })
    await page.addInitScript(() => {
      Reflect.deleteProperty(window, 'PushManager')
      Notification.requestPermission = () => { throw new Error('Must not request permission on mount') }
    })
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test trainer settings', exact: true }).click()
    const panel = page.getByRole('region', { name: 'Notifications', exact: true })
    await panel.scrollIntoViewIfNeeded()
    for (const name of ['Voyage completion Off', 'Daily task reset Off']) {
      await expect(panel.getByRole('button', { name, exact: true })).toBeDisabled()
      await expect(panel.getByRole('button', { name, exact: true })).toHaveAttribute('aria-pressed', 'false')
    }
    await expect(panel.getByRole('status', { name: 'Notification status' })).toContainText('Home Screen')
    await expect(panel.getByText('Daily reset: 00:00 UTC, after the tutorial.')).toBeHidden()
    await panel.getByText('Details', { exact: true }).click()
    await expect(panel.getByText('Daily reset: 00:00 UTC, after the tutorial.')).toBeVisible()
    await panel.getByText('Details', { exact: true }).click()
    const bounds = await panel.boundingBox()
    expect(bounds!.x).toBeGreaterThanOrEqual(0)
    expect(bounds!.x + bounds!.width).toBeLessThanOrEqual(width)
    await panel.screenshot({ path: `/tmp/pokeori-notification-settings-${width}.png` })
  })
}
