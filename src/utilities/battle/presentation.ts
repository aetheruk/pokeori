import type {
  BattleLogEntry,
  BattlePokemon,
  BattlePresentation,
  BattlePresentationEvent,
  BattlePresentationSide,
  BattleState,
} from './types'

interface PresentationBaseline {
  activePlayerIndex: number
  activeEnemyIndex: number
  playerTeam: BattlePokemon[]
  enemyTeam: BattlePokemon[]
  latestLog?: Pick<BattleLogEntry, 'turn' | 'message'>
}

const baselines = new WeakMap<BattleState, PresentationBaseline>()

function cloneTeam(team: BattlePokemon[]): BattlePokemon[] {
  return team.map((pokemon) => ({
    ...pokemon,
    stats: { ...pokemon.stats },
    statStages: pokemon.statStages ? { ...pokemon.statStages } : undefined,
  }))
}

export function beginBattlePresentation(state: BattleState): void {
  baselines.set(state, {
    activePlayerIndex: state.activePlayerIndex,
    activeEnemyIndex: state.activeEnemyIndex,
    playerTeam: cloneTeam(state.playerTeam),
    enemyTeam: cloneTeam(state.enemyTeam),
    latestLog: state.history[0]
      ? {
          turn: state.history[0].turn,
          message: state.history[0].message,
        }
      : undefined,
  })
  state.presentation = undefined
}

function teamForSide(
  source: Pick<PresentationBaseline, 'playerTeam' | 'enemyTeam'>,
  side: BattlePresentationSide,
) {
  return side === 'player' ? source.playerTeam : source.enemyTeam
}

function stateTeamForSide(state: BattleState, side: BattlePresentationSide) {
  return side === 'player' ? state.playerTeam : state.enemyTeam
}

function activeIndexForSide(
  source: Pick<PresentationBaseline, 'activePlayerIndex' | 'activeEnemyIndex'>,
  side: BattlePresentationSide,
) {
  return side === 'player'
    ? source.activePlayerIndex
    : source.activeEnemyIndex
}

function inferSideFromLine(
  line: string,
  state: BattleState,
  baseline: PresentationBaseline,
): BattlePresentationSide | undefined {
  if (line.includes(`${state.playerName}:`) || line.includes(`${state.playerName}'s`))
    return 'player'
  if (line.includes(`${state.enemyName}:`) || line.includes(`${state.enemyName}'s`))
    return 'enemy'

  const playerNames = baseline.playerTeam.map((pokemon) => pokemon.name)
  const enemyNames = baseline.enemyTeam.map((pokemon) => pokemon.name)
  const playerMatch = playerNames.some((name) => line.includes(name))
  const enemyMatch = enemyNames.some((name) => line.includes(name))
  if (playerMatch !== enemyMatch) return playerMatch ? 'player' : 'enemy'
  return undefined
}

function hashMessage(message: string): string {
  let hash = 2166136261
  for (let index = 0; index < message.length; index += 1) {
    hash ^= message.charCodeAt(index)
    hash = Math.imul(hash, 16777619)
  }
  return (hash >>> 0).toString(36)
}

function clampHp(pokemon: BattlePokemon | undefined, hp: number): number {
  if (!pokemon) return Math.max(0, hp)
  return Math.min(pokemon.maxHp, Math.max(0, hp))
}

