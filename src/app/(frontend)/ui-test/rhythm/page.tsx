import { notFound } from 'next/navigation'

export default async function RhythmUiTestPage() {
  if (process.env.NODE_ENV !== 'production' && process.env.POKEORI_UI_TEST === '1') {
    const { RhythmFixture } = await import('./fixture')
    return <RhythmFixture />
  }
  notFound()
}
