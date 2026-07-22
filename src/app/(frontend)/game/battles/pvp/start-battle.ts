import { getPayload } from 'payload'
import configPromise from '@payload-config'
import { redis } from '@/utilities/redis'
import { battles } from '@/data/battles'
import { initializeBattlePokemon } from '@/utilities/battle/battle-logic'
import { createInitialPowersState } from '@/data/powers'
import type { BattleState } from '@/utilities/battle/types'
import {
  getSkillLevel,
  resolveTrainerBattleItemUseLimit,
  resolveTrainerBattleMoveUseLimit,
} from '@/utilities/skills/unlocks'
import { getPokemonResearchLevel } from '@/utilities/research/research-levels'
import { getUserPokedexMap } from '@/utilities/user-state'
import { initializeTeamMoveUses } from '@/utilities/battle/move-uses'
import { applyBattleRarityEntryEffects } from '@/utilities/battle/rarity-effects'

const PVP_BATTLE_PREFIX = 'pvp:battle:'
const BATTLE_TTL = 3600

export async function initializeSharedPvpBattle(
  battleId: string,
  matchData: { player1: string; player2: string; configId: string },
): Promise<BattleState | null> {
  const payload = await getPayload({ config: configPromise })
  const battleConfig = battles.find((b) => b.id === matchData.configId)
  if (!battleConfig) return null

  // Fetch Team Helper
  const maxPokemon = battleConfig.maxPokemon || 6
  const getTeam = async (userId: string) => {
    return (
      await payload.find({
        collection: 'pokemon',
        where: {
          user: { equals: userId },
          onBattleTeam: { equals: true },
        },
        limit: maxPokemon,
        sort: 'battleTeamPosition',
      })
    ).docs
  }

  const [p1Docs, p2Docs, p1Details, p2Details, p1Pokedex, p2Pokedex] =
    await Promise.all([
      getTeam(matchData.player1),
      getTeam(matchData.player2),
      payload.findByID({ collection: 'users', id: matchData.player1 }),
      payload.findByID({ collection: 'users', id: matchData.player2 }),
      getUserPokedexMap(payload as any, matchData.player1),
      getUserPokedexMap(payload as any, matchData.player2),
    ])

  if (!p1Details || !p2Details || p1Docs.length === 0 || p2Docs.length === 0)
    return null

  const p1TrainerLevel = getSkillLevel(p1Details.skills, 'battling')
  const p2TrainerLevel = getSkillLevel(p2Details.skills, 'battling')
  const p1MoveUseLimit = resolveTrainerBattleMoveUseLimit(
    p1TrainerLevel,
    battleConfig.movesPerBattle,
  )
  const p2MoveUseLimit = resolveTrainerBattleMoveUseLimit(
    p2TrainerLevel,
    battleConfig.movesPerBattle,
  )
  const p1ItemUseLimit = resolveTrainerBattleItemUseLimit(
    p1TrainerLevel,
    battleConfig.itemsPerBattle,
  )
  const p2ItemUseLimit = resolveTrainerBattleItemUseLimit(
    p2TrainerLevel,
    battleConfig.itemsPerBattle,
  )
  const p1Team = initializeTeamMoveUses(
    p1Docs.map((p) =>
      initializeBattlePokemon(
        p,
        battleConfig.levelCap,
        true,
        p1TrainerLevel,
        getPokemonResearchLevel(p1Pokedex as any, p.speciesId, p.formId),
      ),
    ),
    p1MoveUseLimit,
  )
  const p2Team = initializeTeamMoveUses(
    p2Docs.map((p) =>
      initializeBattlePokemon(
        p,
        battleConfig.levelCap,
        true,
        p2TrainerLevel,
        getPokemonResearchLevel(p2Pokedex as any, p.speciesId, p.formId),
      ),
    ),
    p2MoveUseLimit,
  )
  const p1Powers = createInitialPowersState({
    movesPerBattle: p1MoveUseLimit,
    teraUsesPerBattle: battleConfig.teraUsesPerBattle,
    dynamaxPerBattle: battleConfig.dynamaxPerBattle,
    megaEvolutionsPerBattle: battleConfig.megaEvolutionsPerBattle,
    zMovesPerBattle: battleConfig.zMovesPerBattle,
  })
  const p2Powers = createInitialPowersState({
    movesPerBattle: p2MoveUseLimit,
    teraUsesPerBattle: battleConfig.teraUsesPerBattle,
    dynamaxPerBattle: battleConfig.dynamaxPerBattle,
    megaEvolutionsPerBattle: battleConfig.megaEvolutionsPerBattle,
    zMovesPerBattle: battleConfig.zMovesPerBattle,
  })
  if (p1Team[0]) {
    p1Team[0].activeTurnStarted = 1
  }
  if (p2Team[0]) {
    p2Team[0].activeTurnStarted = 1
  }

  const initialState: BattleState = {
    playerTeam: p1Team,
    enemyTeam: p2Team,
    activePlayerIndex: 0,
    activeEnemyIndex: 0,
    turn: 1,
    history: [],
    status: 'ongoing',
    battleId: battleConfig.id,
    pvpBattleId: battleId,
    background: battleConfig.background,
    playerName: p1Details.trainerName || 'Player 1',
    enemyName: p2Details.trainerName || 'Player 2',
    isWildBattle: false,
    itemsUsedThisBattle: [],
    powers: p1Powers,
    pvpPowers: {
      [matchData.player1]: p1Powers,
      [matchData.player2]: p2Powers,
    },
    pvpMoveUseLimits: {
      [matchData.player1]: p1MoveUseLimit,
      [matchData.player2]: p2MoveUseLimit,
    },
    pvpItemUseLimits: {
      [matchData.player1]: p1ItemUseLimit,
      [matchData.player2]: p2ItemUseLimit,
    },
    config: {
      itemsPerBattle: p1ItemUseLimit,
      movesPerBattle: p1MoveUseLimit,
      allowSwapping: battleConfig.allowSwapping !== false,
    },
    isPvp: true,
    playerTrainer: {
      name: p1Details.trainerName || 'Player 1',
      icon: (p1Details as any).icon,
      banner: (p1Details as any).banner,
      title: (p1Details as any).title,
    },
    enemyTrainer: {
      name: p2Details.trainerName || 'Player 2',
      icon: (p2Details as any).icon,
      banner: (p2Details as any).banner,
      title: (p2Details as any).title,
    },
  }

  const rarityMessages = [
    ...applyBattleRarityEntryEffects(initialState.playerTeam[initialState.activePlayerIndex]),
    ...applyBattleRarityEntryEffects(initialState.enemyTeam[initialState.activeEnemyIndex]),
  ]
  if (rarityMessages.length) {
    initialState.history.unshift({
      turn: initialState.turn,
      playerStance: 'tech',
      enemyStance: 'tech',
      result: 'tie',
      damageDealt: 0,
      damageTaken: 0,
      message: rarityMessages.join('\n'),
    })
  }

  // Set NX
  const set = await redis.set(`${PVP_BATTLE_PREFIX}${battleId}`, initialState, {
    ex: BATTLE_TTL,
    nx: true,
  })

  if (!set) {
    return await redis.get<BattleState>(`${PVP_BATTLE_PREFIX}${battleId}`)
  }

  return initialState
}
