import { expect, test, type Page } from '@playwright/test'

const handButton = (page: Page) => page.getByRole('button', { name: /^Hand, / })
const hand = (page: Page) => page.getByRole('complementary', { name: 'Your hand' })
const previewScreenshot = (page: Page, path: string) => page.screenshot({
  path,
  style: 'nextjs-portal { display: none !important; }',
})

async function trackHits(page: Page) {
  const hits: string[] = []
  await page.exposeFunction('recordTcgHit', (id: string) => hits.push(id))
  await page.addInitScript(() => {
    const { recordTcgHit } = window as unknown as { recordTcgHit: (id: string) => void }
    new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue
          const markers = node.matches('[data-hit-id]')
            ? [node]
            : node.querySelectorAll('[data-hit-id]')
          for (const marker of markers) recordTcgHit(marker.getAttribute('data-hit-id') || '')
        }
      }
    }).observe(document, { childList: true, subtree: true })
  })
  return hits
}

for (const [width, height] of [[320, 568], [390, 844], [844, 390], [1280, 800]]) {
  test(`card table keeps the hand and attacks separate at ${width}×${height}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height })
    await page.emulateMedia({ reducedMotion: 'reduce' })
    await page.goto('/ui-test/tcg-battle')
    const field = page.getByRole('region', { name: 'Battlefield' })
    const dock = page.getByRole('region', { name: 'Battle actions' })
    const thunderWave = page.getByRole('button', { name: /^Thunder Wave,/ })
    const selfdestruct = page.getByRole('button', { name: /^Selfdestruct,/ })
    await expect(thunderWave).toBeVisible()
    await expect(selfdestruct).toBeVisible()
    const [boardBox, buttonBox, attackBox] = await Promise.all([
      field.boundingBox(), handButton(page).boundingBox(), selfdestruct.boundingBox(),
    ])
    expect(boardBox).toBeTruthy()
    expect(buttonBox).toBeTruthy()
    expect(attackBox!.x + attackBox!.width).toBeLessThanOrEqual(width)
    const rightDock = buttonBox!.x >= boardBox!.x + boardBox!.width - 1
    if (!rightDock) expect(buttonBox!.y).toBeGreaterThanOrEqual(boardBox!.y + boardBox!.height - 1)
    if (width === 390) await previewScreenshot(page, info.outputPath('battle-board.png'))

    await handButton(page).click()
    await expect(hand(page)).toBeVisible()
    await expect(hand(page)).toHaveCSS('opacity', '1')
    const handButtonsHaveNoHaptics = await hand(page)
      .locator('ul button')
      .evaluateAll((buttons) =>
        buttons.every((button) => button.getAttribute('data-haptic-disabled') === 'true'),
      )
    expect(handButtonsHaveNoHaptics).toBe(true)
    await expect(page.getByRole('button', { name: /^Drew / })).toHaveCount(0)
    const [handBox, dockBox] = await Promise.all([hand(page).boundingBox(), dock.boundingBox()])
    expect(handBox!.x).toBeGreaterThanOrEqual(0)
    expect(handBox!.y).toBeGreaterThanOrEqual(0)
    if (rightDock) expect(handBox!.x + handBox!.width).toBeLessThanOrEqual(dockBox!.x + 1)
    else expect(handBox!.y + handBox!.height).toBeLessThanOrEqual(dockBox!.y + 1)
    await expect(hand(page).locator('[data-new="true"]')).toHaveCount(1)
    if (width === 390 || (width === 844 && height === 390) || width === 1280) {
      await previewScreenshot(page, info.outputPath('battle-hand.png'))
    }

    await hand(page).getByRole('button', { name: 'Inspect Magneton', exact: true }).first().click()
    await expect(page.getByRole('dialog', { name: 'Magneton' })).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(hand(page)).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(handButton(page)).toBeFocused()
  })
}

test('plays the third Basic up front, then the next Basic to the Bench', async ({ page }) => {
  await page.goto('/ui-test/tcg-battle')
  await handButton(page).click()
  await hand(page).getByRole('button', { name: /Rhyhorn, Play to front row/ }).click()
  await expect(page.getByRole('region', { name: 'Your front row' }).getByRole('button', { name: /^Rhyhorn,/ })).toBeVisible()
  await handButton(page).click()
  await hand(page).getByRole('button', { name: /Pikachu, Play to Bench/ }).click()
  await expect(page.getByRole('region', { name: /^Your bench/ }).getByRole('button', { name: /^Pikachu,/ })).toBeVisible()
  await expect(page.getByText('Your turn', { exact: true })).toBeVisible()
})

test('plain Evolution resolves in place and special effects use a board target or compact choice', async ({ page }, info) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.emulateMedia({ reducedMotion: 'reduce' })
  await page.goto('/ui-test/tcg-battle')
  const yourFront = page.getByRole('region', { name: 'Your front row' })
  const foeFront = page.getByRole('region', { name: 'Opponent front row' })
  await handButton(page).click()
  await hand(page).getByRole('button', { name: /^Magneton, Choose Evolution target, new this turn/ }).click()
  const evolveMagnemite = yourFront.getByRole('button', { name: /Magnemite.*eligible Evolution target/ })
  await expect(evolveMagnemite).toBeFocused()
  await expect(hand(page)).toHaveCount(0)
  await previewScreenshot(page, info.outputPath('battle-evolution.png'))
  await evolveMagnemite.click()
  await expect(yourFront.getByRole('button', { name: /^Magneton,/ })).toBeVisible()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await expect(page.getByText('Your turn', { exact: true })).toBeVisible()

  await handButton(page).click()
  await expect(hand(page).locator('[data-new="true"]')).toHaveCount(0)
  await hand(page).getByRole('button', { name: /Dark Crobat, Choose Evolution target/ }).click()
  await page.getByRole('button', { name: /Golbat.*eligible Evolution target/ }).click()
  await expect(page.getByText('Choose an opposing Pokémon', { exact: true })).toBeVisible()
  await expect(page.getByRole('dialog')).toHaveCount(0)
  await foeFront.getByRole('button', { name: /Oddish.*eligible Evolution target/ }).click()
  await expect(foeFront.getByRole('button', { name: /Oddish, 40 of 60 HP/ })).toBeVisible()
  await expect(page.getByRole('button', { name: /^Dark Crobat,/ })).toBeVisible()

  await handButton(page).click()
  await hand(page).getByRole('button', { name: /Slowbro, Choose Evolution target/ }).click()
  await yourFront.getByRole('button', { name: /Slowpoke.*eligible Evolution target/ }).click()
  const choice = page.getByRole('dialog', { name: 'Slowbro' })
  await expect(choice).toBeVisible()
  await choice.getByRole('button', { name: 'Just evolve' }).click()
  await expect(yourFront.getByRole('button', { name: /^Slowbro,/ })).toBeVisible()
})

test('an NPC hit that causes a knockout plays once before the board settles', async ({ page }) => {
  const hits = await trackHits(page)
  await page.goto('/ui-test/tcg-battle')
  await handButton(page).click()
  await hand(page).getByRole('button', { name: /Rhyhorn, Play to front row/ }).click()
  await expect(page.getByRole('region', { name: 'Your front row' }).getByRole('button', { name: /^Rhyhorn,/ })).toBeVisible()
  await page.getByRole('button', { name: /^Thunder Wave,/ }).click()
  await expect.poll(() => hits).toEqual(['player-hit'])
  const cpuLives = page.getByRole('region', { name: 'CPU' }).getByRole('img', {
    name: '3 lives remaining. The battle is lost at zero.',
  })
  await expect(cpuLives).toBeVisible()
  await expect(page.getByRole('region', { name: 'You', exact: true })).toContainText(/Deck\s*7/)
  await expect(page.getByRole('region', { name: 'Opponent front row' }).getByRole('button', { name: /^Meowth,/ })).toHaveCount(0)
  await handButton(page).click()
  await page.keyboard.press('Escape')
  expect(hits).toEqual(['player-hit'])
})

test('PvP plays the fresh front and Bench damage once and ignores repeated polls', async ({ page }) => {
  const hits = await trackHits(page)
  await page.goto('/ui-test/tcg-battle?mode=pvp')
  await expect.poll(() => hits).toEqual(['remote-hit', 'remote-spread'])
  await expect(page.getByRole('button', { name: /Magnemite, 40 of 60 HP/ })).toBeVisible()
  await expect(page.getByRole('button', { name: /Golbat, 50 of 60 HP/ })).toBeVisible()
  await expect(page.getByText('Your turn', { exact: true })).toBeVisible()
  await handButton(page).click()
  await expect(page.locator('[data-hit-id]')).toHaveCount(0)
  expect(hits).toEqual(['remote-hit', 'remote-spread'])
})
