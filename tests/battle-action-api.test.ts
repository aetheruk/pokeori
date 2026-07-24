import { beforeEach, describe, expect, mock, test } from 'bun:test'

const submitTurnMock = mock(async () => ({
  success: true,
  state: { turn: 2 },
}))
const useMoveMock = mock(async () => ({ success: true }))
const useBattleItemMock = mock(async () => ({ success: true }))
const swapPokemonMock = mock(async () => ({ success: true }))
const useTeraOrbMock = mock(async () => ({ success: true }))
const useMegaEvolutionMock = mock(async () => ({ success: true }))
const useZMoveMock = mock(async () => ({ success: true }))
const useDynamaxMock = mock(async () => ({ success: true }))
const useVictoryPowerMock = mock(async () => ({ success: true }))
const useWeatherPowerMock = mock(async () => ({ success: true }))
const useShoutMock = mock(async () => ({ success: true }))
const useCircadianMock = mock(async () => ({ success: true }))
const surrenderBattleMock = mock(async () => ({ success: true }))
const getBattleStateMock = mock(async () => ({ turn: 4 }))

mock.module('@/app/(frontend)/game/battles/actions', () => ({
  submitTurn: submitTurnMock,
  useMove: useMoveMock,
  useBattleItem: useBattleItemMock,
  swapPokemon: swapPokemonMock,
  useTeraOrb: useTeraOrbMock,
  useMegaEvolution: useMegaEvolutionMock,
  useZMove: useZMoveMock,
  useDynamax: useDynamaxMock,
  useVictoryPower: useVictoryPowerMock,
  useWeatherPower: useWeatherPowerMock,
  useShout: useShoutMock,
  useCircadian: useCircadianMock,
  surrenderBattle: surrenderBattleMock,
  getBattleState: getBattleStateMock,
}))

function makeRequest(body: unknown, headers: Record<string, string> = {}) {
  return new Request('https://pokeori.app/api/game/battles/action', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      host: 'pokeori.app',
      origin: 'https://pokeori.app',
      'x-pokeori-battle-action': '1',
      ...headers,
    },
    body: JSON.stringify(body),
  })
}

describe('battle action API', () => {
  beforeEach(() => {
    submitTurnMock.mockClear()
    useMoveMock.mockClear()
    surrenderBattleMock.mockClear()
    getBattleStateMock.mockClear()
  })

  test('dispatches stance submissions without a Server Action response', async () => {
    const { POST } = await import('@/app/api/game/battles/action/route')
    const response = await POST(
      makeRequest({
        kind: 'stance',
        stance: 'speed',
        attackType: 'electric',
        clientActionId: 'battle-action-1',
      }),
    )

    expect(response.status).toBe(200)
    expect(response.headers.get('cache-control')).toContain('no-store')
    expect(await response.json()).toEqual({
      success: true,
      state: { turn: 2 },
    })
    expect(submitTurnMock).toHaveBeenCalledWith(
      'speed',
      'electric',
      'battle-action-1',
    )
  })

  test('dispatches authored moves with their selected type', async () => {
    const { POST } = await import('@/app/api/game/battles/action/route')
    const response = await POST(
      makeRequest({
        kind: 'move',
        moveId: 'vine-whip',
        selectedType: 'grass',
        clientActionId: 'battle-action-2',
      }),
    )

    expect(response.status).toBe(200)
    expect(useMoveMock).toHaveBeenCalledWith(
      'vine-whip',
      'grass',
      'battle-action-2',
    )
  })

  test('returns the terminal state with a surrender response', async () => {
    const { POST } = await import('@/app/api/game/battles/action/route')
    const response = await POST(
      makeRequest({
        kind: 'surrender',
        clientActionId: 'battle-action-3',
      }),
    )

    expect(response.status).toBe(200)
    expect(await response.json()).toEqual({
      success: true,
      state: { turn: 4 },
    })
    expect(surrenderBattleMock).toHaveBeenCalledTimes(1)
    expect(getBattleStateMock).toHaveBeenCalledTimes(1)
  })

  test('rejects requests without the same-origin action header', async () => {
    const { POST } = await import('@/app/api/game/battles/action/route')
    const response = await POST(
      makeRequest(
        {
          kind: 'stance',
          stance: 'power',
          attackType: 'fire',
          clientActionId: 'battle-action-4',
        },
        { 'x-pokeori-battle-action': '0' },
      ),
    )

    expect(response.status).toBe(403)
    expect(submitTurnMock).toHaveBeenCalledTimes(0)
  })

  test('rejects malformed action payloads before dispatch', async () => {
    const { POST } = await import('@/app/api/game/battles/action/route')
    const response = await POST(
      makeRequest({
        kind: 'swap',
        pokemonIndex: 99,
        clientActionId: 'battle-action-5',
      }),
    )

    expect(response.status).toBe(400)
  })
})
