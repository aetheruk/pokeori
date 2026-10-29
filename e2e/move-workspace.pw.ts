import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`move search and assignment preserve the Pokemon inspector at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test Pokemon inspector', exact: true }).click()
    await page.getByRole('button', { name: 'Open fixture inspector', exact: true }).click()
    const inspector = page.getByRole('dialog', { name: 'Inspector fixture', exact: true })
    await expect(page.getByText(/Evolution move: Rollout/)).toBeVisible()
    await page.getByRole('button', { name: 'Manage moves', exact: true }).click()
    const workspace = page.getByRole('dialog', { name: "Inspector fixture's moves", exact: true })
    await expect(workspace).toBeVisible()
    await page.getByPlaceholder('Find a move').fill('rollout')
    const moveList = workspace.getByLabel('Available moves')
    const assign = moveList.getByRole('button', { name: 'Assign Rollout', exact: true })
    const details = moveList.getByRole('button', { name: 'View Rollout details', exact: true })
    await expect(workspace.getByRole('button', { name: 'Filters' })).toHaveAttribute('data-haptic', 'selection')
    await expect(assign).not.toHaveAttribute('data-haptic')
    await expect(details).not.toHaveAttribute('data-haptic')
    await expect(moveList.locator('[data-haptic-overlay]')).toHaveCount(0)
    await assign.click()
    await expect(workspace).toBeVisible()
    await expect(workspace.getByRole('heading', { name: 'Assigned moves 1/1' })).toBeVisible()
    await expect(workspace.getByRole('button', { name: 'Remove Rollout', exact: true }).first()).toBeVisible()
    await expect(moveList.getByRole('button', { name: 'Remove Rollout', exact: true })).not.toHaveAttribute('data-haptic')
    await page.getByPlaceholder('Find a move').fill('no matching move')
    await expect(workspace).toBeVisible()
    await page.getByPlaceholder('Find a move').fill('rollout')
    await expect.poll(() => workspace.evaluate((element) => element.scrollWidth <= element.clientWidth)).toBe(true)
    await page.screenshot({ path: `/tmp/pokeori-move-workspace-${width}.png` })
    await workspace.getByRole('button', { name: 'Close', exact: true }).click()
    await expect(workspace).toBeHidden()
    await expect(inspector).toBeVisible()
    // A staged selection cannot unlock evolution until the server saves it.
    await expect(page.getByText('Evolution Detected', { exact: true })).toBeHidden()
    await page.getByRole('button', { name: 'Manage moves', exact: true }).click()
    await expect(workspace.getByRole('heading', { name: 'Assigned moves 1/1' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(workspace).toBeHidden()
    await expect(inspector).toBeVisible()
  })
}

test.describe('mobile move list', () => {
  test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } })

  test('a touch drag scrolls from a move row without adding haptic overlays', async ({ page }) => {
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test move scrolling', exact: true }).click()
    const workspace = page.getByRole('dialog', { name: "Scroll fixture's moves" })
    const list = workspace.getByLabel('Available moves')
    const row = list.getByRole('button', { name: /^Assign / }).first()
    await expect(row).toBeVisible()
    await expect(workspace.getByRole('button', { name: 'Filters' })).toHaveAttribute('data-haptic', 'selection')
    await expect(row).not.toHaveAttribute('data-haptic')
    const bounds = await row.boundingBox()
    if (!bounds) throw new Error('Move row is not visible')
    const cdp = await page.context().newCDPSession(page)
    await cdp.send('Input.synthesizeScrollGesture', {
      x: bounds.x + bounds.width / 2,
      y: bounds.y + bounds.height / 2,
      yDistance: -300,
      gestureSourceType: 'touch',
    })
    await expect.poll(() => list.evaluate((element) => element.scrollTop)).toBeGreaterThan(0)
    await expect(list.locator('[data-haptic-overlay]')).toHaveCount(0)
  })
})
