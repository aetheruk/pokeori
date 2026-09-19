'use client'

import { useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import Image from 'next/image'
import { Swords } from 'lucide-react'
import { STANCE_ICON_CONFIG } from '@/components/game/shared/stance-icon'
import { Button } from '@/components/ui/button'
import { Drawer, DrawerContent, DrawerTrigger } from '@/components/ui/drawer'
import { cn } from '@/lib/utils'
import { getStatStageMultiplier } from '@/utilities/battle/battle-logic'
import type { BattleStance } from '@/utilities/battle/types'
import { getPokemonTypeIconUrl } from '@/utilities/pokemon/sprite-proxy'
import { BattleActionTrigger } from './battle-action-trigger'

const TYPE_SURFACE_COLORS: Record<string, string> = {
  normal: '#e4e3d2',
  fighting: '#edc9c4',
  flying: '#ded8f5',
  poison: '#e8d1e5',
  ground: '#f2e5c5',
  rock: '#e9e4bd',
  bug: '#e4edbd',
  ghost: '#d7cce8',
  steel: '#e1e1ea',
  fire: '#f8dcc7',
  water: '#d9e3f8',
  grass: '#dcebc7',
  electric: '#faefbd',
  psychic: '#f8cedb',
  ice: '#d8efee',
  dragon: '#d9cdf8',
  dark: '#ded5cf',
  fairy: '#f0d9e7',
}

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

export interface StanceSelectorProps {
  onSelect: (stance: BattleStance) => void
  disabled?: boolean
  stats: {
    attack: number
    defense: number
    speed: number
    specialAttack: number
    specialDefense: number
  }
  statStages?: {
    attack: number
    defense: number
    speed: number
    specialAttack: number
    specialDefense: number
  } // Can be partial or full StatStages
  zMoveReady?: boolean
  isDynamaxed?: boolean
  disabledStance?: BattleStance
  pendingStance?: BattleStance
  types?: readonly string[]
  selectedType?: string | null
  onTypeSelect?: (type: string) => void
  typeOverride?: string | null
}

type StanceSelectorDrawerProps = StanceSelectorProps & {
  triggerIcon?: ReactNode
}

export function StanceSelector({
  onSelect,
  disabled,
  stats,
  statStages,
  zMoveReady,
  isDynamaxed,
  disabledStance,
  pendingStance,
  types,
  selectedType,
  onTypeSelect,
  typeOverride,
}: StanceSelectorProps) {
  const [feedback, setFeedback] = useState<{
    stance: BattleStance
    sequence: number
  } | null>(null)

  useEffect(() => {
    if (!feedback) return
    const timer = window.setTimeout(() => setFeedback(null), 600)
    return () => window.clearTimeout(timer)
  }, [feedback])

  const getMult = (stage?: number) => getStatStageMultiplier(stage || 0)

  // Show only the relevant offensive stat for each stance
  const powerVal = Math.floor(stats.attack * getMult(statStages?.attack))
  const speedVal = Math.floor(stats.speed * getMult(statStages?.speed))
  const techVal = Math.floor(
    stats.specialAttack * getMult(statStages?.specialAttack),
  )
  const stanceType = typeOverride ?? selectedType ?? types?.[0] ?? 'normal'
  const stanceTypeLabel = titleCase(stanceType)

  const stanceCards: Array<{
    stance: BattleStance
    label: string
    actionName: string
    statLabel: string
    beats: string
    value: number
    icon: typeof STANCE_ICON_CONFIG.power.Icon
  }> = [
    {
      stance: 'speed',
      label: 'Speed',
      actionName: 'Strike',
      statLabel: 'Speed',
      beats: 'Power',
      value: speedVal,
      icon: STANCE_ICON_CONFIG.speed.Icon,
    },
    {
      stance: 'power',
      label: 'Power',
      actionName: 'Tackle',
      statLabel: 'Attack',
      beats: 'Tech',
      value: powerVal,
      icon: STANCE_ICON_CONFIG.power.Icon,
    },
    {
      stance: 'tech',
      label: 'Tech',
      actionName: 'Gambit',
      statLabel: 'Sp. Atk',
      beats: 'Speed',
      value: techVal,
      icon: STANCE_ICON_CONFIG.tech.Icon,
    },
  ]

  return (
    <div
      className="game-battle-stance-panel mx-auto w-full max-w-2xl space-y-3"
      data-type={stanceType.toLowerCase()}
    >
      {types && types.length > 0 && (
        <div
          className="game-battle-type-strip game-battle-type-strip--drawer"
          data-type={stanceType.toLowerCase()}
        >
          <div className="game-battle-type-selector">
            {typeOverride ? (
              (() => {
                const typeId = TYPE_IDS[typeOverride.toLowerCase()]
                return typeId ? (
                  <Image
                    src={getPokemonTypeIconUrl(typeId, true)}
                    alt={`Tera ${stanceTypeLabel} type`}
                    width={100}
                    height={40}
                    className="game-battle-type-image game-battle-type-image--active h-6 w-auto object-contain"
                    unoptimized
                  />
                ) : (
                  <span className="font-medium capitalize text-game-ink">
                    {stanceTypeLabel}
                  </span>
                )
              })()
            ) : (
              <div className="flex min-w-0 justify-center gap-2">
                {types.map((type) => {
                  const typeId = TYPE_IDS[type.toLowerCase()]
                  const isSelected = selectedType === type

                  return (
                    <Button
                      key={type}
                      type="button"
                      variant="ghost"
                      className={cn(
                        'game-battle-type-option group relative flex h-10 w-20 items-center justify-center rounded-lg border-0 bg-transparent p-0 hover:bg-transparent',
                        isSelected ? 'opacity-100' : 'opacity-60 grayscale',
                      )}
                      aria-label={type}
                      aria-pressed={isSelected}
                      disabled={disabled || !onTypeSelect}
                      onClick={() => onTypeSelect?.(type)}
                    >
                      {typeId ? (
                        <Image
                          src={getPokemonTypeIconUrl(typeId)}
                          alt={`${titleCase(type)} type`}
                          width={100}
                          height={40}
                          className="game-battle-type-image h-7 w-auto object-contain transition-[filter,opacity] duration-150 group-hover:opacity-100 group-hover:grayscale-0 motion-reduce:transition-none"
                          unoptimized
                        />
                      ) : (
                        <span className="text-xs font-semibold capitalize text-game-ink">
                          {type}
                        </span>
                      )}
                    </Button>
                  )
                })}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="game-battle-stance-list w-full">
        {stanceCards.map((card) => {
          const Icon = card.icon
          const isZReady = !!zMoveReady
          const isStanceDisabled = disabledStance === card.stance
          const isPending = pendingStance === card.stance
          const isFeedback = feedback?.stance === card.stance

          return (
            <Button
              key={card.stance}
              type="button"
              variant="outline"
              data-stance={card.stance}
              data-pending={isPending || undefined}
              data-z-ready={isZReady || undefined}
              data-feedback={isFeedback || undefined}
              className={cn(
                'game-battle-stance relative min-w-0 border text-left',
                (isPending || isFeedback) &&
                  !isStanceDisabled &&
                  'disabled:opacity-100',
              )}
              onClick={() => {
                setFeedback((previous) => ({
                  stance: card.stance,
                  sequence: (previous?.sequence ?? 0) + 1,
                }))
                onSelect(card.stance)
              }}
              disabled={disabled || isStanceDisabled}
              aria-label={
                isStanceDisabled
                  ? `${card.label} stance disabled`
                  : `Use ${stanceTypeLabel} ${card.actionName}. ${card.label} stance, ${isZReady ? 'Z-Move ready' : `${card.statLabel} ${card.value}`}. Beats ${card.beats}`
              }
              aria-busy={isPending}
            >
              <span
                key={isFeedback ? feedback.sequence : 'idle'}
                aria-hidden
                className="game-battle-stance-icon relative inline-flex size-10 shrink-0 items-center justify-center"
                data-feedback={isFeedback || undefined}
              >
                <Icon className="relative z-10 size-7 [&_*]:stroke-[1.8]" />
              </span>
              <span className="game-battle-stance-name min-w-0 text-right">
                <strong className="block truncate font-display text-lg font-black leading-tight sm:text-xl">
                  {zMoveReady ? '' : isDynamaxed ? 'MAX ' : ''}
                  {stanceTypeLabel} {card.actionName}
                  {zMoveReady ? ' Z' : ''}
                </strong>
              </span>
            </Button>
          )
        })}
      </div>
    </div>
  )
}

export function StanceSelectorDrawer({
  triggerIcon,
  ...props
}: StanceSelectorDrawerProps) {
  const [open, setOpen] = useState(false)
  const drawerType = (
    props.typeOverride ??
    props.selectedType ??
    props.types?.[0] ??
    'normal'
  ).toLowerCase()

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <BattleActionTrigger
          icon={triggerIcon ?? <Swords className="size-5" aria-hidden />}
          label="Stance"
          count="3"
          data-action="stance"
          aria-label="Open stance choices"
          disabled={props.disabled}
        />
      </DrawerTrigger>
      <DrawerContent
        className="game-battle-stance-drawer game-paper-modal game-paper-background max-h-[82dvh] border-game-border bg-game-surface-raised"
        title="Choose Stance"
        description="Read the field and choose your next battle stance."
        icon={<Swords className="h-14 w-14" aria-hidden="true" />}
        background="/backgrounds/battle.avif"
        heroLabel="Battle"
        data-type={drawerType}
        style={
          {
            '--game-paper-background':
              TYPE_SURFACE_COLORS[drawerType] ?? TYPE_SURFACE_COLORS.normal,
          } as CSSProperties
        }
      >
        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-6">
          <StanceSelector
            {...props}
            onSelect={(stance) => {
              setOpen(false)
              props.onSelect(stance)
            }}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}

function titleCase(value: string): string {
  return value
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}
