'use client'

import { AlertTriangle, BookOpen } from 'lucide-react'
import Image from 'next/image'
import type { ReactNode } from 'react'

import {
  STANCE_ICON_CONFIG,
  StanceIcon,
} from '@/components/game/shared/stance-icon'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import type {
  MovePresentation,
  MovePresentationDetail,
} from '@/utilities/pokemon/move-display'
import { getPokemonTypeIconUrl } from '@/utilities/pokemon/sprite-proxy'

const TYPE_IDS: Record<string, number> = {
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
}

export interface MoveBattleCommandProps {
  presentation: MovePresentation
  onDetails: () => void
  primaryAction: ReactNode
  className?: string
}

export function MoveBattleCommand({
  presentation,
  onDetails,
  primaryAction,
  className,
}: MoveBattleCommandProps) {
  const { identity, essentials } = presentation
  const typeId = TYPE_IDS[identity.type]
  const stance = STANCE_ICON_CONFIG[identity.stance]
  const caution =
    presentation.conditions[0] ??
    presentation.risks[0] ??
    presentation.timing[0]
  const power = /^\d/.test(essentials.power.value)
    ? `${essentials.power.value} power`
    : essentials.power.value

  return (
    <article
      className={cn(
        'game-panel grid min-w-0 grid-cols-[minmax(0,1fr)_auto] overflow-hidden p-0',
        className,
      )}
    >
      <button
        type="button"
        onClick={onDetails}
        aria-label={`View ${identity.name} details`}
        className="group min-h-[4.5rem] min-w-0 px-3 py-2.5 text-left outline-none transition-colors hover:bg-game-moss/5 focus-visible:bg-game-moss/10 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-game-moss/60"
      >
        <span className="flex min-w-0 items-center gap-2">
          {typeId ? (
            <span className="flex h-6 shrink-0 items-center rounded-md border border-game-border bg-game-surface-raised px-1.5">
              <Image
                src={getPokemonTypeIconUrl(typeId)}
                alt={`${titleCase(identity.type)} type`}
                width={64}
                height={28}
                className="h-3.5 w-auto object-contain"
                unoptimized
              />
            </span>
          ) : (
            <Badge
              variant="outline"
              className="border-game-border bg-game-surface-raised px-1.5 text-[10px] text-game-ink"
            >
              {titleCase(identity.type)}
            </Badge>
          )}
          <strong className="min-w-0 flex-1 truncate font-display text-sm text-game-ink">
            {identity.name}
          </strong>
          <BookOpen
            className="size-4 shrink-0 text-game-muted transition-colors group-hover:text-game-moss-strong"
            aria-hidden="true"
          />
        </span>

        <span className="mt-1.5 flex min-w-0 items-center gap-1.5 text-xs font-semibold text-game-muted">
          <span className="font-mono text-game-ink">{power}</span>
          <span aria-hidden="true">·</span>
          <span className="font-mono">{essentials.accuracy.value}</span>
          <span aria-hidden="true">·</span>
          <span className="inline-flex min-w-0 items-center gap-1">
            <StanceIcon
              stance={identity.stance}
              className={cn('size-3.5 shrink-0', stance?.tone)}
            />
            <span>{stance?.label ?? titleCase(identity.stance)}</span>
          </span>
        </span>

        {caution ? (
          <span className="mt-1 flex min-w-0 items-center gap-1 text-[11px] leading-tight text-game-clay-strong">
            <AlertTriangle className="size-3 shrink-0" aria-hidden="true" />
            <span className="truncate">{compactWarning(caution)}</span>
          </span>
        ) : null}
      </button>

      <div className="flex items-center border-l border-game-border bg-game-surface-raised/65 px-2">
        {primaryAction}
      </div>
    </article>
  )
}

function titleCase(value: string): string {
  return value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function compactWarning(detail: MovePresentationDetail): string {
  const sentence = detail.value.replace(/\.$/, '')

  if (detail.id === 'self-damage') {
    const trigger = sentence.startsWith('If this move misses')
      ? 'Miss'
      : sentence.startsWith('When this move is used')
        ? 'Use'
        : 'Hit'
    const loss = sentence.match(/lose (.+?)(?: of maximum HP)?$/)?.[1] ?? 'HP'
    const chance = detail.chance && detail.chance < 100 ? `${detail.chance}% ` : ''
    return `${trigger}: ${chance}lose ${loss.replace(' of maximum HP', '')} max HP`
  }

  if (detail.id === 'charge') {
    return sentence.replace(/^Charges for /, 'Charge: ').replace(/ before attacking$/, '')
  }
  if (detail.id === 'recharge') {
    return sentence
      .replace(/^The user must recharge for /, 'Recharge: ')
      .replace(/ afterward$/, '')
  }
  if (detail.id === 'continuous') {
    return sentence.replace(/^Continues for /, 'Repeat: ')
  }

  return sentence
    .replace(/^Only works on /, 'Only on ')
    .replace(/^Only works while /, 'Only while ')
    .replace(/^Only works /, 'Only ')
}
