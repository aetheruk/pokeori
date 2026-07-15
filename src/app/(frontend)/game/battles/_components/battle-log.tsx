import Image from 'next/image'
import { type ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import {
  STANCE_ICON_CONFIG,
  StanceIcon as StanceGlyph,
} from '@/components/game/shared/stance-icon'
import { ScrollArea } from '@/components/ui/scroll-area'
import { cn } from '@/lib/utils'
import type { BattleLogEntry } from '@/utilities/battle/types'
import { getPokemonTypeIconUrl } from '@/utilities/pokemon/sprite-proxy'

const typeIdMap: Record<string, number> = {
  normal: 1,
  fighting: 2,
  flying: 3,
  poison: 4,
  ground: 5,
  rock: 6,
  bug: 7,
  ghost: 8,
  steel: 9,
  fire: 10,
  water: 11,
  grass: 12,
  electric: 13,
  psychic: 14,
  ice: 15,
  dragon: 16,
  dark: 17,
  fairy: 18,
  stellar: 19,
  unknown: 10001,
  shadow: 10002,
}

/* Status effect colors and display names */
const statusConfig: Record<string, { color: string; name: string }> = {
  poison: { color: 'text-game-clay-strong', name: 'Poison' },
  'bad-poison': { color: 'text-game-danger', name: 'Bad Poison' },
  burn: { color: 'text-game-clay-strong', name: 'Burn' },
  paralysis: { color: 'text-game-ochre-strong', name: 'Paralysis' },
  sleep: { color: 'text-game-muted', name: 'Sleep' },
  freeze: { color: 'text-game-moss-strong', name: 'Freeze' },
  frostbite: { color: 'text-game-moss-strong', name: 'Frostbite' },
  confusion: { color: 'text-game-clay-strong', name: 'Confusion' },
  vanished: { color: 'text-game-muted', name: 'Vanished' },
  regen: { color: 'text-game-moss-strong', name: 'Regeneration' },
  'mystic-veil': { color: 'text-game-moss-strong', name: 'Mystic Veil' },
  veil: { color: 'text-game-clay-strong', name: 'Veil' },
}

type ParsedBattleAction = {
  actor: string
  pokemon: string
  move: string
  stance?: string
  type?: string
  damage?: number
  effectiveness?: string
  critical?: boolean
  trailingText?: string
}

type ParsedBattleEffect = {
  text: string
  tone: 'neutral' | 'good' | 'bad' | 'status'
}

type ParsedBattleMessage = {
  actions: ParsedBattleAction[]
  effects: ParsedBattleEffect[]
}

function BattleValueChip({
  type,
  value,
}: {
  type: 'damage' | 'heal'
  value: string | number
}) {
  return (
    <span
      className={cn(
        'mx-1 inline-flex items-center rounded-full border px-1.5 py-0.5 align-middle text-[10px] font-black uppercase leading-none',
        type === 'damage' && 'border-game-danger/35 bg-game-danger/10 text-game-danger',
        type === 'heal' && 'border-game-moss/35 bg-game-moss/10 text-game-moss-strong',
      )}
    >
      {type === 'damage' ? '-' : '+'}
      {value} HP
    </span>
  )
}

function getIconValue(text: string, iconType: string): string | undefined {
  return text.match(new RegExp(`\\[icon:${iconType}:([^\\]]+)\\]`, 'i'))?.[1]
}

function cleanLogText(text: string): string {
  return text
    .replace(/\[icon:[^\]]+\]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function normalizeMoveLabel(move: string): string {
  return move
    .replace(/^an?\s+/i, '')
    .replace(/\s+/g, ' ')
    .trim()
}

function isGenericAttackMove(move: string): boolean {
  return /^(?:(?:power|speed|tech)\s+)?attack$/i.test(move.trim())
}

function extractAttackDamage(text: string): number | undefined {
  const match = cleanLogText(text).match(
    /\b(?:dealt|dealing)\s+(\d+)(?:\s+damage)?/i,
  )
  if (!match) return undefined
  const damage = Number.parseInt(match[1], 10)
  return Number.isFinite(damage) ? damage : undefined
}

function stripAttackRemainder(text: string): string {
  return text
    .replace(/^\s*(?:dealt|dealing)\s+\d+(?:\s+damage)?\.?/i, '')
    .replace(/^\s*damage\.?/i, '')
    .trim()
}

function normalizeEffectivenessText(raw: string): string | undefined {
  const clean = raw
    .replace(/[.!]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

  if (
    clean === 'extremely effective' ||
    clean === 'it was extremely effective'
  ) {
    return 'It was extremely effective'
  }

  if (clean === 'super effective' || clean === 'it was super effective') {
    return 'It was super effective'
  }

  if (clean === 'not very effective' || clean === 'it was not very effective') {
    return 'It was not very effective'
  }

  if (clean === 'it has no effect' || clean === 'has no effect') {
    return 'It has no effect'
  }

  return undefined
}

function renderTextWithValueChips(text: string, keyPrefix: string) {
  const pattern =
    /(\(\+(\d+)\s*HP\)|\b(?:dealt|dealing)\s+(\d+)(?:\s+damage)?\b)/gi
  const parts: ReactNode[] = []
  let lastIndex = 0
  let chipIndex = 0

  let match = pattern.exec(text)
  while (match !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index))
    }

    const healValue = match[2]
    const damageValue = match[3]
    if (healValue) {
      parts.push(
        <BattleValueChip
          key={`${keyPrefix}-heal-${chipIndex}`}
          type="heal"
          value={healValue}
        />,
      )
    } else if (damageValue) {
      parts.push(
        <BattleValueChip
          key={`${keyPrefix}-damage-${chipIndex}`}
          type="damage"
          value={damageValue}
        />,
      )
    }

    chipIndex += 1
    lastIndex = pattern.lastIndex
    match = pattern.exec(text)
  }

  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex))
  }

  return parts.length > 0 ? parts : text
}

