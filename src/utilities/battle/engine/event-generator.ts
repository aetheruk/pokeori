import type { BattleState, BattleEvent } from './types'
import type { BattleLogEntry } from '../types'

const getTeamPokemon = (team: BattleState['playerTeam'], index: number) => {
  return Array.isArray(team) ? team[index] : undefined
}

const isSameLogEntry = (
  a?: BattleState['history'][number],
  b?: BattleState['history'][number],
) => {
  if (!a || !b) return false
  return a.turn === b.turn && a.message === b.message
}

const isCombatLog = (entry?: BattleState['history'][number]) => {
  if (!entry?.result) return false
  return (
    entry.damageDealt > 0 ||
    entry.damageTaken > 0 ||
    entry.message.includes('[icon:stance:')
  )
}

const hasHealingMessage = (entry?: BattleState['history'][number]) => {
  const message = entry?.message || ''
  return (
    message.includes('[icon:heal:') ||
    /\b(healed|fully healed|restored HP|restored health)\b/i.test(message)
  )
}

type HpEventTarget = 'player' | 'enemy'

interface ExplicitHpEvent {
  amount: number
  kind: 'damage' | 'heal'
  lineIndex: number
  target: HpEventTarget
}

const getCombatLineIndex = (entry?: BattleLogEntry) => {
  if (!entry?.message) return -1
  return entry.message
    .split('\n')
    .findIndex((line) => line.includes('[icon:stance:'))
}

const inferHpEventTarget = (
  line: string,
  state: Pick<BattleState, 'playerName' | 'enemyName'>,
  playerName?: string,
  enemyName?: string,
): HpEventTarget | undefined => {
  if (line.includes(`${state.playerName}'s`)) return 'player'
  if (line.includes(`${state.enemyName}'s`)) return 'enemy'
  if (playerName && line.includes(playerName)) return 'player'
  if (enemyName && line.includes(enemyName)) return 'enemy'
  return undefined
}

const extractExplicitHpEvents = (
  entry: BattleLogEntry | undefined,
  state: Pick<BattleState, 'playerName' | 'enemyName'>,
  playerName?: string,
  enemyName?: string,
): ExplicitHpEvent[] => {
  if (!entry?.message) return []

  const events: ExplicitHpEvent[] = []
  entry.message.split('\n').forEach((line, lineIndex) => {
    const target = inferHpEventTarget(line, state, playerName, enemyName)
    if (!target) return

    for (const match of line.matchAll(/\[icon:(damage|heal):(\d+)\]/g)) {
      const amount = Number.parseInt(match[2], 10)
      if (!Number.isFinite(amount) || amount <= 0) continue
      events.push({
        amount,
        kind: match[1] === 'heal' ? 'heal' : 'damage',
        lineIndex,
        target,
      })
    }
  })

  return events
}

const hasPreCombatHealing = (entry: BattleLogEntry | undefined) => {
  if (!hasHealingMessage(entry)) return false
  const combatLineIndex = getCombatLineIndex(entry)
  if (combatLineIndex <= 0) return false

  return entry!.message
    .split('\n')
    .slice(0, combatLineIndex)
    .some(
      (line) =>
        line.includes('[icon:heal:') ||
        /\b(healed|fully healed|restored HP|restored health)\b/i.test(line),
    )
}

const getNetExplicitHpChange = (
  events: ExplicitHpEvent[],
  target: HpEventTarget,
  afterLineIndex: number,
) => {
  return events
    .filter((event) => event.target === target && event.lineIndex > afterLineIndex)
    .reduce(
      (total, event) =>
        total + (event.kind === 'damage' ? event.amount : -event.amount),
      0,
    )
}

const normalizeAttackType = (type?: string | null) => {
  const normalized = type?.trim().toLowerCase()
  return normalized || undefined
}

const inferAttackTypesFromLog = (
  entry: BattleLogEntry,
  state: Pick<BattleState, 'playerName' | 'enemyName'>,
) => {
  let playerAttackType = normalizeAttackType(entry.playerAttackType)
  let enemyAttackType = normalizeAttackType(entry.enemyAttackType)

  if (playerAttackType && enemyAttackType) {
    return { playerAttackType, enemyAttackType }
  }

  const allTypes: string[] = []
  for (const line of entry.message.split('\n')) {
    const typeMatch = line.match(/\[icon:type:([^\]]+)\]/i)
    if (!typeMatch) continue

    const attackType = normalizeAttackType(typeMatch[1])
    if (!attackType) continue

    allTypes.push(attackType)
    if (!playerAttackType && line.includes(`${state.playerName}:`)) {
      playerAttackType = attackType
    } else if (!enemyAttackType && line.includes(`${state.enemyName}:`)) {
      enemyAttackType = attackType
    }
  }

  if (!playerAttackType && !enemyAttackType && allTypes.length === 1) {
    if (entry.damageDealt > 0 && entry.damageTaken <= 0) {
      playerAttackType = allTypes[0]
    } else if (entry.damageTaken > 0 && entry.damageDealt <= 0) {
      enemyAttackType = allTypes[0]
    } else if (entry.result === 'win') {
      playerAttackType = allTypes[0]
    } else if (entry.result === 'loss') {
      enemyAttackType = allTypes[0]
    }
  }

  if (!playerAttackType && !enemyAttackType && allTypes.length >= 2) {
    playerAttackType = allTypes[0]
    enemyAttackType = allTypes[1]
  }

  return { playerAttackType, enemyAttackType }
}

