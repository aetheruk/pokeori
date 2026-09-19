import { describe, expect, test } from 'bun:test'
import { renderToStaticMarkup } from 'react-dom/server'
import { BattleControlRegion } from '@/app/(frontend)/game/battles/_components/battle-control-region'
import { BATTLE_TYPE_TONES, BattleTypeAtmosphere } from '@/app/(frontend)/game/battles/_components/battle-type-atmosphere'
import type { BattleState } from '@/utilities/battle/types'

const types = [
  'normal', 'fighting', 'flying', 'poison', 'ground', 'rock', 'bug', 'ghost', 'steel',
  'fire', 'water', 'grass', 'electric', 'psychic', 'ice', 'dragon', 'dark', 'fairy',
]

describe('battle type atmosphere', () => {
  test('has a distinct scene palette for every Pokemon type', () => {
    expect(Object.keys(BATTLE_TYPE_TONES).sort()).toEqual([...types].sort())
    expect(new Set(Object.values(BATTLE_TYPE_TONES).map((tone) => tone.base)).size).toBe(18)
  })

  test('keeps the scene decorative and the power counter inside Powers', () => {
    const state = { history: [], powers: { stanceWinCharges: 2 } } as unknown as BattleState
    const main = renderToStaticMarkup(
      <BattleControlRegion state={state} panel={null} onBack={() => undefined} commands={<button type="button">Powers</button>} />,
    )
    expect(main).not.toContain('Powers 2/3')

    const powers = renderToStaticMarkup(
      <BattleControlRegion state={state} panel="powers" onBack={() => undefined} commands={null} uses="2/3 wins" />,
    )
    expect(powers).toContain('2/3 wins')

    const scene = renderToStaticMarkup(<BattleTypeAtmosphere type="Grass" />)
    expect(scene).toContain('aria-hidden="true"')
    expect(scene).toContain('data-type="grass"')
  })
})
