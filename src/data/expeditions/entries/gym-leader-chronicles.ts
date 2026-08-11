import {
  chronicleActivityId,
  KANTO_GYM_CHRONICLE_STORIES,
} from '@/data/gym-leader-chronicle-stories'
import { KANTO_GYM_CHRONICLES, type KantoGymChronicleKey } from '@/data/gym-leader-chronicles'
import type {
  ExpeditionActivityPool,
  ExpeditionChroniclePokemonConfig,
  ExpeditionConfig,
} from '../types'

const battleTeams: Record<KantoGymChronicleKey, ExpeditionChroniclePokemonConfig[]> = {
  brock: [
    { speciesId: 74, formId: '74', name: 'Geodude', level: 12, assignedMoves: ['rock-throw', 'harden'] },
    { speciesId: 95, formId: '95', name: 'Onix', level: 14, assignedMoves: ['bind', 'headbutt', 'rock-slide'] },
  ],
  misty: [
    { speciesId: 121, formId: '121', name: 'Starmie', level: 21, assignedMoves: ['water-gun', 'confusion', 'recover', 'swift'] },
    { speciesId: 54, formId: '54', name: 'Psyduck', level: 18, assignedMoves: ['water-gun', 'confusion', 'disable', 'tail-whip'] },
  ],
  surge: [
    { speciesId: 26, formId: '26', name: 'Raichu', level: 30, assignedMoves: ['thunder-shock', 'thunder-wave', 'quick-attack'] },
    { speciesId: 81, formId: '81', name: 'Magnemite', level: 26, assignedMoves: ['thunder-shock', 'swift'] },
    { speciesId: 100, formId: '100', name: 'Voltorb', level: 25, assignedMoves: ['thunder-shock', 'quick-attack'] },
  ],
  erika: [
    { speciesId: 44, formId: '44', name: 'Gloom', level: 28, assignedMoves: ['absorb', 'acid', 'mega-drain', 'sleep-powder'] },
    { speciesId: 114, formId: '114', name: 'Tangela', level: 27, assignedMoves: ['vine-whip', 'bind', 'mega-drain', 'stun-spore'] },
    { speciesId: 103, formId: '103', name: 'Exeggutor', level: 29, assignedMoves: ['psybeam', 'sleep-powder', 'leech-seed', 'reflect'] },
  ],
  koga: [
    { speciesId: 48, formId: '48', name: 'Venonat', level: 32, assignedMoves: ['confusion', 'psybeam', 'poison-sting'] },
    { speciesId: 109, formId: '109', name: 'Koffing', level: 34, assignedMoves: ['sludge', 'smokescreen', 'acid'] },
    { speciesId: 88, formId: '88', name: 'Grimer', level: 33, assignedMoves: ['sludge', 'acid', 'harden'] },
  ],
  sabrina: [
    { speciesId: 64, formId: '64', name: 'Kadabra', level: 38, assignedMoves: ['confusion', 'psybeam', 'recover', 'disable'] },
    { speciesId: 122, formId: '122', name: 'Mr. Mime', level: 36, assignedMoves: ['confusion', 'psybeam'] },
    { speciesId: 96, formId: '96', name: 'Drowzee', level: 34, assignedMoves: ['hypnosis', 'confusion', 'headbutt'] },
  ],
  blaine: [
    { speciesId: 58, formId: '58', name: 'Growlithe', level: 40, assignedMoves: ['ember', 'bite', 'take-down'] },
    { speciesId: 77, formId: '77', name: 'Ponyta', level: 39, assignedMoves: ['ember', 'fire-spin', 'stomp'] },
    { speciesId: 126, formId: '126', name: 'Magmar', level: 43, assignedMoves: ['ember', 'smokescreen', 'fire-spin'] },
    { speciesId: 78, formId: '78', name: 'Rapidash', level: 44, assignedMoves: ['fire-spin', 'stomp', 'take-down'] },
  ],
  giovanni: [
    { speciesId: 53, formId: '53', name: 'Persian', level: 42, assignedMoves: ['pay-day', 'bite', 'swift'] },
    { speciesId: 111, formId: '111', name: 'Rhyhorn', level: 44, assignedMoves: ['horn-attack', 'stomp', 'rock-slide'] },
    { speciesId: 34, formId: '34', name: 'Nidoking', level: 46, assignedMoves: ['double-kick', 'poison-sting', 'earthquake'] },
    { speciesId: 115, formId: '115', name: 'Kangaskhan', level: 43, assignedMoves: ['bite', 'stomp', 'headbutt', 'rage'] },
  ],
}

export const gymLeaderChronicleExpeditions: ExpeditionConfig[] = KANTO_GYM_CHRONICLES.map(
  (chronicle) => {
    const story = KANTO_GYM_CHRONICLE_STORIES[chronicle.key]
    const activities = story.sequence.map((beat) => ({
      type: beat.type === 'scene' ? ('task' as const) : beat.type,
      id: beat.id,
    }))
    const activityPool = activities.reduce<ExpeditionActivityPool>((pool, activity) => {
      const ids = pool[activity.type] ?? []
      pool[activity.type] = [...ids, chronicleActivityId(chronicle.key, activity.id)]
      return pool
    }, {})

    return {
      id: chronicle.expeditionId,
      name: `${chronicle.leaderName}: ${chronicle.title}`,
      description: `Step into the memory held by the ${chronicle.badgeName} and witness the choices that shaped ${chronicle.leaderName}.`,
      category: 'Kanto',
      subCategory: 'Pokemon Tower',
      buttonText: 'Enter the Memory',
      icon: { type: 'trainer', id: chronicle.trainerIconId },
      background: chronicle.background,
      maxLosses: 3,
      canFail: false,
      chronicle: {
        playerName: chronicle.leaderName,
        playerIcon: chronicle.trainerSprite,
        playerTitle: chronicle.playerTitle,
        battleTeam: battleTeams[chronicle.key],
        battleItems: { 'battle-potion': 3, 'battle-super-potion': 1 },
        balls: { 'poke-ball': 3, 'great-ball': 1 },
      },
      requirements: [
        { type: 'task_completed', targetId: chronicle.markerId },
        {
          type: 'expedition_result',
          targetId: chronicle.expeditionId,
          expeditionStatus: 'completed',
          count: 1,
          inverse: true,
        },
      ],
      activityPool,
      path: activities.map((activity, index) => ({
        type: 'activity' as const,
        id: `${chronicle.key}-chronicle-step-${index + 1}`,
        activityType: activity.type,
        activityId: chronicleActivityId(chronicle.key, activity.id),
        secret: true,
      })),
      rewards: [
        { type: 'xp', skill: 'catching', quantity: chronicle.explorerXp, dropChance: 100 },
      ],
    }
  },
)
