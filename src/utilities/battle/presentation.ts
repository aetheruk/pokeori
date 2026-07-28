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
  return side === 'player' ? source.activePlayerIndex : source.activeEnemyIndex
}

function inferSideFromLine(
  line: string,
  state: BattleState,
  baseline: PresentationBaseline,
): BattlePresentationSide | undefined {
  if (
    line.includes(`${state.playerName}:`) ||
    line.includes(`${state.playerName}'s`)
  )
    return 'player'
  if (
    line.includes(`${state.enemyName}:`) ||
    line.includes(`${state.enemyName}'s`)
  )
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

function latestPresentedActiveIndex(
  events: BattlePresentationEvent[],
  side: BattlePresentationSide,
  fallbackIndex: number,
): number {
  return (
    events
      .filter(
        (
          event,
        ): event is Extract<BattlePresentationEvent, { type: 'switch' }> =>
          event.type === 'switch' && event.side === side,
      )
      .at(-1)?.toIndex ?? fallbackIndex
  )
}

function inferPokemonIndexFromLine(params: {
  line: string
  side: BattlePresentationSide
  state: BattleState
  baseline: PresentationBaseline
  fallbackIndex: number
}): number {
  const baselineTeam = teamForSide(params.baseline, params.side)
  const finalTeam = stateTeamForSide(params.state, params.side)
  const matchedIndexes = new Set<number>()
  const teamLength = Math.max(baselineTeam.length, finalTeam.length)

  for (let index = 0; index < teamLength; index += 1) {
    const names = new Set(
      [baselineTeam[index]?.name, finalTeam[index]?.name].filter(
        (name): name is string => Boolean(name),
      ),
    )
    if ([...names].some((name) => params.line.includes(name))) {
      matchedIndexes.add(index)
    }
  }

  return matchedIndexes.size === 1
    ? [...matchedIndexes][0]
    : params.fallbackIndex
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
    const hpOnEntry =
      teamForSide(baseline, side)[finalActive[side]]?.currentHp ?? incomingHp

    if (outgoingHp > 0 && finalOutgoingHp > 0 && incomingHp > 0) {
      events.push({
        type: 'switch',
        side,
        fromIndex: originalActive[side],
        toIndex: finalActive[side],
        hpOnEntry,
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
        hpOnEntry,
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
  const lines = log.message
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
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

      const actorIndex = latestPresentedActiveIndex(
        events,
        actorSide,
        activeIndexForSide(baseline, actorSide),
      )
      const targetIndex = latestPresentedActiveIndex(
        events,
        targetSide,
        originalActive[targetSide],
      )
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
        const pokemonIndex = inferPokemonIndexFromLine({
          line,
          side,
          state,
          baseline,
          fallbackIndex: latestPresentedActiveIndex(
            events,
            side,
            originalActive[side],
          ),
        })
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
      line
        .match(
          /(?:healed(?:\s+for)?\s+(\d+)\s+HP|\(\+(\d+)\s+HP\)|restored\s+(\d+)\s+HP)/i,
        )
        ?.slice(1)
        .find(Boolean) || '0',
      10,
    )
    if (healingAmount > 0) {
      const side = inferSideFromLine(line, state, baseline)
      if (side) {
        const pokemonIndex = inferPokemonIndexFromLine({
          line,
          side,
          state,
          baseline,
          fallbackIndex: latestPresentedActiveIndex(
            events,
            side,
            originalActive[side],
          ),
        })
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

  const attacks = events.filter(
    (event): event is Extract<BattlePresentationEvent, { type: 'attack' }> =>
      event.type === 'attack',
  )
  const shadowPainEvents = events.filter(
    (event): event is Extract<BattlePresentationEvent, { type: 'hp-change' }> =>
      event.type === 'hp-change' &&
      event.kind === 'damage' &&
      /screams out in pain/i.test(event.message),
  )
  if (
    attacks.length > 1 ||
    (attacks.length > 0 && shadowPainEvents.length > 0)
  ) {
    const simultaneousGroup = `impact:${log.turn}`
    for (const attack of attacks) {
      attack.simultaneousGroup = simultaneousGroup
      attack.animateActor =
        log.result === 'tie' ||
        (log.result === 'win' && attack.actorSide === 'player') ||
        (log.result === 'loss' && attack.actorSide === 'enemy')
    }
    for (const shadowPainEvent of shadowPainEvents) {
      shadowPainEvent.simultaneousGroup = simultaneousGroup
    }

    // Shadow pain is logged before the opponent's action, but it is part of
    // the same committed attack impact. Keep an attack first in the timeline
    // so the client can start the shared impact group from that event.
    const groupedEvents = events.filter(
      (
        event,
      ): event is Extract<
        BattlePresentationEvent,
        { type: 'attack' | 'hp-change' }
      > =>
        (event.type === 'attack' || event.type === 'hp-change') &&
        event.simultaneousGroup === simultaneousGroup,
    )
    const groupStartingHp: Partial<Record<BattlePresentationSide, number>> = {}
    for (const event of groupedEvents) {
      const side = event.type === 'attack' ? event.targetSide : event.side
      if (groupStartingHp[side] !== undefined) continue
      groupStartingHp[side] =
        event.type === 'attack'
          ? event.hpAfter + event.damage
          : event.hpAfter +
            (event.kind === 'damage' ? event.amount : -event.amount)
    }
    const groupedShadowEvents = new Set(shadowPainEvents)
    const orderedEvents = events.filter(
      (event) => !groupedShadowEvents.has(event as never),
    )
    const firstAttackIndex = orderedEvents.findIndex(
      (event) =>
        event.type === 'attack' &&
        event.simultaneousGroup === simultaneousGroup,
    )
    if (firstAttackIndex >= 0) {
      orderedEvents.splice(firstAttackIndex + 1, 0, ...shadowPainEvents)
      const groupedRunningHp = { ...groupStartingHp }
      for (const event of orderedEvents) {
        if (
          (event.type !== 'attack' && event.type !== 'hp-change') ||
          event.simultaneousGroup !== simultaneousGroup
        ) {
          continue
        }
        const side = event.type === 'attack' ? event.targetSide : event.side
        const pokemon =
          event.type === 'attack'
            ? stateTeamForSide(state, side)[event.targetIndex]
            : stateTeamForSide(state, side)[event.pokemonIndex]
        const currentHp =
          groupedRunningHp[side] ??
          (event.type === 'attack'
            ? event.hpAfter + event.damage
            : event.hpAfter +
              (event.kind === 'damage' ? event.amount : -event.amount))
        const hpAfter = clampHp(
          pokemon,
          currentHp +
            (event.type === 'attack'
              ? -event.damage
              : event.kind === 'heal'
                ? event.amount
                : -event.amount),
        )
        event.hpAfter = hpAfter
        groupedRunningHp[side] = hpAfter
      }
      events.length = 0
      events.push(...orderedEvents)
    }
  }

  for (const side of ['player', 'enemy'] as const) {
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
        hpAfter: clampHp(finalPokemon, finalPokemon.currentHp),
        formId: beforePokemon.formId,
        message: faintMessages[side] || '',
      })

      if (finalActive[side] !== beforeIndex) {
        const replacementName = stateTeamForSide(state, side)[finalActive[side]]
          ?.name
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
          hpOnEntry:
            teamForSide(baseline, side)[finalActive[side]]?.currentHp ??
            stateTeamForSide(state, side)[finalActive[side]]?.currentHp ??
            0,
          reason: 'replacement',
          message: replacementMessage,
        })
      }
    }
  }

  // Replacement entry effects are logged after the faint and send-out lines.
  // Parse their HP markers only after the switch event exists so the splat and
  // bar update target the incoming Pokemon rather than the outgoing one.
  for (const message of deferredAfterFaint) {
    const side = inferSideFromLine(message, state, baseline)
    const hpMatches = [...message.matchAll(/\[icon:(damage|heal):(\d+)\]/g)]
    if (side && hpMatches.length > 0) {
      const pokemonIndex = inferPokemonIndexFromLine({
        line: message,
        side,
        state,
        baseline,
        fallbackIndex: latestPresentedActiveIndex(
          events,
          side,
          finalActive[side],
        ),
      })
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
          message,
        })
      }
      continue
    }

    events.push({ type: 'message', message })
  }

  for (const side of ['player', 'enemy'] as const) {
    const finalTeam = stateTeamForSide(state, side)
    for (
      let pokemonIndex = 0;
      pokemonIndex < finalTeam.length;
      pokemonIndex += 1
    ) {
      const finalPokemon = finalTeam[pokemonIndex]
      const presentedHp =
        runningHp[side][pokemonIndex] ??
        teamForSide(baseline, side)[pokemonIndex]?.currentHp ??
        finalPokemon.currentHp
      const baselineHp =
        teamForSide(baseline, side)[pokemonIndex]?.currentHp ??
        finalPokemon.currentHp
      let lastHpEvent:
        | Extract<BattlePresentationEvent, { type: 'attack' }>
        | Extract<BattlePresentationEvent, { type: 'hp-change' }>
        | undefined
      for (
        let eventIndex = events.length - 1;
        eventIndex >= 0;
        eventIndex -= 1
      ) {
        const event = events[eventIndex]
        if (
          (event.type === 'attack' &&
            event.targetSide === side &&
            event.targetIndex === pokemonIndex) ||
          (event.type === 'hp-change' &&
            event.side === side &&
            event.pokemonIndex === pokemonIndex)
        ) {
          lastHpEvent = event
          break
        }
      }
      if (
        presentedHp !== finalPokemon.currentHp &&
        lastHpEvent &&
        (finalPokemon.currentHp <= baselineHp ||
          (lastHpEvent.type === 'hp-change' && lastHpEvent.kind === 'heal'))
      ) {
        // Keep the final authoritative reconciliation from visibly raising or
        // lowering a bar after the effect timeline. Any correction that does
        // not exceed starting HP is folded into the last authored HP impact.
        lastHpEvent.hpAfter = finalPokemon.currentHp
        runningHp[side][pokemonIndex] = finalPokemon.currentHp
      }
      const reconciledHp =
        runningHp[side][pokemonIndex] ??
        teamForSide(baseline, side)[pokemonIndex]?.currentHp ??
        finalPokemon.currentHp
      if (reconciledHp === finalPokemon.currentHp) continue
      // The server state is authoritative. Log parsing is retained for legacy
      // battles, but a parser mismatch must never look like a late heal/damage
      // event to the player.
      console.warn('Battle presentation HP mismatch; applying silent sync', {
        battleId: state.battleId,
        turn: log.turn,
        side,
        pokemonIndex,
        presentedHp: reconciledHp,
        authoritativeHp: finalPokemon.currentHp,
      })
      runningHp[side][pokemonIndex] = finalPokemon.currentHp
    }
  }

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
