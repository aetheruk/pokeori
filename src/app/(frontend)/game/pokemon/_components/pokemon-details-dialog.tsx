'use client'

import {
  Atom,
  Check,
  Circle,
  Clock,
  Diamond,
  Flag,
  FlaskConical,
  Info,
  Loader2,
  Lock,
  Maximize2,
  Megaphone,
  Sparkles,
  Square,
  Swords,
  Trash2,
  Triangle,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import * as React from 'react'
import { useEffect, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { RewardSummaryDisplay } from '@/components/game/reward-summary'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import { StanceIcon } from '@/components/game/shared/stance-icon'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
} from '@/components/ui/dialog'
import { ItemSprite } from '@/components/ui/item-sprite'
import { ResponsivePanel } from '@/components/ui/responsive-panel'
import { SectionDivider } from '@/components/ui/section-divider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Vortex } from '@/components/ui/vortex'
import { useUser } from '@/context/UserContext'
import { ABILITIES } from '@/data/abilities'
import { EVOLUTIONS } from '@/data/evolutions'
import { items } from '@/data/items'
import { DEED_POLL_ITEM_ID } from '@/data/items/special-item-ids'
import { NATURES } from '@/data/natures'
import { cn } from '@/lib/utils'
import type { Pokemon, User } from '@/payload-types'
import { BASE_BATTLE_POWER } from '@/utilities/battle/constants'
import { getAbilityDexPartnerEffectLines } from '@/utilities/pokemon/abilitydex'
import {
  getEvolutionTimeOfDayLabel,
  getEvolutionTimeRegionLabel,
  matchesEvolutionGender,
  matchesEvolutionTimeOfDayForRegion,
  resolveEvolutionTimeRegion,
} from '@/utilities/pokemon/evolution-conditions'
import { getOwnedPokemonGender } from '@/utilities/pokemon/gender'
import {
  formatHeldItemTrigger,
  getHeldItemDefinition,
  getHeldItemOptions,
} from '@/utilities/pokemon/held-items'
import { getPokemonForm, getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import {
  getAvailableMoveOptions,
  normalizeAssignedMoveIds,
} from '@/utilities/pokemon/pokemon-moves'
import {
  getPokemonRarityEffect,
  resolvePokemonRarity,
} from '@/utilities/pokemon/rarity-effects'
import {
  getAvailablePokemonPowerOptions,
  normalizeSelectedPokemonPower,
  POKEMON_POWER_OPTIONS,
  type PokemonPowerId,
} from '@/utilities/pokemon/pokemon-powers'
import { getPokemonTypeIconUrl } from '@/utilities/pokemon/sprite-proxy'
import {
  MAX_RESEARCH_LEVEL,
  RESEARCH_LEVEL_REWARDS,
  RESEARCH_LEVEL_THRESHOLDS,
} from '@/utilities/research/research-levels'
import type { RewardSummary } from '@/utilities/rewards/reward-logic'
import {
  canUseTrainerHeldItems,
  getEffectivePokemonIvs,
  getItemSkillLockReason,
  getResearcherMoveSlotCount,
  getSkillLevel,
  getTrainerIvCap,
  RESEARCHER_MOVE_SLOT_UNLOCKS,
  TRAINER_HELD_ITEM_LEVEL,
} from '@/utilities/skills/unlocks'
import {
  evolvePokemon,
  setAssignedMoves,
  setHeldItem,
  setPokemonRosterRole,
  setSelectedPokemonPower,
  toggleLock,
  toggleMarking,
} from '../actions'
import { RenameDialog } from './rename-dialog'
import { UseItemDialog } from './use-item-dialog'

const POKEMON_LOADOUT_RESEARCH_LEVEL = 1
const RESEARCHER_MOVE_ASSIGN_LEVEL = RESEARCHER_MOVE_SLOT_UNLOCKS[0].level

function formatAssignedMovePower(damage: number): string {
  if (damage <= 0) return 'No Damage'
  return `${Math.round(BASE_BATTLE_POWER * damage)}`
}

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

function getFormPokedexProgress(
  pokedex: unknown,
  speciesId: string | number | null | undefined,
  formId: string | number | null | undefined,
) {
  if (speciesId === null || speciesId === undefined || !formId)
    return { researchXp: 0, researchLevel: 0 }

  if (!pokedex) return { researchXp: 0, researchLevel: 0 }

  const entry = Array.isArray(pokedex)
    ? pokedex.find(
        (row: any) =>
          String(row?.speciesId) === String(speciesId) &&
          String(row?.formId) === String(formId),
      )
    : (pokedex as Record<string, Record<string, any>>)?.[String(speciesId)]?.[
        String(formId)
      ]

  const rawLevel = Number(entry?.researchLevel || 0)
  const rawXp = Number(entry?.researchXp || 0)

  return {
    researchLevel: Number.isFinite(rawLevel)
      ? Math.max(0, Math.min(MAX_RESEARCH_LEVEL, Math.floor(rawLevel)))
      : 0,
    researchXp: Number.isFinite(rawXp) ? Math.max(0, Math.floor(rawXp)) : 0,
  }
}

function formatPokemonOrigin(pokemon: Pokemon) {
  const origin = pokemon as Pokemon & {
    obtainedMethod?: string | null
    obtainedRegion?: string | null
    obtainedLocation?: string | null
  }

  switch (origin.obtainedMethod) {
    case 'starter':
      return { title: 'My First Pokemon' }
    case 'trade':
      return { title: 'Obtained in a Trade' }
    case 'gift':
      return { title: 'Received as a Gift' }
    case 'caught':
      return {
        title: origin.obtainedRegion
          ? `Caught in ${origin.obtainedRegion}`
          : 'Caught',
        subtitle: origin.obtainedLocation || undefined,
      }
    case 'purchased':
      return {
        title: origin.obtainedRegion
          ? `Purchased in ${origin.obtainedRegion}`
          : 'Purchased',
        subtitle: origin.obtainedLocation || undefined,
      }
    case 'reward':
      return {
        title: origin.obtainedRegion
          ? `Received in ${origin.obtainedRegion}`
          : 'Received as a Reward',
        subtitle: origin.obtainedLocation || undefined,
      }
    case 'hatched':
      return {
        title: 'Hatched from an Egg',
        subtitle: origin.obtainedLocation || undefined,
      }
    default:
      return { title: 'Origin Unknown' }
  }
}

function normalizePokemonBackgroundPath(path?: string | null) {
  if (!path) return '/backgrounds/forest.avif'

  const filename = path.split('/').pop()
  if (!filename) return '/backgrounds/forest.avif'

  const normalizedFilename = filename
    .replace(/\.(png|jpe?g|webp)$/i, '.avif')
    .replaceAll('_', '-')

  return `/backgrounds/${normalizedFilename}`
}

function getLoadoutUnlockMessage({
  featureName,
  skillName,
  skillLevel,
  requiredSkillLevel,
  pokemonResearchLevel,
}: {
  featureName: string
  skillName: string
  skillLevel: number
  requiredSkillLevel: number
  pokemonResearchLevel: number
}) {
  const needsSkillLevel = skillLevel < requiredSkillLevel
  const needsResearchLevel =
    pokemonResearchLevel < POKEMON_LOADOUT_RESEARCH_LEVEL

  if (needsSkillLevel && needsResearchLevel) {
    return `Reach ${skillName} Level ${requiredSkillLevel} and Research Level ${POKEMON_LOADOUT_RESEARCH_LEVEL} with this Pokemon to unlock ${featureName}.`
  }

  if (needsSkillLevel) {
    return `Reach ${skillName} Level ${requiredSkillLevel} to unlock ${featureName}.`
  }

  if (needsResearchLevel) {
    return `Reach Research Level ${POKEMON_LOADOUT_RESEARCH_LEVEL} with this Pokemon to unlock ${featureName}.`
  }

  return null
}

function PokemonTypeChips({ types }: { types: string[] }) {
  if (types.length === 0) return null

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {types.map((type) => {
        const typeId = typeIdMap[type.toLowerCase()]
        return typeId ? (
          <div key={type} className="relative">
            <Image
              src={getPokemonTypeIconUrl(typeId)}
              alt={type}
              width={64}
              height={28}
              className="h-5 w-auto object-contain drop-shadow-sm"
              unoptimized
            />
          </div>
        ) : (
          <Badge
            key={type}
            variant="secondary"
            className="border-game-border bg-game-surface-raised px-3 py-1 text-[10px] font-black uppercase tracking-widest text-game-muted"
          >
            {type}
          </Badge>
        )
      })}
    </div>
  )
}

function ResearchSection({
  formId,
  researchXp,
  researchLevel,
}: {
  formId: string
  researchXp: number
  researchLevel: number
}) {
  const isMaxLevel = researchLevel >= MAX_RESEARCH_LEVEL

  const nextThreshold = isMaxLevel
    ? RESEARCH_LEVEL_THRESHOLDS[MAX_RESEARCH_LEVEL]
    : RESEARCH_LEVEL_THRESHOLDS[researchLevel + 1]
  const xpProgress = isMaxLevel
    ? 100
    : Math.min(100, Math.max(0, (researchXp / nextThreshold) * 100))

  const activeRewards = Object.entries(RESEARCH_LEVEL_REWARDS)
    .filter(([levelStr]) => parseInt(levelStr) <= researchLevel)
    .map(([levelStr, reward]) => ({
      level: parseInt(levelStr),
      reward,
    }))

  return (
    <div className="w-full max-w-md space-y-4 pt-4">
      <SectionDivider className="uppercase tracking-[0.2em] font-black text-[10px]">
        Research Progress
      </SectionDivider>

      <div className="relative overflow-hidden rounded-2xl border border-game-border bg-game-surface-raised p-5 shadow-sm">
        <div className="absolute right-0 top-0 p-3 opacity-[0.07]">
          <FlaskConical className="h-16 w-16 -rotate-12 text-game-moss" />
        </div>

        <div className="relative z-10 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="mb-1 text-[10px] font-bold uppercase leading-none tracking-widest text-game-muted">
                Current Status
              </span>
              <span className="font-display text-2xl font-semibold tracking-tight text-game-moss-strong">
                Level {researchLevel}
              </span>
            </div>
            {isMaxLevel ? (
              <Badge className="border-game-moss bg-game-moss/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.08em] text-game-moss-strong">
                Complete
              </Badge>
            ) : (
              <div className="text-right">
                <span className="mb-0.5 block text-[10px] font-black uppercase tracking-[0.08em] text-game-muted">
                  Rank
                </span>
                <span className="font-mono text-xs font-bold text-game-ink">
                  {researchLevel} <span className="text-game-muted">/</span>{' '}
                  {MAX_RESEARCH_LEVEL}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-[10px] font-black uppercase tracking-widest text-game-muted">
              <div className="flex items-center gap-1.5">
                <div className="h-1 w-1 rounded-full bg-game-moss" />
                <span>EXP Progress</span>
              </div>
              <span className="font-mono text-game-ink">
                {isMaxLevel ? 'Complete' : `${researchXp} / ${nextThreshold}`}
              </span>
            </div>
            <div className="relative h-2 w-full overflow-hidden rounded-full border border-game-border bg-game-canvas">
              <div
                className="h-full bg-game-moss transition-[width] duration-700"
                style={{ width: `${xpProgress}%` }}
              />
            </div>
          </div>

          {activeRewards.length > 0 && (
            <div className="pt-2">
              <span className="mb-2 block text-center text-[10px] font-bold uppercase tracking-widest text-game-muted">
                Unlocked Benefits
              </span>
              <div className="relative">
                <Carousel
                  opts={{
                    align: 'center',
                    loop: true,
                  }}
                  className="mx-auto w-full max-w-[280px]"
                >
                  <div className="flex items-center gap-2">
                    <CarouselPrevious className="!static !h-9 !w-9 !shrink-0 !translate-y-0 border-game-border bg-game-surface-raised text-game-muted hover:text-game-moss" />
                    <div className="min-w-0 flex-1">
                      <CarouselContent>
                        {activeRewards.map(({ level, reward }) => (
                          <CarouselItem key={`${formId}-${level}`}>
                            <div className="flex min-h-[60px] flex-col items-center justify-center rounded-xl border border-game-moss/35 bg-game-moss/10 p-3 text-center">
                              <span className="mb-1 text-[10px] font-black uppercase tracking-[0.08em] text-game-moss-strong">
                                Level {level}
                              </span>
                              <span className="text-[11px] font-bold leading-tight text-game-ink">
                                {reward}
                              </span>
                            </div>
                          </CarouselItem>
                        ))}
                      </CarouselContent>
                    </div>
                    <CarouselNext className="!static !h-9 !w-9 !shrink-0 !translate-y-0 border-game-border bg-game-surface-raised text-game-muted hover:text-game-moss" />
                  </div>
                </Carousel>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

interface PokemonDetailsDialogProps {
  pokemon: Pokemon
  boxes: NonNullable<User['boxes']>
  inventory?: { itemId: string; quantity: number }[]
  trigger?: React.ReactNode
  onRename?: (updatedPokemon: Pokemon) => void
  onRelease?: (pokemonId: string) => void
  defaultOpenUseItem?: boolean
  highlightItemId?: string
}

export function PokemonDetailsDialog({
  pokemon,
  boxes,
  inventory = [],
  trigger,
  onRename,
  onRelease,
  defaultOpenUseItem,
  highlightItemId,
}: PokemonDetailsDialogProps) {
  const { user, gameData, refreshUser } = useUser()
  const router = useRouter()
  const pokemonGender = getOwnedPokemonGender(pokemon)
  const rarityVariant = getPokemonRarityEffect(resolvePokemonRarity(pokemon))
  const pokemonOrigin = formatPokemonOrigin(pokemon)
  const evolutionTimeRegion = resolveEvolutionTimeRegion(pokemon)
  const backgroundUrl = normalizePokemonBackgroundPath(
    (pokemon as any).background,
  )

  const effectiveInventory =
    inventory.length > 0 ? inventory : gameData?.inventory || []
  const effectiveInventoryMap = useMemo(
    () =>
      Object.fromEntries(
        effectiveInventory.map((entry) => [entry.itemId, entry.quantity]),
      ),
    [effectiveInventory],
  )
  const hasItem = (itemId: string) =>
    effectiveInventory.some((i) => i.itemId === itemId && i.quantity > 0)
  const canRenamePokemon = hasItem(DEED_POLL_ITEM_ID)
  const hasStatsScanner = hasItem('stats-scanner')
  const hasIvScanner = hasItem('iv-scanner')
  const hasEvScanner = hasItem('ev-scanner')
  const hasPokeScales = hasItem('poke-scales')
  const hasNatureScanner = hasItem('nature-scanner')

  const handleToggleLock = async () => {
    const result = await toggleLock(pokemon.id)
    if (result.success && onRename) {
      onRename({ ...pokemon, locked: result.locked })
    }
  }

  const handleToggleMarking = async (
    marking: 'Square' | 'Circle' | 'Triangle' | 'Diamond',
  ) => {
    const markingKey = `marking${marking}` as
      | 'markingSquare'
      | 'markingCircle'
      | 'markingTriangle'
      | 'markingDiamond'
    const result = await toggleMarking(pokemon.id, markingKey)
    if (result.success && onRename) {
      onRename({ ...pokemon, [markingKey]: result[markingKey] })
    }
  }

  const handleMoveBox = async (boxId: string) => {
    const targetBoxId = boxId === 'unorganized' ? null : boxId
    const result = await setPokemonRosterRole(pokemon.id, 'box', targetBoxId)
    if (result.success) {
      if (onRename) {
        onRename({
          ...pokemon,
          boxId: targetBoxId,
          onBattleTeam: false,
          battleTeamPosition: null,
          isCompanion: false,
        })
      }
      refreshUser()
    } else {
      toast.error(result.message || 'Could not move Pokemon')
    }
  }

  const [evolutionTarget, setEvolutionTarget] = useState<{
    id: number
    name: string
    shiny: boolean
    formId: string
  } | null>(null)
  const [evolvedPokemon, setEvolvedPokemon] = useState<Pokemon | null>(null)
  const [evolutionRewards, setEvolutionRewards] =
    useState<RewardSummary | null>(null)
  const [isEvolving, setIsEvolving] = useState<number | null>(null)
  const [isOpen, setIsOpen] = useState(false)

  const formInfo = getPokemonForm(pokemon.formId)
  const baseStats = formInfo?.stats
  const trainerLevel = getSkillLevel(user?.skills, 'battling')
  const researcherLevel = getSkillLevel(user?.skills, 'researching')
  const maxAssignableMoves = getResearcherMoveSlotCount(researcherLevel)
  const pokemonResearchProgress = useMemo(
    () =>
      getFormPokedexProgress(
        gameData?.pokedex as any,
        pokemon.speciesId,
        pokemon.formId,
      ),
    [gameData?.pokedex, pokemon.formId, pokemon.speciesId],
  )
  const pokemonResearchLevel = pokemonResearchProgress.researchLevel
  const battleMovesUnlockMessage = getLoadoutUnlockMessage({
    featureName: 'Battle Moves',
    skillName: 'Researcher',
    skillLevel: researcherLevel,
    requiredSkillLevel: RESEARCHER_MOVE_ASSIGN_LEVEL,
    pokemonResearchLevel,
  })
  const heldItemsUnlockMessage = getLoadoutUnlockMessage({
    featureName: 'Held Items',
    skillName: 'Trainer',
    skillLevel: trainerLevel,
    requiredSkillLevel: TRAINER_HELD_ITEM_LEVEL,
    pokemonResearchLevel,
  })
  const canAssignHeldItems =
    !heldItemsUnlockMessage && canUseTrainerHeldItems(trainerLevel)
  const trainerIvCap = getTrainerIvCap(trainerLevel)
  const effectiveIvs = useMemo(
    () => getEffectivePokemonIvs(pokemon.ivs, trainerLevel),
    [pokemon.ivs, trainerLevel],
  )
  const effectiveStats = useMemo(() => {
    if (!baseStats) return pokemon.stats

    const level = pokemon.level || 1
    const evs = pokemon.evs || {
      hp: 0,
      attack: 0,
      defense: 0,
      specialAttack: 0,
      specialDefense: 0,
      speed: 0,
    }
    const nature = NATURES[String(pokemon.nature || '').toLowerCase()] || {}
    const getNatureMultiplier = (stat: string) => {
      if (nature.increased === stat) return 1.1
      if (nature.decreased === stat) return 0.9
      return 1
    }
    const calcHp = () =>
      Math.floor(
        ((2 * baseStats.hp + effectiveIvs.hp + Math.floor((evs.hp || 0) / 4)) *
          level) /
          100,
      ) +
      level +
      10
    const calcOther = (
      stat: 'attack' | 'defense' | 'specialAttack' | 'specialDefense' | 'speed',
      base: number,
    ) =>
      Math.floor(
        (Math.floor(
          ((2 * base + effectiveIvs[stat] + Math.floor((evs[stat] || 0) / 4)) *
            level) /
            100,
        ) +
          5) *
          getNatureMultiplier(stat),
      )

    return {
      hp: calcHp(),
      attack: calcOther('attack', baseStats.attack),
      defense: calcOther('defense', baseStats.defense),
      specialAttack: calcOther('specialAttack', baseStats['special-attack']),
      specialDefense: calcOther('specialDefense', baseStats['special-defense']),
      speed: calcOther('speed', baseStats.speed),
    }
  }, [
    baseStats,
    effectiveIvs,
    pokemon.evs,
    pokemon.level,
    pokemon.nature,
    pokemon.stats,
  ])
  const assignableMoves = useMemo(
    () =>
      getAvailableMoveOptions({
        pokemonTypes: formInfo?.types || [],
        pokemonFormId: pokemon.formId,
        pokemonLevel: pokemon.level,
        inventory: effectiveInventoryMap,
      }),
    [effectiveInventoryMap, formInfo?.types, pokemon.formId, pokemon.level],
  )
  const availablePokemonPowers = useMemo(
    () =>
      getAvailablePokemonPowerOptions({
        pokemonFormId: pokemon.formId,
        inventory: effectiveInventoryMap,
        trainerLevel,
      }),
    [effectiveInventoryMap, pokemon.formId, trainerLevel],
  )
  const heldItemId =
    ((pokemon as any).heldItemId as string | null | undefined) || null
  const currentHeldItem = getHeldItemDefinition(heldItemId)
  const heldItemOptions = useMemo(
    () => getHeldItemOptions(effectiveInventoryMap),
    [effectiveInventoryMap],
  )
  const selectedPokemonPower = normalizeSelectedPokemonPower(
    pokemon.selectedPokemonPower,
  )
  const [isSavingPower, setIsSavingPower] = useState<string | null>(null)
  const [isSavingHeldItem, setIsSavingHeldItem] = useState<string | null>(null)
  const currentAssignedMoveIds = useMemo(
    () => normalizeAssignedMoveIds(pokemon.assignedMoves),
    [pokemon.assignedMoves],
  )
  const [selectedMoveIds, setSelectedMoveIds] = useState<string[]>(
    currentAssignedMoveIds,
  )
  const [isSavingMoves, setIsSavingMoves] = useState(false)

  useEffect(() => {
    setSelectedMoveIds(currentAssignedMoveIds)
  }, [currentAssignedMoveIds, pokemon.id])

  const selectedMovesChanged =
    selectedMoveIds.length !== currentAssignedMoveIds.length ||
    selectedMoveIds.some(
      (moveId, index) => moveId !== currentAssignedMoveIds[index],
    )
  const hasAssignedMoves =
    selectedMoveIds.length > 0 || currentAssignedMoveIds.length > 0

  const handleToggleMoveAssignment = (moveId: string) => {
    setSelectedMoveIds((current) => {
      if (current.includes(moveId)) return current.filter((id) => id !== moveId)
      if (battleMovesUnlockMessage) {
        toast.error(battleMovesUnlockMessage)
        return current
      }
      if (maxAssignableMoves <= 0) {
        toast.error(
          `Researcher Level ${RESEARCHER_MOVE_ASSIGN_LEVEL} required to assign battle moves`,
        )
        return current
      }
      if (current.length >= maxAssignableMoves) {
        toast.error(`Choose up to ${maxAssignableMoves} moves`)
        return current
      }
      return [...current, moveId]
    })
  }

  const handleSelectPokemonPower = async (powerId: PokemonPowerId | null) => {
    if (isSavingPower) return
    setIsSavingPower(powerId || 'none')
    try {
      const result = await setSelectedPokemonPower(pokemon.id, powerId)
      if (result.success) {
        toast.success(
          powerId ? 'Pokemon Power selected' : 'Pokemon Power cleared',
        )
        if (result.pokemon && onRename) onRename(result.pokemon)
      } else {
        toast.error(result.message || 'Could not select Pokemon Power')
      }
    } finally {
      setIsSavingPower(null)
    }
  }

  const handleSelectHeldItem = async (itemId: string | null) => {
    if (isSavingHeldItem !== null) return
    setIsSavingHeldItem(itemId || 'none')
    try {
      const result = await setHeldItem(pokemon.id, itemId)
      if (result.success) {
        toast.success(itemId ? 'Held item set' : 'Held item cleared')
        if (result.pokemon && onRename) onRename(result.pokemon)
        refreshUser()
      } else {
        toast.error(result.message || 'Could not set held item')
      }
    } finally {
      setIsSavingHeldItem(null)
    }
  }

  const handleSaveAssignedMoves = async () => {
    if (isSavingMoves) return
    setIsSavingMoves(true)
    try {
      const result = await setAssignedMoves(pokemon.id, selectedMoveIds)
      if (result.success) {
        toast.success('Moves assigned')
        if (result.pokemon && onRename) onRename(result.pokemon)
      } else {
        toast.error(result.message || 'Could not assign moves')
      }
    } finally {
      setIsSavingMoves(false)
    }
  }

  const handleClearAssignedMoves = async () => {
    if (isSavingMoves || !hasAssignedMoves) return
    setIsSavingMoves(true)
    try {
      const result = await setAssignedMoves(pokemon.id, [])
      if (result.success) {
        setSelectedMoveIds([])
        toast.success('Moves cleared')
        if (result.pokemon && onRename) onRename(result.pokemon)
      } else {
        toast.error(result.message || 'Could not clear moves')
      }
    } finally {
      setIsSavingMoves(false)
    }
  }

  const calculateMaxStat = (statName: 'hp' | 'other', base: number) => {
    const level = 100
    // Max IV = 31, Max EV = 252 (EV/4 = 63)
    if (statName === 'hp') {
      return Math.floor(((2 * base + 31 + 63) * level) / 100) + level + 10
    } else {
      // Nature 1.1
      return Math.floor(
        (Math.floor(((2 * base + 31 + 63) * level) / 100) + 5) * 1.1,
      )
    }
  }

  const panelTrigger = React.isValidElement(trigger) ? (
    trigger
  ) : (
    <Button
      variant="ghost"
      size="icon"
      className="h-10 w-10 text-game-muted hover:bg-game-moss/10 hover:text-game-moss"
      onClick={() => setIsOpen(true)}
    >
      <Info className="h-5 w-5" />
      <span className="sr-only">View Details</span>
    </Button>
  )

  return (
    <>
      <ResponsivePanel
        open={isOpen}
        onOpenChange={setIsOpen}
        trigger={panelTrigger}
        title="Details"
        description={`Pokemon details for ${pokemon.name}`}
        desktopWidth="min(42vw, 620px)"
        mobileHeader={false}
        showHandle={false}
        className="game-paper-first game-paper-background flex max-h-[92dvh] w-full flex-col gap-0 overflow-hidden bg-game-canvas p-0 text-game-ink"
      >
        {/* Fixed Image at Top */}
        <div className="relative -mt-1 aspect-[2/1] w-full flex-shrink-0 overflow-hidden border-b border-game-border">
          {/* Background */}
          {isEvolving ? (
            <div className="absolute inset-0 overflow-hidden bg-[#172733]">
              <Vortex
                backgroundColor="transparent"
                rangeY={800}
                particleCount={500}
                baseHue={170}
                baseSpeed={0.5}
                rangeSpeed={2}
                className="flex items-center justify-center w-full h-full"
              />
            </div>
          ) : (
            <div className="absolute inset-0">
              <Image
                src={backgroundUrl}
                alt="Background"
                fill
                sizes="100vw"
                className={cn(
                  'object-cover opacity-55',
                  pokemon.isShadow &&
                    'shadow-aura grayscale scale-110 opacity-40',
                  pokemon.isRadiant && 'radiant-aura scale-110 opacity-45',
                )}
              />
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(23,39,51,0.04),rgba(239,228,207,0.2)_55%,var(--game-surface)_100%)]" />
            </div>
          )}

          {/* Pokemon Image */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-44 h-44 group/sprite">
              <PokemonRaritySprite
                formId={pokemon.formId}
                view="home"
                rarity={pokemon.rarity}
                shiny={pokemon.shiny}
                isShadow={pokemon.isShadow}
                isRadiant={pokemon.isRadiant}
                female={pokemonGender === 'female'}
                alt={pokemon.name || 'Pokemon'}
                sizes="(max-width: 768px) 100vw, 176px"
                className="h-full w-full"
                imageClassName="relative z-10 drop-shadow-[0_16px_24px_rgba(0,0,0,0.45)]"
              />
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="overflow-y-auto flex-1 min-h-0 custom-scrollbar">
          <div className="flex w-full flex-col items-center gap-6 p-5 md:p-6">
            {/* Name & Form under image */}
            <div className="w-full text-center space-y-2">
              <div className="flex flex-wrap items-center justify-center gap-3">
                <h2 className="font-display text-3xl font-semibold text-game-ink">
                  {pokemon.name}
                </h2>
                <RenameDialog
                  pokemonId={pokemon.id}
                  currentName={pokemon.name || ''}
                  canRename={canRenamePokemon}
                  onRename={onRename}
                />
              </div>

              {/* Form name (small) - show if not base */}
              <div className="flex items-center justify-center gap-3">
                <span className="h-px w-4 bg-game-border" />
                <div className="flex items-center gap-2">
                  {(() => {
                    const formInfo = getPokemonForm(pokemon.formId || '')
                    if (formInfo?.form && formInfo.form !== 'base') {
                      return (
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-game-moss-strong">
                          {formInfo.form}
                        </span>
                      )
                    }
                    return (
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-game-muted">
                        Standard Form
                      </span>
                    )
                  })()}
                  {pokemon.shiny && (
                    <Badge className="h-5 border-game-ochre bg-game-ochre/10 px-2 text-[10px] font-black uppercase leading-none tracking-[0.08em] text-game-ochre">
                      Shiny
                    </Badge>
                  )}
                </div>
                <span className="h-px w-4 bg-game-border" />
              </div>

              <div className="flex flex-col items-center gap-3 pt-2">
                <PokemonTypeChips types={formInfo?.types || []} />
              </div>
            </div>

            {/* Evolution Section */}
            {(() => {
              const possibleEvolutions = EVOLUTIONS[pokemon.speciesId] || []
              if (possibleEvolutions.length === 0) return null

              const isEvolutionReady = (evo: any) => {
                const { conditions } = evo
                const currentFormName = formInfo?.form || 'base'
                if (
                  conditions.requiredSourceForm &&
                  conditions.requiredSourceForm !== currentFormName
                )
                  return false
                if (!matchesEvolutionGender(conditions, pokemonGender))
                  return false
                if (
                  !matchesEvolutionTimeOfDayForRegion(
                    conditions,
                    evolutionTimeRegion,
                  )
                )
                  return false
                let requiredItemId =
                  conditions.itemId || (conditions.trade ? 'link-cable' : null)
                if (conditions.locationId) requiredItemId = 'evolution-compass'
                else if (conditions.knownMoveId) requiredItemId = 'charged-tm'
                else if (conditions.heldItem)
                  requiredItemId = conditions.heldItem
                const hasRequiredItem = requiredItemId
                  ? hasItem(requiredItemId)
                  : true
                if (!hasRequiredItem) return false
                const canEvolveLevel = conditions.minLevel
                  ? (pokemon.level || 1) >= conditions.minLevel
                  : true
                if (!canEvolveLevel) return false
                const canEvolveFriendship = conditions.minHappiness
                  ? ((pokemon as any).friendship || 0) >=
                    conditions.minHappiness
                  : true
                if (!canEvolveFriendship) return false
                return true
              }

              const anyReady = possibleEvolutions.some(isEvolutionReady)
              if (!anyReady) return null

              return (
                <div className="w-full max-w-md space-y-4">
                  <SectionDivider className="uppercase tracking-[0.2em] font-black text-[10px]">
                    Evolution Detected
                  </SectionDivider>
                  <div className="grid gap-3">
                    {possibleEvolutions.map((evo) => {
                      const { conditions } = evo
                      const pokedex = (gameData?.pokedex || []) as any[]
                      const hasSeenEvo =
                        Array.isArray(pokedex) &&
                        pokedex.some(
                          (p) =>
                            p.speciesId === evo.speciesId &&
                            (p.seen || p.caught),
                        )
                      const evoName = hasSeenEvo ? evo.name : '???'
                      const currentFormName = formInfo?.form || 'base'
                      if (
                        conditions.requiredSourceForm &&
                        conditions.requiredSourceForm !== currentFormName
                      )
                        return null
                      if (!matchesEvolutionGender(conditions, pokemonGender))
                        return null
                      const timeConditionMet =
                        matchesEvolutionTimeOfDayForRegion(
                          conditions,
                          evolutionTimeRegion,
                        )
                      let requiredItemId =
                        conditions.itemId ||
                        (conditions.trade ? 'link-cable' : null)
                      if (conditions.locationId)
                        requiredItemId = 'evolution-compass'
                      else if (conditions.knownMoveId)
                        requiredItemId = 'charged-tm'
                      else if (conditions.heldItem)
                        requiredItemId = conditions.heldItem
                      const hasRequiredItem = requiredItemId
                        ? hasItem(requiredItemId)
                        : true
                      const canEvolveLevel = conditions.minLevel
                        ? (pokemon.level || 1) >= conditions.minLevel
                        : true
                      const canEvolveFriendship = conditions.minHappiness
                        ? ((pokemon as any).friendship || 0) >=
                          conditions.minHappiness
                        : true
                      const timeRequirementLabel = conditions.timeOfDay
                        ? `${getEvolutionTimeOfDayLabel(
                            conditions.timeOfDay,
                          )} (${getEvolutionTimeRegionLabel(
                            evolutionTimeRegion,
                          )})`
                        : ''
                      const canEvolve =
                        canEvolveLevel &&
                        canEvolveFriendship &&
                        hasRequiredItem &&
                        timeConditionMet
                      let requirementText = ''
                      if (conditions.minLevel) {
                        requirementText = `Level ${conditions.minLevel}`
                        if (conditions.timeOfDay) {
                          requirementText += ` (${timeRequirementLabel})`
                        }
                      } else if (requiredItemId) {
                        const iDef = items.find((i) => i.id === requiredItemId)
                        requirementText = `Use ${iDef?.name || requiredItemId}`
                        if (conditions.timeOfDay) {
                          requirementText += ` (${timeRequirementLabel})`
                        }
                      } else if (conditions.minHappiness) {
                        requirementText = `High Friendship`
                        if (conditions.timeOfDay) {
                          requirementText += ` (${timeRequirementLabel})`
                        }
                      } else if (conditions.timeOfDay) {
                        requirementText = timeRequirementLabel
                      } else requirementText = 'Unknown Condition'

                      const handleEvolution = async () => {
                        if (!canEvolve) return
                        setIsEvolving(evo.speciesId)
                        setEvolutionTarget({
                          id: evo.speciesId,
                          name: evo.name,
                          formId: evo.name,
                          shiny: !!pokemon.shiny,
                        })
                        try {
                          const result = await evolvePokemon(
                            pokemon.id,
                            evo.speciesId,
                            requiredItemId || undefined,
                          )
                          if (result.success) {
                            setEvolutionTarget({
                              id: result.newSpeciesId || evo.speciesId,
                              name: evo.name,
                              shiny: !!pokemon.shiny,
                              formId:
                                result.newFormId ||
                                result.newSpeciesId?.toString() ||
                                evo.name,
                            })
                            if (result.pokemon)
                              setEvolvedPokemon(result.pokemon)
                            if (result.rewards)
                              setEvolutionRewards(
                                result.rewards as RewardSummary,
                              )
                          } else {
                            toast.error(result.message || 'Evolution failed')
                            setEvolutionTarget(null)
                          }
                        } catch (error: any) {
                          toast.error(
                            error instanceof Error
                              ? error.message
                              : 'Evolution failed',
                          )
                          setEvolutionTarget(null)
                        } finally {
                          setIsEvolving(null)
                        }
                      }

                      const isBtnLoading = isEvolving === evo.speciesId

                      return (
                        <div
                          key={evo.speciesId}
                          className="relative overflow-hidden rounded-2xl border border-game-ochre/40 bg-game-surface-raised p-4 shadow-sm"
                        >
                          <div className="absolute right-0 top-0 p-3 opacity-[0.08]">
                            <Sparkles className="h-12 w-12 rotate-12 text-game-ochre" />
                          </div>
                          <div className="relative z-10 flex flex-col gap-3">
                            <div className="flex items-center justify-between">
                              <span className="font-display text-base font-semibold text-game-ink">
                                {evoName}
                              </span>
                              <span className="text-right font-mono text-[10px] font-bold uppercase leading-tight tracking-widest text-game-muted">
                                {requirementText}
                              </span>
                            </div>
                            <div className="relative">
                              <Button
                                onClick={handleEvolution}
                                disabled={!canEvolve || isBtnLoading}
                                className={cn(
                                  'relative h-11 w-full gap-3 rounded-xl transition-colors',
                                  canEvolve
                                    ? 'bg-game-clay text-game-cream hover:bg-game-clay/90'
                                    : 'cursor-not-allowed border border-game-border bg-game-canvas text-game-muted',
                                )}
                              >
                                {isBtnLoading ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <div
                                    className={cn(
                                      'h-1.5 w-1.5 rounded-full',
                                      canEvolve
                                        ? 'bg-game-surface-raised'
                                        : 'bg-game-muted',
                                    )}
                                  />
                                )}
                                <span className="text-[10px] font-black uppercase tracking-widest">
                                  {canEvolve ? 'Evolve now' : 'Not ready'}
                                </span>
                              </Button>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })()}

            <div className="w-full max-w-md space-y-4">
              <div className="space-y-4 rounded-2xl border border-game-border bg-game-surface-raised p-4 shadow-sm">
                <div className="space-y-1.5">
                  <span className="block px-1 text-[10px] font-bold uppercase tracking-widest text-game-muted">
                    Active Box
                  </span>
                  <Select
                    defaultValue={pokemon.boxId || 'unorganized'}
                    onValueChange={handleMoveBox}
                  >
                    <SelectTrigger className="h-11 w-full rounded-xl border-game-border bg-game-surface-raised text-xs font-bold text-game-ink hover:border-game-moss">
                      <SelectValue placeholder="Select Box" />
                    </SelectTrigger>
                    <SelectContent className="border-game-border bg-game-surface text-game-ink">
                      <SelectItem
                        value="unorganized"
                        className="focus:bg-game-moss/10 focus:text-game-moss-strong"
                      >
                        Unorganized
                      </SelectItem>
                      {boxes.map((box) => (
                        <SelectItem
                          key={box.id}
                          value={box.id!}
                          className="focus:bg-game-moss/10 focus:text-game-moss-strong"
                        >
                          {box.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Markings */}
                <div className="flex w-full justify-between gap-1 pt-2">
                  <MarkingButton
                    active={pokemon.markingSquare || false}
                    onClick={() => handleToggleMarking('Square')}
                    icon={Square}
                    color="text-game-moss"
                    title="Toggle square marking"
                  />
                  <MarkingButton
                    active={pokemon.markingCircle || false}
                    onClick={() => handleToggleMarking('Circle')}
                    icon={Circle}
                    color="text-game-danger"
                    title="Toggle circle marking"
                  />
                  <MarkingButton
                    active={pokemon.markingTriangle || false}
                    onClick={() => handleToggleMarking('Triangle')}
                    icon={Triangle}
                    color="text-game-moss-strong"
                    title="Toggle triangle marking"
                  />
                  <MarkingButton
                    active={pokemon.markingDiamond || false}
                    onClick={() => handleToggleMarking('Diamond')}
                    icon={Diamond}
                    color="text-game-ochre"
                    title="Toggle diamond marking"
                  />
                  <div className="mx-0.5 h-8 w-px shrink-0 bg-game-border" />
                  <MarkingButton
                    active={pokemon.locked || false}
                    onClick={handleToggleLock}
                    icon={Lock}
                    color="text-game-danger"
                    title={pokemon.locked ? 'Locked' : 'Lock'}
                  />
                </div>
              </div>
            </div>

            {/* Status Board */}
            <div className="w-full max-w-md space-y-4">
              <div className="grid grid-cols-2 gap-3">
                {[
                  {
                    label: 'Level',
                    value: pokemon.level,
                    icon: Swords,
                    color: 'game-moss',
                  },
                  {
                    label: 'Variant',
                    value: rarityVariant.label,
                    icon: Info,
                    color: 'game-moss',
                  },
                  {
                    label: 'Nature',
                    value: hasNatureScanner ? pokemon.nature : '???',
                    icon: Info,
                    color: 'game-moss',
                  },
                  {
                    label: 'Size',
                    value: hasPokeScales ? pokemon.size || '-' : '???',
                    icon: Info,
                    color: 'game-moss',
                  },
                  {
                    label: 'Gender',
                    value: pokemonGender,
                    icon: Info,
                    color: 'game-moss',
                  },
                  {
                    label: 'Friendship',
                    value: hasStatsScanner
                      ? ((pokemon as any).friendship ?? 70)
                      : '???',
                    icon: Info,
                    color: 'game-moss',
                  },
                ].map((item, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-game-border bg-game-surface-raised p-4"
                  >
                    <span className="mb-1 block text-[10px] font-extrabold uppercase leading-none tracking-widest text-game-moss-strong">
                      {item.label}
                    </span>
                    <span className="font-display text-base font-semibold text-game-ink">
                      {item.value}
                    </span>
                  </div>
                ))}

                <div className="rounded-2xl border border-game-border bg-game-surface-raised p-4">
                  <span className="mb-2 block text-[10px] font-extrabold uppercase leading-none tracking-widest text-game-moss-strong">
                    Ball
                  </span>
                  <div className="flex items-center gap-2">
                    <ItemSprite
                      itemId={pokemon.ballType || 'poke-ball'}
                      alt={pokemon.ballType || 'Poke Ball'}
                      width={20}
                      height={20}
                      className="object-contain drop-shadow-md"
                    />
                    <span className="truncate text-xs font-bold capitalize tracking-tight text-game-ink">
                      {pokemon.ballType?.replace(/-/g, ' ') || 'Poke Ball'}
                    </span>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-game-border bg-game-surface-raised p-4">
                  <span className="mb-1 block text-[10px] font-extrabold uppercase leading-none tracking-widest text-game-moss-strong">
                    Trainer
                  </span>
                  <span className="block truncate text-xs font-bold tracking-tight text-game-ink">
                    {typeof pokemon.originalTrainer === 'object'
                      ? pokemon.originalTrainer.trainerName || 'Unknown'
                      : pokemon.originalTrainer === user?.id
                        ? user?.trainerName || 'Unknown'
                        : 'Unknown'}
                  </span>
                </div>

                <div className="col-span-2 overflow-hidden rounded-2xl border border-game-border bg-game-surface-raised p-4">
                  <span className="mb-1 block text-[10px] font-extrabold uppercase leading-none tracking-widest text-game-moss-strong">
                    Origin
                  </span>
                  <span className="block truncate font-display text-sm font-semibold text-game-ink">
                    {pokemonOrigin.title}
                  </span>
                  {pokemonOrigin.subtitle && (
                    <span className="mt-1 block truncate text-xs font-bold tracking-tight text-game-muted">
                      {pokemonOrigin.subtitle}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full max-w-md space-y-4">
              <SectionDivider className="uppercase tracking-[0.2em] font-black text-[10px]">
                Held Item
              </SectionDivider>
              <div className="space-y-4 rounded-2xl border border-game-border bg-game-surface-raised p-4 shadow-sm">
                {heldItemsUnlockMessage ? (
                  <div className="rounded-xl border border-game-border bg-game-surface-raised px-4 py-3 text-xs text-game-muted">
                    {heldItemsUnlockMessage}
                  </div>
                ) : (
                  <>
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex min-w-0 items-center gap-3">
                        {currentHeldItem && (
                          <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl border border-game-border bg-game-surface-raised">
                            <ItemSprite
                              itemId={currentHeldItem.id}
                              alt={currentHeldItem.name}
                              width={34}
                              height={34}
                              className="object-contain drop-shadow-md"
                            />
                          </div>
                        )}
                        <div className="min-w-0">
                          <div className="truncate text-[10px] font-black uppercase tracking-widest text-game-moss-strong">
                            {currentHeldItem
                              ? currentHeldItem.name
                              : 'No Held Item'}
                          </div>
                          <div className="text-[11px] font-medium text-game-muted">
                            Reserved from your Bag while held
                          </div>
                        </div>
                      </div>
                      {currentHeldItem && (
                        <Button
                          type="button"
                          onClick={() => handleSelectHeldItem(null)}
                          disabled={isSavingHeldItem !== null}
                          variant="outline"
                          className="h-10 w-10 rounded-xl border-game-border bg-game-surface-raised p-0 text-game-muted hover:border-game-clay hover:text-game-clay-strong"
                          title="Clear held item"
                          aria-label="Clear held item"
                        >
                          {isSavingHeldItem === 'none' ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <ItemSprite
                              itemId={currentHeldItem.id}
                              alt={currentHeldItem.name}
                              width={30}
                              height={30}
                              className="object-contain drop-shadow-md opacity-70"
                            />
                          )}
                        </Button>
                      )}
                    </div>

                    {heldItemOptions.length === 0 ? (
                      <div
                        className="rounded-xl border border-dashed border-game-border bg-game-surface-raised px-4 py-3 text-xs text-game-muted"
                        role="status"
                        aria-live="polite"
                      >
                        No items available.
                      </div>
                    ) : (
                      <div className="grid gap-2 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                        {heldItemOptions.map((item) => {
                          const selected = heldItemId === item.id
                          const saving = isSavingHeldItem === item.id
                          const quantity = effectiveInventoryMap[item.id] || 0
                          const skillLockReason = getItemSkillLockReason(
                            item,
                            user?.skills,
                          )
                          const itemLocked = Boolean(skillLockReason)

                          return (
                            <button
                              key={item.id}
                              type="button"
                              onClick={() => handleSelectHeldItem(item.id)}
                              disabled={
                                isSavingHeldItem !== null ||
                                selected ||
                                !canAssignHeldItems ||
                                itemLocked
                              }
                              className={cn(
                                'min-h-16 w-full rounded-xl border px-3 py-2 text-left transition-all flex items-center gap-3',
                                selected
                                  ? 'border-game-moss bg-game-moss/10 text-game-ink'
                                  : 'border-game-border bg-game-surface-raised text-game-ink hover:border-game-moss',
                                isSavingHeldItem !== null &&
                                  'opacity-60 cursor-wait',
                                (!canAssignHeldItems || itemLocked) &&
                                  'cursor-not-allowed opacity-45 hover:border-game-border',
                              )}
                            >
                              <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center">
                                <ItemSprite
                                  itemId={item.id}
                                  alt={item.name}
                                  width={40}
                                  height={40}
                                  className="object-contain drop-shadow-md"
                                />
                                {selected && (
                                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-game-moss text-game-cream">
                                    <Check className="h-3 w-3" />
                                  </span>
                                )}
                              </div>
                              <div className="min-w-0 flex-1">
                                <div className="flex items-center gap-2">
                                  <span className="truncate text-sm font-black uppercase tracking-tight">
                                    {item.name}
                                  </span>
                                  <span className="rounded-full border border-game-border bg-game-canvas px-2 py-0.5 text-[10px] font-bold text-game-muted">
                                    x{quantity}
                                  </span>
                                  {saving && (
                                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                                  )}
                                </div>
                                <div className="mt-1 line-clamp-2 text-[11px] leading-snug text-game-muted">
                                  {skillLockReason ||
                                    formatHeldItemTrigger(item)}
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>

            {availablePokemonPowers.length > 0 && (
              <div className="w-full max-w-md space-y-4">
                <SectionDivider className="uppercase tracking-[0.2em] font-black text-[10px]">
                  Pokemon Power
                </SectionDivider>
                <div className="space-y-4 rounded-2xl border border-game-border bg-game-surface-raised p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="text-[10px] font-black uppercase tracking-widest text-game-ochre">
                        {selectedPokemonPower
                          ? POKEMON_POWER_OPTIONS[selectedPokemonPower].name
                          : 'No Power Selected'}
                      </div>
                      <div className="text-[11px] font-medium text-game-muted">
                        Only this Pokemon Power can be used in battle
                      </div>
                    </div>
                    {selectedPokemonPower && (
                      <Button
                        type="button"
                        onClick={() => handleSelectPokemonPower(null)}
                        disabled={isSavingPower !== null}
                        variant="outline"
                        className="h-10 rounded-xl border-game-border bg-game-surface-raised text-[10px] font-black uppercase tracking-widest text-game-muted hover:border-game-clay hover:text-game-clay-strong"
                      >
                        Clear
                      </Button>
                    )}
                  </div>

                  <div className="grid gap-2">
                    {availablePokemonPowers.map((power) => {
                      const selected = selectedPokemonPower === power.id
                      const saving = isSavingPower === power.id
                      return (
                        <button
                          key={power.id}
                          type="button"
                          onClick={() => handleSelectPokemonPower(power.id)}
                          disabled={isSavingPower !== null || selected}
                          aria-pressed={selected}
                          className={cn(
                            'min-h-16 w-full rounded-xl border px-3 py-2 text-left transition-all flex items-center gap-3',
                            selected
                              ? 'border-game-ochre bg-game-ochre/10 text-game-ink'
                              : 'border-game-border bg-game-surface-raised text-game-ink hover:border-game-ochre',
                            isSavingPower !== null && 'opacity-60 cursor-wait',
                          )}
                        >
                          <PokemonPowerIcon
                            powerId={power.id}
                            className="h-9 w-9"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2">
                              <span className="truncate text-sm font-black uppercase tracking-tight">
                                {power.name}
                              </span>
                              {selected && (
                                <Check className="h-3.5 w-3.5 text-game-ochre" />
                              )}
                              {saving && (
                                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              )}
                            </div>
                            <div className="mt-1 line-clamp-2 text-[11px] leading-snug text-game-muted">
                              {power.description}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* Battle Moves Section */}
            <div className="w-full max-w-md space-y-4">
              <SectionDivider className="uppercase tracking-[0.2em] font-black text-[10px]">
                Battle Moves
              </SectionDivider>
              <div className="space-y-4 rounded-2xl border border-game-border bg-game-surface-raised p-4 shadow-sm">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-game-moss-strong">
                      {battleMovesUnlockMessage
                        ? 'Locked'
                        : `Assigned ${selectedMoveIds.length}/${maxAssignableMoves}`}
                    </div>
                    <div className="text-[11px] font-medium text-game-muted">
                      {battleMovesUnlockMessage
                        ? 'Battle Moves unavailable'
                        : maxAssignableMoves > 0
                          ? `Researcher level allows ${maxAssignableMoves} assigned move${
                              maxAssignableMoves === 1 ? '' : 's'
                            }`
                          : `Researcher Level ${RESEARCHER_MOVE_ASSIGN_LEVEL} required`}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      type="button"
                      onClick={handleClearAssignedMoves}
                      disabled={isSavingMoves || !hasAssignedMoves}
                      variant="outline"
                      size="icon"
                      className="h-10 w-10 rounded-xl border-game-border bg-game-surface-raised text-game-muted hover:border-game-clay hover:bg-game-clay/10 hover:text-game-clay-strong"
                      title="Clear assigned moves"
                    >
                      {isSavingMoves ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        <Trash2 className="w-3.5 h-3.5" />
                      )}
                      <span className="sr-only">Clear assigned moves</span>
                    </Button>
                    <Button
                      type="button"
                      onClick={handleSaveAssignedMoves}
                      disabled={
                        Boolean(battleMovesUnlockMessage) ||
                        !selectedMovesChanged ||
                        isSavingMoves ||
                        (maxAssignableMoves <= 0 && selectedMoveIds.length > 0)
                      }
                      className="h-10 rounded-xl bg-game-clay text-[10px] font-black uppercase tracking-widest text-game-cream hover:bg-game-clay/90 disabled:bg-game-canvas disabled:text-game-muted"
                    >
                      {isSavingMoves ? (
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      ) : (
                        'Save'
                      )}
                    </Button>
                  </div>
                </div>

                {battleMovesUnlockMessage ? (
                  <div className="rounded-xl border border-game-border bg-game-surface-raised px-4 py-3 text-xs text-game-muted">
                    {battleMovesUnlockMessage}
                  </div>
                ) : assignableMoves.length === 0 ? (
                  <div
                    className="rounded-xl border border-dashed border-game-border bg-game-surface-raised px-4 py-3 text-xs text-game-muted"
                    role="status"
                    aria-live="polite"
                  >
                    No eligible owned TMs/HMs.
                  </div>
                ) : (
                  <div className="grid gap-2 max-h-72 overflow-y-auto pr-1 custom-scrollbar">
                    {assignableMoves.map((move) => {
                      const selected = selectedMoveIds.includes(move.id)
                      const disabled =
                        maxAssignableMoves <= 0 ||
                        (!selected &&
                          selectedMoveIds.length >= maxAssignableMoves)
                      const moveType =
                        (move.forcedType && move.forcedType !== 'random'
                          ? move.forcedType.toLowerCase()
                          : undefined) || 'normal'

                      return (
                        <button
                          key={move.id}
                          type="button"
                          onClick={() => handleToggleMoveAssignment(move.id)}
                          disabled={disabled}
                          className={cn(
                            'min-h-16 w-full rounded-xl border px-3 py-2 text-left transition-all flex items-center gap-3',
                            selected
                              ? 'border-game-moss bg-game-moss/10 text-game-ink'
                              : 'border-game-border bg-game-surface-raised text-game-ink hover:border-game-moss',
                            disabled &&
                              'cursor-not-allowed opacity-45 hover:border-game-border',
                          )}
                        >
                          <div className="relative flex h-10 w-10 flex-shrink-0 items-center justify-center">
                            <ItemSprite
                              itemId={`tm-${moveType}`}
                              alt={moveType}
                              width={40}
                              height={40}
                              className="object-contain drop-shadow-md"
                            />
                            {selected && (
                              <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-game-moss text-game-cream">
                                <Check className="h-3 w-3" />
                              </span>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5">
                              {move.stance === 'power' && (
                                <StanceIcon
                                  stance="power"
                                  className="h-3.5 w-3.5 text-game-danger"
                                />
                              )}
                              {move.stance === 'speed' && (
                                <StanceIcon
                                  stance="speed"
                                  className="h-3.5 w-3.5 text-game-moss-strong"
                                />
                              )}
                              {move.stance === 'tech' && (
                                <StanceIcon
                                  stance="tech"
                                  className="h-3.5 w-3.5 text-game-ochre-strong"
                                />
                              )}
                              {move.stance === 'random' && (
                                <StanceIcon
                                  stance="random"
                                  className="h-3.5 w-3.5 text-game-ochre"
                                />
                              )}
                              <span className="truncate text-sm font-black uppercase tracking-tight">
                                {move.name}
                              </span>
                            </div>
                            <div className="mt-1 flex flex-wrap gap-1">
                              <span className="rounded-full border border-game-border bg-game-canvas px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-game-muted">
                                Power {formatAssignedMovePower(move.damage)}
                              </span>
                              <span className="rounded-full border border-game-border bg-game-canvas px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-game-muted">
                                Lv {move.level}
                              </span>
                            </div>
                            <div className="mt-1 line-clamp-2 text-[11px] leading-snug text-game-muted">
                              {move.description}
                            </div>
                          </div>
                        </button>
                      )
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Ability Section */}
            {(() => {
              const abilityId = (pokemon as any).ability
              const ability = abilityId ? ABILITIES[abilityId] : null
              if (!ability) return null
              const partnerEffects = getAbilityDexPartnerEffectLines(ability)
              return (
                <div className="w-full max-w-md space-y-4">
                  <SectionDivider className="uppercase tracking-[0.2em] font-black text-[10px]">
                    Intrinsic Ability
                  </SectionDivider>
                  <div className="relative overflow-hidden rounded-2xl border border-game-border bg-game-surface-raised p-5 shadow-sm">
                    <div className="absolute right-0 top-0 p-4 opacity-[0.07]">
                      <Info className="h-12 w-12 rotate-12 text-game-moss" />
                    </div>
                    <div className="relative z-10 space-y-2">
                      <div className="font-display text-lg font-semibold text-game-ink">
                        {ability.name}
                      </div>
                      <div className="text-[11px] font-medium leading-relaxed text-game-muted">
                        {ability.description}
                      </div>
                      {partnerEffects.length > 0 && (
                        <div className="mt-4 border-t border-game-border pt-4">
                          <div className="mb-2 text-[10px] font-black uppercase tracking-[0.14em] text-game-moss-strong">
                            Partner Effect
                          </div>
                          <ul className="space-y-1.5">
                            {partnerEffects.map((effect) => (
                              <li
                                key={effect.id}
                                className="text-[11px] font-medium leading-relaxed text-game-ink"
                              >
                                {effect.text}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })()}

            {/* Stats Carousel */}
            <div className="w-full max-w-md space-y-4">
              <div
                className="relative overflow-hidden rounded-3xl border border-game-border bg-game-surface-raised p-6 shadow-sm"
                data-vaul-no-drag
              >
                <Carousel className="w-full max-w-[280px] mx-auto">
                  <CarouselContent className="-ml-0">
                    {/* Base Stats */}
                    <CarouselItem className="pl-0">
                      <div className="mb-6 text-center text-[10px] font-black uppercase tracking-[0.3em] text-game-moss-strong">
                        Pokemon Stats
                      </div>
                      <div className="space-y-3.5">
                        {hasStatsScanner ? (
                          <>
                            <StatBar
                              label="HP"
                              value={effectiveStats?.hp ?? 0}
                              max={calculateMaxStat('hp', baseStats?.hp ?? 0)}
                              color="bg-game-danger"
                            />
                            <StatBar
                              label="ATK"
                              value={effectiveStats?.attack ?? 0}
                              max={calculateMaxStat(
                                'other',
                                baseStats?.attack ?? 0,
                              )}
                              color="bg-game-clay"
                            />
                            <StatBar
                              label="DEF"
                              value={effectiveStats?.defense ?? 0}
                              max={calculateMaxStat(
                                'other',
                                baseStats?.defense ?? 0,
                              )}
                              color="bg-game-ochre"
                            />
                            <StatBar
                              label="SPA"
                              value={effectiveStats?.specialAttack ?? 0}
                              max={calculateMaxStat(
                                'other',
                                baseStats?.['special-attack'] ?? 0,
                              )}
                              color="bg-game-moss"
                            />
                            <StatBar
                              label="SPD"
                              value={effectiveStats?.specialDefense ?? 0}
                              max={calculateMaxStat(
                                'other',
                                baseStats?.['special-defense'] ?? 0,
                              )}
                              color="bg-game-moss-strong"
                            />
                            <StatBar
                              label="SPE"
                              value={effectiveStats?.speed ?? 0}
                              max={calculateMaxStat(
                                'other',
                                baseStats?.speed ?? 0,
                              )}
                              color="bg-game-clay-strong"
                            />
                          </>
                        ) : (
                          <>
                            <ObfuscatedStatBar label="HP" color="bg-game-danger" />
                            <ObfuscatedStatBar
                              label="ATK"
                              color="bg-game-clay"
                            />
                            <ObfuscatedStatBar
                              label="DEF"
                              color="bg-game-ochre"
                            />
                            <ObfuscatedStatBar
                              label="SPA"
                              color="bg-game-moss"
                            />
                            <ObfuscatedStatBar
                              label="SPD"
                              color="bg-game-moss-strong"
                            />
                            <ObfuscatedStatBar
                              label="SPE"
                              color="bg-game-clay-strong"
                            />
                          </>
                        )}
                      </div>
                    </CarouselItem>

                    {/* EVs */}
                    <CarouselItem className="pl-0">
                      <div className="mb-6 text-center text-[10px] font-black uppercase tracking-[0.3em] text-game-moss-strong">
                        Effort Values
                      </div>
                      <div className="space-y-3.5">
                        {hasEvScanner ? (
                          <>
                            <StatBar
                              label="HP"
                              value={pokemon.evs?.hp ?? 0}
                              max={255}
                              color="bg-game-danger"
                            />
                            <StatBar
                              label="ATK"
                              value={pokemon.evs?.attack ?? 0}
                              max={255}
                              color="bg-game-clay"
                            />
                            <StatBar
                              label="DEF"
                              value={pokemon.evs?.defense ?? 0}
                              max={255}
                              color="bg-game-ochre"
                            />
                            <StatBar
                              label="SPA"
                              value={pokemon.evs?.specialAttack ?? 0}
                              max={255}
                              color="bg-game-moss"
                            />
                            <StatBar
                              label="SPD"
                              value={pokemon.evs?.specialDefense ?? 0}
                              max={255}
                              color="bg-game-moss-strong"
                            />
                            <StatBar
                              label="SPE"
                              value={pokemon.evs?.speed ?? 0}
                              max={255}
                              color="bg-game-clay-strong"
                            />
                          </>
                        ) : (
                          <>
                            <ObfuscatedStatBar label="HP" color="bg-game-danger" />
                            <ObfuscatedStatBar
                              label="ATK"
                              color="bg-game-clay"
                            />
                            <ObfuscatedStatBar
                              label="DEF"
                              color="bg-game-ochre"
                            />
                            <ObfuscatedStatBar
                              label="SPA"
                              color="bg-game-moss"
                            />
                            <ObfuscatedStatBar
                              label="SPD"
                              color="bg-game-moss-strong"
                            />
                            <ObfuscatedStatBar
                              label="SPE"
                              color="bg-game-clay-strong"
                            />
                          </>
                        )}
                      </div>
                    </CarouselItem>

                    {/* IVs */}
                    <CarouselItem className="pl-0">
                      <div className="mb-6 text-center text-[10px] font-black uppercase tracking-[0.3em] text-game-moss-strong">
                        Effective IVs (Cap {trainerIvCap})
                      </div>
                      <div className="space-y-3.5">
                        {hasIvScanner ? (
                          <>
                            <StatBar
                              label="HP"
                              value={effectiveIvs.hp}
                              max={31}
                              color="bg-game-danger"
                            />
                            <StatBar
                              label="ATK"
                              value={effectiveIvs.attack}
                              max={31}
                              color="bg-game-clay"
                            />
                            <StatBar
                              label="DEF"
                              value={effectiveIvs.defense}
                              max={31}
                              color="bg-game-ochre"
                            />
                            <StatBar
                              label="SPA"
                              value={effectiveIvs.specialAttack}
                              max={31}
                              color="bg-game-moss"
                            />
                            <StatBar
                              label="SPD"
                              value={effectiveIvs.specialDefense}
                              max={31}
                              color="bg-game-moss-strong"
                            />
                            <StatBar
                              label="SPE"
                              value={effectiveIvs.speed}
                              max={31}
                              color="bg-game-clay-strong"
                            />
                          </>
                        ) : (
                          <>
                            <ObfuscatedStatBar label="HP" color="bg-game-danger" />
                            <ObfuscatedStatBar
                              label="ATK"
                              color="bg-game-clay"
                            />
                            <ObfuscatedStatBar
                              label="DEF"
                              color="bg-game-ochre"
                            />
                            <ObfuscatedStatBar
                              label="SPA"
                              color="bg-game-moss"
                            />
                            <ObfuscatedStatBar
                              label="SPD"
                              color="bg-game-moss-strong"
                            />
                            <ObfuscatedStatBar
                              label="SPE"
                              color="bg-game-clay-strong"
                            />
                          </>
                        )}
                      </div>
                    </CarouselItem>
                  </CarouselContent>
                  <div className="hidden sm:block">
                    <CarouselPrevious className="-left-6 border-game-border bg-game-surface-raised text-game-muted hover:text-game-moss" />
                    <CarouselNext className="-right-6 border-game-border bg-game-surface-raised text-game-muted hover:text-game-moss" />
                  </div>
                </Carousel>
              </div>
            </div>

            <ResearchSection
              formId={pokemon.formId}
              researchXp={pokemonResearchProgress.researchXp}
              researchLevel={pokemonResearchProgress.researchLevel}
            />
          </div>
        </div>

        {/* Fixed Use Item at Bottom */}
        <div className="relative flex-shrink-0 border-t border-game-border bg-game-surface-raised p-6">
          <div className="w-full max-w-md mx-auto">
            <UseItemDialog
              pokemon={pokemon}
              onUpdate={onRename}
              fullWidth
              defaultOpen={defaultOpenUseItem}
              highlightItemId={highlightItemId}
            />
          </div>
        </div>
      </ResponsivePanel>

      {/* Evolution Rewards Dialog */}
      <Dialog
        open={!!evolutionRewards && !evolutionTarget}
        onOpenChange={(open) => !open && setEvolutionRewards(null)}
      >
        <DialogContent className="max-w-sm overflow-hidden rounded-xl border-game-border bg-game-surface p-0 text-game-ink">
          <DialogTitle className="sr-only">Research Progress</DialogTitle>
          <div className="p-6 pb-0">
            <h2 className="text-center font-display text-2xl font-bold tracking-tight text-game-ink">
              Research Progress
            </h2>
          </div>
          <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
            {evolutionRewards && (
              <RewardSummaryDisplay summary={evolutionRewards} title="" />
            )}
          </div>
          <DialogFooter className="p-6 pt-2">
            <Button
              onClick={() => setEvolutionRewards(null)}
              className="w-full bg-game-clay font-bold uppercase tracking-widest text-game-cream hover:bg-game-clay/90"
            >
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Evolution Overlay */}
      {evolutionTarget &&
        (() => {
          const target = evolutionTarget
          return (
            <EvolutionOverlay
              pokemonName={pokemon.name || 'Pokemon'}
              oldFormattedStart={getPokemonImageUrl(
                pokemon.formId,
                'home',
                !!pokemon.shiny,
                pokemonGender,
              )}
              newFormattedEnd={getPokemonImageUrl(
                target.formId,
                'home',
                target.shiny,
              )}
              onComplete={() => {
                setEvolutionTarget(null)
                setIsOpen(false)
                router.refresh()
                refreshUser()
                if (evolvedPokemon && onRename) {
                  onRename(evolvedPokemon)
                }
              }}
            />
          )
        })()}
    </>
  )
}

function EvolutionOverlay({
  pokemonName,
  oldFormattedStart,
  newFormattedEnd,
  onComplete,
}: {
  pokemonName: string
  oldFormattedStart: string
  newFormattedEnd: string
  onComplete: () => void
}) {
  const [phase, setPhase] = useState<'start' | 'flash' | 'reveal' | 'done'>(
    'start',
  )

  useEffect(() => {
    const t1 = setTimeout(() => setPhase('flash'), 2000)
    const t2 = setTimeout(() => setPhase('reveal'), 2500)
    const t3 = setTimeout(() => setPhase('done'), 5500)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  return (
    <Dialog open={true}>
      <DialogContent
        showCloseButton={false}
        className="fixed !left-0 !top-0 inset-0 z-[100] m-0 flex h-[100dvh] w-screen max-w-none !translate-x-0 !translate-y-0 flex-col items-center justify-center gap-0 rounded-none border-none bg-[#0d1820] p-0 data-[state=closed]:slide-out-to-bottom-0 data-[state=open]:slide-in-from-bottom-0"
      >
        <DialogTitle className="sr-only">{pokemonName} Evolution</DialogTitle>
        {/* Background Effects */}
        <div className="absolute inset-0 z-0">
          <Vortex
            backgroundColor="black"
            rangeY={800}
            particleCount={500}
            baseHue={170}
            baseSpeed={0.5}
            rangeSpeed={2}
            containerClassName="w-full h-full"
          />
        </div>

        {/* Pokemon Container */}
        <div className="relative z-10 w-64 h-64 pointer-events-none">
          {/* Old Pokemon */}
          <div
            className={cn(
              'absolute inset-0 transition-all duration-500',
              phase === 'start' ? 'opacity-100 scale-100' : 'opacity-0 scale-0',
            )}
          >
            {oldFormattedStart && (
              <Image
                src={oldFormattedStart}
                alt="Old"
                fill
                sizes="(max-width: 768px) 100vw, 256px"
                className="object-contain animate-bounce pixelated"
              />
            )}
          </div>

          {/* New Pokemon */}
          <div
            className={cn(
              'absolute inset-0 transition-all duration-1000 transform',
              phase === 'reveal' || phase === 'done'
                ? 'opacity-100 scale-125'
                : 'opacity-0 scale-50',
            )}
          >
            {newFormattedEnd && (
              <Image
                src={newFormattedEnd}
                alt="New"
                fill
                sizes="(max-width: 768px) 100vw, 256px"
                className="object-contain drop-shadow-[0_0_50px_rgba(45,212,191,0.5)] pixelated"
              />
            )}
          </div>
        </div>

        {/* Flash Effect */}
        <div
          className={cn(
            'pointer-events-none absolute inset-0 z-20 bg-[#fffaf0] transition-opacity duration-300',
            phase === 'flash' ? 'opacity-100' : 'opacity-0',
          )}
        />

        {/* Text Overlay */}
        <div className="absolute bottom-20 w-full text-center z-30 px-4">
          {phase === 'start' && (
            <p className="font-display text-2xl text-[#f5ead7]">
              What? {pokemonName} is evolving!
            </p>
          )}
          {(phase === 'reveal' || phase === 'done') && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000 flex flex-col items-center">
              <div className="space-y-2">
                <p className="font-display text-4xl font-semibold text-[#e8b85b]">
                  Congratulations!
                </p>
                <p className="text-xl text-[#f5ead7]">
                  Your {pokemonName} evolved!
                </p>
              </div>

              {phase === 'done' && (
                <Button
                  onClick={onComplete}
                  size="lg"
                  className="min-w-[200px] border-none bg-game-clay text-game-cream hover:bg-game-clay/90"
                >
                  Continue
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

function MarkingButton({
  active,
  onClick,
  icon: Icon,
  color,
  title,
}: {
  active: boolean
  onClick: () => void | Promise<void>
  icon: React.ElementType
  color: string
  title?: string
}) {
  const [isActive, setIsActive] = useState(active)
  const [isLoading, setIsLoading] = useState(false)

  // Sync with prop when it changes
  useEffect(() => {
    setIsActive(active)
  }, [active])

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (isLoading) return

    setIsLoading(true)
    // Optimistically toggle the visual state
    setIsActive((prev) => !prev)

    try {
      await onClick()
    } catch (error) {
      // Revert on error
      setIsActive(active)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      title={title}
      aria-label={title}
      disabled={isLoading}
      className={cn(
        'game-focus-ring flex size-10 shrink-0 items-center justify-center rounded-lg border p-0 transition-colors',
        isActive
          ? 'border-game-moss bg-game-moss/10'
          : 'border-transparent opacity-55 hover:border-game-border hover:bg-game-surface-raised hover:opacity-100',
        isLoading && 'cursor-wait',
      )}
    >
      <Icon
        className={cn('h-5 w-5', isActive ? color : 'text-game-muted')}
        fill={isActive ? 'currentColor' : 'none'}
      />
    </button>
  )
}

function PokemonPowerIcon({
  powerId,
  className,
}: {
  powerId: PokemonPowerId
  className?: string
}) {
  const baseClass = cn('flex-shrink-0 rounded-xl border p-2', className)

  if (powerId === 'tera') {
    return (
      <Sparkles
        className={cn(baseClass, 'border-purple-400/30 text-purple-300')}
      />
    )
  }
  if (powerId === 'mega') {
    return (
      <Atom className={cn(baseClass, 'border-pink-400/30 text-pink-300')} />
    )
  }
  if (powerId === 'z-move') {
    return (
      <Zap className={cn(baseClass, 'border-yellow-400/30 text-yellow-300')} />
    )
  }
  if (powerId === 'dynamax') {
    return (
      <Maximize2 className={cn(baseClass, 'border-game-danger/30 text-game-danger')} />
    )
  }
  if (powerId === 'victory') {
    return (
      <Flag className={cn(baseClass, 'border-amber-400/30 text-amber-300')} />
    )
  }
  if (powerId === 'shout') {
    return (
      <Megaphone
        className={cn(baseClass, 'border-cyan-400/30 text-cyan-300')}
      />
    )
  }
  if (powerId === 'circadian') {
    return (
      <Clock
        className={cn(baseClass, 'border-orange-400/30 text-orange-300')}
      />
    )
  }

  return (
    <Atom className={cn(baseClass, 'border-fuchsia-400/30 text-fuchsia-300')} />
  )
}

function StatBar({
  label,
  value,
  max,
  color,
}: {
  label: string
  value: number
  max: number
  color: string
}) {
  const percentage = Math.min((value / max) * 100, 100)

  return (
    <div className="flex items-center gap-4 text-xs">
      <span className="w-8 text-[10px] font-black uppercase text-game-muted">
        {label}
      </span>
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-game-canvas">
        <div
          className={cn(
            'h-full rounded-full opacity-80 transition-[width] duration-700',
            color,
          )}
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="w-8 text-right font-mono text-[10px] font-bold text-game-ink">
        {value}
      </span>
    </div>
  )
}

function ObfuscatedStatBar({ label, color }: { label: string; color: string }) {
  const [width, setWidth] = useState(50)

  useEffect(() => {
    const interval = setInterval(
      () => {
        setWidth(Math.random() * 100)
      },
      500 + Math.random() * 1000,
    )
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-4 text-xs">
      <span className="w-8 text-[10px] font-black uppercase text-game-muted">
        {label}
      </span>
      <div className="relative h-1.5 flex-1 overflow-hidden rounded-full bg-game-canvas">
        <div
          className={cn(
            'h-full rounded-full opacity-40 transition-[width] duration-700 ease-in-out',
            color,
          )}
          style={{ width: `${width}%` }}
        />
      </div>
      <span className="w-8 text-right font-mono text-[10px] font-bold text-game-muted">
        ??
      </span>
    </div>
  )
}
