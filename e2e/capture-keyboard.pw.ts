import { expect, test } from '@playwright/test'

test.use({ hasTouch: true })

test('capture requires prepared aim and supports a native keyboard throw', async ({ page }) => {
  await page.goto('/ui-test')
  await page.getByRole('button', { name: 'Test capture keyboard' }).click()
  await expect(page.getByRole('button', { name: 'Preparing Poké Ball' })).toBeDisabled()
  await page.getByRole('button', { name: 'Prepare test throw' }).focus()
  await page.keyboard.press('Space')
  const throwButton = page.getByRole('button', { name: 'Throw Poké Ball', exact: true })
  await expect(throwButton).toBeEnabled()
  await expect(throwButton).toHaveText('')
  await throwButton.click()
  await expect(page.getByText('Keyboard throws: 0')).toBeVisible()
  await throwButton.focus()
  await page.keyboard.press('Enter')
  await expect(page.getByText('Keyboard throws: 1')).toBeVisible()
})

test('the ball still throws by swiping upward', async ({ page }) => {
  await page.goto('/ui-test')
  await page.getByRole('button', { name: 'Test capture keyboard' }).click()
  await page.getByRole('button', { name: 'Prepare test throw' }).click()
  const ball = page.getByRole('button', { name: 'Throw Poké Ball', exact: true })
  await ball.scrollIntoViewIfNeeded()
  const bounds = await ball.boundingBox()
  if (!bounds) throw new Error('Ball is not visible')
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y + bounds.height / 2)
  await page.mouse.down()
  await page.mouse.move(bounds.x + bounds.width / 2, bounds.y - 150, { steps: 12 })
  await page.mouse.up()
  await expect(page.getByText('Keyboard throws: 1')).toBeVisible()
})

test('touch users swipe the ball upward without a throw button', async ({ page, context }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/ui-test')
  await page.getByRole('button', { name: 'Test capture keyboard' }).click()
  await page.getByRole('button', { name: 'Prepare test throw' }).click()
  const ball = page.getByRole('button', { name: 'Throw Poké Ball', exact: true })
  await ball.scrollIntoViewIfNeeded()
  const bounds = await ball.boundingBox()
  if (!bounds) throw new Error('Ball is not visible')
  const x = bounds.x + bounds.width / 2
  const y = bounds.y + bounds.height / 2
  await page.touchscreen.tap(x, y)
  await expect(page.getByText('Keyboard throws: 0')).toBeVisible()
  const touch = await context.newCDPSession(page)
  await touch.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x, y }] })
  for (let step = 1; step <= 12; step++) {
    await touch.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x, y: y - step * 15 }] })
  }
  await touch.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] })
  await expect(page.getByText('Keyboard throws: 1')).toBeVisible()
})
