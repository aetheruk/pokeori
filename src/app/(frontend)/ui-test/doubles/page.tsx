import { notFound } from 'next/navigation'
import { AudioProvider } from '@/context/AudioContext'

export default async function DoubleBattleUiTestPage() {
  if (
    process.env.NODE_ENV !== 'production' &&
    process.env.POKEORI_UI_TEST === '1'
  ) {
    const { DoubleBattleUiFixture } = await import('./fixture')
    return <AudioProvider><DoubleBattleUiFixture /></AudioProvider>
  }
  notFound()
}
