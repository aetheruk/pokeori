import { notFound } from 'next/navigation'
import { z } from 'zod'
import { eventContentSchemas } from '@/utilities/events/model'
import { EventStudioFixture } from './studio-fixture'

export default function EventStudioTestPage() {
  if (
    process.env.NODE_ENV === 'production' ||
    process.env.POKEORI_UI_TEST !== '1'
  )
    notFound()
  const schemas = Object.fromEntries(
    Object.entries(eventContentSchemas).map(([kind, schema]) => {
      const json = z.toJSONSchema(schema, {
        io: 'input',
        unrepresentable: 'any',
      }) as any
      return [kind, json]
    }),
  )
  return <EventStudioFixture schemas={JSON.parse(JSON.stringify(schemas))} />
}
