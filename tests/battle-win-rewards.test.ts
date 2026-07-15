import { describe, expect, test } from 'bun:test'
import type { User } from '@/payload-types'
import {
  BATTLE_PARTICIPANT_RESEARCH_XP,
  BATTLE_WILD_TARGET_RESEARCH_XP,
  buildBattleWinRewards,
} from '@/app/(frontend)/game/battles/helpers/win-rewards'
import {
  makeBattlePokemon,
  makePveBattleState,
} from './helpers/battle-fixtures'

const user = {
  id: 'player-1',
  skills: {
    battling: {
      level: 20,
    },
  },
} as unknown as User

describe('battle win rewards', () => {
  test('adds trainer XP from enemy levels and Pokemon base experience without player level diminishing returns', () => {
    const state = makePveBattleState({
      enemyTeam: [
        makeBattlePokemon({
          id: 'enemy-butterfree',
          user: 'enemy',
          speciesId: 12,
          formId: '12',
          level: 20,
          name: 'Butterfree',
        }),
        makeBattlePokemon({
          id: 'enemy-pidgey',
          user: 'enemy',
          speciesId: 16,
          formId: '16',
          level: 10,
          name: 'Pidgey',
        }),
      ],
    })

    const rewards = buildBattleWinRewards(state, user, {
      isWildBattle: false,
      rewards: [],
    })
    const highLevelUserRewards = buildBattleWinRewards(
      state,
      { ...user, skills: { battling: { level: 90 } } } as User,
      {
        isWildBattle: false,
        rewards: [],
      },
    )

    expect(rewards).toContainEqual({
      type: 'xp',
      skill: 'battling',
      quantity: 93,
      dropChance: 100,
    })
    expect(highLevelUserRewards.find((reward) => reward.type === 'xp')).toEqual(
      rewards.find((reward) => reward.type === 'xp'),
    )
  })

  test('can scale generated trainer XP per battle', () => {
    const state = makePveBattleState({
      enemyTeam: [
        makeBattlePokemon({
          id: 'enemy-butterfree',
          user: 'enemy',
          speciesId: 12,
          formId: '12',
          level: 20,
          name: 'Butterfree',
        }),
        makeBattlePokemon({
          id: 'enemy-pidgey',
          user: 'enemy',
          speciesId: 16,
          formId: '16',
          level: 10,
          name: 'Pidgey',
        }),
      ],
    })

    const rewards = buildBattleWinRewards(state, user, {
      isWildBattle: false,
      rewards: [],
      generatedXpMultiplier: 0.5,
    })

    expect(rewards).toContainEqual({
      type: 'xp',
      skill: 'battling',
      quantity: 47,
      dropChance: 100,
    })
  })

  test('adds guaranteed trainer candy from the highest enemy level', () => {
    const state = makePveBattleState({
      enemyTeam: [
        makeBattlePokemon({
          id: 'enemy-butterfree',
          user: 'enemy',
          speciesId: 12,
          formId: '12',
          level: 20,
          name: 'Butterfree',
        }),
      ],
    })

    const rewards = buildBattleWinRewards(state, user, {
      isWildBattle: false,
      rewards: [],
    })

    expect(rewards).toContainEqual({
      type: 'item',
      targetId: 'rare-candy-s',
      quantity: 1,
      dropChance: 100,
    })
  })

  test('can suppress automatic candy from battle win rewards', () => {
    const state = makePveBattleState({
      enemyTeam: [
        makeBattlePokemon({
          id: 'enemy-butterfree',
          user: 'enemy',
          speciesId: 12,
          formId: '12',
          level: 20,
          name: 'Butterfree',
        }),
      ],
    })

    const rewards = buildBattleWinRewards(state, user, {
      isWildBattle: false,
      rewards: [],
      disableCandyRewards: true,
    })

    expect(
      rewards.some((reward) => reward.type === 'item' && String(reward.targetId).startsWith('rare-candy-')),
    ).toBe(false)
  })

  test('adds Pokemon research XP chance for each involved Pokemon only', () => {
    const state = makePveBattleState({
      playerTeam: [
        makeBattlePokemon({
          id: 'player-bulbasaur',
          speciesId: 1,
          formId: '1',
        }),
        makeBattlePokemon({
          id: 'player-charmander',
          speciesId: 4,
          formId: '4',
        }),
        makeBattlePokemon({
          id: 'player-squirtle',
          speciesId: 7,
          formId: '7',
        }),
      ],
      playerParticipantIndexes: [0, 2],
    })

    const rewards = buildBattleWinRewards(state, user, {
      isWildBattle: false,
      rewards: [],
    })
    const researchRewards = rewards.filter(
      (reward) => reward.type === 'pokemon_research_xp',
    )

    expect(researchRewards).toContainEqual({
      type: 'pokemon_research_xp',
      targetId: '1',
      quantity: BATTLE_PARTICIPANT_RESEARCH_XP,
      dropChance: 100,
    })
    expect(researchRewards).toContainEqual({
      type: 'pokemon_research_xp',
      targetId: '7',
      quantity: BATTLE_PARTICIPANT_RESEARCH_XP,
      dropChance: 100,
    })
    expect(researchRewards.some((reward) => reward.targetId === '4')).toBe(false)
  })

  test('adds Pokemon research XP for wild battle targets', () => {
    const state = makePveBattleState({
      enemyTeam: [
        makeBattlePokemon({
          id: 'enemy-rattata',
          user: 'enemy',
          speciesId: 19,
          formId: '19',
          level: 5,
          name: 'Rattata',
        }),
      ],
    })

    const rewards = buildBattleWinRewards(state, user, {
      isWildBattle: true,
      rewards: [],
    })

    expect(rewards).toContainEqual({
      type: 'pokemon_research_xp',
      targetId: '19',
      quantity: BATTLE_WILD_TARGET_RESEARCH_XP,
      dropChance: 100,
    })
  })

  test('does not add Pokemon research XP for trainer battle targets', () => {
    const state = makePveBattleState({
      enemyTeam: [
        makeBattlePokemon({
          id: 'enemy-rattata',
          user: 'enemy',
          speciesId: 19,
          formId: '19',
          level: 5,
          name: 'Rattata',
        }),
      ],
    })

    const rewards = buildBattleWinRewards(state, user, {
      isWildBattle: false,
      rewards: [],
    })

    expect(
      rewards.some(
        (reward) =>
          reward.type === 'pokemon_research_xp' && reward.targetId === '19',
      ),
    ).toBe(false)
  })

  test('includes battle rewards generated by moves such as Pay Day', () => {
    const state = makePveBattleState({
      moveRewards: [
        {
          type: 'currency',
          targetId: 'pokedollars',
          quantity: 30,
          dropChance: 100,
        },
      ],
    })

    const rewards = buildBattleWinRewards(state, user, {
      isWildBattle: false,
      rewards: [],
      disableCandyRewards: true,
    })

    expect(rewards).toContainEqual({
      type: 'currency',
      targetId: 'pokedollars',
      quantity: 30,
      dropChance: 100,
    })
  })

  test('adds Pickup battle win item rolls for involved Pokemon without held items', () => {
    const state = makePveBattleState({
      playerTeam: [
        makeBattlePokemon({
          id: 'pickup-user',
          name: 'Meowth',
          ability: 'pickup',
        }),
        makeBattlePokemon({
          id: 'benched-pickup-user',
          name: 'Aipom',
          ability: 'pickup',
        }),
        makeBattlePokemon({
          id: 'held-pickup-user',
          name: 'Lillipup',
          ability: 'pickup',
          heldItem: { id: 'oran-berry', name: 'Oran Berry' },
        }),
      ],
      playerParticipantIndexes: [0, 2],
    })

    const rewards = buildBattleWinRewards(state, user, {
      isWildBattle: false,
      rewards: [],
      disableCandyRewards: true,
    })
    const pickupRewards = rewards.filter(
      (reward) =>
        reward.type === 'item' &&
        ['poke-ball', 'repel', 'escape-rope', 'stardust'].includes(
          String(reward.targetId),
        ) &&
        reward.dropChance === 2.5,
    )

    expect(pickupRewards).toEqual([
      { type: 'item', targetId: 'poke-ball', quantity: 1, dropChance: 2.5 },
      { type: 'item', targetId: 'repel', quantity: 1, dropChance: 2.5 },
      { type: 'item', targetId: 'escape-rope', quantity: 1, dropChance: 2.5 },
      { type: 'item', targetId: 'stardust', quantity: 1, dropChance: 2.5 },
    ])
  })

  test('does not add extra wild candy for researched enemy species', () => {
    const state = makePveBattleState({
      enemyTeam: [
        makeBattlePokemon({
          id: 'enemy-butterfree',
          user: 'enemy',
          speciesId: 12,
          formId: '12',
          level: 20,
          name: 'Butterfree',
        }),
      ],
    })
    const researchedUser = {
      ...user,
      pokedex: {
        '12': {
          '12': {
            researchLevel: 2,
          },
        },
      },
    } as User

    const rewards = buildBattleWinRewards(state, researchedUser, {
      isWildBattle: true,
      rewards: [],
    })

    expect(
      rewards.some(
        (reward) =>
          reward.type === 'item' &&
          reward.targetId === 'rare-candy-s' &&
          reward.dropChance === 20,
      ),
    ).toBe(false)
  })

  test('wild battle gem rewards ignore high-tier gem config and grant one base gem', () => {
    const state = makePveBattleState({
      enemyTeam: [
        makeBattlePokemon({
          id: 'enemy-geodude',
          user: 'enemy',
          speciesId: 74,
          formId: '74',
          level: 10,
          name: 'Geodude',
        }),
      ],
    })

    const rewards = buildBattleWinRewards(state, user, {
      isWildBattle: true,
      rewards: [],
      gemConfig: {
        base: { min: 1, max: 5, dropRate: 100 },
        shining: { min: 1, max: 5, dropRate: 100 },
        pristine: { min: 1, max: 5, dropRate: 100 },
      },
    })

    const gemReward = rewards.find(
      (reward) => reward.type === 'item' && String(reward.targetId).endsWith('-gem'),
    )

    expect(gemReward).toMatchObject({
      quantity: { min: 1, max: 1 },
      dropChance: 100,
    })
    expect(['rock-gem', 'ground-gem']).toContain(gemReward?.targetId)
  })
})