/**
 * Generates an atomic sequence of visual events.
 * Crucially, we control WHEN the log and HP bars update to match animations.
 */
export function generateBattleEvents(
  oldState: BattleState,
  newState: BattleState,
): BattleEvent[] {
  const events: BattleEvent[] = []

  // Indices for convenience
  const oldPI = oldState.activePlayerIndex
  const oldEI = oldState.activeEnemyIndex
  const newPI = newState.activePlayerIndex
  const newEI = newState.activeEnemyIndex

  const lastLog = newState.history[0]
  const isNewLatestLog = !isSameLogEntry(lastLog, oldState.history[0])
  const combatLog = isNewLatestLog && isCombatLog(lastLog) ? lastLog : undefined

  // 1. Voluntary Swaps (Pre-Combat) - with bounds checking
  const oldPlayerMon = getTeamPokemon(oldState.playerTeam, oldPI)
  const newPlayerMon = getTeamPokemon(newState.playerTeam, newPI)
  const oldEnemyMon = getTeamPokemon(oldState.enemyTeam, oldEI)
  const newEnemyMon = getTeamPokemon(newState.enemyTeam, newEI)

  const isPlayerReplacement =
    newPI !== oldPI &&
    (oldPlayerMon?.currentHp ?? 0) <= 0 &&
    (newPlayerMon?.currentHp ?? 0) > 0

  if (isPlayerReplacement) {
    events.push({
      type: 'PLAY_SEQUENCE',
      payload: {
        type: 'REPLACEMENT',
        side: 'player',
        index: newPI,
        state: newState,
      },
      delay: 150,
    })
  }

  const isPlayerSwap =
    newPI !== oldPI &&
    (oldPlayerMon?.currentHp ?? 0) > 0 &&
    (newState.playerTeam[oldPI]?.currentHp ?? 0) > 0 &&
    (newPlayerMon?.currentHp ?? 0) > 0
  if (!isPlayerReplacement && isPlayerSwap) {
    events.push({
      type: 'PLAY_SEQUENCE',
      payload: {
        type: 'SWAP',
        side: 'player',
        index: newPI,
        state: {
          ...newState,
          playerTeam: newState.playerTeam.map((p, i) =>
            i === newPI
              ? {
                  ...p,
                  currentHp:
                    oldState.playerTeam[newPI]?.currentHp || p.currentHp,
                }
              : p,
          ),
        },
      },
      delay: 150,
    })
  }

  const isEnemySwap =
    newEI !== oldEI &&
    (oldEnemyMon?.currentHp ?? 0) > 0 &&
    (newState.enemyTeam[oldEI]?.currentHp ?? 0) > 0 &&
    (newEnemyMon?.currentHp ?? 0) > 0
  if (isEnemySwap) {
    events.push({
      type: 'PLAY_SEQUENCE',
      payload: {
        type: 'SWAP',
        side: 'enemy',
        index: newEI,
        state: {
          ...newState,
          enemyTeam: newState.enemyTeam.map((p, i) =>
            i === newEI
              ? {
                  ...p,
                  currentHp:
                    oldState.enemyTeam[newEI]?.currentHp || p.currentHp,
                }
              : p,
          ),
        },
      },
      delay: 150,
    })
  }

  // 2. Combat Sequence (Hit + Splat + HP Drop + Log)
  if (combatLog) {
    const { playerAttackType, enemyAttackType } = inferAttackTypesFromLog(
      combatLog,
      newState,
    )
    const combatLineIndex = getCombatLineIndex(combatLog)
    const explicitHpEvents = extractExplicitHpEvents(
      combatLog,
      newState,
      oldPlayerMon?.name,
      oldEnemyMon?.name,
    )
    const preCombatHpEvents = explicitHpEvents.filter(
      (event) => event.lineIndex < combatLineIndex,
    )
    const postCombatHpEvents = explicitHpEvents.filter(
      (event) => event.lineIndex > combatLineIndex,
    )
    const logIncludesPreCombatHealing = hasPreCombatHealing(combatLog)
    const inferredPlayerHpBeforeDamage =
      logIncludesPreCombatHealing &&
      combatLog.damageTaken > 0 &&
      oldPlayerMon &&
      newState.playerTeam[oldPI]
        ? Math.min(
            oldPlayerMon.maxHp,
            newState.playerTeam[oldPI].currentHp +
              combatLog.damageTaken +
              getNetExplicitHpChange(explicitHpEvents, 'player', combatLineIndex),
          )
        : undefined
    const inferredEnemyHpBeforeDamage =
      logIncludesPreCombatHealing &&
      combatLog.damageDealt > 0 &&
      oldEnemyMon &&
      newState.enemyTeam[oldEI]
        ? Math.min(
            oldEnemyMon.maxHp,
            newState.enemyTeam[oldEI].currentHp +
              combatLog.damageDealt +
              getNetExplicitHpChange(explicitHpEvents, 'enemy', combatLineIndex),
          )
        : undefined

    if (preCombatHpEvents.length > 0) {
      events.push({
        type: 'PLAY_SEQUENCE',
        payload: {
          type: 'STATUS_DAMAGE',
          matches: preCombatHpEvents,
          logEntry: combatLog,
        },
        delay: 600,
      })
    }

    if (
      inferredPlayerHpBeforeDamage !== undefined &&
      inferredPlayerHpBeforeDamage > oldPlayerMon!.currentHp
    ) {
      events.push({
        type: 'PLAY_SEQUENCE',
        payload: {
          type: 'HEAL',
          side: 'player',
          index: oldPI,
          hp: inferredPlayerHpBeforeDamage,
        },
        delay: 250,
      })
    }

    if (
      inferredEnemyHpBeforeDamage !== undefined &&
      inferredEnemyHpBeforeDamage > oldEnemyMon!.currentHp
    ) {
      events.push({
        type: 'PLAY_SEQUENCE',
        payload: {
          type: 'HEAL',
          side: 'enemy',
          index: oldEI,
          hp: inferredEnemyHpBeforeDamage,
        },
        delay: 250,
      })
    }

    events.push({
      type: 'PLAY_SEQUENCE',
      payload: {
        type: 'COMBAT',
        result: combatLog.result,
        damageDealt: combatLog.damageDealt,
        damageTaken: combatLog.damageTaken,
        playerAttackType:
          combatLog.result === 'win' ? playerAttackType : undefined,
        enemyAttackType:
          combatLog.result === 'loss' ? enemyAttackType : undefined,
        logEntry: combatLog,
        // We'll update the HP bars specifically during this sequence
      },
      delay: 800,
    })

    if (postCombatHpEvents.length > 0) {
      events.push({
        type: 'PLAY_SEQUENCE',
        payload: {
          type: 'STATUS_DAMAGE',
          matches: postCombatHpEvents,
          logEntry: combatLog,
        },
        delay: 600,
      })
    }
  } else if (isNewLatestLog) {
    // 3. Standalone Status Damage/Healing (if any)
    const explicitHpEvents = extractExplicitHpEvents(
      lastLog,
      newState,
      oldPlayerMon?.name,
      oldEnemyMon?.name,
    )
    if (explicitHpEvents.length > 0) {
      events.push({
        type: 'PLAY_SEQUENCE',
        payload: {
          type: 'STATUS_DAMAGE',
          matches: explicitHpEvents,
          logEntry: lastLog,
        },
        delay: 600,
      })
    }
  }

  // 4. KOs and Fainting
  // We check if CURRENT active pokemon are at 0 HP in newState but were not in oldState
  // OR if it's game over and they are at 0 HP (as a safety catch)
  const playerKOd =
    (oldState.playerTeam[oldPI]?.currentHp > 0 &&
      newState.playerTeam[oldPI]?.currentHp <= 0) ||
    (newState.status !== 'ongoing' &&
      newState.playerTeam[newPI]?.currentHp <= 0 &&
      oldState.playerTeam[oldPI]?.currentHp > 0)

  const enemyKOd =
    (oldState.enemyTeam[oldEI]?.currentHp > 0 &&
      newState.enemyTeam[oldEI]?.currentHp <= 0) ||
    (newState.status !== 'ongoing' &&
      newState.enemyTeam[newEI]?.currentHp <= 0 &&
      oldState.enemyTeam[oldEI]?.currentHp > 0)

  if (playerKOd || enemyKOd) {
    events.push({
      type: 'KO_SEQUENCE',
      payload: {
        playerKOd,
        enemyKOd,
        playerFormId: oldPlayerMon?.formId,
        enemyFormId: oldEnemyMon?.formId,
        newState: newState, // This state will have the new active indices
        playerReplacement: playerKOd && newPI !== oldPI,
        enemyReplacement: enemyKOd && newEI !== oldEI,
        isGameOver: newState.status !== 'ongoing',
      },
    })
  }

  // 5. Final State Sync (Catch-all to ensure UI matches server exactly)
  events.push({ type: 'SET_INITIAL_STATE', payload: newState })

  // 6. Battle End
  if (newState.status !== 'ongoing') {
    events.push({ type: 'BATTLE_END', payload: newState })
  }

  return events
}