function extractEffectivenessText(text: string): string | undefined {
  const clean = cleanLogText(text)
  const directMatch = normalizeEffectivenessText(clean)
  if (directMatch) return directMatch

  const matches = clean.match(/\([^)]+\)/g)
  if (!matches) return undefined

  for (const match of matches) {
    const possibleText = normalizeEffectivenessText(
      match.replace(/^\(|\)$/g, ''),
    )
    if (possibleText) return possibleText
  }

  return undefined
}

function stripEffectivenessText(text: string): string {
  const parentheticals = text.match(/\([^)]+\)/g) || []
  let result = text

  for (const token of parentheticals) {
    const normalized = normalizeEffectivenessText(token.replace(/^\(|\)$/g, ''))
    if (normalized) {
      result = result.replace(token, ' ')
    }
  }

  return result.replace(/\s+/g, ' ').trim()
}

function isCriticalHitText(text: string): boolean {
  const clean = text
    .replace(/^[\s(]+/g, '')
    .replace(/[)\s.!]+$/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase()

  return clean === 'critical hit'
}

function extractAttackLineTrailingMetadata(text: string): {
  effectiveness?: string
  critical: boolean
  trailingText: string
} {
  let remaining = text
  let critical = false
  let effectiveness: string | undefined

  const parentheticals = remaining.match(/\([^)]+\)/g) || []
  for (const token of parentheticals) {
    const inner = token.replace(/^\(|\)$/g, '')
    const normalizedEffectiveness = normalizeEffectivenessText(inner)
    if (normalizedEffectiveness) {
      if (!effectiveness) {
        effectiveness = normalizedEffectiveness
      }
      remaining = remaining.replace(token, ' ')
      continue
    }

    if (isCriticalHitText(inner)) {
      critical = true
      remaining = remaining.replace(token, ' ')
    }
  }

  return {
    effectiveness,
    critical,
    trailingText: remaining.replace(/\s+/g, ' ').trim(),
  }
}

function parseAttackLine(line: string): ParsedBattleAction | null {
  if (!line.includes(':') || !/\buses\b/i.test(line)) return null

  const clean = cleanLogText(line)
  const match = clean.match(
    /^([^:]+):\s+(.+?)\s+uses\s+(.+?)(?:[.!](?:\s+|$)|$)(.*)$/i,
  )
  if (!match) return null

  const [, actor, pokemon, rawMove, remainder = ''] = match
  const move = normalizeMoveLabel(rawMove)
  const cleanedRemainder = stripAttackRemainder(remainder)
  const { critical, effectiveness, trailingText } =
    extractAttackLineTrailingMetadata(cleanedRemainder)
  const strippedTrailingText = stripEffectivenessText(trailingText)

  return {
    actor: actor.trim(),
    pokemon: pokemon.trim(),
    move: move || 'Attack',
    stance: getIconValue(line, 'stance'),
    type: getIconValue(line, 'type')?.toLowerCase(),
    damage: extractAttackDamage(line),
    effectiveness,
    critical,
    trailingText: strippedTrailingText || undefined,
  }
}

