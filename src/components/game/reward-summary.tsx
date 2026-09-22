import {
  CheckCircle2,
  Coins,
  Package,
  Search,
  Star,
} from 'lucide-react'
import Image from 'next/image'
import type { HTMLAttributes } from 'react'
import { PokemonRarityEggSprite } from '@/components/game/shared/PokemonRarityEggSprite'
import { PokemonRaritySprite } from '@/components/game/shared/PokemonRaritySprite'
import { PokemonExperienceRewardList } from '@/components/game/shared/pokemon-experience-reward-list'
import { PokemonResearchExperienceRewardList } from '@/components/game/shared/pokemon-research-experience-reward-list'
import { SkillExperienceRewardList } from '@/components/game/shared/skill-experience-reward-list'
import { TaskIconDisplay } from '@/components/game/shared/TaskIconDisplay'
import { CurrencySprite } from '@/components/ui/currency-sprite'
import { getCurrency } from '@/data/currencies'
import { getSkill } from '@/data/skills'
import { getIcon } from '@/data/user'
import { getPokemonImageUrl } from '@/utilities/pokemon/pokedex'
import { getPokemonRarityEffect } from '@/utilities/pokemon/rarity-effects'
import type { RewardSummary } from '@/utilities/rewards/reward-logic'
import { cn } from '@/lib/utils'
import { ItemSprite } from '../ui/item-sprite'
import { SectionDivider } from '../ui/section-divider'
import { CardRewardCarousel } from './card-reward-carousel'

const BACKGROUND_REWARD_SPRITE = '/sprites/items/forest-photo.avif'
const TITLE_REWARD_SPRITE = '/sprites/items/certificate.avif'
const REWARD_VALUE_CLASS =
  'shrink-0 whitespace-nowrap font-mono text-sm font-semibold text-game-ink'

function isResearchItem(item: { id: string; name: string }) {
  return item.id.startsWith('tm-') || item.name.trim().toLowerCase().startsWith('tm:')
}

interface RewardSummaryDisplayProps {
  summary: RewardSummary
  title?: string
}

function RewardLedgerRow({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={cn(
        'flex min-h-12 items-center gap-3 border-b border-game-border/75 py-2 last:border-b-0',
        '!rounded-none !border-x-0 !border-t-0 !bg-transparent !shadow-none',
        className,
      )}
    >
      {children}
    </div>
  )
}

