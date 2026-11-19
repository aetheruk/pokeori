import { notFound } from 'next/navigation'

export default async function TcgBattlePreviewPage({
  searchParams,
}: {
  searchParams: Promise<{ mode?: string }>
}) {
  if (process.env.NODE_ENV === 'production' || process.env.POKEORI_UI_TEST !== '1') notFound()
  const { TcgBattleFixture } = await import('./fixture')
  const { mode } = await searchParams
  return <TcgBattleFixture key={mode} pvp={mode === 'pvp'} />
}