function buildPresentation(
  state: BattleState,
  baseline: PresentationBaseline,
  log: BattleLogEntry,
): BattlePresentation {
  const events: BattlePresentationEvent[] = []
  const runningHp: Record<BattlePresentationSide, number[]> = {
    player: baseline.playerTeam.map((pokemon) => pokemon.currentHp),
    enemy: baseline.enemyTeam.map((pokemon) => pokemon.currentHp),
  }
  const originalActive = {
    player: baseline.activePlayerIndex,
    enemy: baseline.activeEnemyIndex,
  }

  const finalActive = {
    player: state.activePlayerIndex,
    enemy: state.activeEnemyIndex,
  }
  const faintMessages: Partial<Record<BattlePresentationSide, string>> = {}
  const deferredAfterFaint: string[] = []
  let sawFaintMessage = false

  for (const side of ['player', 'enemy'] as const) {
    if (originalActive[side] === finalActive[side]) continue

    const outgoingHp =
      teamForSide(baseline, side)[originalActive[side]]?.currentHp ?? 0
    const finalOutgoingHp =
      stateTeamForSide(state, side)[originalActive[side]]?.currentHp ?? 0
    const incomingHp =
      stateTeamForSide(state, side)[finalActive[side]]?.currentHp ?? 0

    if (outgoingHp > 0 && finalOutgoingHp > 0 && incomingHp > 0) {
      events.push({
        type: 'switch',
        side,
        fromIndex: originalActive[side],
        toIndex: finalActive[side],
        reason: 'voluntary',
        message: '',
      })
      runningHp[side][finalActive[side]] =
        teamForSide(baseline, side)[finalActive[side]]?.currentHp ??
        stateTeamForSide(state, side)[finalActive[side]]?.currentHp ??
        0
    } else if (outgoingHp <= 0 && incomingHp > 0) {
      // Player faint replacements are selected in a separate server action.
      // Its baseline therefore already contains the fainted outgoing Pokemon,
      // so it needs an explicit switch event to clear the prior faint animation.
      events.push({
        type: 'switch',
        side,
        fromIndex: originalActive[side],
        toIndex: finalActive[side],
        reason: 'replacement',
        message: '',
      })
      runningHp[side][finalActive[side]] =
        teamForSide(baseline, side)[finalActive[side]]?.currentHp ??
        stateTeamForSide(state, side)[finalActive[side]]?.currentHp ??
        0
    }
  }

  let playerAttackConsumed = false
  let enemyAttackConsumed = false
  const lines = log.message.split('\n').map((line) => line.trim()).filter(Boolean)
  const followUpDamage: Record<BattlePresentationSide, number> = {
    player: 0,
    enemy: 0,
  }
  for (const line of lines) {
    if (!/struck again/i.test(line)) continue
    const actorSide = inferSideFromLine(line, state, baseline)
    const amount = Number.parseInt(
      line.match(/\[icon:damage:(\d+)\]/)?.[1] || '0',
      10,
    )
    if (actorSide && amount > 0) followUpDamage[actorSide] += amount
  }

  for (const line of lines) {
    if (/\bfainted[!.]?$/i.test(line.replace(/\[[^\]]+\]/g, '').trim())) {
      const faintedSide = inferSideFromLine(line, state, baseline)
      if (faintedSide) faintMessages[faintedSide] = line
      else deferredAfterFaint.push(line)
      sawFaintMessage = true
      continue
    }
    if (sawFaintMessage) {
      deferredAfterFaint.push(line)
      continue
    }

    const stanceMatch = line.match(/\[icon:stance:([^\]]+)\]/i)
    if (stanceMatch) {
      const actorSide =
        inferSideFromLine(line, state, baseline) ??
        (log.result === 'loss' ? 'enemy' : 'player')
      const targetSide = actorSide === 'player' ? 'enemy' : 'player'
      const totalDamage =
        actorSide === 'player'
          ? playerAttackConsumed
            ? 0
            : log.damageDealt
          : enemyAttackConsumed
            ? 0
            : log.damageTaken
      const damage = Math.max(0, totalDamage - followUpDamage[actorSide])
      if (actorSide === 'player') playerAttackConsumed = true
      else enemyAttackConsumed = true

      const actorIndex = activeIndexForSide(baseline, actorSide)
      const targetIndex =
        events
          .filter(
            (event): event is Extract<BattlePresentationEvent, { type: 'switch' }> =>
              event.type === 'switch' && event.side === targetSide,
          )
          .at(-1)?.toIndex ?? originalActive[targetSide]
      const target = stateTeamForSide(state, targetSide)[targetIndex]
      const hpAfter = clampHp(
        target,
        (runningHp[targetSide][targetIndex] ?? target?.currentHp ?? 0) - damage,
      )
      runningHp[targetSide][targetIndex] = hpAfter
      events.push({
        type: 'attack',
        actorSide,
        targetSide,
        actorIndex,
        targetIndex,
        damage,
        hpAfter,
        attackType: line.match(/\[icon:type:([^\]]+)\]/i)?.[1],
        message: line,
      })
      // Stance lines can also contain authored recoil, drain, or healing
      // markers. Parse those before leaving the line; the old parser skipped
      // every inline HP effect once it found a stance icon.
      const inlineHpMatches = [
        ...line.matchAll(/\[icon:(damage|heal):(\d+)\]/g),
      ]
      for (const hpMatch of inlineHpMatches) {
        const kind = hpMatch[1] === 'heal' ? 'heal' : 'damage'
        const amount = Number.parseInt(hpMatch[2], 10)
        const pokemon = stateTeamForSide(state, actorSide)[actorIndex]
        const hpAfter = clampHp(
          pokemon,
          (runningHp[actorSide][actorIndex] ?? pokemon?.currentHp ?? 0) +
            (kind === 'heal' ? amount : -amount),
        )
        runningHp[actorSide][actorIndex] = hpAfter
        events.push({
          type: 'hp-change',
          side: actorSide,
          pokemonIndex: actorIndex,
          kind,
          amount,
          hpAfter,
          message: line,
        })
      }
      continue
    }

    const hpMatches = [...line.matchAll(/\[icon:(damage|heal):(\d+)\]/g)]
    if (hpMatches.length > 0) {
      const inferredSide = inferSideFromLine(line, state, baseline)
      const side =
        inferredSide && /struck again/i.test(line)
          ? inferredSide === 'player'
            ? 'enemy'
            : 'player'
          : inferredSide
      if (side) {
        const pokemonIndex = finalActive[side]
        const pokemon = stateTeamForSide(state, side)[pokemonIndex]
        for (const hpMatch of hpMatches) {
          const kind = hpMatch[1] === 'heal' ? 'heal' : 'damage'
          const amount = Number.parseInt(hpMatch[2], 10)
          const hpAfter = clampHp(
            pokemon,
            (runningHp[side][pokemonIndex] ?? pokemon?.currentHp ?? 0) +
              (kind === 'heal' ? amount : -amount),
          )
          runningHp[side][pokemonIndex] = hpAfter
          events.push({
            type: 'hp-change',
            side,
            pokemonIndex,
            kind,
            amount,
            hpAfter,
            message: line,
          })
        }
        continue
      }
    }

    const healingAmount = Number.parseInt(
      line.match(
        /(?:healed(?:\s+for)?\s+(\d+)\s+HP|\(\+(\d+)\s+HP\)|restored\s+(\d+)\s+HP)/i,
      )?.slice(1).find(Boolean) || '0',
      10,
    )
    if (healingAmount > 0) {
      const side = inferSideFromLine(line, state, baseline)
      if (side) {
        const pokemonIndex = finalActive[side]
        const pokemon = stateTeamForSide(state, side)[pokemonIndex]
        const hpAfter = clampHp(
          pokemon,
          (runningHp[side][pokemonIndex] ?? pokemon?.currentHp ?? 0) +
            healingAmount,
        )
        runningHp[side][pokemonIndex] = hpAfter
        events.push({
          type: 'hp-change',
          side,
          pokemonIndex,
          kind: 'heal',
          amount: healingAmount,
          hpAfter,
          message: line,
        })
        continue
      }
    }

    events.push({ type: 'message', message: line })
  }

  if (log.result === 'tie') {
    const attacks = events.filter(
      (event): event is Extract<BattlePresentationEvent, { type: 'attack' }> =>
        event.type === 'attack',
    )
    if (
      attacks.some((event) => event.actorSide === 'player') &&
      attacks.some((event) => event.actorSide === 'enemy')
    ) {
      for (const attack of attacks.slice(0, 2)) {
        attack.simultaneousGroup = `tie:${log.turn}`
      }
    }
  }

  for (const side of ['player', 'enemy'] as const) {
    const finalTeam = stateTeamForSide(state, side)
    for (let pokemonIndex = 0; pokemonIndex < finalTeam.length; pokemonIndex += 1) {
      const finalPokemon = finalTeam[pokemonIndex]
      const presentedHp =
        runningHp[side][pokemonIndex] ??
        teamForSide(baseline, side)[pokemonIndex]?.currentHp ??
        finalPokemon.currentHp
      if (presentedHp === finalPokemon.currentHp) continue
      // The server state is authoritative. Log parsing is retained for legacy
      // battles, but a parser mismatch must never look like a late heal/damage
      // event to the player.
      console.warn('Battle presentation HP mismatch; applying silent sync', {
        battleId: state.battleId,
        turn: log.turn,
        side,
        pokemonIndex,
        presentedHp,
        authoritativeHp: finalPokemon.currentHp,
      })
      runningHp[side][pokemonIndex] = finalPokemon.currentHp
    }

    const beforeIndex = originalActive[side]
    const beforePokemon = teamForSide(baseline, side)[beforeIndex]
    const finalPokemon = stateTeamForSide(state, side)[beforeIndex]
    if (
      beforePokemon &&
      finalPokemon &&
      beforePokemon.currentHp > 0 &&
      finalPokemon.currentHp <= 0
    ) {
      events.push({
        type: 'faint',
        side,
        pokemonIndex: beforeIndex,
        formId: beforePokemon.formId,
        message: faintMessages[side] || '',
      })

      if (finalActive[side] !== beforeIndex) {
        const replacementName =
          stateTeamForSide(state, side)[finalActive[side]]?.name
        const replacementMessageIndex = deferredAfterFaint.findIndex(
          (message) =>
            Boolean(replacementName) &&
            message.includes(replacementName!) &&
            /\b(sent out|go,)\b/i.test(message),
        )
        const replacementMessage =
          replacementMessageIndex >= 0
            ? deferredAfterFaint.splice(replacementMessageIndex, 1)[0]
            : ''
        events.push({
          type: 'switch',
          side,
          fromIndex: beforeIndex,
          toIndex: finalActive[side],
          reason: 'replacement',
          message: replacementMessage,
        })
      }
    }
  }

  events.push(
    ...deferredAfterFaint.map(
      (message): BattlePresentationEvent => ({ type: 'message', message }),
    ),
  )

  return {
    sequenceId: `${state.battleId}:${log.turn}:${hashMessage(log.message)}`,
    turn: log.turn,
    events,
  }
}

export function finalizeBattlePresentation(state: BattleState): void {
  const baseline = baselines.get(state)
  baselines.delete(state)
  const latestLog = state.history[0]
  if (
    !baseline ||
    !latestLog ||
    (baseline.latestLog?.turn === latestLog.turn &&
      baseline.latestLog.message === latestLog.message)
  ) {
    state.presentation = undefined
    return
  }

  state.presentation = buildPresentation(state, baseline, latestLog)
}
