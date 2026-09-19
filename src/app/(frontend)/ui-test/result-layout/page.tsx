import { notFound } from 'next/navigation'

export default async function ResultLayoutUiTestPage() {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.POKEORI_UI_TEST === '1'
  ) {
    const { ResultLayoutFixture } = await import('./fixture')
    return <ResultLayoutFixture />
  }
  notFound()
}
