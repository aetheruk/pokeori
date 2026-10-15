import { notFound } from 'next/navigation'

export default async function TowerTrialsUiTestPage() {
  if (process.env.NODE_ENV !== 'production' && process.env.POKEORI_UI_TEST === '1') {
    const { TowerTrialsFixture } = await import('./fixture')
    return <TowerTrialsFixture />
  }
  notFound()
}
