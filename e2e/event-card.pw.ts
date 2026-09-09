import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`events use an Explore card and scrollable details at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 740 })
    await page.goto('/ui-test/event-card')
    const card = page.getByRole('button', { name: 'Open Active Events', exact: true })
    await expect(card).toBeVisible()
    await expect(page.getByRole('button', { name: 'Open VS Seeker' })).toBeVisible()
    await expect(page.getByText('Upcoming and active events')).toHaveCount(0)
    await expect(page.getByText('Route 1 outbreak')).toHaveCount(0)
    await page.screenshot({ path: `/tmp/events-card-${width}.png` })
    await card.click()
    const panel = page.getByRole('dialog')
    await expect(panel.getByRole('heading', { name: 'Active Events', exact: true })).toBeVisible()
    await expect(panel.getByText('Route 1 outbreak', { exact: true })).toBeVisible()
    await panel.getByText('Adventure 7', { exact: true }).scrollIntoViewIfNeeded()
    await expect(panel.getByText('Adventure 7', { exact: true })).toBeInViewport()
    await page.screenshot({ path: `/tmp/events-panel-${width}.png` })
    await panel.getByRole('button', { name: 'Close', exact: true }).click()
    await expect(panel).toHaveCount(0)
    await page.goto('/ui-test/event-card?event=event-7')
    await expect(page.getByRole('dialog').getByText('Adventure 7', { exact: true })).toBeInViewport()
    await page.getByRole('dialog').getByRole('button', { name: 'Close', exact: true }).click()
    await expect(page.getByRole('dialog')).toHaveCount(0)
  })
}