function getEffectTone(line: string): ParsedBattleEffect['tone'] {
  const clean = cleanLogText(line).toLowerCase()

  if (getIconValue(line, 'status')) return 'status'
  if (
    getIconValue(line, 'heal') ||
    /\b(healed|restored|cured|woke up|thawed|returned)\b/.test(clean)
  ) {
    return 'good'
  }
  if (
    getIconValue(line, 'damage') ||
    /\b(hurt|damage|broke|fainted|failed|can't move|screams|frozen solid|fast asleep)\b/.test(
      clean,
    )
  ) {
    return 'bad'
  }

  return 'neutral'
}

function applyStructuredDamageChips(
  parsed: ParsedBattleMessage,
  log?: Pick<
    BattleLogEntry,
    'damageDealt' | 'damageTaken' | 'playerAttackType' | 'enemyAttackType'
  >,
): ParsedBattleMessage {
  if (!log || parsed.actions.length === 0) return parsed

  const actions = parsed.actions.map((action) => ({ ...action }))
  const assigned = new Set<number>()

  const assignDamage = (
    damage: number,
    attackType?: string,
    preferLast = false,
  ) => {
    if (damage <= 0) return

    const normalizedType = attackType?.toLowerCase()
    let actionIndex = normalizedType
      ? actions.findIndex(
          (action, index) =>
            !assigned.has(index) &&
            action.damage === undefined &&
            action.type?.toLowerCase() === normalizedType,
        )
      : -1

    if (actionIndex === -1) {
      const indexes = actions
        .map((action, index) => ({ action, index }))
        .filter(
          ({ action, index }) =>
            !assigned.has(index) && action.damage === undefined,
        )
        .map(({ index }) => index)
      actionIndex = preferLast ? (indexes.at(-1) ?? -1) : (indexes[0] ?? -1)
    }

    if (actionIndex === -1) return
    actions[actionIndex].damage = damage
    assigned.add(actionIndex)
  }

  assignDamage(log.damageDealt, log.playerAttackType)
  assignDamage(log.damageTaken, log.enemyAttackType, true)

  return { ...parsed, actions }
}

function parseBattleMessage(
  message: string,
  log?: Pick<
    BattleLogEntry,
    'damageDealt' | 'damageTaken' | 'playerAttackType' | 'enemyAttackType'
  >,
): ParsedBattleMessage {
  const lines = message
    .split('\n')
    .map((line) => line.trim())
    .filter(Boolean)
  const parsed: ParsedBattleMessage = { actions: [], effects: [] }
  let lastActionIndex: number | null = null

  for (const line of lines) {
    const action = parseAttackLine(line)
    if (action) {
      parsed.actions.push(action)
      lastActionIndex = parsed.actions.length - 1
      if (action.trailingText) {
        parsed.effects.push({
          text: action.trailingText,
          tone: getEffectTone(action.trailingText),
        })
      }
      continue
    }

    const standaloneCritical = isCriticalHitText(line)
    if (standaloneCritical && lastActionIndex !== null) {
      parsed.actions[lastActionIndex].critical = true
      continue
    }

    const standaloneEffect = extractEffectivenessText(line)
    if (standaloneEffect && lastActionIndex !== null) {
      const lastAction = parsed.actions[lastActionIndex]
      if (lastAction.effectiveness) {
        lastAction.trailingText = `${lastAction.trailingText ? `${lastAction.trailingText} ` : ''}${standaloneEffect}`
      } else {
        lastAction.effectiveness = standaloneEffect
      }
      continue
    }

    parsed.effects.push({
      text: line,
      tone: getEffectTone(line),
    })
  }

  return applyStructuredDamageChips(parsed, log)
}