export function RewardSummaryDisplay({
  summary,
  title = 'Rewards',
}: RewardSummaryDisplayProps) {
  const xpEntries = Object.entries(summary.xp || {})
  const skillExperienceEntries =
    summary.skillExperience?.length
      ? summary.skillExperience
      : xpEntries.map(([skillId, amount]) => ({ skillId, amount }))
  const rewardItems = (summary.items || []).filter((item) => !isResearchItem(item))
  const researchItems = (summary.items || []).filter(isResearchItem)
  const hasResearchRewards =
    researchItems.length > 0 ||
    (summary.sketchedMoves || []).length > 0 ||
    (summary.researchXp || []).length > 0 ||
    (summary.researchBreakthroughs || []).length > 0
  const hasSkillExperience =
    skillExperienceEntries.length > 0 || Boolean(summary.levelUp)
  const hasMainRewards =
    rewardItems.length > 0 || (summary.currency || []).length > 0
  const hasAdditionalRewards =
    (summary.pokemon || []).length > 0 ||
    (summary.cards || []).length > 0 ||
    (summary.tasksCompleted || []).length > 0 ||
    (summary.banners || []).length > 0 ||
    (summary.icons || []).length > 0 ||
    (summary.titles || []).length > 0 ||
    (summary.upgrades || []).length > 0 ||
    (summary.notices || []).length > 0 ||
    (summary.eggs || []).length > 0
  const hasRewards =
    hasSkillExperience ||
    hasResearchRewards ||
    hasMainRewards ||
    hasAdditionalRewards ||
    (summary.pokemonExperience || []).length > 0

  if (!hasRewards) return null

  return (
    <div className="w-full space-y-5 px-0 py-4 sm:px-1">
      {(summary.pokemonExperience || []).length > 0 && (
        <>
          <SectionDivider>EXP</SectionDivider>
          <PokemonExperienceRewardList entries={summary.pokemonExperience || []} />
        </>
      )}

      {hasSkillExperience && (
        <>
          <SectionDivider>Skill EXP</SectionDivider>
          <SkillExperienceRewardList entries={skillExperienceEntries} />
          {summary.levelUp && (
            <RewardLedgerRow className="mt-2 flex-row">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center">
                {(() => {
                  const skill = getSkill(summary.levelUp.skillId)
                  const iconId = skill?.iconId
                  if (!iconId) {
                    return (
                      <Star className="h-4 w-4 animate-pulse text-game-moss-strong" />
                    )
                  }
                  return iconId.match(/\.(?:avif|png|webp|jpe?g)$/) ? (
                    <Image
                      src={`/fallback/skills/${iconId}`}
                      alt={skill?.name || 'Skill'}
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                  ) : (
                    <ItemSprite
                      itemId={iconId}
                      alt={skill?.name || 'Skill'}
                      width={20}
                      height={20}
                      className="h-5 w-5 object-contain"
                    />
                  )
                })()}
              </div>
              <div className="flex min-w-0 flex-1 items-center justify-between pr-2">
                <span className="truncate text-sm font-medium uppercase tracking-wide text-game-ink">
                  {getSkill(summary.levelUp.skillId)?.name || 'New'} Level
                </span>
                <div className="flex items-center gap-1.5 pl-2">
                  <span className="shrink-0 whitespace-nowrap font-mono text-xs font-semibold text-game-muted line-through">
                    {summary.levelUp.oldLevel}
                  </span>
                  <span className={REWARD_VALUE_CLASS}>
                    Lvl {summary.levelUp.newLevel}
                  </span>
                </div>
              </div>
            </RewardLedgerRow>
          )}
        </>
      )}

      {hasResearchRewards && (
        <>
          <SectionDivider>Research</SectionDivider>
          <div className="space-y-0">
            <PokemonResearchExperienceRewardList entries={summary.researchXp || []} />

            {researchItems.map((item, i) => (
              <RewardLedgerRow
                key={`research-item-${item.id}-${i}`}
                className="h-12 flex-row items-center gap-3 border-game-border bg-game-surface-raised p-2"
              >
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                  <ItemSprite
                    itemId={item.id}
                    alt={item.name}
                    width={28}
                    height={28}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between pr-2">
                  <span className="truncate text-sm font-medium text-game-ink">
                    {item.name}
                  </span>
                  <span className={REWARD_VALUE_CLASS}>
                    {item.quantity > 1 ? `x${item.quantity}` : 'Unlocked'}
                  </span>
                </div>
              </RewardLedgerRow>
            ))}

            {(summary.sketchedMoves || []).map((move, i) => (
              <RewardLedgerRow key={`sketched-move-${i}`} className="flex-row">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center text-game-ochre">
                  <Image
                    src={getPokemonImageUrl('235', 'sprite')}
                    alt="Smeargle"
                    width={28}
                    height={28}
                    className="h-7 w-7 object-contain pixelated"
                  />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between pr-2">
                  <span className="truncate text-sm font-medium text-game-ink">
                    {move.name}
                  </span>
                  <span className="text-xs font-bold text-game-ochre">
                    Sketched
                  </span>
                </div>
              </RewardLedgerRow>
            ))}

            {(summary.researchBreakthroughs || []).map((b, i) => (
              <RewardLedgerRow
                key={`research-break-${i}`}
                className="min-h-12 flex-row items-center gap-3 border-game-moss/35 bg-game-surface-raised p-2"
              >
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center p-0.5">
                  <Image
                    src={getPokemonImageUrl(b.formId, 'sprite')}
                    alt={b.pokemonName}
                    width={28}
                    height={28}
                    className="h-full w-full object-contain pixelated"
                  />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between gap-2 sm:pr-2">
                  <span className="truncate text-sm font-medium text-game-ink">
                    {b.pokemonName} Research
                  </span>
                  <span className={REWARD_VALUE_CLASS}>LVL {b.newLevel}</span>
                </div>
              </RewardLedgerRow>
            ))}
          </div>
        </>
      )}

      {hasMainRewards && (
        <>
          <SectionDivider>{title}</SectionDivider>
          <div className="space-y-0">
            {(summary.currency || []).map((curr, i) => {
              const currencyDef = getCurrency(curr.type)
              return (
                <RewardLedgerRow
                  key={`curr-${i}`}
                  className="h-12 flex-row items-center gap-3 border-game-border bg-game-surface-raised p-2"
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center text-game-ochre">
                    {currencyDef ? (
                      <CurrencySprite
                        currencyId={curr.type}
                        alt={currencyDef.name}
                        width={20}
                        height={20}
                        className="h-5 w-5 object-contain"
                      />
                    ) : (
                      <Coins className="h-4 w-4" />
                    )}
                  </div>
                  <div className="flex min-w-0 flex-1 items-center justify-between pr-2">
                    <span className="truncate text-sm font-medium text-game-ink">
                      {currencyDef ? currencyDef.name : curr.type}
                    </span>
                    <span
                      className={cn(
                        REWARD_VALUE_CLASS,
                        curr.quantity < 0 && 'text-game-danger',
                      )}
                    >
                      {curr.quantity > 0 ? `x${curr.quantity}` : curr.quantity}
                    </span>
                  </div>
                </RewardLedgerRow>
              )
            })}

            {rewardItems.map((item, i) => (
              <RewardLedgerRow
                key={`item-${item.id}-${i}`}
                className="h-12 flex-row items-center gap-3 border-game-border bg-game-surface-raised p-2"
              >
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                  <ItemSprite
                    itemId={item.id}
                    alt={item.name}
                    width={28}
                    height={28}
                    className="h-full w-full object-contain"
                  />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between pr-2">
                  <span className="truncate text-sm font-medium text-game-ink">
                    {item.name}
                  </span>
                  <span className={REWARD_VALUE_CLASS}>x{item.quantity}</span>
                </div>
              </RewardLedgerRow>
            ))}
          </div>
        </>
      )}

      {hasAdditionalRewards && (
        <>
          <SectionDivider>Additional</SectionDivider>
          <div className="space-y-0">
            {(summary.eggs || []).map((egg) => {
              const rarity = getPokemonRarityEffect(egg.rarity)
              return (
                <RewardLedgerRow key={egg.id} className="flex-row">
                  <PokemonRarityEggSprite
                    rarity={egg.rarity}
                    alt={`${rarity.label} Pokemon Egg`}
                    className="h-7 w-7 shrink-0"
                    imageClassName="h-full w-full"
                    sizes="28px"
                  />
                  <div>
                    <p className="text-sm font-semibold text-game-ink">
                      {egg.rarity === 'normal'
                        ? 'Egg found'
                        : `${rarity.label} Egg found`}
                    </p>
                    <p className="text-xs text-game-muted">
                      Ready to hatch in 12 hours
                    </p>
                  </div>
                </RewardLedgerRow>
              )
            })}

            {(summary.notices || []).map((notice, i) => {
              const showMessage =
                notice.id !== 'random-event-spawned' && Boolean(notice.message)

              return (
                <RewardLedgerRow
                  key={`notice-${notice.id}-${i}`}
                  className={`flex-row items-center gap-3 border-game-border bg-game-surface-raised p-2 ${
                    showMessage ? 'min-h-12' : 'h-12'
                  }`}
                >
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center text-game-ochre">
                    {notice.icon ? (
                      <TaskIconDisplay icon={notice.icon} className="h-6 w-6" />
                    ) : (
                      <Search className="h-4 w-4 text-game-ochre" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1 pr-2 text-left">
                    <div className="truncate text-sm font-medium text-game-ink">
                      {notice.title}
                    </div>
                    {showMessage && (
                      <div className="truncate text-xs text-game-muted">
                        {notice.message}
                      </div>
                    )}
                  </div>
                </RewardLedgerRow>
              )
            })}

            {(summary.cards || []).length > 0 && (
              <CardRewardCarousel cards={summary.cards} />
            )}

            {(summary.pokemon || []).map((p, i) => (
              <RewardLedgerRow
                key={`poke-${i}`}
                className="h-12 flex-row items-center gap-3 border-game-border bg-game-surface-raised p-2"
              >
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center">
                  <PokemonRaritySprite
                    formId={p.speciesId}
                    view="front"
                    rarity={p.rarity}
                    shiny={p.shiny}
                    alt={p.name}
                    className="h-full w-full"
                  />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between pr-2">
                  <div className="flex items-center gap-2 truncate">
                    <span className="truncate text-sm font-medium text-game-ink">
                      {p.name}
                    </span>
                    {p.shiny && <span className="text-xs text-game-ochre">★</span>}
                  </div>
                  <span className={REWARD_VALUE_CLASS}>Lvl {p.level}</span>
                </div>
              </RewardLedgerRow>
            ))}

            {summary.tasksCompleted?.map((task, i) => (
              <RewardLedgerRow
                key={`task-${i}`}
                className="h-12 flex-row items-center gap-3 border-game-border bg-game-surface-raised p-2"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center text-game-moss-strong">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between pr-2">
                  <span className="truncate text-sm font-medium text-game-ink">
                    {task.name}
                  </span>
                  <span className="text-xs font-bold text-game-moss-strong">
                    Completed
                  </span>
                </div>
              </RewardLedgerRow>
            ))}

            {summary.banners?.map((banner, i) => (
              <RewardLedgerRow
                key={`banner-${i}`}
                className="h-12 flex-row items-center gap-3 border-game-border bg-game-surface-raised p-2"
              >
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center p-0.5">
                  <Image
                    src={BACKGROUND_REWARD_SPRITE}
                    alt="Background award"
                    width={28}
                    height={28}
                    className="h-full w-full object-contain pixelated"
                  />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between pr-2">
                  <span className="truncate text-sm font-medium text-game-ink">
                    Banner: {banner.name}
                  </span>
                  <span className="text-xs font-bold text-game-moss-strong">
                    Unlocked
                  </span>
                </div>
              </RewardLedgerRow>
            ))}

            {summary.icons?.map((icon, i) => (
              <RewardLedgerRow
                key={`icon-${i}`}
                className="h-12 flex-row items-center gap-3 border-game-border bg-game-surface-raised p-2"
              >
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center p-0.5">
                  <TaskIconDisplay
                    icon={
                      getIcon(icon.id)?.icon || {
                        type: 'item',
                        id: 'quality-forest-photo',
                      }
                    }
                    className="h-7 w-7"
                  />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between pr-2">
                  <span className="truncate text-sm font-medium text-game-ink">
                    Icon: {icon.name}
                  </span>
                  <span className="text-xs font-bold text-game-moss-strong">
                    Unlocked
                  </span>
                </div>
              </RewardLedgerRow>
            ))}

            {summary.titles?.map((titleItem, i) => (
              <RewardLedgerRow
                key={`title-${i}`}
                className="h-12 flex-row items-center gap-3 border-game-border bg-game-surface-raised p-2"
              >
                <div className="relative flex h-8 w-8 shrink-0 items-center justify-center p-0.5">
                  <Image
                    src={TITLE_REWARD_SPRITE}
                    alt="Title certificate"
                    width={28}
                    height={28}
                    className="h-full w-full object-contain pixelated"
                  />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between pr-2">
                  <span className="truncate text-sm font-medium text-game-ink">
                    Title: {titleItem.name}
                  </span>
                  <span className="text-xs font-bold text-game-moss-strong">
                    Unlocked
                  </span>
                </div>
              </RewardLedgerRow>
            ))}

            {summary.upgrades?.map((upgrade, i) => (
              <RewardLedgerRow
                key={`upgrade-${i}`}
                className="h-12 flex-row items-center gap-3 border-game-border bg-game-surface-raised p-2"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center text-game-moss-strong">
                  <Package className="h-4 w-4" />
                </div>
                <div className="flex min-w-0 flex-1 items-center justify-between pr-2">
                  <span className="truncate text-sm font-medium text-game-ink">
                    {upgrade.label}
                  </span>
                  <span className={REWARD_VALUE_CLASS}>+{upgrade.value}</span>
                </div>
              </RewardLedgerRow>
            ))}
          </div>
        </>
      )}
    </div>
  )
}
