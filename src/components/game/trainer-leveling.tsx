'use client'

import {
  BookOpen,
  Loader2,
  Map as MapIcon,
  Package,
  Pencil,
  Shield,
  Sparkles,
  Swords,
  Trophy,
  User as UserIcon,
  Volume2,
  VolumeX,
  Zap,
} from 'lucide-react'
import Image from 'next/image'
import { memo, useMemo, useState } from 'react'
import { toast } from 'sonner'
import { updateUserCustomization } from '@/app/(frontend)/game/actions'
import { TrainerCard } from '@/components/game/battles/TrainerCard'
import { GameInfoModal } from '@/components/game/shared/GameInfoModal'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { BadgeShowcase } from '@/components/game/trainer/badge-showcase'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { SectionDivider } from '@/components/ui/section-divider'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useAudio } from '@/context/AudioContext'
import { useUser } from '@/context/UserContext'
import { type Skill, skills } from '@/data/skills/definitions'
import {
  getNextSkillGuideUnlocks,
  getSkillGuideUnlocks,
  type SkillGuideUnlock,
} from '@/data/skills/guide'
import { getTotalExpForLevel } from '@/data/skills/xp'
import { banners, icons, titles } from '@/data/user'
import { cn } from '@/lib/utils'
import {
  type CoreSkillId,
  getEquipableTitleIds,
  type SkillDataMap,
} from '@/utilities/skills/unlocks'

type CoreSkill = Skill & { id: CoreSkillId }

const coreSkills = skills.filter(
  (skill): skill is CoreSkill =>
    skill.id === 'battling' ||
    skill.id === 'catching' ||
    skill.id === 'researching' ||
    skill.id === 'artisan',
)

function SkillDisplayIcon({
  skill,
  className,
  fallbackClassName,
  width,
  height,
}: {
  skill: Pick<Skill, 'iconId' | 'name'>
  className: string
  fallbackClassName: string
  width: number
  height: number
}) {
  if (skill.iconId?.match(/\.(?:avif|png|webp|jpe?g)$/)) {
    return (
      <Image
        src={`/fallback/skills/${skill.iconId}`}
        alt={skill.name}
        width={width}
        height={height}
        className={className}
      />
    )
  }

  return <UserIcon className={fallbackClassName} />
}

function SkillUnlockCategoryIcon({
  category,
}: {
  category: SkillGuideUnlock['category']
}) {
  const iconClassName = 'h-4 w-4 text-game-moss-strong'

  switch (category) {
    case 'battle':
      return <Swords className={iconClassName} />
    case 'encounter':
      return <MapIcon className={iconClassName} />
    case 'items':
      return <Package className={iconClassName} />
    case 'pokemon':
      return <Sparkles className={iconClassName} />
    case 'progression':
      return <Trophy className={iconClassName} />
    case 'powers':
      return <Zap className={iconClassName} />
    case 'titles':
      return <Shield className={iconClassName} />
  }
}

function SkillUnlockIcon({ unlock }: { unlock: SkillGuideUnlock }) {
  const icon =
    unlock.icon ||
    (unlock.itemId ? { type: 'item' as const, id: unlock.itemId } : null)

  if (icon) {
    return <TaskIconDisplay icon={icon} className="h-8 w-8" />
  }

  return <SkillUnlockCategoryIcon category={unlock.category} />
}