/* Helper to parse message for icons */
const parseMessage = (text: string) => {
  if (!text) return null
  const parts = text.split(/(\[icon:[^\]]+\])/g)
  return parts.map((part, i) => {
    // Stance icons
    if (part.startsWith('[icon:stance:')) {
      const stance = part.replace('[icon:stance:', '').replace(']', '')
      return <StanceIcon key={i} stance={stance} />
    }
    // Type icons
    if (part.startsWith('[icon:type:')) {
      const type = part
        .replace('[icon:type:', '')
        .replace(']', '')
        .toLowerCase()
      const typeId = typeIdMap[type]

      if (typeId) {
        return (
          <Image
            key={i}
            src={getPokemonTypeIconUrl(typeId)}
            alt={type}
            width={40}
            height={16}
            className="inline-block mx-1 h-3 w-auto object-contain align-middle"
            unoptimized
          />
        )
      }

      return (
        <span
          key={i}
          className="inline-flex items-center rounded-full border border-game-border bg-game-surface-raised px-1.5 py-0.5 text-[10px] font-bold uppercase text-game-ink align-middle mx-1"
        >
          {type}
        </span>
      )
    }
    // Status icons
    if (part.startsWith('[icon:status:')) {
      const statusId = part.replace('[icon:status:', '').replace(']', '')
      const config = statusConfig[statusId] || {
        color: 'text-game-muted',
        name: statusId,
      }
      return (
        <span
          key={i}
          className={`inline-flex items-center rounded-full border border-game-border bg-game-surface-raised px-1.5 py-0.5 text-[10px] font-bold uppercase align-middle mx-1 ${config.color}`}
        >
          {config.name}
        </span>
      )
    }
    // Damage icons
    if (part.startsWith('[icon:damage:')) {
      const damage = part.replace('[icon:damage:', '').replace(']', '')
      return <BattleValueChip key={i} type="damage" value={damage} />
    }
    // Heal icons
    if (part.startsWith('[icon:heal:')) {
      const heal = part.replace('[icon:heal:', '').replace(']', '')
      return <BattleValueChip key={i} type="heal" value={heal} />
    }
    return renderTextWithValueChips(part, `text-${i}`)
  })
}

function TypeIcon({ type }: { type: string }) {
  const typeId = typeIdMap[type.toLowerCase()]

  if (typeId) {
    return (
      <Image
        src={getPokemonTypeIconUrl(typeId)}
        alt={type}
        width={40}
        height={16}
        className="h-3.5 w-auto object-contain"
        unoptimized
      />
    )
  }

  return (
    <span className="text-[10px] font-black uppercase text-game-ink">
      {type}
    </span>
  )
}

function formatActionEffectiveness(effectiveness: string): string {
  const clean = effectiveness.toLowerCase()
  if (clean.includes('extremely')) return 'Extremely effective'
  if (clean.includes('super')) return 'Super effective'
  if (clean.includes('not very')) return 'Not very effective'
  if (clean.includes('no effect')) return 'No effect'
  return effectiveness
}

function getActionEffectivenessMeta(effectiveness: string): {
  label: string
  multiplier: string
  className: string
} {
  const clean = effectiveness.toLowerCase()

  if (clean.includes('extremely')) {
    return {
      label: formatActionEffectiveness(effectiveness),
      multiplier: 'x4',
      className: 'border-game-moss/40 bg-game-moss/12 text-game-moss-strong',
    }
  }

  if (clean.includes('super')) {
    return {
      label: formatActionEffectiveness(effectiveness),
      multiplier: 'x2',
      className: 'border-game-moss/40 bg-game-moss/12 text-game-moss-strong',
    }
  }

  if (clean.includes('no effect')) {
    return {
      label: formatActionEffectiveness(effectiveness),
      multiplier: 'x0',
      className: 'border-game-border bg-game-surface text-game-muted',
    }
  }

  return {
    label: formatActionEffectiveness(effectiveness),
    multiplier: 'x0.5',
    className: 'border-game-ochre/40 bg-game-ochre/12 text-game-ochre-strong',
  }
}

