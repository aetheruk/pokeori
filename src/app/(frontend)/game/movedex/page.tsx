'use client'

import { CircleHelp, RotateCcw } from 'lucide-react'
import Image from 'next/image'
import { useMemo, useState, useTransition } from 'react'
import { toast } from 'sonner'
import { PremiumHeader } from '@/components/game/shared/PremiumHeader'
import { PremiumSelect } from '@/components/game/shared/PremiumSelect'
import { SecondaryControlBar } from '@/components/game/shared/SecondaryControlBar'
import {
  STANCE_ICON_CONFIG,
  StanceIcon,
} from '@/components/game/shared/stance-icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { ItemSprite } from '@/components/ui/item-sprite'
import { SectionDivider } from '@/components/ui/section-divider'
import { useUser } from '@/context/UserContext'
import type { MoveConfig } from '@/data/moves/types'
import { usePokedex } from '@/hooks/usePokedex'
import { cn } from '@/lib/utils'
import {
  getMoveDisplayType,
  getMoveInfoTags,
  getMoveTypeSpriteItemId,
} from '@/utilities/pokemon/move-display'
import {
  ALL_MOVE_DEX_ENTRIES,
  getMoveLearnersForMove,
  getMoveTypeLabel,
  type MoveDexEntry,
  type MoveDexLearner,
} from '@/utilities/pokemon/movedex'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import { getPokemonTypeIconUrl } from '@/utilities/pokemon/sprite-proxy'
import { recoverLostResearchTms } from './actions'

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
}

type PokedexProgressByForm = Record<
  string,
  {
    seen?: boolean | null
    caught?: boolean | null
  }
>

