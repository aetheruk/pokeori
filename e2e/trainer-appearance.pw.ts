import { expect, test } from '@playwright/test'

for (const width of [390, 1280]) {
  test(`grid walking interpolates cells and frames at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 850 })
    await page.route('**/ui-test', async (route) => {
      if (route.request().method() === 'POST') {
        await route.fulfill({ contentType: 'text/x-component', body: '0:{"a":"$@1","f":"","b":"development"}\n1:{"success":true}\n' })
      } else await route.continue()
    })
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test grid appearance', exact: true }).click()
    const fixture = page.getByRole('region', { name: 'Grid appearance fixture', exact: true })
    await fixture.getByRole('combobox', { name: 'Grid character' }).selectOption('neither')
    // Freeze real browser animations so intermediate positions can be checked
    // without relying on a screenshot landing inside a 360ms movement window.
    await page.evaluate(() => {
      const animate = Element.prototype.animate
      Element.prototype.animate = function (...args) {
        const animation = animate.apply(this, args)
        animation.pause()
        animation.currentTime = 180
        return animation
      }
    })
    for (const variant of ['rock-push', 'voltorb', 'echo-map']) {
      await page.emulateMedia({ reducedMotion: 'no-preference' })
      await fixture.getByRole('combobox', { name: 'Grid variant' }).selectOption(variant)
      const sprite = fixture.locator('[data-grid-player-sprite]')
      const token = sprite.locator('../..')
      if (variant === 'voltorb') {
        for (const name of ['rattata', 'voltorb']) {
          const image = fixture.locator(`img[src*="${name}-idle.png"]`).first()
          await expect(image).toBeVisible()
          await expect.poll(() => image.evaluate((el) => (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
        }
      }
      const position = () => token.evaluate((el) => {
        const transform = new DOMMatrixReadOnly(getComputedStyle(el).transform)
        return { x: transform.m41, y: transform.m42, width: el.getBoundingClientRect().width }
      })
      const before = await position()
      const direction = variant === 'rock-push' ? 'down' : variant === 'voltorb' ? 'left' : 'right'
      const axis = variant === 'rock-push' ? 'y' : 'x'
      const control = fixture.getByRole('button', { name: `Move ${direction}`, exact: true })
      await expect(control).toBeEnabled()
      await control.click()
      await expect.poll(() => token.evaluate((el) => el.getAnimations().length)).toBe(1)
      expect(await token.evaluate((el) => el.getAnimations()[0].effect!.getTiming().duration)).toBe(360)
      expect(await sprite.evaluate((el) => el.getAnimations()[0].effect!.getTiming().duration)).toBe(360)
      const middle = await position()
      expect(Math.abs(middle![axis] - before![axis])).toBeCloseTo(before!.width / 2, 0)
      for (const [time, frame] of [[45, 0], [135, 1], [225, 2], [315, 3]]) {
        await sprite.evaluate((el, time) => { el.getAnimations()[0].currentTime = time }, time)
        const x = await sprite.evaluate((el) => parseFloat(getComputedStyle(el).backgroundPositionX))
        expect(x).toBeCloseTo(frame * 100 / 3, 2)
      }
      await token.evaluate((el) => el.getAnimations({ subtree: true }).forEach((animation) => animation.finish()))
      await expect(sprite).toHaveCSS('background-position-x', '0%')
      const after = await position()
      expect(Math.abs(after![axis] - before![axis])).toBeCloseTo(before!.width, 0)
      await fixture.getByRole('grid').screenshot({ path: `/tmp/pokeori-grid-walk-${variant}-${width}.png` })
      await page.emulateMedia({ reducedMotion: 'reduce' })
      await page.waitForTimeout(370)
      await fixture.getByRole('button', { name: `Move ${direction === 'down' ? 'up' : direction === 'left' ? 'right' : 'left'}`, exact: true }).click()
      await expect.poll(() => token.evaluate((el) => ({
        reduced: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
        animations: [el, el.querySelector('[data-grid-player-sprite]')!]
          .flatMap((target) => target.getAnimations()).map((a) => a.playState),
      }))).toEqual({ reduced: true, animations: [] })
      const returned = await position()
      expect(returned![axis]).toBeCloseTo(before![axis], 0)
      if (variant === 'rock-push') {
        await page.emulateMedia({ reducedMotion: 'no-preference' })
        await page.waitForTimeout(370)
        await fixture.getByRole('button', { name: 'Undo move', exact: true }).click()
        await expect.poll(async () => (await position())[axis]).toBe(after[axis])
        expect(await token.evaluate((el) => el.getAnimations({ subtree: true }).length)).toBe(0)
        await fixture.getByRole('button', { name: 'Restart puzzle', exact: true }).click()
        await expect.poll(async () => (await position())[axis]).toBe(before[axis])
        await fixture.getByRole('button', { name: 'Move up', exact: true }).click()
        await expect(sprite).toHaveCSS('background-position-y', '100%')
        expect((await position()).y).toBe(before.y)
        expect(await token.evaluate((el) => el.getAnimations().length)).toBe(0)
        expect(await sprite.evaluate((el) => el.getAnimations().length)).toBe(0)
      }
    }
  })
}

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

test('every grid variant renders the saved character and directional facing rows', async ({ page }) => {
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
    for (const [gender, asset] of [['male', 'lucas.png'], ['female', 'dawn.png'], ['neither', 'ditto.png']]) {
      await fixture.getByRole('combobox', { name: 'Grid character' }).selectOption(gender)
      const sprite = fixture.locator('[data-grid-player-sprite]')
      await expect(sprite).toHaveAttribute('data-grid-player-sprite', new RegExp(asset.replace('.', '\\.') + '$'))
      await expect(sprite).toHaveCSS('background-size', '400% 400%')
      await expect(sprite).toBeVisible()
      if (variant === 'voltorb' && gender === 'male') {
        await expect(fixture.getByRole('button', { name: 'Move left', exact: true })).toBeEnabled()
        await fixture.getByRole('button', { name: 'Move left', exact: true }).click()
        await expect(sprite).toHaveCSS('background-position-y', /33\.333/)
      }
    }
  }
})