function BattleActionRow({ action }: { action: ParsedBattleAction }) {
  const isGenericAttack = isGenericAttackMove(action.move)
  const hasBadges = Boolean(action.stance || action.type)
  const effectiveness = action.effectiveness
    ? getActionEffectivenessMeta(action.effectiveness)
    : undefined

  return (
    <div className="rounded-md border border-game-border bg-game-surface-raised px-2.5 py-1.5 text-sm font-medium leading-snug text-game-ink">
      <span className="inline-flex min-w-0 flex-wrap items-center gap-x-1.5 gap-y-0.5">
        <span className="font-semibold text-game-ink">{action.pokemon}</span>
        <span className="text-game-muted">
          {isGenericAttack ? (hasBadges ? 'attacks with' : 'attacks') : 'used'}
        </span>
        {!isGenericAttack && (
          <span className="font-semibold">{action.move}</span>
        )}

        {action.stance && (
          <span className="inline-flex items-center align-middle">
            <span className="sr-only">{action.stance} stance</span>
            <StanceIcon stance={action.stance} compact />
          </span>
        )}
        {action.type && (
          <span className="inline-flex items-center align-middle">
            <TypeIcon type={action.type} />
          </span>
        )}
        {action.critical && (
          <span className="inline-flex items-center rounded-full border border-game-clay/35 bg-game-clay/10 px-1.5 py-0.5 text-[10px] font-semibold leading-none text-game-clay-strong">
            critical hit
          </span>
        )}
        {effectiveness && (
          <span
            className={cn(
              'inline-flex items-center overflow-hidden rounded-full border text-[10px] font-semibold leading-none',
              effectiveness.className,
            )}
          >
            <span className="border-r border-current/20 bg-game-surface-raised px-1.5 py-0.5">
              {effectiveness.multiplier}
            </span>
            <span className="px-1.5 py-0.5">{effectiveness.label}</span>
          </span>
        )}
        {action.damage !== undefined && (
          <BattleValueChip type="damage" value={action.damage} />
        )}
      </span>
    </div>
  )
}

function BattleEffectRow({ effect }: { effect: ParsedBattleEffect }) {
  return (
    <div
      className={cn(
        'rounded-md border px-2.5 py-1.5 text-xs leading-relaxed break-words',
        effect.tone === 'good' &&
          'border-game-moss/35 bg-game-moss/10 text-game-moss-strong',
        effect.tone === 'bad' && 'border-game-danger/40 bg-game-danger/10 text-game-danger',
        effect.tone === 'status' &&
          'border-game-moss/35 bg-game-moss/10 text-game-moss-strong',
        effect.tone === 'neutral' &&
          'border-game-border bg-game-surface text-game-muted',
      )}
    >
      {parseMessage(effect.text)}
    </div>
  )
}

const StanceIcon = ({
  stance,
  compact = false,
}: {
  stance: string
  compact?: boolean
}) => {
  const config = STANCE_ICON_CONFIG[stance as keyof typeof STANCE_ICON_CONFIG]

  return (
    <StanceGlyph
      stance={stance}
      className={cn(
        compact ? 'h-3.5 w-3.5' : 'w-4 h-4 inline-block mx-1 align-sub',
        config?.tone ?? 'text-game-muted',
      )}
    />
  )
}

interface BattleLogProps {
  logs: BattleLogEntry[]
}

