import { expect, test } from '@playwright/test'
import baseSet from '../src/data/tcg/sets/base1'

const fixtureCard = baseSet.cards[0]
const fixtureSet = { ...baseSet, cards: [] }

for (const width of [390, 1280]) {
  test(`sending Carddex duplicates keeps the card panel open at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 844 })
    let duplicatesSent = false
    await page.route('**/api/game/catalog/tcg?**', async (route) => {
      await route.fulfill({
        contentType: 'application/json',
        body: JSON.stringify({
          items: duplicatesSent
            ? []
            : [{ card: fixtureCard, set: fixtureSet }],
          total: duplicatesSent ? 0 : 1,
          ownedTotal: duplicatesSent ? 0 : 1,
          nextCursor: null,
        }),
      })
    })
    await page.goto('/ui-test')
    await page.getByRole('button', { name: 'Test Carddex duplicates' }).click()
    await page.getByRole('button', { name: 'View Alakazam card 1' }).click()

    const panel = page.getByRole('dialog', { name: 'Alakazam' })
    await expect(panel).toBeVisible()
    await expect(panel.getByText('Collected').locator('..')).toContainText('3')

    duplicatesSent = true
    await panel
      .getByRole('button', { name: 'Send 2 duplicate cards to HQ' })
      .click()

    await expect(panel).toBeVisible()
    await expect(panel).toContainText('Sent to HQ')
    await expect(panel.getByText('Collected').locator('..')).toContainText('1')
    await expect(panel).toContainText('No longer in this view')
  })
}