const SkillUnlockList = memo(function SkillUnlockList({
  title,
  unlocks,
  level,
  limit,
  emptyMessage = 'All listed unlocks claimed',
}: {
  title: string
  unlocks: SkillGuideUnlock[]
  level: number
  limit?: number
  emptyMessage?: string
}) {
  const visibleUnlocks = useMemo(
    () => (typeof limit === 'number' ? unlocks.slice(0, limit) : unlocks),
    [limit, unlocks],
  )

  return (
    <div className="space-y-4">
      <SectionDivider textColor="text-game-moss-strong">{title}</SectionDivider>
      {visibleUnlocks.length === 0 ? (
        <div className="rounded-xl border border-game-moss/30 bg-game-moss/10 p-4 text-center text-xs font-bold uppercase tracking-widest text-game-moss-strong">
          {emptyMessage}
        </div>
      ) : (
        <div className="space-y-2">
          {visibleUnlocks.map((unlock) => {
            const unlocked = level >= unlock.level
            return (
              <div
                key={`${unlock.source}:${unlock.level}:${unlock.label}:${unlock.itemId || ''}`}
                className={cn(
                  'flex min-h-16 items-center gap-3 rounded-2xl border px-3 py-2',
                  unlocked
                    ? 'border-game-moss/35 bg-game-moss/10 text-game-ink'
                    : 'border-game-border bg-game-surface text-game-muted',
                )}
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-game-border bg-game-surface-raised">
                  <SkillUnlockIcon unlock={unlock} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="rounded-full border border-game-border bg-game-surface-raised px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-game-muted">
                      Level {unlock.level}
                    </span>
                    <span className="truncate text-xs font-black uppercase tracking-tight">
                      {unlock.label}
                    </span>
                  </div>
                  <div className="mt-1 line-clamp-2 text-[11px] leading-snug text-game-muted">
                    {unlock.description}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
})

const SkillGuideTable = memo(function SkillGuideTable({
  unlocks,
  level,
}: {
  unlocks: SkillGuideUnlock[]
  level: number
}) {
  const { unlocksByLevel, levels } = useMemo(() => {
    const groups = unlocks.reduce<Record<number, SkillGuideUnlock[]>>(
      (accumulator, unlock) => {
        accumulator[unlock.level] = accumulator[unlock.level] || []
        accumulator[unlock.level].push(unlock)
        return accumulator
      },
      {},
    )

    return {
      unlocksByLevel: groups,
      levels: Object.keys(groups)
        .map(Number)
        .sort((a, b) => a - b),
    }
  }, [unlocks])

  return (
    <div className="space-y-4">
      <div className="overflow-hidden rounded-xl border border-game-border bg-game-surface">
        {levels.map((unlockLevel) => {
          const rows = unlocksByLevel[unlockLevel]
          const unlocked = level >= unlockLevel

          return (
            <div
              key={unlockLevel}
              className={cn(
                'border-b border-game-border p-3 last:border-b-0',
                unlocked ? 'bg-game-moss/5' : 'bg-game-canvas/40',
              )}
            >
              <SectionDivider
                className="mb-3"
                textColor={
                  unlocked ? 'text-game-moss-strong' : 'text-game-muted'
                }
              >
                Level {unlockLevel}
              </SectionDivider>
              <div className="space-y-2">
                {rows.map((unlock) => (
                  <div
                    key={`${unlock.source}:${unlock.level}:${unlock.label}:${unlock.itemId || ''}`}
                    className="flex min-w-0 items-start gap-3 rounded-xl border border-game-border bg-game-surface-raised px-3 py-2"
                  >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-game-border bg-game-surface">
                      <SkillUnlockIcon unlock={unlock} />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-xs font-black uppercase tracking-tight text-game-ink">
                          {unlock.label}
                        </span>
                        <span className="rounded-full border border-game-border bg-game-surface px-2 py-0.5 text-[10px] font-black uppercase tracking-[0.08em] text-game-muted">
                          {getSkillUnlockCategoryLabel(unlock.category)}
                        </span>
                      </div>
                      <div className="mt-1 text-[11px] leading-snug text-game-muted">
                        {unlock.description}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
})

function SkillModalContent({
  selectedSkill,
  userSkills,
}: {
  selectedSkill: CoreSkill
  userSkills: SkillDataMap
}) {
  const skillData = userSkills[selectedSkill.id] || { level: 1, exp: 0 }
  const level = skillData.level || 1
  const exp = skillData.exp || 0
  const nextLevelTotalExp = getTotalExpForLevel(level + 1)
  const currentLevelTotalExp = getTotalExpForLevel(level)
  const progress =
    nextLevelTotalExp > currentLevelTotalExp
      ? Math.min(
          ((exp - currentLevelTotalExp) /
            (nextLevelTotalExp - currentLevelTotalExp)) *
            100,
          100,
        )
      : 100
  const skillId = selectedSkill.id
  const [showFullGuide, setShowFullGuide] = useState(false)
  const nextUnlocks = useMemo(
    () => getNextSkillGuideUnlocks(skillId, level),
    [skillId, level],
  )
  const allUnlocks = showFullGuide ? getSkillGuideUnlocks(skillId) : null

  return (
    <div className="space-y-8">
      <div>
        <SectionDivider textColor="text-game-moss-strong">
          Current Rank {level}
        </SectionDivider>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-game-border bg-game-surface-raised p-4 text-center">
            <div className="text-[10px] font-black uppercase tracking-widest text-game-muted">
              Total XP
            </div>
            <div className="mt-1 text-lg font-black text-game-ink">
              {exp.toLocaleString()}
            </div>
          </div>
          <div className="rounded-xl border border-game-border bg-game-surface-raised p-4 text-center">
            <div className="text-[10px] font-black uppercase tracking-widest text-game-muted">
              Next Level
            </div>
            <div className="mt-1 text-lg font-black text-game-ink">
              {level >= 100 ? 'Mastered' : nextLevelTotalExp.toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <SectionDivider textColor="text-game-moss-strong">
        Next Rank Progress
      </SectionDivider>
      <div className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <span className="text-[10px] font-black text-game-muted tracking-widest uppercase">
            Training Progress
          </span>
          <span className="text-xs font-black tracking-tighter text-game-moss-strong">
            {exp.toLocaleString()}{' '}
            <span className="text-game-muted text-[10px] ml-1">
              / {nextLevelTotalExp.toLocaleString()} XP
            </span>
          </span>
        </div>
        <div className="h-3 overflow-hidden rounded-full border border-game-border bg-game-canvas">
          <div
            className="h-full bg-game-ochre transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex items-center justify-center gap-2 pt-2">
          <div className="h-px bg-game-border flex-1" />
          <p className="text-[10px] text-game-muted font-bold uppercase tracking-[0.2em] whitespace-nowrap">
            {level >= 100 ? 'Skill fully mastered' : 'Training progress'}
          </p>
          <div className="h-px bg-game-border flex-1" />
        </div>
      </div>

      <SkillUnlockList
        title="Next Unlocks"
        unlocks={nextUnlocks}
        level={level}
        limit={4}
        emptyMessage="No remaining listed unlocks"
      />
      <div className="space-y-4">
        <SectionDivider textColor="text-game-moss-strong">
          Skill Guide
        </SectionDivider>
        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={() => setShowFullGuide((current) => !current)}
        >
          <BookOpen className="h-4 w-4" />
          {showFullGuide ? 'Hide Full Guide' : 'Show Full Guide'}
        </Button>
        {allUnlocks ? (
          <SkillGuideTable unlocks={allUnlocks} level={level} />
        ) : null}
      </div>
    </div>
  )
}

function getSkillUnlockCategoryLabel(category: SkillGuideUnlock['category']) {
  switch (category) {
    case 'battle':
      return 'Battle'
    case 'encounter':
      return 'Encounter'
    case 'items':
      return 'Items'
    case 'pokemon':
      return 'Pokemon'
    case 'progression':
      return 'Progression'
    case 'powers':
      return 'Powers'
    case 'titles':
      return 'Titles'
  }
}

export function TrainerLeveling() {
  const { user, refreshUser, updateUserContext } = useUser()
  const { isAudioEnabled, toggleAudioEnabled } = useAudio()
  const [selectedSkill, setSelectedSkill] = useState<CoreSkill | null>(null)
  const [isSkillModalOpen, setIsSkillModalOpen] = useState(false)
  const [isCustomizeModalOpen, setIsCustomizeModalOpen] = useState(false)
  const [selectedBanner, setSelectedBanner] = useState<string | null>(null)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [selectedTitle, setSelectedTitle] = useState<string | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const userSkills = (user?.skills || {}) as SkillDataMap
  const equipableTitleIdSet = useMemo(
    () =>
      new Set(
        getEquipableTitleIds((user as any)?.unlockedTitles, user?.skills),
      ),
    [user?.skills, (user as any)?.unlockedTitles],
  )

  if (!user) return null

  return (
    <div className="game-paper-texture relative flex h-full min-h-0 flex-col overflow-hidden bg-game-canvas text-game-ink">
      {/* Trainer Profile Header */}
      <div className="relative z-10 w-full shrink-0 flex-col">
        <div className="w-full flex-shrink-0">
          <div className="relative group">
            <TrainerCard
              name={user.trainerName}
              icon={(user as any).icon}
              banner={(user as any).banner}
              title={(user as any).title}
              className="aspect-[8/5] w-full overflow-hidden rounded-none border-b border-game-border bg-game-surface md:h-36 md:aspect-auto xl:h-44"
            >
              {/* Audio toggle - top left */}
              <button
                type="button"
                onClick={toggleAudioEnabled}
                aria-label={isAudioEnabled ? 'Disable audio' : 'Enable audio'}
                aria-pressed={isAudioEnabled}
                title={isAudioEnabled ? 'Disable audio' : 'Enable audio'}
                className="game-focus-ring absolute left-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-md border border-game-border bg-game-surface/85 text-game-ink backdrop-blur-md transition-colors hover:bg-game-surface-raised"
              >
                {isAudioEnabled ? (
                  <Volume2 className="w-4 h-4" />
                ) : (
                  <VolumeX className="w-4 h-4" />
                )}
              </button>

              {/* Edit button - bottom right */}
              <button
                type="button"
                onClick={() => {
                  setSelectedBanner((user as any).banner || 'lab')
                  setSelectedIcon((user as any).icon || 'ditto')
                  setSelectedTitle((user as any).title || 'new-beginnings')
                  setIsCustomizeModalOpen(true)
                }}
                aria-label="Customize trainer card"
                title="Customize trainer card"
                className="game-focus-ring absolute bottom-4 right-4 z-20 flex h-10 min-w-10 items-center justify-center gap-2 rounded-md border border-game-border bg-game-surface/85 px-3 text-game-ink backdrop-blur-md transition-colors hover:bg-game-surface-raised"
              >
                <Pencil className="h-4 w-4" aria-hidden="true" />
              </button>
            </TrainerCard>
          </div>
        </div>
      </div>

      <div className="relative z-10 mx-auto flex min-h-0 w-full max-w-5xl flex-1 flex-col space-y-10 overflow-y-auto px-4 pb-20 pt-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-game-border md:px-6 md:pt-8">
        {/* Skills Section */}
        <div className="space-y-4">
          <SectionDivider>Skills</SectionDivider>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {coreSkills.map((skill) => {
              const skillData = userSkills[skill.id] || { level: 1, exp: 0 }
              const level = skillData.level || 1
              const exp = skillData.exp || 0

              const nextLevelTotalExp = getTotalExpForLevel(level + 1)
              const currentLevelTotalExp = getTotalExpForLevel(level)

              const progress =
                nextLevelTotalExp > currentLevelTotalExp
                  ? Math.min(
                      ((exp - currentLevelTotalExp) /
                        (nextLevelTotalExp - currentLevelTotalExp)) *
                        100,
                      100,
                    )
                  : 100

              return (
                <button
                  type="button"
                  key={skill.id}
                  aria-label={`View ${skill.name} skill details`}
                  onClick={() => {
                    setSelectedSkill(skill)
                    setIsSkillModalOpen(true)
                  }}
                  className="game-focus-ring group flex w-full cursor-pointer items-center gap-4 rounded-lg border border-game-border bg-game-surface p-4 text-left transition-colors hover:border-game-moss/35 hover:bg-game-surface-raised"
                >
                  <SkillDisplayIcon
                    skill={skill}
                    width={56}
                    height={56}
                    className="h-14 w-14 shrink-0 object-contain"
                    fallbackClassName="h-10 w-10 shrink-0 text-game-muted"
                  />

                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex justify-between items-end">
                      <div className="space-y-0.5 min-w-0">
                        <h3 className="truncate text-sm font-semibold text-game-ink">
                          {skill.name}
                        </h3>
                        <div className="text-[11px] leading-none text-game-muted">
                          {exp.toLocaleString()} /{' '}
                          {nextLevelTotalExp.toLocaleString()} XP
                        </div>
                      </div>
                      <div className="shrink-0 text-right">
                        <div className="mb-0.5 text-[10px] font-black uppercase leading-none text-game-moss-strong">
                          Rank
                        </div>
                        <div className="text-xl font-semibold leading-none text-game-moss-strong">
                          {level}
                        </div>
                      </div>
                    </div>

                    <div className="relative h-1.5 w-full overflow-hidden rounded-full border border-game-border bg-game-surface-raised">
                      <div
                        className="absolute inset-y-0 left-0 rounded-full bg-game-ochre transition-all duration-500"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Badges Section */}
        <div className="space-y-4">
          <SectionDivider>Gym Badges</SectionDivider>
          <BadgeShowcase />
        </div>
      </div>

      <GameInfoModal
        open={isSkillModalOpen && Boolean(selectedSkill)}
        onOpenChange={setIsSkillModalOpen}
        presentation="drawer"
        title={selectedSkill?.name || 'Skill Guide'}
        description={selectedSkill?.description}
        category="Skill Guide"
        background="/backgrounds/lab.avif"
        icon={
          selectedSkill ? (
            <SkillDisplayIcon
              skill={selectedSkill}
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
              fallbackClassName="h-8 w-8 text-game-muted"
            />
          ) : (
            <BookOpen className="h-8 w-8 text-game-muted" />
          )
        }
      >
        {selectedSkill ? (
          <SkillModalContent
            selectedSkill={selectedSkill}
            userSkills={userSkills}
          />
        ) : null}
      </GameInfoModal>

      {/* Customize Modal */}
      <Dialog
        open={isCustomizeModalOpen}
        onOpenChange={setIsCustomizeModalOpen}
      >
        <DialogContent className="max-h-[85vh] overflow-hidden rounded-xl border-game-border bg-game-surface p-0 text-game-ink shadow-lg sm:max-w-lg">
          <div className="relative flex h-full flex-col overflow-hidden p-5 sm:p-6">
            <DialogHeader className="relative z-10 border-b border-game-border pb-4 text-left">
              <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-game-moss-strong">
                Trainer kit
              </p>
              <DialogTitle className="font-display text-2xl font-bold tracking-tight text-game-ink">
                Customize Identity
              </DialogTitle>
            </DialogHeader>

            <div className="relative z-10 flex-1 space-y-6 overflow-y-auto py-5 pr-1 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-game-border">
              {/* Banner Selection */}
              <div className="space-y-3">
                <SectionDivider textColor="text-game-moss-strong">
                  Background Banner
                </SectionDivider>
                <div className="grid grid-cols-2 gap-2">
                  {banners
                    .filter((b) =>
                      ((user as any).unlockedBanners || ['lab']).includes(b.id),
                    )
                    .map((banner) => (
                      <button
                        key={banner.id}
                        type="button"
                        onClick={() => setSelectedBanner(banner.id)}
                        aria-pressed={selectedBanner === banner.id}
                        className={cn(
                          'group/banner relative h-20 w-full overflow-hidden rounded-lg border-2 transition-colors',
                          selectedBanner === banner.id
                            ? 'border-game-moss ring-2 ring-game-moss/20'
                            : 'border-game-border opacity-60 hover:border-game-moss/40 hover:opacity-100',
                        )}
                      >
                        <div
                          className="absolute inset-0 bg-cover bg-center"
                          style={{
                            backgroundImage: `url(${banner.imagePath})`,
                          }}
                        />
                        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/75 via-transparent to-transparent p-3">
                          <span className="w-full truncate text-left text-[10px] font-black uppercase tracking-widest text-game-cream">
                            {banner.name}
                          </span>
                        </div>
                      </button>
                    ))}
                </div>
              </div>

              {/* Icon Selection */}
              <div className="space-y-3">
                <SectionDivider textColor="text-game-moss-strong">
                  Trainer Avatar
                </SectionDivider>
                <div className="grid grid-cols-5 gap-2">
                  {icons
                    .filter((i) =>
                      (
                        (user as any).unlockedIcons || [
                          'ditto',
                          'trainer-red',
                          'trainer-leaf',
                        ]
                      ).includes(i.id),
                    )
                    .map((icon) => (
                      <button
                        key={icon.id}
                        type="button"
                        onClick={() => setSelectedIcon(icon.id)}
                        aria-pressed={selectedIcon === icon.id}
                        className={cn(
                          'group/icon relative flex h-14 w-full items-center justify-center rounded-lg border-2 bg-game-surface-raised transition-colors',
                          selectedIcon === icon.id
                            ? 'border-game-moss ring-2 ring-game-moss/20'
                            : 'border-game-border opacity-60 hover:border-game-moss/40 hover:opacity-100',
                        )}
                        title={icon.name}
                      >
                        <div className="relative z-10">
                          <TaskIconDisplay
                            icon={icon.icon}
                            className="w-10 h-10"
                          />
                        </div>
                        {selectedIcon === icon.id && (
                          <div className="absolute inset-0 bg-game-moss/5" />
                        )}
                      </button>
                    ))}
                </div>
              </div>

              {/* Title Selection */}
              <div className="space-y-3">
                <SectionDivider textColor="text-game-moss-strong">
                  Personal Title
                </SectionDivider>
                <Select
                  value={selectedTitle || ''}
                  onValueChange={setSelectedTitle}
                >
                  <SelectTrigger className="h-14 w-full rounded-lg border-game-border bg-game-surface-raised px-6 font-bold tracking-tight text-game-ink focus:ring-game-moss/30">
                    <SelectValue placeholder="Select a title" />
                  </SelectTrigger>
                  <SelectContent className="rounded-lg border-game-border bg-game-surface-raised p-2 shadow-2xl">
                    {titles
                      .filter((t) => equipableTitleIdSet.has(t.id))
                      .map((title) => (
                        <SelectItem
                          key={title.id}
                          value={title.id}
                          className="mb-1 cursor-pointer rounded-lg py-3 focus:bg-game-moss/10 focus:text-game-moss-strong last:mb-0"
                        >
                          <span className="font-bold tracking-tight">
                            {title.name}
                          </span>
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Save Button */}
            <div className="relative z-10 mt-auto border-t border-game-border pt-4">
              <Button
                onClick={async () => {
                  setIsSaving(true)
                  try {
                    const result = await updateUserCustomization({
                      banner: selectedBanner || undefined,
                      icon: selectedIcon || undefined,
                      title: selectedTitle || undefined,
                    })

                    if (result.success) {
                      updateUserContext({
                        banner: selectedBanner || (user as any).banner || 'lab',
                        icon: selectedIcon || (user as any).icon || 'ditto',
                        title:
                          selectedTitle ||
                          (user as any).title ||
                          'new-beginnings',
                      })
                      refreshUser(true)
                      setIsCustomizeModalOpen(false)
                      toast.success('Profile updated')
                    } else {
                      toast.error(result.error || 'Failed to update profile')
                    }
                  } catch {
                    toast.error('Failed to update profile')
                  } finally {
                    setIsSaving(false)
                  }
                }}
                disabled={isSaving}
                className="h-12 w-full rounded-lg bg-game-clay font-black uppercase tracking-widest text-game-cream transition-colors hover:bg-game-clay/90"
              >
                {isSaving ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  'SAVE PROFILE'
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
