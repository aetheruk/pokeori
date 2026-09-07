import { notFound } from 'next/navigation'

export default async function UiTestGamePage() {
  if (process.env.NODE_ENV !== 'production' && process.env.POKEORI_UI_TEST === '1') {
    const { UiTestFixture } = await import('../../../ui-test/ui-test-fixture')
    return <UiTestFixture />
  }
  notFound()
}