export function BattleLog({ logs }: BattleLogProps) {
  const topRef = useRef<HTMLDivElement>(null)
  const [showAllTurns, setShowAllTurns] = useState(false)

  useEffect(() => {
    // Scroll to top to show newest log
    topRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, [logs])

  useEffect(() => {
    setShowAllTurns(false)
  }, [logs.length])

  // Group logs by turn for better readability and deduplicate
  const groupedLogs = useMemo(() => {
    const groups: Record<number, BattleLogEntry[]> = {}
    const seenMessages = new Set<string>()

    // We iterate backwards to prioritize the latest version of a turn if there's overlap
    logs.forEach((log) => {
      // Create a unique key for deduplication (Turn + Message)
      const key = `${log.turn}-${log.message}`
      if (seenMessages.has(key)) return
      seenMessages.add(key)

      if (!groups[log.turn]) groups[log.turn] = []
      groups[log.turn].push(log)
    })

    return Object.entries(groups).sort(([a], [b]) => Number(b) - Number(a)) // Newest turn first
  }, [logs])

  const DEFAULT_VISIBLE_TURNS = 4
  const visibleGroups = showAllTurns
    ? groupedLogs
    : groupedLogs.slice(0, DEFAULT_VISIBLE_TURNS)
  const hiddenTurnCount = Math.max(0, groupedLogs.length - visibleGroups.length)

  return (
    <ScrollArea className="h-full w-full bg-transparent text-game-ink">
      <div
        className={cn(
          'p-4',
          groupedLogs.length === 0
            ? 'flex min-h-full flex-col items-center justify-center'
            : 'space-y-6',
        )}
      >
        <div ref={topRef} />

        {visibleGroups.map(([turn, turnLogs]) => (
          <div key={turn} className="space-y-3">
            {/* Turn Header */}
            <div className="flex items-center gap-2">
              <div className="h-px flex-1 bg-game-border" />
              <span className="text-[11px] font-medium uppercase tracking-wide text-game-muted">
                Turn {turn}
              </span>
              <div className="h-px flex-1 bg-game-border" />
            </div>

            {/* Turn Actions */}
            <div className="space-y-2">
              {turnLogs.map((log, i) => {
                const parsedLog = parseBattleMessage(log.message || '', log)
                const resultTone =
                  log.result === 'win'
                    ? 'text-game-moss-strong'
                    : log.result === 'loss'
                      ? 'text-game-danger'
                      : log.result === 'tie'
                        ? 'text-game-ochre'
                        : undefined
                const resultLabel =
                  log.result === 'win'
                    ? 'Victory'
                    : log.result === 'loss'
                      ? 'Stance Fail'
                      : log.result === 'tie'
                        ? 'Draw'
                        : undefined

                return (
                  <div key={i} className="flex flex-col gap-2">
                    {resultLabel && (
                      <div
                        className={cn(
                          'text-[10px] font-black uppercase tracking-[0.08em]',
                          resultTone,
                        )}
                      >
                        {resultLabel}
                      </div>
                    )}

                    {parsedLog.actions.length > 0 && (
                      <div className="space-y-2">
                        {parsedLog.actions.map((action, actionIndex) => (
                          <BattleActionRow
                            key={`${action.actor}-${action.pokemon}-${action.move}-${actionIndex}`}
                            action={action}
                          />
                        ))}
                      </div>
                    )}

                    {parsedLog.effects.length > 0 && (
                      <div className="space-y-1.5">
                        {parsedLog.effects.map((effect, effectIndex) => (
                          <BattleEffectRow
                            key={`${effect.text}-${effectIndex}`}
                            effect={effect}
                          />
                        ))}
                      </div>
                    )}

                    {parsedLog.actions.length === 0 &&
                      parsedLog.effects.length === 0 && (
                        <div className="break-words text-sm font-medium leading-relaxed text-game-ink">
                          {parseMessage(log.message || '')}
                        </div>
                      )}
                  </div>
                )
              })}
            </div>
          </div>
        ))}

        {hiddenTurnCount > 0 && (
          <button
            type="button"
            onClick={() => setShowAllTurns(true)}
            className="game-focus-ring w-full rounded-lg border border-game-border bg-game-surface py-2 text-xs font-semibold text-game-muted transition-colors hover:border-game-moss/50 hover:text-game-ink"
          >
            Show {hiddenTurnCount} older turn{hiddenTurnCount === 1 ? '' : 's'}
          </button>
        )}

        {showAllTurns && groupedLogs.length > DEFAULT_VISIBLE_TURNS && (
          <button
            type="button"
            onClick={() => setShowAllTurns(false)}
            className="game-focus-ring w-full rounded-lg border border-game-border bg-game-surface py-2 text-xs font-semibold text-game-muted transition-colors hover:border-game-moss/50 hover:text-game-ink"
          >
            Show latest turns only
          </button>
        )}

        {groupedLogs.length === 0 && (
          <div className="rounded-xl border border-dashed border-game-border-strong bg-game-canvas/60 px-5 py-4 text-center text-game-muted">
            <p className="text-sm font-bold uppercase tracking-[0.08em] text-game-ink">
              Battle Log
            </p>
            <p className="mt-1 text-xs leading-relaxed">
              Actions and effects will appear here as the battle progresses.
            </p>
          </div>
        )}
      </div>
    </ScrollArea>
  )
}
