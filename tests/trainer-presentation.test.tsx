import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { TrainerRow } from '@/components/game/trainer/trainer-row'

describe('trainer presentation', () => {
  test('renders a compact, keyboard-native public trainer row', () => {
    const markup = renderToStaticMarkup(
      <TrainerRow
        trainer={{
          trainerName: 'Leaf',
          icon: 'ditto',
          title: 'new-beginnings',
        }}
        onSelect={() => undefined}
        meta={<span>Rank 12</span>}
      />,
    )

    expect(markup).toContain('<button')
    expect(markup).toContain('View Leaf&#x27;s trainer profile')
    expect(markup).toContain('aria-haspopup="dialog"')
    expect(markup).toContain('Rank 12')
  })
})
