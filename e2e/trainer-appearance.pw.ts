import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`trainer editor previews and saves gender at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 })
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test trainer settings', exact: true }).click()
    const edit = page.getByRole('button', { name: 'Customize trainer card', exact: true })
    await edit.click()
    const editor = page.getByRole('dialog', { name: 'Edit trainer card', exact: true })
    await expect(editor.getByRole('radio', { name: 'Neither', exact: true })).toBeChecked()
    await editor.getByRole('radio', { name: 'Female', exact: true }).check()
    await editor.getByRole('button', { name: 'Cancel', exact: true }).click()
    await edit.click()
    await expect(editor.getByRole('radio', { name: 'Neither', exact: true })).toBeChecked()
    await editor.getByRole('radio', { name: 'Male', exact: true }).check()
    await editor.getByRole('radio', { name: 'Male', exact: true }).press('ArrowRight')
    await expect(editor.getByRole('radio', { name: 'Female', exact: true })).toBeChecked()
    await editor.screenshot({ path: `/tmp/pokeori-trainer-editor-${width}.png` })
    await editor.getByRole('button', { name: 'Save changes', exact: true }).click()
    await expect(editor).toBeHidden()
    await edit.click()
    await expect(editor.getByRole('radio', { name: 'Female', exact: true })).toBeChecked()
    await expect.poll(async () => {
      const bounds = await editor.boundingBox()
      return !!bounds && bounds.x >= 0 && bounds.x + bounds.width <= width + 1
    }).toBe(true)
    await editor.getByText('Avatar · Ditto', { exact: true }).click()
    await editor.getByRole('button', { name: /Use .* trainer avatar/ }).last().click()
    await expect(editor).toBeVisible()
    await editor.getByRole('combobox', { name: 'Background', exact: true }).click()
    await page.getByRole('option').first().click()
    await expect(editor).toBeVisible()
  })
}

test('every grid variant renders the saved character and human facing rows', async ({ page }) => {
  await page.route('**/ui-test', async (route) => {
    if (route.request().method() === 'POST') {
      await route.fulfill({ contentType: 'text/x-component', body: '0:{"a":"$@1","f":"","b":"development"}\n1:{"success":true}\n' })
    } else await route.continue()
  })
  await page.goto('/ui-test')
  await page.getByRole('button', { name: 'Test grid appearance', exact: true }).click()
  const fixture = page.getByRole('region', { name: 'Grid appearance fixture', exact: true })
  for (const variant of ['rock-push', 'voltorb', 'echo-map']) {
    await fixture.getByRole('combobox', { name: 'Grid variant' }).selectOption(variant)
    for (const [gender, asset] of [['male', 'lucas.png'], ['female', 'dawn.png'], ['neither', '132.avif']]) {
      await fixture.getByRole('combobox', { name: 'Grid character' }).selectOption(gender)
      const sprite = fixture.locator('[data-grid-player-sprite]')
      await expect(sprite).toHaveAttribute('data-grid-player-sprite', new RegExp(asset.replace('.', '\\.') + '$'))
      await expect(sprite).toHaveCSS('background-size', gender === 'neither' ? 'contain' : '400% 400%')
      await expect(sprite).toBeVisible()
      if (variant === 'voltorb' && gender === 'male') {
        await expect(fixture.getByRole('button', { name: 'Move left', exact: true })).toBeEnabled()
        await fixture.getByRole('button', { name: 'Move left', exact: true }).click()
        await expect(sprite).toHaveCSS('background-position-y', /33\.333/)
      }
    }
  }
})
