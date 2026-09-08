import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`move search and assignment preserve the Pokemon inspector at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 844 })
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test Pokemon inspector', exact: true }).click()
    await page.getByRole('button', { name: 'Open fixture inspector', exact: true }).click()
    await expect(page.getByText(/Evolution move: Rollout/)).toBeVisible()
    await page.getByRole('button', { name: 'Manage moves', exact: true }).click()
    const workspace = page.getByRole('dialog', { name: "Choose Inspector fixture's moves", exact: true })
    await expect(workspace).toBeVisible()
    await page.getByPlaceholder('Search names or effects').fill('rollout')
    await page.getByRole('button', { name: 'Assign Rollout', exact: true }).click()
    await expect(workspace).toBeVisible()
    await expect(workspace.getByText('1/1 slots filled')).toBeVisible()
    await page.getByPlaceholder('Search names or effects').fill('no matching move')
    await expect(workspace).toBeVisible()
    await page.getByPlaceholder('Search names or effects').fill('rollout')
    await page.screenshot({ path: `/tmp/pokeori-move-workspace-${width}.png` })
    await workspace.getByRole('button', { name: 'Close', exact: true }).click()
    await expect(workspace).toBeHidden()
    await expect(page.getByRole('dialog', { name: 'Details', exact: true })).toBeVisible()
    // A staged selection cannot unlock evolution until the server saves it.
    await expect(page.getByText('Evolution Detected', { exact: true })).toBeHidden()
    await page.getByRole('button', { name: 'Manage moves', exact: true }).click()
    await expect(workspace.getByText('1/1 slots filled')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(workspace).toBeHidden()
    await expect(page.getByRole('dialog', { name: 'Details', exact: true })).toBeVisible()
  })
}