export default function MoveDexPage() {
  const { gameData, refreshUser } = useUser()
  const { entriesByForm } = usePokedex()
  const [isRecovering, startRecovery] = useTransition()
  const [selectedMoveType, setSelectedMoveType] = useState<string>('all')
  const [selectedMove, setSelectedMove] = useState<{
    entry: MoveDexEntry
    isKnown: boolean
  } | null>(null)

  const inventory = useMemo(
    () =>
      Object.fromEntries(
        (gameData?.inventory || []).map((item) => [item.itemId, item.quantity]),
      ),
    [gameData?.inventory],
  )
  const ownedMoveCount = useMemo(
    () =>
      ALL_MOVE_DEX_ENTRIES.filter((entry) => (inventory[entry.itemId] || 0) > 0)
        .length,
    [inventory],
  )
  const typeOptions = useMemo(() => {
    const types = Array.from(
      new Set(ALL_MOVE_DEX_ENTRIES.map((entry) => entry.moveType)),
    ).sort((a, b) => a.localeCompare(b))
    return [
      { id: 'all', label: 'All Types' },
      ...types.map((type) => ({
        id: type,
        label: getMoveTypeLabel(type),
      })),
    ]
  }, [])
  const filteredMoves = useMemo(
    () =>
      selectedMoveType === 'all'
        ? ALL_MOVE_DEX_ENTRIES
        : ALL_MOVE_DEX_ENTRIES.filter(
            (entry) => entry.moveType === selectedMoveType,
          ),
    [selectedMoveType],
  )

  const handleRecoverLostTms = () => {
    startRecovery(async () => {
      try {
        const result = await recoverLostResearchTms()
        if (!result.success) {
          toast.error(result.message)
          return
        }

        refreshUser(true)
        if (result.recovered.length === 0) {
          toast.info(result.message)
          return
        }

        toast.success(result.message)
      } catch {
        toast.error('Failed to recover lost TMs.')
      }
    })
  }

  return (
    <div className="flex h-full flex-col overflow-hidden bg-game-canvas text-game-ink">
      <PremiumHeader
        title="MoveDex"
        subtitle={`${ownedMoveCount} / ${ALL_MOVE_DEX_ENTRIES.length}`}
      />

      <div className="hidden items-center gap-3 border-b border-game-border bg-game-surface/70 px-6 py-3 xl:flex">
        <div className="w-64 shrink-0">
          <PremiumSelect
            value={selectedMoveType}
            onValueChange={setSelectedMoveType}
            options={typeOptions}
          />
        </div>
        <p className="text-xs text-game-muted">
          Filter the MoveDex by field type.
        </p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto px-4 pt-4 md:px-6">
        <div className="mb-4">
          <SectionDivider className="mb-0 flex-1">
            <div className="flex flex-wrap items-center gap-3 sm:gap-6">
              <div className="flex items-center gap-2" title="Owned">
                <span className="text-[11px] font-black uppercase tracking-normal text-game-muted">
                  Owned
                </span>
                <span className="font-mono text-sm font-bold text-game-ink">
                  {ownedMoveCount}
                </span>
              </div>
              <div className="flex items-center gap-2" title="Total">
                <span className="text-[11px] font-black uppercase tracking-normal text-game-muted">
                  Total
                </span>
                <span className="font-mono text-sm font-bold text-game-ink">
                  {ALL_MOVE_DEX_ENTRIES.length}
                </span>
              </div>
              <Button
                type="button"
                size="sm"
                variant="secondary"
                onClick={handleRecoverLostTms}
                disabled={isRecovering}
                aria-busy={isRecovering}
                className="ml-auto min-h-11"
              >
                <RotateCcw
                  className={cn('h-3.5 w-3.5', isRecovering && 'animate-spin')}
                />
                {isRecovering ? 'Recovering' : "Recover Lost TM's"}
              </Button>
            </div>
          </SectionDivider>
        </div>

        <div className="grid gap-2 lg:grid-cols-2 2xl:grid-cols-3 pb-8">
          {filteredMoves.map((entry) => {
            const isKnown = (inventory[entry.itemId] || 0) > 0
            return (
              <MoveDexListItem
                key={entry.itemId}
                entry={entry}
                isKnown={isKnown}
                onSelect={() => {
                  setSelectedMove({ entry, isKnown })
                }}
              />
            )
          })}
        </div>
      </div>

      <SecondaryControlBar className="xl:hidden">
        <PremiumSelect
          value={selectedMoveType}
          onValueChange={setSelectedMoveType}
          options={typeOptions}
        />
      </SecondaryControlBar>

      <Dialog
        open={selectedMove !== null}
        onOpenChange={(open) => {
          if (!open) setSelectedMove(null)
        }}
      >
        <DialogContent className="max-h-[88dvh] overflow-hidden border-game-border bg-game-surface p-0 text-game-ink sm:max-w-xl">
          <DialogHeader className="border-b border-game-border px-5 pb-4 pt-5">
            <DialogTitle className="font-display text-game-ink">
              {selectedMove
                ? selectedMove.isKnown
                  ? selectedMove.entry.move.name
                  : 'TM Not Found'
                : 'Move Details'}
            </DialogTitle>
            <DialogDescription>
              {selectedMove?.isKnown
                ? `TM Type: ${getMoveTypeLabel(selectedMove.entry.moveType)}`
                : 'A clue has been added to your MoveDex.'}
            </DialogDescription>
          </DialogHeader>

          {selectedMove?.isKnown && (
            <div className="space-y-6 overflow-y-auto px-5 py-4 custom-scrollbar">
              <MoveDexMoveSummary move={selectedMove.entry.move} />
              <MoveDexLearnerList
                move={selectedMove.entry.move}
                entriesByForm={entriesByForm}
              />
            </div>
          )}

          {selectedMove && !selectedMove.isKnown && (
            <div className="space-y-4 overflow-y-auto px-5 py-4 custom-scrollbar">
              <div className="game-panel p-4">
                <div className="flex items-start gap-4">
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
                    <CircleHelp className="h-7 w-7 text-game-muted" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-display text-lg font-semibold text-game-ink">
                      Unknown TM
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-game-muted">
                      {selectedMove.entry.unlockClue}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}

function MoveDexListItem({
  entry,
  isKnown,
  onSelect,
}: {
  entry: MoveDexEntry
  isKnown: boolean
  onSelect: () => void
}) {
  const stanceConfig = STANCE_ICON_CONFIG[entry.move.stance]
  const moveTypeId =
    entry.moveType === 'random' ? null : typeIdMap[entry.moveType]
  const moveLevel = entry.move.level ?? 1

  return (
    <button
      type="button"
      aria-label={
        isKnown ? `View ${entry.move.name}` : 'Unknown move'
      }
      onClick={onSelect}
      className={cn(
        'group relative flex min-h-16 w-full items-center gap-3 overflow-hidden rounded-lg border px-3 py-2.5 text-left transition-colors sm:px-4',
        isKnown
          ? 'border-game-border bg-game-surface hover:border-game-moss/40 hover:bg-game-surface-raised'
          : 'border-game-border bg-game-surface/60 hover:border-game-border-strong hover:bg-game-surface',
      )}
      title={isKnown ? entry.move.name : entry.unlockClue}
    >
      <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
        {isKnown ? (
          <ItemSprite
            itemId={getMoveTypeSpriteItemId(entry.move)}
            alt={`${entry.moveType} TM`}
            width={36}
            height={36}
            className="h-8 w-8 object-contain"
          />
        ) : (
          <CircleHelp className="h-6 w-6 text-game-muted" />
        )}
      </div>

      <div className="min-w-0 flex-1">
        {isKnown ? (
          <h3 className="truncate text-sm font-semibold text-game-ink sm:text-base">
            {entry.move.name}
          </h3>
        ) : (
          <h3 className="text-sm font-semibold text-game-muted sm:text-base">
            ???
          </h3>
        )}
        <div className="mt-1 flex min-h-6 flex-wrap items-center gap-2">
          {isKnown ? (
            <>
              <MoveDexTypeChip type={entry.moveType} typeId={moveTypeId} />
              {stanceConfig && (
                <div
                  className="flex h-6 w-6 items-center justify-center rounded-md border border-game-border bg-game-surface-raised"
                  title={stanceConfig.label}
                >
                  <StanceIcon
                    stance={entry.move.stance}
                    className={`h-3.5 w-3.5 ${stanceConfig.tone}`}
                  />
                </div>
              )}
            </>
          ) : (
            <>
              <Badge className="border-game-border bg-game-canvas px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-game-muted">
                Unknown
              </Badge>
              <div className="h-6 w-6 rounded-md bg-game-canvas" />
            </>
          )}
        </div>
      </div>

      <Badge
        className={cn(
          'ml-auto shrink-0 border px-2.5 py-1 font-mono text-[10px] font-black uppercase tracking-normal',
          isKnown
            ? 'border-game-moss/25 bg-game-moss/10 text-game-moss-strong'
            : 'border-game-border bg-game-canvas text-game-muted',
        )}
      >
        {isKnown ? `Lv ${moveLevel}` : '???'}
      </Badge>
    </button>
  )
}

function MoveDexTypeChip({
  type,
  typeId,
}: {
  type: string
  typeId: number | null
}) {
  if (!typeId) {
    return (
      <Badge className="border-game-border bg-game-canvas px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.08em] text-game-ink">
        {getMoveTypeLabel(type)}
      </Badge>
    )
  }

  return (
    <div className="flex h-6 items-center justify-center rounded-md border border-game-border bg-game-surface-raised px-2">
      <Image
        src={getPokemonTypeIconUrl(typeId)}
        alt={type}
        width={64}
        height={28}
        className="h-4 w-auto object-contain"
        unoptimized
      />
    </div>
  )
}

function MoveDexMoveSummary({ move }: { move: MoveConfig }) {
  const tags = getMoveInfoTags(move)
  const stanceConfig = STANCE_ICON_CONFIG[move.stance]

  return (
    <div className="space-y-4">
      <SectionDivider>Move data</SectionDivider>
      <div className="game-panel p-4">
        <div className="flex items-start gap-4">
          <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface-raised">
            <ItemSprite
              itemId={getMoveTypeSpriteItemId(move)}
              alt={`${getMoveTypeLabel(getMoveDisplayType(move))} TM`}
              width={44}
              height={44}
              className="h-10 w-10 object-contain"
            />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="font-display text-xl font-semibold text-game-ink">
              {move.name}
            </h3>
            <div className="mt-2 flex items-center gap-2">
              {stanceConfig && (
                <StanceIcon
                  stance={move.stance}
                  className={cn('h-4 w-4', stanceConfig.tone)}
                />
              )}
              <Badge className="border-game-border bg-game-canvas px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-game-ink">
                {getMoveTypeLabel(getMoveDisplayType(move))}
              </Badge>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-game-muted">
              {move.description}
            </p>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-3">
          {tags.map((tag) => (
            <div
              key={`${move.id}-${tag.label}`}
              className="rounded-lg border border-game-border bg-game-surface-raised px-3 py-2"
            >
              <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-game-muted">
                {tag.label}
              </div>
              <div className="mt-0.5 truncate text-xs font-bold capitalize text-game-ink">
                {tag.value}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function MoveDexLearnerList({
  move,
  entriesByForm,
}: {
  move: MoveConfig
  entriesByForm: PokedexProgressByForm
}) {
  const { learners, allPokemon } = useMemo(
    () => getMoveLearnersForMove(move),
    [move],
  )

  return (
    <div className="space-y-4">
      <SectionDivider>Can learn</SectionDivider>
      <div className="game-panel p-3">
        {allPokemon ? (
          <p className="text-sm text-game-ink">
            All Pokemon can use this move.
          </p>
        ) : (
          <div className="max-h-[min(22rem,45dvh)] overflow-y-auto pr-1 custom-scrollbar">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(4.5rem,4.5rem))] justify-start gap-2">
              {learners.map((learner) => (
                <MoveDexLearnerTile
                  key={`${learner.speciesId}-${learner.form.id}`}
                  learner={learner}
                  progress={entriesByForm[learner.form.id]}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function MoveDexLearnerTile({
  learner,
  progress,
}: {
  learner: MoveDexLearner
  progress?: {
    seen?: boolean | null
    caught?: boolean | null
  }
}) {
  const hasSeen = !!(progress?.seen || progress?.caught)
  const hasCaught = !!progress?.caught

  return (
    <div
      className={cn(
        'relative h-[4.5rem] w-[4.5rem] overflow-hidden rounded-lg border bg-game-surface-raised p-1.5',
        hasCaught
          ? 'border-game-moss/40'
          : hasSeen
            ? 'border-game-border-strong'
            : 'border-game-border',
      )}
      title={hasSeen ? learner.form.name : 'Unknown Pokemon'}
    >
      {hasSeen ? (
        <Image
          src={getPokemonImageUrl(learner.form.id, 'sprite')}
          alt={learner.form.name}
          fill
          sizes="80px"
          className="object-contain p-1"
          style={{
            filter: hasCaught ? undefined : 'grayscale(1) opacity(0.75)',
          }}
        />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-game-muted">
          <span className="text-2xl font-bold text-game-muted">?</span>
        </div>
      )}

      <div className="absolute inset-x-1 bottom-1 rounded bg-game-surface/90 px-1 py-0.5 text-center font-mono text-[10px] font-bold leading-none text-game-muted">
        #{learner.speciesId}
      </div>
    </div>
  )
}
