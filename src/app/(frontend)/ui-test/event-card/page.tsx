import { notFound } from 'next/navigation'
import { EventCardFixture } from './fixture'

export default function EventCardTestPage() {
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.POKEORI_UI_TEST !== '1'
  )
    notFound()
  return <EventCardFixture />
}
