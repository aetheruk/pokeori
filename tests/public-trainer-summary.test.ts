import { describe, expect, test } from 'bun:test'
import { buildPublicTrainerSummaries } from '@/utilities/trainers/public-summary'

describe('public trainer summaries', () => {
  test('batches public collection and battle-team records into truthful summaries', async () => {
    const calls: any[] = []
    const payload = {
      async find(args: any) {
        calls.push(args)
        if (args.collection === 'user-tcg-cards') {
          return {
            docs: [
              { user: 'trainer-2', cardId: 'base1-1' },
              { user: 'trainer-2', cardId: 'base1-1' },
            ],
          }
        }
        if (args.collection === 'user-pokedex-entries') {
          return {
            docs: [
              { user: 'trainer-2', seen: true, caught: false },
              { user: 'trainer-2', seen: true, caught: true },
            ],
          }
        }
        return {
          docs: [
            {
              user: 'trainer-2',
              speciesId: 1,
              formId: '1',
              name: '',
              level: 12,
              rarity: 'normal',
              battleTeamPosition: 2,
              assignedMoves: ['private-move'],
              stats: { hp: 999 },
            },
            {
              user: 'trainer-2',
              speciesId: 25,
              formId: '25',
              name: 'Sparky',
              level: 18,
              rarity: 'shiny',
              battleTeamPosition: 1,
            },
          ],
        }
      },
    }
    const viewer = {
      id: 'trainer-1',
      friends: ['trainer-2'],
      friendRequests: [],
    }
    const trainers = [
      {
        id: 'trainer-2',
        trainerName: 'Leaf',
        skills: {},
        icon: 'ditto',
        banner: 'lab',
        title: 'new-beginnings',
      },
    ]

    const [summary] = await buildPublicTrainerSummaries({
      payload,
      trainers: trainers as any,
      viewer: viewer as any,
    })

    expect(calls.map((call) => call.collection)).toEqual([
      'user-tcg-cards',
      'user-pokedex-entries',
      'pokemon',
    ])
    expect(calls.filter((call) => call.collection === 'pokemon')).toHaveLength(
      1,
    )
    expect(calls.find((call) => call.collection === 'pokemon')?.select).toEqual(
      {
        user: true,
        speciesId: true,
        formId: true,
        name: true,
        level: true,
        rarity: true,
        battleTeamPosition: true,
      },
    )
    expect(summary.stats).toEqual({
      uniqueCards: 1,
      pokedexSeen: 2,
      pokedexCaught: 1,
    })
    expect(summary.isFriend).toBe(true)
    expect(summary.battleTeam).toEqual([
      {
        speciesId: 25,
        formId: '25',
        name: 'Sparky',
        level: 18,
        rarity: 'shiny',
        position: 1,
      },
      {
        speciesId: 1,
        formId: '1',
        name: 'Bulbasaur',
        level: 12,
        rarity: 'normal',
        position: 2,
      },
    ])
    expect(summary.battleTeam[1]).not.toHaveProperty('assignedMoves')
    expect(summary.battleTeam[1]).not.toHaveProperty('stats')
  })
})
